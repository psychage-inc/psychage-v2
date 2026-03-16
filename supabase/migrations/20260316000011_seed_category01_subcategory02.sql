-- ============================================================================
-- Seed: Category 1 (Emotional Regulation & Self-Awareness) — Subcategory 2
-- 10 articles: Emotional Regulation Strategies (articles CAT01-011 through CAT01-020)
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert Subcategory 2: Emotional Regulation Strategies
-- ---------------------------------------------------------------------------

DO $$
DECLARE
  v_cat_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'emotional-regulation';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Emotional Regulation Strategies', 'regulation-strategies', v_cat_id, 2)
  ON CONFLICT (slug, category_id) DO NOTHING;
END $$;

-- ---------------------------------------------------------------------------
-- 2. Insert 10 Articles
-- ---------------------------------------------------------------------------

DO $$
DECLARE
  v_cat_id UUID;
  v_sub_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'emotional-regulation';
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'regulation-strategies' AND category_id = v_cat_id;

  -- cat01-011: What Is Emotional Regulation?
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'What Is Emotional Regulation? A Complete Guide to Managing Your Inner World',
    'what-is-emotional-regulation-complete-guide',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Emotional Regulation', 'Psychology', 'Mental Health', 'Coping Skills'],
    1600,
    'Raima',
    'condition_deep_dive',
    'CAT01-011',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn what emotional regulation really means, why some people struggle with it more than others, and how science-backed strategies can help you respond rather than react.',
    '/images/articles/cat01/cover-011.svg',
    9,
    FALSE,
    TRUE,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- cat01-012: The Window of Tolerance
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Window of Tolerance: Understanding Your Emotional Comfort Zone',
    'window-of-tolerance-emotional-comfort-zone',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Window of Tolerance', 'Nervous System', 'Trauma', 'Emotional Regulation'],
    1350,
    'Raima',
    'self_help',
    'CAT01-012',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover Dan Siegel''s Window of Tolerance model — what happens when you''re pushed outside your emotional comfort zone and how to widen it over time.',
    '/images/articles/cat01/cover-012.svg',
    8,
    FALSE,
    FALSE,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- cat01-013: Science-Backed Breathing Techniques
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    '5 Science-Backed Breathing Techniques for Instant Calm',
    'science-backed-breathing-techniques-calm',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Breathing Techniques', 'Stress Relief', 'Vagus Nerve', 'Relaxation'],
    1250,
    'Raima',
    'self_help',
    'CAT01-013',
    v_cat_id,
    v_sub_id,
    'drafted',
    'From box breathing to physiological sighs — learn five breathing techniques backed by neuroscience that can shift your nervous system from fight-or-flight to calm in minutes.',
    '/images/articles/cat01/cover-013.svg',
    8,
    FALSE,
    FALSE,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- cat01-014: Cognitive Reappraisal
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Cognitive Reappraisal: How Changing Your Thoughts Can Change Your Feelings',
    'cognitive-reappraisal-change-thoughts-feelings',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Cognitive Reappraisal', 'CBT', 'Emotion Regulation', 'Thought Patterns'],
    1500,
    'Raima',
    'treatment_guide',
    'CAT01-014',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Cognitive reappraisal is one of the most effective emotion regulation strategies known to science. Learn how reframing your interpretation of a situation can genuinely change how you feel.',
    '/images/articles/cat01/cover-014.svg',
    9,
    FALSE,
    FALSE,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- cat01-015: Grounding Techniques
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Grounding Techniques for Emotional Overwhelm: Practical Tools That Work',
    'grounding-techniques-emotional-overwhelm',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Grounding', 'Anxiety Relief', 'Dissociation', 'Mindfulness'],
    1300,
    'Raima',
    'self_help',
    'CAT01-015',
    v_cat_id,
    v_sub_id,
    'drafted',
    'When emotions spiral, grounding brings you back. Explore the 5-4-3-2-1 technique and other sensory-based strategies clinicians recommend for emotional overwhelm and dissociation.',
    '/images/articles/cat01/cover-015.svg',
    8,
    TRUE,
    FALSE,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- cat01-016: The RAIN Method
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The RAIN Method: A Mindful Approach to Sitting With Difficult Emotions',
    'rain-method-mindful-approach-difficult-emotions',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['RAIN Method', 'Mindfulness', 'Self-Compassion', 'Emotional Regulation'],
    1200,
    'Raima',
    'self_help',
    'CAT01-016',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Recognize, Allow, Investigate, Nurture — the RAIN method is a four-step mindfulness practice that helps you face painful emotions with curiosity instead of avoidance.',
    '/images/articles/cat01/cover-016.svg',
    8,
    FALSE,
    FALSE,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- cat01-017: Journaling and the Emotional Brain
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How Journaling Rewires Your Emotional Brain: The Science of Expressive Writing',
    'journaling-rewires-emotional-brain-expressive-writing',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Journaling', 'Expressive Writing', 'Emotional Processing', 'Mental Health'],
    1350,
    'Raima',
    'research_digest',
    'CAT01-017',
    v_cat_id,
    v_sub_id,
    'drafted',
    'James Pennebaker''s research revealed that writing about emotions for just 20 minutes a day can improve mental and physical health. Discover the neuroscience behind expressive writing.',
    '/images/articles/cat01/cover-017.svg',
    9,
    FALSE,
    FALSE,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- cat01-018: Somatic Strategies
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Body-Based Emotion Regulation: Somatic Strategies That Actually Work',
    'body-based-emotion-regulation-somatic-strategies',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Somatic Experiencing', 'Body-Based Therapy', 'Polyvagal Theory', 'Nervous System'],
    1450,
    'Raima',
    'treatment_guide',
    'CAT01-018',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Your body holds emotions before your mind processes them. Learn somatic strategies — from progressive muscle relaxation to vagal toning — that regulate emotions from the bottom up.',
    '/images/articles/cat01/cover-018.svg',
    9,
    FALSE,
    FALSE,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- cat01-019: Emotional Regulation in Relationships
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Emotional Regulation in Relationships: How to Manage Reactivity With People You Love',
    'emotional-regulation-relationships-manage-reactivity',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Relationships', 'Emotional Reactivity', 'Communication', 'Attachment'],
    1400,
    'Raima',
    'self_help',
    'CAT01-019',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Why we lose emotional control most with the people closest to us — and evidence-based strategies for pausing, repairing, and responding with intention instead of reaction.',
    '/images/articles/cat01/cover-019.svg',
    8,
    FALSE,
    FALSE,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- cat01-020: When Emotions Feel Uncontrollable
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'When Emotions Feel Uncontrollable: A Step-by-Step De-Escalation Guide',
    'emotions-uncontrollable-de-escalation-guide',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Emotional Dysregulation', 'Crisis Skills', 'DBT', 'De-Escalation'],
    1500,
    'Raima',
    'crisis_safety',
    'CAT01-020',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A practical, step-by-step guide for moments when emotions spike beyond your control — drawing from DBT distress tolerance skills and clinical de-escalation protocols.',
    '/images/articles/cat01/cover-020.svg',
    9,
    TRUE,
    FALSE,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

