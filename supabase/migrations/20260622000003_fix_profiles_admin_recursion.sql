-- =============================================================================
-- Fix infinite recursion (SQLSTATE 42P17) in public.profiles RLS
-- =============================================================================
-- Same class of fault as 20260622000002 (public.users), in the sibling table.
-- Two admin policies on public.profiles were created with predicates that query
-- the SAME table they guard:
--
--   "Admins can view all profiles"   (SELECT)
--   "Admins can update all profiles" (UPDATE)
--     USING (EXISTS (SELECT 1 FROM profiles p
--                    WHERE p.id = auth.uid() AND p.role = 'admin'))
--
-- Evaluating any SELECT/UPDATE on public.profiles runs this sub-SELECT on
-- public.profiles, which re-applies the policy -> infinite recursion. EVERY read
-- of public.profiles (incl. the non-admin "view own profile" read) failed with
--   ERROR: infinite recursion detected in policy for relation "profiles" (42P17)
-- This surfaced in the admin Dashboard (which counts users via public.profiles)
-- as em-dashed cards. The users-table fix (20260622000002) unblocked the Articles
-- list, but the Dashboard's profiles read stayed broken until this migration.
--
-- Additional problem with the old predicate (same as the users case):
--   * profiles.role = 'admin' is no longer the source of admin identity; admin
--     identity lives in public.admin_roles. The self-row column read is also the
--     recursion source.
--
-- Fix: determine admin via public.admin_roles (whose own policies do NOT read
-- public.profiles, so no recursion) using the same role set as the users/providers
-- admin policies (super_admin / clinical_admin). Removes the recursion and keeps
-- admin visibility. Non-admins keep own-row-only access via the untouched
-- "Users can view own profile" / "Users can update own profile" policies.
-- Expand-only: replaces two policy bodies; RLS stays enabled; no table changes.
-- =============================================================================

-- SELECT: admins may read all profiles (non-recursive via admin_roles)
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

CREATE POLICY "Admins can view all profiles"
  ON public.profiles
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM public.admin_roles ar
      WHERE ar.user_id = auth.uid()
        AND ar.role = ANY (ARRAY['super_admin', 'clinical_admin'])
    )
  );

COMMENT ON POLICY "Admins can view all profiles" ON public.profiles IS
  'Admins (admin_roles super_admin/clinical_admin) may read all profiles. Replaces a self-referential profiles.role=admin subquery that caused 42P17 recursion. Non-admins still read only their own row via "Users can view own profile".';

-- UPDATE: admins may update all profiles (non-recursive via admin_roles)
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;

CREATE POLICY "Admins can update all profiles"
  ON public.profiles
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1
      FROM public.admin_roles ar
      WHERE ar.user_id = auth.uid()
        AND ar.role = ANY (ARRAY['super_admin', 'clinical_admin'])
    )
  );

COMMENT ON POLICY "Admins can update all profiles" ON public.profiles IS
  'Admins (admin_roles super_admin/clinical_admin) may update all profiles. Replaces a self-referential profiles.role=admin subquery that caused 42P17 recursion. Non-admins still update only their own row via "Users can update own profile".';
