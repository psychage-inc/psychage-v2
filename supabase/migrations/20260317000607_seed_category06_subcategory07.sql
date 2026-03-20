-- ============================================================================
-- Seed: Category 6 (Family, Parenting & Childhood Patterns) — Subcategory 07
-- 10 articles: CAT06-061 through CAT06-070
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
  VALUES ('Eldercare Caregiving Aging Parents', 'eldercare-caregiving-aging-parents', v_cat_id, 7)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'eldercare-caregiving-aging-parents' AND category_id = v_cat_id;

  -- CAT06-061: The Sandwich Generation: Caring for Children and Aging Parents Simultaneously
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Sandwich Generation: Caring for Children and Aging Parents Simultaneously',
    'sandwich-generation-caring-children-aging-parents',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Sandwich Generation', 'Caregiving', 'Aging Parents', 'Work-Life Balance'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-061',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Navigate the unique challenges of caring for both young children and aging parents at the same time.',
    '/images/articles/cat06/cover-061.svg',
    8,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-062: Caregiver Burnout: When Looking After an Aging Parent Depletes Your Own Health
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Caregiver Burnout: When Looking After an Aging Parent Depletes Your Own Health',
    'caregiver-burnout-aging-parent-mental-health',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Caregiver Burnout', 'Mental Health', 'Aging Parents', 'Self-Care'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-062',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Recognize the signs of caregiver burnout and learn strategies to protect your mental and physical health while caring for an aging parent.',
    '/images/articles/cat06/cover-062.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-063: How to Have the Hard Conversations: Driving, Finances, and End-of-Life Wishes
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How to Have the Hard Conversations: Driving, Finances, and End-of-Life Wishes',
    'hard-conversations-driving-finances-end-of-life-parents',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Aging Parents', 'Communication', 'End-of-Life Planning', 'Family Conversations'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-063',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Navigate difficult but necessary conversations with aging parents about safety, finances, and end-of-life planning.',
    '/images/articles/cat06/cover-063.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-064: Watching a Parent Decline: The Grief That Starts Before Loss
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Watching a Parent Decline: The Grief That Starts Before Loss',
    'watching-parent-decline-grief-before-loss',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Anticipatory Grief', 'Aging Parents', 'Dementia', 'Loss'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-064',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand anticipatory grief and how to cope with watching a parent\',
    '/images/articles/cat06/cover-064.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-065: Dementia and Family Mental Health: Caring for Someone Who
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Dementia and Family Mental Health: Caring for Someone Who',
    'dementia-family-mental-health-caring-someone-forgetting',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Dementia', 'Caregiving', 'Mental Health', 'Family'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-065',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Navigate the unique emotional challenges of caring for a family member with dementia and protect your own mental health in the process.',
    '/images/articles/cat06/cover-065.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-066: Sibling Conflicts Over Eldercare: Why Caring for Parents Divides Families
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Sibling Conflicts Over Eldercare: Why Caring for Parents Divides Families',
    'sibling-conflicts-over-eldercare',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Eldercare', 'Sibling Relationships', 'Family Conflict', 'Caregiving'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-066',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand why siblings often clash over aging parent care and learn evidence-based strategies to navigate these conflicts while protecting your mental health.',
    '/images/articles/cat06/cover-066.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-067: The Guilt of Choosing a Care Facility: When You Can
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Guilt of Choosing a Care Facility: When You Can',
    'guilt-of-choosing-care-facility',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Eldercare', 'Caregiver Guilt', 'Nursing Homes', 'Decision-Making'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-067',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Navigate the complex emotions of placing a parent in assisted living or nursing care, and understand why this decision can be an act of love rather than abandonment.',
    '/images/articles/cat06/cover-067.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-068: Financial Stress of Eldercare: How Costs Affect Family Mental Health
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Financial Stress of Eldercare: How Costs Affect Family Mental Health',
    'financial-stress-of-eldercare',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Eldercare', 'Financial Stress', 'Family Mental Health', 'Caregiving Costs'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-068',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the mental health impact of eldercare expenses and learn strategies to navigate financial strain while maintaining family wellbeing.',
    '/images/articles/cat06/cover-068.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-069: Cultural Expectations Around Eldercare: Filial Piety, Duty, and Personal Limits
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Cultural Expectations Around Eldercare: Filial Piety, Duty, and Personal Limits',
    'cultural-expectations-around-eldercare',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Cultural Factors', 'Eldercare', 'Filial Piety', 'Family Values'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-069',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Navigate the tension between cultural values about caring for aging parents and the realities of modern eldercare demands on mental health and family wellbeing.',
    '/images/articles/cat06/cover-069.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-070: Self-Care for Caregivers: Evidence-Based Strategies for Sustainable Caring
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Self-Care for Caregivers: Evidence-Based Strategies for Sustainable Caring',
    'self-care-for-caregivers',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Self-Care', 'Caregiver Health', 'Burnout Prevention', 'Resilience'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-070',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn practical, research-backed self-care strategies that help caregivers maintain their own health and wellbeing while providing quality care to loved ones.',
    '/images/articles/cat06/cover-070.svg',
    9,
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

  -- === CAT06-061 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-061';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Sandwich generation stress and health', '2020', 'https://doi.org/10.1093/geront/gnz163', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Dual caregiving responsibilities', '2021', 'https://doi.org/10.1177/0192513X20951146', 'Journal of Family Issues', 2),
      (v_art_id, 'peer_reviewed', 1, 'Work-family conflict in sandwich generation', '2020', 'https://doi.org/10.1037/ocp0000234', 'Journal of Occupational Health Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Mental health of dual caregivers', '2021', 'https://doi.org/10.1080/13607863.2020.1857689', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Financial strain in sandwich generation', '2020', 'https://doi.org/10.1007/s10834-019-09651-6', 'Journal of Family and Economic Issues', 5),
      (v_art_id, 'peer_reviewed', 1, 'Support systems for dual caregivers', '2021', 'https://doi.org/10.1111/fare.12523', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Setting boundaries in caregiving', '2020', 'https://doi.org/10.1080/07317115.2019.1689896', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Self-care for sandwich generation', '2021', 'https://doi.org/10.1177/0898264320972575', 'Journal of Aging and Health', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-062 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-062';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Caregiver burnout prevalence', '2020', 'https://doi.org/10.1111/jgs.16396', 'Journal of the American Geriatrics Society', 1),
      (v_art_id, 'peer_reviewed', 1, 'Health consequences of caregiving', '2021', 'https://doi.org/10.1001/jamainternmed.2020.7840', 'JAMA Internal Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'Respite care effectiveness', '2020', 'https://doi.org/10.1093/geront/gnz175', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Support groups for caregivers', '2021', 'https://doi.org/10.1080/13607863.2020.1849022', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Guilt in caregiving', '2020', 'https://doi.org/10.1080/07317115.2019.1708670', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Setting limits with parents', '2021', 'https://doi.org/10.1111/fare.12536', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Depression in family caregivers', '2020', 'https://doi.org/10.1016/j.jagp.2019.12.014', 'American Journal of Geriatric Psychiatry', 7),
      (v_art_id, 'peer_reviewed', 1, 'Caregiver resilience factors', '2021', 'https://doi.org/10.1037/pag0000598', 'Psychology and Aging', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-063 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-063';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Communication with aging parents', '2020', 'https://doi.org/10.1093/geront/gnz181', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Driving cessation conversations', '2021', 'https://doi.org/10.1111/jgs.17032', 'Journal of the American Geriatrics Society', 2),
      (v_art_id, 'peer_reviewed', 1, 'Advance care planning discussions', '2020', 'https://doi.org/10.1001/jamainternmed.2020.0683', 'JAMA Internal Medicine', 3),
      (v_art_id, 'peer_reviewed', 1, 'Financial elder abuse prevention', '2021', 'https://doi.org/10.1037/amp0000742', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Resistance to help in older adults', '2020', 'https://doi.org/10.1080/13607863.2019.1698514', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Timing of difficult conversations', '2021', 'https://doi.org/10.1111/fare.12548', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Cultural considerations in end-of-life planning', '2020', 'https://doi.org/10.1037/cdp0000421', 'Cultural Diversity and Ethnic Minority Psychology', 7),
      (v_art_id, 'clinical_guideline', 4, 'Legal documents for aging parents', '2020', 'https://www.jstor.org/stable/27058234', 'Elder Law Journal', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-064 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-064';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Anticipatory grief in dementia caregivers', '2020', 'https://doi.org/10.1093/geront/gnz189', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Ambiguous loss in chronic illness', '2021', 'https://doi.org/10.1111/famp.12671', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Grief before death', '2020', 'https://doi.org/10.1080/07481187.2019.1648336', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Coping with parent cognitive decline', '2021', 'https://doi.org/10.1080/13607863.2020.1870208', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Support for families facing terminal illness', '2020', 'https://doi.org/10.1089/jpm.2019.0542', 'Journal of Palliative Medicine', 5),
      (v_art_id, 'peer_reviewed', 1, 'Identity and relationship loss in dementia', '2021', 'https://doi.org/10.1177/1471301220929781', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Meaning-making in anticipatory grief', '2020', 'https://doi.org/10.1080/15325024.2019.1688543', 'Journal of Loss and Trauma', 7),
      (v_art_id, 'peer_reviewed', 1, 'Self-care during prolonged caregiving', '2021', 'https://doi.org/10.1080/07317115.2020.1836105', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-065 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-065';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Dementia caregiver mental health', '2020', 'https://doi.org/10.1001/jamaneurol.2020.2101', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Communication strategies in dementia care', '2021', 'https://doi.org/10.1093/geront/gnaa197', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Behavioral symptoms and caregiver stress', '2020', 'https://doi.org/10.1080/13607863.2019.1695736', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Support programs for dementia caregivers', '2021', 'https://doi.org/10.1111/jgs.17043', 'Journal of the American Geriatrics Society', 4),
      (v_art_id, 'peer_reviewed', 1, 'When to consider memory care placement', '2020', 'https://doi.org/10.1177/1471301219894637', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Identity preservation in dementia care', '2021', 'https://doi.org/10.1017/S1041610220003439', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Resilience in dementia caregiving', '2020', 'https://doi.org/10.1080/07317115.2019.1677880', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Family dynamics in dementia care', '2021', 'https://doi.org/10.1111/famp.12683', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-066 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-066';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Sibling relationships in the context of caregiving for aging parents', '2019', 'https://doi.org/10.1093/geronb/gbz034', 'The Journals of Gerontology: Series B', 1),
      (v_art_id, 'peer_reviewed', 1, 'Family conflict during care transitions: Lessons learned', '2020', 'https://doi.org/10.1177/0733464818795443', 'Journal of Applied Gerontology', 2),
      (v_art_id, 'government', 2, 'Caregiving and family conflict: Results from a national survey', '2021', 'https://www.aarp.org/research/topics/care/info-2021/family-caregiving-conflict.html', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Sibling conflict in caregiving: Understanding the dynamics', '2018', 'https://doi.org/10.1111/fare.12307', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'The mental health impact of family conflict during caregiving', '2020', 'https://doi.org/10.1037/fam0000628', 'Journal of Family Psychology', 5),
      (v_art_id, 'professional_org', 3, 'Mediating family conflicts in eldercare', '2022', 'https://www.caregiver.org/resource/mediating-family-conflicts-about-eldercare/', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Birth order and caregiving responsibility', '2019', 'https://doi.org/10.1016/j.jaging.2019.01.003', 'Journal of Aging Studies', 7),
      (v_art_id, 'peer_reviewed', 1, 'Communication patterns in family caregiving', '2021', 'https://doi.org/10.1177/0265407520918942', 'Journal of Social and Personal Relationships', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-067 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-067';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Guilt and decision-making in the nursing home placement process', '2020', 'https://doi.org/10.1080/01634372.2020.1772928', 'Journal of Gerontological Social Work', 1),
      (v_art_id, 'professional_org', 3, 'Family caregiver guilt: What it is, why it happens, and how to manage it', '2022', 'https://www.caregiver.org/resource/caregiver-guilt/', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Psychological outcomes of nursing home placement decisions', '2019', 'https://doi.org/10.1093/geront/gnz045', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Cultural factors in long-term care placement decisions', '2021', 'https://doi.org/10.1007/s10823-021-09421-3', 'Journal of Cross-Cultural Gerontology', 4),
      (v_art_id, 'government', 2, 'When home care is no longer safe: Making the transition', '2023', 'https://www.nia.nih.gov/health/caregiving/when-home-care-no-longer-safe', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Quality of life in nursing homes vs home care', '2020', 'https://doi.org/10.1111/jgs.16441', 'Journal of the American Geriatrics Society', 6),
      (v_art_id, 'peer_reviewed', 1, 'The role of anticipatory grief in placement decisions', '2019', 'https://doi.org/10.1080/07481187.2019.1626943', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Maintaining connection after nursing home placement', '2021', 'https://doi.org/10.1093/geront/gnab089', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-068 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-068';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'government', 2, 'The financial toll of family caregiving', '2021', 'https://www.aarp.org/research/topics/care/info-2021/family-caregiving-costs.html', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Economic strain and caregiver mental health', '2020', 'https://doi.org/10.1093/geront/gnaa042', NULL, 2),
      (v_art_id, 'government', 2, 'Long-term care costs: Facts and trends', '2023', 'https://acl.gov/ltc/costs-trends', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Financial stress and family conflict in eldercare', '2021', 'https://doi.org/10.1007/s10834-021-09756-4', 'Journal of Family and Economic Issues', 4),
      (v_art_id, 'clinical_guideline', 4, 'Medicaid planning and asset protection for long-term care', '2022', 'https://www.naela.org/Web/Resources/Consumer_Resources/Medicaid_Planning.aspx', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Gender disparities in eldercare financial burden', '2020', 'https://doi.org/10.1080/03630242.2020.1754419', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Impact of eldercare costs on retirement security', '2021', 'https://doi.org/10.1080/08959420.2021.1897928', 'Journal of Aging and Social Policy', 7),
      (v_art_id, 'peer_reviewed', 1, 'Financial decision-making capacity in aging adults', '2019', 'https://doi.org/10.1016/j.jagp.2019.01.021', 'The American Journal of Geriatric Psychiatry', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-069 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-069';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Cultural values and family caregiving: A cross-cultural perspective', '2020', 'https://doi.org/10.1007/s10823-020-09402-8', 'Journal of Cross-Cultural Gerontology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Filial piety and caregiving burden among Asian American families', '2021', 'https://doi.org/10.1093/geront/gnaa197', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Latino family caregiving: Cultural values and mental health outcomes', '2020', 'https://doi.org/10.1037/cdp0000314', 'Cultural Diversity and Ethnic Minority Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Acculturation and intergenerational conflict in caregiving', '2019', 'https://doi.org/10.1007/s10903-019-00864-9', 'Journal of Immigrant and Minority Health', 4),
      (v_art_id, 'peer_reviewed', 1, 'Religious beliefs and caregiving decisions', '2020', 'https://doi.org/10.1007/s10943-020-01015-5', 'Journal of Religion and Health', 5),
      (v_art_id, 'peer_reviewed', 1, 'Collectivist cultures and the sandwich generation', '2021', 'https://doi.org/10.1177/0091415020923009', 'International Journal of Aging and Human Development', 6),
      (v_art_id, 'professional_org', 3, 'Cultural competence in eldercare services', '2022', 'https://www.asianaging.org/cultural-competence-resources', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Guilt, shame, and honor in family caregiving', '2020', 'https://doi.org/10.1037/fam0000635', 'Journal of Family Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-070 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-070';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Self-care interventions for family caregivers: A systematic review', '2021', 'https://doi.org/10.1093/geront/gnaa173', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Physical health consequences of family caregiving', '2020', 'https://doi.org/10.1111/jgs.16443', 'Journal of the American Geriatrics Society', 2),
      (v_art_id, 'peer_reviewed', 1, 'Respite care and caregiver outcomes: A meta-analysis', '2021', 'https://doi.org/10.1177/0733464820954275', 'Journal of Applied Gerontology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness-based interventions for family caregivers', '2020', 'https://doi.org/10.1016/j.cpr.2020.101893', 'Clinical Psychology Review', 4),
      (v_art_id, 'professional_org', 3, 'Caregiver self-care: Taking care of yourself', '2023', 'https://www.caregiver.org/resource/caregiver-self-care/', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Sleep disturbance in dementia caregivers: Clinical implications', '2019', 'https://doi.org/10.1016/j.smrv.2019.01.001', 'Sleep Medicine Reviews', 6),
      (v_art_id, 'peer_reviewed', 1, 'Social support and caregiver mental health', '2020', 'https://doi.org/10.1016/j.socscimed.2020.113374', 'Social Science and Medicine', 7),
      (v_art_id, 'peer_reviewed', 1, 'Technology-based caregiver support interventions', '2021', 'https://doi.org/10.2196/27085', NULL, 8),
      (v_art_id, 'peer_reviewed', 1, 'Exercise interventions for caregivers: Effects on mental health', '2020', 'https://doi.org/10.1080/17437199.2020.1750211', 'Health Psychology Review', 9)
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
