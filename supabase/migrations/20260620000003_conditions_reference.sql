-- =====================================================
-- Migration: Conditions reference (ICD-11 Chapter 6)
-- Date: 2026-06-20
--
-- Context:
--   A standalone A–Z educational reference covering every ICD-11 Chapter 6
--   four-character category. This is a DELIBERATELY SEPARATE entity from:
--     * the Symptom Navigator `navigator_conditions` table (a decision engine), and
--     * the 30 article content categories.
--   It backs /conditions (A–Z index) and /conditions/:slug (condition page). There is
--   no link between a condition row and any article — every condition appears whether
--   or not an article exists.
--
-- Verification gate (ABSOLUTE):
--   Every authored row lands `verification_status = 'unverified'`. The public surface
--   renders verified rows only. This is enforced in two layers:
--     1. RLS — anon/authenticated may SELECT verified rows only.
--     2. conditionsService.applyGate — the client mirror (and what makes ?preview=1
--        work via the bundled corpus without exposing drafts from the DB).
--   Clinical reviewers (admins) may read/write everything to approve copy later, in a
--   batch, OUTSIDE this build. crisis_flag is a clinical decision left for review.
-- =====================================================

CREATE TABLE IF NOT EXISTS public.conditions (
    id                       UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug                     TEXT UNIQUE NOT NULL,
    name                     TEXT NOT NULL,
    icd11_code               TEXT NOT NULL,
    icd11_grouping           TEXT NOT NULL,
    -- The four authored plain-language fields. NULL until copy lands; the UI renders a
    -- graceful "definition in review" state for nulls.
    short_definition         TEXT,
    what_it_feels_like       TEXT,
    how_it_differs           TEXT,
    when_more_than_everyday  TEXT,
    -- Clinical decision, left for review. When true, the page surfaces crisis support.
    crisis_flag              BOOLEAN NOT NULL DEFAULT FALSE,
    provenance               TEXT,
    verification_status      VARCHAR(20) NOT NULL DEFAULT 'unverified'
                               CHECK (verification_status IN ('unverified', 'verified')),
    reading_level            TEXT DEFAULT '8th grade',
    created_at               TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at               TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_conditions_name ON public.conditions(name);
CREATE INDEX IF NOT EXISTS idx_conditions_grouping ON public.conditions(icd11_grouping);
CREATE INDEX IF NOT EXISTS idx_conditions_status ON public.conditions(verification_status);

ALTER TABLE public.conditions ENABLE ROW LEVEL SECURITY;

-- Public read — VERIFIED rows only (defense-in-depth for the verification gate).
DO $$ BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE policyname = 'conditions_public_read_verified' AND tablename = 'conditions'
    ) THEN
        CREATE POLICY "conditions_public_read_verified"
            ON public.conditions FOR SELECT TO anon, authenticated
            USING (verification_status = 'verified');
    END IF;

    -- Clinical reviewers / admins may read and write everything (incl. unverified)
    -- so condition copy can be approved later, in a batch, outside this build.
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE policyname = 'conditions_admin_all' AND tablename = 'conditions'
    ) THEN
        CREATE POLICY "conditions_admin_all"
            ON public.conditions FOR ALL
            USING (
                EXISTS (
                    SELECT 1 FROM public.admin_roles ar
                    WHERE ar.user_id = auth.uid()
                      AND ar.role IN ('super_admin', 'editor')
                )
            )
            WITH CHECK (
                EXISTS (
                    SELECT 1 FROM public.admin_roles ar
                    WHERE ar.user_id = auth.uid()
                      AND ar.role IN ('super_admin', 'editor')
                )
            );
    END IF;
END $$;

GRANT SELECT ON public.conditions TO anon, authenticated;

-- updated_at trigger (reuse the shared helper used across the schema).
DROP TRIGGER IF EXISTS conditions_updated_at ON public.conditions;
CREATE TRIGGER conditions_updated_at
    BEFORE UPDATE ON public.conditions
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
