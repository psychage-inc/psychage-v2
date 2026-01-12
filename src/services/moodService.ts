import { supabase } from '../lib/supabaseClient';
import { useMemo } from 'react';

export interface MoodEntry {
    id: string;
    user_id: string;
    value: number;
    notes?: string;
    tags: string[];
    created_at: string;
}

export interface MoodStats {
    averageMood: number;
    totalEntries: number;
    trend: 'up' | 'down' | 'stable';
    streakDays: number;
}

export const moodService = {
    getEntries: async (userId: string, limit?: number): Promise<MoodEntry[]> => {
        try {
            let query = supabase
                .from('mood_entries')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false });

            if (limit) {
                query = query.limit(limit);
            }

            const { data, error } = await query;
            if (error) throw error;

            return data || [];
        } catch (error) {
            console.error('Failed to fetch mood entries:', error);
            return [];
        }
    },

    createEntry: async (userId: string, value: number, notes?: string, tags?: string[]): Promise<MoodEntry | null> => {
        try {
            const { data, error } = await supabase
                .from('mood_entries')
                .insert({
                    user_id: userId,
                    value,
                    notes,
                    tags: tags || []
                })
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Failed to create mood entry:', error);
            return null;
        }
    },

    updateEntry: async (id: string, updates: Partial<Pick<MoodEntry, 'value' | 'notes' | 'tags'>>): Promise<MoodEntry | null> => {
        try {
            const { data, error } = await supabase
                .from('mood_entries')
                .update(updates)
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Failed to update mood entry:', error);
            return null;
        }
    },

    deleteEntry: async (id: string): Promise<boolean> => {
        try {
            const { error } = await supabase
                .from('mood_entries')
                .delete()
                .eq('id', id);

            if (error) throw error;
            return true;
        } catch (error) {
            console.error('Failed to delete mood entry:', error);
            return false;
        }
    },

    getStats: async (userId: string): Promise<MoodStats> => {
        try {
            const { data, error } = await supabase
                .from('mood_entries')
                .select('value, created_at')
                .eq('user_id', userId)
                .order('created_at', { ascending: false });

            if (error) throw error;

            if (!data || data.length === 0) {
                return { averageMood: 0, totalEntries: 0, trend: 'stable', streakDays: 0 };
            }

            const values = data.map(d => d.value);
            const averageMood = Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 10) / 10;

            // Calculate trend
            let trend: 'up' | 'down' | 'stable' = 'stable';
            if (data.length >= 7) {
                const recent = values.slice(0, 7).reduce((a, b) => a + b, 0) / 7;
                const older = values.slice(7, 14).reduce((a, b) => a + b, 0) / Math.min(7, values.length - 7);
                if (recent > older + 0.5) trend = 'up';
                else if (recent < older - 0.5) trend = 'down';
            }

            // Calculate streak
            let streakDays = 0;
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            for (const entry of data) {
                const entryDate = new Date(entry.created_at);
                entryDate.setHours(0, 0, 0, 0);
                const diffDays = Math.floor((today.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24));

                if (diffDays === streakDays) {
                    streakDays++;
                } else if (diffDays > streakDays) {
                    break;
                }
            }

            return {
                averageMood,
                totalEntries: data.length,
                trend,
                streakDays
            };
        } catch (error) {
            console.error('Failed to fetch mood stats:', error);
            return { averageMood: 0, totalEntries: 0, trend: 'stable', streakDays: 0 };
        }
    },

    getEntriesByDateRange: async (userId: string, startDate: string, endDate: string): Promise<MoodEntry[]> => {
        try {
            const { data, error } = await supabase
                .from('mood_entries')
                .select('*')
                .eq('user_id', userId)
                .gte('created_at', startDate)
                .lte('created_at', endDate)
                .order('created_at', { ascending: true });

            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Failed to fetch mood entries by date range:', error);
            return [];
        }
    }
};

export function useMoodService() {
    return useMemo(() => moodService, []);
}
