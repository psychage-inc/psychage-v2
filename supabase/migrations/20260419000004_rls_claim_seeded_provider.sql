-- =============================================================================
-- Phase 0.5 / Finding #056: allow authenticated users to claim seeded providers
-- =============================================================================
-- Previous state: UPDATE policy required auth.uid() = user_id, but seeded providers
-- have user_id IS NULL, so NULL comparison always evaluates to NULL (deny).
-- No authenticated user could claim a seeded provider via the client-side path.
--
-- Note: The Edge Function at supabase/functions/claim-provider/ uses the service
-- role key and bypasses RLS. This policy fixes the client-side path used by
-- ProviderClaimForm.tsx → claimProvider() in src/lib/providers/queries.ts.
--
-- NPI verification is enforced in application code (queries.ts:580), not at the
-- RLS level. This policy is narrowly scoped: only allows claiming unclaimed
-- seeded providers where the new user_id matches the authenticated user.
-- =============================================================================

CREATE POLICY "Claim seeded provider"
  ON public.providers
  FOR UPDATE
  USING (
    -- Can only target providers that are currently seeded and unclaimed
    status = 'seeded'
    AND user_id IS NULL
    AND auth.uid() IS NOT NULL
  )
  WITH CHECK (
    -- The NEW row must have the claimer as its user_id
    auth.uid() = user_id
    -- And status must transition to 'claimed' (not arbitrary)
    AND status = 'claimed'
  );

COMMENT ON POLICY "Claim seeded provider" ON public.providers IS
  'Phase 0.5 fix for Finding #056. Allows authenticated users to claim seeded providers with NULL user_id. USING (seeded+NULL) and WITH CHECK (user_id=auth.uid() AND status=claimed).';
