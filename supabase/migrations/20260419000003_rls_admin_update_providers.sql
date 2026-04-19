-- =============================================================================
-- Phase 0.5 / Finding #048: add admin-override UPDATE policy on providers
-- =============================================================================
-- Previous state: only the provider owner (auth.uid() = user_id) could UPDATE.
-- Admin v2 ProviderEditor calls supabase.from('providers').update(...) with the
-- admin user's session, but the RLS policy rejected it because the admin isn't
-- the provider's owner. Admin edits silently failed.
--
-- Fix: add a policy that allows super_admin and editor roles to UPDATE any provider.
-- Uses direct EXISTS check against admin_roles (no JWT metadata dependency).
-- The admin_roles RLS allows self-row SELECT, so this won't recurse.
-- =============================================================================

CREATE POLICY "Admin update providers"
  ON public.providers
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_roles ar
      WHERE ar.user_id = auth.uid()
        AND ar.role IN ('super_admin', 'editor')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.admin_roles ar
      WHERE ar.user_id = auth.uid()
        AND ar.role IN ('super_admin', 'editor')
    )
  );

COMMENT ON POLICY "Admin update providers" ON public.providers IS
  'Phase 0.5 fix for Finding #048. Allows super_admin and editor roles to UPDATE any provider row.';
