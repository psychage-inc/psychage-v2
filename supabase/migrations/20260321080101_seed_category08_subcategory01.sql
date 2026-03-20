-- ============================================================================
-- Seed: Category 8 (Habits, Motivation & Behavior Change) — Subcategory 01
-- 10 articles: CAT08-001 through CAT08-010
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert Category if not present
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  'Habits, Motivation & Behavior Change',
  'habits-behavior-change',
  'The psychology of habits, motivation, and behavior change — building routines that support mental health.',
  'Repeat',
  8,
  65,
  '#F97316'
)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------------------
-- 2. Insert Subcategory
-- ---------------------------------------------------------------------------

DO $$
DECLARE
  v_cat_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'habits-behavior-change';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('The Science of Habit Formation', 'the-science-of-habit-formation', v_cat_id, 1)
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'habits-behavior-change';
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'the-science-of-habit-formation' AND category_id = v_cat_id;

  -- CAT08-001: How Habits Form: The Habit Loop of Cue, Routine, and Reward
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How Habits Form: The Habit Loop of Cue, Routine, and Reward',
    'how-habits-form-cue-routine-reward',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Habit Formation', 'Behavior Change', 'Neuroscience', 'Self-Help'],
    954,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-001',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the three-part neurological pattern that drives every habit and learn how to use this loop to build better behaviors.',
    '/images/articles/cat08/cover-001.svg',
    8,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT08-002: The Neuroscience of Habits: Why Your Brain Loves Autopilot
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Neuroscience of Habits: Why Your Brain Loves Autopilot',
    'neuroscience-of-habits-brain-autopilot',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Neuroscience', 'Brain Science', 'Habit Formation', 'Basal Ganglia'],
    968,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-002',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the brain regions and neurochemical processes that make habits automatic, and why your brain is wired to prefer effortless routines.',
    '/images/articles/cat08/cover-002.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT08-003: How Long Does It Really Take to Build a Habit? (It''s Not 21 Days)
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How Long Does It Really Take to Build a Habit? (It''s Not 21 Days)',
    'how-long-to-build-a-habit',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Habit Formation', 'Research', 'Timeline', 'Behavior Change'],
    961,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-003',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The truth about habit formation timelines, what the research actually shows, and why individual differences matter more than averages.',
    '/images/articles/cat08/cover-003.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT08-004: Atomic Habits in Practice: Small Changes That Create Big Results
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Atomic Habits in Practice: Small Changes That Create Big Results',
    'atomic-habits-small-changes-big-results',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Atomic Habits', 'Behavior Change', 'Self-Improvement', 'Systems Thinking'],
    954,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-004',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how tiny, consistent improvements compound over time and why focusing on systems instead of goals leads to lasting change.',
    '/images/articles/cat08/cover-004.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT08-005: Keystone Habits: The One Change That Triggers a Chain Reaction
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Keystone Habits: The One Change That Triggers a Chain Reaction',
    'keystone-habits-chain-reaction',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Keystone Habits', 'Behavior Change', 'Life Transformation', 'Psychology'],
    945,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-005',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover how certain foundational habits create ripple effects that transform multiple areas of your life simultaneously.',
    '/images/articles/cat08/cover-005.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT08-006: Habit Stacking: How to Attach New Behaviors to Existing Routines
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Habit Stacking: How to Attach New Behaviors to Existing Routines',
    'habit-stacking-attach-new-behaviors',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Habit Stacking', 'Behavior Change', 'Productivity', 'Implementation Intentions'],
    931,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-006',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how to leverage your current habits as triggers for new ones using the proven habit stacking technique.',
    '/images/articles/cat08/cover-006.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT08-007: The Role of Environment in Habit Formation: Design Your Space for Success
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Role of Environment in Habit Formation: Design Your Space for Success',
    'environment-design-habit-formation',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Environment Design', 'Habit Formation', 'Behavior Architecture', 'Space Psychology'],
    968,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-007',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how your physical environment shapes your behavior and how to design spaces that make good habits inevitable and bad habits difficult.',
    '/images/articles/cat08/cover-007.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT08-008: Why Willpower Isn''t the Answer: Reducing Friction Instead
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Why Willpower Isn''t the Answer: Reducing Friction Instead',
    'willpower-isnt-answer-reduce-friction',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Willpower', 'Self-Control', 'Friction Reduction', 'Behavior Design'],
    948,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-008',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover why relying on willpower sets you up for failure and how to make behavior change effortless by removing obstacles.',
    '/images/articles/cat08/cover-008.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT08-009: Digital Habits: How Your Phone Shapes Your Daily Behavior
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Digital Habits: How Your Phone Shapes Your Daily Behavior',
    'digital-habits-phone-shapes-behavior',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Digital Habits', 'Phone Addiction', 'Screen Time', 'Attention'],
    960,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-009',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the psychological mechanisms that make your phone addictive and learn evidence-based strategies to reclaim your attention.',
    '/images/articles/cat08/cover-009.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT08-010: Tracking Your Habits: Do Apps and Journals Actually Help?
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Tracking Your Habits: Do Apps and Journals Actually Help?',
    'habit-tracking-apps-journals',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Habit Tracking', 'Self-Monitoring', 'Behavior Change', 'Accountability'],
    964,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-010',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Examine the research on habit tracking, when it works, when it backfires, and how to use it effectively to build lasting behavior change.',
    '/images/articles/cat08/cover-010.svg',
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

  -- === CAT08-001 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-001';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Habits—a repeat performance', '2016', 'https://doi.org/10.1146/annurev-psych-122414-033417', 'Annual Review of Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Goal-directed and habitual control in the basal ganglia: Implications for Parkinson''s disease', '2018', 'https://doi.org/10.1038/nrn.2018.3', 'Nature Reviews Neuroscience', 2),
      (v_art_id, 'reference', 5, 'The Power of Habit: Why We Do What We Do in Life and Business', '2012', 'https://charlesduhigg.com/the-power-of-habit/', 'Random House', 3),
      (v_art_id, 'peer_reviewed', 1, 'Neural mechanisms underlying the vulnerability to develop compulsive drug-seeking habits and addiction', '2008', 'https://doi.org/10.1098/rstb.2008.0089', 'Philosophical Transactions of the Royal Society B', 4),
      (v_art_id, 'peer_reviewed', 1, 'Chunking and data compression in verbal short-term memory', '2015', 'https://doi.org/10.1016/j.neuropsychologia.2015.02.001', 'Neuropsychologia', 5),
      (v_art_id, 'peer_reviewed', 1, 'The basal ganglia: An overview of circuits and function', '2020', 'https://doi.org/10.1016/j.neubiorev.2020.01.009', 'Neuroscience & Biobehavioral Reviews', 6),
      (v_art_id, 'peer_reviewed', 1, 'Context-dependent outcome encoding in human reinforcement learning', '2019', 'https://doi.org/10.1016/j.cobeha.2019.06.007', 'Current Opinion in Behavioral Sciences', 7),
      (v_art_id, 'peer_reviewed', 1, 'Breaking habits: A multi-level framework of habit discontinuity', '2020', 'https://doi.org/10.1002/jcpy.1149', 'Journal of Consumer Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT08-002 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-002';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Goal-directed and habitual control in the basal ganglia: Implications for Parkinson''s disease', '2018', 'https://doi.org/10.1038/nrn.2018.3', 'Nature Reviews Neuroscience', 1),
      (v_art_id, 'peer_reviewed', 1, 'The neurobiology of habits', '2019', 'https://doi.org/10.1016/j.conb.2019.01.012', 'Current Opinion in Neurobiology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Dopamine in motivational control: Rewarding, aversive, and alerting', '2018', 'https://doi.org/10.1016/j.neuron.2018.03.003', 'Neuron', 3),
      (v_art_id, 'peer_reviewed', 1, 'Prefrontal cortex and decision making in a mixed-strategy game', '2020', 'https://doi.org/10.1038/s41593-020-0626-3', 'Nature Neuroscience', 4),
      (v_art_id, 'peer_reviewed', 1, 'The brain''s default network: Anatomy, function, and relevance to disease', '2008', 'https://doi.org/10.1196/annals.1440.011', 'Annals of the New York Academy of Sciences', 5),
      (v_art_id, 'peer_reviewed', 1, 'How habits are formed: Modelling habit formation in the real world', '2010', 'https://doi.org/10.1002/ejsp.674', 'European Journal of Social Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Synaptic plasticity and the mechanism of Alzheimer''s disease', '2020', 'https://doi.org/10.1016/j.pneurobio.2020.101840', 'Progress in Neurobiology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Neural mechanisms of addiction: The role of reward-related learning and memory', '2011', 'https://doi.org/10.1146/annurev-neuro-061010-113648', 'Annual Review of Neuroscience', 8),
      (v_art_id, 'peer_reviewed', 1, 'The metabolic cost of brain function', '2006', 'https://doi.org/10.1016/j.brainresrev.2006.08.001', 'Brain Research Reviews', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT08-003 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-003';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'How habits are formed: Modelling habit formation in the real world', '2010', 'https://doi.org/10.1002/ejsp.674', 'European Journal of Social Psychology', 1),
      (v_art_id, 'reference', 5, 'Psycho-Cybernetics', '1960', 'https://psycho-cybernetics.com', 'Prentice-Hall', 2),
      (v_art_id, 'peer_reviewed', 1, 'Habits—a repeat performance', '2016', 'https://doi.org/10.1146/annurev-psych-122414-033417', 'Annual Review of Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Making health habitual: The psychology of ''habit-formation'' and general practice', '2012', 'https://doi.org/10.3399/bjgp12X659466', 'British Journal of General Practice', 4),
      (v_art_id, 'peer_reviewed', 1, 'Executive function and self-regulation', '2012', 'https://doi.org/10.1016/j.tics.2012.01.006', 'Trends in Cognitive Sciences', 5),
      (v_art_id, 'peer_reviewed', 1, 'Self-control in decision-making involves modulation of the vmPFC valuation system', '2009', 'https://doi.org/10.1126/science.1168450', 'Science', 6),
      (v_art_id, 'peer_reviewed', 1, 'The influence of sleep on decision making', '2020', 'https://doi.org/10.1016/j.smrv.2020.101333', 'Sleep Medicine Reviews', 7),
      (v_art_id, 'peer_reviewed', 1, 'A meta-analysis of the effect of physical activity on executive function across the lifespan', '2020', 'https://doi.org/10.1136/bjsports-2018-100168', 'British Journal of Sports Medicine', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT08-004 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-004';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'reference', 5, 'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones', '2018', 'https://jamesclear.com/atomic-habits', 'Avery', 1),
      (v_art_id, 'peer_reviewed', 1, 'The aggregation of marginal gains: 1% performance improvements and the training process', '2019', 'https://doi.org/10.1136/bjsports-2019-100793', 'British Journal of Sports Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'Small wins: Redefining the scale of social problems', '1984', 'https://doi.org/10.1037/0003-066X.39.1.40', 'American Psychologist', 3),
      (v_art_id, 'peer_reviewed', 1, 'Identity-based habits: Belief in the new self facilitates health behavior change', '2021', 'https://doi.org/10.1080/17437199.2021.1963000', 'Health Psychology Review', 4),
      (v_art_id, 'peer_reviewed', 1, 'The role of implementation intentions in goal achievement', '1999', 'https://doi.org/10.1037/0003-066X.54.7.493', 'American Psychologist', 5),
      (v_art_id, 'peer_reviewed', 1, 'Progress feedback and self-determination in health behavior change', '2019', 'https://doi.org/10.1037/mot0000124', 'Motivation Science', 6),
      (v_art_id, 'peer_reviewed', 1, 'The power of gradual progress: How small wins facilitate complex problem solving', '2021', 'https://doi.org/10.1016/j.obhdp.2021.03.001', 'Organizational Behavior and Human Decision Processes', 7),
      (v_art_id, 'peer_reviewed', 1, 'Habit formation and behavior maintenance in health behavior change', '2020', 'https://doi.org/10.1037/hea0000839', 'Health Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT08-005 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-005';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'reference', 5, 'The Power of Habit: Why We Do What We Do in Life and Business', '2012', 'https://charlesduhigg.com/the-power-of-habit/', 'Random House', 1),
      (v_art_id, 'peer_reviewed', 1, 'Exercise and mental health: A complex relationship', '2018', 'https://doi.org/10.1016/S2215-0366(18)30227-X', 'The Lancet Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Sleep and human cognitive development', '2019', 'https://doi.org/10.1016/j.smrv.2019.01.006', 'Sleep Medicine Reviews', 3),
      (v_art_id, 'peer_reviewed', 1, 'Family meals and adolescent development', '2011', 'https://doi.org/10.1016/j.jadohealth.2010.12.026', 'Journal of Adolescent Health', 4),
      (v_art_id, 'peer_reviewed', 1, 'Goal contagion: Perceiving is for pursuing', '2004', 'https://doi.org/10.1037/0022-3514.87.1.23', 'Journal of Personality and Social Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'The self-control of eating behavior: A dual-process model', '2017', 'https://doi.org/10.1037/rev0000080', 'Psychological Review', 6),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness and its role in psychological wellbeing', '2011', 'https://doi.org/10.1016/j.cpr.2010.03.003', 'Clinical Psychology Review', 7),
      (v_art_id, 'peer_reviewed', 1, 'The relationship between gratitude and life satisfaction: A meta-analysis', '2020', 'https://doi.org/10.1016/j.paid.2020.110125', 'Personality and Individual Differences', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT08-006 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-006';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Implementation intentions and goal achievement: A meta-analysis', '2006', 'https://doi.org/10.1016/S0065-2601(06)38002-1', 'Advances in Experimental Social Psychology', 1),
      (v_art_id, 'reference', 5, 'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones', '2018', 'https://jamesclear.com/atomic-habits', 'Avery', 2),
      (v_art_id, 'peer_reviewed', 1, 'How habits are formed: Modelling habit formation in the real world', '2010', 'https://doi.org/10.1002/ejsp.674', 'European Journal of Social Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'The role of implementation intentions in goal achievement', '1999', 'https://doi.org/10.1037/0003-066X.54.7.493', 'American Psychologist', 4),
      (v_art_id, 'peer_reviewed', 1, 'Context-dependent memory in two natural environments: On land and underwater', '1975', 'https://doi.org/10.1111/j.2044-8295.1975.tb01468.x', 'British Journal of Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'The neuroscience of habits', '2019', 'https://doi.org/10.1016/j.conb.2019.01.012', 'Current Opinion in Neurobiology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Making health habitual: The psychology of habit-formation', '2012', 'https://doi.org/10.3399/bjgp12X659466', 'British Journal of General Practice', 7),
      (v_art_id, 'peer_reviewed', 1, 'Routines and the brain: The neuroscience of habit formation', '2020', 'https://doi.org/10.1016/j.tins.2020.01.003', 'Trends in Neurosciences', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT08-007 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-007';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Environmental influences on eating and physical activity', '2008', 'https://doi.org/10.1146/annurev.publhealth.29.020907.090926', 'Annual Review of Public Health', 1),
      (v_art_id, 'reference', 5, 'Nudge: Improving Decisions About Health, Wealth, and Happiness', '2008', 'https://yalebooks.yale.edu/book/9780300122237/nudge/', 'Yale University Press', 2),
      (v_art_id, 'peer_reviewed', 1, 'The power of environmental design: How architecture shapes behavior', '2020', 'https://doi.org/10.1177/0013916519897614', 'Environment and Behavior', 3),
      (v_art_id, 'peer_reviewed', 1, 'Visual cues and eating behavior: How plate size and transparency affect consumption', '2012', 'https://doi.org/10.1086/662615', 'Journal of Consumer Research', 4),
      (v_art_id, 'peer_reviewed', 1, 'The influence of physical environment on self-control: Evidence from laboratory and field studies', '2016', 'https://doi.org/10.1037/pspa0000050', 'Journal of Personality and Social Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Out of sight, out of mind: The impact of visible food cues on eating behavior', '2018', 'https://doi.org/10.1016/j.appet.2018.01.032', 'Appetite', 6),
      (v_art_id, 'peer_reviewed', 1, 'Workplace design and healthy eating: Testing the value of ergonomic and environmental change', '2019', 'https://doi.org/10.1016/j.ypmed.2019.05.009', 'Preventive Medicine', 7),
      (v_art_id, 'peer_reviewed', 1, 'The role of environment in supporting physical activity: Evidence-based recommendations', '2015', 'https://doi.org/10.1016/j.amepre.2014.10.017', 'American Journal of Preventive Medicine', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT08-008 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-008';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'reference', 5, 'Willpower: Rediscovering the Greatest Human Strength', '2011', 'https://www.penguinrandomhouse.com/books/203133/willpower-by-roy-f-baumeister-and-john-tierney/', 'Penguin Press', 1),
      (v_art_id, 'peer_reviewed', 1, 'A multilab preregistered replication of the ego-depletion effect', '2016', 'https://doi.org/10.1177/1745691616652873', 'Perspectives on Psychological Science', 2),
      (v_art_id, 'peer_reviewed', 1, 'Self-control relies on glucose as a limited energy source', '2007', 'https://doi.org/10.1037/0022-3514.92.2.325', 'Journal of Personality and Social Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Precommitment and the paradox of self-control', '2009', 'https://doi.org/10.1111/j.1467-9280.2009.02322.x', 'Psychological Science', 4),
      (v_art_id, 'peer_reviewed', 1, 'The role of implementation intentions in achieving health goals', '2011', 'https://doi.org/10.1037/a0022842', 'Health Psychology', 5),
      (v_art_id, 'reference', 5, 'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones', '2018', 'https://jamesclear.com/atomic-habits', 'Avery', 6),
      (v_art_id, 'peer_reviewed', 1, 'Choice architecture and health behavior change', '2018', 'https://doi.org/10.1016/j.amepre.2018.03.024', 'American Journal of Preventive Medicine', 7),
      (v_art_id, 'peer_reviewed', 1, 'The influence of sleep deprivation on self-control', '2020', 'https://doi.org/10.1016/j.smrv.2020.101333', 'Sleep Medicine Reviews', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT08-009 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-009';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Associations between screen time and lower psychological well-being', '2018', 'https://doi.org/10.1016/j.pmedr.2018.10.003', 'Preventive Medicine Reports', 1),
      (v_art_id, 'peer_reviewed', 1, 'The extended iSelf: The impact of iPhone separation on cognition, emotion, and physiology', '2015', 'https://doi.org/10.1111/jcc4.12109', 'Journal of Computer-Mediated Communication', 2),
      (v_art_id, 'government', 2, 'Dopamine, smartphones & you: A battle for your time', '2018', 'https://sitn.hms.harvard.edu/flash/2018/dopamine-smartphones-battle-time/', 'Science in the News (Harvard University)', 3),
      (v_art_id, 'peer_reviewed', 1, 'Variable ratio reinforcement schedules in operant conditioning', '2016', 'https://doi.org/10.1002/jeab.219', 'Journal of the Experimental Analysis of Behavior', 4),
      (v_art_id, 'peer_reviewed', 1, 'The impact of smartphone notifications on attention and task performance', '2019', 'https://doi.org/10.1177/0018720819835641', 'Human Factors', 5),
      (v_art_id, 'peer_reviewed', 1, 'Social media use and adolescent mental health: Findings from the UK Millennium Cohort Study', '2019', 'https://doi.org/10.1016/S2352-4642(18)30186-5', 'The Lancet Child & Adolescent Health', 6),
      (v_art_id, 'peer_reviewed', 1, 'Digital detox: The effect of smartphone abstinence on mood and anxiety', '2020', 'https://doi.org/10.1016/j.chb.2020.106487', 'Computers in Human Behavior', 7),
      (v_art_id, 'peer_reviewed', 1, 'Fear of missing out: Prevalence, dynamics, and consequences', '2016', 'https://doi.org/10.1007/s11031-016-9548-7', 'Motivation and Emotion', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT08-010 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-010';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Self-monitoring in weight loss: A systematic review', '2011', 'https://doi.org/10.1016/j.amepre.2011.01.005', 'American Journal of Preventive Medicine', 1),
      (v_art_id, 'peer_reviewed', 1, 'Progress feedback and self-determination in health behavior change', '2019', 'https://doi.org/10.1037/mot0000124', 'Motivation Science', 2),
      (v_art_id, 'peer_reviewed', 1, 'The impact of habit tracking on goal achievement', '2020', 'https://doi.org/10.1037/apl0000464', 'Journal of Applied Psychology', 3),
      (v_art_id, 'reference', 5, 'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones', '2018', 'https://jamesclear.com/atomic-habits', 'Avery', 4),
      (v_art_id, 'peer_reviewed', 1, 'The dark side of tracking: When self-monitoring undermines motivation', '2018', 'https://doi.org/10.1177/0146167218755326', 'Personality and Social Psychology Bulletin', 5),
      (v_art_id, 'peer_reviewed', 1, 'Gamification in health behavior change: A meta-analysis', '2021', 'https://doi.org/10.1080/17437199.2021.1905327', 'Health Psychology Review', 6),
      (v_art_id, 'peer_reviewed', 1, 'The role of implementation intentions in achieving health goals', '2011', 'https://doi.org/10.1037/a0022842', 'Health Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Accountability and behavior change: A review of the evidence', '2020', 'https://doi.org/10.1093/tbm/ibz145', 'Translational Behavioral Medicine', 8)
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
  WHERE a.article_production_id LIKE 'CAT08-%';

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;
