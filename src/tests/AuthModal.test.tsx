import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AuthModal from '../components/auth/AuthModal';
import { AuthProvider } from '../context/AuthContext';

// Mock Lucide icons
vi.mock('lucide-react', () => ({
    X: () => <svg data-testid="icon-close" />,
    Mail: () => <svg data-testid="icon-mail" />,
    Lock: () => <svg data-testid="icon-lock" />,
    User: () => <svg data-testid="icon-user" />,
    ArrowRight: () => <svg data-testid="icon-arrow-right" />,
    Github: () => <svg data-testid="icon-github" />,
    Chrome: () => <svg data-testid="icon-chrome" />,
    Sparkles: () => <svg data-testid="icon-sparkles" />,
    Loader2: () => <svg data-testid="icon-loader" />,
    AlertCircle: () => <svg data-testid="icon-alert" />,
    CheckCircle: () => <svg data-testid="icon-check" />,
}));

// Mock the API module
vi.mock('../lib/api', () => ({
    api: {
        auth: {
            login: vi.fn(),
            signup: vi.fn(),
            logout: vi.fn(),
            me: vi.fn(),
        },
        post: vi.fn(),
    },
    tokenStorage: {
        getAccessToken: vi.fn(() => null),
        getRefreshToken: vi.fn(() => null),
        setTokens: vi.fn(),
        clearTokens: vi.fn(),
        isAuthenticated: vi.fn(() => false),
    },
    ApiError: class ApiError extends Error {
        constructor(message: string, public status: number, public data?: unknown) {
            super(message);
            this.name = 'ApiError';
        }
    },
}));

// Helper to render with AuthProvider
const renderWithAuth = (ui: React.ReactElement) => {
    return render(
        <AuthProvider>
            {ui}
        </AuthProvider>
    );
};

describe('AuthModal Accessibility', () => {
    it('inputs should be associated with their labels', () => {
        renderWithAuth(<AuthModal isOpen={true} onClose={() => {}} />);

        // Check for Email input association
        const emailInput = screen.getByLabelText(/Email/i);
        expect(emailInput).toBeInTheDocument();
        expect(emailInput).toHaveAttribute('type', 'email');

        // Check for Password input association (default view is login)
        const passwordInput = screen.getByLabelText(/Password/i);
        expect(passwordInput).toBeInTheDocument();
        expect(passwordInput).toHaveAttribute('type', 'password');
    });

    it('close button should have an accessible label', () => {
        renderWithAuth(<AuthModal isOpen={true} onClose={() => {}} />);

        const closeButton = screen.getByRole('button', { name: /close modal/i });
        expect(closeButton).toBeInTheDocument();
    });
});
