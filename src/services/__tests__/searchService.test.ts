/**
 * Tests for the typed search service — metadata-only scoring, slug fast-path,
 * grouped suggestions, and per-type indexers. Reflects the post-overhaul API.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { searchService } from '../searchService';
import { resolveSpecialtyQuery } from '@/lib/providers/specialtyResolver';

// ---- Mocks: keep the indexers deterministic ---------------------------------

vi.mock('@/lib/api', () => ({
    api: {
        activity: {
            log: vi.fn().mockResolvedValue(undefined),
            getByType: vi.fn().mockResolvedValue({ success: false }),
        },
    },
    ApiError: class extends Error {},
}));

vi.mock('../articleService', () => ({
    articleService: {
        getAllIndexable: vi.fn().mockResolvedValue([
            {
                id: 'a1',
                slug: 'understanding-depression',
                title: 'Understanding Depression',
                description: 'Depression is a mood disorder',
                summary: 'Depression overview',
                tags: ['depression', 'mood'],
                category: { id: 'c1', slug: 'depression-mood', name: 'Depression & Mood', description: '' },
                content: null,
            },
            {
                id: 'a2',
                slug: 'mindfulness-for-better-sleep',
                title: 'Mindfulness for Better Sleep',
                description: 'How mindfulness helps sleep',
                tags: ['mindfulness', 'sleep'],
                category: { id: 'c2', slug: 'sleep-circadian', name: 'Sleep & Circadian', description: '' },
                content: null,
            },
            {
                id: 'a3',
                slug: 'managing-anxiety',
                title: 'Managing Anxiety',
                description: 'Anxiety management strategies — references depression briefly',
                tags: ['anxiety'],
                category: { id: 'c3', slug: 'anxiety-stress', name: 'Anxiety & Stress', description: '' },
                content: null,
            },
        ]),
    },
}));

vi.mock('../toolService', () => ({
    toolService: {
        getAll: vi.fn().mockResolvedValue([
            { id: 1, name: 'Clarity Score', category: 'Assessment', description: 'Cognitive assessment', features: [] },
            { id: 2, name: 'Mood Journal', category: 'Tracking', description: 'Daily mood tracking', features: [] },
        ]),
    },
}));

vi.mock('../categoryService', () => ({
    categoryService: {
        getAll: vi.fn().mockResolvedValue([
            { id: 'cat1', slug: 'loneliness-connection', name: 'Loneliness & Connection', description: 'Social belonging' },
            { id: 'cat2', slug: 'depression-mood', name: 'Depression & Mood', description: 'Mood disorders' },
        ]),
    },
}));

vi.mock('@/lib/providers/queries', () => ({
    searchProviders: vi.fn().mockResolvedValue({ providers: [], total_count: 0 }),
}));

vi.mock('@/data/mock_knowledge_base', () => ({
    mockKnowledgeBase: {
        conditions: [
            {
                id: 'MDD',
                name: 'Depression',
                full_name: 'Major Depressive Disorder',
                category: 'mood',
                description_for_user: 'A mood disorder',
                is_active: true,
            },
            {
                id: 'GAD',
                name: 'Generalized Anxiety',
                full_name: 'Generalized Anxiety Disorder',
                category: 'anxiety',
                description_for_user: 'An anxiety disorder',
                is_active: true,
            },
        ],
    },
}));

vi.mock('@/lib/crisis', () => ({
    COUNTRY_DATABASE: {
        US: {
            iso2: 'US',
            country_name: 'United States',
            resources: [
                {
                    name: '988 Suicide & Crisis Lifeline',
                    phone: '988',
                    type: 'hotline',
                    languages: ['English', 'Spanish'],
                    hours: '24/7',
                },
            ],
        },
    },
    resolveCountry: () => 'US',
}));

vi.mock('@/lib/article-framework/content-architecture', () => ({
    CONTENT_CATEGORIES: [
        { number: 32, slug: 'future-extras', name: 'Future Extras', description: 'Reserved' },
    ],
}));

// ---- Suite -----------------------------------------------------------------

describe('searchService — typed indexers', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        try { localStorage.clear(); } catch { /* jsdom may not expose .clear */ }
        searchService.invalidateCache();
    });

    describe('searchArticles — metadata-only scoring', () => {
        it('ranks the depression article above the anxiety article that only mentions depression in description', async () => {
            const res = await searchService.searchArticles('depression');
            expect(res.items[0].slug).toBe('understanding-depression');
        });

        it('exact slug match wins via fast-path', async () => {
            const res = await searchService.searchArticles('mindfulness-for-better-sleep');
            expect(res.items[0].slug).toBe('mindfulness-for-better-sleep');
        });

        it('multi-token phrase surfaces matching article', async () => {
            const res = await searchService.searchArticles('mindfulness sleep');
            expect(res.items[0].slug).toBe('mindfulness-for-better-sleep');
        });

        it('respects categorySlug filter', async () => {
            const res = await searchService.searchArticles('depression', { categorySlug: 'depression-mood' });
            expect(res.items.every(a => a.category.slug === 'depression-mood')).toBe(true);
        });
    });

    describe('searchTools — slug fast-path on tool name', () => {
        it('ranks "Clarity Score" first for exact name match', async () => {
            const res = await searchService.searchTools('clarity score');
            expect(res.items[0].name).toBe('Clarity Score');
        });
    });

    describe('searchConditions — id and name scoring', () => {
        it('exact id wins via fast-path', async () => {
            const res = await searchService.searchConditions('mdd');
            expect(res.items[0].id).toBe('MDD');
        });

        it('ranks depression condition above anxiety', async () => {
            const res = await searchService.searchConditions('depression');
            expect(res.items[0].name).toBe('Depression');
        });
    });

    describe('searchCrisis — country-scoped, phone digits fast-path', () => {
        it('"988" surfaces the US lifeline first', () => {
            const res = searchService.searchCrisis('988');
            expect(res.items[0].resource.name).toContain('988');
        });
    });

    describe('searchCategories — DB rows + content-architecture fill', () => {
        it('matches loneliness-connection from DB', async () => {
            const res = await searchService.searchCategories('loneliness');
            expect(res.items[0].slug).toBe('loneliness-connection');
        });

        it('falls back to content-architecture for slugs not yet in DB', async () => {
            const res = await searchService.searchCategories('future-extras');
            expect(res.items[0].slug).toBe('future-extras');
        });
    });

    describe('getGroupedSuggestions — caps per-group', () => {
        it('returns at most perGroup items in each bucket', async () => {
            const grouped = await searchService.getGroupedSuggestions('depression', 1);
            expect(grouped.articles.length).toBeLessThanOrEqual(1);
            expect(grouped.conditions.length).toBeLessThanOrEqual(1);
        });

        it('returns empty for short queries', async () => {
            const grouped = await searchService.getGroupedSuggestions('a');
            expect(grouped.total).toBe(0);
        });
    });

    describe('search — orchestrator', () => {
        it('returns empty buckets for empty query (no provider filters)', async () => {
            const r = await searchService.search('');
            expect(r.total).toBe(0);
        });

        it('honours type allow-list', async () => {
            const r = await searchService.search('depression', { types: ['articles'] });
            expect(r.articles.totalAvailable).toBeGreaterThan(0);
            expect(r.tools.totalAvailable).toBe(0);
            expect(r.conditions.totalAvailable).toBe(0);
        });
    });
});

describe('resolveSpecialtyQuery — keeps free-text alongside matched slugs', () => {
    const specialties = [
        { id: '1', slug: 'anxiety', label: 'Anxiety', category: 'condition' as const, psychage_condition_id: null, sort_order: 0 },
        { id: '2', slug: 'depression', label: 'Depression', category: 'condition' as const, psychage_condition_id: null, sort_order: 0 },
    ];

    it('"anxiety therapist" → slug=anxiety + residual=therapist', () => {
        const { slugs, residual } = resolveSpecialtyQuery('anxiety therapist', specialties);
        expect(slugs).toEqual(['anxiety']);
        expect(residual).toBe('therapist');
    });

    it('falls back to legacy whole-phrase match when no token matches', () => {
        const { slugs, residual } = resolveSpecialtyQuery('totally unrelated query', specialties);
        expect(slugs).toEqual([]);
        expect(residual).toBe('totally unrelated query');
    });

    it('returns empty residual when query is fully consumed', () => {
        const { slugs, residual } = resolveSpecialtyQuery('anxiety', specialties);
        expect(slugs).toEqual(['anxiety']);
        expect(residual).toBe('');
    });
});
