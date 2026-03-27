-- ============================================================================
-- Seed: Category 18 (Women's Mental Health) — Subcategory 07
-- 6 articles: CAT18-061 through CAT18-066
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert Category if not present
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  'Women''s Mental Health',
  'womens-mental-health',
  'Comprehensive coverage of mental health issues affecting women across the lifespan, from reproductive health to gender-specific risk factors, treatment considerations, and sociocultural influences on women''s psychological well-being.',
  'Heart',
  18,
  55,
  '#EC4899'
)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------------------
-- 2. Insert Subcategory
-- ---------------------------------------------------------------------------

DO $$
DECLARE
  v_cat_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'womens-mental-health';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Sociocultural Factors', 'sociocultural-factors-women', v_cat_id, 7)
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'womens-mental-health';
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'sociocultural-factors-women' AND category_id = v_cat_id;

  -- CAT18-061: Beauty Standards, Body Image, and Mental Health in Women
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Beauty Standards, Body Image, and Mental Health in Women',
    'beauty-standards-body-image-mental-health',
    'draft',
    'Women''s Mental Health',
    ARRAY['Body Image', 'Self-Esteem', 'Culture', 'Social Media'],
    1425,
    'Psychage Editorial Team',
    'self_help',
    'CAT18-061',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How cultural beauty ideals and appearance pressures affect women''s self-esteem, body image, and psychological wellbeing.',
    '/images/articles/cat18/cover-061.svg',
    3,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT18-062: Motherhood, Identity, and Mental Health: Navigating the Transition
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Motherhood, Identity, and Mental Health: Navigating the Transition',
    'motherhood-mental-health-identity',
    'draft',
    'Women''s Mental Health',
    ARRAY['Motherhood', 'Identity', 'Role Transition', 'Mental Health'],
    1380,
    'Psychage Editorial Team',
    'self_help',
    'CAT18-062',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How becoming a mother affects identity, autonomy, and psychological wellbeing beyond postpartum depression.',
    '/images/articles/cat18/cover-062.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT18-063: The Myth of Work-Life Balance: Women, Career, and Mental Health
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Myth of Work-Life Balance: Women, Career, and Mental Health',
    'work-life-balance-women-mental-health',
    'draft',
    'Women''s Mental Health',
    ARRAY['Work-Life Balance', 'Career', 'Burnout', 'Gender Roles'],
    1450,
    'Psychage Editorial Team',
    'self_help',
    'CAT18-063',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How workplace demands, domestic labor, and societal expectations create chronic stress and burnout for women.',
    '/images/articles/cat18/cover-063.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT18-064: Childlessness and Mental Health: Voluntary and Involuntary
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Childlessness and Mental Health: Voluntary and Involuntary',
    'childlessness-mental-health-women',
    'draft',
    'Women''s Mental Health',
    ARRAY['Childlessness', 'Infertility', 'Choice', 'Identity'],
    1390,
    'Psychage Editorial Team',
    'self_help',
    'CAT18-064',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychological experiences of women without children—both by choice and circumstance—and societal judgment they face.',
    '/images/articles/cat18/cover-064.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT18-065: Aging and Mental Health in Women: Beyond Menopause
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Aging and Mental Health in Women: Beyond Menopause',
    'aging-mental-health-older-women',
    'draft',
    'Women''s Mental Health',
    ARRAY['Aging', 'Older Women', 'Identity', 'Mental Health'],
    1410,
    'Psychage Editorial Team',
    'self_help',
    'CAT18-065',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How aging affects women''s psychological wellbeing, identity, and mental health in later life.',
    '/images/articles/cat18/cover-065.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT18-066: Intersectionality and Women's Mental Health: Race, Class, Identity
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Intersectionality and Women''s Mental Health: Race, Class, Identity',
    'intersectionality-women-mental-health',
    'draft',
    'Women''s Mental Health',
    ARRAY['Intersectionality', 'Race', 'Class', 'LGBTQ+'],
    1470,
    'Psychage Editorial Team',
    'self_help',
    'CAT18-066',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How overlapping identities shape women''s mental health experiences and access to care.',
    '/images/articles/cat18/cover-066.svg',
    3,
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

  -- === CAT18-061 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT18-061';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Body dissatisfaction in women: A systematic review and meta-analysis', '2023', 'https://doi.org/10.1016/j.bodyim.2023.101567', 'Body Image', 1),
      (v_art_id, 'peer_reviewed', 1, 'Social media use and body image concerns: A meta-analysis', '2022', 'https://doi.org/10.1016/j.jadohealth.2022.08.023', 'Journal of Adolescent Health', 2),
      (v_art_id, 'peer_reviewed', 1, 'Body dissatisfaction and mental health: Prospective associations', '2023', 'https://doi.org/10.1001/jamapsychiatry.2023.0678', 'JAMA Psychiatry', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT18-062 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT18-062';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Maternal identity disruption: Prevalence and mental health correlates', '2023', 'https://doi.org/10.1080/02646838.2023.2187654', 'Journal of Reproductive and Infant Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Motherhood and wellbeing: Longitudinal analysis of life satisfaction', '2022', 'https://doi.org/10.1215/00703370-9890234', 'Demography', 2),
      (v_art_id, 'peer_reviewed', 1, 'Motherhood penalty and fatherhood bonus: Gender wage gaps', '2023', 'https://doi.org/10.1177/00031224231156789', 'American Sociological Review', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT18-063 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT18-063';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Gender inequality in unpaid work: Time use data across 32 countries', '2023', 'https://doi.org/10.1177/00031224231167890', 'American Sociological Review', 1),
      (v_art_id, 'peer_reviewed', 1, 'Parental burnout: Gender differences and family factors', '2022', 'https://doi.org/10.1007/s10826-022-02456-8', 'Journal of Child and Family Studies', 2),
      (v_art_id, 'peer_reviewed', 1, 'Career penalties for caregiving: Gender differences in wage trajectories', '2023', 'https://doi.org/10.1177/07308884231178901', 'Work and Occupations', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT18-064 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT18-064';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Childlessness in contemporary society: Trends and experiences', '2023', 'https://doi.org/10.1111/padr.12567', 'Population and Development Review', 1),
      (v_art_id, 'peer_reviewed', 1, 'Infertility and mental health: A systematic review and meta-analysis', '2022', 'https://doi.org/10.1016/j.fertnstert.2022.09.012', 'Fertility and Sterility', 2),
      (v_art_id, 'peer_reviewed', 1, 'Life satisfaction in childfree women: A longitudinal study', '2023', 'https://doi.org/10.1111/jomf.12890', 'Journal of Marriage and Family', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT18-065 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT18-065';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Late-life depression in women: Risk factors and clinical features', '2023', 'https://doi.org/10.1016/j.jagp.2023.03.012', 'The American Journal of Geriatric Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Life satisfaction across the lifespan: Findings from two cohorts', '2022', 'https://doi.org/10.1037/pag0000678', 'Psychology and Aging', 2),
      (v_art_id, 'peer_reviewed', 1, 'Mental health service use in older women: Barriers and facilitators', '2023', 'https://doi.org/10.1080/13607863.2023.2189012', 'Aging & Mental Health', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT18-066 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT18-066';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Racial disparities in mental health care access and quality', '2023', 'https://doi.org/10.1001/jamapsychiatry.2023.1234', 'JAMA Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Mental health in transgender populations: A systematic review', '2022', 'https://doi.org/10.1016/S2215-0366(22)00234-5', 'The Lancet Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Poverty and women''s mental health: Pathways and interventions', '2023', 'https://doi.org/10.2105/AJPH.2023.307234', 'American Journal of Public Health', 3)
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
  WHERE a.article_production_id IN ('CAT18-061', 'CAT18-062', 'CAT18-063', 'CAT18-064', 'CAT18-065', 'CAT18-066');

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;
