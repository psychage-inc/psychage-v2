/**
 * Conditions reference data-access.
 *
 * Source cascade (matches the rest of the service layer): Supabase `conditions`
 * (primary) → the authored ICD-11 corpus (`conditionsCorpus`) as fallback/supplement.
 * The corpus keeps the UI fully demoable before the migration is applied and, in
 * preview, supplies the unverified drafts that public RLS hides.
 *
 * THE VERIFICATION GATE LIVES HERE. The public surface renders
 * `verification_status = 'verified'` rows only — enforced server-side by RLS
 * (anon reads verified rows only) AND mirrored client-side by `applyGate`, exactly as
 * articleService filters to `status = 'published'`. Passing `{ includeUnverified: true }`
 * lifts the client gate and is wired ONLY to the `?preview=1` review surface; the DB
 * still withholds unverified rows from anon, so reviewers see them via the bundled
 * corpus. Nothing in this file can mark a row verified or publish it.
 */

import { supabase } from '@/lib/supabaseClient';
import type { Condition, VerificationStatus } from '@/types/condition';
import { conditionsCorpus } from '@/data/conditions/icd11Chapter6';

const TABLE = 'conditions';
const COLUMNS =
    'id, slug, name, icd11_code, icd11_grouping, short_definition, what_it_feels_like, how_it_differs, when_more_than_everyday, crisis_flag, provenance, verification_status, reading_level';

interface ConditionRow {
    id?: string;
    slug: string;
    name: string;
    icd11_code: string;
    icd11_grouping: string;
    short_definition: string | null;
    what_it_feels_like: string | null;
    how_it_differs: string | null;
    when_more_than_everyday: string | null;
    crisis_flag: boolean | null;
    provenance: string | null;
    verification_status: string | null;
    reading_level: string | null;
}

/** Map a raw Supabase row to the `Condition` model. */
function mapRow(row: ConditionRow): Condition {
    return {
        id: row.id,
        slug: row.slug,
        name: row.name,
        icd11_code: row.icd11_code,
        icd11_grouping: row.icd11_grouping,
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

/** Public keeps verified rows only; preview keeps everything. */
function applyGate(rows: Condition[], includeUnverified: boolean): Condition[] {
    if (includeUnverified) return rows;
    return rows.filter(
        (c) => c.verification_status === ('verified' satisfies VerificationStatus),
    );
}

const byName = (a: Condition, b: Condition) => a.name.localeCompare(b.name);

export interface ConditionQueryOptions {
    /** When true (preview mode), unverified rows are included. */
    includeUnverified?: boolean;
}

/**
 * All conditions for the A–Z index, sorted by name, gated by verification.
 *
 * Supabase rows win by slug; the corpus supplements any slug the DB did not return
 * (which, under verified-only RLS, is how preview still sees unverified drafts).
 */
export async function listConditions(
    opts: ConditionQueryOptions = {},
): Promise<Condition[]> {
    const includeUnverified = Boolean(opts.includeUnverified);
    let dbRows: Condition[] = [];
    try {
        const { data, error } = await supabase
            .from(TABLE)
            .select(COLUMNS)
            .order('name', { ascending: true });
        if (error) throw error;
        dbRows = (data ?? []).map(mapRow);
    } catch (error) {
        console.error('[conditionsService.listConditions] Supabase failed, using corpus:', error);
    }

    const seen = new Set(dbRows.map((r) => r.slug));
    const supplemented = [...dbRows, ...conditionsCorpus.filter((c) => !seen.has(c.slug))];
    return applyGate(supplemented, includeUnverified).sort(byName);
}

/** A single condition by slug. Returns null when missing or gated off the public surface. */
export async function getConditionBySlug(
    slug: string,
    opts: ConditionQueryOptions = {},
): Promise<Condition | null> {
    const includeUnverified = Boolean(opts.includeUnverified);
    try {
        const { data, error } = await supabase
            .from(TABLE)
            .select(COLUMNS)
            .eq('slug', slug)
            .maybeSingle();
        if (error) throw error;
        if (data) {
            return applyGate([mapRow(data)], includeUnverified)[0] ?? null;
        }
    } catch (error) {
        console.error(`[conditionsService.getConditionBySlug] Supabase failed for "${slug}", using corpus:`, error);
    }

    const fromCorpus = conditionsCorpus.find((c) => c.slug === slug);
    if (!fromCorpus) return null;
    return applyGate([fromCorpus], includeUnverified)[0] ?? null;
}

/** The ICD-11 family groupings present in the corpus, in chapter order, for the filter UI. */
export { ICD11_GROUPINGS } from '@/data/conditions/groupings';
