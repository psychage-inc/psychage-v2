-- ============================================================
-- get_user_by_email RPC — admin invite lookup
-- ============================================================
-- Date: 2026-06-07
-- Severity: P1 (admin invite flow broken at runtime)
-- Audit:    ADMIN_AUDIT_FINDINGS.md (P1-01)
--
-- Context:
--   The "Add Admin" flow in the admin panel calls
--   supabase.rpc('get_user_by_email', { email_input }) to resolve an
--   existing user's id before inserting an admin_roles row
--   (src/pages/admin/v2/settings/UserManagement.tsx). The RPC was never
--   created, so the invite mutation throws "function does not exist".
--
--   This adds the function: admin-gated (writer tier), SECURITY DEFINER
--   so it can read auth.users, returning only the minimal fields the
--   invite flow consumes (id, email).
--
-- Authorization:
--   Gated via public.is_admin_writer() (super_admin | clinical_admin),
--   reusing the AUTH-001 hardened check
--   (20260423000001_harden_admin_role_checks.sql). EXECUTE is granted to
--   authenticated, but the in-function guard rejects non-admin callers.
-- ============================================================

BEGIN;

CREATE OR REPLACE FUNCTION public.get_user_by_email(email_input text)
RETURNS TABLE (id uuid, email text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF NOT public.is_admin_writer() THEN
    RAISE EXCEPTION 'get_user_by_email: admin (writer) privileges required';
  END IF;

  RETURN QUERY
  SELECT u.id, u.email::text
  FROM auth.users u
  WHERE lower(u.email) = lower(trim(email_input))
  LIMIT 1;
END;
$$;

REVOKE ALL ON FUNCTION public.get_user_by_email(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_user_by_email(text) TO authenticated;

COMMENT ON FUNCTION public.get_user_by_email(text) IS
  'Admin invite lookup. Resolves an existing auth.users id/email by email. '
  'Gated by is_admin_writer() (super_admin|clinical_admin). Consumed by '
  'the admin User Management invite flow (P1-01).';

COMMIT;

NOTIFY pgrst, 'reload schema';

-- ============================================================
-- VERIFICATION (run after migration applies)
-- ============================================================
--   SELECT proname FROM pg_proc WHERE proname = 'get_user_by_email';
--   -- Expected: one row
--
--   -- As an admin (writer) session, resolves a known email:
--   SELECT * FROM public.get_user_by_email('demo@psychage.com');
--   -- Expected: id + email of that user (empty if none)
-- ============================================================
