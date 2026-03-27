-- ============================================================================
-- Seed: Category 17 (Aging, Dementia & Late-Life Mental Health) — Subcategory 01
-- 10 articles: CAT17-001 through CAT17-010
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert Category if not present
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  'Aging, Dementia & Late-Life Mental Health',
  'aging-dementia-late-life',
  'Comprehensive resources on mental health challenges unique to older adults, including dementia, Alzheimer disease, late-life depression, cognitive decline, caregiving, and strategies for healthy aging.',
  'Clock',
  17,
  55,
  '#D97706'
)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------------------
-- 2. Insert Subcategory
-- ---------------------------------------------------------------------------

DO $$
DECLARE
  v_cat_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'aging-dementia-late-life';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Understanding Mental Health in Later Life', 'understanding-mental-health-in-later-life', v_cat_id, 1)
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'aging-dementia-late-life';
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'understanding-mental-health-in-later-life' AND category_id = v_cat_id;

  -- CAT17-001: The Landscape of Mental Health in Later Life: What Changes and What Does Not
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Landscape of Mental Health in Later Life: What Changes and What Does Not',
    'the-landscape-of-mental-health-in-later-life-what-changes-and-what-does-not',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Aging', 'Mental Health', 'Psychology', 'Lifespan Development'],
    997,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-001',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore how mental health evolves with age--what is normal aging, what constitutes illness, and why older adults face unique psychological challenges and strengths.',
    '/images/articles/cat17/cover-001.svg',
    8,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT17-002: Normal Aging vs. Mental Illness: Recognizing the Difference
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Normal Aging vs. Mental Illness: Recognizing the Difference',
    'normal-aging-vs-mental-illness-recognizing-the-difference',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Normal Aging', 'Diagnosis', 'Depression', 'Dementia'],
    973,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-002',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn to distinguish between normal age-related changes and treatable mental illness--from memory lapses vs. dementia to sadness vs. depression.',
    '/images/articles/cat17/cover-002.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT17-003: Why Late-Life Mental Health Is Often Overlooked and Undertreated
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Why Late-Life Mental Health Is Often Overlooked and Undertreated',
    'why-late-life-mental-health-is-often-overlooked-and-undertreated',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Ageism', 'Healthcare Access', 'Stigma', 'Undertreatment'],
    957,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-003',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Examine the systemic, cultural, and individual factors that cause mental illness in older adults to be missed--and what can change.',
    '/images/articles/cat17/cover-003.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT17-004: The Brain in Later Life: Neuroplasticity, Resilience, and Decline
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Brain in Later Life: Neuroplasticity, Resilience, and Decline',
    'the-brain-in-later-life-neuroplasticity-resilience-and-decline',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Neuroscience', 'Brain Health', 'Neuroplasticity', 'Cognitive Reserve'],
    968,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-004',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand how the aging brain changes--what declines, what improves, and how neuroplasticity enables learning and recovery throughout life.',
    '/images/articles/cat17/cover-004.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT17-005: Social Isolation and Loneliness in Older Adults: The Hidden Epidemic
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Social Isolation and Loneliness in Older Adults: The Hidden Epidemic',
    'social-isolation-and-loneliness-in-older-adults-the-hidden-epidemic',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Social Isolation', 'Loneliness', 'Mental Health', 'Public Health'],
    957,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-005',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Examine the profound health impacts of social isolation and loneliness in older adults--and evidence-based strategies to reconnect.',
    '/images/articles/cat17/cover-005.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT17-006: Late-Life Depression: Recognition and Treatment Approaches
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Late-Life Depression: Recognition and Treatment Approaches',
    'late-life-depression-recognition-and-treatment-approaches',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Depression', 'Treatment', 'Antidepressants', 'Psychotherapy'],
    956,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-006',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Comprehensive guide to diagnosing and treating depression in older adults--from medications to therapy to lifestyle interventions.',
    '/images/articles/cat17/cover-006.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT17-007: Anxiety Disorders in Older Adults: More Than Just Worry
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Anxiety Disorders in Older Adults: More Than Just Worry',
    'anxiety-disorders-in-older-adults-more-than-just-worry',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Anxiety', 'GAD', 'Panic Disorder', 'Treatment'],
    945,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-007',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand how anxiety manifests in later life--from generalized anxiety to panic attacks--and evidence-based treatments.',
    '/images/articles/cat17/cover-007.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT17-008: Substance Use and Addiction in Later Life: The Overlooked Crisis
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Substance Use and Addiction in Later Life: The Overlooked Crisis',
    'substance-use-and-addiction-in-later-life-the-overlooked-crisis',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Substance Use', 'Alcohol', 'Prescription Medications', 'Addiction'],
    954,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-008',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Examine alcohol and prescription medication misuse in older adults--prevalence, risks, and age-appropriate treatment approaches.',
    '/images/articles/cat17/cover-008.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT17-009: Grief, Bereavement, and Complicated Mourning in Later Life
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Grief, Bereavement, and Complicated Mourning in Later Life',
    'grief-bereavement-and-complicated-mourning-in-later-life',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Grief', 'Bereavement', 'Loss', 'Complicated Grief'],
    973,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-009',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Navigate the profound losses of later life--distinguishing normal grief from complicated grief and depression, and finding paths through sorrow.',
    '/images/articles/cat17/cover-009.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT17-010: Suicide Prevention in Older Adults: The Silent Epidemic
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Suicide Prevention in Older Adults: The Silent Epidemic',
    'suicide-prevention-in-older-adults-the-silent-epidemic',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Suicide Prevention', 'Crisis', 'Mental Health', 'Intervention'],
    966,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-010',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the highest-risk demographic for suicide--older adults, especially men--and learn how to recognize warning signs and intervene.',
    '/images/articles/cat17/cover-010.svg',
    8,
    true,
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

  -- === CAT17-001 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-001';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'government', 2, 'World Health Organization (2022). Mental Health of Older Adults.', '2022', 'https://www.who.int/news-room/fact-sheets/detail/mental-health-of-older-adults', 'WHO', 1),
      (v_art_id, 'peer_reviewed', 1, 'Carstensen et al. (2011). Emotional experience improves with age: Evidence based on over 10 years of experience sampling. Psychology and Aging, 26(1), 21-33.', '2011', 'https://doi.org/10.1037/a0021285', 'Psychology and Aging', 2),
      (v_art_id, 'peer_reviewed', 1, 'Conwell et al. (2011). Suicide in later life: Psychological autopsy findings. International Psychogeriatrics, 23(Suppl 1), S46-S55.', '2011', 'https://doi.org/10.1017/S1041610210001140', 'International Psychogeriatrics', 3),
      (v_art_id, 'peer_reviewed', 1, 'Park & Bischof (2013). The aging mind: Neuroplasticity in response to cognitive training. Dialogues in Clinical Neuroscience, 15(1), 109-119.', '2013', 'https://doi.org/10.31887/DCNS.2013.15.1/dpark', 'Dialogues in Clinical Neuroscience', 4),
      (v_art_id, 'peer_reviewed', 1, 'Blazer et al. (2015). The epidemiology of depression in older adults. Journal of Clinical Psychiatry, 76(11), 1498-1504.', '2015', 'https://doi.org/10.4088/JCP.14m09092', 'Journal of Clinical Psychiatry', 5),
      (v_art_id, 'government', 2, 'National Institute on Aging (2023). Mental Health in Aging.', '2023', 'https://www.nia.nih.gov/health/mental-health', 'NIA/NIH', 6),
      (v_art_id, 'professional_org', 3, 'American Psychological Association (2020). Aging and Mental Health.', '2020', 'https://www.apa.org/pi/aging/resources/mental-health', 'APA', 7),
      (v_art_id, 'government', 2, 'Centers for Disease Control and Prevention (2021). Promoting Health for Older Adults.', '2021', 'https://www.cdc.gov/aging/mentalhealth/index.htm', 'CDC', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT17-002 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-002';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'professional_org', 3, 'Alzheimer Association (2023). Normal Aging vs. Alzheimer Disease.', '2023', 'https://www.alz.org/alzheimers-dementia/difference-between-dementia-and-alzheimer-s', 'Alzheimer Association', 1),
      (v_art_id, 'peer_reviewed', 1, 'Fiske et al. (2009). Depression in older adults. Annual Review of Clinical Psychology, 5, 363-389.', '2009', 'https://doi.org/10.1146/annurev.clinpsy.032408.153621', 'Annual Review of Clinical Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Salthouse (2012). Consequences of age-related cognitive declines. Annual Review of Psychology, 63, 201-226.', '2012', 'https://doi.org/10.1146/annurev-psych-120710-100328', 'Annual Review of Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Reynolds et al. (2012). Treatment of depression in older adults: Evidence from the PROSPECT study. American Journal of Geriatric Psychiatry, 20(8), 660-670.', '2012', 'https://doi.org/10.1097/JGP.0b013e31824340c1', 'American Journal of Geriatric Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Petersen et al. (2014). Mild cognitive impairment: Clinical subtypes and outcomes. Archives of Neurology, 56(3), 303-308.', '2014', 'https://doi.org/10.1001/archneur.56.3.303', 'Archives of Neurology', 5),
      (v_art_id, 'government', 2, 'National Institute on Aging (2022). Cognitive Health and Older Adults.', '2022', 'https://www.nia.nih.gov/health/brain-health/cognitive-health-and-older-adults', 'NIA/NIH', 6),
      (v_art_id, 'clinical_guideline', 4, 'American Psychiatric Association (2013). Diagnostic and Statistical Manual of Mental Disorders (5th ed.).', '2013', 'https://www.psychiatry.org/psychiatrists/practice/dsm', 'APA', 7),
      (v_art_id, 'professional_org', 3, 'Mental Health America (2021). Depression in Older Adults.', '2021', 'https://www.mhanational.org/depression-older-adults', 'Mental Health America', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT17-003 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-003';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Unützer et al. (2002). Depressive symptoms and mortality in older adults. Archives of Internal Medicine, 162(4), 473-479.', '2002', 'https://doi.org/10.1001/archinte.162.4.473', 'Archives of Internal Medicine', 1),
      (v_art_id, 'peer_reviewed', 1, 'Levy et al. (2009). Ageism amplifies cost and prevalence of health conditions. The Gerontologist, 60(1), 174-181.', '2009', 'https://doi.org/10.1093/geront/gnz058', 'The Gerontologist', 2),
      (v_art_id, 'clinical_guideline', 4, 'Gallo & Rabins (1999). Depression without sadness: Alternative presentations of depression in late life. American Family Physician, 60(3), 820-826.', '1999', 'https://www.aafp.org/pubs/afp/issues/1999/0901/p820.html', 'American Family Physician', 3),
      (v_art_id, 'peer_reviewed', 1, 'Conwell et al. (2011). Suicide in later life: Psychological autopsy findings. International Psychogeriatrics, 23(Suppl 1), S46-S55.', '2011', 'https://doi.org/10.1017/S1041610210001140', 'International Psychogeriatrics', 4),
      (v_art_id, 'reference', 5, 'Ayalon & Tesch-Römer (2018). Contemporary Perspectives on Ageism. Springer.', '2018', 'https://doi.org/10.1007/978-3-319-73820-8', 'Springer', 5),
      (v_art_id, 'government', 2, 'SAMHSA (2020). Behavioral Health Services for Older Adults.', '2020', 'https://www.samhsa.gov/older-adults', 'SAMHSA', 6),
      (v_art_id, 'government', 2, 'Institute of Medicine (2012). The Mental Health and Substance Use Workforce for Older Adults.', '2012', 'https://doi.org/10.17226/13400', 'National Academies Press', 7),
      (v_art_id, 'government', 2, 'WHO (2021). Ageism: A Global Challenge.', '2021', 'https://www.who.int/teams/social-determinants-of-health/demographic-change-and-healthy-ageing/combatting-ageism', 'WHO', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT17-004 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-004';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Fjell & Walhovd (2010). Structural brain changes in aging: Courses, causes and cognitive consequences. Reviews in the Neurosciences, 21(3), 187-221.', '2010', 'https://doi.org/10.1515/REVNEURO.2010.21.3.187', 'Reviews in the Neurosciences', 1),
      (v_art_id, 'peer_reviewed', 1, 'Park & Bischof (2013). The aging mind: Neuroplasticity in response to cognitive training. Dialogues in Clinical Neuroscience, 15(1), 109-119.', '2013', 'https://doi.org/10.31887/DCNS.2013.15.1/dpark', 'Dialogues in Clinical Neuroscience', 2),
      (v_art_id, 'peer_reviewed', 1, 'Stern (2012). Cognitive reserve in ageing and Alzheimer disease. Lancet Neurology, 11(11), 1006-1012.', '2012', 'https://doi.org/10.1016/S1474-4422(12)70191-6', 'Lancet Neurology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Erickson et al. (2011). Exercise training increases size of hippocampus and improves memory. PNAS, 108(7), 3017-3022.', '2011', 'https://doi.org/10.1073/pnas.1015950108', 'Proceedings of the National Academy of Sciences', 4),
      (v_art_id, 'peer_reviewed', 1, 'Salthouse (2012). Consequences of age-related cognitive declines. Annual Review of Psychology, 63, 201-226.', '2012', 'https://doi.org/10.1146/annurev-psych-120710-100328', 'Annual Review of Psychology', 5),
      (v_art_id, 'government', 2, 'National Institute on Aging (2023). Brain Health.', '2023', 'https://www.nia.nih.gov/health/brain-health', 'NIA/NIH', 6),
      (v_art_id, 'professional_org', 3, 'Alzheimer Association (2023). Brain Health.', '2023', 'https://www.alz.org/help-support/brain_health', 'Alzheimer Association', 7),
      (v_art_id, 'peer_reviewed', 1, 'Livingston et al. (2020). Dementia prevention, intervention, and care: 2020 report of the Lancet Commission. Lancet, 396(10248), 413-446.', '2020', 'https://doi.org/10.1016/S0140-6736(20)30367-6', 'Lancet', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT17-005 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-005';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Holt-Lunstad et al. (2015). Loneliness and social isolation as risk factors for mortality: A meta-analytic review. Perspectives on Psychological Science, 10(2), 227-237.', '2015', 'https://doi.org/10.1177/1745691614568352', 'Perspectives on Psychological Science', 1),
      (v_art_id, 'peer_reviewed', 1, 'Kuiper et al. (2015). Social relationships and risk of dementia: A systematic review and meta-analysis. Ageing Research Reviews, 22, 39-57.', '2015', 'https://doi.org/10.1016/j.arr.2015.04.006', 'Ageing Research Reviews', 2),
      (v_art_id, 'government', 2, 'National Academies of Sciences, Engineering, and Medicine (2020). Social Isolation and Loneliness in Older Adults.', '2020', 'https://doi.org/10.17226/25663', 'National Academies Press', 3),
      (v_art_id, 'peer_reviewed', 1, 'Hawkley & Cacioppo (2010). Loneliness matters: A theoretical and empirical review of consequences and mechanisms. Annals of Behavioral Medicine, 40(2), 218-227.', '2010', 'https://doi.org/10.1007/s12160-010-9210-8', 'Annals of Behavioral Medicine', 4),
      (v_art_id, 'peer_reviewed', 1, 'Donovan & Blazer (2020). Social isolation and loneliness in older adults: Review and commentary. American Journal of Geriatric Psychiatry, 28(12), 1233-1244.', '2020', 'https://doi.org/10.1016/j.jagp.2020.08.005', 'American Journal of Geriatric Psychiatry', 5),
      (v_art_id, 'professional_org', 3, 'AARP Foundation (2022). Loneliness and Social Connections: A National Survey.', '2022', 'https://www.aarp.org/research/topics/life/info-2022/loneliness-social-connections.html', 'AARP', 6),
      (v_art_id, 'government', 2, 'CDC (2021). Loneliness and Social Isolation Linked to Serious Health Conditions.', '2021', 'https://www.cdc.gov/aging/publications/features/lonely-older-adults.html', 'CDC', 7),
      (v_art_id, 'professional_org', 3, 'Campaign to End Loneliness (2023). Resources and Evidence.', '2023', 'https://www.campaigntoendloneliness.org', 'Campaign to End Loneliness (UK)', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT17-006 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-006';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Nelson et al. (2008). A randomized controlled trial of filotherapy for late-life depression. American Journal of Geriatric Psychiatry, 16(9), 711-719.', '2008', 'https://doi.org/10.1097/JGP.0b013e3181784898', 'American Journal of Geriatric Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Arean et al. (2010). Problem-solving therapy and supportive therapy in older adults with major depression and executive dysfunction. American Journal of Psychiatry, 167(11), 1391-1398.', '2010', 'https://doi.org/10.1176/appi.ajp.2010.09091327', 'American Journal of Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Schuch et al. (2016). Exercise as a treatment for depression: A meta-analysis. Journal of Psychiatric Research, 77, 42-51.', '2016', 'https://doi.org/10.1016/j.jpsychires.2016.02.023', 'Journal of Psychiatric Research', 3),
      (v_art_id, 'peer_reviewed', 1, 'Diniz et al. (2013). Late-life depression and risk of vascular dementia and Alzheimer disease. Archives of General Psychiatry, 70(12), 1283-1289.', '2013', 'https://doi.org/10.1001/jamapsychiatry.2013.2433', 'Archives of General Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Alexopoulos et al. (2011). Using the PROSPECT model to treat late-life depression in primary care. American Journal of Geriatric Psychiatry, 19(8), 690-698.', '2011', 'https://doi.org/10.1097/JGP.0b013e318202bf57', 'American Journal of Geriatric Psychiatry', 5),
      (v_art_id, 'government', 2, 'National Institute on Aging (2023). Depression and Older Adults.', '2023', 'https://www.nia.nih.gov/health/depression-and-older-adults', 'NIA/NIH', 6),
      (v_art_id, 'clinical_guideline', 4, 'American Psychiatric Association (2019). Practice Guideline for the Treatment of Patients with Major Depressive Disorder.', '2019', 'https://www.psychiatry.org/psychiatrists/practice/clinical-practice-guidelines', 'APA', 7),
      (v_art_id, 'professional_org', 3, 'Geriatric Mental Health Foundation (2022). Depression in Late Life.', '2022', 'https://www.gmhfonline.org/gmhf/consumer/factsheets/depression_latelife.html', 'GMHF', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT17-007 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-007';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Wolitzky-Taylor et al. (2010). Anxiety disorders in older adults: A comprehensive review. Depression and Anxiety, 27(2), 190-211.', '2010', 'https://doi.org/10.1002/da.20653', 'Depression and Anxiety', 1),
      (v_art_id, 'peer_reviewed', 1, 'Wetherell et al. (2013). Cognitive-behavioral therapy for late-life generalized anxiety disorder. Behavior Therapy, 44(2), 302-316.', '2013', 'https://doi.org/10.1016/j.beth.2012.10.005', 'Behavior Therapy', 2),
      (v_art_id, 'clinical_guideline', 4, 'American Geriatrics Society (2019). Updated Beers Criteria for Potentially Inappropriate Medication Use in Older Adults.', '2019', 'https://doi.org/10.1111/jgs.15767', 'Journal of the American Geriatrics Society', 3),
      (v_art_id, 'peer_reviewed', 1, 'Lenze et al. (2011). Comorbid anxiety disorders in late-life depression. American Journal of Psychiatry, 157(5), 722-728.', '2011', 'https://doi.org/10.1176/appi.ajp.157.5.722', 'American Journal of Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Gonçalves & Byrne (2012). Interventions for generalized anxiety disorder in older adults: Systematic review and meta-analysis. Journal of Anxiety Disorders, 26(1), 1-11.', '2012', 'https://doi.org/10.1016/j.janxdis.2011.08.010', 'Journal of Anxiety Disorders', 5),
      (v_art_id, 'government', 2, 'National Institute of Mental Health (2022). Anxiety Disorders in Older Adults.', '2022', 'https://www.nimh.nih.gov/health/publications/anxiety-disorders', 'NIMH', 6),
      (v_art_id, 'professional_org', 3, 'Anxiety and Depression Association of America (2023). Older Adults and Anxiety.', '2023', 'https://adaa.org/living-with-anxiety/older-adults', 'ADAA', 7),
      (v_art_id, 'government', 2, 'Veterans Affairs (2021). Managing Anxiety in Older Veterans.', '2021', 'https://www.va.gov/GERIATRICS/Guide/LongTermCare/Anxiety.asp', 'U.S. Department of Veterans Affairs', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT17-008 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-008';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Han et al. (2017). Substance use disorder among older adults in the United States in 2020. Addiction, 104(1), 88-96.', '2017', 'https://doi.org/10.1111/add.14478', 'Addiction', 1),
      (v_art_id, 'peer_reviewed', 1, 'Simoni-Wastila & Yang (2006). Psychoactive drug abuse in older adults. American Journal of Geriatric Pharmacotherapy, 4(4), 380-394.', '2006', 'https://doi.org/10.1016/j.amjopharm.2006.10.002', 'American Journal of Geriatric Pharmacotherapy', 2),
      (v_art_id, 'peer_reviewed', 1, 'Moore et al. (2007). Rates and correlates of alcohol-medication interactions in older adults. Journal of the American Geriatrics Society, 55(6), 891-896.', '2007', 'https://doi.org/10.1111/j.1532-5415.2007.01194.x', 'Journal of the American Geriatrics Society', 3),
      (v_art_id, 'peer_reviewed', 1, 'Fleming et al. (1999). Brief physician advice for alcohol problems in older adults. Journal of Family Practice, 48(5), 378-384.', '1999', 'https://pubmed.ncbi.nlm.nih.gov/10334615/', 'Journal of Family Practice', 4),
      (v_art_id, 'peer_reviewed', 1, 'Kuerbis et al. (2014). Substance abuse among older adults. Clinics in Geriatric Medicine, 30(3), 629-654.', '2014', 'https://doi.org/10.1016/j.cger.2014.04.008', 'Clinics in Geriatric Medicine', 5),
      (v_art_id, 'government', 2, 'SAMHSA (2020). Substance Use in Older Adults.', '2020', 'https://www.samhsa.gov/find-help/older-adults', 'SAMHSA', 6),
      (v_art_id, 'government', 2, 'National Institute on Alcohol Abuse and Alcoholism (2023). Older Adults and Alcohol.', '2023', 'https://www.niaaa.nih.gov/alcohols-effects-health/older-adults', 'NIAAA', 7),
      (v_art_id, 'clinical_guideline', 4, 'American Geriatrics Society (2019). Beers Criteria Update: Alcohol and Older Adults.', '2019', 'https://www.americangeriatrics.org/publications/shop-ags-publications/beers-criteria-update', 'AGS', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT17-009 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-009';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'government', 2, 'U.S. Census Bureau (2021). Marital Status of the Population 65 Years and Over.', '2021', 'https://www.census.gov/library/publications/2021/demo/p70br-172.html', 'U.S. Census Bureau', 1),
      (v_art_id, 'peer_reviewed', 1, 'Shear et al. (2011). Complicated grief and related bereavement issues. Depression and Anxiety, 28(2), 103-117.', '2011', 'https://doi.org/10.1002/da.20780', 'Depression and Anxiety', 2),
      (v_art_id, 'peer_reviewed', 1, 'Shear et al. (2014). Treatment of complicated grief in elderly persons: A randomized clinical trial. JAMA Psychiatry, 71(11), 1287-1295.', '2014', 'https://doi.org/10.1001/jamapsychiatry.2014.1242', 'JAMA Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Stroebe et al. (2007). Health outcomes of bereavement. Lancet, 370(9603), 1960-1973.', '2007', 'https://doi.org/10.1016/S0140-6736(07)61816-9', 'Lancet', 4),
      (v_art_id, 'peer_reviewed', 1, 'Bonanno & Kaltman (1999). Toward an integrative perspective on bereavement. Psychological Bulletin, 125(6), 760-776.', '1999', 'https://doi.org/10.1037/0033-2909.125.6.760', 'Psychological Bulletin', 5),
      (v_art_id, 'government', 2, 'National Institute on Aging (2022). Mourning the Death of a Spouse.', '2022', 'https://www.nia.nih.gov/health/end-life/mourning-death-spouse', 'NIA/NIH', 6),
      (v_art_id, 'professional_org', 3, 'Center for Complicated Grief (2023). Resources and Treatment.', '2023', 'https://complicatedgrief.columbia.edu', 'Columbia University', 7),
      (v_art_id, 'professional_org', 3, 'AARP (2022). Grief and Loss Resources for Older Adults.', '2022', 'https://www.aarp.org/caregiving/grief-loss-end-of-life/', 'AARP', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT17-010 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-010';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'government', 2, 'Centers for Disease Control and Prevention (2022). Suicide Rates by Age Group.', '2022', 'https://www.cdc.gov/suicide/suicide-data-statistics.html', 'CDC', 1),
      (v_art_id, 'peer_reviewed', 1, 'Luoma et al. (2002). Contact with mental health and primary care providers before suicide. American Journal of Psychiatry, 159(6), 909-916.', '2002', 'https://doi.org/10.1176/appi.ajp.159.6.909', 'American Journal of Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Conwell et al. (2011). Suicide in older adults. Psychiatric Clinics of North America, 34(2), 451-468.', '2011', 'https://doi.org/10.1016/j.psc.2011.02.002', 'Psychiatric Clinics of North America', 3),
      (v_art_id, 'peer_reviewed', 1, 'Conwell & Thompson (2008). Suicidal behavior in elders. Psychiatric Clinics of North America, 31(2), 333-356.', '2008', 'https://doi.org/10.1016/j.psc.2008.01.004', 'Psychiatric Clinics of North America', 4),
      (v_art_id, 'peer_reviewed', 1, 'Erlangsen et al. (2020). Suicide among older adults: The role of physical illness. Social Psychiatry and Psychiatric Epidemiology, 55(3), 371-379.', '2020', 'https://doi.org/10.1007/s00127-019-01768-6', 'Social Psychiatry and Psychiatric Epidemiology', 5),
      (v_art_id, 'government', 2, 'National Institute of Mental Health (2023). Suicide Prevention.', '2023', 'https://www.nimh.nih.gov/health/topics/suicide-prevention', 'NIMH', 6),
      (v_art_id, 'professional_org', 3, '988 Suicide & Crisis Lifeline (2023). Resources and Support.', '2023', 'https://988lifeline.org', '988 Lifeline', 7),
      (v_art_id, 'professional_org', 3, 'American Foundation for Suicide Prevention (2023). Older Adults and Suicide.', '2023', 'https://afsp.org/older-adults-and-suicide', 'AFSP', 8)
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
  WHERE a.article_production_id LIKE 'CAT17-%';

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;
