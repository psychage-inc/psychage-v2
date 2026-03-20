-- ============================================================================
-- Seed: Category 6 (Family, Parenting & Childhood Patterns) — Subcategory 05
-- 10 articles: CAT06-041 through CAT06-050
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert Category if not present
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  'Family, Parenting & Childhood Patterns',
  'relationships-social',
  '',
  'Brain',
  6,
  100,
  '#0D9488'
)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------------------
-- 2. Insert Subcategory
-- ---------------------------------------------------------------------------

DO $$
DECLARE
  v_cat_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'relationships-social';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Co Parenting Divorce Blended Families', 'co-parenting-divorce-blended-families', v_cat_id, 5)
  ON CONFLICT (slug, category_id) DO NOTHING;
END $$;

-- ---------------------------------------------------------------------------
-- 3. Insert Articles
-- ---------------------------------------------------------------------------

DO $$
DECLARE
  v_cat_id UUID;
  v_sub_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'relationships-social';
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'co-parenting-divorce-blended-families' AND category_id = v_cat_id;

  -- CAT06-041: Co-Parenting After Divorce: Putting Children
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Co-Parenting After Divorce: Putting Children',
    'co-parenting-after-divorce-childrens-mental-health-first',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Co-Parenting', 'Divorce', 'Children', 'Family Dynamics'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-041',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn evidence-based strategies for co-parenting after divorce that protect children',
    '/images/articles/cat06/cover-041.svg',
    8,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-042: Parallel Parenting: When Co-Parenting with a Difficult Ex Isn
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Parallel Parenting: When Co-Parenting with a Difficult Ex Isn',
    'parallel-parenting-when-co-parenting-isnt-possible',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Parallel Parenting', 'High-Conflict Divorce', 'Boundaries', 'Co-Parenting'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-042',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how parallel parenting works when high-conflict dynamics make traditional co-parenting impossible, protecting both you and your children.',
    '/images/articles/cat06/cover-042.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-043: How Children Process Divorce at Different Ages
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How Children Process Divorce at Different Ages',
    'how-children-process-divorce-different-ages',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Divorce', 'Child Development', 'Parenting', 'Age-Appropriate Support'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-043',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand age-specific reactions to divorce and how to support children through the transition based on their developmental stage.',
    '/images/articles/cat06/cover-043.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-044: Blended Families: The Psychological Challenges of Stepparenting
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Blended Families: The Psychological Challenges of Stepparenting',
    'blended-families-psychological-challenges-stepparenting',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Blended Families', 'Stepparenting', 'Family Dynamics', 'Remarriage'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-044',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Navigate the unique challenges of stepfamily dynamics with evidence-based strategies for building healthy blended families.',
    '/images/articles/cat06/cover-044.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-045: Loyalty Conflicts: When Children Feel Caught Between Two Parents
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Loyalty Conflicts: When Children Feel Caught Between Two Parents',
    'loyalty-conflicts-children-caught-between-parents',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Loyalty Conflicts', 'Divorce', 'Co-Parenting', 'Child Wellbeing'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-045',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand how loyalty conflicts harm children and learn how to create an environment where they feel free to love both parents.',
    '/images/articles/cat06/cover-045.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-046: Co-Parenting Communication: Tools and Strategies for Reducing Conflict
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Co-Parenting Communication: Tools and Strategies for Reducing Conflict',
    'co-parenting-communication-tools-reducing-conflict',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Co-Parenting', 'Communication', 'Conflict Resolution', 'Parenting Apps'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-046',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Master practical communication techniques and tools that reduce conflict and keep co-parenting focused on children',
    '/images/articles/cat06/cover-046.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-047: When a Parent Speaks Negatively About the Other: The Impact on Children
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'When a Parent Speaks Negatively About the Other: The Impact on Children',
    'parent-speaks-negatively-other-impact-children',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Parental Conflict', 'Bad-Mouthing', 'Child Wellbeing', 'Co-Parenting'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-047',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand how parental bad-mouthing harms children and learn how to protect your child when an ex speaks negatively about you.',
    '/images/articles/cat06/cover-047.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-048: Shared Custody and Attachment: How Transitions Affect Young Children
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Shared Custody and Attachment: How Transitions Affect Young Children',
    'shared-custody-attachment-transitions-young-children',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Attachment', 'Shared Custody', 'Young Children', 'Parenting Plans'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-048',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how frequent transitions between parents affect attachment security in young children and strategies to minimize disruption.',
    '/images/articles/cat06/cover-048.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-049: Dating Again as a Single Parent: Managing Your Own and Your Children
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Dating Again as a Single Parent: Managing Your Own and Your Children',
    'dating-again-single-parent-managing-emotions',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Dating', 'Single Parenting', 'New Relationships', 'Blended Families'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-049',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Navigate the challenges of dating after divorce or separation while protecting your children and managing complex emotions.',
    '/images/articles/cat06/cover-049.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-050: The Long-Term Mental Health Outcomes of Children of Divorce
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Long-Term Mental Health Outcomes of Children of Divorce',
    'long-term-mental-health-outcomes-children-divorce',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Divorce', 'Research', 'Long-Term Outcomes', 'Resilience'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-050',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore what research reveals about how divorce affects children',
    '/images/articles/cat06/cover-050.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

