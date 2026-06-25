/**
 * Search Service
 *
 * Typed, per-entity search across Articles, Providers, Tools, Conditions,
 * Crisis Resources and Categories. Powers the global header autocomplete,
 * the /search results page, and per-section filters.
 *
 * Scoring is metadata-first — article bodies are NOT indexed. Slug / id
 * exact matches use a fast-path that rank that item first within its type.
 */

import { useMemo, useCallback, useState } from 'react';
import { Article, Category, Tool } from '../types/models';
import { articleService, ArticleWithContent } from './articleService';
import { toolService } from './toolService';
import { categoryService } from './categoryService';
import { searchProviders as searchProvidersRPC } from '@/lib/providers/queries';
import type { ProviderCardData, ProviderSearchParams } from '@/lib/providers/types';
import { mockKnowledgeBase } from '@/data/mock_knowledge_base';
import type { Condition } from '@/lib/navigator/types';
import {
    COUNTRY_DATABASE,
    type CountryEntry,
    type CrisisResource,
    resolveCountry,
} from '@/lib/crisis';
import { CONTENT_CATEGORIES, type ContentCategory } from '@/lib/article-framework/content-architecture';
import { api } from '../lib/api';
import Fuse from 'fuse.js';

// ============================================================================
// Public Types
// ============================================================================

export type SearchEntityType =
    | 'articles'
    | 'providers'
    | 'tools'
    | 'conditions'
    | 'crisis'
    | 'categories';

export interface ArticleSearchFilters {
    categorySlug?: string;
}

export interface ProviderSearchFilters {
    state?: string;
    city?: string;
    specialty_slugs?: string[];
    telehealth?: boolean;
    page?: number;
    perPage?: number;
}

export interface ConditionSearchFilters {
    category?: string;
}

export interface CrisisSearchFilters {
    /** ISO-2 country code; falls back to resolveCountry() */
    country?: string;
}

export interface SearchFilters {
    articles?: ArticleSearchFilters;
    providers?: ProviderSearchFilters;
    conditions?: ConditionSearchFilters;
    crisis?: CrisisSearchFilters;
}

export interface SearchOptions {
    /** Which entity types to run. Default = all. */
    types?: SearchEntityType[];
    filters?: SearchFilters;
    /** Per-type result cap. Default 20 for full search. */
    perTypeLimit?: number;
}

export interface CrisisHit {
    country: CountryEntry;
    resource: CrisisResource;
}

export interface SearchTypeResult<T> {
    items: T[];
    totalAvailable: number;
}

export interface GroupedSearchResults {
    articles: SearchTypeResult<ArticleWithContent>;
    providers: SearchTypeResult<ProviderCardData>;
    tools: SearchTypeResult<Tool>;
    conditions: SearchTypeResult<Condition>;
    crisis: SearchTypeResult<CrisisHit>;
    categories: SearchTypeResult<Category>;
    /** Total result count across all enabled types. */
    total: number;
}

export interface GroupedSuggestions {
    articles: ArticleWithContent[];
    providers: ProviderCardData[];
    tools: Tool[];
    conditions: Condition[];
    crisis: CrisisHit[];
    total: number;
}

/** Legacy autocomplete suggestion shape used by older surfaces. */
export interface SearchSuggestion {
    text: string;
    type: 'recent' | 'popular' | 'suggestion';
}

// ============================================================================
// Tokeniser + scoring helpers (reused from prior implementation)
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

