-- ===== CLARITY SCORE BACKEND - COMPLETE DATABASE MIGRATION =====
-- Version: 1.0.0
-- Date: 2026-03-03
-- Description: Complete schema for Clarity Score assessment system

-- ===== TABLE: profiles =====
-- User profile data linked to Supabase auth.users
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text,
  language text DEFAULT 'en' CHECK (language IN ('en', 'es', 'fr', 'ar', 'bn')),
  age_range text CHECK (age_range IN ('13-17', '18-24', '25-34', '35-44', '45-54', '55-64', '65+')),
  region text,  -- ISO 3166-1 alpha-2 country code
  clarity_index_opt_in boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ===== TABLE: assessments =====
-- Core assessment records with computed scores
CREATE TABLE assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  status text DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'abandoned')),
  language text DEFAULT 'en',

  -- Raw instrument scores (server-verified)
  phq2_raw smallint CHECK (phq2_raw IS NULL OR phq2_raw BETWEEN 0 AND 6),
  gad2_raw smallint CHECK (gad2_raw IS NULL OR gad2_raw BETWEEN 0 AND 6),
  phq4_total smallint CHECK (phq4_total IS NULL OR phq4_total BETWEEN 0 AND 12),
  who5_raw smallint CHECK (who5_raw IS NULL OR who5_raw BETWEEN 0 AND 25),
  who5_percentage smallint CHECK (who5_percentage IS NULL OR who5_percentage BETWEEN 0 AND 100),
  ucla3_raw smallint CHECK (ucla3_raw IS NULL OR ucla3_raw BETWEEN 3 AND 9),
  pss4_raw smallint CHECK (pss4_raw IS NULL OR pss4_raw BETWEEN 0 AND 16),
  functioning_raw smallint CHECK (functioning_raw IS NULL OR functioning_raw BETWEEN 0 AND 16),

  -- Normalized domain scores (0-20 each)
  domain_emotional numeric(4,1) CHECK (domain_emotional IS NULL OR domain_emotional BETWEEN 0 AND 20),
  domain_vitality numeric(4,1) CHECK (domain_vitality IS NULL OR domain_vitality BETWEEN 0 AND 20),
  domain_social numeric(4,1) CHECK (domain_social IS NULL OR domain_social BETWEEN 0 AND 20),
  domain_cognitive numeric(4,1) CHECK (domain_cognitive IS NULL OR domain_cognitive BETWEEN 0 AND 20),
  domain_functioning numeric(4,1) CHECK (domain_functioning IS NULL OR domain_functioning BETWEEN 0 AND 20),

  -- Composite
  total_score smallint CHECK (total_score IS NULL OR total_score BETWEEN 0 AND 100),
  score_label text CHECK (score_label IS NULL OR score_label IN ('thriving', 'balanced', 'struggling', 'distressed', 'crisis')),

  -- Clinical flags (stored as JSONB array)
  clinical_flags jsonb DEFAULT '[]'::jsonb,

  -- Crisis detected during this assessment (boolean, never stores crisis response details)
  crisis_detected boolean DEFAULT false,

  created_at timestamptz DEFAULT now()
);

-- ===== TABLE: assessment_responses =====
-- Individual item responses for each assessment
CREATE TABLE assessment_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id uuid NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
  item_id text NOT NULL,  -- e.g., 'phq2_1', 'who5_3', 'pss_2'
  instrument text NOT NULL CHECK (instrument IN ('phq4', 'who5', 'ucla3', 'pss4', 'functioning')),
  value smallint NOT NULL,
  answered_at timestamptz DEFAULT now(),
  UNIQUE(assessment_id, item_id)
);

-- ===== TABLE: clarity_index_contributions =====
-- Anonymized data for population-level insights (NO user_id reference)
CREATE TABLE clarity_index_contributions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  -- NO user_id reference — fully anonymized
  age_range text,
  region text,
  language text,
  total_score smallint,
  domain_emotional numeric(4,1),
  domain_vitality numeric(4,1),
  domain_social numeric(4,1),
  domain_cognitive numeric(4,1),
  domain_functioning numeric(4,1),
  phq2_raw smallint,
  gad2_raw smallint,
  who5_percentage smallint,
  ucla3_raw smallint,
  pss4_raw smallint,
  contributed_at timestamptz DEFAULT now(),
  quarter text  -- e.g., '2026-Q1'
);

-- ===== TABLE: retake_gates =====
-- Enforce 7-day minimum between assessments
CREATE TABLE retake_gates (
  user_id uuid PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  last_completed_at timestamptz,
  next_available_at timestamptz,  -- last_completed_at + 7 days
  reminder_sent_at timestamptz
);

