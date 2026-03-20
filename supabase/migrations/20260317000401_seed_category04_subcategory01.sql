-- ============================================================================
-- Seed: Category 4 (Self-Worth, Confidence & Identity) — Subcategory 01
-- 10 articles: CAT04-001 through CAT04-010
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
  VALUES ('Understanding Self Esteem', 'understanding-self-esteem', v_cat_id, 1)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'understanding-self-esteem' AND category_id = v_cat_id;

  -- CAT04-001: What Is Self-Esteem? The Difference Between Self-Worth, Self-Confidence, and Self-Esteem
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'What Is Self-Esteem? The Difference Between Self-Worth, Self-Confidence, and Self-Esteem',
    'what-is-self-esteem-difference-self-worth-confidence',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Self-Esteem', 'Self-Worth', 'Self-Confidence', 'Psychology'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-001',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the crucial distinctions between self-esteem, self-worth, and self-confidence, and why knowing the difference changes everything.',
    '/images/articles/cat04/cover-001.svg',
    8,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT04-002: Where Self-Esteem Comes From: How Childhood Shapes How You See Yourself
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Where Self-Esteem Comes From: How Childhood Shapes How You See Yourself',
    'where-self-esteem-comes-from-childhood',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Self-Esteem', 'Childhood', 'Attachment', 'Development'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-002',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover how early experiences with caregivers, peers, and environments create the foundation for lifelong self-esteem patterns.',
    '/images/articles/cat04/cover-002.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT04-003: Low Self-Esteem: Signs, Causes, and What Keeps It Stuck
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Low Self-Esteem: Signs, Causes, and What Keeps It Stuck',
    'low-self-esteem-signs-causes',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Self-Esteem', 'Mental Health', 'Cognitive Patterns', 'Psychology'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-003',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Recognize the patterns of low self-esteem and understand the psychological mechanisms that maintain it, even when you want to change.',
    '/images/articles/cat04/cover-003.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT04-004: The Self-Esteem Spectrum: Fragile, Contingent, and Stable Self-Worth
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Self-Esteem Spectrum: Fragile, Contingent, and Stable Self-Worth',
    'self-esteem-spectrum-fragile-contingent-stable',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Self-Esteem', 'Psychology', 'Mental Health', 'Self-Worth'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-004',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Not all high self-esteem is healthy. Explore the different types of self-esteem and why stability matters more than level.',
    '/images/articles/cat04/cover-004.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT04-005: Why Positive Affirmations Don
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Why Positive Affirmations Don',
    'why-positive-affirmations-dont-work-science',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Self-Esteem', 'Research', 'Affirmations', 'Evidence-Based'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-005',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Positive affirmations can backfire for people with low self-esteem. Understand the research and discover what actually works instead.',
    '/images/articles/cat04/cover-005.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT04-006: Self-Esteem vs. Self-Compassion: Which Matters More?
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Self-Esteem vs. Self-Compassion: Which Matters More?',
    'self-esteem-vs-self-compassion-which-matters',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Self-Esteem', 'Self-Compassion', 'Research', 'Wellbeing'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-006',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Research reveals that self-compassion may be more important than self-esteem for psychological wellbeing. Discover why and how to cultivate both.',
    '/images/articles/cat04/cover-006.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT04-007: The Role of Achievement in Self-Worth: Why Success Doesn
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Role of Achievement in Self-Worth: Why Success Doesn',
    'achievement-self-worth-why-success-doesnt-fix',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Self-Worth', 'Achievement', 'Success', 'Psychology'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-007',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand why accomplishments often fail to improve how you feel about yourself, and what actually builds lasting self-worth.',
    '/images/articles/cat04/cover-007.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT04-008: How Culture Shapes Self-Esteem: Individualist vs. Collectivist Perspectives
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How Culture Shapes Self-Esteem: Individualist vs. Collectivist Perspectives',
    'culture-shapes-self-esteem-individualist-collectivist',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Self-Esteem', 'Culture', 'Psychology', 'Cross-Cultural'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-008',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Self-esteem looks different across cultures. Explore how individualist and collectivist societies shape what it means to value yourself.',
    '/images/articles/cat04/cover-008.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT04-009: Gender and Self-Esteem: How Societal Expectations Affect Self-Worth
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Gender and Self-Esteem: How Societal Expectations Affect Self-Worth',
    'gender-self-esteem-societal-expectations',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Self-Esteem', 'Gender', 'Society', 'Mental Health'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-009',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore how gender norms and expectations shape self-esteem development differently for men, women, and gender-diverse individuals.',
    '/images/articles/cat04/cover-009.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT04-010: Measuring Your Self-Esteem: Validated Tools and What They Tell You
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Measuring Your Self-Esteem: Validated Tools and What They Tell You',
    'measuring-self-esteem-validated-tools',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Self-Esteem', 'Assessment', 'Psychology', 'Measurement'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-010',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore scientifically validated self-esteem assessments, what they measure, and how to interpret your results meaningfully.',
    '/images/articles/cat04/cover-010.svg',
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

  -- === CAT04-001 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-001';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Self-Esteem: Research, Theory, and Practice', '2006', 'https://doi.org/10.1891/9780826102171', 'Springer Series in Social Clinical Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'The Development and Validation of a Scale Measuring Global Self-Esteem', '1965', 'https://doi.org/10.1207/s15327752jpa4704_15', 'Journal of Personality Assessment', 2),
      (v_art_id, 'government', 2, 'Self-Esteem and Psychological Wellbeing', '2022', 'https://www.apa.org/topics/self-esteem', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Contingencies of Self-Worth', '2003', 'https://doi.org/10.1037/0033-295X.110.1.173', 'Psychological Review', 4),
      (v_art_id, 'peer_reviewed', 1, 'Self-Compassion Versus Self-Esteem: Two Ways of Relating to Oneself', '2011', 'https://doi.org/10.1111/j.1467-6494.2011.00702.x', 'Journal of Personality', 5),
      (v_art_id, 'peer_reviewed', 1, 'The Self: Psychology, Sociology, and Anthropology', '2001', 'https://doi.org/10.1002/9780470998519', 'Blackwell Handbook of Social Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Self-Concept Clarity: Measurement, Personality Correlates, and Cultural Boundaries', '1996', 'https://doi.org/10.1037/0022-3514.70.1.141', 'Journal of Personality and Social Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'The Role of Self-Esteem in Defense Mechanisms', '2008', 'https://doi.org/10.1016/j.jesp.2007.08.003', 'Journal of Experimental Social Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT04-002 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-002';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Attachment Theory and Psychotherapy Research', '2008', 'https://doi.org/10.1037/0022-006X.76.6.1005', 'Journal of Consulting and Clinical Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'The Origins of Self-Esteem', '1998', 'https://doi.org/10.1037/0012-1649.34.4.833', 'Developmental Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Parenting Styles and Child Outcomes', '1991', 'https://doi.org/10.2307/1131134', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Peer Relations and Self-Esteem Development', '2004', 'https://doi.org/10.1023/B:JOYO.0000025320.89556.b7', 'Journal of Youth and Adolescence', 4),
      (v_art_id, 'peer_reviewed', 1, 'The Role of Reflected Appraisals in Self-Concept Development', '1981', 'https://doi.org/10.1086/227880', 'American Journal of Sociology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Early Adversity and Self-Esteem', '2015', 'https://doi.org/10.1016/j.cpr.2015.03.006', 'Clinical Psychology Review', 6),
      (v_art_id, 'peer_reviewed', 1, 'Social Comparison Theory and Self-Esteem', '2006', 'https://doi.org/10.1037/0033-2909.132.1.151', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Achievement Experiences and Self-Perception', '2000', 'https://doi.org/10.1037/0022-0663.92.3.436', 'Journal of Educational Psychology', 8),
      (v_art_id, 'peer_reviewed', 1, 'Sociocultural Factors in Self-Esteem Development', '2013', 'https://doi.org/10.1037/a0030904', 'Cultural Diversity and Ethnic Minority Psychology', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT04-003 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-003';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Low Self-Esteem and Internalizing Disorders', '2008', 'https://doi.org/10.1037/0021-843X.117.4.923', 'Journal of Abnormal Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive Biases in Low Self-Esteem', '2007', 'https://doi.org/10.1007/s10608-006-9040-x', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'The Self-Perpetuating Nature of Low Self-Esteem', '2012', 'https://doi.org/10.1037/a0028931', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Depression and Self-Esteem: A Meta-Analysis', '2013', 'https://doi.org/10.1016/j.cpr.2013.06.002', 'Clinical Psychology Review', 4),
      (v_art_id, 'peer_reviewed', 1, 'Self-Verification Theory', '1992', 'https://doi.org/10.1037/0033-295X.99.3.371', 'Psychological Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'Safety Behaviors and Social Anxiety', '2005', 'https://doi.org/10.1016/j.brat.2004.08.008', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Rejection Sensitivity and Mental Health', '2001', 'https://doi.org/10.1037/0022-3514.80.5.776', 'Journal of Personality and Social Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive Behavioral Therapy for Self-Esteem', '2015', 'https://doi.org/10.1037/ccp0000031', 'Journal of Consulting and Clinical Psychology', 8),
      (v_art_id, 'peer_reviewed', 1, 'Self-Esteem Instability and Mental Health', '2010', 'https://doi.org/10.1016/j.jrp.2010.03.001', 'Journal of Research in Personality', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT04-004 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-004';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Fragile Self-Esteem and Its Implications', '2003', 'https://doi.org/10.1177/0146167203256641', 'Personality and Social Psychology Bulletin', 1),
      (v_art_id, 'peer_reviewed', 1, 'Contingencies of Self-Worth in College Students', '2003', 'https://doi.org/10.1037/0022-3514.84.5.894', 'Journal of Personality and Social Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Defensive and Secure High Self-Esteem', '2000', 'https://doi.org/10.1037/0022-3514.79.3.420', 'Journal of Personality and Social Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Stability of Self-Esteem and Wellbeing', '2008', 'https://doi.org/10.1016/j.jrp.2008.02.003', 'Journal of Research in Personality', 4),
      (v_art_id, 'peer_reviewed', 1, 'Narcissism and Self-Esteem: Different Constructs', '2014', 'https://doi.org/10.1037/a0038231', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Authentic Self-Esteem and Psychological Wellbeing', '2012', 'https://doi.org/10.1037/a0027233', 'Journal of Counseling Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'The Costs of Pursuing Self-Esteem', '2001', 'https://doi.org/10.1111/0022-4537.00238', 'Journal of Social Issues', 7),
      (v_art_id, 'peer_reviewed', 1, 'Implicit Self-Esteem and Explicit Self-Esteem', '2005', 'https://doi.org/10.1037/0022-3514.89.6.969', 'Journal of Personality and Social Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT04-005 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-005';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Positive Self-Statements: Power for Some, Peril for Others', '2009', 'https://doi.org/10.1111/j.1467-9280.2009.02370.x', 'Psychological Science', 1),
      (v_art_id, 'peer_reviewed', 1, 'The Backfire Effect of Thought Suppression', '1987', 'https://doi.org/10.1037/0022-3514.53.1.5', 'Journal of Personality and Social Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Self-Affirmation Theory', '2006', 'https://doi.org/10.1016/S0065-2601(06)38004-5', 'Advances in Experimental Social Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Self-Compassion vs. Self-Esteem in Psychological Wellbeing', '2007', 'https://doi.org/10.1016/j.jrp.2006.03.004', 'Journal of Research in Personality', 4),
      (v_art_id, 'peer_reviewed', 1, 'Implementation Intentions: Strong Effects of Simple Plans', '1999', 'https://doi.org/10.1037/0003-066X.54.7.493', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Growth Mindset Interventions', '2016', 'https://doi.org/10.1177/0956797616631764', 'Psychological Science', 6),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive Dissonance and Belief Change', '1957', 'https://doi.org/10.1037/h0041593', 'Psychological Review', 7),
      (v_art_id, 'peer_reviewed', 1, 'Values Affirmation in Education', '2010', 'https://doi.org/10.1126/science.1175862', 'Science', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT04-006 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-006';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Self-Compassion Versus Self-Esteem: Two Ways of Relating to Oneself', '2011', 'https://doi.org/10.1111/j.1467-6494.2011.00702.x', 'Journal of Personality', 1),
      (v_art_id, 'peer_reviewed', 1, 'Self-Compassion: An Alternative Conceptualization of a Healthy Attitude Toward Oneself', '2003', 'https://doi.org/10.1080/15298860309032', NULL, 2),
      (v_art_id, 'professional_org', 3, 'The Proven Benefits of Self-Compassion', '2018', 'https://hbr.org/2018/09/the-proven-benefits-of-self-compassion', 'Harvard Business Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'Self-Compassion and Psychological Wellbeing', '2007', 'https://doi.org/10.1016/j.jrp.2006.03.004', 'Journal of Research in Personality', 4),
      (v_art_id, 'peer_reviewed', 1, 'A Meta-Analytic Review of Self-Compassion Interventions', '2019', 'https://doi.org/10.1016/j.cpr.2019.01.006', 'Clinical Psychology Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'Self-Esteem and Narcissism: Costs and Benefits', '2014', 'https://doi.org/10.1037/a0038231', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Self-Compassion and Academic Performance', '2014', 'https://doi.org/10.1016/j.lindif.2014.04.009', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Self-Compassion Reduces Depression in College Students', '2013', 'https://doi.org/10.1080/87568225.2013.766107', 'Journal of College Student Psychotherapy', 8),
      (v_art_id, 'peer_reviewed', 1, 'The Development and Validation of the Self-Compassion Scale', '2003', 'https://doi.org/10.1080/15298860309027', NULL, 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT04-007 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-007';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Contingencies of Self-Worth in College Students', '2003', 'https://doi.org/10.1037/0022-3514.84.5.894', 'Journal of Personality and Social Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'The Hedonic Treadmill: Adaptation to Success', '2006', 'https://doi.org/10.1037/0033-2909.132.2.180', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Intrinsic Versus Extrinsic Goal Contents in Self-Determination Theory', '1996', 'https://doi.org/10.1037/0022-3514.71.3.546', 'Journal of Personality and Social Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Pursuing Happiness Through Material Wealth', '2014', 'https://doi.org/10.1007/s10902-013-9460-8', 'Journal of Happiness Studies', 4),
      (v_art_id, 'peer_reviewed', 1, 'Achievement Goals and Depression', '2011', 'https://doi.org/10.1037/a0023518', 'Journal of Abnormal Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Imposter Syndrome in High Achievers', '2011', 'https://doi.org/10.14456/ijbs.2011.5', 'International Journal of Behavioral Science', 6),
      (v_art_id, 'peer_reviewed', 1, 'Values Versus Goals: Better Predictors of Wellbeing', '2015', 'https://doi.org/10.1080/17439760.2014.920926', 'Journal of Positive Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Self-Worth and the Pursuit of Goals', '2009', 'https://doi.org/10.1007/s11031-009-9139-z', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT04-008 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-008';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Culture and the Self: Implications for Cognition, Emotion, and Motivation', '1991', 'https://doi.org/10.1037/0033-295X.98.2.224', 'Psychological Review', 1),
      (v_art_id, 'peer_reviewed', 1, 'Cross-Cultural Differences in Self-Esteem', '2005', 'https://doi.org/10.1177/0022022105275962', 'Journal of Cross-Cultural Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Self-Enhancement and Self-Criticism in Japanese Culture', '1999', 'https://doi.org/10.1037/0022-3514.76.3.496', 'Journal of Personality and Social Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'The Cultural Psychology of Personality', '2014', 'https://doi.org/10.1111/jopy.12137', 'Journal of Personality', 4),
      (v_art_id, 'peer_reviewed', 1, 'Self-Esteem in Collectivist vs. Individualist Cultures', '2010', 'https://doi.org/10.1037/a0017105', 'Cultural Diversity and Ethnic Minority Psychology', 5),
      (v_art_id, 'government', 2, 'Acculturation and Self-Esteem', '2006', 'https://doi.org/10.1037/0003-066X.61.8.877', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Face and Self-Esteem in Chinese Culture', '2008', 'https://doi.org/10.1111/j.1467-839X.2008.00254.x', 'Asian Journal of Social Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Honor Cultures and Self-Worth', '1996', 'https://doi.org/10.1037/0022-3514.70.5.945', 'Journal of Personality and Social Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT04-009 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-009';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Gender Differences in Self-Esteem: A Meta-Analysis', '1999', 'https://doi.org/10.1037/0033-2909.125.4.470', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Self-Objectification and Self-Esteem in Women', '1997', 'https://doi.org/10.1111/j.1471-6402.1997.tb00108.x', 'Psychology of Women Quarterly', 2),
      (v_art_id, 'peer_reviewed', 1, 'Masculinity Norms and Mental Health', '2007', 'https://doi.org/10.1037/1524-9220.8.1.3', 'Psychology of Men & Masculinity', 3),
      (v_art_id, 'peer_reviewed', 1, 'Gender Identity and Self-Esteem in Transgender Youth', '2016', 'https://doi.org/10.1016/j.jadohealth.2015.10.251', 'Journal of Adolescent Health', 4),
      (v_art_id, 'peer_reviewed', 1, 'Appearance-Based Self-Worth Across Gender', '2013', 'https://doi.org/10.1016/j.bodyim.2013.03.008', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Achievement and Self-Esteem: Gender Differences', '2015', 'https://doi.org/10.1007/s11199-015-0516-7', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Intersectionality and Self-Esteem', '2018', 'https://doi.org/10.1037/cdp0000179', 'Cultural Diversity and Ethnic Minority Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Gender Nonconformity and Mental Health', '2019', 'https://doi.org/10.1542/peds.2018-3742', NULL, 8),
      (v_art_id, 'peer_reviewed', 1, 'Social Media, Gender, and Self-Esteem', '2020', 'https://doi.org/10.1089/cyber.2019.0517', 'Cyberpsychology, Behavior, and Social Networking', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT04-010 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-010';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'textbook', 5, 'The Rosenberg Self-Esteem Scale', '1965', 'https://doi.org/10.1515/9781400876136', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Measuring Self-Esteem: Validation and Utility', '2001', 'https://doi.org/10.1207/S15327752JPA7703_04', 'Journal of Personality Assessment', 2),
      (v_art_id, 'peer_reviewed', 1, 'The State Self-Esteem Scale', '1991', 'https://doi.org/10.1037/0022-3514.60.6.895', 'Journal of Personality and Social Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Contingencies of Self-Worth Scale', '2003', 'https://doi.org/10.1037/0022-3514.85.5.894', 'Journal of Personality and Social Psychology', 4),
      (v_art_id, 'textbook', 5, 'The Coopersmith Self-Esteem Inventory', '1967', 'https://psycnet.apa.org/record/1968-08028-000', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Implicit Association Test for Self-Esteem', '1998', 'https://doi.org/10.1037/0022-3514.74.6.1464', 'Journal of Personality and Social Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Self-Esteem Stability and Mental Health', '2003', 'https://doi.org/10.1037/0033-2909.129.4.574', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'The Self-Compassion Scale', '2003', 'https://doi.org/10.1080/15298860309027', NULL, 8)
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
