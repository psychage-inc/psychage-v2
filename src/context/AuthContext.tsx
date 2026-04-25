import React, { useContext, useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { AuthContext, AuthState, AuthContextType } from './AuthContextDefinition';
import { supabase } from '../lib/supabaseClient';
import type { User as SupabaseUser } from '@supabase/supabase-js';

// AUTH-010: signup extraMetadata is restricted to a known allowlist.
// Anything outside this set is dropped (with a console.warn) before the
// payload reaches Supabase. See docs/audits/auth-audit-2026-04-23.md.
export type SignupExtraMetadata = {
  age_verified?: boolean;
  consent_version?: string;
  country?: string;
  age?: number;
  referral_source?: string;
};

const ALLOWED_EXTRA_KEYS = [
  'age_verified',
  'consent_version',
  'country',
  'age',
  'referral_source',
] as const;

// Map Supabase user to our User type.
//
// Role is resolved from app_metadata, not user_metadata. user_metadata is
// user-writable via supabase.auth.updateUser({ data: ... }) — trusting it
// for role resolution is the vulnerability fixed in AUTH-001. See
// docs/audits/auth-audit-2026-04-23.md.
//
// Note on the 'admin' branch: post-AUTH-006 cleanup, profiles.role is
// constrained to 'patient' | 'provider'. Admin recognition flows from
// app_metadata.role, populated by the B-3 sync trigger from admin_roles.
function mapSupabaseUser(supabaseUser: SupabaseUser | null) {
  if (!supabaseUser) return null;

  const appRole = (supabaseUser.app_metadata as { role?: unknown } | undefined)?.role;
  const role: 'patient' | 'provider' | 'admin' =
    appRole === 'admin' || appRole === 'provider' || appRole === 'patient'
      ? appRole
      : 'patient';

  return {
    id: supabaseUser.id,
    email: supabaseUser.email || '',
    role,
    display_name: supabaseUser.user_metadata?.display_name || supabaseUser.user_metadata?.full_name || '',
    avatar_url: supabaseUser.user_metadata?.avatar_url || '',
  };
}

/** Returns true if two User objects have identical field values */
function usersEqual(a: ReturnType<typeof mapSupabaseUser>, b: ReturnType<typeof mapSupabaseUser>): boolean {
  if (a === b) return true;
  if (!a || !b) return false;
  return a.id === b.id && a.email === b.email && a.role === b.role
    && a.display_name === b.display_name && a.avatar_url === b.avatar_url;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });
  const userRef = useRef<ReturnType<typeof mapSupabaseUser>>(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // AUTH-012: onAuthStateChange is the SOLE updater of auth state at runtime.
  // login / signup / logout / deleteAccount never call setState directly —
  // they invoke Supabase, return success/failure, and rely on the listener
  // below to propagate state. This eliminates the dual-setState race that
  // previously caused observable flicker on login.
  //
  // The getSession() initial-load path below is a separate concern (boot
  // hydration before the listener is wired) and is allowed to setState once.
  useEffect(() => {
    let isCancelled = false;

    // Initial session hydration (boot only).
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (isCancelled) return;
      const mapped = mapSupabaseUser(session?.user ?? null);
      const stableUser = usersEqual(mapped, userRef.current) ? userRef.current : mapped;
      userRef.current = stableUser;
      setState(prev => {
        const isAuth = !!stableUser;
        if (prev.user === stableUser && !prev.isLoading && prev.isAuthenticated === isAuth) {
          return prev;
        }
        return { user: stableUser, isLoading: false, isAuthenticated: isAuth };
      });
    });

    // Runtime auth state listener — sole runtime updater per AUTH-012.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (isCancelled) return;

      // AUTH-011 defensive: a SIGNED_OUT event can fire from another tab
      // (Supabase broadcasts auth state across tabs). Clear the cache here
      // so cross-tab logout doesn't leak the previous user's data into the
      // current tab. The same-tab logout() also clears synchronously below
      // — belt and braces.
      if (event === 'SIGNED_OUT') {
        queryClient.clear();
      }

      const mapped = mapSupabaseUser(session?.user ?? null);
      const stableUser = usersEqual(mapped, userRef.current) ? userRef.current : mapped;
      userRef.current = stableUser;
      setState(prev => {
        const isAuth = !!stableUser;
        if (prev.user === stableUser && !prev.isLoading && prev.isAuthenticated === isAuth) {
          return prev;
        }
        return { user: stableUser, isLoading: false, isAuthenticated: isAuth };
      });
    });

    return () => {
      isCancelled = true;
      subscription.unsubscribe();
    };
  }, [queryClient]);

  // AUTH-012: login does NOT call setState. The onAuthStateChange listener
  // above receives SIGNED_IN and updates state. This eliminates the
  // double-fire that previously caused a flash of stale state.
  const login = useCallback(async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      const message = error instanceof Error
        ? error.message
        : 'An unexpected error occurred';
      return { success: false, error: message };
    }
  }, []);

  const signup = useCallback(async (email: string, password: string, displayName?: string, role: 'patient' | 'provider' = 'patient', extraMetadata?: SignupExtraMetadata, captchaToken?: string) => {
    try {
      // AUTH-010: never blind-spread extraMetadata. The previous shape
      // `Record<string, unknown>` let any caller inject arbitrary keys —
      // including `role: 'admin'`, which combined with AUTH-001 was a
      // signup-time escalation path. Filter to the named allowlist.
      const sanitizedExtras: Record<string, unknown> = {};
      if (extraMetadata) {
        for (const key of ALLOWED_EXTRA_KEYS) {
          const value = (extraMetadata as Record<string, unknown>)[key];
          if (value !== undefined) sanitizedExtras[key] = value;
        }
        for (const key of Object.keys(extraMetadata)) {
          if (!(ALLOWED_EXTRA_KEYS as readonly string[]).includes(key)) {
            console.warn(`[signup] Dropping disallowed extraMetadata key: ${key}`);
          }
        }
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: displayName,
            full_name: displayName,
            role,
            ...sanitizedExtras,
          },
          // AUTH-029: forward Turnstile token. Supabase server enforces
          // when Captcha Protection is enabled in dashboard.
          ...(captchaToken ? { captchaToken } : {}),
        },
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data.user) {
        // Supabase may require email confirmation before allowing sign in
        // For now, we consider signup successful
        return { success: true };
      }

      return { success: false, error: 'Signup failed' };
    } catch (error) {
      const message = error instanceof Error
        ? error.message
        : 'An unexpected error occurred';
      return { success: false, error: message };
    }
  }, []);

  // AUTH-011 + AUTH-022 + AUTH-012:
  //   - Clear TanStack Query cache before signOut so any in-flight queries
  //     don't race a half-logged-out session and leak data into the next
  //     user's session.
  //   - Always navigate to `redirect` (default /login). Eliminates the
  //     inconsistent caller pattern where some sites navigated and others
  //     relied on ProtectedRoute fallback.
  //   - Do not call setState — the SIGNED_OUT listener above handles that.
  const logout = useCallback(async (redirect: string = '/login') => {
    queryClient.clear();
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
    navigate(redirect, { replace: true });
  }, [queryClient, navigate]);

  const refreshUser = useCallback(async () => {
    try {
      const { data: { user: supabaseUser } } = await supabase.auth.getUser();
      if (supabaseUser) {
        const mapped = mapSupabaseUser(supabaseUser);
        const stableUser = usersEqual(mapped, userRef.current) ? userRef.current : mapped;
        userRef.current = stableUser;
        setState(prev => ({
          ...prev,
          user: stableUser,
          isAuthenticated: true,
        }));
      }
    } catch (error) {
      console.error('Failed to refresh user:', error);
    }
  }, []);

  const requestPasswordReset = useCallback(async (email: string, captchaToken?: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
        // AUTH-029: forward Turnstile token. Supabase enforces only
        // when Captcha Protection is enabled in dashboard settings.
        ...(captchaToken ? { captchaToken } : {}),
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      const message = error instanceof Error
        ? error.message
        : 'An unexpected error occurred';
      return { success: false, error: message };
    }
  }, []);

  const signInWithGoogle = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch {
      return { success: false, error: 'Failed to sign in with Google' };
    }
  }, []);

  const signInWithApple = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'apple',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch {
      return { success: false, error: 'Failed to sign in with Apple' };
    }
  }, []);

  // AUTH-012 / AUTH-011: same architectural treatment as logout — clear
  // cache, sign out, let the listener finalize state, navigate.
  const deleteAccount = useCallback(async () => {
    try {
      const { privacyService } = await import('../services/privacyService');
      const result = await privacyService.requestAccountDeletion();
      if (!result.success) {
        return { success: false, error: 'Failed to schedule account deletion' };
      }
      queryClient.clear();
      try {
        await supabase.auth.signOut();
      } catch (error) {
        console.error('Sign-out after deletion error:', error);
      }
      navigate('/login', { replace: true });
      return { success: true };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete account';
      return { success: false, error: message };
    }
  }, [queryClient, navigate]);

  const value = useMemo<AuthContextType>(() => ({
    ...state,
    login,
    signup,
    logout,
    refreshUser,
    requestPasswordReset,
    signInWithGoogle,
    signInWithApple,
    deleteAccount,
  }), [state, login, signup, logout, refreshUser, requestPasswordReset, signInWithGoogle, signInWithApple, deleteAccount]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}


