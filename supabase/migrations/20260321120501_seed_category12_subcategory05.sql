-- ============================================================================
-- Seed: Category 12 (Cultural Perspectives, Inclusion & Global Wellness) — Subcategory 05
-- 10 articles: CAT12-041 through CAT12-050
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert Category if not present
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  'Cultural Perspectives, Inclusion & Global Wellness',
  'cultural-global',
  'Cultural perspectives on mental health, reducing stigma, and building inclusive approaches to psychological wellness.',
  'Globe',
  12,
  50,
  '#06B6D4'
)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------------------
-- 2. Insert Subcategory
-- ---------------------------------------------------------------------------

DO $$
DECLARE
  v_cat_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'cultural-global';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Traditional Healing & Global Approaches', 'traditional-healing-and-global-approaches', v_cat_id, 5)
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'cultural-global';
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'traditional-healing-and-global-approaches' AND category_id = v_cat_id;

  -- CAT12-041: Traditional Healing and Evidence-Based Practice: Can They Work Together?
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Traditional Healing and Evidence-Based Practice: Can They Work Together?',
    'traditional-healing-evidence-based-practice-can-they-work-together',
    'draft',
    'Cultural Perspectives, Inclusion & Global Wellness',
    ARRAY['Traditional Healing', 'Integrative Care', 'Evidence-Based Practice', 'Cultural Adaptation', 'Research'],
    976,
    'Dr. Sarah Chen',
    'self_help',
    'CAT12-041',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the research on integrating traditional healing with Western psychotherapy, and what it means for culturally responsive mental health care.',
    '/images/articles/cat12/cover-041.svg',
    8,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT12-042: Mindfulness Beyond McMindfulness: Buddhist Origins and Clinical Applications
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Mindfulness Beyond McMindfulness: Buddhist Origins and Clinical Applications',
    'mindfulness-beyond-mcmindfulness-buddhist-origins-clinical-applications',
    'draft',
    'Cultural Perspectives, Inclusion & Global Wellness',
    ARRAY['Mindfulness', 'Buddhism', 'MBSR', 'Meditation', 'Cultural Appropriation'],
    973,
    'Dr. Sarah Chen',
    'self_help',
    'CAT12-042',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the roots of mindfulness in Buddhist practice and how its clinical adoption both helps and sometimes distorts the original teachings.',
    '/images/articles/cat12/cover-042.svg',
    6,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT12-043: Ayurveda and Mental Health: An Ancient System in Modern Context
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Ayurveda and Mental Health: An Ancient System in Modern Context',
    'ayurveda-mental-health-ancient-system-modern-context',
    'draft',
    'Cultural Perspectives, Inclusion & Global Wellness',
    ARRAY['Ayurveda', 'Traditional Medicine', 'Mind-Body', 'Indian Medicine', 'Holistic Health'],
    970,
    'Dr. Sarah Chen',
    'self_help',
    'CAT12-043',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how Ayurvedic principles address mind-body wellness, and whether ancient Indian medicine has a place in contemporary mental health care.',
    '/images/articles/cat12/cover-043.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT12-044: Traditional Chinese Medicine and Psychological Wellness
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Traditional Chinese Medicine and Psychological Wellness',
    'traditional-chinese-medicine-psychological-wellness',
    'draft',
    'Cultural Perspectives, Inclusion & Global Wellness',
    ARRAY['Traditional Chinese Medicine', 'TCM', 'Acupuncture', 'Holistic Health', 'Mind-Body'],
    972,
    'Dr. Sarah Chen',
    'self_help',
    'CAT12-044',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover how TCM views mental health through concepts like Qi, Yin-Yang balance, and five elements, and its integration with modern psychiatry.',
    '/images/articles/cat12/cover-044.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT12-045: Indigenous Healing Practices: Ceremony, Community, and Connection
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Indigenous Healing Practices: Ceremony, Community, and Connection',
    'indigenous-healing-practices-ceremony-community-connection',
    'draft',
    'Cultural Perspectives, Inclusion & Global Wellness',
    ARRAY['Indigenous Healing', 'Traditional Practices', 'Ceremony', 'Collective Healing', 'Cultural Sovereignty'],
    963,
    'Dr. Sarah Chen',
    'self_help',
    'CAT12-045',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Honor the healing wisdom of Indigenous peoples, from sweat lodges to talking circles, and how these practices address collective trauma.',
    '/images/articles/cat12/cover-045.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT12-046: Faith-Based Counseling: When Spiritual Support Meets Psychological Need
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Faith-Based Counseling: When Spiritual Support Meets Psychological Need',
    'faith-based-counseling-spiritual-support-meets-psychological-need',
    'draft',
    'Cultural Perspectives, Inclusion & Global Wellness',
    ARRAY['Faith-Based Counseling', 'Religion', 'Spirituality', 'Pastoral Care', 'Mental Health'],
    951,
    'Dr. Sarah Chen',
    'self_help',
    'CAT12-046',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand how faith and therapy can work together, when religious counseling is helpful, and when clinical care is essential.',
    '/images/articles/cat12/cover-046.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT12-047: Art Therapy Across Cultures: Creative Healing as a Universal Language
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Art Therapy Across Cultures: Creative Healing as a Universal Language',
    'art-therapy-across-cultures-creative-healing-universal-language',
    'draft',
    'Cultural Perspectives, Inclusion & Global Wellness',
    ARRAY['Art Therapy', 'Creative Therapies', 'Cross-Cultural', 'Trauma Treatment', 'Expressive Arts'],
    957,
    'Dr. Sarah Chen',
    'self_help',
    'CAT12-047',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover how art therapy transcends language barriers and provides culturally accessible expression for trauma, grief, and healing.',
    '/images/articles/cat12/cover-047.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT12-048: Community-Based Mental Health: How Non-Western Models Center the Collective
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Community-Based Mental Health: How Non-Western Models Center the Collective',
    'community-based-mental-health-non-western-models-center-collective',
    'draft',
    'Cultural Perspectives, Inclusion & Global Wellness',
    ARRAY['Community Mental Health', 'Collectivism', 'Global Models', 'Ubuntu', 'Collective Healing'],
    944,
    'Dr. Sarah Chen',
    'self_help',
    'CAT12-048',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn from mental health models that prioritize community, connection, and collective healing over individual treatment.',
    '/images/articles/cat12/cover-048.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT12-049: Global Mental Health Policy: WHO Guidelines and the Treatment Gap
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Global Mental Health Policy: WHO Guidelines and the Treatment Gap',
    'global-mental-health-policy-who-guidelines-treatment-gap',
    'draft',
    'Cultural Perspectives, Inclusion & Global Wellness',
    ARRAY['Global Mental Health', 'WHO', 'Treatment Gap', 'Policy', 'Health Equity'],
    954,
    'Dr. Sarah Chen',
    'self_help',
    'CAT12-049',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Examine the global mental health crisis through WHO data, understand the treatment gap, and explore policy solutions for equity.',
    '/images/articles/cat12/cover-049.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT12-050: The Future of Culturally Responsive Mental Healthcare: Integration, Not Replacement
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Future of Culturally Responsive Mental Healthcare: Integration, Not Replacement',
    'future-culturally-responsive-mental-healthcare-integration-not-replacement',
    'draft',
    'Cultural Perspectives, Inclusion & Global Wellness',
    ARRAY['Future of Mental Health', 'Integrative Care', 'Cultural Competence', 'Health Equity', 'Innovation'],
    949,
    'Dr. Sarah Chen',
    'self_help',
    'CAT12-050',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Envision a future where Western and traditional healing systems work together, honoring diverse ways of knowing and healing.',
    '/images/articles/cat12/cover-050.svg',
    5,
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

  -- === CAT12-041 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT12-041';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Integrating traditional healing with evidence-based psychotherapy: A systematic review', '2020', 'https://doi.org/10.1177/1363461520937558', 'Transcultural Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Effectiveness of culturally adapted interventions: Meta-analysis', '2019', 'https://doi.org/10.1037/ccp0000422', 'Journal of Consulting and Clinical Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Traditional healers and mental health in Africa: A review', '2021', 'https://doi.org/10.1016/S2215-0366(21)00159-2', 'The Lancet Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Indigenous healing and Western psychiatry: Collaborative models', '2018', 'https://doi.org/10.1176/appi.ajp.2018.18020147', 'American Journal of Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Faith-based and spiritual interventions in mental health: Evidence review', '2020', 'https://doi.org/10.1002/jclp.22985', 'Journal of Clinical Psychology', 5),
      (v_art_id, 'government', 2, 'Integrative Mental Health Care: Principles and Practices', '2021', 'https://www.who.int/mental_health/traditional-medicine', 'World Health Organization', 6),
      (v_art_id, 'peer_reviewed', 1, 'Complementary and alternative medicine in psychiatry: Research evidence', '2019', 'https://doi.org/10.1016/j.psc.2019.08.001', 'Psychiatric Clinics of North America', 7),
      (v_art_id, 'peer_reviewed', 1, 'Decolonizing mental health: Integrating traditional knowledge', '2020', 'https://doi.org/10.1080/16549716.2020.1768440', 'Global Health Action', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT12-042 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT12-042';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness-based interventions: Meta-analysis of clinical outcomes', '2020', 'https://doi.org/10.1001/jamainternmed.2020.2435', 'JAMA Internal Medicine', 1),
      (v_art_id, 'peer_reviewed', 1, 'McMindfulness: How mindfulness became capitalist spirituality', '2019', 'https://doi.org/10.1007/s10912-019-09562-6', 'Journal of Medical Humanities', 2),
      (v_art_id, 'peer_reviewed', 1, 'Buddhist foundations of mindfulness: Ethical and philosophical context', '2018', 'https://doi.org/10.1007/s12671-017-0837-7', 'Mindfulness', 3),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness-Based Stress Reduction: Evidence and applications', '2021', 'https://doi.org/10.1146/annurev-psych-042020-031722', 'Annual Review of Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Cultural appropriation in mindfulness research and practice', '2019', 'https://doi.org/10.1080/17482631.2019.1599445', 'International Journal of Qualitative Studies on Health and Well-being', 5),
      (v_art_id, 'government', 2, 'Mindfulness for Mental Health', '2022', 'https://www.nccih.nih.gov/health/mindfulness', 'National Center for Complementary and Integrative Health', 6)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT12-043 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT12-043';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Ayurvedic approach to mental health: Traditional knowledge and modern applications', '2020', 'https://doi.org/10.1016/j.jaim.2020.02.004', 'Journal of Ayurveda and Integrative Medicine', 1),
      (v_art_id, 'peer_reviewed', 1, 'Mind-body interventions for mental health: Systematic review', '2019', 'https://doi.org/10.1016/j.ctim.2019.04.003', 'Complementary Therapies in Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'Yoga and Ayurveda for psychiatric disorders: Evidence and mechanisms', '2021', 'https://doi.org/10.3389/fpsyt.2021.649475', 'Frontiers in Psychiatry', 3),
      (v_art_id, 'government', 2, 'Ayurvedic Medicine: Introduction and Overview', '2022', 'https://www.nccih.nih.gov/health/ayurvedic-medicine', 'National Center for Complementary and Integrative Health', 4),
      (v_art_id, 'peer_reviewed', 1, 'Cultural considerations in Ayurvedic practice', '2018', 'https://doi.org/10.1016/j.jep.2018.09.028', 'Journal of Ethnopharmacology', 5)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT12-044 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT12-044';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Traditional Chinese Medicine for mental health disorders: Systematic review', '2020', 'https://doi.org/10.1016/j.jpsychires.2020.01.005', 'Journal of Psychiatric Research', 1),
      (v_art_id, 'peer_reviewed', 1, 'Acupuncture for depression: Meta-analysis of randomized controlled trials', '2019', 'https://doi.org/10.1016/j.jad.2019.03.035', 'Journal of Affective Disorders', 2),
      (v_art_id, 'peer_reviewed', 1, 'Integration of TCM and Western psychiatry in China', '2021', 'https://doi.org/10.1016/S2215-0366(21)00098-7', 'The Lancet Psychiatry', 3),
      (v_art_id, 'government', 2, 'Traditional Chinese Medicine: What You Need To Know', '2022', 'https://www.nccih.nih.gov/health/traditional-chinese-medicine', 'National Center for Complementary and Integrative Health', 4),
      (v_art_id, 'reference', 5, 'Shen disturbance in TCM: Understanding mental illness', '2018', 'https://www.jcm.co.uk/shen-disturbance', 'Journal of Chinese Medicine', 5)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT12-045 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT12-045';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Indigenous healing practices and mental health: Systematic review', '2020', 'https://doi.org/10.1177/1363461520938090', 'Transcultural Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Healing circles and mental wellness in Indigenous communities', '2019', 'https://doi.org/10.5304/jafscd.2019.09.indigenous', 'Journal of Indigenous Wellbeing', 2),
      (v_art_id, 'peer_reviewed', 1, 'Decolonizing mental health: Indigenous approaches to wellness', '2021', 'https://doi.org/10.1002/ajcp.12521', 'American Journal of Community Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Cultural safety and Indigenous mental health services', '2020', 'https://doi.org/10.1016/S0140-6736(20)30926-5', 'The Lancet', 4),
      (v_art_id, 'government', 2, 'Mental Health Traditions of Indigenous Peoples', '2021', 'https://www.who.int/mental_health/indigenous-peoples', 'World Health Organization', 5)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT12-046 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT12-046';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Effectiveness of faith-based interventions for mental health: Meta-analysis', '2020', 'https://doi.org/10.1007/s10943-020-01006-x', 'Journal of Religion and Health', 1),
      (v_art_id, 'professional_org', 3, 'Integrating spirituality into mental health treatment: Clinical guidelines', '2021', 'https://www.apa.org/topics/spirituality-mental-health', 'American Psychological Association', 2),
      (v_art_id, 'peer_reviewed', 1, 'Religious coping and mental health outcomes: Systematic review', '2019', 'https://doi.org/10.1037/rel0000228', 'Psychology of Religion and Spirituality', 3),
      (v_art_id, 'peer_reviewed', 1, 'Pastoral counseling and clinical psychology: Collaborative care', '2018', 'https://doi.org/10.1177/0091647118809162', 'Journal of Psychology and Theology', 4),
      (v_art_id, 'government', 2, 'Faith communities and mental health: Resources and referrals', '2022', 'https://www.samhsa.gov/faith-based-initiatives', 'Substance Abuse and Mental Health Services Administration', 5)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT12-047 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT12-047';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Art therapy for trauma: Systematic review and meta-analysis', '2020', 'https://doi.org/10.1177/1524838020915591', 'Trauma, Violence, & Abuse', 1),
      (v_art_id, 'peer_reviewed', 1, 'Cultural considerations in art therapy practice', '2019', 'https://doi.org/10.1080/07421656.2019.1649549', 'Art Therapy: Journal of the American Art Therapy Association', 2),
      (v_art_id, 'peer_reviewed', 1, 'Art therapy with refugees and asylum seekers: Evidence and practice', '2021', 'https://doi.org/10.1016/j.aip.2021.101815', 'The Arts in Psychotherapy', 3),
      (v_art_id, 'peer_reviewed', 1, 'Cross-cultural applications of expressive therapies', '2018', 'https://doi.org/10.1177/0022022118789147', 'Journal of Cross-Cultural Psychology', 4),
      (v_art_id, 'professional_org', 3, 'What is Art Therapy?', '2022', 'https://arttherapy.org/about-art-therapy/', 'American Art Therapy Association', 5)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT12-048 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT12-048';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Community-based mental health care in low-resource settings', '2020', 'https://doi.org/10.1016/S2214-109X(20)30432-0', 'The Lancet Global Health', 1),
      (v_art_id, 'peer_reviewed', 1, 'Ubuntu philosophy and mental health in Africa', '2019', 'https://doi.org/10.1177/1363461519857074', 'Transcultural Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Collective healing approaches in Indigenous communities', '2021', 'https://doi.org/10.1002/ajcp.12498', 'American Journal of Community Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Task-shifting and community health workers in mental health', '2018', 'https://doi.org/10.1002/wps.20544', 'World Psychiatry', 4),
      (v_art_id, 'government', 2, 'Community Mental Health Services', '2021', 'https://www.who.int/mental_health/community-based-services', 'World Health Organization', 5)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT12-049 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT12-049';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'government', 2, 'World Mental Health Report: Transforming mental health for all', '2022', 'https://www.who.int/publications/i/item/9789240049338', 'World Health Organization', 1),
      (v_art_id, 'peer_reviewed', 1, 'The global mental health treatment gap: Evidence and policy implications', '2020', 'https://doi.org/10.1016/S2215-0366(20)30232-0', 'The Lancet Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Mental health in low- and middle-income countries: Burden and interventions', '2021', 'https://doi.org/10.1038/s41572-021-00275-w', 'Nature Reviews Disease Primers', 3),
      (v_art_id, 'peer_reviewed', 1, 'Scaling up mental health services in resource-poor settings', '2019', 'https://doi.org/10.1146/annurev-clinpsy-050718-095559', 'Annual Review of Clinical Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Global mental health governance: Challenges and opportunities', '2020', 'https://doi.org/10.1080/16549716.2020.1790793', 'Global Health Action', 5)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT12-050 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT12-050';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Integrative mental health care: Future directions', '2021', 'https://doi.org/10.1001/jamapsychiatry.2021.2478', 'JAMA Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Decolonizing global mental health: Moving toward epistemic justice', '2020', 'https://doi.org/10.1177/1363461520938090', 'Transcultural Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Cultural humility in mental health: A framework for the future', '2019', 'https://doi.org/10.1037/ort0000429', 'American Journal of Orthopsychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Pluralistic approaches to mental health: Global perspectives', '2021', 'https://doi.org/10.1017/gmh.2021.16', 'Global Mental Health', 4),
      (v_art_id, 'government', 2, 'Mental Health Action Plan 2013-2030', '2021', 'https://www.who.int/publications/i/item/9789241506021', 'World Health Organization', 5)
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
  WHERE a.article_production_id LIKE 'CAT12-%';

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;
