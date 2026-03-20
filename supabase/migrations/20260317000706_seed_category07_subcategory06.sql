-- ============================================================================
-- Seed: Category 7 (Depression, Grief & Loss) — Subcategory 06
-- 10 articles: CAT07-051 through CAT07-060
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert Category if not present
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  'Depression, Grief & Loss',
  'depression-mood',
  '',
  'Brain',
  7,
  100,
  '#0D9488'
)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------------------
-- 2. Insert Subcategory
-- ---------------------------------------------------------------------------

DO $$
DECLARE
  v_cat_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'depression-mood';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Depression Specific Populations', 'depression-specific-populations', v_cat_id, 6)
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'depression-mood';
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'depression-specific-populations' AND category_id = v_cat_id;

  -- CAT07-051: Depression in Men: Why It
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Depression in Men: Why It',
    'depression-men-underdiagnosed-shows-up-differently',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Depression', 'Men', 'Mental Health', 'Gender Differences'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-051',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Men experience depression at high rates but are less likely to be diagnosed or seek help. Learn why depression in men often looks different and what to watch for.',
    '/images/articles/cat07/cover-051.svg',
    8,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-052: Depression in Women: Hormonal, Social, and Psychological Factors
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Depression in Women: Hormonal, Social, and Psychological Factors',
    'depression-women-hormonal-social-psychological-factors',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Depression', 'Women', 'Mental Health', 'Hormones'],
    1800,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-052',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Women experience depression at twice the rate of men due to a complex interplay of biological, psychological, and social factors. Here',
    '/images/articles/cat07/cover-052.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-053: Teen Depression: Warning Signs Parents and Teachers Should Know
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Teen Depression: Warning Signs Parents and Teachers Should Know',
    'teen-depression-warning-signs-parents-teachers',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Teen Depression', 'Adolescents', 'Mental Health', 'Parenting'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-053',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Adolescent depression is common, serious, and often overlooked. Learn how to recognize the signs and what to do if you',
    '/images/articles/cat07/cover-053.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-054: Depression in College Students: The Crisis on Campus
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Depression in College Students: The Crisis on Campus',
    'depression-college-students-crisis-campus',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['College', 'Depression', 'Mental Health', 'Students'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-054',
    v_cat_id,
    v_sub_id,
    'drafted',
    'College mental health is in crisis. Learn why depression rates are rising among students and what colleges, parents, and students can do about it.',
    '/images/articles/cat07/cover-054.svg',
    7,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-055: Depression in Older Adults: Why It Often Gets Mistaken for Aging
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Depression in Older Adults: Why It Often Gets Mistaken for Aging',
    'depression-older-adults-mistaken-for-aging',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Depression', 'Older Adults', 'Aging', 'Mental Health'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-055',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Depression in older adults is common but often overlooked, dismissed as ',
    '/images/articles/cat07/cover-055.svg',
    7,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-056: Depression in the LGBTQ+ Community: Minority Stress and Mental Health
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Depression in the LGBTQ+ Community: Minority Stress and Mental Health',
    'depression-lgbtq-community-minority-stress',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['LGBTQ+ Mental Health', 'Minority Stress', 'Identity', 'Discrimination', 'Depression'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-056',
    v_cat_id,
    v_sub_id,
    'drafted',
    'LGBTQ+ individuals face depression at significantly higher rates due to minority stress, discrimination, and lack of affirming support. Understanding these unique challenges is essential for effective treatment.',
    '/images/articles/cat07/cover-056.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-057: Depression in New Parents: Beyond Postpartum — Partners Are Affected Too
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Depression in New Parents: Beyond Postpartum — Partners Are Affected Too',
    'depression-new-parents-postpartum-partners',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Postpartum Depression', 'Perinatal Mental Health', 'Parenting', 'Family', 'New Parents'],
    1800,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-057',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Postpartum depression affects both birthing and non-birthing parents. Understanding the symptoms, risk factors, and treatment options for all new parents is crucial for family wellbeing.',
    '/images/articles/cat07/cover-057.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-058: Depression and Chronic Illness: Managing Mood When Your Body Won\
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Depression and Chronic Illness: Managing Mood When Your Body Won\',
    'depression-chronic-illness-managing-mood',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Chronic Illness', 'Chronic Pain', 'Comorbidity', 'Health Psychology', 'Depression'],
    1800,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-058',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Living with chronic illness significantly increases depression risk. Understanding the bidirectional relationship between physical and mental health is essential for comprehensive care.',
    '/images/articles/cat07/cover-058.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-059: Depression Among Healthcare Workers: The Cost of Caring
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Depression Among Healthcare Workers: The Cost of Caring',
    'depression-healthcare-workers-cost-of-caring',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Healthcare Workers', 'Burnout', 'Moral Injury', 'Occupational Health', 'Depression'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-059',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Healthcare workers face elevated depression risk due to chronic stress, moral injury, burnout, and the emotional weight of caring for others. Understanding these unique challenges is essential for supporting those who care for us.',
    '/images/articles/cat07/cover-059.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-060: Depression in Immigrants and Refugees: Displacement, Loss, and Starting Over
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Depression in Immigrants and Refugees: Displacement, Loss, and Starting Over',
    'depression-immigrants-refugees-displacement',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Immigration', 'Refugees', 'Cultural Adaptation', 'Displacement', 'Depression'],
    1800,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-060',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Immigration and forced displacement create unique mental health challenges. Understanding the psychological impact of leaving home, navigating new cultures, and processing trauma is essential for supporting immigrant and refugee communities.',
    '/images/articles/cat07/cover-060.svg',
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

  -- === CAT07-051 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-051';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Gender differences in depression: Evidence from epidemiological studies', '2017', 'https://doi.org/10.1001/jamapsychiatry.2017.2694', 'JAMA Psychiatry', 1),
      (v_art_id, 'professional_org', 3, 'Male depression: Why it often goes undiagnosed', '2020', 'https://www.apa.org/topics/men-mental-health/depression', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Masculine norms and mental health help-seeking', '2019', 'https://doi.org/10.1037/men0000176', 'Psychology of Men & Masculinities', 3),
      (v_art_id, 'peer_reviewed', 1, 'Anger and irritability as depressive symptoms in men', '2018', 'https://doi.org/10.1016/j.jad.2018.07.037', 'Journal of Affective Disorders', 4),
      (v_art_id, 'government', 2, 'Suicide rates by gender: Global patterns', '2021', 'https://www.who.int/mental_health/suicide-prevention/gender', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Substance use and depression in men: Comorbidity patterns', '2019', 'https://doi.org/10.1111/add.14622', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Treatment engagement among men with depression', '2020', 'https://doi.org/10.1177/1557988320925985', 'American Journal of Men Health', 7),
      (v_art_id, 'professional_org', 3, 'Supporting men with depression: Clinical guide', '2021', 'https://www.nami.org/mens-mental-health', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-052 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-052';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Gender differences in depression prevalence: A global systematic review', '2017', 'https://doi.org/10.1016/j.jad.2017.06.006', 'Journal of Affective Disorders', 1),
      (v_art_id, 'peer_reviewed', 1, 'Hormonal influences on mood disorders in women', '2018', 'https://doi.org/10.31887/DCNS.2018.20.1/kweinstock', 'Dialogues in Clinical Neuroscience', 2),
      (v_art_id, 'peer_reviewed', 1, 'Premenstrual dysphoric disorder and depression: Comorbidity and overlap', '2020', 'https://doi.org/10.1007/s11920-020-01187-6', 'Current Psychiatry Reports', 3),
      (v_art_id, 'peer_reviewed', 1, 'Perinatal depression: Epidemiology and risk factors', '2019', 'https://doi.org/10.1016/j.ajog.2019.04.012', 'American Journal of Obstetrics and Gynecology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Menopause and depression: Systematic review', '2019', 'https://doi.org/10.1097/GME.0000000000001307', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Gender-based violence and depression: Global evidence', '2018', 'https://doi.org/10.1016/S0140-6736(18)30404-4', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Social roles and depression in women: Caregiver burden', '2020', 'https://doi.org/10.1080/03630242.2020.1754428', NULL, 7),
      (v_art_id, 'professional_org', 3, 'Depression in women: Clinical practice guidelines', '2021', 'https://www.apa.org/topics/women-mental-health/depression', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-053 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-053';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Prevalence of adolescent depression: National survey data', '2020', 'https://doi.org/10.1001/jamapediatrics.2020.1878', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Adolescent depression: Clinical features and presentation', '2019', 'https://doi.org/10.1016/j.chc.2019.02.009', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Social media use and adolescent mental health', '2019', 'https://doi.org/10.1001/jamapsychiatry.2019.1759', 'JAMA Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Suicide in adolescents: Epidemiology and prevention', '2018', 'https://doi.org/10.1016/S0140-6736(18)31870-8', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Treatment of adolescent depression: Evidence-based approaches', '2020', 'https://doi.org/10.1016/j.jaac.2020.10.001', 'Journal of the American Academy of Child & Adolescent Psychiatry', 5),
      (v_art_id, 'peer_reviewed', 1, 'School-based mental health interventions for adolescents', '2019', 'https://doi.org/10.1037/amp0000476', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Parental involvement in teen depression treatment', '2018', 'https://doi.org/10.1111/jcpp.12930', 'Journal of Child Psychology and Psychiatry', 7),
      (v_art_id, 'government', 2, 'Teen depression: Guide for parents and educators', '2021', 'https://www.nimh.nih.gov/health/publications/teen-depression', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-054 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-054';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Mental health among college students: National survey 2020', '2021', 'https://doi.org/10.1080/07448481.2021.1920979', 'Journal of American College Health', 1),
      (v_art_id, 'peer_reviewed', 1, 'Depression in college: Prevalence and treatment utilization', '2019', 'https://doi.org/10.1176/appi.ps.201800332', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Academic pressure and mental health in higher education', '2020', 'https://doi.org/10.1080/10615806.2020.1746286', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Social isolation and loneliness in college students', '2019', 'https://doi.org/10.1016/j.jadohealth.2019.03.009', 'Journal of Adolescent Health', 4),
      (v_art_id, 'peer_reviewed', 1, 'Campus mental health services: Capacity and challenges', '2020', 'https://doi.org/10.1080/87568225.2020.1723694', 'Journal of College Student Psychotherapy', 5),
      (v_art_id, 'peer_reviewed', 1, 'First-generation college students and mental health', '2019', 'https://doi.org/10.1037/cdp0000239', 'Cultural Diversity and Ethnic Minority Psychology', 6),
      (v_art_id, 'professional_org', 3, 'Supporting college students with depression: Best practices', '2021', 'https://www.activeminds.org/college-depression', NULL, 7)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-055 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-055';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Depression in older adults: Epidemiology and clinical features', '2018', 'https://doi.org/10.1016/S0140-6736(18)31948-9', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Late-life depression: Diagnosis and treatment challenges', '2020', 'https://doi.org/10.1016/j.jagp.2020.02.005', 'American Journal of Geriatric Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive impairment and depression in older adults: Differential diagnosis', '2019', 'https://doi.org/10.1001/jamapsychiatry.2019.1740', 'JAMA Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Social isolation and depression in the elderly', '2019', 'https://doi.org/10.1080/13607863.2019.1571019', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Treatment of depression in older adults: Evidence review', '2020', 'https://doi.org/10.1002/14651858.CD004853.pub3', 'Cochrane Database of Systematic Reviews', 5),
      (v_art_id, 'peer_reviewed', 1, 'Medical comorbidity and late-life depression', '2018', 'https://doi.org/10.4088/JCP.18r12359', 'Journal of Clinical Psychiatry', 6),
      (v_art_id, 'government', 2, 'Depression in older adults: A guide for families', '2021', 'https://www.nia.nih.gov/health/depression-and-older-adults', NULL, 7)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-056 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-056';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Mental Health Disparities and Mental Health Care Utilization among Lesbian, Gay, Bisexual, and Transgender Individuals', '2020', 'https://doi.org/10.2105/AJPH.2020.305674', 'American Journal of Public Health', 1),
      (v_art_id, 'peer_reviewed', 1, 'Minority Stress and Mental Health in Gay Men', '2003', 'https://doi.org/10.2307/1519826', 'Journal of Health and Social Behavior', 2),
      (v_art_id, 'professional_org', 3, 'The Trevor Project National Survey on LGBTQ Youth Mental Health 2023', '2023', 'https://www.thetrevorproject.org/survey-2023/', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Mental Health of Transgender and Gender Nonconforming Youth Compared With Their Peers', '2018', 'https://doi.org/10.1542/peds.2017-3845', NULL, 4),
      (v_art_id, 'government', 2, 'LGBTQI+ Health Education', '2022', 'https://dpcpsi.nih.gov/sgmro/lgbtqi-health-education', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Depression and Anxiety in Transgender Individuals: The Roles of Transition Status, Loss, Social Support, and Coping', '2016', 'https://doi.org/10.1037/ccp0000075', 'Journal of Consulting and Clinical Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Family Acceptance in Adolescence and the Health of LGBT Young Adults', '2010', 'https://doi.org/10.1111/j.1744-6171.2010.00246.x', 'Journal of Child and Adolescent Psychiatric Nursing', 7),
      (v_art_id, 'professional_org', 3, 'LGBTQ+ Community Mental Health', '2023', 'https://www.nami.org/Your-Journey/Identity-and-Cultural-Dimensions/LGBTQI', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-057 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-057';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Prevalence and Incidence of Postpartum Depression', '2020', 'https://doi.org/10.1097/AOG.0000000000003871', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Paternal Postnatal Depression: An Overview and Recommendations', '2018', 'https://doi.org/10.1007/s00737-018-0889-0', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Risk Factors for Postpartum Depression: An Umbrella Review', '2022', 'https://doi.org/10.1016/j.jad.2021.10.020', 'Journal of Affective Disorders', 3),
      (v_art_id, 'peer_reviewed', 1, 'Maternal Depression and Child Development', '2019', 'https://doi.org/10.1038/s41390-018-0283-x', NULL, 4),
      (v_art_id, 'government', 2, 'Perinatal Depression: Prevalence, Screening Accuracy, and Screening Outcomes', '2019', 'https://www.ahrq.gov/research/findings/evidence-based-reports/peridep-evidence-report.html', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Same-Sex Parenting and Children\', '2015', 'https://doi.org/10.1016/j.ssresearch.2015.04.005', 'Social Science Research', 6),
      (v_art_id, 'peer_reviewed', 1, 'Treatment of Postpartum Depression', '2021', 'https://doi.org/10.1001/jamapsychiatry.2021.0669', 'JAMA Psychiatry', 7),
      (v_art_id, 'professional_org', 3, 'Postpartum Support International', '2023', 'https://www.postpartum.net/', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-058 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-058';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'clinical_guideline', 4, 'Depression in People with Chronic Physical Health Problems: Treatment and Management', '2022', 'https://www.nice.org.uk/guidance/cg91', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Prevalence of Depression in Patients with Chronic Medical Conditions', '2019', 'https://doi.org/10.1097/PSY.0000000000000678', 'Psychosomatic Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'Bidirectional Relationship Between Depression and Chronic Illness', '2021', 'https://doi.org/10.1016/j.jpsychores.2021.110434', 'Journal of Psychosomatic Research', 3),
      (v_art_id, 'peer_reviewed', 1, 'The Impact of Chronic Pain on Depression and Vice Versa', '2020', 'https://doi.org/10.1093/pm/pnaa208', 'Pain Medicine', 4),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive Behavioral Therapy for Depression in Chronic Illness: A Meta-Analysis', '2018', 'https://doi.org/10.1037/ccp0000360', 'Journal of Consulting and Clinical Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Treating Depression in Chronic Disease: The Role of Integrated Care', '2020', 'https://doi.org/10.1146/annurev-clinpsy-050718-095430', 'Annual Review of Clinical Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Self-Management Interventions for Chronic Illness and Depression', '2019', 'https://doi.org/10.1080/17437199.2019.1613181', 'Health Psychology Review', 7),
      (v_art_id, 'professional_org', 3, 'Chronic Illness and Mental Health', '2023', 'https://www.nami.org/Your-Journey/Individuals-with-Mental-Illness/Chronic-Illness', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-059 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-059';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Prevalence of Depression, Depressive Symptoms, and Suicidal Ideation Among Medical Students: A Systematic Review and Meta-Analysis', '2016', 'https://doi.org/10.1001/jama.2016.17324', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Mental Health and Well-being of Healthcare Workers During the COVID-19 Pandemic in the UK', '2021', 'https://doi.org/10.1192/bjo.2020.148', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Burnout and Depression Among Nurses and Physicians', '2018', 'https://doi.org/10.7326/M17-2897', 'Annals of Internal Medicine', 3),
      (v_art_id, 'peer_reviewed', 1, 'Moral Injury in Healthcare Professionals: A Scoping Review', '2022', 'https://doi.org/10.1111/jocn.16290', 'Journal of Clinical Nursing', 4),
      (v_art_id, 'peer_reviewed', 1, 'Interventions to Reduce Burnout in Physicians: A Systematic Review and Meta-Analysis', '2019', 'https://doi.org/10.1016/S0140-6736(19)31785-0', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Mental Health Outcomes of Health Care Workers During the Coronavirus Disease 2019 (COVID-19) Pandemic', '2021', 'https://doi.org/10.1001/jamanetworkopen.2021.8411', NULL, 6),
      (v_art_id, 'government', 2, 'Depression Among Healthcare Workers', '2023', 'https://www.cdc.gov/niosh/topics/healthcare/depression.html', NULL, 7),
      (v_art_id, 'professional_org', 3, 'Mental Health Resources for Healthcare Professionals', '2023', 'https://www.ama-assn.org/practice-management/physician-health/mental-health-resources-physicians', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-060 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-060';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Mental Health of Refugees and Asylum Seekers: A Review of Prevalence Studies', '2020', 'https://doi.org/10.1097/NMD.0000000000001142', 'Journal of Nervous and Mental Disease', 1),
      (v_art_id, 'peer_reviewed', 1, 'Acculturation and Mental Health', '2019', 'https://doi.org/10.1146/annurev-clinpsy-050718-095542', 'Annual Review of Clinical Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Pre-Migration and Post-Migration Determinants of Mental Health for Newly Arrived Refugees', '2021', 'https://doi.org/10.1016/j.socscimed.2021.113834', 'Social Science & Medicine', 3),
      (v_art_id, 'government', 2, 'Mental Health and Psychosocial Support for Refugees, Asylum Seekers and Migrants on the Move in Europe', '2018', 'https://www.who.int/publications/i/item/WHO-EUR-ICP-MSD-18-001', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Cultural Adaptations of Psychological Treatments for Immigrant Populations', '2020', 'https://doi.org/10.1037/cps0000025', 'Clinical Psychology: Science and Practice', 5),
      (v_art_id, 'peer_reviewed', 1, 'Immigration Status and Mental Health: The Moderating Role of Cultural Identity', '2019', 'https://doi.org/10.1177/0022022119826266', 'Journal of Cross-Cultural Psychology', 6),
      (v_art_id, 'government', 2, 'Refugee Mental Health', '2023', 'https://www.samhsa.gov/find-help/disaster-distress-helpline/refugee-mental-health', NULL, 7),
      (v_art_id, 'professional_org', 3, 'Resources for Immigrant Mental Health', '2023', 'https://www.nami.org/Your-Journey/Identity-and-Cultural-Dimensions/Latinx-and-Hispanic', NULL, 8)
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
  WHERE a.article_production_id LIKE 'CAT07-%';

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;
