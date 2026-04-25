import { describe, it, expect, beforeEach, vi } from 'vitest';

/**
 * Coverage for changePassword:
 *  - AUTH-028 + hotfix B-5: invokes password-change-notification with empty
 *    body so the edge function derives identity from the JWT.
 *  - AUTH-005 (data-layer refactor): NEVER calls signInWithPassword. The
 *    current-password verification goes through the verify-current-password
 *    edge function so client-side side effects (rate limit, SIGNED_IN
 *    event, token rotation) are eliminated.
 *  - AUTH-015 (data-layer refactor): on successful update, signs out other
 *    devices via scope: 'others' to invalidate any stolen sessions while
 *    preserving the current authenticated tab.
 */

const updateUserMock = vi.fn();
const signInMock = vi.fn();
const getUserMock = vi.fn();
const signOutMock = vi.fn();
const invokeMock = vi.fn();

vi.mock('../../lib/supabaseClient', () => ({
    supabase: {
        auth: {
            getUser: () => getUserMock(),
            signInWithPassword: (...args: unknown[]) => signInMock(...args),
            updateUser: (...args: unknown[]) => updateUserMock(...args),
            signOut: (...args: unknown[]) => signOutMock(...args),
        },
        functions: {
            invoke: (...args: unknown[]) => invokeMock(...args),
        },
    },
}));

import { userProfileService } from '../userProfileService';

/** Default invoke routing: verify-current-password → ok, others → ok. */
function setupDefaultInvokeRouter() {
    invokeMock.mockImplementation((name: string) => {
        if (name === 'verify-current-password') {
            return Promise.resolve({ data: { verified: true }, error: null });
        }
        return Promise.resolve({ data: { ok: true }, error: null });
    });
}

describe('userProfileService.changePassword', () => {
    beforeEach(() => {
        updateUserMock.mockReset();
        signInMock.mockReset();
        getUserMock.mockReset();
        signOutMock.mockReset();
        invokeMock.mockReset();

        getUserMock.mockResolvedValue({
            data: { user: { id: 'user-123', email: 'me@example.com' } },
        });
        updateUserMock.mockResolvedValue({ error: null });
        signOutMock.mockResolvedValue({ error: null });
        setupDefaultInvokeRouter();
    });

    describe('AUTH-028 — notification dispatch', () => {
        it('invokes password-change-notification on success with empty body', async () => {
            const result = await userProfileService.changePassword('oldpw', 'newpw1234');

            expect(result.success).toBe(true);
            expect(invokeMock).toHaveBeenCalledWith('password-change-notification', {
                body: {},
            });
        });

        it('never passes user_id in the notification payload (B-5 spoof prevention)', async () => {
            await userProfileService.changePassword('oldpw', 'newpw1234');
            const notificationCall = invokeMock.mock.calls.find(
                ([name]) => name === 'password-change-notification',
            );
            expect(notificationCall).toBeDefined();
            const options = notificationCall![1] as { body: unknown };
            expect(options.body).not.toHaveProperty('user_id');
        });

        it('does not invoke notification when password update fails', async () => {
            updateUserMock.mockResolvedValueOnce({ error: { message: 'too weak' } });

            const result = await userProfileService.changePassword('oldpw', 'newpw1234');

            expect(result.success).toBe(false);
            const notificationCall = invokeMock.mock.calls.find(
                ([name]) => name === 'password-change-notification',
            );
            expect(notificationCall).toBeUndefined();
        });

        it('treats notification failures as non-fatal', async () => {
            invokeMock.mockImplementation((name: string) => {
                if (name === 'verify-current-password') {
                    return Promise.resolve({ data: { verified: true }, error: null });
                }
                return Promise.reject(new Error('network down'));
            });
            vi.spyOn(console, 'warn').mockImplementation(() => {});

            const result = await userProfileService.changePassword('oldpw', 'newpw1234');

            // Password change still succeeds even though dispatch failed
            expect(result.success).toBe(true);
        });
    });

    describe('AUTH-005 — verification via edge function (no client side effects)', () => {
        it('never calls signInWithPassword for verification', async () => {
            await userProfileService.changePassword('oldpw', 'newpw1234');
            expect(signInMock).not.toHaveBeenCalled();
        });

        it('invokes verify-current-password with the typed current password', async () => {
            await userProfileService.changePassword('typed-current', 'newpw1234');
            const verifyCall = invokeMock.mock.calls.find(
                ([name]) => name === 'verify-current-password',
            );
            expect(verifyCall).toBeDefined();
            expect(verifyCall![1]).toEqual({ body: { password: 'typed-current' } });
        });

        it('returns failure and never calls updateUser when verification reports verified:false', async () => {
            invokeMock.mockImplementation((name: string) => {
                if (name === 'verify-current-password') {
                    return Promise.resolve({ data: { verified: false }, error: null });
                }
                return Promise.resolve({ data: null, error: null });
            });

            const result = await userProfileService.changePassword('wrongpw', 'newpw1234');

            expect(result.success).toBe(false);
            expect(result.error).toMatch(/incorrect/i);
            expect(updateUserMock).not.toHaveBeenCalled();
        });

        it('returns failure when verify-current-password returns an error', async () => {
            invokeMock.mockImplementation((name: string) => {
                if (name === 'verify-current-password') {
                    return Promise.resolve({ data: null, error: { message: 'rate limited' } });
                }
                return Promise.resolve({ data: null, error: null });
            });

            const result = await userProfileService.changePassword('oldpw', 'newpw1234');

            expect(result.success).toBe(false);
            expect(updateUserMock).not.toHaveBeenCalled();
        });
    });

    describe('AUTH-015 — session regeneration after update', () => {
        it('signs out other devices with scope: "others" after a successful update', async () => {
            await userProfileService.changePassword('oldpw', 'newpw1234');

            expect(signOutMock).toHaveBeenCalledTimes(1);
            expect(signOutMock).toHaveBeenCalledWith({ scope: 'others' });
        });

        it('does not sign out anything when the update itself fails', async () => {
            updateUserMock.mockResolvedValueOnce({ error: { message: 'weak password' } });

            await userProfileService.changePassword('oldpw', 'newpw1234');

            expect(signOutMock).not.toHaveBeenCalled();
        });

        it('treats signOut(scope:others) failures as non-fatal — the password rotation still succeeds', async () => {
            signOutMock.mockRejectedValueOnce(new Error('network blip'));
            vi.spyOn(console, 'warn').mockImplementation(() => {});

            const result = await userProfileService.changePassword('oldpw', 'newpw1234');

            expect(result.success).toBe(true);
            expect(updateUserMock).toHaveBeenCalled();
        });
    });
});
