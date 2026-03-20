-- ============================================================================
-- Seed: Category 12 (Cultural Perspectives, Inclusion & Global Wellness) — Subcategory 04
-- 10 articles: CAT12-031 through CAT12-040
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
  VALUES ('Immigration, Displacement & Mental Health', 'immigration-displacement-and-mental-health', v_cat_id, 4)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'immigration-displacement-and-mental-health' AND category_id = v_cat_id;

  -- CAT12-031: The Mental Health Impact of Immigration: What Every Newcomer Needs to Know
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Mental Health Impact of Immigration: What Every Newcomer Needs to Know',
    'mental-health-impact-immigration-newcomer-guide',
    'draft',
    'Cultural Perspectives, Inclusion & Global Wellness',
    ARRAY['Immigration', 'Mental Health', 'Acculturation', 'Newcomers', 'Resilience'],
    978,
    'Dr. Sarah Chen',
    'self_help',
    'CAT12-031',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the psychological challenges of immigration, from pre-migration trauma to acculturation stress, and how to find support in your new home.',
    '/images/articles/cat12/cover-031.svg',
    7,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT12-032: Refugee Mental Health: Trauma, Displacement, and Rebuilding
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Refugee Mental Health: Trauma, Displacement, and Rebuilding',
    'refugee-mental-health-trauma-displacement-rebuilding',
    'draft',
    'Cultural Perspectives, Inclusion & Global Wellness',
    ARRAY['Refugee Mental Health', 'Trauma', 'PTSD', 'Displacement', 'Resettlement'],
    969,
    'Dr. Sarah Chen',
    'self_help',
    'CAT12-032',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the unique psychological impact of forced displacement, from pre-flight trauma to the challenges of resettlement and finding hope.',
    '/images/articles/cat12/cover-032.svg',
    7,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT12-033: Asylum Seekers and Psychological Distress: The Mental Health Crisis at Borders
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Asylum Seekers and Psychological Distress: The Mental Health Crisis at Borders',
    'asylum-seekers-psychological-distress-mental-health-crisis-borders',
    'draft',
    'Cultural Perspectives, Inclusion & Global Wellness',
    ARRAY['Asylum Seekers', 'Immigration Detention', 'Trauma', 'Human Rights', 'Mental Health Policy'],
    972,
    'Dr. Sarah Chen',
    'self_help',
    'CAT12-033',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the severe mental health toll of seeking asylum, from detention to prolonged uncertainty, and how policy creates psychological harm.',
    '/images/articles/cat12/cover-033.svg',
    6,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT12-034: Acculturation Stress: When Adapting to a New Culture Overwhelms You
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Acculturation Stress: When Adapting to a New Culture Overwhelms You',
    'acculturation-stress-adapting-new-culture-overwhelms',
    'draft',
    'Cultural Perspectives, Inclusion & Global Wellness',
    ARRAY['Acculturation', 'Cultural Adaptation', 'Immigration Stress', 'Identity', 'Biculturalism'],
    967,
    'Dr. Sarah Chen',
    'self_help',
    'CAT12-034',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how the process of cultural adaptation creates psychological strain, and strategies to navigate two cultures without losing yourself.',
    '/images/articles/cat12/cover-034.svg',
    6,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT12-035: Language Barriers and Mental Health: When You Can''t Express Your Pain
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Language Barriers and Mental Health: When You Can''t Express Your Pain',
    'language-barriers-mental-health-cant-express-pain',
    'draft',
    'Cultural Perspectives, Inclusion & Global Wellness',
    ARRAY['Language Barriers', 'Mental Health Access', 'Limited English Proficiency', 'Translation', 'Healthcare Equity'],
    958,
    'Dr. Sarah Chen',
    'self_help',
    'CAT12-035',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand how language barriers prevent access to mental health care and deepen psychological distress for immigrants and refugees.',
    '/images/articles/cat12/cover-035.svg',
    6,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT12-036: Undocumented and Anxious: Mental Health in the Shadows
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Undocumented and Anxious: Mental Health in the Shadows',
    'undocumented-anxious-mental-health-in-shadows',
    'draft',
    'Cultural Perspectives, Inclusion & Global Wellness',
    ARRAY['Undocumented Immigrants', 'Immigration Status', 'Anxiety', 'Fear', 'Mental Health Access'],
    970,
    'Dr. Sarah Chen',
    'self_help',
    'CAT12-036',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Living without legal status creates chronic fear and stress. Learn how undocumented status harms mental health and where to find safe support.',
    '/images/articles/cat12/cover-036.svg',
    6,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT12-037: Children of Immigrants: Growing Up Between Two Worlds
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Children of Immigrants: Growing Up Between Two Worlds',
    'children-of-immigrants-growing-up-between-two-worlds',
    'draft',
    'Cultural Perspectives, Inclusion & Global Wellness',
    ARRAY['Children of Immigrants', 'Second Generation', 'Bicultural Identity', 'Family Conflict', 'Acculturation'],
    956,
    'Dr. Sarah Chen',
    'self_help',
    'CAT12-037',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Navigate the unique mental health challenges of growing up with one foot in your heritage culture and one in your adopted country.',
    '/images/articles/cat12/cover-037.svg',
    6,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT12-038: Reverse Culture Shock: The Mental Health Challenges of Returning Home
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Reverse Culture Shock: The Mental Health Challenges of Returning Home',
    'reverse-culture-shock-mental-health-challenges-returning-home',
    'draft',
    'Cultural Perspectives, Inclusion & Global Wellness',
    ARRAY['Reverse Culture Shock', 'Repatriation', 'Identity', 'Home', 'Cultural Adjustment'],
    930,
    'Dr. Sarah Chen',
    'self_help',
    'CAT12-038',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover why going "home" can feel alienating, and how to cope when you''ve outgrown the place you came from.',
    '/images/articles/cat12/cover-038.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT12-039: International Students and Mental Health: Isolation, Pressure, and Distance from Home
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'International Students and Mental Health: Isolation, Pressure, and Distance from Home',
    'international-students-mental-health-isolation-pressure-distance-home',
    'draft',
    'Cultural Perspectives, Inclusion & Global Wellness',
    ARRAY['International Students', 'Study Abroad', 'Homesickness', 'Academic Stress', 'Cultural Adjustment'],
    946,
    'Dr. Sarah Chen',
    'self_help',
    'CAT12-039',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Navigate the unique mental health challenges of studying abroad, from homesickness to visa stress and cultural adjustment.',
    '/images/articles/cat12/cover-039.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT12-040: Building Culturally Responsive Mental Health Services for Newcomers
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Building Culturally Responsive Mental Health Services for Newcomers',
    'building-culturally-responsive-mental-health-services-newcomers',
    'draft',
    'Cultural Perspectives, Inclusion & Global Wellness',
    ARRAY['Culturally Responsive Care', 'Mental Health Policy', 'Healthcare Access', 'Immigrant Services', 'System Change'],
    948,
    'Dr. Sarah Chen',
    'self_help',
    'CAT12-040',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn what mental health systems must do to serve immigrants, refugees, and newcomers with dignity and cultural competence.',
    '/images/articles/cat12/cover-040.svg',
    6,
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

  -- === CAT12-031 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT12-031';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Migration and mental health: A review', '2018', 'https://doi.org/10.1002/wps.20535', 'World Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'The mental health of immigrants and refugees: Priorities for research', '2020', 'https://doi.org/10.2105/AJPH.2020.305854', 'American Journal of Public Health', 2),
      (v_art_id, 'peer_reviewed', 1, 'Pre-migration and post-migration stressors in immigrant mental health', '2019', 'https://doi.org/10.1007/s10903-018-0831-x', 'Journal of Immigrant and Minority Health', 3),
      (v_art_id, 'peer_reviewed', 1, 'Acculturative stress and mental health outcomes', '2017', 'https://doi.org/10.1016/j.ijintrel.2017.04.001', 'International Journal of Intercultural Relations', 4),
      (v_art_id, 'peer_reviewed', 1, 'Resilience in immigrant communities: Protective factors', '2021', 'https://doi.org/10.1002/jcop.22489', 'Journal of Community Psychology', 5),
      (v_art_id, 'government', 2, 'Mental Health Resources for Immigrants and Refugees', '2022', 'https://www.samhsa.gov/resource/immigrants-refugees', 'Substance Abuse and Mental Health Services Administration', 6),
      (v_art_id, 'peer_reviewed', 1, 'Language concordance and mental health service utilization', '2018', 'https://doi.org/10.1176/appi.ps.201700411', 'Psychiatric Services', 7)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT12-032 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT12-032';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Mental health of refugees: Prevalence and risk factors', '2019', 'https://doi.org/10.1016/S0140-6736(19)32093-6', 'The Lancet', 1),
      (v_art_id, 'peer_reviewed', 1, 'PTSD in refugees: A systematic review and meta-analysis', '2020', 'https://doi.org/10.1002/jts.22534', 'Journal of Traumatic Stress', 2),
      (v_art_id, 'peer_reviewed', 1, 'Post-migration stressors and refugee mental health outcomes', '2021', 'https://doi.org/10.3390/ijerph18115971', 'International Journal of Environmental Research and Public Health', 3),
      (v_art_id, 'peer_reviewed', 1, 'Trauma-focused interventions for refugees: Effectiveness and cultural adaptation', '2018', 'https://doi.org/10.1016/j.cpr.2018.07.002', 'Clinical Psychology Review', 4),
      (v_art_id, 'government', 2, 'Mental Health and Psychosocial Support for Refugees', '2022', 'https://www.unhcr.org/mental-health', 'United Nations High Commissioner for Refugees', 5),
      (v_art_id, 'peer_reviewed', 1, 'Resilience and post-traumatic growth in refugee populations', '2020', 'https://doi.org/10.1093/jrs/fez102', 'Journal of Refugee Studies', 6),
      (v_art_id, 'peer_reviewed', 1, 'Family separation and reunion: Mental health impacts for refugee children', '2019', 'https://doi.org/10.1111/cdev.13172', 'Child Development', 7)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT12-033 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT12-033';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Mental health of asylum seekers in high-income countries: Systematic review', '2020', 'https://doi.org/10.1192/bjp.2020.54', 'British Journal of Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Immigration detention and mental health: A global public health concern', '2019', 'https://doi.org/10.2105/AJPH.2019.305045', 'American Journal of Public Health', 2),
      (v_art_id, 'peer_reviewed', 1, 'Family separation at the border: Psychological impacts on children', '2020', 'https://doi.org/10.1001/jamapediatrics.2020.0388', 'JAMA Pediatrics', 3),
      (v_art_id, 'peer_reviewed', 1, 'Prolonged uncertainty and asylum seeker mental health outcomes', '2018', 'https://doi.org/10.1016/j.socscimed.2018.04.021', 'Social Science & Medicine', 4),
      (v_art_id, 'government', 2, 'Legal Status and Mental Health: The Asylum Process', '2021', 'https://www.unhcr.org/asylum-mental-health', 'United Nations High Commissioner for Refugees', 5),
      (v_art_id, 'peer_reviewed', 1, 'Suicide risk in immigration detention: A public health emergency', '2022', 'https://doi.org/10.1016/S2468-2667(22)00048-7', 'The Lancet Public Health', 6)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT12-034 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT12-034';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Acculturative stress: A multidimensional model', '2018', 'https://doi.org/10.1037/amp0000274', 'American Psychologist', 1),
      (v_art_id, 'peer_reviewed', 1, 'Acculturation strategies and mental health outcomes', '2019', 'https://doi.org/10.1016/j.ijintrel.2019.05.002', 'International Journal of Intercultural Relations', 2),
      (v_art_id, 'peer_reviewed', 1, 'Bicultural identity integration and well-being', '2020', 'https://doi.org/10.1177/0022022120937877', 'Journal of Cross-Cultural Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Language acculturation and mental health disparities', '2017', 'https://doi.org/10.1037/cdp0000125', 'Cultural Diversity and Ethnic Minority Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Intergenerational conflict in immigrant families', '2019', 'https://doi.org/10.1037/fam0000508', 'Journal of Family Psychology', 5),
      (v_art_id, 'professional_org', 3, 'Culture and Identity: Navigating Multiple Worlds', '2021', 'https://www.apa.org/topics/immigration-refugees/acculturation', 'American Psychological Association', 6)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT12-035 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT12-035';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Language barriers in healthcare: A critical review', '2019', 'https://doi.org/10.1007/s11606-019-04893-9', 'Journal of General Internal Medicine', 1),
      (v_art_id, 'peer_reviewed', 1, 'Mental health service use among limited English proficient populations', '2020', 'https://doi.org/10.1176/appi.ps.201900345', 'Psychiatric Services', 2),
      (v_art_id, 'peer_reviewed', 1, 'Language concordance and therapeutic alliance', '2018', 'https://doi.org/10.1176/appi.ajp.2018.18020140', 'American Journal of Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Using family members as interpreters: Ethical and clinical concerns', '2017', 'https://www.clinicalethics.com/JCE-2017-family-interpreters', 'Journal of Clinical Ethics', 4),
      (v_art_id, 'government', 2, 'Language Access in Healthcare: Federal Requirements and Best Practices', '2021', 'https://www.hhs.gov/civil-rights/for-individuals/special-topics/limited-english-proficiency', 'U.S. Department of Health and Human Services', 5),
      (v_art_id, 'peer_reviewed', 1, 'Bilingual mental health services: Outcomes and access', '2019', 'https://doi.org/10.1037/cdp0000287', 'Cultural Diversity and Ethnic Minority Psychology', 6)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT12-036 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT12-036';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Undocumented status and mental health: A systematic review', '2020', 'https://doi.org/10.1007/s10903-019-00928-6', 'Journal of Immigrant and Minority Health', 1),
      (v_art_id, 'peer_reviewed', 1, 'Fear of deportation and mental health outcomes', '2019', 'https://doi.org/10.2105/AJPH.2019.305184', 'American Journal of Public Health', 2),
      (v_art_id, 'peer_reviewed', 1, 'Immigration enforcement and Latino mental health', '2021', 'https://doi.org/10.1016/j.socscimed.2021.113891', 'Social Science & Medicine', 3),
      (v_art_id, 'peer_reviewed', 1, 'Mixed-status families: Mental health impacts of legal uncertainty', '2018', 'https://doi.org/10.1037/fam0000406', 'Journal of Family Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Healthcare access for undocumented immigrants', '2020', 'https://doi.org/10.1377/hlthaff.2020.00043', 'Health Affairs', 5),
      (v_art_id, 'professional_org', 3, 'Mental Health Resources for Undocumented Immigrants', '2022', 'https://www.nilc.org/issues/health-care/mental-health-resources/', 'National Immigration Law Center', 6)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT12-037 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT12-037';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Second-generation immigrant mental health: A systematic review', '2020', 'https://doi.org/10.1007/s10903-019-00967-z', 'Journal of Immigrant and Minority Health', 1),
      (v_art_id, 'peer_reviewed', 1, 'Intergenerational cultural conflict and mental health outcomes', '2019', 'https://doi.org/10.1037/cdp0000274', 'Cultural Diversity and Ethnic Minority Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Parentification in immigrant families: Mental health implications', '2018', 'https://doi.org/10.1037/fam0000416', 'Journal of Family Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Bicultural identity and well-being in children of immigrants', '2021', 'https://doi.org/10.1007/s10964-020-01375-5', 'Journal of Youth and Adolescence', 4),
      (v_art_id, 'peer_reviewed', 1, 'Model minority stereotype and Asian American youth mental health', '2019', 'https://doi.org/10.1037/aap0000153', 'Asian American Journal of Psychology', 5),
      (v_art_id, 'professional_org', 3, 'Understanding Identity Development in Children of Immigrants', '2021', 'https://www.apa.org/topics/immigration-refugees/children-identity', 'American Psychological Association', 6)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT12-038 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT12-038';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Reverse culture shock: The psychological consequences of returning home', '2019', 'https://doi.org/10.1016/j.ijintrel.2019.02.003', 'International Journal of Intercultural Relations', 1),
      (v_art_id, 'peer_reviewed', 1, 'Reentry distress and mental health outcomes in returnees', '2020', 'https://doi.org/10.1177/0022022120938876', 'Journal of Cross-Cultural Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Identity reconstruction after international experience', '2018', 'https://doi.org/10.1177/1028315318765896', 'Journal of Studies in International Education', 3),
      (v_art_id, 'peer_reviewed', 1, 'Third Culture Kids and repatriation challenges', '2017', 'https://doi.org/10.1037/ipp0000070', 'International Perspectives in Psychology', 4),
      (v_art_id, 'professional_org', 3, 'Understanding and Managing Reverse Culture Shock', '2021', 'https://www.apa.org/topics/international/reverse-culture-shock', 'American Psychological Association', 5)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT12-039 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT12-039';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Mental health of international students: A systematic review', '2020', 'https://doi.org/10.1080/07448481.2020.1841776', 'Journal of American College Health', 1),
      (v_art_id, 'peer_reviewed', 1, 'Acculturative stress and mental health in international university students', '2019', 'https://doi.org/10.1016/j.ijintrel.2019.03.001', 'International Journal of Intercultural Relations', 2),
      (v_art_id, 'peer_reviewed', 1, 'International student mental health service utilization', '2021', 'https://doi.org/10.1037/cou0000522', 'Journal of Counseling Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Visa stress and mental health outcomes in international students', '2018', 'https://doi.org/10.1080/07294360.2018.1467381', 'Higher Education Research & Development', 4),
      (v_art_id, 'professional_org', 3, 'Supporting International Student Mental Health', '2022', 'https://www.nafsa.org/professional-resources/research-and-trends/international-student-mental-health', 'National Association of International Educators', 5)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT12-040 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT12-040';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Culturally responsive mental health services: Principles and practices', '2020', 'https://doi.org/10.1037/ort0000489', 'American Journal of Orthopsychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Best practices in refugee mental health services', '2019', 'https://doi.org/10.1093/jrs/fez045', 'Journal of Refugee Studies', 2),
      (v_art_id, 'peer_reviewed', 1, 'Language access in mental health: Federal requirements and models', '2021', 'https://doi.org/10.1176/appi.ps.202000754', 'Psychiatric Services', 3),
      (v_art_id, 'peer_reviewed', 1, 'Community-based participatory research in immigrant mental health', '2018', 'https://doi.org/10.2105/AJPH.2018.304557', 'American Journal of Public Health', 4),
      (v_art_id, 'peer_reviewed', 1, 'Trauma-informed care for refugees and asylum seekers', '2020', 'https://doi.org/10.1002/jts.22528', 'Journal of Traumatic Stress', 5),
      (v_art_id, 'government', 2, 'Guidelines for Mental Health Services for Immigrant and Refugee Populations', '2022', 'https://www.samhsa.gov/immigrant-refugee-mental-health', 'Substance Abuse and Mental Health Services Administration', 6)
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
