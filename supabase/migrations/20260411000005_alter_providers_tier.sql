-- =============================================================================
-- Migrate providers.tier from 2-tier to 3-tier system
-- 'free' | 'premium' → 'free' | 'pro' | 'elite'
-- Also adds claimed_at and trust_score_cached columns
-- =============================================================================

-- Step 1: Migrate existing 'premium' rows to 'pro'
UPDATE public.providers SET tier = 'pro' WHERE tier = 'premium';

-- Step 2: Drop old constraint and add new 3-tier constraint
ALTER TABLE public.providers DROP CONSTRAINT IF EXISTS providers_tier_check;
ALTER TABLE public.providers
  ADD CONSTRAINT providers_tier_check CHECK (tier IN ('free', 'pro', 'elite'));

-- Step 3: Add new columns
ALTER TABLE public.providers
  ADD COLUMN IF NOT EXISTS claimed_at timestamptz;

ALTER TABLE public.providers
  ADD COLUMN IF NOT EXISTS trust_score_cached numeric(5,2) DEFAULT 0;

-- Step 4: Index for trust score sorting in search
CREATE INDEX IF NOT EXISTS idx_providers_trust_score
  ON public.providers(trust_score_cached DESC NULLS LAST)
  WHERE status IN ('active', 'seeded');

-- Step 5: Update the covering index for the new 3-tier sort
-- The existing idx_providers_default_sort uses (tier, display_name)
-- which still works since the tier values changed but the column type didn't.
-- No action needed on existing indexes.
