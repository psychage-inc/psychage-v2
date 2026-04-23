-- ============================================================
-- AUTH-001 hardening: server-side admin role enforcement
-- ============================================================
-- Date: 2026-04-23
-- Severity: CRITICAL
-- Audit: docs/audits/auth-audit-2026-04-23.md (AUTH-001),
--        docs/audits/auth-audit-2026-04-23-addendum.md (§H.1 / §H.2)
--
-- This migration:
--   1. Replaces is_admin() and is_admin_writer() with recursion-safe
--      SECURITY DEFINER functions (Pattern A from addendum §H.1).
--      The JWT fallback to user_metadata.role is REMOVED — that fallback
--      is the AUTH-001 vulnerability.
--   2. Adds a BEFORE UPDATE trigger on auth.users that strips any future
--      writes to raw_user_meta_data.role. Defense-in-depth: even if a
--      client bypasses the application-layer fix, the DB rejects the
--      escalation attempt.
--   3. Defines migrate_admin_role(), a service-role-only RPC used by
--      scripts/migrate-admin-roles.ts to atomically reconcile a user's
--      State A/B/C designation (per addendum §H.2).
--
-- Note on triggers in auth.* schema:
--   Supabase exposes auth.users for the handle_new_user() trigger pattern,
--   so user-defined triggers are supported. The trigger in section 2 only
--   touches raw_user_meta_data — Supabase's own SDK uses the same column
--   for the legitimate display fields (display_name, avatar_url) and they
--   are preserved. Local verification: `supabase db reset` should apply
--   this migration and the existing handle_new_user() trigger together
--   without conflict.
--
-- Rollback SQL is in a comment block at the bottom of this file.
-- ============================================================

BEGIN;

-- ------------------------------------------------------------
-- 1. Recursion-safe is_admin() and is_admin_writer()
-- ------------------------------------------------------------
-- Pattern A: SECURITY DEFINER + SET search_path = '' + STABLE.
-- The function runs as its owner (typically `postgres`/`supabase_admin`),
-- which bypasses RLS on admin_roles — breaking any potential recursion
-- chain through admin_roles' own policies. SET search_path = '' guards
-- against schema-shadow attacks.

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.admin_roles ar
    WHERE ar.user_id = auth.uid()
  );
$$;

REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

COMMENT ON FUNCTION public.is_admin() IS
  'Returns true iff the calling user has any admin_roles row. AUTH-001: '
  'no JWT fallback — admin_roles is the sole source of truth.';


CREATE OR REPLACE FUNCTION public.is_admin_writer()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.admin_roles ar
    WHERE ar.user_id = auth.uid()
      AND ar.role IN ('super_admin', 'clinical_admin')
  );
$$;

REVOKE ALL ON FUNCTION public.is_admin_writer() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin_writer() TO authenticated;

COMMENT ON FUNCTION public.is_admin_writer() IS
  'Returns true iff the caller is super_admin or clinical_admin. AUTH-001: '
  'no JWT fallback. Used by article RLS in 20260423000002_fix_articles_rls.sql.';


-- ------------------------------------------------------------
-- 2. BEFORE UPDATE trigger: strip role from raw_user_meta_data
-- ------------------------------------------------------------
-- This is a belt-and-braces guard: even if a future code path tries to
-- write user_metadata.role, the DB silently strips it. We do NOT raise
-- an error — that would break legitimate updateUser() calls that happen
-- to spread an old `role` field through. Silent strip is the soft-fail
-- choice; an attacker still cannot escalate, and a legitimate caller is
-- unaffected.
--
-- Lives in the public schema (function), but trigger fires on auth.users.
-- The trigger function is SECURITY DEFINER + search_path='' to avoid any
-- schema-shadow exploit during execution.

CREATE OR REPLACE FUNCTION public.strip_user_metadata_role()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF NEW.raw_user_meta_data IS NOT NULL
     AND NEW.raw_user_meta_data ? 'role' THEN
    NEW.raw_user_meta_data := NEW.raw_user_meta_data - 'role';
  END IF;
  RETURN NEW;
END;
$$;

COMMENT ON FUNCTION public.strip_user_metadata_role() IS
  'AUTH-001 belt-and-braces. Strips role key from auth.users.raw_user_meta_data '
  'on every update so a client-side updateUser({ data: { role: ... } }) '
  'cannot land an admin claim. Soft-fail (silent strip), not error.';

DROP TRIGGER IF EXISTS strip_user_metadata_role_trg ON auth.users;
CREATE TRIGGER strip_user_metadata_role_trg
  BEFORE UPDATE ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.strip_user_metadata_role();


-- ------------------------------------------------------------
-- 3. Service-role RPC used by scripts/migrate-admin-roles.ts
-- ------------------------------------------------------------
-- Atomic per-user reconciliation. Called only by service-role
-- credentials (RLS does not gate function execution; the RPC itself is
-- the gating surface). The function logs every action to admin_audit_log.
--
-- Actions:
--   'promote'  — INSERT INTO admin_roles (idempotent via ON CONFLICT)
--   'demote'   — DELETE FROM admin_roles (no-op if absent)
--   'reconcile' — leave admin_roles alone, just strip user_metadata.role
--
-- All three actions also call the user_metadata strip via UPDATE on
-- auth.users — the trigger above intercepts and removes the role key.

