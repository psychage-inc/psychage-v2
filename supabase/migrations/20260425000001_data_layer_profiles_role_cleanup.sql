-- =====================================================
-- Migration: AUTH-006 data-layer cleanup
-- Date: 2026-04-25
-- Branch: refactor/auth-data-layer
-- Description:
--   Tighten the public.profiles.role canonical states to ('patient',
--   'provider'). Pre-AUTH-006, the CHECK constraint also permitted
--   'admin'. Post-B-3/B-7, admin status lives in public.admin_roles
--   (synced into auth.users.raw_app_meta_data.role by the B-3 trigger);
--   profiles.role is the non-admin user-type fallback.
--
--   The original CHECK
--     CHECK (role IN ('patient', 'provider', 'admin'))
--   from supabase/migrations/20250109000000_create_profiles.sql allowed
--   stranded 'admin' values from the pre-B-3 era. This migration:
--     1. Reconciles users who carry profiles.role='admin' AND have a
--        matching admin_roles entry — they become 'patient' in profiles.
--        Their admin status remains intact via admin_roles.
--     2. Aborts with a NOTICE if any rows have profiles.role='admin'
--        but no admin_roles entry (stranded admins). Operator must
--        decide promote-or-demote and reconcile manually before this
--        migration can apply.
--     3. Replaces the CHECK constraint with the narrowed allow-list.
--
--   Application code is unchanged: the B-7 sync trigger
--   (sync_user_role_to_app_metadata) prefers admin_roles over
--   profiles.role and falls back to 'patient' if neither is set, so
--   the narrowed CHECK is fully compatible with existing logic.
--
--   See docs/refactors/auth-data-layer-findings.md (D-03).
-- =====================================================

BEGIN;

-- ------------------------------------------------------------
-- Step 1: Reconcile users who are real admins (have admin_roles
-- entry) but still carry profiles.role='admin' from pre-B-3 era.
-- Reset profiles.role to 'patient' for these users; their admin
-- status is preserved by the admin_roles entry.
-- ------------------------------------------------------------
UPDATE public.profiles
SET role = 'patient'
WHERE role = 'admin'
  AND id IN (SELECT user_id FROM public.admin_roles);

-- ------------------------------------------------------------
-- Step 2: Stranded admins WITHOUT admin_roles entries — abort.
-- These rows represent pre-B-3 metadata users whose admin_roles
-- entry was never backfilled. The operator must decide whether
-- to promote (insert admin_roles) or demote (set profiles.role
-- to 'patient' or 'provider'). We refuse to make this decision
-- in a migration to avoid silent data loss.
-- ------------------------------------------------------------
DO $$
DECLARE
  stranded_count integer;
  stranded_ids text;
BEGIN
  SELECT count(*) INTO stranded_count
  FROM public.profiles
  WHERE role = 'admin'
    AND id NOT IN (SELECT user_id FROM public.admin_roles);

  IF stranded_count > 0 THEN
    SELECT string_agg(id::text, ', ' ORDER BY id) INTO stranded_ids
    FROM public.profiles
    WHERE role = 'admin'
      AND id NOT IN (SELECT user_id FROM public.admin_roles);

    RAISE EXCEPTION
      'AUTH-006: % stranded admin row(s) in public.profiles with no admin_roles entry. Reconcile manually (promote into admin_roles, or set profiles.role to patient/provider) before re-running. Affected ids: %',
      stranded_count, stranded_ids;
  END IF;
END;
$$;

-- ------------------------------------------------------------
-- Step 3: Tighten the CHECK constraint going forward.
-- Drop the old constraint by name; add the narrowed one.
-- The constraint name `profiles_role_check` matches the implicit
-- name PostgreSQL gave the original CHECK from 20250109000000.
-- ------------------------------------------------------------
ALTER TABLE public.profiles
  DROP CONSTRAINT IF EXISTS profiles_role_check;

ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_role_check CHECK (role IN ('patient', 'provider'));

COMMENT ON COLUMN public.profiles.role IS
  'Non-admin user type. Allowed values: patient, provider. Admin status '
  'lives in public.admin_roles (synced to auth.users.raw_app_meta_data.role '
  'by the B-3 trigger). See AUTH-006.';

COMMIT;

-- =====================================================
-- ROLLBACK (incident only)
-- =====================================================
-- BEGIN;
--   ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
--   ALTER TABLE public.profiles
--     ADD CONSTRAINT profiles_role_check CHECK (role IN ('patient', 'provider', 'admin'));
-- COMMIT;
-- Note: rollback restores the permissive CHECK; it does NOT restore any
-- profiles.role='admin' values that were rewritten in Step 1, because
-- those users have admin_roles entries and Step 1 was a deliberate
-- reconciliation, not data loss.
