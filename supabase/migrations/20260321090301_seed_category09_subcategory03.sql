-- ============================================================================
-- Seed: Category 9 (Sleep, Body & Mind-Body Connection) — Subcategory 03
-- 10 articles: CAT09-021 through CAT09-030
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
  VALUES ('Exercise, Movement & Mental Wellness', 'exercise-movement-and-mental-wellness', v_cat_id, 3)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'exercise-movement-and-mental-wellness' AND category_id = v_cat_id;

  -- CAT09-021: Exercise and Mental Health: Why Movement Is as Effective as Some Medications
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Exercise and Mental Health: Why Movement Is as Effective as Some Medications',
    'exercise-mental-health-effective-as-medications',
    'draft',
    'Sleep, Body & Mind-Body Connection',
    ARRAY['Exercise', 'Mental Health', 'Depression', 'Evidence-Based'],
    961,
    'Dr. Sarah Chen',
    'self_help',
    'CAT09-021',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Regular physical activity rivals antidepressants in effectiveness for mild-moderate depression and reduces anxiety as much as therapy.',
    '/images/articles/cat09/cover-021.svg',
    4,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT09-022: How Exercise Changes Your Brain: Neuroplasticity, BDNF, and Mood
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How Exercise Changes Your Brain: Neuroplasticity, BDNF, and Mood',
    'exercise-changes-brain-neuroplasticity-bdnf-mood',
    'draft',
    'Sleep, Body & Mind-Body Connection',
    ARRAY['Neuroscience', 'BDNF', 'Neuroplasticity', 'Exercise'],
    966,
    'Dr. Sarah Chen',
    'self_help',
    'CAT09-022',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Exercise triggers cascades of neurochemical changes—boosting BDNF, growing new neurons, and rewiring circuits involved in mood and stress.',
    '/images/articles/cat09/cover-022.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT09-023: The Best Types of Exercise for Anxiety: What the Research Recommends
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Best Types of Exercise for Anxiety: What the Research Recommends',
    'best-exercise-types-anxiety-research-recommends',
    'draft',
    'Sleep, Body & Mind-Body Connection',
    ARRAY['Anxiety', 'Exercise', 'Aerobic', 'Strength Training'],
    974,
    'Dr. Sarah Chen',
    'self_help',
    'CAT09-023',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Aerobic exercise, strength training, and yoga all reduce anxiety—but they work through different mechanisms. Learn which approach suits you best.',
    '/images/articles/cat09/cover-023.svg',
    2,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT09-024: The Best Types of Exercise for Depression: How Movement Lifts Mood
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Best Types of Exercise for Depression: How Movement Lifts Mood',
    'best-exercise-types-depression-movement-lifts-mood',
    'draft',
    'Sleep, Body & Mind-Body Connection',
    ARRAY['Depression', 'Exercise', 'Treatment', 'Self-Help'],
    990,
    'Dr. Sarah Chen',
    'self_help',
    'CAT09-024',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Aerobic exercise, strength training, and even walking reduce depressive symptoms. Learn optimal intensity, frequency, and how to start when motivation is low.',
    '/images/articles/cat09/cover-024.svg',
    2,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT09-025: Walking for Mental Health: The Simplest Exercise with the Strongest Evidence
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Walking for Mental Health: The Simplest Exercise with the Strongest Evidence',
    'walking-mental-health-simplest-exercise-strongest-evidence',
    'draft',
    'Sleep, Body & Mind-Body Connection',
    ARRAY['Walking', 'Exercise', 'Mental Health', 'Accessibility'],
    986,
    'Dr. Sarah Chen',
    'self_help',
    'CAT09-025',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Walking is free, accessible, and backed by decades of research. Even 10 minutes improves mood, and regular walks rival antidepressants for mild depression.',
    '/images/articles/cat09/cover-025.svg',
    2,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT09-026: Yoga and Mental Health: What the Science Supports (And What It Doesn''t)
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Yoga and Mental Health: What the Science Supports (And What It Doesn''t)',
    'yoga-mental-health-science-supports-what-doesnt',
    'draft',
    'Sleep, Body & Mind-Body Connection',
    ARRAY['Yoga', 'Mind-Body', 'Evidence-Based', 'Mental Health'],
    987,
    'Dr. Sarah Chen',
    'self_help',
    'CAT09-026',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Yoga reduces anxiety and depression—but the research is more nuanced than wellness culture suggests. Learn what evidence supports and what remains unproven.',
    '/images/articles/cat09/cover-026.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT09-027: Exercise and PTSD: How Physical Activity Helps Process Trauma
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Exercise and PTSD: How Physical Activity Helps Process Trauma',
    'exercise-ptsd-physical-activity-helps-process-trauma',
    'draft',
    'Sleep, Body & Mind-Body Connection',
    ARRAY['PTSD', 'Trauma', 'Exercise', 'Body-Based Healing'],
    964,
    'Dr. Sarah Chen',
    'self_help',
    'CAT09-027',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Movement helps trauma survivors regulate arousal, reconnect with their bodies, and reduce PTSD symptoms. Learn which exercises help most.',
    '/images/articles/cat09/cover-027.svg',
    2,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT09-028: The Exercise-Sleep Connection: How Movement Improves Your Rest
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Exercise-Sleep Connection: How Movement Improves Your Rest',
    'exercise-sleep-connection-movement-improves-rest',
    'draft',
    'Sleep, Body & Mind-Body Connection',
    ARRAY['Exercise', 'Sleep Quality', 'Deep Sleep', 'Circadian Rhythm'],
    976,
    'Dr. Sarah Chen',
    'self_help',
    'CAT09-028',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Regular exercise improves sleep quality, reduces time to fall asleep, and increases deep sleep. Learn optimal timing and intensity for better rest.',
    '/images/articles/cat09/cover-028.svg',
    2,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT09-029: Over-Exercising and Mental Health: When Movement Becomes Harmful
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Over-Exercising and Mental Health: When Movement Becomes Harmful',
    'over-exercising-mental-health-when-movement-becomes-harmful',
    'draft',
    'Sleep, Body & Mind-Body Connection',
    ARRAY['Overtraining', 'Exercise Addiction', 'Compulsive Exercise', 'Body Image'],
    967,
    'Dr. Sarah Chen',
    'self_help',
    'CAT09-029',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Compulsive exercise, overtraining, and exercise addiction damage physical and mental health. Learn the warning signs and when to pull back.',
    '/images/articles/cat09/cover-029.svg',
    2,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT09-030: How to Start Moving When Depression Makes Everything Feel Heavy
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How to Start Moving When Depression Makes Everything Feel Heavy',
    'how-to-start-moving-when-depression-makes-everything-heavy',
    'draft',
    'Sleep, Body & Mind-Body Connection',
    ARRAY['Depression', 'Motivation', 'Exercise', 'Behavioral Activation'],
    985,
    'Dr. Sarah Chen',
    'self_help',
    'CAT09-030',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Depression drains motivation and energy, making exercise feel impossible. Learn strategies to start small, build momentum, and overcome activation energy.',
    '/images/articles/cat09/cover-030.svg',
    1,
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

  -- === CAT09-021 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT09-021';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Exercise for depression', '2013', 'https://doi.org/10.1002/14651858.CD004366.pub6', 'Cochrane Database of Systematic Reviews', 1),
      (v_art_id, 'peer_reviewed', 1, 'Physical activity and anxiety', '2020', 'https://doi.org/10.1002/da.22965', 'Depression and Anxiety', 2),
      (v_art_id, 'peer_reviewed', 1, 'Exercise as treatment for depression', '2019', 'https://doi.org/10.1001/jamapsychiatry.2018.4175', 'JAMA Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Dose-response relationship', '2018', 'https://doi.org/10.1176/appi.ajp.2018.17111194', 'American Journal of Psychiatry', 4)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT09-022 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT09-022';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Exercise and brain plasticity', '2019', 'https://doi.org/10.1038/s41583-019-0152-2', 'Nature Reviews Neuroscience', 1),
      (v_art_id, 'peer_reviewed', 1, 'BDNF and exercise', '2020', 'https://doi.org/10.1016/j.tins.2020.01.003', 'Trends in Neurosciences', 2),
      (v_art_id, 'peer_reviewed', 1, 'Hippocampal neurogenesis from exercise', '2019', 'https://doi.org/10.1016/j.cmet.2019.05.011', 'Cell Metabolism', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT09-023 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT09-023';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Exercise modality and anxiety reduction', '2021', 'https://doi.org/10.1016/j.janxdis.2021.102389', 'Journal of Anxiety Disorders', 1),
      (v_art_id, 'peer_reviewed', 1, 'Resistance training for anxiety', '2020', 'https://doi.org/10.1007/s40279-020-01323-8', 'Sports Medicine', 2)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT09-024 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT09-024';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Exercise intensity and depression', '2019', 'https://doi.org/10.1136/bmj.l1428', 'BMJ', 1),
      (v_art_id, 'peer_reviewed', 1, 'Resistance exercise and depression', '2018', 'https://doi.org/10.1001/jamapsychiatry.2018.0572', 'JAMA Psychiatry', 2)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT09-025 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT09-025';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Walking and depression prevention', '2020', 'https://doi.org/10.1016/j.amepre.2020.03.004', 'American Journal of Preventive Medicine', 1),
      (v_art_id, 'peer_reviewed', 1, 'Nature walks and mental health', '2019', 'https://doi.org/10.1021/acs.est.9b01012', 'Environmental Science & Technology', 2)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT09-026 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT09-026';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Yoga for anxiety: a systematic review', '2020', 'https://doi.org/10.1002/da.22967', 'Depression and Anxiety', 1),
      (v_art_id, 'peer_reviewed', 1, 'Yoga and depression', '2019', 'https://doi.org/10.1136/bjsports-2018-100406', 'British Journal of Sports Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'Mechanisms of yoga for mental health', '2020', 'https://doi.org/10.3389/fpsyt.2020.00108', 'Frontiers in Psychiatry', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT09-027 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT09-027';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Exercise for PTSD: a systematic review', '2020', 'https://doi.org/10.1002/jts.22480', 'Journal of Traumatic Stress', 1),
      (v_art_id, 'peer_reviewed', 1, 'Aerobic exercise and PTSD symptoms', '2021', 'https://doi.org/10.1002/da.23124', 'Depression and Anxiety', 2)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT09-028 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT09-028';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Exercise and sleep quality', '2020', 'https://doi.org/10.1016/j.smrv.2020.101278', 'Sleep Medicine Reviews', 1),
      (v_art_id, 'peer_reviewed', 1, 'Exercise timing and sleep', '2019', 'https://doi.org/10.1007/s40279-018-1015-0', 'Sports Medicine', 2)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT09-029 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT09-029';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Overtraining syndrome', '2020', 'https://doi.org/10.1007/s40279-020-01368-9', 'Sports Medicine', 1),
      (v_art_id, 'peer_reviewed', 1, 'Compulsive exercise and eating disorders', '2021', 'https://doi.org/10.1002/eat.23493', 'International Journal of Eating Disorders', 2)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT09-030 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT09-030';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Behavioral activation and exercise', '2020', 'https://doi.org/10.1016/j.jad.2020.02.017', 'Journal of Affective Disorders', 1)
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
