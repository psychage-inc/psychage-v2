/**
 * Authored "in depth" content for the conditions reference — the article-depth layer
 * that sits beneath the four core fields. Version-controlled here (not just in the DB)
 * so every condition's content is reviewable, diffable, and re-seedable.
 *
 * One `ConditionDeepEntry` per condition, keyed by slug. The seeder
 * (src/scripts/seedConditionDeep.ts) upserts these into conditions_reference: the
 * (fuller) core fields, the ordered deep_sections, and the sources list. Nothing here
 * flips verification_status — that is set separately.
 *
 * Voice: plain-language (~8th grade), educational, NON-diagnostic. No drug dosing, no
 * "you have X" claims; always points to a professional. ICD-11 / DSM-5-TR framed.
 */

import type { DeepSection, ConditionSource } from '@/types/condition';

export interface ConditionDeepEntry {
    /** Fuller rewrites of the four core fields (replace the short seed copy). */
    short_definition: string;
    what_it_feels_like: string;
    how_it_differs: string;
    when_more_than_everyday: string;
    /** The ordered "in depth" sections (signs & symptoms, causes, treatment, …). */
    sections: DeepSection[];
    /** Reputable references backing the content (verified-real URLs only). */
    sources: ConditionSource[];
}

/** Keyed by condition slug. */
export type ConditionDeepMap = Record<string, ConditionDeepEntry>;

/** WHO ICD-11 MMS browser — the verifiable anchor citation for every condition. */
export const WHO_ICD11: ConditionSource = {
    label: 'World Health Organization — ICD-11 for Mortality and Morbidity Statistics',
    url: 'https://icd.who.int/browse/2024-01/mms/en',
};
