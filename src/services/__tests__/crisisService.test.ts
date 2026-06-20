import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getCrisisResources, listCrisisCountries } from '../crisisService';

const mockMaybeSingle = vi.fn();
const mockQueryResult = vi.fn();

const buildChain = () => {
    const chain: any = {};
    const self = () => chain;
    chain.select = vi.fn(self);
    chain.eq = vi.fn(self);
    chain.order = vi.fn(self);
    chain.maybeSingle = mockMaybeSingle;
    // Awaiting the chain (terminal .order() / list queries) resolves here.
    chain.then = (resolve: any, reject: any) => mockQueryResult().then(resolve, reject);
    return chain;
};

const chain = buildChain();

vi.mock('@/lib/supabaseClient', () => ({
    supabase: {
        from: vi.fn(() => chain),
    },
}));

function resetChain() {
    const self = () => chain;
    chain.select = vi.fn(self);
    chain.eq = vi.fn(self);
    chain.order = vi.fn(self);
    chain.maybeSingle = mockMaybeSingle;
    chain.then = (resolve: any, reject: any) => mockQueryResult().then(resolve, reject);
}

describe('crisisService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        resetChain();
        vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    describe('getCrisisResources', () => {
        it('returns the S11 gap state for a country with no verified helplines (ET)', async () => {
            mockMaybeSingle.mockResolvedValue({
                data: { emergency_number: '907', emergency_note: '911 police, 907 ambulance; varies regionally', has_verified_helplines: false },
                error: null,
            });
            mockQueryResult.mockResolvedValue({ data: [], error: null });

            const result = await getCrisisResources('ET');

            expect(result.hasVerifiedHelplines).toBe(false);
            expect(result.helplines).toEqual([]);
            expect(result.emergencyNumber).toBe('907');
        });

        it('returns >=2 verified helplines for US, including text-capable 988', async () => {
            mockMaybeSingle.mockResolvedValue({
                data: { emergency_number: '911', emergency_note: null, has_verified_helplines: true },
                error: null,
            });
            mockQueryResult.mockResolvedValue({
                data: [
                    { name: '988 Suicide & Crisis Lifeline', description: 'National suicide and crisis line', call_number: '988', text_capable: true, text_number: '988' },
                    { name: 'Crisis Text Line', description: 'Free 24/7 crisis text support', call_number: null, text_capable: true, text_number: '741741' },
                ],
                error: null,
            });

            const result = await getCrisisResources('us'); // lower-case input normalizes

            expect(result.hasVerifiedHelplines).toBe(true);
            expect(result.helplines.length).toBeGreaterThanOrEqual(2);

            const nineEightEight = result.helplines.find((h) => h.callNumber === '988');
            expect(nineEightEight).toBeDefined();
            expect(nineEightEight!.textCapable).toBe(true);
            expect(nineEightEight!.textNumber).toBe('988');
            // region is the (upper-cased) iso2, no DB-only fields leak in
            expect(result.helplines[0].region).toBe('US');
            expect(Object.keys(result.helplines[0]).sort()).toEqual(
                ['callNumber', 'description', 'name', 'region', 'textCapable', 'textNumber'].sort(),
            );
        });

        it('returns an empty resource set when the country is unknown', async () => {
            mockMaybeSingle.mockResolvedValue({ data: null, error: null });

            const result = await getCrisisResources('ZZ');

            expect(result).toEqual({
                emergencyNumber: '',
                emergencyNote: null,
                hasVerifiedHelplines: false,
                helplines: [],
            });
        });

        it('degrades to the empty set on a country query error', async () => {
            mockMaybeSingle.mockResolvedValue({ data: null, error: { message: 'boom' } });

            const result = await getCrisisResources('US');

            expect(result.hasVerifiedHelplines).toBe(false);
            expect(result.helplines).toEqual([]);
        });
    });

    describe('listCrisisCountries', () => {
        it('maps every country to { iso2, name }', async () => {
            mockQueryResult.mockResolvedValue({
                data: [
                    { iso2: 'AR', country_name: 'Argentina' },
                    { iso2: 'US', country_name: 'United States' },
                ],
                error: null,
            });

            const result = await listCrisisCountries();

            expect(result).toEqual([
                { iso2: 'AR', name: 'Argentina' },
                { iso2: 'US', name: 'United States' },
            ]);
        });

        it('returns an empty array on error', async () => {
            mockQueryResult.mockResolvedValue({ data: null, error: { message: 'boom' } });

            const result = await listCrisisCountries();

            expect(result).toEqual([]);
        });
    });
});
