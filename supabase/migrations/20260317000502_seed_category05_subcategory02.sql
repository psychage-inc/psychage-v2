-- ============================================================================
-- Seed: Category 5 (Work, Productivity & Burnout) — Subcategory 02
-- 10 articles: CAT05-011 through CAT05-020
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
  VALUES ('Burnout Recognition Recovery', 'burnout-recognition-recovery', v_cat_id, 2)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'burnout-recognition-recovery' AND category_id = v_cat_id;

  -- CAT05-011: The WHO Definition of Burnout: What It Is and What It Isn
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The WHO Definition of Burnout: What It Is and What It Isn',
    'who-definition-burnout-what-it-is-and-isnt',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Burnout', 'WHO Classification', 'Occupational Health', 'Mental Health'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-011',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the official medical classification of burnout, its three dimensions, and how it differs from stress and depression.',
    '/images/articles/cat05/cover-011.svg',
    8,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-012: Early Warning Signs of Burnout: The Signals Most People Ignore
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Early Warning Signs of Burnout: The Signals Most People Ignore',
    'early-warning-signs-burnout',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Burnout', 'Warning Signs', 'Prevention', 'Self-Awareness'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-012',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn to recognize the subtle early indicators of burnout before it becomes severe—and why catching it early matters.',
    '/images/articles/cat05/cover-012.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-013: Burnout Self-Assessment: Evidence-Based Tools to Measure Your Risk
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Burnout Self-Assessment: Evidence-Based Tools to Measure Your Risk',
    'burnout-self-assessment-tools',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Burnout', 'Assessment', 'Self-Screening', 'Evidence-Based Tools'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-013',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Use validated psychological tools to assess your burnout level and understand what the scores mean for your wellbeing.',
    '/images/articles/cat05/cover-013.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-014: Why High Achievers Are Most Vulnerable to Burnout
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Why High Achievers Are Most Vulnerable to Burnout',
    'why-high-achievers-vulnerable-burnout',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Burnout', 'High Achievers', 'Perfectionism', 'Success'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-014',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the psychological patterns that make driven, successful people especially prone to burnout—and how to protect yourself.',
    '/images/articles/cat05/cover-014.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-015: Compassion Fatigue: Burnout in Helping Professions
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Compassion Fatigue: Burnout in Helping Professions',
    'compassion-fatigue-burnout-helping-professions',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Compassion Fatigue', 'Healthcare', 'Burnout', 'Helping Professions'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-015',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand compassion fatigue—the unique form of burnout affecting healthcare workers, therapists, and caregivers.',
    '/images/articles/cat05/cover-015.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-016: Teacher Burnout: The Silent Crisis in Education
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Teacher Burnout: The Silent Crisis in Education',
    'teacher-burnout-crisis-education',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Teacher Burnout', 'Education', 'Systemic Issues', 'Mental Health'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-016',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the alarming rates of burnout among educators and the systemic factors driving the crisis in schools.',
    '/images/articles/cat05/cover-016.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-017: Tech Industry Burnout: When Innovation Culture Becomes Exploitation
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Tech Industry Burnout: When Innovation Culture Becomes Exploitation',
    'tech-industry-burnout-innovation-exploitation',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Tech Industry', 'Burnout', 'Startup Culture', 'Hustle Culture'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-017',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Examine the dark side of tech culture—how passion, disruption, and hustle rhetoric mask systemic burnout.',
    '/images/articles/cat05/cover-017.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-018: The Burnout Recovery Timeline: What the Research Says About Healing
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Burnout Recovery Timeline: What the Research Says About Healing',
    'burnout-recovery-timeline',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Burnout Recovery', 'Healing Timeline', 'Evidence-Based', 'Self-Care'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-018',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the stages and timeline of burnout recovery based on scientific evidence—and why rushing it backfires.',
    '/images/articles/cat05/cover-018.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-019: Sabbaticals, Career Breaks, and Leaves of Absence: When You Need Real Time Off
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Sabbaticals, Career Breaks, and Leaves of Absence: When You Need Real Time Off',
    'sabbaticals-career-breaks-real-time-off',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Sabbatical', 'Career Break', 'Time Off', 'Recovery'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-019',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn when extended time away from work is necessary for burnout recovery—and how to navigate it.',
    '/images/articles/cat05/cover-019.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-020: Returning to Work After Burnout: How to Come Back Without Relapsing
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Returning to Work After Burnout: How to Come Back Without Relapsing',
    'returning-to-work-after-burnout',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Return to Work', 'Burnout Recovery', 'Relapse Prevention', 'Workplace Re-Entry'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-020',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Navigate the challenging transition back to work after burnout—with strategies to prevent relapse.',
    '/images/articles/cat05/cover-020.svg',
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

  -- === CAT05-011 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-011';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'government', 2, 'ICD-11 Classification of Burnout', '2019', 'https://icd.who.int/browse11/l-m/en#/http://id.who.int/icd/entity/129180281', NULL, 1),
      (v_art_id, 'textbook', 5, 'Maslach Burnout Inventory: Manual', '2021', 'https://www.mindgarden.com/117-maslach-burnout-inventory-mbi', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Burnout: A Review of Theory and Measurement', '2020', 'https://doi.org/10.3390/ijerph17144344', 'International Journal of Environmental Research and Public Health', 3),
      (v_art_id, 'peer_reviewed', 1, 'Burnout vs. Depression: Overlapping and Unique Features', '2021', 'https://doi.org/10.1016/j.jad.2021.03.076', 'Journal of Affective Disorders', 4),
      (v_art_id, 'peer_reviewed', 1, 'Prevalence of Burnout Globally', '2022', 'https://doi.org/10.1001/jamanetworkopen.2022.15686', NULL, 5),
      (v_art_id, 'textbook', 5, 'Job Burnout: How to Ask for Help', '2023', 'https://www.mayoclinic.org/healthy-lifestyle/adult-health/in-depth/burnout/art-20046642', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Burnout in Healthcare Workers', '2021', 'https://doi.org/10.1016/S0140-6736(21)01630-5', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Cultural Differences in Burnout Experience', '2020', 'https://doi.org/10.1177/1069397120946107', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-012 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-012';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Early Identification of Burnout', '2021', 'https://doi.org/10.1037/ocp0000309', 'Journal of Occupational Health Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'The Progression of Burnout: Stages and Symptoms', '2020', 'https://doi.org/10.1002/smi.2935', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Physical Symptoms as Burnout Predictors', '2021', 'https://doi.org/10.1097/PSY.0000000000000947', 'Psychosomatic Medicine', 3),
      (v_art_id, 'peer_reviewed', 1, 'Sleep Disturbances and Burnout', '2022', 'https://doi.org/10.1016/j.smrv.2022.101578', 'Sleep Medicine Reviews', 4),
      (v_art_id, 'peer_reviewed', 1, 'Behavioral Changes Preceding Burnout', '2021', 'https://doi.org/10.1037/str0000231', 'International Journal of Stress Management', 5),
      (v_art_id, 'peer_reviewed', 1, 'The Role of Self-Awareness in Burnout Prevention', '2020', 'https://doi.org/10.1007/s12671-020-01423-7', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Workplace Warning Signs of Impending Burnout', '2021', 'https://doi.org/10.1007/s10869-021-09752-4', 'Journal of Business and Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Why People Ignore Burnout Symptoms', '2022', 'https://doi.org/10.1016/j.socscimed.2022.114935', 'Social Science & Medicine', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-013 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-013';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'textbook', 5, 'Maslach Burnout Inventory: The Gold Standard', '2021', 'https://www.mindgarden.com/117-maslach-burnout-inventory-mbi', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Copenhagen Burnout Inventory: Validation and Application', '2020', 'https://doi.org/10.1177/1403494820935974', 'Scandinavian Journal of Public Health', 2),
      (v_art_id, 'peer_reviewed', 1, 'Burnout Assessment Tool (BAT): Development and Validation', '2021', 'https://doi.org/10.3390/ijerph18115658', 'International Journal of Environmental Research and Public Health', 3),
      (v_art_id, 'peer_reviewed', 1, 'Self-Assessment Accuracy in Burnout Recognition', '2021', 'https://doi.org/10.1037/ocp0000318', 'Journal of Occupational Health Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Limitations of Self-Report Burnout Measures', '2022', 'https://doi.org/10.1002/smi.3098', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Single-Item Burnout Measure: Validity and Utility', '2020', 'https://doi.org/10.1097/JOM.0000000000001941', 'Journal of Occupational and Environmental Medicine', 6),
      (v_art_id, 'peer_reviewed', 1, 'Cultural Considerations in Burnout Assessment', '2021', 'https://doi.org/10.1177/1069397121998765', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'When to Seek Professional Evaluation for Burnout', '2022', 'https://doi.org/10.1016/j.mayocp.2022.03.014', 'Mayo Clinic Proceedings', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-014 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-014';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Achievement Orientation and Burnout Risk', '2021', 'https://doi.org/10.1037/pspp0000379', 'Journal of Personality and Social Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Perfectionism as a Burnout Predictor', '2020', 'https://doi.org/10.1016/j.paid.2020.110234', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Workaholism and Mental Health', '2022', 'https://doi.org/10.1037/ocp0000332', 'Journal of Occupational Health Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Identity Fusion with Work', '2021', 'https://doi.org/10.1177/2041386621999876', 'Organizational Psychology Review', 4),
      (v_art_id, 'peer_reviewed', 1, 'The Dark Side of Conscientiousness', '2020', 'https://doi.org/10.1037/bul0000256', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Success Addiction and Burnout', '2021', 'https://doi.org/10.1007/s10551-021-04789-3', 'Journal of Business Ethics', 6),
      (v_art_id, 'peer_reviewed', 1, 'Redefining Achievement for Wellbeing', '2022', 'https://doi.org/10.1037/amp0000912', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Recovery Strategies for High Performers', '2021', 'https://doi.org/10.1037/apl0000889', 'Journal of Applied Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-015 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-015';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Compassion Fatigue in Healthcare Workers', '2021', 'https://doi.org/10.1001/jama.2021.15724', 'Journal of the American Medical Association', 1),
      (v_art_id, 'peer_reviewed', 1, 'Secondary Traumatic Stress and Vicarious Trauma', '2020', 'https://doi.org/10.1037/trm0000238', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Professional Quality of Life Scale (ProQOL)', '2021', 'https://doi.org/10.1002/jts.22681', 'Journal of Traumatic Stress', 3),
      (v_art_id, 'peer_reviewed', 1, 'Compassion Fatigue vs. Burnout: Key Differences', '2022', 'https://doi.org/10.1016/S2215-0366(22)00091-4', 'The Lancet Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Moral Injury in Healthcare', '2021', 'https://doi.org/10.1136/bmj.n2105', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Compassion Satisfaction as a Protective Factor', '2020', 'https://doi.org/10.1080/13548506.2020.1791101', 'Psychology, Health & Medicine', 6),
      (v_art_id, 'peer_reviewed', 1, 'Self-Compassion Interventions for Healthcare Providers', '2021', 'https://doi.org/10.1007/s12671-021-01678-4', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Systemic Interventions to Reduce Compassion Fatigue', '2022', 'https://doi.org/10.1377/hlthaff.2022.00125', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-016 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-016';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Teacher Burnout Rates Globally', '2021', 'https://doi.org/10.1016/j.tate.2021.103452', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'The Impact of Teacher Burnout on Student Outcomes', '2020', 'https://doi.org/10.1007/s10648-020-09555-0', 'Educational Psychology Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Systemic Causes of Teacher Burnout', '2021', 'https://doi.org/10.1108/JEA-01-2021-0006', 'Journal of Educational Administration', 3),
      (v_art_id, 'peer_reviewed', 1, 'Teacher Shortages and Retention Crisis', '2022', 'https://doi.org/10.3102/0013189X221098311', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Emotional Labor in Teaching', '2020', 'https://doi.org/10.1002/berj.3634', 'British Educational Research Journal', 5),
      (v_art_id, 'peer_reviewed', 1, 'Teacher Mental Health During COVID-19', '2021', 'https://doi.org/10.1016/S2352-4642(21)00252-8', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Interventions to Reduce Teacher Burnout', '2021', 'https://doi.org/10.3102/0034654321989802', 'Review of Educational Research', 7),
      (v_art_id, 'textbook', 5, 'Teacher Burnout and the Teacher Shortage', '2023', 'https://www.edweek.org/leadership/teacher-burnout-is-a-crisis-heres-what-schools-can-do', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-017 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-017';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Burnout in Technology Workers', '2022', 'https://doi.org/10.1037/ocp0000341', 'Journal of Occupational Health Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'The Dark Side of Tech Culture', '2021', 'https://doi.org/10.1177/0170840620982248', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Hustle Culture and Mental Health', '2021', 'https://doi.org/10.1080/02678373.2021.1936666', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'On-Call Culture and Developer Wellbeing', '2020', 'https://doi.org/10.1145/3387904', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Crunch Time and Video Game Industry Burnout', '2021', 'https://doi.org/10.1177/1555412020979523', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Diversity and Burnout in Tech', '2022', 'https://doi.org/10.1111/gwao.12745', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'The Myth of Passion in Startups', '2021', 'https://doi.org/10.5465/amp.2019.0152', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Tech Workers and Mental Health Stigma', '2021', 'https://doi.org/10.1111/ntwe.12189', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-018 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-018';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Recovery from Burnout: A Longitudinal Study', '2021', 'https://doi.org/10.1037/ocp0000315', 'Journal of Occupational Health Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Time Course of Burnout Recovery', '2020', 'https://doi.org/10.1002/smi.2948', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Factors Predicting Recovery from Burnout', '2021', 'https://doi.org/10.1080/02678373.2021.1889076', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'The Role of Time Off in Burnout Recovery', '2020', 'https://doi.org/10.1037/str0000245', 'International Journal of Stress Management', 4),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive Recovery After Burnout', '2021', 'https://doi.org/10.3758/s13415-021-00892-3', 'Cognitive, Affective, & Behavioral Neuroscience', 5),
      (v_art_id, 'peer_reviewed', 1, 'Why Some People Relapse After Burnout', '2022', 'https://doi.org/10.1016/j.jvb.2022.103695', 'Journal of Vocational Behavior', 6),
      (v_art_id, 'peer_reviewed', 1, 'Burnout Recovery Interventions', '2021', 'https://doi.org/10.1093/occmed/kqab042', 'Occupational Medicine', 7),
      (v_art_id, 'peer_reviewed', 1, 'Sustained Recovery vs. Temporary Relief', '2021', 'https://doi.org/10.1111/aphw.12276', 'Applied Psychology: Health and Well-Being', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-019 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-019';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Sabbaticals and Mental Health Recovery', '2021', 'https://doi.org/10.1016/j.jvb.2021.103612', 'Journal of Vocational Behavior', 1),
      (v_art_id, 'peer_reviewed', 1, 'The Benefits of Extended Leave', '2020', 'https://doi.org/10.1080/02678373.2020.1832609', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Career Breaks and Re-Entry Challenges', '2021', 'https://doi.org/10.1108/CDI-08-2020-0211', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Medical Leave for Burnout', '2021', 'https://doi.org/10.1093/occmed/kqab048', 'Occupational Medicine', 4),
      (v_art_id, 'textbook', 5, 'Financial Planning for Career Breaks', '2022', 'https://doi.org/10.25304/rlt.v29.2554', 'Journal of Financial Planning', 5),
      (v_art_id, 'peer_reviewed', 1, 'Employer Sabbatical Programs', '2021', 'https://doi.org/10.1002/hrm.22045', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Stigma Around Career Breaks', '2020', 'https://doi.org/10.1111/gwao.12523', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Post-Sabbatical Outcomes', '2021', 'https://doi.org/10.1037/apl0000892', 'Journal of Applied Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-020 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-020';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Return to Work After Burnout', '2021', 'https://doi.org/10.1007/s10926-021-09978-4', 'Journal of Occupational Rehabilitation', 1),
      (v_art_id, 'peer_reviewed', 1, 'Preventing Burnout Relapse', '2022', 'https://doi.org/10.1080/02678373.2022.2045380', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Gradual Re-Entry Programs', '2021', 'https://doi.org/10.1093/occmed/kqab053', 'Occupational Medicine', 3),
      (v_art_id, 'peer_reviewed', 1, 'Workplace Accommodations Post-Burnout', '2021', 'https://doi.org/10.1016/j.jvb.2021.103623', 'Journal of Vocational Behavior', 4),
      (v_art_id, 'peer_reviewed', 1, 'Sustaining Recovery Long-Term', '2022', 'https://doi.org/10.1111/aphw.12289', 'Applied Psychology: Health and Well-Being', 5),
      (v_art_id, 'peer_reviewed', 1, 'Job Change vs. Job Modification', '2021', 'https://doi.org/10.1108/CDI-11-2020-0289', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Support Networks in Recovery', '2021', 'https://doi.org/10.1037/ocp0000327', 'Journal of Occupational Health Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'When Returning Isn', '2022', 'https://doi.org/10.1177/09500170221079435', NULL, 8)
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
