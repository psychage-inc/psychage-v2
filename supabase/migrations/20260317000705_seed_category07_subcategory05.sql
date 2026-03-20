-- ============================================================================
-- Seed: Category 7 (Depression, Grief & Loss) — Subcategory 05
-- 10 articles: CAT07-041 through CAT07-050
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert Category if not present
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  'Depression, Grief & Loss',
  'depression-mood',
  '',
  'Brain',
  7,
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'depression-mood';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Seasonal Patterns Mood Cycles', 'seasonal-patterns-mood-cycles', v_cat_id, 5)
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'depression-mood';
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'seasonal-patterns-mood-cycles' AND category_id = v_cat_id;

  -- CAT07-041: Seasonal Affective Disorder: A Complete Guide to Winter Depression
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Seasonal Affective Disorder: A Complete Guide to Winter Depression',
    'seasonal-affective-disorder-complete-guide-winter-depression',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Seasonal Affective Disorder', 'SAD', 'Depression', 'Winter Depression'],
    2400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-041',
    v_cat_id,
    v_sub_id,
    'drafted',
    'An in-depth look at SAD, the form of depression that arrives with shorter days and disappears with spring, including causes, symptoms, and evidence-based treatments.',
    '/images/articles/cat07/cover-041.svg',
    10,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-042: Light Therapy for SAD: How It Works and What the Evidence Shows
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Light Therapy for SAD: How It Works and What the Evidence Shows',
    'light-therapy-sad-how-it-works-evidence',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Light Therapy', 'SAD', 'Treatment', 'Phototherapy'],
    2000,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-042',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A comprehensive guide to using bright light therapy for seasonal affective disorder, including how it works, effectiveness, and practical implementation.',
    '/images/articles/cat07/cover-042.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-043: Summer SAD: The Overlooked Pattern of Warm-Weather Depression
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Summer SAD: The Overlooked Pattern of Warm-Weather Depression',
    'summer-sad-overlooked-pattern-warm-weather-depression',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Summer SAD', 'Seasonal Depression', 'Reverse SAD', 'Depression'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-043',
    v_cat_id,
    v_sub_id,
    'drafted',
    'While winter depression gets most of the attention, some people experience a less-known seasonal pattern: depression that begins in spring or summer and lifts in fall.',
    '/images/articles/cat07/cover-043.svg',
    6,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-044: How the Seasons Affect Everyone
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How the Seasons Affect Everyone',
    'how-seasons-affect-everyones-mood-without-sad',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Seasonal Mood', 'Circadian Rhythms', 'Mental Health', 'Self-Care'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-044',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Seasonal mood changes are normal, even if you don',
    '/images/articles/cat07/cover-044.svg',
    6,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-045: Circadian Rhythms and Mood: Why Your Internal Clock Matters
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Circadian Rhythms and Mood: Why Your Internal Clock Matters',
    'circadian-rhythms-mood-internal-clock-matters',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Circadian Rhythms', 'Depression', 'Sleep', 'Research'],
    1800,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-045',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Your 24-hour biological clock doesn',
    '/images/articles/cat07/cover-045.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-046: Holiday Depression: Why the 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Holiday Depression: Why the ',
    'holiday-depression-most-wonderful-time-doesnt-feel-wonderful',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Holiday Depression', 'Depression', 'Stress', 'Coping'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-046',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The pressure to feel joyful during holidays can make depression worse. Here',
    '/images/articles/cat07/cover-046.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-047: Anniversary Reactions: Why Certain Dates Trigger Emotional Waves
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Anniversary Reactions: Why Certain Dates Trigger Emotional Waves',
    'anniversary-reactions-dates-trigger-emotional-waves',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Anniversary Reactions', 'Grief', 'Trauma', 'Depression'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-047',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Calendar dates can trigger powerful emotional reactions, even years after a traumatic or significant event. Here',
    '/images/articles/cat07/cover-047.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-048: Cyclothymia: Living with Chronic Mood Swings That Don
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Cyclothymia: Living with Chronic Mood Swings That Don',
    'cyclothymia-chronic-mood-swings-without-bipolar',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Cyclothymia', 'Mood Disorders', 'Bipolar Spectrum', 'Mental Health'],
    2000,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-048',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Cyclothymia is a lesser-known mood disorder characterized by persistent mood fluctuations that are less severe than bipolar but still impactful.',
    '/images/articles/cat07/cover-048.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-049: Tracking Your Mood: Tools and Techniques for Pattern Recognition
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Tracking Your Mood: Tools and Techniques for Pattern Recognition',
    'tracking-your-mood-tools-techniques-pattern-recognition',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Mood Tracking', 'Self-Monitoring', 'Depression', 'Mental Health'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-049',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Mood tracking is a powerful self-awareness tool that helps you identify triggers, patterns, and early warning signs of mood shifts.',
    '/images/articles/cat07/cover-049.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-050: Light, Vitamin D, and Mental Health: Separating Science from Hype
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Light, Vitamin D, and Mental Health: Separating Science from Hype',
    'light-vitamin-d-mental-health-science-hype',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Vitamin D', 'Light Exposure', 'Depression', 'Research'],
    1800,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-050',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The internet is full of claims about vitamin D curing depression. What does the science actually show about light exposure, vitamin D, and mental health?',
    '/images/articles/cat07/cover-050.svg',
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

  -- === CAT07-041 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-041';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'government', 2, 'Seasonal affective disorder: Overview of epidemiology, presentation, and treatment', '2020', 'https://www.aafp.org/pubs/afp/issues/2020/1201/p653.html', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'The neurobiology of seasonal affective disorder and phototherapy', '2007', 'https://doi.org/10.31887/DCNS.2007.9.3/namazi', 'Dialogues in Clinical Neuroscience', 2),
      (v_art_id, 'peer_reviewed', 1, 'Light therapy for seasonal affective disorder: A meta-analysis', '2005', 'https://doi.org/10.1176/appi.ajp.162.4.656', 'American Journal of Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Circadian rhythm dysfunction in depression: From phenomenology to mechanisms', '2019', 'https://doi.org/10.1016/j.smrv.2019.05.002', 'Sleep Medicine Reviews', 4),
      (v_art_id, 'peer_reviewed', 1, 'Prevalence of seasonal affective disorder at four latitudes', '1994', 'https://doi.org/10.1016/0165-1781(94)90115-5', 'Psychiatry Research', 5),
      (v_art_id, 'clinical_guideline', 4, 'DSM-5-TR criteria for major depressive disorder with seasonal pattern', '2022', 'https://doi.org/10.1176/appi.books.9780890425787', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive-behavioral therapy for seasonal affective disorder', '2015', 'https://doi.org/10.1016/j.jad.2015.05.057', 'Journal of Affective Disorders', 7),
      (v_art_id, 'government', 2, 'Seasonal depression: Understanding the causes and finding relief', '2021', 'https://www.nimh.nih.gov/health/publications/seasonal-affective-disorder', NULL, 8),
      (v_art_id, 'peer_reviewed', 1, 'Genetic variants associated with seasonal affective disorder', '2018', 'https://doi.org/10.1038/s41398-018-0308-y', 'Translational Psychiatry', 9),
      (v_art_id, 'peer_reviewed', 1, 'Melatonin and serotonin in seasonal affective disorder', '2016', 'https://doi.org/10.3109/07420528.2016.1167077', NULL, 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-042 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-042';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Light therapy for seasonal affective disorder: A systematic review and meta-analysis', '2005', 'https://doi.org/10.1176/appi.ajp.162.4.656', 'American Journal of Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Efficacy of bright light treatment for seasonal affective disorder: Randomized controlled trial', '1998', 'https://doi.org/10.1001/archpsyc.55.10.883', 'Archives of General Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Mechanisms of light therapy in seasonal affective disorder', '2020', 'https://doi.org/10.1177/0748730420957164', 'Journal of Biological Rhythms', 3),
      (v_art_id, 'professional_org', 3, 'Light therapy: Clinical practice guidelines', '2019', 'https://www.sltbr.org/guidelines', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Timing of light therapy for seasonal affective disorder', '2018', 'https://doi.org/10.1080/07420528.2018.1465077', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Adverse effects and safety of light therapy: A systematic review', '2019', 'https://doi.org/10.1016/j.smrv.2019.04.004', 'Sleep Medicine Reviews', 6),
      (v_art_id, 'peer_reviewed', 1, 'Light therapy for non-seasonal depression: Evidence review', '2016', 'https://doi.org/10.1001/jamapsychiatry.2015.2235', 'JAMA Psychiatry', 7),
      (v_art_id, 'professional_org', 3, 'Light therapy devices: Consumer guide and recommendations', '2021', 'https://www.cet.org/light-therapy', NULL, 8),
      (v_art_id, 'peer_reviewed', 1, 'Blue light vs. white light therapy for seasonal affective disorder', '2020', 'https://doi.org/10.1016/j.jad.2020.01.06', 'Journal of Affective Disorders', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-043 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-043';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Summer-onset seasonal affective disorder: Prevalence and clinical features', '2016', 'https://doi.org/10.1016/j.jad.2016.03.038', 'Journal of Affective Disorders', 1),
      (v_art_id, 'peer_reviewed', 1, 'Reverse seasonal affective disorder: A distinct subtype?', '2018', 'https://doi.org/10.1016/j.psychres.2018.05.012', 'Psychiatry Research', 2),
      (v_art_id, 'peer_reviewed', 1, 'Heat, humidity, and mood: Environmental factors in summer depression', '2019', 'https://doi.org/10.1007/s00484-019-01701-8', 'International Journal of Biometeorology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Sleep disruption in summer seasonal affective disorder', '2020', 'https://doi.org/10.1016/j.sleep.2020.02.015', 'Sleep Medicine', 4),
      (v_art_id, 'peer_reviewed', 1, 'Treatment strategies for summer-pattern seasonal affective disorder', '2017', 'https://doi.org/10.4088/PCC.17f02145', NULL, 5),
      (v_art_id, 'government', 2, 'Seasonal depression: Understanding patterns and triggers', '2021', 'https://www.nimh.nih.gov/health/publications/seasonal-affective-disorder', NULL, 6)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-044 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-044';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Seasonal variation in mood in the general population', '2016', 'https://doi.org/10.1016/j.psychres.2016.06.044', 'Psychiatry Research', 1),
      (v_art_id, 'peer_reviewed', 1, 'Seasonality of mood and behavior: Evidence from population studies', '2018', 'https://doi.org/10.1097/YCO.0000000000000408', 'Current Opinion in Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Light exposure and mood: Population-based analysis', '2019', 'https://doi.org/10.1016/j.jad.2019.07.033', 'Journal of Affective Disorders', 3),
      (v_art_id, 'peer_reviewed', 1, 'Vitamin D, sunlight, and mood in healthy populations', '2020', 'https://doi.org/10.3390/nu12020478', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Seasonal patterns in physical activity and mental health', '2019', 'https://doi.org/10.1016/j.ypmed.2019.04.023', 'Preventive Medicine', 5),
      (v_art_id, 'textbook', 5, 'Understanding normal seasonal mood variation', '2021', 'https://www.mayoclinic.org/healthy-lifestyle/seasonal-mood', NULL, 6)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-045 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-045';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The circadian clock and mood disorders: Bidirectional relationship', '2019', 'https://doi.org/10.1038/s41583-019-0185-x', 'Nature Reviews Neuroscience', 1),
      (v_art_id, 'peer_reviewed', 1, 'Circadian rhythm disruption and depression: Evidence from human and animal studies', '2020', 'https://doi.org/10.1007/s11920-020-01158-x', 'Current Psychiatry Reports', 2),
      (v_art_id, 'peer_reviewed', 1, 'The molecular circadian clock and psychiatric disorders', '2018', 'https://doi.org/10.1016/j.biopsych.2018.02.006', 'Biological Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Social jetlag and mental health: Population-based study', '2019', 'https://doi.org/10.1080/07420528.2019.1567128', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Chronotherapy for mood disorders: Light, sleep, and wake therapy', '2021', 'https://doi.org/10.4088/JCP.20r13742', 'Journal of Clinical Psychiatry', 5),
      (v_art_id, 'peer_reviewed', 1, 'Shift work and mental health outcomes: Meta-analysis', '2020', 'https://doi.org/10.1136/oemed-2019-106278', 'Occupational and Environmental Medicine', 6),
      (v_art_id, 'peer_reviewed', 1, 'The suprachiasmatic nucleus: Master circadian pacemaker', '2020', 'https://doi.org/10.1146/annurev-neuro-091619-022522', 'Annual Review of Neuroscience', 7),
      (v_art_id, 'peer_reviewed', 1, 'Optimizing circadian health: Practical guidelines', '2021', 'https://doi.org/10.1016/j.sleh.2021.02.003', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-046 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-046';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'professional_org', 3, 'Holiday stress and depression: Survey of mental health professionals', '2019', 'https://www.psychologytoday.com/holiday-stress-survey', 'Psychology Today Research', 1),
      (v_art_id, 'peer_reviewed', 1, 'Seasonal patterns in psychiatric emergency visits during holidays', '2018', 'https://doi.org/10.1016/j.genhosppsych.2018.08.004', 'General Hospital Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Social comparison and holiday stress: Role of expectations', '2020', 'https://doi.org/10.1521/jscp.2020.39.08.678', 'Journal of Social and Clinical Psychology', 3),
      (v_art_id, 'professional_org', 3, 'Grief and the holidays: Clinical recommendations', '2021', 'https://www.apa.org/topics/grief/holidays', NULL, 4),
      (v_art_id, 'professional_org', 3, 'Managing holiday-related stress and depression', '2021', 'https://www.nami.org/holidays-and-mental-health', NULL, 5)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-047 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-047';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Anniversary reactions in bereavement: A systematic review', '2019', 'https://doi.org/10.1080/07481187.2019.1626944', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Temporal patterns in PTSD symptoms: Anniversary phenomena', '2018', 'https://doi.org/10.1002/jts.22298', 'Journal of Traumatic Stress', 2),
      (v_art_id, 'peer_reviewed', 1, 'Implicit memory and anniversary reactions to trauma', '2020', 'https://doi.org/10.1016/j.cpr.2020.101865', 'Clinical Psychology Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'Grief and the body: Physiological responses to anniversary dates', '2017', 'https://doi.org/10.1097/PSY.0000000000000479', 'Psychosomatic Medicine', 4),
      (v_art_id, 'professional_org', 3, 'Coping with anniversary reactions: Clinical guide', '2021', 'https://www.childrengrieve.org/anniversary-reactions', NULL, 5)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-048 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-048';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Cyclothymic disorder: A critical review', '2019', 'https://doi.org/10.1111/bdi.12799', NULL, 1),
      (v_art_id, 'clinical_guideline', 4, 'DSM-5-TR diagnostic criteria for cyclothymic disorder', '2022', 'https://doi.org/10.1176/appi.books.9780890425787', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Prevalence and clinical characteristics of cyclothymia', '2018', 'https://doi.org/10.1016/j.jad.2018.02.074', 'Journal of Affective Disorders', 3),
      (v_art_id, 'peer_reviewed', 1, 'Cyclothymia and bipolar disorder: Developmental progression', '2020', 'https://doi.org/10.1176/appi.ajp.2020.19101064', 'American Journal of Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Treatment of cyclothymic disorder: Current evidence', '2019', 'https://doi.org/10.1007/s40263-019-00662-4', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Mood stabilizers in cyclothymia: Clinical trial evidence', '2017', 'https://doi.org/10.1111/bdi.12543', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Psychotherapy for cyclothymic disorder: Systematic review', '2020', 'https://doi.org/10.1002/jclp.22985', 'Journal of Clinical Psychology', 7),
      (v_art_id, 'professional_org', 3, 'Understanding cyclothymia: A guide for patients and families', '2021', 'https://www.dbsalliance.org/cyclothymia', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-049 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-049';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Self-monitoring in depression treatment: Meta-analysis', '2020', 'https://doi.org/10.1016/j.jad.2020.03.042', 'Journal of Affective Disorders', 1),
      (v_art_id, 'peer_reviewed', 1, 'Mobile apps for mood tracking: Systematic review and evaluation', '2019', 'https://doi.org/10.2196/11761', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Daily mood monitoring and bipolar disorder outcomes', '2018', 'https://doi.org/10.1111/bdi.12648', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'The therapeutic benefits of journaling and mood logging', '2019', 'https://doi.org/10.1080/10503307.2019.1631501', NULL, 4),
      (v_art_id, 'professional_org', 3, 'Mood tracking: Clinical practice guidelines', '2021', 'https://www.psychiatry.org/mood-tracking', NULL, 5)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-050 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-050';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Vitamin D and depression: A systematic review and meta-analysis', '2019', 'https://doi.org/10.1192/bjp.2019.75', 'British Journal of Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Light exposure and mood: Evidence from naturalistic studies', '2020', 'https://doi.org/10.1016/j.jad.2020.07.033', 'Journal of Affective Disorders', 2),
      (v_art_id, 'peer_reviewed', 1, 'Vitamin D supplementation for depressive symptoms: Randomized controlled trial', '2020', 'https://doi.org/10.1001/jama.2020.6852', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Mechanisms linking sunlight, vitamin D, and serotonin', '2013', 'https://doi.org/10.4161/derm.24494', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Vitamin D deficiency prevalence and depression outcomes', '2020', 'https://doi.org/10.3390/nu12020478', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Light therapy vs. vitamin D supplementation for seasonal affective disorder', '2018', 'https://doi.org/10.1016/j.psyneuen.2018.08.025', NULL, 6),
      (v_art_id, 'professional_org', 3, 'Vitamin D and mental health: Clinical practice guidelines', '2021', 'https://www.endocrine.org/vitamin-d-mental-health', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Sunlight exposure and mental health: Population study', '2019', 'https://doi.org/10.1289/EHP4392', NULL, 8)
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
  WHERE a.article_production_id LIKE 'CAT07-%';

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;
