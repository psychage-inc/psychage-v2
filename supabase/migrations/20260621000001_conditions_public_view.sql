-- =====================================================
-- Migration: Conditions reference — field-level gate (public masking view)
-- Date: 2026-06-21
--
-- Context:
--   /conditions rendered blank. The verification gate was enforced at the ROW level
--   (anon reads verified rows only); nothing is verified yet, so every condition was
--   hidden. The condition NAME + ICD-11 code + family is factual WHO reference and must
--   always be visible; only the four plain-language DEFINITION fields are interpretive
--   clinical content that stays gated.
--
--   This migration adds the public read path for `conditions_reference` (created in
--   20260620000003): a column-masking VIEW that exposes the full taxonomy for ALL rows
--   always, and each definition field ONLY when verification_status='verified' (else
--   NULL). The base table keeps its verified-only anon RLS, so anon can never read an
--   unverified definition directly either. Admins read drafts via the base table (that
--   is how ?preview surfaces unverified copy for review).
--
-- Absolute gate (unchanged): no row is marked verified here; no definition is authored
-- or published. Unverified definition TEXT never reaches anon — masked in the view,
-- withheld by RLS in the base table.
-- =====================================================

-- Public masking view -----------------------------------------------------------
-- Taxonomy columns for every row, always. The four authored definition fields are
-- CASE-masked to NULL until the row is verified. Runs with the view owner's privileges
-- (security_invoker OFF, the default) so anon sees the full taxonomy for ALL rows while
-- the base table's verified-only RLS stays intact underneath. The view exposes only
-- masked columns, so the row-level bypass is intended and safe.
CREATE OR REPLACE VIEW public.conditions_reference_public AS
SELECT
    id,
    slug,
    name,
    icd11_code,
    icd11_grouping,
    crisis_flag,
    provenance,
    reading_level,
    verification_status,
    CASE WHEN verification_status = 'verified' THEN short_definition        END AS short_definition,
    CASE WHEN verification_status = 'verified' THEN what_it_feels_like       END AS what_it_feels_like,
    CASE WHEN verification_status = 'verified' THEN how_it_differs           END AS how_it_differs,
    CASE WHEN verification_status = 'verified' THEN when_more_than_everyday  END AS when_more_than_everyday
FROM public.conditions_reference;

COMMENT ON VIEW public.conditions_reference_public IS
    'Public read path for /conditions. Owner-privileged (security_invoker OFF) so anon '
    'sees the full ICD-11 taxonomy for every row; the four definition fields are '
    'CASE-masked to NULL until verification_status=verified. Unverified definition text '
    'never reaches anon here, nor via the base table (verified-only RLS).';

GRANT SELECT ON public.conditions_reference_public TO anon, authenticated;