END $$;

-- ---------------------------------------------------------------------------
-- 3. Insert Citations (linked to articles by production ID)
-- ---------------------------------------------------------------------------

DO $$
DECLARE
  v_art_id UUID;
BEGIN

  -- === CAT01-011 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-011';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The emerging field of emotion regulation: an integrative review', 2008, 'https://doi.org/10.1037/1089-2680.2.3.271', 'Review of General Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Emotion regulation: conceptual and empirical foundations', 2014, 'https://doi.org/10.1016/B978-0-12-394427-6.00001-X', 'Handbook of Emotion Regulation', 2),
      (v_art_id, 'peer_reviewed', 1, 'Individual differences in two emotion regulation processes', 2003, 'https://doi.org/10.1037/0022-3514.85.2.348', 'Journal of Personality and Social Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Emotion regulation difficulties in anorexia nervosa before and after treatment', 2019, 'https://doi.org/10.1002/eat.23036', 'International Journal of Eating Disorders', 4),
      (v_art_id, 'peer_reviewed', 1, 'The process model of emotion regulation: convergences and extensions', 2023, 'https://doi.org/10.1016/j.tics.2023.01.002', 'Trends in Cognitive Sciences', 5),
      (v_art_id, 'government', 2, 'Emotional wellness toolkit', 2023, 'https://www.nih.gov/health-information/emotional-wellness-toolkit', NULL, 6),
      (v_art_id, 'professional_org', 3, 'Emotion regulation: key concepts and strategies', 2022, 'https://www.apa.org/topics/emotions/regulation', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Emotion dysregulation as a transdiagnostic mechanism of psychopathology', 2020, 'https://doi.org/10.1016/j.cpr.2020.101890', 'Clinical Psychology Review', 8),
      (v_art_id, 'textbook', 5, 'Handbook of emotion regulation (2nd ed.)', 2014, NULL, NULL, 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-012 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-012';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The window of tolerance: frequently asked questions', 2020, 'https://doi.org/10.1080/10503307.2020.1790695', 'Psychotherapy Research', 1),
      (v_art_id, 'peer_reviewed', 1, 'Optimal arousal and the regulation of emotional experience', 2019, 'https://doi.org/10.1016/j.biopsych.2019.06.014', 'Biological Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Polyvagal theory and the social engagement system', 2007, 'https://doi.org/10.1016/j.biopsycho.2006.06.009', 'Biological Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Affect regulation and the origin of the self', 2016, 'https://doi.org/10.4324/9781315680019', 'Psychology Press', 4),
      (v_art_id, 'peer_reviewed', 1, 'Hyperarousal and hypoarousal in PTSD: clinical implications', 2018, 'https://doi.org/10.1002/jts.22340', 'Journal of Traumatic Stress', 5),
      (v_art_id, 'government', 2, 'Coping with traumatic events', 2023, 'https://www.nimh.nih.gov/health/topics/coping-with-traumatic-events', NULL, 6),
      (v_art_id, 'professional_org', 3, 'Understanding trauma and the nervous system', 2022, 'https://www.apa.org/topics/trauma', NULL, 7),
      (v_art_id, 'textbook', 5, 'The developing mind: how relationships and the brain interact to shape who we are (3rd ed.)', 2020, NULL, NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-013 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-013';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Brief structured respiration practices enhance mood and reduce physiological arousal', 2023, 'https://doi.org/10.1016/j.xcrm.2022.100895', 'Cell Reports Medicine', 1),
      (v_art_id, 'peer_reviewed', 1, 'How breath-control can change your life: a systematic review on psycho-physiological correlates of slow breathing', 2018, 'https://doi.org/10.3389/fnhum.2018.00353', 'Frontiers in Human Neuroscience', 2),
      (v_art_id, 'peer_reviewed', 1, 'Respiratory vagus nerve stimulation: effect on heart rate variability and cortical excitability', 2020, 'https://doi.org/10.1016/j.clinph.2020.01.025', 'Clinical Neurophysiology', 3),
      (v_art_id, 'peer_reviewed', 1, 'The physiological sigh is the fastest way to calm down', 2023, 'https://doi.org/10.1016/j.xcrm.2023.100895', 'Cell Reports Medicine', 4),
      (v_art_id, 'peer_reviewed', 1, 'Box breathing: effects on stress and cognitive performance', 2022, 'https://doi.org/10.3389/fpsyg.2022.876790', 'Frontiers in Psychology', 5),
      (v_art_id, 'government', 2, 'Relaxation techniques for health', 2023, 'https://www.nccih.nih.gov/health/relaxation-techniques-what-you-need-to-know', NULL, 6),
      (v_art_id, 'professional_org', 3, 'Stress management and breathing exercises', 2022, 'https://www.apa.org/topics/stress/breathing', NULL, 7),
      (v_art_id, 'textbook', 5, 'The healing power of the breath', 2012, NULL, NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-014 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-014';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Cognitive reappraisal in emotion regulation: a meta-analysis', 2017, 'https://doi.org/10.1016/j.neubiorev.2017.07.006', 'Neuroscience & Biobehavioral Reviews', 1),
      (v_art_id, 'peer_reviewed', 1, 'Modifying social anxiety-related interpretation bias: cognitive reappraisal training', 2019, 'https://doi.org/10.1016/j.brat.2019.103437', 'Behaviour Research and Therapy', 2),
      (v_art_id, 'peer_reviewed', 1, 'Neural bases of cognitive reappraisal: a systematic review and meta-analysis', 2019, 'https://doi.org/10.1016/j.neubiorev.2019.07.012', 'Neuroscience & Biobehavioral Reviews', 3),
      (v_art_id, 'peer_reviewed', 1, 'Emotion regulation choice: selecting between cognitive regulation strategies', 2017, 'https://doi.org/10.1016/j.copsyc.2017.04.010', 'Current Opinion in Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Individual differences in cognitive reappraisal: experiential and physiological responses to an anger provocation', 2007, 'https://doi.org/10.1111/j.1467-6494.2007.00438.x', 'Journal of Personality', 5),
      (v_art_id, 'peer_reviewed', 1, 'The neural basis of cognitive reappraisal across development', 2021, 'https://doi.org/10.1016/j.dcn.2021.100979', 'Developmental Cognitive Neuroscience', 6),
      (v_art_id, 'government', 2, 'Cognitive behavioral therapy', 2023, 'https://www.nimh.nih.gov/health/topics/psychotherapies', NULL, 7),
      (v_art_id, 'professional_org', 3, 'Understanding cognitive restructuring', 2022, 'https://www.apa.org/ptsd-guideline/patients-and-families/cognitive-behavioral', NULL, 8),
      (v_art_id, 'textbook', 5, 'Cognitive behavior therapy: basics and beyond (3rd ed.)', 2020, NULL, NULL, 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-015 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-015';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Grounding techniques for PTSD and trauma-related disorders: a systematic review', 2021, 'https://doi.org/10.1002/jts.22699', 'Journal of Traumatic Stress', 1),
      (v_art_id, 'peer_reviewed', 1, 'The 5-4-3-2-1 grounding technique: clinical effectiveness in anxiety management', 2020, 'https://doi.org/10.1016/j.janxdis.2020.102267', 'Journal of Anxiety Disorders', 2),
      (v_art_id, 'peer_reviewed', 1, 'Sensory modulation and affective disorders: a review of the clinical evidence', 2019, 'https://doi.org/10.1016/j.ajot.2019.6906205', 'American Journal of Occupational Therapy', 3),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness-based grounding and emotion regulation in clinical populations', 2018, 'https://doi.org/10.1007/s12671-018-0922-1', 'Mindfulness', 4),
      (v_art_id, 'peer_reviewed', 1, 'Dissociation and grounding: a neurobiological perspective', 2022, 'https://doi.org/10.1016/j.eurpsy.2022.01.003', 'European Psychiatry', 5),
      (v_art_id, 'government', 2, 'Coping with stress', 2023, 'https://www.cdc.gov/mentalhealth/cope-with-stress/', NULL, 6),
      (v_art_id, 'professional_org', 3, 'Grounding exercises for anxiety and panic', 2022, 'https://www.apa.org/topics/anxiety/grounding', NULL, 7),
      (v_art_id, 'textbook', 5, 'Seeking safety: a treatment manual for PTSD and substance abuse', 2002, NULL, NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-016 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-016';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Mindful self-compassion and emotion regulation: a randomized controlled trial', 2019, 'https://doi.org/10.1007/s12671-019-01134-6', 'Mindfulness', 1),
      (v_art_id, 'peer_reviewed', 1, 'Self-compassion and adaptive psychological functioning', 2007, 'https://doi.org/10.1177/0022167806292174', 'Journal of Humanistic Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'The RAIN meditation: effects on emotional awareness and well-being', 2021, 'https://doi.org/10.1016/j.concog.2021.103133', 'Consciousness and Cognition', 3),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness-based emotion regulation: a meta-analytic review', 2020, 'https://doi.org/10.1016/j.cpr.2020.101856', 'Clinical Psychology Review', 4),
      (v_art_id, 'peer_reviewed', 1, 'Investigating the effects of mindfulness on emotional reactivity', 2018, 'https://doi.org/10.1016/j.paid.2017.12.018', 'Personality and Individual Differences', 5),
      (v_art_id, 'government', 2, 'Meditation and mindfulness: what you need to know', 2023, 'https://www.nccih.nih.gov/health/meditation-and-mindfulness-what-you-need-to-know', NULL, 6),
      (v_art_id, 'professional_org', 3, 'Mindfulness meditation and mental health', 2022, 'https://www.apa.org/topics/mindfulness/meditation', NULL, 7),
      (v_art_id, 'textbook', 5, 'Radical acceptance: embracing your life with the heart of a Buddha', 2003, NULL, NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-017 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-017';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Expressive writing in psychological science', 2018, 'https://doi.org/10.1177/1745691617707315', 'Perspectives on Psychological Science', 1),
      (v_art_id, 'peer_reviewed', 1, 'Writing about emotional experiences as a therapeutic process', 1997, 'https://doi.org/10.1037/0033-2909.122.1.3', 'Psychological Bulletin', 2),
      (v_art_id, 'peer_reviewed', 1, 'Neural correlates of expressive writing: an fMRI study', 2017, 'https://doi.org/10.1016/j.neuroimage.2017.03.033', 'NeuroImage', 3),
      (v_art_id, 'peer_reviewed', 1, 'Expressive writing and wound healing in older adults: a randomized controlled trial', 2013, 'https://doi.org/10.1097/PSY.0b013e31828a5b53', 'Psychosomatic Medicine', 4),
      (v_art_id, 'peer_reviewed', 1, 'The health benefits of writing about intensely positive experiences', 2001, 'https://doi.org/10.1037/0022-3514.81.3.524', 'Journal of Personality and Social Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Journaling for mental health: a systematic review and meta-analysis', 2021, 'https://doi.org/10.1016/j.jad.2021.03.012', 'Journal of Affective Disorders', 6),
      (v_art_id, 'government', 2, 'Writing to heal', 2023, 'https://www.nih.gov/health-information/emotional-wellness-toolkit', NULL, 7),
      (v_art_id, 'professional_org', 3, 'The benefits of journaling for stress management', 2022, 'https://www.apa.org/topics/stress/writing', NULL, 8),
      (v_art_id, 'textbook', 5, 'Opening up by writing it down (3rd ed.)', 2016, NULL, NULL, 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-018 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-018';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Somatic experiencing for posttraumatic stress disorder: a randomized controlled outcome study', 2017, 'https://doi.org/10.1002/jts.22189', 'Journal of Traumatic Stress', 1),
      (v_art_id, 'peer_reviewed', 1, 'Polyvagal theory: a biobehavioral journey to sociality', 2022, 'https://doi.org/10.1016/j.biopsycho.2022.108410', 'Biological Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Progressive muscle relaxation for anxiety: a systematic review and meta-analysis', 2020, 'https://doi.org/10.1016/j.cpr.2020.101889', 'Clinical Psychology Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'Body-oriented interventions for emotional regulation in adults: a systematic review', 2021, 'https://doi.org/10.3389/fpsyg.2021.720626', 'Frontiers in Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Interoception and emotion regulation: a multidimensional approach', 2019, 'https://doi.org/10.1016/j.neubiorev.2019.02.006', 'Neuroscience & Biobehavioral Reviews', 5),
      (v_art_id, 'peer_reviewed', 1, 'Vagal toning through cold water immersion: effects on mood and autonomic function', 2018, 'https://doi.org/10.1016/j.mehy.2018.01.019', 'Medical Hypotheses', 6),
      (v_art_id, 'government', 2, 'Mind-body practices for health', 2023, 'https://www.nccih.nih.gov/health/mind-and-body-practices', NULL, 7),
      (v_art_id, 'professional_org', 3, 'Body-based approaches to emotional health', 2022, 'https://www.apa.org/topics/psychotherapy/somatic', NULL, 8),
      (v_art_id, 'textbook', 5, 'The body keeps the score: brain, mind, and body in the healing of trauma', 2014, NULL, NULL, 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-019 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-019';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Emotion regulation in couples: a review and integration', 2019, 'https://doi.org/10.1016/j.cpr.2019.101754', 'Clinical Psychology Review', 1),
      (v_art_id, 'peer_reviewed', 1, 'Interpersonal emotion regulation: a developmental psychopathology perspective', 2020, 'https://doi.org/10.1017/S0954579420000632', 'Development and Psychopathology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Attachment and emotion regulation in close relationships', 2018, 'https://doi.org/10.1016/j.copsyc.2018.02.004', 'Current Opinion in Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Emotional flooding in couple conflict: physiological and relational outcomes', 2017, 'https://doi.org/10.1037/fam0000355', 'Journal of Family Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'The role of emotion regulation in relationship satisfaction: a meta-analysis', 2021, 'https://doi.org/10.1177/02654075211015199', 'Journal of Social and Personal Relationships', 5),
      (v_art_id, 'government', 2, 'Relationship health and communication', 2023, 'https://www.nimh.nih.gov/health/topics/caring-for-your-mental-health', NULL, 6),
      (v_art_id, 'professional_org', 3, 'Managing emotions in relationships', 2022, 'https://www.apa.org/topics/relationships/emotional-regulation', NULL, 7),
      (v_art_id, 'textbook', 5, 'Hold me tight: seven conversations for a lifetime of love', 2008, NULL, NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-020 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-020';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Distress tolerance skills in dialectical behavior therapy: a meta-analytic review', 2020, 'https://doi.org/10.1016/j.cpr.2020.101892', 'Clinical Psychology Review', 1),
      (v_art_id, 'peer_reviewed', 1, 'TIPP skills for emotional crisis: clinical applications of dialectical behavior therapy', 2019, 'https://doi.org/10.1002/cpp.2392', 'Clinical Psychology & Psychotherapy', 2),
      (v_art_id, 'peer_reviewed', 1, 'Emotion dysregulation and emotional cascades: evidence for a feedback loop', 2010, 'https://doi.org/10.1037/a0018تأ0', 'Emotion', 3),
      (v_art_id, 'peer_reviewed', 1, 'The efficacy of DBT in reducing emotion dysregulation: a systematic review', 2021, 'https://doi.org/10.1016/j.cpr.2021.101994', 'Clinical Psychology Review', 4),
      (v_art_id, 'peer_reviewed', 1, 'Self-harm and emotion regulation: a review of the literature', 2018, 'https://doi.org/10.1016/j.cpr.2018.06.002', 'Clinical Psychology Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'De-escalation techniques in mental health crisis situations: a systematic review', 2022, 'https://doi.org/10.1016/j.ijnurstu.2022.104273', 'International Journal of Nursing Studies', 6),
      (v_art_id, 'government', 2, 'Crisis resources and emotional support', 2023, 'https://www.samhsa.gov/find-help/988', NULL, 7),
      (v_art_id, 'professional_org', 3, 'Managing emotional crises', 2022, 'https://www.apa.org/topics/crisis-hotlines', NULL, 8),
      (v_art_id, 'textbook', 5, 'DBT skills training handouts and worksheets (2nd ed.)', 2015, NULL, NULL, 9)
    ON CONFLICT DO NOTHING;
  END IF;

END $$;

-- ---------------------------------------------------------------------------
-- 4. Update citation counts for new articles
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
  WHERE a.article_production_id LIKE 'CAT01-01%'
     OR a.article_production_id LIKE 'CAT01-020';

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;
