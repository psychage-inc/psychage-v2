-- ============================================================
-- B-7 Phase C: narrow auth.users strip trigger to admin only
-- ============================================================
-- Date: 2026-04-23
-- Severity: HIGH (closes the live damage window)
-- Audit:    docs/audits/auth-hotfix-b7-incident.md
--
-- The strip trigger from 20260423000001 strips the entire 'role' key
-- from raw_user_meta_data on every UPDATE, regardless of value. This
-- broke the provider claim flow (claim-provider edge function writes
-- user_metadata.role='provider'), so any provider whose auth.users
-- row gets UPDATE'd post-deploy loses their provider signal.
--
-- The only role value that must be defended against is 'admin' —
-- AUTH-001 was specifically about user_metadata.role='admin' being
-- read by the JWT-fallback branch of is_admin(). Other role values
-- ('provider', 'patient', granular admin roles) are not trust-
-- sensitive: is_admin() now reads admin_roles only, and the client
-- reads app_metadata.role (populated by the sync trigger from
-- admin_roles + profiles.role per B-7 Phase D).
--
-- Execution shape: disable trigger first, replace the function,
-- re-enable. All in one transaction so a failure leaves the trigger
-- in its previous (over-broad) state rather than disabled.
--
-- Trigger name and function name verified at
-- 20260423000001_harden_admin_role_checks.sql:104-128:
--   trigger:  strip_user_metadata_role_trg
--   function: public.strip_user_metadata_role()
--
-- Rollback SQL is in a comment block at the bottom of this file.
-- ============================================================

BEGIN;

-- Pause the trigger so the CREATE OR REPLACE below does not race
-- with concurrent UPDATEs that would otherwise still hit the
-- over-broad body. Inside the transaction, no other session can
-- observe the disabled state.
ALTER TABLE auth.users DISABLE TRIGGER strip_user_metadata_role_trg;

CREATE OR REPLACE FUNCTION public.strip_user_metadata_role()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Only strip 'admin'. Other role values flow legitimately through
  -- application code (claim-provider writes 'provider', signup writes
  -- 'patient'/'provider') and are not trust-sensitive: is_admin()
  -- reads admin_roles only, and the client reads app_metadata.role.
  IF NEW.raw_user_meta_data IS NOT NULL
     AND NEW.raw_user_meta_data ->> 'role' = 'admin' THEN
    NEW.raw_user_meta_data := NEW.raw_user_meta_data - 'role';
  END IF;
  RETURN NEW;
END;
$$;

COMMENT ON FUNCTION public.strip_user_metadata_role() IS
  'AUTH-001 belt-and-braces, narrowed in B-7. Strips only role=admin '
  'from auth.users.raw_user_meta_data on UPDATE. Other role values '
  '(provider, patient) pass through. is_admin() reads admin_roles, '
  'not user_metadata, so admin escalation is still blocked. See '
  'docs/audits/auth-hotfix-b7-incident.md.';

ALTER TABLE auth.users ENABLE TRIGGER strip_user_metadata_role_trg;

COMMIT;

NOTIFY pgrst, 'reload schema';

-- ============================================================
-- VERIFICATION (run after migration applies)
-- ============================================================
--   SELECT tgname, tgenabled FROM pg_trigger
--    WHERE tgname = 'strip_user_metadata_role_trg';
--   -- Expected: tgenabled = 'O' (origin/default firing)
--
--   SELECT pg_get_functiondef('public.strip_user_metadata_role()'::regprocedure);
--   -- Body must contain: NEW.raw_user_meta_data ->> 'role' = 'admin'
--
-- ============================================================
-- ROLLBACK (manual, run only if this migration must be reverted)
-- ============================================================
--
-- BEGIN;
-- ALTER TABLE auth.users DISABLE TRIGGER strip_user_metadata_role_trg;
-- CREATE OR REPLACE FUNCTION public.strip_user_metadata_role()
-- RETURNS trigger
-- LANGUAGE plpgsql
-- SECURITY DEFINER
-- SET search_path = ''
-- AS $$
-- BEGIN
--   IF NEW.raw_user_meta_data IS NOT NULL
--      AND NEW.raw_user_meta_data ? 'role' THEN
--     NEW.raw_user_meta_data := NEW.raw_user_meta_data - 'role';
--   END IF;
--   RETURN NEW;
-- END;
-- $$;
-- ALTER TABLE auth.users ENABLE TRIGGER strip_user_metadata_role_trg;
-- COMMIT;
-- NOTIFY pgrst, 'reload schema';
--
-- WARNING: rolling back re-introduces the regression. Do not roll
-- back without coordinated app rollback (claim-provider write to
-- profiles.role from Phase F) and a strategy for affected providers.
