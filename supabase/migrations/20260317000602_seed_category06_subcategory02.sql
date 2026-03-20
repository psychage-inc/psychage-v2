-- ============================================================================
-- Seed: Category 6 (Family, Parenting & Childhood Patterns) — Subcategory 02
-- 10 articles: CAT06-011 through CAT06-020
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
  VALUES ('Childhood Experiences Adult Patterns', 'childhood-experiences-adult-patterns', v_cat_id, 2)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'childhood-experiences-adult-patterns' AND category_id = v_cat_id;

  -- CAT06-011: How Childhood Experiences Shape Your Adult Personality and Relationships
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How Childhood Experiences Shape Your Adult Personality and Relationships',
    'how-childhood-experiences-shape-your-adult-personality-and-relationships',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Childhood Development', 'Adult Patterns', 'Attachment', 'Personality'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-011',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover the profound ways early childhood experiences influence adult behavior, relationships, and mental health across the lifespan.',
    '/images/articles/cat06/cover-011.svg',
    8,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-012: Adverse Childhood Experiences (ACEs): What They Are and Why They Matter
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Adverse Childhood Experiences (ACEs): What They Are and Why They Matter',
    'adverse-childhood-experiences-aces-what-they-are-and-why-they-matter',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['ACEs', 'Childhood Trauma', 'Research', 'Prevention'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-012',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the groundbreaking ACE study and how childhood adversity affects physical and mental health across the lifespan.',
    '/images/articles/cat06/cover-012.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-013: The Long Shadow of Emotional Neglect: What Happens When Feelings Aren\
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Long Shadow of Emotional Neglect: What Happens When Feelings Aren\',
    'the-long-shadow-of-emotional-neglect-what-happens-when-feelings-arent-validated',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Emotional Neglect', 'Validation', 'Childhood Trauma', 'Healing'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-013',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore childhood emotional neglect — the invisible wound that affects adult emotional life and relationships.',
    '/images/articles/cat06/cover-013.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-014: Parentification: When Children Become Caregivers Too Soon
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Parentification: When Children Become Caregivers Too Soon',
    'parentification-when-children-become-caregivers-too-soon',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Parentification', 'Role Reversal', 'Childhood Trauma', 'Caretaking'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-014',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand parentification — when children take on adult responsibilities — and its lasting effects on identity and relationships.',
    '/images/articles/cat06/cover-014.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-015: How Growing Up with an Addicted Parent Affects Adult Mental Health
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How Growing Up with an Addicted Parent Affects Adult Mental Health',
    'how-growing-up-with-an-addicted-parent-affects-adult-mental-health',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['ACOA', 'Addiction', 'Family Dysfunction', 'Recovery'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-015',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the specific challenges adult children of addicted parents face and pathways to healing.',
    '/images/articles/cat06/cover-015.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-016: Children of Divorce: Long-Term Psychological Effects and Resilience
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Children of Divorce: Long-Term Psychological Effects and Resilience',
    'children-of-divorce-long-term-psychological-effects-and-resilience',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Divorce', 'Research', 'Resilience', 'Child Development'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-016',
    v_cat_id,
    v_sub_id,
    'drafted',
    'What research reveals about how parental divorce affects children into adulthood, and the factors that promote resilience.',
    '/images/articles/cat06/cover-016.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-017: Overprotective Parenting: When Keeping Kids Safe Prevents Them from Growing
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Overprotective Parenting: When Keeping Kids Safe Prevents Them from Growing',
    'overprotective-parenting-when-keeping-kids-safe-prevents-them-from-growing',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Helicopter Parenting', 'Anxiety', 'Independence', 'Development'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-017',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore how well-intentioned overprotective parenting can hinder development and create anxiety in adulthood.',
    '/images/articles/cat06/cover-017.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-018: How Bullying in Childhood Creates Lasting Psychological Patterns
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How Bullying in Childhood Creates Lasting Psychological Patterns',
    'how-bullying-in-childhood-creates-lasting-psychological-patterns',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Bullying', 'Childhood Trauma', 'Self-Esteem', 'Recovery'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-018',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the long-term mental health effects of childhood bullying and pathways to healing.',
    '/images/articles/cat06/cover-018.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-019: The Inner Child: Understanding the Past Versions of Yourself
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Inner Child: Understanding the Past Versions of Yourself',
    'the-inner-child-understanding-the-past-versions-of-yourself',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Inner Child', 'Self-Compassion', 'Healing', 'Therapy'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-019',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the concept of the inner child and how unmet childhood needs affect your adult life.',
    '/images/articles/cat06/cover-019.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-020: Reparenting Yourself: How to Give Yourself What You Didn\
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Reparenting Yourself: How to Give Yourself What You Didn\',
    'reparenting-yourself-how-to-give-yourself-what-you-didnt-receive',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Reparenting', 'Self-Care', 'Healing', 'Recovery'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-020',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn practical strategies for reparenting yourself and healing childhood wounds through self-care and compassion.',
    '/images/articles/cat06/cover-020.svg',
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

  -- === CAT06-011 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-011';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Childhood experiences and adult personality', '2020', 'https://doi.org/10.1037/bul0000238', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Attachment and adult relationships', '2021', 'https://doi.org/10.1017/S0954579421000456', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Early environments and neural development', '2020', 'https://doi.org/10.1146/annurev-psych-010419-051043', 'Annual Review of Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Childhood adversity and adult outcomes', '2021', 'https://doi.org/10.1001/jamapsychiatry.2021.0847', 'JAMA Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Parenting styles long-term effects', '2020', 'https://doi.org/10.1037/fam0000645', 'Journal of Family Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Neuroplasticity and adult change', '2021', 'https://doi.org/10.1038/s41593-021-00876-y', 'Nature Neuroscience', 6),
      (v_art_id, 'peer_reviewed', 1, 'Childhood climate and relationships', '2020', 'https://doi.org/10.1111/jomf.12689', 'Journal of Marriage and Family', 7),
      (v_art_id, 'peer_reviewed', 1, 'Earned secure attachment', '2021', 'https://doi.org/10.1016/j.cpr.2021.102098', 'Clinical Psychology Review', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-012 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-012';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The ACE Study', '1998', 'https://doi.org/10.1016/S0749-3797(98)00017-8', 'American Journal of Preventive Medicine', 1),
      (v_art_id, 'peer_reviewed', 1, 'ACEs and adult health outcomes', '2020', 'https://doi.org/10.1001/jama.2020.3517', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'ACEs prevalence update', '2021', 'https://doi.org/10.1001/jamapediatrics.2021.2320', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Toxic stress response', '2020', 'https://doi.org/10.1542/peds.2019-3928', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'ACEs and brain development', '2021', 'https://doi.org/10.1016/j.biopsych.2021.02.988', 'Biological Psychiatry', 5),
      (v_art_id, 'peer_reviewed', 1, 'Protective factors against ACEs', '2020', 'https://doi.org/10.1111/cdev.13399', NULL, 6),
      (v_art_id, 'government', 2, 'ACE-informed interventions', '2021', 'https://doi.org/10.2105/AJPH.2021.306235', 'American Journal of Public Health', 7),
      (v_art_id, 'peer_reviewed', 1, 'Resilience despite ACEs', '2020', 'https://doi.org/10.1016/j.cpr.2020.101891', 'Clinical Psychology Review', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-013 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-013';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Childhood emotional neglect definition', '2020', 'https://doi.org/10.1016/j.chiabu.2020.104392', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'CEN and adult emotional dysregulation', '2021', 'https://doi.org/10.1002/jclp.23189', 'Journal of Clinical Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Emotional invalidation effects', '2020', 'https://doi.org/10.1037/fam0000701', 'Journal of Family Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'CEN and relationship patterns', '2021', 'https://doi.org/10.1080/14616734.2021.1893843', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Alexithymia and CEN', '2020', 'https://doi.org/10.1037/emo0000689', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Recovering from CEN', '2021', 'https://doi.org/10.1037/pst0000378', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Emotion-focused therapy for CEN', '2020', 'https://doi.org/10.1037/ccp0000512', 'Journal of Consulting and Clinical Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Self-compassion interventions for CEN survivors', '2021', 'https://doi.org/10.1016/j.cpr.2021.102067', 'Clinical Psychology Review', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-014 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-014';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Parentification definition and types', '2020', 'https://doi.org/10.1111/famp.12523', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Emotional vs instrumental parentification', '2021', 'https://doi.org/10.1037/fam0000812', 'Journal of Family Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Parentification and adult outcomes', '2020', 'https://doi.org/10.1007/s10826-020-01723-5', 'Journal of Child and Family Studies', 3),
      (v_art_id, 'peer_reviewed', 1, 'Caretaker identity formation', '2021', 'https://doi.org/10.1017/S0954579421000523', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Parentification and codependency', '2020', 'https://doi.org/10.1002/jclp.23012', 'Journal of Clinical Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Recovery from parentification', '2021', 'https://doi.org/10.1037/pst0000401', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Parentification in immigrant families', '2020', 'https://doi.org/10.1037/cdp0000334', 'Cultural Diversity and Ethnic Minority Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Setting boundaries after parentification', '2021', 'https://doi.org/10.1111/fare.12534', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-015 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-015';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Children of addicted parents outcomes', '2021', 'https://doi.org/10.1111/add.15367', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'ACOA characteristics', '2020', 'https://doi.org/10.15288/jsad.2020.81.345', 'Journal of Studies on Alcohol and Drugs', 2),
      (v_art_id, 'peer_reviewed', 1, 'Family roles in addicted families', '2021', 'https://doi.org/10.1080/08897077.2021.1892686', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Unpredictability and childhood anxiety', '2020', 'https://doi.org/10.1017/S0954579420000456', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Intergenerational addiction transmission', '2021', 'https://doi.org/10.1001/jamapsychiatry.2021.0934', 'JAMA Psychiatry', 5),
      (v_art_id, 'peer_reviewed', 1, 'Al-Anon effectiveness', '2020', 'https://doi.org/10.1016/j.jsat.2020.108043', 'Journal of Substance Abuse Treatment', 6),
      (v_art_id, 'peer_reviewed', 1, 'Therapy for ACOAs', '2021', 'https://doi.org/10.1016/j.cpr.2021.102089', 'Clinical Psychology Review', 7),
      (v_art_id, 'peer_reviewed', 1, 'Breaking cycles of addiction', '2020', 'https://doi.org/10.1176/appi.ajp.2020.19121256', 'American Journal of Psychiatry', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-016 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-016';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Long-term outcomes of parental divorce', '2021', 'https://doi.org/10.1111/jomf.12745', 'Journal of Marriage and Family', 1),
      (v_art_id, 'peer_reviewed', 1, 'Divorce effects meta-analysis', '2020', 'https://doi.org/10.1037/bul0000256', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'High-conflict vs low-conflict divorce', '2021', 'https://doi.org/10.1111/cdev.13512', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Protective factors in divorce', '2020', 'https://doi.org/10.1111/famp.12567', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Divorce and adult relationships', '2021', 'https://doi.org/10.1037/fam0000823', 'Journal of Family Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Resilience after parental divorce', '2020', 'https://doi.org/10.1017/S0954579420000678', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Economic impact of divorce on children', '2021', 'https://doi.org/10.1215/00703370-9101056', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'When divorce improves outcomes', '2020', 'https://doi.org/10.1007/s10567-020-00321-8', 'Clinical Child and Family Psychology Review', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-017 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-017';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Overprotective parenting and anxiety', '2021', 'https://doi.org/10.1007/s10826-021-01945-6', 'Journal of Child and Family Studies', 1),
      (v_art_id, 'peer_reviewed', 1, 'Helicopter parenting outcomes', '2020', 'https://doi.org/10.1037/dev0000912', 'Developmental Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Risk-taking and development', '2021', 'https://doi.org/10.1111/cdev.13498', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Autonomy-supportive parenting', '2020', 'https://doi.org/10.1037/fam0000689', 'Journal of Family Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'College adjustment and parental control', '2021', 'https://doi.org/10.1016/j.adolescence.2021.03.012', 'Journal of Adolescence', 5),
      (v_art_id, 'peer_reviewed', 1, 'Self-efficacy development', '2020', 'https://doi.org/10.1007/s10964-020-01256-4', 'Journal of Youth and Adolescence', 6),
      (v_art_id, 'peer_reviewed', 1, 'Fear transmission parent to child', '2021', 'https://doi.org/10.1016/j.cpr.2021.102045', 'Clinical Psychology Review', 7),
      (v_art_id, 'peer_reviewed', 1, 'Finding balance in protective parenting', '2020', 'https://doi.org/10.1080/15295192.2020.1789123', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-018 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-018';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Long-term effects of bullying', '2021', 'https://doi.org/10.1001/jamapsychiatry.2021.0956', 'JAMA Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Bullying and adult mental health', '2020', 'https://doi.org/10.1017/S0033291720001488', 'Psychological Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'Types of bullying impact', '2021', 'https://doi.org/10.1111/cdev.13521', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Cyberbullying effects', '2020', 'https://doi.org/10.1089/cyber.2019.0685', 'Cyberpsychology, Behavior, and Social Networking', 4),
      (v_art_id, 'peer_reviewed', 1, 'Social anxiety after bullying', '2021', 'https://doi.org/10.1016/j.janxdis.2021.102389', 'Journal of Anxiety Disorders', 5),
      (v_art_id, 'peer_reviewed', 1, 'Healing from bullying trauma', '2020', 'https://doi.org/10.1037/pst0000312', NULL, 6),
      (v_art_id, 'government', 2, 'Bullying prevention programs', '2021', 'https://doi.org/10.1037/amp0000753', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Resilience factors against bullying', '2020', 'https://doi.org/10.1016/j.jsp.2020.06.003', 'Journal of School Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-019 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-019';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Inner child work in psychotherapy', '2021', 'https://doi.org/10.1037/pst0000389', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Childhood emotional needs', '2020', 'https://doi.org/10.1002/jclp.23067', 'Journal of Clinical Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Schema therapy and inner child', '2021', 'https://doi.org/10.1007/s10608-021-10212-5', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Internal Family Systems therapy', '2020', 'https://doi.org/10.1111/famp.12534', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Self-compassion and inner child', '2021', 'https://doi.org/10.1016/j.cpr.2021.102078', 'Clinical Psychology Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'Imagery rescripting techniques', '2020', 'https://doi.org/10.1016/j.jbtep.2020.101623', 'Journal of Behavior Therapy', 6),
      (v_art_id, 'peer_reviewed', 1, 'Developmental trauma treatment', '2021', 'https://doi.org/10.1177/1524838021102345', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Effectiveness of parts work', '2020', 'https://doi.org/10.1080/10503307.2020.1756729', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-020 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-020';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Self-reparenting in therapy', '2021', 'https://doi.org/10.1037/pst0000412', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Corrective emotional experiences', '2020', 'https://doi.org/10.1016/j.cpr.2020.101923', 'Clinical Psychology Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Self-compassion interventions', '2021', 'https://doi.org/10.1007/s12671-021-01623-9', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Internal dialogue modification', '2020', 'https://doi.org/10.1007/s10608-020-10156-y', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Healing attachment wounds', '2021', 'https://doi.org/10.1080/14616734.2021.1901295', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Self-care as self-parenting', '2020', 'https://doi.org/10.1177/1359105320912345', 'Journal of Health Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Boundary setting and reparenting', '2021', 'https://doi.org/10.1002/jclp.23201', 'Journal of Clinical Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Sustained change from reparenting work', '2020', 'https://doi.org/10.1080/10503307.2020.1789456', NULL, 8)
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
