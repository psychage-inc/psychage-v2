/**
 * Article Service
 *
 * Unified article service with cascading data sources:
 * 1. Supabase (primary - single source of truth)
 * 2. Mock data (fallback - development)
 */

import { Article, Category } from '../types/models';
import { supabase } from '../lib/supabaseClient';
import { useMemo } from 'react';
import { getCategoryTheme } from '../config/categoryThemes';

// Fallback to mock data if Supabase fails
import { allArticles as mockArticles } from '../data/articles/all-articles';

// ============================================================================
// Types
// ============================================================================

interface DBArticle {
    id: number | string;
    slug: string;
    title: string;
    description?: string;
    seo_description?: string;
    image?: string;
    hero_image_url?: string;
    category?: {
        id: string;
        name: string;
        slug: string;
        description: string;
        icon: string | null;
        color: string | null;
    } | null;
    read_time?: number;
    created_at: string;
    content?: string;
    content_format?: 'html' | 'markdown';
    tags?: string[];
    featured?: boolean;
    status?: string;
    // Media enrichment fields
    subtitle?: string;
    video_url?: string;
    video_platform?: string;
    video_status?: string;
    video_duration_seconds?: number;
    video_transcript?: string;
    audio_url?: string;
    audio_status?: string;
    audio_duration_seconds?: number;
}

export interface ArticleWithContent extends Article {
    /** Data source for debugging */
    _source?: 'supabase' | 'mock';
}

// ============================================================================
// Mappers
// ============================================================================

/**
 * Map Supabase article to unified Article format
 */
function mapSupabaseToArticle(data: DBArticle): ArticleWithContent {
    const catSlug = data.category?.slug || 'uncategorized';
    const theme = getCategoryTheme(catSlug);
    return {
        id: data.id,
        slug: data.slug,
        title: data.title,
        description: data.description || data.seo_description || '',
        image: data.image || data.hero_image_url || '',
        category: {
            id: data.category?.id || '',
            name: data.category?.name || 'Uncategorized',
            slug: catSlug,
            description: data.category?.description || '',
            color: theme.classes.bg,
            subTopics: []
        } as Category,
        readTime: data.read_time || 5,
        publishedAt: data.created_at,
        content: data.content || data.description,
        tags: data.tags || [],
        featured: data.featured || false,
        status: data.status,
        author: {
            id: 'team',
            name: 'PsychAge Team',
            role: 'Editor',
            image: ''
        },
        relatedArticles: [],
        citations: [],
        // Media enrichment
        subtitle: data.subtitle || undefined,
        videoUrl: data.video_url || undefined,
        videoPlatform: data.video_platform as ArticleWithContent['videoPlatform'],
        videoStatus: (data.video_status as ArticleWithContent['videoStatus']) || 'none',
        videoDurationSeconds: data.video_duration_seconds || undefined,
        videoTranscript: data.video_transcript || undefined,
        audioUrl: data.audio_url || undefined,
        audioStatus: (data.audio_status as ArticleWithContent['audioStatus']) || 'tts_only',
        audioDurationSeconds: data.audio_duration_seconds || undefined,
        _source: 'supabase'
    };
}

// ============================================================================
// Service
// ============================================================================

