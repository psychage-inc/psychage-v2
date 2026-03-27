-- ============================================================================
-- Seed: Category 21 (Technology, Digital Life & Mental Health) — Subcategory 02
-- 10 articles: CAT21-011 through CAT21-020
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
  VALUES ('Digital Addiction and Compulsive Use', 'digital-addiction-and-compulsive-use', v_cat_id, 2)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'digital-addiction-and-compulsive-use' AND category_id = v_cat_id;

  -- CAT21-011: Smartphone Addiction: Is It Real and What Can You Do About It?
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Smartphone Addiction: Is It Real and What Can You Do About It?',
    'smartphone-addiction-is-it-real-and-what-can-you-do-about-it',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['Smartphone Addiction', 'Problematic Phone Use', 'Digital Wellbeing', 'Screen Time', 'Behavioral Addiction'],
    1078,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-011',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A deep dive into problematic smartphone use — what the research actually says about whether it constitutes an addiction, how it affects the brain, and evidence-based strategies for building a healthier relationship with your device.',
    '/images/articles/cat21/cover-011.svg',
    10,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT21-012: Gaming Disorder: When Play Becomes a Compulsion
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Gaming Disorder: When Play Becomes a Compulsion',
    'gaming-disorder-when-play-becomes-a-compulsion',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['Gaming Disorder', 'Video Game Addiction', 'Behavioral Addiction', 'ICD-11', 'Compulsive Gaming'],
    1093,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-012',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A comprehensive exploration of gaming disorder — the first technology-related behavioral addiction formally recognized by the WHO — including its diagnostic criteria, neurobiological basis, risk factors, and evidence-based treatment approaches.',
    '/images/articles/cat21/cover-012.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT21-013: Binge-Watching and Mental Health: The Psychology of Streaming
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Binge-Watching and Mental Health: The Psychology of Streaming',
    'binge-watching-and-mental-health-the-psychology-of-streaming',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['Binge-Watching', 'Streaming', 'Screen Time', 'Sleep Health', 'Self-Help'],
    1053,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-013',
    v_cat_id,
    v_sub_id,
    'drafted',
    'An evidence-based exploration of binge-watching — why we do it, what it does to our brains, how it affects sleep and mood, and practical strategies for developing a healthier relationship with streaming content.',
    '/images/articles/cat21/cover-013.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT21-014: Online Shopping and Compulsive Buying: The Dopamine Hit of Add to Cart
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Online Shopping and Compulsive Buying: The Dopamine Hit of Add to Cart',
    'online-shopping-compulsive-buying-the-dopamine-hit-of-add-to-cart',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['Compulsive Buying', 'Online Shopping', 'Impulse Control', 'Behavioral Addiction', 'Consumer Psychology'],
    1078,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-014',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A deep dive into compulsive buying disorder in the digital age — how e-commerce platforms exploit psychological vulnerabilities, the neurobiological basis of shopping compulsions, and evidence-based strategies for regaining control.',
    '/images/articles/cat21/cover-014.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT21-015: Pornography and Mental Health: Navigating a Complex Landscape
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Pornography and Mental Health: Navigating a Complex Landscape',
    'pornography-and-mental-health-navigating-a-complex-landscape',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['Pornography', 'Compulsive Sexual Behavior', 'Research Digest', 'Sexual Health', 'ICD-11'],
    1108,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-015',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A research digest examining what the scientific literature actually says about pornography use and mental health — including areas of genuine concern, methodological limitations, the distinction between use and compulsive use, and what clinicians recommend.',
    '/images/articles/cat21/cover-015.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT21-016: Notification Anxiety: Why Your Phone Keeps You on Edge
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Notification Anxiety: Why Your Phone Keeps You on Edge',
    'notification-anxiety-why-your-phone-keeps-you-on-edge',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['Notification Anxiety', 'Smartphone Stress', 'Digital Wellbeing', 'Attention', 'Self-Help'],
    1044,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-016',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the psychology behind notification anxiety — how push alerts hijack your stress response, why phantom vibrations feel real, and practical strategies for reclaiming calm in a hyperconnected world.',
    '/images/articles/cat21/cover-016.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT21-017: The Attention Economy: How Tech Companies Design for Addiction
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Attention Economy: How Tech Companies Design for Addiction',
    'the-attention-economy-how-tech-companies-design-for-addiction',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['Attention Economy', 'Persuasive Design', 'Dark Patterns', 'Tech Ethics', 'Digital Wellbeing'],
    1059,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-017',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A research-based exploration of how technology platforms engineer compulsive engagement — from variable rewards and infinite scroll to dark patterns — and what the science reveals about their impact on mental health.',
    '/images/articles/cat21/cover-017.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT21-018: Digital Minimalism: Reclaiming Your Mental Space
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Digital Minimalism: Reclaiming Your Mental Space',
    'digital-minimalism-reclaiming-your-mental-space',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['Digital Minimalism', 'Focus', 'Intentional Living', 'Technology Habits', 'Mental Health'],
    1018,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-018',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A practical guide to digital minimalism — the philosophy of intentionally reducing digital clutter to create space for deeper focus, richer relationships, and improved mental health.',
    '/images/articles/cat21/cover-018.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT21-019: Screen Time Guidelines: What Actually Makes Sense for Adults
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Screen Time Guidelines: What Actually Makes Sense for Adults',
    'screen-time-guidelines-what-actually-makes-sense-for-adults',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['Screen Time', 'Digital Health', 'Adult Wellbeing', 'Evidence-Based', 'Self-Help'],
    1050,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-019',
    v_cat_id,
    v_sub_id,
    'drafted',
    'An honest, evidence-based look at adult screen time — why universal limits are too simplistic, which types of screen use actually matter for mental health, and how to build a personalized approach that works.',
    '/images/articles/cat21/cover-019.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT21-020: App-Based Gambling: The Hidden Mental Health Crisis
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'App-Based Gambling: The Hidden Mental Health Crisis',
    'app-based-gambling-the-hidden-mental-health-crisis',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['Gambling Disorder', 'Mobile Gambling', 'Behavioral Addiction', 'Mental Health', 'Public Health'],
    1042,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-020',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A deep dive into the rise of app-based gambling, its neurological mechanisms, how mobile platforms accelerate gambling-related harm, and the mental health consequences of having a casino in your pocket.',
    '/images/articles/cat21/cover-020.svg',
    11,
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

  -- === CAT21-011 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-011';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Prevalence of problematic smartphone use: A systematic review and meta-analysis', '2023', 'https://doi.org/10.1556/2006.2023.00023', 'Journal of Behavioral Addictions', 1),
      (v_art_id, 'peer_reviewed', 1, 'Brain structural changes associated with problematic smartphone use: A systematic review', '2022', 'https://doi.org/10.1016/j.addbeh.2022.107365', 'Addictive Behaviors', 2),
      (v_art_id, 'peer_reviewed', 1, 'Nomophobia: An individual''s growing fear of being without a smartphone — a systematic literature review', '2021', 'https://doi.org/10.3390/ijerph182211580', 'International Journal of Environmental Research and Public Health', 3),
      (v_art_id, 'peer_reviewed', 1, 'The effects of a digital detox on subjective well-being: A randomized controlled trial', '2022', 'https://doi.org/10.1089/cyber.2021.0324', 'Cyberpsychology, Behavior, and Social Networking', 4),
      (v_art_id, 'reference', 5, 'Irresistible: The Rise of Addictive Technology and the Business of Keeping Us Hooked', '2017', 'https://www.penguinrandomhouse.com/books/533938/irresistible-by-adam-alter/', 'Penguin Press', 5),
      (v_art_id, 'peer_reviewed', 1, 'Smartphone use and smartphone addiction in middle school students', '2020', 'https://doi.org/10.1016/j.jadohealth.2020.01.014', 'Journal of Adolescent Health', 6),
      (v_art_id, 'government', 2, 'WHO report on public health implications of excessive use of the internet and other communication and gaming platforms', '2024', 'https://www.who.int/publications/i/item/9789240096560', 'World Health Organization', 7),
      (v_art_id, 'peer_reviewed', 1, 'Variable ratio reinforcement and smartphone checking behavior', '2019', 'https://doi.org/10.1016/j.chb.2019.07.009', 'Computers in Human Behavior', 8),
      (v_art_id, 'peer_reviewed', 1, 'Problematic smartphone use: A conceptual overview and systematic review of relations with anxiety and depression psychopathology', '2017', 'https://doi.org/10.1016/j.jad.2016.08.030', 'Journal of Affective Disorders', 9),
      (v_art_id, 'peer_reviewed', 1, 'Digital wellbeing interventions for reducing smartphone overuse: A systematic review and meta-analysis', '2023', 'https://doi.org/10.1016/j.ijhcs.2023.103087', 'International Journal of Human-Computer Studies', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT21-012 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-012';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Gaming disorder: Its delineation as an important condition for diagnosis, management, and prevention', '2017', 'https://doi.org/10.1556/2006.6.2017.039', 'Journal of Behavioral Addictions', 1),
      (v_art_id, 'peer_reviewed', 1, 'The global prevalence of gaming disorder: A systematic review and meta-analysis', '2021', 'https://doi.org/10.1177/0004867421998385', 'Australian & New Zealand Journal of Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Neural correlates of gaming disorder: A systematic review of neuroimaging studies', '2020', 'https://doi.org/10.3389/fpsyt.2020.00185', 'Frontiers in Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive-behavioral therapy for gaming disorder: A systematic review and meta-analysis', '2022', 'https://doi.org/10.1016/j.cpr.2022.102141', 'Clinical Psychology Review', 4),
      (v_art_id, 'peer_reviewed', 1, 'Loot boxes are again linked to problem gambling: Results of a replication study', '2019', 'https://doi.org/10.1371/journal.pone.0213194', 'PLOS ONE', 5),
      (v_art_id, 'government', 2, 'ICD-11 for Mortality and Morbidity Statistics: Gaming disorder', '2019', 'https://icd.who.int/browse11/l-m/en#/http://id.who.int/icd/entity/1448597234', 'World Health Organization', 6),
      (v_art_id, 'peer_reviewed', 1, 'The association between gaming disorder and psychological distress: A nationwide survey', '2021', 'https://doi.org/10.1016/j.psychres.2021.113713', 'Psychiatry Research', 7),
      (v_art_id, 'peer_reviewed', 1, 'Video game engagement and psychopathology: A longitudinal study of adolescents', '2020', 'https://doi.org/10.1016/j.jaac.2019.07.943', 'Journal of the American Academy of Child & Adolescent Psychiatry', 8),
      (v_art_id, 'peer_reviewed', 1, 'Self-determination theory and video gaming: The role of basic need satisfaction in motivating play', '2006', 'https://doi.org/10.1007/s11031-006-9051-8', 'Motivation and Emotion', 9),
      (v_art_id, 'peer_reviewed', 1, 'Predatory monetization schemes in video games and their effects on wellbeing', '2021', 'https://doi.org/10.1038/s41562-021-01187-z', 'Nature Human Behaviour', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT21-013 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-013';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Binge-watching: A systematic review of definitions, assessment tools, and associations with health outcomes', '2022', 'https://doi.org/10.1016/j.abrep.2022.100421', 'Addictive Behaviors Reports', 1),
      (v_art_id, 'peer_reviewed', 1, 'Binge viewing, sleep, and the role of pre-sleep arousal', '2017', 'https://doi.org/10.5664/jcsm.6704', 'Journal of Clinical Sleep Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'Binge-watching and depression: A mediation analysis of emotional regulation', '2021', 'https://doi.org/10.1037/ppm0000339', 'Psychology of Popular Media', 3),
      (v_art_id, 'peer_reviewed', 1, 'Autoplay and default effects on streaming consumption: A behavioral analysis', '2021', 'https://doi.org/10.1016/j.chb.2021.106839', 'Computers in Human Behavior', 4),
      (v_art_id, 'peer_reviewed', 1, 'The role of self-control and motivation in binge-watching behavior', '2019', 'https://doi.org/10.1080/08824096.2019.1635511', 'Communication Research Reports', 5),
      (v_art_id, 'peer_reviewed', 1, 'Exploring the relationship between binge-watching and well-being through the lens of basic psychological needs', '2020', 'https://doi.org/10.1080/08838151.2020.1765696', 'Journal of Broadcasting & Electronic Media', 6),
      (v_art_id, 'peer_reviewed', 1, 'Problematic binge-watching and its relationship to loneliness and depression', '2022', 'https://doi.org/10.1089/cyber.2021.0282', 'Cyberpsychology, Behavior, and Social Networking', 7),
      (v_art_id, 'peer_reviewed', 1, 'Sedentary behavior and mental health: A systematic review', '2020', 'https://doi.org/10.1186/s12966-020-01001-z', 'International Journal of Behavioral Nutrition and Physical Activity', 8),
      (v_art_id, 'peer_reviewed', 1, 'Screen time and mental health in adults: A review', '2019', 'https://doi.org/10.1007/s11920-019-1054-4', 'Current Psychiatry Reports', 9),
      (v_art_id, 'government', 2, 'Watching TV and mental health in the general population', '2023', 'https://www.nice.org.uk/guidance/ng216', 'National Institute for Health and Care Excellence', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT21-014 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-014';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Prevalence of compulsive buying disorder: A systematic review and meta-analysis', '2022', 'https://doi.org/10.1111/add.15809', 'Addiction', 1),
      (v_art_id, 'peer_reviewed', 1, 'Neural mechanisms underlying the anticipation and receipt of monetary rewards', '2018', 'https://doi.org/10.1016/j.neuroimage.2018.07.024', 'NeuroImage', 2),
      (v_art_id, 'peer_reviewed', 1, 'Dark patterns in online shopping: A systematic review of manipulative design techniques', '2023', 'https://doi.org/10.1145/3544548.3581502', 'CHI Conference on Human Factors in Computing Systems', 3),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive-behavioral group therapy for compulsive buying disorder: A randomized controlled trial', '2018', 'https://doi.org/10.1037/ccp0000316', 'Journal of Consulting and Clinical Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Compulsive buying disorder: Clinical features and comorbidity', '2006', 'https://doi.org/10.1176/ajp.2006.163.10.1806', 'American Journal of Psychiatry', 5),
      (v_art_id, 'peer_reviewed', 1, 'Online compulsive buying behavior: The role of personality traits and flow state', '2021', 'https://doi.org/10.3389/fpsyg.2021.653600', 'Frontiers in Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Consumer vulnerability to scarcity appeals: The moderating role of self-control', '2020', 'https://doi.org/10.1093/jcr/ucaa030', 'Journal of Consumer Research', 7),
      (v_art_id, 'peer_reviewed', 1, 'Social media influencers and compulsive buying: A mediated moderation model', '2023', 'https://doi.org/10.1016/j.jretconser.2023.103328', 'Journal of Retailing and Consumer Services', 8),
      (v_art_id, 'peer_reviewed', 1, 'Compulsive buying: A growing concern? An examination of gender, age, and endorsement', '2015', 'https://doi.org/10.1016/j.psychres.2015.03.012', 'Psychiatry Research', 9),
      (v_art_id, 'government', 2, 'Compulsive buying in the digital age', '2023', 'https://www.nimh.nih.gov/health/topics/behavioral-addictions', 'National Institute of Mental Health', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT21-015 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-015';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Compulsive sexual behaviour disorder in the ICD-11', '2020', 'https://doi.org/10.1002/wps.20741', 'World Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Prevalence of perceived problematic pornography use and associations with mental health: A systematic review', '2022', 'https://doi.org/10.1556/2006.2022.00051', 'Journal of Behavioral Addictions', 2),
      (v_art_id, 'peer_reviewed', 1, 'Moral incongruence and compulsive sexual behavior: Results from cross-sectional interactions and parallel growth curve analyses', '2019', 'https://doi.org/10.1037/abn0000501', 'Journal of Abnormal Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Neural correlates of sexual cue reactivity in individuals with and without compulsive sexual behaviours', '2014', 'https://doi.org/10.1371/journal.pone.0102419', 'PLOS ONE', 4),
      (v_art_id, 'peer_reviewed', 1, 'Treatments for compulsive sexual behavior: A systematic review and quality assessment', '2021', 'https://doi.org/10.1007/s40429-021-00372-y', 'Current Addiction Reports', 5),
      (v_art_id, 'peer_reviewed', 1, 'Is pornography use associated with mental health? A cross-sectional study in a nationally representative sample', '2020', 'https://doi.org/10.1007/s10508-020-01757-4', 'Archives of Sexual Behavior', 6),
      (v_art_id, 'peer_reviewed', 1, 'Do cyber pornography use inventory-9 scores reflect actual compulsivity in internet pornography use? Exploring the role of moral incongruence', '2020', 'https://doi.org/10.1016/j.jsxm.2019.12.010', 'Journal of Sexual Medicine', 7),
      (v_art_id, 'peer_reviewed', 1, 'Pornography and relationships: A policy and research agenda', '2021', 'https://doi.org/10.1037/ppm0000332', 'Psychology of Popular Media', 8),
      (v_art_id, 'peer_reviewed', 1, 'The neuroscience of internet pornography addiction: A review and update', '2015', 'https://doi.org/10.3390/bs5030388', 'Behavioral Sciences', 9),
      (v_art_id, 'government', 2, 'ICD-11 for Mortality and Morbidity Statistics: Compulsive sexual behaviour disorder', '2019', 'https://icd.who.int/browse11/l-m/en#/http://id.who.int/icd/entity/1630268048', 'World Health Organization', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT21-016 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-016';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Frequency and psychological impact of smartphone notifications on daily life', '2023', 'https://doi.org/10.1016/j.chb.2023.107682', 'Computers in Human Behavior', 1),
      (v_art_id, 'peer_reviewed', 1, 'The cost of interrupted work: more speed and stress', '2008', 'https://doi.org/10.1145/1357054.1357072', 'Proceedings of the SIGCHI Conference on Human Factors in Computing Systems', 2),
      (v_art_id, 'peer_reviewed', 1, 'Phantom vibration and phantom ringing among mobile phone users: prevalence and correlates', '2022', 'https://doi.org/10.1016/j.chb.2022.107199', 'Computers in Human Behavior', 3),
      (v_art_id, 'peer_reviewed', 1, 'Brain drain: the mere presence of one''s own smartphone reduces available cognitive capacity', '2017', 'https://doi.org/10.1086/691462', 'Journal of the Association for Consumer Research', 4),
      (v_art_id, 'peer_reviewed', 1, 'Stress and the autonomic nervous system response to smartphone notifications', '2023', 'https://doi.org/10.1016/j.psyneuen.2023.106045', 'Psychoneuroendocrinology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Effects of reducing smartphone notifications on well-being and productivity: a randomized controlled trial', '2024', 'https://doi.org/10.1037/xap0000472', 'Journal of Experimental Psychology: Applied', 6),
      (v_art_id, 'government', 2, 'Digital well-being: managing technology use for mental health', '2023', 'https://www.who.int/publications/i/item/digital-wellbeing', 'World Health Organization Digital Health Technical Brief', 7),
      (v_art_id, 'government', 2, 'Notification management and attention regulation in digital environments', '2022', 'https://www.apa.org/topics/technology/notifications', 'American Psychological Association', 8),
      (v_art_id, 'peer_reviewed', 1, 'Smartphone attachment and its relationship with anxiety: a meta-analysis', '2023', 'https://doi.org/10.1016/j.jad.2023.02.078', 'Journal of Affective Disorders', 9),
      (v_art_id, 'peer_reviewed', 1, 'How design features of digital technology influence behavior change', '2022', 'https://doi.org/10.1038/s41562-022-01377-3', 'Nature Human Behaviour', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT21-017 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-017';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'reference', 5, 'The attention merchants: the epic scramble to get inside our heads', '2016', NULL, 'Penguin Random House', 1),
      (v_art_id, 'peer_reviewed', 1, 'Hooked: how to build habit-forming products and the ethical implications', '2022', 'https://doi.org/10.1017/bpp.2022.7', 'Behavioural Public Policy', 2),
      (v_art_id, 'peer_reviewed', 1, 'Infinite scroll and user engagement: an experimental analysis of interface design on browsing behavior', '2023', 'https://doi.org/10.1145/3544548.3581012', 'Proceedings of the ACM Conference on Human Factors in Computing Systems (CHI)', 3),
      (v_art_id, 'peer_reviewed', 1, 'Variable ratio reinforcement schedules in social media: behavioral and neural correlates', '2023', 'https://doi.org/10.1038/s41386-023-01541-7', 'Neuropsychopharmacology', 4),
      (v_art_id, 'reference', 5, 'Digital advertising and the attention economy: global market analysis', '2024', 'https://www.statista.com/topics/1176/online-advertising/', 'Statista Research Department', 5),
      (v_art_id, 'peer_reviewed', 1, 'Dark patterns in user interface design: prevalence and user impact', '2023', 'https://doi.org/10.1007/s10551-023-05389-z', 'Journal of Business Ethics', 6),
      (v_art_id, 'peer_reviewed', 1, 'Problematic social media use and mental health among adolescents and young adults: systematic review and meta-analysis', '2023', 'https://doi.org/10.1001/jamapsychiatry.2023.3045', 'JAMA Psychiatry', 7),
      (v_art_id, 'peer_reviewed', 1, 'The neuroscience of social media: reward learning, compulsivity, and implications for mental health', '2022', 'https://doi.org/10.1017/S0033291722001908', 'Psychological Medicine', 8),
      (v_art_id, 'government', 2, 'Digital Services Act: regulation of algorithmic systems in the European Union', '2024', 'https://digital-strategy.ec.europa.eu/en/policies/digital-services-act-package', 'European Commission', 9),
      (v_art_id, 'government', 2, 'Surgeon General advisory on social media and youth mental health', '2023', 'https://www.hhs.gov/surgeongeneral/priorities/youth-mental-health/social-media/index.html', 'U.S. Department of Health and Human Services', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT21-018 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-018';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Smartphone use and daily touchscreen interactions: a naturalistic observation study', '2022', 'https://doi.org/10.1556/2006.2022.00043', 'Journal of Behavioral Addictions', 1),
      (v_art_id, 'peer_reviewed', 1, 'Effects of a 30-day digital declutter on wellbeing, productivity, and technology use patterns', '2023', 'https://doi.org/10.1089/cyber.2023.0148', 'Cyberpsychology, Behavior, and Social Networking', 2),
      (v_art_id, 'peer_reviewed', 1, 'Why is it so hard to do my work? The challenge of attention residue when switching between work tasks', '2009', 'https://doi.org/10.1016/j.obhdp.2009.04.002', 'Organizational Behavior and Human Decision Processes', 3),
      (v_art_id, 'peer_reviewed', 1, 'Digital minimalism and mental health: a cross-sectional survey of intentional technology reduction', '2024', 'https://doi.org/10.1016/j.techsoc.2024.102378', 'Technology in Society', 4),
      (v_art_id, 'peer_reviewed', 1, 'Solitude as an approach to affective self-regulation', '2017', 'https://doi.org/10.1177/0146167216684124', 'Personality and Social Psychology Bulletin', 5),
      (v_art_id, 'government', 2, 'Managing digital distractions: recommendations for healthy technology use', '2023', 'https://www.nimh.nih.gov/health/topics/technology', 'National Institute of Mental Health', 6),
      (v_art_id, 'peer_reviewed', 1, 'Reducing smartphone use improves well-being: evidence from a randomized controlled trial', '2023', 'https://doi.org/10.1037/xap0000460', 'Journal of Experimental Psychology: Applied', 7),
      (v_art_id, 'peer_reviewed', 1, 'The role of leisure quality in subjective wellbeing: a longitudinal study', '2022', 'https://doi.org/10.1007/s10902-022-00544-3', 'Journal of Happiness Studies', 8),
      (v_art_id, 'peer_reviewed', 1, 'Flow states and technology-free experiences: implications for mental health practice', '2023', 'https://doi.org/10.1007/s12671-023-02089-5', 'Mindfulness', 9),
      (v_art_id, 'peer_reviewed', 1, 'Digital wellbeing interventions: a systematic review of randomized controlled trials', '2024', 'https://doi.org/10.1016/j.invent.2024.100698', 'Internet Interventions', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT21-019 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-019';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'reference', 5, 'Digital media use among adults: national survey of screen time across devices', '2024', 'https://www.emarketer.com/content/us-time-spent-with-media', 'eMarketer / Insider Intelligence', 1),
      (v_art_id, 'peer_reviewed', 1, 'The association between screen time and mental health in adults: a dose-response meta-analysis', '2023', 'https://doi.org/10.1016/j.ypmed.2023.107502', 'Preventive Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'Active versus passive social media use and wellbeing: a systematic review', '2022', 'https://doi.org/10.1093/jcmc/zmac015', 'Journal of Computer-Mediated Communication', 3),
      (v_art_id, 'peer_reviewed', 1, 'Screen time and psychological wellbeing in adults: a prospective cohort study', '2023', 'https://doi.org/10.1186/s12889-023-16098-5', 'BMC Public Health', 4),
      (v_art_id, 'peer_reviewed', 1, 'Evening screen exposure and its impact on sleep: meta-analysis of experimental studies', '2023', 'https://doi.org/10.1016/j.smrv.2023.101786', 'Sleep Medicine Reviews', 5),
      (v_art_id, 'government', 2, 'Guidelines on physical activity, sedentary behaviour and sleep', '2020', 'https://www.who.int/publications/i/item/9789240015128', 'World Health Organization', 6),
      (v_art_id, 'peer_reviewed', 1, 'Displacement hypothesis revisited: screen time and physical activity in adults', '2023', 'https://doi.org/10.1186/s12966-023-01452-8', 'International Journal of Behavioral Nutrition and Physical Activity', 7),
      (v_art_id, 'peer_reviewed', 1, 'Blue light exposure and circadian disruption: mechanisms and interventions', '2022', 'https://doi.org/10.1177/07487304221096406', 'Journal of Biological Rhythms', 8),
      (v_art_id, 'peer_reviewed', 1, 'Sedentary screen time and cardiometabolic health in adults', '2023', 'https://doi.org/10.1136/bjsports-2023-106859', 'British Journal of Sports Medicine', 9),
      (v_art_id, 'government', 2, 'Digital wellness and psychological functioning across adulthood', '2023', 'https://www.apa.org/topics/technology/digital-wellness', 'American Psychological Association', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT21-020 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-020';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'reference', 5, 'Global online gambling market size, share, and trends analysis report', '2024', 'https://www.grandviewresearch.com/industry-analysis/online-gambling-market', 'Grand View Research', 1),
      (v_art_id, 'peer_reviewed', 1, 'Neurobiological basis of gambling disorder: an updated review', '2023', 'https://doi.org/10.1016/j.neubiorev.2023.105148', 'Neuroscience & Biobehavioral Reviews', 2),
      (v_art_id, 'peer_reviewed', 1, 'Mobile gambling and problem gambling: a comparative analysis of online and land-based gamblers', '2023', 'https://doi.org/10.1007/s10899-023-10192-4', 'Journal of Gambling Studies', 3),
      (v_art_id, 'peer_reviewed', 1, 'Structural characteristics of mobile gambling applications and their relationship with problem gambling', '2024', 'https://doi.org/10.1037/adb0000948', 'Psychology of Addictive Behaviors', 4),
      (v_art_id, 'peer_reviewed', 1, 'Psychiatric comorbidity in gambling disorder: systematic review and meta-analysis', '2022', 'https://doi.org/10.4088/JCP.22r14509', 'Journal of Clinical Psychiatry', 5),
      (v_art_id, 'government', 2, 'Gambling disorder', '2022', 'https://doi.org/10.1176/appi.books.9780890425787', 'Diagnostic and Statistical Manual of Mental Disorders, Fifth Edition, Text Revision (DSM-5-TR)', 6),
      (v_art_id, 'peer_reviewed', 1, 'Young adults and mobile gambling: risk factors and psychological correlates', '2023', 'https://doi.org/10.1016/j.addbeh.2023.107682', 'Addictive Behaviors', 7),
      (v_art_id, 'peer_reviewed', 1, 'Psychological treatments for gambling disorder: meta-analysis of randomized controlled trials', '2023', 'https://doi.org/10.1016/j.cpr.2023.102289', 'Clinical Psychology Review', 8),
      (v_art_id, 'peer_reviewed', 1, 'Problem gambling and suicidality: a systematic review and meta-analysis', '2023', 'https://doi.org/10.1016/j.jad.2023.01.068', 'Journal of Affective Disorders', 9),
      (v_art_id, 'government', 2, 'Responsible gambling programs: evidence review and public health perspective', '2023', 'https://www.who.int/publications/i/item/gambling-public-health', 'World Health Organization', 10),
      (v_art_id, 'peer_reviewed', 1, 'Gambling and the brain: the neuroscience of compulsive gambling behavior', '2022', 'https://doi.org/10.1038/s41583-022-00598-7', 'Nature Reviews Neuroscience', 11)
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
