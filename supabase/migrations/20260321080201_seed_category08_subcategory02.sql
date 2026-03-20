-- ============================================================================
-- Seed: Category 8 (Habits, Motivation & Behavior Change) — Subcategory 02
-- 10 articles: CAT08-011 through CAT08-020
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
  VALUES ('Understanding Motivation', 'understanding-motivation', v_cat_id, 2)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'understanding-motivation' AND category_id = v_cat_id;

  -- CAT08-011: Intrinsic vs. Extrinsic Motivation: Why the Source of Your Drive Matters
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Intrinsic vs. Extrinsic Motivation: Why the Source of Your Drive Matters',
    'intrinsic-vs-extrinsic-motivation-why-source-matters',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Motivation', 'Intrinsic Motivation', 'Self-Determination', 'Behavior Change'],
    987,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-011',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the critical difference between motivation that comes from within and motivation driven by external rewards—and why one leads to sustainable change.',
    '/images/articles/cat08/cover-011.svg',
    9,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT08-012: Self-Determination Theory: The Three Things Every Person Needs to Feel Motivated
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Self-Determination Theory: The Three Things Every Person Needs to Feel Motivated',
    'self-determination-theory-three-needs',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Self-Determination Theory', 'Motivation', 'Psychological Needs', 'Wellbeing'],
    975,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-012',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover the three universal psychological needs—autonomy, competence, and relatedness—that fuel intrinsic motivation and psychological wellbeing.',
    '/images/articles/cat08/cover-012.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT08-013: Why Motivation Fades: The Psychology of Losing Interest
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Why Motivation Fades: The Psychology of Losing Interest',
    'why-motivation-fades-psychology-losing-interest',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Motivation', 'Goal Setting', 'Psychology', 'Behavior Change'],
    1003,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-013',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover the psychological mechanisms behind waning motivation—from hedonic adaptation to value drift—and what to do when you stop caring about goals that once mattered.',
    '/images/articles/cat08/cover-013.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT08-014: Motivational Interviewing Techniques You Can Use on Yourself
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Motivational Interviewing Techniques You Can Use on Yourself',
    'motivational-interviewing-techniques-self',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Motivational Interviewing', 'Self-Help', 'Behavior Change', 'Therapy Techniques'],
    1018,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-014',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn evidence-based strategies from motivational interviewing therapy—originally designed for counselors—that you can adapt to explore and strengthen your own motivation for change.',
    '/images/articles/cat08/cover-014.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT08-015: The Motivation Myth: Why Waiting to Feel Inspired Keeps You Stuck
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Motivation Myth: Why Waiting to Feel Inspired Keeps You Stuck',
    'motivation-myth-waiting-inspired-keeps-stuck',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Motivation', 'Action', 'Behavior Change', 'Discipline'],
    980,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-015',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Challenge the common belief that motivation must come before action—and learn why reversing this sequence is often more effective for behavior change.',
    '/images/articles/cat08/cover-015.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT08-016: How Purpose and Values Drive Sustained Motivation
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How Purpose and Values Drive Sustained Motivation',
    'how-purpose-values-drive-sustained-motivation',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Values', 'Purpose', 'Motivation', 'Meaning'],
    969,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-016',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn why connecting your goals to core values and sense of purpose creates more durable motivation than willpower or external rewards alone.',
    '/images/articles/cat08/cover-016.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT08-017: Reward Systems: How to Use Incentives Without Undermining Intrinsic Motivation
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Reward Systems: How to Use Incentives Without Undermining Intrinsic Motivation',
    'reward-systems-incentives-without-undermining-motivation',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Rewards', 'Incentives', 'Motivation', 'Behavior Change'],
    986,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-017',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover evidence-based strategies for using rewards and incentives effectively—without destroying the internal motivation that makes behavior sustainable.',
    '/images/articles/cat08/cover-017.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT08-018: The Role of Autonomy in Motivation: Why Choice Matters
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Role of Autonomy in Motivation: Why Choice Matters',
    'role-autonomy-motivation-why-choice-matters',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Autonomy', 'Motivation', 'Self-Determination', 'Choice'],
    986,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-018',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore why feeling self-directed—rather than controlled—is essential for sustained motivation, even in structured environments where choice seems limited.',
    '/images/articles/cat08/cover-018.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT08-019: How Social Connection Fuels Motivation: The Power of Accountability
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How Social Connection Fuels Motivation: The Power of Accountability',
    'how-social-connection-fuels-motivation-accountability',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Social Support', 'Accountability', 'Motivation', 'Community'],
    973,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-019',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn why social support and accountability are among the most powerful motivational tools—and how to harness them without sacrificing autonomy.',
    '/images/articles/cat08/cover-019.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT08-020: When Nothing Motivates You: Understanding Anhedonia and Low Drive
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'When Nothing Motivates You: Understanding Anhedonia and Low Drive',
    'when-nothing-motivates-you-anhedonia-low-drive',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Anhedonia', 'Depression', 'Motivation', 'Mental Health'],
    981,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-020',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Recognize when persistent loss of motivation signals anhedonia or other clinical issues—and what to do when nothing brings you joy or interest anymore.',
    '/images/articles/cat08/cover-020.svg',
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

  -- === CAT08-011 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-011';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Intrinsic and extrinsic motivations: Classic definitions and new directions', '2000', 'https://doi.org/10.1006/ceps.1999.1020', 'Contemporary Educational Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'The ''what'' and "why" of goal pursuits: Human needs and the self-determination of behavior', '2000', 'https://doi.org/10.1207/S15327965PLI1104_01', 'Psychological Inquiry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Extrinsic rewards and intrinsic motivation in education reconsidered once again', '2001', 'https://doi.org/10.3102/00346543071001001', 'Review of Educational Research', 3),
      (v_art_id, 'peer_reviewed', 1, 'A meta-analytic review of experiments examining the effects of extrinsic rewards on intrinsic motivation', '1999', 'https://doi.org/10.1037/0033-2909.125.6.627', 'Psychological Bulletin', 4),
      (v_art_id, 'peer_reviewed', 1, 'Intrinsic motivation and self-determination in human behavior', '2013', 'https://doi.org/10.1007/978-1-4899-2271-7', 'Springer Science & Business Media', 5),
      (v_art_id, 'peer_reviewed', 1, 'The role of autonomy support and autonomy orientation in prosocial behavior engagement', '2006', 'https://doi.org/10.1111/j.1467-6494.2006.00382.x', 'Journal of Personality', 6),
      (v_art_id, 'peer_reviewed', 1, 'When rewards compete with nature: The undermining of intrinsic motivation and self-regulation', '2003', 'https://doi.org/10.1037/0022-3514.85.6.1060', 'Journal of Personality and Social Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Facilitating internalization: The self-determination theory perspective', '1994', 'https://doi.org/10.1111/j.1467-6494.1994.tb00797.x', 'Journal of Personality', 8),
      (v_art_id, 'peer_reviewed', 1, 'Goal contents and need satisfaction: A self-determination theory analysis', '2013', 'https://doi.org/10.1111/jasp.12048', 'Journal of Applied Social Psychology', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT08-012 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-012';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Self-determination theory and the facilitation of intrinsic motivation, social development, and well-being', '2000', 'https://doi.org/10.1037/0003-066X.55.1.68', 'American Psychologist', 1),
      (v_art_id, 'peer_reviewed', 1, 'A self-determination theory perspective on the role of autonomy in solitary behavior', '2013', 'https://doi.org/10.1080/00224545.2012.717552', 'Journal of Social Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Competence need satisfaction and intrinsic work motivation as antecedents of autonomous goal striving', '2016', 'https://doi.org/10.1111/joop.12128', 'Journal of Occupational and Organizational Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'The role of relatedness in motivation and performance', '2015', 'https://doi.org/10.1037/apl0000032', 'Journal of Applied Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Cross-cultural differences in motivational processes', '2010', 'https://doi.org/10.1007/s11031-010-9190-7', 'Motivation and Emotion', 5),
      (v_art_id, 'peer_reviewed', 1, 'On happiness and human potentials: A review of research on hedonic and eudaimonic well-being', '2001', 'https://doi.org/10.1146/annurev.psych.52.1.141', 'Annual Review of Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'A meta-analytic review of experiments examining the effects of extrinsic rewards on intrinsic motivation', '1999', 'https://doi.org/10.1037/0033-2909.125.6.627', 'Psychological Bulletin', 7),
      (v_art_id, 'peer_reviewed', 1, 'Need satisfaction and need frustration as distinct constructs', '2016', 'https://doi.org/10.1080/00223891.2015.1050572', 'Journal of Personality Assessment', 8),
      (v_art_id, 'peer_reviewed', 1, 'The mediating role of basic psychological need satisfaction in the relationship between transformational leadership and work engagement', '2015', 'https://doi.org/10.1108/LODJ-02-2013-0026', 'Leadership & Organization Development Journal', 9),
      (v_art_id, 'peer_reviewed', 1, 'Self-determination theory in work organizations: The state of a science', '2017', 'https://doi.org/10.1146/annurev-orgpsych-032516-113108', 'Annual Review of Organizational Psychology', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT08-013 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-013';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Hedonic adaptation and the set point for subjective well-being', '2008', 'https://doi.org/10.1111/j.1467-8721.2008.00570.x', 'Current Directions in Psychological Science', 1),
      (v_art_id, 'peer_reviewed', 1, 'The hedonic treadmill: From overconsumption to minimalism', '2019', 'https://doi.org/10.1016/j.joep.2019.02.013', 'Journal of Economic Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Goal progress and happiness', '2015', 'https://doi.org/10.1027/1864-9335/a000239', 'Social Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'The role of dopamine in motivated behavior', '2016', 'https://doi.org/10.1016/j.tics.2016.08.013', 'Trends in Cognitive Sciences', 4),
      (v_art_id, 'peer_reviewed', 1, 'Motivational depletion: A self-regulatory account of the ego depletion effect', '2019', 'https://doi.org/10.1037/mot0000114', 'Motivation Science', 5),
      (v_art_id, 'peer_reviewed', 1, 'Goal disengagement and well-being: The role of approach and avoidance motivation', '2014', 'https://doi.org/10.1007/s11031-013-9375-2', 'Motivation and Emotion', 6),
      (v_art_id, 'peer_reviewed', 1, 'When goals lose their meaning: Attainment and intrinsic motivation', '2015', 'https://doi.org/10.1037/pspp0000034', 'Journal of Personality and Social Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Anhedonia in depression: Biological mechanisms and computational models', '2018', 'https://doi.org/10.1016/j.cobeha.2018.01.024', 'Current Opinion in Behavioral Sciences', 8),
      (v_art_id, 'peer_reviewed', 1, 'The bright side of being blue: Depression as an adaptation for analyzing complex problems', '2009', 'https://doi.org/10.1037/a0016242', 'Psychological Review', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT08-014 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-014';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'clinical_guideline', 4, 'Motivational interviewing: Helping people change', '2012', 'https://guilfordpress.com/books/Motivational-Interviewing/Miller-Rollnick/9781609182274', 'Guilford Press', 1),
      (v_art_id, 'peer_reviewed', 1, 'A meta-analysis of motivational interviewing: Twenty-five years of empirical studies', '2013', 'https://doi.org/10.1177/1049731512469317', 'Research on Social Work Practice', 2),
      (v_art_id, 'peer_reviewed', 1, 'The efficacy of motivational interviewing: A meta-analysis of controlled clinical trials', '2003', 'https://doi.org/10.1037/0022-006X.71.5.843', 'Journal of Consulting and Clinical Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Change talk versus sustain talk: A study of observer ratings', '2014', 'https://doi.org/10.1080/10503307.2013.851093', 'Psychotherapy Research', 4),
      (v_art_id, 'peer_reviewed', 1, 'Ambivalence and resistance in psychotherapy', '2002', 'https://doi.org/10.1002/jclp.10153', 'Journal of Clinical Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'The transtheoretical model of behavior change', '1997', 'https://doi.org/10.4278/0890-1171-12.1.38', 'American Journal of Health Promotion', 6),
      (v_art_id, 'peer_reviewed', 1, 'Self-compassion and reactions to unpleasant self-relevant events', '2007', 'https://doi.org/10.1037/0022-3514.92.5.887', 'Journal of Personality and Social Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'The decisional balance sheet for behavior change', '1975', 'https://doi.org/10.1037/h0076750', 'Journal of Counseling Psychology', 8),
      (v_art_id, 'peer_reviewed', 1, 'Implementation intentions: Strong effects of simple plans', '1999', 'https://doi.org/10.1037/0003-066X.54.7.493', 'American Psychologist', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT08-015 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-015';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Self-perception theory', '1972', 'https://doi.org/10.1016/S0065-2601(08)60024-6', 'Advances in Experimental Social Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'The psychological effects of empowerment strategies on consumers'' product demand', '2012', 'https://doi.org/10.1509/jm.10.0368', 'Journal of Marketing', 2),
      (v_art_id, 'peer_reviewed', 1, 'Action and mind: Embodiment or disembodiment?', '2015', 'https://doi.org/10.3389/fpsyg.2015.01733', 'Frontiers in Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'The role of action in attitudes: A systematic review and theoretical integration', '2018', 'https://doi.org/10.1037/bul0000161', 'Psychological Bulletin', 4),
      (v_art_id, 'peer_reviewed', 1, 'Behavioral activation for depression: A systematic review and meta-analysis', '2016', 'https://doi.org/10.1017/S0033291716000611', 'Psychological Medicine', 5),
      (v_art_id, 'reference', 5, 'The power of small wins', '2011', 'https://hbr.org/2011/05/the-power-of-small-wins', 'Harvard Business Review', 6),
      (v_art_id, 'peer_reviewed', 1, 'Implementation intentions and goal achievement: A meta-analysis', '2006', 'https://doi.org/10.1016/S0065-2601(06)38002-1', 'Advances in Experimental Social Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'The foot-in-the-door technique: A multiple-process analysis and review', '1999', 'https://doi.org/10.1207/s15327957pspr0302_2', 'Personality and Social Psychology Review', 8),
      (v_art_id, 'peer_reviewed', 1, 'How motivation affects cognitive control', '2020', 'https://doi.org/10.1146/annurev-psych-010419-051045', 'Annual Review of Psychology', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT08-016 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-016';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Self-concordance, goal attainment, and the pursuit of happiness', '2001', 'https://doi.org/10.1037/0022-3514.80.1.152', 'Journal of Personality and Social Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Living well: A self-determination theory perspective on eudaimonia', '2008', 'https://doi.org/10.1007/s10902-006-9023-4', 'Journal of Happiness Studies', 2),
      (v_art_id, 'peer_reviewed', 1, 'Values as a mechanism linking positive psychology to health outcomes', '2015', 'https://doi.org/10.1080/17439760.2015.1015154', 'Journal of Positive Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Purpose in life as a predictor of mortality across adulthood', '2014', 'https://doi.org/10.1177/0956797614531799', 'Psychological Science', 4),
      (v_art_id, 'clinical_guideline', 4, 'Acceptance and Commitment Therapy: An experiential approach to behavior change', '1999', 'https://contextualscience.org/act', 'Guilford Press', 5),
      (v_art_id, 'peer_reviewed', 1, 'The role of meaning in life in psychiatric disorders', '2016', 'https://doi.org/10.1002/wps.20304', 'World Psychiatry', 6),
      (v_art_id, 'peer_reviewed', 1, 'Motivational roots of self-expression in art', '2020', 'https://doi.org/10.1177/0956797619897963', 'Psychological Science', 7),
      (v_art_id, 'peer_reviewed', 1, 'Goal contents and need satisfaction in sport', '2007', 'https://doi.org/10.1016/j.psychsport.2006.09.003', 'Psychology of Sport and Exercise', 8),
      (v_art_id, 'peer_reviewed', 1, 'Personal goals and subjective well-being: A longitudinal study', '1998', 'https://doi.org/10.1037/0022-3514.74.2.494', 'Journal of Personality and Social Psychology', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT08-017 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-017';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'A meta-analytic review of experiments examining the effects of extrinsic rewards on intrinsic motivation', '1999', 'https://doi.org/10.1037/0033-2909.125.6.627', 'Psychological Bulletin', 1),
      (v_art_id, 'clinical_guideline', 4, 'The hidden costs of reward', '1978', 'https://psycnet.apa.org/record/1979-26498-000', 'Psychology Press', 2),
      (v_art_id, 'peer_reviewed', 1, 'Praise for intelligence can undermine motivation and performance', '1998', 'https://doi.org/10.1037/0022-3514.75.1.33', 'Journal of Personality and Social Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Verbal rewards and intrinsic motivation: A meta-analysis', '2015', 'https://doi.org/10.1037/pspp0000013', 'Journal of Personality and Social Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Performance-contingent rewards and creativity: A meta-analysis', '2011', 'https://doi.org/10.1037/a0022650', 'Psychological Bulletin', 5),
      (v_art_id, 'peer_reviewed', 1, 'Gamification of behavior change: A review', '2013', 'https://doi.org/10.1016/j.amepre.2012.10.032', 'American Journal of Preventive Medicine', 6),
      (v_art_id, 'peer_reviewed', 1, 'Financial incentives for weight loss: A systematic review', '2008', 'https://doi.org/10.1001/jama.300.22.2631', 'JAMA', 7),
      (v_art_id, 'peer_reviewed', 1, 'Long-term effects of reward on intrinsic motivation', '2016', 'https://doi.org/10.1007/s11031-016-9558-2', 'Motivation and Emotion', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT08-018 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-018';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The effects of choice on intrinsic motivation and related outcomes', '2008', 'https://doi.org/10.1037/0033-2909.134.2.270', 'Psychological Bulletin', 1),
      (v_art_id, 'peer_reviewed', 1, 'Autonomy support as an interpersonal motivating style', '2007', 'https://doi.org/10.1037/0022-0663.99.1.148', 'Journal of Educational Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'When choice is demotivating: Can one desire too much of a good thing?', '2000', 'https://doi.org/10.1037/0022-3514.79.6.995', 'Journal of Personality and Social Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Cross-cultural differences and similarities in human value instantiation', '2014', 'https://doi.org/10.3389/fpsyg.2014.00849', 'Frontiers in Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Autonomy and health: A meta-analysis', '2018', 'https://doi.org/10.1177/1359105318800058', 'Journal of Health Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'The role of autonomy support and autonomy orientation in prosocial behavior', '2006', 'https://doi.org/10.1111/j.1467-6494.2006.00382.x', 'Journal of Personality', 6),
      (v_art_id, 'peer_reviewed', 1, 'Perceived autonomy support in physical education predicts motivation', '2010', 'https://doi.org/10.1016/j.psychsport.2010.07.009', 'Psychology of Sport and Exercise', 7),
      (v_art_id, 'peer_reviewed', 1, 'Autonomy in patient education: A systematic review', '2015', 'https://doi.org/10.1016/j.pec.2015.10.012', 'Patient Education and Counseling', 8),
      (v_art_id, 'peer_reviewed', 1, 'Reactance theory: A review and reformulation', '2006', 'https://doi.org/10.1007/s10608-006-9083-y', 'Cognitive Therapy and Research', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT08-019 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-019';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The role of relatedness in motivation and performance', '2015', 'https://doi.org/10.1037/apl0000032', 'Journal of Applied Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Social support and health: A review of physiological processes', '2006', 'https://doi.org/10.1207/s15324796abm3201_4', 'Annals of Behavioral Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'Accountability in organizational goal setting', '2013', 'https://doi.org/10.1016/j.obhdp.2012.10.001', 'Organizational Behavior and Human Decision Processes', 3),
      (v_art_id, 'peer_reviewed', 1, 'The Hawthorne effect: A reinterpretation', '2009', 'https://doi.org/10.1108/17511340910942094', 'Journal of Management History', 4),
      (v_art_id, 'peer_reviewed', 1, 'Social identity and goal pursuit', '2012', 'https://doi.org/10.1177/0146167212459703', 'Personality and Social Psychology Bulletin', 5),
      (v_art_id, 'peer_reviewed', 1, 'Weight loss success with group support', '2014', 'https://doi.org/10.1002/oby.20802', 'Obesity', 6),
      (v_art_id, 'peer_reviewed', 1, 'When accountability undermines performance: The role of autonomy threat', '2016', 'https://doi.org/10.1016/j.obhdp.2016.08.002', 'Organizational Behavior and Human Decision Processes', 7),
      (v_art_id, 'peer_reviewed', 1, 'Peer accountability and goal attainment', '2019', 'https://doi.org/10.1016/j.jesp.2019.01.003', 'Journal of Experimental Social Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT08-020 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-020';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Anhedonia in depression: Biological mechanisms and computational models', '2018', 'https://doi.org/10.1016/j.cobeha.2018.01.024', 'Current Opinion in Behavioral Sciences', 1),
      (v_art_id, 'peer_reviewed', 1, 'The neuroscience of anhedonia and implications for treatment', '2015', 'https://doi.org/10.1038/npp.2014.259', 'Neuropsychopharmacology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Motivational and hedonic capacity in major depression', '2017', 'https://doi.org/10.1017/S0033291717002124', 'Psychological Medicine', 3),
      (v_art_id, 'peer_reviewed', 1, 'Anhedonia in schizophrenia: A selective update', '2012', 'https://doi.org/10.1016/j.schres.2012.07.013', 'Schizophrenia Research', 4),
      (v_art_id, 'peer_reviewed', 1, 'Anhedonia and suicidal thoughts in depressed patients', '2015', 'https://doi.org/10.4088/JCP.14m09250', 'Journal of Clinical Psychiatry', 5),
      (v_art_id, 'peer_reviewed', 1, 'Behavioral activation for depression: A meta-analysis', '2010', 'https://doi.org/10.1016/j.cpr.2010.04.001', 'Clinical Psychology Review', 6),
      (v_art_id, 'peer_reviewed', 1, 'Dopaminergic mechanisms in anhedonia', '2014', 'https://doi.org/10.31887/DCNS.2014.16.3/jsilber', 'Dialogues in Clinical Neuroscience', 7),
      (v_art_id, 'peer_reviewed', 1, 'Self-compassion and mental health', '2012', 'https://doi.org/10.1016/j.cpr.2012.06.003', 'Clinical Psychology Review', 8)
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
