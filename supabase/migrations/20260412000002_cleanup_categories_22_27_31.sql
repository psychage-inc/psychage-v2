-- ============================================================================
-- Cleanup: Merge Cat 22→31, Dedup Cat 27 subcats, Fix Cat 31 subtopic names
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Cat 22/31 Merge — both use slug 'spirituality-meaning'
--    Since they share the same DB row, Cat 22's articles are already linked.
--    We just need to reassign Cat 22's subcategory articles into Cat 31's
--    subcategory structure and ensure Cat 22's "Existential Psychology"
--    subcategory articles land in Cat 31's matching subcategory.
-- ---------------------------------------------------------------------------

-- Cat 22 had a subcategory "Existential Psychology" — Cat 31 also has one.
-- Merge any articles from Cat 22's version into Cat 31's version, then drop the duplicate.

DO $$
DECLARE
  v_cat_id UUID;
  v_sub_22_id UUID;
  v_sub_31_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'spirituality-meaning';

  -- There may be two "existential-psychology" subcategories from separate seeds
  -- Find them by checking if duplicates exist
  SELECT id INTO v_sub_31_id FROM public.article_subcategories
    WHERE slug = 'existential-psychology' AND category_id = v_cat_id
    ORDER BY created_at DESC LIMIT 1;

  -- Reassign any orphaned articles (from Cat 22 seeds) that have NULL subcategory_id
  -- to the existential-psychology subcategory
  UPDATE public.articles
  SET subcategory_id = v_sub_31_id
  WHERE category_id = v_cat_id
    AND subcategory_id IS NULL
    AND v_sub_31_id IS NOT NULL;
END $$;

-- ---------------------------------------------------------------------------
-- 2. Cat 27 — Deduplicate subcategories
--    "Military Families" + "Military Families and Relationships" → merge
--    "Transition & Reintegration" + "Transition and Reintegration" → merge
-- ---------------------------------------------------------------------------

DO $$
DECLARE
  v_cat_id UUID;
  v_keep_id UUID;
  v_drop_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'military-veterans-firstresponder';

  -- Merge "Military Families and Relationships" → "Military Families"
  SELECT id INTO v_keep_id FROM public.article_subcategories
    WHERE slug = 'military-families' AND category_id = v_cat_id;
  SELECT id INTO v_drop_id FROM public.article_subcategories
    WHERE slug = 'military-families-and-relationships' AND category_id = v_cat_id;

  IF v_keep_id IS NOT NULL AND v_drop_id IS NOT NULL THEN
    -- Reassign articles
    UPDATE public.articles SET subcategory_id = v_keep_id WHERE subcategory_id = v_drop_id;
    -- Update the keeper name to be more descriptive
    UPDATE public.article_subcategories SET name = 'Military Families & Relationships' WHERE id = v_keep_id;
    -- Delete the duplicate
    DELETE FROM public.article_subcategories WHERE id = v_drop_id;
  END IF;

  -- Merge "Transition and Reintegration" → "Transition & Reintegration"
  SELECT id INTO v_keep_id FROM public.article_subcategories
    WHERE slug = 'transition-reintegration' AND category_id = v_cat_id;
  SELECT id INTO v_drop_id FROM public.article_subcategories
    WHERE slug = 'transition-and-reintegration' AND category_id = v_cat_id;

  IF v_keep_id IS NOT NULL AND v_drop_id IS NOT NULL THEN
    UPDATE public.articles SET subcategory_id = v_keep_id WHERE subcategory_id = v_drop_id;
    DELETE FROM public.article_subcategories WHERE id = v_drop_id;
  END IF;
END $$;

-- ---------------------------------------------------------------------------
-- 3. Cat 31 — Fix subcategory display names (6-13 were slug-formatted)
-- ---------------------------------------------------------------------------

DO $$
DECLARE
  v_cat_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'spirituality-meaning';

  UPDATE public.article_subcategories SET name = 'Altered & Transcendent States'
    WHERE slug = 'altered-transcendent-states' AND category_id = v_cat_id;

  UPDATE public.article_subcategories SET name = 'Collective & Social Meaning'
    WHERE slug = 'collective-social-meaning' AND category_id = v_cat_id;

  UPDATE public.article_subcategories SET name = 'Existential Concerns & Challenges'
    WHERE slug = 'existential-concerns-challenges' AND category_id = v_cat_id;

  UPDATE public.article_subcategories SET name = 'Meaning & Symbolic Systems'
    WHERE slug = 'meaning-symbolic-systems' AND category_id = v_cat_id;

  UPDATE public.article_subcategories SET name = 'Spiritual Crises & Challenges'
    WHERE slug = 'spiritual-crises-challenges' AND category_id = v_cat_id;

  UPDATE public.article_subcategories SET name = 'Spiritual Practices & Methods'
    WHERE slug = 'spiritual-practices-methods' AND category_id = v_cat_id;

  UPDATE public.article_subcategories SET name = 'Spiritual-Psychological Integration'
    WHERE slug = 'spiritual-psychological-integration' AND category_id = v_cat_id;

  UPDATE public.article_subcategories SET name = 'Values, Ethics & Conscience'
    WHERE slug = 'values-ethics-conscience' AND category_id = v_cat_id;
END $$;

-- ---------------------------------------------------------------------------
-- 4. Update Cat 31 article_target to include absorbed Cat 22 articles
-- ---------------------------------------------------------------------------

UPDATE public.article_categories
SET article_target = 69
WHERE slug = 'spirituality-meaning';

-- ---------------------------------------------------------------------------
-- 5. Reorder Cat 27 subcategories after deduplication
-- ---------------------------------------------------------------------------

DO $$
DECLARE
  v_cat_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'military-veterans-firstresponder';

  UPDATE public.article_subcategories SET display_order = 1 WHERE slug = 'combat-related-mental-health' AND category_id = v_cat_id;
  UPDATE public.article_subcategories SET display_order = 2 WHERE slug = 'first-responder-mental-health' AND category_id = v_cat_id;
  UPDATE public.article_subcategories SET display_order = 3 WHERE slug = 'military-culture-psychology' AND category_id = v_cat_id;
  UPDATE public.article_subcategories SET display_order = 4 WHERE slug = 'military-families' AND category_id = v_cat_id;
  UPDATE public.article_subcategories SET display_order = 5 WHERE slug = 'transition-reintegration' AND category_id = v_cat_id;
  UPDATE public.article_subcategories SET display_order = 6 WHERE slug = 'treatment-recovery' AND category_id = v_cat_id;
  UPDATE public.article_subcategories SET display_order = 7 WHERE slug = 'veteran-specific-issues' AND category_id = v_cat_id;
END $$;

-- ---------------------------------------------------------------------------
-- Verification
-- ---------------------------------------------------------------------------

-- Check Cat 27 subcategories (should be 7, not 9):
-- SELECT name, slug, display_order FROM public.article_subcategories
-- WHERE category_id = (SELECT id FROM public.article_categories WHERE slug = 'military-veterans-firstresponder')
-- ORDER BY display_order;

-- Check Cat 31 subcategory names (should be proper display names):
-- SELECT name, slug FROM public.article_subcategories
-- WHERE category_id = (SELECT id FROM public.article_categories WHERE slug = 'spirituality-meaning')
-- ORDER BY display_order;