export const articleService = {
    /**
     * Fetch all articles
     * Priority: Supabase > Mock
     */
    getAll: async (params?: { category?: string; featured?: boolean }): Promise<ArticleWithContent[]> => {
        // Try Supabase first — OPTIMIZED: Only fetch fields needed for list view (97.9% smaller, 61% faster)
        try {
            // Exclude 'content' field for list views - it's massive (1600-1800 words per article)
            const listFields = 'id, slug, title, seo_description, hero_image_url, category_id, read_time, status, created_at, featured, tags';
            let selectString = `${listFields}, category:article_categories!category_id(id, name, slug, description)`;

            if (params?.category) {
                selectString = `${listFields}, category:article_categories!category_id!inner(id, name, slug, description)`;
            }

            let query = supabase.from('articles').select(selectString)
                .eq('status', 'published')
                .order('created_at', { ascending: false })
                .limit(200); // Reasonable limit for initial load

            if (params?.featured) {
                query = query.eq('featured', true);
            }
            if (params?.category) {
                query = query.eq('category.slug', params.category);
            }

            const { data, error } = await query;

            if (error) throw error;

            if (data && data.length > 0) {
                const sizeKB = (JSON.stringify(data).length / 1024).toFixed(1);
                console.log(`[ArticleService] Fetched ${data.length} articles from Supabase (${sizeKB}KB)`);
                return data.map(mapSupabaseToArticle);
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
                .select('*, category:article_categories!category_id(*)')
                .eq('id', id)
                .eq('status', 'published')
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
     * Priority: Supabase > Mock
     */
    getBySlug: async (slug: string): Promise<ArticleWithContent | undefined> => {
        // Check if mock data has rich JSX content for this slug
        const mockArticle = mockArticles.find(a => a.slug === slug);
        const hasRichMockContent = mockArticle && mockArticle.content && typeof mockArticle.content !== 'string';

        // If mock data has JSX content (charts, tables, accordions etc.), prefer it
        // because Supabase only stores string content which loses all interactive components
        if (hasRichMockContent) {
            console.log(`[ArticleService] Using rich JSX content for "${slug}" from mock data`);

            // Still try to get Supabase metadata (title, description, image, etc.)
            try {
                const { data, error } = await supabase
                    .from('articles')
                    .select('*, category:article_categories!category_id(*)')
                    .eq('slug', slug)
                    .eq('status', 'published')
                    .single();

                if (!error && data) {
                    // Merge: Supabase metadata + mock JSX content
                    const supabaseArticle = mapSupabaseToArticle(data);
                    return {
                        ...supabaseArticle,
                        content: mockArticle.content, // Use JSX content, not string
                        citations: mockArticle.citations || supabaseArticle.citations,
                        _source: 'mock',
                    };
                }
            } catch {
                // Supabase metadata fetch failed, use mock data entirely
            }

            return { ...mockArticle, _source: 'mock' };
        }

        // No rich mock content — try Supabase
        try {
            const { data, error } = await supabase
                .from('articles')
                .select('*, category:article_categories!category_id(*)')
                .eq('slug', slug)
                .eq('status', 'published')
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
            const result = await bookmarkService.isBookmarked(userId, 'article', String(articleId));
            return result.bookmarked;
        } catch (error) {
            console.error('Failed to check bookmark status:', error);
            return false;
        }
    },

    /**
     * Get related articles based on category and tags.
     * Priority: same category → shared tags → recent fallback.
     */
    getRelatedArticles: async (
        currentId: string | number,
        categorySlug: string,
        tags?: string[],
        limit = 3
    ): Promise<ArticleWithContent[]> => {
        const currentIdStr = String(currentId);

        // Try Supabase: articles in the same category
        try {
            const { data, error } = await supabase
                .from('articles')
                .select('*, category:article_categories!category_id(*)')
                .eq('status', 'published')
                .neq('id', currentId)
                .order('created_at', { ascending: false })
                .limit(limit * 2); // fetch extra to filter/rank

            if (!error && data && data.length > 0) {
                const mapped = (data as unknown as DBArticle[]).map(mapSupabaseToArticle);

                // Score: same category = 10, shared tag = 2 each
                const scored = mapped.map(a => {
                    let score = 0;
                    if (a.category.slug === categorySlug) score += 10;
                    if (tags && tags.length > 0 && a.tags) {
                        const shared = a.tags.filter(t => tags.includes(t)).length;
                        score += shared * 2;
                    }
                    return { article: a, score };
                });

                scored.sort((a, b) => b.score - a.score);
                const result = scored.slice(0, limit).map(s => s.article);
                if (result.length > 0) return result;
            }
        } catch (error) {
            console.warn('[ArticleService] Related articles query failed:', error);
        }

        // Fallback to mock data
        const allMock = mockArticles.map(a => ({ ...a, _source: 'mock' as const }));
        const sameCat = allMock.filter(a => a.category.slug === categorySlug && a.id.toString() !== currentIdStr);
        if (sameCat.length >= limit) return sameCat.slice(0, limit);

        // Pad with other articles
        const others = allMock.filter(a => a.id.toString() !== currentIdStr && a.category.slug !== categorySlug);
        return [...sameCat, ...others].slice(0, limit);
    }
};

// Hook wrapper for React components
export function useArticleService() {
    return useMemo(() => articleService, []);
}
