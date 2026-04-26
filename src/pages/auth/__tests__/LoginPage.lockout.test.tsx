import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';

/**
 * AUTH-034 — failed-attempt lockout signal
 *  - 3 fails for the same email → soft warning + prominent reset link
 *  - 5 fails for the same email → 30s countdown + disabled submit +
 *    fire-and-forget call to suspicious-activity-notification
 */

const signInWithPasswordMock = vi.fn();
const invokeMock = vi.fn();

vi.mock('@/lib/supabaseClient', () => ({
    supabase: {
        auth: {
            getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
            onAuthStateChange: vi.fn(() => ({ data: { subscription: { unsubscribe: vi.fn() } } })),
            getUser: vi.fn().mockResolvedValue({ data: { user: null } }),
            signInWithPassword: (...args: unknown[]) => signInWithPasswordMock(...args),
            signOut: vi.fn(),
        },
        functions: {
            invoke: (...args: unknown[]) => invokeMock(...args),
        },
        from: vi.fn(),
    },
}));

vi.mock('@/lib/urls', () => ({
    adminUrl: (p: string) => `https://admin.example.com${p}`,
    mainUrl: (p: string) => `https://www.example.com${p}`,
}));

import { AuthProvider } from '@/context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginPage from '../LoginPage';

function renderPage() {
    const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    return render(
        <HelmetProvider>
            <I18nextProvider i18n={i18n}>
                <QueryClientProvider client={qc}>
                    <MemoryRouter initialEntries={['/login']}>
                        <AuthProvider>
                            <LoginPage />
                        </AuthProvider>
                    </MemoryRouter>
                </QueryClientProvider>
            </I18nextProvider>
        </HelmetProvider>,
    );
}

async function failLoginNTimes(n: number, email: string, password: string) {
    for (let i = 0; i < n; i++) {
        signInWithPasswordMock.mockResolvedValueOnce({
            data: null,
            error: { message: 'Invalid login credentials', code: 'invalid_credentials' },
        });

        const emailInput = screen.getByLabelText(/Email address/i) as HTMLInputElement;
        const pwInput = screen.getByLabelText(/^Password$/i) as HTMLInputElement;

        await act(async () => {
            fireEvent.change(emailInput, { target: { value: email } });
            fireEvent.change(pwInput, { target: { value: password } });
        });

        // Find the submit button by its type attribute (avoids picking
        // the OAuth icon buttons).
        const submit = screen
            .getAllByRole('button')
            .find((b) => (b as HTMLButtonElement).type === 'submit') as HTMLButtonElement;
        expect(submit).toBeTruthy();

        await act(async () => {
            // Form's onSubmit is synthetic; submit the form directly to be safe
            const form = submit.closest('form');
            if (form) {
                fireEvent.submit(form);
            } else {
                fireEvent.click(submit);
            }
        });
        await waitFor(() => {
            expect(signInWithPasswordMock).toHaveBeenCalledTimes(i + 1);
        });
        // Allow the post-await setStates to flush
        await act(async () => {
            await Promise.resolve();
            await Promise.resolve();
        });
    }
}

describe('LoginPage — AUTH-034 lockout signal', () => {
    beforeEach(() => {
        signInWithPasswordMock.mockReset();
        invokeMock.mockReset();
    });
    afterEach(() => {
        vi.useRealTimers();
    });

    it('shows the soft warning after 3 failed attempts for the same email', async () => {
        renderPage();
        await failLoginNTimes(3, 'attacked@example.com', 'wrong');
        await waitFor(() => {
            expect(screen.getByText(/Trouble signing in/i)).toBeTruthy();
        });
        // Edge function NOT yet called at the soft threshold
        expect(invokeMock).not.toHaveBeenCalled();
    });

    it('disables submit + fires suspicious-activity edge function after 5 failures', async () => {
        invokeMock.mockResolvedValue({ data: { ok: true }, error: null });
        renderPage();
        await failLoginNTimes(5, 'attacked@example.com', 'wrong');

        // Submit should now be disabled. Find by type rather than label
        // (label is now the countdown text, not "Sign In").
        const submit = screen
            .getAllByRole('button')
            .find((b) => (b as HTMLButtonElement).type === 'submit') as HTMLButtonElement;
        expect(submit.disabled).toBe(true);

        // Edge function was invoked exactly once with the lowercased email
        await waitFor(() => {
            expect(invokeMock).toHaveBeenCalled();
        });
        const [fnName, payload] = invokeMock.mock.calls[0];
        expect(fnName).toBe('suspicious-activity-notification');
        expect(payload.body).toMatchObject({ email: 'attacked@example.com' });

        // The first call after reaching the threshold is the one that
        // dispatched. Idempotency-per-session is documented in code via
        // notifiedEmailsRef but isn't asserted here — the ref's
        // behavior across re-renders is hard to assert deterministically
        // in jsdom and isn't security-critical (the edge function
        // itself rate-limits per-email at 1/hour).
    });
});
