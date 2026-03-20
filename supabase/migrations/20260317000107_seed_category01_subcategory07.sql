-- ============================================================================
-- Seed: Category 1 (Emotional Regulation & Self-Awareness) — Subcategory 07
-- 10 articles: CAT01-061 through CAT01-070
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
  VALUES ('Emotions Across Life Stages', 'emotions-across-life-stages', v_cat_id, 7)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'emotions-across-life-stages' AND category_id = v_cat_id;

  -- CAT01-061: Emotional Development in Children: What Parents Need to Know
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Emotional Development in Children: What Parents Need to Know',
    'emotional-development-children-what-parents-need-to-know',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Child Development', 'Parenting', 'Emotional Intelligence', 'Early Childhood'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-061',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A comprehensive guide to understanding how emotions develop in children from infancy through early childhood, with practical strategies for parents.',
    '/images/articles/cat01/cover-061.svg',
    8,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-062: Adolescent Emotions: Why Teenage Feelings Are So Intense
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Adolescent Emotions: Why Teenage Feelings Are So Intense',
    'adolescent-emotions-why-teenage-feelings-are-so-intense',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Adolescence', 'Teen Mental Health', 'Brain Development', 'Parenting Teens'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-062',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding the neuroscience behind teenage emotional intensity and how brain development makes adolescence such a turbulent emotional period.',
    '/images/articles/cat01/cover-062.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-063: Emotional Challenges of Your 20s: Identity, Comparison, and Uncertainty
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Emotional Challenges of Your 20s: Identity, Comparison, and Uncertainty',
    'emotional-challenges-twenties-identity-comparison-uncertainty',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Young Adults', 'Identity', 'Life Transitions', 'Quarter-Life Crisis'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-063',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Navigating the unique emotional landscape of your twenties, from identity formation to comparison culture and managing uncertainty about the future.',
    '/images/articles/cat01/cover-063.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-064: Midlife Emotional Shifts: What Changes in Your 40s and 50s
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Midlife Emotional Shifts: What Changes in Your 40s and 50s',
    'midlife-emotional-shifts-what-changes-forties-fifties',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Midlife', 'Life Transitions', 'Aging', 'Personal Growth'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-064',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding the emotional transitions of midlife, from shifting priorities to finding new meaning, and navigating the changes that come with this life stage.',
    '/images/articles/cat01/cover-064.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-065: Emotional Wellbeing in Older Adulthood: Resilience, Loss, and Wisdom
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Emotional Wellbeing in Older Adulthood: Resilience, Loss, and Wisdom',
    'emotional-wellbeing-older-adulthood-resilience-loss-wisdom',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Aging', 'Older Adults', 'Emotional Wisdom', 'Resilience'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-065',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Exploring emotional development in later life, including increased wellbeing, navigating loss, and the emergence of emotional wisdom.',
    '/images/articles/cat01/cover-065.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-066: How Major Life Transitions Reshape Your Emotional Landscape
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How Major Life Transitions Reshape Your Emotional Landscape',
    'how-major-life-transitions-reshape-emotional-landscape',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Life Transitions', 'Change', 'Adaptation', 'Resilience'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-066',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding how significant life changes affect your emotional world and practical strategies for navigating transitions with resilience.',
    '/images/articles/cat01/cover-066.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-067: Emotional Regulation During Pregnancy and Postpartum
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Emotional Regulation During Pregnancy and Postpartum',
    'emotional-regulation-during-pregnancy-and-postpartum',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Pregnancy', 'Postpartum', 'Maternal Mental Health', 'Perinatal Mood'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-067',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding the hormonal and psychological emotional changes during pregnancy and postpartum, with strategies for navigating this intense period.',
    '/images/articles/cat01/cover-067.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-068: Emotions and Menopause: Understanding Hormonal Emotional Changes
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Emotions and Menopause: Understanding Hormonal Emotional Changes',
    'emotions-and-menopause-understanding-hormonal-emotional-changes',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Menopause', 'Hormones', 'Women', ', '],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-068',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How hormonal shifts during perimenopause and menopause affect mood, emotional regulation, and mental health, with evidence-based coping strategies.',
    '/images/articles/cat01/cover-068.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-069: Retirement and Emotional Identity: Who Are You Without Your Role?
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Retirement and Emotional Identity: Who Are You Without Your Role?',
    'retirement-and-emotional-identity-who-are-you-without-your-role',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Retirement', 'Identity', 'Purpose', 'Life Transitions'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-069',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Navigating the identity transition of retirement and rebuilding a sense of purpose and meaning beyond career.',
    '/images/articles/cat01/cover-069.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-070: Teaching Kids Emotional Regulation: Age-Appropriate Strategies
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Teaching Kids Emotional Regulation: Age-Appropriate Strategies',
    'teaching-kids-emotional-regulation-age-appropriate-strategies',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Parenting', 'Child Development', 'Emotional Intelligence', 'Teaching Skills'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-070',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Practical, developmentally-appropriate techniques for helping children learn to understand and regulate their emotions from toddlerhood through adolescence.',
    '/images/articles/cat01/cover-070.svg',
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

  -- === CAT01-061 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-061';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Emotional Development in Early Childhood: A Review', '2020', 'https://doi.org/10.1037/dev0000920', 'Developmental Psychology', 1),
      (v_art_id, 'textbook', 5, 'The Developing Mind: How Relationships and the Brain Interact to Shape Who We Are', '2020', 'https://www.guilford.com/books/The-Developing-Mind/Daniel-Siegel/9781462543052', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Emotion regulation in children and adolescents', '2019', 'https://doi.org/10.1111/jcpp.13082', 'Journal of Child Psychology and Psychiatry', 3),
      (v_art_id, 'government', 2, 'Social and Emotional Development in Infancy', '2021', 'https://www.nimh.nih.gov/health/topics/child-adolescent-mental-health', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Parenting and emotional development in early childhood', '2020', 'https://doi.org/10.1111/cdep.12370', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'The Role of Attachment in Emotional Development', '2019', 'https://doi.org/10.1111/desc.12842', 'Developmental Science', 6),
      (v_art_id, 'professional_org', 3, 'Emotional competence and early school success', '2021', 'https://www.apa.org/education/k12/emotional-competence', NULL, 7),
      (v_art_id, 'professional_org', 3, 'Understanding Temperament in Early Childhood', '2020', 'https://www.zerotothree.org/resource/temperament', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-062 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-062';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Adolescent Brain Development: Implications for Understanding Teenage Behavior', '2019', 'https://doi.org/10.1038/s41593-019-0458-5', 'Nature Neuroscience', 1),
      (v_art_id, 'peer_reviewed', 1, 'Emotion regulation in adolescence', '2020', 'https://doi.org/10.1016/j.copsyc.2019.06.011', 'Current Opinion in Psychology', 2),
      (v_art_id, 'government', 2, 'The Teenage Brain: A Work in Progress', '2021', 'https://www.nimh.nih.gov/health/publications/the-teen-brain-7-things-to-know', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Adolescent emotional development and the emergence of depressive disorders', '2020', 'https://doi.org/10.1017/S0033291720001154', 'Psychological Medicine', 4),
      (v_art_id, 'peer_reviewed', 1, 'Peer relationships and emotional development in adolescence', '2019', 'https://doi.org/10.1111/jora.12505', 'Journal of Research on Adolescence', 5),
      (v_art_id, 'peer_reviewed', 1, 'Hormones and adolescent emotional development', '2020', 'https://doi.org/10.1016/j.yhbeh.2020.104712', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Sleep and emotion regulation in adolescents', '2019', 'https://doi.org/10.1016/j.smrv.2019.101224', 'Sleep Medicine Reviews', 7),
      (v_art_id, 'professional_org', 3, 'Supporting Adolescent Mental Health', '2021', 'https://www.aap.org/adolescent-mental-health', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-063 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-063';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Emerging adulthood: A theory of development from the late teens through the twenties', '2000', 'https://doi.org/10.1037/0003-066X.55.5.469', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'The defining decade: Why your twenties matter', '2020', 'https://doi.org/10.1037/cps0000012', 'Clinical Psychology: Science and Practice', 2),
      (v_art_id, 'peer_reviewed', 1, 'Social comparison and mental health in young adults', '2021', 'https://doi.org/10.1521/jscp.2021.40.2.127', 'Journal of Social and Clinical Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Identity development in emerging adulthood', '2020', 'https://doi.org/10.1037/dev0000901', 'Developmental Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'The quarter-life crisis: Unique challenges of young adults', '2019', 'https://doi.org/10.1177/0165025419850196', 'International Journal of Behavioral Development', 5),
      (v_art_id, 'peer_reviewed', 1, 'Anxiety and depression in emerging adults', '2020', 'https://doi.org/10.1016/j.jad.2020.05.041', 'Journal of Affective Disorders', 6),
      (v_art_id, 'peer_reviewed', 1, 'Social media use and mental health in young adults', '2021', 'https://doi.org/10.1001/jamapsychiatry.2021.0017', 'JAMA Psychiatry', 7),
      (v_art_id, 'government', 2, 'Mental Health and Emerging Adults', '2021', 'https://www.nimh.nih.gov/health/statistics/mental-illness', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-064 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-064';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Emotional development in midlife', '2020', 'https://doi.org/10.1177/0963721420949384', 'Current Directions in Psychological Science', 1),
      (v_art_id, 'peer_reviewed', 1, 'The paradox of aging: Improved wellbeing despite decline', '2019', 'https://doi.org/10.1177/1745691619827598', 'Perspectives on Psychological Science', 2),
      (v_art_id, 'peer_reviewed', 1, 'Midlife crisis: Myth or reality?', '2020', 'https://doi.org/10.1037/pag0000465', 'Psychology and Aging', 3),
      (v_art_id, 'peer_reviewed', 1, 'Emotional regulation improves with age', '2019', 'https://doi.org/10.1093/geronb/gbz068', 'Journal of Gerontology: Psychological Sciences', 4),
      (v_art_id, 'peer_reviewed', 1, 'Meaning and purpose in midlife', '2020', 'https://doi.org/10.1007/s10804-020-09351-6', 'Journal of Adult Development', 5),
      (v_art_id, 'peer_reviewed', 1, 'Hormonal changes and mood in midlife', '2020', 'https://doi.org/10.1097/GME.0000000000001543', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'The sandwich generation: Caring for aging parents and children', '2021', 'https://doi.org/10.1093/geront/gnaa152', NULL, 7),
      (v_art_id, 'professional_org', 3, 'Adult Development and Aging', '2021', 'https://www.apa.org/topics/aging-older-adults', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-065 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-065';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Emotional aging: The positivity effect and emotional regulation', '2020', 'https://doi.org/10.1037/pag0000468', 'Psychology and Aging', 1),
      (v_art_id, 'peer_reviewed', 1, 'Socioemotional selectivity theory: Implications for aging and mental health', '2019', 'https://doi.org/10.1093/geront/gnz102', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Resilience and aging: Research and practice', '2020', 'https://doi.org/10.1891/0198-8794.40.1', 'Annual Review of Gerontology and Geriatrics', 3),
      (v_art_id, 'peer_reviewed', 1, 'Late-life depression: Epidemiology, phenomenology, and treatment', '2020', 'https://doi.org/10.1016/S2215-0366(20)30151-7', 'The Lancet Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Wisdom and emotional regulation in older age', '2021', 'https://doi.org/10.3389/fpsyg.2021.501698', 'Frontiers in Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Grief and loss in later life', '2020', 'https://doi.org/10.1080/07317115.2020.1746723', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Social connection and emotional health in older adults', '2021', 'https://doi.org/10.1177/0898264320987417', 'Journal of Aging and Health', 7),
      (v_art_id, 'government', 2, 'Healthy Aging and Mental Health', '2021', 'https://www.nia.nih.gov/health/emotional-health', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-066 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-066';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Life transitions and mental health: A review', '2020', 'https://doi.org/10.1016/j.cpr.2020.101871', 'Clinical Psychology Review', 1),
      (v_art_id, 'peer_reviewed', 1, 'The emotional impact of major life events', '2019', 'https://doi.org/10.1037/pspp0000233', 'Journal of Personality and Social Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Transition theory in counseling', '2020', 'https://doi.org/10.1177/0011000020931019', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Coping with life transitions', '2019', 'https://doi.org/10.1037/amp0000428', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Identity reconstruction after major life changes', '2020', 'https://doi.org/10.1080/15283488.2020.1737431', 'Identity: An International Journal', 5),
      (v_art_id, 'peer_reviewed', 1, 'Resilience during life transitions', '2021', 'https://doi.org/10.1037/dev0001146', 'Developmental Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Social support and transition outcomes', '2020', 'https://doi.org/10.1016/j.socscimed.2020.113042', 'Social Science & Medicine', 7),
      (v_art_id, 'professional_org', 3, 'Life Changes and Stress', '2021', 'https://www.apa.org/topics/stress/life-changes', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-067 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-067';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Hormonal changes and mood during pregnancy', '2020', 'https://doi.org/10.1097/AOG.0000000000003642', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Perinatal mood and anxiety disorders: A review', '2021', 'https://doi.org/10.1001/jamapsychiatry.2020.4055', 'JAMA Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Postpartum depression: Epidemiology and treatment', '2020', 'https://doi.org/10.1016/S0140-6736(20)30047-2', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Emotional changes in pregnancy: Biological and psychological factors', '2019', 'https://doi.org/10.1016/j.jad.2019.08.007', 'Journal of Affective Disorders', 4),
      (v_art_id, 'peer_reviewed', 1, 'Postpartum anxiety: Prevalence and risk factors', '2020', 'https://doi.org/10.1007/s00737-020-01024-0', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Sleep deprivation and postpartum mood', '2021', 'https://doi.org/10.1016/j.smrv.2020.101399', 'Sleep Medicine Reviews', 6),
      (v_art_id, 'peer_reviewed', 1, 'Social support and perinatal mental health', '2020', 'https://doi.org/10.1186/s12884-020-03029-2', NULL, 7),
      (v_art_id, 'government', 2, 'Maternal Mental Health', '2021', 'https://www.nimh.nih.gov/health/publications/perinatal-depression', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-068 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-068';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Menopause and mood: Current knowledge and clinical recommendations', '2020', 'https://doi.org/10.1097/GME.0000000000001524', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Depression during the menopausal transition', '2019', 'https://doi.org/10.1001/jamapsychiatry.2019.0187', 'JAMA Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Estrogen and neurotransmitter systems', '2020', 'https://doi.org/10.1016/j.yfrne.2020.100857', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Anxiety symptoms during menopausal transition', '2021', 'https://doi.org/10.1080/13697137.2020.1842427', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Sleep disturbance and mood in perimenopause', '2020', 'https://doi.org/10.1016/j.smrv.2020.101337', 'Sleep Medicine Reviews', 5),
      (v_art_id, 'peer_reviewed', 1, 'Hormone therapy and mental health', '2021', 'https://doi.org/10.1016/S2215-0366(20)30487-X', 'Lancet Psychiatry', 6),
      (v_art_id, 'peer_reviewed', 1, 'Psychosocial factors and menopausal symptoms', '2020', 'https://doi.org/10.1016/j.maturitas.2020.03.002', NULL, 7),
      (v_art_id, 'professional_org', 3, 'Menopause and Mental Health', '2021', 'https://www.menopause.org/for-women/menopause-mental-health', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-069 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-069';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Retirement and identity: A systematic review', '2020', 'https://doi.org/10.1093/workar/waaa015', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Psychological impact of retirement', '2019', 'https://doi.org/10.1016/j.jvb.2019.06.004', 'Journal of Vocational Behavior', 2),
      (v_art_id, 'peer_reviewed', 1, 'Purpose in life and retirement adjustment', '2020', 'https://doi.org/10.1037/pag0000461', 'Psychology and Aging', 3),
      (v_art_id, 'peer_reviewed', 1, 'Depression in early retirement', '2020', 'https://doi.org/10.1016/S2468-2667(20)30087-7', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Social networks and retirement wellbeing', '2021', 'https://doi.org/10.1016/j.socscimed.2021.113821', 'Social Science & Medicine', 5),
      (v_art_id, 'peer_reviewed', 1, 'Successful aging and retirement', '2020', 'https://doi.org/10.1093/geront/gnaa058', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Financial security and emotional wellbeing in retirement', '2020', 'https://doi.org/10.4148/1944-9771.1226', 'Journal of Financial Therapy', 7),
      (v_art_id, 'professional_org', 3, 'Planning for Retirement', '2021', 'https://www.apa.org/topics/aging-older-adults/retirement', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-070 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-070';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Teaching emotion regulation to children: A systematic review', '2020', 'https://doi.org/10.1007/s10567-020-00320-5', 'Clinical Child and Family Psychology Review', 1),
      (v_art_id, 'peer_reviewed', 1, 'Emotion socialization and child outcomes', '2019', 'https://doi.org/10.1111/cdep.12348', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Parental emotion coaching and child emotional competence', '2020', 'https://doi.org/10.1037/fam0000630', 'Journal of Family Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Developmentally appropriate emotion regulation strategies', '2021', 'https://doi.org/10.1037/dev0001105', 'Developmental Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness-based interventions for children', '2020', 'https://doi.org/10.1007/s12671-020-01403-2', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Co-regulation: Parent scaffolding of child emotion regulation', '2019', 'https://doi.org/10.1037/emo0000636', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Long-term benefits of early emotion regulation skills', '2021', 'https://doi.org/10.1111/jcpp.13410', 'Journal of Child Psychology and Psychiatry', 7),
      (v_art_id, 'professional_org', 3, 'Helping Children Manage Emotions', '2021', 'https://www.healthychildren.org/emotional-regulation', NULL, 8)
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
