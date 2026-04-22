-- ============================================================================
-- Mark cornerstone articles as featured for the homepage hero rotation
-- ============================================================================
--
-- Context:
--   The homepage hero was previously picked by `created_at DESC`, which
--   surfaced the most-recently-seeded article (e.g. an existential-anxiety
--   piece from the spirituality category). For an evidence-based mental
--   health site, the hero slot should lead with foundational clinical
--   content instead — anxiety, depression, trauma, sleep, relationships.
--
--   The `articles.featured` column already exists
--   (see 20260316000001_article_production_system.sql) and
--   articleService.getFeatured() is wired up, but no migration ever
--   populated any rows. This migration establishes the editorial pool.
--
-- Selection criteria:
--   - First article (-001) from each of the 6 core clinical categories
--   - Each article has a verified TSX counterpart in src/data/articles/
--     so the click resolves to full content (not a stub)
--   - article_production_id is stable and deterministic across environments
-- ============================================================================

UPDATE public.articles
SET
  featured = TRUE,
  updated_at = NOW()
WHERE article_production_id IN (
  'CAT01-001',  -- What Are Emotions, Really? (Emotional Regulation)
  'CAT02-001',  -- What Is Anxiety: A Complete Guide (Anxiety & Stress)
  'CAT03-001',  -- The Four Attachment Styles (Relationships)
  'CAT07-001',  -- What Is Depression: A Comprehensive Guide (Depression & Grief)
  'CAT09-001',  -- Why Sleep Is the Foundation of Mental Health (Sleep & Body)
  'CAT11-001'   -- What Is Psychological Trauma? (Trauma Healing)
);

-- ---------------------------------------------------------------------------
-- Verification
-- ---------------------------------------------------------------------------
-- SELECT article_production_id, title, featured
-- FROM public.articles
-- WHERE featured = TRUE
-- ORDER BY article_production_id;
