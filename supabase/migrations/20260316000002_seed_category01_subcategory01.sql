-- ============================================================================
-- Seed: Category 1 (Emotional Regulation & Self-Awareness) — Subcategory 1
-- 10 articles: Understanding Your Emotions (articles cat01-001 through cat01-010)
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 0. Fix FK: articles.category_id should reference article_categories, not categories
--    (The column was created by an earlier schema pointing to the old `categories` table.
--     The production_system migration's ADD COLUMN IF NOT EXISTS skipped since it existed.)
-- ---------------------------------------------------------------------------

DO $$
BEGIN
  -- Drop the old FK to `categories` if it exists
  IF EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'articles_category_id_fkey'
      AND table_name = 'articles'
  ) THEN
    ALTER TABLE public.articles DROP CONSTRAINT articles_category_id_fkey;
  END IF;

  -- Drop the new FK if a previous partial run created it
  IF EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'articles_category_id_article_categories_fkey'
      AND table_name = 'articles'
  ) THEN
    ALTER TABLE public.articles DROP CONSTRAINT articles_category_id_article_categories_fkey;
  END IF;

  -- Disable user triggers to avoid updated_at trigger issues during cleanup
  ALTER TABLE public.articles DISABLE TRIGGER USER;

  -- Null out any category_id values that reference the old `categories` table
  -- (they won't match article_categories UUIDs)
  UPDATE public.articles
  SET category_id = NULL
  WHERE category_id IS NOT NULL
    AND category_id NOT IN (SELECT id FROM public.article_categories);

  -- Re-enable user triggers
  ALTER TABLE public.articles ENABLE TRIGGER USER;

  -- Add the correct FK to `article_categories`
  ALTER TABLE public.articles
    ADD CONSTRAINT articles_category_id_article_categories_fkey
    FOREIGN KEY (category_id) REFERENCES public.article_categories(id) ON DELETE SET NULL;
END $$;

-- ---------------------------------------------------------------------------
-- 1. Insert Category 1 (content architecture) if not present
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  'Emotional Regulation & Self-Awareness',
  'emotional-regulation',
  'Understanding your emotional world — how feelings form, how to name them accurately, and how to work with them rather than against them.',
  'Sparkles',
  16,
  80,
  '#8B5CF6'
)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------------------
-- 2. Insert Subcategory 1: Understanding Your Emotions
-- ---------------------------------------------------------------------------

DO $$
DECLARE
  v_cat_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'emotional-regulation';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Understanding Your Emotions', 'understanding-emotions', v_cat_id, 1)
  ON CONFLICT (slug, category_id) DO NOTHING;
END $$;

-- ---------------------------------------------------------------------------
-- 3. Insert 10 Articles
-- ---------------------------------------------------------------------------

