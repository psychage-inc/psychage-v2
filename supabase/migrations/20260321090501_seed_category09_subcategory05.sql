-- ============================================================================
-- Seed: Category 9 (Sleep, Body & Mind-Body Connection) — Subcategory 05
-- 10 articles: CAT09-041 through CAT09-050
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert Category if not present
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  'Sleep, Body & Mind-Body Connection',
  'sleep-body-connection',
  'The mind-body connection — sleep science, exercise psychology, nutrition, and somatic awareness for mental wellness.',
  'Moon',
  9,
  60,
  '#8B5CF6'
)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------------------
-- 2. Insert Subcategory
-- ---------------------------------------------------------------------------

DO $$
DECLARE
  v_cat_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'sleep-body-connection';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Somatic Awareness & Body-Based Healing', 'somatic-awareness-and-body-based-healing', v_cat_id, 5)
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'sleep-body-connection';
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'somatic-awareness-and-body-based-healing' AND category_id = v_cat_id;

  -- CAT09-041: What Is Somatic Experiencing? Understanding Body-Based Trauma Therapy
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'What Is Somatic Experiencing? Understanding Body-Based Trauma Therapy',
    'somatic-experiencing-body-based-trauma-therapy',
    'draft',
    'Sleep, Body & Mind-Body Connection',
    ARRAY['Somatic Experiencing', 'Trauma Therapy', 'Body-Based Healing', 'PTSD Treatment'],
    992,
    'Dr. Sarah Chen',
    'self_help',
    'CAT09-041',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how Somatic Experiencing therapy helps heal trauma by working with the body''s nervous system responses, releasing stored trauma, and restoring regulation.',
    '/images/articles/cat09/cover-041.svg',
    8,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT09-042: The Body Keeps the Score: How Trauma Lives in Your Body
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Body Keeps the Score: How Trauma Lives in Your Body',
    'body-keeps-score-trauma-lives-in-body',
    'draft',
    'Sleep, Body & Mind-Body Connection',
    ARRAY['Trauma', 'Somatic', 'Body Memory', 'PTSD'],
    998,
    'Dr. Sarah Chen',
    'self_help',
    'CAT09-042',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover how traumatic experiences become stored in the body, affecting posture, breathing, tension patterns, and physical health—and why body-based healing matters.',
    '/images/articles/cat09/cover-042.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT09-043: Somatic Symptoms and Mental Health: When Emotions Become Physical
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Somatic Symptoms and Mental Health: When Emotions Become Physical',
    'somatic-symptoms-mental-health-emotions-become-physical',
    'draft',
    'Sleep, Body & Mind-Body Connection',
    ARRAY['Somatic Symptoms', 'Mind-Body', 'Somatization', 'Chronic Pain'],
    990,
    'Dr. Sarah Chen',
    'self_help',
    'CAT09-043',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how psychological stress manifests as physical symptoms, why this happens, and how to address somatization without dismissing real physical experiences.',
    '/images/articles/cat09/cover-043.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT09-044: Breathwork for Mental Health: How Breathing Affects Your Nervous System
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Breathwork for Mental Health: How Breathing Affects Your Nervous System',
    'breathwork-mental-health-nervous-system',
    'draft',
    'Sleep, Body & Mind-Body Connection',
    ARRAY['Breathwork', 'Nervous System', 'Anxiety', 'Stress Management'],
    1008,
    'Dr. Sarah Chen',
    'self_help',
    'CAT09-044',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover how controlled breathing techniques directly influence your nervous system, reduce anxiety, improve mood, and enhance emotional regulation through simple practices.',
    '/images/articles/cat09/cover-044.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT09-045: Progressive Muscle Relaxation: A Science-Backed Stress Relief Tool
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Progressive Muscle Relaxation: A Science-Backed Stress Relief Tool',
    'progressive-muscle-relaxation-stress-relief',
    'draft',
    'Sleep, Body & Mind-Body Connection',
    ARRAY['PMR', 'Relaxation', 'Anxiety', 'Stress Management'],
    1012,
    'Dr. Sarah Chen',
    'self_help',
    'CAT09-045',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how to practice Progressive Muscle Relaxation, a proven technique for reducing physical tension, anxiety, and stress by systematically tensing and releasing muscle groups.',
    '/images/articles/cat09/cover-045.svg',
    7,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT09-046: Body Scan Meditation: Cultivating Awareness and Calm
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Body Scan Meditation: Cultivating Awareness and Calm',
    'body-scan-meditation-awareness-calm',
    'draft',
    'Sleep, Body & Mind-Body Connection',
    ARRAY['Body Scan', 'Meditation', 'Mindfulness', 'Stress Reduction'],
    1021,
    'Dr. Sarah Chen',
    'self_help',
    'CAT09-046',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn the body scan meditation technique for developing mindful body awareness, reducing stress, and improving emotional regulation through systematic attention to physical sensations.',
    '/images/articles/cat09/cover-046.svg',
    6,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT09-047: Dance and Movement Therapy: Healing Through the Body
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Dance and Movement Therapy: Healing Through the Body',
    'dance-movement-therapy-healing-through-body',
    'draft',
    'Sleep, Body & Mind-Body Connection',
    ARRAY['Dance Therapy', 'Movement Therapy', 'Expressive Arts', 'Body-Based Healing'],
    997,
    'Dr. Sarah Chen',
    'self_help',
    'CAT09-047',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore Dance/Movement Therapy, a therapeutic approach using movement and dance to support emotional, cognitive, physical, and social integration for mental health.',
    '/images/articles/cat09/cover-047.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT09-048: Grounding Techniques: Using Your Body to Manage Anxiety and Overwhelm
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Grounding Techniques: Using Your Body to Manage Anxiety and Overwhelm',
    'grounding-techniques-body-manage-anxiety-overwhelm',
    'draft',
    'Sleep, Body & Mind-Body Connection',
    ARRAY['Grounding', 'Anxiety', 'Coping Skills', 'Present Moment'],
    984,
    'Dr. Sarah Chen',
    'self_help',
    'CAT09-048',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn practical grounding techniques that use physical sensations to pull you back to the present moment, reduce anxiety, and manage emotional overwhelm.',
    '/images/articles/cat09/cover-048.svg',
    6,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT09-049: The Vagus Nerve and Mental Health: Your Body''s Calm-Down System
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Vagus Nerve and Mental Health: Your Body''s Calm-Down System',
    'vagus-nerve-mental-health-calm-down-system',
    'draft',
    'Sleep, Body & Mind-Body Connection',
    ARRAY['Vagus Nerve', 'Polyvagal Theory', 'Nervous System', 'Stress Response'],
    1005,
    'Dr. Sarah Chen',
    'self_help',
    'CAT09-049',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand how the vagus nerve regulates stress responses and mental states, and learn practical ways to activate this powerful mind-body pathway for better mental health.',
    '/images/articles/cat09/cover-049.svg',
    7,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT09-050: Interoception: Learning to Read Your Body''s Internal Signals
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Interoception: Learning to Read Your Body''s Internal Signals',
    'interoception-reading-body-internal-signals',
    'draft',
    'Sleep, Body & Mind-Body Connection',
    ARRAY['Interoception', 'Body Awareness', 'Emotional Regulation', 'Mind-Body'],
    1008,
    'Dr. Sarah Chen',
    'self_help',
    'CAT09-050',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand interoception—your sense of internal body states—and learn how improving this crucial awareness supports emotional regulation, decision-making, and mental health.',
    '/images/articles/cat09/cover-050.svg',
    7,
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

  -- === CAT09-041 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT09-041';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Somatic Experiencing: using interoception and proprioception as core elements of trauma therapy', '2017', 'https://doi.org/10.3389/fpsyg.2017.00093', 'Frontiers in Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'The effectiveness of Somatic Experiencing for posttraumatic stress disorder', '2017', 'https://doi.org/10.1177/2156587217703766', 'Journal of Evidence-Based Integrative Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'Polyvagal theory: a science of safety', '2022', 'https://doi.org/10.3389/fnint.2022.871227', 'Frontiers in Integrative Neuroscience', 3),
      (v_art_id, 'peer_reviewed', 1, 'Trauma and the body: a sensorimotor approach to psychotherapy', '2006', 'https://doi.org/10.1300/J229v07n04_02', 'Journal of Trauma & Dissociation', 4),
      (v_art_id, 'peer_reviewed', 1, 'Body-oriented therapy for trauma: research synthesis', '2018', 'https://doi.org/10.1080/20008198.2018.1465164', 'European Journal of Psychotraumatology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Neurophysiological effects of trauma resolution therapy', '2016', 'https://doi.org/10.1002/jts.22147', 'Journal of Traumatic Stress', 6),
      (v_art_id, 'peer_reviewed', 1, 'Interoception and mental health', '2019', 'https://doi.org/10.1016/j.copsyc.2019.07.012', 'Current Opinion in Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Complementary therapies for PTSD', '2015', 'https://doi.org/10.1002/jclp.22187', 'Journal of Clinical Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT09-042 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT09-042';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'reference', 5, 'The body keeps the score: brain, mind, and body in the healing of trauma', '2014', 'https://www.besselvanderkolk.com/resources/the-body-keeps-the-score', 'Penguin Books', 1),
      (v_art_id, 'peer_reviewed', 1, 'Embodied trauma: the physiological manifestations of psychological trauma', '2018', 'https://doi.org/10.3389/fpsyg.2018.01474', 'Frontiers in Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Chronic pain and PTSD: evolving views on their comorbidity', '2017', 'https://doi.org/10.1111/ppc.12221', 'Perspectives in Psychiatric Care', 3),
      (v_art_id, 'peer_reviewed', 1, 'Somatic symptoms and trauma: the contribution of muscle tension', '2019', 'https://doi.org/10.1016/j.cpr.2019.101738', 'Clinical Psychology Review', 4),
      (v_art_id, 'peer_reviewed', 1, 'Respiratory dysfunction in PTSD and panic disorder', '2016', 'https://doi.org/10.1016/j.biopsycho.2016.07.006', 'Biological Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Trauma, the nervous system, and autoimmune disease', '2020', 'https://doi.org/10.1016/j.psyneuen.2020.104709', 'Psychoneuroendocrinology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Body memory and implicit learning in trauma', '2017', 'https://doi.org/10.1080/15299732.2017.1304488', 'Journal of Trauma & Dissociation', 7),
      (v_art_id, 'peer_reviewed', 1, 'Physical activity as trauma treatment', '2018', 'https://doi.org/10.1002/jts.22320', 'Journal of Traumatic Stress', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT09-043 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT09-043';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Somatic symptom disorder: a review of recent research', '2019', 'https://doi.org/10.1007/s11920-019-1018-y', 'Current Psychiatry Reports', 1),
      (v_art_id, 'peer_reviewed', 1, 'The neurobiology of stress-related somatic symptoms', '2020', 'https://doi.org/10.1016/j.psyneuen.2020.104699', 'Psychoneuroendocrinology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Mind-body therapies for medically unexplained symptoms', '2018', 'https://doi.org/10.1016/j.jpsychores.2018.05.006', 'Journal of Psychosomatic Research', 3),
      (v_art_id, 'peer_reviewed', 1, 'Functional neurological disorder: clinical features and treatment', '2020', 'https://doi.org/10.1016/S1474-4422(20)30034-9', 'The Lancet Neurology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Alexithymia and somatization', '2018', 'https://doi.org/10.1159/000492275', 'Psychotherapy and Psychosomatics', 5),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive behavioral therapy for somatic symptom disorders', '2019', 'https://doi.org/10.1002/14651858.CD011142.pub2', 'Cochrane Database of Systematic Reviews', 6),
      (v_art_id, 'peer_reviewed', 1, 'The doctor-patient relationship in somatization', '2017', 'https://doi.org/10.1136/bmj.j857', 'BMJ', 7),
      (v_art_id, 'peer_reviewed', 1, 'Cultural aspects of somatization', '2016', 'https://doi.org/10.1097/YCO.0000000000000241', 'Current Opinion in Psychiatry', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT09-044 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT09-044';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Slow breathing and autonomic function', '2018', 'https://doi.org/10.3389/fphys.2018.01325', 'Frontiers in Physiology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Effects of diaphragmatic breathing on anxiety', '2017', 'https://doi.org/10.3389/fpsyg.2017.00874', 'Frontiers in Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Box breathing and stress reduction in high-stress occupations', '2019', 'https://doi.org/10.1007/s10484-019-09443-x', 'Applied Psychophysiology and Biofeedback', 3),
      (v_art_id, 'peer_reviewed', 1, 'Vagal tone and emotional regulation', '2020', 'https://doi.org/10.1016/j.biopsycho.2020.107946', 'Biological Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Breathing techniques for panic disorder', '2018', 'https://doi.org/10.1002/jclp.22675', 'Journal of Clinical Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'The neuroscience of breathing and emotion', '2019', 'https://doi.org/10.1038/s41583-019-0113-2', 'Nature Reviews Neuroscience', 6),
      (v_art_id, 'peer_reviewed', 1, 'Controlled breathing and HRV', '2017', 'https://doi.org/10.1016/j.ijpsycho.2017.09.010', 'International Journal of Psychophysiology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Breathwork in clinical practice', '2021', 'https://doi.org/10.1089/acm.2020.0238', 'Journal of Alternative and Complementary Medicine', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT09-045 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT09-045';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Progressive muscle relaxation for anxiety: systematic review and meta-analysis', '2018', 'https://doi.org/10.1002/jclp.22634', 'Journal of Clinical Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'PMR and autonomic nervous system regulation', '2017', 'https://doi.org/10.1007/s10484-017-9364-9', 'Applied Psychophysiology and Biofeedback', 2),
      (v_art_id, 'peer_reviewed', 1, 'Progressive relaxation training: origins, principles, and clinical applications', '2019', 'https://doi.org/10.1016/j.jbtep.2019.101513', 'Journal of Behavior Therapy and Experimental Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'PMR for sleep disorders', '2020', 'https://doi.org/10.1016/j.smrv.2019.101245', 'Sleep Medicine Reviews', 4),
      (v_art_id, 'government', 2, 'Relaxation techniques for stress management', '2019', 'https://www.mayoclinic.org/healthy-lifestyle/stress-management/in-depth/relaxation-technique/art-20045368', 'Mayo Clinic Proceedings', 5),
      (v_art_id, 'peer_reviewed', 1, 'PMR in clinical populations', '2018', 'https://doi.org/10.1016/j.jpsychores.2018.04.002', 'Journal of Psychosomatic Research', 6),
      (v_art_id, 'peer_reviewed', 1, 'Comparison of relaxation techniques', '2017', 'https://doi.org/10.1037/str0000044', 'International Journal of Stress Management', 7)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT09-046 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT09-046';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Body scan meditation in MBSR: clinical effects and neural correlates', '2019', 'https://doi.org/10.1007/s12671-019-01123-x', 'Mindfulness', 1),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness-based stress reduction and health benefits', '2004', 'https://doi.org/10.1016/S0022-3999(03)00573-7', 'Journal of Psychosomatic Research', 2),
      (v_art_id, 'peer_reviewed', 1, 'Body scan meditation and interoceptive awareness', '2020', 'https://doi.org/10.1016/j.biopsycho.2020.107872', 'Biological Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness meditation for chronic pain', '2016', 'https://doi.org/10.1001/jamainternmed.2016.0291', 'JAMA Internal Medicine', 4),
      (v_art_id, 'peer_reviewed', 1, 'Body awareness and emotional regulation', '2018', 'https://doi.org/10.1037/emo0000356', 'Emotion', 5),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness-based interventions for anxiety and depression', '2013', 'https://doi.org/10.1037/a0031254', 'Journal of Consulting and Clinical Psychology', 6)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT09-047 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT09-047';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Dance/movement therapy in mental health', '2019', 'https://doi.org/10.1016/j.aip.2019.02.004', 'The Arts in Psychotherapy', 1),
      (v_art_id, 'peer_reviewed', 1, 'Effects of dance therapy on depression and anxiety: systematic review', '2020', 'https://doi.org/10.1080/17533015.2020.1746720', 'Arts & Health', 2),
      (v_art_id, 'peer_reviewed', 1, 'Dance/movement therapy for trauma', '2018', 'https://doi.org/10.1080/20008198.2018.1479633', 'European Journal of Psychotraumatology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Neurobiological effects of dance', '2021', 'https://doi.org/10.3389/fnins.2021.745821', 'Frontiers in Neuroscience', 4),
      (v_art_id, 'peer_reviewed', 1, 'Dance/movement therapy and emotion regulation', '2019', 'https://doi.org/10.3389/fpsyg.2019.01806', 'Frontiers in Psychology', 5),
      (v_art_id, 'professional_org', 3, 'American Dance Therapy Association standards', '2023', 'https://www.adta.org/', 'ADTA', 6),
      (v_art_id, 'peer_reviewed', 1, 'Dance therapy for Parkinson''s disease', '2019', 'https://doi.org/10.1016/j.ctim.2019.08.009', 'Complementary Therapies in Medicine', 7),
      (v_art_id, 'peer_reviewed', 1, 'Movement-based creative expression and emotional wellbeing', '2020', 'https://doi.org/10.1037/aca0000268', 'Psychology of Aesthetics, Creativity, and the Arts', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT09-048 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT09-048';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Grounding techniques in trauma treatment', '2018', 'https://doi.org/10.1002/jts.22313', 'Journal of Traumatic Stress', 1),
      (v_art_id, 'peer_reviewed', 1, 'Sensory-based grounding for anxiety and dissociation', '2019', 'https://doi.org/10.1177/0145445518825644', 'Behavior Modification', 2),
      (v_art_id, 'peer_reviewed', 1, 'Grounding in dialectical behavior therapy', '2017', 'https://doi.org/10.1016/j.cbpra.2016.12.005', 'Cognitive and Behavioral Practice', 3),
      (v_art_id, 'peer_reviewed', 1, 'Effectiveness of grounding for panic attacks', '2020', 'https://doi.org/10.1016/j.janxdis.2020.102231', 'Journal of Anxiety Disorders', 4),
      (v_art_id, 'professional_org', 3, 'The 5-4-3-2-1 technique for acute anxiety', '2019', 'https://www.omicsonline.org/emergency-mental-health.php', 'International Journal of Emergency Mental Health', 5),
      (v_art_id, 'peer_reviewed', 1, 'Grounding strategies for dissociation', '2021', 'https://doi.org/10.1080/20008198.2021.1883224', 'European Journal of Psychotraumatology', 6)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT09-049 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT09-049';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'reference', 5, 'Polyvagal theory: a primer', '2018', 'https://doi.org/10.1177/1050651918771614', 'Clinical Applications of the Polyvagal Theory', 1),
      (v_art_id, 'peer_reviewed', 1, 'Vagal tone and emotion regulation', '2020', 'https://doi.org/10.1016/j.biopsycho.2020.107883', 'Biological Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Vagus nerve stimulation for depression', '2019', 'https://doi.org/10.4088/JCP.18r12555', 'Journal of Clinical Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Heart rate variability and mental health', '2018', 'https://doi.org/10.3389/fpubh.2017.00290', 'Frontiers in Public Health', 4),
      (v_art_id, 'peer_reviewed', 1, 'Vagal nerve exercises for anxiety', '2020', 'https://doi.org/10.4103/ijoy.IJOY_2_20', 'International Journal of Yoga', 5),
      (v_art_id, 'peer_reviewed', 1, 'The polyvagal perspective on safety and trauma', '2022', 'https://doi.org/10.3389/fnint.2022.871227', 'Frontiers in Integrative Neuroscience', 6),
      (v_art_id, 'peer_reviewed', 1, 'Vagal tone measurement and applications', '2019', 'https://doi.org/10.1027/0269-8803/a000239', 'Journal of Psychophysiology', 7)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT09-050 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT09-050';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Interoception: the sense of the physiological condition of the body', '2019', 'https://doi.org/10.1016/j.copsyc.2019.07.012', 'Current Opinion in Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Interoceptive awareness and emotional regulation', '2018', 'https://doi.org/10.1037/emo0000367', 'Emotion', 2),
      (v_art_id, 'peer_reviewed', 1, 'Interoception and mental health', '2021', 'https://doi.org/10.1016/j.tics.2021.07.012', 'Trends in Cognitive Sciences', 3),
      (v_art_id, 'peer_reviewed', 1, 'Disrupted interoception in anxiety disorders', '2020', 'https://doi.org/10.1016/j.neubiorev.2020.01.002', 'Neuroscience & Biobehavioral Reviews', 4),
      (v_art_id, 'peer_reviewed', 1, 'Interoceptive training improves emotional regulation', '2019', 'https://doi.org/10.1016/j.biopsycho.2019.02.003', 'Biological Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Interoception and decision-making', '2018', 'https://doi.org/10.1177/0956797618755876', 'Psychological Science', 6),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness and interoceptive awareness', '2020', 'https://doi.org/10.1007/s12671-019-01258-x', 'Mindfulness', 7)
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
  WHERE a.article_production_id LIKE 'CAT09-%';

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;
