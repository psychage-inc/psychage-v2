-- ============================================================================
-- Seed: Category 7 (Depression, Grief & Loss) — Subcategory 02
-- 10 articles: CAT07-011 through CAT07-020
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
  VALUES ('Types Of Depression', 'types-of-depression', v_cat_id, 2)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'types-of-depression' AND category_id = v_cat_id;

  -- CAT07-011: Major Depressive Disorder: The Condition Behind Clinical Depression
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Major Depressive Disorder: The Condition Behind Clinical Depression',
    'major-depressive-disorder-clinical-depression',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Major Depression', 'MDD', 'Diagnosis', 'Clinical Depression'],
    2400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-011',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Comprehensive guide to major depressive disorder—diagnostic criteria, symptoms, course, treatment, and what makes clinical depression different from sadness.',
    '/images/articles/cat07/cover-011.svg',
    10,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-012: Persistent Depressive Disorder: When Low Mood Becomes Your Baseline
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Persistent Depressive Disorder: When Low Mood Becomes Your Baseline',
    'persistent-depressive-disorder-dysthymia',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Dysthymia', 'PDD', 'Chronic Depression', 'Persistent Depression'],
    2000,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-012',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Dysthymia or persistent depressive disorder is chronic, low-grade depression lasting years. Understand symptoms, how it differs from MDD, and treatment approaches.',
    '/images/articles/cat07/cover-012.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-013: Bipolar Depression: How It Differs from Unipolar Depression
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Bipolar Depression: How It Differs from Unipolar Depression',
    'bipolar-depression-vs-unipolar',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Bipolar Disorder', 'Bipolar Depression', 'Unipolar Depression', 'Differential Diagnosis'],
    2200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-013',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Bipolar depression looks similar to unipolar depression but requires different treatment. Learn key differences, why diagnosis matters, and treatment approaches.',
    '/images/articles/cat07/cover-013.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-014: Seasonal Affective Disorder: Why Winter Darkens More Than the Sky
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Seasonal Affective Disorder: Why Winter Darkens More Than the Sky',
    'seasonal-affective-disorder-winter-depression',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['SAD', 'Seasonal Depression', 'Winter Depression', 'Light Therapy'],
    2000,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-014',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Seasonal Affective Disorder is recurrent depression triggered by seasonal changes, usually winter. Learn symptoms, light therapy, and evidence-based treatment.',
    '/images/articles/cat07/cover-014.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-015: Postpartum Depression: Understanding the Darkness After Birth
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Postpartum Depression: Understanding the Darkness After Birth',
    'postpartum-depression-after-birth',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Postpartum Depression', 'PPD', 'Maternal Mental Health', 'Perinatal Depression'],
    2400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-015',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Postpartum depression affects 1 in 7 new mothers. Learn symptoms, risk factors, treatment, and why seeking help is essential for mother and baby.',
    '/images/articles/cat07/cover-015.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-016: Atypical Depression: The Subtype That Doesn
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Atypical Depression: The Subtype That Doesn',
    'atypical-depression-subtype',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Atypical Depression', 'Mood Reactivity', 'Rejection Sensitivity', 'Depression Subtypes'],
    1800,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-016',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Atypical depression involves mood reactivity, increased appetite, hypersomnia, and rejection sensitivity. Learn symptoms, why it',
    '/images/articles/cat07/cover-016.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-017: Treatment-Resistant Depression: When Standard Approaches Aren
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Treatment-Resistant Depression: When Standard Approaches Aren',
    'treatment-resistant-depression',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['TRD', 'Treatment-Resistant Depression', 'ECT', 'TMS', 'Ketamine'],
    2200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-017',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Treatment-resistant depression affects 30% of people after initial treatments fail. Learn definitions, causes, and advanced treatment options including TMS, ketamine, ECT.',
    '/images/articles/cat07/cover-017.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-018: Depression with Psychotic Features: When Depression Distorts Reality
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Depression with Psychotic Features: When Depression Distorts Reality',
    'depression-with-psychotic-features',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Psychotic Depression', 'Delusions', 'Hallucinations', 'Severe Depression'],
    2000,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-018',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Psychotic depression involves delusions or hallucinations during major depression. Learn symptoms, why it requires specialized treatment, and outcomes.',
    '/images/articles/cat07/cover-018.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-019: Premenstrual Dysphoric Disorder: Beyond PMS
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Premenstrual Dysphoric Disorder: Beyond PMS',
    'premenstrual-dysphoric-disorder-pmdd',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['PMDD', 'Premenstrual Dysphoric Disorder', 'Hormonal Depression', 'Menstrual Cycle'],
    1800,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-019',
    v_cat_id,
    v_sub_id,
    'drafted',
    'PMDD is severe cyclical mood disturbance tied to menstrual cycle, affecting 5% of menstruating people. Learn symptoms, diagnosis, and evidence-based treatment.',
    '/images/articles/cat07/cover-019.svg',
    7,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-020: Situational Depression vs. Clinical Depression: Understanding Adjustment Disorders
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Situational Depression vs. Clinical Depression: Understanding Adjustment Disorders',
    'situational-vs-clinical-depression',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Adjustment Disorder', 'Situational Depression', 'Grief', 'Reactive Depression'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-020',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How to distinguish between normal sadness after life stress and clinical depression. Learn about adjustment disorders, when grief becomes depression, and treatment.',
    '/images/articles/cat07/cover-020.svg',
    7,
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

  -- === CAT07-011 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-011';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'clinical_guideline', 4, 'Diagnostic and Statistical Manual of Mental Disorders, Fifth Edition, Text Revision (DSM-5-TR)', '2022', 'https://www.psychiatry.org/psychiatrists/practice/dsm', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Major depressive disorder: A clinical review', '2020', 'https://doi.org/10.1001/jama.2020.6901', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'The course of major depression: A systematic review of predictors and outcomes', '2019', 'https://doi.org/10.1176/appi.ajp.2019.18091011', 'American Journal of Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Treatment of major depressive disorder: Evidence-based guidelines', '2021', 'https://doi.org/10.1016/S2215-0366(21)00019-0', 'Lancet Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Recurrence patterns in major depression: A longitudinal study', '2020', 'https://doi.org/10.1016/j.jad.2020.02.043', 'Journal of Affective Disorders', 5),
      (v_art_id, 'peer_reviewed', 1, 'Severity specifiers in major depression: Clinical utility and treatment implications', '2019', 'https://doi.org/10.1002/da.22876', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Functional impairment in major depressive disorder', '2018', 'https://doi.org/10.1192/bjp.2018.97', 'British Journal of Psychiatry', 7),
      (v_art_id, 'peer_reviewed', 1, 'Suicide risk in major depressive disorder: Assessment and management', '2021', 'https://doi.org/10.1176/appi.ajp.2020.20060864', 'American Journal of Psychiatry', 8),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive dysfunction in major depression: Implications for treatment', '2020', 'https://doi.org/10.1007/s40263-020-00726-0', NULL, 9),
      (v_art_id, 'government', 2, 'Major Depression: Epidemiology and Burden', '2023', 'https://www.nimh.nih.gov/health/statistics/major-depression', NULL, 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-012 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-012';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Persistent depressive disorder: Clinical and epidemiological review', '2020', 'https://doi.org/10.1097/HRP.0000000000000256', 'Harvard Review of Psychiatry', 1),
      (v_art_id, 'clinical_guideline', 4, 'DSM-5-TR: Persistent Depressive Disorder diagnostic criteria', '2022', 'https://www.psychiatry.org/psychiatrists/practice/dsm', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Double depression: When dysthymia and major depression co-occur', '2019', 'https://doi.org/10.1016/j.jad.2019.08.015', 'Journal of Affective Disorders', 3),
      (v_art_id, 'peer_reviewed', 1, 'Quality of life impairment in persistent depressive disorder', '2018', 'https://doi.org/10.1002/da.22745', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Treatment of persistent depressive disorder: Psychotherapy outcomes', '2020', 'https://doi.org/10.1176/appi.ajp.2019.19050486', 'American Journal of Psychiatry', 5),
      (v_art_id, 'peer_reviewed', 1, 'Pharmacotherapy for persistent depressive disorder: A systematic review', '2021', 'https://doi.org/10.1007/s40263-021-00802-1', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Childhood adversity and persistent depressive disorder', '2019', 'https://doi.org/10.1001/jamapsychiatry.2019.0337', 'JAMA Psychiatry', 7),
      (v_art_id, 'peer_reviewed', 1, 'Early-onset vs. late-onset dysthymia: Clinical differences', '2018', 'https://doi.org/10.4088/JCP.17m11852', 'Journal of Clinical Psychiatry', 8),
      (v_art_id, 'peer_reviewed', 1, 'Functional impairment in persistent depressive disorder compared to major depression', '2020', 'https://doi.org/10.1017/S0033291720000306', 'Psychological Medicine', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-013 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-013';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Bipolar depression: A review of treatment options', '2020', 'https://doi.org/10.1177/0706743720905634', 'Canadian Journal of Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Differentiating bipolar from unipolar depression: Clinical and neurobiological considerations', '2019', 'https://doi.org/10.1111/bdi.12778', NULL, 2),
      (v_art_id, 'clinical_guideline', 4, 'Diagnostic and Statistical Manual of Mental Disorders, Fifth Edition, Text Revision (DSM-5-TR)', '2022', 'https://www.psychiatry.org/psychiatrists/practice/dsm', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Antidepressant-induced mania in bipolar disorder: Risk factors and management', '2021', 'https://doi.org/10.1176/appi.ajp.2020.20060831', 'American Journal of Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'The burden of bipolar depression: Natural history and treatment gaps', '2020', 'https://doi.org/10.1016/j.jad.2020.03.177', 'Journal of Affective Disorders', 5),
      (v_art_id, 'peer_reviewed', 1, 'Misdiagnosis of bipolar disorder: Consequences and contributing factors', '2019', 'https://doi.org/10.1001/jamapsychiatry.2019.0060', 'JAMA Psychiatry', 6),
      (v_art_id, 'peer_reviewed', 1, 'Pharmacological treatment of bipolar depression: Evidence and practice', '2021', 'https://doi.org/10.1016/S2215-0366(21)00043-8', 'Lancet Psychiatry', 7),
      (v_art_id, 'peer_reviewed', 1, 'Clinical features that distinguish bipolar from unipolar depression', '2018', 'https://doi.org/10.1002/da.22735', NULL, 8),
      (v_art_id, 'peer_reviewed', 1, 'Mood stabilizers and atypical antipsychotics in bipolar depression', '2020', 'https://doi.org/10.1007/s40263-020-00711-7', NULL, 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-014 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-014';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Seasonal affective disorder: Epidemiology, clinical features, assessment, and diagnosis', '2020', 'https://doi.org/10.1016/j.jad.2020.06.068', 'Journal of Affective Disorders', 1),
      (v_art_id, 'peer_reviewed', 1, 'Light therapy for seasonal affective disorder: A systematic review and meta-analysis', '2019', 'https://doi.org/10.1176/appi.ajp.2019.18091037', 'American Journal of Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Circadian rhythms, light exposure, and seasonal affective disorder', '2020', 'https://doi.org/10.1016/j.smrv.2020.101247', 'Sleep Medicine Reviews', 3),
      (v_art_id, 'clinical_guideline', 4, 'DSM-5-TR: Major Depressive Disorder with Seasonal Pattern', '2022', 'https://www.psychiatry.org/psychiatrists/practice/dsm', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Neurobiology of seasonal affective disorder and phototherapy', '2018', 'https://doi.org/10.1016/j.biopsych.2018.05.013', 'Biological Psychiatry', 5),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive-behavioral therapy for seasonal affective disorder', '2019', 'https://doi.org/10.1002/da.22890', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Vitamin D and seasonal affective disorder: Evidence and recommendations', '2020', 'https://doi.org/10.4088/JCP.19r13092', 'Journal of Clinical Psychiatry', 7),
      (v_art_id, 'peer_reviewed', 1, 'Antidepressant medication for seasonal affective disorder', '2019', 'https://doi.org/10.1002/14651858.CD004050.pub5', 'Cochrane Database of Systematic Reviews', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-015 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-015';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Postpartum depression: Epidemiology, risk factors, and clinical features', '2020', 'https://doi.org/10.1097/AOG.0000000000003903', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Screening and diagnosis of postpartum depression', '2019', 'https://doi.org/10.1016/j.ajog.2019.04.027', 'American Journal of Obstetrics and Gynecology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Treatment of postpartum depression: Psychotherapy and pharmacotherapy', '2021', 'https://doi.org/10.1001/jamapsychiatry.2021.0826', 'JAMA Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Biological mechanisms in postpartum depression', '2020', 'https://doi.org/10.1038/s41583-020-0294-3', 'Nature Reviews Neuroscience', 4),
      (v_art_id, 'peer_reviewed', 1, 'Impact of untreated postpartum depression on infant development', '2019', 'https://doi.org/10.1542/peds.2019-0366', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive-behavioral therapy for postpartum depression', '2020', 'https://doi.org/10.1007/s00737-020-01025-1', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Antidepressants in breastfeeding: Safety and recommendations', '2021', 'https://doi.org/10.4088/JCP.20r13791', 'Journal of Clinical Psychiatry', 7),
      (v_art_id, 'government', 2, 'Postpartum psychosis: Recognition and emergency management', '2020', 'https://www.aafp.org/afp/2020/0215/p227.html', NULL, 8),
      (v_art_id, 'peer_reviewed', 1, 'Partner and paternal postpartum depression', '2019', 'https://doi.org/10.1016/j.jad.2019.02.033', 'Journal of Affective Disorders', 9),
      (v_art_id, 'government', 2, 'Postpartum Depression: Facts', '2023', 'https://www.nimh.nih.gov/health/publications/postpartum-depression-facts', NULL, 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-016 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-016';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Atypical depression: Clinical features, diagnosis, and treatment', '2020', 'https://doi.org/10.1002/da.23021', NULL, 1),
      (v_art_id, 'clinical_guideline', 4, 'DSM-5-TR: Major Depression with Atypical Features', '2022', 'https://www.psychiatry.org/psychiatrists/practice/dsm', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Rejection sensitivity and interpersonal functioning in atypical depression', '2019', 'https://doi.org/10.1016/j.jad.2019.05.025', 'Journal of Affective Disorders', 3),
      (v_art_id, 'peer_reviewed', 1, 'Pharmacological treatment of atypical depression: A review', '2021', 'https://doi.org/10.1007/s40263-021-00815-w', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Atypical depression and bipolar disorder: Overlapping features', '2020', 'https://doi.org/10.1111/bdi.12897', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Leaden paralysis: The physical symptom of atypical depression', '2018', 'https://doi.org/10.1016/j.psym.2018.04.008', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'MAOIs in treatment of atypical depression: Evidence review', '2019', 'https://doi.org/10.4088/JCP.18r12601', 'Journal of Clinical Psychiatry', 7),
      (v_art_id, 'peer_reviewed', 1, 'Prevalence and clinical correlates of atypical features', '2020', 'https://doi.org/10.1176/appi.ajp.2019.19050539', 'American Journal of Psychiatry', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-017 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-017';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Defining and treating treatment-resistant depression', '2021', 'https://doi.org/10.1016/S2215-0366(21)00076-1', 'Lancet Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Prevalence and predictors of treatment-resistant depression', '2020', 'https://doi.org/10.1001/jamapsychiatry.2020.0001', 'JAMA Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Transcranial magnetic stimulation for treatment-resistant depression: A systematic review', '2020', 'https://doi.org/10.1176/appi.ajp.2019.19090915', 'American Journal of Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Esketamine nasal spray for treatment-resistant depression', '2019', 'https://doi.org/10.1056/NEJMoa1816960', 'New England Journal of Medicine', 4),
      (v_art_id, 'peer_reviewed', 1, 'Electroconvulsive therapy for depression: Modern practice and outcomes', '2021', 'https://doi.org/10.1192/bjp.2021.96', 'British Journal of Psychiatry', 5),
      (v_art_id, 'peer_reviewed', 1, 'Medication augmentation strategies in treatment-resistant depression', '2020', 'https://doi.org/10.1007/s40263-020-00749-5', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Psychotherapy for treatment-resistant depression: Meta-analysis', '2020', 'https://doi.org/10.1002/da.23012', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Pseudoresistance vs. true treatment resistance in depression', '2019', 'https://doi.org/10.4088/JCP.18r12642', 'Journal of Clinical Psychiatry', 8),
      (v_art_id, 'peer_reviewed', 1, 'Vagus nerve stimulation and deep brain stimulation for depression', '2021', 'https://doi.org/10.1007/s11920-021-01239-3', 'Current Psychiatry Reports', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-018 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-018';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Psychotic depression: Clinical features, assessment, and treatment', '2020', 'https://doi.org/10.1176/appi.ajp.2019.19070680', 'American Journal of Psychiatry', 1),
      (v_art_id, 'clinical_guideline', 4, 'DSM-5-TR: Major Depression with Psychotic Features', '2022', 'https://www.psychiatry.org/psychiatrists/practice/dsm', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Combination antidepressant-antipsychotic treatment for psychotic depression', '2019', 'https://doi.org/10.1001/jamapsychiatry.2019.0055', 'JAMA Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'ECT for psychotic depression: Efficacy and outcomes', '2020', 'https://doi.org/10.1097/YCT.0000000000000627', 'Journal of ECT', 4),
      (v_art_id, 'peer_reviewed', 1, 'Delusional themes in psychotic depression: Mood-congruent vs. mood-incongruent', '2019', 'https://doi.org/10.1093/schbul/sby162', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Risk for bipolar disorder in patients with psychotic depression', '2021', 'https://doi.org/10.1111/bdi.13012', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Psychotic depression vs. schizoaffective disorder: Differential diagnosis', '2020', 'https://doi.org/10.1007/s11920-020-01149-8', 'Current Psychiatry Reports', 7),
      (v_art_id, 'peer_reviewed', 1, 'Long-term outcomes and recurrence in psychotic depression', '2021', 'https://doi.org/10.1016/j.jad.2021.02.068', 'Journal of Affective Disorders', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-019 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-019';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Premenstrual dysphoric disorder: Pathophysiology and treatment', '2020', 'https://doi.org/10.1176/appi.ajp.2020.19070667', 'American Journal of Psychiatry', 1),
      (v_art_id, 'clinical_guideline', 4, 'DSM-5-TR: Premenstrual Dysphoric Disorder diagnostic criteria', '2022', 'https://www.psychiatry.org/psychiatrists/practice/dsm', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'SSRIs for premenstrual dysphoric disorder: Systematic review', '2021', 'https://doi.org/10.4088/JCP.20r13803', 'Journal of Clinical Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Hormonal contraceptives for PMDD: Evidence review', '2020', 'https://doi.org/10.1097/AOG.0000000000003645', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'GABA, progesterone, and PMDD: Biological mechanisms', '2019', 'https://doi.org/10.1038/s41380-019-0486-1', 'Molecular Psychiatry', 5),
      (v_art_id, 'peer_reviewed', 1, 'Quality of life impairment in PMDD', '2020', 'https://doi.org/10.1007/s00737-020-01028-y', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive behavioral therapy for PMDD', '2019', 'https://doi.org/10.1001/jamapsychiatry.2019.0216', 'JAMA Psychiatry', 7)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-020 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-020';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Adjustment disorders: Current perspectives and future directions', '2020', 'https://doi.org/10.1016/j.jad.2020.04.006', 'Journal of Affective Disorders', 1),
      (v_art_id, 'clinical_guideline', 4, 'DSM-5-TR: Adjustment Disorders diagnostic criteria', '2022', 'https://www.psychiatry.org/psychiatrists/practice/dsm', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Differentiating adjustment disorder from major depression: Clinical implications', '2019', 'https://doi.org/10.1002/da.22865', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Brief psychotherapy for adjustment disorders: Meta-analysis', '2020', 'https://doi.org/10.1176/appi.ajp.2019.19060595', 'American Journal of Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Normal grief vs. major depression vs. complicated grief', '2021', 'https://doi.org/10.1001/jama.2021.2333', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'When does sadness become depression? Thresholds and clinical judgment', '2019', 'https://doi.org/10.1192/bjp.2019.101', 'British Journal of Psychiatry', 6),
      (v_art_id, 'peer_reviewed', 1, 'Resilience factors in adjustment to life stressors', '2020', 'https://doi.org/10.1017/S0033291720001464', 'Psychological Medicine', 7)
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
