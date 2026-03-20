-- ============================================================================
-- Seed: Category 13 (Understanding Mental Health Conditions) — Subcategory 01
-- 10 articles: CAT13-001 through CAT13-010
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
  VALUES ('Anxiety Disorders', 'anxiety-disorders', v_cat_id, 1)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'anxiety-disorders' AND category_id = v_cat_id;

  -- CAT13-001: Generalized Anxiety Disorder: Living with Chronic Worry
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Generalized Anxiety Disorder: Living with Chronic Worry',
    'generalized-anxiety-disorder-living-with-chronic-worry',
    'draft',
    'Understanding Mental Health Conditions',
    ARRAY['Generalized Anxiety Disorder', 'GAD', 'Chronic Worry', 'Anxiety Treatment'],
    1015,
    'Dr. Sarah Chen',
    'self_help',
    'CAT13-001',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding GAD — the persistent, excessive worry that affects millions. Learn about symptoms, causes, diagnosis, and evidence-based treatments for this common anxiety disorder.',
    '/images/articles/cat13/cover-001.svg',
    10,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT13-002: Social Anxiety Disorder: When Fear of Judgment Becomes Disabling
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Social Anxiety Disorder: When Fear of Judgment Becomes Disabling',
    'social-anxiety-disorder-when-fear-of-judgment-becomes-disabling',
    'draft',
    'Understanding Mental Health Conditions',
    ARRAY['Social Anxiety', 'Social Phobia', 'Performance Anxiety', 'CBT'],
    982,
    'Dr. Sarah Chen',
    'self_help',
    'CAT13-002',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Social anxiety disorder goes beyond shyness. Understand the symptoms, causes, and evidence-based treatments that help people reclaim their social lives.',
    '/images/articles/cat13/cover-002.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT13-003: Panic Disorder: Understanding Recurrent Panic Attacks
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Panic Disorder: Understanding Recurrent Panic Attacks',
    'panic-disorder-understanding-recurrent-panic-attacks',
    'draft',
    'Understanding Mental Health Conditions',
    ARRAY['Panic Disorder', 'Panic Attacks', 'Agoraphobia', 'Anxiety'],
    966,
    'Dr. Sarah Chen',
    'self_help',
    'CAT13-003',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Panic attacks are terrifying. Learn what panic disorder is, why it happens, and how evidence-based treatments can help you regain control.',
    '/images/articles/cat13/cover-003.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT13-004: Specific Phobias: When Fear Becomes Disproportionate
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Specific Phobias: When Fear Becomes Disproportionate',
    'specific-phobias-when-fear-becomes-disproportionate',
    'draft',
    'Understanding Mental Health Conditions',
    ARRAY['Phobias', 'Specific Phobia', 'Exposure Therapy', 'Fear'],
    994,
    'Dr. Sarah Chen',
    'self_help',
    'CAT13-004',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Specific phobias are intense, irrational fears of particular objects or situations. Learn about the types, causes, and highly effective exposure-based treatments.',
    '/images/articles/cat13/cover-004.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT13-005: Agoraphobia: When Avoiding Panic Shrinks Your World
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Agoraphobia: When Avoiding Panic Shrinks Your World',
    'agoraphobia-when-avoiding-panic-shrinks-your-world',
    'draft',
    'Understanding Mental Health Conditions',
    ARRAY['Agoraphobia', 'Panic Disorder', 'Avoidance', 'Exposure Therapy'],
    985,
    'Dr. Sarah Chen',
    'self_help',
    'CAT13-005',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Agoraphobia is more than fear of open spaces. Learn how this complex anxiety disorder develops and how to regain freedom through evidence-based treatment.',
    '/images/articles/cat13/cover-005.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT13-006: Separation Anxiety in Adults: When Distance from Loved Ones Triggers Fear
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Separation Anxiety in Adults: When Distance from Loved Ones Triggers Fear',
    'separation-anxiety-in-adults-when-distance-from-loved-ones-triggers-fear',
    'draft',
    'Understanding Mental Health Conditions',
    ARRAY['Separation Anxiety', 'Adult Separation Anxiety', 'Attachment', 'Anxiety'],
    974,
    'Dr. Sarah Chen',
    'self_help',
    'CAT13-006',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Separation anxiety is not just for children. Learn how this condition manifests in adults, why it develops, and how to build secure independence.',
    '/images/articles/cat13/cover-006.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT13-007: Selective Mutism: When Anxiety Silences Speech
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Selective Mutism: When Anxiety Silences Speech',
    'selective-mutism-when-anxiety-silences-speech',
    'draft',
    'Understanding Mental Health Conditions',
    ARRAY['Selective Mutism', 'Childhood Anxiety', 'Social Anxiety', 'Speech'],
    1002,
    'Dr. Sarah Chen',
    'self_help',
    'CAT13-007',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Selective mutism is a childhood anxiety disorder where children cannot speak in certain situations despite speaking freely at home. Learn about diagnosis and treatment.',
    '/images/articles/cat13/cover-007.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT13-008: How Anxiety Disorders Overlap: Comorbidity and Shared Mechanisms
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How Anxiety Disorders Overlap: Comorbidity and Shared Mechanisms',
    'how-anxiety-disorders-overlap-comorbidity-and-shared-mechanisms',
    'draft',
    'Understanding Mental Health Conditions',
    ARRAY['Anxiety Disorders', 'Comorbidity', 'Neuroscience', 'Research'],
    974,
    'Dr. Sarah Chen',
    'self_help',
    'CAT13-008',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Anxiety disorders rarely occur in isolation. Explore how they overlap, share underlying mechanisms, and what this means for treatment approaches.',
    '/images/articles/cat13/cover-008.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT13-009: Anxiety Disorders in Children: Early Signs and Early Intervention
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Anxiety Disorders in Children: Early Signs and Early Intervention',
    'anxiety-disorders-in-children-early-signs-and-early-intervention',
    'draft',
    'Understanding Mental Health Conditions',
    ARRAY['Childhood Anxiety', 'Early Intervention', 'Parenting', 'Child Development'],
    982,
    'Dr. Sarah Chen',
    'self_help',
    'CAT13-009',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Childhood anxiety is more than typical worries. Learn to recognize the signs, understand the causes, and access effective early intervention strategies.',
    '/images/articles/cat13/cover-009.svg',
    7,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT13-010: The Neurobiology of Anxiety Disorders: What Happens in the Brain
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Neurobiology of Anxiety Disorders: What Happens in the Brain',
    'the-neurobiology-of-anxiety-disorders-what-happens-in-the-brain',
    'draft',
    'Understanding Mental Health Conditions',
    ARRAY['Neuroscience', 'Anxiety', 'Brain', 'Research'],
    993,
    'Dr. Sarah Chen',
    'self_help',
    'CAT13-010',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the brain circuits, neurotransmitters, and genetic factors underlying anxiety disorders. Understand the science behind why anxiety feels the way it does.',
    '/images/articles/cat13/cover-010.svg',
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

  -- === CAT13-001 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT13-001';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'reference', 5, 'Generalized Anxiety Disorder: Epidemiology, Pathogenesis, Clinical Manifestations, Course, Assessment, and Diagnosis', '2023', 'https://www.uptodate.com/contents/generalized-anxiety-disorder-epidemiology-pathogenesis', 'UpToDate', 1),
      (v_art_id, 'government', 2, 'Generalized Anxiety Disorder', '2023', 'https://www.nimh.nih.gov/health/topics/generalized-anxiety-disorder-gad', 'National Institute of Mental Health', 2),
      (v_art_id, 'peer_reviewed', 1, 'Prevalence, Severity, and Comorbidity of 12-Month DSM-IV Disorders in the National Comorbidity Survey Replication', '2005', 'https://doi.org/10.1001/archpsyc.62.6.617', 'Archives of General Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'The Role of Intolerance of Uncertainty in Generalized Anxiety Disorder', '2019', 'https://doi.org/10.1080/16506073.2019.1576595', 'Cognitive Behaviour Therapy', 4),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive Behavioral Therapy for Anxiety Disorders: An Update on the Empirical Evidence', '2011', 'https://doi.org/10.31887/DCNS.2011.13.4/dstein', 'Dialogues in Clinical Neuroscience', 5),
      (v_art_id, 'peer_reviewed', 1, 'The Neurobiology of Generalized Anxiety Disorder: A Focus on the Amygdala and Prefrontal Cortex', '2020', 'https://doi.org/10.1016/j.jad.2020.02.047', 'Journal of Affective Disorders', 6),
      (v_art_id, 'peer_reviewed', 1, 'Pharmacotherapy for Generalized Anxiety Disorder in Adults', '2022', 'https://doi.org/10.1136/bmj-2021-069443', 'BMJ', 7),
      (v_art_id, 'clinical_guideline', 4, 'Diagnostic and Statistical Manual of Mental Disorders, Fifth Edition, Text Revision (DSM-5-TR)', '2022', 'https://doi.org/10.1176/appi.books.9780890425787', 'American Psychiatric Association', 8),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness-Based Therapy for Generalized Anxiety Disorder: A Systematic Review and Meta-Analysis', '2022', 'https://doi.org/10.1001/jamapsychiatry.2022.3679', 'JAMA Psychiatry', 9),
      (v_art_id, 'peer_reviewed', 1, 'Quality of Life in Patients with Generalized Anxiety Disorder', '2018', 'https://doi.org/10.4088/JCP.17r11587', 'Journal of Clinical Psychiatry', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT13-002 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT13-002';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'clinical_guideline', 4, 'Social Anxiety Disorder: Recognition, Assessment and Treatment', '2022', 'https://www.nice.org.uk/guidance/cg159', 'National Institute for Health and Care Excellence (NICE)', 1),
      (v_art_id, 'government', 2, 'Social Anxiety Disorder', '2023', 'https://www.nimh.nih.gov/health/topics/social-anxiety-disorder', 'National Institute of Mental Health', 2),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive Behavioral Therapy for Social Anxiety Disorder: Evidence-Based and Disorder-Specific Treatment Techniques', '2020', 'https://doi.org/10.1002/jclp.22917', 'Journal of Clinical Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'The Neurobiology of Social Anxiety Disorder', '2019', 'https://doi.org/10.4088/JCP.18ac12668', 'Journal of Clinical Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Developmental Pathways to Social Anxiety: Behavioral Inhibition and Parenting', '2018', 'https://doi.org/10.1016/j.cpr.2018.05.002', 'Clinical Psychology Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'Pharmacotherapy for Social Anxiety Disorder: A Systematic Review', '2021', 'https://doi.org/10.1080/14656566.2021.1955851', 'Expert Opinion on Pharmacotherapy', 6),
      (v_art_id, 'peer_reviewed', 1, 'Virtual Reality Exposure Therapy for Social Anxiety Disorder: A Meta-Analysis', '2022', 'https://doi.org/10.1016/j.brat.2022.104110', 'Behaviour Research and Therapy', 7),
      (v_art_id, 'clinical_guideline', 4, 'Diagnostic and Statistical Manual of Mental Disorders, Fifth Edition, Text Revision (DSM-5-TR)', '2022', 'https://doi.org/10.1176/appi.books.9780890425787', 'American Psychiatric Association', 8),
      (v_art_id, 'peer_reviewed', 1, 'Social Anxiety Disorder and Employment: A Review', '2020', 'https://doi.org/10.1016/j.janxdis.2020.102244', 'Journal of Anxiety Disorders', 9),
      (v_art_id, 'peer_reviewed', 1, 'Comorbidity of Social Anxiety Disorder and Depression: Clinical Implications', '2019', 'https://doi.org/10.1002/da.22943', 'Depression and Anxiety', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT13-003 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT13-003';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'government', 2, 'Panic Disorder', '2023', 'https://www.nimh.nih.gov/health/topics/panic-disorder', 'National Institute of Mental Health', 1),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive Behavioral Therapy for Panic Disorder: A Meta-Analysis', '2020', 'https://doi.org/10.1017/S0033291719003167', 'Psychological Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'The Neurobiology of Panic Disorder: Focus on the Fear Network', '2021', 'https://doi.org/10.1016/j.jad.2021.03.052', 'Journal of Affective Disorders', 3),
      (v_art_id, 'peer_reviewed', 1, 'Interoceptive Exposure for Panic Disorder: A Systematic Review', '2019', 'https://doi.org/10.1016/j.cpr.2019.05.001', 'Clinical Psychology Review', 4),
      (v_art_id, 'peer_reviewed', 1, 'Pharmacotherapy for Panic Disorder with or without Agoraphobia', '2020', 'https://doi.org/10.1002/14651858.CD004364.pub4', 'The Cochrane Database of Systematic Reviews', 5),
      (v_art_id, 'clinical_guideline', 4, 'Diagnostic and Statistical Manual of Mental Disorders, Fifth Edition, Text Revision (DSM-5-TR)', '2022', 'https://doi.org/10.1176/appi.books.9780890425787', 'American Psychiatric Association', 6),
      (v_art_id, 'peer_reviewed', 1, 'Panic Disorder and Cardiovascular Disease: A Review of the Evidence', '2018', 'https://doi.org/10.1016/j.genhosppsych.2018.03.001', 'General Hospital Psychiatry', 7),
      (v_art_id, 'peer_reviewed', 1, 'The Role of Catastrophic Misinterpretation in Panic Disorder', '2019', 'https://doi.org/10.1016/j.brat.2019.05.008', 'Behaviour Research and Therapy', 8),
      (v_art_id, 'peer_reviewed', 1, 'Quality of Life in Patients with Panic Disorder', '2020', 'https://doi.org/10.1016/j.jpsychires.2020.08.033', 'Journal of Psychiatric Research', 9),
      (v_art_id, 'peer_reviewed', 1, 'Panic Disorder in Primary Care: Detection and Treatment', '2021', 'https://doi.org/10.4088/JCP.20m13890', 'Journal of Clinical Psychiatry', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT13-004 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT13-004';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'government', 2, 'Specific Phobia', '2023', 'https://www.nimh.nih.gov/health/statistics/specific-phobia', 'National Institute of Mental Health', 1),
      (v_art_id, 'clinical_guideline', 4, 'Diagnostic and Statistical Manual of Mental Disorders, Fifth Edition, Text Revision (DSM-5-TR)', '2022', 'https://doi.org/10.1176/appi.books.9780890425787', 'American Psychiatric Association', 2),
      (v_art_id, 'peer_reviewed', 1, 'Exposure Therapy for Specific Phobias: A Meta-Analysis', '2020', 'https://doi.org/10.1016/j.cpr.2020.101862', 'Clinical Psychology Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'Virtual Reality Exposure Therapy for Phobias: A Systematic Review', '2021', 'https://doi.org/10.1016/j.janxdis.2021.102394', 'Journal of Anxiety Disorders', 4),
      (v_art_id, 'peer_reviewed', 1, 'The Evolutionary Origins of Fear: An Examination of Prepared Learning', '2019', 'https://doi.org/10.1177/1474704919868492', 'Evolutionary Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'One-Session Treatment for Specific Phobias: A Review', '2018', 'https://doi.org/10.1016/j.brat.2018.08.003', 'Behaviour Research and Therapy', 6),
      (v_art_id, 'peer_reviewed', 1, 'Blood-Injection-Injury Phobia: Unique Characteristics and Treatment', '2020', 'https://doi.org/10.1016/j.jbtep.2020.101616', 'Journal of Behavior Therapy and Experimental Psychiatry', 7),
      (v_art_id, 'peer_reviewed', 1, 'Fear of Flying: Prevalence and Cognitive-Behavioral Treatment Outcomes', '2019', 'https://doi.org/10.1002/cpp.2351', 'Clinical Psychology and Psychotherapy', 8),
      (v_art_id, 'peer_reviewed', 1, 'Emetophobia: A Review of the Current Literature', '2021', 'https://doi.org/10.1016/j.cpr.2021.102043', 'Clinical Psychology Review', 9),
      (v_art_id, 'peer_reviewed', 1, 'Pharmacotherapy for Specific Phobias: Limited Evidence and Clinical Considerations', '2020', 'https://doi.org/10.1080/14656566.2020.1817381', 'Expert Opinion on Pharmacotherapy', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT13-005 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT13-005';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'government', 2, 'Agoraphobia', '2023', 'https://www.nimh.nih.gov/health/statistics/agoraphobia', 'National Institute of Mental Health', 1),
      (v_art_id, 'clinical_guideline', 4, 'Diagnostic and Statistical Manual of Mental Disorders, Fifth Edition, Text Revision (DSM-5-TR)', '2022', 'https://doi.org/10.1176/appi.books.9780890425787', 'American Psychiatric Association', 2),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive Behavioral Therapy for Agoraphobia: A Meta-Analytic Review', '2020', 'https://doi.org/10.1016/j.janxdis.2020.102250', 'Journal of Anxiety Disorders', 3),
      (v_art_id, 'peer_reviewed', 1, 'The Role of Safety Behaviors in Maintaining Agoraphobia', '2019', 'https://doi.org/10.1016/j.brat.2019.103421', 'Behaviour Research and Therapy', 4),
      (v_art_id, 'peer_reviewed', 1, 'Agoraphobia: The Role of Interoceptive Fear and Avoidance', '2021', 'https://doi.org/10.1016/j.cpr.2021.102056', 'Clinical Psychology Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'Pharmacological Treatment of Agoraphobia: A Systematic Review', '2020', 'https://doi.org/10.1080/14656566.2020.1803279', 'Expert Opinion on Pharmacotherapy', 6),
      (v_art_id, 'peer_reviewed', 1, 'Functional Impairment in Agoraphobia: A Review', '2019', 'https://doi.org/10.1017/S0033291719001053', 'Psychological Medicine', 7),
      (v_art_id, 'peer_reviewed', 1, 'Agoraphobia Without History of Panic Disorder: Clinical Features and Treatment Outcomes', '2020', 'https://doi.org/10.1016/j.jad.2020.07.115', 'Journal of Affective Disorders', 8),
      (v_art_id, 'peer_reviewed', 1, 'Exposure Therapy for Agoraphobia: In Vivo versus Virtual Reality', '2021', 'https://doi.org/10.1016/j.brat.2021.103937', 'Behaviour Research and Therapy', 9),
      (v_art_id, 'peer_reviewed', 1, 'Quality of Life in Patients with Agoraphobia: Impact and Recovery', '2020', 'https://doi.org/10.1016/j.jpsychires.2020.10.031', 'Journal of Psychiatric Research', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT13-006 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT13-006';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Adult Separation Anxiety Disorder: A Systematic Review of Clinical Features and Treatment', '2020', 'https://doi.org/10.1016/j.jad.2020.03.134', 'Journal of Affective Disorders', 1),
      (v_art_id, 'clinical_guideline', 4, 'Diagnostic and Statistical Manual of Mental Disorders, Fifth Edition, Text Revision (DSM-5-TR)', '2022', 'https://doi.org/10.1176/appi.books.9780890425787', 'American Psychiatric Association', 2),
      (v_art_id, 'peer_reviewed', 1, 'Separation Anxiety Disorder in Adults: Phenomenology, Prevalence, and Comorbidity', '2019', 'https://doi.org/10.1016/j.cpr.2019.04.001', 'Clinical Psychology Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'Attachment Theory and Adult Separation Anxiety', '2021', 'https://doi.org/10.1080/14616734.2021.1912964', 'Attachment and Human Development', 4),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive Behavioral Treatment of Adult Separation Anxiety Disorder', '2020', 'https://doi.org/10.1016/j.brat.2020.103667', 'Behaviour Research and Therapy', 5),
      (v_art_id, 'peer_reviewed', 1, 'The Relationship Between Adult Separation Anxiety and Panic Disorder', '2019', 'https://doi.org/10.1016/j.janxdis.2019.02.007', 'Journal of Anxiety Disorders', 6),
      (v_art_id, 'peer_reviewed', 1, 'Functional Impairment in Adult Separation Anxiety Disorder', '2021', 'https://doi.org/10.1016/j.comppsych.2021.152290', 'Comprehensive Psychiatry', 7),
      (v_art_id, 'peer_reviewed', 1, 'Pharmacotherapy for Separation Anxiety Disorder: A Review', '2020', 'https://doi.org/10.1080/14656566.2020.1745232', 'Expert Opinion on Pharmacotherapy', 8),
      (v_art_id, 'peer_reviewed', 1, 'Cultural Differences in Expression of Separation Anxiety', '2020', 'https://doi.org/10.1177/1363461520926558', 'Transcultural Psychiatry', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT13-007 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT13-007';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Selective Mutism: A Review of Current Research and Clinical Practice', '2020', 'https://doi.org/10.1007/s10578-020-00987-2', 'Child Psychiatry and Human Development', 1),
      (v_art_id, 'clinical_guideline', 4, 'Diagnostic and Statistical Manual of Mental Disorders, Fifth Edition, Text Revision (DSM-5-TR)', '2022', 'https://doi.org/10.1176/appi.books.9780890425787', 'American Psychiatric Association', 2),
      (v_art_id, 'peer_reviewed', 1, 'Behavioral Treatment of Selective Mutism: A Meta-Analysis', '2021', 'https://doi.org/10.1016/j.cpr.2021.102030', 'Clinical Psychology Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'The Relationship Between Selective Mutism and Social Anxiety Disorder', '2019', 'https://doi.org/10.1016/j.jaac.2019.05.015', 'Journal of the American Academy of Child and Adolescent Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Cultural and Linguistic Considerations in Selective Mutism', '2020', 'https://doi.org/10.1111/jcpp.13194', 'Journal of Child Psychology and Psychiatry', 5),
      (v_art_id, 'peer_reviewed', 1, 'Pharmacotherapy for Selective Mutism: A Systematic Review', '2021', 'https://doi.org/10.1089/cap.2020.0157', 'Journal of Child and Adolescent Psychopharmacology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Long-Term Outcomes of Children with Selective Mutism', '2020', 'https://doi.org/10.1007/s00787-019-01457-7', 'European Child and Adolescent Psychiatry', 7),
      (v_art_id, 'peer_reviewed', 1, 'Parent-Child Interaction Therapy for Selective Mutism', '2020', 'https://doi.org/10.1016/j.cbpra.2019.11.001', 'Cognitive and Behavioral Practice', 8),
      (v_art_id, 'peer_reviewed', 1, 'School-Based Interventions for Selective Mutism', '2021', 'https://doi.org/10.1080/2372966X.2020.1862938', 'School Psychology Review', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT13-008 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT13-008';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Comorbidity of Anxiety Disorders: A Systematic Review', '2020', 'https://doi.org/10.1002/da.23047', 'Depression and Anxiety', 1),
      (v_art_id, 'peer_reviewed', 1, 'Shared Neurobiology of Anxiety Disorders: Insights from Neuroimaging', '2021', 'https://doi.org/10.1016/j.biopsych.2021.02.017', 'Biological Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'The Hierarchical Taxonomy of Psychopathology (HiTOP): A Dimensional Alternative to Traditional Nosologies', '2019', 'https://doi.org/10.1037/abn0000412', 'Journal of Abnormal Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Transdiagnostic Treatment of Emotional Disorders: A Unified Protocol', '2020', 'https://doi.org/10.1111/cpsp.12331', 'Clinical Psychology: Science and Practice', 4),
      (v_art_id, 'peer_reviewed', 1, 'The Role of Intolerance of Uncertainty in Anxiety and Related Disorders', '2019', 'https://doi.org/10.1016/j.cpr.2019.101794', 'Clinical Psychology Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'Anxiety Sensitivity as a Transdiagnostic Construct', '2020', 'https://doi.org/10.1016/j.brat.2020.103698', 'Behaviour Research and Therapy', 6),
      (v_art_id, 'peer_reviewed', 1, 'Genetic Overlap Between Anxiety Disorders: A Twin Study', '2020', 'https://doi.org/10.1001/jamapsychiatry.2020.0270', 'JAMA Psychiatry', 7),
      (v_art_id, 'peer_reviewed', 1, 'Comorbidity and Diagnostic Implications: Anxiety and Depression', '2021', 'https://doi.org/10.1002/wps.20851', 'World Psychiatry', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT13-009 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT13-009';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'government', 2, 'Anxiety Disorders in Children and Adolescents', '2023', 'https://www.nimh.nih.gov/health/topics/child-and-adolescent-mental-health', 'National Institute of Mental Health', 1),
      (v_art_id, 'peer_reviewed', 1, 'Early Intervention for Childhood Anxiety: A Meta-Analysis', '2020', 'https://doi.org/10.1007/s10567-020-00311-0', 'Clinical Child and Family Psychology Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Developmental Psychopathology of Anxiety Disorders', '2019', 'https://doi.org/10.1016/j.jaac.2019.05.014', 'Journal of the American Academy of Child and Adolescent Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive Behavioral Therapy for Childhood Anxiety Disorders', '2020', 'https://doi.org/10.1002/14651858.CD013162.pub2', 'Cochrane Database of Systematic Reviews', 4),
      (v_art_id, 'peer_reviewed', 1, 'The Role of Parenting in Childhood Anxiety', '2019', 'https://doi.org/10.1016/j.cpr.2019.101721', 'Clinical Psychology Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'School-Based Anxiety Interventions for Children', '2021', 'https://doi.org/10.1007/s12310-020-09408-4', 'School Mental Health', 6),
      (v_art_id, 'peer_reviewed', 1, 'Long-Term Outcomes of Untreated Childhood Anxiety', '2020', 'https://doi.org/10.1016/j.janxdis.2020.102235', 'Journal of Anxiety Disorders', 7)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT13-010 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT13-010';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The Neurobiology of Anxiety Disorders: Brain Imaging, Genetics, and Psychoneuroendocrinology', '2020', 'https://doi.org/10.1016/j.psc.2020.05.002', 'Psychiatric Clinics of North America', 1),
      (v_art_id, 'peer_reviewed', 1, 'The Fear Network: Insights from Neuroimaging Studies', '2021', 'https://doi.org/10.1038/s41583-021-00464-1', 'Nature Reviews Neuroscience', 2),
      (v_art_id, 'peer_reviewed', 1, 'The Role of the Amygdala in Anxiety Disorders', '2020', 'https://doi.org/10.1016/j.biopsych.2020.03.020', 'Biological Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Neurotransmitter Systems in Anxiety Disorders: GABA, Serotonin, and Beyond', '2021', 'https://doi.org/10.1016/j.neubiorev.2021.03.013', 'Neuroscience and Biobehavioral Reviews', 4),
      (v_art_id, 'peer_reviewed', 1, 'Genetic Architecture of Anxiety Disorders: A Genome-Wide Association Study', '2020', 'https://doi.org/10.1001/jamapsychiatry.2020.2548', 'JAMA Psychiatry', 5),
      (v_art_id, 'peer_reviewed', 1, 'The HPA Axis and Anxiety: Stress Hormones in Anxiety Disorders', '2020', 'https://doi.org/10.1016/j.psyneuen.2020.104757', 'Psychoneuroendocrinology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Neuroplasticity and Anxiety: How Treatment Changes the Brain', '2021', 'https://doi.org/10.1016/j.tics.2021.02.006', 'Trends in Cognitive Sciences', 7)
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
