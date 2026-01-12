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
            return (data as unknown as DBArticle[] || [])
                .map(mapToArticle);
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

    /**
     * Toggle bookmark for an article
     * Requires userId to be passed - caller should get this from auth context
     */
    toggleBookmark: async (articleId: string | number, userId: string): Promise<{ bookmarked: boolean }> => {
        if (!userId) {
            console.warn('Cannot toggle bookmark: No user ID provided');
            return { bookmarked: false };
        }

        try {
            const { bookmarkService } = await import('./bookmarkService');
            return await bookmarkService.toggle(userId, 'article', String(articleId));
        } catch (error) {
            console.error('Failed to toggle bookmark:', error);
            return { bookmarked: false };
        }
    },

    /**
     * Get all bookmarked articles for a user
     * Requires userId to be passed - caller should get this from auth context
     */
    getBookmarks: async (userId: string): Promise<Article[]> => {
        if (!userId) {
            console.warn('Cannot get bookmarks: No user ID provided');
            return [];
        }

        try {
            const { bookmarkService } = await import('./bookmarkService');
            const bookmarks = await bookmarkService.getByType(userId, 'article');
            const articleIds = bookmarks.map(b => b.resource_id);

            if (articleIds.length === 0) return [];

            // Fetch all bookmarked articles
            const articles = await Promise.all(
                articleIds.map(id => articleService.getById(id))
            );

            return articles.filter((a): a is Article => a !== undefined);
        } catch (error) {
            console.error('Failed to fetch bookmarked articles:', error);
            return [];
        }
    },

    /**
     * Check if an article is bookmarked by a user
     */
    isBookmarked: async (articleId: string | number, userId: string): Promise<boolean> => {
        if (!userId) return false;

        try {
            const { bookmarkService } = await import('./bookmarkService');
            return await bookmarkService.isBookmarked(userId, 'article', String(articleId));
        } catch (error) {
            console.error('Failed to check bookmark status:', error);
            return false;
        }
    }
};

interface DBArticle {
    id: number | string;
    slug: string;
    title: string;
    description: string;
    image: string;
    category?: {
        id: string;
        name: string;
        slug: string;
        description: string;
        group: string;
        image: string;
        color: string;
    } | null;
    read_time?: number;
    created_at: string;
    content?: string;
    tags?: string[];
    featured?: boolean;
}

function mapToArticle(data: DBArticle): Article {
    return {
        id: data.id,
        slug: data.slug,
        title: data.title,
        description: data.description,
        image: data.image,
        category: {
            id: data.category?.id || '',
            name: data.category?.name || 'Uncategorized',
            slug: data.category?.slug || 'uncategorized',
            description: data.category?.description || '',
            group: data.category?.group || '',
            image: data.category?.image || '',
            color: data.category?.color || '',
            subTopics: []
        } as Category,
        readTime: data.read_time || 5,
        publishedAt: data.created_at,
        content: data.content || data.description, // Fallback
        tags: data.tags || [],
        featured: data.featured || false,
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