END $$;

-- ---------------------------------------------------------------------------
-- 4. Insert Citations
-- ---------------------------------------------------------------------------

DO $$
DECLARE
  v_art_id UUID;
BEGIN

  -- === CAT06-041 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-041';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Children and divorce: Long-term outcomes', '2019', 'https://doi.org/10.1111/cdev.13224', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Cooperative co-parenting and child adjustment', '2020', 'https://doi.org/10.1037/fam0000629', 'Journal of Family Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Parental conflict and child mental health', '2021', 'https://doi.org/10.1007/s10567-020-00334-4', 'Clinical Child and Family Psychology Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'Co-parenting communication tools', '2020', 'https://doi.org/10.1111/fare.12425', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Reducing conflict in high-conflict divorces', '2019', 'https://doi.org/10.1080/10502556.2019.1586226', 'Journal of Divorce & Remarriage', 5),
      (v_art_id, 'peer_reviewed', 1, 'Consistency across two households', '2021', 'https://doi.org/10.1080/15295192.2020.1850313', 'Parenting: Science and Practice', 6),
      (v_art_id, 'peer_reviewed', 1, 'Child-centered parenting plans', '2020', 'https://doi.org/10.1111/fcre.12482', 'Family Court Review', 7),
      (v_art_id, 'peer_reviewed', 1, 'Resilience in children of divorce', '2020', 'https://doi.org/10.1017/S0954579419001627', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-042 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-042';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Parallel parenting in high-conflict divorce', '2020', 'https://doi.org/10.1080/10502556.2020.1787238', 'Journal of Divorce & Remarriage', 1),
      (v_art_id, 'peer_reviewed', 1, 'Reducing conflict through disengagement', '2019', 'https://doi.org/10.1111/fcre.12441', 'Family Court Review', 2),
      (v_art_id, 'clinical_guideline', 4, 'High-conflict personalities and parenting', '2021', 'https://www.jstor.org/stable/27049823', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Structured parenting plans for parallel parenting', '2020', 'https://doi.org/10.1111/fare.12456', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Child outcomes in parallel parenting families', '2021', 'https://doi.org/10.1037/fam0000781', 'Journal of Family Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Technology tools for minimal-contact parenting', '2020', 'https://doi.org/10.1111/famp.12518', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Protecting mental health in high-conflict divorce', '2019', 'https://doi.org/10.1016/j.cpr.2019.101785', 'Clinical Psychology Review', 7),
      (v_art_id, 'textbook', 5, 'When parallel parenting is necessary', '2020', 'https://www.psychologytoday.com/us/blog/co-parenting-after-divorce/parallel-parenting', 'Psychology Today', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-043 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-043';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Developmental responses to divorce', '2020', 'https://doi.org/10.1111/cdep.12373', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Infants and toddlers: Attachment disruption', '2019', 'https://doi.org/10.1002/imhj.21789', 'Infant Mental Health Journal', 2),
      (v_art_id, 'peer_reviewed', 1, 'Preschool children and divorce', '2020', 'https://doi.org/10.1037/fam0000598', 'Journal of Family Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'School-age children: Grief and loyalty conflicts', '2021', 'https://doi.org/10.1111/fare.12501', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Adolescent responses to parental divorce', '2020', 'https://doi.org/10.1177/0743558419877460', 'Journal of Adolescent Research', 5),
      (v_art_id, 'peer_reviewed', 1, 'Young adult children and divorce', '2019', 'https://doi.org/10.1177/2167696818810073', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Communicating divorce at different ages', '2021', 'https://doi.org/10.1080/15295192.2020.1847250', 'Parenting: Science and Practice', 7),
      (v_art_id, 'peer_reviewed', 1, 'Resilience factors across development', '2020', 'https://doi.org/10.1017/S0954579420000619', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-044 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-044';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Stepfamily development and adjustment', '2020', 'https://doi.org/10.1111/fare.12437', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Stepparent-stepchild relationship formation', '2021', 'https://doi.org/10.1037/fam0000805', 'Journal of Family Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Children in stepfamilies: Loyalty conflicts', '2019', 'https://doi.org/10.1111/cdep.12345', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Role ambiguity in stepfamilies', '2020', 'https://doi.org/10.1111/jomf.12678', 'Journal of Marriage and Family', 4),
      (v_art_id, 'peer_reviewed', 1, 'Financial stress in blended families', '2019', 'https://doi.org/10.1111/fare.12384', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Successful stepfamily strategies', '2021', 'https://doi.org/10.1080/10502556.2020.1831792', 'Journal of Divorce & Remarriage', 6),
      (v_art_id, 'peer_reviewed', 1, 'Ex-spouse relationships in blended families', '2020', 'https://doi.org/10.1111/famp.12531', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Stepfamily resilience', '2021', 'https://doi.org/10.1111/jftr.12421', 'Journal of Family Theory & Review', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-045 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-045';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Loyalty conflicts and child mental health', '2020', 'https://doi.org/10.1037/fam0000651', 'Journal of Family Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Parental alienation and loyalty binds', '2021', 'https://doi.org/10.1111/fcre.12563', 'Family Court Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Triangulation in divorced families', '2019', 'https://doi.org/10.1111/famp.12441', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Children as messengers: Psychological impact', '2020', 'https://doi.org/10.1007/s10567-020-00315-7', 'Clinical Child and Family Psychology Review', 4),
      (v_art_id, 'peer_reviewed', 1, 'Bad-mouthing and child outcomes', '2021', 'https://doi.org/10.1080/10502556.2020.1841098', 'Journal of Divorce & Remarriage', 5),
      (v_art_id, 'peer_reviewed', 1, 'Reducing loyalty conflicts in co-parenting', '2020', 'https://doi.org/10.1111/fare.12461', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Long-term effects of loyalty conflicts', '2021', 'https://doi.org/10.1017/S0954579420000851', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Therapeutic interventions for loyalty conflicts', '2020', 'https://doi.org/10.1111/1467-6427.12289', 'Journal of Family Therapy', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-046 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-046';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Effective co-parenting communication', '2020', 'https://doi.org/10.1111/fare.12438', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Technology-mediated co-parenting', '2021', 'https://doi.org/10.1111/famp.12641', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'BIFF response method effectiveness', '2019', 'https://doi.org/10.1080/10502556.2019.1627150', 'Journal of Divorce & Remarriage', 3),
      (v_art_id, 'peer_reviewed', 1, 'Reducing conflict escalation in high-conflict couples', '2020', 'https://doi.org/10.1007/s10567-020-00328-2', 'Clinical Child and Family Psychology Review', 4),
      (v_art_id, 'peer_reviewed', 1, 'Structured communication protocols', '2021', 'https://doi.org/10.1037/fam0000792', 'Journal of Family Psychology', 5),
      (v_art_id, 'government', 2, 'Co-parenting apps: Evidence and best practices', '2020', 'https://doi.org/10.1111/fcre.12494', 'Family Court Review', 6),
      (v_art_id, 'peer_reviewed', 1, 'Boundaries in co-parenting communication', '2021', 'https://doi.org/10.1080/10502556.2020.1848921', 'Journal of Divorce & Remarriage', 7),
      (v_art_id, 'peer_reviewed', 1, 'Parallel parenting communication strategies', '2019', 'https://doi.org/10.1111/fare.12391', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-047 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-047';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Interparental conflict and child adjustment', '2020', 'https://doi.org/10.1007/s10567-020-00319-3', 'Clinical Child and Family Psychology Review', 1),
      (v_art_id, 'government', 2, 'Bad-mouthing and parental alienation', '2021', 'https://doi.org/10.1111/fcre.12571', 'Family Court Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Children caught in loyalty conflicts', '2019', 'https://doi.org/10.1037/fam0000561', 'Journal of Family Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Long-term effects of negative parent talk', '2021', 'https://doi.org/10.1017/S0954579420000863', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Protective factors when one parent bad-mouths', '2020', 'https://doi.org/10.1111/famp.12541', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Therapeutic interventions for parental alienation', '2020', 'https://doi.org/10.1111/1467-6427.12295', 'Journal of Family Therapy', 6),
      (v_art_id, 'peer_reviewed', 1, 'Supporting children without reciprocating hostility', '2021', 'https://doi.org/10.1080/10502556.2020.1858237', 'Journal of Divorce & Remarriage', 7),
      (v_art_id, 'clinical_guideline', 4, 'Legal interventions for alienating behaviors', '2020', 'https://www.jstor.org/stable/27048912', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-048 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-048';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Attachment security in shared custody arrangements', '2020', 'https://doi.org/10.1080/14616734.2020.1751988', NULL, 1),
      (v_art_id, 'government', 2, 'Developmental needs in custody schedules', '2021', 'https://doi.org/10.1111/fcre.12568', 'Family Court Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Overnight visits for infants and toddlers', '2019', 'https://doi.org/10.1037/fam0000582', 'Journal of Family Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Transition stress in young children', '2020', 'https://doi.org/10.1002/imhj.21847', 'Infant Mental Health Journal', 4),
      (v_art_id, 'peer_reviewed', 1, 'Parenting plans for children under 3', '2020', 'https://doi.org/10.1111/fare.12447', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Graduated parenting schedules', '2021', 'https://doi.org/10.1080/15295192.2020.1855185', 'Parenting: Science and Practice', 6),
      (v_art_id, 'peer_reviewed', 1, 'Consistency across households and attachment', '2020', 'https://doi.org/10.1111/cdev.13389', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Supporting secure attachment post-separation', '2021', 'https://doi.org/10.1007/s10567-020-00341-5', 'Clinical Child and Family Psychology Review', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-049 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-049';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Post-divorce dating and family adjustment', '2020', 'https://doi.org/10.1111/fare.12452', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Children\', '2021', 'https://doi.org/10.1037/fam0000798', 'Journal of Family Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Timing of partner introductions', '2019', 'https://doi.org/10.1080/10502556.2019.1620901', 'Journal of Divorce & Remarriage', 3),
      (v_art_id, 'peer_reviewed', 1, 'Attachment and new relationships post-divorce', '2020', 'https://doi.org/10.1111/pere.12335', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Managing children\', '2021', 'https://doi.org/10.1111/famp.12648', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Red flags in post-divorce dating', '2020', 'https://doi.org/10.1177/0192513X20918625', 'Journal of Family Issues', 6),
      (v_art_id, 'peer_reviewed', 1, 'Integrating new partners into family systems', '2021', 'https://doi.org/10.1111/fare.12511', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Co-parenting and new relationships', '2019', 'https://doi.org/10.1177/0265407518819295', 'Journal of Social and Personal Relationships', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-050 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-050';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Long-term effects of parental divorce', '2019', 'https://doi.org/10.1111/cdev.13224', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Adult children of divorce: Relationship patterns', '2020', 'https://doi.org/10.1111/jomf.12672', 'Journal of Marriage and Family', 2),
      (v_art_id, 'peer_reviewed', 1, 'Mental health outcomes in adulthood', '2021', 'https://doi.org/10.1016/j.cpr.2020.101947', 'Clinical Psychology Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'Protective factors and resilience', '2020', 'https://doi.org/10.1017/S0954579419001627', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Divorce effects vary by conflict level', '2019', 'https://doi.org/10.1111/famp.12465', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Socioeconomic impact on long-term outcomes', '2020', 'https://doi.org/10.1037/fam0000641', 'Journal of Family Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Longitudinal studies of children of divorce', '2018', 'https://doi.org/10.1037/amp0000368', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Parenting quality matters more than family structure', '2021', 'https://doi.org/10.1111/cdep.12407', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

END $$;

-- ---------------------------------------------------------------------------
-- 5. Update citation counts and tier percentages
-- ---------------------------------------------------------------------------

DO $$
BEGIN
  ALTER TABLE public.articles DISABLE TRIGGER USER;

  UPDATE public.articles a
  SET citation_count = (
    SELECT COUNT(*) FROM public.article_citations c WHERE c.article_id = a.id
  ),
  tier1_citation_pct = (
    SELECT ROUND(
      100.0 * COUNT(*) FILTER (WHERE c.tier = 1) / NULLIF(COUNT(*), 0),
      1
    )
    FROM public.article_citations c WHERE c.article_id = a.id
  )
  WHERE a.article_production_id LIKE 'CAT06-%';

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;
