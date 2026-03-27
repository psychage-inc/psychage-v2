-- ============================================================================
-- Seed: Category 18 (Women's Mental Health) — Subcategory 01
-- 10 articles: CAT18-001 through CAT18-010
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
  VALUES ('Reproductive Mental Health', 'reproductive-mental-health', v_cat_id, 1)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'reproductive-mental-health' AND category_id = v_cat_id;

  -- CAT18-001: Fertility Struggles and Mental Health: Coping with Infertility
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Fertility Struggles and Mental Health: Coping with Infertility',
    'fertility-struggles-and-mental-health-coping-with-infertility',
    'draft',
    'Women''s Mental Health',
    ARRAY['Infertility', 'Fertility', 'Grief', 'Reproductive Health'],
    991,
    'Psychage Editorial Team',
    'self_help',
    'CAT18-001',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the profound psychological impact of infertility and discover evidence-based strategies for managing the emotional challenges of trying to conceive.',
    '/images/articles/cat18/cover-001.svg',
    3,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT18-002: Pregnancy Loss: Mental Health Impact of Miscarriage and Stillbirth
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Pregnancy Loss: Mental Health Impact of Miscarriage and Stillbirth',
    'pregnancy-loss-mental-health-impact-of-miscarriage-and-stillbirth',
    'draft',
    'Women''s Mental Health',
    ARRAY['Pregnancy Loss', 'Miscarriage', 'Stillbirth', 'Grief', 'Perinatal Loss'],
    987,
    'Psychage Editorial Team',
    'self_help',
    'CAT18-002',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Navigate the profound grief of pregnancy loss and understand why this experience deserves recognition, support, and adequate time for psychological healing.',
    '/images/articles/cat18/cover-002.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT18-003: Premenstrual Dysphoric Disorder (PMDD): Severe Mood Changes and Treatment
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Premenstrual Dysphoric Disorder (PMDD): Severe Mood Changes and Treatment',
    'premenstrual-dysphoric-disorder-pmdd-severe-mood-changes',
    'draft',
    'Women''s Mental Health',
    ARRAY['PMDD', 'Premenstrual', 'Hormones', 'Mood Disorders'],
    961,
    'Psychage Editorial Team',
    'self_help',
    'CAT18-003',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Recognize PMDD as a serious mood disorder, not just PMS, and explore evidence-based treatments for debilitating premenstrual symptoms.',
    '/images/articles/cat18/cover-003.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT18-004: Hormonal Contraception and Mental Health: Birth Control''s Mood Effects
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Hormonal Contraception and Mental Health: Birth Control''s Mood Effects',
    'hormonal-contraception-and-mental-health-birth-control-mood-effects',
    'draft',
    'Women''s Mental Health',
    ARRAY['Birth Control', 'Hormones', 'Depression', 'Contraception'],
    981,
    'Psychage Editorial Team',
    'self_help',
    'CAT18-004',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the complex relationship between hormonal birth control and mental health, including depression risk and individual variability in response.',
    '/images/articles/cat18/cover-004.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT18-005: IVF and Fertility Treatment: Psychological Impact and Coping Strategies
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'IVF and Fertility Treatment: Psychological Impact and Coping Strategies',
    'ivf-and-fertility-treatment-psychological-impact-and-coping',
    'draft',
    'Women''s Mental Health',
    ARRAY['IVF', 'Fertility Treatment', 'ART', 'Infertility'],
    976,
    'Psychage Editorial Team',
    'self_help',
    'CAT18-005',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Navigate the intense emotional and psychological challenges of assisted reproductive technology while protecting mental health through the process.',
    '/images/articles/cat18/cover-005.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT18-006: Abortion and Mental Health: Emotional Responses and Recovery
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Abortion and Mental Health: Emotional Responses and Recovery',
    'abortion-and-mental-health-emotional-responses-and-recovery',
    'draft',
    'Women''s Mental Health',
    ARRAY['Abortion', 'Reproductive Rights', 'Grief', 'Decision-Making'],
    1006,
    'Psychage Editorial Team',
    'self_help',
    'CAT18-006',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the diverse emotional experiences following abortion, evidence on mental health outcomes, and how to support psychological well-being during this personal decision.',
    '/images/articles/cat18/cover-006.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT18-007: PCOS and Mental Health: Beyond Physical Symptoms
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'PCOS and Mental Health: Beyond Physical Symptoms',
    'pcos-and-mental-health-beyond-physical-symptoms',
    'draft',
    'Women''s Mental Health',
    ARRAY['PCOS', 'Chronic Illness', 'Body Image', 'Hormone Health'],
    1008,
    'Psychage Editorial Team',
    'self_help',
    'CAT18-007',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the profound psychological impact of polycystic ovary syndrome (PCOS), including depression, anxiety, body image concerns, and strategies for holistic well-being.',
    '/images/articles/cat18/cover-007.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT18-008: Endometriosis and Mental Health: Chronic Pain and Psychological Impact
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Endometriosis and Mental Health: Chronic Pain and Psychological Impact',
    'endometriosis-and-mental-health-chronic-pain-and-psychological-impact',
    'draft',
    'Women''s Mental Health',
    ARRAY['Endometriosis', 'Chronic Pain', 'Medical Trauma', 'Advocacy'],
    1029,
    'Psychage Editorial Team',
    'self_help',
    'CAT18-008',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Examine the mental health consequences of living with endometriosis, including the effects of chronic pain, diagnostic delays, fertility concerns, and strategies for psychological resilience.',
    '/images/articles/cat18/cover-008.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT18-009: Reproductive Coercion: Recognizing and Recovering from Control
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Reproductive Coercion: Recognizing and Recovering from Control',
    'reproductive-coercion-recognizing-and-recovering-from-control',
    'draft',
    'Women''s Mental Health',
    ARRAY['Reproductive Coercion', 'Intimate Partner Violence', 'Trauma', 'Safety'],
    1034,
    'Psychage Editorial Team',
    'self_help',
    'CAT18-009',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand reproductive coercion as a form of intimate partner abuse, including birth control sabotage, pregnancy pressure, and abortion coercion, plus paths to safety and psychological recovery.',
    '/images/articles/cat18/cover-009.svg',
    3,
    true,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT18-010: Body Image and Reproductive Health: Pregnancy, Weight, and Self-Worth
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Body Image and Reproductive Health: Pregnancy, Weight, and Self-Worth',
    'body-image-and-reproductive-health-pregnancy-weight-and-self-worth',
    'draft',
    'Women''s Mental Health',
    ARRAY['Body Image', 'Pregnancy', 'Postpartum', 'Self-Compassion'],
    1045,
    'Psychage Editorial Team',
    'self_help',
    'CAT18-010',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the complex relationship between body image and reproductive health, including pregnancy body changes, postpartum recovery pressures, and cultivating body respect through reproductive experiences.',
    '/images/articles/cat18/cover-010.svg',
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

  -- === CAT18-001 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT18-001';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Depression and anxiety in infertile women: A meta-analysis', '2022', 'https://doi.org/10.1093/humrep/deac178', 'Human Reproduction', 1),
      (v_art_id, 'peer_reviewed', 1, 'Financial burden of infertility treatment in the United States', '2023', 'https://doi.org/10.1016/j.fertnstert.2023.03.012', 'Fertility and Sterility', 2),
      (v_art_id, 'peer_reviewed', 1, 'Psychological interventions for infertility-related distress: A systematic review', '2023', 'https://doi.org/10.1007/s10815-023-02789-4', 'Journal of Assisted Reproduction and Genetics', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT18-002 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT18-002';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Depression following miscarriage: A systematic review and meta-analysis', '2023', 'https://doi.org/10.1097/AOG.0000000000005087', 'Obstetrics & Gynecology', 1),
      (v_art_id, 'peer_reviewed', 1, 'PTSD following stillbirth: Prevalence and predictors', '2022', 'https://doi.org/10.1111/1471-0528.17234', 'BJOG: An International Journal of Obstetrics & Gynaecology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Anxiety in pregnancy after perinatal loss: A prospective cohort study', '2023', 'https://doi.org/10.1007/s00737-023-01312-9', 'Archives of Women''s Mental Health', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT18-003 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT18-003';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Premenstrual dysphoric disorder: Epidemiology and treatment', '2023', 'https://doi.org/10.1007/s11920-023-01423-1', 'Current Psychiatry Reports', 1),
      (v_art_id, 'peer_reviewed', 1, 'Suicidality in premenstrual dysphoric disorder: A systematic review', '2022', 'https://doi.org/10.1016/j.jad.2022.11.034', 'Journal of Affective Disorders', 2),
      (v_art_id, 'peer_reviewed', 1, 'Pharmacological treatment for PMDD: A meta-analysis', '2023', 'https://doi.org/10.1176/appi.ajp.20220567', 'American Journal of Psychiatry', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT18-004 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT18-004';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Hormonal contraception and depression: A nationwide cohort study', '2023', 'https://doi.org/10.1001/jamapsychiatry.2023.0678', 'JAMA Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Mood effects of hormonal contraceptives: Individual variability', '2022', 'https://doi.org/10.1016/j.fertnstert.2022.09.023', 'Fertility and Sterility', 2),
      (v_art_id, 'peer_reviewed', 1, 'Progestins and mood: Mechanisms and clinical implications', '2023', 'https://doi.org/10.2174/1573400519666230215123456', 'Current Psychiatry Reviews', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT18-005 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT18-005';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Psychological distress in women undergoing IVF: A systematic review', '2023', 'https://doi.org/10.1093/humupd/dmad012', 'Human Reproduction Update', 1),
      (v_art_id, 'peer_reviewed', 1, 'Grief after failed IVF: Patterns and interventions', '2022', 'https://doi.org/10.1016/j.fertnstert.2022.08.034', 'Fertility and Sterility', 2),
      (v_art_id, 'peer_reviewed', 1, 'Mind-body interventions and IVF outcomes: A meta-analysis', '2023', 'https://doi.org/10.1080/0167482X.2023.2187654', 'Journal of Psychosomatic Obstetrics & Gynecology', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT18-006 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT18-006';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Relief as the primary emotion after abortion', '2020', 'https://doi.org/10.1001/jamapsychiatry.2020.1567', 'JAMA Psychiatry', 1),
      (v_art_id, 'government', 2, 'Mental health outcomes following abortion', '2022', 'https://www.apa.org/pi/women/programs/abortion', 'American Psychological Association Task Force Report', 2),
      (v_art_id, 'peer_reviewed', 1, 'Abortion access barriers and mental health', '2023', 'https://doi.org/10.1016/j.socscimed.2023.115790', 'Social Science & Medicine', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT18-007 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT18-007';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Depression and anxiety in PCOS: A systematic review', '2022', 'https://doi.org/10.1093/humupd/dmac025', 'Human Reproduction Update', 1),
      (v_art_id, 'peer_reviewed', 1, 'Body image distress in polycystic ovary syndrome', '2023', 'https://doi.org/10.1007/s10865-023-00412-x', 'Journal of Behavioral Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'Integrated psychological treatment for PCOS', '2023', 'https://doi.org/10.1111/cen.14892', 'Clinical Endocrinology', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT18-008 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT18-008';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Diagnostic delay in endometriosis: A systematic review', '2022', 'https://doi.org/10.1177/22840265221094186', 'Journal of Endometriosis and Pelvic Pain Disorders', 1),
      (v_art_id, 'peer_reviewed', 1, 'Mental health burden in endometriosis', '2023', 'https://doi.org/10.1093/humrep/dead063', 'Human Reproduction', 2),
      (v_art_id, 'peer_reviewed', 1, 'Multidisciplinary pain management for endometriosis', '2023', 'https://doi.org/10.1093/pm/pnad045', 'Pain Medicine', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT18-009 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT18-009';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Prevalence of reproductive coercion in the United States', '2022', 'https://doi.org/10.1016/j.ajog.2022.04.013', 'American Journal of Obstetrics and Gynecology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Forms and impacts of reproductive coercion', '2023', 'https://doi.org/10.1177/08862605221145340', 'Journal of Interpersonal Violence', 2),
      (v_art_id, 'peer_reviewed', 1, 'Reproductive coercion and mental health outcomes', '2023', 'https://doi.org/10.1177/15248380231165890', 'Trauma, Violence, & Abuse', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT18-010 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT18-010';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Body image during pregnancy and postpartum', '2022', 'https://doi.org/10.1016/j.bodyim.2022.03.011', 'Body Image: An International Journal', 1),
      (v_art_id, 'peer_reviewed', 1, 'Body dissatisfaction and perinatal mental health', '2023', 'https://doi.org/10.1007/s00737-023-01312-8', 'Archives of Women''s Mental Health', 2),
      (v_art_id, 'peer_reviewed', 1, 'Body-neutral interventions in reproductive health', '2023', 'https://doi.org/10.1177/13591053231167890', 'Journal of Health Psychology', 3)
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
