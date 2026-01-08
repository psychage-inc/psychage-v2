import { Article, Category } from '../types/models';
import { supabase } from '../lib/supabaseClient';
import { useMemo } from 'react';

// Fallback to mock data if API fails
import { articles as mockArticles } from '../data/articles';

export const articleService = {
    getAll: async (params?: { category?: string; featured?: boolean }): Promise<Article[]> => {
        try {
            let selectString = '*, category:categories(*)';
            // If filtering by category, use inner join to ensure we filter connected results
            if (params?.category) {
                selectString = '*, category:categories!inner(*)';
            }

            let query = supabase.from('articles').select(selectString);

            if (params?.featured) {
                query = query.eq('featured', true);
            }
            if (params?.category) {
                query = query.eq('category.slug', params.category);
            }

            const { data, error } = await query;

            if (error) throw error;
            return (data || []).map(mapToArticle);
        } catch (error) {
            console.error('Failed to fetch articles from Supabase, using mock data:', error);
            // Fallback filtering logic
            let result = mockArticles;
            if (params?.category) {
                result = result.filter(a => a.category.slug === params.category);
            }
            if (params?.featured) {
                result = result.filter(a => a.featured);
            }
            return result;
        }
    },

    getById: async (id: number | string): Promise<Article | undefined> => {
        try {
            const { data, error } = await supabase
                .from('articles')
                .select(`
                    *,
                    category:categories(*)
                `)
                .eq('id', id)
                .single();

            if (error) {
                if (error.code === 'PGRST116') return undefined;
                throw error;
            }
            return mapToArticle(data);
        } catch (error) {
            console.error('Failed to fetch article from Supabase, using mock data:', error);
            return mockArticles.find(a => a.id.toString() === id.toString());
        }
    },

    getBySlug: async (slug: string): Promise<Article | undefined> => {
        try {
            const { data, error } = await supabase
                .from('articles')
                .select(`
                    *,
                    category:categories(*)
                `)
                .eq('slug', slug)
                .single();

            if (error) {
                if (error.code === 'PGRST116') return undefined;
                throw error;
            }
            return mapToArticle(data);
        } catch (error) {
            console.error('Failed to fetch article from Supabase, using mock data:', error);
            return mockArticles.find(a => a.slug === slug);
        }
    },

    getFeatured: async (): Promise<Article[]> => {
        return articleService.getAll({ featured: true });
    },

    getByCategory: async (categorySlug: string): Promise<Article[]> => {
        return articleService.getAll({ category: categorySlug });
    },

    toggleBookmark: async (articleId: string | number): Promise<{ bookmarked: boolean }> => {
        // Placeholder
        console.log('Bookmarking', articleId);
        return { bookmarked: true };
    },

    getBookmarks: async (): Promise<Article[]> => {
        // Placeholder
        return [];
    }
};

function mapToArticle(data: any): Article {
    return {
        id: data.id,
        slug: data.slug,
        title: data.title,
        description: data.description,
        image: data.image,
        category: {
            id: data.category?.id,
            name: data.category?.name,
            slug: data.category?.slug,
            description: data.category?.description,
            group: data.category?.group,
            image: data.category?.image,
            color: data.category?.color,
            subTopics: []
        } as Category,
        readTime: data.read_time || 5,
        publishedAt: data.created_at,
        content: data.content || data.description, // Fallback
        tags: data.tags || [],
        featured: data.featured,
        author: {
            id: 'team',
            name: 'PsychAge Team',
            role: 'Editor',
            image: ''
        },
        relatedArticles: [],
        citations: []
    };
}

// Hook wrapper for React components
export function useArticleService() {
    return useMemo(() => articleService, []);
}
