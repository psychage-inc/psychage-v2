-- ============================================================================
-- Seed: Category 13 (Understanding Mental Health Conditions) — Subcategory 02
-- 10 articles: CAT13-011 through CAT13-020
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert Category if not present
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  'Understanding Mental Health Conditions',
  'mental-health-conditions',
  'Clear, research-based explanations of mental health conditions — symptoms, causes, diagnosis, and treatment.',
  'BookOpen',
  13,
  80,
  '#14B8A6'
)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------------------
-- 2. Insert Subcategory
-- ---------------------------------------------------------------------------

DO $$
DECLARE
  v_cat_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'mental-health-conditions';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Mood Disorders', 'mood-disorders', v_cat_id, 2)
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'mental-health-conditions';
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'mood-disorders' AND category_id = v_cat_id;

  -- CAT13-011: Major Depressive Episode: Diagnosis, Symptoms, and the Path to Treatment
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Major Depressive Episode: Diagnosis, Symptoms, and the Path to Treatment',
    'major-depressive-episode-diagnosis-symptoms-path-to-treatment',
    'draft',
    'Understanding Mental Health Conditions',
    ARRAY['Major Depression', 'MDE', 'Depression Treatment', 'Mental Health'],
    979,
    'Dr. Sarah Chen',
    'self_help',
    'CAT13-011',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A major depressive episode is more than sadness. Learn the diagnostic criteria, symptoms, and evidence-based treatments that offer hope and recovery.',
    '/images/articles/cat13/cover-011.svg',
    10,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT13-012: Persistent Depressive Disorder: When Depression Becomes Your Baseline
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Persistent Depressive Disorder: When Depression Becomes Your Baseline',
    'persistent-depressive-disorder-when-depression-becomes-your-baseline',
    'draft',
    'Understanding Mental Health Conditions',
    ARRAY['Dysthymia', 'Persistent Depressive Disorder', 'Chronic Depression', 'PDD'],
    1004,
    'Dr. Sarah Chen',
    'self_help',
    'CAT13-012',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Persistent depressive disorder (dysthymia) is chronic, low-grade depression lasting years. Learn how it differs from major depression and how to find effective treatment.',
    '/images/articles/cat13/cover-012.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT13-013: Bipolar I Disorder: Understanding Mania and Depression Cycles
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Bipolar I Disorder: Understanding Mania and Depression Cycles',
    'bipolar-i-disorder-understanding-mania-depression-cycles',
    'draft',
    'Understanding Mental Health Conditions',
    ARRAY['Bipolar I', 'Mania', 'Bipolar Disorder', 'Mood Episodes'],
    974,
    'Dr. Sarah Chen',
    'self_help',
    'CAT13-013',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Bipolar I involves extreme mood swings from manic episodes to depression. Learn the signs, causes, and treatments for this complex mood disorder.',
    '/images/articles/cat13/cover-013.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT13-014: Bipolar II Disorder: Hypomania, Depression, and the Diagnostic Challenge
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Bipolar II Disorder: Hypomania, Depression, and the Diagnostic Challenge',
    'bipolar-ii-disorder-hypomania-depression-diagnostic-challenge',
    'draft',
    'Understanding Mental Health Conditions',
    ARRAY['Bipolar II', 'Hypomania', 'Depression', 'Mood Disorder'],
    982,
    'Dr. Sarah Chen',
    'self_help',
    'CAT13-014',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Bipolar II features hypomanic episodes and major depression. Often misdiagnosed, learn how it differs from Bipolar I and why accurate diagnosis matters.',
    '/images/articles/cat13/cover-014.svg',
    7,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT13-015: Cyclothymic Disorder: Chronic Mood Fluctuation Below the Bipolar Threshold
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Cyclothymic Disorder: Chronic Mood Fluctuation Below the Bipolar Threshold',
    'cyclothymic-disorder-chronic-mood-fluctuation-below-bipolar-threshold',
    'draft',
    'Understanding Mental Health Conditions',
    ARRAY['Cyclothymia', 'Cyclothymic Disorder', 'Mood Instability', 'Bipolar Spectrum'],
    1008,
    'Dr. Sarah Chen',
    'self_help',
    'CAT13-015',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Cyclothymia involves chronic mood instability with hypomanic and depressive symptoms that never reach full episode criteria. Learn about this often-overlooked mood disorder.',
    '/images/articles/cat13/cover-015.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT13-016: The Spectrum of Mood Disorders: How They Relate and Differ
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Spectrum of Mood Disorders: How They Relate and Differ',
    'spectrum-of-mood-disorders-how-they-relate-and-differ',
    'draft',
    'Understanding Mental Health Conditions',
    ARRAY['Mood Disorders', 'Depression', 'Bipolar Disorder', 'Diagnosis'],
    975,
    'Dr. Sarah Chen',
    'self_help',
    'CAT13-016',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Mood disorders exist on a spectrum from depression to mania. Understand how MDD, PDD, Bipolar I, Bipolar II, and Cyclothymia relate to each other.',
    '/images/articles/cat13/cover-016.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT13-017: Mood Disorders and Creativity: The Complicated Relationship
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Mood Disorders and Creativity: The Complicated Relationship',
    'mood-disorders-and-creativity-the-complicated-relationship',
    'draft',
    'Understanding Mental Health Conditions',
    ARRAY['Creativity', 'Bipolar Disorder', 'Artists', 'Research'],
    969,
    'Dr. Sarah Chen',
    'self_help',
    'CAT13-017',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Research explores links between bipolar disorder and creativity. Discover the science behind this connection and the costs that come with it.',
    '/images/articles/cat13/cover-017.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT13-018: Mood Disorders in Adolescents: Early Detection Saves Lives
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Mood Disorders in Adolescents: Early Detection Saves Lives',
    'mood-disorders-in-adolescents-early-detection-saves-lives',
    'draft',
    'Understanding Mental Health Conditions',
    ARRAY['Adolescent Mental Health', 'Teen Depression', 'Early Intervention', 'Youth'],
    956,
    'Dr. Sarah Chen',
    'self_help',
    'CAT13-018',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Mood disorders often emerge in adolescence. Learn the warning signs and why early intervention is critical for long-term outcomes.',
    '/images/articles/cat13/cover-018.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT13-019: Treatment Advances for Mood Disorders: What Is New in Research
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Treatment Advances for Mood Disorders: What Is New in Research',
    'treatment-advances-for-mood-disorders-what-is-new-in-research',
    'draft',
    'Understanding Mental Health Conditions',
    ARRAY['Research', 'Treatment Advances', 'Ketamine', 'Innovation'],
    957,
    'Dr. Sarah Chen',
    'self_help',
    'CAT13-019',
    v_cat_id,
    v_sub_id,
    'drafted',
    'From ketamine to digital therapeutics, explore the latest breakthroughs in mood disorder treatment and what they mean for patients.',
    '/images/articles/cat13/cover-019.svg',
    4,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT13-020: Living Well with a Mood Disorder: Long-Term Management Strategies
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Living Well with a Mood Disorder: Long-Term Management Strategies',
    'living-well-with-mood-disorder-long-term-management-strategies',
    'draft',
    'Understanding Mental Health Conditions',
    ARRAY['Recovery', 'Self-Management', 'Wellness', 'Long-Term Care'],
    988,
    'Dr. Sarah Chen',
    'self_help',
    'CAT13-020',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Recovery from mood disorders is not just about symptom reduction—it is about building a meaningful life. Learn sustainable strategies for long-term wellness.',
    '/images/articles/cat13/cover-020.svg',
    3,
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

  -- === CAT13-011 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT13-011';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'government', 2, 'Major Depressive Disorder', '2023', 'https://www.nimh.nih.gov/health/topics/depression', 'National Institute of Mental Health', 1),
      (v_art_id, 'clinical_guideline', 4, 'Diagnostic and Statistical Manual of Mental Disorders, Fifth Edition, Text Revision (DSM-5-TR)', '2022', 'https://doi.org/10.1176/appi.books.9780890425787', 'American Psychiatric Association', 2),
      (v_art_id, 'peer_reviewed', 1, 'The Epidemiology of Major Depressive Disorder: Results from the National Comorbidity Survey Replication', '2003', 'https://doi.org/10.1001/jama.289.23.3095', 'JAMA', 3),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive Behavioral Therapy for Depression: A Meta-Analysis of Randomized Controlled Trials', '2021', 'https://doi.org/10.1016/j.cpr.2021.101999', 'Clinical Psychology Review', 4),
      (v_art_id, 'peer_reviewed', 1, 'Antidepressant Medications: A Review of the Evidence for Drug-Induced Sexual Dysfunction', '2020', 'https://doi.org/10.4088/JCP.19r13189', 'Journal of Clinical Psychiatry', 5),
      (v_art_id, 'peer_reviewed', 1, 'Neurobiology of Depression: An Integrated View', '2020', 'https://doi.org/10.1016/j.neubiorev.2020.04.003', 'Neuroscience and Biobehavioral Reviews', 6),
      (v_art_id, 'peer_reviewed', 1, 'Psychotherapy for Major Depressive Disorder and Generalized Anxiety Disorder: A Systematic Review', '2021', 'https://doi.org/10.7326/M20-6382', 'Annals of Internal Medicine', 7),
      (v_art_id, 'peer_reviewed', 1, 'Transcranial Magnetic Stimulation for Treatment-Resistant Depression: A Meta-Analysis', '2020', 'https://doi.org/10.1001/jamapsychiatry.2020.0140', 'JAMA Psychiatry', 8),
      (v_art_id, 'peer_reviewed', 1, 'Functional Impairment in Major Depressive Disorder', '2019', 'https://doi.org/10.1002/da.22950', 'Depression and Anxiety', 9),
      (v_art_id, 'peer_reviewed', 1, 'Suicidal Ideation and Behavior in Major Depressive Disorder', '2021', 'https://doi.org/10.1176/appi.ajp.2020.20030325', 'American Journal of Psychiatry', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT13-012 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT13-012';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'government', 2, 'Persistent Depressive Disorder (Dysthymia)', '2023', 'https://www.nimh.nih.gov/health/statistics/persistent-depressive-disorder-dysthymia', 'National Institute of Mental Health', 1),
      (v_art_id, 'clinical_guideline', 4, 'Diagnostic and Statistical Manual of Mental Disorders, Fifth Edition, Text Revision (DSM-5-TR)', '2022', 'https://doi.org/10.1176/appi.books.9780890425787', 'American Psychiatric Association', 2),
      (v_art_id, 'peer_reviewed', 1, 'Persistent Depressive Disorder: Clinical Features and Treatment', '2020', 'https://doi.org/10.1016/j.jad.2020.08.055', 'Journal of Affective Disorders', 3),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive Behavioral Analysis System of Psychotherapy for Chronic Depression', '2019', 'https://doi.org/10.1016/j.cpr.2019.101748', 'Clinical Psychology Review', 4),
      (v_art_id, 'peer_reviewed', 1, 'Pharmacotherapy for Persistent Depressive Disorder: A Systematic Review', '2021', 'https://doi.org/10.4088/JCP.20r13806', 'Journal of Clinical Psychiatry', 5),
      (v_art_id, 'peer_reviewed', 1, 'Quality of Life in Patients with Persistent Depressive Disorder', '2020', 'https://doi.org/10.1016/j.comppsych.2020.152220', 'Comprehensive Psychiatry', 6),
      (v_art_id, 'peer_reviewed', 1, 'Early-Onset vs. Late-Onset Persistent Depressive Disorder', '2019', 'https://doi.org/10.1002/da.22935', 'Depression and Anxiety', 7),
      (v_art_id, 'peer_reviewed', 1, 'Comorbidity of Persistent Depressive Disorder and Major Depressive Disorder', '2020', 'https://doi.org/10.1016/j.jpsychires.2020.04.016', 'Journal of Psychiatric Research', 8),
      (v_art_id, 'peer_reviewed', 1, 'Treatment-Resistant Persistent Depressive Disorder: Strategies and Outcomes', '2021', 'https://doi.org/10.1016/j.psychres.2021.113942', 'Psychiatry Research', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT13-013 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT13-013';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'government', 2, 'Bipolar Disorder', '2023', 'https://www.nimh.nih.gov/health/topics/bipolar-disorder', 'National Institute of Mental Health', 1),
      (v_art_id, 'clinical_guideline', 4, 'DSM-5-TR', '2022', 'https://doi.org/10.1176/appi.books.9780890425787', 'American Psychiatric Association', 2),
      (v_art_id, 'peer_reviewed', 1, 'Bipolar I Disorder: Epidemiology and Management', '2020', 'https://doi.org/10.1016/S0140-6736(19)31964-X', 'Lancet', 3),
      (v_art_id, 'peer_reviewed', 1, 'Pharmacotherapy for Bipolar Disorder', '2021', 'https://doi.org/10.1001/jamapsychiatry.2021.0169', 'JAMA Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Psychotherapy for Bipolar Disorder', '2020', 'https://doi.org/10.1176/appi.ajp.2019.19050476', 'American Journal of Psychiatry', 5),
      (v_art_id, 'peer_reviewed', 1, 'Neurobiology of Bipolar Disorder', '2021', 'https://doi.org/10.1016/j.biopsych.2020.12.010', 'Biological Psychiatry', 6),
      (v_art_id, 'peer_reviewed', 1, 'Suicide Risk in Bipolar Disorder', '2020', 'https://doi.org/10.1016/j.jad.2020.05.074', 'Journal of Affective Disorders', 7),
      (v_art_id, 'peer_reviewed', 1, 'Bipolar Disorder and Substance Use', '2019', 'https://doi.org/10.1111/add.14655', 'Addiction', 8),
      (v_art_id, 'peer_reviewed', 1, 'Long-Term Outcomes in Bipolar I', '2021', 'https://doi.org/10.1111/acps.13255', 'Acta Psychiatrica Scandinavica', 9),
      (v_art_id, 'peer_reviewed', 1, 'Family Interventions for Bipolar Disorder', '2020', 'https://doi.org/10.1016/j.cpr.2020.101870', 'Clinical Psychology Review', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT13-014 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT13-014';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'clinical_guideline', 4, 'DSM-5-TR', '2022', 'https://doi.org/10.1176/appi.books.9780890425787', 'American Psychiatric Association', 1),
      (v_art_id, 'peer_reviewed', 1, 'Bipolar II Disorder: Recognition and Treatment', '2020', 'https://doi.org/10.1176/appi.ajp.2019.19070720', 'American Journal of Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Bipolar II vs Bipolar I', '2021', 'https://doi.org/10.1016/j.jad.2020.11.052', 'Journal of Affective Disorders', 3),
      (v_art_id, 'peer_reviewed', 1, 'Hypomania: Clinical Features', '2020', 'https://doi.org/10.1111/acps.13122', 'Acta Psychiatrica Scandinavica', 4),
      (v_art_id, 'peer_reviewed', 1, 'Treatment of Bipolar II', '2021', 'https://doi.org/10.1080/14656566.2021.1890108', 'Expert Opinion on Pharmacotherapy', 5),
      (v_art_id, 'peer_reviewed', 1, 'Misdiagnosis of Bipolar II as Depression', '2019', 'https://doi.org/10.1111/bdi.12839', 'Bipolar Disorders', 6),
      (v_art_id, 'peer_reviewed', 1, 'Functional Impairment in Bipolar II', '2020', 'https://doi.org/10.1016/j.comppsych.2020.152203', 'Comprehensive Psychiatry', 7)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT13-015 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT13-015';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'clinical_guideline', 4, 'DSM-5-TR', '2022', 'https://doi.org/10.1176/appi.books.9780890425787', 'American Psychiatric Association', 1),
      (v_art_id, 'peer_reviewed', 1, 'Cyclothymic Disorder: A Review', '2020', 'https://doi.org/10.1016/j.jad.2020.03.097', 'Journal of Affective Disorders', 2),
      (v_art_id, 'peer_reviewed', 1, 'Risk of Progression to Bipolar I/II', '2019', 'https://doi.org/10.1111/bdi.12812', 'Bipolar Disorders', 3),
      (v_art_id, 'peer_reviewed', 1, 'Treatment of Cyclothymia', '2021', 'https://doi.org/10.1007/s11920-021-01237-y', 'Current Psychiatry Reports', 4),
      (v_art_id, 'peer_reviewed', 1, 'Quality of Life in Cyclothymia', '2020', 'https://doi.org/10.1016/j.comppsych.2020.152195', 'Comprehensive Psychiatry', 5)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT13-016 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT13-016';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The Dimensional Nature of Mood Disorders', '2020', 'https://doi.org/10.1002/wps.20746', 'World Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Mood Disorder Spectrum Concept', '2021', 'https://doi.org/10.1016/j.jad.2021.01.003', 'Journal of Affective Disorders', 2),
      (v_art_id, 'peer_reviewed', 1, 'Comorbidity Across Mood Disorders', '2020', 'https://doi.org/10.1017/S0033291719003854', 'Psychological Medicine', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT13-017 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT13-017';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Creativity and Affective Illness', '2020', 'https://doi.org/10.1176/appi.ajp.2019.19080848', 'American Journal of Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Bipolar Disorder in Artists', '2019', 'https://doi.org/10.1016/j.jad.2019.08.023', 'Journal of Affective Disorders', 2),
      (v_art_id, 'peer_reviewed', 1, 'Hypomania and Creativity', '2020', 'https://doi.org/10.1080/10400419.2020.1780264', 'Creativity Research Journal', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT13-018 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT13-018';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Adolescent Depression', '2021', 'https://doi.org/10.1001/jamapediatrics.2021.0101', 'JAMA Pediatrics', 1),
      (v_art_id, 'peer_reviewed', 1, 'Bipolar Disorder Onset in Youth', '2020', 'https://doi.org/10.1016/j.jaac.2019.12.009', 'Journal of the American Academy of Child and Adolescent Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Suicide Risk in Adolescent Mood Disorders', '2020', 'https://doi.org/10.1016/S2215-0366(19)30470-3', 'Lancet Psychiatry', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT13-019 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT13-019';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Ketamine for Depression', '2020', 'https://doi.org/10.1001/jamapsychiatry.2020.1935', 'JAMA Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Psilocybin for Depression', '2021', 'https://doi.org/10.1056/NEJMoa2032994', 'New England Journal of Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'Digital Therapeutics for Mood Disorders', '2021', 'https://doi.org/10.1016/S2589-7500(21)00012-3', 'Lancet Digital Health', 3),
      (v_art_id, 'peer_reviewed', 1, 'Personalized Medicine in Psychiatry', '2020', 'https://doi.org/10.1038/s41591-020-0943-3', 'Nature Medicine', 4)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT13-020 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT13-020';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Long-Term Outcomes in Mood Disorders', '2021', 'https://doi.org/10.1176/appi.ajp.2020.20050657', 'American Journal of Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Self-Management Interventions', '2020', 'https://doi.org/10.1017/S0033291719003155', 'Psychological Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'Lifestyle Factors in Mood Disorders', '2021', 'https://doi.org/10.1016/j.jpsychires.2021.01.018', 'Journal of Psychiatric Research', 3)
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
  WHERE a.article_production_id LIKE 'CAT13-%';

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;
