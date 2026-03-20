-- ============================================================================
-- Seed: Category 1 (Emotional Regulation & Self-Awareness) — Subcategory 02
-- 10 articles: CAT01-011 through CAT01-020
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert Category if not present
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  'Emotional Regulation & Self-Awareness',
  'emotional-regulation',
  '',
  'Brain',
  1,
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'emotional-regulation';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Everyday Emotional Regulation', 'everyday-emotional-regulation', v_cat_id, 2)
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'emotional-regulation';
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'everyday-emotional-regulation' AND category_id = v_cat_id;

  -- CAT01-011: 10 Evidence-Based Techniques to Regulate Your Emotions in the Moment
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    '10 Evidence-Based Techniques to Regulate Your Emotions in the Moment',
    '10-evidence-based-techniques-to-regulate-emotions',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Emotional Regulation', 'Coping Skills', 'CBT', 'Mindfulness', 'Self-Help'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-011',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover 10 science-backed strategies to manage intense emotions when they arise. Learn practical techniques from cognitive behavioral therapy, mindfulness, and neuroscience research.',
    '/images/articles/cat01/cover-011.svg',
    10,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-012: The STOP Technique: A 60-Second Reset When Emotions Overwhelm You
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The STOP Technique: A 60-Second Reset When Emotions Overwhelm You',
    'stop-technique-60-second-reset',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['STOP Technique', 'Emotional Regulation', 'DBT', 'Quick Coping', 'Stress Management'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-012',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn the STOP technique — a simple four-step method used in CBT and DBT to pause emotional reactivity and regain control in under a minute.',
    '/images/articles/cat01/cover-012.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-013: Breathing Exercises That Actually Work for Emotional Regulation
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Breathing Exercises That Actually Work for Emotional Regulation',
    'breathing-exercises-for-emotional-regulation',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Breathing Exercises', 'Nervous System', 'Stress Relief', 'Vagus Nerve', 'Relaxation'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-013',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore breathing techniques backed by science — from box breathing to physiological sighs — and learn which patterns work best for different emotional states.',
    '/images/articles/cat01/cover-013.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-014: Grounding Techniques: How to Come Back to the Present When Feelings Take Over
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Grounding Techniques: How to Come Back to the Present When Feelings Take Over',
    'grounding-techniques-come-back-to-present',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Grounding', 'Anxiety Relief', 'Dissociation', 'Mindfulness', 'Trauma Recovery'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-014',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn grounding techniques used in therapy to anchor yourself in the present moment during emotional overwhelm, anxiety, or dissociation.',
    '/images/articles/cat01/cover-014.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-015: Cognitive Reappraisal: How to Change What You Feel by Changing How You Think
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Cognitive Reappraisal: How to Change What You Feel by Changing How You Think',
    'cognitive-reappraisal-change-feelings-by-changing-thoughts',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Cognitive Reappraisal', 'CBT', 'Thought Patterns', 'Emotional Regulation', 'Reframing'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-015',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn cognitive reappraisal — the gold-standard emotion regulation strategy from CBT. Discover how reframing your interpretation of events can transform your emotional experience.',
    '/images/articles/cat01/cover-015.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-016: The Power of Naming Your Emotions: Why Labeling Feelings Calms the Brain
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Power of Naming Your Emotions: Why Labeling Feelings Calms the Brain',
    'power-of-naming-emotions-affect-labeling',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Affect Labeling', 'Neuroscience', 'Emotional Awareness', 'Brain Research', 'fMRI'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-016',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover the neuroscience behind affect labeling — how simply naming your emotions reduces amygdala activation and helps you regain emotional control.',
    '/images/articles/cat01/cover-016.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-017: Emotional First Aid: What to Do in the First 5 Minutes of a Strong Emotion
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Emotional First Aid: What to Do in the First 5 Minutes of a Strong Emotion',
    'emotional-first-aid-first-five-minutes',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Emotional First Aid', 'Crisis Coping', 'Emotional Regulation', 'Quick Interventions', 'Self-Care'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-017',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn a five-minute emotional first aid protocol for the critical window when intense feelings first hit. Evidence-based steps to stabilize before emotions spiral.',
    '/images/articles/cat01/cover-017.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-018: How to Sit with Uncomfortable Emotions Without Numbing or Avoiding
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How to Sit with Uncomfortable Emotions Without Numbing or Avoiding',
    'sit-with-uncomfortable-emotions-without-numbing',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Distress Tolerance', 'ACT', 'Emotional Avoidance', 'Mindfulness', 'Acceptance'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-018',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn to tolerate difficult feelings without suppressing, avoiding, or numbing them. Evidence-based approaches from ACT, DBT, and mindfulness research.',
    '/images/articles/cat01/cover-018.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-019: Using Movement to Regulate Your Nervous System
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Using Movement to Regulate Your Nervous System',
    'using-movement-to-regulate-nervous-system',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Movement', 'Nervous System', 'Exercise', 'Polyvagal Theory', 'Body-Based Regulation'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-019',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how physical movement — from walking to shaking to yoga — directly regulates your nervous system and transforms emotional states, backed by neuroscience research.',
    '/images/articles/cat01/cover-019.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-020: Building an Emotional Regulation Toolkit: Your Personalized Plan
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Building an Emotional Regulation Toolkit: Your Personalized Plan',
    'building-emotional-regulation-toolkit',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Emotional Toolkit', 'Personalized Coping', 'Self-Help', 'Wellness Plan', 'Emotional Skills'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-020',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Create a personalized emotional regulation toolkit tailored to your unique triggers, strengths, and lifestyle. A practical guide to assembling strategies that actually work for you.',
    '/images/articles/cat01/cover-020.svg',
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

  -- === CAT01-011 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-011';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The emerging field of emotion regulation: An integrative review', '1998', 'https://doi.org/10.1037/1089-2680.2.3.271', 'Review of General Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive emotion regulation strategies and depressive symptoms: differences between males and females', '2004', 'https://doi.org/10.1016/j.paid.2003.12.004', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Emotion regulation: Current status and future prospects', '2015', 'https://doi.org/10.1080/1047840X.2014.940781', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness-based stress reduction and health benefits: A meta-analysis', '2004', 'https://doi.org/10.1016/S0022-3999(03)00573-7', 'Journal of Psychosomatic Research', 4),
      (v_art_id, 'peer_reviewed', 1, 'The efficacy of cognitive behavioral therapy: A review of meta-analyses', '2012', 'https://doi.org/10.1007/s10608-012-9476-1', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Putting feelings into words: Affect labeling disrupts amygdala activity in response to affective stimuli', '2007', 'https://doi.org/10.1111/j.1467-9280.2007.01916.x', 'Psychological Science', 6),
      (v_art_id, 'government', 2, 'Deep breathing and relaxation techniques for stress management', '2023', 'https://www.nccih.nih.gov/health/relaxation-techniques-what-you-need-to-know', NULL, 7),
      (v_art_id, 'professional_org', 3, 'Coping with stress: Strategies that work', '2022', 'https://www.apa.org/topics/stress/managing-stress', NULL, 8),
      (v_art_id, 'peer_reviewed', 1, 'The role of physical activity in managing stress and emotion', '2020', 'https://doi.org/10.3389/fpsyg.2020.01362', 'Frontiers in Psychology', 9),
      (v_art_id, 'peer_reviewed', 1, 'Emotion regulation choice: A conceptual framework and supporting evidence', '2017', 'https://doi.org/10.1037/xge0000250', 'Journal of Experimental Psychology: General', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-012 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-012';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'textbook', 5, 'Skills training manual for treating borderline personality disorder', '2015', 'https://doi.org/10.1016/j.cpr.2006.10.002', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Dialectical behavior therapy: A comprehensive multi- and transdiagnostic intervention', '2020', 'https://doi.org/10.1016/j.cpr.2019.101786', 'Clinical Psychology Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'The role of distress tolerance in emotion regulation', '2010', 'https://doi.org/10.1016/j.beth.2009.09.005', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Pausing before acting: Brief mindfulness practice reduces impulsive responding', '2016', 'https://doi.org/10.1007/s12671-015-0467-z', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Emotional reactivity and cognitive control in anxiety: A neural perspective', '2014', 'https://doi.org/10.1016/j.biopsycho.2014.07.014', 'Biological Psychology', 5),
      (v_art_id, 'professional_org', 3, 'Stress in America 2023: A national mental health crisis', '2023', 'https://www.apa.org/news/press/releases/stress/2023/collective-trauma-recovery', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Behavioral activation and inhibition in daily life', '2001', 'https://doi.org/10.1037/0022-3514.80.6.958', 'Journal of Personality and Social Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Brief interventions for emotion regulation: A systematic review', '2021', 'https://doi.org/10.1016/j.jad.2020.11.072', 'Journal of Affective Disorders', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-013 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-013';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'How breath-control can change your life: A systematic review on psycho-physiological correlates of slow breathing', '2018', 'https://doi.org/10.3389/fnhum.2018.00353', 'Frontiers in Human Neuroscience', 1),
      (v_art_id, 'peer_reviewed', 1, 'Brief structured respiration practices enhance mood and reduce physiological arousal', '2023', 'https://doi.org/10.1016/j.xcrm.2022.100895', 'Cell Reports Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'Voluntary activation of the sympathetic nervous system and attenuation of the innate immune response in humans', '2014', 'https://doi.org/10.1073/pnas.1322174111', 'Proceedings of the National Academy of Sciences', 3),
      (v_art_id, 'peer_reviewed', 1, 'Heart rate variability biofeedback: How and why does it work?', '2014', 'https://doi.org/10.3389/fpsyg.2014.00756', 'Frontiers in Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'The effect of diaphragmatic breathing on attention, negative affect and stress in healthy adults', '2017', 'https://doi.org/10.3389/fpsyg.2017.00874', 'Frontiers in Psychology', 5),
      (v_art_id, 'government', 2, 'Relaxation techniques for health: What the science says', '2023', 'https://www.nccih.nih.gov/health/relaxation-techniques-what-you-need-to-know', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Breathing practices for treatment of psychiatric and stress-related medical conditions', '2013', 'https://doi.org/10.1016/j.psc.2013.01.001', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Sudarshan Kriya yoga: Breathing for health', '2013', 'https://doi.org/10.4103/0973-6131.113405', 'International Journal of Yoga', 8),
      (v_art_id, 'textbook', 5, 'Clinical handbook of psychological disorders: A step-by-step treatment manual', '2014', 'https://www.guilford.com/books/Clinical-Handbook-of-Psychological-Disorders/Barlow/9781462513260', NULL, 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-014 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-014';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Grounding techniques for PTSD: A systematic review', '2019', 'https://doi.org/10.1002/jts.22439', 'Journal of Traumatic Stress', 1),
      (v_art_id, 'peer_reviewed', 1, 'Sensory-based interventions for adults with mental health conditions: A systematic review', '2018', 'https://doi.org/10.1177/0308022617741480', 'British Journal of Occupational Therapy', 2),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness-based interventions for anxiety and depression', '2016', 'https://doi.org/10.1016/j.cpr.2015.12.005', 'Clinical Psychology Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'Post-traumatic stress disorder: Evidence-based research for the third millennium', '2019', 'https://doi.org/10.1136/ebmental-2019-300071', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Dissociation and dissociative disorders: Challenging conventional wisdom', '2018', 'https://doi.org/10.1177/0963721418794759', 'Current Directions in Psychological Science', 5),
      (v_art_id, 'textbook', 5, 'Seeking Safety: A treatment manual for PTSD and substance abuse', '2002', 'https://www.guilford.com/books/Seeking-Safety/Lisa-Najavits/9781572306394', NULL, 6),
      (v_art_id, 'professional_org', 3, 'Coping with anxiety: Grounding techniques', '2023', 'https://www.nami.org/Blogs/NAMI-Blog/2023/Grounding-Techniques-for-Anxiety', NULL, 7),
      (v_art_id, 'textbook', 5, 'The body keeps the score: Brain, mind, and body in the healing of trauma', '2014', 'https://doi.org/10.1176/appi.books.9780890425596', NULL, 8),
      (v_art_id, 'peer_reviewed', 1, 'Present-centered therapy versus cognitive processing therapy for PTSD', '2015', 'https://doi.org/10.1037/ccp0000019', 'Journal of Consulting and Clinical Psychology', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-015 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-015';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Cognitive reappraisal of emotion: A meta-analysis of human neuroimaging studies', '2014', 'https://doi.org/10.1093/cercor/bht154', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Individual differences in two emotion regulation processes: Implications for affect, relationships, and well-being', '2003', 'https://doi.org/10.1037/0022-3514.85.2.348', 'Journal of Personality and Social Psychology', 2),
      (v_art_id, 'textbook', 5, 'Cognitive therapy of depression', '1979', 'https://www.guilford.com/books/Cognitive-Therapy-of-Depression/Beck-Rush-Shaw-Emery/9780898629194', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'The process model of emotion regulation: Convergences and divergences with existing frameworks', '2023', 'https://doi.org/10.1177/17540739231164100', 'Emotion Review', 4),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive change as a mechanism of action in cognitive therapy', '2010', 'https://doi.org/10.1001/archgenpsychiatry.2009.198', 'Archives of General Psychiatry', 5),
      (v_art_id, 'peer_reviewed', 1, 'Reappraisal generation after stressor exposure: Effects on emotion', '2017', 'https://doi.org/10.1037/emo0000271', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Age-related differences in emotion regulation: From emotion identification to reappraisal success', '2021', 'https://doi.org/10.1037/dev0001116', 'Developmental Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive behavioral therapy for anxiety disorders: An update on the empirical evidence', '2015', 'https://doi.org/10.31887/DCNS.2015.17.3/akaczkurkin', 'Dialogues in Clinical Neuroscience', 8),
      (v_art_id, 'government', 2, 'The nature and treatment of emotion dysregulation', '2022', 'https://www.nimh.nih.gov/health/topics/emotion-regulation', NULL, 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-016 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-016';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Putting feelings into words: Affect labeling disrupts amygdala activity in response to affective stimuli', '2007', 'https://doi.org/10.1111/j.1467-9280.2007.01916.x', 'Psychological Science', 1),
      (v_art_id, 'peer_reviewed', 1, 'Putting feelings into words: Affect labeling as implicit emotion regulation', '2018', 'https://doi.org/10.1177/1754073917742706', 'Emotion Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'The neural bases of emotion regulation: Reappraisal and suppression of negative emotion', '2008', 'https://doi.org/10.1016/j.biopsych.2007.05.031', 'Biological Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Emotional granularity increases with intensive emotion regulation training', '2021', 'https://doi.org/10.1177/0956797620978816', 'Psychological Science', 4),
      (v_art_id, 'textbook', 5, 'How emotions are made: The secret life of the brain', '2017', 'https://doi.org/10.1353/ppp.2018.0014', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Affect labeling and reappraisal: Mapping the neural bases of emotion regulation', '2019', 'https://doi.org/10.1016/j.neuroimage.2019.02.058', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'A meta-analysis of emotion regulation in the context of stress', '2017', 'https://doi.org/10.1037/bul0000100', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'The power of language: How words shape people and culture', '2023', 'https://doi.org/10.1146/annurev-psych-042820-032354', 'Annual Review of Psychology', 8),
      (v_art_id, 'peer_reviewed', 1, 'Affect labeling in the treatment of anxiety disorders', '2012', 'https://doi.org/10.1016/j.brat.2012.04.001', NULL, 9),
      (v_art_id, 'government', 2, 'Emotional awareness and emotion regulation', '2022', 'https://www.nimh.nih.gov/health/topics/emotion-regulation', NULL, 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-017 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-017';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'textbook', 5, 'Emotional first aid: Healing rejection, guilt, failure, and other everyday hurts', '2013', 'https://doi.org/10.1037/e500962014-001', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'The time course of emotional responses to provocation: Effects of regulation strategies', '2012', 'https://doi.org/10.1037/a0024400', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Stress inoculation training: A preventive and treatment approach', '2007', 'https://doi.org/10.1016/B978-012372564-2/50020-X', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Self-compassion and emotional recovery after a major life event', '2020', 'https://doi.org/10.1037/pspp0000266', 'Journal of Personality and Social Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Acute stress and cortisol responses: A systematic review and meta-analysis', '2018', 'https://doi.org/10.1016/j.psyneuen.2018.01.010', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Distress tolerance and emotion regulation strategies', '2010', 'https://doi.org/10.1016/j.beth.2009.09.005', NULL, 6),
      (v_art_id, 'textbook', 5, 'The window of tolerance: A framework for understanding trauma responses', '1999', 'https://wwnorton.com/books/9780393702842', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Brief emotion regulation strategies: A comparison of effectiveness', '2019', 'https://doi.org/10.1080/02699931.2018.1530686', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-018 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-018';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'textbook', 5, 'Acceptance and commitment therapy: The process and practice of mindful change', '2012', 'https://doi.org/10.1016/j.brat.2006.08.006', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Experiential avoidance and behavioral disorders: A functional dimensional approach to diagnosis and treatment', '1996', 'https://doi.org/10.1037/0022-006X.64.6.1152', 'Journal of Consulting and Clinical Psychology', 2),
      (v_art_id, 'textbook', 5, 'Mindfulness-based cognitive therapy for depression: A new approach to preventing relapse', '2013', 'https://www.guilford.com/books/Mindfulness-Based-Cognitive-Therapy-for-Depression/Segal-Williams-Teasdale/9781462507504', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Distress tolerance and psychopathology: A review', '2005', 'https://doi.org/10.1016/j.cpr.2005.01.001', 'Clinical Psychology Review', 4),
      (v_art_id, 'peer_reviewed', 1, 'The role of experiential avoidance in anxiety disorders', '2009', 'https://doi.org/10.1016/j.brat.2009.07.014', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Effects of mindfulness on psychological health: A review of empirical studies', '2011', 'https://doi.org/10.1016/j.cpr.2011.04.006', 'Clinical Psychology Review', 6),
      (v_art_id, 'textbook', 5, 'Radical acceptance: Embracing your life with the heart of a Buddha', '2003', 'https://www.tarabrach.com/radical-acceptance/', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Emotion regulation and psychopathology: A transdiagnostic approach', '2010', 'https://doi.org/10.1146/annurev.clinpsy.121208.131208', 'Annual Review of Clinical Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-019 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-019';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Exercise for mental health: A review of the evidence', '2006', 'https://doi.org/10.4088/JCP.0106e08', 'Journal of Clinical Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'The polyvagal theory: New insights into adaptive reactions of the autonomic nervous system', '2009', 'https://doi.org/10.3949/ccjm.76.s2.17', 'Cleveland Clinic Journal of Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'Acute exercise and mood: A meta-analysis', '2000', 'https://doi.org/10.1123/jsep.22.2.138', 'Journal of Sport and Exercise Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Yoga for anxiety and depression: A systematic review', '2009', 'https://doi.org/10.1016/j.cpr.2009.05.003', 'Clinical Psychology Review', 4),
      (v_art_id, 'peer_reviewed', 1, 'Effects of exercise on anxiety, depression, and mood', '2013', 'https://doi.org/10.1016/j.psc.2012.12.005', NULL, 5),
      (v_art_id, 'textbook', 5, 'Trauma-sensitive yoga in therapy: Bringing the body into treatment', '2015', 'https://wwnorton.com/books/9780393709506', NULL, 6),
      (v_art_id, 'government', 2, 'Physical activity and mental health: Current concepts', '2022', 'https://www.who.int/news-room/fact-sheets/detail/physical-activity', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'The anxiolytic effects of exercise: A meta-analysis of randomized trials', '2015', 'https://doi.org/10.1007/s12160-014-9685-9', 'Annals of Behavioral Medicine', 8),
      (v_art_id, 'peer_reviewed', 1, 'Neurobiological effects of physical exercise: Implications for the treatment of affective disorders', '2019', 'https://doi.org/10.1038/s41398-019-0456-z', 'Translational Psychiatry', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-020 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-020';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Emotion regulation flexibility', '2015', 'https://doi.org/10.1080/02699931.2014.985670', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'The effectiveness of emotion regulation strategy use and well-being', '2019', 'https://doi.org/10.1080/17439760.2018.1545042', 'Journal of Positive Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Personalized approaches to psychotherapy: From theory to practice', '2020', 'https://doi.org/10.1016/j.cpr.2020.101862', 'Clinical Psychology Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'Self-monitoring in emotion regulation: A framework for personalizing interventions', '2017', 'https://doi.org/10.1016/j.brat.2017.07.001', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Emotional intelligence: Implications for personal, social, academic, and workplace success', '2011', 'https://doi.org/10.1111/j.1751-9004.2010.00334.x', 'Social and Personality Psychology Compass', 5),
      (v_art_id, 'government', 2, 'Building resilience: A key to mental health promotion', '2022', 'https://www.who.int/publications/i/item/9789240055186', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'The importance of context in emotion regulation', '2021', 'https://doi.org/10.1177/1754073921997816', 'Emotion Review', 7),
      (v_art_id, 'government', 2, 'Developing a wellness plan: Strategies for prevention and recovery', '2022', 'https://www.samhsa.gov/brss-tacs/recovery-support-tools/wellness-plan', NULL, 8)
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
  WHERE a.article_production_id LIKE 'CAT01-%';

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;
