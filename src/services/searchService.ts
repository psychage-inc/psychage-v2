/**
 * Search Service
 *
 * Unified search service with cascading data sources:
 * 1. Backend API (primary - server-side search)
 * 2. Client-side filtering (fallback - local data)
 */

import { api, ApiError } from '../lib/api';
import { Article, Provider } from '../types/models';
import { useMemo, useCallback, useState } from 'react';
import { articleService } from './articleService';
import { providerService } from './providerService';

// ============================================================================
// Types
// ============================================================================

export interface SearchResult {
    articles: Article[];
    providers: Provider[];
    tools: Tool[];
    total: number;
}

export interface Tool {
    id: string | number;
    name: string;
    description: string;
    icon?: string;
    category?: string;
    href?: string;
}

export interface SearchFilters {
    type?: 'articles' | 'providers' | 'tools' | 'all';
    category?: string;
    dateRange?: 'week' | 'month' | 'year' | 'all';
    sortBy?: 'relevance' | 'date' | 'popularity';
}

export interface SearchSuggestion {
    text: string;
    type: 'recent' | 'popular' | 'suggestion';
}

// ============================================================================
// Local Search Helpers
// ============================================================================

/**
 * Perform client-side search on articles
 */
function searchArticlesLocally(articles: Article[], query: string): Article[] {
    const lowerQuery = query.toLowerCase();
    return articles.filter(article =>
        article.title.toLowerCase().includes(lowerQuery) ||
        article.description.toLowerCase().includes(lowerQuery) ||
        article.category?.name.toLowerCase().includes(lowerQuery) ||
        article.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
    ).sort((a, b) => {
        // Prioritize title matches
        const aInTitle = a.title.toLowerCase().includes(lowerQuery);
        const bInTitle = b.title.toLowerCase().includes(lowerQuery);
        if (aInTitle && !bInTitle) return -1;
        if (!aInTitle && bInTitle) return 1;
        return 0;
    });
}

/**
 * Perform client-side search on providers
 */
function searchProvidersLocally(providers: Provider[], query: string): Provider[] {
    const lowerQuery = query.toLowerCase();
    return providers.filter(provider =>
        provider.name.toLowerCase().includes(lowerQuery) ||
        provider.specialties?.some(s => s.toLowerCase().includes(lowerQuery)) ||
        provider.bio?.toLowerCase().includes(lowerQuery) ||
        provider.location?.toLowerCase().includes(lowerQuery)
    );
}

// ============================================================================
// Service
// ============================================================================

