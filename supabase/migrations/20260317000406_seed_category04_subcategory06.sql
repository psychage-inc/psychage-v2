-- ============================================================================
-- Seed: Category 4 (Self-Worth, Confidence & Identity) — Subcategory 06
-- 10 articles: CAT04-051 through CAT04-060
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
  VALUES ('Building Confidence', 'building-confidence', v_cat_id, 6)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'building-confidence' AND category_id = v_cat_id;

  -- CAT04-051: The Confidence Gap: Why You Don
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Confidence Gap: Why You Don',
    'confidence-gap-act-confident',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Confidence', 'Action', 'Self-Efficacy', 'Behavioral Psychology'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-051',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover why waiting to feel confident keeps you stuck, and how action creates confidence rather than the other way around.',
    '/images/articles/cat04/cover-051.svg',
    8,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT04-052: Self-Efficacy: How Believing You Can Do Something Makes It Possible
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Self-Efficacy: How Believing You Can Do Something Makes It Possible',
    'self-efficacy-believing-makes-possible',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Self-Efficacy', 'Research', 'Psychology', 'Performance'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-052',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Albert Bandura',
    '/images/articles/cat04/cover-052.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT04-053: Small Wins: How Minor Accomplishments Build Major Confidence
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Small Wins: How Minor Accomplishments Build Major Confidence',
    'small-wins-build-major-confidence',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Confidence', 'Small Wins', 'Progress', 'Motivation'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-053',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Research shows that accumulating small victories creates momentum and self-efficacy more effectively than pursuing big, distant goals.',
    '/images/articles/cat04/cover-053.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT04-054: Stepping Outside Your Comfort Zone: The Science of Productive Discomfort
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Stepping Outside Your Comfort Zone: The Science of Productive Discomfort',
    'comfort-zone-productive-discomfort',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Growth', 'Comfort Zone', 'Challenge', 'Learning'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-054',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Growth happens in the learning zone just beyond comfort. Understanding this sweet spot helps you challenge yourself without overwhelming yourself.',
    '/images/articles/cat04/cover-054.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT04-055: How to Stop Comparing Yourself to Others: Practical Strategies
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How to Stop Comparing Yourself to Others: Practical Strategies',
    'stop-comparing-yourself-to-others',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Comparison', 'Social Media', 'Self-Worth', 'Confidence'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-055',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Social comparison is natural, but constant comparison erodes confidence and wellbeing. Learn evidence-based strategies to break the habit.',
    '/images/articles/cat04/cover-055.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT04-056: Building Confidence After Failure: Reframing Setbacks as Data
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Building Confidence After Failure: Reframing Setbacks as Data',
    'confidence-after-failure-reframing-setbacks',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Resilience', 'Failure', 'Growth Mindset', 'Learning'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-056',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Failure destroys confidence only if you interpret it as evidence of inability. Learn to treat setbacks as information, not identity.',
    '/images/articles/cat04/cover-056.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT04-057: Public Speaking Confidence: From Terrified to Competent
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Public Speaking Confidence: From Terrified to Competent',
    'public-speaking-confidence',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Public Speaking', 'Anxiety', 'Performance', 'Skills'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-057',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Fear of public speaking is common and conquerable. Learn the evidence-based strategies that build competence and reduce anxiety.',
    '/images/articles/cat04/cover-057.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT04-058: Social Confidence: How to Feel More at Ease Around Others
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Social Confidence: How to Feel More at Ease Around Others',
    'social-confidence',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Social Skills', 'Confidence', 'Relationships', 'Communication'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-058',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Social confidence isn',
    '/images/articles/cat04/cover-058.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT04-059: The Body Language of Confidence: How Posture Affects Psychology
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Body Language of Confidence: How Posture Affects Psychology',
    'body-language-confidence-psychology',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Body Language', 'Research', 'Confidence', 'Embodied Cognition'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-059',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Research shows that physical posture doesn',
    '/images/articles/cat04/cover-059.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT04-060: Confidence vs. Arrogance: The Fine Line and How to Walk It
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Confidence vs. Arrogance: The Fine Line and How to Walk It',
    'confidence-vs-arrogance',
    'draft',
    'Self-Worth, Confidence & Identity',
    ARRAY['Confidence', 'Arrogance', 'Humility', 'Self-Awareness'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT04-060',
    v_cat_id,
    v_sub_id,
    'drafted',
    'True confidence is quiet self-assurance. Arrogance is insecurity masked as superiority. Learn to recognize and cultivate the difference.',
    '/images/articles/cat04/cover-060.svg',
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

  -- === CAT04-051 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-051';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'textbook', 5, 'The Confidence Code: The Science and Art of Self-Assurance', '2014', 'https://www.harpercollins.com/products/the-confidence-code-katty-kay', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Self-efficacy: Toward a unifying theory of behavioral change', '1977', 'https://doi.org/10.1037/0033-295X.84.2.191', 'Psychological Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Faking it until you make it: Confidence and competence development', '2018', 'https://doi.org/10.1037/apl0000303', 'Journal of Applied Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Action breeds confidence: The relationship between behavioral activation and self-efficacy', '2016', 'https://doi.org/10.1016/j.brat.2016.03.008', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Gender differences in confidence: Evidence and implications', '2019', 'https://doi.org/10.1016/j.joep.2019.102238', 'Journal of Economic Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'The role of mastery experiences in confidence development', '2017', 'https://doi.org/10.1080/15298868.2017.1290272', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Confidence and performance: Longitudinal evidence from competitive settings', '2020', 'https://doi.org/10.1016/j.obhdp.2020.03.007', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Behavioral activation as a treatment for depression: Returning to contextual roots', '2011', 'https://doi.org/10.1111/j.1468-2850.2011.01255.x', 'Clinical Psychology: Science and Practice', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT04-052 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-052';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Self-efficacy: Toward a unifying theory of behavioral change', '1977', 'https://doi.org/10.1037/0033-295X.84.2.191', 'Psychological Review', 1),
      (v_art_id, 'textbook', 5, 'Self-Efficacy: The Exercise of Control', '1997', 'https://www.worldcat.org/title/self-efficacy-the-exercise-of-control/oclc/36074515', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Self-efficacy beliefs and academic performance: A meta-analysis', '2018', 'https://doi.org/10.1007/s10648-018-9450-5', 'Educational Psychology Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'The role of self-efficacy in health behavior change', '2016', 'https://doi.org/10.1177/1359105316643948', 'Journal of Health Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Self-efficacy and work-related performance: A meta-analysis', '2018', 'https://doi.org/10.1037/bul0000148', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Four sources of self-efficacy: A meta-analytic review', '2019', 'https://doi.org/10.1037/apl0000391', 'Journal of Applied Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Cultivating competence, self-efficacy, and intrinsic interest', '2000', 'https://doi.org/10.1037/0003-066X.55.1.68', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Self-efficacy and depression: A meta-analysis', '2017', 'https://doi.org/10.1016/j.cpr.2017.01.005', 'Clinical Psychology Review', 8),
      (v_art_id, 'peer_reviewed', 1, 'The interplay between self-efficacy and motivation', '2020', 'https://doi.org/10.1037/mot0000157', 'Motivation Science', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT04-053 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-053';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Small wins: Redefining the scale of social problems', '1984', 'https://doi.org/10.1037/0003-066X.39.1.40', NULL, 1),
      (v_art_id, 'textbook', 5, 'The Progress Principle: Using Small Wins to Ignite Joy, Engagement, and Creativity at Work', '2011', 'https://hbr.org/product/the-progress-principle-using-small-wins-to-ignite-joy-engagement-and-creativity-at-work/10830-HBK-ENG', 'Harvard Business Review Press', 2),
      (v_art_id, 'peer_reviewed', 1, 'Goal gradient hypothesis: Distance to goal increases motivation', '2006', 'https://doi.org/10.1037/0096-3445.135.2.215', 'Journal of Experimental Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'The power of small wins in habit formation', '2010', 'https://doi.org/10.1002/ejsp.674', 'European Journal of Social Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Accumulation of small successes and depression treatment', '2015', 'https://doi.org/10.1016/j.beth.2015.03.001', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Micro-goals and behavioral momentum', '2018', 'https://doi.org/10.1002/jaba.456', 'Journal of Applied Behavior Analysis', 6),
      (v_art_id, 'peer_reviewed', 1, 'Progress tracking and self-regulation', '2017', 'https://doi.org/10.1177/0956797617706394', 'Psychological Science', 7),
      (v_art_id, 'peer_reviewed', 1, 'Breaking down large goals: Impact on persistence and achievement', '2019', 'https://doi.org/10.1007/s11031-019-09754-3', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT04-054 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-054';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The relationship between anxiety and performance: A classic revisited', '1908', 'https://doi.org/10.1111/j.2044-8295.1908.tb00264.x', 'British Journal of Psychology', 1),
      (v_art_id, 'textbook', 5, 'Flow: The Psychology of Optimal Experience', '1990', 'https://www.worldcat.org/title/flow-the-psychology-of-optimal-experience/oclc/20689252', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Seeking challenges: The dynamics of growth and fixed mindsets', '2013', 'https://doi.org/10.1037/a0031120', 'Journal of Personality and Social Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Stress inoculation training: A preventative and treatment approach', '2017', 'https://doi.org/10.1016/j.beth.2016.11.007', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Neuroplasticity and skill acquisition: The role of challenge', '2015', 'https://doi.org/10.1038/nn.4091', 'Nature Neuroscience', 5),
      (v_art_id, 'peer_reviewed', 1, 'Approach versus avoidance motivation and self-regulation', '2019', 'https://doi.org/10.1037/rev0000151', 'Psychological Review', 6),
      (v_art_id, 'peer_reviewed', 1, 'Graduated exposure and anxiety reduction', '2018', 'https://doi.org/10.1016/j.cpr.2018.03.003', 'Clinical Psychology Review', 7),
      (v_art_id, 'peer_reviewed', 1, 'Growth mindset interventions: Meta-analysis of effects', '2020', 'https://doi.org/10.1177/0956797620924670', 'Psychological Science', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT04-055 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-055';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'A theory of social comparison processes', '1954', 'https://doi.org/10.1177/001872675400700202', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Social comparison orientation and its relationship to well-being', '2016', 'https://doi.org/10.1521/jscp.2016.35.5.393', 'Journal of Social and Clinical Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Social media use and depression: A meta-analysis', '2021', 'https://doi.org/10.1016/j.jad.2020.11.072', 'Journal of Affective Disorders', 3),
      (v_art_id, 'peer_reviewed', 1, 'Upward and downward social comparisons: Impact on mood and self-esteem', '2017', 'https://doi.org/10.1177/0146167217713757', 'Personality and Social Psychology Bulletin', 4),
      (v_art_id, 'peer_reviewed', 1, 'Self-compassion and reduced social comparison', '2019', 'https://doi.org/10.1080/15298868.2019.1611965', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Gratitude and social comparison: Protective factors', '2018', 'https://doi.org/10.1037/emo0000402', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Personal standards vs. social comparison standards', '2020', 'https://doi.org/10.1007/s11031-020-09823-5', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness reduces automatic social comparison', '2018', 'https://doi.org/10.1007/s12671-018-0963-7', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT04-056 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-056';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'textbook', 5, 'Mindset: The New Psychology of Success', '2006', 'https://www.worldcat.org/title/mindset-the-new-psychology-of-success/oclc/62593145', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Failure and success: Understanding the dark side of achievement', '2018', 'https://doi.org/10.1177/2041386618759066', 'Organizational Psychology Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Learning from failure: A meta-analysis', '2019', 'https://doi.org/10.1037/apl0000385', 'Journal of Applied Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Attribution theory and learned helplessness', '1978', 'https://doi.org/10.1037/0033-295X.85.2.96', 'Psychological Review', 4),
      (v_art_id, 'peer_reviewed', 1, 'Resilience and recovery from failure', '2020', 'https://doi.org/10.1037/amp0000598', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Error management training: Learning from mistakes', '2017', 'https://doi.org/10.1002/job.2216', 'Journal of Organizational Behavior', 6),
      (v_art_id, 'peer_reviewed', 1, 'Catastrophizing and emotional resilience', '2019', 'https://doi.org/10.1016/j.brat.2019.03.006', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Post-traumatic growth: Building from adversity', '2018', 'https://doi.org/10.1002/jts.22303', 'Journal of Traumatic Stress', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT04-057 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-057';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'textbook', 5, 'The Book of Lists: Fear of public speaking ranks #1', '1977', 'https://www.worldcat.org/title/book-of-lists/oclc/3033542', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive-behavioral therapy for public speaking anxiety', '2017', 'https://doi.org/10.1016/j.beth.2016.09.008', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Exposure therapy for social anxiety: Graduated vs. flooding', '2018', 'https://doi.org/10.1016/j.cpr.2018.01.004', 'Clinical Psychology Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'Preparation and performance anxiety reduction', '2019', 'https://doi.org/10.1080/03634523.2019.1606433', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Audience perception vs. speaker perception of performance', '2016', 'https://doi.org/10.1080/00224545.2016.1152215', 'Journal of Social Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Virtual reality exposure therapy for public speaking anxiety', '2020', 'https://doi.org/10.1016/j.janxdis.2020.102231', 'Journal of Anxiety Disorders', 6),
      (v_art_id, 'peer_reviewed', 1, 'Reappraisal of physiological arousal in performance', '2014', 'https://doi.org/10.1037/a0035325', 'Journal of Experimental Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Practice effects on public speaking competence', '2018', 'https://doi.org/10.1080/01463373.2018.1491871', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT04-058 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-058';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Social anxiety disorder: Recognition, assessment and treatment', '2018', 'https://doi.org/10.1192/bjp.2018.115', 'British Journal of Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Self-focused attention and social anxiety', '2016', 'https://doi.org/10.1016/j.brat.2016.08.003', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Exposure therapy for social anxiety: Mechanisms of change', '2019', 'https://doi.org/10.1016/j.cpr.2019.03.006', 'Clinical Psychology Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'Active listening and relationship quality', '2017', 'https://doi.org/10.1177/0093650217715470', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Curiosity and social connection', '2018', 'https://doi.org/10.1111/jopy.12319', 'Journal of Personality', 5),
      (v_art_id, 'peer_reviewed', 1, 'Rejection sensitivity and social avoidance', '2019', 'https://doi.org/10.1177/0146167219826989', 'Personality and Social Psychology Bulletin', 6),
      (v_art_id, 'peer_reviewed', 1, 'Impression management and authenticity', '2020', 'https://doi.org/10.1016/j.jesp.2020.104018', 'Journal of Experimental Social Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness and reduced social anxiety', '2018', 'https://doi.org/10.1111/cpsp.12253', 'Clinical Psychology: Science and Practice', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT04-059 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-059';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Power posing: Brief nonverbal displays affect neuroendocrine levels and risk tolerance', '2010', 'https://doi.org/10.1177/0956797610383437', 'Psychological Science', 1),
      (v_art_id, 'peer_reviewed', 1, 'Embodied cognition: The influence of bodily states on mental states', '2017', 'https://doi.org/10.1016/j.tics.2017.04.009', 'Trends in Cognitive Sciences', 2),
      (v_art_id, 'peer_reviewed', 1, 'Posture and mood: A systematic review', '2019', 'https://doi.org/10.1007/s10865-019-00031-2', 'Journal of Behavioral Medicine', 3),
      (v_art_id, 'peer_reviewed', 1, 'The replication crisis and power posing research', '2017', 'https://doi.org/10.1080/23743603.2017.1341029', 'Comprehensive Results in Social Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Facial feedback hypothesis: A meta-analysis', '2019', 'https://doi.org/10.1037/bul0000194', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Upright posture and positive affect', '2018', 'https://doi.org/10.1002/ejsp.2362', 'European Journal of Social Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Body language in social perception', '2020', 'https://doi.org/10.1007/s10919-020-00327-4', 'Journal of Nonverbal Behavior', 7),
      (v_art_id, 'peer_reviewed', 1, 'Eye contact and confidence perception', '2018', 'https://doi.org/10.1080/02699931.2018.1454831', NULL, 8),
      (v_art_id, 'peer_reviewed', 1, 'Posture and self-perception: Embodiment effects', '2021', 'https://doi.org/10.1037/emo0000911', NULL, 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT04-060 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT04-060';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Narcissism vs. self-esteem: Distinguishing adaptive from maladaptive self-regard', '2017', 'https://doi.org/10.1111/jopy.12291', 'Journal of Personality', 1),
      (v_art_id, 'peer_reviewed', 1, 'Intellectual humility: An emerging framework', '2019', 'https://doi.org/10.1177/0963721419838233', 'Current Directions in Psychological Science', 2),
      (v_art_id, 'peer_reviewed', 1, 'Confidence without competence: The Dunning-Kruger effect', '1999', 'https://doi.org/10.1037/0022-3514.77.6.1121', 'Journal of Personality and Social Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Secure vs. defensive high self-esteem', '2018', 'https://doi.org/10.1177/0956797618772826', 'Psychological Science', 4),
      (v_art_id, 'peer_reviewed', 1, 'Hubristic and authentic pride: Different emotional experiences', '2016', 'https://doi.org/10.1037/emo0000087', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Leader humility and team performance', '2020', 'https://doi.org/10.5465/amj.2017.0310', 'Academy of Management Journal', 6),
      (v_art_id, 'peer_reviewed', 1, 'Growth mindset and willingness to learn from mistakes', '2019', 'https://doi.org/10.1037/edu0000313', 'Journal of Educational Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Self-enhancement vs. self-verification', '2018', 'https://doi.org/10.1037/rev0000097', 'Psychological Review', 8)
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
