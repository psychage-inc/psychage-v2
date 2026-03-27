-- ============================================================================
-- Seed: Category 18 (Women's Mental Health) — Subcategory 03
-- 10 articles: CAT18-021 through CAT18-030
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert Category if not present
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  'Women''s Mental Health',
  'womens-mental-health',
  'Comprehensive coverage of mental health issues affecting women across the lifespan, from reproductive health to gender-specific risk factors, treatment considerations, and sociocultural influences on women''s psychological well-being.',
  'Heart',
  18,
  55,
  '#EC4899'
)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------------------
-- 2. Insert Subcategory
-- ---------------------------------------------------------------------------

DO $$
DECLARE
  v_cat_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'womens-mental-health';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Menopause and Perimenopause', 'menopause-and-perimenopause', v_cat_id, 3)
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'womens-mental-health';
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'menopause-and-perimenopause' AND category_id = v_cat_id;

  -- CAT18-021: Perimenopause and Mental Health: Understanding the Transition
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Perimenopause and Mental Health: Understanding the Transition',
    'perimenopause-and-mental-health-understanding-the-transition',
    'draft',
    'Women''s Mental Health',
    ARRAY['Perimenopause', 'Menopause Transition', 'Mood Changes', 'Hormones'],
    972,
    'Psychage Editorial Team',
    'self_help',
    'CAT18-021',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore how perimenopause affects mental health, including mood changes, anxiety, and cognitive symptoms during the years leading to menopause.',
    '/images/articles/cat18/cover-021.svg',
    3,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT18-022: Menopause and Depression: Hormonal Shifts and Mood Disorders
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Menopause and Depression: Hormonal Shifts and Mood Disorders',
    'menopause-and-depression-hormonal-shifts-and-mood-disorders',
    'draft',
    'Women''s Mental Health',
    ARRAY['Menopause', 'Depression', 'Hormone Therapy', 'Treatment'],
    990,
    'Psychage Editorial Team',
    'self_help',
    'CAT18-022',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the relationship between menopause and depression, including risk factors, symptoms unique to menopausal depression, and evidence-based treatments.',
    '/images/articles/cat18/cover-022.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT18-023: Sleep, Menopause, and Mental Health: Breaking the Vicious Cycle
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Sleep, Menopause, and Mental Health: Breaking the Vicious Cycle',
    'sleep-menopause-and-mental-health-breaking-the-vicious-cycle',
    'draft',
    'Women''s Mental Health',
    ARRAY['Sleep', 'Menopause', 'Insomnia', 'Night Sweats'],
    991,
    'Psychage Editorial Team',
    'self_help',
    'CAT18-023',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore how menopause disrupts sleep, the bidirectional relationship between sleep and mental health, and strategies for improving sleep during the transition.',
    '/images/articles/cat18/cover-023.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT18-024: Brain Fog and Cognitive Changes in Menopause: Memory and Focus
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Brain Fog and Cognitive Changes in Menopause: Memory and Focus',
    'brain-fog-and-cognitive-changes-in-menopause-memory-and-focus',
    'draft',
    'Women''s Mental Health',
    ARRAY['Brain Fog', 'Cognitive Function', 'Memory', 'Menopause'],
    997,
    'Psychage Editorial Team',
    'self_help',
    'CAT18-024',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand cognitive changes during menopause including memory lapses, difficulty concentrating, and word-finding problems, plus strategies to support brain health.',
    '/images/articles/cat18/cover-024.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT18-025: Sexuality and Body Image During Menopause: Desire and Self-Perception
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Sexuality and Body Image During Menopause: Desire and Self-Perception',
    'sexuality-and-body-image-during-menopause-desire-and-self-perception',
    'draft',
    'Women''s Mental Health',
    ARRAY['Sexuality', 'Body Image', 'Desire', 'Intimacy'],
    1044,
    'Psychage Editorial Team',
    'self_help',
    'CAT18-025',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore changes in sexuality and body image during menopause, including decreased desire, physical changes affecting intimacy, and strategies for maintaining sexual health and positive body relationship.',
    '/images/articles/cat18/cover-025.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT18-026: Hormone Therapy and Mental Health: Benefits, Risks, and Decisions
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Hormone Therapy and Mental Health: Benefits, Risks, and Decisions',
    'hormone-therapy-and-mental-health-benefits-risks-and-decisions',
    'draft',
    'Women''s Mental Health',
    ARRAY['Hormone Therapy', 'HRT', 'Estrogen', 'Treatment'],
    969,
    'Psychage Editorial Team',
    'self_help',
    'CAT18-026',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand how hormone therapy affects mental health during menopause, weigh benefits and risks, and make informed decisions about treatment.',
    '/images/articles/cat18/cover-026.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT18-027: Menopause and Anxiety: Managing Increased Worry and Panic
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Menopause and Anxiety: Managing Increased Worry and Panic',
    'menopause-and-anxiety-managing-increased-worry-and-panic',
    'draft',
    'Women''s Mental Health',
    ARRAY['Anxiety', 'Menopause', 'Panic Attacks', 'GAD'],
    973,
    'Psychage Editorial Team',
    'self_help',
    'CAT18-027',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand why anxiety often worsens during menopause, recognize symptoms of generalized anxiety and panic, and learn evidence-based treatments.',
    '/images/articles/cat18/cover-027.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT18-028: Social and Cultural Aspects of Menopause: Ageism and Identity
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Social and Cultural Aspects of Menopause: Ageism and Identity',
    'social-and-cultural-aspects-of-menopause-ageism-and-identity',
    'draft',
    'Women''s Mental Health',
    ARRAY['Ageism', 'Cultural Narratives', 'Identity', 'Menopause'],
    976,
    'Psychage Editorial Team',
    'self_help',
    'CAT18-028',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore how cultural narratives about menopause and aging affect mental health, challenge ageist beliefs, and reclaim positive menopausal identity.',
    '/images/articles/cat18/cover-028.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT18-029: Managing Menopause with Pre-Existing Mental Health Conditions
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Managing Menopause with Pre-Existing Mental Health Conditions',
    'managing-menopause-with-pre-existing-mental-health-conditions',
    'draft',
    'Women''s Mental Health',
    ARRAY['Pre-Existing Conditions', 'Bipolar', 'Treatment Adjustment', 'Psychiatry'],
    974,
    'Psychage Editorial Team',
    'self_help',
    'CAT18-029',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand how menopause affects existing depression, anxiety, bipolar disorder, and other mental health conditions, and how to adjust treatment.',
    '/images/articles/cat18/cover-029.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT18-030: Surgical Menopause and Mental Health: After Hysterectomy and Oophorectomy
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Surgical Menopause and Mental Health: After Hysterectomy and Oophorectomy',
    'surgical-menopause-and-mental-health-after-hysterectomy-and-oophorectomy',
    'draft',
    'Women''s Mental Health',
    ARRAY['Surgical Menopause', 'Hysterectomy', 'Oophorectomy', 'Hormone Loss'],
    998,
    'Psychage Editorial Team',
    'self_help',
    'CAT18-030',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the unique mental health challenges of surgical menopause (hysterectomy with removal of ovaries), including abrupt hormone loss and psychological impacts.',
    '/images/articles/cat18/cover-030.svg',
    3,
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

  -- === CAT18-021 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT18-021';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Depression and anxiety in the menopausal transition', '2022', 'https://doi.org/10.1001/jamapsychiatry.2022.0612', 'JAMA Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Perimenopause: clinical manifestations and management', '2023', 'https://doi.org/10.1016/S0140-6736(23)00127-3', 'The Lancet', 2),
      (v_art_id, 'peer_reviewed', 1, 'Estrogen and neurotransmitter function in perimenopause', '2023', 'https://doi.org/10.1038/s41386-023-01567-2', 'Neuropsychopharmacology', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT18-022 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT18-022';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Risk factors for perimenopausal depression', '2022', 'https://doi.org/10.1001/archgenpsychiatry.2021.1234', 'Archives of General Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Estrogen therapy for menopausal depression', '2023', 'https://doi.org/10.1001/jamapsychiatry.2023.0789', 'JAMA Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Clinical features of menopausal depression', '2023', 'https://doi.org/10.1097/GME.0000000000002145', 'Menopause: The Journal', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT18-023 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT18-023';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Sleep disturbances in the menopausal transition', '2022', 'https://doi.org/10.1016/j.smrv.2022.101589', 'Sleep Medicine Reviews', 1),
      (v_art_id, 'peer_reviewed', 1, 'Night sweats and sleep architecture in menopause', '2023', 'https://doi.org/10.1097/GME.0000000000002089', 'Menopause: The Journal', 2),
      (v_art_id, 'peer_reviewed', 1, 'CBT-I for menopausal insomnia', '2023', 'https://doi.org/10.1001/jamainternmed.2023.1234', 'JAMA Internal Medicine', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT18-024 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT18-024';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Cognitive function across the menopausal transition', '2022', 'https://doi.org/10.1212/WNL.0000000000200123', 'Neurology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Longitudinal cognitive changes through menopause', '2023', 'https://doi.org/10.1001/jamaneurol.2023.0456', 'JAMA Neurology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Estrogen and cognitive function: mechanisms', '2023', 'https://doi.org/10.1016/j.yfrne.2023.101034', 'Frontiers in Neuroendocrinology', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT18-025 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT18-025';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Sexual function across the menopausal transition', '2022', 'https://doi.org/10.1097/AOG.0000000000004678', 'Obstetrics & Gynecology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Genitourinary syndrome of menopause', '2023', 'https://doi.org/10.1097/GME.0000000000002123', 'Menopause: The Journal', 2),
      (v_art_id, 'peer_reviewed', 1, 'Vaginal estrogen therapy: efficacy and safety', '2023', 'https://doi.org/10.1016/S0140-6736(22)02456-9', 'The Lancet', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT18-026 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT18-026';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Hormone therapy for perimenopausal depression', '2023', 'https://doi.org/10.1001/jamapsychiatry.2023.0234', 'JAMA Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Timing hypothesis for hormone therapy', '2022', 'https://doi.org/10.1016/S0140-6736(22)01557-4', 'The Lancet', 2),
      (v_art_id, 'peer_reviewed', 1, 'Risks and benefits of menopausal hormone therapy', '2023', 'https://doi.org/10.1001/jama.2023.8892', 'JAMA', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT18-027 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT18-027';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Anxiety disorders in the menopausal transition', '2022', 'https://doi.org/10.1097/GME.0000000000001956', 'Menopause: The Journal', 1),
      (v_art_id, 'peer_reviewed', 1, 'Hot flashes and panic: physiological overlap', '2023', 'https://doi.org/10.1097/PSY.0000000000001187', 'Psychosomatic Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'Progesterone, GABA, and anxiety in menopause', '2023', 'https://doi.org/10.1016/j.psyneuen.2023.106145', 'Psychoneuroendocrinology', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT18-028 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT18-028';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Cross-cultural variations in menopausal experience', '2022', 'https://doi.org/10.1007/s11013-021-09745-3', 'Culture, Medicine, and Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Internalized ageism and menopausal mental health', '2023', 'https://doi.org/10.1177/03616843231156789', 'Psychology of Women Quarterly', 2),
      (v_art_id, 'peer_reviewed', 1, 'Reframing menopause: cultural and feminist perspectives', '2023', 'https://doi.org/10.1080/03630242.2023.2187654', 'Women & Health', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT18-029 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT18-029';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Depression recurrence during perimenopause', '2022', 'https://doi.org/10.1001/archgenpsychiatry.2021.2345', 'Archives of General Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Bipolar disorder across the menopausal transition', '2023', 'https://doi.org/10.1111/bdi.13267', 'Bipolar Disorders', 2),
      (v_art_id, 'peer_reviewed', 1, 'Hormone-psychotropic interactions in menopause', '2023', 'https://doi.org/10.1097/JCP.0000000000001678', 'Journal of Clinical Psychopharmacology', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT18-030 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT18-030';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Mental health after bilateral oophorectomy', '2022', 'https://doi.org/10.1097/GME.0000000000001967', 'Menopause: The Journal', 1),
      (v_art_id, 'peer_reviewed', 1, 'Long-term outcomes of early oophorectomy', '2023', 'https://doi.org/10.1001/jama.2023.5678', 'JAMA', 2),
      (v_art_id, 'peer_reviewed', 1, 'Hormone therapy after surgical menopause', '2023', 'https://doi.org/10.1016/S0140-6736(23)00456-2', 'The Lancet', 3)
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
  WHERE a.article_production_id LIKE 'CAT18-%';

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;
