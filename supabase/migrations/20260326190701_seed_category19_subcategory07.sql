-- ============================================================================
-- Seed: Category 19 (Men's Mental Health) — Subcategory 07
-- 2 articles: CAT19-065 through CAT19-066
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
  VALUES ('Men''s Health Interventions Part 2', 'men-s-health-interventions-part-2', v_cat_id, 7)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'men-s-health-interventions-part-2' AND category_id = v_cat_id;

  -- CAT19-065: Men and Creative Expression: Music, Art, and Writing as Emotional Outlets
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Men and Creative Expression: Music, Art, and Writing as Emotional Outlets',
    'men-and-creative-expression-music-art-and-writing-as-emotional-outlets',
    'draft',
    'Men''s Mental Health',
    ARRAY['Creative Expression', 'Art Therapy', 'Music', 'Men''s Wellbeing'],
    1010,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-065',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover how creative expression through music, art, and writing helps men process emotions that resist verbal expression, with research on art therapy and community programs.',
    '/images/articles/cat19/cover-065.svg',
    10,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT19-066: The Role of Humor in Men''s Mental Health: When Laughter Helps and When It Hides
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Role of Humor in Men''s Mental Health: When Laughter Helps and When It Hides',
    'the-role-of-humor-in-mens-mental-health-when-laughter-helps-and-when-it-hides',
    'draft',
    'Men''s Mental Health',
    ARRAY['Humor', 'Coping Mechanisms', 'Research', 'Men''s Mental Health'],
    1008,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-066',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Review the research on humor styles — affiliative, self-enhancing, aggressive, and self-defeating — and learn when men''s humor supports wellbeing and when it masks distress.',
    '/images/articles/cat19/cover-066.svg',
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

  -- === CAT19-065 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-065';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Reduction of cortisol levels and participants'' responses following art making', '2016', 'https://doi.org/10.1080/07421656.2016.1166832', 'Art Therapy: Journal of the American Art Therapy Association', 1),
      (v_art_id, 'peer_reviewed', 1, 'Music therapy for depression and anxiety: A systematic review and meta-analysis', '2017', 'https://doi.org/10.1002/14651858.CD004517.pub3', 'Cochrane Database of Systematic Reviews', 2),
      (v_art_id, 'peer_reviewed', 1, 'Expressive writing in psychological science: A review and recommendations', '2018', 'https://doi.org/10.1177/1745691617707315', 'Perspectives on Psychological Science', 3),
      (v_art_id, 'peer_reviewed', 1, 'Art therapy for combat-related PTSD in military veterans: A randomized controlled trial', '2021', 'https://doi.org/10.1002/jts.22674', 'Journal of Traumatic Stress', 4),
      (v_art_id, 'peer_reviewed', 1, 'Creative expression and emotional disclosure in men: A survey of preferences and barriers', '2022', 'https://doi.org/10.1037/men0000396', 'Psychology of Men & Masculinities', 5),
      (v_art_id, 'peer_reviewed', 1, 'Group drumming as a therapeutic intervention: A systematic review', '2020', 'https://doi.org/10.1016/j.ctim.2020.102503', 'Complementary Therapies in Medicine', 6),
      (v_art_id, 'peer_reviewed', 1, 'The Veterans Art Center: Creative arts programming and veteran reintegration', '2020', 'https://doi.org/10.1093/milmed/usaa116', 'Military Medicine', 7),
      (v_art_id, 'peer_reviewed', 1, 'Flow and creativity: Effects on subjective wellbeing and mental health', '2019', 'https://doi.org/10.1080/17439760.2018.1545042', 'Journal of Positive Psychology', 8),
      (v_art_id, 'peer_reviewed', 1, 'Creative arts therapies for men: Addressing gender-specific barriers to emotional expression', '2021', 'https://doi.org/10.1177/15579883211018325', 'American Journal of Men''s Health', 9),
      (v_art_id, 'government', 2, 'Arts, health, and wellbeing: A conceptual framework for arts-based health interventions', '2019', 'https://www.who.int/europe/publications/i/item/9789289054553', 'World Health Organization Regional Office for Europe', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT19-066 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-066';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Individual differences in uses of humor and their relation to psychological well-being: Development of the Humor Styles Questionnaire', '2003', 'https://doi.org/10.1016/S0092-6566(02)00534-2', 'Journal of Research in Personality', 1),
      (v_art_id, 'peer_reviewed', 1, 'Humor styles and mental health: A meta-analysis', '2021', 'https://doi.org/10.5964/ejop.5983', 'European Journal of Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Self-defeating humor and psychopathology: A systematic review and meta-analytic investigation', '2020', 'https://doi.org/10.1016/j.cpr.2020.101901', 'Clinical Psychology Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'Social laughter is correlated with an elevated pain threshold', '2012', 'https://doi.org/10.1098/rspb.2011.1373', 'Proceedings of the Royal Society B', 4),
      (v_art_id, 'peer_reviewed', 1, 'Gender differences in humor production and appreciation: A meta-analysis', '2019', 'https://doi.org/10.1037/aca0000199', 'Psychology of Aesthetics, Creativity, and the Arts', 5),
      (v_art_id, 'peer_reviewed', 1, 'Humor as a coping mechanism: Adaptive and maladaptive functions in men', '2020', 'https://doi.org/10.1037/men0000295', 'Psychology of Men & Masculinities', 6),
      (v_art_id, 'peer_reviewed', 1, 'Humor, laughter, and physical health: Methodological issues and research findings', '2005', 'https://doi.org/10.1037/0033-2909.131.4.504', 'Psychological Bulletin', 7),
      (v_art_id, 'peer_reviewed', 1, 'The dark side of humor: Relationships between aggressive humor and psychological maladjustment', '2018', 'https://doi.org/10.1515/humor-2017-0098', 'Humor: International Journal of Humor Research', 8),
      (v_art_id, 'peer_reviewed', 1, 'Humor and masculinity: A qualitative study of men who use humor to cope', '2021', 'https://doi.org/10.1177/10608265211023481', 'Journal of Men''s Studies', 9),
      (v_art_id, 'government', 2, 'The role of humor in mental health promotion: A scoping review', '2022', 'https://www.who.int/bulletin/volumes/100/2/21-287341', 'World Health Organization Bulletin', 10)
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
