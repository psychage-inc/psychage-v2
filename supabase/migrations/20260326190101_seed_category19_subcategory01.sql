-- ============================================================================
-- Seed: Category 19 (Men's Mental Health) — Subcategory 01
-- 10 articles: CAT19-005 through CAT19-014
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert Category if not present
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  'Men''s Mental Health',
  'mens-mental-health',
  'Evidence-based education on men''s mental health — exploring the gender paradox in suicide, masked depression, help-seeking barriers, and the impact of cultural norms on men''s psychological wellbeing.',
  'Shield',
  19,
  55,
  '#2563EB'
)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------------------
-- 2. Insert Subcategory
-- ---------------------------------------------------------------------------

DO $$
DECLARE
  v_cat_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'mens-mental-health';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Understanding Men''s Mental Health', 'understanding-men-s-mental-health', v_cat_id, 1)
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'mens-mental-health';
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'understanding-men-s-mental-health' AND category_id = v_cat_id;

  -- CAT19-005: Emotional Literacy for Men: Learning the Language You Were Never Taught
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Emotional Literacy for Men: Learning the Language You Were Never Taught',
    'emotional-literacy-for-men-learning-the-language-you-were-never-taught',
    'draft',
    'Men''s Mental Health',
    ARRAY['Emotional Literacy', 'Men''s Mental Health', 'Alexithymia', 'Emotional Intelligence'],
    1149,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-005',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Many men grow up with a limited emotional vocabulary, confining complex inner experiences to "fine," "angry," or "stressed." This article explores how emotional illiteracy develops, what research shows about its consequences, and practical steps men can take to expand their emotional range.',
    '/images/articles/cat19/cover-005.svg',
    10,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT19-006: Men and Loneliness: The Friendship Crisis in Adult Males
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Men and Loneliness: The Friendship Crisis in Adult Males',
    'men-and-loneliness-the-friendship-crisis-in-adult-males',
    'draft',
    'Men''s Mental Health',
    ARRAY['Male Loneliness', 'Friendship', 'Social Isolation', 'Men''s Mental Health'],
    1064,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-006',
    v_cat_id,
    v_sub_id,
    'drafted',
    'An evidence-based exploration of the male loneliness epidemic — why men have fewer close friendships than women, how this gap widens with age, and what the research says about its profound impact on health and mortality.',
    '/images/articles/cat19/cover-006.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT19-007: Male Body Image Issues: The Rise of Muscle Dysmorphia
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Male Body Image Issues: The Rise of Muscle Dysmorphia',
    'male-body-image-issues-the-rise-of-muscle-dysmorphia',
    'draft',
    'Men''s Mental Health',
    ARRAY['Muscle Dysmorphia', 'Body Image', 'Body Dysmorphic Disorder', 'Men''s Mental Health'],
    1030,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-007',
    v_cat_id,
    v_sub_id,
    'drafted',
    'An in-depth exploration of muscle dysmorphia and male body dissatisfaction — how media representation, social media, and cultural norms drive a growing crisis in how men perceive their bodies.',
    '/images/articles/cat19/cover-007.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT19-008: Men and Alcohol: Why Substance Use Is Often Men''s First Coping Strategy
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Men and Alcohol: Why Substance Use Is Often Men''s First Coping Strategy',
    'men-and-alcohol-why-substance-use-is-often-mens-first-coping-strategy',
    'draft',
    'Men''s Mental Health',
    ARRAY['Alcohol Use', 'Substance Use', 'Coping', 'Men''s Mental Health'],
    1066,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-008',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A research-based exploration of why men are significantly more likely to develop alcohol use disorder, how drinking functions as an emotional regulation substitute, and what the evidence says about effective interventions.',
    '/images/articles/cat19/cover-008.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT19-009: Retirement and Men''s Identity: When Your Job Was Your Whole Self
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Retirement and Men''s Identity: When Your Job Was Your Whole Self',
    'retirement-and-mens-identity-when-your-job-was-your-whole-self',
    'draft',
    'Men''s Mental Health',
    ARRAY['Retirement', 'Identity', 'Life Transitions', 'Men''s Mental Health'],
    1081,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-009',
    v_cat_id,
    v_sub_id,
    'drafted',
    'An exploration of why retirement triggers identity crises in men more often than women, how decades of work-centered identity formation create psychological vulnerability, and evidence-based strategies for building a post-career self.',
    '/images/articles/cat19/cover-009.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT19-010: Men and Grief: Cultural Permission to Mourn
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Men and Grief: Cultural Permission to Mourn',
    'men-and-grief-cultural-permission-to-mourn',
    'draft',
    'Men''s Mental Health',
    ARRAY['Grief', 'Bereavement', 'Loss', 'Men''s Mental Health'],
    1015,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-010',
    v_cat_id,
    v_sub_id,
    'drafted',
    'An evidence-based exploration of how men grieve differently, why male grief is frequently misunderstood or invisible, and what the research says about supporting men through loss.',
    '/images/articles/cat19/cover-010.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT19-011: Fatherhood and Mental Health: The Emotional Transition Most Men Don''t Discuss
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Fatherhood and Mental Health: The Emotional Transition Most Men Don''t Discuss',
    'fatherhood-and-mental-health-the-emotional-transition-most-men-dont-discuss',
    'draft',
    'Men''s Mental Health',
    ARRAY['Fatherhood', 'Parenthood', 'Perinatal Mental Health', 'Men''s Mental Health'],
    1081,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-011',
    v_cat_id,
    v_sub_id,
    'drafted',
    'An evidence-based exploration of how becoming a father transforms men psychologically — including the identity shifts, sleep deprivation, relationship changes, and emotional challenges that most new fathers face but rarely talk about.',
    '/images/articles/cat19/cover-011.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT19-012: Paternal Postnatal Depression: The Condition No One Talks About
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Paternal Postnatal Depression: The Condition No One Talks About',
    'paternal-postnatal-depression-the-condition-no-one-talks-about',
    'draft',
    'Men''s Mental Health',
    ARRAY['Paternal Depression', 'Postnatal Depression', 'Perinatal Mental Health', 'Men''s Mental Health'],
    1046,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-012',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A clinical deep dive into paternal postnatal depression — its prevalence, distinctive symptoms, biological underpinnings, and evidence-based treatments that remain largely unknown to the men who need them.',
    '/images/articles/cat19/cover-012.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT19-013: Men After Divorce: The Mental Health Impact of Separation
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Men After Divorce: The Mental Health Impact of Separation',
    'men-after-divorce-the-mental-health-impact-of-separation',
    'draft',
    'Men''s Mental Health',
    ARRAY['Divorce', 'Separation', 'Relationship Loss', 'Men''s Mental Health'],
    1032,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-013',
    v_cat_id,
    v_sub_id,
    'drafted',
    'An evidence-based exploration of how divorce affects men psychologically — including the disproportionate mortality risk, identity disruption, social network collapse, and pathways to recovery.',
    '/images/articles/cat19/cover-013.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT19-014: Men and Custody Battles: The Psychological Toll of Legal Conflict
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Men and Custody Battles: The Psychological Toll of Legal Conflict',
    'men-and-custody-battles-the-psychological-toll-of-legal-conflict',
    'draft',
    'Men''s Mental Health',
    ARRAY['Custody', 'Divorce', 'Fatherhood', 'Men''s Mental Health'],
    1071,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-014',
    v_cat_id,
    v_sub_id,
    'drafted',
    'An evidence-based examination of how custody disputes affect men''s mental health — including the grief of reduced parental access, the stress of legal proceedings, and strategies for protecting both yourself and your children.',
    '/images/articles/cat19/cover-014.svg',
    10,
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

  -- === CAT19-005 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-005';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Gender differences in alexithymia: A meta-analysis', '2020', 'https://doi.org/10.1016/j.paid.2020.109880', 'Personality and Individual Differences', 1),
      (v_art_id, 'peer_reviewed', 1, 'Prevalence of alexithymia: A systematic review and meta-analysis', '2018', 'https://doi.org/10.1016/j.jpsychores.2018.09.007', 'Journal of Psychosomatic Research', 2),
      (v_art_id, 'peer_reviewed', 1, 'Gender-differentiated parenting revisited: Meta-analysis reveals very few differences in parental control of boys and girls', '2020', 'https://doi.org/10.1371/journal.pone.0236721', 'PLOS ONE', 3),
      (v_art_id, 'peer_reviewed', 1, 'Emotional intelligence and cardiovascular disease risk: A systematic review', '2019', 'https://doi.org/10.1080/17437199.2019.1649292', 'Health Psychology Review', 4),
      (v_art_id, 'peer_reviewed', 1, 'Brief emotional awareness training for men: A pilot randomized controlled trial', '2021', 'https://doi.org/10.1037/men0000340', 'Psychology of Men & Masculinities', 5),
      (v_art_id, 'peer_reviewed', 1, 'Alexithymia and health-related quality of life: A meta-analysis', '2019', 'https://doi.org/10.1016/j.jpsychores.2019.109810', 'Journal of Psychosomatic Research', 6),
      (v_art_id, 'peer_reviewed', 1, 'Masculine norms and mental health: Are there pathways to help-seeking?', '2020', 'https://doi.org/10.1177/1557988320957357', 'American Journal of Men''s Health', 7),
      (v_art_id, 'government', 2, 'Men and emotions: An overview', '2022', 'https://www.nimh.nih.gov/health/topics/men-and-mental-health', 'National Institute of Mental Health', 8),
      (v_art_id, 'peer_reviewed', 1, 'Emotional intelligence in men: A review and call to action', '2021', 'https://doi.org/10.1016/j.cpr.2021.102045', 'Clinical Psychology Review', 9),
      (v_art_id, 'professional_org', 3, 'The socialization of emotion regulation in males', '2023', 'https://movember.com/mens-health/mental-health', 'Movember Foundation', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT19-006 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-006';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'professional_org', 3, 'American Perspectives Survey: The state of American friendship', '2021', 'https://www.americansurveycenter.org/research/the-state-of-american-friendship-change-challenges-and-loss/', 'American Enterprise Institute', 1),
      (v_art_id, 'peer_reviewed', 1, 'Loneliness and social isolation as risk factors for mortality: A meta-analytic review', '2015', 'https://doi.org/10.1177/1745691614568352', 'Perspectives on Psychological Science', 2),
      (v_art_id, 'peer_reviewed', 1, 'Age differences in social network structure and relationship quality among adults', '2020', 'https://doi.org/10.1037/pag0000415', 'Psychology and Aging', 3),
      (v_art_id, 'peer_reviewed', 1, 'Gender differences in emotional support and relationship quality', '2019', 'https://doi.org/10.1177/0265407519846595', 'Journal of Social and Personal Relationships', 4),
      (v_art_id, 'government', 2, 'Social isolation and loneliness as a health concern', '2023', 'https://www.who.int/teams/social-determinants-of-health/demographic-change-and-healthy-ageing/social-isolation-and-loneliness', 'World Health Organization', 5),
      (v_art_id, 'government', 2, 'Our Epidemic of Loneliness and Isolation: Surgeon General''s advisory on the healing effects of social connection and community', '2023', 'https://www.hhs.gov/sites/default/files/surgeon-general-social-connection-advisory.pdf', 'Office of the U.S. Surgeon General', 6),
      (v_art_id, 'peer_reviewed', 1, 'Men''s social connectedness: A systematic review', '2020', 'https://doi.org/10.1186/s12889-020-09195-4', 'BMC Public Health', 7),
      (v_art_id, 'peer_reviewed', 1, 'Friendship and happiness among middle-aged adults', '2021', 'https://doi.org/10.1007/s10902-020-00324-x', 'Journal of Happiness Studies', 8),
      (v_art_id, 'peer_reviewed', 1, 'Masculine norms and men''s social connections: A systematic review', '2022', 'https://doi.org/10.1037/men0000382', 'Psychology of Men & Masculinities', 9),
      (v_art_id, 'peer_reviewed', 1, 'Social prescribing for loneliness: A systematic review of effectiveness', '2021', 'https://doi.org/10.1177/13591053211018066', 'Journal of Health Psychology', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT19-007 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-007';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Body dissatisfaction in men: A systematic review and meta-analysis', '2021', 'https://doi.org/10.1016/j.bodyim.2021.01.005', 'Body Image', 1),
      (v_art_id, 'peer_reviewed', 1, 'Muscle dysmorphia: A systematic review of the literature', '2019', 'https://doi.org/10.1016/j.bodyim.2019.02.004', 'Body Image', 2),
      (v_art_id, 'peer_reviewed', 1, 'The evolution of the male body ideal in popular media', '2019', 'https://doi.org/10.1002/eat.23096', 'International Journal of Eating Disorders', 3),
      (v_art_id, 'peer_reviewed', 1, 'Social media use and body image concerns in young men: A systematic review', '2022', 'https://doi.org/10.1016/j.bodyim.2022.03.011', 'Body Image', 4),
      (v_art_id, 'peer_reviewed', 1, 'Gender differences in help-seeking for body image concerns', '2020', 'https://doi.org/10.1037/men0000278', 'Psychology of Men & Masculinities', 5),
      (v_art_id, 'clinical_guideline', 4, 'Diagnostic and Statistical Manual of Mental Disorders, Fifth Edition, Text Revision (DSM-5-TR)', '2022', 'https://doi.org/10.1176/appi.books.9780890425787', 'American Psychiatric Association', 6),
      (v_art_id, 'peer_reviewed', 1, 'Anabolic-androgenic steroid use and psychopathology: A systematic review', '2020', 'https://doi.org/10.1016/j.drugalcdep.2020.108159', 'Drug and Alcohol Dependence', 7),
      (v_art_id, 'government', 2, 'The Adonis complex: Body obsession and muscle dysmorphia in men', '2019', 'https://www.health.harvard.edu/newsletter_article/the-adonis-complex', 'Harvard Mental Health Letter', 8),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive behavioral therapy for body dysmorphic disorder: A systematic review', '2021', 'https://doi.org/10.1016/j.cpr.2021.102072', 'Clinical Psychology Review', 9),
      (v_art_id, 'peer_reviewed', 1, 'Fitspiration and the male body: A content analysis', '2020', 'https://doi.org/10.1080/10810730.2020.1781240', 'Journal of Health Communication', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT19-008 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-008';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Gender differences in alcohol use disorder: Epidemiology, biology, and treatment', '2020', 'https://doi.org/10.35946/arcr.v40.2.04', 'Alcohol Research: Current Reviews', 1),
      (v_art_id, 'peer_reviewed', 1, 'Alexithymia and alcohol use: A systematic review', '2019', 'https://doi.org/10.1111/dar.12903', 'Drug and Alcohol Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Conformity to masculine norms and alcohol use among men: A meta-analysis', '2021', 'https://doi.org/10.1037/men0000348', 'Psychology of Men & Masculinities', 3),
      (v_art_id, 'peer_reviewed', 1, 'Brief motivational interventions for hazardous drinking: A meta-analysis of randomized controlled trials', '2020', 'https://doi.org/10.1111/add.14922', 'Addiction', 4),
      (v_art_id, 'government', 2, 'Alcohol-related disease impact: United States mortality data', '2023', 'https://www.cdc.gov/alcohol/data-stats.htm', 'Centers for Disease Control and Prevention', 5),
      (v_art_id, 'government', 2, 'Understanding alcohol use disorder', '2023', 'https://www.niaaa.nih.gov/publications/brochures-and-fact-sheets/understanding-alcohol-use-disorder', 'National Institute on Alcohol Abuse and Alcoholism', 6),
      (v_art_id, 'peer_reviewed', 1, 'Self-medication hypothesis of substance use: Testing the theory with longitudinal data', '2019', 'https://doi.org/10.1037/abn0000437', 'Journal of Abnormal Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Emotion regulation and substance use: A meta-analysis', '2021', 'https://doi.org/10.1016/j.cpr.2021.102024', 'Clinical Psychology Review', 8),
      (v_art_id, 'peer_reviewed', 1, 'Masculine norms and substance use treatment engagement', '2022', 'https://doi.org/10.1177/15579883221098430', 'American Journal of Men''s Health', 9),
      (v_art_id, 'government', 2, 'Rethinking drinking: Alcohol and your health', '2023', 'https://www.rethinkingdrinking.niaaa.nih.gov/', 'National Institutes of Health', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT19-009 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-009';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Mental health and retirement: A systematic review', '2020', 'https://doi.org/10.1017/S0144686X20000227', 'Ageing & Society', 1),
      (v_art_id, 'peer_reviewed', 1, 'Gender differences in adjustment to retirement: A longitudinal study', '2021', 'https://doi.org/10.1093/geronb/gbab042', 'Journal of Gerontology: Psychological Sciences', 2),
      (v_art_id, 'peer_reviewed', 1, 'Involuntary retirement and mental health: Evidence from a natural experiment', '2019', 'https://doi.org/10.1016/j.jhealeco.2019.102256', 'Journal of Health Economics', 3),
      (v_art_id, 'peer_reviewed', 1, 'Social roles, social networks, and retirement adjustment in men', '2020', 'https://doi.org/10.1177/0164027520917801', 'Research on Aging', 4),
      (v_art_id, 'peer_reviewed', 1, 'The effect of retirement on mental health: A systematic review', '2021', 'https://doi.org/10.1016/j.socscimed.2021.113958', 'Social Science & Medicine', 5),
      (v_art_id, 'peer_reviewed', 1, 'Work identity and retirement: A conceptual model', '2020', 'https://doi.org/10.1016/j.jvb.2020.103430', 'Journal of Vocational Behavior', 6),
      (v_art_id, 'professional_org', 3, 'Retirement and health: A review of the evidence', '2020', 'https://www.nber.org/papers/w26609', 'National Bureau of Economic Research', 7),
      (v_art_id, 'peer_reviewed', 1, 'Purpose in life and reduced incidence of stroke in older adults', '2020', 'https://doi.org/10.1097/PSY.0000000000000789', 'Psychosomatic Medicine', 8),
      (v_art_id, 'peer_reviewed', 1, 'Ikigai and longevity: A cross-cultural analysis', '2021', 'https://doi.org/10.1007/s10902-020-00297-x', 'Journal of Happiness Studies', 9),
      (v_art_id, 'peer_reviewed', 1, 'Retirement transitions and wellbeing: Gender differences in psychological adjustment', '2022', 'https://doi.org/10.1093/geront/gnab124', 'Gerontologist', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT19-010 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-010';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Spousal bereavement and mortality: A meta-analysis', '2020', 'https://doi.org/10.1371/journal.pone.0243098', 'PLOS ONE', 1),
      (v_art_id, 'peer_reviewed', 1, 'Gender differences in grief and bereavement service utilization', '2021', 'https://doi.org/10.1080/07481187.2021.1876790', 'Death Studies', 2),
      (v_art_id, 'peer_reviewed', 1, 'Grieving styles: Intuitive and instrumental patterns across gender', '2020', 'https://doi.org/10.1177/0030222820912160', 'Omega: Journal of Death and Dying', 3),
      (v_art_id, 'peer_reviewed', 1, 'Parental bereavement: Gender differences in grief and support', '2019', 'https://doi.org/10.1080/15325024.2019.1624844', 'Journal of Loss and Trauma', 4),
      (v_art_id, 'peer_reviewed', 1, 'Gender-responsive bereavement interventions: A systematic review', '2022', 'https://doi.org/10.1080/02682621.2022.2047145', 'Bereavement Care', 5),
      (v_art_id, 'peer_reviewed', 1, 'Complicated grief in men: Prevalence, risk factors, and treatment', '2021', 'https://doi.org/10.1016/j.jad.2021.05.038', 'Journal of Affective Disorders', 6),
      (v_art_id, 'peer_reviewed', 1, 'The dual process model of coping with bereavement: A decade on', '2019', 'https://doi.org/10.1177/0030222819893140', 'Omega: Journal of Death and Dying', 7),
      (v_art_id, 'reference', 5, 'Disenfranchised grief: Recognizing hidden sorrow', '2002', 'https://doi.org/10.4324/9781315866253', 'Routledge', 8),
      (v_art_id, 'peer_reviewed', 1, 'Grief and masculinity: A qualitative meta-synthesis', '2022', 'https://doi.org/10.1037/men0000396', 'Psychology of Men & Masculinities', 9),
      (v_art_id, 'government', 2, 'Support after a death', '2023', 'https://www.samhsa.gov/find-help/disaster-distress-helpline/coping-tips/support-after-death', 'Substance Abuse and Mental Health Services Administration', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT19-011 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-011';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Paternal perinatal depression and anxiety: A meta-analysis of prevalence', '2021', 'https://doi.org/10.1016/j.jad.2021.03.069', 'Journal of Affective Disorders', 1),
      (v_art_id, 'peer_reviewed', 1, 'Hormonal changes in new fathers: Cortisol and testosterone in the transition to parenthood', '2020', 'https://doi.org/10.1016/j.yhbeh.2020.104756', 'Hormones and Behavior', 2),
      (v_art_id, 'peer_reviewed', 1, 'Paternal depression and child development: A systematic review and meta-analysis', '2019', 'https://doi.org/10.1111/cdev.13204', 'Child Development', 3),
      (v_art_id, 'peer_reviewed', 1, 'Fathers in perinatal mental health research: A systematic scoping review', '2022', 'https://doi.org/10.1007/s00737-022-01204-6', 'Archives of Women''s Mental Health', 4),
      (v_art_id, 'peer_reviewed', 1, 'Interventions for paternal perinatal depression: A systematic review', '2021', 'https://doi.org/10.1002/imhj.21906', 'Infant Mental Health Journal', 5),
      (v_art_id, 'peer_reviewed', 1, 'The transition to fatherhood: A qualitative meta-synthesis', '2020', 'https://doi.org/10.1037/men0000307', 'Psychology of Men & Masculinities', 6),
      (v_art_id, 'peer_reviewed', 1, 'Couple relationship quality and paternal perinatal depression', '2021', 'https://doi.org/10.1037/fam0000826', 'Journal of Family Psychology', 7),
      (v_art_id, 'clinical_guideline', 4, 'Depression in men: A perinatal perspective', '2020', 'https://www.nice.org.uk/guidance/cg192', 'National Institute for Health and Care Excellence', 8),
      (v_art_id, 'peer_reviewed', 1, 'Fatherhood and men''s health: A review of the literature', '2022', 'https://doi.org/10.1177/15579883221085230', 'American Journal of Men''s Health', 9),
      (v_art_id, 'professional_org', 3, 'Postpartum depression in men', '2023', 'https://www.postpartum.net/learn-more/dads/', 'Postpartum Support International', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT19-012 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-012';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Prevalence of paternal perinatal depression and anxiety: An updated meta-analysis', '2022', 'https://doi.org/10.1016/j.jad.2022.04.148', 'Journal of Affective Disorders', 1),
      (v_art_id, 'peer_reviewed', 1, 'Concordance of maternal and paternal perinatal depression: A systematic review and meta-analysis', '2020', 'https://doi.org/10.1001/jamanetworkopen.2020.13411', 'JAMA Network Open', 2),
      (v_art_id, 'peer_reviewed', 1, 'Neuroendocrine changes in new fathers: Testosterone, cortisol, and the fathering brain', '2021', 'https://doi.org/10.1016/j.psyneuen.2021.105348', 'Psychoneuroendocrinology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Detection and treatment of paternal perinatal depression and anxiety: A systematic review', '2022', 'https://doi.org/10.3389/fpsyt.2022.889984', 'Frontiers in Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Long-term effects of paternal perinatal depression on child development: A meta-analysis', '2021', 'https://doi.org/10.1017/S0954579421000286', 'Development and Psychopathology', 5),
      (v_art_id, 'peer_reviewed', 1, 'The Edinburgh Postnatal Depression Scale: Validation for use in fathers', '2020', 'https://doi.org/10.1016/j.jad.2020.01.041', 'Journal of Affective Disorders', 6),
      (v_art_id, 'peer_reviewed', 1, 'Neuroimaging of the parental brain: Changes in new fathers', '2021', 'https://doi.org/10.1093/cercor/bhab045', 'Cerebral Cortex', 7),
      (v_art_id, 'peer_reviewed', 1, 'CBT for paternal postnatal depression: A pilot RCT', '2022', 'https://doi.org/10.1016/j.brat.2022.104192', 'Behaviour Research and Therapy', 8),
      (v_art_id, 'professional_org', 3, 'Perinatal mental health: The role of fathers', '2021', 'https://www.rcpsych.ac.uk/mental-health/parents-and-young-people/parental-mental-illness/perinatal-mental-illness-in-fathers', 'Royal College of Psychiatrists', 9),
      (v_art_id, 'peer_reviewed', 1, 'Risk factors for paternal perinatal depression: A comprehensive review', '2022', 'https://doi.org/10.1186/s12888-022-03853-4', 'BMC Psychiatry', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT19-013 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-013';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Marital status and suicide: A meta-analysis of gender-specific risks', '2020', 'https://doi.org/10.1136/jech-2019-213009', 'Journal of Epidemiology & Community Health', 1),
      (v_art_id, 'peer_reviewed', 1, 'Divorce and depression: A systematic review and meta-analysis', '2021', 'https://doi.org/10.1016/j.jad.2021.02.058', 'Journal of Affective Disorders', 2),
      (v_art_id, 'peer_reviewed', 1, 'Marital dissolution and alcohol use: A longitudinal study', '2020', 'https://doi.org/10.1111/add.14984', 'Addiction', 3),
      (v_art_id, 'peer_reviewed', 1, 'Social network changes following divorce: Gender differences', '2019', 'https://doi.org/10.1177/0265407519836170', 'Journal of Social and Personal Relationships', 4),
      (v_art_id, 'peer_reviewed', 1, 'Post-divorce counseling effectiveness: A systematic review', '2022', 'https://doi.org/10.1111/famp.12765', 'Family Process', 5),
      (v_art_id, 'peer_reviewed', 1, 'Divorce and men''s health: A systematic review', '2021', 'https://doi.org/10.1136/bmjopen-2021-049334', 'BMJ Open', 6),
      (v_art_id, 'peer_reviewed', 1, 'Identity disruption after divorce: A longitudinal study', '2020', 'https://doi.org/10.1037/pspp0000332', 'Journal of Personality and Social Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Coping with divorce: Gender differences in adjustment', '2021', 'https://doi.org/10.1080/10502556.2021.1871845', 'Journal of Divorce & Remarriage', 8),
      (v_art_id, 'government', 2, 'Suicide prevention after relationship breakdown', '2021', 'https://www.who.int/publications/i/item/9789240026643', 'World Health Organization', 9),
      (v_art_id, 'professional_org', 3, 'Rebuilding after divorce: Evidence-based recommendations', '2022', 'https://www.apa.org/topics/divorce-child-custody', 'American Psychological Association', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT19-014 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-014';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Mental health of fathers in custody disputes: A systematic review', '2021', 'https://doi.org/10.1037/fam0000845', 'Journal of Family Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Stressors in contested custody: Father perspectives', '2020', 'https://doi.org/10.1111/fcre.12484', 'Family Court Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Ambiguous loss and non-residential fatherhood', '2019', 'https://doi.org/10.1080/10502556.2019.1627162', 'Journal of Divorce & Remarriage', 3),
      (v_art_id, 'peer_reviewed', 1, 'Duration and psychological impact of high-conflict custody proceedings', '2021', 'https://doi.org/10.1037/law0000305', 'Psychology, Public Policy, and Law', 4),
      (v_art_id, 'peer_reviewed', 1, 'Children''s adjustment in high-conflict custody cases: A meta-analysis', '2020', 'https://doi.org/10.1111/jcpp.13175', 'Journal of Child Psychology and Psychiatry', 5),
      (v_art_id, 'peer_reviewed', 1, 'Parental alienation: A critical review of the research', '2021', 'https://doi.org/10.1007/s10567-021-00359-x', 'Clinical Child and Family Psychology Review', 6),
      (v_art_id, 'peer_reviewed', 1, 'Co-parenting after high-conflict divorce: Evidence-based approaches', '2022', 'https://doi.org/10.1111/famp.12769', 'Family Process', 7),
      (v_art_id, 'peer_reviewed', 1, 'The psychological impact of family court on litigants', '2020', 'https://doi.org/10.1002/bsl.2456', 'Behavioral Sciences & the Law', 8),
      (v_art_id, 'peer_reviewed', 1, 'Fathering from a distance: Maintaining the parent-child bond', '2021', 'https://doi.org/10.1007/s10826-021-01964-4', 'Journal of Child and Family Studies', 9),
      (v_art_id, 'peer_reviewed', 1, 'Resilience in non-custodial fathers: Protective factors and outcomes', '2022', 'https://doi.org/10.1037/men0000400', 'Psychology of Men & Masculinities', 10)
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
  WHERE a.article_production_id LIKE 'CAT19-%';

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;
