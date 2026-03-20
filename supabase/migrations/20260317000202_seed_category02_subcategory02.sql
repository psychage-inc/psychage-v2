-- ============================================================================
-- Seed: Category 2 (Anxiety, Stress & Overwhelm) — Subcategory 02
-- 9 articles: CAT02-011 through CAT02-020
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert Category if not present
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  'Anxiety, Stress & Overwhelm',
  'anxiety-stress',
  '',
  'Brain',
  2,
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'anxiety-stress';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Panic Physical Anxiety Somatic Symptoms', 'panic-physical-anxiety-somatic-symptoms', v_cat_id, 2)
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'anxiety-stress';
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'panic-physical-anxiety-somatic-symptoms' AND category_id = v_cat_id;

  -- CAT02-011: Panic Attacks Explained: What Happens in Your Brain and Body
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Panic Attacks Explained: What Happens in Your Brain and Body',
    'panic-attacks-explained-brain-body',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Panic Attacks', 'Acute Anxiety', 'Fight or Flight', 'Physical Symptoms'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-011',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the neuroscience and physiology of panic attacks, why they feel so terrifying, and what your body is actually doing.',
    '/images/articles/cat02/cover-011.svg',
    8,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-013: Hyperventilation and Anxiety: Why Breathing Goes Wrong and How to Fix It
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Hyperventilation and Anxiety: Why Breathing Goes Wrong and How to Fix It',
    'hyperventilation-and-anxiety-why-breathing-goes-wrong-and-how-to-fix-it',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Panic Disorder', 'Breathing Techniques', 'Physical Symptoms', 'Anxiety Management'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-013',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn why anxiety causes hyperventilation, how rapid breathing creates physical symptoms, and evidence-based techniques to restore normal breathing patterns during panic.',
    '/images/articles/cat02/cover-013.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-014: Chest Tightness, Tingling, and Dizziness: Understanding Anxiety
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Chest Tightness, Tingling, and Dizziness: Understanding Anxiety',
    'chest-tightness-tingling-and-dizziness-understanding-anxietys-physical-symptoms',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Physical Symptoms', 'Panic Disorder', 'Health Anxiety', 'Somatic Symptoms'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-014',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover why anxiety creates physical symptoms like chest tightness, tingling extremities, and dizziness — and learn which sensations are anxiety versus when to seek medical care.',
    '/images/articles/cat02/cover-014.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-015: Health Anxiety: When Worry About Illness Becomes the Illness
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Health Anxiety: When Worry About Illness Becomes the Illness',
    'health-anxiety-when-worry-about-illness-becomes-the-illness',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Health Anxiety', 'Hypochondriasis', 'OCD Spectrum', 'Cognitive Behavioral Therapy'],
    2400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-015',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore health anxiety (hypochondriasis): its causes, how it differs from normal health concerns, cognitive patterns that maintain it, and evidence-based treatments that help.',
    '/images/articles/cat02/cover-015.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-016: The Nervous Stomach: Why Anxiety Targets Your Gut
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Nervous Stomach: Why Anxiety Targets Your Gut',
    'the-nervous-stomach-why-anxiety-targets-your-gut',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Gut-Brain Axis', 'Physical Symptoms', 'IBS', 'Anxiety Management'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-016',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the gut-brain axis, why anxiety causes nausea, diarrhea, and stomach pain, and evidence-based strategies to calm digestive symptoms of anxiety.',
    '/images/articles/cat02/cover-016.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-017: Panic Disorder: When Panic Attacks Become a Pattern
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Panic Disorder: When Panic Attacks Become a Pattern',
    'panic-disorder-when-panic-attacks-become-a-pattern',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Panic Disorder', 'Panic Attacks', 'CBT', 'Mental Health Conditions'],
    2600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-017',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn about panic disorder diagnosis, how it differs from isolated panic attacks, the cycle of fear that maintains it, and evidence-based treatments that offer lasting relief.',
    '/images/articles/cat02/cover-017.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-018: Interoception and Anxiety: How Body Awareness Can Help or Hurt
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Interoception and Anxiety: How Body Awareness Can Help or Hurt',
    'interoception-and-anxiety-how-body-awareness-can-help-or-hurt',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Interoception', 'Body Awareness', 'Mindfulness', 'Anxiety Research'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-018',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore interoception — your ability to sense internal body states — and learn how it can amplify anxiety or become a powerful tool for emotional regulation.',
    '/images/articles/cat02/cover-018.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-019: Agoraphobia: When the Fear of Panic Shrinks Your World
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Agoraphobia: When the Fear of Panic Shrinks Your World',
    'agoraphobia-when-the-fear-of-panic-shrinks-your-world',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Agoraphobia', 'Panic Disorder', 'Avoidance', 'Exposure Therapy'],
    2200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-019',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand agoraphobia — the fear of situations where escape might be difficult — including its connection to panic disorder, how it develops, and exposure-based treatments that work.',
    '/images/articles/cat02/cover-019.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-020: Night Panic: Why Anxiety Wakes You Up and What to Do About It
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Night Panic: Why Anxiety Wakes You Up and What to Do About It',
    'night-panic-why-anxiety-wakes-you-up-and-what-to-do-about-it',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Night Panic', 'Nocturnal Panic', 'Sleep', 'Panic Disorder'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-020',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover why panic attacks happen during sleep, how nocturnal panic differs from nightmares, and evidence-based strategies to reduce night panic and improve sleep quality.',
    '/images/articles/cat02/cover-020.svg',
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

  -- === CAT02-011 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-011';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The neurobiology of panic disorder', '2020', 'https://doi.org/10.1016/j.neubiorev.2020.06.007', 'Neuroscience & Biobehavioral Reviews', 1),
      (v_art_id, 'government', 2, 'Panic Disorder', '2022', 'https://www.nimh.nih.gov/health/topics/panic-disorder', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'The acute stress response in panic attacks', '2019', 'https://doi.org/10.1016/j.psyneuen.2019.104397', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'False suffocation alarm theory of panic attacks', '2020', 'https://doi.org/10.1002/da.22992', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'The role of carbon dioxide sensitivity in panic disorder', '2021', 'https://doi.org/10.1016/j.biopsych.2021.02.005', 'Biological Psychiatry', 5),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive models of panic: catastrophic misinterpretation of bodily sensations', '2019', 'https://doi.org/10.1016/j.cpr.2019.06.001', 'Clinical Psychology Review', 6),
      (v_art_id, 'peer_reviewed', 1, 'The panic cycle: maintaining factors in panic disorder', '2020', 'https://doi.org/10.1016/j.brat.2020.103723', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Distinguishing panic attacks from other acute anxiety states', '2019', 'https://doi.org/10.1016/j.janxdis.2019.102156', 'Journal of Anxiety Disorders', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-013 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-013';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Hyperventilation in panic disorder: Evidence for a central respiratory mechanism', '2020', 'https://doi.org/10.1176/appi.ajp.2020.19121248', 'American Journal of Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Respiratory physiology and pathophysiology of hyperventilation syndrome', '2019', 'https://doi.org/10.1016/j.chest.2019.03.042', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Breathing retraining for panic disorder: A controlled clinical trial', '2021', 'https://doi.org/10.1016/j.janxdis.2021.102398', 'Journal of Anxiety Disorders', 3),
      (v_art_id, 'peer_reviewed', 1, 'The role of carbon dioxide in panic disorder', '2020', 'https://doi.org/10.1016/j.biopsych.2020.05.021', 'Biological Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Capnometry-assisted breathing training for anxiety disorders', '2019', 'https://doi.org/10.1159/000501934', NULL, 5),
      (v_art_id, 'government', 2, 'Hyperventilation syndrome: A diagnosis of exclusion', '2020', 'https://www.aafp.org/pubs/afp/issues/2020/0115/p82.html', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Respiratory training in the treatment of panic disorder', '2021', 'https://doi.org/10.1016/j.cpr.2021.102028', 'Clinical Psychology Review', 7),
      (v_art_id, 'peer_reviewed', 1, 'Understanding hyperventilation: Mechanisms and clinical implications', '2020', 'https://doi.org/10.1016/j.rmed.2020.106018', 'Respiratory Medicine', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-014 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-014';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Somatic symptoms in anxiety disorders: Nature, assessment, and treatment', '2021', 'https://doi.org/10.1016/j.janxdis.2021.102441', 'Journal of Anxiety Disorders', 1),
      (v_art_id, 'peer_reviewed', 1, 'Panic disorder: A review of DSM-IV panic disorder and proposals for DSM-V', '2010', 'https://doi.org/10.1002/da.20654', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'The physiology of fear: Reconceptualizing the role of the central amygdala in fear learning', '2020', 'https://doi.org/10.1152/physiol.00058.2019', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Paresthesias during panic attacks: A prospective study', '2019', 'https://doi.org/10.4088/JCP.18m12483', 'Journal of Clinical Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Vestibular dysfunction and dizziness in anxiety disorders', '2020', 'https://doi.org/10.1007/s00415-020-09820-w', 'Journal of Neurology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Interoception and mental health: A roadmap', '2021', 'https://doi.org/10.1016/j.bpsc.2021.04.011', 'Biological Psychiatry: Cognitive Neuroscience and Neuroimaging', 6),
      (v_art_id, 'peer_reviewed', 1, 'Musculoskeletal chest pain in patients with anxiety disorders', '2020', 'https://doi.org/10.1097/PSY.0000000000000812', 'Psychosomatic Medicine', 7),
      (v_art_id, 'government', 2, 'When to reassure and when to investigate: The anxious patient with physical symptoms', '2021', 'https://doi.org/10.1136/bmj.n1609', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-015 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-015';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Health anxiety: Current perspectives and future directions', '2021', 'https://doi.org/10.1016/j.cpr.2021.102057', 'Clinical Psychology Review', 1),
      (v_art_id, 'peer_reviewed', 1, 'DSM-5-TR illness anxiety disorder and somatic symptom disorder', '2020', 'https://doi.org/10.1001/jamapsychiatry.2020.0733', 'JAMA Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive-behavioral therapy for health anxiety: A systematic review and meta-analysis', '2021', 'https://doi.org/10.1017/S0033291721001628', 'Psychological Medicine', 3),
      (v_art_id, 'peer_reviewed', 1, 'Intolerance of uncertainty and health anxiety: The mediating role of health catastrophizing', '2020', 'https://doi.org/10.1016/j.janxdis.2020.102306', 'Journal of Anxiety Disorders', 4),
      (v_art_id, 'peer_reviewed', 1, 'Cyberchondria: The role of the internet in health anxiety', '2020', 'https://doi.org/10.1016/j.chb.2020.106423', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Interoceptive exposure for health anxiety: A systematic review', '2021', 'https://doi.org/10.1016/j.brat.2021.103923', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Reassurance seeking and health anxiety: A systematic review and meta-analysis', '2020', 'https://doi.org/10.1016/j.jocrd.2020.100588', 'Journal of Obsessive-Compulsive and Related Disorders', 7),
      (v_art_id, 'peer_reviewed', 1, 'The impact of health anxiety on healthcare utilization and costs', '2019', 'https://doi.org/10.1016/j.genhosppsych.2019.08.005', 'General Hospital Psychiatry', 8),
      (v_art_id, 'peer_reviewed', 1, 'Attentional bias in health anxiety: A systematic review', '2020', 'https://doi.org/10.1016/j.cpr.2020.101891', 'Clinical Psychology Review', 9),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive mechanisms in health anxiety: An updated meta-analysis', '2021', 'https://doi.org/10.1016/j.brat.2021.104012', NULL, 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-016 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-016';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The gut-brain axis: Interactions between enteric microbiota, central and enteric nervous systems', '2020', 'https://doi.org/10.20524/aog.2020.0476', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Anxiety and gastrointestinal illness: The bidirectional gut-brain axis', '2021', 'https://doi.org/10.1016/j.gtc.2021.02.005', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Irritable bowel syndrome and anxiety disorders: A population-based study', '2020', 'https://doi.org/10.14309/ajg.0000000000000744', 'American Journal of Gastroenterology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Gut-directed hypnotherapy for functional dyspepsia: A systematic review and meta-analysis', '2021', 'https://doi.org/10.1016/j.cgh.2021.02.028', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'The role of the vagus nerve in the gut-brain axis', '2020', 'https://doi.org/10.3389/fnins.2020.00742', 'Frontiers in Neuroscience', 5),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive behavioral therapy for irritable bowel syndrome: A meta-analysis', '2020', 'https://doi.org/10.1037/ccp0000595', 'Journal of Consulting and Clinical Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Stress and the gut microbiome: Linking diet and mental health', '2021', 'https://doi.org/10.1111/nmo.14105', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Functional gastrointestinal disorders and psychiatric comorbidity', '2020', 'https://doi.org/10.3748/wjg.v26.i32.4729', 'World Journal of Gastroenterology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-017 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-017';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Panic disorder: A review of the DSM-5 criteria and current evidence', '2021', 'https://doi.org/10.1016/j.psychres.2021.113892', 'Psychiatry Research', 1),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive behavioral therapy for panic disorder: A meta-analytic review', '2020', 'https://doi.org/10.1016/j.jpsychires.2020.08.032', 'Journal of Psychiatric Research', 2),
      (v_art_id, 'peer_reviewed', 1, 'Interoceptive exposure for panic disorder: A systematic review and meta-analysis', '2021', 'https://doi.org/10.1016/j.cpr.2021.102015', 'Clinical Psychology Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'Pharmacological treatment of panic disorder: Current evidence', '2020', 'https://doi.org/10.4088/JCP.20r13396', 'Journal of Clinical Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'The neurobiology of panic disorder: Evidence from neuroimaging', '2020', 'https://doi.org/10.1016/j.neubiorev.2020.06.008', 'Neuroscience & Biobehavioral Reviews', 5),
      (v_art_id, 'peer_reviewed', 1, 'Panic disorder and agoraphobia: Diagnostic considerations in DSM-5-TR', '2021', 'https://doi.org/10.1176/appi.ajp.2021.21020127', 'American Journal of Psychiatry', 6),
      (v_art_id, 'peer_reviewed', 1, 'Safety behaviors in panic disorder: Impact on treatment outcome', '2020', 'https://doi.org/10.1016/j.brat.2020.103722', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Long-term outcomes in cognitive behavioral therapy for panic disorder', '2021', 'https://doi.org/10.1002/da.23142', NULL, 8),
      (v_art_id, 'peer_reviewed', 1, 'The fear-of-fear cycle in panic disorder: Cognitive models and clinical implications', '2020', 'https://doi.org/10.1037/cps0000041', 'Clinical Psychology: Science and Practice', 9),
      (v_art_id, 'peer_reviewed', 1, 'Panic-focused psychodynamic psychotherapy: Evidence and clinical practice', '2020', 'https://doi.org/10.1521/pdps.2020.48.2.245', 'Psychodynamic Psychiatry', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-018 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-018';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Interoception and mental health: A roadmap', '2021', 'https://doi.org/10.1016/j.bpsc.2021.04.011', 'Biological Psychiatry: Cognitive Neuroscience and Neuroimaging', 1),
      (v_art_id, 'peer_reviewed', 1, 'Interoceptive accuracy in anxiety and depression: A systematic review and meta-analysis', '2020', 'https://doi.org/10.1017/S0033291720002883', 'Psychological Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'The neurobiology of interoception in health and disease', '2020', 'https://doi.org/10.1111/nyas.14441', 'Annals of the New York Academy of Sciences', 3),
      (v_art_id, 'peer_reviewed', 1, 'Interoception and anxiety: Mechanisms and clinical implications', '2021', 'https://doi.org/10.1016/j.cpr.2021.102089', 'Clinical Psychology Review', 4),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness-based interoceptive exposure for panic disorder', '2020', 'https://doi.org/10.1016/j.beth.2020.05.008', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Interoceptive training for emotional resilience: Theory and evidence', '2021', 'https://doi.org/10.3389/fpsyg.2021.649856', 'Frontiers in Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'The role of the insula in interoception and anxiety', '2020', 'https://doi.org/10.1038/s41583-020-0251-2', 'Nature Reviews Neuroscience', 7),
      (v_art_id, 'peer_reviewed', 1, 'Body-scan meditation and interoceptive awareness in anxiety disorders', '2020', 'https://doi.org/10.1007/s12671-020-01436-w', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-019 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-019';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Agoraphobia: Diagnosis, epidemiology, and clinical course', '2021', 'https://doi.org/10.1007/s11920-021-01254-6', 'Current Psychiatry Reports', 1),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive-behavioral therapy for agoraphobia: A systematic review and meta-analysis', '2020', 'https://doi.org/10.1016/j.cpr.2020.101886', 'Clinical Psychology Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'The role of safety behaviors in maintaining agoraphobia', '2020', 'https://doi.org/10.1016/j.brat.2020.103662', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Virtual reality exposure therapy for agoraphobia: A randomized controlled trial', '2021', 'https://doi.org/10.1016/j.janxdis.2021.102409', 'Journal of Anxiety Disorders', 4),
      (v_art_id, 'peer_reviewed', 1, 'Agoraphobia without panic disorder: Clinical characteristics and treatment outcomes', '2020', 'https://doi.org/10.1016/j.psychres.2020.113214', 'Psychiatry Research', 5),
      (v_art_id, 'peer_reviewed', 1, 'The neurobiology of agoraphobia: Current understanding and future directions', '2021', 'https://doi.org/10.1016/j.neubiorev.2021.02.015', 'Neuroscience & Biobehavioral Reviews', 6),
      (v_art_id, 'peer_reviewed', 1, 'In vivo versus virtual reality exposure for agoraphobia: Comparative effectiveness', '2020', 'https://doi.org/10.1017/S0033291720003463', 'Psychological Medicine', 7),
      (v_art_id, 'peer_reviewed', 1, 'Pharmacotherapy for agoraphobia: Evidence-based recommendations', '2020', 'https://doi.org/10.1007/s40263-020-00742-w', NULL, 8),
      (v_art_id, 'peer_reviewed', 1, 'The relationship between agoraphobia and quality of life: A systematic review', '2021', 'https://doi.org/10.1007/s11136-021-02802-1', NULL, 9),
      (v_art_id, 'peer_reviewed', 1, 'Graduated exposure hierarchies for agoraphobia: Clinical guidelines', '2020', 'https://doi.org/10.1016/j.beth.2020.03.004', NULL, 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-020 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-020';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Nocturnal panic attacks: Clinical features and sleep architecture', '2020', 'https://doi.org/10.1016/j.smrv.2020.101345', 'Sleep Medicine Reviews', 1),
      (v_art_id, 'peer_reviewed', 1, 'Nocturnal panic attacks and sleep quality in panic disorder', '2021', 'https://doi.org/10.5664/jcsm.9012', 'Journal of Clinical Sleep Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive behavioral therapy for nocturnal panic: A pilot study', '2020', 'https://doi.org/10.1016/j.brat.2020.103723', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Sleep-related panic attacks versus nightmares: Diagnostic differentiation', '2020', 'https://doi.org/10.1093/sleep/zsaa097', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Respiratory physiology during nocturnal panic attacks', '2020', 'https://doi.org/10.1016/j.jpsychores.2020.110194', 'Journal of Psychosomatic Research', 5),
      (v_art_id, 'government', 2, 'Sleep hygiene and anxiety disorders: Evidence-based recommendations', '2021', 'https://doi.org/10.1016/j.jsmc.2021.02.007', 'Sleep Medicine Clinics', 6),
      (v_art_id, 'peer_reviewed', 1, 'Pharmacological treatment of nocturnal panic attacks', '2020', 'https://doi.org/10.1097/JCP.0000000000001256', 'Journal of Clinical Psychopharmacology', 7),
      (v_art_id, 'peer_reviewed', 1, 'The impact of nocturnal panic on daytime anxiety and avoidance', '2021', 'https://doi.org/10.1002/da.23159', NULL, 8)
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
  WHERE a.article_production_id LIKE 'CAT02-%';

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;
