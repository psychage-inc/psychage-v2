-- Security: Restrict verification INSERT to status='pending' only
-- Domain: 2 (Provider Directory)
-- Date: 2026-04-21
-- Issue: Finding #051 — providers could self-insert verification records
--        with status='passed', bypassing admin review
-- Safe for production: YES (tightens existing INSERT policy)

-- Drop the existing INSERT policy and replace with a stricter one
-- that also constrains the status value to 'pending'.
DROP POLICY IF EXISTS "Owner insert npi_check verification" ON public.provider_verifications;

CREATE POLICY "Owner insert npi_check verification"
    ON public.provider_verifications
    FOR INSERT
    TO authenticated
    WITH CHECK (
        verification_type = 'npi_check'
        AND status = 'pending'
        AND provider_id IN (SELECT id FROM public.providers WHERE user_id = auth.uid())
    );
