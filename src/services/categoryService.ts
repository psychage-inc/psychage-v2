import React from 'react';
import { Category } from '../types/models';
import { supabase } from '../lib/supabaseClient';
import { queryWithFallback, queryOneWithFallback } from '../lib/withFallback';
import { useMemo } from 'react';
import { getCategoryTheme } from '../config/categoryThemes';

// Fallback to mock data if API fails or for development
import { categories as mockCategories } from '../data/categories';

/**
 * DB row shape from `article_categories` table.
 */
interface DBCategory {
    id: string;
    name: string;
    slug: string;
    description: string;
    icon: string | null;
    display_order: number;
    article_target: number;
    color: string | null;
}

/**
 * DB row shape from `article_subcategories` table.
 */
interface DBSubcategory {
    id: string;
    name: string;
    slug: string;
}

function mapToCategory(data: DBCategory): Category {
    const theme = getCategoryTheme(data.slug);
    return {
        id: data.id,
        name: data.name,
        slug: data.slug,
        description: data.description || '',
        image: '',
        color: theme.classes.bg,
        icon: React.createElement(theme.icon, { size: 24 }),
        subTopics: []
    };
}

export const categoryService = {
    getAll: async (): Promise<Category[]> =>
        queryWithFallback(
            () => supabase
                .from('article_categories')
                .select('*')
                .order('display_order', { ascending: true }),
            (row: DBCategory) => mapToCategory(row),
            mockCategories,
            'categoryService.getAll'
        ),

    getBySlug: async (slug: string): Promise<Category | undefined> =>
        queryOneWithFallback(
            () => supabase
                .from('article_categories')
                .select('*')
                .eq('slug', slug)
                .single(),
            (row: DBCategory) => mapToCategory(row),
            () => mockCategories.find(c => c.slug === slug),
            'categoryService.getBySlug'
        ),

    getSubcategories: async (categoryId: string): Promise<{ id: string; name: string; slug: string }[]> =>
        queryWithFallback(
            () => supabase
                .from('article_subcategories')
                .select('id, name, slug')
                .eq('category_id', categoryId)
                .order('display_order', { ascending: true }),
            (row: DBSubcategory) => ({ id: row.id, name: row.name, slug: row.slug }),
            [],
            'categoryService.getSubcategories'
        ),
};

// Hook wrapper for React components
export function useCategoryService() {
    return useMemo(() => categoryService, []);
}
