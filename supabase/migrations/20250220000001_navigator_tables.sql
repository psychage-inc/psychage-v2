-- ============================================================================
-- Symptom Navigator — Database Schema
-- Migration: 001 — Create all navigator tables
--
-- This creates the relational knowledge base that the client-side matching
-- engine reads via the /api/navigator/knowledge-base endpoint.
--
-- PRIVACY NOTES:
-- - Knowledge base tables are PUBLIC READ (educational content)
-- - Analytics table is INSERT-ONLY (no read except admin)
-- - Saved results are fully RLS-protected per user
-- ============================================================================

-- ─── Symptoms Table ─────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS navigator_symptoms (
    id TEXT PRIMARY KEY,
    domain TEXT NOT NULL CHECK (domain IN ('physical', 'emotional', 'cognitive', 'behavioral')),
    category TEXT NOT NULL CHECK (category IN (
        'mood', 'anxiety_fear', 'emotional_regulation',
        'body_sensations', 'sleep', 'appetite_weight', 'energy',
        'cognition', 'perception',
        'social', 'coping', 'activity_level'
    )),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    synonyms TEXT[] DEFAULT '{}',
    ask_duration BOOLEAN DEFAULT TRUE,
    ask_severity BOOLEAN DEFAULT TRUE,
    ask_frequency BOOLEAN DEFAULT TRUE,
    is_red_flag BOOLEAN DEFAULT FALSE,
    red_flag_level TEXT CHECK (red_flag_level IN ('CRISIS', 'URGENT', 'WATCH') OR red_flag_level IS NULL),
    severity_red_flag_threshold INTEGER CHECK (severity_red_flag_threshold BETWEEN 1 AND 10 OR severity_red_flag_threshold IS NULL),
    severity_red_flag_level TEXT CHECK (severity_red_flag_level IN ('CRISIS', 'URGENT', 'WATCH') OR severity_red_flag_level IS NULL),
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    version TEXT NOT NULL DEFAULT '1.0.0',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_nav_symptoms_domain_category
    ON navigator_symptoms (domain, category, is_active);
CREATE INDEX IF NOT EXISTS idx_nav_symptoms_active
    ON navigator_symptoms (is_active);
CREATE INDEX IF NOT EXISTS idx_nav_symptoms_red_flag
    ON navigator_symptoms (is_red_flag) WHERE is_red_flag = TRUE;

-- ─── Conditions Table ───────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS navigator_conditions (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    full_name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN (
        'mood', 'anxiety', 'trauma', 'obsessive_compulsive',
        'neurodevelopmental', 'stress', 'sleep', 'eating', 'substance'
    )),
    description_for_user TEXT NOT NULL,
    minimum_duration TEXT NOT NULL,
    minimum_duration_display TEXT NOT NULL,
    minimum_symptoms_for_relevance INTEGER NOT NULL DEFAULT 2,
    always_recommend_professional BOOLEAN DEFAULT FALSE,
    guide_path TEXT NOT NULL DEFAULT '',
    coping_path TEXT NOT NULL DEFAULT '',
    provider_questions TEXT[] DEFAULT '{}',
    clinical_notes TEXT NOT NULL DEFAULT '',
    is_active BOOLEAN DEFAULT TRUE,
    version TEXT NOT NULL DEFAULT '1.0.0',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_nav_conditions_active_category
    ON navigator_conditions (is_active, category);

-- ─── Condition–Symptom Mappings (Junction Table) ────────────────────────────

CREATE TABLE IF NOT EXISTS navigator_condition_symptoms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    condition_id TEXT NOT NULL REFERENCES navigator_conditions(id) ON DELETE CASCADE,
    symptom_id TEXT NOT NULL REFERENCES navigator_symptoms(id) ON DELETE CASCADE,
    weight INTEGER NOT NULL CHECK (weight BETWEEN 1 AND 3),
    role TEXT NOT NULL CHECK (role IN ('core', 'common', 'associated')),
    clinical_note TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (condition_id, symptom_id)
);

CREATE INDEX IF NOT EXISTS idx_nav_cs_condition ON navigator_condition_symptoms (condition_id);
CREATE INDEX IF NOT EXISTS idx_nav_cs_symptom ON navigator_condition_symptoms (symptom_id);

-- ─── Condition Red Flags ────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS navigator_condition_red_flags (
    condition_id TEXT NOT NULL REFERENCES navigator_conditions(id) ON DELETE CASCADE,
    symptom_id TEXT NOT NULL REFERENCES navigator_symptoms(id) ON DELETE CASCADE,
    note TEXT,
    PRIMARY KEY (condition_id, symptom_id)
);

