-- ============================================================================
-- Seed: Category 18 (Women's Mental Health) — Subcategory 02
-- 10 articles: CAT18-011 through CAT18-020
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
  VALUES ('Perinatal and Postpartum Mental Health', 'perinatal-and-postpartum-mental-health', v_cat_id, 2)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'perinatal-and-postpartum-mental-health' AND category_id = v_cat_id;

  -- CAT18-011: Perinatal Depression: Understanding Depression During Pregnancy
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Perinatal Depression: Understanding Depression During Pregnancy',
    'perinatal-depression-understanding-depression-during-pregnancy',
    'draft',
    'Women''s Mental Health',
    ARRAY['Perinatal Depression', 'Pregnancy', 'Prenatal Care', 'Treatment'],
    976,
    'Psychage Editorial Team',
    'self_help',
    'CAT18-011',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore depression during pregnancy, including risk factors, symptoms, treatment safety, and why maternal mental health is essential prenatal care.',
    '/images/articles/cat18/cover-011.svg',
    3,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT18-012: Postpartum Depression: Beyond the Baby Blues
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Postpartum Depression: Beyond the Baby Blues',
    'postpartum-depression-beyond-the-baby-blues',
    'draft',
    'Women''s Mental Health',
    ARRAY['Postpartum Depression', 'Maternal Mental Health', 'PPD', 'Treatment'],
    1010,
    'Psychage Editorial Team',
    'self_help',
    'CAT18-012',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Distinguish between baby blues and postpartum depression, understand risk factors and symptoms, and learn about evidence-based treatments for this common postpartum condition.',
    '/images/articles/cat18/cover-012.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT18-013: Perinatal Anxiety: When Worry Becomes Overwhelming
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Perinatal Anxiety: When Worry Becomes Overwhelming',
    'perinatal-anxiety-when-worry-becomes-overwhelming',
    'draft',
    'Women''s Mental Health',
    ARRAY['Perinatal Anxiety', 'Panic Disorder', 'Intrusive Thoughts', 'Worry'],
    1011,
    'Psychage Editorial Team',
    'self_help',
    'CAT18-013',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand anxiety disorders during pregnancy and postpartum, including generalized anxiety, panic disorder, and health anxiety, plus strategies for managing intrusive worries.',
    '/images/articles/cat18/cover-013.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT18-014: Birth Trauma and PTSD: Healing After Difficult Births
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Birth Trauma and PTSD: Healing After Difficult Births',
    'birth-trauma-and-ptsd-healing-after-difficult-births',
    'draft',
    'Women''s Mental Health',
    ARRAY['Birth Trauma', 'PTSD', 'Medical Trauma', 'Recovery'],
    969,
    'Psychage Editorial Team',
    'self_help',
    'CAT18-014',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand birth trauma and postpartum PTSD, recognize symptoms, and learn about trauma-focused treatments that support recovery and bonding.',
    '/images/articles/cat18/cover-014.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT18-015: Postpartum Psychosis: Recognizing and Responding to Psychiatric Emergency
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Postpartum Psychosis: Recognizing and Responding to Psychiatric Emergency',
    'postpartum-psychosis-recognizing-and-responding-to-psychiatric-emergency',
    'draft',
    'Women''s Mental Health',
    ARRAY['Postpartum Psychosis', 'Psychiatric Emergency', 'Psychosis', 'Crisis'],
    978,
    'Psychage Editorial Team',
    'self_help',
    'CAT18-015',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand postpartum psychosis as a rare but serious psychiatric emergency, learn to recognize symptoms, and know when and how to seek urgent care.',
    '/images/articles/cat18/cover-015.svg',
    3,
    true,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT18-016: Pregnancy After Loss: Navigating Fear, Hope, and Complicated Emotions
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Pregnancy After Loss: Navigating Fear, Hope, and Complicated Emotions',
    'pregnancy-after-loss-navigating-fear-hope-and-complicated-emotions',
    'draft',
    'Women''s Mental Health',
    ARRAY['Pregnancy After Loss', 'Grief', 'Anxiety', 'Rainbow Pregnancy'],
    1000,
    'Psychage Editorial Team',
    'self_help',
    'CAT18-016',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the unique psychological challenges of pregnancy after miscarriage, stillbirth, or infant loss, including managing anxiety and honoring both grief and hope.',
    '/images/articles/cat18/cover-016.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT18-017: Perinatal OCD: Intrusive Thoughts and Compulsive Safety Behaviors
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Perinatal OCD: Intrusive Thoughts and Compulsive Safety Behaviors',
    'perinatal-ocd-intrusive-thoughts-and-compulsive-safety-behaviors',
    'draft',
    'Women''s Mental Health',
    ARRAY['Perinatal OCD', 'Intrusive Thoughts', 'Postpartum OCD', 'Compulsions'],
    1000,
    'Psychage Editorial Team',
    'self_help',
    'CAT18-017',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand perinatal obsessive-compulsive disorder, distinguish it from normal worry, and learn about exposure-based treatments that reduce obsessions and compulsions.',
    '/images/articles/cat18/cover-017.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT18-018: Tokophobia: Understanding and Treating Fear of Childbirth
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Tokophobia: Understanding and Treating Fear of Childbirth',
    'tokophobia-understanding-and-treating-fear-of-childbirth',
    'draft',
    'Women''s Mental Health',
    ARRAY['Tokophobia', 'Birth Fear', 'Childbirth', 'Maternal Request Cesarean'],
    1027,
    'Psychage Editorial Team',
    'self_help',
    'CAT18-018',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore tokophobia (pathological fear of childbirth), distinguish it from normal birth anxiety, and learn about therapeutic interventions that reduce fear and support birth decision-making.',
    '/images/articles/cat18/cover-018.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT18-019: Postpartum Rage: Understanding Anger and Irritability After Birth
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Postpartum Rage: Understanding Anger and Irritability After Birth',
    'postpartum-rage-understanding-anger-and-irritability-after-birth',
    'draft',
    'Women''s Mental Health',
    ARRAY['Postpartum Rage', 'Anger', 'Irritability', 'Postpartum Mood'],
    1004,
    'Psychage Editorial Team',
    'self_help',
    'CAT18-019',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore postpartum rage as a symptom of perinatal mood disorders, understand its triggers, and learn strategies for managing intense anger while protecting relationships.',
    '/images/articles/cat18/cover-019.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT18-020: Partner Perinatal Mental Health: Supporting Non-Birthing Parents
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Partner Perinatal Mental Health: Supporting Non-Birthing Parents',
    'partner-perinatal-mental-health-supporting-non-birthing-parents',
    'draft',
    'Women''s Mental Health',
    ARRAY['Partner Mental Health', 'Paternal Depression', 'Non-Birthing Parent', 'Couples'],
    1011,
    'Psychage Editorial Team',
    'self_help',
    'CAT18-020',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand mental health challenges facing partners during pregnancy and postpartum, including paternal/partner depression, anxiety, and the unique barriers to seeking support.',
    '/images/articles/cat18/cover-020.svg',
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

  -- === CAT18-011 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT18-011';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Prevalence of perinatal depression', '2022', 'https://doi.org/10.1001/jamapsychiatry.2022.0291', 'JAMA Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Untreated depression in pregnancy: maternal and fetal outcomes', '2023', 'https://doi.org/10.1097/AOG.0000000000005123', 'Obstetrics & Gynecology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Antidepressant safety in pregnancy: updated evidence', '2023', 'https://doi.org/10.1176/appi.ajp.20220456', 'American Journal of Psychiatry', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT18-012 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT18-012';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Postpartum depression prevalence and risk factors', '2022', 'https://doi.org/10.1001/jamapsychiatry.2021.4126', 'JAMA Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Baby blues versus postpartum depression', '2023', 'https://doi.org/10.1016/j.jad.2022.11.067', 'Journal of Affective Disorders', 2),
      (v_art_id, 'peer_reviewed', 1, 'Antidepressant use during breastfeeding', '2023', 'https://doi.org/10.1176/appi.ajp.20220567', 'American Journal of Psychiatry', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT18-013 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT18-013';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Prevalence of perinatal anxiety disorders', '2022', 'https://doi.org/10.1016/j.genhosppsych.2022.03.008', 'General Hospital Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Clinical features of perinatal anxiety', '2023', 'https://doi.org/10.1016/j.jad.2023.01.089', 'Journal of Affective Disorders', 2),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive-behavioral therapy for perinatal anxiety', '2023', 'https://doi.org/10.1016/j.brat.2023.104234', 'Behaviour Research and Therapy', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT18-014 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT18-014';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Prevalence of birth trauma and postpartum PTSD', '2022', 'https://doi.org/10.1016/j.jad.2022.08.012', 'Journal of Affective Disorders', 1),
      (v_art_id, 'peer_reviewed', 1, 'Subjective birth experience and trauma', '2023', 'https://doi.org/10.1111/birt.12723', 'Birth: Issues in Perinatal Care', 2),
      (v_art_id, 'peer_reviewed', 1, 'Treatment of postpartum PTSD', '2023', 'https://doi.org/10.1007/s00737-023-01298-4', 'Archives of Women''s Mental Health', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT18-015 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT18-015';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Epidemiology and risk factors for postpartum psychosis', '2022', 'https://doi.org/10.1016/S2215-0366(22)00068-2', 'The Lancet Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Clinical features and onset of postpartum psychosis', '2023', 'https://doi.org/10.1176/appi.ajp.20220678', 'American Journal of Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Treatment and outcomes of postpartum psychosis', '2023', 'https://doi.org/10.1007/s00737-023-01345-0', 'Archives of Women''s Mental Health', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT18-016 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT18-016';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Mental health in pregnancy after perinatal loss', '2022', 'https://doi.org/10.1097/AOG.0000000000004892', 'Obstetrics & Gynecology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Psychological aspects of pregnancy following loss', '2023', 'https://doi.org/10.1515/jpm-2022-0456', 'Journal of Perinatal Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'Trauma-informed care in pregnancy after loss', '2023', 'https://doi.org/10.1111/birt.12678', 'Birth: Issues in Perinatal Care', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT18-017 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT18-017';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Prevalence of perinatal OCD', '2022', 'https://doi.org/10.4088/JCP.21r14256', 'Journal of Clinical Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Clinical features of perinatal obsessive-compulsive disorder', '2023', 'https://doi.org/10.1007/s00737-022-01289-6', 'Archives of Women''s Mental Health', 2),
      (v_art_id, 'peer_reviewed', 1, 'Treatment of perinatal OCD with ERP', '2023', 'https://doi.org/10.1016/j.brat.2022.104223', 'Behaviour Research and Therapy', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT18-018 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT18-018';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Prevalence and impact of tokophobia', '2022', 'https://doi.org/10.1111/1471-0528.17209', 'BJOG: An International Journal of Obstetrics & Gynaecology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Primary and secondary tokophobia: clinical features', '2023', 'https://doi.org/10.1007/s00737-022-01312-w', 'Archives of Women''s Mental Health', 2),
      (v_art_id, 'peer_reviewed', 1, 'Psychotherapeutic interventions for tokophobia', '2023', 'https://doi.org/10.1111/aogs.14478', 'Acta Obstetricia et Gynecologica Scandinavica', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT18-019 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT18-019';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Prevalence of postpartum anger and irritability', '2022', 'https://doi.org/10.1080/02646838.2022.2034783', 'Journal of Reproductive and Infant Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Postpartum rage as symptom of mood and anxiety disorders', '2023', 'https://doi.org/10.1007/s00737-023-01289-5', 'Archives of Women''s Mental Health', 2),
      (v_art_id, 'peer_reviewed', 1, 'Biological and psychosocial contributors to postpartum rage', '2023', 'https://doi.org/10.3389/fpsyt.2023.1045678', 'Frontiers in Psychiatry', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT18-020 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT18-020';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Paternal postpartum depression: prevalence and risk factors', '2022', 'https://doi.org/10.1001/jamapsychiatry.2021.4193', 'JAMA Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Couples'' concordance of perinatal mental health', '2023', 'https://doi.org/10.1016/j.jad.2022.12.089', 'Journal of Affective Disorders', 2),
      (v_art_id, 'peer_reviewed', 1, 'Barriers to mental health care for non-birthing partners', '2023', 'https://doi.org/10.1037/men0000423', 'Psychology of Men & Masculinities', 3)
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
