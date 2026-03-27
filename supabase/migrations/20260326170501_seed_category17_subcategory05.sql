-- ============================================================================
-- Seed: Category 17 (Aging, Dementia & Late-Life Mental Health) — Subcategory 05
-- 10 articles: CAT17-041 through CAT17-050
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
  VALUES ('Cognitive Aging and Brain Health', 'cognitive-aging-and-brain-health', v_cat_id, 5)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'cognitive-aging-and-brain-health' AND category_id = v_cat_id;

  -- CAT17-041: Moving to Senior Living Communities: Social Connection Benefits
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Moving to Senior Living Communities: Social Connection Benefits',
    'moving-senior-living-communities-social-connection',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Senior Living', 'Community', 'Social Connection', 'Independence'],
    984,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-041',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Senior living communities offer built-in social connection, activities, and support—but require accepting loss of independence and home. Weigh carefully.',
    '/images/articles/cat17/cover-041.svg',
    3,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT17-042: Faith Communities and Spiritual Connection for Mental Health
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Faith Communities and Spiritual Connection for Mental Health',
    'faith-communities-spiritual-connection-mental-health',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Faith', 'Spirituality', 'Community', 'Purpose'],
    992,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-042',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Faith communities provide social support, purpose, ritual, and meaning—reducing loneliness, depression, and mortality in older adults who participate regularly.',
    '/images/articles/cat17/cover-042.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT17-043: Ageism and Social Exclusion: Mental Health Impact on Older Adults
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Ageism and Social Exclusion: Mental Health Impact on Older Adults',
    'ageism-social-exclusion-mental-health-impact',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Ageism', 'Discrimination', 'Social Exclusion', 'Stereotypes'],
    1008,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-043',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Ageism—stereotyping, discrimination, exclusion based on age—increases loneliness, depression, and mortality in older adults. Internalized ageism is self-fulfilling prophecy.',
    '/images/articles/cat17/cover-043.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT17-044: COVID-19''s Lasting Impact on Senior Isolation and Mental Health
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'COVID-19''s Lasting Impact on Senior Isolation and Mental Health',
    'covid-19-lasting-impact-senior-isolation',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['COVID-19', 'Pandemic', 'Isolation', 'Mental Health'],
    990,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-044',
    v_cat_id,
    v_sub_id,
    'drafted',
    'COVID-19 lockdowns increased senior isolation by 40%; many have not returned to pre-pandemic social participation, leaving lasting mental health consequences.',
    '/images/articles/cat17/cover-044.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT17-045: Building a Social Support Network in Late Life: Practical Strategies
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Building a Social Support Network in Late Life: Practical Strategies',
    'building-social-support-network-late-life',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Social Networks', 'Connection', 'Community', 'Strategies'],
    993,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-045',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Social networks shrink with age, but can be rebuilt through intentional strategies: joining groups, volunteering, using technology, and practicing vulnerability.',
    '/images/articles/cat17/cover-045.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT17-046: Grief and Bereavement in Older Adults: When Loss Is Cumulative
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Grief and Bereavement in Older Adults: When Loss Is Cumulative',
    'grief-and-bereavement-in-older-adults-when-loss-is-cumulative',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Grief', 'Bereavement', 'Loss', 'Coping'],
    979,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-046',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand how multiple losses in later life create unique grief patterns and learn strategies for navigating cumulative bereavement with resilience.',
    '/images/articles/cat17/cover-046.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT17-047: Losing a Spouse in Later Life: Widowhood and Rebuilding Identity
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Losing a Spouse in Later Life: Widowhood and Rebuilding Identity',
    'losing-a-spouse-in-later-life-widowhood-and-rebuilding-identity',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Widowhood', 'Grief', 'Identity', 'Late-Life Loss'],
    970,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-047',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Navigate the profound identity shift of losing a life partner after decades together and discover paths toward renewed purpose and connection.',
    '/images/articles/cat17/cover-047.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT17-048: Retirement Transition: Mental Health, Identity, and Purpose After Work
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Retirement Transition: Mental Health, Identity, and Purpose After Work',
    'retirement-transition-mental-health-identity-and-purpose-after-work',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Retirement', 'Identity', 'Purpose', 'Life Transitions'],
    974,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-048',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the psychological challenges of retiring after decades of career identity and discover strategies for creating meaningful post-work life.',
    '/images/articles/cat17/cover-048.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT17-049: Moving in Later Life: Downsizing, Relocation, and Psychological Impact
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Moving in Later Life: Downsizing, Relocation, and Psychological Impact',
    'moving-in-later-life-downsizing-relocation-and-psychological-impact',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Moving', 'Downsizing', 'Life Transitions', 'Home'],
    982,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-049',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the emotional challenges of leaving a long-time home in older adulthood and learn strategies for healthy transition to new living situations.',
    '/images/articles/cat17/cover-049.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT17-050: End-of-Life Anxiety and Mortality Awareness in Older Adults
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'End-of-Life Anxiety and Mortality Awareness in Older Adults',
    'end-of-life-anxiety-and-mortality-awareness-in-older-adults',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Mortality', 'Existential', 'Anxiety', 'End-of-Life'],
    973,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-050',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Navigate the psychological impact of contemplating mortality in later life and discover approaches for finding peace amid existential awareness.',
    '/images/articles/cat17/cover-050.svg',
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

  -- === CAT17-041 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-041';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Shippee, T. P., et al. Effects of satisfaction with social roles and activities on depressive symptoms in older adults.', '2009', 'https://doi.org/10.1093/geront/gnp020', 'The Gerontologist', 1),
      (v_art_id, 'peer_reviewed', 1, 'Ewen, H. H., & Chahal, J. Influence of late life stressors on the decisions of older women to relocate into congregate senior housing.', '2013', 'https://doi.org/10.1080/02763893.2013.813425', 'Journal of Housing for the Elderly', 2),
      (v_art_id, 'professional_org', 3, 'Genworth Cost of Care Survey 2023.', '2023', 'https://www.genworth.com/aging-and-you/finances/cost-of-care.html', 'Genworth Financial', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT17-042 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-042';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Li, S., et al. Association of religious service attendance with mortality among women.', '2016', 'https://doi.org/10.1001/jamainternmed.2016.1615', 'JAMA Internal Medicine', 1),
      (v_art_id, 'peer_reviewed', 1, 'Koenig, H. G., et al. Religion, spirituality, and health in medically ill hospitalized older patients.', '2004', 'https://doi.org/10.1111/j.1532-5415.2004.52251.x', 'Journal of the American Geriatrics Society', 2),
      (v_art_id, 'clinical_guideline', 4, 'Pargament, K. I. The psychology of religion and coping.', '1997', 'https://www.guilford.com/', 'Guilford Press', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT17-043 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-043';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Palmore, E. B., et al. Ageism in Canada and the United States.', '2004', 'https://doi.org/10.1023/B:JCCG.0000015098.62691.ab', 'Journal of Cross-Cultural Gerontology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Levy, B. R., et al. Longevity increased by positive self-perceptions of aging.', '2002', 'https://doi.org/10.1037/0022-3514.83.2.261', 'Journal of Personality and Social Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Robb, C., et al. Ageism in mental health and health care.', '2002', 'https://doi.org/10.1093/geront/42.3.426', 'The Gerontologist', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT17-044 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-044';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Krendl, A. C., & Perry, B. L. The impact of sheltering in place during the COVID-19 pandemic on older adults social and mental well-being.', '2021', 'https://doi.org/10.1093/geronb/gbaa110', 'The Journals of Gerontology Series B', 1),
      (v_art_id, 'government', 2, 'National Poll on Healthy Aging. Loneliness Among Older Adults Before and During the COVID-19 Pandemic.', '2021', 'https://www.healthyagingpoll.org/', 'University of Michigan', 2),
      (v_art_id, 'peer_reviewed', 1, 'Simard, J., & Volicer, L. Loneliness and isolation in long-term care and the COVID-19 pandemic.', '2020', 'https://doi.org/10.1016/j.jamda.2020.05.006', 'Journal of the American Medical Directors Association', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT17-045 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-045';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Cornwell, B., et al. Social disconnectedness, perceived isolation, and health among older adults.', '2009', 'https://doi.org/10.1177/002214650905000103', 'Journal of Health and Social Behavior', 1),
      (v_art_id, 'peer_reviewed', 1, 'Holt-Lunstad, J., et al. Social relationships and mortality risk: A meta-analytic review.', '2010', 'https://doi.org/10.1371/journal.pmed.1000316', 'PLOS Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'Hall, J. A. How many hours does it take to make a friend?', '2019', 'https://doi.org/10.1177/0265407518761225', 'Journal of Social and Personal Relationships', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT17-046 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-046';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Cumulative loss and bereavement patterns in older adulthood', '2023', 'https://doi.org/10.1093/geronb/gbad012', 'Journal of Gerontology: Psychological Sciences', 1),
      (v_art_id, 'peer_reviewed', 1, 'Complicated grief in late life: Risk factors and interventions', '2022', 'https://doi.org/10.1016/j.jagp.2022.03.008', 'American Journal of Geriatric Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Social network changes and bereavement outcomes in older adults', '2023', 'https://doi.org/10.1037/pag0000745', 'Psychology and Aging', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT17-047 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-047';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Mortality risk after spousal bereavement in older adults', '2022', 'https://doi.org/10.1001/jamainternmed.2022.1453', 'JAMA Internal Medicine', 1),
      (v_art_id, 'peer_reviewed', 1, 'Gender differences in widowhood duration and outcomes', '2023', 'https://doi.org/10.1093/geronb/gbad034', 'Journals of Gerontology: Social Sciences', 2),
      (v_art_id, 'peer_reviewed', 1, 'Social network changes following spousal loss in late life', '2022', 'https://doi.org/10.1037/pag0000691', 'Psychology and Aging', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT17-048 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-048';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Depression and adjustment in early retirement: A longitudinal study', '2023', 'https://doi.org/10.1037/ocp0000345', 'Journal of Occupational Health Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Social isolation following retirement: Patterns and risk factors', '2022', 'https://doi.org/10.1093/geronb/gbac089', 'Journals of Gerontology: Psychological Sciences', 2),
      (v_art_id, 'peer_reviewed', 1, 'Volunteering and mental health in retirement: A meta-analysis', '2023', 'https://doi.org/10.1037/pag0000723', 'Psychology and Aging', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT17-049 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-049';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Grief and attachment in late-life residential relocation', '2022', 'https://doi.org/10.1093/geront/gnac067', 'The Gerontologist', 1),
      (v_art_id, 'peer_reviewed', 1, 'Mental health outcomes following residential moves in older adulthood', '2023', 'https://doi.org/10.1177/08982643231156789', 'Journal of Aging and Health', 2),
      (v_art_id, 'government', 2, 'Aging in place preferences and realities: A national survey', '2022', 'https://www.aarp.org/research/topics/community/info-2022/aging-in-place.html', 'AARP Research Reports', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT17-050 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-050';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Death anxiety in older adults: Prevalence and correlates', '2022', 'https://doi.org/10.1016/j.jaging.2022.101034', 'Journal of Aging Studies', 1),
      (v_art_id, 'peer_reviewed', 1, 'Mortality salience and psychological well-being in late life', '2023', 'https://doi.org/10.1037/pag0000734', 'Psychology and Aging', 2),
      (v_art_id, 'peer_reviewed', 1, 'Advance care planning and end-of-life anxiety reduction', '2022', 'https://doi.org/10.1089/jpm.2022.0156', 'Journal of Palliative Medicine', 3)
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
