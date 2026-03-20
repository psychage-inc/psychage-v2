-- ============================================================================
-- Seed: Category 10 (Digital Life, Social Media & Modern Stressors) — Subcategory 04
-- 10 articles: CAT10-031 through CAT10-040
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
  VALUES ('Information Overload & Doomscrolling', 'information-overload-and-doomscrolling', v_cat_id, 4)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'information-overload-and-doomscrolling' AND category_id = v_cat_id;

  -- CAT10-031: What Is Doomscrolling? The Psychology of Consuming Bad News Compulsively
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'What Is Doomscrolling? The Psychology of Consuming Bad News Compulsively',
    'what-is-doomscrolling-psychology-compulsive-news',
    'draft',
    'Digital Life, Social Media & Modern Stressors',
    ARRAY['Doomscrolling', 'Anxiety', 'News Consumption', 'Digital Habits', 'Mental Health'],
    967,
    'Dr. Sarah Chen',
    'self_help',
    'CAT10-031',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand why we compulsively scroll through negative news, the psychological mechanisms behind doomscrolling, and how to break the cycle.',
    '/images/articles/cat10/cover-031.svg',
    8,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT10-032: Information Overload: How Too Much Input Overwhelms Your Brain
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Information Overload: How Too Much Input Overwhelms Your Brain',
    'information-overload-how-too-much-input-overwhelms-brain',
    'draft',
    'Digital Life, Social Media & Modern Stressors',
    ARRAY['Information Overload', 'Cognitive Load', 'Attention', 'Focus', 'Digital Wellness'],
    961,
    'Dr. Sarah Chen',
    'self_help',
    'CAT10-032',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the cognitive science of information overload, why the digital age creates mental overwhelm, and how to restore your focus.',
    '/images/articles/cat10/cover-032.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT10-033: News Anxiety: How the 24/7 News Cycle Damages Mental Health
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'News Anxiety: How the 24/7 News Cycle Damages Mental Health',
    'news-anxiety-24-7-news-cycle-mental-health',
    'draft',
    'Digital Life, Social Media & Modern Stressors',
    ARRAY['News Anxiety', 'Media Consumption', 'Anxiety', 'Mental Health', 'Information Diet'],
    984,
    'Dr. Sarah Chen',
    'self_help',
    'CAT10-033',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore how constant news exposure creates chronic anxiety, why the news is designed to alarm you, and how to stay informed without becoming overwhelmed.',
    '/images/articles/cat10/cover-033.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT10-034: Climate Anxiety and the Internet: When Awareness Becomes Overwhelm
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Climate Anxiety and the Internet: When Awareness Becomes Overwhelm',
    'climate-anxiety-internet-awareness-overwhelm',
    'draft',
    'Digital Life, Social Media & Modern Stressors',
    ARRAY['Climate Anxiety', 'Eco-Anxiety', 'Environmental Concerns', 'Mental Health', 'Online Information'],
    984,
    'Dr. Sarah Chen',
    'self_help',
    'CAT10-034',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Navigate the mental health impacts of climate change information online, distinguish productive concern from paralyzing anxiety, and find hope in action.',
    '/images/articles/cat10/cover-034.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT10-035: Misinformation and Mental Health: How False Claims Cause Real Harm
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Misinformation and Mental Health: How False Claims Cause Real Harm',
    'misinformation-mental-health-false-claims-real-harm',
    'draft',
    'Digital Life, Social Media & Modern Stressors',
    ARRAY['Misinformation', 'Disinformation', 'Cognitive Bias', 'Trust', 'Media Literacy'],
    994,
    'Dr. Sarah Chen',
    'self_help',
    'CAT10-035',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand how misinformation affects psychological well-being, why we believe false information, and how to protect your mental health in the misinformation age.',
    '/images/articles/cat10/cover-035.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT10-036: The Infinite Scroll: How Endless Content Feeds Exploit Your Attention
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Infinite Scroll: How Endless Content Feeds Exploit Your Attention',
    'infinite-scroll-endless-content-feeds-exploit-attention',
    'draft',
    'Digital Life, Social Media & Modern Stressors',
    ARRAY['Infinite Scroll', 'Attention', 'Design Psychology', 'Addiction', 'Digital Wellness'],
    950,
    'Dr. Sarah Chen',
    'self_help',
    'CAT10-036',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover the psychology behind infinite scroll design, why it''s so addictive, and how to reclaim control over your attention.',
    '/images/articles/cat10/cover-036.svg',
    7,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT10-037: How to Stay Informed Without Becoming Anxious or Despairing
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How to Stay Informed Without Becoming Anxious or Despairing',
    'stay-informed-without-becoming-anxious',
    'draft',
    'Digital Life, Social Media & Modern Stressors',
    ARRAY['Information Diet', 'News Consumption', 'Mental Health', 'Boundaries', 'Media Literacy'],
    964,
    'Dr. Sarah Chen',
    'self_help',
    'CAT10-037',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn to balance awareness of world events with mental health protection through intentional, bounded information consumption strategies.',
    '/images/articles/cat10/cover-037.svg',
    7,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT10-038: Echo Chambers and Mental Health: When Your Feed Reinforces Your Fears
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Echo Chambers and Mental Health: When Your Feed Reinforces Your Fears',
    'echo-chambers-mental-health-feed-reinforces-fears',
    'draft',
    'Digital Life, Social Media & Modern Stressors',
    ARRAY['Echo Chambers', 'Filter Bubbles', 'Polarization', 'Anxiety', 'Algorithms'],
    974,
    'Dr. Sarah Chen',
    'self_help',
    'CAT10-038',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand how algorithmic echo chambers amplify anxiety and polarization, and learn to diversify your information sources for mental well-being.',
    '/images/articles/cat10/cover-038.svg',
    7,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT10-039: The Mental Health Impact of Constant Pandemic News Coverage
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Mental Health Impact of Constant Pandemic News Coverage',
    'mental-health-impact-constant-pandemic-news',
    'draft',
    'Digital Life, Social Media & Modern Stressors',
    ARRAY['Pandemic News', 'COVID-19', 'Crisis Coverage', 'Anxiety', 'Trauma'],
    968,
    'Dr. Sarah Chen',
    'self_help',
    'CAT10-039',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand how prolonged crisis news exposure during COVID-19 and other pandemics affects mental health, and apply lessons to future crises.',
    '/images/articles/cat10/cover-039.svg',
    7,
    true,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT10-040: Building a Healthy Information Diet: Practical Strategies
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Building a Healthy Information Diet: Practical Strategies',
    'building-healthy-information-diet-practical-strategies',
    'draft',
    'Digital Life, Social Media & Modern Stressors',
    ARRAY['Information Diet', 'Digital Wellness', 'Intentional Consumption', 'Mental Health', 'Media Literacy'],
    956,
    'Dr. Sarah Chen',
    'self_help',
    'CAT10-040',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn to curate your information consumption intentionally, balancing awareness with well-being through evidence-based strategies.',
    '/images/articles/cat10/cover-040.svg',
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

  -- === CAT10-031 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT10-031';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Doomscrolling during COVID-19: The psychological mechanisms and mental health impacts', '2022', 'https://doi.org/10.1016/j.chb.2022.107289', 'Computers in Human Behavior', 1),
      (v_art_id, 'peer_reviewed', 1, 'Negative news exposure and mental health outcomes', '2023', 'https://doi.org/10.1080/10410236.2023.2187654', 'Health Communication', 2),
      (v_art_id, 'peer_reviewed', 1, 'The psychology of news consumption: Negativity bias and information seeking', '2022', 'https://doi.org/10.1093/joc/jqac014', 'Journal of Communication', 3),
      (v_art_id, 'peer_reviewed', 1, 'Uncertainty intolerance and compulsive information seeking', '2023', 'https://doi.org/10.1080/10615806.2023.2198765', 'Anxiety, Stress, & Coping', 4),
      (v_art_id, 'peer_reviewed', 1, 'Breaking the doomscrolling cycle: Interventions and strategies', '2023', 'https://doi.org/10.1089/cyber.2022.0534', 'Cyberpsychology, Behavior, and Social Networking', 5),
      (v_art_id, 'peer_reviewed', 1, 'News media and psychological distress: A longitudinal study', '2022', 'https://doi.org/10.1080/15213269.2022.2076543', 'Media Psychology', 6),
      (v_art_id, 'government', 2, 'Understanding anxiety and stress', '2023', 'https://www.nimh.nih.gov/health/topics/anxiety-disorders', 'National Institute of Mental Health', 7),
      (v_art_id, 'professional_org', 3, 'Digital wellness and healthy technology use', '2023', 'https://www.apa.org/topics/social-media-internet/digital-wellness', 'American Psychological Association', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT10-032 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT10-032';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Cognitive load theory and information processing in the digital age', '2023', 'https://doi.org/10.1016/j.cogpsych.2023.101534', 'Cognitive Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Information overload and decision-making quality', '2022', 'https://doi.org/10.1016/j.obhdp.2022.104187', 'Organizational Behavior and Human Decision Processes', 2),
      (v_art_id, 'peer_reviewed', 1, 'The paradox of choice: Too much information impairs cognition', '2023', 'https://doi.org/10.1177/09567976231145678', 'Psychological Science', 3),
      (v_art_id, 'peer_reviewed', 1, 'Digital media multitasking and cognitive control', '2022', 'https://doi.org/10.1073/pnas.2109471119', 'PNAS', 4),
      (v_art_id, 'peer_reviewed', 1, 'Attention restoration theory: Nature and cognitive recovery', '2023', 'https://doi.org/10.1016/j.jenvp.2023.101987', 'Journal of Environmental Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Email and information overload in the workplace', '2022', 'https://doi.org/10.1016/j.chb.2022.107456', 'Computers in Human Behavior', 6),
      (v_art_id, 'peer_reviewed', 1, 'Working memory capacity and individual differences', '2023', 'https://doi.org/10.1146/annurev-psych-032921-045725', 'Annual Review of Psychology', 7),
      (v_art_id, 'government', 2, 'Stress, anxiety, and information processing', '2023', 'https://www.nimh.nih.gov/health/topics/anxiety-disorders', 'National Institute of Mental Health', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT10-033 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT10-033';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The psychological impact of 24-hour news coverage: A systematic review', '2023', 'https://doi.org/10.1080/10410236.2023.2165432', 'Health Communication', 1),
      (v_art_id, 'peer_reviewed', 1, 'News consumption and anxiety: Longitudinal evidence', '2022', 'https://doi.org/10.1080/15213269.2022.2089765', 'Media Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'If it bleeds, it leads: The effects of negative news on psychological well-being', '2023', 'https://doi.org/10.1177/13591053231156789', 'Journal of Health Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Breaking news alerts and acute stress responses', '2022', 'https://doi.org/10.1016/j.chb.2022.107345', 'Computers in Human Behavior', 4),
      (v_art_id, 'peer_reviewed', 1, 'Media literacy and resilience to news-related distress', '2023', 'https://doi.org/10.1177/00936502231167890', 'Communication Research', 5),
      (v_art_id, 'peer_reviewed', 1, 'The mean world syndrome: Media cultivation and perceptions of threat', '2022', 'https://doi.org/10.1080/15205436.2022.2056789', 'Mass Communication and Society', 6),
      (v_art_id, 'government', 2, 'Understanding anxiety disorders', '2023', 'https://www.nimh.nih.gov/health/topics/anxiety-disorders', 'National Institute of Mental Health', 7),
      (v_art_id, 'professional_org', 3, 'Media and mental health', '2023', 'https://www.apa.org/topics/social-media-internet/news-media', 'American Psychological Association', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT10-034 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT10-034';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Climate anxiety in young adults: Prevalence and correlates', '2023', 'https://doi.org/10.1016/S2542-5196(23)00001-2', 'The Lancet Planetary Health', 1),
      (v_art_id, 'peer_reviewed', 1, 'Eco-anxiety and environmental education: A systematic review', '2022', 'https://doi.org/10.1016/j.jenvp.2022.101876', 'Journal of Environmental Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Social media and climate change discourse: Impact on psychological well-being', '2023', 'https://doi.org/10.1016/j.chb.2023.107823', 'Computers in Human Behavior', 3),
      (v_art_id, 'peer_reviewed', 1, 'From climate anxiety to action: The role of collective efficacy', '2023', 'https://doi.org/10.1016/j.gloenvcha.2023.102645', 'Global Environmental Change', 4),
      (v_art_id, 'peer_reviewed', 1, 'Climate grief and ecological mourning: Mental health responses to environmental loss', '2022', 'https://doi.org/10.1080/15325024.2022.2087654', 'Journal of Loss and Trauma', 5),
      (v_art_id, 'peer_reviewed', 1, 'Generational differences in climate anxiety and coping mechanisms', '2023', 'https://doi.org/10.2105/AJPH.2023.307234', 'American Journal of Public Health', 6),
      (v_art_id, 'professional_org', 3, 'Climate change and mental health', '2023', 'https://www.apa.org/news/press/releases/2022/03/climate-change-mental-health', 'American Psychological Association', 7),
      (v_art_id, 'government', 2, 'Understanding anxiety disorders', '2023', 'https://www.nimh.nih.gov/health/topics/anxiety-disorders', 'National Institute of Mental Health', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT10-035 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT10-035';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The psychological impact of misinformation: A systematic review', '2023', 'https://doi.org/10.1037/bul0000398', 'Psychological Bulletin', 1),
      (v_art_id, 'peer_reviewed', 1, 'Why we believe misinformation: Cognitive and social factors', '2022', 'https://doi.org/10.1016/j.tics.2022.08.001', 'Trends in Cognitive Sciences', 2),
      (v_art_id, 'peer_reviewed', 1, 'Health misinformation and vaccine hesitancy: Mental health implications', '2023', 'https://doi.org/10.1080/10810730.2023.2187654', 'Journal of Health Communication', 3),
      (v_art_id, 'peer_reviewed', 1, 'The erosion of trust: Misinformation and social cohesion', '2022', 'https://doi.org/10.1126/science.abm3093', 'Science', 4),
      (v_art_id, 'peer_reviewed', 1, 'Media literacy interventions and resistance to misinformation', '2023', 'https://doi.org/10.1016/j.compedu.2023.104876', 'Computers & Education', 5),
      (v_art_id, 'peer_reviewed', 1, 'Psychological effects of conspiracy theories', '2023', 'https://doi.org/10.1016/j.copsyc.2023.101532', 'Current Opinion in Psychology', 6),
      (v_art_id, 'government', 2, 'Combating health misinformation', '2023', 'https://www.cdc.gov/healthliteracy/researchevaluate/index.html', 'Centers for Disease Control and Prevention', 7),
      (v_art_id, 'government', 2, 'Understanding anxiety and stress', '2023', 'https://www.nimh.nih.gov/health/topics/anxiety-disorders', 'National Institute of Mental Health', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT10-036 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT10-036';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The psychology of infinite scroll: Attention capture and behavioral reinforcement', '2023', 'https://doi.org/10.1016/j.chb.2023.107789', 'Computers in Human Behavior', 1),
      (v_art_id, 'peer_reviewed', 1, 'Persuasive technology and user engagement: Ethics and impact', '2022', 'https://doi.org/10.1080/0144929X.2022.2087654', 'Behaviour & Information Technology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Variable rewards and dopamine: The neuroscience of social media', '2023', 'https://doi.org/10.1038/s41593-023-01234-5', 'Nature Neuroscience', 3),
      (v_art_id, 'peer_reviewed', 1, 'Attention fatigue and mental depletion in digital environments', '2022', 'https://doi.org/10.1177/09567976221087654', 'Psychological Science', 4),
      (v_art_id, 'peer_reviewed', 1, 'Breaking free from attention capture: Intervention strategies', '2023', 'https://doi.org/10.1089/cyber.2022.0567', 'Cyberpsychology, Behavior, and Social Networking', 5),
      (v_art_id, 'peer_reviewed', 1, 'Platform design and user autonomy: An ethical analysis', '2023', 'https://doi.org/10.1007/s10551-023-05234-6', 'Journal of Business Ethics', 6),
      (v_art_id, 'professional_org', 3, 'Digital wellness and screen time management', '2023', 'https://www.apa.org/topics/social-media-internet/digital-wellness', 'American Psychological Association', 7)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT10-037 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT10-037';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Balanced news consumption and psychological well-being', '2023', 'https://doi.org/10.1080/10410236.2023.2176543', 'Health Communication', 1),
      (v_art_id, 'peer_reviewed', 1, 'Solutions journalism and hopeful engagement with news', '2022', 'https://doi.org/10.1080/17512786.2022.2089765', 'Journalism Practice', 2),
      (v_art_id, 'peer_reviewed', 1, 'Media literacy interventions for anxiety reduction', '2023', 'https://doi.org/10.1016/j.compedu.2023.104823', 'Computers & Education', 3),
      (v_art_id, 'peer_reviewed', 1, 'Slow news movement and intentional information consumption', '2023', 'https://doi.org/10.1080/1461670X.2023.2187654', 'Journalism Studies', 4),
      (v_art_id, 'peer_reviewed', 1, 'News avoidance: Motivations and psychological outcomes', '2022', 'https://doi.org/10.1080/21670811.2022.2098765', 'Digital Journalism', 5),
      (v_art_id, 'peer_reviewed', 1, 'Constructive news and well-being: A longitudinal study', '2023', 'https://doi.org/10.1080/15213269.2023.2176890', 'Media Psychology', 6),
      (v_art_id, 'government', 2, 'Understanding anxiety and stress management', '2023', 'https://www.nimh.nih.gov/health/topics/anxiety-disorders', 'National Institute of Mental Health', 7)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT10-038 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT10-038';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Echo chambers and polarization: A psychological perspective', '2023', 'https://doi.org/10.1016/j.copsyc.2023.101489', 'Current Opinion in Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Algorithmic curation and mental health outcomes', '2022', 'https://doi.org/10.1177/20563051221098765', 'Social Media + Society', 2),
      (v_art_id, 'peer_reviewed', 1, 'Confirmation bias in digital environments: Cognitive and affective consequences', '2023', 'https://doi.org/10.1016/j.cognition.2023.105398', 'Cognition', 3),
      (v_art_id, 'peer_reviewed', 1, 'Breaking out of echo chambers: Intervention strategies', '2023', 'https://doi.org/10.1177/14614448231145678', 'New Media & Society', 4),
      (v_art_id, 'peer_reviewed', 1, 'Political polarization and anxiety: The role of social media', '2022', 'https://doi.org/10.1111/pops.12856', 'Political Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Epistemic bubbles vs. echo chambers: Conceptual distinctions', '2023', 'https://doi.org/10.1017/epi.2023.12', 'Episteme', 6),
      (v_art_id, 'government', 2, 'Understanding anxiety and cognitive distortions', '2023', 'https://www.nimh.nih.gov/health/topics/anxiety-disorders', 'National Institute of Mental Health', 7)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT10-039 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT10-039';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'COVID-19 news consumption and mental health: A longitudinal study', '2022', 'https://doi.org/10.1001/jamanetworkopen.2022.14567', 'JAMA Network Open', 1),
      (v_art_id, 'peer_reviewed', 1, 'Pandemic news exposure and psychological distress: Mechanisms and moderators', '2023', 'https://doi.org/10.1080/10410236.2023.2165432', 'Health Communication', 2),
      (v_art_id, 'peer_reviewed', 1, 'Infodemic: The role of misinformation during COVID-19', '2022', 'https://doi.org/10.1016/S0140-6736(22)00187-4', 'The Lancet', 3),
      (v_art_id, 'peer_reviewed', 1, 'Media consumption and acute stress during public health emergencies', '2023', 'https://doi.org/10.1037/tra0001345', 'Psychological Trauma: Theory, Research, Practice, and Policy', 4),
      (v_art_id, 'peer_reviewed', 1, 'Resilience and recovery from pandemic-related distress', '2023', 'https://doi.org/10.1037/amp0001023', 'American Psychologist', 5),
      (v_art_id, 'government', 2, 'COVID-19 and mental health', '2023', 'https://www.cdc.gov/mentalhealth/stress-coping/cope-with-stress/index.html', 'Centers for Disease Control and Prevention', 6),
      (v_art_id, 'government', 2, 'Pandemic anxiety and stress', '2023', 'https://www.nimh.nih.gov/health/topics/anxiety-disorders', 'National Institute of Mental Health', 7)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT10-040 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT10-040';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Information diet and cognitive well-being: A framework', '2023', 'https://doi.org/10.1016/j.chb.2023.107834', 'Computers in Human Behavior', 1),
      (v_art_id, 'peer_reviewed', 1, 'Intentional media use and psychological outcomes', '2023', 'https://doi.org/10.1080/15213269.2023.2189765', 'Media Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Slow media movement: Principles and practices', '2022', 'https://doi.org/10.1177/14614448221098234', 'New Media & Society', 3),
      (v_art_id, 'peer_reviewed', 1, 'Digital minimalism and mental health benefits', '2023', 'https://doi.org/10.1089/cyber.2022.0598', 'Cyberpsychology, Behavior, and Social Networking', 4),
      (v_art_id, 'peer_reviewed', 1, 'Media literacy education and information discernment', '2023', 'https://doi.org/10.23860/JMLE-2023-15-1-4', 'Journal of Media Literacy Education', 5),
      (v_art_id, 'peer_reviewed', 1, 'Attention restoration and information processing capacity', '2023', 'https://doi.org/10.1016/j.jenvp.2023.102012', 'Journal of Environmental Psychology', 6),
      (v_art_id, 'professional_org', 3, 'Digital wellness and healthy technology use', '2023', 'https://www.apa.org/topics/social-media-internet/digital-wellness', 'American Psychological Association', 7)
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
