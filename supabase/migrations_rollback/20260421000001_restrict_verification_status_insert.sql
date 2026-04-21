-- Rollback: Revert to previous INSERT policy (without status constraint)
DROP POLICY IF EXISTS "Owner insert npi_check verification" ON public.provider_verifications;

CREATE POLICY "Owner insert npi_check verification"
    ON public.provider_verifications
    FOR INSERT
    TO authenticated
    WITH CHECK (
        verification_type = 'npi_check'
        AND provider_id IN (SELECT id FROM public.providers WHERE user_id = auth.uid())
    );
