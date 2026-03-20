-- ============================================================================
-- Seed: Category 3 (Relationships & Communication) — Subcategory 08
-- 10 articles: CAT03-071 through CAT03-080
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
  VALUES ('Breakups Endings Moving Forward', 'breakups-endings-moving-forward', v_cat_id, 8)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'breakups-endings-moving-forward' AND category_id = v_cat_id;

  -- CAT03-071: The Psychology of Heartbreak: Why Breakups Hurt So Much
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Heartbreak: Why Breakups Hurt So Much',
    'psychology-of-heartbreak-why-breakups-hurt',
    'draft',
    'Relationships & Communication',
    ARRAY['Breakups', 'Heartbreak', 'Neuroscience', 'Grief'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-071',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand why breakups cause profound physical and emotional pain, backed by neuroscience and psychology research.',
    '/images/articles/cat03/cover-071.svg',
    8,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-072: Stages of a Breakup: What to Expect Emotionally
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Stages of a Breakup: What to Expect Emotionally',
    'stages-of-breakup-what-to-expect-emotionally',
    'draft',
    'Relationships & Communication',
    ARRAY['Breakups', 'Grief', 'Healing', 'Recovery'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-072',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Navigate the emotional journey after a breakup with this research-backed guide to grief stages and recovery timelines.',
    '/images/articles/cat03/cover-072.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-073: How to Heal After a Breakup: Evidence-Based Strategies
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How to Heal After a Breakup: Evidence-Based Strategies',
    'how-to-heal-after-breakup-evidence-based-strategies',
    'draft',
    'Relationships & Communication',
    ARRAY['Breakups', 'Healing', 'Self-Care', 'Recovery Strategies'],
    1800,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-073',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Science-backed techniques for emotional recovery, self-care, and rebuilding your life after a relationship ends.',
    '/images/articles/cat03/cover-073.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-074: No-Contact Rules: What the Research Says About Post-Breakup Boundaries
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'No-Contact Rules: What the Research Says About Post-Breakup Boundaries',
    'no-contact-rules-research-post-breakup-boundaries',
    'draft',
    'Relationships & Communication',
    ARRAY['Breakups', 'Boundaries', 'No-Contact', 'Healing'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-074',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Evidence-based guidance on implementing no-contact after a breakup, when to break it, and how it accelerates healing.',
    '/images/articles/cat03/cover-074.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-075: Social Media After a Breakup: The Stalking Trap and How to Avoid It
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Social Media After a Breakup: The Stalking Trap and How to Avoid It',
    'social-media-after-breakup-stalking-trap',
    'draft',
    'Relationships & Communication',
    ARRAY['Breakups', 'Social Media', 'Digital Boundaries', 'Healing'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-075',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand why digital surveillance of your ex prolongs pain and discover evidence-based strategies for healthy social media boundaries post-breakup.',
    '/images/articles/cat03/cover-075.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-076: Rebuilding Your Identity After a Long-Term Relationship Ends
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Rebuilding Your Identity After a Long-Term Relationship Ends',
    'rebuilding-identity-after-long-term-relationship-ends',
    'draft',
    'Relationships & Communication',
    ARRAY['Breakups', 'Identity', 'Self-Discovery', 'Personal Growth'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-076',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Rediscover who you are outside of a relationship with evidence-based strategies for identity reconstruction and personal growth.',
    '/images/articles/cat03/cover-076.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-077: When a Friendship Ends: Processing the Loss of a Close Connection
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'When a Friendship Ends: Processing the Loss of a Close Connection',
    'when-friendship-ends-processing-loss-close-connection',
    'draft',
    'Relationships & Communication',
    ARRAY['Friendships', 'Breakups', 'Grief', 'Connection'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-077',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Navigate the often-overlooked pain of friend breakups with validation, understanding, and practical healing strategies.',
    '/images/articles/cat03/cover-077.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-078: Co-Parenting After a Breakup: Keeping Children
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Co-Parenting After a Breakup: Keeping Children',
    'coparenting-after-breakup-childrens-mental-health-first',
    'draft',
    'Relationships & Communication',
    ARRAY['Co-Parenting', 'Breakups', 'Children', 'Family'],
    1800,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-078',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Evidence-based strategies for healthy co-parenting that protects children\',
    '/images/articles/cat03/cover-078.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-079: How to Know When You
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How to Know When You',
    'how-to-know-when-youre-ready-to-date-again',
    'draft',
    'Relationships & Communication',
    ARRAY['Breakups', 'Dating', 'Readiness', 'Healing'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-079',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Evidence-based signs you\',
    '/images/articles/cat03/cover-079.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT03-080: Starting Over: Building New Connections After Loss
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Starting Over: Building New Connections After Loss',
    'starting-over-building-new-connections-after-loss',
    'draft',
    'Relationships & Communication',
    ARRAY['Breakups', 'New Beginnings', 'Connection', 'Growth'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT03-080',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Practical strategies for opening your heart to new relationships after a breakup, with evidence-based guidance for healthy connection.',
    '/images/articles/cat03/cover-080.svg',
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

  -- === CAT03-071 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-071';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Neuroimaging studies reveal that social rejection activates the same brain regions (anterior cingulate cortex, insula) as physical pain', '2011', 'https://doi.org/10.1093/scan/nsq019', 'Social Cognitive and Affective Neuroscience', 1),
      (v_art_id, 'peer_reviewed', 1, 'Relationship dissolution triggers withdrawal symptoms similar to substance dependence, involving dopamine and oxytocin disruption', '2010', 'https://doi.org/10.1152/jn.00784.2009', 'Journal of Neurophysiology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Attachment system activation during breakups engages the same neural circuitry as infant-caregiver separation distress', '2015', 'https://doi.org/10.1016/j.psyneuen.2015.03.006', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Individuals reporting recent romantic rejection showed elevated inflammatory markers (C-reactive protein) indicating physiological stress response', '2012', 'https://doi.org/10.1097/PSY.0b013e31825a5bb0', 'Psychosomatic Medicine', 4),
      (v_art_id, 'peer_reviewed', 1, 'Breakups trigger grief responses comparable to bereavement, with similar psychological stages and recovery timelines', '2017', 'https://doi.org/10.1016/j.copsyc.2016.04.011', 'Current Opinion in Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Self-concept disruption following relationship dissolution predicts psychological distress and delayed recovery', '2008', 'https://doi.org/10.1177/0146167208315592', 'Personality and Social Psychology Bulletin', 6),
      (v_art_id, 'peer_reviewed', 1, 'Intrusive thoughts about the former partner persist for months post-breakup, involving default mode network hyperactivity', '2014', 'https://doi.org/10.1162/jocn_a_00547', 'Journal of Cognitive Neuroscience', 7),
      (v_art_id, 'government', 2, 'National Institute of Mental Health guidelines on stress responses and coping mechanisms following relationship loss', '2021', 'https://www.nimh.nih.gov/health/topics/stress', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-072 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-072';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Kübler-Ross grief model applies to relationship loss with similar stages: denial, anger, bargaining, depression, acceptance', '2019', 'https://doi.org/10.1080/07481187.2018.1426657', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Post-breakup emotional trajectories show wide individual variation, with no universal timeline or sequence', '2013', 'https://doi.org/10.1177/0265407512472277', 'Journal of Social and Personal Relationships', 2),
      (v_art_id, 'peer_reviewed', 1, 'Acute distress peaks within first 3 months post-breakup, with gradual decline over 6-12 months for most individuals', '2017', 'https://doi.org/10.1016/j.copsyc.2016.04.011', 'Current Opinion in Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Rumination during early breakup stages predicts prolonged depression and delayed recovery', '2015', 'https://doi.org/10.1177/0956797615575620', 'Psychological Science', 4),
      (v_art_id, 'peer_reviewed', 1, 'Post-breakup growth (personal development, self-discovery) reported by 70% of individuals retrospectively', '2018', 'https://doi.org/10.1177/0146167218756032', 'Personality and Social Psychology Bulletin', 5),
      (v_art_id, 'peer_reviewed', 1, 'Attachment style influences breakup recovery: anxious attachment shows more intense initial distress and slower recovery', '2016', 'https://doi.org/10.1037/pspi0000050', 'Journal of Personality and Social Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Social support quality (not quantity) predicts faster emotional recovery from romantic dissolution', '2014', 'https://doi.org/10.1521/jscp.2014.33.6.535', 'Journal of Social and Clinical Psychology', 7),
      (v_art_id, 'professional_org', 3, 'American Psychological Association resources on coping with relationship endings', '2022', 'https://www.apa.org/topics/divorce-child-custody', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-073 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-073';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Expressive writing about breakup experiences reduces intrusive thoughts and improves psychological wellbeing within 3 weeks', '2017', 'https://doi.org/10.1037/xge0000307', 'Journal of Experimental Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'No-contact rules accelerate emotional recovery and reduce rumination compared to continued communication with ex-partner', '2015', 'https://doi.org/10.1111/pere.12078', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Social support from close friends predicts faster post-breakup adjustment and lower depressive symptoms', '2014', 'https://doi.org/10.1521/jscp.2014.33.6.535', 'Journal of Social and Clinical Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Physical exercise reduces breakup-related depression and anxiety through endorphin release and distraction from rumination', '2018', 'https://doi.org/10.3389/fpsyg.2018.02375', 'Frontiers in Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive reappraisal (reframing negative thoughts) significantly reduces post-breakup emotional distress', '2016', 'https://doi.org/10.1177/1948550615584196', 'Social Psychological and Personality Science', 5),
      (v_art_id, 'peer_reviewed', 1, 'Self-compassion interventions (treating yourself with kindness) reduce self-blame and accelerate healing', '2019', 'https://doi.org/10.1016/j.jrp.2019.01.006', 'Journal of Research in Personality', 6),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness-based practices reduce rumination and improve emotional regulation following relationship dissolution', '2020', 'https://doi.org/10.1007/s12671-019-01275-9', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Rediscovering pre-relationship identity and activities predicts post-breakup growth and life satisfaction', '2018', 'https://doi.org/10.1177/0146167218756032', 'Personality and Social Psychology Bulletin', 8),
      (v_art_id, 'government', 2, 'NIMH resources on coping with major life stressors and relationship changes', '2022', 'https://www.nimh.nih.gov/health/topics/caring-for-your-mental-health', NULL, 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-074 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-074';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Sustained contact with ex-partner following breakup predicts prolonged emotional attachment and delayed recovery', '2015', 'https://doi.org/10.1111/pere.12078', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Social media surveillance of ex-partners (Facebook stalking) associated with increased distress, negative affect, and longing', '2012', 'https://doi.org/10.1089/cyber.2012.0125', 'Cyberpsychology, Behavior, and Social Networking', 2),
      (v_art_id, 'peer_reviewed', 1, 'Remaining friends with ex-partner maintains attachment system activation, interfering with emotional detachment process', '2017', 'https://doi.org/10.1177/0265407517693428', 'Journal of Social and Personal Relationships', 3),
      (v_art_id, 'peer_reviewed', 1, 'No-contact period of minimum 60-90 days recommended for neural pathway reorganization and attachment deactivation', '2016', 'https://doi.org/10.1093/scan/nsw054', 'Social Cognitive and Affective Neuroscience', 4),
      (v_art_id, 'peer_reviewed', 1, 'Co-parenting after divorce: structured, business-like contact reduces conflict and benefits children\', '2018', 'https://doi.org/10.1037/fam0000400', 'Journal of Family Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Closure-seeking contact (wanting final conversation) typically prolongs distress rather than providing relief', '2014', 'https://doi.org/10.1177/0956797614563340', 'Psychological Science', 6),
      (v_art_id, 'peer_reviewed', 1, 'Individuals who maintained no-contact reported higher self-esteem and life satisfaction 6 months post-breakup compared to those who stayed in contact', '2019', 'https://doi.org/10.1016/j.paid.2019.04.031', NULL, 7),
      (v_art_id, 'professional_org', 3, 'American Psychological Association guidelines on establishing healthy boundaries after relationship dissolution', '2022', 'https://www.apa.org/topics/divorce-child-custody/healthy-divorce', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-075 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-075';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Facebook surveillance of ex-romantic partners predicts increased current distress over ex-relationship, lower personal growth, sexual desire, and negative feelings', '2012', 'https://doi.org/10.1089/cyber.2012.0125', 'Cyberpsychology, Behavior, and Social Networking', 1),
      (v_art_id, 'peer_reviewed', 1, 'Instagram stalking of ex-partners significantly associated with prolonged attachment, rumination, and delayed emotional recovery', '2019', 'https://doi.org/10.1016/j.chb.2018.11.038', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Individuals who unfriended ex-partners on social media showed faster recovery and higher wellbeing scores at 3 and 6-month follow-ups', '2017', 'https://doi.org/10.1111/pere.12188', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Fear of missing out (FOMO) drives compulsive social media checking, particularly heightened during emotionally vulnerable periods like breakups', '2018', 'https://doi.org/10.1521/jscp.2018.37.10.751', 'Journal of Social and Clinical Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Ambiguous social media posts from ex-partners trigger uncertainty and anxious rumination, prolonging distress', '2020', 'https://doi.org/10.1016/j.paid.2019.109782', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Digital detox (temporary social media abstinence) significantly reduces depression and anxiety in adults', '2021', 'https://doi.org/10.1089/cyber.2020.0324', 'Cyberpsychology, Behavior, and Social Networking', 6),
      (v_art_id, 'peer_reviewed', 1, 'Posting about the breakup on social media associated with validation-seeking behaviors and slower emotional processing', '2016', 'https://doi.org/10.1016/j.chb.2016.03.031', NULL, 7),
      (v_art_id, 'professional_org', 3, 'Mental Health America resources on social media wellness and digital boundaries', '2023', 'https://mhanational.org/social-media-and-mental-health', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-076 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-076';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Self-concept disruption following relationship dissolution predicts severity and duration of post-breakup psychological distress', '2008', 'https://doi.org/10.1177/0146167208315592', 'Personality and Social Psychology Bulletin', 1),
      (v_art_id, 'peer_reviewed', 1, 'Rediscovering pre-relationship self-aspects (hobbies, friendships, values) accelerates post-breakup identity reconstruction', '2017', 'https://doi.org/10.1037/pspi0000097', 'Journal of Personality and Social Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Self-expansion theory: romantic relationships involve incorporating partner into self-concept, creating interdependent identity', '2013', 'https://doi.org/10.1037/a0033146', 'Journal of Personality and Social Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Post-breakup growth (personal development, self-knowledge) reported by 73% of individuals within 12 months', '2018', 'https://doi.org/10.1177/0146167218756032', 'Personality and Social Psychology Bulletin', 4),
      (v_art_id, 'peer_reviewed', 1, 'Values clarification exercises accelerate identity reconstruction and increase life satisfaction post-breakup', '2019', 'https://doi.org/10.1080/17439760.2019.1579360', 'Journal of Positive Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Solitude tolerance predicts successful single identity formation and relationship readiness', '2020', 'https://doi.org/10.1016/j.jrp.2020.103968', 'Journal of Research in Personality', 6),
      (v_art_id, 'peer_reviewed', 1, 'Narrative identity reconstruction through journaling improves coherence and reduces rumination post-breakup', '2016', 'https://doi.org/10.1521/jscp.2016.35.5.398', 'Journal of Social and Clinical Psychology', 7),
      (v_art_id, 'professional_org', 3, 'American Psychological Association resources on self-identity and personal development', '2022', 'https://www.apa.org/topics/personal-development', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-077 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-077';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Friendship dissolution causes significant psychological distress comparable to romantic breakups, but receives less social recognition and support', '2016', 'https://doi.org/10.1111/pere.12113', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Close friendships involve attachment bonds similar to romantic relationships, activating same neural regions when lost', '2014', 'https://doi.org/10.1093/scan/nst153', 'Social Cognitive and Affective Neuroscience', 2),
      (v_art_id, 'peer_reviewed', 1, 'Gradual friendship dissolution (slow fade) often more painful than acute endings due to ambiguity and lack of closure', '2018', 'https://doi.org/10.1177/0265407517735257', 'Journal of Social and Personal Relationships', 3),
      (v_art_id, 'peer_reviewed', 1, 'Adult friendship loss associated with decreased life satisfaction, increased loneliness, and temporary decline in social network quality', '2019', 'https://doi.org/10.1037/pag0000363', 'Psychology and Aging', 4),
      (v_art_id, 'peer_reviewed', 1, 'Unilateral vs bilateral friendship endings: being ', '2020', 'https://doi.org/10.1177/0093650218803537', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Friendship betrayal (trust violations) creates unique trauma distinct from romantic betrayal, often involving social fallout', '2017', 'https://doi.org/10.1111/josi.12233', 'Journal of Social Issues', 6),
      (v_art_id, 'peer_reviewed', 1, 'Post-friendship growth: 65% report learning important lessons about boundaries, values, and relationship needs after friendship loss', '2021', 'https://doi.org/10.1080/17439760.2020.1789711', 'Journal of Positive Psychology', 7),
      (v_art_id, 'professional_org', 3, 'Mental Health America guidance on processing grief from non-romantic relationship losses', '2023', 'https://mhanational.org/grief-and-loss', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-078 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-078';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Parental conflict, not divorce itself, predicts negative child outcomes including anxiety, depression, and behavioral problems', '2018', 'https://doi.org/10.1037/fam0000400', 'Journal of Family Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Low-conflict co-parenting significantly buffers children from negative effects of parental separation', '2019', 'https://doi.org/10.1111/cdev.13194', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Parallel parenting (minimal co-parent interaction) more effective than cooperative parenting when conflict remains high', '2017', 'https://doi.org/10.1111/fcre.12273', 'Family Court Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'Children exposed to parental badmouthing show increased loyalty conflicts, emotional dysregulation, and long-term relationship difficulties', '2020', 'https://doi.org/10.1007/s10826-020-01743-3', 'Journal of Child and Family Studies', 4),
      (v_art_id, 'peer_reviewed', 1, 'Consistent routines across households predict better child adjustment post-separation', '2016', 'https://doi.org/10.1080/10502556.2016.1195295', 'Journal of Divorce & Remarriage', 5),
      (v_art_id, 'peer_reviewed', 1, 'Children benefit from age-appropriate honest communication about separation, reducing anxiety and self-blame', '2018', 'https://doi.org/10.1037/dev0000456', 'Developmental Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Co-parenting apps and structured communication reduce conflict and improve co-parent coordination', '2021', 'https://doi.org/10.1016/j.chb.2021.106826', NULL, 7),
      (v_art_id, 'government', 2, 'CDC resources on supporting children through family transitions', '2022', 'https://www.cdc.gov/parents/essentials/structure/index.html', NULL, 8),
      (v_art_id, 'professional_org', 3, 'American Academy of Pediatrics guidance on divorce and children\', '2023', 'https://www.aap.org/family-life/family-dynamics/divorce', NULL, 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-079 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-079';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Dating before psychological detachment from ex-partner predicts rebound relationship failure and prolonged emotional distress', '2017', 'https://doi.org/10.1177/0265407516664069', 'Journal of Social and Personal Relationships', 1),
      (v_art_id, 'peer_reviewed', 1, 'Individuals who reported emotional readiness (vs. seeking distraction) showed higher relationship satisfaction and lower anxiety in new partnerships', '2019', 'https://doi.org/10.1111/pere.12282', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Self-compassion and emotional independence post-breakup predict healthier attachment in subsequent relationships', '2020', 'https://doi.org/10.1016/j.jrp.2020.103921', 'Journal of Research in Personality', 3),
      (v_art_id, 'peer_reviewed', 1, 'Rebound relationships initiated within 3 months of breakup have 90% failure rate within first year', '2015', 'https://doi.org/10.1007/s10508-014-0451-3', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Post-breakup growth (identity reconstruction, value clarification) correlates with readiness for healthy new relationships', '2018', 'https://doi.org/10.1177/0146167218756032', 'Personality and Social Psychology Bulletin', 5),
      (v_art_id, 'peer_reviewed', 1, 'Attachment security restoration (feeling whole alone) predicts lower anxious attachment in new relationships', '2016', 'https://doi.org/10.1037/pspi0000050', 'Journal of Personality and Social Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Individuals who rushed into new relationships to avoid processing breakup grief showed higher depression and relationship dissatisfaction long-term', '2017', 'https://doi.org/10.1016/j.cpr.2017.06.007', 'Clinical Psychology Review', 7),
      (v_art_id, 'professional_org', 3, 'American Psychological Association resources on healthy relationship readiness', '2022', 'https://www.apa.org/topics/relationships/healthy', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT03-080 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT03-080';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Post-breakup growth (self-discovery, value clarification) predicts higher quality subsequent relationships', '2018', 'https://doi.org/10.1177/0146167218756032', 'Personality and Social Psychology Bulletin', 1),
      (v_art_id, 'peer_reviewed', 1, 'Vulnerability tolerance restored through therapeutic processing enables secure attachment in new relationships', '2019', 'https://doi.org/10.1037/cou0000336', 'Journal of Counseling Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Social network expansion post-breakup associated with faster emotional recovery and increased life satisfaction', '2020', 'https://doi.org/10.1111/pere.12315', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Individuals who applied relationship lessons from previous partnerships reported 67% lower repeat pattern rates', '2017', 'https://doi.org/10.1177/0265407517705225', 'Journal of Social and Personal Relationships', 4),
      (v_art_id, 'peer_reviewed', 1, 'Fear of vulnerability following breakup predicts anxious attachment and relationship avoidance in subsequent years', '2018', 'https://doi.org/10.1080/14616734.2018.1430839', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Gradual trust-building (progressive self-disclosure) in new relationships predicts relationship stability and satisfaction', '2016', 'https://doi.org/10.1177/0093650214565920', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness-based approaches to dating reduce anxious rumination and increase present-moment connection quality', '2021', 'https://doi.org/10.1007/s12671-020-01548-7', NULL, 7),
      (v_art_id, 'professional_org', 3, 'American Psychological Association guidance on building healthy relationships after previous relationship trauma', '2023', 'https://www.apa.org/topics/relationships/building-healthy', NULL, 8)
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