function tokenHits(haystack: string | undefined | null, tokens: string[]): number {
    if (!haystack) return 0;
    const lower = haystack.toLowerCase();
    let hits = 0;
    for (const t of tokens) {
        if (t.length === 1) {
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

function normalizeSlug(s: string | undefined | null): string {
    return (s ?? '').trim().toLowerCase();
}

/** Slug fast-path bonus — guaranteed top rank within its type. */
const SLUG_FAST_PATH_SCORE = 10_000;

// ============================================================================
// Weighted fuzzy relevance (Fuse.js) — articles + conditions
// ----------------------------------------------------------------------------
// Replaces the prior unweighted substring scorer for the two surfaces where
// "bipolar → autism" manifested. Matching is restricted to high-signal fields
// (title/tags/name) plus a couple of low-weight metadata fields; article body
// and free-text description/seo fields are intentionally NOT keyed, so an
// off-topic article that merely *mentions* the query in prose no longer
// surfaces. threshold keeps weak, body-only matches below the cut.
// ============================================================================

/** Shared Fuse factory — weighted keys, body-agnostic, threshold-gated. */
function buildFuse<T>(pool: T[], keys: { name: string; weight: number }[]): Fuse<T> {
    return new Fuse(pool, {
        includeScore: true,
        ignoreLocation: true,
        threshold: 0.3,
        minMatchCharLength: 2,
        keys,
    });
}

const ARTICLE_FUSE_KEYS = [
    { name: 'title', weight: 0.7 },
    { name: 'tags', weight: 0.2 },
    { name: 'subtitle', weight: 0.1 },
    { name: 'summary', weight: 0.1 },
    { name: 'category.name', weight: 0.1 },
];

// Match the curated condition set on canonical fields only. The free-text
// `description_for_user` is deliberately NOT keyed: prose like "often confused
// with bipolar disorder" on the Autism entry is exactly what made "bipolar"
// surface autism. Names are short and canonical, so precision wins here.
const CONDITION_FUSE_KEYS = [
    { name: 'name', weight: 0.6 },
    { name: 'full_name', weight: 0.3 },
    { name: 'category', weight: 0.1 },
];

// ============================================================================
// Per-type scoring
// ============================================================================

function scoreTool(tool: Tool, tokens: string[], phrase: string): number {
    const q = normalizeSlug(phrase);
    let score = 0;
    if (q && tool.name.toLowerCase() === q) score += SLUG_FAST_PATH_SCORE;
    score += tokenHits(tool.name, tokens) * 40;
    score += tokenHits(tool.category, tokens) * 12;
    if (tool.features?.length) {
        score += tokenHits(tool.features.join(' '), tokens) * 10;
    }
    score += tokenHits(tool.description, tokens) * 4;
    if (fullPhraseHit(tool.name, phrase)) score += 20;
    return score;
}

function scoreDbCategory(cat: Category, tokens: string[], phrase: string): number {
    const q = normalizeSlug(phrase);
    if (q && normalizeSlug(cat.slug) === q) return SLUG_FAST_PATH_SCORE;
    let score = 0;
    if (q && cat.name.toLowerCase() === q) score += 90;
    score += tokenHits(cat.name, tokens) * 40;
    score += tokenHits(cat.slug, tokens) * 30;
    score += tokenHits(cat.description, tokens) * 4;
    if (cat.subTopics?.length) {
        score += tokenHits(cat.subTopics.join(' '), tokens) * 6;
    }
    if (fullPhraseHit(cat.name, phrase)) score += 15;
    return score;
}

function scoreContentCategory(cat: ContentCategory, tokens: string[], phrase: string): number {
    const q = normalizeSlug(phrase);
    if (q && normalizeSlug(cat.slug) === q) return SLUG_FAST_PATH_SCORE;
    let score = 0;
    if (q && cat.name.toLowerCase() === q) score += 90;
    score += tokenHits(cat.name, tokens) * 40;
    score += tokenHits(cat.slug, tokens) * 30;
    score += tokenHits(cat.description, tokens) * 4;
    if (fullPhraseHit(cat.name, phrase)) score += 15;
    return score;
}

function scoreCrisis(country: CountryEntry, resource: CrisisResource, tokens: string[], phrase: string): number {
    let score = 0;
    const digits = phrase.replace(/\D+/g, '');
    if (digits.length >= 3 && resource.phone) {
        const resDigits = resource.phone.replace(/\D+/g, '');
        if (resDigits.includes(digits)) score += SLUG_FAST_PATH_SCORE;
    }
    score += tokenHits(resource.name, tokens) * 30;
    score += tokenHits(country.country_name, tokens) * 20;
    score += tokenHits(country.iso2, tokens) * 10;
    score += tokenHits(resource.type, tokens) * 8;
    score += tokenHits(resource.languages.join(' '), tokens) * 4;
    if (fullPhraseHit(resource.name, phrase)) score += 20;
    if (fullPhraseHit(country.country_name, phrase)) score += 15;
    return score;
}

// ============================================================================
// Article cache + indexer
// ============================================================================

let _articleIndexCache: ArticleWithContent[] | null = null;
let _articleIndexPromise: Promise<ArticleWithContent[]> | null = null;
let _articleFuse: Fuse<ArticleWithContent> | null = null;

async function getArticleIndex(): Promise<ArticleWithContent[]> {
    if (_articleIndexCache) return _articleIndexCache;
    if (!_articleIndexPromise) {
        _articleIndexPromise = articleService.getAllIndexable().then(list => {
            _articleIndexCache = list;
            return list;
        });
    }
    return _articleIndexPromise;
}

/** Lazily build (and memoize) the article Fuse index over the cached pool. */
async function getArticleFuse(): Promise<Fuse<ArticleWithContent>> {
    if (_articleFuse) return _articleFuse;
    const pool = await getArticleIndex();
    _articleFuse = buildFuse(pool, ARTICLE_FUSE_KEYS);
    return _articleFuse;
}

function invalidateArticleIndex(): void {
    _articleIndexCache = null;
    _articleIndexPromise = null;
    _articleFuse = null;
}

async function searchArticles(
    query: string,
    filters: ArticleSearchFilters = {},
    limit?: number,
): Promise<SearchTypeResult<ArticleWithContent>> {
    const phrase = query.trim();
    if (!phrase) return { items: [], totalAvailable: 0 };
    const q = normalizeSlug(phrase);

    const pool = await getArticleIndex();
    const fuse = await getArticleFuse();

    // Rank by weighted fuzzy relevance, then prepend an exact slug match so
    // deep-link/slug queries still pin their article to the top.
    const ordered: ArticleWithContent[] = [];
    const seen = new Set<string | number>();
    const push = (a: ArticleWithContent) => {
        if (seen.has(a.id)) return;
        seen.add(a.id);
        ordered.push(a);
    };
    const exact = q ? pool.find(a => normalizeSlug(a.slug) === q) : undefined;
    if (exact) push(exact);
    for (const r of fuse.search(phrase)) push(r.item);

    const items = filters.categorySlug
        ? ordered.filter(a => a.category?.slug === filters.categorySlug)
        : ordered;
    return {
        items: limit ? items.slice(0, limit) : items,
        totalAvailable: items.length,
    };
}

// ============================================================================
// Tool indexer
// ============================================================================

let _toolIndexCache: Tool[] | null = null;
let _toolIndexPromise: Promise<Tool[]> | null = null;

async function getToolIndex(): Promise<Tool[]> {
    if (_toolIndexCache) return _toolIndexCache;
    if (!_toolIndexPromise) {
        _toolIndexPromise = toolService.getAll().then(list => {
            _toolIndexCache = list;
            return list;
        });
    }
    return _toolIndexPromise;
}

async function searchTools(query: string, limit?: number): Promise<SearchTypeResult<Tool>> {
    const tokens = tokenize(query);
    if (!query.trim() || tokens.length === 0) return { items: [], totalAvailable: 0 };
    const phrase = query.trim();

    const pool = await getToolIndex();
    const scored = pool
        .map(tool => ({ tool, score: scoreTool(tool, tokens, phrase) }))
        .filter(s => s.score > 0)
        .sort((a, b) => b.score - a.score)
        .map(s => s.tool);
    return {
        items: limit ? scored.slice(0, limit) : scored,
        totalAvailable: scored.length,
    };
}

// ============================================================================
// Condition indexer (client-side over mockKnowledgeBase)
// ============================================================================

let _conditionFuse: Fuse<Condition> | null = null;

/** Build (and memoize) the condition Fuse index over the active pool. */
function getConditionFuse(): Fuse<Condition> {
    if (_conditionFuse) return _conditionFuse;
    const pool = mockKnowledgeBase.conditions.filter(c => c.is_active);
    _conditionFuse = buildFuse(pool, CONDITION_FUSE_KEYS);
    return _conditionFuse;
}

function searchConditions(
    query: string,
    filters: ConditionSearchFilters = {},
    limit?: number,
): SearchTypeResult<Condition> {
    const phrase = query.trim();
    if (!phrase) return { items: [], totalAvailable: 0 };
    const q = normalizeSlug(phrase);

    const activePool = mockKnowledgeBase.conditions.filter(c => c.is_active);
    const ranked = getConditionFuse().search(phrase).map(r => r.item);

    // Exact id/name match pins to the top (e.g. "BIP" or "bipolar disorder").
    const ordered: Condition[] = [];
    const seen = new Set<string>();
    const push = (c: Condition) => {
        if (seen.has(c.id)) return;
        seen.add(c.id);
        ordered.push(c);
    };
    const exact = q
        ? activePool.find(c => c.id.toLowerCase() === q || c.name.toLowerCase() === q)
        : undefined;
    if (exact) push(exact);
    ranked.forEach(push);

    const items = filters.category
        ? ordered.filter(c => c.category === filters.category)
        : ordered;
    return {
        items: limit ? items.slice(0, limit) : items,
        totalAvailable: items.length,
    };
}

// ============================================================================
// Crisis indexer — country-scoped
// ============================================================================

function searchCrisis(
    query: string,
    filters: CrisisSearchFilters = {},
    limit?: number,
): SearchTypeResult<CrisisHit> {
    const tokens = tokenize(query);
    if (!query.trim()) return { items: [], totalAvailable: 0 };

    // Resolve country pool: explicit filter > geo > all countries
    let countryPool: CountryEntry[];
    if (filters.country) {
        const entry = COUNTRY_DATABASE[filters.country.toUpperCase()];
        countryPool = entry ? [entry] : [];
    } else {
        const iso2 = resolveCountry();
        const primary = COUNTRY_DATABASE[iso2];
        countryPool = primary ? [primary] : Object.values(COUNTRY_DATABASE);
    }

    const phrase = query.trim();
    const hits: { hit: CrisisHit; score: number }[] = [];
    for (const country of countryPool) {
        for (const resource of country.resources) {
            const s = scoreCrisis(country, resource, tokens, phrase);
            if (s > 0) hits.push({ hit: { country, resource }, score: s });
        }
    }
    hits.sort((a, b) => b.score - a.score);
    const items = hits.map(h => h.hit);
    return {
        items: limit ? items.slice(0, limit) : items,
        totalAvailable: items.length,
    };
}

// ============================================================================
// Category indexer — DB + content-architecture union
// ============================================================================

let _categoryIndexCache: Category[] | null = null;
let _categoryIndexPromise: Promise<Category[]> | null = null;

async function getDbCategoryIndex(): Promise<Category[]> {
    if (_categoryIndexCache) return _categoryIndexCache;
    if (!_categoryIndexPromise) {
        _categoryIndexPromise = categoryService.getAll().then(list => {
            _categoryIndexCache = list;
            return list;
        });
    }
    return _categoryIndexPromise;
}

async function searchCategories(query: string, limit?: number): Promise<SearchTypeResult<Category>> {
    const tokens = tokenize(query);
    if (!query.trim() || tokens.length === 0) return { items: [], totalAvailable: 0 };
    const phrase = query.trim();

    const dbCats = await getDbCategoryIndex();
    const dbScored = dbCats.map(cat => ({ cat, score: scoreDbCategory(cat, tokens, phrase) })).filter(s => s.score > 0);

    // Fill from content-architecture for slugs not yet in DB
    const dbSlugs = new Set(dbCats.map(c => normalizeSlug(c.slug)));
    const archScored: { cat: Category; score: number }[] = [];
    for (const arch of CONTENT_CATEGORIES) {
        if (dbSlugs.has(normalizeSlug(arch.slug))) continue;
        const s = scoreContentCategory(arch, tokens, phrase);
        if (s > 0) {
            archScored.push({
                cat: {
                    id: `arch-${arch.number}`,
                    name: arch.name,
                    slug: arch.slug,
                    description: arch.description,
                } as Category,
                score: s,
            });
        }
    }

    const merged = [...dbScored, ...archScored].sort((a, b) => b.score - a.score).map(s => s.cat);
    return {
        items: limit ? merged.slice(0, limit) : merged,
        totalAvailable: merged.length,
    };
}

// ============================================================================
// Provider indexer — delegates to RPC
// ============================================================================

async function searchProviders(
    query: string,
    filters: ProviderSearchFilters = {},
    limit = 20,
): Promise<SearchTypeResult<ProviderCardData>> {
    const trimmed = query.trim();
    const hasFilters = !!(filters.state || filters.city || filters.specialty_slugs?.length || filters.telehealth);
    if (!trimmed && !hasFilters) return { items: [], totalAvailable: 0 };

    const params: ProviderSearchParams = {
        query: trimmed || undefined,
        state: filters.state,
        city: filters.city,
        specialty_slugs: filters.specialty_slugs?.length ? filters.specialty_slugs : undefined,
        telehealth: filters.telehealth,
        page: filters.page,
        per_page: filters.perPage ?? limit,
        sort_by: 'relevance',
    };
    try {
        const result = await searchProvidersRPC(params);
        const items = result.providers.slice(0, limit);
        return { items, totalAvailable: result.total_count ?? items.length };
    } catch {
        return { items: [], totalAvailable: 0 };
    }
}

// ============================================================================
// Orchestrator
// ============================================================================

const DEFAULT_TYPES: SearchEntityType[] = ['articles', 'providers', 'tools', 'conditions', 'crisis', 'categories'];

function emptyResults(): GroupedSearchResults {
    const empty = <T,>(): SearchTypeResult<T> => ({ items: [], totalAvailable: 0 });
    return {
        articles: empty<ArticleWithContent>(),
        providers: empty<ProviderCardData>(),
        tools: empty<Tool>(),
        conditions: empty<Condition>(),
        crisis: empty<CrisisHit>(),
        categories: empty<Category>(),
        total: 0,
    };
}

async function search(query: string, opts: SearchOptions = {}): Promise<GroupedSearchResults> {
    const empty = emptyResults();
    const trimmed = query.trim();
    const types = opts.types ?? DEFAULT_TYPES;
    const perType = opts.perTypeLimit ?? 20;
    const wants = (t: SearchEntityType) => types.includes(t);

    // For provider-only with filter-only queries (no text), still run providers.
    const providerHasFilters = !!(
        opts.filters?.providers?.state ||
        opts.filters?.providers?.city ||
        opts.filters?.providers?.specialty_slugs?.length ||
        opts.filters?.providers?.telehealth
    );
    if (!trimmed && !providerHasFilters) return empty;

    const [articles, providers, tools, conditions, crisis, categories] = await Promise.all([
        wants('articles') && trimmed
            ? searchArticles(trimmed, opts.filters?.articles ?? {}, perType)
            : Promise.resolve(empty.articles),
        wants('providers')
            ? searchProviders(trimmed, opts.filters?.providers ?? {}, perType)
            : Promise.resolve(empty.providers),
        wants('tools') && trimmed
            ? searchTools(trimmed, perType)
            : Promise.resolve(empty.tools),
        wants('conditions') && trimmed
            ? Promise.resolve(searchConditions(trimmed, opts.filters?.conditions ?? {}, perType))
            : Promise.resolve(empty.conditions),
        wants('crisis') && trimmed
            ? Promise.resolve(searchCrisis(trimmed, opts.filters?.crisis ?? {}, perType))
            : Promise.resolve(empty.crisis),
        wants('categories') && trimmed
            ? searchCategories(trimmed, perType)
            : Promise.resolve(empty.categories),
    ]);

    const total =
        articles.totalAvailable +
        providers.totalAvailable +
        tools.totalAvailable +
        conditions.totalAvailable +
        crisis.totalAvailable +
        categories.totalAvailable;

    return { articles, providers, tools, conditions, crisis, categories, total };
}

// ============================================================================
// Grouped suggestions (autocomplete)
// ============================================================================

async function getGroupedSuggestions(
    query: string,
    perGroup = 3,
): Promise<GroupedSuggestions> {
    const trimmed = query.trim();
    const emptyGrouped: GroupedSuggestions = {
        articles: [], providers: [], tools: [], conditions: [], crisis: [], total: 0,
    };
    if (!trimmed || trimmed.length < 2) return emptyGrouped;

    const [articles, providers, tools] = await Promise.all([
        searchArticles(trimmed, {}, perGroup),
        searchProviders(trimmed, {}, perGroup),
        searchTools(trimmed, perGroup),
    ]);
    const conditions = searchConditions(trimmed, {}, perGroup);
    const crisis = searchCrisis(trimmed, {}, perGroup);

    const total =
        articles.items.length +
        providers.items.length +
        tools.items.length +
        conditions.items.length +
        crisis.items.length;

    return {
        articles: articles.items,
        providers: providers.items,
        tools: tools.items,
        conditions: conditions.items,
        crisis: crisis.items,
        total,
    };
}

// ============================================================================
// Public service
// ============================================================================

export const searchService = {
    /** Main typed search across all enabled entity types. */
    search,

    /** Per-type indexers — exposed for surfaces that already know what they want. */
    searchArticles,
    searchProviders,
    searchTools,
    searchConditions,
    searchCrisis,
    searchCategories,

    /** Grouped autocomplete suggestions — capped 3/group by default. */
    getGroupedSuggestions,

    /**
     * Legacy text-only suggestion shape used by older bars.
     * Builds string labels from grouped suggestions (articles/tools/conditions only).
     */
    getSuggestions: async (query: string, limit = 8): Promise<SearchSuggestion[]> => {
        const grouped = await getGroupedSuggestions(query, 3);
        const out: SearchSuggestion[] = [];
        const seen = new Set<string>();
        const push = (text: string | undefined | null) => {
            if (!text) return;
            const key = text.toLowerCase();
            if (seen.has(key)) return;
            seen.add(key);
            out.push({ text, type: 'suggestion' });
        };
        grouped.articles.forEach(a => push(a.title));
        grouped.tools.forEach(t => push(t.name));
        grouped.conditions.forEach(c => push(c.name));
        return out.slice(0, limit);
    },

    /** Clear cached article / tool / category indexes (e.g. after seeding). */
    invalidateCache: (): void => {
        invalidateArticleIndex();
        _toolIndexCache = null;
        _toolIndexPromise = null;
        _categoryIndexCache = null;
        _categoryIndexPromise = null;
    },

    // -------------------------------------------------------------------------
    // Search history (unchanged behaviour)
    // -------------------------------------------------------------------------

    saveSearchHistory: async (query: string): Promise<void> => {
        if (!query.trim()) return;
        try {
            await api.activity.log('search', 'search', undefined, { query });
        } catch {
            // best-effort
        }
    },

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
            // fall through to localStorage
        }
        try {
            const stored = localStorage.getItem('psychage_recent_searches');
            if (stored) return JSON.parse(stored).slice(0, limit);
        } catch {
            // corrupted storage
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
            // storage unavailable
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
    const [results, setResults] = useState<GroupedSearchResults | null>(null);
    const [error, setError] = useState<string | null>(null);

    const run = useCallback(async (query: string, opts?: SearchOptions) => {
        if (!query.trim() && !(opts?.filters?.providers)) {
            setResults(null);
            return;
        }
        setIsSearching(true);
        setError(null);
        try {
            const r = await searchService.search(query, opts);
            setResults(r);
            if (query.trim()) {
                searchService.saveLocalSearch(query);
                searchService.saveSearchHistory(query);
            }
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

    return { search: run, clear, isSearching, results, error };
}

export function useSearchSuggestions() {
    const [suggestions, setSuggestions] = useState<GroupedSuggestions | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchSuggestions = useCallback(async (query: string) => {
        if (!query || query.length < 2) {
            setSuggestions(null);
            return;
        }
        setIsLoading(true);
        try {
            setSuggestions(await searchService.getGroupedSuggestions(query));
        } catch {
            setSuggestions(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const clear = useCallback(() => setSuggestions(null), []);

    return { suggestions, isLoading, fetchSuggestions, clear };
}

export function useSearchService() {
    return useMemo(() => searchService, []);
}

// Re-export legacy type names for any external imports.
export type { Article };
