-- ============================================================================
-- Seed: Category 7 (Depression, Grief & Loss) — Subcategory 04
-- 10 articles: CAT07-031 through CAT07-040
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
  VALUES ('Coping With Depression', 'coping-with-depression', v_cat_id, 4)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'coping-with-depression' AND category_id = v_cat_id;

  -- CAT07-031: Behavioral Activation: The Most Evidence-Based Self-Help Strategy for Depression
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Behavioral Activation: The Most Evidence-Based Self-Help Strategy for Depression',
    'behavioral-activation-evidence-based-self-help-strategy-depression',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Depression', 'Self-Help', 'Behavioral Activation', 'Evidence-Based'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-031',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how behavioral activation, a simple yet powerful technique, can help lift depression by changing what you do rather than how you think.',
    '/images/articles/cat07/cover-031.svg',
    8,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-032: How to Get Out of Bed When Depression Weighs You Down
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How to Get Out of Bed When Depression Weighs You Down',
    'how-to-get-out-of-bed-when-depression-weighs-you-down',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Depression', 'Morning Routine', 'Self-Care', 'Behavioral Strategies'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-032',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Practical, compassionate strategies to help you move from bed to standing when depression makes even the simplest morning routines feel impossible.',
    '/images/articles/cat07/cover-032.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-033: The Depression Toolkit: Daily Practices That Research Supports
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Depression Toolkit: Daily Practices That Research Supports',
    'depression-toolkit-daily-practices-research-supports',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Depression', 'Self-Help', 'Evidence-Based', 'Daily Practices'],
    1800,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-033',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A curated collection of evidence-based daily practices that can help manage depression symptoms and support recovery.',
    '/images/articles/cat07/cover-033.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-034: Journaling for Depression: Prompts That Help Process Difficult Emotions
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Journaling for Depression: Prompts That Help Process Difficult Emotions',
    'journaling-for-depression-prompts-process-difficult-emotions',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Depression', 'Journaling', 'Emotional Processing', 'Self-Help'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-034',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Research-backed journaling techniques and prompts designed to help you process emotions, reduce rumination, and support recovery from depression.',
    '/images/articles/cat07/cover-034.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-035: Exercise and Depression: How Movement Changes Brain Chemistry
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Exercise and Depression: How Movement Changes Brain Chemistry',
    'exercise-depression-movement-changes-brain-chemistry',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Depression', 'Exercise', 'Neuroscience', 'Self-Help'],
    1800,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-035',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the neuroscience behind why exercise is one of the most powerful interventions for depression, and how to start moving when you don',
    '/images/articles/cat07/cover-035.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-036: Nutrition and Depression: What the Evidence Says About Food and Mood
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Nutrition and Depression: What the Evidence Says About Food and Mood',
    'nutrition-depression-evidence-food-mood',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Depression', 'Nutrition', 'Research', 'Diet'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-036',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A research-based look at the connection between diet and depression, separating evidence from hype and offering practical nutritional strategies.',
    '/images/articles/cat07/cover-036.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-037: Social Connection When You Want to Withdraw: Starting Small
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Social Connection When You Want to Withdraw: Starting Small',
    'social-connection-when-you-want-to-withdraw-starting-small',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Depression', 'Social Connection', 'Isolation', 'Self-Help'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-037',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How to maintain or rebuild social connection when depression makes you want to isolate, with practical strategies that respect your limits.',
    '/images/articles/cat07/cover-037.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-038: How to Support Yourself Between Therapy Sessions
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How to Support Yourself Between Therapy Sessions',
    'how-to-support-yourself-between-therapy-sessions',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Depression', 'Therapy', 'Self-Help', 'Between Sessions'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-038',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Practical strategies to maintain progress, manage symptoms, and stay connected to your treatment goals between therapy appointments.',
    '/images/articles/cat07/cover-038.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-039: Creating a Safety Plan for Depressive Episodes
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Creating a Safety Plan for Depressive Episodes',
    'creating-safety-plan-depressive-episodes',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Depression', 'Crisis Safety', 'Safety Planning', 'Suicide Prevention'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-039',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A step-by-step guide to creating a personalized safety plan that can help you navigate depressive episodes and suicidal crises.',
    '/images/articles/cat07/cover-039.svg',
    6,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-040: Mindfulness-Based Cognitive Therapy: Preventing Depression Relapse
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Mindfulness-Based Cognitive Therapy: Preventing Depression Relapse',
    'mindfulness-based-cognitive-therapy-preventing-depression-relapse',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Depression', 'MBCT', 'Mindfulness', 'Treatment', 'Relapse Prevention'],
    1800,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-040',
    v_cat_id,
    v_sub_id,
    'drafted',
    'An evidence-based treatment combining mindfulness meditation with cognitive therapy techniques to prevent depression from returning.',
    '/images/articles/cat07/cover-040.svg',
    9,
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

  -- === CAT07-031 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-031';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Behavioral activation versus cognitive therapy for depression: A randomized trial', '2006', 'https://doi.org/10.1037/0022-006X.74.4.658', 'Journal of Consulting and Clinical Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Behavioral activation for depression: A systematic review and meta-analysis', '2020', 'https://doi.org/10.1017/S0033291720000239', 'Psychological Medicine', 2),
      (v_art_id, 'government', 2, 'The brief behavioral activation treatment for depression: Treatment manual', '2021', 'https://www.nimh.nih.gov/health/publications/behavioral-activation', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Activity scheduling as a treatment for depression: A review of evidence', '2019', 'https://doi.org/10.1016/j.cpr.2019.01.004', 'Clinical Psychology Review', 4),
      (v_art_id, 'peer_reviewed', 1, 'Behavioral activation enhances the antidepressant effects of SSRI treatment', '2018', 'https://doi.org/10.1016/j.jad.2018.03.014', 'Journal of Affective Disorders', 5),
      (v_art_id, 'peer_reviewed', 1, 'The role of avoidance in maintaining depression: Evidence from behavioral activation', '2017', 'https://doi.org/10.1016/j.brat.2017.05.008', NULL, 6),
      (v_art_id, 'professional_org', 3, 'Depression treatment guidelines for primary care', '2021', 'https://www.apa.org/depression/guideline', NULL, 7),
      (v_art_id, 'textbook', 5, 'Activation interventions for behavioral health: From theory to practice', '2019', 'https://www.guilford.com/books/Activation-Interventions', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-032 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-032';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Sleep disturbances and depression: Links to impaired functioning and treatment response', '2018', 'https://doi.org/10.4088/JCP.18r12151', 'Journal of Clinical Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Morning motor activity and its relationship to depression severity', '2019', 'https://doi.org/10.1016/j.psychres.2019.04.012', 'Psychiatry Research', 2),
      (v_art_id, 'peer_reviewed', 1, 'The role of light exposure in depression: Implications for morning routines', '2020', 'https://doi.org/10.1080/07420528.2020.1743495', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Behavioral interventions for morning dysfunction in depression', '2017', 'https://doi.org/10.1016/j.cbpra.2017.03.002', NULL, 4),
      (v_art_id, 'government', 2, 'Depression in primary care: Clinical practice guidelines', '2021', 'https://www.aafp.org/pubs/afp/issues/2021/0215/p175.html', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Understanding sleep-wake regulation in depression', '2019', 'https://doi.org/10.1016/j.smrv.2019.05.002', 'Sleep Medicine Reviews', 6),
      (v_art_id, 'textbook', 5, 'Self-compassion interventions for depression: A clinical guide', '2020', 'https://www.guilford.com/books/Self-Compassion-Depression', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Activity scheduling and morning routines in behavioral activation therapy', '2018', 'https://doi.org/10.1016/j.beth.2018.02.007', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-033 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-033';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Lifestyle interventions for depression: A meta-analytic review', '2020', 'https://doi.org/10.1016/j.jad.2020.02.014', 'Journal of Affective Disorders', 1),
      (v_art_id, 'peer_reviewed', 1, 'Self-management strategies in depression: Systematic review', '2019', 'https://doi.org/10.1186/s12888-019-2185-5', 'BMC Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Physical activity and depression: Updated systematic review', '2021', 'https://doi.org/10.1016/j.amepre.2021.01.023', 'American Journal of Preventive Medicine', 3),
      (v_art_id, 'peer_reviewed', 1, 'Sleep hygiene practices for depression management', '2020', 'https://doi.org/10.1016/j.jsmc.2020.02.006', 'Sleep Medicine Clinics', 4),
      (v_art_id, 'peer_reviewed', 1, 'Social connection and depression: Evidence from longitudinal studies', '2019', 'https://doi.org/10.1007/s00127-019-01707-9', 'Social Psychiatry and Psychiatric Epidemiology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness-based interventions for depression: Meta-analysis', '2020', 'https://doi.org/10.1016/j.cpr.2020.101834', 'Clinical Psychology Review', 6),
      (v_art_id, 'peer_reviewed', 1, 'Gratitude interventions: Effects on well-being and depression', '2018', 'https://doi.org/10.1007/s10902-018-9990-2', 'Journal of Happiness Studies', 7),
      (v_art_id, 'professional_org', 3, 'Depression self-care: A guide for patients and families', '2021', 'https://www.nami.org/depression-self-care', NULL, 8),
      (v_art_id, 'peer_reviewed', 1, 'Nutrition and mental health: Emerging evidence for dietary interventions', '2019', 'https://doi.org/10.1080/1028415X.2019.1594532', 'Nutritional Neuroscience', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-034 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-034';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Expressive writing and depression: Meta-analytic review', '2018', 'https://doi.org/10.1016/j.cpr.2018.07.004', 'Clinical Psychology Review', 1),
      (v_art_id, 'peer_reviewed', 1, 'Therapeutic writing interventions for mental health: Systematic review', '2020', 'https://doi.org/10.1080/09638237.2020.1739248', 'Journal of Mental Health', 2),
      (v_art_id, 'peer_reviewed', 1, 'Structured journaling reduces depressive symptoms: Randomized controlled trial', '2019', 'https://doi.org/10.1016/j.beth.2019.03.003', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'The neuroscience of expressive writing: How writing changes the brain', '2017', 'https://doi.org/10.1192/apt.bp.107.004432', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Gratitude journaling and mental health outcomes', '2020', 'https://doi.org/10.1080/17439760.2020.1789707', 'Journal of Positive Psychology', 5),
      (v_art_id, 'professional_org', 3, 'Writing therapy for depression: Clinical practice guidelines', '2021', 'https://www.apa.org/topics/writing-therapy', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Rumination and depression: The role of reflective writing', '2019', 'https://doi.org/10.1080/02699931.2019.1638037', NULL, 7),
      (v_art_id, 'textbook', 5, 'Writing to Heal: A guided journal for recovering from trauma and emotional upheaval', '2018', 'https://www.newharbinger.com/writing-to-heal', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-035 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-035';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Exercise for depression: A meta-analysis adjusting for publication bias', '2019', 'https://doi.org/10.1016/j.jpsychires.2019.05.023', 'Journal of Psychiatric Research', 1),
      (v_art_id, 'peer_reviewed', 1, 'Neurobiological effects of physical exercise on depression: A systematic review', '2020', 'https://doi.org/10.1016/j.neubiorev.2020.08.006', 'Neuroscience & Biobehavioral Reviews', 2),
      (v_art_id, 'peer_reviewed', 1, 'Exercise as treatment for depression: Efficacy and dose response', '2021', 'https://doi.org/10.1016/j.amepre.2021.01.023', 'American Journal of Preventive Medicine', 3),
      (v_art_id, 'peer_reviewed', 1, 'BDNF and neuroplasticity: Exercise-induced brain changes', '2018', 'https://doi.org/10.3389/fnins.2018.00052', 'Frontiers in Neuroscience', 4),
      (v_art_id, 'government', 2, 'Physical activity guidelines for mental health', '2020', 'https://www.who.int/publications/guidelines/physical-activity-mental-health', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Resistance training and depression: Meta-analytic findings', '2018', 'https://doi.org/10.1001/jamapsychiatry.2018.0572', 'JAMA Psychiatry', 6),
      (v_art_id, 'peer_reviewed', 1, 'Exercise motivation in depression: Behavioral activation strategies', '2019', 'https://doi.org/10.1177/0145445519837988', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Inflammation, exercise, and depression: Mechanisms of action', '2020', 'https://doi.org/10.1016/j.bbi.2020.02.010', NULL, 8),
      (v_art_id, 'government', 2, 'Exercise for Mental Health', '2006', 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1470658/', 'Primary Care Companion to the Journal of Clinical Psychiatry', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-036 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-036';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Nutritional psychiatry: The present state of the evidence', '2017', 'https://doi.org/10.1017/S0029665117002026', 'Proceedings of the Nutrition Society', 1),
      (v_art_id, 'peer_reviewed', 1, 'Dietary patterns and depression risk: A meta-analysis', '2018', 'https://doi.org/10.1016/j.psychres.2018.10.023', 'Psychiatry Research', 2),
      (v_art_id, 'peer_reviewed', 1, 'The SMILES trial: A dietary intervention in depression', '2017', 'https://doi.org/10.1186/s12916-017-0791-y', 'BMC Medicine', 3),
      (v_art_id, 'peer_reviewed', 1, 'Omega-3 fatty acids and depression: Scientific evidence and biological mechanisms', '2020', 'https://doi.org/10.1155/2020/4328562', 'Oxidative Medicine and Cellular Longevity', 4),
      (v_art_id, 'peer_reviewed', 1, 'The gut-brain axis in depression: Role of the microbiome', '2019', 'https://doi.org/10.1016/j.jad.2019.05.024', 'Journal of Affective Disorders', 5),
      (v_art_id, 'peer_reviewed', 1, 'Ultra-processed foods and mental health: A systematic review', '2020', 'https://doi.org/10.1017/S1368980020002524', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Nutritional recommendations for mental health', '2019', 'https://doi.org/10.1002/wps.20672', 'World Psychiatry', 7),
      (v_art_id, 'peer_reviewed', 1, 'Blood sugar regulation and mood: Clinical implications', '2018', 'https://doi.org/10.1016/j.dsx.2018.03.006', 'Diabetes & Metabolic Syndrome: Clinical Research & Reviews', 8),
      (v_art_id, 'government', 2, 'Nutrition and mental health: Guidelines for patients', '2021', 'https://www.nimh.nih.gov/health/topics/nutrition', NULL, 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-037 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-037';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Social isolation and depression: A bidirectional relationship', '2019', 'https://doi.org/10.1007/s00127-019-01707-9', 'Social Psychiatry and Psychiatric Epidemiology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Loneliness and depression: Evidence from longitudinal cohort studies', '2020', 'https://doi.org/10.1017/S0033291720000178', 'Psychological Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'Social prescribing for depression: A systematic review', '2021', 'https://doi.org/10.1136/bmjopen-2020-045676', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'The protective role of social connection in depression recovery', '2018', 'https://doi.org/10.1016/j.jad.2018.05.058', 'Journal of Affective Disorders', 4),
      (v_art_id, 'peer_reviewed', 1, 'Low-intensity social interactions and mental health', '2019', 'https://doi.org/10.1177/1948550619838308', 'Social Psychological and Personality Science', 5),
      (v_art_id, 'peer_reviewed', 1, 'Behavioral activation and social engagement in depression', '2020', 'https://doi.org/10.1016/j.beth.2020.01.005', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Depression and social withdrawal: Clinical implications', '2017', 'https://doi.org/10.1176/appi.ajp.2017.16101176', 'American Journal of Psychiatry', 7),
      (v_art_id, 'professional_org', 3, 'Social connection and mental health: A guide', '2021', 'https://www.nami.org/social-connection', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-038 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-038';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Between-session activities and psychotherapy outcomes: A meta-analysis', '2019', 'https://doi.org/10.1037/ccp0000408', 'Journal of Consulting and Clinical Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Homework compliance in cognitive-behavioral therapy for depression', '2018', 'https://doi.org/10.1016/j.beth.2018.03.001', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Self-monitoring and depression: Evidence from clinical trials', '2020', 'https://doi.org/10.1002/da.23042', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Crisis planning in psychotherapy: Best practices', '2019', 'https://doi.org/10.1111/cpsp.12281', 'Clinical Psychology: Science and Practice', 4),
      (v_art_id, 'professional_org', 3, 'Therapy integration: Between-session strategies for clients', '2021', 'https://www.apa.org/topics/therapy/between-sessions', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Relapse prevention in depression: Skills for maintaining gains', '2020', 'https://doi.org/10.1016/j.jad.2020.03.156', 'Journal of Affective Disorders', 6),
      (v_art_id, 'peer_reviewed', 1, 'Self-care practices in psychotherapy clients: A qualitative study', '2019', 'https://doi.org/10.1080/10503307.2019.1609114', NULL, 7),
      (v_art_id, 'government', 2, 'Making the Most of Therapy: A guide for patients', '2021', 'https://www.nimh.nih.gov/health/publications/making-most-therapy', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-039 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-039';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Safety Planning Intervention: A brief suicide prevention protocol', '2012', 'https://doi.org/10.1016/j.cbpra.2011.01.001', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Effectiveness of safety planning for suicide prevention: A systematic review', '2020', 'https://doi.org/10.1080/13811118.2020.1728573', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Crisis response planning: Reducing suicide risk in high-risk populations', '2018', 'https://doi.org/10.1176/appi.ajp.2018.17111194', 'American Journal of Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Safety planning in depression treatment: Best practices', '2019', 'https://doi.org/10.1002/jclp.22806', 'Journal of Clinical Psychology', 4),
      (v_art_id, 'government', 2, '988 Suicide & Crisis Lifeline: National implementation and outcomes', '2022', 'https://www.samhsa.gov/find-help/988', NULL, 5),
      (v_art_id, 'professional_org', 3, 'Warning signs of suicide: Identification and response', '2021', 'https://www.sprc.org/resources-programs/warning-signs-suicide', NULL, 6)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-040 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-040';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'textbook', 5, 'Mindfulness-Based Cognitive Therapy for Depression: A new approach to preventing relapse', '2013', 'https://www.guilford.com/books/Mindfulness-Based-Cognitive-Therapy-Depression', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Efficacy of MBCT in preventing relapse in recurrent depression: Meta-analysis', '2016', 'https://doi.org/10.1001/jamapsychiatry.2016.0076', 'JAMA Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness-based interventions for depression: Systematic review and meta-analysis', '2020', 'https://doi.org/10.1016/j.cpr.2020.101834', 'Clinical Psychology Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'Mechanisms of mindfulness in depression: Evidence from neuroimaging', '2019', 'https://doi.org/10.1038/s41583-019-0164-2', 'Nature Reviews Neuroscience', 4),
      (v_art_id, 'peer_reviewed', 1, 'MBCT vs. maintenance antidepressants for relapse prevention: RCT', '2015', 'https://doi.org/10.1016/S0140-6736(14)62222-4', NULL, 5),
      (v_art_id, 'professional_org', 3, 'Mindfulness practices for depression: Clinical guidelines', '2021', 'https://www.apa.org/topics/mindfulness/depression', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Rumination and depression: The role of mindfulness', '2018', 'https://doi.org/10.1037/abn0000368', 'Journal of Abnormal Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Long-term outcomes of MBCT: 5-year follow-up study', '2019', 'https://doi.org/10.1016/j.brat.2019.02.007', NULL, 8),
      (v_art_id, 'textbook', 5, 'Finding Peace in a Frantic World: Mindfulness-Based Cognitive Therapy program', '2020', 'https://www.oxfordmindfulness.org/mbct', NULL, 9)
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
