-- =============================================================================
-- Phase 0.5 / Finding #049: add owner-manage policy for provider_cultural_competencies
-- =============================================================================
-- Matches the pattern on provider_specialties, provider_languages, provider_insurance.
-- The original migration (20260306000001) created only a public SELECT policy and
-- missed the owner-manage FOR ALL policy that all other junction tables have.
-- =============================================================================

CREATE POLICY "Owner manage provider_cultural_competencies"
  ON public.provider_cultural_competencies
  FOR ALL
  USING (
    provider_id IN (
      SELECT id FROM public.providers WHERE user_id = auth.uid()
    )
  )
  WITH CHECK (
    provider_id IN (
      SELECT id FROM public.providers WHERE user_id = auth.uid()
    )
  );

COMMENT ON POLICY "Owner manage provider_cultural_competencies" ON public.provider_cultural_competencies IS
  'Phase 0.5 fix for Finding #049. Allows providers to manage their own cultural competency associations.';
