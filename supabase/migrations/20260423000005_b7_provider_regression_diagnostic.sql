-- ============================================================
-- B-7 diagnostic: provider role regression states
-- ============================================================
-- Date: 2026-04-23
-- Severity: HIGH (live production regression)
-- Audit:    docs/audits/auth-hotfix-b7-incident.md
-- Source:   strip_user_metadata_role trigger (20260423000001) strips
--           the entire 'role' key from raw_user_meta_data on every
--           UPDATE. The claim-provider edge function only writes
--           user_metadata.role='provider' (does not write to
--           profiles.role), so any provider whose auth.users row has
--           been UPDATE'd since the hotfix deploy has lost their
--           provider signal. The client resolves role from
--           app_metadata.role, falls back to 'patient', and RoleGuard
--           denies /portal/* access.
--
-- This migration ships a READ-ONLY service-role RPC that enumerates
-- the affected population by state (P-A intact, P-B partial,
-- P-C stripped recoverable, P-D fully lost). The reviewer runs it
-- post-apply, pastes the output into the incident record, and the
-- next migration in the chain (B-7 Phase C) acts on the result.
--
-- Rollback SQL is in a comment block at the bottom of this file.
-- ============================================================

BEGIN;

CREATE OR REPLACE FUNCTION public.b7_provider_regression_diagnostic()
RETURNS TABLE (
  state text,
  user_count bigint,
  user_ids uuid[],
  emails text[]
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
STABLE
AS $$
  WITH claimed_providers AS (
    -- providers.user_id is the claim foreign key (verified at
    -- supabase/migrations/20260306000001_provider_directory_v2.sql:57).
    -- A claimed provider has user_id IS NOT NULL; status transitions
    -- through 'claimed' -> 'verified' -> 'active' over its lifecycle,
    -- but the user_id link is the durable signal we care about here.
    SELECT
      p.user_id           AS user_id,
      u.email             AS email,
      (u.raw_user_meta_data ->> 'role') AS meta_role,
      pr.role             AS profile_role
    FROM public.providers p
    JOIN auth.users      u  ON u.id  = p.user_id
    LEFT JOIN public.profiles pr ON pr.id = u.id
    WHERE p.user_id IS NOT NULL
  ),
  classified AS (
    SELECT
      cp.*,
      CASE
        WHEN cp.meta_role = 'provider' AND cp.profile_role = 'provider'
          THEN 'P-A_intact'
        WHEN cp.meta_role = 'provider' AND COALESCE(cp.profile_role, '') <> 'provider'
          THEN 'P-B_partial'
        WHEN COALESCE(cp.meta_role, '') <> 'provider' AND cp.profile_role = 'provider'
          THEN 'P-C_stripped_recoverable'
        ELSE 'P-D_fully_lost'
      END AS state
    FROM claimed_providers cp
  )
  SELECT
    classified.state,
    COUNT(*)::bigint AS user_count,
    COALESCE(ARRAY_AGG(classified.user_id ORDER BY classified.email), ARRAY[]::uuid[]) AS user_ids,
    COALESCE(ARRAY_AGG(classified.email   ORDER BY classified.email), ARRAY[]::text[])  AS emails
  FROM classified
  GROUP BY classified.state
  ORDER BY classified.state;
$$;

REVOKE EXECUTE ON FUNCTION public.b7_provider_regression_diagnostic() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.b7_provider_regression_diagnostic() FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.b7_provider_regression_diagnostic() FROM anon;
-- service_role retains EXECUTE by default (Postgres function-owner
-- behavior). Reviewer must call from the Supabase SQL editor with
-- service-role context, or via psql with the service-role connection
-- string.

COMMENT ON FUNCTION public.b7_provider_regression_diagnostic() IS
  'B-7 read-only enumeration of provider-role regression states post '
  '20260423000001 deploy. Service-role only. See '
  'docs/audits/auth-hotfix-b7-incident.md.';

COMMIT;

NOTIFY pgrst, 'reload schema';

-- ============================================================
-- ROLLBACK (manual, run only if this migration must be reverted)
-- ============================================================
--
-- BEGIN;
-- DROP FUNCTION IF EXISTS public.b7_provider_regression_diagnostic();
-- COMMIT;
-- NOTIFY pgrst, 'reload schema';
