-- Archive published articles that have no body content.
--
-- Context: ~647 published rows were seeded as metadata-only placeholders
-- (title/slug/category set, content NULL) and were never given an article
-- body. They render as empty pages, so the listing layer already excludes
-- rows without content. This migration makes the DB state honest: only
-- content-complete articles remain `published`; empty placeholders become
-- `archived` (recoverable — set status back to 'published' once content is
-- written).
--
-- Idempotent: re-running affects 0 rows (archived rows are no longer
-- status = 'published'). Fill-only, no deletes.

UPDATE public.articles
SET status = 'archived',
    updated_at = NOW()
WHERE status = 'published'
  AND (content IS NULL OR content = '');
