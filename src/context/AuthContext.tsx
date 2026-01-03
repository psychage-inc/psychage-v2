import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api, tokenStorage, User, ApiError } from '../lib/api';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string, displayName?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  requestPasswordReset: (email: string) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      if (tokenStorage.isAuthenticated()) {
        try {
          const response = await api.auth.me();
          if (response.success && response.data) {
            setState({
              user: response.data,
              isLoading: false,
              isAuthenticated: true,
            });
            return;
          }
        } catch (error) {
          console.error('Failed to restore session:', error);
          tokenStorage.clearTokens();
        }
      }
      setState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    };

    checkAuth();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await api.auth.login(email, password);
      if (response.success && response.data) {
        // Fetch user details after successful login
        const userResponse = await api.auth.me();
        if (userResponse.success && userResponse.data) {
          setState({
            user: userResponse.data,
            isLoading: false,
            isAuthenticated: true,
          });
          return { success: true };
        }
      }
      return { success: false, error: 'Login failed' };
    } catch (error) {
      const message = error instanceof ApiError
        ? error.message
        : 'An unexpected error occurred';
      return { success: false, error: message };
    }
  }, []);

  const signup = useCallback(async (email: string, password: string, displayName?: string) => {
    try {
      const response = await api.auth.signup(email, password, displayName);
      if (response.success) {
        // After signup, user needs to verify email or can log in
        return { success: true };
      }
      return { success: false, error: 'Signup failed' };
    } catch (error) {
      const message = error instanceof ApiError
        ? error.message
        : 'An unexpected error occurred';
      return { success: false, error: message };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.auth.logout();
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
      const response = await api.auth.me();
      if (response.success && response.data) {
        setState(prev => ({
          ...prev,
          user: response.data!,
          isAuthenticated: true,
        }));
      }
    } catch (error) {
      console.error('Failed to refresh user:', error);
    }
  }, []);

  const requestPasswordReset = useCallback(async (email: string) => {
    try {
      const response = await api.post<{ message: string }>('/api/auth/reset-password', { email });
      if (response.success) {
        return { success: true };
      }
      return { success: false, error: 'Failed to send reset email' };
    } catch (error) {
      const message = error instanceof ApiError
        ? error.message
        : 'An unexpected error occurred';
      return { success: false, error: message };
    }
  }, []);

  const value: AuthContextType = {
    ...state,
    login,
    signup,
    logout,
    refreshUser,
    requestPasswordReset,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
