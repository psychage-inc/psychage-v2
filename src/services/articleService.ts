/**
 * Article Service
 *
 * Unified article service with cascading data sources:
 * 1. Sanity CMS (primary - rich content)
 * 2. Supabase (fallback - basic content)
 * 3. Mock data (last resort - development)
 */

import { Article, Category } from '../types/models';
import { supabase } from '../lib/supabaseClient';
import { useMemo } from 'react';
import { sanityArticleService, SanityArticle } from './sanityArticleService';
import type { PortableTextBlock } from '@portabletext/types';

// Fallback to mock data if all APIs fail
import { articles as mockArticles } from '../data/articles';

// ============================================================================
// Types
// ============================================================================

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

// Extended Article type that can hold Portable Text content
export interface ArticleWithContent extends Article {
    /** Raw Portable Text content from Sanity (for rendering with PortableText component) */
    portableTextContent?: PortableTextBlock[];
    /** Data source for debugging */
    _source?: 'sanity' | 'supabase' | 'mock';
}

// ============================================================================
// Mappers
// ============================================================================

/**
 * Map Sanity article to unified Article format
 */
function mapSanityToArticle(data: SanityArticle): ArticleWithContent {
    return {
        id: data._id,
        slug: data.slug.current,
        title: data.title,
        description: data.summary,
        image: data.ogImage
            ? sanityArticleService.getImageUrl(data.ogImage, 800, 600) || ''
            : '',
        category: data.category ? {
            id: data.category._id,
            name: data.category.name,
            slug: data.category.slug.current,
            description: data.category.description || '',
            group: undefined, // Sanity doesn't have group
            image: data.category.icon
                ? sanityArticleService.getImageUrl(data.category.icon) || ''
                : '',
            color: '',
            subTopics: []
        } : {
            id: '',
            name: 'Uncategorized',
            slug: 'uncategorized',
            description: '',
            group: undefined,
            image: '',
            color: '',
            subTopics: []
        },
        readTime: sanityArticleService.calculateReadTime(data.body),
        publishedAt: data.publishedAt,
        content: '', // Use portableTextContent instead for Sanity articles
        portableTextContent: data.body, // Raw Portable Text for rendering
        tags: [],
        featured: data.featured || false,
        author: data.author ? {
            id: data.author._id,
            name: data.author.name,
            role: data.author.credentials || 'Clinician',
            image: data.author.image
                ? sanityArticleService.getImageUrl(data.author.image, 100, 100) || ''
                : ''
        } : {
            id: 'team',
            name: 'PsychAge Team',
            role: 'Editor',
            image: ''
        },
        reviewedBy: data.reviewer ? {
            id: data.reviewer._id,
            name: data.reviewer.name,
            role: data.reviewer.credentials || 'Reviewer',
            image: data.reviewer.image
                ? sanityArticleService.getImageUrl(data.reviewer.image, 100, 100) || ''
                : ''
        } : undefined,
        relatedArticles: [],
        citations: (data.references || []).map((ref, index) => ({
            id: ref._id,
            text: ref.title,
            source: ref.sourceType,
            year: ref.publicationDate?.substring(0, 4) || '',
            link: ref.url,
            index: index + 1
        })),
        _source: 'sanity'
    };
}

/**
 * Map Supabase article to unified Article format
 */
function mapSupabaseToArticle(data: DBArticle): ArticleWithContent {
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
        content: data.content || data.description,
        tags: data.tags || [],
        featured: data.featured || false,
        author: {
            id: 'team',
            name: 'PsychAge Team',
            role: 'Editor',
            image: ''
        },
        relatedArticles: [],
        citations: [],
        _source: 'supabase'
    };
}

// ============================================================================
// Service
// ============================================================================

