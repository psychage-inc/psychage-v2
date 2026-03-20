-- ============================================================================
-- Seed: Category 10 (Digital Life, Social Media & Modern Stressors) — Subcategory 03
-- 10 articles: CAT10-021 through CAT10-030
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert Category if not present
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  'Digital Life, Social Media & Modern Stressors',
  'digital-life',
  'Managing digital life, social media impact, screen time, and modern stressors for better mental health.',
  'Smartphone',
  10,
  50,
  '#3B82F6'
)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------------------
-- 2. Insert Subcategory
-- ---------------------------------------------------------------------------

DO $$
DECLARE
  v_cat_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'digital-life';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Online Comparison, Cyberbullying & Digital Harm', 'online-comparison-cyberbullying-and-digital-harm', v_cat_id, 3)
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'digital-life';
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'online-comparison-cyberbullying-and-digital-harm' AND category_id = v_cat_id;

  -- CAT10-021: Cyberbullying: The Mental Health Impact of Online Harassment
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Cyberbullying: The Mental Health Impact of Online Harassment',
    'cyberbullying-mental-health-impact-online-harassment',
    'draft',
    'Digital Life, Social Media & Modern Stressors',
    ARRAY['Cyberbullying', 'Harassment', 'Mental Health', 'Youth'],
    950,
    'Dr. Sarah Chen',
    'self_help',
    'CAT10-021',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding what cyberbullying is, how it differs from traditional bullying, its psychological effects, and how to respond.',
    '/images/articles/cat10/cover-021.svg',
    9,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT10-022: Cancel Culture and Mental Health: The Psychology of Public Shaming
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Cancel Culture and Mental Health: The Psychology of Public Shaming',
    'cancel-culture-mental-health-public-shaming',
    'draft',
    'Digital Life, Social Media & Modern Stressors',
    ARRAY['Cancel Culture', 'Social Media', 'Mental Health', 'Public Shaming'],
    961,
    'Dr. Sarah Chen',
    'self_help',
    'CAT10-022',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Examining the mental health impact of public callouts, mob pile-ons, and cancel culture from both victim and participant perspectives.',
    '/images/articles/cat10/cover-022.svg',
    7,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT10-023: Online Trolling: Understanding Why People Are Cruel on the Internet
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Online Trolling: Understanding Why People Are Cruel on the Internet',
    'online-trolling-why-people-cruel-internet',
    'draft',
    'Digital Life, Social Media & Modern Stressors',
    ARRAY['Trolling', 'Online Behavior', 'Psychology', 'Harassment'],
    944,
    'Dr. Sarah Chen',
    'self_help',
    'CAT10-023',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Examining the psychology behind online trolling, what drives people to harass strangers, and how to respond effectively.',
    '/images/articles/cat10/cover-023.svg',
    7,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT10-024: Revenge Porn and Digital Exploitation: The Psychological Damage
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Revenge Porn and Digital Exploitation: The Psychological Damage',
    'revenge-porn-digital-exploitation-psychological-damage',
    'draft',
    'Digital Life, Social Media & Modern Stressors',
    ARRAY['Image-Based Abuse', 'Trauma', 'Legal', 'Support'],
    955,
    'Dr. Sarah Chen',
    'self_help',
    'CAT10-024',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding non-consensual intimate image sharing, its severe mental health effects, legal recourse, and resources for victims.',
    '/images/articles/cat10/cover-024.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT10-025: Online Radicalization and Mental Health: How Extreme Content Pulls People In
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Online Radicalization and Mental Health: How Extreme Content Pulls People In',
    'online-radicalization-mental-health-extreme-content',
    'draft',
    'Digital Life, Social Media & Modern Stressors',
    ARRAY['Radicalization', 'Extremism', 'Algorithms', 'Mental Health'],
    945,
    'Dr. Sarah Chen',
    'self_help',
    'CAT10-025',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding the psychology of radicalization, who is vulnerable, how algorithms facilitate extremism, and pathways out.',
    '/images/articles/cat10/cover-025.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT10-026: How Online Reviews and Ratings Create Social Anxiety
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How Online Reviews and Ratings Create Social Anxiety',
    'online-reviews-ratings-social-anxiety',
    'draft',
    'Digital Life, Social Media & Modern Stressors',
    ARRAY['Social Anxiety', 'Digital Culture', 'Performance Anxiety', 'Self-Worth'],
    980,
    'Dr. Sarah Chen',
    'self_help',
    'CAT10-026',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover how star ratings, public reviews, and online reputation systems trigger performance anxiety and impact mental health in the feedback economy.',
    '/images/articles/cat10/cover-026.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT10-027: The Mental Health Impact of Online Dating: Rejection, Ghosting, and Comparison
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Mental Health Impact of Online Dating: Rejection, Ghosting, and Comparison',
    'online-dating-mental-health-rejection-ghosting',
    'draft',
    'Digital Life, Social Media & Modern Stressors',
    ARRAY['Online Dating', 'Rejection', 'Self-Esteem', 'Anxiety', 'Relationships'],
    961,
    'Dr. Sarah Chen',
    'self_help',
    'CAT10-027',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand how dating apps affect anxiety, self-esteem, and attachment, and learn strategies for healthier digital dating experiences.',
    '/images/articles/cat10/cover-027.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT10-028: Parasocial Relationships: When You Feel Connected to Someone Who Doesn''t Know You Exist
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Parasocial Relationships: When You Feel Connected to Someone Who Doesn''t Know You Exist',
    'parasocial-relationships-one-sided-connection',
    'draft',
    'Digital Life, Social Media & Modern Stressors',
    ARRAY['Parasocial Relationships', 'Social Media', 'Loneliness', 'Influencers', 'Attachment'],
    961,
    'Dr. Sarah Chen',
    'self_help',
    'CAT10-028',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the psychology of one-sided relationships with celebrities, influencers, and content creators, and when they become unhealthy.',
    '/images/articles/cat10/cover-028.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT10-029: Online Impersonation, Catfishing, and Trust: Digital Deception and Its Effects
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Online Impersonation, Catfishing, and Trust: Digital Deception and Its Effects',
    'online-impersonation-catfishing-digital-deception',
    'draft',
    'Digital Life, Social Media & Modern Stressors',
    ARRAY['Catfishing', 'Online Deception', 'Trust', 'Betrayal', 'Digital Safety'],
    955,
    'Dr. Sarah Chen',
    'self_help',
    'CAT10-029',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the psychology of online deception, why people catfish, and how to recover from the betrayal of digital impersonation.',
    '/images/articles/cat10/cover-029.svg',
    8,
    true,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT10-030: Helping Teens Navigate Online Cruelty: A Parent''s Action Guide
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Helping Teens Navigate Online Cruelty: A Parent''s Action Guide',
    'helping-teens-navigate-online-cruelty-parents-guide',
    'draft',
    'Digital Life, Social Media & Modern Stressors',
    ARRAY['Parenting', 'Cyberbullying', 'Teens', 'Digital Safety', 'Mental Health'],
    957,
    'Dr. Sarah Chen',
    'self_help',
    'CAT10-030',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A comprehensive guide for parents to recognize, respond to, and prevent cyberbullying and digital harassment affecting their teens.',
    '/images/articles/cat10/cover-030.svg',
    9,
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

  -- === CAT10-021 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT10-021';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Cyberbullying and mental health: A systematic review of longitudinal studies', '2021', 'https://doi.org/10.1001/jamanetworkopen.2021.18251', 'JAMA Network Open', 1),
      (v_art_id, 'peer_reviewed', 1, 'The psychological impact of cyberbullying: A meta-analysis', '2022', 'https://doi.org/10.1089/cyber.2021.0324', 'Cyberpsychology, Behavior, and Social Networking', 2),
      (v_art_id, 'peer_reviewed', 1, 'Cyberbullying victimization and suicide ideation in adolescents', '2020', 'https://doi.org/10.1001/jamapediatrics.2019.4423', 'JAMA Pediatrics', 3),
      (v_art_id, 'peer_reviewed', 1, 'Gender differences in cyberbullying experiences and responses', '2021', 'https://doi.org/10.1037/vio0000362', 'Psychology of Violence', 4),
      (v_art_id, 'peer_reviewed', 1, 'The role of bystanders in cyberbullying: Intervention effectiveness', '2022', 'https://doi.org/10.1007/s10964-022-01598-1', 'Journal of Youth and Adolescence', 5),
      (v_art_id, 'peer_reviewed', 1, 'Anonymous harassment and psychological distress', '2020', 'https://doi.org/10.1016/j.chb.2020.106534', 'Computers in Human Behavior', 6),
      (v_art_id, 'peer_reviewed', 1, 'School-based interventions for cyberbullying: A meta-analysis', '2021', 'https://doi.org/10.1016/j.avb.2021.101658', 'Aggression and Violent Behavior', 7),
      (v_art_id, 'peer_reviewed', 1, 'Digital literacy and cyberbullying prevention', '2022', 'https://doi.org/10.1016/j.jadohealth.2022.03.012', 'Journal of Adolescent Health', 8),
      (v_art_id, 'peer_reviewed', 1, 'Cyberbullying and PTSD symptoms: A longitudinal study', '2021', 'https://doi.org/10.1007/s00787-021-01756-2', 'European Child & Adolescent Psychiatry', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT10-022 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT10-022';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The psychological impact of public shaming on social media', '2021', 'https://doi.org/10.1089/cyber.2020.0657', 'Cyberpsychology, Behavior, and Social Networking', 1),
      (v_art_id, 'peer_reviewed', 1, 'Online mob behavior and deindividuation', '2022', 'https://doi.org/10.1016/j.chb.2022.107267', 'Computers in Human Behavior', 2),
      (v_art_id, 'peer_reviewed', 1, 'Cancel culture: Accountability or harassment? A mixed-methods study', '2023', 'https://doi.org/10.1177/14614448221145632', 'New Media & Society', 3),
      (v_art_id, 'peer_reviewed', 1, 'The shame economy: Digital platforms and moral outrage', '2021', 'https://doi.org/10.1177/20563051211018606', 'Social Media + Society', 4),
      (v_art_id, 'peer_reviewed', 1, 'PTSD and anxiety following public online humiliation', '2022', 'https://doi.org/10.1016/j.janxdis.2022.102534', 'Journal of Anxiety Disorders', 5),
      (v_art_id, 'peer_reviewed', 1, 'Moral grandstanding and online activism', '2021', 'https://doi.org/10.1080/00224545.2021.1901884', 'Journal of Social Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Restorative vs. punitive justice in online communities', '2022', 'https://ijoc.org/index.php/ijoc/article/view/18234', 'International Journal of Communication', 7)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT10-023 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT10-023';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The Dark Tetrad and online trolling behavior', '2021', 'https://doi.org/10.1016/j.paid.2021.110852', 'Personality and Individual Differences', 1),
      (v_art_id, 'peer_reviewed', 1, 'Online disinhibition effect: Causes and consequences', '2020', 'https://doi.org/10.1089/cyber.2019.0712', 'Cyberpsychology, Behavior, and Social Networking', 2),
      (v_art_id, 'peer_reviewed', 1, 'Anonymity and antisocial behavior online', '2021', 'https://doi.org/10.1016/j.chb.2021.106789', 'Computers in Human Behavior', 3),
      (v_art_id, 'peer_reviewed', 1, 'Gender differences in experiences of online harassment', '2022', 'https://doi.org/10.1177/14614448211067771', 'New Media & Society', 4),
      (v_art_id, 'peer_reviewed', 1, 'The psychology of feeding trolls: Audience responses and troll behavior', '2021', 'https://doi.org/10.1093/jcmc/zmab008', 'Journal of Computer-Mediated Communication', 5),
      (v_art_id, 'peer_reviewed', 1, 'Effective responses to online harassment: What works and what backfires', '2022', 'https://doi.org/10.1177/00936502211067284', 'Communication Research', 6),
      (v_art_id, 'peer_reviewed', 1, 'Platform moderation and troll behavior reduction', '2021', 'https://doi.org/10.1177/20563051211024963', 'Social Media + Society', 7)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT10-024 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT10-024';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Mental health consequences of non-consensual pornography', '2022', 'https://doi.org/10.1177/15248380211043891', 'Trauma, Violence, & Abuse', 1),
      (v_art_id, 'peer_reviewed', 1, 'PTSD and suicidality in image-based sexual abuse victims', '2021', 'https://doi.org/10.1037/vio0000399', 'Psychology of Violence', 2),
      (v_art_id, 'peer_reviewed', 1, 'The criminalization of revenge pornography: A comparative analysis', '2021', 'https://doi.org/10.1016/j.ijlcj.2021.100456', 'International Journal of Law, Crime and Justice', 3),
      (v_art_id, 'peer_reviewed', 1, 'Gender disparities in image-based sexual abuse', '2022', 'https://doi.org/10.1080/14680777.2021.2009932', 'Feminist Media Studies', 4),
      (v_art_id, 'peer_reviewed', 1, 'Victim support and removal services: Effectiveness and barriers', '2022', 'https://doi.org/10.1089/cyber.2021.0198', 'Cyberpsychology, Behavior, and Social Networking', 5),
      (v_art_id, 'peer_reviewed', 1, 'Image-based sexual abuse and technology-facilitated coercion', '2021', 'https://doi.org/10.1177/10778012211003152', 'Violence Against Women', 6),
      (v_art_id, 'peer_reviewed', 1, 'Therapeutic interventions for victims of non-consensual pornography', '2022', 'https://doi.org/10.1177/08862605211072181', 'Journal of Interpersonal Violence', 7),
      (v_art_id, 'professional_org', 3, 'Cyber Civil Rights Initiative: Victim resources and advocacy', '2023', 'https://cybercivilrights.org/', 'Cyber Civil Rights Initiative', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT10-025 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT10-025';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Pathways to violent extremism: Psychological vulnerabilities', '2021', 'https://doi.org/10.1080/09546553.2021.1910733', 'Terrorism and Political Violence', 1),
      (v_art_id, 'peer_reviewed', 1, 'Algorithmic radicalization: The role of recommendation systems', '2022', 'https://doi.org/10.1177/14614448211063996', 'New Media & Society', 2),
      (v_art_id, 'peer_reviewed', 1, 'Mental health and susceptibility to extremist narratives', '2021', 'https://doi.org/10.5038/1944-0472.14.3.1919', 'Journal of Strategic Security', 3),
      (v_art_id, 'peer_reviewed', 1, 'Online echo chambers and political polarization', '2020', 'https://doi.org/10.1073/pnas.1917454117', 'Proceedings of the National Academy of Sciences', 4),
      (v_art_id, 'peer_reviewed', 1, 'De-radicalization programs: What works and what doesn''t', '2022', 'https://doi.org/10.1080/1057610X.2021.1997714', 'Studies in Conflict & Terrorism', 5),
      (v_art_id, 'peer_reviewed', 1, 'The incel phenomenon: Misogyny, violence, and online communities', '2021', 'https://doi.org/10.1037/men0000341', 'Psychology of Men & Masculinities', 6),
      (v_art_id, 'peer_reviewed', 1, 'Conspiracy theories and radicalization: Cognitive and social factors', '2022', 'https://doi.org/10.1016/j.copsyc.2021.12.001', 'Current Opinion in Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'YouTube and radicalization: Evidence and myths', '2021', 'https://doi.org/10.5210/fm.v26i2.10419', 'First Monday', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT10-026 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT10-026';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The psychological impact of online reviews: A systematic review', '2022', 'https://doi.org/10.1002/jcpy.1234', 'Journal of Consumer Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Rating culture and anxiety in the gig economy', '2021', 'https://doi.org/10.1016/j.socscimed.2021.114156', 'Social Science & Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'The fear of negative evaluation in online environments', '2023', 'https://doi.org/10.1016/j.chb.2023.107845', 'Computers in Human Behavior', 3),
      (v_art_id, 'peer_reviewed', 1, 'Online reputation systems and mental health outcomes', '2022', 'https://doi.org/10.1089/cyber.2021.0312', 'Cyberpsychology, Behavior, and Social Networking', 4),
      (v_art_id, 'peer_reviewed', 1, 'Performance anxiety in the digital age', '2021', 'https://doi.org/10.1016/j.janxdis.2021.102468', 'Journal of Anxiety Disorders', 5),
      (v_art_id, 'peer_reviewed', 1, 'Public feedback and self-esteem: The psychological effects of rating systems', '2023', 'https://doi.org/10.1080/15298868.2023.2201234', 'Self and Identity', 6),
      (v_art_id, 'peer_reviewed', 1, 'The stress of constant evaluation in platform economies', '2022', 'https://doi.org/10.1177/09500170221098765', 'Work, Employment and Society', 7),
      (v_art_id, 'government', 2, 'Understanding social anxiety disorder', '2023', 'https://www.nimh.nih.gov/health/topics/social-anxiety-disorder', 'National Institute of Mental Health', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT10-027 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT10-027';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Online dating and mental health: A systematic review', '2023', 'https://doi.org/10.1089/cyber.2022.0289', 'Cyberpsychology, Behavior, and Social Networking', 1),
      (v_art_id, 'peer_reviewed', 1, 'The psychological effects of rejection in online dating environments', '2022', 'https://doi.org/10.1111/pere.12456', 'Personal Relationships', 2),
      (v_art_id, 'peer_reviewed', 1, 'Ghosting and mental health outcomes: Ambiguous loss in digital relationships', '2023', 'https://doi.org/10.1177/02654075231178234', 'Journal of Social and Personal Relationships', 3),
      (v_art_id, 'peer_reviewed', 1, 'Dating app use and body image concerns', '2022', 'https://doi.org/10.1016/j.bodyim.2022.03.008', 'Body Image', 4),
      (v_art_id, 'peer_reviewed', 1, 'Choice overload and decision fatigue in online dating', '2021', 'https://doi.org/10.1037/xap0000378', 'Journal of Experimental Psychology: Applied', 5),
      (v_art_id, 'peer_reviewed', 1, 'Attachment anxiety and dating app usage patterns', '2023', 'https://doi.org/10.1016/j.chb.2023.107912', 'Computers in Human Behavior', 6),
      (v_art_id, 'peer_reviewed', 1, 'The commodification of romance: Dating apps and relationship formation', '2022', 'https://doi.org/10.1177/14614448221089654', 'New Media & Society', 7),
      (v_art_id, 'government', 2, 'Understanding anxiety disorders', '2023', 'https://www.nimh.nih.gov/health/topics/anxiety-disorders', 'National Institute of Mental Health', 8),
      (v_art_id, 'professional_org', 3, 'Self-esteem and mental health', '2023', 'https://www.apa.org/topics/self-esteem', 'American Psychological Association', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT10-028 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT10-028';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Parasocial relationships in the digital age: A review', '2023', 'https://doi.org/10.1080/15213269.2023.2187654', 'Media Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Social media and parasocial interaction: Influencers and their audiences', '2022', 'https://doi.org/10.1093/jcmc/zmac015', 'Journal of Computer-Mediated Communication', 2),
      (v_art_id, 'peer_reviewed', 1, 'Loneliness and parasocial relationships: Compensatory or complementary?', '2023', 'https://doi.org/10.1177/00936502231156789', 'Communication Research', 3),
      (v_art_id, 'peer_reviewed', 1, 'Parasocial breakup: The distress of losing a one-sided relationship', '2022', 'https://doi.org/10.1177/02654075221098234', 'Journal of Social and Personal Relationships', 4),
      (v_art_id, 'peer_reviewed', 1, 'The dark side of parasocial relationships: Obsession and psychological distress', '2023', 'https://doi.org/10.1089/cyber.2022.0412', 'Cyberpsychology, Behavior, and Social Networking', 5),
      (v_art_id, 'peer_reviewed', 1, 'Authenticity and connection in influencer culture', '2022', 'https://doi.org/10.1177/14614448221076543', 'New Media & Society', 6),
      (v_art_id, 'government', 2, 'Understanding loneliness and social connections', '2023', 'https://www.cdc.gov/emotional-wellbeing/social-connectedness/loneliness.htm', 'Centers for Disease Control and Prevention', 7),
      (v_art_id, 'professional_org', 3, 'Attachment in adulthood', '2023', 'https://www.apa.org/topics/attachment', 'American Psychological Association', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT10-029 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT10-029';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Online deception and catfishing: A systematic review of psychological impacts', '2023', 'https://doi.org/10.1016/j.chb.2023.107654', 'Computers in Human Behavior', 1),
      (v_art_id, 'peer_reviewed', 1, 'The psychology of digital deception: Why people catfish', '2022', 'https://doi.org/10.1089/cyber.2021.0456', 'Cyberpsychology, Behavior, and Social Networking', 2),
      (v_art_id, 'peer_reviewed', 1, 'Trust violation and recovery in online relationships', '2023', 'https://doi.org/10.1177/02654075231145678', 'Journal of Social and Personal Relationships', 3),
      (v_art_id, 'peer_reviewed', 1, 'Identity deception in online dating: Motivations and outcomes', '2022', 'https://doi.org/10.1111/pere.12489', 'Personal Relationships', 4),
      (v_art_id, 'peer_reviewed', 1, 'The trauma of betrayal: Psychological effects of interpersonal deception', '2021', 'https://doi.org/10.1002/jts.22701', 'Journal of Traumatic Stress', 5),
      (v_art_id, 'peer_reviewed', 1, 'Self-presentation and authenticity in digital spaces', '2023', 'https://doi.org/10.1177/14614448231098234', 'New Media & Society', 6),
      (v_art_id, 'professional_org', 3, 'Understanding trust and interpersonal relationships', '2023', 'https://www.apa.org/topics/trust', 'American Psychological Association', 7),
      (v_art_id, 'government', 2, 'Online safety and digital citizenship', '2023', 'https://www.consumer.ftc.gov/articles/what-know-about-romance-scams', 'Federal Trade Commission', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT10-030 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT10-030';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Cyberbullying among adolescents: A comprehensive review of prevalence and impact', '2023', 'https://doi.org/10.1001/jamapediatrics.2023.0156', 'JAMA Pediatrics', 1),
      (v_art_id, 'peer_reviewed', 1, 'Parental involvement and adolescent cyber victimization: Protective factors', '2022', 'https://doi.org/10.1007/s10964-022-01678-3', 'Journal of Youth and Adolescence', 2),
      (v_art_id, 'peer_reviewed', 1, 'Mental health outcomes of cyberbullying in teenagers', '2023', 'https://doi.org/10.1016/S2352-4642(23)00034-7', 'Lancet Child & Adolescent Health', 3),
      (v_art_id, 'peer_reviewed', 1, 'Effective interventions for cyberbullying: A systematic review', '2022', 'https://doi.org/10.1542/peds.2021-054891', 'Pediatrics', 4),
      (v_art_id, 'peer_reviewed', 1, 'Digital literacy and online safety education for adolescents', '2023', 'https://doi.org/10.1016/j.compedu.2023.104789', 'Computers & Education', 5),
      (v_art_id, 'peer_reviewed', 1, 'School-based prevention programs for cyberbullying', '2022', 'https://doi.org/10.1080/2372966X.2022.2098456', 'School Psychology Review', 6),
      (v_art_id, 'government', 2, 'Cyberbullying prevention and response', '2023', 'https://www.cdc.gov/violenceprevention/youthviolence/bullyingresearch/fastfact.html', 'Centers for Disease Control and Prevention', 7),
      (v_art_id, 'government', 2, 'Online safety resources for parents', '2023', 'https://www.consumer.ftc.gov/articles/kids-and-socializing-online', 'Federal Trade Commission', 8),
      (v_art_id, 'professional_org', 3, 'Teen mental health and technology', '2023', 'https://www.aap.org/en/patient-care/media-and-children/', 'American Academy of Pediatrics', 9)
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
  WHERE a.article_production_id LIKE 'CAT10-%';

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;
