-- ============================================================
-- B-7 diagnostic refinement: status filter + audit trail
-- ============================================================
-- Date: 2026-04-23
-- Severity: HIGH (live production regression — diagnostic precision)
-- Audit:    docs/audits/auth-hotfix-b7-incident.md
--
-- Background. The original B-7 prompt sketched the diagnostic against
-- providers.claimed_by_user_id, but the actual column is
-- providers.user_id (verified at supabase/migrations/
-- 20260306000001_provider_directory_v2.sql:57). The previously
-- committed function (20260423000005) was already authored against
-- the correct column — the FK name was caught at write-time, not
-- in production. This migration ships a single additional refinement
-- that the original missed: a status-column filter to avoid
-- mis-classifying non-canonical rows.
--
-- The refinement.
--   The providers table has a `status` column with CHECK constraint:
--     'seeded', 'claimed', 'submitted', 'verified', 'active',
--     'suspended', 'rejected'
--   The bulk NPPES seed (~423,404 rows per project memory) is all
--   status='seeded' with user_id NULL by construction. The claim flow
--   (supabase/functions/claim-provider/index.ts:149-157) sets
--   status='claimed' AND user_id together — that is the canonical
--   "this user went through the claim flow" signal.
--
--   `WHERE p.user_id IS NOT NULL` alone is *probably* equivalent to
--   "claim-derived rows" today, because no other code path sets
--   user_id on a seeded row. But if any operational drift attached a
--   user_id to a seeded row outside the claim flow, the looser filter
--   would inflate the regression counts in both directions
--   (false P-A intact, false P-D fully lost). Belt-and-braces: also
--   require `status <> 'seeded'`.
--
-- Signature is unchanged. CREATE OR REPLACE preserves prior
-- REVOKE/GRANT state from 20260423000005.
--
-- Rollback SQL is in a comment block at the bottom of this file.
-- ============================================================

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
    -- providers.user_id: auth.users FK
    --   (20260306000001_provider_directory_v2.sql:57).
    -- status filter: excludes the ~423k bulk-seeded rows whose
    --   user_id is NULL anyway. Belt-and-braces against operational
    --   drift where a non-canonical user_id may exist on a seeded
    --   row outside the claim flow.
    SELECT
      p.user_id           AS user_id,
      u.email             AS email,
      (u.raw_user_meta_data ->> 'role') AS meta_role,
      pr.role             AS profile_role
    FROM public.providers p
    JOIN auth.users      u  ON u.id  = p.user_id
    LEFT JOIN public.profiles pr ON pr.id = u.id
    WHERE p.user_id IS NOT NULL
      AND p.status   <> 'seeded'
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

-- Privileges remain as-set by 20260423000005. CREATE OR REPLACE
-- preserves prior REVOKE state. No need to re-issue REVOKEs.

COMMENT ON FUNCTION public.b7_provider_regression_diagnostic() IS
  'B-7 read-only enumeration of provider-role regression states post '
  '20260423000001 deploy. Service-role only. Refined in 20260423000006 '
  'to add status <> ''seeded'' filter. See '
  'docs/audits/auth-hotfix-b7-incident.md.';

NOTIFY pgrst, 'reload schema';

-- ============================================================
-- ROLLBACK (manual, run only if this migration must be reverted)
-- ============================================================
--
-- To revert to the 20260423000005 body (no status filter):
--   re-apply the CREATE OR REPLACE block from 20260423000005.
-- To remove the function entirely:
--
--   BEGIN;
--   DROP FUNCTION IF EXISTS public.b7_provider_regression_diagnostic();
--   COMMIT;
--   NOTIFY pgrst, 'reload schema';
