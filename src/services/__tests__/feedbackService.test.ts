import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockInsert = vi.fn();
const getUserMock = vi.fn();

vi.mock('@/lib/supabaseClient', () => ({
    supabase: {
        from: vi.fn(() => ({ insert: (...args: unknown[]) => mockInsert(...args) })),
        auth: { getUser: () => getUserMock() },
    },
}));

import { submitFeedback } from '../feedbackService';

describe('submitFeedback truthfulness (dead-queue swallow fix)', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        getUserMock.mockResolvedValue({ data: { user: { id: 'u1' } } });
    });

    it('resolves on a successful insert', async () => {
        mockInsert.mockResolvedValue({ error: null });
        await expect(
            submitFeedback({ content_type: 'article', content_id: 'a1', helpful: true }),
        ).resolves.toBeUndefined();
    });

    it('throws on a DB error instead of silently queueing and reporting success', async () => {
        mockInsert.mockResolvedValue({ error: { message: 'insert denied' } });
        await expect(
            submitFeedback({ content_type: 'article', content_id: 'a1', helpful: false }),
        ).rejects.toThrow('insert denied');
    });
});
