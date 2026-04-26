import { describe, it, expect, vi, beforeEach } from 'vitest';
import { newsletterService } from '../newsletterService';

/**
 * Coverage updated for AUTH-032 — newsletterService.subscribe now keys
 * on user_id when authenticated, falls back to email-based dedup
 * otherwise. checkSubscription / unsubscribe still operate on email.
 */

// Chain mock — supports .from('newsletter_subscribers').select().eq().is().maybeSingle()
// and the awaitable insert/update terminal calls.
const mockMaybeSingle = vi.fn();
const mockSingle = vi.fn();
const mockInsert = vi.fn();
const mockUpdateAwait = vi.fn();
const getUserMock = vi.fn();

const buildChain = () => {
    const chain: any = {};
    const self = () => chain;
    chain.select = vi.fn(self);
    chain.eq = vi.fn(self);
    chain.is = vi.fn(self);
    chain.insert = (...args: unknown[]) => mockInsert(...args);
    // update returns a chain that can be awaited (.eq returns the awaitable)
    chain.update = vi.fn(() => ({
        eq: vi.fn(() => mockUpdateAwait()),
    }));
    chain.single = mockSingle;
    chain.maybeSingle = mockMaybeSingle;
    return chain;
};

const chain = buildChain();

vi.mock('@/lib/supabaseClient', () => ({
    supabase: {
        from: vi.fn(() => chain),
        auth: {
            getUser: () => getUserMock(),
        },
    },
}));

function resetChain() {
    const self = () => chain;
    chain.select = vi.fn(self);
    chain.eq = vi.fn(self);
    chain.is = vi.fn(self);
    chain.update = vi.fn(() => ({
        eq: vi.fn(() => mockUpdateAwait()),
    }));
}

