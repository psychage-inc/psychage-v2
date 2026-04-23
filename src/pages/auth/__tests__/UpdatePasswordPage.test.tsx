import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

/**
 * Coverage for AUTH-009: /update-password must refuse to render the
 * password form when the caller has an existing session and arrived
 * without a PASSWORD_RECOVERY event.
 *
 * Authorization rule (per AUTH-009 fix):
 *   allowed = recoveryEventReceived
 *             OR (no session existed on mount AND a session is now present)
 */

const getSessionMock = vi.fn();
const onAuthStateChangeMock = vi.fn();
const updateUserMock = vi.fn();
const signOutMock = vi.fn();

vi.mock('@/lib/supabaseClient', () => ({
    supabase: {
        auth: {
            getSession: () => getSessionMock(),
            onAuthStateChange: (cb: unknown) => onAuthStateChangeMock(cb),
            updateUser: (...args: unknown[]) => updateUserMock(...args),
            signOut: (...args: unknown[]) => signOutMock(...args),
        },
    },
}));

import UpdatePasswordPage from '../UpdatePasswordPage';

let listenerCb: ((event: string, session: unknown) => void) | null = null;

function renderPage() {
    return render(
        <HelmetProvider>
            <MemoryRouter initialEntries={['/update-password']}>
                <UpdatePasswordPage />
            </MemoryRouter>
        </HelmetProvider>,
    );
}

describe('UpdatePasswordPage — AUTH-009', () => {
    beforeEach(() => {
        getSessionMock.mockReset();
        onAuthStateChangeMock.mockReset();
        updateUserMock.mockReset();
        signOutMock.mockReset();
        listenerCb = null;

        onAuthStateChangeMock.mockImplementation((cb) => {
            listenerCb = cb as (event: string, session: unknown) => void;
            return { data: { subscription: { unsubscribe: vi.fn() } } };
        });
        updateUserMock.mockResolvedValue({ error: null });
        signOutMock.mockResolvedValue({ error: null });

        // Reset the URL hash/search between tests
        window.history.replaceState({}, '', '/update-password');
    });

    it('refuses to render the form when the user has an existing session and no PASSWORD_RECOVERY event fires', async () => {
        getSessionMock.mockResolvedValue({
            data: { session: { user: { id: 'u1', email: 'a@b.com' } } },
        });

        renderPage();

        await waitFor(() =>
            expect(
                screen.queryByTestId('update-password-refused-existing-session'),
            ).toBeInTheDocument(),
        );

        // Form must NOT be rendered
        expect(screen.queryByLabelText('New Password')).not.toBeInTheDocument();
    });

    it('renders the form when PASSWORD_RECOVERY fires (recovery via email)', async () => {
        getSessionMock.mockResolvedValue({ data: { session: null } });

        renderPage();

        // Wait for listener to attach
        await waitFor(() => expect(listenerCb).not.toBeNull());

        await act(async () => {
            listenerCb!('PASSWORD_RECOVERY', { user: { id: 'u-recovery' } });
        });

        await waitFor(() => expect(screen.getByLabelText('New Password')).toBeInTheDocument());
        expect(screen.queryByTestId('update-password-refused-existing-session')).not.toBeInTheDocument();
    });

    it('shows expired-link message when no session and no recovery params', async () => {
        getSessionMock.mockResolvedValue({ data: { session: null } });

        renderPage();

        await waitFor(() =>
            expect(screen.getByText(/invalid or expired reset link/i)).toBeInTheDocument(),
        );
    });

    it('signs out globally after a successful password update', async () => {
        getSessionMock.mockResolvedValue({ data: { session: null } });

        renderPage();

        await waitFor(() => expect(listenerCb).not.toBeNull());

        // Simulate PASSWORD_RECOVERY then submit
        await act(async () => {
            listenerCb!('PASSWORD_RECOVERY', { user: { id: 'u-recovery' } });
        });

        const passwordInput = await screen.findByLabelText('New Password');
        const confirmInput = screen.getByLabelText('Confirm New Password');

        fireEvent.change(passwordInput, { target: { value: 'newpass1234' } });
        fireEvent.change(confirmInput, { target: { value: 'newpass1234' } });

        const form = passwordInput.closest('form')!;
        fireEvent.submit(form);

        await waitFor(() => expect(updateUserMock).toHaveBeenCalled());
        await waitFor(() => expect(signOutMock).toHaveBeenCalledWith({ scope: 'global' }));
    });
});
