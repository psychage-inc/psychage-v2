import { Article } from '../types/models';
import { api } from '../lib/api';
import { useMemo } from 'react';

// Fallback to mock data if API fails
import { articles as mockArticles } from '../data/articles';

const USE_API = import.meta.env.VITE_API_URL ? true : false;

export const articleService = {
    getAll: async (params?: { category?: string; featured?: boolean }): Promise<Article[]> => {
        if (!USE_API) {
            await new Promise(resolve => setTimeout(resolve, 800));
            let result = mockArticles;
            if (params?.category) {
                result = result.filter(a => a.category.slug === params.category);
            }
            if (params?.featured) {
                result = result.filter(a => a.featured);
            }
            return result;
        }

        try {
            const queryParams: Record<string, string> = {};
            if (params?.category) queryParams.category = params.category;
            if (params?.featured) queryParams.featured = 'true';

            const query = new URLSearchParams(queryParams).toString();
            const response = await api.get<Article[]>(
                `/api/articles${query ? `?${query}` : ''}`
            );
            return response.data || [];
        } catch (error) {
            console.error('Failed to fetch articles from API, using mock data:', error);
            return mockArticles;
        }
    },

    getById: async (id: number | string): Promise<Article | undefined> => {
        if (!USE_API) {
            await new Promise(resolve => setTimeout(resolve, 500));
            return mockArticles.find(a => a.id.toString() === id.toString());
        }

        try {
            const response = await api.get<Article>(`/api/articles/${id}`);
            return response.data;
        } catch (error) {
            console.error('Failed to fetch article from API, using mock data:', error);
            return mockArticles.find(a => a.id.toString() === id.toString());
        }
    },

    getBySlug: async (slug: string): Promise<Article | undefined> => {
        if (!USE_API) {
            await new Promise(resolve => setTimeout(resolve, 500));
            return mockArticles.find(a => a.slug === slug);
        }

        try {
            const response = await api.get<Article>(`/api/articles/slug/${slug}`);
            return response.data;
        } catch (error) {
            console.error('Failed to fetch article from API, using mock data:', error);
            return mockArticles.find(a => a.slug === slug);
        }
    },

    getFeatured: async (): Promise<Article[]> => {
        return articleService.getAll({ featured: true });
    },

    getByCategory: async (categorySlug: string): Promise<Article[]> => {
        return articleService.getAll({ category: categorySlug });
    },

    toggleBookmark: async (articleId: string): Promise<{ bookmarked: boolean }> => {
        try {
            const response = await api.post<{ bookmarked: boolean }>(`/api/articles/${articleId}/bookmark`);
            return response.data || { bookmarked: false };
        } catch (error) {
            console.error('Failed to toggle bookmark:', error);
            throw error;
        }
    },

    getBookmarks: async (): Promise<Article[]> => {
        try {
            const response = await api.get<Article[]>('/api/articles/bookmarks');
            return response.data || [];
        } catch (error) {
            console.error('Failed to fetch bookmarks:', error);
            return [];
        }
    }
};

// Hook wrapper for React components
export function useArticleService() {
    return useMemo(() => articleService, []);
}
