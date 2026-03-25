 
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { sleepService } from '../sleepService';

const mockSingle = vi.fn();
const mockQueryResult = vi.fn();
const mockGetUser = vi.fn();

const buildChain = () => {
    const chain: any = {};
    const self = () => chain;
    chain.select = vi.fn(self);
    chain.insert = vi.fn(self);
    chain.update = vi.fn(self);
    chain.delete = vi.fn(self);
    chain.eq = vi.fn(self);
    chain.gte = vi.fn(self);
    chain.lte = vi.fn(self);
    chain.order = vi.fn(self);
    chain.limit = vi.fn(self);
    chain.single = mockSingle;
    chain.then = (resolve: any, reject: any) => mockQueryResult().then(resolve, reject);
    return chain;
};

const chain = buildChain();

vi.mock('@/lib/supabaseClient', () => ({
    supabase: {
        from: vi.fn(() => chain),
        auth: { getUser: () => mockGetUser() },
    },
}));

function resetChain() {
    const self = () => chain;
    chain.select = vi.fn(self);
    chain.insert = vi.fn(self);
    chain.update = vi.fn(self);
    chain.delete = vi.fn(self);
    chain.eq = vi.fn(self);
    chain.gte = vi.fn(self);
    chain.lte = vi.fn(self);
    chain.order = vi.fn(self);
    chain.limit = vi.fn(self);
    chain.single = mockSingle;
    chain.then = (resolve: any, reject: any) => mockQueryResult().then(resolve, reject);
}

