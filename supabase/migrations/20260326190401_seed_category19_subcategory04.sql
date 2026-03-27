-- ============================================================================
-- Seed: Category 19 (Men's Mental Health) — Subcategory 04
-- 10 articles: CAT19-035 through CAT19-044
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert Category if not present
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  'Men''s Mental Health',
  'mens-mental-health',
  'Evidence-based education on men''s mental health — exploring the gender paradox in suicide, masked depression, help-seeking barriers, and the impact of cultural norms on men''s psychological wellbeing.',
  'Shield',
  19,
  55,
  '#2563EB'
)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------------------
-- 2. Insert Subcategory
-- ---------------------------------------------------------------------------

DO $$
DECLARE
  v_cat_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'mens-mental-health';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Men in Specific Contexts', 'men-in-specific-contexts', v_cat_id, 4)
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'mens-mental-health';
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'men-in-specific-contexts' AND category_id = v_cat_id;

  -- CAT19-035: Men of Color and Mental Health: Intersecting Stigmas
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Men of Color and Mental Health: Intersecting Stigmas',
    'men-of-color-and-mental-health-intersecting-stigmas',
    'draft',
    'Men''s Mental Health',
    ARRAY['Racial Mental Health', 'Intersectionality', 'Health Disparities', 'Men''s Mental Health'],
    1108,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-035',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Men of color face compounded mental health challenges at the intersection of racial discrimination and masculine norms. This article examines the research on structural barriers, cultural factors, and evidence-based pathways to equitable mental health care.',
    '/images/articles/cat19/cover-035.svg',
    10,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT19-036: Rural Men and Mental Health: Geographic Isolation and Limited Access
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Rural Men and Mental Health: Geographic Isolation and Limited Access',
    'rural-men-and-mental-health-geographic-isolation-and-limited-access',
    'draft',
    'Men''s Mental Health',
    ARRAY['Rural Health', 'Geographic Isolation', 'Access to Care', 'Men''s Mental Health'],
    1040,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-036',
    v_cat_id,
    v_sub_id,
    'drafted',
    'An evidence-based guide to the mental health challenges facing men in rural communities — examining how geographic isolation, cultural norms, and limited services create a perfect storm of unmet need.',
    '/images/articles/cat19/cover-036.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT19-037: Young Men and Social Media: Comparison, Radicalization, and Identity
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Young Men and Social Media: Comparison, Radicalization, and Identity',
    'young-men-and-social-media-comparison-radicalization-and-identity',
    'draft',
    'Men''s Mental Health',
    ARRAY['Social Media', 'Young Men', 'Radicalization', 'Men''s Mental Health'],
    1040,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-037',
    v_cat_id,
    v_sub_id,
    'drafted',
    'An evidence-based guide to the psychological impact of social media on young men — from body image distortion and status anxiety to algorithmic radicalization and identity formation in digital spaces.',
    '/images/articles/cat19/cover-037.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT19-038: Men in the Military: Service, Sacrifice, and Psychological Impact
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Men in the Military: Service, Sacrifice, and Psychological Impact',
    'men-in-the-military-service-sacrifice-and-psychological-impact',
    'draft',
    'Men''s Mental Health',
    ARRAY['Military', 'PTSD', 'Veteran Mental Health', 'Men''s Mental Health'],
    1065,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-038',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A condition deep dive into the psychological impact of military service on men — examining PTSD, moral injury, the transition to civilian life, and the unique barriers military culture creates for mental health treatment.',
    '/images/articles/cat19/cover-038.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT19-039: Blue-Collar Men''s Mental Health: Physical Demands and Emotional Silence
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Blue-Collar Men''s Mental Health: Physical Demands and Emotional Silence',
    'blue-collar-mens-mental-health-physical-demands-and-emotional-silence',
    'draft',
    'Men''s Mental Health',
    ARRAY['Blue-Collar Work', 'Workplace Mental Health', 'Occupational Stress', 'Men''s Mental Health'],
    1095,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-039',
    v_cat_id,
    v_sub_id,
    'drafted',
    'An evidence-based guide to the mental health challenges facing men in trades and manual labor — examining how workplace culture, physical strain, job insecurity, and stoic norms create a uniquely difficult environment for psychological wellbeing.',
    '/images/articles/cat19/cover-039.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT19-040: Unemployed Men and Self-Worth: When Providing Defines Identity
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Unemployed Men and Self-Worth: When Providing Defines Identity',
    'unemployed-men-and-self-worth-when-providing-defines-identity',
    'draft',
    'Men''s Mental Health',
    ARRAY['Unemployment', 'Self-Worth', 'Provider Identity', 'Men''s Mental Health'],
    1089,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-040',
    v_cat_id,
    v_sub_id,
    'drafted',
    'An evidence-based guide to the psychological impact of unemployment on men — examining how provider identity, shame, social withdrawal, and the loss of daily structure create a mental health crisis that extends far beyond financial hardship.',
    '/images/articles/cat19/cover-040.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT19-041: Myth: Real Men Don''t Need Therapy
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Myth: Real Men Don''t Need Therapy',
    'myth-real-men-dont-need-therapy',
    'draft',
    'Men''s Mental Health',
    ARRAY['Therapy', 'Help-Seeking', 'Masculinity Norms', 'Treatment Barriers'],
    1057,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-041',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The belief that therapy is a sign of weakness keeps millions of men from accessing effective treatment. Research shows therapy works equally well for men, and male-friendly approaches are closing the treatment gap.',
    '/images/articles/cat19/cover-041.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT19-042: Myth: Men Don''t Get Eating Disorders
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Myth: Men Don''t Get Eating Disorders',
    'myth-men-dont-get-eating-disorders',
    'draft',
    'Men''s Mental Health',
    ARRAY['Eating Disorders', 'Muscle Dysmorphia', 'Body Image', 'Underdiagnosis'],
    1069,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-042',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Eating disorders in men are underdiagnosed, undertreated, and misunderstood. Research shows men account for up to one-third of eating disorder cases, with unique presentations like muscle dysmorphia often going unrecognized.',
    '/images/articles/cat19/cover-042.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT19-043: Myth: Men Are Naturally Better at Handling Stress
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Myth: Men Are Naturally Better at Handling Stress',
    'myth-men-are-naturally-better-at-handling-stress',
    'draft',
    'Men''s Mental Health',
    ARRAY['Stress Response', 'Cortisol', 'Cardiovascular Health', 'Coping Strategies'],
    1051,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-043',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The "strong silent type" is not handling stress better -- he is handling it differently, and often at severe cost. Research shows men externalize stress in ways that damage health, relationships, and lifespan.',
    '/images/articles/cat19/cover-043.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT19-044: Myth: Depression in Men Is Just Laziness or Lack of Motivation
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Myth: Depression in Men Is Just Laziness or Lack of Motivation',
    'myth-depression-in-men-is-just-laziness-or-lack-of-motivation',
    'draft',
    'Men''s Mental Health',
    ARRAY['Depression', 'Male-Pattern Depression', 'Irritability', 'Neuroscience'],
    1064,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-044',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Male-pattern depression often presents as irritability, aggression, and risk-taking rather than sadness -- leading millions of men to be dismissed as lazy, angry, or difficult when they are actually clinically depressed.',
    '/images/articles/cat19/cover-044.svg',
    10,
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

  -- === CAT19-035 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-035';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'government', 2, 'Mental health disparities: Diverse populations', '2021', 'https://www.samhsa.gov/data/report/2021-nsduh-detailed-tables', 'Substance Abuse and Mental Health Services Administration', 1),
      (v_art_id, 'peer_reviewed', 1, 'Racial discrimination and mental health: A meta-analytic review', '2023', 'https://doi.org/10.1037/bul0000396', 'Psychological Bulletin', 2),
      (v_art_id, 'government', 2, 'Suicide among American Indians/Alaska Natives — national statistics and prevention', '2022', 'https://www.cdc.gov/suicide/facts/disparities-in-suicide.html', 'Centers for Disease Control and Prevention', 3),
      (v_art_id, 'peer_reviewed', 1, 'Cultural adaptations of mental health interventions: A meta-analytic review', '2022', 'https://doi.org/10.1016/j.cpr.2022.102194', 'Clinical Psychology Review', 4),
      (v_art_id, 'professional_org', 3, 'Demographics of the U.S. psychology workforce', '2022', 'https://www.apa.org/workforce/data-tools/demographics', 'American Psychological Association', 5),
      (v_art_id, 'peer_reviewed', 1, 'Intersectionality of race and masculinity: Implications for mental health', '2023', 'https://doi.org/10.1037/men0000415', 'Psychology of Men & Masculinities', 6),
      (v_art_id, 'peer_reviewed', 1, 'Weathering and allostatic load as a mechanism linking racism to health disparities', '2020', 'https://doi.org/10.2105/AJPH.2019.305544', 'American Journal of Public Health', 7),
      (v_art_id, 'peer_reviewed', 1, 'Medical mistrust among communities of color: Historical and contemporary factors', '2021', 'https://doi.org/10.1353/hpu.2021.0074', 'Journal of Health Care for the Poor and Underserved', 8),
      (v_art_id, 'peer_reviewed', 1, 'The mental health of Asian American men: A systematic review', '2022', 'https://doi.org/10.1037/aap0000285', 'Asian American Journal of Psychology', 9),
      (v_art_id, 'government', 2, 'Culturally responsive mental health care: A practical guide', '2023', 'https://www.nimh.nih.gov/health/topics/espanol/resources-in-diverse-communities', 'National Institute of Mental Health', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT19-036 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-036';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Rural-urban disparities in suicide rates: A population-based study', '2021', 'https://doi.org/10.1016/j.amepre.2021.01.037', 'American Journal of Preventive Medicine', 1),
      (v_art_id, 'government', 2, 'Mental health professional shortage areas in rural America', '2022', 'https://data.hrsa.gov/topics/health-workforce/shortage-areas', 'Health Resources and Services Administration', 2),
      (v_art_id, 'peer_reviewed', 1, 'Geographic barriers to mental health care: A systematic review', '2020', 'https://doi.org/10.1111/jrh.12432', 'Journal of Rural Health', 3),
      (v_art_id, 'peer_reviewed', 1, 'Suicide among agricultural workers: A systematic review and meta-analysis', '2021', 'https://doi.org/10.1016/j.annepidem.2021.04.003', 'Annals of Epidemiology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Telehealth expansion in rural mental health: Outcomes and access improvements', '2022', 'https://doi.org/10.1176/appi.ps.202100456', 'Psychiatric Services', 5),
      (v_art_id, 'peer_reviewed', 1, 'Masculinity norms and help-seeking in rural men: A qualitative study', '2021', 'https://doi.org/10.1037/men0000345', 'Psychology of Men & Masculinities', 6),
      (v_art_id, 'government', 2, 'Rural mental health: Challenges and opportunities', '2023', 'https://www.nimh.nih.gov/health/topics/rural-mental-health', 'National Institute of Mental Health', 7),
      (v_art_id, 'peer_reviewed', 1, 'Firearm access and suicide in rural areas', '2022', 'https://doi.org/10.1001/jamanetworkopen.2022.3245', 'JAMA Network Open', 8),
      (v_art_id, 'peer_reviewed', 1, 'Social isolation in rural communities: Risk factors and interventions', '2021', 'https://doi.org/10.1016/j.socscimed.2021.114145', 'Social Science & Medicine', 9),
      (v_art_id, 'peer_reviewed', 1, 'Community-based mental health interventions in rural settings', '2022', 'https://doi.org/10.1007/s10597-022-00958-4', 'Community Mental Health Journal', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT19-037 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-037';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Social media use and mental health in young men: A longitudinal cohort study', '2022', 'https://doi.org/10.1001/jamapsychiatry.2022.0464', 'JAMA Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Algorithmic amplification of misogynistic and extreme content: A platform audit', '2023', 'https://doi.org/10.1145/3579522', 'Proceedings of the ACM on Human-Computer Interaction', 2),
      (v_art_id, 'peer_reviewed', 1, 'Social media and male body image: A systematic review', '2022', 'https://doi.org/10.1016/j.bodyim.2022.01.014', 'Body Image', 3),
      (v_art_id, 'peer_reviewed', 1, 'Online radicalization and the manosphere: Psychological profiles and pathways', '2023', 'https://doi.org/10.1002/ab.22078', 'Aggressive Behavior', 4),
      (v_art_id, 'peer_reviewed', 1, 'Online versus offline socialization and loneliness in young adults', '2021', 'https://doi.org/10.1177/02654075211020138', 'Journal of Social and Personal Relationships', 5),
      (v_art_id, 'peer_reviewed', 1, 'Social comparison on social media: Mechanisms and moderators in men', '2022', 'https://doi.org/10.1016/j.chb.2022.107289', 'Computers in Human Behavior', 6),
      (v_art_id, 'peer_reviewed', 1, 'Adolescent boys and digital media: Impacts on identity development', '2021', 'https://doi.org/10.1037/dev0001182', 'Developmental Psychology', 7),
      (v_art_id, 'government', 2, 'Social media and youth mental health', '2023', 'https://www.hhs.gov/sites/default/files/sg-youth-mental-health-social-media-advisory.pdf', 'U.S. Surgeon General Advisory', 8),
      (v_art_id, 'peer_reviewed', 1, 'Parasocial relationships and male social development', '2022', 'https://doi.org/10.1080/15213269.2022.2078695', 'Media Psychology', 9),
      (v_art_id, 'professional_org', 3, 'Digital wellness strategies for young adults', '2023', 'https://www.apa.org/topics/social-media-internet/social-media-health-advisory', 'American Psychological Association', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT19-038 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-038';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Mental health prevalence among military veterans: A meta-analysis of epidemiological studies', '2021', 'https://doi.org/10.1001/jamapsychiatry.2021.0578', 'JAMA Psychiatry', 1),
      (v_art_id, 'government', 2, 'National veteran suicide prevention annual report', '2023', 'https://www.mentalhealth.va.gov/docs/data-sheets/2023/2023-National-Veteran-Suicide-Prevention-Annual-Report-FINAL.pdf', 'U.S. Department of Veterans Affairs', 2),
      (v_art_id, 'peer_reviewed', 1, 'Moral injury in combat veterans: A systematic review and meta-analysis', '2022', 'https://doi.org/10.1016/j.cpr.2022.102156', 'Clinical Psychology Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'Barriers to mental health treatment among military veterans: A comprehensive review', '2021', 'https://doi.org/10.1037/ser0000498', 'Psychological Services', 4),
      (v_art_id, 'peer_reviewed', 1, 'Peer support for veterans: Effectiveness and implementation outcomes', '2022', 'https://doi.org/10.1002/jts.22834', 'Journal of Traumatic Stress', 5),
      (v_art_id, 'peer_reviewed', 1, 'Military-to-civilian transition: Identity loss and psychological adjustment', '2021', 'https://doi.org/10.1080/08995605.2021.1962178', 'Military Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Prolonged exposure and cognitive processing therapy for military PTSD: A comparative effectiveness study', '2022', 'https://doi.org/10.1037/ccp0000724', 'Journal of Consulting and Clinical Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Traumatic brain injury and mental health comorbidity in veterans', '2021', 'https://doi.org/10.1001/jamaneurol.2021.1024', 'JAMA Neurology', 8),
      (v_art_id, 'peer_reviewed', 1, 'Military masculinity and help-seeking barriers', '2022', 'https://doi.org/10.1037/men0000384', 'Psychology of Men & Masculinities', 9),
      (v_art_id, 'government', 2, 'Veterans mental health resources and treatment options', '2023', 'https://www.mentalhealth.va.gov/', 'U.S. Department of Veterans Affairs', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT19-039 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-039';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'government', 2, 'Suicide rates by industry and occupation: A population-based study', '2020', 'https://doi.org/10.15585/mmwr.mm6903a1', 'MMWR Morbidity and Mortality Weekly Report', 1),
      (v_art_id, 'peer_reviewed', 1, 'Substance use and occupational class: A systematic review', '2021', 'https://doi.org/10.1016/j.drugalcdep.2021.108786', 'Drug and Alcohol Dependence', 2),
      (v_art_id, 'peer_reviewed', 1, 'Chronic pain prevalence in construction workers and mental health associations', '2022', 'https://doi.org/10.1136/oemed-2022-108421', 'Occupational and Environmental Medicine', 3),
      (v_art_id, 'peer_reviewed', 1, 'Workplace mental health programs: Availability by industry sector', '2021', 'https://doi.org/10.1037/ocp0000289', 'Journal of Occupational Health Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'MATES in Construction: Effectiveness of a workplace suicide prevention program', '2022', 'https://doi.org/10.1186/s13033-022-00534-7', 'International Journal of Mental Health Systems', 5),
      (v_art_id, 'peer_reviewed', 1, 'Masculinity, work, and mental health in blue-collar men', '2021', 'https://doi.org/10.1111/1467-9566.13348', 'Sociology of Health & Illness', 6),
      (v_art_id, 'peer_reviewed', 1, 'Job insecurity and mental health: A meta-analysis of longitudinal studies', '2020', 'https://doi.org/10.1037/ocp0000263', 'Journal of Occupational Health Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Sleep disruption in physically demanding occupations', '2022', 'https://doi.org/10.1016/j.smrv.2022.101638', 'Sleep Medicine Reviews', 8),
      (v_art_id, 'peer_reviewed', 1, 'Presenteeism in manual labor: Working through physical and mental health problems', '2021', 'https://doi.org/10.5271/sjweh.3968', 'Scandinavian Journal of Work, Environment & Health', 9),
      (v_art_id, 'government', 2, 'Supporting blue-collar worker mental health', '2023', 'https://www.cdc.gov/niosh/topics/stress/', 'Centers for Disease Control and Prevention', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT19-040 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-040';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Unemployment and mental health: A meta-analysis of longitudinal studies', '2021', 'https://doi.org/10.1016/j.jvb.2021.103587', 'Journal of Vocational Behavior', 1),
      (v_art_id, 'peer_reviewed', 1, 'Provider role identity and psychological distress in unemployed men', '2022', 'https://doi.org/10.1037/men0000398', 'Psychology of Men & Masculinities', 2),
      (v_art_id, 'peer_reviewed', 1, 'Social withdrawal during unemployment: Predictors and consequences', '2021', 'https://doi.org/10.1037/apl0000896', 'Journal of Applied Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Unemployment and suicide: A systematic review and meta-analysis', '2020', 'https://doi.org/10.1016/S2215-0366(20)30072-X', 'The Lancet Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Daily routines and wellbeing during unemployment: A diary study', '2022', 'https://doi.org/10.1037/ocp0000316', 'Journal of Occupational Health Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Latent deprivation theory: Time structure, social contact, and purpose during unemployment', '2021', 'https://doi.org/10.1177/0950017021994269', 'Work, Employment and Society', 6),
      (v_art_id, 'peer_reviewed', 1, 'Shame and unemployment: A qualitative study of men''s experiences', '2022', 'https://doi.org/10.1177/10497323221076123', 'Qualitative Health Research', 7),
      (v_art_id, 'peer_reviewed', 1, 'Age, gender, and the experience of involuntary job loss', '2021', 'https://doi.org/10.1093/geronb/gbab095', 'Journal of Gerontology: Social Sciences', 8),
      (v_art_id, 'peer_reviewed', 1, 'Financial strain and relationship quality during male unemployment', '2022', 'https://doi.org/10.1111/fare.12712', 'Family Relations', 9),
      (v_art_id, 'professional_org', 3, 'Coping with job loss: Strategies and mental health resources', '2023', 'https://www.apa.org/topics/healthy-workplaces/job-loss', 'American Psychological Association', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT19-041 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-041';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Gender differences in mental health service utilization: A nationwide population-based study', '2021', 'https://doi.org/10.1007/s00127-020-01975-y', 'Social Psychiatry and Psychiatric Epidemiology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Men in therapy: Characteristics and outcomes across treatment settings', '2020', 'https://doi.org/10.1037/pst0000310', 'Psychotherapy', 2),
      (v_art_id, 'peer_reviewed', 1, 'Masculine norms and mental health: Are there pathways to help-seeking?', '2020', 'https://doi.org/10.1177/1557988320957357', 'American Journal of Men''s Health', 3),
      (v_art_id, 'peer_reviewed', 1, 'Gender differences in psychotherapy outcomes: A meta-analytic review', '2019', 'https://doi.org/10.1016/j.cpr.2019.101778', 'Clinical Psychology Review', 4),
      (v_art_id, 'peer_reviewed', 1, 'Male-sensitive psychotherapy: Engaging men in treatment through tailored approaches', '2022', 'https://doi.org/10.1037/men0000385', 'Psychology of Men & Masculinities', 5),
      (v_art_id, 'government', 2, 'Men and mental health', '2023', 'https://www.nimh.nih.gov/health/topics/men-and-mental-health', 'National Institute of Mental Health', 6),
      (v_art_id, 'peer_reviewed', 1, 'Barriers to mental health treatment: Evidence from the National Comorbidity Survey Replication', '2018', 'https://doi.org/10.1017/S0033291718000132', 'Psychological Medicine', 7),
      (v_art_id, 'professional_org', 3, 'Global action on men''s health', '2023', 'https://movember.com/mens-health/mental-health', 'Movember Foundation', 8),
      (v_art_id, 'clinical_guideline', 4, 'APA guidelines for psychological practice with boys and men', '2018', 'https://www.apa.org/about/policy/boys-men-practice-guidelines.pdf', 'American Psychological Association', 9),
      (v_art_id, 'peer_reviewed', 1, 'Adventure therapy and outdoor-based approaches for men', '2021', 'https://doi.org/10.1002/jcad.12382', 'Journal of Counseling & Development', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT19-042 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-042';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Eating disorders in males: An updated review', '2021', 'https://doi.org/10.1007/s11920-021-01274-2', 'Current Psychiatry Reports', 1),
      (v_art_id, 'professional_org', 3, 'Eating disorders statistics', '2023', 'https://www.nationaleatingdisorders.org/statistics', 'National Eating Disorders Association', 2),
      (v_art_id, 'peer_reviewed', 1, 'Gender differences in the presentation and treatment of eating disorders', '2020', 'https://doi.org/10.1186/s40337-020-00316-5', 'Journal of Eating Disorders', 3),
      (v_art_id, 'peer_reviewed', 1, 'Muscle dysmorphia: Current insights and future directions', '2022', 'https://doi.org/10.1016/j.bodyim.2022.01.005', 'Body Image', 4),
      (v_art_id, 'peer_reviewed', 1, 'Eating disorders in males: A systematic review of inclusion in research', '2019', 'https://doi.org/10.1002/eat.23110', 'International Journal of Eating Disorders', 5),
      (v_art_id, 'peer_reviewed', 1, 'Orthorexia nervosa: An emerging obsession with healthy eating', '2020', 'https://doi.org/10.1007/s40519-019-00797-1', 'Eating and Weight Disorders', 6),
      (v_art_id, 'peer_reviewed', 1, 'Binge eating disorder in men: A review of presentation, diagnosis, and treatment', '2021', 'https://doi.org/10.1017/S0033291720004389', 'Psychological Medicine', 7),
      (v_art_id, 'government', 2, 'Eating disorders in boys and men', '2022', 'https://www.nimh.nih.gov/health/statistics/eating-disorders', 'National Institute of Mental Health', 8),
      (v_art_id, 'peer_reviewed', 1, 'Diagnostic bias in eating disorders: Do clinicians under-detect in males?', '2020', 'https://doi.org/10.1002/erv.2735', 'European Eating Disorders Review', 9),
      (v_art_id, 'peer_reviewed', 1, 'Media influences on male body image and eating pathology', '2019', 'https://doi.org/10.1016/j.cpr.2019.101756', 'Clinical Psychology Review', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT19-043 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-043';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Gender differences in stress and coping: A meta-analytic review', '2020', 'https://doi.org/10.1177/1088868320911057', 'Personality and Social Psychology Review', 1),
      (v_art_id, 'peer_reviewed', 1, 'Substance use as a coping mechanism: Gender differences and clinical implications', '2021', 'https://doi.org/10.1016/j.jsat.2021.108406', 'Journal of Substance Abuse Treatment', 2),
      (v_art_id, 'peer_reviewed', 1, 'Emotional suppression and cardiovascular risk: A prospective cohort study', '2020', 'https://doi.org/10.1097/PSY.0000000000000845', 'Psychosomatic Medicine', 3),
      (v_art_id, 'peer_reviewed', 1, 'Biobehavioral responses to stress in females: Tend-and-befriend, not fight-or-flight', '2000', 'https://doi.org/10.1037/0033-295X.107.3.411', 'Psychological Review', 4),
      (v_art_id, 'peer_reviewed', 1, 'Cortisol reactivity and emotional regulation in men: The role of suppression', '2021', 'https://doi.org/10.1037/hea0001115', 'Health Psychology', 5),
      (v_art_id, 'professional_org', 3, 'Men and stress', '2023', 'https://www.apa.org/topics/stress/men', 'American Psychological Association', 6),
      (v_art_id, 'peer_reviewed', 1, 'Stress and health disparities: Contexts, mechanisms, and interventions among racial/ethnic minority and low socioeconomic status populations', '2019', 'https://doi.org/10.2105/AJPH.2019.305087', 'American Journal of Public Health', 7),
      (v_art_id, 'government', 2, 'The role of masculine norms in men''s health and wellbeing', '2020', 'https://www.who.int/publications/i/item/9789240016873', 'World Health Organization', 8),
      (v_art_id, 'peer_reviewed', 1, 'Alexithymia and cardiovascular disease: A systematic review', '2020', 'https://doi.org/10.1016/j.jpsychores.2020.110168', 'Journal of Psychosomatic Research', 9),
      (v_art_id, 'peer_reviewed', 1, 'Gender, coping, and health: A meta-analytic review', '2018', 'https://doi.org/10.1007/s12529-017-9703-3', 'International Journal of Behavioral Medicine', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT19-044 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-044';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Male depression: Externalizing symptoms, gender role conflict, and help-seeking', '2021', 'https://doi.org/10.1037/men0000347', 'Psychology of Men & Masculinities', 1),
      (v_art_id, 'peer_reviewed', 1, 'Is male depression underdiagnosed? Implications of broadened criteria for diagnosis', '2020', 'https://doi.org/10.1016/j.jad.2020.01.065', 'Journal of Affective Disorders', 2),
      (v_art_id, 'peer_reviewed', 1, 'Neurobiological mechanisms of anhedonia and motivation deficit in depression', '2022', 'https://doi.org/10.1038/s41583-022-00607-1', 'Nature Reviews Neuroscience', 3),
      (v_art_id, 'peer_reviewed', 1, 'Development and validation of the Male Depression Risk Scale', '2019', 'https://doi.org/10.1002/jclp.22753', 'Journal of Clinical Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Depression and suicide risk in men: A systematic review', '2021', 'https://doi.org/10.1016/j.jpsychires.2021.03.027', 'Journal of Psychiatric Research', 5),
      (v_art_id, 'government', 2, 'Men and depression', '2023', 'https://www.nimh.nih.gov/health/publications/men-and-depression', 'National Institute of Mental Health', 6),
      (v_art_id, 'peer_reviewed', 1, 'Dopamine and motivation: The neurobiological basis of amotivation in depression', '2021', 'https://doi.org/10.1038/s41380-021-01139-x', 'Molecular Psychiatry', 7),
      (v_art_id, 'peer_reviewed', 1, 'Anger attacks in depressed men: Prevalence and clinical correlates', '2020', 'https://doi.org/10.4088/JCP.19m13032', 'Journal of Clinical Psychiatry', 8),
      (v_art_id, 'peer_reviewed', 1, 'Gender differences in depression: Biological, affective, cognitive, and sociocultural factors', '2020', 'https://doi.org/10.1002/wps.20807', 'World Psychiatry', 9),
      (v_art_id, 'professional_org', 3, 'Depression in men: Communicating beyond stereotypes', '2022', 'https://movember.com/mens-health/depression', 'Movember Foundation', 10)
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
  WHERE a.article_production_id LIKE 'CAT19-%';

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;
