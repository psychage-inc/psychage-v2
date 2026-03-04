-- ============================================================================
-- Symptom Navigator — Add Idempotency Key to Saved Results
-- Migration: 20260225000001
--
-- Prevents duplicate saves on retry/double-click by allowing clients to
-- pass an idempotency_key that is unique per (user_id, key) pair.
-- ============================================================================

ALTER TABLE navigator_saved_results
  ADD COLUMN IF NOT EXISTS idempotency_key TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS uq_saved_results_idempotency
  ON navigator_saved_results (user_id, idempotency_key)
  WHERE idempotency_key IS NOT NULL;
