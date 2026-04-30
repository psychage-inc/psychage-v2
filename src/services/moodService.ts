/**
 * Mood Service - Refactored to use Supabase directly
 *
 * Manages mood tracking entries with direct database queries.
 */

import { supabase } from '../lib/supabaseClient';

export interface MoodEntry {
    id: string;
    user_id: string;
    value: number; // 1-5 mood rating
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
    /**
     * Get all mood entries for the current user
     */
    getEntries: async (userId?: string, limit?: number): Promise<MoodEntry[]> => {
        try {
            // If no userId provided, get current authenticated user
            let targetUserId = userId;
            if (!targetUserId) {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) {
                    return [];
                }
                targetUserId = user.id;
            }

            let query = supabase
                .from('mood_entries')
                .select('*')
                .eq('user_id', targetUserId)
                .order('created_at', { ascending: false });

            if (limit) {
                query = query.limit(limit);
            }

            const { data, error } = await query;

            if (error) {
                console.error('Error fetching mood entries:', error);
                return [];
            }

            return (data || []).map(entry => ({
                id: entry.id,
                user_id: entry.user_id,
                value: entry.value, // Support both column names
                notes: entry.notes,
                tags: entry.tags || [],
                created_at: entry.created_at,
            }));
        } catch (error) {
            console.error('Failed to fetch mood entries:', error);
            return [];
        }
    },

    /**
     * Create a new mood entry
     */
    createEntry: async (userId: string, value: number, notes?: string, tags?: string[]): Promise<MoodEntry | null> => {
        try {
            // Validate mood rating
            if (value < 1 || value > 5) {
                console.error('Mood rating must be between 1 and 5');
                return null;
            }

            const { data, error } = await supabase
                .from('mood_entries')
                .insert({
                    user_id: userId,
                    value,
                    notes,
                    tags: tags || [],
                    created_at: new Date().toISOString(),
                })
                .select()
                .single();

            if (error) {
                console.error('Error creating mood entry:', error);
                return null;
            }

            return {
                id: data.id,
                user_id: data.user_id,
                value: data.value,
                notes: data.notes,
                tags: data.tags || [],
                created_at: data.created_at,
            };
        } catch (error) {
            console.error('Failed to create mood entry:', error);
            return null;
        }
    },

    /**
     * Update an existing mood entry
     */
    updateEntry: async (id: string, updates: Partial<Pick<MoodEntry, 'value' | 'notes' | 'tags'>>): Promise<MoodEntry | null> => {
        try {
            const updateData: Record<string, unknown> = {};

            if (updates.value !== undefined) {
                if (updates.value < 1 || updates.value > 5) {
                    console.error('Mood rating must be between 1 and 5');
                    return null;
                }
                updateData.value = updates.value;
            }
            if (updates.notes !== undefined) updateData.notes = updates.notes;
            if (updates.tags !== undefined) updateData.tags = updates.tags;

            const { data, error } = await supabase
                .from('mood_entries')
                .update(updateData)
                .eq('id', id)
                .select()
                .single();

            if (error) {
                console.error('Error updating mood entry:', error);
                return null;
            }

            return {
                id: data.id,
                user_id: data.user_id,
                value: data.value,
                notes: data.notes,
                tags: data.tags || [],
                created_at: data.created_at,
            };
        } catch (error) {
            console.error('Failed to update mood entry:', error);
            return null;
        }
    },

    /**
     * Delete a mood entry
     */
    deleteEntry: async (id: string): Promise<boolean> => {
        try {
            const { error } = await supabase
                .from('mood_entries')
                .delete()
                .eq('id', id);

            if (error) {
                console.error('Error deleting mood entry:', error);
                return false;
            }

            return true;
        } catch (error) {
            console.error('Failed to delete mood entry:', error);
            return false;
        }
    },

    /**
     * Get mood statistics for the current user
     */
    getStats: async (userId?: string): Promise<MoodStats> => {
        try {
            // Get current user if not provided
            let targetUserId = userId;
            if (!targetUserId) {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) {
                    return { averageMood: 0, totalEntries: 0, trend: 'stable', streakDays: 0 };
                }
                targetUserId = user.id;
            }

            // Fetch all entries for the user
            const { data: entries, error } = await supabase
                .from('mood_entries')
                .select('value, created_at')
                .eq('user_id', targetUserId)
                .order('created_at', { ascending: false });

            if (error || !entries || entries.length === 0) {
                return { averageMood: 0, totalEntries: 0, trend: 'stable', streakDays: 0 };
            }

            // Calculate average mood
            const total = entries.reduce((sum, entry) => sum + (entry.value || 0), 0);
            const averageMood = total / entries.length;

            // Calculate trend (compare recent vs older entries)
            let trend: 'up' | 'down' | 'stable' = 'stable';
            if (entries.length >= 6) {
                const recentAvg = entries.slice(0, 3).reduce((sum, e) => sum + (e.value || 0), 0) / 3;
                const olderAvg = entries.slice(3, 6).reduce((sum, e) => sum + (e.value || 0), 0) / 3;
                const diff = recentAvg - olderAvg;
                if (diff > 0.3) trend = 'up';
                else if (diff < -0.3) trend = 'down';
            }

            // Calculate streak days (consecutive days with entries)
            const uniqueDates = new Set(
                entries.map(e => new Date(e.created_at).toISOString().split('T')[0])
            );
            let streakDays = 0;
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);

            while (uniqueDates.has(currentDate.toISOString().split('T')[0])) {
                streakDays++;
                currentDate.setDate(currentDate.getDate() - 1);
            }

            return {
                averageMood: Math.round(averageMood * 10) / 10,
                totalEntries: entries.length,
                trend,
                streakDays,
            };
        } catch (error) {
            console.error('Failed to fetch mood stats:', error);
            return { averageMood: 0, totalEntries: 0, trend: 'stable', streakDays: 0 };
        }
    },

    /**
     * Get mood entries within a date range
     */
    getEntriesByDateRange: async (userId: string, startDate: string, endDate: string): Promise<MoodEntry[]> => {
        try {
            const { data, error } = await supabase
                .from('mood_entries')
                .select('*')
                .eq('user_id', userId)
                .gte('created_at', startDate)
                .lte('created_at', endDate)
                .order('created_at', { ascending: true });

            if (error) {
                console.error('Error fetching mood entries by date range:', error);
                return [];
            }

            return (data || []).map(entry => ({
                id: entry.id,
                user_id: entry.user_id,
                value: entry.value,
                notes: entry.notes,
                tags: entry.tags || [],
                created_at: entry.created_at,
            }));
        } catch (error) {
            console.error('Failed to fetch mood entries by date range:', error);
            return [];
        }
    },
};
