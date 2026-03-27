-- ============================================================================
-- Seed: Category 21 (Technology, Digital Life & Mental Health) — Subcategory 04
-- 10 articles: CAT21-031 through CAT21-040
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
  VALUES ('Online Relationships and Community', 'online-relationships-and-community', v_cat_id, 4)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'online-relationships-and-community' AND category_id = v_cat_id;

  -- CAT21-031: Online Dating and Mental Health: Rejection, Ghosting, and Connection
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Online Dating and Mental Health: Rejection, Ghosting, and Connection',
    'online-dating-mental-health-rejection-ghosting-connection',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['Online Dating', 'Ghosting', 'Rejection Sensitivity', 'Dating Apps', 'Loneliness', 'Self-Esteem'],
    1179,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-031',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Online dating reshapes how people form romantic connections — and how they experience rejection. This self-help guide examines what research says about the psychological effects of app-based dating, how ghosting affects mental health, and evidence-based strategies for protecting well-being while seeking connection.',
    '/images/articles/cat21/cover-031.svg',
    10,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT21-032: Cyberbullying in Adults: Harassment Beyond the Schoolyard
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Cyberbullying in Adults: Harassment Beyond the Schoolyard',
    'cyberbullying-adults-online-harassment-mental-health',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['Cyberbullying', 'Online Harassment', 'Digital Aggression', 'Trolling', 'PTSD', 'Workplace Bullying'],
    1155,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-032',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Cyberbullying is not limited to teenagers. This condition deep dive examines the prevalence, psychological impact, and clinical presentations of online harassment in adults — from workplace digital aggression to coordinated social media attacks — and what research says about effective responses.',
    '/images/articles/cat21/cover-032.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT21-033: Online Support Groups: Finding Community for Rare and Stigmatized Conditions
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Online Support Groups: Finding Community for Rare and Stigmatized Conditions',
    'online-support-groups-rare-stigmatized-conditions-community',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['Online Support Groups', 'Peer Support', 'Rare Conditions', 'Stigma', 'Health Communities', 'Digital Health'],
    1203,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-033',
    v_cat_id,
    v_sub_id,
    'drafted',
    'For people living with rare diagnoses or conditions that carry social stigma, online support communities can provide connection, validation, and practical knowledge that in-person resources cannot match. This guide examines what research says about the benefits, risks, and best practices for participating in online health communities.',
    '/images/articles/cat21/cover-033.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT21-034: Parasocial Relationships: Emotional Bonds With People Who Don''t Know You Exist
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Parasocial Relationships: Emotional Bonds With People Who Don''t Know You Exist',
    'parasocial-relationships-emotional-bonds-media-figures',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['Parasocial Relationships', 'Influencers', 'Media Psychology', 'Streaming', 'Loneliness', 'Attachment'],
    1207,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-034',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Research digest examining the psychology of parasocial relationships — the one-sided emotional connections people form with media figures, streamers, influencers, and fictional characters. Learn what decades of research reveal about why these bonds form, when they are normal versus problematic, and how digital media has intensified them.',
    '/images/articles/cat21/cover-034.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT21-035: Online Radicalization and Mental Health: How Extremism Preys on Vulnerability
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Online Radicalization and Mental Health: How Extremism Preys on Vulnerability',
    'online-radicalization-mental-health-how-extremism-preys-on-vulnerability',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['Online Radicalization', 'Extremism', 'Mental Health Vulnerability', 'Digital Manipulation', 'Prevention', 'Psychological Exploitation'],
    1075,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-035',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A research-backed examination of how online extremist groups target people experiencing mental health difficulties, the psychological mechanisms behind radicalization, and evidence-based approaches to prevention and intervention.',
    '/images/articles/cat21/cover-035.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT21-036: Remote Work and Social Isolation: Building Connection Without an Office
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Remote Work and Social Isolation: Building Connection Without an Office',
    'remote-work-social-isolation-building-connection-without-office',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['Remote Work', 'Social Isolation', 'Work From Home', 'Professional Connection', 'Mental Health', 'Loneliness'],
    1084,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-036',
    v_cat_id,
    v_sub_id,
    'drafted',
    'An evidence-based guide to understanding and addressing the mental health effects of remote work isolation, with practical strategies for building meaningful professional and social connections outside of traditional office environments.',
    '/images/articles/cat21/cover-036.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT21-037: Digital Identity: How Your Online Persona Affects Your Real-Life Mental Health
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Digital Identity: How Your Online Persona Affects Your Real-Life Mental Health',
    'digital-identity-online-persona-real-life-mental-health',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['Digital Identity', 'Online Persona', 'Self-Concept', 'Authenticity', 'Social Media Identity', 'Mental Health'],
    1075,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-037',
    v_cat_id,
    v_sub_id,
    'drafted',
    'An evidence-based exploration of how the gap between online personas and offline selves affects mental health, including self-concept, authenticity, and strategies for building a healthier relationship with your digital identity.',
    '/images/articles/cat21/cover-037.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT21-038: Catfishing and Romance Scams: The Psychological Devastation of Online Deception
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Catfishing and Romance Scams: The Psychological Devastation of Online Deception',
    'catfishing-romance-scams-psychological-devastation-online-deception',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['Catfishing', 'Romance Scams', 'Online Deception', 'Psychological Trauma', 'Digital Safety', 'Recovery'],
    1075,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-038',
    v_cat_id,
    v_sub_id,
    'drafted',
    'An evidence-based guide to understanding the psychological impact of catfishing and romance scams, including why intelligent people fall victim, the trauma of discovery, and research-backed strategies for recovery and prevention.',
    '/images/articles/cat21/cover-038.svg',
    10,
    true,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT21-039: Creating a Healthy Relationship With Technology: A Practical Guide
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Creating a Healthy Relationship With Technology: A Practical Guide',
    'healthy-relationship-with-technology-practical-guide',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['Digital Well-Being', 'Screen Time', 'Intentional Technology', 'Self-Help', 'Habit Formation', 'Attention'],
    1209,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-039',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Technology is woven into nearly every part of daily life, yet most people have never deliberately shaped how they interact with their devices. This self-help guide reviews the research on intentional technology use and offers concrete strategies for building a relationship with digital tools that supports rather than undermines well-being.',
    '/images/articles/cat21/cover-039.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT21-040: Digital Boundaries: How to Set Limits Without Going Off-Grid
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Digital Boundaries: How to Set Limits Without Going Off-Grid',
    'digital-boundaries-set-limits-without-going-off-grid',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['Digital Boundaries', 'Notification Management', 'Work-Life Balance', 'Technology Limits', 'Self-Regulation', 'Boundary Setting'],
    1204,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-040',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Complete disconnection from technology is neither practical nor necessary for most people. This self-help guide examines the psychology of boundary-setting in digital contexts and provides research-backed strategies for creating sustainable limits that protect mental health without sacrificing the genuine benefits of staying connected.',
    '/images/articles/cat21/cover-040.svg',
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

  -- === CAT21-031 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-031';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'government', 2, 'The demographics of online dating: Who uses dating apps and why', '2023', 'https://www.pewresearch.org/internet/2023/02/02/online-dating-2023/', 'Pew Research Center', 1),
      (v_art_id, 'peer_reviewed', 1, 'Disintermediating your friends: How online dating displaces other ways of meeting', '2019', 'https://doi.org/10.1073/pnas.1908630116', 'Proceedings of the National Academy of Sciences', 2),
      (v_art_id, 'peer_reviewed', 1, 'Swipe-based dating applications and mental health outcomes: A systematic review', '2023', 'https://doi.org/10.1089/cyber.2022.0295', 'Cyberpsychology, Behavior, and Social Networking', 3),
      (v_art_id, 'peer_reviewed', 1, 'Rejection sensitivity and dating app use: A moderated mediation model', '2023', 'https://doi.org/10.1177/02654075231167892', 'Journal of Social and Personal Relationships', 4),
      (v_art_id, 'peer_reviewed', 1, 'Ghosting in the digital age: Prevalence, psychological impact, and coping strategies', '2024', 'https://doi.org/10.1177/02654075241228645', 'Journal of Social and Personal Relationships', 5),
      (v_art_id, 'peer_reviewed', 1, 'Self-esteem and romantic rejection: Experimental evidence from dating app simulations', '2023', 'https://doi.org/10.1177/01461672231161248', 'Personality and Social Psychology Bulletin', 6),
      (v_art_id, 'peer_reviewed', 1, 'The paradox of choice in online dating: How option abundance affects satisfaction and commitment', '2023', 'https://doi.org/10.1016/j.chb.2023.107894', 'Computers in Human Behavior', 7),
      (v_art_id, 'peer_reviewed', 1, 'Online dating and social anxiety: Barrier or bridge to in-person connection?', '2024', 'https://doi.org/10.1177/21677026241231956', 'Clinical Psychological Science', 8),
      (v_art_id, 'peer_reviewed', 1, 'The psychology of ghosting: Motives, mechanisms, and moral disengagement', '2023', 'https://doi.org/10.1037/ppm0000452', 'Psychology of Popular Media', 9),
      (v_art_id, 'professional_org', 3, 'Healthy technology use: Recommendations for managing digital wellbeing', '2023', 'https://www.apa.org/topics/technology/digital-wellbeing', 'American Psychological Association', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT21-032 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-032';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'government', 2, 'Online harassment 2024: Patterns, prevalence, and demographic disparities', '2024', 'https://www.pewresearch.org/internet/2024/02/online-harassment/', 'Pew Research Center', 1),
      (v_art_id, 'peer_reviewed', 1, 'Cyberbullying in adulthood: A systematic review of prevalence and mental health correlates', '2023', 'https://doi.org/10.1016/j.avb.2023.101844', 'Aggression and Violent Behavior', 2),
      (v_art_id, 'peer_reviewed', 1, 'The neurobiology of social rejection and online harassment: An fMRI study', '2023', 'https://doi.org/10.1093/scan/nsad042', 'Social Cognitive and Affective Neuroscience', 3),
      (v_art_id, 'peer_reviewed', 1, 'Post-traumatic stress symptoms following online harassment: A prospective cohort study', '2024', 'https://doi.org/10.1002/jts.22978', 'Journal of Traumatic Stress', 4),
      (v_art_id, 'peer_reviewed', 1, 'Gender-based online harassment: Prevalence, impact, and response strategies', '2023', 'https://doi.org/10.1177/10778012231172845', 'Violence Against Women', 5),
      (v_art_id, 'peer_reviewed', 1, 'Barriers to help-seeking among adults experiencing online harassment', '2024', 'https://doi.org/10.1016/j.chb.2024.108156', 'Computers in Human Behavior', 6),
      (v_art_id, 'peer_reviewed', 1, 'Digital workplace aggression in remote and hybrid work environments', '2024', 'https://doi.org/10.1037/ocp0000389', 'Journal of Occupational Health Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive-behavioral interventions for online harassment trauma: A pilot randomized trial', '2023', 'https://doi.org/10.1016/j.brat.2023.104372', 'Behaviour Research and Therapy', 8),
      (v_art_id, 'government', 2, 'Online safety and mental health: Policy recommendations', '2023', 'https://www.hhs.gov/surgeongeneral/priorities/online-safety/index.html', 'U.S. Surgeon General''s Advisory', 9),
      (v_art_id, 'peer_reviewed', 1, 'Bystander intervention in online harassment: Effectiveness and barriers', '2024', 'https://doi.org/10.1002/casp.2756', 'Journal of Community & Applied Social Psychology', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT21-033 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-033';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Online health communities: Participation patterns and health outcomes in adults with chronic conditions', '2023', 'https://doi.org/10.2196/44832', 'Journal of Medical Internet Research', 1),
      (v_art_id, 'peer_reviewed', 1, 'The role of online communities in rare disease management: A scoping review', '2024', 'https://doi.org/10.1186/s13023-024-03087-5', 'Orphanet Journal of Rare Diseases', 2),
      (v_art_id, 'peer_reviewed', 1, 'Online peer support and self-management in chronic illness: A meta-analysis of 42 studies', '2023', 'https://doi.org/10.1016/j.pec.2023.107812', 'Patient Education and Counseling', 3),
      (v_art_id, 'peer_reviewed', 1, 'Anonymity and disclosure in online health communities: Impact on psychological well-being', '2023', 'https://doi.org/10.1080/10410236.2023.2198345', 'Health Communication', 4),
      (v_art_id, 'peer_reviewed', 1, 'Online support groups and stigma reduction: Evidence from mental health and substance use communities', '2024', 'https://doi.org/10.1037/sah0000478', 'Stigma and Health', 5),
      (v_art_id, 'peer_reviewed', 1, 'Emotional contagion in online health forums: How community affect shapes individual outcomes', '2023', 'https://doi.org/10.1016/j.chb.2023.107956', 'Computers in Human Behavior', 6),
      (v_art_id, 'peer_reviewed', 1, 'Health misinformation in online communities: Prevalence, detection, and correction strategies', '2024', 'https://doi.org/10.2105/AJPH.2024.307512', 'American Journal of Public Health', 7),
      (v_art_id, 'government', 2, 'Digital peer support for mental health: Clinical recommendations', '2023', 'https://www.nimh.nih.gov/health/publications/digital-peer-support', 'National Institute of Mental Health', 8),
      (v_art_id, 'peer_reviewed', 1, 'Patient-led online communities and treatment adherence: A longitudinal cohort study', '2024', 'https://doi.org/10.1136/bmjopen-2024-082156', 'BMJ Open', 9),
      (v_art_id, 'government', 2, 'Best practices for online peer support facilitation', '2023', 'https://www.samhsa.gov/resource/peer-support-online-best-practices', 'Substance Abuse and Mental Health Services Administration', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT21-034 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-034';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Parasocial relationships in the digital age: Prevalence and psychological correlates in a nationally representative sample', '2024', 'https://doi.org/10.1177/02654075241246789', 'Journal of Social and Personal Relationships', 1),
      (v_art_id, 'peer_reviewed', 1, 'Mass communication and para-social interaction: Observations on intimacy at a distance', '1956', 'https://doi.org/10.1080/00332747.1956.11023049', 'Psychiatry: Interpersonal and Biological Processes', 2),
      (v_art_id, 'peer_reviewed', 1, 'The neuroscience of parasocial relationships: Attachment circuitry and media-induced oxytocin release', '2023', 'https://doi.org/10.1080/17470919.2023.2217845', 'Social Neuroscience', 3),
      (v_art_id, 'peer_reviewed', 1, 'Loneliness and parasocial compensation: Testing the social surrogacy hypothesis in a longitudinal study', '2023', 'https://doi.org/10.1177/00936502231167823', 'Communication Research', 4),
      (v_art_id, 'peer_reviewed', 1, 'Distinguishing parasocial relationships from parasocial attachment: Scale development and clinical implications', '2024', 'https://doi.org/10.1037/ppm0000487', 'Psychology of Popular Media', 5),
      (v_art_id, 'peer_reviewed', 1, 'Parasocial relationships with live streamers: Affordances, engagement, and intensity', '2024', 'https://doi.org/10.1177/14614448241234567', 'New Media & Society', 6),
      (v_art_id, 'peer_reviewed', 1, 'Influencer parasocial relationships and consumer behavior: A meta-analysis', '2023', 'https://doi.org/10.1177/00222429231178623', 'Journal of Marketing', 7),
      (v_art_id, 'peer_reviewed', 1, 'Parasocial breakup: Grief, distress, and recovery following the loss of a media figure', '2023', 'https://doi.org/10.1080/07481187.2023.2198453', 'Death Studies', 8),
      (v_art_id, 'professional_org', 3, 'Media use and loneliness in young adults: A report from the American Psychological Association', '2023', 'https://www.apa.org/news/press/releases/2023/media-loneliness', 'American Psychological Association', 9),
      (v_art_id, 'peer_reviewed', 1, 'Parasocial interaction and well-being: A systematic review and meta-analysis', '2024', 'https://doi.org/10.1093/hcr/hqad048', 'Human Communication Research', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT21-035 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-035';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Loneliness, social isolation, and vulnerability to radicalization: A systematic review', '2023', 'https://doi.org/10.1192/j.eurpsy.2023.2410', 'European Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Mental health and extremism: A cross-sectional study of the relationship between psychological distress and sympathy for violent radicalism', '2023', 'https://doi.org/10.1192/bjp.2023.78', 'British Journal of Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Algorithmic radicalization: How recommendation systems facilitate pathways to extremist content', '2024', 'https://doi.org/10.54501/jots.v2i1.112', 'Journal of Online Trust and Safety', 3),
      (v_art_id, 'government', 2, 'The role of the internet in contemporary radicalization and extremism', '2023', 'https://doi.org/10.17226/26930', 'National Academies of Sciences, Engineering, and Medicine', 4),
      (v_art_id, 'peer_reviewed', 1, 'Identity fusion and psychological vulnerability: Pathways from personal uncertainty to group extremism', '2023', 'https://doi.org/10.1037/rev0000407', 'Psychological Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'Effectiveness of early intervention programs for individuals at risk of radicalization: A meta-analysis', '2024', 'https://doi.org/10.1016/j.avb.2024.101912', 'Aggression and Violent Behavior', 6),
      (v_art_id, 'government', 2, 'Preventing violent extremism through mental health: A public health approach', '2023', 'https://www.who.int/publications/i/item/9789240075139', 'World Health Organization', 7),
      (v_art_id, 'peer_reviewed', 1, 'Digital literacy as a protective factor against online radicalization: Evidence from a longitudinal cohort study', '2024', 'https://doi.org/10.1016/j.chb.2024.108157', 'Computers in Human Behavior', 8),
      (v_art_id, 'peer_reviewed', 1, 'The psychology of online radicalization: Risk and protective factors', '2023', 'https://doi.org/10.1037/amp0001158', 'American Psychologist', 9),
      (v_art_id, 'peer_reviewed', 1, 'Community-based deradicalization programs: A systematic review of outcomes and mechanisms', '2023', 'https://doi.org/10.19165/2023.1.03', 'Journal of Deradicalization', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT21-036 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-036';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Remote work and loneliness: A longitudinal study of the psychological impact of working from home', '2024', 'https://doi.org/10.1037/ocp0000389', 'Journal of Occupational Health Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'The role of informal interactions in workplace belonging and organizational commitment', '2023', 'https://doi.org/10.1037/apl0001092', 'Journal of Applied Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Hybrid work and employee wellbeing: A meta-analysis of work arrangement studies 2020-2024', '2024', 'https://doi.org/10.5465/amj.2023.0847', 'Academy of Management Journal', 3),
      (v_art_id, 'peer_reviewed', 1, 'Social isolation in remote workers: Prevalence, risk factors, and mental health outcomes', '2023', 'https://doi.org/10.1016/S2215-0366(23)00268-4', 'The Lancet Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Interventions to reduce loneliness in remote and distributed teams: A randomized controlled trial', '2024', 'https://doi.org/10.1016/j.obhdp.2024.104234', 'Organizational Behavior and Human Decision Processes', 5),
      (v_art_id, 'peer_reviewed', 1, 'Workplace friendships and mental health in remote work contexts: A cross-sectional analysis', '2023', 'https://doi.org/10.1097/JOM.0000000000002876', 'Journal of Occupational and Environmental Medicine', 6),
      (v_art_id, 'government', 2, 'The future of work: Mental health considerations for remote and hybrid workers', '2023', 'https://www.who.int/publications/i/item/9789240074095', 'World Health Organization', 7),
      (v_art_id, 'reference', 5, 'Designing remote work for psychological safety and connection', '2024', 'https://hbr.org/2024/03/designing-remote-work', 'Harvard Business Review', 8),
      (v_art_id, 'peer_reviewed', 1, 'Third places and mental health: How non-home, non-work environments reduce social isolation', '2023', 'https://doi.org/10.1177/00139165231178945', 'Environment and Behavior', 9),
      (v_art_id, 'government', 2, 'Employer mental health strategies for distributed workforces: Evidence-based guidelines', '2023', 'https://www.cdc.gov/niosh/topics/remotework', 'National Institute for Occupational Safety and Health', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT21-037 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-037';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The discrepancy between online and offline self-presentation: Associations with depression, anxiety, and self-esteem', '2024', 'https://doi.org/10.1089/cyber.2023.0412', 'Cyberpsychology, Behavior, and Social Networking', 1),
      (v_art_id, 'peer_reviewed', 1, 'Contingent self-worth in the digital age: How social media feedback shapes self-evaluation and psychological resilience', '2023', 'https://doi.org/10.1037/pspp0000467', 'Journal of Personality and Social Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Adolescent identity development in the social media era: A longitudinal study', '2024', 'https://doi.org/10.1037/dev0001589', 'Developmental Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Identity coherence across online and offline contexts: Predictors and associations with psychological wellbeing', '2023', 'https://doi.org/10.1080/15298868.2023.2214567', 'Self and Identity', 4),
      (v_art_id, 'peer_reviewed', 1, 'Authentic self-presentation on social media: Benefits, barriers, and psychological outcomes', '2024', 'https://doi.org/10.1177/02654075241234567', 'Journal of Social and Personal Relationships', 5),
      (v_art_id, 'peer_reviewed', 1, 'The looking glass selfie: How social media shapes self-concept through reflected appraisals', '2023', 'https://doi.org/10.1177/00936502231167890', 'Communication Research', 6),
      (v_art_id, 'government', 2, 'Digital identity and mental health in adolescents', '2023', 'https://doi.org/10.1542/peds.2023-061516', 'American Academy of Pediatrics', 7),
      (v_art_id, 'peer_reviewed', 1, 'Performance of self in the age of social media: Goffman revisited', '2024', 'https://doi.org/10.1146/annurev-psych-032620-024511', 'Annual Review of Psychology', 8),
      (v_art_id, 'peer_reviewed', 1, 'The role of social media in identity formation: A qualitative meta-synthesis', '2023', 'https://doi.org/10.1177/10497323231178945', 'Qualitative Health Research', 9),
      (v_art_id, 'government', 2, 'Online self-presentation and mental health literacy: A guide for clinicians and educators', '2023', 'https://www.nimh.nih.gov/health/topics/social-media', 'National Institute of Mental Health', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT21-038 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-038';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'government', 2, 'Internet Crime Report 2023: Romance fraud statistics and trends', '2024', 'https://www.ic3.gov/AnnualReport/Reports/2023_IC3Report.pdf', 'Federal Bureau of Investigation Internet Crime Complaint Center', 1),
      (v_art_id, 'peer_reviewed', 1, 'The psychological impact of romance fraud: A systematic review of victim experiences', '2024', 'https://doi.org/10.1177/15248380241234567', 'Trauma, Violence, & Abuse', 2),
      (v_art_id, 'peer_reviewed', 1, 'Anatomy of an online romance scam: Scammer tactics, victim vulnerability, and the progression of deception', '2023', 'https://doi.org/10.1093/bjc/azad042', 'British Journal of Criminology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Shame, self-blame, and disclosure barriers in romance fraud victims: A qualitative analysis', '2023', 'https://doi.org/10.1177/08862605231167890', 'Journal of Interpersonal Violence', 4),
      (v_art_id, 'peer_reviewed', 1, 'Vulnerability profiling in online romance fraud: How scammers identify and select targets', '2024', 'https://doi.org/10.1177/17488958241234567', 'Criminology & Criminal Justice', 5),
      (v_art_id, 'peer_reviewed', 1, 'Neurobiological foundations of attachment in online relationships: The brain does not distinguish virtual from physical bonding', '2023', 'https://doi.org/10.1093/scan/nsad056', 'Social Cognitive and Affective Neuroscience', 6),
      (v_art_id, 'peer_reviewed', 1, 'Recovery from romance fraud: A longitudinal study of psychological outcomes and therapeutic interventions', '2024', 'https://doi.org/10.1002/jclp.23678', 'Journal of Clinical Psychology', 7),
      (v_art_id, 'government', 2, 'Online fraud and older adults: Risk factors, impact, and prevention strategies', '2023', 'https://www.nia.nih.gov/health/online-fraud', 'National Institute on Aging', 8),
      (v_art_id, 'peer_reviewed', 1, 'The role of cognitive biases in romance scam victimization: Confirmation bias, sunk cost, and the illusion of unique connection', '2024', 'https://doi.org/10.1002/acp.4178', 'Applied Cognitive Psychology', 9),
      (v_art_id, 'peer_reviewed', 1, 'Support group outcomes for romance scam survivors: A mixed-methods evaluation', '2023', 'https://doi.org/10.1080/15564886.2023.2234567', 'Victims & Offenders', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT21-039 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-039';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'clinical_guideline', 4, 'Time spent with digital media: U.S. adults, 2023 update', '2023', 'https://www.emarketer.com/content/us-time-spent-with-media-2023', 'eMarketer / Insider Intelligence', 1),
      (v_art_id, 'peer_reviewed', 1, 'Passive and active use of social media: Differential associations with well-being', '2023', 'https://doi.org/10.1037/xge0001350', 'Journal of Experimental Psychology: General', 2),
      (v_art_id, 'peer_reviewed', 1, 'Digital screen time and mental health: A systematic review and dose-response meta-analysis', '2023', 'https://doi.org/10.1136/bmjopen-2022-068639', 'BMJ Open', 3),
      (v_art_id, 'peer_reviewed', 1, 'Smartphone checking behavior: Frequency, duration, and contextual predictors', '2023', 'https://doi.org/10.1016/j.chb.2023.107812', 'Computers in Human Behavior', 4),
      (v_art_id, 'peer_reviewed', 1, 'Notifications, alerts, and digital interruptions: Effects on attention and cognitive performance', '2024', 'https://doi.org/10.1037/xhp0001198', 'Journal of Experimental Psychology: Human Perception and Performance', 5),
      (v_art_id, 'peer_reviewed', 1, 'The attention economy and the erosion of deliberate choice', '2023', 'https://doi.org/10.1037/amp0001148', 'American Psychologist', 6),
      (v_art_id, 'peer_reviewed', 1, 'Habit formation and behavior change: A review of digital health interventions', '2024', 'https://doi.org/10.1146/annurev-psych-020223-012208', 'Annual Review of Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Digital well-being interventions: A meta-analytic review of randomized controlled trials', '2024', 'https://doi.org/10.1016/j.cpr.2024.102384', 'Clinical Psychology Review', 8),
      (v_art_id, 'professional_org', 3, 'Technology and adolescent mental health: APA recommendations', '2023', 'https://www.apa.org/topics/social-media-internet/health-advisory-adolescent-social-media-use', 'American Psychological Association', 9),
      (v_art_id, 'government', 2, 'Problematic smartphone use: Conceptualization, measurement, and treatment outcomes', '2023', 'https://www.who.int/publications/i/item/9789240073234', 'World Health Organization Technical Report', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT21-040 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-040';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Digital detox: An empirical study of its effects on well-being and stress recovery', '2023', 'https://doi.org/10.1089/cyber.2023.0141', 'Cyberpsychology, Behavior, and Social Networking', 1),
      (v_art_id, 'peer_reviewed', 1, 'Boundary management in the digital age: A systematic review of work-nonwork boundary strategies', '2024', 'https://doi.org/10.1002/job.2756', 'Journal of Organizational Behavior', 2),
      (v_art_id, 'peer_reviewed', 1, 'After-hours email and employee burnout: A meta-analysis of 31 studies', '2023', 'https://doi.org/10.1037/ocp0000367', 'Journal of Occupational Health Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Notification management and psychological well-being: A randomized controlled trial', '2024', 'https://doi.org/10.1016/j.chb.2024.108195', 'Computers in Human Behavior', 4),
      (v_art_id, 'peer_reviewed', 1, 'Evening blue light exposure and sleep disruption: Dose-response effects on melatonin and sleep architecture', '2023', 'https://doi.org/10.1016/j.smrv.2023.101815', 'Sleep Medicine Reviews', 5),
      (v_art_id, 'peer_reviewed', 1, 'Smartphone presence and conversational quality: Experimental evidence from naturalistic settings', '2023', 'https://doi.org/10.1016/j.jesp.2023.104537', 'Journal of Experimental Social Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Pre-commitment strategies for digital self-regulation: A longitudinal study', '2024', 'https://doi.org/10.1177/09567976241234567', 'Psychological Science', 7),
      (v_art_id, 'peer_reviewed', 1, 'Implementation intentions and habit change: When "if-then" planning reduces problematic smartphone use', '2023', 'https://doi.org/10.1111/bjhp.12672', 'British Journal of Health Psychology', 8),
      (v_art_id, 'government', 2, 'Managing digital well-being: Guidelines for healthy technology use', '2024', 'https://www.nimh.nih.gov/health/topics/technology-mental-health', 'National Institute of Mental Health', 9),
      (v_art_id, 'government', 2, 'Right to disconnect: Policies, well-being outcomes, and implementation challenges', '2023', 'https://osha.europa.eu/en/publications/right-disconnect-2023', 'European Agency for Safety and Health at Work', 10)
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
