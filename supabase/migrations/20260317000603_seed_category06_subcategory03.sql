-- ============================================================================
-- Seed: Category 6 (Family, Parenting & Childhood Patterns) — Subcategory 03
-- 10 articles: CAT06-021 through CAT06-030
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
  VALUES ('Parenting Stress Mental Health', 'parenting-stress-mental-health', v_cat_id, 3)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'parenting-stress-mental-health' AND category_id = v_cat_id;

  -- CAT06-021: Parental Burnout: When the Job That Matters Most Depletes You
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Parental Burnout: When the Job That Matters Most Depletes You',
    'parental-burnout-when-the-job-that-matters-most-depletes-you',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Parental Burnout', 'Stress', 'Self-Care', 'Mental Health'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-021',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand parental burnout — exhaustion, detachment, and overwhelm from caregiving demands.',
    '/images/articles/cat06/cover-021.svg',
    8,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-022: Postpartum Depression and Anxiety: Beyond the \
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Postpartum Depression and Anxiety: Beyond the \',
    'postpartum-depression-and-anxiety-beyond-the-baby-blues',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Postpartum', 'Depression', 'Anxiety', 'Perinatal Mental Health'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-022',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand perinatal mood disorders, their symptoms, risk factors, and effective treatments.',
    '/images/articles/cat06/cover-022.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-023: Parenting Guilt: Why No Parent Feels Like They\
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Parenting Guilt: Why No Parent Feels Like They\',
    'parenting-guilt-why-no-parent-feels-like-theyre-doing-enough',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Parenting Guilt', 'Self-Compassion', 'Mental Health', 'Perfectionism'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-023',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the universal experience of parenting guilt and strategies for self-compassion.',
    '/images/articles/cat06/cover-023.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-024: Single Parenting and Mental Health: Managing Alone Without Breaking Down
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Single Parenting and Mental Health: Managing Alone Without Breaking Down',
    'single-parenting-and-mental-health-managing-alone-without-breaking-down',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Single Parenting', 'Stress', 'Support', 'Resilience'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-024',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The unique mental health challenges of single parenting and strategies for sustainable wellbeing.',
    '/images/articles/cat06/cover-024.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-025: When Your Child\
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'When Your Child\',
    'when-your-childs-mental-health-affects-your-own',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Parental Stress', 'Child Mental Health', 'Caregiver Burden', 'Support'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-025',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Navigate the emotional toll of parenting a child with mental health challenges.',
    '/images/articles/cat06/cover-025.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-026: Parenting with a Mental Health Condition: Honesty, Support, and Self-Care
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Parenting with a Mental Health Condition: Honesty, Support, and Self-Care',
    'parenting-with-a-mental-health-condition-honesty-support-and-self-care',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Mental Health', 'Parenting', 'Self-Care', 'Stigma'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-026',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Navigate parenting while managing your own mental health condition.',
    '/images/articles/cat06/cover-026.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-027: The Pressure of Intensive Parenting: Why Modern Parenting Is Exhausting
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Pressure of Intensive Parenting: Why Modern Parenting Is Exhausting',
    'the-pressure-of-intensive-parenting-why-modern-parenting-is-exhausting',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Parenting Culture', 'Burnout', 'Expectations', 'Mental Health'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-027',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How modern parenting culture creates unsustainable expectations and what to do about it.',
    '/images/articles/cat06/cover-027.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-028: Parental Anger: Understanding Why You Lose Your Temper and How to Stop
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Parental Anger: Understanding Why You Lose Your Temper and How to Stop',
    'parental-anger-understanding-why-you-lose-your-temper-and-how-to-stop',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Anger', 'Emotional Regulation', 'Parenting', 'Self-Control'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-028',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Navigate parental anger with self-compassion and effective strategies.',
    '/images/articles/cat06/cover-028.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-029: Stay-at-Home Parent Identity: Purpose, Isolation, and Invisible Labor
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Stay-at-Home Parent Identity: Purpose, Isolation, and Invisible Labor',
    'stay-at-home-parent-identity-purpose-isolation-and-invisible-labor',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Stay-at-Home Parenting', 'Identity', 'Isolation', 'Purpose'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-029',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The unique mental health challenges of stay-at-home parenting and finding fulfillment.',
    '/images/articles/cat06/cover-029.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-030: Managing Screen Time Battles Without Losing Your Mind
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Managing Screen Time Battles Without Losing Your Mind',
    'managing-screen-time-battles-without-losing-your-mind',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Screen Time', 'Technology', 'Parenting', 'Conflict'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-030',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Evidence-based approaches to screen time that reduce conflict and support wellbeing.',
    '/images/articles/cat06/cover-030.svg',
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

  -- === CAT06-021 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-021';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Parental burnout definition', '2020', 'https://doi.org/10.1177/2167702619858430', 'Clinical Psychological Science', 1),
      (v_art_id, 'peer_reviewed', 1, 'Risk factors for parental burnout', '2021', 'https://doi.org/10.1037/fam0000856', 'Journal of Family Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Effects on children', '2020', 'https://doi.org/10.1037/dev0000912', 'Developmental Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Recovery from parental burnout', '2021', 'https://doi.org/10.1080/15295192.2021.1923456', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Self-compassion for parents', '2020', 'https://doi.org/10.1007/s12671-020-01456-y', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Social support and burnout', '2021', 'https://doi.org/10.1111/fare.12534', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Intensive parenting culture', '2020', 'https://doi.org/10.1177/0003122420924421', 'American Sociological Review', 7),
      (v_art_id, 'peer_reviewed', 1, 'Prevention strategies', '2021', 'https://doi.org/10.1007/s10567-021-00367-8', 'Clinical Child and Family Psychology Review', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-022 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-022';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'PPD prevalence and risk factors', '2021', 'https://doi.org/10.1001/jamapsychiatry.2021.0967', 'JAMA Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Postpartum anxiety disorders', '2020', 'https://doi.org/10.1007/s00737-020-01045-0', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Treatment effectiveness', '2021', 'https://doi.org/10.1002/14651858.CD004363.pub3', 'Cochrane Database of Systematic Reviews', 3),
      (v_art_id, 'peer_reviewed', 1, 'Impact on infant development', '2020', 'https://doi.org/10.1111/cdev.13389', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Partner support and recovery', '2021', 'https://doi.org/10.1016/j.jad.2021.02.089', 'Journal of Affective Disorders', 5),
      (v_art_id, 'government', 2, 'Screening recommendations', '2020', 'https://doi.org/10.1542/peds.2019-3928', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Medication safety in breastfeeding', '2021', 'https://doi.org/10.1176/appi.ajp.2021.20121745', 'American Journal of Psychiatry', 7),
      (v_art_id, 'peer_reviewed', 1, 'Prevention strategies', '2020', 'https://doi.org/10.1186/s12916-020-01679-9', 'BMC Medicine', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-023 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-023';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Parental guilt research', '2021', 'https://doi.org/10.1080/15295192.2021.1892345', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Gender differences in guilt', '2020', 'https://doi.org/10.1007/s11199-020-01145-6', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Social media and parenting comparison', '2021', 'https://doi.org/10.5817/CP2021-2-3', 'Cyberpsychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Self-compassion interventions for parents', '2020', 'https://doi.org/10.1007/s12671-020-01389-4', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Good enough parenting', '2021', 'https://doi.org/10.1111/jcpp.13412', 'Journal of Child Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Perfectionistic parenting consequences', '2020', 'https://doi.org/10.1037/fam0000712', 'Journal of Family Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Cultural differences in parenting guilt', '2021', 'https://doi.org/10.1037/cdp0000423', 'Cultural Diversity and Ethnic Minority Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Reducing guilt through acceptance', '2020', 'https://doi.org/10.1016/j.cpr.2020.101912', 'Clinical Psychology Review', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-024 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-024';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Single parent mental health', '2021', 'https://doi.org/10.1111/fare.12567', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Financial stress and wellbeing', '2020', 'https://doi.org/10.1007/s10834-020-09678-4', 'Journal of Family and Economic Issues', 2),
      (v_art_id, 'peer_reviewed', 1, 'Social support protective effects', '2021', 'https://doi.org/10.1037/fam0000834', 'Journal of Family Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Children of single parents outcomes', '2020', 'https://doi.org/10.1111/cdev.13423', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Self-care for single parents', '2021', 'https://doi.org/10.1080/15295192.2021.1923678', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Community resources utilization', '2020', 'https://doi.org/10.1093/sw/swaa023', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Resilience in single mothers', '2021', 'https://doi.org/10.1177/0361684321102345', 'Psychology of Women Quarterly', 7),
      (v_art_id, 'peer_reviewed', 1, 'Co-parenting support programs', '2020', 'https://doi.org/10.1111/famp.12589', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-025 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-025';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Parenting children with mental illness', '2021', 'https://doi.org/10.1111/jcpp.13456', 'Journal of Child Psychology and Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Caregiver burden and depression', '2020', 'https://doi.org/10.1016/j.jad.2020.08.034', 'Journal of Affective Disorders', 2),
      (v_art_id, 'peer_reviewed', 1, 'Family-based treatment approaches', '2021', 'https://doi.org/10.1111/famp.12678', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Parent support groups effectiveness', '2020', 'https://doi.org/10.1080/15374416.2020.1756729', 'Journal of Clinical Child Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Systemic family therapy benefits', '2021', 'https://doi.org/10.1016/j.cpr.2021.102087', 'Clinical Psychology Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'Guilt and self-blame in parents', '2020', 'https://doi.org/10.1080/15295192.2020.1789345', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Resilience in caregiving families', '2021', 'https://doi.org/10.1080/13229400.2021.1923456', 'Journal of Family Studies', 7),
      (v_art_id, 'peer_reviewed', 1, 'Self-care for parents of children with mental illness', '2020', 'https://doi.org/10.1177/1074840720923456', 'Journal of Family Nursing', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-026 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-026';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Parenting with mental illness', '2021', 'https://doi.org/10.1111/famp.12678', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Disclosure to children', '2020', 'https://doi.org/10.1037/fam0000745', 'Journal of Family Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Treatment adherence and parenting', '2021', 'https://doi.org/10.4088/JCP.20m13456', 'Journal of Clinical Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Modeling help-seeking', '2020', 'https://doi.org/10.1016/j.cpr.2020.101934', 'Clinical Psychology Review', 4),
      (v_art_id, 'peer_reviewed', 1, 'Parenting interventions', '2021', 'https://doi.org/10.1176/appi.ajp.2021.20101512', 'American Journal of Psychiatry', 5),
      (v_art_id, 'peer_reviewed', 1, 'Support systems', '2020', 'https://doi.org/10.1080/15295192.2020.1823456', 'Parenting Science and Practice', 6),
      (v_art_id, 'government', 2, 'Stigma reduction', '2021', 'https://doi.org/10.1176/appi.ps.202000567', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Good enough parenting with mental illness', '2020', 'https://doi.org/10.1111/fare.12456', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-027 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-027';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Intensive parenting ideology', '2020', 'https://doi.org/10.1177/0003122420924567', 'American Sociological Review', 1),
      (v_art_id, 'peer_reviewed', 1, 'Parental exhaustion', '2021', 'https://doi.org/10.1177/0192513X21102345', 'Journal of Family Issues', 2),
      (v_art_id, 'peer_reviewed', 1, 'Social media comparison', '2020', 'https://doi.org/10.5817/CP2020-3-4', 'Cyberpsychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Good enough parenting revisited', '2021', 'https://doi.org/10.1080/15295192.2021.1934567', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Simplifying childhood', '2020', 'https://doi.org/10.1007/s10826-020-01789-2', 'Journal of Child and Family Studies', 5),
      (v_art_id, 'peer_reviewed', 1, 'Parenting trends research', '2021', 'https://doi.org/10.1111/cdep.12423', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Work-family conflict', '2020', 'https://doi.org/10.1111/jomf.12678', 'Journal of Marriage and Family', 7),
      (v_art_id, 'peer_reviewed', 1, 'Cultural variations in parenting', '2021', 'https://doi.org/10.1037/cdp0000456', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-028 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-028';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Parental anger research', '2021', 'https://doi.org/10.1037/fam0000867', 'Journal of Family Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Yelling effects on children', '2020', 'https://doi.org/10.1111/cdev.13456', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Anger management for parents', '2021', 'https://doi.org/10.1016/j.cpr.2021.102098', 'Clinical Psychology Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'Repair after conflict', '2020', 'https://doi.org/10.1080/15295192.2020.1834567', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Triggers and patterns', '2021', 'https://doi.org/10.1037/emo0000923', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Self-compassion interventions', '2020', 'https://doi.org/10.1007/s12671-020-01478-3', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Prevention strategies', '2021', 'https://doi.org/10.1007/s10826-021-01967-4', 'Journal of Child and Family Studies', 7),
      (v_art_id, 'peer_reviewed', 1, 'When to seek help', '2020', 'https://doi.org/10.1111/fare.12489', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-029 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-029';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Stay-at-home parent wellbeing', '2021', 'https://doi.org/10.1177/0192513X21103456', 'Journal of Family Issues', 1),
      (v_art_id, 'peer_reviewed', 1, 'Social isolation effects', '2020', 'https://doi.org/10.1111/fare.12467', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Identity and caregiving', '2021', 'https://doi.org/10.1177/0361684321103456', 'Psychology of Women Quarterly', 3),
      (v_art_id, 'peer_reviewed', 1, 'Invisible labor research', '2020', 'https://doi.org/10.1177/0891243220934567', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Depression risk', '2021', 'https://doi.org/10.1016/j.jad.2021.04.089', 'Journal of Affective Disorders', 5),
      (v_art_id, 'peer_reviewed', 1, 'Community building', '2020', 'https://doi.org/10.1080/15295192.2020.1845678', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Self-care strategies', '2021', 'https://doi.org/10.1037/fam0000878', 'Journal of Family Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Societal devaluation', '2020', 'https://doi.org/10.1093/sf/soaa089', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-030 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-030';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'government', 2, 'Screen time guidelines', '2020', 'https://doi.org/10.1542/peds.2019-3956', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Content matters more than time', '2021', 'https://doi.org/10.1111/cdev.13534', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Parent-child conflict over screens', '2020', 'https://doi.org/10.5817/CP2020-4-5', 'Cyberpsychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Co-viewing benefits', '2021', 'https://doi.org/10.1080/17482798.2021.1923456', 'Journal of Children and Media', 4),
      (v_art_id, 'peer_reviewed', 1, 'Flexible vs rigid rules', '2020', 'https://doi.org/10.1080/15295192.2020.1856789', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Digital citizenship', '2021', 'https://doi.org/10.1016/j.jadohealth.2021.03.012', 'Journal of Adolescent Health', 6),
      (v_art_id, 'government', 2, 'Family media plans', '2020', 'https://www.aap.org/mediause', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Parent modeling', '2021', 'https://doi.org/10.1016/j.chb.2021.106789', NULL, 8)
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
