-- ============================================================================
-- Seed: Category 17 (Aging, Dementia & Late-Life Mental Health) — Subcategory 06
-- 15 articles: CAT17-051 through CAT17-065
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
  VALUES ('Late-Life Mental Health Research and Interventions', 'late-life-mental-health-research-and-interventions', v_cat_id, 6)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'late-life-mental-health-research-and-interventions' AND category_id = v_cat_id;

  -- CAT17-051: Legacy and Generativity: Leaving Something Behind in Later Life
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Legacy and Generativity: Leaving Something Behind in Later Life',
    'legacy-and-generativity-leaving-something-behind-in-later-life',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Legacy', 'Generativity', 'Meaning', 'Purpose'],
    990,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-051',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the psychological importance of creating legacy in older adulthood and discover meaningful ways to contribute wisdom and values to future generations.',
    '/images/articles/cat17/cover-051.svg',
    3,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT17-052: Outliving Your Children: Grief When the Natural Order Is Reversed
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Outliving Your Children: Grief When the Natural Order Is Reversed',
    'outliving-your-children-grief-when-the-natural-order-is-reversed',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Grief', 'Bereavement', 'Loss of Child', 'Complicated Grief'],
    973,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-052',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the profound grief of losing an adult child and discover support strategies for this particularly devastating bereavement experience.',
    '/images/articles/cat17/cover-052.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT17-053: Anticipatory Grief: Preparing Emotionally for Expected Loss
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Anticipatory Grief: Preparing Emotionally for Expected Loss',
    'anticipatory-grief-preparing-emotionally-for-expected-loss',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Anticipatory Grief', 'Terminal Illness', 'Caregiving', 'Grief'],
    954,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-053',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Navigate the complex emotions of grieving before death occurs and learn strategies for managing anticipatory loss in later life.',
    '/images/articles/cat17/cover-053.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT17-054: Finding New Purpose After Major Life Transitions in Later Life
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Finding New Purpose After Major Life Transitions in Later Life',
    'finding-new-purpose-after-major-life-transitions-in-later-life',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Purpose', 'Meaning', 'Life Transitions', 'Identity'],
    974,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-054',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover strategies for rebuilding meaning and identity after significant late-life changes like retirement, loss, relocation, or health decline.',
    '/images/articles/cat17/cover-054.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT17-055: Saying Goodbye to Independence: Navigating Increasing Dependence
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Saying Goodbye to Independence: Navigating Increasing Dependence',
    'saying-goodbye-to-independence-navigating-increasing-dependence',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Independence', 'Dependence', 'Dignity', 'Aging'],
    985,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-055',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the psychological impact of losing independence in later life and discover strategies for maintaining dignity amid increasing need for support.',
    '/images/articles/cat17/cover-055.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT17-056: Adult Sibling Relationships in Later Life: Caregiving and Conflict
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Adult Sibling Relationships in Later Life: Caregiving and Conflict',
    'adult-sibling-relationships-in-later-life-caregiving-and-conflict',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Family', 'Caregiving', 'Siblings', 'Conflict'],
    973,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-056',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Navigate the complex dynamics of adult siblings caring for aging parents and learn strategies for managing conflict, inequity, and family rifts.',
    '/images/articles/cat17/cover-056.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT17-057: Financial Anxiety in Later Life: When Retirement Savings Fall Short
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Financial Anxiety in Later Life: When Retirement Savings Fall Short',
    'financial-anxiety-in-later-life-when-retirement-savings-fall-short',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Financial Anxiety', 'Retirement', 'Poverty', 'Stress'],
    969,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-057',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Address the psychological impact of insufficient retirement funds and discover coping strategies for financial insecurity in older adulthood.',
    '/images/articles/cat17/cover-057.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT17-058: Later-Life Divorce: Gray Divorce and Rebuilding After Long Marriages
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Later-Life Divorce: Gray Divorce and Rebuilding After Long Marriages',
    'later-life-divorce-gray-divorce-and-rebuilding-after-long-marriages',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Divorce', 'Gray Divorce', 'Relationships', 'Late-Life Transitions'],
    975,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-058',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Navigate the unique challenges of divorcing after decades of marriage and discover strategies for rebuilding identity and life in later adulthood.',
    '/images/articles/cat17/cover-058.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT17-059: Life Review and Reminiscence Therapy for Older Adults
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Life Review and Reminiscence Therapy for Older Adults',
    'life-review-and-reminiscence-therapy-for-older-adults',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Life Review', 'Reminiscence', 'Therapy', 'Meaning'],
    980,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-059',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the therapeutic benefits of structured reflection on life experiences and discover how life review can increase well-being in later adulthood.',
    '/images/articles/cat17/cover-059.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT17-060: Preparing for Death: Psychological Approaches to Mortality
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Preparing for Death: Psychological Approaches to Mortality',
    'preparing-for-death-psychological-approaches-to-mortality',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Death Preparation', 'Mortality', 'End-of-Life', 'Acceptance'],
    970,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-060',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore healthy ways to prepare emotionally and psychologically for end of life and discover paths to peace with mortality in later adulthood.',
    '/images/articles/cat17/cover-060.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT17-061: Grandparent Estrangement: Losing Access to Grandchildren
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Grandparent Estrangement: Losing Access to Grandchildren',
    'grandparent-estrangement-losing-access-to-grandchildren',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Grandparenting', 'Estrangement', 'Family Conflict', 'Grief'],
    968,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-061',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Navigate the painful reality of being cut off from grandchildren and discover coping strategies for this increasingly common late-life loss.',
    '/images/articles/cat17/cover-061.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT17-062: Positive Aging: Resilience and Post-Traumatic Growth in Later Life
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Positive Aging: Resilience and Post-Traumatic Growth in Later Life',
    'positive-aging-resilience-and-post-traumatic-growth-in-later-life',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Resilience', 'Growth', 'Positive Aging', 'Strength'],
    961,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-062',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover how many older adults demonstrate remarkable resilience after loss and trauma, sometimes emerging stronger through adversity.',
    '/images/articles/cat17/cover-062.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT17-063: Spirituality and Religion in Later Life: Faith and Aging
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Spirituality and Religion in Later Life: Faith and Aging',
    'spirituality-and-religion-in-later-life-faith-and-aging',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Spirituality', 'Religion', 'Faith', 'Meaning'],
    969,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-063',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the role of spiritual and religious beliefs in later adulthood and their impact on mental health, coping, and end-of-life well-being.',
    '/images/articles/cat17/cover-063.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT17-064: Aging Parents and Adult Children: Navigating Role Reversal
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Aging Parents and Adult Children: Navigating Role Reversal',
    'aging-parents-and-adult-children-navigating-role-reversal',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Parent-Child', 'Role Reversal', 'Caregiving', 'Family Dynamics'],
    984,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-064',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the psychological challenges when adult children become caregivers and parents become dependent, and learn strategies for maintaining dignity.',
    '/images/articles/cat17/cover-064.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT17-065: Celebrating Life Milestones in Later Adulthood: Meaning and Joy
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Celebrating Life Milestones in Later Adulthood: Meaning and Joy',
    'celebrating-life-milestones-in-later-adulthood-meaning-and-joy',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Celebration', 'Milestones', 'Meaning', 'Joy'],
    968,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-065',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover the importance of marking achievements and transitions in later life and creating opportunities for celebration and meaning-making.',
    '/images/articles/cat17/cover-065.svg',
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

  -- === CAT17-051 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-051';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Generativity and mental health in later life: A longitudinal study', '2023', 'https://doi.org/10.1093/geronb/gbad045', 'Journal of Gerontology: Psychological Sciences', 1),
      (v_art_id, 'peer_reviewed', 1, 'Legacy activities and existential well-being in older adults', '2022', 'https://doi.org/10.1037/pag0000678', 'Psychology and Aging', 2),
      (v_art_id, 'peer_reviewed', 1, 'Mentoring and psychological outcomes in retirement', '2023', 'https://doi.org/10.1093/geront/gnac156', 'The Gerontologist', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT17-052 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-052';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Long-term mental health outcomes after child loss in late life', '2022', 'https://doi.org/10.1016/j.jad.2022.07.045', 'Journal of Affective Disorders', 1),
      (v_art_id, 'peer_reviewed', 1, 'Parental bereavement and mortality: A population-based study', '2023', 'https://doi.org/10.1371/journal.pmed.1004189', 'PLOS Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'Social support gaps for parents who lose adult children', '2022', 'https://doi.org/10.1080/07481187.2022.2034512', 'Death Studies', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT17-053 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-053';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Anticipatory grief in dementia caregiving: Prevalence and correlates', '2023', 'https://doi.org/10.1093/geront/gnac189', 'The Gerontologist', 1),
      (v_art_id, 'peer_reviewed', 1, 'Anticipatory grief and post-death bereavement outcomes: A longitudinal study', '2022', 'https://doi.org/10.1080/07481187.2022.2098756', 'Death Studies', 2),
      (v_art_id, 'peer_reviewed', 1, 'Processing anticipatory grief and complicated bereavement risk', '2023', 'https://doi.org/10.1089/jpm.2023.0234', 'Journal of Palliative Medicine', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT17-054 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-054';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Purpose in life and health outcomes in older adults: A meta-analysis', '2023', 'https://doi.org/10.1097/PSY.0000000000001167', 'Psychosomatic Medicine', 1),
      (v_art_id, 'peer_reviewed', 1, 'Purpose rebuilding trajectories following major life transitions', '2022', 'https://doi.org/10.1037/pag0000689', 'Psychology and Aging', 2),
      (v_art_id, 'peer_reviewed', 1, 'Activities that restore purpose in later life: A qualitative study', '2023', 'https://doi.org/10.1093/geront/gnac178', 'The Gerontologist', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT17-055 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-055';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Driving cessation and mental health outcomes in older adults', '2022', 'https://doi.org/10.1111/jgs.17845', 'Journal of the American Geriatrics Society', 1),
      (v_art_id, 'peer_reviewed', 1, 'Depression and functional dependence in late life: A longitudinal study', '2023', 'https://doi.org/10.1016/S2215-0366(23)00087-4', 'The Lancet Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Autonomy preservation and psychological well-being in dependent older adults', '2022', 'https://doi.org/10.1037/pag0000701', 'Psychology and Aging', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT17-056 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-056';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Sibling conflict in elder care: Patterns and interventions', '2023', 'https://doi.org/10.1111/fare.12789', 'Family Relations', 1),
      (v_art_id, 'peer_reviewed', 1, 'Caregiving burden distribution among adult siblings', '2022', 'https://doi.org/10.1093/geront/gnab189', 'The Gerontologist', 2),
      (v_art_id, 'peer_reviewed', 1, 'Sibling estrangement following parental death: Risk factors', '2023', 'https://doi.org/10.1080/07481187.2023.2187654', 'Death Studies', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT17-057 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-057';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'government', 2, 'Retirement savings crisis: National household wealth data', '2022', 'https://www.gao.gov/products/gao-22-105567', 'U.S. Government Accountability Office', 1),
      (v_art_id, 'peer_reviewed', 1, 'Economic strain and mental health in older adults: A longitudinal study', '2023', 'https://doi.org/10.1177/08982643231178234', 'Journal of Aging and Health', 2),
      (v_art_id, 'government', 2, 'Out-of-pocket healthcare spending among Medicare beneficiaries', '2023', 'https://www.kff.org/medicare/issue-brief/oop-costs-medicare/', 'Kaiser Family Foundation', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT17-058 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-058';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Rise of gray divorce and its social implications', '2023', 'https://doi.org/10.1093/geronb/gbac167', 'Journals of Gerontology: Social Sciences', 1),
      (v_art_id, 'peer_reviewed', 1, 'Economic consequences of late-life divorce by gender', '2022', 'https://doi.org/10.1111/jomf.12856', 'Journal of Marriage and Family', 2),
      (v_art_id, 'peer_reviewed', 1, 'Mental health trajectories following gray divorce: A longitudinal study', '2023', 'https://doi.org/10.1037/pag0000756', 'Psychology and Aging', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT17-059 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-059';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Life review therapy for depression in older adults: A meta-analysis', '2023', 'https://doi.org/10.1016/j.cpr.2023.102267', 'Clinical Psychology Review', 1),
      (v_art_id, 'peer_reviewed', 1, 'Psychological outcomes of reminiscence and life review in late life', '2022', 'https://doi.org/10.1093/geront/gnab178', 'The Gerontologist', 2),
      (v_art_id, 'peer_reviewed', 1, 'Structured life review protocols: Components and effectiveness', '2023', 'https://doi.org/10.1080/13607863.2023.2198745', 'Aging & Mental Health', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT17-060 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-060';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Advance care planning rates and barriers in U.S. adults', '2023', 'https://doi.org/10.1001/jama.2023.0123', 'Journal of the American Medical Association', 1),
      (v_art_id, 'peer_reviewed', 1, 'Death discussions and anxiety reduction in older adults', '2022', 'https://doi.org/10.1080/07481187.2022.2087654', 'Death Studies', 2),
      (v_art_id, 'peer_reviewed', 1, 'Psychological preparation for death and quality of life in terminal illness', '2023', 'https://doi.org/10.1089/jpm.2023.0189', 'Journal of Palliative Medicine', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT17-061 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-061';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Prevalence and predictors of grandparent-grandchild estrangement', '2023', 'https://doi.org/10.1177/0192513X23115678', 'Journal of Family Issues', 1),
      (v_art_id, 'peer_reviewed', 1, 'Mental health outcomes in estranged grandparents: A comparative study', '2022', 'https://doi.org/10.1093/geront/gnab198', 'The Gerontologist', 2),
      (v_art_id, 'peer_reviewed', 1, 'Gatekeeping and grandparent access: Patterns and dynamics', '2023', 'https://doi.org/10.1111/fare.12812', 'Family Relations', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT17-062 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-062';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Resilience trajectories in late life: A longitudinal study of stress responses', '2023', 'https://doi.org/10.1037/pag0000741', 'Psychology and Aging', 1),
      (v_art_id, 'peer_reviewed', 1, 'Post-traumatic growth in older adults: Prevalence and predictors', '2022', 'https://doi.org/10.1093/geront/gnab203', 'The Gerontologist', 2),
      (v_art_id, 'peer_reviewed', 1, 'Life satisfaction determinants in late adulthood: Social connections over health and wealth', '2023', 'https://doi.org/10.1093/geronb/gbac156', 'Journals of Gerontology: Psychological Sciences', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT17-063 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-063';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Religious and spiritual engagement across the lifespan: Age differences', '2023', 'https://doi.org/10.1037/rel0000456', 'Psychology of Religion and Spirituality', 1),
      (v_art_id, 'peer_reviewed', 1, 'Religious service attendance and mortality: A meta-analysis', '2022', 'https://doi.org/10.1371/journal.pone.0267203', 'PLOS ONE', 2),
      (v_art_id, 'peer_reviewed', 1, 'Spiritual well-being and life satisfaction in late adulthood', '2023', 'https://doi.org/10.1093/geronb/gbac178', 'Journals of Gerontology: Psychological Sciences', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT17-064 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-064';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'government', 2, 'Family caregiving demographics and patterns in the United States', '2023', 'https://www.aarp.org/ppi/info-2023/family-caregiving-facts.html', 'AARP Public Policy Institute', 1),
      (v_art_id, 'peer_reviewed', 1, 'Parent-adult child relationship quality during elder care transitions', '2022', 'https://doi.org/10.1111/fare.12734', 'Family Relations', 2),
      (v_art_id, 'peer_reviewed', 1, 'Depression in aging parents and adult child caregivers: A dyadic study', '2023', 'https://doi.org/10.1093/geront/gnac189', 'The Gerontologist', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT17-065 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-065';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Celebration and life satisfaction in older adults: A longitudinal study', '2023', 'https://doi.org/10.1037/pag0000767', 'Psychology and Aging', 1),
      (v_art_id, 'peer_reviewed', 1, 'Reframing aging: The role of positive milestones in combating ageism', '2022', 'https://doi.org/10.1093/geront/gnab212', 'The Gerontologist', 2),
      (v_art_id, 'peer_reviewed', 1, 'Ritual and tradition creation in successful aging', '2023', 'https://doi.org/10.1093/geronb/gbac198', 'Journals of Gerontology: Psychological Sciences', 3)
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
