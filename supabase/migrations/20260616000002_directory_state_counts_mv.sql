-- =============================================================================
-- directory_state_counts — back it with a materialized view
--
-- directory_state_counts() is the only directory facet that scans the full
-- ~423k-row providers table (city/type counts are state-scoped and run live in
-- <1s). The live aggregate measured 8–10s and intermittently exceeded the
-- function's statement_timeout='15s' on a cold run, returning empty — which the
-- client cached, so EVERY state rendered "None listed" (all options disabled).
--
-- The provider set is batch-imported reference data, so a precomputed MV is the
-- right shape: refresh it after an import; reads are <50ms. The RPC now selects
-- from the MV instead of recomputing. A UNIQUE index on state allows a future
-- REFRESH MATERIALIZED VIEW CONCURRENTLY (non-blocking).
--
-- Applied to the live shared DB via the web repo (mobile repo can't db push).
-- =============================================================================

CREATE MATERIALIZED VIEW IF NOT EXISTS public.mv_directory_state_counts AS
  SELECT pl.state_province AS state, COUNT(DISTINCT p.id) AS provider_count
  FROM public.providers p
  JOIN public.provider_locations pl
    ON pl.provider_id = p.id AND pl.is_primary = true
  WHERE p.status IN ('active', 'seeded')
    AND p.provider_type_id <> 'e3e49ec2-4ab6-45e0-87f5-40bc9f3931fe'::uuid
    AND pl.state_province IS NOT NULL
    AND pl.state_province <> ''
  GROUP BY pl.state_province;

CREATE UNIQUE INDEX IF NOT EXISTS mv_directory_state_counts_state_idx
  ON public.mv_directory_state_counts (state);

-- Read from the MV (fast) rather than recomputing the full-table aggregate.
CREATE OR REPLACE FUNCTION public.directory_state_counts()
RETURNS TABLE (state text, provider_count bigint)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET statement_timeout = '15s'
AS $$
  SELECT state, provider_count FROM public.mv_directory_state_counts;
$$;

GRANT SELECT ON public.mv_directory_state_counts TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.directory_state_counts() TO anon, authenticated;
