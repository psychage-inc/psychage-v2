
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect, vi } from 'vitest';
import AuthModal from '../components/auth/AuthModal';
import { AuthProvider } from '../context/AuthContext';
import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

// Mock Lucide icons
vi.mock('lucide-react', () => ({
    X: () => <svg data-testid="icon-close" />,
    Mail: () => <svg data-testid="icon-mail" />,
    Lock: () => <svg data-testid="icon-lock" />,
    User: () => <svg data-testid="icon-user" />,
    ArrowRight: () => <svg data-testid="icon-arrow-right" />,
    Loader2: () => <svg data-testid="icon-loader" />,
    AlertCircle: () => <svg data-testid="icon-alert" />,
    CheckCircle: () => <svg data-testid="icon-check" />,
}));

// Mock the API module
vi.mock('../lib/api', () => ({
    api: {
        post: vi.fn(),
    },
    ApiError: class ApiError extends Error {
        constructor(message: string, public status: number, public data?: unknown) {
            super(message);
            this.name = 'ApiError';
        }
    },
}));

// Helper to render with AuthProvider. Post-data-layer refactor the
// AuthProvider depends on a Router (useNavigate) and a QueryClient
// (useQueryClient), so the wrappers are required.
const renderWithAuth = (ui: React.ReactElement) => {
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    return render(
        <QueryClientProvider client={queryClient}>
            <MemoryRouter>
                <AuthProvider>{ui}</AuthProvider>
            </MemoryRouter>
        </QueryClientProvider>
    );
};

describe('AuthModal Accessibility', () => {
    it('inputs should be associated with their labels', () => {
        renderWithAuth(<AuthModal isOpen={true} onClose={() => { }} />);

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
        renderWithAuth(<AuthModal isOpen={true} onClose={() => { }} />);

        const closeButton = screen.getAllByRole('button', { name: /close modal/i })[0];
        expect(closeButton).toBeInTheDocument();
    });
});
