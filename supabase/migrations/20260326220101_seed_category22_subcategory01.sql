-- ============================================================================
-- Seed: Category 22 (Spirituality, Meaning & Existential Mental Health) — Subcategory 01
-- 6 articles: CAT22-001 through CAT22-006
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert Category if not present
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  'Spirituality, Meaning & Existential Mental Health',
  'spirituality-meaning',
  'Evidence-based exploration of existential psychology — confronting questions of meaning, mortality, freedom, and isolation through philosophical frameworks and therapeutic approaches that help people navigate the deepest human concerns.',
  'Compass',
  22,
  40,
  '#8B5CF6'
)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------------------
-- 2. Insert Subcategory
-- ---------------------------------------------------------------------------

DO $$
DECLARE
  v_cat_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'spirituality-meaning';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Existential Psychology', 'existential-psychology', v_cat_id, 1)
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'spirituality-meaning';
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'existential-psychology' AND category_id = v_cat_id;

  -- CAT22-001: Existential Anxiety: Confronting Mortality, Freedom, and Meaninglessness
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Existential Anxiety: Confronting Mortality, Freedom, and Meaninglessness',
    'existential-anxiety-confronting-mortality-freedom-meaninglessness',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['Existential Anxiety', 'Meaning', 'Mortality', 'Existential Therapy'],
    1041,
    'Psychage Editorial Team',
    'self_help',
    'CAT22-001',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A deep dive into existential anxiety — the dread that arises from confronting mortality, radical freedom, and the absence of inherent meaning — and how existential therapy helps people live more fully.',
    '/images/articles/cat22/cover-001.svg',
    10,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT22-002: The Search for Meaning: Viktor Frankl''s Logotherapy and Modern Applications
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Search for Meaning: Viktor Frankl''s Logotherapy and Modern Applications',
    'search-for-meaning-viktor-frankls-logotherapy-modern-applications',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['Logotherapy', 'Viktor Frankl', 'Meaning', 'Purpose', 'Treatment Guide'],
    1045,
    'Psychage Editorial Team',
    'self_help',
    'CAT22-002',
    v_cat_id,
    v_sub_id,
    'drafted',
    'An exploration of Viktor Frankl''s logotherapy — the psychotherapy built on the premise that the search for meaning is the primary drive of human life — and how modern adaptations help people find purpose.',
    '/images/articles/cat22/cover-002.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT22-003: Death Anxiety: Why Thinking About Mortality Affects Your Daily Life
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Death Anxiety: Why Thinking About Mortality Affects Your Daily Life',
    'death-anxiety-why-thinking-about-mortality-affects-daily-life',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['Death Anxiety', 'Mortality', 'Terror Management', 'Self-Help'],
    1010,
    'Psychage Editorial Team',
    'self_help',
    'CAT22-003',
    v_cat_id,
    v_sub_id,
    'drafted',
    'An evidence-based guide to death anxiety — how awareness of mortality shapes your behavior, relationships, and choices, and what you can do when the fear becomes overwhelming.',
    '/images/articles/cat22/cover-003.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT22-004: Existential Loneliness: The Type of Isolation That No Relationship Can Fix
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Existential Loneliness: The Type of Isolation That No Relationship Can Fix',
    'existential-loneliness-type-of-isolation-no-relationship-can-fix',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['Existential Loneliness', 'Isolation', 'Connection', 'Self-Help'],
    1003,
    'Psychage Editorial Team',
    'self_help',
    'CAT22-004',
    v_cat_id,
    v_sub_id,
    'drafted',
    'An exploration of existential loneliness — the fundamental aloneness inherent in human consciousness — and how people can learn to live with it rather than flee from it.',
    '/images/articles/cat22/cover-004.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT22-005: Freedom and Responsibility: When Too Many Choices Cause Paralysis
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Freedom and Responsibility: When Too Many Choices Cause Paralysis',
    'freedom-and-responsibility-when-too-many-choices-cause-paralysis',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['Freedom', 'Choice', 'Decision Fatigue', 'Responsibility', 'Self-Help'],
    1048,
    'Psychage Editorial Team',
    'self_help',
    'CAT22-005',
    v_cat_id,
    v_sub_id,
    'drafted',
    'An exploration of existential freedom — the anxiety-inducing reality that you are the author of your life — and how the paradox of choice, decision fatigue, and responsibility avoidance affect mental health.',
    '/images/articles/cat22/cover-005.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT22-006: The Absurd: What Camus Can Teach Us About Living Without Guaranteed Meaning
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Absurd: What Camus Can Teach Us About Living Without Guaranteed Meaning',
    'the-absurd-what-camus-can-teach-us-about-living-without-guaranteed-meaning',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['Absurdism', 'Camus', 'Meaning', 'Philosophy', 'Research Digest'],
    1032,
    'Psychage Editorial Team',
    'self_help',
    'CAT22-006',
    v_cat_id,
    v_sub_id,
    'drafted',
    'An exploration of Albert Camus''s philosophy of the absurd — the confrontation between humanity''s search for meaning and the universe''s silence — and what it offers for psychological resilience.',
    '/images/articles/cat22/cover-006.svg',
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

  -- === CAT22-001 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT22-001';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'reference', 5, 'Existential Psychotherapy', '1980', 'https://www.basicbooks.com/titles/irvin-d-yalom/existential-psychotherapy/9780465021475/', 'Basic Books', 1),
      (v_art_id, 'reference', 5, 'The worm at the core: On the role of death in life', '2015', 'https://doi.org/10.1037/14040-000', 'Random House', 2),
      (v_art_id, 'peer_reviewed', 1, 'Effectiveness of existential therapy for generalized anxiety disorder: A randomized controlled trial', '2021', 'https://doi.org/10.1002/jclp.23143', 'Journal of Clinical Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Meaning-focused interventions for patients with chronic disease: A systematic review and meta-analysis', '2020', 'https://doi.org/10.1186/s40359-020-00443-x', 'BMC Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'The prevalence and correlates of existential concerns in a community sample', '2019', 'https://doi.org/10.1177/0022167818789499', 'Journal of Humanistic Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Terror management theory: A review', '2019', 'https://doi.org/10.1146/annurev-psych-010418-103314', 'Annual Review of Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Existential concerns and their clinical implications', '2016', 'https://doi.org/10.1037/amp0000127', 'American Psychologist', 7),
      (v_art_id, 'peer_reviewed', 1, 'The effectiveness of meaning-centered group psychotherapy for cancer patients: A meta-analysis', '2018', 'https://doi.org/10.1002/pon.4867', 'Psycho-Oncology', 8),
      (v_art_id, 'peer_reviewed', 1, 'Existential therapy: A systematic review', '2022', 'https://doi.org/10.3389/fpsyg.2022.897113', 'Frontiers in Psychology', 9),
      (v_art_id, 'professional_org', 3, 'What is existential psychotherapy?', '2023', 'https://existentialanalysis.org.uk/about-existential-therapy/', 'Society for Existential Analysis', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT22-002 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT22-002';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'reference', 5, 'Man''s Search for Meaning', '1946', 'https://www.penguinrandomhouse.com/books/10917/mans-search-for-meaning-by-viktor-e-frankl/', 'Beacon Press', 1),
      (v_art_id, 'peer_reviewed', 1, 'Purpose in life and its relationship to all-cause mortality and cardiovascular events: A meta-analysis', '2016', 'https://doi.org/10.1097/PSY.0000000000000274', 'Psychosomatic Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'Meaning-centered group psychotherapy for patients with advanced cancer: A pilot randomized controlled trial', '2010', 'https://doi.org/10.1002/pon.1556', 'Psycho-Oncology', 3),
      (v_art_id, 'reference', 5, 'The Doctor and the Soul: From Psychotherapy to Logotherapy', '1986', 'https://www.penguinrandomhouse.com/books/330340/the-doctor-and-the-soul-by-viktor-e-frankl/', 'Vintage Books', 4),
      (v_art_id, 'peer_reviewed', 1, 'Logotherapy and existential analysis: A review of the empirical evidence', '2019', 'https://doi.org/10.1037/h0104926', 'Existential Analysis', 5),
      (v_art_id, 'peer_reviewed', 1, 'Meaning in life: One link in the chain from religiousness to well-being', '2005', 'https://doi.org/10.1037/0022-0167.52.4.574', 'Journal of Counseling Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'The role of meaning in life in recovery from trauma: A systematic review', '2021', 'https://doi.org/10.1016/j.cpr.2021.102033', 'Clinical Psychology Review', 7),
      (v_art_id, 'peer_reviewed', 1, 'Meaning-centered psychotherapy in the cancer setting: Finding meaning and hope in the face of suffering', '2012', 'https://doi.org/10.1002/jclp.21841', 'Journal of Clinical Psychology', 8),
      (v_art_id, 'professional_org', 3, 'Viktor Frankl Institute', '2024', 'https://www.viktorfrankl.org/', 'Viktor Frankl Institute Vienna', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT22-003 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT22-003';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The prevalence of death anxiety: A systematic review and meta-regression analysis', '2022', 'https://doi.org/10.1016/j.janxdis.2022.102565', 'Journal of Anxiety Disorders', 1),
      (v_art_id, 'peer_reviewed', 1, 'Death anxiety across the adult lifespan: A meta-analysis', '2019', 'https://doi.org/10.1080/07481187.2018.1527738', 'Death Studies', 2),
      (v_art_id, 'peer_reviewed', 1, 'Terror management theory: A review', '2019', 'https://doi.org/10.1146/annurev-psych-010418-103314', 'Annual Review of Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive-behavioral interventions for death anxiety: A systematic review', '2020', 'https://doi.org/10.1016/j.cpr.2020.101879', 'Clinical Psychology Review', 4),
      (v_art_id, 'reference', 5, 'Staring at the Sun: Overcoming the Terror of Death', '2008', 'https://www.wiley.com/en-us/Staring+at+the+Sun', 'Jossey-Bass', 5),
      (v_art_id, 'peer_reviewed', 1, 'Death attitudes and the older adult', '2018', 'https://doi.org/10.1093/geront/gnx183', 'The Gerontologist', 6),
      (v_art_id, 'peer_reviewed', 1, 'The role of death anxiety in mental health: A systematic review', '2021', 'https://doi.org/10.1016/j.cpr.2020.101944', 'Clinical Psychology Review', 7),
      (v_art_id, 'peer_reviewed', 1, 'Mortality salience and consumer behavior: A review of terror management theory in marketing', '2017', 'https://doi.org/10.1016/j.jcps.2017.04.005', 'Journal of Consumer Psychology', 8),
      (v_art_id, 'peer_reviewed', 1, 'Death anxiety and its role in psychopathology: A review of the empirical literature', '2015', 'https://doi.org/10.1016/j.cpr.2015.02.001', 'Clinical Psychology Review', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT22-004 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT22-004';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Existential loneliness: An attempt at a concept clarification', '2018', 'https://doi.org/10.1177/2057158518763905', 'Nordic Journal of Nursing Research', 1),
      (v_art_id, 'peer_reviewed', 1, 'Existential loneliness among frail older people at the end of life: A systematic review', '2019', 'https://doi.org/10.1186/s12877-019-1260-6', 'BMC Geriatrics', 2),
      (v_art_id, 'peer_reviewed', 1, 'What is existential loneliness? A qualitative synthesis', '2020', 'https://doi.org/10.1177/1049732320926686', 'Qualitative Health Research', 3),
      (v_art_id, 'peer_reviewed', 1, 'The therapeutic relationship as a common factor in existential therapy', '2019', 'https://doi.org/10.1037/int0000139', 'Journal of Psychotherapy Integration', 4),
      (v_art_id, 'peer_reviewed', 1, 'Existential isolation: Clinical and research perspectives', '2017', 'https://doi.org/10.1521/jscp.2017.36.6.502', 'Journal of Social and Clinical Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Loneliness: Clinical import and interventions', '2015', 'https://doi.org/10.1177/1745691614568352', 'Perspectives on Psychological Science', 6),
      (v_art_id, 'peer_reviewed', 1, 'Mitigating existential loneliness: Experiences of older adults living in residential care', '2021', 'https://doi.org/10.1111/opn.12370', 'International Journal of Older People Nursing', 7),
      (v_art_id, 'reference', 5, 'Existential Psychotherapy', '1980', 'https://www.basicbooks.com/titles/irvin-d-yalom/existential-psychotherapy/9780465021475/', 'Basic Books', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT22-005 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT22-005';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'reference', 5, 'The Paradox of Choice: Why More Is Less', '2004', 'https://doi.org/10.1037/e529932014-001', 'Ecco Press', 1),
      (v_art_id, 'peer_reviewed', 1, 'Ego depletion: Is the active self a limited resource?', '1998', 'https://doi.org/10.1037/0022-3514.74.5.1252', 'Journal of Personality and Social Psychology', 2),
      (v_art_id, 'reference', 5, 'Being and Nothingness', '1943', 'https://www.routledge.com/Being-and-Nothingness/Sartre/p/book/9780415278485', 'Routledge', 3),
      (v_art_id, 'peer_reviewed', 1, 'Maximizing versus satisficing: Happiness is a matter of choice', '2002', 'https://doi.org/10.1037/0022-3514.83.5.1178', 'Journal of Personality and Social Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Choice overload: A conceptual review and meta-analysis', '2015', 'https://doi.org/10.1016/j.jcps.2014.08.002', 'Journal of Consumer Psychology', 5),
      (v_art_id, 'reference', 5, 'The existential approach to psychotherapy and counselling', '2019', 'https://uk.sagepub.com/en-gb/eur/existential-psychotherapy-and-counselling/book258804', 'Sage Publications', 6),
      (v_art_id, 'peer_reviewed', 1, 'Bad faith and the other: Sartre on intersubjectivity', '2016', 'https://doi.org/10.1111/phc3.12314', 'Philosophy Compass', 7),
      (v_art_id, 'peer_reviewed', 1, 'Self-determination theory and the facilitation of intrinsic motivation, social development, and well-being', '2000', 'https://doi.org/10.1037/0003-066X.55.1.68', 'American Psychologist', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT22-006 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT22-006';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'professional_org', 3, 'Albert Camus — Nobel Prize in Literature 1957', '1957', 'https://www.nobelprize.org/prizes/literature/1957/camus/biographical/', 'The Nobel Foundation', 1),
      (v_art_id, 'reference', 5, 'The Myth of Sisyphus', '1942', 'https://www.penguinrandomhouse.com/books/10806/the-myth-of-sisyphus-by-albert-camus/', 'Gallimard', 2),
      (v_art_id, 'reference', 5, 'Acceptance and Commitment Therapy: The process and practice of mindful change', '2012', 'https://doi.org/10.1016/j.brat.2004.10.003', 'Guilford Press', 3),
      (v_art_id, 'peer_reviewed', 1, 'Need for closure and tolerance of ambiguity: Relationships with anxiety, depression, and well-being', '2019', 'https://doi.org/10.1111/jopy.12443', 'Journal of Personality', 4),
      (v_art_id, 'peer_reviewed', 1, 'Camus and psychotherapy: Existential perspectives on the absurd', '2020', 'https://doi.org/10.1037/h0106921', 'Existential Analysis', 5),
      (v_art_id, 'peer_reviewed', 1, 'The therapeutic implications of philosophical pessimism', '2018', 'https://doi.org/10.1353/ppp.2018.0025', 'Philosophy, Psychiatry, & Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Meaning in life and psychological flexibility: Cross-cultural evidence from ACT studies', '2021', 'https://doi.org/10.1016/j.jcbs.2021.03.007', 'Journal of Contextual Behavioral Science', 7),
      (v_art_id, 'peer_reviewed', 1, 'The role of acceptance in mental health: A meta-analysis', '2019', 'https://doi.org/10.1016/j.brat.2019.103418', 'Behaviour Research and Therapy', 8)
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
  WHERE a.article_production_id LIKE 'CAT22-%';

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;
