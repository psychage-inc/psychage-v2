import { describe, it, expect, beforeEach, vi } from 'vitest';

/**
 * Regression coverage for AUTH-001 (privilege escalation via user_metadata.role).
 *
 * `updateProfile` must never propagate a `role` value into either
 * `auth.updateUser({ data })` or the `user_profiles` upsert. Roles are
 * server-controlled — they live in `app_metadata` (managed by admin RPCs),
 * not in user-writable surfaces.
 */

const updateUserMock = vi.fn();
const upsertMock = vi.fn();
const getUserMock = vi.fn();

vi.mock('../../lib/supabaseClient', () => ({
    supabase: {
        auth: {
            getUser: () => getUserMock(),
            updateUser: (...args: unknown[]) => updateUserMock(...args),
        },
        from: () => ({
            upsert: (...args: unknown[]) => upsertMock(...args),
            select: () => ({ eq: () => ({ maybeSingle: () => Promise.resolve({ data: null, error: null }) }) }),
        }),
    },
}));

import { userProfileService } from '../userProfileService';

describe('userProfileService.updateProfile — AUTH-001', () => {
    beforeEach(() => {
        updateUserMock.mockReset();
        upsertMock.mockReset();
        getUserMock.mockReset();

        getUserMock.mockResolvedValue({
            data: { user: { id: 'user-123', email: 'patient@example.com', user_metadata: {}, app_metadata: {} } },
            error: null,
        });
        updateUserMock.mockResolvedValue({ error: null });
        upsertMock.mockResolvedValue({ error: null });
    });

    it('does not forward a role field to auth.updateUser metadata', async () => {
        // Caller attempts to smuggle role through — TypeScript would normally
        // catch this; we cast to bypass and prove the runtime guard.
        await userProfileService.updateProfile({
            display_name: 'New Name',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ...({ role: 'admin' } as any),
        });

        expect(updateUserMock).toHaveBeenCalledTimes(1);
        const passedData = updateUserMock.mock.calls[0][0]?.data ?? {};
        expect(passedData).toHaveProperty('display_name', 'New Name');
        expect(passedData).not.toHaveProperty('role');
    });

    it('does not forward a role field to the user_profiles upsert', async () => {
        await userProfileService.updateProfile({
            display_name: 'New Name',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ...({ role: 'admin' } as any),
        });

        expect(upsertMock).toHaveBeenCalledTimes(1);
        const upserted = upsertMock.mock.calls[0][0] ?? {};
        expect(upserted).toHaveProperty('display_name', 'New Name');
        expect(upserted).not.toHaveProperty('role');
    });
});
