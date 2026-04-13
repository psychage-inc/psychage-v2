import React, { useContext, useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { AuthContext, AuthState, AuthContextType } from './AuthContextDefinition';
import { supabase } from '../lib/supabaseClient';
import type { User as SupabaseUser } from '@supabase/supabase-js';

// Map Supabase user to our User type
function mapSupabaseUser(supabaseUser: SupabaseUser | null) {
  if (!supabaseUser) return null;

  return {
    id: supabaseUser.id,
    email: supabaseUser.email || '',
    role: (supabaseUser.user_metadata?.role || 'patient') as 'patient' | 'provider' | 'admin',
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

  // Check for existing session on mount and set up auth state listener
  useEffect(() => {
    let isCancelled = false;

    // Get initial session
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

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
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

    return () => {
      isCancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data.user) {
        const mapped = mapSupabaseUser(data.user);
        const stableUser = usersEqual(mapped, userRef.current) ? userRef.current : mapped;
        userRef.current = stableUser;
        setState({
          user: stableUser,
          isLoading: false,
          isAuthenticated: true,
        });
        return { success: true };
      }

      return { success: false, error: 'Login failed' };
    } catch (error) {
      const message = error instanceof Error
        ? error.message
        : 'An unexpected error occurred';
      return { success: false, error: message };
    }
  }, []);

  const signup = useCallback(async (email: string, password: string, displayName?: string, role: 'patient' | 'provider' = 'patient', extraMetadata?: Record<string, unknown>) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: displayName,
            full_name: displayName,
            role,
            ...extraMetadata,
          },
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

  const logout = useCallback(async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    }
  }, []);

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

  const requestPasswordReset = useCallback(async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
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

  const deleteAccount = useCallback(async () => {
    try {
      const { privacyService } = await import('../services/privacyService');
      const result = await privacyService.requestAccountDeletion();
      if (!result.success) {
        return { success: false, error: 'Failed to schedule account deletion' };
      }
      // Sign out after scheduling deletion
      await supabase.auth.signOut();
      setState({ user: null, isLoading: false, isAuthenticated: false });
      return { success: true };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete account';
      return { success: false, error: message };
    }
  }, []);

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


