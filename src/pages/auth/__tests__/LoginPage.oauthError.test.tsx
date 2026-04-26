import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';

/**
 * AUTH-003 + AUTH-019 — LoginPage must consume OAuth errors handed
 * back via location.state.error or ?error=, route them through the
 * central mapper, and render the localized message.
 */

vi.mock('@/lib/supabaseClient', () => ({
    supabase: {
        auth: {
            getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
            onAuthStateChange: vi.fn(() => ({ data: { subscription: { unsubscribe: vi.fn() } } })),
            getUser: vi.fn().mockResolvedValue({ data: { user: null } }),
            signInWithPassword: vi.fn(),
            signOut: vi.fn(),
        },
    },
}));

vi.mock('@/lib/urls', () => ({
    adminUrl: (path: string) => `https://admin.example.com${path}`,
    mainUrl: (path: string) => `https://www.example.com${path}`,
}));

import { AuthProvider } from '@/context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginPage from '../LoginPage';

function renderWith(state?: Record<string, unknown>, search?: string) {
    const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const entry: { pathname: string; state?: unknown; search?: string } = { pathname: '/login' };
    if (state) entry.state = state;
    if (search) entry.search = search;
    return render(
        <HelmetProvider>
            <I18nextProvider i18n={i18n}>
                <QueryClientProvider client={qc}>
                    <MemoryRouter initialEntries={[entry]}>
                        <AuthProvider>
                            <LoginPage />
                        </AuthProvider>
                    </MemoryRouter>
                </QueryClientProvider>
            </I18nextProvider>
        </HelmetProvider>,
    );
}

describe('LoginPage — OAuth error consumption (AUTH-003)', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the mapped/localized error from location.state.error', async () => {
        renderWith({ error: 'Invalid login credentials' });
        await waitFor(() => {
            expect(screen.getByText(/Email or password doesn't match/i)).toBeTruthy();
        });
    });

    it('renders the mapped/localized error from ?error= query', async () => {
        renderWith(undefined, '?error=Invalid%20login%20credentials');
        await waitFor(() => {
            expect(screen.getByText(/Email or password doesn't match/i)).toBeTruthy();
        });
    });

    it('falls through to the generic message for an unrecognized error', async () => {
        renderWith({ error: 'Something obscure happened in OAuth flow xyz' });
        await waitFor(() => {
            expect(screen.getByText(/Something went wrong/i)).toBeTruthy();
        });
    });
});

describe('LoginPage — AUTH-031 enumeration regression', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('does NOT render "No account found" enumeration copy for "User not found"', async () => {
        renderWith({ error: 'User not found' });
        // Should fall through to the generic message — verifies we don't
        // disclose existence to the caller.
        await waitFor(() => {
            expect(screen.getByText(/Something went wrong/i)).toBeTruthy();
        });
        expect(screen.queryByText(/No account found/i)).toBeNull();
    });
});
