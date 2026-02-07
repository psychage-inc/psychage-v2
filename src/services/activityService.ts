import api from '../lib/api';
import { useMemo } from 'react';

export interface UserActivity {
    id: string;
    user_id: string;
    action_type: string;
    resource_type?: string;
    resource_id?: string;
    metadata: Record<string, unknown>;
    created_at: string;
}

export type ActionType =
    | 'assessment_completed'
    | 'article_viewed'
    | 'video_watched'
    | 'provider_viewed'
    | 'tool_used'
    | 'mood_logged'
    | 'sleep_logged'
    | 'profile_updated'
    | 'login'
    | 'signup';

export const activityService = {
    getRecentActivity: async (_userId?: string, limit: number = 10): Promise<UserActivity[]> => {
        try {
            const response = await api.activity.getRecent(limit);
            if (!response.success || !response.data) return [];
            return response.data as UserActivity[];
        } catch (error) {
            console.error('Failed to fetch user activity:', error);
            return [];
        }
    },

    logActivity: async (
        _userId: string,
        actionType: ActionType,
        resourceType?: string,
        resourceId?: string,
        metadata?: Record<string, unknown>
    ): Promise<boolean> => {
        try {
            const response = await api.activity.log(actionType, resourceType, resourceId, metadata);
            return response.success;
        } catch (error) {
            console.error('Failed to log activity:', error);
            return false;
        }
    },

    getActivityByType: async (_userId: string, actionType: ActionType, limit: number = 10): Promise<UserActivity[]> => {
        try {
            const response = await api.activity.getByType(actionType, limit);
            if (!response.success || !response.data) return [];
            return response.data as UserActivity[];
        } catch (error) {
            console.error('Failed to fetch activity by type:', error);
            return [];
        }
    },

    getActivityStats: async (_userId?: string): Promise<{
        totalAssessments: number;
        articlesRead: number;
        videosWatched: number;
        moodLogs: number;
        sleepLogs: number;
        daysActive: number;
    }> => {
        try {
            const response = await api.activity.getStats();
            if (!response.success || !response.data) {
                return {
                    totalAssessments: 0,
                    articlesRead: 0,
                    videosWatched: 0,
                    moodLogs: 0,
                    sleepLogs: 0,
                    daysActive: 0
                };
            }
            return response.data as {
                totalAssessments: number;
                articlesRead: number;
                videosWatched: number;
                moodLogs: number;
                sleepLogs: number;
                daysActive: number;
            };
        } catch (error) {
            console.error('Failed to fetch activity stats:', error);
            return {
                totalAssessments: 0,
                articlesRead: 0,
                videosWatched: 0,
                moodLogs: 0,
                sleepLogs: 0,
                daysActive: 0
            };
        }
    }
};

export function useActivityService() {
    return useMemo(() => activityService, []);
}
