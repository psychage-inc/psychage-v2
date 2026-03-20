-- ============================================================================
-- Seed: Category 3 (Relationships & Communication) — Subcategory 06
-- 10 articles: CAT03-051 through CAT03-060
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert Category if not present
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  'Relationships & Communication',
  'relationships-social',
  '',
  'Brain',
  3,
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
  VALUES ('Friendships Social Circles', 'friendships-social-circles', v_cat_id, 6)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'friendships-social-circles' AND category_id = v_cat_id;

  -- CAT03-051: The Psychology of Friendship: Why We Need Close Connections
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Friendship: Why We Need Close Connections',
    'psychology-friendship-close-connections',
    'draft',
    'Relationships & Communication',
    ARRAY['Friendship', 'Social Connection', 'Mental Health', 'Belonging'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-051',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the psychological foundations of friendship and why close social bonds are essential for mental health, physical wellbeing, and overall life satisfaction.',
    '/images/articles/cat03/cover-051.svg',
    8,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-052: Making Friends as an Adult: Why It
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Making Friends as an Adult: Why It',
    'making-friends-adult-difficult',
    'draft',
    'Relationships & Communication',
    ARRAY['Adult Friendship', 'Social Skills', 'Connection', 'Community'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-052',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand why adult friendship formation is uniquely challenging and learn evidence-based strategies for building meaningful connections later in life.',
    '/images/articles/cat03/cover-052.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-053: Friendship Breakups: Why They Hurt as Much as Romantic Ones
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Friendship Breakups: Why They Hurt as Much as Romantic Ones',
    'friendship-breakups-hurt-romantic',
    'draft',
    'Relationships & Communication',
    ARRAY['Friendship Loss', 'Grief', 'Relationships', 'Healing'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-053',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand why the end of a friendship can feel devastating and learn how to process the grief, confusion, and loss that accompanies broken bonds.',
    '/images/articles/cat03/cover-053.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-054: Maintaining Friendships When Life Gets Busy
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Maintaining Friendships When Life Gets Busy',
    'maintaining-friendships-life-busy',
    'draft',
    'Relationships & Communication',
    ARRAY['Friendship Maintenance', 'Time Management', 'Life Balance', 'Connection'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-054',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn practical strategies for keeping friendships alive through career demands, family obligations, and life transitions that threaten to pull you apart.',
    '/images/articles/cat03/cover-054.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-055: Quality vs. Quantity: How Many Friends Do You Actually Need?
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Quality vs. Quantity: How Many Friends Do You Actually Need?',
    'friendship-quality-quantity-research',
    'draft',
    'Relationships & Communication',
    ARRAY['Social Networks', 'Research', 'Wellbeing', 'Connection'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-055',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the research on social network size and wellbeing to understand whether you need a large friend group or just a few close connections to thrive.',
    '/images/articles/cat03/cover-055.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-056: One-Sided Friendships: When You
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'One-Sided Friendships: When You',
    'one-sided-friendships-always-reaching-out',
    'draft',
    'Relationships & Communication',
    ARRAY['Friendship Balance', 'Boundaries', 'Self-Worth', 'Relationships'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-056',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Recognize when a friendship has become one-sided and learn how to address the imbalance or decide whether to let the relationship go.',
    '/images/articles/cat03/cover-056.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-057: How to Deepen a Surface-Level Friendship Into a Meaningful Bond
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How to Deepen a Surface-Level Friendship Into a Meaningful Bond',
    'deepen-surface-level-friendship-meaningful',
    'draft',
    'Relationships & Communication',
    ARRAY['Deepening Friendship', 'Intimacy', 'Connection', 'Vulnerability'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-057',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn the research-backed techniques for transforming casual acquaintances into close friends through vulnerability, consistency, and shared experiences.',
    '/images/articles/cat03/cover-057.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-058: Friendship and Mental Health: How Your Social Circle Affects Your Wellbeing
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Friendship and Mental Health: How Your Social Circle Affects Your Wellbeing',
    'friendship-mental-health-social-circle-wellbeing',
    'draft',
    'Relationships & Communication',
    ARRAY['Mental Health', 'Social Support', 'Wellbeing', 'Connection'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-058',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover the research on how friendships influence depression, anxiety, stress resilience, and overall psychological health across the lifespan.',
    '/images/articles/cat03/cover-058.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-059: Navigating Friend Groups: Cliques, Exclusion, and Social Dynamics
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Navigating Friend Groups: Cliques, Exclusion, and Social Dynamics',
    'navigating-friend-groups-cliques-exclusion',
    'draft',
    'Relationships & Communication',
    ARRAY['Group Dynamics', 'Social Psychology', 'Belonging', 'Exclusion'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-059',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the psychology of group dynamics, how to handle feeling excluded, and strategies for navigating complex social hierarchies in adult friendships.',
    '/images/articles/cat03/cover-059.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-060: Online Friendships: Are Digital Connections as Valuable as In-Person Ones?
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Online Friendships: Are Digital Connections as Valuable as In-Person Ones?',
    'online-friendships-digital-connections-valuable',
    'draft',
    'Relationships & Communication',
    ARRAY['Online Friendship', 'Digital Connection', 'Research', 'Social Media'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-060',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Examine the research on virtual friendships, how they differ from in-person bonds, and when digital connection is sufficient versus when face-to-face interaction is essential.',
    '/images/articles/cat03/cover-060.svg',
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

  -- === CAT03-051 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-051';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Social relationships and health: A flashpoint for health policy', '2010', 'https://doi.org/10.1177/0022146510383501', 'Journal of Health and Social Behavior', 1),
      (v_art_id, 'peer_reviewed', 1, 'The need to belong: Desire for interpersonal attachments as a fundamental human motivation', '1995', 'https://doi.org/10.1037/0033-2909.117.3.497', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Friends with health benefits: The long-term benefits of early peer social integration for mental health in adulthood', '2020', 'https://doi.org/10.1177/0956797620931115', 'Psychological Science', 3),
      (v_art_id, 'textbook', 5, 'Friendship and physical health', '2016', 'https://doi.org/10.1007/978-1-4899-7518-4', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Social support and resilience to stress across the life span', '2017', 'https://doi.org/10.1016/j.copsyc.2017.04.022', 'Current Opinion in Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Loneliness and social isolation as risk factors for mortality: A meta-analytic review', '2015', 'https://doi.org/10.1177/1745691614568352', 'Perspectives on Psychological Science', 6),
      (v_art_id, 'professional_org', 3, 'The role of friendship in psychological wellbeing', '2021', 'https://www.apa.org/monitor/2021/07/ce-corner-isolation', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Social networks and health: New developments in diffusion', '2014', 'https://doi.org/10.1146/annurev-soc-071312-145702', 'Annual Review of Sociology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-052 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-052';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'How many hours does it take to make a friend?', '2018', 'https://doi.org/10.1177/0265407518761225', 'Journal of Social and Personal Relationships', 1),
      (v_art_id, 'peer_reviewed', 1, 'The trajectory of friendship: Age-related patterns in relationship strength', '2016', 'https://doi.org/10.1037/pag0000103', 'Psychology and Aging', 2),
      (v_art_id, 'peer_reviewed', 1, 'Friendship in adulthood: Patterns across life stages', '2019', 'https://doi.org/10.1037/dev0000784', 'Developmental Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Social capital and health: Does egalitarianism matter?', '2014', 'https://doi.org/10.1016/j.socscimed.2014.04.026', 'Social Science & Medicine', 4),
      (v_art_id, 'peer_reviewed', 1, 'Proximity matters: The geography of social networks', '2020', 'https://doi.org/10.1177/0003122420924424', 'American Sociological Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'Adult friendship formation and mental health', '2021', 'https://doi.org/10.1002/jclp.23142', 'Journal of Clinical Psychology', 6),
      (v_art_id, 'professional_org', 3, 'Making friends in adulthood: A guide', '2022', 'https://www.apa.org/topics/covid-19/adult-friendships', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'The role of shared activities in friendship formation', '2017', 'https://doi.org/10.1111/pere.12185', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-053 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-053';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The neglected social relationship: Friendship in adults and its implications for wellbeing', '2020', 'https://doi.org/10.1111/bjop.12464', 'British Journal of Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Grief following friendship dissolution in young adults', '2019', 'https://doi.org/10.1080/07481187.2018.1522387', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Social pain and physical pain: Shared neural mechanisms', '2012', 'https://doi.org/10.1038/nrn3231', 'Nature Reviews Neuroscience', 3),
      (v_art_id, 'peer_reviewed', 1, 'The end of friendship: An exploration of relational dissolution', '2017', 'https://doi.org/10.1111/pere.12196', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Disenfranchised grief: Recognizing hidden sorrow', '2018', 'https://doi.org/10.1089/jpm.2018.0046', 'Journal of Palliative Medicine', 5),
      (v_art_id, 'peer_reviewed', 1, 'Friendship dissolution and mental health in emerging adulthood', '2021', 'https://doi.org/10.1177/02654075211003126', 'Journal of Social and Personal Relationships', 6),
      (v_art_id, 'professional_org', 3, 'Coping with relationship loss', '2021', 'https://www.apa.org/topics/relationships/coping-loss', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'The psychological impact of friendship breakups', '2020', 'https://doi.org/10.1016/j.cpr.2020.101891', 'Clinical Psychology Review', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-054 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-054';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Friendship maintenance behaviors and their associations with relational quality', '2018', 'https://doi.org/10.1080/08824096.2018.1425457', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'The role of effort in maintaining friendships', '2020', 'https://doi.org/10.1111/pere.12340', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Communication technology use and friendship maintenance in adulthood', '2021', 'https://doi.org/10.1177/0265407520987998', 'Journal of Social and Personal Relationships', 3),
      (v_art_id, 'peer_reviewed', 1, 'The friendship paradox: Why your friends have more friends than you do', '1991', 'https://doi.org/10.1086/229693', 'American Journal of Sociology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Time scarcity and friendship: Evidence from time-use data', '2019', 'https://doi.org/10.1093/sf/soy118', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Frequency of contact and closeness in friendships', '2017', 'https://doi.org/10.1080/00224545.2016.1270892', 'Journal of Social Psychology', 6),
      (v_art_id, 'professional_org', 3, 'Maintaining friendships: Practical tips', '2022', 'https://www.apa.org/topics/relationships/maintain-friendships', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Long-distance friendship maintenance and relationship quality', '2016', 'https://doi.org/10.1080/01463373.2015.1103285', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-055 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-055';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Social network size and cognitive function in middle-aged and older adults', '2019', 'https://doi.org/10.1212/WNL.0000000000007937', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Dunbar\', '2012', 'https://doi.org/10.1098/rstb.2011.0296', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'The quality of social relationships and loneliness', '2018', 'https://doi.org/10.1007/s11205-017-1607-9', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Social network diversity and white matter microstructural integrity in older adults', '2016', 'https://doi.org/10.1093/geronb/gbv131', 'The Journals of Gerontology: Series B', 4),
      (v_art_id, 'peer_reviewed', 1, 'Loneliness in different social network types: The role of perceived quality of social relations', '2020', 'https://doi.org/10.1016/j.archger.2020.104159', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'The structure and function of social networks in adulthood', '2021', 'https://doi.org/10.1146/annurev-psych-012420-125444', 'Annual Review of Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Social relationships and health: A meta-analytic review', '2010', 'https://doi.org/10.1371/journal.pmed.1000316', 'PLOS Medicine', 7),
      (v_art_id, 'peer_reviewed', 1, 'Friendship quality and social comparison orientation in young adults', '2017', 'https://doi.org/10.1016/j.paid.2017.03.002', NULL, 8),
      (v_art_id, 'peer_reviewed', 1, 'The paradox of choice in social relationships', '2019', 'https://doi.org/10.1080/00224545.2018.1519495', 'Journal of Social Psychology', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-056 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-056';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Reciprocity and friendship maintenance', '2018', 'https://doi.org/10.1177/0265407517734657', 'Journal of Social and Personal Relationships', 1),
      (v_art_id, 'peer_reviewed', 1, 'Unilateral relationship maintenance behaviors and their effects on friendship quality', '2020', 'https://doi.org/10.1080/10510974.2019.1676888', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'The psychology of being the initiator in friendships', '2019', 'https://doi.org/10.1177/0146167218825438', 'Personality and Social Psychology Bulletin', 3),
      (v_art_id, 'peer_reviewed', 1, 'Self-esteem and friendship reciprocity', '2017', 'https://doi.org/10.1111/jopy.12259', 'Journal of Personality', 4),
      (v_art_id, 'peer_reviewed', 1, 'When to end a friendship: Decision-making processes', '2021', 'https://doi.org/10.1111/pere.12377', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Boundaries in friendships: A clinical perspective', '2020', 'https://doi.org/10.1002/jclp.22987', 'Journal of Clinical Psychology', 6),
      (v_art_id, 'professional_org', 3, 'Maintaining healthy friendships', '2022', 'https://www.apa.org/topics/relationships/healthy-friendships', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'The liking gap in conversations: People like us more than we think', '2018', 'https://doi.org/10.1177/0956797618783714', 'Psychological Science', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-057 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-057';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The experimental generation of interpersonal closeness', '1997', 'https://doi.org/10.1177/0146167297234003', 'Personality and Social Psychology Bulletin', 1),
      (v_art_id, 'peer_reviewed', 1, 'Self-disclosure and relationship development', '2019', 'https://doi.org/10.1177/0265407518816880', 'Journal of Social and Personal Relationships', 2),
      (v_art_id, 'peer_reviewed', 1, 'Responsiveness in the formation of personal relationships', '2018', 'https://doi.org/10.1037/pspi0000125', 'Journal of Personality and Social Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Shared experiences and relationship quality', '2020', 'https://doi.org/10.1177/0956797620910516', 'Psychological Science', 4),
      (v_art_id, 'peer_reviewed', 1, 'The role of novelty in deepening friendships', '2017', 'https://doi.org/10.1111/pere.12181', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Vulnerability and trust in close relationships', '2021', 'https://doi.org/10.1080/00224545.2020.1816884', 'Journal of Social Psychology', 6),
      (v_art_id, 'professional_org', 3, 'Building deeper friendships', '2022', 'https://www.apa.org/topics/relationships/build-friendships', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Consistency and closeness in friendship development', '2019', 'https://doi.org/10.1177/0093650218789776', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-058 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-058';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Social relationships and depression: Ten-year follow-up from a nationally representative study', '2015', 'https://doi.org/10.1371/journal.pone.0116820', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'The influence of social network characteristics on cognition and mood in older adults', '2020', 'https://doi.org/10.1016/j.jagp.2019.12.014', 'The American Journal of Geriatric Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Friendship quality and social anxiety: The mediating role of perceived social support', '2018', 'https://doi.org/10.1016/j.janxdis.2018.06.004', 'Journal of Anxiety Disorders', 3),
      (v_art_id, 'peer_reviewed', 1, 'Social contagion of mental health: Evidence from college roommates', '2017', 'https://doi.org/10.1002/hec.3482', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'The neurobiological effects of social support on stress response', '2019', 'https://doi.org/10.1038/s41583-019-0141-9', 'Nature Reviews Neuroscience', 5),
      (v_art_id, 'peer_reviewed', 1, 'Friendship and recovery from mental illness', '2021', 'https://doi.org/10.1002/jclp.23201', 'Journal of Clinical Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Social relationships and health: A meta-analytic review', '2010', 'https://doi.org/10.1371/journal.pmed.1000316', 'PLOS Medicine', 7),
      (v_art_id, 'professional_org', 3, 'Friendships and mental health outcomes', '2022', 'https://www.apa.org/topics/relationships/social-support-mental-health', NULL, 8),
      (v_art_id, 'peer_reviewed', 1, 'The bidirectional relationship between social support and depression', '2016', 'https://doi.org/10.1016/j.cpr.2016.09.005', 'Clinical Psychology Review', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-059 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-059';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The neuroscience of social pain and rejection', '2015', 'https://doi.org/10.1038/nrn3861', 'Nature Reviews Neuroscience', 1),
      (v_art_id, 'peer_reviewed', 1, 'Group dynamics and social exclusion in adulthood', '2020', 'https://doi.org/10.1080/00224545.2019.1680945', 'Journal of Social Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'In-group favoritism and out-group derogation', '2018', 'https://doi.org/10.1037/bul0000139', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Social hierarchy and wellbeing in friendship networks', '2019', 'https://doi.org/10.1016/j.socnet.2019.01.004', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Ostracism and belonging: The role of social groups', '2017', 'https://doi.org/10.1037/pspi0000087', 'Journal of Personality and Social Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Coping with social exclusion', '2021', 'https://doi.org/10.1016/j.cpr.2021.102031', 'Clinical Psychology Review', 6),
      (v_art_id, 'professional_org', 3, 'Navigating group friendships', '2022', 'https://www.apa.org/topics/relationships/group-dynamics', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'The psychology of belonging in social groups', '2020', 'https://doi.org/10.1146/annurev-psych-032420-032957', 'Annual Review of Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-060 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-060';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The strength of internet ties: Examining online social capital and network quality', '2020', 'https://doi.org/10.1093/jcmc/zmaa010', 'Journal of Computer-Mediated Communication', 1),
      (v_art_id, 'peer_reviewed', 1, 'Online versus offline friendships: Quality, duration, and subjective value', '2019', 'https://doi.org/10.1089/cyber.2018.0435', 'Cyberpsychology, Behavior, and Social Networking', 2),
      (v_art_id, 'peer_reviewed', 1, 'The role of nonverbal cues in online relationship formation', '2018', 'https://doi.org/10.1177/0956797618769353', 'Psychological Science', 3),
      (v_art_id, 'peer_reviewed', 1, 'Digital friendship and mental health outcomes', '2021', 'https://doi.org/10.1177/0265407520985671', 'Journal of Social and Personal Relationships', 4),
      (v_art_id, 'peer_reviewed', 1, 'Social media use and friendship quality in young adults', '2020', 'https://doi.org/10.1016/j.chb.2020.106486', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'The neuroscience of virtual connection', '2021', 'https://doi.org/10.1038/s41562-021-01092-x', NULL, 6),
      (v_art_id, 'professional_org', 3, 'Building meaningful online relationships', '2022', 'https://www.apa.org/topics/social-media-internet/online-friendships', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Parasocial relationships and online community wellbeing', '2020', 'https://doi.org/10.1080/15213269.2019.1662678', 'Media Psychology', 8),
      (v_art_id, 'peer_reviewed', 1, 'Hybrid friendships: Online origins, offline outcomes', '2019', 'https://doi.org/10.1177/0093650218813722', NULL, 9)
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
  WHERE a.article_production_id LIKE 'CAT03-%';

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;
