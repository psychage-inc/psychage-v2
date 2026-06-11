import { describe, it, expect, vi, beforeEach } from 'vitest';
import { activityService } from '../activityService';

// activityService talks to Supabase directly (supabase.from('user_activity')...),
// so we mock the supabase client with a chainable query builder. The terminal
// `await query` resolves whatever mockQueryResult() returns.
const mockQueryResult = vi.fn();

const buildChain = () => {
    const chain: any = {};
    const self = () => chain;
    chain.select = vi.fn(self);
    chain.insert = vi.fn(self);
    chain.eq = vi.fn(self);
    chain.order = vi.fn(self);
    chain.limit = vi.fn(self);
    chain.then = (resolve: any, reject: any) => mockQueryResult().then(resolve, reject);
    return chain;
};

const chain = buildChain();
const fromMock = vi.fn(() => chain);

vi.mock('@/lib/supabaseClient', () => ({
    supabase: {
        from: (...args: unknown[]) => fromMock(...args),
    },
}));

function resetChain() {
    const self = () => chain;
    chain.select = vi.fn(self);
    chain.insert = vi.fn(self);
    chain.eq = vi.fn(self);
    chain.order = vi.fn(self);
    chain.limit = vi.fn(self);
    chain.then = (resolve: any, reject: any) => mockQueryResult().then(resolve, reject);
}

describe('activityService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        resetChain();
        vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    describe('getRecentActivity', () => {
        it('should return activities on success', async () => {
            const activities = [{ id: '1', action_type: 'login' }];
            mockQueryResult.mockResolvedValue({ data: activities, error: null });

            const result = await activityService.getRecentActivity('user1', 5);
            expect(result).toEqual(activities);
            expect(fromMock).toHaveBeenCalledWith('user_activity');
            expect(chain.limit).toHaveBeenCalledWith(5);
        });

        it('should use default limit of 10', async () => {
            mockQueryResult.mockResolvedValue({ data: [], error: null });

            await activityService.getRecentActivity();
            expect(chain.limit).toHaveBeenCalledWith(10);
        });

        it('should return empty array on unsuccessful response', async () => {
            mockQueryResult.mockResolvedValue({ data: null, error: { message: 'err' } });

            const result = await activityService.getRecentActivity();
            expect(result).toEqual([]);
        });

        it('should return empty array on error', async () => {
            mockQueryResult.mockRejectedValue(new Error('network'));

            const result = await activityService.getRecentActivity();
            expect(result).toEqual([]);
        });
    });

    describe('logActivity', () => {
        it('should return true on successful log', async () => {
            mockQueryResult.mockResolvedValue({ error: null });

            const result = await activityService.logActivity('user1', 'login');
            expect(result).toBe(true);
        });

        it('should pass all parameters to the insert', async () => {
            mockQueryResult.mockResolvedValue({ error: null });

            await activityService.logActivity('user1', 'article_viewed', 'article', '42', { title: 'Test' });
            expect(chain.insert).toHaveBeenCalledWith({
                action_type: 'article_viewed',
                resource_type: 'article',
                resource_id: '42',
                metadata: { title: 'Test' },
            });
        });

        it('should return false on failure', async () => {
            mockQueryResult.mockResolvedValue({ error: { message: 'err' } });

            const result = await activityService.logActivity('user1', 'login');
            expect(result).toBe(false);
        });

        it('should return false on error', async () => {
            mockQueryResult.mockRejectedValue(new Error('fail'));

            const result = await activityService.logActivity('user1', 'login');
            expect(result).toBe(false);
        });
    });

    describe('getActivityByType', () => {
        it('should return activities filtered by type', async () => {
            const activities = [{ id: '1', action_type: 'mood_logged' }];
            mockQueryResult.mockResolvedValue({ data: activities, error: null });

            const result = await activityService.getActivityByType('user1', 'mood_logged', 5);
            expect(result).toEqual(activities);
            expect(chain.eq).toHaveBeenCalledWith('action_type', 'mood_logged');
        });

        it('should return empty array on error', async () => {
            mockQueryResult.mockRejectedValue(new Error('err'));

            const result = await activityService.getActivityByType('user1', 'login');
            expect(result).toEqual([]);
        });
    });

    describe('getActivityStats', () => {
        it('should return computed stats on success', async () => {
            const rows = [
                { action_type: 'assessment_completed', created_at: '2026-03-01T10:00:00Z' },
                { action_type: 'article_viewed', created_at: '2026-03-01T11:00:00Z' },
                { action_type: 'video_watched', created_at: '2026-03-02T09:00:00Z' },
                { action_type: 'mood_logged', created_at: '2026-03-02T12:00:00Z' },
                { action_type: 'sleep_logged', created_at: '2026-03-03T08:00:00Z' },
            ];
            mockQueryResult.mockResolvedValue({ data: rows, error: null });

            const result = await activityService.getActivityStats();
            expect(result).toEqual({
                totalAssessments: 1,
                articlesRead: 1,
                videosWatched: 1,
                moodLogs: 1,
                sleepLogs: 1,
                daysActive: 3,
            });
        });

        it('should return zeroed stats on failure', async () => {
            mockQueryResult.mockResolvedValue({ data: null, error: { message: 'err' } });

            const result = await activityService.getActivityStats();
            expect(result).toEqual({
                totalAssessments: 0,
                articlesRead: 0,
                videosWatched: 0,
                moodLogs: 0,
                sleepLogs: 0,
                daysActive: 0,
            });
        });

        it('should return zeroed stats on error', async () => {
            mockQueryResult.mockRejectedValue(new Error('fail'));

            const result = await activityService.getActivityStats();
            expect(result.totalAssessments).toBe(0);
            expect(result.daysActive).toBe(0);
        });
    });
});
