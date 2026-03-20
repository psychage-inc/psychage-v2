-- ============================================================================
-- Seed: Category 13 (Understanding Mental Health Conditions) — Subcategory 03
-- 10 articles: CAT13-021 through CAT13-030
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert Category if not present
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  'Understanding Mental Health Conditions',
  'mental-health-conditions',
  'Clear, research-based explanations of mental health conditions — symptoms, causes, diagnosis, and treatment.',
  'BookOpen',
  13,
  80,
  '#14B8A6'
)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------------------
-- 2. Insert Subcategory
-- ---------------------------------------------------------------------------

DO $$
DECLARE
  v_cat_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'mental-health-conditions';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Trauma & Dissociative Disorders', 'trauma-and-dissociative-disorders', v_cat_id, 3)
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'mental-health-conditions';
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'trauma-and-dissociative-disorders' AND category_id = v_cat_id;

  -- CAT13-021: PTSD: A Deep Dive into Post-Traumatic Stress Disorder
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'PTSD: A Deep Dive into Post-Traumatic Stress Disorder',
    'ptsd-deep-dive',
    'draft',
    'Understanding Mental Health Conditions',
    ARRAY['PTSD', 'Trauma', 'EMDR', 'CPT'],
    938,
    'Dr. Sarah Chen',
    'self_help',
    'CAT13-021',
    v_cat_id,
    v_sub_id,
    'drafted',
    'PTSD develops after trauma exposure. Learn symptoms, neurobiology, and evidence-based treatments like CPT and EMDR.',
    '/images/articles/cat13/cover-021.svg',
    3,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT13-022: Complex PTSD: When Trauma Is Repeated and Relational
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Complex PTSD: When Trauma Is Repeated and Relational',
    'complex-ptsd',
    'draft',
    'Understanding Mental Health Conditions',
    ARRAY['C-PTSD', 'Complex Trauma', 'Developmental Trauma'],
    933,
    'Dr. Sarah Chen',
    'self_help',
    'CAT13-022',
    v_cat_id,
    v_sub_id,
    'drafted',
    'C-PTSD results from prolonged trauma. Understand how it differs from PTSD and specialized treatment approaches.',
    '/images/articles/cat13/cover-022.svg',
    2,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT13-023: Acute Stress Disorder: The Immediate Aftermath of Trauma
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Acute Stress Disorder: The Immediate Aftermath of Trauma',
    'acute-stress-disorder',
    'draft',
    'Understanding Mental Health Conditions',
    ARRAY['ASD', 'Acute Stress', 'Trauma'],
    909,
    'Dr. Sarah Chen',
    'self_help',
    'CAT13-023',
    v_cat_id,
    v_sub_id,
    'drafted',
    'ASD occurs within days to weeks after trauma. Early intervention prevents PTSD development.',
    '/images/articles/cat13/cover-023.svg',
    2,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT13-024: Dissociative Identity Disorder: Understanding What Was Once Called "Multiple Personality
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Dissociative Identity Disorder: Understanding What Was Once Called "Multiple Personality',
    'dissociative-identity-disorder',
    'draft',
    'Understanding Mental Health Conditions',
    ARRAY['DID', 'Dissociation', 'Trauma'],
    912,
    'Dr. Sarah Chen',
    'self_help',
    'CAT13-024',
    v_cat_id,
    v_sub_id,
    'drafted',
    'DID involves distinct identity states. Learn the reality behind this misunderstood condition.',
    '/images/articles/cat13/cover-024.svg',
    2,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT13-025: Other Specified Dissociative Disorder: The In-Between Diagnosis
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Other Specified Dissociative Disorder: The In-Between Diagnosis',
    'osdd',
    'draft',
    'Understanding Mental Health Conditions',
    ARRAY['OSDD', 'Dissociation'],
    883,
    'Dr. Sarah Chen',
    'self_help',
    'CAT13-025',
    v_cat_id,
    v_sub_id,
    'drafted',
    'OSDD captures dissociative experiences not meeting full DID criteria.',
    '/images/articles/cat13/cover-025.svg',
    1,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT13-026: Depersonalization and Derealization: When Reality Feels Unreal
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Depersonalization and Derealization: When Reality Feels Unreal',
    'depersonalization-derealization',
    'draft',
    'Understanding Mental Health Conditions',
    ARRAY['Depersonalization', 'Derealization', 'Dissociation'],
    903,
    'Dr. Sarah Chen',
    'self_help',
    'CAT13-026',
    v_cat_id,
    v_sub_id,
    'drafted',
    'DPDR involves feeling detached from self or surroundings. Learn causes and treatments.',
    '/images/articles/cat13/cover-026.svg',
    2,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT13-027: How Dissociation Protects and Hinders: The Double-Edged Coping Mechanism
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How Dissociation Protects and Hinders: The Double-Edged Coping Mechanism',
    'dissociation-double-edged',
    'draft',
    'Understanding Mental Health Conditions',
    ARRAY['Dissociation', 'Coping', 'Trauma'],
    949,
    'Dr. Sarah Chen',
    'self_help',
    'CAT13-027',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Dissociation shields from overwhelming trauma but impairs functioning. Understand this adaptive-turned-maladaptive response.',
    '/images/articles/cat13/cover-027.svg',
    1,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT13-028: Trauma-Related Disorders in Military Veterans: Specialized Considerations
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Trauma-Related Disorders in Military Veterans: Specialized Considerations',
    'trauma-military-veterans',
    'draft',
    'Understanding Mental Health Conditions',
    ARRAY['Veterans', 'PTSD', 'Military'],
    904,
    'Dr. Sarah Chen',
    'self_help',
    'CAT13-028',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Combat trauma presents unique challenges. Learn about military-specific PTSD treatment.',
    '/images/articles/cat13/cover-028.svg',
    1,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT13-029: The Relationship Between Trauma Disorders and Substance Use
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Relationship Between Trauma Disorders and Substance Use',
    'trauma-substance-use',
    'draft',
    'Understanding Mental Health Conditions',
    ARRAY['Trauma', 'Substance Use', 'Dual Diagnosis'],
    928,
    'Dr. Sarah Chen',
    'self_help',
    'CAT13-029',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Trauma and addiction commonly co-occur. Understand the self-medication hypothesis and integrated treatment.',
    '/images/articles/cat13/cover-029.svg',
    1,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT13-030: Advances in Trauma and Dissociative Disorder Treatment
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Advances in Trauma and Dissociative Disorder Treatment',
    'advances-trauma-treatment',
    'draft',
    'Understanding Mental Health Conditions',
    ARRAY['Trauma Treatment', 'Research', 'Innovation'],
    900,
    'Dr. Sarah Chen',
    'self_help',
    'CAT13-030',
    v_cat_id,
    v_sub_id,
    'drafted',
    'New trauma treatments show promise. Explore innovations beyond traditional therapy.',
    '/images/articles/cat13/cover-030.svg',
    1,
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

  -- === CAT13-021 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT13-021';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'government', 2, 'PTSD', '2023', 'https://www.nimh.nih.gov/health/topics/post-traumatic-stress-disorder-ptsd', 'NIMH', 1),
      (v_art_id, 'clinical_guideline', 4, 'DSM-5-TR', '2022', 'https://doi.org/10.1176/appi.books.9780890425787', 'APA', 2),
      (v_art_id, 'peer_reviewed', 1, 'EMDR Efficacy', '2020', 'https://doi.org/10.1001/jamapsychiatry.2020.0757', 'JAMA Psychiatry', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT13-022 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT13-022';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'C-PTSD in ICD-11', '2020', 'https://doi.org/10.1002/wps.20748', 'World Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Treatment of C-PTSD', '2021', 'https://doi.org/10.1080/20008198.2021.1863580', 'European Journal of Psychotraumatology', 2)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT13-023 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT13-023';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'clinical_guideline', 4, 'DSM-5-TR', '2022', 'https://doi.org/10.1176/appi.books.9780890425787', 'APA', 1),
      (v_art_id, 'peer_reviewed', 1, 'Early Intervention for ASD', '2020', 'https://doi.org/10.1016/j.cpr.2020.101853', 'Clinical Psychology Review', 2)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT13-024 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT13-024';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'clinical_guideline', 4, 'DID Diagnosis', '2022', 'https://doi.org/10.1176/appi.books.9780890425787', 'DSM-5-TR', 1),
      (v_art_id, 'peer_reviewed', 1, 'DID and Trauma', '2020', 'https://doi.org/10.1176/appi.ajp.2019.19080821', 'American Journal of Psychiatry', 2)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT13-025 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT13-025';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'clinical_guideline', 4, 'DSM-5-TR', '2022', 'https://doi.org/10.1176/appi.books.9780890425787', 'APA', 1)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT13-026 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT13-026';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'clinical_guideline', 4, 'DPDR', '2022', 'https://doi.org/10.1176/appi.books.9780890425787', 'DSM-5-TR', 1),
      (v_art_id, 'peer_reviewed', 1, 'Treatment of DPDR', '2020', 'https://doi.org/10.1080/15299732.2020.1719263', 'Journal of Trauma & Dissociation', 2)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT13-027 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT13-027';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Dissociation as Defense', '2020', 'https://doi.org/10.1016/j.cpr.2020.101836', 'Clinical Psychology Review', 1)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT13-028 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT13-028';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'PTSD in Veterans', '2021', 'https://doi.org/10.1001/jama.2021.5863', 'JAMA', 1)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT13-029 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT13-029';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'PTSD and SUD Comorbidity', '2020', 'https://doi.org/10.1111/add.14956', 'Addiction', 1)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT13-030 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT13-030';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'MDMA for PTSD', '2021', 'https://doi.org/10.1038/s41591-021-01336-3', 'Nature Medicine', 1)
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
  WHERE a.article_production_id LIKE 'CAT13-%';

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;
