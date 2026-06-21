-- =====================================================
-- Migration: Conditions reference — depth tier (deep_sections)
-- Date: 2026-06-21
--
-- Context:
--   The four core fields (short_definition, what_it_feels_like, how_it_differs,
--   when_more_than_everyday) are the concise entry point. To let each condition page
--   actually teach, we add an OPTIONAL deeper layer: an ordered list of titled sections
--   (signs & symptoms, causes/triggers, how it's recognised, treatment & support, living
--   with it, related conditions, when to get help, …). Stored as JSONB so the section set
--   can vary per condition without schema churn:
--       deep_sections = [ { "heading": "...", "body": "..." }, ... ]
--
-- Gate (unchanged): the depth layer is interpretive clinical content, so it is masked by
-- the conditions_reference_public view exactly like the four core fields — NULL until
-- verification_status='verified'.
-- =====================================================

ALTER TABLE public.conditions_reference
    ADD COLUMN IF NOT EXISTS deep_sections JSONB;

-- Recreate the masking view to expose deep_sections, masked until verified.
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
    CASE WHEN verification_status = 'verified' THEN when_more_than_everyday  END AS when_more_than_everyday,
    CASE WHEN verification_status = 'verified' THEN deep_sections            END AS deep_sections
FROM public.conditions_reference;

GRANT SELECT ON public.conditions_reference_public TO anon, authenticated;
