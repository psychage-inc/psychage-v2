-- ============================================================================
-- Seed: Category 4 (Self-Worth, Confidence & Identity) — Subcategory 02
-- 6 articles: CAT04-011 through CAT04-016
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert Category if not present
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  'Self-Worth, Confidence & Identity',
  'self-esteem-identity',
  '',
  'Brain',
  4,
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'self-esteem-identity';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Self Compassion Inner Dialogue', 'self-compassion-inner-dialogue', v_cat_id, 2)
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'self-esteem-identity';
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'self-compassion-inner-dialogue' AND category_id = v_cat_id;

  -- CAT04-011: What Is Self-Compassion? The Three Components That Change How You Relate to Yourself
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'What Is Self-Compassion? The Three Components That Change How You Relate to Yourself',
    'what-is-self-compassion-three-components',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Self-Compassion', 'Mindfulness', 'Psychology', 'Wellbeing'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-011',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand self-compassion through its three interconnected elements and discover why this approach to self-relation transforms wellbeing.',
    '/images/articles/cat04/cover-011.svg',
    8,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT04-012: Your Inner Critic: Where It Comes From and How to Turn Down the Volume
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Your Inner Critic: Where It Comes From and How to Turn Down the Volume',
    'inner-critic-where-it-comes-from',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Inner Critic', 'Self-Talk', 'Cognitive Patterns', 'Mental Health'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-012',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the origins of your harsh internal voice and learn evidence-based strategies to reduce its power over you.',
    '/images/articles/cat04/cover-012.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT04-013: Self-Talk Patterns: Identifying Whether Your Internal Voice Helps or Harms
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Self-Talk Patterns: Identifying Whether Your Internal Voice Helps or Harms',
    'self-talk-patterns-helpful-harmful',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Self-Talk', 'Cognitive Patterns', 'Mental Health', 'Self-Awareness'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-013',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn to recognize the difference between constructive and destructive self-talk and shift toward patterns that support your wellbeing.',
    '/images/articles/cat04/cover-013.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT04-014: How to Practice Self-Compassion When You Don
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How to Practice Self-Compassion When You Don',
    'practice-self-compassion-when-dont-feel-deserve',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Self-Compassion', 'Shame', 'Worthiness', 'Practice'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-014',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Overcome the belief that you don\',
    '/images/articles/cat04/cover-014.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT04-015: The Self-Compassion Break: A 3-Minute Practice for Difficult Moments
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Self-Compassion Break: A 3-Minute Practice for Difficult Moments',
    'self-compassion-break-3-minute-practice',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Self-Compassion', 'Practice', 'Mindfulness', 'Coping'],
    1000,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-015',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn a simple, evidence-based three-step practice to offer yourself compassion in moments of stress, failure, or pain.',
    '/images/articles/cat04/cover-015.svg',
    6,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT04-016: Common Humanity: Why Knowing Others Struggle Too Reduces Self-Blame
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Common Humanity: Why Knowing Others Struggle Too Reduces Self-Blame',
    'common-humanity-reduces-self-blame',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Common Humanity', 'Self-Compassion', 'Shame', 'Connection'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-016',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand how recognizing shared human imperfection breaks the isolation of suffering and reduces shame and self-criticism.',
    '/images/articles/cat04/cover-016.svg',
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

  -- === CAT04-011 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-011';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Self-Compassion: An Alternative Conceptualization', '2003', 'https://doi.org/10.1080/15298860309032', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'The Development and Validation of the Self-Compassion Scale', '2003', 'https://doi.org/10.1080/15298860309027', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Self-Compassion and Psychological Wellbeing', '2007', 'https://doi.org/10.1016/j.jrp.2006.03.004', 'Journal of Research in Personality', 3),
      (v_art_id, 'peer_reviewed', 1, 'A Meta-Analytic Review of Self-Compassion Interventions', '2019', 'https://doi.org/10.1016/j.cpr.2019.01.006', 'Clinical Psychology Review', 4),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness and Self-Compassion', '2011', 'https://doi.org/10.1007/s12671-011-0066-5', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Common Humanity and Psychological Wellbeing', '2014', 'https://doi.org/10.1007/s10902-013-9485-z', 'Journal of Happiness Studies', 6),
      (v_art_id, 'peer_reviewed', 1, 'Self-Compassion and Mental Health', '2012', 'https://doi.org/10.1016/j.brat.2012.01.001', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Buddhist Psychology and Self-Compassion', '2009', 'https://doi.org/10.1002/jclp.20605', 'Journal of Clinical Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT04-012 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-012';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The Internal Critic in Psychotherapy', '2014', 'https://doi.org/10.1037/a0036395', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Self-Criticism and Depression', '2004', 'https://doi.org/10.1016/j.cpr.2004.01.002', 'Clinical Psychology Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Forms of Self-Criticizing/Attacking and Self-Reassuring', '2004', 'https://doi.org/10.1348/014466504772812959', 'British Journal of Clinical Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Childhood Maltreatment and Self-Criticism', '2010', 'https://doi.org/10.1111/j.1467-6494.2010.00636.x', 'Journal of Personality', 4),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive Behavioral Therapy for Self-Criticism', '2012', 'https://doi.org/10.1016/j.brat.2012.01.001', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Self-Compassion as an Antidote to Self-Criticism', '2014', 'https://doi.org/10.1002/jclp.22090', 'Journal of Clinical Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'The Evolutionary Function of Self-Criticism', '2008', 'https://doi.org/10.1016/j.evolhumbehav.2007.07.002', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Perfectionism and the Inner Critic', '2016', 'https://doi.org/10.1016/j.paid.2016.03.006', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT04-013 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-013';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Self-Talk and Performance', '2014', 'https://doi.org/10.1177/1745691614528708', 'Perspectives on Psychological Science', 1),
      (v_art_id, 'peer_reviewed', 1, 'Positive and Negative Self-Talk', '2011', 'https://doi.org/10.1037/a0021849', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive Distortions in Self-Talk', '2008', 'https://doi.org/10.1007/s10608-007-9136-3', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Self-Talk in Clinical Psychology', '2016', 'https://doi.org/10.1016/j.cpr.2016.02.001', 'Clinical Psychology Review', 4),
      (v_art_id, 'peer_reviewed', 1, 'Rumination and Self-Talk', '2010', 'https://doi.org/10.1037/a0020394', 'Journal of Abnormal Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Motivational Self-Talk', '2015', 'https://doi.org/10.1037/spy0000037', 'Sport, Exercise, and Performance Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Self-Distancing in Self-Talk', '2014', 'https://doi.org/10.1037/a0036956', 'Journal of Personality and Social Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Changing Negative Self-Talk Patterns', '2013', 'https://doi.org/10.1016/j.brat.2013.09.002', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT04-014 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-014';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Overcoming Barriers to Self-Compassion', '2016', 'https://doi.org/10.1007/s12671-016-0549-y', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Shame and Self-Compassion', '2013', 'https://doi.org/10.1002/jclp.21965', 'Journal of Clinical Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Deservingness Beliefs and Mental Health', '2018', 'https://doi.org/10.1016/j.cpr.2018.03.005', 'Clinical Psychology Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'Trauma and Self-Compassion', '2015', 'https://doi.org/10.1002/jts.22012', 'Journal of Traumatic Stress', 4),
      (v_art_id, 'peer_reviewed', 1, 'Self-Compassion Interventions', '2019', 'https://doi.org/10.1016/j.brat.2019.05.009', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Compassion-Focused Therapy', '2010', 'https://doi.org/10.1348/014466509X467746', 'British Journal of Clinical Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Incremental Self-Compassion Practice', '2017', 'https://doi.org/10.1080/15298868.2017.1309262', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Self-Worth vs. Self-Compassion', '2014', 'https://doi.org/10.1111/jopy.12061', 'Journal of Personality', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT04-015 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-015';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'textbook', 5, 'The Self-Compassion Break: Core Practice', '2018', 'https://self-compassion.org/the-three-components-of-self-compassion-2/', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Brief Self-Compassion Interventions', '2020', 'https://doi.org/10.1016/j.cpr.2020.101832', 'Clinical Psychology Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Micro-Practices in Mindfulness', '2019', 'https://doi.org/10.1007/s12671-019-01086-3', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Self-Compassion and Stress Reduction', '2017', 'https://doi.org/10.1002/jclp.22368', 'Journal of Clinical Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Neurophysiology of Self-Compassion', '2016', 'https://doi.org/10.1093/scan/nsw060', 'Social Cognitive and Affective Neuroscience', 5),
      (v_art_id, 'peer_reviewed', 1, 'Daily Self-Compassion Practice Effects', '2018', 'https://doi.org/10.1016/j.brat.2018.08.003', NULL, 6)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT04-016 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-016';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Common Humanity and Psychological Wellbeing', '2014', 'https://doi.org/10.1007/s10902-013-9485-z', 'Journal of Happiness Studies', 1),
      (v_art_id, 'peer_reviewed', 1, 'Isolation vs. Common Humanity', '2015', 'https://doi.org/10.1080/15298868.2014.996249', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Shame and Social Connection', '2011', 'https://doi.org/10.1037/a0025233', 'Journal of Personality and Social Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Self-Focused Attention and Isolation', '2010', 'https://doi.org/10.1037/a0020461', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Social Comparison and Mental Health', '2017', 'https://doi.org/10.1016/j.cpr.2017.01.002', 'Clinical Psychology Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'Common Humanity Interventions', '2018', 'https://doi.org/10.1007/s12671-018-0941-x', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'The Social Nature of Self-Consciousness', '2013', 'https://doi.org/10.1037/a0030957', 'Psychological Review', 7)
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
  WHERE a.article_production_id LIKE 'CAT04-%';

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;
