import { describe, it, expect } from 'vitest';
import { CONDITION_TERMS } from './condition-terms';
import { conditionsTaxonomy } from './taxonomy';

/**
 * Guard: the retrieval vocabulary must cover exactly the 113 ICD-11 conditions,
 * keyed by the canonical taxonomy slugs, with usable terms on every entry.
 */
describe('condition-terms vocabulary', () => {
    const taxonomySlugs = new Set(conditionsTaxonomy.map((c) => c.slug));

    it('covers exactly 113 conditions', () => {
        expect(Object.keys(CONDITION_TERMS)).toHaveLength(113);
        expect(taxonomySlugs.size).toBe(113);
    });

    it('every key is a real taxonomy slug', () => {
        const unknown = Object.keys(CONDITION_TERMS).filter((slug) => !taxonomySlugs.has(slug));
        expect(unknown).toEqual([]);
    });

    it('every taxonomy slug has a vocabulary entry', () => {
        const missing = [...taxonomySlugs].filter((slug) => !(slug in CONDITION_TERMS));
        expect(missing).toEqual([]);
    });

    it('every entry has at least one non-empty term and matching code/grouping', () => {
        const taxonomyBySlug = new Map(conditionsTaxonomy.map((c) => [c.slug, c]));
        for (const [slug, entry] of Object.entries(CONDITION_TERMS)) {
            expect(entry.terms.length, `${slug} has terms`).toBeGreaterThan(0);
            expect(entry.terms.every((t) => t.trim().length > 0), `${slug} terms non-empty`).toBe(true);
            const row = taxonomyBySlug.get(slug)!;
            expect(entry.icd11_code, `${slug} code`).toBe(row.icd11_code);
            expect(entry.icd11_grouping, `${slug} grouping`).toBe(row.icd11_grouping);
        }
    });
});
