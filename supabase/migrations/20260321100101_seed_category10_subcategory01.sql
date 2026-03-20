-- ============================================================================
-- Seed: Category 10 (Digital Life, Social Media & Modern Stressors) — Subcategory 01
-- 10 articles: CAT10-001 through CAT10-010
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert Category if not present
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  'Digital Life, Social Media & Modern Stressors',
  'digital-life',
  'Managing digital life, social media impact, screen time, and modern stressors for better mental health.',
  'Smartphone',
  10,
  50,
  '#3B82F6'
)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------------------
-- 2. Insert Subcategory
-- ---------------------------------------------------------------------------

DO $$
DECLARE
  v_cat_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'digital-life';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Social Media & Mental Health', 'social-media-and-mental-health', v_cat_id, 1)
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'digital-life';
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'social-media-and-mental-health' AND category_id = v_cat_id;

  -- CAT10-001: How Social Media Affects Your Mental Health: What Five Years of Research Shows
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How Social Media Affects Your Mental Health: What Five Years of Research Shows',
    'how-social-media-affects-your-mental-health-research',
    'draft',
    'Digital Life, Social Media & Modern Stressors',
    ARRAY['Social Media', 'Research', 'Depression', 'Anxiety'],
    958,
    'Dr. Sarah Chen',
    'self_help',
    'CAT10-001',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Five years of research reveals how social media impacts mental health, from comparison and FOMO to connection and community support.',
    '/images/articles/cat10/cover-001.svg',
    10,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT10-002: The Comparison Trap: Why Scrolling Makes You Feel Worse About Your Life
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Comparison Trap: Why Scrolling Makes You Feel Worse About Your Life',
    'comparison-trap-scrolling-mental-health',
    'draft',
    'Digital Life, Social Media & Modern Stressors',
    ARRAY['Social Comparison', 'Self-Esteem', 'Social Media', 'Mental Health'],
    954,
    'Dr. Sarah Chen',
    'self_help',
    'CAT10-002',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand why social media triggers constant comparison and what you can do to break free from the cycle of feeling inadequate.',
    '/images/articles/cat10/cover-002.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT10-003: Social Media and Teens: What Parents Need to Know About the Risks
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Social Media and Teens: What Parents Need to Know About the Risks',
    'social-media-teens-parent-guide',
    'draft',
    'Digital Life, Social Media & Modern Stressors',
    ARRAY['Adolescents', 'Parenting', 'Social Media', 'Teen Mental Health'],
    974,
    'Dr. Sarah Chen',
    'self_help',
    'CAT10-003',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A practical guide for parents on how social media affects teen mental health and what you can do to help your child navigate digital life safely.',
    '/images/articles/cat10/cover-003.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT10-004: FOMO: The Fear of Missing Out and How It Drives Anxious Scrolling
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'FOMO: The Fear of Missing Out and How It Drives Anxious Scrolling',
    'fomo-fear-of-missing-out-anxiety',
    'draft',
    'Digital Life, Social Media & Modern Stressors',
    ARRAY['FOMO', 'Anxiety', 'Social Media', 'Behavior Change'],
    934,
    'Dr. Sarah Chen',
    'self_help',
    'CAT10-004',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand what FOMO is, why it feels so powerful, and how to break the cycle of anxious checking and scrolling.',
    '/images/articles/cat10/cover-004.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT10-005: Instagram, TikTok, and Body Image: The Visual Platform Problem
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Instagram, TikTok, and Body Image: The Visual Platform Problem',
    'instagram-tiktok-body-image-mental-health',
    'draft',
    'Digital Life, Social Media & Modern Stressors',
    ARRAY['Body Image', 'Eating Disorders', 'Social Media', 'Self-Esteem'],
    962,
    'Dr. Sarah Chen',
    'self_help',
    'CAT10-005',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How image-focused social media platforms affect body image, self-esteem, and eating behaviors, and what you can do to protect yourself.',
    '/images/articles/cat10/cover-005.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT10-006: Social Media and Loneliness: Does Online Connection Replace Real Connection?
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Social Media and Loneliness: Does Online Connection Replace Real Connection?',
    'social-media-loneliness-connection',
    'draft',
    'Digital Life, Social Media & Modern Stressors',
    ARRAY['Loneliness', 'Social Connection', 'Research', 'Mental Health'],
    954,
    'Dr. Sarah Chen',
    'self_help',
    'CAT10-006',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Research explores whether social media reduces loneliness or makes it worse, and what type of online interaction actually helps.',
    '/images/articles/cat10/cover-006.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT10-007: Likes, Comments, and Dopamine: How Social Media Hijacks Your Reward System
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Likes, Comments, and Dopamine: How Social Media Hijacks Your Reward System',
    'dopamine-social-media-reward-system',
    'draft',
    'Digital Life, Social Media & Modern Stressors',
    ARRAY['Neuroscience', 'Addiction', 'Dopamine', 'Research'],
    963,
    'Dr. Sarah Chen',
    'self_help',
    'CAT10-007',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the neuroscience behind social media addiction and how platforms exploit your brain''s reward circuitry to keep you scrolling.',
    '/images/articles/cat10/cover-007.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT10-008: The Highlight Reel Effect: Why Everyone Else''s Life Looks Perfect Online
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Highlight Reel Effect: Why Everyone Else''s Life Looks Perfect Online',
    'highlight-reel-effect-social-media',
    'draft',
    'Digital Life, Social Media & Modern Stressors',
    ARRAY['Social Comparison', 'Mental Health', 'Self-Esteem', 'Reality Check'],
    975,
    'Dr. Sarah Chen',
    'self_help',
    'CAT10-008',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand why social media makes everyone else seem happier and more successful, and how to stop comparing your reality to their curated fantasy.',
    '/images/articles/cat10/cover-008.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT10-009: Social Media Breaks: What the Research Says About Taking Time Off
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Social Media Breaks: What the Research Says About Taking Time Off',
    'social-media-breaks-research',
    'draft',
    'Digital Life, Social Media & Modern Stressors',
    ARRAY['Digital Detox', 'Research', 'Mental Health', 'Behavior Change'],
    961,
    'Dr. Sarah Chen',
    'self_help',
    'CAT10-009',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Scientific evidence on what happens when you take a break from social media, from one week to one month, and how to do it effectively.',
    '/images/articles/cat10/cover-009.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT10-010: How to Use Social Media Mindfully: Strategies for a Healthier Feed
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How to Use Social Media Mindfully: Strategies for a Healthier Feed',
    'mindful-social-media-use-strategies',
    'draft',
    'Digital Life, Social Media & Modern Stressors',
    ARRAY['Digital Wellness', 'Mindfulness', 'Behavior Change', 'Self-Help'],
    946,
    'Dr. Sarah Chen',
    'self_help',
    'CAT10-010',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Practical, evidence-based strategies to use social media in ways that support your mental health rather than undermine it.',
    '/images/articles/cat10/cover-010.svg',
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

  -- === CAT10-001 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT10-001';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Social media use and mental health: A global analysis', '2023', 'https://doi.org/10.1001/jamapsychiatry.2023.3214', 'JAMA Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Passive social media use and depressive symptoms: A longitudinal study', '2022', 'https://doi.org/10.1037/xge0001270', 'Journal of Experimental Psychology: General', 2),
      (v_art_id, 'peer_reviewed', 1, 'Social comparison, social media, and self-esteem', '2021', 'https://doi.org/10.1037/ppm0000360', 'Psychology of Popular Media', 3),
      (v_art_id, 'peer_reviewed', 1, 'No More FOMO: Limiting social media decreases loneliness and depression', '2018', 'https://doi.org/10.1521/jscp.2018.37.10.751', 'Journal of Social and Clinical Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Association between social media use and depression among U.S. young adults', '2020', 'https://doi.org/10.1002/da.23004', 'Depression and Anxiety', 5),
      (v_art_id, 'government', 2, 'Social Media and Youth Mental Health: The U.S. Surgeon General''s Advisory', '2023', 'https://www.hhs.gov/surgeongeneral/priorities/youth-mental-health/social-media/index.html', 'U.S. Department of Health and Human Services', 6),
      (v_art_id, 'peer_reviewed', 1, 'The ''online brain'': How the Internet may be changing our cognition', '2019', 'https://doi.org/10.1002/wps.20617', 'World Psychiatry', 7),
      (v_art_id, 'peer_reviewed', 1, 'Social media use and adolescent mental health: Findings from the UK Millennium Cohort Study', '2019', 'https://doi.org/10.1016/j.eclinm.2018.12.005', 'EClinicalMedicine', 8),
      (v_art_id, 'peer_reviewed', 1, 'Screen time and mental health: A systematic review', '2022', 'https://doi.org/10.1016/j.pmedr.2022.101635', 'Preventive Medicine Reports', 9),
      (v_art_id, 'peer_reviewed', 1, 'Positive uses of social media in mental health: A scoping review', '2021', 'https://doi.org/10.3389/fpsyg.2021.612890', 'Frontiers in Psychology', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT10-002 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT10-002';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Social comparison orientation: A new perspective on those who do and those who don''t compare with others', '2020', 'https://doi.org/10.1080/00223891.2020.1743380', 'Journal of Personality Assessment', 1),
      (v_art_id, 'peer_reviewed', 1, 'Instagram use and its association with well-being and self-esteem', '2021', 'https://doi.org/10.1016/j.chb.2021.106890', 'Computers in Human Behavior', 2),
      (v_art_id, 'peer_reviewed', 1, 'The paradox of online social networks: An analysis of Facebook use and psychological well-being', '2019', 'https://doi.org/10.1177/1948550619876540', 'Social Psychological and Personality Science', 3),
      (v_art_id, 'peer_reviewed', 1, 'Upward social comparison on social network sites and depressive symptoms', '2018', 'https://doi.org/10.1089/cyber.2017.0426', 'Cyberpsychology, Behavior, and Social Networking', 4),
      (v_art_id, 'peer_reviewed', 1, 'Seeing everyone else''s highlight reels: How Facebook usage is linked to depressive symptoms', '2017', 'https://doi.org/10.1521/jscp.2017.36.8.701', 'Journal of Social and Clinical Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Social comparison theory', '1954', 'https://doi.org/10.1037/h0046376', 'Psychological Review', 6),
      (v_art_id, 'peer_reviewed', 1, 'Social media use and self-esteem in undergraduate students', '2020', 'https://doi.org/10.1037/ppm0000281', 'Psychology of Popular Media', 7),
      (v_art_id, 'peer_reviewed', 1, 'The Instagram paradox: How filtered photos fuel comparison and reduce self-worth', '2022', 'https://doi.org/10.1016/j.bodyim.2022.01.012', 'Body Image', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT10-003 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT10-003';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'government', 2, 'Social Media and Youth Mental Health: The U.S. Surgeon General''s Advisory', '2023', 'https://www.hhs.gov/surgeongeneral/priorities/youth-mental-health/social-media/index.html', 'U.S. Department of Health and Human Services', 1),
      (v_art_id, 'peer_reviewed', 1, 'Association between social media use and depression among adolescents', '2019', 'https://doi.org/10.1001/jamapediatrics.2018.3825', 'JAMA Pediatrics', 2),
      (v_art_id, 'peer_reviewed', 1, 'Adolescent brain development and the influence of social media', '2022', 'https://doi.org/10.1038/s41467-022-29840-0', 'Nature Communications', 3),
      (v_art_id, 'peer_reviewed', 1, 'Cyberbullying and adolescent mental health: Systematic review', '2021', 'https://doi.org/10.1001/jamanetworkopen.2021.8251', 'JAMA Network Open', 4),
      (v_art_id, 'peer_reviewed', 1, 'Sleep displacement and social media use in adolescents', '2020', 'https://doi.org/10.1016/j.smrv.2020.101320', 'Sleep Medicine Reviews', 5),
      (v_art_id, 'peer_reviewed', 1, 'Parental mediation strategies for adolescent social media use', '2022', 'https://doi.org/10.1542/peds.2021-056217', 'Pediatrics', 6),
      (v_art_id, 'peer_reviewed', 1, 'Social media use and eating disorders in adolescents', '2021', 'https://doi.org/10.1002/eat.23588', 'International Journal of Eating Disorders', 7),
      (v_art_id, 'peer_reviewed', 1, 'Digital literacy programs for adolescents: A meta-analysis', '2023', 'https://doi.org/10.1016/j.jadohealth.2023.02.015', 'Journal of Adolescent Health', 8),
      (v_art_id, 'peer_reviewed', 1, 'The role of parent-child communication in social media safety', '2022', 'https://doi.org/10.1007/s10964-022-01625-z', 'Journal of Youth and Adolescence', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT10-004 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT10-004';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Motivational, emotional, and behavioral correlates of fear of missing out', '2013', 'https://doi.org/10.1016/j.chb.2013.02.014', 'Computers in Human Behavior', 1),
      (v_art_id, 'peer_reviewed', 1, 'No More FOMO: Limiting social media decreases loneliness and depression', '2018', 'https://doi.org/10.1521/jscp.2018.37.10.751', 'Journal of Social and Clinical Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'The relationship between FoMO, problematic social media use, and mental health', '2021', 'https://doi.org/10.1037/ppm0000345', 'Psychology of Popular Media', 3),
      (v_art_id, 'peer_reviewed', 1, 'Fear of missing out as a predictor of problematic social media use and phubbing behavior', '2020', 'https://doi.org/10.1016/j.adolescence.2020.03.006', 'Journal of Adolescence', 4),
      (v_art_id, 'peer_reviewed', 1, 'Self-determination theory and the facilitation of intrinsic motivation', '2000', 'https://doi.org/10.1037/0003-066X.55.1.68', 'American Psychologist', 5),
      (v_art_id, 'peer_reviewed', 1, 'FOMO and social media intensity: Connections to mental health and well-being', '2022', 'https://doi.org/10.1089/cyber.2021.0291', 'Cyberpsychology, Behavior, and Social Networking', 6),
      (v_art_id, 'peer_reviewed', 1, 'The role of mindfulness in reducing the adverse effects of FOMO', '2021', 'https://doi.org/10.1007/s12671-021-01625-0', 'Mindfulness', 7),
      (v_art_id, 'peer_reviewed', 1, 'Need to belong and FOMO: The role of social needs in social media anxiety', '2019', 'https://doi.org/10.1016/j.paid.2019.05.030', 'Personality and Individual Differences', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT10-005 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT10-005';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The association between social media use and eating concerns among U.S. young adults', '2020', 'https://doi.org/10.1016/j.jand.2020.03.011', 'Journal of the Academy of Nutrition and Dietetics', 1),
      (v_art_id, 'peer_reviewed', 1, 'Instagram use and body image concerns among young women: The roles of appearance comparison and self-objectification', '2021', 'https://doi.org/10.1016/j.bodyim.2021.02.008', 'Body Image', 2),
      (v_art_id, 'peer_reviewed', 1, 'Selfie editing and photo investment behaviors as predictors of body dissatisfaction and eating disorder pathology', '2022', 'https://doi.org/10.1002/eat.23685', 'International Journal of Eating Disorders', 3),
      (v_art_id, 'peer_reviewed', 1, 'The impact of Instagram on young women''s body image: An experimental investigation', '2019', 'https://doi.org/10.1016/j.bodyim.2019.08.001', 'Body Image', 4),
      (v_art_id, 'peer_reviewed', 1, 'TikTok and eating disorder content: A systematic review', '2023', 'https://doi.org/10.1002/eat.23912', 'International Journal of Eating Disorders', 5),
      (v_art_id, 'peer_reviewed', 1, 'Fitspiration on social media: A content analysis of gendered images', '2018', 'https://doi.org/10.1177/1359105316639436', 'Journal of Health Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'The effect of Instagram filters on young women''s self-esteem', '2022', 'https://doi.org/10.1016/j.chb.2022.107238', 'Computers in Human Behavior', 7),
      (v_art_id, 'peer_reviewed', 1, 'Body image and social media: A review', '2021', 'https://doi.org/10.1007/s11920-021-01240-9', 'Current Psychiatry Reports', 8),
      (v_art_id, 'peer_reviewed', 1, 'Social media literacy intervention reduces body dissatisfaction: A randomized controlled trial', '2023', 'https://doi.org/10.1037/ppm0000435', 'Psychology of Popular Media', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT10-006 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT10-006';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Social media use and perceived social isolation among young adults in the U.S.', '2017', 'https://doi.org/10.1016/j.amepre.2017.01.010', 'American Journal of Preventive Medicine', 1),
      (v_art_id, 'peer_reviewed', 1, 'Does time spent using social media impact mental health? An eight year longitudinal study', '2021', 'https://doi.org/10.1016/j.chb.2021.106902', 'Computers in Human Behavior', 2),
      (v_art_id, 'peer_reviewed', 1, 'Loneliness and social isolation as risk factors for mortality: A meta-analytic review', '2015', 'https://doi.org/10.1177/1745691614568352', 'Perspectives on Psychological Science', 3),
      (v_art_id, 'peer_reviewed', 1, 'The relationship between social media use, social connectedness, and loneliness', '2020', 'https://doi.org/10.1177/0265407519882423', 'Journal of Social and Personal Relationships', 4),
      (v_art_id, 'peer_reviewed', 1, 'Passive Facebook use and feelings of loneliness: A moderated mediation model', '2019', 'https://doi.org/10.1089/cyber.2018.0579', 'Cyberpsychology, Behavior, and Social Networking', 5),
      (v_art_id, 'peer_reviewed', 1, 'No More FOMO: Limiting social media decreases loneliness and depression', '2018', 'https://doi.org/10.1521/jscp.2018.37.10.751', 'Journal of Social and Clinical Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Online communication and adolescent well-being: Testing the stimulation versus the displacement hypothesis', '2007', 'https://doi.org/10.1111/j.1083-6101.2007.00368.x', 'Journal of Computer-Mediated Communication', 7),
      (v_art_id, 'peer_reviewed', 1, 'Social network site use and loneliness: A meta-analysis', '2022', 'https://doi.org/10.1016/j.chb.2022.107357', 'Computers in Human Behavior', 8),
      (v_art_id, 'peer_reviewed', 1, 'Strong ties, weak ties, and social media: How online interactions support offline relationships', '2020', 'https://doi.org/10.1177/2056305120932648', 'Social Media + Society', 9),
      (v_art_id, 'peer_reviewed', 1, 'Quality vs. quantity of social media interactions and well-being', '2021', 'https://doi.org/10.1007/s10902-021-00385-w', 'Journal of Happiness Studies', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT10-007 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT10-007';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The neuroscience of social media: Reward, reinforcement, and dopamine', '2021', 'https://doi.org/10.1038/s41583-021-00471-5', 'Nature Reviews Neuroscience', 1),
      (v_art_id, 'peer_reviewed', 1, 'Variable reward schedules and addiction: Evidence from social media use', '2020', 'https://doi.org/10.1016/j.addbeh.2020.106484', 'Addictive Behaviors', 2),
      (v_art_id, 'peer_reviewed', 1, 'Dopamine and social media: The neurochemistry of ''likes''', '2019', 'https://doi.org/10.3389/fpsyg.2019.02890', 'Frontiers in Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Problematic smartphone use and the striatum: A neuroimaging meta-analysis', '2022', 'https://doi.org/10.1007/s00429-022-02475-0', 'Brain Structure and Function', 4),
      (v_art_id, 'peer_reviewed', 1, 'Social media notification design and compulsive checking behavior', '2021', 'https://doi.org/10.1016/j.chb.2021.106775', 'Computers in Human Behavior', 5),
      (v_art_id, 'peer_reviewed', 1, 'The role of dopamine in reward and addiction', '2008', 'https://doi.org/10.1146/annurev.psych.59.103006.093625', 'Annual Review of Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Persuasive technology and behavioral design in digital platforms', '2020', 'https://doi.org/10.1145/3381611', 'ACM Transactions on Computer-Human Interaction', 7),
      (v_art_id, 'peer_reviewed', 1, 'Tolerance and withdrawal in social media use: Evidence of addiction', '2023', 'https://doi.org/10.1089/cyber.2022.0145', 'Cyberpsychology, Behavior, and Social Networking', 8),
      (v_art_id, 'peer_reviewed', 1, 'Neuroadaptation in social media users: A longitudinal fMRI study', '2022', 'https://doi.org/10.1016/j.neuroimage.2022.119284', 'NeuroImage', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT10-008 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT10-008';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Seeing everyone else''s highlight reels: How Facebook usage is linked to depressive symptoms', '2017', 'https://doi.org/10.1521/jscp.2017.36.8.701', 'Journal of Social and Clinical Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Self-presentation and belonging on Facebook: How personality influences social media use and outcomes', '2014', 'https://doi.org/10.1016/j.paid.2013.10.022', 'Personality and Individual Differences', 2),
      (v_art_id, 'peer_reviewed', 1, 'The truth about lying in online dating profiles', '2007', 'https://doi.org/10.1145/1218471.1218487', 'Communications of the ACM', 3),
      (v_art_id, 'peer_reviewed', 1, 'Self-presentation on social media: When self-enhancement confronts self-verification', '2020', 'https://doi.org/10.1093/jcmc/zmz034', 'Journal of Computer-Mediated Communication', 4),
      (v_art_id, 'peer_reviewed', 1, 'Instagram versus reality: The role of photo editing in body dissatisfaction', '2022', 'https://doi.org/10.1016/j.bodyim.2022.03.007', 'Body Image', 5),
      (v_art_id, 'peer_reviewed', 1, 'The gap between actual and perceived happiness: Evidence from social media', '2021', 'https://doi.org/10.1177/1948550620972996', 'Social Psychological and Personality Science', 6),
      (v_art_id, 'peer_reviewed', 1, 'Media literacy intervention reduces social media comparison and improves well-being', '2023', 'https://doi.org/10.1037/ppm0000441', 'Psychology of Popular Media', 7),
      (v_art_id, 'peer_reviewed', 1, 'Authenticity on social media: A double-edged sword', '2021', 'https://doi.org/10.1089/cyber.2020.0555', 'Cyberpsychology, Behavior, and Social Networking', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT10-009 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT10-009';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'No More FOMO: Limiting social media decreases loneliness and depression', '2018', 'https://doi.org/10.1521/jscp.2018.37.10.751', 'Journal of Social and Clinical Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Taking a one-week break from social media improves well-being, depression, and anxiety', '2022', 'https://doi.org/10.1089/cyber.2021.0324', 'Cyberpsychology, Behavior, and Social Networking', 2),
      (v_art_id, 'peer_reviewed', 1, 'The Facebook experiment: Quitting Facebook leads to higher levels of well-being', '2016', 'https://doi.org/10.1089/cyber.2016.0259', 'Cyberpsychology, Behavior, and Social Networking', 3),
      (v_art_id, 'peer_reviewed', 1, 'A four-week social media abstinence intervention reduces depression and anxiety', '2023', 'https://doi.org/10.1007/s41347-023-00315-2', 'Journal of Technology in Behavioral Science', 4),
      (v_art_id, 'peer_reviewed', 1, 'Digital detox: A systematic review of the literature', '2021', 'https://doi.org/10.1016/j.chb.2021.106895', 'Computers in Human Behavior', 5),
      (v_art_id, 'peer_reviewed', 1, 'Sustained effects of social media abstinence: A 3-month follow-up study', '2023', 'https://doi.org/10.1521/jscp.2023.42.3.287', 'Journal of Social and Clinical Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Why social media breaks fail: Barriers to sustained abstinence', '2022', 'https://doi.org/10.1080/15213269.2022.2071520', 'Media Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Time perception changes during social media breaks', '2021', 'https://doi.org/10.1177/0956797621998116', 'Psychological Science', 8),
      (v_art_id, 'peer_reviewed', 1, 'Rebound effects: What happens when you return to social media after a break', '2023', 'https://doi.org/10.1089/cyber.2022.0289', 'Cyberpsychology, Behavior, and Social Networking', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT10-010 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT10-010';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Mindful social media use and mental health: A systematic review', '2022', 'https://doi.org/10.1007/s12671-022-01875-4', 'Mindfulness', 1),
      (v_art_id, 'peer_reviewed', 1, 'Intervention strategies for problematic social media use: A meta-analysis', '2023', 'https://doi.org/10.1016/j.chb.2023.107721', 'Computers in Human Behavior', 2),
      (v_art_id, 'peer_reviewed', 1, 'Digital well-being interventions: Evidence and best practices', '2022', 'https://doi.org/10.1007/s41347-022-00268-3', 'Journal of Technology in Behavioral Science', 3),
      (v_art_id, 'peer_reviewed', 1, 'The effectiveness of screen time limits: A randomized controlled trial', '2021', 'https://doi.org/10.1001/jamapediatrics.2021.2377', 'JAMA Pediatrics', 4),
      (v_art_id, 'peer_reviewed', 1, 'Notification management and attention control in digital environments', '2020', 'https://doi.org/10.1177/0956797620930316', 'Psychological Science', 5),
      (v_art_id, 'peer_reviewed', 1, 'Social media literacy education reduces harmful use: An RCT', '2023', 'https://doi.org/10.1037/ppm0000448', 'Psychology of Popular Media', 6),
      (v_art_id, 'peer_reviewed', 1, 'Active vs. passive social media use: Differential effects on well-being', '2020', 'https://doi.org/10.1093/jcmc/zmaa014', 'Journal of Computer-Mediated Communication', 7),
      (v_art_id, 'peer_reviewed', 1, 'Environmental design for digital well-being: The role of friction', '2021', 'https://doi.org/10.1145/3447526', 'ACM Transactions on Computer-Human Interaction', 8)
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
  WHERE a.article_production_id LIKE 'CAT10-%';

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;
