-- ============================================================================
-- Update ALL seeded articles:
--   author_name  → 'Raima'
--   status       → 'in_review'
--   review_stage → 'in_review'
-- ============================================================================

UPDATE public.articles
SET
  author_name  = 'Raima',
  status       = 'in_review',
  review_stage = 'in_review',
  updated_at   = NOW()
WHERE article_production_id LIKE 'CAT%';
