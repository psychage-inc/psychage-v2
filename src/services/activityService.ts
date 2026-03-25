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
    getRecentActivity: async (_userId?: string, limit: number = 10): Promise<UserActivity[]> => {
        try {
            const { data, error } = await supabase
                .from('user_activity')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(limit);

            if (error || !data) return [];
            return data as UserActivity[];
        } catch {
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
            const { error } = await supabase
                .from('user_activity')
                .insert({
                    action_type: actionType,
                    resource_type: resourceType,
                    resource_id: resourceId,
                    metadata: metadata ?? {},
                });

            return !error;
        } catch {
            return false;
        }
    },

    getActivityByType: async (_userId: string, actionType: ActionType, limit: number = 10): Promise<UserActivity[]> => {
        try {
            const { data, error } = await supabase
                .from('user_activity')
                .select('*')
                .eq('action_type', actionType)
                .order('created_at', { ascending: false })
                .limit(limit);

            if (error || !data) return [];
            return data as UserActivity[];
        } catch {
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
            const { data, error } = await supabase
                .from('user_activity')
                .select('action_type, created_at');

            if (error || !data) {
                return { totalAssessments: 0, articlesRead: 0, videosWatched: 0, moodLogs: 0, sleepLogs: 0, daysActive: 0 };
            }

            const stats = {
                totalAssessments: data.filter(a => a.action_type === 'assessment_completed').length,
                articlesRead: data.filter(a => a.action_type === 'article_viewed').length,
                videosWatched: data.filter(a => a.action_type === 'video_watched').length,
                moodLogs: data.filter(a => a.action_type === 'mood_logged').length,
                sleepLogs: data.filter(a => a.action_type === 'sleep_logged').length,
                daysActive: new Set(data.map(a => a.created_at?.split('T')[0])).size,
            };

            return stats;
        } catch {
            return { totalAssessments: 0, articlesRead: 0, videosWatched: 0, moodLogs: 0, sleepLogs: 0, daysActive: 0 };
        }
    }
};

export function useActivityService() {
    return useMemo(() => activityService, []);
}
