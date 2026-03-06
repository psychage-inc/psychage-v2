import { describe, it, expect, vi, beforeEach } from 'vitest';
import { moodService } from '../moodService';

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

describe('moodService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        resetChain();
        vi.spyOn(console, 'error').mockImplementation(() => {});
        vi.spyOn(console, 'warn').mockImplementation(() => {});
    });

    describe('getEntries', () => {
        it('should return mapped entries for a given userId', async () => {
            const dbEntries = [
                { id: '1', user_id: 'u1', mood_rating: 4, notes: 'good', tags: ['happy'], created_at: '2026-01-01' },
            ];
            mockQueryResult.mockResolvedValue({ data: dbEntries, error: null });

            const result = await moodService.getEntries('u1', 10);
            expect(result).toHaveLength(1);
            expect(result[0].value).toBe(4);
            expect(result[0].tags).toEqual(['happy']);
        });

        it('should get current user when userId not provided', async () => {
            mockGetUser.mockResolvedValue({ data: { user: { id: 'auto-user' } } });
            mockQueryResult.mockResolvedValue({ data: [], error: null });

            const result = await moodService.getEntries();
            expect(result).toEqual([]);
        });

        it('should return empty array when no authenticated user', async () => {
            mockGetUser.mockResolvedValue({ data: { user: null } });

            const result = await moodService.getEntries();
            expect(result).toEqual([]);
        });

        it('should return empty array on error', async () => {
            mockQueryResult.mockResolvedValue({ data: null, error: { message: 'err' } });

            const result = await moodService.getEntries('u1');
            expect(result).toEqual([]);
        });
    });

    describe('createEntry', () => {
        it('should create and return a mood entry', async () => {
            const created = { id: '1', user_id: 'u1', mood_rating: 3, notes: null, tags: [], created_at: '2026-01-01' };
            mockSingle.mockResolvedValue({ data: created, error: null });

            const result = await moodService.createEntry('u1', 3);
            expect(result).not.toBeNull();
            expect(result!.value).toBe(3);
        });

        it('should reject mood rating below 1', async () => {
            const result = await moodService.createEntry('u1', 0);
            expect(result).toBeNull();
        });

        it('should reject mood rating above 5', async () => {
            const result = await moodService.createEntry('u1', 6);
            expect(result).toBeNull();
        });

        it('should return null on supabase error', async () => {
            mockSingle.mockResolvedValue({ data: null, error: { message: 'err' } });

            const result = await moodService.createEntry('u1', 3);
            expect(result).toBeNull();
        });
    });

    describe('updateEntry', () => {
        it('should update and return entry', async () => {
            const updated = { id: '1', user_id: 'u1', mood_rating: 5, notes: 'great', tags: ['joy'], created_at: '2026-01-01' };
            mockSingle.mockResolvedValue({ data: updated, error: null });

            const result = await moodService.updateEntry('1', { value: 5, notes: 'great' });
            expect(result).not.toBeNull();
            expect(result!.value).toBe(5);
        });

        it('should reject invalid mood value in updates', async () => {
            const result = await moodService.updateEntry('1', { value: 0 });
            expect(result).toBeNull();
        });

        it('should reject mood value above 5 in updates', async () => {
            const result = await moodService.updateEntry('1', { value: 6 });
            expect(result).toBeNull();
        });

        it('should return null on error', async () => {
            mockSingle.mockResolvedValue({ data: null, error: { message: 'err' } });

            const result = await moodService.updateEntry('1', { notes: 'test' });
            expect(result).toBeNull();
        });
    });

    describe('deleteEntry', () => {
        it('should return true on successful delete', async () => {
            mockQueryResult.mockResolvedValue({ error: null });

            const result = await moodService.deleteEntry('1');
            expect(result).toBe(true);
        });

        it('should return false on error', async () => {
            mockQueryResult.mockResolvedValue({ error: { message: 'err' } });

            const result = await moodService.deleteEntry('1');
            expect(result).toBe(false);
        });
    });

    describe('getStats', () => {
        it('should return zeroed stats when no user', async () => {
            mockGetUser.mockResolvedValue({ data: { user: null } });

            const result = await moodService.getStats();
            expect(result).toEqual({ averageMood: 0, totalEntries: 0, trend: 'stable', streakDays: 0 });
        });

        it('should return zeroed stats on error', async () => {
            mockQueryResult.mockResolvedValue({ data: null, error: { message: 'err' } });

            const result = await moodService.getStats('u1');
            expect(result.averageMood).toBe(0);
        });

        it('should calculate average mood correctly', async () => {
            const entries = [
                { mood_rating: 4, value: 4, created_at: '2026-03-06T10:00:00Z' },
                { mood_rating: 2, value: 2, created_at: '2026-03-05T10:00:00Z' },
            ];
            mockQueryResult.mockResolvedValue({ data: entries, error: null });

            const result = await moodService.getStats('u1');
            expect(result.averageMood).toBe(3);
            expect(result.totalEntries).toBe(2);
        });

        it('should detect upward trend', async () => {
            const entries = [
                { mood_rating: 5, value: 5, created_at: '2026-03-06' },
                { mood_rating: 5, value: 5, created_at: '2026-03-05' },
                { mood_rating: 5, value: 5, created_at: '2026-03-04' },
                { mood_rating: 2, value: 2, created_at: '2026-03-03' },
                { mood_rating: 2, value: 2, created_at: '2026-03-02' },
                { mood_rating: 2, value: 2, created_at: '2026-03-01' },
            ];
            mockQueryResult.mockResolvedValue({ data: entries, error: null });

            const result = await moodService.getStats('u1');
            expect(result.trend).toBe('up');
        });

        it('should detect downward trend', async () => {
            const entries = [
                { mood_rating: 1, value: 1, created_at: '2026-03-06' },
                { mood_rating: 1, value: 1, created_at: '2026-03-05' },
                { mood_rating: 1, value: 1, created_at: '2026-03-04' },
                { mood_rating: 4, value: 4, created_at: '2026-03-03' },
                { mood_rating: 4, value: 4, created_at: '2026-03-02' },
                { mood_rating: 4, value: 4, created_at: '2026-03-01' },
            ];
            mockQueryResult.mockResolvedValue({ data: entries, error: null });

            const result = await moodService.getStats('u1');
            expect(result.trend).toBe('down');
        });
    });

    describe('getEntriesByDateRange', () => {
        it('should return mapped entries within date range', async () => {
            const entries = [
                { id: '1', user_id: 'u1', mood_rating: 3, notes: null, tags: [], created_at: '2026-03-03' },
            ];
            mockQueryResult.mockResolvedValue({ data: entries, error: null });

            const result = await moodService.getEntriesByDateRange('u1', '2026-03-01', '2026-03-06');
            expect(result).toHaveLength(1);
            expect(result[0].value).toBe(3);
        });

        it('should return empty array on error', async () => {
            mockQueryResult.mockResolvedValue({ data: null, error: { message: 'err' } });

            const result = await moodService.getEntriesByDateRange('u1', '2026-03-01', '2026-03-06');
            expect(result).toEqual([]);
        });
    });
});
