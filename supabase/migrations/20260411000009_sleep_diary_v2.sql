-- ============================================================================
-- Sleep Architect V2 — Diary Entries & User Settings
-- ============================================================================
-- New table for the V2 sleep diary (richer schema than legacy sleep_entries).
-- Legacy sleep_entries table is left intact for backward compatibility.
-- ============================================================================

-- ── Sleep Diary Entries ─────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.sleep_diary_entries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    bedtime TIME NOT NULL,
    lights_out TIME NOT NULL,
    sleep_onset_minutes INTEGER NOT NULL DEFAULT 15 CHECK (sleep_onset_minutes >= 0),
    wake_time TIME NOT NULL,
    out_of_bed_time TIME NOT NULL,
    night_wakings INTEGER NOT NULL DEFAULT 0 CHECK (night_wakings >= 0),
    night_waking_duration_minutes INTEGER NOT NULL DEFAULT 0 CHECK (night_waking_duration_minutes >= 0),
    sleep_quality SMALLINT NOT NULL CHECK (sleep_quality BETWEEN 1 AND 5),
    morning_mood SMALLINT NOT NULL CHECK (morning_mood BETWEEN 1 AND 5),
    dream_recall BOOLEAN NOT NULL DEFAULT FALSE,
    dream_notes TEXT,
    naps JSONB NOT NULL DEFAULT '[]',
    substances JSONB NOT NULL DEFAULT '{}',
    notes TEXT,
    -- Stored computed fields for fast dashboard queries
    total_sleep_minutes INTEGER,
    sleep_efficiency DECIMAL(5,2),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    -- One entry per date per user
    CONSTRAINT uq_sleep_diary_user_date UNIQUE (user_id, date)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_sleep_diary_user_date
    ON public.sleep_diary_entries (user_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_sleep_diary_user_created
    ON public.sleep_diary_entries (user_id, created_at DESC);

-- RLS
ALTER TABLE public.sleep_diary_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "sleep_diary_select_own" ON public.sleep_diary_entries
    FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "sleep_diary_insert_own" ON public.sleep_diary_entries
    FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "sleep_diary_update_own" ON public.sleep_diary_entries
    FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "sleep_diary_delete_own" ON public.sleep_diary_entries
    FOR DELETE TO authenticated USING (auth.uid() = user_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.sleep_diary_entries TO authenticated;

-- ── Sleep User Settings ─────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.sleep_user_settings (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    target_sleep_minutes INTEGER NOT NULL DEFAULT 480,
    chronotype VARCHAR(20),
    target_bedtime TIME,
    target_wake_time TIME,
    age_range VARCHAR(30) NOT NULL DEFAULT 'adult_26_64',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE public.sleep_user_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "sleep_settings_select_own" ON public.sleep_user_settings
    FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "sleep_settings_insert_own" ON public.sleep_user_settings
    FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "sleep_settings_update_own" ON public.sleep_user_settings
    FOR UPDATE TO authenticated USING (auth.uid() = user_id);

GRANT SELECT, INSERT, UPDATE ON public.sleep_user_settings TO authenticated;
