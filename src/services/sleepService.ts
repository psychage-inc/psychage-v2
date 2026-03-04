/**
 * Sleep Service - Refactored to use Supabase directly
 *
 * Manages sleep tracking entries with direct database queries.
 */

import { supabase } from '../lib/supabaseClient';

export interface SleepEntry {
    id: string;
    user_id: string;
    hours: number;
    quality: number; // 1-5 rating
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
    recommendation?: string;
}

export const sleepService = {
    /**
     * Get all sleep entries for the current user
     */
    getEntries: async (userId?: string, limit?: number): Promise<SleepEntry[]> => {
        try {
            // If no userId provided, get current authenticated user
            let targetUserId = userId;
            if (!targetUserId) {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) {
                    console.warn('No authenticated user found');
                    return [];
                }
                targetUserId = user.id;
            }

            let query = supabase
                .from('sleep_entries')
                .select('*')
                .eq('user_id', targetUserId)
                .order('date', { ascending: false });

            if (limit) {
                query = query.limit(limit);
            }

            const { data, error } = await query;

            if (error) {
                console.error('Error fetching sleep entries:', error);
                return [];
            }

            return (data || []) as SleepEntry[];
        } catch (error) {
            console.error('Failed to fetch sleep entries:', error);
            return [];
        }
    },

    /**
     * Create a new sleep entry
     */
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
            // Validate inputs
            if (hours < 0 || hours > 24) {
                console.error('Sleep hours must be between 0 and 24');
                return null;
            }
            if (quality < 1 || quality > 5) {
                console.error('Sleep quality must be between 1 and 5');
                return null;
            }

            const date = options?.date || new Date().toISOString().split('T')[0];

            const { data, error } = await supabase
                .from('sleep_entries')
                .insert({
                    user_id: userId,
                    hours,
                    quality,
                    bed_time: options?.bed_time,
                    wake_time: options?.wake_time,
                    notes: options?.notes,
                    date,
                    created_at: new Date().toISOString(),
                })
                .select()
                .single();

            if (error) {
                console.error('Error creating sleep entry:', error);
                return null;
            }

            return data as SleepEntry;
        } catch (error) {
            console.error('Failed to create sleep entry:', error);
            return null;
        }
    },

    /**
     * Update an existing sleep entry
     */
    updateEntry: async (
        id: string,
        updates: Partial<Omit<SleepEntry, 'id' | 'user_id' | 'created_at'>>
    ): Promise<SleepEntry | null> => {
        try {
            // Validate if provided
            if (updates.hours !== undefined && (updates.hours < 0 || updates.hours > 24)) {
                console.error('Sleep hours must be between 0 and 24');
                return null;
            }
            if (updates.quality !== undefined && (updates.quality < 1 || updates.quality > 5)) {
                console.error('Sleep quality must be between 1 and 5');
                return null;
            }

            const { data, error } = await supabase
                .from('sleep_entries')
                .update(updates)
                .eq('id', id)
                .select()
                .single();

            if (error) {
                console.error('Error updating sleep entry:', error);
                return null;
            }

            return data as SleepEntry;
        } catch (error) {
            console.error('Failed to update sleep entry:', error);
            return null;
        }
    },

    /**
     * Delete a sleep entry
     */
    deleteEntry: async (id: string): Promise<boolean> => {
        try {
            const { error } = await supabase
                .from('sleep_entries')
                .delete()
                .eq('id', id);

            if (error) {
                console.error('Error deleting sleep entry:', error);
                return false;
            }

            return true;
        } catch (error) {
            console.error('Failed to delete sleep entry:', error);
            return false;
        }
    },

    /**
     * Get average sleep hours and quality over the last N days
     */
    getAverages: async (userId?: string, days: number = 7): Promise<{ avgHours: number; avgQuality: number }> => {
        try {
            // Get current user if not provided
            let targetUserId = userId;
            if (!targetUserId) {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) {
                    return { avgHours: 0, avgQuality: 0 };
                }
                targetUserId = user.id;
            }

            // Calculate date range
            const endDate = new Date();
            const startDate = new Date();
            startDate.setDate(startDate.getDate() - days);

            const { data: entries, error } = await supabase
                .from('sleep_entries')
                .select('hours, quality')
                .eq('user_id', targetUserId)
                .gte('date', startDate.toISOString().split('T')[0])
                .lte('date', endDate.toISOString().split('T')[0]);

            if (error || !entries || entries.length === 0) {
                return { avgHours: 0, avgQuality: 0 };
            }

            const totalHours = entries.reduce((sum, entry) => sum + entry.hours, 0);
            const totalQuality = entries.reduce((sum, entry) => sum + entry.quality, 0);

            return {
                avgHours: Math.round((totalHours / entries.length) * 10) / 10,
                avgQuality: Math.round((totalQuality / entries.length) * 10) / 10,
            };
        } catch (error) {
            console.error('Failed to fetch sleep averages:', error);
            return { avgHours: 0, avgQuality: 0 };
        }
    },

    /**
     * Get sleep statistics for the current user
     */
    getStats: async (userId?: string): Promise<SleepStats> => {
        try {
            // Get current user if not provided
            let targetUserId = userId;
            if (!targetUserId) {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) {
                    return {
                        averageHours: 0,
                        averageQuality: 0,
                        totalEntries: 0,
                        trend: 'stable',
                    };
                }
                targetUserId = user.id;
            }

            // Fetch all entries for the user
            const { data: entries, error } = await supabase
                .from('sleep_entries')
                .select('hours, quality, date')
                .eq('user_id', targetUserId)
                .order('date', { ascending: false });

            if (error || !entries || entries.length === 0) {
                return {
                    averageHours: 0,
                    averageQuality: 0,
                    totalEntries: 0,
                    trend: 'stable',
                };
            }

            // Calculate averages
            const totalHours = entries.reduce((sum, entry) => sum + entry.hours, 0);
            const totalQuality = entries.reduce((sum, entry) => sum + entry.quality, 0);
            const averageHours = totalHours / entries.length;
            const averageQuality = totalQuality / entries.length;

            // Calculate trend (compare recent vs older entries)
            let trend: 'up' | 'down' | 'stable' = 'stable';
            if (entries.length >= 6) {
                const recentAvg = entries.slice(0, 3).reduce((sum, e) => sum + e.hours, 0) / 3;
                const olderAvg = entries.slice(3, 6).reduce((sum, e) => sum + e.hours, 0) / 3;
                const diff = recentAvg - olderAvg;
                if (diff > 0.5) trend = 'up';
                else if (diff < -0.5) trend = 'down';
            }

            // Generate recommendation
            let recommendation: string | undefined;
            if (averageHours < 7) {
                recommendation = 'Try to get at least 7-9 hours of sleep per night for optimal health.';
            } else if (averageHours > 9) {
                recommendation = 'Consider maintaining a consistent sleep schedule. Excessive sleep can indicate underlying issues.';
            } else if (averageQuality < 3) {
                recommendation = 'Your sleep quality could be improved. Consider creating a bedtime routine and optimizing your sleep environment.';
            } else {
                recommendation = 'Great job! You\'re maintaining healthy sleep habits.';
            }

            return {
                averageHours: Math.round(averageHours * 10) / 10,
                averageQuality: Math.round(averageQuality * 10) / 10,
                totalEntries: entries.length,
                trend,
                recommendation,
            };
        } catch (error) {
            console.error('Failed to fetch sleep stats:', error);
            return {
                averageHours: 0,
                averageQuality: 0,
                totalEntries: 0,
                trend: 'stable',
            };
        }
    },

    /**
     * Get sleep entries within a date range
     */
    getEntriesByDateRange: async (userId: string, startDate: string, endDate: string): Promise<SleepEntry[]> => {
        try {
            const { data, error } = await supabase
                .from('sleep_entries')
                .select('*')
                .eq('user_id', userId)
                .gte('date', startDate)
                .lte('date', endDate)
                .order('date', { ascending: true});

            if (error) {
                console.error('Error fetching sleep entries by date range:', error);
                return [];
            }

            return (data || []) as SleepEntry[];
        } catch (error) {
            console.error('Failed to fetch sleep entries by date range:', error);
            return [];
        }
    },
};
