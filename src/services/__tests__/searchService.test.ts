 
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { searchService } from '../searchService';

const mockApi = vi.hoisted(() => ({
    search: {
        all: vi.fn(),
        articles: vi.fn(),
        providers: vi.fn(),
        suggestions: vi.fn(),
    },
    activity: {
        log: vi.fn(),
        getByType: vi.fn(),
    },
}));

vi.mock('@/lib/api', () => ({
    api: mockApi,
    ApiError: class ApiError extends Error {
        status: number;
        constructor(message: string, status: number) {
            super(message);
            this.status = status;
        }
    },
}));

vi.mock('../articleService', () => ({
    articleService: {
        getAll: vi.fn().mockResolvedValue([
            { title: 'Understanding Anxiety', description: 'A guide to anxiety', category: { name: 'Mental Health' }, tags: ['anxiety'] },
            { title: 'Sleep Tips', description: 'Better sleep habits', category: { name: 'Wellness' }, tags: ['sleep'] },
        ]),
    },
}));

vi.mock('../providerService', () => ({
    providerService: {
        getAll: vi.fn().mockResolvedValue([
            { name: 'Dr. Smith', specialties: ['anxiety', 'depression'], bio: 'Expert therapist', location: 'New York' },
        ]),
    },
}));

describe('searchService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
        vi.spyOn(console, 'warn').mockImplementation(() => {});
        vi.spyOn(console, 'log').mockImplementation(() => {});
        vi.spyOn(console, 'error').mockImplementation(() => {});
        vi.spyOn(console, 'debug').mockImplementation(() => {});
    });

    describe('search', () => {
        it('should return empty results for empty query', async () => {
            const result = await searchService.search('');
            expect(result.total).toBe(0);
            expect(result.articles).toEqual([]);
        });

        it('should return empty results for whitespace query', async () => {
            const result = await searchService.search('   ');
            expect(result.total).toBe(0);
        });

        it('should return API results on success', async () => {
            mockApi.search.all.mockResolvedValue({
                success: true,
                data: { articles: [{ title: 'Result' }], providers: [], tools: [], total: 1 },
            });

            const result = await searchService.search('test');
            expect(result.total).toBe(1);
            expect(result.articles).toHaveLength(1);
        });

        it('should fallback to local search when API fails', async () => {
            mockApi.search.all.mockRejectedValue(new Error('network'));

            const result = await searchService.search('anxiety');
            expect(result.articles.length).toBeGreaterThan(0);
            expect(result.articles[0].title).toContain('Anxiety');
        });

        it('should respect type filter in local search', async () => {
            mockApi.search.all.mockRejectedValue(new Error('fail'));

            const result = await searchService.search('test', { type: 'providers' });
            expect(result.articles).toEqual([]);
        });
    });

    describe('searchArticles', () => {
        it('should return empty for empty query', async () => {
            const result = await searchService.searchArticles('');
            expect(result).toEqual([]);
        });

        it('should return API results on success', async () => {
            mockApi.search.articles.mockResolvedValue({
                success: true,
                data: [{ title: 'API Article' }],
            });

            const result = await searchService.searchArticles('test');
            expect(result).toHaveLength(1);
        });

        it('should fallback to local search on failure', async () => {
            mockApi.search.articles.mockRejectedValue(new Error('fail'));

            const result = await searchService.searchArticles('anxiety');
            expect(result.length).toBeGreaterThan(0);
        });

        it('should respect limit in local fallback', async () => {
            mockApi.search.articles.mockRejectedValue(new Error('fail'));

            const result = await searchService.searchArticles('a', 1);
            expect(result.length).toBeLessThanOrEqual(1);
        });
    });

    describe('searchProviders', () => {
        it('should return empty for empty query', async () => {
            const result = await searchService.searchProviders('');
            expect(result).toEqual([]);
        });

        it('should fallback to local provider search', async () => {
            mockApi.search.providers.mockRejectedValue(new Error('fail'));

            const result = await searchService.searchProviders('Smith');
            expect(result.length).toBeGreaterThan(0);
        });
    });

    describe('getSuggestions', () => {
        it('should return empty for short queries', async () => {
            const result = await searchService.getSuggestions('a');
            expect(result).toEqual([]);
        });

        it('should return API suggestions on success', async () => {
            mockApi.search.suggestions.mockResolvedValue({
                success: true,
                data: { recentSearches: ['anxiety'], suggestions: ['anxiety disorder'] },
            });

            const result = await searchService.getSuggestions('anx');
            expect(result).toHaveLength(2);
            expect(result[0].type).toBe('recent');
            expect(result[1].type).toBe('suggestion');
        });

        it('should fallback to local suggestions on failure', async () => {
            mockApi.search.suggestions.mockRejectedValue(new Error('fail'));

            const result = await searchService.getSuggestions('anxiety');
            expect(result.length).toBeGreaterThan(0);
        });
    });

    describe('saveLocalSearch', () => {
        it('should save search to localStorage', () => {
            searchService.saveLocalSearch('anxiety');

            const stored = JSON.parse(localStorage.getItem('psychage_recent_searches') || '[]');
            expect(stored).toContain('anxiety');
        });

        it('should not save empty queries', () => {
            searchService.saveLocalSearch('');

            const stored = localStorage.getItem('psychage_recent_searches');
            expect(stored).toBeNull();
        });

        it('should deduplicate and prepend', () => {
            searchService.saveLocalSearch('first');
            searchService.saveLocalSearch('second');
            searchService.saveLocalSearch('first'); // duplicate

            const stored = JSON.parse(localStorage.getItem('psychage_recent_searches') || '[]');
            expect(stored[0]).toBe('first');
            expect(stored).toHaveLength(2);
        });

        it('should keep only 10 searches', () => {
            for (let i = 0; i < 15; i++) {
                searchService.saveLocalSearch(`search-${i}`);
            }

            const stored = JSON.parse(localStorage.getItem('psychage_recent_searches') || '[]');
            expect(stored).toHaveLength(10);
        });
    });

    describe('clearSearchHistory', () => {
        it('should clear localStorage search history', async () => {
            localStorage.setItem('psychage_recent_searches', JSON.stringify(['test']));

            await searchService.clearSearchHistory();

            expect(localStorage.getItem('psychage_recent_searches')).toBeNull();
        });
    });

    describe('getRecentSearches', () => {
        it('should return API results on success', async () => {
            mockApi.activity.getByType.mockResolvedValue({
                success: true,
                data: [
                    { metadata: { query: 'anxiety' } },
                    { metadata: { query: 'depression' } },
                ],
            });

            const result = await searchService.getRecentSearches(5);
            expect(result).toEqual(['anxiety', 'depression']);
        });

        it('should fallback to localStorage', async () => {
            mockApi.activity.getByType.mockRejectedValue(new Error('fail'));
            localStorage.setItem('psychage_recent_searches', JSON.stringify(['local-search']));

            const result = await searchService.getRecentSearches();
            expect(result).toEqual(['local-search']);
        });

        it('should return empty array when no data', async () => {
            mockApi.activity.getByType.mockRejectedValue(new Error('fail'));

            const result = await searchService.getRecentSearches();
            expect(result).toEqual([]);
        });
    });
});
