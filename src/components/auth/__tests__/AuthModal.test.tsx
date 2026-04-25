import { describe, it, expect, beforeEach, vi } from 'vitest';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

/**
 * Coverage for the AuthModal Turnstile carryover (data-layer refactor).
 *
 * The original AUTH-029 hotfix (commit 5b8c37f-era) added Turnstile to the
 * full-page /signup and /reset-password surfaces but did not touch this
 * inline modal — leaving one bot-accessible signup path. This branch wires
 * useTurnstile into AuthModal, gates the submit button on captchaToken,
 * passes the token to signup(), and resets the challenge on signup failure.
 */

const loginMock = vi.fn();
const signupMock = vi.fn();
const requestPasswordResetMock = vi.fn();
const signInWithGoogleMock = vi.fn();
const signInWithAppleMock = vi.fn();

vi.mock('../../../context/AuthContext', () => ({
    useAuth: () => ({
        login: loginMock,
        signup: signupMock,
        requestPasswordReset: requestPasswordResetMock,
        signInWithGoogle: signInWithGoogleMock,
        signInWithApple: signInWithAppleMock,
    }),
}));

vi.mock('../../../services/consentService', () => ({
    consentService: {
        logBulkConsent: vi.fn().mockResolvedValue(undefined),
    },
}));

// Controllable Turnstile mock. Tests configure {token, reset} via setters.
const turnstileState = {
    token: null as string | null,
    resetSpy: vi.fn(),
};
vi.mock('../../../lib/auth/useTurnstile', () => ({
    useTurnstile: () => ({
        widget: <div data-testid="turnstile-widget" />,
        token: turnstileState.token,
        reset: turnstileState.resetSpy,
    }),
}));

import AuthModal from '../AuthModal';

function renderModal() {
    return render(
        <MemoryRouter>
            <AuthModal isOpen onClose={() => {}} />
        </MemoryRouter>,
    );
}

function openModalInSignupView() {
    renderModal();
    // The "Sign up" link at the bottom of the login view switches to signup.
    fireEvent.click(screen.getByRole('button', { name: 'Sign up' }));
}

function fillSignupForm() {
    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'Avery' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'a@b.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'newpw1234' } });
    // Tick all required consent checkboxes (ToS, privacy, data
    // processing, age verification). Newsletter is optional but is also
    // toggled — the assertion looks at the metadata payload, not the
    // newsletter flag.
    const checkboxes = screen.getAllByRole('checkbox');
    checkboxes.forEach((cb) => {
        if (!(cb as HTMLInputElement).checked) {
            fireEvent.click(cb);
        }
    });
}

describe('AuthModal — Turnstile (carryover)', () => {
    beforeEach(() => {
        loginMock.mockReset();
        signupMock.mockReset();
        requestPasswordResetMock.mockReset();
        signInWithGoogleMock.mockReset();
        signInWithAppleMock.mockReset();
        turnstileState.token = null;
        turnstileState.resetSpy.mockReset();

        signupMock.mockResolvedValue({ success: true });
    });

    it('renders the Turnstile widget on the signup view', () => {
        openModalInSignupView();
        expect(screen.getByTestId('turnstile-widget')).toBeInTheDocument();
    });

    it('does NOT render the Turnstile widget on the login view', () => {
        renderModal();
        // Default view is login. Widget gated by `view === 'signup'`.
        expect(screen.queryByTestId('turnstile-widget')).not.toBeInTheDocument();
    });

    it('disables submit while captchaToken is null', () => {
        openModalInSignupView();
        const submit = screen.getByRole('button', { name: /create account/i });
        expect(submit).toBeDisabled();
    });

    it('enables submit once captchaToken is present', () => {
        turnstileState.token = 'tok-abc';
        openModalInSignupView();
        const submit = screen.getByRole('button', { name: /create account/i });
        expect(submit).not.toBeDisabled();
    });

    it('passes captchaToken as the 6th argument to signup()', async () => {
        turnstileState.token = 'tok-xyz';
        openModalInSignupView();
        fillSignupForm();

        await act(async () => {
            fireEvent.submit(screen.getByLabelText('Email').closest('form')!);
        });

        await waitFor(() => expect(signupMock).toHaveBeenCalledTimes(1));
        const args = signupMock.mock.calls[0];
        expect(args[0]).toBe('a@b.com');           // email
        expect(args[1]).toBe('newpw1234');         // password
        expect(args[2]).toBe('Avery');             // displayName
        expect(args[3]).toBe('patient');           // role
        expect(args[4]).toMatchObject({ age_verified: true, consent_version: 'v1.0' });
        expect(args[5]).toBe('tok-xyz');           // captchaToken
    });

    it('resets the captcha when signup() returns failure', async () => {
        turnstileState.token = 'tok-fail';
        signupMock.mockResolvedValueOnce({ success: false, error: 'Email already exists' });
        openModalInSignupView();
        fillSignupForm();

        await act(async () => {
            fireEvent.submit(screen.getByLabelText('Email').closest('form')!);
        });

        await waitFor(() => expect(signupMock).toHaveBeenCalled());
        expect(turnstileState.resetSpy).toHaveBeenCalledTimes(1);
    });

    it('resets the captcha when signup() throws', async () => {
        turnstileState.token = 'tok-throw';
        signupMock.mockRejectedValueOnce(new Error('network down'));
        vi.spyOn(console, 'error').mockImplementation(() => {});
        openModalInSignupView();
        fillSignupForm();

        await act(async () => {
            fireEvent.submit(screen.getByLabelText('Email').closest('form')!);
        });

        await waitFor(() => expect(turnstileState.resetSpy).toHaveBeenCalledTimes(1));
    });
});
