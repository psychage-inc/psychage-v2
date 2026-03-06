-- =============================================================================
-- Enrich search_providers_v2 RPC — return full card data including bio,
-- practice info, languages, competencies, insurance, and contact fields.
-- Adds p_city and p_in_person filter parameters.
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
AS $$
DECLARE
  v_total bigint;
BEGIN
  -- Count total matching providers
  SELECT COUNT(DISTINCT p.id) INTO v_total
  FROM public.providers p
  LEFT JOIN public.provider_locations pl ON pl.provider_id = p.id AND pl.is_primary = true
  WHERE p.status IN ('active', 'seeded')
    AND (p_query IS NULL OR p_query = '' OR (
      p.display_name ILIKE '%' || p_query || '%'
      OR p.practice_name ILIKE '%' || p_query || '%'
      OR p.bio ILIKE '%' || p_query || '%'
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
    AND (p_city IS NULL OR p_city = '' OR pl.city ILIKE '%' || p_city || '%');

  -- Return paginated, enriched results
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
    pt.slug AS provider_type_slug,
    pt.label AS provider_type_label,
    pl.city AS primary_city,
    pl.state_province AS primary_state,
    -- All specialties (no limit)
    COALESCE(
      (SELECT jsonb_agg(jsonb_build_object('slug', s.slug, 'label', s.label, 'category', s.category))
       FROM public.provider_specialties ps
       JOIN public.specialties s ON s.id = ps.specialty_id
       WHERE ps.provider_id = p.id),
      '[]'::jsonb
    ) AS specialty_tags,
    -- All languages
    COALESCE(
      (SELECT jsonb_agg(jsonb_build_object('code', ll.code, 'label', ll.label, 'native_label', ll.native_label))
       FROM public.provider_languages pl2
       JOIN public.languages_lookup ll ON ll.id = pl2.language_id
       WHERE pl2.provider_id = p.id),
      '[]'::jsonb
    ) AS language_tags,
    -- All cultural competencies
    COALESCE(
      (SELECT jsonb_agg(jsonb_build_object('slug', cc.slug, 'label', cc.label))
       FROM public.provider_cultural_competencies pcc2
       JOIN public.cultural_competencies cc ON cc.id = pcc2.competency_id
       WHERE pcc2.provider_id = p.id),
      '[]'::jsonb
    ) AS competency_tags,
    -- All insurance plans
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
      OR p.bio ILIKE '%' || p_query || '%'
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
  ORDER BY
    CASE WHEN p_sort = 'name' THEN p.display_name END ASC,
    CASE WHEN p_sort != 'name' THEN (CASE WHEN p.tier = 'premium' THEN 0 ELSE 1 END) END ASC,
    CASE WHEN p_sort != 'name' THEN p.display_name END ASC
  LIMIT p_limit
  OFFSET p_offset;
END;
$$;
