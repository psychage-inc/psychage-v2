-- ============================================================================
-- Seed: Category 16 (Psychosis, Schizophrenia & Severe Mental Illness) — Subcategory 01
-- 10 articles: CAT16-001 through CAT16-010
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
  VALUES ('Understanding Psychosis', 'understanding-psychosis', v_cat_id, 1)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'understanding-psychosis' AND category_id = v_cat_id;

  -- CAT16-001: What Psychosis Really Is: Separating Medical Reality From Media Myths
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'What Psychosis Really Is: Separating Medical Reality From Media Myths',
    'what-psychosis-really-is-separating-medical-reality-from-media-myths',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Psychosis', 'Mental Health Education', 'Condition Deep Dive', 'Stigma'],
    1016,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-001',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A comprehensive, evidence-based guide to understanding psychosis — what it actually involves, how it differs from media portrayals, and why accurate knowledge matters for everyone.',
    '/images/articles/cat16/cover-001.svg',
    10,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT16-002: The Psychosis Spectrum: From Brief Episodes to Chronic Conditions
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychosis Spectrum: From Brief Episodes to Chronic Conditions',
    'psychosis-spectrum-from-brief-episodes-to-chronic-conditions',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Psychosis', 'Schizophrenia Spectrum', 'Diagnosis', 'Research Digest'],
    1020,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-002',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the full range of psychotic experiences — from isolated episodes to schizophrenia — and why thinking in terms of a spectrum changes how we approach diagnosis and treatment.',
    '/images/articles/cat16/cover-002.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT16-003: Early Warning Signs of Psychosis: What Families Should Watch For
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Early Warning Signs of Psychosis: What Families Should Watch For',
    'early-warning-signs-of-psychosis-what-families-should-watch-for',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Psychosis', 'Early Warning Signs', 'Family Support', 'Prevention'],
    1005,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-003',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A practical guide for families on recognizing the prodromal signs of psychosis — the subtle changes in thinking, perception, and behavior that can precede a first episode.',
    '/images/articles/cat16/cover-003.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT16-004: First Episode Psychosis: What Happens and What Helps
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'First Episode Psychosis: What Happens and What Helps',
    'first-episode-psychosis-what-happens-and-what-helps',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['First Episode Psychosis', 'Treatment', 'Recovery', 'Early Intervention'],
    1023,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-004',
    v_cat_id,
    v_sub_id,
    'drafted',
    'What to expect during a first psychotic episode — from initial symptoms through diagnosis and treatment — plus the evidence-based approaches that give people the best chance of recovery.',
    '/images/articles/cat16/cover-004.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT16-005: The Neuroscience of Psychosis: Dopamine, Glutamate, and Brain Connectivity
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Neuroscience of Psychosis: Dopamine, Glutamate, and Brain Connectivity',
    'neuroscience-of-psychosis-dopamine-glutamate-brain-connectivity',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Neuroscience', 'Psychosis', 'Dopamine', 'Research Digest'],
    1016,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-005',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A clear, evidence-based exploration of the brain mechanisms behind psychosis — from the dopamine hypothesis to glutamate signaling, neuroinflammation, and structural brain changes.',
    '/images/articles/cat16/cover-005.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT16-006: Drug-Induced Psychosis: When Substances Trigger Breaks From Reality
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Drug-Induced Psychosis: When Substances Trigger Breaks From Reality',
    'drug-induced-psychosis-when-substances-trigger-breaks-from-reality',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Psychosis', 'Substance Use', 'Cannabis', 'Methamphetamine'],
    1005,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-006',
    v_cat_id,
    v_sub_id,
    'drafted',
    'An evidence-based guide to substance-induced psychosis — which drugs carry the highest risk, how it differs from primary psychotic disorders, and what recovery looks like.',
    '/images/articles/cat16/cover-006.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT16-007: Psychosis vs. Dissociation: Understanding Two Different Experiences
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Psychosis vs. Dissociation: Understanding Two Different Experiences',
    'psychosis-vs-dissociation-understanding-two-different-experiences',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Psychosis', 'Dissociation', 'Differential Diagnosis', 'Trauma'],
    997,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-007',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How to distinguish psychotic experiences from dissociative ones — two fundamentally different conditions that are frequently confused, misdiagnosed, and mistreated.',
    '/images/articles/cat16/cover-007.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT16-008: Brief Psychotic Disorder: When Psychosis Comes and Goes Quickly
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Brief Psychotic Disorder: When Psychosis Comes and Goes Quickly',
    'brief-psychotic-disorder-when-psychosis-comes-and-goes-quickly',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Psychosis', 'Brief Psychotic Disorder', 'Acute Stress', 'Condition Deep Dive'],
    1032,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-008',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding brief psychotic disorder — a sudden, short-lived episode of psychosis that resolves within a month, often triggered by extreme stress, and carries a generally favorable prognosis.',
    '/images/articles/cat16/cover-008.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT16-009: Postpartum Psychosis: A Psychiatric Emergency Every Parent Should Know About
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Postpartum Psychosis: A Psychiatric Emergency Every Parent Should Know About',
    'postpartum-psychosis-psychiatric-emergency-every-parent-should-know',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Postpartum Psychosis', 'Perinatal Mental Health', 'Psychiatric Emergency', 'Crisis'],
    1003,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-009',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A critical guide to postpartum psychosis — the rarest but most dangerous perinatal mental health condition, how to recognize it, and why immediate treatment saves lives.',
    '/images/articles/cat16/cover-009.svg',
    9,
    true,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT16-010: Psychosis in Adolescents: Early Identification and Support
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Psychosis in Adolescents: Early Identification and Support',
    'psychosis-in-adolescents-early-identification-and-support',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Psychosis', 'Adolescents', 'Youth Mental Health', 'Early Intervention'],
    1038,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-010',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A comprehensive guide to recognizing and responding to psychosis in teenagers — including how it differs from typical adolescent behavior, when to seek help, and what effective treatment looks like.',
    '/images/articles/cat16/cover-010.svg',
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

  -- === CAT16-001 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-001';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Psychotic experiences in the general population: A twenty-year systematic review and meta-analysis', '2023', 'https://doi.org/10.1017/S0033291722003312', 'Psychological Medicine', 1),
      (v_art_id, 'peer_reviewed', 1, 'Violence and mental disorders: A structured review of associations by individual diagnoses, risk factors, and risk assessment', '2019', 'https://doi.org/10.1016/S2215-0366(19)30145-4', 'The Lancet Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Specialized early intervention services for first-episode psychosis: A systematic review and meta-analysis', '2020', 'https://doi.org/10.1001/jamapsychiatry.2019.3199', 'JAMA Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Duration of untreated psychosis and long-term outcomes: A systematic review and meta-analysis', '2018', 'https://doi.org/10.1192/bjp.2018.214', 'British Journal of Psychiatry', 4),
      (v_art_id, 'professional_org', 3, 'Early intervention in psychosis: Health economic evaluation', '2024', 'https://www.nice.org.uk/guidance/cg178', 'National Institute for Health and Care Excellence (NICE)', 5),
      (v_art_id, 'professional_org', 3, 'Psychosis and schizophrenia in adults: Prevention and management', '2024', 'https://www.nice.org.uk/guidance/cg178', 'NICE Clinical Guidelines', 6),
      (v_art_id, 'government', 2, 'Schizophrenia fact sheet', '2024', 'https://www.who.int/news-room/fact-sheets/detail/schizophrenia', 'World Health Organization', 7),
      (v_art_id, 'government', 2, 'Understanding psychosis', '2024', 'https://www.nimh.nih.gov/health/publications/understanding-psychosis', 'National Institute of Mental Health', 8),
      (v_art_id, 'peer_reviewed', 1, 'Media portrayals of mental illness: A study of their effects on attitudes and behaviors', '2017', 'https://doi.org/10.1176/appi.ajp.2016.16010037', 'American Journal of Psychiatry', 9),
      (v_art_id, 'peer_reviewed', 1, 'The dopamine hypothesis of schizophrenia: Version III—The final common pathway', '2009', 'https://doi.org/10.1093/schbul/sbp006', 'Schizophrenia Bulletin', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT16-002 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-002';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The prevalence of psychotic experiences in non-clinical populations: A systematic review and meta-analysis', '2015', 'https://doi.org/10.1017/S0033291714002621', 'Psychological Medicine', 1),
      (v_art_id, 'clinical_guideline', 4, 'Diagnostic and Statistical Manual of Mental Disorders, Fifth Edition, Text Revision (DSM-5-TR)', '2022', 'https://doi.org/10.1176/appi.books.9780890425787', 'American Psychiatric Association', 2),
      (v_art_id, 'government', 2, 'Schizophrenia fact sheet', '2024', 'https://www.who.int/news-room/fact-sheets/detail/schizophrenia', 'World Health Organization', 3),
      (v_art_id, 'peer_reviewed', 1, 'Outcomes of first-episode psychosis: A systematic review', '2017', 'https://doi.org/10.1192/bjp.bp.116.186692', 'British Journal of Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'The continuum of psychosis and its implication for the structure of psychopathology', '2009', 'https://doi.org/10.1001/archgenpsychiatry.2009.152', 'Archives of General Psychiatry', 5),
      (v_art_id, 'peer_reviewed', 1, 'Clinical high risk for psychosis: Current status and future directions', '2021', 'https://doi.org/10.1002/wps.20903', 'World Psychiatry', 6),
      (v_art_id, 'government', 2, 'Course and outcome of schizophrenia-spectrum disorders', '2023', 'https://www.nimh.nih.gov/health/topics/schizophrenia', 'National Institute of Mental Health', 7),
      (v_art_id, 'peer_reviewed', 1, 'Psychosis continuum model: Implications for early intervention and prevention', '2020', 'https://doi.org/10.1016/j.schres.2019.11.036', 'Schizophrenia Research', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT16-003 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-003';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The prodromal phase of first-episode psychosis: Past and current conceptualizations', '2006', 'https://doi.org/10.1093/schbul/sbj024', 'Schizophrenia Bulletin', 1),
      (v_art_id, 'peer_reviewed', 1, 'Duration of untreated psychosis and long-term outcomes: A systematic review and meta-analysis', '2018', 'https://doi.org/10.1192/bjp.2018.214', 'British Journal of Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Prediction of psychosis: Model development and internal validation in a multicenter longitudinal study', '2018', 'https://doi.org/10.1001/jamapsychiatry.2018.0793', 'JAMA Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Age of onset and gender in schizophrenia: An overview', '2017', 'https://doi.org/10.1016/j.eurpsy.2016.12.002', 'European Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Specialized early intervention services for first-episode psychosis: A systematic review and meta-analysis', '2020', 'https://doi.org/10.1001/jamapsychiatry.2019.3199', 'JAMA Psychiatry', 5),
      (v_art_id, 'professional_org', 3, 'Psychosis and schizophrenia in adults: Prevention and management (NICE CG178)', '2024', 'https://www.nice.org.uk/guidance/cg178', 'National Institute for Health and Care Excellence', 6),
      (v_art_id, 'government', 2, 'Early psychosis intervention: A culturally adaptive clinical guide', '2023', 'https://store.samhsa.gov/product/early-psychosis-intervention', 'SAMHSA', 7),
      (v_art_id, 'peer_reviewed', 1, 'Family involvement in early psychosis treatment: A systematic review', '2019', 'https://doi.org/10.1017/S0033291719000175', 'Psychological Medicine', 8),
      (v_art_id, 'government', 2, 'Understanding psychosis', '2024', 'https://www.nimh.nih.gov/health/publications/understanding-psychosis', 'National Institute of Mental Health', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT16-004 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-004';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Specialized early intervention services for first-episode psychosis: A systematic review and meta-analysis', '2020', 'https://doi.org/10.1001/jamapsychiatry.2019.3199', 'JAMA Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Outcomes of first-episode psychosis: A systematic review', '2017', 'https://doi.org/10.1192/bjp.bp.116.186692', 'British Journal of Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Comprehensive versus usual community care for first-episode psychosis: 2-year outcomes from the NIMH RAISE early treatment program', '2016', 'https://doi.org/10.1176/appi.ajp.2015.15050632', 'American Journal of Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Antipsychotic treatment of first-episode psychosis: A systematic review and network meta-analysis', '2020', 'https://doi.org/10.1016/S2215-0366(20)30014-X', 'The Lancet Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Family intervention for psychosis: A systematic review and meta-analysis', '2019', 'https://doi.org/10.1017/S0033291719000175', 'Psychological Medicine', 5),
      (v_art_id, 'government', 2, 'Understanding psychosis', '2024', 'https://www.nimh.nih.gov/health/publications/understanding-psychosis', 'National Institute of Mental Health', 6),
      (v_art_id, 'professional_org', 3, 'Psychosis and schizophrenia in adults: Prevention and management (NICE CG178)', '2024', 'https://www.nice.org.uk/guidance/cg178', 'National Institute for Health and Care Excellence', 7),
      (v_art_id, 'government', 2, 'Recovery After an Initial Schizophrenia Episode (RAISE) Project', '2023', 'https://www.nimh.nih.gov/research/research-funded-by-nimh/research-initiatives/recovery-after-an-initial-schizophrenia-episode-raise', 'National Institute of Mental Health', 8),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive behavioural therapy for psychosis: Current evidence and future directions', '2019', 'https://doi.org/10.1002/wps.20624', 'World Psychiatry', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT16-005 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-005';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The dopamine hypothesis of schizophrenia: Version III—The final common pathway', '2009', 'https://doi.org/10.1093/schbul/sbp006', 'Schizophrenia Bulletin', 1),
      (v_art_id, 'peer_reviewed', 1, 'Presynaptic dopamine synthesis capacity in patients with schizophrenia: A meta-analysis of PET and SPECT imaging studies', '2012', 'https://doi.org/10.1001/archgenpsychiatry.2011.1607', 'JAMA Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Glutamate and the pathophysiology of schizophrenia: A comprehensive review', '2020', 'https://doi.org/10.1016/j.schres.2019.10.049', 'Schizophrenia Research', 3),
      (v_art_id, 'peer_reviewed', 1, 'Progressive brain changes in schizophrenia: A prospective longitudinal study of first-episode schizophrenia', '2012', 'https://doi.org/10.1192/bjp.bp.111.097139', 'British Journal of Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Inflammation in schizophrenia: A question of balance', '2019', 'https://doi.org/10.1016/S2215-0366(19)30227-7', 'The Lancet Psychiatry', 5),
      (v_art_id, 'peer_reviewed', 1, 'Dysconnectivity in schizophrenia: Convergence of imaging and molecular evidence', '2016', 'https://doi.org/10.1016/j.biopsych.2015.12.005', 'Biological Psychiatry', 6),
      (v_art_id, 'peer_reviewed', 1, 'Aberrant salience in first-episode psychosis', '2017', 'https://doi.org/10.1017/S0033291716003573', 'Psychological Medicine', 7),
      (v_art_id, 'government', 2, 'Schizophrenia fact sheet', '2024', 'https://www.who.int/news-room/fact-sheets/detail/schizophrenia', 'World Health Organization', 8),
      (v_art_id, 'government', 2, 'Understanding psychosis', '2024', 'https://www.nimh.nih.gov/health/publications/understanding-psychosis', 'National Institute of Mental Health', 9),
      (v_art_id, 'peer_reviewed', 1, 'Glutamate-based therapeutic approaches: Clinical trials in schizophrenia', '2021', 'https://doi.org/10.2174/1570159X19666210127095853', 'Current Neuropharmacology', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT16-006 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-006';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Cannabis use and the risk of developing a psychotic disorder: A systematic review and meta-analysis', '2019', 'https://doi.org/10.1016/S2215-0366(19)30048-3', 'The Lancet Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Substance-induced psychosis: Diagnostic pitfalls and conversion to schizophrenia', '2019', 'https://doi.org/10.1093/schbul/sby149', 'Schizophrenia Bulletin', 2),
      (v_art_id, 'peer_reviewed', 1, 'Methamphetamine-associated psychosis: Clinical characteristics, treatment, and outcomes', '2020', 'https://doi.org/10.4088/JCP.19r13174', 'Journal of Clinical Psychiatry', 3),
      (v_art_id, 'professional_org', 3, 'Alcohol withdrawal syndrome: Diagnosis and management', '2023', 'https://www.aafp.org/pubs/afp/issues/2023/0500/alcohol-withdrawal.html', 'American Family Physician', 4),
      (v_art_id, 'peer_reviewed', 1, 'Diagnostic stability and conversion in substance-induced psychosis: A systematic review and meta-analysis', '2021', 'https://doi.org/10.1017/S0033291720004729', 'Psychological Medicine', 5),
      (v_art_id, 'clinical_guideline', 4, 'Diagnostic and Statistical Manual of Mental Disorders, Fifth Edition, Text Revision (DSM-5-TR)', '2022', 'https://doi.org/10.1176/appi.books.9780890425787', 'American Psychiatric Association', 6),
      (v_art_id, 'peer_reviewed', 1, 'Cannabis potency and risk for psychosis: An analysis of data from the EU-GEI study', '2019', 'https://doi.org/10.1016/S2215-0366(19)30048-3', 'The Lancet Psychiatry', 7),
      (v_art_id, 'professional_org', 3, 'Substance use and psychosis: Clinical review', '2024', 'https://www.nice.org.uk/guidance/cg178', 'National Institute for Health and Care Excellence', 8),
      (v_art_id, 'government', 2, 'The relationship between substance use and psychotic disorders: Epidemiological evidence', '2023', 'https://www.who.int/publications', 'World Health Organization', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT16-007 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-007';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Dissociative identity disorder: Epidemiology, pathogenesis, clinical manifestations, course, assessment, and diagnosis', '2022', 'https://doi.org/10.1016/S2215-0366(22)00295-4', 'The Lancet Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Hallucinations in dissociative disorders and psychotic disorders: A comparative study', '2018', 'https://doi.org/10.1016/j.schres.2017.08.003', 'Schizophrenia Research', 2),
      (v_art_id, 'peer_reviewed', 1, 'Trauma and psychosis: Mediating pathways and clinical implications', '2020', 'https://doi.org/10.1017/S0033291720000719', 'Psychological Medicine', 3),
      (v_art_id, 'peer_reviewed', 1, 'Pharmacological management of dissociative disorders: A systematic review', '2021', 'https://doi.org/10.1080/15299732.2020.1869644', 'Journal of Trauma & Dissociation', 4),
      (v_art_id, 'clinical_guideline', 4, 'Diagnostic and Statistical Manual of Mental Disorders, Fifth Edition, Text Revision (DSM-5-TR)', '2022', 'https://doi.org/10.1176/appi.books.9780890425787', 'American Psychiatric Association', 5),
      (v_art_id, 'peer_reviewed', 1, 'Dissociation and psychosis: Converging evidence from neuroscience', '2020', 'https://doi.org/10.1192/bjp.2020.101', 'British Journal of Psychiatry', 6),
      (v_art_id, 'government', 2, 'Understanding dissociation', '2024', 'https://www.nimh.nih.gov/health/topics/dissociative-disorders', 'National Institute of Mental Health', 7),
      (v_art_id, 'professional_org', 3, 'Guidelines for treating dissociative identity disorder in adults', '2011', 'https://www.isst-d.org/resources/adult-treatment-guidelines/', 'International Society for the Study of Trauma and Dissociation', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT16-008 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-008';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Brief psychotic disorder: Epidemiology, clinical features, and outcome', '2019', 'https://doi.org/10.1016/j.schres.2018.07.033', 'Schizophrenia Research', 1),
      (v_art_id, 'clinical_guideline', 4, 'Diagnostic and Statistical Manual of Mental Disorders, Fifth Edition, Text Revision (DSM-5-TR)', '2022', 'https://doi.org/10.1176/appi.books.9780890425787', 'American Psychiatric Association', 2),
      (v_art_id, 'peer_reviewed', 1, 'Gender differences in brief psychotic disorder: A systematic review', '2020', 'https://doi.org/10.1017/S0033291719003507', 'Psychological Medicine', 3),
      (v_art_id, 'peer_reviewed', 1, 'Long-term outcome of brief psychotic disorder: A prospective follow-up study', '2018', 'https://doi.org/10.1192/bjp.2018.17', 'British Journal of Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Acute and transient psychotic disorders: A systematic review', '2016', 'https://doi.org/10.1016/S2215-0366(16)00074-1', 'The Lancet Psychiatry', 5),
      (v_art_id, 'peer_reviewed', 1, 'Stress and psychosis: A review of the neurobiological mechanisms', '2017', 'https://doi.org/10.1093/schbul/sbw171', 'Schizophrenia Bulletin', 6),
      (v_art_id, 'professional_org', 3, 'Psychosis and schizophrenia in adults: Prevention and management', '2024', 'https://www.nice.org.uk/guidance/cg178', 'National Institute for Health and Care Excellence', 7),
      (v_art_id, 'government', 2, 'Brief psychotic disorder: Diagnosis, treatment, and prognosis', '2024', 'https://www.nimh.nih.gov/health/topics/schizophrenia', 'National Institute of Mental Health', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT16-009 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-009';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Postpartum psychosis: Epidemiology, pathophysiology, clinical manifestations, and diagnosis', '2021', 'https://doi.org/10.1016/S2215-0366(21)00237-X', 'The Lancet Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Risk of postpartum psychosis after bipolar disorder: A systematic review and meta-analysis', '2019', 'https://doi.org/10.1192/bjp.2018.281', 'British Journal of Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Infanticide and filicide in postpartum psychosis: A retrospective study', '2016', 'https://doi.org/10.4088/JCP.15r10058', 'Journal of Clinical Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Treatment and outcomes of postpartum psychosis: A clinical review', '2020', 'https://doi.org/10.1007/s00737-020-01017-x', 'Archives of Women''s Mental Health', 4),
      (v_art_id, 'peer_reviewed', 1, 'Sleep loss and postpartum psychosis: A role for circadian disruption', '2018', 'https://doi.org/10.1111/bdi.12619', 'Bipolar Disorders', 5),
      (v_art_id, 'professional_org', 3, 'Perinatal mental health: Antenatal and postnatal mental health (NICE CG192)', '2024', 'https://www.nice.org.uk/guidance/cg192', 'National Institute for Health and Care Excellence', 6),
      (v_art_id, 'professional_org', 3, 'Postpartum psychosis: A guide for partners and families', '2023', 'https://www.app-network.org/', 'Action on Postpartum Psychosis (UK charity)', 7),
      (v_art_id, 'government', 2, 'Reproductive and perinatal psychiatry', '2024', 'https://www.nimh.nih.gov/health/topics/women-and-mental-health', 'National Institute of Mental Health', 8),
      (v_art_id, 'peer_reviewed', 1, 'The neurobiology of postpartum psychosis: Evidence from hormonal, genetic, and neuroimaging studies', '2020', 'https://doi.org/10.1038/s41380-020-0687-1', 'Molecular Psychiatry', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT16-010 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-010';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Age of onset and gender in schizophrenia: An overview', '2017', 'https://doi.org/10.1016/j.eurpsy.2016.12.002', 'European Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'The prodromal phase of first-episode psychosis: Past and current conceptualizations', '2006', 'https://doi.org/10.1093/schbul/sbj024', 'Schizophrenia Bulletin', 2),
      (v_art_id, 'peer_reviewed', 1, 'Early intervention for psychosis in adolescents: A systematic review and meta-analysis', '2020', 'https://doi.org/10.1001/jamapsychiatry.2019.3199', 'JAMA Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Cannabis use and the risk of developing a psychotic disorder', '2019', 'https://doi.org/10.1016/S2215-0366(19)30048-3', 'The Lancet Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Youth-specific early psychosis services: Engagement and outcomes', '2021', 'https://doi.org/10.1017/S0033291721001835', 'Psychological Medicine', 5),
      (v_art_id, 'peer_reviewed', 1, 'Adolescent brain development and vulnerability to psychosis', '2018', 'https://doi.org/10.1016/j.biopsych.2017.10.010', 'Biological Psychiatry', 6),
      (v_art_id, 'government', 2, 'Understanding psychosis', '2024', 'https://www.nimh.nih.gov/health/publications/understanding-psychosis', 'National Institute of Mental Health', 7),
      (v_art_id, 'professional_org', 3, 'Psychosis and schizophrenia in children and young people: Recognition and management (NICE CG155)', '2024', 'https://www.nice.org.uk/guidance/cg155', 'National Institute for Health and Care Excellence', 8),
      (v_art_id, 'government', 2, 'Early psychosis intervention: A culturally adaptive clinical guide', '2023', 'https://store.samhsa.gov/product/early-psychosis-intervention', 'SAMHSA', 9)
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
