import { Category } from '../types/models';
import { supabase } from '../lib/supabaseClient';
import { queryWithFallback, queryOneWithFallback } from '../lib/withFallback';
import { useMemo } from 'react';

// Fallback to mock data if API fails or for development
import { categories as mockCategories } from '../data/categories';
import { iconMap, defaultIcon } from './categoryIconMapper';

export const categoryService = {
    getAll: async (): Promise<Category[]> =>
        queryWithFallback(
            () => supabase.from('categories').select('*'),
            (row: DBCategory) => mapToCategory(row),
            mockCategories,
            'categoryService.getAll'
        ),

    getBySlug: async (slug: string): Promise<Category | undefined> =>
        queryOneWithFallback(
            () => supabase.from('categories').select('*').eq('slug', slug).single(),
            (row: DBCategory) => mapToCategory(row),
            () => mockCategories.find(c => c.slug === slug),
            'categoryService.getBySlug'
        ),

    getByGroup: async (group: string): Promise<Category[]> =>
        queryWithFallback(
            () => supabase.from('categories').select('*').eq('group', group),
            (row: DBCategory) => mapToCategory(row),
            () => mockCategories.filter(c => c.group === group),
            'categoryService.getByGroup'
        ),
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
        // Map icon from slug or fallback to default Brain icon
        icon: iconMap[data.slug] || defaultIcon,
        subTopics: []
    };
}

// Hook wrapper for React components
export function useCategoryService() {
    return useMemo(() => categoryService, []);
}
