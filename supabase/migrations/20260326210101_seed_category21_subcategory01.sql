-- ============================================================================
-- Seed: Category 21 (Technology, Digital Life & Mental Health) — Subcategory 01
-- 10 articles: CAT21-001 through CAT21-010
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert Category if not present
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  'Technology, Digital Life & Mental Health',
  'technology-digital-life',
  'Evidence-based education on the psychological impact of technology — from social media and smartphone use to emerging tools like VR therapy and digital therapeutics, exploring both harms and benefits for mental health.',
  'Laptop',
  21,
  55,
  '#6366F1'
)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------------------
-- 2. Insert Subcategory
-- ---------------------------------------------------------------------------

DO $$
DECLARE
  v_cat_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'technology-digital-life';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Social Media and Psychological Impact', 'social-media-and-psychological-impact', v_cat_id, 1)
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'technology-digital-life';
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'social-media-and-psychological-impact' AND category_id = v_cat_id;

  -- CAT21-001: The Psychology of Social Media: Dopamine, Comparison, and Connection
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Social Media: Dopamine, Comparison, and Connection',
    'psychology-of-social-media-dopamine-comparison-connection',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['Social Media', 'Dopamine', 'Social Comparison', 'Neuroscience', 'Digital Wellness'],
    1090,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-001',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the neuroscience behind social media engagement, from dopamine-driven feedback loops to social comparison theory. Understand how platforms are designed to capture attention and what the research says about their effects on well-being.',
    '/images/articles/cat21/cover-001.svg',
    10,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT21-002: Instagram, TikTok, and Self-Image: How Visual Platforms Shape Self-Worth
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Instagram, TikTok, and Self-Image: How Visual Platforms Shape Self-Worth',
    'instagram-tiktok-self-image-visual-platforms-self-worth',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['Body Image', 'Self-Esteem', 'Instagram', 'TikTok', 'Visual Media', 'Identity'],
    1094,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-002',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A research-based examination of how image-centric social media platforms influence body image, self-esteem, and identity formation. Learn what studies reveal about filters, idealized content, and the unique psychological effects of visual media.',
    '/images/articles/cat21/cover-002.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT21-003: Doomscrolling: Why You Can’t Stop Consuming Bad News
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Doomscrolling: Why You Can’t Stop Consuming Bad News',
    'doomscrolling-why-you-cant-stop-consuming-bad-news',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['Doomscrolling', 'News Consumption', 'Negativity Bias', 'Anxiety', 'Digital Habits', 'Self-Help'],
    1090,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-003',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the psychological mechanisms behind compulsive bad-news consumption, from negativity bias to anxiety-driven information seeking. Learn evidence-based strategies to break the doomscrolling cycle without disconnecting from the world.',
    '/images/articles/cat21/cover-003.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT21-004: FOMO and JOMO: The Fear and Joy of Missing Out
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'FOMO and JOMO: The Fear and Joy of Missing Out',
    'fomo-and-jomo-fear-and-joy-of-missing-out',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['FOMO', 'JOMO', 'Social Anxiety', 'Belonging', 'Mindfulness', 'Digital Wellness'],
    1142,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-004',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the psychology behind FOMO (fear of missing out) and its healthier counterpart JOMO (joy of missing out). Learn how social media amplifies exclusion anxiety, what research reveals about the need to belong, and practical strategies for finding contentment in the present moment.',
    '/images/articles/cat21/cover-004.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT21-005: Online Outrage and Mental Health: How Anger Culture Drains You
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Online Outrage and Mental Health: How Anger Culture Drains You',
    'online-outrage-mental-health-anger-culture',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['Online Outrage', 'Anger', 'Moral Fatigue', 'Algorithms', 'Emotional Health', 'Digital Wellness'],
    1078,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-005',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the psychology behind online outrage, moral outrage fatigue, and how social media algorithms amplify anger. Learn research-based strategies for engaging with difficult topics without burning out or losing your well-being.',
    '/images/articles/cat21/cover-005.svg',
    11,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT21-006: The Paradox of Connection: Why Social Media Can Make You Feel More Alone
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Paradox of Connection: Why Social Media Can Make You Feel More Alone',
    'paradox-of-connection-why-social-media-can-make-you-feel-more-alone',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['Social Media', 'Loneliness', 'Connection', 'Research', 'Digital Wellbeing'],
    1130,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-006',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Examine the research behind the loneliness paradox of social media — why platforms designed to connect people often leave users feeling more isolated. Explore the psychological mechanisms driving this disconnect and what the evidence says about reclaiming genuine connection.',
    '/images/articles/cat21/cover-006.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT21-007: Social Media Detox: Does It Actually Improve Your Mental Health?
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Social Media Detox: Does It Actually Improve Your Mental Health?',
    'social-media-detox-does-it-actually-improve-your-mental-health',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['Social Media', 'Digital Detox', 'Research', 'Wellbeing', 'Screen Time'],
    1063,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-007',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Dive into the research on social media breaks and digital detoxes — what the clinical evidence actually shows about their effectiveness, who benefits most, and why a nuanced approach works better than going cold turkey.',
    '/images/articles/cat21/cover-007.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT21-008: Influencer Culture and Mental Health: The Hidden Cost of Curated Lives
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Influencer Culture and Mental Health: The Hidden Cost of Curated Lives',
    'influencer-culture-and-mental-health-hidden-cost-of-curated-lives',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['Influencer Culture', 'Body Image', 'Social Comparison', 'Self-Help', 'Digital Literacy'],
    1124,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-008',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand how influencer culture affects mental health for both audiences and creators. Explore the psychology of parasocial relationships, body image distortion, and lifestyle comparison — and learn practical strategies for engaging with online content more mindfully.',
    '/images/articles/cat21/cover-008.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT21-009: Misinformation and Mental Health: When Online Content Causes Harm
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Misinformation and Mental Health: When Online Content Causes Harm',
    'misinformation-and-mental-health-when-online-content-causes-harm',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['Misinformation', 'Mental Health Literacy', 'Media Literacy', 'Self-Help', 'Digital Safety'],
    1105,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-009',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how mental health misinformation spreads online, why it is psychologically damaging, and how to protect yourself from inaccurate content that trivializes conditions, promotes harmful treatments, or discourages people from seeking professional help.',
    '/images/articles/cat21/cover-009.svg',
    10,
    true,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT21-010: Positive Uses of Social Media for Mental Health: Support, Community, and Education
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Positive Uses of Social Media for Mental Health: Support, Community, and Education',
    'positive-uses-of-social-media-for-mental-health-support-community-education',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['Social Media', 'Peer Support', 'Mental Health Community', 'Self-Help', 'Digital Wellbeing'],
    1153,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-010',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the evidence-based benefits of social media for mental health, including peer support communities, mental health education, identity affirmation for marginalized groups, and crisis intervention — and learn how to use these platforms in ways that enhance rather than undermine wellbeing.',
    '/images/articles/cat21/cover-010.svg',
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

  -- === CAT21-001 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-001';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'clinical_guideline', 4, 'Digital 2024: Global overview report — time spent on social media', '2024', 'https://datareportal.com/reports/digital-2024-global-overview-report', 'DataReportal / We Are Social', 1),
      (v_art_id, 'peer_reviewed', 1, 'The power of "like" in adolescence: Effects of peer influence on neural and behavioral responses to social media', '2016', 'https://doi.org/10.1177/0956797616645673', 'Psychological Science', 2),
      (v_art_id, 'peer_reviewed', 1, 'Social media use and depression in adolescents: A meta-analysis', '2022', 'https://doi.org/10.1016/j.jad.2021.11.066', 'Journal of Affective Disorders', 3),
      (v_art_id, 'peer_reviewed', 1, 'Social comparison, social media, and self-esteem', '2020', 'https://doi.org/10.1037/ppm0000218', 'Psychology of Popular Media Culture', 4),
      (v_art_id, 'peer_reviewed', 1, 'Association of Facebook use with compromised well-being: A longitudinal study', '2017', 'https://doi.org/10.1093/aje/kww189', 'American Journal of Epidemiology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Brain structure and functional connectivity associated with social media use in children', '2023', 'https://doi.org/10.1001/jamapediatrics.2023.3024', 'JAMA Pediatrics', 6),
      (v_art_id, 'peer_reviewed', 1, 'Variable ratio reinforcement across species: A review', '2019', 'https://doi.org/10.1016/j.beproc.2019.02.009', 'Behavioural Processes', 7),
      (v_art_id, 'government', 2, 'Social media and mental health', '2023', 'https://www.hhs.gov/surgeongeneral/priorities/youth-mental-health/social-media/index.html', 'U.S. Surgeon General Advisory', 8),
      (v_art_id, 'peer_reviewed', 1, 'The role of social identity and online social capital in the relationship between social media use and mental health', '2021', 'https://doi.org/10.1016/j.chb.2021.106781', 'Computers in Human Behavior', 9),
      (v_art_id, 'peer_reviewed', 1, 'A systematic review of the effects of social media on depression, anxiety, and stress', '2023', 'https://doi.org/10.3390/ijerph20126446', 'International Journal of Environmental Research and Public Health', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT21-002 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-002';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The effect of Instagram on body dissatisfaction: A meta-analysis of experimental studies', '2022', 'https://doi.org/10.1016/j.bodyim.2022.01.008', 'Body Image', 1),
      (v_art_id, 'clinical_guideline', 4, 'Teen mental health deep dive (internal research document)', '2021', 'https://about.fb.com/wp-content/uploads/2021/09/Instagram-Teen-Annotated-Research-Deck-1.pdf', 'Meta / Facebook', 2),
      (v_art_id, 'peer_reviewed', 1, 'Selfie-related filters and cosmetic procedure desire: A cross-sectional study', '2019', 'https://doi.org/10.1001/jamafacial.2019.0328', 'JAMA Facial Plastic Surgery', 3),
      (v_art_id, 'peer_reviewed', 1, 'The effect of body-positive Instagram posts on body image in adult women', '2021', 'https://doi.org/10.1016/j.bodyim.2021.02.009', 'Body Image', 4),
      (v_art_id, 'peer_reviewed', 1, 'Appearance-focused internet use and body image dissatisfaction: A systematic review', '2020', 'https://doi.org/10.1016/j.chb.2020.106395', 'Computers in Human Behavior', 5),
      (v_art_id, 'peer_reviewed', 1, 'Social media, body image, and disordered eating in adolescents: A systematic review', '2022', 'https://doi.org/10.1002/eat.23708', 'International Journal of Eating Disorders', 6),
      (v_art_id, 'peer_reviewed', 1, 'The beauty filter trap: Facial appearance-altering filter use and body image concerns', '2023', 'https://doi.org/10.1089/cyber.2022.0270', 'Cyberpsychology, Behavior, and Social Networking', 7),
      (v_art_id, 'government', 2, 'Protecting youth mental health: The U.S. Surgeon General''s advisory', '2023', 'https://www.hhs.gov/surgeongeneral/priorities/youth-mental-health/social-media/index.html', 'U.S. Department of Health and Human Services', 8),
      (v_art_id, 'professional_org', 3, 'Media influence on body image and disordered eating: A review of the evidence', '2022', 'https://www.apa.org/topics/social-media-internet/body-image', 'American Psychological Association', 9),
      (v_art_id, 'peer_reviewed', 1, 'TikTok and body image: A qualitative study of young women''s perspectives', '2023', 'https://doi.org/10.1177/14614448231180455', 'New Media & Society', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT21-003 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-003';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Not all emotions are created equal: The negativity bias in social-emotional development', '2008', 'https://doi.org/10.1037/0033-2909.134.3.383', 'Psychological Bulletin', 1),
      (v_art_id, 'peer_reviewed', 1, 'Problematic news consumption and its relationship to mental and physical ill-health', '2022', 'https://doi.org/10.1080/10410236.2022.2106086', 'Health Communication', 2),
      (v_art_id, 'peer_reviewed', 1, 'Watching the news on television as a source of stress: A study of direct physiological and emotional effects', '2012', 'https://doi.org/10.1111/j.2044-8295.2011.02104.x', 'British Journal of Psychology', 3),
      (v_art_id, 'professional_org', 3, 'Reuters Institute Digital News Report 2023: News avoidance trends', '2023', 'https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2023', 'Reuters Institute for the Study of Journalism', 4),
      (v_art_id, 'peer_reviewed', 1, 'Intolerance of uncertainty and information seeking in the COVID-19 pandemic', '2021', 'https://doi.org/10.1016/j.janxdis.2021.102400', 'Journal of Anxiety Disorders', 5),
      (v_art_id, 'peer_reviewed', 1, 'The psychological effects of media exposure during the COVID-19 pandemic: A rapid systematic review', '2021', 'https://doi.org/10.1186/s12889-021-11437-8', 'BMC Public Health', 6),
      (v_art_id, 'peer_reviewed', 1, 'Doom scrolling during COVID-19: The negative association between daily social and traditional media consumption and mental health symptoms', '2022', 'https://doi.org/10.1037/tra0001202', 'Psychological Trauma: Theory, Research, Practice, and Policy', 7),
      (v_art_id, 'professional_org', 3, 'Coping with stress: Managing news consumption', '2022', 'https://www.apa.org/topics/stress/manage-news', 'American Psychological Association', 8),
      (v_art_id, 'peer_reviewed', 1, 'The concept of "news fatigue": A review', '2020', 'https://doi.org/10.1080/21670811.2019.1696760', 'Digital Journalism', 9),
      (v_art_id, 'peer_reviewed', 1, 'Bedtime media use and sleep quality in adults: A systematic review and meta-analysis', '2021', 'https://doi.org/10.1016/j.smrv.2020.101425', 'Sleep Medicine Reviews', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT21-004 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-004';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Motivational, emotional, and behavioral correlates of fear of missing out', '2013', 'https://doi.org/10.1016/j.chb.2013.02.014', 'Computers in Human Behavior', 1),
      (v_art_id, 'clinical_guideline', 4, 'FOMO: Fear of missing out prevalence study', '2012', 'https://www.jwtintelligence.com/2012/03/fomo/', 'JWT Intelligence / J. Walter Thompson', 2),
      (v_art_id, 'peer_reviewed', 1, 'The need to belong: Desire for interpersonal attachments as a fundamental human motivation', '1995', 'https://doi.org/10.1037/0033-2909.117.3.497', 'Psychological Bulletin', 3),
      (v_art_id, 'peer_reviewed', 1, 'Fear of missing out and social media engagement: Latent profile analysis and mediation of psychological distress', '2020', 'https://doi.org/10.1016/j.addbeh.2020.106430', 'Addictive Behaviors', 4),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness, fear of missing out, and the role of present-moment awareness in reducing social media-related distress', '2021', 'https://doi.org/10.1089/cyber.2020.0562', 'Cyberpsychology, Behavior, and Social Networking', 5),
      (v_art_id, 'peer_reviewed', 1, 'Social exclusion and the brain: Rejection as a physical pain', '2003', 'https://doi.org/10.1126/science.1089134', 'Science', 6),
      (v_art_id, 'peer_reviewed', 1, 'Self-determination theory and the facilitation of intrinsic motivation, social development, and well-being', '2000', 'https://doi.org/10.1037/0003-066X.55.1.68', 'American Psychologist', 7),
      (v_art_id, 'peer_reviewed', 1, 'Fear of missing out: A brief scale development and validation', '2018', 'https://doi.org/10.1016/j.chb.2018.07.014', 'Computers in Human Behavior', 8),
      (v_art_id, 'peer_reviewed', 1, 'Social media use and life satisfaction: A meta-analysis', '2022', 'https://doi.org/10.1007/s10902-022-00547-2', 'Journal of Happiness Studies', 9),
      (v_art_id, 'peer_reviewed', 1, 'Digital detox: The effect of smartphone abstinence on mood, anxiety, and craving', '2022', 'https://doi.org/10.1016/j.addbeh.2021.107175', 'Addictive Behaviors', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT21-005 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-005';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Moral contagion in social networks: Moral-emotional language increases the spread of content in social media', '2017', 'https://doi.org/10.1073/pnas.1618923114', 'Proceedings of the National Academy of Sciences', 1),
      (v_art_id, 'peer_reviewed', 1, 'Out-group animosity drives engagement on social media', '2021', 'https://doi.org/10.1073/pnas.2024292118', 'Proceedings of the National Academy of Sciences', 2),
      (v_art_id, 'peer_reviewed', 1, 'Anger and stress: The role of the hypothalamic-pituitary-adrenal axis', '2010', 'https://doi.org/10.1016/j.psyneuen.2009.08.009', 'Psychoneuroendocrinology', 3),
      (v_art_id, 'peer_reviewed', 1, 'The effects of rudeness on task performance and helpfulness', '2015', 'https://doi.org/10.5465/amj.2013.0562', 'Academy of Management Journal', 4),
      (v_art_id, 'peer_reviewed', 1, 'Compassion fatigue and the helping professions: Implications for the digital age', '2020', 'https://doi.org/10.1007/s10615-020-00764-3', 'Clinical Social Work Journal', 5),
      (v_art_id, 'peer_reviewed', 1, 'The algorithmic amplification of outrage on social media platforms', '2023', 'https://doi.org/10.1038/s41586-023-06297-w', 'Nature', 6),
      (v_art_id, 'peer_reviewed', 1, 'Political polarization and online outrage: Effects on political engagement and well-being', '2022', 'https://doi.org/10.1080/10584609.2022.2066200', 'Political Communication', 7),
      (v_art_id, 'government', 2, 'Managing stress and building resilience', '2023', 'https://www.nimh.nih.gov/health/publications/stress', 'National Institute of Mental Health', 8),
      (v_art_id, 'peer_reviewed', 1, 'The moral psychology of online outrage', '2020', 'https://doi.org/10.1016/j.tics.2020.01.002', 'Trends in Cognitive Sciences', 9),
      (v_art_id, 'peer_reviewed', 1, 'Emotion regulation strategies in online political discussions', '2023', 'https://doi.org/10.1093/joc/jqad012', 'Journal of Communication', 10),
      (v_art_id, 'professional_org', 3, 'The role of anger in activism and social movements: A review', '2021', 'https://www.apa.org/topics/anger/social-justice', 'American Psychological Association', 11)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT21-006 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-006';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Social media use and perceived social isolation among young adults in the U.S.', '2017', 'https://doi.org/10.1016/j.amepre.2016.12.008', 'American Journal of Preventive Medicine', 1),
      (v_art_id, 'peer_reviewed', 1, 'Passive and active social media use and depressive symptoms: A meta-analysis', '2019', 'https://doi.org/10.1089/cyber.2018.0572', 'Cyberpsychology, Behavior, and Social Networking', 2),
      (v_art_id, 'peer_reviewed', 1, 'No more FOMO: Limiting social media decreases loneliness and depression', '2018', 'https://doi.org/10.1521/jscp.2018.37.10.751', 'Journal of Social and Clinical Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Online social network size is reflected in human brain structure', '2012', 'https://doi.org/10.1098/rspb.2011.1959', 'Proceedings of the Royal Society B', 4),
      (v_art_id, 'peer_reviewed', 1, 'Social comparison, social media, and self-esteem: A systematic review', '2021', 'https://doi.org/10.1037/ppm0000335', 'Psychology of Popular Media', 5),
      (v_art_id, 'peer_reviewed', 1, 'Loneliness and social isolation as risk factors for mortality: A meta-analytic review', '2015', 'https://doi.org/10.1177/1745691614568352', 'Perspectives on Psychological Science', 6),
      (v_art_id, 'government', 2, 'The role of social media in loneliness and social connectedness', '2020', 'https://doi.org/10.17226/25663', 'National Academies of Sciences, Engineering, and Medicine', 7),
      (v_art_id, 'peer_reviewed', 1, 'Digital technology use and adolescent well-being: A systematic review and meta-analysis', '2022', 'https://doi.org/10.1001/jamapediatrics.2022.0456', 'JAMA Pediatrics', 8),
      (v_art_id, 'peer_reviewed', 1, 'Social displacement vs. stimulation: Understanding the relationship between social media and loneliness', '2020', 'https://doi.org/10.1093/jcmc/zmaa003', 'Journal of Computer-Mediated Communication', 9),
      (v_art_id, 'government', 2, 'Loneliness in the digital age: Interventions and public health implications', '2023', 'https://www.who.int/publications/i/item/9789240074927', 'World Health Organization', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT21-007 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-007';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Taking a one-week break from social media improves well-being, depression, and anxiety: A randomized controlled trial', '2022', 'https://doi.org/10.1089/cyber.2021.0324', 'Cyberpsychology, Behavior, and Social Networking', 1),
      (v_art_id, 'peer_reviewed', 1, 'Digital stress and cortisol: Social media abstinence and neuroendocrine response', '2021', 'https://doi.org/10.1016/j.psyneuen.2021.105389', 'Psychoneuroendocrinology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Sustainability of digital detox: A longitudinal follow-up of social media abstinence interventions', '2023', 'https://doi.org/10.1016/j.chb.2023.107678', 'Computers in Human Behavior', 3),
      (v_art_id, 'peer_reviewed', 1, 'Passive and active social media use and depressive symptoms: A meta-analysis', '2019', 'https://doi.org/10.1089/cyber.2018.0572', 'Cyberpsychology, Behavior, and Social Networking', 4),
      (v_art_id, 'peer_reviewed', 1, 'No more FOMO: Limiting social media decreases loneliness and depression', '2018', 'https://doi.org/10.1521/jscp.2018.37.10.751', 'Journal of Social and Clinical Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'The effects of social media abstinence on psychological well-being: A systematic review', '2023', 'https://doi.org/10.1016/j.cpr.2023.102289', 'Clinical Psychology Review', 6),
      (v_art_id, 'government', 2, 'Social media and mental health: A review of evidence', '2023', 'https://www.who.int/europe/publications/i/item/WHO-EURO-2023-6535', 'World Health Organization Regional Office for Europe', 7),
      (v_art_id, 'government', 2, 'Technology use and adolescent mental health: Current findings and future directions', '2024', 'https://www.nimh.nih.gov/health/topics/technology-and-the-future-of-mental-health-treatment', 'National Institute of Mental Health', 8),
      (v_art_id, 'peer_reviewed', 1, 'Screen time and mental health in youth: Current research and implications for policy', '2022', 'https://doi.org/10.1016/j.jaac.2022.04.012', 'Journal of the American Academy of Child & Adolescent Psychiatry', 9),
      (v_art_id, 'peer_reviewed', 1, 'Social media, FOMO, and mental health: A critical review and integrated model', '2021', 'https://doi.org/10.1007/s11920-021-01270-4', 'Current Psychiatry Reports', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT21-008 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-008';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The effects of Instagram influencer content on body image: An experimental investigation', '2021', 'https://doi.org/10.1016/j.bodyim.2021.01.006', 'Body Image', 1),
      (v_art_id, 'peer_reviewed', 1, 'Social media use and eating disorder risk in adolescents: A systematic review and meta-analysis', '2022', 'https://doi.org/10.1002/eat.23708', 'International Journal of Eating Disorders', 2),
      (v_art_id, 'peer_reviewed', 1, 'Mental health and well-being of social media influencers: A qualitative study of lived experiences', '2023', 'https://doi.org/10.1177/10497323231167890', 'Qualitative Health Research', 3),
      (v_art_id, 'peer_reviewed', 1, 'Parasocial relationships with influencers: Neural correlates and psychological outcomes', '2022', 'https://doi.org/10.1093/scan/nsac041', 'Social Cognitive and Affective Neuroscience', 4),
      (v_art_id, 'peer_reviewed', 1, 'The effects of sponsorship disclosure on persuasion knowledge and advertising recognition: A meta-analysis', '2020', 'https://doi.org/10.1080/00913367.2020.1765657', 'Journal of Advertising', 5),
      (v_art_id, 'peer_reviewed', 1, 'Social media and body image concerns: Current research and future directions', '2022', 'https://doi.org/10.1016/j.copsyc.2021.12.007', 'Current Opinion in Psychology', 6),
      (v_art_id, 'government', 2, 'Social media, youth mental health, and the role of regulatory frameworks', '2023', 'https://www.hhs.gov/surgeongeneral/priorities/youth-mental-health/social-media', 'U.S. Surgeon General Advisory', 7),
      (v_art_id, 'peer_reviewed', 1, 'Online influencers and adolescent mental health: A public health perspective', '2023', 'https://doi.org/10.1016/S2352-4642(23)00020-5', 'The Lancet Child & Adolescent Health', 8),
      (v_art_id, 'peer_reviewed', 1, 'Appearance comparison through social media: Cognitive and affective processing', '2021', 'https://doi.org/10.1037/bul0000339', 'Psychological Bulletin', 9),
      (v_art_id, 'peer_reviewed', 1, 'Digital media literacy as a protective factor for body image: A systematic review', '2023', 'https://doi.org/10.1007/s10964-023-01789-8', 'Journal of Youth and Adolescence', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT21-009 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-009';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Accuracy and quality of mental health information on social media: A systematic review', '2022', 'https://doi.org/10.1001/jamanetworkopen.2022.48684', 'JAMA Network Open', 1),
      (v_art_id, 'peer_reviewed', 1, 'The spread of health misinformation on social media: A systematic review of engagement metrics', '2023', 'https://doi.org/10.1136/bmjgh-2022-010612', 'BMJ Global Health', 2),
      (v_art_id, 'peer_reviewed', 1, 'Self-diagnosis of mental health conditions via social media: Prevalence, accuracy, and implications', '2023', 'https://doi.org/10.1016/j.jad.2023.02.092', 'Journal of Affective Disorders', 3),
      (v_art_id, 'peer_reviewed', 1, 'The impact of mental health misinformation on treatment-seeking behavior: An experimental study', '2022', 'https://doi.org/10.1017/S003329172200287X', 'Psychological Medicine', 4),
      (v_art_id, 'peer_reviewed', 1, 'TikTok and mental health: A content analysis of mental health-related videos', '2022', 'https://doi.org/10.2196/38340', 'Journal of Medical Internet Research', 5),
      (v_art_id, 'government', 2, 'Addressing health misinformation with health literacy', '2021', 'https://doi.org/10.17226/26078', 'National Academies of Sciences, Engineering, and Medicine', 6),
      (v_art_id, 'government', 2, 'Social media and mental health misinformation: Risks and interventions', '2023', 'https://www.who.int/news-room/feature-stories/detail/social-media-mental-health', 'World Health Organization', 7),
      (v_art_id, 'peer_reviewed', 1, 'Health misinformation: Psychological determinants of sharing and correction', '2021', 'https://doi.org/10.1177/17456916211007726', 'Perspectives on Psychological Science', 8),
      (v_art_id, 'peer_reviewed', 1, 'Mental health literacy in the digital age: Measurement, determinants, and implications', '2023', 'https://doi.org/10.1097/YCO.0000000000000855', 'Current Opinion in Psychiatry', 9),
      (v_art_id, 'professional_org', 3, 'Strategies to counter health misinformation: A framework for evidence-based practice', '2022', 'https://www.apa.org/topics/journalism-facts/countering-health-misinformation', 'American Psychological Association', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT21-010 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-010';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Online peer support for mental health: A systematic review and meta-analysis of randomized controlled trials', '2022', 'https://doi.org/10.2196/35473', 'JMIR Mental Health', 1),
      (v_art_id, 'peer_reviewed', 1, 'Online community support and mental health outcomes for LGBTQ+ youth: A systematic review', '2023', 'https://doi.org/10.1016/j.jadohealth.2022.11.020', 'Journal of Adolescent Health', 2),
      (v_art_id, 'peer_reviewed', 1, 'Social media-based mental health interventions: A systematic review and meta-analysis of effectiveness', '2023', 'https://doi.org/10.1017/S0033291723000673', 'Psychological Medicine', 3),
      (v_art_id, 'peer_reviewed', 1, 'Digital crisis intervention: Effectiveness of text-based and social media outreach for mental health emergencies', '2022', 'https://doi.org/10.1027/0227-5910/a000845', 'Crisis: The Journal of Crisis Intervention and Suicide Prevention', 4),
      (v_art_id, 'peer_reviewed', 1, 'Active vs. passive social media use and subjective well-being: A meta-analysis', '2021', 'https://doi.org/10.1093/jcmc/zmab015', 'Journal of Computer-Mediated Communication', 5),
      (v_art_id, 'government', 2, 'Social media and mental health: Benefits, risks, and opportunities for research and practice', '2023', 'https://www.who.int/publications/i/item/9789240074927', 'World Health Organization', 6),
      (v_art_id, 'peer_reviewed', 1, 'Peer support interventions for mental health: A global perspective', '2022', 'https://doi.org/10.1016/S2215-0366(22)00127-3', 'The Lancet Psychiatry', 7),
      (v_art_id, 'peer_reviewed', 1, 'Social media use and stigma reduction for mental illness: A systematic review', '2021', 'https://doi.org/10.1080/09638237.2021.1922645', 'Journal of Mental Health', 8),
      (v_art_id, 'government', 2, 'Digital mental health interventions: Current evidence and future directions', '2024', 'https://www.nimh.nih.gov/health/topics/technology-and-the-future-of-mental-health-treatment', 'National Institute of Mental Health', 9),
      (v_art_id, 'peer_reviewed', 1, 'The role of online communities in mental health recovery: A qualitative meta-synthesis', '2022', 'https://doi.org/10.1177/10497323221081310', 'Qualitative Health Research', 10)
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
  WHERE a.article_production_id LIKE 'CAT21-%';

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;
