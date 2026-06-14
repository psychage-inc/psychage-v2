-- =====================================================
-- Migration: CT3 crisis dataset — crisis_countries + crisis_helplines
-- Date: 2026-06-14
-- Description: Persistence for the CT3 crisis-helpline dataset that backs
--   crisis screens S11 (region/helpline view), S12 (country picker), S17
--   (navigator halt). DATA LAYER ONLY — no UI here.
--
-- POSTURE: This is PUBLIC REFERENCE DATA, not SR-4 (symptom/mood) data.
--   Public-read RLS; service_role writes (seed, bundle export, founder
--   promotions). verification_status governs DISPLAY, not STORAGE: every row
--   is stored; only 'verified' rows are ever exposed to anon/authenticated.
--
-- NOTE: distinct from the legacy public.crisis_resources table (web V2's
--   ~29-resource set). This migration adds new tables; it does not touch it.
-- =====================================================

-- =====================================================
-- CRISIS_COUNTRIES
-- =====================================================
CREATE TABLE IF NOT EXISTS public.crisis_countries (
    iso2 CHAR(2) PRIMARY KEY,
    country_name TEXT NOT NULL,
    -- text, not int — preserves "110 police, 120 ambulance" style notes
    emergency_number TEXT NOT NULL,
    emergency_note TEXT,
    -- drives the S11 gap state when false
    has_verified_helplines BOOLEAN NOT NULL DEFAULT FALSE,
    last_verified DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- CRISIS_HELPLINES
-- =====================================================
CREATE TABLE IF NOT EXISTS public.crisis_helplines (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    country_iso2 CHAR(2) NOT NULL
        REFERENCES public.crisis_countries(iso2) ON DELETE CASCADE,
    name TEXT NOT NULL,
    -- DRAFT copy owned by CT4; loaded verbatim, never rewritten here
    description TEXT NOT NULL,
    call_number TEXT,
    text_capable BOOLEAN NOT NULL DEFAULT FALSE,
    text_number TEXT,
    availability TEXT,
    languages TEXT,
    source_url TEXT,
    verification_status TEXT NOT NULL
        CHECK (verification_status IN ('verified', 'needs_verification', 'do_not_publish')),
    is_international BOOLEAN NOT NULL DEFAULT FALSE,
    display_order INT NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_crisis_helplines_country_status_order
    ON public.crisis_helplines (country_iso2, verification_status, display_order);

-- =====================================================
-- ROW LEVEL SECURITY
-- =====================================================
ALTER TABLE public.crisis_countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crisis_helplines ENABLE ROW LEVEL SECURITY;

-- crisis_countries: every country is publicly readable. Country metadata is
-- not sensitive, and the S11 gap state needs every country visible (even ones
-- with has_verified_helplines = false).
DROP POLICY IF EXISTS "Crisis countries are publicly readable" ON public.crisis_countries;
CREATE POLICY "Crisis countries are publicly readable"
    ON public.crisis_countries FOR SELECT TO public
    USING (true);

-- crisis_helplines: only 'verified' rows are publicly readable. Belt-and-braces
-- with the client-side filter — RLS independently prevents anon/authenticated
-- from reading needs_verification / do_not_publish rows.
DROP POLICY IF EXISTS "Verified crisis helplines are publicly readable" ON public.crisis_helplines;
CREATE POLICY "Verified crisis helplines are publicly readable"
    ON public.crisis_helplines FOR SELECT TO public
    USING (verification_status = 'verified');

-- No INSERT / UPDATE / DELETE policies for anon/authenticated => all writes
-- denied by default-deny RLS. service_role bypasses RLS for seed/export/promotions.

-- =====================================================
-- UPDATED_AT TRIGGERS (reuse public.handle_updated_at from profiles migration)
-- =====================================================
DROP TRIGGER IF EXISTS crisis_countries_updated_at ON public.crisis_countries;
CREATE TRIGGER crisis_countries_updated_at
    BEFORE UPDATE ON public.crisis_countries
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS crisis_helplines_updated_at ON public.crisis_helplines;
CREATE TRIGGER crisis_helplines_updated_at
    BEFORE UPDATE ON public.crisis_helplines
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- =====================================================
-- GRANTS (RLS still gates row visibility; these grant table-level SELECT)
-- =====================================================
GRANT SELECT ON public.crisis_countries TO anon, authenticated;
GRANT SELECT ON public.crisis_helplines TO anon, authenticated;
