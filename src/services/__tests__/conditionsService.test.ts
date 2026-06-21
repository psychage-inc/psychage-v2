import { describe, it, expect, vi, beforeEach } from 'vitest';
import { listConditions, getConditionBySlug } from '../conditionsService';
import { conditionsCorpus } from '@/data/conditions/icd11Chapter6';
import { hasDefinition } from '@/types/condition';

const mockMaybeSingle = vi.fn();
const mockQueryResult = vi.fn();

/** A thenable Supabase query chain whose terminal awaits resolve to `mockQueryResult`. */
interface MockChain {
    select: ReturnType<typeof vi.fn>;
    eq: ReturnType<typeof vi.fn>;
    order: ReturnType<typeof vi.fn>;
    maybeSingle: typeof mockMaybeSingle;
    then: (resolve: (value: unknown) => void, reject: (reason: unknown) => void) => void;
}

const chain = {} as MockChain;

function resetChain() {
    const self = () => chain;
    chain.select = vi.fn(self);
    chain.eq = vi.fn(self);
    chain.order = vi.fn(self);
    chain.maybeSingle = mockMaybeSingle;
    // Awaiting the chain (terminal .order() list query) resolves here.
    chain.then = (resolve, reject) => mockQueryResult().then(resolve, reject);
}
resetChain();

vi.mock('@/lib/supabaseClient', () => ({
    supabase: {
        from: vi.fn(() => chain),
    },
}));

describe('conditionsService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        resetChain();
        vi.spyOn(console, 'error').mockImplementation(() => {});
        // Empty Supabase result → service supplements entirely from the authored corpus.
        mockQueryResult.mockResolvedValue({ data: [], error: null });
        mockMaybeSingle.mockResolvedValue({ data: null, error: null });
    });

    describe('verification gate', () => {
        it('hides all unverified rows on the public surface', async () => {
            const result = await listConditions();
            // The whole corpus is unverified, so the public surface is empty.
            expect(result).toEqual([]);
        });

        it('returns every row in preview mode, sorted by name', async () => {
            const result = await listConditions({ includeUnverified: true });
            expect(result).toHaveLength(conditionsCorpus.length);
            const names = result.map((c) => c.name);
            expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
        });
    });

    describe('corpus integrity', () => {
        it('has all four authored fields on every condition', async () => {
            const result = await listConditions({ includeUnverified: true });
            for (const c of result) {
                expect(hasDefinition(c)).toBe(true);
                expect(c.short_definition).toBeTruthy();
                expect(c.what_it_feels_like).toBeTruthy();
                expect(c.how_it_differs).toBeTruthy();
                expect(c.when_more_than_everyday).toBeTruthy();
                expect(c.provenance).toBeTruthy();
            }
        });

        it('leaves every row unverified and never sets crisis_flag (gate is absolute)', async () => {
            const result = await listConditions({ includeUnverified: true });
            expect(result.length).toBeGreaterThan(100);
            for (const c of result) {
                expect(c.verification_status).toBe('unverified');
                expect(c.crisis_flag).toBe(false);
            }
        });
    });

    describe('getConditionBySlug', () => {
        it('resolves GAD with the four definition fields in preview mode', async () => {
            const gad = await getConditionBySlug('generalized-anxiety-disorder', {
                includeUnverified: true,
            });
            expect(gad).not.toBeNull();
            expect(gad!.icd11_code).toBe('6B00');
            expect(hasDefinition(gad!)).toBe(true);
            expect(gad!.short_definition).toMatch(/excessive worry/i);
        });

        it('hides the unverified GAD page on the public surface', async () => {
            const gad = await getConditionBySlug('generalized-anxiety-disorder');
            expect(gad).toBeNull();
        });

        it('returns null for an unknown slug', async () => {
            const missing = await getConditionBySlug('not-a-real-condition', {
                includeUnverified: true,
            });
            expect(missing).toBeNull();
        });
    });
});
