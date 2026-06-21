import React from 'react';
import { Category } from '../types/models';
import { supabase } from '../lib/supabaseClient';
import { queryWithFallback, queryOneWithFallback } from '../lib/withFallback';
import { useMemo } from 'react';
import { getCategoryTheme } from '../config/categoryThemes';
import { articleService } from './articleService';
import {
    CANONICAL_CATEGORIES,
    TOP_GROUPS,
    resolveCanonicalSlug,
    type CategoryGroup,
} from '../config/taxonomy';

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
    architecture_group?: string | null;
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
        subTopics: [],
        architectureGroup: data.architecture_group ?? undefined,
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

    /**
     * Categories grouped under the three top-level taxonomy groups, each with a
     * live article count. Categories that resolve to ZERO articles are dropped,
     * so a stale/empty category is hidden — never rendered as a broken
     * "0 articles". This is the data source for the grouped Learn index.
     *
     * Counts come from the shared article corpus (Supabase ∪ mock) so they are
     * correct whether or not Supabase is reachable, and legacy-tagged articles
     * are folded onto their canonical slug.
     */
    getGrouped: async (): Promise<CategoryGroup[]> => {
        const [cats, articles] = await Promise.all([
            categoryService.getAll(),
            articleService.getAllIndexable(),
        ]);

        const counts = new Map<string, number>();
        for (const a of articles) {
            const slug = resolveCanonicalSlug(a.category?.slug ?? '');
            counts.set(slug, (counts.get(slug) ?? 0) + 1);
        }

        // Index real category rows by their canonical slug for metadata reuse.
        const bySlug = new Map<string, Category>();
        for (const c of cats) bySlug.set(resolveCanonicalSlug(c.slug), c);

        return TOP_GROUPS.map((group) => ({
            id: group.id,
            title: group.title,
            description: group.description,
            categories: CANONICAL_CATEGORIES
                .filter((c) => c.group === group.id)
                .map((c) => {
                    const base = bySlug.get(c.slug) ?? mapToCategory({
                        id: c.slug,
                        name: c.name,
                        slug: c.slug,
                        description: '',
                        icon: null,
                        display_order: 0,
                        article_target: 0,
                        color: null,
                    });
                    // Contract wins for slug + name so display never drifts.
                    return { ...base, slug: c.slug, name: c.name, articleCount: counts.get(c.slug) ?? 0 };
                })
                .filter((c) => c.articleCount > 0),
        }));
    },
};

// Hook wrapper for React components
export function useCategoryService() {
    return useMemo(() => categoryService, []);
}
