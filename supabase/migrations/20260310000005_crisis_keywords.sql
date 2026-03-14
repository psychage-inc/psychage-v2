-- ============================================================
-- Crisis Keywords Table
-- ============================================================

CREATE TABLE IF NOT EXISTS crisis_keywords (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  keyword TEXT NOT NULL,
  language TEXT NOT NULL DEFAULT 'en',
  severity TEXT NOT NULL CHECK (severity IN ('CRISIS', 'URGENT', 'WATCH')),
  category TEXT NOT NULL CHECK (category IN (
    'suicidal_ideation', 'self_harm', 'harm_to_others',
    'substance_crisis', 'psychotic_crisis', 'domestic_violence',
    'child_abuse', 'eating_disorder_crisis'
  )),
  is_active BOOLEAN DEFAULT TRUE,
  last_reviewed TIMESTAMPTZ,
  added_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_crisis_keywords_lang ON crisis_keywords(language, is_active);
CREATE INDEX IF NOT EXISTS idx_crisis_keywords_severity ON crisis_keywords(severity);

ALTER TABLE crisis_keywords ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'admin_keywords_all' AND tablename = 'crisis_keywords') THEN
    CREATE POLICY "admin_keywords_all" ON crisis_keywords
      FOR ALL USING (
        EXISTS (SELECT 1 FROM admin_roles ar WHERE ar.user_id = auth.uid() AND ar.role IN ('super_admin', 'clinical_admin'))
      );
  END IF;
END $$;
