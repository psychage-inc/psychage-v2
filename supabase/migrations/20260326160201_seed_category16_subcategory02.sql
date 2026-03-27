-- ============================================================================
-- Seed: Category 16 (Psychosis, Schizophrenia & Severe Mental Illness) — Subcategory 02
-- 10 articles: CAT16-011 through CAT16-020
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert Category if not present
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  'Psychosis, Schizophrenia & Severe Mental Illness',
  'psychosis-schizophrenia',
  'Comprehensive education on psychotic disorders, schizophrenia spectrum conditions, and severe mental illness — from neuroscience and treatment to family support and recovery.',
  'Brain',
  16,
  60,
  '#7C3AED'
)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------------------
-- 2. Insert Subcategory
-- ---------------------------------------------------------------------------

DO $$
DECLARE
  v_cat_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'psychosis-schizophrenia';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Schizophrenia', 'schizophrenia', v_cat_id, 2)
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'psychosis-schizophrenia';
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'schizophrenia' AND category_id = v_cat_id;

  -- CAT16-011: Schizophrenia Explained: What Science Actually Knows
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Schizophrenia Explained: What Science Actually Knows',
    'schizophrenia-explained-what-science-actually-knows',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Schizophrenia', 'Condition Deep Dive', 'Neuroscience', 'Treatment'],
    1017,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-011',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A comprehensive, evidence-based overview of schizophrenia — what decades of research have revealed about its causes, how it manifests, and what effective treatment looks like today.',
    '/images/articles/cat16/cover-011.svg',
    10,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT16-012: Positive, Negative, and Cognitive Symptoms of Schizophrenia
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Positive, Negative, and Cognitive Symptoms of Schizophrenia',
    'positive-negative-cognitive-symptoms-of-schizophrenia',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Schizophrenia', 'Symptoms', 'Condition Deep Dive', 'Cognitive Symptoms'],
    1018,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-012',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A detailed guide to the three symptom domains of schizophrenia — what each involves, how they affect daily life, and why understanding all three is essential for effective treatment.',
    '/images/articles/cat16/cover-012.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT16-013: Schizoaffective Disorder: When Psychosis and Mood Disorders Overlap
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Schizoaffective Disorder: When Psychosis and Mood Disorders Overlap',
    'schizoaffective-disorder-when-psychosis-and-mood-disorders-overlap',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Schizoaffective Disorder', 'Bipolar', 'Mood Disorders', 'Condition Deep Dive'],
    994,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-013',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding schizoaffective disorder — a condition at the intersection of schizophrenia and mood disorders, and one of the most debated diagnoses in psychiatry.',
    '/images/articles/cat16/cover-013.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT16-014: Schizophreniform Disorder: Short-Duration Psychotic Conditions
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Schizophreniform Disorder: Short-Duration Psychotic Conditions',
    'schizophreniform-disorder-short-duration-psychotic-conditions',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Schizophreniform Disorder', 'Psychosis', 'Short-Duration', 'Condition Deep Dive'],
    1039,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-014',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding schizophreniform disorder — a psychotic condition that looks like schizophrenia but resolves within six months, and what this transitional diagnosis means for people and their families.',
    '/images/articles/cat16/cover-014.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT16-015: The Genetics of Schizophrenia: What Family History Means and Doesn''t Mean
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Genetics of Schizophrenia: What Family History Means and Doesn''t Mean',
    'genetics-of-schizophrenia-what-family-history-means-and-doesnt',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Schizophrenia', 'Genetics', 'Family History', 'Research Digest'],
    1053,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-015',
    v_cat_id,
    v_sub_id,
    'drafted',
    'What science has learned about the genetics of schizophrenia — from family risk patterns and twin studies to genome-wide discoveries — and why having a relative with schizophrenia doesn''t determine your destiny.',
    '/images/articles/cat16/cover-015.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT16-016: Cognitive Symptoms of Schizophrenia: Memory, Attention, and Executive Function
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Cognitive Symptoms of Schizophrenia: Memory, Attention, and Executive Function',
    'cognitive-symptoms-schizophrenia-memory-attention-executive-function',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Schizophrenia', 'Cognitive Symptoms', 'Neuropsychology', 'Rehabilitation'],
    1010,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-016',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the often-overlooked cognitive symptoms of schizophrenia — how memory, attention, and executive function are affected and what can be done to support cognitive health.',
    '/images/articles/cat16/cover-016.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT16-017: Negative Symptoms: Understanding Flat Affect, Avolition, and Social Withdrawal
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Negative Symptoms: Understanding Flat Affect, Avolition, and Social Withdrawal',
    'negative-symptoms-flat-affect-avolition-social-withdrawal',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Schizophrenia', 'Negative Symptoms', 'Recovery', 'Treatment'],
    1012,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-017',
    v_cat_id,
    v_sub_id,
    'drafted',
    'An in-depth look at the negative symptoms of schizophrenia — what flat affect, avolition, alogia, anhedonia, and social withdrawal actually are, why they matter, and what helps.',
    '/images/articles/cat16/cover-017.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT16-018: Schizophrenia Across Cultures: How Different Societies Understand Psychotic Experience
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Schizophrenia Across Cultures: How Different Societies Understand Psychotic Experience',
    'schizophrenia-across-cultures-societies-understand-psychotic-experience',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Schizophrenia', 'Cultural Psychiatry', 'Global Health', 'Recovery'],
    1014,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-018',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How cultural context shapes the experience, interpretation, and outcomes of schizophrenia — from voice-hearing traditions to the surprising international differences in recovery.',
    '/images/articles/cat16/cover-018.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT16-019: Living Well With Schizophrenia: Recovery Stories and Evidence-Based Hope
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Living Well With Schizophrenia: Recovery Stories and Evidence-Based Hope',
    'living-well-with-schizophrenia-recovery-stories-evidence-based-hope',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Schizophrenia', 'Recovery', 'Hope', 'Lived Experience'],
    1018,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-019',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Evidence-based perspectives on recovery from schizophrenia — what long-term outcome studies reveal, what recovery actually means, and the factors that predict meaningful improvement.',
    '/images/articles/cat16/cover-019.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT16-020: Delusional Disorder: When Fixed Beliefs Don''t Match Reality
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Delusional Disorder: When Fixed Beliefs Don''t Match Reality',
    'delusional-disorder-when-fixed-beliefs-dont-match-reality',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Delusional Disorder', 'Psychosis', 'Condition Deep Dive', 'Treatment'],
    1003,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-020',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A comprehensive overview of delusional disorder — how it differs from schizophrenia, the types of delusions it involves, and the unique treatment challenges it presents.',
    '/images/articles/cat16/cover-020.svg',
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

  -- === CAT16-011 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-011';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'government', 2, 'Schizophrenia fact sheet', '2024', 'https://www.who.int/news-room/fact-sheets/detail/schizophrenia', 'World Health Organization', 1),
      (v_art_id, 'peer_reviewed', 1, 'Common schizophrenia alleles are enriched in mutation-intolerant genes and in regions under strong background selection', '2018', 'https://doi.org/10.1038/s41588-018-0059-2', 'Nature Genetics', 2),
      (v_art_id, 'peer_reviewed', 1, 'Mortality in schizophrenia: A systematic review and meta-analysis', '2019', 'https://doi.org/10.1016/S2215-0366(19)30059-X', 'The Lancet Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Remission in schizophrenia: A systematic review and meta-analysis', '2020', 'https://doi.org/10.1093/schbul/sbz141', 'Schizophrenia Bulletin', 4),
      (v_art_id, 'reference', 5, 'Kaplan & Sadock''s Comprehensive Textbook of Psychiatry (10th edition)', '2017', 'https://shop.lww.com/kaplan-sadocks', 'Wolters Kluwer', 5),
      (v_art_id, 'peer_reviewed', 1, 'The dopamine hypothesis of schizophrenia: Version III—The final common pathway', '2009', 'https://doi.org/10.1093/schbul/sbp006', 'Schizophrenia Bulletin', 6),
      (v_art_id, 'government', 2, 'Understanding schizophrenia', '2024', 'https://www.nimh.nih.gov/health/topics/schizophrenia', 'National Institute of Mental Health', 7),
      (v_art_id, 'peer_reviewed', 1, 'Environmental risk factors for schizophrenia: A systematic review', '2019', 'https://doi.org/10.1038/s41380-019-0603-z', 'Molecular Psychiatry', 8),
      (v_art_id, 'professional_org', 3, 'Psychosis and schizophrenia in adults: Prevention and management (NICE CG178)', '2024', 'https://www.nice.org.uk/guidance/cg178', 'National Institute for Health and Care Excellence', 9),
      (v_art_id, 'peer_reviewed', 1, 'Personal recovery in schizophrenia: A systematic review of longitudinal studies', '2021', 'https://doi.org/10.1017/S0033291721002191', 'Psychological Medicine', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT16-012 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-012';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Auditory hallucinations in schizophrenia: Characterization and correlates', '2019', 'https://doi.org/10.1093/schbul/sby173', 'Schizophrenia Bulletin', 1),
      (v_art_id, 'peer_reviewed', 1, 'Negative symptoms of schizophrenia: Clinical characteristics, pathophysiology, and treatment', '2021', 'https://doi.org/10.1016/S2215-0366(21)00174-0', 'The Lancet Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive deficits in schizophrenia: A meta-analysis of the neuropsychological literature', '2018', 'https://doi.org/10.1007/s11065-018-9376-8', 'Neuropsychology Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'Antipsychotic treatment of first-episode psychosis: A systematic review and network meta-analysis', '2020', 'https://doi.org/10.1016/S2215-0366(20)30014-X', 'The Lancet Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'The structure of negative symptoms in schizophrenia: Factor analysis of the PANSS', '2020', 'https://doi.org/10.1017/S0033291720002561', 'Psychological Medicine', 5),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive remediation therapy for schizophrenia: A meta-analysis', '2017', 'https://doi.org/10.1001/jamapsychiatry.2017.0735', 'JAMA Psychiatry', 6),
      (v_art_id, 'government', 2, 'Understanding schizophrenia', '2024', 'https://www.nimh.nih.gov/health/topics/schizophrenia', 'National Institute of Mental Health', 7),
      (v_art_id, 'government', 2, 'Schizophrenia fact sheet', '2024', 'https://www.who.int/news-room/fact-sheets/detail/schizophrenia', 'World Health Organization', 8),
      (v_art_id, 'peer_reviewed', 1, 'Delusional subtypes in schizophrenia and their clinical significance', '2018', 'https://doi.org/10.1192/bjp.2018.60', 'British Journal of Psychiatry', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT16-013 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-013';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Schizoaffective disorder: Diagnosis, epidemiology, and treatment', '2020', 'https://doi.org/10.1016/S2215-0366(20)30003-5', 'The Lancet Psychiatry', 1),
      (v_art_id, 'clinical_guideline', 4, 'Diagnostic and Statistical Manual of Mental Disorders, Fifth Edition, Text Revision (DSM-5-TR)', '2022', 'https://doi.org/10.1176/appi.books.9780890425787', 'American Psychiatric Association', 2),
      (v_art_id, 'peer_reviewed', 1, 'Diagnostic reliability of schizoaffective disorder: A systematic review', '2019', 'https://doi.org/10.1093/schbul/sby116', 'Schizophrenia Bulletin', 3),
      (v_art_id, 'peer_reviewed', 1, 'Outcome of schizoaffective disorder: A systematic review and meta-analysis', '2018', 'https://doi.org/10.1017/S0033291717003506', 'Psychological Medicine', 4),
      (v_art_id, 'peer_reviewed', 1, 'The schizoaffective disorder diagnosis: A conundrum in the clinical setting', '2021', 'https://doi.org/10.1002/wps.20862', 'World Psychiatry', 5),
      (v_art_id, 'peer_reviewed', 1, 'Pharmacological treatment of schizoaffective disorder: Clinical practice guidelines', '2020', 'https://doi.org/10.1192/bjp.2020.38', 'British Journal of Psychiatry', 6),
      (v_art_id, 'peer_reviewed', 1, 'Schizophrenia-bipolar spectrum: Genetic overlap and clinical implications', '2019', 'https://doi.org/10.1038/s41583-019-0178-9', 'Nature Reviews Neuroscience', 7),
      (v_art_id, 'government', 2, 'Schizoaffective disorder overview', '2024', 'https://www.nimh.nih.gov/health/topics/schizophrenia', 'National Institute of Mental Health', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT16-014 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-014';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Schizophreniform disorder: Epidemiology, clinical features, and outcome', '2018', 'https://doi.org/10.1016/j.schres.2017.12.011', 'Schizophrenia Research', 1),
      (v_art_id, 'peer_reviewed', 1, 'Diagnostic stability and outcomes of schizophreniform disorder: A 5-year follow-up study', '2019', 'https://doi.org/10.1192/bjp.2019.42', 'British Journal of Psychiatry', 2),
      (v_art_id, 'clinical_guideline', 4, 'Diagnostic and Statistical Manual of Mental Disorders, Fifth Edition, Text Revision (DSM-5-TR)', '2022', 'https://doi.org/10.1176/appi.books.9780890425787', 'American Psychiatric Association', 3),
      (v_art_id, 'peer_reviewed', 1, 'Specialized early intervention services for first-episode psychosis', '2020', 'https://doi.org/10.1001/jamapsychiatry.2019.3199', 'JAMA Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Prognostic indicators in first-episode psychosis', '2020', 'https://doi.org/10.1017/S0033291719003490', 'Psychological Medicine', 5),
      (v_art_id, 'professional_org', 3, 'Psychosis and schizophrenia in adults: Prevention and management', '2024', 'https://www.nice.org.uk/guidance/cg178', 'National Institute for Health and Care Excellence', 6),
      (v_art_id, 'government', 2, 'Understanding schizophrenia', '2024', 'https://www.nimh.nih.gov/health/topics/schizophrenia', 'National Institute of Mental Health', 7),
      (v_art_id, 'government', 2, 'Schizophrenia fact sheet', '2024', 'https://www.who.int/news-room/fact-sheets/detail/schizophrenia', 'World Health Organization', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT16-015 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-015';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Heritability of schizophrenia and related disorders: A meta-analysis of twin and family studies', '2017', 'https://doi.org/10.1017/S003329171700014X', 'Psychological Medicine', 1),
      (v_art_id, 'reference', 5, 'Family, twin, and adoption studies of schizophrenia', '2017', 'https://shop.lww.com/kaplan-sadocks', 'Kaplan & Sadock''s Comprehensive Textbook of Psychiatry (10th edition)', 2),
      (v_art_id, 'peer_reviewed', 1, 'Mapping genomic loci implicates genes and synaptic biology in schizophrenia', '2022', 'https://doi.org/10.1038/s41586-022-04434-5', 'Nature', 3),
      (v_art_id, 'peer_reviewed', 1, 'Polygenic risk scores for schizophrenia: Clinical utility and limitations', '2021', 'https://doi.org/10.1016/S2215-0366(21)00193-4', 'The Lancet Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Gene-environment interaction in schizophrenia: Current evidence and future directions', '2020', 'https://doi.org/10.1038/s41380-020-0738-x', 'Molecular Psychiatry', 5),
      (v_art_id, 'peer_reviewed', 1, 'Copy number variants in schizophrenia: A systematic review and meta-analysis', '2019', 'https://doi.org/10.1093/schbul/sby022', 'Schizophrenia Bulletin', 6),
      (v_art_id, 'government', 2, 'Schizophrenia fact sheet', '2024', 'https://www.who.int/news-room/fact-sheets/detail/schizophrenia', 'World Health Organization', 7),
      (v_art_id, 'government', 2, 'Genetics of schizophrenia', '2024', 'https://www.nimh.nih.gov/health/topics/schizophrenia', 'National Institute of Mental Health', 8),
      (v_art_id, 'peer_reviewed', 1, 'Epigenetics and schizophrenia: Current understanding and future directions', '2021', 'https://doi.org/10.1002/wps.20897', 'World Psychiatry', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT16-016 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-016';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Cognitive deficits in schizophrenia: An updated meta-analysis of the evidence', '2019', 'https://doi.org/10.1017/S003329171900062X', 'Psychological Medicine', 1),
      (v_art_id, 'peer_reviewed', 1, 'Processing speed in schizophrenia: A meta-analytic investigation', '2017', 'https://doi.org/10.1037/abn0000240', 'Journal of Abnormal Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Neurocognition and functional outcome in schizophrenia: A systematic review', '2020', 'https://doi.org/10.1016/j.schres.2020.03.012', 'Schizophrenia Research', 3),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive remediation for schizophrenia: An updated systematic review and meta-analysis', '2021', 'https://doi.org/10.1093/schbul/sbab022', 'Schizophrenia Bulletin', 4),
      (v_art_id, 'peer_reviewed', 1, 'MATRICS consensus cognitive battery: Overview and update', '2018', 'https://doi.org/10.1016/j.schres.2017.04.050', 'Schizophrenia Research', 5),
      (v_art_id, 'peer_reviewed', 1, 'The course of cognitive functioning in first episode psychosis: A systematic review', '2018', 'https://doi.org/10.1017/S0033291717002811', 'Psychological Medicine', 6),
      (v_art_id, 'government', 2, 'Understanding schizophrenia', '2024', 'https://www.nimh.nih.gov/health/topics/schizophrenia', 'National Institute of Mental Health', 7),
      (v_art_id, 'peer_reviewed', 1, 'Pharmacological enhancement of cognition in schizophrenia', '2020', 'https://doi.org/10.1038/s41380-019-0616-7', 'Molecular Psychiatry', 8),
      (v_art_id, 'professional_org', 3, 'Psychosis and schizophrenia in adults: Prevention and management (NICE CG178)', '2024', 'https://www.nice.org.uk/guidance/cg178', 'National Institute for Health and Care Excellence', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT16-017 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-017';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Negative symptoms of schizophrenia: A systematic review and meta-analysis of prevalence', '2021', 'https://doi.org/10.1016/j.schres.2021.01.002', 'Schizophrenia Research', 1),
      (v_art_id, 'peer_reviewed', 1, 'Pharmacological treatment of negative symptoms in schizophrenia: An updated systematic review', '2021', 'https://doi.org/10.1016/j.euroneuro.2021.08.001', 'European Neuropsychopharmacology', 2),
      (v_art_id, 'peer_reviewed', 1, 'The two-factor model of negative symptoms: Confirmation and clinical implications', '2019', 'https://doi.org/10.1093/schbul/sby065', 'Schizophrenia Bulletin', 3),
      (v_art_id, 'peer_reviewed', 1, 'Anticipatory and consummatory pleasure in schizophrenia: A meta-analysis', '2018', 'https://doi.org/10.1017/S0033291718000491', 'Psychological Medicine', 4),
      (v_art_id, 'peer_reviewed', 1, 'The Clinical Assessment Interview for Negative Symptoms (CAINS): Development and validation', '2013', 'https://doi.org/10.1016/j.schres.2013.06.038', 'Schizophrenia Research', 5),
      (v_art_id, 'peer_reviewed', 1, 'Psychosocial interventions for negative symptoms in schizophrenia: Systematic review and network meta-analysis', '2020', 'https://doi.org/10.1016/S2215-0366(20)30254-6', 'The Lancet Psychiatry', 6),
      (v_art_id, 'peer_reviewed', 1, 'Negative symptoms and the failure to represent the expected value of reward', '2019', 'https://doi.org/10.1016/j.biopsych.2019.02.004', 'Biological Psychiatry', 7),
      (v_art_id, 'peer_reviewed', 1, 'Distinguishing primary negative symptoms from depression in schizophrenia', '2020', 'https://doi.org/10.1017/S0033291720001397', 'Psychological Medicine', 8),
      (v_art_id, 'peer_reviewed', 1, 'Recovery in schizophrenia: International perspectives and consensus', '2021', 'https://doi.org/10.1002/wps.20888', 'World Psychiatry', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT16-018 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-018';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Recovery from schizophrenia and the recovery model: WHO international study findings', '2001', 'https://doi.org/10.1192/bjp.178.6.506', 'British Journal of Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Culture and hallucinations: Overview and future directions', '2014', 'https://doi.org/10.1093/schbul/sbu012', 'Schizophrenia Bulletin', 2),
      (v_art_id, 'peer_reviewed', 1, 'Differences in voice-hearing experiences of people with psychosis in the USA, India, and Ghana', '2015', 'https://doi.org/10.1192/bjp.bp.113.139048', 'British Journal of Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Ethnic differences in the diagnosis of psychosis: A systematic review and meta-analysis', '2019', 'https://doi.org/10.1017/S0033291719000606', 'Psychological Medicine', 4),
      (v_art_id, 'peer_reviewed', 1, 'The incidence and prevalence of schizophrenia in immigrant and ethnic minority groups: A systematic review', '2020', 'https://doi.org/10.1016/j.schres.2020.01.020', 'Schizophrenia Research', 5),
      (v_art_id, 'peer_reviewed', 1, 'Cultural concepts of distress and psychiatric disorders in DSM-5', '2017', 'https://doi.org/10.1146/annurev-clinpsy-032816-045244', 'Annual Review of Clinical Psychology', 6),
      (v_art_id, 'government', 2, 'Schizophrenia fact sheet', '2024', 'https://www.who.int/news-room/fact-sheets/detail/schizophrenia', 'World Health Organization', 7),
      (v_art_id, 'peer_reviewed', 1, 'Structural racism and its effects on mental health', '2021', 'https://doi.org/10.1016/S2215-0366(21)00245-2', 'The Lancet Psychiatry', 8),
      (v_art_id, 'reference', 5, 'Global mental health: Principles and practice', '2019', 'https://global.oup.com/academic/product/global-mental-health-9780190245368', 'Oxford University Press', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT16-019 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-019';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Long-term outcome of schizophrenia: A systematic review and meta-analysis of longitudinal studies', '2021', 'https://doi.org/10.1017/S0033291721002191', 'Psychological Medicine', 1),
      (v_art_id, 'peer_reviewed', 1, 'The critical period for early intervention in psychosis: A systematic review and meta-analysis', '2020', 'https://doi.org/10.1093/schbul/sbaa130', 'Schizophrenia Bulletin', 2),
      (v_art_id, 'peer_reviewed', 1, 'Personal recovery in schizophrenia: A concept analysis and synthesis', '2019', 'https://doi.org/10.1016/j.schres.2019.01.003', 'Schizophrenia Research', 3),
      (v_art_id, 'peer_reviewed', 1, 'Predictors of recovery in schizophrenia: A systematic review of longitudinal studies', '2020', 'https://doi.org/10.1016/j.schres.2020.04.010', 'Schizophrenia Research', 4),
      (v_art_id, 'peer_reviewed', 1, 'Coordinated Specialty Care for first episode psychosis: Evidence and implementation', '2019', 'https://doi.org/10.1176/appi.ajp.2019.19030306', 'American Journal of Psychiatry', 5),
      (v_art_id, 'peer_reviewed', 1, 'Recovery narratives in schizophrenia: A qualitative meta-synthesis', '2021', 'https://doi.org/10.1016/j.socscimed.2021.113987', 'Social Science & Medicine', 6),
      (v_art_id, 'peer_reviewed', 1, 'Peer support in schizophrenia: A systematic review and meta-analysis', '2020', 'https://doi.org/10.1176/appi.ps.201900418', 'Psychiatric Services', 7),
      (v_art_id, 'peer_reviewed', 1, 'Supported employment for people with schizophrenia: A Cochrane systematic review', '2019', 'https://doi.org/10.1002/14651858.CD008331.pub3', 'Cochrane Database of Systematic Reviews', 8),
      (v_art_id, 'peer_reviewed', 1, 'Recovery in schizophrenia: International perspectives and consensus', '2021', 'https://doi.org/10.1002/wps.20888', 'World Psychiatry', 9),
      (v_art_id, 'government', 2, 'NIMH RAISE project: Early treatment program', '2024', 'https://www.nimh.nih.gov/research/research-funded-by-nimh/research-initiatives/raise', 'National Institute of Mental Health', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT16-020 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-020';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Delusional disorder: A comprehensive review of the literature', '2019', 'https://doi.org/10.1093/schbul/sby129', 'Schizophrenia Bulletin', 1),
      (v_art_id, 'peer_reviewed', 1, 'Epidemiology and clinical features of delusional disorder: A systematic review', '2020', 'https://doi.org/10.1192/j.eurpsy.2020.75', 'European Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Subtypes of delusional disorder: Clinical characteristics and treatment outcomes', '2018', 'https://doi.org/10.4088/JCP.17r11803', 'Journal of Clinical Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Treatment engagement in delusional disorder: Challenges and therapeutic strategies', '2019', 'https://doi.org/10.1176/appi.ps.201800516', 'Psychiatric Services', 4),
      (v_art_id, 'clinical_guideline', 4, 'Diagnostic and Statistical Manual of Mental Disorders (5th ed., text revision)', '2022', 'https://doi.org/10.1176/appi.books.9780890425787', 'American Psychiatric Association', 5),
      (v_art_id, 'peer_reviewed', 1, 'Pharmacotherapy for delusional disorder: A systematic review and meta-analysis', '2020', 'https://doi.org/10.1177/0269881120922955', 'Journal of Psychopharmacology', 6),
      (v_art_id, 'peer_reviewed', 1, 'CBT for psychosis: Adaptations for delusional disorder', '2021', 'https://doi.org/10.1016/j.cbpra.2020.09.004', 'Cognitive and Behavioral Practice', 7),
      (v_art_id, 'peer_reviewed', 1, 'Understanding delusions: From diagnosis to personalized formulation', '2021', 'https://doi.org/10.1016/S2215-0366(21)00005-2', 'The Lancet Psychiatry', 8),
      (v_art_id, 'professional_org', 3, 'Psychosis and schizophrenia in adults: Prevention and management (NICE CG178)', '2024', 'https://www.nice.org.uk/guidance/cg178', 'National Institute for Health and Care Excellence', 9)
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
  WHERE a.article_production_id LIKE 'CAT16-%';

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;
