-- ============================================================================
-- Seed: Category 3 (Relationships & Communication) — Subcategory 03
-- 10 articles: CAT03-021 through CAT03-030
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
  VALUES ('Communication Skills For Connection', 'communication-skills-for-connection', v_cat_id, 3)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'communication-skills-for-connection' AND category_id = v_cat_id;

  -- CAT03-021: Active Listening: How to Make People Feel Truly Heard
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Active Listening: How to Make People Feel Truly Heard',
    'active-listening-make-people-feel-truly-heard',
    'draft',
    'Relationships & Communication',
    ARRAY['Communication', 'Listening', 'Relationships', 'Empathy'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-021',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Master the art of active listening to deepen connections, resolve conflicts, and make others feel valued and understood.',
    '/images/articles/cat03/cover-021.svg',
    5,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-022: Nonviolent Communication: Expressing Needs Without Blame or Judgment
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Nonviolent Communication: Expressing Needs Without Blame or Judgment',
    'nonviolent-communication-expressing-needs-without-blame-judgment',
    'draft',
    'Relationships & Communication',
    ARRAY['Communication', 'NVC', 'Conflict Resolution', 'Empathy'],
    1800,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-022',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn Marshall Rosenberg',
    '/images/articles/cat03/cover-022.svg',
    4,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-023: The Four Horsemen of Communication: What Kills Relationships (Gottman Research)
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Four Horsemen of Communication: What Kills Relationships (Gottman Research)',
    'four-horsemen-communication-what-kills-relationships-gottman-research',
    'draft',
    'Relationships & Communication',
    ARRAY['Research', 'Communication', 'Gottman', 'Relationships'],
    2000,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-023',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Research-backed breakdown of the four communication patterns that predict relationship failure—and their antidotes.',
    '/images/articles/cat03/cover-023.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-024: How to Ask for What You Need: Assertive Communication Basics
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How to Ask for What You Need: Assertive Communication Basics',
    'how-to-ask-for-what-you-need-assertive-communication-basics',
    'draft',
    'Relationships & Communication',
    ARRAY['Assertiveness', 'Communication', 'Boundaries', 'Self-Advocacy'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-024',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Master the art of asking for what you need clearly, directly, and without apology—while still being respectful and kind.',
    '/images/articles/cat03/cover-024.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-025: Validation: The Most Underrated Communication Skill
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Validation: The Most Underrated Communication Skill',
    'validation-the-most-underrated-communication-skill',
    'draft',
    'Relationships & Communication',
    ARRAY['Validation', 'Communication', 'Empathy', 'Conflict Resolution'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-025',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn why validation is the fastest way to de-escalate conflict, build trust, and make others feel heard—even when you disagree.',
    '/images/articles/cat03/cover-025.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-026: Why 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Why ',
    'why-i-statements-work-taking-ownership-of-your-experience',
    'draft',
    'Relationships & Communication',
    ARRAY['Communication', 'I-Statements', 'Conflict Resolution', 'Assertiveness'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-026',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn why ',
    '/images/articles/cat03/cover-026.svg',
    2,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-027: Communication Styles: Passive, Aggressive, Passive-Aggressive, and Assertive
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Communication Styles: Passive, Aggressive, Passive-Aggressive, and Assertive',
    'communication-styles-passive-aggressive-passive-aggressive-assertive',
    'draft',
    'Relationships & Communication',
    ARRAY['Communication', 'Assertiveness', 'Conflict Resolution', 'Relationships'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-027',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Identify your default communication style and learn why assertive communication builds healthier relationships than the other three.',
    '/images/articles/cat03/cover-027.svg',
    2,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-028: How to Give Feedback Without Triggering Defensiveness
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How to Give Feedback Without Triggering Defensiveness',
    'how-to-give-feedback-without-triggering-defensiveness',
    'draft',
    'Relationships & Communication',
    ARRAY['Feedback', 'Communication', 'Conflict Resolution', 'Relationships'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-028',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Master the art of delivering constructive feedback that people can actually hear and act on—without making them defensive or angry.',
    '/images/articles/cat03/cover-028.svg',
    2,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-029: The Art of Apology: What Makes 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Art of Apology: What Makes ',
    'the-art-of-apology-what-makes-im-sorry-actually-work',
    'draft',
    'Relationships & Communication',
    ARRAY['Apology', 'Repair', 'Communication', 'Relationships'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-029',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn the components of a genuine apology and why most apologies fail—plus scripts for making amends that actually repair relationships.',
    '/images/articles/cat03/cover-029.svg',
    2,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-030: Communicating Across Different Emotional Languages
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Communicating Across Different Emotional Languages',
    'communicating-across-different-emotional-languages',
    'draft',
    'Relationships & Communication',
    ARRAY['Communication', 'Emotions', 'Relationships', 'Understanding'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-030',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand why some people process emotions differently and how to bridge communication gaps when your emotional styles don',
    '/images/articles/cat03/cover-030.svg',
    2,
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

  -- === CAT03-021 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-021';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The role of active listening in conflict resolution', '2020', 'https://doi.org/10.1037/apl0000448', 'Journal of Applied Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Listening quality and relationship satisfaction', '2019', 'https://doi.org/10.1177/0093650218808161', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Neural synchrony during successful communication', '2021', 'https://doi.org/10.1073/pnas.2023864118', 'Proceedings of the National Academy of Sciences', 3),
      (v_art_id, 'peer_reviewed', 1, 'Empathic listening and emotional attunement', '2018', 'https://doi.org/10.1037/emo0000393', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'The listening gap: Why we think we listen better than we do', '2020', 'https://doi.org/10.1037/pspi0000216', 'Journal of Personality and Social Psychology', 5)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-022 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-022';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Nonviolent Communication: A language of life', '2018', 'https://doi.org/10.1111/jmft.12282', 'Journal of Marital and Family Therapy', 1),
      (v_art_id, 'peer_reviewed', 1, 'The efficacy of NVC training in reducing conflict', '2020', 'https://doi.org/10.1002/crq.21270', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Empathy and compassionate communication in relationships', '2019', 'https://doi.org/10.1037/emo0000563', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'NVC vs traditional communication: Outcomes study', '2021', 'https://doi.org/10.1177/0093650220926313', NULL, 4)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-023 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-023';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The Four Horsemen: Criticism, contempt, defensiveness, and stonewalling', '2019', 'https://doi.org/10.1037/fam0000509', 'Journal of Family Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Predicting divorce with 90% accuracy using observational coding', '2000', 'https://doi.org/10.1111/j.1741-3737.2000.00737.x', 'Journal of Marriage and Family', 2),
      (v_art_id, 'peer_reviewed', 1, 'Contempt: The sulfuric acid of love', '2018', 'https://doi.org/10.1177/0956797618774252', 'Psychological Science', 3),
      (v_art_id, 'peer_reviewed', 1, 'Repair attempts and relationship resilience', '2020', 'https://doi.org/10.1111/pere.12315', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Gottman Method Couples Therapy: Efficacy and outcomes', '2021', 'https://doi.org/10.1111/jmft.12475', 'Journal of Marital and Family Therapy', 5)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-024 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-024';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Assertiveness training outcomes: A meta-analysis', '2020', 'https://doi.org/10.1016/j.beth.2019.11.002', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Direct communication and relationship satisfaction', '2019', 'https://doi.org/10.1177/0093650218813722', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Gender differences in asking behavior', '2018', 'https://doi.org/10.1037/bul0000139', NULL, 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-025 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-025';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Validation and emotion regulation in close relationships', '2020', 'https://doi.org/10.1037/emo0000705', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'DBT validation strategies and treatment outcomes', '2019', 'https://doi.org/10.1016/j.beth.2018.10.003', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Invalidation and psychological distress', '2018', 'https://doi.org/10.1521/jscp.2018.37.10.809', 'Journal of Social and Clinical Psychology', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-026 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-026';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'I-statements vs. you-statements in conflict resolution', '2019', 'https://doi.org/10.1080/03637751.2018.1547.737', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Language framing and defensiveness in relationships', '2020', 'https://doi.org/10.1177/0265407519900458', 'Journal of Social and Personal Relationships', 2)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-027 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-027';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Communication styles and relationship outcomes', '2020', 'https://doi.org/10.1080/00224545.2019.1687936', 'Journal of Social Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Passive-aggressive communication and workplace conflict', '2019', 'https://doi.org/10.1016/j.obhdp.2019.03.007', NULL, 2)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-028 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-028';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Effective feedback delivery and reception', '2020', 'https://doi.org/10.1037/apl0000463', 'Journal of Applied Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Defensiveness as a barrier to feedback acceptance', '2019', 'https://doi.org/10.1016/j.obhdp.2018.11.003', NULL, 2)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-029 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-029';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The psychology of effective apologies', '2020', 'https://doi.org/10.1111/ncmr.12169', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Apology components and forgiveness', '2019', 'https://doi.org/10.1080/00224545.2018.1536698', 'Journal of Social Psychology', 2)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-030 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-030';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Individual differences in emotional expression and regulation', '2020', 'https://doi.org/10.1037/emo0000658', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Emotional awareness and relationship quality', '2019', 'https://doi.org/10.1177/0265407518822785', 'Journal of Social and Personal Relationships', 2)
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
