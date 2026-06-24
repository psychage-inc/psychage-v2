/**
 * Article Service
 *
 * Unified article service with cascading data sources:
 * 1. Supabase (primary - single source of truth)
 * 2. Mock data (fallback - development)
 */

import { Article, Category, Citation } from '../types/models';
import { supabase } from '../lib/supabaseClient';
import { useMemo } from 'react';
import { getCategoryTheme } from '../config/categoryThemes';

// Lazy-loaded mock articles — only fetched when Supabase fails or JSX content is needed.
// This avoids pulling ~30MB of article TSX into the main bundle at load time.
let _cachedMockArticles: Article[] | null = null;

function isShownStatus(a: Article): boolean {
    const s = (a as { status?: string }).status;
    return !s || s === 'published';
}

async function getMockArticles(): Promise<Article[]> {
    if (_cachedMockArticles) return _cachedMockArticles;
    const { loadAllArticles } = await import('../data/articles/all-articles');
    const articles = await loadAllArticles();
    // Dedupe by slug, preferring a shown (published/un-statused) version. An
    // archived article only survives when no shown version of that slug exists,
    // so unique archived content still appears while archived duplicates and
    // repeated slugs stay collapsed to a single entry.
    const bySlug = new Map<string, Article>();
    for (const a of articles) {
        if (!a.slug) continue;
        const existing = bySlug.get(a.slug);
        if (!existing) {
            bySlug.set(a.slug, a);
        } else if (isShownStatus(a) && !isShownStatus(existing)) {
            bySlug.set(a.slug, a);
        }
    }
    _cachedMockArticles = [...bySlug.values()];
    return _cachedMockArticles;
}

// ============================================================================
// Image URL Resolver
// ============================================================================

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const STORAGE_BUCKET = 'article-images';

/**
 * Transform local placeholder image paths to Supabase Storage public URLs.
 *
 * Input:  /images/articles/cat01/cover-001.svg
 * Output: https://<supabase>.co/storage/v1/object/public/article-images/covers/CAT01-001.jpeg
 */
function resolveImageUrl(image: string | undefined): string {
    if (!image) return '';
    // Already a full URL (Supabase or external) — pass through
    if (image.startsWith('http')) return image;
    // Match the placeholder pattern: /images/articles/catXX/cover-XXX.svg
    const match = image.match(/\/images\/articles\/cat(\d+)\/cover-(\d+)\.\w+$/);
    if (match && SUPABASE_URL) {
        const catNum = match[1].padStart(2, '0');
        const artNum = match[2].padStart(3, '0');
        return `${SUPABASE_URL}/storage/v1/object/public/${STORAGE_BUCKET}/covers/CAT${catNum}-${artNum}.jpeg`;
    }
    // Not a placeholder path — return as-is
    return image;
}

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
    // Embedded structured citations (article_citations table, when the query requests them)
    article_citations?: DBCitation[];
}

interface DBCitation {
    id: string;
    source_type?: string | null;
    tier?: number | null;
    title?: string | null;
    authors?: string[] | null;
    year?: number | null;
    url?: string | null;
    doi?: string | null;
    journal_name?: string | null;
    publisher?: string | null;
    sort_order?: number | null;
}

export interface ArticleWithContent extends Article {
    /** Data source for debugging */
    _source?: 'supabase' | 'mock';
}

// ============================================================================
// Mappers
// ============================================================================

