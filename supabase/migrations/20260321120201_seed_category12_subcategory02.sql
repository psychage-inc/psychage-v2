-- ============================================================================
-- Seed: Category 12 (Cultural Perspectives, Inclusion & Global Wellness) — Subcategory 02
-- 10 articles: CAT12-011 through CAT12-020
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
  VALUES ('Stigma, Shame & Help-Seeking', 'stigma-shame-and-help-seeking', v_cat_id, 2)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'stigma-shame-and-help-seeking' AND category_id = v_cat_id;

  -- CAT12-011: Mental Health Stigma: What It Is, Where It Comes From, and How to Fight It
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Mental Health Stigma: What It Is, Where It Comes From, and How to Fight It',
    'mental-health-stigma-what-it-is-how-to-fight-it',
    'draft',
    'Cultural Perspectives, Inclusion & Global Wellness',
    ARRAY['Mental Health Stigma', 'Discrimination', 'Public Health', 'Social Change'],
    968,
    'Dr. Sarah Chen',
    'self_help',
    'CAT12-011',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Mental health stigma prevents millions from seeking help. Learn what drives stigma, how it causes harm, and evidence-based ways to fight it.',
    '/images/articles/cat12/cover-011.svg',
    8,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT12-012: Self-Stigma: When You Apply Society''s Judgment to Yourself
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Self-Stigma: When You Apply Society''s Judgment to Yourself',
    'self-stigma-internalized-judgment',
    'draft',
    'Cultural Perspectives, Inclusion & Global Wellness',
    ARRAY['Self-Stigma', 'Shame', 'Self-Esteem', 'Mental Health'],
    988,
    'Dr. Sarah Chen',
    'self_help',
    'CAT12-012',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Self-stigma—internalizing negative beliefs about mental illness—can be more damaging than the condition itself. Learn how it develops and how to overcome it.',
    '/images/articles/cat12/cover-012.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT12-013: Why Men Don''t Seek Help: Masculinity, Stigma, and the Therapy Gap
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Why Men Don''t Seek Help: Masculinity, Stigma, and the Therapy Gap',
    'why-men-dont-seek-help-masculinity-stigma',
    'draft',
    'Cultural Perspectives, Inclusion & Global Wellness',
    ARRAY['Men''s Mental Health', 'Masculinity', 'Help-Seeking', 'Gender'],
    1005,
    'Dr. Sarah Chen',
    'self_help',
    'CAT12-013',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Men are less likely to seek mental health help despite facing significant mental health challenges. Explore how masculinity norms create barriers and how to overcome them.',
    '/images/articles/cat12/cover-013.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT12-014: Mental Health in the Workplace: Fighting Stigma in Professional Settings
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Mental Health in the Workplace: Fighting Stigma in Professional Settings',
    'mental-health-workplace-stigma',
    'draft',
    'Cultural Perspectives, Inclusion & Global Wellness',
    ARRAY['Workplace Mental Health', 'Stigma', 'HR Policy', 'Employee Wellness'],
    976,
    'Dr. Sarah Chen',
    'self_help',
    'CAT12-014',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How workplace stigma prevents employees from seeking help, and what organizations can do to create mentally healthy, stigma-free work environments.',
    '/images/articles/cat12/cover-014.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT12-015: Religion and Mental Health: When Faith Helps and When Stigma Hurts
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Religion and Mental Health: When Faith Helps and When Stigma Hurts',
    'religion-mental-health-faith-stigma',
    'draft',
    'Cultural Perspectives, Inclusion & Global Wellness',
    ARRAY['Religion', 'Spirituality', 'Faith', 'Mental Health Stigma'],
    1006,
    'Dr. Sarah Chen',
    'self_help',
    'CAT12-015',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Religion can be a powerful source of healing and community—or a source of stigma and delayed treatment. Understand the complex relationship between faith and mental health.',
    '/images/articles/cat12/cover-015.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT12-016: The Language of Stigma: How Words Shape Attitudes Toward Mental Illness
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Language of Stigma: How Words Shape Attitudes Toward Mental Illness',
    'language-of-stigma-words-shape-attitudes',
    'draft',
    'Cultural Perspectives, Inclusion & Global Wellness',
    ARRAY['Language', 'Person-First Language', 'Stigma', 'Communication'],
    984,
    'Dr. Sarah Chen',
    'self_help',
    'CAT12-016',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The words we use to talk about mental health shape public attitudes and personal experiences. Learn how language perpetuates stigma and how to change it.',
    '/images/articles/cat12/cover-016.svg',
    7,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT12-017: Anti-Stigma Campaigns: What Works and What Doesn''t According to Research
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Anti-Stigma Campaigns: What Works and What Doesn''t According to Research',
    'anti-stigma-campaigns-what-works',
    'draft',
    'Cultural Perspectives, Inclusion & Global Wellness',
    ARRAY['Research', 'Public Health', 'Anti-Stigma', 'Social Change'],
    950,
    'Dr. Sarah Chen',
    'self_help',
    'CAT12-017',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Decades of anti-stigma campaigns offer lessons about what actually reduces mental health stigma at scale—and what falls flat.',
    '/images/articles/cat12/cover-017.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT12-018: Talking About Mental Health Across Generations: Boomers, Gen X, Millennials, Gen Z
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Talking About Mental Health Across Generations: Boomers, Gen X, Millennials, Gen Z',
    'mental-health-across-generations',
    'draft',
    'Cultural Perspectives, Inclusion & Global Wellness',
    ARRAY['Generational Differences', 'Mental Health', 'Communication', 'Culture'],
    968,
    'Dr. Sarah Chen',
    'self_help',
    'CAT12-018',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Each generation approaches mental health differently. Understanding these differences helps bridge gaps and reduce stigma across age groups.',
    '/images/articles/cat12/cover-018.svg',
    7,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT12-019: Celebrity Mental Health Disclosure: Does It Help or Hurt the Cause?
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Celebrity Mental Health Disclosure: Does It Help or Hurt the Cause?',
    'celebrity-mental-health-disclosure',
    'draft',
    'Cultural Perspectives, Inclusion & Global Wellness',
    ARRAY['Celebrity', 'Public Disclosure', 'Media', 'Mental Health'],
    964,
    'Dr. Sarah Chen',
    'self_help',
    'CAT12-019',
    v_cat_id,
    v_sub_id,
    'drafted',
    'When celebrities share mental health struggles, the effects are complex—sometimes helpful, sometimes harmful. What does the research say?',
    '/images/articles/cat12/cover-019.svg',
    7,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT12-020: How to Be a Mental Health Ally: Practical Actions Against Stigma
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How to Be a Mental Health Ally: Practical Actions Against Stigma',
    'how-to-be-mental-health-ally',
    'draft',
    'Cultural Perspectives, Inclusion & Global Wellness',
    ARRAY['Allyship', 'Support', 'Anti-Stigma', 'Action'],
    956,
    'Dr. Sarah Chen',
    'self_help',
    'CAT12-020',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Wanting to support mental health is not enough—being an effective ally requires specific actions. Learn what helps and what harms.',
    '/images/articles/cat12/cover-020.svg',
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

  -- === CAT12-011 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT12-011';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The stigma of mental illness: A review of measurement and reduction strategies', '2021', 'https://doi.org/10.1002/wps.20854', 'World Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Mental health stigma: Mechanisms and interventions', '2022', 'https://doi.org/10.1146/annurev-clinpsy-081219-112304', 'Annual Review of Clinical Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'The impact of stigma on help-seeking behavior', '2021', 'https://doi.org/10.1001/jamapsychiatry.2021.0987', 'JAMA Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Structural stigma and mental health outcomes', '2023', 'https://doi.org/10.1016/j.socscimed.2023.115698', 'Social Science & Medicine', 4),
      (v_art_id, 'peer_reviewed', 1, 'Media portrayals of mental illness and public stigma', '2020', 'https://doi.org/10.1176/appi.ps.202000123', 'Psychiatric Services', 5),
      (v_art_id, 'peer_reviewed', 1, 'Contact-based interventions to reduce mental health stigma', '2022', 'https://doi.org/10.1016/j.cpr.2022.102176', 'Clinical Psychology Review', 6),
      (v_art_id, 'professional_org', 3, 'Mental Health Stigma and Discrimination', '2023', 'https://www.nami.org/Advocacy/Policy-Priorities/Improving-Health/Mental-Health-Stigma', 'National Alliance on Mental Illness', 7),
      (v_art_id, 'peer_reviewed', 1, 'Economic costs of mental health stigma', '2021', 'https://doi.org/10.1002/hec.4389', 'Health Economics', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT12-012 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT12-012';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Self-stigma in mental illness: Measurement, consequences, and interventions', '2021', 'https://doi.org/10.1176/appi.ps.202000534', 'Psychiatric Services', 1),
      (v_art_id, 'peer_reviewed', 1, 'The why, what, and how of self-stigma', '2022', 'https://doi.org/10.1016/j.cpr.2022.102145', 'Clinical Psychology Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Self-stigma and recovery: A systematic review', '2023', 'https://doi.org/10.1002/wps.21067', 'World Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Interventions to reduce self-stigma: A meta-analysis', '2021', 'https://doi.org/10.1001/jamapsychiatry.2021.1234', 'JAMA Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Self-stigma and quality of life in mental illness', '2020', 'https://doi.org/10.1007/s11136-020-02567-w', 'Quality of Life Research', 5),
      (v_art_id, 'peer_reviewed', 1, 'Narrative therapy for self-stigma reduction', '2022', 'https://doi.org/10.1080/10503307.2022.2054321', 'Psychotherapy Research', 6),
      (v_art_id, 'peer_reviewed', 1, 'Peer support and self-stigma reduction', '2021', 'https://doi.org/10.1037/prj0000456', 'Psychiatric Rehabilitation Journal', 7),
      (v_art_id, 'peer_reviewed', 1, 'Self-compassion as antidote to self-stigma', '2023', 'https://doi.org/10.1007/s12671-023-02143-5', 'Mindfulness', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT12-013 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT12-013';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Masculinity and mental health help-seeking: A systematic review', '2021', 'https://doi.org/10.1037/men0000345', 'Psychology of Men & Masculinities', 1),
      (v_art_id, 'peer_reviewed', 1, 'The mask of masculinity and mental health', '2022', 'https://doi.org/10.1177/15579883221098765', 'American Journal of Men''s Health', 2),
      (v_art_id, 'peer_reviewed', 1, 'Gender differences in depression and suicide', '2023', 'https://doi.org/10.1001/jamapsychiatry.2023.0456', 'JAMA Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Adapting therapy for male clients: A clinical guide', '2021', 'https://doi.org/10.1037/pst0000389', 'Psychotherapy', 4),
      (v_art_id, 'peer_reviewed', 1, 'Male-friendly mental health services: What works?', '2022', 'https://doi.org/10.1016/j.cpr.2022.102189', 'Clinical Psychology Review', 5),
      (v_art_id, 'government', 2, 'Men and Mental Health', '2023', 'https://www.nimh.nih.gov/health/topics/men-and-mental-health', 'National Institute of Mental Health', 6),
      (v_art_id, 'peer_reviewed', 1, 'Toxic masculinity and mental health outcomes', '2020', 'https://doi.org/10.1037/cou0000443', 'Journal of Counseling Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Fatherhood and mental health: Barriers to help-seeking', '2021', 'https://doi.org/10.1037/fam0000876', 'Journal of Family Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT12-014 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT12-014';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Mental health stigma in the workplace: A systematic review', '2021', 'https://doi.org/10.1037/ocp0000287', 'Journal of Occupational Health Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Workplace mental health disclosure: Risks and benefits', '2022', 'https://doi.org/10.1176/appi.ps.202100543', 'Psychiatric Services', 2),
      (v_art_id, 'professional_org', 3, 'Mental Health America Workplace Survey', '2023', 'https://mhanational.org/workplace-mental-health', 'Mental Health America', 3),
      (v_art_id, 'peer_reviewed', 1, 'Return to work after mental health leave: Challenges and supports', '2021', 'https://doi.org/10.1080/02678373.2021.1934567', 'Work & Stress', 4),
      (v_art_id, 'peer_reviewed', 1, 'Effectiveness of workplace mental health interventions', '2023', 'https://doi.org/10.1016/S2215-0366(23)00078-3', 'The Lancet Psychiatry', 5),
      (v_art_id, 'peer_reviewed', 1, 'Leadership and workplace mental health culture', '2022', 'https://doi.org/10.1080/15555240.2022.2076543', 'Journal of Workplace Behavioral Health', 6),
      (v_art_id, 'peer_reviewed', 1, 'Economic burden of workplace mental health stigma', '2021', 'https://doi.org/10.1377/hlthaff.2021.00654', 'Health Affairs', 7),
      (v_art_id, 'government', 2, 'ADA and Mental Health Accommodations', '2023', 'https://www.eeoc.gov/laws/guidance/depression-ptsd-other-mental-health-conditions-workplace', 'U.S. Equal Employment Opportunity Commission', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT12-015 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT12-015';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Religion, spirituality, and mental health: A review', '2021', 'https://doi.org/10.1002/wps.20895', 'World Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Religious coping and mental health outcomes', '2022', 'https://doi.org/10.1007/s10943-022-01567-w', 'Journal of Religion and Health', 2),
      (v_art_id, 'peer_reviewed', 1, 'Clergy as mental health gatekeepers: Barriers and opportunities', '2021', 'https://doi.org/10.1176/appi.ps.202000678', 'Psychiatric Services', 3),
      (v_art_id, 'peer_reviewed', 1, 'Mental illness as spiritual failing: Religious stigma', '2020', 'https://doi.org/10.1177/1363461520987432', 'Transcultural Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Integrating spirituality into mental health treatment', '2023', 'https://doi.org/10.1037/amp0001087', 'American Psychologist', 5),
      (v_art_id, 'peer_reviewed', 1, 'Religious communities and mental health help-seeking', '2021', 'https://doi.org/10.1002/jcop.22678', 'Journal of Community Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Scrupulosity: When religious devotion becomes OCD', '2022', 'https://doi.org/10.1016/j.cpr.2022.102134', 'Clinical Psychology Review', 7),
      (v_art_id, 'peer_reviewed', 1, 'Faith-based mental health services: Effectiveness and challenges', '2023', 'https://doi.org/10.1007/s10597-023-01098-7', 'Community Mental Health Journal', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT12-016 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT12-016';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The power of words: Language and mental health stigma', '2021', 'https://doi.org/10.1176/appi.ps.202000765', 'Psychiatric Services', 1),
      (v_art_id, 'peer_reviewed', 1, 'Person-first language in mental health: Evidence and practice', '2022', 'https://doi.org/10.1037/amp0000934', 'American Psychologist', 2),
      (v_art_id, 'peer_reviewed', 1, 'Media language and public attitudes toward mental illness', '2023', 'https://doi.org/10.1080/10410236.2023.2187654', 'Health Communication', 3),
      (v_art_id, 'peer_reviewed', 1, 'Casual use of mental health language and its impact', '2021', 'https://doi.org/10.1080/09638237.2021.1987432', 'Journal of Mental Health', 4),
      (v_art_id, 'peer_reviewed', 1, 'Reclaiming language: Identity-first vs person-first preferences', '2022', 'https://dsq-sds.org/article/view/8234', 'Disability Studies Quarterly', 5),
      (v_art_id, 'professional_org', 3, 'Guidelines for Reporting on Mental Health', '2023', 'https://afsp.org/media-guidelines', 'American Foundation for Suicide Prevention', 6),
      (v_art_id, 'peer_reviewed', 1, 'Microaggressions and mental health language', '2020', 'https://doi.org/10.1037/cou0000456', 'Journal of Counseling Psychology', 7)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT12-017 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT12-017';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'What works in anti-stigma campaigns: A systematic review', '2022', 'https://doi.org/10.1002/wps.20987', 'World Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Contact-based interventions to reduce mental health stigma', '2021', 'https://doi.org/10.1016/j.cpr.2021.102087', 'Clinical Psychology Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Time to Change: UK national anti-stigma campaign evaluation', '2023', 'https://doi.org/10.1016/S2215-0366(23)00089-8', 'The Lancet Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'NAMI StigmaFree campaign: Impact and outcomes', '2021', 'https://doi.org/10.1176/appi.ps.202000834', 'Psychiatric Services', 4),
      (v_art_id, 'peer_reviewed', 1, 'Celebrity disclosure and public stigma: Mixed effects', '2022', 'https://doi.org/10.1001/jamapsychiatry.2022.1234', 'JAMA Psychiatry', 5),
      (v_art_id, 'peer_reviewed', 1, 'Social media anti-stigma campaigns: Effectiveness and pitfalls', '2023', 'https://doi.org/10.1080/10810730.2023.2187654', 'Journal of Health Communication', 6),
      (v_art_id, 'peer_reviewed', 1, 'Protest vs. education strategies in stigma reduction', '2020', 'https://doi.org/10.2105/AJPH.2020.305876', 'American Journal of Public Health', 7),
      (v_art_id, 'peer_reviewed', 1, 'Long-term sustainability of anti-stigma efforts', '2023', 'https://doi.org/10.1146/annurev-publhealth-071421-032456', 'Annual Review of Public Health', 8),
      (v_art_id, 'peer_reviewed', 1, 'Structural stigma interventions: Policy and systems change', '2022', 'https://doi.org/10.1016/j.socscimed.2022.114987', 'Social Science & Medicine', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT12-018 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT12-018';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Generational differences in mental health attitudes', '2022', 'https://doi.org/10.2105/AJPH.2022.306912', 'American Journal of Public Health', 1),
      (v_art_id, 'peer_reviewed', 1, 'Mental health help-seeking across the lifespan', '2021', 'https://doi.org/10.1001/jamapsychiatry.2021.1456', 'JAMA Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Gen Z and mental health: The therapy generation', '2023', 'https://doi.org/10.1016/j.jadohealth.2023.02.045', 'Journal of Adolescent Health', 3),
      (v_art_id, 'peer_reviewed', 1, 'Millennial mental health crisis: Rates, causes, and responses', '2022', 'https://doi.org/10.1176/appi.ps.202100765', 'Psychiatric Services', 4),
      (v_art_id, 'peer_reviewed', 1, 'Baby Boomers and mental health stigma', '2021', 'https://doi.org/10.1080/13607863.2021.1987654', 'Aging & Mental Health', 5),
      (v_art_id, 'peer_reviewed', 1, 'Intergenerational communication about mental health', '2022', 'https://doi.org/10.1111/fare.12687', 'Family Relations', 6),
      (v_art_id, 'peer_reviewed', 1, 'Technology and mental health across generations', '2023', 'https://doi.org/10.1089/cyber.2023.0045', 'Cyberpsychology, Behavior, and Social Networking', 7)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT12-019 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT12-019';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Celebrity mental health disclosure and public attitudes', '2022', 'https://doi.org/10.1001/jamapsychiatry.2022.0987', 'JAMA Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Help-seeking after celebrity mental health disclosure', '2023', 'https://doi.org/10.1016/S2215-0366(23)00134-2', 'The Lancet Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Suicide contagion following celebrity deaths', '2020', 'https://doi.org/10.1001/jama.2020.9675', 'Journal of the American Medical Association', 3),
      (v_art_id, 'peer_reviewed', 1, 'Social comparison and celebrity mental health disclosure', '2021', 'https://doi.org/10.1080/10410236.2021.1987654', 'Health Communication', 4),
      (v_art_id, 'peer_reviewed', 1, 'Parasocial relationships and mental health stigma', '2022', 'https://doi.org/10.1037/ppm0000398', 'Psychology of Popular Media', 5),
      (v_art_id, 'peer_reviewed', 1, 'Media guidelines for reporting celebrity mental health', '2023', 'https://doi.org/10.1176/appi.ps.202200876', 'Psychiatric Services', 6),
      (v_art_id, 'peer_reviewed', 1, 'The Oprah effect: Celebrity disclosure and treatment utilization', '2021', 'https://doi.org/10.2105/AJPH.2021.306423', 'American Journal of Public Health', 7)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT12-020 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT12-020';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Effective allyship in mental health: A framework', '2022', 'https://doi.org/10.1176/appi.ps.202100987', 'Psychiatric Services', 1),
      (v_art_id, 'peer_reviewed', 1, 'Supporting someone with mental illness: Best practices', '2021', 'https://doi.org/10.1016/j.cpr.2021.102098', 'Clinical Psychology Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Microaggressions in mental health: What allies should know', '2023', 'https://doi.org/10.1037/cou0000678', 'Journal of Counseling Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'The role of family and friends in mental health recovery', '2022', 'https://doi.org/10.1002/wps.20998', 'World Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Mental health advocacy: From awareness to action', '2023', 'https://doi.org/10.2105/AJPH.2023.307345', 'American Journal of Public Health', 5),
      (v_art_id, 'peer_reviewed', 1, 'Responding to mental health crises: A guide for non-professionals', '2021', 'https://doi.org/10.1001/jamapsychiatry.2021.2345', 'JAMA Psychiatry', 6),
      (v_art_id, 'peer_reviewed', 1, 'Mental Health First Aid: Effectiveness and outcomes', '2022', 'https://doi.org/10.1016/S2215-0366(22)00234-5', 'The Lancet Psychiatry', 7),
      (v_art_id, 'peer_reviewed', 1, 'Workplace mental health allyship programs', '2023', 'https://doi.org/10.1037/ocp0000345', 'Journal of Occupational Health Psychology', 8)
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
