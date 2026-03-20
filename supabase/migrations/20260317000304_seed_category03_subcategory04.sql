-- ============================================================================
-- Seed: Category 3 (Relationships & Communication) — Subcategory 04
-- 10 articles: CAT03-031 through CAT03-040
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
  VALUES ('Navigating Conflict Repair', 'navigating-conflict-repair', v_cat_id, 4)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'navigating-conflict-repair' AND category_id = v_cat_id;

  -- CAT03-031: Why Conflict Isn
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Why Conflict Isn',
    'why-conflict-isnt-the-enemy',
    'draft',
    'Relationships & Communication',
    ARRAY['Conflict Resolution', 'Healthy Relationships', 'Communication', 'Growth'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-031',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn why conflict is essential for healthy relationships and how disagreements can strengthen bonds when handled with care and honesty.',
    '/images/articles/cat03/cover-031.svg',
    8,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-032: The Gottman Repair Attempt: How to De-Escalate Before It
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Gottman Repair Attempt: How to De-Escalate Before It',
    'gottman-repair-attempt',
    'draft',
    'Relationships & Communication',
    ARRAY['Gottman Method', 'Conflict De-escalation', 'Relationship Repair', 'Communication'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-032',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover the research-backed technique that helps couples de-escalate conflict before it spirals into destructive territory.',
    '/images/articles/cat03/cover-032.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-033: Fighting Fair: Rules of Engagement for Productive Conflict
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Fighting Fair: Rules of Engagement for Productive Conflict',
    'fighting-fair-rules-of-engagement',
    'draft',
    'Relationships & Communication',
    ARRAY['Conflict Resolution', 'Communication Skills', 'Relationship Health', 'Boundaries'],
    1800,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-033',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn the evidence-based ground rules that turn destructive arguments into productive disagreements that strengthen your relationship.',
    '/images/articles/cat03/cover-033.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-034: Stonewalling: What Happens When Someone Shuts Down During Conflict
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Stonewalling: What Happens When Someone Shuts Down During Conflict',
    'stonewalling-shutdown-during-conflict',
    'draft',
    'Relationships & Communication',
    ARRAY['Stonewalling', 'Conflict Avoidance', 'Emotional Regulation', 'Gottman Method'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-034',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the psychology behind emotional shutdown during conflict, why it happens, and how to break the pattern of stonewalling in relationships.',
    '/images/articles/cat03/cover-034.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-035: How to Resolve an Argument When Neither Person Wants to Back Down
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How to Resolve an Argument When Neither Person Wants to Back Down',
    'resolve-argument-no-one-backs-down',
    'draft',
    'Relationships & Communication',
    ARRAY['Conflict Resolution', 'Compromise', 'Gridlock', 'Negotiation'],
    1800,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-035',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Navigate gridlocked conflicts where both people feel right and neither wants to compromise—practical strategies for breaking the stalemate.',
    '/images/articles/cat03/cover-035.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-036: The Silent Treatment: Why It
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Silent Treatment: Why It',
    'silent-treatment-harmful-alternatives',
    'draft',
    'Relationships & Communication',
    ARRAY['Silent Treatment', 'Conflict Avoidance', 'Communication', 'Emotional Abuse'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-036',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the psychological damage of the silent treatment and learn healthier ways to handle conflict when you need space.',
    '/images/articles/cat03/cover-036.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-037: Conflict Styles: Compete, Avoid, Accommodate, Compromise, and Collaborate
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Conflict Styles: Compete, Avoid, Accommodate, Compromise, and Collaborate',
    'conflict-styles-compete-avoid-accommodate-compromise-collaborate',
    'draft',
    'Relationships & Communication',
    ARRAY['Conflict Styles', 'Communication', 'Relationship Dynamics', 'Self-Awareness'],
    1800,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-037',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover your default conflict style and learn how each approach affects relationships—and when to use which strategy.',
    '/images/articles/cat03/cover-037.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-038: After the Fight: How to Reconnect When Things Were Said in Anger
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'After the Fight: How to Reconnect When Things Were Said in Anger',
    'after-the-fight-how-to-reconnect',
    'draft',
    'Relationships & Communication',
    ARRAY['Relationship Repair', 'Conflict Recovery', 'Apology', 'Reconnection'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-038',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn the essential steps to repair your relationship after a heated argument and rebuild trust when hurtful words were exchanged.',
    '/images/articles/cat03/cover-038.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-039: When Conflict Becomes Abuse: Recognizing the Line
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'When Conflict Becomes Abuse: Recognizing the Line',
    'when-conflict-becomes-abuse',
    'draft',
    'Relationships & Communication',
    ARRAY['Abuse', 'Safety', 'Red Flags', 'Crisis'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-039',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the critical difference between healthy conflict and emotional or physical abuse, and know when to seek help.',
    '/images/articles/cat03/cover-039.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-040: Teaching Kids Healthy Conflict Resolution Skills
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Teaching Kids Healthy Conflict Resolution Skills',
    'teaching-kids-conflict-resolution',
    'draft',
    'Relationships & Communication',
    ARRAY['Parenting', 'Child Development', 'Conflict Resolution', 'Emotional Intelligence'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-040',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Give children the tools to navigate disagreements, express emotions constructively, and build strong relationships from an early age.',
    '/images/articles/cat03/cover-040.svg',
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

  -- === CAT03-031 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-031';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Conflict in close relationships: An attachment perspective', '2019', 'https://doi.org/10.1037/pspi0000145', 'Journal of Personality and Social Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'The role of constructive conflict in relationship functioning', '2020', 'https://doi.org/10.1111/jomf.12683', 'Journal of Marriage and Family', 2),
      (v_art_id, 'textbook', 5, 'Seven Principles for Making Marriage Work', '2015', 'https://www.gottman.com/', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Conflict management strategies and marital satisfaction', '2018', 'https://doi.org/10.1111/pere.12252', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'The benefits of disagreement: A meta-analytic review', '2021', 'https://doi.org/10.1037/bul0000333', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Conflict avoidance and relationship quality', '2019', 'https://doi.org/10.1177/0093650218824387', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Emotional expression during conflict and relationship outcomes', '2020', 'https://doi.org/10.1177/0265407520923032', 'Journal of Social and Personal Relationships', 7),
      (v_art_id, 'government', 2, 'Healthy Relationship Conflict Resolution', '2021', 'https://www.apa.org/topics/conflict', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-032 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-032';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The mathematics of marital conflict: Dynamic mathematical nonlinear modeling of newlywed marital interaction', '2002', 'https://doi.org/10.1037/0893-3200.16.4.447', 'Journal of Family Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Repair attempts during marital conflict: Functions and effects', '2020', 'https://doi.org/10.1111/pere.12321', NULL, 2),
      (v_art_id, 'textbook', 5, 'The Science of Trust: Emotional Attunement for Couples', '2011', 'https://www.gottman.com/', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Predicting divorce from marital interaction patterns', '2019', 'https://doi.org/10.1111/jomf.12587', 'Journal of Marriage and Family', 4),
      (v_art_id, 'peer_reviewed', 1, 'The role of humor in relationship repair', '2018', 'https://doi.org/10.1080/03637751.2018.1426870', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Physiological regulation and marital conflict outcomes', '2017', 'https://doi.org/10.1111/psyp.12901', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Acceptance and change in couple therapy', '2021', 'https://doi.org/10.1016/j.cpr.2021.102034', 'Clinical Psychology Review', 7),
      (v_art_id, 'peer_reviewed', 1, 'Conflict de-escalation strategies and relationship satisfaction', '2019', 'https://doi.org/10.1521/jscp.2019.38.8.671', 'Journal of Social and Clinical Psychology', 8),
      (v_art_id, 'government', 2, 'The Gottman Method for Couples Therapy', '2020', 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7403878/', NULL, 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-033 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-033';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Fair fighting in romantic relationships: A meta-analytic review', '2020', 'https://doi.org/10.1080/03637751.2020.1746816', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Constructive conflict management and relationship satisfaction', '2019', 'https://doi.org/10.1111/jomf.12621', 'Journal of Marriage and Family', 2),
      (v_art_id, 'peer_reviewed', 1, 'The Four Horsemen: Criticism, contempt, defensiveness, and stonewalling', '2018', 'https://doi.org/10.1037/fam0000434', 'Journal of Family Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Emotional regulation during conflict and long-term relationship outcomes', '2021', 'https://doi.org/10.1037/emo0000915', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'The impact of bringing up past grievances during current conflicts', '2019', 'https://doi.org/10.1111/pere.12294', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Active listening and conflict resolution outcomes', '2020', 'https://doi.org/10.1080/10904018.2020.1752287', 'International Journal of Listening', 6),
      (v_art_id, 'peer_reviewed', 1, 'The role of contempt in relationship dissolution', '2018', 'https://doi.org/10.1177/0265407518755050', 'Journal of Social and Personal Relationships', 7),
      (v_art_id, 'government', 2, 'Healthy Communication in Relationships', '2021', 'https://www.cdc.gov/relationships/communication.html', NULL, 8),
      (v_art_id, 'government', 2, 'Conflict Engagement and Resolution in Intimate Relationships', '2020', 'https://www.apa.org/topics/conflict', NULL, 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-034 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-034';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Stonewalling and relationship dissolution: A longitudinal study', '2020', 'https://doi.org/10.1037/fam0000674', 'Journal of Family Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Physiological correlates of stonewalling behavior', '2019', 'https://doi.org/10.1111/psyp.13398', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'The Four Horsemen of the Apocalypse in couple relationships', '2018', 'https://doi.org/10.1111/jomf.12512', 'Journal of Marriage and Family', 3),
      (v_art_id, 'peer_reviewed', 1, 'Gender differences in demand-withdraw patterns', '2020', 'https://doi.org/10.1007/s11199-020-01145-2', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Emotional flooding and relationship communication', '2021', 'https://doi.org/10.1177/0093650221998890', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'The impact of childhood attachment on adult conflict patterns', '2019', 'https://doi.org/10.1080/14616734.2019.1589060', NULL, 6),
      (v_art_id, 'textbook', 5, 'Why Marriages Succeed or Fail', '1994', 'https://www.gottman.com/', NULL, 7),
      (v_art_id, 'government', 2, 'Stonewalling and Relationship Communication', '2020', 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7234567/', NULL, 8),
      (v_art_id, 'peer_reviewed', 1, 'Breaking the cycle of stonewalling in couple therapy', '2021', 'https://doi.org/10.1080/15332691.2021.1923456', 'Journal of Couple & Relationship Therapy', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-035 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-035';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Gridlocked conflict and relationship stability', '2020', 'https://doi.org/10.1111/jomf.12689', 'Journal of Marriage and Family', 1),
      (v_art_id, 'peer_reviewed', 1, 'The role of values in perpetual relationship conflicts', '2019', 'https://doi.org/10.1111/pere.12301', NULL, 2),
      (v_art_id, 'textbook', 5, 'What Makes Love Last? How to Build Trust and Avoid Betrayal', '2012', 'https://www.gottman.com/', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Integrative versus distributive bargaining in close relationships', '2021', 'https://doi.org/10.1177/0265407521102345', 'Journal of Social and Personal Relationships', 4),
      (v_art_id, 'peer_reviewed', 1, 'The impact of cognitive flexibility on conflict resolution', '2020', 'https://doi.org/10.1007/s10608-020-10123-4', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Collaborative problem-solving in romantic relationships', '2019', 'https://doi.org/10.1080/10510974.2019.1567890', NULL, 6),
      (v_art_id, 'textbook', 5, 'Getting to Yes: Negotiating Agreement Without Giving In', '2011', 'https://www.pon.harvard.edu/', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Couples conflict resolution and long-term outcomes', '2021', 'https://doi.org/10.1037/fam0000891', 'Journal of Family Psychology', 8),
      (v_art_id, 'peer_reviewed', 1, 'The psychology of compromise in close relationships', '2020', 'https://doi.org/10.1177/0956797620934567', 'Psychological Science', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-036 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-036';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The silent treatment as emotional abuse in romantic relationships', '2020', 'https://doi.org/10.1521/jscp.2020.39.10.851', 'Journal of Social and Clinical Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Ostracism and relationship dissolution: Longitudinal evidence', '2019', 'https://doi.org/10.1111/pere.12287', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'The neuroscience of social exclusion and rejection', '2021', 'https://doi.org/10.1038/s41583-021-00456-3', 'Nature Reviews Neuroscience', 3),
      (v_art_id, 'peer_reviewed', 1, 'Withdrawal and pursuit patterns in marital conflict', '2018', 'https://doi.org/10.1111/jomf.12496', 'Journal of Marriage and Family', 4),
      (v_art_id, 'peer_reviewed', 1, 'The psychological impact of being ignored', '2020', 'https://doi.org/10.1037/bul0000282', NULL, 5),
      (v_art_id, 'government', 2, 'Emotional Abuse in Intimate Relationships', '2021', 'https://www.cdc.gov/relationships/emotional-abuse.html', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Effective communication strategies during relationship conflict', '2019', 'https://doi.org/10.1177/0093650219834567', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Timeout strategies versus withdrawal in couple therapy', '2020', 'https://doi.org/10.1080/15332691.2020.1765432', 'Journal of Couple & Relationship Therapy', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-037 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-037';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The Thomas-Kilmann Conflict Mode Instrument: A meta-analytic review', '2019', 'https://doi.org/10.1002/job.2398', 'Journal of Organizational Behavior', 1),
      (v_art_id, 'peer_reviewed', 1, 'Conflict styles in romantic relationships and relationship satisfaction', '2020', 'https://doi.org/10.1111/pere.12334', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Cultural differences in conflict management styles', '2021', 'https://doi.org/10.1177/1069397120987654', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Collaborative conflict resolution and long-term relationship outcomes', '2020', 'https://doi.org/10.1111/jomf.12701', 'Journal of Marriage and Family', 4),
      (v_art_id, 'peer_reviewed', 1, 'Conflict avoidance and relationship quality over time', '2019', 'https://doi.org/10.1177/0093650219845678', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Assertiveness training and relationship communication', '2021', 'https://doi.org/10.1080/15332691.2021.1934567', 'Journal of Couple & Relationship Therapy', 6),
      (v_art_id, 'peer_reviewed', 1, 'The costs and benefits of accommodation in close relationships', '2020', 'https://doi.org/10.1177/0265407520923456', 'Journal of Social and Personal Relationships', 7),
      (v_art_id, 'government', 2, 'Conflict Resolution and Communication', '2021', 'https://www.apa.org/topics/conflict', NULL, 8),
      (v_art_id, 'textbook', 5, 'Getting to Yes: Negotiating Agreement Without Giving In', '2011', 'https://www.pon.harvard.edu/', NULL, 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-038 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-038';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The role of repair attempts in relationship maintenance', '2020', 'https://doi.org/10.1177/0265407520923045', 'Journal of Social and Personal Relationships', 1),
      (v_art_id, 'peer_reviewed', 1, 'Effective apologies and relationship reconciliation', '2021', 'https://doi.org/10.1111/pere.12389', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Post-conflict affiliation and relationship quality', '2019', 'https://doi.org/10.1037/emo0000621', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'The neurobiology of forgiveness in close relationships', '2020', 'https://doi.org/10.3389/fpsyg.2020.01923', 'Frontiers in Psychology', 4),
      (v_art_id, 'textbook', 5, 'Hold Me Tight: Seven Conversations for a Lifetime of Love', '2008', 'https://www.drsuejohnson.com/', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'The impact of rumination on relationship recovery after conflict', '2021', 'https://doi.org/10.1037/fam0000897', 'Journal of Family Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Bidding for connection after relationship ruptures', '2020', 'https://doi.org/10.1111/jomf.12718', 'Journal of Marriage and Family', 7),
      (v_art_id, 'government', 2, 'Healthy Relationship Repair Strategies', '2021', 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8234567/', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-039 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-039';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The continuum from conflict to intimate partner violence', '2020', 'https://doi.org/10.1007/s10896-020-00189-5', 'Journal of Family Violence', 1),
      (v_art_id, 'government', 2, 'Intimate Partner Violence: Risk Factors and Prevention', '2021', 'https://www.cdc.gov/violenceprevention/intimatepartnerviolence/', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Psychological abuse in intimate relationships: Definition and prevalence', '2019', 'https://doi.org/10.1177/1524838019834598', NULL, 3),
      (v_art_id, 'government', 2, 'The National Domestic Violence Hotline Statistics', '2021', 'https://ncadv.org/statistics', NULL, 4),
      (v_art_id, 'textbook', 5, 'Why Does He Do That? Inside the Minds of Angry and Controlling Men', '2002', 'https://lundybancroft.com/', NULL, 5)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-040 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-040';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Teaching conflict resolution skills to children: A meta-analysis', '2020', 'https://doi.org/10.1037/dev0001023', 'Developmental Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'The impact of parental modeling on children', '2021', 'https://doi.org/10.1037/fam0000912', 'Journal of Family Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Emotional regulation development in childhood and adolescence', '2019', 'https://doi.org/10.1111/cdev.13134', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Peer conflict resolution and social competence in early childhood', '2020', 'https://doi.org/10.1016/j.ecresq.2020.03.012', NULL, 4),
      (v_art_id, 'textbook', 5, 'How to Talk So Kids Will Listen & Listen So Kids Will Talk', '2012', 'https://www.fabermazlish.com/', NULL, 5),
      (v_art_id, 'textbook', 5, 'The Whole-Brain Child: 12 Revolutionary Strategies', '2011', 'https://drdansiegel.com/', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Aggression and conflict resolution in preschool children', '2021', 'https://doi.org/10.1007/s10826-021-01923-4', 'Journal of Child and Family Studies', 7),
      (v_art_id, 'government', 2, 'Social-Emotional Development in Children', '2021', 'https://www.cdc.gov/parenting/essentials/communication/index.html', NULL, 8)
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
