/**
 * Search Service
 *
 * Client-side unified search across articles, tools, videos, categories, providers.
 * No backend dependency — uses existing service cascades (Supabase → mock) and
 * the provider RPC for live provider matching.
 */

import { useMemo, useCallback, useState } from 'react';
import { Article, Category, Tool, Video } from '../types/models';
import { articleService, ArticleWithContent } from './articleService';
import { toolService } from './toolService';
import { videoService } from './videoService';
import { categories as staticCategories } from '../data/categories';
import { searchProviders as searchProvidersRPC } from '@/lib/providers/queries';
import type { ProviderCardData } from '@/lib/providers/types';
import { api } from '../lib/api';

// ============================================================================
// Types
// ============================================================================

export interface SearchResult {
    articles: ArticleWithContent[];
    tools: Tool[];
    videos: Video[];
    categories: Category[];
    providers: ProviderCardData[];
    total: number;
}

export interface SearchFilters {
    type?: 'articles' | 'tools' | 'videos' | 'categories' | 'providers' | 'all';
    category?: string;
    dateRange?: 'week' | 'month' | 'year' | 'all';
    sortBy?: 'relevance' | 'date' | 'popularity';
    limit?: number;
}

export interface SearchSuggestion {
    text: string;
    type: 'recent' | 'popular' | 'suggestion';
}

// ============================================================================
// Tokeniser + scoring helpers
// ============================================================================

const STOPWORDS = new Set([
    'a', 'an', 'and', 'are', 'as', 'at', 'be', 'but', 'by', 'for', 'if', 'in',
    'into', 'is', 'it', 'no', 'not', 'of', 'on', 'or', 'such', 'that', 'the',
    'their', 'then', 'there', 'these', 'they', 'this', 'to', 'was', 'will',
    'with', 'about', 'i', 'me', 'my', 'you', 'your',
]);

function tokenize(query: string): string[] {
    return query
        .toLowerCase()
        .split(/[\s\-_,./]+/)
        .map(t => t.trim())
        .filter(t => t.length > 0 && !STOPWORDS.has(t));
}

/**
 * Count how many tokens hit a haystack string. Returns 0 if haystack falsy.
 * A token "matches" if it appears as a substring of any whitespace-separated
 * word in the haystack (case-insensitive). Short tokens (1 char) require a
 * word-start match to avoid noise.
 */
function tokenHits(haystack: string | undefined | null, tokens: string[]): number {
    if (!haystack) return 0;
    const lower = haystack.toLowerCase();
    let hits = 0;
    for (const t of tokens) {
        if (t.length === 1) {
            // Word-boundary for single-char tokens
            if (new RegExp(`\\b${t}`, 'i').test(lower)) hits++;
        } else if (lower.includes(t)) {
            hits++;
        }
    }
    return hits;
}

function fullPhraseHit(haystack: string | undefined | null, phrase: string): boolean {
    if (!haystack || !phrase) return false;
    return haystack.toLowerCase().includes(phrase.toLowerCase());
}

// ============================================================================
// Article search
// ============================================================================

interface ScoredArticle {
    article: ArticleWithContent;
    score: number;
}

function scoreArticle(article: ArticleWithContent, tokens: string[], phrase: string): number {
    let score = 0;
    score += tokenHits(article.title, tokens) * 10;
    score += tokenHits(article.subtitle, tokens) * 6;
    if (article.tags?.length) {
        score += tokenHits(article.tags.join(' '), tokens) * 5;
    }
    score += tokenHits(article.category?.name, tokens) * 4;
    score += tokenHits(article.category?.slug, tokens) * 3;
    score += tokenHits(article.description, tokens) * 2;
    score += tokenHits(article.summary, tokens) * 2;
    // Only score string content (skip JSX)
    if (typeof article.content === 'string') {
        score += tokenHits(article.content, tokens) * 1;
    }
    // Phrase bonus
    if (fullPhraseHit(article.title, phrase)) score += 20;
    return score;
}

async function searchArticlesLocal(query: string, limit?: number): Promise<ArticleWithContent[]> {
    const tokens = tokenize(query);
    if (tokens.length === 0) return [];
    const phrase = query.trim();

    const all = await articleService.getAll();
    const scored: ScoredArticle[] = [];
    for (const article of all) {
        const score = scoreArticle(article, tokens, phrase);
        if (score > 0) scored.push({ article, score });
    }
    scored.sort((a, b) => b.score - a.score);
    const ranked = scored.map(s => s.article);
    return limit ? ranked.slice(0, limit) : ranked;
}