-- ===== TABLE: rate_limits =====
-- Token bucket rate limiting
CREATE TABLE rate_limits (
  key text PRIMARY KEY,  -- e.g., 'user:{uid}:assessment_start' or 'ip:{ip}:anonymous'
  tokens integer NOT NULL,
  last_refill timestamptz NOT NULL
);

-- ===== TABLE: share_tokens =====
-- Encrypted share links for providers
CREATE TABLE share_tokens (
  token text PRIMARY KEY,
  encrypted_data text NOT NULL,  -- AES-256 encrypted assessment data
  created_by uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  expires_at timestamptz NOT NULL,
  used_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- ===== INDEXES =====
CREATE INDEX idx_assessments_user_completed ON assessments(user_id, completed_at DESC);
CREATE INDEX idx_assessments_status ON assessments(status);
CREATE INDEX idx_assessment_responses_assessment ON assessment_responses(assessment_id);
CREATE INDEX idx_clarity_index_quarter_region ON clarity_index_contributions(quarter, region);
CREATE INDEX idx_retake_gates_user ON retake_gates(user_id);
CREATE INDEX idx_rate_limits_key ON rate_limits(key);
CREATE INDEX idx_share_tokens_expires ON share_tokens(expires_at) WHERE used_at IS NULL;

-- ===== ROW LEVEL SECURITY =====
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE clarity_index_contributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE retake_gates ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE share_tokens ENABLE ROW LEVEL SECURITY;

-- ===== RLS POLICIES: profiles =====
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ===== RLS POLICIES: assessments =====
CREATE POLICY "Users can view their own assessments"
  ON assessments FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own assessments"
  ON assessments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own in-progress assessments"
  ON assessments FOR UPDATE
  USING (auth.uid() = user_id AND status = 'in_progress');

-- ===== RLS POLICIES: assessment_responses =====
CREATE POLICY "Users can view responses for their own assessments"
  ON assessment_responses FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM assessments
      WHERE assessments.id = assessment_responses.assessment_id
      AND assessments.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert responses for their own in-progress assessments"
  ON assessment_responses FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM assessments
      WHERE assessments.id = assessment_responses.assessment_id
      AND assessments.user_id = auth.uid()
      AND assessments.status = 'in_progress'
    )
  );

-- ===== RLS POLICIES: clarity_index_contributions =====
-- No SELECT policy - only service role can query aggregated data
-- INSERT policy handled in Edge Function using service role

-- ===== RLS POLICIES: retake_gates =====
CREATE POLICY "Users can view their own retake gate"
  ON retake_gates FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own retake gate"
  ON retake_gates FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own retake gate"
  ON retake_gates FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ===== RLS POLICIES: rate_limits =====
-- Service role only - no user access

-- ===== RLS POLICIES: share_tokens =====
CREATE POLICY "Users can view share tokens they created"
  ON share_tokens FOR SELECT
  USING (auth.uid() = created_by);

CREATE POLICY "Users can insert share tokens"
  ON share_tokens FOR INSERT
  WITH CHECK (auth.uid() = created_by);

-- ===== TRIGGERS =====
-- Auto-update updated_at timestamp on profiles
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ===== HELPER FUNCTIONS =====
-- Function to get quarter from timestamp
CREATE OR REPLACE FUNCTION get_quarter(ts timestamptz)
RETURNS text AS $$
BEGIN
  RETURN EXTRACT(YEAR FROM ts)::text || '-Q' || EXTRACT(QUARTER FROM ts)::text;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Function to clean expired share tokens (run via cron)
CREATE OR REPLACE FUNCTION cleanup_expired_share_tokens()
RETURNS void AS $$
BEGIN
  DELETE FROM share_tokens
  WHERE expires_at < now() - interval '7 days';  -- Keep for 7 days after expiry for audit
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ===== GRANT PERMISSIONS =====
-- Grant service role access to all tables
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;

-- Anonymous and authenticated users get RLS-controlled access
GRANT SELECT, INSERT, UPDATE ON profiles TO authenticated;
GRANT SELECT, INSERT, UPDATE ON assessments TO authenticated;
GRANT SELECT, INSERT ON assessment_responses TO authenticated;
GRANT SELECT, INSERT, UPDATE ON retake_gates TO authenticated;
GRANT SELECT, INSERT ON share_tokens TO authenticated;

-- Anonymous users can only read shared assessments (via share_tokens lookup in function)
GRANT SELECT ON share_tokens TO anon;
