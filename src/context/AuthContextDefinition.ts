import { createContext } from 'react';
import { User } from '../lib/api';

export interface AuthState {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
}

export interface AuthContextType extends AuthState {
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    signup: (email: string, password: string, displayName?: string, role?: 'patient' | 'provider') => Promise<{ success: boolean; error?: string }>;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
    requestPasswordReset: (email: string) => Promise<{ success: boolean; error?: string }>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
