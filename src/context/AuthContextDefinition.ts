import { createContext } from 'react';
import { User } from '../lib/api';

// AUTH-010 — signup extraMetadata is restricted to a known shape.
// Concrete type lives in AuthContext.tsx (SignupExtraMetadata).
export type SignupExtraMetadataLike = {
    age_verified?: boolean;
    consent_version?: string;
    country?: string;
    age?: number;
    referral_source?: string;
};

export interface AuthState {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
}

export interface AuthContextType extends AuthState {
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    signup: (email: string, password: string, displayName?: string, role?: 'patient' | 'provider', extraMetadata?: SignupExtraMetadataLike) => Promise<{ success: boolean; error?: string }>;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
    requestPasswordReset: (email: string) => Promise<{ success: boolean; error?: string }>;
    signInWithGoogle: () => Promise<{ success: boolean; error?: string }>;
    signInWithApple: () => Promise<{ success: boolean; error?: string }>;
    deleteAccount: () => Promise<{ success: boolean; error?: string }>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
