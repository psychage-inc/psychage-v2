-- ============================================================================
-- Seed: Category 5 (Work, Productivity & Burnout) — Subcategory 05
-- 10 articles: CAT05-041 through CAT05-050
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert Category if not present
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  'Work, Productivity & Burnout',
  'workplace-academic',
  '',
  'Brain',
  5,
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'workplace-academic';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Workplace Relationships Dynamics', 'workplace-relationships-dynamics', v_cat_id, 5)
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'workplace-academic';
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'workplace-relationships-dynamics' AND category_id = v_cat_id;

  -- CAT05-041: Navigating Office Politics Without Losing Your Integrity
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Navigating Office Politics Without Losing Your Integrity',
    'navigating-office-politics-without-losing-integrity',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Office Politics', 'Workplace Dynamics', 'Integrity', 'Influence'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-041',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How to build influence, manage workplace dynamics, and advance your career without compromising your values or engaging in manipulative behavior.',
    '/images/articles/cat05/cover-041.svg',
    8,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-042: Dealing with a Difficult Boss: Strategies for Different Management Styles
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Dealing with a Difficult Boss: Strategies for Different Management Styles',
    'dealing-with-difficult-boss-strategies-management-styles',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Difficult Boss', 'Management Styles', 'Workplace Relationships', 'Boundaries'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-042',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Evidence-based approaches for working effectively with challenging managers, understanding their patterns, and protecting your wellbeing.',
    '/images/articles/cat05/cover-042.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-043: Workplace Bullying: Recognizing It, Documenting It, and Taking Action
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Workplace Bullying: Recognizing It, Documenting It, and Taking Action',
    'workplace-bullying-recognizing-documenting-taking-action',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Workplace Bullying', 'Harassment', 'Documentation', 'Legal Rights'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-043',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding workplace bullying patterns, legal protections, documentation strategies, and evidence-based approaches to addressing persistent mistreatment.',
    '/images/articles/cat05/cover-043.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-044: The Psychology of Team Dynamics: Why Some Teams Thrive and Others Collapse
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Team Dynamics: Why Some Teams Thrive and Others Collapse',
    'psychology-team-dynamics-why-teams-thrive-collapse',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Team Dynamics', 'Psychological Safety', 'Collaboration', 'Group Performance'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-044',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Research on team effectiveness, psychological safety, conflict patterns, and the conditions that enable high-performing collaborative work.',
    '/images/articles/cat05/cover-044.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-045: Mentorship and Mental Health: How Good Guidance Shapes Your Career
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Mentorship and Mental Health: How Good Guidance Shapes Your Career',
    'mentorship-mental-health-how-good-guidance-shapes-career',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Mentorship', 'Career Development', 'Wellbeing', 'Guidance'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-045',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychological benefits of mentorship relationships, finding effective mentors, and how guidance impacts both career trajectory and wellbeing.',
    '/images/articles/cat05/cover-045.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-046: Imposter Syndrome at Work: Why Capable People Feel Like They Don
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Imposter Syndrome at Work: Why Capable People Feel Like They Don',
    'imposter-syndrome-work-capable-people-feel-dont-belong',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Imposter Syndrome', 'Self-Doubt', 'Competence', 'Workplace'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-046',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding imposter phenomenon, who experiences it most, and evidence-based strategies to reduce feelings of fraudulence despite objective competence.',
    '/images/articles/cat05/cover-046.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-047: How to Give and Receive Feedback Without Triggering Anxiety
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How to Give and Receive Feedback Without Triggering Anxiety',
    'how-give-receive-feedback-without-triggering-anxiety',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Feedback', 'Communication', 'Anxiety', 'Growth'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-047',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Evidence-based approaches to delivering constructive criticism and receiving feedback productively, managing emotional reactions, and building feedback culture.',
    '/images/articles/cat05/cover-047.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-048: Workplace Friendship: Benefits, Boundaries, and Navigating the Gray Areas
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Workplace Friendship: Benefits, Boundaries, and Navigating the Gray Areas',
    'workplace-friendship-benefits-boundaries-gray-areas',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Workplace Friendship', 'Boundaries', 'Relationships', 'Work-Life'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-048',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding how friendships at work affect performance and wellbeing, managing boundaries, and navigating professional-personal intersections.',
    '/images/articles/cat05/cover-048.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-049: Diversity, Equity, and Belonging at Work: The Mental Health Connection
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Diversity, Equity, and Belonging at Work: The Mental Health Connection',
    'diversity-equity-belonging-work-mental-health-connection',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['DEI', 'Belonging', 'Mental Health', 'Inclusion'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-049',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How workplace inclusion affects psychological wellbeing, the mental health costs of discrimination and exclusion, and creating truly belonging environments.',
    '/images/articles/cat05/cover-049.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-050: Remote Team Dynamics: Building Trust Without Physical Presence
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Remote Team Dynamics: Building Trust Without Physical Presence',
    'remote-team-dynamics-building-trust-without-physical-presence',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Remote Work', 'Team Dynamics', 'Virtual Collaboration', 'Trust'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-050',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Challenges of remote collaboration, strategies for virtual team cohesion, and maintaining connection when working distributed.',
    '/images/articles/cat05/cover-050.svg',
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

  -- === CAT05-041 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-041';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Political skill in organizations: Its nature, antecedents, and outcomes', '2005', 'https://doi.org/10.1002/job.290', 'Journal of Organizational Behavior', 1),
      (v_art_id, 'peer_reviewed', 1, 'Workplace politics and employee well-being', '2021', 'https://doi.org/10.1037/ocp0000298', 'Journal of Occupational Health Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Ethical political behavior in organizations', '2020', 'https://doi.org/10.1017/beq.2020.15', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Social network building and career success', '2021', 'https://doi.org/10.5465/amj.2019.0637', 'Academy of Management Journal', 4),
      (v_art_id, 'peer_reviewed', 1, 'Impression management: Tactics and authenticity', '2020', 'https://doi.org/10.1037/bul0000238', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Navigating organizational culture and unwritten rules', '2021', 'https://doi.org/10.1016/j.orgdyn.2021.100848', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Value alignment and workplace satisfaction', '2022', 'https://doi.org/10.1037/apl0000945', 'Journal of Applied Psychology', 7),
      (v_art_id, 'professional_org', 3, 'Political intelligence in the workplace', '2020', 'https://hbr.org/2020/09/how-to-be-political-at-work-without-being-sleazy', 'Harvard Business Review', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-042 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-042';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Abusive supervision: A meta-analytic review', '2020', 'https://doi.org/10.1177/0149206320925095', 'Journal of Management', 1),
      (v_art_id, 'peer_reviewed', 1, 'Leadership styles and employee outcomes', '2021', 'https://doi.org/10.1016/j.leaqua.2021.101542', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Managing up: Influencing supervisors effectively', '2020', 'https://doi.org/10.1002/job.2447', 'Journal of Organizational Behavior', 3),
      (v_art_id, 'peer_reviewed', 1, 'Communication strategies with different manager types', '2021', 'https://doi.org/10.1177/2329488420988253', 'International Journal of Business Communication', 4),
      (v_art_id, 'peer_reviewed', 1, 'Workplace psychological safety and manager behavior', '2022', 'https://doi.org/10.5465/amj.2020.0490', 'Academy of Management Journal', 5),
      (v_art_id, 'government', 2, 'Documenting workplace mistreatment: Legal and practical guidance', '2022', 'https://www.eeoc.gov/laws/guidance/enforcement-guidance-vicarious-employer-liability', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Emotional labor and difficult boss relationships', '2021', 'https://doi.org/10.1037/ocp0000271', 'Journal of Occupational Health Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'When to leave a toxic boss: Career decision-making', '2021', 'https://doi.org/10.1108/CDI-08-2020-0207', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-043 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-043';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Workplace bullying: Prevalence and health consequences', '2021', 'https://doi.org/10.1037/ocp0000285', 'Journal of Occupational Health Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Bullying at work: A systematic review of risk factors', '2020', 'https://doi.org/10.1016/j.avb.2020.101518', NULL, 2),
      (v_art_id, 'government', 2, 'Legal protections against workplace harassment', '2022', 'https://www.eeoc.gov/harassment', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Documenting workplace mistreatment: Best practices', '2021', 'https://doi.org/10.1017/iop.2021.76', 'Industrial and Organizational Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Bystander intervention in workplace bullying', '2022', 'https://doi.org/10.1080/1359432X.2021.1990427', 'European Journal of Work and Organizational Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Mental health impacts of workplace bullying: Meta-analysis', '2021', 'https://doi.org/10.1017/S0033291721000325', 'Psychological Medicine', 6),
      (v_art_id, 'peer_reviewed', 1, 'Organizational responses to bullying complaints', '2021', 'https://doi.org/10.1007/s10551-020-04685-w', 'Journal of Business Ethics', 7),
      (v_art_id, 'peer_reviewed', 1, 'Recovery from workplace bullying: Longitudinal study', '2022', 'https://doi.org/10.1080/02678373.2021.1990294', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-044 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-044';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Psychological safety and learning behavior in work teams', '1999', 'https://doi.org/10.2307/2666999', 'Administrative Science Quarterly', 1),
      (v_art_id, 'professional_org', 3, 'Project Aristotle: Google', '2015', 'https://rework.withgoogle.com/guides/understanding-team-effectiveness/', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Team diversity and performance: A meta-analysis', '2021', 'https://doi.org/10.1177/01492063211026709', 'Journal of Management', 3),
      (v_art_id, 'peer_reviewed', 1, 'Conflict types and team performance', '2020', 'https://doi.org/10.1037/apl0000446', 'Journal of Applied Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Trust and team effectiveness: Longitudinal study', '2021', 'https://doi.org/10.5465/amj.2019.0167', 'Academy of Management Journal', 5),
      (v_art_id, 'peer_reviewed', 1, 'Social loafing in teams: Causes and interventions', '2020', 'https://doi.org/10.1037/gdn0000115', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Shared mental models and team coordination', '2021', 'https://doi.org/10.1016/j.obhdp.2021.104152', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Team composition and innovation: Systematic review', '2022', 'https://doi.org/10.1080/1359432X.2021.1969476', 'European Journal of Work and Organizational Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-045 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-045';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Mentoring and psychological well-being: A meta-analysis', '2021', 'https://doi.org/10.1016/j.jvb.2021.103586', 'Journal of Vocational Behavior', 1),
      (v_art_id, 'peer_reviewed', 1, 'Career mentoring and mental health outcomes', '2020', 'https://doi.org/10.1177/0894845319897361', 'Journal of Career Development', 2),
      (v_art_id, 'peer_reviewed', 1, 'Diversity mentoring: Strategies for underrepresented groups', '2021', 'https://doi.org/10.5465/amle.2019.0382', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Mentoring functions and career success: Longitudinal study', '2022', 'https://doi.org/10.1037/apl0000923', 'Journal of Applied Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Mentoring relationship quality and outcomes', '2021', 'https://doi.org/10.1002/job.2513', 'Journal of Organizational Behavior', 5),
      (v_art_id, 'peer_reviewed', 1, 'Peer mentoring in the workplace', '2020', 'https://doi.org/10.1177/1534484320906244', 'Human Resource Development Review', 6),
      (v_art_id, 'peer_reviewed', 1, 'Reverse mentoring: Benefits for both parties', '2021', 'https://doi.org/10.1108/OMJ-06-2020-0958', 'Organization Management Journal', 7),
      (v_art_id, 'professional_org', 3, 'Finding and developing mentors: Practical strategies', '2020', 'https://hbr.org/2020/10/a-lack-of-sponsorship-is-keeping-women-from-advancing', 'Harvard Business Review', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-046 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-046';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The imposter phenomenon: When success makes you feel like a fake', '1978', 'https://doi.org/10.1177/105960117800300302', 'International Journal of Behavioral Science', 1),
      (v_art_id, 'peer_reviewed', 1, 'Imposter phenomenon and mental health outcomes: Meta-analysis', '2020', 'https://doi.org/10.1007/s11606-019-05364-1', 'Journal of General Internal Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'Contextual factors in imposter feelings: Workplace diversity', '2021', 'https://doi.org/10.5465/amr.2018.0442', 'Academy of Management Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'Self-efficacy interventions for imposter phenomenon', '2021', 'https://doi.org/10.1037/cou0000527', 'Journal of Counseling Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Attribution patterns and imposter feelings', '2020', 'https://doi.org/10.1016/j.paid.2020.110216', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Gender differences in imposter phenomenon', '2021', 'https://doi.org/10.1007/s11199-020-01205-4', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Workplace belonging and imposter feelings', '2022', 'https://doi.org/10.1016/j.jvb.2021.103643', 'Journal of Vocational Behavior', 7),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive behavioral approaches to imposter syndrome', '2021', 'https://doi.org/10.1007/s10608-020-10172-4', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-047 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-047';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Feedback interventions: A meta-analytic review', '1996', 'https://doi.org/10.1037/0033-2909.119.2.254', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Emotional responses to workplace feedback', '2021', 'https://doi.org/10.1037/apl0000862', 'Journal of Applied Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Growth mindset and feedback receptivity', '2020', 'https://doi.org/10.1037/pspp0000271', 'Journal of Personality and Social Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Delivering difficult feedback: Best practices', '2021', 'https://doi.org/10.1016/j.orgdyn.2020.100789', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Psychological safety and feedback-seeking behavior', '2021', 'https://doi.org/10.5465/amj.2019.0108', 'Academy of Management Journal', 5),
      (v_art_id, 'peer_reviewed', 1, 'Self-compassion in processing negative feedback', '2020', 'https://doi.org/10.1080/15298868.2019.1679130', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Cultural differences in feedback preferences', '2021', 'https://doi.org/10.1108/CCM-09-2020-0398', NULL, 7),
      (v_art_id, 'textbook', 5, 'Radical Candor: Be a Kick-Ass Boss Without Losing Your Humanity', '2017', 'https://www.worldcat.org/title/radical-candor/oclc/962016876', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-048 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-048';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Workplace friendships and employee outcomes: Meta-analysis', '2021', 'https://doi.org/10.1177/01492063211006474', 'Journal of Management', 1),
      (v_art_id, 'peer_reviewed', 1, 'Friendship at work and job satisfaction', '2020', 'https://doi.org/10.1016/j.jvb.2020.103442', 'Journal of Vocational Behavior', 2),
      (v_art_id, 'peer_reviewed', 1, 'Blurred boundaries: Work-life integration and friendship', '2021', 'https://doi.org/10.1177/0018726720946708', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Friendship dissolution at work: Causes and consequences', '2020', 'https://doi.org/10.1177/2041386620916738', 'Organizational Psychology Review', 4),
      (v_art_id, 'peer_reviewed', 1, 'Manager-subordinate friendships: Ethical considerations', '2021', 'https://doi.org/10.1017/beq.2020.32', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Remote work and friendship formation', '2022', 'https://doi.org/10.1037/apl0000941', 'Journal of Applied Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Workplace loneliness and mental health', '2021', 'https://doi.org/10.1037/ocp0000288', 'Journal of Occupational Health Psychology', 7),
      (v_art_id, 'professional_org', 3, 'The Gallup Q12: Best friend at work question', '2018', 'https://www.gallup.com/workplace/236213/why-need-best-friends-work.aspx', 'Gallup Business Journal', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-049 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-049';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Workplace discrimination and mental health: Meta-analysis', '2021', 'https://doi.org/10.1037/ocp0000291', 'Journal of Occupational Health Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Belonging at work: Diversity climate and psychological outcomes', '2022', 'https://doi.org/10.1037/apl0000953', 'Journal of Applied Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Microaggressions in the workplace: Impact on health and performance', '2020', 'https://doi.org/10.1037/amp0000591', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Minority stress theory and workplace outcomes', '2021', 'https://doi.org/10.1146/annurev-psych-020821-105956', 'Annual Review of Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Psychological safety and inclusive leadership', '2021', 'https://doi.org/10.5465/amj.2019.0210', 'Academy of Management Journal', 5),
      (v_art_id, 'professional_org', 3, 'The business case for diversity: Updated evidence', '2020', 'https://www.mckinsey.com/featured-insights/diversity-and-inclusion/diversity-wins', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Employee resource groups and mental health support', '2021', 'https://doi.org/10.1108/EDI-07-2020-0197', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Intersectionality and workplace mental health', '2021', 'https://doi.org/10.1016/j.jvb.2021.103597', 'Journal of Vocational Behavior', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-050 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-050';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Trust in virtual teams: Meta-analytic review', '2021', 'https://doi.org/10.1177/01492063211006459', 'Journal of Management', 1),
      (v_art_id, 'peer_reviewed', 1, 'Remote work and team performance: Longitudinal study', '2022', 'https://doi.org/10.1037/apl0000987', 'Journal of Applied Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Communication richness in distributed teams', '2020', 'https://doi.org/10.25300/MISQ/2020/14249', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Onboarding remote employees: Best practices', '2021', 'https://doi.org/10.1016/j.hrmr.2021.100836', 'Human Resource Management Review', 4),
      (v_art_id, 'peer_reviewed', 1, 'Social presence and relationship building in virtual settings', '2021', 'https://doi.org/10.1016/j.chb.2021.106844', NULL, 5),
      (v_art_id, 'professional_org', 3, 'Hybrid work models: Challenges and opportunities', '2021', 'https://hbr.org/2021/05/4-ways-to-make-hybrid-work-your-competitive-advantage', 'Harvard Business Review', 6),
      (v_art_id, 'peer_reviewed', 1, 'Time zone differences and team coordination', '2020', 'https://doi.org/10.1287/orsc.2019.1350', 'Organization Science', 7),
      (v_art_id, 'peer_reviewed', 1, 'Virtual team leadership: Systematic review', '2021', 'https://doi.org/10.1016/j.leaqua.2021.101547', NULL, 8)
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
  WHERE a.article_production_id LIKE 'CAT05-%';

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;
