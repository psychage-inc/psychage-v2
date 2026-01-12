import { Category } from '../types/models';
import { supabase } from '../lib/supabaseClient';
import { useMemo } from 'react';

// Fallback to mock data if API fails or for development
import { categories as mockCategories } from '../data/categories';

export const categoryService = {
    getAll: async (): Promise<Category[]> => {
        try {
            const { data, error } = await supabase
                .from('categories')
                .select('*');

            if (error) throw error;
            return (data as unknown as DBCategory[] || []).map(mapToCategory);
        } catch (error) {
            console.error('Failed to fetch categories from Supabase, using mock data:', error);
            return mockCategories;
        }
    },

    getBySlug: async (slug: string): Promise<Category | undefined> => {
        try {
            const { data, error } = await supabase
                .from('categories')
                .select('*')
                .eq('slug', slug)
                .single();

            if (error) {
                if (error.code === 'PGRST116') return undefined; // Not found
                throw error;
            }
            return mapToCategory(data as unknown as DBCategory);
        } catch (error) {
            console.error('Failed to fetch category from Supabase, using mock data:', error);
            return mockCategories.find(c => c.slug === slug);
        }
    },

    getByGroup: async (group: string): Promise<Category[]> => {
        try {
            const { data, error } = await supabase
                .from('categories')
                .select('*')
                .eq('group', group);

            if (error) throw error;
            return (data as unknown as DBCategory[] || []).map(mapToCategory);
        } catch (error) {
            console.error('Failed to fetch categories by group from Supabase, using mock data:', error);
            return mockCategories.filter(c => c.group === group);
        }
    }
};

interface DBCategory {
    id: string;
    name: string;
    slug: string;
    description: string;
    group: string;
    image: string;
    color: string;
}

function mapToCategory(data: DBCategory): Category {
    return {
        id: data.id,
        name: data.name,
        slug: data.slug,
        description: data.description,
        group: data.group as Category['group'], // optimize: validate against enum
        image: data.image,
        color: data.color,
        // Mocking fields not yet in DB
        icon: undefined, // Need a mapper for icon strings if added to DB
        subTopics: []
    };
}

// Hook wrapper for React components
export function useCategoryService() {
    return useMemo(() => categoryService, []);
}
