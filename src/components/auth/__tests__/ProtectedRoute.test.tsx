import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';

const mockAuth = {
    isAuthenticated: false,
    isLoading: false,
    user: null,
    login: vi.fn(),
    signup: vi.fn(),
    logout: vi.fn(),
    refreshUser: vi.fn(),
    requestPasswordReset: vi.fn(),
    signInWithGoogle: vi.fn(),
    signInWithApple: vi.fn(),
};

vi.mock('../../../context/AuthContext', () => ({
    useAuth: () => mockAuth,
}));

describe('ProtectedRoute', () => {
    beforeEach(() => {
        mockAuth.isAuthenticated = false;
        mockAuth.isLoading = false;
        mockAuth.user = null;
    });

    it('should render children when authenticated', () => {
        mockAuth.isAuthenticated = true;
        render(
            <MemoryRouter>
                <ProtectedRoute>
                    <div>Protected content</div>
                </ProtectedRoute>
            </MemoryRouter>
        );
        expect(screen.getByText('Protected content')).toBeInTheDocument();
    });

    it('should redirect to login when not authenticated', () => {
        mockAuth.isAuthenticated = false;
        render(
            <MemoryRouter initialEntries={['/dashboard']}>
                <ProtectedRoute>
                    <div>Protected content</div>
                </ProtectedRoute>
            </MemoryRouter>
        );
        expect(screen.queryByText('Protected content')).not.toBeInTheDocument();
    });

    it('should show loading when auth is loading', () => {
        mockAuth.isLoading = true;
        render(
            <MemoryRouter>
                <ProtectedRoute>
                    <div>Protected content</div>
                </ProtectedRoute>
            </MemoryRouter>
        );
        expect(screen.queryByText('Protected content')).not.toBeInTheDocument();
    });
});
