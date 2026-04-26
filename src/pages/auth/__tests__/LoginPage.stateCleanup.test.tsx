import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

/**
 * AUTH-024 — LoginPage previously called window.history.replaceState({}, '')
 * to "clear" navigation state after consuming it. That cleared the URL but
 * NOT React Router's location.state, so the message would re-appear after
 * a back-navigation. Replaced with navigate(.., { replace: true, state: null }).
 *
 * This test renders a probe component below LoginPage that exposes the
 * current location.state, asserts the message renders, then asserts that
 * after the cleanup effect runs, location.state is null.
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

function StateProbe() {
    const location = useLocation();
    return (
        <div data-testid="state-probe">
            {location.state === null ? 'NULL' : JSON.stringify(location.state)}
        </div>
    );
}

function renderWithMessage(state: Record<string, unknown>) {
    const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    return render(
        <HelmetProvider>
            <QueryClientProvider client={qc}>
                <MemoryRouter initialEntries={[{ pathname: '/login', state }]}>
                    <AuthProvider>
                        <LoginPage />
                        <StateProbe />
                    </AuthProvider>
                </MemoryRouter>
            </QueryClientProvider>
        </HelmetProvider>,
    );
}

describe('LoginPage state cleanup — AUTH-024', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the message from state on first paint', async () => {
        renderWithMessage({ message: 'Account created — please log in.' });
        // The message should render at least once
        await waitFor(() => {
            expect(screen.getByText(/Account created — please log in\./)).toBeTruthy();
        });
    });

    it('clears location.state to null after consuming the message', async () => {
        renderWithMessage({ message: 'Account created — please log in.' });
        // After the cleanup effect fires (replace navigation), state should be null
        await waitFor(() => {
            expect(screen.getByTestId('state-probe').textContent).toBe('NULL');
        });
    });
});
