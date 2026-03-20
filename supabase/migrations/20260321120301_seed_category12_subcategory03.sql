-- ============================================================================
-- Seed: Category 12 (Cultural Perspectives, Inclusion & Global Wellness) — Subcategory 03
-- 10 articles: CAT12-021 through CAT12-030
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
  VALUES ('Race, Ethnicity & Mental Health', 'race-ethnicity-and-mental-health', v_cat_id, 3)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'race-ethnicity-and-mental-health' AND category_id = v_cat_id;

  -- CAT12-021: Racial Trauma: The Psychological Impact of Racism on Mental Health
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Racial Trauma: The Psychological Impact of Racism on Mental Health',
    'racial-trauma-psychological-impact-racism-mental-health',
    'draft',
    'Cultural Perspectives, Inclusion & Global Wellness',
    ARRAY['Racial Trauma', 'Racism', 'PTSD', 'Mental Health Disparities', 'Healing'],
    972,
    'Dr. Sarah Chen',
    'self_help',
    'CAT12-021',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand how experiences of racism cause real psychological harm, from hypervigilance to PTSD symptoms, and how to begin the healing process.',
    '/images/articles/cat12/cover-021.svg',
    8,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT12-022: Mental Health Disparities: Why People of Color Receive Less and Worse Care
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Mental Health Disparities: Why People of Color Receive Less and Worse Care',
    'mental-health-disparities-people-of-color-care-access',
    'draft',
    'Cultural Perspectives, Inclusion & Global Wellness',
    ARRAY['Health Disparities', 'Systemic Racism', 'Access to Care', 'Provider Bias', 'Mental Health Equity'],
    967,
    'Dr. Sarah Chen',
    'self_help',
    'CAT12-022',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the systemic barriers that prevent people of color from accessing quality mental health care, from insurance gaps to provider bias.',
    '/images/articles/cat12/cover-022.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT12-023: Microaggressions and Mental Health: The Cumulative Toll of Everyday Racism
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Microaggressions and Mental Health: The Cumulative Toll of Everyday Racism',
    'microaggressions-mental-health-cumulative-toll-everyday-racism',
    'draft',
    'Cultural Perspectives, Inclusion & Global Wellness',
    ARRAY['Microaggressions', 'Racism', 'Mental Health Impact', 'Workplace Bias', 'Coping Strategies'],
    958,
    'Dr. Sarah Chen',
    'self_help',
    'CAT12-023',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand how "small" daily indignities add up to serious psychological harm, and how to cope when racism shows up in subtle forms.',
    '/images/articles/cat12/cover-023.svg',
    7,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT12-024: Cultural Competence in Therapy: What to Look for in a Provider
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Cultural Competence in Therapy: What to Look for in a Provider',
    'cultural-competence-therapy-what-to-look-for-provider',
    'draft',
    'Cultural Perspectives, Inclusion & Global Wellness',
    ARRAY['Cultural Competence', 'Finding a Therapist', 'Culturally Responsive Care', 'Therapy', 'Provider Selection'],
    990,
    'Dr. Sarah Chen',
    'self_help',
    'CAT12-024',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Find a therapist who truly understands your cultural background and won''t dismiss racism, traditions, or community values as irrelevant to your mental health.',
    '/images/articles/cat12/cover-024.svg',
    7,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT12-025: Black Mental Health: Breaking the Silence in African American Communities
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Black Mental Health: Breaking the Silence in African American Communities',
    'black-mental-health-breaking-silence-african-american-communities',
    'draft',
    'Cultural Perspectives, Inclusion & Global Wellness',
    ARRAY['Black Mental Health', 'African American Mental Health', 'Racial Trauma', 'Therapy', 'Community Healing'],
    980,
    'Dr. Sarah Chen',
    'self_help',
    'CAT12-025',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the unique mental health challenges facing Black Americans, the historical roots of mistrust, and how to find culturally affirming support.',
    '/images/articles/cat12/cover-025.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT12-026: Hispanic and Latino Mental Health: Language Barriers, Immigration, and Cultural Values
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Hispanic and Latino Mental Health: Language Barriers, Immigration, and Cultural Values',
    'hispanic-latino-mental-health-language-barriers-immigration-cultural-values',
    'draft',
    'Cultural Perspectives, Inclusion & Global Wellness',
    ARRAY['Hispanic Mental Health', 'Latino Mental Health', 'Immigration', 'Language Barriers', 'Familismo'],
    985,
    'Dr. Sarah Chen',
    'self_help',
    'CAT12-026',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Navigate the unique mental health challenges facing Hispanic and Latino communities, from language access to immigration stress and cultural expectations.',
    '/images/articles/cat12/cover-026.svg',
    7,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT12-027: Asian American Mental Health: The Model Minority Myth and Its Consequences
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Asian American Mental Health: The Model Minority Myth and Its Consequences',
    'asian-american-mental-health-model-minority-myth-consequences',
    'draft',
    'Cultural Perspectives, Inclusion & Global Wellness',
    ARRAY['Asian American Mental Health', 'Model Minority Myth', 'Mental Health Stigma', 'Cultural Competence', 'AAPI'],
    968,
    'Dr. Sarah Chen',
    'self_help',
    'CAT12-027',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How the model minority stereotype harms Asian American mental health, and why seeking help requires breaking cultural and systemic barriers.',
    '/images/articles/cat12/cover-027.svg',
    7,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT12-028: Mental Health in Multiracial and Multicultural Individuals: Navigating Multiple Identities
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Mental Health in Multiracial and Multicultural Individuals: Navigating Multiple Identities',
    'mental-health-multiracial-multicultural-navigating-multiple-identities',
    'draft',
    'Cultural Perspectives, Inclusion & Global Wellness',
    ARRAY['Multiracial Identity', 'Biracial', 'Multicultural', 'Identity Development', 'Belonging'],
    972,
    'Dr. Sarah Chen',
    'self_help',
    'CAT12-028',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the unique mental health challenges of having multiple racial or cultural identities, from belonging nowhere to integrating complexity.',
    '/images/articles/cat12/cover-028.svg',
    6,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT12-029: Addressing Mental Health in Predominantly White Institutions
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Addressing Mental Health in Predominantly White Institutions',
    'addressing-mental-health-predominantly-white-institutions',
    'draft',
    'Cultural Perspectives, Inclusion & Global Wellness',
    ARRAY['PWI', 'Campus Mental Health', 'Workplace Diversity', 'Racial Stress', 'Belonging'],
    986,
    'Dr. Sarah Chen',
    'self_help',
    'CAT12-029',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Navigate the mental health challenges of being a student or employee of color in predominantly white spaces, and find strategies for survival and thriving.',
    '/images/articles/cat12/cover-029.svg',
    6,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT12-030: Culturally Adapted Therapies: What Makes Treatment Work Across Racial Groups
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Culturally Adapted Therapies: What Makes Treatment Work Across Racial Groups',
    'culturally-adapted-therapies-treatment-work-across-racial-groups',
    'draft',
    'Cultural Perspectives, Inclusion & Global Wellness',
    ARRAY['Culturally Adapted Therapy', 'Evidence-Based Treatment', 'Cultural Competence', 'CBT', 'Treatment Guide'],
    972,
    'Dr. Sarah Chen',
    'self_help',
    'CAT12-030',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how evidence-based therapies can be adapted to honor cultural values, and what to look for in treatment that respects your full identity.',
    '/images/articles/cat12/cover-030.svg',
    8,
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

  -- === CAT12-021 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT12-021';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Racial trauma: Theory, research, and healing: Introduction to the special issue', '2019', 'https://doi.org/10.1037/amp0000442', 'American Psychologist', 1),
      (v_art_id, 'peer_reviewed', 1, 'Race-based traumatic stress: An analysis of the research and theory', '2017', 'https://doi.org/10.1037/ort0000225', 'American Journal of Orthopsychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'The impact of racial discrimination and the role of coping behaviors on PTSD symptoms among Black Americans', '2018', 'https://doi.org/10.1080/10615806.2018.1482723', 'Anxiety, Stress & Coping', 3),
      (v_art_id, 'peer_reviewed', 1, 'Racism and health: Evidence and needed research', '2019', 'https://doi.org/10.1146/annurev-publhealth-040218-043750', 'Annual Review of Public Health', 4),
      (v_art_id, 'professional_org', 3, 'Mental Health Impacts of Racism', '2021', 'https://www.psychiatry.org/newsroom/apa-apology-for-its-support-of-structural-racism', 'American Psychiatric Association', 5),
      (v_art_id, 'peer_reviewed', 1, 'Weathering and age patterns of allostatic load scores among blacks and whites in the United States', '2006', 'https://doi.org/10.2105/AJPH.2004.060749', 'American Journal of Public Health', 6),
      (v_art_id, 'government', 2, 'Understanding and Addressing the Impact of Structural Racism on Health', '2022', 'https://www.cdc.gov/minorityhealth/racism-disparities/index.html', 'Centers for Disease Control and Prevention', 7),
      (v_art_id, 'peer_reviewed', 1, 'Healing from Racial Trauma: A Guide for People of Color', '2020', 'https://doi.org/10.1002/jmcd.12187', 'Journal of Multicultural Counseling and Development', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT12-022 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT12-022';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'government', 2, 'Mental Health Care Disparities Among Racial/Ethnic Minorities', '2021', 'https://www.samhsa.gov/data/report/mental-health-care-disparities', 'Substance Abuse and Mental Health Services Administration', 1),
      (v_art_id, 'peer_reviewed', 1, 'Racial/ethnic differences in mental health service use among adults', '2020', 'https://doi.org/10.1377/hlthaff.2020.00757', 'Health Affairs', 2),
      (v_art_id, 'peer_reviewed', 1, 'Implicit racial bias in healthcare: Clinical practice, research and decision making', '2019', 'https://doi.org/10.7861/futurehosp.6-1-17', 'Future Healthcare Journal', 3),
      (v_art_id, 'government', 2, 'Structural racism and health inequities: Recommendations for health and human services', '2023', 'https://doi.org/10.17226/26593', 'National Academies of Sciences, Engineering, and Medicine', 4),
      (v_art_id, 'professional_org', 3, 'The mental health workforce shortage: Causes, consequences, and solutions', '2022', 'https://www.apa.org/monitor/2022/07/mental-health-workforce-shortage', 'American Psychological Association', 5),
      (v_art_id, 'peer_reviewed', 1, 'Cultural mistrust and mental health service utilization among Black Americans', '2018', 'https://doi.org/10.1002/jcop.22045', 'Journal of Community Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Language barriers and access to mental health services', '2017', 'https://doi.org/10.1176/appi.ps.201600263', 'Psychiatric Services', 7),
      (v_art_id, 'peer_reviewed', 1, 'Insurance coverage and mental health service utilization among racial/ethnic minorities', '2019', 'https://doi.org/10.1001/jamapsychiatry.2019.2857', 'JAMA Psychiatry', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT12-023 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT12-023';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Racial microaggressions in everyday life: Implications for clinical practice', '2007', 'https://doi.org/10.1037/0003-066X.62.4.271', 'American Psychologist', 1),
      (v_art_id, 'peer_reviewed', 1, 'The impact of racial microaggressions on mental health: Counseling implications for clients of color', '2011', 'https://doi.org/10.1002/j.1556-6678.2011.tb00105.x', 'Journal of Counseling & Development', 2),
      (v_art_id, 'peer_reviewed', 1, 'Cumulative trauma from racial microaggressions predicts PTSD symptoms', '2015', 'https://doi.org/10.1037/trm0000045', 'Traumatology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Racial microaggressions and psychological functioning among Black American men', '2017', 'https://doi.org/10.1037/cdp0000138', 'Cultural Diversity and Ethnic Minority Psychology', 4),
      (v_art_id, 'reference', 5, 'Microaggressions in the workplace: What targets and observers can do', '2020', 'https://hbr.org/2020/07/what-to-do-when-you-experience-a-microaggression', 'Harvard Business Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'Gender microaggressions and the mental health of women of color', '2016', 'https://doi.org/10.1177/0361684316654529', 'Psychology of Women Quarterly', 6),
      (v_art_id, 'peer_reviewed', 1, 'Coping with racial microaggressions: Assimilation and confrontation strategies', '2019', 'https://doi.org/10.1037/dhe0000094', 'Journal of Diversity in Higher Education', 7)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT12-024 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT12-024';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'professional_org', 3, 'Multicultural Guidelines: An Ecological Approach to Context, Identity, and Intersectionality', '2017', 'https://www.apa.org/about/policy/multicultural-guidelines', 'American Psychological Association', 1),
      (v_art_id, 'peer_reviewed', 1, 'Cultural competence in clinical psychology: Moving from assessment to practice', '2018', 'https://doi.org/10.1111/cpsp.12251', 'Clinical Psychology: Science and Practice', 2),
      (v_art_id, 'peer_reviewed', 1, 'Therapist cultural humility: Measuring openness and flexibility in cross-cultural clinical work', '2016', 'https://doi.org/10.1080/10503307.2015.1015430', 'Psychotherapy Research', 3),
      (v_art_id, 'peer_reviewed', 1, 'The therapeutic alliance in multicultural therapy: Linking cultural competence to positive outcomes', '2019', 'https://doi.org/10.1037/cou0000347', 'Journal of Counseling Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Culturally adapted psychotherapy and the legitimacy of myth: A direct-comparison meta-analysis', '2015', 'https://doi.org/10.1037/a0038950', 'Journal of Consulting and Clinical Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Racial and ethnic match between therapist and patient predicts retention', '2018', 'https://doi.org/10.1001/jamapsychiatry.2018.0317', 'JAMA Psychiatry', 6),
      (v_art_id, 'professional_org', 3, 'What to Look for in a Culturally Competent Therapist', '2022', 'https://www.nami.org/Blogs/NAMI-Blog/April-2022/What-to-Look-for-in-a-Culturally-Competent-Therapist', 'National Alliance on Mental Illness', 7)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT12-025 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT12-025';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'professional_org', 3, 'Mental Health Facts for African Americans', '2022', 'https://www.nami.org/Your-Journey/Identity-and-Cultural-Dimensions/Black-African-American', 'National Alliance on Mental Illness', 1),
      (v_art_id, 'peer_reviewed', 1, 'Mental health of Black Americans: Research trends and directions', '2020', 'https://doi.org/10.1146/annurev-clinpsy-050718-095726', 'Annual Review of Clinical Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Racism and mental health outcomes: A systematic review', '2022', 'https://doi.org/10.1016/S2215-0366(22)00120-7', 'The Lancet Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'The Tuskegee Syphilis Study: Implications for the 21st century', '2019', 'https://doi.org/10.1016/j.jnma.2019.03.006', 'Journal of the National Medical Association', 4),
      (v_art_id, 'peer_reviewed', 1, 'Strong Black Woman schema and mental health in Black women', '2018', 'https://doi.org/10.1177/0361684318793947', 'Psychology of Women Quarterly', 5),
      (v_art_id, 'peer_reviewed', 1, 'Police violence and mental health outcomes in Black communities', '2021', 'https://doi.org/10.2105/AJPH.2021.306370', 'American Journal of Public Health', 6),
      (v_art_id, 'peer_reviewed', 1, 'Faith, spirituality, and mental health in the Black community', '2017', 'https://doi.org/10.1177/0095798417712717', 'Journal of Black Psychology', 7),
      (v_art_id, 'professional_org', 3, 'Therapy for Black Girls: Increasing Access and Representation', '2020', 'https://www.apa.org/monitor/2020/07/cover-therapy-black-girls', 'American Psychological Association Monitor', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT12-026 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT12-026';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'professional_org', 3, 'Mental Health Facts for Hispanic/Latino Americans', '2022', 'https://www.nami.org/Your-Journey/Identity-and-Cultural-Dimensions/Latino', 'National Alliance on Mental Illness', 1),
      (v_art_id, 'peer_reviewed', 1, 'Mental health service utilization among Latinos: Evidence and recommendations', '2020', 'https://doi.org/10.1176/appi.ps.201900567', 'Psychiatric Services', 2),
      (v_art_id, 'peer_reviewed', 1, 'Language barriers in healthcare: A systematic review of research', '2018', 'https://doi.org/10.1016/j.ijnurstu.2018.05.007', 'International Journal of Nursing Studies', 3),
      (v_art_id, 'peer_reviewed', 1, 'Immigration-related stress and mental health outcomes in Latino populations', '2019', 'https://doi.org/10.2105/AJPH.2019.305421', 'American Journal of Public Health', 4),
      (v_art_id, 'peer_reviewed', 1, 'Familismo and mental health outcomes in Latino communities', '2017', 'https://doi.org/10.1037/cdp0000142', 'Cultural Diversity and Ethnic Minority Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Undocumented immigration status and mental health', '2021', 'https://doi.org/10.1007/s10903-020-01128-7', 'Journal of Immigrant and Minority Health', 6),
      (v_art_id, 'professional_org', 3, 'Latinx Therapy: Building Culturally Responsive Mental Health Access', '2021', 'https://www.apa.org/monitor/2021/06/latinx-therapy', 'American Psychological Association Monitor', 7)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT12-027 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT12-027';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The model minority myth and mental health outcomes for Asian Americans', '2019', 'https://doi.org/10.1037/aap0000153', 'Asian American Journal of Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Mental health service utilization among Asian Americans: Systematic review', '2018', 'https://doi.org/10.1037/ort0000301', 'American Journal of Orthopsychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Suicide among Asian Americans: Rates, risk factors, and mental health stigma', '2020', 'https://doi.org/10.2105/AJPH.2020.305809', 'American Journal of Public Health', 3),
      (v_art_id, 'peer_reviewed', 1, 'Somatization and mental health in East Asian communities', '2017', 'https://doi.org/10.1007/s11013-016-9514-8', 'Culture, Medicine, and Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Family shame and mental health help-seeking among Asian Americans', '2021', 'https://doi.org/10.1037/cdp0000439', 'Cultural Diversity and Ethnic Minority Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Anti-Asian hate crimes and mental health impact during COVID-19', '2022', 'https://doi.org/10.1001/jamanetworkopen.2022.17613', 'JAMA Network Open', 6),
      (v_art_id, 'professional_org', 3, 'Asian Mental Health Collective: Increasing Access and Representation', '2021', 'https://www.apa.org/monitor/2021/09/asian-mental-health-collective', 'American Psychological Association Monitor', 7)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT12-028 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT12-028';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Multiracial identity development: Findings and challenges', '2018', 'https://doi.org/10.1111/josi.12262', 'Journal of Social Issues', 1),
      (v_art_id, 'peer_reviewed', 1, 'Mental health outcomes in multiracial populations: A systematic review', '2020', 'https://doi.org/10.1037/amp0000645', 'American Psychologist', 2),
      (v_art_id, 'peer_reviewed', 1, 'Microaggressions against multiracial individuals', '2019', 'https://doi.org/10.1037/cdp0000281', 'Cultural Diversity and Ethnic Minority Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Third Culture Kids: Identity formation across multiple cultural contexts', '2017', 'https://doi.org/10.1016/j.ijintrel.2017.01.002', 'International Journal of Intercultural Relations', 4),
      (v_art_id, 'peer_reviewed', 1, 'Identity integration and psychological well-being in multiracial individuals', '2021', 'https://doi.org/10.1037/cou0000512', 'Journal of Counseling Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, '''What Are You?" Multiracial People and the Question of Racial Authenticity', '2016', 'https://doi.org/10.1111/soc4.12408', 'Sociology Compass', 6)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT12-029 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT12-029';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Mental health outcomes for students of color at predominantly white institutions', '2019', 'https://doi.org/10.1353/csd.2019.0067', 'Journal of College Student Development', 1),
      (v_art_id, 'peer_reviewed', 1, 'Racial battle fatigue: The psychological and physiological toll of racism', '2017', 'https://doi.org/10.1080/13613324.2017.1375185', 'Race Ethnicity and Education', 2),
      (v_art_id, 'peer_reviewed', 1, 'Imposter phenomenon and mental health: The moderating roles of social support', '2020', 'https://doi.org/10.1037/cou0000401', 'Journal of Counseling Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Campus climate and mental health outcomes: A systematic review', '2021', 'https://doi.org/10.1037/ort0000571', 'American Journal of Orthopsychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Affinity groups and mental health: Protective effects for minoritized students', '2018', 'https://doi.org/10.1037/cdp0000216', 'Cultural Diversity and Ethnic Minority Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'The Diversity Bargain: Emotional Labor and Campus Inclusion', '2019', 'https://doi.org/10.17763/1943-5045-89.2.159', 'Harvard Educational Review', 6)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT12-030 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT12-030';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Culturally adapted mental health interventions: A systematic review', '2018', 'https://doi.org/10.1176/appi.ajp.2018.18030352', 'American Journal of Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Cultural adaptation of treatments: A resource for considering culture in evidence-based practice', '2019', 'https://doi.org/10.1037/pro0000252', 'Professional Psychology: Research and Practice', 2),
      (v_art_id, 'peer_reviewed', 1, 'Meta-analysis of culturally adapted CBT for racial/ethnic minorities', '2020', 'https://doi.org/10.1037/ccp0000499', 'Journal of Consulting and Clinical Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Ecological Validity Model: Cultural adaptation framework', '2017', 'https://doi.org/10.1111/cpsp.12202', 'Clinical Psychology: Science and Practice', 4),
      (v_art_id, 'peer_reviewed', 1, 'The therapeutic alliance across cultures: Client perspectives', '2021', 'https://doi.org/10.1080/10503307.2020.1849849', 'Psychotherapy Research', 5),
      (v_art_id, 'peer_reviewed', 1, 'Racial Trauma-Focused CBT: A culturally responsive treatment', '2022', 'https://doi.org/10.1016/j.cbpra.2021.12.003', 'Cognitive and Behavioral Practice', 6),
      (v_art_id, 'peer_reviewed', 1, 'Cultural adaptations of evidence-based treatments for PTSD in refugees', '2019', 'https://doi.org/10.1002/jts.22378', 'Journal of Traumatic Stress', 7),
      (v_art_id, 'professional_org', 3, 'Guidelines for Cultural Adaptation of Evidence-Based Treatments', '2020', 'https://www.apa.org/pi/oema/resources/cultural-adaptation', 'American Psychological Association', 8)
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
