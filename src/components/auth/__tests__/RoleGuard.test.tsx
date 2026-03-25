 
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import RoleGuard from '../RoleGuard';

const mockAuth: any = {
    isAuthenticated: true,
    isLoading: false,
    user: { id: '1', email: 'test@test.com', role: 'patient' },
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

describe('RoleGuard', () => {
    beforeEach(() => {
        mockAuth.isAuthenticated = true;
        mockAuth.isLoading = false;
        mockAuth.user = { id: '1', email: 'test@test.com', role: 'patient' };
    });

    it('should render children when user has allowed role', () => {
        render(
            <MemoryRouter>
                <RoleGuard allowedRoles={['patient']}>
                    <div>Patient content</div>
                </RoleGuard>
            </MemoryRouter>
        );
        expect(screen.getByText('Patient content')).toBeInTheDocument();
    });

    it('should redirect when user role not in allowedRoles', () => {
        mockAuth.user = { id: '1', email: 'test@test.com', role: 'patient' };
        render(
            <MemoryRouter>
                <RoleGuard allowedRoles={['admin']}>
                    <div>Admin only</div>
                </RoleGuard>
            </MemoryRouter>
        );
        expect(screen.queryByText('Admin only')).not.toBeInTheDocument();
    });

    it('should allow admin access to admin routes', () => {
        mockAuth.user = { id: '1', email: 'admin@test.com', role: 'admin' };
        render(
            <MemoryRouter>
                <RoleGuard allowedRoles={['admin']}>
                    <div>Admin dashboard</div>
                </RoleGuard>
            </MemoryRouter>
        );
        expect(screen.getByText('Admin dashboard')).toBeInTheDocument();
    });

    it('should allow multiple roles', () => {
        mockAuth.user = { id: '1', email: 'doc@test.com', role: 'provider' };
        render(
            <MemoryRouter>
                <RoleGuard allowedRoles={['admin', 'provider']}>
                    <div>Multi-role content</div>
                </RoleGuard>
            </MemoryRouter>
        );
        expect(screen.getByText('Multi-role content')).toBeInTheDocument();
    });

    it('should redirect to login when not authenticated', () => {
        mockAuth.isAuthenticated = false;
        mockAuth.user = null;
        render(
            <MemoryRouter>
                <RoleGuard allowedRoles={['patient']}>
                    <div>Protected</div>
                </RoleGuard>
            </MemoryRouter>
        );
        expect(screen.queryByText('Protected')).not.toBeInTheDocument();
    });

    it('should show loading state', () => {
        mockAuth.isLoading = true;
        render(
            <MemoryRouter>
                <RoleGuard allowedRoles={['patient']}>
                    <div>Content</div>
                </RoleGuard>
            </MemoryRouter>
        );
        expect(screen.queryByText('Content')).not.toBeInTheDocument();
    });
});
