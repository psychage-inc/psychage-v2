-- =============================================================================
-- Provider Directory V2 — Normalized Schema
-- Replaces the flat providers table with a fully normalized directory system.
-- =============================================================================

-- Preserve old table for rollback (can be dropped later)
ALTER TABLE IF EXISTS public.providers RENAME TO providers_legacy;

-- =============================================================================
-- LOOKUP TABLES
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.provider_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  label text NOT NULL,
  description text,
  sort_order integer DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.specialties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  label text NOT NULL,
  category text NOT NULL CHECK (category IN ('condition', 'treatment_approach', 'population')),
  psychage_condition_id text,
  sort_order integer DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.languages_lookup (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  label text NOT NULL,
  native_label text NOT NULL
);

CREATE TABLE IF NOT EXISTS public.cultural_competencies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  label text NOT NULL,
  description text
);

CREATE TABLE IF NOT EXISTS public.insurance_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  carrier text NOT NULL,
  plan_type text CHECK (plan_type IN ('commercial', 'medicaid', 'medicare', 'tricare', 'other'))
);

-- =============================================================================
-- CORE PROVIDERS TABLE
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.providers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  npi_number text UNIQUE,
  license_number text,
  license_state text,
  provider_type_id uuid NOT NULL REFERENCES public.provider_types(id),
  status text NOT NULL DEFAULT 'seeded'
    CHECK (status IN ('seeded', 'claimed', 'submitted', 'verified', 'active', 'suspended', 'rejected')),
  tier text NOT NULL DEFAULT 'free'
    CHECK (tier IN ('free', 'premium')),
  source text NOT NULL DEFAULT 'manual'
    CHECK (source IN ('npi_registry', 'samhsa', 'manual', 'claim')),
  display_name text NOT NULL,
  credentials_suffix text,
  bio text,
  photo_url text,
  practice_name text,
  practice_type text CHECK (practice_type IS NULL OR practice_type IN ('solo', 'group', 'clinic', 'hospital', 'community_center')),
  website_url text,
  phone text,
  email text,
  appointment_url text,
  is_accepting_patients boolean DEFAULT true,
  telehealth_available boolean DEFAULT false,
  in_person_available boolean DEFAULT true,
  verified_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- =============================================================================
-- PROVIDER LOCATIONS (1:many)
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.provider_locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id uuid NOT NULL REFERENCES public.providers(id) ON DELETE CASCADE,
  address_line1 text,
  address_line2 text,
  city text,
  state_province text,
  postal_code text,
  country_code text DEFAULT 'US',
  latitude float8,
  longitude float8,
  is_primary boolean DEFAULT true
);

-- =============================================================================
-- JUNCTION TABLES
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.provider_specialties (
  provider_id uuid NOT NULL REFERENCES public.providers(id) ON DELETE CASCADE,
  specialty_id uuid NOT NULL REFERENCES public.specialties(id) ON DELETE CASCADE,
  PRIMARY KEY (provider_id, specialty_id)
);

CREATE TABLE IF NOT EXISTS public.provider_languages (
  provider_id uuid NOT NULL REFERENCES public.providers(id) ON DELETE CASCADE,
  language_id uuid NOT NULL REFERENCES public.languages_lookup(id) ON DELETE CASCADE,
  proficiency text DEFAULT 'fluent' CHECK (proficiency IN ('native', 'fluent', 'conversational')),
  PRIMARY KEY (provider_id, language_id)
);

CREATE TABLE IF NOT EXISTS public.provider_cultural_competencies (
  provider_id uuid NOT NULL REFERENCES public.providers(id) ON DELETE CASCADE,
  competency_id uuid NOT NULL REFERENCES public.cultural_competencies(id) ON DELETE CASCADE,
  PRIMARY KEY (provider_id, competency_id)
);

CREATE TABLE IF NOT EXISTS public.provider_insurance (
  provider_id uuid NOT NULL REFERENCES public.providers(id) ON DELETE CASCADE,
  insurance_plan_id uuid NOT NULL REFERENCES public.insurance_plans(id) ON DELETE CASCADE,
  PRIMARY KEY (provider_id, insurance_plan_id)
);

-- =============================================================================
-- VERIFICATION AUDIT TRAIL
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.provider_verifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id uuid NOT NULL REFERENCES public.providers(id) ON DELETE CASCADE,
  verification_type text NOT NULL CHECK (verification_type IN ('npi_check', 'license_check', 'email', 'manual')),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('passed', 'failed', 'pending')),
  details jsonb,
  verified_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- =============================================================================
-- INDEXES
-- =============================================================================

-- Provider search
CREATE INDEX IF NOT EXISTS idx_providers_status ON public.providers (status) WHERE status = 'active';
CREATE INDEX IF NOT EXISTS idx_providers_status_seeded ON public.providers (status) WHERE status IN ('active', 'seeded');
CREATE INDEX IF NOT EXISTS idx_providers_type ON public.providers (provider_type_id);
CREATE INDEX IF NOT EXISTS idx_providers_tier ON public.providers (tier);
CREATE INDEX IF NOT EXISTS idx_providers_npi ON public.providers (npi_number) WHERE npi_number IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_providers_user ON public.providers (user_id) WHERE user_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_providers_name_search ON public.providers
  USING gin (to_tsvector('english', coalesce(display_name, '') || ' ' || coalesce(bio, '') || ' ' || coalesce(practice_name, '')));

-- Geographic search
CREATE INDEX IF NOT EXISTS idx_provider_locations_geo ON public.provider_locations (latitude, longitude) WHERE latitude IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_provider_locations_provider ON public.provider_locations (provider_id);
CREATE INDEX IF NOT EXISTS idx_provider_locations_state ON public.provider_locations (state_province);

