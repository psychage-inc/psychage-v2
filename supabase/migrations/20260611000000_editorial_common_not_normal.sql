-- ============================================================
-- Editorial standard: "common, not normal"
-- Corrects reassurance "normal" framing in seeded article metadata and
-- updates the content_documents.author default to the full credential form.
-- UPDATE / ALTER only — never edits already-applied migrations.
-- Idempotent: re-running is safe; missing rows are no-ops.
-- ============================================================

BEGIN;

-- 1. Article title (CAT08-057) — reassurance framing in the title.
--    "Setbacks Are Normal" → "Setbacks Are Common".
--    Slug left unchanged (stable URL key).
UPDATE public.articles
SET title = 'Relapse: Why Setbacks Are Common and How to Get Back on Track'
WHERE article_production_id = 'CAT08-057'
  AND title = 'Relapse: Why Setbacks Are Normal and How to Get Back on Track';

-- 2. seo_description (CAT01-009) — "mixed emotions are normal" → "common".
UPDATE public.articles
SET seo_description = 'Feeling happy and sad at the same time is not confusion — it is a sign of emotional complexity. Learn why mixed emotions are common, healthy, and even beneficial.'
WHERE article_production_id = 'CAT01-009';

-- 3. seo_description (CAT07-044) — "seasonal mood changes are normal" → "common".
--    Also repairs the apostrophe-truncated seed value ('...even if you don'),
--    restoring the full description aligned to the article source.
UPDATE public.articles
SET seo_description = 'Seasonal mood changes are common, even if you don''t have SAD. Learn why your mood shifts with the seasons and how to work with these natural rhythms.'
WHERE article_production_id = 'CAT07-044';

-- 4. seo_description (CAT23-020) — differential framing: "normal" → "typical".
--    Preserves the normal-vs-dementia contrast. The article TITLE
--    "Brain Aging…: What's Normal, What's Not" is differential and is
--    intentionally left unchanged.
UPDATE public.articles
SET seo_description = 'Understand what''s typical brain aging vs. early dementia, how cognitive reserve protects the brain, and what lifestyle factors slow cognitive decline.'
WHERE article_production_id = 'CAT23-020';

-- 5. content_documents.author default → full credential form
--    (matches the converter constant and admin editor defaults).
ALTER TABLE public.content_documents
  ALTER COLUMN author SET DEFAULT 'Dr. Lena Dobson, Ph.D. in Clinical Neuropsychology';

COMMIT;
