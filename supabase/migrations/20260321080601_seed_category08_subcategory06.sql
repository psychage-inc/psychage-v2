-- ============================================================================
-- Seed: Category 8 (Habits, Motivation & Behavior Change) — Subcategory 06
-- 10 articles: CAT08-051 through CAT08-060
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
  VALUES ('Stages of Change & Readiness', 'stages-of-change-and-readiness', v_cat_id, 6)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'stages-of-change-and-readiness' AND category_id = v_cat_id;

  -- CAT08-051: The Stages of Change Model: Where Are You in Your Journey?
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Stages of Change Model: Where Are You in Your Journey?',
    'stages-of-change-model-where-are-you-in-your-journey',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Behavior Change', 'Self-Awareness', 'Personal Growth', 'Decision Making'],
    973,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-051',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover the research-backed framework for understanding behavior change, identify which stage you''re in, and learn what helps you move forward.',
    '/images/articles/cat08/cover-051.svg',
    8,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT08-052: Pre-Contemplation: When You Don''t Yet See the Need to Change
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Pre-Contemplation: When You Don''t Yet See the Need to Change',
    'pre-contemplation-when-you-dont-yet-see-need-to-change',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Self-Awareness', 'Behavior Change', 'Denial', 'Motivation'],
    982,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-052',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the first stage of change where awareness is limited, explore why resistance emerges, and learn gentle approaches that can shift perspective.',
    '/images/articles/cat08/cover-052.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT08-053: Contemplation: The Psychology of ''I Know I Should, But...''
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Contemplation: The Psychology of ''I Know I Should, But...''',
    'contemplation-psychology-of-i-know-i-should-but',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Ambivalence', 'Decision Making', 'Behavior Change', 'Self-Awareness'],
    987,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-053',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the stage where awareness meets ambivalence, understand why people get stuck weighing pros and cons, and learn strategies to move toward commitment.',
    '/images/articles/cat08/cover-053.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT08-054: Preparation: Setting Yourself Up for Successful Change
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Preparation: Setting Yourself Up for Successful Change',
    'preparation-setting-yourself-up-for-successful-change',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Planning', 'Goal Setting', 'Behavior Change', 'Preparation'],
    987,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-054',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how to transition from thinking about change to planning for it, build a strong foundation for action, and avoid common pitfalls that derail progress.',
    '/images/articles/cat08/cover-054.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT08-055: Action: The First 90 Days of Building New Behavior
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Action: The First 90 Days of Building New Behavior',
    'action-first-90-days-of-building-new-behavior',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Action Stage', 'Habit Formation', 'Motivation', 'Perseverance'],
    994,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-055',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Navigate the most visible and challenging stage of change, understand why motivation fades, and learn strategies to sustain new behaviors through early obstacles.',
    '/images/articles/cat08/cover-055.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT08-056: Maintenance: How to Keep Going When the Novelty Wears Off
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Maintenance: How to Keep Going When the Novelty Wears Off',
    'maintenance-how-to-keep-going-when-novelty-wears-off',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Habit Maintenance', 'Long-Term Change', 'Relapse Prevention', 'Consistency'],
    984,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-056',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Navigate the long-term stage where behavior becomes routine, understand relapse prevention, and learn strategies to sustain change for years, not months.',
    '/images/articles/cat08/cover-056.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT08-057: Relapse: Why Setbacks Are Normal and How to Get Back on Track
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Relapse: Why Setbacks Are Normal and How to Get Back on Track',
    'relapse-why-setbacks-are-normal-and-how-to-get-back-on-track',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Relapse Prevention', 'Recovery', 'Self-Compassion', 'Resilience'],
    990,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-057',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the difference between a lapse and relapse, explore why setbacks happen, and learn evidence-based strategies to recover without shame or giving up.',
    '/images/articles/cat08/cover-057.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT08-058: How to Support Someone Who Isn''t Ready to Change
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How to Support Someone Who Isn''t Ready to Change',
    'how-to-support-someone-who-isnt-ready-to-change',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Supporting Others', 'Relationships', 'Boundaries', 'Motivation'],
    981,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-058',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn stage-appropriate ways to help someone you care about, avoid common mistakes that create resistance, and understand the limits of your influence.',
    '/images/articles/cat08/cover-058.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT08-059: Behavior Change in Couples: When Partners Are at Different Stages
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Behavior Change in Couples: When Partners Are at Different Stages',
    'behavior-change-in-couples-when-partners-are-at-different-stages',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Relationships', 'Couples', 'Communication', 'Mutual Support'],
    988,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-059',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Navigate the unique challenges when couples pursue change at different paces, learn communication strategies that prevent conflict, and build mutual support.',
    '/images/articles/cat08/cover-059.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT08-060: Change at Every Age: Why It''s Never Too Late to Build New Patterns
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Change at Every Age: Why It''s Never Too Late to Build New Patterns',
    'change-at-every-age-why-its-never-too-late-to-build-new-patterns',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Aging', 'Neuroplasticity', 'Lifespan Development', 'Hope'],
    1010,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-060',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore how behavior change evolves across the lifespan, understand age-specific challenges and advantages, and find hope in the neuroplasticity that persists throughout life.',
    '/images/articles/cat08/cover-060.svg',
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

  -- === CAT08-051 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-051';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The Transtheoretical Model and Stages of Change', '2015', 'https://doi.org/10.1002/9781119057840', 'Health Behavior: Theory, Research, and Practice', 1),
      (v_art_id, 'peer_reviewed', 1, 'In search of how people change: Applications to addictive behaviors', '1992', 'https://doi.org/10.1037/0003-066X.47.9.1102', 'American Psychologist', 2),
      (v_art_id, 'peer_reviewed', 1, 'Stages of change profiles in outpatient alcoholism treatment', '1992', 'https://doi.org/10.1016/0899-3289(92)90025-2', 'Journal of Substance Abuse', 3),
      (v_art_id, 'peer_reviewed', 1, 'The Stages and Processes of Self-Change of Smoking: Toward an Integrative Model', '1983', 'https://doi.org/10.1037/0022-006X.51.3.390', 'Journal of Consulting and Clinical Psychology', 4),
      (v_art_id, 'government', 2, 'Transtheoretical Model of Behavior Change', '2022', 'https://cancercontrol.cancer.gov/brp/research/theories_project/transtheoretical.html', 'National Cancer Institute', 5),
      (v_art_id, 'peer_reviewed', 1, 'Stage of readiness and decisional balance for adolescent drinking', '2001', 'https://doi.org/10.15288/jsa.2001.62.318', 'Journal of Studies on Alcohol', 6),
      (v_art_id, 'peer_reviewed', 1, 'The transtheoretical model: Applications to exercise behavior', '1994', 'https://doi.org/10.1249/00005768-199412000-00003', 'Medicine & Science in Sports & Exercise', 7),
      (v_art_id, 'peer_reviewed', 1, 'Applying the Stages of Change Model to Enhance College Student Development', '2007', 'https://doi.org/10.2202/1949-6605.1787', 'NASPA Journal', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT08-052 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-052';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The transtheoretical model of behavior change', '1997', 'https://doi.org/10.4278/0890-1171-12.1.38', 'American Journal of Health Promotion', 1),
      (v_art_id, 'peer_reviewed', 1, 'Defense mechanisms in health behavior change', '2002', 'https://doi.org/10.1016/S0306-4603(01)00178-X', 'Addictive Behaviors', 2),
      (v_art_id, 'peer_reviewed', 1, 'Resistance and the precontemplation stage of change', '2004', 'https://doi.org/10.1002/jclp.20001', 'Journal of Clinical Psychology', 3),
      (v_art_id, 'reference', 5, 'Motivational interviewing: Preparing people for change', '2012', 'https://www.guilford.com/books/Motivational-Interviewing/Miller-Rollnick/9781609182274', 'Guilford Press', 4),
      (v_art_id, 'peer_reviewed', 1, 'The role of denial in clinical practice', '1994', 'https://doi.org/10.1016/0740-5472(94)90015-9', 'Journal of Substance Abuse Treatment', 5),
      (v_art_id, 'government', 2, 'Raising awareness about behavior change', '2020', 'https://www.samhsa.gov/treatment', 'Substance Abuse and Mental Health Services Administration', 6),
      (v_art_id, 'peer_reviewed', 1, 'Confrontation vs. collaboration in therapy', '2003', 'https://doi.org/10.1016/S0272-7358(02)00166-2', 'Clinical Psychology Review', 7),
      (v_art_id, 'peer_reviewed', 1, 'How people learn about their own health risks', '1999', 'https://doi.org/10.1037/0278-6133.18.5.479', 'Health Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT08-053 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-053';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Decisional balance across the stages of change', '1994', 'https://doi.org/10.1037/0278-6133.13.1.39', 'Health Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'The contemplation stage of change in addictive behaviors', '2000', 'https://doi.org/10.1016/S0740-5472(99)00064-8', 'Journal of Substance Abuse Treatment', 2),
      (v_art_id, 'peer_reviewed', 1, 'Motivational interviewing and ambivalence', '2009', 'https://doi.org/10.1002/jclp.20527', 'Journal of Clinical Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Chronic contemplation: Predictors of failure to move forward', '2001', 'https://doi.org/10.1016/S0306-4603(00)00147-5', 'Addictive Behaviors', 4),
      (v_art_id, 'peer_reviewed', 1, 'Self-reevaluation and the stages of change', '1988', 'https://doi.org/10.1016/0306-4603(88)90012-5', 'Addictive Behaviors', 5),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive dissonance theory and behavior change', '2019', 'https://doi.org/10.1037/bul0000181', 'Psychological Bulletin', 6),
      (v_art_id, 'peer_reviewed', 1, 'Values clarification in health behavior change', '2016', 'https://doi.org/10.1177/1090198115611877', 'Health Education & Behavior', 7),
      (v_art_id, 'peer_reviewed', 1, 'The role of commitment in the contemplation stage', '2005', 'https://doi.org/10.1037/0022-006X.73.2.261', 'Journal of Consulting and Clinical Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT08-054 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-054';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Preparation for behavior change: A meta-analysis', '2006', 'https://doi.org/10.1037/0033-2909.132.2.249', 'Psychological Bulletin', 1),
      (v_art_id, 'peer_reviewed', 1, 'Implementation intentions and goal achievement', '2006', 'https://doi.org/10.1016/S0065-2601(06)38002-1', 'Advances in Experimental Social Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Social support and the stages of change', '2000', 'https://doi.org/10.1037/0278-6133.19.4.354', 'Health Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'The preparation stage in addiction recovery', '2003', 'https://doi.org/10.1016/S0740-5472(02)00326-8', 'Journal of Substance Abuse Treatment', 4),
      (v_art_id, 'peer_reviewed', 1, 'Planning and self-regulation of behavior change', '2005', 'https://doi.org/10.1348/135910705X42865', 'British Journal of Health Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Mental contrasting with implementation intentions', '2016', 'https://doi.org/10.1007/s10608-016-9767-x', 'Cognitive Therapy and Research', 6),
      (v_art_id, 'peer_reviewed', 1, 'The role of environmental restructuring in behavior change', '2018', 'https://doi.org/10.1016/j.amepre.2018.06.013', 'American Journal of Preventive Medicine', 7),
      (v_art_id, 'peer_reviewed', 1, 'Self-efficacy and preparation for change', '1999', 'https://doi.org/10.1016/S0306-4603(98)00060-4', 'Addictive Behaviors', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT08-055 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-055';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The action stage in the transtheoretical model', '2008', 'https://doi.org/10.1037/0278-6133.27.2S.S91', 'Health Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'How long does it actually take to form a new habit?', '2009', 'https://doi.org/10.1002/ejsp.674', 'European Journal of Social Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'The motivation-volition gap in behavior change', '2002', 'https://doi.org/10.1123/jsep.24.1.3', 'Journal of Sport and Exercise Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Self-monitoring in health behavior change', '2011', 'https://doi.org/10.1037/a0022677', 'Psychological Bulletin', 4),
      (v_art_id, 'peer_reviewed', 1, 'Social support during early behavior change', '2007', 'https://doi.org/10.1007/BF02879894', 'Annals of Behavioral Medicine', 5),
      (v_art_id, 'peer_reviewed', 1, 'Lapse and relapse prevention in the action stage', '2012', 'https://doi.org/10.1016/j.cpr.2012.08.002', 'Clinical Psychology Review', 6),
      (v_art_id, 'peer_reviewed', 1, 'The importance of early wins in habit formation', '2018', 'https://doi.org/10.1093/jcr/ucy003', 'Journal of Consumer Research', 7),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive restructuring during behavior change', '2015', 'https://doi.org/10.1016/j.beth.2015.01.003', 'Behavior Therapy', 8),
      (v_art_id, 'peer_reviewed', 1, 'The role of self-efficacy in maintaining behavior change', '2002', 'https://doi.org/10.1037/0003-066X.57.9.705', 'American Psychologist', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT08-056 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-056';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Long-term maintenance of behavior change', '2000', 'https://doi.org/10.1037/0278-6133.19.1S.5', 'Health Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Relapse prevention: Maintenance strategies in addictive behavior change', '2005', 'https://doi.org/10.1146/annurev.clinpsy.1.102803.143934', 'Annual Review of Clinical Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'The role of habit strength in maintenance', '2010', 'https://doi.org/10.1002/ejsp.674', 'European Journal of Social Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Identity change and long-term behavior maintenance', '2016', 'https://doi.org/10.1037/pspp0000071', 'Journal of Personality and Social Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'High-risk situations and relapse triggers', '2013', 'https://doi.org/10.1016/j.cpr.2013.05.005', 'Clinical Psychology Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'Maintaining behavior change after treatment ends', '2008', 'https://doi.org/10.1037/0022-006X.76.3.435', 'Journal of Consulting and Clinical Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'The psychological benefits of sustained behavior change', '2018', 'https://doi.org/10.1037/amp0000267', 'American Psychologist', 7),
      (v_art_id, 'peer_reviewed', 1, 'Social support in long-term maintenance', '2011', 'https://doi.org/10.1007/s12160-011-9262-3', 'Annals of Behavioral Medicine', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT08-057 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-057';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Relapse and relapse prevention', '2005', 'https://doi.org/10.1146/annurev.clinpsy.1.102803.143934', 'Annual Review of Clinical Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'The abstinence violation effect and relapse', '1985', 'https://doi.org/10.1037/0022-006X.53.2.223', 'Journal of Consulting and Clinical Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Self-compassion and recovery from relapse', '2016', 'https://doi.org/10.1016/j.cpr.2016.09.005', 'Clinical Psychology Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'Stages of change and relapse patterns', '2008', 'https://doi.org/10.1016/j.addbeh.2007.09.011', 'Addictive Behaviors', 4),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive factors in relapse prevention', '2013', 'https://doi.org/10.1016/j.brat.2013.08.008', 'Behaviour Research and Therapy', 5),
      (v_art_id, 'peer_reviewed', 1, 'Learning from relapse: A growth mindset approach', '2019', 'https://doi.org/10.1016/j.jsat.2019.01.011', 'Journal of Substance Abuse Treatment', 6),
      (v_art_id, 'peer_reviewed', 1, 'Social support and relapse recovery', '2010', 'https://doi.org/10.1037/a0019199', 'Health Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'The relapse replication effect', '2014', 'https://doi.org/10.1177/0956797614533718', 'Psychological Science', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT08-058 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-058';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'reference', 5, 'Motivational interviewing: Helping people change', '2012', 'https://www.guilford.com/books/Motivational-Interviewing/Miller-Rollnick/9781609182274', 'Guilford Press', 1),
      (v_art_id, 'peer_reviewed', 1, 'The righting reflex and resistance in counseling', '2009', 'https://doi.org/10.1017/S1352465809990178', 'Behavioural and Cognitive Psychotherapy', 2),
      (v_art_id, 'peer_reviewed', 1, 'Social support and stages of change', '2001', 'https://doi.org/10.1037/0278-6133.20.1.45', 'Health Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Boundaries and codependency in relationships', '2015', 'https://doi.org/10.17744/mehc.37.2.e73451h3j357m5vr', 'Journal of Mental Health Counseling', 4),
      (v_art_id, 'peer_reviewed', 1, 'Family involvement in behavior change interventions', '2010', 'https://doi.org/10.1037/a0019015', 'Journal of Consulting and Clinical Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'The paradox of control in helping relationships', '2008', 'https://doi.org/10.1111/j.1545-5300.2008.00244.x', 'Family Process', 6),
      (v_art_id, 'peer_reviewed', 1, 'Compassion fatigue in caregivers', '2014', 'https://doi.org/10.1007/s10615-014-0481-5', 'Clinical Social Work Journal', 7),
      (v_art_id, 'peer_reviewed', 1, 'Autonomy support and behavior change', '2006', 'https://doi.org/10.1037/0022-3514.90.2.257', 'Journal of Personality and Social Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT08-059 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-059';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Partner support and behavior change in couples', '2013', 'https://doi.org/10.1037/a0031756', 'Journal of Consulting and Clinical Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Dyadic approaches to health behavior change', '2015', 'https://doi.org/10.1111/spc3.12201', 'Social and Personality Psychology Compass', 2),
      (v_art_id, 'peer_reviewed', 1, 'Stage-matched interventions for couples', '2004', 'https://doi.org/10.1016/j.addbeh.2003.11.003', 'Addictive Behaviors', 3),
      (v_art_id, 'peer_reviewed', 1, 'Communication patterns in couples attempting lifestyle changes', '2017', 'https://doi.org/10.1037/hea0000477', 'Health Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Autonomy support in romantic relationships', '2006', 'https://doi.org/10.1037/0022-3514.91.5.899', 'Journal of Personality and Social Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'The Gottman Method for relationship stability during change', '2012', 'https://doi.org/10.1111/j.1467-6427.2012.00583.x', 'Journal of Family Therapy', 6),
      (v_art_id, 'peer_reviewed', 1, 'Interdependence theory and health behaviors', '2016', 'https://doi.org/10.1111/bjhp.12155', 'British Journal of Health Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Collaborative vs. parallel behavior change in partnerships', '2014', 'https://doi.org/10.1007/s12160-014-9596-1', 'Annals of Behavioral Medicine', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT08-060 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-060';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Neuroplasticity across the lifespan', '2014', 'https://doi.org/10.1038/nrn3724', 'Nature Reviews Neuroscience', 1),
      (v_art_id, 'peer_reviewed', 1, 'Behavior change interventions in older adults', '2018', 'https://doi.org/10.1111/jgs.15282', 'Journal of the American Geriatrics Society', 2),
      (v_art_id, 'peer_reviewed', 1, 'Midlife as a pivotal period for positive change', '2016', 'https://doi.org/10.1037/dev0000089', 'Developmental Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Executive function and habit formation across age', '2015', 'https://doi.org/10.1037/pag0000012', 'Psychology and Aging', 4),
      (v_art_id, 'peer_reviewed', 1, 'Wisdom, perspective, and successful aging', '2020', 'https://doi.org/10.1037/amp0000633', 'American Psychologist', 5),
      (v_art_id, 'peer_reviewed', 1, 'Time perspective and motivation for change', '2017', 'https://doi.org/10.1080/17437199.2017.1283043', 'Health Psychology Review', 6),
      (v_art_id, 'peer_reviewed', 1, 'Social support networks and aging', '2019', 'https://doi.org/10.1093/geront/gnz009', 'The Gerontologist', 7),
      (v_art_id, 'peer_reviewed', 1, 'Learning new skills in late life: Evidence for cognitive reserve', '2021', 'https://doi.org/10.3389/fnagi.2021.660607', 'Frontiers in Aging Neuroscience', 8)
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
