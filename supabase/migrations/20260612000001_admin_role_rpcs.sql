-- ============================================================
-- Admin role CRUD via SECURITY DEFINER RPCs
-- ============================================================
-- Date: 2026-06-12
--
-- Context:
--   admin_roles' direct-write policy is `admin_roles_modify FOR ALL
--   USING (false)` (20260330000001) and its SELECT policy only ever
--   returns the caller's own row. That lockdown is deliberate and
--   correct — the client must NEVER write admin_roles directly. This
--   migration does NOT touch those policies. Instead it routes all
--   admin role access through three SECURITY DEFINER RPCs that run as
--   the function owner (bypassing RLS) with the authorization gate
--   moved inside the function body.
--
-- Authorization (owner rulings):
--   - reads of the role list      -> any admin            (is_admin())
--   - role mutations (upsert/remove) -> super_admin only
--
-- The super_admin gate reuses the existing idiom from the foundation
-- `admin_roles_write` policy and 20260325000003 — an EXISTS check on
-- admin_roles for the caller's own super_admin row. No new idiom.
--
-- Conventions (matching 20260423000001_harden_admin_role_checks.sql):
--   SECURITY DEFINER, SET search_path = '', static SQL only,
--   fully schema-qualified names, REVOKE from PUBLIC/anon, GRANT to
--   authenticated (the gate lives inside the function, not in a GRANT).
-- ============================================================

BEGIN;

-- ------------------------------------------------------------
-- 1. admin_list_roles() — any admin may read the full role list
-- ------------------------------------------------------------
-- Joins auth.users for the email (only reachable because the function
-- runs as its owner). Returns no rows for a non-admin caller.

CREATE OR REPLACE FUNCTION public.admin_list_roles()
RETURNS TABLE (
  id uuid,
  user_id uuid,
  email text,
  role text,
  granted_by uuid,
  created_at timestamptz
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
STABLE
AS $$
  SELECT ar.id, ar.user_id, u.email::text, ar.role, ar.granted_by, ar.created_at
  FROM public.admin_roles ar
  LEFT JOIN auth.users u ON u.id = ar.user_id
  WHERE public.is_admin()
  ORDER BY ar.created_at ASC;
$$;

REVOKE ALL ON FUNCTION public.admin_list_roles() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.admin_list_roles() FROM anon;
GRANT EXECUTE ON FUNCTION public.admin_list_roles() TO authenticated;

COMMENT ON FUNCTION public.admin_list_roles() IS
  'Returns all admin_roles rows (with email) iff the caller is_admin(). '
  'SECURITY DEFINER bypasses the row-scoped SELECT policy on admin_roles. '
  'Read gate only — any admin may list.';


-- ------------------------------------------------------------
-- 2. admin_upsert_role(target_user_id, new_role) — super_admin only
-- ------------------------------------------------------------
-- Inserts or updates a single admin_roles row. Refuses to demote the
-- last remaining super_admin (lockout prevention). Validates new_role
-- against the canonical enum.

CREATE OR REPLACE FUNCTION public.admin_upsert_role(
  target_user_id uuid,
  new_role text
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  _row public.admin_roles;
BEGIN
  -- super_admin gate (same idiom as the admin_roles_write policy)
  IF NOT EXISTS (
    SELECT 1 FROM public.admin_roles ar
    WHERE ar.user_id = auth.uid() AND ar.role = 'super_admin'
  ) THEN
    RAISE EXCEPTION 'admin_upsert_role: caller is not a super_admin'
      USING ERRCODE = '42501';
  END IF;

  IF new_role NOT IN ('super_admin', 'clinical_admin', 'viewer') THEN
    RAISE EXCEPTION 'admin_upsert_role: invalid role %, expected super_admin|clinical_admin|viewer', new_role
      USING ERRCODE = '22023';
  END IF;

  -- Lockout prevention: refuse to demote the last remaining super_admin.
  IF new_role <> 'super_admin'
     AND EXISTS (
       SELECT 1 FROM public.admin_roles
       WHERE user_id = target_user_id AND role = 'super_admin'
     )
     AND (SELECT count(*) FROM public.admin_roles WHERE role = 'super_admin') <= 1 THEN
    RAISE EXCEPTION 'admin_upsert_role: cannot demote the last remaining super_admin'
      USING ERRCODE = 'P0001';
  END IF;

  INSERT INTO public.admin_roles (user_id, role, granted_by)
  VALUES (target_user_id, new_role, auth.uid())
  ON CONFLICT (user_id) DO UPDATE SET role = EXCLUDED.role
  RETURNING * INTO _row;

  RETURN to_jsonb(_row);
END;
$$;

REVOKE ALL ON FUNCTION public.admin_upsert_role(uuid, text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.admin_upsert_role(uuid, text) FROM anon;
GRANT EXECUTE ON FUNCTION public.admin_upsert_role(uuid, text) TO authenticated;

COMMENT ON FUNCTION public.admin_upsert_role(uuid, text) IS
  'Upserts one admin_roles row. super_admin-only (gate inside). Validates '
  'new_role against the canonical enum and refuses to demote the last '
  'remaining super_admin. SECURITY DEFINER — direct-write policy stays USING(false).';


-- ------------------------------------------------------------
-- 3. admin_remove_role(target_user_id) — super_admin only
-- ------------------------------------------------------------
-- Deletes a single admin_roles row. Refuses to remove the last
-- remaining super_admin (lockout prevention).

CREATE OR REPLACE FUNCTION public.admin_remove_role(
  target_user_id uuid
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- super_admin gate (same idiom as the admin_roles_write policy)
  IF NOT EXISTS (
    SELECT 1 FROM public.admin_roles ar
    WHERE ar.user_id = auth.uid() AND ar.role = 'super_admin'
  ) THEN
    RAISE EXCEPTION 'admin_remove_role: caller is not a super_admin'
      USING ERRCODE = '42501';
  END IF;

  -- Lockout prevention: refuse to remove the last remaining super_admin.
  IF EXISTS (
       SELECT 1 FROM public.admin_roles
       WHERE user_id = target_user_id AND role = 'super_admin'
     )
     AND (SELECT count(*) FROM public.admin_roles WHERE role = 'super_admin') <= 1 THEN
    RAISE EXCEPTION 'admin_remove_role: cannot remove the last remaining super_admin'
      USING ERRCODE = 'P0001';
  END IF;

  DELETE FROM public.admin_roles WHERE user_id = target_user_id;
END;
$$;

REVOKE ALL ON FUNCTION public.admin_remove_role(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.admin_remove_role(uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.admin_remove_role(uuid) TO authenticated;

COMMENT ON FUNCTION public.admin_remove_role(uuid) IS
  'Removes one admin_roles row. super_admin-only (gate inside). Refuses to '
  'remove the last remaining super_admin. SECURITY DEFINER — direct-write '
  'policy stays USING(false).';

COMMIT;

NOTIFY pgrst, 'reload schema';

-- ============================================================
-- ROLLBACK (manual)
-- ============================================================
-- BEGIN;
-- DROP FUNCTION IF EXISTS public.admin_list_roles();
-- DROP FUNCTION IF EXISTS public.admin_upsert_role(uuid, text);
-- DROP FUNCTION IF EXISTS public.admin_remove_role(uuid);
-- COMMIT;
-- NOTIFY pgrst, 'reload schema';