-- Junction table lookups
CREATE INDEX IF NOT EXISTS idx_provider_specialties_specialty ON public.provider_specialties (specialty_id);
CREATE INDEX IF NOT EXISTS idx_provider_languages_language ON public.provider_languages (language_id);
CREATE INDEX IF NOT EXISTS idx_provider_competencies_competency ON public.provider_cultural_competencies (competency_id);
CREATE INDEX IF NOT EXISTS idx_provider_insurance_plan ON public.provider_insurance (insurance_plan_id);

-- Verifications
CREATE INDEX IF NOT EXISTS idx_provider_verifications_provider ON public.provider_verifications (provider_id);

-- =============================================================================
-- ROW LEVEL SECURITY
-- =============================================================================

ALTER TABLE public.provider_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.specialties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.languages_lookup ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cultural_competencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.insurance_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.provider_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.provider_specialties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.provider_languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.provider_cultural_competencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.provider_insurance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.provider_verifications ENABLE ROW LEVEL SECURITY;

-- Lookup tables: public read
DROP POLICY IF EXISTS "Public read provider_types" ON public.provider_types;
CREATE POLICY "Public read provider_types" ON public.provider_types FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public read specialties" ON public.specialties;
CREATE POLICY "Public read specialties" ON public.specialties FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public read languages_lookup" ON public.languages_lookup;
CREATE POLICY "Public read languages_lookup" ON public.languages_lookup FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public read cultural_competencies" ON public.cultural_competencies;
CREATE POLICY "Public read cultural_competencies" ON public.cultural_competencies FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public read insurance_plans" ON public.insurance_plans;
CREATE POLICY "Public read insurance_plans" ON public.insurance_plans FOR SELECT USING (true);

-- Providers: public read active/seeded, owner update
DROP POLICY IF EXISTS "Public read active providers" ON public.providers;
CREATE POLICY "Public read active providers" ON public.providers
  FOR SELECT USING (status IN ('active', 'seeded'));
DROP POLICY IF EXISTS "Owner update provider" ON public.providers;
CREATE POLICY "Owner update provider" ON public.providers
  FOR UPDATE USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Authenticated insert provider" ON public.providers;
CREATE POLICY "Authenticated insert provider" ON public.providers
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Provider locations: public read for visible providers, owner manage
DROP POLICY IF EXISTS "Public read provider_locations" ON public.provider_locations;
CREATE POLICY "Public read provider_locations" ON public.provider_locations
  FOR SELECT USING (
    provider_id IN (SELECT id FROM public.providers WHERE status IN ('active', 'seeded'))
  );
DROP POLICY IF EXISTS "Owner manage provider_locations" ON public.provider_locations;
CREATE POLICY "Owner manage provider_locations" ON public.provider_locations
  FOR ALL USING (
    provider_id IN (SELECT id FROM public.providers WHERE user_id = auth.uid())
  );

-- Provider specialties
DROP POLICY IF EXISTS "Public read provider_specialties" ON public.provider_specialties;
CREATE POLICY "Public read provider_specialties" ON public.provider_specialties
  FOR SELECT USING (
    provider_id IN (SELECT id FROM public.providers WHERE status IN ('active', 'seeded'))
  );
DROP POLICY IF EXISTS "Owner manage provider_specialties" ON public.provider_specialties;
CREATE POLICY "Owner manage provider_specialties" ON public.provider_specialties
  FOR ALL USING (
    provider_id IN (SELECT id FROM public.providers WHERE user_id = auth.uid())
  );

-- Provider languages
DROP POLICY IF EXISTS "Public read provider_languages" ON public.provider_languages;
CREATE POLICY "Public read provider_languages" ON public.provider_languages
  FOR SELECT USING (
    provider_id IN (SELECT id FROM public.providers WHERE status IN ('active', 'seeded'))
  );
DROP POLICY IF EXISTS "Owner manage provider_languages" ON public.provider_languages;
CREATE POLICY "Owner manage provider_languages" ON public.provider_languages
  FOR ALL USING (
    provider_id IN (SELECT id FROM public.providers WHERE user_id = auth.uid())
  );

-- Provider cultural competencies
DROP POLICY IF EXISTS "Public read provider_cultural_competencies" ON public.provider_cultural_competencies;
CREATE POLICY "Public read provider_cultural_competencies" ON public.provider_cultural_competencies
  FOR SELECT USING (
    provider_id IN (SELECT id FROM public.providers WHERE status IN ('active', 'seeded'))
  );

-- Provider insurance
DROP POLICY IF EXISTS "Public read provider_insurance" ON public.provider_insurance;
CREATE POLICY "Public read provider_insurance" ON public.provider_insurance
  FOR SELECT USING (
    provider_id IN (SELECT id FROM public.providers WHERE status IN ('active', 'seeded'))
  );

-- Provider verifications: owner read only
DROP POLICY IF EXISTS "Owner read provider_verifications" ON public.provider_verifications;
CREATE POLICY "Owner read provider_verifications" ON public.provider_verifications
  FOR SELECT USING (
    provider_id IN (SELECT id FROM public.providers WHERE user_id = auth.uid())
  );
DROP POLICY IF EXISTS "Owner insert provider_verifications" ON public.provider_verifications;
CREATE POLICY "Owner insert provider_verifications" ON public.provider_verifications
  FOR INSERT WITH CHECK (
    provider_id IN (SELECT id FROM public.providers WHERE user_id = auth.uid())
  );

-- =============================================================================
-- UPDATED_AT TRIGGER
-- =============================================================================

CREATE OR REPLACE FUNCTION public.update_provider_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS providers_updated_at ON public.providers;
CREATE TRIGGER providers_updated_at
  BEFORE UPDATE ON public.providers
  FOR EACH ROW EXECUTE FUNCTION public.update_provider_updated_at();
