import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { act, render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

/**
 * Coverage for AUTH-011, AUTH-012, AUTH-022 (data-layer refactor).
 *
 *  - AUTH-012: login does not call setState. Only the onAuthStateChange
 *    listener mutates auth state. Eliminates the dual-source-of-truth
 *    flicker.
 *  - AUTH-011: logout clears the TanStack Query cache, both directly
 *    (same-tab) and defensively via the SIGNED_OUT listener (cross-tab).
 *  - AUTH-022: logout always navigates. Default is /login; callers may
 *    pass a custom redirect.
 */

const navigateMock = vi.fn();

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
    return {
        ...actual,
        useNavigate: () => navigateMock,
    };
});

const getSessionMock = vi.fn();
const onAuthStateChangeMock = vi.fn();
const signInWithPasswordMock = vi.fn();
const signOutMock = vi.fn();

// Captures the listener callback so tests can fire events synchronously.
let listenerCallback: ((event: string, session: unknown) => void) | null = null;

vi.mock('../../lib/supabaseClient', () => ({
    supabase: {
        auth: {
            getSession: () => getSessionMock(),
            onAuthStateChange: (cb: (event: string, session: unknown) => void) => {
                listenerCallback = cb;
                onAuthStateChangeMock(cb);
                return { data: { subscription: { unsubscribe: vi.fn() } } };
            },
            signUp: vi.fn(),
            signInWithPassword: (...args: unknown[]) => signInWithPasswordMock(...args),
            signInWithOAuth: vi.fn(),
            signOut: (...args: unknown[]) => signOutMock(...args),
            getUser: vi.fn(),
            resetPasswordForEmail: vi.fn(),
        },
    },
}));

import { AuthProvider, useAuth } from '../AuthContext';
import type { AuthContextType } from '../AuthContextDefinition';

let captured: AuthContextType | null = null;

function CaptureAuth() {
    const ctx = useAuth();
    // useEffect avoids side-effect-during-render lint rule. Tests use
    // waitFor to wait for `captured` to be populated post-effect.
    React.useEffect(() => {
        captured = ctx;
    });
    return null;
}

function renderWithProviders(queryClient: QueryClient) {
    return render(
        <QueryClientProvider client={queryClient}>
            <MemoryRouter>
                <AuthProvider>
                    <CaptureAuth />
                </AuthProvider>
            </MemoryRouter>
        </QueryClientProvider>,
    );
}

function makeUser(overrides: Record<string, unknown> = {}) {
    return {
        id: 'u1',
        email: 'u1@example.com',
        user_metadata: {},
        app_metadata: { role: 'patient' },
        ...overrides,
    };
}

