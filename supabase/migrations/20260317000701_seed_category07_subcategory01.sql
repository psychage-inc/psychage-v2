-- ============================================================================
-- Seed: Category 7 (Depression, Grief & Loss) — Subcategory 01
-- 10 articles: CAT07-001 through CAT07-010
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert Category if not present
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  'Depression, Grief & Loss',
  'depression-mood',
  '',
  'Brain',
  7,
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'depression-mood';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Understanding Depression', 'understanding-depression', v_cat_id, 1)
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'depression-mood';
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'understanding-depression' AND category_id = v_cat_id;

  -- CAT07-001: What Is Depression? A Comprehensive Guide Beyond 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'What Is Depression? A Comprehensive Guide Beyond ',
    'what-is-depression-comprehensive-guide',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Depression', 'Mental Health Basics', 'Symptoms', 'Understanding'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-001',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Depression is far more than sadness. Understand the clinical definition, symptoms, and how this complex condition affects mind, body, and daily functioning.',
    '/images/articles/cat07/cover-001.svg',
    8,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-002: The Neuroscience of Depression: What
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Neuroscience of Depression: What',
    'neuroscience-of-depression-brain-changes',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Neuroscience', 'Brain Chemistry', 'Research', 'Depression'],
    1800,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-002',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the brain changes underlying depression—from neurotransmitter systems to structural alterations, inflammation, and reward circuitry dysfunction.',
    '/images/articles/cat07/cover-002.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-003: Depression vs. Sadness: How to Know When It
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Depression vs. Sadness: How to Know When It',
    'depression-vs-sadness-when-its-more',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Depression Diagnosis', 'Sadness', 'Mental Health Awareness', 'Self-Assessment'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-003',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn to distinguish normal sadness from clinical depression. Understand the key differences in duration, intensity, functioning, and when to seek professional help.',
    '/images/articles/cat07/cover-003.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-004: The Biopsychosocial Model: Why Depression Has No Single Cause
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Biopsychosocial Model: Why Depression Has No Single Cause',
    'biopsychosocial-model-depression-causes',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Research', 'Causes of Depression', 'Biopsychosocial Model', 'Risk Factors'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-004',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Depression arises from complex interactions between biological, psychological, and social factors. Understand how genetics, life experiences, and environment converge.',
    '/images/articles/cat07/cover-004.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-005: Risk Factors for Depression: What Makes Some People More Vulnerable
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Risk Factors for Depression: What Makes Some People More Vulnerable',
    'risk-factors-depression-vulnerability',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Risk Factors', 'Prevention', 'Vulnerability', 'Depression'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-005',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Identify the biological, psychological, and social factors that increase depression risk—from genetics and childhood adversity to current stressors and protective factors.',
    '/images/articles/cat07/cover-005.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-006: Functional Depression: When You
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Functional Depression: When You',
    'functional-depression-productive-falling-apart',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['High-Functioning Depression', 'Hidden Depression', 'Productivity', 'Mental Health'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-006',
    v_cat_id,
    v_sub_id,
    'drafted',
    'High-functioning depression allows you to meet external responsibilities while suffering internally. Learn to recognize hidden symptoms and why appearing ',
    '/images/articles/cat07/cover-006.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-007: How Depression Affects Your Thinking, Memory, and Decision-Making
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How Depression Affects Your Thinking, Memory, and Decision-Making',
    'depression-affects-thinking-memory-decisions',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Cognitive Symptoms', 'Brain Fog', 'Memory', 'Decision-Making'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-007',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Depression impairs cognitive function beyond mood. Understand how it affects concentration, memory, executive function, and why brain fog is a core symptom.',
    '/images/articles/cat07/cover-007.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-008: Depression and Physical Health: The Bidirectional Relationship
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Depression and Physical Health: The Bidirectional Relationship',
    'depression-physical-health-bidirectional',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Physical Health', 'Research', 'Chronic Illness', 'Mind-Body'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-008',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore how depression affects physical health and vice versa. Understand inflammation, cardiovascular risk, chronic illness, and the mind-body connection.',
    '/images/articles/cat07/cover-008.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-009: Why Depression Makes You Want to Isolate (And Why Isolation Makes Depression Worse)
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Why Depression Makes You Want to Isolate (And Why Isolation Makes Depression Worse)',
    'depression-isolation-cycle',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Social Isolation', 'Loneliness', 'Social Connection', 'Depression'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-009',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the vicious cycle: depression triggers social withdrawal, which deepens depression. Learn why connection matters and how to break the isolation loop.',
    '/images/articles/cat07/cover-009.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-010: Depression Across Cultures: How Different Societies Experience and Express It
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Depression Across Cultures: How Different Societies Experience and Express It',
    'depression-across-cultures-expression',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Cultural Perspectives', 'Global Mental Health', 'Stigma', 'Expression'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-010',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Depression manifests differently across cultures. Explore how cultural context shapes symptoms, help-seeking, stigma, and expression of emotional distress.',
    '/images/articles/cat07/cover-010.svg',
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

  -- === CAT07-001 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-001';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Global prevalence and burden of depressive and anxiety disorders in 204 countries and territories in 2020 due to the COVID-19 pandemic', '2021', 'https://doi.org/10.1016/S0140-6736(21)02143-7', NULL, 1),
      (v_art_id, 'clinical_guideline', 4, 'Diagnostic and Statistical Manual of Mental Disorders, Fifth Edition, Text Revision (DSM-5-TR)', '2022', 'https://www.psychiatry.org/psychiatrists/practice/dsm', NULL, 2),
      (v_art_id, 'government', 2, 'Depression and Other Common Mental Disorders: Global Health Estimates', '2017', 'https://www.who.int/publications/i/item/depression-global-health-estimates', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'The neurobiological basis of major depression: Focus on the neuroendocrine system', '2020', 'https://doi.org/10.1016/j.jad.2020.01.142', 'Journal of Affective Disorders', 4),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive and neurobiological mechanisms of depression: Implications for treatment', '2019', 'https://doi.org/10.1038/s41583-019-0221-y', 'Nature Reviews Neuroscience', 5),
      (v_art_id, 'government', 2, 'Depression: Facts, Statistics, and You', '2023', 'https://www.nimh.nih.gov/health/statistics/major-depression', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Anhedonia in depression: Biological mechanisms and computational models', '2018', 'https://doi.org/10.1016/j.cobeha.2018.01.024', 'Current Opinion in Behavioral Sciences', 7),
      (v_art_id, 'peer_reviewed', 1, 'The experience of depression: A phenomenological approach', '2017', 'https://doi.org/10.1353/ppp.2017.0023', 'Philosophy, Psychiatry, & Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-002 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-002';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The neurobiology of depression: An integrated view', '2020', 'https://doi.org/10.1016/j.ajp.2020.102093', 'Asian Journal of Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Neurobiology of depression: Neurotransmitter dysregulation', '2019', 'https://doi.org/10.31887/DCNS.2019.21.2/rnutt', 'Dialogues in Clinical Neuroscience', 2),
      (v_art_id, 'peer_reviewed', 1, 'Hippocampal volume reduction in major depression', '2018', 'https://doi.org/10.1038/mp.2017.111', 'Molecular Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'HPA axis and depression: Current perspectives', '2020', 'https://doi.org/10.2147/NDT.S245321', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'The role of inflammation in depression: From evolutionary imperative to modern treatment target', '2021', 'https://doi.org/10.1038/s41577-021-00518-y', 'Nature Reviews Immunology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Anhedonia and the brain reward circuitry in depression', '2019', 'https://doi.org/10.1007/s40473-019-00178-5', 'Current Behavioral Neuroscience Reports', 6),
      (v_art_id, 'peer_reviewed', 1, 'Brain-derived neurotrophic factor and major depression: Evidence from animal models and clinical studies', '2020', 'https://doi.org/10.3389/fpsyt.2020.00586', 'Frontiers in Psychiatry', 7),
      (v_art_id, 'peer_reviewed', 1, 'Default mode network connectivity predicts the development of depression following stress', '2018', 'https://doi.org/10.1093/scan/nsy064', 'Social Cognitive and Affective Neuroscience', 8),
      (v_art_id, 'peer_reviewed', 1, 'Neuroplasticity and depression: Implications for treatment', '2019', 'https://doi.org/10.2174/1570159X17666190112125629', NULL, 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-003 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-003';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Differentiating sadness and depression: An empirical study of patterns', '2019', 'https://doi.org/10.1002/cpp.2349', 'Clinical Psychology & Psychotherapy', 1),
      (v_art_id, 'clinical_guideline', 4, 'DSM-5-TR: Diagnostic and Statistical Manual of Mental Disorders', '2022', 'https://www.psychiatry.org/psychiatrists/practice/dsm', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'The course of depressive symptoms: Predicting chronicity and recovery', '2020', 'https://doi.org/10.1016/j.jad.2019.11.113', 'Journal of Affective Disorders', 3),
      (v_art_id, 'peer_reviewed', 1, 'Functional impairment in depression: Distinguishing clinical from subclinical presentations', '2018', 'https://doi.org/10.1016/j.psychres.2018.04.009', 'Psychiatry Research', 4),
      (v_art_id, 'peer_reviewed', 1, 'Negative cognitive style and depression: A longitudinal study', '2019', 'https://doi.org/10.1037/abn0000405', 'Journal of Abnormal Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Early detection of depression: Using symptom patterns to identify at-risk individuals', '2021', 'https://doi.org/10.1186/s12888-021-03123-3', 'BMC Psychiatry', 6),
      (v_art_id, 'peer_reviewed', 1, 'Help-seeking behavior in depression: Barriers and facilitators', '2020', 'https://doi.org/10.1002/jclp.22925', 'Journal of Clinical Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'The relationship between emotional reactivity and symptom severity in depression', '2019', 'https://doi.org/10.1016/j.brat.2019.05.001', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-004 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-004';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The biopsychosocial model of mental illness: A call to action', '2020', 'https://doi.org/10.1016/j.cpr.2020.101891', 'Clinical Psychology Review', 1),
      (v_art_id, 'peer_reviewed', 1, 'Gene-environment interactions in depression: A systematic review', '2021', 'https://doi.org/10.1016/j.jad.2021.03.057', 'Journal of Affective Disorders', 2),
      (v_art_id, 'peer_reviewed', 1, 'Childhood adversity and adult depression: Meta-analysis of prospective studies', '2019', 'https://doi.org/10.1001/jamapsychiatry.2019.0350', 'JAMA Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Social determinants of mental health', '2021', 'https://doi.org/10.1002/wps.20894', 'World Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Stress-generation theory: Understanding the pathway to depression', '2019', 'https://doi.org/10.1016/j.cpr.2019.03.005', 'Clinical Psychology Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'The role of personality in depression: A systematic review', '2020', 'https://doi.org/10.1521/pedi_2020_34_461', 'Journal of Personality Disorders', 6),
      (v_art_id, 'peer_reviewed', 1, 'Epigenetic mechanisms in depression: How environment changes gene expression', '2020', 'https://doi.org/10.1038/s41583-020-0283-7', 'Nature Reviews Neuroscience', 7),
      (v_art_id, 'peer_reviewed', 1, 'Social relationships and depression: A systematic review and meta-analysis', '2018', 'https://doi.org/10.1017/S0033291718001799', 'Psychological Medicine', 8),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive vulnerability to depression: A dual-process model', '2021', 'https://doi.org/10.1016/j.cpr.2021.102007', 'Clinical Psychology Review', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-005 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-005';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Risk and protective factors for major depressive disorder: A systematic review and meta-analysis', '2021', 'https://doi.org/10.1017/S0033291721001665', 'Psychological Medicine', 1),
      (v_art_id, 'peer_reviewed', 1, 'Childhood trauma and adult depression: A meta-analysis of prospective studies', '2020', 'https://doi.org/10.1176/appi.ajp.2019.19050524', 'American Journal of Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Sex differences in depression: Epidemiological findings and biological mechanisms', '2019', 'https://doi.org/10.1038/s41583-019-0216-8', 'Nature Reviews Neuroscience', 3),
      (v_art_id, 'government', 2, 'Social determinants of mental health', '2023', 'https://www.who.int/publications/i/item/9789240045125', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Chronic medical conditions and depression: A population-based cohort study', '2020', 'https://doi.org/10.1001/jamanetworkopen.2020.13845', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Protective factors against depression: A systematic review', '2021', 'https://doi.org/10.1016/j.jad.2021.02.015', 'Journal of Affective Disorders', 6),
      (v_art_id, 'peer_reviewed', 1, 'Life events and depression: The role of ongoing difficulties', '2019', 'https://doi.org/10.1017/S0033291719000928', 'Psychological Medicine', 7),
      (v_art_id, 'peer_reviewed', 1, 'Adverse childhood experiences and adult mental health: A systematic review', '2020', 'https://doi.org/10.1016/S2215-0366(20)30077-4', 'Lancet Psychiatry', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-006 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-006';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Persistent depressive disorder: A clinical and conceptual review', '2020', 'https://doi.org/10.1097/HRP.0000000000000256', 'Harvard Review of Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Functioning and disability in depression: The impact of symptom severity', '2019', 'https://doi.org/10.1016/j.jad.2019.07.011', 'Journal of Affective Disorders', 2),
      (v_art_id, 'peer_reviewed', 1, 'The mask of depression: When high achievers hide their mental illness', '2021', 'https://doi.org/10.1002/jclp.23156', 'Journal of Clinical Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Burnout and depression in high-performing individuals', '2020', 'https://doi.org/10.1093/occmed/kqaa089', 'Occupational Medicine', 4),
      (v_art_id, 'peer_reviewed', 1, 'Why some people with depression appear happy: The concept of smiling depression', '2019', 'https://doi.org/10.1002/da.22934', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'The relationship between perfectionism and depression: A meta-analysis', '2020', 'https://doi.org/10.1037/cou0000386', 'Journal of Counseling Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Stigma and help-seeking in high-functioning depression', '2021', 'https://doi.org/10.1176/appi.ps.202000437', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Quality of life impairment in persistent mild depression', '2018', 'https://doi.org/10.1007/s11136-018-1855-y', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-007 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-007';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Cognitive dysfunction in depression: Assessment, correlates, and treatment', '2020', 'https://doi.org/10.31887/DCNS.2020.22.3/amcintyre', 'Dialogues in Clinical Neuroscience', 1),
      (v_art_id, 'peer_reviewed', 1, 'Attention and executive functions in major depressive disorder: A systematic review', '2019', 'https://doi.org/10.1017/S0033291719001107', 'Psychological Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'Memory impairment in depression: Mechanisms and clinical implications', '2020', 'https://doi.org/10.1016/j.jad.2020.03.041', 'Journal of Affective Disorders', 3),
      (v_art_id, 'peer_reviewed', 1, 'Rumination and cognitive control in depression', '2018', 'https://doi.org/10.1016/j.cpr.2018.08.004', 'Clinical Psychology Review', 4),
      (v_art_id, 'peer_reviewed', 1, 'Decision-making deficits in depression: A neurocognitive perspective', '2021', 'https://doi.org/10.1016/j.neubiorev.2021.05.007', 'Neuroscience & Biobehavioral Reviews', 5),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive symptoms persist after remission in depression: Residual deficits and functional impact', '2019', 'https://doi.org/10.1192/bjp.2019.183', 'British Journal of Psychiatry', 6),
      (v_art_id, 'peer_reviewed', 1, 'Negative bias in emotional processing: A core mechanism in depression', '2020', 'https://doi.org/10.1016/j.cobeha.2020.02.005', 'Current Opinion in Behavioral Sciences', 7),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive remediation for depression: Improving functioning beyond mood', '2020', 'https://doi.org/10.3389/fpsyt.2020.00269', 'Frontiers in Psychiatry', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-008 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-008';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Bidirectional associations between depression and chronic physical health conditions: A systematic review and meta-analysis', '2020', 'https://doi.org/10.1001/jamapsychiatry.2020.1179', 'JAMA Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Depression and cardiovascular disease: Mechanisms and outcomes', '2021', 'https://doi.org/10.1161/CIRCULATIONAHA.120.048728', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Inflammation and depression: A public health perspective', '2020', 'https://doi.org/10.1016/j.bbi.2020.02.018', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Depression, chronic diseases, and decrements in health: Results from the World Health Surveys', '2007', 'https://doi.org/10.1016/S0140-6736(07)61415-9', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'The impact of depression on physical health: Pathophysiological pathways', '2019', 'https://doi.org/10.1097/PSY.0000000000000743', 'Psychosomatic Medicine', 5),
      (v_art_id, 'peer_reviewed', 1, 'Depression and diabetes: Treatment and health-care delivery', '2018', 'https://doi.org/10.1016/S2213-8587(18)30006-5', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Somatic symptoms in depression: Prevalence and clinical correlates', '2020', 'https://doi.org/10.1016/j.jad.2020.05.032', 'Journal of Affective Disorders', 7),
      (v_art_id, 'peer_reviewed', 1, 'Treating depression in medical illness: Integrated care approaches', '2021', 'https://doi.org/10.1146/annurev-clinpsy-081219-110406', 'Annual Review of Clinical Psychology', 8),
      (v_art_id, 'peer_reviewed', 1, 'Mind-body interventions for depression: Evidence and mechanisms', '2022', 'https://doi.org/10.1038/s44159-022-00043-6', 'Nature Reviews Psychology', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-009 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-009';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Social isolation and depression: A systematic review and meta-analysis', '2020', 'https://doi.org/10.1017/S0033291720000045', 'Psychological Medicine', 1),
      (v_art_id, 'peer_reviewed', 1, 'The neurobiology of social isolation and depression', '2021', 'https://doi.org/10.1038/s41583-021-00465-5', 'Nature Reviews Neuroscience', 2),
      (v_art_id, 'peer_reviewed', 1, 'Social withdrawal in depression: The role of anhedonia and negative social expectations', '2019', 'https://doi.org/10.1037/abn0000383', 'Journal of Abnormal Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Loneliness and social isolation as risk factors for mortality: A meta-analytic review', '2015', 'https://doi.org/10.1177/1745691614568352', 'Perspectives on Psychological Science', 4),
      (v_art_id, 'peer_reviewed', 1, 'Behavioral activation for depression: Breaking the cycle of avoidance', '2020', 'https://doi.org/10.1177/0145445518806861', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Social support as a protective factor in depression: Mechanisms and interventions', '2021', 'https://doi.org/10.1016/j.cpr.2021.102013', 'Clinical Psychology Review', 6),
      (v_art_id, 'peer_reviewed', 1, 'The shame of depression: How stigma perpetuates social withdrawal', '2018', 'https://doi.org/10.1002/da.22789', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Small steps, big impact: Graduated exposure to social situations in depression', '2020', 'https://doi.org/10.1016/j.cbpra.2019.07.008', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-010 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-010';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Cultural variations in depression: A systematic review', '2020', 'https://doi.org/10.1177/1363461520906495', 'Transcultural Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Somatic symptoms of depression across cultures', '2019', 'https://doi.org/10.1080/09540261.2019.1603283', 'International Review of Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Mental health stigma in collectivist vs. individualist cultures', '2021', 'https://doi.org/10.1016/j.socscimed.2021.113895', 'Social Science & Medicine', 3),
      (v_art_id, 'peer_reviewed', 1, 'Culture and emotion: Models of emotion regulation across cultures', '2018', 'https://doi.org/10.1037/rev0000106', 'Psychological Review', 4),
      (v_art_id, 'peer_reviewed', 1, 'Cultural concepts of distress in DSM-5: Implications for clinical practice', '2019', 'https://doi.org/10.1176/appi.ajp.2019.19040408', 'American Journal of Psychiatry', 5),
      (v_art_id, 'peer_reviewed', 1, 'Global mental health: Cross-cultural perspectives on depression treatment', '2020', 'https://doi.org/10.1002/wps.20754', 'World Psychiatry', 6),
      (v_art_id, 'peer_reviewed', 1, 'Language and depression: How vocabulary shapes emotional experience', '2020', 'https://doi.org/10.1016/j.cpr.2020.101871', 'Clinical Psychology Review', 7),
      (v_art_id, 'peer_reviewed', 1, 'Help-seeking behaviors for mental health across cultures', '2021', 'https://doi.org/10.1177/0022022121993155', 'Journal of Cross-Cultural Psychology', 8)
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
  WHERE a.article_production_id LIKE 'CAT07-%';

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;
