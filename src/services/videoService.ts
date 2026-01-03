import { Video } from '../types/models';
import { api } from '../lib/api';
import { useMemo } from 'react';

// Fallback to mock data if API fails
import { videos as mockVideos } from '../data/videos';

const USE_API = import.meta.env.VITE_API_URL ? true : false;

export const videoService = {
    getAll: async (params?: { category?: string; limit?: number }): Promise<Video[]> => {
        if (!USE_API) {
            await new Promise(resolve => setTimeout(resolve, 600));
            let result = mockVideos as unknown as Video[];
            if (params?.category) {
                result = result.filter(v => v.category === params.category);
            }
            if (params?.limit) {
                result = result.slice(0, params.limit);
            }
            return result;
        }

        try {
            const queryParams = new URLSearchParams();
            if (params?.category) queryParams.set('category', params.category);
            if (params?.limit) queryParams.set('limit', params.limit.toString());

            const query = queryParams.toString();
            const response = await api.get<Video[]>(
                `/api/videos${query ? `?${query}` : ''}`
            );
            return response.data || [];
        } catch (error) {
            console.error('Failed to fetch videos from API, using mock data:', error);
            return mockVideos as unknown as Video[];
        }
    },

    getById: async (id: number): Promise<Video | undefined> => {
        if (!USE_API) {
            await new Promise(resolve => setTimeout(resolve, 400));
            return (mockVideos as unknown as Video[]).find(v => v.id === id);
        }

        try {
            const response = await api.get<Video>(`/api/videos/${id}`);
            return response.data;
        } catch (error) {
            console.error('Failed to fetch video from API, using mock data:', error);
            return (mockVideos as unknown as Video[]).find(v => v.id === id);
        }
    },

    getPopular: async (limit: number = 5): Promise<Video[]> => {
        if (!USE_API) {
            await new Promise(resolve => setTimeout(resolve, 500));
            return (mockVideos as unknown as Video[])
                .sort((a, b) => b.views - a.views)
                .slice(0, limit);
        }

        try {
            const response = await api.get<Video[]>(`/api/videos?sort=popular&limit=${limit}`);
            return response.data || [];
        } catch (error) {
            console.error('Failed to fetch popular videos from API, using mock data:', error);
            return (mockVideos as unknown as Video[])
                .sort((a, b) => b.views - a.views)
                .slice(0, limit);
        }
    },

    trackView: async (videoId: number): Promise<void> => {
        try {
            await api.post(`/api/videos/${videoId}/view`);
        } catch (error) {
            // Silent fail for analytics
            console.debug('Failed to track video view:', error);
        }
    }
};

// Hook wrapper for React components
export function useVideoService() {
    return useMemo(() => videoService, []);
}
