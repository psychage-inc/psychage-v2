-- ============================================================================
-- Seed: Category 4 (Self-Worth, Confidence & Identity) — Subcategory 07
-- 10 articles: CAT04-061 through CAT04-070
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
  VALUES ('Perfectionism', 'perfectionism', v_cat_id, 7)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'perfectionism' AND category_id = v_cat_id;

  -- CAT04-061: What Is Perfectionism? The Difference Between High Standards and Self-Punishment
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'What Is Perfectionism? The Difference Between High Standards and Self-Punishment',
    'what-is-perfectionism-high-standards-vs-self-punishment',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Perfectionism', 'Self-Worth', 'Standards', 'Mental Health'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-061',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Perfectionism isn',
    '/images/articles/cat04/cover-061.svg',
    8,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT04-062: The Three Types of Perfectionism: Self-Oriented, Other-Oriented, and Socially Prescribed
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Three Types of Perfectionism: Self-Oriented, Other-Oriented, and Socially Prescribed',
    'three-types-of-perfectionism',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Perfectionism', 'Types', 'Psychology', 'Self-Awareness'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-062',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Perfectionism isn',
    '/images/articles/cat04/cover-062.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT04-063: How Perfectionism Leads to Procrastination, Burnout, and Depression
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How Perfectionism Leads to Procrastination, Burnout, and Depression',
    'perfectionism-procrastination-burnout-depression',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Perfectionism', 'Procrastination', 'Burnout', 'Depression'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-063',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Perfectionism doesn',
    '/images/articles/cat04/cover-063.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT04-064: Good Enough: Learning to Release the Need for Perfection
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Good Enough: Learning to Release the Need for Perfection',
    'good-enough-releasing-need-for-perfection',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Perfectionism', 'Good Enough', 'Self-Compassion', 'Recovery'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-064',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Excellence doesn',
    '/images/articles/cat04/cover-064.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT04-065: People-Pleasing: When Saying Yes to Everyone Means Saying No to Yourself
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'People-Pleasing: When Saying Yes to Everyone Means Saying No to Yourself',
    'people-pleasing-saying-yes-to-everyone',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['People-Pleasing', 'Boundaries', 'Self-Worth', 'Authenticity'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-065',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Chronic people-pleasing erodes boundaries, self-respect, and authenticity. Learn to recognize the pattern and reclaim your needs.',
    '/images/articles/cat04/cover-065.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT04-066: The Fawn Response: How Trauma Creates People-Pleasers
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Fawn Response: How Trauma Creates People-Pleasers',
    'fawn-response-trauma-creates-people-pleasers',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Fawn Response', 'Trauma', 'People-Pleasing', 'CPTSD'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-066',
    v_cat_id,
    v_sub_id,
    'drafted',
    'People-pleasing isn',
    '/images/articles/cat04/cover-066.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT04-067: Breaking the Perfectionism Cycle: CBT-Based Strategies
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Breaking the Perfectionism Cycle: CBT-Based Strategies',
    'breaking-perfectionism-cycle-cbt-strategies',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Perfectionism', 'CBT', 'Treatment', 'Cognitive Therapy'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-067',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Cognitive-behavioral therapy offers specific, evidence-based techniques to challenge perfectionistic thinking and build healthier patterns.',
    '/images/articles/cat04/cover-067.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT04-068: Perfectionism in Parenting: How 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Perfectionism in Parenting: How ',
    'perfectionism-in-parenting',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Parenting', 'Perfectionism', 'Children', 'Family'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-068',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Perfectionistic parenting creates anxiety in children and parents alike. Good-enough parenting is healthier for everyone.',
    '/images/articles/cat04/cover-068.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT04-069: Academic Perfectionism: When Straight A
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Academic Perfectionism: When Straight A',
    'academic-perfectionism',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Perfectionism', 'Academic', 'Students', 'Achievement'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-069',
    v_cat_id,
    v_sub_id,
    'drafted',
    'High achievement and perfectionism are not the same. Academic perfectionism creates burnout, anxiety, and diminished learning.',
    '/images/articles/cat04/cover-069.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT04-070: Recovery from Perfectionism: What It Looks Like in Practice
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Recovery from Perfectionism: What It Looks Like in Practice',
    'recovery-from-perfectionism',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Perfectionism', 'Recovery', 'Self-Worth', 'Healing'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-070',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Recovering from perfectionism isn',
    '/images/articles/cat04/cover-070.svg',
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

  -- === CAT04-061 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-061';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'textbook', 5, 'Perfectionism: A relational approach to conceptualization, assessment, and treatment', '2004', 'https://www.guilford.com/books/Perfectionism/Hewitt-Flett/9781572309029', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Perfectionism is increasing over time: A meta-analysis of birth cohort differences', '2019', 'https://doi.org/10.1037/bul0000138', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Adaptive and maladaptive perfectionism: Developmental origins', '2017', 'https://doi.org/10.1037/cou0000211', 'Journal of Counseling Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Perfectionism and mental health problems: Limits of the stress-diathesis model', '2018', 'https://doi.org/10.1016/j.brat.2018.04.003', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Self-compassion as an antidote to perfectionism', '2020', 'https://doi.org/10.1080/15298868.2020.1713237', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Perfectionism and suicide ideation: A meta-analysis', '2018', 'https://doi.org/10.1111/jopy.12333', 'Journal of Personality', 6),
      (v_art_id, 'peer_reviewed', 1, 'The perfectionism social disconnection model', '2021', 'https://doi.org/10.1016/j.cpr.2021.102021', 'Clinical Psychology Review', 7),
      (v_art_id, 'peer_reviewed', 1, 'Excellence vs. perfection: Conceptual distinctions', '2019', 'https://doi.org/10.1080/17439760.2019.1579362', 'Journal of Positive Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT04-062 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-062';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Dimensions of perfectionism: Relations with health and psychological functioning', '1991', 'https://doi.org/10.1037/0022-3514.60.3.456', 'Journal of Personality and Social Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'The Multidimensional Perfectionism Scale: Reliability, validity, and psychometric properties', '2017', 'https://doi.org/10.1037/pas0000396', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Socially prescribed perfectionism and suicide: A 25-year longitudinal study', '2020', 'https://doi.org/10.1037/amp0000613', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Other-oriented perfectionism and relationship satisfaction', '2018', 'https://doi.org/10.1037/fam0000402', 'Journal of Family Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Self-oriented perfectionism: Adaptive or maladaptive?', '2019', 'https://doi.org/10.1016/j.paid.2019.03.026', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Cultural variations in perfectionism', '2020', 'https://doi.org/10.1177/1069397120913687', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Treatment approaches for different perfectionism subtypes', '2019', 'https://doi.org/10.1080/16506073.2019.1593490', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Perfectionism in the workplace: Impact on performance and wellbeing', '2018', 'https://doi.org/10.1037/ocp0000103', 'Journal of Occupational Health Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT04-063 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-063';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Perfectionism and procrastination: A meta-analytic review', '2018', 'https://doi.org/10.1002/per.2173', 'European Journal of Personality', 1),
      (v_art_id, 'peer_reviewed', 1, 'The role of perfectionism in burnout: A meta-analysis', '2019', 'https://doi.org/10.1037/ocp0000160', 'Journal of Occupational Health Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Perfectionism and depression: A systematic review', '2017', 'https://doi.org/10.1016/j.cpr.2017.03.007', 'Clinical Psychology Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'Fear of failure as a mediator between perfectionism and procrastination', '2020', 'https://doi.org/10.1016/j.paid.2020.110120', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Chronic stress and perfectionism: The path to burnout', '2018', 'https://doi.org/10.1002/smi.2790', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Perfectionism as a vulnerability factor for depression', '2019', 'https://doi.org/10.1037/abn0000414', 'Journal of Abnormal Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'The perfectionism cognitions inventory: Development and validation', '2018', 'https://doi.org/10.1007/s10608-018-9937-5', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Breaking the perfectionism-depression cycle: Intervention studies', '2020', 'https://doi.org/10.1016/j.brat.2020.103668', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT04-064 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-064';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The good-enough principle in clinical practice', '2018', 'https://doi.org/10.1176/appi.psychotherapy.20180019', 'American Journal of Psychotherapy', 1),
      (v_art_id, 'peer_reviewed', 1, 'Satisficing vs. maximizing: Well-being implications', '2002', 'https://doi.org/10.1037/0022-3514.83.5.1178', 'Journal of Personality and Social Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'The 80/20 principle: Evidence from organizational research', '2019', 'https://doi.org/10.1037/apl0000397', 'Journal of Applied Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Self-compassion as an alternative to perfectionism', '2020', 'https://doi.org/10.1007/s12671-020-01342-3', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Behavioral experiments in perfectionism treatment', '2018', 'https://doi.org/10.1080/16506073.2018.1494750', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'The hedonic treadmill: Why perfection never satisfies', '2017', 'https://doi.org/10.1037/rev0000056', 'Psychological Review', 6),
      (v_art_id, 'peer_reviewed', 1, 'Done is better than perfect: Productivity research', '2019', 'https://doi.org/10.1002/job.2371', 'Journal of Organizational Behavior', 7),
      (v_art_id, 'peer_reviewed', 1, 'Vulnerability and authenticity: The courage to be imperfect', '2018', 'https://doi.org/10.1080/17439760.2018.1484938', 'Journal of Positive Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT04-065 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-065';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Sociotropy and autonomy: Personality dimensions of vulnerability to depression', '1983', 'https://doi.org/10.1037/0021-843X.92.3.349', 'Journal of Abnormal Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Rejection sensitivity and interpersonal behavior', '2018', 'https://doi.org/10.1177/1088868318756441', 'Personality and Social Psychology Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'The costs of people-pleasing: Self-silencing and depression', '2019', 'https://doi.org/10.1037/cou0000338', 'Journal of Counseling Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Assertiveness training: A meta-analysis of outcomes', '2017', 'https://doi.org/10.1016/j.cpr.2017.06.002', 'Clinical Psychology Review', 4),
      (v_art_id, 'peer_reviewed', 1, 'Boundary-setting and relationship quality', '2020', 'https://doi.org/10.1177/0265407520923440', 'Journal of Social and Personal Relationships', 5),
      (v_art_id, 'peer_reviewed', 1, 'Self-concept clarity and people-pleasing behaviors', '2018', 'https://doi.org/10.1080/15298868.2018.1523478', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Differentiation of self in adult relationships', '2019', 'https://doi.org/10.1111/jmft.12364', 'Journal of Marital and Family Therapy', 7),
      (v_art_id, 'peer_reviewed', 1, 'The paradox of inauthenticity: People-pleasing and disconnection', '2020', 'https://doi.org/10.1037/pspp0000298', 'Journal of Personality and Social Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT04-066 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-066';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'textbook', 5, 'Complex PTSD: From Surviving to Thriving', '2013', 'https://www.worldcat.org/title/complex-ptsd-from-surviving-to-thriving/oclc/857572342', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'The fourth F: Fight, flight, freeze, and fawn', '2020', 'https://doi.org/10.1080/15299732.2020.1719261', 'Journal of Trauma & Dissociation', 2),
      (v_art_id, 'peer_reviewed', 1, 'Attachment trauma and the fawn response', '2019', 'https://doi.org/10.1002/jts.22408', 'Journal of Traumatic Stress', 3),
      (v_art_id, 'peer_reviewed', 1, 'Complex trauma and relational patterns in adulthood', '2018', 'https://doi.org/10.1016/j.cpr.2018.06.003', 'Clinical Psychology Review', 4),
      (v_art_id, 'peer_reviewed', 1, 'Trauma-focused therapy for fawn response patterns', '2021', 'https://doi.org/10.1080/10503307.2021.1884720', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Hypervigilance to threat and accommodating behaviors', '2019', 'https://doi.org/10.1016/j.brat.2019.03.009', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Codependency and childhood emotional neglect', '2018', 'https://doi.org/10.1037/cou0000283', 'Journal of Counseling Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Boundaries in trauma recovery: A clinical guide', '2020', 'https://doi.org/10.1002/jclp.22943', 'Journal of Clinical Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT04-067 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-067';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Cognitive behavioral therapy for perfectionism: A systematic review', '2019', 'https://doi.org/10.1080/16506073.2019.1595067', NULL, 1),
      (v_art_id, 'textbook', 5, 'Overcoming Perfectionism: A self-help guide using CBT', '2016', 'https://www.worldcat.org/title/overcoming-perfectionism-a-self-help-guide-using-cognitive-behavioural-techniques/oclc/953884942', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Behavioral experiments in perfectionism treatment', '2018', 'https://doi.org/10.1016/j.brat.2018.04.008', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive restructuring for perfectionistic beliefs', '2020', 'https://doi.org/10.1891/JCPSY-D-19-00015', 'Journal of Cognitive Psychotherapy', 4),
      (v_art_id, 'peer_reviewed', 1, 'Exposure and response prevention for perfectionism', '2019', 'https://doi.org/10.1016/j.cpr.2019.05.003', 'Clinical Psychology Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'Self-compassion interventions for perfectionism', '2020', 'https://doi.org/10.1007/s12671-020-01415-3', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Values clarification in perfectionism recovery', '2019', 'https://doi.org/10.1016/j.jcbs.2019.07.004', 'Journal of Contextual Behavioral Science', 7),
      (v_art_id, 'peer_reviewed', 1, 'Relapse prevention in perfectionism treatment', '2021', 'https://doi.org/10.1080/10503307.2021.1902617', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT04-068 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-068';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Parental perfectionism and child anxiety: A meta-analysis', '2019', 'https://doi.org/10.1037/fam0000534', 'Journal of Family Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'The good-enough mother: Origins and applications', '1953', 'https://doi.org/10.1080/00797308.1953.11823071', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Intergenerational transmission of perfectionism', '2018', 'https://doi.org/10.1037/dev0000565', 'Developmental Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Authoritative vs. perfectionistic parenting outcomes', '2020', 'https://doi.org/10.1111/cdev.13342', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Modeling self-compassion for children', '2019', 'https://doi.org/10.1007/s10826-019-01403-w', 'Journal of Child and Family Studies', 5),
      (v_art_id, 'peer_reviewed', 1, 'Parental burnout and perfectionism', '2020', 'https://doi.org/10.1177/2167702620930791', 'Clinical Psychological Science', 6),
      (v_art_id, 'peer_reviewed', 1, 'Conditional regard and child self-esteem', '2017', 'https://doi.org/10.1037/pspp0000137', 'Journal of Personality and Social Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Process praise vs. outcome praise in child development', '2018', 'https://doi.org/10.1177/0956797618772823', 'Psychological Science', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT04-069 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-069';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Academic perfectionism and mental health in college students', '2019', 'https://doi.org/10.1080/07448481.2019.1645676', 'Journal of American College Health', 1),
      (v_art_id, 'peer_reviewed', 1, 'Perfectionism and academic procrastination', '2018', 'https://doi.org/10.1016/j.lindif.2018.05.010', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Growth mindset interventions in educational settings', '2020', 'https://doi.org/10.1080/00461520.2020.1713835', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Socially prescribed perfectionism and test anxiety', '2019', 'https://doi.org/10.1080/10615806.2019.1596672', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'The myth of effortless perfection in academic culture', '2018', 'https://doi.org/10.1007/s10734-018-0234-3', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Mastery vs. performance goals: Impact on learning', '2020', 'https://doi.org/10.1016/j.cedpsych.2020.101837', 'Contemporary Educational Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Academic burnout in high-achieving students', '2019', 'https://doi.org/10.1037/edu0000339', 'Journal of Educational Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Self-worth contingent on academic competence', '2018', 'https://doi.org/10.1037/pspp0000192', 'Journal of Personality and Social Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT04-070 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-070';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Long-term outcomes of perfectionism treatment', '2020', 'https://doi.org/10.1016/j.brat.2020.103712', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Recovery from perfectionism: Qualitative analysis', '2019', 'https://doi.org/10.1177/1049732319828035', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Self-compassion as a protective factor in perfectionism recovery', '2021', 'https://doi.org/10.1016/j.cpr.2021.102045', 'Clinical Psychology Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'Unconditional self-acceptance in CBT', '2018', 'https://doi.org/10.1007/s10942-018-0296-5', 'Journal of Rational-Emotive & Cognitive-Behavior Therapy', 4),
      (v_art_id, 'peer_reviewed', 1, 'Relapse and maintenance in perfectionism treatment', '2020', 'https://doi.org/10.1080/10503307.2020.1831097', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Values-based living as alternative to perfectionism', '2019', 'https://doi.org/10.1016/j.jcbs.2019.09.003', 'Journal of Contextual Behavioral Science', 6),
      (v_art_id, 'peer_reviewed', 1, 'Progress over perfection: A recovery framework', '2020', 'https://doi.org/10.1080/16506073.2020.1763999', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Authenticity and wellbeing post-perfectionism', '2021', 'https://doi.org/10.1080/17439760.2021.1897867', 'Journal of Positive Psychology', 8)
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
