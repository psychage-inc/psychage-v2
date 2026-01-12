import { supabase } from '../lib/supabaseClient';
import { useMemo } from 'react';

export interface Bookmark {
    id: string;
    user_id: string;
    resource_type: 'article' | 'video' | 'provider' | 'tool';
    resource_id: string;
    created_at: string;
}

export const bookmarkService = {
    getAll: async (userId: string): Promise<Bookmark[]> => {
        try {
            const { data, error } = await supabase
                .from('bookmarks')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false });

            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Failed to fetch bookmarks:', error);
            return [];
        }
    },

    getByType: async (userId: string, resourceType: Bookmark['resource_type']): Promise<Bookmark[]> => {
        try {
            const { data, error } = await supabase
                .from('bookmarks')
                .select('*')
                .eq('user_id', userId)
                .eq('resource_type', resourceType)
                .order('created_at', { ascending: false });

            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Failed to fetch bookmarks by type:', error);
            return [];
        }
    },

    add: async (
        userId: string,
        resourceType: Bookmark['resource_type'],
        resourceId: string
    ): Promise<Bookmark | null> => {
        try {
            const { data, error } = await supabase
                .from('bookmarks')
                .insert({
                    user_id: userId,
                    resource_type: resourceType,
                    resource_id: resourceId
                })
                .select()
                .single();

            if (error) {
                // Handle unique constraint violation (already bookmarked)
                if (error.code === '23505') {
                    console.log('Item already bookmarked');
                    return null;
                }
                throw error;
            }
            return data;
        } catch (error) {
            console.error('Failed to add bookmark:', error);
            return null;
        }
    },

    remove: async (userId: string, resourceType: Bookmark['resource_type'], resourceId: string): Promise<boolean> => {
        try {
            const { error } = await supabase
                .from('bookmarks')
                .delete()
                .eq('user_id', userId)
                .eq('resource_type', resourceType)
                .eq('resource_id', resourceId);

            if (error) throw error;
            return true;
        } catch (error) {
            console.error('Failed to remove bookmark:', error);
            return false;
        }
    },

    toggle: async (
        userId: string,
        resourceType: Bookmark['resource_type'],
        resourceId: string
    ): Promise<{ bookmarked: boolean }> => {
        try {
            // Check if already bookmarked
            const { data: existing } = await supabase
                .from('bookmarks')
                .select('id')
                .eq('user_id', userId)
                .eq('resource_type', resourceType)
                .eq('resource_id', resourceId)
                .single();

            if (existing) {
                // Remove bookmark
                await bookmarkService.remove(userId, resourceType, resourceId);
                return { bookmarked: false };
            } else {
                // Add bookmark
                await bookmarkService.add(userId, resourceType, resourceId);
                return { bookmarked: true };
            }
        } catch (error) {
            console.error('Failed to toggle bookmark:', error);
            return { bookmarked: false };
        }
    },

    isBookmarked: async (
        userId: string,
        resourceType: Bookmark['resource_type'],
        resourceId: string
    ): Promise<boolean> => {
        try {
            const { data, error } = await supabase
                .from('bookmarks')
                .select('id')
                .eq('user_id', userId)
                .eq('resource_type', resourceType)
                .eq('resource_id', resourceId)
                .single();

            if (error && error.code !== 'PGRST116') throw error;
            return !!data;
        } catch (error) {
            console.error('Failed to check bookmark status:', error);
            return false;
        }
    },

    getBookmarkedArticleIds: async (userId: string): Promise<string[]> => {
        try {
            const { data, error } = await supabase
                .from('bookmarks')
                .select('resource_id')
                .eq('user_id', userId)
                .eq('resource_type', 'article');

            if (error) throw error;
            return (data || []).map(b => b.resource_id);
        } catch (error) {
            console.error('Failed to fetch bookmarked article IDs:', error);
            return [];
        }
    }
};

export function useBookmarkService() {
    return useMemo(() => bookmarkService, []);
}
