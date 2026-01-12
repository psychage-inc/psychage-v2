import { Tool } from '../types/models';
import { supabase } from '../lib/supabaseClient';
import { useMemo } from 'react';

// Fallback to mock data if Supabase fails
import { tools as mockTools } from '../data/tools';

export const toolService = {
    getAll: async (): Promise<Tool[]> => {
        try {
            const { data, error } = await supabase
                .from('tools')
                .select('*')
                .order('id', { ascending: true });

            if (error) throw error;
            return (data || []).map(mapToTool);
        } catch (error) {
            console.error('Failed to fetch tools from Supabase, using mock data:', error);
            return mockTools as unknown as Tool[];
        }
    },

    getById: async (id: number): Promise<Tool | undefined> => {
        try {
            const { data, error } = await supabase
                .from('tools')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                if (error.code === 'PGRST116') return undefined; // Not found
                throw error;
            }
            return mapToTool(data);
        } catch (error) {
            console.error('Failed to fetch tool from Supabase, using mock data:', error);
            return (mockTools as unknown as Tool[]).find(t => t.id === id);
        }
    },

    getByCategory: async (category: string): Promise<Tool[]> => {
        try {
            const { data, error } = await supabase
                .from('tools')
                .select('*')
                .ilike('category', category);

            if (error) throw error;
            return (data || []).map(mapToTool);
        } catch (error) {
            console.error('Failed to fetch tools by category from Supabase, using mock data:', error);
            return (mockTools as unknown as Tool[]).filter(t => t.category.toLowerCase() === category.toLowerCase());
        }
    }
};

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

// Hook wrapper for React components
export function useToolService() {
    return useMemo(() => toolService, []);
}
