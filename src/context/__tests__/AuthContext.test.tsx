import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

/**
 * Coverage for AUTH-001: role resolution from app_metadata.
 *
 * Role must come from app_metadata (server-controlled), never user_metadata
 * (user-writable). A user who plants user_metadata.role='admin' via the
 * browser console must still resolve to 'patient'.
 *
 * AUTH-010 signup-allowlist coverage lives in
 * src/context/__tests__/AuthContext.signup.test.tsx (added in the AUTH-010
 * commit so this file stays single-purpose).
 */

const getSessionMock = vi.fn();
const onAuthStateChangeMock = vi.fn();

vi.mock('../../lib/supabaseClient', () => ({
    supabase: {
        auth: {
            getSession: () => getSessionMock(),
            onAuthStateChange: (cb: unknown) => onAuthStateChangeMock(cb),
            signUp: vi.fn(),
            signInWithPassword: vi.fn(),
            signInWithOAuth: vi.fn(),
            signOut: vi.fn(),
            getUser: vi.fn(),
            resetPasswordForEmail: vi.fn(),
        },
    },
}));

import { AuthProvider, useAuth } from '../AuthContext';

function RoleProbe() {
    const { user, isLoading } = useAuth();
    if (isLoading) return <span>loading</span>;
    return <span data-testid="role">{user?.role ?? 'none'}</span>;
}

function makeSessionResponse(user: Record<string, unknown> | null) {
    return Promise.resolve({ data: { session: user ? { user } : null } });
}

describe('AuthContext.mapSupabaseUser — AUTH-001', () => {
    beforeEach(() => {
        getSessionMock.mockReset();
        onAuthStateChangeMock.mockReset();
        onAuthStateChangeMock.mockReturnValue({ data: { subscription: { unsubscribe: vi.fn() } } });
    });

    it('ignores user_metadata.role and defaults to patient when app_metadata is empty', async () => {
        getSessionMock.mockReturnValue(
            makeSessionResponse({
                id: 'u1',
                email: 'u1@example.com',
                user_metadata: { role: 'admin' },
                app_metadata: {},
            }),
        );

        render(
            <AuthProvider>
                <RoleProbe />
            </AuthProvider>,
        );

        await waitFor(() => expect(screen.getByTestId('role')).toBeInTheDocument());
        expect(screen.getByTestId('role').textContent).toBe('patient');
    });

    it('resolves role from app_metadata.role when present', async () => {
        getSessionMock.mockReturnValue(
            makeSessionResponse({
                id: 'u2',
                email: 'u2@example.com',
                user_metadata: {},
                app_metadata: { role: 'admin' },
            }),
        );

        render(
            <AuthProvider>
                <RoleProbe />
            </AuthProvider>,
        );

        await waitFor(() => expect(screen.getByTestId('role').textContent).toBe('admin'));
    });

    it('app_metadata wins over user_metadata when both present', async () => {
        getSessionMock.mockReturnValue(
            makeSessionResponse({
                id: 'u3',
                email: 'u3@example.com',
                user_metadata: { role: 'admin' },
                app_metadata: { role: 'provider' },
            }),
        );

        render(
            <AuthProvider>
                <RoleProbe />
            </AuthProvider>,
        );

        await waitFor(() => expect(screen.getByTestId('role').textContent).toBe('provider'));
    });
});

