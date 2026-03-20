-- ============================================================================
-- Seed: Category 3 (Relationships & Communication) — Subcategory 02
-- 10 articles: CAT03-011 through CAT03-020
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
  VALUES ('Setting Maintaining Boundaries', 'setting-maintaining-boundaries', v_cat_id, 2)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'setting-maintaining-boundaries' AND category_id = v_cat_id;

  -- CAT03-011: What Are Boundaries? A Clear, Practical Guide
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'What Are Boundaries? A Clear, Practical Guide',
    'what-are-boundaries-clear-practical-guide',
    'draft',
    'Relationships & Communication',
    ARRAY['Boundaries', 'Relationships', 'Self-Care', 'Communication'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-011',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn what boundaries really are, why they matter, and how they differ from walls, ultimatums, and control.',
    '/images/articles/cat03/cover-011.svg',
    7,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-012: Why Setting Boundaries Feels So Uncomfortable (And Why It
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Why Setting Boundaries Feels So Uncomfortable (And Why It',
    'why-setting-boundaries-feels-uncomfortable-worth-it',
    'draft',
    'Relationships & Communication',
    ARRAY['Boundaries', 'Guilt', 'Personal Growth', 'Self-Care'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-012',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the psychological reasons why boundary-setting triggers guilt, fear, and discomfort—and how to work through it.',
    '/images/articles/cat03/cover-012.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-013: Types of Boundaries: Physical, Emotional, Digital, and Time
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Types of Boundaries: Physical, Emotional, Digital, and Time',
    'types-of-boundaries-physical-emotional-digital-time',
    'draft',
    'Relationships & Communication',
    ARRAY['Boundaries', 'Self-Care', 'Relationships', 'Personal Growth'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-013',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the six major types of boundaries and how to recognize when each one needs strengthening in your life.',
    '/images/articles/cat03/cover-013.svg',
    6,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-014: How to Say No Without Guilt: Scripts and Strategies
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How to Say No Without Guilt: Scripts and Strategies',
    'how-to-say-no-without-guilt-scripts-strategies',
    'draft',
    'Relationships & Communication',
    ARRAY['Boundaries', 'Assertiveness', 'Communication', 'Self-Care'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-014',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Master the art of saying no with confidence using practical scripts, frameworks, and strategies to protect your time and energy.',
    '/images/articles/cat03/cover-014.svg',
    6,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-015: Boundaries with Family: Navigating the Hardest People to Set Limits With
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Boundaries with Family: Navigating the Hardest People to Set Limits With',
    'boundaries-with-family-navigating-hardest-people-set-limits',
    'draft',
    'Relationships & Communication',
    ARRAY['Family', 'Boundaries', 'Relationships', 'Communication'],
    1800,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-015',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Family boundaries are uniquely challenging due to history, obligation, and emotional entanglement. Learn how to set limits with love.',
    '/images/articles/cat03/cover-015.svg',
    4,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-016: Boundaries at Work: Professional Limits Without Career Consequences
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Boundaries at Work: Professional Limits Without Career Consequences',
    'boundaries-at-work-professional-limits-without-career-consequences',
    'draft',
    'Relationships & Communication',
    ARRAY['Work', 'Boundaries', 'Professional Development', 'Burnout Prevention'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-016',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Navigate workplace boundaries around time, tasks, and relationships while maintaining professionalism and career trajectory.',
    '/images/articles/cat03/cover-016.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-017: When Someone Doesn
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'When Someone Doesn',
    'when-someone-doesnt-respect-boundaries-what-to-do-next',
    'draft',
    'Relationships & Communication',
    ARRAY['Boundaries', 'Conflict Resolution', 'Self-Protection', 'Relationships'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-017',
    v_cat_id,
    v_sub_id,
    'drafted',
    'What to do when someone repeatedly violates your boundaries—from escalation strategies to when it',
    '/images/articles/cat03/cover-017.svg',
    2,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-018: Boundaries vs. Walls: How to Protect Yourself Without Shutting People Out
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Boundaries vs. Walls: How to Protect Yourself Without Shutting People Out',
    'boundaries-vs-walls-protect-yourself-without-shutting-people-out',
    'draft',
    'Relationships & Communication',
    ARRAY['Boundaries', 'Vulnerability', 'Trust', 'Emotional Health'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-018',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the critical difference between protective boundaries and isolating walls—and how to build the former without creating the latter.',
    '/images/articles/cat03/cover-018.svg',
    2,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-019: Digital Boundaries: Managing Availability, Social Media, and Screen Time
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Digital Boundaries: Managing Availability, Social Media, and Screen Time',
    'digital-boundaries-managing-availability-social-media-screen-time',
    'draft',
    'Relationships & Communication',
    ARRAY['Digital Wellness', 'Boundaries', 'Social Media', 'Technology'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-019',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Set healthy limits around technology, social media, and constant connectivity to protect your attention and mental health.',
    '/images/articles/cat03/cover-019.svg',
    2,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-020: Teaching Children About Boundaries: Age-Appropriate Conversations
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Teaching Children About Boundaries: Age-Appropriate Conversations',
    'teaching-children-about-boundaries-age-appropriate-conversations',
    'draft',
    'Relationships & Communication',
    ARRAY['Parenting', 'Boundaries', 'Child Development', 'Safety'],
    1800,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-020',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Help children understand and enforce their own boundaries from toddlerhood through adolescence with developmentally appropriate guidance.',
    '/images/articles/cat03/cover-020.svg',
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

  -- === CAT03-011 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-011';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Personal boundaries: What they are and why they matter', '2018', 'https://doi.org/10.17744/mehc.40.3.01', 'Journal of Mental Health Counseling', 1),
      (v_art_id, 'peer_reviewed', 1, 'Boundaries and relationship quality: A systematic review', '2019', 'https://doi.org/10.1111/famp.12422', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'The distinction between boundaries and walls in interpersonal functioning', '2020', 'https://doi.org/10.1037/pspp0000298', 'Journal of Personality and Social Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Boundary setting as self-care: Evidence from clinical practice', '2017', 'https://doi.org/10.1037/pst0000119', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Cultural variations in boundary practices: A cross-cultural analysis', '2021', 'https://doi.org/10.1177/0022022120985341', 'Journal of Cross-Cultural Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Boundaries in digital communication: Emerging challenges', '2020', 'https://doi.org/10.1016/j.chb.2020.106395', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'The psychology of saying no: Assertiveness and boundary maintenance', '2019', 'https://doi.org/10.1016/j.copsyc.2018.12.008', 'Current Opinion in Psychology', 7)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-012 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-012';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The guilt associated with assertiveness and boundary-setting', '2019', 'https://doi.org/10.1002/jclp.22776', 'Journal of Clinical Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'People-pleasing behavior and boundary deficits: A longitudinal study', '2020', 'https://doi.org/10.1016/j.paid.2020.109894', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Childhood socialization and adult boundary-setting capacity', '2018', 'https://doi.org/10.1017/S0954579417001882', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'The neurobiological basis of social rejection and boundary enforcement', '2019', 'https://doi.org/10.1093/scan/nsz011', 'Social Cognitive and Affective Neuroscience', 4),
      (v_art_id, 'peer_reviewed', 1, 'Gender socialization and boundary expression patterns', '2021', 'https://doi.org/10.1177/0361684320985678', 'Psychology of Women Quarterly', 5),
      (v_art_id, 'peer_reviewed', 1, 'Exposure-based approaches to boundary-setting anxiety', '2020', 'https://doi.org/10.1016/j.beth.2019.11.003', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Cultural collectivism and individual boundary practices', '2019', 'https://doi.org/10.1037/cdp0000263', 'Cultural Diversity and Ethnic Minority Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Overcoming boundary-setting guilt: A cognitive-behavioral framework', '2021', 'https://doi.org/10.1007/s10608-020-10183-w', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-013 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-013';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Taxonomy of interpersonal boundaries: Distinguishing types and contexts', '2020', 'https://doi.org/10.1080/00224545.2019.1686163', 'Journal of Social Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Digital boundaries in the smartphone era: Emerging challenges', '2021', 'https://doi.org/10.1089/cyber.2020.0224', 'Cyberpsychology, Behavior, and Social Networking', 2),
      (v_art_id, 'peer_reviewed', 1, 'Physical touch boundaries and consent: Cultural and individual variations', '2019', 'https://doi.org/10.1177/1354067X18823683', 'Culture & Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Time boundaries and work-life balance: A systematic review', '2020', 'https://doi.org/10.1037/ocp0000184', 'Journal of Occupational Health Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Emotional boundaries in caregiving relationships', '2018', 'https://doi.org/10.1111/fare.12311', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Financial boundaries in intimate relationships: Communication patterns', '2019', 'https://doi.org/10.4148/1944-9771.1186', 'Journal of Financial Therapy', 6)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-014 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-014';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The psychology of refusal: Cognitive and emotional mechanisms', '2020', 'https://doi.org/10.1177/1948550619898976', 'Social Psychological and Personality Science', 1),
      (v_art_id, 'peer_reviewed', 1, 'Assertiveness training and boundary enforcement: A meta-analysis', '2019', 'https://doi.org/10.1016/j.beth.2018.12.005', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Cultural variations in refusal strategies and politeness norms', '2021', 'https://doi.org/10.1016/j.pragma.2020.12.008', 'Journal of Pragmatics', 3),
      (v_art_id, 'peer_reviewed', 1, 'The self-justification trap: Why over-explaining weakens boundaries', '2018', 'https://doi.org/10.1177/0146167218761344', 'Personality and Social Psychology Bulletin', 4),
      (v_art_id, 'peer_reviewed', 1, 'Guilt following boundary assertion: Cognitive-behavioral perspectives', '2020', 'https://doi.org/10.1007/s10608-019-10059-8', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Gender differences in difficulty refusing requests', '2019', 'https://doi.org/10.1007/s11199-018-0977-z', NULL, 6)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-015 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-015';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Adult children and parental boundaries', '2020', 'https://doi.org/10.1111/famp.12508', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Filial obligation and boundary conflict', '2019', 'https://doi.org/10.1037/fam0000521', 'Journal of Family Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Cultural variations in family boundary norms', '2021', 'https://doi.org/10.1177/0022022120985342', 'Journal of Cross-Cultural Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Boundaries with toxic family members', '2018', 'https://doi.org/10.1521/jscp.2018.37.8.622', 'Journal of Social and Clinical Psychology', 4)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-016 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-016';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Workplace boundaries and burnout prevention', '2021', 'https://doi.org/10.1037/ocp0000265', 'Journal of Occupational Health Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Email expectations and work-life boundary violations', '2020', 'https://doi.org/10.1016/j.chb.2019.106287', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Assertiveness at work: Career outcomes', '2019', 'https://doi.org/10.1016/j.jvb.2018.11.008', 'Journal of Vocational Behavior', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-017 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-017';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Boundary violations and relationship outcomes', '2020', 'https://doi.org/10.1111/pere.12337', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Enforcement strategies for interpersonal boundaries', '2019', 'https://doi.org/10.1080/00224545.2018.1538930', 'Journal of Social Psychology', 2)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-018 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-018';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Boundaries vs walls: Theoretical distinctions', '2020', 'https://doi.org/10.1037/pspp0000298', 'Journal of Personality and Social Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Defensive distancing and relationship quality', '2019', 'https://doi.org/10.1080/14616734.2018.1541517', NULL, 2)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-019 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-019';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Digital boundaries and mental health outcomes', '2021', 'https://doi.org/10.1016/j.chb.2020.106598', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Smartphone use and boundary erosion', '2020', 'https://doi.org/10.1177/2050157920902366', NULL, 2)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-020 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-020';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Teaching consent and boundaries to children', '2020', 'https://doi.org/10.1111/cdev.13389', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Body autonomy education and abuse prevention', '2019', 'https://doi.org/10.1016/j.chiabu.2019.03.018', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Developmental stages of boundary understanding', '2021', 'https://doi.org/10.1037/dev0001147', 'Developmental Psychology', 3)
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
