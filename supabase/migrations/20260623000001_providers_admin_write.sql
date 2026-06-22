-- =============================================================================
-- Provider directory: admin write enablement (INSERT + child tables)
-- =============================================================================
-- Context
-- -------
-- The self-insert status guard (20260622000001_providers_insert_status_guard)
-- correctly blocks non-admins from inserting publicly-readable provider rows
-- (status IN ('active','seeded')). That hole is closed.
--
-- Two gaps remained, both for ADMIN write paths:
--
--   1. There was NO admin INSERT policy on public.providers. The admin v2
--      ProviderEditor "Add Provider" flow inserts a row with status='active'
--      (and no user_id) using the admin's own session. The only INSERT policy
--      was the non-admin self-insert guard, which rejects status='active', so
--      admin provider creation was silently rejected by RLS.
--
--   2. The provider child tables (locations / specialties / languages /
--      insurance / cultural_competencies) had only owner-scoped "Owner manage"
--      (FOR ALL) policies. When an admin edits a provider they do NOT own,
--      ProviderEditor deletes+reinserts these child rows — but RLS matched no
--      policy, so those writes silently no-op'd (delete affected 0 rows,
--      insert was rejected) while the parent UPDATE succeeded.
--
-- Admin UPDATE on providers itself is already handled live by the existing
-- "Admin update providers" policy (super_admin/clinical_admin), so this
-- migration does not touch it. It also does NOT touch the self-insert guard.
--
-- Expand-only. Admin = is_admin_writer() (super_admin or clinical_admin;
-- SECURITY DEFINER, defined in 20260423000001_harden_admin_role_checks).
-- Permissive policies are OR'd, so adding an admin INSERT policy leaves the
-- non-admin self-insert guard fully intact for non-admins.
-- =============================================================================

-- 1. Admin INSERT on providers --------------------------------------------------
DROP POLICY IF EXISTS "Admin insert providers" ON public.providers;
CREATE POLICY "Admin insert providers"
  ON public.providers
  FOR INSERT
  WITH CHECK (public.is_admin_writer());

COMMENT ON POLICY "Admin insert providers" ON public.providers IS
  'Allows super_admin/clinical_admin to INSERT any provider row (e.g. admin '
  '"Add Provider" with status=active). Non-admins remain bound by the '
  'self-insert status guard (20260622000001).';

-- 2. Admin write on provider child tables --------------------------------------
-- FOR ALL (USING + WITH CHECK) mirrors the existing "Owner manage ..." policies
-- so admins can delete+reinsert child rows when editing non-owned providers.

DROP POLICY IF EXISTS "Admin manage provider_locations" ON public.provider_locations;
CREATE POLICY "Admin manage provider_locations"
  ON public.provider_locations
  FOR ALL
  USING (public.is_admin_writer())
  WITH CHECK (public.is_admin_writer());

DROP POLICY IF EXISTS "Admin manage provider_specialties" ON public.provider_specialties;
CREATE POLICY "Admin manage provider_specialties"
  ON public.provider_specialties
  FOR ALL
  USING (public.is_admin_writer())
  WITH CHECK (public.is_admin_writer());

DROP POLICY IF EXISTS "Admin manage provider_languages" ON public.provider_languages;
CREATE POLICY "Admin manage provider_languages"
  ON public.provider_languages
  FOR ALL
  USING (public.is_admin_writer())
  WITH CHECK (public.is_admin_writer());

DROP POLICY IF EXISTS "Admin manage provider_insurance" ON public.provider_insurance;
CREATE POLICY "Admin manage provider_insurance"
  ON public.provider_insurance
  FOR ALL
  USING (public.is_admin_writer())
  WITH CHECK (public.is_admin_writer());

DROP POLICY IF EXISTS "Admin manage provider_cultural_competencies" ON public.provider_cultural_competencies;
CREATE POLICY "Admin manage provider_cultural_competencies"
  ON public.provider_cultural_competencies
  FOR ALL
  USING (public.is_admin_writer())
  WITH CHECK (public.is_admin_writer());
