-- ============================================================================
-- Seed: Category 15 (Loneliness, Social Connection & Belonging) — Subcategory 02
-- 10 articles: CAT15-011 through CAT15-020
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert Category if not present
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  'Loneliness, Social Connection & Belonging',
  'loneliness-connection',
  'Understanding loneliness, building social connection, and finding belonging in an increasingly disconnected world.',
  'Users',
  15,
  50,
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'loneliness-connection';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Loneliness Across the Lifespan', 'loneliness-across-the-lifespan', v_cat_id, 2)
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'loneliness-connection';
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'loneliness-across-the-lifespan' AND category_id = v_cat_id;

  -- CAT15-011: Loneliness in Children and Adolescents: Why Young People Feel Disconnected
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Loneliness in Children and Adolescents: Why Young People Feel Disconnected',
    'loneliness-in-children-adolescents-young-people-disconnected',
    'draft',
    'Loneliness, Social Connection & Belonging',
    ARRAY['Youth Loneliness', 'Adolescents', 'Child Development', 'Social Media'],
    981,
    'Dr. Sarah Chen',
    'self_help',
    'CAT15-011',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Loneliness affects children and teens differently than adults. Understand developmental factors, social media impacts, and how to support young people.',
    '/images/articles/cat15/cover-011.svg',
    7,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT15-012: College Loneliness: Why the ''Best Years of Your Life'' Can Feel So Isolating
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'College Loneliness: Why the ''Best Years of Your Life'' Can Feel So Isolating',
    'college-loneliness-best-years-of-life-feel-isolating',
    'draft',
    'Loneliness, Social Connection & Belonging',
    ARRAY['College Students', 'Young Adult Loneliness', 'Campus Life', 'Mental Health'],
    964,
    'Dr. Sarah Chen',
    'self_help',
    'CAT15-012',
    v_cat_id,
    v_sub_id,
    'drafted',
    'College students report higher loneliness than any other age group. Understand the unique pressures and how to find connection on campus.',
    '/images/articles/cat15/cover-012.svg',
    6,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT15-013: Loneliness in Your 20s and 30s: When Adult Friendships Get Hard
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Loneliness in Your 20s and 30s: When Adult Friendships Get Hard',
    'loneliness-in-20s-30s-when-adult-friendships-get-hard',
    'draft',
    'Loneliness, Social Connection & Belonging',
    ARRAY['Young Adults', 'Adult Friendships', 'Life Transitions', 'Social Networks'],
    986,
    'Dr. Sarah Chen',
    'self_help',
    'CAT15-013',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Young adulthood is when social networks naturally shrink. Understand why friendships become harder and how to maintain connection through life transitions.',
    '/images/articles/cat15/cover-013.svg',
    6,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT15-014: Loneliness After Having a Baby: The Isolation New Parents Don''t Talk About
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Loneliness After Having a Baby: The Isolation New Parents Don''t Talk About',
    'loneliness-after-having-baby-isolation-new-parents-dont-talk-about',
    'draft',
    'Loneliness, Social Connection & Belonging',
    ARRAY['New Parents', 'Postpartum', 'Parental Isolation', 'Mental Health'],
    961,
    'Dr. Sarah Chen',
    'self_help',
    'CAT15-014',
    v_cat_id,
    v_sub_id,
    'drafted',
    'New parenthood is often profoundly isolating. Understand why becoming a parent can trigger intense loneliness and how to find support.',
    '/images/articles/cat15/cover-014.svg',
    6,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT15-015: Midlife Loneliness: When Your Social Circle Shrinks Without You Noticing
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Midlife Loneliness: When Your Social Circle Shrinks Without You Noticing',
    'midlife-loneliness-when-social-circle-shrinks-without-noticing',
    'draft',
    'Loneliness, Social Connection & Belonging',
    ARRAY['Midlife', 'Social Networks', 'Middle Age', 'Life Transitions'],
    976,
    'Dr. Sarah Chen',
    'self_help',
    'CAT15-015',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Your 40s and 50s bring career demands, family obligations, and gradual social network erosion. Understand midlife loneliness and how to reverse it.',
    '/images/articles/cat15/cover-015.svg',
    6,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT15-016: Loneliness in Older Adults: The Health Crisis of Aging Alone
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Loneliness in Older Adults: The Health Crisis of Aging Alone',
    'loneliness-in-older-adults-health-crisis-aging-alone',
    'draft',
    'Loneliness, Social Connection & Belonging',
    ARRAY['Older Adults', 'Aging', 'Elder Loneliness', 'Public Health'],
    997,
    'Dr. Sarah Chen',
    'self_help',
    'CAT15-016',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Loneliness in older age is a serious public health issue linked to mortality, dementia, and functional decline. Understand the risk factors and protective measures.',
    '/images/articles/cat15/cover-016.svg',
    7,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT15-017: Loneliness After Retirement: Losing Your Work Identity and Social Circle
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Loneliness After Retirement: Losing Your Work Identity and Social Circle',
    'loneliness-after-retirement-losing-work-identity-social-circle',
    'draft',
    'Loneliness, Social Connection & Belonging',
    ARRAY['Retirement', 'Life Transitions', 'Identity', 'Older Adults'],
    969,
    'Dr. Sarah Chen',
    'self_help',
    'CAT15-017',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Retirement removes daily structure, social contact, and purpose. Learn how to navigate this transition and build a fulfilling post-work life.',
    '/images/articles/cat15/cover-017.svg',
    6,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT15-018: Loneliness After Loss: When Grief Removes Your Person
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Loneliness After Loss: When Grief Removes Your Person',
    'loneliness-after-loss-when-grief-removes-your-person',
    'draft',
    'Loneliness, Social Connection & Belonging',
    ARRAY['Grief', 'Bereavement', 'Loss', 'Widowhood'],
    982,
    'Dr. Sarah Chen',
    'self_help',
    'CAT15-018',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Losing a loved one creates a unique loneliness that persists long after grief fades. Understand bereavement loneliness and how to find connection again.',
    '/images/articles/cat15/cover-018.svg',
    6,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT15-019: Loneliness in Caregivers: Isolated by the Demands of Looking After Someone
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Loneliness in Caregivers: Isolated by the Demands of Looking After Someone',
    'loneliness-in-caregivers-isolated-by-demands-looking-after-someone',
    'draft',
    'Loneliness, Social Connection & Belonging',
    ARRAY['Caregivers', 'Caregiver Burden', 'Isolation', 'Family Caregiving'],
    966,
    'Dr. Sarah Chen',
    'self_help',
    'CAT15-019',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Caregiving for a loved one often creates profound isolation. Understand caregiver loneliness and how to find support while providing care.',
    '/images/articles/cat15/cover-019.svg',
    6,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT15-020: LGBTQ+ Loneliness: Minority Stress and the Search for Belonging
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'LGBTQ+ Loneliness: Minority Stress and the Search for Belonging',
    'lgbtq-loneliness-minority-stress-search-for-belonging',
    'draft',
    'Loneliness, Social Connection & Belonging',
    ARRAY['LGBTQ+', 'Minority Stress', 'Social Isolation', 'Belonging'],
    994,
    'Dr. Sarah Chen',
    'self_help',
    'CAT15-020',
    v_cat_id,
    v_sub_id,
    'drafted',
    'LGBTQ+ individuals face unique loneliness driven by discrimination, family rejection, and lack of community. Understand the challenges and pathways to connection.',
    '/images/articles/cat15/cover-020.svg',
    7,
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

  -- === CAT15-011 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT15-011';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Loneliness in childhood and adolescence: A systematic review', '2020', 'https://doi.org/10.1017/S0954579419001491', 'Development and Psychopathology', 1),
      (v_art_id, 'peer_reviewed', 1, 'The relationship between social media use and loneliness in adolescents', '2019', 'https://doi.org/10.1016/j.chb.2018.11.040', 'Computers in Human Behavior', 2),
      (v_art_id, 'peer_reviewed', 1, 'Peer rejection and loneliness in childhood', '2018', 'https://doi.org/10.1111/jcpp.12821', 'Journal of Child Psychology and Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Social anxiety and loneliness in adolescence', '2017', 'https://doi.org/10.1007/s10567-017-0238-7', 'Clinical Child and Family Psychology Review', 4),
      (v_art_id, 'peer_reviewed', 1, 'The impact of family relationships on adolescent loneliness', '2019', 'https://doi.org/10.1007/s10964-019-00989-2', 'Journal of Youth and Adolescence', 5),
      (v_art_id, 'peer_reviewed', 1, 'Cyberbullying and adolescent loneliness', '2020', 'https://doi.org/10.1089/cyber.2019.0611', 'Cyberpsychology, Behavior, and Social Networking', 6),
      (v_art_id, 'peer_reviewed', 1, 'School belonging and loneliness in young people', '2021', 'https://doi.org/10.1080/2372966X.2020.1851616', 'School Psychology Review', 7)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT15-012 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT15-012';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Loneliness among college students: A review', '2020', 'https://doi.org/10.1353/csd.2020.0005', 'Journal of College Student Development', 1),
      (v_art_id, 'peer_reviewed', 1, 'The relationship between loneliness and academic performance in college students', '2019', 'https://doi.org/10.1080/07448481.2018.1496428', 'Journal of American College Health', 2),
      (v_art_id, 'peer_reviewed', 1, 'Social media use and loneliness in college students', '2021', 'https://doi.org/10.1007/s10964-020-01389-9', 'Journal of Youth and Adolescence', 3),
      (v_art_id, 'peer_reviewed', 1, 'First-year college students and loneliness', '2018', 'https://doi.org/10.1080/07294360.2018.1426828', 'Higher Education Research & Development', 4),
      (v_art_id, 'professional_org', 3, 'The impact of residence hall living on college student loneliness', '2017', 'https://www.acuho-i.org/publications/journal', 'Journal of College and University Student Housing', 5),
      (v_art_id, 'government', 2, 'Our Epidemic of Loneliness and Isolation', '2023', 'https://www.hhs.gov/sites/default/files/surgeon-general-social-connection-advisory.pdf', 'U.S. Department of Health and Human Services', 6)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT15-013 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT15-013';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Loneliness across the life span: A review', '2020', 'https://doi.org/10.1177/1745691620910393', 'Perspectives on Psychological Science', 1),
      (v_art_id, 'peer_reviewed', 1, 'Social network changes and life events across the life course', '2019', 'https://doi.org/10.1177/0265407518819515', 'Journal of Social and Personal Relationships', 2),
      (v_art_id, 'peer_reviewed', 1, 'The development of friendships in adulthood', '2018', 'https://doi.org/10.1037/dev0000458', 'Developmental Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Work demands and social relationships in young adulthood', '2020', 'https://doi.org/10.1016/j.jvb.2019.103354', 'Journal of Vocational Behavior', 4),
      (v_art_id, 'peer_reviewed', 1, 'Friendship quality and loneliness in young adults', '2017', 'https://doi.org/10.1007/s10804-016-9247-9', 'Journal of Adult Development', 5),
      (v_art_id, 'peer_reviewed', 1, 'Geographic mobility and social relationships', '2016', 'https://doi.org/10.1146/annurev-soc-081715-074254', 'Annual Review of Sociology', 6)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT15-014 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT15-014';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Loneliness and social isolation in new mothers', '2020', 'https://doi.org/10.1007/s00737-019-01009-5', 'Archives of Women''s Mental Health', 1),
      (v_art_id, 'peer_reviewed', 1, 'The relationship between loneliness and postpartum depression', '2019', 'https://doi.org/10.1016/j.jad.2018.11.061', 'Journal of Affective Disorders', 2),
      (v_art_id, 'peer_reviewed', 1, 'Social support and maternal mental health', '2018', 'https://doi.org/10.1001/jamapsychiatry.2018.0164', 'JAMA Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Loneliness in fathers during the perinatal period', '2021', 'https://doi.org/10.31083/j.jomh.2021.01.003', 'Journal of Men''s Health', 4),
      (v_art_id, 'peer_reviewed', 1, 'The impact of infant sleep problems on maternal loneliness', '2017', 'https://doi.org/10.1016/j.sleep.2016.11.016', 'Sleep Medicine', 5),
      (v_art_id, 'peer_reviewed', 1, 'Identity transition to motherhood and loneliness', '2019', 'https://doi.org/10.1007/s10995-018-2665-2', 'Maternal and Child Health Journal', 6)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT15-015 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT15-015';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Loneliness across the adult lifespan', '2018', 'https://doi.org/10.1037/pag0000262', 'Psychology and Aging', 1),
      (v_art_id, 'peer_reviewed', 1, 'Social network changes in midlife', '2019', 'https://doi.org/10.1037/dev0000678', 'Developmental Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Work demands and social relationships in middle adulthood', '2020', 'https://doi.org/10.1177/0265407519896624', 'Journal of Social and Personal Relationships', 3),
      (v_art_id, 'peer_reviewed', 1, 'The sandwich generation: Caregiving and loneliness', '2017', 'https://doi.org/10.1093/geront/gnw100', 'The Gerontologist', 4),
      (v_art_id, 'peer_reviewed', 1, 'Friendship patterns in middle age', '2018', 'https://doi.org/10.1007/s10804-017-9271-8', 'Journal of Adult Development', 5),
      (v_art_id, 'peer_reviewed', 1, 'Loneliness and health in middle age', '2019', 'https://doi.org/10.1093/aje/kwz046', 'American Journal of Epidemiology', 6)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT15-016 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT15-016';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Loneliness in older persons: A predictor of functional decline and death', '2012', 'https://doi.org/10.1001/archinternmed.2012.1993', 'Archives of Internal Medicine', 1),
      (v_art_id, 'peer_reviewed', 1, 'Social relationships and risk of dementia', '2020', 'https://doi.org/10.1016/S2468-2667(20)30147-7', 'The Lancet Public Health', 2),
      (v_art_id, 'peer_reviewed', 1, 'Loneliness and mortality in older adults', '2013', 'https://doi.org/10.1073/pnas.1219686110', 'Proceedings of the National Academy of Sciences', 3),
      (v_art_id, 'peer_reviewed', 1, 'Social isolation and loneliness among older adults during COVID-19', '2021', 'https://doi.org/10.1093/geronb/gbaa110', 'The Journals of Gerontology: Series B', 4),
      (v_art_id, 'peer_reviewed', 1, 'The relationship between loneliness and aging', '2022', 'https://doi.org/10.1038/s44159-022-00062-8', 'Nature Reviews Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Interventions to reduce loneliness in older adults', '2018', 'https://doi.org/10.1093/geront/gnx218', 'The Gerontologist', 6),
      (v_art_id, 'peer_reviewed', 1, 'Transportation barriers and social isolation in older adults', '2019', 'https://doi.org/10.1111/jgs.15853', 'Journal of the American Geriatrics Society', 7)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT15-017 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT15-017';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Retirement and loneliness: A systematic review', '2019', 'https://doi.org/10.1177/0898264318800163', 'Journal of Aging and Health', 1),
      (v_art_id, 'peer_reviewed', 1, 'Social networks and retirement adjustment', '2018', 'https://doi.org/10.1037/pag0000222', 'Psychology and Aging', 2),
      (v_art_id, 'peer_reviewed', 1, 'Retirement and mental health: A meta-analysis', '2020', 'https://doi.org/10.1093/geronb/gby118', 'The Journals of Gerontology: Series B', 3),
      (v_art_id, 'peer_reviewed', 1, 'Work identity and retirement satisfaction', '2017', 'https://doi.org/10.1016/j.jvb.2016.11.005', 'Journal of Vocational Behavior', 4),
      (v_art_id, 'peer_reviewed', 1, 'The role of volunteering in successful retirement', '2019', 'https://doi.org/10.1093/geront/gny166', 'The Gerontologist', 5),
      (v_art_id, 'peer_reviewed', 1, 'Retirement planning and psychological well-being', '2018', 'https://doi.org/10.1093/workar/wax027', 'Work, Aging and Retirement', 6)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT15-018 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT15-018';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Loneliness following bereavement: A systematic review', '2020', 'https://doi.org/10.1016/j.socscimed.2020.113087', 'Social Science & Medicine', 1),
      (v_art_id, 'peer_reviewed', 1, 'Grief and loneliness in widowhood', '2019', 'https://doi.org/10.1080/07481187.2018.1456008', 'Death Studies', 2),
      (v_art_id, 'peer_reviewed', 1, 'The relationship between grief and loneliness', '2018', 'https://doi.org/10.1080/15325024.2017.1384532', 'Journal of Loss and Trauma', 3),
      (v_art_id, 'peer_reviewed', 1, 'Social network changes after spousal bereavement', '2017', 'https://doi.org/10.1093/geronb/gbw117', 'The Journals of Gerontology: Series B', 4),
      (v_art_id, 'peer_reviewed', 1, 'Interventions for loneliness in bereaved individuals', '2019', 'https://doi.org/10.1002/14651858.CD013172', 'The Cochrane Database of Systematic Reviews', 5),
      (v_art_id, 'peer_reviewed', 1, 'Continuing bonds and loneliness after loss', '2020', 'https://doi.org/10.1177/0030222818814297', 'Omega: Journal of Death and Dying', 6)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT15-019 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT15-019';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Loneliness and social isolation in family caregivers', '2020', 'https://doi.org/10.1093/geront/gnz162', 'The Gerontologist', 1),
      (v_art_id, 'peer_reviewed', 1, 'The relationship between caregiver burden and loneliness', '2019', 'https://doi.org/10.1177/0733464817748779', 'Journal of Applied Gerontology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Social support and caregiver well-being', '2018', 'https://doi.org/10.1037/pag0000238', 'Psychology and Aging', 3),
      (v_art_id, 'peer_reviewed', 1, 'Caregiver isolation during the COVID-19 pandemic', '2021', 'https://doi.org/10.1093/geronb/gbab056', 'The Journals of Gerontology: Series B', 4),
      (v_art_id, 'peer_reviewed', 1, 'Interventions to reduce caregiver loneliness', '2019', 'https://doi.org/10.1080/13607863.2018.1515888', 'Aging & Mental Health', 5),
      (v_art_id, 'peer_reviewed', 1, 'Respite care and caregiver mental health', '2020', 'https://doi.org/10.1002/14651858.CD004396.pub4', 'The Cochrane Database of Systematic Reviews', 6)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT15-020 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT15-020';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Loneliness among sexual and gender minorities: A systematic review', '2020', 'https://doi.org/10.1080/00918369.2019.1702354', 'Journal of Homosexuality', 1),
      (v_art_id, 'peer_reviewed', 1, 'Minority stress and mental health in LGBTQ+ populations', '2018', 'https://doi.org/10.1146/annurev-clinpsy-032816-045159', 'Annual Review of Clinical Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Family rejection and LGBTQ+ youth loneliness', '2019', 'https://doi.org/10.1542/peds.2018-3283', 'Pediatrics', 3),
      (v_art_id, 'peer_reviewed', 1, 'Social support and well-being among transgender adults', '2020', 'https://doi.org/10.1037/cou0000385', 'Journal of Counseling Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'LGBTQ+ community connection and mental health', '2019', 'https://doi.org/10.1037/sgd0000323', 'Psychology of Sexual Orientation and Gender Diversity', 5),
      (v_art_id, 'peer_reviewed', 1, 'Loneliness among LGBTQ+ older adults', '2018', 'https://doi.org/10.1093/geront/gnx145', 'The Gerontologist', 6),
      (v_art_id, 'peer_reviewed', 1, 'Intersectionality and loneliness in LGBTQ+ people of color', '2021', 'https://doi.org/10.1037/cdp0000424', 'Cultural Diversity and Ethnic Minority Psychology', 7)
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
  WHERE a.article_production_id LIKE 'CAT15-%';

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;
