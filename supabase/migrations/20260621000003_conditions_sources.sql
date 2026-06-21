-- =====================================================
-- Migration: Conditions reference — per-condition sources (citations)
-- Date: 2026-06-21
--
-- Adds an optional `sources` list so each condition's deeper content can cite reputable
-- references (WHO ICD-11, NHS, NIMH, Mayo, DSM-5-TR, …):
--     sources = [ { "label": "...", "url": "https://..." }, ... ]
-- Masked by the conditions_reference_public view until verified, exactly like the
-- definition fields and deep_sections.
-- =====================================================

ALTER TABLE public.conditions_reference
    ADD COLUMN IF NOT EXISTS sources JSONB;

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
    CASE WHEN verification_status = 'verified' THEN deep_sections            END AS deep_sections,
    CASE WHEN verification_status = 'verified' THEN sources                  END AS sources
FROM public.conditions_reference;

GRANT SELECT ON public.conditions_reference_public TO anon, authenticated;