CREATE OR REPLACE FUNCTION public.migrate_admin_role(
  _user_id uuid,
  _action text,
  _granular_role text DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  _before jsonb;
  _after jsonb;
  _result jsonb;
BEGIN
  IF _action NOT IN ('promote', 'demote', 'reconcile') THEN
    RAISE EXCEPTION 'migrate_admin_role: invalid action %, expected promote|demote|reconcile', _action;
  END IF;

  IF _action = 'promote'
     AND (_granular_role IS NULL
          OR _granular_role NOT IN ('super_admin', 'clinical_admin', 'viewer')) THEN
    RAISE EXCEPTION 'migrate_admin_role: promote requires _granular_role in (super_admin, clinical_admin, viewer)';
  END IF;

  -- Snapshot before
  SELECT jsonb_build_object(
    'admin_roles_row', (SELECT to_jsonb(ar) FROM public.admin_roles ar WHERE ar.user_id = _user_id),
    'user_metadata',   (SELECT raw_user_meta_data FROM auth.users WHERE id = _user_id),
    'app_metadata',    (SELECT raw_app_meta_data FROM auth.users WHERE id = _user_id)
  ) INTO _before;

  IF _action = 'promote' THEN
    INSERT INTO public.admin_roles (user_id, role)
    VALUES (_user_id, _granular_role)
    ON CONFLICT (user_id) DO UPDATE SET role = EXCLUDED.role;
  ELSIF _action = 'demote' THEN
    DELETE FROM public.admin_roles WHERE user_id = _user_id;
  END IF;

  -- Touch the user row to fire the strip trigger; if metadata had no
  -- role key the trigger is a no-op.
  UPDATE auth.users
  SET raw_user_meta_data = COALESCE(raw_user_meta_data, '{}'::jsonb)
  WHERE id = _user_id;

  -- Snapshot after
  SELECT jsonb_build_object(
    'admin_roles_row', (SELECT to_jsonb(ar) FROM public.admin_roles ar WHERE ar.user_id = _user_id),
    'user_metadata',   (SELECT raw_user_meta_data FROM auth.users WHERE id = _user_id)
  ) INTO _after;

  -- Audit
  INSERT INTO public.admin_audit_log (
    admin_user_id, action, resource_type, resource_id, previous_value, new_value, metadata
  ) VALUES (
    NULL,                          -- service-role invocation, no actor
    'AUTH-001-migration',
    'admin_role',
    _user_id::text,
    _before,
    _after,
    jsonb_build_object('action', _action, 'granular_role', _granular_role)
  );

  _result := jsonb_build_object(
    'user_id', _user_id,
    'action', _action,
    'before', _before,
    'after', _after
  );

  RETURN _result;
END;
$$;

REVOKE ALL ON FUNCTION public.migrate_admin_role(uuid, text, text) FROM PUBLIC, authenticated, anon;
-- service_role retains EXECUTE by default (PostgreSQL behavior for
-- functions owned by the executing role). The script asserts
-- service-role context before invoking.

COMMENT ON FUNCTION public.migrate_admin_role(uuid, text, text) IS
  'AUTH-001 admin role reconciliation. Service-role only. Used by '
  'scripts/migrate-admin-roles.ts. Logs every change to admin_audit_log.';

COMMIT;

NOTIFY pgrst, 'reload schema';

-- ============================================================
-- ROLLBACK (manual, run only if this migration must be reverted)
-- ============================================================
--
-- BEGIN;
-- DROP TRIGGER IF EXISTS strip_user_metadata_role_trg ON auth.users;
-- DROP FUNCTION IF EXISTS public.strip_user_metadata_role();
-- DROP FUNCTION IF EXISTS public.migrate_admin_role(uuid, text, text);
--
-- -- Restore the JWT-fallback variants from 20260316000003 if needed:
-- CREATE OR REPLACE FUNCTION public.is_admin()
-- RETURNS BOOLEAN AS $$
-- BEGIN
--   RETURN (
--     EXISTS (SELECT 1 FROM public.admin_roles WHERE user_id = auth.uid())
--     OR (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
--   );
-- END;
-- $$ LANGUAGE plpgsql SECURITY DEFINER STABLE;
--
-- CREATE OR REPLACE FUNCTION public.is_admin_writer()
-- RETURNS BOOLEAN AS $$
-- BEGIN
--   RETURN (
--     EXISTS (
--       SELECT 1 FROM public.admin_roles
--       WHERE user_id = auth.uid()
--         AND role IN ('super_admin', 'clinical_admin')
--     )
--     OR (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
--   );
-- END;
-- $$ LANGUAGE plpgsql SECURITY DEFINER STABLE;
-- COMMIT;
-- NOTIFY pgrst, 'reload schema';
