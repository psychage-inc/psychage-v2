import api from '../lib/api';
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
    getEntries: async (_userId?: string, limit?: number): Promise<MoodEntry[]> => {
        try {
            const response = await api.mood.getEntries();
            if (!response.success || !response.data) return [];

            // Map V1 response format (mood_rating, entry_date) to V2 format (value, created_at)
            const rawEntries = response.data as { id: string; user_id: string; mood_rating: number; notes?: string; entry_date: string }[];
            let entries: MoodEntry[] = rawEntries.map(e => ({
                id: e.id,
                user_id: e.user_id,
                value: e.mood_rating,
                notes: e.notes,
                tags: [], // V1 doesn't support tags
                created_at: e.entry_date,
            }));
            if (limit) {
                entries = entries.slice(0, limit);
            }
            return entries;
        } catch (error) {
            console.error('Failed to fetch mood entries:', error);
            return [];
        }
    },

    createEntry: async (_userId: string, value: number, notes?: string, _tags?: string[]): Promise<MoodEntry | null> => {
        try {
            // V1 API expects mood_rating (1-5) and entry_date
            const entry_date = new Date().toISOString().split('T')[0] as string;
            const response = await api.mood.createEntry({ mood_rating: value, notes, entry_date });
            if (!response.success || !response.data) return null;
            // Map V1 response to V2 format
            const data = response.data as { id: string; user_id: string; mood_rating: number; notes?: string; entry_date: string };
            return {
                id: data.id,
                user_id: data.user_id,
                value: data.mood_rating,
                notes: data.notes,
                tags: [], // V1 doesn't support tags
                created_at: data.entry_date,
            };
        } catch (error) {
            console.error('Failed to create mood entry:', error);
            return null;
        }
    },

    updateEntry: async (id: string, updates: Partial<Pick<MoodEntry, 'value' | 'notes' | 'tags'>>): Promise<MoodEntry | null> => {
        try {
            const response = await api.put<MoodEntry>(`/api/mood/${id}`, updates);
            if (!response.success || !response.data) return null;
            return response.data;
        } catch (error) {
            console.error('Failed to update mood entry:', error);
            return null;
        }
    },

    deleteEntry: async (id: string): Promise<boolean> => {
        try {
            const response = await api.delete<void>(`/api/mood/${id}`);
            return response.success;
        } catch (error) {
            console.error('Failed to delete mood entry:', error);
            return false;
        }
    },

    getStats: async (_userId?: string): Promise<MoodStats> => {
        try {
            const response = await api.get<MoodStats>('/api/mood/stats');
            if (!response.success || !response.data) {
                return { averageMood: 0, totalEntries: 0, trend: 'stable', streakDays: 0 };
            }
            return response.data;
        } catch (error) {
            console.error('Failed to fetch mood stats:', error);
            return { averageMood: 0, totalEntries: 0, trend: 'stable', streakDays: 0 };
        }
    },

    getEntriesByDateRange: async (_userId: string, startDate: string, endDate: string): Promise<MoodEntry[]> => {
        try {
            const response = await api.get<MoodEntry[]>(`/api/mood?start=${startDate}&end=${endDate}`);
            if (!response.success || !response.data) return [];
            return response.data;
        } catch (error) {
            console.error('Failed to fetch mood entries by date range:', error);
            return [];
        }
    }
};

export function useMoodService() {
    return useMemo(() => moodService, []);
}
