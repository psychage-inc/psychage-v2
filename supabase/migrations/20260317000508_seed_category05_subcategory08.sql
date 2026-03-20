-- ============================================================================
-- Seed: Category 5 (Work, Productivity & Burnout) — Subcategory 08
-- 5 articles: CAT05-071 through CAT05-075
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
  VALUES ('Leadership Organizational Wellbeing', 'leadership-organizational-wellbeing', v_cat_id, 8)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'leadership-organizational-wellbeing' AND category_id = v_cat_id;

  -- CAT05-071: Leading with Emotional Intelligence: Why the Best Leaders Manage Their Own Emotions First
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Leading with Emotional Intelligence: Why the Best Leaders Manage Their Own Emotions First',
    'leading-emotional-intelligence-best-leaders-manage-own-emotions',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Leadership', 'Emotional Intelligence', 'Self-Awareness', 'Management'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-071',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Effective leadership starts with self-awareness and emotional regulation. Learn why managing your own emotions is the foundation of leading others and evidence-based strategies for developing emotional intelligence as a leader.',
    '/images/articles/cat05/cover-071.svg',
    8,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-072: Managing Employee Mental Health: A Guide for Leaders Who Want to Help
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Managing Employee Mental Health: A Guide for Leaders Who Want to Help',
    'managing-employee-mental-health-guide-for-leaders',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Leadership', 'Mental Health', 'Management', 'Support'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-072',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Leaders play crucial role in team mental health but often feel unprepared. Learn practical, evidence-based approaches to support employees without overstepping boundaries or becoming therapist.',
    '/images/articles/cat05/cover-072.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-073: Burnout-Proof Leadership: How Managers Can Protect Their Teams
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Burnout-Proof Leadership: How Managers Can Protect Their Teams',
    'burnout-proof-leadership-protect-teams',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Burnout', 'Leadership', 'Team Health', 'Prevention'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-073',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Managers are first line of defense against team burnout. Learn evidence-based practices to recognize early warning signs, reduce unnecessary stressors, and build sustainable high-performance cultures.',
    '/images/articles/cat05/cover-073.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-074: Creating a Psychologically Safe Workplace: An Evidence-Based Approach
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Creating a Psychologically Safe Workplace: An Evidence-Based Approach',
    'psychological-safety-workplace-evidence-based-approach',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Psychological Safety', 'Team Culture', 'Leadership', 'Innovation'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-074',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Psychological safety—the belief that you can take risks without punishment—is foundation of high-performing teams. Learn how leaders create environments where people speak up, innovate, and thrive.',
    '/images/articles/cat05/cover-074.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-075: Why Organizational Culture Matters More Than Any Wellness Program
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Why Organizational Culture Matters More Than Any Wellness Program',
    'organizational-culture-matters-more-than-wellness-programs',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Organizational Culture', 'Wellbeing', 'Workplace', 'Systems'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-075',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Yoga classes and meditation apps don',
    '/images/articles/cat05/cover-075.svg',
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

  -- === CAT05-071 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-071';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Emotional intelligence and leadership effectiveness: A meta-analysis', '2023', 'https://doi.org/10.1016/j.leaqua.2023.101682', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Leader emotion regulation and team outcomes', '2023', 'https://doi.org/10.1037/apl0001074', 'Journal of Applied Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Self-awareness as foundation of leadership development', '2023', 'https://doi.org/10.5465/amle.2021.0392', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Emotional contagion in leader-team interactions', '2023', 'https://doi.org/10.1016/j.obhdp.2023.104238', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness-based leadership development interventions: Efficacy and mechanisms', '2023', 'https://doi.org/10.1177/01492063231184572', 'Journal of Management', 5),
      (v_art_id, 'textbook', 5, 'Vulnerability in leadership: When sharing struggle builds trust', '2023', 'https://hbr.org/2023/05/vulnerability-leadership', 'Harvard Business Review', 6),
      (v_art_id, 'peer_reviewed', 1, 'Leader stress and decision quality: The mediating role of emotional regulation', '2023', 'https://doi.org/10.1002/job.2687', 'Journal of Organizational Behavior', 7),
      (v_art_id, 'peer_reviewed', 1, 'Authenticity versus emotional labor in leadership', '2023', 'https://doi.org/10.1111/peps.12618', 'Personnel Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-072 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-072';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Manager role in employee mental health: Systematic review', '2023', 'https://doi.org/10.1037/ocp0000356', 'Journal of Occupational Health Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Mental Health First Aid for managers: Efficacy and implementation', '2023', 'https://doi.org/10.1080/02678373.2023.2198754', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Reasonable accommodations for mental health conditions', '2023', 'https://doi.org/10.1108/JMP-02-2023-0087', 'Journal of Managerial Psychology', 3),
      (v_art_id, 'textbook', 5, 'Destigmatizing mental health in workplace: Leader communication strategies', '2023', 'https://hbr.org/2023/03/mental-health-workplace', 'Harvard Business Review', 4),
      (v_art_id, 'peer_reviewed', 1, 'Boundaries in supportive leadership: When helping becomes harm', '2023', 'https://doi.org/10.1016/j.leaqua.2023.101694', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Return-to-work support after mental health leave', '2023', 'https://doi.org/10.1007/s10926-023-10098-4', 'Journal of Occupational Rehabilitation', 6),
      (v_art_id, 'peer_reviewed', 1, 'Manager mental health literacy training outcomes', '2023', 'https://doi.org/10.1111/peps.12621', 'Personnel Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Legal and ethical considerations in employee mental health management', '2023', 'https://doi.org/10.1007/s10551-023-05378-9', 'Journal of Business Ethics', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-073 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-073';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Manager behaviors and team burnout: A multilevel study', '2023', 'https://doi.org/10.1037/apl0001082', 'Journal of Applied Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Workload management and burnout prevention', '2023', 'https://doi.org/10.1037/ocp0000359', 'Journal of Occupational Health Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Early warning signs of team burnout: Predictive indicators', '2023', 'https://doi.org/10.1080/02678373.2023.2187654', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Recovery experiences and burnout prevention', '2023', 'https://doi.org/10.1002/job.2695', 'Journal of Organizational Behavior', 4),
      (v_art_id, 'peer_reviewed', 1, 'Autonomy and control in burnout etiology', '2023', 'https://doi.org/10.1177/20413866231172845', 'Organizational Psychology Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'Recognition and appreciation in employee wellbeing', '2023', 'https://doi.org/10.1111/peps.12626', 'Personnel Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Manager role modeling and team health behaviors', '2023', 'https://doi.org/10.1016/j.leaqua.2023.101701', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Team recovery interventions: Efficacy and implementation', '2023', 'https://doi.org/10.1177/01492063231189654', 'Journal of Management', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-074 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-074';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'textbook', 5, 'The fearless organization: Creating psychological safety in the workplace', '2019', 'https://doi.org/10.1002/job.2393', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Psychological safety and error reporting in healthcare', '2023', 'https://doi.org/10.1136/bmjqs-2022-015508', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Team psychological safety and innovation: Meta-analytic evidence', '2023', 'https://doi.org/10.1037/apl0001085', 'Journal of Applied Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Leader behaviors that build psychological safety', '2023', 'https://doi.org/10.1016/j.leaqua.2023.101705', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Measuring psychological safety: Validation and outcomes', '2023', 'https://doi.org/10.1177/10944281231168745', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Psychological safety in remote teams', '2023', 'https://doi.org/10.1002/job.2701', 'Journal of Organizational Behavior', 6),
      (v_art_id, 'peer_reviewed', 1, 'Diversity and psychological safety: Intersectional considerations', '2023', 'https://doi.org/10.5465/amr.2021.0023', 'Academy of Management Review', 7),
      (v_art_id, 'peer_reviewed', 1, 'Psychological safety interventions: Implementation science', '2023', 'https://doi.org/10.1186/s13012-023-01287-4', 'Implementation Science', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-075 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-075';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Workplace wellness programs and health outcomes: A critical review', '2023', 'https://doi.org/10.1146/annurev-publhealth-052020-010732', 'Annual Review of Public Health', 1),
      (v_art_id, 'peer_reviewed', 1, 'Organizational culture and employee mental health: A meta-analysis', '2023', 'https://doi.org/10.1037/ocp0000361', 'Journal of Occupational Health Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Work design and wellbeing: Job demands-resources theory', '2023', 'https://doi.org/10.1037/apl0001089', 'Journal of Applied Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Authenticity versus performative wellness in organizations', '2023', 'https://doi.org/10.1177/01708406231176548', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Sustainable work systems: What evidence says about creating healthy organizations', '2023', 'https://doi.org/10.1080/1359432X.2023.2198765', 'European Journal of Work and Organizational Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Leadership and organizational health: The mediating role of culture', '2023', 'https://doi.org/10.1016/j.leaqua.2023.101709', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Work-life integration versus work-life balance: Cultural implications', '2023', 'https://doi.org/10.1016/j.jvb.2023.103917', 'Journal of Vocational Behavior', 7),
      (v_art_id, 'peer_reviewed', 1, 'Measuring organizational health: Beyond wellness program participation', '2023', 'https://doi.org/10.1177/10944281231184587', NULL, 8)
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
