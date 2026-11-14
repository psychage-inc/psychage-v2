import { describe, it, expect, beforeAll, beforeEach, vi } from 'vitest';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

/**
 * Compliance item 5: the full-page signup sits behind the birth-year age
 * gate, the old age checkbox and optional `age` field are gone, and signup
 * metadata carries age_verified: true with no `age` key.
 */

const signupMock = vi.fn();

vi.mock('../../../context/AuthContext', () => ({
    useAuth: () => ({ signup: signupMock, isLoading: false }),
}));

vi.mock('../../../lib/auth/useTurnstile', () => ({
    useTurnstile: () => ({ widget: null, token: 'tok-page', reset: vi.fn() }),
}));

import SignUpPage from '../SignUpPage';

// Node >= 22 ships a global `localStorage` that shadows jsdom's and is
// undefined without --localstorage-file. Point the global at jsdom's Storage.
beforeAll(() => {
    vi.stubGlobal('localStorage', (globalThis as unknown as { jsdom: { window: Window } }).jsdom.window.localStorage);
});

const UNDER_18_TEXT =
    'Psychage accounts are for adults 18 and over. You can still read our free articles and watch our videos. If you need help now, call or text 988.';
const LOCK_KEY = 'psychage_age_gate_locked_until';

function renderPage() {
    return render(
        <HelmetProvider>
            <MemoryRouter initialEntries={['/signup']}>
                <SignUpPage />
            </MemoryRouter>
        </HelmetProvider>,
    );
}

function passAgeGate(birthYear: number) {
    fireEvent.change(screen.getByLabelText('What year were you born?'), { target: { value: String(birthYear) } });
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));
}

describe('SignUpPage — age gate (compliance item 5)', () => {
    beforeEach(() => {
        signupMock.mockReset();
        signupMock.mockResolvedValue({ success: true, status: 'confirm_email' });
        localStorage.clear();
    });

    it('shows the age gate before the signup form, with no default year and Continue disabled', () => {
        renderPage();
        const select = screen.getByLabelText('What year were you born?') as HTMLSelectElement;
        expect(select.value).toBe('');
        expect(screen.getByRole('button', { name: 'Continue' })).toBeDisabled();

        expect(document.getElementById('email')).toBeNull();
        expect(screen.queryByRole('button', { name: /create account/i })).not.toBeInTheDocument();
        expect(screen.queryByRole('button', { name: /i am an individual/i })).not.toBeInTheDocument();
    });

    it('renders no hint of the required age before a year is chosen', () => {
        const { container } = renderPage();
        const clone = container.cloneNode(true) as HTMLElement;
        clone.querySelectorAll('option:not([value=""])').forEach((o) => o.remove());
        expect(clone.textContent).not.toMatch(/18|must be|years of age|adults/i);
    });

    it('under 18: shows the exact notice, sets the lock, and never shows the form', () => {
        renderPage();
        passAgeGate(new Date().getFullYear() - 16);

        expect(screen.getByText(UNDER_18_TEXT)).toBeInTheDocument();
        expect(localStorage.getItem(LOCK_KEY)).not.toBeNull();
        expect(document.getElementById('email')).toBeNull();
        expect(screen.queryByLabelText('What year were you born?')).not.toBeInTheDocument();
    });

    it('while locked, a fresh load shows the notice instead of the gate or form', () => {
        localStorage.setItem(LOCK_KEY, String(Date.now() + 60_000));
        renderPage();

        expect(screen.getByText(UNDER_18_TEXT)).toBeInTheDocument();
        expect(screen.queryByLabelText('What year were you born?')).not.toBeInTheDocument();
        expect(document.getElementById('email')).toBeNull();
    });

    it('adult year reveals the form without the age checkbox or age field', () => {
        renderPage();
        passAgeGate(1985);

        expect(document.getElementById('email')).not.toBeNull();
        expect(screen.getByRole('button', { name: /^create account$/i })).toBeInTheDocument();
        expect(document.getElementById('consent-age')).toBeNull();
        expect(document.getElementById('age')).toBeNull();
        expect(screen.queryByText(/18 years of age/i)).not.toBeInTheDocument();
        // Remaining required consents are unchanged.
        expect(document.getElementById('consent-terms')).not.toBeNull();
        expect(document.getElementById('consent-data')).not.toBeNull();
    });

    it('signup sends age_verified: true and no age', async () => {
        renderPage();
        passAgeGate(1985);

        fireEvent.change(document.getElementById('displayName')!, { target: { value: 'Avery' } });
        fireEvent.change(document.getElementById('email')!, { target: { value: 'a@b.com' } });
        fireEvent.change(document.getElementById('password')!, { target: { value: 'newpw1234' } });
        fireEvent.change(document.getElementById('confirmPassword')!, { target: { value: 'newpw1234' } });
        fireEvent.click(document.getElementById('consent-terms')!);
        fireEvent.click(document.getElementById('consent-data')!);

        await act(async () => {
            fireEvent.submit(document.getElementById('email')!.closest('form')!);
        });

        await waitFor(() => expect(signupMock).toHaveBeenCalledTimes(1));
        const [email, password, name, role, metadata, token] = signupMock.mock.calls[0];
        expect(email).toBe('a@b.com');
        expect(password).toBe('newpw1234');
        expect(name).toBe('Avery');
        expect(role).toBe('patient');
        expect(metadata).toMatchObject({ age_verified: true, data_processing_accepted: true, consent_version: 'v1.0' });
        expect(metadata).not.toHaveProperty('age');
        expect(token).toBe('tok-page');
    });
});
