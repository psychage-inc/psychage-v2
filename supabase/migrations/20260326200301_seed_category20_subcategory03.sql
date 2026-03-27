-- ============================================================================
-- Seed: Category 20 (Chronic Illness, Pain & Medical Psychology) — Subcategory 03
-- 10 articles: CAT20-021 through CAT20-030
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert Category if not present
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  'Chronic Illness, Pain & Medical Psychology',
  'chronic-illness-pain',
  'Evidence-based education on the psychological dimensions of chronic illness — covering pain neuroscience, medical trauma, identity shifts after diagnosis, and resilience-building strategies for people living with ongoing health conditions.',
  'Stethoscope',
  20,
  55,
  '#059669'
)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------------------
-- 2. Insert Subcategory
-- ---------------------------------------------------------------------------

DO $$
DECLARE
  v_cat_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'chronic-illness-pain';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Specific Medical Conditions and Mental Health', 'specific-medical-conditions-and-mental-health', v_cat_id, 3)
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'chronic-illness-pain';
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'specific-medical-conditions-and-mental-health' AND category_id = v_cat_id;

  -- CAT20-021: The Relationship Between Chronic Pain and Depression
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Relationship Between Chronic Pain and Depression',
    'the-relationship-between-chronic-pain-and-depression',
    'draft',
    'Chronic Illness, Pain & Medical Psychology',
    ARRAY['Chronic Pain', 'Depression', 'Comorbidity', 'Neurobiology'],
    1042,
    'Psychage Editorial Team',
    'self_help',
    'CAT20-021',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Chronic pain and depression share overlapping neurobiology and worsen each other when co-occurring. This research digest examines the science behind their connection and integrated treatment approaches.',
    '/images/articles/cat20/cover-021.svg',
    10,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT20-022: Movement and Chronic Pain: Why Gentle Exercise Helps
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Movement and Chronic Pain: Why Gentle Exercise Helps',
    'movement-and-chronic-pain-why-gentle-exercise-helps',
    'draft',
    'Chronic Illness, Pain & Medical Psychology',
    ARRAY['Exercise', 'Chronic Pain', 'Movement', 'Kinesiophobia'],
    1006,
    'Psychage Editorial Team',
    'self_help',
    'CAT20-022',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Exercise is one of the most effective treatments for chronic pain, yet fear of movement keeps many people inactive. Learn why gentle exercise helps and how to start safely.',
    '/images/articles/cat20/cover-022.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT20-023: Cancer and Mental Health: Psychological Support Through Diagnosis and Treatment
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Cancer and Mental Health: Psychological Support Through Diagnosis and Treatment',
    'cancer-and-mental-health-psychological-support-through-diagnosis-and-treatment',
    'draft',
    'Chronic Illness, Pain & Medical Psychology',
    ARRAY['Cancer', 'Psycho-Oncology', 'Depression', 'Anxiety', 'Medical Trauma'],
    1093,
    'Psychage Editorial Team',
    'self_help',
    'CAT20-023',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A cancer diagnosis reshapes every aspect of life, including mental health. Explore the psychological impact of cancer at every stage, evidence-based psycho-oncology interventions, and how emotional support improves outcomes and quality of life.',
    '/images/articles/cat20/cover-023.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT20-024: Diabetes and Depression: Managing Two Conditions Together
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Diabetes and Depression: Managing Two Conditions Together',
    'diabetes-and-depression-managing-two-conditions-together',
    'draft',
    'Chronic Illness, Pain & Medical Psychology',
    ARRAY['Diabetes', 'Depression', 'Blood Sugar', 'Self-Management', 'Comorbidity'],
    1083,
    'Psychage Editorial Team',
    'self_help',
    'CAT20-024',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Diabetes and depression form a dangerous bidirectional cycle, each worsening the other. Learn how the two conditions are biologically linked, why integrated treatment is essential, and practical strategies for managing both effectively.',
    '/images/articles/cat20/cover-024.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT20-025: Heart Disease and Anxiety: The Cardiac-Mental Health Connection
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Heart Disease and Anxiety: The Cardiac-Mental Health Connection',
    'heart-disease-and-anxiety-the-cardiac-mental-health-connection',
    'draft',
    'Chronic Illness, Pain & Medical Psychology',
    ARRAY['Heart Disease', 'Anxiety', 'Cardiac Psychology', 'Panic Disorder', 'Recovery'],
    1126,
    'Psychage Editorial Team',
    'self_help',
    'CAT20-025',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Heart disease and anxiety share a profound bidirectional relationship, with each condition driving the other through biological and psychological pathways. Explore the science behind cardiac anxiety, its impact on recovery, and evidence-based strategies for managing both.',
    '/images/articles/cat20/cover-025.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT20-026: Multiple Sclerosis and Mental Health: Neurological and Emotional Challenges
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Multiple Sclerosis and Mental Health: Neurological and Emotional Challenges',
    'multiple-sclerosis-and-mental-health-neurological-and-emotional-challenges',
    'draft',
    'Chronic Illness, Pain & Medical Psychology',
    ARRAY['Multiple Sclerosis', 'Neuropsychiatry', 'Depression', 'Cognitive Changes', 'Fatigue'],
    1129,
    'Psychage Editorial Team',
    'self_help',
    'CAT20-026',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Multiple sclerosis directly affects the brain, making mental health challenges both a reaction to the disease and a symptom of it. Explore the neuropsychiatric dimensions of MS, from depression to pseudobulbar affect, and evidence-based approaches for psychological support.',
    '/images/articles/cat20/cover-026.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT20-027: Epilepsy and Mental Health: Seizures, Stigma, and Psychological Impact
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Epilepsy and Mental Health: Seizures, Stigma, and Psychological Impact',
    'epilepsy-and-mental-health-seizures-stigma-and-psychological-impact',
    'draft',
    'Chronic Illness, Pain & Medical Psychology',
    ARRAY['Epilepsy', 'Seizures', 'Stigma', 'Depression', 'Neuropsychiatry'],
    1122,
    'Psychage Editorial Team',
    'self_help',
    'CAT20-027',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Epilepsy affects far more than seizure frequency — it reshapes mental health, identity, and social life. Explore the neuropsychiatric dimensions of epilepsy, the devastating impact of stigma, and evidence-based psychological interventions that improve quality of life.',
    '/images/articles/cat20/cover-027.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT20-028: Autoimmune Conditions and Mental Health: When Your Body Attacks Itself
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Autoimmune Conditions and Mental Health: When Your Body Attacks Itself',
    'autoimmune-conditions-and-mental-health-when-your-body-attacks-itself',
    'draft',
    'Chronic Illness, Pain & Medical Psychology',
    ARRAY['Autoimmune Disease', 'Lupus', 'Rheumatoid Arthritis', 'Inflammation', 'Mental Health'],
    1132,
    'Psychage Editorial Team',
    'self_help',
    'CAT20-028',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Autoimmune diseases carry a significant mental health burden rooted in chronic inflammation, unpredictable flares, and the psychological toll of a body turned against itself. Explore the shared biology, unique challenges, and evidence-based strategies for emotional well-being.',
    '/images/articles/cat20/cover-028.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT20-029: HIV/AIDS and Mental Health: Stigma, Treatment, and Thriving
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'HIV/AIDS and Mental Health: Stigma, Treatment, and Thriving',
    'hiv-aids-and-mental-health-stigma-treatment-and-thriving',
    'draft',
    'Chronic Illness, Pain & Medical Psychology',
    ARRAY['HIV/AIDS', 'Stigma', 'Mental Health', 'Chronic Illness', 'Antiretroviral Therapy'],
    1119,
    'Psychage Editorial Team',
    'self_help',
    'CAT20-029',
    v_cat_id,
    v_sub_id,
    'drafted',
    'People living with HIV face disproportionate rates of depression, anxiety, and PTSD — driven by both neurobiology and pervasive stigma. Learn about the mental health challenges, effective psychological interventions, and the path from surviving to thriving with HIV.',
    '/images/articles/cat20/cover-029.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT20-030: Chronic Kidney Disease and Psychological Wellbeing
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Chronic Kidney Disease and Psychological Wellbeing',
    'chronic-kidney-disease-and-psychological-wellbeing',
    'draft',
    'Chronic Illness, Pain & Medical Psychology',
    ARRAY['Chronic Kidney Disease', 'Dialysis', 'Depression', 'Quality of Life', 'Organ Transplant'],
    1102,
    'Psychage Editorial Team',
    'self_help',
    'CAT20-030',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Chronic kidney disease affects mental health through uremic toxins, dietary restrictions, dialysis burden, and existential uncertainty. Explore the psychological impact across CKD stages and evidence-based strategies for protecting emotional wellbeing.',
    '/images/articles/cat20/cover-030.svg',
    10,
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

  -- === CAT20-021 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT20-021';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Prevalence of depression in chronic pain: updated meta-analysis', '2023', 'https://doi.org/10.1017/S0033291723000892', 'Psychological Medicine', 1),
      (v_art_id, 'peer_reviewed', 1, 'Shared neurobiology of pain and depression', '2022', 'https://doi.org/10.1038/s41583-022-00601-z', 'Nature Reviews Neuroscience', 2),
      (v_art_id, 'peer_reviewed', 1, 'Descending pain modulation and depression', '2021', 'https://doi.org/10.1093/brain/awab281', 'Brain', 3),
      (v_art_id, 'peer_reviewed', 1, 'Inflammatory markers in comorbid pain and depression', '2023', 'https://doi.org/10.1016/j.biopsych.2023.01.014', 'Biological Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Assessment of depression in chronic pain populations', '2022', 'https://doi.org/10.1016/j.jpain.2022.03.004', 'Journal of Pain', 5),
      (v_art_id, 'peer_reviewed', 1, 'SNRIs for comorbid pain and depression: network meta-analysis', '2023', 'https://doi.org/10.1016/S2215-0366(23)00157-X', 'The Lancet Psychiatry', 6),
      (v_art_id, 'peer_reviewed', 1, 'Integrated treatment for pain and depression: systematic review', '2022', 'https://doi.org/10.1001/jama.2022.14271', 'JAMA', 7),
      (v_art_id, 'peer_reviewed', 1, 'Behavioral activation for chronic pain and depression', '2023', 'https://doi.org/10.1097/j.pain.0000000000002900', 'Pain', 8),
      (v_art_id, 'government', 2, 'Clinical guidelines for managing comorbid pain and depression', '2022', 'https://www.nice.org.uk/guidance/cg91', 'National Institute for Health and Care Excellence', 9),
      (v_art_id, 'peer_reviewed', 1, 'Patient experiences of living with pain and depression', '2022', 'https://doi.org/10.1016/j.socscimed.2022.115204', 'Social Science & Medicine', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT20-022 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT20-022';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Exercise therapy for chronic pain: systematic review and meta-analysis', '2023', 'https://doi.org/10.1136/bjsports-2023-067053', 'British Journal of Sports Medicine', 1),
      (v_art_id, 'peer_reviewed', 1, 'Exercise-induced hypoalgesia: endogenous opioid and endocannabinoid mechanisms', '2022', 'https://doi.org/10.1097/j.pain.0000000000002723', 'Pain', 2),
      (v_art_id, 'peer_reviewed', 1, 'Kinesiophobia in chronic pain: prevalence and predictive factors', '2023', 'https://doi.org/10.1002/ejp.2104', 'European Journal of Pain', 3),
      (v_art_id, 'peer_reviewed', 1, 'Exercise and neuroplasticity in chronic pain', '2022', 'https://doi.org/10.1016/j.neubiorev.2022.104715', 'Neuroscience & Biobehavioral Reviews', 4),
      (v_art_id, 'peer_reviewed', 1, 'Graded exposure for kinesiophobia in chronic pain: RCT', '2023', 'https://doi.org/10.1016/S0140-6736(23)00821-X', 'The Lancet', 5),
      (v_art_id, 'peer_reviewed', 1, 'Aquatic exercise for chronic pain: Cochrane review', '2022', 'https://doi.org/10.1002/14651858.CD008322.pub3', 'Cochrane Database of Systematic Reviews', 6),
      (v_art_id, 'peer_reviewed', 1, 'Yoga for chronic pain: systematic review', '2022', 'https://doi.org/10.7326/M22-1782', 'Annals of Internal Medicine', 7),
      (v_art_id, 'peer_reviewed', 1, 'Tai chi for chronic pain conditions', '2023', 'https://doi.org/10.1136/bmj-2023-075301', 'BMJ', 8),
      (v_art_id, 'government', 2, 'Physical activity guidelines for adults with chronic conditions', '2022', 'https://www.who.int/news-room/fact-sheets/detail/physical-activity', 'World Health Organization', 9),
      (v_art_id, 'peer_reviewed', 1, 'Anti-inflammatory effects of regular exercise', '2023', 'https://doi.org/10.1038/s41577-023-00851-3', 'Nature Reviews Immunology', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT20-023 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT20-023';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Prevalence of depression and anxiety in cancer patients: a systematic review and meta-analysis', '2023', 'https://doi.org/10.1016/S2215-0366(23)00105-8', 'The Lancet Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Gaps in psychosocial care for cancer patients: international survey of oncology providers', '2022', 'https://doi.org/10.1200/JCO.21.02089', 'Journal of Clinical Oncology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Depression and cancer mortality: a meta-analytic review', '2021', 'https://doi.org/10.1097/PSY.0000000000000964', 'Psychosomatic Medicine', 3),
      (v_art_id, 'peer_reviewed', 1, 'Post-traumatic stress disorder in cancer survivors: prevalence and risk factors', '2023', 'https://doi.org/10.1002/pon.6078', 'Psycho-Oncology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive behavioral therapy for cancer-related psychological distress: systematic review', '2022', 'https://doi.org/10.1093/abm/kaac028', 'Annals of Behavioral Medicine', 5),
      (v_art_id, 'government', 2, 'Distress management clinical practice guidelines in oncology', '2023', 'https://www.nccn.org/guidelines/distress-management', 'National Comprehensive Cancer Network', 6),
      (v_art_id, 'peer_reviewed', 1, 'Psychoneuroimmunology of cancer: mechanisms and clinical implications', '2022', 'https://doi.org/10.1038/s41568-022-00498-1', 'Nature Reviews Cancer', 7),
      (v_art_id, 'peer_reviewed', 1, 'Social support and cancer outcomes: prospective cohort study', '2023', 'https://doi.org/10.1002/cncr.34782', 'Cancer', 8),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness-based interventions for cancer patients: Cochrane review', '2022', 'https://doi.org/10.1002/14651858.CD012120.pub2', 'Cochrane Database of Systematic Reviews', 9),
      (v_art_id, 'government', 2, 'Standards of psychosocial care for cancer patients', '2023', 'https://www.cancer.org/psychosocial-standards', 'American Cancer Society', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT20-024 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT20-024';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Prevalence of depression in type 1 and type 2 diabetes: systematic review and meta-analysis', '2023', 'https://doi.org/10.1007/s00125-023-05914-5', 'Diabetologia', 1),
      (v_art_id, 'peer_reviewed', 1, 'Underrecognition of depression in diabetes care: cross-sectional primary care study', '2022', 'https://doi.org/10.2337/dc22-0518', 'Diabetes Care', 2),
      (v_art_id, 'peer_reviewed', 1, 'Impact of comorbid depression on diabetes complications: longitudinal cohort study', '2023', 'https://doi.org/10.1016/S2213-8587(23)00045-2', 'The Lancet Diabetes & Endocrinology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Diabetes distress versus clinical depression: conceptual and clinical distinctions', '2022', 'https://doi.org/10.2337/ds22-0032', 'Diabetes Spectrum', 4),
      (v_art_id, 'peer_reviewed', 1, 'Integrated psychological and diabetes care: randomized controlled trial outcomes', '2023', 'https://doi.org/10.1001/jamainternmed.2023.0412', 'JAMA Internal Medicine', 5),
      (v_art_id, 'government', 2, 'Standards of care in diabetes — psychosocial care chapter', '2024', 'https://doi.org/10.2337/dc24-S005', 'American Diabetes Association', 6),
      (v_art_id, 'peer_reviewed', 1, 'Shared biological mechanisms of diabetes and depression: inflammatory and neuroendocrine pathways', '2022', 'https://doi.org/10.1038/s41380-022-01612-9', 'Molecular Psychiatry', 7),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive behavioral therapy for depression in diabetes: Cochrane review', '2023', 'https://doi.org/10.1002/14651858.CD010523.pub3', 'Cochrane Database of Systematic Reviews', 8),
      (v_art_id, 'government', 2, 'Diabetes and depression screening: recommendations for practice', '2023', 'https://www.nice.org.uk/guidance/ng28', 'National Institute for Health and Care Excellence', 9),
      (v_art_id, 'peer_reviewed', 1, 'Self-management interventions for diabetes and comorbid depression', '2022', 'https://doi.org/10.1080/17437199.2022.2043847', 'Health Psychology Review', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT20-025 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT20-025';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Anxiety as an independent risk factor for coronary heart disease: meta-analysis of prospective studies', '2023', 'https://doi.org/10.1016/j.jacc.2022.12.042', 'Journal of the American College of Cardiology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Differentiating panic disorder from cardiac disease in emergency departments', '2022', 'https://doi.org/10.1161/CIRCULATIONAHA.122.059847', 'Circulation', 2),
      (v_art_id, 'peer_reviewed', 1, 'Prevalence and predictors of anxiety after acute myocardial infarction: systematic review', '2023', 'https://doi.org/10.1093/eurheartj/ehad165', 'European Heart Journal', 3),
      (v_art_id, 'peer_reviewed', 1, 'Cardiac anxiety and avoidance behavior: impact on physical activity and rehabilitation', '2022', 'https://doi.org/10.1097/PSY.0000000000001089', 'Psychosomatic Medicine', 4),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive behavioral therapy for anxiety in cardiac rehabilitation: randomized trial', '2023', 'https://doi.org/10.1001/jamacardio.2023.0847', 'JAMA Cardiology', 5),
      (v_art_id, 'government', 2, 'Psychological care in cardiovascular disease: scientific statement', '2023', 'https://doi.org/10.1161/CIR.0000000000001137', 'American Heart Association', 6),
      (v_art_id, 'peer_reviewed', 1, 'Autonomic nervous system dysfunction in anxiety and cardiovascular disease', '2022', 'https://doi.org/10.1038/s41569-022-00711-8', 'Nature Reviews Cardiology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Heart rate variability biofeedback for cardiac anxiety: pilot randomized trial', '2023', 'https://doi.org/10.1007/s10484-023-09572-2', 'Applied Psychophysiology and Biofeedback', 8),
      (v_art_id, 'government', 2, 'Depression and anxiety screening in cardiovascular care', '2023', 'https://www.nice.org.uk/guidance/cg181', 'National Institute for Health and Care Excellence', 9),
      (v_art_id, 'peer_reviewed', 1, 'Stress cardiomyopathy (Takotsubo syndrome): when emotions break the heart', '2022', 'https://doi.org/10.1056/NEJMra2206507', 'The New England Journal of Medicine', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT20-026 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT20-026';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Prevalence of depression in multiple sclerosis: systematic review and meta-analysis', '2023', 'https://doi.org/10.1136/jnnp-2023-331052', 'Journal of Neurology, Neurosurgery & Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Neurobiological mechanisms of depression in multiple sclerosis', '2022', 'https://doi.org/10.1038/s41582-022-00693-y', 'Nature Reviews Neurology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Fatigue in multiple sclerosis: mechanisms and management', '2023', 'https://doi.org/10.1016/S1474-4422(23)00073-4', 'The Lancet Neurology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive impairment in MS: prevalence, patterns, and impact on daily life', '2022', 'https://doi.org/10.1177/13524585221098561', 'Multiple Sclerosis Journal', 4),
      (v_art_id, 'peer_reviewed', 1, 'CBT for depression in multiple sclerosis: randomized controlled trial', '2023', 'https://doi.org/10.1212/WNL.0000000000207128', 'Neurology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Pseudobulbar affect in MS: prevalence and treatment', '2022', 'https://doi.org/10.1016/j.msard.2022.103712', 'MS and Related Disorders', 6),
      (v_art_id, 'government', 2, 'Psychosocial management of multiple sclerosis: clinical guidelines', '2023', 'https://www.nationalmssociety.org/guidelines', 'National Multiple Sclerosis Society', 7),
      (v_art_id, 'peer_reviewed', 1, 'Anxiety disorders in multiple sclerosis: prevalence and clinical correlates', '2023', 'https://doi.org/10.1002/acn3.51742', 'Annals of Clinical and Translational Neurology', 8),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness-based interventions for people with MS: systematic review', '2022', 'https://doi.org/10.1177/02692155221105834', 'Clinical Rehabilitation', 9),
      (v_art_id, 'peer_reviewed', 1, 'Grief and identity adjustment in multiple sclerosis: qualitative study', '2023', 'https://doi.org/10.1080/09638288.2023.2176453', 'Disability and Rehabilitation', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT20-027 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT20-027';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Psychiatric comorbidities in epilepsy: systematic review and meta-analysis', '2023', 'https://doi.org/10.1111/epi.17588', 'Epilepsia', 1),
      (v_art_id, 'peer_reviewed', 1, 'Suicide and epilepsy: a population-based cohort study', '2022', 'https://doi.org/10.1016/S2215-0366(22)00216-5', 'The Lancet Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Anxiety disorders in epilepsy: prevalence, mechanisms, and treatment', '2023', 'https://doi.org/10.1016/j.yebeh.2023.109178', 'Epilepsy & Behavior', 3),
      (v_art_id, 'peer_reviewed', 1, 'The burden of epilepsy stigma: systematic review of quality of life predictors', '2022', 'https://doi.org/10.1016/j.seizure.2022.04.015', 'Seizure: European Journal of Epilepsy', 4),
      (v_art_id, 'peer_reviewed', 1, 'Treatment gaps in psychiatric care for epilepsy: international survey', '2023', 'https://doi.org/10.1016/j.eplepsyres.2023.107082', 'Epilepsy Research', 5),
      (v_art_id, 'peer_reviewed', 1, 'Bidirectional relationship between epilepsy and depression: neurobiological evidence', '2022', 'https://doi.org/10.1038/s41582-022-00661-6', 'Nature Reviews Neurology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive-behavioral therapy for depression in epilepsy: clinical trial', '2023', 'https://doi.org/10.1212/WNL.0000000000207352', 'Neurology', 7),
      (v_art_id, 'government', 2, 'Clinical practice guidelines for psychiatric management of epilepsy', '2023', 'https://www.ilae.org/guidelines', 'International League Against Epilepsy', 8),
      (v_art_id, 'peer_reviewed', 1, 'Anti-stigma interventions for epilepsy: systematic review', '2022', 'https://doi.org/10.1016/j.yebeh.2022.108749', 'Epilepsy & Behavior', 9),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness and acceptance-based interventions for epilepsy: clinical review', '2023', 'https://doi.org/10.1016/j.yebeh.2023.109287', 'Epilepsy & Behavior', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT20-028 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT20-028';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Depression and anxiety in autoimmune disease: systematic review and meta-analysis', '2023', 'https://doi.org/10.1016/j.autrev.2023.103291', 'Autoimmunity Reviews', 1),
      (v_art_id, 'peer_reviewed', 1, 'Inflammatory mechanisms linking autoimmunity and depression: cytokine pathways', '2022', 'https://doi.org/10.1038/s41380-022-01708-2', 'Molecular Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Sex differences in autoimmune disease: epidemiology and immunological mechanisms', '2023', 'https://doi.org/10.1038/s41577-023-00884-6', 'Nature Reviews Immunology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Diagnostic delays in autoimmune conditions: patient experience survey', '2022', 'https://doi.org/10.1186/s12913-022-08073-4', 'BMC Health Services Research', 4),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive behavioral therapy for depression in rheumatoid arthritis: meta-analysis', '2023', 'https://doi.org/10.1093/rheumatology/kead158', 'Rheumatology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Neuropsychiatric systemic lupus erythematosus: mechanisms and management', '2022', 'https://doi.org/10.1016/S1474-4422(22)00271-X', 'The Lancet Neurology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Psychosocial stress and autoimmune disease flares: prospective cohort study', '2023', 'https://doi.org/10.1001/jamanetworkopen.2023.5327', 'JAMA Network Open', 7),
      (v_art_id, 'government', 2, 'Management of psychological comorbidities in autoimmune disease', '2023', 'https://www.rheumatology.org/psychological-comorbidity', 'American College of Rheumatology', 8),
      (v_art_id, 'peer_reviewed', 1, 'Acceptance and commitment therapy for chronic autoimmune conditions: pilot trial', '2023', 'https://doi.org/10.1016/j.jcbs.2023.04.003', 'Journal of Contextual Behavioral Science', 9),
      (v_art_id, 'peer_reviewed', 1, 'The invisible illness experience: qualitative synthesis of autoimmune disease narratives', '2022', 'https://doi.org/10.1016/j.socscimed.2022.114893', 'Social Science & Medicine', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT20-029 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT20-029';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Depression in people living with HIV: a systematic review and meta-analysis', '2023', 'https://doi.org/10.1016/S2352-3018(23)00056-3', 'The Lancet HIV', 1),
      (v_art_id, 'peer_reviewed', 1, 'Life expectancy of people on antiretroviral therapy in high-income countries', '2023', 'https://doi.org/10.1016/S0140-6736(23)00456-7', 'The Lancet', 2),
      (v_art_id, 'peer_reviewed', 1, 'HIV stigma and treatment adherence: a meta-analytic review', '2022', 'https://doi.org/10.1007/s10461-022-03680-4', 'AIDS and Behavior', 3),
      (v_art_id, 'peer_reviewed', 1, 'HIV-associated neurocognitive disorders in the era of antiretroviral therapy', '2022', 'https://doi.org/10.1038/s41582-022-00723-z', 'Nature Reviews Neurology', 4),
      (v_art_id, 'government', 2, 'Mental health and HIV/AIDS: clinical guidance', '2022', 'https://www.who.int/publications/i/item/9789240053922', 'World Health Organization', 5),
      (v_art_id, 'peer_reviewed', 1, 'Psychological interventions for depression in people with HIV: meta-analysis', '2023', 'https://doi.org/10.1097/QAI.0000000000003147', 'Journal of Acquired Immune Deficiency Syndromes', 6),
      (v_art_id, 'peer_reviewed', 1, 'Post-traumatic growth in people living with HIV: systematic review', '2022', 'https://doi.org/10.1080/09540121.2022.2057268', 'AIDS Care', 7),
      (v_art_id, 'peer_reviewed', 1, 'Neuroinflammation and mood disorders in HIV infection', '2023', 'https://doi.org/10.1016/j.bbi.2023.01.012', 'Brain, Behavior, and Immunity', 8),
      (v_art_id, 'government', 2, 'U=U: Undetectable equals untransmittable — the science', '2023', 'https://www.nih.gov/news-events/uu-taking-new-knowledge-hiv-treatment', 'National Institutes of Health', 9),
      (v_art_id, 'peer_reviewed', 1, 'Stigma reduction interventions for HIV: what works', '2022', 'https://doi.org/10.1002/jia2.25967', 'Journal of the International AIDS Society', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT20-030 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT20-030';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Prevalence of depression in chronic kidney disease: systematic review and meta-analysis', '2023', 'https://doi.org/10.1016/j.kint.2023.02.019', 'Kidney International', 1),
      (v_art_id, 'peer_reviewed', 1, 'Depression and mortality in chronic kidney disease: a systematic review', '2022', 'https://doi.org/10.1093/ndt/gfac234', 'Nephrology Dialysis Transplantation', 2),
      (v_art_id, 'peer_reviewed', 1, 'Mental health care gaps in chronic kidney disease', '2023', 'https://doi.org/10.1053/j.ajkd.2023.01.444', 'American Journal of Kidney Diseases', 3),
      (v_art_id, 'peer_reviewed', 1, 'Uremic toxins and the brain: mechanisms of neurocognitive dysfunction', '2022', 'https://doi.org/10.3390/toxins14100678', 'Toxins', 4),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive impairment in hemodialysis patients: prevalence and risk factors', '2023', 'https://doi.org/10.2215/CJN.0000000000000123', 'Clinical Journal of the American Society of Nephrology', 5),
      (v_art_id, 'government', 2, 'KDIGO guideline on management of patients with CKD', '2024', 'https://kdigo.org/guidelines/ckd-evaluation-and-management/', 'Kidney Disease: Improving Global Outcomes', 6),
      (v_art_id, 'peer_reviewed', 1, 'Psychological interventions for depression in CKD: randomized controlled trial', '2023', 'https://doi.org/10.1681/ASN.2023010067', 'Journal of the American Society of Nephrology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Quality of life in dialysis patients: a systematic review', '2022', 'https://doi.org/10.1186/s12882-022-02892-5', 'BMC Nephrology', 8),
      (v_art_id, 'peer_reviewed', 1, 'Psychological impact of kidney transplantation: pre- and post-operative outcomes', '2023', 'https://doi.org/10.1097/TP.0000000000004467', 'Transplantation', 9),
      (v_art_id, 'peer_reviewed', 1, 'Sleep disorders in CKD and their association with depression', '2022', 'https://doi.org/10.1016/j.smrv.2022.101648', 'Sleep Medicine Reviews', 10)
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
  WHERE a.article_production_id LIKE 'CAT20-%';

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;
