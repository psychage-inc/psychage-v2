-- ============================================================
-- Editorial metadata corrections — "common, not normal" framing.
-- SUPERSEDES 20260611000000_editorial_common_not_normal.sql (deleted in the
-- same change-set, never applied to prod).
--
-- Why superseded: 000000 targeted rows by logical content-plan IDs
-- (CAT08-057 / CAT01-009 / CAT07-044 / CAT23-020). A 2026-06-11 prod
-- pre-flight showed those IDs do NOT map to the intended articles — prod's
-- seeded `article_production_id` assignments have drifted from the seed
-- files. In particular 000000's CAT23-020 UPDATE would have overwritten a
-- live body-image article's seo_description with brain-aging text
-- (corruption), and its CAT08-057 title UPDATE targeted a non-existent row.
--
-- This migration targets every row by VERIFIED CONTENT PREDICATE, never by
-- logical ID. Each predicate was pre-flighted to match exactly one row.
-- Every framing fix is corruption-proof by construction: in-place replace()
-- of the offending phrase, or a full SET guarded to a topical+"normal"
-- predicate that cannot match an unrelated article.
--
-- Content hunt (read-only, 2026-06-11) for 000000's other two targets:
--   * Relapse "Setbacks Are Normal": NO matching prod row — closes here.
--     (CAT30-075 / CAT23-040 exist but carry no "setbacks are normal"
--      framing; one already reads "common".) No fix authored.
--   * Brain-aging differential: FOUND at CAT17-001 "Normal Cognitive Aging"
--     (published), whose seo carries "what is normal aging, what constitutes
--     illness". 000000's prefab brain-aging text never matched this row, so
--     the fix here is the faithful intent: in-place "normal aging" ->
--     "typical aging", preserving the normal-vs-illness contrast. Title left
--     unchanged (differential).
--
-- Idempotent: re-running is safe (replace() of an absent phrase is a no-op;
-- the SET predicate stops matching once "normal" is gone).
-- ============================================================

BEGIN;

-- 1. Mixed-emotions seo (verified single row: CAT01-009).
--    In-place framing fix; predicate also pins the topical phrase.
UPDATE public.articles
SET seo_description = replace(seo_description, 'mixed emotions are normal', 'mixed emotions are common')
WHERE seo_description ILIKE '%mixed emotions are normal%'
  AND seo_description ILIKE '%emotional complexity%';

-- 2. Seasonal-mood seo (verified single row: CAT07-044).
--    Both a framing fix AND a truncation repair — prod value is cut off
--    mid-word ('...even if you don'), so a full SET is required. Guarded to
--    the truncated seasonal-"normal" seo so it cannot touch any other row.
UPDATE public.articles
SET seo_description = 'Seasonal mood changes are common, even if you don''t have SAD. Learn why your mood shifts with the seasons and how to work with these natural rhythms.'
WHERE seo_description ILIKE '%seasonal mood changes are normal%';

-- 3. Brain-aging differential seo (verified single row: CAT17-001).
--    In-place "normal aging" -> "typical aging"; predicate pins the
--    normal-vs-illness differential phrasing.
UPDATE public.articles
SET seo_description = replace(seo_description, 'normal aging', 'typical aging')
WHERE seo_description ILIKE '%what is normal aging%'
  AND seo_description ILIKE '%constitutes illness%';

-- 4. content_documents.author default -> full credential form
--    (matches the converter constant and admin editor defaults).
ALTER TABLE public.content_documents
  ALTER COLUMN author SET DEFAULT 'Dr. Lena Dobson, Ph.D. in Clinical Neuropsychology';

COMMIT;

-- ============================================================
-- VERIFICATION (post-apply, prod):
--   CAT01-009 seo contains "mixed emotions are common" (no "...are normal")
--   CAT07-044 seo = full seasonal text ending "...natural rhythms." (no truncation, "common")
--   CAT17-001 seo contains "what is typical aging" (no "normal aging")
--   content_documents.author default = 'Dr. Lena Dobson, Ph.D. in Clinical Neuropsychology'
-- ============================================================
