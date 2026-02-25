-- ============================================================================
-- Symptom Navigator — Row-Level Security Policies
-- Migration: 003 — RLS for all navigator tables
--
-- Security model:
-- - Knowledge base tables: PUBLIC READ (educational content)
-- - Analytics: INSERT-only for anon, no read except service_role
-- - Saved results: Full user isolation via auth.uid()
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE navigator_symptoms ENABLE ROW LEVEL SECURITY;
ALTER TABLE navigator_conditions ENABLE ROW LEVEL SECURITY;
ALTER TABLE navigator_condition_symptoms ENABLE ROW LEVEL SECURITY;
ALTER TABLE navigator_condition_red_flags ENABLE ROW LEVEL SECURITY;
ALTER TABLE navigator_crisis_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE navigator_matching_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE navigator_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE navigator_saved_results ENABLE ROW LEVEL SECURITY;

-- ─── Knowledge Base Tables: PUBLIC READ ──────────────────────────────────────
-- These contain educational content. Anyone can read them.
-- Only service_role (admin/backend) can write.

-- Symptoms
CREATE POLICY "Public read access to symptoms"
    ON navigator_symptoms FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Service role manages symptoms"
    ON navigator_symptoms FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Conditions
CREATE POLICY "Public read access to conditions"
    ON navigator_conditions FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Service role manages conditions"
    ON navigator_conditions FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Condition-Symptom Mappings
CREATE POLICY "Public read access to condition symptom mappings"
    ON navigator_condition_symptoms FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Service role manages condition symptom mappings"
    ON navigator_condition_symptoms FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Condition Red Flags
CREATE POLICY "Public read access to condition red flags"
    ON navigator_condition_red_flags FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Service role manages condition red flags"
    ON navigator_condition_red_flags FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Crisis Resources
CREATE POLICY "Public read access to crisis resources"
    ON navigator_crisis_resources FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Service role manages crisis resources"
    ON navigator_crisis_resources FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Matching Config
CREATE POLICY "Public read access to matching config"
    ON navigator_matching_config FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Service role manages matching config"
    ON navigator_matching_config FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- ─── Analytics: INSERT-only (anonymous), READ for service_role ───────────────
-- No user should be able to read analytics data.
-- The anon and authenticated roles can only INSERT new events.

CREATE POLICY "Anonymous insert to analytics"
    ON navigator_analytics FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Service role reads analytics"
    ON navigator_analytics FOR SELECT
    TO service_role
    USING (true);

CREATE POLICY "Service role manages analytics"
    ON navigator_analytics FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- ─── Saved Results: Full User Isolation ──────────────────────────────────────
-- Authenticated users can only see, create, and delete their OWN rows.
-- No update — results are immutable once saved.

CREATE POLICY "Users read own saved results"
    ON navigator_saved_results FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users insert own saved results"
    ON navigator_saved_results FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users delete own saved results"
    ON navigator_saved_results FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Service role manages saved results"
    ON navigator_saved_results FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);
