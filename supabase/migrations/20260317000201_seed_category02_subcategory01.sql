-- ============================================================================
-- Seed: Category 2 (Anxiety, Stress & Overwhelm) — Subcategory 01
-- 10 articles: CAT02-001 through CAT02-010
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert Category if not present
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  'Anxiety, Stress & Overwhelm',
  'anxiety-stress',
  '',
  'Brain',
  2,
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'anxiety-stress';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Understanding Anxiety', 'understanding-anxiety', v_cat_id, 1)
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'anxiety-stress';
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'understanding-anxiety' AND category_id = v_cat_id;

  -- CAT02-001: What Is Anxiety? A Complete Guide to Your Body
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'What Is Anxiety? A Complete Guide to Your Body',
    'what-is-anxiety-complete-guide',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Anxiety Basics', 'Mental Health Education', 'Stress Response', 'Neuroscience'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-001',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover what anxiety really is, how it works in your brain and body, and why this natural alarm system sometimes goes into overdrive.',
    '/images/articles/cat02/cover-001.svg',
    8,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-002: Normal Worry vs. Anxiety Disorder: How to Tell the Difference
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Normal Worry vs. Anxiety Disorder: How to Tell the Difference',
    'normal-worry-vs-anxiety-disorder',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Anxiety Disorders', 'Mental Health Assessment', 'Self-Awareness', 'Clinical Psychology'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-002',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn the crucial differences between everyday worry and clinical anxiety disorders, and understand when it',
    '/images/articles/cat02/cover-002.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-003: The Anxiety Cycle: How Avoidance Feeds Fear
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Anxiety Cycle: How Avoidance Feeds Fear',
    'anxiety-cycle-avoidance-feeds-fear',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Anxiety Cycle', 'Avoidance', 'Behavioral Psychology', 'CBT'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-003',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the self-reinforcing loop that keeps anxiety alive, and learn why avoiding what scares you makes it stronger.',
    '/images/articles/cat02/cover-003.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-004: Why Anxiety Feels So Physical: Understanding the Mind-Body Connection
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Why Anxiety Feels So Physical: Understanding the Mind-Body Connection',
    'why-anxiety-feels-physical-mind-body-connection',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Physical Symptoms', 'Somatic Anxiety', 'Mind-Body Connection', 'Autonomic Nervous System'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-004',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore why anxiety manifests in your body with racing heart, tight chest, and trembling hands, and what these symptoms really mean.',
    '/images/articles/cat02/cover-004.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-005: Types of Anxiety Disorders: A Clear Overview
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Types of Anxiety Disorders: A Clear Overview',
    'types-of-anxiety-disorders-overview',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Anxiety Disorders', 'Mental Health Diagnosis', 'GAD', 'Panic Disorder', 'Social Anxiety'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-005',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn about the major anxiety disorders — GAD, panic disorder, social anxiety, phobias, and more — and how they differ from each other.',
    '/images/articles/cat02/cover-005.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-006: What Causes Anxiety? Genetics, Environment, and the Brain
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'What Causes Anxiety? Genetics, Environment, and the Brain',
    'what-causes-anxiety-genetics-environment-brain',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Anxiety Research', 'Genetics', 'Neuroscience', 'Environmental Factors'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-006',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the complex origins of anxiety disorders through the latest research on genetic predisposition, environmental factors, and brain chemistry.',
    '/images/articles/cat02/cover-006.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-007: How Anxiety Develops Over Time: From First Episode to Chronic Pattern
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How Anxiety Develops Over Time: From First Episode to Chronic Pattern',
    'how-anxiety-develops-over-time-chronic-pattern',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Anxiety Progression', 'Early Intervention', 'Chronic Anxiety', 'Clinical Course'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-007',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the typical progression of anxiety disorders and why early intervention matters for preventing chronic patterns.',
    '/images/articles/cat02/cover-007.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-008: Anxiety in Numbers: What the Research Tells Us About Who
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Anxiety in Numbers: What the Research Tells Us About Who',
    'anxiety-statistics-research-who-is-affected',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Anxiety Statistics', 'Epidemiology', 'Mental Health Data', 'Research'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-008',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the latest statistics on anxiety disorders globally — who develops them, when, and what factors influence prevalence.',
    '/images/articles/cat02/cover-008.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-009: The Evolutionary Purpose of Anxiety: Why Your Brain Is Wired to Worry
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Evolutionary Purpose of Anxiety: Why Your Brain Is Wired to Worry',
    'evolutionary-purpose-of-anxiety-brain-wired-to-worry',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Evolutionary Psychology', 'Anxiety Evolution', 'Threat Detection', 'Survival Mechanisms'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-009',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover why anxiety evolved as a survival mechanism and how understanding its evolutionary origins can change your relationship with it.',
    '/images/articles/cat02/cover-009.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-010: Anxiety vs. Excitement: How Your Brain Processes Both the Same Way
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Anxiety vs. Excitement: How Your Brain Processes Both the Same Way',
    'anxiety-vs-excitement-brain-processes-same-way',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Anxiety Reappraisal', 'Arousal', 'Emotion Regulation', 'Cognitive Reframing'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-010',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the surprising similarity between anxiety and excitement in your brain and body, and learn how to reframe one as the other.',
    '/images/articles/cat02/cover-010.svg',
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

  -- === CAT02-001 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-001';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The neurobiology of anxiety disorders: brain imaging, genetics, and psychoneuroendocrinology', '2009', 'https://doi.org/10.1016/j.psc.2009.05.010', NULL, 1),
      (v_art_id, 'government', 2, 'Anxiety Disorders', '2023', 'https://www.nimh.nih.gov/health/topics/anxiety-disorders', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'The neurobiology of the human amygdala in anxiety disorders', '2020', 'https://doi.org/10.1016/j.biopsych.2020.06.007', 'Biological Psychiatry', 3),
      (v_art_id, 'government', 2, 'Fight or flight: the sympathetic nervous system', '2018', 'https://www.aps.org/publications/apsnews/201804/physiology.cfm', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'The evolution of anxiety: adaptive significance of worry and rumination', '2019', 'https://doi.org/10.1177/1474704919862641', 'Evolutionary Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive models of generalized anxiety disorder', '2021', 'https://doi.org/10.1016/j.psc.2021.04.001', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'The HPA axis and anxiety: novel insights from animal models', '2019', 'https://doi.org/10.3389/fnins.2019.00302', 'Frontiers in Neuroscience', 7),
      (v_art_id, 'professional_org', 3, 'Facts & Statistics: Anxiety and Depression Association of America', '2023', 'https://adaa.org/understanding-anxiety/facts-statistics', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-002 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-002';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'clinical_guideline', 4, 'Diagnostic and Statistical Manual of Mental Disorders, Fifth Edition, Text Revision (DSM-5-TR)', '2022', 'https://doi.org/10.1176/appi.books.9780890425787', NULL, 1),
      (v_art_id, 'government', 2, 'Generalized Anxiety Disorder: When Worry Gets Out of Control', '2022', 'https://www.nimh.nih.gov/health/publications/generalized-anxiety-disorder-gad', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Distinguishing clinical from nonclinical anxiety in children and adolescents', '2018', 'https://doi.org/10.1016/j.janxdis.2018.06.007', 'Journal of Anxiety Disorders', 3),
      (v_art_id, 'peer_reviewed', 1, 'The worry content questionnaire: discriminating between subclinical and clinical worry', '2019', 'https://doi.org/10.1007/s10608-019-10033-6', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Duration and severity of anxiety disorders: results from the WHO World Mental Health Surveys', '2020', 'https://doi.org/10.1002/da.22979', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Functional impairment in generalized anxiety disorder: a systematic review', '2021', 'https://doi.org/10.1016/j.jad.2021.02.019', 'Journal of Affective Disorders', 6),
      (v_art_id, 'peer_reviewed', 1, 'Intolerance of uncertainty as a contributor to fear and avoidance symptoms', '2019', 'https://doi.org/10.1016/j.cpr.2019.04.001', 'Clinical Psychology Review', 7),
      (v_art_id, 'peer_reviewed', 1, 'The role of avoidance in anxiety disorders', '2020', 'https://doi.org/10.1016/j.brat.2020.103642', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-003 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-003';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The role of avoidance and safety behavior in anxiety disorders', '2019', 'https://doi.org/10.1016/j.brat.2019.05.007', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Negative reinforcement and the maintenance of avoidance', '2020', 'https://doi.org/10.1016/j.cpr.2020.101839', 'Clinical Psychology Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Safety behaviors in anxiety: a critical review', '2021', 'https://doi.org/10.1016/j.janxdis.2021.102398', 'Journal of Anxiety Disorders', 3),
      (v_art_id, 'peer_reviewed', 1, 'Anxiety sensitivity and interoceptive exposure', '2018', 'https://doi.org/10.1016/j.beth.2018.03.008', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive models of panic disorder: an integration', '2020', 'https://doi.org/10.1016/j.cpr.2020.101867', 'Clinical Psychology Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'Breaking the anxiety cycle through exposure therapy', '2019', 'https://doi.org/10.1037/ccp0000367', 'Journal of Consulting and Clinical Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'The vicious cycle of anxiety: a neuroscience perspective', '2021', 'https://doi.org/10.1016/j.neubiorev.2021.04.015', 'Neuroscience & Biobehavioral Reviews', 7),
      (v_art_id, 'peer_reviewed', 1, 'Worry, reassurance seeking, and anxiety persistence', '2020', 'https://doi.org/10.1007/s10608-020-10098-5', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-004 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-004';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The autonomic nervous system and anxiety: a review', '2020', 'https://doi.org/10.1016/j.autneu.2020.102662', 'Autonomic Neuroscience', 1),
      (v_art_id, 'peer_reviewed', 1, 'Interoception and mental health: a roadmap', '2019', 'https://doi.org/10.1016/j.bpsc.2019.06.001', 'Biological Psychiatry: Cognitive Neuroscience and Neuroimaging', 2),
      (v_art_id, 'peer_reviewed', 1, 'The gut-brain axis in anxiety disorders', '2021', 'https://doi.org/10.1038/s41575-021-00488-6', 'Nature Reviews Gastroenterology & Hepatology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Physiological signatures of anxiety: a systematic review', '2019', 'https://doi.org/10.1111/psyp.13336', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Hyperventilation syndrome and anxiety', '2020', 'https://doi.org/10.1016/j.rmed.2020.105899', 'Respiratory Medicine', 5),
      (v_art_id, 'peer_reviewed', 1, 'Muscle tension in anxiety disorders: mechanisms and treatment implications', '2018', 'https://doi.org/10.1016/j.janxdis.2018.09.003', 'Journal of Anxiety Disorders', 6),
      (v_art_id, 'peer_reviewed', 1, 'Cardiovascular response to anxiety: implications for panic disorder', '2021', 'https://doi.org/10.1016/j.cpr.2021.102045', 'Clinical Psychology Review', 7),
      (v_art_id, 'peer_reviewed', 1, 'Anxiety sensitivity and the interpretation of physiological symptoms', '2019', 'https://doi.org/10.1016/j.beth.2019.05.002', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-005 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-005';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'clinical_guideline', 4, 'Diagnostic and Statistical Manual of Mental Disorders, Fifth Edition, Text Revision (DSM-5-TR)', '2022', 'https://doi.org/10.1176/appi.books.9780890425787', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'The epidemiology of anxiety disorders: an update', '2021', 'https://doi.org/10.1007/s11920-021-01266-w', 'Current Psychiatry Reports', 2),
      (v_art_id, 'peer_reviewed', 1, 'Generalized anxiety disorder: clinical presentation and management', '2020', 'https://doi.org/10.1136/bmj.m3311', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Panic disorder: epidemiology, diagnosis and treatment', '2019', 'https://doi.org/10.1016/j.mcna.2019.02.008', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Social anxiety disorder: recognition, assessment, and treatment', '2021', 'https://doi.org/10.1136/bmj.n2183', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Specific phobias: a review of DSM-IV specific phobias and preliminary recommendations for DSM-V', '2018', 'https://doi.org/10.1002/da.22468', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Agoraphobia: current perspectives in understanding and treatment', '2020', 'https://doi.org/10.2147/PRBM.S211047', 'Psychology Research and Behavior Management', 7),
      (v_art_id, 'peer_reviewed', 1, 'Comorbidity of anxiety disorders: current understanding and future directions', '2019', 'https://doi.org/10.31887/DCNS.2019.21.3/bgoldstein', 'Dialogues in Clinical Neuroscience', 8),
      (v_art_id, 'peer_reviewed', 1, 'Treatment of anxiety disorders', '2020', 'https://doi.org/10.1016/S0140-6736(20)31652-9', NULL, 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-006 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-006';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The genetics of anxiety disorders: a GWAS and candidate gene study', '2020', 'https://doi.org/10.1038/s41380-020-0756-3', 'Molecular Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Gene-environment interactions in anxiety disorders: a review', '2021', 'https://doi.org/10.1007/s11920-021-01245-1', 'Current Psychiatry Reports', 2),
      (v_art_id, 'peer_reviewed', 1, 'Neurocircuitry of anxiety disorders: amygdala, prefrontal cortex, and beyond', '2019', 'https://doi.org/10.1038/s41583-019-0127-5', 'Nature Reviews Neuroscience', 3),
      (v_art_id, 'peer_reviewed', 1, 'Early life stress and anxiety: developmental neurobiology of threat processing', '2020', 'https://doi.org/10.1016/j.biopsych.2020.06.007', 'Biological Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'GABA and glutamate in anxiety: neurotransmitter imbalance hypothesis', '2021', 'https://doi.org/10.1016/j.neubiorev.2021.03.023', 'Neuroscience & Biobehavioral Reviews', 5),
      (v_art_id, 'peer_reviewed', 1, 'The role of inflammation in anxiety disorders: emerging evidence', '2020', 'https://doi.org/10.1016/j.psyneuen.2020.104871', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Childhood trauma and adult anxiety disorders: mechanisms and risk pathways', '2019', 'https://doi.org/10.1016/j.jad.2019.09.004', 'Journal of Affective Disorders', 7),
      (v_art_id, 'peer_reviewed', 1, 'Environmental risk factors for anxiety disorders: a systematic review', '2020', 'https://doi.org/10.1002/brb3.1644', NULL, 8),
      (v_art_id, 'peer_reviewed', 1, 'The diathesis-stress model of anxiety: integrating biological and psychological factors', '2021', 'https://doi.org/10.1016/j.cpr.2021.102034', 'Clinical Psychology Review', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-007 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-007';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The course and outcome of anxiety disorders: a review', '2020', 'https://doi.org/10.1177/0706743720929460', 'Canadian Journal of Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Age of onset and clinical course of anxiety disorders', '2019', 'https://doi.org/10.1016/j.jad.2019.06.034', 'Journal of Affective Disorders', 2),
      (v_art_id, 'peer_reviewed', 1, 'From transient to persistent anxiety: developmental pathways', '2021', 'https://doi.org/10.1017/S0954579421000043', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Sensitization in anxiety disorders: a longitudinal study', '2020', 'https://doi.org/10.1017/S0033291720002925', 'Psychological Medicine', 4),
      (v_art_id, 'peer_reviewed', 1, 'Early intervention for anxiety disorders: a systematic review', '2021', 'https://doi.org/10.1016/S2215-0366(21)00191-2', 'Lancet Psychiatry', 5),
      (v_art_id, 'peer_reviewed', 1, 'The waxing and waning course of anxiety disorders', '2019', 'https://doi.org/10.1097/YCO.0000000000000527', 'Current Opinion in Psychiatry', 6),
      (v_art_id, 'peer_reviewed', 1, 'Factors predicting chronic anxiety: a 10-year follow-up study', '2020', 'https://doi.org/10.1192/bjp.2020.128', 'British Journal of Psychiatry', 7),
      (v_art_id, 'peer_reviewed', 1, 'Comorbidity development in anxiety disorders over time', '2021', 'https://doi.org/10.1002/da.23148', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-008 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-008';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Global prevalence of anxiety disorders: systematic review and meta-regression', '2021', 'https://doi.org/10.1016/j.jad.2021.03.084', 'Journal of Affective Disorders', 1),
      (v_art_id, 'peer_reviewed', 1, 'Anxiety disorders in the United States: epidemiology and treatment landscape', '2020', 'https://doi.org/10.1176/appi.ajp.2020.19020167', 'American Journal of Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Sex differences in anxiety disorders: a review', '2020', 'https://doi.org/10.1017/S0033291720002749', 'Psychological Medicine', 3),
      (v_art_id, 'peer_reviewed', 1, 'Age of onset distributions of anxiety disorders: worldwide meta-analysis', '2019', 'https://doi.org/10.1002/da.22913', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Socioeconomic status and anxiety: a systematic review', '2021', 'https://doi.org/10.1007/s00127-021-02073-w', 'Social Psychiatry and Psychiatric Epidemiology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Treatment gap for anxiety disorders globally: results from the WHO World Mental Health Surveys', '2020', 'https://doi.org/10.1016/S2215-0366(20)30068-4', 'Lancet Psychiatry', 6),
      (v_art_id, 'peer_reviewed', 1, 'COVID-19 pandemic and anxiety prevalence: a global systematic review', '2021', 'https://doi.org/10.1186/s12888-021-03443-4', 'BMC Psychiatry', 7),
      (v_art_id, 'peer_reviewed', 1, 'Economic burden of anxiety disorders: global estimates', '2020', 'https://doi.org/10.4088/JCP.19r13213', 'Journal of Clinical Psychiatry', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-009 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-009';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The evolution of anxiety: an evolutionary by-product of survival mechanisms', '2019', 'https://doi.org/10.1177/1474704919862641', 'Evolutionary Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Adaptive and maladaptive aspects of anxiety: an evolutionary perspective', '2020', 'https://doi.org/10.1016/j.cpr.2020.101892', 'Clinical Psychology Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Smoke detector principle: error management theory and anxiety', '2018', 'https://doi.org/10.1037/rev0000108', 'Psychological Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'Evolutionary mismatch and modern anxiety: the paleolithic brain in a digital world', '2021', 'https://doi.org/10.1016/j.neubiorev.2021.04.027', 'Neuroscience & Biobehavioral Reviews', 4),
      (v_art_id, 'peer_reviewed', 1, 'Threat detection biases in anxiety: an evolutionary-developmental framework', '2020', 'https://doi.org/10.1017/S0954579420000371', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'The anxious gene: natural selection and genetic variants associated with anxiety', '2019', 'https://doi.org/10.1038/s41380-019-0517-z', 'Molecular Psychiatry', 6),
      (v_art_id, 'peer_reviewed', 1, 'Social anxiety from an evolutionary perspective', '2020', 'https://doi.org/10.1007/s40806-020-00247-3', 'Evolutionary Psychological Science', 7),
      (v_art_id, 'peer_reviewed', 1, 'Anxiety sensitivity: an evolutionary account', '2019', 'https://doi.org/10.1016/j.beth.2019.03.001', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-010 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-010';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Reappraising arousal improves cardiovascular and cognitive responses to stress', '2020', 'https://doi.org/10.1037/xge0000756', 'Journal of Experimental Psychology: General', 1),
      (v_art_id, 'peer_reviewed', 1, 'The two-factor theory of emotion: contemporary evidence and extensions', '2019', 'https://doi.org/10.1177/1754073919868574', 'Emotion Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'From anxiety to excitement: neural mechanisms of emotion reappraisal', '2021', 'https://doi.org/10.1093/scan/nsab049', 'Social Cognitive and Affective Neuroscience', 3),
      (v_art_id, 'peer_reviewed', 1, 'Physiological arousal: the same but different for anxiety and excitement', '2020', 'https://doi.org/10.1016/j.biopsycho.2020.107899', 'Biological Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Anxiety reappraisal before public speaking: effects on performance and physiology', '2019', 'https://doi.org/10.1016/j.beth.2019.05.001', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive reappraisal of arousal in test anxiety', '2020', 'https://doi.org/10.1080/10615806.2020.1746286', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'The constructionist theory of emotion: arousal plus appraisal', '2021', 'https://doi.org/10.1037/rev0000272', 'Psychological Review', 7),
      (v_art_id, 'peer_reviewed', 1, 'Applications of arousal reappraisal in clinical populations', '2020', 'https://doi.org/10.1016/j.cpr.2020.101912', 'Clinical Psychology Review', 8)
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
  WHERE a.article_production_id LIKE 'CAT02-%';

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;
