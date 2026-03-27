-- ============================================================================
-- Seed: Category 19 (Men's Mental Health) — Subcategory 02
-- 10 articles: CAT19-015 through CAT19-024
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
  VALUES ('Men''s Relationships and Family', 'men-s-relationships-and-family', v_cat_id, 2)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'men-s-relationships-and-family' AND category_id = v_cat_id;

  -- CAT19-015: Boys Don''t Cry: How Childhood Messaging Shapes Adult Emotional Health
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Boys Don''t Cry: How Childhood Messaging Shapes Adult Emotional Health',
    'boys-dont-cry-how-childhood-messaging-shapes-adult-emotional-health',
    'draft',
    'Men''s Mental Health',
    ARRAY['Emotional Socialization', 'Childhood', 'Masculinity', 'Men''s Mental Health'],
    1066,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-015',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A research digest exploring the longitudinal evidence on how gender-restrictive emotional socialization in childhood creates measurable mental health consequences in adult men — and what can be done to interrupt the cycle.',
    '/images/articles/cat19/cover-015.svg',
    10,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT19-016: Men''s Friendships: Building Real Connection Beyond Sports and Beer
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Men''s Friendships: Building Real Connection Beyond Sports and Beer',
    'mens-friendships-building-real-connection-beyond-sports-and-beer',
    'draft',
    'Men''s Mental Health',
    ARRAY['Friendship', 'Social Connection', 'Vulnerability', 'Men''s Mental Health'],
    996,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-016',
    v_cat_id,
    v_sub_id,
    'drafted',
    'An evidence-based guide to deepening male friendships — moving beyond activity-based bonding to create the kind of connections that actually protect mental health.',
    '/images/articles/cat19/cover-016.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT19-017: Men as Caregivers: The Hidden Population of Male Family Carers
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Men as Caregivers: The Hidden Population of Male Family Carers',
    'men-as-caregivers-the-hidden-population-of-male-family-carers',
    'draft',
    'Men''s Mental Health',
    ARRAY['Caregiving', 'Family', 'Role Strain', 'Men''s Mental Health'],
    1081,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-017',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A research digest examining the growing population of male caregivers — the psychological toll of caregiving on men, the barriers they face in accessing support, and the unique challenges of caring while conforming to masculine norms.',
    '/images/articles/cat19/cover-017.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT19-018: Men and Romantic Vulnerability: Why Opening Up Feels Like Weakness
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Men and Romantic Vulnerability: Why Opening Up Feels Like Weakness',
    'men-and-romantic-vulnerability-why-opening-up-feels-like-weakness',
    'draft',
    'Men''s Mental Health',
    ARRAY['Vulnerability', 'Romantic Relationships', 'Emotional Intimacy', 'Men''s Mental Health'],
    1058,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-018',
    v_cat_id,
    v_sub_id,
    'drafted',
    'An evidence-based exploration of why emotional vulnerability in romantic relationships is particularly challenging for men — and how the fear of appearing weak actually weakens the relationships men care about most.',
    '/images/articles/cat19/cover-018.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT19-019: Father-Son Relationships and Emotional Inheritance
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Father-Son Relationships and Emotional Inheritance',
    'father-son-relationships-and-emotional-inheritance',
    'draft',
    'Men''s Mental Health',
    ARRAY['Father-Son', 'Intergenerational', 'Emotional Inheritance', 'Men''s Mental Health'],
    1060,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-019',
    v_cat_id,
    v_sub_id,
    'drafted',
    'An evidence-based exploration of how emotional patterns are transmitted from father to son — including attachment dynamics, modeling effects, and how men can break cycles of emotional disconnection across generations.',
    '/images/articles/cat19/cover-019.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT19-020: Men and Dating Anxiety: Performance Pressure and Fear of Rejection
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Men and Dating Anxiety: Performance Pressure and Fear of Rejection',
    'men-and-dating-anxiety-performance-pressure-and-fear-of-rejection',
    'draft',
    'Men''s Mental Health',
    ARRAY['Dating Anxiety', 'Rejection Sensitivity', 'Romantic Relationships', 'Men''s Mental Health'],
    1082,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-020',
    v_cat_id,
    v_sub_id,
    'drafted',
    'An evidence-based exploration of dating anxiety in men — how gender role expectations create unique performance pressures, why rejection sensitivity is so damaging, and strategies for building authentic confidence in romantic contexts.',
    '/images/articles/cat19/cover-020.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT19-021: Testosterone and Mood: What Hormonal Changes Mean for Men''s Mental Health
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Testosterone and Mood: What Hormonal Changes Mean for Men''s Mental Health',
    'testosterone-and-mood-what-hormonal-changes-mean-for-mens-mental-health',
    'draft',
    'Men''s Mental Health',
    ARRAY['Testosterone', 'Hormones', 'Mood Disorders', 'Men''s Mental Health'],
    1044,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-021',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A research-based exploration of how testosterone fluctuations across the lifespan affect mood, cognition, and mental health in men — and what the evidence actually says about the hormone-mood connection.',
    '/images/articles/cat19/cover-021.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT19-022: Prostate Cancer and Mental Health: The Psychological Impact of Diagnosis
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Prostate Cancer and Mental Health: The Psychological Impact of Diagnosis',
    'prostate-cancer-and-mental-health-the-psychological-impact-of-diagnosis',
    'draft',
    'Men''s Mental Health',
    ARRAY['Prostate Cancer', 'Oncology', 'Psychological Impact', 'Men''s Mental Health'],
    1082,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-022',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A comprehensive examination of how prostate cancer diagnosis and treatment affect mental health in men — including depression, anxiety, identity disruption, and the psychosocial challenges that are often overlooked in oncological care.',
    '/images/articles/cat19/cover-022.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT19-023: Erectile Dysfunction and Mental Health: The Mind-Body Connection
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Erectile Dysfunction and Mental Health: The Mind-Body Connection',
    'erectile-dysfunction-and-mental-health-the-mind-body-connection',
    'draft',
    'Men''s Mental Health',
    ARRAY['Erectile Dysfunction', 'Sexual Health', 'Mind-Body Connection', 'Men''s Mental Health'],
    1113,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-023',
    v_cat_id,
    v_sub_id,
    'drafted',
    'An in-depth exploration of the bidirectional relationship between erectile dysfunction and mental health — examining how psychological factors cause and perpetuate ED, how ED impacts mental health, and what integrated treatment approaches the evidence supports.',
    '/images/articles/cat19/cover-023.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT19-024: Heart Disease and Depression in Men: The Deadly Overlap
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Heart Disease and Depression in Men: The Deadly Overlap',
    'heart-disease-and-depression-in-men-the-deadly-overlap',
    'draft',
    'Men''s Mental Health',
    ARRAY['Heart Disease', 'Depression', 'Cardiovascular Health', 'Men''s Mental Health'],
    1077,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-024',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A research-focused examination of the bidirectional relationship between cardiovascular disease and depression in men — exploring shared biological mechanisms, compounding risk factors, and why treating one without the other fails.',
    '/images/articles/cat19/cover-024.svg',
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

  -- === CAT19-015 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-015';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The development of emotion regulation in boys: A longitudinal study', '2020', 'https://doi.org/10.1037/dev0000962', 'Developmental Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Gendered emotion socialization in families: A meta-analysis', '2020', 'https://doi.org/10.1037/bul0000287', 'Psychological Bulletin', 2),
      (v_art_id, 'peer_reviewed', 1, 'Restrictive emotionality in adolescence predicts adult depression: A 10-year longitudinal study', '2021', 'https://doi.org/10.1037/abn0000684', 'Journal of Abnormal Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Cross-cultural differences in emotional expression: The role of gender norms', '2019', 'https://doi.org/10.1037/emo0000548', 'Emotion', 4),
      (v_art_id, 'peer_reviewed', 1, 'School-based emotional literacy interventions for boys: A systematic review and meta-analysis', '2022', 'https://doi.org/10.1016/j.jsp.2022.05.002', 'Journal of School Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Boys, masculinity, and emotional literacy: A review', '2021', 'https://doi.org/10.1037/men0000365', 'Psychology of Men & Masculinities', 6),
      (v_art_id, 'peer_reviewed', 1, 'Gender socialization and child development', '2020', 'https://doi.org/10.1146/annurev-devpsych-010320-095830', 'Annual Review of Developmental Psychology', 7),
      (v_art_id, 'professional_org', 3, 'Toxic masculinity: From childhood to adulthood', '2018', 'https://www.apa.org/monitor/2019/01/ce-corner', 'American Psychological Association', 8),
      (v_art_id, 'peer_reviewed', 1, 'Emotion coaching with boys: Outcomes and mechanisms', '2022', 'https://doi.org/10.1111/cdev.13812', 'Child Development', 9),
      (v_art_id, 'peer_reviewed', 1, 'Breaking the cycle: How fathers can raise emotionally healthy sons', '2023', 'https://doi.org/10.1111/camh.12608', 'Child and Adolescent Mental Health', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT19-016 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-016';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Gender differences in emotional support and relationship quality', '2019', 'https://doi.org/10.1177/0265407519846595', 'Journal of Social and Personal Relationships', 1),
      (v_art_id, 'peer_reviewed', 1, 'Close friendship and mental health outcomes in men: A prospective study', '2021', 'https://doi.org/10.1007/s00127-021-02042-4', 'Social Psychiatry and Psychiatric Epidemiology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Men''s experiences of friendship: A qualitative systematic review', '2022', 'https://doi.org/10.1037/men0000389', 'Psychology of Men & Masculinities', 3),
      (v_art_id, 'peer_reviewed', 1, 'Social network trajectories across the adult lifespan: Gender differences', '2020', 'https://doi.org/10.1037/dev0001025', 'Developmental Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Activity-based versus disclosure-based friendships: Predictors of longevity', '2021', 'https://doi.org/10.1111/pere.12374', 'Personal Relationships', 5),
      (v_art_id, 'peer_reviewed', 1, 'Friendship and masculinity: A narrative review', '2020', 'https://doi.org/10.1177/1097184X20910491', 'Men and Masculinities', 6),
      (v_art_id, 'peer_reviewed', 1, 'The protective effects of social connection on health', '2021', 'https://doi.org/10.1146/annurev-psych-122216-011902', 'Annual Review of Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Homophobia and male intimacy avoidance', '2019', 'https://doi.org/10.1007/s11199-019-01075-5', 'Sex Roles', 8),
      (v_art_id, 'peer_reviewed', 1, 'Social prescribing and male loneliness interventions', '2022', 'https://doi.org/10.1186/s12889-022-13526-4', 'BMC Public Health', 9),
      (v_art_id, 'professional_org', 3, 'Building better male friendships', '2023', 'https://www.apa.org/topics/men-boys/male-friendships', 'American Psychological Association', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT19-017 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-017';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'professional_org', 3, 'Male caregivers: Prevalence, demographics, and trends', '2020', 'https://doi.org/10.26419/ppi.00103.001', 'AARP Public Policy Institute', 1),
      (v_art_id, 'peer_reviewed', 1, 'Gender differences in caregiver burden and depression: A meta-analysis', '2021', 'https://doi.org/10.1093/geronb/gbab047', 'Journals of Gerontology: Psychological Sciences', 2),
      (v_art_id, 'peer_reviewed', 1, 'Male caregivers'' use of formal support services: A systematic review', '2020', 'https://doi.org/10.1111/hsc.12934', 'Health & Social Care in the Community', 3),
      (v_art_id, 'peer_reviewed', 1, 'Masculinity and caregiving: Identity conflict in male family carers', '2022', 'https://doi.org/10.1111/1467-9566.13462', 'Sociology of Health & Illness', 4),
      (v_art_id, 'peer_reviewed', 1, 'Caregiving strain and mortality in older adults: A prospective study', '2019', 'https://doi.org/10.1001/jamainternmed.2019.0115', 'JAMA Internal Medicine', 5),
      (v_art_id, 'peer_reviewed', 1, 'The experience of male caregivers: A qualitative meta-synthesis', '2021', 'https://doi.org/10.1017/S0144686X21000477', 'Ageing & Society', 6),
      (v_art_id, 'peer_reviewed', 1, 'Workplace support for male caregivers', '2022', 'https://doi.org/10.1037/ocp0000312', 'Journal of Occupational Health Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Resilience in male caregivers: A narrative review', '2021', 'https://doi.org/10.22374/ijmsch.v4i1.56', 'International Journal of Men''s Social and Community Health', 8),
      (v_art_id, 'peer_reviewed', 1, 'Caregiver support interventions: What works for men?', '2022', 'https://doi.org/10.1093/geront/gnab178', 'Gerontologist', 9),
      (v_art_id, 'professional_org', 3, 'Family caregiving resources', '2023', 'https://www.caregiving.org/resources/', 'National Alliance for Caregiving', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT19-018 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-018';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Male emotional withdrawal in couples: A meta-analysis of demand-withdraw patterns', '2020', 'https://doi.org/10.1111/jmft.12425', 'Journal of Marital and Family Therapy', 1),
      (v_art_id, 'peer_reviewed', 1, 'Emotional vulnerability and relationship satisfaction: A dyadic analysis', '2021', 'https://doi.org/10.1111/pere.12389', 'Personal Relationships', 2),
      (v_art_id, 'peer_reviewed', 1, 'Men''s experiences of emotional disclosure in relationships: A mixed-methods study', '2022', 'https://doi.org/10.1037/men0000405', 'Psychology of Men & Masculinities', 3),
      (v_art_id, 'peer_reviewed', 1, 'Adult attachment and emotional vulnerability in romantic relationships', '2020', 'https://doi.org/10.1177/0265407520934480', 'Journal of Social and Personal Relationships', 4),
      (v_art_id, 'peer_reviewed', 1, 'Emotionally focused therapy: Effectiveness for male emotional engagement', '2021', 'https://doi.org/10.1037/cfp0000178', 'Couple and Family Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'The demand-withdraw pattern in intimate relationships: A comprehensive review', '2019', 'https://doi.org/10.1016/j.copsyc.2019.04.010', 'Current Opinion in Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Gender and emotional disclosure: How context moderates responses', '2021', 'https://doi.org/10.1007/s11199-021-01229-0', 'Sex Roles', 7),
      (v_art_id, 'peer_reviewed', 1, 'Vulnerability and attraction: Evidence and implications', '2020', 'https://doi.org/10.1177/0146167220926685', 'Personality and Social Psychology Bulletin', 8),
      (v_art_id, 'peer_reviewed', 1, 'Couples therapy and male emotional engagement: Therapist perspectives', '2022', 'https://doi.org/10.1111/famp.12784', 'Family Process', 9),
      (v_art_id, 'professional_org', 3, 'Building emotional intimacy in relationships', '2023', 'https://www.gottman.com/blog/category/relationships/', 'The Gottman Institute', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT19-019 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-019';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Father involvement and child outcomes: A systematic review and meta-analysis', '2021', 'https://doi.org/10.1016/j.dr.2021.100963', 'Developmental Review', 1),
      (v_art_id, 'peer_reviewed', 1, 'Paternal emotional availability and alexithymia in adult sons', '2020', 'https://doi.org/10.1037/men0000298', 'Psychology of Men & Masculinities', 2),
      (v_art_id, 'peer_reviewed', 1, 'Father-child attachment and adult relationship quality: A 30-year longitudinal study', '2021', 'https://doi.org/10.1080/14616734.2021.1890713', 'Attachment & Human Development', 3),
      (v_art_id, 'peer_reviewed', 1, 'Men''s relationships with their fathers: A national survey', '2022', 'https://doi.org/10.1111/fare.12684', 'Family Relations', 4),
      (v_art_id, 'peer_reviewed', 1, 'Intergenerational pattern-breaking in men: A qualitative study', '2022', 'https://doi.org/10.1111/1467-6427.12387', 'Journal of Family Therapy', 5),
      (v_art_id, 'peer_reviewed', 1, 'Father-son emotional communication and mental health outcomes', '2021', 'https://doi.org/10.1007/s10826-021-01985-0', 'Journal of Child and Family Studies', 6),
      (v_art_id, 'peer_reviewed', 1, 'Intergenerational transmission of attachment: A meta-analysis', '2020', 'https://doi.org/10.1037/bul0000261', 'Psychological Bulletin', 7),
      (v_art_id, 'peer_reviewed', 1, 'Father wounds and men''s mental health: A psychodynamic perspective', '2021', 'https://doi.org/10.1037/pap0000382', 'Psychoanalytic Psychology', 8),
      (v_art_id, 'peer_reviewed', 1, 'Breaking cycles of emotional disconnection: Father-focused interventions', '2022', 'https://doi.org/10.1007/s10567-022-00401-4', 'Clinical Child and Family Psychology Review', 9),
      (v_art_id, 'professional_org', 3, 'Fatherhood research and resources', '2023', 'https://www.fatherhood.org/research', 'National Fatherhood Initiative', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT19-020 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-020';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Dating anxiety: Prevalence, demographics, and gender differences', '2020', 'https://doi.org/10.1521/jscp.2020.39.4.317', 'Journal of Social and Clinical Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Gender and romantic initiation: A meta-analysis of heterosexual dating practices', '2021', 'https://doi.org/10.1007/s11199-021-01251-2', 'Sex Roles', 2),
      (v_art_id, 'peer_reviewed', 1, 'Dating app use and mental health: A systematic review', '2022', 'https://doi.org/10.1016/j.jad.2022.01.065', 'Journal of Affective Disorders', 3),
      (v_art_id, 'peer_reviewed', 1, 'Rejection sensitivity and romantic relationship outcomes in men', '2020', 'https://doi.org/10.1016/j.paid.2020.110045', 'Personality and Individual Differences', 4),
      (v_art_id, 'peer_reviewed', 1, 'CBT for dating anxiety: A randomized controlled trial', '2021', 'https://doi.org/10.1080/16506073.2021.1928276', 'Cognitive Behaviour Therapy', 5),
      (v_art_id, 'peer_reviewed', 1, 'Masculine role stress and romantic avoidance', '2022', 'https://doi.org/10.1037/men0000410', 'Psychology of Men & Masculinities', 6),
      (v_art_id, 'peer_reviewed', 1, 'The neuroscience of social rejection', '2019', 'https://doi.org/10.1038/s41583-019-0230-6', 'Nature Reviews Neuroscience', 7),
      (v_art_id, 'peer_reviewed', 1, 'Online dating and self-esteem: A longitudinal analysis', '2021', 'https://doi.org/10.1016/j.chb.2021.106827', 'Computers in Human Behavior', 8),
      (v_art_id, 'peer_reviewed', 1, 'Authentic confidence versus performed confidence in dating', '2022', 'https://doi.org/10.1111/pere.12422', 'Personal Relationships', 9),
      (v_art_id, 'professional_org', 3, 'Social anxiety and dating: Tips for managing anxiety', '2023', 'https://adaa.org/understanding-anxiety/social-anxiety-disorder', 'Anxiety and Depression Association of America', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT19-021 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-021';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Longitudinal effects of aging on serum total and free testosterone levels in healthy men', '2001', 'https://doi.org/10.1210/jcem.86.2.7219', 'Journal of Clinical Endocrinology & Metabolism', 1),
      (v_art_id, 'peer_reviewed', 1, 'Low testosterone and the association with depressive symptoms in men: A systematic review and meta-analysis', '2021', 'https://doi.org/10.1016/j.psyneuen.2021.105397', 'Psychoneuroendocrinology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Bidirectional relationship between testosterone and depression: A systematic review', '2022', 'https://doi.org/10.1016/j.jad.2022.01.089', 'Journal of Affective Disorders', 3),
      (v_art_id, 'peer_reviewed', 1, 'Testosterone treatment and depressive symptoms: A systematic review and meta-analysis of randomized controlled trials', '2019', 'https://doi.org/10.1001/jamapsychiatry.2018.4275', 'JAMA Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Prevalence and incidence of androgen deficiency in middle-aged and older men: A systematic review', '2020', 'https://doi.org/10.1111/ijcp.13449', 'International Journal of Clinical Practice', 5),
      (v_art_id, 'peer_reviewed', 1, 'Testosterone and cognition in aging men: A systematic review and meta-analysis', '2021', 'https://doi.org/10.1016/j.neubiorev.2021.06.032', 'Neuroscience & Biobehavioral Reviews', 6),
      (v_art_id, 'peer_reviewed', 1, 'Endogenous testosterone and mortality in men: A systematic review and meta-analysis', '2011', 'https://doi.org/10.1136/bmj.d1420', 'British Medical Journal', 7),
      (v_art_id, 'clinical_guideline', 4, 'Testosterone therapy in men with hypogonadism: An Endocrine Society clinical practice guideline', '2018', 'https://doi.org/10.1210/jc.2018-00229', 'Journal of Clinical Endocrinology & Metabolism', 8),
      (v_art_id, 'government', 2, 'Male hypogonadism: Pathogenesis, diagnosis, and management', '2023', 'https://www.niddk.nih.gov/health-information/endocrine-diseases', 'National Institute of Diabetes and Digestive and Kidney Diseases', 9),
      (v_art_id, 'peer_reviewed', 1, 'The role of testosterone in depression: Current evidence and pathways', '2022', 'https://doi.org/10.1007/s11920-022-01384-x', 'Current Psychiatry Reports', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT19-022 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-022';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Depression and anxiety in prostate cancer: A systematic review and meta-analysis of prevalence rates', '2021', 'https://doi.org/10.1136/bmjopen-2021-049087', 'BMJ Open', 1),
      (v_art_id, 'peer_reviewed', 1, 'Anxiety in men with prostate cancer: A systematic review and meta-analysis', '2020', 'https://doi.org/10.1002/pon.5380', 'Psycho-Oncology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Psychiatric effects of androgen deprivation therapy in men with prostate cancer: A systematic review', '2021', 'https://doi.org/10.1200/JCO.21.00335', 'Journal of Clinical Oncology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Suicide risk among men with prostate cancer: A population-based cohort study', '2022', 'https://doi.org/10.1016/j.eururo.2022.01.032', 'European Urology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Psychological interventions for men with prostate cancer: A systematic review of randomized controlled trials', '2022', 'https://doi.org/10.1093/abm/kaac017', 'Annals of Behavioral Medicine', 5),
      (v_art_id, 'peer_reviewed', 1, 'Masculinity and prostate cancer: A qualitative meta-synthesis', '2021', 'https://doi.org/10.1037/men0000362', 'Psychology of Men & Masculinities', 6),
      (v_art_id, 'peer_reviewed', 1, 'Sexual dysfunction after prostate cancer treatment: Psychological impact and interventions', '2020', 'https://doi.org/10.1016/j.jsxm.2020.03.001', 'The Journal of Sexual Medicine', 7),
      (v_art_id, 'government', 2, 'Screening for distress in cancer patients: Recommendations for clinical practice', '2023', 'https://www.nccn.org/guidelines/guidelines-supportive-care', 'National Comprehensive Cancer Network', 8),
      (v_art_id, 'professional_org', 3, 'Prostate cancer statistics and outlook', '2024', 'https://www.cancer.org/cancer/prostate-cancer.html', 'American Cancer Society', 9),
      (v_art_id, 'peer_reviewed', 1, 'Couples-based interventions for prostate cancer: A systematic review', '2022', 'https://doi.org/10.1080/07347332.2022.2050291', 'Journal of Psychosocial Oncology', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT19-023 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-023';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Prevalence of depression in men with erectile dysfunction: A systematic review and meta-analysis', '2020', 'https://doi.org/10.1016/j.jsxm.2020.06.010', 'Journal of Sexual Medicine', 1),
      (v_art_id, 'peer_reviewed', 1, 'Performance anxiety and erectile dysfunction: Cognitive-behavioral mechanisms and treatment', '2021', 'https://doi.org/10.1016/j.sxmr.2020.12.003', 'Sexual Medicine Reviews', 2),
      (v_art_id, 'peer_reviewed', 1, 'Sexual dysfunction with antidepressant treatment: A meta-analysis', '2022', 'https://doi.org/10.4088/JCP.21r14189', 'Journal of Clinical Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Combined psychological and pharmacological interventions for erectile dysfunction: A systematic review', '2021', 'https://doi.org/10.1007/s10508-021-01987-6', 'Archives of Sexual Behavior', 4),
      (v_art_id, 'peer_reviewed', 1, 'Psychosocial consequences of erectile dysfunction: Quality of life, self-esteem, and relationships', '2020', 'https://doi.org/10.1038/s41443-020-0274-9', 'International Journal of Impotence Research', 5),
      (v_art_id, 'peer_reviewed', 1, 'The neurobiology of sexual arousal and the effects of psychological stress', '2021', 'https://doi.org/10.1016/j.neubiorev.2021.03.026', 'Neuroscience & Biobehavioral Reviews', 6),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive behavioral sex therapy for erectile dysfunction: A randomized controlled trial', '2022', 'https://doi.org/10.1037/ccp0000724', 'Journal of Consulting and Clinical Psychology', 7),
      (v_art_id, 'government', 2, 'Erectile dysfunction: AUA/SMSNA guideline', '2023', 'https://www.auanet.org/guidelines/guidelines/erectile-dysfunction-guideline', 'American Urological Association', 8),
      (v_art_id, 'peer_reviewed', 1, 'Erectile dysfunction and cardiovascular disease: The link between ED and heart risk', '2021', 'https://doi.org/10.1093/eurheartj/ehab342', 'European Heart Journal', 9),
      (v_art_id, 'peer_reviewed', 1, 'Couples therapy for sexual dysfunction: A review of evidence-based approaches', '2022', 'https://doi.org/10.1007/s11930-022-00339-4', 'Current Sexual Health Reports', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT19-024 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-024';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Depression as a risk factor for coronary heart disease: A meta-analysis of prospective cohort studies', '2020', 'https://doi.org/10.1097/PSY.0000000000000743', 'Psychosomatic Medicine', 1),
      (v_art_id, 'peer_reviewed', 1, 'Post-myocardial infarction depression and cardiac mortality: A systematic review and meta-analysis', '2021', 'https://doi.org/10.1161/JAHA.120.018514', 'Journal of the American Heart Association', 2),
      (v_art_id, 'peer_reviewed', 1, 'Screening for depression in cardiac patients: Implementation and barriers', '2021', 'https://doi.org/10.1161/CIR.0000000000000947', 'Circulation', 3),
      (v_art_id, 'peer_reviewed', 1, 'Shared inflammatory mechanisms between depression and cardiovascular disease: A systematic review', '2022', 'https://doi.org/10.1038/s41380-022-01656-z', 'Molecular Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Collaborative care for depression and heart disease: A randomized effectiveness trial', '2021', 'https://doi.org/10.1001/jamainternmed.2021.0347', 'JAMA Internal Medicine', 5),
      (v_art_id, 'peer_reviewed', 1, 'Autonomic nervous system dysfunction in depression and cardiovascular disease', '2020', 'https://doi.org/10.1016/j.psyneuen.2020.104718', 'Psychoneuroendocrinology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Gender differences in cardiovascular disease and depression comorbidity', '2022', 'https://doi.org/10.1016/j.jad.2022.02.067', 'Journal of Affective Disorders', 7),
      (v_art_id, 'government', 2, 'Depression and heart disease', '2023', 'https://www.nhlbi.nih.gov/health/heart/depression', 'National Heart, Lung, and Blood Institute', 8),
      (v_art_id, 'peer_reviewed', 1, 'Exercise as treatment for depression in cardiac patients: A meta-analysis', '2021', 'https://doi.org/10.1093/eurjpc/zwab074', 'European Journal of Preventive Cardiology', 9),
      (v_art_id, 'professional_org', 3, 'Cardiac rehabilitation and depression: Current evidence and future directions', '2022', 'https://www.heart.org/en/health-topics/cardiac-rehab', 'American Heart Association', 10)
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
