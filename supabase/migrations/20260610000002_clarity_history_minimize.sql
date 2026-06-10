-- Minimize clarity_score_history to the derived scores the dashboard reads.
--
-- Owner ruling: opt-in "Save to Dashboard" persists DERIVED scores only.
-- The read path (UserDashboard / AssessmentHistory) uses total_score, label,
-- and domain_scores exclusively. Everything else collected before now —
-- item-level answers, sub-scores, clinical flags, insight text, the tier band —
-- is purged. This is destructive on purpose: it removes the existing exposure.
BEGIN;

-- 1. Remove admin read access. No admin UI reads this table; the service role
--    retains full access for ops. (Policy added in 20260430000001.)
DROP POLICY IF EXISTS "clarity_history_select_admin" ON public.clarity_score_history;

-- 2. Purge every column the read path never touches.
ALTER TABLE public.clarity_score_history
  DROP COLUMN IF EXISTS raw_answers,
  DROP COLUMN IF EXISTS sub_scores,
  DROP COLUMN IF EXISTS flags,
  DROP COLUMN IF EXISTS strengths,
  DROP COLUMN IF EXISTS growth_areas,
  DROP COLUMN IF EXISTS tier;

-- 3. Give users a path to delete their own saved scores.
CREATE POLICY "clarity_history_delete_own"
  ON public.clarity_score_history FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

COMMIT;
