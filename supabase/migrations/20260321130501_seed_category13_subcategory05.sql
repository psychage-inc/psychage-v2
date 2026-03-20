-- ============================================================================
-- Seed: Category 13 (Understanding Mental Health Conditions) — Subcategory 05
-- 10 articles: CAT13-041 through CAT13-050
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
  VALUES ('Neurodevelopmental Conditions', 'neurodevelopmental-conditions', v_cat_id, 5)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'neurodevelopmental-conditions' AND category_id = v_cat_id;

  -- CAT13-041: ADHD in Adults: The Condition That Wasn''t Supposed to Exist Past Childhood
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'ADHD in Adults: The Condition That Wasn''t Supposed to Exist Past Childhood',
    'adhd-adults',
    'draft',
    'Understanding Mental Health Conditions',
    ARRAY['ADHD', 'Adult ADHD'],
    910,
    'Dr. Sarah Chen',
    'self_help',
    'CAT13-041',
    v_cat_id,
    v_sub_id,
    'drafted',
    'ADHD persists into adulthood in 60% of cases. Learn about diagnosis and treatment in adults.',
    '/images/articles/cat13/cover-041.svg',
    1,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT13-042: ADHD in Women and Girls: Why It''s Underdiagnosed and Misunderstood
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'ADHD in Women and Girls: Why It''s Underdiagnosed and Misunderstood',
    'adhd-women',
    'draft',
    'Understanding Mental Health Conditions',
    ARRAY['ADHD', 'Women', 'Gender'],
    874,
    'Dr. Sarah Chen',
    'self_help',
    'CAT13-042',
    v_cat_id,
    v_sub_id,
    'drafted',
    'ADHD presents differently in women, leading to underdiagnosis.',
    '/images/articles/cat13/cover-042.svg',
    1,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT13-043: Autism Spectrum: Understanding Neurodiversity in Adults
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Autism Spectrum: Understanding Neurodiversity in Adults',
    'autism-adults',
    'draft',
    'Understanding Mental Health Conditions',
    ARRAY['Autism', 'ASD', 'Neurodiversity'],
    872,
    'Dr. Sarah Chen',
    'self_help',
    'CAT13-043',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Autism is lifelong. Learn about adult diagnosis and support.',
    '/images/articles/cat13/cover-043.svg',
    1,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT13-044: Late-Diagnosed Autism: What Happens When You Find Out as an Adult
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Late-Diagnosed Autism: What Happens When You Find Out as an Adult',
    'late-diagnosed-autism',
    'draft',
    'Understanding Mental Health Conditions',
    ARRAY['Autism', 'Late Diagnosis'],
    872,
    'Dr. Sarah Chen',
    'self_help',
    'CAT13-044',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Adult autism diagnosis brings clarity and access to support.',
    '/images/articles/cat13/cover-044.svg',
    1,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT13-045: ADHD and Autism Overlap: When Conditions Co-Occur
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'ADHD and Autism Overlap: When Conditions Co-Occur',
    'adhd-autism-overlap',
    'draft',
    'Understanding Mental Health Conditions',
    ARRAY['ADHD', 'Autism', 'Comorbidity'],
    877,
    'Dr. Sarah Chen',
    'self_help',
    'CAT13-045',
    v_cat_id,
    v_sub_id,
    'drafted',
    'ADHD and autism frequently co-occur, creating unique challenges.',
    '/images/articles/cat13/cover-045.svg',
    1,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT13-046: Hyperkinetic Disorder: Understanding the ICD Perspective on Attention and Activity
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Hyperkinetic Disorder: Understanding the ICD Perspective on Attention and Activity',
    'hyperkinetic-disorder',
    'draft',
    'Understanding Mental Health Conditions',
    ARRAY['Hyperkinetic Disorder', 'ADHD', 'ICD'],
    862,
    'Dr. Sarah Chen',
    'self_help',
    'CAT13-046',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Hyperkinetic disorder is the ICD equivalent of ADHD.',
    '/images/articles/cat13/cover-046.svg',
    1,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT13-047: ADHD and Executive Function: Why Simple Tasks Feel Impossible
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'ADHD and Executive Function: Why Simple Tasks Feel Impossible',
    'adhd-executive-function',
    'draft',
    'Understanding Mental Health Conditions',
    ARRAY['ADHD', 'Executive Function'],
    877,
    'Dr. Sarah Chen',
    'self_help',
    'CAT13-047',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Executive dysfunction explains ADHD challenges beyond attention.',
    '/images/articles/cat13/cover-047.svg',
    1,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT13-048: Autism and Masking: The Exhausting Work of Appearing Neurotypical
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Autism and Masking: The Exhausting Work of Appearing Neurotypical',
    'autism-masking',
    'draft',
    'Understanding Mental Health Conditions',
    ARRAY['Autism', 'Masking', 'Neurodiversity'],
    864,
    'Dr. Sarah Chen',
    'self_help',
    'CAT13-048',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Autistic masking leads to burnout and late diagnosis.',
    '/images/articles/cat13/cover-048.svg',
    1,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT13-049: Neurodevelopmental Conditions and Mental Health: The Comorbidity Challenge
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Neurodevelopmental Conditions and Mental Health: The Comorbidity Challenge',
    'neurodevelopmental-mental-health',
    'draft',
    'Understanding Mental Health Conditions',
    ARRAY['Neurodevelopmental', 'Comorbidity'],
    891,
    'Dr. Sarah Chen',
    'self_help',
    'CAT13-049',
    v_cat_id,
    v_sub_id,
    'drafted',
    'ADHD and autism increase risk for anxiety, depression, and other conditions.',
    '/images/articles/cat13/cover-049.svg',
    1,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT13-050: Support and Accommodation: Building a Life That Works with Your Brain
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Support and Accommodation: Building a Life That Works with Your Brain',
    'support-accommodation',
    'draft',
    'Understanding Mental Health Conditions',
    ARRAY['Accommodations', 'Support', 'Neurodiversity'],
    879,
    'Dr. Sarah Chen',
    'self_help',
    'CAT13-050',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Accommodations improve functioning for neurodivergent individuals.',
    '/images/articles/cat13/cover-050.svg',
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

  -- === CAT13-041 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT13-041';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Adult ADHD', '2021', 'https://doi.org/10.1001/jamapsychiatry.2021.0028', 'JAMA Psychiatry', 1)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT13-042 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT13-042';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'ADHD in Women', '2020', 'https://doi.org/10.1016/S2215-0366(20)30203-4', 'Lancet Psychiatry', 1)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT13-043 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT13-043';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'government', 2, 'Adult Autism', '2023', 'https://www.nimh.nih.gov/health/topics/autism-spectrum-disorders-asd', 'NIMH', 1)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT13-044 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT13-044';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Late Autism Diagnosis', '2020', 'https://doi.org/10.1002/aur.2316', 'Autism Research', 1)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT13-045 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT13-045';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'ADHD-Autism Comorbidity', '2020', 'https://doi.org/10.1111/jcpp.13279', 'Journal of Child Psychology', 1)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT13-046 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT13-046';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'government', 2, 'ICD-11', '2022', 'https://icd.who.int/', 'WHO', 1)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT13-047 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT13-047';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Executive Function in ADHD', '2021', 'https://doi.org/10.1007/s11065-020-09465-0', 'Neuropsychology Review', 1)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT13-048 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT13-048';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Autistic Masking', '2020', 'https://doi.org/10.1089/aut.2020.0043', 'Autism in Adulthood', 1)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT13-049 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT13-049';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'ND Comorbidity', '2021', 'https://doi.org/10.1016/S2215-0366(21)00091-8', 'Lancet Psychiatry', 1)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT13-050 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT13-050';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Workplace Accommodations', '2020', 'https://doi.org/10.1007/s10926-020-09907-5', 'Journal of Occupational Rehabilitation', 1)
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