describe('newsletterService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        resetChain();
        vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    describe('subscribe — anonymous path (no auth)', () => {
        beforeEach(() => {
            getUserMock.mockResolvedValue({ data: { user: null }, error: null });
        });

        it('returns already-subscribed when an anon row already exists for that email', async () => {
            mockMaybeSingle.mockResolvedValue({ data: { id: '1' }, error: null });

            const result = await newsletterService.subscribe('Test@Email.com');
            expect(result.success).toBe(true);
            expect(result.message).toContain('already subscribed');
            // Anonymous lookup MUST filter by user_id IS NULL
            expect(chain.is).toHaveBeenCalledWith('user_id', null);
        });

        it('inserts a new anon subscriber when no existing row', async () => {
            mockMaybeSingle.mockResolvedValue({ data: null, error: null });
            mockInsert.mockResolvedValue({ error: null });

            const result = await newsletterService.subscribe('new@email.com');
            expect(result.success).toBe(true);
            expect(result.message).toContain('Successfully subscribed');
            expect(mockInsert).toHaveBeenCalled();
            // Insert payload should NOT carry a user_id for anon path
            const insertedRow = mockInsert.mock.calls[0][0];
            expect(insertedRow.user_id).toBeUndefined();
        });

        it('lowercases the email before lookup and insert', async () => {
            mockMaybeSingle.mockResolvedValue({ data: null, error: null });
            mockInsert.mockResolvedValue({ error: null });

            await newsletterService.subscribe('UPPER@EMAIL.COM');
            expect(chain.eq).toHaveBeenCalledWith('email', 'upper@email.com');
        });

        it('returns failure on insert error (non-23505)', async () => {
            mockMaybeSingle.mockResolvedValue({ data: null, error: null });
            mockInsert.mockResolvedValue({ error: { code: '00000', message: 'db error' } });

            const result = await newsletterService.subscribe('test@email.com');
            expect(result.success).toBe(false);
            expect(result.message).toContain('Subscription failed');
        });

        it('treats 23505 unique-violation as idempotent success', async () => {
            mockMaybeSingle.mockResolvedValue({ data: null, error: null });
            mockInsert.mockResolvedValue({ error: { code: '23505', message: 'dup' } });

            const result = await newsletterService.subscribe('test@email.com');
            expect(result.success).toBe(true);
            expect(result.message).toContain('already subscribed');
        });
    });

    describe('subscribe — authenticated path (AUTH-032)', () => {
        beforeEach(() => {
            getUserMock.mockResolvedValue({
                data: { user: { id: 'user-uuid-aaa', email: 'real@example.com' } },
                error: null,
            });
        });

        it('keys lookup on user_id when authenticated', async () => {
            mockMaybeSingle.mockResolvedValue({
                data: { id: '1', status: 'active', email: 'any@email.com' },
                error: null,
            });

            const result = await newsletterService.subscribe('any@email.com');
            expect(result.success).toBe(true);
            expect(result.message).toContain('already subscribed');
            expect(chain.eq).toHaveBeenCalledWith('user_id', 'user-uuid-aaa');
        });

        it('inserts with user_id populated when no existing row', async () => {
            mockMaybeSingle.mockResolvedValue({ data: null, error: null });
            mockInsert.mockResolvedValue({ error: null });

            const result = await newsletterService.subscribe('relay-1@privaterelay.appleid.com');
            expect(result.success).toBe(true);
            const insertedRow = mockInsert.mock.calls[0][0];
            expect(insertedRow.user_id).toBe('user-uuid-aaa');
            expect(insertedRow.email).toBe('relay-1@privaterelay.appleid.com');
        });

        it('refreshes email on Apple Private Relay rotation when already-active user re-subscribes (V-2b)', async () => {
            // Existing active subscription with old relay address
            mockMaybeSingle.mockResolvedValue({
                data: {
                    id: 'sub-1',
                    status: 'active',
                    email: 'old-relay@privaterelay.appleid.com',
                },
                error: null,
            });

            const result = await newsletterService.subscribe('new-relay@privaterelay.appleid.com');
            expect(result.success).toBe(true);

            // The chain.update mock returns a chain with .eq() — confirm
            // update was called with the new email (it'll have been called
            // exactly once: the email-refresh UPDATE).
            const updateCalls = (chain.update as ReturnType<typeof vi.fn>).mock.calls;
            expect(updateCalls.length).toBe(1);
            expect(updateCalls[0][0]).toEqual({ email: 'new-relay@privaterelay.appleid.com' });
        });

        it('does NOT update when active user re-subscribes with the SAME email (no-op)', async () => {
            mockMaybeSingle.mockResolvedValue({
                data: {
                    id: 'sub-1',
                    status: 'active',
                    email: 'same@example.com',
                },
                error: null,
            });

            await newsletterService.subscribe('same@example.com');

            const updateCalls = (chain.update as ReturnType<typeof vi.fn>).mock.calls;
            expect(updateCalls.length).toBe(0);
        });
    });

    describe('unsubscribe', () => {
        it('returns success on update', async () => {
            mockUpdateAwait.mockResolvedValue({ error: null });

            const result = await newsletterService.unsubscribe('test@email.com');
            expect(result.success).toBe(true);
            expect(result.message).toContain('unsubscribed');
        });

        it('returns failure on update error', async () => {
            mockUpdateAwait.mockResolvedValue({ error: { message: 'update failed' } });

            const result = await newsletterService.unsubscribe('test@email.com');
            expect(result.success).toBe(false);
            expect(result.message).toContain('Unsubscribe failed');
        });
    });

    describe('checkSubscription', () => {
        it('returns true for active subscriber', async () => {
            mockSingle.mockResolvedValue({ data: { status: 'active' }, error: null });

            const result = await newsletterService.checkSubscription('test@email.com');
            expect(result).toBe(true);
        });

        it('returns false for unsubscribed user', async () => {
            mockSingle.mockResolvedValue({ data: { status: 'unsubscribed' }, error: null });

            const result = await newsletterService.checkSubscription('test@email.com');
            expect(result).toBe(false);
        });

        it('returns false on error', async () => {
            mockSingle.mockResolvedValue({ data: null, error: { message: 'err' } });

            const result = await newsletterService.checkSubscription('test@email.com');
            expect(result).toBe(false);
        });

        it('returns false on exception', async () => {
            mockSingle.mockRejectedValue(new Error('network'));

            const result = await newsletterService.checkSubscription('test@email.com');
            expect(result).toBe(false);
        });
    });
});
