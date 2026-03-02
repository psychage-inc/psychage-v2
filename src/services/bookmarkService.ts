/**
 * Bookmark Service - Refactored to use Supabase directly
 *
 * Manages user bookmarks with direct database queries and optional localStorage fallback.
 */

import { supabase } from '../lib/supabaseClient';

export interface Bookmark {
    id: string;
    user_id: string;
    resource_type: 'article' | 'video' | 'provider' | 'tool';
    resource_id: string;
    created_at: string;
}

// localStorage key for offline bookmark cache
const BOOKMARKS_CACHE_KEY = 'psychage_bookmarks_cache';

export const bookmarkService = {
    /**
     * Get all bookmarks for the current user
     */
    getAll: async (userId?: string): Promise<Bookmark[]> => {
        try {
            // Get current user if not provided
            let targetUserId = userId;
            if (!targetUserId) {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) {
                    console.warn('No authenticated user found');
                    // Return cached bookmarks for unauthenticated users
                    return getLocalBookmarks();
                }
                targetUserId = user.id;
            }

            const { data, error } = await supabase
                .from('bookmarks')
                .select('*')
                .eq('user_id', targetUserId)
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching bookmarks:', error);
                // Fall back to local cache
                return getLocalBookmarks();
            }

            const bookmarks = (data || []) as Bookmark[];

            // Update local cache
            cacheBookmarks(bookmarks);

            return bookmarks;
        } catch (error) {
            console.error('Failed to fetch bookmarks:', error);
            return getLocalBookmarks();
        }
    },

    /**
     * Get bookmarks filtered by resource type
     */
    getByType: async (userId: string, resourceType: Bookmark['resource_type']): Promise<Bookmark[]> => {
        try {
            const { data, error } = await supabase
                .from('bookmarks')
                .select('*')
                .eq('user_id', userId)
                .eq('resource_type', resourceType)
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching bookmarks by type:', error);
                // Filter local cache
                return getLocalBookmarks().filter(b => b.resource_type === resourceType);
            }

            return (data || []) as Bookmark[];
        } catch (error) {
            console.error('Failed to fetch bookmarks by type:', error);
            return getLocalBookmarks().filter(b => b.resource_type === resourceType);
        }
    },

    /**
     * Add a new bookmark
     */
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
                    resource_id: resourceId,
                    created_at: new Date().toISOString(),
                })
                .select()
                .single();

            if (error) {
                console.error('Error adding bookmark:', error);
                // Add to local cache as fallback
                const localBookmark: Bookmark = {
                    id: `local_${Date.now()}`,
                    user_id: userId,
                    resource_type: resourceType,
                    resource_id: resourceId,
                    created_at: new Date().toISOString(),
                };
                addToLocalCache(localBookmark);
                return localBookmark;
            }

            const bookmark = data as Bookmark;

            // Update local cache
            addToLocalCache(bookmark);

            return bookmark;
        } catch (error) {
            console.error('Failed to add bookmark:', error);
            return null;
        }
    },

    /**
     * Remove a bookmark
     */
    remove: async (userId: string, resourceType: Bookmark['resource_type'], resourceId: string): Promise<boolean> => {
        try {
            const { error } = await supabase
                .from('bookmarks')
                .delete()
                .eq('user_id', userId)
                .eq('resource_type', resourceType)
                .eq('resource_id', resourceId);

            if (error) {
                console.error('Error removing bookmark:', error);
                // Remove from local cache anyway
                removeFromLocalCache(resourceType, resourceId);
                return false;
            }

            // Remove from local cache
            removeFromLocalCache(resourceType, resourceId);

            return true;
        } catch (error) {
            console.error('Failed to remove bookmark:', error);
            return false;
        }
    },

    /**
     * Toggle bookmark (add if doesn't exist, remove if exists)
     */
    toggle: async (
        userId: string,
        resourceType: Bookmark['resource_type'],
        resourceId: string
    ): Promise<{ bookmarked: boolean }> => {
        try {
            // Check if bookmark exists
            const { data: existing, error: checkError } = await supabase
                .from('bookmarks')
                .select('id')
                .eq('user_id', userId)
                .eq('resource_type', resourceType)
                .eq('resource_id', resourceId)
                .maybeSingle();

            if (checkError) {
                console.error('Error checking bookmark:', checkError);
                return { bookmarked: false };
            }

            if (existing) {
                // Bookmark exists, remove it
                await bookmarkService.remove(userId, resourceType, resourceId);
                return { bookmarked: false };
            } else {
                // Bookmark doesn't exist, add it
                await bookmarkService.add(userId, resourceType, resourceId);
                return { bookmarked: true };
            }
        } catch (error) {
            console.error('Failed to toggle bookmark:', error);
            return { bookmarked: false };
        }
    },

    /**
     * Check if a resource is bookmarked
     */
    isBookmarked: async (
        userId: string,
        resourceType: Bookmark['resource_type'],
        resourceId: string
    ): Promise<{ bookmarked: boolean }> => {
        try {
            const { data, error } = await supabase
                .from('bookmarks')
                .select('id')
                .eq('user_id', userId)
                .eq('resource_type', resourceType)
                .eq('resource_id', resourceId)
                .maybeSingle();

            if (error) {
                console.error('Error checking bookmark:', error);
                // Check local cache
                const local = getLocalBookmarks();
                const found = local.some(
                    b => b.resource_type === resourceType && b.resource_id === resourceId
                );
                return { bookmarked: found };
            }

            return { bookmarked: !!data };
        } catch (error) {
            console.error('Failed to check bookmark:', error);
            return { bookmarked: false };
        }
    },
};

// ============================================================================
// localStorage Helper Functions
// ============================================================================

function getLocalBookmarks(): Bookmark[] {
    try {
        const cached = localStorage.getItem(BOOKMARKS_CACHE_KEY);
        if (cached) {
            return JSON.parse(cached) as Bookmark[];
        }
    } catch (error) {
        console.error('Failed to read bookmarks from localStorage:', error);
    }
    return [];
}

function cacheBookmarks(bookmarks: Bookmark[]): void {
    try {
        localStorage.setItem(BOOKMARKS_CACHE_KEY, JSON.stringify(bookmarks));
    } catch (error) {
        console.error('Failed to cache bookmarks to localStorage:', error);
    }
}

function addToLocalCache(bookmark: Bookmark): void {
    try {
        const current = getLocalBookmarks();
        const updated = [bookmark, ...current];
        cacheBookmarks(updated);
    } catch (error) {
        console.error('Failed to add bookmark to localStorage:', error);
    }
}

function removeFromLocalCache(resourceType: Bookmark['resource_type'], resourceId: string): void {
    try {
        const current = getLocalBookmarks();
        const updated = current.filter(
            b => !(b.resource_type === resourceType && b.resource_id === resourceId)
        );
        cacheBookmarks(updated);
    } catch (error) {
        console.error('Failed to remove bookmark from localStorage:', error);
    }
}
