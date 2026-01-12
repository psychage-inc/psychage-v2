import { supabase } from '../lib/supabaseClient';
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
    getRecentActivity: async (userId: string, limit: number = 10): Promise<UserActivity[]> => {
        try {
            const { data, error } = await supabase
                .from('user_activity')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false })
                .limit(limit);

            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Failed to fetch user activity:', error);
            return [];
        }
    },

    logActivity: async (
        userId: string,
        actionType: ActionType,
        resourceType?: string,
        resourceId?: string,
        metadata?: Record<string, unknown>
    ): Promise<boolean> => {
        try {
            const { error } = await supabase
                .from('user_activity')
                .insert({
                    user_id: userId,
                    action_type: actionType,
                    resource_type: resourceType,
                    resource_id: resourceId,
                    metadata: metadata || {}
                });

            if (error) throw error;
            return true;
        } catch (error) {
            console.error('Failed to log activity:', error);
            return false;
        }
    },

    getActivityByType: async (userId: string, actionType: ActionType, limit: number = 10): Promise<UserActivity[]> => {
        try {
            const { data, error } = await supabase
                .from('user_activity')
                .select('*')
                .eq('user_id', userId)
                .eq('action_type', actionType)
                .order('created_at', { ascending: false })
                .limit(limit);

            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Failed to fetch activity by type:', error);
            return [];
        }
    },

    getActivityStats: async (userId: string): Promise<{
        totalAssessments: number;
        articlesRead: number;
        videosWatched: number;
        moodLogs: number;
        sleepLogs: number;
        daysActive: number;
    }> => {
        try {
            const { data, error } = await supabase
                .from('user_activity')
                .select('action_type, created_at')
                .eq('user_id', userId);

            if (error) throw error;

            if (!data || data.length === 0) {
                return {
                    totalAssessments: 0,
                    articlesRead: 0,
                    videosWatched: 0,
                    moodLogs: 0,
                    sleepLogs: 0,
                    daysActive: 0
                };
            }

            const actionCounts = data.reduce((acc: Record<string, number>, item) => {
                acc[item.action_type] = (acc[item.action_type] || 0) + 1;
                return acc;
            }, {});

            // Calculate unique active days
            const uniqueDays = new Set(data.map(d => new Date(d.created_at).toDateString()));

            return {
                totalAssessments: actionCounts['assessment_completed'] || 0,
                articlesRead: actionCounts['article_viewed'] || 0,
                videosWatched: actionCounts['video_watched'] || 0,
                moodLogs: actionCounts['mood_logged'] || 0,
                sleepLogs: actionCounts['sleep_logged'] || 0,
                daysActive: uniqueDays.size
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
