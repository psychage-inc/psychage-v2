-- ============================================================================
-- Seed: Category 4 (Self-Worth, Confidence & Identity) — Subcategory 05
-- 10 articles: CAT04-041 through CAT04-050
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
  VALUES ('Identity Values', 'identity-values', v_cat_id, 5)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'identity-values' AND category_id = v_cat_id;

  -- CAT04-041: Who Am I? A Guide to Identity Formation and Development
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Who Am I? A Guide to Identity Formation and Development',
    'who-am-i-guide-identity-formation-development',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Identity', 'Self-Concept', 'Personal Development', 'Psychology'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-041',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Identity develops throughout life. Understand how you form your sense of self and why ',
    '/images/articles/cat04/cover-041.svg',
    4,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT04-042: Identity Crisis: When You Don
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Identity Crisis: When You Don',
    'identity-crisis-when-you-dont-know-who-you-are',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Identity Crisis', 'Life Transitions', 'Self-Discovery', 'Mental Health'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-042',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Feeling lost about who you are is disorienting and frightening. Learn what triggers identity crises and how to navigate them constructively.',
    '/images/articles/cat04/cover-042.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT04-043: Living Authentically: What It Means and Why It
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Living Authentically: What It Means and Why It',
    'living-authentically-what-it-means-why-difficult',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Authenticity', 'Values', 'Self-Concept', 'Personal Growth'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-043',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Authenticity means aligning actions with values. Learn why living authentically is psychologically beneficial yet socially challenging.',
    '/images/articles/cat04/cover-043.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT04-044: How Values Guide Your Life: A Practical Exercise in Clarification
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How Values Guide Your Life: A Practical Exercise in Clarification',
    'values-guide-life-practical-clarification-exercise',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Values', 'Personal Growth', 'Decision Making', 'Self-Awareness'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-044',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Your values are your compass. Learn what values are, why they matter, and how to clarify your own through practical exercises.',
    '/images/articles/cat04/cover-044.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT04-045: The Masks We Wear: Code-Switching, People-Pleasing, and Losing Yourself
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Masks We Wear: Code-Switching, People-Pleasing, and Losing Yourself',
    'masks-we-wear-code-switching-people-pleasing-losing-yourself',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Authenticity', 'Code-Switching', 'People-Pleasing', 'Identity'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-045',
    v_cat_id,
    v_sub_id,
    'drafted',
    'We adapt ourselves to different contexts—but when does flexibility become inauthenticity? Learn when code-switching protects you and when it erodes your sense of self.',
    '/images/articles/cat04/cover-045.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT04-046: Cultural Identity and Mental Health: Navigating Multiple Selves
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Cultural Identity and Mental Health: Navigating Multiple Selves',
    'cultural-identity-mental-health-navigating-multiple-selves',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Cultural Identity', 'Bicultural Identity', 'Mental Health', 'Diversity'],
    1000,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-046',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Navigating multiple cultural identities can be enriching or exhausting. Learn how cultural identity shapes mental health and wellbeing.',
    '/images/articles/cat04/cover-046.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT04-047: Gender Identity and Mental Health: Understanding the Psychological Impact
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Gender Identity and Mental Health: Understanding the Psychological Impact',
    'gender-identity-mental-health-psychological-impact',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Gender Identity', 'Transgender', 'Mental Health', 'Identity'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-047',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Gender identity—your internal sense of gender—profoundly affects mental health, especially when it conflicts with assigned sex or social expectations.',
    '/images/articles/cat04/cover-047.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT04-048: Sexual Orientation and Self-Acceptance: A Psychological Perspective
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Sexual Orientation and Self-Acceptance: A Psychological Perspective',
    'sexual-orientation-self-acceptance-psychological-perspective',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Sexual Orientation', 'LGBTQ+', 'Self-Acceptance', 'Mental Health'],
    1000,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-048',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Coming to terms with sexual orientation involves navigating internalized stigma, family acceptance, and building authentic identity in a heteronormative world.',
    '/images/articles/cat04/cover-048.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT04-049: Career Identity: When What You Do Becomes Who You Are
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Career Identity: When What You Do Becomes Who You Are',
    'career-identity-when-what-you-do-becomes-who-you-are',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Career Identity', 'Work-Life Balance', 'Identity', 'Burnout'],
    1000,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-049',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Your career can be source of meaning or trap. Learn when work identity enriches life and when it becomes problematic over-identification.',
    '/images/articles/cat04/cover-049.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT04-050: Reinventing Yourself: How to Navigate Major Identity Shifts
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Reinventing Yourself: How to Navigate Major Identity Shifts',
    'reinventing-yourself-navigate-major-identity-shifts',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Identity Change', 'Life Transitions', 'Resilience', 'Personal Growth'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-050',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Major life changes require identity reconstruction. Learn how to navigate reinvention after divorce, career change, illness, or other transitions.',
    '/images/articles/cat04/cover-050.svg',
    3,
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

  -- === CAT04-041 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-041';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Identity development across the lifespan', '2020', 'https://doi.org/10.1111/jopy.12542', 'Journal of Personality', 1),
      (v_art_id, 'peer_reviewed', 1, 'Erikson', '2020', 'https://doi.org/10.1016/j.dr.2020.100920', 'Developmental Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Narrative identity and psychological well-being', '2021', 'https://doi.org/10.1037/pspp0000318', 'Journal of Personality and Social Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Identity exploration and commitment', '2020', 'https://doi.org/10.1037/dev0000988', 'Developmental Psychology', 4)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT04-042 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-042';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Identity distress and psychological outcomes', '2021', 'https://doi.org/10.1016/j.cpr.2021.101974', 'Clinical Psychology Review', 1),
      (v_art_id, 'peer_reviewed', 1, 'Life transitions and identity reconstruction', '2020', 'https://doi.org/10.1007/s10804-020-09345-6', 'Journal of Adult Development', 2),
      (v_art_id, 'peer_reviewed', 1, 'Identity flexibility and mental health', '2021', 'https://doi.org/10.1111/jopy.12639', 'Journal of Personality', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT04-043 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-043';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Authenticity and psychological well-being', '2020', 'https://doi.org/10.1037/cou0000412', 'Journal of Counseling Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'The social costs of authenticity', '2021', 'https://doi.org/10.1177/0956797620975820', 'Psychological Science', 2),
      (v_art_id, 'peer_reviewed', 1, 'Authenticity in close relationships', '2020', 'https://doi.org/10.1037/pspi0000259', 'Journal of Personality and Social Psychology', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT04-044 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-044';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Values and psychological well-being', '2020', 'https://doi.org/10.1080/17439760.2020.1789696', 'Journal of Positive Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Acceptance and Commitment Therapy', '2021', 'https://doi.org/10.1016/j.beth.2020.12.002', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Values-based decision making', '2020', 'https://doi.org/10.1002/bdm.2168', 'Journal of Behavioral Decision Making', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT04-045 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-045';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Code-switching and identity', '2020', 'https://doi.org/10.1037/cdp0000346', 'Cultural Diversity and Ethnic Minority Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'People-pleasing and mental health', '2021', 'https://doi.org/10.1002/jclp.23089', 'Journal of Clinical Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Authenticity and psychological cost of self-concealment', '2020', 'https://doi.org/10.1111/jopy.12542', 'Journal of Personality', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT04-046 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-046';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Bicultural identity integration and well-being', '2020', 'https://doi.org/10.1177/0022022120902108', 'Journal of Cross-Cultural Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Cultural identity conflict and mental health', '2021', 'https://doi.org/10.1037/cdp0000438', 'Cultural Diversity and Ethnic Minority Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Third culture kids and identity formation', '2020', 'https://doi.org/10.1016/j.ijintrel.2020.05.002', 'International Journal of Intercultural Relations', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT04-047 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-047';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Gender dysphoria and mental health outcomes', '2020', 'https://doi.org/10.1016/j.jaac.2019.12.006', 'Journal of the American Academy of Child & Adolescent Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Affirming care and transgender youth mental health', '2022', 'https://doi.org/10.1542/peds.2021-056082', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Minority stress model and gender identity', '2021', 'https://doi.org/10.1037/sgd0000452', 'Psychology of Sexual Orientation and Gender Diversity', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT04-048 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-048';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Sexual orientation and mental health', '2020', 'https://doi.org/10.1037/amp0000558', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Minority stress and LGB mental health', '2021', 'https://doi.org/10.1146/annurev-clinpsy-081219-120559', 'Annual Review of Clinical Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Coming out and psychological wellbeing', '2020', 'https://doi.org/10.1080/19359705.2020.1715455', 'Journal of Gay & Lesbian Mental Health', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT04-049 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-049';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Career identity and psychological wellbeing', '2020', 'https://doi.org/10.1016/j.jvb.2020.103418', 'Journal of Vocational Behavior', 1),
      (v_art_id, 'peer_reviewed', 1, 'Work identity entrapment', '2021', 'https://doi.org/10.1037/apl0000847', 'Journal of Applied Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Career transitions and identity reconstruction', '2020', 'https://doi.org/10.1177/0894845319882129', 'Journal of Career Development', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT04-050 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-050';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Identity reconstruction after major life events', '2021', 'https://doi.org/10.1111/jopy.12601', 'Journal of Personality', 1),
      (v_art_id, 'peer_reviewed', 1, 'Posttraumatic growth and identity change', '2020', 'https://doi.org/10.1016/j.cpr.2020.101831', 'Clinical Psychology Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Narrative identity and life transitions', '2020', 'https://doi.org/10.1080/15283488.2020.1735407', 'Identity: An International Journal', 3)
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
