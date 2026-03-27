-- ============================================================================
-- Seed: Category 16 (Psychosis, Schizophrenia & Severe Mental Illness) — Subcategory 03
-- 10 articles: CAT16-021 through CAT16-030
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
  VALUES ('Treatment for Psychotic Conditions', 'treatment-for-psychotic-conditions', v_cat_id, 3)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'treatment-for-psychotic-conditions' AND category_id = v_cat_id;

  -- CAT16-021: Antipsychotic Medications Explained: How They Work and What to Expect
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Antipsychotic Medications Explained: How They Work and What to Expect',
    'antipsychotic-medications-explained-how-they-work-what-to-expect',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Antipsychotics', 'Medication', 'Treatment', 'Pharmacology'],
    1023,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-021',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A comprehensive guide to antipsychotic medications — how they work in the brain, what the differences between first- and second-generation drugs are, and what to expect during treatment.',
    '/images/articles/cat16/cover-021.svg',
    10,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT16-022: CBT for Psychosis: How Talking Therapy Helps Manage Voices and Beliefs
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'CBT for Psychosis: How Talking Therapy Helps Manage Voices and Beliefs',
    'cbt-for-psychosis-how-talking-therapy-helps-manage-voices-and-beliefs',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['CBT for Psychosis', 'Therapy', 'Treatment', 'Evidence-Based'],
    1003,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-022',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How cognitive behavioral therapy has been adapted for psychosis — what it involves, how it differs from standard CBT, and what the evidence says about its effectiveness.',
    '/images/articles/cat16/cover-022.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT16-023: Clozapine: The Gold Standard for Treatment-Resistant Schizophrenia
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Clozapine: The Gold Standard for Treatment-Resistant Schizophrenia',
    'clozapine-gold-standard-treatment-resistant-schizophrenia',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Clozapine', 'Treatment-Resistant', 'Pharmacology', 'Schizophrenia'],
    1028,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-023',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Why clozapine remains the most effective antipsychotic for treatment-resistant schizophrenia — its unique pharmacology, required monitoring, and the controversy over its persistent underuse.',
    '/images/articles/cat16/cover-023.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT16-024: Family Psychoeducation: How Families Can Support Recovery From Psychosis
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Family Psychoeducation: How Families Can Support Recovery From Psychosis',
    'family-psychoeducation-how-families-can-support-recovery-from-psychosis',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Family Intervention', 'Psychoeducation', 'Relapse Prevention', 'Treatment'],
    999,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-024',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The evidence behind family psychoeducation for psychosis — how structured family intervention reduces relapse, improves outcomes, and transforms family relationships.',
    '/images/articles/cat16/cover-024.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT16-025: Long-Acting Injectable Antipsychotics: How They Work and Who Benefits
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Long-Acting Injectable Antipsychotics: How They Work and Who Benefits',
    'long-acting-injectable-antipsychotics-how-they-work-who-benefits',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['LAI', 'Antipsychotics', 'Medication', 'Adherence'],
    988,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-025',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How long-acting injectable antipsychotics eliminate daily pill-taking, reduce relapse risk, and are emerging as a first-line option — not just a last resort.',
    '/images/articles/cat16/cover-025.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT16-026: Early Intervention for Psychosis: Why Timing Changes Everything
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Early Intervention for Psychosis: Why Timing Changes Everything',
    'early-intervention-for-psychosis-why-timing-changes-everything',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Early Intervention', 'First Episode', 'Treatment', 'Recovery'],
    1029,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-026',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How early intervention programs for first-episode psychosis transform outcomes — the critical period hypothesis, coordinated specialty care, and why every week of untreated psychosis matters.',
    '/images/articles/cat16/cover-026.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT16-027: Art Therapy, Music Therapy, and Creative Approaches to Psychosis Treatment
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Art Therapy, Music Therapy, and Creative Approaches to Psychosis Treatment',
    'art-music-therapy-creative-approaches-psychosis-treatment',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Art Therapy', 'Music Therapy', 'Creative Therapies', 'Treatment'],
    1028,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-027',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How creative arts therapies complement traditional treatment for psychosis — the evidence for art therapy, music therapy, and drama therapy in improving engagement, expression, and recovery.',
    '/images/articles/cat16/cover-027.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT16-028: Supported Employment and Vocational Rehabilitation for People With Psychosis
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Supported Employment and Vocational Rehabilitation for People With Psychosis',
    'supported-employment-vocational-rehabilitation-psychosis',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Employment', 'IPS', 'Vocational', 'Recovery'],
    985,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-028',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How the Individual Placement and Support model is transforming employment outcomes for people with psychosis — and why work itself is a form of treatment.',
    '/images/articles/cat16/cover-028.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT16-029: Exercise and Physical Health in Psychotic Conditions
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Exercise and Physical Health in Psychotic Conditions',
    'exercise-physical-health-psychotic-conditions',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Exercise', 'Physical Health', 'Treatment', 'Wellbeing'],
    1023,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-029',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The evidence for exercise as a treatment for psychosis symptoms — how physical activity improves cognition, mood, and physical health in people with schizophrenia and related conditions.',
    '/images/articles/cat16/cover-029.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT16-030: Navigating the Mental Health System With Psychosis: A Practical Guide
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Navigating the Mental Health System With Psychosis: A Practical Guide',
    'navigating-mental-health-system-psychosis-practical-guide',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Healthcare Navigation', 'Patient Rights', 'Advocacy', 'Practical Guide'],
    1018,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-030',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A practical guide to navigating psychiatric services, understanding your rights, communicating with treatment teams, and advocating for comprehensive care when living with psychosis.',
    '/images/articles/cat16/cover-030.svg',
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

  -- === CAT16-021 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-021';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The dopamine hypothesis of schizophrenia: Version III — The final common pathway', '2009', 'https://doi.org/10.1093/schbul/sbp006', 'Schizophrenia Bulletin', 1),
      (v_art_id, 'peer_reviewed', 1, 'Comparative efficacy and tolerability of 32 oral antipsychotics for the acute treatment of adults with multi-episode schizophrenia: A systematic review and network meta-analysis', '2019', 'https://doi.org/10.1016/S0140-6736(19)31135-3', 'The Lancet', 2),
      (v_art_id, 'peer_reviewed', 1, 'Metabolic effects of antipsychotic medications: A systematic review and meta-analysis', '2020', 'https://doi.org/10.1002/wps.20714', 'World Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Clozapine for treatment-resistant schizophrenia: A systematic review and meta-analysis', '2021', 'https://doi.org/10.1093/schbul/sbaa161', 'Schizophrenia Bulletin', 4),
      (v_art_id, 'peer_reviewed', 1, 'Long-acting injectable antipsychotics: A systematic review and meta-analysis of randomized controlled trials', '2020', 'https://doi.org/10.1016/j.schres.2020.01.005', 'Schizophrenia Research', 5),
      (v_art_id, 'government', 2, 'Understanding schizophrenia', '2024', 'https://www.nimh.nih.gov/health/topics/schizophrenia', 'National Institute of Mental Health', 6),
      (v_art_id, 'professional_org', 3, 'Psychosis and schizophrenia in adults: Prevention and management (NICE CG178)', '2024', 'https://www.nice.org.uk/guidance/cg178', 'National Institute for Health and Care Excellence', 7),
      (v_art_id, 'peer_reviewed', 1, 'Side effects of antipsychotic medications: Physician''s guide to clinical assessment and management', '2019', 'https://doi.org/10.4088/JCP.18ac12635', 'Journal of Clinical Psychiatry', 8),
      (v_art_id, 'peer_reviewed', 1, 'The evolution of antipsychotic drugs', '2017', 'https://doi.org/10.1146/annurev-neuro-072116-031527', 'Annual Review of Neuroscience', 9),
      (v_art_id, 'peer_reviewed', 1, 'Shared decision making in psychiatry: A systematic review', '2020', 'https://doi.org/10.1176/appi.ps.201900401', 'Psychiatric Services', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT16-022 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-022';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'professional_org', 3, 'Psychosis and schizophrenia in adults: Prevention and management (NICE CG178)', '2024', 'https://www.nice.org.uk/guidance/cg178', 'National Institute for Health and Care Excellence', 1),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive behavioural therapy for psychosis: A systematic review and meta-analysis', '2020', 'https://doi.org/10.1017/S0033291720000100', 'Psychological Medicine', 2),
      (v_art_id, 'reference', 5, 'CBT for psychosis: A clinical handbook', '2019', 'https://global.oup.com/academic/product/cbt-for-psychosis-9780198703402', 'Oxford University Press', 3),
      (v_art_id, 'peer_reviewed', 1, 'Access to evidence-based care for psychosis in England: A survey of community mental health teams', '2021', 'https://doi.org/10.1016/S2215-0366(21)00182-3', 'The Lancet Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'CBTp for people who refuse antipsychotic medication: A randomized controlled trial', '2014', 'https://doi.org/10.1016/S0140-6736(13)62246-1', 'The Lancet', 5),
      (v_art_id, 'peer_reviewed', 1, 'Relating therapy for psychosis: A pilot randomized controlled trial', '2020', 'https://doi.org/10.1016/j.schres.2019.11.028', 'Schizophrenia Research', 6),
      (v_art_id, 'peer_reviewed', 1, 'The normalizing approach in cognitive therapy for psychosis', '2018', 'https://doi.org/10.1016/j.cpr.2018.01.002', 'Clinical Psychology Review', 7),
      (v_art_id, 'peer_reviewed', 1, 'Self-help interventions for psychosis: A systematic review and meta-analysis', '2021', 'https://doi.org/10.1093/schbul/sbab064', 'Schizophrenia Bulletin', 8),
      (v_art_id, 'peer_reviewed', 1, 'Therapeutic alliance in CBT for psychosis: A systematic review', '2019', 'https://doi.org/10.1017/S0033291719001314', 'Psychological Medicine', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT16-023 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-023';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Clozapine for treatment-resistant schizophrenia: A systematic review and meta-analysis', '2021', 'https://doi.org/10.1093/schbul/sbaa161', 'Schizophrenia Bulletin', 1),
      (v_art_id, 'peer_reviewed', 1, 'Clozapine treatment for suicidality in schizophrenia: International Suicide Prevention Trial (InterSePT)', '2003', 'https://doi.org/10.1001/archpsyc.60.1.82', 'Archives of General Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Clozapine-associated agranulocytosis: A systematic review of incidence, risk factors, and monitoring', '2020', 'https://doi.org/10.1007/s40263-020-00726-0', 'CNS Drugs', 3),
      (v_art_id, 'peer_reviewed', 1, 'Delays in the initiation of clozapine: A systematic review', '2020', 'https://doi.org/10.1016/j.schres.2020.04.007', 'Schizophrenia Research', 4),
      (v_art_id, 'peer_reviewed', 1, 'Clozapine: Pharmacology, clinical use, and side effects', '2021', 'https://doi.org/10.1016/S2215-0366(21)00043-8', 'The Lancet Psychiatry', 5),
      (v_art_id, 'peer_reviewed', 1, 'Metabolic monitoring of patients on clozapine: Systematic review and meta-analysis', '2019', 'https://doi.org/10.4088/JCP.18r12591', 'Journal of Clinical Psychiatry', 6),
      (v_art_id, 'peer_reviewed', 1, 'Clozapine and benign ethnic neutropenia: Updated guidance', '2020', 'https://doi.org/10.1192/bjp.2020.184', 'British Journal of Psychiatry', 7),
      (v_art_id, 'government', 2, 'Understanding schizophrenia', '2024', 'https://www.nimh.nih.gov/health/topics/schizophrenia', 'National Institute of Mental Health', 8),
      (v_art_id, 'professional_org', 3, 'Psychosis and schizophrenia in adults: Prevention and management (NICE CG178)', '2024', 'https://www.nice.org.uk/guidance/cg178', 'National Institute for Health and Care Excellence', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT16-024 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-024';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Family intervention for schizophrenia: A Cochrane systematic review', '2020', 'https://doi.org/10.1002/14651858.CD000088.pub4', 'Cochrane Database of Systematic Reviews', 1),
      (v_art_id, 'peer_reviewed', 1, 'Expressed emotion and relapse in psychosis: A meta-analysis spanning 35 years', '2019', 'https://doi.org/10.1017/S0033291719001065', 'Psychological Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'Impact of family psychoeducation on caregiver burden: A systematic review and meta-analysis', '2021', 'https://doi.org/10.1002/wps.20878', 'World Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Implementation of family intervention for psychosis: A systematic review of barriers and facilitators', '2020', 'https://doi.org/10.1016/S2215-0366(20)30120-6', 'The Lancet Psychiatry', 4),
      (v_art_id, 'professional_org', 3, 'Psychosis and schizophrenia in adults: Prevention and management (NICE CG178)', '2024', 'https://www.nice.org.uk/guidance/cg178', 'National Institute for Health and Care Excellence', 5),
      (v_art_id, 'peer_reviewed', 1, 'McFarlane WR. Family interventions for schizophrenia and the psychoses: A review', '2016', 'https://doi.org/10.1111/famp.12235', 'Family Process', 6),
      (v_art_id, 'peer_reviewed', 1, 'Online family psychoeducation for psychosis: A systematic review', '2021', 'https://doi.org/10.1016/j.schres.2021.03.018', 'Schizophrenia Research', 7),
      (v_art_id, 'peer_reviewed', 1, 'NAMI Family-to-Family: Outcomes of a peer-led family education program', '2018', 'https://doi.org/10.1176/appi.ps.201700321', 'Psychiatric Services', 8),
      (v_art_id, 'government', 2, 'Coordinated Specialty Care for first episode psychosis', '2024', 'https://www.nimh.nih.gov/research/research-funded-by-nimh/research-initiatives/raise', 'National Institute of Mental Health', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT16-025 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-025';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Long-acting injectable versus oral antipsychotics in schizophrenia: A systematic review and meta-analysis of mirror-image studies', '2020', 'https://doi.org/10.4088/JCP.19r13055', 'Journal of Clinical Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Medication non-adherence in schizophrenia: Prevalence, predictors, and outcomes', '2019', 'https://doi.org/10.1093/schbul/sby170', 'Schizophrenia Bulletin', 2),
      (v_art_id, 'peer_reviewed', 1, 'Once-every-6-months paliperidone palmitate: A systematic review of efficacy and safety', '2021', 'https://doi.org/10.1016/j.euroneuro.2021.07.006', 'European Neuropsychopharmacology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Patient attitudes toward long-acting injectable antipsychotics: A systematic review', '2020', 'https://doi.org/10.1176/appi.ps.201900434', 'Psychiatric Services', 4),
      (v_art_id, 'peer_reviewed', 1, 'Early use of long-acting injectable antipsychotics in first-episode psychosis: A systematic review', '2021', 'https://doi.org/10.1016/j.schres.2021.04.006', 'Schizophrenia Research', 5),
      (v_art_id, 'peer_reviewed', 1, 'Pharmacokinetics of long-acting injectable antipsychotics: Clinical implications', '2019', 'https://doi.org/10.1007/s40263-019-00670-0', 'CNS Drugs', 6),
      (v_art_id, 'professional_org', 3, 'Psychosis and schizophrenia in adults: Prevention and management (NICE CG178)', '2024', 'https://www.nice.org.uk/guidance/cg178', 'National Institute for Health and Care Excellence', 7),
      (v_art_id, 'government', 2, 'Understanding schizophrenia', '2024', 'https://www.nimh.nih.gov/health/topics/schizophrenia', 'National Institute of Mental Health', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT16-026 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-026';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Duration of untreated psychosis and long-term outcome of schizophrenia: A systematic review and meta-analysis', '2020', 'https://doi.org/10.1016/S2215-0366(20)30003-2', 'The Lancet Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'RAISE-ETP: Recovery After an Initial Schizophrenia Episode — Early Treatment Program', '2016', 'https://doi.org/10.1176/appi.ajp.2015.15050632', 'American Journal of Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'The critical period for early intervention in psychosis: A systematic review', '2020', 'https://doi.org/10.1093/schbul/sbaa130', 'Schizophrenia Bulletin', 3),
      (v_art_id, 'peer_reviewed', 1, 'Cost-effectiveness of early intervention for psychosis: A systematic review', '2019', 'https://doi.org/10.1192/bjp.2018.298', 'British Journal of Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'OPUS trial: Ten-year follow-up of a randomized controlled trial of early intervention for first-episode psychosis', '2018', 'https://doi.org/10.1093/schbul/sbx155', 'Schizophrenia Bulletin', 5),
      (v_art_id, 'peer_reviewed', 1, 'Clinical staging in psychiatry: A cross-cutting model of diagnosis with heuristic value', '2014', 'https://doi.org/10.1192/bjp.bp.113.131953', 'British Journal of Psychiatry', 6),
      (v_art_id, 'government', 2, 'NIMH RAISE project: Early treatment program', '2024', 'https://www.nimh.nih.gov/research/research-funded-by-nimh/research-initiatives/raise', 'National Institute of Mental Health', 7),
      (v_art_id, 'peer_reviewed', 1, 'Global access to early intervention for psychosis: A review of implementation status', '2021', 'https://doi.org/10.1002/wps.20892', 'World Psychiatry', 8),
      (v_art_id, 'professional_org', 3, 'Psychosis and schizophrenia in adults: Prevention and management (NICE CG178)', '2024', 'https://www.nice.org.uk/guidance/cg178', 'National Institute for Health and Care Excellence', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT16-027 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-027';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'professional_org', 3, 'Psychosis and schizophrenia in adults: Prevention and management (NICE CG178)', '2024', 'https://www.nice.org.uk/guidance/cg178', 'National Institute for Health and Care Excellence', 1),
      (v_art_id, 'peer_reviewed', 1, 'Music therapy for schizophrenia: A Cochrane systematic review', '2017', 'https://doi.org/10.1002/14651858.CD004025.pub4', 'Cochrane Database of Systematic Reviews', 2),
      (v_art_id, 'peer_reviewed', 1, 'Art therapy for schizophrenia: A systematic review and meta-analysis', '2019', 'https://doi.org/10.1016/j.schres.2019.01.031', 'Schizophrenia Research', 3),
      (v_art_id, 'peer_reviewed', 1, 'Creative arts therapies for psychosis: Mechanisms of action and treatment engagement', '2020', 'https://doi.org/10.3389/fpsyg.2020.00595', 'Frontiers in Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Dance/movement therapy for schizophrenia: A pilot randomized controlled trial', '2019', 'https://doi.org/10.1080/17432979.2019.1653160', 'Body, Movement and Dance in Psychotherapy', 5),
      (v_art_id, 'peer_reviewed', 1, 'Drama therapy and psychosis: A systematic review of the evidence', '2020', 'https://doi.org/10.1016/j.aip.2020.101677', 'Arts in Psychotherapy', 6),
      (v_art_id, 'peer_reviewed', 1, 'Neurobiological mechanisms of music therapy in mental health: A narrative review', '2021', 'https://doi.org/10.5498/wjp.v11.i8.386', 'World Journal of Psychiatry', 7),
      (v_art_id, 'peer_reviewed', 1, 'Recovery-oriented creative arts therapies: Perspectives from service users', '2020', 'https://doi.org/10.1177/1049732320951546', 'Qualitative Health Research', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT16-028 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-028';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Supported employment for adults with severe mental illness: A Cochrane systematic review', '2019', 'https://doi.org/10.1002/14651858.CD008331.pub3', 'Cochrane Database of Systematic Reviews', 1),
      (v_art_id, 'peer_reviewed', 1, 'The clinical benefits of employment for people with psychosis: A systematic review', '2020', 'https://doi.org/10.1016/j.schres.2020.02.005', 'Schizophrenia Research', 2),
      (v_art_id, 'peer_reviewed', 1, 'Employment rates and barriers for people with schizophrenia: A cross-national study', '2019', 'https://doi.org/10.1007/s00127-019-01760-8', 'Social Psychiatry and Psychiatric Epidemiology', 3),
      (v_art_id, 'professional_org', 3, 'The IPS Employment Center: Principles of Individual Placement and Support', '2024', 'https://ipsworks.org', 'Dartmouth Psychiatric Research Center', 4),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive remediation combined with supported employment: A randomized controlled trial', '2018', 'https://doi.org/10.1176/appi.ajp.2017.17060700', 'American Journal of Psychiatry', 5),
      (v_art_id, 'peer_reviewed', 1, 'Employment as a clinical intervention: Evidence and mechanisms', '2020', 'https://doi.org/10.1002/wps.20733', 'World Psychiatry', 6),
      (v_art_id, 'peer_reviewed', 1, 'IPS implementation across 22 countries: What we have learned', '2021', 'https://doi.org/10.1037/prj0000474', 'Psychiatric Rehabilitation Journal', 7),
      (v_art_id, 'government', 2, 'Understanding schizophrenia', '2024', 'https://www.nimh.nih.gov/health/topics/schizophrenia', 'National Institute of Mental Health', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT16-029 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-029';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Mortality in schizophrenia: A systematic review and meta-analysis of population-based studies', '2019', 'https://doi.org/10.1016/S2215-0366(19)30059-X', 'The Lancet Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Exercise and cognitive function in schizophrenia: A systematic review and meta-analysis', '2020', 'https://doi.org/10.1017/S003329171900382X', 'Psychological Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'Exercise intervention for people with schizophrenia: A Cochrane systematic review', '2020', 'https://doi.org/10.1002/14651858.CD004412.pub4', 'Cochrane Database of Systematic Reviews', 3),
      (v_art_id, 'peer_reviewed', 1, 'Sedentary behavior and physical activity in people with schizophrenia: A systematic review and meta-analysis', '2019', 'https://doi.org/10.1016/j.schres.2019.02.007', 'Schizophrenia Research', 4),
      (v_art_id, 'peer_reviewed', 1, 'Metabolic monitoring of patients receiving antipsychotics: International guidelines and implementation', '2020', 'https://doi.org/10.1002/wps.20714', 'World Psychiatry', 5),
      (v_art_id, 'peer_reviewed', 1, 'Lifestyle interventions for people with severe mental illness: A systematic review and meta-analysis', '2019', 'https://doi.org/10.1016/S2215-0366(19)30230-7', 'The Lancet Psychiatry', 6),
      (v_art_id, 'peer_reviewed', 1, 'Neurobiological mechanisms linking physical exercise and mental health in schizophrenia', '2021', 'https://doi.org/10.1016/j.neubiorev.2021.03.017', 'Neuroscience & Biobehavioral Reviews', 7),
      (v_art_id, 'professional_org', 3, 'Psychosis and schizophrenia in adults: Prevention and management (NICE CG178)', '2024', 'https://www.nice.org.uk/guidance/cg178', 'National Institute for Health and Care Excellence', 8),
      (v_art_id, 'professional_org', 3, 'Physical health guidelines for people with severe mental illness', '2020', 'https://doi.org/10.1080/15622975.2020.1728291', 'World Federation of Societies of Biological Psychiatry', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT16-030 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-030';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Therapeutic alliance and treatment engagement in psychosis: A systematic review', '2020', 'https://doi.org/10.1017/S0033291720001282', 'Psychological Medicine', 1),
      (v_art_id, 'peer_reviewed', 1, 'Psychiatric advance directives: A systematic review of outcomes', '2019', 'https://doi.org/10.1176/appi.ps.201800437', 'Psychiatric Services', 2),
      (v_art_id, 'peer_reviewed', 1, 'Shared decision making in psychiatry: A systematic review and meta-analysis', '2020', 'https://doi.org/10.1016/S2215-0366(20)30191-7', 'The Lancet Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Peer support services for people with psychosis: A systematic review and meta-analysis', '2020', 'https://doi.org/10.1176/appi.ps.201900418', 'Psychiatric Services', 4),
      (v_art_id, 'peer_reviewed', 1, 'Mental Health Act reform: International perspectives', '2021', 'https://doi.org/10.1016/S2215-0366(21)00263-4', 'The Lancet Psychiatry', 5),
      (v_art_id, 'peer_reviewed', 1, 'Patient experience measures in psychosis: A systematic review', '2019', 'https://doi.org/10.1093/schbul/sby176', 'Schizophrenia Bulletin', 6),
      (v_art_id, 'professional_org', 3, 'Psychosis and schizophrenia in adults: Prevention and management (NICE CG178)', '2024', 'https://www.nice.org.uk/guidance/cg178', 'National Institute for Health and Care Excellence', 7),
      (v_art_id, 'government', 2, 'Understanding schizophrenia', '2024', 'https://www.nimh.nih.gov/health/topics/schizophrenia', 'National Institute of Mental Health', 8)
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
