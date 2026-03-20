-- ============================================================================
-- Seed: Category 5 (Work, Productivity & Burnout) — Subcategory 01
-- 10 articles: CAT05-001 through CAT05-010
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
  VALUES ('Workplace Mental Health Fundamentals', 'workplace-mental-health-fundamentals', v_cat_id, 1)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'workplace-mental-health-fundamentals' AND category_id = v_cat_id;

  -- CAT05-001: Your Mental Health at Work: Why It Matters More Than You Think
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Your Mental Health at Work: Why It Matters More Than You Think',
    'mental-health-at-work-why-it-matters',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Workplace Wellbeing', 'Mental Health Awareness', 'Occupational Health', 'Self-Care'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-001',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover why workplace mental health affects productivity, relationships, and physical health—and what you can do about it.',
    '/images/articles/cat05/cover-001.svg',
    8,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-002: The Psychological Contract: What You Expect from Work and What Work Expects from You
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychological Contract: What You Expect from Work and What Work Expects from You',
    'psychological-contract-work-expectations',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Workplace Psychology', 'Job Satisfaction', 'Organizational Behavior', 'Expectations'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-002',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the unspoken agreement between you and your employer—and what happens when expectations don',
    '/images/articles/cat05/cover-002.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-003: Workplace Stress vs. Workplace Distress: How to Tell the Difference
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Workplace Stress vs. Workplace Distress: How to Tell the Difference',
    'workplace-stress-vs-distress',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Workplace Stress', 'Mental Health', 'Burnout Prevention', 'Stress Management'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-003',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn to distinguish healthy workplace pressure from harmful chronic distress—and what to do about each.',
    '/images/articles/cat05/cover-003.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-004: How Toxic Work Environments Damage Mental Health
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How Toxic Work Environments Damage Mental Health',
    'toxic-work-environments-mental-health',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Toxic Workplace', 'Mental Health', 'Workplace Culture', 'Psychological Safety'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-004',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Recognize the patterns of toxic workplaces and understand their profound impact on psychological wellbeing.',
    '/images/articles/cat05/cover-004.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-005: Psychological Safety at Work: What It Means and Why Teams Need It
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Psychological Safety at Work: What It Means and Why Teams Need It',
    'psychological-safety-at-work',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Psychological Safety', 'Team Dynamics', 'Workplace Culture', 'Leadership'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-005',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the concept of psychological safety and its critical role in team performance and employee wellbeing.',
    '/images/articles/cat05/cover-005.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-006: The Impact of Job Insecurity on Mental Health
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Impact of Job Insecurity on Mental Health',
    'job-insecurity-mental-health',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Job Insecurity', 'Workplace Anxiety', 'Economic Stress', 'Mental Health'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-006',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand how the fear of losing your job affects psychological wellbeing and what you can do to cope.',
    '/images/articles/cat05/cover-006.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-007: Open-Plan Offices, Hot Desking, and Your Brain: Environmental Stressors at Work
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Open-Plan Offices, Hot Desking, and Your Brain: Environmental Stressors at Work',
    'open-plan-offices-brain-environmental-stressors',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Workplace Design', 'Research', 'Productivity', 'Environmental Psychology'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-007',
    v_cat_id,
    v_sub_id,
    'drafted',
    'New research reveals how workplace design affects cognitive performance, stress, and mental health.',
    '/images/articles/cat05/cover-007.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-008: Work and Purpose: How Meaningful Work Protects Mental Health
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Work and Purpose: How Meaningful Work Protects Mental Health',
    'work-and-purpose-meaningful-work-mental-health',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Meaningful Work', 'Purpose', 'Mental Health', 'Job Satisfaction'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-008',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the psychological power of meaningful work and how it buffers against stress, burnout, and depression.',
    '/images/articles/cat05/cover-008.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-009: The Mental Health Cost of Micromanagement
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Mental Health Cost of Micromanagement',
    'mental-health-cost-micromanagement',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Micromanagement', 'Leadership', 'Autonomy', 'Workplace Mental Health'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-009',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover how controlling management styles damage psychological wellbeing, autonomy, and performance.',
    '/images/articles/cat05/cover-009.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-010: Employee Wellbeing Programs: What Actually Works According to Research
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Employee Wellbeing Programs: What Actually Works According to Research',
    'employee-wellbeing-programs-what-works',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Research', 'Workplace Wellness', 'Mental Health Programs', 'Evidence-Based'],
    1800,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-010',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Evidence-based analysis of workplace wellness initiatives—which interventions improve mental health and which are ineffective.',
    '/images/articles/cat05/cover-010.svg',
    9,
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

  -- === CAT05-001 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-001';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'government', 2, 'Mental Health in the Workplace: Introduction', '2022', 'https://www.who.int/teams/mental-health-and-substance-use/mental-health-in-the-workplace', NULL, 1),
      (v_art_id, 'professional_org', 3, 'Workplace Mental Health & Well-being', '2023', 'https://www.apa.org/topics/healthy-workplaces', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'The Impact of Mental Health on Workplace Productivity', '2021', 'https://doi.org/10.1097/JOM.0000000000002152', 'Journal of Occupational and Environmental Medicine', 3),
      (v_art_id, 'peer_reviewed', 1, 'Depression and Work Performance: A Meta-Analysis', '2020', 'https://doi.org/10.1037/apl0000462', 'Journal of Applied Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'The Cost of Workplace Mental Health', '2021', 'https://doi.org/10.1016/S2215-0366(21)00293-2', 'The Lancet Psychiatry', 5),
      (v_art_id, 'peer_reviewed', 1, 'Workplace Mental Health: A Review and Recommendations', '2022', 'https://doi.org/10.1146/annurev-orgpsych-012420-091017', 'Annual Review of Organizational Psychology and Organizational Behavior', 6),
      (v_art_id, 'textbook', 5, 'Mental Health and Productivity in the Workplace', '2022', 'https://hbr.org/2022/01/mental-health-and-productivity', 'Harvard Business Review', 7),
      (v_art_id, 'government', 2, 'Work-Related Stress, Anxiety, and Depression Statistics', '2023', 'https://www.hse.gov.uk/statistics/causdis/stress.pdf', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-002 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-002';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The Psychological Contract in Employment', '2022', 'https://doi.org/10.1146/annurev-psych-012420-090000', 'Annual Review of Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Psychological Contract Breach and Work Outcomes', '2020', 'https://doi.org/10.1002/job.2467', 'Journal of Organizational Behavior', 2),
      (v_art_id, 'peer_reviewed', 1, 'The Evolution of the Psychological Contract', '2021', 'https://doi.org/10.1016/j.hrmr.2021.100823', 'Human Resource Management Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'Generational Differences in Psychological Contracts', '2022', 'https://doi.org/10.1108/JMP-01-2022-0012', 'Journal of Managerial Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Trust and the Psychological Contract', '2021', 'https://doi.org/10.5465/amj.2019.0798', 'Academy of Management Journal', 5),
      (v_art_id, 'peer_reviewed', 1, 'Repairing Psychological Contract Breaches', '2023', 'https://doi.org/10.1177/20413866231167890', 'Organizational Psychology Review', 6),
      (v_art_id, 'textbook', 5, 'The Changing Nature of Work and Psychological Contracts', '2022', 'https://sloanreview.mit.edu/article/the-changing-psychological-contract/', 'MIT Sloan Management Review', 7),
      (v_art_id, 'peer_reviewed', 1, 'Psychological Contracts and Mental Health at Work', '2021', 'https://doi.org/10.1016/j.jvb.2021.103567', 'Journal of Vocational Behavior', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-003 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-003';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'government', 2, 'Stress in the Workplace', '2022', 'https://www.cdc.gov/niosh/topics/stress/', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'The Yerkes-Dodson Law and Performance', '2020', 'https://doi.org/10.1037/xge0000731', 'Journal of Experimental Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Chronic Work Stress and Mental Health', '2021', 'https://doi.org/10.1016/S2215-0366(21)00118-5', 'The Lancet Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Job Demands-Resources Model', '2022', 'https://doi.org/10.1037/apl0000987', 'Journal of Applied Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Physiological Markers of Chronic Work Stress', '2021', 'https://doi.org/10.1097/PSY.0000000000000912', 'Psychosomatic Medicine', 5),
      (v_art_id, 'peer_reviewed', 1, 'Recovery from Work Stress', '2022', 'https://doi.org/10.1037/ocp0000312', 'Journal of Occupational Health Psychology', 6),
      (v_art_id, 'professional_org', 3, 'Acute vs. Chronic Stress', '2023', 'https://www.apa.org/topics/stress/acute-chronic', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Workplace Stress and Cardiovascular Disease', '2021', 'https://doi.org/10.1161/CIRCULATIONAHA.120.050277', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-004 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-004';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Workplace Incivility and Mental Health', '2021', 'https://doi.org/10.1037/ocp0000287', 'Journal of Occupational Health Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Toxic Leadership and Employee Wellbeing', '2022', 'https://doi.org/10.1016/j.leaqua.2022.101589', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Workplace Bullying: A Meta-Analysis of Health Outcomes', '2020', 'https://doi.org/10.1080/1359432X.2020.1758455', 'European Journal of Work and Organizational Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Organizational Justice and Mental Health', '2021', 'https://doi.org/10.1037/apl0000876', 'Journal of Applied Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'The Impact of Work Culture on Mental Health', '2022', 'https://doi.org/10.2105/AJPH.2022.306845', 'American Journal of Public Health', 5),
      (v_art_id, 'peer_reviewed', 1, 'Abusive Supervision and Employee Mental Health', '2021', 'https://doi.org/10.5465/amj.2019.0972', 'Academy of Management Journal', 6),
      (v_art_id, 'peer_reviewed', 1, 'Toxic Workplaces and PTSD Symptoms', '2021', 'https://doi.org/10.1002/jts.22678', 'Journal of Traumatic Stress', 7),
      (v_art_id, 'textbook', 5, 'Psychological Safety in Organizations', '2023', 'https://hbr.org/2023/02/what-is-psychological-safety', 'Harvard Business Review', 8),
      (v_art_id, 'peer_reviewed', 1, 'Recovery from Toxic Work Environments', '2022', 'https://doi.org/10.1016/j.jvb.2022.103712', 'Journal of Vocational Behavior', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-005 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-005';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Psychological Safety and Learning Behavior in Work Teams', '1999', 'https://doi.org/10.2307/2666999', 'Administrative Science Quarterly', 1),
      (v_art_id, 'textbook', 5, 'The Fearless Organization: Creating Psychological Safety in the Workplace', '2019', 'https://www.hbs.edu/faculty/Pages/item.aspx?num=55910', 'Harvard Business Review Press', 2),
      (v_art_id, 'textbook', 5, 'Google', '2016', 'https://rework.withgoogle.com/guides/understanding-team-effectiveness/', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Psychological Safety, Trust, and Learning in Organizations', '2020', 'https://doi.org/10.1177/1059601120966546', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Psychological Safety and Mental Health in the Workplace', '2022', 'https://doi.org/10.1097/JOM.0000000000002531', 'Journal of Occupational and Environmental Medicine', 5),
      (v_art_id, 'peer_reviewed', 1, 'Building Psychological Safety in Healthcare Teams', '2021', 'https://doi.org/10.1136/bmjqs-2020-012263', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'The Role of Leadership in Creating Psychological Safety', '2021', 'https://doi.org/10.1016/j.leaqua.2021.101541', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Psychological Safety and Innovation', '2022', 'https://doi.org/10.1177/01492063221087605', 'Journal of Management', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-006 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-006';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Job Insecurity and Mental Health: A Meta-Analysis', '2021', 'https://doi.org/10.1037/ocp0000298', 'Journal of Occupational Health Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'The Psychological Impact of Job Insecurity', '2020', 'https://doi.org/10.1080/1359432X.2020.1745189', 'European Journal of Work and Organizational Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Job Insecurity During Economic Recessions', '2021', 'https://doi.org/10.1016/S2468-2667(21)00183-4', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Chronic Job Insecurity and Health Outcomes', '2022', 'https://doi.org/10.1016/j.socscimed.2022.114912', 'Social Science & Medicine', 4),
      (v_art_id, 'peer_reviewed', 1, 'Job Insecurity and Family Wellbeing', '2021', 'https://doi.org/10.1037/fam0000834', 'Journal of Family Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Coping with Job Insecurity', '2022', 'https://doi.org/10.1016/j.jvb.2022.103678', 'Journal of Vocational Behavior', 6),
      (v_art_id, 'professional_org', 3, 'Financial Stress and Mental Health', '2023', 'https://www.apa.org/news/press/releases/stress/2023/financial-stress', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Job Insecurity in the Gig Economy', '2021', 'https://doi.org/10.1177/0950017021991270', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-007 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-007';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The Impact of the Open-Plan Office on Human Collaboration', '2018', 'https://doi.org/10.1098/rstb.2017.0239', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Open-Plan Office Noise and Cognitive Performance', '2021', 'https://doi.org/10.1016/j.jenvp.2021.101632', 'Journal of Environmental Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Workspace Design and Employee Wellbeing', '2020', 'https://doi.org/10.1097/JOM.0000000000001965', 'Journal of Occupational and Environmental Medicine', 3),
      (v_art_id, 'peer_reviewed', 1, 'Hot Desking and Psychological Ownership', '2021', 'https://doi.org/10.1016/j.apergo.2021.103401', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Workplace Noise, Stress, and Cardiovascular Health', '2022', 'https://doi.org/10.1289/EHP9384', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Privacy in the Workplace and Mental Health', '2021', 'https://doi.org/10.1080/00140139.2021.1888937', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'The Neuroscience of Environmental Stressors', '2020', 'https://doi.org/10.1038/s41583-020-0317-z', 'Nature Reviews Neuroscience', 7),
      (v_art_id, 'peer_reviewed', 1, 'Biophilic Design and Employee Wellbeing', '2021', 'https://doi.org/10.1016/j.buildenv.2021.107949', NULL, 8),
      (v_art_id, 'peer_reviewed', 1, 'Lighting and Circadian Rhythms in the Workplace', '2022', 'https://doi.org/10.5664/jcsm.9862', 'Journal of Clinical Sleep Medicine', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-008 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-008';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Meaningful Work and Mental Health', '2021', 'https://doi.org/10.1037/ocp0000310', 'Journal of Occupational Health Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Work as a Calling and Psychological Wellbeing', '2020', 'https://doi.org/10.1177/1069072720922732', 'Journal of Career Assessment', 2),
      (v_art_id, 'peer_reviewed', 1, 'Purpose in Life and Mental Health Outcomes', '2021', 'https://doi.org/10.1176/appi.ajp.2020.20060817', 'American Journal of Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Job Crafting and Work Meaning', '2022', 'https://doi.org/10.1016/j.jvb.2022.103689', 'Journal of Vocational Behavior', 4),
      (v_art_id, 'peer_reviewed', 1, 'Meaning and Mental Health in Healthcare Workers', '2022', 'https://doi.org/10.1001/jama.2022.1815', 'Journal of the American Medical Association', 5),
      (v_art_id, 'peer_reviewed', 1, 'The Dark Side of Meaningful Work', '2021', 'https://doi.org/10.5465/amr.2019.0348', 'Academy of Management Review', 6),
      (v_art_id, 'peer_reviewed', 1, 'Ikigai and Longevity', '2020', 'https://doi.org/10.1097/PSY.0000000000000789', 'Psychosomatic Medicine', 7),
      (v_art_id, 'textbook', 5, 'Finding Meaning in Work', '2022', 'https://sloanreview.mit.edu/article/finding-meaning-in-work/', 'MIT Sloan Management Review', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-009 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-009';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Micromanagement and Employee Wellbeing', '2021', 'https://doi.org/10.1002/job.2513', 'Journal of Organizational Behavior', 1),
      (v_art_id, 'peer_reviewed', 1, 'Autonomy and Mental Health at Work', '2022', 'https://doi.org/10.1037/ocp0000325', 'Journal of Occupational Health Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Self-Determination Theory in the Workplace', '2020', 'https://doi.org/10.1177/2041386620922750', 'Organizational Psychology Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'Controlling Leadership and Burnout', '2021', 'https://doi.org/10.1016/j.leaqua.2021.101512', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Trust and Performance in Organizations', '2021', 'https://doi.org/10.5465/amj.2019.0863', 'Academy of Management Journal', 5),
      (v_art_id, 'peer_reviewed', 1, 'Learned Helplessness in the Workplace', '2020', 'https://doi.org/10.1037/apl0000478', 'Journal of Applied Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Psychological Needs and Motivation', '2021', 'https://doi.org/10.1037/bul0000313', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Recovery from Micromanagement', '2022', 'https://doi.org/10.1016/j.jvb.2022.103701', 'Journal of Vocational Behavior', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-010 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-010';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Effectiveness of Workplace Mental Health Interventions: A Meta-Analysis', '2022', 'https://doi.org/10.1016/S2215-0366(22)00085-9', 'The Lancet Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Workplace Wellness Programs and Health Outcomes', '2021', 'https://doi.org/10.1001/jamainternmed.2021.2174', 'JAMA Internal Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'Individual vs. Organizational Interventions for Mental Health', '2021', 'https://doi.org/10.1037/ocp0000302', 'Journal of Occupational Health Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Mental Health First Aid Training in Workplaces', '2020', 'https://doi.org/10.1017/S0033291720004304', 'Psychological Medicine', 4),
      (v_art_id, 'peer_reviewed', 1, 'The Failure of Corporate Wellness Programs', '2021', 'https://doi.org/10.1377/hlthaff.2021.00037', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Systemic Approaches to Workplace Mental Health', '2022', 'https://doi.org/10.1146/annurev-publhealth-052220-093552', 'Annual Review of Public Health', 6),
      (v_art_id, 'peer_reviewed', 1, 'Employee Assistance Programs: Do They Work?', '2021', 'https://doi.org/10.1080/15555240.2021.1876038', 'Journal of Workplace Behavioral Health', 7),
      (v_art_id, 'government', 2, 'Workplace Mental Health: A Global Perspective', '2022', 'https://www.who.int/publications/i/item/9789240053052', NULL, 8),
      (v_art_id, 'peer_reviewed', 1, 'Reducing Stigma: What Works in Workplace Interventions', '2021', 'https://doi.org/10.1016/j.socscimed.2021.113967', 'Social Science & Medicine', 9)
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
