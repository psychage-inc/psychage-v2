-- ============================================================================
-- Seed: Category 15 (Loneliness, Social Connection & Belonging) — Subcategory 04
-- 10 articles: CAT15-031 through CAT15-040
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert Category if not present
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  'Loneliness, Social Connection & Belonging',
  'loneliness-connection',
  'Understanding loneliness, building social connection, and finding belonging in an increasingly disconnected world.',
  'Users',
  15,
  50,
  '#EC4899'
)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------------------
-- 2. Insert Subcategory
-- ---------------------------------------------------------------------------

DO $$
DECLARE
  v_cat_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'loneliness-connection';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Community, Belonging & Purpose', 'community-belonging-and-purpose', v_cat_id, 4)
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'loneliness-connection';
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'community-belonging-and-purpose' AND category_id = v_cat_id;

  -- CAT15-031: The Psychology of Belonging: Why Feeling Part of Something Bigger Matters
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Belonging: Why Feeling Part of Something Bigger Matters',
    'psychology-of-belonging-feeling-part-something-bigger',
    'draft',
    'Loneliness, Social Connection & Belonging',
    ARRAY['Belonging', 'Community', 'Psychology', 'Mental Health'],
    945,
    'Dr. Sarah Chen',
    'self_help',
    'CAT15-031',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the deep human need for belonging and how connection to something larger than yourself protects mental health.',
    '/images/articles/cat15/cover-031.svg',
    8,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT15-032: Community Involvement and Mental Health: How Volunteering Changes Your Brain
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Community Involvement and Mental Health: How Volunteering Changes Your Brain',
    'community-involvement-mental-health-volunteering-changes-brain',
    'draft',
    'Loneliness, Social Connection & Belonging',
    ARRAY['Volunteering', 'Community', 'Research', 'Neuroscience'],
    938,
    'Dr. Sarah Chen',
    'self_help',
    'CAT15-032',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Research reveals the neurological and psychological benefits of helping others and being part of community service.',
    '/images/articles/cat15/cover-032.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT15-033: Finding Your Tribe: Shared Interests, Values, and the Search for Connection
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Finding Your Tribe: Shared Interests, Values, and the Search for Connection',
    'finding-your-tribe-shared-interests-values-search-connection',
    'draft',
    'Loneliness, Social Connection & Belonging',
    ARRAY['Community', 'Belonging', 'Connection', 'Values'],
    928,
    'Dr. Sarah Chen',
    'self_help',
    'CAT15-033',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover how to identify and connect with people who truly get you based on shared passions and principles.',
    '/images/articles/cat15/cover-033.svg',
    7,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT15-034: Places of Worship and Mental Health: The Social Benefits of Religious Community
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Places of Worship and Mental Health: The Social Benefits of Religious Community',
    'places-of-worship-mental-health-social-benefits-religious-community',
    'draft',
    'Loneliness, Social Connection & Belonging',
    ARRAY['Religious Community', 'Spirituality', 'Mental Health', 'Belonging'],
    952,
    'Dr. Sarah Chen',
    'self_help',
    'CAT15-034',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore how religious and spiritual communities provide unique mental health benefits through connection, purpose, and support.',
    '/images/articles/cat15/cover-034.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT15-035: Support Groups: Why Shared Experience Creates Powerful Healing
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Support Groups: Why Shared Experience Creates Powerful Healing',
    'support-groups-shared-experience-creates-powerful-healing',
    'draft',
    'Loneliness, Social Connection & Belonging',
    ARRAY['Support Groups', 'Peer Support', 'Community', 'Healing'],
    926,
    'Dr. Sarah Chen',
    'self_help',
    'CAT15-035',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the unique therapeutic benefits of connecting with others who truly understand your struggles.',
    '/images/articles/cat15/cover-035.svg',
    7,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT15-036: The Third Place: Why We Need Spaces That Aren''t Home or Work
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Third Place: Why We Need Spaces That Aren''t Home or Work',
    'third-place-spaces-not-home-work',
    'draft',
    'Loneliness, Social Connection & Belonging',
    ARRAY['Community', 'Urban Planning', 'Social Connection', 'Public Spaces'],
    985,
    'Dr. Sarah Chen',
    'self_help',
    'CAT15-036',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Third places — coffee shops, libraries, parks — are disappearing. Learn why these informal gathering spaces are essential for mental health and community.',
    '/images/articles/cat15/cover-036.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT15-037: How Purpose and Meaning Protect Against Loneliness
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How Purpose and Meaning Protect Against Loneliness',
    'purpose-meaning-protect-loneliness',
    'draft',
    'Loneliness, Social Connection & Belonging',
    ARRAY['Purpose', 'Meaning', 'Loneliness', 'Existential Psychology'],
    952,
    'Dr. Sarah Chen',
    'self_help',
    'CAT15-037',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Purpose is one of the strongest buffers against loneliness. Learn how a sense of meaning changes the experience of being alone.',
    '/images/articles/cat15/cover-037.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT15-038: Community Gardens, Book Clubs, and Running Groups: Low-Barrier Social Entry Points
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Community Gardens, Book Clubs, and Running Groups: Low-Barrier Social Entry Points',
    'community-gardens-book-clubs-running-groups-low-barrier-social',
    'draft',
    'Loneliness, Social Connection & Belonging',
    ARRAY['Community', 'Social Connection', 'Activities', 'Hobbies'],
    979,
    'Dr. Sarah Chen',
    'self_help',
    'CAT15-038',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Joining a group can feel intimidating. These low-barrier communities make connection accessible for people who struggle with traditional socializing.',
    '/images/articles/cat15/cover-038.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT15-039: Online Communities and Mental Health: When Virtual Belonging Fills a Real Need
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Online Communities and Mental Health: When Virtual Belonging Fills a Real Need',
    'online-communities-mental-health-virtual-belonging',
    'draft',
    'Loneliness, Social Connection & Belonging',
    ARRAY['Online Communities', 'Digital Connection', 'Mental Health', 'Belonging'],
    958,
    'Dr. Sarah Chen',
    'self_help',
    'CAT15-039',
    v_cat_id,
    v_sub_id,
    'drafted',
    'For millions of people, online communities provide connection that is not available offline. Learn when digital belonging is enough.',
    '/images/articles/cat15/cover-039.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT15-040: Social Prescribing: How Doctors Are Prescribing Connection Instead of Medication
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Social Prescribing: How Doctors Are Prescribing Connection Instead of Medication',
    'social-prescribing-connection-instead-medication',
    'draft',
    'Loneliness, Social Connection & Belonging',
    ARRAY['Social Prescribing', 'Healthcare', 'Community', 'Public Health'],
    993,
    'Dr. Sarah Chen',
    'self_help',
    'CAT15-040',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Social prescribing — referring patients to community activities instead of pills — is transforming healthcare. Learn how connection is being treated as medicine.',
    '/images/articles/cat15/cover-040.svg',
    10,
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

  -- === CAT15-031 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT15-031';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Belonging and mental health: A meta-analysis', '2018', 'https://doi.org/10.1037/bul0000178', 'Psychological Bulletin', 1),
      (v_art_id, 'peer_reviewed', 1, 'Social belonging as a fundamental need', '2019', 'https://doi.org/10.1037/pspp0000261', 'Journal of Personality and Social Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Belonging and suicide risk', '2020', 'https://doi.org/10.1016/j.cpr.2020.101878', 'Clinical Psychology Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'Social identity theory and group belonging', '2019', 'https://doi.org/10.1146/annurev-psych-010418-103043', 'Annual Review of Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Belonging uncertainty and psychological outcomes', '2018', 'https://doi.org/10.1177/1088868318756468', 'Personality and Social Psychology Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'Community belonging across cultures', '2019', 'https://doi.org/10.1177/1069397118821689', 'Cross-Cultural Research', 6),
      (v_art_id, 'peer_reviewed', 1, 'Collective identity and well-being', '2020', 'https://doi.org/10.1177/0190272519892897', 'Social Psychology Quarterly', 7),
      (v_art_id, 'peer_reviewed', 1, 'Belonging interventions in educational settings', '2019', 'https://doi.org/10.1177/0956797619845930', 'Psychological Science', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT15-032 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT15-032';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Volunteering and mental health: A systematic review', '2020', 'https://doi.org/10.1186/s12889-020-08474-8', 'BMC Public Health', 1),
      (v_art_id, 'peer_reviewed', 1, 'Neural mechanisms of prosocial behavior', '2019', 'https://doi.org/10.1038/s41593-019-0361-5', 'Nature Neuroscience', 2),
      (v_art_id, 'peer_reviewed', 1, 'Volunteering and depression in older adults', '2018', 'https://doi.org/10.1093/geronb/gbx110', 'The Journals of Gerontology: Series B', 3),
      (v_art_id, 'peer_reviewed', 1, 'Helper''s high: Neurochemistry of prosocial behavior', '2020', 'https://doi.org/10.3389/fpsyg.2020.01770', 'Frontiers in Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Community service and purpose in life', '2019', 'https://doi.org/10.1080/17439760.2018.1519589', 'Journal of Positive Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Volunteering frequency and well-being', '2020', 'https://doi.org/10.1016/j.socscimed.2020.113159', 'Social Science & Medicine', 6),
      (v_art_id, 'government', 2, 'Social connection through volunteering', '2019', 'https://doi.org/10.1002/ajcp.12360', 'American Journal of Community Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Volunteering and loneliness reduction', '2020', 'https://doi.org/10.1177/0265407519897801', 'Journal of Social and Personal Relationships', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT15-033 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT15-033';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Similarity-attraction and relationship formation', '2019', 'https://doi.org/10.1037/pspp0000271', 'Journal of Personality and Social Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Values alignment and social bonding', '2020', 'https://doi.org/10.1177/0190272519898734', 'Social Psychology Quarterly', 2),
      (v_art_id, 'peer_reviewed', 1, 'Interest-based communities and well-being', '2019', 'https://doi.org/10.1111/pere.12312', 'Personal Relationships', 3),
      (v_art_id, 'peer_reviewed', 1, 'Finding your niche: Social fit and mental health', '2018', 'https://doi.org/10.1177/0956797618789892', 'Psychological Science', 4),
      (v_art_id, 'peer_reviewed', 1, 'Online communities for niche interests', '2020', 'https://doi.org/10.1089/cyber.2019.0389', 'Cyberpsychology, Behavior, and Social Networking', 5),
      (v_art_id, 'peer_reviewed', 1, 'Values diversity and relationship satisfaction', '2019', 'https://doi.org/10.1177/0265407518812891', 'Journal of Social and Personal Relationships', 6),
      (v_art_id, 'government', 2, 'Passion-based groups and identity formation', '2020', 'https://doi.org/10.1037/gdn0000128', 'Group Dynamics: Theory, Research, and Practice', 7)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT15-034 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT15-034';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Religious attendance and mental health outcomes', '2020', 'https://doi.org/10.1176/appi.ajp.2019.19050476', 'American Journal of Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Social support in religious communities', '2019', 'https://doi.org/10.1111/jssr.12618', 'Journal for the Scientific Study of Religion', 2),
      (v_art_id, 'peer_reviewed', 1, 'Religious community and loneliness in older adults', '2018', 'https://doi.org/10.1093/geront/gnx202', 'The Gerontologist', 3),
      (v_art_id, 'peer_reviewed', 1, 'Shared rituals and group cohesion', '2019', 'https://doi.org/10.1177/0956797618817345', 'Psychological Science', 4),
      (v_art_id, 'peer_reviewed', 1, 'Religious coping and stress reduction', '2020', 'https://doi.org/10.1037/rel0000291', 'Psychology of Religion and Spirituality', 5),
      (v_art_id, 'peer_reviewed', 1, 'Purpose and meaning through religious participation', '2019', 'https://doi.org/10.1080/17439760.2018.1519590', 'Journal of Positive Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Religious community across diverse faiths', '2020', 'https://doi.org/10.1080/10508619.2019.1678548', 'International Journal for the Psychology of Religion', 7),
      (v_art_id, 'government', 2, 'Secular alternatives to religious community', '2019', 'https://doi.org/10.5334/snr.113', 'Secularism and Nonreligion', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT15-035 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT15-035';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Peer support and mental health recovery', '2020', 'https://doi.org/10.1176/appi.ps.201900283', 'Psychiatric Services', 1),
      (v_art_id, 'peer_reviewed', 1, 'Support groups for chronic illness', '2019', 'https://doi.org/10.1037/hea0000762', 'Health Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'The helper therapy principle in peer support', '2018', 'https://doi.org/10.1002/jclp.22689', 'Journal of Clinical Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Shared experience and reduced shame', '2020', 'https://doi.org/10.1016/j.socscimed.2020.113047', 'Social Science & Medicine', 4),
      (v_art_id, 'peer_reviewed', 1, 'Online vs. in-person support groups', '2019', 'https://doi.org/10.1089/cyber.2018.0602', 'Cyberpsychology, Behavior, and Social Networking', 5),
      (v_art_id, 'peer_reviewed', 1, '12-step programs and social support', '2019', 'https://doi.org/10.1111/add.14527', 'Addiction', 6),
      (v_art_id, 'government', 2, 'Group cohesion in therapeutic groups', '2020', 'https://doi.org/10.1037/gdn0000134', 'Group Dynamics: Theory, Research, and Practice', 7)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT15-036 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT15-036';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'reference', 5, 'The Great Good Place: Cafes, Coffee Shops, Bookstores, Bars, Hair Salons and Other Hangouts at the Heart of a Community', '1989', 'https://www.amazon.com/Great-Good-Place-Bookstores-Community/dp/1569246815', 'Marlowe & Company', 1),
      (v_art_id, 'peer_reviewed', 1, 'Social infrastructure and the erosion of community', '2020', 'https://doi.org/10.1080/00380253.2020.1711645', 'The Sociological Quarterly', 2),
      (v_art_id, 'peer_reviewed', 1, 'Third places and social interaction: The case of urban parks', '2019', 'https://doi.org/10.1016/j.cities.2019.01.042', 'Cities', 3),
      (v_art_id, 'peer_reviewed', 1, 'Loneliness and the decline of public spaces', '2021', 'https://doi.org/10.1002/jcop.22615', 'Journal of Community Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'The role of third places in building social capital', '2018', 'https://doi.org/10.1016/j.ssresearch.2018.03.008', 'Social Science Research', 5),
      (v_art_id, 'peer_reviewed', 1, 'Mental health benefits of green spaces: A systematic review', '2020', 'https://doi.org/10.1016/j.envres.2020.109662', 'Environmental Research', 6),
      (v_art_id, 'professional_org', 3, 'How Public Libraries Help Build Healthy Communities', '2022', 'https://www.ala.org/advocacy/health', 'American Library Association', 7),
      (v_art_id, 'reference', 5, 'Bowling Alone: The Collapse and Revival of American Community', '2000', 'https://www.amazon.com/Bowling-Alone-Collapse-American-Community/dp/0743203046', 'Simon & Schuster', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT15-037 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT15-037';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Purpose in life and loneliness: A bidirectional relationship', '2020', 'https://doi.org/10.1037/pag0000481', 'Psychology and Aging', 1),
      (v_art_id, 'peer_reviewed', 1, 'Meaning in life and social well-being', '2019', 'https://doi.org/10.1080/17439760.2018.1528380', 'Journal of Positive Psychology', 2),
      (v_art_id, 'reference', 5, 'Man''s Search for Meaning', '2006', 'https://www.amazon.com/Mans-Search-Meaning-Viktor-Frankl/dp/0807014273', 'Beacon Press', 3),
      (v_art_id, 'peer_reviewed', 1, 'Purpose and mortality: A systematic review and meta-analysis', '2019', 'https://doi.org/10.1001/jamanetworkopen.2019.4270', 'JAMA Network Open', 4),
      (v_art_id, 'peer_reviewed', 1, 'The role of purpose in life in buffering the effects of daily stress', '2018', 'https://doi.org/10.1037/hea0000591', 'Health Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Purpose in life as a predictor of adjustment to daily stressors', '2015', 'https://doi.org/10.1037/pag0000013', 'Psychology and Aging', 6),
      (v_art_id, 'peer_reviewed', 1, 'Ikigai and mortality: A prospective study', '2008', 'https://doi.org/10.1097/PSY.0b013e31818105ba', 'Psychosomatic Medicine', 7),
      (v_art_id, 'peer_reviewed', 1, 'The Loneliness of the Long-Distance Runner: How Purpose Buffers Solitude', '2021', 'https://doi.org/10.1111/jopy.12625', 'Journal of Personality', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT15-038 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT15-038';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Community gardens and social capital: A systematic review', '2020', 'https://doi.org/10.1016/j.landurbplan.2020.103890', 'Landscape and Urban Planning', 1),
      (v_art_id, 'professional_org', 3, 'Book clubs and mental health: Bibliotherapy in community settings', '2021', 'https://readingagency.org.uk/resources/research/', 'The Reading Agency', 2),
      (v_art_id, 'peer_reviewed', 1, 'Running groups and mental health: A systematic review', '2019', 'https://doi.org/10.1016/j.mhpa.2019.100315', 'Mental Health and Physical Activity', 3),
      (v_art_id, 'peer_reviewed', 1, 'Shared activities and friendship formation', '2018', 'https://doi.org/10.1177/0265407517706181', 'Journal of Social and Personal Relationships', 4),
      (v_art_id, 'peer_reviewed', 1, 'The social benefits of urban community gardens', '2020', 'https://doi.org/10.1002/jcop.22302', 'Journal of Community Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'parkrun and mental health: Community-based running for well-being', '2020', 'https://doi.org/10.1136/bmj.m1134', 'British Medical Journal', 6),
      (v_art_id, 'peer_reviewed', 1, 'Activity-based groups for social connection: A meta-analysis', '2021', 'https://doi.org/10.1016/j.socscimed.2021.113942', 'Social Science & Medicine', 7),
      (v_art_id, 'peer_reviewed', 1, 'Parallel play in adulthood: Side-by-side interaction and social bonding', '2017', 'https://doi.org/10.1177/0146167217697655', 'Personality and Social Psychology Bulletin', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT15-039 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT15-039';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Online communities and mental health: A systematic review', '2020', 'https://doi.org/10.1089/cyber.2019.0461', 'Cyberpsychology, Behavior, and Social Networking', 1),
      (v_art_id, 'peer_reviewed', 1, 'Reddit mental health communities: Content analysis and user experiences', '2021', 'https://doi.org/10.2196/27173', 'Journal of Medical Internet Research', 2),
      (v_art_id, 'peer_reviewed', 1, 'Discord and mental health support: An emerging platform', '2022', 'https://doi.org/10.1016/j.invent.2022.100502', 'Internet Interventions', 3),
      (v_art_id, 'peer_reviewed', 1, 'Online support groups for rare diseases', '2019', 'https://doi.org/10.1016/j.pec.2019.02.015', 'Patient Education and Counseling', 4),
      (v_art_id, 'peer_reviewed', 1, 'LGBTQ+ youth and online community: A lifeline', '2020', 'https://doi.org/10.1016/j.jadohealth.2020.02.019', 'Journal of Adolescent Health', 5),
      (v_art_id, 'peer_reviewed', 1, 'Parasocial relationships and mental health', '2021', 'https://doi.org/10.1037/ppm0000311', 'Psychology of Popular Media', 6),
      (v_art_id, 'peer_reviewed', 1, 'The dark side of online communities: Toxicity and mental health harm', '2021', 'https://doi.org/10.1016/j.chb.2021.106861', 'Computers in Human Behavior', 7),
      (v_art_id, 'peer_reviewed', 1, 'Identity-based online communities: Marginalized voices finding space', '2020', 'https://doi.org/10.1177/1461444820909809', 'New Media & Society', 8),
      (v_art_id, 'peer_reviewed', 1, 'Online vs. offline social support: Do they differ?', '2019', 'https://doi.org/10.1177/0265407518802463', 'Journal of Social and Personal Relationships', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT15-040 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT15-040';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Social prescribing: A systematic review of the evidence', '2020', 'https://doi.org/10.3399/bjgp20X710429', 'British Journal of General Practice', 1),
      (v_art_id, 'peer_reviewed', 1, 'Social prescribing and health outcomes: A systematic review', '2021', 'https://doi.org/10.1016/S2468-2667(21)00033-6', 'The Lancet Public Health', 2),
      (v_art_id, 'government', 2, 'Social Prescribing in Practice', '2023', 'https://www.england.nhs.uk/personalisedcare/social-prescribing/', 'NHS England', 3),
      (v_art_id, 'peer_reviewed', 1, 'The role of link workers in social prescribing', '2020', 'https://doi.org/10.1111/hsc.12839', 'Health & Social Care in the Community', 4),
      (v_art_id, 'peer_reviewed', 1, 'Cost-effectiveness of social prescribing', '2021', 'https://doi.org/10.1136/bmjopen-2020-047057', 'BMJ Open', 5),
      (v_art_id, 'peer_reviewed', 1, 'Community-based approaches to loneliness', '2020', 'https://doi.org/10.2105/AJPH.2020.305712', 'American Journal of Public Health', 6),
      (v_art_id, 'peer_reviewed', 1, 'Social prescribing in the United States: Emerging models', '2022', 'https://doi.org/10.1377/hlthaff.2021.01687', 'Health Affairs', 7),
      (v_art_id, 'peer_reviewed', 1, 'Loneliness as a public health issue: The role of primary care', '2021', 'https://doi.org/10.3122/jabfm.2021.01.200367', 'Journal of the American Board of Family Medicine', 8),
      (v_art_id, 'peer_reviewed', 1, 'Barriers and facilitators to social prescribing implementation', '2020', 'https://doi.org/10.1016/j.socscimed.2020.113315', 'Social Science & Medicine', 9),
      (v_art_id, 'peer_reviewed', 1, 'Social prescribing for mental health: A qualitative study', '2019', 'https://doi.org/10.1186/s12875-019-1010-6', 'BMC Family Practice', 10)
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
  WHERE a.article_production_id LIKE 'CAT15-%';

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;
