-- =============================================================================
-- Fix infinite recursion (SQLSTATE 42P17) in public.users RLS
-- =============================================================================
-- The SELECT policy "Admins can view all users" was created directly in the
-- Supabase dashboard (no prior migration) with a USING clause that queried the
-- SAME table it guards:
--
--   USING (EXISTS (SELECT 1 FROM users users_1
--                  WHERE users_1.id = auth.uid() AND users_1.role = 'admin'))
--
-- Evaluating any SELECT on public.users runs this sub-SELECT on public.users,
-- which re-applies the policy -> infinite recursion. Result: EVERY read of
-- public.users (incl. non-admin "view own data" reads) failed with
--   ERROR: infinite recursion detected in policy for relation "users" (42P17)
-- surfacing in the admin UI as "Showing demo data - Supabase query failed".
--
-- Additional problems with the old predicate:
--   * public.users.role = 'admin' matches ZERO rows today (admin identity was
--     migrated to the public.admin_roles table), so it granted nobody anyway.
--   * Reading admin status from a self-row column is the recursion source.
--
-- Fix: determine admin via public.admin_roles (the current source of truth, whose
-- own policies do NOT read public.users, so no recursion) and the same role set
-- used by the providers admin policies (super_admin / clinical_admin). This both
-- removes the recursion and restores admin visibility (super_admins exist in
-- admin_roles). Tracks the previously dashboard-only policy in version control.
-- =============================================================================

DROP POLICY IF EXISTS "Admins can view all users" ON public.users;

CREATE POLICY "Admins can view all users"
  ON public.users
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM public.admin_roles ar
      WHERE ar.user_id = auth.uid()
        AND ar.role = ANY (ARRAY['super_admin', 'clinical_admin'])
    )
  );

COMMENT ON POLICY "Admins can view all users" ON public.users IS
  'Admins (admin_roles super_admin/clinical_admin) may read all users. Replaces a self-referential users.role=admin subquery that caused 42P17 recursion. Non-admins still read only their own row via "Users can view own data".';
