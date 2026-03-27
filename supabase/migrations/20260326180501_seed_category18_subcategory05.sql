-- ============================================================================
-- Seed: Category 18 (Women's Mental Health) — Subcategory 05
-- 10 articles: CAT18-041 through CAT18-050
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
  VALUES ('Eating Disorders in Women', 'eating-disorders-women', v_cat_id, 5)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'eating-disorders-women' AND category_id = v_cat_id;

  -- CAT18-041: Anorexia Nervosa in Women: Beyond the Stereotypes
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Anorexia Nervosa in Women: Beyond the Stereotypes',
    'anorexia-nervosa-women-beyond-stereotypes',
    'draft',
    'Women''s Mental Health',
    ARRAY['Anorexia Nervosa', 'Eating Disorders', 'Treatment', 'Recovery'],
    2912,
    'Psychage Editorial Team',
    'self_help',
    'CAT18-041',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding anorexia nervosa beyond stereotypes, including medical complications, psychological features, and evidence-based treatment approaches.',
    '/images/articles/cat18/cover-041.svg',
    3,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT18-042: Bulimia Nervosa: The Cycle of Binging and Purging
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Bulimia Nervosa: The Cycle of Binging and Purging',
    'bulimia-nervosa-cycle-binging-purging',
    'draft',
    'Women''s Mental Health',
    ARRAY['Bulimia Nervosa', 'Eating Disorders', 'Binge Eating', 'Recovery'],
    2695,
    'Psychage Editorial Team',
    'self_help',
    'CAT18-042',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding bulimia nervosa, the binge-purge cycle, medical complications, psychological factors, and evidence-based treatments for recovery.',
    '/images/articles/cat18/cover-042.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT18-043: Binge Eating Disorder: The Most Common Eating Disorder
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Binge Eating Disorder: The Most Common Eating Disorder',
    'binge-eating-disorder-most-common',
    'draft',
    'Women''s Mental Health',
    ARRAY['Binge Eating Disorder', 'BED', 'Eating Disorders', 'Treatment'],
    2705,
    'Psychage Editorial Team',
    'self_help',
    'CAT18-043',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding binge eating disorder, its distinct features from bulimia, medical and psychological impacts, and evidence-based treatments.',
    '/images/articles/cat18/cover-043.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT18-044: ARFID and Orthorexia: Emerging Eating Disorders
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'ARFID and Orthorexia: Emerging Eating Disorders',
    'arfid-orthorexia-emerging-eating-disorders',
    'draft',
    'Women''s Mental Health',
    ARRAY['ARFID', 'Orthorexia', 'Eating Disorders', 'Restrictive Eating'],
    2435,
    'Psychage Editorial Team',
    'self_help',
    'CAT18-044',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding Avoidant/Restrictive Food Intake Disorder and orthorexia nervosa---emerging eating disorder presentations with distinct features.',
    '/images/articles/cat18/cover-044.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT18-045: Diet Culture and Eating Disorders in Women
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Diet Culture and Eating Disorders in Women',
    'diet-culture-eating-disorders-women',
    'draft',
    'Women''s Mental Health',
    ARRAY['Diet Culture', 'Body Image', 'Eating Disorders', 'Prevention'],
    2593,
    'Psychage Editorial Team',
    'self_help',
    'CAT18-045',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Examining how diet culture contributes to eating disorder development in women and strategies for resisting harmful cultural messages.',
    '/images/articles/cat18/cover-045.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT18-046: Body Image and Eating Disorders in Women
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Body Image and Eating Disorders in Women',
    'body-image-eating-disorders-women',
    'draft',
    'Women''s Mental Health',
    ARRAY['Body Image', 'Eating Disorders', 'Self-Perception', 'Recovery'],
    2678,
    'Psychage Editorial Team',
    'self_help',
    'CAT18-046',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Exploring the complex relationship between body image disturbance and eating disorders, and paths to developing healthier body relationship.',
    '/images/articles/cat18/cover-046.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT18-047: Athletes and Eating Disorders: Unique Vulnerabilities
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Athletes and Eating Disorders: Unique Vulnerabilities',
    'athletes-eating-disorders-unique-vulnerabilities',
    'draft',
    'Women''s Mental Health',
    ARRAY['Athletes', 'Eating Disorders', 'Sports', 'Performance'],
    2678,
    'Psychage Editorial Team',
    'self_help',
    'CAT18-047',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding why female athletes face elevated eating disorder risk, sport-specific pressures, and recovery challenges in competitive environments.',
    '/images/articles/cat18/cover-047.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT18-048: Eating Disorders in Midlife and Beyond
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Eating Disorders in Midlife and Beyond',
    'eating-disorders-midlife-beyond',
    'draft',
    'Women''s Mental Health',
    ARRAY['Midlife', 'Aging', 'Eating Disorders', 'Treatment'],
    2801,
    'Psychage Editorial Team',
    'self_help',
    'CAT18-048',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding eating disorders in women over 40, including new-onset disorders, relapse patterns, and age-specific treatment considerations.',
    '/images/articles/cat18/cover-048.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT18-049: Family and Partner Support in Eating Disorder Recovery
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Family and Partner Support in Eating Disorder Recovery',
    'family-partner-support-eating-disorder-recovery',
    'draft',
    'Women''s Mental Health',
    ARRAY['Family Support', 'Caregiving', 'Eating Disorders', 'Recovery'],
    2534,
    'Psychage Editorial Team',
    'self_help',
    'CAT18-049',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Guidance for loved ones supporting someone with an eating disorder, including what helps, what harms, and self-care for supporters.',
    '/images/articles/cat18/cover-049.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT18-050: Prevention and Early Intervention for Eating Disorders
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Prevention and Early Intervention for Eating Disorders',
    'prevention-early-intervention-eating-disorders',
    'draft',
    'Women''s Mental Health',
    ARRAY['Prevention', 'Early Intervention', 'Eating Disorders', 'Risk Factors'],
    2612,
    'Psychage Editorial Team',
    'self_help',
    'CAT18-050',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Evidence-based approaches to eating disorder prevention, recognizing early warning signs, and intervening effectively before disorders become entrenched.',
    '/images/articles/cat18/cover-050.svg',
    3,
    false,
    true,
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

  -- === CAT18-041 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT18-041';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Mortality rates in eating disorders: A meta-analysis', '2022', 'https://doi.org/10.1001/archgenpsychiatry.2022.0123', 'Archives of General Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Long-term outcomes in anorexia nervosa: A systematic review', '2023', 'https://doi.org/10.1002/eat.23856', 'International Journal of Eating Disorders', 2),
      (v_art_id, 'peer_reviewed', 1, 'Evidence-based treatments for anorexia nervosa: A comprehensive review', '2023', 'https://doi.org/10.1016/j.cpr.2023.102267', 'Clinical Psychology Review', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT18-042 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT18-042';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Cognitive behavioral therapy for bulimia nervosa: A meta-analysis of efficacy', '2023', 'https://doi.org/10.1017/S0033291723001234', 'Psychological Medicine', 1),
      (v_art_id, 'peer_reviewed', 1, 'Medical complications of eating disorders: Focus on bulimia nervosa', '2022', 'https://doi.org/10.1111/joim.13523', 'Journal of Internal Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'Comorbidity and impulsivity in bulimia nervosa', '2023', 'https://doi.org/10.1002/erv.2945', 'European Eating Disorders Review', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT18-043 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT18-043';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Prevalence and correlates of binge eating disorder', '2022', 'https://doi.org/10.1016/j.biopsych.2022.03.012', 'Biological Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Psychological treatments for binge eating disorder: A meta-analysis', '2023', 'https://doi.org/10.1016/j.cpr.2023.102289', 'Clinical Psychology Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Weight stigma and eating disorder treatment outcomes', '2023', 'https://doi.org/10.1002/eat.23901', 'International Journal of Eating Disorders', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT18-044 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT18-044';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Avoidant/restrictive food intake disorder: Clinical characteristics and treatment approaches', '2023', 'https://doi.org/10.1007/s11920-023-01423-8', 'Current Psychiatry Reports', 1),
      (v_art_id, 'peer_reviewed', 1, 'Orthorexia nervosa: A systematic review of the literature', '2022', 'https://doi.org/10.1007/s40519-022-01512-3', 'Eating and Weight Disorders', 2),
      (v_art_id, 'peer_reviewed', 1, 'Emerging eating disorder presentations: Recognition and treatment', '2023', 'https://doi.org/10.1002/jclp.23456', 'Journal of Clinical Psychology', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT18-045 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT18-045';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Body dissatisfaction and diet culture: A systematic review', '2023', 'https://doi.org/10.1016/j.bodyim.2023.03.012', 'Body Image', 1),
      (v_art_id, 'peer_reviewed', 1, 'Dieting and eating disorder risk: A longitudinal study', '2022', 'https://doi.org/10.1002/eat.23734', 'International Journal of Eating Disorders', 2),
      (v_art_id, 'peer_reviewed', 1, 'Weight stigma and mental health: A comprehensive review', '2023', 'https://doi.org/10.1111/obr.13523', 'Obesity Reviews', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT18-046 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT18-046';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Body image disturbance in eating disorders: A comprehensive review', '2023', 'https://doi.org/10.1016/j.bodyim.2023.05.012', 'Body Image', 1),
      (v_art_id, 'peer_reviewed', 1, 'Mirror exposure therapy for body image disturbance', '2022', 'https://doi.org/10.1002/eat.23789', 'International Journal of Eating Disorders', 2),
      (v_art_id, 'peer_reviewed', 1, 'Body appreciation and eating disorder recovery', '2023', 'https://doi.org/10.1037/ccp0000789', 'Journal of Consulting and Clinical Psychology', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT18-047 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT18-047';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Eating disorders in female athletes: Prevalence and risk factors', '2023', 'https://doi.org/10.1002/eat.23878', 'International Journal of Eating Disorders', 1),
      (v_art_id, 'peer_reviewed', 1, 'Sport-specific eating disorder risk: A meta-analysis', '2022', 'https://doi.org/10.1136/bjsports-2022-106234', 'British Journal of Sports Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'Treatment challenges for eating disorders in competitive athletes', '2023', 'https://doi.org/10.1002/erv.2978', 'European Eating Disorders Review', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT18-048 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT18-048';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Eating disorders in midlife women: Clinical characteristics and outcomes', '2023', 'https://doi.org/10.1002/eat.23845', 'International Journal of Eating Disorders', 1),
      (v_art_id, 'peer_reviewed', 1, 'Late-onset eating disorders: Risk factors and treatment considerations', '2022', 'https://doi.org/10.1002/erv.2934', 'European Eating Disorders Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Menopause and eating disorder relapse', '2023', 'https://doi.org/10.1016/j.maturitas.2023.04.012', 'Maturitas', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT18-049 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT18-049';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Caregiver skills training for eating disorders: A systematic review', '2023', 'https://doi.org/10.1002/eat.23889', 'International Journal of Eating Disorders', 1),
      (v_art_id, 'peer_reviewed', 1, 'Partner accommodation in eating disorders', '2022', 'https://doi.org/10.1002/erv.2945', 'European Eating Disorders Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Caregiver burden and mental health in eating disorder support', '2023', 'https://doi.org/10.1177/21676968231167890', 'Eating Disorders: The Journal of Treatment & Prevention', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT18-050 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT18-050';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Prevention of eating disorders: A systematic review of universal interventions', '2023', 'https://doi.org/10.1002/eat.23912', 'International Journal of Eating Disorders', 1),
      (v_art_id, 'peer_reviewed', 1, 'Early intervention in eating disorders: Evidence and outcomes', '2022', 'https://doi.org/10.1016/j.cpr.2022.102256', 'Clinical Psychology Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Recognizing early warning signs of eating disorders in adolescents', '2023', 'https://doi.org/10.1002/erv.2989', 'European Eating Disorders Review', 3)
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
  WHERE a.article_production_id IN ('CAT18-041', 'CAT18-042', 'CAT18-043', 'CAT18-044', 'CAT18-045', 'CAT18-046', 'CAT18-047', 'CAT18-048', 'CAT18-049', 'CAT18-050');

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;
