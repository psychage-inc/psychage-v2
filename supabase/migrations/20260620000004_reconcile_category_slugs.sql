-- =============================================================================
-- Reconcile article_categories slugs to the canonical taxonomy contract
-- =============================================================================
--
-- Most Learn categories rendered "0 articles" because the category slugs drifted
-- across sources: the real article content (and the frozen contract in
-- src/config/taxonomy.ts) uses the renamed slugs, while article_categories still
-- carried the pre-rename slugs. The article↔category lookup keys on
-- `category.slug`, so the join returned nothing for every renamed category.
-- Only `anxiety-stress` worked because it was never renamed.
--
-- This migration brings article_categories up to the canonical slugs. It is the
-- SHARED backend fix — it also flows to the mobile app, so it must run once here
-- rather than being patched per-client.
--
-- `articles.category_id` (FK) is UNAFFECTED: rows stay attached to the same
-- category row, which now carries the canonical slug, so the join resolves.
--
-- Retired original clinical buckets that have no canonical successor
-- (neurodevelopmental, substance-addiction, life-transitions,
-- children-adolescents, ocd-related) are left untouched. They own no article
-- content, so the web app hides them via the runtime guard in
-- categoryService.getGrouped(); their rows are preserved for data safety.
-- =============================================================================

BEGIN;

-- ---------------------------------------------------------------------------
-- 1. Rename drifted slugs old -> canonical.
--    Guarded so each rename is idempotent and never collides with an existing
--    canonical row (re-running, or a partially-migrated DB, is a no-op).
-- ---------------------------------------------------------------------------

UPDATE public.article_categories SET slug = 'depression-grief', updated_at = NOW()
  WHERE slug = 'depression-mood'
    AND NOT EXISTS (SELECT 1 FROM public.article_categories WHERE slug = 'depression-grief');

UPDATE public.article_categories SET slug = 'relationships-communication', updated_at = NOW()
  WHERE slug = 'relationships-social'
    AND NOT EXISTS (SELECT 1 FROM public.article_categories WHERE slug = 'relationships-communication');

UPDATE public.article_categories SET slug = 'trauma-healing', updated_at = NOW()
  WHERE slug = 'trauma-ptsd'
    AND NOT EXISTS (SELECT 1 FROM public.article_categories WHERE slug = 'trauma-healing');

UPDATE public.article_categories SET slug = 'sleep-body-connection', updated_at = NOW()
  WHERE slug = 'sleep-circadian'
    AND NOT EXISTS (SELECT 1 FROM public.article_categories WHERE slug = 'sleep-body-connection');

UPDATE public.article_categories SET slug = 'self-worth-identity', updated_at = NOW()
  WHERE slug = 'self-esteem-identity'
    AND NOT EXISTS (SELECT 1 FROM public.article_categories WHERE slug = 'self-worth-identity');

UPDATE public.article_categories SET slug = 'work-productivity', updated_at = NOW()
  WHERE slug = 'workplace-academic'
    AND NOT EXISTS (SELECT 1 FROM public.article_categories WHERE slug = 'work-productivity');

UPDATE public.article_categories SET slug = 'cultural-global', updated_at = NOW()
  WHERE slug = 'global-cultural'
    AND NOT EXISTS (SELECT 1 FROM public.article_categories WHERE slug = 'cultural-global');

UPDATE public.article_categories SET slug = 'therapy-navigation', updated_at = NOW()
  WHERE slug = 'therapy-treatment'
    AND NOT EXISTS (SELECT 1 FROM public.article_categories WHERE slug = 'therapy-navigation');

-- ---------------------------------------------------------------------------
-- 2. Insert canonical categories that own article content but had no DB row.
--    (Descriptions mirror the article `_shared.ts` definitions; icon/color are
--     cosmetic — the web app derives both from categoryThemes by slug.)
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories
  (name, slug, description, icon, display_order, article_target, color, architecture_group)
VALUES
  ('Emotional Regulation & Self-Awareness', 'emotional-regulation',
   'Foundational emotional literacy — identifying, naming, and modulating emotions. The gateway skill for every other mental health topic.',
   'HeartPulse', 1, 60, '#F43F5E', 'clinical'),
  ('Family, Parenting & Childhood Patterns', 'family-parenting',
   'Understanding family systems, parenting challenges, childhood influences, and breaking intergenerational patterns.',
   'Home', 6, 60, '#10B981', 'clinical'),
  ('Habits, Motivation & Behavior Change', 'habits-behavior-change',
   'The psychology of habits, motivation, and behavior change — building routines that support mental health.',
   'Target', 8, 60, '#F59E0B', 'clinical'),
  ('Digital Life, Social Media & Modern Stressors', 'digital-life',
   'Managing digital life, social media impact, screen time, and modern stressors for better mental health.',
   'Smartphone', 10, 50, '#6366F1', 'clinical'),
  ('Understanding Mental Health Conditions', 'mental-health-conditions',
   'Clear, research-based explanations of mental health conditions — symptoms, causes, diagnosis, and treatment.',
   'Brain', 13, 70, '#8B5CF6', 'clinical')
ON CONFLICT (slug) DO UPDATE
SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  updated_at = NOW();

-- ---------------------------------------------------------------------------
-- 3. Re-tag articles where BOTH the old slug row and the canonical row exist
--    (the rename in step 1 is skipped for these, so the articles would stay
--    orphaned under the duplicate old-slug row). Move them onto the canonical
--    row; the now-empty old row is hidden at runtime by getGrouped(). Idempotent:
--    after the move no articles match the old slug, so re-running is a no-op.
--    Also folds the near-duplicate `chronic-illness-disability` into
--    `chronic-illness-pain` (the canonical "Chronic Illness, Pain & Medical
--    Psychology" bucket).
-- ---------------------------------------------------------------------------

UPDATE public.articles a SET category_id = canon.id, updated_at = NOW()
  FROM public.article_categories oldc, public.article_categories canon
 WHERE a.category_id = oldc.id AND oldc.slug = 'depression-mood' AND canon.slug = 'depression-grief' AND oldc.id <> canon.id;

UPDATE public.articles a SET category_id = canon.id, updated_at = NOW()
  FROM public.article_categories oldc, public.article_categories canon
 WHERE a.category_id = oldc.id AND oldc.slug = 'relationships-social' AND canon.slug = 'relationships-communication' AND oldc.id <> canon.id;

UPDATE public.articles a SET category_id = canon.id, updated_at = NOW()
  FROM public.article_categories oldc, public.article_categories canon
 WHERE a.category_id = oldc.id AND oldc.slug = 'self-esteem-identity' AND canon.slug = 'self-worth-identity' AND oldc.id <> canon.id;

UPDATE public.articles a SET category_id = canon.id, updated_at = NOW()
  FROM public.article_categories oldc, public.article_categories canon
 WHERE a.category_id = oldc.id AND oldc.slug = 'workplace-academic' AND canon.slug = 'work-productivity' AND oldc.id <> canon.id;

-- Fold the near-duplicate chronic-illness-disability into the canonical chronic-illness-pain.
UPDATE public.articles a SET category_id = canon.id, updated_at = NOW()
  FROM public.article_categories oldc, public.article_categories canon
 WHERE a.category_id = oldc.id AND oldc.slug = 'chronic-illness-disability' AND canon.slug = 'chronic-illness-pain' AND oldc.id <> canon.id;

COMMIT;
