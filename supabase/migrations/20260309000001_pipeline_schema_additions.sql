-- =============================================================================
-- Provider Pipeline — Schema Additions
-- Adds columns and tables needed for bulk government data ingestion.
-- =============================================================================

-- =============================================================================
-- 1. ADD COLUMNS TO providers TABLE
-- =============================================================================

ALTER TABLE public.providers ADD COLUMN IF NOT EXISTS taxonomy_code text;
ALTER TABLE public.providers ADD COLUMN IF NOT EXISTS taxonomy_description text;
ALTER TABLE public.providers ADD COLUMN IF NOT EXISTS facility_type text;
ALTER TABLE public.providers ADD COLUMN IF NOT EXISTS sliding_fee_scale boolean DEFAULT false;
ALTER TABLE public.providers ADD COLUMN IF NOT EXISTS emergency_services boolean DEFAULT false;
ALTER TABLE public.providers ADD COLUMN IF NOT EXISTS data_last_synced_at timestamptz;

-- =============================================================================
-- 2. EXPAND source CHECK CONSTRAINT (add 'hrsa_hc')
-- =============================================================================

ALTER TABLE public.providers DROP CONSTRAINT IF EXISTS providers_source_check;
ALTER TABLE public.providers ADD CONSTRAINT providers_source_check
  CHECK (source IN ('npi_registry', 'samhsa', 'hrsa_hc', 'manual', 'claim'));

-- =============================================================================
-- 3. EXPAND practice_type CHECK CONSTRAINT
-- =============================================================================

ALTER TABLE public.providers DROP CONSTRAINT IF EXISTS providers_practice_type_check;
ALTER TABLE public.providers ADD CONSTRAINT providers_practice_type_check
  CHECK (practice_type IS NULL OR practice_type IN (
    'solo', 'group', 'clinic', 'hospital', 'community_center',
    'residential', 'outpatient', 'inpatient', 'fqhc', 'cmhc'
  ));

-- =============================================================================
-- 4. INDEXES FOR NEW COLUMNS
-- =============================================================================

CREATE INDEX IF NOT EXISTS idx_providers_taxonomy_code ON public.providers (taxonomy_code)
  WHERE taxonomy_code IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_providers_source_type ON public.providers (source);
CREATE INDEX IF NOT EXISTS idx_providers_data_synced ON public.providers (data_last_synced_at)
  WHERE data_last_synced_at IS NOT NULL;

-- =============================================================================
-- 5. SHORTAGE AREAS TABLE
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.shortage_areas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hpsa_id text UNIQUE NOT NULL,
  designation_type text NOT NULL
    CHECK (designation_type IN ('geographic', 'population', 'facility')),
  discipline text NOT NULL DEFAULT 'mental_health'
    CHECK (discipline IN ('mental_health', 'primary_care', 'dental')),
  state_abbr text NOT NULL,
  county_name text,
  hpsa_name text NOT NULL,
  hpsa_score integer,
  designation_date date,
  last_update_date date,
  latitude float8,
  longitude float8,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_shortage_areas_state ON public.shortage_areas (state_abbr);
CREATE INDEX IF NOT EXISTS idx_shortage_areas_score ON public.shortage_areas (hpsa_score)
  WHERE hpsa_score IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_shortage_areas_discipline ON public.shortage_areas (discipline)
  WHERE discipline = 'mental_health';

ALTER TABLE public.shortage_areas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read shortage_areas" ON public.shortage_areas
  FOR SELECT USING (true);

-- =============================================================================
-- 6. SEED NEW SPECIALTIES FOR SAMHSA/HRSA DATA
-- =============================================================================

INSERT INTO public.specialties (slug, label, category, sort_order) VALUES
  ('mat', 'Medication-Assisted Treatment (MAT)', 'treatment_approach', 18),
  ('crisis_intervention', 'Crisis Intervention', 'treatment_approach', 19),
  ('detoxification', 'Detoxification Services', 'treatment_approach', 20),
  ('residential_treatment', 'Residential Treatment', 'treatment_approach', 21),
  ('iop', 'Intensive Outpatient Program (IOP)', 'treatment_approach', 22),
  ('php', 'Partial Hospitalization Program (PHP)', 'treatment_approach', 23),
  ('dual_diagnosis', 'Dual Diagnosis / Co-Occurring', 'condition', 21),
  ('court_ordered', 'Court-Ordered Treatment', 'population', 14),
  ('pregnant_postpartum', 'Pregnant / Postpartum Women', 'population', 15),
  ('homeless_services', 'Homeless / Housing Services', 'population', 16),
  ('criminal_justice', 'Criminal Justice Clients', 'population', 17)
ON CONFLICT (slug) DO NOTHING;
