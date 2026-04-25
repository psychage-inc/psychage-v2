-- ============================================================
-- Sync admin_roles → auth.users.raw_app_meta_data (B-3 patch-up)
-- ============================================================
-- Date: 2026-04-23
-- Severity: HIGH (broken UX — post-AUTH-001 admins got patient dashboards)
-- Audit: docs/audits/auth-hotfix-summary.md, §H.2 of the addendum
--
-- Why this exists:
--   After the AUTH-001 hotfix:
--     * The client resolves role from app_metadata.role (commit 123da4b).
--     * is_admin() reads from admin_roles (commit 182f491).
--   Nothing kept app_metadata.role in sync with admin_roles, so a newly
--   inserted admin got admin RLS privileges (server says "admin") while
--   the client still said "not admin" and routed them to the patient
--   dashboard. That split brain is the B-3 finding.
--
--   This migration adds a trigger on admin_roles that mirrors the
--   current role into auth.users.raw_app_meta_data on every INSERT /
--   UPDATE / DELETE, and a one-shot DO block that reconciles every
--   existing admin_roles row into app_metadata. Idempotent — re-running
--   the DO block is a no-op on steady state.
--
-- Cardinality:
--   admin_roles has UNIQUE(user_id) — one role per user. The priority
--   ORDER BY + LIMIT 1 is harmless under the current constraint and
--   keeps the function correct if the UNIQUE is ever relaxed.
--
-- Interaction with the strip trigger from 20260423000001:
--   This trigger fires AFTER on admin_roles and issues UPDATE auth.users
--   to write raw_app_meta_data. The strip trigger is BEFORE UPDATE on
--   auth.users and inspects only raw_user_meta_data — it silently
--   no-ops here because we never touch raw_user_meta_data.
--
-- Rollback SQL is in a comment block at the bottom of this file.
-- ============================================================

BEGIN;

CREATE OR REPLACE FUNCTION public.sync_admin_role_to_app_metadata()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  _target_user_id uuid;
  _primary_role   text;
BEGIN
  IF TG_OP = 'DELETE' THEN
    _target_user_id := OLD.user_id;
  ELSE
    _target_user_id := NEW.user_id;
  END IF;

  -- Priority order: super_admin > clinical_admin > viewer. Under the
  -- current UNIQUE(user_id), at most one row per user — ORDER BY just
  -- returns that single row. If UNIQUE is ever relaxed, priority
  -- ensures the highest-privilege role wins.
  SELECT ar.role
  INTO _primary_role
  FROM public.admin_roles ar
  WHERE ar.user_id = _target_user_id
  ORDER BY
    CASE ar.role
      WHEN 'super_admin'    THEN 1
      WHEN 'clinical_admin' THEN 2
      WHEN 'viewer'         THEN 3
      ELSE 99
    END
  LIMIT 1;

  IF _primary_role IS NOT NULL THEN
    UPDATE auth.users
    SET raw_app_meta_data =
      COALESCE(raw_app_meta_data, '{}'::jsonb)
      || jsonb_build_object('role', _primary_role)
    WHERE id = _target_user_id;
  ELSE
    -- User has no remaining admin_roles rows — strip the key so a
    -- demoted admin loses client-side UI affordances on their next
    -- JWT refresh.
    UPDATE auth.users
    SET raw_app_meta_data = COALESCE(raw_app_meta_data, '{}'::jsonb) - 'role'
    WHERE id = _target_user_id;
  END IF;

  RETURN COALESCE(NEW, OLD);
END;
$$;

COMMENT ON FUNCTION public.sync_admin_role_to_app_metadata() IS
  'AUTH-001 post-fix: keeps auth.users.raw_app_meta_data.role in sync '
  'with admin_roles. Fires on every INSERT/UPDATE/DELETE of admin_roles. '
  'See docs/audits/auth-hotfix-summary.md §8 B-3.';

DROP TRIGGER IF EXISTS sync_admin_role_to_app_metadata_trg ON public.admin_roles;
CREATE TRIGGER sync_admin_role_to_app_metadata_trg
  AFTER INSERT OR UPDATE OR DELETE ON public.admin_roles
  FOR EACH ROW
  EXECUTE FUNCTION public.sync_admin_role_to_app_metadata();


-- ------------------------------------------------------------
-- One-time reconciliation for existing admins
-- ------------------------------------------------------------
-- Populate app_metadata.role for every admin who already has an
-- admin_roles row at the moment this migration runs. Idempotent —
-- re-running is a no-op on steady state (jsonb_build_object with the
-- same key overwrites to the same value).

DO $$
DECLARE
  _r RECORD;
BEGIN
  FOR _r IN
    SELECT DISTINCT ON (user_id) user_id, role
    FROM public.admin_roles
    ORDER BY user_id,
      CASE role
        WHEN 'super_admin'    THEN 1
        WHEN 'clinical_admin' THEN 2
        WHEN 'viewer'         THEN 3
        ELSE 99
      END
  LOOP
    UPDATE auth.users
    SET raw_app_meta_data =
      COALESCE(raw_app_meta_data, '{}'::jsonb)
      || jsonb_build_object('role', _r.role)
    WHERE id = _r.user_id;
  END LOOP;
END;
$$;

COMMIT;

NOTIFY pgrst, 'reload schema';

-- ============================================================
-- ROLLBACK (manual, run only if this migration must be reverted)
-- ============================================================
--
-- BEGIN;
-- DROP TRIGGER IF EXISTS sync_admin_role_to_app_metadata_trg ON public.admin_roles;
-- DROP FUNCTION IF EXISTS public.sync_admin_role_to_app_metadata();
-- -- Optional: strip app_metadata.role from every user to fully revert:
-- UPDATE auth.users
-- SET raw_app_meta_data = COALESCE(raw_app_meta_data, '{}'::jsonb) - 'role';
-- COMMIT;
-- NOTIFY pgrst, 'reload schema';
