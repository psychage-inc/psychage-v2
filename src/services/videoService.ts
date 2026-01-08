import { Video } from '../types/models';
import { supabase } from '../lib/supabaseClient';
import { useMemo } from 'react';

// Fallback to mock data
import { videos as mockVideos } from '../data/videos';

export const videoService = {
    getAll: async (params?: { category?: string; limit?: number }): Promise<Video[]> => {
        try {
            let selectString = '*, category:categories(name)';
            if (params?.category) {
                // If filtering by category name, we need !inner join
                // But wait, the categories table has 'slug' and 'name'.
                // If params.category is 'Anxiety' (Name), we filter by name.
                // If it is 'anxiety' (Slug), we filter by slug.
                // The mock data used Name ("Anxiety").
                // Let's assume Name for filtering here if it matches casing, or check both.
                selectString = '*, category:categories!inner(name)';
            }

            let query = supabase.from('videos').select(selectString);

            if (params?.category) {
                query = query.ilike('category.name', params.category);
            }
            if (params?.limit) {
                query = query.limit(params.limit);
            }

            const { data, error } = await query;
            if (error) throw error;
            return (data || []).map(mapToVideo);
        } catch (error) {
            console.error('Failed to fetch videos from Supabase, using mock data:', error);
            // Fallback logic
            let result = mockVideos as unknown as Video[];
            if (params?.category) {
                result = result.filter(v => v.category.toLowerCase() === params.category?.toLowerCase());
            }
            if (params?.limit) {
                result = result.slice(0, params.limit);
            }
            return result;
        }
    },

    getById: async (id: number | string): Promise<Video | undefined> => {
        try {
            const { data, error } = await supabase
                .from('videos')
                .select('*, category:categories(name)')
                .eq('id', id)
                .single();

            if (error) {
                if (error.code === 'PGRST116') return undefined; // Not found
                throw error;
            }
            return mapToVideo(data);
        } catch (error) {
            console.error('Failed to fetch video from Supabase, using mock data:', error);
            return (mockVideos as unknown as Video[]).find(v => v.id.toString() === id.toString());
        }
    },

    getPopular: async (limit: number = 5): Promise<Video[]> => {
        try {
            const { data, error } = await supabase
                .from('videos')
                .select('*, category:categories(name)')
                .order('views', { ascending: false })
                .limit(limit);

            if (error) throw error;
            return (data || []).map(mapToVideo);
        } catch (error) {
            console.error('Failed to fetch popular videos from Supabase, using mock data:', error);
            return (mockVideos as unknown as Video[])
                .sort((a, b) => b.views - a.views)
                .slice(0, limit);
        }
    },

    trackView: async (videoId: number | string): Promise<void> => {
        try {
            const { error } = await supabase.rpc('increment_video_views', { video_id: videoId });
            if (error) throw error;
        } catch (error) {
            console.debug('Failed to track video view:', error);
        }
    }
};

function mapToVideo(data: any): Video {
    return {
        id: data.id,
        title: data.title,
        thumbnail: data.thumbnail,
        duration: data.duration,
        views: data.views || 0,
        category: data.category?.name || 'General' // Flatten category object to string name
    };
}

// Hook wrapper for React components
export function useVideoService() {
    return useMemo(() => videoService, []);
}
