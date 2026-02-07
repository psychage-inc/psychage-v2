import { Tool } from '../types/models';
import api from '../lib/api';
import { useMemo } from 'react';

// Fallback to mock data if API fails
import { tools as mockTools } from '../data/tools';

interface ToolRow {
    id: number;
    name: string;
    description: string;
    icon_name: string;
    category: string;
    color: 'teal' | 'amber' | 'indigo' | 'sky' | 'rose' | 'red';
    features: string[];
}

function mapToTool(data: ToolRow): Tool {
    return {
        id: data.id,
        name: data.name,
        description: data.description,
        iconName: data.icon_name,
        category: data.category,
        color: data.color,
        features: data.features || []
    };
}

export const toolService = {
    getAll: async (): Promise<Tool[]> => {
        try {
            const response = await api.tools.getAll();
            if (!response.success || !response.data) {
                console.warn('API returned no data, using mock tools');
                return mockTools as unknown as Tool[];
            }
            return (response.data as ToolRow[]).map(mapToTool);
        } catch (error) {
            console.error('Failed to fetch tools from API, using mock data:', error);
            return mockTools as unknown as Tool[];
        }
    },

    getById: async (id: number): Promise<Tool | undefined> => {
        try {
            const response = await api.tools.getById(id);
            if (!response.success || !response.data) {
                return (mockTools as unknown as Tool[]).find(t => t.id === id);
            }
            return mapToTool(response.data as ToolRow);
        } catch (error) {
            console.error('Failed to fetch tool from API, using mock data:', error);
            return (mockTools as unknown as Tool[]).find(t => t.id === id);
        }
    },

    getByCategory: async (category: string): Promise<Tool[]> => {
        try {
            const response = await api.tools.getByCategory(category);
            if (!response.success || !response.data) {
                return (mockTools as unknown as Tool[]).filter(t => t.category.toLowerCase() === category.toLowerCase());
            }
            return (response.data as ToolRow[]).map(mapToTool);
        } catch (error) {
            console.error('Failed to fetch tools by category from API, using mock data:', error);
            return (mockTools as unknown as Tool[]).filter(t => t.category.toLowerCase() === category.toLowerCase());
        }
    }
};

// Hook wrapper for React components
export function useToolService() {
    return useMemo(() => toolService, []);
}
