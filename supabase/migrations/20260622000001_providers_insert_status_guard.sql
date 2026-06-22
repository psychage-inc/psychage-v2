-- =============================================================================
-- Finding #3.6: close non-admin provider self-insert into the public directory
-- =============================================================================
-- Live state being fixed: public.providers had exactly ONE INSERT policy,
-- "Authenticated insert provider" (PERMISSIVE, role PUBLIC), with
--   WITH CHECK (auth.uid() = user_id)
-- which gated ownership ONLY, not status. Because providers.status is NOT NULL
-- DEFAULT 'seeded', the CHECK constraint permits 'active'/'seeded', and the public
-- read path (RLS "Public read active providers" + search_providers_v3) exposes
-- status IN ('active','seeded'), any authenticated user could INSERT a row -- even
-- by omitting status (defaults to public 'seeded') -- straight into the public
-- provider directory, unaudited.
--
-- This migration adds a status guard so a self-insert cannot create a
-- publicly-readable status. Role is unchanged (PUBLIC). It touches ONLY this INSERT
-- policy: the SELECT/UPDATE/claim policies, the providers_status_check CHECK
-- constraint, and triggers are all left as-is. Publishing to active/seeded remains
-- reserved for admin/service-role paths (a separate later track).
-- =============================================================================

DROP POLICY IF EXISTS "Authenticated insert provider" ON public.providers;

CREATE POLICY "Authenticated insert provider"
  ON public.providers
  FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
    AND status NOT IN ('active', 'seeded')
  );

COMMENT ON POLICY "Authenticated insert provider" ON public.providers IS
  'Finding #3.6 fix. Self-insert allowed only for the owner (auth.uid()=user_id) and only with a non-public status (NOT active/seeded). Publishing to active/seeded is reserved for admin/service paths (separate track).';
