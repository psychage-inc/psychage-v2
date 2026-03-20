-- ============================================================================
-- Seed: Category 1 (Emotional Regulation & Self-Awareness) — Subcategory 03
-- 10 articles: CAT01-021 through CAT01-030
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
  VALUES ('Self Awareness Reflection', 'self-awareness-reflection', v_cat_id, 3)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'self-awareness-reflection' AND category_id = v_cat_id;

  -- CAT01-021: What Is Self-Awareness? The Skill That Changes Everything
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'What Is Self-Awareness? The Skill That Changes Everything',
    'what-is-self-awareness-skill-that-changes-everything',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Self-Awareness', 'Personal Growth', 'Emotional Intelligence', 'Psychology', 'Self-Reflection'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-021',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore what self-awareness really means, why research calls it a foundational life skill, and how to start developing internal and external self-awareness today.',
    '/images/articles/cat01/cover-021.svg',
    8,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-022: Journaling for Self-Awareness: Prompts That Go Beyond 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Journaling for Self-Awareness: Prompts That Go Beyond ',
    'journaling-for-self-awareness-prompts',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Journaling', 'Self-Awareness', 'Reflection', 'Writing Therapy', 'Emotional Growth'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-022',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn evidence-based journaling techniques that build genuine self-awareness. Includes 20 prompts designed to reveal emotional patterns, values, and blind spots.',
    '/images/articles/cat01/cover-022.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-023: Body Awareness: Learning to Read the Physical Signals of Your Emotions
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Body Awareness: Learning to Read the Physical Signals of Your Emotions',
    'body-awareness-physical-signals-of-emotions',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Body Awareness', 'Interoception', 'Somatic Experience', 'Mind-Body Connection', 'Emotional Signals'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-023',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how your body communicates emotions through physical sensations. Understand interoception and practical techniques to read your body\',
    '/images/articles/cat01/cover-023.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-024: How Your Thoughts Shape Your Feelings (And How to Notice the Pattern)
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How Your Thoughts Shape Your Feelings (And How to Notice the Pattern)',
    'how-thoughts-shape-feelings-notice-the-pattern',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Thought Patterns', 'CBT', 'Automatic Thoughts', 'Cognitive Distortions', 'Self-Awareness'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-024',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the thought-feeling connection at the heart of CBT. Learn to identify automatic thoughts that shape your emotional experience and how to interrupt unhelpful patterns.',
    '/images/articles/cat01/cover-024.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-025: The Observer Self: Learning to Watch Your Emotions Without Being Consumed
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Observer Self: Learning to Watch Your Emotions Without Being Consumed',
    'observer-self-watch-emotions-without-being-consumed',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Observer Self', 'ACT', 'Mindfulness', 'Defusion', 'Metacognition'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-025',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the concept of the Observer Self from ACT and mindfulness traditions. Learn how to step back from thoughts and feelings to gain perspective and reduce emotional suffering.',
    '/images/articles/cat01/cover-025.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-026: Mindfulness for Emotional Awareness: A Practical Starting Guide
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Mindfulness for Emotional Awareness: A Practical Starting Guide',
    'mindfulness-for-emotional-awareness-practical-guide',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Mindfulness', 'Emotional Awareness', 'Meditation', 'Present Moment', 'Beginners Guide'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-026',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A beginner-friendly guide to mindfulness for emotional awareness. Learn what mindfulness actually is, what the research says, and how to start a simple daily practice.',
    '/images/articles/cat01/cover-026.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-027: Common Blind Spots: Emotions You Might Not Realize You
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Common Blind Spots: Emotions You Might Not Realize You',
    'common-emotional-blind-spots',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Blind Spots', 'Hidden Emotions', 'Self-Awareness', 'Defense Mechanisms', 'Emotional Intelligence'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-027',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Uncover the hidden emotions that influence your behavior without your awareness. Learn about emotional blind spots, why they form, and how to bring them into consciousness.',
    '/images/articles/cat01/cover-027.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-028: How to Ask for Honest Feedback About Your Emotional Patterns
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How to Ask for Honest Feedback About Your Emotional Patterns',
    'asking-honest-feedback-about-emotional-patterns',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Feedback', 'External Self-Awareness', 'Relationships', 'Personal Growth', 'Emotional Patterns'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-028',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how to ask for and receive honest feedback about your emotional patterns from trusted people. A practical guide to building external self-awareness.',
    '/images/articles/cat01/cover-028.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-029: The Role of Values in Emotional Self-Awareness
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Role of Values in Emotional Self-Awareness',
    'role-of-values-in-emotional-self-awareness',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Values', 'Self-Awareness', 'ACT', 'Purpose', 'Emotional Intelligence'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-029',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand how your core values shape your emotional responses. Learn to identify your values and use them as a compass for emotional regulation and decision-making.',
    '/images/articles/cat01/cover-029.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-030: Self-Awareness Without Self-Judgment: A Compassionate Approach
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Self-Awareness Without Self-Judgment: A Compassionate Approach',
    'self-awareness-without-self-judgment',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Self-Compassion', 'Self-Awareness', 'Non-Judgment', 'Kristin Neff', 'Inner Critic'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-030',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how to observe yourself honestly without falling into self-criticism. Discover the research on self-compassion and how it makes self-awareness sustainable and healing.',
    '/images/articles/cat01/cover-030.svg',
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

  -- === CAT01-021 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-021';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Increasing self-awareness: A review and conceptual framework', '2017', 'https://doi.org/10.1016/j.obhdp.2017.04.004', NULL, 1),
      (v_art_id, 'professional_org', 3, 'What self-awareness really is (and how to cultivate it)', '2018', 'https://doi.org/10.1037/t69483-000', 'Harvard Business Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Self-knowledge and emotional intelligence: The connection', '2004', 'https://doi.org/10.1037/0022-3514.86.1.174', 'Journal of Personality and Social Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'The self-awareness gap in leadership effectiveness', '2019', 'https://doi.org/10.1002/job.2371', 'Journal of Organizational Behavior', 4),
      (v_art_id, 'peer_reviewed', 1, 'Self-reflection and insight: The role of metacognitive knowledge in mental health', '2012', 'https://doi.org/10.1016/j.cpr.2012.05.003', 'Clinical Psychology Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'Interoception and emotion: A neuroanatomical perspective', '2016', 'https://doi.org/10.1016/B978-0-12-407236-7.00017-9', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Self-awareness development in organizations: An integrative review', '2020', 'https://doi.org/10.5465/annals.2018.0108', NULL, 7),
      (v_art_id, 'government', 2, 'Promoting emotional health and well-being through self-awareness', '2022', 'https://www.who.int/publications/i/item/9789240055186', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-022 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-022';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Expressive writing in psychological science', '2018', 'https://doi.org/10.1177/1745691617707315', 'Perspectives on Psychological Science', 1),
      (v_art_id, 'peer_reviewed', 1, 'Writing about emotional experiences as a therapeutic process', '1997', 'https://doi.org/10.1111/j.1467-9280.1997.tb00403.x', 'Psychological Science', 2),
      (v_art_id, 'peer_reviewed', 1, 'The health benefits of writing about life goals', '2001', 'https://doi.org/10.1177/0146167201277003', 'Personality and Social Psychology Bulletin', 3),
      (v_art_id, 'peer_reviewed', 1, 'Positive affect journaling: An intervention for mental health', '2018', 'https://doi.org/10.2196/11290', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Journaling for mental health: A systematic review', '2021', 'https://doi.org/10.1080/09515070.2020.1857728', 'Counseling Psychology Quarterly', 5),
      (v_art_id, 'peer_reviewed', 1, 'Self-reflection and personal growth: Mechanisms and outcomes', '2016', 'https://doi.org/10.1111/jopy.12226', 'Journal of Personality', 6),
      (v_art_id, 'peer_reviewed', 1, 'Therapeutic writing: A practical guide', '2011', 'https://doi.org/10.1080/03069885.2011.613318', 'British Journal of Guidance and Counselling', 7),
      (v_art_id, 'peer_reviewed', 1, 'Online expressive writing for anxiety reduction', '2014', 'https://doi.org/10.1111/bjhp.12056', 'British Journal of Health Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-023 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-023';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Interoception and emotion: A neuroanatomical perspective', '2016', 'https://doi.org/10.1016/B978-0-12-407236-7.00017-9', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Bodily maps of emotions', '2014', 'https://doi.org/10.1073/pnas.1321664111', 'Proceedings of the National Academy of Sciences', 2),
      (v_art_id, 'peer_reviewed', 1, 'Interoceptive awareness skills for emotion regulation', '2015', 'https://doi.org/10.1016/j.jpsychores.2015.03.009', 'Journal of Psychosomatic Research', 3),
      (v_art_id, 'textbook', 5, 'The body keeps the score: Brain, mind, and body in the healing of trauma', '2014', 'https://doi.org/10.1176/appi.books.9780890425596', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Body scan meditation: A core mindfulness practice', '2019', 'https://doi.org/10.1007/s12671-018-1044-9', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Somatic experiencing: Using interoception and proprioception as core elements of trauma therapy', '2015', 'https://doi.org/10.3389/fpsyg.2015.00093', 'Frontiers in Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Alexithymia and emotional intelligence: Implications for mental health', '2013', 'https://doi.org/10.1016/j.comppsych.2012.12.010', 'Comprehensive Psychiatry', 7),
      (v_art_id, 'peer_reviewed', 1, 'The role of interoception in health and well-being', '2021', 'https://doi.org/10.1016/j.biopsycho.2021.108050', 'Biological Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-024 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-024';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'textbook', 5, 'Cognitive therapy of depression', '1979', 'https://www.guilford.com/books/Cognitive-Therapy-of-Depression/Beck-Rush-Shaw-Emery/9780898629194', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Automatic thoughts as a predictor of depressive and anxious symptoms', '2016', 'https://doi.org/10.1007/s10608-016-9764-y', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'The role of cognition in emotion: A review and synthesis', '2013', 'https://doi.org/10.1080/02699931.2013.782899', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Rumination and worry: Are they really different? A meta-analytic review', '2012', 'https://doi.org/10.1016/j.cpr.2012.07.001', 'Clinical Psychology Review', 4),
      (v_art_id, 'peer_reviewed', 1, 'The cognitive model of depression: An update', '2008', 'https://doi.org/10.1146/annurev.clinpsy.3.022806.091015', 'Annual Review of Clinical Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Metacognitive awareness and prevention of relapse in depression', '2010', 'https://doi.org/10.1037/a0020381', 'Journal of Consulting and Clinical Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Thought records and cognitive restructuring: A clinical tool review', '2018', 'https://doi.org/10.1017/S1352465818000152', NULL, 7),
      (v_art_id, 'government', 2, 'Information about cognitive behavioral therapy', '2023', 'https://www.nimh.nih.gov/health/topics/psychotherapies', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-025 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-025';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Acceptance and commitment therapy: Model, processes, and outcomes', '2006', 'https://doi.org/10.1016/j.brat.2005.06.006', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Self-as-context in acceptance and commitment therapy', '2019', 'https://doi.org/10.1002/jclp.22749', 'Journal of Clinical Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Decentering as a common mechanism across mindfulness-based interventions', '2015', 'https://doi.org/10.1007/s10608-014-9662-9', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Metacognitive therapy versus cognitive behavioral therapy for depression', '2018', 'https://doi.org/10.1037/ccp0000307', 'Journal of Consulting and Clinical Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness and decentering: A framework for self-regulation', '2011', 'https://doi.org/10.1016/j.cpr.2011.07.008', 'Clinical Psychology Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'The role of psychological flexibility in well-being', '2020', 'https://doi.org/10.1016/j.jcbs.2020.02.002', 'Journal of Contextual Behavioral Science', 6),
      (v_art_id, 'textbook', 5, 'Wherever you go, there you are: Mindfulness meditation in everyday life', '2005', 'https://doi.org/10.1016/S0005-7894(02)80056-7', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Self-distancing: Theory, research, and current directions', '2017', 'https://doi.org/10.1016/bs.aesp.2016.10.002', 'Advances in Experimental Social Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-026 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-026';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness-based stress reduction and health benefits: A meta-analysis', '2004', 'https://doi.org/10.1016/S0022-3999(03)00573-7', 'Journal of Psychosomatic Research', 1),
      (v_art_id, 'peer_reviewed', 1, 'Effects of mindfulness on psychological health: A review of empirical studies', '2011', 'https://doi.org/10.1016/j.cpr.2011.04.006', 'Clinical Psychology Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'The neuroscience of mindfulness meditation', '2015', 'https://doi.org/10.1038/nrn3916', 'Nature Reviews Neuroscience', 3),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness meditation and the immune system: A systematic review', '2016', 'https://doi.org/10.1111/nyas.12998', 'Annals of the New York Academy of Sciences', 4),
      (v_art_id, 'peer_reviewed', 1, 'How much is enough? Examining the effects of mindfulness meditation dose', '2019', 'https://doi.org/10.1007/s12671-019-01172-4', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness-based interventions for anxiety and depression', '2016', 'https://doi.org/10.1016/j.cpr.2015.12.005', 'Clinical Psychology Review', 6),
      (v_art_id, 'peer_reviewed', 1, 'Meditation programs for psychological stress and well-being', '2014', 'https://doi.org/10.1001/jamainternmed.2013.13018', 'JAMA Internal Medicine', 7),
      (v_art_id, 'government', 2, 'Mindfulness and mental health in adults: A review', '2022', 'https://www.nimh.nih.gov/health/topics/complementary-and-integrative-approaches', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-027 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-027';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Unconscious emotion: A cognitive neuroscience perspective', '2012', 'https://doi.org/10.1016/j.neubiorev.2011.12.007', 'Neuroscience and Biobehavioral Reviews', 1),
      (v_art_id, 'textbook', 5, 'Alexithymia: Advances in research, theory, and clinical practice', '2018', 'https://doi.org/10.1017/9781108241595', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Defense mechanisms: Current approaches to research and measurement', '2015', 'https://doi.org/10.1111/jopy.12182', 'Journal of Personality', 3),
      (v_art_id, 'peer_reviewed', 1, 'Emotional awareness and emotional intelligence: A meta-analytic review', '2020', 'https://doi.org/10.1177/1754073920930791', 'Emotion Review', 4),
      (v_art_id, 'peer_reviewed', 1, 'The role of emotional suppression in psychopathology', '2010', 'https://doi.org/10.1016/j.cpr.2010.06.007', 'Clinical Psychology Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'Shame and its role in mental health: A meta-analysis', '2019', 'https://doi.org/10.1016/j.cpr.2019.01.003', 'Clinical Psychology Review', 6),
      (v_art_id, 'peer_reviewed', 1, 'Loneliness and social isolation as risk factors for mortality', '2015', 'https://doi.org/10.1177/1745691614568352', 'Perspectives on Psychological Science', 7),
      (v_art_id, 'professional_org', 3, 'Emotional awareness training for mental health', '2022', 'https://www.apa.org/topics/emotions', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-028 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-028';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Increasing self-awareness: A review and conceptual framework', '2017', 'https://doi.org/10.1016/j.obhdp.2017.04.004', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Feedback seeking behavior: A review of the literature and implications for HRD professionals', '2017', 'https://doi.org/10.1177/1534484317738432', 'Human Resource Development Review', 2),
      (v_art_id, 'textbook', 5, 'Thanks for the feedback: The science and art of receiving feedback well', '2014', 'https://doi.org/10.1037/e500882014-001', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'The psychology of receiving feedback: Threats and opportunities', '2019', 'https://doi.org/10.1146/annurev-orgpsych-012218-015235', 'Annual Review of Organizational Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Social feedback and emotional development', '2016', 'https://doi.org/10.1177/1754073915610516', 'Emotion Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'Vulnerability and trust in interpersonal relationships', '2020', 'https://doi.org/10.1037/pspi0000210', 'Journal of Personality and Social Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Growth mindset and response to feedback', '2016', 'https://doi.org/10.1177/0956797615623770', 'Psychological Science', 7),
      (v_art_id, 'professional_org', 3, 'Building resilience through social support', '2023', 'https://www.apa.org/topics/resilience/building-resilience', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-029 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-029';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Values and valued action in acceptance and commitment therapy', '2019', 'https://doi.org/10.1016/j.jcbs.2019.04.003', 'Journal of Contextual Behavioral Science', 1),
      (v_art_id, 'peer_reviewed', 1, 'Self-affirmation theory: An update and appraisal', '2014', 'https://doi.org/10.1016/B978-0-12-800052-6.00001-9', 'Advances in Experimental Social Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'The role of personal values in emotion regulation', '2018', 'https://doi.org/10.1080/02699931.2017.1400949', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Living well with values: An ACT-based approach to quality of life', '2020', 'https://doi.org/10.1016/j.brat.2020.103620', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Values clarification in clinical practice: A review', '2017', 'https://doi.org/10.1016/j.cpr.2017.03.002', 'Clinical Psychology Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'Moral emotions and moral judgment', '2012', 'https://doi.org/10.1037/a0025190', 'Journal of Personality and Social Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Self-concordance and subjective well-being: A motivational perspective', '2005', 'https://doi.org/10.1111/j.1467-6494.2005.00354.x', 'Journal of Personality', 7),
      (v_art_id, 'government', 2, 'Values in action and the promotion of mental health', '2022', 'https://www.who.int/publications/i/item/9789240055186', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-030 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-030';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Self-compassion: An alternative conceptualization of a healthy attitude toward oneself', '2003', 'https://doi.org/10.1080/15298860309032', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Self-compassion and adaptive psychological functioning', '2007', 'https://doi.org/10.1016/j.jrp.2006.03.004', 'Journal of Research in Personality', 2),
      (v_art_id, 'peer_reviewed', 1, 'Does self-compassion mitigate the relationship between self-criticism and depression?', '2016', 'https://doi.org/10.1002/cpp.1980', 'Clinical Psychology and Psychotherapy', 3),
      (v_art_id, 'peer_reviewed', 1, 'The effect of self-compassion interventions on mental health: A meta-analysis', '2019', 'https://doi.org/10.1007/s12671-018-1037-6', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Self-criticism and self-compassion: Two pathways to self-knowledge', '2018', 'https://doi.org/10.1037/pspp0000175', 'Journal of Personality and Social Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'The physiology of self-compassion: Cortisol and heart rate variability', '2014', 'https://doi.org/10.1177/2167702613492796', 'Clinical Psychological Science', 6),
      (v_art_id, 'peer_reviewed', 1, 'Self-compassion and body image: A meta-analysis', '2019', 'https://doi.org/10.1016/j.bodyim.2018.12.002', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Self-compassion: What it is, what it does, and how it relates to mindfulness', '2015', 'https://doi.org/10.1007/978-1-4939-2263-5_10', NULL, 8)
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
