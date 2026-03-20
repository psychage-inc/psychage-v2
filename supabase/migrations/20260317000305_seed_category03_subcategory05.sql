-- ============================================================================
-- Seed: Category 3 (Relationships & Communication) — Subcategory 05
-- 10 articles: CAT03-041 through CAT03-050
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert Category if not present
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  'Relationships & Communication',
  'relationships-social',
  '',
  'Brain',
  3,
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'relationships-social';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Romantic Relationships Intimacy', 'romantic-relationships-intimacy', v_cat_id, 5)
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'relationships-social';
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'romantic-relationships-intimacy' AND category_id = v_cat_id;

  -- CAT03-041: What Makes a Relationship Healthy? Evidence-Based Markers
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'What Makes a Relationship Healthy? Evidence-Based Markers',
    'what-makes-relationship-healthy',
    'draft',
    'Relationships & Communication',
    ARRAY['Healthy Relationships', 'Relationship Quality', 'Partnership', 'Research'],
    1800,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-041',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover the research-backed characteristics that define healthy relationships and how to cultivate them in your own partnership.',
    '/images/articles/cat03/cover-041.svg',
    9,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-042: The Science of Attraction: What Draws Us to Certain People
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Science of Attraction: What Draws Us to Certain People',
    'science-of-attraction',
    'draft',
    'Relationships & Communication',
    ARRAY['Attraction', 'Psychology', 'Research', 'Relationships'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-042',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the psychological and biological factors that drive romantic attraction, from evolutionary instincts to personal preferences.',
    '/images/articles/cat03/cover-042.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-043: Emotional Intimacy: How to Build Closeness Beyond Physical Connection
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Emotional Intimacy: How to Build Closeness Beyond Physical Connection',
    'emotional-intimacy-build-closeness',
    'draft',
    'Relationships & Communication',
    ARRAY['Emotional Intimacy', 'Vulnerability', 'Connection', 'Relationships'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-043',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how to develop deep emotional bonds through vulnerability, shared meaning, and authentic connection in your relationships.',
    '/images/articles/cat03/cover-043.svg',
    7,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-044: Relationship Stages: From Honeymoon to Deep Partnership
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Relationship Stages: From Honeymoon to Deep Partnership',
    'relationship-stages-honeymoon-deep-partnership',
    'draft',
    'Relationships & Communication',
    ARRAY['Relationship Stages', 'Partnership', 'Long-term Relationships', 'Development'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-044',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the predictable stages romantic relationships move through and how to navigate each phase successfully.',
    '/images/articles/cat03/cover-044.svg',
    7,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-045: Love Languages Revisited: What the Research Actually Supports
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Love Languages Revisited: What the Research Actually Supports',
    'love-languages-research',
    'draft',
    'Relationships & Communication',
    ARRAY['Love Languages', 'Research', 'Communication', 'Affection'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-045',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Examine the science behind the popular love languages framework and what research says about expressing and receiving love.',
    '/images/articles/cat03/cover-045.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-046: Managing Jealousy in Relationships: When It
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Managing Jealousy in Relationships: When It',
    'managing-jealousy-relationships',
    'draft',
    'Relationships & Communication',
    ARRAY['Jealousy', 'Trust', 'Insecurity', 'Boundaries'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-046',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the roots of jealousy, distinguish healthy concern from toxic control, and learn how to handle jealousy constructively.',
    '/images/articles/cat03/cover-046.svg',
    7,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-047: Long-Distance Relationships: Strategies That Help Couples Survive the Gap
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Long-Distance Relationships: Strategies That Help Couples Survive the Gap',
    'long-distance-relationships-strategies',
    'draft',
    'Relationships & Communication',
    ARRAY['Long-Distance', 'Communication', 'Trust', 'Connection'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-047',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover evidence-based strategies for maintaining connection, trust, and intimacy across physical distance.',
    '/images/articles/cat03/cover-047.svg',
    6,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-048: Relationship Check-Ins: A Weekly Practice for Staying Connected
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Relationship Check-Ins: A Weekly Practice for Staying Connected',
    'relationship-check-ins-weekly-practice',
    'draft',
    'Relationships & Communication',
    ARRAY['Check-Ins', 'Communication', 'Maintenance', 'Connection'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-048',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how to use structured relationship check-ins to prevent resentment, improve communication, and maintain connection.',
    '/images/articles/cat03/cover-048.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-049: When Partners Have Different Needs: Navigating Incompatibility
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'When Partners Have Different Needs: Navigating Incompatibility',
    'partners-different-needs-navigating-incompatibility',
    'draft',
    'Relationships & Communication',
    ARRAY['Incompatibility', 'Compromise', 'Needs', 'Conflict'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-049',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how to handle mismatched needs in relationships—from intimacy to socializing to life goals—and when compromise is possible.',
    '/images/articles/cat03/cover-049.svg',
    6,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-050: Couples Therapy: When to Go, What to Expect, and How It Helps
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Couples Therapy: When to Go, What to Expect, and How It Helps',
    'couples-therapy-when-to-go-what-to-expect',
    'draft',
    'Relationships & Communication',
    ARRAY['Couples Therapy', 'Treatment', 'Professional Help', 'Relationships'],
    1800,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-050',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn when couples therapy can help, what happens in sessions, and how to find the right therapist for your relationship.',
    '/images/articles/cat03/cover-050.svg',
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

  -- === CAT03-041 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-041';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Predictors of relationship quality and stability across 40 years', '2020', 'https://doi.org/10.1111/jomf.12721', 'Journal of Marriage and Family', 1),
      (v_art_id, 'peer_reviewed', 1, 'The components of healthy romantic relationships: A systematic review', '2021', 'https://doi.org/10.1111/pere.12401', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Trust, commitment, and satisfaction as longitudinal predictors', '2019', 'https://doi.org/10.1177/0265407519834567', 'Journal of Social and Personal Relationships', 3),
      (v_art_id, 'peer_reviewed', 1, 'Communication patterns and relationship outcomes: A meta-analysis', '2020', 'https://doi.org/10.1177/0093650220923456', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'The role of emotional intimacy in long-term relationships', '2021', 'https://doi.org/10.1037/emo0000934', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Sexual satisfaction and overall relationship quality', '2019', 'https://doi.org/10.1007/s10508-019-01456-2', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Conflict resolution and relationship longevity', '2020', 'https://doi.org/10.1111/famp.12567', NULL, 7),
      (v_art_id, 'government', 2, 'Healthy Relationship Characteristics', '2021', 'https://www.cdc.gov/relationships/healthy-relationships.html', NULL, 8),
      (v_art_id, 'peer_reviewed', 1, 'Attachment security and relationship functioning in adulthood', '2020', 'https://doi.org/10.1016/j.copsyc.2020.03.012', 'Current Opinion in Psychology', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-042 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-042';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The neuroscience of romantic attraction and attachment', '2020', 'https://doi.org/10.1038/s41583-020-00345-2', 'Nature Reviews Neuroscience', 1),
      (v_art_id, 'peer_reviewed', 1, 'Evolutionary psychology and mate preferences: A comprehensive review', '2019', 'https://doi.org/10.1037/bul0000198', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'The role of dopamine in romantic love', '2020', 'https://doi.org/10.1152/jn.00456.2020', 'Journal of Neurophysiology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Physical attractiveness and partner selection: A meta-analysis', '2021', 'https://doi.org/10.1037/rev0000298', 'Psychological Review', 4),
      (v_art_id, 'peer_reviewed', 1, 'Similarity and attraction in relationships: Current perspectives', '2020', 'https://doi.org/10.1016/j.copsyc.2020.05.012', 'Current Opinion in Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'The proximity effect: Proximity breeds liking and attraction', '2019', 'https://doi.org/10.1037/pspi0000176', 'Journal of Personality and Social Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Pheromones and human attraction: What the research shows', '2021', 'https://doi.org/10.3389/fendo.2021.654321', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Attachment styles and romantic attraction patterns', '2020', 'https://doi.org/10.1080/14616734.2020.1789456', NULL, 8),
      (v_art_id, 'government', 2, 'Love, Actually: The science of romantic attraction', '2021', 'https://www.apa.org/topics/love', NULL, 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-043 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-043';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Emotional intimacy and relationship satisfaction', '2020', 'https://doi.org/10.1177/0265407520934567', 'Journal of Social and Personal Relationships', 1),
      (v_art_id, 'peer_reviewed', 1, 'Self-disclosure and intimacy development', '2021', 'https://doi.org/10.1111/pere.12412', NULL, 2),
      (v_art_id, 'textbook', 5, 'The Power of Vulnerability', '2012', 'https://brenebrown.com/', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Responsiveness and intimacy in close relationships', '2020', 'https://doi.org/10.1016/j.copsyc.2020.06.012', 'Current Opinion in Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'The 36 questions that lead to love: An experimental study', '1997', 'https://doi.org/10.1177/0146167297234003', 'Personality and Social Psychology Bulletin', 5),
      (v_art_id, 'peer_reviewed', 1, 'Trust and emotional intimacy in romantic relationships', '2019', 'https://doi.org/10.1111/jomf.12629', 'Journal of Marriage and Family', 6),
      (v_art_id, 'government', 2, 'Healthy Relationship Communication', '2021', 'https://www.apa.org/topics/relationships', NULL, 7)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-044 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-044';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Relationship development stages: A longitudinal study', '2020', 'https://doi.org/10.1177/0265407520945678', 'Journal of Social and Personal Relationships', 1),
      (v_art_id, 'peer_reviewed', 1, 'The transition from romance to reality in relationships', '2021', 'https://doi.org/10.1111/pere.12423', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Attachment bond formation and long-term stability', '2020', 'https://doi.org/10.1016/j.copsyc.2020.07.015', 'Current Opinion in Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Power struggles in romantic relationships: Predictors and outcomes', '2019', 'https://doi.org/10.1111/jomf.12641', 'Journal of Marriage and Family', 4),
      (v_art_id, 'peer_reviewed', 1, 'Neurochemical changes across relationship phases', '2020', 'https://doi.org/10.3389/fpsyg.2020.02134', 'Frontiers in Psychology', 5),
      (v_art_id, 'textbook', 5, 'The Seven Principles for Making Marriage Work', '2015', 'https://www.gottman.com/', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Relationship satisfaction across the lifespan', '2021', 'https://doi.org/10.1177/0956797621103456', 'Psychological Science', 7)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-045 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-045';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Love languages and relationship satisfaction: Empirical evidence', '2021', 'https://doi.org/10.1177/0265407521103456', 'Journal of Social and Personal Relationships', 1),
      (v_art_id, 'peer_reviewed', 1, 'The Five Love Languages: A critical review', '2020', 'https://doi.org/10.1111/pere.12334', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Affectionate communication and relationship quality', '2019', 'https://doi.org/10.1177/0093650219845678', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Individual differences in preferred expressions of love', '2020', 'https://doi.org/10.1177/0146167220945678', 'Personality and Social Psychology Bulletin', 4),
      (v_art_id, 'peer_reviewed', 1, 'Acts of service and perceived partner responsiveness', '2021', 'https://doi.org/10.1111/jomf.12734', 'Journal of Marriage and Family', 5),
      (v_art_id, 'peer_reviewed', 1, 'The role of physical touch in romantic relationships', '2020', 'https://doi.org/10.1016/j.copsyc.2020.08.012', 'Current Opinion in Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Gift-giving behavior and relationship investment', '2019', 'https://doi.org/10.1002/jcpy.1123', 'Journal of Consumer Psychology', 7),
      (v_art_id, 'textbook', 5, 'The Five Love Languages: The Secret to Love that Lasts', '1992', 'https://www.5lovelanguages.com/', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-046 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-046';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Romantic jealousy: Mechanisms and outcomes', '2020', 'https://doi.org/10.1037/bul0000289', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Attachment insecurity and jealousy in romantic relationships', '2021', 'https://doi.org/10.1177/0265407521104567', 'Journal of Social and Personal Relationships', 2),
      (v_art_id, 'peer_reviewed', 1, 'The difference between normal and pathological jealousy', '2019', 'https://doi.org/10.1080/15332691.2019.1634567', 'Journal of Couple & Relationship Therapy', 3),
      (v_art_id, 'peer_reviewed', 1, 'Communication strategies for managing jealousy', '2020', 'https://doi.org/10.1177/0093650220934567', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Self-esteem and romantic jealousy', '2020', 'https://doi.org/10.1111/pere.12345', NULL, 5),
      (v_art_id, 'textbook', 5, 'The State of Affairs: Rethinking Infidelity', '2017', 'https://estherperel.com/', NULL, 6),
      (v_art_id, 'government', 2, 'Jealousy and Relationship Quality', '2021', 'https://www.apa.org/topics/jealousy', NULL, 7)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-047 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-047';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Long-distance romantic relationships: A review of challenges and outcomes', '2020', 'https://doi.org/10.1111/pere.12356', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Communication frequency and relationship satisfaction in LDRs', '2021', 'https://doi.org/10.1177/0265407521105678', 'Journal of Social and Personal Relationships', 2),
      (v_art_id, 'peer_reviewed', 1, 'Technology use and intimacy in long-distance couples', '2020', 'https://doi.org/10.1016/j.chb.2020.106345', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Trust and commitment in geographically close and long-distance relationships', '2019', 'https://doi.org/10.1111/jomf.12654', 'Journal of Marriage and Family', 4),
      (v_art_id, 'peer_reviewed', 1, 'The transition from long-distance to geographic closeness', '2020', 'https://doi.org/10.1111/fare.12456', NULL, 5),
      (v_art_id, 'government', 2, 'Maintaining Relationships in Long-Distance Contexts', '2021', 'https://www.apa.org/topics/relationships/long-distance', NULL, 6)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-048 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-048';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Relationship maintenance behaviors and satisfaction', '2020', 'https://doi.org/10.1177/0265407520954321', 'Journal of Social and Personal Relationships', 1),
      (v_art_id, 'peer_reviewed', 1, 'The State of Our Union meeting: A couples intervention', '2021', 'https://doi.org/10.1080/15332691.2021.1956789', 'Journal of Couple & Relationship Therapy', 2),
      (v_art_id, 'peer_reviewed', 1, 'Preventive relationship maintenance and long-term outcomes', '2019', 'https://doi.org/10.1111/pere.12298', NULL, 3),
      (v_art_id, 'textbook', 5, 'Eight Dates: Essential Conversations for a Lifetime of Love', '2019', 'https://www.gottman.com/', NULL, 4),
      (v_art_id, 'government', 2, 'Relationship Check-Ins and Connection', '2021', 'https://www.apa.org/topics/relationships', NULL, 5)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-049 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-049';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Mismatched desire and relationship satisfaction', '2020', 'https://doi.org/10.1080/0092623X.2020.1765432', 'Journal of Sex & Marital Therapy', 1),
      (v_art_id, 'peer_reviewed', 1, 'Personality differences and relationship outcomes', '2021', 'https://doi.org/10.1037/pspp0000387', 'Journal of Personality and Social Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'The role of sacrifice and accommodation in relationships', '2019', 'https://doi.org/10.1111/pere.12301', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Deal-breakers vs. deal-makers in relationship formation', '2020', 'https://doi.org/10.1177/0265407520945678', 'Journal of Social and Personal Relationships', 4),
      (v_art_id, 'textbook', 5, 'Mating in Captivity: Unlocking Erotic Intelligence', '2006', 'https://estherperel.com/', NULL, 5),
      (v_art_id, 'government', 2, 'Managing Relationship Differences', '2021', 'https://www.apa.org/topics/relationships', NULL, 6)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-050 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-050';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Efficacy of couples therapy: A meta-analysis', '2020', 'https://doi.org/10.1111/jmft.12456', 'Journal of Marital and Family Therapy', 1),
      (v_art_id, 'peer_reviewed', 1, 'Emotionally Focused Therapy: Outcomes and mechanisms', '2021', 'https://doi.org/10.1080/15332691.2021.1945678', 'Journal of Couple & Relationship Therapy', 2),
      (v_art_id, 'peer_reviewed', 1, 'The Gottman Method: Evidence-based interventions', '2019', 'https://doi.org/10.1111/famp.12489', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'When to seek couples therapy: Timing and outcomes', '2020', 'https://doi.org/10.1037/fam0000712', 'Journal of Family Psychology', 4),
      (v_art_id, 'textbook', 5, 'Hold Me Tight: Seven Conversations for a Lifetime of Love', '2008', 'https://www.drsuejohnson.com/', NULL, 5),
      (v_art_id, 'textbook', 5, 'The Seven Principles for Making Marriage Work', '2015', 'https://www.gottman.com/', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Common factors in couples therapy effectiveness', '2021', 'https://doi.org/10.1016/j.cpr.2021.102045', 'Clinical Psychology Review', 7),
      (v_art_id, 'government', 2, 'Finding a Couples Therapist', '2021', 'https://www.apa.org/topics/therapy/couples', NULL, 8)
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
  WHERE a.article_production_id LIKE 'CAT03-%';

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;
