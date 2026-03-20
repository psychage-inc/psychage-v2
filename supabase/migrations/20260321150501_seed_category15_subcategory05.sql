-- ============================================================================
-- Seed: Category 15 (Loneliness, Social Connection & Belonging) — Subcategory 05
-- 10 articles: CAT15-041 through CAT15-050
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
  VALUES ('Digital Connection & Modern Isolation', 'digital-connection-and-modern-isolation', v_cat_id, 5)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'digital-connection-and-modern-isolation' AND category_id = v_cat_id;

  -- CAT15-041: The Paradox of Connection: Why the Most Connected Generation Feels the Loneliest
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Paradox of Connection: Why the Most Connected Generation Feels the Loneliest',
    'paradox-connection-most-connected-generation-loneliest',
    'draft',
    'Loneliness, Social Connection & Belonging',
    ARRAY['Loneliness', 'Social Media', 'Technology', 'Modern Life'],
    997,
    'Dr. Sarah Chen',
    'self_help',
    'CAT15-041',
    v_cat_id,
    v_sub_id,
    'drafted',
    'We have more ways to connect than ever before, yet loneliness is at an all-time high. Explore the paradox of digital connection and what it means for mental health.',
    '/images/articles/cat15/cover-041.svg',
    8,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT15-042: Social Media Friendships: Do Online Connections Count?
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Social Media Friendships: Do Online Connections Count?',
    'social-media-friendships-online-connections-count',
    'draft',
    'Loneliness, Social Connection & Belonging',
    ARRAY['Social Media', 'Online Friendships', 'Digital Relationships', 'Connection'],
    957,
    'Dr. Sarah Chen',
    'self_help',
    'CAT15-042',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Can friendships that exist primarily online provide real connection? What research says about the quality of digital relationships.',
    '/images/articles/cat15/cover-042.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT15-043: Remote Work and Social Isolation: How Working from Home Changed Our Social Lives
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Remote Work and Social Isolation: How Working from Home Changed Our Social Lives',
    'remote-work-social-isolation-working-from-home',
    'draft',
    'Loneliness, Social Connection & Belonging',
    ARRAY['Remote Work', 'Work From Home', 'Isolation', 'Social Connection'],
    936,
    'Dr. Sarah Chen',
    'self_help',
    'CAT15-043',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Remote work offers freedom but can increase loneliness. Learn how to maintain connection while working from home.',
    '/images/articles/cat15/cover-043.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT15-044: The Loneliness of Chronic Illness: When Health Barriers Block Social Connection
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Loneliness of Chronic Illness: When Health Barriers Block Social Connection',
    'loneliness-chronic-illness-health-barriers-social-connection',
    'draft',
    'Loneliness, Social Connection & Belonging',
    ARRAY['Chronic Illness', 'Disability', 'Loneliness', 'Health'],
    951,
    'Dr. Sarah Chen',
    'self_help',
    'CAT15-044',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Chronic illness can create profound isolation. Understand why health challenges increase loneliness and how to stay connected.',
    '/images/articles/cat15/cover-044.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT15-045: Pandemic Loneliness: What COVID Taught Us About Our Need for Each Other
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Pandemic Loneliness: What COVID Taught Us About Our Need for Each Other',
    'pandemic-loneliness-covid-need-for-each-other',
    'draft',
    'Loneliness, Social Connection & Belonging',
    ARRAY['COVID-19', 'Pandemic', 'Loneliness', 'Social Connection'],
    954,
    'Dr. Sarah Chen',
    'self_help',
    'CAT15-045',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The COVID-19 pandemic revealed the depth of our need for human connection. Learn what we learned about loneliness and belonging.',
    '/images/articles/cat15/cover-045.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT15-046: How Architecture and Urban Design Affect Social Connection
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How Architecture and Urban Design Affect Social Connection',
    'architecture-urban-design-affect-social-connection',
    'draft',
    'Loneliness, Social Connection & Belonging',
    ARRAY['Urban Planning', 'Architecture', 'Community', 'Design'],
    961,
    'Dr. Sarah Chen',
    'self_help',
    'CAT15-046',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The way we design cities and buildings shapes whether people connect or stay isolated. Learn how urban planning affects mental health.',
    '/images/articles/cat15/cover-046.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT15-047: Loneliness and Technology: Can Apps Fix the Connection Crisis?
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Loneliness and Technology: Can Apps Fix the Connection Crisis?',
    'loneliness-technology-apps-fix-connection-crisis',
    'draft',
    'Loneliness, Social Connection & Belonging',
    ARRAY['Technology', 'Apps', 'Loneliness', 'Innovation'],
    980,
    'Dr. Sarah Chen',
    'self_help',
    'CAT15-047',
    v_cat_id,
    v_sub_id,
    'drafted',
    'New apps promise to cure loneliness. But can technology solve a problem it helped create? What the research says about digital solutions to isolation.',
    '/images/articles/cat15/cover-047.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT15-048: The Loneliness of Immigration: Building a Social Life in a New Country
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Loneliness of Immigration: Building a Social Life in a New Country',
    'loneliness-immigration-building-social-life-new-country',
    'draft',
    'Loneliness, Social Connection & Belonging',
    ARRAY['Immigration', 'Culture', 'Loneliness', 'Community'],
    924,
    'Dr. Sarah Chen',
    'self_help',
    'CAT15-048',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Immigration often brings profound isolation. Learn how to rebuild community when you are far from home.',
    '/images/articles/cat15/cover-048.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT15-049: Overcoming the Shame of Loneliness: Why Admitting You''re Lonely Is the First Step
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Overcoming the Shame of Loneliness: Why Admitting You''re Lonely Is the First Step',
    'overcoming-shame-loneliness-admitting-lonely-first-step',
    'draft',
    'Loneliness, Social Connection & Belonging',
    ARRAY['Shame', 'Vulnerability', 'Loneliness', 'Mental Health'],
    926,
    'Dr. Sarah Chen',
    'self_help',
    'CAT15-049',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Loneliness carries stigma that keeps people silent. Learn why sharing your loneliness is brave, not weak.',
    '/images/articles/cat15/cover-049.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT15-050: Your Social Connection Plan: A Personalized Guide to Building the Relationships You Need
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Your Social Connection Plan: A Personalized Guide to Building the Relationships You Need',
    'social-connection-plan-personalized-guide-building-relationships',
    'draft',
    'Loneliness, Social Connection & Belonging',
    ARRAY['Action Plan', 'Social Connection', 'Loneliness', 'Practical Strategies'],
    956,
    'Dr. Sarah Chen',
    'self_help',
    'CAT15-050',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Create a practical, personalized plan for building and maintaining social connection based on your unique needs and circumstances.',
    '/images/articles/cat15/cover-050.svg',
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

  -- === CAT15-041 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT15-041';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'professional_org', 3, 'The Loneliness Epidemic: Why So Many of Us Feel Alone — and How Leaders Can Respond', '2020', 'https://hbr.org/2020/02/the-loneliness-epidemic', 'Harvard Business Review', 1),
      (v_art_id, 'peer_reviewed', 1, 'Social media use and loneliness: A systematic review', '2021', 'https://doi.org/10.1016/j.chb.2021.106839', 'Computers in Human Behavior', 2),
      (v_art_id, 'peer_reviewed', 1, 'The association between social media use and loneliness among young adults', '2017', 'https://doi.org/10.1016/j.amepre.2016.08.040', 'American Journal of Preventive Medicine', 3),
      (v_art_id, 'peer_reviewed', 1, 'Loneliness in the Modern Age: An Evolutionary Theory of Loneliness', '2018', 'https://doi.org/10.1016/bs.aesp.2018.03.003', 'Advances in Experimental Social Psychology', 4),
      (v_art_id, 'professional_org', 3, 'Together Alone: The Epidemic of Loneliness and What We Can Do About It', '2019', 'https://www.apa.org/monitor/2019/05/ce-corner-isolation', 'American Psychological Association', 5),
      (v_art_id, 'peer_reviewed', 1, 'Passive social media use and mental health: A meta-analysis', '2021', 'https://doi.org/10.1016/j.jad.2021.03.083', 'Journal of Affective Disorders', 6),
      (v_art_id, 'peer_reviewed', 1, 'The relationship between smartphone use and loneliness', '2020', 'https://doi.org/10.3390/ijerph17051618', 'International Journal of Environmental Research and Public Health', 7),
      (v_art_id, 'peer_reviewed', 1, 'Social comparison on social media and loneliness', '2019', 'https://doi.org/10.1016/j.paid.2019.03.027', 'Personality and Individual Differences', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT15-042 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT15-042';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Online social network site addiction: A comprehensive review', '2020', 'https://doi.org/10.1007/s40429-020-00294-0', 'Current Addiction Reports', 1),
      (v_art_id, 'peer_reviewed', 1, 'The quality of online and offline friendships among adolescents', '2019', 'https://doi.org/10.1016/j.chb.2019.02.022', 'Computers in Human Behavior', 2),
      (v_art_id, 'peer_reviewed', 1, 'Do online friendships provide the same benefits as offline ones?', '2021', 'https://doi.org/10.1089/cyber.2020.0280', 'Cyberpsychology, Behavior, and Social Networking', 3),
      (v_art_id, 'peer_reviewed', 1, 'Social media and friendship quality: The role of communication', '2020', 'https://doi.org/10.1177/0265407519885726', 'Journal of Social and Personal Relationships', 4),
      (v_art_id, 'peer_reviewed', 1, 'Weak ties on social media: A systematic review', '2021', 'https://doi.org/10.1177/1461444820984445', 'New Media & Society', 5),
      (v_art_id, 'peer_reviewed', 1, 'Online gaming friendships and mental health', '2020', 'https://doi.org/10.2196/17007', 'Journal of Medical Internet Research', 6),
      (v_art_id, 'peer_reviewed', 1, 'Maintaining friendships through social media', '2019', 'https://doi.org/10.1080/1369118X.2019.1574860', 'Information, Communication & Society', 7),
      (v_art_id, 'peer_reviewed', 1, 'Internet-based friendships among emerging adults', '2018', 'https://doi.org/10.1177/2167696818769178', 'Emerging Adulthood', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT15-043 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT15-043';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Remote work and loneliness: A systematic review', '2021', 'https://doi.org/10.1037/ocp0000291', 'Journal of Occupational Health Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'The social consequences of working from home', '2020', 'https://doi.org/10.1177/0730888420963308', 'Work and Occupations', 2),
      (v_art_id, 'peer_reviewed', 1, 'Workplace social connections and mental health', '2019', 'https://doi.org/10.1017/iop.2019.46', 'Industrial and Organizational Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Remote work during COVID-19: Mental health implications', '2021', 'https://doi.org/10.1016/S2215-0366(21)00046-8', 'The Lancet Psychiatry', 4),
      (v_art_id, 'professional_org', 3, 'Strategies for combating isolation in remote work', '2022', 'https://hbr.org/2022/03/combating-isolation-remote-work', 'Harvard Business Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'Coworking spaces and social connection', '2020', 'https://doi.org/10.1177/0170840620934297', 'Organization Studies', 6),
      (v_art_id, 'peer_reviewed', 1, 'The third place in the digital age', '2021', 'https://doi.org/10.1016/j.jenvp.2021.101615', 'Journal of Environmental Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Virtual water cooler: Digital social spaces at work', '2021', 'https://doi.org/10.1016/j.chb.2021.106847', 'Computers in Human Behavior', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT15-044 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT15-044';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Chronic illness and social isolation: A systematic review', '2020', 'https://doi.org/10.1080/17437199.2020.1841308', 'Health Psychology Review', 1),
      (v_art_id, 'peer_reviewed', 1, 'Loneliness in people with chronic pain', '2021', 'https://doi.org/10.1093/pm/pnab087', 'Pain Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'Chronic illness stigma and social withdrawal', '2019', 'https://doi.org/10.1177/1359105318820104', 'Journal of Health Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'The impact of chronic illness on friendship', '2020', 'https://doi.org/10.1111/1467-9566.13114', 'Sociology of Health & Illness', 4),
      (v_art_id, 'peer_reviewed', 1, 'Online support groups for chronic illness', '2021', 'https://doi.org/10.1016/j.pec.2021.03.015', 'Patient Education and Counseling', 5),
      (v_art_id, 'peer_reviewed', 1, 'Disability and social exclusion', '2020', 'https://doi.org/10.1080/09687599.2020.1751075', 'Disability & Society', 6),
      (v_art_id, 'peer_reviewed', 1, 'Spoonie community: Chronic illness identity online', '2021', 'https://doi.org/10.1177/1049732321995313', 'Qualitative Health Research', 7),
      (v_art_id, 'peer_reviewed', 1, 'Chronic illness and loneliness in older adults', '2020', 'https://doi.org/10.1093/geront/gnaa015', 'The Gerontologist', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT15-045 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT15-045';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Global prevalence of loneliness during COVID-19', '2021', 'https://doi.org/10.1371/journal.pone.0252976', 'PLOS ONE', 1),
      (v_art_id, 'peer_reviewed', 1, 'Mental health and the COVID-19 pandemic', '2021', 'https://doi.org/10.1016/S2215-0366(21)00084-5', 'The Lancet Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Loneliness and social isolation during lockdown', '2021', 'https://doi.org/10.1016/j.jad.2021.01.035', 'Journal of Affective Disorders', 3),
      (v_art_id, 'peer_reviewed', 1, 'The long-term impact of COVID-19 on social connection', '2022', 'https://doi.org/10.2105/AJPH.2021.306597', 'American Journal of Public Health', 4),
      (v_art_id, 'peer_reviewed', 1, 'Mutual aid networks during the pandemic', '2021', 'https://doi.org/10.1016/j.socscimed.2021.113987', 'Social Science & Medicine', 5),
      (v_art_id, 'peer_reviewed', 1, 'Virtual connection during lockdown: What worked', '2021', 'https://doi.org/10.1089/cyber.2020.0581', 'Cyberpsychology, Behavior, and Social Networking', 6),
      (v_art_id, 'peer_reviewed', 1, 'Post-pandemic social anxiety and re-entry', '2022', 'https://doi.org/10.1016/j.cpr.2022.102134', 'Clinical Psychology Review', 7),
      (v_art_id, 'professional_org', 3, 'What the pandemic taught us about connection', '2022', 'https://hbr.org/2022/01/pandemic-lessons-connection', 'Harvard Business Review', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT15-046 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT15-046';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Built environment and social capital', '2020', 'https://doi.org/10.1007/s11524-020-00450-z', 'Journal of Urban Health', 1),
      (v_art_id, 'peer_reviewed', 1, 'Walkability and mental health', '2019', 'https://doi.org/10.1016/j.amepre.2019.06.006', 'American Journal of Preventive Medicine', 2),
      (v_art_id, 'reference', 5, 'Palaces for the People: How Social Infrastructure Can Help Fight Inequality', '2018', 'https://www.penguinrandomhouse.com/books/557044/palaces-for-the-people-by-eric-klinenberg/', 'Crown Publishing', 3),
      (v_art_id, 'peer_reviewed', 1, 'Public spaces and mental wellbeing', '2020', 'https://doi.org/10.1016/j.healthplace.2020.102385', 'Health & Place', 4),
      (v_art_id, 'peer_reviewed', 1, 'Suburban sprawl and social isolation', '2019', 'https://doi.org/10.1016/j.landurbplan.2019.103612', 'Landscape and Urban Planning', 5),
      (v_art_id, 'peer_reviewed', 1, 'Mixed-use development and community cohesion', '2021', 'https://doi.org/10.1177/0042098020939094', 'Urban Studies', 6),
      (v_art_id, 'reference', 5, 'Architecture of loneliness: The new urban crisis', '2020', 'https://www.theguardian.com/cities/2020/feb/05/loneliness-architecture-urban-design', 'The Guardian', 7),
      (v_art_id, 'peer_reviewed', 1, 'Placemaking and mental health', '2021', 'https://doi.org/10.1016/j.jenvp.2021.101618', 'Journal of Environmental Psychology', 8),
      (v_art_id, 'peer_reviewed', 1, 'Transit-oriented development and social interaction', '2020', 'https://doi.org/10.1016/j.trd.2020.102347', 'Transportation Research Part D', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT15-047 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT15-047';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Digital interventions for loneliness: A systematic review', '2021', 'https://doi.org/10.2196/26719', 'Journal of Medical Internet Research', 1),
      (v_art_id, 'peer_reviewed', 1, 'Friendship apps and social connection', '2022', 'https://doi.org/10.1016/j.chb.2021.107011', 'Computers in Human Behavior', 2),
      (v_art_id, 'peer_reviewed', 1, 'AI companions and loneliness in older adults', '2021', 'https://doi.org/10.1093/geront/gnab121', 'The Gerontologist', 3),
      (v_art_id, 'peer_reviewed', 1, 'The effectiveness of loneliness interventions: A meta-analysis', '2020', 'https://doi.org/10.1016/j.cpr.2020.101867', 'Clinical Psychology Review', 4),
      (v_art_id, 'peer_reviewed', 1, 'Bumble BFF and platonic connection apps', '2022', 'https://doi.org/10.1177/14614448211068852', 'New Media & Society', 5),
      (v_art_id, 'peer_reviewed', 1, 'Technology and the loneliness paradox', '2021', 'https://doi.org/10.1177/1745691620982460', 'Perspectives on Psychological Science', 6),
      (v_art_id, 'peer_reviewed', 1, 'Virtual reality social spaces and mental health', '2022', 'https://doi.org/10.1089/cyber.2021.0215', 'Cyberpsychology, Behavior, and Social Networking', 7),
      (v_art_id, 'reference', 5, 'The problem with solutionism: Tech cannot fix social problems', '2021', 'https://www.technologyreview.com/2021/05/14/tech-solutionism-loneliness/', 'MIT Technology Review', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT15-048 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT15-048';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Immigration and mental health: A systematic review', '2020', 'https://doi.org/10.1007/s10903-020-00998-x', 'Journal of Immigrant and Minority Health', 1),
      (v_art_id, 'peer_reviewed', 1, 'Loneliness among immigrants: A longitudinal study', '2021', 'https://doi.org/10.1016/j.socscimed.2021.113878', 'Social Science & Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'Language barriers and social isolation', '2020', 'https://doi.org/10.1016/j.ijintrel.2020.06.003', 'International Journal of Intercultural Relations', 3),
      (v_art_id, 'peer_reviewed', 1, 'Cultural adjustment and mental health in immigrants', '2019', 'https://doi.org/10.1037/cdp0000272', 'Cultural Diversity and Ethnic Minority Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Ethnic enclaves and social support', '2020', 'https://doi.org/10.1080/1369183X.2020.1724424', 'Journal of Ethnic and Migration Studies', 5),
      (v_art_id, 'peer_reviewed', 1, 'Second-generation immigrant identity and belonging', '2021', 'https://doi.org/10.1080/1070289X.2021.1900026', 'Identities: Global Studies in Culture and Power', 6),
      (v_art_id, 'government', 2, 'Building bridges: Immigrant integration strategies', '2022', 'https://www.migrationpolicy.org/research/immigrant-integration-social-connection', 'Migration Policy Institute', 7),
      (v_art_id, 'peer_reviewed', 1, 'The psychological experience of migration', '2020', 'https://doi.org/10.1146/annurev-psych-010419-050841', 'Annual Review of Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT15-049 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT15-049';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The stigma of loneliness: A meta-analysis', '2020', 'https://doi.org/10.1177/0146167220942949', 'Personality and Social Psychology Bulletin', 1),
      (v_art_id, 'peer_reviewed', 1, 'Shame and loneliness: A bidirectional relationship', '2019', 'https://doi.org/10.1521/jscp.2019.38.10.855', 'Journal of Social and Clinical Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Self-disclosure and loneliness reduction', '2021', 'https://doi.org/10.1177/0265407520984880', 'Journal of Social and Personal Relationships', 3),
      (v_art_id, 'reference', 5, 'The Gifts of Imperfection', '2010', 'https://www.amazon.com/Gifts-Imperfection-Think-Supposed-Embrace/dp/159285849X', 'Hazelden Publishing', 4),
      (v_art_id, 'peer_reviewed', 1, 'Public vs. private loneliness: The role of social desirability', '2020', 'https://doi.org/10.1111/bjso.12377', 'British Journal of Social Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Vulnerability and connection: The role of courage', '2019', 'https://doi.org/10.1177/0022167819838596', 'Journal of Humanistic Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Loneliness concealment and mental health', '2021', 'https://doi.org/10.1177/2167702621995138', 'Clinical Psychological Science', 7),
      (v_art_id, 'peer_reviewed', 1, 'Breaking the silence: Loneliness campaigns and stigma reduction', '2022', 'https://doi.org/10.1108/JPMH-05-2021-0072', 'Journal of Public Mental Health', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT15-050 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT15-050';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Goal-setting for loneliness reduction', '2021', 'https://doi.org/10.1016/j.brat.2021.103923', 'Behaviour Research and Therapy', 1),
      (v_art_id, 'peer_reviewed', 1, 'The effectiveness of loneliness interventions', '2020', 'https://doi.org/10.1016/j.cpr.2020.101867', 'Clinical Psychology Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Social convoy model: Assessing relationship needs', '2019', 'https://doi.org/10.1037/pag0000359', 'Psychology and Aging', 3),
      (v_art_id, 'peer_reviewed', 1, 'SMART goals and behavior change', '2018', 'https://doi.org/10.1037/ccp0000302', 'Journal of Consulting and Clinical Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Implementation intentions and social connection', '2020', 'https://doi.org/10.1177/0146167220912360', 'Personality and Social Psychology Bulletin', 5),
      (v_art_id, 'peer_reviewed', 1, 'Maintenance of social relationships over time', '2021', 'https://doi.org/10.1177/0265407521995975', 'Journal of Social and Personal Relationships', 6),
      (v_art_id, 'professional_org', 3, 'The Campaign to End Loneliness', '2022', 'https://www.campaigntoendloneliness.org/the-facts-on-loneliness/', 'UK Public Health', 7),
      (v_art_id, 'peer_reviewed', 1, 'Social prescribing and connection planning', '2021', 'https://doi.org/10.1186/s12889-021-11750-w', 'BMC Public Health', 8)
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
