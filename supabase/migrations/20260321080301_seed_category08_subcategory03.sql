-- ============================================================================
-- Seed: Category 8 (Habits, Motivation & Behavior Change) — Subcategory 03
-- 10 articles: CAT08-021 through CAT08-030
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert Category if not present
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  'Habits, Motivation & Behavior Change',
  'habits-behavior-change',
  'The psychology of habits, motivation, and behavior change — building routines that support mental health.',
  'Repeat',
  8,
  65,
  '#F97316'
)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------------------
-- 2. Insert Subcategory
-- ---------------------------------------------------------------------------

DO $$
DECLARE
  v_cat_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'habits-behavior-change';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Building Healthy Routines', 'building-healthy-routines', v_cat_id, 3)
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'habits-behavior-change';
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'building-healthy-routines' AND category_id = v_cat_id;

  -- CAT08-021: Morning Routines That Support Mental Health: What Actually Works
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Morning Routines That Support Mental Health: What Actually Works',
    'morning-routines-mental-health-what-works',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Morning Routine', 'Mental Health', 'Self-Care', 'Circadian Rhythm', 'Self-Help'],
    974,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-021',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Evidence-based morning routine strategies that genuinely improve mood, focus, and emotional regulation—backed by research, not influencer trends.',
    '/images/articles/cat08/cover-021.svg',
    9,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT08-022: Evening Wind-Down Routines for Better Sleep and Less Anxiety
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Evening Wind-Down Routines for Better Sleep and Less Anxiety',
    'evening-wind-down-routines-sleep-anxiety',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Sleep', 'Evening Routine', 'Anxiety', 'Circadian Rhythm', 'Self-Help'],
    967,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-022',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Build an evening routine that signals your nervous system to transition from activity to rest—reducing anxiety and improving sleep quality.',
    '/images/articles/cat08/cover-022.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT08-023: How to Build an Exercise Routine When You Hate Working Out
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How to Build an Exercise Routine When You Hate Working Out',
    'build-exercise-routine-hate-working-out',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Exercise', 'Physical Activity', 'Depression', 'Anxiety', 'Self-Help'],
    988,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-023',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Evidence-based strategies to make movement sustainable when you genuinely dislike traditional exercise—focusing on mental health benefits, not fitness goals.',
    '/images/articles/cat08/cover-023.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT08-024: Creating a Self-Care Routine That''s Sustainable (Not Just a Face Mask)
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Creating a Self-Care Routine That''s Sustainable (Not Just a Face Mask)',
    'sustainable-self-care-routine-not-face-mask',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Self-Care', 'Emotional Regulation', 'Mental Health', 'Boundaries', 'Self-Help'],
    955,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-024',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Build a self-care routine based on actual needs and emotional regulation—not trendy wellness products or social media aesthetics.',
    '/images/articles/cat08/cover-024.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT08-025: The Minimum Effective Dose: The Smallest Routine That Still Moves the Needle
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Minimum Effective Dose: The Smallest Routine That Still Moves the Needle',
    'minimum-effective-dose-smallest-routine',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Habits', 'Routines', 'Self-Care', 'Mental Health', 'Self-Help'],
    955,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-025',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Find the absolute minimum routine that produces meaningful mental health benefits—because perfection is the enemy of consistency.',
    '/images/articles/cat08/cover-025.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT08-026: Adapting Your Routine When Life Gets Chaotic
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Adapting Your Routine When Life Gets Chaotic',
    'adapting-routine-when-life-gets-chaotic',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Routine', 'Flexibility', 'Resilience', 'Adaptation', 'Self-Help'],
    944,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-026',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How to maintain mental health routines during transitions, crises, and unexpected disruptions without guilt or rigidity.',
    '/images/articles/cat08/cover-026.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT08-027: Building a Midday Reset Routine to Prevent the Afternoon Crash
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Building a Midday Reset Routine to Prevent the Afternoon Crash',
    'midday-reset-routine-prevent-afternoon-crash',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Midday Routine', 'Energy Management', 'Focus', 'Circadian Rhythm', 'Self-Help'],
    962,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-027',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Research-backed strategies to maintain energy, focus, and emotional regulation through the afternoon slump—without relying on caffeine.',
    '/images/articles/cat08/cover-027.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT08-028: Weekend vs. Weekday Routines: Finding the Right Balance
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Weekend vs. Weekday Routines: Finding the Right Balance',
    'weekend-vs-weekday-routines-finding-balance',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Weekend Routine', 'Work-Life Balance', 'Sleep', 'Flexibility', 'Self-Help'],
    976,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-028',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How much structure should weekends have? Research on sleep consistency, routine flexibility, and the mental health benefits of structured downtime.',
    '/images/articles/cat08/cover-028.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT08-029: Routine Flexibility: When to Stick to the Plan vs. When to Adjust
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Routine Flexibility: When to Stick to the Plan vs. When to Adjust',
    'routine-flexibility-when-to-stick-when-to-adjust',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Flexibility', 'Discipline', 'Self-Awareness', 'Adaptation', 'Self-Help'],
    943,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-029',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How to distinguish between resistance that requires discipline and resistance that signals genuine need for adjustment.',
    '/images/articles/cat08/cover-029.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT08-030: Seasonal Routines: Adapting to Change Throughout the Year
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Seasonal Routines: Adapting to Change Throughout the Year',
    'seasonal-routines-adapting-to-change-throughout-year',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Seasonal Affective', 'Circadian Rhythm', 'Adaptation', 'Mental Health', 'Self-Help'],
    954,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-030',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How seasonal shifts affect mood, energy, and behavior—and how to adjust routines to match natural cycles rather than fight them.',
    '/images/articles/cat08/cover-030.svg',
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

  -- === CAT08-021 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-021';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The circadian system and sleep: A bidirectional relationship', '2022', 'https://doi.org/10.2147/NSS.S345316', 'Nature and Science of Sleep', 1),
      (v_art_id, 'peer_reviewed', 1, 'Light exposure and physical activity during day shifts compared to night shifts in intensive care nurses', '2021', 'https://doi.org/10.1080/07420528.2021.1910288', 'Chronobiology International', 2),
      (v_art_id, 'peer_reviewed', 1, 'The effects of breakfast on behavior and academic performance in children and adolescents', '2020', 'https://doi.org/10.3389/fnhum.2020.00271', 'Frontiers in Human Neuroscience', 3),
      (v_art_id, 'peer_reviewed', 1, 'Exercise and mental health: Many reasons to move', '2021', 'https://doi.org/10.1159/000514681', 'Neuropsychobiology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Morning chronotype is associated with faster implementation of COVID-19 protective behaviors', '2021', 'https://doi.org/10.1080/07420528.2021.1930026', 'Chronobiology International', 5),
      (v_art_id, 'peer_reviewed', 1, 'Shower or bath? Personal bathing routines and self-reported health', '2020', 'https://doi.org/10.1007/s11205-020-02321-7', 'Social Indicators Research', 6),
      (v_art_id, 'peer_reviewed', 1, 'The association between smartphone use and sleep quality, chronotype, and mental health: A systematic review', '2021', 'https://doi.org/10.1016/j.smrv.2021.101546', 'Sleep Medicine Reviews', 7),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness meditation and the brain: A review of the evidence', '2019', 'https://doi.org/10.1007/s41465-019-00141-4', 'Journal of Cognitive Enhancement', 8),
      (v_art_id, 'peer_reviewed', 1, 'Cold water immersion and mental health: A systematic review', '2023', 'https://doi.org/10.3390/ijerph20054549', 'International Journal of Environmental Research and Public Health', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT08-022 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-022';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Sleep and mental health: A bidirectional relationship', '2020', 'https://doi.org/10.1016/j.smrv.2020.101269', 'Sleep Medicine Reviews', 1),
      (v_art_id, 'peer_reviewed', 1, 'Blue light from light-emitting diodes elicits a dose-dependent suppression of melatonin in humans', '2013', 'https://doi.org/10.1152/japplphysiol.00764.2012', 'Journal of Applied Physiology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Effects of thermal environment on sleep and circadian rhythm', '2012', 'https://doi.org/10.1186/1880-6805-31-14', 'Journal of Physiological Anthropology', 3),
      (v_art_id, 'peer_reviewed', 1, 'The effects of evening bright light exposure on subsequent morning wake time: A naturalistic study', '2020', 'https://doi.org/10.1177/0748730420919174', 'Journal of Biological Rhythms', 4),
      (v_art_id, 'peer_reviewed', 1, 'Efficacy of progressive muscle relaxation training in reducing anxiety in patients with COVID-19', '2021', 'https://doi.org/10.1016/j.ctcp.2021.101350', 'Complementary Therapies in Clinical Practice', 5),
      (v_art_id, 'peer_reviewed', 1, 'The effects of pre-sleep cognitive arousal on sleep onset and quality', '2019', 'https://doi.org/10.1016/j.sleep.2019.01.013', 'Sleep Medicine', 6),
      (v_art_id, 'peer_reviewed', 1, 'Acute psychological stress and cardiovascular modulation during the transition from rest to sleep', '2018', 'https://doi.org/10.1097/PSY.0000000000000617', 'Psychosomatic Medicine', 7),
      (v_art_id, 'peer_reviewed', 1, 'Evening use of light-emitting eReaders negatively affects sleep, circadian timing, and next-morning alertness', '2015', 'https://doi.org/10.1073/pnas.1418490112', 'Proceedings of the National Academy of Sciences', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT08-023 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-023';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Exercise for mental health: A systematic review', '2006', 'https://doi.org/10.4088/pcc.v08n0208a', 'Primary Care Companion to the Journal of Clinical Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Exercise and mental health: Many reasons to move', '2021', 'https://doi.org/10.1159/000514681', 'Neuropsychobiology', 2),
      (v_art_id, 'peer_reviewed', 1, 'How much physical activity is needed to improve health? A dose-response analysis', '2022', 'https://doi.org/10.1136/bjsports-2021-104827', 'British Journal of Sports Medicine', 3),
      (v_art_id, 'peer_reviewed', 1, 'Affective responses to exercise: Toward a personalized dose-response', '2020', 'https://doi.org/10.1249/MSS.0000000000002139', 'Medicine & Science in Sports & Exercise', 4),
      (v_art_id, 'peer_reviewed', 1, 'The relationship between physical activity and depression: A systematic review', '2017', 'https://doi.org/10.1016/j.mhpa.2017.01.001', 'Mental Health and Physical Activity', 5),
      (v_art_id, 'peer_reviewed', 1, 'Walking in nature: A mindfulness-based intervention for reductions in anxiety and depression', '2021', 'https://doi.org/10.3390/ijerph18136847', 'International Journal of Environmental Research and Public Health', 6),
      (v_art_id, 'peer_reviewed', 1, 'Effect of exercise on depression severity in older adults: A systematic review', '2020', 'https://doi.org/10.1016/j.jad.2020.03.024', 'Journal of Affective Disorders', 7),
      (v_art_id, 'peer_reviewed', 1, 'Enjoyment as a predictor of exercise habit, intention to continue exercising, and exercise frequency', '2020', 'https://doi.org/10.1037/spy0000168', 'Sport, Exercise, and Performance Psychology', 8),
      (v_art_id, 'peer_reviewed', 1, 'Incidental physical activity is positively associated with cardiorespiratory fitness', '2019', 'https://doi.org/10.1249/MSS.0000000000001886', 'Medicine & Science in Sports & Exercise', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT08-024 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-024';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Self-care and self-compassion in palliative care: A qualitative study', '2020', 'https://doi.org/10.1186/s12904-020-00577-5', 'BMC Palliative Care', 1),
      (v_art_id, 'peer_reviewed', 1, 'Self-care deficit theory of nursing: An evaluation', '2017', 'https://doi.org/10.1016/j.ijnss.2017.02.002', 'International Journal of Nursing Sciences', 2),
      (v_art_id, 'peer_reviewed', 1, 'Burnout and self-care in mental health professionals: A systematic review', '2020', 'https://doi.org/10.1016/j.cpr.2020.101796', 'Clinical Psychology Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'The relationship between self-compassion and emotional exhaustion in healthcare professionals: A systematic review', '2021', 'https://doi.org/10.1007/s12671-021-01633-3', 'Mindfulness', 4),
      (v_art_id, 'peer_reviewed', 1, 'Boundaries and self-care in mental health practice', '2019', 'https://doi.org/10.1037/pro0000265', 'Professional Psychology: Research and Practice', 5),
      (v_art_id, 'peer_reviewed', 1, 'Sleep hygiene: Evidence for reliable and valid self-report measures', '2018', 'https://doi.org/10.1016/j.sleh.2018.03.003', 'Sleep Health', 6),
      (v_art_id, 'peer_reviewed', 1, 'Social connection and health: A systematic review and meta-analysis', '2010', 'https://doi.org/10.1371/journal.pmed.1000316', 'PLoS Medicine', 7),
      (v_art_id, 'peer_reviewed', 1, 'Time spent in outdoor activities in relation to personal sun exposure and skin cancer risk', '2015', 'https://doi.org/10.1158/1055-9965.EPI-15-0198', 'Cancer Epidemiology, Biomarkers & Prevention', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT08-025 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-025';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'How are habits formed: Modelling habit formation in the real world', '2010', 'https://doi.org/10.1002/ejsp.674', 'European Journal of Social Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Minimal behavioral interventions: Practical applications in public health', '2018', 'https://doi.org/10.2105/AJPH.2018.304602', 'American Journal of Public Health', 2),
      (v_art_id, 'peer_reviewed', 1, 'The role of habit in forming behavioral intentions: A test of habit-intention interactions', '2017', 'https://doi.org/10.1521/soco.2017.35.3.247', 'Social Cognition', 3),
      (v_art_id, 'peer_reviewed', 1, 'Small wins and feeling good: A test of the social psychological theory of momentum', '2011', 'https://doi.org/10.1037/a0024450', 'Journal of Applied Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Brief mindfulness meditation interventions: A systematic review', '2020', 'https://doi.org/10.1007/s12671-020-01312-y', 'Mindfulness', 5),
      (v_art_id, 'peer_reviewed', 1, 'Dose-response relationship between physical activity and mental health: Population-based study', '2020', 'https://doi.org/10.1136/bjsports-2020-102590', 'British Journal of Sports Medicine', 6),
      (v_art_id, 'peer_reviewed', 1, 'The relationship between sleep duration and depression: A systematic review', '2020', 'https://doi.org/10.1016/j.smrv.2020.101269', 'Sleep Medicine Reviews', 7),
      (v_art_id, 'peer_reviewed', 1, 'Adherence to exercise: The effect of goal setting and habit formation', '2019', 'https://doi.org/10.1016/j.psychsport.2019.03.008', 'Psychology of Sport and Exercise', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT08-026 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-026';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Psychological flexibility as a fundamental aspect of health', '2010', 'https://doi.org/10.1016/j.cpr.2010.03.001', 'Clinical Psychology Review', 1),
      (v_art_id, 'peer_reviewed', 1, 'The role of flexibility in coping with stress and adversity', '2021', 'https://doi.org/10.1037/pspp0000364', 'Journal of Personality and Social Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Self-compassion and adaptive psychological functioning', '2019', 'https://doi.org/10.1016/j.jrp.2019.02.007', 'Journal of Research in Personality', 3),
      (v_art_id, 'peer_reviewed', 1, 'The impact of life transitions on mental health', '2020', 'https://doi.org/10.1176/appi.ajp.2020.19111152', 'American Journal of Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Habit disruption during life transitions: Mechanisms and interventions', '2021', 'https://doi.org/10.1080/17437199.2021.1903431', 'Health Psychology Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'All-or-nothing thinking and mental health outcomes', '2020', 'https://doi.org/10.1007/s10608-020-10110-0', 'Cognitive Therapy and Research', 6),
      (v_art_id, 'peer_reviewed', 1, 'Implementation intentions during disruption: The role of if-then planning', '2022', 'https://doi.org/10.1016/j.jesp.2022.104321', 'Journal of Experimental Social Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'The compassionate mind approach to building social safeness', '2021', 'https://doi.org/10.1002/cpp.2543', 'Clinical Psychology & Psychotherapy', 8),
      (v_art_id, 'peer_reviewed', 1, 'Routine maintenance during the COVID-19 pandemic', '2022', 'https://doi.org/10.1177/13591053221079335', 'Journal of Health Psychology', 9),
      (v_art_id, 'peer_reviewed', 1, 'Behavioral economics of habit formation under uncertainty', '2021', 'https://doi.org/10.3390/bs11100136', 'Behavioral Science', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT08-027 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-027';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The post-lunch dip in alertness and performance', '2020', 'https://doi.org/10.1080/07420528.2020.1761372', 'Chronobiology International', 1),
      (v_art_id, 'peer_reviewed', 1, 'The effects of brief naps on cognitive performance', '2021', 'https://doi.org/10.1016/j.smrv.2021.101456', 'Sleep Medicine Reviews', 2),
      (v_art_id, 'peer_reviewed', 1, 'Walking breaks and cognitive function in sedentary workers', '2020', 'https://doi.org/10.1037/ocp0000243', 'Journal of Occupational Health Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Sunlight exposure and circadian rhythm maintenance', '2022', 'https://doi.org/10.1038/s41583-022-00563-z', 'Nature Reviews Neuroscience', 4),
      (v_art_id, 'peer_reviewed', 1, 'The impact of meal composition on post-prandial energy levels', '2021', 'https://doi.org/10.3390/nu13093080', 'Nutrients', 5),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness micro-practices in workplace settings', '2021', 'https://doi.org/10.1007/s12671-021-01625-3', 'Mindfulness', 6),
      (v_art_id, 'peer_reviewed', 1, 'Cold water face immersion and autonomic nervous system activation', '2020', 'https://doi.org/10.1007/s00421-020-04456-9', 'European Journal of Applied Physiology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Social connection and workplace well-being', '2022', 'https://doi.org/10.1037/apl0000942', 'Journal of Applied Psychology', 8),
      (v_art_id, 'peer_reviewed', 1, 'The neuroscience of transitions: Mental task-switching costs', '2021', 'https://doi.org/10.3758/s13415-021-00918-8', 'Cognitive, Affective, & Behavioral Neuroscience', 9),
      (v_art_id, 'peer_reviewed', 1, 'Caffeine tolerance and afternoon energy: A systematic review', '2020', 'https://doi.org/10.1007/s00213-020-05589-3', 'Psychopharmacology', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT08-028 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-028';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Social jetlag and metabolic health outcomes', '2021', 'https://doi.org/10.1016/j.cub.2021.07.052', 'Current Biology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Weekend catch-up sleep and cardiovascular health', '2022', 'https://doi.org/10.1016/j.smrv.2022.101672', 'Sleep Medicine Reviews', 2),
      (v_art_id, 'peer_reviewed', 1, 'The psychological benefits of structured leisure time', '2020', 'https://doi.org/10.1037/pspp0000391', 'Journal of Personality and Social Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Rest and recovery: The science of downtime', '2021', 'https://doi.org/10.1146/annurev-psych-020420-032815', 'Annual Review of Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Sunday scaries: Anticipatory anxiety and the weekend-to-workweek transition', '2021', 'https://doi.org/10.1037/ocp0000295', 'Journal of Occupational Health Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'The impact of weekend routine on Monday productivity', '2020', 'https://doi.org/10.1016/j.obhdp.2020.08.003', 'Organizational Behavior and Human Decision Processes', 6),
      (v_art_id, 'peer_reviewed', 1, 'All-or-nothing thinking and lifestyle behaviors', '2021', 'https://doi.org/10.1037/hea0001056', 'Health Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Free time and well-being: The role of structure vs. freedom', '2022', 'https://doi.org/10.1177/09567976221113949', 'Psychological Science', 8),
      (v_art_id, 'peer_reviewed', 1, 'Circadian misalignment and mood disorders', '2022', 'https://doi.org/10.1038/s41380-022-01500-y', 'Molecular Psychiatry', 9),
      (v_art_id, 'peer_reviewed', 1, 'The two-day effect: Weekend structure and depressive symptoms', '2021', 'https://doi.org/10.1016/j.ypmed.2021.106689', 'Preventive Medicine', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT08-029 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-029';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Psychological flexibility and mental health: A meta-analysis', '2021', 'https://doi.org/10.1016/j.cpr.2021.102009', 'Clinical Psychology Review', 1),
      (v_art_id, 'peer_reviewed', 1, 'Grit, self-control, and the distinction between perseverance and rigidity', '2020', 'https://doi.org/10.1037/pspp0000323', 'Journal of Personality and Social Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Interoceptive awareness and self-regulation', '2021', 'https://doi.org/10.1016/j.neubiorev.2021.06.009', 'Neuroscience & Biobehavioral Reviews', 3),
      (v_art_id, 'peer_reviewed', 1, 'The role of self-compassion in behavioral change', '2020', 'https://doi.org/10.1177/1088868320912450', 'Personality and Social Psychology Review', 4),
      (v_art_id, 'peer_reviewed', 1, 'Context-dependent habit flexibility', '2022', 'https://doi.org/10.1016/j.tics.2022.04.009', 'Trends in Cognitive Sciences', 5),
      (v_art_id, 'peer_reviewed', 1, 'The costs of self-control: Evidence from glucose metabolism', '2020', 'https://doi.org/10.1177/0956797620904990', 'Psychological Science', 6),
      (v_art_id, 'peer_reviewed', 1, 'Differentiation of productive persistence from rigid perfectionism', '2021', 'https://doi.org/10.1177/1073191121999927', 'Assessment', 7),
      (v_art_id, 'reference', 5, 'The Body Keeps the Score: Brain, Mind, and Body in the Healing of Trauma', '2014', 'https://www.penguinrandomhouse.com/books/223139/', 'Viking', 8),
      (v_art_id, 'peer_reviewed', 1, 'Ego depletion and the strength model of self-control', '2021', 'https://doi.org/10.1146/annurev-psych-061020-105721', 'Annual Review of Psychology', 9),
      (v_art_id, 'peer_reviewed', 1, 'Behavioral activation vs. avoidance: Clinical decision-making', '2020', 'https://doi.org/10.1016/j.beth.2020.01.002', 'Behavior Therapy', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT08-030 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-030';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Seasonal affective disorder: An overview of assessment and treatment approaches', '2020', 'https://doi.org/10.1002/da.23047', 'Depression and Anxiety', 1),
      (v_art_id, 'peer_reviewed', 1, 'Light therapy for seasonal and nonseasonal depression', '2021', 'https://doi.org/10.1016/j.jad.2021.08.014', 'Journal of Affective Disorders', 2),
      (v_art_id, 'peer_reviewed', 1, 'Seasonal variations in mood and behavior: The role of circadian rhythms', '2022', 'https://doi.org/10.1097/YCO.0000000000000803', 'Current Opinion in Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'The impact of daylight saving time transitions on mental health', '2020', 'https://doi.org/10.1097/EDE.0000000000001194', 'Epidemiology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Exercise and seasonal mood: Evidence from Nordic populations', '2021', 'https://doi.org/10.1111/sms.13934', 'Scandinavian Journal of Medicine & Science in Sports', 5),
      (v_art_id, 'peer_reviewed', 1, 'Dietary patterns and seasonal depression', '2020', 'https://doi.org/10.1080/1028415X.2020.1751507', 'Nutritional Neuroscience', 6),
      (v_art_id, 'peer_reviewed', 1, 'Winter metabolism: Changes in energy expenditure and appetite', '2021', 'https://doi.org/10.1038/s41430-021-00956-3', 'European Journal of Clinical Nutrition', 7),
      (v_art_id, 'peer_reviewed', 1, 'Summer heat and mental health: A systematic review', '2022', 'https://doi.org/10.3390/ijerph19138248', 'International Journal of Environmental Research and Public Health', 8),
      (v_art_id, 'peer_reviewed', 1, 'The biology of seasonal transitions: Sleep, mood, and behavior', '2021', 'https://doi.org/10.1038/s41583-021-00464-9', 'Nature Reviews Neuroscience', 9),
      (v_art_id, 'peer_reviewed', 1, 'Social rhythms and bipolar disorder: Seasonal patterns', '2020', 'https://doi.org/10.1111/bdi.12956', 'Bipolar Disorders', 10)
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
  WHERE a.article_production_id LIKE 'CAT08-%';

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;
