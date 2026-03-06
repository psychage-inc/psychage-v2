-- =====================================================
-- Migration: Clarity Score History
-- Date: 2026-03-07
-- Description: Persistent storage for Clarity Score assessments
--              enabling longitudinal tracking for authenticated users.
-- =====================================================

CREATE TABLE IF NOT EXISTS public.clarity_score_history (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    total_score INTEGER NOT NULL CHECK (total_score >= 0 AND total_score <= 100),
    label VARCHAR(50) NOT NULL,
    tier VARCHAR(50) NOT NULL,
    domain_scores JSONB NOT NULL DEFAULT '{}',
    sub_scores JSONB NOT NULL DEFAULT '{}',
    flags TEXT[] DEFAULT '{}',
    strengths TEXT[] DEFAULT '{}',
    growth_areas TEXT[] DEFAULT '{}',
    raw_answers JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_clarity_history_user ON public.clarity_score_history(user_id);
CREATE INDEX IF NOT EXISTS idx_clarity_history_created ON public.clarity_score_history(user_id, created_at DESC);

ALTER TABLE public.clarity_score_history ENABLE ROW LEVEL SECURITY;

-- Users can view their own clarity history
CREATE POLICY "clarity_history_select_own"
    ON public.clarity_score_history FOR SELECT TO authenticated
    USING (auth.uid() = user_id);

-- Users can insert their own clarity results
CREATE POLICY "clarity_history_insert_own"
    ON public.clarity_score_history FOR INSERT TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- Scores are immutable — no UPDATE policy
-- Deletion handled by CASCADE from auth.users

-- Admins can view all for support/analytics
CREATE POLICY "clarity_history_select_admin"
    ON public.clarity_score_history FOR SELECT TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles p
            WHERE p.id = auth.uid() AND p.role = 'admin'
        )
    );

GRANT SELECT, INSERT ON public.clarity_score_history TO authenticated;
