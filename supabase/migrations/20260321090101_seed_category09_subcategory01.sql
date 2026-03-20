-- ============================================================================
-- Seed: Category 9 (Sleep, Body & Mind-Body Connection) — Subcategory 01
-- 10 articles: CAT09-001 through CAT09-010
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert Category if not present
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  'Sleep, Body & Mind-Body Connection',
  'sleep-body-connection',
  'The mind-body connection — sleep science, exercise psychology, nutrition, and somatic awareness for mental wellness.',
  'Moon',
  9,
  60,
  '#8B5CF6'
)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------------------
-- 2. Insert Subcategory
-- ---------------------------------------------------------------------------

DO $$
DECLARE
  v_cat_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'sleep-body-connection';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Sleep Science & Mental Health', 'sleep-science-and-mental-health', v_cat_id, 1)
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'sleep-body-connection';
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'sleep-science-and-mental-health' AND category_id = v_cat_id;

  -- CAT09-001: Why Sleep Is the Foundation of Mental Health: What the Research Shows
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Why Sleep Is the Foundation of Mental Health: What the Research Shows',
    'why-sleep-foundation-mental-health-research',
    'draft',
    'Sleep, Body & Mind-Body Connection',
    ARRAY['Sleep Science', 'Mental Health', 'Neuroscience', 'Research'],
    1020,
    'Dr. Sarah Chen',
    'self_help',
    'CAT09-001',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Sleep isn''t just rest—it''s essential mental health infrastructure. Explore the research showing how sleep regulates emotion, consolidates memory, and protects psychological wellbeing.',
    '/images/articles/cat09/cover-001.svg',
    10,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT09-002: How Sleep Deprivation Affects Your Mood, Thinking, and Relationships
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How Sleep Deprivation Affects Your Mood, Thinking, and Relationships',
    'sleep-deprivation-mood-thinking-relationships',
    'draft',
    'Sleep, Body & Mind-Body Connection',
    ARRAY['Sleep Deprivation', 'Mood', 'Cognition', 'Relationships'],
    988,
    'Dr. Sarah Chen',
    'self_help',
    'CAT09-002',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Sleep loss doesn''t just make you tired—it changes how you think, feel, and connect with others. Learn the specific ways sleep deprivation impacts daily life.',
    '/images/articles/cat09/cover-002.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT09-003: The Sleep Cycle Explained: REM, Deep Sleep, and Why Each Stage Matters
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Sleep Cycle Explained: REM, Deep Sleep, and Why Each Stage Matters',
    'sleep-cycle-rem-deep-sleep-stages',
    'draft',
    'Sleep, Body & Mind-Body Connection',
    ARRAY['Sleep Stages', 'REM Sleep', 'Sleep Cycle', 'Neuroscience'],
    1000,
    'Dr. Sarah Chen',
    'self_help',
    'CAT09-003',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Sleep isn''t one uniform state—it''s a complex cycle of distinct stages, each serving critical functions for brain and body health. Learn what happens during each phase.',
    '/images/articles/cat09/cover-003.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT09-004: How Much Sleep Do You Actually Need? Age-by-Age Recommendations
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How Much Sleep Do You Actually Need? Age-by-Age Recommendations',
    'how-much-sleep-do-you-need-age-recommendations',
    'draft',
    'Sleep, Body & Mind-Body Connection',
    ARRAY['Sleep Duration', 'Sleep Needs', 'Lifespan', 'Health'],
    979,
    'Dr. Sarah Chen',
    'self_help',
    'CAT09-004',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Sleep needs vary dramatically across the lifespan. Learn the evidence-based recommendations for every age group and why individual variation matters.',
    '/images/articles/cat09/cover-004.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT09-005: The Bidirectional Relationship: How Mental Health Affects Sleep and Sleep Affects Mental Health
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Bidirectional Relationship: How Mental Health Affects Sleep and Sleep Affects Mental Health',
    'bidirectional-relationship-mental-health-sleep',
    'draft',
    'Sleep, Body & Mind-Body Connection',
    ARRAY['Mental Health', 'Sleep Disorders', 'Bidirectional', 'Treatment'],
    997,
    'Dr. Sarah Chen',
    'self_help',
    'CAT09-005',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Sleep problems and mental health conditions create a feedback loop that can be hard to break. Understanding this two-way relationship is key to effective treatment.',
    '/images/articles/cat09/cover-005.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT09-006: Sleep Hygiene 101: Evidence-Based Habits for Better Sleep
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Sleep Hygiene 101: Evidence-Based Habits for Better Sleep',
    'sleep-hygiene-evidence-based-habits-better-sleep',
    'draft',
    'Sleep, Body & Mind-Body Connection',
    ARRAY['Sleep Hygiene', 'Habits', 'Sleep Quality', 'Evidence-Based'],
    969,
    'Dr. Sarah Chen',
    'self_help',
    'CAT09-006',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Good sleep hygiene isn''t just about warm milk and lavender. Learn the science-backed habits that actually improve sleep quality and duration.',
    '/images/articles/cat09/cover-006.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT09-007: Your Circadian Rhythm: How Your Internal Clock Controls Everything
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Your Circadian Rhythm: How Your Internal Clock Controls Everything',
    'circadian-rhythm-internal-clock-controls-everything',
    'draft',
    'Sleep, Body & Mind-Body Connection',
    ARRAY['Circadian Rhythm', 'Chronobiology', 'Sleep Science', 'Metabolism'],
    969,
    'Dr. Sarah Chen',
    'self_help',
    'CAT09-007',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Your circadian rhythm regulates far more than sleep—it orchestrates hormones, metabolism, mood, and immune function across the 24-hour cycle.',
    '/images/articles/cat09/cover-007.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT09-008: Blue Light, Screens, and Sleep: What the Science Actually Says
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Blue Light, Screens, and Sleep: What the Science Actually Says',
    'blue-light-screens-sleep-science-evidence',
    'draft',
    'Sleep, Body & Mind-Body Connection',
    ARRAY['Blue Light', 'Screen Time', 'Melatonin', 'Technology'],
    970,
    'Dr. Sarah Chen',
    'self_help',
    'CAT09-008',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Blue light suppresses melatonin, but is it the real reason screens disrupt sleep? Explore what the research reveals about technology and rest.',
    '/images/articles/cat09/cover-008.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT09-009: Caffeine, Alcohol, and Sleep: How Common Substances Sabotage Your Rest
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Caffeine, Alcohol, and Sleep: How Common Substances Sabotage Your Rest',
    'caffeine-alcohol-sleep-substances-sabotage-rest',
    'draft',
    'Sleep, Body & Mind-Body Connection',
    ARRAY['Caffeine', 'Alcohol', 'Sleep Quality', 'Substances'],
    974,
    'Dr. Sarah Chen',
    'self_help',
    'CAT09-009',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Coffee helps you wake up, and alcohol helps you fall asleep—right? The truth about how these substances affect sleep quality is more complicated.',
    '/images/articles/cat09/cover-009.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT09-010: The Weekend Sleep Catch-Up Myth: Does Sleeping In Actually Help?
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Weekend Sleep Catch-Up Myth: Does Sleeping In Actually Help?',
    'weekend-sleep-catch-up-myth-sleeping-in-help',
    'draft',
    'Sleep, Body & Mind-Body Connection',
    ARRAY['Sleep Debt', 'Weekend Sleep', 'Recovery Sleep', 'Circadian Rhythm'],
    975,
    'Dr. Sarah Chen',
    'self_help',
    'CAT09-010',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Can you "bank" sleep on weekends to compensate for weekday deprivation? The research reveals why catch-up sleep is more complicated than it seems.',
    '/images/articles/cat09/cover-010.svg',
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

  -- === CAT09-001 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT09-001';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Sleep and mental health in undergraduate students', '2023', 'https://doi.org/10.1080/15402002.2023.2165647', 'Behavioral Sleep Medicine', 1),
      (v_art_id, 'peer_reviewed', 1, 'The bidirectional relationship between sleep and mental health', '2020', 'https://doi.org/10.1016/j.smrv.2020.101309', 'Sleep Medicine Reviews', 2),
      (v_art_id, 'peer_reviewed', 1, 'Sleep and emotional regulation', '2020', 'https://doi.org/10.1016/j.copsyc.2019.06.026', 'Current Opinion in Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Sleep deprivation and depression: a bidirectional association', '2021', 'https://doi.org/10.1080/15622975.2020.1774607', 'World Journal of Biological Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'REM sleep and emotional memory processing', '2019', 'https://doi.org/10.1038/s41593-019-0467-4', 'Nature Neuroscience', 5),
      (v_art_id, 'peer_reviewed', 1, 'Sleep, brain connectivity, and psychiatric disorders', '2022', 'https://doi.org/10.1001/jamapsychiatry.2022.1144', 'JAMA Psychiatry', 6),
      (v_art_id, 'government', 2, 'Insufficient sleep as a public health problem', '2022', 'https://www.cdc.gov/sleep/data_statistics.html', 'Centers for Disease Control and Prevention', 7),
      (v_art_id, 'government', 2, 'Sleep disorders and mental health', '2023', 'https://www.nimh.nih.gov/health/topics/sleep-disorders', 'National Institute of Mental Health', 8),
      (v_art_id, 'peer_reviewed', 1, 'The neuroprotective aspects of sleep', '2019', 'https://doi.org/10.1126/science.aax7063', 'Science', 9),
      (v_art_id, 'peer_reviewed', 1, 'Sleep loss and emotional reactivity', '2020', 'https://doi.org/10.1177/0963721420917755', 'Current Directions in Psychological Science', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT09-002 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT09-002';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The impact of sleep deprivation on emotional empathy', '2021', 'https://doi.org/10.1111/jsr.13315', 'Journal of Sleep Research', 1),
      (v_art_id, 'peer_reviewed', 1, 'Sleep deprivation and decision-making', '2020', 'https://doi.org/10.1016/j.smrv.2020.101353', 'Sleep Medicine Reviews', 2),
      (v_art_id, 'peer_reviewed', 1, 'Effects of sleep restriction on cognitive performance', '2019', 'https://doi.org/10.1093/sleep/zsz120', 'Sleep', 3),
      (v_art_id, 'peer_reviewed', 1, 'Sleep loss and interpersonal conflict', '2022', 'https://doi.org/10.1177/19485506211058104', 'Social Psychological and Personality Science', 4),
      (v_art_id, 'peer_reviewed', 1, 'Sleep deprivation impairs recognition of human emotions', '2020', 'https://doi.org/10.1016/j.neuroscience.2020.05.001', 'Neuroscience', 5),
      (v_art_id, 'peer_reviewed', 1, 'Chronic sleep restriction: neurobehavioral effects', '2019', 'https://doi.org/10.1017/S0140525X18002108', 'Behavioral and Brain Sciences', 6),
      (v_art_id, 'peer_reviewed', 1, 'Sleep and marital satisfaction', '2021', 'https://doi.org/10.1037/fam0000821', 'Journal of Family Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Sleep duration and relationship quality', '2020', 'https://doi.org/10.1016/j.sleh.2020.01.014', 'Sleep Health', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT09-003 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT09-003';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The sleep cycle: a brief review', '2022', 'https://doi.org/10.1016/j.jsmc.2022.06.001', 'Sleep Medicine Clinics', 1),
      (v_art_id, 'peer_reviewed', 1, 'REM sleep function: myth and reality', '2020', 'https://doi.org/10.1016/j.cub.2020.08.014', 'Current Biology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Slow-wave sleep and memory consolidation', '2021', 'https://doi.org/10.1038/s41583-021-00467-3', 'Nature Reviews Neuroscience', 3),
      (v_art_id, 'peer_reviewed', 1, 'The role of sleep in declarative memory consolidation', '2019', 'https://doi.org/10.1037/bul0000191', 'Psychological Bulletin', 4),
      (v_art_id, 'peer_reviewed', 1, 'Sleep stages and brain oscillations', '2020', 'https://doi.org/10.1016/j.neuron.2020.09.025', 'Neuron', 5),
      (v_art_id, 'peer_reviewed', 1, 'The glymphatic system: a novel pathway for waste clearance', '2019', 'https://doi.org/10.1126/science.aav5842', 'Science', 6),
      (v_art_id, 'peer_reviewed', 1, 'Sleep architecture across the lifespan', '2021', 'https://doi.org/10.1093/sleep/zsab043', 'Sleep', 7),
      (v_art_id, 'peer_reviewed', 1, 'REM sleep and emotional memory processing', '2020', 'https://doi.org/10.1016/j.cobeha.2020.02.005', 'Current Opinion in Behavioral Sciences', 8),
      (v_art_id, 'government', 2, 'Sleep stages', '2023', 'https://www.ninds.nih.gov/health-information/public-education/brain-basics/brain-basics-understanding-sleep', 'National Institute of Neurological Disorders and Stroke', 9),
      (v_art_id, 'reference', 5, 'Sleep physiology and disorders', '2022', 'https://www.mayoclinic.org/diseases-conditions/sleep-disorders/symptoms-causes/syc-20354018', 'Mayo Clinic', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT09-004 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT09-004';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Recommended amount of sleep for a healthy adult', '2015', 'https://doi.org/10.5664/jcsm.4758', 'Journal of Clinical Sleep Medicine', 1),
      (v_art_id, 'professional_org', 3, 'Sleep duration recommendations', '2015', 'https://doi.org/10.1016/j.sleh.2014.12.010', 'National Sleep Foundation', 2),
      (v_art_id, 'peer_reviewed', 1, 'Sleep duration and mortality: a systematic review', '2019', 'https://doi.org/10.1093/sleep/zsz010', 'Sleep', 3),
      (v_art_id, 'peer_reviewed', 1, 'Short and long sleep duration and risk of drowsy driving', '2020', 'https://doi.org/10.1016/j.aap.2020.105460', 'Accident Analysis & Prevention', 4),
      (v_art_id, 'peer_reviewed', 1, 'Sleep in older adults', '2021', 'https://doi.org/10.1016/j.cger.2021.04.001', 'Clinics in Geriatric Medicine', 5),
      (v_art_id, 'peer_reviewed', 1, 'Sleep and the adolescent brain', '2020', 'https://doi.org/10.1016/j.cophys.2019.11.011', 'Current Opinion in Physiology', 6),
      (v_art_id, 'government', 2, 'Sleep recommendations', '2022', 'https://www.cdc.gov/sleep/about_sleep/how_much_sleep.html', 'Centers for Disease Control and Prevention', 7),
      (v_art_id, 'peer_reviewed', 1, 'Individual differences in sleep need', '2020', 'https://doi.org/10.1016/j.cobeha.2020.01.003', 'Current Opinion in Behavioral Sciences', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT09-005 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT09-005';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The bidirectional relationship between sleep and mental health', '2020', 'https://doi.org/10.1016/j.smrv.2020.101309', 'Sleep Medicine Reviews', 1),
      (v_art_id, 'peer_reviewed', 1, 'Insomnia as a predictor of depression: a meta-analytic evaluation', '2021', 'https://doi.org/10.1016/j.jad.2020.11.043', 'Journal of Affective Disorders', 2),
      (v_art_id, 'peer_reviewed', 1, 'Sleep disturbance in anxiety disorders', '2020', 'https://doi.org/10.1007/s11920-020-01173-2', 'Current Psychiatry Reports', 3),
      (v_art_id, 'peer_reviewed', 1, 'Treating sleep problems in psychotherapy', '2019', 'https://doi.org/10.1016/j.cpr.2019.03.006', 'Clinical Psychology Review', 4),
      (v_art_id, 'peer_reviewed', 1, 'CBT-I for comorbid insomnia and depression', '2022', 'https://doi.org/10.1016/j.jsmc.2022.06.004', 'Sleep Medicine Clinics', 5),
      (v_art_id, 'peer_reviewed', 1, 'Sleep and PTSD: nightmares, hyperarousal, and treatment', '2021', 'https://doi.org/10.1007/s11920-021-01253-9', 'Current Psychiatry Reports', 6),
      (v_art_id, 'peer_reviewed', 1, 'Sleep in bipolar disorder', '2020', 'https://doi.org/10.1016/j.psc.2020.05.002', 'Psychiatric Clinics of North America', 7),
      (v_art_id, 'peer_reviewed', 1, 'Treating insomnia improves depression outcomes', '2022', 'https://doi.org/10.1001/jamapsychiatry.2022.0081', 'JAMA Psychiatry', 8),
      (v_art_id, 'professional_org', 3, 'Sleep and mental health', '2023', 'https://www.nami.org/Your-Journey/Individuals-with-Mental-Illness/Taking-Care-of-Your-Body/Sleep', 'National Alliance on Mental Illness', 9),
      (v_art_id, 'government', 2, 'Breaking the insomnia-depression cycle', '2023', 'https://www.nimh.nih.gov/health/topics/sleep-disorders', 'National Institute of Mental Health', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT09-006 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT09-006';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Sleep hygiene: evidence for the effectiveness', '2021', 'https://doi.org/10.1016/j.smrv.2021.101535', 'Sleep Medicine Reviews', 1),
      (v_art_id, 'peer_reviewed', 1, 'Light exposure and sleep quality', '2020', 'https://doi.org/10.5664/jcsm.8608', 'Journal of Clinical Sleep Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'Temperature and sleep: the thermoregulatory basis', '2019', 'https://doi.org/10.1016/j.physbeh.2019.03.022', 'Physiology & Behavior', 3),
      (v_art_id, 'peer_reviewed', 1, 'Exercise timing and sleep quality', '2020', 'https://doi.org/10.1016/j.sleep.2020.03.006', 'Sleep Medicine', 4),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive arousal and sleep: a meta-analysis', '2020', 'https://doi.org/10.1016/j.beth.2019.08.003', 'Behavior Therapy', 5),
      (v_art_id, 'peer_reviewed', 1, 'Sleep environment and sleep quality', '2021', 'https://doi.org/10.1016/j.sleh.2021.02.003', 'Sleep Health', 6),
      (v_art_id, 'professional_org', 3, 'Sleep hygiene recommendations', '2022', 'https://www.thensf.org/sleep-hygiene-what-is-it/', 'National Sleep Foundation', 7),
      (v_art_id, 'government', 2, 'Your guide to healthy sleep', '2022', 'https://www.nhlbi.nih.gov/health/sleep/healthy-sleep-habits', 'National Heart, Lung, and Blood Institute', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT09-007 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT09-007';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The circadian clock and human health', '2020', 'https://doi.org/10.1016/j.cub.2020.02.038', 'Current Biology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Circadian rhythms and mental health', '2021', 'https://doi.org/10.1038/s41398-021-01444-5', 'Translational Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Light and the human circadian clock', '2019', 'https://doi.org/10.1016/j.smrv.2019.03.003', 'Sleep Medicine Reviews', 3),
      (v_art_id, 'peer_reviewed', 1, 'The suprachiasmatic nucleus and circadian timekeeping', '2020', 'https://doi.org/10.1016/bs.pbr.2020.02.006', 'Progress in Brain Research', 4),
      (v_art_id, 'peer_reviewed', 1, 'Shift work and health', '2021', 'https://doi.org/10.1093/occmed/kqab010', 'Occupational Medicine', 5),
      (v_art_id, 'peer_reviewed', 1, 'Social jetlag and metabolic health', '2020', 'https://doi.org/10.1016/j.coemr.2020.03.002', 'Current Opinion in Endocrine and Metabolic Research', 6),
      (v_art_id, 'peer_reviewed', 1, 'Chronotypes: morning and evening types', '2020', 'https://doi.org/10.2147/NSS.S278946', 'Nature and Science of Sleep', 7),
      (v_art_id, 'peer_reviewed', 1, 'Circadian rhythm disruption and disease', '2021', 'https://doi.org/10.1146/annurev-physiol-031820-092733', 'Annual Review of Physiology', 8),
      (v_art_id, 'government', 2, 'Circadian rhythms fact sheet', '2023', 'https://www.nigms.nih.gov/education/fact-sheets/Pages/circadian-rhythms.aspx', 'National Institute of General Medical Sciences', 9),
      (v_art_id, 'professional_org', 3, 'The Nobel Prize in Physiology or Medicine 2017: Circadian Rhythms', '2017', 'https://www.nobelprize.org/prizes/medicine/2017/summary/', 'NobelPrize.org', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT09-008 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT09-008';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Blue light and sleep: review of the evidence', '2020', 'https://doi.org/10.1016/j.smrv.2020.101321', 'Sleep Medicine Reviews', 1),
      (v_art_id, 'peer_reviewed', 1, 'Evening use of light-emitting eReaders negatively affects sleep', '2015', 'https://doi.org/10.1073/pnas.1418490112', 'Proceedings of the National Academy of Sciences', 2),
      (v_art_id, 'peer_reviewed', 1, 'Blue-light filtering lenses and sleep quality', '2021', 'https://doi.org/10.1016/j.jpsychires.2021.02.019', 'Journal of Psychiatric Research', 3),
      (v_art_id, 'peer_reviewed', 1, 'Content matters: cognitive arousal from screen use', '2020', 'https://doi.org/10.1016/j.chb.2020.106422', 'Computers in Human Behavior', 4),
      (v_art_id, 'peer_reviewed', 1, 'Screen time and adolescent sleep', '2021', 'https://doi.org/10.1016/j.sleep.2021.05.009', 'Sleep Medicine', 5),
      (v_art_id, 'peer_reviewed', 1, 'Melanopsin and circadian photoreception', '2020', 'https://doi.org/10.1038/s41586-020-2019-0', 'Nature', 6),
      (v_art_id, 'peer_reviewed', 1, 'Night mode settings: do they help?', '2020', 'https://doi.org/10.1016/j.sleh.2020.01.003', 'Sleep Health', 7),
      (v_art_id, 'professional_org', 3, 'Screen time and sleep disorders', '2022', 'https://www.aap.org/en/patient-care/media-and-children/', 'American Academy of Pediatrics', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT09-009 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT09-009';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Caffeine effects on sleep taken 0, 3, or 6 hours before bedtime', '2013', 'https://doi.org/10.5664/jcsm.3170', 'Journal of Clinical Sleep Medicine', 1),
      (v_art_id, 'peer_reviewed', 1, 'Alcohol and sleep: recent research', '2020', 'https://doi.org/10.1016/j.smrv.2020.101313', 'Sleep Medicine Reviews', 2),
      (v_art_id, 'peer_reviewed', 1, 'Caffeine use disorder: a comprehensive review', '2020', 'https://doi.org/10.1089/jcr.2020.0009', 'Journal of Caffeine Research', 3),
      (v_art_id, 'peer_reviewed', 1, 'Alcohol disrupts sleep homeostasis', '2019', 'https://doi.org/10.1111/acer.14078', 'Alcoholism: Clinical and Experimental Research', 4),
      (v_art_id, 'peer_reviewed', 1, 'Nicotine and sleep disturbance', '2020', 'https://doi.org/10.1016/j.sleep.2020.06.012', 'Sleep Medicine', 5),
      (v_art_id, 'peer_reviewed', 1, 'Genetics of caffeine metabolism', '2019', 'https://doi.org/10.1124/pr.119.017954', 'Pharmacological Reviews', 6),
      (v_art_id, 'professional_org', 3, 'Caffeine and sleep', '2022', 'https://www.thensf.org/caffeine-and-sleep/', 'National Sleep Foundation', 7),
      (v_art_id, 'government', 2, 'Substance use and sleep disorders', '2022', 'https://www.samhsa.gov/find-help/national-helpline', 'Substance Abuse and Mental Health Services Administration', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT09-010 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT09-010';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Weekend recovery sleep and health outcomes', '2021', 'https://doi.org/10.1093/sleep/zsab051', 'Sleep', 1),
      (v_art_id, 'peer_reviewed', 1, 'Sleep debt: theoretical and empirical issues', '2020', 'https://doi.org/10.1016/j.smrv.2020.101276', 'Sleep Medicine Reviews', 2),
      (v_art_id, 'peer_reviewed', 1, 'Social jetlag and metabolic health', '2020', 'https://doi.org/10.1007/s11892-020-01334-w', 'Current Diabetes Reports', 3),
      (v_art_id, 'peer_reviewed', 1, 'Effects of sleep restriction and recovery', '2019', 'https://doi.org/10.5664/jcsm.7678', 'Journal of Clinical Sleep Medicine', 4),
      (v_art_id, 'peer_reviewed', 1, 'Weekend catch-up sleep and cardiovascular health', '2020', 'https://doi.org/10.1016/j.sleh.2020.03.004', 'Sleep Health', 5),
      (v_art_id, 'peer_reviewed', 1, 'Circadian misalignment and weekend sleep', '2021', 'https://doi.org/10.1080/07420528.2021.1889579', 'Chronobiology International', 6),
      (v_art_id, 'peer_reviewed', 1, 'Sleep consistency and health', '2020', 'https://doi.org/10.1016/j.sleep.2020.05.027', 'Sleep Medicine', 7),
      (v_art_id, 'government', 2, 'Sleep deprivation and recovery', '2022', 'https://www.nhlbi.nih.gov/health/sleep-deprivation', 'National Heart, Lung, and Blood Institute', 8)
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
  WHERE a.article_production_id LIKE 'CAT09-%';

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;
