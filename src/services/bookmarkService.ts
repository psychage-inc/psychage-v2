import api from '../lib/api';
import { useMemo } from 'react';

export interface Bookmark {
    id: string;
    user_id: string;
    resource_type: 'article' | 'video' | 'provider' | 'tool';
    resource_id: string;
    created_at: string;
}

export const bookmarkService = {
    getAll: async (_userId?: string): Promise<Bookmark[]> => {
        try {
            const response = await api.bookmarks.getAll();
            if (!response.success || !response.data) return [];
            return response.data as Bookmark[];
        } catch (error) {
            console.error('Failed to fetch bookmarks:', error);
            return [];
        }
    },

    getByType: async (_userId: string, resourceType: Bookmark['resource_type']): Promise<Bookmark[]> => {
        try {
            const response = await api.bookmarks.getByType(resourceType);
            if (!response.success || !response.data) return [];
            return response.data as Bookmark[];
        } catch (error) {
            console.error('Failed to fetch bookmarks by type:', error);
            return [];
        }
    },

    add: async (
        _userId: string,
        resourceType: Bookmark['resource_type'],
        resourceId: string
    ): Promise<Bookmark | null> => {
        try {
            const response = await api.bookmarks.add(resourceType, resourceId);
            if (!response.success || !response.data) return null;
            return response.data as Bookmark;
        } catch (error) {
            console.error('Failed to add bookmark:', error);
            return null;
        }
    },

    remove: async (_userId: string, resourceType: Bookmark['resource_type'], resourceId: string): Promise<boolean> => {
        try {
            const response = await api.bookmarks.remove(resourceType, resourceId);
            return response.success;
        } catch (error) {
            console.error('Failed to remove bookmark:', error);
            return false;
        }
    },

    toggle: async (
        _userId: string,
        resourceType: Bookmark['resource_type'],
        resourceId: string
    ): Promise<{ bookmarked: boolean }> => {
        try {
            const response = await api.bookmarks.toggle(resourceType, resourceId);
            if (!response.success || !response.data) {
                return { bookmarked: false };
            }
            return response.data;
        } catch (error) {
            console.error('Failed to toggle bookmark:', error);
            return { bookmarked: false };
        }
    },

    isBookmarked: async (
        _userId: string,
        resourceType: Bookmark['resource_type'],
        resourceId: string
    ): Promise<boolean> => {
        try {
            const response = await api.bookmarks.isBookmarked(resourceType, resourceId);
            if (!response.success || !response.data) return false;
            return response.data.bookmarked;
        } catch (error) {
            console.error('Failed to check bookmark status:', error);
            return false;
        }
    },

    getBookmarkedArticleIds: async (_userId?: string): Promise<string[]> => {
        try {
            const response = await api.bookmarks.getByType('article');
            if (!response.success || !response.data) return [];
            return (response.data as Bookmark[]).map(b => b.resource_id);
        } catch (error) {
            console.error('Failed to fetch bookmarked article IDs:', error);
            return [];
        }
    }
};

export function useBookmarkService() {
    return useMemo(() => bookmarkService, []);
}
