import { describe, it, expect, vi, beforeEach } from 'vitest';
import { newsletterService } from '../newsletterService';

const mockSingle = vi.fn();
const mockInsert = vi.fn();
const mockQueryResult = vi.fn();

const buildChain = () => {
    const chain: any = {};
    const self = () => chain;
    chain.select = vi.fn(self);
    chain.eq = vi.fn(self);
    chain.insert = mockInsert;
    chain.update = vi.fn(self);
    chain.single = mockSingle;
    chain.then = (resolve: any, reject: any) => mockQueryResult().then(resolve, reject);
    return chain;
};

const chain = buildChain();

vi.mock('@/lib/supabaseClient', () => ({
    supabase: {
        from: vi.fn(() => chain),
    },
}));

function resetChain() {
    const self = () => chain;
    chain.select = vi.fn(self);
    chain.eq = vi.fn(self);
    chain.insert = mockInsert;
    chain.update = vi.fn(self);
    chain.single = mockSingle;
    chain.then = (resolve: any, reject: any) => mockQueryResult().then(resolve, reject);
}

describe('newsletterService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        resetChain();
        vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    describe('subscribe', () => {
        it('should return already subscribed if email exists', async () => {
            mockSingle.mockResolvedValue({ data: { id: '1' }, error: null });

            const result = await newsletterService.subscribe('Test@Email.com');
            expect(result.success).toBe(true);
            expect(result.message).toContain('already subscribed');
        });

        it('should insert new subscriber when email is new', async () => {
            mockSingle.mockResolvedValue({ data: null, error: null });
            mockInsert.mockResolvedValue({ error: null });

            const result = await newsletterService.subscribe('new@email.com');
            expect(result.success).toBe(true);
            expect(result.message).toContain('Successfully subscribed');
        });

        it('should lowercase email', async () => {
            mockSingle.mockResolvedValue({ data: { id: '1' }, error: null });
            await newsletterService.subscribe('UPPER@EMAIL.COM');
            expect(chain.eq).toHaveBeenCalledWith('email', 'upper@email.com');
        });

        it('should throw on insert error', async () => {
            mockSingle.mockResolvedValue({ data: null, error: null });
            mockInsert.mockResolvedValue({ error: { message: 'db error' } });

            await expect(newsletterService.subscribe('test@email.com')).rejects.toEqual({ message: 'db error' });
        });
    });

    describe('unsubscribe', () => {
        it('should update subscriber status to unsubscribed', async () => {
            // The chain ends with .eq() which is thenable via mockQueryResult
            mockQueryResult.mockResolvedValue({ error: null });

            const result = await newsletterService.unsubscribe('test@email.com');
            expect(result.success).toBe(true);
            expect(result.message).toContain('unsubscribed');
        });

        it('should throw on update error', async () => {
            mockQueryResult.mockResolvedValue({ error: { message: 'update failed' } });

            await expect(newsletterService.unsubscribe('test@email.com')).rejects.toEqual({ message: 'update failed' });
        });
    });

    describe('checkSubscription', () => {
        it('should return true for active subscriber', async () => {
            mockSingle.mockResolvedValue({ data: { status: 'active' }, error: null });

            const result = await newsletterService.checkSubscription('test@email.com');
            expect(result).toBe(true);
        });

        it('should return false for unsubscribed user', async () => {
            mockSingle.mockResolvedValue({ data: { status: 'unsubscribed' }, error: null });

            const result = await newsletterService.checkSubscription('test@email.com');
            expect(result).toBe(false);
        });

        it('should return false on error', async () => {
            mockSingle.mockResolvedValue({ data: null, error: { message: 'err' } });

            const result = await newsletterService.checkSubscription('test@email.com');
            expect(result).toBe(false);
        });

        it('should return false on exception', async () => {
            mockSingle.mockRejectedValue(new Error('network'));

            const result = await newsletterService.checkSubscription('test@email.com');
            expect(result).toBe(false);
        });
    });
});
