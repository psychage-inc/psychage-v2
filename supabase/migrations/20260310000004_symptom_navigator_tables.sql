-- ============================================================
-- Symptom Navigator Admin Tables
-- symptoms, conditions, symptom_condition_mappings, publish log
-- ============================================================

CREATE TABLE IF NOT EXISTS symptoms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  symptom_id TEXT UNIQUE NOT NULL,
  domain TEXT NOT NULL CHECK (domain IN ('physical', 'emotional', 'cognitive', 'behavioral')),
  category TEXT NOT NULL,
  clinical_name TEXT NOT NULL,
  display_names JSONB NOT NULL DEFAULT '{}',
  synonyms JSONB NOT NULL DEFAULT '{}',
  is_active BOOLEAN DEFAULT TRUE,
  related_symptoms TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS conditions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  condition_id TEXT UNIQUE NOT NULL,
  name JSONB NOT NULL DEFAULT '{}',
  category TEXT NOT NULL,
  description JSONB NOT NULL DEFAULT '{}',
  duration_threshold TEXT,
  min_symptom_count INTEGER,
  prevalence_data JSONB,
  evidence_sources JSONB,
  educational_content_id UUID,
  red_flags TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT TRUE,
  clinical_review_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS symptom_condition_mappings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  condition_id TEXT NOT NULL,
  symptom_id TEXT NOT NULL,
  weight INTEGER NOT NULL CHECK (weight BETWEEN 1 AND 3),
  is_core BOOLEAN DEFAULT FALSE,
  is_red_flag BOOLEAN DEFAULT FALSE,
  evidence_reference TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(condition_id, symptom_id)
);

CREATE TABLE IF NOT EXISTS navigator_publish_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  published_by UUID REFERENCES auth.users(id),
  symptom_count INTEGER,
  condition_count INTEGER,
  mapping_count INTEGER,
  status TEXT DEFAULT 'success' CHECK (status IN ('success', 'failed')),
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add columns that may be missing if tables were created by an earlier migration
ALTER TABLE symptoms ADD COLUMN IF NOT EXISTS domain TEXT;
ALTER TABLE symptoms ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;
ALTER TABLE conditions ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE conditions ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;

-- Indexes
CREATE INDEX IF NOT EXISTS idx_symptoms_domain ON symptoms(domain);
CREATE INDEX IF NOT EXISTS idx_symptoms_active ON symptoms(is_active);
CREATE INDEX IF NOT EXISTS idx_conditions_category ON conditions(category);
CREATE INDEX IF NOT EXISTS idx_conditions_active ON conditions(is_active);
CREATE INDEX IF NOT EXISTS idx_mappings_condition ON symptom_condition_mappings(condition_id);
CREATE INDEX IF NOT EXISTS idx_mappings_symptom ON symptom_condition_mappings(symptom_id);

-- RLS
ALTER TABLE symptoms ENABLE ROW LEVEL SECURITY;
ALTER TABLE conditions ENABLE ROW LEVEL SECURITY;
ALTER TABLE symptom_condition_mappings ENABLE ROW LEVEL SECURITY;
ALTER TABLE navigator_publish_log ENABLE ROW LEVEL SECURITY;

-- Public read for active data
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'public_symptoms_read' AND tablename = 'symptoms') THEN
    CREATE POLICY "public_symptoms_read" ON symptoms FOR SELECT USING (is_active = true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'public_conditions_read' AND tablename = 'conditions') THEN
    CREATE POLICY "public_conditions_read" ON conditions FOR SELECT USING (is_active = true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'public_mappings_read' AND tablename = 'symptom_condition_mappings') THEN
    CREATE POLICY "public_mappings_read" ON symptom_condition_mappings FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'admin_publish_log_read' AND tablename = 'navigator_publish_log') THEN
    CREATE POLICY "admin_publish_log_read" ON navigator_publish_log FOR SELECT USING (
      EXISTS (SELECT 1 FROM admin_roles ar WHERE ar.user_id = auth.uid())
    );
  END IF;
END $$;

-- Admin write
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'admin_symptoms_write' AND tablename = 'symptoms') THEN
    CREATE POLICY "admin_symptoms_write" ON symptoms FOR ALL USING (
      EXISTS (SELECT 1 FROM admin_roles ar WHERE ar.user_id = auth.uid() AND ar.role IN ('super_admin', 'clinical_admin'))
    );
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'admin_conditions_write' AND tablename = 'conditions') THEN
    CREATE POLICY "admin_conditions_write" ON conditions FOR ALL USING (
      EXISTS (SELECT 1 FROM admin_roles ar WHERE ar.user_id = auth.uid() AND ar.role IN ('super_admin', 'clinical_admin'))
    );
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'admin_mappings_write' AND tablename = 'symptom_condition_mappings') THEN
    CREATE POLICY "admin_mappings_write" ON symptom_condition_mappings FOR ALL USING (
      EXISTS (SELECT 1 FROM admin_roles ar WHERE ar.user_id = auth.uid() AND ar.role IN ('super_admin', 'clinical_admin'))
    );
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'admin_publish_log_write' AND tablename = 'navigator_publish_log') THEN
    CREATE POLICY "admin_publish_log_write" ON navigator_publish_log FOR INSERT WITH CHECK (
      EXISTS (SELECT 1 FROM admin_roles ar WHERE ar.user_id = auth.uid())
    );
  END IF;
END $$;
