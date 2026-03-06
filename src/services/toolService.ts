import { Tool } from '../types/models';
import api from '../lib/api';
import { withFallback } from '../lib/withFallback';
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
    getAll: async (): Promise<Tool[]> =>
        withFallback(
            async () => {
                const response = await api.tools.getAll();
                if (!response.success || !response.data) return mockTools as unknown as Tool[];
                return (response.data as ToolRow[]).map(mapToTool);
            },
            mockTools as unknown as Tool[],
            'toolService.getAll'
        ),

    getById: async (id: number): Promise<Tool | undefined> =>
        withFallback(
            async () => {
                const response = await api.tools.getById(id);
                if (!response.success || !response.data) return (mockTools as unknown as Tool[]).find(t => t.id === id);
                return mapToTool(response.data as ToolRow);
            },
            () => (mockTools as unknown as Tool[]).find(t => t.id === id),
            'toolService.getById'
        ),

    getByCategory: async (category: string): Promise<Tool[]> =>
        withFallback(
            async () => {
                const response = await api.tools.getByCategory(category);
                if (!response.success || !response.data) return (mockTools as unknown as Tool[]).filter(t => t.category.toLowerCase() === category.toLowerCase());
                return (response.data as ToolRow[]).map(mapToTool);
            },
            () => (mockTools as unknown as Tool[]).filter(t => t.category.toLowerCase() === category.toLowerCase()),
            'toolService.getByCategory'
        ),
};

// Hook wrapper for React components
export function useToolService() {
    return useMemo(() => toolService, []);
}
