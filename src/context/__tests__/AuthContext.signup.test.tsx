import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, waitFor } from '@testing-library/react';

/**
 * Coverage for AUTH-010: signup must drop unknown extraMetadata keys
 * (especially `role`) instead of blind-spreading them into options.data.
 */

const getSessionMock = vi.fn();
const onAuthStateChangeMock = vi.fn();
const signUpMock = vi.fn();

vi.mock('../../lib/supabaseClient', () => ({
    supabase: {
        auth: {
            getSession: () => getSessionMock(),
            onAuthStateChange: (cb: unknown) => onAuthStateChangeMock(cb),
            signUp: (...args: unknown[]) => signUpMock(...args),
            signInWithPassword: vi.fn(),
            signInWithOAuth: vi.fn(),
            signOut: vi.fn(),
            getUser: vi.fn(),
            resetPasswordForEmail: vi.fn(),
        },
    },
}));

import { AuthProvider, useAuth } from '../AuthContext';

let signupFn: ReturnType<typeof useAuth>['signup'] | null = null;

function CaptureSignup() {
    const { signup } = useAuth();
    signupFn = signup;
    return null;
}

describe('AuthContext.signup — AUTH-010', () => {
    beforeEach(() => {
        getSessionMock.mockReset();
        onAuthStateChangeMock.mockReset();
        signUpMock.mockReset();
        signupFn = null;

        getSessionMock.mockResolvedValue({ data: { session: null } });
        onAuthStateChangeMock.mockReturnValue({ data: { subscription: { unsubscribe: vi.fn() } } });
        signUpMock.mockResolvedValue({ data: { user: { id: 'u-new' } }, error: null });
        vi.spyOn(console, 'warn').mockImplementation(() => {});
    });

    it('keeps allowed extraMetadata keys and drops unknown ones', async () => {
        render(
            <AuthProvider>
                <CaptureSignup />
            </AuthProvider>,
        );

        await waitFor(() => expect(signupFn).not.toBeNull());

        await signupFn!(
            'new@example.com',
            'pw',
            'New User',
            'patient',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            { age: 25, age_verified: true, role: 'admin', evil: 'payload' } as any,
        );

        expect(signUpMock).toHaveBeenCalledTimes(1);
        const passedData = signUpMock.mock.calls[0][0]?.options?.data ?? {};

        // Allowed keys preserved
        expect(passedData.age).toBe(25);
        expect(passedData.age_verified).toBe(true);
        // The top-level role argument ('patient') stays — that's intentional
        expect(passedData.role).toBe('patient');
        // Smuggled extras dropped
        expect(passedData.evil).toBeUndefined();
        // role from extraMetadata also dropped (allowlist excludes it)
        expect(passedData.role).not.toBe('admin');
    });

    it('warns once per dropped key', async () => {
        const warnSpy = vi.spyOn(console, 'warn');

        render(
            <AuthProvider>
                <CaptureSignup />
            </AuthProvider>,
        );

        await waitFor(() => expect(signupFn).not.toBeNull());

        await signupFn!(
            'x@example.com',
            'pw',
            'X',
            'patient',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            { weird_key: 1, role: 'admin' } as any,
        );

        const warnings = warnSpy.mock.calls.map((c) => String(c[0]));
        expect(warnings.some((w) => w.includes('weird_key'))).toBe(true);
        expect(warnings.some((w) => w.includes('role'))).toBe(true);
    });

    it('handles missing extraMetadata cleanly', async () => {
        render(
            <AuthProvider>
                <CaptureSignup />
            </AuthProvider>,
        );

        await waitFor(() => expect(signupFn).not.toBeNull());

        await signupFn!('plain@example.com', 'pw', 'Plain', 'provider');

        const passedData = signUpMock.mock.calls[0][0]?.options?.data ?? {};
        expect(passedData.role).toBe('provider');
        expect(passedData.display_name).toBe('Plain');
    });
});
