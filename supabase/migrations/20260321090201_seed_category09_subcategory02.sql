-- ============================================================================
-- Seed: Category 9 (Sleep, Body & Mind-Body Connection) — Subcategory 02
-- 10 articles: CAT09-011 through CAT09-020
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
  VALUES ('Sleep Disorders & Common Problems', 'sleep-disorders-and-common-problems', v_cat_id, 2)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'sleep-disorders-and-common-problems' AND category_id = v_cat_id;

  -- CAT09-011: Insomnia: A Complete Guide to When Your Brain Won''t Let You Sleep
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Insomnia: A Complete Guide to When Your Brain Won''t Let You Sleep',
    'insomnia-complete-guide-brain-wont-let-you-sleep',
    'draft',
    'Sleep, Body & Mind-Body Connection',
    ARRAY['Insomnia', 'Sleep Disorders', 'Chronic Insomnia', 'Treatment'],
    972,
    'Dr. Sarah Chen',
    'self_help',
    'CAT09-011',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Insomnia is more than occasional sleepless nights. Explore the types, causes, and evidence-based treatments for the most common sleep disorder.',
    '/images/articles/cat09/cover-011.svg',
    10,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT09-012: CBT-I: The Gold-Standard Treatment for Insomnia That Most People Haven''t Heard Of
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'CBT-I: The Gold-Standard Treatment for Insomnia That Most People Haven''t Heard Of',
    'cbt-i-gold-standard-insomnia-treatment',
    'draft',
    'Sleep, Body & Mind-Body Connection',
    ARRAY['CBT-I', 'Insomnia Treatment', 'Sleep Therapy', 'Behavioral Medicine'],
    974,
    'Dr. Sarah Chen',
    'self_help',
    'CAT09-012',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Cognitive Behavioral Therapy for Insomnia is more effective than medication for long-term sleep improvement. Learn how it works and who it helps.',
    '/images/articles/cat09/cover-012.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT09-013: Sleep Apnea: The Breathing Disorder That Affects Your Mental Health
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Sleep Apnea: The Breathing Disorder That Affects Your Mental Health',
    'sleep-apnea-breathing-disorder-mental-health',
    'draft',
    'Sleep, Body & Mind-Body Connection',
    ARRAY['Sleep Apnea', 'OSA', 'CPAP', 'Mental Health'],
    957,
    'Dr. Sarah Chen',
    'self_help',
    'CAT09-013',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Sleep apnea disrupts breathing during sleep, fragmenting rest and increasing risk of depression, anxiety, and cognitive impairment.',
    '/images/articles/cat09/cover-013.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT09-014: Restless Leg Syndrome: When Your Body Won''t Let You Rest
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Restless Leg Syndrome: When Your Body Won''t Let You Rest',
    'restless-leg-syndrome-body-wont-let-you-rest',
    'draft',
    'Sleep, Body & Mind-Body Connection',
    ARRAY['Restless Leg Syndrome', 'RLS', 'Sleep Disorders', 'Neurological'],
    970,
    'Dr. Sarah Chen',
    'self_help',
    'CAT09-014',
    v_cat_id,
    v_sub_id,
    'drafted',
    'An irresistible urge to move your legs disrupts sleep onset and quality. Learn about this neurological disorder and evidence-based treatments.',
    '/images/articles/cat09/cover-014.svg',
    4,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT09-015: Narcolepsy: Understanding the Condition Beyond the Stereotypes
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Narcolepsy: Understanding the Condition Beyond the Stereotypes',
    'narcolepsy-understanding-condition-beyond-stereotypes',
    'draft',
    'Sleep, Body & Mind-Body Connection',
    ARRAY['Narcolepsy', 'Hypocretin', 'Cataplexy', 'Sleep Disorders'],
    978,
    'Dr. Sarah Chen',
    'self_help',
    'CAT09-015',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Narcolepsy isn''t just "falling asleep randomly." Learn about this complex neurological disorder affecting wakefulness, sleep, and daily functioning.',
    '/images/articles/cat09/cover-015.svg',
    4,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT09-016: Night Terrors and Nightmares: What They Mean and When to Seek Help
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Night Terrors and Nightmares: What They Mean and When to Seek Help',
    'night-terrors-nightmares-when-to-seek-help',
    'draft',
    'Sleep, Body & Mind-Body Connection',
    ARRAY['Nightmares', 'Night Terrors', 'Parasomnias', 'Sleep'],
    980,
    'Dr. Sarah Chen',
    'self_help',
    'CAT09-016',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Night terrors and nightmares disrupt sleep differently. Learn to distinguish them, understand their causes, and know when professional help is needed.',
    '/images/articles/cat09/cover-016.svg',
    4,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT09-017: Sleepwalking, Sleep Talking, and Other Parasomnias Explained
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Sleepwalking, Sleep Talking, and Other Parasomnias Explained',
    'sleepwalking-sleep-talking-parasomnias-explained',
    'draft',
    'Sleep, Body & Mind-Body Connection',
    ARRAY['Parasomnias', 'Sleepwalking', 'Sleep Talking', 'REM Behavior Disorder'],
    978,
    'Dr. Sarah Chen',
    'self_help',
    'CAT09-017',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Parasomnias—unusual behaviors during sleep—range from harmless sleep talking to dangerous sleepwalking. Learn what causes them and how to stay safe.',
    '/images/articles/cat09/cover-017.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT09-018: Shift Work Sleep Disorder: Managing Mental Health on an Irregular Schedule
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Shift Work Sleep Disorder: Managing Mental Health on an Irregular Schedule',
    'shift-work-sleep-disorder-irregular-schedule-mental-health',
    'draft',
    'Sleep, Body & Mind-Body Connection',
    ARRAY['Shift Work', 'Circadian Disruption', 'Sleep Disorder', 'Mental Health'],
    979,
    'Dr. Sarah Chen',
    'self_help',
    'CAT09-018',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Night shifts and rotating schedules disrupt circadian rhythms, increasing risk of insomnia, depression, and health problems. Learn coping strategies.',
    '/images/articles/cat09/cover-018.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT09-019: Sleep Anxiety: When the Fear of Not Sleeping Keeps You Awake
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Sleep Anxiety: When the Fear of Not Sleeping Keeps You Awake',
    'sleep-anxiety-fear-not-sleeping-keeps-you-awake',
    'draft',
    'Sleep, Body & Mind-Body Connection',
    ARRAY['Sleep Anxiety', 'Insomnia', 'Worry', 'Cognitive Behavioral'],
    962,
    'Dr. Sarah Chen',
    'self_help',
    'CAT09-019',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Worrying about sleep creates a vicious cycle of insomnia. Learn how sleep anxiety develops and evidence-based strategies to break free.',
    '/images/articles/cat09/cover-019.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT09-020: When to See a Sleep Specialist: Signs It''s More Than Just a Bad Night
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'When to See a Sleep Specialist: Signs It''s More Than Just a Bad Night',
    'when-to-see-sleep-specialist-signs-more-than-bad-night',
    'draft',
    'Sleep, Body & Mind-Body Connection',
    ARRAY['Sleep Specialist', 'Sleep Medicine', 'Diagnosis', 'Treatment'],
    975,
    'Dr. Sarah Chen',
    'self_help',
    'CAT09-020',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Not all sleep problems require medical intervention, but some do. Learn when to seek professional help and what to expect from a sleep evaluation.',
    '/images/articles/cat09/cover-020.svg',
    3,
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

  -- === CAT09-011 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT09-011';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'clinical_guideline', 4, 'International classification of sleep disorders, third edition', '2014', 'https://aasm.org/clinical-resources/international-classification-sleep-disorders/', 'American Academy of Sleep Medicine', 1),
      (v_art_id, 'peer_reviewed', 1, 'Insomnia: definition, prevalence, etiology, and consequences', '2007', 'https://doi.org/10.5664/jcsm.26929', 'Journal of Clinical Sleep Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive behavioral therapy for insomnia: a systematic review', '2015', 'https://doi.org/10.7326/M14-2841', 'Annals of Internal Medicine', 3),
      (v_art_id, 'peer_reviewed', 1, 'Hyperarousal and insomnia', '2020', 'https://doi.org/10.1016/j.smrv.2019.101259', 'Sleep Medicine Reviews', 4),
      (v_art_id, 'peer_reviewed', 1, 'Pharmacological treatment of insomnia', '2021', 'https://doi.org/10.1016/j.sleep.2021.01.011', 'Sleep Medicine', 5),
      (v_art_id, 'peer_reviewed', 1, 'The neurobiology of insomnia', '2020', 'https://doi.org/10.1007/s11920-020-01173-2', 'Current Psychiatry Reports', 6),
      (v_art_id, 'peer_reviewed', 1, 'Comorbid insomnia and mental disorders', '2019', 'https://doi.org/10.1093/sleep/zsz030', 'Sleep', 7),
      (v_art_id, 'government', 2, 'Insomnia disorder', '2023', 'https://www.nimh.nih.gov/health/topics/sleep-disorders', 'National Institute of Mental Health', 8),
      (v_art_id, 'peer_reviewed', 1, 'Sleep restriction therapy for insomnia', '2020', 'https://doi.org/10.1080/15402002.2019.1698496', 'Behavioral Sleep Medicine', 9),
      (v_art_id, 'peer_reviewed', 1, 'Long-term outcomes of CBT for insomnia', '2021', 'https://doi.org/10.1001/jamapsychiatry.2021.0013', 'JAMA Psychiatry', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT09-012 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT09-012';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Efficacy of cognitive behavioral therapy for insomnia: a meta-analysis', '2015', 'https://doi.org/10.1016/j.smrv.2014.11.007', 'Sleep Medicine Reviews', 1),
      (v_art_id, 'peer_reviewed', 1, 'CBT-I versus pharmacotherapy: long-term outcomes', '2006', 'https://doi.org/10.1001/jama.295.24.2851', 'JAMA', 2),
      (v_art_id, 'peer_reviewed', 1, 'Sleep restriction therapy: implementation and mechanisms', '2019', 'https://doi.org/10.1016/j.jsmc.2019.05.002', 'Sleep Medicine Clinics', 3),
      (v_art_id, 'peer_reviewed', 1, 'Stimulus control instructions for insomnia', '1972', 'https://doi.org/10.1016/0005-7967(72)90061-5', 'Behaviour Research and Therapy', 4),
      (v_art_id, 'peer_reviewed', 1, 'Digital CBT-I: effectiveness and accessibility', '2021', 'https://doi.org/10.1093/sleep/zsab045', 'Sleep', 5),
      (v_art_id, 'peer_reviewed', 1, 'CBT-I for comorbid insomnia and depression', '2020', 'https://doi.org/10.4088/JCP.19r12928', 'Journal of Clinical Psychiatry', 6),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive restructuring in CBT-I', '2020', 'https://doi.org/10.1016/j.cbpra.2019.12.002', 'Cognitive and Behavioral Practice', 7),
      (v_art_id, 'professional_org', 3, 'CBT for insomnia', '2022', 'https://www.thensf.org/cognitive-behavioral-therapy-insomnia/', 'National Sleep Foundation', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT09-013 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT09-013';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'reference', 5, 'Obstructive sleep apnea: diagnosis and treatment', '2020', 'https://doi.org/10.1016/j.mayocp.2020.03.031', 'Mayo Clinic Proceedings', 1),
      (v_art_id, 'peer_reviewed', 1, 'Sleep apnea and mental health', '2021', 'https://doi.org/10.1016/j.smrv.2021.101447', 'Sleep Medicine Reviews', 2),
      (v_art_id, 'peer_reviewed', 1, 'CPAP adherence and depression outcomes', '2019', 'https://doi.org/10.5664/jcsm.7780', 'Journal of Clinical Sleep Medicine', 3),
      (v_art_id, 'peer_reviewed', 1, 'Untreated OSA and cardiovascular risk', '2020', 'https://doi.org/10.1161/CIRCULATIONAHA.119.044195', 'Circulation', 4),
      (v_art_id, 'government', 2, 'Sleep apnea', '2022', 'https://www.nhlbi.nih.gov/health/sleep-apnea', 'National Heart, Lung, and Blood Institute', 5)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT09-014 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT09-014';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Restless legs syndrome: clinical features, diagnosis and treatment', '2020', 'https://doi.org/10.1016/S1474-4422(20)30268-X', 'The Lancet Neurology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Iron deficiency and RLS', '2021', 'https://doi.org/10.1016/j.sleep.2021.02.011', 'Sleep Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'Dopaminergic treatment for RLS', '2020', 'https://doi.org/10.1002/mds.28165', 'Movement Disorders', 3),
      (v_art_id, 'peer_reviewed', 1, 'RLS and mental health comorbidity', '2019', 'https://doi.org/10.1016/j.jpsychores.2019.05.006', 'Journal of Psychosomatic Research', 4)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT09-015 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT09-015';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Narcolepsy: clinical spectrum, diagnosis, and treatment', '2020', 'https://doi.org/10.1038/s41582-020-0387-4', 'Nature Reviews Neurology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Hypocretin deficiency in narcolepsy type 1', '2019', 'https://doi.org/10.1016/j.smrv.2019.04.001', 'Sleep Medicine Reviews', 2),
      (v_art_id, 'peer_reviewed', 1, 'Psychosocial impact of narcolepsy', '2020', 'https://doi.org/10.1016/j.sleep.2020.03.018', 'Sleep Medicine', 3),
      (v_art_id, 'clinical_guideline', 4, 'Treatment of narcolepsy', '2021', 'https://doi.org/10.5664/jcsm.9328', 'American Academy of Sleep Medicine', 4)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT09-016 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT09-016';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Nightmares and the brain', '2020', 'https://doi.org/10.1016/j.smrv.2020.101297', 'Sleep Medicine Reviews', 1),
      (v_art_id, 'peer_reviewed', 1, 'Night terrors in children', '2019', 'https://doi.org/10.1542/peds.2019-0791', 'Pediatrics', 2),
      (v_art_id, 'peer_reviewed', 1, 'Imagery rehearsal therapy for nightmares', '2020', 'https://doi.org/10.1093/sleep/zsaa054', 'Sleep', 3),
      (v_art_id, 'peer_reviewed', 1, 'PTSD and nightmare treatment', '2021', 'https://doi.org/10.1002/jts.22645', 'Journal of Traumatic Stress', 4)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT09-017 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT09-017';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Parasomnias: clinical features and treatment', '2020', 'https://doi.org/10.1016/j.jsmc.2020.02.003', 'Sleep Medicine Clinics', 1),
      (v_art_id, 'peer_reviewed', 1, 'Sleepwalking: epidemiology and treatment', '2019', 'https://doi.org/10.1007/s11940-019-0571-6', 'Current Treatment Options in Neurology', 2),
      (v_art_id, 'peer_reviewed', 1, 'REM sleep behavior disorder', '2020', 'https://doi.org/10.1038/s41582-020-0402-9', 'Nature Reviews Neurology', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT09-018 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT09-018';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Shift work and health outcomes', '2021', 'https://doi.org/10.1093/occmed/kqab010', 'Occupational Medicine', 1),
      (v_art_id, 'peer_reviewed', 1, 'Shift work sleep disorder: diagnosis and management', '2020', 'https://doi.org/10.1016/j.smrv.2020.101321', 'Sleep Medicine Reviews', 2),
      (v_art_id, 'peer_reviewed', 1, 'Light therapy for shift workers', '2019', 'https://doi.org/10.5664/jcsm.7790', 'Journal of Clinical Sleep Medicine', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT09-019 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT09-019';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Pre-sleep cognitive arousal and insomnia', '2020', 'https://doi.org/10.1016/j.beth.2019.08.003', 'Behavior Therapy', 1),
      (v_art_id, 'peer_reviewed', 1, 'Paradoxical intention for sleep onset insomnia', '2019', 'https://doi.org/10.1016/j.smrv.2019.04.002', 'Sleep Medicine Reviews', 2),
      (v_art_id, 'peer_reviewed', 1, 'Acceptance and commitment therapy for insomnia', '2020', 'https://doi.org/10.1016/j.jcbs.2020.08.004', 'Journal of Contextual Behavioral Science', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT09-020 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT09-020';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'clinical_guideline', 4, 'When to refer to a sleep specialist', '2021', 'https://aasm.org/clinical-resources/practice-standards/', 'American Academy of Sleep Medicine', 1),
      (v_art_id, 'peer_reviewed', 1, 'Polysomnography: indications and procedures', '2020', 'https://doi.org/10.1016/j.jsmc.2020.02.001', 'Sleep Medicine Clinics', 2),
      (v_art_id, 'peer_reviewed', 1, 'Home sleep apnea testing', '2019', 'https://doi.org/10.5664/jcsm.7768', 'Journal of Clinical Sleep Medicine', 3)
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