export const articleService = {
    /**
     * Fetch all articles
     * Priority: Sanity > Supabase > Mock
     */
    getAll: async (params?: { category?: string; featured?: boolean }): Promise<ArticleWithContent[]> => {
        // Try Sanity first
        if (sanityArticleService.isAvailable()) {
            try {
                let articles: SanityArticle[];

                if (params?.category) {
                    articles = await sanityArticleService.getByCategory(params.category);
                } else if (params?.featured) {
                    articles = await sanityArticleService.getFeatured();
                } else {
                    articles = await sanityArticleService.getAll();
                }

                if (articles && articles.length > 0) {
                    console.log(`[ArticleService] Fetched ${articles.length} articles from Sanity`);
                    let result = articles.map(mapSanityToArticle);

                    // Apply additional filtering if needed
                    if (params?.featured && !params.category) {
                        result = result.filter(a => a.featured);
                    }

                    return result;
                }
            } catch (error) {
                console.warn('[ArticleService] Sanity fetch failed, trying Supabase:', error);
            }
        }

        // Fallback to Supabase
        try {
            let selectString = '*, category:categories(*)';
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

            if (data && data.length > 0) {
                console.log(`[ArticleService] Fetched ${data.length} articles from Supabase`);
                return (data as unknown as DBArticle[]).map(mapSupabaseToArticle);
            }
        } catch (error) {
            console.warn('[ArticleService] Supabase fetch failed, using mock data:', error);
        }

        // Final fallback to mock data
        console.log('[ArticleService] Using mock data');
        let result = mockArticles.map(a => ({ ...a, _source: 'mock' as const }));
        if (params?.category) {
            result = result.filter(a => a.category.slug === params.category);
        }
        if (params?.featured) {
            result = result.filter(a => a.featured);
        }
        return result;
    },

    /**
     * Fetch article by ID
     */
    getById: async (id: number | string): Promise<ArticleWithContent | undefined> => {
        // Supabase for ID lookups (Sanity uses slugs)
        try {
            const { data, error } = await supabase
                .from('articles')
                .select('*, category:categories(*)')
                .eq('id', id)
                .single();

            if (error) {
                if (error.code === 'PGRST116') return undefined;
                throw error;
            }
            return mapSupabaseToArticle(data);
        } catch (error) {
            console.warn('[ArticleService] Supabase getById failed, using mock data:', error);
            const mockArticle = mockArticles.find(a => a.id.toString() === id.toString());
            return mockArticle ? { ...mockArticle, _source: 'mock' } : undefined;
        }
    },

    /**
     * Fetch article by slug
     * Priority: Sanity > Supabase > Mock
     */
    getBySlug: async (slug: string): Promise<ArticleWithContent | undefined> => {
        // Try Sanity first
        if (sanityArticleService.isAvailable()) {
            try {
                const article = await sanityArticleService.getBySlug(slug);
                if (article) {
                    console.log(`[ArticleService] Fetched article "${slug}" from Sanity`);
                    return mapSanityToArticle(article);
                }
            } catch (error) {
                console.warn('[ArticleService] Sanity getBySlug failed:', error);
            }
        }

        // Fallback to Supabase
        try {
            const { data, error } = await supabase
                .from('articles')
                .select('*, category:categories(*)')
                .eq('slug', slug)
                .single();

            if (error) {
                if (error.code === 'PGRST116') {
                    // Not found in Supabase, try mock
                }
                else throw error;
            }
            if (data) {
                console.log(`[ArticleService] Fetched article "${slug}" from Supabase`);
                return mapSupabaseToArticle(data);
            }
        } catch (error) {
            console.warn('[ArticleService] Supabase getBySlug failed:', error);
        }

        // Final fallback to mock data
        const mockArticle = mockArticles.find(a => a.slug === slug);
        if (mockArticle) {
            console.log(`[ArticleService] Fetched article "${slug}" from mock data`);
            return { ...mockArticle, _source: 'mock' };
        }

        return undefined;
    },

    /**
     * Fetch featured articles
     */
    getFeatured: async (): Promise<ArticleWithContent[]> => {
        return articleService.getAll({ featured: true });
    },

    /**
     * Fetch articles by category
     */
    getByCategory: async (categorySlug: string): Promise<ArticleWithContent[]> => {
        return articleService.getAll({ category: categorySlug });
    },

    /**
     * Toggle bookmark for an article
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
     */
    getBookmarks: async (userId: string): Promise<ArticleWithContent[]> => {
        if (!userId) {
            console.warn('Cannot get bookmarks: No user ID provided');
            return [];
        }

        try {
            const { bookmarkService } = await import('./bookmarkService');
            const bookmarks = await bookmarkService.getByType(userId, 'article');
            const articleIds = bookmarks.map(b => b.resource_id);

            if (articleIds.length === 0) return [];

            const articles = await Promise.all(
                articleIds.map(id => articleService.getById(id))
            );

            return articles.filter((a): a is ArticleWithContent => a !== undefined);
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

// Hook wrapper for React components
export function useArticleService() {
    return useMemo(() => articleService, []);
}
