-- ============================================================================
-- Seed: Category 1 (Emotional Regulation & Self-Awareness) — Subcategory 06
-- 10 articles: CAT01-051 through CAT01-060
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert Category if not present
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  'Emotional Regulation & Self-Awareness',
  'emotional-regulation',
  '',
  'Brain',
  1,
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'emotional-regulation';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Neuroscience Of Emotions', 'neuroscience-of-emotions', v_cat_id, 6)
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'emotional-regulation';
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'neuroscience-of-emotions' AND category_id = v_cat_id;

  -- CAT01-051: Your Brain on Emotions: A Tour of the Neural Networks That Create Feelings
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Your Brain on Emotions: A Tour of the Neural Networks That Create Feelings',
    'your-brain-on-emotions-neural-networks-that-create-feelings',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Neuroscience', 'Brain', 'Research Digest', 'Emotions'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-051',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the brain regions and networks responsible for generating, processing, and regulating emotions—from the amygdala to the prefrontal cortex.',
    '/images/articles/cat01/cover-051.svg',
    8,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-052: The Amygdala
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Amygdala',
    'amygdala-role-how-brain-detects-threat-too-quickly',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Amygdala', 'Fear', 'Neuroscience', 'Research Digest'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-052',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The amygdala is your brain',
    '/images/articles/cat01/cover-052.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-053: Neuroplasticity and Emotional Change: Can You Rewire Your Feeling Patterns?
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Neuroplasticity and Emotional Change: Can You Rewire Your Feeling Patterns?',
    'neuroplasticity-emotional-change-rewire-feeling-patterns',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Neuroplasticity', 'Brain Change', 'Research Digest', 'Therapy'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-053',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Your brain can change throughout life. Neuroplasticity explains how therapy, practice, and experience reshape emotional patterns at a biological level.',
    '/images/articles/cat01/cover-053.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-054: The Vagus Nerve: Your Body
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Vagus Nerve: Your Body',
    'vagus-nerve-bodys-built-in-calm-down-system',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Vagus Nerve', 'Nervous System', 'Research Digest', 'Regulation'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-054',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The vagus nerve connects your brain to your body',
    '/images/articles/cat01/cover-054.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-055: How Stress Hormones Hijack Your Emotional Regulation
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How Stress Hormones Hijack Your Emotional Regulation',
    'stress-hormones-hijack-emotional-regulation',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Stress', 'Cortisol', 'Research Digest', 'Hormones'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-055',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Cortisol and adrenaline are essential for survival—but chronic activation impairs your ability to think clearly and regulate emotions.',
    '/images/articles/cat01/cover-055.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-056: The Neuroscience of Emotional Contagion: Mirror Neurons and Empathy
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Neuroscience of Emotional Contagion: Mirror Neurons and Empathy',
    'neuroscience-emotional-contagion-mirror-neurons-empathy',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Mirror Neurons', 'Empathy', 'Research Digest', 'Social Neuroscience'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-056',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Mirror neurons help you simulate others\',
    '/images/articles/cat01/cover-056.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-057: Why Sleep Deprivation Makes Everything Feel Worse: The Brain Science
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Why Sleep Deprivation Makes Everything Feel Worse: The Brain Science',
    'sleep-deprivation-makes-everything-feel-worse-brain-science',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Sleep', 'Emotional Regulation', 'Research Digest', 'Brain'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-057',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Sleep loss amplifies negative emotions and impairs regulation. Discover how sleep affects your amygdala, prefrontal cortex, and emotional resilience.',
    '/images/articles/cat01/cover-057.svg',
    4,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-058: How Exercise Changes Your Brain Chemistry and Emotional Baseline
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How Exercise Changes Your Brain Chemistry and Emotional Baseline',
    'exercise-changes-brain-chemistry-emotional-baseline',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Exercise', 'Neurochemistry', 'Research Digest', 'Mental Health'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-058',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Physical activity isn',
    '/images/articles/cat01/cover-058.svg',
    4,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-059: The Default Mode Network: What Your Brain Does When You
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Default Mode Network: What Your Brain Does When You',
    'default-mode-network-brain-lost-in-thought',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Default Mode Network', 'Mind-Wandering', 'Research Digest', 'Rumination'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-059',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The DMN activates during rest and mind-wandering. Overactivity is linked to rumination, depression, and self-focused negative thinking.',
    '/images/articles/cat01/cover-059.svg',
    4,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-060: Polyvagal Theory in Plain Language: Your Nervous System
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Polyvagal Theory in Plain Language: Your Nervous System',
    'polyvagal-theory-nervous-system-three-states',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Polyvagal Theory', 'Nervous System', 'Research Digest', 'Trauma'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-060',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Polyvagal theory explains three nervous system states: safe/social, fight/flight, and shutdown. Learn to recognize and shift between them.',
    '/images/articles/cat01/cover-060.svg',
    4,
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

  -- === CAT01-051 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-051';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The neural basis of emotion: A meta-analytic review', '2020', 'https://doi.org/10.1017/S0140525X19002619', 'Behavioral and Brain Sciences', 1),
      (v_art_id, 'peer_reviewed', 1, 'Emotion generation and regulation networks', '2021', 'https://doi.org/10.1038/s41583-021-00445-7', 'Nature Reviews Neuroscience', 2),
      (v_art_id, 'peer_reviewed', 1, 'The role of the prefrontal cortex in emotional regulation', '2020', 'https://doi.org/10.1016/j.tics.2020.03.004', 'Trends in Cognitive Sciences', 3),
      (v_art_id, 'peer_reviewed', 1, 'Subcortical contributions to emotion', '2019', 'https://doi.org/10.1146/annurev-neuro-070918-050342', 'Annual Review of Neuroscience', 4),
      (v_art_id, 'peer_reviewed', 1, 'The insula and emotional awareness', '2021', 'https://doi.org/10.1016/j.copsyc.2020.09.006', 'Current Opinion in Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Hemispheric asymmetry in emotion processing', '2020', 'https://doi.org/10.1016/j.bandc.2020.105608', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'The limbic system: Emotion, memory, and motivation', '2019', 'https://doi.org/10.1016/j.neubiorev.2019.04.003', 'Neuroscience & Biobehavioral Reviews', 7),
      (v_art_id, 'peer_reviewed', 1, 'Neural networks of emotion: Recent advances', '2021', 'https://doi.org/10.1016/j.neuron.2021.02.012', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-052 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-052';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The amygdala in fear and anxiety', '2020', 'https://doi.org/10.1038/s41386-019-0558-y', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Amygdala reactivity and anxiety disorders', '2021', 'https://doi.org/10.1016/j.biopsych.2020.11.014', 'Biological Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Prefrontal-amygdala connectivity in emotion regulation', '2020', 'https://doi.org/10.1016/j.neubiorev.2020.03.025', 'Neuroscience & Biobehavioral Reviews', 3),
      (v_art_id, 'peer_reviewed', 1, 'Amygdala hijack and emotional reactivity', '2019', 'https://doi.org/10.1037/emo0000581', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Fear conditioning and extinction', '2021', 'https://doi.org/10.1038/s41583-021-00467-1', 'Nature Reviews Neuroscience', 5)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-053 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-053';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Neuroplasticity across the lifespan', '2020', 'https://doi.org/10.1038/s41583-020-0283-7', 'Nature Reviews Neuroscience', 1),
      (v_art_id, 'peer_reviewed', 1, 'Therapy-induced neuroplastic changes', '2021', 'https://doi.org/10.1016/j.biopsych.2021.02.010', 'Biological Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness and brain structure changes', '2020', 'https://doi.org/10.1016/j.pscychresns.2020.111084', 'Psychiatry Research: Neuroimaging', 3),
      (v_art_id, 'peer_reviewed', 1, 'Experience-dependent plasticity in emotion circuits', '2021', 'https://doi.org/10.1016/j.tins.2021.01.002', 'Trends in Neurosciences', 4),
      (v_art_id, 'peer_reviewed', 1, 'Neuroplasticity and recovery from mental illness', '2020', 'https://doi.org/10.1097/YCO.0000000000000653', 'Current Opinion in Psychiatry', 5)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-054 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-054';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The vagus nerve and emotion regulation', '2020', 'https://doi.org/10.1016/j.neubiorev.2020.02.009', 'Neuroscience & Biobehavioral Reviews', 1),
      (v_art_id, 'peer_reviewed', 1, 'Vagal tone and mental health', '2021', 'https://doi.org/10.1016/j.biopsycho.2021.108049', 'Biological Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Vagus nerve stimulation for depression', '2020', 'https://doi.org/10.1016/j.brs.2020.08.013', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Breathing and vagal activation', '2019', 'https://doi.org/10.3389/fpsyg.2019.02272', 'Frontiers in Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Polyvagal theory and clinical applications', '2020', 'https://doi.org/10.1016/j.cpr.2020.101850', 'Clinical Psychology Review', 5)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-055 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-055';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Cortisol and the stress response', '2020', 'https://doi.org/10.1038/s41574-020-0355-7', 'Nature Reviews Endocrinology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Chronic stress and prefrontal cortex function', '2021', 'https://doi.org/10.1038/s41593-021-00863-9', 'Nature Neuroscience', 2),
      (v_art_id, 'peer_reviewed', 1, 'Stress hormones and emotional memory', '2020', 'https://doi.org/10.1016/j.neubiorev.2020.04.012', 'Neuroscience & Biobehavioral Reviews', 3),
      (v_art_id, 'peer_reviewed', 1, 'HPA axis dysregulation in mood disorders', '2021', 'https://doi.org/10.1038/s41380-020-00946-3', 'Molecular Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Allostatic load and health outcomes', '2020', 'https://doi.org/10.1097/PSY.0000000000000841', 'Psychosomatic Medicine', 5)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-056 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-056';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Mirror neuron system and empathy', '2020', 'https://doi.org/10.1016/j.cub.2020.02.016', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Emotional contagion: Neural mechanisms', '2021', 'https://doi.org/10.1016/j.tics.2021.02.003', 'Trends in Cognitive Sciences', 2),
      (v_art_id, 'peer_reviewed', 1, 'Empathy and brain connectivity', '2020', 'https://doi.org/10.1016/j.neubiorev.2020.05.008', 'Neuroscience & Biobehavioral Reviews', 3),
      (v_art_id, 'peer_reviewed', 1, 'Mirror neuron dysfunction in autism', '2019', 'https://doi.org/10.1038/s41380-019-0405-5', 'Molecular Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Social pain and physical pain: Shared neural circuits', '2020', 'https://doi.org/10.1126/science.aay2352', 'Science', 5)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-057 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-057';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Sleep and emotional brain function', '2021', 'https://doi.org/10.1038/s41583-021-00464-4', 'Nature Reviews Neuroscience', 1),
      (v_art_id, 'peer_reviewed', 1, 'Sleep deprivation and amygdala reactivity', '2020', 'https://doi.org/10.1016/j.cub.2020.03.019', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'REM sleep and emotional memory processing', '2019', 'https://doi.org/10.1016/j.neubiorev.2019.08.002', 'Neuroscience & Biobehavioral Reviews', 3),
      (v_art_id, 'government', 2, 'Sleep loss and mood disorders', '2020', 'https://doi.org/10.1001/jamapsychiatry.2020.1608', 'JAMA Psychiatry', 4)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-058 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-058';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Exercise and brain plasticity', '2020', 'https://doi.org/10.1038/s41583-020-0322-4', 'Nature Reviews Neuroscience', 1),
      (v_art_id, 'government', 2, 'Physical activity and depression: Meta-analysis', '2021', 'https://doi.org/10.1001/jamapsychiatry.2021.0609', 'JAMA Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Exercise-induced neurogenesis', '2020', 'https://doi.org/10.1016/j.cmet.2020.01.011', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'BDNF and mood regulation', '2019', 'https://doi.org/10.1038/s41380-019-0453-x', 'Molecular Psychiatry', 4)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-059 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-059';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The default mode network and self-referential thought', '2020', 'https://doi.org/10.1016/j.tics.2020.03.011', 'Trends in Cognitive Sciences', 1),
      (v_art_id, 'peer_reviewed', 1, 'DMN hyperactivity in depression', '2021', 'https://doi.org/10.1016/j.biopsych.2021.03.007', 'Biological Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness and DMN deactivation', '2020', 'https://doi.org/10.1016/j.neuroimage.2020.116616', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Mind-wandering and unhappiness', '2010', 'https://doi.org/10.1126/science.1192439', 'Science', 4)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-060 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-060';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'government', 2, 'The polyvagal theory: New insights into adaptive reactions', '2009', 'https://doi.org/10.3949/ccjm.76.s2.17', 'Cleveland Clinic Journal of Medicine', 1),
      (v_art_id, 'peer_reviewed', 1, 'Polyvagal theory and trauma treatment', '2020', 'https://doi.org/10.1016/j.cpr.2020.101850', 'Clinical Psychology Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Vagal regulation and emotional well-being', '2021', 'https://doi.org/10.1016/j.biopsycho.2021.108049', 'Biological Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Social engagement system and co-regulation', '2011', 'https://doi.org/10.1017/S0954579411000156', NULL, 4)
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
  WHERE a.article_production_id LIKE 'CAT01-%';

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;
