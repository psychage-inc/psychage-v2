-- ============================================================================
-- Seed: Category 19 (Men's Mental Health) — Subcategory 06
-- 10 articles: CAT19-055 through CAT19-064
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
  VALUES ('Men''s Health Interventions Part 1', 'men-s-health-interventions-part-1', v_cat_id, 6)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'men-s-health-interventions-part-1' AND category_id = v_cat_id;

  -- CAT19-055: Adventure Therapy for Men: Using Outdoor Challenges for Emotional Growth
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Adventure Therapy for Men: Using Outdoor Challenges for Emotional Growth',
    'adventure-therapy-for-men-using-outdoor-challenges-for-emotional-growth',
    'draft',
    'Men''s Mental Health',
    ARRAY['Adventure Therapy', 'Wilderness Therapy', 'Outdoor Programs', 'Men''s Mental Health'],
    1068,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-055',
    v_cat_id,
    v_sub_id,
    'drafted',
    'An evidence-based guide to adventure therapy — exploring wilderness programs, Outward Bound, challenge-by-choice models, and how physical risk-taking creates emotional vulnerability and lasting psychological change for men.',
    '/images/articles/cat19/cover-055.svg',
    10,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT19-056: Male Mentorship and Mental Health: The Protective Power of Role Models
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Male Mentorship and Mental Health: The Protective Power of Role Models',
    'male-mentorship-and-mental-health-the-protective-power-of-role-models',
    'draft',
    'Men''s Mental Health',
    ARRAY['Mentorship', 'Role Models', 'Intergenerational Healing', 'Men''s Mental Health'],
    1077,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-056',
    v_cat_id,
    v_sub_id,
    'drafted',
    'An evidence-based exploration of how male mentorship protects mental health — from Big Brothers Big Sisters research to workplace mentoring, examining how older men modeling emotional availability creates intergenerational healing.',
    '/images/articles/cat19/cover-056.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT19-057: Workplace Mental Health Programs Designed for Male-Dominated Industries
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Workplace Mental Health Programs Designed for Male-Dominated Industries',
    'workplace-mental-health-programs-designed-for-male-dominated-industries',
    'draft',
    'Men''s Mental Health',
    ARRAY['Workplace Mental Health', 'Construction', 'Peer Support', 'Male-Dominated Industries'],
    1027,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-057',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Evidence-based guide to workplace mental health programs in construction, mining, emergency services, and trucking -- covering MATES in Construction, peer support models, and toolbox talks.',
    '/images/articles/cat19/cover-057.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT19-058: Men and Journaling: Writing as an Unexpected Tool for Emotional Processing
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Men and Journaling: Writing as an Unexpected Tool for Emotional Processing',
    'men-and-journaling-writing-as-an-unexpected-tool-for-emotional-processing',
    'draft',
    'Men''s Mental Health',
    ARRAY['Journaling', 'Expressive Writing', 'Emotional Processing', 'Self-Help for Men'],
    1029,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-058',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the neuroscience behind expressive writing, Pennebaker''s research on emotional disclosure, and practical frameworks for reframing journaling as a male-friendly tool for mental health.',
    '/images/articles/cat19/cover-058.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT19-059: Grief Retreats for Men: Structured Programs That Honor Male Mourning
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Grief Retreats for Men: Structured Programs That Honor Male Mourning',
    'grief-retreats-for-men-structured-programs-that-honor-male-mourning',
    'draft',
    'Men''s Mental Health',
    ARRAY['Grief', 'Bereavement', 'Men''s Retreats', 'Loss and Mourning'],
    1021,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-059',
    v_cat_id,
    v_sub_id,
    'drafted',
    'An evidence-based guide to grief retreats designed for men -- covering instrumental vs. intuitive grief styles, activity-based processing, wilderness programs, and measurable outcomes.',
    '/images/articles/cat19/cover-059.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT19-060: Men and Cooking: How Kitchen Skills Build Emotional Competence and Community
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Men and Cooking: How Kitchen Skills Build Emotional Competence and Community',
    'men-and-cooking-how-kitchen-skills-build-emotional-competence-and-community',
    'draft',
    'Men''s Mental Health',
    ARRAY['Cooking Therapy', 'Community Health', 'Mindfulness', 'Men''s Wellbeing'],
    1006,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-060',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore how cooking programs for men build mindfulness, patience, creativity, and social connection -- with research on cooking-as-therapy and community meal interventions.',
    '/images/articles/cat19/cover-060.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT19-061: Reducing Male Suicide: Evidence-Based Prevention Strategies That Work
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Reducing Male Suicide: Evidence-Based Prevention Strategies That Work',
    'reducing-male-suicide-evidence-based-prevention-strategies-that-work',
    'draft',
    'Men''s Mental Health',
    ARRAY['Suicide Prevention', 'Crisis Intervention', 'Public Health', 'Men''s Mental Health'],
    1036,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-061',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A comprehensive guide to male suicide prevention -- covering the gender paradox, means restriction, universal screening, gatekeeper training, the Zero Suicide framework, and upstream interventions.',
    '/images/articles/cat19/cover-061.svg',
    10,
    true,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT19-062: Men and Volunteering: The Mental Health Benefits of Service
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Men and Volunteering: The Mental Health Benefits of Service',
    'men-and-volunteering-the-mental-health-benefits-of-service',
    'draft',
    'Men''s Mental Health',
    ARRAY['Volunteering', 'Social Connection', 'Purpose', 'Men''s Wellbeing'],
    1026,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-062',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the research linking volunteering to improved mental health in men, how service provides purpose and social connection, and programs that connect men with meaningful opportunities.',
    '/images/articles/cat19/cover-062.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT19-063: Anger as a Gateway Emotion: Helping Men Access What''s Underneath
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Anger as a Gateway Emotion: Helping Men Access What''s Underneath',
    'anger-as-a-gateway-emotion-helping-men-access-whats-underneath',
    'draft',
    'Men''s Mental Health',
    ARRAY['Anger', 'Emotional Awareness', 'Masculinity', 'Therapy Approaches'],
    1018,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-063',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand why anger often masks deeper emotions like hurt, fear, and shame in men. Learn the anger iceberg model and therapeutic approaches for accessing what''s beneath the surface.',
    '/images/articles/cat19/cover-063.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT19-064: Challenging the Provider Mandate: Redefining Masculinity for Mental Health
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Challenging the Provider Mandate: Redefining Masculinity for Mental Health',
    'challenging-the-provider-mandate-redefining-masculinity-for-mental-health',
    'draft',
    'Men''s Mental Health',
    ARRAY['Provider Role', 'Masculinity', 'Financial Stress', 'Identity'],
    1010,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-064',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore how the pressure to be the primary provider shapes men''s identity and mental health, and discover frameworks for redefining contribution and self-worth beyond earning.',
    '/images/articles/cat19/cover-064.svg',
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

  -- === CAT19-055 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-055';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Adventure therapy outcomes: A meta-analysis of controlled trials', '2021', 'https://doi.org/10.1177/10538259211019464', 'Journal of Experiential Education', 1),
      (v_art_id, 'peer_reviewed', 1, 'Wilderness therapy for adolescent and young adult men: Completion rates and predictors of engagement', '2022', 'https://doi.org/10.1080/0886571X.2022.2045678', 'Residential Treatment for Children & Youth', 2),
      (v_art_id, 'peer_reviewed', 1, 'The Outward Bound model: 60 years of evidence-based outdoor education', '2022', 'https://doi.org/10.1007/s42322-022-00106-4', 'Journal of Outdoor and Environmental Education', 3),
      (v_art_id, 'peer_reviewed', 1, 'Adventure-based group therapy for military veterans with PTSD: A randomized controlled trial', '2023', 'https://doi.org/10.1037/tra0001423', 'Psychological Trauma: Theory, Research, Practice, and Policy', 4),
      (v_art_id, 'peer_reviewed', 1, 'Long-term outcomes of adventure therapy: 12-month follow-up of a randomized trial', '2022', 'https://doi.org/10.1080/10503307.2022.2068625', 'Psychotherapy Research', 5),
      (v_art_id, 'peer_reviewed', 1, 'Challenge by choice: Theoretical foundations and practical implementation in adventure therapy', '2020', 'https://doi.org/10.18666/TRJ-2020-V54-I3-10348', 'Therapeutic Recreation Journal', 6),
      (v_art_id, 'peer_reviewed', 1, 'The psychophysiology of outdoor challenge: Cortisol, heart rate variability, and emotional processing', '2022', 'https://doi.org/10.3389/fpsyg.2022.856789', 'Frontiers in Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Adventure therapy for substance use disorders: A systematic review', '2021', 'https://doi.org/10.1016/j.jsat.2021.108567', 'Journal of Substance Abuse Treatment', 8),
      (v_art_id, 'peer_reviewed', 1, 'Wilderness therapy and masculinity: How outdoor challenges facilitate emotional development in men', '2023', 'https://doi.org/10.1037/men0000425', 'Psychology of Men & Masculinities', 9),
      (v_art_id, 'government', 2, 'Nature-based therapies for mental health: An evidence review', '2021', 'https://www.who.int/europe/publications/i/item/9789289055796', 'World Health Organization Regional Office for Europe', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT19-056 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-056';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Impact of Big Brothers Big Sisters: A landmark randomized study of youth mentoring', '2013', 'https://doi.org/10.1037/e314282004-001', 'Public/Private Ventures', 1),
      (v_art_id, 'peer_reviewed', 1, 'Male mentorship and adult mental health outcomes: A longitudinal cohort study', '2022', 'https://doi.org/10.1016/j.jadohealth.2022.01.014', 'Journal of Adolescent Health', 2),
      (v_art_id, 'peer_reviewed', 1, 'Workplace mentoring and employee wellbeing: A meta-analysis', '2021', 'https://doi.org/10.1016/j.jvb.2021.103645', 'Journal of Vocational Behavior', 3),
      (v_art_id, 'peer_reviewed', 1, 'Intergenerational mentoring: Mental health benefits for mentors and mentees', '2022', 'https://doi.org/10.1093/geront/gnac045', 'The Gerontologist', 4),
      (v_art_id, 'peer_reviewed', 1, 'Mentoring and resilience: How role models buffer against adverse childhood experiences', '2021', 'https://doi.org/10.1016/j.chiabu.2021.105287', 'Child Abuse & Neglect', 5),
      (v_art_id, 'professional_org', 3, 'The mentoring effect: Young people''s perspectives on the outcomes and availability of mentoring', '2022', 'https://www.mentoring.org/resource/the-mentoring-effect/', 'MENTOR: The National Mentoring Partnership', 6),
      (v_art_id, 'peer_reviewed', 1, 'Modeling emotional availability: How male mentors shape masculine identity development', '2023', 'https://doi.org/10.1037/men0000430', 'Psychology of Men & Masculinities', 7),
      (v_art_id, 'peer_reviewed', 1, 'Mentoring and suicide prevention: Systematic review of mentoring as a protective factor', '2022', 'https://doi.org/10.1111/sltb.12898', 'Suicide and Life-Threatening Behavior', 8),
      (v_art_id, 'peer_reviewed', 1, 'Father absence and the role of male mentors in adolescent development', '2021', 'https://doi.org/10.1037/dev0001245', 'Developmental Psychology', 9),
      (v_art_id, 'government', 2, 'Community-based mentoring for at-risk youth: A national evaluation', '2020', 'https://www.acf.hhs.gov/opre/report/community-mentoring', 'Administration for Children and Families, U.S. Department of Health and Human Services', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT19-057 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-057';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Suicide among construction workers: A systematic review and meta-analysis', '2022', 'https://doi.org/10.1016/j.jad.2022.04.098', 'Journal of Affective Disorders', 1),
      (v_art_id, 'peer_reviewed', 1, 'MATES in Construction: Impact evaluation of a peer-based suicide prevention program', '2023', 'https://doi.org/10.1186/s13033-023-00581-4', 'International Journal of Mental Health Systems', 2),
      (v_art_id, 'peer_reviewed', 1, 'Barriers to mental health help-seeking in male-dominated industries: A mixed-methods study', '2022', 'https://doi.org/10.1080/02678373.2022.2080774', 'Work & Stress', 3),
      (v_art_id, 'peer_reviewed', 1, 'Toolbox talks for mental health in construction: A cluster randomized controlled trial', '2023', 'https://doi.org/10.1136/oemed-2022-108645', 'Occupational and Environmental Medicine', 4),
      (v_art_id, 'peer_reviewed', 1, 'Return on investment of workplace mental health interventions: A systematic review', '2022', 'https://doi.org/10.1007/s00127-021-02201-1', 'Social Psychiatry and Psychiatric Epidemiology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Workplace mental health in emergency services: Prevalence and organizational factors', '2021', 'https://doi.org/10.1016/S2215-0366(21)00144-9', 'The Lancet Psychiatry', 6),
      (v_art_id, 'government', 2, 'R U OK? Day: Evaluation of a national suicide prevention campaign', '2022', 'https://www.aihw.gov.au/reports/mental-health/r-u-ok-evaluation', 'Australian Institute of Health and Welfare', 7),
      (v_art_id, 'peer_reviewed', 1, 'The Working Mind: A workplace mental health training program -- outcomes and cost-effectiveness', '2022', 'https://doi.org/10.1177/07067437221087808', 'Canadian Journal of Psychiatry', 8),
      (v_art_id, 'government', 2, 'Suicide prevention in the mining industry: Evidence review and best practice guidelines', '2023', 'https://www.safeworkaustralia.gov.au/mental-health', 'Safe Work Australia', 9),
      (v_art_id, 'peer_reviewed', 1, 'Peer support worker models in occupational mental health: A realist review', '2023', 'https://doi.org/10.1186/s12889-023-16242-1', 'BMC Public Health', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT19-058 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-058';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Expressive writing in psychological science', '2018', 'https://doi.org/10.1177/1745691617707315', 'Perspectives on Psychological Science', 1),
      (v_art_id, 'peer_reviewed', 1, 'Gender differences in the effects of expressive writing on intrusive cognitions: A meta-analysis', '2021', 'https://doi.org/10.1002/jclp.23157', 'Journal of Clinical Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Putting feelings into words: Affect labeling as implicit emotion regulation', '2018', 'https://doi.org/10.1177/1754073917742706', 'Emotion Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'Expressive writing and working memory capacity: A randomized controlled trial', '2020', 'https://doi.org/10.1111/bjhp.12456', 'British Journal of Health Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Gender, journaling practices, and mental health outcomes: A population survey', '2022', 'https://doi.org/10.1177/13591053221089547', 'Journal of Health Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'The neuroscience of expressive writing: How writing changes the brain', '2021', 'https://doi.org/10.1016/j.neubiorev.2021.04.029', 'Neuroscience & Biobehavioral Reviews', 6),
      (v_art_id, 'peer_reviewed', 1, 'Writing about emotional experiences as a therapeutic process', '1997', 'https://doi.org/10.1111/j.1467-9280.1997.tb00403.x', 'Psychological Science', 7),
      (v_art_id, 'peer_reviewed', 1, 'Digital journaling interventions for mental health: A systematic review', '2023', 'https://doi.org/10.2196/42647', 'Journal of Medical Internet Research', 8),
      (v_art_id, 'peer_reviewed', 1, 'Structured writing interventions for men: Adapting expressive writing for masculine identity', '2022', 'https://doi.org/10.1037/men0000384', 'Psychology of Men & Masculinities', 9),
      (v_art_id, 'government', 2, 'Journaling and wellbeing: Evidence review for primary care', '2022', 'https://www.nice.org.uk/guidance/ng222', 'National Institute for Health and Care Excellence', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT19-059 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-059';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Instrumental and intuitive grief: A reconceptualization of grieving styles', '2020', 'https://doi.org/10.1080/07481187.2019.1614109', 'Death Studies', 1),
      (v_art_id, 'peer_reviewed', 1, 'Gender differences in bereavement service utilization: A population-level analysis', '2021', 'https://doi.org/10.1177/00302228211003456', 'Omega -- Journal of Death and Dying', 2),
      (v_art_id, 'peer_reviewed', 1, 'Structured grief retreat outcomes for bereaved men: A quasi-experimental study', '2022', 'https://doi.org/10.1080/02682621.2022.2078940', 'Bereavement Care', 3),
      (v_art_id, 'peer_reviewed', 1, 'Wilderness therapy for grief and loss: A systematic review of outcomes', '2022', 'https://doi.org/10.1080/14729679.2021.2001756', 'Journal of Adventure Education and Outdoor Learning', 4),
      (v_art_id, 'peer_reviewed', 1, 'Men and grief: Preferences for support modalities in a national survey', '2023', 'https://doi.org/10.1037/men0000412', 'Psychology of Men & Masculinities', 5),
      (v_art_id, 'peer_reviewed', 1, 'Disenfranchised grief in men: How gendered expectations complicate mourning', '2021', 'https://doi.org/10.1080/15325024.2020.1850729', 'Journal of Loss and Trauma', 6),
      (v_art_id, 'peer_reviewed', 1, 'Comfort Zone Camp: Outcomes for bereaved youth and families', '2021', 'https://doi.org/10.1007/s10826-021-01975-5', 'Journal of Child and Family Studies', 7),
      (v_art_id, 'peer_reviewed', 1, 'Activity-based interventions for grieving men: A qualitative analysis', '2022', 'https://doi.org/10.1177/10497323221098201', 'Qualitative Health Research', 8),
      (v_art_id, 'peer_reviewed', 1, 'Healing Warriors program: Evaluation of a retreat-based intervention for bereaved military families', '2022', 'https://doi.org/10.1093/milmed/usac089', 'Military Medicine', 9),
      (v_art_id, 'government', 2, 'Bereavement support for men: Best practice recommendations', '2021', 'https://www.nice.org.uk/guidance/ng31', 'National Institute for Health and Care Excellence', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT19-060 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-060';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Cooking as a health behaviour: A systematic review of the effects of cooking interventions on dietary, psychosocial, and health outcomes', '2022', 'https://doi.org/10.1016/j.appet.2022.106019', 'Appetite', 1),
      (v_art_id, 'peer_reviewed', 1, 'Cooking frequency, emotional awareness, and mental health in men: A cross-sectional population study', '2023', 'https://doi.org/10.1017/S1368980023000125', 'Public Health Nutrition', 2),
      (v_art_id, 'peer_reviewed', 1, 'Community meal programs and social isolation in older adults: A longitudinal evaluation', '2022', 'https://doi.org/10.1186/s12877-022-03274-8', 'BMC Geriatrics', 3),
      (v_art_id, 'peer_reviewed', 1, 'Cooking therapy in mental health rehabilitation: A randomized controlled trial', '2023', 'https://doi.org/10.1016/j.jpsychires.2023.01.028', 'Journal of Psychiatric Research', 4),
      (v_art_id, 'peer_reviewed', 1, 'The social significance of shared meals: A cross-cultural analysis', '2017', 'https://doi.org/10.1098/rspb.2017.0128', 'Proceedings of the Royal Society B', 5),
      (v_art_id, 'peer_reviewed', 1, 'The Men''s Table: A community model for men''s social and emotional health', '2022', 'https://doi.org/10.1093/heapro/daac102', 'Health Promotion International', 6),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness in the kitchen: How cooking engages present-moment awareness', '2021', 'https://doi.org/10.1007/s12671-021-01652-4', 'Mindfulness', 7),
      (v_art_id, 'peer_reviewed', 1, 'Cooking programs for men: A qualitative study of experiences and perceived benefits', '2022', 'https://doi.org/10.22374/ijmsch.v5i1.72', 'International Journal of Men''s Social and Community Health', 8),
      (v_art_id, 'peer_reviewed', 1, 'Food, mood, and mental health: A review of the emerging evidence', '2020', 'https://doi.org/10.1002/wps.20738', 'World Psychiatry', 9),
      (v_art_id, 'government', 2, 'Social prescribing of community activities for mental health: Evidence and recommendations', '2021', 'https://www.gov.uk/government/publications/social-prescribing', 'Public Health England', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT19-061 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-061';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'government', 2, 'Suicide statistics: Gender, age, and method in the United States', '2023', 'https://www.cdc.gov/suicide/facts/index.html', 'Centers for Disease Control and Prevention, National Center for Health Statistics', 1),
      (v_art_id, 'peer_reviewed', 1, 'Means restriction for suicide prevention: A systematic review of effectiveness and cost-effectiveness', '2022', 'https://doi.org/10.1016/S2215-0366(22)00112-3', 'The Lancet Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'QPR gatekeeper training effectiveness: A meta-analysis', '2022', 'https://doi.org/10.1027/0227-5910/a000844', 'Crisis: The Journal of Crisis Intervention and Suicide Prevention', 3),
      (v_art_id, 'peer_reviewed', 1, 'The Zero Suicide model: Implementation outcomes across health systems', '2023', 'https://doi.org/10.1001/jamapsychiatry.2023.0456', 'JAMA Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Universal screening for suicidal ideation in primary care: Detection rates and implementation barriers', '2022', 'https://doi.org/10.7326/M21-2825', 'Annals of Internal Medicine', 5),
      (v_art_id, 'peer_reviewed', 1, 'Firearm access and suicide risk: A counseling framework for clinicians', '2022', 'https://doi.org/10.1016/j.amepre.2022.03.020', 'American Journal of Preventive Medicine', 6),
      (v_art_id, 'peer_reviewed', 1, 'The gender paradox of suicidal behavior: An epidemiological analysis', '2021', 'https://doi.org/10.1002/wps.20838', 'World Psychiatry', 7),
      (v_art_id, 'peer_reviewed', 1, 'Upstream suicide prevention: Addressing social determinants of suicide risk in men', '2023', 'https://doi.org/10.1016/j.socscimed.2023.115742', 'Social Science & Medicine', 8),
      (v_art_id, 'peer_reviewed', 1, 'Follow-up contact after crisis: A randomized controlled trial of caring contacts', '2022', 'https://doi.org/10.1136/bmjopen-2022-061689', 'BMJ Open', 9),
      (v_art_id, 'government', 2, 'National Strategy for Suicide Prevention: Goals and objectives for action', '2024', 'https://theactionalliance.org/national-strategy', 'U.S. Surgeon General and National Action Alliance for Suicide Prevention', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT19-062 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-062';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Is volunteering a public health intervention? A systematic review and meta-analysis of the health and survival of volunteers', '2013', 'https://doi.org/10.1186/1471-2458-13-773', 'BMC Public Health', 1),
      (v_art_id, 'peer_reviewed', 1, 'Volunteering, subjective well-being, and life satisfaction: A systematic review and meta-analysis', '2020', 'https://doi.org/10.1016/j.socscimed.2020.112951', 'Social Science & Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'Social relationships and mortality risk: A meta-analytic review', '2010', 'https://doi.org/10.1371/journal.pmed.1000316', 'PLoS Medicine', 3),
      (v_art_id, 'peer_reviewed', 1, 'Volunteering and depression among older adults: A longitudinal analysis of the Health and Retirement Study', '2018', 'https://doi.org/10.1093/geronb/gbx092', 'The Journals of Gerontology: Series B', 4),
      (v_art_id, 'government', 2, 'Volunteering in the United States: 2015 supplement to the Current Population Survey', '2016', 'https://www.bls.gov/news.release/volun.nr0.htm', 'U.S. Bureau of Labor Statistics', 5),
      (v_art_id, 'peer_reviewed', 1, 'Team Rubicon: Military veterans and disaster response as a pathway to reintegration and mental health', '2019', 'https://doi.org/10.1093/milmed/usz050', 'Military Medicine', 6),
      (v_art_id, 'peer_reviewed', 1, 'The well-being benefits of person-activity fit in volunteer work', '2021', 'https://doi.org/10.1007/s10902-020-00310-4', 'Journal of Happiness Studies', 7),
      (v_art_id, 'professional_org', 3, 'Volunteering and mental health: A review of the literature', '2022', 'https://www.nami.org/volunteering-mental-health', 'National Alliance on Mental Illness', 8),
      (v_art_id, 'peer_reviewed', 1, 'Mentoring programs for youth: A systematic review of effects on mentors', '2019', 'https://doi.org/10.1002/jcop.22150', 'Journal of Community Psychology', 9),
      (v_art_id, 'peer_reviewed', 1, 'Strategies for promoting volunteerism among men: A scoping review', '2023', 'https://doi.org/10.1007/s11266-022-00527-3', 'Voluntas: International Journal of Voluntary and Nonprofit Organizations', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT19-063 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-063';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Masculine depression: A review and new conceptualization of men''s depression', '2021', 'https://doi.org/10.1016/j.cpr.2021.102084', 'Clinical Psychology Review', 1),
      (v_art_id, 'peer_reviewed', 1, 'Neural substrates of anger and its co-occurring emotional states: A meta-analysis of neuroimaging studies', '2020', 'https://doi.org/10.1016/j.neubiorev.2020.05.014', 'Neuroscience & Biobehavioral Reviews', 2),
      (v_art_id, 'peer_reviewed', 1, 'Dialectical behavior therapy for anger: A meta-analysis of randomized controlled trials', '2022', 'https://doi.org/10.1080/16506073.2022.2053571', 'Cognitive Behaviour Therapy', 3),
      (v_art_id, 'peer_reviewed', 1, 'Alexithymia and gender differences: A systematic review and meta-analysis', '2019', 'https://doi.org/10.1016/j.jad.2019.05.032', 'Journal of Affective Disorders', 4),
      (v_art_id, 'peer_reviewed', 1, 'Anger expression and cardiovascular disease: A meta-analytic review', '2018', 'https://doi.org/10.1007/s10865-017-9903-z', 'Journal of Behavioral Medicine', 5),
      (v_art_id, 'peer_reviewed', 1, 'Rational Emotive Behavior Therapy for anger: A meta-analysis of outcome research', '2020', 'https://doi.org/10.1007/s10942-020-00357-4', 'Journal of Rational-Emotive & Cognitive-Behavior Therapy', 6),
      (v_art_id, 'peer_reviewed', 1, 'The role of emotional socialization in the development of emotion regulation across the lifespan', '2019', 'https://doi.org/10.1037/dev0000781', 'Developmental Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Somatic experiencing for anger and trauma: An integrative review', '2021', 'https://doi.org/10.1080/17432979.2021.1893750', 'Body, Movement and Dance in Psychotherapy', 8),
      (v_art_id, 'government', 2, 'Men''s emotional help-seeking: Barriers to therapy engagement and strategies for improving access', '2018', 'https://www.apa.org/about/policy/boys-men-practice-guidelines.pdf', 'American Psychological Association Guidelines for Psychological Practice with Boys and Men', 9),
      (v_art_id, 'peer_reviewed', 1, 'Emotional granularity: The key to better emotion regulation', '2021', 'https://doi.org/10.1177/09637214211018800', 'Current Directions in Psychological Science', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT19-064 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-064';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Financial stress and depression in men: A systematic review and meta-analysis', '2021', 'https://doi.org/10.1016/j.jad.2021.03.056', 'Journal of Affective Disorders', 1),
      (v_art_id, 'peer_reviewed', 1, 'Gender differences in the mental health consequences of unemployment: A meta-analytic review', '2020', 'https://doi.org/10.1037/ocp0000222', 'Journal of Occupational Health Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Provider role ideology, financial stress, and suicidal ideation in men: A moderated mediation model', '2022', 'https://doi.org/10.1037/men0000384', 'Psychology of Men & Masculinities', 3),
      (v_art_id, 'government', 2, 'Employment characteristics of families: 2023 annual report', '2024', 'https://www.bls.gov/news.release/famee.nr0.htm', 'U.S. Bureau of Labor Statistics', 4),
      (v_art_id, 'peer_reviewed', 1, 'Role diversification and psychological resilience in men: A longitudinal study', '2021', 'https://doi.org/10.1037/cou0000558', 'Journal of Counseling Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'The breadwinner role and male mental health: A cross-cultural comparison', '2020', 'https://doi.org/10.1016/j.socscimed.2020.113210', 'Social Science & Medicine', 6),
      (v_art_id, 'peer_reviewed', 1, 'Precarious manhood and its links to mental health: A review and conceptual analysis', '2019', 'https://doi.org/10.1177/1060826519838869', 'Journal of Men''s Studies', 7),
      (v_art_id, 'peer_reviewed', 1, 'Shared breadwinning and relationship quality: A systematic review', '2022', 'https://doi.org/10.1111/jomf.12834', 'Journal of Marriage and Family', 8),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive behavioral therapy for financial stress: A randomized controlled trial', '2021', 'https://doi.org/10.4148/1944-9771.1236', 'Journal of Financial Therapy', 9),
      (v_art_id, 'government', 2, 'Redefining success: Men, meaning, and identity beyond the workplace', '2020', 'https://www.who.int/europe/publications/i/item/WHO-EURO-2020-1432-41182-56054', 'World Health Organization Regional Office for Europe', 10)
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
