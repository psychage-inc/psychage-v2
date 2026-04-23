-- ============================================================
-- AUTH-001 diagnostic RPC (B-1 patch-up)
-- ============================================================
-- Date: 2026-04-23
-- Severity: HIGH (script correctness)
-- Audit: docs/audits/auth-audit-2026-04-23-addendum.md (§H.2)
--
-- Why this exists:
--   scripts/migrate-admin-roles.ts calls supabase.rpc(
--     'auth_001_diagnostic_admin_states'
--   ) to enumerate State A/B/C/D users before migrating them.
--   The RPC was not defined in 20260423000001 because exposing
--   auth.users to authenticated callers via a function is itself a
--   security decision. It is locked to service_role only — the script
--   that consumes it runs under service-role credentials.
--
--   Without this RPC, the script's fallback path produces an
--   admin_roles-only count and cannot detect State B users (the
--   entire population the migration exists to find). B-1 of the
--   patch-up makes the script refuse to continue with that degraded
--   view; deploying this migration is therefore a precondition for
--   executing the reconciliation script.
--
-- Rollback SQL is in a comment block at the bottom of this file.
-- ============================================================

BEGIN;

CREATE OR REPLACE FUNCTION public.auth_001_diagnostic_admin_states()
RETURNS TABLE (
  state      text,
  user_count bigint,
  user_ids   uuid[]
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
STABLE
AS $$
  WITH
    metadata_admins AS (
      SELECT id AS user_id
      FROM auth.users
      WHERE raw_user_meta_data ? 'role'
        AND raw_user_meta_data ->> 'role' = 'admin'
    ),
    metadata_role_non_admin AS (
      SELECT id AS user_id
      FROM auth.users
      WHERE raw_user_meta_data ? 'role'
        AND (raw_user_meta_data ->> 'role') IS DISTINCT FROM 'admin'
    ),
    table_admins AS (
      SELECT user_id FROM public.admin_roles
    )
  SELECT
    'A_admin_roles_only'::text AS state,
    COUNT(*)::bigint           AS user_count,
    COALESCE(ARRAY_AGG(t.user_id), ARRAY[]::uuid[]) AS user_ids
  FROM table_admins t
  WHERE t.user_id NOT IN (SELECT user_id FROM metadata_admins)

  UNION ALL

  SELECT
    'B_user_metadata_only'::text,
    COUNT(*)::bigint,
    COALESCE(ARRAY_AGG(m.user_id), ARRAY[]::uuid[])
  FROM metadata_admins m
  WHERE m.user_id NOT IN (SELECT user_id FROM table_admins)

  UNION ALL

  SELECT
    'C_both_sources'::text,
    COUNT(*)::bigint,
    COALESCE(ARRAY_AGG(m.user_id), ARRAY[]::uuid[])
  FROM metadata_admins m
  JOIN table_admins t ON m.user_id = t.user_id

  UNION ALL

  SELECT
    'D_metadata_role_non_admin'::text,
    COUNT(*)::bigint,
    COALESCE(ARRAY_AGG(n.user_id), ARRAY[]::uuid[])
  FROM metadata_role_non_admin n;
$$;

-- Service-role-only. authenticated/anon must not be able to enumerate
-- auth.users via this convenience function. Matches the lockdown on
-- migrate_admin_role() from 20260423000001.
REVOKE ALL ON FUNCTION public.auth_001_diagnostic_admin_states() FROM PUBLIC, authenticated, anon;

COMMENT ON FUNCTION public.auth_001_diagnostic_admin_states() IS
  'AUTH-001 diagnostic. Returns four rows: A_admin_roles_only, '
  'B_user_metadata_only, C_both_sources, D_metadata_role_non_admin. '
  'SECURITY DEFINER, service-role only. Consumed by '
  'scripts/migrate-admin-roles.ts.';

COMMIT;

NOTIFY pgrst, 'reload schema';

-- ============================================================
-- ROLLBACK (manual, run only if this migration must be reverted)
-- ============================================================
--
-- BEGIN;
-- DROP FUNCTION IF EXISTS public.auth_001_diagnostic_admin_states();
-- COMMIT;
-- NOTIFY pgrst, 'reload schema';
