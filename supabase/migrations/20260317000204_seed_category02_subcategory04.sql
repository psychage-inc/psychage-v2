-- ============================================================================
-- Seed: Category 2 (Anxiety, Stress & Overwhelm) — Subcategory 04
-- 10 articles: CAT02-031 through CAT02-040
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
  VALUES ('Chronic Stress Overwhelm', 'chronic-stress-overwhelm', v_cat_id, 4)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'chronic-stress-overwhelm' AND category_id = v_cat_id;

  -- CAT02-031: What Is Chronic Stress? How Ongoing Pressure Changes Your Brain and Body
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'What Is Chronic Stress? How Ongoing Pressure Changes Your Brain and Body',
    'what-is-chronic-stress-how-ongoing-pressure-changes-your-brain-and-body',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Chronic Stress', 'Stress Response', 'Mental Health', 'Physical Health'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-031',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover how chronic stress differs from acute stress, its impact on your nervous system, and why it matters for your long-term health and wellbeing.',
    '/images/articles/cat02/cover-031.svg',
    8,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-032: The Stress Response System: Understanding Cortisol, Adrenaline, and Your Nervous System
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Stress Response System: Understanding Cortisol, Adrenaline, and Your Nervous System',
    'the-stress-response-system-understanding-cortisol-adrenaline-and-your-nervous-system',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Stress Response', 'Cortisol', 'Nervous System', 'HPA Axis', 'Neuroscience'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-032',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how your body',
    '/images/articles/cat02/cover-032.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-033: Overwhelm: When Everything Feels Like Too Much at Once
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Overwhelm: When Everything Feels Like Too Much at Once',
    'overwhelm-when-everything-feels-like-too-much-at-once',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Overwhelm', 'Stress Management', 'Decision-Making', 'Coping Skills'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-033',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the psychology of overwhelm, why it paralyzes decision-making and action, and practical strategies to regain control when life feels unmanageable.',
    '/images/articles/cat02/cover-033.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-034: Decision Fatigue: Why Too Many Choices Drain Your Mental Energy
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Decision Fatigue: Why Too Many Choices Drain Your Mental Energy',
    'decision-fatigue-why-too-many-choices-drain-your-mental-energy',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Decision Fatigue', 'Mental Energy', 'Willpower', 'Productivity', 'Cognitive Load'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-034',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how the cumulative burden of daily decisions depletes willpower, impairs judgment, and what you can do to preserve mental energy for what matters.',
    '/images/articles/cat02/cover-034.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-035: Stress and Memory: Why You Can
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Stress and Memory: Why You Can',
    'stress-and-memory-why-you-cant-think-clearly-under-pressure',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Stress', 'Memory', 'Cognition', 'Neuroscience', 'Cortisol', 'Hippocampus'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-035',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the neuroscience of how stress impacts memory formation, recall, and cognitive performance, plus strategies to protect your thinking under pressure.',
    '/images/articles/cat02/cover-035.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-036: Chronic Stress and Physical Health: The Long-Term Consequences
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Chronic Stress and Physical Health: The Long-Term Consequences',
    'chronic-stress-and-physical-health-the-long-term-consequences',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Chronic Stress', 'Physical Health', 'Cardiovascular', 'Immune System', 'Disease Risk'],
    1800,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-036',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover how prolonged stress damages your cardiovascular, immune, metabolic, and digestive systems, and what the research reveals about prevention.',
    '/images/articles/cat02/cover-036.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-037: Financial Stress and Mental Health: Breaking the Worry Cycle
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Financial Stress and Mental Health: Breaking the Worry Cycle',
    'financial-stress-and-mental-health-breaking-the-worry-cycle',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Financial Stress', 'Money Anxiety', 'Mental Health', 'Coping Strategies'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-037',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the psychological impact of money worries, why financial stress feels uniquely consuming, and practical strategies to regain control and reduce anxiety.',
    '/images/articles/cat02/cover-037.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-038: Caregiver Stress: When Taking Care of Others Depletes You
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Caregiver Stress: When Taking Care of Others Depletes You',
    'caregiver-stress-when-taking-care-of-others-depletes-you',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Caregiver Stress', 'Burnout', 'Compassion Fatigue', 'Self-Care', 'Support'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-038',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the unique challenges of caregiver burnout, its psychological and physical toll, and evidence-based strategies to sustain your wellbeing while caring for others.',
    '/images/articles/cat02/cover-038.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-039: How Stress Accumulates: Understanding Allostatic Load
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How Stress Accumulates: Understanding Allostatic Load',
    'how-stress-accumulates-understanding-allostatic-load',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Allostatic Load', 'Chronic Stress', 'Biomarkers', 'Health', 'Neuroscience'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-039',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the concept of allostatic load — the cumulative biological burden of chronic stress — and what science reveals about its measurement and health impacts.',
    '/images/articles/cat02/cover-039.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-040: Stress Inoculation: How Controlled Exposure Builds Resilience
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Stress Inoculation: How Controlled Exposure Builds Resilience',
    'stress-inoculation-how-controlled-exposure-builds-resilience',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Stress Inoculation', 'Resilience', 'Coping Skills', 'Psychology', 'Growth'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-040',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how gradual, manageable stress exposure can strengthen your stress response system and build lasting psychological resilience.',
    '/images/articles/cat02/cover-040.svg',
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

  -- === CAT02-031 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-031';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Chronic stress, cortisol dysfunction, and pain: A psychoneuroendocrine rationale for stress management in pain rehabilitation', '2014', 'https://doi.org/10.2522/ptj.20130597', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'The neurobiology of stress: From serendipity to clinical relevance', '2015', 'https://doi.org/10.1016/j.brainres.2015.02.019', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Stress and health: Major findings and policy implications', '2010', 'https://doi.org/10.1177/0022146510383499', 'Journal of Health and Social Behavior', 3),
      (v_art_id, 'government', 2, 'Chronic Stress', '2023', 'https://www.nimh.nih.gov/health/publications/stress', NULL, 4),
      (v_art_id, 'professional_org', 3, 'How stress affects your health', '2023', 'https://www.apa.org/topics/stress/health', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'The impact of stress on body function: A review', '2017', 'https://doi.org/10.17179/excli2017-480', 'EXCLI Journal', 6),
      (v_art_id, 'peer_reviewed', 1, 'Stress and the brain: From adaptation to disease', '2005', 'https://doi.org/10.1038/nrn1683', 'Nature Reviews Neuroscience', 7),
      (v_art_id, 'textbook', 5, 'Understanding the stress response', '2020', 'https://www.health.harvard.edu/staying-healthy/understanding-the-stress-response', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-032 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-032';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Physiology of the hypothalamic-pituitary-adrenal axis in health and dysregulation', '2016', 'https://doi.org/10.20452/pamw.3238', 'Polish Archives of Internal Medicine', 1),
      (v_art_id, 'peer_reviewed', 1, 'The role of the sympathetic nervous system in stress', '2015', 'https://doi.org/10.1016/j.autneu.2015.01.003', 'Autonomic Neuroscience', 2),
      (v_art_id, 'textbook', 5, 'Understanding the stress response', '2020', 'https://www.health.harvard.edu/staying-healthy/understanding-the-stress-response', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Cortisol dysregulation: The bidirectional link between stress, depression, and type 2 diabetes mellitus', '2012', 'https://doi.org/10.1111/j.1749-6632.2012.06572.x', 'Annals of the New York Academy of Sciences', 4),
      (v_art_id, 'peer_reviewed', 1, 'The neurobiology of the stress response', '2006', 'https://doi.org/10.31887/DCNS.2006.8.4/ssmith', 'Dialogues in Clinical Neuroscience', 5),
      (v_art_id, 'peer_reviewed', 1, 'Chronic stress and the brain', '2012', 'https://doi.org/10.1038/nrn3339', 'Nature Reviews Neuroscience', 6),
      (v_art_id, 'textbook', 5, 'The autonomic nervous system and stress', '2016', 'https://doi.org/10.1002/cphy.c150017', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Stress and the individual: Mechanisms leading to disease', '1993', 'https://doi.org/10.1001/archinte.1993.00410180039004', 'Archives of Internal Medicine', 8),
      (v_art_id, 'peer_reviewed', 1, 'The stress system in the human brain in depression and neurodegeneration', '2015', 'https://doi.org/10.1016/j.arr.2015.03.003', 'Ageing Research Reviews', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-033 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-033';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'textbook', 5, 'The paradox of choice: Why more is less', '2004', 'https://www.harpercollins.com/products/the-paradox-of-choice-barry-schwartz', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive overload and decision-making', '2011', 'https://doi.org/10.1016/j.cogpsych.2011.01.001', 'Cognitive Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'The neuropsychology of stress and coping', '2015', 'https://doi.org/10.1016/j.neubiorev.2015.03.003', 'Neuroscience and Biobehavioral Reviews', 3),
      (v_art_id, 'peer_reviewed', 1, 'Stress and the brain', '2013', 'https://doi.org/10.1097/YCO.0b013e32835ee5b5', 'Current Opinion in Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'The role of emotion regulation in stress and health', '2015', 'https://doi.org/10.1111/jopy.12162', 'Journal of Personality', 5),
      (v_art_id, 'professional_org', 3, 'Coping with stress', '2023', 'https://www.apa.org/topics/stress/coping', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'The science of breaking things down', '2016', 'https://doi.org/10.1037/xge0000147', 'Journal of Experimental Psychology: General', 7),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness and stress reduction', '2011', 'https://doi.org/10.1016/j.cpr.2010.11.003', 'Clinical Psychology Review', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-034 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-034';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Ego depletion: Is the active self a limited resource?', '1998', 'https://doi.org/10.1037/0022-3514.74.5.1252', 'Journal of Personality and Social Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Decision fatigue exhausts self-regulatory resources', '2011', 'https://doi.org/10.1177/1948550610382554', 'Social Psychological and Personality Science', 2),
      (v_art_id, 'textbook', 5, 'The paradox of choice: Why more is less', '2004', 'https://www.harpercollins.com/products/the-paradox-of-choice-barry-schwartz', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Judicial decision-making and the effect of decision fatigue', '2011', 'https://doi.org/10.1073/pnas.1018033108', 'Proceedings of the National Academy of Sciences', 4),
      (v_art_id, 'peer_reviewed', 1, 'The mere urgency effect', '2018', 'https://doi.org/10.1093/jcr/ucy008', 'Journal of Consumer Research', 5),
      (v_art_id, 'peer_reviewed', 1, 'How our mental systems control behavior', '2014', 'https://doi.org/10.1037/a0035918', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Decision-making strategies', '2016', 'https://doi.org/10.1146/annurev-psych-010814-015331', 'Annual Review of Psychology', 7),
      (v_art_id, 'textbook', 5, 'The willpower instinct: How self-control works', '2012', 'https://www.penguinrandomhouse.com/books/209319/the-willpower-instinct-by-kelly-mcgonigal-phd/', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-035 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-035';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Stress effects on memory: An update and integration', '2015', 'https://doi.org/10.1016/j.neubiorev.2015.08.014', 'Neuroscience and Biobehavioral Reviews', 1),
      (v_art_id, 'peer_reviewed', 1, 'The effects of acute and chronic stress on memory', '2017', 'https://doi.org/10.3390/bs7040062', 'Behavioral Sciences', 2),
      (v_art_id, 'peer_reviewed', 1, 'Stress and the brain: From adaptation to disease', '2005', 'https://doi.org/10.1038/nrn1683', 'Nature Reviews Neuroscience', 3),
      (v_art_id, 'peer_reviewed', 1, 'Chronic stress and hippocampal structure and function', '2016', 'https://doi.org/10.1002/hipo.22642', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Working memory capacity and the scope and control of attention', '2016', 'https://doi.org/10.1177/0963721415622047', 'Current Directions in Psychological Science', 5),
      (v_art_id, 'peer_reviewed', 1, 'Cortisol effects on memory consolidation depend on time of day', '2013', 'https://doi.org/10.1101/lm.029892.112', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'The impact of stress on memory', '2019', 'https://doi.org/10.1016/j.neulet.2018.12.007', 'Neuroscience Letters', 7),
      (v_art_id, 'peer_reviewed', 1, 'Mechanisms underlying stress-induced modulation of memory', '2017', 'https://doi.org/10.1016/j.cobeha.2016.12.004', 'Current Opinion in Behavioral Sciences', 8),
      (v_art_id, 'peer_reviewed', 1, 'Exercise and stress: Neural mechanisms', '2018', 'https://doi.org/10.3389/fnins.2018.00894', 'Frontiers in Neuroscience', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-036 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-036';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Chronic stress and mortality: A systematic review and meta-analysis', '2017', 'https://doi.org/10.1371/journal.pone.0181124', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'The impact of stress on body function: A review', '2017', 'https://doi.org/10.17179/excli2017-480', 'EXCLI Journal', 2),
      (v_art_id, 'peer_reviewed', 1, 'Stress and cardiovascular disease', '2012', 'https://doi.org/10.1038/nrcardio.2012.45', 'Nature Reviews Cardiology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Psychological stress and the human immune system', '2004', 'https://doi.org/10.1037/0033-2909.130.4.601', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Chronic stress, inflammation, and disease', '2012', 'https://doi.org/10.2741/3939', 'Frontiers in Bioscience', 5),
      (v_art_id, 'peer_reviewed', 1, 'Stress and the gastrointestinal tract', '2011', 'https://pubmed.ncbi.nlm.nih.gov/22314561/', 'Journal of Physiology and Pharmacology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Stress and obesity', '2018', 'https://doi.org/10.1146/annurev-psych-010416-044201', 'Annual Review of Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Chronic stress and accelerated aging', '2016', 'https://doi.org/10.1016/j.arr.2016.05.005', 'Ageing Research Reviews', 8),
      (v_art_id, 'peer_reviewed', 1, 'How stress influences disease', '2005', 'https://doi.org/10.1126/science.1112609', 'Science', 9),
      (v_art_id, 'textbook', 5, 'Stress management and disease prevention', '2014', 'https://doi.org/10.1016/j.mayocp.2014.10.009', 'Mayo Clinic Proceedings', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-037 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-037';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Financial stress and mental health among higher education students', '2019', 'https://doi.org/10.1080/07448481.2019.1705825', 'Journal of American College Health', 1),
      (v_art_id, 'peer_reviewed', 1, 'The psychological consequences of money', '2006', 'https://doi.org/10.1126/science.1132491', 'Science', 2),
      (v_art_id, 'peer_reviewed', 1, 'Financial stress and health', '2013', 'https://doi.org/10.1111/fare.12029', NULL, 3),
      (v_art_id, 'professional_org', 3, 'Money and mental health', '2022', 'https://www.mentalhealth.org.uk/our-work/research/money-and-mental-health', NULL, 4),
      (v_art_id, 'professional_org', 3, 'Financial wellbeing and mental health', '2023', 'https://www.apa.org/topics/money-stress', NULL, 5),
      (v_art_id, 'textbook', 5, 'Financial therapy: Theory, research, and practice', '2015', 'https://doi.org/10.1007/978-3-319-08269-1', NULL, 6),
      (v_art_id, 'textbook', 5, 'Scarcity: Why having too little means so much', '2013', 'https://us.macmillan.com/books/9780805092646/scarcity', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Financial behavior and financial well-being', '2018', 'https://doi.org/10.1891/1052-3073.29.2.313', 'Journal of Financial Counseling and Planning', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-038 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-038';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Caregiver burden: A concept analysis', '2012', 'https://doi.org/10.1016/j.ijnurstu.2011.12.014', 'International Journal of Nursing Studies', 1),
      (v_art_id, 'peer_reviewed', 1, 'Caregiving as a risk factor for mortality', '1999', 'https://doi.org/10.1001/jama.282.23.2215', NULL, 2),
      (v_art_id, 'professional_org', 3, 'The physical and mental health of family caregivers', '2023', 'https://www.caregiver.org/resource/caregiver-health/', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Chronic stress and telomere length in caregivers', '2004', 'https://doi.org/10.1073/pnas.0407162101', 'Proceedings of the National Academy of Sciences', 4),
      (v_art_id, 'peer_reviewed', 1, 'Interventions to reduce caregiver burden', '2020', 'https://doi.org/10.1002/14651858.CD009457.pub2', 'Cochrane Database of Systematic Reviews', 5),
      (v_art_id, 'peer_reviewed', 1, 'Compassion fatigue and burnout in nursing', '2016', 'https://doi.org/10.1111/jnu.12234', 'Journal of Nursing Scholarship', 6),
      (v_art_id, 'professional_org', 3, 'Caregiver support and outcomes', '2023', 'https://www.apa.org/pi/about/publications/caregivers', NULL, 7),
      (v_art_id, 'textbook', 5, 'The self-compassion workbook for caregivers', '2019', 'https://www.newharbinger.com/9781684033720/the-self-compassion-workbook-for-caregivers/', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-039 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-039';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Allostasis and allostatic load: Implications for neuropsychopharmacology', '2000', 'https://doi.org/10.1016/S0893-133X(99)00129-3', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'The protective and damaging effects of stress mediators', '1998', 'https://doi.org/10.1056/NEJM199801153380307', 'New England Journal of Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'Allostatic load biomarkers of chronic stress and impact on health', '2018', 'https://doi.org/10.1016/j.yfrne.2018.10.001', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Cumulative biological risk and socioeconomic differences in mortality', '2009', 'https://doi.org/10.1016/j.socscimed.2009.06.022', 'Social Science & Medicine', 4),
      (v_art_id, 'peer_reviewed', 1, 'Allostatic load and health disparities', '2019', 'https://doi.org/10.1146/annurev-publhealth-040218-043744', 'Annual Review of Public Health', 5),
      (v_art_id, 'peer_reviewed', 1, 'Stress, allostatic load, and aging', '2016', 'https://doi.org/10.1016/j.psyneuen.2016.02.031', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Reducing allostatic load through mindfulness', '2019', 'https://doi.org/10.1097/PSY.0000000000000696', 'Psychosomatic Medicine', 7),
      (v_art_id, 'government', 2, 'Allostatic load measurement', '2023', 'https://www.nia.nih.gov/', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-040 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-040';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'textbook', 5, 'Stress inoculation training: A preventative and treatment approach', '2017', 'https://www.guilford.com/books/Stress-Inoculation-Training/Donald-Meichenbaum/9781462528844', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Building resilience through stress inoculation', '2014', 'https://doi.org/10.1016/j.cpr.2014.01.003', 'Clinical Psychology Review', 2),
      (v_art_id, 'textbook', 5, 'The upside of stress: Why stress is good for you, and how to get good at it', '2015', 'https://www.penguinrandomhouse.com/books/317526/the-upside-of-stress-by-kelly-mcgonigal-phd/', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Moderate stress enhances learning and memory', '2012', 'https://doi.org/10.1016/j.nlm.2012.02.003', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Hormesis and health: A little stress is good for you', '2008', 'https://doi.org/10.1126/science.1150760', 'Science', 5),
      (v_art_id, 'peer_reviewed', 1, 'Resilience training programs: A systematic review', '2016', 'https://doi.org/10.1016/j.amepre.2016.01.037', 'American Journal of Preventive Medicine', 6),
      (v_art_id, 'peer_reviewed', 1, 'Growth through adversity: Examining the relationship between challenge and resilience', '2018', 'https://doi.org/10.1111/jopy.12356', 'Journal of Personality', 7),
      (v_art_id, 'professional_org', 3, 'Stress inoculation for health care professionals', '2021', 'https://www.apa.org/topics/resilience/inoculation', NULL, 8)
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
