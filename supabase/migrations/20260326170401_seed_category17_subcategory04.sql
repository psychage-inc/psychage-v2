-- ============================================================================
-- Seed: Category 17 (Aging, Dementia & Late-Life Mental Health) — Subcategory 04
-- 10 articles: CAT17-031 through CAT17-040
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
  VALUES ('Caregiving and Family Support', 'caregiving-and-family-support', v_cat_id, 4)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'caregiving-and-family-support' AND category_id = v_cat_id;

  -- CAT17-031: The Health Consequences of Loneliness in Older Adults
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Health Consequences of Loneliness in Older Adults',
    'loneliness-health-consequences-older-adults',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Loneliness', 'Social Isolation', 'Health Risks', 'Mortality'],
    1015,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-031',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Loneliness is not just emotional pain—it increases mortality risk by 26%, raises dementia risk by 50%, and accelerates cognitive decline comparable to smoking 15 cigarettes daily.',
    '/images/articles/cat17/cover-031.svg',
    3,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT17-032: Social Isolation vs. Loneliness: Understanding the Difference
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Social Isolation vs. Loneliness: Understanding the Difference',
    'social-isolation-vs-loneliness-understanding-difference',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Social Isolation', 'Loneliness', 'Connection', 'Mental Health'],
    1004,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-032',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Social isolation is objective lack of contact; loneliness is subjective feeling of disconnection. You can be surrounded by people and lonely, or live alone and connected.',
    '/images/articles/cat17/cover-032.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT17-033: Technology and Connection: Video Calls and Social Media for Seniors
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Technology and Connection: Video Calls and Social Media for Seniors',
    'technology-video-calls-social-media-seniors',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Technology', 'Video Calls', 'Social Media', 'Digital Connection'],
    1011,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-033',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Technology can reduce loneliness in older adults—video calls with family, online communities, and social media—but requires training, accessibility, and realistic expectations.',
    '/images/articles/cat17/cover-033.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT17-034: Senior Centers and Community Programs for Social Connection
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Senior Centers and Community Programs for Social Connection',
    'senior-centers-community-programs-social-connection',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Senior Centers', 'Community Programs', 'Activities', 'Social Connection'],
    1009,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-034',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Senior centers offer meals, activities, exercise classes, and social connection—serving 1 million older adults daily and reducing isolation, depression, and healthcare costs.',
    '/images/articles/cat17/cover-034.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT17-035: Volunteering and Purpose in Retirement: Mental Health Benefits
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Volunteering and Purpose in Retirement: Mental Health Benefits',
    'volunteering-purpose-retirement-mental-health',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Volunteering', 'Purpose', 'Retirement', 'Life Satisfaction'],
    991,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-035',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Volunteering in retirement reduces depression by 40%, increases life satisfaction, and provides purpose—the antidote to the identity crisis many retirees face.',
    '/images/articles/cat17/cover-035.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT17-036: Pet Ownership and Companionship for Mental Health in Older Adults
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Pet Ownership and Companionship for Mental Health in Older Adults',
    'pet-ownership-companionship-mental-health-older-adults',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Pet Ownership', 'Companionship', 'Loneliness', 'Mental Health'],
    985,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-036',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Pets reduce loneliness, lower blood pressure, increase physical activity, and provide purpose—but require realistic assessment of care capacity and costs.',
    '/images/articles/cat17/cover-036.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT17-037: Intergenerational Programs and Relationships for Mental Health
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Intergenerational Programs and Relationships for Mental Health',
    'intergenerational-programs-relationships-mental-health',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Intergenerational Programs', 'Mentoring', 'Purpose', 'Connection'],
    994,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-037',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Intergenerational programs—pairing seniors with children or young adults—reduce loneliness, increase purpose, and benefit both generations through mutual support.',
    '/images/articles/cat17/cover-037.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT17-038: Overcoming Barriers to Socialization: Mobility, Hearing Loss, Transportation
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Overcoming Barriers to Socialization: Mobility, Hearing Loss, Transportation',
    'overcoming-barriers-socialization-mobility-hearing-transportation',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Mobility', 'Hearing Loss', 'Transportation', 'Accessibility'],
    992,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-038',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Physical barriers (mobility issues, hearing loss, lack of transportation) isolate older adults—but each barrier has practical solutions that restore connection.',
    '/images/articles/cat17/cover-038.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT17-039: Making Friends After 65: Strategies for Social Connection in Late Life
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Making Friends After 65: Strategies for Social Connection in Late Life',
    'making-friends-after-65-social-connection-strategies',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Friendship', 'Social Connection', 'Late Life', 'Loneliness'],
    990,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-039',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Making friends after 65 is hard—you lack work environment, childhood connections died or moved—but structured activities, vulnerability, and consistency work.',
    '/images/articles/cat17/cover-039.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT17-040: Coping with Outliving Friends and Spouse: Grief and Isolation
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Coping with Outliving Friends and Spouse: Grief and Isolation',
    'coping-outliving-friends-spouse-grief-isolation',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Grief', 'Widowhood', 'Cumulative Loss', 'Social Networks'],
    973,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-040',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Outliving your peers brings cumulative grief and shrinking social networks—yet strategies exist to grieve losses while building new connections.',
    '/images/articles/cat17/cover-040.svg',
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

  -- === CAT17-031 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-031';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Holt-Lunstad, J., et al. Loneliness and social isolation as risk factors for mortality: A meta-analytic review.', '2015', 'https://doi.org/10.1177/1745691614568352', 'Perspectives on Psychological Science', 1),
      (v_art_id, 'peer_reviewed', 1, 'Holwerda, T. J., et al. Feelings of loneliness, but not social isolation, predict dementia onset.', '2014', 'https://doi.org/10.1136/jnnp-2013-305346', 'Journal of Neurology, Neurosurgery & Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Cole, S. W., et al. Social regulation of gene expression in human leukocytes.', '2007', 'https://doi.org/10.1186/gb-2007-8-9-r189', 'Genome Biology', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT17-032 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-032';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Cornwell, E. Y., & Waite, L. J. Social disconnectedness, perceived isolation, and health among older adults.', '2009', 'https://doi.org/10.1177/002214650905000103', 'Journal of Health and Social Behavior', 1),
      (v_art_id, 'government', 2, 'National Academies. Social Isolation and Loneliness in Older Adults.', '2020', 'https://doi.org/10.17226/25663', 'National Academies Press', 2),
      (v_art_id, 'peer_reviewed', 1, 'Steptoe, A., et al. Social isolation, loneliness, and all-cause mortality in older men and women.', '2013', 'https://doi.org/10.1073/pnas.1219686110', 'PNAS', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT17-033 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-033';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Zamir, S., et al. Video-calls to reduce loneliness and social isolation within care environments for older people.', '2020', 'https://doi.org/10.1002/14651858.CD013632', 'Cochrane Database', 1),
      (v_art_id, 'government', 2, 'Pew Research Center. Tech Adoption Climbs Among Older Adults.', '2022', 'https://www.pewresearch.org/internet/2022/01/13/internet-broadband-fact-sheet/', 'Pew Research', 2),
      (v_art_id, 'peer_reviewed', 1, 'Chopik, W. J. The benefits of social technology use among older adults are mediated by reduced loneliness.', '2016', 'https://doi.org/10.1089/cyber.2016.0151', 'Cyberpsychology, Behavior, and Social Networking', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT17-034 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-034';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'professional_org', 3, 'National Council on Aging. Senior Centers Fact Sheet.', '2023', 'https://www.ncoa.org/article/get-the-facts-on-senior-centers', 'NCOA', 1),
      (v_art_id, 'peer_reviewed', 1, 'Aday, R. H., et al. Changing perceptions of senior center participants.', '2006', 'https://doi.org/10.1300/J083v48n01_03', 'Journal of Gerontological Social Work', 2),
      (v_art_id, 'peer_reviewed', 1, 'Wellman, N. S., & Kamp, B. Federal food and nutrition assistance programs for older people.', '2004', 'https://www.jstor.org/stable/26555508', 'Generations', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT17-035 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-035';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Morrow-Howell, N., et al. Effects of volunteering on the well-being of older adults.', '2003', 'https://doi.org/10.1093/geronb/58.3.S137', 'The Journals of Gerontology Series B', 1),
      (v_art_id, 'peer_reviewed', 1, 'Windsor, T. D., et al. The effect of formal volunteering in midlife on health and well-being.', '2008', 'https://doi.org/10.1093/geronb/63.5.P272', 'The Journals of Gerontology Series B', 2),
      (v_art_id, 'peer_reviewed', 1, 'Greenfield, E. A., & Marks, N. F. Formal volunteering as a protective factor for older adults psychological well-being.', '2004', 'https://doi.org/10.1093/geronb/59.5.S258', 'The Journals of Gerontology Series B', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT17-036 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-036';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Krause-Parello, C. A., & Gulick, E. E. Pet ownership and older women.', '2013', 'https://doi.org/10.1080/08952841.2013.816215', 'Journal of Women & Aging', 1),
      (v_art_id, 'peer_reviewed', 1, 'Thorpe, R. J., et al. Dog ownership, walking behavior, and maintained mobility in late life.', '2006', 'https://doi.org/10.1111/j.1532-5415.2006.00856.x', 'Journal of the American Geriatrics Society', 2),
      (v_art_id, 'professional_org', 3, 'American Pet Products Association. Pet Ownership Costs.', '2023', 'https://www.americanpetproducts.org/', 'APPA', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT17-037 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-037';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Jarrott, S. E., & Bruno, K. Intergenerational programs: Bringing the generations together.', '2003', 'https://doi.org/10.1300/J083v40n01_01', 'Journal of Gerontological Social Work', 1),
      (v_art_id, 'professional_org', 3, 'Generations United. Intergenerational Programs Toolkit.', '2022', 'https://www.gu.org/', 'Generations United', 2),
      (v_art_id, 'peer_reviewed', 1, 'Kaplan, M., et al. Intergenerational programs in schools, agencies, and faith-based settings.', '2004', 'https://doi.org/10.1080/03601270490445078', 'Educational Gerontology', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT17-038 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-038';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Freedman, V. A., et al. Trends in late-life activity limitations.', '2013', 'https://doi.org/10.1093/geronb/gbs128', 'The Journals of Gerontology Series B', 1),
      (v_art_id, 'peer_reviewed', 1, 'Dawes, P., et al. Hearing loss and cognition: The role of hearing aids.', '2015', 'https://doi.org/10.1001/jamaoto.2015.1804', 'JAMA Otolaryngology', 2),
      (v_art_id, 'professional_org', 3, 'Bailey, L. Aging Americans: Stranded Without Options.', '2011', 'https://t4america.org/', 'Transportation for America', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT17-039 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-039';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Hall, J. A. How many hours does it take to make a friend?', '2019', 'https://doi.org/10.1177/0265407518761225', 'Journal of Social and Personal Relationships', 1),
      (v_art_id, 'peer_reviewed', 1, 'Adams, R. G., & Blieszner, R. Aging well with friends and family.', '1995', 'https://doi.org/10.1177/0002764295039002006', 'American Behavioral Scientist', 2),
      (v_art_id, 'peer_reviewed', 1, 'Collins, N. L., & Miller, L. C. Self-disclosure and liking: A meta-analytic review.', '1994', 'https://doi.org/10.1037/0033-2909.116.3.457', 'Psychological Bulletin', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT17-040 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-040';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Bergman, E. J., & Haley, W. E. Depressive symptoms, social network, and bereavement experiences in recently widowed adults.', '2009', 'https://doi.org/10.1080/13607860902774410', 'Aging & Mental Health', 1),
      (v_art_id, 'peer_reviewed', 1, 'Utz, R. L., et al. The effect of widowhood on older adults social participation.', '2002', 'https://doi.org/10.1093/geront/42.4.522', 'The Gerontologist', 2),
      (v_art_id, 'peer_reviewed', 1, 'de Jong Gierveld, J., & Havens, B. Cross-national comparisons of social isolation and loneliness.', '2004', 'https://doi.org/10.1353/cja.2004.0021', 'Canadian Journal on Aging', 3)
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
