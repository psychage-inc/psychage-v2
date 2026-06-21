/**
 * Conditions reference — ICD-11 Chapter 6 standalone entity.
 *
 * This is NOT the Symptom Navigator (`navigator_conditions`) and is NOT mapped to
 * the 30 article categories. It is a flat, A–Z + ICD-11-family reference covering
 * every ICD-11 Chapter 6 four-character category. Plain-language copy is authored
 * for clinical review and stored as `verification_status = 'unverified'`; the public
 * surface renders verified rows only (gate enforced in conditionsService).
 */

import type { TopGroupId } from '../config/taxonomy';

export type VerificationStatus = 'unverified' | 'verified';

/**
 * One titled block of the optional "in depth" layer (signs & symptoms, causes, treatment,
 * …). Ordered; rendered below the four core fields. Interpretive clinical content — gated
 * with the rest of the definition (masked until verified).
 */
export interface DeepSection {
    heading: string;
    body: string;
}

/** A reputable reference for a condition's content (WHO ICD-11, NHS, NIMH, …). */
export interface ConditionSource {
    label: string;
    url: string;
}

/**
 * A condition row as stored / fetched. Snake_case mirrors the Supabase columns so
 * rows can be used directly without remapping.
 */
export interface Condition {
    id?: string;
    slug: string;
    name: string;
    icd11_code: string;
    icd11_grouping: string;
    /**
     * Top-level Learn taxonomy group, DERIVED from the ICD-11 family. This is IA
     * categorization (which shelf the condition sits on), never clinical copy.
     */
    taxonomy_group?: TopGroupId;
    /**
     * Optional link to a Learn article category — the "everything on X" hub. Empty
     * until a content editor sets it; carries no clinical/diagnostic copy.
     */
    related_category_slug?: string | null;
    /** "What it is" — one or two plain sentences. */
    short_definition: string | null;
    /** "What it feels like" — lived, third-person, non-diagnostic. */
    what_it_feels_like: string | null;
    /** "How it differs" — distinguishes from its closest siblings. */
    how_it_differs: string | null;
    /** "When it's more than the everyday" — the threshold, framed as common-not-normal. */
    when_more_than_everyday: string | null;
    /**
     * Optional deeper layer — an ordered list of titled sections that actually teach the
     * condition (symptoms, causes, treatment, …). Empty/null when only the core fields
     * exist. Gated with the definition (masked until verified).
     */
    deep_sections?: DeepSection[] | null;
    /** Optional reputable references backing the deeper content. Gated until verified. */
    sources?: ConditionSource[] | null;
    /**
     * Clinical decision left for review — never set during authoring. Surfaces crisis
     * support prominently when true.
     */
    crisis_flag: boolean;
    /** Source basis, e.g. "ICD-11 6B00 / DSM-5-TR GAD". */
    provenance: string | null;
    verification_status: VerificationStatus;
    reading_level: string;
}

/**
 * The authored seed shape. Codes/names/groupings come from ICD-11 reference data —
 * never invented. `crisis_flag`, `verification_status` and `reading_level` are set
 * by the DB defaults / left for review, so they are absent here by design.
 */
export interface ConditionSeed {
    slug: string;
    name: string;
    icd11_code: string;
    icd11_grouping: string;
    short_definition: string;
    what_it_feels_like: string;
    how_it_differs: string;
    when_more_than_everyday: string;
    provenance: string;
}

/** The four authored definition fields, in display order. */
export const DEFINITION_FIELDS = [
    'short_definition',
    'what_it_feels_like',
    'how_it_differs',
    'when_more_than_everyday',
] as const;

export type DefinitionField = (typeof DEFINITION_FIELDS)[number];

/** True when at least one of the four authored definition fields has content. */
export function hasDefinition(condition: Pick<Condition, DefinitionField>): boolean {
    return DEFINITION_FIELDS.some((field) => {
        const value = condition[field];
        return typeof value === 'string' && value.trim().length > 0;
    });
}

/** The fixed educational disclaimer, shown verbatim on every condition page. */
export const CONDITION_DISCLAIMER =
    'Educational, not a diagnosis or a substitute for professional care.';