function prettySourceType(t?: string | null): string {
    if (!t) return 'Source';
    return t
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Map an article_citations row to the Citation shape ReferenceList renders.
 * Note: ReferenceList builds the link as `https://doi.org/${citation.doi}`, so `doi` must be
 * a BARE doi (10.xxx/…), never a full URL — otherwise the prefix doubles. We extract the bare
 * doi from either column and fall back to `link` when there isn't one.
 */
function mapCitation(c: DBCitation): Citation {
    const raw = String(c.doi || c.url || '');
    const bareDoi = raw.match(/10\.\d{4,}\/[^\s"'<>]+/)?.[0];
    return {
        id: String(c.id),
        title: c.title || '',
        source: c.journal_name || c.publisher || prettySourceType(c.source_type),
        year: c.year != null ? String(c.year) : undefined,
        authors: Array.isArray(c.authors) ? c.authors : [],
        journalName: c.journal_name || undefined,
        tier: (c.tier ?? undefined) as Citation['tier'],
        sourceType: (c.source_type ?? undefined) as Citation['sourceType'],
        doi: bareDoi,
        link: bareDoi ? undefined : c.url || c.doi || undefined,
    };
}

function mapCitations(rows?: DBCitation[]): Citation[] {
    if (!rows || rows.length === 0) return [];
    return [...rows]
        .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
        .map(mapCitation);
}

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
        description: data.seo_description || data.description || '',
        image: resolveImageUrl(data.image || data.hero_image_url),
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
        content: data.content || data.seo_description || data.description,
        tags: data.tags || [],
        featured: data.featured || false,
        status: data.status,
        author: {
            id: 'team',
            name: 'Psychage Team',
            role: 'Editor',
            image: ''
        },
        relatedArticles: [],
        citations: mapCitations(data.article_citations),
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
        let supabaseArticles: ArticleWithContent[] = [];

        // Supabase list-view projection (only the fields the card needs).
        const listFields = 'id, slug, title, seo_description, hero_image_url, category_id, read_time, status, created_at, featured, tags';
        const selectString = params?.category
            ? `${listFields}, category:article_categories!category_id!inner(id, name, slug, description)`
            : `${listFields}, category:article_categories!category_id(id, name, slug, description)`;

        // One paginated pass over published rows (Supabase caps a response at 1000).
        const fetchPublished = async (): Promise<DBArticle[]> => {
            const PAGE_SIZE = 1000;
            const MAX_PAGES = 6; // safety ceiling
            const rows: DBArticle[] = [];
            for (let page = 0; page < MAX_PAGES; page++) {
                let query = supabase.from('articles').select(selectString)
                    .eq('status', 'published')
                    .not('content', 'is', null)
                    .neq('content', '')
                    .order('created_at', { ascending: false })
                    .order('id', { ascending: true }) // stable tiebreaker across pages
                    .range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE - 1);
                if (params?.featured) query = query.eq('featured', true);
                if (params?.category) query = query.eq('category.slug', params.category);

                const { data, error } = await query;
                if (error) throw error;
                if (!data || data.length === 0) break;
                rows.push(...(data as unknown as DBArticle[]));
                if (data.length < PAGE_SIZE) break;
            }
            return rows;
        };

        // Supabase is the source of truth. Retry transient failures BEFORE ever
        // falling back to mock — a single flaky response must not blank a category
        // or surface the stale, cover-less legacy mock corpus.
        for (let attempt = 0; attempt < 3; attempt++) {
            try {
                const rows = await fetchPublished();
                if (rows.length > 0) supabaseArticles = rows.map(mapSupabaseToArticle);
                break;
            } catch {
                if (attempt < 2) await new Promise((r) => setTimeout(r, 300 * (attempt + 1)));
            }
        }

        // When Supabase has data it is authoritative — return it ALONE. The mock
        // corpus is only an offline / empty-DB fallback; merging it would pad real
        // categories with superseded, image-less cards.
        if (supabaseArticles.length > 0) {
            return supabaseArticles;
        }

        // Supabase returned nothing — fall back to the mock corpus.
        const publishedMock = await getMockArticles();
        let mockResult = publishedMock.map(a => ({
            ...a,
            image: resolveImageUrl(a.image),
            _source: 'mock' as const,
        }));
        if (params?.category) mockResult = mockResult.filter(a => a.category.slug === params.category);
        if (params?.featured) mockResult = mockResult.filter(a => a.featured);
        return mockResult;
    },

    /**
     * Metadata-only projection for client-side search indexing.
     * Drops the JSX `content` and `citations` payload so the cache stays small
     * even when the article corpus grows past a few thousand entries.
     */
    getAllIndexable: async (params?: { category?: string; featured?: boolean }): Promise<ArticleWithContent[]> => {
        const all = await articleService.getAll(params);
        return all.map(a => ({
            ...a,
            content: null,
            citations: [],
            relatedArticles: [],
        }));
    },

    /**
     * Paginated published-article listing for infinite-scroll views (mobile
     * Browse → "All articles"). Same projection, filters, and stable sort as
     * `getAll`, but returns one page at a time so callers never pull the whole
     * corpus. Supabase is authoritative; the mock corpus is only the offline /
     * empty-DB fallback.
     */
    getPage: async (
        params?: { category?: string; featured?: boolean; page?: number; limit?: number },
    ): Promise<{ articles: ArticleWithContent[]; page: number; hasMore: boolean }> => {
        const page = Math.max(0, params?.page ?? 0);
        const limit = Math.max(1, params?.limit ?? 20);

        // Same list-view projection / join as getAll.
        const listFields = 'id, slug, title, seo_description, hero_image_url, category_id, read_time, status, created_at, featured, tags';
        const selectString = params?.category
            ? `${listFields}, category:article_categories!category_id!inner(id, name, slug, description)`
            : `${listFields}, category:article_categories!category_id(id, name, slug, description)`;

        // Fetch limit+1 rows so `hasMore` is known without a separate count query.
        // `.range` is inclusive, so [start, start+limit] asks for limit+1 rows.
        const fetchPage = async (): Promise<DBArticle[]> => {
            let query = supabase.from('articles').select(selectString)
                .eq('status', 'published')
                .not('content', 'is', null)
                .neq('content', '')
                .order('created_at', { ascending: false })
                .order('id', { ascending: true }) // stable tiebreaker across pages
                .range(page * limit, page * limit + limit);
            if (params?.featured) query = query.eq('featured', true);
            if (params?.category) query = query.eq('category.slug', params.category);
            const { data, error } = await query;
            if (error) throw error;
            return (data ?? []) as unknown as DBArticle[];
        };

        // Supabase first, retrying transient failures before any mock fallback.
        // `rows === null` means unreachable after retries (offline path).
        let rows: DBArticle[] | null = null;
        for (let attempt = 0; attempt < 3; attempt++) {
            try {
                rows = await fetchPage();
                break;
            } catch {
                if (attempt < 2) await new Promise((r) => setTimeout(r, 300 * (attempt + 1)));
            }
        }

        if (rows !== null && rows.length > 0) {
            const hasMore = rows.length > limit;
            return { articles: rows.slice(0, limit).map(mapSupabaseToArticle), page, hasMore };
        }
        // Reachable Supabase returned an empty page past the corpus end (page > 0):
        // stop here rather than injecting mock cards after real ones.
        if (rows !== null && page > 0) {
            return { articles: [], page, hasMore: false };
        }

        // page 0 empty, or Supabase unreachable on any page → slice the mock corpus.
        const publishedMock = await getMockArticles();
        let mockAll = publishedMock.map(a => ({
            ...a,
            image: resolveImageUrl(a.image),
            _source: 'mock' as const,
        }));
        if (params?.category) mockAll = mockAll.filter(a => a.category.slug === params.category);
        if (params?.featured) mockAll = mockAll.filter(a => a.featured);
        const start = page * limit;
        return { articles: mockAll.slice(start, start + limit), page, hasMore: start + limit < mockAll.length };
    },

    /**
     * Fetch article by ID
     */
    getById: async (id: number | string): Promise<ArticleWithContent | undefined> => {
        // Supabase for ID lookups (Sanity uses slugs)
        try {
            const { data, error } = await supabase
                .from('articles')
                .select('*, category:article_categories!category_id(*), article_citations(*)')
                .eq('id', id)
                .eq('status', 'published')
                .single();

            if (error) {
                if (error.code === 'PGRST116') return undefined;
                throw error;
            }
            return mapSupabaseToArticle(data);
        } catch (error) {
            const publishedMock = await getMockArticles();
            const mockArticle = publishedMock.find(a => a.id.toString() === id.toString());
            return mockArticle ? { ...mockArticle, image: resolveImageUrl(mockArticle.image), _source: 'mock' } : undefined;
        }
    },

    /**
     * Fetch article by slug
     * Priority: Supabase > Mock
     */
    getBySlug: async (slug: string): Promise<ArticleWithContent | undefined> => {
        // Check if mock data has rich JSX content for this slug
        const publishedMock = await getMockArticles();
        const mockArticle = publishedMock.find(a => a.slug === slug);
        const hasRichMockContent = mockArticle && mockArticle.content && typeof mockArticle.content !== 'string';

        // If mock data has JSX content (charts, tables, accordions etc.), prefer it
        // because Supabase only stores string content which loses all interactive components
        if (hasRichMockContent) {
            // Still try to get Supabase metadata (title, description, image, etc.)
            try {
                const { data, error } = await supabase
                    .from('articles')
                    .select('*, category:article_categories!category_id(*), article_citations(*)')
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

            return { ...mockArticle, image: resolveImageUrl(mockArticle.image), _source: 'mock' };
        }

        // No rich mock content — try Supabase
        try {
            const { data, error } = await supabase
                .from('articles')
                .select('*, category:article_categories!category_id(*), article_citations(*)')
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
                return mapSupabaseToArticle(data);
            }
        } catch (error) {
            // Supabase getBySlug failed — fall through to mock
        }

        // Final fallback to mock data
        if (mockArticle) {
            return { ...mockArticle, image: resolveImageUrl(mockArticle.image), _source: 'mock' };
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
     * Fetch published articles linked to a clinical condition via the stored
     * `linked_condition_ids` array (condition UUID from conditions_reference).
     * Ordered cornerstone-first, then cluster order, then newest. Supabase-only —
     * the mapping uses real condition UUIDs, so there is no meaningful mock fallback.
     */
    getByConditionId: async (conditionId: string): Promise<ArticleWithContent[]> => {
        if (!conditionId) return [];
        const listFields = 'id, slug, title, seo_description, hero_image_url, category_id, read_time, status, created_at, featured, tags';
        const selectString = `${listFields}, category:article_categories!category_id(id, name, slug, description)`;
        try {
            const { data, error } = await supabase
                .from('articles')
                .select(selectString)
                .eq('status', 'published')
                .not('content', 'is', null)
                .neq('content', '')
                .contains('linked_condition_ids', [conditionId])
                .order('is_cornerstone', { ascending: false })
                .order('cluster_order', { ascending: true })
                .order('created_at', { ascending: false });
            if (error) throw error;
            return ((data ?? []) as unknown as DBArticle[]).map(mapSupabaseToArticle);
        } catch (error) {
            console.error('Failed to fetch articles by condition:', error);
            return [];
        }
    },

    /**
     * Toggle bookmark for an article
     */
    toggleBookmark: async (articleId: string | number, userId: string): Promise<{ bookmarked: boolean }> => {
        if (!userId) {
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

        // Try Supabase: prioritize same-category articles, then backfill
        try {
            // Step 1: Fetch same-category articles (most relevant)
            const { data: sameCatData } = await supabase
                .from('articles')
                .select('*, category:article_categories!category_id!inner(*)')
                .eq('status', 'published')
                .neq('id', currentId)
                .eq('category.slug', categorySlug)
                .order('created_at', { ascending: false })
                .limit(limit * 2);

            let results: ArticleWithContent[] = [];

            if (sameCatData && sameCatData.length > 0) {
                const mapped = (sameCatData as unknown as DBArticle[]).map(mapSupabaseToArticle);

                // Rank same-category articles by shared tags
                const scored = mapped.map(a => {
                    let score = 0;
                    if (tags && tags.length > 0 && a.tags) {
                        const shared = a.tags.filter(t => tags.includes(t)).length;
                        score += shared * 2;
                    }
                    return { article: a, score };
                });
                scored.sort((a, b) => b.score - a.score);
                results = scored.slice(0, limit).map(s => s.article);
            }

            // Step 2: If not enough same-category articles, backfill from other categories
            if (results.length < limit) {
                const excludeIds = [currentId, ...results.map(r => r.id)];
                const { data: otherData } = await supabase
                    .from('articles')
                    .select('*, category:article_categories!category_id(*)')
                    .eq('status', 'published')
                    .not('id', 'in', `(${excludeIds.join(',')})`)
                    .order('created_at', { ascending: false })
                    .limit(limit - results.length);

                if (otherData && otherData.length > 0) {
                    const backfill = (otherData as unknown as DBArticle[]).map(mapSupabaseToArticle);
                    results = [...results, ...backfill];
                }
            }

            if (results.length > 0) return results;
        } catch (error) {
            // Related articles query failed — fall through to mock
        }

        // Fallback to mock data
        const publishedMock = await getMockArticles();
        const allMock = publishedMock.map(a => ({ ...a, image: resolveImageUrl(a.image), _source: 'mock' as const }));
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
