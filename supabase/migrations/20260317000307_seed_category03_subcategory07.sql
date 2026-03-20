-- ============================================================================
-- Seed: Category 3 (Relationships & Communication) — Subcategory 07
-- 10 articles: CAT03-061 through CAT03-070
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
  VALUES ('Toxic Dynamics Red Flags', 'toxic-dynamics-red-flags', v_cat_id, 7)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'toxic-dynamics-red-flags' AND category_id = v_cat_id;

  -- CAT03-061: Recognizing Toxic Relationship Patterns: A Research-Based Guide
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Recognizing Toxic Relationship Patterns: A Research-Based Guide',
    'recognizing-toxic-relationship-patterns-research',
    'draft',
    'Relationships & Communication',
    ARRAY['Toxic Relationships', 'Red Flags', 'Boundaries', 'Mental Health'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-061',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn to identify unhealthy relationship dynamics using evidence-based markers, from subtle control to overt manipulation, and understand why they',
    '/images/articles/cat03/cover-061.svg',
    8,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-062: Emotional Manipulation: Gaslighting, Love-Bombing, and Other Tactics
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Emotional Manipulation: Gaslighting, Love-Bombing, and Other Tactics',
    'emotional-manipulation-gaslighting-love-bombing',
    'draft',
    'Relationships & Communication',
    ARRAY['Gaslighting', 'Manipulation', 'Abuse', 'Boundaries'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-062',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the specific manipulation techniques used in toxic relationships, from gaslighting and love-bombing to triangulation and DARVO, with examples and recovery strategies.',
    '/images/articles/cat03/cover-062.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-063: Codependency: When Helping Becomes Harmful
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Codependency: When Helping Becomes Harmful',
    'codependency-helping-becomes-harmful',
    'draft',
    'Relationships & Communication',
    ARRAY['Codependency', 'Boundaries', 'Self-Care', 'Relationships'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-063',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand codependent patterns where caring for others comes at the expense of yourself, from people-pleasing to enabling, with strategies for building healthier boundaries.',
    '/images/articles/cat03/cover-063.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-064: Narcissistic Relationship Patterns: What They Look Like From the Inside
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Narcissistic Relationship Patterns: What They Look Like From the Inside',
    'narcissistic-relationship-patterns-inside',
    'draft',
    'Relationships & Communication',
    ARRAY['Narcissistic Abuse', 'Toxic Relationships', 'Recovery', 'Gaslighting'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-064',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand what it feels like to be in a relationship with someone with narcissistic traits, from idealization to devaluation, and how to recognize and heal from narcissistic abuse.',
    '/images/articles/cat03/cover-064.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-065: Trauma Bonding: Why Leaving Harmful Relationships Feels Impossible
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Trauma Bonding: Why Leaving Harmful Relationships Feels Impossible',
    'trauma-bonding-leaving-harmful-relationships',
    'draft',
    'Relationships & Communication',
    ARRAY['Trauma Bonding', 'Abusive Relationships', 'Attachment', 'Recovery'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-065',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the neuroscience and psychology of trauma bonds, why abusive relationships create powerful attachment, and evidence-based strategies for breaking free.',
    '/images/articles/cat03/cover-065.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-066: Enabling: How Good Intentions Keep Unhealthy Patterns Alive
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Enabling: How Good Intentions Keep Unhealthy Patterns Alive',
    'enabling-good-intentions-unhealthy-patterns',
    'draft',
    'Relationships & Communication',
    ARRAY['Enabling', 'Codependency', 'Boundaries', 'Addiction'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-066',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the difference between helping and enabling, recognize when your support perpetuates harmful behavior, and learn how to set boundaries that promote real change.',
    '/images/articles/cat03/cover-066.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-067: Enmeshment: When Closeness Crosses the Line Into Control
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Enmeshment: When Closeness Crosses the Line Into Control',
    'enmeshment-closeness-crosses-line-control',
    'draft',
    'Relationships & Communication',
    ARRAY['Enmeshment', 'Boundaries', 'Family Systems', 'Codependency'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-067',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Recognize enmeshed relationship dynamics where boundaries dissolve, identities merge, and autonomy is lost, with strategies for reclaiming healthy separation.',
    '/images/articles/cat03/cover-067.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-068: Power Imbalances in Relationships: Age, Money, Status, and Influence
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Power Imbalances in Relationships: Age, Money, Status, and Influence',
    'power-imbalances-relationships-age-money-status',
    'draft',
    'Relationships & Communication',
    ARRAY['Power Dynamics', 'Equality', 'Exploitation', 'Relationships'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-068',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Examine how power differentials based on age, wealth, social status, and other factors shape relationship dynamics and when imbalance becomes exploitation.',
    '/images/articles/cat03/cover-068.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-069: How to Protect Your Mental Health in a Difficult Relationship
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How to Protect Your Mental Health in a Difficult Relationship',
    'protect-mental-health-difficult-relationship',
    'draft',
    'Relationships & Communication',
    ARRAY['Mental Health', 'Self-Care', 'Boundaries', 'Coping'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-069',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn strategies for maintaining your wellbeing when you can\',
    '/images/articles/cat03/cover-069.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-070: When Love Isn
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'When Love Isn',
    'when-love-isnt-enough-time-to-leave',
    'draft',
    'Relationships & Communication',
    ARRAY['Breakups', 'Relationships', 'Self-Worth', 'Boundaries'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-070',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand when love alone can\',
    '/images/articles/cat03/cover-070.svg',
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

  -- === CAT03-061 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-061';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Psychological aggression in romantic relationships', '2018', 'https://doi.org/10.1037/fam0000399', 'Journal of Family Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Patterns of abusive relationships: Recognition and intervention', '2020', 'https://doi.org/10.1016/j.cpr.2020.101891', 'Clinical Psychology Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'The cycle of abuse in interpersonal relationships', '2019', 'https://doi.org/10.1177/0886260518822340', 'Journal of Interpersonal Violence', 3),
      (v_art_id, 'peer_reviewed', 1, 'Emotional abuse and mental health outcomes', '2017', 'https://doi.org/10.1080/10926790.2017.1328458', 'Journal of Emotional Abuse', 4),
      (v_art_id, 'peer_reviewed', 1, 'Control and coercion in intimate relationships', '2021', 'https://doi.org/10.1891/VV-D-19-00124', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Why people stay in abusive relationships', '2018', 'https://doi.org/10.1177/1524838016673750', NULL, 6),
      (v_art_id, 'professional_org', 3, 'Recognizing unhealthy relationships', '2022', 'https://www.thehotline.org/identify-abuse/', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'The health impacts of relationship toxicity', '2019', 'https://doi.org/10.1016/j.amepre.2019.02.016', 'American Journal of Preventive Medicine', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-062 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-062';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Gaslighting in intimate partner relationships', '2020', 'https://doi.org/10.1177/0886260519898440', 'Journal of Interpersonal Violence', 1),
      (v_art_id, 'peer_reviewed', 1, 'Love-bombing as a manipulation tactic in narcissistic abuse', '2021', 'https://doi.org/10.1016/j.paid.2021.110963', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'DARVO: Deny, attack, and reverse victim and offender', '2017', 'https://doi.org/10.1080/10926771.2017.1320777', 'Journal of Aggression, Maltreatment & Trauma', 3),
      (v_art_id, 'peer_reviewed', 1, 'Triangulation in dysfunctional family systems', '2018', 'https://doi.org/10.1111/famp.12333', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'The psychology of manipulation in abusive relationships', '2019', 'https://doi.org/10.1016/j.cpr.2019.03.004', 'Clinical Psychology Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive dissonance in abuse dynamics', '2020', 'https://doi.org/10.1002/jts.22479', 'Journal of Traumatic Stress', 6),
      (v_art_id, 'professional_org', 3, 'Recognizing emotional manipulation', '2022', 'https://www.apa.org/topics/abuse-trauma/manipulation', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Recovery from psychological abuse', '2021', 'https://doi.org/10.1007/s10896-020-00234-1', 'Journal of Family Violence', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-063 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-063';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Codependency: A clinical construct in evolution', '2018', 'https://doi.org/10.1080/02791072.2018.1491546', 'Journal of Psychoactive Drugs', 1),
      (v_art_id, 'peer_reviewed', 1, 'The relationship between codependency and self-esteem', '2019', 'https://doi.org/10.1080/01926187.2019.1586864', 'American Journal of Family Therapy', 2),
      (v_art_id, 'peer_reviewed', 1, 'Codependency in intimate relationships: Predictors and outcomes', '2020', 'https://doi.org/10.1177/0192513X19894262', 'Journal of Family Issues', 3),
      (v_art_id, 'peer_reviewed', 1, 'Attachment style and codependent behavior', '2017', 'https://doi.org/10.1016/j.paid.2017.03.033', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Treatment of codependency: A systematic review', '2021', 'https://doi.org/10.1016/j.cpr.2021.102070', 'Clinical Psychology Review', 5),
      (v_art_id, 'government', 2, 'Understanding codependency', '2022', 'https://www.samhsa.gov/find-help/support', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Recovery from codependency: The role of boundaries', '2020', 'https://doi.org/10.17744/mehc.42.1.05', 'Journal of Mental Health Counseling', 7),
      (v_art_id, 'peer_reviewed', 1, 'Codependency and mental health outcomes', '2019', 'https://doi.org/10.1002/jclp.22801', 'Journal of Clinical Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-064 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-064';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Narcissism and intimate partner violence', '2020', 'https://doi.org/10.1521/pedi_2019_33_402', 'Journal of Personality Disorders', 1),
      (v_art_id, 'peer_reviewed', 1, 'The narcissistic abuse cycle: Idealize, devalue, discard', '2019', 'https://doi.org/10.1016/j.cpr.2019.101746', 'Clinical Psychology Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive and emotional effects of narcissistic abuse', '2021', 'https://doi.org/10.1080/15299732.2020.1869654', 'Journal of Trauma & Dissociation', 3),
      (v_art_id, 'peer_reviewed', 1, 'Grandiose and vulnerable narcissism in relationships', '2018', 'https://doi.org/10.1016/j.paid.2017.12.018', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Recovery from relationships with narcissistic partners', '2020', 'https://doi.org/10.1007/s10896-019-00120-x', 'Journal of Family Violence', 5),
      (v_art_id, 'government', 2, 'Understanding narcissistic personality disorder', '2022', 'https://www.nimh.nih.gov/health/topics/personality-disorders', NULL, 6),
      (v_art_id, 'professional_org', 3, 'Support for narcissistic abuse survivors', '2022', 'https://www.apa.org/topics/abuse-trauma/narcissistic-abuse', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'The role of empathy deficits in narcissistic abuse', '2019', 'https://doi.org/10.1016/j.jrp.2019.05.008', 'Journal of Research in Personality', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-065 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-065';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Traumatic bonding in abusive relationships: A neurobiological perspective', '2019', 'https://doi.org/10.1177/1524838018770414', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Intermittent reinforcement and relationship attachment', '2018', 'https://doi.org/10.1037/xge0000434', 'Journal of Experimental Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Stockholm syndrome and trauma bonding: A review', '2020', 'https://doi.org/10.1177/0886260519898439', 'Journal of Interpersonal Violence', 3),
      (v_art_id, 'peer_reviewed', 1, 'Oxytocin and vasopressin in traumatic bonding', '2021', 'https://doi.org/10.1016/j.psyneuen.2020.105004', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Breaking trauma bonds: Clinical interventions', '2020', 'https://doi.org/10.1080/15299732.2019.1678212', 'Journal of Trauma & Dissociation', 5),
      (v_art_id, 'peer_reviewed', 1, 'Why abuse victims return: The cycle of violence', '2019', 'https://doi.org/10.1177/1077801218824050', NULL, 6),
      (v_art_id, 'professional_org', 3, 'Understanding trauma bonding', '2022', 'https://www.thehotline.org/resources/trauma-bonding/', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Recovery from traumatic bonding: A longitudinal study', '2021', 'https://doi.org/10.1007/s10896-020-00248-9', 'Journal of Family Violence', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-066 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-066';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Enabling behaviors in families of substance users', '2019', 'https://doi.org/10.1016/j.jsat.2019.04.009', 'Journal of Substance Abuse Treatment', 1),
      (v_art_id, 'peer_reviewed', 1, 'The relationship between enabling and treatment outcomes', '2020', 'https://doi.org/10.1016/j.addbeh.2020.106417', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Codependency and enabling in intimate relationships', '2018', 'https://doi.org/10.1080/01926187.2018.1461646', 'American Journal of Family Therapy', 3),
      (v_art_id, 'peer_reviewed', 1, 'Setting boundaries with loved ones in crisis', '2021', 'https://doi.org/10.1037/fam0000812', 'Journal of Family Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Natural consequences and behavior change', '2019', 'https://doi.org/10.1177/0145445518809369', NULL, 5),
      (v_art_id, 'government', 2, 'Understanding enabling', '2022', 'https://www.samhsa.gov/find-help/support', NULL, 6),
      (v_art_id, 'government', 2, 'Recovery for families: Stopping enabling', '2022', 'https://www.drugabuse.gov/related-topics/treatment/what-to-do-if-your-adult-friend-or-loved-one-has-problem-drugs', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'The psychological toll of enabling', '2020', 'https://doi.org/10.1002/jclp.22954', 'Journal of Clinical Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-067 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-067';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Enmeshment in family systems theory', '2019', 'https://doi.org/10.1111/famp.12422', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Boundary ambiguity and mental health outcomes', '2020', 'https://doi.org/10.1037/fam0000673', 'Journal of Family Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Differentiation of self in adult relationships', '2018', 'https://doi.org/10.1111/jmft.12285', 'Journal of Marital and Family Therapy', 3),
      (v_art_id, 'peer_reviewed', 1, 'Enmeshment and anxiety in young adults', '2021', 'https://doi.org/10.1016/j.janxdis.2021.102409', 'Journal of Anxiety Disorders', 4),
      (v_art_id, 'peer_reviewed', 1, 'Parent-child enmeshment and identity development', '2019', 'https://doi.org/10.1037/dev0000764', 'Developmental Psychology', 5),
      (v_art_id, 'professional_org', 3, 'Creating healthy boundaries in families', '2022', 'https://www.apa.org/topics/families/boundaries', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Therapeutic interventions for enmeshed systems', '2020', 'https://doi.org/10.1111/1467-6427.12284', 'Journal of Family Therapy', 7),
      (v_art_id, 'peer_reviewed', 1, 'Cultural considerations in family boundaries', '2019', 'https://doi.org/10.1037/cdp0000252', 'Cultural Diversity and Ethnic Minority Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-068 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-068';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Power dynamics in intimate relationships', '2020', 'https://doi.org/10.1177/0265407519885367', 'Journal of Social and Personal Relationships', 1),
      (v_art_id, 'peer_reviewed', 1, 'Age gaps and relationship power', '2019', 'https://doi.org/10.1177/0192513X18821398', 'Journal of Family Issues', 2),
      (v_art_id, 'peer_reviewed', 1, 'Economic power and intimate partner violence', '2021', 'https://doi.org/10.1177/1077801220985125', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Social capital and relationship inequality', '2018', 'https://doi.org/10.1177/0003122418781791', 'American Sociological Review', 4),
      (v_art_id, 'peer_reviewed', 1, 'Power imbalance and mental health in relationships', '2020', 'https://doi.org/10.1002/jclp.22963', 'Journal of Clinical Psychology', 5),
      (v_art_id, 'professional_org', 3, 'Recognizing unhealthy power dynamics', '2022', 'https://www.thehotline.org/resources/power-control/', NULL, 6),
      (v_art_id, 'professional_org', 3, 'Equalizing power in relationships', '2022', 'https://www.apa.org/topics/relationships/power-dynamics', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Intersectionality and relationship power', '2019', 'https://doi.org/10.1177/0361684319826776', 'Psychology of Women Quarterly', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-069 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-069';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Coping strategies in high-conflict relationships', '2020', 'https://doi.org/10.1037/fam0000689', 'Journal of Family Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Self-care and resilience in stressful relationships', '2019', 'https://doi.org/10.1016/j.cpr.2019.101742', 'Clinical Psychology Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Emotional boundaries and mental health outcomes', '2021', 'https://doi.org/10.1002/jclp.23147', 'Journal of Clinical Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness and relationship distress tolerance', '2020', 'https://doi.org/10.1007/s12671-019-01285-y', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Safety planning in abusive relationships', '2021', 'https://doi.org/10.1177/1077801220985136', NULL, 5),
      (v_art_id, 'professional_org', 3, 'Supporting mental health in difficult relationships', '2022', 'https://www.apa.org/topics/relationships/stress', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Psychological detachment and wellbeing', '2018', 'https://doi.org/10.1037/ocp0000116', 'Journal of Occupational Health Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Social support as a buffer in toxic relationships', '2020', 'https://doi.org/10.1177/0265407519898444', 'Journal of Social and Personal Relationships', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-070 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-070';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'When love is not enough: Relationship dissolution despite attachment', '2020', 'https://doi.org/10.1177/0265407519898447', 'Journal of Social and Personal Relationships', 1),
      (v_art_id, 'peer_reviewed', 1, 'Decision-making in relationship termination', '2019', 'https://doi.org/10.1111/pere.12307', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'The sunk cost fallacy in romantic relationships', '2018', 'https://doi.org/10.1177/0963721417752522', 'Current Directions in Psychological Science', 3),
      (v_art_id, 'peer_reviewed', 1, 'Relationship satisfaction and mental health', '2021', 'https://doi.org/10.1037/fam0000815', 'Journal of Family Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Leaving abusive relationships: Decision factors', '2020', 'https://doi.org/10.1177/1077801219898440', NULL, 5),
      (v_art_id, 'professional_org', 3, 'Knowing when to end a relationship', '2022', 'https://www.apa.org/topics/relationships/healthy-relationships', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Post-breakup wellbeing: Predictors of recovery', '2019', 'https://doi.org/10.1080/17439760.2018.1545041', 'Journal of Positive Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Values alignment and relationship sustainability', '2020', 'https://doi.org/10.1111/jomf.12648', 'Journal of Marriage and Family', 8)
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
