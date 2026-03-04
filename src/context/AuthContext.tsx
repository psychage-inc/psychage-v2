import React, { useContext, useState, useEffect, useCallback } from 'react';
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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  // Check for existing session on mount and set up auth state listener
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      const user = mapSupabaseUser(session?.user ?? null);
      setState({
        user,
        isLoading: false,
        isAuthenticated: !!user,
      });
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = mapSupabaseUser(session?.user ?? null);
      setState({
        user,
        isLoading: false,
        isAuthenticated: !!user,
      });
    });

    return () => subscription.unsubscribe();
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
        const user = mapSupabaseUser(data.user);
        setState({
          user,
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

  const signup = useCallback(async (email: string, password: string, displayName?: string, role: 'patient' | 'provider' = 'patient') => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: displayName,
            full_name: displayName,
            role,
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
        const user = mapSupabaseUser(supabaseUser);
        setState(prev => ({
          ...prev,
          user,
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
    } catch (error) {
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
    } catch (error) {
      return { success: false, error: 'Failed to sign in with Apple' };
    }
  }, []);

  const value: AuthContextType = {
    ...state,
    login,
    signup,
    logout,
    refreshUser,
    requestPasswordReset,
    signInWithGoogle,
    signInWithApple,
  };

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


