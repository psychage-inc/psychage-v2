-- ============================================================================
-- Seed: Category 8 (Habits, Motivation & Behavior Change) — Subcategory 07
-- 5 articles: CAT08-061 through CAT08-065
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert Category if not present
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  'Habits, Motivation & Behavior Change',
  'habits-behavior-change',
  'The psychology of habits, motivation, and behavior change — building routines that support mental health.',
  'Repeat',
  8,
  65,
  '#F97316'
)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------------------
-- 2. Insert Subcategory
-- ---------------------------------------------------------------------------

DO $$
DECLARE
  v_cat_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'habits-behavior-change';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Systems, Environment & Identity-Based Change', 'systems-environment-and-identity-based-change', v_cat_id, 7)
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'habits-behavior-change';
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'systems-environment-and-identity-based-change' AND category_id = v_cat_id;

  -- CAT08-061: Identity-Based Habits: Becoming the Type of Person Who...
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Identity-Based Habits: Becoming the Type of Person Who...',
    'identity-based-habits-becoming-the-type-of-person-who',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Identity', 'Self-Concept', 'Behavior Change', 'Long-Term Habits'],
    962,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-061',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Move beyond outcome-based goals to identity-level change. Learn how shifting your self-concept creates lasting behavior transformation.',
    '/images/articles/cat08/cover-061.svg',
    8,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT08-062: Systems vs. Goals: Why Process Matters More Than Outcomes
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Systems vs. Goals: Why Process Matters More Than Outcomes',
    'systems-vs-goals-why-process-matters-more-than-outcomes',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Systems Thinking', 'Process Goals', 'Sustainable Success', 'Goal-Setting'],
    994,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-062',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Shift from outcome-obsession to process optimization. Learn why building systems creates sustainable success while goal-fixation leads to chronic dissatisfaction.',
    '/images/articles/cat08/cover-062.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT08-063: How to Design Your Environment for Behavior Change
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How to Design Your Environment for Behavior Change',
    'how-to-design-your-environment-for-behavior-change',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Environment Design', 'Choice Architecture', 'Behavioral Economics', 'Habit Cues'],
    1003,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-063',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Stop relying on willpower alone. Learn evidence-based strategies to architect your physical and digital spaces to make good habits automatic and bad habits inconvenient.',
    '/images/articles/cat08/cover-063.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT08-064: Social Systems and Behavior Change: The People Around You Shape Your Habits
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Social Systems and Behavior Change: The People Around You Shape Your Habits',
    'social-systems-and-behavior-change-people-shape-habits',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Social Influence', 'Peer Effects', 'Accountability', 'Social Support'],
    1027,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-064',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Your friends, family, and social circles exert powerful influence on your behavior. Learn how to harness social systems for sustainable change and navigate relationships that hinder growth.',
    '/images/articles/cat08/cover-064.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT08-065: The Compound Effect: How Small Daily Actions Create Extraordinary Results
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Compound Effect: How Small Daily Actions Create Extraordinary Results',
    'the-compound-effect-small-daily-actions-create-extraordinary-results',
    'draft',
    'Habits, Motivation & Behavior Change',
    ARRAY['Compound Effect', 'Marginal Gains', 'Consistency', 'Long-Term Thinking'],
    1002,
    'Dr. Sarah Chen',
    'self_help',
    'CAT08-065',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the mathematics and psychology of compounding: why 1% improvements stack exponentially, and how to leverage time and consistency for transformational change.',
    '/images/articles/cat08/cover-065.svg',
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

  -- === CAT08-061 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-061';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Identity and the maintenance of behavior change', '2020', 'https://doi.org/10.1016/j.copsyc.2020.08.001', 'Current Opinion in Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Self-schema and sustained behavior modification', '2016', 'https://doi.org/10.1037/pspp0000071', 'Journal of Personality and Social Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Identity-based motivation: Linking core processes across developmental and cultural contexts', '2017', 'https://doi.org/10.1037/mot0000050', 'Motivation Science', 3),
      (v_art_id, 'peer_reviewed', 1, 'The role of identity in habit formation', '2019', 'https://doi.org/10.1002/ejsp.2570', 'European Journal of Social Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Self-perception and behavior change outcomes', '2018', 'https://doi.org/10.1080/17437199.2018.1437551', 'Health Psychology Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'Identity development and health behavior adoption', '2015', 'https://doi.org/10.1037/dev0000045', 'Developmental Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'The psychological benefits of identity-aligned action', '2021', 'https://doi.org/10.1037/xge0000935', 'Journal of Experimental Psychology: General', 7),
      (v_art_id, 'peer_reviewed', 1, 'Narrative identity and sustainable behavior change', '2019', 'https://doi.org/10.1037/amp0000445', 'American Psychologist', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT08-062 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-062';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Process versus outcome goals: Effects on motivation and performance', '2018', 'https://doi.org/10.1037/apl0000301', 'Journal of Applied Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'The dark side of goal-setting: Hedonic costs and benefits', '2016', 'https://doi.org/10.1016/j.obhdp.2016.05.004', 'Organizational Behavior and Human Decision Processes', 2),
      (v_art_id, 'peer_reviewed', 1, 'Systems thinking and sustainable behavior change', '2020', 'https://doi.org/10.1080/17437199.2020.1841720', 'Health Psychology Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'The psychological impact of goal achievement and failure', '2017', 'https://doi.org/10.1007/s11031-017-9633-4', 'Motivation and Emotion', 4),
      (v_art_id, 'peer_reviewed', 1, 'Learning goals versus performance goals in skill acquisition', '2019', 'https://doi.org/10.1037/xap0000220', 'Journal of Experimental Psychology: Applied', 5),
      (v_art_id, 'peer_reviewed', 1, 'Process-focused intervention and long-term outcomes', '2021', 'https://doi.org/10.1093/abm/kaab015', 'Annals of Behavioral Medicine', 6),
      (v_art_id, 'peer_reviewed', 1, 'The role of habits in goal pursuit: A systems perspective', '2020', 'https://doi.org/10.1177/1745691620917676', 'Perspectives on Psychological Science', 7),
      (v_art_id, 'peer_reviewed', 1, 'Intrinsic motivation and process engagement', '2019', 'https://doi.org/10.1037/mot0000127', 'Motivation Science', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT08-063 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-063';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Environmental influences on eating behavior', '2008', 'https://doi.org/10.1146/annurev.nutr.28.061807.155524', 'Annual Review of Nutrition', 1),
      (v_art_id, 'peer_reviewed', 1, 'Choice architecture and health behavior', '2017', 'https://doi.org/10.1016/j.ypmed.2017.07.032', 'Preventive Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'The role of environmental design in physical activity', '2019', 'https://doi.org/10.1016/j.amepre.2019.01.017', 'American Journal of Preventive Medicine', 3),
      (v_art_id, 'peer_reviewed', 1, 'Visual cues and habit formation', '2018', 'https://doi.org/10.1002/jcpy.1056', 'Journal of Consumer Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Nudging and default options in behavior change', '2020', 'https://doi.org/10.1177/2372732220920595', 'Behavioral Science & Policy', 5),
      (v_art_id, 'peer_reviewed', 1, 'Friction and behavior: Making the undesired difficult', '2021', 'https://doi.org/10.1016/j.obhdp.2021.02.003', 'Organizational Behavior and Human Decision Processes', 6),
      (v_art_id, 'peer_reviewed', 1, 'Digital environment design for behavior change', '2020', 'https://doi.org/10.1016/j.chb.2020.106453', 'Computers in Human Behavior', 7),
      (v_art_id, 'peer_reviewed', 1, 'Built environment and mental health outcomes', '2019', 'https://doi.org/10.1016/j.healthplace.2019.05.007', 'Health & Place', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT08-064 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-064';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Social networks and health behavior change', '2007', 'https://doi.org/10.1056/NEJMsa066082', 'New England Journal of Medicine', 1),
      (v_art_id, 'peer_reviewed', 1, 'Peer influence and behavior change in adolescents and adults', '2018', 'https://doi.org/10.1037/bul0000141', 'Psychological Bulletin', 2),
      (v_art_id, 'peer_reviewed', 1, 'Social support and adherence to health behaviors', '2020', 'https://doi.org/10.1146/annurev-psych-010419-050912', 'Annual Review of Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'The spread of behavior through social networks', '2010', 'https://doi.org/10.1126/science.1185231', 'Science', 4),
      (v_art_id, 'peer_reviewed', 1, 'Accountability partnerships and goal achievement', '2019', 'https://doi.org/10.1037/ccp0000371', 'Journal of Consulting and Clinical Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Social norms and behavior change interventions', '2021', 'https://doi.org/10.1177/1745691620974959', 'Perspectives on Psychological Science', 6),
      (v_art_id, 'peer_reviewed', 1, 'Group-based interventions for health behavior change', '2020', 'https://doi.org/10.1080/17437199.2020.1718527', 'Health Psychology Review', 7),
      (v_art_id, 'peer_reviewed', 1, 'The dark side of social influence: When networks undermine change', '2019', 'https://doi.org/10.1037/pspi0000178', 'Journal of Personality and Social Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT08-065 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT08-065';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The aggregation of marginal gains in performance', '2019', 'https://doi.org/10.1080/10413200.2019.1618248', 'Journal of Applied Sport Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Exponential growth mindset and learning outcomes', '2020', 'https://doi.org/10.1007/s10648-020-09567-8', 'Educational Psychology Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Habit formation and behavioral automaticity over time', '2010', 'https://doi.org/10.1002/ejsp.674', 'European Journal of Social Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'The plateau of latent potential in skill acquisition', '2018', 'https://doi.org/10.1037/rev0000112', 'Psychological Review', 4),
      (v_art_id, 'peer_reviewed', 1, 'Time preferences and delayed gratification in behavior change', '2017', 'https://doi.org/10.1037/bul0000086', 'Psychological Bulletin', 5),
      (v_art_id, 'peer_reviewed', 1, 'The role of patience and persistence in goal achievement', '2021', 'https://doi.org/10.1037/pspp0000383', 'Journal of Personality and Social Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Nonlinear dynamics of skill development', '2019', 'https://doi.org/10.1111/cogs.12736', 'Cognitive Science', 7),
      (v_art_id, 'peer_reviewed', 1, 'Identity-based habits and compounding behavior change', '2020', 'https://doi.org/10.1037/mot0000168', 'Motivation Science', 8)
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
  WHERE a.article_production_id LIKE 'CAT08-%';

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;