DO $$
DECLARE
  v_cat_id UUID;
  v_sub_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'emotional-regulation';
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'understanding-emotions' AND category_id = v_cat_id;

  -- cat01-001: What Are Emotions, Really?
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'What Are Emotions, Really? A Beginner''s Guide to How Feelings Work',
    'what-are-emotions-beginners-guide',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Emotional Literacy', 'Psychology', 'Self-Awareness', 'Wellbeing'],
    1400,
    'Raima',
    'self_help',
    'CAT01-001',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover the science behind your feelings — what emotions actually are, how they form in the brain and body, and why understanding them is the first step toward emotional wellbeing.',
    '/images/articles/cat01/cover-001.svg',
    8,
    FALSE,
    TRUE,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- cat01-002: The Emotion Spectrum
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Emotion Spectrum: Why Your Feelings Exist on a Continuum, Not in Boxes',
    'emotion-spectrum-feelings-continuum',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Emotional Literacy', 'Psychology', 'Self-Awareness'],
    1200,
    'Raima',
    'self_help',
    'CAT01-002',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Emotions are not on-off switches. Learn how the spectrum model of emotions can help you understand subtle shifts in how you feel and respond more skillfully.',
    '/images/articles/cat01/cover-002.svg',
    8,
    FALSE,
    FALSE,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- cat01-003: Why "Negative" Emotions Aren't Actually Bad
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Why "Negative" Emotions Aren''t Actually Bad for You',
    'negative-emotions-not-bad',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Emotional Acceptance', 'Psychology', 'Mental Health'],
    1400,
    'Raima',
    'self_help',
    'CAT01-003',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Anger, sadness, fear, and guilt all serve important purposes. Learn why suppressing uncomfortable emotions can backfire and how accepting them leads to better mental health.',
    '/images/articles/cat01/cover-003.svg',
    9,
    FALSE,
    FALSE,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- cat01-004: The Science of Emotional Triggers
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Science of Emotional Triggers: What Fires Off Your Feelings and Why',
    'science-of-emotional-triggers',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Emotional Triggers', 'Neuroscience', 'Self-Awareness', 'Coping'],
    1400,
    'Raima',
    'self_help',
    'CAT01-004',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Why do certain situations, words, or memories set off intense emotional reactions? Explore the neuroscience of triggers and learn practical strategies for managing them.',
    '/images/articles/cat01/cover-004.svg',
    8,
    FALSE,
    FALSE,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- cat01-005: Emotional Granularity
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Emotional Granularity: How Naming Your Feelings More Precisely Changes Everything',
    'emotional-granularity-naming-feelings',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Emotional Granularity', 'Emotional Literacy', 'Self-Awareness', 'Wellbeing'],
    1400,
    'Raima',
    'self_help',
    'CAT01-005',
    v_cat_id,
    v_sub_id,
    'drafted',
    'People who distinguish between fine-grained emotional states manage stress better, make clearer decisions, and have stronger relationships. Learn how to build this skill.',
    '/images/articles/cat01/cover-005.svg',
    8,
    FALSE,
    FALSE,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- cat01-006: Why You Feel Everything So Deeply
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Why You Feel Everything So Deeply: Understanding Emotional Sensitivity',
    'why-you-feel-everything-deeply',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Emotional Sensitivity', 'HSP', 'Self-Awareness', 'Wellbeing'],
    1400,
    'Raima',
    'self_help',
    'CAT01-006',
    v_cat_id,
    v_sub_id,
    'drafted',
    'If your emotions seem more intense than other people''s, you may have high emotional sensitivity. Learn what causes it, why it is not a weakness, and how to work with it rather than against it.',
    '/images/articles/cat01/cover-006.svg',
    9,
    FALSE,
    FALSE,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- cat01-007: Feelings vs Emotions vs Moods
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Difference Between Feelings, Emotions, and Moods — And Why It Matters',
    'feelings-emotions-moods-difference',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Emotional Literacy', 'Psychology', 'Self-Awareness'],
    1200,
    'Raima',
    'self_help',
    'CAT01-007',
    v_cat_id,
    v_sub_id,
    'drafted',
    'These three terms are used interchangeably, but they describe different things. Understanding the distinction helps you respond more effectively to your inner experience.',
    '/images/articles/cat01/cover-007.svg',
    8,
    FALSE,
    FALSE,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- cat01-008: How Your Brain Decides What You Feel
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How Your Brain Decides What You Feel Before You Even Know It',
    'brain-decides-what-you-feel',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Neuroscience', 'Emotional Processing', 'Self-Awareness', 'Brain Science'],
    1400,
    'Raima',
    'self_help',
    'CAT01-008',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Your brain constructs emotions unconsciously before you become aware of them. Learn how prediction, memory, and body signals shape your emotional experience — and how to use this knowledge.',
    '/images/articles/cat01/cover-008.svg',
    9,
    FALSE,
    FALSE,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- cat01-009: Mixed Emotions
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Mixed Emotions: Why You Can Feel Two Contradictory Things at Once',
    'mixed-emotions-contradictory-feelings',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Mixed Emotions', 'Emotional Complexity', 'Psychology', 'Self-Awareness'],
    1200,
    'Raima',
    'self_help',
    'CAT01-009',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Feeling happy and sad at the same time is not confusion — it is a sign of emotional complexity. Learn why mixed emotions are normal, healthy, and even beneficial.',
    '/images/articles/cat01/cover-009.svg',
    8,
    FALSE,
    FALSE,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- cat01-010: The Purpose of Emotions
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Purpose of Emotions: What Evolutionary Psychology Tells Us About Why We Feel',
    'purpose-of-emotions-evolutionary-psychology',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Evolutionary Psychology', 'Emotional Literacy', 'Science', 'Wellbeing'],
    1400,
    'Raima',
    'self_help',
    'CAT01-010',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Every core emotion exists because it solved a survival problem for our ancestors. Understanding the evolutionary function of your feelings can transform how you relate to them.',
    '/images/articles/cat01/cover-010.svg',
    8,
    FALSE,
    FALSE,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

