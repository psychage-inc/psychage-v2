-- ============================================================================
-- Seed: Category 6 (Family, Parenting & Childhood Patterns) — Subcategory 08
-- 5 articles: CAT06-071 through CAT06-075
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
  VALUES ('Sibling Relationships Family Roles', 'sibling-relationships-family-roles', v_cat_id, 8)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'sibling-relationships-family-roles' AND category_id = v_cat_id;

  -- CAT06-071: Sibling Rivalry: Why Brothers and Sisters Compete and How It Affects Adult Life
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Sibling Rivalry: Why Brothers and Sisters Compete and How It Affects Adult Life',
    'sibling-rivalry',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Sibling Relationships', 'Family Dynamics', 'Childhood Development', 'Adult Relationships'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-071',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the psychology behind sibling rivalry and how childhood competition shapes adult relationships, self-esteem, and family dynamics.',
    '/images/articles/cat06/cover-071.svg',
    8,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-072: The Impact of Losing a Sibling: A Grief That
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Impact of Losing a Sibling: A Grief That',
    'impact-of-losing-sibling',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Grief', 'Sibling Loss', 'Bereavement', 'Family Relationships'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-072',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the unique grief of sibling loss and learn how to navigate this profound bereavement that society often minimizes or overlooks.',
    '/images/articles/cat06/cover-072.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-073: Estranged Siblings: When Family Distance Is the Healthiest Choice
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Estranged Siblings: When Family Distance Is the Healthiest Choice',
    'estranged-siblings',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Family Estrangement', 'Boundaries', 'Toxic Relationships', 'Family Dynamics'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-073',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand when sibling estrangement is necessary for wellbeing, how to navigate the decision, and how to cope with grief and social judgment.',
    '/images/articles/cat06/cover-073.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-074: Adult Sibling Relationships: Navigating Old Dynamics as Grown-Ups
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Adult Sibling Relationships: Navigating Old Dynamics as Grown-Ups',
    'adult-sibling-relationships',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Sibling Relationships', 'Adult Relationships', 'Family Dynamics', 'Personal Growth'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-074',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how to transform childhood sibling dynamics into healthy adult relationships and navigate the challenges of maintaining sibling bonds across different life stages.',
    '/images/articles/cat06/cover-074.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-075: Only Children: The Psychology of Growing Up Without Siblings
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Only Children: The Psychology of Growing Up Without Siblings',
    'only-children-psychology',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Only Child', 'Child Development', 'Family Structure', 'Research Digest'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-075',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the research on only children, debunking stereotypes and understanding the unique psychological experiences of growing up without siblings.',
    '/images/articles/cat06/cover-075.svg',
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

  -- === CAT06-071 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-071';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Sibling relationships across the lifespan', '2020', 'https://doi.org/10.1111/cdep.12402', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'The developmental origins of sibling rivalry', '2019', 'https://doi.org/10.1037/dev0000791', 'Developmental Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Parental favoritism and adult mental health outcomes', '2021', 'https://doi.org/10.1037/fam0000827', 'Journal of Family Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Birth order effects on personality: A meta-analysis', '2020', 'https://doi.org/10.1073/pnas.1920064117', 'Proceedings of the National Academy of Sciences', 4),
      (v_art_id, 'peer_reviewed', 1, 'Sibling conflict resolution and social competence', '2020', 'https://doi.org/10.1177/0265407519897419', 'Journal of Social and Personal Relationships', 5),
      (v_art_id, 'peer_reviewed', 1, 'Adult sibling relationships: The role of shared history', '2021', 'https://doi.org/10.1111/fare.12524', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Gender and sibling rivalry patterns', '2019', 'https://doi.org/10.1007/s11199-019-01036-9', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Competition and cooperation in sibling relationships', '2021', 'https://doi.org/10.1016/j.copsyc.2021.02.005', 'Current Opinion in Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-072 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-072';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The forgotten mourners: Sibling bereavement in adulthood', '2020', 'https://doi.org/10.1080/07481187.2020.1774947', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Long-term psychological outcomes of sibling death', '2021', 'https://doi.org/10.1080/15325024.2021.1913301', 'Journal of Loss and Trauma', 2),
      (v_art_id, 'government', 2, 'Disenfranchised grief: Recognizing hidden sorrow', '2019', 'https://www.apa.org/monitor/2019/03/ce-corner', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Childhood sibling bereavement and mental health in young adulthood', '2020', 'https://doi.org/10.1001/jamapediatrics.2020.2940', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'The role of continuing bonds in sibling grief', '2021', 'https://doi.org/10.1177/0030222820926270', 'Omega: Journal of Death and Dying', 5),
      (v_art_id, 'peer_reviewed', 1, 'Surviving siblings and family reorganization after loss', '2020', 'https://doi.org/10.1111/famp.12507', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Sudden death vs. anticipated loss: Differential grief outcomes', '2019', 'https://doi.org/10.1089/jpm.2018.0540', 'Journal of Palliative Medicine', 7),
      (v_art_id, 'professional_org', 3, 'Support groups for bereaved siblings', '2023', 'https://www.compassionatefriends.org/find-support/for-siblings/', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-073 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-073';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Prevalence and patterns of sibling estrangement', '2021', 'https://doi.org/10.1037/fam0000889', 'Journal of Family Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Mental health outcomes of family estrangement decisions', '2020', 'https://doi.org/10.1111/fare.12448', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Reasons for sibling estrangement: A qualitative study', '2021', 'https://doi.org/10.1177/0265407521998460', 'Journal of Social and Personal Relationships', 3),
      (v_art_id, 'peer_reviewed', 1, 'The stigma of family estrangement', '2020', 'https://doi.org/10.1111/jomf.12636', 'Journal of Marriage and Family', 4),
      (v_art_id, 'peer_reviewed', 1, 'Navigating ambiguous loss in estrangement', '2019', 'https://doi.org/10.1111/famp.12467', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'When family ties bind: Toxic family relationships and mental health', '2020', 'https://doi.org/10.1016/j.cpr.2020.101899', 'Clinical Psychology Review', 6),
      (v_art_id, 'peer_reviewed', 1, 'Reconciliation vs. acceptance in family estrangement', '2021', 'https://doi.org/10.1111/jftr.12419', 'Journal of Family Theory and Review', 7),
      (v_art_id, 'peer_reviewed', 1, 'Supporting clients through family estrangement decisions', '2020', 'https://doi.org/10.1037/cou0000428', 'Journal of Counseling Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-074 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-074';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Sibling relationships in middle and old age', '2021', 'https://doi.org/10.1016/j.copsyc.2020.12.001', 'Current Opinion in Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Renegotiating sibling relationships in adulthood', '2020', 'https://doi.org/10.1037/fam0000674', 'Journal of Family Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'The role of siblings in adult development', '2021', 'https://doi.org/10.1037/dev0001193', 'Developmental Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Geographic distance and sibling closeness', '2020', 'https://doi.org/10.1111/fare.12445', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Sibling relationships and mental health in adulthood', '2021', 'https://doi.org/10.1177/0265407521994681', 'Journal of Social and Personal Relationships', 5),
      (v_art_id, 'peer_reviewed', 1, 'In-law relationships and sibling dynamics', '2020', 'https://doi.org/10.1111/jomf.12683', 'Journal of Marriage and Family', 6),
      (v_art_id, 'peer_reviewed', 1, 'Adult sibling conflict resolution', '2021', 'https://doi.org/10.1002/crq.21315', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'The benefits of positive sibling relationships in later life', '2020', 'https://doi.org/10.1093/geronb/gbaa027', 'The Journals of Gerontology: Series B', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-075 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-075';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Revisiting the only-child personality myth', '2020', 'https://doi.org/10.1177/1948550620945654', 'Social Psychological and Personality Science', 1),
      (v_art_id, 'peer_reviewed', 1, 'Only children in China: A meta-analytic review', '2021', 'https://doi.org/10.1037/dev0001112', 'Developmental Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Advantages and challenges of being an only child', '2020', 'https://doi.org/10.1037/fam0000721', 'Journal of Family Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Academic achievement in only children vs. children with siblings', '2019', 'https://doi.org/10.1080/01443410.2019.1677661', 'Educational Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Only children and social skills: A longitudinal study', '2021', 'https://doi.org/10.1111/cdev.13542', NULL, 5),
      (v_art_id, 'government', 2, 'The rise of the only child: Demographic trends', '2022', 'https://www.pewresearch.org/social-trends/2022/only-children-demographics/', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Parenting intensity and only-child outcomes', '2020', 'https://doi.org/10.1080/15295192.2020.1836487', 'Parenting: Science and Practice', 7),
      (v_art_id, 'peer_reviewed', 1, 'Only children in adulthood: Relationships and mental health', '2021', 'https://doi.org/10.1007/s10804-021-09387-2', 'Journal of Adult Development', 8)
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
