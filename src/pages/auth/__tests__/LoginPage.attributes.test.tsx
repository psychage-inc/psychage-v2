import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

/**
 * Coverage for AUTH-007 (autoComplete + inputMode + autoCapitalize +
 * spellCheck on auth inputs) and AUTH-024 (history.replaceState
 * cleanup — see LoginPage.stateCleanup.test.tsx for the runtime check).
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

function renderPage() {
    const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    return render(
        <HelmetProvider>
            <QueryClientProvider client={qc}>
                <MemoryRouter initialEntries={['/login']}>
                    <AuthProvider>
                        <LoginPage />
                    </AuthProvider>
                </MemoryRouter>
            </QueryClientProvider>
        </HelmetProvider>,
    );
}

describe('LoginPage — input attributes (AUTH-007)', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('email input has autoComplete=email + inputMode=email + spellCheck=false + autoCapitalize=off', () => {
        renderPage();
        const email = screen.getByLabelText(/Email address/i) as HTMLInputElement;
        expect(email.getAttribute('autocomplete')).toBe('email');
        expect(email.getAttribute('inputmode')).toBe('email');
        expect(email.getAttribute('autocapitalize')).toBe('off');
        expect(email.getAttribute('spellcheck')).toBe('false');
    });

    it('password input has autoComplete=current-password', () => {
        renderPage();
        const pw = screen.getByLabelText(/^Password$/i) as HTMLInputElement;
        expect(pw.getAttribute('autocomplete')).toBe('current-password');
    });
});
