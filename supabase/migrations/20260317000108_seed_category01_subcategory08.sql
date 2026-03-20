-- ============================================================================
-- Seed: Category 1 (Emotional Regulation & Self-Awareness) — Subcategory 08
-- 10 articles: CAT01-071 through CAT01-080
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert Category if not present
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  'Emotional Regulation & Self-Awareness',
  'emotional-regulation',
  '',
  'Brain',
  1,
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'emotional-regulation';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Emotional Complexity Growth', 'emotional-complexity-growth', v_cat_id, 8)
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'emotional-regulation';
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'emotional-complexity-growth' AND category_id = v_cat_id;

  -- CAT01-071: Emotional Agility: Moving Flexibly Through Complex Feelings
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Emotional Agility: Moving Flexibly Through Complex Feelings',
    'emotional-agility-moving-flexibly-through-complex-feelings',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Emotional Agility', 'Psychological Flexibility', 'Advanced Skills', 'Growth'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-071',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learning to navigate the full range of emotions with flexibility rather than rigidity, allowing feelings without being controlled by them.',
    '/images/articles/cat01/cover-071.svg',
    8,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-072: Holding Two Feelings at Once: The Skill of Emotional Dialectics
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Holding Two Feelings at Once: The Skill of Emotional Dialectics',
    'holding-two-feelings-at-once-skill-of-emotional-dialectics',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Emotional Complexity', 'Dialectical Thinking', 'Ambivalence', 'Growth'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-072',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learning to hold seemingly contradictory emotions simultaneously—a mark of emotional maturity and psychological flexibility.',
    '/images/articles/cat01/cover-072.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-073: Post-Traumatic Growth and Emotional Transformation
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Post-Traumatic Growth and Emotional Transformation',
    'post-traumatic-growth-and-emotional-transformation',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Post-Traumatic Growth', 'Resilience', 'Transformation', 'Adversity'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-073',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How adversity can lead to profound positive changes in worldview, relationships, and sense of self—without minimizing the pain experienced.',
    '/images/articles/cat01/cover-073.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-074: The Role of Positive Emotions in Building Resilience
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Role of Positive Emotions in Building Resilience',
    'role-of-positive-emotions-in-building-resilience',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Positive Emotions', 'Resilience', 'Research', 'Wellbeing'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-074',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Scientific evidence showing how positive emotions broaden thinking, build resources, and create upward spirals of wellbeing and resilience.',
    '/images/articles/cat01/cover-074.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-075: Emotional Wisdom: What Research Says About Growing Through Difficulty
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Emotional Wisdom: What Research Says About Growing Through Difficulty',
    'emotional-wisdom-what-research-says-about-growing-through-difficulty',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Wisdom', 'Emotional Growth', 'Research', 'Life Experience'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-075',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The science of wisdom—how emotional experience, reflection, and perspective-taking combine to create better life navigation.',
    '/images/articles/cat01/cover-075.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-076: Alexithymia: When You Can
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Alexithymia: When You Can',
    'alexithymia-when-you-cant-identify-or-describe-your-emotions',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Alexithymia', 'Emotional Awareness', 'Mental Health Conditions', 'Interoception'],
    1800,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-076',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding alexithymia—difficulty identifying and describing emotions—including causes, impact, and strategies for developing emotional awareness.',
    '/images/articles/cat01/cover-076.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-077: Emotion-Focused Therapy: What It Is and Who It Helps
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Emotion-Focused Therapy: What It Is and Who It Helps',
    'emotion-focused-therapy-what-it-is-and-who-it-helps',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Emotion-Focused Therapy', 'Treatment', 'Psychotherapy', 'EFT'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-077',
    v_cat_id,
    v_sub_id,
    'drafted',
    'An evidence-based therapy that helps people access, understand, and transform difficult emotions to improve mental health and relationships.',
    '/images/articles/cat01/cover-077.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-078: Radical Acceptance: Letting Go of the Fight Against Your Feelings
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Radical Acceptance: Letting Go of the Fight Against Your Feelings',
    'radical-acceptance-letting-go-of-fight-against-your-feelings',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Radical Acceptance', 'DBT', 'Mindfulness', 'Letting Go'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-078',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learning to accept reality and emotions as they are—not as you wish they were—to reduce suffering and create space for change.',
    '/images/articles/cat01/cover-078.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-079: Emotional Mastery vs. Emotional Control: Why the Difference Matters
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Emotional Mastery vs. Emotional Control: Why the Difference Matters',
    'emotional-mastery-vs-emotional-control-why-difference-matters',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Emotional Mastery', 'Self-Regulation', 'Emotional Intelligence', 'Wisdom'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-079',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding the crucial distinction between mastery (working with emotions) and control (fighting them)—and why one leads to wellbeing, the other to suffering.',
    '/images/articles/cat01/cover-079.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-080: Your Emotional Future: Building a Lifelong Practice of Emotional Awareness
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Your Emotional Future: Building a Lifelong Practice of Emotional Awareness',
    'your-emotional-future-building-lifelong-practice-of-emotional-awareness',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Emotional Growth', 'Lifelong Learning', 'Self-Development', 'Wellbeing'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-080',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Creating a sustainable, personalized approach to emotional wellbeing that evolves with you across all of life',
    '/images/articles/cat01/cover-080.svg',
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

  -- === CAT01-071 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-071';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'textbook', 5, 'Emotional Agility: Get Unstuck, Embrace Change, and Thrive in Work and Life', '2016', 'https://www.hbr.org/2016/11/emotional-agility', 'Harvard Business Review Press', 1),
      (v_art_id, 'peer_reviewed', 1, 'Psychological flexibility as a fundamental aspect of health', '2010', 'https://doi.org/10.1016/j.cpr.2010.03.001', 'Clinical Psychology Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Acceptance and commitment therapy: Model, processes and outcomes', '2006', 'https://doi.org/10.1016/j.brat.2005.06.006', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Emotional agility and wellbeing', '2019', 'https://doi.org/10.1080/17439760.2018.1497689', 'Journal of Positive Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'The role of values in psychological flexibility', '2020', 'https://doi.org/10.1177/0145445519868508', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness and emotional agility', '2019', 'https://doi.org/10.1007/s12671-018-1075-4', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Defusion techniques in ACT', '2020', 'https://doi.org/10.1016/j.jcbs.2020.03.003', 'Journal of Contextual Behavioral Science', 7),
      (v_art_id, 'professional_org', 3, 'Building Emotional Agility', '2021', 'https://www.apa.org/topics/healthy-workplaces/emotional-agility', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-072 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-072';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'textbook', 5, 'Dialectical Behavior Therapy Skills Training Manual', '2014', 'https://www.guilford.com/books/DBT-Skills-Training-Manual/Marsha-Linehan/9781462516995', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Emotional complexity and psychological wellbeing', '2020', 'https://doi.org/10.1037/emo0000744', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Mixed emotions and wellbeing', '2019', 'https://doi.org/10.1080/02699931.2018.1472049', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Ambivalence and decision-making', '2020', 'https://doi.org/10.1037/rev0000200', 'Psychological Review', 4),
      (v_art_id, 'peer_reviewed', 1, 'Development of emotional complexity across adulthood', '2019', 'https://doi.org/10.1037/dev0000698', 'Developmental Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Dialectical thinking and mental health', '2020', 'https://doi.org/10.1007/s10804-019-09340-2', 'Journal of Adult Development', 6),
      (v_art_id, 'peer_reviewed', 1, 'Both-and thinking vs either-or thinking', '2021', 'https://doi.org/10.1037/amp0000661', NULL, 7),
      (v_art_id, 'professional_org', 3, 'Understanding Complex Emotions', '2021', 'https://www.apa.org/topics/emotion/complex', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-073 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-073';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Posttraumatic growth: Conceptual foundations and empirical evidence', '2004', 'https://doi.org/10.1207/s15327965pli1501_01', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Posttraumatic growth in the face of trauma: A meta-analytic review', '2018', 'https://doi.org/10.1016/j.cpr.2018.01.002', 'Clinical Psychology Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'The relationship between posttraumatic stress and posttraumatic growth', '2020', 'https://doi.org/10.1002/jts.22492', 'Journal of Traumatic Stress', 3),
      (v_art_id, 'peer_reviewed', 1, 'Meaning-making and posttraumatic growth', '2019', 'https://doi.org/10.1037/amp0000407', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Cultural differences in posttraumatic growth', '2020', 'https://doi.org/10.1177/0022022120910803', 'Journal of Cross-Cultural Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Facilitating posttraumatic growth: A clinical approach', '2021', 'https://doi.org/10.1002/jclp.23146', 'Journal of Clinical Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Growth through adversity: The role of social support', '2020', 'https://doi.org/10.1016/j.socscimed.2020.112845', 'Social Science & Medicine', 7),
      (v_art_id, 'professional_org', 3, 'Understanding Post-Traumatic Growth', '2021', 'https://www.apa.org/topics/trauma/growth', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-074 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-074';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The broaden-and-build theory of positive emotions', '2004', 'https://doi.org/10.1098/rstb.2004.1512', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Positive emotions and resilience', '2018', 'https://doi.org/10.1177/0963721418790447', 'Current Directions in Psychological Science', 2),
      (v_art_id, 'peer_reviewed', 1, 'Upward spirals of positive emotions', '2019', 'https://doi.org/10.1177/0956797618823850', 'Psychological Science', 3),
      (v_art_id, 'peer_reviewed', 1, 'Positive emotions following adversity', '2020', 'https://doi.org/10.1037/pspi0000222', 'Journal of Personality and Social Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Cultivating positive emotions for mental health', '2021', 'https://doi.org/10.1016/j.cpr.2021.102012', 'Clinical Psychology Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'The physiology of positive emotions', '2020', 'https://doi.org/10.1037/emo0000640', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Positive affect and health', '2019', 'https://doi.org/10.1037/bul0000194', NULL, 7),
      (v_art_id, 'professional_org', 3, 'Building Resilience Through Positive Emotions', '2021', 'https://www.apa.org/topics/resilience/positive-emotions', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-075 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-075';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Wisdom: A metaheuristic to orchestrate mind and virtue', '2005', 'https://doi.org/10.1037/0003-066X.60.3.269', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'The neuroscience of wisdom', '2019', 'https://doi.org/10.1080/2194587X.2019.1613159', 'Journal of College and Character', 2),
      (v_art_id, 'peer_reviewed', 1, 'Life experience and the development of wisdom', '2020', 'https://doi.org/10.1177/0165025419896721', 'International Journal of Behavioral Development', 3),
      (v_art_id, 'peer_reviewed', 1, 'Emotional wisdom and wellbeing', '2021', 'https://doi.org/10.3389/fpsyg.2021.620062', 'Frontiers in Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Wise reasoning and emotion regulation', '2020', 'https://doi.org/10.1080/02699931.2019.1707081', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Cultural perspectives on wisdom', '2019', 'https://doi.org/10.1177/0022022118806586', 'Journal of Cross-Cultural Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'The role of humility in wisdom', '2020', 'https://doi.org/10.1177/1088868319875802', 'Personality and Social Psychology Review', 7),
      (v_art_id, 'professional_org', 3, 'Developing Wisdom', '2021', 'https://greatergood.berkeley.edu/topic/wisdom', 'Greater Good Science Center', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-076 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-076';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Alexithymia: A general deficit of interoception', '2017', 'https://doi.org/10.1098/rsos.170058', 'Royal Society Open Science', 1),
      (v_art_id, 'peer_reviewed', 1, 'Prevalence and clinical correlates of alexithymia', '2020', 'https://doi.org/10.1016/j.comppsych.2020.152177', 'Comprehensive Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Alexithymia in autism spectrum disorder', '2019', 'https://doi.org/10.1186/s13229-019-0285-7', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Neural correlates of alexithymia', '2021', 'https://doi.org/10.1016/j.neubiorev.2021.02.011', 'Neuroscience & Biobehavioral Reviews', 4),
      (v_art_id, 'peer_reviewed', 1, 'Treatment approaches for alexithymia', '2020', 'https://doi.org/10.3389/fpsyt.2020.00300', 'Frontiers in Psychiatry', 5),
      (v_art_id, 'peer_reviewed', 1, 'Alexithymia and mental health outcomes', '2020', 'https://doi.org/10.1016/j.jpsychores.2020.109995', 'Journal of Psychosomatic Research', 6),
      (v_art_id, 'peer_reviewed', 1, 'Interoceptive awareness training', '2019', 'https://doi.org/10.1016/j.biopsycho.2019.107792', 'Biological Psychology', 7),
      (v_art_id, 'professional_org', 3, 'Understanding Alexithymia', '2021', 'https://www.apa.org/topics/personality/alexithymia', NULL, 8),
      (v_art_id, 'peer_reviewed', 1, 'Toronto Alexithymia Scale', '1994', 'https://doi.org/10.1016/0022-3999(94)90005-1', 'Journal of Psychosomatic Research', 9),
      (v_art_id, 'peer_reviewed', 1, 'Alexithymia and eating disorders', '2020', 'https://doi.org/10.1007/s40519-019-00825-z', NULL, 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-077 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-077';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'textbook', 5, 'Emotion-Focused Therapy: Coaching Clients to Work Through Their Feelings', '2015', 'https://doi.org/10.1037/14692-000', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Effectiveness of emotion-focused therapy: A meta-analysis', '2013', 'https://doi.org/10.1037/a0033584', 'Journal of Consulting and Clinical Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Mechanisms of change in emotion-focused therapy', '2020', 'https://doi.org/10.1080/10503307.2019.1633323', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Emotionally focused therapy for couples', '2019', 'https://doi.org/10.1111/jmft.12336', 'Journal of Marital and Family Therapy', 4),
      (v_art_id, 'peer_reviewed', 1, 'EFT for depression: RCT outcomes', '2020', 'https://doi.org/10.1002/da.22989', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Working with emotion schemes in therapy', '2019', 'https://doi.org/10.1002/cpp.2397', 'Clinical Psychology & Psychotherapy', 6),
      (v_art_id, 'peer_reviewed', 1, 'EFT for trauma and complex trauma', '2021', 'https://doi.org/10.1002/jts.22622', 'Journal of Traumatic Stress', 7),
      (v_art_id, 'professional_org', 3, 'Finding an EFT Therapist', '2021', 'https://www.iseft.org', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-078 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-078';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Radical acceptance in dialectical behavior therapy', '2020', 'https://doi.org/10.1016/j.cbpra.2019.07.010', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Acceptance and mental health outcomes', '2019', 'https://doi.org/10.1016/j.cpr.2018.12.007', 'Clinical Psychology Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'The role of acceptance in reducing suffering', '2020', 'https://doi.org/10.1016/j.brat.2019.103513', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Radical acceptance and PTSD recovery', '2021', 'https://doi.org/10.1002/jts.22650', 'Journal of Traumatic Stress', 4),
      (v_art_id, 'textbook', 5, 'Radical Acceptance: Embracing Your Life With the Heart of a Buddha', '2003', 'https://www.tarabrach.com/radical-acceptance', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness and acceptance-based interventions', '2020', 'https://doi.org/10.1037/ccp0000498', 'Journal of Consulting and Clinical Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Acceptance vs resignation: Important distinction', '2019', 'https://doi.org/10.1007/s12671-019-01089-2', NULL, 7),
      (v_art_id, 'professional_org', 3, 'Practicing Radical Acceptance', '2021', 'https://www.dbtselfhelp.com/radical-acceptance', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-079 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-079';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Emotion regulation strategies and mental health', '2020', 'https://doi.org/10.1016/j.cpr.2020.101859', 'Clinical Psychology Review', 1),
      (v_art_id, 'peer_reviewed', 1, 'Suppression vs reappraisal: Long-term effects', '2019', 'https://doi.org/10.1037/pspi0000186', 'Journal of Personality and Social Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Emotional acceptance and psychological flexibility', '2020', 'https://doi.org/10.1016/j.beth.2019.07.001', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'The costs of emotional suppression', '2019', 'https://doi.org/10.1037/emo0000541', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness and emotion regulation', '2020', 'https://doi.org/10.1111/cpsp.12334', 'Clinical Psychology: Science and Practice', 5),
      (v_art_id, 'peer_reviewed', 1, 'Working with emotions in therapy', '2021', 'https://doi.org/10.1080/10503307.2020.1847345', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Cultural differences in emotion regulation', '2020', 'https://doi.org/10.1177/1088868319895062', 'Personality and Social Psychology Review', 7),
      (v_art_id, 'professional_org', 3, 'Developing Emotional Mastery', '2021', 'https://www.apa.org/topics/emotion/regulation', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-080 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-080';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Lifespan development of emotional competence', '2020', 'https://doi.org/10.1037/dev0001024', 'Developmental Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Building sustainable wellbeing practices', '2021', 'https://doi.org/10.1080/17439760.2020.1789695', 'Journal of Positive Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Emotional self-care across the lifespan', '2020', 'https://doi.org/10.1016/j.cpr.2020.101886', 'Clinical Psychology Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'Maintaining mental health practices long-term', '2021', 'https://doi.org/10.1016/j.brat.2021.103868', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Personalizing emotion regulation strategies', '2020', 'https://doi.org/10.1037/emo0000726', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'The role of self-compassion in emotional growth', '2019', 'https://doi.org/10.1007/s12671-019-01204-3', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Community and social support for wellbeing', '2020', 'https://doi.org/10.1037/amp0000598', NULL, 7),
      (v_art_id, 'professional_org', 3, 'Creating Your Personal Wellbeing Plan', '2021', 'https://www.apa.org/topics/mental-health/wellbeing-plan', NULL, 8)
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
  WHERE a.article_production_id LIKE 'CAT01-%';

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;
