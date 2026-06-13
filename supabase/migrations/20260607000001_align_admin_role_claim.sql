-- ============================================================
-- Align admin role claim — defensive idempotent backfill
-- ============================================================
-- Date: 2026-06-07
-- Severity: HIGH (admin login blocker remediation)
-- Audit:    ADMIN_AUDIT_FINDINGS.md (P0-01 / RC-3)
--
-- Context:
--   The B-7 sync function and trigger
--   (20260423000008_b7_extend_role_sync.sql) ALREADY write the granular
--   admin role (super_admin | clinical_admin | viewer) into
--   auth.users.raw_app_meta_data.role, and a one-time reconciliation ran
--   in that migration. This migration does NOT rewrite the trigger or
--   function — it only re-asserts the claim, idempotently, for every
--   user that currently has an admin_roles row.
--
--   This covers admins provisioned in an environment/timeline where the
--   prior reconciliation did not populate their claim (e.g. the demo
--   admin, or any row whose claim drifted), so already-provisioned
--   admins get the granular claim without a manual re-touch.
--
-- Idempotent: jsonb concat with the same key/value is a no-op on rerun.
-- Granular values are preserved — the claim is NEVER flattened to 'admin'.
-- ============================================================

BEGIN;

UPDATE auth.users u
SET raw_app_meta_data =
  COALESCE(u.raw_app_meta_data, '{}'::jsonb)
  || jsonb_build_object(
       'role',
       (
         SELECT ar.role
         FROM public.admin_roles ar
         WHERE ar.user_id = u.id
         ORDER BY
           CASE ar.role
             WHEN 'super_admin'    THEN 1
             WHEN 'clinical_admin' THEN 2
             WHEN 'viewer'         THEN 3
             ELSE 99
           END
         LIMIT 1
       )
     )
WHERE EXISTS (
  SELECT 1 FROM public.admin_roles ar WHERE ar.user_id = u.id
)
AND (
  u.raw_app_meta_data ->> 'role'
) IS DISTINCT FROM (
  SELECT ar.role
  FROM public.admin_roles ar
  WHERE ar.user_id = u.id
  ORDER BY
    CASE ar.role
      WHEN 'super_admin'    THEN 1
      WHEN 'clinical_admin' THEN 2
      WHEN 'viewer'         THEN 3
      ELSE 99
    END
  LIMIT 1
);

COMMIT;

NOTIFY pgrst, 'reload schema';

-- ============================================================
-- VERIFICATION (run after migration applies)
-- ============================================================
--   -- Every admin_roles user has a matching granular claim:
--   SELECT count(*) AS claim_drift
--     FROM public.admin_roles ar
--     JOIN auth.users u ON u.id = ar.user_id
--    WHERE (u.raw_app_meta_data ->> 'role') IS DISTINCT FROM ar.role;
--   -- Expected: 0
--
--   -- Spot-check the demo admin:
--   SELECT raw_app_meta_data ->> 'role'
--     FROM auth.users WHERE email = 'demo@psychage.com';
--   -- Expected: super_admin
-- ============================================================
