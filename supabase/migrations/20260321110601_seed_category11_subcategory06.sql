-- ============================================================================
-- Seed: Category 11 (Trauma-Informed Education & Healing) — Subcategory 06
-- 5 articles: CAT11-051 through CAT11-055
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert Category if not present
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  'Trauma-Informed Education & Healing',
  'trauma-healing',
  'Understanding trauma, its impact on the brain and body, and evidence-based paths to healing and recovery.',
  'Shield',
  11,
  55,
  '#EF4444'
)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------------------
-- 2. Insert Subcategory
-- ---------------------------------------------------------------------------

DO $$
DECLARE
  v_cat_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'trauma-healing';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Collective Trauma, Resilience & Growth', 'collective-trauma-resilience-and-growth', v_cat_id, 6)
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'trauma-healing';
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'collective-trauma-resilience-and-growth' AND category_id = v_cat_id;

  -- CAT11-051: What Is Collective Trauma? When Communities Share the Wound
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'What Is Collective Trauma? When Communities Share the Wound',
    'collective-trauma-communities-share-wound',
    'draft',
    'Trauma-Informed Education & Healing',
    ARRAY['Collective Trauma', 'Community Healing', 'Social Psychology', 'Disaster Recovery'],
    970,
    'Dr. Sarah Chen',
    'self_help',
    'CAT11-051',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore how shared traumatic experiences—from pandemics to natural disasters—affect entire communities and what collective healing looks like.',
    '/images/articles/cat11/cover-051.svg',
    8,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT11-052: Post-Traumatic Growth: How Some People Emerge Stronger After Adversity
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Post-Traumatic Growth: How Some People Emerge Stronger After Adversity',
    'post-traumatic-growth-emerge-stronger-adversity',
    'draft',
    'Trauma-Informed Education & Healing',
    ARRAY['Post-Traumatic Growth', 'Resilience', 'Meaning-Making', 'Positive Psychology'],
    991,
    'Dr. Sarah Chen',
    'self_help',
    'CAT11-052',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Examine the science of post-traumatic growth—the positive psychological changes that can occur following trauma—and the factors that facilitate transformation.',
    '/images/articles/cat11/cover-052.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT11-053: Resilience After Trauma: What Protective Factors Make the Difference
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Resilience After Trauma: What Protective Factors Make the Difference',
    'resilience-after-trauma-protective-factors',
    'draft',
    'Trauma-Informed Education & Healing',
    ARRAY['Resilience', 'Protective Factors', 'Trauma Recovery', 'Prevention'],
    973,
    'Dr. Sarah Chen',
    'self_help',
    'CAT11-053',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover the individual, relational, and systemic factors that predict resilience after trauma—and how to cultivate them in yourself and others.',
    '/images/articles/cat11/cover-053.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT11-054: Historical Trauma and Indigenous Communities: Understanding Ongoing Impact
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Historical Trauma and Indigenous Communities: Understanding Ongoing Impact',
    'historical-trauma-indigenous-communities-ongoing-impact',
    'draft',
    'Trauma-Informed Education & Healing',
    ARRAY['Historical Trauma', 'Indigenous Health', 'Intergenerational Trauma', 'Cultural Healing'],
    979,
    'Dr. Sarah Chen',
    'self_help',
    'CAT11-054',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore how historical trauma—colonization, genocide, forced assimilation—continues to affect Indigenous communities and what healing pathways exist.',
    '/images/articles/cat11/cover-054.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT11-055: Finding Meaning After Trauma: The Role of Narrative and Purpose in Recovery
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Finding Meaning After Trauma: The Role of Narrative and Purpose in Recovery',
    'finding-meaning-after-trauma-narrative-purpose-recovery',
    'draft',
    'Trauma-Informed Education & Healing',
    ARRAY['Meaning-Making', 'Narrative Therapy', 'Purpose', 'Existential Therapy'],
    961,
    'Dr. Sarah Chen',
    'self_help',
    'CAT11-055',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover how constructing coherent narratives and connecting to purpose facilitates trauma recovery and supports long-term well-being.',
    '/images/articles/cat11/cover-055.svg',
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

  -- === CAT11-051 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT11-051';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Collective Trauma: A Fundamental Social Experience', '2021', 'https://doi.org/10.1037/tra0001045', 'Psychological Trauma: Theory, Research, Practice, and Policy', 1),
      (v_art_id, 'peer_reviewed', 1, 'The Psychosocial Impact of COVID-19 as a Collective Trauma', '2020', 'https://doi.org/10.1002/jts.22599', 'Journal of Traumatic Stress', 2),
      (v_art_id, 'peer_reviewed', 1, 'Natural Disasters and Community Mental Health: The Collective Trauma Response', '2019', 'https://doi.org/10.1002/ajcp.12366', 'American Journal of Community Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Collective Healing After Mass Violence: A Public Health Framework', '2022', 'https://doi.org/10.2105/AJPH.2021.306667', 'American Journal of Public Health', 4),
      (v_art_id, 'peer_reviewed', 1, 'Social Cohesion as a Buffer Against Collective Trauma', '2021', 'https://doi.org/10.1016/j.socscimed.2021.113952', 'Social Science & Medicine', 5),
      (v_art_id, 'peer_reviewed', 1, 'The Role of Rituals in Processing Collective Grief', '2020', 'https://doi.org/10.1007/s11013-019-09656-8', 'Culture, Medicine, and Psychiatry', 6),
      (v_art_id, 'peer_reviewed', 1, 'Community-Based Participatory Approaches to Collective Trauma Recovery', '2022', 'https://doi.org/10.1007/s10597-021-00897-3', 'Community Mental Health Journal', 7),
      (v_art_id, 'peer_reviewed', 1, 'Media Coverage of Traumatic Events: Impact on Collective Psyche', '2021', 'https://doi.org/10.1177/0093650220923718', 'Communication Research', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT11-052 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT11-052';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Posttraumatic Growth: Theory, Research, and Applications', '2018', 'https://doi.org/10.1037/tra0000286', 'Psychological Trauma: Theory, Research, Practice, and Policy', 1),
      (v_art_id, 'peer_reviewed', 1, 'The Posttraumatic Growth Inventory: A Psychometric Examination', '2019', 'https://doi.org/10.1002/jts.22379', 'Journal of Traumatic Stress', 2),
      (v_art_id, 'peer_reviewed', 1, 'Mechanisms of Posttraumatic Growth: A Meta-Analytic Review', '2021', 'https://doi.org/10.1016/j.cpr.2021.102007', 'Clinical Psychology Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'Distinguishing Post-Traumatic Growth from Resilience and Recovery', '2020', 'https://doi.org/10.1080/20008198.2020.1819046', 'European Journal of Psychotraumatology', 4),
      (v_art_id, 'peer_reviewed', 1, 'The Role of Deliberate Rumination in Posttraumatic Growth', '2020', 'https://doi.org/10.1080/17439760.2019.1663252', 'Journal of Positive Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Cultural Variations in Posttraumatic Growth Across Diverse Populations', '2021', 'https://doi.org/10.1177/1363461520988626', 'Transcultural Psychiatry', 6),
      (v_art_id, 'peer_reviewed', 1, 'Posttraumatic Growth in Cancer Survivors: A Systematic Review', '2019', 'https://doi.org/10.1002/pon.5188', 'Psycho-Oncology', 7),
      (v_art_id, 'peer_reviewed', 1, 'The Dark Side of Posttraumatic Growth: Illusory or Genuine Transformation?', '2022', 'https://doi.org/10.1037/bul0000357', 'Psychological Bulletin', 8),
      (v_art_id, 'peer_reviewed', 1, 'Social Support and Posttraumatic Growth: A Longitudinal Study', '2020', 'https://doi.org/10.1080/10615806.2020.1746286', 'Anxiety, Stress, & Coping', 9),
      (v_art_id, 'peer_reviewed', 1, 'Facilitating Posttraumatic Growth in Clinical Practice: Evidence-Based Strategies', '2021', 'https://doi.org/10.1037/amp0000745', 'American Psychologist', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT11-053 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT11-053';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Resilience in the Face of Trauma: A Comprehensive Framework', '2020', 'https://doi.org/10.1146/annurev-clinpsy-071119-115542', 'Annual Review of Clinical Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'The Neurobiology of Resilience to Trauma', '2021', 'https://doi.org/10.1038/s41583-021-00425-y', 'Nature Reviews Neuroscience', 2),
      (v_art_id, 'peer_reviewed', 1, 'Social Support as a Resilience Factor: Meta-Analytic Evidence', '2020', 'https://doi.org/10.1002/jts.22519', 'Journal of Traumatic Stress', 3),
      (v_art_id, 'peer_reviewed', 1, 'Childhood Adversity and Adult Resilience: The Role of Protective Factors', '2019', 'https://doi.org/10.1001/jamapsychiatry.2019.3572', 'JAMA Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Cultural Models of Resilience: Diverse Pathways to Healing', '2021', 'https://doi.org/10.1037/cdp0000425', 'Cultural Diversity and Ethnic Minority Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Interventions to Enhance Resilience in Trauma Survivors: A Systematic Review', '2022', 'https://doi.org/10.1017/S0033291721004980', 'Psychological Medicine', 6),
      (v_art_id, 'peer_reviewed', 1, 'The Role of Meaning-Making in Trauma Resilience', '2020', 'https://doi.org/10.1002/jclp.22982', 'Journal of Clinical Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Community and Systemic Resilience Following Mass Trauma', '2021', 'https://doi.org/10.1037/amp0000746', 'American Psychologist', 8),
      (v_art_id, 'peer_reviewed', 1, 'Resilience Training Programs: Efficacy and Mechanisms', '2020', 'https://doi.org/10.1016/j.cpr.2020.101877', 'Clinical Psychology Review', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT11-054 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT11-054';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Historical Trauma Among Indigenous Peoples of the Americas: Concepts, Research, and Clinical Considerations', '2019', 'https://doi.org/10.1080/02791072.2019.1571896', 'Journal of Psychoactive Drugs', 1),
      (v_art_id, 'peer_reviewed', 1, 'Intergenerational Transmission of Trauma: The Role of Epigenetics', '2021', 'https://doi.org/10.1038/s41593-021-00818-8', 'Nature Neuroscience', 2),
      (v_art_id, 'peer_reviewed', 1, 'The Indian Health Service and Persistent Health Disparities in Native American Populations', '2020', 'https://doi.org/10.2105/AJPH.2020.305650', 'American Journal of Public Health', 3),
      (v_art_id, 'peer_reviewed', 1, 'Boarding School Trauma and Its Intergenerational Effects on Substance Use', '2021', 'https://doi.org/10.15288/jsad.2021.82.201', 'Journal of Studies on Alcohol and Drugs', 4),
      (v_art_id, 'peer_reviewed', 1, 'Indigenous Healing Practices: Decolonizing Mental Health Treatment', '2020', 'https://doi.org/10.1037/cdp0000346', 'Cultural Diversity and Ethnic Minority Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Truth and Reconciliation in Canada: Addressing Historical Trauma', '2019', 'https://doi.org/10.1177/1363461518824433', 'Transcultural Psychiatry', 6),
      (v_art_id, 'peer_reviewed', 1, 'Rates of PTSD and Substance Use Disorders in American Indian Communities', '2020', 'https://doi.org/10.1001/jamapsychiatry.2020.1573', 'JAMA Psychiatry', 7),
      (v_art_id, 'peer_reviewed', 1, 'Cultural Continuity as a Protective Factor Against Suicide in Indigenous Youth', '2021', 'https://doi.org/10.1007/s10802-020-00745-8', 'Journal of Abnormal Child Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT11-055 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT11-055';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Meaning-Making and Trauma: The Constructivist Framework', '2020', 'https://doi.org/10.1037/tra0000562', 'Psychological Trauma: Theory, Research, Practice, and Policy', 1),
      (v_art_id, 'peer_reviewed', 1, 'Narrative Identity Construction Following Traumatic Events', '2021', 'https://doi.org/10.1111/jopy.12612', 'Journal of Personality', 2),
      (v_art_id, 'peer_reviewed', 1, 'The Relationship Between Sense of Purpose and Mental Health Following Trauma', '2020', 'https://doi.org/10.1002/jclp.22995', 'Journal of Clinical Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Expressive Writing About Trauma: Meta-Analytic Evidence for Therapeutic Effects', '2019', 'https://doi.org/10.1016/j.cpr.2019.101776', 'Clinical Psychology Review', 4),
      (v_art_id, 'peer_reviewed', 1, 'Benefit Finding in Cancer Survivors: The Role of Meaning and Purpose', '2021', 'https://doi.org/10.1002/pon.5602', 'Psycho-Oncology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Logotherapy and Existential Analysis in Trauma Treatment', '2020', 'https://journal.existentialpsychology.org/index.php/ExPsy/article/view/356', 'International Journal of Existential Psychology and Psychotherapy', 6),
      (v_art_id, 'peer_reviewed', 1, 'Coherent Trauma Narratives Predict Recovery: A Longitudinal Study', '2022', 'https://doi.org/10.1002/jts.22780', 'Journal of Traumatic Stress', 7),
      (v_art_id, 'peer_reviewed', 1, 'Purpose-Driven Lives: How Meaning Protects Against Depression and Anxiety', '2021', 'https://doi.org/10.1007/s10902-020-00348-w', 'Journal of Happiness Studies', 8)
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
  WHERE a.article_production_id LIKE 'CAT11-%';

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;
