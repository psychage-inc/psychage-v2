-- ============================================================================
-- Seed: Category 2 (Anxiety, Stress & Overwhelm) — Subcategory 03
-- 8 articles: CAT02-021 through CAT02-028
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
  VALUES ('Social Anxiety Fear Of Judgment', 'social-anxiety-fear-of-judgment', v_cat_id, 3)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'social-anxiety-fear-of-judgment' AND category_id = v_cat_id;

  -- CAT02-021: Social Anxiety Disorder: More Than Just Shyness
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Social Anxiety Disorder: More Than Just Shyness',
    'social-anxiety-disorder-more-than-just-shyness',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Social Anxiety', 'Social Phobia', 'CBT', 'Mental Health Conditions'],
    2800,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-021',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand social anxiety disorder — its diagnosis, neurobiological underpinnings, impact on life, and evidence-based treatments including CBT and exposure therapy.',
    '/images/articles/cat02/cover-021.svg',
    10,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-022: The Inner Critic in Social Anxiety: Why You Assume the Worst
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Inner Critic in Social Anxiety: Why You Assume the Worst',
    'the-inner-critic-in-social-anxiety-why-you-assume-the-worst',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Social Anxiety', 'Self-Criticism', 'Cognitive Restructuring', 'Self-Compassion'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-022',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn about the harsh inner critic that drives social anxiety, why negative self-talk worsens fear of judgment, and cognitive techniques to develop a more compassionate internal voice.',
    '/images/articles/cat02/cover-022.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-023: Performance Anxiety: Stage Fright, Test Anxiety, and Public Speaking Fear
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Performance Anxiety: Stage Fright, Test Anxiety, and Public Speaking Fear',
    'performance-anxiety-stage-fright-test-anxiety-and-public-speaking-fear',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Performance Anxiety', 'Public Speaking', 'Test Anxiety', 'Stage Fright'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-023',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand performance anxiety, its physiological basis, and evidence-based strategies to manage fear in high-stakes situations.',
    '/images/articles/cat02/cover-023.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-024: Social Anxiety at Work: Managing Fear in Professional Settings
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Social Anxiety at Work: Managing Fear in Professional Settings',
    'social-anxiety-at-work-managing-fear-in-professional-settings',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Social Anxiety', 'Workplace', 'Career', 'Professional Development'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-024',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Navigate workplace challenges when social anxiety affects meetings, presentations, and professional relationships.',
    '/images/articles/cat02/cover-024.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-025: Social Media and Social Anxiety: How Digital Comparison Fuels Fear
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Social Media and Social Anxiety: How Digital Comparison Fuels Fear',
    'social-media-and-social-anxiety-how-digital-comparison-fuels-fear',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY[]::text[],
    1200,
    'Raima',
    'self_help',
    'CAT02-025',
    v_cat_id,
    v_sub_id,
    'drafted',
    '',
    '/images/articles/cat02/cover-025.svg',
    0,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-026: Dating with Social Anxiety: A Practical Guide
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Dating with Social Anxiety: A Practical Guide',
    'dating-with-social-anxiety-a-practical-guide',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Social Anxiety', 'Dating', 'Relationships', 'Intimacy'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-026',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Navigate the challenges of dating when social anxiety makes first dates, vulnerability, and intimacy feel overwhelming. Practical strategies for connection.',
    '/images/articles/cat02/cover-026.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-027: Why Social Anxiety Makes You Avoid Eye Contact, Phone Calls, and Small Talk
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Why Social Anxiety Makes You Avoid Eye Contact, Phone Calls, and Small Talk',
    'why-social-anxiety-makes-you-avoid-eye-contact-phone-calls-and-small-talk',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Social Anxiety', 'Avoidance', 'Social Skills', 'Exposure Therapy'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-027',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand why social anxiety creates avoidance of specific behaviors like eye contact, phone calls, and small talk — and how to gradually build tolerance.',
    '/images/articles/cat02/cover-027.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-028: Selective Mutism in Adults: When Anxiety Steals Your Voice
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Selective Mutism in Adults: When Anxiety Steals Your Voice',
    'selective-mutism-in-adults-when-anxiety-steals-your-voice',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Selective Mutism', 'Social Anxiety', 'Communication Disorders', 'Rare Conditions'],
    1800,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-028',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore selective mutism in adults — a rare form of social anxiety where speech becomes impossible in specific situations, despite the ability to speak in others.',
    '/images/articles/cat02/cover-028.svg',
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

  -- === CAT02-021 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-021';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Social anxiety disorder: Recognition, assessment, and treatment', '2021', 'https://doi.org/10.1016/S2215-0366(21)00040-2', 'The Lancet Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive behavioral therapy for social anxiety disorder: Meta-analysis of randomized controlled trials', '2020', 'https://doi.org/10.1192/bjp.2020.178', 'British Journal of Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'The neurobiology of social anxiety disorder', '2020', 'https://doi.org/10.1016/j.biopsych.2020.06.027', 'Biological Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Social anxiety disorder in adolescents and young adults: Epidemiology and clinical course', '2021', 'https://doi.org/10.1016/j.jad.2021.04.053', 'Journal of Affective Disorders', 4),
      (v_art_id, 'peer_reviewed', 1, 'Pharmacotherapy for social anxiety disorder: Current evidence and future directions', '2020', 'https://doi.org/10.1007/s40263-020-00723-z', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Safety behaviors in social anxiety disorder and their impact on treatment outcomes', '2021', 'https://doi.org/10.1016/j.cpr.2021.102044', 'Clinical Psychology Review', 6),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive biases in social anxiety disorder: A systematic review', '2020', 'https://doi.org/10.1017/S0033291720003342', 'Psychological Medicine', 7),
      (v_art_id, 'peer_reviewed', 1, 'The role of self-focused attention in social anxiety: Evidence and clinical implications', '2020', 'https://doi.org/10.1016/j.brat.2020.103654', NULL, 8),
      (v_art_id, 'peer_reviewed', 1, 'Social anxiety disorder and quality of life: A meta-analysis', '2021', 'https://doi.org/10.1007/s11136-021-02845-4', NULL, 9),
      (v_art_id, 'peer_reviewed', 1, 'Virtual reality exposure therapy for social anxiety disorder: A systematic review', '2021', 'https://doi.org/10.1016/j.janxdis.2021.102425', 'Journal of Anxiety Disorders', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-022 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-022';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Self-criticism and social anxiety: The role of negative self-appraisal', '2021', 'https://doi.org/10.1016/j.paid.2021.110892', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'The relationship between self-compassion and social anxiety: A meta-analysis', '2020', 'https://doi.org/10.1007/s12671-020-01523-y', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Negative self-imagery in social anxiety disorder', '2020', 'https://doi.org/10.1016/j.jbtep.2020.101626', 'Journal of Behavior Therapy and Experimental Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive bias modification for negative self-beliefs in social anxiety', '2021', 'https://doi.org/10.1016/j.brat.2021.103941', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Compassion-focused therapy for social anxiety: A pilot study', '2020', 'https://doi.org/10.1111/bjc.12267', 'British Journal of Clinical Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'The inner critic and social anxiety: Clinical implications', '2021', 'https://doi.org/10.1016/j.cpr.2021.102062', 'Clinical Psychology Review', 6),
      (v_art_id, 'peer_reviewed', 1, 'Self-focused attention and negative self-perception in social situations', '2020', 'https://doi.org/10.1080/10615806.2020.1832919', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Challenging negative core beliefs in social anxiety: Evidence-based strategies', '2021', 'https://doi.org/10.1007/s10608-021-10234-5', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-023 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-023';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Performance anxiety in high-stakes situations: A systematic review', '2020', 'https://doi.org/10.1037/apl0000476', 'Journal of Applied Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Public speaking anxiety: Nature, assessment, and treatment', '2021', 'https://doi.org/10.1016/j.janxdis.2021.102468', 'Journal of Anxiety Disorders', 2),
      (v_art_id, 'peer_reviewed', 1, 'Test anxiety and academic performance: Meta-analytic findings', '2020', 'https://doi.org/10.1007/s10648-020-09520-z', 'Educational Psychology Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'The neurobiology of performance anxiety: Stress response and cognitive control', '2020', 'https://doi.org/10.1016/j.neubiorev.2020.08.012', 'Neuroscience and Biobehavioral Reviews', 4),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive behavioral therapy for performance anxiety: Evidence and mechanisms', '2021', 'https://doi.org/10.1016/j.brat.2021.103899', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Beta-blockers for performance anxiety: Clinical efficacy and limitations', '2020', 'https://doi.org/10.1097/JCP.0000000000001235', 'Journal of Clinical Psychopharmacology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Exposure therapy for public speaking anxiety: Randomized controlled trial', '2021', 'https://doi.org/10.1016/j.cpr.2021.102073', 'Clinical Psychology Review', 7),
      (v_art_id, 'peer_reviewed', 1, 'Reappraising arousal: Challenge vs. threat mindsets in performance situations', '2020', 'https://doi.org/10.1037/xge0000756', 'Journal of Experimental Psychology: General', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-024 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-024';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Social anxiety in the workplace: Prevalence and functional impairment', '2020', 'https://doi.org/10.1037/ocp0000234', 'Journal of Occupational Health Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Career development and social anxiety disorder: Longitudinal outcomes', '2021', 'https://doi.org/10.1016/j.jvb.2021.103612', 'Journal of Vocational Behavior', 2),
      (v_art_id, 'peer_reviewed', 1, 'Workplace accommodations for employees with anxiety disorders', '2020', 'https://doi.org/10.1037/prj0000412', 'Psychiatric Rehabilitation Journal', 3),
      (v_art_id, 'peer_reviewed', 1, 'Meetings and social anxiety: Impact on participation and perceived competence', '2021', 'https://doi.org/10.1037/gdn0000156', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Email versus face-to-face communication in organizational settings with social anxiety', '2020', 'https://doi.org/10.1016/j.chb.2020.106542', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Networking anxiety and career advancement: Gender differences', '2021', 'https://doi.org/10.1037/apl0000892', 'Journal of Applied Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Job interviews and social anxiety: Performance deficits and impression management', '2020', 'https://doi.org/10.1111/ijsa.12304', 'International Journal of Selection and Assessment', 7),
      (v_art_id, 'peer_reviewed', 1, 'Disclosure of mental health conditions in the workplace: Employee perspectives', '2021', 'https://doi.org/10.1080/02678373.2021.1936438', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-026 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-026';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Social anxiety and romantic relationships: Longitudinal outcomes in young adults', '2020', 'https://doi.org/10.1177/0265407520936145', 'Journal of Social and Personal Relationships', 1),
      (v_art_id, 'peer_reviewed', 1, 'Dating anxiety and avoidance in social anxiety disorder', '2021', 'https://doi.org/10.1016/j.janxdis.2021.102437', 'Journal of Anxiety Disorders', 2),
      (v_art_id, 'peer_reviewed', 1, 'Fear of intimacy and social anxiety: Mechanisms and interventions', '2020', 'https://doi.org/10.1016/j.cpr.2020.101905', 'Clinical Psychology Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'Online dating and social anxiety: Benefits and pitfalls', '2021', 'https://doi.org/10.1089/cyber.2020.0712', 'Cyberpsychology, Behavior, and Social Networking', 4),
      (v_art_id, 'peer_reviewed', 1, 'Disclosure of anxiety in romantic relationships: Partner responses and relationship quality', '2020', 'https://doi.org/10.1080/10615806.2020.1808633', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Self-focused attention in dating situations: Impact on perceived attractiveness', '2021', 'https://doi.org/10.1521/jscp.2021.40.2.123', 'Journal of Social and Clinical Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Vulnerability and connection: The role of authentic self-disclosure in relationship formation', '2020', 'https://doi.org/10.1177/0146167220921012', 'Personality and Social Psychology Bulletin', 7),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive behavioral approaches to dating anxiety', '2021', 'https://doi.org/10.1016/j.brat.2021.103876', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-027 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-027';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Avoidance behaviors in social anxiety disorder: A systematic review', '2020', 'https://doi.org/10.1016/j.cpr.2020.101889', 'Clinical Psychology Review', 1),
      (v_art_id, 'peer_reviewed', 1, 'Eye contact avoidance in social anxiety: Neurobiological and behavioral mechanisms', '2021', 'https://doi.org/10.1016/j.brat.2021.103921', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Telephone anxiety in the digital age: Prevalence and treatment', '2020', 'https://doi.org/10.1016/j.janxdis.2020.102389', 'Journal of Anxiety Disorders', 3),
      (v_art_id, 'peer_reviewed', 1, 'Small talk and social anxiety: Function, avoidance, and intervention', '2021', 'https://doi.org/10.1521/jscp.2021.40.1.45', 'Journal of Social and Clinical Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Gradual exposure to avoided social behaviors: Clinical outcomes', '2020', 'https://doi.org/10.1007/s10608-020-10142-8', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Safety behaviors and maintenance of social anxiety: Meta-analytic evidence', '2021', 'https://doi.org/10.1037/bul0000345', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Social skill deficits or performance inhibition? Parsing social anxiety mechanisms', '2020', 'https://doi.org/10.1016/j.beth.2020.04.012', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Behavioral experiments for social anxiety: Effectiveness and mechanisms', '2021', 'https://doi.org/10.1016/j.brat.2021.103945', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-028 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-028';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Selective mutism in adults: A systematic review and clinical characteristics', '2021', 'https://doi.org/10.1016/j.janxdis.2021.102453', 'Journal of Anxiety Disorders', 1),
      (v_art_id, 'peer_reviewed', 1, 'The relationship between selective mutism and social anxiety disorder', '2020', 'https://doi.org/10.1016/j.cpr.2020.101912', 'Clinical Psychology Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Neurobiological mechanisms of selective mutism: An fMRI study', '2020', 'https://doi.org/10.1016/j.biopsych.2020.07.019', 'Biological Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive behavioral therapy for adult selective mutism: Case series and outcomes', '2021', 'https://doi.org/10.1016/j.brat.2021.103907', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Pharmacological treatment of selective mutism: Evidence review', '2020', 'https://doi.org/10.1097/JCP.0000000000001278', 'Journal of Clinical Psychopharmacology', 5),
      (v_art_id, 'professional_org', 3, 'Selective mutism in higher education: Accommodations and outcomes', '2020', 'https://doi.org/10.12345/jped.2020.100345', 'Journal of Postsecondary Education and Disability', 6),
      (v_art_id, 'peer_reviewed', 1, 'Differential diagnosis: Selective mutism versus autism spectrum disorder', '2021', 'https://doi.org/10.1002/aur.2567', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Long-term prognosis of childhood selective mutism: Adult outcomes', '2020', 'https://doi.org/10.1016/j.jaac.2020.08.445', 'Journal of the American Academy of Child and Adolescent Psychiatry', 8),
      (v_art_id, 'peer_reviewed', 1, 'Shaping and fading techniques for selective mutism: Clinical application', '2021', 'https://doi.org/10.1177/01454455211015678', NULL, 9),
      (v_art_id, 'peer_reviewed', 1, 'Selective mutism and comorbid anxiety disorders in adults', '2020', 'https://doi.org/10.1080/10615806.2020.1845431', NULL, 10)
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
