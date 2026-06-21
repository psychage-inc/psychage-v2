/**
 * The full ICD-11 Chapter 6 conditions corpus — the single source of truth for the
 * Conditions reference.
 *
 * Codes, names, and family groupings are ICD-11 reference data (Mental, behavioural or
 * neurodevelopmental disorders), ingested at the four-character-category level. The
 * four plain-language fields and `provenance` were authored to the GAD calibration in
 * one session. NOTHING here is verified or published: every derived row is
 * `verification_status = 'unverified'` and `crisis_flag = false` (the crisis decision
 * is a clinical one, left for Dr. Dobson's review). This file also serves as the
 * mock/fallback dataset so the reference renders without a seeded database.
 */

import type { Condition, ConditionSeed } from '@/types/condition';
import { ICD11_GROUPINGS } from './groupings';
import { icd11GroupingToTopGroup } from './taxonomyGroup';
import { neuroPsychoticCatatoniaMood } from './families/01-neuro-psychotic-catatonia-mood';
import { anxietyOcdStressDissociativeEating } from './families/02-anxiety-ocd-stress-dissociative-eating';
import { eliminationBodilySubstance } from './families/03-elimination-bodily-substance';
import { impulseDisruptivePersonalityParaphilicFactitious } from './families/04-impulse-disruptive-personality-paraphilic-factitious';
import { neurocognitivePerinatalSecondary } from './families/05-neurocognitive-perinatal-secondary';

/** Default reading level applied to every authored row. */
export const DEFAULT_READING_LEVEL = '8th grade';

/** Every ICD-11 Chapter 6 condition, in ICD-11 chapter order. */
export const icd11Conditions: ConditionSeed[] = [
    ...neuroPsychoticCatatoniaMood,
    ...anxietyOcdStressDissociativeEating,
    ...eliminationBodilySubstance,
    ...impulseDisruptivePersonalityParaphilicFactitious,
    ...neurocognitivePerinatalSecondary,
];

/**
 * Turn an authored seed into a full Condition row. Applies the gate defaults that the
 * database also enforces: unverified, no crisis flag, fixed reading level.
 */
export function seedToCondition(seed: ConditionSeed): Condition {
    return {
        ...seed,
        taxonomy_group: icd11GroupingToTopGroup(seed.icd11_grouping),
        related_category_slug: null,
        crisis_flag: false,
        verification_status: 'unverified',
        reading_level: DEFAULT_READING_LEVEL,
    };
}

/** The corpus as Condition rows, all unverified — used as the mock/fallback source. */
export const conditionsCorpus: Condition[] = icd11Conditions.map(seedToCondition);

// --- Integrity guards (dev only) -------------------------------------------
// Catch a duplicate slug/code or an unknown grouping at import time during
// development so the corpus can never silently drift. Stripped from production.
if (import.meta.env?.DEV) {
    const slugs = new Set<string>();
    const codes = new Set<string>();
    const groupings = new Set<string>(ICD11_GROUPINGS);
    for (const c of icd11Conditions) {
        if (slugs.has(c.slug)) console.error(`[conditions] duplicate slug: ${c.slug}`);
        if (codes.has(c.icd11_code)) console.error(`[conditions] duplicate code: ${c.icd11_code}`);
        if (!groupings.has(c.icd11_grouping))
            console.error(`[conditions] unknown grouping for ${c.slug}: ${c.icd11_grouping}`);
        slugs.add(c.slug);
        codes.add(c.icd11_code);
    }
}
