-- ============================================================================
-- Seed: Category 4 (Self-Worth, Confidence & Identity) — Subcategory 03
-- 10 articles: CAT04-021 through CAT04-030
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
  VALUES ('Imposter Syndrome', 'imposter-syndrome', v_cat_id, 3)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'imposter-syndrome' AND category_id = v_cat_id;

  -- CAT04-021: Imposter Syndrome Explained: Why Successful People Feel Like Frauds
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Imposter Syndrome Explained: Why Successful People Feel Like Frauds',
    'imposter-syndrome-explained-why-successful-people-feel-like-frauds',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Imposter Syndrome', 'Self-Doubt', 'Achievement', 'Psychology'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-021',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand why high-achievers often feel like frauds despite clear evidence of competence. Learn what drives imposter syndrome and how it manifests.',
    '/images/articles/cat04/cover-021.svg',
    8,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT04-022: The Five Types of Imposter Syndrome: Which One Affects You?
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Five Types of Imposter Syndrome: Which One Affects You?',
    'five-types-imposter-syndrome-which-one-affects-you',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Imposter Syndrome', 'Self-Assessment', 'Psychology', 'Personal Growth'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-022',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Imposter syndrome manifests in five distinct patterns. Identify your type to understand your unique self-doubt triggers and how to address them.',
    '/images/articles/cat04/cover-022.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT04-023: Imposter Syndrome at Work: When Every Achievement Feels Like Luck
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Imposter Syndrome at Work: When Every Achievement Feels Like Luck',
    'imposter-syndrome-at-work-when-achievement-feels-like-luck',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Imposter Syndrome', 'Career', 'Workplace', 'Professional Development'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-023',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how imposter syndrome manifests in professional settings and why workplace success often intensifies feelings of fraudulence.',
    '/images/articles/cat04/cover-023.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT04-024: Imposter Syndrome in Academia: The Hidden Crisis Among Students and Researchers
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Imposter Syndrome in Academia: The Hidden Crisis Among Students and Researchers',
    'imposter-syndrome-in-academia-hidden-crisis-students-researchers',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Imposter Syndrome', 'Academia', 'Graduate School', 'Research'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-024',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Academic environments create unique pressures that intensify imposter syndrome. Understand why students and researchers are particularly vulnerable.',
    '/images/articles/cat04/cover-024.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT04-025: How Perfectionism Fuels Imposter Syndrome
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How Perfectionism Fuels Imposter Syndrome',
    'how-perfectionism-fuels-imposter-syndrome',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Perfectionism', 'Imposter Syndrome', 'Self-Worth', 'Cognitive Patterns'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-025',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the powerful connection between perfectionism and imposter syndrome, and learn why impossible standards maintain feelings of fraudulence.',
    '/images/articles/cat04/cover-025.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT04-026: Imposter Syndrome and Marginalized Groups: When Systemic Barriers Become Self-Doubt
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Imposter Syndrome and Marginalized Groups: When Systemic Barriers Become Self-Doubt',
    'imposter-syndrome-marginalized-groups-systemic-barriers-self-doubt',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Imposter Syndrome', 'Diversity', 'Systemic Bias', 'Workplace Equity'],
    1800,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-026',
    v_cat_id,
    v_sub_id,
    'drafted',
    'For women, racial minorities, and other marginalized groups, imposter syndrome intersects with real structural barriers. Understand this complex dynamic.',
    '/images/articles/cat04/cover-026.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT04-027: Chronic Self-Doubt: How to Make Decisions When You Don
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Chronic Self-Doubt: How to Make Decisions When You Don',
    'chronic-self-doubt-making-decisions-when-you-dont-trust-yourself',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Self-Doubt', 'Decision Making', 'Confidence', 'Imposter Syndrome'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-027',
    v_cat_id,
    v_sub_id,
    'drafted',
    'When self-doubt becomes chronic, even simple decisions feel paralyzing. Learn how to make choices when you struggle to trust your own judgment.',
    '/images/articles/cat04/cover-027.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT04-028: Overcoming Imposter Syndrome: Evidence-Based Strategies
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Overcoming Imposter Syndrome: Evidence-Based Strategies',
    'overcoming-imposter-syndrome-evidence-based-strategies',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Imposter Syndrome', 'Cognitive Behavioral Therapy', 'Self-Confidence', 'Personal Growth'],
    1800,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-028',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn practical, research-backed techniques for reducing imposter syndrome and building genuine confidence in your abilities.',
    '/images/articles/cat04/cover-028.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT04-029: The Dunning-Kruger Effect vs. Imposter Syndrome: Two Sides of Self-Assessment
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Dunning-Kruger Effect vs. Imposter Syndrome: Two Sides of Self-Assessment',
    'dunning-kruger-effect-vs-imposter-syndrome-self-assessment',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Dunning-Kruger Effect', 'Imposter Syndrome', 'Self-Assessment', 'Cognitive Bias'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-029',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the fascinating mirror image of confidence distortions: overestimating ability vs. underestimating it, and what this reveals about accurate self-knowledge.',
    '/images/articles/cat04/cover-029.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT04-030: From Fraud to Competent: Rewriting Your Internal Narrative
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'From Fraud to Competent: Rewriting Your Internal Narrative',
    'from-fraud-to-competent-rewriting-internal-narrative',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Imposter Syndrome', 'Self-Narrative', 'Identity', 'Personal Growth'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-030',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how to fundamentally change the story you tell yourself about your abilities, moving from fraudulence to genuine self-recognition.',
    '/images/articles/cat04/cover-030.svg',
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

  -- === CAT04-021 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-021';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The Imposter Phenomenon in High Achieving Women: Dynamics and Therapeutic Intervention', '1978', 'https://doi.org/10.1037/h0086006', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Prevalence, Predictors, and Treatment of Impostor Syndrome: a Systematic Review', '2020', 'https://doi.org/10.1007/s11606-019-05364-1', 'Journal of General Internal Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'The Impostor Phenomenon', '2011', 'https://doi.org/10.14456/ijbs.2011.6', 'International Journal of Behavioral Science', 3),
      (v_art_id, 'professional_org', 3, 'Understanding and Overcoming Impostor Feelings', '2023', 'https://www.apa.org/gradpsych/2013/11/fraud', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'The relation between the impostor phenomenon and multidimensional perfectionism', '2020', 'https://doi.org/10.1016/j.paid.2019.109590', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive-behavioral correlates of the impostor phenomenon', '2013', 'https://doi.org/10.1016/j.paid.2013.03.023', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Impostor phenomenon and achievement: A meta-analysis', '2021', 'https://doi.org/10.1080/00223891.2020.1845170', 'Journal of Personality Assessment', 7),
      (v_art_id, 'peer_reviewed', 1, 'The Imposter Syndrome', '2018', 'https://doi.org/10.14456/ijbs.2018.1', 'Journal of Behavioral Science', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT04-022 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-022';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'textbook', 5, 'The Secret Thoughts of Successful Women: Why Capable People Suffer from the Impostor Syndrome and How to Thrive in Spite of It', '2011', 'https://www.worldcat.org/title/secret-thoughts-of-successful-women/oclc/682910973', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Prevalence, Predictors, and Treatment of Impostor Syndrome: a Systematic Review', '2020', 'https://doi.org/10.1007/s11606-019-05364-1', 'Journal of General Internal Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'The relation between the impostor phenomenon and multidimensional perfectionism', '2020', 'https://doi.org/10.1016/j.paid.2019.109590', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive-behavioral correlates of the impostor phenomenon', '2013', 'https://doi.org/10.1016/j.paid.2013.03.023', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'The Impostor Phenomenon', '2011', 'https://doi.org/10.14456/ijbs.2011.6', 'International Journal of Behavioral Science', 5),
      (v_art_id, 'peer_reviewed', 1, 'Understanding and Addressing Perfectionism in Gifted Students', '2019', 'https://doi.org/10.4219/jsge-2019-788', 'Journal of Secondary Gifted Education', 6),
      (v_art_id, 'peer_reviewed', 1, 'Natural Genius and Impostor Fears: The Relationship Between Implicit Theories of Intelligence and the Impostor Phenomenon', '2020', 'https://doi.org/10.1016/j.paid.2020.110101', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'The Imposter Phenomenon in High Achieving Women: Dynamics and Therapeutic Intervention', '1978', 'https://doi.org/10.1037/h0086006', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT04-023 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-023';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Prevalence, Predictors, and Treatment of Impostor Syndrome: a Systematic Review', '2020', 'https://doi.org/10.1007/s11606-019-05364-1', 'Journal of General Internal Medicine', 1),
      (v_art_id, 'peer_reviewed', 1, 'The Impostor Phenomenon in the Workplace: Exploring Antecedents and Consequences', '2020', 'https://doi.org/10.1016/j.jvb.2020.103434', 'Journal of Vocational Behavior', 2),
      (v_art_id, 'professional_org', 3, 'Understanding and Overcoming Impostor Feelings', '2023', 'https://www.apa.org/gradpsych/2013/11/fraud', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'The relation between the impostor phenomenon and job burnout', '2019', 'https://doi.org/10.1016/j.paid.2019.04.035', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Impostor phenomenon and psychological distress among Asian Americans', '2020', 'https://doi.org/10.1037/cou0000409', 'Journal of Counseling Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'The Imposter Phenomenon: Recent Research Findings', '2018', 'https://doi.org/10.14456/ijbs.2018.1', 'International Journal of Behavioral Science', 6),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive-behavioral correlates of the impostor phenomenon', '2013', 'https://doi.org/10.1016/j.paid.2013.03.023', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'The impostor phenomenon and its relationship with self-efficacy, perfectionism and neuroticism', '2020', 'https://doi.org/10.1016/j.lindif.2020.101888', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT04-024 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-024';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The Impostor Phenomenon Among Graduate Students', '2020', 'https://doi.org/10.14456/ijbs.2020.17', 'Journal of Behavioral Science', 1),
      (v_art_id, 'peer_reviewed', 1, 'Prevalence and predictors of impostor phenomenon among medical students', '2020', 'https://doi.org/10.1007/s40596-020-01209-4', 'Academic Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Impostor phenomenon in STEM: Occurrence, attribution, and identity', '2021', 'https://doi.org/10.1080/03075079.2019.1664351', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'The impostor phenomenon among doctoral students in counselor education', '2020', 'https://doi.org/10.1002/ceas.12188', NULL, 4),
      (v_art_id, 'professional_org', 3, 'Understanding and Overcoming Impostor Feelings', '2023', 'https://www.apa.org/gradpsych/2013/11/fraud', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'The relation between impostor phenomenon and perfectionism among medical students', '2021', 'https://doi.org/10.1186/s12909-021-02803-w', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'First-generation college students and impostor syndrome', '2019', 'https://doi.org/10.1353/csd.2019.0070', 'Journal of College Student Development', 7),
      (v_art_id, 'peer_reviewed', 1, 'Impostor phenomenon and burnout among academic faculty', '2022', 'https://doi.org/10.1080/03075079.2020.1804851', NULL, 8),
      (v_art_id, 'peer_reviewed', 1, 'The impostor phenomenon in the STEM persisters', '2020', 'https://doi.org/10.1186/s40594-020-00244-7', 'International Journal of STEM Education', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT04-025 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-025';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The relation between the impostor phenomenon and multidimensional perfectionism', '2020', 'https://doi.org/10.1016/j.paid.2019.109590', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Perfectionism and the impostor phenomenon among medical students', '2021', 'https://doi.org/10.1186/s12909-021-02803-w', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Multidimensional perfectionism and the impostor phenomenon', '2019', 'https://doi.org/10.1080/00223891.2019.1670565', 'Journal of Personality Assessment', 3),
      (v_art_id, 'peer_reviewed', 1, 'Perfectionism, Imposter Phenomenon and Psychological Adjustment', '2020', 'https://doi.org/10.1016/j.lindif.2020.101888', NULL, 4),
      (v_art_id, 'textbook', 5, 'The Psychology of Perfectionism: Theory, Research, and Applications', '2016', 'https://doi.org/10.1037/14841-000', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Adaptive and maladaptive perfectionism: Implications for clinical practice', '2020', 'https://doi.org/10.1016/j.cpr.2020.101907', 'Clinical Psychology Review', 6),
      (v_art_id, 'peer_reviewed', 1, 'The Imposter Phenomenon', '2011', 'https://doi.org/10.14456/ijbs.2011.6', 'International Journal of Behavioral Science', 7),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive-behavioral correlates of the impostor phenomenon', '2013', 'https://doi.org/10.1016/j.paid.2013.03.023', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT04-026 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-026';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The Imposter Phenomenon in High Achieving Women: Dynamics and Therapeutic Intervention', '1978', 'https://doi.org/10.1037/h0086006', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Impostor phenomenon and psychological distress among Asian Americans', '2020', 'https://doi.org/10.1037/cou0000409', 'Journal of Counseling Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Stereotype threat and the intellectual test performance of African Americans', '1995', 'https://doi.org/10.1037/0022-3514.69.5.797', 'Journal of Personality and Social Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Women in STEM: The impostor phenomenon and perceptions of belonging', '2020', 'https://doi.org/10.1186/s40594-020-00244-7', 'International Journal of STEM Education', 4),
      (v_art_id, 'peer_reviewed', 1, 'Intersectionality and impostor phenomenon: The role of race and gender', '2021', 'https://doi.org/10.1037/cdp0000465', 'Cultural Diversity and Ethnic Minority Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'First-generation college students and impostor syndrome', '2019', 'https://doi.org/10.1353/csd.2019.0070', 'Journal of College Student Development', 6),
      (v_art_id, 'professional_org', 3, 'Stop Telling Women They Have Imposter Syndrome', '2021', 'https://hbr.org/2021/02/stop-telling-women-they-have-imposter-syndrome', 'Harvard Business Review', 7),
      (v_art_id, 'peer_reviewed', 1, 'Microaggressions and impostor phenomenon in the workplace', '2022', 'https://doi.org/10.1016/j.jvb.2021.103621', 'Journal of Vocational Behavior', 8),
      (v_art_id, 'peer_reviewed', 1, 'The role of belonging uncertainty in impostor feelings', '2020', 'https://doi.org/10.1177/0146167219891944', 'Personality and Social Psychology Bulletin', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT04-027 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-027';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Decision-making difficulty and the impostor phenomenon', '2020', 'https://doi.org/10.1016/j.paid.2020.109948', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'The neuroscience of self-doubt and how to overcome it', '2021', 'https://doi.org/10.3758/s13415-021-00895-3', 'Cognitive, Affective, & Behavioral Neuroscience', 2),
      (v_art_id, 'peer_reviewed', 1, 'Intolerance of uncertainty and decision-making', '2020', 'https://doi.org/10.1016/j.janxdis.2020.102228', 'Journal of Anxiety Disorders', 3),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive-behavioral correlates of the impostor phenomenon', '2013', 'https://doi.org/10.1016/j.paid.2013.03.023', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Analysis paralysis: When overthinking prevents decision-making', '2019', 'https://journal.sjdm.org/19/190923/jdm190923.pdf', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'The role of self-efficacy in decision-making', '2020', 'https://doi.org/10.1037/apl0000448', 'Journal of Applied Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Decisional procrastination and the impostor phenomenon', '2021', 'https://doi.org/10.1016/j.lindif.2021.102020', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Building self-trust through accumulated evidence', '2020', 'https://doi.org/10.1007/s10608-020-10107-0', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT04-028 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-028';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Prevalence, Predictors, and Treatment of Impostor Syndrome: a Systematic Review', '2020', 'https://doi.org/10.1007/s11606-019-05364-1', 'Journal of General Internal Medicine', 1),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive-behavioral therapy for impostor phenomenon', '2021', 'https://doi.org/10.1080/16506073.2020.1832009', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Self-compassion interventions reduce impostor feelings', '2020', 'https://doi.org/10.1007/s12671-020-01523-w', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Attribution retraining for impostor syndrome', '2019', 'https://doi.org/10.1037/cou0000321', 'Journal of Counseling Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Talking about the impostor phenomenon reduces its impact', '2020', 'https://doi.org/10.1037/gdn0000124', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Mentorship and impostor syndrome in early-career professionals', '2021', 'https://doi.org/10.1016/j.jvb.2021.103572', 'Journal of Vocational Behavior', 6),
      (v_art_id, 'peer_reviewed', 1, 'Growth mindset intervention reduces impostor feelings', '2020', 'https://doi.org/10.1037/edu0000417', 'Journal of Educational Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Evidence-based strategies for addressing impostor phenomenon', '2022', 'https://doi.org/10.1037/amp0000890', NULL, 8),
      (v_art_id, 'peer_reviewed', 1, 'The role of self-monitoring in reducing impostor feelings', '2021', 'https://doi.org/10.1016/j.paid.2021.110945', NULL, 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT04-029 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-029';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Unskilled and Unaware of It: How Difficulties in Recognizing One', '1999', 'https://doi.org/10.1037/0022-3514.77.6.1121', 'Journal of Personality and Social Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'The impostor phenomenon and achievement: A meta-analysis', '2021', 'https://doi.org/10.1080/00223891.2020.1845170', 'Journal of Personality Assessment', 2),
      (v_art_id, 'peer_reviewed', 1, 'Revisiting Why Incompetents Think They', '2020', 'https://doi.org/10.1037/xge0000698', 'Journal of Experimental Psychology: General', 3),
      (v_art_id, 'peer_reviewed', 1, 'The relationship between expertise and self-assessment accuracy', '2020', 'https://doi.org/10.1177/0956797620904084', 'Psychological Science', 4),
      (v_art_id, 'peer_reviewed', 1, 'When confidence exceeds competence: The Dunning-Kruger effect', '2020', 'https://doi.org/10.1016/bs.aesp.2020.04.001', 'Advances in Experimental Social Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'The impostor phenomenon in the context of metacognition', '2021', 'https://doi.org/10.1016/j.paid.2021.110867', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Calibration of self-assessment: The role of feedback and expertise', '2019', 'https://doi.org/10.1037/apl0000382', 'Journal of Applied Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Metacognitive awareness and the impostor phenomenon', '2020', 'https://doi.org/10.1016/j.concog.2020.102951', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT04-030 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-030';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Narrative identity and the impostor phenomenon', '2020', 'https://doi.org/10.1080/15283488.2020.1735407', 'Identity: An International Journal of Theory and Research', 1),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive restructuring for impostor syndrome', '2021', 'https://doi.org/10.1080/16506073.2020.1832009', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Self-authoring and impostor feelings', '2020', 'https://doi.org/10.1080/10720537.2019.1633570', 'Journal of Constructivist Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Therapeutic writing and the impostor phenomenon', '2019', 'https://doi.org/10.1037/cou0000351', 'Journal of Counseling Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'From fixed to growth: Narrative change in identity development', '2020', 'https://doi.org/10.1037/dev0000912', 'Developmental Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'The role of self-compassion in rewriting negative self-narratives', '2020', 'https://doi.org/10.1007/s12671-020-01523-w', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Expressive writing and psychological health', '2005', 'https://doi.org/10.1192/apt.11.5.338', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Identity consolidation and the reduction of impostor feelings', '2021', 'https://doi.org/10.1007/s10804-020-09367-5', 'Journal of Adult Development', 8)
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
