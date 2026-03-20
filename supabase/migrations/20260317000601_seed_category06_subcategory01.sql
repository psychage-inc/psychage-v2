-- ============================================================================
-- Seed: Category 6 (Family, Parenting & Childhood Patterns) — Subcategory 01
-- 10 articles: CAT06-001 through CAT06-010
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert Category if not present
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  'Family, Parenting & Childhood Patterns',
  'relationships-social',
  '',
  'Brain',
  6,
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
  VALUES ('Understanding Family Systems', 'understanding-family-systems', v_cat_id, 1)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'understanding-family-systems' AND category_id = v_cat_id;

  -- CAT06-001: Family Systems Theory: How Your Family Operates as a Unit
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Family Systems Theory: How Your Family Operates as a Unit',
    'family-systems-theory-how-your-family-operates-as-a-unit',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Family Dynamics', 'Systems Theory', 'Relationships', 'Mental Health'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-001',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover how family systems theory explains the invisible patterns, roles, and dynamics that shape your relationships and mental health across generations.',
    '/images/articles/cat06/cover-001.svg',
    8,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-002: The Roles People Play in Families: Scapegoat, Hero, Lost Child, and More
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Roles People Play in Families: Scapegoat, Hero, Lost Child, and More',
    'the-roles-people-play-in-families-scapegoat-hero-lost-child-and-more',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Family Roles', 'Identity', 'Childhood Patterns', 'Family Dynamics'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-002',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Uncover the unconscious family roles that shape identity and behavior, from the high-achieving hero to the invisible lost child.',
    '/images/articles/cat06/cover-002.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-003: Enmeshed Families: When Closeness Becomes Control
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Enmeshed Families: When Closeness Becomes Control',
    'enmeshed-families-when-closeness-becomes-control',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Boundaries', 'Family Enmeshment', 'Codependency', 'Individuation'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-003',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand enmeshment in families — when boundaries dissolve and individuality disappears under the guise of closeness and love.',
    '/images/articles/cat06/cover-003.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-004: Disengaged Families: When Distance Replaces Connection
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Disengaged Families: When Distance Replaces Connection',
    'disengaged-families-when-distance-replaces-connection',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Emotional Distance', 'Attachment', 'Family Dynamics', 'Avoidance'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-004',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore disengaged family systems where emotional distance and independence are prioritized over connection, and how this affects adult relationships.',
    '/images/articles/cat06/cover-004.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-005: Family Secrets: How Hidden Information Shapes Mental Health Across Generations
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Family Secrets: How Hidden Information Shapes Mental Health Across Generations',
    'family-secrets-how-hidden-information-shapes-mental-health-across-generations',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Family Secrets', 'Intergenerational Patterns', 'Trust', 'Disclosure'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-005',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover how family secrets — from adoption to addiction — create invisible psychological burdens that affect mental health across multiple generations.',
    '/images/articles/cat06/cover-005.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-006: Triangulation: When Two People Use a Third to Manage Conflict
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Triangulation: When Two People Use a Third to Manage Conflict',
    'triangulation-when-two-people-use-a-third-to-manage-conflict',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Triangulation', 'Family Conflict', 'Communication', 'Boundaries'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-006',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how triangulation — a common but damaging family pattern — uses a third person to avoid direct conflict and creates lasting relational dysfunction.',
    '/images/articles/cat06/cover-006.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-007: How Your Birth Order Affects Your Psychological Development
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How Your Birth Order Affects Your Psychological Development',
    'how-your-birth-order-affects-your-psychological-development',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Birth Order', 'Sibling Dynamics', 'Personality Development', 'Research'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-007',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore what research reveals about birth order effects on personality, achievement, and relationships — separating myth from evidence.',
    '/images/articles/cat06/cover-007.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-008: Family Rules — Written and Unwritten: How They Shape Your Beliefs
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Family Rules — Written and Unwritten: How They Shape Your Beliefs',
    'family-rules-written-and-unwritten-how-they-shape-your-beliefs',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Family Rules', 'Beliefs', 'Family Culture', 'Values'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-008',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the invisible rulebook every family operates by, and how these spoken and unspoken rules shape your beliefs, behaviors, and mental health.',
    '/images/articles/cat06/cover-008.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-009: The Identified Patient: When One Person Carries the Family\
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Identified Patient: When One Person Carries the Family\',
    'the-identified-patient-when-one-person-carries-the-familys-pain',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Identified Patient', 'Scapegoating', 'Family Dysfunction', 'Systems Theory'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-009',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover the identified patient dynamic — when one family member becomes the repository for the entire family\',
    '/images/articles/cat06/cover-009.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-010: Can a Family System Change? How Therapy Works with the Whole Unit
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Can a Family System Change? How Therapy Works with the Whole Unit',
    'can-a-family-system-change-how-therapy-works-with-the-whole-unit',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Family Therapy', 'Systemic Change', 'Treatment', 'Healing'],
    1800,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-010',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand how family therapy addresses patterns rather than individuals, and what it takes for an entire family system to transform.',
    '/images/articles/cat06/cover-010.svg',
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

  -- === CAT06-001 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-001';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'professional_org', 3, 'Family Systems Theory and Therapy', '2023', 'https://www.aamft.org/Consumer_Updates/Family_Systems_Theory.aspx', NULL, 1),
      (v_art_id, 'professional_org', 3, 'Family therapy: An overview', '2022', 'https://www.apa.org/topics/psychotherapy/family-therapy', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Bowen family systems theory and practice: Illustration and critique', '2019', 'https://doi.org/10.1002/anzf.1362', 'Australian and New Zealand Journal of Family Therapy', 3),
      (v_art_id, 'peer_reviewed', 1, 'The impact of family functioning on mental health during the COVID-19 pandemic', '2021', 'https://doi.org/10.1037/fam0000900', 'Journal of Family Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Family emotional climate and resilience', '2020', 'https://doi.org/10.1007/s10567-020-00325-7', 'Clinical Child and Family Psychology Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'Structural family therapy', '2018', 'https://doi.org/10.1111/jmft.12301', 'Journal of Marital and Family Therapy', 6),
      (v_art_id, 'peer_reviewed', 1, 'Intergenerational transmission of family patterns', '2021', 'https://doi.org/10.1111/famp.12669', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Systems theory in family therapy practice', '2020', 'https://doi.org/10.1111/1467-6427.12295', 'Journal of Family Therapy', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-002 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-002';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'government', 2, 'Family roles in addiction recovery', '2021', 'https://www.samhsa.gov/families', NULL, 1),
      (v_art_id, 'textbook', 5, 'The New Peoplemaking', '1988', 'https://www.worldcat.org/title/new-peoplemaking/oclc/17774085', 'Science and Behavior Books', 2),
      (v_art_id, 'peer_reviewed', 1, 'Role theory and family therapy', '2019', 'https://doi.org/10.1111/1467-6427.12259', 'Journal of Family Therapy', 3),
      (v_art_id, 'peer_reviewed', 1, 'Family roles and individual identity development', '2020', 'https://doi.org/10.1111/famp.12543', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'The scapegoat role in family systems', '2018', 'https://doi.org/10.1111/jmft.12289', 'Journal of Marital and Family Therapy', 5),
      (v_art_id, 'peer_reviewed', 1, 'Birth order and personality: A within-family test using independent self-reports', '2015', 'https://doi.org/10.1016/j.jrp.2015.05.005', 'Journal of Research in Personality', 6),
      (v_art_id, 'peer_reviewed', 1, 'Adult children of alcoholics: Psychological distress and family roles', '2019', 'https://doi.org/10.1016/j.addbeh.2019.06.012', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Breaking free from family roles in adulthood', '2021', 'https://doi.org/10.1016/j.cpr.2021.102048', 'Clinical Psychology Review', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-003 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-003';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Structural family therapy and family boundaries', '2020', 'https://doi.org/10.1111/jmft.12425', 'Journal of Marital and Family Therapy', 1),
      (v_art_id, 'peer_reviewed', 1, 'Enmeshment and differentiation in family systems', '2019', 'https://doi.org/10.1111/famp.12458', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Parental enmeshment and emerging adult mental health', '2021', 'https://doi.org/10.1037/fam0000856', 'Journal of Family Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Cultural considerations in family enmeshment', '2020', 'https://doi.org/10.1037/cdp0000321', 'Cultural Diversity and Ethnic Minority Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Enmeshment and anxiety disorders', '2018', 'https://doi.org/10.1016/j.janxdis.2018.09.004', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Separation-individuation in adulthood', '2019', 'https://doi.org/10.1017/S0954579419000774', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Enmeshment, emotional regulation, and relationship satisfaction', '2021', 'https://doi.org/10.1002/jclp.23156', 'Journal of Clinical Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Establishing healthy boundaries with enmeshed families', '2020', 'https://doi.org/10.1080/01926187.2020.1813654', 'American Journal of Family Therapy', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-004 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-004';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Disengagement and family functioning', '2020', 'https://doi.org/10.1037/fam0000623', 'Journal of Family Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Structural family therapy: Boundaries and subsystems', '2019', 'https://doi.org/10.1111/famp.12436', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Avoidant attachment and family of origin experiences', '2021', 'https://doi.org/10.1080/14616734.2021.1976922', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Emotional availability in parent-child relationships', '2020', 'https://doi.org/10.1111/cdev.13321', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'The impact of parental disengagement on adolescent mental health', '2019', 'https://doi.org/10.1016/j.adolescence.2019.07.012', 'Journal of Adolescence', 5),
      (v_art_id, 'peer_reviewed', 1, 'Earned secure attachment: Healing from disengaged parenting', '2020', 'https://doi.org/10.1017/S0954579420000887', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Cultural variations in family engagement', '2021', 'https://doi.org/10.1177/1069397120987000', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Loneliness in adulthood and family disengagement patterns', '2021', 'https://doi.org/10.1177/0265407521103567', 'Journal of Social and Personal Relationships', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-005 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-005';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The psychology of family secrets', '2020', 'https://doi.org/10.1111/famp.12508', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Secrets and mental health outcomes', '2021', 'https://doi.org/10.1037/fam0000789', 'Journal of Family Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Intergenerational transmission of family secrets', '2019', 'https://doi.org/10.1111/jmft.12367', 'Journal of Marital and Family Therapy', 3),
      (v_art_id, 'peer_reviewed', 1, 'The burden of keeping secrets: Psychological and physiological costs', '2020', 'https://doi.org/10.1037/emo0000650', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Disclosure of family secrets in therapy', '2021', 'https://doi.org/10.1037/pst0000356', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Children\', '2019', 'https://doi.org/10.1037/dev0000812', 'Developmental Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Cultural variations in family secrecy and disclosure', '2020', 'https://doi.org/10.1177/1354067X20956764', 'Culture & Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'The therapeutic value of breaking family silence', '2021', 'https://doi.org/10.1016/j.cpr.2021.102064', 'Clinical Psychology Review', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-006 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-006';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Bowen theory: Triangles and emotional systems', '2020', 'https://doi.org/10.1111/jmft.12436', 'Journal of Marital and Family Therapy', 1),
      (v_art_id, 'peer_reviewed', 1, 'Triangulation in family relationships', '2021', 'https://doi.org/10.1111/famp.12634', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Effects of parental triangulation on children', '2019', 'https://doi.org/10.1037/fam0000545', 'Journal of Family Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Triangulation and anxiety in family systems', '2020', 'https://doi.org/10.1080/10615806.2020.1746286', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Parent-child coalitions and marital quality', '2021', 'https://doi.org/10.1111/jomf.12756', 'Journal of Marriage and Family', 5),
      (v_art_id, 'peer_reviewed', 1, 'Breaking triangulation patterns in therapy', '2020', 'https://doi.org/10.1177/1066480720924567', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Workplace triangulation and organizational psychology', '2021', 'https://doi.org/10.1037/ocp0000298', 'Journal of Occupational Health Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Adult children and parental triangulation', '2020', 'https://doi.org/10.1007/s10804-020-09358-9', 'Journal of Adult Development', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-007 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-007';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Birth order and personality: A within-family test using independent self-reports from both firstborn and laterborn siblings', '2015', 'https://doi.org/10.1016/j.jrp.2015.05.005', 'Journal of Research in Personality', 1),
      (v_art_id, 'peer_reviewed', 1, 'Examining the effects of birth order on personality', '2015', 'https://doi.org/10.1073/pnas.1506451112', 'Proceedings of the National Academy of Sciences', 2),
      (v_art_id, 'peer_reviewed', 1, 'Birth order and intelligence: A meta-analysis', '2017', 'https://doi.org/10.1016/j.intell.2017.09.003', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Birth order and sibling relationships', '2020', 'https://doi.org/10.1037/fam0000678', 'Journal of Family Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Parental investment and birth order', '2019', 'https://doi.org/10.1177/1474704919832435', 'Evolutionary Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Only children: Stereotype vs. reality', '2020', 'https://doi.org/10.1177/1948550620923044', 'Social Psychological and Personality Science', 6),
      (v_art_id, 'peer_reviewed', 1, 'Birth order effects in the formation of long-term relationships', '2018', 'https://doi.org/10.1027/1614-0001/a000265', 'Journal of Individual Differences', 7),
      (v_art_id, 'peer_reviewed', 1, 'The role of birth order in family dynamics and mental health', '2021', 'https://doi.org/10.1111/fare.12523', NULL, 8),
      (v_art_id, 'peer_reviewed', 1, 'Adler\', '2019', 'https://doi.org/10.1353/jip.2019.0015', 'Journal of Individual Psychology', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-008 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-008';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Family rules and adolescent development', '2020', 'https://doi.org/10.1037/fam0000712', 'Journal of Family Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Implicit family rules and mental health', '2021', 'https://doi.org/10.1111/famp.12678', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Intergenerational transmission of family scripts', '2019', 'https://doi.org/10.1111/jmft.12389', 'Journal of Marital and Family Therapy', 3),
      (v_art_id, 'peer_reviewed', 1, 'Cultural variations in family norms and expectations', '2020', 'https://doi.org/10.1037/cdp0000298', 'Cultural Diversity and Ethnic Minority Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Challenging maladaptive family beliefs in therapy', '2021', 'https://doi.org/10.1016/j.cpr.2021.102089', 'Clinical Psychology Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'Family emotional expressiveness rules and child outcomes', '2020', 'https://doi.org/10.1037/dev0000934', 'Developmental Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Gender roles and family scripts', '2019', 'https://doi.org/10.1007/s11199-019-01056-2', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Autonomy development and family rule flexibility', '2021', 'https://doi.org/10.1016/j.adolescence.2021.04.008', 'Journal of Adolescence', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-009 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-009';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The identified patient in family systems', '2020', 'https://doi.org/10.1111/jmft.12453', 'Journal of Marital and Family Therapy', 1),
      (v_art_id, 'peer_reviewed', 1, 'Systemic family therapy and the symptom bearer', '2021', 'https://doi.org/10.1111/famp.12689', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Long-term psychological impact of being the identified patient', '2019', 'https://doi.org/10.1037/fam0000567', 'Journal of Family Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Treating the system, not the symptom: Family therapy approaches', '2020', 'https://doi.org/10.1016/j.cpr.2020.101912', 'Clinical Psychology Review', 4),
      (v_art_id, 'peer_reviewed', 1, 'Adolescent mental health symptoms and family dynamics', '2021', 'https://doi.org/10.1016/j.adolescence.2021.03.012', 'Journal of Adolescence', 5),
      (v_art_id, 'peer_reviewed', 1, 'Breaking the identified patient cycle', '2020', 'https://doi.org/10.1037/pst0000334', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'When children carry parental anxiety', '2020', 'https://doi.org/10.1037/dev0000945', 'Developmental Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Family homeostasis and resistance to change', '2019', 'https://doi.org/10.1111/1467-6427.12267', 'Journal of Family Therapy', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-010 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-010';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Effectiveness of family therapy: A meta-analysis', '2021', 'https://doi.org/10.1111/jmft.12498', 'Journal of Marital and Family Therapy', 1),
      (v_art_id, 'peer_reviewed', 1, 'Structural family therapy outcomes', '2020', 'https://doi.org/10.1111/famp.12534', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Emotionally focused family therapy', '2021', 'https://doi.org/10.1037/fam0000823', 'Journal of Family Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Family systems therapy for adolescent mental health', '2020', 'https://doi.org/10.1016/j.jaac.2020.08.442', 'Journal of the American Academy of Child & Adolescent Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Resistance and readiness for change in family therapy', '2019', 'https://doi.org/10.1080/10503307.2019.1645941', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Multigenerational family therapy', '2020', 'https://doi.org/10.1016/j.cpr.2020.101945', 'Clinical Psychology Review', 6),
      (v_art_id, 'peer_reviewed', 1, 'When individual therapy is needed alongside family work', '2021', 'https://doi.org/10.1037/pst0000389', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Common factors in successful family therapy', '2020', 'https://doi.org/10.1111/1467-6427.12298', 'Journal of Family Therapy', 8),
      (v_art_id, 'professional_org', 3, 'Finding a qualified family therapist', '2023', 'https://www.aamft.org/Directories/Find_a_Therapist.aspx', NULL, 9)
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
  WHERE a.article_production_id LIKE 'CAT06-%';

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;