// ============================================================================
// Tool / Video / Category search
// ============================================================================

function scoreTool(tool: Tool, tokens: string[], phrase: string): number {
    let score = 0;
    score += tokenHits(tool.name, tokens) * 10;
    score += tokenHits(tool.description, tokens) * 3;
    score += tokenHits(tool.category, tokens) * 4;
    if (tool.features?.length) {
        score += tokenHits(tool.features.join(' '), tokens) * 2;
    }
    if (fullPhraseHit(tool.name, phrase)) score += 15;
    return score;
}

async function searchToolsLocal(query: string, limit?: number): Promise<Tool[]> {
    const tokens = tokenize(query);
    if (tokens.length === 0) return [];
    const phrase = query.trim();
    const all = await toolService.getAll();
    const scored = all
        .map(tool => ({ tool, score: scoreTool(tool, tokens, phrase) }))
        .filter(s => s.score > 0)
        .sort((a, b) => b.score - a.score)
        .map(s => s.tool);
    return limit ? scored.slice(0, limit) : scored;
}

function scoreVideo(video: Video, tokens: string[], phrase: string): number {
    let score = 0;
    score += tokenHits(video.title, tokens) * 10;
    score += tokenHits(video.description, tokens) * 3;
    score += tokenHits(video.category, tokens) * 4;
    if (fullPhraseHit(video.title, phrase)) score += 15;
    return score;
}

async function searchVideosLocal(query: string, limit?: number): Promise<Video[]> {
    const tokens = tokenize(query);
    if (tokens.length === 0) return [];
    const phrase = query.trim();
    let all: Video[] = [];
    try {
        all = await videoService.getAll();
    } catch {
        return [];
    }
    const scored = all
        .map(video => ({ video, score: scoreVideo(video, tokens, phrase) }))
        .filter(s => s.score > 0)
        .sort((a, b) => b.score - a.score)
        .map(s => s.video);
    return limit ? scored.slice(0, limit) : scored;
}

function scoreCategory(cat: Category, tokens: string[], phrase: string): number {
    let score = 0;
    score += tokenHits(cat.name, tokens) * 10;
    score += tokenHits(cat.slug, tokens) * 8;
    score += tokenHits(cat.description, tokens) * 3;
    if (cat.subTopics?.length) {
        score += tokenHits(cat.subTopics.join(' '), tokens) * 2;
    }
    if (fullPhraseHit(cat.name, phrase)) score += 15;
    return score;
}

function searchCategoriesLocal(query: string, limit?: number): Category[] {
    const tokens = tokenize(query);
    if (tokens.length === 0) return [];
    const phrase = query.trim();
    const scored = staticCategories
        .map(cat => ({ cat, score: scoreCategory(cat, tokens, phrase) }))
        .filter(s => s.score > 0)
        .sort((a, b) => b.score - a.score)
        .map(s => s.cat);
    return limit ? scored.slice(0, limit) : scored;
}

// ============================================================================
// Provider search — hits Supabase RPC directly
// ============================================================================

async function searchProvidersLocal(query: string, limit = 8): Promise<ProviderCardData[]> {
    if (!query.trim()) return [];
    try {
        const result = await searchProvidersRPC({ query, sort_by: 'relevance' });
        return result.providers.slice(0, limit);
    } catch {
        return [];
    }
}

// ============================================================================
// Service
// ============================================================================

