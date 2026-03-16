-- =============================================================================
-- Provider Search Performance — Scale to 200k+ providers
--
-- Adds trigram indexes, composite indexes, and optimizes the search RPC
-- for ILIKE queries at scale. Ensures sub-second search performance
-- with 200k+ provider records.
-- =============================================================================

-- Enable pg_trgm for trigram-based ILIKE index acceleration
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- ─── Trigram indexes for ILIKE text search ──────────────────────────────────

-- Provider name search (used in search RPC ILIKE)
CREATE INDEX IF NOT EXISTS idx_providers_display_name_trgm
  ON public.providers USING gin (display_name gin_trgm_ops);

-- Practice name search
CREATE INDEX IF NOT EXISTS idx_providers_practice_name_trgm
  ON public.providers USING gin (practice_name gin_trgm_ops)
  WHERE practice_name IS NOT NULL;

-- Credentials search
CREATE INDEX IF NOT EXISTS idx_providers_credentials_trgm
  ON public.providers USING gin (credentials_suffix gin_trgm_ops)
  WHERE credentials_suffix IS NOT NULL;

-- City search (used in location filtering)
CREATE INDEX IF NOT EXISTS idx_provider_locations_city_trgm
  ON public.provider_locations USING gin (city gin_trgm_ops)
  WHERE city IS NOT NULL;

-- ─── Composite indexes for common query patterns ────────────────────────────

-- Location: state + city composite (most common filter combo)
CREATE INDEX IF NOT EXISTS idx_provider_locations_state_city
  ON public.provider_locations (state_province, city)
  WHERE is_primary = true;

-- Location: provider_id + is_primary (JOIN optimization for search RPC)
CREATE INDEX IF NOT EXISTS idx_provider_locations_provider_primary
  ON public.provider_locations (provider_id)
  WHERE is_primary = true;

-- Provider status + type composite (filters applied in every search)
CREATE INDEX IF NOT EXISTS idx_providers_status_type
  ON public.providers (status, provider_type_id)
  WHERE status IN ('active', 'seeded');

-- ─── Junction table composite indexes ───────────────────────────────────────

-- Provider specialties: composite for JOIN in search
CREATE INDEX IF NOT EXISTS idx_provider_specialties_composite
  ON public.provider_specialties (provider_id, specialty_id);

-- Provider languages: composite for JOIN in search
CREATE INDEX IF NOT EXISTS idx_provider_languages_composite
  ON public.provider_languages (provider_id, language_id);

-- Provider competencies: composite for JOIN in search
CREATE INDEX IF NOT EXISTS idx_provider_competencies_composite
  ON public.provider_cultural_competencies (provider_id, competency_id);

-- Provider insurance: composite for JOIN in search
CREATE INDEX IF NOT EXISTS idx_provider_insurance_composite
  ON public.provider_insurance (provider_id, insurance_plan_id);

-- ─── Location upsert support ────────────────────────────────────────────────

-- Unique constraint for upsert on (provider_id, is_primary) to prevent
-- duplicate primary locations during bulk seeding
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'uq_provider_locations_primary'
  ) THEN
    -- Only create if no duplicate primaries exist
    IF (SELECT COUNT(*) FROM (
      SELECT provider_id FROM public.provider_locations
      WHERE is_primary = true
      GROUP BY provider_id HAVING COUNT(*) > 1
    ) dupes) = 0 THEN
      ALTER TABLE public.provider_locations
        ADD CONSTRAINT uq_provider_locations_primary
        UNIQUE (provider_id, is_primary);
    ELSE
      RAISE NOTICE 'Skipping unique constraint — duplicate primary locations exist. Clean up first.';
    END IF;
  END IF;
END
$$;
