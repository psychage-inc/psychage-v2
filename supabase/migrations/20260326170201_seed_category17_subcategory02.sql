-- ============================================================================
-- Seed: Category 17 (Aging, Dementia & Late-Life Mental Health) — Subcategory 02
-- 10 articles: CAT17-011 through CAT17-020
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert Category if not present
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  'Aging, Dementia & Late-Life Mental Health',
  'aging-dementia-late-life',
  'Comprehensive resources on mental health challenges unique to older adults, including dementia, Alzheimer disease, late-life depression, cognitive decline, caregiving, and strategies for healthy aging.',
  'Clock',
  17,
  55,
  '#D97706'
)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------------------
-- 2. Insert Subcategory
-- ---------------------------------------------------------------------------

DO $$
DECLARE
  v_cat_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'aging-dementia-late-life';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Dementia and Alzheimer Disease', 'dementia-and-alzheimer-disease', v_cat_id, 2)
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'aging-dementia-late-life';
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'dementia-and-alzheimer-disease' AND category_id = v_cat_id;

  -- CAT17-011: What Is Dementia? Types, Causes, and Progression
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'What Is Dementia? Types, Causes, and Progression',
    'what-is-dementia-types-causes-and-progression',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Dementia', 'Alzheimer', 'Cognitive Decline', 'Neurology'],
    954,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-011',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand dementia as an umbrella term for cognitive decline--from Alzheimer disease to vascular dementia to Lewy body disease.',
    '/images/articles/cat17/cover-011.svg',
    8,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT17-012: Alzheimer Disease: Brain Changes, Symptoms, and Stages
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Alzheimer Disease: Brain Changes, Symptoms, and Stages',
    'alzheimer-disease-brain-changes-symptoms-and-stages',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Alzheimer', 'Neurobiology', 'Biomarkers', 'Diagnosis'],
    950,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-012',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Deep dive into the biology of Alzheimer--from amyloid plaques and tau tangles to symptom progression and diagnostic advances.',
    '/images/articles/cat17/cover-012.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT17-013: Treatment and Management of Alzheimer Disease
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Treatment and Management of Alzheimer Disease',
    'treatment-and-management-of-alzheimer-disease',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Alzheimer', 'Treatment', 'Medications', 'Care Management'],
    986,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-013',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Review current medications, emerging therapies, and comprehensive care strategies for Alzheimer--from cholinesterase inhibitors to lifestyle interventions.',
    '/images/articles/cat17/cover-013.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT17-014: Vascular Dementia, Lewy Body, and Other Types
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Vascular Dementia, Lewy Body, and Other Types',
    'vascular-dementia-lewy-body-and-other-types',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Vascular Dementia', 'Lewy Body', 'Frontotemporal Dementia', 'Neurology'],
    973,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-014',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore non-Alzheimer dementias--from vascular dementia caused by strokes to Lewy body dementia with hallucinations and frontotemporal dementia.',
    '/images/articles/cat17/cover-014.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT17-015: Risk Factors and Prevention of Dementia
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Risk Factors and Prevention of Dementia',
    'risk-factors-and-prevention-of-dementia',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Prevention', 'Risk Factors', 'Lifestyle', 'Cognitive Reserve'],
    968,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-015',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Identify modifiable risk factors for dementia and evidence-based strategies to reduce risk--from cardiovascular health to cognitive reserve.',
    '/images/articles/cat17/cover-015.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT17-016: Medication Management for Late-Life Depression and Anxiety
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Medication Management for Late-Life Depression and Anxiety',
    'medication-management-for-late-life-depression-and-anxiety',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Medication', 'Antidepressants', 'SSRIs', 'Drug Interactions'],
    962,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-016',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Navigate the complexities of psychiatric medications in older adults--from SSRIs to drug interactions, side effects, and deprescribing.',
    '/images/articles/cat17/cover-016.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT17-017: Psychotherapy for Late-Life Depression and Anxiety
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Psychotherapy for Late-Life Depression and Anxiety',
    'psychotherapy-for-late-life-depression-and-anxiety',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Psychotherapy', 'CBT', 'Therapy', 'Counseling'],
    951,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-017',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Evidence-based talk therapies for older adults--from CBT and problem-solving therapy to life review and interpersonal therapy.',
    '/images/articles/cat17/cover-017.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT17-018: Depression and Chronic Illness in Older Adults
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Depression and Chronic Illness in Older Adults',
    'depression-and-chronic-illness-in-older-adults',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Chronic Illness', 'Comorbidity', 'Medical Conditions', 'Heart Disease'],
    951,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-018',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the bidirectional relationship between depression and medical conditions--from heart disease to diabetes to cancer.',
    '/images/articles/cat17/cover-018.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT17-019: Social Determinants of Late-Life Depression and Anxiety
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Social Determinants of Late-Life Depression and Anxiety',
    'social-determinants-of-late-life-depression-and-anxiety',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Social Determinants', 'Health Equity', 'Poverty', 'Isolation'],
    958,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-019',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Examine how poverty, housing, food insecurity, transportation, and social isolation drive mental health disparities in older adults.',
    '/images/articles/cat17/cover-019.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT17-020: Family Caregiving: Depression and Burden
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Family Caregiving: Depression and Burden',
    'family-caregiving-depression-and-burden',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Caregiving', 'Caregiver Burden', 'Burnout', 'Family Support'],
    958,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-020',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand caregiver burnout, depression, and strategies for self-care while caring for loved ones with dementia or chronic illness.',
    '/images/articles/cat17/cover-020.svg',
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

  -- === CAT17-011 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-011';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'government', 2, 'World Health Organization (2023). Global status report on the public health response to dementia.', '2023', 'https://www.who.int/publications/i/item/9789240033245', 'World Health Organization', 1),
      (v_art_id, 'professional_org', 3, 'Alzheimer''s Association (2024). 2024 Alzheimer''s disease facts and figures. Alzheimer''s & Dementia, 20(5), 3708-3821.', '2024', 'https://doi.org/10.1002/alz.13809', 'Alzheimer''s & Dementia', 2),
      (v_art_id, 'peer_reviewed', 1, 'Plassman et al. (2007). Prevalence of dementia in the United States: The Aging, Demographics, and Memory Study. Neuroepidemiology, 29(1-2), 125-132.', '2007', 'https://doi.org/10.1159/000109998', 'Neuroepidemiology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Livingston et al. (2020). Dementia prevention, intervention, and care: 2020 report of the Lancet Commission. The Lancet, 396(10248), 413-446.', '2020', 'https://doi.org/10.1016/S0140-6736(20)30367-6', 'The Lancet', 4),
      (v_art_id, 'government', 2, 'National Institute on Aging (2023). What Is Dementia? Symptoms, Types, and Diagnosis.', '2023', 'https://www.nia.nih.gov/health/alzheimers-and-dementia/what-dementia', 'National Institute on Aging', 5),
      (v_art_id, 'clinical_guideline', 4, 'McKhann et al. (2011). The diagnosis of dementia due to Alzheimer disease: Recommendations from the NIA-Alzheimer Association workgroups. Alzheimer''s & Dementia, 7(3), 263-269.', '2011', 'https://doi.org/10.1016/j.jalz.2011.03.005', 'Alzheimer''s & Dementia', 6),
      (v_art_id, 'clinical_guideline', 4, 'Petersen et al. (2018). Practice guideline update summary: Mild cognitive impairment. Neurology, 90(3), 126-135.', '2018', 'https://doi.org/10.1212/WNL.0000000000004826', 'Neurology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Knopman et al. (2021). Alzheimer disease. Nature Reviews Disease Primers, 7(1), 33.', '2021', 'https://doi.org/10.1038/s41572-021-00269-y', 'Nature Reviews Disease Primers', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT17-012 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-012';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'clinical_guideline', 4, 'Jack et al. (2018). NIA-AA Research Framework: Toward a biological definition of Alzheimer''s disease. Alzheimer''s & Dementia, 14(4), 535-562.', '2018', 'https://doi.org/10.1016/j.jalz.2018.02.018', 'Alzheimer''s & Dementia', 1),
      (v_art_id, 'peer_reviewed', 1, 'Knopman et al. (2021). Alzheimer disease. Nature Reviews Disease Primers, 7(1), 33.', '2021', 'https://doi.org/10.1038/s41572-021-00269-y', 'Nature Reviews Disease Primers', 2),
      (v_art_id, 'peer_reviewed', 1, 'Braak & Braak (1991). Neuropathological stageing of Alzheimer-related changes. Acta Neuropathologica, 82(4), 239-259.', '1991', 'https://doi.org/10.1007/BF00308809', 'Acta Neuropathologica', 3),
      (v_art_id, 'professional_org', 3, 'Alzheimer''s Association (2024). 2024 Alzheimer''s disease facts and figures. Alzheimer''s & Dementia, 20(5), 3708-3821.', '2024', 'https://doi.org/10.1002/alz.13809', 'Alzheimer''s & Dementia', 4),
      (v_art_id, 'peer_reviewed', 1, 'Scheltens et al. (2021). Alzheimer''s disease. The Lancet, 397(10284), 1577-1590.', '2021', 'https://doi.org/10.1016/S0140-6736(20)32205-4', 'The Lancet', 5),
      (v_art_id, 'clinical_guideline', 4, 'McKhann et al. (2011). The diagnosis of dementia due to Alzheimer disease. Alzheimer''s & Dementia, 7(3), 263-269.', '2011', 'https://doi.org/10.1016/j.jalz.2011.03.005', 'Alzheimer''s & Dementia', 6),
      (v_art_id, 'clinical_guideline', 4, 'Hansson et al. (2022). The Alzheimer''s Association appropriate use recommendations for blood biomarkers. Alzheimer''s & Dementia, 18(12), 2669-2686.', '2022', 'https://doi.org/10.1002/alz.12756', 'Alzheimer''s & Dementia', 7),
      (v_art_id, 'government', 2, 'National Institute on Aging (2023). Alzheimer''s Disease Fact Sheet.', '2023', 'https://www.nia.nih.gov/health/alzheimers-and-dementia/alzheimers-disease-fact-sheet', 'National Institute on Aging', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT17-013 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-013';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Birks & Harvey (2018). Donepezil for dementia due to Alzheimer disease. Cochrane Database of Systematic Reviews, 6(6), CD001190.', '2018', 'https://doi.org/10.1002/14651858.CD001190.pub3', 'Cochrane Database of Systematic Reviews', 1),
      (v_art_id, 'peer_reviewed', 1, 'Erickson et al. (2011). Exercise training increases size of hippocampus and improves memory. PNAS, 108(7), 3017-3022.', '2011', 'https://doi.org/10.1073/pnas.1015950108', 'PNAS', 2),
      (v_art_id, 'peer_reviewed', 1, 'van Dyck et al. (2023). Lecanemab in early Alzheimer disease. New England Journal of Medicine, 388(1), 9-21.', '2023', 'https://doi.org/10.1056/NEJMoa2212948', 'New England Journal of Medicine', 3),
      (v_art_id, 'peer_reviewed', 1, 'Livingston et al. (2020). Dementia prevention, intervention, and care: 2020 report of the Lancet Commission. The Lancet, 396(10248), 413-446.', '2020', 'https://doi.org/10.1016/S0140-6736(20)30367-6', 'The Lancet', 4),
      (v_art_id, 'clinical_guideline', 4, 'Reus et al. (2016). The American Psychiatric Association practice guideline on the use of antipsychotics to treat agitation or psychosis in patients with dementia. American Journal of Psychiatry, 173(5), 543-546.', '2016', 'https://doi.org/10.1176/appi.ajp.2015.173501', 'American Journal of Psychiatry', 5),
      (v_art_id, 'peer_reviewed', 1, 'Schneider et al. (2006). Effectiveness of atypical antipsychotic drugs in patients with Alzheimer disease. New England Journal of Medicine, 355(15), 1525-1538.', '2006', 'https://doi.org/10.1056/NEJMoa061240', 'New England Journal of Medicine', 6),
      (v_art_id, 'peer_reviewed', 1, 'Brodaty & Arasaratnam (2012). Meta-analysis of nonpharmacological interventions for neuropsychiatric symptoms of dementia. American Journal of Psychiatry, 169(9), 946-953.', '2012', 'https://doi.org/10.1176/appi.ajp.2012.11101529', 'American Journal of Psychiatry', 7),
      (v_art_id, 'professional_org', 3, 'Alzheimer''s Association (2024). 2024 Alzheimer''s disease facts and figures. Alzheimer''s & Dementia, 20(5), 3708-3821.', '2024', 'https://doi.org/10.1002/alz.13809', 'Alzheimer''s & Dementia', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT17-014 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-014';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Iadecola (2013). The pathobiology of vascular dementia. Neuron, 80(4), 844-866.', '2013', 'https://doi.org/10.1016/j.neuron.2013.10.008', 'Neuron', 1),
      (v_art_id, 'clinical_guideline', 4, 'McKeith et al. (2017). Diagnosis and management of dementia with Lewy bodies. Neurology, 89(1), 88-100.', '2017', 'https://doi.org/10.1212/WNL.0000000000004058', 'Neurology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Bang et al. (2015). Frontotemporal dementia. The Lancet, 386(10004), 1672-1682.', '2015', 'https://doi.org/10.1016/S0140-6736(15)00461-4', 'The Lancet', 3),
      (v_art_id, 'peer_reviewed', 1, 'Jellinger & Attems (2007). Neuropathological evaluation of mixed dementia. Journal of the Neurological Sciences, 257(1-2), 80-87.', '2007', 'https://doi.org/10.1016/j.jns.2007.01.045', 'Journal of the Neurological Sciences', 4),
      (v_art_id, 'clinical_guideline', 4, 'Gorelick et al. (2011). Vascular contributions to cognitive impairment and dementia. Stroke, 42(9), 2672-2713.', '2011', 'https://doi.org/10.1161/STR.0b013e3182299496', 'Stroke', 5),
      (v_art_id, 'peer_reviewed', 1, 'Gomperts (2016). Lewy body dementias: Dementia with Lewy bodies and Parkinson disease dementia. Continuum, 22(2), 435-463.', '2016', 'https://doi.org/10.1212/CON.0000000000000309', 'Continuum', 6),
      (v_art_id, 'peer_reviewed', 1, 'Rabinovici & Miller (2010). Frontotemporal lobar degeneration. CNS Drugs, 24(5), 375-398.', '2010', 'https://doi.org/10.2165/11533100-000000000-00000', 'CNS Drugs', 7),
      (v_art_id, 'professional_org', 3, 'Alzheimer''s Association (2024). 2024 Alzheimer''s disease facts and figures. Alzheimer''s & Dementia, 20(5), 3708-3821.', '2024', 'https://doi.org/10.1002/alz.13809', 'Alzheimer''s & Dementia', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT17-015 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-015';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Livingston et al. (2020). Dementia prevention, intervention, and care: 2020 report of the Lancet Commission. The Lancet, 396(10248), 413-446.', '2020', 'https://doi.org/10.1016/S0140-6736(20)30367-6', 'The Lancet', 1),
      (v_art_id, 'peer_reviewed', 1, 'Hörder et al. (2018). Midlife cardiovascular fitness and dementia: A 44-year longitudinal study. Annals of Internal Medicine, 168(11), 758-766.', '2018', 'https://doi.org/10.7326/M17-1974', 'Annals of Internal Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'Stern (2012). Cognitive reserve in ageing and Alzheimer disease. The Lancet Neurology, 11(11), 1006-1012.', '2012', 'https://doi.org/10.1016/S1474-4422(12)70191-6', 'The Lancet Neurology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Ngandu et al. (2015). A 2-year multidomain intervention of diet, exercise, cognitive training, and vascular risk monitoring versus control to prevent cognitive decline (FINGER). The Lancet, 385(9984), 2255-2263.', '2015', 'https://doi.org/10.1016/S0140-6736(15)60461-5', 'The Lancet', 4),
      (v_art_id, 'peer_reviewed', 1, 'Scarmeas et al. (2006). Mediterranean diet and risk for Alzheimer disease. Annals of Neurology, 59(6), 912-921.', '2006', 'https://doi.org/10.1002/ana.20854', 'Annals of Neurology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Loughrey et al. (2018). Association of age-related hearing loss with cognitive function, cognitive impairment, and dementia. JAMA Otolaryngology--Head & Neck Surgery, 144(2), 115-126.', '2018', 'https://doi.org/10.1001/jamaoto.2017.2513', 'JAMA Otolaryngology--Head & Neck Surgery', 6),
      (v_art_id, 'peer_reviewed', 1, 'Xu et al. (2017). Education and risk of dementia: Dose-response meta-analysis. Neurology, 89(16), 1694-1701.', '2017', 'https://doi.org/10.1212/WNL.0000000000004510', 'Neurology', 7),
      (v_art_id, 'government', 2, 'National Institute on Aging (2023). Preventing Alzheimer Disease: What Do We Know?', '2023', 'https://www.nia.nih.gov/health/alzheimers-and-dementia/preventing-alzheimers-disease-what-do-we-know', 'National Institute on Aging', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT17-016 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-016';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Nelson et al. (2008). A randomized controlled trial of filotherapy for late-life depression. American Journal of Geriatric Psychiatry, 16(9), 711-719.', '2008', 'https://doi.org/10.1097/JGP.0b013e3181784898', 'American Journal of Geriatric Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Klotz (2009). Pharmacokinetics and drug metabolism in the elderly. Drug Metabolism Reviews, 41(2), 67-76.', '2009', 'https://doi.org/10.1080/03602530902722679', 'Drug Metabolism Reviews', 2),
      (v_art_id, 'peer_reviewed', 1, 'Masnoon et al. (2017). What is polypharmacy? A systematic review. BMC Geriatrics, 17(1), 230.', '2017', 'https://doi.org/10.1186/s12877-017-0621-2', 'BMC Geriatrics', 3),
      (v_art_id, 'peer_reviewed', 1, 'Billioti de Gage et al. (2012). Benzodiazepine use and risk of dementia. BMJ, 345, e6231.', '2012', 'https://doi.org/10.1136/bmj.e6231', 'BMJ', 4),
      (v_art_id, 'clinical_guideline', 4, 'American Geriatrics Society (2019). Updated Beers Criteria for Potentially Inappropriate Medication Use in Older Adults.', '2019', 'https://doi.org/10.1111/jgs.15767', 'Journal of the American Geriatrics Society', 5),
      (v_art_id, 'peer_reviewed', 1, 'Coupland et al. (2011). Antidepressant use and risk of adverse outcomes in older people. BMJ, 343, d4551.', '2011', 'https://doi.org/10.1136/bmj.d4551', 'BMJ', 6),
      (v_art_id, 'peer_reviewed', 1, 'Gnjidic et al. (2012). Polypharmacy cutoff and outcomes: Five or more medicines were used. Journal of Clinical Epidemiology, 65(9), 989-995.', '2012', 'https://doi.org/10.1016/j.jclinepi.2012.02.018', 'Journal of Clinical Epidemiology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Reeve et al. (2017). Review of deprescribing processes and development of an evidence-based approach. Pharmacy, 5(1), 17.', '2017', 'https://doi.org/10.3390/pharmacy5010017', 'Pharmacy', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT17-017 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-017';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Arean et al. (2010). Problem-solving therapy and supportive therapy in older adults with major depression and executive dysfunction. American Journal of Psychiatry, 167(11), 1391-1398.', '2010', 'https://doi.org/10.1176/appi.ajp.2010.09091327', 'American Journal of Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Reynolds et al. (2006). Maintenance treatment of major depression in old age. New England Journal of Medicine, 354(11), 1130-1138.', '2006', 'https://doi.org/10.1056/NEJMoa052619', 'New England Journal of Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'Lenze et al. (2005). Combined pharmacotherapy and psychotherapy as maintenance treatment for late-life depression. American Journal of Psychiatry, 162(11), 2124-2129.', '2005', 'https://doi.org/10.1176/appi.ajp.162.11.2124', 'American Journal of Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Cuijpers et al. (2009). The efficacy of psychotherapy and pharmacotherapy in treating depressive and anxiety disorders: A meta-analysis. World Psychiatry, 8(2), 73-80.', '2009', 'https://doi.org/10.1002/j.2051-5545.2009.tb00228.x', 'World Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Serfaty et al. (2009). Clinical effectiveness of individual cognitive behavioral therapy for depressed older people in primary care. Archives of General Psychiatry, 66(12), 1332-1340.', '2009', 'https://doi.org/10.1001/archgenpsychiatry.2009.165', 'Archives of General Psychiatry', 5),
      (v_art_id, 'peer_reviewed', 1, 'Wetherell et al. (2013). Cognitive-behavioral therapy for late-life generalized anxiety disorder. Behavior Therapy, 44(2), 302-316.', '2013', 'https://doi.org/10.1016/j.beth.2012.10.005', 'Behavior Therapy', 6),
      (v_art_id, 'peer_reviewed', 1, 'Hsieh & Wang (2003). Effect of reminiscence therapy on depression in older adults: A systematic review. International Journal of Nursing Studies, 40(4), 335-345.', '2003', 'https://doi.org/10.1016/S0020-7489(02)00101-3', 'International Journal of Nursing Studies', 7),
      (v_art_id, 'peer_reviewed', 1, 'Teri et al. (1997). Treatment of depression in Alzheimer disease. Archives of Neurology, 54(11), 1349-1355.', '1997', 'https://doi.org/10.1001/archneur.1997.00550230035009', 'Archives of Neurology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT17-018 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-018';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'clinical_guideline', 4, 'Lichtman et al. (2014). Depression and coronary heart disease: AHA scientific statement. Circulation, 129(12), 1350-1369.', '2014', 'https://doi.org/10.1161/CIR.0000000000000019', 'Circulation', 1),
      (v_art_id, 'peer_reviewed', 1, 'Anderson et al. (2001). The prevalence of comorbid depression in adults with diabetes. Diabetes Care, 24(6), 1069-1078.', '2001', 'https://doi.org/10.2337/diacare.24.6.1069', 'Diabetes Care', 2),
      (v_art_id, 'peer_reviewed', 1, 'Robinson & Jorge (2016). Post-stroke depression: A review. American Journal of Psychiatry, 173(3), 221-231.', '2016', 'https://doi.org/10.1176/appi.ajp.2015.15030363', 'American Journal of Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Katon et al. (2010). Collaborative care for patients with depression and chronic illnesses. New England Journal of Medicine, 363(27), 2611-2620.', '2010', 'https://doi.org/10.1056/NEJMoa1003955', 'New England Journal of Medicine', 4),
      (v_art_id, 'peer_reviewed', 1, 'Egede & Ellis (2010). Diabetes and depression: Global perspectives. Diabetes Research and Clinical Practice, 87(3), 302-312.', '2010', 'https://doi.org/10.1016/j.diabres.2010.01.024', 'Diabetes Research and Clinical Practice', 5),
      (v_art_id, 'peer_reviewed', 1, 'Mitchell et al. (2011). Prevalence of depression, anxiety, and adjustment disorder in oncological settings. The Lancet Oncology, 12(2), 160-174.', '2011', 'https://doi.org/10.1016/S1470-2045(11)70002-X', 'The Lancet Oncology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Yohannes et al. (2010). Depression and anxiety in patients with COPD. European Respiratory Review, 19(116), 213-219.', '2010', 'https://doi.org/10.1183/09059180.00007609', 'European Respiratory Review', 7),
      (v_art_id, 'peer_reviewed', 1, 'Reijnders et al. (2008). A systematic review of prevalence studies of depression in Parkinson disease. Movement Disorders, 23(2), 183-189.', '2008', 'https://doi.org/10.1002/mds.21803', 'Movement Disorders', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT17-019 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-019';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Vega et al. (2017). Research on U.S. Latino aging: A roadmap. The Gerontologist, 57(2), 186-196.', '2017', 'https://doi.org/10.1093/geront/gnw189', 'The Gerontologist', 1),
      (v_art_id, 'peer_reviewed', 1, 'Holt-Lunstad et al. (2015). Loneliness and social isolation as risk factors for mortality. Perspectives on Psychological Science, 10(2), 227-237.', '2015', 'https://doi.org/10.1177/1745691614568352', 'Perspectives on Psychological Science', 2),
      (v_art_id, 'peer_reviewed', 1, 'Gundersen & Ziliak (2015). Food insecurity and health outcomes. Health Affairs, 34(11), 1830-1839.', '2015', 'https://doi.org/10.1377/hlthaff.2015.0645', 'Health Affairs', 3),
      (v_art_id, 'peer_reviewed', 1, 'Jimenez et al. (2013). Disparities in depression treatment among racial and ethnic minorities. Psychiatric Services, 64(3), 238-245.', '2013', 'https://doi.org/10.1176/appi.ps.201200364', 'Psychiatric Services', 4),
      (v_art_id, 'clinical_guideline', 4, 'Marmot et al. (2012). WHO Commission on Social Determinants of Health. The Lancet, 380(9844), 1011-1029.', '2012', 'https://doi.org/10.1016/S0140-6736(12)61385-3', 'The Lancet', 5),
      (v_art_id, 'peer_reviewed', 1, 'Blazer et al. (1991). The association of age and depression among the elderly. Journal of Gerontology, 46(6), M210-M215.', '1991', 'https://doi.org/10.1093/geronj/46.6.M210', 'Journal of Gerontology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Locher et al. (2005). Social isolation, support, and capital and nutritional risk in an older sample. Social Science & Medicine, 60(4), 747-761.', '2005', 'https://doi.org/10.1016/j.socscimed.2004.06.023', 'Social Science & Medicine', 7),
      (v_art_id, 'peer_reviewed', 1, 'Alegría et al. (2008). Dispari ties in depression treatment in racial and ethnic minority populations in the United States. Psychiatric Services, 59(11), 1264-1272.', '2008', 'https://doi.org/10.1176/ps.2008.59.11.1264', 'Psychiatric Services', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT17-020 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-020';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Schulz & Martire (2004). Family caregiving of persons with dementia. American Journal of Geriatric Psychiatry, 12(3), 240-249.', '2004', 'https://doi.org/10.1097/00019442-200405000-00002', 'American Journal of Geriatric Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Schulz & Beach (1999). Caregiving as a risk factor for mortality. JAMA, 282(23), 2215-2219.', '1999', 'https://doi.org/10.1001/jama.282.23.2215', 'JAMA', 2),
      (v_art_id, 'peer_reviewed', 1, 'Gaugler et al. (2003). Adult day service use and reductions in caregiving hours. International Journal of Geriatric Psychiatry, 18(1), 55-62.', '2003', 'https://doi.org/10.1002/gps.772', 'International Journal of Geriatric Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Sörensen et al. (2002). Dementia care: Mental health effects, intervention strategies, and clinical implications. The Gerontologist, 42(3), 356-372.', '2002', 'https://doi.org/10.1093/geront/42.3.356', 'The Gerontologist', 4),
      (v_art_id, 'peer_reviewed', 1, 'Pinquart & Sörensen (2003). Differences between caregivers and noncaregivers in psychological health and physical health: A meta-analysis. Psychology and Aging, 18(2), 250-267.', '2003', 'https://doi.org/10.1037/0882-7974.18.2.250', 'Psychology and Aging', 5),
      (v_art_id, 'peer_reviewed', 1, 'Mittelman et al. (2006). A family intervention to delay nursing home placement of patients with Alzheimer disease. JAMA, 295(18), 2148-2157.', '2006', 'https://doi.org/10.1001/jama.295.18.2148', 'JAMA', 6),
      (v_art_id, 'peer_reviewed', 1, 'Etters et al. (2008). Caregiver burden among dementia patient caregivers. International Journal of Geriatric Psychiatry, 23(10), 1013-1018.', '2008', 'https://doi.org/10.1002/gps.2020', 'International Journal of Geriatric Psychiatry', 7),
      (v_art_id, 'professional_org', 3, 'National Alliance for Caregiving (2020). Caregiving in the U.S. 2020 Report.', '2020', 'https://www.caregiving.org/caregiving-in-the-us-2020/', 'National Alliance for Caregiving', 8)
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
  WHERE a.article_production_id LIKE 'CAT17-%';

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;
