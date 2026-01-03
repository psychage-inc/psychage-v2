import { Tool } from '../types/models';
import { api } from '../lib/api';
import { useMemo } from 'react';

// Fallback to mock data if API fails
import { tools as mockTools } from '../data/tools';

const USE_API = import.meta.env.VITE_API_URL ? true : false;

export const toolService = {
    getAll: async (): Promise<Tool[]> => {
        if (!USE_API) {
            await new Promise(resolve => setTimeout(resolve, 500));
            return mockTools as unknown as Tool[];
        }

        try {
            const response = await api.get<Tool[]>('/api/tools');
            return response.data || [];
        } catch (error) {
            console.error('Failed to fetch tools from API, using mock data:', error);
            return mockTools as unknown as Tool[];
        }
    },

    getById: async (id: number): Promise<Tool | undefined> => {
        if (!USE_API) {
            await new Promise(resolve => setTimeout(resolve, 400));
            return (mockTools as unknown as Tool[]).find(t => t.id === id);
        }

        try {
            const response = await api.get<Tool>(`/api/tools/${id}`);
            return response.data;
        } catch (error) {
            console.error('Failed to fetch tool from API, using mock data:', error);
            return (mockTools as unknown as Tool[]).find(t => t.id === id);
        }
    },

    getByCategory: async (category: string): Promise<Tool[]> => {
        if (!USE_API) {
            await new Promise(resolve => setTimeout(resolve, 400));
            return (mockTools as unknown as Tool[]).filter(t => t.category === category);
        }

        try {
            const response = await api.get<Tool[]>(`/api/tools?category=${category}`);
            return response.data || [];
        } catch (error) {
            console.error('Failed to fetch tools by category from API, using mock data:', error);
            return (mockTools as unknown as Tool[]).filter(t => t.category === category);
        }
    }
};

// Hook wrapper for React components
export function useToolService() {
    return useMemo(() => toolService, []);
}
