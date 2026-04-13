-- ============================================================================
-- Batch Publish: Move all seeded articles from 'draft' to 'published'
-- ============================================================================
--
-- Context:
--   All ~2,359 seeded articles have:
--   ✓ Titles, slugs, SEO descriptions
--   ✓ Category and subcategory assignments
--   ✓ Citations (5+ per article)
--   ✓ Corresponding TSX content files
--   ✗ status = 'draft' (blocking Supabase queries)
--   ✗ review_stage = 'drafted'
--   ✗ published_at = NULL
--
-- This migration promotes them to published status so the article service
-- can serve them directly from Supabase instead of falling back to mock data.
-- ============================================================================

DO $$
DECLARE
  v_count INTEGER;
BEGIN
  ALTER TABLE public.articles DISABLE TRIGGER USER;

  -- Publish all draft articles that have a category_id (i.e., seeded articles)
  UPDATE public.articles
  SET
    status = 'published',
    review_stage = 'published',
    published_at = NOW(),
    updated_at = NOW()
  WHERE status = 'draft'
    AND category_id IS NOT NULL;

  GET DIAGNOSTICS v_count = ROW_COUNT;
  RAISE NOTICE 'Published % articles', v_count;

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;

-- ---------------------------------------------------------------------------
-- Verification
-- ---------------------------------------------------------------------------

-- Count by status (should show all as 'published'):
-- SELECT status, COUNT(*) FROM public.articles GROUP BY status ORDER BY status;

-- Count by category:
-- SELECT c.name, COUNT(a.id) as published
-- FROM public.article_categories c
-- JOIN public.articles a ON a.category_id = c.id
-- WHERE a.status = 'published'
-- GROUP BY c.name, c.display_order
-- ORDER BY c.display_order;
