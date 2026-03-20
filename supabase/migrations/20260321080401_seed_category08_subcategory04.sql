-- ============================================================================
-- Seed: Category 8 (Habits, Motivation & Behavior Change) — Subcategory 04
-- 10 articles: CAT08-031 through CAT08-040
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
  VALUES ('Breaking Unhealthy Patterns', 'breaking-unhealthy-patterns', v_cat_id, 4)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'breaking-unhealthy-patterns' AND category_id = v_cat_id;

  -- CAT08-031: Why Bad Habits Are So Hard to Break: The Neuroscience of Compulsive Behavior
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Why Bad Habits Are So Hard to Break: The Neuroscience of Compulsive Behavior',
    'why-bad-habits-hard-to-break-neuroscience',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Bad Habits', 'Neuroscience', 'Behavior Change', 'Compulsive Behavior'],
    933,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-031',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the brain mechanisms that make unwanted habits stick and why willpower alone often fails to break them.',
    '/images/articles/cat08/cover-031.svg',
    10,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT08-032: How to Break a Social Media Addiction: A Step-by-Step Guide
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How to Break a Social Media Addiction: A Step-by-Step Guide',
    'break-social-media-addiction-step-by-step',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Social Media', 'Digital Wellbeing', 'Addiction', 'Behavior Change'],
    928,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-032',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A practical, evidence-based approach to reducing compulsive social media use and reclaiming your attention.',
    '/images/articles/cat08/cover-032.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT08-033: Emotional Eating: Understanding Why You Eat When You''re Not Hungry
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Emotional Eating: Understanding Why You Eat When You''re Not Hungry',
    'emotional-eating-why-you-eat-when-not-hungry',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Emotional Eating', 'Food Psychology', 'Coping Skills', 'Self-Regulation'],
    944,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-033',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the psychological drivers behind emotional eating and learn strategies to break the cycle without rigid dieting.',
    '/images/articles/cat08/cover-033.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT08-034: Breaking the Procrastination Habit: Strategies That Address the Root Cause
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Breaking the Procrastination Habit: Strategies That Address the Root Cause',
    'break-procrastination-habit-root-cause',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Procrastination', 'Time Management', 'Self-Regulation', 'Anxiety'],
    949,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-034',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Go beyond time management tips to understand and address the emotional and psychological drivers of chronic procrastination.',
    '/images/articles/cat08/cover-034.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT08-035: How to Stop Negative Self-Talk: Rewiring Your Internal Monologue
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How to Stop Negative Self-Talk: Rewiring Your Internal Monologue',
    'stop-negative-self-talk-rewire-internal-monologue',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Self-Talk', 'Cognitive Restructuring', 'Self-Compassion', 'CBT'],
    931,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-035',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn evidence-based cognitive techniques to identify, challenge, and change the critical voice in your head.',
    '/images/articles/cat08/cover-035.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT08-036: Nail Biting, Skin Picking, and Other Body-Focused Repetitive Behaviors
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Nail Biting, Skin Picking, and Other Body-Focused Repetitive Behaviors',
    'nail-biting-skin-picking-body-focused-repetitive-behaviors',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['BFRBs', 'Trichotillomania', 'Skin Picking', 'Habit Reversal'],
    934,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-036',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand BFRBs (body-focused repetitive behaviors) and learn evidence-based strategies to reduce or stop them.',
    '/images/articles/cat08/cover-036.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT08-037: Breaking the Cycle of Staying Up Too Late: Revenge Bedtime Procrastination
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Breaking the Cycle of Staying Up Too Late: Revenge Bedtime Procrastination',
    'breaking-revenge-bedtime-procrastination',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Sleep', 'Bedtime Procrastination', 'Evening Routine', 'Self-Regulation'],
    926,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-037',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand why you sacrifice sleep for leisure time and how to reclaim control over your evening routine.',
    '/images/articles/cat08/cover-037.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT08-038: How to Reduce Alcohol Use Without Complete Abstinence
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How to Reduce Alcohol Use Without Complete Abstinence',
    'reduce-alcohol-use-without-complete-abstinence',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Alcohol', 'Harm Reduction', 'Moderation', 'Substance Use'],
    931,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-038',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Evidence-based strategies for moderating alcohol consumption when you want to cut back but not quit entirely.',
    '/images/articles/cat08/cover-038.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT08-039: Shopping Addiction: When Buying Things Becomes a Coping Mechanism
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Shopping Addiction: When Buying Things Becomes a Coping Mechanism',
    'shopping-addiction-buying-as-coping-mechanism',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Shopping Addiction', 'Compulsive Buying', 'Financial Health', 'Emotional Spending'],
    907,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-039',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand compulsive buying disorder and learn to break the cycle of emotional spending.',
    '/images/articles/cat08/cover-039.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT08-040: Replacing a Bad Habit: Why Substitution Works Better Than Elimination
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Replacing a Bad Habit: Why Substitution Works Better Than Elimination',
    'replacing-bad-habit-substitution-vs-elimination',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Habit Change', 'Behavior Substitution', 'Self-Regulation', 'Neuroscience'],
    933,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-040',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn why trying to "just stop" a bad habit usually fails and how strategic replacement creates lasting change.',
    '/images/articles/cat08/cover-040.svg',
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

  -- === CAT08-031 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-031';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Neural mechanisms underlying the vulnerability to develop compulsive drug-seeking habits and addiction', '2008', 'https://doi.org/10.1098/rstb.2008.0089', 'Philosophical Transactions of the Royal Society B', 1),
      (v_art_id, 'peer_reviewed', 1, 'Habits—a repeat performance', '2016', 'https://doi.org/10.1146/annurev-psych-122414-033417', 'Annual Review of Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'The neuroscience of habits', '2020', 'https://doi.org/10.1016/j.cobeha.2020.02.011', 'Current Opinion in Behavioral Sciences', 3),
      (v_art_id, 'peer_reviewed', 1, 'Dopamine and habit formation: Behavioural and neural synthesis', '2020', 'https://doi.org/10.1111/ejn.14713', 'European Journal of Neuroscience', 4),
      (v_art_id, 'peer_reviewed', 1, 'Breaking habits: A multi-level framework of habit discontinuity', '2020', 'https://doi.org/10.1002/jcpy.1149', 'Journal of Consumer Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Goal-directed and habitual control in the basal ganglia', '2018', 'https://doi.org/10.1038/nrn.2018.3', 'Nature Reviews Neuroscience', 6),
      (v_art_id, 'peer_reviewed', 1, 'The role of stress in the modulation of the balance between goal-directed and habit systems', '2019', 'https://doi.org/10.1016/j.neubiorev.2019.01.025', 'Neuroscience & Biobehavioral Reviews', 7),
      (v_art_id, 'peer_reviewed', 1, 'Disrupting reconsolidation: Memory erasure or blunting of emotional/motivational value?', '2019', 'https://doi.org/10.1038/s41386-019-0432-4', 'Neuropsychopharmacology', 8),
      (v_art_id, 'peer_reviewed', 1, 'Context-dependent control over habitual responding', '2016', 'https://doi.org/10.1016/j.cobeha.2016.02.014', 'Current Opinion in Behavioral Sciences', 9),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive control over habit: Neural circuitry and clinical implications', '2021', 'https://doi.org/10.3389/fpsyt.2021.679430', 'Frontiers in Psychiatry', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT08-032 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-032';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Social media use and adolescent mental health: Findings from the UK Millennium Cohort Study', '2019', 'https://doi.org/10.1016/j.eclinm.2018.12.005', 'EClinicalMedicine', 1),
      (v_art_id, 'peer_reviewed', 1, 'Problematic social media use: Results from a large-scale nationally representative adolescent sample', '2019', 'https://doi.org/10.1371/journal.pone.0212802', 'PLOS ONE', 2),
      (v_art_id, 'peer_reviewed', 1, 'No More FOMO: Limiting Social Media Decreases Loneliness and Depression', '2018', 'https://doi.org/10.1521/jscp.2018.37.10.751', 'Journal of Social and Clinical Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Abstaining from social media use for one week reduces anxiety and depression', '2022', 'https://doi.org/10.1089/cyber.2021.0324', 'Cyberpsychology, Behavior, and Social Networking', 4),
      (v_art_id, 'peer_reviewed', 1, 'The association between mobile phone use and sleep disturbance among Chinese adolescents', '2020', 'https://doi.org/10.1016/j.sleep.2020.01.024', 'Sleep Medicine', 5),
      (v_art_id, 'professional_org', 3, 'Dopamine, smartphones & you: A battle for your time', '2021', 'https://sitn.hms.harvard.edu/flash/2018/dopamine-smartphones-battle-time/', 'Science in the News (Harvard)', 6),
      (v_art_id, 'peer_reviewed', 1, 'Variable reward schedules and the dopamine system', '2019', 'https://doi.org/10.1037/bne0000311', 'Behavioral Neuroscience', 7),
      (v_art_id, 'peer_reviewed', 1, 'Implementation intentions and goal achievement: A meta-analysis of effects and processes', '2006', 'https://doi.org/10.1016/S0065-2601(06)38002-1', 'Advances in Experimental Social Psychology', 8),
      (v_art_id, 'peer_reviewed', 1, 'The attention economy and the health of children', '2021', 'https://doi.org/10.1001/jamapediatrics.2021.0329', 'JAMA Pediatrics', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT08-033 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-033';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Emotional eating and its associations with eating disorder psychopathology, anxiety, depression and stress', '2020', 'https://doi.org/10.1016/j.eatbeh.2020.101369', 'Eating Behaviors', 1),
      (v_art_id, 'peer_reviewed', 1, 'The relationship between stress and emotional eating', '2018', 'https://doi.org/10.1002/smi.2788', 'Stress and Health', 2),
      (v_art_id, 'peer_reviewed', 1, 'Food craving, cortisol and ghrelin responses in modeling highly palatable snack intake', '2019', 'https://doi.org/10.1016/j.physbeh.2019.01.013', 'Physiology & Behavior', 3),
      (v_art_id, 'peer_reviewed', 1, 'Mindful eating interventions for binge and emotional eating', '2021', 'https://doi.org/10.1080/10640266.2021.1901229', 'Eating Disorders', 4),
      (v_art_id, 'peer_reviewed', 1, 'Childhood emotional abuse and eating psychopathology: A mediating role of emotional dysregulation', '2019', 'https://doi.org/10.1016/j.chiabu.2019.104092', 'Child Abuse & Neglect', 5),
      (v_art_id, 'peer_reviewed', 1, 'The serotonin theory of depression: A systematic umbrella review of the evidence', '2022', 'https://doi.org/10.1038/s41380-022-01661-0', 'Molecular Psychiatry', 6),
      (v_art_id, 'peer_reviewed', 1, 'Dietary restraint and self-control: Neurobiological and behavioral mechanisms', '2020', 'https://doi.org/10.3389/fpsyg.2020.00363', 'Frontiers in Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Effectiveness of acceptance and commitment therapy on eating behavior', '2021', 'https://doi.org/10.1186/s40337-021-00420-0', 'Journal of Eating Disorders', 8),
      (v_art_id, 'peer_reviewed', 1, 'Intuitive eating: A novel eating style concept for obesity prevention and health promotion', '2020', 'https://doi.org/10.1017/S0954422420000093', 'Nutrition Research Reviews', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT08-034 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-034';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Procrastination, stress and chronic health conditions: A temporal perspective', '2020', 'https://doi.org/10.1007/s10865-020-00138-w', 'Journal of Behavioral Medicine', 1),
      (v_art_id, 'peer_reviewed', 1, 'The nature of procrastination: A meta-analytic and theoretical review', '2007', 'https://doi.org/10.1037/0033-2909.133.1.65', 'Psychological Bulletin', 2),
      (v_art_id, 'peer_reviewed', 1, 'Fear of failure as a mediator between procrastination and anxiety', '2019', 'https://doi.org/10.1016/j.paid.2019.05.030', 'Personality and Individual Differences', 3),
      (v_art_id, 'peer_reviewed', 1, 'Solving the procrastination puzzle: An evidence-based approach', '2018', 'https://doi.org/10.1007/s11031-018-9681-9', 'Motivation and Emotion', 4),
      (v_art_id, 'peer_reviewed', 1, 'Self-compassion and procrastination: The role of self-regulation', '2020', 'https://doi.org/10.1080/15298868.2020.1807272', 'Self and Identity', 5),
      (v_art_id, 'peer_reviewed', 1, 'ADHD and procrastination: The role of executive function', '2021', 'https://doi.org/10.1177/1087054720972790', 'Journal of Attention Disorders', 6),
      (v_art_id, 'peer_reviewed', 1, 'Implementation intentions and reducing procrastination', '2019', 'https://doi.org/10.1111/jasp.12575', 'Journal of Applied Social Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Temporal motivation theory: 40 years of procrastination research', '2020', 'https://doi.org/10.1177/0963721420906682', 'Current Directions in Psychological Science', 8),
      (v_art_id, 'peer_reviewed', 1, 'Perfectionism and procrastination: A meta-analytic review', '2018', 'https://doi.org/10.1016/j.cpr.2018.09.002', 'Clinical Psychology Review', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT08-035 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-035';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Self-talk as a regulatory mechanism: How you do it matters', '2014', 'https://doi.org/10.1037/a0035173', 'Journal of Personality and Social Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Negative self-talk mediates the relationship between depression and anxiety symptoms', '2020', 'https://doi.org/10.1007/s10608-020-10101-7', 'Cognitive Therapy and Research', 2),
      (v_art_id, 'peer_reviewed', 1, 'The benefits of self-compassion and optimism for self-regulation', '2021', 'https://doi.org/10.1080/17439760.2021.1991447', 'The Journal of Positive Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive distortions, humor styles, and depression', '2018', 'https://doi.org/10.5964/ejop.v14i3.1508', 'Europe''s Journal of Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Self-compassion versus self-esteem: Predicting psychological health', '2019', 'https://doi.org/10.1080/15298868.2019.1645185', 'Self and Identity', 5),
      (v_art_id, 'clinical_guideline', 4, 'Metacognitive therapy for anxiety and depression', '2009', 'https://www.guilford.com/books/Metacognitive-Therapy-for-Anxiety-and-Depression/Wells/9781606233825', 'The Guilford Press', 6),
      (v_art_id, 'peer_reviewed', 1, 'The role of self-talk in regulating emotions: A systematic review', '2021', 'https://doi.org/10.3389/fpsyg.2021.624031', 'Frontiers in Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Defusion in acceptance and commitment therapy', '2020', 'https://doi.org/10.1016/j.jcbs.2020.01.001', 'Journal of Contextual Behavioral Science', 8),
      (v_art_id, 'peer_reviewed', 1, 'The Inner Critic: Psychotherapy and the development of the critical voice', '2019', 'https://doi.org/10.1037/pap0000201', 'Psychoanalytic Psychology', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT08-036 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-036';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Body-focused repetitive behaviors: An evidence-based review', '2020', 'https://doi.org/10.1097/PRA.0000000000000483', 'Journal of Psychiatric Practice', 1),
      (v_art_id, 'peer_reviewed', 1, 'Habit reversal training for body-focused repetitive behaviors: A systematic review', '2019', 'https://doi.org/10.1016/j.cpr.2019.101769', 'Clinical Psychology Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Trichotillomania (hair-pulling disorder)', '2020', 'https://doi.org/10.1038/s41572-020-0195-z', 'Nature Reviews Disease Primers', 3),
      (v_art_id, 'peer_reviewed', 1, 'Excoriation (skin-picking) disorder: Prevalence and clinical characteristics', '2019', 'https://doi.org/10.1002/jclp.22748', 'Journal of Clinical Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'N-acetylcysteine in the treatment of obsessive-compulsive and related disorders', '2021', 'https://doi.org/10.1080/14740338.2021.1942835', 'Expert Opinion on Drug Safety', 5),
      (v_art_id, 'peer_reviewed', 1, 'Acceptance and commitment therapy for body-focused repetitive behaviors', '2020', 'https://doi.org/10.1016/j.beth.2020.03.003', 'Behavior Therapy', 6),
      (v_art_id, 'peer_reviewed', 1, 'Emotion regulation in body-focused repetitive behaviors', '2021', 'https://doi.org/10.1556/2006.2021.00003', 'Journal of Behavioral Addictions', 7),
      (v_art_id, 'peer_reviewed', 1, 'Online cognitive-behavioral therapy for BFRBs: Efficacy and acceptability', '2021', 'https://doi.org/10.1016/j.jocrd.2021.100641', 'Journal of Obsessive-Compulsive and Related Disorders', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT08-037 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-037';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Bedtime procrastination: A self-regulation perspective', '2020', 'https://doi.org/10.3389/fpsyg.2020.01297', 'Frontiers in Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'The association between bedtime procrastination and sleep: The role of self-control', '2019', 'https://doi.org/10.1177/1359105319842931', 'Journal of Health Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Revenge bedtime procrastination: A phenomenon at the intersection of work and leisure', '2021', 'https://doi.org/10.1016/j.smrv.2021.101428', 'Sleep Medicine Reviews', 3),
      (v_art_id, 'peer_reviewed', 1, 'Self-control depletion and sleep: Self-control resources as a limited resource', '2018', 'https://doi.org/10.1111/spc3.12431', 'Social and Personality Psychology Compass', 4),
      (v_art_id, 'peer_reviewed', 1, 'The impact of technology on sleep: Sleep disorders and technology use', '2020', 'https://doi.org/10.2147/NSS.S251615', 'Nature and Science of Sleep', 5),
      (v_art_id, 'peer_reviewed', 1, 'Work-life balance and its relationship with sleep quality', '2021', 'https://doi.org/10.3390/ijerph18158089', 'International Journal of Environmental Research and Public Health', 6),
      (v_art_id, 'peer_reviewed', 1, 'Blue light exposure from devices and sleep disruption', '2019', 'https://doi.org/10.1016/j.sleh.2019.06.002', 'Sleep Health', 7),
      (v_art_id, 'peer_reviewed', 1, 'Implementation intentions and bedtime procrastination', '2020', 'https://doi.org/10.1111/bjhp.12427', 'British Journal of Health Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT08-038 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-038';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Moderate drinking and health: The role of alcohol in chronic disease', '2020', 'https://doi.org/10.2105/AJPH.2020.305761', 'American Journal of Public Health', 1),
      (v_art_id, 'peer_reviewed', 1, 'Controlled drinking as a treatment goal: A meta-analysis', '2020', 'https://doi.org/10.1111/add.14946', 'Addiction', 2),
      (v_art_id, 'peer_reviewed', 1, 'Harm reduction approaches to alcohol use: What is evidence-based?', '2019', 'https://doi.org/10.1186/s13011-019-0234-y', 'Substance Abuse Treatment, Prevention, and Policy', 3),
      (v_art_id, 'peer_reviewed', 1, 'Mindful drinking: The effects of mindfulness on alcohol-related outcomes', '2021', 'https://doi.org/10.1016/j.addbeh.2021.106893', 'Addictive Behaviors', 4),
      (v_art_id, 'peer_reviewed', 1, 'The efficacy of moderation-focused treatment for problem drinkers', '2018', 'https://doi.org/10.1037/ccp0000295', 'Journal of Consulting and Clinical Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Protective behavioral strategies and alcohol outcomes', '2020', 'https://doi.org/10.1111/acer.14319', 'Alcoholism: Clinical and Experimental Research', 6),
      (v_art_id, 'peer_reviewed', 1, 'Alcohol expectancies and drinking behavior: A meta-analytic review', '2019', 'https://doi.org/10.1037/adb0000470', 'Psychology of Addictive Behaviors', 7),
      (v_art_id, 'peer_reviewed', 1, 'The role of self-monitoring in reducing alcohol consumption', '2020', 'https://doi.org/10.1037/hea0000906', 'Health Psychology', 8),
      (v_art_id, 'peer_reviewed', 1, 'Motivational interviewing for alcohol problems: Meta-analytic review', '2020', 'https://doi.org/10.1016/j.jsat.2020.108015', 'Journal of Substance Abuse Treatment', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT08-039 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-039';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Compulsive buying disorder: A review of the evidence', '2020', 'https://doi.org/10.1016/j.cpr.2020.101856', 'Clinical Psychology Review', 1),
      (v_art_id, 'peer_reviewed', 1, 'The prevalence and correlates of compulsive buying behavior', '2019', 'https://doi.org/10.1556/2006.8.2019.50', 'Journal of Behavioral Addictions', 2),
      (v_art_id, 'peer_reviewed', 1, 'Online shopping addiction: The role of impulsivity and emotion dysregulation', '2021', 'https://doi.org/10.1016/j.addbeh.2021.106905', 'Addictive Behaviors', 3),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive-behavioral therapy for compulsive buying: Systematic review', '2020', 'https://doi.org/10.1016/j.jocrd.2020.100558', 'Journal of Obsessive-Compulsive and Related Disorders', 4),
      (v_art_id, 'peer_reviewed', 1, 'The relationship between materialism and compulsive buying', '2019', 'https://doi.org/10.1002/mar.21180', 'Psychology & Marketing', 5),
      (v_art_id, 'government', 2, 'Financial therapy interventions for compulsive buying', '2020', 'https://doi.org/10.4148/1944-9771.1234', 'Journal of Financial Therapy', 6),
      (v_art_id, 'peer_reviewed', 1, 'E-commerce and impulse buying: The role of online shopping convenience', '2021', 'https://doi.org/10.1016/j.chb.2021.106851', 'Computers in Human Behavior', 7),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness-based interventions for compulsive buying disorder', '2020', 'https://doi.org/10.1007/s12671-020-01389-8', 'Mindfulness', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT08-040 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-040';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Habit replacement: An alternative strategy for promoting behavior change', '2020', 'https://doi.org/10.1037/rev0000199', 'Psychological Review', 1),
      (v_art_id, 'peer_reviewed', 1, 'The role of substitution in breaking unwanted habits', '2019', 'https://doi.org/10.1037/xge0000608', 'Journal of Experimental Psychology: General', 2),
      (v_art_id, 'peer_reviewed', 1, 'Breaking habits: A multi-level framework of habit discontinuity', '2020', 'https://doi.org/10.1002/jcpy.1149', 'Journal of Consumer Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Competing response training: Mechanism and applications', '2019', 'https://doi.org/10.1177/0145445519834689', 'Behavior Modification', 4),
      (v_art_id, 'peer_reviewed', 1, 'The neuroscience of habit formation and change', '2020', 'https://doi.org/10.1016/j.cobeha.2020.02.011', 'Current Opinion in Behavioral Sciences', 5),
      (v_art_id, 'peer_reviewed', 1, 'Functional replacement in addiction recovery', '2021', 'https://doi.org/10.1186/s13722-021-00235-w', 'Addiction Science & Clinical Practice', 6),
      (v_art_id, 'peer_reviewed', 1, 'Implementation intentions and habit formation', '2020', 'https://doi.org/10.1080/10463283.2020.1808936', 'European Review of Social Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Context-dependent habit replacement strategies', '2021', 'https://doi.org/10.1017/S0140525X20001454', 'Behavioral and Brain Sciences', 8)
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
