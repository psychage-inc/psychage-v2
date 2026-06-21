-- =====================================================
-- Migration: Conditions reference (ICD-11 Chapter 6)
-- Date: 2026-06-20 (table renamed 2026-06-21 — see note)
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
-- NAME NOTE (2026-06-21):
--   This table is `conditions_reference`, NOT `conditions`. The name `public.conditions`
--   is already taken by a LEGACY table (id/name/description/recommended_action/...) still
--   read by the admin Symptom Navigator. The original version of this migration used
--   `CREATE TABLE IF NOT EXISTS public.conditions`, which silently no-op'd against that
--   collision, so the reference schema never materialised. Renaming to
--   `conditions_reference` gives the feature its own table and leaves the legacy
--   `conditions` table (and the Navigator) untouched.
--
-- Verification gate (ABSOLUTE):
--   Every authored row lands `verification_status = 'unverified'`. Public reads are
--   FIELD-gated by the `conditions_reference_public` masking view (migration
--   20260621000001): the full taxonomy is always visible; the four definition fields are
--   NULL until verified. This is enforced in three layers:
--     1. The masking view (server-side column mask) — the public read path.
--     2. RLS on this base table — anon/authenticated may SELECT verified rows only, so an
--        unverified definition is never directly readable either.
--     3. conditionsService — the client mirror (public reads the view; preview reads this
--        base table, where admins see drafts via the admin policy below).
--   Clinical reviewers (admins) may read/write everything to approve copy later, in a
--   batch, OUTSIDE this build. crisis_flag is a clinical decision left for review.
-- =====================================================

CREATE TABLE IF NOT EXISTS public.conditions_reference (
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

CREATE INDEX IF NOT EXISTS idx_conditions_reference_name ON public.conditions_reference(name);
CREATE INDEX IF NOT EXISTS idx_conditions_reference_grouping ON public.conditions_reference(icd11_grouping);
CREATE INDEX IF NOT EXISTS idx_conditions_reference_status ON public.conditions_reference(verification_status);

ALTER TABLE public.conditions_reference ENABLE ROW LEVEL SECURITY;

-- Public read — VERIFIED rows only (defense-in-depth under the masking view).
DO $$ BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE policyname = 'conditions_reference_public_read_verified'
          AND tablename = 'conditions_reference'
    ) THEN
        CREATE POLICY "conditions_reference_public_read_verified"
            ON public.conditions_reference FOR SELECT TO anon, authenticated
            USING (verification_status = 'verified');
    END IF;

    -- Clinical reviewers / admins may read and write everything (incl. unverified) so
    -- condition copy can be approved later. Uses the canonical is_admin() helper
    -- (20260423000001) — any admin_roles row ⇒ admin — instead of a hard-coded role,
    -- which also avoids the dead 'editor' literal (renamed to 'clinical_admin').
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE policyname = 'conditions_reference_admin_all'
          AND tablename = 'conditions_reference'
    ) THEN
        CREATE POLICY "conditions_reference_admin_all"
            ON public.conditions_reference FOR ALL TO authenticated
            USING (public.is_admin())
            WITH CHECK (public.is_admin());
    END IF;
END $$;

GRANT SELECT ON public.conditions_reference TO anon, authenticated;

-- updated_at trigger (reuse the shared helper used across the schema).
DROP TRIGGER IF EXISTS conditions_reference_updated_at ON public.conditions_reference;
CREATE TRIGGER conditions_reference_updated_at
    BEFORE UPDATE ON public.conditions_reference
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
