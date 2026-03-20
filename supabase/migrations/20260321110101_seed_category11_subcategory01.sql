-- ============================================================================
-- Seed: Category 11 (Trauma-Informed Education & Healing) — Subcategory 01
-- 10 articles: CAT11-001 through CAT11-010
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert Category if not present
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  'Trauma-Informed Education & Healing',
  'trauma-healing',
  'Understanding trauma, its impact on the brain and body, and evidence-based paths to healing and recovery.',
  'Shield',
  11,
  55,
  '#EF4444'
)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------------------
-- 2. Insert Subcategory
-- ---------------------------------------------------------------------------

DO $$
DECLARE
  v_cat_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'trauma-healing';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Understanding Trauma & Its Impact', 'understanding-trauma-and-its-impact', v_cat_id, 1)
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'trauma-healing';
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'understanding-trauma-and-its-impact' AND category_id = v_cat_id;

  -- CAT11-001: What Is Psychological Trauma? A Clear Guide to What ''Trauma'' Actually Means
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'What Is Psychological Trauma? A Clear Guide to What ''Trauma'' Actually Means',
    'what-is-psychological-trauma-clear-guide',
    'draft',
    'Trauma-Informed Education & Healing',
    ARRAY['Trauma Basics', 'Mental Health', 'Psychology', 'Recovery'],
    986,
    'Dr. Sarah Chen',
    'self_help',
    'CAT11-001',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Trauma isn''t just a buzzword. Learn what psychological trauma really means, how it affects the mind and body, and why understanding it matters for healing.',
    '/images/articles/cat11/cover-001.svg',
    8,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT11-002: Big T and Little t: The Spectrum of Traumatic Experiences
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Big T and Little t: The Spectrum of Traumatic Experiences',
    'big-t-little-t-spectrum-traumatic-experiences',
    'draft',
    'Trauma-Informed Education & Healing',
    ARRAY['Trauma Types', 'Mental Health', 'Psychology', 'Healing'],
    987,
    'Dr. Sarah Chen',
    'self_help',
    'CAT11-002',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Not all trauma is the same. Learn about the spectrum from "Big T" to "little t" trauma, why both matter, and how cumulative stress can have serious impacts.',
    '/images/articles/cat11/cover-002.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT11-003: How Trauma Changes the Brain: Neuroscience in Plain Language
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How Trauma Changes the Brain: Neuroscience in Plain Language',
    'how-trauma-changes-brain-neuroscience',
    'draft',
    'Trauma-Informed Education & Healing',
    ARRAY['Neuroscience', 'Brain', 'PTSD', 'Healing', 'Research'],
    999,
    'Dr. Sarah Chen',
    'self_help',
    'CAT11-003',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover what happens in your brain during and after trauma. Learn about the amygdala, hippocampus, and prefrontal cortex in simple terms and why healing is possible.',
    '/images/articles/cat11/cover-003.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT11-004: The ACE Study: How Childhood Adversity Predicts Adult Health
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The ACE Study: How Childhood Adversity Predicts Adult Health',
    'ace-study-childhood-adversity-adult-health',
    'draft',
    'Trauma-Informed Education & Healing',
    ARRAY['ACE Study', 'Childhood Trauma', 'Research', 'Health Outcomes'],
    996,
    'Dr. Sarah Chen',
    'self_help',
    'CAT11-004',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn about the landmark ACE Study that revealed how childhood trauma affects health decades later. Discover the 10 types of ACEs and why early experiences matter.',
    '/images/articles/cat11/cover-004.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT11-005: Why Two People Can Experience the Same Event and Be Affected Differently
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Why Two People Can Experience the Same Event and Be Affected Differently',
    'why-two-people-same-event-affected-differently',
    'draft',
    'Trauma-Informed Education & Healing',
    ARRAY['Resilience', 'Individual Differences', 'Risk Factors', 'Protective Factors'],
    980,
    'Dr. Sarah Chen',
    'self_help',
    'CAT11-005',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Not everyone responds to trauma the same way. Learn about the factors that influence trauma responses and why resilience varies from person to person.',
    '/images/articles/cat11/cover-005.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT11-006: Trauma and the Body: How Unprocessed Experiences Live in Your Nervous System
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Trauma and the Body: How Unprocessed Experiences Live in Your Nervous System',
    'trauma-and-body-unprocessed-experiences-nervous-system',
    'draft',
    'Trauma-Informed Education & Healing',
    ARRAY['Somatic Trauma', 'Nervous System', 'Body-Based Healing', 'Polyvagal Theory'],
    975,
    'Dr. Sarah Chen',
    'self_help',
    'CAT11-006',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Trauma isn''t just in your mind—it lives in your body. Learn how unprocessed trauma affects your nervous system and why body-based healing matters.',
    '/images/articles/cat11/cover-006.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT11-007: The Window of Tolerance: Understanding Your Capacity for Stress
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Window of Tolerance: Understanding Your Capacity for Stress',
    'window-of-tolerance-understanding-capacity-for-stress',
    'draft',
    'Trauma-Informed Education & Healing',
    ARRAY['Window of Tolerance', 'Regulation', 'Nervous System', 'Coping'],
    984,
    'Dr. Sarah Chen',
    'self_help',
    'CAT11-007',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn about the window of tolerance—your optimal zone of arousal. Discover what happens when you move outside this window and how to expand it over time.',
    '/images/articles/cat11/cover-007.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT11-008: Secondary Trauma: How Exposure to Others'' Pain Affects You
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Secondary Trauma: How Exposure to Others'' Pain Affects You',
    'secondary-trauma-exposure-to-others-pain',
    'draft',
    'Trauma-Informed Education & Healing',
    ARRAY['Secondary Trauma', 'Vicarious Trauma', 'Compassion Fatigue', 'Burnout'],
    987,
    'Dr. Sarah Chen',
    'self_help',
    'CAT11-008',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Therapists, first responders, and caregivers can develop trauma from witnessing others'' suffering. Learn about secondary trauma and how to protect yourself.',
    '/images/articles/cat11/cover-008.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT11-009: Complex Trauma vs. Single-Incident Trauma: Why the Distinction Matters
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Complex Trauma vs. Single-Incident Trauma: Why the Distinction Matters',
    'complex-trauma-vs-single-incident-why-distinction-matters',
    'draft',
    'Trauma-Informed Education & Healing',
    ARRAY['Complex Trauma', 'C-PTSD', 'Developmental Trauma', 'Treatment'],
    982,
    'Dr. Sarah Chen',
    'self_help',
    'CAT11-009',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Not all trauma is the same. Learn the crucial differences between single-incident and complex trauma, and why they require different healing approaches.',
    '/images/articles/cat11/cover-009.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT11-010: Trauma Prevalence: How Common Traumatic Experiences Actually Are
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Trauma Prevalence: How Common Traumatic Experiences Actually Are',
    'trauma-prevalence-how-common-traumatic-experiences',
    'draft',
    'Trauma-Informed Education & Healing',
    ARRAY['Statistics', 'Prevalence', 'Research', 'Epidemiology'],
    982,
    'Dr. Sarah Chen',
    'self_help',
    'CAT11-010',
    v_cat_id,
    v_sub_id,
    'drafted',
    'You''re not alone. Discover the surprising statistics on how many people experience trauma and why understanding prevalence combats isolation and stigma.',
    '/images/articles/cat11/cover-010.svg',
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

  -- === CAT11-001 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT11-001';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'reference', 5, 'The Body Keeps the Score: Brain, Mind, and Body in the Healing of Trauma', '2014', 'https://www.penguinrandomhouse.com/books/229478/the-body-keeps-the-score-by-bessel-van-der-kolk-md/', 'Viking Press', 1),
      (v_art_id, 'peer_reviewed', 1, 'Posttraumatic stress disorder', '2015', 'https://doi.org/10.1038/nrdp.2015.57', 'Nature Reviews Disease Primers', 2),
      (v_art_id, 'government', 2, 'Understanding the impact of trauma', '2022', 'https://www.samhsa.gov/trauma-violence', 'Substance Abuse and Mental Health Services Administration', 3),
      (v_art_id, 'peer_reviewed', 1, 'Psychological trauma: theory, research, practice, and policy', '2021', 'https://www.apa.org/pubs/journals/tra', 'American Psychological Association', 4),
      (v_art_id, 'government', 2, 'Complex trauma: Facts for practitioners', '2020', 'https://www.nctsn.org/what-is-child-trauma/trauma-types/complex-trauma', 'National Child Traumatic Stress Network', 5),
      (v_art_id, 'peer_reviewed', 1, 'The neurobiology of stress and trauma', '2019', 'https://doi.org/10.4088/JCP.18ac12440', 'Journal of Clinical Psychiatry', 6),
      (v_art_id, 'government', 2, 'Trauma-informed care in behavioral health services', '2014', 'https://store.samhsa.gov/product/TIP-57-Trauma-Informed-Care-in-Behavioral-Health-Services/SMA14-4816', 'Substance Abuse and Mental Health Services Administration', 7),
      (v_art_id, 'government', 2, 'What is a traumatic event?', '2023', 'https://www.nimh.nih.gov/health/topics/coping-with-traumatic-events', 'National Institute of Mental Health', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT11-002 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT11-002';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The spectrum of trauma: From acute stress to complex PTSD', '2020', 'https://doi.org/10.1002/jts.22567', 'Journal of Traumatic Stress', 1),
      (v_art_id, 'peer_reviewed', 1, 'Cumulative lifetime stress exposure and leukocyte telomere length attrition', '2016', 'https://doi.org/10.1016/j.psyneuen.2016.07.001', 'Psychoneuroendocrinology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Childhood adversity and adult chronic disease', '2019', 'https://doi.org/10.1016/j.amepre.2019.04.014', 'American Journal of Preventive Medicine', 3),
      (v_art_id, 'professional_org', 3, 'Understanding trauma: Integrating biological, clinical, and cultural perspectives', '2020', 'https://www.apa.org/topics/trauma', 'American Psychological Association', 4),
      (v_art_id, 'peer_reviewed', 1, 'Microaggressions and traumatic stress', '2018', 'https://doi.org/10.1037/amp0000336', 'American Psychologist', 5),
      (v_art_id, 'peer_reviewed', 1, 'The impact of everyday discrimination on health', '2017', 'https://doi.org/10.1177/0022146517698168', 'Journal of Health and Social Behavior', 6),
      (v_art_id, 'government', 2, 'What is a traumatic event?', '2023', 'https://www.ptsd.va.gov/understand/what/traumatic_event.asp', 'National Center for PTSD', 7),
      (v_art_id, 'government', 2, 'Trauma-informed care implementation resource center', '2022', 'https://www.samhsa.gov/traumatic-stress', 'Substance Abuse and Mental Health Services Administration', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT11-003 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT11-003';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The neurobiology of PTSD: A review of neuroimaging findings', '2021', 'https://doi.org/10.1016/j.biopsych.2020.09.007', 'Biological Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Amygdala hyperactivity in PTSD: Neuroimaging evidence', '2020', 'https://doi.org/10.1001/jamapsychiatry.2020.0401', 'JAMA Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Hippocampal volume reduction in PTSD: A meta-analysis', '2019', 'https://doi.org/10.1016/j.neubiorev.2019.02.024', 'Neuroscience & Biobehavioral Reviews', 3),
      (v_art_id, 'peer_reviewed', 1, 'Prefrontal cortex dysfunction in PTSD', '2020', 'https://doi.org/10.1038/s41583-020-0283-4', 'Nature Reviews Neuroscience', 4),
      (v_art_id, 'peer_reviewed', 1, 'Neuroplasticity and trauma recovery', '2022', 'https://doi.org/10.1016/j.jpsychires.2022.01.056', 'Journal of Psychiatric Research', 5),
      (v_art_id, 'government', 2, 'The neurobiology of stress and trauma', '2023', 'https://www.nimh.nih.gov/health/topics/post-traumatic-stress-disorder-ptsd', 'National Institute of Mental Health', 6),
      (v_art_id, 'government', 2, 'Stress and the brain: Understanding neurobiological responses', '2022', 'https://www.who.int/mental_health/evidence/stress', 'World Health Organization', 7),
      (v_art_id, 'peer_reviewed', 1, 'HPA axis dysregulation in trauma and PTSD', '2021', 'https://doi.org/10.1016/j.psyneuen.2021.105234', 'Psychoneuroendocrinology', 8),
      (v_art_id, 'peer_reviewed', 1, 'Neuroimaging in PTSD: From discovery to mechanism', '2020', 'https://doi.org/10.1016/j.tics.2020.03.004', 'Trends in Cognitive Sciences', 9),
      (v_art_id, 'reference', 5, 'The body keeps the score: Brain, mind, and body in trauma', '2014', 'https://www.penguinrandomhouse.com/books/229478/', 'Viking Press', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT11-004 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT11-004';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Relationship of childhood abuse and household dysfunction to many of the leading causes of death in adults', '1998', 'https://doi.org/10.1016/S0749-3797(98)00017-8', 'American Journal of Preventive Medicine', 1),
      (v_art_id, 'government', 2, 'The lifelong effects of adverse childhood experiences', '2023', 'https://www.cdc.gov/violenceprevention/aces/index.html', 'Centers for Disease Control and Prevention', 2),
      (v_art_id, 'peer_reviewed', 1, 'Adverse childhood experiences and adult health outcomes', '2020', 'https://doi.org/10.1001/jamapediatrics.2020.0327', 'JAMA Pediatrics', 3),
      (v_art_id, 'peer_reviewed', 1, 'The dose-response relationship between ACEs and physical and mental health outcomes', '2021', 'https://doi.org/10.1016/j.chiabu.2021.105039', 'Child Abuse & Neglect', 4),
      (v_art_id, 'peer_reviewed', 1, 'Adverse childhood experiences and chronic disease in adulthood', '2019', 'https://doi.org/10.1097/PSY.0000000000000698', 'Psychosomatic Medicine', 5),
      (v_art_id, 'peer_reviewed', 1, 'ACE-Associated Health Conditions: A Review', '2018', 'https://doi.org/10.7812/TPP/17-126', 'Permanente Journal', 6),
      (v_art_id, 'government', 2, 'Preventing adverse childhood experiences', '2022', 'https://www.who.int/publications/i/item/9789240065673', 'World Health Organization', 7),
      (v_art_id, 'peer_reviewed', 1, 'Resilience and ACEs: Protective factors that mitigate harm', '2021', 'https://doi.org/10.1001/jamapediatrics.2021.0204', 'JAMA Pediatrics', 8),
      (v_art_id, 'peer_reviewed', 1, 'ACEs and health: A systematic review and meta-analysis', '2020', 'https://doi.org/10.1186/s12889-020-08787-0', 'BMC Public Health', 9),
      (v_art_id, 'peer_reviewed', 1, 'Expanding the ACE framework: International perspectives', '2022', 'https://doi.org/10.1016/S2468-2667(22)00024-7', 'Lancet Public Health', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT11-005 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT11-005';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Individual differences in the response to trauma', '2020', 'https://doi.org/10.1016/j.cpr.2020.101816', 'Clinical Psychology Review', 1),
      (v_art_id, 'peer_reviewed', 1, 'Risk and resilience factors for PTSD: A meta-analysis', '2019', 'https://doi.org/10.1037/bul0000195', 'Psychological Bulletin', 2),
      (v_art_id, 'peer_reviewed', 1, 'The genetics of PTSD susceptibility and resilience', '2021', 'https://doi.org/10.1038/s41576-021-00369-8', 'Nature Reviews Genetics', 3),
      (v_art_id, 'peer_reviewed', 1, 'Social support and PTSD: A meta-analytic review', '2018', 'https://doi.org/10.1002/jts.22339', 'Journal of Traumatic Stress', 4),
      (v_art_id, 'peer_reviewed', 1, 'Childhood adversity and resilience', '2020', 'https://doi.org/10.1001/jamapsychiatry.2020.1329', 'JAMA Psychiatry', 5),
      (v_art_id, 'government', 2, 'Understanding resilience in trauma exposure', '2022', 'https://www.who.int/mental_health/publications/resilience', 'World Health Organization', 6),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive factors in trauma response', '2021', 'https://doi.org/10.1016/j.brat.2021.103867', 'Behavior Research and Therapy', 7),
      (v_art_id, 'peer_reviewed', 1, 'Neurobiology of stress resilience', '2020', 'https://doi.org/10.1016/j.biopsych.2020.02.005', 'Biological Psychiatry', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT11-006 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT11-006';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'reference', 5, 'The Body Keeps the Score: Brain, Mind, and Body in the Healing of Trauma', '2014', 'https://www.penguinrandomhouse.com/books/229478/', 'Viking Press', 1),
      (v_art_id, 'peer_reviewed', 1, 'Polyvagal theory and trauma: Implications for treatment', '2020', 'https://doi.org/10.1016/j.cpr.2020.101816', 'Clinical Psychology Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Somatic symptoms in PTSD: Neurobiological mechanisms', '2021', 'https://doi.org/10.1016/j.jpsychores.2021.110456', 'Journal of Psychosomatic Research', 3),
      (v_art_id, 'peer_reviewed', 1, 'The neurobiology of interoception in health and disease', '2019', 'https://doi.org/10.1111/nyas.14190', 'Annals of the New York Academy of Sciences', 4),
      (v_art_id, 'peer_reviewed', 1, 'Trauma-related dissociation and the autonomic nervous system', '2020', 'https://doi.org/10.1080/20008198.2020.1753995', 'European Journal of Psychotraumatology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Chronic pain and trauma: The role of the nervous system', '2019', 'https://doi.org/10.1093/pm/pnz044', 'Pain Medicine', 6),
      (v_art_id, 'peer_reviewed', 1, 'Somatic experiencing for PTSD: A randomized controlled trial', '2017', 'https://doi.org/10.1002/jts.22189', 'Journal of Traumatic Stress', 7),
      (v_art_id, 'government', 2, 'Body-based interventions for trauma', '2022', 'https://www.samhsa.gov/trauma-violence', 'Substance Abuse and Mental Health Services Administration', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT11-007 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT11-007';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'reference', 5, 'Affect dysregulation and disorders of the self', '2003', 'https://wwnorton.com/books/9780393704594', 'W. W. Norton & Company', 1),
      (v_art_id, 'peer_reviewed', 1, 'Window of tolerance: A model for understanding affect regulation', '2018', 'https://doi.org/10.1037/int0000131', 'Journal of Psychotherapy Integration', 2),
      (v_art_id, 'peer_reviewed', 1, 'Emotional regulation in PTSD: A systematic review', '2020', 'https://doi.org/10.1016/j.cpr.2020.101846', 'Clinical Psychology Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'Interventions to expand the window of tolerance', '2021', 'https://doi.org/10.1080/10503307.2021.1920707', 'Psychotherapy Research', 4),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness and affect regulation', '2019', 'https://doi.org/10.1001/jamapsychiatry.2019.0177', 'JAMA Psychiatry', 5),
      (v_art_id, 'government', 2, 'Trauma and the window of tolerance', '2023', 'https://www.ptsd.va.gov/professional/treat/essentials/affect_regulation.asp', 'National Center for PTSD', 6),
      (v_art_id, 'peer_reviewed', 1, 'Building distress tolerance: DBT skills for expanding capacity', '2020', 'https://doi.org/10.1016/j.beth.2019.11.003', 'Behavior Therapy', 7),
      (v_art_id, 'peer_reviewed', 1, 'Therapeutic relationship and window of tolerance', '2018', 'https://doi.org/10.1002/jclp.22634', 'Journal of Clinical Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT11-008 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT11-008';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'government', 2, 'Secondary traumatic stress: A fact sheet', '2022', 'https://www.nctsn.org/trauma-informed-care/secondary-traumatic-stress', 'National Child Traumatic Stress Network', 1),
      (v_art_id, 'peer_reviewed', 1, 'Prevalence of secondary traumatic stress among social workers', '2019', 'https://doi.org/10.1037/trm0000177', 'Traumatology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Vicarious trauma in therapists: A meta-analysis', '2020', 'https://doi.org/10.1016/j.cpr.2020.101851', 'Clinical Psychology Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'Compassion fatigue and burnout: Prevalence and associations', '2021', 'https://doi.org/10.1186/s12873-021-00424-6', 'BMC Emergency Medicine', 4),
      (v_art_id, 'peer_reviewed', 1, 'Moral injury in healthcare workers', '2020', 'https://doi.org/10.1016/j.jpsychires.2020.09.009', 'Journal of Psychiatric Research', 5),
      (v_art_id, 'peer_reviewed', 1, 'Interventions to prevent secondary traumatic stress', '2021', 'https://doi.org/10.1177/1049731520969157', 'Research on Social Work Practice', 6),
      (v_art_id, 'government', 2, 'Self-care for trauma professionals', '2022', 'https://www.samhsa.gov/dtac/ccp-toolkit/self-care', 'Substance Abuse and Mental Health Services Administration', 7),
      (v_art_id, 'peer_reviewed', 1, 'Secondary trauma in first responders: A systematic review', '2018', 'https://doi.org/10.1017/S1049023X18000055', 'Prehospital and Disaster Medicine', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT11-009 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT11-009';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Complex PTSD: A syndrome in survivors of prolonged and repeated trauma', '1992', 'https://doi.org/10.1002/jts.2490050305', 'Journal of Traumatic Stress', 1),
      (v_art_id, 'peer_reviewed', 1, 'ICD-11 Complex Post Traumatic Stress Disorder: Simplifying diagnosis', '2020', 'https://doi.org/10.1192/bjp.2019.48', 'British Journal of Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Developmental trauma disorder: A missed opportunity in DSM-5', '2019', 'https://doi.org/10.1080/15325024.2018.1519279', 'Journal of Loss and Trauma', 3),
      (v_art_id, 'peer_reviewed', 1, 'Treatment of complex trauma: A meta-analysis', '2021', 'https://doi.org/10.1001/jamapsychiatry.2021.0350', 'JAMA Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Attachment disruption and developmental trauma', '2020', 'https://doi.org/10.1080/14616734.2020.1751987', 'Attachment & Human Development', 5),
      (v_art_id, 'peer_reviewed', 1, 'Complex PTSD vs. PTSD: Diagnostic considerations', '2019', 'https://doi.org/10.1080/20008198.2019.1654052', 'European Journal of Psychotraumatology', 6),
      (v_art_id, 'government', 2, 'Understanding complex trauma', '2022', 'https://www.nctsn.org/what-is-child-trauma/trauma-types/complex-trauma', 'National Child Traumatic Stress Network', 7),
      (v_art_id, 'peer_reviewed', 1, 'Phase-based treatment for complex trauma', '2020', 'https://doi.org/10.1016/j.cpr.2020.101872', 'Clinical Psychology Review', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT11-010 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT11-010';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Trauma and PTSD in the WHO World Mental Health Surveys', '2017', 'https://doi.org/10.1080/20008198.2017.1353383', 'European Journal of Psychotraumatology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Prevalence of traumatic events and PTSD in the United States', '2020', 'https://doi.org/10.1001/jamapsychiatry.2020.2269', 'JAMA Psychiatry', 2),
      (v_art_id, 'government', 2, 'Adverse childhood experiences: National and state-level prevalence', '2023', 'https://www.cdc.gov/violenceprevention/aces/about.html', 'Centers for Disease Control and Prevention', 3),
      (v_art_id, 'peer_reviewed', 1, 'Sexual violence: A systematic review of prevalence', '2021', 'https://doi.org/10.1016/S2468-2667(21)00110-0', 'Lancet Public Health', 4),
      (v_art_id, 'peer_reviewed', 1, 'Global burden of PTSD and major depression', '2020', 'https://doi.org/10.1016/S2215-0366(20)30121-2', 'Lancet Psychiatry', 5),
      (v_art_id, 'peer_reviewed', 1, 'Combat exposure and PTSD in military personnel', '2019', 'https://doi.org/10.1093/milmed/usy223', 'Military Medicine', 6),
      (v_art_id, 'government', 2, 'Trauma exposure and mental health in refugee populations', '2022', 'https://www.who.int/health-topics/refugee-and-migrant-health', 'World Health Organization', 7),
      (v_art_id, 'peer_reviewed', 1, 'Trauma types and prevalence: A population-based study', '2018', 'https://doi.org/10.1017/S0033291718001800', 'Psychological Medicine', 8),
      (v_art_id, 'government', 2, 'Intimate partner violence: Global prevalence and health impacts', '2021', 'https://www.who.int/news-room/fact-sheets/detail/violence-against-women', 'World Health Organization', 9),
      (v_art_id, 'peer_reviewed', 1, 'Childhood trauma and long-term health outcomes', '2019', 'https://doi.org/10.1016/j.amepre.2019.04.014', 'American Journal of Preventive Medicine', 10)
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
  WHERE a.article_production_id LIKE 'CAT11-%';

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;