export const searchService = {
    /**
     * Unified search. Runs all enabled lookups in parallel.
     */
    search: async (query: string, filters?: SearchFilters): Promise<SearchResult> => {
        const empty: SearchResult = { articles: [], tools: [], videos: [], categories: [], providers: [], total: 0 };
        if (!query.trim()) return empty;

        const type = filters?.type ?? 'all';
        const wants = (t: SearchFilters['type']) => type === 'all' || type === t;

        const [articles, tools, videos, providers] = await Promise.all([
            wants('articles') ? searchArticlesLocal(query, filters?.limit) : Promise.resolve([] as ArticleWithContent[]),
            wants('tools') ? searchToolsLocal(query) : Promise.resolve([] as Tool[]),
            wants('videos') ? searchVideosLocal(query) : Promise.resolve([] as Video[]),
            wants('providers') ? searchProvidersLocal(query, 8) : Promise.resolve([] as ProviderCardData[]),
        ]);
        const categories = wants('categories') ? searchCategoriesLocal(query, 6) : [];

        return {
            articles,
            tools,
            videos,
            categories,
            providers,
            total: articles.length + tools.length + videos.length + categories.length + providers.length,
        };
    },

    /**
     * Search articles only.
     */
    searchArticles: async (query: string, limit?: number): Promise<ArticleWithContent[]> => {
        return searchArticlesLocal(query, limit);
    },

    /**
     * Search providers only.
     */
    searchProviders: async (query: string, limit = 20): Promise<ProviderCardData[]> => {
        return searchProvidersLocal(query, limit);
    },

    /**
     * Autocomplete suggestions: surface matching article titles, tool names, and category names.
     */
    getSuggestions: async (query: string, limit = 8): Promise<SearchSuggestion[]> => {
        if (!query.trim() || query.length < 2) return [];

        const [articles, tools] = await Promise.all([
            searchArticlesLocal(query, 5),
            searchToolsLocal(query, 3),
        ]);
        const cats = searchCategoriesLocal(query, 3);

        const out: SearchSuggestion[] = [];
        const seen = new Set<string>();
        const push = (text: string) => {
            const key = text.toLowerCase();
            if (seen.has(key)) return;
            seen.add(key);
            out.push({ text, type: 'suggestion' });
        };
        articles.forEach(a => push(a.title));
        tools.forEach(t => push(t.name));
        cats.forEach(c => push(c.name));
        return out.slice(0, limit);
    },

    /**
     * Save search to activity log (best-effort, server-side).
     */
    saveSearchHistory: async (query: string): Promise<void> => {
        if (!query.trim()) return;
        try {
            await api.activity.log('search', 'search', undefined, { query });
        } catch {
            // Silent — server logging is non-critical.
        }
    },

    /**
     * Get recent searches: prefer server activity log, fall back to localStorage.
     */
    getRecentSearches: async (limit = 5): Promise<string[]> => {
        try {
            const response = await api.activity.getByType('search', limit);
            if (response.success && response.data) {
                const queries = (response.data as Array<{ metadata?: { query?: string } }>)
                    .map(a => a.metadata?.query)
                    .filter((q): q is string => !!q);
                if (queries.length) return queries;
            }
        } catch {
            // Fall through to localStorage.
        }
        try {
            const stored = localStorage.getItem('psychage_recent_searches');
            if (stored) return JSON.parse(stored).slice(0, limit);
        } catch {
            // Ignore — corrupted storage.
        }
        return [];
    },

    saveLocalSearch: (query: string): void => {
        if (!query.trim()) return;
        try {
            const stored = localStorage.getItem('psychage_recent_searches');
            const searches: string[] = stored ? JSON.parse(stored) : [];
            const filtered = searches.filter(s => s !== query);
            filtered.unshift(query);
            localStorage.setItem('psychage_recent_searches', JSON.stringify(filtered.slice(0, 10)));
        } catch {
            // Storage unavailable.
        }
    },

    clearSearchHistory: async (): Promise<void> => {
        localStorage.removeItem('psychage_recent_searches');
    },
};

// ============================================================================
// Hooks
// ============================================================================

export function useSearch() {
    const [isSearching, setIsSearching] = useState(false);
    const [results, setResults] = useState<SearchResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const search = useCallback(async (query: string, filters?: SearchFilters) => {
        if (!query.trim()) {
            setResults(null);
            return;
        }
        setIsSearching(true);
        setError(null);
        try {
            const r = await searchService.search(query, filters);
            setResults(r);
            searchService.saveLocalSearch(query);
            searchService.saveSearchHistory(query);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Search failed');
            setResults(null);
        } finally {
            setIsSearching(false);
        }
    }, []);

    const clear = useCallback(() => {
        setResults(null);
        setError(null);
    }, []);

    return { search, clear, isSearching, results, error };
}

export function useSearchSuggestions() {
    const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchSuggestions = useCallback(async (query: string) => {
        if (!query || query.length < 2) {
            setSuggestions([]);
            return;
        }
        setIsLoading(true);
        try {
            setSuggestions(await searchService.getSuggestions(query));
        } catch {
            setSuggestions([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const clear = useCallback(() => setSuggestions([]), []);

    return { suggestions, isLoading, fetchSuggestions, clear };
}

export function useSearchService() {
    return useMemo(() => searchService, []);
}

// Re-export legacy type names for any external imports.
export type { Article };
