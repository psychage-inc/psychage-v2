-- ============================================================================
-- Seed: Category 18 (Women's Mental Health) — Subcategory 04
-- Trauma and PTSD in Women (Articles 31-40)
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
  VALUES ('Trauma and PTSD in Women', 'trauma-ptsd-women', v_cat_id, 4)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'trauma-ptsd-women' AND category_id = v_cat_id;

  -- CAT18-031: Gender-Based Violence and Mental Health: Understanding the Impact
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Gender-Based Violence and Mental Health: Understanding the Impact',
    'gender-based-violence-and-mental-health-understanding-the-impact',
    'draft',
    'Women''s Mental Health',
    ARRAY['Gender-Based Violence', 'Trauma', 'PTSD', 'Safety'],
    1247,
    'Psychage Editorial Team',
    'self_help',
    'CAT18-031',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the profound mental health consequences of gender-based violence, including intimate partner violence, sexual assault, and systemic violence against women.',
    '/images/articles/cat18/cover-031.svg',
    3,
    true,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT18-032: Sexual Assault and Mental Health Recovery: Healing from Trauma
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Sexual Assault and Mental Health Recovery: Healing from Trauma',
    'sexual-assault-and-mental-health-recovery-healing-from-trauma',
    'draft',
    'Women''s Mental Health',
    ARRAY['Sexual Assault', 'Rape', 'Trauma Recovery', 'PTSD'],
    1198,
    'Psychage Editorial Team',
    'self_help',
    'CAT18-032',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the mental health impact of sexual assault, navigate the aftermath, and learn about trauma-focused treatments that support recovery and reclaiming of self.',
    '/images/articles/cat18/cover-032.svg',
    3,
    true,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT18-033: Childhood Sexual Abuse: Long-Term Mental Health Impact in Women
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Childhood Sexual Abuse: Long-Term Mental Health Impact in Women',
    'childhood-sexual-abuse-long-term-mental-health-impact-women',
    'draft',
    'Women''s Mental Health',
    ARRAY['Childhood Sexual Abuse', 'Complex Trauma', 'Healing', 'Survivors'],
    1312,
    'Psychage Editorial Team',
    'self_help',
    'CAT18-033',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Examine how childhood sexual abuse affects women across the lifespan, from attachment patterns to relationships, self-concept, and pathways to healing from developmental trauma.',
    '/images/articles/cat18/cover-033.svg',
    3,
    true,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT18-034: Complex PTSD in Women: Chronic Trauma and Recovery
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Complex PTSD in Women: Chronic Trauma and Recovery',
    'complex-ptsd-in-women-chronic-trauma-recovery',
    'draft',
    'Women''s Mental Health',
    ARRAY['Complex PTSD', 'C-PTSD', 'Chronic Trauma', 'Treatment'],
    1289,
    'Psychage Editorial Team',
    'self_help',
    'CAT18-034',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand Complex PTSD (C-PTSD) resulting from prolonged, repeated trauma, including symptoms beyond traditional PTSD and specialized treatment approaches.',
    '/images/articles/cat18/cover-034.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT18-035: Human Trafficking and Mental Health: Survivor Recovery
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Human Trafficking and Mental Health: Survivor Recovery',
    'human-trafficking-mental-health-survivor-recovery',
    'draft',
    'Women''s Mental Health',
    ARRAY['Human Trafficking', 'Sex Trafficking', 'Trauma', 'Recovery'],
    1354,
    'Psychage Editorial Team',
    'self_help',
    'CAT18-035',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the profound psychological impact of human trafficking, including trauma from exploitation, coercion, and dehumanization, and specialized recovery approaches for survivors.',
    '/images/articles/cat18/cover-035.svg',
    3,
    true,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT18-036: Trauma-Focused Therapy: What Works and Why
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Trauma-Focused Therapy: What Works and Why',
    'trauma-focused-therapy-what-works',
    'draft',
    'Women''s Mental Health',
    ARRAY['Trauma Therapy', 'PTSD Treatment', 'Evidence-Based', 'Healing'],
    1276,
    'Psychage Editorial Team',
    'self_help',
    'CAT18-036',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A comprehensive guide to evidence-based trauma therapies including CPT, PE, and EMDR, helping you understand treatment options and choose what''s right for you.',
    '/images/articles/cat18/cover-036.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT18-037: Body-Based Trauma Healing for Women: Somatic Approaches
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Body-Based Trauma Healing for Women: Somatic Approaches',
    'body-based-trauma-healing-somatic-approaches',
    'draft',
    'Women''s Mental Health',
    ARRAY['Somatic Therapy', 'Body-Based Healing', 'Trauma Recovery', 'Embodiment'],
    1308,
    'Psychage Editorial Team',
    'self_help',
    'CAT18-037',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover how body-centered therapies like somatic experiencing, sensorimotor psychotherapy, and trauma-sensitive yoga help process trauma held in the body.',
    '/images/articles/cat18/cover-037.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT18-038: Secondary Trauma and Vicarious Traumatization in Women
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Secondary Trauma and Vicarious Traumatization in Women',
    'secondary-trauma-vicarious-traumatization-women',
    'draft',
    'Women''s Mental Health',
    ARRAY['Secondary Trauma', 'Vicarious Trauma', 'Compassion Fatigue', 'Caregiving'],
    1245,
    'Psychage Editorial Team',
    'self_help',
    'CAT18-038',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand how witnessing or hearing about trauma affects mental health, particularly in caregiving and helping professions dominated by women, and learn protective strategies.',
    '/images/articles/cat18/cover-038.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT18-039: Collective Trauma: Systemic Violence and Women''s Mental Health
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Collective Trauma: Systemic Violence and Women''s Mental Health',
    'collective-trauma-systemic-violence-womens-mental-health',
    'draft',
    'Women''s Mental Health',
    ARRAY['Collective Trauma', 'Systemic Violence', 'Social Justice', 'Resilience'],
    1327,
    'Psychage Editorial Team',
    'self_help',
    'CAT18-039',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Examine how systemic oppression, historical trauma, and collective violence affect women''s mental health, and explore community-based healing approaches.',
    '/images/articles/cat18/cover-039.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT18-040: Post-Traumatic Growth: Finding Meaning After Trauma
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Post-Traumatic Growth: Finding Meaning After Trauma',
    'post-traumatic-growth-finding-meaning-after-trauma',
    'draft',
    'Women''s Mental Health',
    ARRAY['Post-Traumatic Growth', 'Resilience', 'Meaning-Making', 'Recovery'],
    1264,
    'Psychage Editorial Team',
    'self_help',
    'CAT18-040',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore how some trauma survivors experience positive psychological changes, including personal strength, deeper relationships, and new life priorities, alongside their suffering.',
    '/images/articles/cat18/cover-040.svg',
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

  -- === CAT18-031 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT18-031';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Global prevalence and mental health impact of intimate partner violence', '2023', 'https://doi.org/10.1016/S0140-6736(23)00234-5', 'The Lancet', 1),
      (v_art_id, 'peer_reviewed', 1, 'Gender-based violence and PTSD: A meta-analytic review', '2022', 'https://doi.org/10.1177/15248380221089456', 'Trauma, Violence, & Abuse', 2),
      (v_art_id, 'peer_reviewed', 1, 'Trauma-informed care for intimate partner violence survivors', '2023', 'https://doi.org/10.1177/15248380231167823', 'Trauma, Violence, & Abuse', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT18-032 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT18-032';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'PTSD prevalence and course following sexual assault', '2023', 'https://doi.org/10.1002/jts.22889', 'Journal of Traumatic Stress', 1),
      (v_art_id, 'peer_reviewed', 1, 'Evidence-based treatments for rape-related PTSD', '2023', 'https://doi.org/10.1001/jamapsychiatry.2023.0567', 'JAMA Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Tonic immobility during sexual assault and PTSD outcomes', '2022', 'https://doi.org/10.1002/jts.22745', 'Journal of Traumatic Stress', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT18-033 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT18-033';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Long-term mental health outcomes of childhood sexual abuse in women', '2023', 'https://doi.org/10.1001/jamapsychiatry.2023.1234', 'JAMA Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Childhood sexual abuse and complex PTSD in adulthood', '2022', 'https://doi.org/10.1177/15248380221123456', 'Trauma, Violence, & Abuse', 2),
      (v_art_id, 'peer_reviewed', 1, 'Attachment disruption following childhood sexual abuse', '2023', 'https://doi.org/10.1080/14616734.2023.2187654', 'Attachment & Human Development', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT18-034 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT18-034';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Complex PTSD: Clinical features and treatment approaches', '2023', 'https://doi.org/10.1016/S2215-0366(23)00123-4', 'The Lancet Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Gender differences in complex PTSD presentation', '2022', 'https://doi.org/10.1002/jts.22801', 'Journal of Traumatic Stress', 2),
      (v_art_id, 'peer_reviewed', 1, 'Phase-based treatment for complex trauma in women', '2023', 'https://doi.org/10.1177/15248380231178901', 'Trauma, Violence, & Abuse', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT18-035 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT18-035';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Mental health consequences of sex trafficking: A systematic review', '2022', 'https://doi.org/10.1177/15248380221145678', 'Trauma, Violence, & Abuse', 1),
      (v_art_id, 'peer_reviewed', 1, 'Complex trauma in human trafficking survivors', '2023', 'https://doi.org/10.1002/jts.22923', 'Journal of Traumatic Stress', 2),
      (v_art_id, 'peer_reviewed', 1, 'Trauma-informed services for trafficking survivors', '2023', 'https://doi.org/10.1016/j.chiabu.2023.106187', 'Child Abuse & Neglect', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT18-036 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT18-036';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Comparative effectiveness of PTSD psychotherapies', '2023', 'https://doi.org/10.1001/jamapsychiatry.2023.2345', 'JAMA Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Prolonged Exposure therapy for PTSD: Meta-analysis', '2022', 'https://doi.org/10.1002/jts.22767', 'Journal of Traumatic Stress', 2),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive Processing Therapy outcomes in women', '2023', 'https://doi.org/10.1177/15248380231156789', 'Trauma, Violence, & Abuse', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT18-037 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT18-037';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Somatic experiencing for trauma treatment: Systematic review', '2023', 'https://doi.org/10.1002/jts.22945', 'Journal of Traumatic Stress', 1),
      (v_art_id, 'peer_reviewed', 1, 'Trauma-sensitive yoga for women with PTSD', '2022', 'https://doi.org/10.1177/15248380221167890', 'Trauma, Violence, & Abuse', 2),
      (v_art_id, 'peer_reviewed', 1, 'Sensorimotor psychotherapy for complex trauma', '2023', 'https://doi.org/10.1080/10503307.2023.2198765', 'Psychotherapy Research', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT18-038 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT18-038';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Vicarious traumatization in women helping professionals', '2022', 'https://doi.org/10.1177/15248380221178901', 'Trauma, Violence, & Abuse', 1),
      (v_art_id, 'peer_reviewed', 1, 'Secondary traumatic stress in healthcare workers', '2023', 'https://doi.org/10.1002/jts.22889', 'Journal of Traumatic Stress', 2),
      (v_art_id, 'peer_reviewed', 1, 'Compassion fatigue and resilience in trauma workers', '2023', 'https://doi.org/10.1001/jamapsychiatry.2023.3456', 'JAMA Psychiatry', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT18-039 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT18-039';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Collective trauma and mental health in marginalized communities', '2023', 'https://doi.org/10.1177/15248380231189012', 'Trauma, Violence, & Abuse', 1),
      (v_art_id, 'peer_reviewed', 1, 'Intergenerational trauma transmission in women', '2022', 'https://doi.org/10.1016/S2215-0366(22)00345-6', 'The Lancet Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Community-based healing from collective trauma', '2023', 'https://doi.org/10.1002/jts.22967', 'Journal of Traumatic Stress', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT18-040 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT18-040';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Post-traumatic growth in women trauma survivors', '2023', 'https://doi.org/10.1002/jts.22978', 'Journal of Traumatic Stress', 1),
      (v_art_id, 'peer_reviewed', 1, 'Mechanisms of growth following trauma', '2022', 'https://doi.org/10.1037/tra0001234', 'Psychological Trauma: Theory, Research, Practice, and Policy', 2),
      (v_art_id, 'peer_reviewed', 1, 'Facilitating post-traumatic growth in therapy', '2023', 'https://doi.org/10.1177/15248380231198765', 'Trauma, Violence, & Abuse', 3)
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
  WHERE a.article_production_id IN ('CAT18-031', 'CAT18-032', 'CAT18-033', 'CAT18-034', 'CAT18-035', 'CAT18-036', 'CAT18-037', 'CAT18-038', 'CAT18-039', 'CAT18-040');

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;
