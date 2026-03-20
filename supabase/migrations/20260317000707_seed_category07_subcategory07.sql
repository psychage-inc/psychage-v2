-- ============================================================================
-- Seed: Category 7 (Depression, Grief & Loss) — Subcategory 07
-- 10 articles: CAT07-061 through CAT07-070
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
  VALUES ('Treatment Recovery Moving Forward', 'treatment-recovery-moving-forward', v_cat_id, 7)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'treatment-recovery-moving-forward' AND category_id = v_cat_id;

  -- CAT07-061: CBT for Depression: How the Most-Studied Treatment Works
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'CBT for Depression: How the Most-Studied Treatment Works',
    'cbt-for-depression-how-it-works',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['CBT', 'Psychotherapy', 'Treatment', 'Evidence-Based', 'Depression'],
    2200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-061',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Cognitive-behavioral therapy (CBT) is the most extensively researched treatment for depression. Understanding how CBT identifies and changes thought patterns can help you decide if it',
    '/images/articles/cat07/cover-061.svg',
    10,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-062: Medication for Depression: SSRIs, SNRIs, and What You Need to Know
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Medication for Depression: SSRIs, SNRIs, and What You Need to Know',
    'medication-for-depression-ssris-snris',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Medication', 'Antidepressants', 'SSRIs', 'Treatment', 'Depression'],
    2400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-062',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Antidepressants are effective for moderate to severe depression. Understanding how they work, their side effects, and what to expect can help you make informed decisions about medication treatment.',
    '/images/articles/cat07/cover-062.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-063: Psychotherapy vs. Medication: What the Research Says About Combining Both
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Psychotherapy vs. Medication: What the Research Says About Combining Both',
    'psychotherapy-vs-medication-combining-both',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Treatment Comparison', 'Psychotherapy', 'Medication', 'Combined Treatment', 'Depression'],
    2000,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-063',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Should you choose therapy, medication, or both for depression? Research shows combined treatment often produces the best outcomes, especially for moderate to severe depression.',
    '/images/articles/cat07/cover-063.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-064: Emerging Treatments: Ketamine, TMS, and Psilocybin Research
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Emerging Treatments: Ketamine, TMS, and Psilocybin Research',
    'emerging-treatments-ketamine-tms-psilocybin',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Ketamine', 'TMS', 'Psilocybin', 'Treatment-Resistant Depression', 'Research'],
    2200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-064',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Beyond traditional antidepressants and therapy, new treatments for depression are showing remarkable promise. Learn about ketamine, TMS, psilocybin, and other cutting-edge interventions.',
    '/images/articles/cat07/cover-064.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-065: How Long Does Depression Treatment Take? Setting Realistic Expectations
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How Long Does Depression Treatment Take? Setting Realistic Expectations',
    'how-long-does-depression-treatment-take',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Treatment Timeline', 'Recovery', 'Expectations', 'Treatment Planning', 'Depression'],
    2000,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-065',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding the timeline for depression treatment—from initial improvement to full recovery and relapse prevention—helps you stay committed and recognize progress along the way.',
    '/images/articles/cat07/cover-065.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-066: Relapse Prevention: How to Stay Well After Recovery
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Relapse Prevention: How to Stay Well After Recovery',
    'relapse-prevention-staying-well-after-recovery',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Relapse Prevention', 'Recovery', 'Wellness', 'Self-Management', 'Depression'],
    1800,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-066',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Recovery from depression doesn',
    '/images/articles/cat07/cover-066.svg',
    7,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-067: Supporting Someone with Depression: A Guide for Partners, Family, and Friends
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Supporting Someone with Depression: A Guide for Partners, Family, and Friends',
    'supporting-someone-with-depression-guide',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Caregiving', 'Support', 'Family', 'Relationships', 'Depression'],
    1800,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-067',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Knowing how to help a loved one with depression—what to say, what to do, and what to avoid—can make a significant difference in their recovery while protecting your own wellbeing.',
    '/images/articles/cat07/cover-067.svg',
    6,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-068: When Someone You Love Is Depressed: How to Help Without Burning Out
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'When Someone You Love Is Depressed: How to Help Without Burning Out',
    'when-someone-you-love-is-depressed-helping-without-burnout',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Caregiver Burnout', 'Boundaries', 'Support', 'Self-Care', 'Depression'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-068',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Loving someone with depression while protecting your own mental health requires boundaries, self-care, and understanding when to seek additional support for both of you.',
    '/images/articles/cat07/cover-068.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-069: Recovery Is Not Linear: Understanding Setbacks on the Path Forward
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Recovery Is Not Linear: Understanding Setbacks on the Path Forward',
    'recovery-is-not-linear-understanding-setbacks',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Recovery', 'Setbacks', 'Progress', 'Resilience', 'Depression'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-069',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Setbacks don',
    '/images/articles/cat07/cover-069.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-070: Life After Depression: Rebuilding Meaning, Purpose, and Connection
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Life After Depression: Rebuilding Meaning, Purpose, and Connection',
    'life-after-depression-rebuilding-meaning-purpose-connection',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Recovery', 'Meaning', 'Purpose', 'Post-Depression Life', 'Resilience'],
    1800,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-070',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Recovery from depression isn',
    '/images/articles/cat07/cover-070.svg',
    6,
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

  -- === CAT07-061 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-061';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Cognitive Therapy for Depression: A Meta-Analysis of Randomized Controlled Trials', '2019', 'https://doi.org/10.1001/jamapsychiatry.2019.0285', 'JAMA Psychiatry', 1),
      (v_art_id, 'textbook', 5, 'Cognitive Behavior Therapy: Basics and Beyond', '2021', 'https://www.guilford.com/books/Cognitive-Behavior-Therapy/Judith-Beck/9781462544196', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'The Role of Cognitive Processes in the Development and Maintenance of Depression', '2020', 'https://doi.org/10.1016/j.cpr.2020.101836', 'Clinical Psychology Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'Behavioral Activation Treatment for Depression: A Systematic Review and Meta-Analysis', '2018', 'https://doi.org/10.1016/j.brat.2018.04.002', NULL, 4),
      (v_art_id, 'textbook', 5, 'Cognitive Therapy and the Emotional Disorders', '1976', 'https://doi.org/10.1037/0033-2909.95.3.429', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Comparative Efficacy of Cognitive Therapy and Pharmacotherapy in the Treatment of Depressed Outpatients', '1977', 'https://doi.org/10.1007/BF01173502', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Mechanisms of Change in Cognitive Therapy for Depression', '2020', 'https://doi.org/10.1176/appi.ajp.2020.19090921', 'American Journal of Psychiatry', 7),
      (v_art_id, 'clinical_guideline', 4, 'Internet-Delivered Cognitive Behavioural Therapy for Depression', '2021', 'https://doi.org/10.1002/14651858.CD012465.pub2', 'Cochrane Database of Systematic Reviews', 8),
      (v_art_id, 'peer_reviewed', 1, 'Number of Sessions and Patient Improvement in Cognitive Behavioral Therapy', '2019', 'https://doi.org/10.1037/ccp0000434', 'Journal of Consulting and Clinical Psychology', 9),
      (v_art_id, 'professional_org', 3, 'Cognitive Behavioral Therapy', '2023', 'https://www.nami.org/About-Mental-Illness/Treatments/Psychotherapy', NULL, 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-062 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-062';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Comparative Efficacy and Acceptability of 21 Antidepressant Drugs for the Acute Treatment of Adults with Major Depressive Disorder', '2018', 'https://doi.org/10.1016/S0140-6736(17)32802-7', NULL, 1),
      (v_art_id, 'professional_org', 3, 'Selective Serotonin Reuptake Inhibitors (SSRIs)', '2022', 'https://www.psychiatry.org/patients-families/depression/what-is-depression', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Antidepressant Treatment and Risk of Suicidality', '2020', 'https://doi.org/10.1001/jama.2020.0440', NULL, 3),
      (v_art_id, 'textbook', 5, 'Managing the Side Effects of Antidepressants', '2019', 'https://doi.org/10.1016/j.mayocp.2019.04.032', 'Mayo Clinic Proceedings', 4),
      (v_art_id, 'peer_reviewed', 1, 'Antidepressant Discontinuation Syndrome', '2019', 'https://doi.org/10.1370/afm.2336', 'Annals of Family Medicine', 5),
      (v_art_id, 'peer_reviewed', 1, 'Duration of Antidepressant Treatment: Clinical Recommendations', '2021', 'https://doi.org/10.1176/appi.ajp.2020.20091340', 'American Journal of Psychiatry', 6),
      (v_art_id, 'peer_reviewed', 1, 'Pharmacogenetic Testing in Psychiatry: A Review', '2020', 'https://doi.org/10.1002/cpt.1950', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Medication and Psychotherapy in the Treatment of Adult and Geriatric Depression', '2019', 'https://doi.org/10.4088/JCP.19r12736', 'Journal of Clinical Psychiatry', 8),
      (v_art_id, 'government', 2, 'Medications for Depression', '2023', 'https://www.nimh.nih.gov/health/topics/mental-health-medications', NULL, 9),
      (v_art_id, 'professional_org', 3, 'Antidepressant Medications: What You Need to Know', '2023', 'https://www.nami.org/About-Mental-Illness/Treatments/Mental-Health-Medications', NULL, 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-063 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-063';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Combination of Antidepressant Medication and Psychotherapy in the Treatment of Major Depressive Disorder: A Systematic Review and Meta-Analysis', '2022', 'https://doi.org/10.1001/jamapsychiatry.2022.1098', 'JAMA Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Psychotherapy Versus Second-Generation Antidepressants in the Treatment of Depression: A Meta-Analysis', '2019', 'https://doi.org/10.1503/jpn.180100', 'Journal of Psychiatry & Neuroscience', 2),
      (v_art_id, 'peer_reviewed', 1, 'Long-term Outcomes of Psychotherapy Versus Medication for Depression', '2020', 'https://doi.org/10.1016/j.cpr.2020.101868', 'Clinical Psychology Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'Sequenced Treatment Alternatives to Relieve Depression (STAR*D)', '2006', 'https://doi.org/10.1176/ajp.2006.163.11.1905', 'American Journal of Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Depression Severity and Treatment Modality: What Works for Whom?', '2021', 'https://doi.org/10.1016/j.jad.2020.11.110', 'Journal of Affective Disorders', 5),
      (v_art_id, 'peer_reviewed', 1, 'Patient Preferences for Depression Treatment', '2018', 'https://doi.org/10.1192/bjp.2018.42', 'British Journal of Psychiatry', 6),
      (v_art_id, 'peer_reviewed', 1, 'Cost-Effectiveness of Depression Treatments', '2020', 'https://doi.org/10.1377/hlthaff.2019.01407', NULL, 7),
      (v_art_id, 'clinical_guideline', 4, 'Treatment Guidelines for Major Depressive Disorder', '2010', 'https://psychiatryonline.org/pb/assets/raw/sitewide/practice_guidelines/guidelines/mdd.pdf', NULL, 8),
      (v_art_id, 'government', 2, 'Depression Treatment Options', '2023', 'https://www.nimh.nih.gov/health/topics/depression', NULL, 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-064 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-064';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Efficacy and Safety of Esketamine Nasal Spray for Treatment-Resistant Depression', '2020', 'https://doi.org/10.1001/jamapsychiatry.2019.3999', 'JAMA Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Transcranial Magnetic Stimulation for Depression: A Systematic Review and Meta-Analysis', '2021', 'https://doi.org/10.1001/jamapsychiatry.2021.0057', 'JAMA Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Psilocybin for Depression: A Randomized Controlled Trial', '2022', 'https://doi.org/10.1056/NEJMoa2206443', 'New England Journal of Medicine', 3),
      (v_art_id, 'peer_reviewed', 1, 'Electroconvulsive Therapy for Severe Depression: Efficacy and Safety', '2019', 'https://doi.org/10.1192/bjp.2018.256', 'British Journal of Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'MDMA-Assisted Psychotherapy for PTSD and Comorbid Depression', '2021', 'https://doi.org/10.1038/s41591-021-01336-3', 'Nature Medicine', 5),
      (v_art_id, 'peer_reviewed', 1, 'Brain Stimulation Therapies for Depression', '2020', 'https://doi.org/10.1176/appi.ajp.2020.19070720', 'American Journal of Psychiatry', 6),
      (v_art_id, 'peer_reviewed', 1, 'Rapid-Acting Antidepressants: Mechanisms and Clinical Implications', '2023', 'https://doi.org/10.1038/s41380-022-01890-6', 'Molecular Psychiatry', 7),
      (v_art_id, 'peer_reviewed', 1, 'Psychedelic Medicine: The Future of Psychiatric Treatment', '2022', 'https://doi.org/10.1038/s41386-022-01332-4', NULL, 8),
      (v_art_id, 'government', 2, 'Brain Stimulation Therapies', '2023', 'https://www.nimh.nih.gov/health/topics/brain-stimulation-therapies', NULL, 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-065 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-065';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Time Course of Response to Antidepressants', '2020', 'https://doi.org/10.4088/JCP.19r13166', 'Journal of Clinical Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive Therapy for Depression: Time to Response and Predictors of Outcome', '2019', 'https://doi.org/10.1016/j.brat.2019.03.014', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Duration of Continuation and Maintenance Therapy After Remission from Depression', '2021', 'https://doi.org/10.1001/jamapsychiatry.2021.0823', 'JAMA Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Early Improvement as a Predictor of Later Remission in Depression', '2018', 'https://doi.org/10.1017/S0033291718001332', 'Psychological Medicine', 4),
      (v_art_id, 'peer_reviewed', 1, 'Treatment-Resistant Depression: Definitions, Review of the Evidence, and Algorithmic Approach', '2020', 'https://doi.org/10.1016/j.jad.2019.10.039', 'Journal of Affective Disorders', 5),
      (v_art_id, 'peer_reviewed', 1, 'Relapse and Recurrence of Depression: A Practical Approach', '2019', 'https://doi.org/10.1177/2045125319870574', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Recovery from Depression: Behavioral and Neurobiological Changes', '2020', 'https://doi.org/10.1002/da.23063', NULL, 7),
      (v_art_id, 'professional_org', 3, 'Depression Treatment Timeline', '2023', 'https://www.nami.org/About-Mental-Illness/Treatments/Psychotherapy', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-066 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-066';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Relapse and Recurrence of Depression: A Review of Predictors and Prevention', '2020', 'https://doi.org/10.1016/j.jad.2020.01.171', 'Journal of Affective Disorders', 1),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive Therapy Prevents Relapse Better Than Medication: A Meta-Analysis', '2019', 'https://doi.org/10.1016/j.cpr.2019.03.002', 'Clinical Psychology Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Early Warning Signs of Relapse in Depression', '2018', 'https://doi.org/10.1111/bjc.12173', 'British Journal of Clinical Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Lifestyle Factors in Depression Relapse Prevention', '2021', 'https://doi.org/10.1016/j.psychres.2021.113975', 'Psychiatry Research', 4),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness-Based Cognitive Therapy for Depression Relapse Prevention', '2020', 'https://doi.org/10.1001/jamapsychiatry.2020.0437', 'JAMA Psychiatry', 5),
      (v_art_id, 'peer_reviewed', 1, 'Social Support and Depression Relapse', '2019', 'https://doi.org/10.1002/jclp.22743', 'Journal of Clinical Psychology', 6),
      (v_art_id, 'professional_org', 3, 'Relapse Prevention Planning', '2023', 'https://www.nami.org/About-Mental-Illness/Treatments/Recovery', NULL, 7)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-067 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-067';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The Role of Social Support in Depression Recovery', '2020', 'https://doi.org/10.1016/j.cpr.2020.101891', 'Clinical Psychology Review', 1),
      (v_art_id, 'peer_reviewed', 1, 'Supporting a Partner with Depression: Impact on Relationship Quality', '2019', 'https://doi.org/10.1037/fam0000513', 'Journal of Family Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'What Not to Say to Someone with Depression', '2018', 'https://doi.org/10.1016/j.jad.2018.08.069', 'Journal of Affective Disorders', 3),
      (v_art_id, 'peer_reviewed', 1, 'Family Involvement in Depression Treatment', '2020', 'https://doi.org/10.1176/appi.ajp.2020.19080826', 'American Journal of Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Caregiver Burden and Mental Health Outcomes', '2021', 'https://doi.org/10.1017/S0033291720004365', 'Psychological Medicine', 5),
      (v_art_id, 'professional_org', 3, 'Helping Someone with Depression', '2023', 'https://www.nami.org/Your-Journey/Family-Members-and-Caregivers/Supporting-Someone', NULL, 6)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-068 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-068';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Caregiver Burden in Partners of People with Depression', '2021', 'https://doi.org/10.1016/j.jad.2020.12.178', 'Journal of Affective Disorders', 1),
      (v_art_id, 'peer_reviewed', 1, 'Compassion Fatigue in Family Members of Individuals with Mental Illness', '2020', 'https://doi.org/10.1111/famp.12476', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Setting Boundaries in Close Relationships: Impact on Mental Health', '2019', 'https://doi.org/10.1016/j.cpr.2019.101737', 'Clinical Psychology Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'Couples Therapy for Depression: Efficacy and Mechanisms', '2020', 'https://doi.org/10.1111/jmft.12435', 'Journal of Marital and Family Therapy', 4),
      (v_art_id, 'professional_org', 3, 'Self-Care for Caregivers', '2023', 'https://www.nami.org/Your-Journey/Family-Members-and-Caregivers/Taking-Care-of-Yourself', NULL, 5)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-069 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-069';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Trajectories of Depression Recovery: Patterns and Predictors', '2021', 'https://doi.org/10.1016/j.jad.2021.03.067', 'Journal of Affective Disorders', 1),
      (v_art_id, 'peer_reviewed', 1, 'Response to Setbacks During Depression Recovery', '2020', 'https://doi.org/10.1016/j.cpr.2020.101832', 'Clinical Psychology Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Growth Mindset and Mental Health Recovery', '2019', 'https://doi.org/10.1002/jclp.22815', 'Journal of Clinical Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Self-Compassion in Mental Health Recovery', '2020', 'https://doi.org/10.1007/s12671-020-01345-6', NULL, 4),
      (v_art_id, 'professional_org', 3, 'Recovery from Depression', '2023', 'https://www.nami.org/About-Mental-Illness/Treatments/Recovery', NULL, 5)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-070 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-070';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Meaning in Life and Depression Recovery', '2020', 'https://doi.org/10.1002/jclp.22927', 'Journal of Clinical Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Purpose in Life as a Protective Factor Against Depression Relapse', '2021', 'https://doi.org/10.1016/j.jad.2021.01.040', 'Journal of Affective Disorders', 2),
      (v_art_id, 'peer_reviewed', 1, 'Social Connection and Mental Health Recovery', '2019', 'https://doi.org/10.1176/appi.ajp.2019.18091014', 'American Journal of Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Post-Traumatic Growth After Mental Illness', '2020', 'https://doi.org/10.1016/j.cpr.2020.101848', 'Clinical Psychology Review', 4),
      (v_art_id, 'peer_reviewed', 1, 'Values-Based Living and Wellbeing', '2019', 'https://doi.org/10.1016/j.jcbs.2019.09.001', 'Journal of Contextual Behavioral Science', 5),
      (v_art_id, 'professional_org', 3, 'Recovery and Wellbeing', '2023', 'https://www.nami.org/About-Mental-Illness/Treatments/Recovery', NULL, 6)
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
