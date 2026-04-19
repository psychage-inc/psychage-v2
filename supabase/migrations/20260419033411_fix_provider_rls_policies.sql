-- Fix: Provider table RLS policy gaps identified during DB verification audit
-- Domain: 2 (Provider Directory)
-- Date: 2026-04-19
-- Issues: PROV-001 (claim flow broken), PROV-002 (admin edits fail), PROV-003 (cultural competencies)
-- Safe for production: YES (additive only — no DROP TABLE, no ALTER COLUMN, no data changes)

-- =============================================================================
-- FIX 1: Claim flow for seeded providers (PROV-001)
-- Problem: UPDATE policy requires auth.uid() = user_id, but seeded providers have user_id = NULL.
--          Legitimate claim attempts are silently rejected by RLS.
-- Fix: Allow authenticated users to claim seeded providers (user_id IS NULL).
-- =============================================================================

DROP POLICY IF EXISTS "Authenticated users can claim seeded providers" ON public.providers;
CREATE POLICY "Authenticated users can claim seeded providers"
    ON public.providers
    FOR UPDATE
    TO authenticated
    USING (status = 'seeded' AND user_id IS NULL)
    WITH CHECK (auth.uid() = user_id AND status IN ('claimed', 'active'));

-- =============================================================================
-- FIX 2: Admin update policy on providers table (PROV-002)
-- Problem: Only owner UPDATE policy exists. Admin edits via ProviderEditor
--          silently fail because the admin is not the provider's user_id.
-- Fix: Allow users with admin role in admin_roles to update any provider.
-- Note: Uses JWT metadata to avoid admin_roles recursion (consistent with
--       the pattern established in migration 20260330000001).
-- =============================================================================

DROP POLICY IF EXISTS "Admin can update providers" ON public.providers;
CREATE POLICY "Admin can update providers"
    ON public.providers
    FOR UPDATE
    TO authenticated
    USING (
        (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
    );

-- =============================================================================
-- FIX 3: provider_cultural_competencies missing owner-manage policy (PROV-003)
-- Problem: Every other junction table (provider_specialties, provider_languages,
--          provider_insurance) has an "Owner manage" FOR ALL policy. This one
--          was missed, so providers cannot write their cultural competency records.
-- Fix: Add the same owner-manage pattern used by sibling junction tables.
-- =============================================================================

DROP POLICY IF EXISTS "Owner manage provider_cultural_competencies" ON public.provider_cultural_competencies;
CREATE POLICY "Owner manage provider_cultural_competencies"
    ON public.provider_cultural_competencies
    FOR ALL
    TO authenticated
    USING (
        provider_id IN (SELECT id FROM public.providers WHERE user_id = auth.uid())
    )
    WITH CHECK (
        provider_id IN (SELECT id FROM public.providers WHERE user_id = auth.uid())
    );
