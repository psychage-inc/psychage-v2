-- ============================================================================
-- Seed: Category 13 (Understanding Mental Health Conditions) — Subcategory 04
-- 10 articles: CAT13-031 through CAT13-040
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
  VALUES ('OCD Spectrum & Impulse Control Disorders', 'ocd-spectrum-and-impulse-control-disorders', v_cat_id, 4)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'ocd-spectrum-and-impulse-control-disorders' AND category_id = v_cat_id;

  -- CAT13-031: OCD Explained: Beyond Handwashing and Checking — The Full Picture
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'OCD Explained: Beyond Handwashing and Checking — The Full Picture',
    'ocd-explained',
    'draft',
    'Understanding Mental Health Conditions',
    ARRAY['OCD', 'Obsessions', 'Compulsions'],
    904,
    'Dr. Sarah Chen',
    'self_help',
    'CAT13-031',
    v_cat_id,
    v_sub_id,
    'drafted',
    'OCD is intrusive obsessions + compulsions. Understand the condition beyond stereotypes.',
    '/images/articles/cat13/cover-031.svg',
    2,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT13-032: Common OCD Subtypes: Contamination, Harm, Symmetry, and Pure O
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Common OCD Subtypes: Contamination, Harm, Symmetry, and Pure O',
    'ocd-subtypes',
    'draft',
    'Understanding Mental Health Conditions',
    ARRAY['OCD', 'Pure O', 'Harm OCD'],
    895,
    'Dr. Sarah Chen',
    'self_help',
    'CAT13-032',
    v_cat_id,
    v_sub_id,
    'drafted',
    'OCD presents in many forms. Learn the major subtypes and their unique features.',
    '/images/articles/cat13/cover-032.svg',
    1,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT13-033: Body Dysmorphic Disorder: When You Can''t Stop Seeing Flaws
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Body Dysmorphic Disorder: When You Can''t Stop Seeing Flaws',
    'body-dysmorphic-disorder',
    'draft',
    'Understanding Mental Health Conditions',
    ARRAY['BDD', 'Body Image', 'OCD Spectrum'],
    920,
    'Dr. Sarah Chen',
    'self_help',
    'CAT13-033',
    v_cat_id,
    v_sub_id,
    'drafted',
    'BDD involves preoccupation with perceived appearance defects. Understand this OCD-related condition.',
    '/images/articles/cat13/cover-033.svg',
    1,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT13-034: Trichotillomania: Understanding Hair-Pulling Disorder
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Trichotillomania: Understanding Hair-Pulling Disorder',
    'trichotillomania',
    'draft',
    'Understanding Mental Health Conditions',
    ARRAY['Trichotillomania', 'Hair Pulling', 'OCD Spectrum'],
    880,
    'Dr. Sarah Chen',
    'self_help',
    'CAT13-034',
    v_cat_id,
    v_sub_id,
    'drafted',
    'TTM is recurrent hair-pulling. Learn causes, impact, and treatment.',
    '/images/articles/cat13/cover-034.svg',
    1,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT13-035: Excoriation Disorder: When Skin-Picking Becomes Compulsive
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Excoriation Disorder: When Skin-Picking Becomes Compulsive',
    'excoriation-disorder',
    'draft',
    'Understanding Mental Health Conditions',
    ARRAY['Skin Picking', 'Excoriation', 'OCD Spectrum'],
    870,
    'Dr. Sarah Chen',
    'self_help',
    'CAT13-035',
    v_cat_id,
    v_sub_id,
    'drafted',
    'SPD is recurrent skin-picking causing distress and damage.',
    '/images/articles/cat13/cover-035.svg',
    1,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT13-036: Intermittent Explosive Disorder: Understanding Disproportionate Anger Outbursts
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Intermittent Explosive Disorder: Understanding Disproportionate Anger Outbursts',
    'intermittent-explosive-disorder',
    'draft',
    'Understanding Mental Health Conditions',
    ARRAY['IED', 'Anger', 'Impulse Control'],
    877,
    'Dr. Sarah Chen',
    'self_help',
    'CAT13-036',
    v_cat_id,
    v_sub_id,
    'drafted',
    'IED involves impulsive aggression out of proportion to triggers.',
    '/images/articles/cat13/cover-036.svg',
    1,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT13-037: Hoarding Disorder: More Than Just Collecting — A Mental Health Condition
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Hoarding Disorder: More Than Just Collecting — A Mental Health Condition',
    'hoarding-disorder',
    'draft',
    'Understanding Mental Health Conditions',
    ARRAY['Hoarding', 'OCD Spectrum'],
    897,
    'Dr. Sarah Chen',
    'self_help',
    'CAT13-037',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Hoarding causes distress and impairment through inability to discard possessions.',
    '/images/articles/cat13/cover-037.svg',
    1,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT13-038: The OCD Spectrum: How Related Conditions Share Common Ground
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The OCD Spectrum: How Related Conditions Share Common Ground',
    'ocd-spectrum',
    'draft',
    'Understanding Mental Health Conditions',
    ARRAY['OCD Spectrum', 'Related Disorders'],
    886,
    'Dr. Sarah Chen',
    'self_help',
    'CAT13-038',
    v_cat_id,
    v_sub_id,
    'drafted',
    'OCD-related disorders share repetitive behaviors and intrusive thoughts.',
    '/images/articles/cat13/cover-038.svg',
    1,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT13-039: OCD in Children and Adolescents: Early Recognition and Treatment
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'OCD in Children and Adolescents: Early Recognition and Treatment',
    'ocd-children',
    'draft',
    'Understanding Mental Health Conditions',
    ARRAY['Childhood OCD', 'Pediatric OCD'],
    872,
    'Dr. Sarah Chen',
    'self_help',
    'CAT13-039',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Childhood OCD requires early intervention for best outcomes.',
    '/images/articles/cat13/cover-039.svg',
    1,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT13-040: ERP and Other Treatments for OCD Spectrum Conditions
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'ERP and Other Treatments for OCD Spectrum Conditions',
    'erp-treatment',
    'draft',
    'Understanding Mental Health Conditions',
    ARRAY['ERP', 'OCD Treatment', 'Therapy'],
    886,
    'Dr. Sarah Chen',
    'self_help',
    'CAT13-040',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Exposure and Response Prevention is the gold-standard treatment for OCD.',
    '/images/articles/cat13/cover-040.svg',
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

  -- === CAT13-031 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT13-031';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'government', 2, 'OCD', '2023', 'https://www.nimh.nih.gov/health/topics/obsessive-compulsive-disorder-ocd', 'NIMH', 1),
      (v_art_id, 'clinical_guideline', 4, 'DSM-5-TR', '2022', 'https://doi.org/10.1176/appi.books.9780890425787', 'APA', 2)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT13-032 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT13-032';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'OCD Subtypes', '2020', 'https://doi.org/10.1016/j.janxdis.2020.102225', 'Journal of Anxiety Disorders', 1)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT13-033 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT13-033';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'clinical_guideline', 4, 'BDD', '2022', 'https://doi.org/10.1176/appi.books.9780890425787', 'DSM-5-TR', 1)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT13-034 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT13-034';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'clinical_guideline', 4, 'TTM', '2022', 'https://doi.org/10.1176/appi.books.9780890425787', 'DSM-5-TR', 1)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT13-035 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT13-035';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'clinical_guideline', 4, 'SPD', '2022', 'https://doi.org/10.1176/appi.books.9780890425787', 'DSM-5-TR', 1)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT13-036 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT13-036';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'clinical_guideline', 4, 'IED', '2022', 'https://doi.org/10.1176/appi.books.9780890425787', 'DSM-5-TR', 1)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT13-037 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT13-037';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'clinical_guideline', 4, 'Hoarding Disorder', '2022', 'https://doi.org/10.1176/appi.books.9780890425787', 'DSM-5-TR', 1)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT13-038 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT13-038';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'OCD Spectrum', '2020', 'https://doi.org/10.1002/wps.20751', 'World Psychiatry', 1)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT13-039 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT13-039';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Pediatric OCD', '2020', 'https://doi.org/10.1016/j.jaac.2020.02.014', 'JAACAP', 1)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT13-040 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT13-040';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'ERP Efficacy', '2020', 'https://doi.org/10.1016/S2215-0366(20)30056-4', 'Lancet Psychiatry', 1)
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
