-- =====================================================
-- Migration: Toolkits content model (Toolkits — Slice 1)
-- Date: 2026-06-15
--
-- Context:
--   Adds condition-mapped collections of EXISTING educational tools/articles
--   ("toolkits") and their ordered items. Toolkits link OUT to tools already in
--   the app via an item registry — they never re-implement a tool.
--
-- Visibility / RLS:
--   anon + authenticated may read ONLY toolkits with status = 'published', and
--   only the items of published toolkits. Authoring/review happens via
--   service_role; an admin-gated publish control follows in Slice 2. The seed
--   below ships status = 'review', so it is invisible on every public surface.
--
-- Safety (Psychage Sacred Rules):
--   SR-3 non-diagnostic framing and SR-2 crisis-awareness are enforced in the UI
--   layer (ToolkitDisclaimer). No assessment data (Clarity Score / Symptom
--   Navigator) is referenced, stored, or joined here — toolkits are educational.
-- =====================================================

-- toolkits ---------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.toolkits (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    theme_title TEXT NOT NULL,
    clinical_subtitle TEXT,
    intro_md TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'review'
        CHECK (status IN ('review', 'published')),
    needs_clinical_review BOOLEAN NOT NULL DEFAULT TRUE,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- toolkit_items ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.toolkit_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    toolkit_id UUID NOT NULL REFERENCES public.toolkits(id) ON DELETE CASCADE,
    kind VARCHAR(20) NOT NULL CHECK (kind IN ('tool', 'article', 'term', 'strategy')),
    ref_id TEXT NOT NULL,
    label TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_toolkits_status ON public.toolkits(status);
CREATE INDEX IF NOT EXISTS idx_toolkit_items_toolkit ON public.toolkit_items(toolkit_id);

-- RLS --------------------------------------------------------------------
ALTER TABLE public.toolkits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.toolkit_items ENABLE ROW LEVEL SECURITY;

-- Public read: published toolkits only.
CREATE POLICY "toolkits_public_read_published"
    ON public.toolkits FOR SELECT TO anon, authenticated
    USING (status = 'published');

-- Public read: items that belong to a published toolkit only.
CREATE POLICY "toolkit_items_public_read_published"
    ON public.toolkit_items FOR SELECT TO anon, authenticated
    USING (EXISTS (
        SELECT 1 FROM public.toolkits t
        WHERE t.id = toolkit_items.toolkit_id
          AND t.status = 'published'
    ));

GRANT SELECT ON public.toolkits TO anon, authenticated;
GRANT SELECT ON public.toolkit_items TO anon, authenticated;

-- updated_at trigger (reuse the shared helper used across the schema).
DROP TRIGGER IF EXISTS toolkits_updated_at ON public.toolkits;
CREATE TRIGGER toolkits_updated_at
    BEFORE UPDATE ON public.toolkits
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Seed: ONE anxiety toolkit, status = 'review' (NOT publicly visible) -----
-- Copy is placeholder pending Dr. Lena Dobson clinical review; do not publish.
DO $$
DECLARE
    v_toolkit_id UUID;
BEGIN
    INSERT INTO public.toolkits
        (theme_title, clinical_subtitle, intro_md, status, needs_clinical_review, sort_order)
    VALUES (
        'When worry takes over',
        'Skills people use with anxiety',
        'When worry gets loud, it can be hard to think clearly. These are skills and ideas people often find steadying — small things to try, in your own time.

This is a place to learn, not a diagnosis or treatment. Take what helps and leave the rest.',
        'review',
        TRUE,
        1
    )
    RETURNING id INTO v_toolkit_id;

    INSERT INTO public.toolkit_items (toolkit_id, kind, ref_id, label, sort_order) VALUES
        (v_toolkit_id, 'tool',     'tool:steady',                              'Steady — paced breathing',           1),
        (v_toolkit_id, 'term',     'term:anxiety',                             'What people mean by “anxiety”',      2),
        (v_toolkit_id, 'term',     'term:panic-attack',                        'What a panic attack can feel like',  3),
        (v_toolkit_id, 'strategy', 'strategy:anxious',                         'Find a coping skill for tense moments', 4),
        (v_toolkit_id, 'tool',     'tool:symptom-navigator',                   'Explore what you are noticing',      5),
        (v_toolkit_id, 'article',  'article:anxiety-stress/understanding-anxiety', 'Understanding anxiety',          6);
END $$;
