import { describe, it, expect, vi, beforeEach } from 'vitest';
import { listConditions, getConditionBySlug } from '../conditionsService';
import { conditionsTaxonomy } from '@/data/conditions/taxonomy';
import { hasDefinition } from '@/types/condition';

const mockMaybeSingle = vi.fn();
const mockQueryResult = vi.fn();
const fromMock = vi.fn();

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
        from: (table: string) => {
            fromMock(table);
            return chain;
        },
    },
}));

/** A fully-populated (verified) row as the masking view returns it. */
function verifiedRow(over: Partial<Record<string, unknown>> = {}) {
    return {
        id: 'id-1',
        slug: 'schizophrenia',
        name: 'Schizophrenia',
        icd11_code: '6A20',
        icd11_grouping: 'Schizophrenia or other primary psychotic disorders',
        short_definition: 'A disorder of perception and thought.',
        what_it_feels_like: 'Reality can feel altered.',
        how_it_differs: 'Distinct from mood disorders.',
        when_more_than_everyday: 'Persistent and impairing.',
        crisis_flag: false,
        provenance: 'ICD-11 6A20',
        verification_status: 'verified',
        reading_level: '8th grade',
        ...over,
    };
}

/** An unverified row as the masking view returns it — definition fields nulled. */
function maskedRow(over: Partial<Record<string, unknown>> = {}) {
    return verifiedRow({
        id: 'id-2',
        slug: 'autism-spectrum-disorder',
        name: 'Autism spectrum disorder',
        icd11_code: '6A02',
        icd11_grouping: 'Neurodevelopmental disorders',
        short_definition: null,
        what_it_feels_like: null,
        how_it_differs: null,
        when_more_than_everyday: null,
        verification_status: 'unverified',
        ...over,
    });
}

describe('conditionsService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        resetChain();
        vi.spyOn(console, 'error').mockImplementation(() => {});
        // Default: DB returns nothing → service falls back to the draft-free taxonomy.
        mockQueryResult.mockResolvedValue({ data: [], error: null });
        mockMaybeSingle.mockResolvedValue({ data: null, error: null });
    });

    describe('read path selection (field-level gate)', () => {
        it('public list reads the conditions_reference_public masking view', async () => {
            await listConditions();
            expect(fromMock).toHaveBeenCalledWith('conditions_reference_public');
            expect(fromMock).not.toHaveBeenCalledWith('conditions_reference');
        });

        it('preview list reads the base conditions_reference table (RLS-gated)', async () => {
            await listConditions({ includeUnverified: true });
            expect(fromMock).toHaveBeenCalledWith('conditions_reference');
            expect(fromMock).not.toHaveBeenCalledWith('conditions_reference_public');
        });

        it('public detail reads the view; preview detail reads the base table', async () => {
            await getConditionBySlug('schizophrenia');
            expect(fromMock).toHaveBeenCalledWith('conditions_reference_public');
            fromMock.mockClear();
            await getConditionBySlug('schizophrenia', { includeUnverified: true });
            expect(fromMock).toHaveBeenCalledWith('conditions_reference');
        });
    });

    describe('returns server rows as-is (definitions already masked server-side)', () => {
        it('keeps a verified row’s definitions and a masked row’s nulls', async () => {
            mockQueryResult.mockResolvedValue({
                data: [verifiedRow(), maskedRow()],
                error: null,
            });
            const result = await listConditions();

            // Sorted by name: "Autism…" before "Schizophrenia".
            expect(result.map((c) => c.slug)).toEqual([
                'autism-spectrum-disorder',
                'schizophrenia',
            ]);

            const verified = result.find((c) => c.slug === 'schizophrenia')!;
            expect(verified.verification_status).toBe('verified');
            expect(hasDefinition(verified)).toBe(true);

            const masked = result.find((c) => c.slug === 'autism-spectrum-disorder')!;
            expect(masked.verification_status).toBe('unverified');
            expect(hasDefinition(masked)).toBe(false);
        });
    });

    describe('fallback is draft-free', () => {
        it('falls back to the full taxonomy when the DB returns nothing', async () => {
            const result = await listConditions();
            expect(result).toHaveLength(conditionsTaxonomy.length);
            const names = result.map((c) => c.name);
            expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
        });

        it('falls back on a query error too', async () => {
            mockQueryResult.mockResolvedValue({ data: null, error: { message: 'boom' } });
            const result = await listConditions();
            expect(result).toHaveLength(conditionsTaxonomy.length);
        });

        it('NEVER carries definition text in the fallback (drafts stay off the client)', async () => {
            const result = await listConditions();
            expect(result.length).toBeGreaterThan(100);
            for (const c of result) {
                expect(hasDefinition(c)).toBe(false);
                expect(c.short_definition).toBeNull();
                expect(c.what_it_feels_like).toBeNull();
                expect(c.how_it_differs).toBeNull();
                expect(c.when_more_than_everyday).toBeNull();
                // Taxonomy stays factual + unverified.
                expect(c.verification_status).toBe('unverified');
                expect(c.crisis_flag).toBe(false);
                expect(c.icd11_code).toBeTruthy();
                expect(c.provenance).toBeTruthy();
            }
        });
    });

    describe('getConditionBySlug', () => {
        it('returns a verified condition with its definitions (view reveals them)', async () => {
            mockMaybeSingle.mockResolvedValue({ data: verifiedRow(), error: null });
            const cond = await getConditionBySlug('schizophrenia');
            expect(cond).not.toBeNull();
            expect(cond!.icd11_code).toBe('6A20');
            expect(hasDefinition(cond!)).toBe(true);
        });

        it('returns an unverified condition with masked (null) definitions', async () => {
            mockMaybeSingle.mockResolvedValue({ data: maskedRow(), error: null });
            const cond = await getConditionBySlug('autism-spectrum-disorder');
            expect(cond).not.toBeNull();
            expect(cond!.verification_status).toBe('unverified');
            expect(hasDefinition(cond!)).toBe(false);
        });

        it('falls back to a draft-free taxonomy row when the DB is empty', async () => {
            const cond = await getConditionBySlug('generalized-anxiety-disorder');
            expect(cond).not.toBeNull();
            expect(cond!.icd11_code).toBe('6B00');
            expect(hasDefinition(cond!)).toBe(false);
        });

        it('returns null for an unknown slug', async () => {
            const missing = await getConditionBySlug('not-a-real-condition');
            expect(missing).toBeNull();
        });
    });
});