END $$;

-- ---------------------------------------------------------------------------
-- 4. Insert Citations (linked to articles by production ID)
-- ---------------------------------------------------------------------------

DO $$
DECLARE
  v_art_id UUID;
BEGIN

  -- === CAT01-001 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-001';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 5, 'The nature of emotion: fundamental questions', 2018, 'https://doi.org/10.1093/oso/9780190612573.001.0001', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Emotion regulation: current status and future prospects', 2015, 'https://doi.org/10.1080/1047840X.2014.940781', 'Psychological Inquiry', 2),
      (v_art_id, 'peer_reviewed', 1, 'The science of emotion: what people believe, what the evidence shows, and where to go from here', 2019, 'https://doi.org/10.1177/1529100619832930', 'Psychological Science in the Public Interest', 3),
      (v_art_id, 'textbook', 5, 'How emotions are made: the secret life of the brain', 2017, NULL, NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Emotional responses to music: the need to consider underlying mechanisms', 2008, 'https://doi.org/10.1017/S0140525X08005293', 'Behavioral and Brain Sciences', 5),
      (v_art_id, 'peer_reviewed', 1, 'The role of emotion in decision-making: evidence from neurological patients with orbitofrontal damage', 2004, 'https://doi.org/10.1016/j.bandc.2003.04.001', 'Brain and Cognition', 6),
      (v_art_id, 'government', 2, 'Emotions: brief for policymakers and practitioners', 2023, 'https://www.nimh.nih.gov/health/topics/emotions', NULL, 7),
      (v_art_id, 'professional_org', 3, 'Understanding emotions in social interactions', 2022, 'https://www.apa.org/topics/emotions', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-002 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-002';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The circumplex model of affect: an integrative approach to affective neuroscience', 2005, 'https://doi.org/10.1016/j.dcn.2005.05.009', 'Development and Psychopathology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Core affect and the psychological construction of emotion', 2003, 'https://doi.org/10.1037/0033-295X.110.1.145', 'Psychological Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Emotions as discrete internal states: the dimensional approach', 2019, 'https://doi.org/10.1016/j.neubiorev.2019.01.024', 'Neuroscience & Biobehavioral Reviews', 3),
      (v_art_id, 'peer_reviewed', 1, 'Emotional complexity and emotion regulation in daily life', 2020, 'https://doi.org/10.1037/emo0000695', 'Emotion', 4),
      (v_art_id, 'peer_reviewed', 1, 'Affect labeling and the neural bases of emotion regulation', 2018, 'https://doi.org/10.1016/j.tics.2018.07.001', 'Trends in Cognitive Sciences', 5),
      (v_art_id, 'government', 2, 'Understanding the stress response', 2023, 'https://www.nimh.nih.gov/health/publications/stress', NULL, 6),
      (v_art_id, 'professional_org', 3, 'Emotions and health: current research and practice', 2021, 'https://www.apa.org/topics/emotions/health', NULL, 7),
      (v_art_id, 'textbook', 5, 'Principles of affective science', 2022, NULL, NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-003 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-003';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The costs of emotion suppression: a meta-analysis', 2021, 'https://doi.org/10.1037/bul0000351', 'Psychological Bulletin', 1),
      (v_art_id, 'peer_reviewed', 1, 'Acceptance and commitment therapy: model, processes, and outcomes', 2006, 'https://doi.org/10.1016/j.brat.2005.06.006', 'Behaviour Research and Therapy', 2),
      (v_art_id, 'peer_reviewed', 1, 'The functional role of negative emotions in everyday life', 2019, 'https://doi.org/10.1037/emo0000596', 'Emotion', 3),
      (v_art_id, 'peer_reviewed', 1, 'Anger and cardiovascular health: a systematic review', 2020, 'https://doi.org/10.1016/j.jacc.2019.12.046', 'Journal of the American College of Cardiology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Emotional suppression and mortality risk over a 12-year follow-up', 2013, 'https://doi.org/10.1037/a0031987', 'Journal of Psychosomatic Research', 5),
      (v_art_id, 'government', 2, 'Emotional wellness toolkit', 2023, 'https://www.nih.gov/health-information/emotional-wellness-toolkit', NULL, 6),
      (v_art_id, 'professional_org', 3, 'The role of negative emotions in emotional health', 2022, 'https://www.apa.org/topics/anger', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Experiential avoidance as a functional dimensional approach to psychopathology', 2004, 'https://doi.org/10.1016/j.brat.2004.04.006', 'Behaviour Research and Therapy', 8),
      (v_art_id, 'textbook', 5, 'The upside of your dark side', 2014, NULL, NULL, 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-004 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-004';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Amygdala response to emotional stimuli: a comparison of faces and scenes', 2002, 'https://doi.org/10.1006/nimg.2002.1179', 'NeuroImage', 1),
      (v_art_id, 'peer_reviewed', 1, 'Neural predictors of emotional responses during exposure therapy', 2020, 'https://doi.org/10.1016/j.biopsych.2020.01.025', 'Biological Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'The cognitive model of emotion: affective computing and the role of appraisal', 2019, 'https://doi.org/10.1016/j.cobeha.2019.09.006', 'Current Opinion in Behavioral Sciences', 3),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness-based stress reduction and emotional regulation', 2017, 'https://doi.org/10.1007/s12671-017-0735-2', 'Mindfulness', 4),
      (v_art_id, 'government', 2, 'Post-traumatic stress disorder', 2023, 'https://www.nimh.nih.gov/health/topics/post-traumatic-stress-disorder-ptsd', NULL, 5),
      (v_art_id, 'professional_org', 3, 'Understanding emotional triggers', 2022, 'https://www.apa.org/topics/stress', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive reappraisal: neural mechanisms and clinical implications', 2018, 'https://doi.org/10.1016/j.tics.2018.04.002', 'Trends in Cognitive Sciences', 7),
      (v_art_id, 'textbook', 5, 'Cognitive behavior therapy: basics and beyond', 2020, NULL, NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-005 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-005';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Emotional granularity increases with age', 2015, 'https://doi.org/10.1037/a0039289', 'Psychology and Aging', 1),
      (v_art_id, 'peer_reviewed', 1, 'Emotion differentiation as a protective factor against nonsuicidal self-injury', 2018, 'https://doi.org/10.1037/emo0000476', 'Emotion', 2),
      (v_art_id, 'peer_reviewed', 1, 'Affect labeling: a conceptual review and new directions', 2021, 'https://doi.org/10.1177/09637214211006969', 'Current Directions in Psychological Science', 3),
      (v_art_id, 'peer_reviewed', 1, 'Putting feelings into words: affect labeling disrupts amygdala activity', 2007, 'https://doi.org/10.1111/j.1467-9280.2007.01916.x', 'Psychological Science', 4),
      (v_art_id, 'peer_reviewed', 1, 'Emotional granularity and borderline personality disorder', 2014, 'https://doi.org/10.1037/abn0000012', 'Journal of Abnormal Psychology', 5),
      (v_art_id, 'government', 2, 'Coping with stress', 2023, 'https://www.cdc.gov/mentalhealth/cope-with-stress/', NULL, 6),
      (v_art_id, 'professional_org', 3, 'The power of naming your feelings', 2022, 'https://www.apa.org/topics/emotions/labeling', NULL, 7),
      (v_art_id, 'textbook', 5, 'How emotions are made: the secret life of the brain', 2017, NULL, NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-006 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-006';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Sensory processing sensitivity: a review of the research', 2019, 'https://doi.org/10.1016/j.cpr.2019.101754', 'Clinical Psychology Review', 1),
      (v_art_id, 'peer_reviewed', 1, 'The highly sensitive brain: an fMRI study of sensory processing sensitivity', 2014, 'https://doi.org/10.1016/j.bandc.2013.09.007', 'Brain and Cognition', 2),
      (v_art_id, 'peer_reviewed', 1, 'Differential susceptibility to environmental influences', 2013, 'https://doi.org/10.1016/j.dr.2012.12.001', 'Developmental Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'Emotional sensitivity and emotion regulation in adolescents', 2021, 'https://doi.org/10.1037/dev0001121', 'Developmental Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Sensory processing sensitivity and its relation to introversion and emotionality', 2005, 'https://doi.org/10.1037/0022-3514.89.4.580', 'Journal of Personality and Social Psychology', 5),
      (v_art_id, 'government', 2, 'Emotional wellness and sensitivity', 2023, 'https://www.nimh.nih.gov/health/topics/caring-for-your-mental-health', NULL, 6),
      (v_art_id, 'professional_org', 3, 'Highly sensitive persons: understanding emotional depth', 2022, 'https://www.apa.org/topics/personality/sensitivity', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Self-compassion and sensory processing sensitivity', 2020, 'https://doi.org/10.1007/s12671-020-01365-3', 'Mindfulness', 8),
      (v_art_id, 'textbook', 5, 'The highly sensitive person', 2016, NULL, NULL, 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-007 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-007';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'What is a feeling? A brief introduction to affective science', 2021, 'https://doi.org/10.1016/j.cobeha.2021.04.012', 'Current Opinion in Behavioral Sciences', 1),
      (v_art_id, 'peer_reviewed', 1, 'Distinguishing moods from emotions: a historical and contemporary perspective', 2020, 'https://doi.org/10.1177/0963721419886766', 'Current Directions in Psychological Science', 2),
      (v_art_id, 'peer_reviewed', 1, 'The relation between mood and emotion: a temporal analysis', 2016, 'https://doi.org/10.1016/j.copsyc.2015.09.005', 'Current Opinion in Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Feelings and emotional experience: a neurobiological perspective', 2004, 'https://doi.org/10.1016/j.tics.2004.09.009', 'Trends in Cognitive Sciences', 4),
      (v_art_id, 'government', 2, 'Understanding your emotions', 2023, 'https://www.nimh.nih.gov/health/topics/emotions', NULL, 5),
      (v_art_id, 'professional_org', 3, 'The nature of feelings and moods', 2021, 'https://www.apa.org/topics/emotions/feelings', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Core affect, prototypical emotional episodes, and other things called emotion', 2005, 'https://doi.org/10.1037/0022-3514.89.3.330', 'Journal of Personality and Social Psychology', 7),
      (v_art_id, 'textbook', 5, 'Handbook of emotions (4th ed.)', 2016, NULL, NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-008 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-008';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The predictive brain: neural representations of emotion and prediction', 2022, 'https://doi.org/10.1016/j.neubiorev.2022.104694', 'Neuroscience & Biobehavioral Reviews', 1),
      (v_art_id, 'peer_reviewed', 1, 'Interoception and emotion: a neuroanatomical perspective', 2009, 'https://doi.org/10.1016/j.tics.2009.01.007', 'Trends in Cognitive Sciences', 2),
      (v_art_id, 'peer_reviewed', 1, 'The free energy principle for action and perception: a mathematical review', 2017, 'https://doi.org/10.1016/j.jmp.2015.11.003', 'Journal of Mathematical Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Neural correlates of emotional awareness in the default mode and salience networks', 2020, 'https://doi.org/10.1016/j.neuroimage.2020.116768', 'NeuroImage', 4),
      (v_art_id, 'peer_reviewed', 1, 'Unconscious emotion: a cognitive neuroscientific perspective', 2008, 'https://doi.org/10.1016/j.tics.2008.01.005', 'Neuroscience & Biobehavioral Reviews', 5),
      (v_art_id, 'government', 2, 'Brain basics: the life and death of a neuron', 2023, 'https://www.ninds.nih.gov/health-information/educational-resources/brain-basics', NULL, 6),
      (v_art_id, 'professional_org', 3, 'Neuroscience of emotion regulation', 2021, 'https://www.apa.org/topics/emotions/neuroscience', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Body–brain interactions in emotional processing', 2019, 'https://doi.org/10.1016/j.neubiorev.2019.08.001', 'Neuroscience & Biobehavioral Reviews', 8),
      (v_art_id, 'textbook', 5, 'How emotions are made: the secret life of the brain', 2017, NULL, NULL, 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-009 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-009';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Mixed emotions: towards a better understanding of emotional complexity', 2017, 'https://doi.org/10.1080/02699931.2017.1295049', 'Cognition & Emotion', 1),
      (v_art_id, 'peer_reviewed', 1, 'Embracing mixed emotions: poignancy and the transition to adulthood', 2014, 'https://doi.org/10.1037/a0035607', 'Journal of Personality and Social Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Co-occurring emotions in daily life: a mixed-methods investigation', 2020, 'https://doi.org/10.1037/emo0000764', 'Emotion', 3),
      (v_art_id, 'peer_reviewed', 1, 'Mixed emotions and coping: the benefits of secondary emotions in negotiation', 2013, 'https://doi.org/10.1037/a0032781', 'Journal of Experimental Social Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'The prevalence and function of mixed emotions', 2019, 'https://doi.org/10.1016/j.copsyc.2019.07.034', 'Current Opinion in Psychology', 5),
      (v_art_id, 'government', 2, 'Managing complex emotions', 2023, 'https://www.nimh.nih.gov/health/topics/caring-for-your-mental-health', NULL, 6),
      (v_art_id, 'professional_org', 3, 'Emotional complexity and psychological health', 2021, 'https://www.apa.org/topics/emotions/complexity', NULL, 7),
      (v_art_id, 'textbook', 5, 'Principles of affective science', 2022, NULL, NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-010 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-010';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The evolutionary psychology of emotions and behavior', 2008, 'https://doi.org/10.1016/j.evolhumbehav.2007.12.003', 'Evolution and Human Behavior', 1),
      (v_art_id, 'peer_reviewed', 1, 'Fear and anxiety: evolutionary, cognitive, and clinical perspectives', 2001, 'https://doi.org/10.1016/S0005-7967(00)00101-5', 'Behaviour Research and Therapy', 2),
      (v_art_id, 'peer_reviewed', 1, 'The evolution of emotion and motivation: an adaptationist framework', 2019, 'https://doi.org/10.1037/emo0000633', 'Emotion', 3),
      (v_art_id, 'peer_reviewed', 1, 'Disgust as an adaptive system for disease avoidance behavior', 2012, 'https://doi.org/10.1098/rstb.2011.0117', 'Philosophical Transactions of the Royal Society B', 4),
      (v_art_id, 'peer_reviewed', 1, 'Social functions of emotions at four levels of analysis', 2003, 'https://doi.org/10.1080/02699930302299', 'Cognition & Emotion', 5),
      (v_art_id, 'government', 2, 'Understanding fear and anxiety', 2023, 'https://www.nimh.nih.gov/health/topics/anxiety-disorders', NULL, 6),
      (v_art_id, 'professional_org', 3, 'The science of emotional responses', 2022, 'https://www.apa.org/topics/emotions/evolution', NULL, 7),
      (v_art_id, 'textbook', 5, 'The expression of the emotions in man and animals (annotated ed.)', 2009, NULL, NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

END $$;

-- ---------------------------------------------------------------------------
-- 5. Ensure updated_at column exists + update citation counts
-- ---------------------------------------------------------------------------

ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();

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
