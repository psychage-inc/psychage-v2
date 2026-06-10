-- ============================================================================
-- Symptom Navigator — Sacred-cap CHECK + analytics minimization
-- Migration: 20260610000003
--
-- Two server-side guarantees that mirror the client changes in this wave:
--
--   1. (audit C-8 / B2-2) Constrain navigator_matching_config.confidence_cap so
--      the sacred 0.75 relevance cap can NEVER be raised via the config row.
--      The client already clamps against a frozen literal in scoring.ts; this
--      makes the data layer fail-safe too.
--
--   2. (audit C-1 / B2-6) Minimize navigator_analytics: drop the
--      `safety_flag_level` column (a mental-health inference that must never be
--      persisted) and remove 'crisis_triggered' from the allowed event types.
--      The client no longer emits either.
--
-- Idempotent: safe to re-run.
-- ============================================================================

BEGIN;

-- ─── 1. Freeze the confidence cap at the data layer ─────────────────────────

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'navigator_matching_config_confidence_cap_max'
    ) THEN
        ALTER TABLE navigator_matching_config
            ADD CONSTRAINT navigator_matching_config_confidence_cap_max
            CHECK (confidence_cap <= 0.75);
    END IF;
END $$;

-- ─── 2. Minimize navigator_analytics ────────────────────────────────────────

-- Drop the safety-inference column (no crisis/safety state is ever persisted).
ALTER TABLE navigator_analytics DROP COLUMN IF EXISTS safety_flag_level;

-- Tighten the event_type allow-list: remove 'crisis_triggered'.
ALTER TABLE navigator_analytics DROP CONSTRAINT IF EXISTS navigator_analytics_event_type_check;
ALTER TABLE navigator_analytics
    ADD CONSTRAINT navigator_analytics_event_type_check
    CHECK (event_type IN ('started', 'completed', 'result_clicked', 'provider_clicked'));

COMMIT;

-- ============================================================================
-- End of migration
-- ============================================================================
