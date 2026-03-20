-- ============================================================================
-- Seed: Category 4 (Self-Worth, Confidence & Identity) — Subcategory 04
-- 10 articles: CAT04-031 through CAT04-040
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert Category if not present
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  'Self-Worth, Confidence & Identity',
  'self-esteem-identity',
  '',
  'Brain',
  4,
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'self-esteem-identity';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Body Image', 'body-image', v_cat_id, 4)
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'self-esteem-identity';
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'body-image' AND category_id = v_cat_id;

  -- CAT04-031: Body Image and Mental Health: How You See Yourself Matters
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Body Image and Mental Health: How You See Yourself Matters',
    'body-image-mental-health-how-you-see-yourself-matters',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Body Image', 'Self-Perception', 'Mental Health', 'Self-Esteem'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-031',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the powerful connection between body image and mental wellbeing, and why how you see your body affects how you feel overall.',
    '/images/articles/cat04/cover-031.svg',
    8,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT04-032: Body Dysmorphia vs. Normal Body Dissatisfaction: Where
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Body Dysmorphia vs. Normal Body Dissatisfaction: Where',
    'body-dysmorphia-vs-normal-dissatisfaction-where-is-the-line',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Body Dysmorphic Disorder', 'Body Image', 'Mental Health', 'Diagnosis'],
    1800,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-032',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the difference between common body image concerns and body dysmorphic disorder, and when dissatisfaction becomes clinically significant.',
    '/images/articles/cat04/cover-032.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT04-033: Social Media and Body Image: The Filter Effect on Self-Perception
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Social Media and Body Image: The Filter Effect on Self-Perception',
    'social-media-body-image-filter-effect-self-perception',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Social Media', 'Body Image', 'Self-Perception', 'Digital Wellbeing'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-033',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore how social media filters, photo editing, and curated content distort body image and what you can do to protect your mental health.',
    '/images/articles/cat04/cover-033.svg',
    6,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT04-034: Male Body Image Issues: The Overlooked Crisis
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Male Body Image Issues: The Overlooked Crisis',
    'male-body-image-issues-overlooked-crisis',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Male Body Image', 'Muscle Dysmorphia', 'Mens Health', 'Masculinity'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-034',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Men face significant body image pressures—muscle dysmorphia, height anxiety, hair loss. Learn why male body dissatisfaction is rising and under-discussed.',
    '/images/articles/cat04/cover-034.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT04-035: Body Neutrality: An Alternative to Body Positivity
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Body Neutrality: An Alternative to Body Positivity',
    'body-neutrality-alternative-to-body-positivity',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Body Neutrality', 'Body Positivity', 'Self-Acceptance', 'Body Image'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-035',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Body positivity demands you love your body. Body neutrality offers a middle path: acceptance without obsession. Learn this compassionate alternative.',
    '/images/articles/cat04/cover-035.svg',
    4,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT04-036: How Diet Culture Damages Mental Health
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How Diet Culture Damages Mental Health',
    'how-diet-culture-damages-mental-health',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Diet Culture', 'Mental Health', 'Eating Disorders', 'Body Image'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-036',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Diet culture isn',
    '/images/articles/cat04/cover-036.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT04-037: Exercise Addiction: When Movement Becomes a Body Image Weapon
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Exercise Addiction: When Movement Becomes a Body Image Weapon',
    'exercise-addiction-when-movement-becomes-body-image-weapon',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Exercise Addiction', 'Compulsive Exercise', 'Body Image', 'Eating Disorders'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-037',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Exercise can become compulsive when driven by body image anxiety. Learn the difference between healthy movement and exercise addiction.',
    '/images/articles/cat04/cover-037.svg',
    4,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT04-038: Body Image Across Cultures: Different Ideals, Same Psychological Impact
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Body Image Across Cultures: Different Ideals, Same Psychological Impact',
    'body-image-across-cultures-different-ideals-same-impact',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Cultural Psychology', 'Body Image', 'Global Health', 'Beauty Standards'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-038',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Beauty standards vary across cultures, but body dissatisfaction is universal. Explore how cultural ideals shape body image worldwide.',
    '/images/articles/cat04/cover-038.svg',
    4,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT04-039: Aging and Body Image: Navigating Physical Changes with Self-Compassion
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Aging and Body Image: Navigating Physical Changes with Self-Compassion',
    'aging-body-image-navigating-physical-changes-self-compassion',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Aging', 'Body Image', 'Self-Compassion', 'Ageism'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-039',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Aging bodies change. Learn how to maintain positive body image as you age, resisting ageist beauty standards and honoring your body',
    '/images/articles/cat04/cover-039.svg',
    4,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT04-040: Helping Children Develop Healthy Body Image
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Helping Children Develop Healthy Body Image',
    'helping-children-develop-healthy-body-image',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Parenting', 'Child Development', 'Body Image', 'Prevention'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-040',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Body image forms early. Learn how parents and caregivers can foster positive body image in children and protect them from harmful messages.',
    '/images/articles/cat04/cover-040.svg',
    5,
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

  -- === CAT04-031 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-031';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Body Image and Mental Health: A Review', '2020', 'https://doi.org/10.1186/s40337-020-00360-5', 'Journal of Eating Disorders', 1),
      (v_art_id, 'peer_reviewed', 1, 'Body dissatisfaction, depression, and anxiety in adolescents and young adults', '2020', 'https://doi.org/10.1016/j.cpr.2020.101838', 'Clinical Psychology Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'The relationship between body image and psychological well-being', '2021', 'https://doi.org/10.1016/j.bodyim.2021.03.009', NULL, 3),
      (v_art_id, 'professional_org', 3, 'Body Image and Self-Esteem', '2023', 'https://www.nationaleatingdisorders.org/body-image', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Negative body image and mental health outcomes: A meta-analysis', '2020', 'https://doi.org/10.1037/bul0000251', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Body appreciation and psychological health', '2019', 'https://doi.org/10.1016/j.bodyim.2019.08.012', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'The tripartite influence model of body image and eating disturbance', '2021', 'https://doi.org/10.1002/eat.23498', 'International Journal of Eating Disorders', 7),
      (v_art_id, 'peer_reviewed', 1, 'Body image disturbance and its impact on quality of life', '2020', 'https://doi.org/10.1177/1359105318820104', 'Journal of Health Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT04-032 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-032';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'clinical_guideline', 4, 'Body Dysmorphic Disorder', '2022', 'https://doi.org/10.1176/appi.books.9780890425787', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Prevalence and clinical features of body dysmorphic disorder', '2021', 'https://doi.org/10.1016/j.jpsychires.2021.01.015', 'Journal of Psychiatric Research', 2),
      (v_art_id, 'peer_reviewed', 1, 'Body dysmorphic disorder vs. normal appearance concerns', '2020', 'https://doi.org/10.1016/j.bodyim.2020.09.012', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive-behavioral model of body dysmorphic disorder', '2020', 'https://doi.org/10.1016/j.cpr.2020.101831', 'Clinical Psychology Review', 4),
      (v_art_id, 'peer_reviewed', 1, 'Body Dysmorphic Disorder: Recognition and Treatment', '2020', 'https://doi.org/10.1176/appi.ajp.2020.19111153', 'American Journal of Psychiatry', 5),
      (v_art_id, 'peer_reviewed', 1, 'Muscle dysmorphia: A variant of body dysmorphic disorder', '2021', 'https://doi.org/10.1002/eat.23450', 'International Journal of Eating Disorders', 6),
      (v_art_id, 'peer_reviewed', 1, 'Suicide risk in body dysmorphic disorder', '2020', 'https://doi.org/10.4088/JCP.19r13297', 'Journal of Clinical Psychiatry', 7),
      (v_art_id, 'peer_reviewed', 1, 'Evidence-based treatment for body dysmorphic disorder', '2021', 'https://doi.org/10.1016/j.brat.2021.103891', NULL, 8),
      (v_art_id, 'peer_reviewed', 1, 'Body dysmorphic disorder by proxy', '2019', 'https://doi.org/10.1176/appi.ajp.2019.18121400', 'American Journal of Psychiatry', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT04-033 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-033';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Social media use and body image concerns', '2021', 'https://doi.org/10.1016/j.bodyim.2021.02.006', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Filtered reality: The impact of Instagram filters on body dissatisfaction', '2022', 'https://doi.org/10.1016/j.chb.2022.107235', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Social comparison and body image on social media', '2020', 'https://doi.org/10.1037/ppm0000264', 'Psychology of Popular Media', 3),
      (v_art_id, 'peer_reviewed', 1, 'Digital media literacy and body image', '2021', 'https://doi.org/10.1080/15213269.2021.1929670', 'Media Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'The Selfie Dysmorphia phenomenon', '2018', 'https://doi.org/10.1001/jamafacial.2018.0486', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Social media detox and mental health outcomes', '2020', 'https://doi.org/10.1089/cyber.2019.0578', 'Cyberpsychology, Behavior, and Social Networking', 6)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT04-034 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-034';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Body dissatisfaction in men: A review', '2020', 'https://doi.org/10.1016/j.bodyim.2020.06.002', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Muscle dysmorphia in men', '2021', 'https://doi.org/10.1002/eat.23450', 'International Journal of Eating Disorders', 2),
      (v_art_id, 'peer_reviewed', 1, 'The muscular ideal and psychological health', '2020', 'https://doi.org/10.1037/men0000252', 'Psychology of Men & Masculinities', 3),
      (v_art_id, 'peer_reviewed', 1, 'Male body image and mental health outcomes', '2021', 'https://doi.org/10.1177/1359105320913913', 'Journal of Health Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Social media and male body dissatisfaction', '2020', 'https://doi.org/10.1177/1461444820912514', NULL, 5)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT04-035 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-035';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Body neutrality vs. body positivity', '2021', 'https://doi.org/10.1016/j.bodyim.2021.08.011', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Body functionality and mental health', '2020', 'https://doi.org/10.1177/0361684320937605', 'Psychology of Women Quarterly', 2),
      (v_art_id, 'peer_reviewed', 1, 'Body appreciation and psychological wellbeing', '2019', 'https://doi.org/10.1016/j.bodyim.2019.08.012', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Limitations of body positivity movement', '2020', 'https://doi.org/10.1080/14680777.2020.1837908', NULL, 4)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT04-036 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-036';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Diet culture and mental health outcomes', '2021', 'https://doi.org/10.1016/j.eatbeh.2021.101498', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Weight stigma and psychological distress', '2020', 'https://doi.org/10.1111/obr.12976', 'Obesity Reviews', 2),
      (v_art_id, 'peer_reviewed', 1, 'Dieting and eating disorder risk', '2020', 'https://doi.org/10.1002/eat.23238', 'International Journal of Eating Disorders', 3),
      (v_art_id, 'peer_reviewed', 1, 'Health At Every Size vs. weight-centric approaches', '2021', 'https://doi.org/10.1097/NT.0000000000000454', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Diet culture and self-worth', '2020', 'https://doi.org/10.1016/j.bodyim.2020.08.003', NULL, 5)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT04-037 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-037';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Compulsive exercise and eating disorders', '2020', 'https://doi.org/10.1002/eat.23227', 'International Journal of Eating Disorders', 1),
      (v_art_id, 'peer_reviewed', 1, 'Exercise addiction: Symptoms and prevalence', '2021', 'https://doi.org/10.1007/s40279-021-01451-4', 'Sports Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'Distinguishing healthy from compulsive exercise', '2020', 'https://doi.org/10.1016/j.bodyim.2020.05.006', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Exercise dependence and mental health', '2021', 'https://doi.org/10.1556/2006.2021.00013', 'Journal of Behavioral Addictions', 4)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT04-038 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-038';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Cultural variations in body ideals', '2020', 'https://doi.org/10.1037/cdp0000360', 'Cultural Diversity and Ethnic Minority Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Globalization and body dissatisfaction', '2021', 'https://doi.org/10.1016/j.bodyim.2021.01.008', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Cross-cultural body image research', '2020', 'https://doi.org/10.1002/eat.23271', 'International Journal of Eating Disorders', 3),
      (v_art_id, 'peer_reviewed', 1, 'Western media influence on global body ideals', '2020', 'https://doi.org/10.1007/s11199-020-01141-2', NULL, 4)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT04-039 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-039';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Body image across the lifespan', '2020', 'https://doi.org/10.1016/j.bodyim.2020.02.012', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Ageism and body dissatisfaction in older adults', '2021', 'https://doi.org/10.1037/pag0000595', 'Psychology and Aging', 2),
      (v_art_id, 'peer_reviewed', 1, 'Body appreciation in midlife and beyond', '2020', 'https://doi.org/10.1080/08952841.2019.1681244', 'Journal of Women & Aging', 3),
      (v_art_id, 'peer_reviewed', 1, 'Anti-aging industry and mental health', '2020', 'https://doi.org/10.1080/14680777.2019.1667062', NULL, 4)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT04-040 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-040';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Development of body image in children', '2020', 'https://doi.org/10.1037/dev0000927', 'Developmental Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Parental influence on child body image', '2021', 'https://doi.org/10.1016/j.bodyim.2021.03.002', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Preventing eating disorders through family intervention', '2020', 'https://doi.org/10.1002/eat.23290', 'International Journal of Eating Disorders', 3),
      (v_art_id, 'peer_reviewed', 1, 'Media literacy interventions for children', '2021', 'https://doi.org/10.1007/s10964-021-01421-3', 'Journal of Youth and Adolescence', 4),
      (v_art_id, 'peer_reviewed', 1, 'Body Talk and child development', '2020', 'https://doi.org/10.1016/j.eatbeh.2020.101371', NULL, 5)
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
  WHERE a.article_production_id LIKE 'CAT04-%';

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;
