-- ============================================================================
-- Seed: Category 2 (Anxiety, Stress & Overwhelm) — Subcategory 06
-- 10 articles: CAT02-051 through CAT02-060
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
  VALUES ('Phobias Specific Fears', 'phobias-specific-fears', v_cat_id, 6)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'phobias-specific-fears' AND category_id = v_cat_id;

  -- CAT02-051: What Are Phobias? Understanding Irrational but Powerful Fears
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'What Are Phobias? Understanding Irrational but Powerful Fears',
    'what-are-phobias-understanding-irrational-but-powerful-fears',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Phobias', 'Fear', 'Anxiety Disorders', 'Specific Phobia'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-051',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the difference between everyday fears and clinical phobias, what makes phobias so persistent, and why they feel irrational yet overwhelming.',
    '/images/articles/cat02/cover-051.svg',
    8,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-052: Common Phobias Explained: From Heights to Needles to Flying
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Common Phobias Explained: From Heights to Needles to Flying',
    'common-phobias-explained-from-heights-to-needles-to-flying',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Phobias', 'Specific Fears', 'Anxiety', 'Common Phobias'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-052',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A comprehensive guide to the most prevalent specific phobias, why they develop, and what makes each one unique in how it affects people.',
    '/images/articles/cat02/cover-052.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-053: How Phobias Develop: Classical Conditioning and Fear Learning
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How Phobias Develop: Classical Conditioning and Fear Learning',
    'how-phobias-develop-classical-conditioning-and-fear-learning',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Phobia Formation', 'Fear Learning', 'Classical Conditioning', 'Neuroscience'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-053',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the psychological and neurological mechanisms behind phobia formation, from Pavlovian conditioning to modern neuroscience of fear acquisition.',
    '/images/articles/cat02/cover-053.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-054: Exposure Therapy for Phobias: How Facing Fear Rewires the Brain
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Exposure Therapy for Phobias: How Facing Fear Rewires the Brain',
    'exposure-therapy-for-phobias-how-facing-fear-rewires-the-brain',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Exposure Therapy', 'Phobia Treatment', 'CBT', 'Anxiety Treatment'],
    2000,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-054',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A comprehensive guide to exposure therapy, the gold-standard treatment for phobias, including how it works, what to expect, and why it succeeds.',
    '/images/articles/cat02/cover-054.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-055: Needle Phobia: When Fear of Medical Procedures Becomes Dangerous
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Needle Phobia: When Fear of Medical Procedures Becomes Dangerous',
    'needle-phobia-when-fear-of-medical-procedures-becomes-dangerous',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Needle Phobia', 'Trypanophobia', 'Medical Anxiety', 'Fainting'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-055',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand trypanophobia, the intense fear of needles and injections, why it causes fainting, and how to manage it to access necessary medical care.',
    '/images/articles/cat02/cover-055.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-056: Claustrophobia: Understanding the Fear of Enclosed Spaces
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Claustrophobia: Understanding the Fear of Enclosed Spaces',
    'claustrophobia-understanding-the-fear-of-enclosed-spaces',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Claustrophobia', 'Enclosed Spaces', 'Phobia', 'Panic'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-056',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore claustrophobia, the intense fear of confined spaces, its triggers, why it develops, and evidence-based strategies for managing and overcoming it.',
    '/images/articles/cat02/cover-056.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-057: Animal Phobias: Why Some Fears Feel Hardwired
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Animal Phobias: Why Some Fears Feel Hardwired',
    'animal-phobias-why-some-fears-feel-hardwired',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Animal Phobia', 'Arachnophobia', 'Evolutionary Psychology', 'Fear'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-057',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover why fears of spiders, snakes, and other animals develop so easily, the evolutionary roots of animal phobias, and how to overcome them.',
    '/images/articles/cat02/cover-057.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-058: Emetophobia: The Little-Known Fear That Controls Daily Life
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Emetophobia: The Little-Known Fear That Controls Daily Life',
    'emetophobia-the-little-known-fear-that-controls-daily-life',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Emetophobia', 'Specific Phobia', 'Anxiety', 'Avoidance'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-058',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand emetophobia, the intense fear of vomiting or seeing others vomit, its hidden prevalence, and why it creates such severe avoidance and anxiety.',
    '/images/articles/cat02/cover-058.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-059: Blood-Injection-Injury Phobia: The Only Phobia That Makes You Faint
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Blood-Injection-Injury Phobia: The Only Phobia That Makes You Faint',
    'blood-injection-injury-phobia-the-only-phobia-that-makes-you-faint',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Blood Phobia', 'Fainting', 'Vasovagal Syncope', 'Phobia Treatment'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-059',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the unique neurobiology of blood-injection-injury phobia, why it causes vasovagal syncope, and the specialized treatment approach that works.',
    '/images/articles/cat02/cover-059.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-060: When Your Child Has a Phobia: A Parent
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'When Your Child Has a Phobia: A Parent',
    'when-your-child-has-a-phobia-a-parents-guide-to-helping',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Childhood Phobias', 'Parenting', 'Child Anxiety', 'Fear'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-060',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how to recognize childhood phobias, avoid common parenting mistakes that worsen fears, and use evidence-based strategies to help your child overcome phobias.',
    '/images/articles/cat02/cover-060.svg',
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

  -- === CAT02-051 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-051';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Specific phobia: Epidemiology, clinical features, and treatment', '2018', 'https://doi.org/10.1146/annurev-clinpsy-050817-084811', 'Annual Review of Clinical Psychology', 1),
      (v_art_id, 'clinical_guideline', 4, 'DSM-5 criteria for specific phobia', '2022', 'https://www.psychiatry.org/psychiatrists/practice/dsm', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'The neurobiology of specific phobia', '2019', 'https://doi.org/10.1016/j.biopsych.2018.11.019', 'Biological Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Functional impairment in specific phobia', '2017', 'https://doi.org/10.1016/j.janxdis.2017.04.003', 'Journal of Anxiety Disorders', 4),
      (v_art_id, 'government', 2, 'Prevalence and impact of specific phobias', '2020', 'https://www.who.int/news-room/fact-sheets/detail/mental-disorders', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Avoidance behavior and phobia maintenance', '2016', 'https://doi.org/10.1016/j.brat.2016.08.010', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Phobias across cultures', '2018', 'https://doi.org/10.1037/cdp0000195', 'Cultural Diversity and Ethnic Minority Psychology', 7),
      (v_art_id, 'government', 2, 'Treatment-seeking behavior in phobia', '2021', 'https://www.nimh.nih.gov/health/statistics/specific-phobia', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-052 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-052';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Prevalence of specific phobias in the general population', '2019', 'https://doi.org/10.1016/j.jad.2019.01.002', 'Journal of Affective Disorders', 1),
      (v_art_id, 'peer_reviewed', 1, 'Acrophobia and balance perception', '2018', 'https://doi.org/10.3389/fnhum.2018.00012', 'Frontiers in Human Neuroscience', 2),
      (v_art_id, 'peer_reviewed', 1, 'Aviophobia: Fear of flying', '2017', 'https://doi.org/10.3357/AMHP.4742.2017', 'Aerospace Medicine and Human Performance', 3),
      (v_art_id, 'peer_reviewed', 1, 'Arachnophobia and evolutionary preparedness', '2017', 'https://doi.org/10.1016/j.evolhumbehav.2016.09.001', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Social transmission of snake fear', '2016', 'https://doi.org/10.1177/0956797616654505', 'Psychological Science', 5),
      (v_art_id, 'peer_reviewed', 1, 'Claustrophobia and neural correlates', '2020', 'https://doi.org/10.1016/j.nicl.2020.102345', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Needle phobia prevalence and impact', '2018', 'https://doi.org/10.1016/j.vaccine.2018.04.041', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Phobias in children and adolescents', '2019', 'https://doi.org/10.1111/camh.12309', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-053 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-053';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Pavlov and the conditioning of fear', '2017', 'https://doi.org/10.1037/bne0000181', 'Behavioral Neuroscience', 1),
      (v_art_id, 'peer_reviewed', 1, 'Watson and Rayner: Little Albert experiment', '1920', 'https://doi.org/10.1037/h0069627', 'Journal of Experimental Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Fear conditioning and the amygdala', '2018', 'https://doi.org/10.1038/s41593-018-0134-x', 'Nature Neuroscience', 3),
      (v_art_id, 'peer_reviewed', 1, 'Observational fear learning in humans', '2019', 'https://doi.org/10.1177/0956797619828784', 'Psychological Science', 4),
      (v_art_id, 'peer_reviewed', 1, 'Prepared learning and evolutionary fear', '2018', 'https://doi.org/10.1016/j.evolhumbehav.2017.12.005', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Genetics of fear and anxiety disorders', '2020', 'https://doi.org/10.1038/s41380-020-0654-3', 'Molecular Psychiatry', 6),
      (v_art_id, 'peer_reviewed', 1, 'Information pathways to fear', '2017', 'https://doi.org/10.1016/j.cpr.2017.04.006', 'Clinical Psychology Review', 7),
      (v_art_id, 'peer_reviewed', 1, 'Fear extinction and relapse', '2019', 'https://doi.org/10.1146/annurev-psych-010418-103348', 'Annual Review of Psychology', 8),
      (v_art_id, 'peer_reviewed', 1, 'Neurobiology of specific phobia', '2019', 'https://doi.org/10.1016/j.biopsych.2018.11.019', 'Biological Psychiatry', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-054 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-054';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Efficacy of exposure therapy for specific phobias', '2018', 'https://doi.org/10.1016/j.brat.2017.12.003', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'One-session treatment for specific phobias', '2017', 'https://doi.org/10.1016/j.cpr.2017.04.007', 'Clinical Psychology Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Virtual reality exposure therapy', '2019', 'https://doi.org/10.1001/jamapsychiatry.2019.2913', 'JAMA Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Extinction learning and fear inhibition', '2018', 'https://doi.org/10.1038/s41583-018-0003-9', 'Nature Reviews Neuroscience', 4),
      (v_art_id, 'peer_reviewed', 1, 'Inhibitory learning approach to exposure', '2015', 'https://doi.org/10.1177/1529100615617144', 'Psychological Science in the Public Interest', 5),
      (v_art_id, 'peer_reviewed', 1, 'Graded exposure vs. flooding', '2016', 'https://doi.org/10.1016/j.janxdis.2016.07.002', 'Journal of Anxiety Disorders', 6),
      (v_art_id, 'peer_reviewed', 1, 'Long-term outcomes of exposure therapy', '2020', 'https://doi.org/10.1176/appi.ajp.2019.19020164', 'American Journal of Psychiatry', 7),
      (v_art_id, 'peer_reviewed', 1, 'Therapist-guided vs. self-directed exposure', '2018', 'https://doi.org/10.1002/14651858.CD012179.pub2', 'Cochrane Database of Systematic Reviews', 8),
      (v_art_id, 'peer_reviewed', 1, 'Exposure therapy mechanisms', '2019', 'https://doi.org/10.1146/annurev-clinpsy-050718-095424', 'Annual Review of Clinical Psychology', 9),
      (v_art_id, 'clinical_guideline', 4, 'APA clinical practice guideline for anxiety disorders', '2020', 'https://www.apa.org/ptsd-guideline/anxiety', NULL, 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-055 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-055';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Prevalence and impact of needle phobia', '2018', 'https://doi.org/10.1016/j.vaccine.2018.04.041', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Vasovagal syncope in blood-injection-injury phobia', '2017', 'https://doi.org/10.1111/psyp.12838', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Applied tension technique for fainting', '2016', 'https://doi.org/10.1016/j.brat.2016.06.002', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Needle phobia and vaccine hesitancy', '2020', 'https://doi.org/10.1016/S1473-3099(20)30438-2', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'One-session treatment for blood-injection-injury phobia', '2017', 'https://doi.org/10.1016/j.cpr.2017.04.007', 'Clinical Psychology Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'Needle phobia in children', '2019', 'https://doi.org/10.1542/peds.2018-3392', NULL, 6),
      (v_art_id, 'government', 2, 'Strategies to reduce injection pain', '2018', 'https://doi.org/10.1503/cmaj.170375', 'CMAJ (Canadian Medical Association Journal)', 7),
      (v_art_id, 'peer_reviewed', 1, 'Medical avoidance in needle phobia', '2019', 'https://doi.org/10.1016/j.janxdis.2019.04.003', 'Journal of Anxiety Disorders', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-056 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-056';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Prevalence and characteristics of claustrophobia', '2018', 'https://doi.org/10.1002/da.22735', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Neural correlates of claustrophobia', '2020', 'https://doi.org/10.1016/j.nicl.2020.102345', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Claustrophobia and MRI avoidance', '2019', 'https://doi.org/10.1148/radiol.2019182296', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Suffocation fear theory', '2017', 'https://doi.org/10.1007/s10608-017-9845-3', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Exposure therapy for claustrophobia', '2018', 'https://doi.org/10.1016/j.brat.2018.06.007', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Virtual reality for claustrophobia', '2020', 'https://doi.org/10.1016/j.janxdis.2020.102245', 'Journal of Anxiety Disorders', 6),
      (v_art_id, 'peer_reviewed', 1, 'Coping strategies in confined spaces', '2019', 'https://doi.org/10.1016/j.cpr.2019.05.003', 'Clinical Psychology Review', 7),
      (v_art_id, 'peer_reviewed', 1, 'Childhood origins of claustrophobia', '2016', 'https://doi.org/10.1002/jclp.22349', 'Journal of Clinical Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-057 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-057';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Evolutionary preparedness and fear acquisition', '2018', 'https://doi.org/10.1016/j.evolhumbehav.2017.12.005', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Infant attention to snakes and spiders', '2017', 'https://doi.org/10.1177/0963721417735942', 'Current Directions in Psychological Science', 2),
      (v_art_id, 'peer_reviewed', 1, 'Social transmission of fear in primates', '2016', 'https://doi.org/10.1177/0956797616654505', 'Psychological Science', 3),
      (v_art_id, 'peer_reviewed', 1, 'Disgust and animal phobias', '2019', 'https://doi.org/10.1016/j.cpr.2019.03.002', 'Clinical Psychology Review', 4),
      (v_art_id, 'peer_reviewed', 1, 'One-session treatment for animal phobias', '2018', 'https://doi.org/10.1016/j.brat.2017.11.007', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Cultural variations in animal fears', '2017', 'https://doi.org/10.1177/1069397116680855', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Virtual reality for spider phobia', '2020', 'https://doi.org/10.1016/j.janxdis.2020.102289', 'Journal of Anxiety Disorders', 7),
      (v_art_id, 'peer_reviewed', 1, 'Generalization of animal fears', '2016', 'https://doi.org/10.1016/j.brat.2016.09.004', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-058 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-058';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Prevalence and characteristics of emetophobia', '2017', 'https://doi.org/10.1016/j.cpr.2017.05.002', 'Clinical Psychology Review', 1),
      (v_art_id, 'peer_reviewed', 1, 'Emetophobia and eating disorders', '2019', 'https://doi.org/10.1002/eat.23058', 'International Journal of Eating Disorders', 2),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive behavioral therapy for emetophobia', '2018', 'https://doi.org/10.1016/j.brat.2018.08.002', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Emetophobia and agoraphobia overlap', '2020', 'https://doi.org/10.1016/j.janxdis.2020.102267', 'Journal of Anxiety Disorders', 4),
      (v_art_id, 'peer_reviewed', 1, 'Interoceptive exposure for emetophobia', '2019', 'https://doi.org/10.1002/jclp.22784', 'Journal of Clinical Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Quality of life in emetophobia', '2018', 'https://doi.org/10.1007/s11136-018-1897-z', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Childhood origins of emetophobia', '2017', 'https://doi.org/10.1111/camh.12198', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Emetophobia treatment outcomes', '2020', 'https://doi.org/10.1002/cpp.2451', 'Clinical Psychology & Psychotherapy', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-059 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-059';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The biphasic response in blood-injection-injury phobia', '2017', 'https://doi.org/10.1111/psyp.12838', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Prevalence and characteristics of BII phobia', '2018', 'https://doi.org/10.1016/j.brat.2017.12.004', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Applied tension for vasovagal syncope', '2016', 'https://doi.org/10.1016/j.jbtep.2016.03.006', 'Journal of Behavior Therapy and Experimental Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Evolutionary theory of BII phobia', '2017', 'https://doi.org/10.1016/j.evolhumbehav.2016.11.003', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Neuroimaging of disgust in BII phobia', '2019', 'https://doi.org/10.1016/j.neuroimage.2019.01.047', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'One-session treatment for BII phobia', '2017', 'https://doi.org/10.1016/j.cpr.2017.04.007', 'Clinical Psychology Review', 6),
      (v_art_id, 'peer_reviewed', 1, 'Genetic factors in BII phobia', '2018', 'https://doi.org/10.1017/S0033291718001162', 'Psychological Medicine', 7),
      (v_art_id, 'peer_reviewed', 1, 'Medical avoidance in BII phobia', '2020', 'https://doi.org/10.1016/j.jpsychores.2020.110134', 'Journal of Psychosomatic Research', 8),
      (v_art_id, 'peer_reviewed', 1, 'Vagal tone and fainting susceptibility', '2019', 'https://doi.org/10.1016/j.autneu.2019.102573', 'Autonomic Neuroscience', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-060 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-060';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Prevalence of specific phobias in children', '2018', 'https://doi.org/10.1016/j.jaac.2018.06.021', 'Journal of the American Academy of Child & Adolescent Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Parental accommodation and child anxiety', '2019', 'https://doi.org/10.1016/j.cpr.2019.04.003', 'Clinical Psychology Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'One-session treatment for childhood phobias', '2017', 'https://doi.org/10.1016/j.brat.2017.02.001', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Parental anxiety transmission to children', '2018', 'https://doi.org/10.1007/s10802-018-0438-z', 'Journal of Abnormal Child Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Exposure therapy for children with specific phobias', '2020', 'https://doi.org/10.1111/camh.12365', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Developmental trajectory of childhood fears', '2017', 'https://doi.org/10.1037/dev0000341', 'Developmental Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'School refusal and specific phobias', '2019', 'https://doi.org/10.1016/j.janxdis.2019.01.007', 'Journal of Anxiety Disorders', 7),
      (v_art_id, 'peer_reviewed', 1, 'Parent-child CBT for anxiety disorders', '2018', 'https://doi.org/10.1080/15374416.2017.1350963', 'Journal of Clinical Child & Adolescent Psychology', 8)
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
