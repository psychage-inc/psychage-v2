/**
 * CRISIS DETECTION SYSTEM - DATABASE SCHEMA
 *
 * Creates all required tables for the crisis detection and management system.
 * All tables have Row Level Security (RLS) enabled.
 *
 * Run this migration after the base Psychage schema.
 *
 * Tables:
 * 1. crisis_events - Anonymous impact tracking (no PII)
 * 2. mood_logs - Mood tracking with pattern analysis
 * 3. safety_plans - Encrypted safety plan storage
 * 4. crisis_resources_cache - ThroughLine API cache (24hr TTL)
 */

-- ==================== CRISIS EVENTS ====================
-- Anonymous logging for system effectiveness tracking
-- NEVER contains: raw text, IP addresses, user identity, specific keywords

CREATE TABLE IF NOT EXISTS crisis_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tier INTEGER NOT NULL CHECK (tier IN (1, 2, 3)),
  country_code CHAR(2),
  detected_language VARCHAR(10),
  session_id TEXT NOT NULL,  -- SHA-256 hashed, not reversible
  triggered_at TIMESTAMPTZ DEFAULT NOW(),
  throughline_resource_shown BOOLEAN DEFAULT FALSE,
  emergency_modal_dismissed BOOLEAN,
  dismissal_path TEXT CHECK (dismissal_path IN ('called_help', 'safe_now'))
);

-- Index for analytics queries
CREATE INDEX idx_crisis_events_tier ON crisis_events(tier);
CREATE INDEX idx_crisis_events_country ON crisis_events(country_code);
CREATE INDEX idx_crisis_events_triggered_at ON crisis_events(triggered_at);

-- RLS: Anyone can insert (anonymous logging), only service role can read
ALTER TABLE crisis_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert crisis events"
  ON crisis_events FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Only service role can read crisis events"
  ON crisis_events FOR SELECT
  TO service_role
  USING (true);

-- ==================== MOOD LOGS ====================
-- Pattern detection for proactive intervention

CREATE TABLE IF NOT EXISTS mood_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id_hash TEXT NOT NULL,  -- SHA-256 of user ID, not reversible
  mood_level INTEGER NOT NULL CHECK (mood_level BETWEEN 0 AND 5),
  logged_at TIMESTAMPTZ DEFAULT NOW(),
  country_code CHAR(2),
  triggered_alert_type TEXT
);

-- Index for pattern analysis queries
CREATE INDEX idx_mood_logs_user_hash ON mood_logs(user_id_hash);
CREATE INDEX idx_mood_logs_logged_at ON mood_logs(logged_at);
CREATE INDEX idx_mood_logs_mood_level ON mood_logs(mood_level);

-- RLS: Users can only access their own mood logs
ALTER TABLE mood_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert their own mood logs"
  ON mood_logs FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can read their own mood logs"
  ON mood_logs FOR SELECT
  TO authenticated
  USING (
    user_id_hash = encode(digest(auth.uid()::text, 'sha256'), 'hex')
  );

CREATE POLICY "Users can delete their own mood logs"
  ON mood_logs FOR DELETE
  TO authenticated
  USING (
    user_id_hash = encode(digest(auth.uid()::text, 'sha256'), 'hex')
  );

-- ==================== SAFETY PLANS ====================
-- Encrypted safety plan storage (AES-256-GCM)

CREATE TABLE IF NOT EXISTS safety_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  encrypted_content TEXT NOT NULL,  -- AES-256-GCM encrypted JSON
  iv TEXT NOT NULL,  -- Initialization vector for decryption
  version INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  is_complete BOOLEAN DEFAULT FALSE
);

-- Index for user lookups
CREATE INDEX idx_safety_plans_user_id ON safety_plans(user_id);

-- RLS: Users can only access their own safety plans
ALTER TABLE safety_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert their own safety plans"
  ON safety_plans FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read their own safety plans"
  ON safety_plans FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own safety plans"
  ON safety_plans FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own safety plans"
  ON safety_plans FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_safety_plan_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER safety_plans_updated_at
  BEFORE UPDATE ON safety_plans
  FOR EACH ROW
  EXECUTE FUNCTION update_safety_plan_updated_at();

-- ==================== CRISIS RESOURCES CACHE ====================
-- ThroughLine API response cache (24hr TTL)

CREATE TABLE IF NOT EXISTS crisis_resources_cache (
  country_code CHAR(2) PRIMARY KEY,
  resources JSONB NOT NULL,
  cached_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT NOW() + INTERVAL '24 hours'
);

-- Index for expiration cleanup
CREATE INDEX idx_crisis_resources_cache_expires_at ON crisis_resources_cache(expires_at);

-- RLS: Anyone can read cached resources
ALTER TABLE crisis_resources_cache ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read cached resources"
  ON crisis_resources_cache FOR SELECT
  TO anon, authenticated
  USING (expires_at > NOW());

CREATE POLICY "Only service role can update cache"
  ON crisis_resources_cache FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Function to clean up expired cache entries
CREATE OR REPLACE FUNCTION cleanup_expired_crisis_cache()
RETURNS void AS $$
BEGIN
  DELETE FROM crisis_resources_cache
  WHERE expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- ==================== GRANTS ====================

GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT SELECT, INSERT ON crisis_events TO anon, authenticated;
GRANT SELECT, INSERT, DELETE ON mood_logs TO authenticated;
GRANT ALL ON safety_plans TO authenticated;
GRANT SELECT ON crisis_resources_cache TO anon, authenticated;

-- ==================== COMMENTS ====================

COMMENT ON TABLE crisis_events IS 'Anonymous crisis detection events for impact tracking. No PII stored.';
COMMENT ON TABLE mood_logs IS 'User mood tracking with pattern analysis for proactive intervention.';
COMMENT ON TABLE safety_plans IS 'AES-256-GCM encrypted safety plans. Psychage cannot decrypt these.';
COMMENT ON TABLE crisis_resources_cache IS 'ThroughLine API response cache with 24-hour TTL.';

COMMENT ON COLUMN crisis_events.session_id IS 'SHA-256 hashed session identifier. Not reversible to user identity.';
COMMENT ON COLUMN mood_logs.user_id_hash IS 'SHA-256 hash of user ID. Not reversible.';
COMMENT ON COLUMN safety_plans.encrypted_content IS 'AES-256-GCM encrypted JSON. Key derived from user session token.';
COMMENT ON COLUMN safety_plans.iv IS 'Initialization vector for AES-GCM decryption. Required to decrypt content.';
