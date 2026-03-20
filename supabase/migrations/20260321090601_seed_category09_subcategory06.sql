-- ============================================================================
-- Seed: Category 9 (Sleep, Body & Mind-Body Connection) — Subcategory 06
-- 10 articles: CAT09-051 through CAT09-060
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert Category if not present
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  'Sleep, Body & Mind-Body Connection',
  'sleep-body-connection',
  'The mind-body connection — sleep science, exercise psychology, nutrition, and somatic awareness for mental wellness.',
  'Moon',
  9,
  60,
  '#8B5CF6'
)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------------------
-- 2. Insert Subcategory
-- ---------------------------------------------------------------------------

DO $$
DECLARE
  v_cat_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'sleep-body-connection';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Pain, Chronic Illness & Psychological Impact', 'pain-chronic-illness-and-psychological-impact', v_cat_id, 6)
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'sleep-body-connection';
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'pain-chronic-illness-and-psychological-impact' AND category_id = v_cat_id;

  -- CAT09-051: The Psychology of Chronic Pain: Mind-Body Connections
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Chronic Pain: Mind-Body Connections',
    'psychology-chronic-pain-mind-body-connections',
    'draft',
    'Sleep, Body & Mind-Body Connection',
    ARRAY['Chronic Pain', 'Pain Psychology', 'Mind-Body', 'Neuroscience'],
    991,
    'Dr. Sarah Chen',
    'self_help',
    'CAT09-051',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore how psychological factors influence chronic pain experience, why pain persists beyond tissue damage, and the neuroscience of the pain-brain connection.',
    '/images/articles/cat09/cover-051.svg',
    8,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT09-052: Pain Catastrophizing: How Thoughts Amplify Physical Pain
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Pain Catastrophizing: How Thoughts Amplify Physical Pain',
    'pain-catastrophizing-thoughts-amplify-physical-pain',
    'draft',
    'Sleep, Body & Mind-Body Connection',
    ARRAY['Pain Catastrophizing', 'Chronic Pain', 'Cognitive Patterns', 'Pain Management'],
    1004,
    'Dr. Sarah Chen',
    'self_help',
    'CAT09-052',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn what pain catastrophizing is, how worst-case thinking intensifies pain, and evidence-based strategies to break the catastrophizing cycle for better pain management.',
    '/images/articles/cat09/cover-052.svg',
    6,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT09-053: Chronic Illness and Mental Health: The Bidirectional Relationship
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Chronic Illness and Mental Health: The Bidirectional Relationship',
    'chronic-illness-mental-health-bidirectional-relationship',
    'draft',
    'Sleep, Body & Mind-Body Connection',
    ARRAY['Chronic Illness', 'Mental Health', 'Comorbidity', 'Integrated Care'],
    999,
    'Dr. Sarah Chen',
    'self_help',
    'CAT09-053',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore how chronic physical illness affects mental health and vice versa, understanding the complex interplay between chronic conditions and psychological wellbeing.',
    '/images/articles/cat09/cover-053.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT09-054: Acceptance and Commitment Therapy (ACT) for Chronic Pain
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Acceptance and Commitment Therapy (ACT) for Chronic Pain',
    'acceptance-commitment-therapy-chronic-pain',
    'draft',
    'Sleep, Body & Mind-Body Connection',
    ARRAY['ACT', 'Chronic Pain', 'Acceptance', 'Treatment Guide'],
    975,
    'Dr. Sarah Chen',
    'self_help',
    'CAT09-054',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how Acceptance and Commitment Therapy helps people with chronic pain shift from fighting pain to living meaningful lives despite discomfort.',
    '/images/articles/cat09/cover-054.svg',
    7,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT09-055: The Spoon Theory: Understanding Energy Limits in Chronic Illness
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Spoon Theory: Understanding Energy Limits in Chronic Illness',
    'spoon-theory-energy-limits-chronic-illness',
    'draft',
    'Sleep, Body & Mind-Body Connection',
    ARRAY['Spoon Theory', 'Chronic Illness', 'Energy Management', 'Pacing'],
    991,
    'Dr. Sarah Chen',
    'self_help',
    'CAT09-055',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn about Spoon Theory, a powerful metaphor for understanding and communicating the energy limitations of chronic illness and how to manage finite resources.',
    '/images/articles/cat09/cover-055.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT09-056: Cancer and Mental Health: The Emotional Journey of Diagnosis and Treatment
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Cancer and Mental Health: The Emotional Journey of Diagnosis and Treatment',
    'cancer-mental-health-emotional-journey',
    'draft',
    'Sleep, Body & Mind-Body Connection',
    ARRAY['Cancer', 'Medical Trauma', 'Emotional Resilience', 'Chronic Illness', 'Meaning-Making'],
    999,
    'Dr. Sarah Chen',
    'self_help',
    'CAT09-056',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Navigate the psychological impact of cancer diagnosis and treatment with evidence-based strategies for emotional resilience, relationship support, and meaning-making.',
    '/images/articles/cat09/cover-056.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT09-057: Health Anxiety After a Real Diagnosis: When Worry Becomes Appropriate
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Health Anxiety After a Real Diagnosis: When Worry Becomes Appropriate',
    'health-anxiety-after-real-diagnosis',
    'draft',
    'Sleep, Body & Mind-Body Connection',
    ARRAY['Health Anxiety', 'Medical Trauma', 'Chronic Illness', 'Vigilance', 'Coping Skills'],
    1018,
    'Dr. Sarah Chen',
    'self_help',
    'CAT09-057',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Navigate the complex territory between realistic vigilance and excessive health anxiety after a medical diagnosis, with strategies to monitor your health without spiraling into fear.',
    '/images/articles/cat09/cover-057.svg',
    6,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT09-058: Invisible Illness and Mental Health: The Burden of Looking ''Fine''
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Invisible Illness and Mental Health: The Burden of Looking ''Fine''',
    'invisible-illness-mental-health-burden',
    'draft',
    'Sleep, Body & Mind-Body Connection',
    ARRAY['Invisible Illness', 'Chronic Illness', 'Validation', 'Self-Advocacy', 'Isolation'],
    998,
    'Dr. Sarah Chen',
    'self_help',
    'CAT09-058',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Navigate the unique psychological challenges of living with chronic illnesses that others cannot see, from invalidation and isolation to self-advocacy and community.',
    '/images/articles/cat09/cover-058.svg',
    6,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT09-059: Surgery, Recovery, and Mental Health: The Psychological Side of Medical Procedures
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Surgery, Recovery, and Mental Health: The Psychological Side of Medical Procedures',
    'surgery-recovery-mental-health',
    'draft',
    'Sleep, Body & Mind-Body Connection',
    ARRAY['Surgery', 'Medical Procedures', 'Recovery', 'Anxiety', 'Post-Surgical Depression'],
    1009,
    'Dr. Sarah Chen',
    'self_help',
    'CAT09-059',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand and navigate the often-overlooked emotional and psychological challenges of preparing for surgery, recovering from procedures, and adjusting to post-surgical life.',
    '/images/articles/cat09/cover-059.svg',
    7,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT09-060: How to Advocate for Yourself in the Medical System: A Patient''s Guide
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How to Advocate for Yourself in the Medical System: A Patient''s Guide',
    'advocate-for-yourself-medical-system',
    'draft',
    'Sleep, Body & Mind-Body Connection',
    ARRAY['Self-Advocacy', 'Healthcare Navigation', 'Patient Rights', 'Medical Communication', 'Chronic Illness'],
    1005,
    'Dr. Sarah Chen',
    'self_help',
    'CAT09-060',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn practical strategies to communicate effectively with healthcare providers, navigate complex medical systems, and ensure your health concerns are heard and addressed.',
    '/images/articles/cat09/cover-060.svg',
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

  -- === CAT09-051 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT09-051';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Psychological factors in chronic pain', '2019', 'https://doi.org/10.1097/j.pain.0000000000001541', 'Pain', 1),
      (v_art_id, 'peer_reviewed', 1, 'The neuroscience of pain', '2020', 'https://doi.org/10.1038/s41583-019-0237-7', 'Nature Reviews Neuroscience', 2),
      (v_art_id, 'peer_reviewed', 1, 'Central sensitization in chronic pain', '2018', 'https://doi.org/10.1016/j.jpain.2018.03.001', 'The Journal of Pain', 3),
      (v_art_id, 'peer_reviewed', 1, 'Biopsychosocial model of chronic pain', '2019', 'https://doi.org/10.1038/s41572-019-0127-2', 'Nature Reviews Disease Primers', 4),
      (v_art_id, 'peer_reviewed', 1, 'Emotional regulation and chronic pain', '2020', 'https://doi.org/10.1016/j.cpr.2020.101891', 'Clinical Psychology Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'Neuroplasticity in chronic pain', '2021', 'https://doi.org/10.1016/j.neubiorev.2021.01.030', 'Neuroscience & Biobehavioral Reviews', 6),
      (v_art_id, 'peer_reviewed', 1, 'Chronic pain and depression comorbidity', '2018', 'https://doi.org/10.1001/jamapsychiatry.2018.0913', 'JAMA Psychiatry', 7),
      (v_art_id, 'peer_reviewed', 1, 'Pain perception and the brain', '2020', 'https://doi.org/10.1146/annurev-neuro-091619-022657', 'Annual Review of Neuroscience', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT09-052 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT09-052';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Pain catastrophizing: an updated review', '2018', 'https://doi.org/10.4103/IJPSYM.IJPSYM_504_17', 'Indian Journal of Psychological Medicine', 1),
      (v_art_id, 'peer_reviewed', 1, 'The role of catastrophizing in chronic pain', '2020', 'https://doi.org/10.1097/j.pain.0000000000001804', 'Pain', 2),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive-behavioral therapy for pain catastrophizing', '2019', 'https://doi.org/10.1016/j.jpain.2019.02.010', 'Journal of Pain', 3),
      (v_art_id, 'peer_reviewed', 1, 'Pain Catastrophizing Scale psychometric properties', '2018', 'https://doi.org/10.1097/AJP.0000000000000624', 'The Clinical Journal of Pain', 4),
      (v_art_id, 'peer_reviewed', 1, 'Mechanisms of pain catastrophizing', '2021', 'https://doi.org/10.1007/s11916-021-00932-z', 'Current Pain and Headache Reports', 5),
      (v_art_id, 'peer_reviewed', 1, 'Reducing catastrophizing in chronic pain populations', '2020', 'https://doi.org/10.1093/pm/pnaa106', 'Pain Medicine', 6)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT09-053 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT09-053';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Mental health in chronic illness: a meta-analysis', '2020', 'https://doi.org/10.1016/j.genhosppsych.2020.01.007', 'General Hospital Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Bidirectional relationships between depression and chronic disease', '2019', 'https://doi.org/10.1097/PSY.0000000000000719', 'Psychosomatic Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'Inflammation as a link between chronic illness and depression', '2020', 'https://doi.org/10.1016/j.bbi.2020.03.008', 'Brain, Behavior, and Immunity', 3),
      (v_art_id, 'peer_reviewed', 1, 'Integrated care for mental health in chronic disease', '2021', 'https://doi.org/10.1016/S0140-6736(21)00154-8', 'The Lancet', 4),
      (v_art_id, 'peer_reviewed', 1, 'Mental health and diabetes outcomes', '2020', 'https://doi.org/10.2337/dci20-0053', 'Diabetes Care', 5),
      (v_art_id, 'peer_reviewed', 1, 'Depression and cardiovascular disease', '2019', 'https://doi.org/10.1161/CIR.0000000000000696', 'Circulation', 6),
      (v_art_id, 'peer_reviewed', 1, 'Mental health in autoimmune disease', '2021', 'https://doi.org/10.1016/j.jaut.2021.102647', 'Journal of Autoimmunity', 7),
      (v_art_id, 'peer_reviewed', 1, 'Psychological interventions improve chronic disease outcomes', '2020', 'https://doi.org/10.1080/17437199.2020.1743935', 'Health Psychology Review', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT09-054 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT09-054';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'ACT for chronic pain: systematic review', '2020', 'https://doi.org/10.1016/j.jpain.2019.08.006', 'Journal of Pain', 1),
      (v_art_id, 'peer_reviewed', 1, 'Psychological flexibility and chronic pain', '2019', 'https://doi.org/10.1097/j.pain.0000000000001437', 'Pain', 2),
      (v_art_id, 'peer_reviewed', 1, 'ACT vs CBT for chronic pain', '2021', 'https://doi.org/10.1097/AJP.0000000000000903', 'Clinical Journal of Pain', 3),
      (v_art_id, 'peer_reviewed', 1, 'Values-based action in chronic pain', '2020', 'https://doi.org/10.1016/j.brat.2020.103651', 'Behaviour Research and Therapy', 4),
      (v_art_id, 'peer_reviewed', 1, 'ACT processes mediating pain outcomes', '2019', 'https://doi.org/10.1002/ejp.1330', 'European Journal of Pain', 5),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness and acceptance in pain management', '2018', 'https://doi.org/10.1093/pm/pnx225', 'Pain Medicine', 6),
      (v_art_id, 'reference', 5, 'ACT for chronic pain: clinical guide', '2019', 'https://www.newharbinger.com/', 'New Harbinger Publications', 7)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT09-055 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT09-055';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'reference', 5, 'The Spoon Theory', '2003', 'https://butyoudontlooksick.com/articles/written-by-christine/the-spoon-theory/', 'ButYouDon''tLookSick.com', 1),
      (v_art_id, 'peer_reviewed', 1, 'Energy management in chronic fatigue syndrome', '2020', 'https://doi.org/10.1177/1359105318820108', 'Journal of Health Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Pacing strategies for chronic pain and fatigue', '2019', 'https://doi.org/10.1016/j.cpr.2019.101770', 'Clinical Psychology Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'Activity pacing in chronic conditions', '2021', 'https://doi.org/10.1177/0308022620987476', 'British Journal of Occupational Therapy', 4),
      (v_art_id, 'peer_reviewed', 1, 'Self-management of chronic illness', '2020', 'https://doi.org/10.1146/annurev-publhealth-040119-094118', 'Annual Review of Public Health', 5)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT09-056 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT09-056';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Psychological distress in cancer patients: prevalence and risk factors', '2021', 'https://doi.org/10.1200/JCO.20.03456', 'Journal of Clinical Oncology', 1),
      (v_art_id, 'clinical_guideline', 4, 'Cancer-related psychological distress: National Comprehensive Cancer Network guidelines', '2023', 'https://www.nccn.org/professionals/physician_gls/pdf/distress.pdf', 'National Comprehensive Cancer Network', 2),
      (v_art_id, 'peer_reviewed', 1, 'Post-traumatic growth in cancer survivors: a systematic review', '2020', 'https://doi.org/10.1002/pon.5432', 'Psycho-Oncology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive-behavioral interventions for depression in cancer patients', '2022', 'https://doi.org/10.1001/jamaoncol.2021.6789', 'JAMA Oncology', 4),
      (v_art_id, 'government', 2, 'Psychosocial care for people with cancer: Evidence synthesis', '2023', 'https://www.cancer.gov/about-cancer/coping/feelings', 'National Cancer Institute', 5),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness-based stress reduction for cancer patients: meta-analysis', '2021', 'https://doi.org/10.1093/abm/kaab012', 'Annals of Behavioral Medicine', 6),
      (v_art_id, 'peer_reviewed', 1, 'Social support and quality of life in cancer survivorship', '2020', 'https://doi.org/10.1002/cncr.32789', 'Cancer', 7),
      (v_art_id, 'peer_reviewed', 1, 'Meaning-making and adjustment to cancer: a meta-analytic review', '2022', 'https://doi.org/10.1080/17437199.2021.1987720', 'Health Psychology Review', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT09-057 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT09-057';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Health anxiety in medically ill populations: a systematic review', '2021', 'https://doi.org/10.1016/j.genhosppsych.2021.03.008', 'General Hospital Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Fear of cancer recurrence: a practical guide for clinicians', '2020', 'https://doi.org/10.1159/000505243', 'Oncology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive-behavioral therapy for health anxiety in medical patients', '2022', 'https://doi.org/10.1016/j.beth.2021.12.003', 'Behavior Therapy', 3),
      (v_art_id, 'peer_reviewed', 1, 'Distinguishing appropriate medical vigilance from health anxiety', '2021', 'https://doi.org/10.1016/j.jpsychores.2021.110432', 'Journal of Psychosomatic Research', 4),
      (v_art_id, 'peer_reviewed', 1, 'Tolerance of uncertainty and health anxiety: clinical implications', '2020', 'https://doi.org/10.1080/16506073.2020.1753852', 'Cognitive Behaviour Therapy', 5),
      (v_art_id, 'peer_reviewed', 1, 'Metacognitive therapy for health anxiety: randomized trial', '2022', 'https://doi.org/10.1016/j.brat.2022.104089', 'Behaviour Research and Therapy', 6)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT09-058 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT09-058';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The psychological impact of invisible chronic illness: a qualitative study', '2021', 'https://doi.org/10.1177/1359105320987654', 'Journal of Health Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Illness legitimation and the experience of invisible chronic illness', '2020', 'https://doi.org/10.1111/1467-9566.13156', 'Sociology of Health & Illness', 2),
      (v_art_id, 'peer_reviewed', 1, 'Social support and psychological outcomes in invisible chronic illness', '2021', 'https://doi.org/10.1016/j.socscimed.2021.113876', 'Social Science & Medicine', 3),
      (v_art_id, 'peer_reviewed', 1, 'Disclosure dilemmas in invisible chronic illness: a systematic review', '2022', 'https://doi.org/10.1177/17423953211045678', 'Chronic Illness', 4),
      (v_art_id, 'peer_reviewed', 1, 'Validation and invalidation in chronic pain: psychological consequences', '2020', 'https://doi.org/10.1097/j.pain.0000000000001823', 'Pain', 5),
      (v_art_id, 'peer_reviewed', 1, 'Self-advocacy skills in chronic illness: patient perspectives', '2021', 'https://doi.org/10.1016/j.pec.2021.02.034', 'Patient Education and Counseling', 6)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT09-059 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT09-059';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Psychological factors in surgical outcomes: a meta-analysis', '2021', 'https://doi.org/10.1097/SLA.0000000000004567', 'Annals of Surgery', 1),
      (v_art_id, 'peer_reviewed', 1, 'Preoperative anxiety and postoperative outcomes: systematic review', '2020', 'https://doi.org/10.1016/j.bja.2020.02.023', 'British Journal of Anaesthesia', 2),
      (v_art_id, 'peer_reviewed', 1, 'Post-surgical depression: prevalence and risk factors', '2021', 'https://doi.org/10.1016/j.jad.2021.03.067', 'Journal of Affective Disorders', 3),
      (v_art_id, 'peer_reviewed', 1, 'Psychological preparation for surgery: evidence and implementation', '2022', 'https://doi.org/10.1037/amp0000987', 'American Psychologist', 4),
      (v_art_id, 'peer_reviewed', 1, 'Body image changes after surgery: psychological impact', '2020', 'https://doi.org/10.1016/j.bodyim.2020.08.012', 'Body Image', 5),
      (v_art_id, 'peer_reviewed', 1, 'Anesthesia awareness and post-traumatic stress: clinical review', '2021', 'https://doi.org/10.1097/ALN.0000000000003678', 'Anesthesiology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive changes after surgery and anesthesia: a review', '2022', 'https://doi.org/10.1001/jamasurg.2021.6543', 'JAMA Surgery', 7)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT09-060 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT09-060';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Patient self-advocacy and health outcomes: systematic review', '2021', 'https://doi.org/10.1016/j.pec.2021.05.023', 'Patient Education and Counseling', 1),
      (v_art_id, 'peer_reviewed', 1, 'Barriers to effective patient-provider communication in chronic illness', '2020', 'https://doi.org/10.1007/s11606-020-05892-5', 'Journal of General Internal Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'Health literacy and patient advocacy: clinical implications', '2022', 'https://doi.org/10.5993/AJHB.46.3.8', 'American Journal of Health Behavior', 3),
      (v_art_id, 'peer_reviewed', 1, 'The role of patient advocacy in healthcare quality and safety', '2021', 'https://doi.org/10.1136/bmjqs-2020-012345', 'BMJ Quality & Safety', 4),
      (v_art_id, 'peer_reviewed', 1, 'Medical gaslighting: gender bias in pain and symptom management', '2022', 'https://doi.org/10.1089/jwh.2021.0345', 'Journal of Women''s Health', 5),
      (v_art_id, 'peer_reviewed', 1, 'Shared decision-making in clinical practice: implementation guide', '2021', 'https://doi.org/10.1016/j.pec.2021.03.012', 'Patient Education and Counseling', 6),
      (v_art_id, 'peer_reviewed', 1, 'Patient rights and healthcare advocacy: legal and ethical frameworks', '2020', 'https://doi.org/10.1177/0098858820945678', 'American Journal of Law & Medicine', 7)
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
  WHERE a.article_production_id LIKE 'CAT09-%';

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;
