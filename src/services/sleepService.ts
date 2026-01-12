import { supabase } from '../lib/supabaseClient';
import { useMemo } from 'react';

export interface SleepEntry {
    id: string;
    user_id: string;
    hours: number;
    quality: number;
    bed_time?: string;
    wake_time?: string;
    notes?: string;
    date: string;
    created_at: string;
}

export interface SleepStats {
    averageHours: number;
    averageQuality: number;
    totalEntries: number;
    trend: 'up' | 'down' | 'stable';
    recommendation: string;
}

export const sleepService = {
    getEntries: async (userId: string, limit?: number): Promise<SleepEntry[]> => {
        try {
            let query = supabase
                .from('sleep_entries')
                .select('*')
                .eq('user_id', userId)
                .order('date', { ascending: false });

            if (limit) {
                query = query.limit(limit);
            }

            const { data, error } = await query;
            if (error) throw error;

            return data || [];
        } catch (error) {
            console.error('Failed to fetch sleep entries:', error);
            return [];
        }
    },

    createEntry: async (
        userId: string,
        hours: number,
        quality: number,
        options?: {
            bed_time?: string;
            wake_time?: string;
            notes?: string;
            date?: string;
        }
    ): Promise<SleepEntry | null> => {
        try {
            const { data, error } = await supabase
                .from('sleep_entries')
                .insert({
                    user_id: userId,
                    hours,
                    quality,
                    bed_time: options?.bed_time,
                    wake_time: options?.wake_time,
                    notes: options?.notes,
                    date: options?.date || new Date().toISOString().split('T')[0]
                })
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Failed to create sleep entry:', error);
            return null;
        }
    },

    updateEntry: async (
        id: string,
        updates: Partial<Pick<SleepEntry, 'hours' | 'quality' | 'bed_time' | 'wake_time' | 'notes'>>
    ): Promise<SleepEntry | null> => {
        try {
            const { data, error } = await supabase
                .from('sleep_entries')
                .update(updates)
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Failed to update sleep entry:', error);
            return null;
        }
    },

    deleteEntry: async (id: string): Promise<boolean> => {
        try {
            const { error } = await supabase
                .from('sleep_entries')
                .delete()
                .eq('id', id);

            if (error) throw error;
            return true;
        } catch (error) {
            console.error('Failed to delete sleep entry:', error);
            return false;
        }
    },

    getStats: async (userId: string): Promise<SleepStats> => {
        try {
            const { data, error } = await supabase
                .from('sleep_entries')
                .select('hours, quality, date')
                .eq('user_id', userId)
                .order('date', { ascending: false })
                .limit(30);

            if (error) throw error;

            if (!data || data.length === 0) {
                return {
                    averageHours: 0,
                    averageQuality: 0,
                    totalEntries: 0,
                    trend: 'stable',
                    recommendation: 'Start tracking your sleep to get personalized insights.'
                };
            }

            const hours = data.map(d => d.hours);
            const qualities = data.map(d => d.quality);
            const averageHours = Math.round((hours.reduce((a, b) => a + b, 0) / hours.length) * 10) / 10;
            const averageQuality = Math.round((qualities.reduce((a, b) => a + b, 0) / qualities.length) * 10) / 10;

            // Calculate trend
            let trend: 'up' | 'down' | 'stable' = 'stable';
            if (data.length >= 14) {
                const recentHours = hours.slice(0, 7).reduce((a, b) => a + b, 0) / 7;
                const olderHours = hours.slice(7, 14).reduce((a, b) => a + b, 0) / 7;
                if (recentHours > olderHours + 0.5) trend = 'up';
                else if (recentHours < olderHours - 0.5) trend = 'down';
            }

            // Generate recommendation
            let recommendation = 'Keep up the good work with your sleep habits!';
            if (averageHours < 6) {
                recommendation = 'You may not be getting enough sleep. Aim for 7-9 hours per night.';
            } else if (averageHours > 9) {
                recommendation = 'You might be oversleeping. Try to maintain a consistent 7-9 hour schedule.';
            } else if (averageQuality < 5) {
                recommendation = 'Your sleep quality could improve. Try limiting screen time before bed.';
            }

            return {
                averageHours,
                averageQuality,
                totalEntries: data.length,
                trend,
                recommendation
            };
        } catch (error) {
            console.error('Failed to fetch sleep stats:', error);
            return {
                averageHours: 0,
                averageQuality: 0,
                totalEntries: 0,
                trend: 'stable',
                recommendation: 'Unable to calculate stats at this time.'
            };
        }
    },

    getAverages: async (userId: string, days: number = 7): Promise<{ avgHours: number; avgQuality: number }> => {
        try {
            const startDate = new Date();
            startDate.setDate(startDate.getDate() - days);

            const { data, error } = await supabase
                .from('sleep_entries')
                .select('hours, quality')
                .eq('user_id', userId)
                .gte('date', startDate.toISOString().split('T')[0]);

            if (error) throw error;

            if (!data || data.length === 0) {
                return { avgHours: 0, avgQuality: 0 };
            }

            return {
                avgHours: Math.round((data.reduce((a, b) => a + b.hours, 0) / data.length) * 10) / 10,
                avgQuality: Math.round((data.reduce((a, b) => a + b.quality, 0) / data.length) * 10) / 10
            };
        } catch (error) {
            console.error('Failed to fetch sleep averages:', error);
            return { avgHours: 0, avgQuality: 0 };
        }
    }
};

export function useSleepService() {
    return useMemo(() => sleepService, []);
}
