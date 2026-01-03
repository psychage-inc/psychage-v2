import { Category } from '../types/models';
import { api } from '../lib/api';
import { useMemo } from 'react';

// Fallback to mock data if API fails
import { categories as mockCategories } from '../data/categories';

const USE_API = import.meta.env.VITE_API_URL ? true : false;

export const categoryService = {
    getAll: async (): Promise<Category[]> => {
        if (!USE_API) {
            await new Promise(resolve => setTimeout(resolve, 400));
            return mockCategories;
        }

        try {
            const response = await api.get<Category[]>('/api/categories');
            return response.data || [];
        } catch (error) {
            console.error('Failed to fetch categories from API, using mock data:', error);
            return mockCategories;
        }
    },

    getBySlug: async (slug: string): Promise<Category | undefined> => {
        if (!USE_API) {
            await new Promise(resolve => setTimeout(resolve, 300));
            return mockCategories.find(c => c.slug === slug);
        }

        try {
            const response = await api.get<Category>(`/api/categories/${slug}`);
            return response.data;
        } catch (error) {
            console.error('Failed to fetch category from API, using mock data:', error);
            return mockCategories.find(c => c.slug === slug);
        }
    },

    getByGroup: async (group: string): Promise<Category[]> => {
        if (!USE_API) {
            await new Promise(resolve => setTimeout(resolve, 400));
            return mockCategories.filter(c => c.group === group);
        }

        try {
            const response = await api.get<Category[]>(`/api/categories?group=${group}`);
            return response.data || [];
        } catch (error) {
            console.error('Failed to fetch categories by group from API, using mock data:', error);
            return mockCategories.filter(c => c.group === group);
        }
    }
};

// Hook wrapper for React components
export function useCategoryService() {
    return useMemo(() => categoryService, []);
}
