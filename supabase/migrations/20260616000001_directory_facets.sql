-- =============================================================================
-- directory_facets — honest per-state / per-city / per-type provider counts
--
-- Backs the Find-Care flow's "never hardcode counts" + "disable zero-yield
-- options" rules. Each function GROUPs on the SAME columns search_providers_v3
-- filters on (see 20260429000001_search_providers_v3_geo_and_correctness.sql):
--   • state  → provider_locations.state_province (primary location, upper-cased)
--   • city   → provider_locations.city (primary location)
--   • type   → providers.provider_type_id
-- so a facet count can never disagree with the result list that selecting it
-- produces. Scope mirrors the search RPC exactly: status IN ('active','seeded'),
-- primary location only, and the hidden Crisis Service type excluded (it is
-- surfaced via /crisis, never browsed — mirrors HIDDEN_PROVIDER_TYPE_IDS in
-- apps/mobile/features/directory/queries.ts).
--
-- These read PUBLIC reference data only (no PII, no symptom/mood/navigator
-- state). SECURITY DEFINER + STABLE, granted to anon + authenticated like the
-- search RPC. A short statement_timeout guards the 423k-row aggregate.
--
-- NOTE (deploy): the providers + provider_locations tables live in the WEB repo's
-- migrations and on the live shared DB. This file is authored in the mobile repo
-- for record; it is APPLIED via the web repo (copy into ~/dev/psychage-v2 and
-- `db push --include-all`) — the mobile repo cannot db push (history guard).
-- =============================================================================

-- Hidden Crisis Service provider type — excluded from every directory facet.
-- (kept inline as a literal so the function is self-contained / copy-portable)

CREATE OR REPLACE FUNCTION public.directory_state_counts()
RETURNS TABLE (state text, provider_count bigint)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET statement_timeout = '15s'
AS $$
  SELECT pl.state_province AS state, COUNT(DISTINCT p.id) AS provider_count
  FROM public.providers p
  JOIN public.provider_locations pl
    ON pl.provider_id = p.id AND pl.is_primary = true
  WHERE p.status IN ('active', 'seeded')
    AND p.provider_type_id <> 'e3e49ec2-4ab6-45e0-87f5-40bc9f3931fe'::uuid
    AND pl.state_province IS NOT NULL
    AND pl.state_province <> ''
  GROUP BY pl.state_province;
$$;

CREATE OR REPLACE FUNCTION public.directory_city_counts(p_state text)
RETURNS TABLE (city text, provider_count bigint)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET statement_timeout = '15s'
AS $$
  SELECT pl.city AS city, COUNT(DISTINCT p.id) AS provider_count
  FROM public.providers p
  JOIN public.provider_locations pl
    ON pl.provider_id = p.id AND pl.is_primary = true
  WHERE p.status IN ('active', 'seeded')
    AND p.provider_type_id <> 'e3e49ec2-4ab6-45e0-87f5-40bc9f3931fe'::uuid
    AND (p_state IS NULL OR p_state = '' OR pl.state_province = upper(p_state))
    AND pl.city IS NOT NULL
    AND pl.city <> ''
  GROUP BY pl.city
  ORDER BY provider_count DESC, pl.city ASC;
$$;

CREATE OR REPLACE FUNCTION public.directory_type_counts(p_state text, p_city text)
RETURNS TABLE (provider_type_id uuid, provider_count bigint)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET statement_timeout = '15s'
AS $$
  SELECT p.provider_type_id, COUNT(DISTINCT p.id) AS provider_count
  FROM public.providers p
  JOIN public.provider_locations pl
    ON pl.provider_id = p.id AND pl.is_primary = true
  WHERE p.status IN ('active', 'seeded')
    AND p.provider_type_id <> 'e3e49ec2-4ab6-45e0-87f5-40bc9f3931fe'::uuid
    AND (p_state IS NULL OR p_state = '' OR pl.state_province = upper(p_state))
    AND (p_city IS NULL OR p_city = '' OR pl.city ILIKE '%' || p_city || '%')
  GROUP BY p.provider_type_id;
$$;

GRANT EXECUTE ON FUNCTION public.directory_state_counts() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.directory_city_counts(text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.directory_type_counts(text, text) TO anon, authenticated;
