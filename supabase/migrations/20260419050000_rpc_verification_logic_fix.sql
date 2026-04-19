-- =============================================================================
-- Phase 0.6 / Correction 1: fix verification logic in search_providers_v2 RPC
--
-- The RPC previously used OR for the 'verified' filter:
--   verified_at IS NOT NULL OR status IN ('verified', 'active')
-- This granted "verified" status to any active provider regardless of whether
-- verified_at was actually set. Phase 2b's UI logic uses AND, so without this
-- fix the filter and the badge disagree (user-visible incoherence).
--
-- This migration:
--   1. Changes OR to AND in the 'verified' filter branch (count query, line ~201)
--   2. Changes OR to AND in the 'verified' filter branch (main query, line ~302)
--   3. Preserves the 'listed' filter branch (already correct AND logic)
--   4. Preserves ALL other function body behavior (15 params, 27 return columns,
--      sort order, trigram index usage, count estimation, JSONB aggregation)
--   5. Preserves function signature, return type, STABLE/SECURITY DEFINER markers
-- =============================================================================

DROP FUNCTION IF EXISTS public.search_providers_v2;

CREATE OR REPLACE FUNCTION public.search_providers_v2(
  p_query text DEFAULT NULL,
  p_provider_type_ids uuid[] DEFAULT NULL,
  p_specialty_slugs text[] DEFAULT NULL,
  p_language_ids uuid[] DEFAULT NULL,
  p_competency_ids uuid[] DEFAULT NULL,
  p_insurance_plan_ids uuid[] DEFAULT NULL,
  p_telehealth boolean DEFAULT NULL,
  p_in_person boolean DEFAULT NULL,
  p_accepting boolean DEFAULT NULL,
  p_state text DEFAULT NULL,
  p_city text DEFAULT NULL,
  p_verification_status text DEFAULT NULL,
  p_sort text DEFAULT 'relevance',
  p_limit int DEFAULT 20,
  p_offset int DEFAULT 0
)
RETURNS TABLE (
  id uuid,
  display_name text,
  credentials_suffix text,
  bio text,
  photo_url text,
  status text,
  tier text,
  practice_name text,
  phone text,
  email text,
  website_url text,
  appointment_url text,
  npi_number text,
  telehealth_available boolean,
  in_person_available boolean,
  is_accepting_patients boolean,
  verified_at timestamptz,
  trust_score_cached numeric,
  provider_type_slug text,
  provider_type_label text,
  primary_city text,
  primary_state text,
  specialty_tags jsonb,
  language_tags jsonb,
  competency_tags jsonb,
  insurance_tags jsonb,
  total_count bigint
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET statement_timeout = '15s'
AS $$
DECLARE
  v_total bigint;
  v_has_filters boolean;
BEGIN
  -- Determine if any filters are active
  v_has_filters := (
    (p_query IS NOT NULL AND p_query != '')
    OR p_provider_type_ids IS NOT NULL
    OR p_specialty_slugs IS NOT NULL
    OR p_language_ids IS NOT NULL
    OR p_competency_ids IS NOT NULL
    OR p_insurance_plan_ids IS NOT NULL
    OR p_telehealth IS NOT NULL
    OR p_in_person IS NOT NULL
    OR p_accepting IS NOT NULL
    OR (p_state IS NOT NULL AND p_state != '')
    OR (p_city IS NOT NULL AND p_city != '')
    OR (p_verification_status IS NOT NULL AND p_verification_status != '')
  );

  -- =========================================================================
  -- FAST PATH: no filters, relevance sort → use covering index directly
  -- =========================================================================
  IF NOT v_has_filters AND p_sort != 'name' THEN
    SELECT GREATEST(c.reltuples::bigint, 0) INTO v_total
    FROM pg_class c
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE c.relname = 'providers' AND n.nspname = 'public';

    IF v_total <= 0 THEN
      v_total := 200000;
    END IF;

    RETURN QUERY
    SELECT
      p.id,
      p.display_name,
      p.credentials_suffix,
      p.bio,
      p.photo_url,
      p.status,
      p.tier,
      p.practice_name,
      p.phone,
      p.email,
      p.website_url,
      p.appointment_url,
      p.npi_number,
      p.telehealth_available,
      p.in_person_available,
      p.is_accepting_patients,
      p.verified_at,
      p.trust_score_cached,
      pt.slug AS provider_type_slug,
      pt.label AS provider_type_label,
      pl.city AS primary_city,
      pl.state_province AS primary_state,
      COALESCE(
        (SELECT jsonb_agg(jsonb_build_object('slug', s.slug, 'label', s.label, 'category', s.category))
         FROM public.provider_specialties ps
         JOIN public.specialties s ON s.id = ps.specialty_id
         WHERE ps.provider_id = p.id),
        '[]'::jsonb
      ) AS specialty_tags,
      COALESCE(
        (SELECT jsonb_agg(jsonb_build_object('code', ll.code, 'label', ll.label, 'native_label', ll.native_label))
         FROM public.provider_languages pl2
         JOIN public.languages_lookup ll ON ll.id = pl2.language_id
         WHERE pl2.provider_id = p.id),
        '[]'::jsonb
      ) AS language_tags,
      COALESCE(
        (SELECT jsonb_agg(jsonb_build_object('slug', cc.slug, 'label', cc.label))
         FROM public.provider_cultural_competencies pcc2
         JOIN public.cultural_competencies cc ON cc.id = pcc2.competency_id
         WHERE pcc2.provider_id = p.id),
        '[]'::jsonb
      ) AS competency_tags,
      COALESCE(
        (SELECT jsonb_agg(jsonb_build_object('name', ip.name, 'carrier', ip.carrier))
         FROM public.provider_insurance pi2
         JOIN public.insurance_plans ip ON ip.id = pi2.insurance_plan_id
         WHERE pi2.provider_id = p.id),
        '[]'::jsonb
      ) AS insurance_tags,
      v_total AS total_count
    FROM public.providers p
    JOIN public.provider_types pt ON pt.id = p.provider_type_id
    LEFT JOIN public.provider_locations pl ON pl.provider_id = p.id AND pl.is_primary = true
    WHERE p.status IN ('active', 'seeded')
    ORDER BY
      CASE p.tier WHEN 'elite' THEN 0 WHEN 'pro' THEN 1 ELSE 2 END ASC,
      p.trust_score_cached DESC NULLS LAST,
      p.display_name ASC
    LIMIT p_limit
    OFFSET p_offset;

    RETURN;
  END IF;

  -- =========================================================================
  -- FILTERED / NAME-SORT PATH
  -- =========================================================================

  IF v_has_filters THEN
    SELECT LEAST(COUNT(DISTINCT p.id), 100000) INTO v_total
    FROM public.providers p
    LEFT JOIN public.provider_locations pl ON pl.provider_id = p.id AND pl.is_primary = true
    WHERE p.status IN ('active', 'seeded')
      AND (p_query IS NULL OR p_query = '' OR (
        p.display_name ILIKE '%' || p_query || '%'
        OR p.practice_name ILIKE '%' || p_query || '%'
        OR p.credentials_suffix ILIKE '%' || p_query || '%'
      ))
      AND (p_provider_type_ids IS NULL OR p.provider_type_id = ANY(p_provider_type_ids))
      AND (p_specialty_slugs IS NULL OR EXISTS (
        SELECT 1 FROM public.provider_specialties ps
        JOIN public.specialties s ON s.id = ps.specialty_id
        WHERE ps.provider_id = p.id AND s.slug = ANY(p_specialty_slugs)
      ))
      AND (p_language_ids IS NULL OR EXISTS (
        SELECT 1 FROM public.provider_languages plang
        WHERE plang.provider_id = p.id AND plang.language_id = ANY(p_language_ids)
      ))
      AND (p_competency_ids IS NULL OR EXISTS (
        SELECT 1 FROM public.provider_cultural_competencies pcc
        WHERE pcc.provider_id = p.id AND pcc.competency_id = ANY(p_competency_ids)
      ))
      AND (p_insurance_plan_ids IS NULL OR EXISTS (
        SELECT 1 FROM public.provider_insurance pi
        WHERE pi.provider_id = p.id AND pi.insurance_plan_id = ANY(p_insurance_plan_ids)
      ))
      AND (p_telehealth IS NULL OR p.telehealth_available = p_telehealth)
      AND (p_in_person IS NULL OR p.in_person_available = p_in_person)
      AND (p_accepting IS NULL OR p.is_accepting_patients = p_accepting)
      AND (p_state IS NULL OR p_state = '' OR pl.state_province ILIKE p_state)
      AND (p_city IS NULL OR p_city = '' OR pl.city ILIKE '%' || p_city || '%')
      -- Phase 0.6: changed OR to AND in 'verified' branch (was: verified_at IS NOT NULL OR status IN ...)
      AND (p_verification_status IS NULL OR p_verification_status = '' OR
        (p_verification_status = 'verified' AND (p.verified_at IS NOT NULL AND p.status IN ('verified', 'active')))
        OR
        (p_verification_status = 'listed' AND p.status = 'seeded' AND p.verified_at IS NULL)
      );
  ELSE
    SELECT GREATEST(c.reltuples::bigint, 0) INTO v_total
    FROM pg_class c
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE c.relname = 'providers' AND n.nspname = 'public';

    IF v_total <= 0 THEN
      v_total := 200000;
    END IF;
  END IF;

  RETURN QUERY
  SELECT
    p.id,
    p.display_name,
    p.credentials_suffix,
    p.bio,
    p.photo_url,
    p.status,
    p.tier,
    p.practice_name,
    p.phone,
    p.email,
    p.website_url,
    p.appointment_url,
    p.npi_number,
    p.telehealth_available,
    p.in_person_available,
    p.is_accepting_patients,
    p.verified_at,
    p.trust_score_cached,
    pt.slug AS provider_type_slug,
    pt.label AS provider_type_label,
    pl.city AS primary_city,
    pl.state_province AS primary_state,
    COALESCE(
      (SELECT jsonb_agg(jsonb_build_object('slug', s.slug, 'label', s.label, 'category', s.category))
       FROM public.provider_specialties ps
       JOIN public.specialties s ON s.id = ps.specialty_id
       WHERE ps.provider_id = p.id),
      '[]'::jsonb
    ) AS specialty_tags,
    COALESCE(
      (SELECT jsonb_agg(jsonb_build_object('code', ll.code, 'label', ll.label, 'native_label', ll.native_label))
       FROM public.provider_languages pl2
       JOIN public.languages_lookup ll ON ll.id = pl2.language_id
       WHERE pl2.provider_id = p.id),
      '[]'::jsonb
    ) AS language_tags,
    COALESCE(
      (SELECT jsonb_agg(jsonb_build_object('slug', cc.slug, 'label', cc.label))
       FROM public.provider_cultural_competencies pcc2
       JOIN public.cultural_competencies cc ON cc.id = pcc2.competency_id
       WHERE pcc2.provider_id = p.id),
      '[]'::jsonb
    ) AS competency_tags,
    COALESCE(
      (SELECT jsonb_agg(jsonb_build_object('name', ip.name, 'carrier', ip.carrier))
       FROM public.provider_insurance pi2
       JOIN public.insurance_plans ip ON ip.id = pi2.insurance_plan_id
       WHERE pi2.provider_id = p.id),
      '[]'::jsonb
    ) AS insurance_tags,
    v_total AS total_count
  FROM public.providers p
  JOIN public.provider_types pt ON pt.id = p.provider_type_id
  LEFT JOIN public.provider_locations pl ON pl.provider_id = p.id AND pl.is_primary = true
  WHERE p.status IN ('active', 'seeded')
    AND (p_query IS NULL OR p_query = '' OR (
      p.display_name ILIKE '%' || p_query || '%'
      OR p.practice_name ILIKE '%' || p_query || '%'
      OR p.credentials_suffix ILIKE '%' || p_query || '%'
    ))
    AND (p_provider_type_ids IS NULL OR p.provider_type_id = ANY(p_provider_type_ids))
    AND (p_specialty_slugs IS NULL OR EXISTS (
      SELECT 1 FROM public.provider_specialties ps
      JOIN public.specialties s ON s.id = ps.specialty_id
      WHERE ps.provider_id = p.id AND s.slug = ANY(p_specialty_slugs)
    ))
    AND (p_language_ids IS NULL OR EXISTS (
      SELECT 1 FROM public.provider_languages plang
      WHERE plang.provider_id = p.id AND plang.language_id = ANY(p_language_ids)
    ))
    AND (p_competency_ids IS NULL OR EXISTS (
      SELECT 1 FROM public.provider_cultural_competencies pcc
      WHERE pcc.provider_id = p.id AND pcc.competency_id = ANY(p_competency_ids)
    ))
    AND (p_insurance_plan_ids IS NULL OR EXISTS (
      SELECT 1 FROM public.provider_insurance pi
      WHERE pi.provider_id = p.id AND pi.insurance_plan_id = ANY(p_insurance_plan_ids)
    ))
    AND (p_telehealth IS NULL OR p.telehealth_available = p_telehealth)
    AND (p_in_person IS NULL OR p.in_person_available = p_in_person)
    AND (p_accepting IS NULL OR p.is_accepting_patients = p_accepting)
    AND (p_state IS NULL OR p_state = '' OR pl.state_province ILIKE p_state)
    AND (p_city IS NULL OR p_city = '' OR pl.city ILIKE '%' || p_city || '%')
    -- Phase 0.6: changed OR to AND in 'verified' branch (was: verified_at IS NOT NULL OR status IN ...)
    AND (p_verification_status IS NULL OR p_verification_status = '' OR
      (p_verification_status = 'verified' AND (p.verified_at IS NOT NULL AND p.status IN ('verified', 'active')))
      OR
      (p_verification_status = 'listed' AND p.status = 'seeded' AND p.verified_at IS NULL)
    )
  ORDER BY
    CASE WHEN p_sort = 'name' THEN p.display_name END ASC,
    CASE WHEN p_sort != 'name' THEN
      CASE p.tier WHEN 'elite' THEN 0 WHEN 'pro' THEN 1 ELSE 2 END
    END ASC,
    CASE WHEN p_sort != 'name' THEN p.trust_score_cached END DESC NULLS LAST,
    CASE WHEN p_sort != 'name' THEN p.display_name END ASC
  LIMIT p_limit
  OFFSET p_offset;
END;
$$;

COMMENT ON FUNCTION public.search_providers_v2 IS
  'Phase 0.6 correction applied 2026-04-19. Verification filter now uses AND, not OR,
   for consistency with Phase 2b UI badge logic. Original RPC behavior preserved in
   all other respects.';
