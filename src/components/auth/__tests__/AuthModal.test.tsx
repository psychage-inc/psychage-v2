import { describe, it, expect, beforeAll, beforeEach, vi } from 'vitest';
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

// Node >= 22 ships a global `localStorage` that shadows jsdom's and is
// undefined without --localstorage-file. Point the global at jsdom's Storage.
beforeAll(() => {
    vi.stubGlobal('localStorage', (globalThis as unknown as { jsdom: { window: Window } }).jsdom.window.localStorage);
});

const UNDER_18_TEXT =
    'Psychage accounts are for adults 18 and over. You can still read our free articles and watch our videos. If you need help now, call or text 988.';

function renderModal() {
    return render(
        <MemoryRouter>
            <AuthModal isOpen onClose={() => {}} />
        </MemoryRouter>,
    );
}

function switchToSignupView() {
    // The "Sign up" link at the bottom of the login view switches to signup.
    fireEvent.click(screen.getByRole('button', { name: 'Sign up' }));
}

function passAgeGate(birthYear = 1990) {
    fireEvent.change(screen.getByLabelText('What year were you born?'), { target: { value: String(birthYear) } });
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));
}

function openModalInSignupView() {
    renderModal();
    switchToSignupView();
    passAgeGate();
}

function fillSignupForm() {
    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'Avery' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'a@b.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'newpw1234' } });
    // Tick all required consent checkboxes (ToS, privacy, data
    // processing). Newsletter is optional but is also
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
        localStorage.clear();

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
        expect(args[4]).not.toHaveProperty('age');
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

describe('AuthModal — signup age gate (compliance item 5)', () => {
    beforeEach(() => {
        signupMock.mockReset();
        signInWithGoogleMock.mockReset();
        turnstileState.token = 'tok-gate';
        localStorage.clear();
        signupMock.mockResolvedValue({ success: true });
    });

    it('login view is not gated and keeps the Google button', () => {
        renderModal();
        expect(screen.queryByLabelText('What year were you born?')).not.toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Google' })).toBeInTheDocument();
    });

    it('signup view shows only the age gate: no form, no Google signup, no age checkbox', () => {
        renderModal();
        switchToSignupView();

        expect(screen.getByLabelText('What year were you born?')).toBeInTheDocument();
        expect(screen.queryByLabelText('Full Name')).not.toBeInTheDocument();
        expect(screen.queryByLabelText('Email')).not.toBeInTheDocument();
        expect(screen.queryByRole('button', { name: /create account/i })).not.toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'Google' })).not.toBeInTheDocument();
        expect(screen.queryByText(/18 years of age/i)).not.toBeInTheDocument();
    });

    it('adult birth year reveals the signup form and Google button without an age checkbox', () => {
        openModalInSignupView();

        expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Google' })).toBeInTheDocument();
        expect(screen.queryByText(/18 years of age/i)).not.toBeInTheDocument();
        expect(document.getElementById('consent-age')).toBeNull();
    });

    it('under-18 birth year shows the exact notice, locks the device, and blocks signup', () => {
        renderModal();
        switchToSignupView();
        passAgeGate(new Date().getFullYear() - 15);

        expect(screen.getByText(UNDER_18_TEXT)).toBeInTheDocument();
        expect(localStorage.getItem('psychage_age_gate_locked_until')).not.toBeNull();
        expect(screen.queryByLabelText('Email')).not.toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'Google' })).not.toBeInTheDocument();
        expect(signupMock).not.toHaveBeenCalled();
    });

    it('while locked, reopening signup shows the notice instead of the gate', () => {
        localStorage.setItem('psychage_age_gate_locked_until', String(Date.now() + 60_000));
        renderModal();
        switchToSignupView();

        expect(screen.getByText(UNDER_18_TEXT)).toBeInTheDocument();
        expect(screen.queryByLabelText('What year were you born?')).not.toBeInTheDocument();
        expect(screen.queryByLabelText('Email')).not.toBeInTheDocument();
    });

    it('switching away from signup and back requires the gate again', () => {
        openModalInSignupView();
        fireEvent.click(screen.getByRole('button', { name: 'Log in' }));
        switchToSignupView();
        expect(screen.getByLabelText('What year were you born?')).toBeInTheDocument();
    });
});
