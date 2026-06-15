-- =====================================================
-- Migration: Toolkits admin review + starter set (Toolkits — Slice 2)
-- Date: 2026-06-15
--
-- Context:
--   Adds the admin review surface's data layer and the remaining four starter
--   toolkits. All five themes are now seeded (theme 1, anxiety, shipped in
--   20260615000001). Every toolkit stays status = 'review' until an admin
--   publishes it — nothing publishes automatically.
--
-- RLS additions (these compose with the public published-read policies from
--   20260615000001 — Postgres OR-combines SELECT policies):
--     * admins (is_admin) may read ALL toolkits and items, including review.
--     * writers (is_admin_writer = super_admin | clinical_admin) may UPDATE a
--       toolkit — the publish control. Viewers can review but not publish.
--   is_admin()/is_admin_writer() are the AUTH-001 hardened gates
--   (20260423000001); admin_roles is the sole source of truth.
--
-- Safety: copy is placeholder pending Dr. Lena Dobson clinical review. SR-3
--   non-diagnostic framing / SR-2 crisis-awareness live in the UI. No
--   assessment data is referenced or joined.
-- =====================================================

-- Admin read: all toolkits + items (review and published).
CREATE POLICY "toolkits_admin_read_all"
    ON public.toolkits FOR SELECT TO authenticated
    USING (public.is_admin());

CREATE POLICY "toolkit_items_admin_read_all"
    ON public.toolkit_items FOR SELECT TO authenticated
    USING (public.is_admin());

-- Writer update: the publish control (and any review-time edits).
CREATE POLICY "toolkits_writer_update"
    ON public.toolkits FOR UPDATE TO authenticated
    USING (public.is_admin_writer())
    WITH CHECK (public.is_admin_writer());

GRANT UPDATE ON public.toolkits TO authenticated;

-- Seed: starter themes 2–5, all status = 'review' (theme 1 in slice 1) -----
DO $$
DECLARE
    v_id UUID;
BEGIN
    -- 2. When everything feels heavy (low mood) -------------------------
    INSERT INTO public.toolkits
        (theme_title, clinical_subtitle, intro_md, status, needs_clinical_review, sort_order)
    VALUES (
        'When everything feels heavy',
        'Skills people use with low mood',
        'Some days everything feels like more effort than it should. These are gentle steps people often find help a little — nothing here is a test you can pass or fail.

This is a place to learn, not a diagnosis or treatment. Go at your own pace.',
        'review', TRUE, 2
    ) RETURNING id INTO v_id;
    INSERT INTO public.toolkit_items (toolkit_id, kind, ref_id, label, sort_order) VALUES
        (v_id, 'tool',     'tool:steady',                'Steady — paced breathing',            1),
        (v_id, 'term',     'term:depression',            'What people mean by depression',      2),
        (v_id, 'term',     'term:rumination',            'When thoughts keep looping',          3),
        (v_id, 'strategy', 'strategy:low',               'Find a small step for heavy days',    4),
        (v_id, 'tool',     'tool:symptom-navigator',     'Explore what you are noticing',       5),
        (v_id, 'article',  'article:depression-mood/what-is-depression-comprehensive-guide', 'Understanding low mood', 6);

    -- 3. Stress that will not switch off (stress / burnout) -------------
    INSERT INTO public.toolkits
        (theme_title, clinical_subtitle, intro_md, status, needs_clinical_review, sort_order)
    VALUES (
        'Stress that will not switch off',
        'Skills people use with stress and burnout',
        'When stress keeps running in the background, it can wear you down. These are ways people often find some space to breathe and reset.

This is a place to learn, not a diagnosis or treatment. Take what helps and leave the rest.',
        'review', TRUE, 3
    ) RETURNING id INTO v_id;
    INSERT INTO public.toolkit_items (toolkit_id, kind, ref_id, label, sort_order) VALUES
        (v_id, 'tool',     'tool:steady',                'Steady — extended exhale',            1),
        (v_id, 'term',     'term:stress',                'What people mean by stress',          2),
        (v_id, 'term',     'term:burnout',               'What people mean by burnout',         3),
        (v_id, 'term',     'term:boundaries',            'Setting boundaries, in plain words',  4),
        (v_id, 'strategy', 'strategy:overwhelmed',       'Find a coping skill when overwhelmed', 5),
        (v_id, 'article',  'article:workplace-academic/academic-burnout-when-the-pressure-to-perform-breaks-students-down', 'When pressure builds up', 6);

    -- 4. Rest and sleep (sleep) — references Sleep Architect, never duplicates
    INSERT INTO public.toolkits
        (theme_title, clinical_subtitle, intro_md, status, needs_clinical_review, sort_order)
    VALUES (
        'Rest and sleep',
        'Skills people use for rest',
        'Sleep can be hard to come by when the mind is busy. These are habits and ideas people often find help them wind down.

This is a place to learn, not a diagnosis or treatment.',
        'review', TRUE, 4
    ) RETURNING id INTO v_id;
    INSERT INTO public.toolkit_items (toolkit_id, kind, ref_id, label, sort_order) VALUES
        (v_id, 'tool',    'tool:steady',                 'Steady — 4-7-8 breathing',            1),
        (v_id, 'tool',    'tool:sleep-architect',        'Sleep Architect — build a wind-down', 2),
        (v_id, 'article', 'article:sleep-body-connection/sleep-anxiety-fear-not-sleeping-keeps-you-awake', 'When worry keeps you awake', 3);

    -- 5. Feeling alone (loneliness / connection) -----------------------
    INSERT INTO public.toolkits
        (theme_title, clinical_subtitle, intro_md, status, needs_clinical_review, sort_order)
    VALUES (
        'Feeling alone',
        'Skills people use with loneliness',
        'Feeling far from others is something many people go through at times. These are small ways people often find to feel a little more connected.

This is a place to learn, not a diagnosis or treatment.',
        'review', TRUE, 5
    ) RETURNING id INTO v_id;
    INSERT INTO public.toolkit_items (toolkit_id, kind, ref_id, label, sort_order) VALUES
        (v_id, 'term',     'term:loneliness',            'What people mean by loneliness',      1),
        (v_id, 'term',     'term:boundaries',            'Setting boundaries, in plain words',  2),
        (v_id, 'tool',     'tool:being-there',           'Being There — support a connection',  3),
        (v_id, 'strategy', 'strategy:connection',        'Find a small way to reconnect',       4),
        (v_id, 'tool',     'tool:relationship-health',   'Relationship Health Check',           5),
        (v_id, 'article',  'article:relationships-social/healthy-relationships', 'What healthy relationships look like', 6);
END $$;