describe('sleepService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        resetChain();
        vi.spyOn(console, 'error').mockImplementation(() => {});
        vi.spyOn(console, 'warn').mockImplementation(() => {});
    });

    describe('getEntries', () => {
        it('should return entries for a given userId', async () => {
            const entries = [{ id: '1', hours: 7, quality: 4 }];
            mockQueryResult.mockResolvedValue({ data: entries, error: null });

            const result = await sleepService.getEntries('u1', 10);
            expect(result).toEqual(entries);
        });

        it('should get current user when userId not provided', async () => {
            mockGetUser.mockResolvedValue({ data: { user: { id: 'auto' } } });
            mockQueryResult.mockResolvedValue({ data: [], error: null });

            const result = await sleepService.getEntries();
            expect(result).toEqual([]);
        });

        it('should return empty array when no authenticated user', async () => {
            mockGetUser.mockResolvedValue({ data: { user: null } });

            const result = await sleepService.getEntries();
            expect(result).toEqual([]);
        });

        it('should return empty array on error', async () => {
            mockQueryResult.mockResolvedValue({ data: null, error: { message: 'err' } });

            const result = await sleepService.getEntries('u1');
            expect(result).toEqual([]);
        });
    });

    describe('createEntry', () => {
        it('should create and return a sleep entry', async () => {
            const created = { id: '1', user_id: 'u1', hours: 8, quality: 4, date: '2026-03-06' };
            mockSingle.mockResolvedValue({ data: created, error: null });

            const result = await sleepService.createEntry('u1', 8, 4);
            expect(result).toEqual(created);
        });

        it('should reject hours below 0', async () => {
            const result = await sleepService.createEntry('u1', -1, 3);
            expect(result).toBeNull();
        });

        it('should reject hours above 24', async () => {
            const result = await sleepService.createEntry('u1', 25, 3);
            expect(result).toBeNull();
        });

        it('should reject quality below 1', async () => {
            const result = await sleepService.createEntry('u1', 8, 0);
            expect(result).toBeNull();
        });

        it('should reject quality above 5', async () => {
            const result = await sleepService.createEntry('u1', 8, 6);
            expect(result).toBeNull();
        });

        it('should pass optional parameters', async () => {
            mockSingle.mockResolvedValue({ data: { id: '1' }, error: null });

            await sleepService.createEntry('u1', 7, 3, {
                bed_time: '23:00',
                wake_time: '06:00',
                notes: 'slept well',
                date: '2026-03-05',
            });

            expect(chain.insert).toHaveBeenCalledWith(
                expect.objectContaining({
                    bed_time: '23:00',
                    wake_time: '06:00',
                    notes: 'slept well',
                })
            );
        });

        it('should return null on supabase error', async () => {
            mockSingle.mockResolvedValue({ data: null, error: { message: 'err' } });

            const result = await sleepService.createEntry('u1', 7, 3);
            expect(result).toBeNull();
        });
    });

    describe('updateEntry', () => {
        it('should update and return entry', async () => {
            const updated = { id: '1', hours: 9 };
            mockSingle.mockResolvedValue({ data: updated, error: null });

            const result = await sleepService.updateEntry('1', { hours: 9 });
            expect(result).toEqual(updated);
        });

        it('should reject invalid hours in update', async () => {
            const result = await sleepService.updateEntry('1', { hours: 25 });
            expect(result).toBeNull();
        });

        it('should reject invalid quality in update', async () => {
            const result = await sleepService.updateEntry('1', { quality: 0 });
            expect(result).toBeNull();
        });
    });

    describe('deleteEntry', () => {
        it('should return true on success', async () => {
            mockQueryResult.mockResolvedValue({ error: null });

            const result = await sleepService.deleteEntry('1');
            expect(result).toBe(true);
        });

        it('should return false on error', async () => {
            mockQueryResult.mockResolvedValue({ error: { message: 'err' } });

            const result = await sleepService.deleteEntry('1');
            expect(result).toBe(false);
        });
    });

    describe('getAverages', () => {
        it('should return zeroed averages when no user', async () => {
            mockGetUser.mockResolvedValue({ data: { user: null } });

            const result = await sleepService.getAverages();
            expect(result).toEqual({ avgHours: 0, avgQuality: 0 });
        });

        it('should calculate averages correctly', async () => {
            const entries = [
                { hours: 7, quality: 4 },
                { hours: 9, quality: 2 },
            ];
            mockQueryResult.mockResolvedValue({ data: entries, error: null });

            const result = await sleepService.getAverages('u1', 7);
            expect(result.avgHours).toBe(8);
            expect(result.avgQuality).toBe(3);
        });

        it('should return zeroed averages on error', async () => {
            mockQueryResult.mockResolvedValue({ data: null, error: { message: 'err' } });

            const result = await sleepService.getAverages('u1');
            expect(result).toEqual({ avgHours: 0, avgQuality: 0 });
        });
    });

    describe('getStats', () => {
        it('should return default stats when no user', async () => {
            mockGetUser.mockResolvedValue({ data: { user: null } });

            const result = await sleepService.getStats();
            expect(result.trend).toBe('stable');
            expect(result.totalEntries).toBe(0);
        });

        it('should generate recommendation for low hours', async () => {
            const entries = [
                { hours: 5, quality: 4, date: '2026-03-06' },
                { hours: 6, quality: 3, date: '2026-03-05' },
            ];
            mockQueryResult.mockResolvedValue({ data: entries, error: null });

            const result = await sleepService.getStats('u1');
            expect(result.recommendation).toContain('7-9 hours');
        });

        it('should generate recommendation for high hours', async () => {
            const entries = [
                { hours: 10, quality: 4, date: '2026-03-06' },
                { hours: 11, quality: 3, date: '2026-03-05' },
            ];
            mockQueryResult.mockResolvedValue({ data: entries, error: null });

            const result = await sleepService.getStats('u1');
            expect(result.recommendation).toContain('Excessive sleep');
        });

        it('should generate recommendation for low quality', async () => {
            const entries = [
                { hours: 8, quality: 1, date: '2026-03-06' },
                { hours: 8, quality: 2, date: '2026-03-05' },
            ];
            mockQueryResult.mockResolvedValue({ data: entries, error: null });

            const result = await sleepService.getStats('u1');
            expect(result.recommendation).toContain('quality');
        });

        it('should detect upward trend', async () => {
            const entries = [
                { hours: 9, quality: 4, date: '2026-03-06' },
                { hours: 9, quality: 4, date: '2026-03-05' },
                { hours: 9, quality: 4, date: '2026-03-04' },
                { hours: 6, quality: 3, date: '2026-03-03' },
                { hours: 6, quality: 3, date: '2026-03-02' },
                { hours: 6, quality: 3, date: '2026-03-01' },
            ];
            mockQueryResult.mockResolvedValue({ data: entries, error: null });

            const result = await sleepService.getStats('u1');
            expect(result.trend).toBe('up');
        });
    });

    describe('getEntriesByDateRange', () => {
        it('should return entries within date range', async () => {
            const entries = [{ id: '1', hours: 7 }];
            mockQueryResult.mockResolvedValue({ data: entries, error: null });

            const result = await sleepService.getEntriesByDateRange('u1', '2026-03-01', '2026-03-06');
            expect(result).toEqual(entries);
        });

        it('should return empty array on error', async () => {
            mockQueryResult.mockResolvedValue({ data: null, error: { message: 'err' } });

            const result = await sleepService.getEntriesByDateRange('u1', '2026-03-01', '2026-03-06');
            expect(result).toEqual([]);
        });
    });
});
