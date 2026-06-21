/**
 * Conditions reference data-access.
 *
 * THE GATE IS FIELD-LEVEL AND SERVER-AUTHORITATIVE.
 *
 * The condition NAME + ICD-11 code + family is factual WHO reference and is ALWAYS
 * public. Only the four plain-language DEFINITION fields are interpretive clinical
 * content, gated behind `verification_status = 'verified'`.
 *
 *   - Public reads hit the `conditions_reference_public` VIEW: it returns the full taxonomy for
 *     every row, and each definition field only when verified (else NULL). Unverified
 *     definition TEXT is masked server-side — it never reaches anon over the API.
 *   - Preview (`?preview=1`) reads the base `conditions` table directly. RLS does the
 *     gating: admins (clinical reviewers) read unverified drafts for review; everyone
 *     else gets verified rows only.
 *   - When the DB is unreachable, both paths fall back to `conditionsTaxonomy` — a
 *     draft-free, taxonomy-only dataset — so the A–Z still renders without ever shipping
 *     unverified definition text to the client.
 *
 * Nothing here can mark a row verified or publish a definition.
 */

import { supabase } from '@/lib/supabaseClient';
import type { Condition } from '@/types/condition';
import { conditionsTaxonomy } from '@/data/conditions/taxonomy';
import { icd11GroupingToTopGroup } from '@/data/conditions/taxonomyGroup';

/** Public masking view — full taxonomy always, definitions only when verified. */
const PUBLIC_VIEW = 'conditions_reference_public';
/** Base table — verified-only for anon, everything for admins (RLS). Preview reads this. */
const BASE_TABLE = 'conditions_reference';

const COLUMNS =
    'id, slug, name, icd11_code, icd11_grouping, short_definition, what_it_feels_like, how_it_differs, when_more_than_everyday, crisis_flag, provenance, verification_status, reading_level';

interface ConditionRow {
    id?: string;
    slug: string;
    name: string;
    icd11_code: string;
    icd11_grouping: string;
    /** Optional hub link; not in the default COLUMNS select until the column ships. */
    related_category_slug?: string | null;
    short_definition: string | null;
    what_it_feels_like: string | null;
    how_it_differs: string | null;
    when_more_than_everyday: string | null;
    crisis_flag: boolean | null;
    provenance: string | null;
    verification_status: string | null;
    reading_level: string | null;
}

/** Map a raw Supabase row (view or base table) to the `Condition` model. */
function mapRow(row: ConditionRow): Condition {
    return {
        id: row.id,
        slug: row.slug,
        name: row.name,
        icd11_code: row.icd11_code,
        icd11_grouping: row.icd11_grouping,
        taxonomy_group: icd11GroupingToTopGroup(row.icd11_grouping),
        related_category_slug: row.related_category_slug ?? null,
        short_definition: row.short_definition ?? null,
        what_it_feels_like: row.what_it_feels_like ?? null,
        how_it_differs: row.how_it_differs ?? null,
        when_more_than_everyday: row.when_more_than_everyday ?? null,
        crisis_flag: Boolean(row.crisis_flag),
        provenance: row.provenance ?? null,
        verification_status:
            row.verification_status === 'verified' ? 'verified' : 'unverified',
        reading_level: row.reading_level ?? '8th grade',
    };
}

const byName = (a: Condition, b: Condition) => a.name.localeCompare(b.name);

export interface ConditionQueryOptions {
    /** When true (preview mode), read the base table so admins see unverified drafts. */
    includeUnverified?: boolean;
}

/**
 * All conditions for the A–Z index, sorted by name.
 *
 * Public reads the masking view (taxonomy always, definitions masked); preview reads the
 * base table (RLS-gated). Falls back to the draft-free taxonomy when the DB returns
 * nothing or errors, so the index is never blank and never leaks drafts.
 */
export async function listConditions(
    opts: ConditionQueryOptions = {},
): Promise<Condition[]> {
    const source = opts.includeUnverified ? BASE_TABLE : PUBLIC_VIEW;
    try {
        const { data, error } = await supabase
            .from(source)
            .select(COLUMNS)
            .order('name', { ascending: true });
        if (error) throw error;
        const rows = (data ?? []).map(mapRow);
        if (rows.length > 0) return rows.sort(byName);
    } catch (error) {
        console.error('[conditionsService.listConditions] read failed, using taxonomy fallback:', error);
    }
    // DB unseeded/unreachable (or preview for a non-admin): show the taxonomy, no drafts.
    return [...conditionsTaxonomy].sort(byName);
}

/**
 * A single condition by slug. Public reads the masking view; preview reads the base
 * table (admins see drafts, others see verified-only via RLS). Falls back to the
 * draft-free taxonomy row so a missing/unseeded DB still renders the page.
 */
export async function getConditionBySlug(
    slug: string,
    opts: ConditionQueryOptions = {},
): Promise<Condition | null> {
    const source = opts.includeUnverified ? BASE_TABLE : PUBLIC_VIEW;
    try {
        const { data, error } = await supabase
            .from(source)
            .select(COLUMNS)
            .eq('slug', slug)
            .maybeSingle();
        if (error) throw error;
        if (data) return mapRow(data);
    } catch (error) {
        console.error(`[conditionsService.getConditionBySlug] read failed for "${slug}", using taxonomy fallback:`, error);
    }
    // Fallback carries no definition text, so preview for a non-admin (base table
    // returned nothing) cannot leak drafts here either.
    return conditionsTaxonomy.find((c) => c.slug === slug) ?? null;
}

/** The ICD-11 family groupings present in the corpus, in chapter order, for the filter UI. */
export { ICD11_GROUPINGS } from '@/data/conditions/groupings';
