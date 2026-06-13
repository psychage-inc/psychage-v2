-- ============================================================
-- Admin email→id lookup via SECURITY DEFINER RPC
-- ============================================================
-- Date: 2026-06-13
--
-- Context:
--   The admin "Add Admin" invite flow (UserManagement.tsx) resolves an
--   invitee's email to a user id via get_user_by_email(email_input) before
--   granting a role through admin_upsert_role. That function was never
--   defined — this migration adds it. auth.users is not readable by the
--   anon/authenticated roles, so the lookup must run SECURITY DEFINER.
--
-- Authorization (owner ruling):
--   Read gate -> any admin (is_admin()). The privileged action (granting a
--   role) stays super_admin-only inside admin_upsert_role; this function only
--   resolves an email to an id, so it reuses the admin_list_roles read idiom.
--
-- Conventions (matching 20260612000001_admin_role_rpcs.sql):
--   SECURITY DEFINER, SET search_path = '', static SQL, fully schema-qualified
--   names, REVOKE from PUBLIC/anon, GRANT to authenticated (the gate lives
--   inside the function body, returning zero rows for non-admins).
-- ============================================================

BEGIN;

CREATE OR REPLACE FUNCTION public.get_user_by_email(email_input text)
RETURNS TABLE (id uuid)
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
STABLE
AS $$
  SELECT u.id
  FROM auth.users u
  WHERE lower(u.email) = lower(email_input)
    AND public.is_admin();
$$;

REVOKE ALL ON FUNCTION public.get_user_by_email(text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.get_user_by_email(text) FROM anon;
GRANT EXECUTE ON FUNCTION public.get_user_by_email(text) TO authenticated;

COMMENT ON FUNCTION public.get_user_by_email(text) IS
  'Resolves an email to its auth.users id for the admin invite flow. '
  'Returns zero rows unless the caller is_admin(). SECURITY DEFINER bypasses '
  'the auth.users access restriction. Lookup only — granting roles stays in '
  'admin_upsert_role (super_admin-gated).';

COMMIT;

NOTIFY pgrst, 'reload schema';

-- ============================================================
-- ROLLBACK (manual)
-- ============================================================
-- BEGIN;
-- DROP FUNCTION IF EXISTS public.get_user_by_email(text);
-- COMMIT;
-- NOTIFY pgrst, 'reload schema';
