 
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { activityService } from '../activityService';

const mockApi = vi.hoisted(() => ({
    activity: {
        getRecent: vi.fn(),
        log: vi.fn(),
        getByType: vi.fn(),
        getStats: vi.fn(),
    },
}));

vi.mock('@/lib/api', () => ({ default: mockApi }));

describe('activityService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    describe('getRecentActivity', () => {
        it('should return activities on success', async () => {
            const activities = [{ id: '1', action_type: 'login' }];
            mockApi.activity.getRecent.mockResolvedValue({ success: true, data: activities });

            const result = await activityService.getRecentActivity('user1', 5);
            expect(result).toEqual(activities);
            expect(mockApi.activity.getRecent).toHaveBeenCalledWith(5);
        });

        it('should use default limit of 10', async () => {
            mockApi.activity.getRecent.mockResolvedValue({ success: true, data: [] });

            await activityService.getRecentActivity();
            expect(mockApi.activity.getRecent).toHaveBeenCalledWith(10);
        });

        it('should return empty array on unsuccessful response', async () => {
            mockApi.activity.getRecent.mockResolvedValue({ success: false, data: null });

            const result = await activityService.getRecentActivity();
            expect(result).toEqual([]);
        });

        it('should return empty array on error', async () => {
            mockApi.activity.getRecent.mockRejectedValue(new Error('network'));

            const result = await activityService.getRecentActivity();
            expect(result).toEqual([]);
        });
    });

    describe('logActivity', () => {
        it('should return true on successful log', async () => {
            mockApi.activity.log.mockResolvedValue({ success: true });

            const result = await activityService.logActivity('user1', 'login');
            expect(result).toBe(true);
        });

        it('should pass all parameters to API', async () => {
            mockApi.activity.log.mockResolvedValue({ success: true });

            await activityService.logActivity('user1', 'article_viewed', 'article', '42', { title: 'Test' });
            expect(mockApi.activity.log).toHaveBeenCalledWith('article_viewed', 'article', '42', { title: 'Test' });
        });

        it('should return false on failure', async () => {
            mockApi.activity.log.mockResolvedValue({ success: false });

            const result = await activityService.logActivity('user1', 'login');
            expect(result).toBe(false);
        });

        it('should return false on error', async () => {
            mockApi.activity.log.mockRejectedValue(new Error('fail'));

            const result = await activityService.logActivity('user1', 'login');
            expect(result).toBe(false);
        });
    });

    describe('getActivityByType', () => {
        it('should return activities filtered by type', async () => {
            const activities = [{ id: '1', action_type: 'mood_logged' }];
            mockApi.activity.getByType.mockResolvedValue({ success: true, data: activities });

            const result = await activityService.getActivityByType('user1', 'mood_logged', 5);
            expect(result).toEqual(activities);
        });

        it('should return empty array on failure', async () => {
            mockApi.activity.getByType.mockRejectedValue(new Error('err'));

            const result = await activityService.getActivityByType('user1', 'login');
            expect(result).toEqual([]);
        });
    });

    describe('getActivityStats', () => {
        it('should return stats on success', async () => {
            const stats = { totalAssessments: 5, articlesRead: 10, videosWatched: 3, moodLogs: 7, sleepLogs: 4, daysActive: 14 };
            mockApi.activity.getStats.mockResolvedValue({ success: true, data: stats });

            const result = await activityService.getActivityStats();
            expect(result).toEqual(stats);
        });

        it('should return zeroed stats on failure', async () => {
            mockApi.activity.getStats.mockResolvedValue({ success: false, data: null });

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
            mockApi.activity.getStats.mockRejectedValue(new Error('fail'));

            const result = await activityService.getActivityStats();
            expect(result.totalAssessments).toBe(0);
            expect(result.daysActive).toBe(0);
        });
    });
});
