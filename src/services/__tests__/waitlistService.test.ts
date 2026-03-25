 
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { waitlistService } from '../waitlistService';

const mockInsert = vi.fn();
const mockSingle = vi.fn();
const mockQueryResult = vi.fn();

// Build a chain mock where every method returns the chain itself
// and the final result is controlled by mockQueryResult or mockSingle
const buildChain = () => {
    const chain: any = {};
    const self = () => chain;
    chain.select = vi.fn(self);
    chain.eq = vi.fn(self);
    chain.order = vi.fn(self);
    chain.single = mockSingle;
    chain.insert = mockInsert;
    // Make chain thenable so `await query` works
    chain.then = (resolve: any, reject: any) => mockQueryResult().then(resolve, reject);
    return chain;
};

const chain = buildChain();

vi.mock('@/lib/supabaseClient', () => ({
    supabase: {
        from: vi.fn(() => chain),
    },
}));

describe('waitlistService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
        vi.spyOn(console, 'error').mockImplementation(() => {});
        // Re-establish chain methods after clearAllMocks
        const self = () => chain;
        chain.select = vi.fn(self);
        chain.eq = vi.fn(self);
        chain.order = vi.fn(self);
        chain.single = mockSingle;
        chain.insert = mockInsert;
        chain.then = (resolve: any, reject: any) => mockQueryResult().then(resolve, reject);
    });

    describe('join', () => {
        it('should reject invalid email', async () => {
            const result = await waitlistService.join('not-an-email', 'spark');
            expect(result.success).toBe(false);
            expect(result.error).toContain('valid email');
        });

        it('should succeed on successful insert', async () => {
            mockInsert.mockResolvedValue({ error: null });

            const result = await waitlistService.join('test@example.com', 'spark');
            expect(result.success).toBe(true);
        });

        it('should succeed on duplicate constraint violation', async () => {
            mockInsert.mockResolvedValue({ error: { code: '23505' } });

            const result = await waitlistService.join('test@example.com', 'spark');
            expect(result.success).toBe(true);
        });

        it('should fallback to localStorage on other errors', async () => {
            mockInsert.mockResolvedValue({ error: { code: '500', message: 'db down' } });

            const result = await waitlistService.join('test@example.com', 'community');
            expect(result.success).toBe(true);

            const stored = JSON.parse(localStorage.getItem('psychage_waitlist') || '[]');
            expect(stored).toHaveLength(1);
            expect(stored[0].email).toBe('test@example.com');
            expect(stored[0].feature).toBe('community');
        });

        it('should not duplicate in localStorage fallback', async () => {
            localStorage.setItem('psychage_waitlist', JSON.stringify([
                { email: 'test@example.com', feature: 'spark' }
            ]));
            mockInsert.mockResolvedValue({ error: { code: '500', message: 'fail' } });

            await waitlistService.join('test@example.com', 'spark');

            const stored = JSON.parse(localStorage.getItem('psychage_waitlist') || '[]');
            expect(stored).toHaveLength(1);
        });

        it('should lowercase email before insert', async () => {
            mockInsert.mockResolvedValue({ error: null });

            await waitlistService.join('Test@Email.COM', 'spark');
            expect(mockInsert).toHaveBeenCalledWith(
                expect.objectContaining({ email: 'test@email.com' })
            );
        });
    });

    describe('isOnWaitlist', () => {
        it('should return true when entry exists', async () => {
            mockSingle.mockResolvedValue({ data: { id: '1' }, error: null });

            const result = await waitlistService.isOnWaitlist('test@example.com', 'spark');
            expect(result).toBe(true);
        });

        it('should return false when PGRST116 (not found)', async () => {
            mockSingle.mockResolvedValue({ data: null, error: { code: 'PGRST116' } });

            const result = await waitlistService.isOnWaitlist('test@example.com', 'spark');
            expect(result).toBe(false);
        });

        it('should check localStorage as fallback on error', async () => {
            mockSingle.mockResolvedValue({ data: null, error: { code: '500', message: 'err' } });
            localStorage.setItem('psychage_waitlist', JSON.stringify([
                { email: 'test@example.com', feature: 'spark' }
            ]));

            const result = await waitlistService.isOnWaitlist('test@example.com', 'spark');
            expect(result).toBe(true);
        });
    });

    describe('getAll', () => {
        it('should return entries', async () => {
            const entries = [{ id: '1', email: 'a@b.com', feature: 'spark' }];
            mockQueryResult.mockResolvedValue({ data: entries, error: null });

            const result = await waitlistService.getAll();
            expect(result).toEqual(entries);
        });

        it('should filter by feature when provided', async () => {
            mockQueryResult.mockResolvedValue({ data: [], error: null });

            await waitlistService.getAll('community');
            expect(chain.eq).toHaveBeenCalledWith('feature', 'community');
        });

        it('should return empty array on error', async () => {
            mockQueryResult.mockResolvedValue({ data: null, error: { message: 'err' } });

            const result = await waitlistService.getAll();
            expect(result).toEqual([]);
        });
    });
});