export const searchService = {
    /**
     * Unified search across all content types
     */
    search: async (query: string, filters?: SearchFilters): Promise<SearchResult> => {
        if (!query.trim()) {
            return { articles: [], providers: [], tools: [], total: 0 };
        }

        // Try backend API first
        try {
            const response = await api.search.all({
                query,
                type: filters?.type,
                limit: 20
            });

            if (response.success && response.data) {
                return {
                    articles: response.data.articles as Article[],
                    providers: response.data.providers as Provider[],
                    tools: response.data.tools as Tool[],
                    total: response.data.total
                };
            }
        } catch (error) {
            // API not available, fall through to local search
            if (error instanceof ApiError && error.status !== 0) {
                console.warn('[SearchService] Backend search failed:', error.message);
            }
        }

        // Fallback to client-side search
        console.log('[SearchService] Using client-side search');

        const results: SearchResult = {
            articles: [],
            providers: [],
            tools: [],
            total: 0
        };

        try {
            // Search articles locally
            if (!filters?.type || filters.type === 'all' || filters.type === 'articles') {
                const allArticles = await articleService.getAll();
                results.articles = searchArticlesLocally(allArticles, query);
            }

            // Search providers locally
            if (!filters?.type || filters.type === 'all' || filters.type === 'providers') {
                const allProviders = await providerService.getAll();
                results.providers = searchProvidersLocally(allProviders, query);
            }

            // Tools would need to be searched from toolService
            // For now, we'll leave tools empty in fallback mode

            results.total = results.articles.length + results.providers.length + results.tools.length;
        } catch (error) {
            console.error('[SearchService] Local search failed:', error);
        }

        return results;
    },

    /**
     * Search only articles
     */
    searchArticles: async (query: string, limit?: number): Promise<Article[]> => {
        if (!query.trim()) return [];

        try {
            const response = await api.search.articles(query, limit);
            if (response.success && response.data) {
                return response.data as Article[];
            }
        } catch (error) {
            console.warn('[SearchService] Backend article search failed, using local search');
        }

        // Fallback to local search
        const allArticles = await articleService.getAll();
        const results = searchArticlesLocally(allArticles, query);
        return limit ? results.slice(0, limit) : results;
    },

    /**
     * Search only providers
     */
    searchProviders: async (query: string, limit?: number): Promise<Provider[]> => {
        if (!query.trim()) return [];

        try {
            const response = await api.search.providers(query, limit);
            if (response.success && response.data) {
                return response.data as Provider[];
            }
        } catch (error) {
            console.warn('[SearchService] Backend provider search failed, using local search');
        }

        // Fallback to local search
        const allProviders = await providerService.getAll();
        const results = searchProvidersLocally(allProviders, query);
        return limit ? results.slice(0, limit) : results;
    },

    /**
     * Get search suggestions (autocomplete)
     */
    getSuggestions: async (query: string): Promise<SearchSuggestion[]> => {
        if (!query.trim() || query.length < 2) return [];

        try {
            const response = await api.search.suggestions(query);
            if (response.success && response.data) {
                const suggestions: SearchSuggestion[] = [
                    ...(response.data.recentSearches || []).map(text => ({
                        text,
                        type: 'recent' as const
                    })),
                    ...(response.data.suggestions || []).map(text => ({
                        text,
                        type: 'suggestion' as const
                    }))
                ];
                return suggestions;
            }
        } catch {
            // API not available, generate local suggestions
        }

        // Fallback: generate suggestions from local data
        try {
            const allArticles = await articleService.getAll();
            const matchingTitles = allArticles
                .filter(a => a.title.toLowerCase().includes(query.toLowerCase()))
                .slice(0, 5)
                .map(a => ({ text: a.title, type: 'suggestion' as const }));

            const matchingCategories = [...new Set(
                allArticles
                    .filter(a => a.category?.name.toLowerCase().includes(query.toLowerCase()))
                    .map(a => a.category?.name || '')
            )]
                .slice(0, 3)
                .map(name => ({ text: name, type: 'suggestion' as const }));

            return [...matchingTitles, ...matchingCategories];
        } catch {
            return [];
        }
    },

    /**
     * Save search to history (for logged-in users)
     */
    saveSearchHistory: async (query: string): Promise<void> => {
        if (!query.trim()) return;

        try {
            await api.activity.log('search', 'search', undefined, { query });
        } catch (error) {
            // Silently fail - search history is not critical
            console.debug('[SearchService] Failed to save search history:', error);
        }
    },

    /**
     * Get recent searches for user
     */
    getRecentSearches: async (limit = 5): Promise<string[]> => {
        try {
            const response = await api.activity.getByType('search', limit);
            if (response.success && response.data) {
                return (response.data as Array<{ metadata?: { query?: string } }>)
                    .map(activity => activity.metadata?.query)
                    .filter((q): q is string => !!q);
            }
        } catch {
            // Not logged in or API unavailable
        }

        // Return from localStorage as fallback
        try {
            const stored = localStorage.getItem('psychage_recent_searches');
            if (stored) {
                return JSON.parse(stored).slice(0, limit);
            }
        } catch {
            // Invalid stored data
        }

        return [];
    },

    /**
     * Save search to local storage (for non-logged-in users)
     */
    saveLocalSearch: (query: string): void => {
        if (!query.trim()) return;

        try {
            const stored = localStorage.getItem('psychage_recent_searches');
            const searches: string[] = stored ? JSON.parse(stored) : [];

            // Remove duplicate and add to front
            const filtered = searches.filter(s => s !== query);
            filtered.unshift(query);

            // Keep only last 10 searches
            localStorage.setItem('psychage_recent_searches', JSON.stringify(filtered.slice(0, 10)));
        } catch {
            // Storage full or unavailable
        }
    },

    /**
     * Clear search history
     */
    clearSearchHistory: async (): Promise<void> => {
        localStorage.removeItem('psychage_recent_searches');
        // Also clear from server if logged in (not implemented yet)
    }
};

// ============================================================================
// Hooks
// ============================================================================

/**
 * Hook for search functionality
 */
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
            const searchResults = await searchService.search(query, filters);
            setResults(searchResults);

            // Save to history
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

    return {
        search,
        clear,
        isSearching,
        results,
        error
    };
}

/**
 * Hook for search suggestions
 */
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
            const results = await searchService.getSuggestions(query);
            setSuggestions(results);
        } catch {
            setSuggestions([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const clear = useCallback(() => {
        setSuggestions([]);
    }, []);

    return {
        suggestions,
        isLoading,
        fetchSuggestions,
        clear
    };
}

export function useSearchService() {
    return useMemo(() => searchService, []);
}
