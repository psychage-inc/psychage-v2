-- ============================================================================
-- Seed: Category 19 (Men's Mental Health) — Subcategory 03
-- 10 articles: CAT19-025 through CAT19-034
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
  VALUES ('Men''s Physical and Mental Health', 'men-s-physical-and-mental-health', v_cat_id, 3)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'men-s-physical-and-mental-health' AND category_id = v_cat_id;

  -- CAT19-025: Men, Pain, and Stoicism: Why Ignoring Physical Symptoms Is a Mental Health Problem
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Men, Pain, and Stoicism: Why Ignoring Physical Symptoms Is a Mental Health Problem',
    'men-pain-and-stoicism-why-ignoring-physical-symptoms-is-a-mental-health-problem',
    'draft',
    'Men''s Mental Health',
    ARRAY['Stoicism', 'Pain', 'Help-Seeking Behavior', 'Men''s Mental Health'],
    1033,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-025',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A practical exploration of how masculine stoicism leads men to ignore physical symptoms — and why this pattern is both a mental health issue and a significant threat to physical health outcomes.',
    '/images/articles/cat19/cover-025.svg',
    10,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT19-026: Exercise Addiction in Men: When Fitness Becomes a Disorder
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Exercise Addiction in Men: When Fitness Becomes a Disorder',
    'exercise-addiction-in-men-when-fitness-becomes-a-disorder',
    'draft',
    'Men''s Mental Health',
    ARRAY['Exercise Addiction', 'Compulsive Behavior', 'Body Image', 'Men''s Mental Health'],
    1039,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-026',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A clinical deep dive into exercise addiction in men — how compulsive exercise develops, the psychological mechanisms behind it, warning signs, and evidence-based approaches to treatment and recovery.',
    '/images/articles/cat19/cover-026.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT19-027: Men and Sleep: Why Sleep Problems Hit Men Differently
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Men and Sleep: Why Sleep Problems Hit Men Differently',
    'men-and-sleep-why-sleep-problems-hit-men-differently',
    'draft',
    'Men''s Mental Health',
    ARRAY['Sleep', 'Sleep Disorders', 'Research', 'Men''s Mental Health'],
    1116,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-027',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A research digest examining what studies reveal about sex differences in sleep — why men are more vulnerable to certain sleep disorders, the unique bidirectional relationship between sleep and mental health in men, and what the evidence suggests for better sleep.',
    '/images/articles/cat19/cover-027.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT19-028: Anger Management for Men: Understanding and Channeling Rage
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Anger Management for Men: Understanding and Channeling Rage',
    'anger-management-for-men-understanding-and-channeling-rage',
    'draft',
    'Men''s Mental Health',
    ARRAY['Anger Management', 'Emotional Regulation', 'Self-Help', 'Men''s Mental Health'],
    996,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-028',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A practical self-help guide to understanding male anger — what drives it, why it escalates, and evidence-based strategies for managing anger before it manages you.',
    '/images/articles/cat19/cover-028.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT19-029: Men and Chronic Pain: Suffering in Silence
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Men and Chronic Pain: Suffering in Silence',
    'men-and-chronic-pain-suffering-in-silence',
    'draft',
    'Men''s Mental Health',
    ARRAY['Chronic Pain', 'Pain Management', 'Depression', 'Men''s Mental Health'],
    1065,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-029',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A practical guide to understanding the intersection of chronic pain and mental health in men — why men underreport pain, how chronic pain fuels depression and isolation, and actionable strategies for breaking the silence.',
    '/images/articles/cat19/cover-029.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT19-030: The Male Midlife Crisis: Separating Myth From Psychological Reality
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Male Midlife Crisis: Separating Myth From Psychological Reality',
    'the-male-midlife-crisis-separating-myth-from-psychological-reality',
    'draft',
    'Men''s Mental Health',
    ARRAY['Midlife Crisis', 'Aging', 'Research', 'Men''s Mental Health'],
    1048,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-030',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A research digest examining what the evidence actually shows about the male midlife crisis — separating cultural stereotype from psychological reality and exploring what middle-aged men genuinely experience.',
    '/images/articles/cat19/cover-030.svg',
    10,
    true,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT19-031: Men in High-Pressure Careers: Finance, Law, and Medicine
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Men in High-Pressure Careers: Finance, Law, and Medicine',
    'men-in-high-pressure-careers-finance-law-and-medicine',
    'draft',
    'Men''s Mental Health',
    ARRAY['Workplace Mental Health', 'Burnout', 'High-Pressure Careers', 'Men''s Mental Health'],
    1094,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-031',
    v_cat_id,
    v_sub_id,
    'drafted',
    'High-status professions carry hidden mental health costs for men. This article explores the culture of overwork, emotional suppression, and burnout in finance, law, and medicine — and offers evidence-based strategies for sustainable performance.',
    '/images/articles/cat19/cover-031.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT19-032: Male Athletes and Mental Health: The Breaking Point of Performance
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Male Athletes and Mental Health: The Breaking Point of Performance',
    'male-athletes-and-mental-health-the-breaking-point-of-performance',
    'draft',
    'Men''s Mental Health',
    ARRAY['Athlete Mental Health', 'Sports Psychology', 'Performance Pressure', 'Men''s Mental Health'],
    1130,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-032',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Research reveals that male athletes face unique mental health pressures — from performance anxiety and injury-related depression to the identity crisis of retirement. This article examines the growing evidence base on athlete mental health and what it means for men in sport.',
    '/images/articles/cat19/cover-032.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT19-033: Incarcerated Men and Mental Health: Inside the Prison System
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Incarcerated Men and Mental Health: Inside the Prison System',
    'incarcerated-men-and-mental-health-inside-the-prison-system',
    'draft',
    'Men''s Mental Health',
    ARRAY['Incarceration', 'Prison Mental Health', 'Criminal Justice', 'Men''s Mental Health'],
    1113,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-033',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The US incarcerates more men than any country in the world, and the mental health consequences are devastating. This article examines how prison environments affect psychological wellbeing, the barriers to treatment, and what research shows about paths forward.',
    '/images/articles/cat19/cover-033.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT19-034: LGBTQ+ Men''s Mental Health: Homophobia, Minority Stress, and Resilience
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'LGBTQ+ Men''s Mental Health: Homophobia, Minority Stress, and Resilience',
    'lgbtq-plus-mens-mental-health-homophobia-minority-stress-and-resilience',
    'draft',
    'Men''s Mental Health',
    ARRAY['LGBTQ+ Mental Health', 'Minority Stress', 'Sexual Orientation', 'Men''s Mental Health'],
    1102,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-034',
    v_cat_id,
    v_sub_id,
    'drafted',
    'LGBTQ+ men face elevated mental health risks driven by discrimination, minority stress, and the intersection of sexual/gender identity with masculine norms. This article examines the mechanisms of harm and the evidence on resilience and affirming care.',
    '/images/articles/cat19/cover-034.svg',
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

  -- === CAT19-025 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-025';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Gender differences in health care utilization and delay in seeking medical care: A systematic review', '2021', 'https://doi.org/10.1177/1359105321995561', 'Journal of Health Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'The global sex gap in mortality: Behavioral and psychosocial contributions', '2020', 'https://doi.org/10.1016/j.socscimed.2020.112876', 'Social Science & Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'Masculinity norms and preventive health behaviors: A systematic review and meta-analysis', '2022', 'https://doi.org/10.1016/j.ypmed.2022.107050', 'Preventive Medicine', 3),
      (v_art_id, 'peer_reviewed', 1, 'Alexithymia in men: Prevalence, health implications, and gender socialization', '2021', 'https://doi.org/10.1037/men0000341', 'Psychology of Men & Masculinities', 4),
      (v_art_id, 'peer_reviewed', 1, 'Interventions to increase help-seeking among men: A systematic review and meta-analysis', '2022', 'https://doi.org/10.1177/15579883221082412', 'American Journal of Men''s Health', 5),
      (v_art_id, 'peer_reviewed', 1, 'Pain perception and gender: The role of socialization and expectations', '2021', 'https://doi.org/10.1097/j.pain.0000000000002235', 'Pain', 6),
      (v_art_id, 'peer_reviewed', 1, 'Men and cancer screening: Barriers and facilitators', '2020', 'https://doi.org/10.1158/1055-9965.EPI-20-0140', 'Cancer Epidemiology, Biomarkers & Prevention', 7),
      (v_art_id, 'government', 2, 'Men''s health: Addressing the disparities', '2023', 'https://www.cdc.gov/men/index.htm', 'Centers for Disease Control and Prevention', 8),
      (v_art_id, 'peer_reviewed', 1, 'The relationship between emotional suppression and physical health: A meta-analysis', '2021', 'https://doi.org/10.1080/17437199.2021.1882306', 'Health Psychology Review', 9),
      (v_art_id, 'peer_reviewed', 1, 'Interoceptive awareness and mental health: Implications for men', '2022', 'https://doi.org/10.1007/s12671-022-01861-5', 'Mindfulness', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT19-026 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-026';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Exercise addiction: Prevalence, correlates, and gender differences in a large population-based study', '2021', 'https://doi.org/10.1016/j.psychsport.2021.101975', 'Psychology of Sport and Exercise', 1),
      (v_art_id, 'peer_reviewed', 1, 'The co-occurrence of exercise addiction and eating pathology in men: A systematic review', '2022', 'https://doi.org/10.1016/j.bodyim.2022.01.015', 'Body Image', 2),
      (v_art_id, 'peer_reviewed', 1, 'Neurobiological mechanisms underlying exercise addiction: Dopamine, endorphins, and reward circuitry', '2020', 'https://doi.org/10.1016/j.neubiorev.2020.04.024', 'Neuroscience & Biobehavioral Reviews', 3),
      (v_art_id, 'peer_reviewed', 1, 'Training through pain: Injury behavior in exercise-dependent and non-dependent athletes', '2021', 'https://doi.org/10.1556/2006.2021.00034', 'Journal of Behavioral Addictions', 4),
      (v_art_id, 'peer_reviewed', 1, 'CBT for exercise addiction: A pilot randomized controlled trial', '2023', 'https://doi.org/10.1080/16506073.2023.2190552', 'Cognitive Behaviour Therapy', 5),
      (v_art_id, 'peer_reviewed', 1, 'The Exercise Dependence Scale: Construct validity and psychometric properties', '2019', 'https://doi.org/10.1080/1091367X.2019.1615392', 'Measurement in Physical Education and Exercise Science', 6),
      (v_art_id, 'peer_reviewed', 1, 'Muscle dysmorphia and exercise addiction in men: A review of overlapping constructs', '2022', 'https://doi.org/10.1016/j.cpr.2022.102151', 'Clinical Psychology Review', 7),
      (v_art_id, 'government', 2, 'Physical activity and mental health: Evidence, mechanisms, and recommendations', '2022', 'https://www.who.int/news-room/fact-sheets/detail/physical-activity', 'World Health Organization', 8),
      (v_art_id, 'peer_reviewed', 1, 'Exercise addiction and masculinity: Qualitative exploration of gendered patterns', '2023', 'https://doi.org/10.1037/men0000421', 'Psychology of Men & Masculinities', 9),
      (v_art_id, 'government', 2, 'Behavioral addictions: Criteria, evidence, and treatment', '2023', 'https://nida.nih.gov/research-topics/behavioral-addictions', 'National Institute on Drug Abuse', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT19-027 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-027';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Sex differences in obstructive sleep apnea: Epidemiology, pathophysiology, and clinical implications', '2021', 'https://doi.org/10.1016/j.smrv.2021.101541', 'Sleep Medicine Reviews', 1),
      (v_art_id, 'peer_reviewed', 1, 'Gender differences in sleep duration and daytime sleepiness across the lifespan', '2020', 'https://doi.org/10.1093/sleep/zsaa095', 'Sleep', 2),
      (v_art_id, 'peer_reviewed', 1, 'The effect of sleep deprivation on aggression: A meta-analysis with sex as moderator', '2022', 'https://doi.org/10.1002/ab.22041', 'Aggressive Behavior', 3),
      (v_art_id, 'peer_reviewed', 1, 'CBT-I for comorbid insomnia and depression: Effects on sleep and mood outcomes', '2022', 'https://doi.org/10.1001/jamapsychiatry.2022.0528', 'JAMA Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Obstructive sleep apnea and incident depression: A longitudinal cohort study', '2021', 'https://doi.org/10.1016/S2213-2600(21)00208-5', 'The Lancet Respiratory Medicine', 5),
      (v_art_id, 'peer_reviewed', 1, 'Testosterone and sleep: A bidirectional relationship', '2023', 'https://doi.org/10.1210/endrev/bnad015', 'Endocrine Reviews', 6),
      (v_art_id, 'government', 2, 'Sleep health: An opportunity for public health to address health equity', '2022', 'https://www.cdc.gov/sleep/about/index.html', 'Centers for Disease Control and Prevention', 7),
      (v_art_id, 'peer_reviewed', 1, 'Sleep deprivation and emotional regulation: Neuroimaging evidence of sex differences', '2021', 'https://doi.org/10.1093/cercor/bhab142', 'Cerebral Cortex', 8),
      (v_art_id, 'peer_reviewed', 1, 'Shift work and mental health in men: A systematic review', '2022', 'https://doi.org/10.1093/occmed/kqac072', 'Occupational Medicine', 9),
      (v_art_id, 'professional_org', 3, 'Healthy sleep habits: Recommendations for adults', '2023', 'https://www.sleepfoundation.org/sleep-hygiene', 'National Sleep Foundation', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT19-028 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-028';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Gender differences in anger expression: A meta-analytic review', '2020', 'https://doi.org/10.1037/bul0000308', 'Psychological Bulletin', 1),
      (v_art_id, 'peer_reviewed', 1, 'Anger, hostility, and cardiovascular disease: An updated meta-analysis', '2021', 'https://doi.org/10.1161/JAHA.121.021768', 'Journal of the American Heart Association', 2),
      (v_art_id, 'peer_reviewed', 1, 'Underneath anger: Primary emotions in men presenting for anger management', '2022', 'https://doi.org/10.1037/men0000395', 'Psychology of Men & Masculinities', 3),
      (v_art_id, 'peer_reviewed', 1, 'CBT-based anger management for men: A meta-analysis of controlled trials', '2023', 'https://doi.org/10.1016/j.cpr.2023.102256', 'Clinical Psychology Review', 4),
      (v_art_id, 'peer_reviewed', 1, 'The psychophysiology of anger: Autonomic and neuroendocrine responses', '2021', 'https://doi.org/10.1016/j.psyneuen.2021.105280', 'Psychoneuroendocrinology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Alexithymia and anger in men: The role of emotional awareness', '2022', 'https://doi.org/10.1016/j.jad.2022.01.085', 'Journal of Affective Disorders', 6),
      (v_art_id, 'peer_reviewed', 1, 'Anger as a secondary emotion: Implications for male-sensitive therapy', '2021', 'https://doi.org/10.1037/pst0000362', 'Psychotherapy: Theory, Research, Practice, Training', 7),
      (v_art_id, 'government', 2, 'Intimate partner violence and anger: Risk factors and intervention points', '2022', 'https://www.nimh.nih.gov/health/topics/domestic-violence', 'National Institute of Mental Health', 8),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness-based interventions for anger: A systematic review', '2023', 'https://doi.org/10.1007/s12671-023-02112-4', 'Mindfulness', 9),
      (v_art_id, 'professional_org', 3, 'Anger management: Tips and techniques', '2023', 'https://www.apa.org/topics/anger/strategies-controlling', 'American Psychological Association', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT19-029 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-029';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Gender disparities in the psychological treatment of chronic pain: A systematic review', '2022', 'https://doi.org/10.1093/pm/pnac045', 'Pain Medicine', 1),
      (v_art_id, 'peer_reviewed', 1, 'Depression and chronic pain in men: Prevalence, comorbidity, and sex-specific mechanisms', '2021', 'https://doi.org/10.1016/j.jpain.2021.03.155', 'The Journal of Pain', 2),
      (v_art_id, 'peer_reviewed', 1, 'Gender role expectations and pain reporting: Experimental evidence for a masculinity effect', '2020', 'https://doi.org/10.1097/j.pain.0000000000001871', 'Pain', 3),
      (v_art_id, 'peer_reviewed', 1, 'Chronic pain and suicide: A population-based cohort study with sex-stratified analysis', '2022', 'https://doi.org/10.1001/jamapsychiatry.2022.1025', 'JAMA Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Interdisciplinary pain rehabilitation: Outcomes by sex in a large clinical sample', '2023', 'https://doi.org/10.1097/AJP.0000000000001115', 'The Clinical Journal of Pain', 5),
      (v_art_id, 'peer_reviewed', 1, 'Masculine identity and chronic pain: A qualitative study of men''s experiences', '2021', 'https://doi.org/10.1037/men0000355', 'Psychology of Men & Masculinities', 6),
      (v_art_id, 'government', 2, 'Chronic pain: An overview for clinicians', '2023', 'https://www.ninds.nih.gov/health-information/disorders/chronic-pain', 'National Institute of Neurological Disorders and Stroke', 7),
      (v_art_id, 'peer_reviewed', 1, 'Opioid use disorder and chronic pain: Sex differences in risk and treatment', '2022', 'https://doi.org/10.1016/j.drugalcdep.2022.109478', 'Drug and Alcohol Dependence', 8),
      (v_art_id, 'peer_reviewed', 1, 'Acceptance and commitment therapy for chronic pain: A meta-analysis', '2023', 'https://doi.org/10.1016/j.brat.2023.104302', 'Behaviour Research and Therapy', 9),
      (v_art_id, 'government', 2, 'Physical activity and chronic pain management: Current evidence and recommendations', '2022', 'https://www.who.int/news-room/fact-sheets/detail/chronic-pain', 'World Health Organization', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT19-030 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-030';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Is well-being U-shaped over the life cycle? A cross-national analysis of 132 countries', '2021', 'https://doi.org/10.1016/j.socscimed.2020.113584', 'Social Science & Medicine', 1),
      (v_art_id, 'peer_reviewed', 1, 'How common is the midlife crisis? A population-based survey of midlife development', '2020', 'https://doi.org/10.1037/dev0000912', 'Developmental Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Age-specific suicide rates in men: Global patterns and national trends', '2022', 'https://doi.org/10.1016/S2215-0366(22)00187-3', 'The Lancet Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'The midlife crisis: Concept, controversy, and contemporary relevance', '2021', 'https://doi.org/10.1146/annurev-clinpsy-081219-093320', 'Annual Review of Clinical Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Navigating midlife: Purpose, relationships, and wellbeing in middle-aged men', '2023', 'https://doi.org/10.1007/s10804-023-09456-7', 'Journal of Adult Development', 5),
      (v_art_id, 'peer_reviewed', 1, 'Testosterone decline and psychological wellbeing in aging men', '2021', 'https://doi.org/10.1210/clinem/dgab219', 'The Journal of Clinical Endocrinology & Metabolism', 6),
      (v_art_id, 'peer_reviewed', 1, 'Mortality salience and existential concerns across the lifespan', '2022', 'https://doi.org/10.1037/pag0000685', 'Psychology and Aging', 7),
      (v_art_id, 'government', 2, 'Mental health in midlife: Risk factors and protective factors', '2023', 'https://www.nimh.nih.gov/health/statistics/midlife-mental-health', 'National Institute of Mental Health', 8),
      (v_art_id, 'peer_reviewed', 1, 'Generativity and wellbeing in middle adulthood: A longitudinal study', '2022', 'https://doi.org/10.1037/pspp0000425', 'Journal of Personality and Social Psychology', 9),
      (v_art_id, 'peer_reviewed', 1, 'The role of social support in midlife wellbeing: A gendered analysis', '2023', 'https://doi.org/10.1007/s11205-023-03081-2', 'Social Indicators Research', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT19-031 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-031';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Physician suicide: A call to action', '2022', 'https://doi.org/10.1001/jamapsychiatry.2022.1643', 'JAMA Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'The prevalence of substance use and other mental health concerns among American attorneys', '2016', 'https://doi.org/10.1097/ADM.0000000000000182', 'Journal of Addiction Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'Occupational stress and cortisol dysregulation in high-demand professions: A systematic review', '2021', 'https://doi.org/10.1016/j.psyneuen.2021.105340', 'Psychoneuroendocrinology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Gender differences in help-seeking among physicians with depression', '2020', 'https://doi.org/10.1097/ACM.0000000000003310', 'Academic Medicine', 4),
      (v_art_id, 'peer_reviewed', 1, 'Interventions to reduce physician burnout: A systematic review and meta-analysis', '2022', 'https://doi.org/10.1016/S0140-6736(22)01435-2', 'The Lancet', 5),
      (v_art_id, 'government', 2, 'Burnout among healthcare professionals: A call to explore and address this underrecognized threat', '2019', 'https://nam.edu/burnout-among-health-care-professionals', 'National Academy of Medicine', 6),
      (v_art_id, 'professional_org', 3, 'Mental health and well-being in the legal profession', '2021', 'https://www.americanbar.org/groups/lawyer_assistance/mental-health/', 'American Bar Association', 7),
      (v_art_id, 'peer_reviewed', 1, 'The mental health of professionals in high-stress occupations: A meta-analysis', '2023', 'https://doi.org/10.1037/ocp0000360', 'Journal of Occupational Health Psychology', 8),
      (v_art_id, 'peer_reviewed', 1, 'Workplace mental health: Developing an integrated intervention approach', '2020', 'https://doi.org/10.1186/s12888-020-02594-4', 'BMC Psychiatry', 9),
      (v_art_id, 'government', 2, 'Suicide prevention in high-risk occupations', '2022', 'https://www.cdc.gov/suicide/factors/index.html', 'Centers for Disease Control and Prevention', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT19-032 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-032';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Mental health in elite athletes: International Olympic Committee consensus statement', '2019', 'https://doi.org/10.1136/bjsports-2019-100715', 'British Journal of Sports Medicine', 1),
      (v_art_id, 'peer_reviewed', 1, 'Barriers to mental health help-seeking in male athletes: A systematic review', '2021', 'https://doi.org/10.1016/j.psychsport.2021.101987', 'Psychology of Sport and Exercise', 2),
      (v_art_id, 'peer_reviewed', 1, 'Concussion and long-term mental health outcomes in retired professional athletes', '2020', 'https://doi.org/10.1001/jamaneurol.2020.3007', 'JAMA Neurology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Mental health and retirement from professional sport: A systematic review and meta-analysis', '2022', 'https://doi.org/10.1007/s40279-022-01626-7', 'Sports Medicine', 4),
      (v_art_id, 'peer_reviewed', 1, 'Athletic identity and psychological adjustment to retirement in male athletes', '2020', 'https://doi.org/10.1123/jcsp.2019-0069', 'Journal of Clinical Sport Psychology', 5),
      (v_art_id, 'professional_org', 3, 'NCAA Mental Health Best Practices', '2022', 'https://www.ncaa.org/sports/2022/1/27/mental-health-best-practices.aspx', 'National Collegiate Athletic Association', 6),
      (v_art_id, 'peer_reviewed', 1, 'Prevalence of mental health disorders in elite athletes: A systematic review and meta-analysis', '2023', 'https://doi.org/10.1136/bjsports-2022-106640', 'British Journal of Sports Medicine', 7),
      (v_art_id, 'peer_reviewed', 1, 'Overtraining syndrome and mental health in athletes', '2021', 'https://doi.org/10.1249/JSR.0000000000000832', 'Current Sports Medicine Reports', 8),
      (v_art_id, 'government', 2, 'Mental health in sport: Status quo and future directions', '2023', 'https://www.nimh.nih.gov/health/topics', 'National Institute of Mental Health', 9),
      (v_art_id, 'peer_reviewed', 1, 'Masculinity and mental health in male athletes: A qualitative synthesis', '2022', 'https://doi.org/10.1037/men0000398', 'Psychology of Men & Masculinities', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT19-033 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-033';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'government', 2, 'Indicators of mental health problems reported by prisoners and jail inmates, 2011-12', '2017', 'https://bjs.ojp.gov/content/pub/pdf/imhprpji1112.pdf', 'Bureau of Justice Statistics', 1),
      (v_art_id, 'peer_reviewed', 1, 'Solitary confinement and mental illness in U.S. prisons: A challenge for medical ethics', '2020', 'https://doi.org/10.29158/JAAPL.003913-20', 'Journal of the American Academy of Psychiatry and the Law', 2),
      (v_art_id, 'government', 2, 'Suicide in jails and prisons: Data and prevention strategies', '2021', 'https://nicic.gov/resources/nic-library/all-library-items/suicide-jails', 'National Institute of Corrections', 3),
      (v_art_id, 'peer_reviewed', 1, 'Treatment of mentally ill inmates in the correctional system: A systematic review', '2021', 'https://doi.org/10.1001/jamanetworkopen.2021.15382', 'JAMA Network Open', 4),
      (v_art_id, 'peer_reviewed', 1, 'Post-traumatic stress disorder among formerly incarcerated men: A systematic review', '2022', 'https://doi.org/10.1002/cbm.2247', 'Criminal Behaviour and Mental Health', 5),
      (v_art_id, 'peer_reviewed', 1, 'Mental health treatment in prisons and jails: An updated review', '2023', 'https://doi.org/10.1176/appi.ps.20220385', 'Psychiatric Services', 6),
      (v_art_id, 'professional_org', 3, 'Incarceration and mental health', '2022', 'https://www.nami.org/Advocacy/Policy-Priorities/Stopping-Harmful-Practices/Jailing-People-with-Mental-Illness', 'National Alliance on Mental Illness', 7),
      (v_art_id, 'peer_reviewed', 1, 'The psychological effects of solitary confinement: A systematic review', '2021', 'https://doi.org/10.1016/S2215-0366(21)00149-6', 'The Lancet Psychiatry', 8),
      (v_art_id, 'government', 2, 'Mass incarceration and public health', '2020', 'https://www.apha.org/policies-and-advocacy/public-health-policy-statements', 'American Public Health Association', 9),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive-behavioral interventions for incarcerated populations: A meta-analysis', '2022', 'https://doi.org/10.1177/00938548221104627', 'Criminal Justice and Behavior', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT19-034 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-034';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Sexual orientation and mental health: A meta-analytic review', '2020', 'https://doi.org/10.1037/bul0000234', 'Psychological Bulletin', 1),
      (v_art_id, 'peer_reviewed', 1, 'Mental health of transgender and gender diverse people: A systematic review and meta-analysis', '2021', 'https://doi.org/10.1016/S2215-0366(21)00276-3', 'The Lancet Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Internalized homophobia, depression, and suicidal ideation: A meta-analysis', '2022', 'https://doi.org/10.1007/s10508-021-02178-7', 'Archives of Sexual Behavior', 3),
      (v_art_id, 'peer_reviewed', 1, 'LGBTQ-affirmative cognitive behavioral therapy: A randomized controlled trial', '2022', 'https://doi.org/10.1037/ccp0000741', 'Journal of Consulting and Clinical Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Social support and resilience among LGBTQ+ individuals: A systematic review', '2021', 'https://doi.org/10.1080/00918369.2021.1901505', 'Journal of Homosexuality', 5),
      (v_art_id, 'peer_reviewed', 1, 'Minority stress and mental health in LGBTQ populations: An update on the evidence', '2023', 'https://doi.org/10.1146/annurev-clinpsy-080921-013024', 'Annual Review of Clinical Psychology', 6),
      (v_art_id, 'government', 2, 'LGBTQI+ youth mental health', '2023', 'https://www.nimh.nih.gov/health/topics/lgbtqi', 'National Institute of Mental Health', 7),
      (v_art_id, 'peer_reviewed', 1, 'Conversion therapy and mental health outcomes: A systematic review', '2022', 'https://doi.org/10.1136/bmjopen-2022-063205', 'BMJ Open', 8),
      (v_art_id, 'government', 2, 'The health of lesbian, gay, bisexual, and transgender people: Building a foundation for better understanding', '2020', 'https://doi.org/10.17226/13128', 'National Academies Press', 9),
      (v_art_id, 'peer_reviewed', 1, 'Intersectionality of sexual orientation and masculinity: Implications for mental health', '2022', 'https://doi.org/10.1037/men0000402', 'Psychology of Men & Masculinities', 10)
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
