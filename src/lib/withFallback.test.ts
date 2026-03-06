import { describe, it, expect, vi, beforeEach } from 'vitest';
import { withFallback, queryWithFallback, queryOneWithFallback } from './withFallback';

describe('withFallback', () => {
    beforeEach(() => {
        vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    it('should return primary result on success', async () => {
        const result = await withFallback(() => Promise.resolve('primary'), 'fallback', 'test');
        expect(result).toBe('primary');
    });

    it('should return static fallback on primary failure', async () => {
        const result = await withFallback(
            () => Promise.reject(new Error('fail')),
            'fallback',
            'test'
        );
        expect(result).toBe('fallback');
    });

    it('should call fallback function on primary failure', async () => {
        const result = await withFallback(
            () => Promise.reject(new Error('fail')),
            () => 'computed-fallback',
            'test'
        );
        expect(result).toBe('computed-fallback');
    });

    it('should log error with label on failure', async () => {
        await withFallback(
            () => Promise.reject(new Error('oops')),
            'fb',
            'myService.getAll'
        );
        expect(console.error).toHaveBeenCalledWith(
            '[myService.getAll] Failed, using fallback:',
            expect.any(Error)
        );
    });
});

describe('queryWithFallback', () => {
    beforeEach(() => {
        vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    const mapper = (row: { id: number; name: string }) => ({ id: row.id, label: row.name });

    it('should map data on success', async () => {
        const result = await queryWithFallback(
            () => Promise.resolve({ data: [{ id: 1, name: 'A' }], error: null }),
            mapper,
            [],
            'test'
        );
        expect(result).toEqual([{ id: 1, label: 'A' }]);
    });

    it('should return fallback on supabase error', async () => {
        const result = await queryWithFallback(
            () => Promise.resolve({ data: null, error: { message: 'db error' } }),
            mapper,
            [{ id: 0, label: 'mock' }],
            'test'
        );
        expect(result).toEqual([{ id: 0, label: 'mock' }]);
    });

    it('should return fallback when data is null', async () => {
        const result = await queryWithFallback(
            () => Promise.resolve({ data: null, error: null }),
            mapper,
            [{ id: 0, label: 'mock' }],
            'test'
        );
        expect(result).toEqual([{ id: 0, label: 'mock' }]);
    });

    it('should return fallback when data is empty array', async () => {
        const result = await queryWithFallback(
            () => Promise.resolve({ data: [], error: null }),
            mapper,
            [{ id: 0, label: 'mock' }],
            'test'
        );
        expect(result).toEqual([{ id: 0, label: 'mock' }]);
    });

    it('should return fallback on thrown exception', async () => {
        const result = await queryWithFallback(
            () => Promise.reject(new Error('network')),
            mapper,
            () => [{ id: -1, label: 'offline' }],
            'test'
        );
        expect(result).toEqual([{ id: -1, label: 'offline' }]);
    });

    it('should call fallback function when fallback is a function', async () => {
        const fallbackFn = vi.fn(() => [{ id: 99, label: 'fn-fallback' }]);
        const result = await queryWithFallback(
            () => Promise.resolve({ data: null, error: { message: 'err' } }),
            mapper,
            fallbackFn,
            'test'
        );
        expect(fallbackFn).toHaveBeenCalled();
        expect(result).toEqual([{ id: 99, label: 'fn-fallback' }]);
    });
});

describe('queryOneWithFallback', () => {
    beforeEach(() => {
        vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    const mapper = (row: { id: number }) => ({ mappedId: row.id });

    it('should map single row on success', async () => {
        const result = await queryOneWithFallback(
            () => Promise.resolve({ data: { id: 42 }, error: null }),
            mapper,
            undefined,
            'test'
        );
        expect(result).toEqual({ mappedId: 42 });
    });

    it('should return undefined on PGRST116 (not found)', async () => {
        const result = await queryOneWithFallback(
            () => Promise.resolve({ data: null, error: { message: 'not found', code: 'PGRST116' } }),
            mapper,
            { mappedId: -1 },
            'test'
        );
        expect(result).toBeUndefined();
    });

    it('should return fallback on non-PGRST116 error', async () => {
        const result = await queryOneWithFallback(
            () => Promise.resolve({ data: null, error: { message: 'server error', code: '500' } }),
            mapper,
            { mappedId: -1 },
            'test'
        );
        expect(result).toEqual({ mappedId: -1 });
    });

    it('should return fallback when data is null', async () => {
        const fallbackFn = vi.fn(() => ({ mappedId: 0 }));
        const result = await queryOneWithFallback(
            () => Promise.resolve({ data: null, error: null }),
            mapper,
            fallbackFn,
            'test'
        );
        expect(fallbackFn).toHaveBeenCalled();
        expect(result).toEqual({ mappedId: 0 });
    });

    it('should return fallback on thrown exception', async () => {
        const result = await queryOneWithFallback(
            () => Promise.reject(new Error('timeout')),
            mapper,
            () => ({ mappedId: -99 }),
            'test'
        );
        expect(result).toEqual({ mappedId: -99 });
    });
});
