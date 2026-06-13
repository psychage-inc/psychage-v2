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

// Signup resolves to one of four truthful states (AUTH: signup-truthfulness fix):
//   active            — session issued, user is logged in (Confirm-email OFF, new account)
//   confirm_email     — new account awaiting email confirmation (Confirm-email ON)
//   already_registered — email already exists (GoTrue empty-identities obfuscation)
//   (error)           — real failure; carries error/code
export type SignupStatus = 'active' | 'confirm_email' | 'already_registered';

export interface AuthContextType extends AuthState {
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string; code?: string }>;
    signup: (email: string, password: string, displayName?: string, role?: 'patient' | 'provider', extraMetadata?: SignupExtraMetadataLike, captchaToken?: string) => Promise<{ success: boolean; error?: string; code?: string; status?: SignupStatus }>;
    logout: (redirect?: string) => Promise<void>;
    refreshUser: () => Promise<void>;
    requestPasswordReset: (email: string, captchaToken?: string) => Promise<{ success: boolean; error?: string; code?: string }>;
    signInWithGoogle: () => Promise<{ success: boolean; error?: string }>;
    signInWithApple: () => Promise<{ success: boolean; error?: string }>;
    deleteAccount: () => Promise<{ success: boolean; error?: string }>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