describe('AuthContext lifecycle — AUTH-011, AUTH-012, AUTH-022', () => {
    beforeEach(() => {
        getSessionMock.mockReset();
        onAuthStateChangeMock.mockReset();
        signInWithPasswordMock.mockReset();
        signOutMock.mockReset();
        navigateMock.mockReset();
        listenerCallback = null;
        captured = null;

        getSessionMock.mockResolvedValue({ data: { session: null } });
    });

    describe('AUTH-012 — login is listener-only', () => {
        it('does not call setState in the login function (state changes only via the listener)', async () => {
            signInWithPasswordMock.mockResolvedValue({
                data: { user: makeUser({ id: 'u-login' }) },
                error: null,
            });

            const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
            renderWithProviders(queryClient);

            await waitFor(() => expect(captured).not.toBeNull());

            // Pre-login: not authenticated
            expect(captured!.isAuthenticated).toBe(false);

            // Call login. signInWithPassword resolves but the listener has
            // NOT fired SIGNED_IN yet — captured.isAuthenticated MUST still
            // be false. This is what the dual-setState pattern broke.
            const loginResult = await act(async () => {
                return captured!.login('u@example.com', 'pw');
            });

            expect(loginResult).toEqual({ success: true });
            // State is still pre-login because the listener hasn't fired.
            // (In production Supabase fires SIGNED_IN automatically; the test
            // demonstrates that login() itself does NOT mutate state.)
            expect(captured!.isAuthenticated).toBe(false);

            // Now fire the listener — state finally updates.
            await act(async () => {
                listenerCallback!('SIGNED_IN', { user: makeUser({ id: 'u-login' }) });
            });
            expect(captured!.isAuthenticated).toBe(true);
        });

        it('returns success: false on signInWithPassword error', async () => {
            signInWithPasswordMock.mockResolvedValue({
                data: { user: null },
                error: { message: 'Invalid credentials' },
            });

            const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
            renderWithProviders(queryClient);

            await waitFor(() => expect(captured).not.toBeNull());

            const result = await act(async () => captured!.login('u@example.com', 'pw'));
            expect(result).toEqual({ success: false, error: 'Invalid credentials' });
            expect(captured!.isAuthenticated).toBe(false);
        });
    });

    describe('AUTH-011 — logout clears query cache', () => {
        it('clears cache directly when logout() is called (same-tab)', async () => {
            signOutMock.mockResolvedValue({ error: null });

            const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
            queryClient.setQueryData(['mood-entries'], [{ id: 1, mood: 'happy' }]);
            queryClient.setQueryData(['user-profile'], { id: 'u1' });

            renderWithProviders(queryClient);
            await waitFor(() => expect(captured).not.toBeNull());

            // Sanity: data is in cache
            expect(queryClient.getQueryData(['mood-entries'])).toBeDefined();

            await act(async () => {
                await captured!.logout();
            });

            expect(queryClient.getQueryData(['mood-entries'])).toBeUndefined();
            expect(queryClient.getQueryData(['user-profile'])).toBeUndefined();
        });

        it('clears cache defensively when SIGNED_OUT fires from another tab', async () => {
            signOutMock.mockResolvedValue({ error: null });

            const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
            queryClient.setQueryData(['mood-entries'], [{ id: 1 }]);

            renderWithProviders(queryClient);
            await waitFor(() => expect(listenerCallback).not.toBeNull());

            // Simulate a SIGNED_OUT event arriving from another tab — no
            // local logout() call. The defensive listener path must clear.
            await act(async () => {
                listenerCallback!('SIGNED_OUT', null);
            });

            expect(queryClient.getQueryData(['mood-entries'])).toBeUndefined();
        });
    });

    describe('AUTH-022 — logout navigates', () => {
        it('navigates to /login by default with replace: true', async () => {
            signOutMock.mockResolvedValue({ error: null });

            const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
            renderWithProviders(queryClient);
            await waitFor(() => expect(captured).not.toBeNull());

            await act(async () => {
                await captured!.logout();
            });

            expect(navigateMock).toHaveBeenCalledWith('/login', { replace: true });
        });

        it('navigates to a custom redirect when provided', async () => {
            signOutMock.mockResolvedValue({ error: null });

            const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
            renderWithProviders(queryClient);
            await waitFor(() => expect(captured).not.toBeNull());

            await act(async () => {
                await captured!.logout('/custom-landing');
            });

            expect(navigateMock).toHaveBeenCalledWith('/custom-landing', { replace: true });
        });

        it('still navigates even if signOut throws (resilient cleanup)', async () => {
            signOutMock.mockRejectedValue(new Error('network blip'));

            const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
            queryClient.setQueryData(['x'], 'y');

            renderWithProviders(queryClient);
            await waitFor(() => expect(captured).not.toBeNull());

            await act(async () => {
                await captured!.logout();
            });

            // Cache cleared (it ran before signOut)
            expect(queryClient.getQueryData(['x'])).toBeUndefined();
            // Navigation still happens
            expect(navigateMock).toHaveBeenCalledWith('/login', { replace: true });
        });
    });

    describe('deleteAccount — same lifecycle contract', () => {
        it('clears cache and navigates to /login on successful deletion', async () => {
            // Mock the privacyService dynamic import.
            vi.doMock('../../services/privacyService', () => ({
                privacyService: {
                    requestAccountDeletion: vi.fn().mockResolvedValue({ success: true }),
                },
            }));
            signOutMock.mockResolvedValue({ error: null });

            const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
            queryClient.setQueryData(['mood-entries'], [{ id: 1 }]);

            renderWithProviders(queryClient);
            await waitFor(() => expect(captured).not.toBeNull());

            const result = await act(async () => captured!.deleteAccount());

            expect(result).toEqual({ success: true });
            expect(queryClient.getQueryData(['mood-entries'])).toBeUndefined();
            expect(navigateMock).toHaveBeenCalledWith('/login', { replace: true });
        });
    });
});
