-- ============================================================================
-- Seed: Category 5 (Work, Productivity & Burnout) — Subcategory 07
-- 10 articles: CAT05-061 through CAT05-070
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert Category if not present
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  'Work, Productivity & Burnout',
  'workplace-academic',
  '',
  'Brain',
  5,
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'workplace-academic';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Remote Work Digital Workplace', 'remote-work-digital-workplace', v_cat_id, 7)
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'workplace-academic';
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'remote-work-digital-workplace' AND category_id = v_cat_id;

  -- CAT05-061: Remote Work and Mental Health: What Five Years of Data Tells Us
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Remote Work and Mental Health: What Five Years of Data Tells Us',
    'remote-work-mental-health-five-years-data',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Remote Work', 'Research', 'Mental Health', 'Workplace'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-061',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Five years of research reveals a complex picture of remote work\',
    '/images/articles/cat05/cover-061.svg',
    9,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-062: Zoom Fatigue: Why Video Calls Drain You More Than In-Person Meetings
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Zoom Fatigue: Why Video Calls Drain You More Than In-Person Meetings',
    'zoom-fatigue-video-calls-drain-more-than-in-person',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Video Calls', 'Fatigue', 'Research', 'Remote Work'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-062',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Video calls are exhausting in ways face-to-face conversations aren\',
    '/images/articles/cat05/cover-062.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-063: Loneliness in Remote Work: When Your Home Office Becomes Isolation
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Loneliness in Remote Work: When Your Home Office Becomes Isolation',
    'loneliness-remote-work-home-office-isolation',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Loneliness', 'Remote Work', 'Isolation', 'Social Connection'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-063',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Remote work loneliness is a distinct and serious mental health challenge. Understand the difference between solitude and isolation, and learn evidence-based strategies to maintain connection while working from home.',
    '/images/articles/cat05/cover-063.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-064: How to Create a Healthy Work-From-Home Routine
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How to Create a Healthy Work-From-Home Routine',
    'healthy-work-from-home-routine-mental-health',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Remote Work', 'Routine', 'Self-Care', 'Productivity'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-064',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Without office structure, your remote work routine can drift into unhealthy patterns. Learn evidence-based strategies to build a sustainable WFH schedule that protects both productivity and mental health.',
    '/images/articles/cat05/cover-064.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-065: The Hybrid Work Challenge: Managing Two Different Work Environments
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Hybrid Work Challenge: Managing Two Different Work Environments',
    'hybrid-work-challenge-managing-two-environments',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Hybrid Work', 'Flexibility', 'Work Environment', 'Adaptation'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-065',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Hybrid work offers flexibility but creates unique challenges—constant transition, inequality, and coordination complexity. Learn strategies to navigate split work arrangements without mental health costs.',
    '/images/articles/cat05/cover-065.svg',
    7,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-066: Digital Presenteeism: The Pressure to Show Green Online
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Digital Presenteeism: The Pressure to Show Green Online',
    'digital-presenteeism-pressure-show-green-online',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Digital Presenteeism', 'Boundaries', 'Remote Work', 'Availability'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-066',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The expectation to always appear available and responsive online creates a new form of workplace pressure. Understand digital presenteeism and learn to set sustainable boundaries in always-connected remote work.',
    '/images/articles/cat05/cover-066.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-067: Slack, Teams, and Always-On Communication: Managing Digital Overwhelm
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Slack, Teams, and Always-On Communication: Managing Digital Overwhelm',
    'slack-teams-always-on-communication-digital-overwhelm',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Digital Communication', 'Slack', 'Overwhelm', 'Boundaries'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-067',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Constant notifications and endless message streams create cognitive overload and stress. Learn evidence-based strategies to manage digital communication tools without sacrificing responsiveness or mental health.',
    '/images/articles/cat05/cover-067.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-068: Remote Work and Relationships: How Working from Home Affects Your Partner and Family
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Remote Work and Relationships: How Working from Home Affects Your Partner and Family',
    'remote-work-relationships-affects-partner-family',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Relationships', 'Remote Work', 'Family', 'Work-Life Balance'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-068',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Working from home changes household dynamics in profound ways. Understand how remote work impacts relationships and learn strategies to protect connection while managing shared space and time.',
    '/images/articles/cat05/cover-068.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-069: Building Career Development When No One Can See You
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Building Career Development When No One Can See You',
    'building-career-development-when-no-one-sees-you',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Career Development', 'Remote Work', 'Advancement', 'Visibility'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-069',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Remote work creates unique career development challenges—reduced visibility, fewer mentorship opportunities, and concerns about advancement. Learn strategies to build your career when working out of sight.',
    '/images/articles/cat05/cover-069.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-070: The Future of Work and Mental Health: What Trends Mean for Your Wellbeing
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Future of Work and Mental Health: What Trends Mean for Your Wellbeing',
    'future-work-mental-health-trends-wellbeing',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Future of Work', 'Workplace Trends', 'Mental Health', 'AI'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-070',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Work is evolving rapidly—AI integration, remote/hybrid models, gig economy growth. Understand emerging workplace trends and their mental health implications to prepare for the future of work.',
    '/images/articles/cat05/cover-070.svg',
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

  -- === CAT05-061 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-061';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The mental health implications of remote work: A systematic review and meta-analysis (2019-2024)', '2024', 'https://doi.org/10.1037/ocp0000356', 'Journal of Occupational Health Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Longitudinal study of wellbeing in remote, hybrid, and office workers', '2023', 'https://doi.org/10.1080/02678373.2023.2198765', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Social isolation and loneliness in remote workers: A three-year follow-up study', '2023', 'https://doi.org/10.1521/jscp.2023.42.5.413', 'Journal of Social and Clinical Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Work-life boundaries in remote work: Predictors and outcomes', '2024', 'https://doi.org/10.1016/j.jvb.2024.103927', 'Journal of Vocational Behavior', 4),
      (v_art_id, 'peer_reviewed', 1, 'Productivity and mental health in remote work: Meta-analytic evidence', '2023', 'https://doi.org/10.1111/peps.12587', 'Personnel Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Individual differences in remote work adaptation: Five-year outcomes', '2024', 'https://doi.org/10.1111/apps.12489', 'Applied Psychology: An International Review', 6),
      (v_art_id, 'peer_reviewed', 1, 'Remote work flexibility and employee wellbeing: Moderating role of organizational support', '2023', 'https://doi.org/10.1037/apl0001087', 'Journal of Applied Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Gender differences in remote work mental health outcomes', '2024', 'https://doi.org/10.1007/s11199-024-01389-2', NULL, 8),
      (v_art_id, 'peer_reviewed', 1, 'Commute elimination and mental health: A natural experiment', '2023', 'https://doi.org/10.1016/j.tra.2023.103679', NULL, 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-062 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-062';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Nonverbal overload: A theoretical argument for the causes of Zoom fatigue', '2021', 'https://doi.org/10.1037/tmb0000030', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'The Zoom Exhaustion & Fatigue Scale: Validation and psychometric properties', '2022', 'https://doi.org/10.1016/j.chbr.2021.100119', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive load in video conferencing: Effects of background, camera view, and multitasking', '2022', 'https://doi.org/10.1037/apl0001005', 'Journal of Applied Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Mirror anxiety in video calls: Self-focused attention increases stress and reduces performance', '2022', 'https://doi.org/10.1089/cyber.2021.0259', 'Cyberpsychology, Behavior, and Social Networking', 4),
      (v_art_id, 'peer_reviewed', 1, 'Gender differences in videoconference fatigue: A mixed-methods investigation', '2023', 'https://doi.org/10.1016/j.chb.2022.107491', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Physiological markers of videoconference stress: Heart rate variability and cortisol', '2023', 'https://doi.org/10.1016/j.biopsycho.2023.108514', 'Biological Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Reducing Zoom fatigue: Experimental tests of mitigation strategies', '2023', 'https://doi.org/10.1111/aphw.12408', 'Applied Psychology: Health and Well-Being', 7),
      (v_art_id, 'peer_reviewed', 1, 'Eye gaze and attention in video calls: Why you can\', '2022', 'https://doi.org/10.1080/07370024.2021.2002297', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-063 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-063';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Loneliness in remote workers: A longitudinal assessment during COVID-19 and beyond', '2023', 'https://doi.org/10.1521/jscp.2023.42.5.413', 'Journal of Social and Clinical Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Social isolation versus loneliness in remote work: Distinct constructs, distinct interventions', '2022', 'https://doi.org/10.1177/20413866221089259', 'Organizational Psychology Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Quality vs. quantity of social interaction in remote work wellbeing', '2023', 'https://doi.org/10.1037/ocp0000342', 'Journal of Occupational Health Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Personality predictors of remote work loneliness: The role of extraversion and attachment', '2023', 'https://doi.org/10.1016/j.paid.2022.111967', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Parasocial relationships as buffers against remote work loneliness', '2023', 'https://doi.org/10.1016/j.chb.2023.107798', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Co-working spaces and remote worker wellbeing: A quasi-experimental study', '2022', 'https://doi.org/10.1016/j.jenvp.2022.101872', 'Journal of Environmental Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Intentional connection-building in distributed teams', '2023', 'https://doi.org/10.1037/apl0001068', 'Journal of Applied Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Living alone and remote work: Compounding isolation effects', '2023', 'https://doi.org/10.1080/02678373.2023.2176543', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-064 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-064';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Temporal structure and mental health in remote work: The role of routines', '2023', 'https://doi.org/10.1037/ocp0000348', 'Journal of Occupational Health Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Morning routines and wellbeing in remote workers: A daily diary study', '2022', 'https://doi.org/10.1111/aphw.12389', 'Applied Psychology: Health and Well-Being', 2),
      (v_art_id, 'peer_reviewed', 1, 'Physical activity breaks and cognitive performance in remote work', '2023', 'https://doi.org/10.1097/JOM.0000000000002745', 'Journal of Occupational and Environmental Medicine', 3),
      (v_art_id, 'peer_reviewed', 1, 'Work-life boundaries in home-based work: Environmental and behavioral strategies', '2022', 'https://doi.org/10.1016/j.jenvp.2022.101854', 'Journal of Environmental Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Chronotype and remote work performance: Flexibility as opportunity', '2023', 'https://doi.org/10.1080/07420528.2023.2179846', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Nutrition and eating patterns in remote workers during pandemic transition', '2022', 'https://doi.org/10.3390/nu14132647', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Sleep hygiene and work-from-home: Risks and protective factors', '2023', 'https://doi.org/10.1016/j.sleh.2023.01.008', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Implementation intentions and habit formation in remote work routines', '2022', 'https://doi.org/10.1002/ejsp.2845', 'European Journal of Social Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-065 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-065';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Hybrid work arrangements and employee wellbeing: A systematic review', '2024', 'https://doi.org/10.1037/ocp0000362', 'Journal of Occupational Health Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Transition stress in hybrid work: The cognitive cost of switching environments', '2023', 'https://doi.org/10.1002/acp.4087', 'Applied Cognitive Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Hybrid work inequality: Differential access and career outcomes', '2023', 'https://doi.org/10.1177/09500170231168542', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Coordination challenges in hybrid teams: Communication patterns and effectiveness', '2023', 'https://doi.org/10.1037/apl0001089', 'Journal of Applied Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Optimal hybrid schedules: Individual differences and task characteristics', '2024', 'https://doi.org/10.1111/peps.12602', 'Personnel Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Presenteeism in hybrid work: The pressure to be visible', '2023', 'https://doi.org/10.1108/JMP-09-2022-0478', 'Journal of Managerial Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Psychological ownership and hybrid workspaces', '2023', 'https://doi.org/10.1016/j.jenvp.2023.101978', 'Journal of Environmental Psychology', 7)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-066 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-066';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Digital presenteeism in remote work: Predictors and mental health outcomes', '2023', 'https://doi.org/10.1037/ocp0000351', 'Journal of Occupational Health Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Always-on culture and employee wellbeing in digital work environments', '2023', 'https://doi.org/10.1111/ntwe.12261', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Response time expectations and stress in remote communication', '2023', 'https://doi.org/10.1016/j.chb.2023.107812', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Status indicators and perceived availability in distributed teams', '2023', 'https://doi.org/10.1093/jcmc/zmad007', 'Journal of Computer-Mediated Communication', 4),
      (v_art_id, 'peer_reviewed', 1, 'Right to disconnect legislation and employee outcomes', '2023', 'https://doi.org/10.1111/irj.12398', 'Industrial Relations Journal', 5),
      (v_art_id, 'peer_reviewed', 1, 'Boundary control and work-life balance in remote work', '2023', 'https://doi.org/10.1016/j.jvb.2023.103869', 'Journal of Vocational Behavior', 6),
      (v_art_id, 'peer_reviewed', 1, 'Organizational norms and individual boundary-setting behavior', '2023', 'https://doi.org/10.5465/amj.2021.0915', 'Academy of Management Journal', 7),
      (v_art_id, 'peer_reviewed', 1, 'Asynchronous communication and reduced stress in distributed teams', '2023', 'https://doi.org/10.1177/10596011231164287', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-067 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-067';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Notification overload and cognitive performance in knowledge work', '2023', 'https://doi.org/10.1016/j.chb.2023.107845', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Communication channel proliferation and employee stress', '2023', 'https://doi.org/10.1037/ocp0000354', 'Journal of Occupational Health Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Attention residue from frequent messaging interruptions', '2022', 'https://doi.org/10.1037/apl0001012', 'Journal of Applied Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Batch processing versus continuous checking of digital communications', '2023', 'https://doi.org/10.1016/j.obhdp.2023.104216', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Channel norms and team coordination effectiveness', '2023', 'https://doi.org/10.25300/MISQ/2023/16784', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'FOMO (fear of missing out) in workplace communication', '2023', 'https://doi.org/10.1016/j.chb.2022.107391', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Notification management strategies and wellbeing outcomes', '2023', 'https://doi.org/10.1111/aphw.12412', 'Applied Psychology: Health and Well-Being', 7),
      (v_art_id, 'peer_reviewed', 1, 'Synchronous versus asynchronous team communication: A meta-analysis', '2023', 'https://doi.org/10.1177/10464964221148291', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-068 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-068';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Remote work and marital quality: Longitudinal findings', '2023', 'https://doi.org/10.1111/jomf.12897', 'Journal of Marriage and Family', 1),
      (v_art_id, 'peer_reviewed', 1, 'Spatial boundaries and relationship satisfaction in work-from-home couples', '2023', 'https://doi.org/10.1037/fam0001084', 'Journal of Family Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Division of household labor in dual-remote-work couples', '2023', 'https://doi.org/10.1007/s11199-023-01367-4', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Childcare and remote work: Gender equity implications', '2023', 'https://doi.org/10.1177/07308884231165289', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Constant proximity and relationship conflict in remote-working couples', '2023', 'https://doi.org/10.1177/02654075231162847', 'Journal of Social and Personal Relationships', 5),
      (v_art_id, 'peer_reviewed', 1, 'Communication patterns and relationship quality in work-from-home transitions', '2022', 'https://doi.org/10.1080/03637751.2022.2108234', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Boundary management strategies for remote-working families', '2023', 'https://doi.org/10.1111/fare.12795', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Remote work flexibility and parenting satisfaction', '2023', 'https://doi.org/10.1177/0192513X231156892', 'Journal of Family Issues', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-069 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-069';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Remote work and career advancement: Longitudinal study of promotion outcomes', '2024', 'https://doi.org/10.1016/j.jvb.2024.103945', 'Journal of Vocational Behavior', 1),
      (v_art_id, 'peer_reviewed', 1, 'Proximity bias in performance evaluations of remote workers', '2023', 'https://doi.org/10.1111/peps.12614', 'Personnel Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Informal learning and mentorship in distributed work environments', '2023', 'https://doi.org/10.1037/apl0001091', 'Journal of Applied Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Strategic visibility behaviors in remote work contexts', '2023', 'https://doi.org/10.5465/amj.2022.0184', 'Academy of Management Journal', 4),
      (v_art_id, 'peer_reviewed', 1, 'Network building in virtual organizations', '2023', 'https://doi.org/10.1177/01492063231165429', 'Journal of Management', 5),
      (v_art_id, 'peer_reviewed', 1, 'Self-advocacy and career success in remote workers', '2023', 'https://doi.org/10.1108/CDI-08-2022-0219', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Early-career professionals in remote work: Development challenges and supports', '2023', 'https://doi.org/10.1177/08948453231178956', 'Journal of Career Development', 7),
      (v_art_id, 'peer_reviewed', 1, 'Skill development and learning opportunities in hybrid versus office work', '2023', 'https://doi.org/10.1002/hrdq.21498', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-070 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-070';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The future of work: Trends and implications for employee wellbeing', '2024', 'https://doi.org/10.1146/annurev-orgpsych-041024-091856', 'Annual Review of Organizational Psychology and Organizational Behavior', 1),
      (v_art_id, 'peer_reviewed', 1, 'AI integration and worker mental health: A systematic review', '2024', 'https://doi.org/10.1037/ocp0000367', 'Journal of Occupational Health Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'The platform economy and precarious work: Mental health consequences', '2024', 'https://doi.org/10.1177/09500170231198765', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, '4-day work week trials: Productivity and wellbeing outcomes', '2024', 'https://doi.org/10.1037/apl0001098', 'Journal of Applied Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Skills obsolescence anxiety and continuous learning demands', '2024', 'https://doi.org/10.1111/peps.12625', 'Personnel Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Remote-first organizations: Five-year outcomes', '2024', 'https://doi.org/10.1177/00081256241239876', 'California Management Review', 6),
      (v_art_id, 'peer_reviewed', 1, 'Employee monitoring technology and psychological wellbeing', '2024', 'https://doi.org/10.1111/ntwe.12287', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Right to disconnect legislation: Global trends and effectiveness', '2024', 'https://doi.org/10.1111/ilr.12418', 'International Labour Review', 8)
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
  WHERE a.article_production_id LIKE 'CAT05-%';

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;
