-- =====================================================
-- Migration: Toolkit personal progress (Toolkits — Slice 3)
-- Date: 2026-06-15
--
-- Context:
--   Per-user, per-item progress for toolkits: opened/completed timestamps and
--   an optional self-rating. Progress is LOCAL-FIRST in the client; it is only
--   mirrored here when the user turns on the cloud-sync consent introduced
--   below ('toolkit_progress_sync', ADR-001 consent pattern — reused, not
--   reinvented). With consent off, nothing reaches this table.
--
-- RLS: a user may read/write ONLY their own rows (auth.uid() = user_id). No
--   admin/global read path — this is the user's own engagement data.
--
-- This migration also extends the consent_log consent_type CHECK to allow the
--   new 'toolkit_progress_sync' value (the column is a CHECK enum, so a new
--   value requires this constraint change).
--
-- Safety: SR-4 assessment data (Clarity Score / Symptom Navigator) is NEVER
--   written here. Progress rows reference toolkits/items only.
-- =====================================================

-- 1. Extend the consent_log CHECK enum with the new sync consent type --------
ALTER TABLE public.consent_log DROP CONSTRAINT IF EXISTS consent_log_consent_type_check;
ALTER TABLE public.consent_log ADD CONSTRAINT consent_log_consent_type_check
    CHECK (consent_type IN (
        'terms_of_service',
        'privacy_policy',
        'data_processing',
        'newsletter',
        'analytics_cookies',
        'ai_chat_history',
        'clarity_score_tracking',
        'age_verification',
        'toolkit_progress_sync'
    ));

-- 2. user_toolkit_progress --------------------------------------------------
CREATE TABLE IF NOT EXISTS public.user_toolkit_progress (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    toolkit_id UUID NOT NULL REFERENCES public.toolkits(id) ON DELETE CASCADE,
    item_id UUID NOT NULL REFERENCES public.toolkit_items(id) ON DELETE CASCADE,
    opened_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    self_rating VARCHAR(20) CHECK (self_rating IN ('a_little', 'not_yet')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (user_id, item_id)
);

CREATE INDEX IF NOT EXISTS idx_user_toolkit_progress_user
    ON public.user_toolkit_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_toolkit_progress_toolkit
    ON public.user_toolkit_progress(user_id, toolkit_id);

ALTER TABLE public.user_toolkit_progress ENABLE ROW LEVEL SECURITY;

-- Own-rows only: read, insert, update, delete are all scoped to auth.uid().
CREATE POLICY "user_toolkit_progress_select_own"
    ON public.user_toolkit_progress FOR SELECT TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "user_toolkit_progress_insert_own"
    ON public.user_toolkit_progress FOR INSERT TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "user_toolkit_progress_update_own"
    ON public.user_toolkit_progress FOR UPDATE TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "user_toolkit_progress_delete_own"
    ON public.user_toolkit_progress FOR DELETE TO authenticated
    USING (auth.uid() = user_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_toolkit_progress TO authenticated;

DROP TRIGGER IF EXISTS user_toolkit_progress_updated_at ON public.user_toolkit_progress;
CREATE TRIGGER user_toolkit_progress_updated_at
    BEFORE UPDATE ON public.user_toolkit_progress
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
