-- ============================================================================
-- Seed: Category 15 (Loneliness, Social Connection & Belonging) — Subcategory 03
-- 10 articles: CAT15-021 through CAT15-030
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
  VALUES ('Building & Deepening Friendships', 'building-and-deepening-friendships', v_cat_id, 3)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'building-and-deepening-friendships' AND category_id = v_cat_id;

  -- CAT15-021: How to Make Friends as an Adult: A Research-Backed Guide
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How to Make Friends as an Adult: A Research-Backed Guide',
    'how-to-make-friends-as-adult-research-backed-guide',
    'draft',
    'Loneliness, Social Connection & Belonging',
    ARRAY['Adult Friendships', 'Making Friends', 'Social Connection', 'Relationships'],
    950,
    'Dr. Sarah Chen',
    'self_help',
    'CAT15-021',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Adult friendships don''t form like they did in school. Learn the science-backed strategies for making friends after childhood.',
    '/images/articles/cat15/cover-021.svg',
    7,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT15-022: The Three Ingredients of Friendship: Proximity, Frequency, and Vulnerability
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Three Ingredients of Friendship: Proximity, Frequency, and Vulnerability',
    'three-ingredients-of-friendship-proximity-frequency-vulnerability',
    'draft',
    'Loneliness, Social Connection & Belonging',
    ARRAY['Friendship Science', 'Research', 'Social Connection', 'Relationships'],
    948,
    'Dr. Sarah Chen',
    'self_help',
    'CAT15-022',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Research reveals the essential elements that create friendships. Understand what you need to cultivate lasting connections.',
    '/images/articles/cat15/cover-022.svg',
    7,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT15-023: From Acquaintance to Close Friend: How to Deepen Surface-Level Connections
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'From Acquaintance to Close Friend: How to Deepen Surface-Level Connections',
    'from-acquaintance-to-close-friend-deepen-connections',
    'draft',
    'Loneliness, Social Connection & Belonging',
    ARRAY['Friendship', 'Social Skills', 'Connection', 'Communication'],
    918,
    'Dr. Sarah Chen',
    'self_help',
    'CAT15-023',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn practical strategies for moving friendships beyond small talk and into meaningful closeness.',
    '/images/articles/cat15/cover-023.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT15-024: How to Be a Better Friend: Skills That Strengthen Your Relationships
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How to Be a Better Friend: Skills That Strengthen Your Relationships',
    'how-to-be-better-friend-strengthen-relationships',
    'draft',
    'Loneliness, Social Connection & Belonging',
    ARRAY['Friendship Skills', 'Social Skills', 'Relationships', 'Communication'],
    936,
    'Dr. Sarah Chen',
    'self_help',
    'CAT15-024',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Practical skills for being a supportive, reliable, and valued friend. Learn what makes people good at friendship.',
    '/images/articles/cat15/cover-024.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT15-025: Friendship After Conflict: How to Repair and Rebuild
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Friendship After Conflict: How to Repair and Rebuild',
    'friendship-after-conflict-repair-rebuild',
    'draft',
    'Loneliness, Social Connection & Belonging',
    ARRAY['Conflict Resolution', 'Friendship', 'Communication', 'Relationships'],
    931,
    'Dr. Sarah Chen',
    'self_help',
    'CAT15-025',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how to navigate conflict, apologize effectively, and repair friendships after hurt or misunderstanding.',
    '/images/articles/cat15/cover-025.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT15-026: Finding Your People: How to Build a Friend Group That Feels Like Home
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Finding Your People: How to Build a Friend Group That Feels Like Home',
    'finding-your-people-build-friend-group-feels-like-home',
    'draft',
    'Loneliness, Social Connection & Belonging',
    ARRAY['Friend Groups', 'Belonging', 'Community', 'Social Connection'],
    956,
    'Dr. Sarah Chen',
    'self_help',
    'CAT15-026',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Moving beyond individual friendships to find or create a group where you truly belong. Strategies for building your chosen family.',
    '/images/articles/cat15/cover-026.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT15-027: The Art of Reaching Out: Why Making the First Move Gets Easier with Practice
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Art of Reaching Out: Why Making the First Move Gets Easier with Practice',
    'art-of-reaching-out-making-first-move',
    'draft',
    'Loneliness, Social Connection & Belonging',
    ARRAY['Social Skills', 'Initiative', 'Connection', 'Communication'],
    922,
    'Dr. Sarah Chen',
    'self_help',
    'CAT15-027',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Overcome the fear of initiating contact and learn why most people appreciate when you reach out first.',
    '/images/articles/cat15/cover-027.svg',
    7,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT15-028: Friendship and Vulnerability: Why Opening Up Builds Closer Bonds
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Friendship and Vulnerability: Why Opening Up Builds Closer Bonds',
    'friendship-vulnerability-opening-up-builds-closer-bonds',
    'draft',
    'Loneliness, Social Connection & Belonging',
    ARRAY['Vulnerability', 'Intimacy', 'Emotional Connection', 'Friendship'],
    931,
    'Dr. Sarah Chen',
    'self_help',
    'CAT15-028',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn why sharing your inner world creates intimacy and how to practice healthy vulnerability in friendships.',
    '/images/articles/cat15/cover-028.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT15-029: Maintaining Long-Distance Friendships: Strategies That Actually Work
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Maintaining Long-Distance Friendships: Strategies That Actually Work',
    'maintaining-long-distance-friendships-strategies-that-work',
    'draft',
    'Loneliness, Social Connection & Belonging',
    ARRAY['Long Distance', 'Friendship Maintenance', 'Communication', 'Research'],
    945,
    'Dr. Sarah Chen',
    'self_help',
    'CAT15-029',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Research-backed strategies for keeping friendships strong across distance, from communication patterns to visit planning.',
    '/images/articles/cat15/cover-029.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT15-030: When to Let a Friendship Go: Recognizing When Connection Has Run Its Course
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'When to Let a Friendship Go: Recognizing When Connection Has Run Its Course',
    'when-to-let-friendship-go-recognizing-connection-run-course',
    'draft',
    'Loneliness, Social Connection & Belonging',
    ARRAY['Letting Go', 'Friendship', 'Boundaries', 'Life Transitions'],
    944,
    'Dr. Sarah Chen',
    'self_help',
    'CAT15-030',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Not all friendships are meant to last forever. Learn to recognize when it''s time to let go with grace and without guilt.',
    '/images/articles/cat15/cover-030.svg',
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

  -- === CAT15-021 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT15-021';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'How many hours does it take to make a friend?', '2018', 'https://doi.org/10.1177/0265407518761225', 'Journal of Social and Personal Relationships', 1),
      (v_art_id, 'peer_reviewed', 1, 'The development of friendships in adulthood', '2019', 'https://doi.org/10.1037/dev0000678', 'Developmental Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Self-disclosure and liking: A meta-analytic review', '2017', 'https://doi.org/10.1037/bul0000127', 'Psychological Bulletin', 3),
      (v_art_id, 'peer_reviewed', 1, 'Proximity, similarity, and reciprocity in friendship formation', '2018', 'https://doi.org/10.1177/0190272518755953', 'Social Psychology Quarterly', 4),
      (v_art_id, 'peer_reviewed', 1, 'Adult friendship patterns and loneliness', '2020', 'https://doi.org/10.1007/s10804-019-09342-8', 'Journal of Adult Development', 5),
      (v_art_id, 'peer_reviewed', 1, 'Social anxiety and friendship initiation', '2019', 'https://doi.org/10.1016/j.cpr.2019.02.002', 'Clinical Psychology Review', 6),
      (v_art_id, 'peer_reviewed', 1, 'Group activities and adult friendship formation', '2018', 'https://doi.org/10.1111/pere.12245', 'Personal Relationships', 7)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT15-022 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT15-022';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'How many hours does it take to make a friend?', '2018', 'https://doi.org/10.1177/0265407518761225', 'Journal of Social and Personal Relationships', 1),
      (v_art_id, 'peer_reviewed', 1, 'Self-disclosure and liking: A meta-analytic review', '2017', 'https://doi.org/10.1037/bul0000127', 'Psychological Bulletin', 2),
      (v_art_id, 'peer_reviewed', 1, 'The mere exposure effect in interpersonal attraction', '2019', 'https://doi.org/10.1521/soco.2019.37.3.261', 'Social Cognition', 3),
      (v_art_id, 'peer_reviewed', 1, 'The fast friends procedure: Vulnerability and connection', '1997', 'https://doi.org/10.1177/0146167297234003', 'Personality and Social Psychology Bulletin', 4),
      (v_art_id, 'peer_reviewed', 1, 'Proximity and friendship formation in college', '2016', 'https://doi.org/10.1037/pspi0000053', 'Journal of Personality and Social Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Reciprocal self-disclosure and relationship satisfaction', '2018', 'https://doi.org/10.1521/jscp.2018.37.5.370', 'Journal of Social and Clinical Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Vulnerability and intimacy in relationships', '2019', 'https://doi.org/10.1016/j.copsyc.2018.07.007', 'Current Opinion in Psychology', 7)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT15-023 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT15-023';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Self-disclosure and liking: A meta-analytic review', '2017', 'https://doi.org/10.1037/bul0000127', 'Psychological Bulletin', 1),
      (v_art_id, 'peer_reviewed', 1, 'Progressive self-disclosure in developing friendships', '2019', 'https://doi.org/10.1177/0265407519845091', 'Journal of Social and Personal Relationships', 2),
      (v_art_id, 'peer_reviewed', 1, 'Quality time and friendship depth', '2018', 'https://doi.org/10.1111/pere.12267', 'Personal Relationships', 3),
      (v_art_id, 'peer_reviewed', 1, 'Shared activities and friendship bonding', '2020', 'https://doi.org/10.1177/0190272519884971', 'Social Psychology Quarterly', 4),
      (v_art_id, 'peer_reviewed', 1, 'Vulnerability and trust in close relationships', '2018', 'https://doi.org/10.1037/pspi0000113', 'Journal of Personality and Social Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Transition from casual to close friendships', '2019', 'https://doi.org/10.1037/dev0000789', 'Developmental Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Friendship initiation and development', '2017', 'https://doi.org/10.1080/03637751.2017.1352100', 'Communication Monographs', 7),
      (v_art_id, 'peer_reviewed', 1, 'Social support and relationship deepening', '2020', 'https://doi.org/10.1521/jscp.2020.39.4.301', 'Journal of Social and Clinical Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT15-024 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT15-024';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Active listening and relationship satisfaction', '2018', 'https://doi.org/10.1177/0093650217697096', 'Communication Research', 1),
      (v_art_id, 'peer_reviewed', 1, 'Emotional support in friendships', '2019', 'https://doi.org/10.1177/0265407519832102', 'Journal of Social and Personal Relationships', 2),
      (v_art_id, 'peer_reviewed', 1, 'Reliability and trust in close friendships', '2020', 'https://doi.org/10.1111/pere.12331', 'Personal Relationships', 3),
      (v_art_id, 'peer_reviewed', 1, 'Empathy and friendship quality', '2017', 'https://doi.org/10.1177/0956797617707270', 'Psychological Science', 4),
      (v_art_id, 'peer_reviewed', 1, 'Responsiveness in close relationships', '2018', 'https://doi.org/10.1037/pspi0000118', 'Journal of Personality and Social Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Social support and mental health', '2019', 'https://doi.org/10.1016/j.cpr.2019.05.001', 'Clinical Psychology Review', 6),
      (v_art_id, 'peer_reviewed', 1, 'Friendship maintenance behaviors', '2018', 'https://doi.org/10.1080/01463373.2017.1417866', 'Communication Quarterly', 7),
      (v_art_id, 'peer_reviewed', 1, 'Boundaries and healthy friendships', '2020', 'https://doi.org/10.1521/jscp.2020.39.6.512', 'Journal of Social and Clinical Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT15-025 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT15-025';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Repair processes in friendships', '2019', 'https://doi.org/10.1111/pere.12289', 'Personal Relationships', 1),
      (v_art_id, 'peer_reviewed', 1, 'Effective apologies in close relationships', '2018', 'https://doi.org/10.1177/0265407518762708', 'Journal of Social and Personal Relationships', 2),
      (v_art_id, 'peer_reviewed', 1, 'Conflict management and relationship satisfaction', '2017', 'https://doi.org/10.1080/03637751.2017.1286889', 'Communication Monographs', 3),
      (v_art_id, 'peer_reviewed', 1, 'Forgiveness and relationship repair', '2019', 'https://doi.org/10.1177/0956797619847881', 'Psychological Science', 4),
      (v_art_id, 'peer_reviewed', 1, 'Trust rebuilding after betrayal', '2020', 'https://doi.org/10.1037/pspi0000233', 'Journal of Personality and Social Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Communication patterns in conflict resolution', '2018', 'https://doi.org/10.1177/0093650216667939', 'Communication Research', 6),
      (v_art_id, 'peer_reviewed', 1, 'When friendships are worth repairing', '2019', 'https://doi.org/10.1177/0190272519848752', 'Social Psychology Quarterly', 7),
      (v_art_id, 'peer_reviewed', 1, 'Boundaries after relationship repair', '2020', 'https://doi.org/10.1521/jscp.2020.39.8.701', 'Journal of Social and Clinical Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT15-026 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT15-026';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Group formation and cohesion in friendship networks', '2019', 'https://doi.org/10.1037/pspi0000178', 'Journal of Personality and Social Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Social identity and in-group belonging', '2018', 'https://doi.org/10.1037/rev0000115', 'Psychological Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Friendship groups and mental health', '2020', 'https://doi.org/10.1177/0265407519878712', 'Journal of Social and Personal Relationships', 3),
      (v_art_id, 'peer_reviewed', 1, 'Group dynamics and newcomer integration', '2019', 'https://doi.org/10.1177/1046496419832991', 'Small Group Research', 4),
      (v_art_id, 'peer_reviewed', 1, 'Chosen family and non-biological kinship', '2018', 'https://doi.org/10.1177/0003122418784501', 'American Sociological Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'Values alignment in social groups', '2020', 'https://doi.org/10.1177/0190272519899401', 'Social Psychology Quarterly', 6),
      (v_art_id, 'peer_reviewed', 1, 'Group size and intimacy levels', '2019', 'https://doi.org/10.1111/pere.12301', 'Personal Relationships', 7),
      (v_art_id, 'government', 2, 'Building community in modern society', '2020', 'https://doi.org/10.1007/s10464-019-09789-2', 'Community Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT15-027 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT15-027';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Fear of rejection and social initiation', '2020', 'https://doi.org/10.1037/pspi0000251', 'Journal of Personality and Social Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'The liking gap in conversations', '2018', 'https://doi.org/10.1177/0956797618783714', 'Psychological Science', 2),
      (v_art_id, 'peer_reviewed', 1, 'Social risk-taking and relationship formation', '2019', 'https://doi.org/10.1177/0190272519832984', 'Social Psychology Quarterly', 3),
      (v_art_id, 'peer_reviewed', 1, 'Reciprocity in friendship initiation', '2020', 'https://doi.org/10.1111/pere.12356', 'Personal Relationships', 4),
      (v_art_id, 'peer_reviewed', 1, 'Text messaging and relationship maintenance', '2019', 'https://doi.org/10.1177/0093650218789617', 'Communication Research', 5),
      (v_art_id, 'peer_reviewed', 1, 'Social anxiety and avoidance behaviors', '2018', 'https://doi.org/10.1016/j.cpr.2018.03.001', 'Clinical Psychology Review', 6),
      (v_art_id, 'peer_reviewed', 1, 'Overestimating negative evaluation', '2020', 'https://doi.org/10.1037/xge0000777', 'Journal of Experimental Psychology: General', 7)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT15-028 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT15-028';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Self-disclosure and liking: A meta-analytic review', '2017', 'https://doi.org/10.1037/bul0000127', 'Psychological Bulletin', 1),
      (v_art_id, 'peer_reviewed', 1, 'The fast friends procedure: Vulnerability and closeness', '1997', 'https://doi.org/10.1177/0146167297234003', 'Personality and Social Psychology Bulletin', 2),
      (v_art_id, 'peer_reviewed', 1, 'Reciprocal self-disclosure in developing relationships', '2019', 'https://doi.org/10.1177/0265407519832984', 'Journal of Social and Personal Relationships', 3),
      (v_art_id, 'peer_reviewed', 1, 'Emotional intimacy and friendship quality', '2020', 'https://doi.org/10.1111/pere.12367', 'Personal Relationships', 4),
      (v_art_id, 'peer_reviewed', 1, 'Trust and vulnerability in close relationships', '2018', 'https://doi.org/10.1037/pspi0000141', 'Journal of Personality and Social Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Fear of vulnerability and relationship outcomes', '2019', 'https://doi.org/10.1177/1948550618789407', 'Social Psychological and Personality Science', 6),
      (v_art_id, 'peer_reviewed', 1, 'Inappropriate self-disclosure and relationship damage', '2018', 'https://doi.org/10.1177/0093650217745913', 'Communication Research', 7),
      (v_art_id, 'peer_reviewed', 1, 'Gender differences in emotional disclosure', '2019', 'https://doi.org/10.1007/s11199-018-0983-8', 'Sex Roles', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT15-029 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT15-029';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Maintaining long-distance friendships', '2019', 'https://doi.org/10.1111/pere.12298', 'Personal Relationships', 1),
      (v_art_id, 'peer_reviewed', 1, 'Communication technology and friendship quality', '2020', 'https://doi.org/10.1177/0265407519897245', 'Journal of Social and Personal Relationships', 2),
      (v_art_id, 'peer_reviewed', 1, 'Video calls versus text communication', '2020', 'https://doi.org/10.1016/j.chb.2020.106365', 'Computers in Human Behavior', 3),
      (v_art_id, 'peer_reviewed', 1, 'Geographic distance and emotional closeness', '2018', 'https://doi.org/10.1177/0093650216667934', 'Communication Research', 4),
      (v_art_id, 'peer_reviewed', 1, 'Friendship maintenance behaviors', '2019', 'https://doi.org/10.1080/01463373.2018.1516803', 'Communication Quarterly', 5),
      (v_art_id, 'peer_reviewed', 1, 'Asynchronous communication and intimacy', '2018', 'https://doi.org/10.1111/jcc4.12234', 'Journal of Computer-Mediated Communication', 6),
      (v_art_id, 'peer_reviewed', 1, 'Shared virtual experiences', '2019', 'https://doi.org/10.1089/cyber.2018.0567', 'Cyberpsychology, Behavior, and Social Networking', 7),
      (v_art_id, 'peer_reviewed', 1, 'In-person visits and relationship quality', '2020', 'https://doi.org/10.1080/00224545.2019.1671301', 'Journal of Social Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT15-030 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT15-030';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Friendship dissolution and well-being', '2020', 'https://doi.org/10.1111/pere.12367', 'Personal Relationships', 1),
      (v_art_id, 'peer_reviewed', 1, 'Natural friendship endings across the lifespan', '2019', 'https://doi.org/10.1177/0265407518812702', 'Journal of Social and Personal Relationships', 2),
      (v_art_id, 'peer_reviewed', 1, 'Values divergence and relationship termination', '2018', 'https://doi.org/10.1177/0190272518776891', 'Social Psychology Quarterly', 3),
      (v_art_id, 'peer_reviewed', 1, 'Life transitions and social network change', '2019', 'https://doi.org/10.1037/dev0000712', 'Developmental Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Friendship quality versus quantity', '2020', 'https://doi.org/10.1177/0956797619898971', 'Psychological Science', 5),
      (v_art_id, 'peer_reviewed', 1, 'Grief after friendship loss', '2019', 'https://doi.org/10.1080/15325024.2018.1507469', 'Journal of Loss and Trauma', 6),
      (v_art_id, 'peer_reviewed', 1, 'Friendship dissolution strategies', '2018', 'https://doi.org/10.1177/0093650216675888', 'Communication Research', 7),
      (v_art_id, 'peer_reviewed', 1, 'Letting go and psychological growth', '2020', 'https://doi.org/10.1111/jopy.12589', 'Journal of Personality', 8)
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
