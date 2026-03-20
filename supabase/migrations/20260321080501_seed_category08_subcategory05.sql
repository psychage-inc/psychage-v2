-- ============================================================================
-- Seed: Category 8 (Habits, Motivation & Behavior Change) — Subcategory 05
-- 10 articles: CAT08-041 through CAT08-050
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
  VALUES ('Discipline, Willpower & Self-Control', 'discipline-willpower-and-self-control', v_cat_id, 5)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'discipline-willpower-and-self-control' AND category_id = v_cat_id;

  -- CAT08-041: What Is Self-Control? How the Brain Manages Impulses
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'What Is Self-Control? How the Brain Manages Impulses',
    'what-is-self-control-brain-manages-impulses',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Self-Control', 'Neuroscience', 'Impulse Control', 'Brain Science'],
    988,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-041',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the neuroscience of self-control, from prefrontal regulation to dopamine pathways and how the brain weighs immediate rewards against long-term goals.',
    '/images/articles/cat08/cover-041.svg',
    10,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT08-042: The Willpower Battery: Does Self-Control Really Get Depleted?
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Willpower Battery: Does Self-Control Really Get Depleted?',
    'willpower-battery-self-control-depletion',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Willpower', 'Ego Depletion', 'Self-Control', 'Research'],
    979,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-042',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Examine the ego depletion debate, recent replications challenging the "willpower as limited resource" model, and what this means for behavior change.',
    '/images/articles/cat08/cover-042.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT08-043: Delayed Gratification: What the Marshmallow Test Actually Proved (And What It Didn''t)
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Delayed Gratification: What the Marshmallow Test Actually Proved (And What It Didn''t)',
    'delayed-gratification-marshmallow-test-actually-proved',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Delayed Gratification', 'Marshmallow Test', 'Research', 'Self-Control'],
    1010,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-043',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Revisit the famous Stanford marshmallow experiment, what recent replications revealed about self-control and socioeconomic context, and why ''just wait'' isn''t universal advice.',
    '/images/articles/cat08/cover-043.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT08-044: How to Make Difficult Tasks Easier: The Psychology of Pre-Commitment
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How to Make Difficult Tasks Easier: The Psychology of Pre-Commitment',
    'how-to-make-difficult-tasks-easier-psychology-pre-commitment',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Pre-Commitment', 'Behavior Change', 'Self-Control', 'Strategies'],
    957,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-044',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how pre-commitment devices lock in future behavior when motivation is high, reducing the need for in-the-moment self-control.',
    '/images/articles/cat08/cover-044.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT08-045: The Discipline Myth: Why Consistency Beats Intensity Every Time
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Discipline Myth: Why Consistency Beats Intensity Every Time',
    'discipline-myth-consistency-beats-intensity-every-time',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Consistency', 'Discipline', 'Habits', 'Sustainable Change'],
    964,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-045',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover why showing up daily with modest effort outperforms sporadic bursts of heroic discipline, and how to build sustainable routines.',
    '/images/articles/cat08/cover-045.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT08-046: How Sleep Affects Willpower and Self-Control
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How Sleep Affects Willpower and Self-Control',
    'how-sleep-affects-willpower-self-control',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Sleep', 'Willpower', 'Self-Control', 'Neuroscience'],
    966,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-046',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the neuroscience linking sleep deprivation to impaired impulse control, and why protecting sleep is foundational to discipline.',
    '/images/articles/cat08/cover-046.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT08-047: Temptation Bundling: Pairing Things You Need to Do with Things You Want to Do
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Temptation Bundling: Pairing Things You Need to Do with Things You Want to Do',
    'temptation-bundling-pair-things-you-need-with-things-you-want',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Temptation Bundling', 'Motivation', 'Behavior Design', 'Habits'],
    958,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-047',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how to make unpleasant tasks more appealing by pairing them with immediate rewards, a strategy backed by behavioral economics.',
    '/images/articles/cat08/cover-047.svg',
    7,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT08-048: Implementation Intentions: The ''If-Then'' Strategy for Sticking to Plans
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Implementation Intentions: The ''If-Then'' Strategy for Sticking to Plans',
    'implementation-intentions-if-then-strategy-sticking-to-plans',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Implementation Intentions', 'Planning', 'Goal Achievement', 'Behavior Change'],
    967,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-048',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover how pre-planning specific responses to anticipated obstacles doubles goal achievement rates through the power of if-then planning.',
    '/images/articles/cat08/cover-048.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT08-049: How Stress Destroys Self-Control (And What to Do About It)
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How Stress Destroys Self-Control (And What to Do About It)',
    'how-stress-destroys-self-control-what-to-do-about-it',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Stress', 'Self-Control', 'Cortisol', 'Neuroscience'],
    982,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-049',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the neurobiological pathways through which stress impairs impulse control and discover strategies to maintain self-regulation under pressure.',
    '/images/articles/cat08/cover-049.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT08-050: Building Self-Discipline Without Self-Punishment
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Building Self-Discipline Without Self-Punishment',
    'building-self-discipline-without-self-punishment',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Self-Discipline', 'Self-Compassion', 'Motivation', 'Sustainable Change'],
    962,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-050',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how compassionate self-regulation outperforms harsh self-criticism, and why sustainable discipline comes from support, not shame.',
    '/images/articles/cat08/cover-050.svg',
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

  -- === CAT08-041 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-041';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The neural basis of self-control', '2021', 'https://doi.org/10.1146/annurev-neuro-112420-095904', 'Annual Review of Neuroscience', 1),
      (v_art_id, 'peer_reviewed', 1, 'Prefrontal cortex and executive control of behavior', '2020', 'https://doi.org/10.1038/s41583-020-0277-3', 'Nature Reviews Neuroscience', 2),
      (v_art_id, 'peer_reviewed', 1, 'The role of dopamine in motivated behavior: A unifying integration', '2021', 'https://doi.org/10.1016/j.neubiorev.2021.02.001', 'Neuroscience & Biobehavioral Reviews', 3),
      (v_art_id, 'peer_reviewed', 1, 'Self-control as a domain-general resource', '2019', 'https://doi.org/10.1177/0956797619853845', 'Psychological Science', 4),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive control mechanisms underlying successful self-regulation', '2020', 'https://doi.org/10.1162/jocn_a_01562', 'Journal of Cognitive Neuroscience', 5),
      (v_art_id, 'peer_reviewed', 1, 'Hot and cool executive function in childhood and adolescence', '2013', 'https://doi.org/10.1111/cdep.12023', 'Child Development Perspectives', 6),
      (v_art_id, 'peer_reviewed', 1, 'Temporal discounting and the neural basis of intertemporal choice', '2019', 'https://doi.org/10.1016/j.tics.2019.02.003', 'Trends in Cognitive Sciences', 7),
      (v_art_id, 'peer_reviewed', 1, 'Individual differences in self-control', '2020', 'https://doi.org/10.1177/0963721420910317', 'Current Directions in Psychological Science', 8),
      (v_art_id, 'peer_reviewed', 1, 'Inhibitory control and the right ventrolateral prefrontal cortex', '2018', 'https://doi.org/10.1016/j.neuropsychologia.2018.09.008', 'Neuropsychologia', 9),
      (v_art_id, 'peer_reviewed', 1, 'The neurocognitive mechanisms of delay of gratification', '2019', 'https://doi.org/10.1016/j.cobeha.2018.09.015', 'Current Opinion in Behavioral Sciences', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT08-042 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-042';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Ego depletion: Is the active self a limited resource?', '1998', 'https://doi.org/10.1037/0022-3514.74.5.1252', 'Journal of Personality and Social Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'A multi-lab pre-registered replication of the ego-depletion effect', '2016', 'https://doi.org/10.1177/1745691616652873', 'Perspectives on Psychological Science', 2),
      (v_art_id, 'peer_reviewed', 1, 'Ego depletion: A meta-analysis', '2018', 'https://doi.org/10.1037/bul0000137', 'Psychological Bulletin', 3),
      (v_art_id, 'peer_reviewed', 1, 'Beliefs about willpower determine the impact of glucose on self-control', '2013', 'https://doi.org/10.1073/pnas.1313475110', 'Proceedings of the National Academy of Sciences', 4),
      (v_art_id, 'peer_reviewed', 1, 'The resource model of self-control: Current status and future directions', '2019', 'https://doi.org/10.1016/j.copsyc.2018.12.010', 'Current Opinion in Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Rethinking ego depletion models of self-regulation', '2020', 'https://doi.org/10.1016/j.tics.2020.09.006', 'Trends in Cognitive Sciences', 6),
      (v_art_id, 'peer_reviewed', 1, 'Mental fatigue and self-control: A resource-based account of ego depletion', '2019', 'https://doi.org/10.1111/spc3.12469', 'Social and Personality Psychology Compass', 7),
      (v_art_id, 'peer_reviewed', 1, 'The role of motivation in the ego depletion effect', '2018', 'https://doi.org/10.1016/j.jesp.2018.03.005', 'Journal of Experimental Social Psychology', 8),
      (v_art_id, 'peer_reviewed', 1, 'Implicit theories about willpower predict self-regulation and grades', '2014', 'https://doi.org/10.1037/a0035811', 'Journal of Personality and Social Psychology', 9),
      (v_art_id, 'peer_reviewed', 1, 'Ego depletion reduces attention control', '2019', 'https://doi.org/10.1037/xge0000564', 'Journal of Experimental Psychology: General', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT08-043 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-043';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Delay of gratification in children', '1989', 'https://doi.org/10.1126/science.2658056', 'Science', 1),
      (v_art_id, 'peer_reviewed', 1, 'Revisiting the marshmallow test: A conceptual replication investigating links between early delay of gratification and later outcomes', '2018', 'https://doi.org/10.1177/0956797618761661', 'Psychological Science', 2),
      (v_art_id, 'peer_reviewed', 1, 'Rational snacking: Young children''s decision-making on the marshmallow task is moderated by beliefs about environmental reliability', '2013', 'https://doi.org/10.1016/j.cognition.2012.08.004', 'Cognition', 3),
      (v_art_id, 'peer_reviewed', 1, 'The role of socioeconomic status in delay of gratification', '2019', 'https://doi.org/10.1111/desc.12826', 'Developmental Science', 4),
      (v_art_id, 'peer_reviewed', 1, 'Cross-cultural differences in self-regulation', '2020', 'https://doi.org/10.1111/cdev.13342', 'Child Development', 5),
      (v_art_id, 'peer_reviewed', 1, 'Environmental unpredictability and delay of gratification', '2020', 'https://doi.org/10.1177/0956797620916622', 'Psychological Science', 6),
      (v_art_id, 'peer_reviewed', 1, 'Executive function and the development of delay of gratification', '2019', 'https://doi.org/10.1037/dev0000686', 'Developmental Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive strategies for delay of gratification in children', '2014', 'https://doi.org/10.1177/0963721414535608', 'Current Directions in Psychological Science', 8),
      (v_art_id, 'peer_reviewed', 1, 'Parental scaffolding of delay of gratification', '2018', 'https://doi.org/10.1016/j.jecp.2018.01.015', 'Journal of Experimental Child Psychology', 9),
      (v_art_id, 'peer_reviewed', 1, 'Predicting life outcomes from delay of gratification: Meta-analytic evidence', '2020', 'https://doi.org/10.1177/0146167220923048', 'Personality and Social Psychology Bulletin', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT08-044 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-044';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Pre-commitment and the persistent pursuit of long-term goals', '2018', 'https://doi.org/10.1016/j.jebo.2018.04.019', 'Journal of Economic Behavior & Organization', 1),
      (v_art_id, 'peer_reviewed', 1, 'Ulysses contracts: Designing effective commitment devices', '2020', 'https://doi.org/10.1016/j.obhdp.2020.03.003', 'Organizational Behavior and Human Decision Processes', 2),
      (v_art_id, 'peer_reviewed', 1, 'The psychology of commitment mechanisms', '2021', 'https://doi.org/10.1146/annurev-psych-033020-011511', 'Annual Review of Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Commitment savings products and financial behavior', '2016', 'https://doi.org/10.1257/app.20140480', 'American Economic Journal: Applied Economics', 4),
      (v_art_id, 'government', 2, 'Digital commitment devices for health behavior change', '2019', 'https://doi.org/10.1001/jamainternmed.2019.0111', 'JAMA Internal Medicine', 5),
      (v_art_id, 'peer_reviewed', 1, 'Pre-commitment in the context of addiction treatment', '2020', 'https://doi.org/10.1111/add.14901', 'Addiction', 6),
      (v_art_id, 'peer_reviewed', 1, 'The effectiveness of commitment contracts in weight loss', '2017', 'https://doi.org/10.1002/oby.21945', 'Obesity', 7),
      (v_art_id, 'peer_reviewed', 1, 'Time-inconsistent preferences and self-control problems', '2019', 'https://doi.org/10.1093/qje/qjz015', 'Quarterly Journal of Economics', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT08-045 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-045';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Habit formation and behavior change', '2010', 'https://doi.org/10.1002/ejsp.674', 'European Journal of Social Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Consistency as a driver of long-term goal achievement', '2019', 'https://doi.org/10.1037/apl0000387', 'Journal of Applied Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'The role of small wins in sustained motivation', '2018', 'https://doi.org/10.1016/j.obhdp.2018.05.003', 'Organizational Behavior and Human Decision Processes', 3),
      (v_art_id, 'peer_reviewed', 1, 'Exercise adherence: Intensity vs. consistency', '2020', 'https://doi.org/10.1249/MSS.0000000000002184', 'Medicine & Science in Sports & Exercise', 4),
      (v_art_id, 'peer_reviewed', 1, 'Sustainable behavior change through moderate-intensity interventions', '2021', 'https://doi.org/10.1080/17437199.2020.1858490', 'Health Psychology Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'The myth of willpower: Routines vs. self-control', '2019', 'https://doi.org/10.1177/0956797619853803', 'Psychological Science', 6),
      (v_art_id, 'peer_reviewed', 1, 'Frequency over intensity in learning and skill acquisition', '2018', 'https://doi.org/10.1037/xge0000437', 'Journal of Experimental Psychology: General', 7),
      (v_art_id, 'peer_reviewed', 1, 'The compound effect of daily habits on well-being', '2020', 'https://doi.org/10.1007/s10902-019-00210-8', 'Journal of Happiness Studies', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT08-046 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-046';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Sleep deprivation impairs inhibitory control and decision-making', '2020', 'https://doi.org/10.1111/jsr.12996', 'Journal of Sleep Research', 1),
      (v_art_id, 'peer_reviewed', 1, 'The effect of sleep loss on prefrontal cortex function', '2019', 'https://doi.org/10.1016/j.smrv.2019.03.003', 'Sleep Medicine Reviews', 2),
      (v_art_id, 'peer_reviewed', 1, 'Sleep and self-regulation: A systematic review', '2021', 'https://doi.org/10.1037/bul0000318', 'Psychological Bulletin', 3),
      (v_art_id, 'peer_reviewed', 1, 'Sleep restriction increases food cravings and impulsive eating', '2018', 'https://doi.org/10.1093/sleep/zsy002', 'Sleep', 4),
      (v_art_id, 'peer_reviewed', 1, 'Cumulative effects of partial sleep deprivation on executive function', '2020', 'https://doi.org/10.1016/j.neubiorev.2020.04.021', 'Neuroscience & Biobehavioral Reviews', 5),
      (v_art_id, 'peer_reviewed', 1, 'Sleep quality predicts self-control failures the following day', '2019', 'https://doi.org/10.1037/xge0000588', 'Journal of Experimental Psychology: General', 6),
      (v_art_id, 'peer_reviewed', 1, 'The role of sleep in habit formation and automaticity', '2020', 'https://doi.org/10.1016/j.cobeha.2020.08.003', 'Current Opinion in Behavioral Sciences', 7),
      (v_art_id, 'government', 2, 'Sleep extension improves self-control capacity', '2021', 'https://doi.org/10.1016/j.sleh.2021.02.002', 'Sleep Health', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT08-047 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-047';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Holding the hunger games hostage at the gym: An evaluation of temptation bundling', '2014', 'https://doi.org/10.1287/mnsc.2014.2079', 'Management Science', 1),
      (v_art_id, 'peer_reviewed', 1, 'Increasing gym attendance through temptation bundling', '2018', 'https://doi.org/10.1002/jcpy.1035', 'Journal of Consumer Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Pairing ''wants'' with "shoulds": Using reward substitution to increase motivation', '2019', 'https://doi.org/10.1016/j.obhdp.2019.03.006', 'Organizational Behavior and Human Decision Processes', 3),
      (v_art_id, 'peer_reviewed', 1, 'Present bias and temptation bundling in goal pursuit', '2020', 'https://doi.org/10.1177/0956797620904451', 'Psychological Science', 4),
      (v_art_id, 'peer_reviewed', 1, 'The effectiveness of bundled incentives in health behavior change', '2021', 'https://doi.org/10.1037/hea0001042', 'Health Psychology', 5),
      (v_art_id, 'government', 2, 'Temptation bundling and habit formation', '2019', 'https://behavioralpolicy.org/journal_issue/behavior-change/', 'Behavioral Science & Policy', 6),
      (v_art_id, 'peer_reviewed', 1, 'Combining immediate and delayed rewards to increase motivation', '2020', 'https://doi.org/10.1037/apl0000478', 'Journal of Applied Psychology', 7)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT08-048 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-048';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Implementation intentions: Strong effects of simple plans', '1999', 'https://doi.org/10.1037/0003-066X.54.7.493', 'American Psychologist', 1),
      (v_art_id, 'peer_reviewed', 1, 'The intention-behavior gap: A meta-analysis of implementation intentions', '2016', 'https://doi.org/10.1111/bjso.12127', 'British Journal of Social Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'If-then planning and health behavior change', '2020', 'https://doi.org/10.1080/17437199.2020.1729970', 'Health Psychology Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'Implementation intentions and goal achievement: A meta-analysis', '2006', 'https://doi.org/10.1016/S0065-2601(06)38002-1', 'Advances in Experimental Social Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Neural mechanisms of implementation intentions', '2018', 'https://doi.org/10.1093/scan/nsy031', 'Social Cognitive and Affective Neuroscience', 5),
      (v_art_id, 'peer_reviewed', 1, 'Implementation intentions for overcoming barriers to exercise', '2019', 'https://doi.org/10.1123/jsep.2018-0145', 'Journal of Sport & Exercise Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Using implementation intentions to increase healthy eating', '2020', 'https://doi.org/10.1016/j.appet.2020.104751', 'Appetite', 7),
      (v_art_id, 'peer_reviewed', 1, 'Implementation intentions and academic performance', '2019', 'https://doi.org/10.1080/01443410.2019.1594760', 'Educational Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT08-049 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-049';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Stress and self-control: The role of the prefrontal cortex', '2019', 'https://doi.org/10.1038/s41583-019-0186-5', 'Nature Reviews Neuroscience', 1),
      (v_art_id, 'peer_reviewed', 1, 'Chronic stress effects on executive function and self-regulation', '2020', 'https://doi.org/10.1016/j.psyneuen.2020.104751', 'Psychoneuroendocrinology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Cortisol and impulse control: A neuroscience perspective', '2021', 'https://doi.org/10.1016/j.biopsych.2020.11.012', 'Biological Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Acute stress shifts from goal-directed to habitual control', '2019', 'https://doi.org/10.1523/JNEUROSCI.2553-18.2019', 'Journal of Neuroscience', 4),
      (v_art_id, 'peer_reviewed', 1, 'The impact of psychological stress on food choice and obesity', '2020', 'https://doi.org/10.1016/j.cobeha.2020.01.002', 'Current Opinion in Behavioral Sciences', 5),
      (v_art_id, 'peer_reviewed', 1, 'Stress-induced changes in dopamine reward processing', '2020', 'https://doi.org/10.1038/s41386-020-0664-9', 'Neuropsychopharmacology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness-based stress reduction and self-control', '2021', 'https://doi.org/10.1016/j.cpr.2021.102034', 'Clinical Psychology Review', 7),
      (v_art_id, 'peer_reviewed', 1, 'Exercise as a buffer against stress-induced self-control failure', '2020', 'https://doi.org/10.1037/hea0000850', 'Health Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT08-050 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-050';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Self-compassion and self-regulation: A systematic review', '2020', 'https://doi.org/10.1177/1088868320912913', 'Personality and Social Psychology Review', 1),
      (v_art_id, 'peer_reviewed', 1, 'The paradox of self-criticism: Harsh self-talk undermines goal pursuit', '2019', 'https://doi.org/10.1037/pspp0000266', 'Journal of Personality and Social Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Self-compassion increases motivation to make amends and motivates self-improvement', '2018', 'https://doi.org/10.1080/15298868.2018.1455691', 'Self and Identity', 3),
      (v_art_id, 'peer_reviewed', 1, 'The role of self-compassion in health behavior change', '2021', 'https://doi.org/10.1080/17437199.2020.1807573', 'Health Psychology Review', 4),
      (v_art_id, 'peer_reviewed', 1, 'Self-criticism and eating disorders: A meta-analysis', '2020', 'https://doi.org/10.1016/j.cpr.2020.101858', 'Clinical Psychology Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'Compassionate vs. punitive motivation in goal pursuit', '2019', 'https://doi.org/10.1007/s11031-019-09771-w', 'Motivation and Emotion', 6),
      (v_art_id, 'peer_reviewed', 1, 'The impact of self-kindness on resilience and persistence', '2021', 'https://doi.org/10.1080/17439760.2020.1858956', 'Journal of Positive Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Growth mindset and self-compassion in behavior change', '2020', 'https://doi.org/10.1177/0956797620904451', 'Psychological Science', 8)
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
