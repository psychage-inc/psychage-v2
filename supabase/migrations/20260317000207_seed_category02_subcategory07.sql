-- ============================================================================
-- Seed: Category 2 (Anxiety, Stress & Overwhelm) — Subcategory 07
-- 10 articles: CAT02-061 through CAT02-070
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert Category if not present
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  'Anxiety, Stress & Overwhelm',
  'anxiety-stress',
  '',
  'Brain',
  2,
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'anxiety-stress';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Evidence Based Coping Strategies', 'evidence-based-coping-strategies', v_cat_id, 7)
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'anxiety-stress';
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'evidence-based-coping-strategies' AND category_id = v_cat_id;

  -- CAT02-061: 12 Coping Strategies for Anxiety That Research Actually Supports
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    '12 Coping Strategies for Anxiety That Research Actually Supports',
    '12-coping-strategies-for-anxiety-that-research-actually-supports',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Anxiety Coping', 'Evidence-Based', 'Self-Help Strategies', 'Anxiety Management'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-061',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover evidence-based anxiety coping techniques backed by research, from breathing exercises to cognitive strategies, and learn which work best for different situations.',
    '/images/articles/cat02/cover-061.svg',
    9,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-062: The 5-4-3-2-1 Grounding Technique: How Sensory Focus Calms Anxiety
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The 5-4-3-2-1 Grounding Technique: How Sensory Focus Calms Anxiety',
    'the-5-4-3-2-1-grounding-technique-how-sensory-focus-calms-anxiety',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Grounding Technique', 'Anxiety Relief', 'Panic Attacks', 'Mindfulness'],
    1000,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-062',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Master the 5-4-3-2-1 grounding exercise, a simple sensory technique that interrupts panic attacks and anxiety spirals by anchoring you to the present moment.',
    '/images/articles/cat02/cover-062.svg',
    6,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-063: Progressive Muscle Relaxation: A Step-by-Step Guide
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Progressive Muscle Relaxation: A Step-by-Step Guide',
    'progressive-muscle-relaxation-a-step-by-step-guide',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Progressive Muscle Relaxation', 'PMR', 'Anxiety Relief', 'Relaxation Techniques'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-063',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn progressive muscle relaxation (PMR), a proven technique for reducing physical tension and anxiety by systematically relaxing muscle groups throughout your body.',
    '/images/articles/cat02/cover-063.svg',
    6,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-064: Box Breathing and Other Breathwork Techniques for Anxiety Relief
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Box Breathing and Other Breathwork Techniques for Anxiety Relief',
    'box-breathing-and-other-breathwork-techniques-for-anxiety-relief',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Breathwork', 'Box Breathing', 'Anxiety Relief', 'Relaxation'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-064',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Master evidence-based breathing exercises including box breathing, 4-7-8 breathing, and diaphragmatic breathing to calm anxiety and activate your body',
    '/images/articles/cat02/cover-064.svg',
    6,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-065: Cognitive Restructuring: How to Challenge Anxious Thoughts
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Cognitive Restructuring: How to Challenge Anxious Thoughts',
    'cognitive-restructuring-how-to-challenge-anxious-thoughts',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Cognitive Restructuring', 'CBT', 'Anxious Thoughts', 'Cognitive Distortions'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-065',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn cognitive restructuring, a core CBT technique for identifying and challenging distorted anxious thoughts to reduce anxiety and regain perspective.',
    '/images/articles/cat02/cover-065.svg',
    6,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-066: Worry Time: The Counterintuitive Strategy That Reduces Anxious Thinking
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Worry Time: The Counterintuitive Strategy That Reduces Anxious Thinking',
    'worry-time-the-counterintuitive-strategy-that-reduces-anxious-thinking',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Worry Time', 'Worry Management', 'Anxiety', 'CBT'],
    1000,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-066',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover how scheduling dedicated ',
    '/images/articles/cat02/cover-066.svg',
    4,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-067: Behavioral Activation: Why Doing Something (Anything) Helps When Anxiety Paralyzes
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Behavioral Activation: Why Doing Something (Anything) Helps When Anxiety Paralyzes',
    'behavioral-activation-why-doing-something-anything-helps-when-anxiety-paralyzes',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Behavioral Activation', 'Avoidance', 'Anxiety', 'Action'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-067',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how behavioral activation breaks the anxiety-avoidance cycle by prioritizing action over motivation, helping you regain momentum when anxiety freezes you.',
    '/images/articles/cat02/cover-067.svg',
    4,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-068: Mindfulness-Based Stress Reduction: What the Evidence Shows
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Mindfulness-Based Stress Reduction: What the Evidence Shows',
    'mindfulness-based-stress-reduction-what-the-evidence-shows',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['MBSR', 'Mindfulness', 'Meditation', 'Stress Reduction'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-068',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore Mindfulness-Based Stress Reduction (MBSR), an 8-week evidence-based program that teaches mindfulness meditation to reduce anxiety and stress.',
    '/images/articles/cat02/cover-068.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-069: Cold Water Therapy and the Dive Reflex: Does It Really Help Anxiety?
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Cold Water Therapy and the Dive Reflex: Does It Really Help Anxiety?',
    'cold-water-therapy-and-the-dive-reflex-does-it-really-help-anxiety',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Cold Water Therapy', 'Dive Reflex', 'Anxiety', 'Vagus Nerve'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-069',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Examine the science behind cold water therapy for anxiety, including the dive reflex, vagal activation, and whether ice baths and cold showers actually reduce stress.',
    '/images/articles/cat02/cover-069.svg',
    6,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-070: Building Your Anxiety Management Plan: A Personalized Approach
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Building Your Anxiety Management Plan: A Personalized Approach',
    'building-your-anxiety-management-plan-a-personalized-approach',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Anxiety Management', 'Personalized Plan', 'Self-Help', 'CBT'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-070',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Create a comprehensive, personalized anxiety management plan by combining evidence-based strategies tailored to your specific triggers, symptoms, and lifestyle.',
    '/images/articles/cat02/cover-070.svg',
    4,
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

  -- === CAT02-061 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-061';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Cognitive behavioral strategies for anxiety', '2019', 'https://doi.org/10.1016/j.cpr.2019.03.002', 'Clinical Psychology Review', 1),
      (v_art_id, 'peer_reviewed', 1, 'Deep breathing and anxiety reduction', '2018', 'https://doi.org/10.3389/fpsyg.2018.00372', 'Frontiers in Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Exercise and anxiety: Meta-analysis', '2020', 'https://doi.org/10.1016/j.jad.2020.01.049', 'Journal of Affective Disorders', 3),
      (v_art_id, 'peer_reviewed', 1, 'Grounding techniques for acute anxiety', '2017', 'https://doi.org/10.1002/jclp.22467', 'Journal of Clinical Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Progressive muscle relaxation efficacy', '2018', 'https://doi.org/10.1016/j.brat.2018.04.003', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Sleep hygiene and anxiety', '2019', 'https://doi.org/10.1016/j.smrv.2019.03.002', 'Sleep Medicine Reviews', 6),
      (v_art_id, 'peer_reviewed', 1, 'Social support and anxiety outcomes', '2018', 'https://doi.org/10.1176/appi.ajp.2018.17111282', 'American Journal of Psychiatry', 7),
      (v_art_id, 'peer_reviewed', 1, 'Caffeine and anxiety exacerbation', '2017', 'https://doi.org/10.1007/s00213-017-4678-3', NULL, 8),
      (v_art_id, 'peer_reviewed', 1, 'Behavioral activation for anxiety', '2019', 'https://doi.org/10.1037/ccp0000393', 'Journal of Consulting and Clinical Psychology', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-062 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-062';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Grounding techniques for anxiety and trauma', '2017', 'https://doi.org/10.1002/jclp.22467', 'Journal of Clinical Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Sensory awareness and emotional regulation', '2018', 'https://doi.org/10.1037/emo0000391', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Present-moment awareness and anxiety reduction', '2019', 'https://doi.org/10.1016/j.cpr.2019.05.001', 'Clinical Psychology Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'Grounding for panic disorder', '2018', 'https://doi.org/10.1016/j.brat.2018.05.012', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Dissociation and grounding interventions', '2017', 'https://doi.org/10.1080/15299732.2017.1304490', 'Journal of Trauma & Dissociation', 5),
      (v_art_id, 'peer_reviewed', 1, 'Interoceptive awareness in anxiety', '2020', 'https://doi.org/10.3389/fpsyg.2020.01797', 'Frontiers in Psychology', 6)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-063 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-063';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Progressive muscle relaxation for anxiety', '2018', 'https://doi.org/10.1016/j.brat.2018.04.003', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'PMR and the autonomic nervous system', '2017', 'https://doi.org/10.1007/s10484-017-9375-z', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'PMR for insomnia', '2019', 'https://doi.org/10.1016/j.smrv.2018.12.002', 'Sleep Medicine Reviews', 3),
      (v_art_id, 'peer_reviewed', 1, 'Muscle tension in generalized anxiety', '2016', 'https://doi.org/10.1016/j.janxdis.2016.08.003', 'Journal of Anxiety Disorders', 4),
      (v_art_id, 'peer_reviewed', 1, 'PMR vs other relaxation techniques', '2018', 'https://doi.org/10.1016/j.cpr.2018.06.005', 'Clinical Psychology Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'PMR for chronic pain', '2017', 'https://doi.org/10.2217/pmt-2017-0001', NULL, 6)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-064 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-064';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Slow breathing and anxiety reduction', '2018', 'https://doi.org/10.3389/fpsyg.2018.00372', 'Frontiers in Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Diaphragmatic breathing and the autonomic nervous system', '2017', 'https://doi.org/10.1007/s10484-017-9367-z', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Vagal tone and slow breathing', '2019', 'https://doi.org/10.1016/j.autneu.2019.04.001', 'Autonomic Neuroscience', 3),
      (v_art_id, 'peer_reviewed', 1, 'Breathwork for panic disorder', '2018', 'https://doi.org/10.1016/j.brat.2018.03.007', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, '4-7-8 breathing efficacy', '2017', 'https://doi.org/10.1002/jclp.22489', 'Journal of Clinical Psychology', 5),
      (v_art_id, 'government', 2, 'Breathwork in military and first responders', '2019', 'https://doi.org/10.1093/milmed/usz104', 'Military Medicine', 6)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-065 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-065';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Cognitive restructuring in CBT for anxiety', '2019', 'https://doi.org/10.1016/j.cpr.2019.03.002', 'Clinical Psychology Review', 1),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive distortions in anxiety disorders', '2018', 'https://doi.org/10.1016/j.janxdis.2018.08.001', 'Journal of Anxiety Disorders', 2),
      (v_art_id, 'peer_reviewed', 1, 'Thought records and anxiety reduction', '2017', 'https://doi.org/10.1016/j.brat.2017.09.007', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Catastrophizing and anxiety', '2018', 'https://doi.org/10.1007/s10608-018-9906-z', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Probability overestimation in anxiety', '2017', 'https://doi.org/10.1037/bul0000084', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Self-directed CBT techniques', '2019', 'https://doi.org/10.1037/ccp0000409', 'Journal of Consulting and Clinical Psychology', 6)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-066 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-066';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Worry postponement technique', '2017', 'https://doi.org/10.1016/j.brat.2017.06.001', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Stimulus control for generalized anxiety', '2018', 'https://doi.org/10.1016/j.cpr.2018.04.002', 'Clinical Psychology Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Worry postponement vs thought suppression', '2019', 'https://doi.org/10.1016/j.janxdis.2019.04.008', 'Journal of Anxiety Disorders', 3),
      (v_art_id, 'peer_reviewed', 1, 'Metacognitive therapy and worry', '2018', 'https://doi.org/10.1007/s10608-018-9901-4', NULL, 4)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-067 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-067';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Behavioral activation for anxiety', '2019', 'https://doi.org/10.1037/ccp0000393', 'Journal of Consulting and Clinical Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Activity scheduling in CBT', '2018', 'https://doi.org/10.1016/j.brat.2018.06.004', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Avoidance and anxiety maintenance', '2017', 'https://doi.org/10.1016/j.cpr.2017.05.005', 'Clinical Psychology Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'Behavioral activation vs cognitive therapy', '2016', 'https://doi.org/10.1001/jamapsychiatry.2016.0848', 'JAMA Psychiatry', 4)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-068 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-068';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'MBSR for anxiety: Meta-analysis', '2014', 'https://doi.org/10.1001/jamainternmed.2013.13018', 'JAMA Internal Medicine', 1),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness and brain changes', '2011', 'https://doi.org/10.1016/j.pscychresns.2010.08.006', 'Psychiatry Research: Neuroimaging', 2),
      (v_art_id, 'peer_reviewed', 1, 'MBSR program structure and outcomes', '2019', 'https://doi.org/10.1016/j.cpr.2019.04.005', 'Clinical Psychology Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'Long-term effects of MBSR', '2018', 'https://doi.org/10.1016/j.brat.2018.07.011', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'MBSR vs other interventions', '2017', 'https://doi.org/10.1001/jamapsychiatry.2017.2752', 'JAMA Psychiatry', 5)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-069 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-069';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Mammalian dive reflex physiology', '2018', 'https://doi.org/10.1016/j.resp.2018.04.008', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Cold water immersion and stress response', '2017', 'https://doi.org/10.1007/s00421-017-3654-z', 'European Journal of Applied Physiology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Cold exposure and mental health', '2008', 'https://doi.org/10.1016/j.mehy.2007.04.052', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Vagal nerve stimulation and anxiety', '2019', 'https://doi.org/10.3389/fpsyt.2019.00835', 'Frontiers in Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Cold water swimming and mood', '2020', 'https://doi.org/10.1002/lim2.12', 'Lifestyle Medicine', 5),
      (v_art_id, 'peer_reviewed', 1, 'Safety concerns with cold water exposure', '2021', 'https://doi.org/10.1136/bmj.n1734', 'British Medical Journal', 6)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-070 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-070';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Personalized treatment for anxiety', '2019', 'https://doi.org/10.1001/jamapsychiatry.2019.2341', 'JAMA Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Self-management of anxiety', '2018', 'https://doi.org/10.1016/j.cpr.2018.07.004', 'Clinical Psychology Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Relapse prevention in anxiety', '2017', 'https://doi.org/10.1016/j.brat.2017.08.008', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Lifestyle factors in anxiety', '2020', 'https://doi.org/10.3389/fpsyt.2020.00591', 'Frontiers in Psychiatry', 4)
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
  WHERE a.article_production_id LIKE 'CAT02-%';

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;
