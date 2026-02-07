import api from '../lib/api';
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
    getEntries: async (_userId?: string, limit?: number): Promise<SleepEntry[]> => {
        try {
            const response = await api.sleep.getEntries();
            if (!response.success || !response.data) return [];

            let entries = response.data as SleepEntry[];
            if (limit) {
                entries = entries.slice(0, limit);
            }
            return entries;
        } catch (error) {
            console.error('Failed to fetch sleep entries:', error);
            return [];
        }
    },

    createEntry: async (
        _userId: string,
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
            const response = await api.sleep.createEntry({
                hours,
                quality,
                bed_time: options?.bed_time,
                wake_time: options?.wake_time,
                notes: options?.notes,
                date: options?.date || new Date().toISOString().split('T')[0]
            });
            if (!response.success || !response.data) return null;
            return response.data as SleepEntry;
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
            const response = await api.sleep.updateEntry(id, updates);
            if (!response.success || !response.data) return null;
            return response.data as SleepEntry;
        } catch (error) {
            console.error('Failed to update sleep entry:', error);
            return null;
        }
    },

    deleteEntry: async (id: string): Promise<boolean> => {
        try {
            const response = await api.sleep.deleteEntry(id);
            return response.success;
        } catch (error) {
            console.error('Failed to delete sleep entry:', error);
            return false;
        }
    },

    getStats: async (_userId?: string): Promise<SleepStats> => {
        try {
            const response = await api.sleep.getStats();
            if (!response.success || !response.data) {
                return {
                    averageHours: 0,
                    averageQuality: 0,
                    totalEntries: 0,
                    trend: 'stable',
                    recommendation: 'Start tracking your sleep to get personalized insights.'
                };
            }
            return response.data as SleepStats;
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

    getAverages: async (_userId?: string, days: number = 7): Promise<{ avgHours: number; avgQuality: number }> => {
        try {
            const response = await api.sleep.getAverages(days);
            if (!response.success || !response.data) {
                return { avgHours: 0, avgQuality: 0 };
            }
            const data = response.data as { avgHours?: number; avgQuality?: number; averageHours?: number; averageQuality?: number };
            return {
                avgHours: data.avgHours ?? data.averageHours ?? 0,
                avgQuality: data.avgQuality ?? data.averageQuality ?? 0
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
