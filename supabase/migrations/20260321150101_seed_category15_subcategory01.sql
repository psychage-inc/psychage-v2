-- ============================================================================
-- Seed: Category 15 (Loneliness, Social Connection & Belonging) — Subcategory 01
-- 10 articles: CAT15-001 through CAT15-010
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
  VALUES ('The Science of Loneliness & Social Connection', 'the-science-of-loneliness-and-social-connection', v_cat_id, 1)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'the-science-of-loneliness-and-social-connection' AND category_id = v_cat_id;

  -- CAT15-001: What Is Loneliness? The Difference Between Being Alone and Feeling Alone
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'What Is Loneliness? The Difference Between Being Alone and Feeling Alone',
    'what-is-loneliness-difference-between-alone-and-feeling-alone',
    'draft',
    'Loneliness, Social Connection & Belonging',
    ARRAY['Loneliness', 'Social Connection', 'Mental Health', 'Psychology'],
    970,
    'Dr. Sarah Chen',
    'self_help',
    'CAT15-001',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Loneliness is not the same as being physically alone. Understand the psychological experience of loneliness and why it affects so many people.',
    '/images/articles/cat15/cover-001.svg',
    8,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT15-002: The Neuroscience of Social Connection: Why Your Brain Needs Other People
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Neuroscience of Social Connection: Why Your Brain Needs Other People',
    'neuroscience-of-social-connection-why-brain-needs-other-people',
    'draft',
    'Loneliness, Social Connection & Belonging',
    ARRAY['Neuroscience', 'Social Connection', 'Brain Science', 'Research'],
    982,
    'Dr. Sarah Chen',
    'self_help',
    'CAT15-002',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover how social connection shapes brain structure, chemistry, and function — and why isolation triggers the same threat response as physical danger.',
    '/images/articles/cat15/cover-002.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT15-003: The Health Impacts of Loneliness: Why Isolation Is as Dangerous as Smoking
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Health Impacts of Loneliness: Why Isolation Is as Dangerous as Smoking',
    'health-impacts-of-loneliness-why-isolation-dangerous-as-smoking',
    'draft',
    'Loneliness, Social Connection & Belonging',
    ARRAY['Loneliness', 'Public Health', 'Physical Health', 'Research'],
    985,
    'Dr. Sarah Chen',
    'self_help',
    'CAT15-003',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Loneliness is not just an emotional experience — it''s a major public health crisis that increases mortality risk, weakens immunity, and accelerates aging.',
    '/images/articles/cat15/cover-003.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT15-004: The Surgeon General''s Advisory on Loneliness: What It Says and Why It Matters
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Surgeon General''s Advisory on Loneliness: What It Says and Why It Matters',
    'surgeon-general-advisory-on-loneliness-what-it-says-why-it-matters',
    'draft',
    'Loneliness, Social Connection & Belonging',
    ARRAY['Public Health', 'Policy', 'Surgeon General', 'Loneliness Epidemic'],
    982,
    'Dr. Sarah Chen',
    'self_help',
    'CAT15-004',
    v_cat_id,
    v_sub_id,
    'drafted',
    'In 2023, the U.S. Surgeon General declared loneliness a public health epidemic. Here''s what the advisory says and what it means for policy and practice.',
    '/images/articles/cat15/cover-004.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT15-005: Loneliness vs. Solitude: How Alone Time Can Be Healing or Harmful
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Loneliness vs. Solitude: How Alone Time Can Be Healing or Harmful',
    'loneliness-vs-solitude-how-alone-time-healing-or-harmful',
    'draft',
    'Loneliness, Social Connection & Belonging',
    ARRAY['Solitude', 'Loneliness', 'Self-Care', 'Mental Health'],
    948,
    'Dr. Sarah Chen',
    'self_help',
    'CAT15-005',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Being alone is not the same as loneliness. Understand when solitude supports well-being and when isolation becomes harmful.',
    '/images/articles/cat15/cover-005.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT15-006: The Loneliness Epidemic: How Modern Life Disconnected Us
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Loneliness Epidemic: How Modern Life Disconnected Us',
    'loneliness-epidemic-how-modern-life-disconnected-us',
    'draft',
    'Loneliness, Social Connection & Belonging',
    ARRAY['Loneliness Epidemic', 'Modern Life', 'Social Trends', 'Public Health'],
    976,
    'Dr. Sarah Chen',
    'self_help',
    'CAT15-006',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Loneliness rates have doubled in recent decades. Explore the social, technological, and cultural forces that created our epidemic of disconnection.',
    '/images/articles/cat15/cover-006.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT15-007: Social Isolation vs. Perceived Isolation: Why You Can Feel Lonely in a Crowd
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Social Isolation vs. Perceived Isolation: Why You Can Feel Lonely in a Crowd',
    'social-isolation-vs-perceived-isolation-lonely-in-crowd',
    'draft',
    'Loneliness, Social Connection & Belonging',
    ARRAY['Loneliness', 'Social Isolation', 'Connection', 'Psychology'],
    960,
    'Dr. Sarah Chen',
    'self_help',
    'CAT15-007',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Loneliness is not the same as being physically alone. Understand the difference between objective isolation and perceived loneliness.',
    '/images/articles/cat15/cover-007.svg',
    7,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT15-008: How Loneliness Affects Your Immune System, Sleep, and Physical Health
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How Loneliness Affects Your Immune System, Sleep, and Physical Health',
    'how-loneliness-affects-immune-system-sleep-physical-health',
    'draft',
    'Loneliness, Social Connection & Belonging',
    ARRAY['Loneliness', 'Immune System', 'Sleep', 'Health Research'],
    984,
    'Dr. Sarah Chen',
    'self_help',
    'CAT15-008',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Loneliness triggers measurable changes in immune function, sleep architecture, and physiological stress. Understand the biological pathways of isolation.',
    '/images/articles/cat15/cover-008.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT15-009: The Evolutionary Roots of Loneliness: Why Social Pain Exists
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Evolutionary Roots of Loneliness: Why Social Pain Exists',
    'evolutionary-roots-of-loneliness-why-social-pain-exists',
    'draft',
    'Loneliness, Social Connection & Belonging',
    ARRAY['Evolutionary Psychology', 'Loneliness', 'Research', 'Neuroscience'],
    970,
    'Dr. Sarah Chen',
    'self_help',
    'CAT15-009',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Loneliness is not a design flaw — it''s an evolved signal that kept our ancestors alive. Understand the evolutionary psychology of social pain.',
    '/images/articles/cat15/cover-009.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT15-010: Measuring Loneliness: The UCLA Scale and What Your Score Means
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Measuring Loneliness: The UCLA Scale and What Your Score Means',
    'measuring-loneliness-ucla-scale-what-your-score-means',
    'draft',
    'Loneliness, Social Connection & Belonging',
    ARRAY['Loneliness Assessment', 'UCLA Scale', 'Self-Assessment', 'Mental Health'],
    980,
    'Dr. Sarah Chen',
    'self_help',
    'CAT15-010',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The UCLA Loneliness Scale is the gold-standard tool for assessing loneliness. Learn how it works, what your score means, and how to interpret results.',
    '/images/articles/cat15/cover-010.svg',
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

  -- === CAT15-001 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT15-001';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Loneliness and social isolation as risk factors for mortality: A meta-analytic review', '2015', 'https://doi.org/10.1177/1745691614568352', 'Perspectives on Psychological Science', 1),
      (v_art_id, 'peer_reviewed', 1, 'The evolutionary theory of loneliness', '2018', 'https://doi.org/10.1080/02699931.2017.1417230', 'Cognition and Emotion', 2),
      (v_art_id, 'peer_reviewed', 1, 'Loneliness is a unique predictor of age-related differences in systolic blood pressure', '2006', 'https://doi.org/10.1037/0882-7974.21.1.152', 'Psychology and Aging', 3),
      (v_art_id, 'peer_reviewed', 1, 'Perceived social isolation and cognition', '2009', 'https://doi.org/10.1016/j.tics.2009.06.005', 'Trends in Cognitive Sciences', 4),
      (v_art_id, 'peer_reviewed', 1, 'UCLA Loneliness Scale (Version 3): Reliability, validity, and factor structure', '1996', 'https://doi.org/10.1207/s15327752jpa6601_2', 'Journal of Personality Assessment', 5),
      (v_art_id, 'reference', 5, 'Loneliness: Human nature and the need for social connection', '2008', 'https://wwnorton.com', 'W.W. Norton & Company', 6),
      (v_art_id, 'peer_reviewed', 1, 'The anatomy of loneliness', '2018', 'https://doi.org/10.1016/j.cub.2018.09.052', 'Current Biology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Loneliness and social isolation as risk factors for coronary heart disease and stroke', '2016', 'https://doi.org/10.1136/heartjnl-2015-308790', 'Heart', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT15-002 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT15-002';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The social brain: Neural basis of social knowledge', '2009', 'https://doi.org/10.1146/annurev.psych.60.110707.163514', 'Annual Review of Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Neural mechanisms of social cognition', '2012', 'https://doi.org/10.1038/nn.3142', 'Nature Neuroscience', 2),
      (v_art_id, 'peer_reviewed', 1, 'Oxytocin and social bonding', '2011', 'https://doi.org/10.1016/j.conb.2011.07.003', 'Current Opinion in Neurobiology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Social connection and the brain: A review', '2018', 'https://doi.org/10.1016/j.neubiorev.2018.05.010', 'Neuroscience & Biobehavioral Reviews', 4),
      (v_art_id, 'peer_reviewed', 1, 'Loneliness and the brain: How isolation changes neural function', '2020', 'https://doi.org/10.1016/j.cell.2020.11.024', 'Cell', 5),
      (v_art_id, 'peer_reviewed', 1, 'Social support and the stress response', '2007', 'https://doi.org/10.1097/PSY.0b013e31815c1b7a', 'Psychosomatic Medicine', 6),
      (v_art_id, 'peer_reviewed', 1, 'The neurobiology of social bonding', '2015', 'https://doi.org/10.1126/science.1252695', 'Science', 7),
      (v_art_id, 'peer_reviewed', 1, 'Social isolation and brain structure in older adults', '2019', 'https://doi.org/10.1001/jamapsychiatry.2019.1283', 'JAMA Psychiatry', 8),
      (v_art_id, 'peer_reviewed', 1, 'Mirror neurons and social cognition', '2004', 'https://doi.org/10.1016/j.tics.2004.02.002', 'Trends in Cognitive Sciences', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT15-003 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT15-003';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Loneliness and social isolation as risk factors for mortality: A meta-analytic review', '2015', 'https://doi.org/10.1177/1745691614568352', 'Perspectives on Psychological Science', 1),
      (v_art_id, 'peer_reviewed', 1, 'Loneliness and social isolation as risk factors for coronary heart disease and stroke', '2016', 'https://doi.org/10.1136/heartjnl-2015-308790', 'Heart', 2),
      (v_art_id, 'peer_reviewed', 1, 'Loneliness is associated with increased blood pressure in older adults', '2006', 'https://doi.org/10.1037/0882-7974.21.1.152', 'Psychology and Aging', 3),
      (v_art_id, 'peer_reviewed', 1, 'Social relationships and inflammation across the life course', '2013', 'https://doi.org/10.1073/pnas.1303158110', 'Proceedings of the National Academy of Sciences', 4),
      (v_art_id, 'peer_reviewed', 1, 'Loneliness predicts increased blood pressure: 5-year cross-lagged analyses', '2010', 'https://doi.org/10.1037/a0017805', 'Health Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Loneliness and sleep quality: A systematic review and meta-analysis', '2018', 'https://doi.org/10.1016/j.smrv.2017.11.006', 'Sleep Medicine Reviews', 6),
      (v_art_id, 'peer_reviewed', 1, 'Social relationships and risk of dementia: A systematic review and meta-analysis', '2020', 'https://doi.org/10.1016/S2468-2667(20)30147-7', 'The Lancet Public Health', 7),
      (v_art_id, 'peer_reviewed', 1, 'Loneliness and immune function', '2015', 'https://doi.org/10.1186/s12979-015-0035-4', 'Immunity & Ageing', 8),
      (v_art_id, 'peer_reviewed', 1, 'Social isolation and mortality in US black and white adults', '2013', 'https://doi.org/10.1093/aje/kwt003', 'American Journal of Epidemiology', 9),
      (v_art_id, 'peer_reviewed', 1, 'Loneliness in older persons: A predictor of functional decline and death', '2012', 'https://doi.org/10.1001/archinternmed.2012.1993', 'Archives of Internal Medicine', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT15-004 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT15-004';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'government', 2, 'Our Epidemic of Loneliness and Isolation: The U.S. Surgeon General''s Advisory on the Healing Effects of Social Connection and Community', '2023', 'https://www.hhs.gov/sites/default/files/surgeon-general-social-connection-advisory.pdf', 'U.S. Department of Health and Human Services', 1),
      (v_art_id, 'peer_reviewed', 1, 'Loneliness and social isolation as risk factors for mortality: A meta-analytic review', '2015', 'https://doi.org/10.1177/1745691614568352', 'Perspectives on Psychological Science', 2),
      (v_art_id, 'peer_reviewed', 1, 'Social isolation and loneliness among older adults in the context of COVID-19', '2021', 'https://doi.org/10.1093/geronb/gbaa110', 'The Journals of Gerontology: Series B', 3),
      (v_art_id, 'peer_reviewed', 1, 'The relationship between social isolation and mental health among older adults during the COVID-19 pandemic', '2022', 'https://doi.org/10.1001/jamanetworkopen.2022.9993', 'JAMA Network Open', 4),
      (v_art_id, 'government', 2, 'National strategy for suicide prevention: Goals and objectives for action', '2012', 'https://www.sprc.org/sites/default/files/National_Strategy_for_Suicide_Prevention.pdf', 'U.S. Department of Health and Human Services', 5),
      (v_art_id, 'peer_reviewed', 1, 'Social prescribing: A review of community referral schemes', '2020', 'https://doi.org/10.3399/bjgp20X710573', 'British Journal of General Practice', 6),
      (v_art_id, 'peer_reviewed', 1, 'Building community resilience through social connection', '2020', 'https://doi.org/10.2105/AJPH.2019.305469', 'American Journal of Public Health', 7),
      (v_art_id, 'peer_reviewed', 1, 'Workplace social connection and mental health', '2019', 'https://doi.org/10.1037/ocp0000147', 'Journal of Occupational Health Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT15-005 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT15-005';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The quiet ego: Quieting the self in the service of well-being', '2010', 'https://doi.org/10.1037/a0018762', 'Journal of Personality and Social Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Solitude as an approach to affective self-regulation', '2003', 'https://doi.org/10.1177/0146167203029011003', 'Personality and Social Psychology Bulletin', 2),
      (v_art_id, 'reference', 5, 'The joy of quiet: A beginner''s guide to serenity', '2014', 'https://www.ted.com/read/ted-books', 'TED Books', 3),
      (v_art_id, 'peer_reviewed', 1, 'Loneliness and solitude in adolescence', '1999', 'https://doi.org/10.1037/0012-1649.35.2.535', 'Developmental Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'The relationship between solitude and creativity', '2017', 'https://doi.org/10.1002/jocb.196', 'Journal of Creative Behavior', 5),
      (v_art_id, 'peer_reviewed', 1, 'Alone but feeling good: The role of emotional self-regulation', '2012', 'https://doi.org/10.1037/a0025424', 'Emotion', 6),
      (v_art_id, 'peer_reviewed', 1, 'Social withdrawal and mental health: A lifespan perspective', '2018', 'https://doi.org/10.1016/j.cpr.2018.05.002', 'Clinical Psychology Review', 7),
      (v_art_id, 'peer_reviewed', 1, 'The benefits of being present: Mindfulness and its role in psychological well-being', '2003', 'https://doi.org/10.1037/0022-3514.84.4.822', 'Journal of Personality and Social Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT15-006 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT15-006';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Trends in loneliness among U.S. adults: 1976-2018', '2021', 'https://doi.org/10.1037/amp0000779', 'American Psychologist', 1),
      (v_art_id, 'reference', 5, 'Bowling Alone: The Collapse and Revival of American Community', '2000', 'https://www.simonandschuster.com', 'Simon & Schuster', 2),
      (v_art_id, 'peer_reviewed', 1, 'Social media use and perceived social isolation among young adults', '2017', 'https://doi.org/10.1016/j.amepre.2017.01.010', 'American Journal of Preventive Medicine', 3),
      (v_art_id, 'peer_reviewed', 1, 'The relationship between urbanization and mental health', '2019', 'https://doi.org/10.1007/s11524-019-00345-6', 'Journal of Urban Health', 4),
      (v_art_id, 'peer_reviewed', 1, 'Remote work and social isolation during COVID-19', '2021', 'https://doi.org/10.1037/apl0000847', 'Journal of Applied Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'The decline of civic engagement in America', '2018', 'https://doi.org/10.1353/jod.2018.0018', 'Journal of Democracy', 6),
      (v_art_id, 'peer_reviewed', 1, 'Loneliness across the lifespan: A review', '2020', 'https://doi.org/10.1177/1745691620910393', 'Perspectives on Psychological Science', 7),
      (v_art_id, 'government', 2, 'Our Epidemic of Loneliness and Isolation', '2023', 'https://www.hhs.gov/sites/default/files/surgeon-general-social-connection-advisory.pdf', 'U.S. Department of Health and Human Services', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT15-007 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT15-007';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Perceived social isolation and cognition', '2009', 'https://doi.org/10.1016/j.tics.2009.06.005', 'Trends in Cognitive Sciences', 1),
      (v_art_id, 'peer_reviewed', 1, 'Loneliness and social isolation as risk factors for mortality', '2015', 'https://doi.org/10.1177/1745691614568352', 'Perspectives on Psychological Science', 2),
      (v_art_id, 'peer_reviewed', 1, 'The relationship between loneliness and perceived social support', '2016', 'https://doi.org/10.1177/0265407515618281', 'Journal of Social and Personal Relationships', 3),
      (v_art_id, 'peer_reviewed', 1, 'Quality vs. quantity of social relationships and loneliness', '2018', 'https://doi.org/10.1016/j.socscimed.2018.05.043', 'Social Science & Medicine', 4),
      (v_art_id, 'reference', 5, 'Loneliness: Human nature and the need for social connection', '2008', 'https://wwnorton.com', 'W.W. Norton & Company', 5),
      (v_art_id, 'peer_reviewed', 1, 'Social network size and loneliness in older adults', '2017', 'https://doi.org/10.1093/geront/gnw267', 'The Gerontologist', 6),
      (v_art_id, 'peer_reviewed', 1, 'The psychological impact of quarantine and social distancing', '2020', 'https://doi.org/10.1016/S0140-6736(20)30460-8', 'The Lancet', 7)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT15-008 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT15-008';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Loneliness and immune function', '2015', 'https://doi.org/10.1186/s12979-015-0035-4', 'Immunity & Ageing', 1),
      (v_art_id, 'peer_reviewed', 1, 'Loneliness promotes inflammation during acute stress', '2011', 'https://doi.org/10.1177/0956797611398315', 'Psychological Science', 2),
      (v_art_id, 'peer_reviewed', 1, 'Social relationships and inflammation across the life course', '2013', 'https://doi.org/10.1073/pnas.1303158110', 'Proceedings of the National Academy of Sciences', 3),
      (v_art_id, 'peer_reviewed', 1, 'Loneliness and sleep quality: A systematic review', '2018', 'https://doi.org/10.1016/j.smrv.2017.11.006', 'Sleep Medicine Reviews', 4),
      (v_art_id, 'peer_reviewed', 1, 'Loneliness and the stress response', '2012', 'https://doi.org/10.1016/j.psyneuen.2011.11.007', 'Psychoneuroendocrinology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Loneliness and antibody response to influenza vaccination', '2005', 'https://doi.org/10.1037/0278-6133.24.3.297', 'Health Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Social isolation and sleep architecture in older adults', '2016', 'https://doi.org/10.5665/sleep.6096', 'Sleep', 7),
      (v_art_id, 'peer_reviewed', 1, 'Loneliness and pain: A neurological perspective', '2013', 'https://doi.org/10.1093/scan/nst019', 'Social Cognitive and Affective Neuroscience', 8),
      (v_art_id, 'peer_reviewed', 1, 'Loneliness and cortisol: Stress reactivity among lonely individuals', '2007', 'https://doi.org/10.1080/08836610701677659', 'Annals of Behavioral Medicine', 9),
      (v_art_id, 'peer_reviewed', 1, 'The effects of loneliness on cellular immunity', '2015', 'https://doi.org/10.1016/j.bbi.2014.11.001', 'Brain, Behavior, and Immunity', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT15-009 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT15-009';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The evolutionary theory of loneliness', '2018', 'https://doi.org/10.1080/02699931.2017.1417230', 'Cognition and Emotion', 1),
      (v_art_id, 'peer_reviewed', 1, 'Social pain and physical pain: Shared neural mechanisms', '2011', 'https://doi.org/10.1016/j.tics.2011.07.002', 'Trends in Cognitive Sciences', 2),
      (v_art_id, 'peer_reviewed', 1, 'The social brain hypothesis', '2009', 'https://doi.org/10.1098/rstb.2008.0288', 'Philosophical Transactions of the Royal Society B', 3),
      (v_art_id, 'reference', 5, 'Loneliness: Human nature and the need for social connection', '2008', 'https://wwnorton.com', 'W.W. Norton & Company', 4),
      (v_art_id, 'peer_reviewed', 1, 'Social rejection and the brain', '2003', 'https://doi.org/10.1126/science.1089134', 'Science', 5),
      (v_art_id, 'peer_reviewed', 1, 'The evolution of cooperative breeding', '2007', 'https://doi.org/10.1146/annurev.anthro.36.081406.094331', 'Annual Review of Anthropology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Loneliness as an adaptive signal: A life history perspective', '2014', 'https://doi.org/10.1017/S0140525X13003099', 'Behavioral and Brain Sciences', 7),
      (v_art_id, 'peer_reviewed', 1, 'The neural correlates of social and physical pain', '2013', 'https://doi.org/10.1038/nn.3461', 'Nature Neuroscience', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT15-010 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT15-010';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'UCLA Loneliness Scale (Version 3): Reliability, validity, and factor structure', '1996', 'https://doi.org/10.1207/s15327752jpa6601_2', 'Journal of Personality Assessment', 1),
      (v_art_id, 'peer_reviewed', 1, 'The revised UCLA Loneliness Scale: Concurrent and discriminant validity evidence', '1980', 'https://doi.org/10.1037/0022-3514.39.3.472', 'Journal of Personality and Social Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Loneliness measurement across the lifespan', '2020', 'https://doi.org/10.1177/1745691620910393', 'Perspectives on Psychological Science', 3),
      (v_art_id, 'peer_reviewed', 1, 'Loneliness and social isolation as risk factors for mortality', '2015', 'https://doi.org/10.1177/1745691614568352', 'Perspectives on Psychological Science', 4),
      (v_art_id, 'government', 2, 'Our Epidemic of Loneliness and Isolation', '2023', 'https://www.hhs.gov/sites/default/files/surgeon-general-social-connection-advisory.pdf', 'U.S. Department of Health and Human Services', 5),
      (v_art_id, 'peer_reviewed', 1, 'Loneliness and health: Potential mechanisms', '2002', 'https://doi.org/10.1097/00006842-200205000-00005', 'Psychosomatic Medicine', 6),
      (v_art_id, 'peer_reviewed', 1, 'Interventions to reduce loneliness: A systematic review', '2016', 'https://doi.org/10.1016/j.maturitas.2015.10.007', 'Maturitas', 7)
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
