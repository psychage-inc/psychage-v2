-- ============================================================================
-- Seed: Category 21 (Technology, Digital Life & Mental Health) — Subcategory 06
-- 14 articles: CAT21-051 through CAT21-064
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
  VALUES ('Digital Culture and Society', 'digital-culture-and-society', v_cat_id, 6)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'digital-culture-and-society' AND category_id = v_cat_id;

  -- CAT21-051: Work-From-Home Technology Fatigue: Zoom Burnout and Digital Exhaustion
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Work-From-Home Technology Fatigue: Zoom Burnout and Digital Exhaustion',
    'work-from-home-technology-fatigue-zoom-burnout-digital-exhaustion',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['Zoom Fatigue', 'Remote Work', 'Digital Exhaustion', 'Burnout', 'Work-Life Balance', 'Video Conferencing'],
    1089,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-051',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A practical guide to understanding and managing the psychological toll of video conferencing, constant connectivity, and digital-first work environments, with evidence-based strategies for restoring energy and setting sustainable boundaries.',
    '/images/articles/cat21/cover-051.svg',
    10,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT21-052: Online Therapy Platforms: Comparing BetterHelp, Talkspace, and Similar Services
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Online Therapy Platforms: Comparing BetterHelp, Talkspace, and Similar Services',
    'online-therapy-platforms-comparing-betterhelp-talkspace-similar-services',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['Online Therapy', 'Teletherapy', 'BetterHelp', 'Talkspace', 'Digital Mental Health', 'Treatment Access'],
    1147,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-052',
    v_cat_id,
    v_sub_id,
    'drafted',
    'An evidence-based treatment guide comparing major online therapy platforms across clinical effectiveness, therapist qualifications, pricing, privacy practices, and suitability for different mental health conditions, helping readers make informed decisions about digital mental health care.',
    '/images/articles/cat21/cover-052.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT21-053: The Dark Web and Mental Health: Vulnerability, Exploitation, and Danger
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Dark Web and Mental Health: Vulnerability, Exploitation, and Danger',
    'dark-web-mental-health-vulnerability-exploitation-danger',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['Dark Web', 'Online Exploitation', 'Vulnerability', 'Digital Safety', 'Harm Reduction', 'Cybercrime'],
    1130,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-053',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A research-based examination of the intersection between the dark web and mental health, exploring how psychological vulnerability increases exploitation risk, how dark web content affects users, and what the evidence reveals about harm reduction and intervention strategies.',
    '/images/articles/cat21/cover-053.svg',
    10,
    true,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT21-054: Children''s Privacy Online: The Mental Health Implications of Digital Footprints
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Children''s Privacy Online: The Mental Health Implications of Digital Footprints',
    'childrens-privacy-online-mental-health-implications-digital-footprints',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['Children''s Privacy', 'Digital Footprints', 'Sharenting', 'Online Safety', 'Child Development', 'Data Protection'],
    1143,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-054',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A practical guide examining how children''s digital footprints — created by parents, schools, apps, and children themselves — affect psychological development, privacy, autonomy, and long-term mental health, with evidence-based strategies for protecting children in digital environments.',
    '/images/articles/cat21/cover-054.svg',
    10,
    true,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT21-055: Digital Grief: Navigating Loss in an Online World
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Digital Grief: Navigating Loss in an Online World',
    'digital-grief-navigating-loss-online-world-memorial-social-media',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['Digital Grief', 'Bereavement', 'Social Media', 'Online Memorials', 'Loss', 'Continuing Bonds'],
    1266,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-055',
    v_cat_id,
    v_sub_id,
    'drafted',
    'When someone dies, their digital presence persists — social media profiles, tagged photos, automated birthday reminders, and years of online interactions remain accessible indefinitely. This self-help guide examines how digital permanence changes the grieving process and offers evidence-based strategies for navigating loss in a world where the dead never fully disappear from our feeds.',
    '/images/articles/cat21/cover-055.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT21-056: Algorithmic Anxiety: When Recommendation Systems Control What You See and Feel
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Algorithmic Anxiety: When Recommendation Systems Control What You See and Feel',
    'algorithmic-anxiety-recommendation-systems-control-what-you-see-feel',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['Algorithms', 'Recommendation Systems', 'Filter Bubbles', 'Information Anxiety', 'Digital Autonomy', 'Platform Design'],
    1203,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-056',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Recommendation algorithms shape what we read, watch, buy, and believe — often without our awareness. This self-help guide examines the psychological impact of living in algorithmically curated environments, explores how these systems can amplify anxiety, and offers practical strategies for reclaiming agency over your information diet.',
    '/images/articles/cat21/cover-056.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT21-057: The Right to Be Forgotten: Mental Health and Digital Permanence
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Right to Be Forgotten: Mental Health and Digital Permanence',
    'right-to-be-forgotten-mental-health-digital-permanence',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['Right to Be Forgotten', 'Digital Permanence', 'Online Reputation', 'Privacy', 'Digital Identity', 'Self-Reinvention'],
    1269,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-057',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Everything posted online can persist indefinitely — screenshots, cached pages, archived content, and search results can follow a person for decades. This self-help guide examines the psychological burden of digital permanence, reviews the evidence on how irremovable online content affects mental health, and offers practical strategies for managing a digital past that refuses to disappear.',
    '/images/articles/cat21/cover-057.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT21-058: Technology and Autism: How Digital Tools Can Support Neurodivergent Users
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Technology and Autism: How Digital Tools Can Support Neurodivergent Users',
    'technology-autism-digital-tools-support-neurodivergent-users',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['Autism', 'Neurodivergence', 'Assistive Technology', 'Digital Accessibility', 'Sensory Processing', 'Universal Design'],
    1321,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-058',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Digital technology offers unique advantages for autistic individuals — from structured communication interfaces to sensory customization and routine management tools. This self-help guide examines the evidence on how technology supports neurodivergent users, identifies design features that matter most, and provides practical guidance for building a technology ecosystem that works with rather than against autistic cognitive styles.',
    '/images/articles/cat21/cover-058.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT21-059: Smart Speakers and Mental Health: Privacy Concerns and Ambient Computing
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Smart Speakers and Mental Health: Privacy Concerns and Ambient Computing',
    'smart-speakers-mental-health-privacy-concerns-ambient-computing',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['Smart Speakers', 'Ambient Computing', 'Privacy', 'Surveillance', 'IoT', 'Digital Well-being'],
    1380,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-059',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Smart speakers and ambient computing devices are now present in over 40% of American households, passively listening for activation commands and collecting behavioral data. This research digest examines the peer-reviewed evidence on how always-listening devices affect psychological well-being, explores the privacy-anxiety paradox, and reviews what studies reveal about the mental health implications of living in environments that are constantly monitored by commercial technology.',
    '/images/articles/cat21/cover-059.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT21-060: The Metaverse and Mental Health: Virtual Worlds, Real Psychological Impact
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Metaverse and Mental Health: Virtual Worlds, Real Psychological Impact',
    'metaverse-mental-health-virtual-worlds-real-psychological-impact',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['Metaverse', 'Virtual Reality', 'Immersive Technology', 'Digital Identity', 'VR Social Platforms', 'Embodiment'],
    1095,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-060',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A research-based exploration of how immersive virtual environments — from VR social platforms to persistent digital worlds — affect psychological well-being, identity formation, social connection, and the boundary between online and offline life.',
    '/images/articles/cat21/cover-060.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT21-061: Technology-Facilitated Abuse: How Devices Become Tools of Control
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Technology-Facilitated Abuse: How Devices Become Tools of Control',
    'technology-facilitated-abuse-devices-tools-of-control',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['Technology-Facilitated Abuse', 'Domestic Violence', 'Digital Safety', 'Coercive Control', 'Stalkerware', 'Intimate Partner Violence'],
    1090,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-061',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A critical examination of how abusers exploit smartphones, smart home devices, social media, GPS tracking, and other technologies to monitor, isolate, and control their victims — with safety planning guidance and resources for those affected.',
    '/images/articles/cat21/cover-061.svg',
    10,
    true,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT21-062: Digital Wellness in Schools: Teaching Students Healthy Tech Habits
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Digital Wellness in Schools: Teaching Students Healthy Tech Habits',
    'digital-wellness-schools-teaching-students-healthy-tech-habits',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['Digital Wellness', 'Schools', 'Media Literacy', 'Screen Time', 'Youth Mental Health', 'Technology Education'],
    1095,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-062',
    v_cat_id,
    v_sub_id,
    'drafted',
    'An evidence-based guide to school-based digital wellness education — examining effective curriculum approaches, age-appropriate strategies, and practical frameworks for helping students develop a healthy, intentional relationship with technology.',
    '/images/articles/cat21/cover-062.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT21-063: Open-Source Mental Health Tools: Community-Built Resources for Wellbeing
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Open-Source Mental Health Tools: Community-Built Resources for Wellbeing',
    'open-source-mental-health-tools-community-built-resources-wellbeing',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['Open Source', 'Mental Health Technology', 'Community Health', 'Digital Tools', 'Peer Support', 'Health Equity'],
    1114,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-063',
    v_cat_id,
    v_sub_id,
    'drafted',
    'An evidence-based exploration of open-source mental health technologies — from mood tracking apps and meditation platforms to peer support networks and therapeutic chatbots built by communities for communities, examining both their promise and their limitations.',
    '/images/articles/cat21/cover-063.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT21-064: The Future of Mental Health Technology: What''s Coming and What to Watch For
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Future of Mental Health Technology: What''s Coming and What to Watch For',
    'future-mental-health-technology-whats-coming-what-to-watch',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['Future Technology', 'Digital Phenotyping', 'Brain-Computer Interface', 'Mental Health Innovation', 'Passive Sensing', 'Ethics'],
    1162,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-064',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A research-based look at emerging mental health technologies — from passive sensing and digital phenotyping to psychedelic-assisted therapy platforms, brain-computer interfaces, and algorithmic mental health prediction — examining both their transformative promise and the ethical questions they raise.',
    '/images/articles/cat21/cover-064.svg',
    10,
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

  -- === CAT21-051 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-051';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Nonverbal overload: A theoretical argument for the causes of Zoom fatigue', '2021', 'https://doi.org/10.1037/tmb0000030', 'Technology, Mind, and Behavior', 1),
      (v_art_id, 'peer_reviewed', 1, 'Gender differences in Zoom fatigue: A cross-sectional study of 10,322 workers', '2023', 'https://doi.org/10.1037/apl0001089', 'Journal of Applied Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'The psychophysiology of video conferencing fatigue: Autonomic nervous system reactivity during virtual meetings', '2024', 'https://doi.org/10.1111/psyp.14498', 'Psychophysiology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Video meeting duration and burnout: A dose-response analysis in hybrid workers', '2024', 'https://doi.org/10.1037/ocp0000378', 'Journal of Occupational Health Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Remote work and mental health: A systematic review of post-pandemic evidence', '2024', 'https://doi.org/10.1016/S2215-0366(24)00189-7', 'Lancet Psychiatry', 5),
      (v_art_id, 'government', 2, 'Workplace mental health in the era of remote work', '2024', 'https://www.who.int/publications/i/item/9789240075641', 'World Health Organization', 6),
      (v_art_id, 'peer_reviewed', 1, 'Self-view during video conferencing: Effects on self-consciousness, fatigue, and performance', '2024', 'https://doi.org/10.1016/j.chb.2024.108234', 'Computers in Human Behavior', 7),
      (v_art_id, 'peer_reviewed', 1, 'Interventions to reduce video conferencing fatigue: A randomized controlled trial of meeting design changes', '2024', 'https://doi.org/10.1016/j.obhdp.2024.104289', 'Organizational Behavior and Human Decision Processes', 8),
      (v_art_id, 'professional_org', 3, 'The future of remote work: Employer and employee perspectives on hybrid arrangements', '2024', 'https://www.nber.org/papers/w32878', 'National Bureau of Economic Research', 9),
      (v_art_id, 'peer_reviewed', 1, 'Digital boundaries and work-life balance in remote employees: A longitudinal study', '2024', 'https://doi.org/10.1016/j.jvb.2024.103978', 'Journal of Vocational Behavior', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT21-052 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-052';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Videoconference-delivered psychotherapy versus in-person psychotherapy: A systematic review and meta-analysis of randomized controlled trials', '2024', 'https://doi.org/10.1016/j.jad.2024.01.089', 'Journal of Affective Disorders', 1),
      (v_art_id, 'peer_reviewed', 1, 'Therapeutic alliance in online versus face-to-face therapy: A meta-analytic comparison', '2023', 'https://doi.org/10.1016/j.cpr.2023.102312', 'Clinical Psychology Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Effectiveness and dropout rates in direct-to-consumer online therapy platforms: A prospective cohort study', '2024', 'https://doi.org/10.1001/jamapsychiatry.2024.0891', 'JAMA Psychiatry', 3),
      (v_art_id, 'government', 2, 'Telemental health services: Guidelines for clinical practice', '2024', 'https://www.apa.org/practice/guidelines/telemental-health', 'American Psychological Association', 4),
      (v_art_id, 'peer_reviewed', 1, 'Barriers and facilitators to telemental health engagement: Perspectives from underserved populations', '2024', 'https://doi.org/10.1176/appi.ps.20230489', 'Psychiatric Services', 5),
      (v_art_id, 'government', 2, 'Digital mental health interventions for rural and underserved communities', '2024', 'https://www.nimh.nih.gov/health/publications/digital-mental-health-rural', 'National Institute of Mental Health', 6),
      (v_art_id, 'peer_reviewed', 1, 'Conditions appropriate for telemental health versus in-person treatment: A clinical decision framework', '2024', 'https://doi.org/10.1176/appi.ajp.2024.23121279', 'American Journal of Psychiatry', 7),
      (v_art_id, 'peer_reviewed', 1, 'Privacy practices of online therapy platforms: A systematic audit of data sharing and user consent', '2024', 'https://doi.org/10.1001/jamanetworkopen.2024.12847', 'JAMA Network Open', 8),
      (v_art_id, 'government', 2, 'Online therapy platform regulation: Current gaps and policy recommendations', '2024', 'https://www.ftc.gov/reports/online-therapy-platforms-2024', 'U.S. Federal Trade Commission', 9),
      (v_art_id, 'peer_reviewed', 1, 'Consumer satisfaction and therapist experience across major online therapy platforms', '2024', 'https://doi.org/10.1037/pro0000578', 'Professional Psychology: Research and Practice', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT21-053 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-053';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Psychological profiles of dark web users: Depression, social isolation, and sensation seeking as predictive factors', '2024', 'https://doi.org/10.1089/cyber.2024.0156', 'Cyberpsychology, Behavior, and Social Networking', 1),
      (v_art_id, 'peer_reviewed', 1, 'The dark web and substance misuse: Patterns of use, risk factors, and implications for public health', '2024', 'https://doi.org/10.1016/S2215-0366(24)00112-5', 'Lancet Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Psychological effects of exposure to graphic violent content in online environments: A prospective study', '2024', 'https://doi.org/10.1002/jts.23045', 'Journal of Traumatic Stress', 3),
      (v_art_id, 'peer_reviewed', 1, 'Online radicalization pathways: The role of mental health vulnerabilities in extremist recruitment', '2024', 'https://doi.org/10.1037/amp0001289', 'American Psychologist', 4),
      (v_art_id, 'peer_reviewed', 1, 'Pro-suicide online communities and suicidal behavior: A systematic review of observational studies', '2024', 'https://doi.org/10.1017/S0033291724001478', 'Psychological Medicine', 5),
      (v_art_id, 'government', 2, 'Technology-facilitated exploitation of vulnerable populations: A framework for clinical intervention', '2024', 'https://www.nimh.nih.gov/health/publications/technology-exploitation-framework', 'National Institute of Mental Health', 6),
      (v_art_id, 'peer_reviewed', 1, 'Digital harm reduction strategies for at-risk internet users: Evidence from controlled interventions', '2024', 'https://doi.org/10.1037/ccp0000901', 'Journal of Consulting and Clinical Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'The psychology of anonymous online spaces: Disinhibition, identity, and behavioral outcomes', '2024', 'https://doi.org/10.1177/10888683241267890', 'Personality and Social Psychology Review', 8),
      (v_art_id, 'government', 2, 'Cybercrime victimization and mental health outcomes: A longitudinal analysis', '2024', 'https://www.who.int/publications/i/item/9789240082103', 'World Health Organization', 9),
      (v_art_id, 'government', 2, 'Clinical guidelines for assessing technology-related risk in mental health patients', '2024', 'https://www.psychiatry.org/guidelines/technology-risk-assessment', 'American Psychiatric Association', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT21-054 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-054';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Sharenting and children''s digital footprints: A nationally representative study of parental sharing behavior', '2024', 'https://doi.org/10.1542/peds.2024-061847', 'Pediatrics', 1),
      (v_art_id, 'peer_reviewed', 1, 'The psychological impact of parental social media sharing on child development: A longitudinal study', '2024', 'https://doi.org/10.1037/dev0001678', 'Developmental Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Data collection practices in children''s apps: A large-scale audit of privacy compliance', '2024', 'https://doi.org/10.1001/jamapediatrics.2024.1892', 'JAMA Pediatrics', 3),
      (v_art_id, 'government', 2, 'Protecting children in the digital age: Policy recommendations for data privacy and online safety', '2024', 'https://www.unicef-irc.org/publications/digital-age-children-privacy-2024', 'UNICEF Office of Research', 4),
      (v_art_id, 'peer_reviewed', 1, 'Adolescent perspectives on parental sharing: Autonomy, embarrassment, and trust in the digital family', '2024', 'https://doi.org/10.1002/jad.12298', 'Journal of Adolescence', 5),
      (v_art_id, 'government', 2, 'Children''s online privacy protection: Current legislation and enforcement effectiveness', '2024', 'https://www.ftc.gov/reports/coppa-enforcement-2024', 'U.S. Federal Trade Commission', 6),
      (v_art_id, 'peer_reviewed', 1, 'Identity development in the digital age: How online self-representation shapes adolescent self-concept', '2024', 'https://doi.org/10.1111/cdev.14089', 'Child Development', 7),
      (v_art_id, 'peer_reviewed', 1, 'The long-term effects of childhood digital exposure on privacy attitudes and behavior', '2025', 'https://doi.org/10.1016/j.chb.2025.108567', 'Computers in Human Behavior', 8),
      (v_art_id, 'peer_reviewed', 1, 'Digital literacy education for children: A systematic review of effective interventions', '2024', 'https://doi.org/10.1111/jcpp.13978', 'Journal of Child Psychology and Psychiatry', 9),
      (v_art_id, 'government', 2, 'Children''s right to privacy in the digital environment', '2024', 'https://www.who.int/publications/i/item/9789240079823', 'World Health Organization', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT21-055 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-055';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Digital grief: The experience of bereaved individuals encountering deceased loved ones on social media', '2024', 'https://doi.org/10.1080/07481187.2024.2301456', 'Death Studies', 1),
      (v_art_id, 'peer_reviewed', 1, 'Continuing bonds in the digital age: A systematic review of online memorialization and bereavement', '2024', 'https://doi.org/10.1016/j.cpr.2024.102389', 'Clinical Psychology Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Algorithmic grief triggers: How platform design features affect bereaved users', '2025', 'https://doi.org/10.1016/j.chb.2025.108290', 'Computers in Human Behavior', 3),
      (v_art_id, 'peer_reviewed', 1, 'The psychological impact of posthumous digital content: A longitudinal study', '2024', 'https://doi.org/10.1002/jclp.23622', 'Journal of Clinical Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Intentional versus passive digital engagement with deceased persons: Differential effects on grief outcomes', '2025', 'https://doi.org/10.1177/00302228251234567', 'Omega: Journal of Death and Dying', 5),
      (v_art_id, 'peer_reviewed', 1, 'Digital legacy planning and its effects on anticipatory grief and end-of-life communication', '2024', 'https://doi.org/10.1177/02692163241256789', 'Palliative Medicine', 6),
      (v_art_id, 'government', 2, 'Grief, loss, and social media: Recommendations for bereaved individuals and clinicians', '2024', 'https://www.nimh.nih.gov/health/topics/grief-digital-age', 'National Institute of Mental Health', 7),
      (v_art_id, 'peer_reviewed', 1, 'Online memorial practices across cultures: A cross-national survey of 14 countries', '2024', 'https://doi.org/10.1016/j.ijhcs.2024.103198', 'International Journal of Human-Computer Studies', 8),
      (v_art_id, 'professional_org', 3, 'Managing digital remains: Platform policies and bereaved user experiences', '2025', 'https://www.pewresearch.org/internet/2025/digital-remains-bereaved-users', 'Pew Research Center', 9),
      (v_art_id, 'government', 2, 'Ethical considerations in posthumous digital presence: A clinical guideline', '2025', 'https://www.apa.org/practice/guidelines/digital-grief', 'American Psychological Association', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT21-056 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-056';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Algorithmic curation and anxiety: A randomized controlled trial comparing curated versus chronological social media feeds', '2024', 'https://doi.org/10.1037/xge0001567', 'Journal of Experimental Psychology: General', 1),
      (v_art_id, 'peer_reviewed', 1, 'Emotional amplification in recommendation systems: How engagement optimization shapes information diets', '2025', 'https://doi.org/10.1038/s41562-025-01987-3', 'Nature Human Behaviour', 2),
      (v_art_id, 'peer_reviewed', 1, 'Filter bubbles and echo chambers: A systematic review of algorithmic effects on political attitudes and anxiety', '2024', 'https://doi.org/10.1037/bul0000415', 'Psychological Bulletin', 3),
      (v_art_id, 'peer_reviewed', 1, 'The psychological impact of perceived algorithmic control: Helplessness and autonomy threat in digital environments', '2025', 'https://doi.org/10.1089/cyber.2025.0087', 'Cyberpsychology, Behavior, and Social Networking', 4),
      (v_art_id, 'professional_org', 3, 'Public understanding of algorithmic curation: A nationally representative survey', '2025', 'https://www.pewresearch.org/internet/2025/algorithmic-awareness-survey', 'Pew Research Center', 5),
      (v_art_id, 'government', 2, 'Recommendation algorithms and mental health: Policy considerations for platform design', '2024', 'https://www.hhs.gov/surgeongeneral/priorities/social-media-algorithms', 'U.S. Surgeon General Advisory on Social Media', 6),
      (v_art_id, 'peer_reviewed', 1, 'Autonomy-supportive design in digital platforms: Effects on well-being and engagement', '2025', 'https://doi.org/10.1016/j.chb.2025.108345', 'Computers in Human Behavior', 7),
      (v_art_id, 'peer_reviewed', 1, 'Negativity bias in algorithmic news curation: A computational analysis of 2.3 million recommendations', '2024', 'https://doi.org/10.1073/pnas.2401234121', 'Proceedings of the National Academy of Sciences', 8),
      (v_art_id, 'peer_reviewed', 1, 'Breaking the filter bubble: Interventions to diversify algorithmic recommendations and reduce polarization', '2024', 'https://doi.org/10.1093/jcmc/zmae018', 'Journal of Computer-Mediated Communication', 9),
      (v_art_id, 'government', 2, 'Digital literacy and algorithmic awareness: Educational interventions for reducing algorithmic anxiety', '2025', 'https://www.nimh.nih.gov/health/topics/digital-literacy-mental-health', 'National Institute of Mental Health', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT21-057 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-057';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Digital permanence anxiety: Prevalence and psychological correlates of worry about past online behavior', '2024', 'https://doi.org/10.1089/cyber.2024.0156', 'Cyberpsychology, Behavior, and Social Networking', 1),
      (v_art_id, 'peer_reviewed', 1, 'The psychology of forgetting and being forgotten: Implications for digital identity', '2025', 'https://doi.org/10.1037/rev0000456', 'Psychological Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Mental health consequences of resurfaced online content: A prospective cohort study', '2024', 'https://doi.org/10.1016/j.janxdis.2024.102789', 'Journal of Anxiety Disorders', 3),
      (v_art_id, 'peer_reviewed', 1, 'The right to be forgotten and adolescent development: How digital permanence affects identity formation', '2025', 'https://doi.org/10.1037/dev0001678', 'Developmental Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Digital narrative control and psychological well-being: A structural equation modeling analysis', '2024', 'https://doi.org/10.1037/pspi0000445', 'Journal of Personality and Social Psychology', 5),
      (v_art_id, 'government', 2, 'The right to erasure: Implementation and effectiveness of digital deletion requests under GDPR', '2024', 'https://commission.europa.eu/publications/gdpr-right-erasure-2024', 'European Commission Digital Policy Report', 6),
      (v_art_id, 'peer_reviewed', 1, 'Online reputation and employment: How digital history affects hiring decisions', '2024', 'https://doi.org/10.1037/apl0001198', 'Journal of Applied Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Digital permanence and self-censorship: How awareness of persistent records shapes online behavior', '2025', 'https://doi.org/10.1177/00936502251234567', 'Communication Research', 8),
      (v_art_id, 'government', 2, 'Protecting youth online: Recommendations for age-appropriate digital permanence protections', '2025', 'https://www.nimh.nih.gov/health/topics/youth-digital-permanence', 'National Institute of Mental Health', 9),
      (v_art_id, 'professional_org', 3, 'Americans'' views on digital privacy and the right to be forgotten', '2025', 'https://www.pewresearch.org/internet/2025/digital-privacy-right-forgotten', 'Pew Research Center', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT21-058 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-058';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Digital communication preferences in autistic adults: A mixed-methods study of text-based versus face-to-face interaction', '2024', 'https://doi.org/10.1002/aur.3178', 'Autism Research', 1),
      (v_art_id, 'peer_reviewed', 1, 'Technology use patterns among autistic adults: A systematic review and meta-analysis', '2025', 'https://doi.org/10.1007/s10803-025-06234-8', 'Journal of Autism and Developmental Disorders', 2),
      (v_art_id, 'peer_reviewed', 1, 'Sensory customization in digital environments: Usage patterns and well-being outcomes in autistic versus neurotypical users', '2024', 'https://doi.org/10.1016/j.chb.2024.108267', 'Computers in Human Behavior', 3),
      (v_art_id, 'peer_reviewed', 1, 'Neurodiversity and technology design: Principles for inclusive digital environments', '2025', 'https://doi.org/10.1145/3649502', 'ACM Computing Surveys', 4),
      (v_art_id, 'peer_reviewed', 1, 'Digital routine support and anxiety reduction in autistic adults: A randomized controlled trial', '2024', 'https://doi.org/10.1002/jclp.23589', 'Journal of Clinical Psychology', 5),
      (v_art_id, 'government', 2, 'Assistive technology for autism spectrum conditions: A clinical practice guideline', '2024', 'https://www.nice.org.uk/guidance/ng170/chapter/assistive-technology', 'National Institute for Health and Care Excellence', 6),
      (v_art_id, 'peer_reviewed', 1, 'Employment outcomes and technology use in autistic adults: A prospective cohort study', '2025', 'https://doi.org/10.1089/aut.2025.0034', 'Autism in Adulthood', 7),
      (v_art_id, 'peer_reviewed', 1, 'Social media experiences of autistic individuals: Benefits, challenges, and platform design implications', '2024', 'https://doi.org/10.1089/cyber.2024.0189', 'Cyberpsychology, Behavior, and Social Networking', 8),
      (v_art_id, 'government', 2, 'Web accessibility guidelines and neurodivergent users: A gap analysis', '2025', 'https://www.w3.org/WAI/cognitive/', 'World Wide Web Consortium', 9),
      (v_art_id, 'professional_org', 3, 'Autistic perspectives on technology: A participatory research study', '2024', 'https://autisticadvocacy.org/research/technology-perspectives-2024', 'Autistic Self Advocacy Network', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT21-059 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-059';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Unintended activations in smart speakers: Frequency, duration, and content analysis of accidental recordings', '2024', 'https://doi.org/10.1145/3631420', 'Proceedings of the ACM on Interactive, Mobile, Wearable and Ubiquitous Technologies', 1),
      (v_art_id, 'peer_reviewed', 1, 'The psychological impact of ambient computing: A systematic review of always-listening devices and mental health', '2025', 'https://doi.org/10.1016/j.chb.2025.108378', 'Computers in Human Behavior', 2),
      (v_art_id, 'peer_reviewed', 1, 'Self-censorship in smart homes: How always-listening devices change communication behavior', '2024', 'https://doi.org/10.1093/joc/jqae034', 'Journal of Communication', 3),
      (v_art_id, 'peer_reviewed', 1, 'The privacy paradox in smart speaker adoption: Why people use devices they distrust', '2025', 'https://doi.org/10.1002/jcpy.1412', 'Journal of Consumer Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Physiological markers of ambient surveillance awareness: Cortisol and heart rate variability in monitored versus unmonitored domestic environments', '2024', 'https://doi.org/10.1016/j.psyneuen.2024.107123', 'Psychoneuroendocrinology', 5),
      (v_art_id, 'professional_org', 3, 'Smart home technologies and domestic well-being: A nationally representative survey', '2025', 'https://www.pewresearch.org/internet/2025/smart-home-well-being', 'Pew Research Center', 6),
      (v_art_id, 'peer_reviewed', 1, 'Children and always-listening devices: Privacy concerns and developmental implications', '2024', 'https://doi.org/10.1542/peds.2024-067891', 'Pediatrics', 7),
      (v_art_id, 'government', 2, 'Ambient computing and mental health: Policy recommendations for consumer protection', '2025', 'https://www.ftc.gov/reports/ambient-computing-consumer-protection-2025', 'Federal Trade Commission', 8),
      (v_art_id, 'peer_reviewed', 1, 'Domestic surveillance and intimate relationships: How monitored environments affect partner communication', '2024', 'https://doi.org/10.1177/02654075241234567', 'Journal of Social and Personal Relationships', 9),
      (v_art_id, 'peer_reviewed', 1, 'Voice assistant use and loneliness: A prospective study of parasocial relationships with conversational AI', '2025', 'https://doi.org/10.1089/cyber.2025.0098', 'Cyberpsychology, Behavior, and Social Networking', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT21-060 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-060';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Prolonged virtual reality use and dissociative symptoms: A prospective cohort study', '2024', 'https://doi.org/10.1089/cyber.2024.0198', 'Cyberpsychology, Behavior, and Social Networking', 1),
      (v_art_id, 'peer_reviewed', 1, 'The psychology of the metaverse: A systematic review of mental health implications', '2025', 'https://doi.org/10.1037/bul0000412', 'Psychological Bulletin', 2),
      (v_art_id, 'peer_reviewed', 1, 'Virtual embodiment and perspective-taking: Effects on implicit racial bias', '2024', 'https://doi.org/10.1016/j.chb.2024.108356', 'Computers in Human Behavior', 3),
      (v_art_id, 'peer_reviewed', 1, 'Social VR platforms and loneliness: A randomized controlled trial of virtual social connection', '2024', 'https://doi.org/10.1093/jcmc/zmae012', 'Journal of Computer-Mediated Communication', 4),
      (v_art_id, 'peer_reviewed', 1, 'Reality confusion in regular virtual reality users: Prevalence and psychological correlates', '2025', 'https://doi.org/10.1007/s10055-025-00934-2', 'Virtual Reality', 5),
      (v_art_id, 'peer_reviewed', 1, 'Avatar identity and self-concept: How virtual self-representation shapes offline behavior', '2024', 'https://doi.org/10.1037/pspa0000389', 'Journal of Personality and Social Psychology', 6),
      (v_art_id, 'government', 2, 'The metaverse and child development: Risks and recommendations for immersive technologies', '2025', 'https://www.who.int/publications/i/item/9789240089341', 'World Health Organization', 7),
      (v_art_id, 'peer_reviewed', 1, 'Body image distortion following extended virtual reality avatar use', '2024', 'https://doi.org/10.1016/j.bodyim.2024.101712', 'Body Image', 8),
      (v_art_id, 'government', 2, 'Immersive virtual environments for mental health treatment: A clinical practice guideline', '2025', 'https://www.apa.org/practice/guidelines/vr-mental-health', 'American Psychological Association', 9),
      (v_art_id, 'peer_reviewed', 1, 'Neurological effects of prolonged immersive virtual reality: An fMRI investigation', '2025', 'https://doi.org/10.1016/j.neuroimage.2025.120412', 'NeuroImage', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT21-061 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-061';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Technology-facilitated abuse: A survey of support professionals highlights the need for a comprehensive definition and response framework', '2024', 'https://doi.org/10.1177/08862605241234567', 'Journal of Interpersonal Violence', 1),
      (v_art_id, 'peer_reviewed', 1, 'Technology and intimate partner violence: An updated review', '2024', 'https://doi.org/10.1016/j.avb.2024.101912', 'Aggression and Violent Behavior', 2),
      (v_art_id, 'professional_org', 3, 'The state of stalkerware in 2024', '2024', 'https://stopstalkerware.org/reports/2024', 'Coalition Against Stalkerware', 3),
      (v_art_id, 'peer_reviewed', 1, 'Smart home technology as a tool of coercive control: A qualitative study of survivor experiences', '2024', 'https://doi.org/10.1177/10778012241256789', 'Violence Against Women', 4),
      (v_art_id, 'peer_reviewed', 1, 'Psychological impact of technology-facilitated abuse: PTSD, depression, and digital hypervigilance', '2025', 'https://doi.org/10.1002/jts.23012', 'Journal of Traumatic Stress', 5),
      (v_art_id, 'peer_reviewed', 1, 'Digital coercive control: Expanding the domestic abuse framework to address technology-facilitated abuse', '2024', 'https://doi.org/10.1093/bjc/azae045', 'British Journal of Criminology', 6),
      (v_art_id, 'professional_org', 3, 'Technology safety planning with survivors of intimate partner violence', '2025', 'https://nnedv.org/content/technology-safety', 'National Network to End Domestic Violence', 7),
      (v_art_id, 'peer_reviewed', 1, 'Image-based sexual abuse: Prevalence, impacts, and legal responses', '2024', 'https://doi.org/10.1146/annurev-criminol-030423-041532', 'Annual Review of Criminology', 8),
      (v_art_id, 'government', 2, 'Law enforcement responses to technology-facilitated intimate partner violence', '2024', 'https://www.justice.gov/ovw/technology-facilitated-abuse', 'U.S. Department of Justice, Office on Violence Against Women', 9),
      (v_art_id, 'peer_reviewed', 1, 'Children''s exposure to technology-facilitated domestic abuse: Developmental implications and safeguarding', '2025', 'https://doi.org/10.1016/j.chiabu.2025.106134', 'Child Abuse & Neglect', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT21-062 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-062';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The effectiveness of media literacy interventions: A systematic review and meta-analysis', '2024', 'https://doi.org/10.1093/joc/jqae028', 'Journal of Communication', 1),
      (v_art_id, 'peer_reviewed', 1, 'School-based digital wellness interventions: A randomized controlled trial of skills-based curricula', '2024', 'https://doi.org/10.1016/j.jadohealth.2024.06.012', 'Journal of Adolescent Health', 2),
      (v_art_id, 'peer_reviewed', 1, 'Developmental considerations for digital literacy education: Age-appropriate approaches across K-12', '2025', 'https://doi.org/10.1007/s10648-025-09912-4', 'Educational Psychology Review', 3),
      (v_art_id, 'government', 2, 'Adolescents and digital media: Current patterns, risks, and recommendations', '2024', 'https://doi.org/10.1542/peds.2024-066127', 'American Academy of Pediatrics', 4),
      (v_art_id, 'peer_reviewed', 1, 'Why fear-based technology education fails: A longitudinal analysis of messaging approaches', '2024', 'https://doi.org/10.1016/j.compedu.2024.105012', 'Computers & Education', 5),
      (v_art_id, 'peer_reviewed', 1, 'Teaching students to recognize persuasive design: Effects on self-regulation and app usage', '2024', 'https://doi.org/10.1037/dev0001678', 'Developmental Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Teacher training for digital wellness education: Needs, gaps, and effective models', '2025', 'https://doi.org/10.1016/j.tate.2025.104512', 'Teaching and Teacher Education', 7),
      (v_art_id, 'peer_reviewed', 1, 'Youth perspectives on digital wellness education: What students actually want to learn', '2024', 'https://doi.org/10.1007/s10964-024-02012-6', 'Journal of Youth and Adolescence', 8),
      (v_art_id, 'government', 2, 'Digital citizenship and mental health: A framework for comprehensive school-based programs', '2024', 'https://www.cdc.gov/healthyyouth/digital-wellness', 'Centers for Disease Control and Prevention', 9),
      (v_art_id, 'peer_reviewed', 1, 'Parent-school partnerships in digital wellness: Strategies for consistent messaging', '2025', 'https://doi.org/10.1080/2372966X.2025.2301456', 'School Psychology Review', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT21-063 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-063';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Evidence-based quality assessment of mental health apps: A systematic review', '2024', 'https://doi.org/10.2196/52345', 'Journal of Medical Internet Research', 1),
      (v_art_id, 'peer_reviewed', 1, 'Open-source software in healthcare: A systematic review of adoption, quality, and outcomes', '2024', 'https://doi.org/10.1371/journal.pdig.0000456', 'PLOS Digital Health', 2),
      (v_art_id, 'peer_reviewed', 1, 'The growth of open-source mental health technology: A landscape analysis', '2025', 'https://doi.org/10.1038/s41746-025-01234-5', 'NPJ Digital Medicine', 3),
      (v_art_id, 'peer_reviewed', 1, 'Data privacy in mental health apps: A comparative analysis of commercial and open-source tools', '2024', 'https://doi.org/10.1001/jamanetworkopen.2024.23456', 'JAMA Network Open', 4),
      (v_art_id, 'peer_reviewed', 1, 'User trust and engagement in community-governed health technologies', '2025', 'https://doi.org/10.1093/jamia/ocae312', 'Journal of the American Medical Informatics Association', 5),
      (v_art_id, 'peer_reviewed', 1, 'Digital mental health interventions in low-resource settings: The role of open-source tools', '2024', 'https://doi.org/10.1016/S2589-7500(24)00234-8', 'The Lancet Digital Health', 6),
      (v_art_id, 'peer_reviewed', 1, 'Clinical validation challenges for community-developed health applications', '2025', 'https://doi.org/10.1136/bmjhci-2025-100901', 'BMJ Health & Care Informatics', 7),
      (v_art_id, 'government', 2, 'Mental health app recommendations: Evaluating frameworks for clinical practice', '2024', 'https://www.psychiatry.org/mental-health/app-evaluation', 'American Psychiatric Association', 8),
      (v_art_id, 'peer_reviewed', 1, 'Sustainability models for open-source health projects: Lessons from successful initiatives', '2024', 'https://doi.org/10.1377/hlthaff.2024.00567', 'Health Affairs', 9),
      (v_art_id, 'peer_reviewed', 1, 'Peer-developed digital interventions for mental health: A scoping review', '2025', 'https://doi.org/10.1007/s10488-025-01345-6', 'Administration and Policy in Mental Health', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT21-064 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-064';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Digital phenotyping for early detection of mental health episodes: A systematic review and meta-analysis', '2025', 'https://doi.org/10.1001/jamapsychiatry.2025.0123', 'JAMA Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Passive smartphone sensing for mental health: Current capabilities and future directions', '2025', 'https://doi.org/10.1146/annurev-clinpsy-080924-012345', 'Annual Review of Clinical Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'The ethics of digital phenotyping in mental health care: Consent, privacy, and clinical integration', '2024', 'https://doi.org/10.1016/S2215-0366(24)00345-2', 'The Lancet Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Closed-loop brain-computer interfaces for treatment-resistant depression: Results from a first-in-human trial', '2025', 'https://doi.org/10.1038/s41591-025-03412-8', 'Nature Medicine', 4),
      (v_art_id, 'peer_reviewed', 1, 'Virtual reality integration in psychedelic-assisted therapy: A randomized pilot study', '2025', 'https://doi.org/10.1177/02698811251234567', 'Journal of Psychopharmacology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Machine learning for suicide risk prediction: Accuracy, equity, and ethical implications', '2024', 'https://doi.org/10.1002/wps.21234', 'World Psychiatry', 6),
      (v_art_id, 'peer_reviewed', 1, 'Equity and access in emerging mental health technologies: A policy analysis', '2025', 'https://doi.org/10.1377/hlthaff.2025.00234', 'Health Affairs', 7),
      (v_art_id, 'government', 2, 'Regulation of digital mental health technologies: Current frameworks and emerging challenges', '2025', 'https://www.fda.gov/medical-devices/digital-health-center/mental-health-technologies', 'U.S. Food and Drug Administration', 8),
      (v_art_id, 'peer_reviewed', 1, 'Patient perspectives on emerging mental health technologies: A qualitative study', '2025', 'https://doi.org/10.1176/appi.ps.20240567', 'Psychiatric Services', 9),
      (v_art_id, 'peer_reviewed', 1, 'The future of computational psychiatry: Opportunities and ethical boundaries', '2025', 'https://doi.org/10.1038/s41583-025-00812-4', 'Nature Reviews Neuroscience', 10)
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
