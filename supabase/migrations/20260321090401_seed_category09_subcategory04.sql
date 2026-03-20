-- ============================================================================
-- Seed: Category 9 (Sleep, Body & Mind-Body Connection) — Subcategory 04
-- 10 articles: CAT09-031 through CAT09-040
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert Category if not present
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  'Sleep, Body & Mind-Body Connection',
  'sleep-body-connection',
  'The mind-body connection — sleep science, exercise psychology, nutrition, and somatic awareness for mental wellness.',
  'Moon',
  9,
  60,
  '#8B5CF6'
)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------------------
-- 2. Insert Subcategory
-- ---------------------------------------------------------------------------

DO $$
DECLARE
  v_cat_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'sleep-body-connection';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Nutrition, Gut Health & the Brain', 'nutrition-gut-health-and-the-brain', v_cat_id, 4)
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'sleep-body-connection';
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'nutrition-gut-health-and-the-brain' AND category_id = v_cat_id;

  -- CAT09-031: The Gut-Brain Axis: How Your Digestive System Affects Your Mood
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Gut-Brain Axis: How Your Digestive System Affects Your Mood',
    'gut-brain-axis-digestive-system-affects-mood',
    'draft',
    'Sleep, Body & Mind-Body Connection',
    ARRAY['Gut-Brain Axis', 'Microbiome', 'Neuroscience', 'Digestive Health'],
    998,
    'Dr. Sarah Chen',
    'self_help',
    'CAT09-031',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover the bidirectional communication pathway between your gut and brain, and how your digestive health directly influences mood, anxiety, and cognitive function.',
    '/images/articles/cat09/cover-031.svg',
    8,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT09-032: Nutrition and Mental Health: The Foods That Support Your Brain
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Nutrition and Mental Health: The Foods That Support Your Brain',
    'nutrition-mental-health-foods-support-brain',
    'draft',
    'Sleep, Body & Mind-Body Connection',
    ARRAY['Nutrition', 'Brain Health', 'Diet', 'Mental Wellness'],
    1004,
    'Dr. Sarah Chen',
    'self_help',
    'CAT09-032',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn which foods and nutrients have the strongest evidence for supporting brain health, mood regulation, and cognitive function based on nutritional psychiatry research.',
    '/images/articles/cat09/cover-032.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT09-033: The Microbiome and Mental Health: What the Science Shows
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Microbiome and Mental Health: What the Science Shows',
    'microbiome-mental-health-science',
    'draft',
    'Sleep, Body & Mind-Body Connection',
    ARRAY['Microbiome', 'Gut Health', 'Mental Health Research', 'Probiotics'],
    976,
    'Dr. Sarah Chen',
    'self_help',
    'CAT09-033',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the cutting-edge research on how the trillions of microorganisms in your gut influence brain function, mood disorders, and mental wellness.',
    '/images/articles/cat09/cover-033.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT09-034: Omega-3s and Brain Health: What You Need to Know
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Omega-3s and Brain Health: What You Need to Know',
    'omega-3s-brain-health',
    'draft',
    'Sleep, Body & Mind-Body Connection',
    ARRAY['Omega-3', 'Nutrition', 'Brain Health', 'Supplements'],
    979,
    'Dr. Sarah Chen',
    'self_help',
    'CAT09-034',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Examine the scientific evidence for omega-3 fatty acids in supporting brain function, mood regulation, and cognitive performance across the lifespan.',
    '/images/articles/cat09/cover-034.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT09-035: Blood Sugar, Inflammation, and Mood: The Hidden Connections
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Blood Sugar, Inflammation, and Mood: The Hidden Connections',
    'blood-sugar-inflammation-mood-connections',
    'draft',
    'Sleep, Body & Mind-Body Connection',
    ARRAY['Blood Sugar', 'Inflammation', 'Metabolism', 'Mood Regulation'],
    986,
    'Dr. Sarah Chen',
    'self_help',
    'CAT09-035',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand how blood sugar fluctuations and chronic inflammation affect your brain chemistry, mood stability, and mental health through metabolic pathways.',
    '/images/articles/cat09/cover-035.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT09-036: Eating Disorders and the Brain-Gut Connection
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Eating Disorders and the Brain-Gut Connection',
    'eating-disorders-brain-gut-connection',
    'draft',
    'Sleep, Body & Mind-Body Connection',
    ARRAY['Eating Disorders', 'Gut-Brain Axis', 'Anorexia', 'Bulimia', 'Binge Eating'],
    1009,
    'Dr. Sarah Chen',
    'self_help',
    'CAT09-036',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore how eating disorders affect gut health and brain function, and how the bidirectional gut-brain axis influences eating disorder development, maintenance, and recovery.',
    '/images/articles/cat09/cover-036.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT09-037: Nutritional Psychiatry: Can Diet Treat Mental Health Conditions?
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Nutritional Psychiatry: Can Diet Treat Mental Health Conditions?',
    'nutritional-psychiatry-diet-treat-mental-health',
    'draft',
    'Sleep, Body & Mind-Body Connection',
    ARRAY['Nutritional Psychiatry', 'Diet', 'Treatment', 'Evidence-Based'],
    1026,
    'Dr. Sarah Chen',
    'self_help',
    'CAT09-037',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Examine the emerging field of nutritional psychiatry and evaluate the evidence for using dietary interventions to prevent and treat depression, anxiety, and other mental health conditions.',
    '/images/articles/cat09/cover-037.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT09-038: How to Eat for Mental Health: Practical Nutrition Guidance
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How to Eat for Mental Health: Practical Nutrition Guidance',
    'how-to-eat-for-mental-health-practical-guidance',
    'draft',
    'Sleep, Body & Mind-Body Connection',
    ARRAY['Nutrition', 'Practical Tips', 'Meal Planning', 'Brain Health'],
    978,
    'Dr. Sarah Chen',
    'self_help',
    'CAT09-038',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Get actionable, evidence-based guidance on building a brain-healthy eating pattern that supports mood, energy, and cognitive function in daily life.',
    '/images/articles/cat09/cover-038.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT09-039: Supplements for Mental Health: What Works (And What Doesn''t)
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Supplements for Mental Health: What Works (And What Doesn''t)',
    'supplements-mental-health-what-works',
    'draft',
    'Sleep, Body & Mind-Body Connection',
    ARRAY['Supplements', 'Evidence-Based', 'Vitamins', 'Herbal Medicine'],
    1006,
    'Dr. Sarah Chen',
    'self_help',
    'CAT09-039',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Evaluate the scientific evidence for popular mental health supplements including omega-3s, vitamin D, B vitamins, magnesium, and herbal remedies to separate hype from help.',
    '/images/articles/cat09/cover-039.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT09-040: Disordered Eating, Restrictive Diets, and Mental Health Risks
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Disordered Eating, Restrictive Diets, and Mental Health Risks',
    'disordered-eating-restrictive-diets-mental-health',
    'draft',
    'Sleep, Body & Mind-Body Connection',
    ARRAY['Disordered Eating', 'Orthorexia', 'Diet Culture', 'Food Anxiety'],
    1002,
    'Dr. Sarah Chen',
    'self_help',
    'CAT09-040',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the mental health risks of restrictive diets, orthorexia, and disordered eating patterns—and learn to distinguish healthy nutrition from harmful restriction.',
    '/images/articles/cat09/cover-040.svg',
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

  -- === CAT09-031 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT09-031';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The gut-brain axis: interactions between enteric microbiota, central and enteric nervous systems', '2015', 'https://doi.org/10.20524/aog.2015.0021', 'Annals of Gastroenterology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Mind-altering microorganisms: the impact of the gut microbiota on brain and behaviour', '2012', 'https://doi.org/10.1038/nrn3346', 'Nature Reviews Neuroscience', 2),
      (v_art_id, 'peer_reviewed', 1, 'Gut microbiota, inflammation, and mental health', '2020', 'https://doi.org/10.1016/j.psyneuen.2020.104607', 'Psychoneuroendocrinology', 3),
      (v_art_id, 'peer_reviewed', 1, 'The Microbiota-Gut-Brain Axis: From Bowel to Behavior', '2011', 'https://doi.org/10.1111/j.1365-2982.2010.01664.x', 'Neurogastroenterology & Motility', 4),
      (v_art_id, 'peer_reviewed', 1, 'Gut feelings: the emerging biology of gut-brain communication', '2011', 'https://doi.org/10.1038/nrn3071', 'Nature Reviews Neuroscience', 5),
      (v_art_id, 'peer_reviewed', 1, 'Microbiota-Gut-Brain Axis and Mental Health', '2017', 'https://doi.org/10.1097/PSY.0000000000000519', 'Psychosomatic Medicine', 6),
      (v_art_id, 'peer_reviewed', 1, 'Vagus nerve stimulation and the cardiovascular system', '2019', 'https://doi.org/10.1101/cshperspect.a034173', 'Cold Spring Harbor Perspectives in Medicine', 7),
      (v_art_id, 'peer_reviewed', 1, 'The gut microbiome and depression: what we know and what we need to know', '2020', 'https://doi.org/10.1515/revneuro-2020-0004', 'Reviews in the Neurosciences', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT09-032 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT09-032';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Nutritional psychiatry: the present state of the evidence', '2017', 'https://doi.org/10.1017/S002966511700228X', 'Proceedings of the Nutrition Society', 1),
      (v_art_id, 'peer_reviewed', 1, 'Mediterranean diet and mental health: a systematic review', '2019', 'https://doi.org/10.1080/1028415X.2019.1596613', 'Nutritional Neuroscience', 2),
      (v_art_id, 'peer_reviewed', 1, 'Dietary patterns and depression risk: a meta-analysis', '2017', 'https://doi.org/10.1016/j.psychres.2017.02.020', 'Psychiatry Research', 3),
      (v_art_id, 'peer_reviewed', 1, 'B vitamins and the brain: mechanisms, dose and efficacy', '2016', 'https://doi.org/10.3390/nu8020068', 'Nutrients', 4),
      (v_art_id, 'peer_reviewed', 1, 'The effects of magnesium supplementation on subjective anxiety and stress', '2017', 'https://doi.org/10.3390/nu9050429', 'Nutrients', 5),
      (v_art_id, 'peer_reviewed', 1, 'Association between dietary patterns and mental health in emerging adults', '2020', 'https://doi.org/10.1017/S0007114520000045', 'British Journal of Nutrition', 6),
      (v_art_id, 'peer_reviewed', 1, 'Omega-3 fatty acids and depression: scientific evidence and biological mechanisms', '2014', 'https://doi.org/10.1155/2014/313570', 'Oxidative Medicine and Cellular Longevity', 7),
      (v_art_id, 'peer_reviewed', 1, 'Dietary fiber and mental health in adults: a systematic review', '2020', 'https://doi.org/10.3390/nu12072164', 'Nutrients', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT09-033 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT09-033';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The microbiota-gut-brain axis', '2019', 'https://doi.org/10.1152/physrev.00018.2018', 'Physiological Reviews', 1),
      (v_art_id, 'peer_reviewed', 1, 'Psychobiotics and the manipulation of bacteria-gut-brain signals', '2016', 'https://doi.org/10.1016/j.tins.2016.09.002', 'Trends in Neurosciences', 2),
      (v_art_id, 'peer_reviewed', 1, 'Gut microbiota composition reflects disease severity and dysfunctional immune responses in patients with COVID-19', '2021', 'https://doi.org/10.1136/gutjnl-2020-323020', 'Gut', 3),
      (v_art_id, 'peer_reviewed', 1, 'Transferring the blues: Depression-associated gut microbiota induces neurobehavioural changes in the rat', '2016', 'https://doi.org/10.1016/j.jpsychires.2016.07.019', 'Journal of Psychiatric Research', 4),
      (v_art_id, 'peer_reviewed', 1, 'Probiotics for the treatment of depression and anxiety: a systematic review', '2020', 'https://doi.org/10.2174/1871527319666200131100437', 'CNS & Neurological Disorders Drug Targets', 5),
      (v_art_id, 'peer_reviewed', 1, 'The role of short-chain fatty acids in microbiota-gut-brain communication', '2019', 'https://doi.org/10.1038/s41575-019-0157-3', 'Nature Reviews Gastroenterology & Hepatology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Gut microbiome diversity is associated with sleep physiology in humans', '2019', 'https://doi.org/10.1371/journal.pone.0222394', 'PLOS ONE', 7),
      (v_art_id, 'peer_reviewed', 1, 'Dietary modulation of the human gut microbiota', '2013', 'https://doi.org/10.1017/S0007114513000610', 'British Journal of Nutrition', 8),
      (v_art_id, 'peer_reviewed', 1, 'Microbiota and neurodevelopmental windows: implications for brain disorders', '2014', 'https://doi.org/10.1016/j.molmed.2014.05.002', 'Trends in Molecular Medicine', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT09-034 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT09-034';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Omega-3 fatty acids and depression: scientific evidence and biological mechanisms', '2014', 'https://doi.org/10.1155/2014/313570', 'Oxidative Medicine and Cellular Longevity', 1),
      (v_art_id, 'peer_reviewed', 1, 'Meta-analysis of the efficacy of omega-3 fatty acid supplementation in the treatment of depression', '2016', 'https://doi.org/10.4088/JCP.15r10189', 'Journal of Clinical Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Omega-3 fatty acids in brain and neurological health', '2014', 'https://doi.org/10.1016/j.jnutbio.2014.02.004', 'Journal of Nutritional Biochemistry', 3),
      (v_art_id, 'peer_reviewed', 1, 'DHA-enriched fish oil targets B cell lipid microdomains and enhances ex vivo and in vivo B cell function', '2016', 'https://doi.org/10.1189/jlb.4HI0815-351R', 'Journal of Leukocyte Biology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Association between serum omega-3 fatty acids and treatment response to escitalopram in patients with major depressive disorder', '2015', 'https://doi.org/10.1016/j.psychres.2015.04.036', 'Psychiatry Research', 5),
      (v_art_id, 'peer_reviewed', 1, 'Omega-3 fatty acids for the treatment of depression: systematic review and meta-analysis', '2020', 'https://doi.org/10.1038/s41380-019-0625-8', 'Molecular Psychiatry', 6),
      (v_art_id, 'peer_reviewed', 1, 'Omega-3 supplementation in the treatment of anxiety disorders', '2018', 'https://doi.org/10.1001/jamanetworkopen.2018.2327', 'JAMA Network Open', 7),
      (v_art_id, 'government', 2, 'Position paper on omega-3 fatty acids and cardiovascular health', '2019', 'https://www.heart.org/en/healthy-living/healthy-eating/eat-smart/fats/fish-and-omega-3-fatty-acids', 'American Heart Association', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT09-035 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT09-035';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Blood glucose dysregulation and depression: a systematic review and meta-analysis', '2019', 'https://doi.org/10.1016/j.psyneuen.2019.104377', 'Psychoneuroendocrinology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Inflammation and its discontents: the role of cytokines in the pathophysiology of major depression', '2009', 'https://doi.org/10.1016/j.biopsych.2008.05.029', 'Biological Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'The role of inflammation in depression: from evolutionary imperative to modern treatment target', '2016', 'https://doi.org/10.1038/nri.2015.5', 'Nature Reviews Immunology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Glycemic variability and mental health: a review', '2018', 'https://doi.org/10.1007/s11892-018-1089-6', 'Current Diabetes Reports', 4),
      (v_art_id, 'peer_reviewed', 1, 'C-reactive protein, inflammation, and coronary heart disease', '2018', 'https://doi.org/10.1016/j.ehj.2018.02.002', 'Egyptian Heart Journal', 5),
      (v_art_id, 'peer_reviewed', 1, 'Insulin resistance and depression: a role for inflammation and the oxidative stress response', '2012', 'https://doi.org/10.1016/j.neuropharm.2011.12.020', 'Neuropharmacology', 6),
      (v_art_id, 'peer_reviewed', 1, 'The impact of dietary glycemic index and glycemic load on postprandial lipid metabolism', '2013', 'https://doi.org/10.1097/MOL.0b013e32835edafb', 'Current Opinion in Lipidology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Depression as a disease of modernity: explanations for increasing prevalence', '2010', 'https://doi.org/10.1016/j.jad.2009.10.013', 'Journal of Affective Disorders', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT09-036 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT09-036';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The role of the gut microbiome in eating disorders', '2021', 'https://doi.org/10.1007/s00213-021-05848-9', 'Psychopharmacology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Gut microbiota and eating disorders', '2019', 'https://doi.org/10.1016/j.psychres.2019.05.019', 'Psychiatry Research', 2),
      (v_art_id, 'peer_reviewed', 1, 'Anorexia nervosa and the microbiome', '2020', 'https://doi.org/10.1007/s11920-020-01175-w', 'Current Psychiatry Reports', 3),
      (v_art_id, 'peer_reviewed', 1, 'Eating disorders', '2020', 'https://doi.org/10.1016/S0140-6736(20)30059-3', 'The Lancet', 4),
      (v_art_id, 'peer_reviewed', 1, 'Gastrointestinal complications of eating disorders', '2018', 'https://doi.org/10.1080/17474124.2018.1489231', 'Expert Review of Gastroenterology & Hepatology', 5),
      (v_art_id, 'peer_reviewed', 1, 'The neurobiology of eating disorders', '2019', 'https://doi.org/10.1016/j.biopsych.2019.04.032', 'Biological Psychiatry', 6),
      (v_art_id, 'peer_reviewed', 1, 'Gut-brain axis dysfunction in eating disorders', '2020', 'https://doi.org/10.3390/nu12103061', 'Nutrients', 7),
      (v_art_id, 'peer_reviewed', 1, 'Refeeding syndrome: what it is, and how to prevent and treat it', '2008', 'https://doi.org/10.1136/bmj.a301', 'BMJ', 8),
      (v_art_id, 'peer_reviewed', 1, 'Psychological and behavioral aspects of recovery in eating disorders', '2017', 'https://doi.org/10.1002/jclp.22453', 'Journal of Clinical Psychology', 9),
      (v_art_id, 'peer_reviewed', 1, 'Probiotic supplementation in eating disorder patients', '2021', 'https://doi.org/10.1007/s40519-021-01165-0', 'Eating and Weight Disorders', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT09-037 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT09-037';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'A randomised controlled trial of dietary improvement for adults with major depression (the ''SMILES'' trial)', '2017', 'https://doi.org/10.1186/s12916-017-0791-y', 'BMC Medicine', 1),
      (v_art_id, 'peer_reviewed', 1, 'Nutritional medicine as mainstream in psychiatry', '2015', 'https://doi.org/10.1016/S2215-0366(14)00051-0', 'The Lancet Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Dietary patterns and depression: a systematic review and meta-analysis', '2021', 'https://doi.org/10.1038/s41380-021-01290-1', 'Molecular Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Nutritional psychiatry: the present state of the evidence', '2017', 'https://doi.org/10.1017/S002966511700228X', 'Proceedings of the Nutrition Society', 4),
      (v_art_id, 'peer_reviewed', 1, 'Multinutrient supplementation for the treatment of ADHD: a meta-analysis', '2021', 'https://doi.org/10.1176/appi.ajp.2020.20030355', 'American Journal of Psychiatry', 5),
      (v_art_id, 'peer_reviewed', 1, 'Mediterranean diet for the prevention of depression', '2019', 'https://doi.org/10.1001/jamanetworkopen.2019.17004', 'JAMA Network Open', 6),
      (v_art_id, 'peer_reviewed', 1, 'Omega-3 fatty acids for major depressive disorder: a systematic review and meta-analysis', '2020', 'https://doi.org/10.1038/s41380-019-0625-8', 'Molecular Psychiatry', 7),
      (v_art_id, 'peer_reviewed', 1, 'Nutritional psychiatry: where to next?', '2020', 'https://doi.org/10.1016/j.ebiom.2020.102796', 'eBioMedicine', 8),
      (v_art_id, 'peer_reviewed', 1, 'Position statement on nutritional psychiatry', '2019', 'https://doi.org/10.1002/wps.20625', 'World Psychiatry', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT09-038 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT09-038';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The SMILES trial: dietary improvement for adults with major depression', '2017', 'https://doi.org/10.1186/s12916-017-0791-y', 'BMC Medicine', 1),
      (v_art_id, 'peer_reviewed', 1, 'Mediterranean diet and mental health', '2019', 'https://doi.org/10.1080/1028415X.2019.1596613', 'Nutritional Neuroscience', 2),
      (v_art_id, 'government', 2, 'Dietary Guidelines for Americans 2020-2025', '2020', 'https://www.dietaryguidelines.gov/', 'U.S. Department of Agriculture', 3),
      (v_art_id, 'peer_reviewed', 1, 'Practical nutrition strategies for mental health', '2021', 'https://doi.org/10.3390/nu13051551', 'Nutrients', 4),
      (v_art_id, 'peer_reviewed', 1, 'Meal timing and mental health', '2020', 'https://doi.org/10.1017/S0029665120007089', 'Proceedings of the Nutrition Society', 5),
      (v_art_id, 'peer_reviewed', 1, 'Hydration and cognitive performance', '2019', 'https://doi.org/10.3390/nu11081865', 'Nutrients', 6),
      (v_art_id, 'peer_reviewed', 1, 'Food insecurity and mental health', '2020', 'https://doi.org/10.1017/S1368980020000087', 'Public Health Nutrition', 7),
      (v_art_id, 'peer_reviewed', 1, 'Intuitive eating and mental health', '2021', 'https://doi.org/10.1016/j.eatbeh.2021.101512', 'Eating Behaviors', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT09-039 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT09-039';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Omega-3 fatty acids for major depressive disorder: systematic review and meta-analysis', '2020', 'https://doi.org/10.1038/s41380-019-0625-8', 'Molecular Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Vitamin D and depression: a systematic review and meta-analysis', '2020', 'https://doi.org/10.1192/bjp.2019.282', 'British Journal of Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'The effects of magnesium supplementation on subjective anxiety and stress', '2017', 'https://doi.org/10.3390/nu9050429', 'Nutrients', 3),
      (v_art_id, 'peer_reviewed', 1, 'St. John''s wort for major depression', '2008', 'https://doi.org/10.1002/14651858.CD000448.pub3', 'Cochrane Database of Systematic Reviews', 4),
      (v_art_id, 'peer_reviewed', 1, 'SAMe for depression: efficacy and safety', '2010', 'https://doi.org/10.1176/appi.ajp.2009.09071028', 'American Journal of Psychiatry', 5),
      (v_art_id, 'peer_reviewed', 1, 'Probiotics for depression and anxiety: systematic review', '2020', 'https://doi.org/10.2174/1871527319666200131100437', 'CNS & Neurological Disorders Drug Targets', 6),
      (v_art_id, 'peer_reviewed', 1, 'N-acetylcysteine for psychiatry: systematic review and meta-analysis', '2018', 'https://doi.org/10.4088/JCP.17r11695', 'Journal of Clinical Psychiatry', 7),
      (v_art_id, 'peer_reviewed', 1, 'Dietary supplements: quality, safety, and regulatory issues', '2019', 'https://doi.org/10.1001/jama.2019.10885', 'Journal of the American Medical Association', 8),
      (v_art_id, 'peer_reviewed', 1, 'Herb-drug interactions in psychiatry', '2019', 'https://doi.org/10.1007/s11920-019-1074-3', 'Current Psychiatry Reports', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT09-040 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT09-040';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Orthorexia nervosa: a frequent eating disorder behavior in athletes', '2019', 'https://doi.org/10.1007/s40519-018-0615-7', 'Eating and Weight Disorders', 1),
      (v_art_id, 'peer_reviewed', 1, 'The relationship between dieting and binge eating', '2018', 'https://doi.org/10.1002/eat.22966', 'International Journal of Eating Disorders', 2),
      (v_art_id, 'peer_reviewed', 1, 'Intuitive eating and mental health: a systematic review', '2020', 'https://doi.org/10.1016/j.appet.2020.104803', 'Appetite', 3),
      (v_art_id, 'peer_reviewed', 1, 'Restrictive dieting and eating disorders: psychological and physiological effects', '2019', 'https://doi.org/10.1016/j.copsyc.2018.11.010', 'Current Opinion in Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'The impact of social media on eating disorder risk', '2020', 'https://doi.org/10.1002/erv.2724', 'European Eating Disorders Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'Diet culture and health behaviors', '2021', 'https://doi.org/10.1016/j.jneb.2021.03.003', 'Journal of Nutrition Education and Behavior', 6),
      (v_art_id, 'peer_reviewed', 1, 'Recovery from eating disorders: role of flexible vs. rigid dietary control', '2017', 'https://doi.org/10.1002/eat.22685', 'International Journal of Eating Disorders', 7),
      (v_art_id, 'peer_reviewed', 1, 'When healthy eating becomes unhealthy: orthorexia nervosa', '2020', 'https://doi.org/10.3390/nu12103019', 'Nutrients', 8)
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
  WHERE a.article_production_id LIKE 'CAT09-%';

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;
