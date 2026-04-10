-- =============================================================================
-- Extend provider_verifications for 3-tier verification system
-- Tier 1: NPI Verification (existing npi_check)
-- Tier 2: License Verification (state license with expiry)
-- Tier 3: Psychage Certified (application-based, reviewed by staff)
-- =============================================================================

-- Add verification tier column
ALTER TABLE public.provider_verifications
  ADD COLUMN IF NOT EXISTS tier text DEFAULT 'npi'
    CHECK (tier IN ('npi', 'license', 'certified'));

-- License verification fields
ALTER TABLE public.provider_verifications
  ADD COLUMN IF NOT EXISTS license_number text;

ALTER TABLE public.provider_verifications
  ADD COLUMN IF NOT EXISTS license_state text;

ALTER TABLE public.provider_verifications
  ADD COLUMN IF NOT EXISTS license_expiry date;

-- Psychage Certified application data
ALTER TABLE public.provider_verifications
  ADD COLUMN IF NOT EXISTS certification_application jsonb;

-- Staff review tracking
ALTER TABLE public.provider_verifications
  ADD COLUMN IF NOT EXISTS reviewed_by uuid;

ALTER TABLE public.provider_verifications
  ADD COLUMN IF NOT EXISTS reviewed_at timestamptz;

-- Verification expiration (for license renewals and cert expiry)
ALTER TABLE public.provider_verifications
  ADD COLUMN IF NOT EXISTS expires_at timestamptz;

-- Index for looking up a provider's highest verification tier
CREATE INDEX IF NOT EXISTS idx_verifications_provider_tier
  ON public.provider_verifications(provider_id, tier, status)
  WHERE status = 'passed';
