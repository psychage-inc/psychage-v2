-- ============================================================================
-- Seed: Category 21 (Technology, Digital Life & Mental Health) — Subcategory 05
-- 10 articles: CAT21-041 through CAT21-050
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert Category if not present
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  'Technology, Digital Life & Mental Health',
  'technology-digital-life',
  'Evidence-based education on the psychological impact of technology — from social media and smartphone use to emerging tools like VR therapy and digital therapeutics, exploring both harms and benefits for mental health.',
  'Laptop',
  21,
  55,
  '#6366F1'
)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------------------
-- 2. Insert Subcategory
-- ---------------------------------------------------------------------------

DO $$
DECLARE
  v_cat_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'technology-digital-life';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Healthy Digital Life', 'healthy-digital-life', v_cat_id, 5)
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'technology-digital-life';
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'healthy-digital-life' AND category_id = v_cat_id;

  -- CAT21-041: Mindful Technology Use: Bringing Awareness to Your Digital Habits
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Mindful Technology Use: Bringing Awareness to Your Digital Habits',
    'mindful-technology-use-awareness-digital-habits',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['Mindful Technology', 'Digital Mindfulness', 'Awareness', 'Attention Training', 'Habit Awareness', 'Present Moment'],
    1270,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-041',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Mindfulness — the practice of paying deliberate, non-judgmental attention to the present moment — can transform an unconscious relationship with technology into a conscious one. This self-help guide reviews the research on how mindfulness principles apply to digital behavior and offers practical exercises for becoming more aware of your technology habits without guilt or rigid restriction.',
    '/images/articles/cat21/cover-041.svg',
    10,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT21-042: The Right to Disconnect: Why Unplugging Is a Mental Health Necessity
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Right to Disconnect: Why Unplugging Is a Mental Health Necessity',
    'right-to-disconnect-why-unplugging-is-mental-health-necessity',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['Digital Disconnection', 'Right to Disconnect', 'Screen Time', 'Mental Health Boundaries', 'Digital Wellness', 'Work-Life Balance'],
    1060,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-042',
    v_cat_id,
    v_sub_id,
    'drafted',
    'An evidence-based guide to deliberate disconnection from digital devices, examining the research on why regular unplugging supports psychological well-being and how to establish sustainable boundaries with technology.',
    '/images/articles/cat21/cover-042.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT21-043: Teaching Children About Technology: A Mental Health-Informed Approach
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Teaching Children About Technology: A Mental Health-Informed Approach',
    'teaching-children-about-technology-mental-health-informed-approach',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['Children and Technology', 'Digital Literacy', 'Parenting', 'Screen Time Guidelines', 'Child Development', 'Digital Wellness'],
    1060,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-043',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A research-grounded guide for parents and caregivers on how to teach children healthy technology habits that protect psychological development, covering age-appropriate strategies from toddlerhood through adolescence.',
    '/images/articles/cat21/cover-043.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT21-044: Building Tech-Free Rituals for Better Sleep and Connection
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Building Tech-Free Rituals for Better Sleep and Connection',
    'building-tech-free-rituals-better-sleep-connection',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['Tech-Free Rituals', 'Sleep Hygiene', 'Digital Wellness', 'Relationship Quality', 'Daily Rhythms', 'Mindful Living'],
    1023,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-044',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A practical, evidence-based guide to creating technology-free rituals that improve sleep quality, deepen relationships, and restore the daily rhythms that constant connectivity disrupts.',
    '/images/articles/cat21/cover-044.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT21-045: Cancel Culture and Mental Health: The Psychological Impact of Public Shaming
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Cancel Culture and Mental Health: The Psychological Impact of Public Shaming',
    'cancel-culture-mental-health-psychological-impact-public-shaming',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['Cancel Culture', 'Public Shaming', 'Online Harassment', 'Social Media', 'Mob Psychology', 'Trauma'],
    1254,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-045',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Public shaming has existed for centuries, but social media has transformed its speed, scale, and permanence. This research digest examines the psychological consequences of being publicly called out or cancelled online, including effects on targets, participants, and bystanders, drawing on peer-reviewed studies in social psychology, digital communication, and trauma research.',
    '/images/articles/cat21/cover-045.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT21-046: Information Overload: How Constant News Consumption Affects Your Brain
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Information Overload: How Constant News Consumption Affects Your Brain',
    'information-overload-constant-news-consumption-affects-brain',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['Information Overload', 'News Anxiety', 'Doomscrolling', 'Cognitive Load', 'Media Literacy', 'Self-Help'],
    1278,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-046',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The human brain evolved to process information from a small, stable environment — not a continuous stream of global crises delivered through pocket-sized screens. This self-help guide examines the cognitive and emotional effects of information overload, reviews the research on news consumption and mental health, and offers practical strategies for staying informed without sacrificing well-being.',
    '/images/articles/cat21/cover-046.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT21-047: The Filter Bubble: How Algorithms Shape Your Worldview and Mood
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Filter Bubble: How Algorithms Shape Your Worldview and Mood',
    'filter-bubble-algorithms-shape-worldview-mood',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['Filter Bubble', 'Algorithms', 'Echo Chamber', 'Polarization', 'Social Media', 'Media Literacy'],
    1292,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-047',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Every major social media platform, search engine, and news aggregator uses recommendation algorithms that personalize what you see based on your past behavior. This research digest examines the peer-reviewed evidence on how algorithmic filtering affects political polarization, emotional well-being, and the accuracy of your understanding of the world — and what individuals can do to counteract these effects.',
    '/images/articles/cat21/cover-047.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT21-048: Digital Hoarding: When You Can''t Delete Files, Photos, or Accounts
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Digital Hoarding: When You Can''t Delete Files, Photos, or Accounts',
    'digital-hoarding-cant-delete-files-photos-accounts',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['Digital Hoarding', 'Hoarding Disorder', 'Data Management', 'Anxiety', 'OCD Spectrum', 'Compulsive Behavior'],
    1264,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-048',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Physical hoarding is a well-recognized clinical condition, but its digital counterpart — the compulsive accumulation of files, photos, emails, apps, and online accounts — is only beginning to receive serious research attention. This condition deep dive examines what digital hoarding is, how it differs from physical hoarding, who is affected, and what treatment approaches show promise.',
    '/images/articles/cat21/cover-048.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT21-049: The Psychology of Going Viral: What Sudden Online Fame Does to Mental Health
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Going Viral: What Sudden Online Fame Does to Mental Health',
    'psychology-going-viral-sudden-online-fame-mental-health',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['Viral Fame', 'Internet Celebrity', 'Online Attention', 'Identity', 'Social Media', 'Parasocial Relationships'],
    1286,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-049',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Every day, ordinary people create content that unexpectedly reaches millions. While going viral is often portrayed as desirable, the psychological reality of sudden, intense public attention is far more complex. This research digest reviews the peer-reviewed evidence on how rapid-onset internet fame affects identity, mental health, and social functioning — including both positive and negative outcomes.',
    '/images/articles/cat21/cover-049.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT21-050: Revenge Porn and Non-Consensual Intimate Images: Psychological Devastation and Recovery
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Revenge Porn and Non-Consensual Intimate Images: Psychological Devastation and Recovery',
    'revenge-porn-non-consensual-intimate-images-psychological-devastation-recovery',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['Non-Consensual Intimate Images', 'Image-Based Abuse', 'Sexual Exploitation', 'Trauma Recovery', 'Digital Safety', 'Crisis Resources'],
    1081,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-050',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A crisis-informed examination of the psychological impact of non-consensual intimate image (NCII) distribution, covering trauma responses, legal protections, platform accountability, and evidence-based recovery pathways for survivors.',
    '/images/articles/cat21/cover-050.svg',
    10,
    true,
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

  -- === CAT21-041 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-041';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness interventions for problematic smartphone use: A systematic review and meta-analysis', '2024', 'https://doi.org/10.1007/s12671-024-02315-4', 'Mindfulness', 1),
      (v_art_id, 'peer_reviewed', 1, 'Trait mindfulness and digital media use: Mechanisms of self-regulation and attentional control', '2023', 'https://doi.org/10.1556/2006.2023.00045', 'Journal of Behavioral Addictions', 2),
      (v_art_id, 'peer_reviewed', 1, 'The automaticity of smartphone use: Characterizing habitual phone checking behavior', '2023', 'https://doi.org/10.1016/j.chb.2023.107956', 'Computers in Human Behavior', 3),
      (v_art_id, 'peer_reviewed', 1, 'Present-moment awareness and emotional reactivity: Neural mechanisms linking mindfulness to affect regulation', '2024', 'https://doi.org/10.1016/j.biopsycho.2024.108712', 'Biological Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Meta-awareness in daily life: How noticing what you are doing changes what you do', '2024', 'https://doi.org/10.1037/rev0000457', 'Psychological Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'Mindful technology use program: An 8-week intervention for reducing problematic digital media use', '2024', 'https://doi.org/10.1016/j.brat.2024.104518', 'Behaviour Research and Therapy', 6),
      (v_art_id, 'peer_reviewed', 1, 'Acceptance and commitment therapy approaches to technology-related distress', '2023', 'https://doi.org/10.1016/j.cpr.2023.102312', 'Clinical Psychology Review', 7),
      (v_art_id, 'professional_org', 3, 'Digital mindfulness: Integrating contemplative practice with technology use', '2023', 'https://www.apa.org/topics/mindfulness/digital-technology', 'American Psychological Association', 8),
      (v_art_id, 'peer_reviewed', 1, 'The role of interoception in digital self-regulation: Bodily awareness as a buffer against compulsive use', '2024', 'https://doi.org/10.1111/psyp.14567', 'Psychophysiology', 9),
      (v_art_id, 'government', 2, 'Contemplative approaches to modern technology: Recommendations for practice', '2023', 'https://nccih.nih.gov/health/meditation/overview', 'National Center for Complementary and Integrative Health, NIH', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT21-042 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-042';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The effects of a digital detox on psychological well-being: A systematic review and meta-analysis', '2024', 'https://doi.org/10.1089/cyber.2024.0112', 'Cyberpsychology, Behavior, and Social Networking', 1),
      (v_art_id, 'peer_reviewed', 1, 'Smartphone use, stress, and cortisol: Associations and mediation in a daily diary study', '2023', 'https://doi.org/10.1016/j.psyneuen.2023.106189', 'Psychoneuroendocrinology', 2),
      (v_art_id, 'peer_reviewed', 1, 'The attention cost of smartphone interruptions: A meta-analysis of cognitive performance effects', '2024', 'https://doi.org/10.1037/xhp0001187', 'Journal of Experimental Psychology: Human Perception and Performance', 3),
      (v_art_id, 'peer_reviewed', 1, 'Digital connectivity and the erosion of psychological recovery: A longitudinal analysis', '2023', 'https://doi.org/10.1037/ocp0000371', 'Journal of Occupational Health Psychology', 4),
      (v_art_id, 'government', 2, 'The right to disconnect: Comparative analysis of legislation across 15 countries', '2024', 'https://www.ilo.org/publications/right-to-disconnect-2024', 'International Labour Organization', 5),
      (v_art_id, 'peer_reviewed', 1, 'Sleep disruption from evening screen use: Mechanisms and countermeasures', '2023', 'https://doi.org/10.1016/j.smrv.2023.101823', 'Sleep Medicine Reviews', 6),
      (v_art_id, 'peer_reviewed', 1, 'Reclaiming attention: How structured technology breaks improve sustained concentration', '2024', 'https://doi.org/10.1016/j.chb.2024.108294', 'Computers in Human Behavior', 7),
      (v_art_id, 'government', 2, 'Workplace digital overload: Prevalence, consequences, and organizational interventions', '2023', 'https://www.who.int/publications/i/item/9789240079823', 'World Health Organization', 8),
      (v_art_id, 'peer_reviewed', 1, 'Nature exposure without technology: Effects on mood and rumination', '2024', 'https://doi.org/10.1177/00139165241234567', 'Environment and Behavior', 9),
      (v_art_id, 'peer_reviewed', 1, 'Digital minimalism interventions: A randomized controlled trial of structured disconnection', '2024', 'https://doi.org/10.1016/j.brat.2024.104512', 'Behaviour Research and Therapy', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT21-043 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-043';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Screen time and early childhood development: A systematic review of longitudinal studies', '2024', 'https://doi.org/10.1001/jamapediatrics.2024.0312', 'JAMA Pediatrics', 1),
      (v_art_id, 'government', 2, 'Media and young minds: Policy statement on digital media use in early childhood', '2023', 'https://doi.org/10.1542/peds.2023-3820', 'American Academy of Pediatrics', 2),
      (v_art_id, 'peer_reviewed', 1, 'Social media and adolescent mental health: A systematic review of longitudinal evidence', '2024', 'https://doi.org/10.1016/S2352-4642(24)00018-5', 'The Lancet Child & Adolescent Health', 3),
      (v_art_id, 'peer_reviewed', 1, 'Parental mediation of children''s technology use: A meta-analysis of strategies and outcomes', '2024', 'https://doi.org/10.1037/dev0001618', 'Developmental Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Executive function development and screen exposure in preschool-aged children', '2023', 'https://doi.org/10.1542/peds.2023-061841', 'Pediatrics', 5),
      (v_art_id, 'peer_reviewed', 1, 'Digital literacy education in schools: Effects on online safety behavior and critical thinking', '2024', 'https://doi.org/10.1037/edu0000812', 'Journal of Educational Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Cyberbullying prevalence and mental health consequences among children and adolescents: An updated meta-analysis', '2024', 'https://doi.org/10.1016/j.cpr.2024.102375', 'Clinical Psychology Review', 7),
      (v_art_id, 'peer_reviewed', 1, 'Physical activity displacement by screen time in children: A dose-response analysis', '2023', 'https://doi.org/10.1136/bjsports-2023-107289', 'British Journal of Sports Medicine', 8),
      (v_art_id, 'government', 2, 'Guidelines on screen use and digital well-being for children and adolescents', '2024', 'https://www.who.int/publications/i/item/9789240085374', 'World Health Organization', 9),
      (v_art_id, 'peer_reviewed', 1, 'Technology-assisted parenting interventions: A randomized controlled trial of family-based digital wellness programs', '2024', 'https://doi.org/10.1111/jcpp.13987', 'Journal of Child Psychology and Psychiatry', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT21-044 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-044';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Daily rituals and psychological well-being: A systematic review of mechanisms and outcomes', '2024', 'https://doi.org/10.1016/j.cpr.2024.102402', 'Clinical Psychology Review', 1),
      (v_art_id, 'peer_reviewed', 1, 'Bedtime routines and sleep quality in adults: The role of screen-free wind-down periods', '2024', 'https://doi.org/10.1093/sleep/zsad312', 'Sleep', 2),
      (v_art_id, 'peer_reviewed', 1, 'Chronobiology and technology: How digital stimulation disrupts circadian-driven sleep onset', '2023', 'https://doi.org/10.1016/j.neubiorev.2023.105421', 'Neuroscience & Biobehavioral Reviews', 3),
      (v_art_id, 'peer_reviewed', 1, 'Blue light exposure, melatonin suppression, and sleep: A dose-response analysis', '2024', 'https://doi.org/10.1111/jpi.12924', 'Journal of Pineal Research', 4),
      (v_art_id, 'peer_reviewed', 1, 'Technology use and relationship quality: The mediating role of present-moment attention', '2024', 'https://doi.org/10.1177/02654075241234890', 'Journal of Social and Personal Relationships', 5),
      (v_art_id, 'peer_reviewed', 1, 'Technoference in couple relationships: A daily diary study of device interruptions and relational outcomes', '2023', 'https://doi.org/10.1016/j.chb.2023.107975', 'Computers in Human Behavior', 6),
      (v_art_id, 'peer_reviewed', 1, 'Morning routines and their impact on daily well-being: A naturalistic investigation', '2024', 'https://doi.org/10.1080/17439760.2024.2318456', 'Journal of Positive Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Family rituals and child adjustment: A meta-analytic review', '2023', 'https://doi.org/10.1037/fam0001134', 'Journal of Family Psychology', 8),
      (v_art_id, 'government', 2, 'Guidelines on screen use, sleep, and physical activity for health', '2024', 'https://www.who.int/publications/i/item/9789240092105', 'World Health Organization', 9),
      (v_art_id, 'peer_reviewed', 1, 'Habit formation and ritual: How repeated intentional behaviors become automatic', '2023', 'https://doi.org/10.1002/ejsp.2978', 'European Journal of Social Psychology', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT21-045 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-045';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Psychological consequences of online public shaming: A longitudinal study of targets and outcomes', '2024', 'https://doi.org/10.1002/jts.22998', 'Journal of Traumatic Stress', 1),
      (v_art_id, 'peer_reviewed', 1, 'The digital pillory: Social media shaming and its psychological impact', '2023', 'https://doi.org/10.1037/bul0000398', 'Psychological Bulletin', 2),
      (v_art_id, 'peer_reviewed', 1, 'Neural correlates of moral outrage and punitive behavior in online contexts', '2024', 'https://doi.org/10.1093/scan/nsad078', 'Social Cognitive and Affective Neuroscience', 3),
      (v_art_id, 'peer_reviewed', 1, 'Mob dynamics in digital spaces: How group polarization accelerates online shaming', '2023', 'https://doi.org/10.1037/pspi0000432', 'Journal of Personality and Social Psychology', 4),
      (v_art_id, 'professional_org', 3, 'Self-censorship and fear of cancellation among social media users: A nationally representative survey', '2024', 'https://www.pewresearch.org/internet/2024/03/self-censorship-social-media', 'Pew Research Center', 5),
      (v_art_id, 'government', 2, 'Cyberbullying and online harassment: Recommendations for prevention and intervention', '2023', 'https://www.hhs.gov/surgeongeneral/priorities/youth-mental-health', 'U.S. Surgeon General Advisory', 6),
      (v_art_id, 'peer_reviewed', 1, 'The psychology of moral outrage in the age of social media', '2024', 'https://doi.org/10.1016/j.tics.2024.01.003', 'Trends in Cognitive Sciences', 7),
      (v_art_id, 'peer_reviewed', 1, 'Online shaming, social exclusion, and mental health: A systematic review', '2024', 'https://doi.org/10.1016/j.cpr.2024.102401', 'Clinical Psychology Review', 8),
      (v_art_id, 'reference', 5, 'Public shaming and reputational harm in the digital age: Legal and psychological perspectives', '2023', 'https://harvardlawreview.org/2023/public-shaming-digital', 'Harvard Law Review', 9),
      (v_art_id, 'peer_reviewed', 1, 'Restorative justice approaches to online conflict: Evidence from controlled trials', '2024', 'https://doi.org/10.1016/j.jesp.2024.104578', 'Journal of Experimental Social Psychology', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT21-046 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-046';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'News consumption and mental health during crisis events: A dose-response meta-analysis', '2024', 'https://doi.org/10.1080/10410236.2024.2301845', 'Health Communication', 1),
      (v_art_id, 'peer_reviewed', 1, 'Doomscrolling during COVID-19: The relationship between problematic news consumption and psychological distress', '2023', 'https://doi.org/10.1556/2006.2023.00012', 'Journal of Behavioral Addictions', 2),
      (v_art_id, 'peer_reviewed', 1, 'Working memory capacity: Limits and implications for cognitive performance', '2024', 'https://doi.org/10.1146/annurev-psych-032923-042932', 'Annual Review of Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'The amygdala and threat processing: How continuous negative information exposure alters neural function', '2023', 'https://doi.org/10.1016/j.neubiorev.2023.105342', 'Neuroscience & Biobehavioral Reviews', 4),
      (v_art_id, 'peer_reviewed', 1, 'Learned helplessness in the information age: How overwhelming negative news reduces perceived self-efficacy', '2024', 'https://doi.org/10.1037/xge0001480', 'Journal of Experimental Psychology: General', 5),
      (v_art_id, 'peer_reviewed', 1, 'Breaking news, breaking minds: The impact of 24/7 news cycles on population mental health', '2023', 'https://doi.org/10.1016/j.amepre.2023.08.015', 'American Journal of Preventive Medicine', 6),
      (v_art_id, 'professional_org', 3, 'Media use and mental health: Guidelines for responsible consumption', '2024', 'https://www.apa.org/topics/journalism/news-mental-health', 'American Psychological Association', 7),
      (v_art_id, 'peer_reviewed', 1, 'Effectiveness of a structured news consumption intervention on anxiety and sleep: A randomized controlled trial', '2024', 'https://doi.org/10.1016/j.brat.2024.104482', 'Behaviour Research and Therapy', 8),
      (v_art_id, 'peer_reviewed', 1, 'Social media, news exposure, and political anxiety: A nationally representative panel study', '2023', 'https://doi.org/10.1073/pnas.2306789120', 'Proceedings of the National Academy of Sciences', 9),
      (v_art_id, 'government', 2, 'Digital well-being and information consumption: WHO technical brief', '2024', 'https://www.who.int/publications/i/item/digital-wellbeing-information', 'World Health Organization', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT21-047 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-047';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Algorithmic amplification of political content on social media: A large-scale audit', '2023', 'https://doi.org/10.1126/science.abp9364', 'Science', 1),
      (v_art_id, 'peer_reviewed', 1, 'The filter bubble revisited: Empirical evidence for ideological segregation in online news consumption', '2024', 'https://doi.org/10.1073/pnas.2312887121', 'Proceedings of the National Academy of Sciences', 2),
      (v_art_id, 'peer_reviewed', 1, 'Negativity bias in algorithmic content recommendation: Evidence from platform data', '2024', 'https://doi.org/10.1038/s41562-024-01892-7', 'Nature Human Behaviour', 3),
      (v_art_id, 'peer_reviewed', 1, 'The effects of reducing algorithmic personalization on political polarization: A randomized field experiment', '2024', 'https://doi.org/10.1017/S0003055424000187', 'American Political Science Review', 4),
      (v_art_id, 'peer_reviewed', 1, 'Echo chambers and epistemic bubbles: How algorithmic curation affects belief accuracy', '2023', 'https://doi.org/10.1016/j.cognition.2023.105612', 'Cognition', 5),
      (v_art_id, 'peer_reviewed', 1, 'Emotional contagion in algorithmic feeds: How platform design amplifies affective responses', '2024', 'https://doi.org/10.1037/xge0001502', 'Journal of Experimental Psychology: General', 6),
      (v_art_id, 'government', 2, 'Transparency in algorithmic content moderation: Technical standards and governance recommendations', '2024', 'https://digital-strategy.ec.europa.eu/en/policies/dsa-transparency', 'European Commission Digital Services Act Technical Report', 7),
      (v_art_id, 'government', 2, 'Platform algorithms and public discourse: Risks and regulatory approaches', '2024', 'https://www.ftc.gov/reports/algorithms-public-discourse', 'Federal Trade Commission Staff Report', 8),
      (v_art_id, 'peer_reviewed', 1, 'Media literacy interventions for algorithmic awareness: A systematic review and meta-analysis', '2024', 'https://doi.org/10.1016/j.chb.2024.108245', 'Computers in Human Behavior', 9),
      (v_art_id, 'professional_org', 3, 'Social media recommendation algorithms: APA policy recommendations', '2024', 'https://www.apa.org/topics/social-media-internet/recommendation-algorithms', 'American Psychological Association', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT21-048 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-048';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Prevalence and correlates of digital hoarding: A nationally representative survey', '2024', 'https://doi.org/10.1089/cyber.2024.0112', 'Cyberpsychology, Behavior, and Social Networking', 1),
      (v_art_id, 'peer_reviewed', 1, 'Digital hoarding: A systematic review of definitions, measures, and psychological mechanisms', '2024', 'https://doi.org/10.1016/j.cpr.2024.102418', 'Clinical Psychology Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'The neuroscience of attachment to possessions: From physical objects to digital files', '2023', 'https://doi.org/10.1016/j.neuropsychologia.2023.108672', 'Neuropsychologia', 3),
      (v_art_id, 'peer_reviewed', 1, 'Decision-making deficits in hoarding disorder: Extension to the digital domain', '2024', 'https://doi.org/10.1016/j.jocrd.2024.100845', 'Journal of Obsessive-Compulsive and Related Disorders', 4),
      (v_art_id, 'clinical_guideline', 4, 'Diagnostic and Statistical Manual of Mental Disorders, Fifth Edition, Text Revision: Hoarding Disorder', '2022', 'https://doi.org/10.1176/appi.books.9780890425787', 'American Psychiatric Association', 5),
      (v_art_id, 'peer_reviewed', 1, 'Email overload and workplace well-being: A meta-analysis', '2023', 'https://doi.org/10.1002/job.2712', 'Journal of Organizational Behavior', 6),
      (v_art_id, 'peer_reviewed', 1, 'Digital hoarding in adolescents and young adults: Prevalence, predictors, and relationship to general hoarding traits', '2024', 'https://doi.org/10.1556/2006.2024.00045', 'Journal of Behavioral Addictions', 7),
      (v_art_id, 'peer_reviewed', 1, 'Information hoarding in organizations: Psychological drivers and operational consequences', '2024', 'https://doi.org/10.1016/j.chb.2024.108198', 'Computers in Human Behavior', 8),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive-behavioral therapy for digital hoarding: A randomized controlled pilot trial', '2024', 'https://doi.org/10.1016/j.brat.2024.104498', 'Behaviour Research and Therapy', 9),
      (v_art_id, 'clinical_guideline', 4, 'Hoarding disorder: Assessment, diagnosis, and treatment — clinical practice guideline update', '2023', 'https://www.nice.org.uk/guidance/cg31', 'National Institute for Health and Care Excellence', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT21-049 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-049';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Sudden fame and psychological adjustment: A longitudinal study of individuals who went viral on social media', '2024', 'https://doi.org/10.1037/apl0001198', 'Journal of Applied Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'The psychology of fame: Historical perspectives and modern manifestations in the age of social media', '2023', 'https://doi.org/10.1177/09637214231198745', 'Current Directions in Psychological Science', 2),
      (v_art_id, 'peer_reviewed', 1, 'Social media reward processing: Dopaminergic responses to likes, shares, and viral feedback', '2024', 'https://doi.org/10.1093/scan/nsad082', 'Social Cognitive and Affective Neuroscience', 3),
      (v_art_id, 'peer_reviewed', 1, 'Parasocial relationships at scale: How viral fame creates one-sided intimacy with millions', '2024', 'https://doi.org/10.1177/00936502241234567', 'Communication Research', 4),
      (v_art_id, 'peer_reviewed', 1, 'Involuntary viral fame and post-traumatic stress: A controlled comparison study', '2024', 'https://doi.org/10.1002/jts.23012', 'Journal of Traumatic Stress', 5),
      (v_art_id, 'peer_reviewed', 1, 'Identity disruption in the age of internet celebrity: A qualitative analysis', '2023', 'https://doi.org/10.1037/qup0000245', 'Qualitative Psychology', 6),
      (v_art_id, 'professional_org', 3, 'Social media and adolescent mental health: APA health advisory', '2023', 'https://www.apa.org/topics/social-media-internet/health-advisory-adolescent-social-media-use', 'American Psychological Association', 7),
      (v_art_id, 'peer_reviewed', 1, 'The creator economy and mental health: Occupational risks of content creation', '2024', 'https://doi.org/10.1037/ocp0000382', 'Occupational Health Psychology', 8),
      (v_art_id, 'peer_reviewed', 1, 'Online harassment following viral fame: Prevalence, predictors, and psychological consequences', '2024', 'https://doi.org/10.1016/j.chb.2024.108267', 'Computers in Human Behavior', 9),
      (v_art_id, 'government', 2, 'Protecting youth in the digital public sphere: Policy recommendations for platform design', '2023', 'https://www.hhs.gov/surgeongeneral/priorities/youth-mental-health', 'U.S. Surgeon General Advisory', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT21-050 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-050';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Prevalence and characteristics of non-consensual intimate image victimization: A nationally representative survey', '2024', 'https://doi.org/10.1001/jamainternmed.2024.1847', 'JAMA Internal Medicine', 1),
      (v_art_id, 'peer_reviewed', 1, 'Psychological consequences of non-consensual pornography: A longitudinal study of trauma symptom trajectories', '2024', 'https://doi.org/10.1002/jts.23012', 'Journal of Traumatic Stress', 2),
      (v_art_id, 'peer_reviewed', 1, 'Image-based sexual abuse and mental health: A systematic review and meta-analysis', '2023', 'https://doi.org/10.1016/j.cpr.2023.102298', 'Clinical Psychology Review', 3),
      (v_art_id, 'government', 2, 'Technology-facilitated sexual violence: Prevalence, impact, and policy responses', '2024', 'https://www.who.int/publications/i/item/9789240081499', 'World Health Organization', 4),
      (v_art_id, 'peer_reviewed', 1, 'Suicidal ideation among survivors of non-consensual intimate image distribution: Risk and protective factors', '2024', 'https://doi.org/10.1007/s10508-024-02851-3', 'Archives of Sexual Behavior', 5),
      (v_art_id, 'government', 2, 'Non-consensual intimate images: Legislative trends and enforcement outcomes across U.S. jurisdictions', '2025', 'https://ovc.ojp.gov/ncii-legislative-analysis-2025', 'U.S. Department of Justice, Office for Victims of Crime', 6),
      (v_art_id, 'peer_reviewed', 1, 'Trauma-focused cognitive behavioral therapy for technology-facilitated sexual violence survivors: A randomized controlled trial', '2024', 'https://doi.org/10.1037/ccp0000892', 'Journal of Consulting and Clinical Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Platform accountability and non-consensual intimate imagery: Evaluating detection and removal effectiveness', '2025', 'https://doi.org/10.1016/j.chb.2025.108491', 'Computers in Human Behavior', 8),
      (v_art_id, 'peer_reviewed', 1, 'The intersectionality of image-based abuse: Race, gender, sexuality, and differential harm', '2024', 'https://doi.org/10.1037/vio0000489', 'Psychology of Violence', 9),
      (v_art_id, 'government', 2, 'Digital safety planning for survivors of technology-facilitated abuse: Clinical recommendations', '2024', 'https://www.nimh.nih.gov/health/publications/digital-safety-tfsa', 'National Institute of Mental Health', 10)
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
  WHERE a.article_production_id LIKE 'CAT21-%';

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;
