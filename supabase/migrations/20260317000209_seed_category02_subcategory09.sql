-- ============================================================================
-- Seed: Category 2 (Anxiety, Stress & Overwhelm) — Subcategory 09
-- 10 articles: CAT02-081 through CAT02-090
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
  VALUES ('Crisis Seeking Professional Help', 'crisis-seeking-professional-help', v_cat_id, 9)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'crisis-seeking-professional-help' AND category_id = v_cat_id;

  -- CAT02-081: CBT for Anxiety: How the Gold-Standard Treatment Works
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'CBT for Anxiety: How the Gold-Standard Treatment Works',
    'cbt-for-anxiety-how-the-gold-standard-treatment-works',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Treatment', 'Therapy', 'CBT', 'Evidence-Based'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-081',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how cognitive-behavioral therapy treats anxiety disorders and what to expect from this evidence-based approach.',
    '/images/articles/cat02/cover-081.svg',
    9,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-082: Exposure and Response Prevention: The Treatment for OCD and Phobias
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Exposure and Response Prevention: The Treatment for OCD and Phobias',
    'exposure-and-response-prevention-the-treatment-for-ocd-and-phobias',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Treatment', 'OCD', 'Phobias', 'Exposure Therapy'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-082',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how ERP works to treat OCD, phobias, and anxiety disorders by facing fears without performing compulsions or safety behaviors.',
    '/images/articles/cat02/cover-082.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-083: ACT for Anxiety: Acceptance and Commitment Therapy Explained
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'ACT for Anxiety: Acceptance and Commitment Therapy Explained',
    'act-for-anxiety-acceptance-and-commitment-therapy-explained',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Treatment', 'ACT', 'Mindfulness', 'Values'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-083',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how ACT treats anxiety by changing your relationship with anxious thoughts rather than trying to eliminate them.',
    '/images/articles/cat02/cover-083.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-084: Medication for Anxiety: SSRIs, SNRIs, and Benzodiazepines Compared
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Medication for Anxiety: SSRIs, SNRIs, and Benzodiazepines Compared',
    'medication-for-anxiety-ssris-snris-and-benzodiazepines-compared',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Treatment', 'Medication', 'Pharmacology', 'Side Effects'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-084',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A comprehensive guide to anxiety medications, how they work, side effects, and what research says about effectiveness.',
    '/images/articles/cat02/cover-084.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-085: When Should You Seek Professional Help for Anxiety?
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'When Should You Seek Professional Help for Anxiety?',
    'when-should-you-seek-professional-help-for-anxiety',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Help-Seeking', 'Treatment', 'Mental Health', 'Barriers'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-085',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Clear indicators that it',
    '/images/articles/cat02/cover-085.svg',
    7,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-086: Online Therapy for Anxiety: What the Research Says About Effectiveness
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Online Therapy for Anxiety: What the Research Says About Effectiveness',
    'online-therapy-for-anxiety-what-the-research-says-about-effectiveness',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Treatment', 'Telehealth', 'Online Therapy', 'Access'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-086',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn about the effectiveness, benefits, and limitations of telehealth and online therapy for anxiety disorders.',
    '/images/articles/cat02/cover-086.svg',
    6,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-087: The Role of Exercise in Anxiety Treatment: More Than Just a Mood Boost
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Role of Exercise in Anxiety Treatment: More Than Just a Mood Boost',
    'the-role-of-exercise-in-anxiety-treatment-more-than-just-a-mood-boost',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Exercise', 'Neuroscience', 'Treatment', 'Lifestyle'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-087',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover the neuroscience behind how exercise reduces anxiety and practical strategies to use movement as medicine.',
    '/images/articles/cat02/cover-087.svg',
    6,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-088: Combining Therapy and Medication: What the Evidence Shows
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Combining Therapy and Medication: What the Evidence Shows',
    'combining-therapy-and-medication-what-the-evidence-shows',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Treatment', 'Medication', 'Therapy', 'Combination Treatment'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-088',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn when combining therapy with medication is most effective and how to optimize both treatments together.',
    '/images/articles/cat02/cover-088.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-089: Relapse Prevention: How to Maintain Your Progress After Treatment
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Relapse Prevention: How to Maintain Your Progress After Treatment',
    'relapse-prevention-how-to-maintain-your-progress-after-treatment',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Recovery', 'Relapse Prevention', 'Maintenance', 'Long-Term'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-089',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn strategies to prevent anxiety relapse, recognize early warning signs, and sustain recovery long-term.',
    '/images/articles/cat02/cover-089.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-090: Recovery Is Not Linear: What to Expect on the Path from Anxiety
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Recovery Is Not Linear: What to Expect on the Path from Anxiety',
    'recovery-is-not-linear-what-to-expect-on-the-path-from-anxiety',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Recovery', 'Expectations', 'Progress', 'Resilience'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-090',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A realistic guide to the ups and downs of anxiety recovery, managing expectations, and defining success beyond symptom scores.',
    '/images/articles/cat02/cover-090.svg',
    5,
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

  -- === CAT02-081 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-081';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Cognitive-behavioral therapy for anxiety disorders: A meta-analysis of randomized controlled trials', '2020', 'https://doi.org/10.1037/ccp0000515', 'Journal of Consulting and Clinical Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'The efficacy of cognitive behavioral therapy: A review of meta-analyses', '2021', 'https://doi.org/10.1007/s10608-021-10214-3', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Mechanisms of change in cognitive-behavioral therapy for anxiety', '2020', 'https://doi.org/10.1016/j.cpr.2020.101871', 'Clinical Psychology Review', 3),
      (v_art_id, 'professional_org', 3, 'Understanding cognitive-behavioral therapy', '2022', 'https://www.apa.org/ptsd-guideline/patients-and-families/cognitive-behavioral', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Long-term outcomes of CBT for anxiety disorders: 5-year follow-up', '2021', 'https://doi.org/10.1016/j.brat.2021.103912', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'The cognitive model of anxiety: Current status and future directions', '2020', 'https://doi.org/10.1146/annurev-clinpsy-050718-095424', 'Annual Review of Clinical Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Exposure therapy in CBT: Mechanisms and best practices', '2020', 'https://doi.org/10.1016/j.beth.2020.02.003', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Homework in cognitive-behavioral therapy: Why it matters', '2020', 'https://doi.org/10.1002/jclp.23067', 'Journal of Clinical Psychology', 8),
      (v_art_id, 'professional_org', 3, 'Finding effective CBT therapists: A guide for patients', '2022', 'https://adaa.org/finding-help/treatment/therapy', NULL, 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-082 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-082';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Exposure and response prevention for OCD: A meta-analytic review', '2020', 'https://doi.org/10.1016/j.cpr.2020.101859', 'Clinical Psychology Review', 1),
      (v_art_id, 'peer_reviewed', 1, 'Mechanisms of fear extinction in exposure therapy', '2021', 'https://doi.org/10.1016/j.biopsych.2021.01.011', 'Biological Psychiatry', 2),
      (v_art_id, 'government', 2, 'Practice guideline for the treatment of patients with obsessive-compulsive disorder', '2020', 'https://www.psychiatry.org/psychiatrists/practice/clinical-practice-guidelines', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Inhibitory learning approach to exposure therapy: Clinical applications', '2020', 'https://doi.org/10.1016/j.beth.2020.04.009', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Therapist-guided vs. self-guided exposure therapy for specific phobias', '2021', 'https://doi.org/10.1037/ccp0000589', 'Journal of Consulting and Clinical Psychology', 5),
      (v_art_id, 'professional_org', 3, 'Understanding ERP for OCD: A patient guide', '2022', 'https://iocdf.org/about-ocd/ocd-treatment/erp/', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Response prevention in ERP: Why resisting compulsions is essential', '2020', 'https://doi.org/10.1016/j.janxdis.2020.102287', 'Journal of Anxiety Disorders', 7),
      (v_art_id, 'peer_reviewed', 1, 'Imaginal exposure for OCD: When and how to use it', '2021', 'https://doi.org/10.1016/j.cbpra.2021.02.003', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-083 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-083';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Acceptance and Commitment Therapy for anxiety disorders: A meta-analytic review', '2021', 'https://doi.org/10.1016/j.jcbs.2021.02.004', 'Journal of Contextual Behavioral Science', 1),
      (v_art_id, 'peer_reviewed', 1, 'Psychological flexibility as a fundamental aspect of health', '2020', 'https://doi.org/10.1016/j.cpr.2020.101854', 'Clinical Psychology Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'ACT vs. CBT for generalized anxiety disorder: Randomized controlled trial', '2021', 'https://doi.org/10.1016/j.brat.2021.103899', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Values-based action in ACT: Mechanisms and clinical applications', '2020', 'https://doi.org/10.1016/j.beth.2020.03.006', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Defusion techniques in Acceptance and Commitment Therapy', '2020', 'https://doi.org/10.1002/jclp.23089', 'Journal of Clinical Psychology', 5),
      (v_art_id, 'professional_org', 3, 'Understanding ACT: A guide for patients', '2022', 'https://contextualscience.org/act', 'Association for Contextual Behavioral Science', 6),
      (v_art_id, 'peer_reviewed', 1, 'Experiential avoidance and anxiety psychopathology', '2020', 'https://doi.org/10.1111/cpsp.12330', 'Clinical Psychology: Science and Practice', 7),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness and acceptance in ACT: How they differ from traditional mindfulness', '2021', 'https://doi.org/10.1007/s12671-021-01589-3', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-084 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-084';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Pharmacological treatment of anxiety disorders: Meta-analysis', '2020', 'https://doi.org/10.1016/S2215-0366(20)30274-4', 'The Lancet Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'SSRIs and SNRIs for anxiety disorders: Network meta-analysis', '2021', 'https://doi.org/10.1001/jamapsychiatry.2021.0310', 'JAMA Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Benzodiazepines for anxiety: Benefits and risks', '2020', 'https://doi.org/10.1176/appi.ajp.2020.19101096', 'American Journal of Psychiatry', 3),
      (v_art_id, 'government', 2, 'Practice guideline for the pharmacological treatment of patients with anxiety disorders', '2020', 'https://www.psychiatry.org/psychiatrists/practice/clinical-practice-guidelines', NULL, 4),
      (v_art_id, 'government', 2, 'Understanding anxiety medications', '2022', 'https://www.nimh.nih.gov/health/topics/mental-health-medications', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Long-term outcomes of pharmacotherapy for anxiety disorders', '2021', 'https://doi.org/10.4088/JCP.20r13789', 'Journal of Clinical Psychiatry', 6),
      (v_art_id, 'peer_reviewed', 1, 'Medication tapering strategies for anxiety disorders', '2020', 'https://doi.org/10.1192/bjp.2020.57', 'British Journal of Psychiatry', 7),
      (v_art_id, 'peer_reviewed', 1, 'Buspirone for generalized anxiety disorder: A systematic review', '2020', 'https://doi.org/10.1016/j.janxdis.2020.102245', 'Journal of Anxiety Disorders', 8),
      (v_art_id, 'professional_org', 3, 'Finding help: Medication options for anxiety', '2022', 'https://adaa.org/understanding-anxiety/anxiety-disorders/medication', NULL, 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-085 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-085';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Barriers to mental health treatment: A systematic review', '2020', 'https://doi.org/10.1176/appi.ps.201900057', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Duration of untreated anxiety and treatment outcomes', '2021', 'https://doi.org/10.1016/j.janxdis.2021.102387', 'Journal of Anxiety Disorders', 2),
      (v_art_id, 'professional_org', 3, 'When to seek help for anxiety: Clinical indicators', '2022', 'https://www.apa.org/topics/anxiety/help', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Self-stigma and help-seeking delay in anxiety disorders', '2020', 'https://doi.org/10.1007/s00127-020-01876-w', 'Social Psychiatry and Psychiatric Epidemiology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Early intervention in anxiety disorders: Impact on long-term outcomes', '2021', 'https://doi.org/10.1016/j.cpr.2021.102063', 'Clinical Psychology Review', 5),
      (v_art_id, 'professional_org', 3, 'How to find mental health treatment', '2022', 'https://www.nami.org/Your-Journey/Individuals-with-Mental-Illness/Finding-a-Mental-Health-Professional', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Telehealth for anxiety disorders: Access and outcomes', '2021', 'https://doi.org/10.1177/1357633X211001263', 'Journal of Telemedicine and Telecare', 7)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-086 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-086';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Internet-delivered cognitive behavioral therapy for anxiety disorders: A systematic review and meta-analysis', '2021', 'https://doi.org/10.1001/jamapsychiatry.2021.0305', 'JAMA Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Videoconference psychotherapy for anxiety: Effectiveness compared to in-person treatment', '2020', 'https://doi.org/10.1016/j.janxdis.2020.102298', 'Journal of Anxiety Disorders', 2),
      (v_art_id, 'government', 2, 'Telepsychiatry and e-mental health services: Guidelines and best practices', '2022', 'https://www.psychiatry.org/psychiatrists/practice/telepsychiatry', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Self-guided internet interventions for anxiety disorders: Efficacy and dropout rates', '2021', 'https://doi.org/10.1016/j.brat.2021.103918', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Therapeutic alliance in online therapy: Does it differ from in-person?', '2020', 'https://doi.org/10.1016/j.cpr.2020.101885', 'Clinical Psychology Review', 5),
      (v_art_id, 'professional_org', 3, 'Understanding online mental health services', '2022', 'https://www.nami.org/About-Mental-Illness/Treatments/Types-of-Mental-Health-Professionals', NULL, 6)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-087 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-087';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Exercise for anxiety disorders: Systematic review and meta-analysis', '2021', 'https://doi.org/10.1016/j.jpsychires.2021.03.023', 'Journal of Psychiatric Research', 1),
      (v_art_id, 'peer_reviewed', 1, 'Neurobiological mechanisms of exercise-induced anxiety reduction', '2020', 'https://doi.org/10.1016/j.neubiorev.2020.11.024', 'Neuroscience & Biobehavioral Reviews', 2),
      (v_art_id, 'peer_reviewed', 1, 'Dose-response relationship between exercise and anxiety symptoms', '2021', 'https://doi.org/10.1002/da.23132', NULL, 3),
      (v_art_id, 'professional_org', 3, 'Exercise prescription for mental health: Guidelines', '2022', 'https://www.acsm.org', 'American College of Sports Medicine', 4),
      (v_art_id, 'peer_reviewed', 1, 'Aerobic exercise vs. resistance training for anxiety: Comparative effectiveness', '2020', 'https://doi.org/10.3389/fpsyt.2020.00714', 'Frontiers in Psychiatry', 5),
      (v_art_id, 'peer_reviewed', 1, 'Yoga and mindful movement for anxiety disorders', '2021', 'https://doi.org/10.1089/acm.2020.0489', 'Journal of Alternative and Complementary Medicine', 6)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-088 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-088';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Psychotherapy plus antidepressant medication versus psychotherapy alone for anxiety disorders: Meta-analysis', '2021', 'https://doi.org/10.1001/jamapsychiatry.2021.0801', 'JAMA Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Long-term outcomes of combined treatment for anxiety disorders', '2020', 'https://doi.org/10.4088/JCP.19r13156', 'Journal of Clinical Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Sequencing and combining psychotherapy and pharmacotherapy for anxiety', '2021', 'https://doi.org/10.1016/j.cpr.2021.102078', 'Clinical Psychology Review', 3),
      (v_art_id, 'government', 2, 'Treatment guidelines for anxiety disorders', '2020', 'https://www.psychiatry.org/psychiatrists/practice/clinical-practice-guidelines', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Medication continuation after successful psychotherapy for anxiety', '2020', 'https://doi.org/10.1016/j.brat.2020.103712', NULL, 5)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-089 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-089';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Relapse rates and predictors in anxiety disorders: A systematic review', '2021', 'https://doi.org/10.1016/j.janxdis.2021.102401', 'Journal of Anxiety Disorders', 1),
      (v_art_id, 'peer_reviewed', 1, 'Maintaining gains after cognitive behavioral therapy for anxiety', '2020', 'https://doi.org/10.1016/j.brat.2020.103689', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Booster sessions for relapse prevention in anxiety disorders', '2021', 'https://doi.org/10.1016/j.cpr.2021.102056', 'Clinical Psychology Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'Early warning signs of anxiety relapse', '2020', 'https://doi.org/10.1002/jclp.23098', 'Journal of Clinical Psychology', 4),
      (v_art_id, 'professional_org', 3, 'Maintaining mental health gains: A guide', '2022', 'https://www.nami.org/Your-Journey/Living-with-a-Mental-Health-Condition', NULL, 5)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-090 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-090';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Trajectories of recovery in anxiety disorders: A longitudinal study', '2021', 'https://doi.org/10.1016/j.jad.2021.02.056', 'Journal of Affective Disorders', 1),
      (v_art_id, 'peer_reviewed', 1, 'Redefining recovery from anxiety: Beyond symptom reduction', '2020', 'https://doi.org/10.1016/j.cpr.2020.101891', 'Clinical Psychology Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Self-compassion and acceptance in anxiety recovery', '2021', 'https://doi.org/10.1007/s12671-021-01634-1', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Recovery narratives in mental health', '2020', 'https://doi.org/10.1037/amp0000573', NULL, 4),
      (v_art_id, 'professional_org', 3, 'Living well with anxiety: A recovery framework', '2022', 'https://www.nami.org/Your-Journey/Living-with-a-Mental-Health-Condition', NULL, 5)
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
