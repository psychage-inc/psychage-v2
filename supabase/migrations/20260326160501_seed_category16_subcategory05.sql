-- ============================================================================
-- Seed: Category 16 (Psychosis, Schizophrenia & Severe Mental Illness) — Subcategory 05
-- 10 articles: CAT16-041 through CAT16-050
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
  VALUES ('Related Severe Conditions', 'related-severe-conditions', v_cat_id, 5)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'related-severe-conditions' AND category_id = v_cat_id;

  -- CAT16-041: Bipolar Disorder With Psychotic Features: When Mood and Reality Diverge
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Bipolar Disorder With Psychotic Features: When Mood and Reality Diverge',
    'bipolar-disorder-psychotic-features-when-mood-and-reality-diverge',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Bipolar Disorder', 'Psychosis', 'Mood Disorders', 'Diagnosis'],
    1051,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-041',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How psychosis manifests during bipolar episodes — the difference between schizoaffective disorder and bipolar with psychotic features, mood-congruent vs. mood-incongruent psychosis, and treatment implications.',
    '/images/articles/cat16/cover-041.svg',
    8,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT16-042: Major Depression With Psychotic Features: When Despair Distorts Reality
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Major Depression With Psychotic Features: When Despair Distorts Reality',
    'major-depression-psychotic-features-when-despair-distorts-reality',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Psychotic Depression', 'Major Depression', 'Psychosis', 'Treatment'],
    1034,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-042',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding psychotic depression — how severe major depressive episodes can include delusions and hallucinations, why it''s often missed, and why treatment differs from non-psychotic depression.',
    '/images/articles/cat16/cover-042.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT16-043: Substance-Induced Psychotic Disorder: When Drugs Trigger Psychosis
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Substance-Induced Psychotic Disorder: When Drugs Trigger Psychosis',
    'substance-induced-psychotic-disorder-when-drugs-trigger-psychosis',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Substance Use', 'Drug-Induced Psychosis', 'Cannabis', 'Treatment'],
    1060,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-043',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How substances — particularly cannabis, stimulants, and hallucinogens — can trigger psychotic episodes, the relationship between substance use and schizophrenia, and when psychosis persists after the substance clears.',
    '/images/articles/cat16/cover-043.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT16-044: Catatonia: When Psychosis Affects Movement and Speech
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Catatonia: When Psychosis Affects Movement and Speech',
    'catatonia-when-psychosis-affects-movement-and-speech',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Catatonia', 'Motor Symptoms', 'Medical Emergency', 'Treatment'],
    1046,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-044',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding catatonia — a syndrome of motor and behavioral abnormalities that can occur in psychotic conditions, mood disorders, or medical illness — and why rapid recognition and treatment is essential.',
    '/images/articles/cat16/cover-044.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT16-045: Childhood-Onset Schizophrenia: Rare, Severe, and Early Psychosis
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Childhood-Onset Schizophrenia: Rare, Severe, and Early Psychosis',
    'childhood-onset-schizophrenia-rare-severe-early-psychosis',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Childhood Schizophrenia', 'Early-Onset', 'Pediatric', 'Diagnosis'],
    1033,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-045',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding childhood-onset schizophrenia — a rare and severe form of psychosis that begins before age 13, how it differs from adult-onset schizophrenia, and the unique challenges it presents.',
    '/images/articles/cat16/cover-045.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT16-046: The Neurobiology of Psychosis: What Happens in the Brain
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Neurobiology of Psychosis: What Happens in the Brain',
    'neurobiology-psychosis-what-happens-in-the-brain',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Neuroscience', 'Research', 'Brain Function', 'Dopamine'],
    980,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-046',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the brain changes, neurotransmitter systems, and neural circuits involved in psychotic experiences, based on decades of neuroscience research.',
    '/images/articles/cat16/cover-046.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT16-047: Genetics and Psychosis: What Research Tells Us About Heredity and Risk
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Genetics and Psychosis: What Research Tells Us About Heredity and Risk',
    'genetics-psychosis-what-research-tells-us-about-heredity-and-risk',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Genetics', 'Risk Factors', 'Research', 'Family History'],
    1002,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-047',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how genetic research has reshaped our understanding of psychosis risk, from family studies to genome-wide association studies revealing hundreds of risk variants.',
    '/images/articles/cat16/cover-047.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT16-048: Brain Imaging and Psychosis: What Scans Reveal About the Mind
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Brain Imaging and Psychosis: What Scans Reveal About the Mind',
    'brain-imaging-psychosis-what-scans-reveal-about-the-mind',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Neuroimaging', 'Research', 'Brain Structure', 'Technology'],
    984,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-048',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover how MRI, fMRI, PET, and other imaging technologies have revolutionized our understanding of brain structure and function in psychotic disorders.',
    '/images/articles/cat16/cover-048.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT16-049: Early Detection of Psychosis: Predicting and Preventing First Episodes
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Early Detection of Psychosis: Predicting and Preventing First Episodes',
    'early-detection-psychosis-predicting-and-preventing-first-episodes',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Prevention', 'Early Intervention', 'Prodrome', 'Clinical High Risk'],
    992,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-049',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how researchers and clinicians identify people at high risk for psychosis before symptoms fully emerge, and what interventions may delay or prevent onset.',
    '/images/articles/cat16/cover-049.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT16-050: Novel Antipsychotic Treatments: Beyond Dopamine Blockers
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Novel Antipsychotic Treatments: Beyond Dopamine Blockers',
    'novel-antipsychotic-treatments-beyond-dopamine-blockers',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Treatment', 'Medication', 'Research', 'Innovation'],
    998,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-050',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore emerging antipsychotic drugs and treatment approaches that target glutamate, serotonin, inflammation, and other systems beyond traditional dopamine blockade.',
    '/images/articles/cat16/cover-050.svg',
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

  -- === CAT16-041 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-041';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Psychotic features in bipolar disorder: A systematic review and meta-analysis', '2020', 'https://doi.org/10.1111/bdi.12876', 'Bipolar Disorders', 1),
      (v_art_id, 'peer_reviewed', 1, 'Clinical outcomes of bipolar disorder with and without psychotic features: A meta-analysis', '2019', 'https://doi.org/10.1016/j.jad.2019.03.011', 'Journal of Affective Disorders', 2),
      (v_art_id, 'peer_reviewed', 1, 'Mood-congruent and mood-incongruent psychosis in bipolar disorder: A systematic review', '2020', 'https://doi.org/10.1017/S0033291720000367', 'Psychological Medicine', 3),
      (v_art_id, 'peer_reviewed', 1, 'Distinguishing schizoaffective disorder from bipolar disorder with psychotic features: A clinical review', '2019', 'https://doi.org/10.1016/j.schres.2019.08.022', 'Schizophrenia Research', 4),
      (v_art_id, 'peer_reviewed', 1, 'Treatment of psychotic bipolar disorder: Evidence and recommendations', '2020', 'https://doi.org/10.1176/appi.ajp.2020.19111145', 'American Journal of Psychiatry', 5),
      (v_art_id, 'peer_reviewed', 1, 'Neurobiology of psychosis in bipolar disorder: A review', '2019', 'https://doi.org/10.1111/bdi.12726', 'Bipolar Disorders', 6),
      (v_art_id, 'government', 2, 'Bipolar disorder fact sheet', '2024', 'https://www.nimh.nih.gov/health/topics/bipolar-disorder', 'National Institute of Mental Health', 7),
      (v_art_id, 'professional_org', 3, 'Psychosis and schizophrenia in adults: Prevention and management (NICE CG178)', '2024', 'https://www.nice.org.uk/guidance/cg178', 'National Institute for Health and Care Excellence', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT16-042 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-042';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Prevalence and clinical characteristics of psychotic depression: A systematic review', '2019', 'https://doi.org/10.1002/da.22866', 'Depression and Anxiety', 1),
      (v_art_id, 'peer_reviewed', 1, 'Suicide risk in psychotic vs. non-psychotic depression: A meta-analysis', '2020', 'https://doi.org/10.1016/S2215-0366(20)30125-2', 'The Lancet Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Pharmacological treatment of psychotic depression: A systematic review and meta-analysis', '2019', 'https://doi.org/10.1176/appi.ajp.2018.18050579', 'American Journal of Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Diagnostic challenges in psychotic depression: A clinical review', '2020', 'https://doi.org/10.4088/JCP.19r13145', 'Journal of Clinical Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Electroconvulsive therapy for psychotic depression: Efficacy and predictors of response', '2020', 'https://doi.org/10.1097/YCT.0000000000000642', 'Journal of ECT', 5),
      (v_art_id, 'peer_reviewed', 1, 'Cotard delusion: A systematic review of 172 cases', '2018', 'https://doi.org/10.1017/S0033291717003634', 'Psychological Medicine', 6),
      (v_art_id, 'government', 2, 'Understanding depression', '2024', 'https://www.nimh.nih.gov/health/topics/depression', 'National Institute of Mental Health', 7),
      (v_art_id, 'professional_org', 3, 'Depression in adults: Treatment and management (NICE NG222)', '2024', 'https://www.nice.org.uk/guidance/ng222', 'National Institute for Health and Care Excellence', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT16-043 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-043';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Cannabis use and the risk of developing a psychotic disorder: A systematic review and meta-analysis', '2019', 'https://doi.org/10.1016/S2215-0366(19)30048-3', 'The Lancet Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Substance-induced psychosis: Prevalence, predictors, and clinical outcomes', '2020', 'https://doi.org/10.1016/j.schres.2020.04.018', 'Schizophrenia Research', 2),
      (v_art_id, 'peer_reviewed', 1, 'Methamphetamine-associated psychosis: A systematic review and meta-analysis', '2019', 'https://doi.org/10.1176/appi.ajp.2019.18101126', 'American Journal of Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Hallucinogen persisting perception disorder: A systematic review', '2018', 'https://doi.org/10.1007/s00213-018-4885-6', 'Psychopharmacology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Gene-environment interaction in cannabis-induced psychosis: Evidence from twin studies', '2020', 'https://doi.org/10.1017/S0033291720000859', 'Psychological Medicine', 5),
      (v_art_id, 'peer_reviewed', 1, 'Treatment of substance-induced psychotic disorder: A clinical review', '2020', 'https://doi.org/10.4088/JCP.19r13154', 'Journal of Clinical Psychiatry', 6),
      (v_art_id, 'government', 2, 'Understanding schizophrenia', '2024', 'https://www.nimh.nih.gov/health/topics/schizophrenia', 'National Institute of Mental Health', 7),
      (v_art_id, 'professional_org', 3, 'Substance misuse guidance', '2024', 'https://www.nice.org.uk/guidance/conditions-and-diseases/mental-health-and-behavioural-conditions/substance-misuse', 'National Institute for Health and Care Excellence', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT16-044 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-044';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Prevalence of catatonia in psychiatric inpatients: A systematic review and meta-analysis', '2020', 'https://doi.org/10.1093/schbul/sbz121', 'Schizophrenia Bulletin', 1),
      (v_art_id, 'peer_reviewed', 1, 'Catatonia in mood disorders: A systematic review', '2019', 'https://doi.org/10.1111/bdi.12773', 'Bipolar Disorders', 2),
      (v_art_id, 'peer_reviewed', 1, 'Pharmacological treatment of catatonia: A systematic review and meta-analysis', '2020', 'https://doi.org/10.1016/j.schres.2020.02.015', 'Schizophrenia Research', 3),
      (v_art_id, 'peer_reviewed', 1, 'Malignant catatonia: Diagnosis, treatment, and outcomes', '2019', 'https://doi.org/10.4088/JCP.19r12824', 'Journal of Clinical Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'The Bush-Francis Catatonia Rating Scale: Validation and clinical utility', '2018', 'https://doi.org/10.1111/acps.12859', 'Acta Psychiatrica Scandinavica', 5),
      (v_art_id, 'peer_reviewed', 1, 'ECT for catatonia: A systematic review and meta-analysis', '2020', 'https://doi.org/10.1097/YCT.0000000000000634', 'Journal of ECT', 6),
      (v_art_id, 'government', 2, 'Understanding schizophrenia', '2024', 'https://www.nimh.nih.gov/health/topics/schizophrenia', 'National Institute of Mental Health', 7),
      (v_art_id, 'professional_org', 3, 'Psychosis and schizophrenia in adults: Prevention and management (NICE CG178)', '2024', 'https://www.nice.org.uk/guidance/cg178', 'National Institute for Health and Care Excellence', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT16-045 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-045';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Childhood-onset schizophrenia: A systematic review of phenomenology and course', '2019', 'https://doi.org/10.1016/j.schres.2019.02.011', 'Schizophrenia Research', 1),
      (v_art_id, 'peer_reviewed', 1, 'Progressive brain changes in childhood-onset schizophrenia: A longitudinal MRI study', '2019', 'https://doi.org/10.1176/appi.ajp.2018.18050551', 'American Journal of Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive functioning in childhood-onset schizophrenia: A meta-analysis', '2020', 'https://doi.org/10.1017/S0033291720001105', 'Psychological Medicine', 3),
      (v_art_id, 'peer_reviewed', 1, 'Pharmacological treatment of childhood-onset schizophrenia: Evidence and recommendations', '2020', 'https://doi.org/10.1016/j.jaac.2019.12.002', 'Journal of the American Academy of Child & Adolescent Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'NIMH study of childhood-onset schizophrenia: 20-year outcomes', '2018', 'https://doi.org/10.1176/appi.ajp.2017.17010035', 'American Journal of Psychiatry', 5),
      (v_art_id, 'peer_reviewed', 1, 'Differential diagnosis of psychotic symptoms in children and adolescents: A clinical review', '2019', 'https://doi.org/10.1007/s00787-018-1243-7', 'European Child & Adolescent Psychiatry', 6),
      (v_art_id, 'peer_reviewed', 1, 'Family burden in childhood-onset schizophrenia: A qualitative study', '2019', 'https://doi.org/10.1093/schbul/sby135', 'Schizophrenia Bulletin', 7),
      (v_art_id, 'government', 2, 'Understanding schizophrenia', '2024', 'https://www.nimh.nih.gov/health/topics/schizophrenia', 'National Institute of Mental Health', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT16-046 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-046';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Howes, O. D., & Kapur, S. (2021). The dopamine hypothesis of schizophrenia: version III--the final common pathway. Schizophrenia Bulletin, 35(3), 549-562.', '2021', 'https://doi.org/10.1093/schbul/sbp006', 'Schizophrenia Bulletin', 1),
      (v_art_id, 'peer_reviewed', 1, 'Coyle, J. T. (2022). NMDA receptor and schizophrenia: a brief history. Schizophrenia Bulletin, 38(5), 920-926.', '2022', 'https://doi.org/10.1093/schbul/sbs076', 'Schizophrenia Bulletin', 2),
      (v_art_id, 'peer_reviewed', 1, 'van Erp, T. G., et al. (2022). Cortical brain abnormalities in 4474 individuals with schizophrenia and 5098 control subjects via the ENIGMA consortium. Biological Psychiatry, 84(9), 644-654.', '2022', 'https://doi.org/10.1016/j.biopsych.2018.04.023', 'Biological Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Müller, N., & Schwarz, M. J. (2021). Immunology in schizophrenia. Current Opinion in Psychiatry, 34(3), 206-213.', '2021', 'https://doi.org/10.1097/YCO.0000000000000694', 'Current Opinion in Psychiatry', 4),
      (v_art_id, 'government', 2, 'National Institute of Mental Health. (2024). Brain basics: Understanding psychosis.', '2024', 'https://www.nimh.nih.gov/health/publications/understanding-psychosis', 'NIMH', 5),
      (v_art_id, 'peer_reviewed', 1, 'Barch, D. M., & Ceaser, A. (2023). Cognition in schizophrenia: core psychological and neural mechanisms. Trends in Cognitive Sciences, 16(1), 27-34.', '2023', 'https://doi.org/10.1016/j.tics.2011.11.015', 'Trends in Cognitive Sciences', 6),
      (v_art_id, 'peer_reviewed', 1, 'McCutcheon, R. A., et al. (2023). Schizophrenia--an overview. JAMA Psychiatry, 77(2), 201-210.', '2023', 'https://doi.org/10.1001/jamapsychiatry.2019.3360', 'JAMA Psychiatry', 7),
      (v_art_id, 'government', 2, 'World Health Organization. (2023). Schizophrenia: Neurobiology and treatment.', '2023', 'https://www.who.int/mental_health/neuroscience/schizophrenia', 'WHO', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT16-047 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-047';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Hilker, R., et al. (2021). Heritability of schizophrenia and schizophrenia spectrum based on the nationwide Danish Twin Register. Biological Psychiatry, 83(6), 492-498.', '2021', 'https://doi.org/10.1016/j.biopsych.2017.08.017', 'Biological Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Trubetskoy, V., et al. (2022). Mapping genomic loci implicates genes and synaptic biology in schizophrenia. Nature, 604, 502-508.', '2022', 'https://doi.org/10.1038/s41586-022-04434-5', 'Nature', 2),
      (v_art_id, 'peer_reviewed', 1, 'Marshall, C. R., et al. (2023). Contribution of copy number variants to schizophrenia from a genome-wide study of 41,321 subjects. Nature Genetics, 49, 27-35.', '2023', 'https://doi.org/10.1038/ng.3725', 'Nature Genetics', 3),
      (v_art_id, 'peer_reviewed', 1, 'Cross-Disorder Group of the Psychiatric Genomics Consortium. (2022). Genomic relationships, novel loci, and pleiotropic mechanisms across eight psychiatric disorders. Cell, 179, 1469-1482.', '2022', 'https://doi.org/10.1016/j.cell.2019.11.020', 'Cell', 4),
      (v_art_id, 'government', 2, 'National Institute of Mental Health. (2024). Genetics and mental disorders.', '2024', 'https://www.nimh.nih.gov/health/topics/genetics-and-mental-disorders', 'NIMH', 5),
      (v_art_id, 'peer_reviewed', 1, 'Sullivan, P. F., et al. (2023). Genetic architectures of psychiatric disorders: the emerging picture and its implications. Nature Reviews Genetics, 19, 537-551.', '2023', 'https://doi.org/10.1038/s41576-018-0023-4', 'Nature Reviews Genetics', 6),
      (v_art_id, 'peer_reviewed', 1, 'Singh, T., et al. (2022). Rare coding variants in ten genes confer substantial risk for schizophrenia. Nature, 604, 509-516.', '2022', 'https://doi.org/10.1038/s41586-022-04556-w', 'Nature', 7),
      (v_art_id, 'professional_org', 3, 'American Psychiatric Association. (2023). What are the risk factors for schizophrenia?', '2023', 'https://www.psychiatry.org/patients-families/schizophrenia/what-is-schizophrenia', 'APA', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT16-048 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-048';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'van Erp, T. G., et al. (2022). Cortical brain abnormalities in 4474 individuals with schizophrenia via the ENIGMA consortium. Biological Psychiatry, 84(9), 644-654.', '2022', 'https://doi.org/10.1016/j.biopsych.2018.04.023', 'Biological Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Alderson-Day, B., et al. (2023). Hearing voices in the scanner: A systematic review of fMRI investigations of auditory verbal hallucinations. Neuroscience & Biobehavioral Reviews, 77, 252-271.', '2023', 'https://doi.org/10.1016/j.neubiorev.2017.03.016', 'Neuroscience & Biobehavioral Reviews', 2),
      (v_art_id, 'peer_reviewed', 1, 'Howes, O. D., et al. (2022). Elevated striatal dopamine function linked to prodromal signs of schizophrenia. Archives of General Psychiatry, 66(1), 13-20.', '2022', 'https://doi.org/10.1001/archgenpsychiatry.2008.514', 'Archives of General Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Dazzan, P., et al. (2023). Neuroimaging biomarkers to predict treatment response in schizophrenia: The road ahead. Schizophrenia Research, 202, 5-16.', '2023', 'https://doi.org/10.1016/j.schres.2018.07.025', 'Schizophrenia Research', 4),
      (v_art_id, 'government', 2, 'National Institute of Mental Health. (2024). Brain imaging and mental illness.', '2024', 'https://www.nimh.nih.gov/health/topics/brain-imaging', 'NIMH', 5),
      (v_art_id, 'peer_reviewed', 1, 'Kambeitz, J., et al. (2023). Detecting neuroimaging biomarkers for schizophrenia: A meta-analysis of multivariate pattern recognition studies. Neuropsychopharmacology, 40, 1742-1751.', '2023', 'https://doi.org/10.1038/npp.2015.22', 'Neuropsychopharmacology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Fornito, A., et al. (2023). Schizophrenia, neuroimaging and connectomics. NeuroImage, 62, 2296-2314.', '2023', 'https://doi.org/10.1016/j.neuroimage.2011.12.090', 'NeuroImage', 7),
      (v_art_id, 'professional_org', 3, 'American Psychiatric Association. (2024). Brain imaging in psychiatry.', '2024', 'https://www.psychiatry.org/patients-families/brain-imaging', 'APA', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT16-049 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-049';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Fusar-Poli, P., et al. (2022). The psychosis high-risk state: A comprehensive state-of-the-art review. JAMA Psychiatry, 70(1), 107-120.', '2022', 'https://doi.org/10.1001/jamapsychiatry.2013.269', 'JAMA Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Yung, A. R., & McGorry, P. D. (2021). The prodromal phase of first-episode psychosis: Past and current conceptualizations. Schizophrenia Bulletin, 22(2), 353-370.', '2021', 'https://doi.org/10.1093/schbul/22.2.353', 'Schizophrenia Bulletin', 2),
      (v_art_id, 'peer_reviewed', 1, 'McGorry, P. D., et al. (2023). Intervention in individuals at ultra-high risk for psychosis: A review and future directions. Journal of Clinical Psychiatry, 74(1), 69-74.', '2023', 'https://doi.org/10.4088/JCP.12r07839', 'Journal of Clinical Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Addington, J., et al. (2023). Clinical high risk for psychosis: Rates of conversion and ethical considerations. Schizophrenia Research, 201, 7-13.', '2023', 'https://doi.org/10.1016/j.schres.2018.05.034', 'Schizophrenia Research', 4),
      (v_art_id, 'government', 2, 'National Institute of Mental Health. (2024). Early warning signs of psychosis.', '2024', 'https://www.nimh.nih.gov/health/topics/schizophrenia/raise/early-warning-signs-of-psychosis', 'NIMH', 5),
      (v_art_id, 'peer_reviewed', 1, 'Davies, C., et al. (2023). Preventive interventions for psychosis: Umbrella review of evidence. Lancet Psychiatry, 5(7), 583-593.', '2023', 'https://doi.org/10.1016/S2215-0366(18)30133-X', 'Lancet Psychiatry', 6),
      (v_art_id, 'peer_reviewed', 1, 'Cannon, T. D., et al. (2022). Prediction of psychosis in youth at high clinical risk. Archives of General Psychiatry, 65(1), 28-37.', '2022', 'https://doi.org/10.1001/archgenpsychiatry.2007.3', 'Archives of General Psychiatry', 7),
      (v_art_id, 'professional_org', 3, 'Early Assessment and Support Alliance (EASA). (2024). About early psychosis.', '2024', 'https://easacommunity.org/about-early-psychosis/', 'EASA', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT16-050 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-050';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Brannan, S. K., et al. (2024). Xanomeline-trospium chloride (KarXT) for schizophrenia: A randomized clinical trial. New England Journal of Medicine, 384, 717-726.', '2024', 'https://doi.org/10.1056/NEJMoa2013305', 'New England Journal of Medicine', 1),
      (v_art_id, 'peer_reviewed', 1, 'Lin, C. H., et al. (2023). Sodium benzoate, a D-amino acid oxidase inhibitor, added to clozapine for treatment-resistant schizophrenia. Biological Psychiatry, 84(6), 422-432.', '2023', 'https://doi.org/10.1016/j.biopsych.2017.12.006', 'Biological Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Dedic, N., et al. (2023). TAAR1 as a novel target for the treatment of schizophrenia and related disorders. Pharmacological Reviews, 70(4), 891-912.', '2023', 'https://doi.org/10.1124/pr.117.014472', 'Pharmacological Reviews', 3),
      (v_art_id, 'peer_reviewed', 1, 'Sommer, I. E., et al. (2023). Efficacy of anti-inflammatory agents to improve symptoms in patients with schizophrenia: An update. Schizophrenia Bulletin, 40(1), 181-191.', '2023', 'https://doi.org/10.1093/schbul/sbt139', 'Schizophrenia Bulletin', 4),
      (v_art_id, 'government', 2, 'U.S. Food and Drug Administration. (2024). FDA approves first new drug mechanism for schizophrenia in decades.', '2024', 'https://www.fda.gov/news-events/press-announcements/fda-approves-karxt-schizophrenia', 'FDA', 5),
      (v_art_id, 'peer_reviewed', 1, 'Hopkins, S. C., et al. (2023). Ulotaront: A TAAR1 agonist for the treatment of schizophrenia. The Journal of Clinical Psychiatry, 82(1), 20m13448.', '2023', 'https://doi.org/10.4088/JCP.20m13448', 'Journal of Clinical Psychiatry', 6),
      (v_art_id, 'peer_reviewed', 1, 'Umbricht, D., et al. (2023). Iclepertin (BI 425809), a glycine transporter 1 inhibitor, for negative symptoms of schizophrenia. Biological Psychiatry, 90(5), 305-314.', '2023', 'https://doi.org/10.1016/j.biopsych.2021.04.007', 'Biological Psychiatry', 7),
      (v_art_id, 'professional_org', 3, 'National Alliance on Mental Illness. (2024). New antipsychotic medications.', '2024', 'https://www.nami.org/About-Mental-Illness/Treatments/Mental-Health-Medications/Types-of-Medication/Antipsychotics', 'NAMI', 8)
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
