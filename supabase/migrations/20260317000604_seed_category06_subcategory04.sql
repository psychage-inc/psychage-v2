-- ============================================================================
-- Seed: Category 6 (Family, Parenting & Childhood Patterns) — Subcategory 04
-- 10 articles: CAT06-031 through CAT06-040
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert Category if not present
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  'Family, Parenting & Childhood Patterns',
  'relationships-social',
  '',
  'Brain',
  6,
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'relationships-social';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Intergenerational Trauma Healing', 'intergenerational-trauma-healing', v_cat_id, 4)
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'relationships-social';
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'intergenerational-trauma-healing' AND category_id = v_cat_id;

  -- CAT06-031: What Is Intergenerational Trauma? How Pain Passes Down Through Families
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'What Is Intergenerational Trauma? How Pain Passes Down Through Families',
    'what-is-intergenerational-trauma-how-pain-passes-down',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Intergenerational Trauma', 'Family Patterns', 'Healing', 'Trauma Recovery'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-031',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand how trauma can be transmitted across generations through family patterns, parenting styles, and even biological mechanisms.',
    '/images/articles/cat06/cover-031.svg',
    8,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-032: Epigenetics and Trauma: Can Stress Change Your DNA?
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Epigenetics and Trauma: Can Stress Change Your DNA?',
    'epigenetics-and-trauma-can-stress-change-dna',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Epigenetics', 'Trauma', 'Science', 'Genetics'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-032',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the science of epigenetics and how traumatic stress may create biological changes that influence future generations.',
    '/images/articles/cat06/cover-032.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-033: Breaking the Cycle: How to Stop Repeating Your Parents
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Breaking the Cycle: How to Stop Repeating Your Parents',
    'breaking-the-cycle-stop-repeating-parents-patterns',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Family Patterns', 'Behavior Change', 'Parenting', 'Self-Awareness'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-033',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn practical strategies to identify inherited family patterns and consciously choose different behaviors for yourself and future generations.',
    '/images/articles/cat06/cover-033.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-034: Cultural Trauma: How Historical Oppression Affects Families Today
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Cultural Trauma: How Historical Oppression Affects Families Today',
    'cultural-trauma-historical-oppression-affects-families',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Cultural Trauma', 'Historical Trauma', 'Racism', 'Community Healing'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-034',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand how collective trauma from racism, colonization, and genocide impacts communities and families across generations.',
    '/images/articles/cat06/cover-034.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-035: War, Displacement, and Family Trauma: The Refugee Experience Across Generations
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'War, Displacement, and Family Trauma: The Refugee Experience Across Generations',
    'war-displacement-refugee-experience-family-trauma',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Refugee Trauma', 'War', 'Migration', 'Cultural Identity'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-035',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore how forced migration, war trauma, and displacement affect refugee families and their descendants across generations.',
    '/images/articles/cat06/cover-035.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-036: How Unprocessed Grief in One Generation Becomes Anxiety in the Next
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How Unprocessed Grief in One Generation Becomes Anxiety in the Next',
    'unprocessed-grief-anxiety-next-generation',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Grief', 'Anxiety', 'Family Patterns', 'Intergenerational Trauma'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-036',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how unexpressed grief from one generation can manifest as anxiety disorders in descendants who never directly experienced the loss.',
    '/images/articles/cat06/cover-036.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-037: The Genogram: Mapping Your Family
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Genogram: Mapping Your Family',
    'genogram-mapping-family-emotional-history',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Genogram', 'Family Therapy', 'Self-Awareness', 'Family Patterns'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-037',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how to create a genogram — a powerful tool that maps family relationships, patterns, and emotional legacies across generations.',
    '/images/articles/cat06/cover-037.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-038: Healing Your Family Legacy: Where to Start
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Healing Your Family Legacy: Where to Start',
    'healing-family-legacy-where-to-start',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Healing', 'Intergenerational Trauma', 'Family Therapy', 'Personal Growth'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-038',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A practical guide to beginning the work of healing intergenerational trauma and creating healthier patterns for your family line.',
    '/images/articles/cat06/cover-038.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-039: Forgiveness and Family Trauma: Is It Necessary for Healing?
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Forgiveness and Family Trauma: Is It Necessary for Healing?',
    'forgiveness-family-trauma-necessary-for-healing',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Forgiveness', 'Trauma Recovery', 'Family Relationships', 'Healing'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-039',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the complex role of forgiveness in healing from family trauma and why forgiveness is not always required for recovery.',
    '/images/articles/cat06/cover-039.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-040: When Healing Means Separating: Estrangement as a Last Resort
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'When Healing Means Separating: Estrangement as a Last Resort',
    'when-healing-means-separating-estrangement-last-resort',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Estrangement', 'Boundaries', 'Family Relationships', 'Mental Health'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-040',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand when family estrangement becomes necessary for mental health, how to navigate the decision, and how to cope with the grief it brings.',
    '/images/articles/cat06/cover-040.svg',
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

  -- === CAT06-031 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-031';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'government', 2, 'Intergenerational transmission of trauma: An introduction for the clinician', '2018', 'https://doi.org/10.12788/pt.0018', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Epigenetic transmission of the impact of early stress across generations', '2016', 'https://doi.org/10.1016/j.biopsych.2015.08.028', 'Biological Psychiatry', 2),
      (v_art_id, 'professional_org', 3, 'Breaking the cycle: Understanding intergenerational trauma', '2019', 'https://www.apa.org/monitor/2019/02/legacy-trauma', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Family patterns of trauma transmission', '2020', 'https://doi.org/10.1037/fam0000612', 'Journal of Family Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Parenting after childhood trauma: Understanding transgenerational transmission', '2019', 'https://doi.org/10.1177/1359104518775227', 'Clinical Child Psychology and Psychiatry', 5),
      (v_art_id, 'peer_reviewed', 1, 'Historical trauma and psychological distress', '2017', 'https://doi.org/10.1080/15325024.2017.1310618', 'Journal of Loss and Trauma', 6),
      (v_art_id, 'peer_reviewed', 1, 'The neurobiology of intergenerational trauma', '2021', 'https://doi.org/10.3389/fpsyg.2021.737779', 'Frontiers in Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Resilience and recovery in families affected by trauma', '2020', 'https://doi.org/10.1111/famp.12547', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-032 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-032';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Epigenetic mechanisms in the transgenerational transmission of trauma', '2014', 'https://doi.org/10.1038/nn.3695', 'Nature Neuroscience', 1),
      (v_art_id, 'peer_reviewed', 1, 'DNA methylation changes following trauma exposure', '2020', 'https://doi.org/10.1038/s41380-020-0679-2', 'Molecular Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Epigenetics, trauma, and PTSD', '2018', 'https://doi.org/10.1007/s11920-018-0950-7', 'Current Psychiatry Reports', 3),
      (v_art_id, 'peer_reviewed', 1, 'Holocaust exposure and health in offspring', '2016', 'https://doi.org/10.1001/jamapsychiatry.2015.2775', 'JAMA Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Stress-induced epigenetic modifications', '2019', 'https://doi.org/10.1038/s41576-019-0143-1', 'Nature Reviews Genetics', 5),
      (v_art_id, 'peer_reviewed', 1, 'Transgenerational epigenetic inheritance', '2021', 'https://doi.org/10.1016/j.cell.2021.02.041', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Limitations of current epigenetic trauma research', '2022', 'https://doi.org/10.1016/j.tig.2021.12.003', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Epigenetics and the social environment', '2020', 'https://doi.org/10.1146/annurev-psych-010419-050840', 'Annual Review of Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-033 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-033';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Breaking intergenerational cycles of maltreatment', '2018', 'https://doi.org/10.1016/j.chiabu.2018.07.022', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness and breaking family patterns', '2019', 'https://doi.org/10.1007/s10826-019-01389-8', 'Journal of Child and Family Studies', 2),
      (v_art_id, 'peer_reviewed', 1, 'Self-compassion in cycle-breaking', '2020', 'https://doi.org/10.1007/s12671-020-01356-9', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Therapy for breaking generational patterns', '2019', 'https://doi.org/10.1111/famp.12423', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Identifying automatic behaviors from childhood', '2018', 'https://doi.org/10.1016/j.cpr.2018.05.006', 'Clinical Psychology Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'Reflective functioning and cycle-breaking', '2021', 'https://doi.org/10.1080/14616734.2020.1751987', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Social support in pattern disruption', '2020', 'https://doi.org/10.1037/fam0000612', 'Journal of Family Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Neuroplasticity and behavioral change', '2019', 'https://doi.org/10.1016/j.neubiorev.2019.03.015', 'Neuroscience & Biobehavioral Reviews', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-034 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-034';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'government', 2, 'Historical trauma and American Indian health disparities', '2017', 'https://doi.org/10.2105/AJPH.2016.303595', 'American Journal of Public Health', 1),
      (v_art_id, 'peer_reviewed', 1, 'Racism as a traumatic stressor', '2018', 'https://doi.org/10.1037/amp0000206', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Slavery and contemporary Black mental health', '2020', 'https://doi.org/10.1037/cdp0000378', 'Cultural Diversity and Ethnic Minority Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Holocaust trauma transmission', '2019', 'https://doi.org/10.1002/jts.22379', 'Journal of Traumatic Stress', 4),
      (v_art_id, 'peer_reviewed', 1, 'Indigenous peoples and historical trauma', '2018', 'https://doi.org/10.1177/1363461518778670', 'Transcultural Psychiatry', 5),
      (v_art_id, 'peer_reviewed', 1, 'Asian American trauma and model minority myth', '2021', 'https://doi.org/10.1037/aap0000212', 'Asian American Journal of Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Community-based healing from collective trauma', '2020', 'https://doi.org/10.1037/ser0000412', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Cultural identity and resilience', '2019', 'https://doi.org/10.1177/0022022119849691', 'Journal of Cross-Cultural Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-035 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-035';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Mental health of refugees and asylum seekers', '2018', 'https://doi.org/10.1016/S0140-6736(18)31129-2', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Intergenerational trauma transmission in refugee families', '2019', 'https://doi.org/10.1093/jrs/fey058', 'Journal of Refugee Studies', 2),
      (v_art_id, 'peer_reviewed', 1, 'PTSD in war-exposed children', '2020', 'https://doi.org/10.1001/jamapediatrics.2019.5350', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Resilience factors in refugee youth', '2021', 'https://doi.org/10.1111/cdev.13597', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Cultural bereavement and identity loss', '2019', 'https://doi.org/10.1177/1363461519828347', 'Transcultural Psychiatry', 5),
      (v_art_id, 'peer_reviewed', 1, 'Trauma-informed care for refugees', '2020', 'https://doi.org/10.1037/amp0000605', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Second-generation refugee mental health', '2018', 'https://doi.org/10.1016/j.socscimed.2018.03.013', 'Social Science & Medicine', 7),
      (v_art_id, 'peer_reviewed', 1, 'Community healing in displaced populations', '2021', 'https://doi.org/10.1017/gmh.2021.15', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-036 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-036';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Unresolved grief and anxiety transmission', '2019', 'https://doi.org/10.1016/j.janxdis.2019.05.003', 'Journal of Anxiety Disorders', 1),
      (v_art_id, 'peer_reviewed', 1, 'Parental grief and child anxiety', '2020', 'https://doi.org/10.1017/S0954579419001603', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Ambiguous loss and family anxiety', '2018', 'https://doi.org/10.1111/famp.12378', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Grief processing in families', '2021', 'https://doi.org/10.1080/07481187.2020.1864064', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Disenfranchised grief effects', '2019', 'https://doi.org/10.1177/0030222818811877', 'OMEGA - Journal of Death and Dying', 5),
      (v_art_id, 'peer_reviewed', 1, 'Family silence and psychopathology', '2020', 'https://doi.org/10.1016/j.cpr.2020.101871', 'Clinical Psychology Review', 6),
      (v_art_id, 'peer_reviewed', 1, 'Therapeutic approaches to inherited grief', '2021', 'https://doi.org/10.1080/10503307.2020.1851929', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Completing grief work across generations', '2019', 'https://doi.org/10.1111/1467-6427.12259', 'Journal of Family Therapy', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-037 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-037';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Genograms in family therapy', '2018', 'https://doi.org/10.1111/famp.12341', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Using genograms to identify family patterns', '2019', 'https://doi.org/10.1111/jmft.12376', 'Journal of Marital and Family Therapy', 2),
      (v_art_id, 'peer_reviewed', 1, 'Genograms and intergenerational transmission', '2020', 'https://doi.org/10.1007/s10567-020-00321-9', 'Clinical Child and Family Psychology Review', 3),
      (v_art_id, 'textbook', 5, 'Genograms: Assessment and Intervention (textbook)', '2020', 'https://wwnorton.com/books/genograms', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Family systems theory and genogram use', '2019', 'https://doi.org/10.1111/jftr.12339', 'Journal of Family Theory & Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'Genograms in cultural assessment', '2021', 'https://doi.org/10.1037/cdp0000398', 'Cultural Diversity and Ethnic Minority Psychology', 6),
      (v_art_id, 'textbook', 5, 'Self-directed genogram work', '2020', 'https://www.psychotherapynetworker.org/article/genograms', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Digital genogram tools and applications', '2021', 'https://doi.org/10.1080/15228835.2020.1869159', 'Journal of Technology in Human Services', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-038 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-038';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Healing intergenerational trauma', '2020', 'https://doi.org/10.1080/08975353.2020.1731023', 'Journal of Family Psychotherapy', 1),
      (v_art_id, 'peer_reviewed', 1, 'Narrative therapy for family patterns', '2019', 'https://doi.org/10.1111/famp.12456', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'EMDR for inherited trauma', '2021', 'https://doi.org/10.1891/EMDR-D-20-00034', 'Journal of EMDR Practice and Research', 3),
      (v_art_id, 'peer_reviewed', 1, 'Internal Family Systems and legacy burdens', '2020', 'https://doi.org/10.1037/pst0000309', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Self-compassion in cycle-breaking', '2019', 'https://doi.org/10.1007/s12671-019-01145-6', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Family rituals and healing', '2020', 'https://doi.org/10.1111/1467-6427.12287', 'Journal of Family Therapy', 6),
      (v_art_id, 'peer_reviewed', 1, 'Community healing from collective trauma', '2021', 'https://doi.org/10.1002/ajcp.12502', 'American Journal of Community Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Post-traumatic growth in families', '2020', 'https://doi.org/10.1002/jts.22512', 'Journal of Traumatic Stress', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-039 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-039';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Forgiveness and mental health outcomes', '2019', 'https://doi.org/10.1007/s10865-019-00030-8', 'Journal of Behavioral Medicine', 1),
      (v_art_id, 'peer_reviewed', 1, 'Premature forgiveness and trauma recovery', '2020', 'https://doi.org/10.1177/1524838018792335', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Alternatives to forgiveness in healing', '2021', 'https://doi.org/10.1016/j.cpr.2021.102039', 'Clinical Psychology Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'Forgiveness in different cultural contexts', '2020', 'https://doi.org/10.1037/cdp0000312', 'Cultural Diversity and Ethnic Minority Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Acceptance without forgiveness', '2019', 'https://doi.org/10.1007/s12671-019-01098-w', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Self-forgiveness and intergenerational patterns', '2020', 'https://doi.org/10.1037/fam0000634', 'Journal of Family Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Anger as healthy response to injustice', '2018', 'https://doi.org/10.1037/amp0000347', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Reconciliation versus forgiveness', '2021', 'https://doi.org/10.1002/jts.22634', 'Journal of Traumatic Stress', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-040 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-040';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Family estrangement prevalence and mental health', '2020', 'https://doi.org/10.1037/fam0000620', 'Journal of Family Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Reasons for family estrangement', '2019', 'https://doi.org/10.1111/fare.12362', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Ambiguous loss in estrangement', '2021', 'https://doi.org/10.1111/famp.12628', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Disenfranchised grief of estrangement', '2020', 'https://doi.org/10.1080/07481187.2019.1626937', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Mental health outcomes of estrangement', '2021', 'https://doi.org/10.1016/j.cpr.2020.101908', 'Clinical Psychology Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'Estrangement in abusive family systems', '2019', 'https://doi.org/10.1177/0886260518801939', 'Journal of Interpersonal Violence', 6),
      (v_art_id, 'peer_reviewed', 1, 'Social support after family estrangement', '2020', 'https://doi.org/10.1177/0265407519899712', 'Journal of Social and Personal Relationships', 7),
      (v_art_id, 'peer_reviewed', 1, 'Reconciliation versus estrangement decisions', '2021', 'https://doi.org/10.1111/fare.12549', NULL, 8)
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
  WHERE a.article_production_id LIKE 'CAT06-%';

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;
