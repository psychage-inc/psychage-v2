-- ============================================================================
-- Seed: Category 2 (Anxiety, Stress & Overwhelm) — Subcategory 08
-- 10 articles: CAT02-071 through CAT02-080
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert Category if not present
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  'Anxiety, Stress & Overwhelm',
  'anxiety-stress',
  '',
  'Brain',
  2,
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'anxiety-stress';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Anxiety In Relationships Work Daily Life', 'anxiety-in-relationships-work-daily-life', v_cat_id, 8)
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'anxiety-stress';
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'anxiety-in-relationships-work-daily-life' AND category_id = v_cat_id;

  -- CAT02-071: How Anxiety Affects Your Relationships (And What to Do About It)
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How Anxiety Affects Your Relationships (And What to Do About It)',
    'how-anxiety-affects-your-relationships-and-what-to-do-about-it',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Relationships', 'Communication', 'Attachment', 'Coping Skills'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-071',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover how anxiety impacts communication, trust, and connection in relationships, plus evidence-based strategies to break free from worry patterns.',
    '/images/articles/cat02/cover-071.svg',
    8,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-072: Anxious Attachment: When Fear of Abandonment Drives Your Behavior
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Anxious Attachment: When Fear of Abandonment Drives Your Behavior',
    'anxious-attachment-when-fear-of-abandonment-drives-your-behavior',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Attachment Theory', 'Relationships', 'Self-Worth', 'Childhood Patterns'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-072',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how anxious attachment develops, why it fuels relationship anxiety, and evidence-based strategies to build secure connection patterns.',
    '/images/articles/cat02/cover-072.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-073: Workplace Anxiety: Managing Fear in Meetings, Emails, and Deadlines
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Workplace Anxiety: Managing Fear in Meetings, Emails, and Deadlines',
    'workplace-anxiety-managing-fear-in-meetings-emails-and-deadlines',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Work Performance', 'Career', 'Stress Management', 'Communication'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-073',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Evidence-based strategies for managing anxiety in professional settings, from high-stakes presentations to daily email stress.',
    '/images/articles/cat02/cover-073.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-074: Parenting with Anxiety: How to Keep Your Worry from Becoming Their Worry
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Parenting with Anxiety: How to Keep Your Worry from Becoming Their Worry',
    'parenting-with-anxiety-how-to-keep-your-worry-from-becoming-their-worry',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Parenting', 'Family', 'Child Development', 'Intergenerational Patterns'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-074',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how parental anxiety affects children and evidence-based strategies to parent effectively while managing your own anxiety.',
    '/images/articles/cat02/cover-074.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-075: Anxiety and Intimacy: How Fear Shows Up in Your Closest Relationships
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Anxiety and Intimacy: How Fear Shows Up in Your Closest Relationships',
    'anxiety-and-intimacy-how-fear-shows-up-in-your-closest-relationships',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Intimacy', 'Relationships', 'Vulnerability', 'Sexual Health'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-075',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand how anxiety impacts emotional and physical intimacy, plus strategies to build deeper connection despite fear.',
    '/images/articles/cat02/cover-075.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-076: Morning Anxiety: Why You Wake Up Worried and How to Start Your Day Differently
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Morning Anxiety: Why You Wake Up Worried and How to Start Your Day Differently',
    'morning-anxiety-why-you-wake-up-worried-and-how-to-start-your-day-differently',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Sleep', 'Daily Routines', 'Cortisol', 'Morning Habits'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-076',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the science behind waking up anxious and discover evidence-based strategies to reclaim your mornings.',
    '/images/articles/cat02/cover-076.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-077: Anxiety and Procrastination: The Connection Most People Miss
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Anxiety and Procrastination: The Connection Most People Miss',
    'anxiety-and-procrastination-the-connection-most-people-miss',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Productivity', 'Perfectionism', 'Avoidance', 'Executive Function'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-077',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover how anxiety fuels procrastination (not laziness) and evidence-based strategies to break the cycle.',
    '/images/articles/cat02/cover-077.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-078: Travel Anxiety: How to Manage Fear of Flying, Driving, and New Places
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Travel Anxiety: How to Manage Fear of Flying, Driving, and New Places',
    'travel-anxiety-how-to-manage-fear-of-flying-driving-and-new-places',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Phobias', 'Travel', 'Exposure Therapy', 'Panic'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-078',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Evidence-based strategies for overcoming travel-related anxiety and reclaiming your freedom to explore.',
    '/images/articles/cat02/cover-078.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-079: How to Support a Partner with Anxiety Without Becoming Their Therapist
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How to Support a Partner with Anxiety Without Becoming Their Therapist',
    'how-to-support-a-partner-with-anxiety-without-becoming-their-therapist',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Relationships', 'Caregiving', 'Boundaries', 'Communication'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-079',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how to be a supportive partner while maintaining healthy boundaries and avoiding caregiver burnout.',
    '/images/articles/cat02/cover-079.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-080: Living Well with Anxiety: What Long-Term Management Really Looks Like
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Living Well with Anxiety: What Long-Term Management Really Looks Like',
    'living-well-with-anxiety-what-long-term-management-really-looks-like',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Recovery', 'Long-Term Management', 'Resilience', 'Acceptance'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-080',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A realistic guide to sustainable anxiety management, building resilience, and thriving—not just surviving—with anxiety.',
    '/images/articles/cat02/cover-080.svg',
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

  -- === CAT02-071 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-071';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The impact of anxiety disorders on romantic relationships: A meta-analytic review', '2020', 'https://doi.org/10.1016/j.janxdis.2020.102189', 'Journal of Anxiety Disorders', 1),
      (v_art_id, 'peer_reviewed', 1, 'Anxiety and relationship quality: The mediating role of communication patterns', '2019', 'https://doi.org/10.1016/j.cpr.2019.101738', 'Clinical Psychology Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Interpersonal effects of anxiety in couples: A systematic review', '2021', 'https://doi.org/10.1016/j.beth.2020.08.003', NULL, 3),
      (v_art_id, 'textbook', 5, 'The Anxiety and Phobia Workbook (7th edition)', '2020', 'https://www.newharbinger.com', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive-behavioral conjoint therapy for anxiety disorders: Effects on relationship functioning', '2018', 'https://doi.org/10.1037/ccp0000314', 'Journal of Consulting and Clinical Psychology', 5),
      (v_art_id, 'professional_org', 3, 'Understanding relationship anxiety and its impact on couples', '2022', 'https://www.apa.org/topics/anxiety/relationship', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Communication skills training for couples affected by anxiety: A randomized trial', '2021', 'https://doi.org/10.1111/jmft.12489', 'Journal of Marital and Family Therapy', 7),
      (v_art_id, 'peer_reviewed', 1, 'The role of reassurance-seeking in anxiety and relationships', '2020', 'https://doi.org/10.1177/2167702620912553', 'Clinical Psychology Science', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-072 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-072';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'textbook', 5, 'Attachment in Adulthood: Structure, Dynamics, and Change (2nd edition)', '2016', 'https://www.guilford.com', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Anxious attachment and relationship outcomes: A meta-analytic review', '2020', 'https://doi.org/10.1037/pspp0000277', 'Journal of Personality and Social Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Earned security: Pathways from insecure to secure attachment', '2021', 'https://doi.org/10.1017/S0954579420001467', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'The neuroscience of attachment: Brain activation patterns in anxious attachment', '2019', 'https://doi.org/10.1093/scan/nsz039', 'Social Cognitive and Affective Neuroscience', 4),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness-based interventions for insecure attachment: A systematic review', '2020', 'https://doi.org/10.1016/j.cpr.2020.101882', 'Clinical Psychology Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'Attachment styles and romantic relationship outcomes', '2019', 'https://doi.org/10.1016/j.copsyc.2018.12.009', 'Current Opinion in Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Emotion regulation strategies in anxiously attached individuals', '2020', 'https://doi.org/10.1037/emo0000708', NULL, 7),
      (v_art_id, 'professional_org', 3, 'Understanding attachment in clinical practice', '2021', 'https://www.apa.org/topics/attachment', NULL, 8),
      (v_art_id, 'peer_reviewed', 1, 'Schema therapy for attachment difficulties: A randomized controlled trial', '2021', 'https://doi.org/10.1037/ccp0000636', 'Journal of Consulting and Clinical Psychology', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-073 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-073';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Workplace anxiety prevalence and impact: A global meta-analysis', '2021', 'https://doi.org/10.1037/ocp0000289', 'Journal of Occupational Health Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive-behavioral interventions for workplace anxiety: Systematic review', '2020', 'https://doi.org/10.1080/02678373.2020.1743786', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'The relationship between workplace anxiety and job performance', '2019', 'https://doi.org/10.1016/j.jvb.2019.02.003', 'Journal of Vocational Behavior', 3),
      (v_art_id, 'government', 2, 'Managing workplace stress and anxiety', '2022', 'https://www.cdc.gov/niosh/topics/stress', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Email anxiety and communication patterns in remote work', '2021', 'https://doi.org/10.1016/j.chb.2021.106875', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Performance anxiety in workplace presentations: Evidence-based interventions', '2020', 'https://doi.org/10.1080/10615806.2020.1746283', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness-based stress reduction for working professionals', '2021', 'https://doi.org/10.1037/apl0000900', 'Journal of Applied Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Perfectionism and workplace anxiety: Breaking the cycle', '2020', 'https://doi.org/10.1037/cou0000432', 'Journal of Counseling Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-074 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-074';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Intergenerational transmission of anxiety: A systematic review and meta-analysis', '2020', 'https://doi.org/10.1016/j.cpr.2020.101834', 'Clinical Psychology Review', 1),
      (v_art_id, 'peer_reviewed', 1, 'Parental anxiety and child outcomes: Mechanisms and interventions', '2021', 'https://doi.org/10.1111/jcpp.13389', 'Journal of Child Psychology and Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'The impact of parental overprotection on child anxiety development', '2019', 'https://doi.org/10.1037/dev0000721', 'Developmental Psychology', 3),
      (v_art_id, 'professional_org', 3, 'Parenting with anxiety disorders: A clinical guide', '2022', 'https://www.aacap.org/AACAP/Families_and_Youth/Resource_Centers/Anxiety_Disorder_Resource_Center/Home.aspx', 'American Academy of Child & Adolescent Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Mindful parenting interventions for anxious parents: Randomized controlled trial', '2021', 'https://doi.org/10.1080/15374416.2021.1888741', 'Journal of Clinical Child & Adolescent Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Modeling emotion regulation: How parents teach children to manage anxiety', '2020', 'https://doi.org/10.1037/emo0000678', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Encouraging autonomy in children of anxious parents', '2020', 'https://doi.org/10.1111/cdep.12382', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Family-based cognitive-behavioral therapy for child and parent anxiety', '2021', 'https://doi.org/10.1016/j.jaac.2020.11.020', 'Journal of the American Academy of Child & Adolescent Psychiatry', 8),
      (v_art_id, 'professional_org', 3, 'Supporting children through parent anxiety: A guide for families', '2022', 'https://adaa.org/living-with-anxiety/children', NULL, 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-075 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-075';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Anxiety and intimate relationships: Quality, communication, and sexual satisfaction', '2020', 'https://doi.org/10.1007/s10508-020-01689-4', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'The impact of anxiety on emotional and physical intimacy', '2021', 'https://doi.org/10.1080/0092623X.2021.1888830', 'Journal of Sex & Marital Therapy', 2),
      (v_art_id, 'peer_reviewed', 1, 'Vulnerability and intimacy: Breaking through anxiety-driven barriers', '2019', 'https://doi.org/10.1177/0265407519850688', 'Journal of Social and Personal Relationships', 3),
      (v_art_id, 'peer_reviewed', 1, 'Performance anxiety and sexual function: Clinical perspectives', '2020', 'https://doi.org/10.1016/j.sxmr.2020.03.002', 'Sexual Medicine Reviews', 4),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness-based interventions for sexual anxiety and relationship intimacy', '2021', 'https://doi.org/10.1002/jclp.23147', 'Journal of Clinical Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Emotionally Focused Therapy for couples dealing with anxiety', '2020', 'https://doi.org/10.1111/jmft.12442', 'Journal of Marital and Family Therapy', 6),
      (v_art_id, 'peer_reviewed', 1, 'Understanding intimacy avoidance in anxiety disorders', '2019', 'https://doi.org/10.1016/j.cpr.2019.101750', 'Clinical Psychology Review', 7),
      (v_art_id, 'professional_org', 3, 'Sexual health and anxiety: A guide for individuals and couples', '2022', 'https://www.aasect.org', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-076 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-076';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The cortisol awakening response: Physiological mechanisms and anxiety disorders', '2020', 'https://doi.org/10.1016/j.psyneuen.2020.104698', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Morning anxiety prevalence and impact on daily functioning', '2021', 'https://doi.org/10.1016/j.jad.2021.03.045', 'Journal of Affective Disorders', 2),
      (v_art_id, 'peer_reviewed', 1, 'Sleep inertia and morning anxiety: Neurobiological mechanisms', '2020', 'https://doi.org/10.1016/j.smrv.2020.101307', 'Sleep Medicine Reviews', 3),
      (v_art_id, 'peer_reviewed', 1, 'Morning routines and anxiety reduction: A behavioral intervention study', '2021', 'https://doi.org/10.1016/j.beth.2021.02.003', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Light exposure and circadian rhythms in anxiety disorders', '2020', 'https://doi.org/10.5664/jcsm.8414', 'Journal of Clinical Sleep Medicine', 5),
      (v_art_id, 'professional_org', 3, 'Understanding and managing morning anxiety', '2022', 'https://adaa.org/understanding-anxiety/morning-anxiety', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness-based morning practices for anxiety: Clinical trial', '2021', 'https://doi.org/10.1007/s12671-021-01623-4', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Blood sugar, anxiety, and the overnight fast: Metabolic connections', '2020', 'https://doi.org/10.3390/nu12051325', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-077 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-077';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The anxiety-procrastination cycle: A meta-analytic review', '2020', 'https://doi.org/10.1016/j.cpr.2020.101871', 'Clinical Psychology Review', 1),
      (v_art_id, 'peer_reviewed', 1, 'Procrastination as emotion regulation: Anxiety avoidance mechanisms', '2021', 'https://doi.org/10.1016/j.paid.2021.110855', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Perfectionism, fear of failure, and procrastination in anxious individuals', '2020', 'https://doi.org/10.1007/s10942-020-00351-8', 'Journal of Rational-Emotive & Cognitive-Behavior Therapy', 3),
      (v_art_id, 'peer_reviewed', 1, 'Breaking the procrastination-anxiety loop: Behavioral interventions', '2021', 'https://doi.org/10.1016/j.brat.2021.103890', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Self-compassion interventions for procrastination and anxiety', '2020', 'https://doi.org/10.1007/s12671-020-01432-1', NULL, 5),
      (v_art_id, 'professional_org', 3, 'Understanding and overcoming procrastination', '2022', 'https://www.apa.org/topics/procrastination', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Implementation intentions and anxiety-driven procrastination', '2020', 'https://doi.org/10.1016/j.jesp.2020.103991', 'Journal of Experimental Social Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'The role of task-specific anxiety in academic procrastination', '2021', 'https://doi.org/10.1016/j.lindif.2021.102021', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-078 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-078';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Travel anxiety and specific phobias: Prevalence and impact', '2021', 'https://doi.org/10.1093/jtm/taab042', 'Journal of Travel Medicine', 1),
      (v_art_id, 'peer_reviewed', 1, 'Fear of flying: Cognitive-behavioral treatment outcomes', '2020', 'https://doi.org/10.1027/2192-0923/a000183', 'Aviation Psychology and Applied Human Factors', 2),
      (v_art_id, 'peer_reviewed', 1, 'Virtual reality exposure therapy for travel-related phobias', '2021', 'https://doi.org/10.1089/cyber.2020.0477', 'Cyberpsychology, Behavior, and Social Networking', 3),
      (v_art_id, 'peer_reviewed', 1, 'Interoceptive exposure for panic during travel', '2020', 'https://doi.org/10.1016/j.beth.2019.12.006', NULL, 4),
      (v_art_id, 'professional_org', 3, 'Managing travel anxiety: A clinical guide', '2022', 'https://adaa.org/understanding-anxiety/specific-phobias/travel-anxiety', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Safety behaviors in travel anxiety: Maintenance mechanisms', '2020', 'https://doi.org/10.1016/j.brat.2020.103673', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Agoraphobia and travel avoidance: Treatment approaches', '2021', 'https://doi.org/10.1016/j.cpr.2021.102045', 'Clinical Psychology Review', 7),
      (v_art_id, 'peer_reviewed', 1, 'Turbulence, control, and fear of flying: Psychological mechanisms', '2020', 'https://doi.org/10.1016/j.janxdis.2020.102258', 'Journal of Anxiety Disorders', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-079 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-079';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Partner accommodation in anxiety disorders: Impact on relationship quality', '2020', 'https://doi.org/10.1037/fam0000687', 'Journal of Family Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Supporting a partner with anxiety: Evidence-based communication strategies', '2021', 'https://doi.org/10.1037/cfp0000160', 'Couple and Family Psychology: Research and Practice', 2),
      (v_art_id, 'peer_reviewed', 1, 'Caregiver burden in partners of individuals with anxiety disorders', '2020', 'https://doi.org/10.1016/j.cpr.2020.101856', 'Clinical Psychology Review', 3),
      (v_art_id, 'professional_org', 3, 'Reducing accommodation: A guide for partners and families', '2022', 'https://adaa.org/living-with-anxiety/helping-others', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Emotional regulation and co-regulation in romantic relationships', '2020', 'https://doi.org/10.1037/emo0000654', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Couples therapy for anxiety: Integration with individual treatment', '2021', 'https://doi.org/10.1111/jmft.12498', 'Journal of Marital and Family Therapy', 6),
      (v_art_id, 'peer_reviewed', 1, 'Validation without enabling: Supporting anxious partners effectively', '2020', 'https://doi.org/10.1016/j.beth.2020.04.012', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Compassion fatigue in partners of individuals with mental health conditions', '2021', 'https://doi.org/10.1002/jclp.23189', 'Journal of Clinical Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-080 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-080';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Long-term outcomes in anxiety disorder treatment: A 10-year follow-up study', '2021', 'https://doi.org/10.4088/JCP.20m13654', 'Journal of Clinical Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Recovery from anxiety disorders: Redefining outcomes beyond symptom reduction', '2020', 'https://doi.org/10.1016/j.cpr.2020.101890', 'Clinical Psychology Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Psychological flexibility and anxiety: ACT-based long-term management', '2021', 'https://doi.org/10.1016/j.jcbs.2021.03.005', 'Journal of Contextual Behavioral Science', 3),
      (v_art_id, 'peer_reviewed', 1, 'Relapse prevention in anxiety disorders: Maintenance strategies', '2020', 'https://doi.org/10.1016/j.brat.2020.103698', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Building resilience in individuals with chronic anxiety', '2021', 'https://doi.org/10.1037/amp0000766', NULL, 5),
      (v_art_id, 'professional_org', 3, 'Living well with anxiety: A recovery-oriented approach', '2022', 'https://www.nami.org/About-Mental-Illness/Mental-Health-Conditions/Anxiety-Disorders', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Self-compassion and long-term anxiety management', '2020', 'https://doi.org/10.1007/s12671-020-01388-2', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Values-based living and anxiety recovery: A longitudinal study', '2021', 'https://doi.org/10.1016/j.janxdis.2021.102412', 'Journal of Anxiety Disorders', 8),
      (v_art_id, 'peer_reviewed', 1, 'Post-traumatic growth and anxiety disorders', '2020', 'https://doi.org/10.1037/tra0000857', NULL, 9)
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
  WHERE a.article_production_id LIKE 'CAT02-%';

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;
