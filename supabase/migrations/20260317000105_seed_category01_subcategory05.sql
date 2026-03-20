-- ============================================================================
-- Seed: Category 1 (Emotional Regulation & Self-Awareness) — Subcategory 05
-- 10 articles: CAT01-041 through CAT01-050
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
  VALUES ('Emotional Patterns Habits', 'emotional-patterns-habits', v_cat_id, 5)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'emotional-patterns-habits' AND category_id = v_cat_id;

  -- CAT01-041: Emotional Habits: How Repetitive Feeling Patterns Form and Stick
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Emotional Habits: How Repetitive Feeling Patterns Form and Stick',
    'emotional-habits-how-repetitive-feeling-patterns-form-and-stick',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Habits', 'Neural Pathways', 'Behavior Change', 'Emotional Patterns'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-041',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Why do you always feel the same way in certain situations? Discover how emotional habits form through neural pathways and how to rewire them.',
    '/images/articles/cat01/cover-041.svg',
    8,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-042: Why You Always React the Same Way: Understanding Emotional Triggers
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Why You Always React the Same Way: Understanding Emotional Triggers',
    'why-you-always-react-the-same-way-understanding-emotional-triggers',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Triggers', 'Trauma', 'Emotional Reactivity', 'Self-Awareness'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-042',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover what triggers are, how they form, and why certain situations provoke intense reactions—plus how to identify and defuse your personal triggers.',
    '/images/articles/cat01/cover-042.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-043: The Cycle of Emotional Avoidance: Why Running from Feelings Makes Them Louder
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Cycle of Emotional Avoidance: Why Running from Feelings Makes Them Louder',
    'the-cycle-of-emotional-avoidance-why-running-from-feelings-makes-them-louder',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Avoidance', 'Acceptance', 'Coping', 'Anxiety'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-043',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover why avoiding painful emotions paradoxically intensifies them—and how to break the avoidance cycle for lasting relief.',
    '/images/articles/cat01/cover-043.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-044: Emotional Eating, Shopping, and Scrolling: Understanding Coping Mechanisms
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Emotional Eating, Shopping, and Scrolling: Understanding Coping Mechanisms',
    'emotional-eating-shopping-scrolling-understanding-coping-mechanisms',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Coping Mechanisms', 'Emotional Eating', 'Behavioral Patterns', 'Self-Regulation'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-044',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Why we turn to food, spending, and screens to manage feelings—and how to develop healthier ways to cope with emotional discomfort.',
    '/images/articles/cat01/cover-044.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-045: How Childhood Experiences Shape Your Adult Emotional Patterns
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How Childhood Experiences Shape Your Adult Emotional Patterns',
    'how-childhood-experiences-shape-your-adult-emotional-patterns',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Childhood', 'Attachment', 'Development', 'Healing'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-045',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover how early relationships and experiences create lasting emotional blueprints—and how awareness can help you rewrite old patterns.',
    '/images/articles/cat01/cover-045.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-046: The Anger Iceberg: What
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Anger Iceberg: What',
    'the-anger-iceberg-whats-really-underneath-your-frustration',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Anger', 'Emotional Awareness', 'Vulnerability', 'Communication'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-046',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Anger is often a surface emotion masking deeper feelings. Learn to look beneath the iceberg to understand what',
    '/images/articles/cat01/cover-046.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-047: Shame vs. Guilt: Two Very Different Emotions with Very Different Effects
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Shame vs. Guilt: Two Very Different Emotions with Very Different Effects',
    'shame-vs-guilt-two-very-different-emotions-with-very-different-effects',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Shame', 'Guilt', 'Self-Compassion', 'Mental Health'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-047',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Shame and guilt are often confused, but their effects on mental health and behavior are radically different. Learn to tell them apart—and why it matters.',
    '/images/articles/cat01/cover-047.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-048: Rumination: Why Your Brain Replays Painful Moments (And How to Stop)
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Rumination: Why Your Brain Replays Painful Moments (And How to Stop)',
    'rumination-why-your-brain-replays-painful-moments-and-how-to-stop',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Rumination', 'Overthinking', 'Depression', 'Cognitive Patterns'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-048',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Rumination keeps you stuck in the past, amplifying distress. Learn why it happens and evidence-based strategies to break the cycle.',
    '/images/articles/cat01/cover-048.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-049: Emotional Perfectionism: The Hidden Pressure to Always Feel 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Emotional Perfectionism: The Hidden Pressure to Always Feel ',
    'emotional-perfectionism-the-hidden-pressure-to-always-feel-good',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Perfectionism', 'Acceptance', 'Self-Compassion', 'Toxic Positivity'],
    1000,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-049',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The unrealistic expectation that you should always be happy, calm, and positive creates suffering. Learn to accept the full range of human emotions.',
    '/images/articles/cat01/cover-049.svg',
    4,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-050: Breaking the Pattern: How to Build New Emotional Responses
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Breaking the Pattern: How to Build New Emotional Responses',
    'breaking-the-pattern-how-to-build-new-emotional-responses',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Behavior Change', 'Neuroplasticity', 'Habits', 'Personal Growth'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-050',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Step-by-step guide to identifying old emotional patterns and deliberately building new, healthier responses that serve you better.',
    '/images/articles/cat01/cover-050.svg',
    5,
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

  -- === CAT01-041 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-041';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The neuroscience of habit formation', '2020', 'https://doi.org/10.1038/s41593-020-0653-z', 'Nature Neuroscience', 1),
      (v_art_id, 'peer_reviewed', 1, 'Emotional habits and their role in psychopathology', '2019', 'https://doi.org/10.1016/j.cpr.2019.04.005', 'Clinical Psychology Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Neuroplasticity and emotional learning across the lifespan', '2021', 'https://doi.org/10.1016/j.dcn.2021.100953', 'Developmental Cognitive Neuroscience', 3),
      (v_art_id, 'peer_reviewed', 1, 'Breaking unwanted habits: A randomized controlled trial', '2020', 'https://doi.org/10.1016/j.brat.2020.103642', NULL, 4),
      (v_art_id, 'textbook', 5, 'The Power of Habit: Why We Do What We Do in Life and Business', '2012', 'https://www.worldcat.org/title/power-of-habit/oclc/754718696', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Emotion regulation strategies as transdiagnostic processes', '2020', 'https://doi.org/10.1146/annurev-clinpsy-050718-095617', 'Annual Review of Clinical Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Context-dependent emotional responses: Neural mechanisms', '2019', 'https://doi.org/10.1016/j.tins.2019.08.002', 'Trends in Neurosciences', 7),
      (v_art_id, 'peer_reviewed', 1, 'Habit reversal training: A meta-analysis of efficacy', '2021', 'https://doi.org/10.1037/ccp0000638', 'Journal of Consulting and Clinical Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-042 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-042';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The neurobiology of emotional triggers in PTSD', '2020', 'https://doi.org/10.1016/j.biopsych.2020.02.009', 'Biological Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Associative learning and emotional memory', '2019', 'https://doi.org/10.1038/s41583-019-0176-8', 'Nature Reviews Neuroscience', 2),
      (v_art_id, 'peer_reviewed', 1, 'Identifying and managing emotional triggers: A clinical guide', '2021', 'https://doi.org/10.1037/cps0000042', 'Clinical Psychology: Science and Practice', 3),
      (v_art_id, 'peer_reviewed', 1, 'The role of context in emotional triggering', '2020', 'https://doi.org/10.1037/emo0000691', NULL, 4),
      (v_art_id, 'textbook', 5, 'Trauma and the body: A sensorimotor approach to psychotherapy', '2006', 'https://www.worldcat.org/title/trauma-and-the-body/oclc/70173915', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Exposure therapy for emotional triggers: Meta-analysis', '2021', 'https://doi.org/10.1016/j.janxdis.2021.102374', 'Journal of Anxiety Disorders', 6),
      (v_art_id, 'peer_reviewed', 1, 'Emotional regulation and trigger management in BPD', '2019', 'https://doi.org/10.1037/per0000345', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'The window of tolerance: A model for understanding dysregulation', '2018', 'https://doi.org/10.1037/int0000118', 'Journal of Psychotherapy Integration', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-043 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-043';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Experiential avoidance and psychopathology', '2020', 'https://doi.org/10.1037/bul0000280', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'The paradoxical effects of thought suppression', '2019', 'https://doi.org/10.1037/pspa0000147', 'Journal of Personality and Social Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Acceptance and Commitment Therapy for emotional avoidance', '2021', 'https://doi.org/10.1016/j.beth.2020.12.002', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Avoidance coping and mental health outcomes', '2020', 'https://doi.org/10.1016/j.cpr.2020.101871', 'Clinical Psychology Review', 4),
      (v_art_id, 'peer_reviewed', 1, 'The neuroscience of emotion regulation through acceptance', '2019', 'https://doi.org/10.1016/j.neuroimage.2019.06.010', NULL, 5)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-044 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-044';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Emotional eating and its correlates', '2020', 'https://doi.org/10.1016/j.appet.2020.104829', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Compulsive buying behavior: A meta-analysis', '2019', 'https://doi.org/10.1556/2006.8.2019.31', 'Journal of Behavioral Addictions', 2),
      (v_art_id, 'peer_reviewed', 1, 'Problematic smartphone use and emotional regulation', '2021', 'https://doi.org/10.1016/j.chb.2021.106803', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Behavioral activation for depression', '2020', 'https://doi.org/10.1016/j.beth.2019.09.005', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Mindful eating interventions: A review', '2021', 'https://doi.org/10.1016/j.eatbeh.2021.101503', NULL, 5)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-045 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-045';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Early life stress and adult psychopathology', '2020', 'https://doi.org/10.1038/s41593-020-0622-6', 'Nature Neuroscience', 1),
      (v_art_id, 'peer_reviewed', 1, 'Attachment in childhood and emotional regulation in adulthood', '2019', 'https://doi.org/10.1037/dev0000749', 'Developmental Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Adverse childhood experiences and emotion dysregulation', '2021', 'https://doi.org/10.1002/jts.22649', 'Journal of Traumatic Stress', 3),
      (v_art_id, 'peer_reviewed', 1, 'Schema therapy for early maladaptive schemas', '2020', 'https://doi.org/10.1016/j.cpr.2020.101854', 'Clinical Psychology Review', 4),
      (v_art_id, 'peer_reviewed', 1, 'Neuroplasticity and recovery from childhood trauma', '2021', 'https://doi.org/10.1016/j.biopsych.2021.01.004', 'Biological Psychiatry', 5)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-046 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-046';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The function of anger in psychological health', '2020', 'https://doi.org/10.1016/j.avb.2020.101422', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Secondary emotions and emotional suppression', '2019', 'https://doi.org/10.1037/emo0000562', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Anger as a defense against vulnerability', '2021', 'https://doi.org/10.1037/cou0000519', 'Journal of Counseling Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Gender differences in anger expression', '2020', 'https://doi.org/10.1007/s11199-020-01145-9', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Anger management: A meta-analysis of interventions', '2021', 'https://doi.org/10.1016/j.cpr.2021.102031', 'Clinical Psychology Review', 5)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-047 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-047';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Shame and guilt: Distinct self-conscious emotions', '2020', 'https://doi.org/10.1037/bul0000241', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Shame-proneness and psychopathology', '2019', 'https://doi.org/10.1016/j.cpr.2019.04.007', 'Clinical Psychology Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Guilt and prosocial behavior', '2020', 'https://doi.org/10.1037/pspi0000213', 'Journal of Personality and Social Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Compassion-focused therapy for shame', '2021', 'https://doi.org/10.1111/bjc.12285', 'British Journal of Clinical Psychology', 4),
      (v_art_id, 'textbook', 5, 'I Thought It Was Just Me (But It Isn\', '2007', 'https://www.worldcat.org/title/i-thought-it-was-just-me-but-it-isnt/oclc/85692537', NULL, 5)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-048 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-048';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Rumination and depression: A meta-analysis', '2020', 'https://doi.org/10.1016/j.cpr.2020.101885', 'Clinical Psychology Review', 1),
      (v_art_id, 'peer_reviewed', 1, 'The neuroscience of repetitive negative thinking', '2021', 'https://doi.org/10.1038/s41583-021-00470-6', 'Nature Reviews Neuroscience', 2),
      (v_art_id, 'peer_reviewed', 1, 'Rumination-focused cognitive-behavioral therapy', '2020', 'https://doi.org/10.1016/j.brat.2020.103698', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness for rumination: A systematic review', '2021', 'https://doi.org/10.1007/s12671-021-01625-6', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Rumination and the default mode network', '2019', 'https://doi.org/10.1016/j.neuroimage.2019.05.007', NULL, 5)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-049 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-049';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Emotional perfectionism and psychological distress', '2021', 'https://doi.org/10.1016/j.paid.2021.110892', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Toxic positivity: The dark side of positive thinking', '2020', 'https://doi.org/10.1177/0022167820951155', 'Journal of Humanistic Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Radical acceptance in DBT', '2019', 'https://doi.org/10.1016/j.cbpra.2019.02.001', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'The function of negative emotions', '2020', 'https://doi.org/10.1177/1754073920930211', 'Emotion Review', 4)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-050 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-050';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Neuroplasticity and habit change', '2021', 'https://doi.org/10.1038/s41583-021-00474-2', 'Nature Reviews Neuroscience', 1),
      (v_art_id, 'peer_reviewed', 1, 'Implementation intentions for behavior change', '2020', 'https://doi.org/10.1037/bul0000267', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Habit formation in real-world settings', '2020', 'https://doi.org/10.1002/ejsp.2711', 'European Journal of Social Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'The role of self-compassion in behavior change', '2021', 'https://doi.org/10.1080/15298868.2020.1849524', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive restructuring in CBT', '2020', 'https://doi.org/10.1016/j.beth.2019.11.002', NULL, 5)
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
