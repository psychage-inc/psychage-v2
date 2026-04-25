import { describe, it, expect, beforeEach, vi } from 'vitest';

/**
 * Coverage for AUTH-028 + hotfix B-5: changePassword must invoke the
 * password-change-notification edge function after a successful update.
 *
 * The dispatch is fire-and-forget: failures do not propagate to the
 * caller, but the invocation itself must happen so that — when SMTP /
 * Resend is configured — the user gets the notification.
 *
 * Hotfix B-5 note: the payload no longer includes user_id. The edge
 * function derives user_id and email from the caller's JWT, so any
 * client-supplied user_id would be ignored anyway. Passing {} makes
 * the intent explicit and prevents a future regression that re-adds
 * the spoofable field.
 */

const updateUserMock = vi.fn();
const signInMock = vi.fn();
const getUserMock = vi.fn();
const invokeMock = vi.fn();

vi.mock('../../lib/supabaseClient', () => ({
    supabase: {
        auth: {
            getUser: () => getUserMock(),
            signInWithPassword: (...args: unknown[]) => signInMock(...args),
            updateUser: (...args: unknown[]) => updateUserMock(...args),
        },
        functions: {
            invoke: (...args: unknown[]) => invokeMock(...args),
        },
    },
}));

import { userProfileService } from '../userProfileService';

describe('userProfileService.changePassword — AUTH-028', () => {
    beforeEach(() => {
        updateUserMock.mockReset();
        signInMock.mockReset();
        getUserMock.mockReset();
        invokeMock.mockReset();

        getUserMock.mockResolvedValue({
            data: { user: { id: 'user-123', email: 'me@example.com' } },
        });
        signInMock.mockResolvedValue({ error: null });
        updateUserMock.mockResolvedValue({ error: null });
        invokeMock.mockResolvedValue({ data: { ok: true }, error: null });
    });

    it('invokes password-change-notification on success with an empty body (B-5)', async () => {
        const result = await userProfileService.changePassword('oldpw', 'newpw1234');

        expect(result.success).toBe(true);
        expect(invokeMock).toHaveBeenCalledWith('password-change-notification', {
            body: {},
        });
    });

    it('never passes user_id in the payload (B-5 spoof prevention)', async () => {
        await userProfileService.changePassword('oldpw', 'newpw1234');
        expect(invokeMock).toHaveBeenCalledTimes(1);
        const [, options] = invokeMock.mock.calls[0] as [string, { body: unknown }];
        expect(options.body).not.toHaveProperty('user_id');
    });

    it('does not invoke when password update fails', async () => {
        updateUserMock.mockResolvedValueOnce({ error: { message: 'too weak' } });

        const result = await userProfileService.changePassword('oldpw', 'newpw1234');

        expect(result.success).toBe(false);
        expect(invokeMock).not.toHaveBeenCalled();
    });

    it('treats notification failures as non-fatal', async () => {
        invokeMock.mockRejectedValueOnce(new Error('network down'));
        vi.spyOn(console, 'warn').mockImplementation(() => {});

        const result = await userProfileService.changePassword('oldpw', 'newpw1234');

        // Password change still succeeds even though dispatch failed
        expect(result.success).toBe(true);
        expect(invokeMock).toHaveBeenCalled();
    });
});
