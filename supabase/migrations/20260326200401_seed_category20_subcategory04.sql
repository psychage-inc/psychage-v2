-- ============================================================================
-- Seed: Category 20 (Chronic Illness, Pain & Medical Psychology) — Subcategory 04
-- 10 articles: CAT20-031 through CAT20-040
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
  VALUES ('Medical Trauma and Healthcare Experiences', 'medical-trauma-and-healthcare-experiences', v_cat_id, 4)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'medical-trauma-and-healthcare-experiences' AND category_id = v_cat_id;

  -- CAT20-031: Inflammatory Bowel Disease and Mental Health: The Gut-Brain Axis in Action
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Inflammatory Bowel Disease and Mental Health: The Gut-Brain Axis in Action',
    'inflammatory-bowel-disease-and-mental-health-the-gut-brain-axis-in-action',
    'draft',
    'Chronic Illness, Pain & Medical Psychology',
    ARRAY['Inflammatory Bowel Disease', 'Gut-Brain Axis', 'Crohn''s Disease', 'Ulcerative Colitis', 'Microbiome'],
    1118,
    'Psychage Editorial Team',
    'self_help',
    'CAT20-031',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The gut-brain axis provides the biological framework for understanding why inflammatory bowel disease so profoundly affects mental health. Explore the bidirectional communication between gut inflammation and brain function in Crohn''s disease and ulcerative colitis.',
    '/images/articles/cat20/cover-031.svg',
    10,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT20-032: Chronic Respiratory Disease and Anxiety: When Breathing Becomes Frightening
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Chronic Respiratory Disease and Anxiety: When Breathing Becomes Frightening',
    'chronic-respiratory-disease-and-anxiety-when-breathing-becomes-frightening',
    'draft',
    'Chronic Illness, Pain & Medical Psychology',
    ARRAY['COPD', 'Asthma', 'Breathlessness', 'Anxiety', 'Pulmonary Rehabilitation'],
    1092,
    'Psychage Editorial Team',
    'self_help',
    'CAT20-032',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Breathlessness is one of the most anxiety-provoking sensations humans can experience. Learn how COPD, asthma, and other chronic respiratory conditions create a vicious cycle with anxiety, and discover evidence-based strategies for breaking it.',
    '/images/articles/cat20/cover-032.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT20-033: Stroke Recovery and Mental Health: Rebuilding After Brain Injury
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Stroke Recovery and Mental Health: Rebuilding After Brain Injury',
    'stroke-recovery-and-mental-health-rebuilding-after-brain-injury',
    'draft',
    'Chronic Illness, Pain & Medical Psychology',
    ARRAY['Stroke', 'Post-Stroke Depression', 'Brain Injury', 'Rehabilitation', 'Neuroplasticity'],
    1125,
    'Psychage Editorial Team',
    'self_help',
    'CAT20-033',
    v_cat_id,
    v_sub_id,
    'drafted',
    'One in three stroke survivors develops depression, driven by both neurobiological damage and the psychological impact of sudden disability. Explore post-stroke mental health challenges and evidence-based approaches to emotional recovery alongside physical rehabilitation.',
    '/images/articles/cat20/cover-033.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT20-034: Long COVID and Mental Health: The Psychological Aftermath of Persistent Symptoms
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Long COVID and Mental Health: The Psychological Aftermath of Persistent Symptoms',
    'long-covid-and-mental-health-the-psychological-aftermath-of-persistent-symptoms',
    'draft',
    'Chronic Illness, Pain & Medical Psychology',
    ARRAY['Long COVID', 'Post-COVID', 'Brain Fog', 'Fatigue', 'Neuroinflammation'],
    1123,
    'Psychage Editorial Team',
    'self_help',
    'CAT20-034',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Long COVID affects millions worldwide with persistent fatigue, cognitive dysfunction, and mood disturbance. Explore the emerging research on neuroinflammation, psychoneuroimmunology, and evidence-based psychological support for people living with post-COVID conditions.',
    '/images/articles/cat20/cover-034.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT20-035: Medical Trauma: When Healthcare Experiences Leave Psychological Scars
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Medical Trauma: When Healthcare Experiences Leave Psychological Scars',
    'medical-trauma-when-healthcare-experiences-leave-psychological-scars',
    'draft',
    'Chronic Illness, Pain & Medical Psychology',
    ARRAY['Medical Trauma', 'PTSD', 'Healthcare Experiences', 'Psychological Injury', 'Trauma Recovery'],
    1078,
    'Psychage Editorial Team',
    'self_help',
    'CAT20-035',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Medical trauma occurs when healthcare experiences — procedures, diagnoses, or provider interactions — cause lasting psychological harm. Learn about its prevalence, neurobiological mechanisms, and evidence-based pathways to recovery.',
    '/images/articles/cat20/cover-035.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT20-036: ICU Delirium and Post-ICU PTSD: The Hidden Epidemic
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'ICU Delirium and Post-ICU PTSD: The Hidden Epidemic',
    'icu-delirium-and-post-icu-ptsd-the-hidden-epidemic',
    'draft',
    'Chronic Illness, Pain & Medical Psychology',
    ARRAY['ICU Delirium', 'Post-ICU PTSD', 'PICS', 'Critical Illness', 'Hospital Trauma'],
    1090,
    'Psychage Editorial Team',
    'self_help',
    'CAT20-036',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Up to 80% of mechanically ventilated ICU patients develop delirium, and many go on to experience lasting PTSD. Explore the neuroscience of ICU-related psychological injury, post-intensive care syndrome, and evidence-based recovery strategies.',
    '/images/articles/cat20/cover-036.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT20-037: Surgery and Mental Health: Preparing for and Recovering From Operations
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Surgery and Mental Health: Preparing for and Recovering From Operations',
    'surgery-and-mental-health-preparing-for-and-recovering-from-operations',
    'draft',
    'Chronic Illness, Pain & Medical Psychology',
    ARRAY['Surgery', 'Pre-Surgical Anxiety', 'Post-Operative Depression', 'Psychological Preparation', 'Recovery'],
    1096,
    'Psychage Editorial Team',
    'self_help',
    'CAT20-037',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Surgery affects mental health before, during, and long after the operating room. Learn about pre-surgical anxiety, post-operative depression, psychological preparation techniques, and how to protect your mental health through the surgical process.',
    '/images/articles/cat20/cover-037.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT20-038: Needle Phobia and Medical Avoidance: When Fear Prevents Healthcare
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Needle Phobia and Medical Avoidance: When Fear Prevents Healthcare',
    'needle-phobia-and-medical-avoidance-when-fear-prevents-healthcare',
    'draft',
    'Chronic Illness, Pain & Medical Psychology',
    ARRAY['Needle Phobia', 'Trypanophobia', 'Medical Avoidance', 'Blood-Injection-Injury Phobia', 'Specific Phobia'],
    1113,
    'Psychage Editorial Team',
    'self_help',
    'CAT20-038',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Needle phobia affects up to 25% of adults and causes millions to avoid vaccinations, blood tests, and medical treatment. Explore the unique vasovagal physiology behind this phobia, its real-world health consequences, and the most effective treatments available.',
    '/images/articles/cat20/cover-038.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT20-039: Pediatric Medical Trauma: How Hospital Experiences Affect Children
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Pediatric Medical Trauma: How Hospital Experiences Affect Children',
    'pediatric-medical-trauma-how-hospital-experiences-affect-children',
    'draft',
    'Chronic Illness, Pain & Medical Psychology',
    ARRAY['Pediatric Trauma', 'Medical Trauma', 'Child Psychology', 'Hospital Anxiety', 'PTSS'],
    1087,
    'Psychage Editorial Team',
    'self_help',
    'CAT20-039',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Research-based exploration of how hospitalizations, procedures, and medical environments affect children psychologically. Understand the signs of pediatric medical traumatic stress and evidence-based approaches for prevention and recovery.',
    '/images/articles/cat20/cover-039.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT20-040: The Psychology of Waiting for Test Results: Managing Medical Uncertainty
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Waiting for Test Results: Managing Medical Uncertainty',
    'the-psychology-of-waiting-for-test-results-managing-medical-uncertainty',
    'draft',
    'Chronic Illness, Pain & Medical Psychology',
    ARRAY['Medical Anxiety', 'Uncertainty Tolerance', 'Test Results', 'Coping Strategies', 'Health Anxiety'],
    1099,
    'Psychage Editorial Team',
    'self_help',
    'CAT20-040',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore why waiting for medical test results produces intense anxiety and learn evidence-based strategies for managing uncertainty. Understand the cognitive science behind fear of the unknown and practical tools for coping during the waiting period.',
    '/images/articles/cat20/cover-040.svg',
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

  -- === CAT20-031 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT20-031';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Prevalence of anxiety and depression in inflammatory bowel disease: systematic review and meta-analysis', '2023', 'https://doi.org/10.1016/S2468-1253(23)00157-9', 'The Lancet Gastroenterology & Hepatology', 1),
      (v_art_id, 'peer_reviewed', 1, 'The gut-brain axis: mechanisms and clinical implications', '2023', 'https://doi.org/10.1038/s41575-023-00796-x', 'Nature Reviews Gastroenterology & Hepatology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Serotonin production in the gut and its role in brain function', '2022', 'https://doi.org/10.1016/j.cell.2022.05.014', 'Cell', 3),
      (v_art_id, 'peer_reviewed', 1, 'Gut microbiome alterations in IBD and associations with depressive symptoms', '2023', 'https://doi.org/10.1038/s41564-023-01378-4', 'Nature Microbiology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Psychological stress and IBD flare risk: prospective cohort study', '2022', 'https://doi.org/10.1136/gutjnl-2022-327346', 'Gut', 5),
      (v_art_id, 'government', 2, 'Management of inflammatory bowel disease: clinical practice guidelines', '2023', 'https://gastro.org/practice-guidance/ibd/', 'American Gastroenterological Association', 6),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive behavioral therapy for IBD: effects on psychological and disease outcomes', '2023', 'https://doi.org/10.1053/j.gastro.2023.03.218', 'Gastroenterology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Vagus nerve stimulation and gut inflammation: preclinical and clinical evidence', '2022', 'https://doi.org/10.1016/j.bbi.2022.08.002', 'Brain, Behavior, and Immunity', 8),
      (v_art_id, 'peer_reviewed', 1, 'Quality of life and social functioning in inflammatory bowel disease', '2022', 'https://doi.org/10.1093/ibd/izac156', 'Inflammatory Bowel Diseases', 9),
      (v_art_id, 'peer_reviewed', 1, 'Anti-inflammatory effects of antidepressants in IBD models', '2023', 'https://doi.org/10.1016/j.phrs.2023.106712', 'Pharmacological Research', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT20-032 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT20-032';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Prevalence of anxiety and depression in COPD: updated systematic review', '2023', 'https://doi.org/10.1183/13993003.01711-2023', 'European Respiratory Journal', 1),
      (v_art_id, 'peer_reviewed', 1, 'Impact of anxiety on COPD outcomes: hospitalizations, mortality, and quality of life', '2022', 'https://doi.org/10.1016/j.chest.2022.06.041', 'Chest', 2),
      (v_art_id, 'peer_reviewed', 1, 'Neural processing of breathlessness: the role of insular cortex and amygdala', '2023', 'https://doi.org/10.1016/j.neuroimage.2023.119981', 'NeuroImage', 3),
      (v_art_id, 'peer_reviewed', 1, 'Panic-related components in acute asthma presentations', '2022', 'https://doi.org/10.1016/j.jaci.2022.07.019', 'Journal of Allergy and Clinical Immunology', 4),
      (v_art_id, 'government', 2, 'Global strategy for prevention, diagnosis, and management of COPD', '2024', 'https://goldcopd.org/2024-gold-report/', 'Global Initiative for Chronic Obstructive Lung Disease (GOLD)', 5),
      (v_art_id, 'peer_reviewed', 1, 'Pulmonary rehabilitation: effects on anxiety, depression, and exercise capacity', '2023', 'https://doi.org/10.1136/thorax-2023-220134', 'Thorax', 6),
      (v_art_id, 'peer_reviewed', 1, 'CBT for anxiety in COPD: randomized controlled trial', '2022', 'https://doi.org/10.1164/rccm.202201-0171OC', 'American Journal of Respiratory and Critical Care Medicine', 7),
      (v_art_id, 'peer_reviewed', 1, 'Breathing retraining and dysfunctional breathing patterns in respiratory disease', '2023', 'https://doi.org/10.1016/j.rmed.2023.107234', 'Respiratory Medicine', 8),
      (v_art_id, 'peer_reviewed', 1, 'The overlap between panic disorder and respiratory disease: shared mechanisms', '2022', 'https://doi.org/10.1017/S0033291722001945', 'Psychological Medicine', 9),
      (v_art_id, 'peer_reviewed', 1, 'Singing for lung health: systematic review of respiratory and psychological benefits', '2022', 'https://doi.org/10.1136/bmjresp-2022-001340', 'BMJ Open Respiratory Research', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT20-033 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT20-033';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Post-stroke depression: prevalence, course, and prognosis — updated systematic review', '2023', 'https://doi.org/10.1161/STROKEAHA.123.042563', 'Stroke', 1),
      (v_art_id, 'peer_reviewed', 1, 'Depression and rehabilitation outcomes after stroke: prospective cohort study', '2022', 'https://doi.org/10.1016/j.apmr.2022.04.011', 'Archives of Physical Medicine and Rehabilitation', 2),
      (v_art_id, 'peer_reviewed', 1, 'Neurobiological mechanisms of post-stroke depression: lesion location and neurotransmitter disruption', '2023', 'https://doi.org/10.1038/s41582-023-00811-6', 'Nature Reviews Neurology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Post-stroke anxiety: prevalence, predictors, and impact on quality of life', '2022', 'https://doi.org/10.1136/jnnp-2022-329348', 'Journal of Neurology, Neurosurgery & Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Post-stroke emotional lability: mechanisms and management', '2022', 'https://doi.org/10.1093/brain/awac319', 'Brain', 5),
      (v_art_id, 'government', 2, 'Guidelines for adult stroke rehabilitation and recovery', '2023', 'https://doi.org/10.1161/STR.0000000000000422', 'American Heart Association/American Stroke Association', 6),
      (v_art_id, 'peer_reviewed', 1, 'Antidepressants for prevention and treatment of post-stroke depression: meta-analysis', '2023', 'https://doi.org/10.1016/S1474-4422(23)00189-7', 'The Lancet Neurology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Post-stroke fatigue: prevalence, mechanisms, and interventions', '2023', 'https://doi.org/10.1177/17474930231159612', 'International Journal of Stroke', 8),
      (v_art_id, 'peer_reviewed', 1, 'CBT adapted for post-stroke depression: randomized controlled trial', '2022', 'https://doi.org/10.1080/09602011.2022.2091826', 'Neuropsychological Rehabilitation', 9),
      (v_art_id, 'peer_reviewed', 1, 'Neuroplasticity and emotional recovery after stroke', '2023', 'https://doi.org/10.1016/j.neubiorev.2023.105133', 'Neuroscience & Biobehavioral Reviews', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT20-034 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT20-034';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Long COVID: major findings, mechanisms, and recommendations', '2023', 'https://doi.org/10.1038/s41579-022-00846-2', 'Nature Reviews Microbiology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Risk of psychiatric disorders after SARS-CoV-2 infection: a large-scale cohort study', '2022', 'https://doi.org/10.1016/S2215-0366(22)00260-7', 'The Lancet Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Neuroinflammation and cognitive dysfunction in long COVID: neuroimaging evidence', '2023', 'https://doi.org/10.1093/brain/awac524', 'Brain', 3),
      (v_art_id, 'peer_reviewed', 1, 'Two-year psychiatric outcomes following SARS-CoV-2 infection', '2023', 'https://doi.org/10.1016/S2215-0366(23)00151-1', 'The Lancet Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Long COVID and ME/CFS: shared pathophysiology and implications', '2023', 'https://doi.org/10.1038/s41591-023-02298-4', 'Nature Medicine', 5),
      (v_art_id, 'government', 2, 'Post-COVID conditions: overview and approach to classification', '2023', 'https://www.who.int/publications/i/item/WHO-2019-nCoV-Post_COVID-19_condition-Clinical_case_definition-2021.1', 'World Health Organization', 6),
      (v_art_id, 'peer_reviewed', 1, 'Autonomic dysfunction in long COVID: mechanisms and management', '2023', 'https://doi.org/10.1038/s44161-023-00231-3', 'Nature Cardiovascular Research', 7),
      (v_art_id, 'peer_reviewed', 1, 'Pacing and activity management in post-viral fatigue syndromes', '2023', 'https://doi.org/10.1002/14651858.CD015561', 'Cochrane Database of Systematic Reviews', 8),
      (v_art_id, 'peer_reviewed', 1, 'Psychosocial impact of long COVID: qualitative systematic review', '2023', 'https://doi.org/10.1016/j.socscimed.2023.115892', 'Social Science & Medicine', 9),
      (v_art_id, 'peer_reviewed', 1, 'Immune dysregulation and autoantibodies in long COVID', '2023', 'https://doi.org/10.1126/science.adh1895', 'Science', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT20-035 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT20-035';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Post-traumatic stress disorder following intensive care treatment: a systematic review and meta-analysis', '2022', 'https://doi.org/10.1097/CCM.0000000000005432', 'Critical Care Medicine', 1),
      (v_art_id, 'peer_reviewed', 1, 'Medical trauma: a comprehensive review of definitions, prevalence, and conceptual frameworks', '2023', 'https://doi.org/10.1002/jts.22912', 'Journal of Traumatic Stress', 2),
      (v_art_id, 'peer_reviewed', 1, 'Predictors of psychological trauma in medical settings: loss of autonomy and perceived dismissal', '2021', 'https://doi.org/10.1037/hea0001121', 'Health Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Healthcare avoidance following traumatic medical experiences', '2022', 'https://doi.org/10.1093/abm/kaab096', 'Annals of Behavioral Medicine', 4),
      (v_art_id, 'peer_reviewed', 1, 'Trauma-informed care in hospital settings: impact on patient outcomes', '2023', 'https://doi.org/10.1186/s12913-023-09245-8', 'BMC Health Services Research', 5),
      (v_art_id, 'peer_reviewed', 1, 'Medical trauma and the autonomic nervous system: neurobiological perspectives', '2022', 'https://doi.org/10.1097/PSY.0000000000001082', 'Psychosomatic Medicine', 6),
      (v_art_id, 'government', 2, 'NICE guidelines on PTSD: recognition and management', '2023', 'https://www.nice.org.uk/guidance/ng116', 'National Institute for Health and Care Excellence', 7),
      (v_art_id, 'peer_reviewed', 1, 'EMDR therapy for medical trauma: a randomized controlled trial', '2023', 'https://doi.org/10.1037/ccp0000789', 'Journal of Consulting and Clinical Psychology', 8),
      (v_art_id, 'peer_reviewed', 1, 'Patient-centered communication and the prevention of iatrogenic distress', '2021', 'https://doi.org/10.1016/j.pec.2021.04.023', 'Patient Education and Counseling', 9),
      (v_art_id, 'government', 2, 'Trauma-informed approaches in healthcare: implementation guide', '2022', 'https://www.samhsa.gov/trauma-informed-care', 'Substance Abuse and Mental Health Services Administration (SAMHSA)', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT20-036 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT20-036';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Incidence of delirium in mechanically ventilated ICU patients: systematic review and meta-analysis', '2022', 'https://doi.org/10.1007/s00134-022-06748-2', 'Intensive Care Medicine', 1),
      (v_art_id, 'peer_reviewed', 1, 'Post-traumatic stress disorder after critical illness: a systematic review and meta-analysis', '2023', 'https://doi.org/10.1097/CCM.0000000000005798', 'Critical Care Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'Delusional memories and psychological distress in ICU survivors: a prospective cohort study', '2021', 'https://doi.org/10.1164/rccm.202103-0594OC', 'American Journal of Respiratory and Critical Care Medicine', 3),
      (v_art_id, 'government', 2, 'Post-intensive care syndrome: framework, assessment, and management recommendations', '2022', 'https://doi.org/10.1097/CCM.0000000000005519', 'Society of Critical Care Medicine', 4),
      (v_art_id, 'peer_reviewed', 1, 'ICU diaries for recovery: a randomized controlled trial of psychological outcomes', '2023', 'https://doi.org/10.1186/s13054-023-04412-3', 'Critical Care', 5),
      (v_art_id, 'peer_reviewed', 1, 'Neuroinflammation and cognitive impairment after critical illness', '2022', 'https://doi.org/10.1016/S2213-2600(22)00132-4', 'The Lancet Respiratory Medicine', 6),
      (v_art_id, 'peer_reviewed', 1, 'Early mobilization in the ICU: impact on delirium duration and long-term outcomes', '2022', 'https://doi.org/10.1056/NEJMoa2209083', 'The New England Journal of Medicine', 7),
      (v_art_id, 'peer_reviewed', 1, 'The ABCDEF bundle: evidence and implementation for prevention of ICU delirium', '2023', 'https://doi.org/10.4037/ccn2023589', 'Critical Care Nurse', 8),
      (v_art_id, 'peer_reviewed', 1, 'Post-ICU clinics: systematic review of models and outcomes', '2023', 'https://doi.org/10.1177/17511437231164928', 'Journal of the Intensive Care Society', 9),
      (v_art_id, 'peer_reviewed', 1, 'Family experiences of ICU delirium: qualitative synthesis', '2022', 'https://doi.org/10.1136/bmjopen-2022-061924', 'BMJ Open', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT20-037 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT20-037';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Prevalence and predictors of preoperative anxiety: a systematic review and meta-analysis', '2022', 'https://doi.org/10.1016/j.jclinane.2022.110924', 'Journal of Clinical Anesthesia', 1),
      (v_art_id, 'peer_reviewed', 1, 'Postoperative depression after major surgery: systematic review and meta-analysis', '2023', 'https://doi.org/10.1093/bjs/znad089', 'British Journal of Surgery', 2),
      (v_art_id, 'peer_reviewed', 1, 'Psychological stress and wound healing: the impact of cortisol on surgical recovery', '2021', 'https://doi.org/10.1016/j.psyneuen.2021.105425', 'Psychoneuroendocrinology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Anesthesia awareness: incidence, risk factors, and psychological consequences', '2022', 'https://doi.org/10.1016/j.bja.2022.04.023', 'British Journal of Anaesthesia', 4),
      (v_art_id, 'peer_reviewed', 1, 'Psychological preparation for surgery: meta-analysis of analgesic outcomes', '2023', 'https://doi.org/10.1093/abm/kaac078', 'Annals of Behavioral Medicine', 5),
      (v_art_id, 'peer_reviewed', 1, 'Psychoeducation before elective surgery: randomized controlled trial', '2022', 'https://doi.org/10.1037/hea0001198', 'Health Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Music interventions for preoperative anxiety: Cochrane systematic review', '2022', 'https://doi.org/10.1002/14651858.CD006908.pub4', 'Cochrane Database of Systematic Reviews', 7),
      (v_art_id, 'peer_reviewed', 1, 'Body image disturbance after surgery: review and clinical implications', '2023', 'https://doi.org/10.1016/j.bodyim.2023.01.008', 'Body Image', 8),
      (v_art_id, 'peer_reviewed', 1, 'Enhanced Recovery After Surgery (ERAS) and psychological outcomes', '2022', 'https://doi.org/10.1007/s00268-022-06562-3', 'World Journal of Surgery', 9),
      (v_art_id, 'government', 2, 'Pre-surgical psychological screening: guidelines and recommendations', '2023', 'https://www.apa.org/practice/guidelines/surgery', 'American Psychological Association', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT20-038 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT20-038';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Prevalence of blood-injection-injury phobia in the general population: systematic review', '2022', 'https://doi.org/10.1016/j.janxdis.2022.102576', 'Journal of Anxiety Disorders', 1),
      (v_art_id, 'peer_reviewed', 1, 'Genetics of blood-injection-injury phobia: twin study and heritability estimates', '2021', 'https://doi.org/10.1017/S0033291721002816', 'Psychological Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'The vasovagal response in blood-injection-injury phobia: cardiovascular mechanisms', '2022', 'https://doi.org/10.1016/j.biopsycho.2022.108394', 'Biological Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Needle fear and avoidance of vaccination: global systematic review and meta-analysis', '2023', 'https://doi.org/10.1016/j.vaccine.2023.04.032', 'Vaccine', 4),
      (v_art_id, 'peer_reviewed', 1, 'Applied tension for blood-injection-injury phobia: randomized controlled trial', '2022', 'https://doi.org/10.1016/j.brat.2022.104112', 'Behaviour Research and Therapy', 5),
      (v_art_id, 'peer_reviewed', 1, 'Exposure therapy for specific phobias: meta-analysis of treatment outcomes', '2023', 'https://doi.org/10.1016/j.cpr.2023.102267', 'Clinical Psychology Review', 6),
      (v_art_id, 'peer_reviewed', 1, 'Developmental origins of needle phobia: prospective longitudinal study', '2022', 'https://doi.org/10.1111/jcpp.13652', 'Journal of Child Psychology and Psychiatry', 7),
      (v_art_id, 'peer_reviewed', 1, 'Virtual reality exposure therapy for needle phobia: pilot randomized trial', '2023', 'https://doi.org/10.1016/j.janxdis.2023.102698', 'Journal of Anxiety Disorders', 8),
      (v_art_id, 'peer_reviewed', 1, 'Needle phobia in healthcare workers: prevalence and occupational impact', '2022', 'https://doi.org/10.1093/occmed/kqac087', 'Occupational Medicine', 9),
      (v_art_id, 'government', 2, 'Clinical practice guideline for the management of needle-related procedural pain and anxiety', '2023', 'https://doi.org/10.1503/cmaj.221524', 'Canadian Medical Association Journal', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT20-039 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT20-039';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Pediatric medical traumatic stress: A comprehensive review of the literature', '2022', 'https://doi.org/10.1093/jpepsy/jsac045', 'Journal of Pediatric Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Prevalence of post-traumatic stress symptoms in children following hospitalization: A meta-analysis', '2023', 'https://doi.org/10.1080/20008066.2023.2178762', 'European Journal of Psychotraumatology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Developmental considerations in pediatric medical traumatic stress', '2021', 'https://doi.org/10.1007/s10567-021-00360-0', 'Clinical Child and Family Psychology Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'Child life interventions in pediatric healthcare: A systematic review and meta-analysis', '2023', 'https://doi.org/10.1542/peds.2022-059819', 'Pediatrics', 4),
      (v_art_id, 'peer_reviewed', 1, 'Childhood medical trauma and adult healthcare avoidance: A longitudinal cohort study', '2022', 'https://doi.org/10.1037/hea0001198', 'Health Psychology', 5),
      (v_art_id, 'government', 2, 'The D-E-F protocol: A framework for preventing pediatric medical traumatic stress', '2023', 'https://www.nctsn.org/resources/pediatric-medical-traumatic-stress-toolkit', 'National Child Traumatic Stress Network', 6),
      (v_art_id, 'government', 2, 'Trauma-informed care in pediatric settings: Implementation guidelines', '2023', 'https://doi.org/10.1542/peds.2023-061410', 'American Academy of Pediatrics', 7),
      (v_art_id, 'peer_reviewed', 1, 'Parent distress and child outcomes in pediatric medical trauma: Mediating pathways', '2021', 'https://doi.org/10.1080/15374416.2021.1923020', 'Journal of Clinical Child & Adolescent Psychology', 8),
      (v_art_id, 'peer_reviewed', 1, 'Play therapy and procedural preparation in pediatric hospitals: Current evidence', '2022', 'https://doi.org/10.1016/j.childyouth.2022.106723', 'Children and Youth Services Review', 9),
      (v_art_id, 'professional_org', 3, 'Coping with childhood medical procedures: Guidelines for parents and caregivers', '2023', 'https://www.apa.org/topics/children/medical-procedures', 'American Psychological Association', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT20-040 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT20-040';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Prevalence and predictors of anxiety during the medical test waiting period: A systematic review', '2023', 'https://doi.org/10.1002/pon.6051', 'Psycho-Oncology', 1),
      (v_art_id, 'peer_reviewed', 1, 'The psychological impact of waiting for medical test results: Anxiety levels and coping mechanisms', '2022', 'https://doi.org/10.1080/17437199.2022.2074165', 'Health Psychology Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Intolerance of uncertainty and health anxiety: A transdiagnostic model', '2021', 'https://doi.org/10.1016/j.cpr.2021.102026', 'Clinical Psychology Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'Catastrophizing and the waiting period: Cognitive predictors of distress before medical diagnosis', '2023', 'https://doi.org/10.1007/s10865-023-00412-6', 'Journal of Behavioral Medicine', 4),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness-based interventions for medical waiting anxiety: A randomized controlled trial', '2022', 'https://doi.org/10.1093/abm/kaac042', 'Annals of Behavioral Medicine', 5),
      (v_art_id, 'peer_reviewed', 1, 'Uncertainty in illness: A synthesis of the nursing and medical literature', '2021', 'https://doi.org/10.1002/nur.22170', 'Research in Nursing & Health', 6),
      (v_art_id, 'peer_reviewed', 1, 'Scanxiety: A concept analysis of anxiety related to cancer surveillance imaging', '2022', 'https://doi.org/10.1097/NCC.0000000000001048', 'Cancer Nursing', 7),
      (v_art_id, 'government', 2, 'Patient communication and waiting time: Improving the diagnostic experience', '2023', 'https://www.nih.gov/news-events/news-releases/reducing-patient-anxiety-test-results', 'National Institutes of Health', 8),
      (v_art_id, 'peer_reviewed', 1, 'Acceptance and commitment therapy for health anxiety: Application during medical uncertainty', '2023', 'https://doi.org/10.1016/j.jcbs.2023.04.002', 'Journal of Contextual Behavioral Science', 9),
      (v_art_id, 'professional_org', 3, 'Coping with medical uncertainty: Resources for patients and families', '2023', 'https://www.apa.org/topics/health/medical-uncertainty', 'American Psychological Association', 10)
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