-- ─── Crisis Resources ───────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS navigator_crisis_resources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    region_code TEXT NOT NULL,
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('hotline', 'text', 'directory')),
    phone TEXT,
    text_instruction TEXT,
    url TEXT,
    email TEXT,
    description TEXT NOT NULL,
    hours TEXT NOT NULL DEFAULT '24/7',
    languages TEXT[] DEFAULT '{English}',
    priority INTEGER NOT NULL DEFAULT 0,
    condition_specific TEXT[],
    is_active BOOLEAN DEFAULT TRUE,
    last_verified TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_nav_crisis_region
    ON navigator_crisis_resources (region_code, is_active);

-- ─── Matching Config (Single-Row) ───────────────────────────────────────────

CREATE TABLE IF NOT EXISTS navigator_matching_config (
    id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
    confidence_cap DECIMAL NOT NULL DEFAULT 0.75,
    min_relevance_threshold DECIMAL NOT NULL DEFAULT 0.15,
    below_minimum_penalty DECIMAL NOT NULL DEFAULT 0.3,
    max_results INTEGER NOT NULL DEFAULT 4,
    min_results INTEGER NOT NULL DEFAULT 1,
    max_per_family INTEGER NOT NULL DEFAULT 2,
    severity_modifiers JSONB NOT NULL DEFAULT '{
        "1": 0.6,
        "2-3": 0.8,
        "4-5": 1.0,
        "6-7": 1.2,
        "8-10": 1.4
    }',
    frequency_modifiers JSONB NOT NULL DEFAULT '{
        "rarely": 0.7,
        "sometimes": 1.0,
        "often": 1.2,
        "always": 1.4
    }',
    duration_modifiers JSONB NOT NULL DEFAULT '{
        "below_half": 0.7,
        "half_to_full": 1.0,
        "meets_or_exceeds": 1.3
    }',
    relevance_display_tiers JSONB NOT NULL DEFAULT '{
        "high": {"min": 0.55, "label": "Highly Relevant", "color": "#2563eb"},
        "moderate": {"min": 0.35, "label": "Moderately Relevant", "color": "#7c3aed"},
        "low": {"min": 0.15, "label": "Possibly Relevant", "color": "#6b7280"},
        "minimal": {"min": 0, "label": "Low Relevance", "color": "#9ca3af"}
    }',
    version TEXT NOT NULL DEFAULT '1.0.0',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Navigator Analytics (Anonymous Aggregates) ─────────────────────────────

CREATE TABLE IF NOT EXISTS navigator_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_hash TEXT NOT NULL,
    event_type TEXT NOT NULL CHECK (event_type IN (
        'started', 'completed', 'crisis_triggered', 'result_clicked', 'provider_clicked'
    )),
    domains_selected INTEGER,
    symptoms_selected INTEGER,
    time_to_complete_seconds INTEGER,
    results_shown INTEGER,
    safety_flag_level TEXT CHECK (safety_flag_level IN ('CRISIS', 'URGENT', 'WATCH') OR safety_flag_level IS NULL),
    feedback_helpful BOOLEAN,
    created_at TIMESTAMPTZ DEFAULT NOW()
    -- NOTE: NO symptom IDs, NO condition IDs, NO user identifiers.
    -- Counts and booleans only. This is by design.
);

CREATE INDEX IF NOT EXISTS idx_nav_analytics_session
    ON navigator_analytics (session_hash, created_at);
CREATE INDEX IF NOT EXISTS idx_nav_analytics_event
    ON navigator_analytics (event_type, created_at);

-- ─── Saved Results (Optional, Authenticated Users) ──────────────────────────

CREATE TABLE IF NOT EXISTS navigator_saved_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    encrypted_results TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_nav_saved_user
    ON navigator_saved_results (user_id, created_at DESC);

-- ─── Updated At Trigger ─────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION update_navigator_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_nav_symptoms_updated
    BEFORE UPDATE ON navigator_symptoms
    FOR EACH ROW EXECUTE FUNCTION update_navigator_updated_at();

CREATE TRIGGER trg_nav_conditions_updated
    BEFORE UPDATE ON navigator_conditions
    FOR EACH ROW EXECUTE FUNCTION update_navigator_updated_at();

CREATE TRIGGER trg_nav_cs_updated
    BEFORE UPDATE ON navigator_condition_symptoms
    FOR EACH ROW EXECUTE FUNCTION update_navigator_updated_at();

CREATE TRIGGER trg_nav_config_updated
    BEFORE UPDATE ON navigator_matching_config
    FOR EACH ROW EXECUTE FUNCTION update_navigator_updated_at();
