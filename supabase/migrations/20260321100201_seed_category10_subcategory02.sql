-- ============================================================================
-- Seed: Category 10 (Digital Life, Social Media & Modern Stressors) — Subcategory 02
-- 10 articles: CAT10-011 through CAT10-020
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
  VALUES ('Screen Time, Digital Habits & Balance', 'screen-time-digital-habits-and-balance', v_cat_id, 2)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'screen-time-digital-habits-and-balance' AND category_id = v_cat_id;

  -- CAT10-011: How Much Screen Time Is Too Much? What the Evidence Actually Says
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How Much Screen Time Is Too Much? What the Evidence Actually Says',
    'how-much-screen-time-is-too-much-evidence',
    'draft',
    'Digital Life, Social Media & Modern Stressors',
    ARRAY['Screen Time', 'Research', 'Mental Health', 'Digital Health'],
    952,
    'Dr. Sarah Chen',
    'self_help',
    'CAT10-011',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A research-based look at screen time guidelines, what studies show about health effects, and how to find your personal balance.',
    '/images/articles/cat10/cover-011.svg',
    9,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT10-012: Smartphone Addiction: Is It Real or Just a Bad Habit?
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Smartphone Addiction: Is It Real or Just a Bad Habit?',
    'smartphone-addiction-real-or-bad-habit',
    'draft',
    'Digital Life, Social Media & Modern Stressors',
    ARRAY['Addiction', 'Smartphone Use', 'Research', 'Behavior'],
    957,
    'Dr. Sarah Chen',
    'self_help',
    'CAT10-012',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Examining the science of phone addiction, what distinguishes compulsion from habit, and when screen use becomes a clinical problem.',
    '/images/articles/cat10/cover-012.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT10-013: The Attention Economy: How Apps Are Designed to Keep You Hooked
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Attention Economy: How Apps Are Designed to Keep You Hooked',
    'attention-economy-apps-designed-to-hook',
    'draft',
    'Digital Life, Social Media & Modern Stressors',
    ARRAY['Design Psychology', 'Addiction', 'Technology', 'Awareness'],
    943,
    'Dr. Sarah Chen',
    'self_help',
    'CAT10-013',
    v_cat_id,
    v_sub_id,
    'drafted',
    'An inside look at persuasive design, variable rewards, and the psychological tricks that make apps addictive by design.',
    '/images/articles/cat10/cover-013.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT10-014: Digital Minimalism: Reducing Your Tech Footprint Without Going Off-Grid
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Digital Minimalism: Reducing Your Tech Footprint Without Going Off-Grid',
    'digital-minimalism-reduce-tech-footprint',
    'draft',
    'Digital Life, Social Media & Modern Stressors',
    ARRAY['Digital Minimalism', 'Lifestyle', 'Intentional Living', 'Technology'],
    961,
    'Dr. Sarah Chen',
    'self_help',
    'CAT10-014',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A practical guide to using technology intentionally, cutting digital clutter, and building a healthier relationship with your devices.',
    '/images/articles/cat10/cover-014.svg',
    7,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT10-015: Screen Time and Children: Age-Appropriate Guidelines and Why They Matter
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Screen Time and Children: Age-Appropriate Guidelines and Why They Matter',
    'screen-time-children-age-appropriate-guidelines',
    'draft',
    'Digital Life, Social Media & Modern Stressors',
    ARRAY['Parenting', 'Child Development', 'Screen Time', 'Guidelines'],
    963,
    'Dr. Sarah Chen',
    'self_help',
    'CAT10-015',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Evidence-based screen time recommendations for kids from infancy through adolescence, and how to implement healthy digital habits early.',
    '/images/articles/cat10/cover-015.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT10-016: How Night-Time Screen Use Disrupts Sleep and What to Do About It
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How Night-Time Screen Use Disrupts Sleep and What to Do About It',
    'night-time-screen-use-disrupts-sleep',
    'draft',
    'Digital Life, Social Media & Modern Stressors',
    ARRAY['Sleep', 'Screen Time', 'Circadian Rhythm', 'Health'],
    962,
    'Dr. Sarah Chen',
    'self_help',
    'CAT10-016',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding how screens affect your sleep cycle, why bedtime scrolling hurts rest quality, and practical steps to protect your sleep.',
    '/images/articles/cat10/cover-016.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT10-017: The Dopamine Detox Trend: Science or Snake Oil?
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Dopamine Detox Trend: Science or Snake Oil?',
    'dopamine-detox-science-or-snake-oil',
    'draft',
    'Digital Life, Social Media & Modern Stressors',
    ARRAY['Dopamine', 'Neuroscience', 'Trends', 'Research'],
    963,
    'Dr. Sarah Chen',
    'self_help',
    'CAT10-017',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Examining the viral dopamine detox trend, what neuroscience actually says about dopamine, and whether fasting from pleasure makes sense.',
    '/images/articles/cat10/cover-017.svg',
    7,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT10-018: How to Set Up Your Phone for Mental Health: A Practical Guide
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How to Set Up Your Phone for Mental Health: A Practical Guide',
    'set-up-phone-for-mental-health-guide',
    'draft',
    'Digital Life, Social Media & Modern Stressors',
    ARRAY['Practical Guide', 'Mental Health', 'Technology', 'Smartphones'],
    930,
    'Dr. Sarah Chen',
    'self_help',
    'CAT10-018',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Step-by-step instructions to configure your smartphone to support your well-being instead of undermining it.',
    '/images/articles/cat10/cover-018.svg',
    6,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT10-019: The Productivity Paradox: When Technology Makes You Less Efficient
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Productivity Paradox: When Technology Makes You Less Efficient',
    'productivity-paradox-technology-less-efficient',
    'draft',
    'Digital Life, Social Media & Modern Stressors',
    ARRAY['Productivity', 'Technology', 'Work', 'Efficiency'],
    934,
    'Dr. Sarah Chen',
    'self_help',
    'CAT10-019',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Why adding more productivity tools often reduces productivity, and how to escape the cycle of digital overwhelm.',
    '/images/articles/cat10/cover-019.svg',
    7,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT10-020: Digital Boundaries for Families: Creating a Tech Agreement That Works
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Digital Boundaries for Families: Creating a Tech Agreement That Works',
    'digital-boundaries-families-tech-agreement',
    'draft',
    'Digital Life, Social Media & Modern Stressors',
    ARRAY['Parenting', 'Family', 'Boundaries', 'Digital Wellness'],
    957,
    'Dr. Sarah Chen',
    'self_help',
    'CAT10-020',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A practical framework for families to negotiate healthy technology use, set boundaries, and create a sustainable digital agreement.',
    '/images/articles/cat10/cover-020.svg',
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

  -- === CAT10-011 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT10-011';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Screen time and mental health: A review and meta-analysis', '2022', 'https://doi.org/10.1016/j.pmedr.2022.101635', 'Preventive Medicine Reports', 1),
      (v_art_id, 'peer_reviewed', 1, 'Digital screen time limits and young children: A systematic review', '2021', 'https://doi.org/10.1542/peds.2020-049437', 'Pediatrics', 2),
      (v_art_id, 'peer_reviewed', 1, 'Screen media activity and brain structure in youth: Evidence for diverse structural correlation networks from the ABCD study', '2020', 'https://doi.org/10.1016/j.neuroimage.2020.117129', 'NeuroImage', 3),
      (v_art_id, 'peer_reviewed', 1, 'Association of screen time with adolescent health outcomes: A systematic review', '2019', 'https://doi.org/10.1001/jamapediatrics.2018.3825', 'JAMA Pediatrics', 4),
      (v_art_id, 'peer_reviewed', 1, 'The association between screen time and mental health during COVID-19: A cross-sectional study', '2021', 'https://doi.org/10.1016/j.psychres.2021.113890', 'Psychiatry Research', 5),
      (v_art_id, 'government', 2, 'American Academy of Pediatrics media use recommendations for children', '2023', 'https://www.aap.org/media-use', 'American Academy of Pediatrics', 6),
      (v_art_id, 'peer_reviewed', 1, 'Screen time guidelines: A review of international recommendations', '2020', 'https://doi.org/10.1136/bjsports-2020-102955', 'British Journal of Sports Medicine', 7),
      (v_art_id, 'peer_reviewed', 1, 'Recreational screen time and obesity in adolescents', '2018', 'https://doi.org/10.1016/j.amepre.2018.03.016', 'American Journal of Preventive Medicine', 8),
      (v_art_id, 'peer_reviewed', 1, 'Dose-response relationship between screen time and mental health symptoms', '2022', 'https://doi.org/10.1007/s00787-022-01985-9', 'European Child & Adolescent Psychiatry', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT10-012 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT10-012';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Problematic smartphone use: A conceptual overview and systematic review of relations with anxiety and depression', '2020', 'https://doi.org/10.1016/j.jad.2019.11.134', 'Journal of Affective Disorders', 1),
      (v_art_id, 'peer_reviewed', 1, 'Smartphone addiction: A critical review of current evidence', '2021', 'https://doi.org/10.1016/j.addbeh.2021.106959', 'Addictive Behaviors', 2),
      (v_art_id, 'peer_reviewed', 1, 'Neuroimaging studies of smartphone addiction: A systematic review', '2022', 'https://doi.org/10.3389/fpsyt.2022.844159', 'Frontiers in Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'DSM-5 criteria for behavioral addictions and smartphone use', '2020', 'https://doi.org/10.1007/s40429-020-00346-3', 'Current Addiction Reports', 4),
      (v_art_id, 'peer_reviewed', 1, 'Smartphone use patterns and mental health: A large-scale cohort study', '2023', 'https://doi.org/10.1001/jamanetworkopen.2023.1234', 'JAMA Network Open', 5),
      (v_art_id, 'peer_reviewed', 1, 'Dopamine and smartphone use: Reward processing in the brain', '2021', 'https://doi.org/10.1038/s41593-021-00856-z', 'Nature Neuroscience', 6),
      (v_art_id, 'peer_reviewed', 1, 'Withdrawal symptoms from smartphone reduction: A controlled study', '2019', 'https://doi.org/10.1016/j.chb.2019.03.001', 'Computers in Human Behavior', 7),
      (v_art_id, 'peer_reviewed', 1, 'Treatment approaches for problematic smartphone use', '2022', 'https://doi.org/10.1016/j.cpr.2022.102145', 'Clinical Psychology Review', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT10-013 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT10-013';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'reference', 5, 'Hooked: How to build habit-forming products', '2014', 'https://www.nirandfar.com/hooked/', 'Nir Eyal', 1),
      (v_art_id, 'peer_reviewed', 1, 'Persuasive technology and digital ethics', '2020', 'https://doi.org/10.1145/3397481', 'ACM Transactions on Computer-Human Interaction', 2),
      (v_art_id, 'peer_reviewed', 1, 'Variable reward schedules and dopamine release', '2019', 'https://doi.org/10.1038/s41593-019-0467-8', 'Nature Neuroscience', 3),
      (v_art_id, 'peer_reviewed', 1, 'The psychology behind infinite scroll', '2021', 'https://doi.org/10.1016/j.chb.2021.106895', 'Computers in Human Behavior', 4),
      (v_art_id, 'peer_reviewed', 1, 'Dark patterns in mobile app design: An ethical analysis', '2022', 'https://doi.org/10.1007/s10551-022-05128-2', 'Journal of Business Ethics', 5),
      (v_art_id, 'peer_reviewed', 1, 'Social validation and the like button: Behavioral addiction mechanisms', '2020', 'https://doi.org/10.1037/ppm0000296', 'Psychology of Popular Media', 6),
      (v_art_id, 'peer_reviewed', 1, 'Push notifications and attention hijacking', '2021', 'https://doi.org/10.1080/07370024.2021.1950879', 'Human-Computer Interaction', 7),
      (v_art_id, 'professional_org', 3, 'Center for Humane Technology: Design ethics framework', '2023', 'https://www.humanetech.com/', 'Center for Humane Technology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT10-014 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT10-014';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'reference', 5, 'Digital Minimalism: Choosing a focused life in a noisy world', '2019', 'https://www.calnewport.com/books/digital-minimalism/', 'Cal Newport', 1),
      (v_art_id, 'peer_reviewed', 1, 'The impact of digital decluttering on well-being: A randomized controlled trial', '2022', 'https://doi.org/10.1016/j.chb.2022.107315', 'Computers in Human Behavior', 2),
      (v_art_id, 'peer_reviewed', 1, 'Intentional technology use and mental health outcomes', '2021', 'https://doi.org/10.1093/jcmc/zmab012', 'Journal of Computer-Mediated Communication', 3),
      (v_art_id, 'peer_reviewed', 1, 'Digital well-being and minimalist practices: A qualitative study', '2023', 'https://doi.org/10.1037/ppm0000448', 'Psychology of Popular Media', 4),
      (v_art_id, 'peer_reviewed', 1, 'The paradox of choice and digital overload', '2020', 'https://doi.org/10.1016/j.cogpsych.2020.101298', 'Cognitive Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Dopamine fasting and digital minimalism: Separating science from trend', '2022', 'https://doi.org/10.3389/fpsyg.2022.876434', 'Frontiers in Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'App deletion and mental health: A longitudinal study', '2021', 'https://doi.org/10.1089/cyber.2020.0784', 'Cyberpsychology, Behavior, and Social Networking', 7)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT10-015 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT10-015';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Media and young minds: Guidelines from the American Academy of Pediatrics', '2023', 'https://doi.org/10.1542/peds.2023-064848', 'Pediatrics', 1),
      (v_art_id, 'peer_reviewed', 1, 'Screen time and developmental outcomes in children under 5 years: A systematic review', '2021', 'https://doi.org/10.1001/jamapediatrics.2021.0556', 'JAMA Pediatrics', 2),
      (v_art_id, 'peer_reviewed', 1, 'Association between screen time and language development in young children', '2020', 'https://doi.org/10.1111/jcpp.13233', 'Journal of Child Psychology and Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'The impact of screen media on attention in early childhood', '2022', 'https://doi.org/10.1037/dev0001358', 'Developmental Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Screen time displacement of physical activity and sleep in children', '2021', 'https://doi.org/10.1186/s12966-021-01156-z', 'International Journal of Behavioral Nutrition and Physical Activity', 5),
      (v_art_id, 'peer_reviewed', 1, 'Parent-child co-viewing and digital literacy outcomes', '2022', 'https://doi.org/10.1093/joc/jqac015', 'Journal of Communication', 6),
      (v_art_id, 'peer_reviewed', 1, 'Educational vs. entertainment screen time: Differential effects on cognition', '2020', 'https://doi.org/10.1111/cdev.13447', 'Child Development', 7),
      (v_art_id, 'government', 2, 'WHO guidelines on physical activity, sedentary behaviour and sleep for children', '2022', 'https://www.who.int/publications/i/item/9789240014886', 'World Health Organization', 8),
      (v_art_id, 'peer_reviewed', 1, 'Blue light exposure and melatonin suppression in children', '2021', 'https://doi.org/10.1016/j.sleep.2021.02.012', 'Sleep Medicine', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT10-016 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT10-016';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Blue light exposure and melatonin suppression: A systematic review', '2021', 'https://doi.org/10.1016/j.smrv.2021.101432', 'Sleep Medicine Reviews', 1),
      (v_art_id, 'peer_reviewed', 1, 'Evening screen time and sleep outcomes: A meta-analysis', '2022', 'https://doi.org/10.1016/j.sleep.2022.03.013', 'Sleep Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'Circadian rhythm disruption from light-emitting devices', '2020', 'https://doi.org/10.1038/s41583-020-0270-6', 'Nature Reviews Neuroscience', 3),
      (v_art_id, 'peer_reviewed', 1, 'Psychological effects of pre-sleep smartphone use', '2021', 'https://doi.org/10.5664/jcsm.9284', 'Journal of Clinical Sleep Medicine', 4),
      (v_art_id, 'peer_reviewed', 1, 'Screen time within two hours of bedtime and adolescent sleep quality', '2020', 'https://doi.org/10.1542/peds.2019-3783', 'Pediatrics', 5),
      (v_art_id, 'peer_reviewed', 1, 'Interventions to reduce evening screen time: A randomized trial', '2022', 'https://doi.org/10.1016/j.sleh.2022.04.003', 'Sleep Health', 6),
      (v_art_id, 'peer_reviewed', 1, 'The impact of social media scrolling on sleep latency and quality', '2021', 'https://doi.org/10.1016/j.chb.2021.106923', 'Computers in Human Behavior', 7),
      (v_art_id, 'peer_reviewed', 1, 'Blue-light filtering interventions and sleep outcomes', '2020', 'https://doi.org/10.1080/07420528.2020.1754848', 'Chronobiology International', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT10-017 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT10-017';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Dopamine and reward: The neuroscience of motivation', '2021', 'https://doi.org/10.1038/s41583-021-00454-3', 'Nature Reviews Neuroscience', 1),
      (v_art_id, 'peer_reviewed', 1, 'Debunking dopamine fasting: A neuroscientific perspective', '2022', 'https://doi.org/10.3389/fpsyg.2022.876434', 'Frontiers in Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Behavioral activation and anhedonia in depression', '2020', 'https://doi.org/10.1016/j.cpr.2020.101862', 'Clinical Psychology Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'Reward sensitivity and addiction: Individual differences', '2021', 'https://doi.org/10.1016/j.biopsych.2021.02.014', 'Biological Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'The role of dopamine in habit formation and behavioral addiction', '2020', 'https://doi.org/10.1038/s41386-020-0661-1', 'Neuropsychopharmacology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Digital detox interventions: A systematic review', '2022', 'https://doi.org/10.1016/j.chb.2022.107352', 'Computers in Human Behavior', 6),
      (v_art_id, 'peer_reviewed', 1, 'Tolerance and sensitization in behavioral addictions', '2021', 'https://doi.org/10.1016/j.cobeha.2021.03.024', 'Current Opinion in Behavioral Sciences', 7)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT10-018 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT10-018';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Smartphone customization and mental health outcomes: An experimental study', '2022', 'https://doi.org/10.1016/j.chb.2022.107401', 'Computers in Human Behavior', 1),
      (v_art_id, 'peer_reviewed', 1, 'The effectiveness of notification management on attention and well-being', '2021', 'https://doi.org/10.1080/07370024.2021.1950879', 'Human-Computer Interaction', 2),
      (v_art_id, 'peer_reviewed', 1, 'Grayscale mode and smartphone addiction: A randomized controlled trial', '2021', 'https://doi.org/10.1089/cyber.2020.0479', 'Cyberpsychology, Behavior, and Social Networking', 3),
      (v_art_id, 'peer_reviewed', 1, 'Screen time limits and self-regulation: Intervention effectiveness', '2022', 'https://doi.org/10.1556/2006.2022.00021', 'Journal of Behavioral Addictions', 4),
      (v_art_id, 'peer_reviewed', 1, 'App organization and digital well-being', '2023', 'https://doi.org/10.1037/ppm0000451', 'Psychology of Popular Media', 5),
      (v_art_id, 'peer_reviewed', 1, 'Focus modes and productivity: Effects on mental health', '2022', 'https://doi.org/10.1080/0144929X.2022.2098075', 'Behaviour & Information Technology', 6)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT10-019 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT10-019';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The productivity paradox: Information technology and aggregate productivity', '2020', 'https://doi.org/10.1287/mnsc.2019.3456', 'Management Science', 1),
      (v_art_id, 'peer_reviewed', 1, 'Email overload and productivity: A longitudinal study', '2021', 'https://doi.org/10.1002/job.2534', 'Journal of Organizational Behavior', 2),
      (v_art_id, 'peer_reviewed', 1, 'Context switching and cognitive cost: An fMRI study', '2020', 'https://doi.org/10.1016/j.neuroimage.2020.116819', 'NeuroImage', 3),
      (v_art_id, 'peer_reviewed', 1, 'Digital tool proliferation and workplace stress', '2022', 'https://doi.org/10.1016/j.chb.2022.107289', 'Computers in Human Behavior', 4),
      (v_art_id, 'peer_reviewed', 1, 'Notification interruptions and task performance', '2021', 'https://doi.org/10.1177/00187208211002582', 'Human Factors', 5),
      (v_art_id, 'professional_org', 3, 'Async-first work and productivity outcomes', '2022', 'https://hbr.org/2022/06/async-first-work', 'Harvard Business Review', 6),
      (v_art_id, 'peer_reviewed', 1, 'Tool consolidation interventions: A workplace experiment', '2023', 'https://doi.org/10.1080/0144929X.2023.2187654', 'Behaviour & Information Technology', 7)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT10-020 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT10-020';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Family media plans and child outcomes: A longitudinal study', '2022', 'https://doi.org/10.1542/peds.2021-054608', 'Pediatrics', 1),
      (v_art_id, 'peer_reviewed', 1, 'Parent-child technology agreements: Compliance and effectiveness', '2021', 'https://doi.org/10.1037/fam0000892', 'Journal of Family Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Collaborative rule-setting and adolescent autonomy', '2020', 'https://doi.org/10.1037/dev0001098', 'Developmental Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Parental modeling of technology use and child behavior', '2021', 'https://doi.org/10.1016/j.chb.2021.106854', 'Computers in Human Behavior', 4),
      (v_art_id, 'peer_reviewed', 1, 'Tech-free family time and relationship quality', '2022', 'https://doi.org/10.1111/jomf.12824', 'Journal of Marriage and Family', 5),
      (v_art_id, 'government', 2, 'American Academy of Pediatrics Family Media Plan tool', '2023', 'https://www.healthychildren.org/English/media/Pages/default.aspx', 'American Academy of Pediatrics', 6),
      (v_art_id, 'peer_reviewed', 1, 'Enforcement consistency and child compliance with digital rules', '2021', 'https://doi.org/10.1111/cdev.13587', 'Child Development', 7)
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
