-- ============================================================================
-- Seed: Category 2 (Anxiety, Stress & Overwhelm) — Subcategory 05
-- 10 articles: CAT02-041 through CAT02-050
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
  VALUES ('Burnout Emotional Exhaustion', 'burnout-emotional-exhaustion', v_cat_id, 5)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'burnout-emotional-exhaustion' AND category_id = v_cat_id;

  -- CAT02-041: What Is Burnout? The Three Dimensions of Emotional Exhaustion
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'What Is Burnout? The Three Dimensions of Emotional Exhaustion',
    'what-is-burnout-the-three-dimensions-of-emotional-exhaustion',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Burnout', 'Emotional Exhaustion', 'Mental Health', 'Work Stress'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-041',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the clinical definition of burnout, its three core components, and why it',
    '/images/articles/cat02/cover-041.svg',
    8,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-042: Am I Burned Out or Just Tired? How to Tell the Difference
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Am I Burned Out or Just Tired? How to Tell the Difference',
    'am-i-burned-out-or-just-tired-how-to-tell-the-difference',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Burnout', 'Fatigue', 'Self-Assessment', 'Mental Health'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-042',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn to distinguish between normal fatigue and clinical burnout with clear diagnostic criteria and self-assessment questions.',
    '/images/articles/cat02/cover-042.svg',
    6,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-043: The 12 Stages of Burnout: Recognizing the Progression Before It
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The 12 Stages of Burnout: Recognizing the Progression Before It',
    'the-12-stages-of-burnout-recognizing-the-progression-before-its-too-late',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Burnout', 'Prevention', 'Early Warning Signs', 'Mental Health'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-043',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn the sequential phases of burnout development, from early enthusiasm to complete collapse, and identify where you are before it becomes critical.',
    '/images/articles/cat02/cover-043.svg',
    6,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-044: Burnout in Healthcare Workers: A Crisis Within a Crisis
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Burnout in Healthcare Workers: A Crisis Within a Crisis',
    'burnout-in-healthcare-workers-a-crisis-within-a-crisis',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Healthcare Burnout', 'Physician Burnout', 'Compassion Fatigue', 'Medical Professionals'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-044',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the unique factors driving healthcare burnout, its impact on patient care, and evidence-based strategies for recovery and prevention.',
    '/images/articles/cat02/cover-044.svg',
    7,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-045: Academic Burnout: When the Pressure to Perform Breaks Students Down
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Academic Burnout: When the Pressure to Perform Breaks Students Down',
    'academic-burnout-when-the-pressure-to-perform-breaks-students-down',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Academic Burnout', 'Student Mental Health', 'School Stress', 'College Burnout'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-045',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the rising epidemic of student burnout, from high school to graduate school, and learn how to recognize and address it before it derails education.',
    '/images/articles/cat02/cover-045.svg',
    7,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-046: Parental Burnout: When Raising Children Depletes Your Capacity
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Parental Burnout: When Raising Children Depletes Your Capacity',
    'parental-burnout-when-raising-children-depletes-your-capacity',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Parental Burnout', 'Parenting Stress', 'Family Mental Health', 'Self-Care'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-046',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the unique phenomenon of parental burnout, its causes, warning signs, and evidence-based strategies to protect your wellbeing while caring for your children.',
    '/images/articles/cat02/cover-046.svg',
    7,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-047: Recovery from Burnout: What Science Says About How Long It Actually Takes
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Recovery from Burnout: What Science Says About How Long It Actually Takes',
    'recovery-from-burnout-what-science-says-about-how-long-it-actually-takes',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Burnout Recovery', 'Healing', 'Mental Health', 'Resilience'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-047',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn what research reveals about burnout recovery timelines, effective interventions, and why quick fixes don',
    '/images/articles/cat02/cover-047.svg',
    6,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-048: Burnout and Cynicism: When Exhaustion Changes How You See the World
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Burnout and Cynicism: When Exhaustion Changes How You See the World',
    'burnout-and-cynicism-when-exhaustion-changes-how-you-see-the-world',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Burnout', 'Cynicism', 'Meaning', 'Hope', 'Recovery'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-048',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand how chronic burnout reshapes your worldview into cynicism and detachment, and what it takes to reconnect with meaning and hope.',
    '/images/articles/cat02/cover-048.svg',
    4,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-049: Preventing Burnout: Organizational vs. Individual Strategies
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Preventing Burnout: Organizational vs. Individual Strategies',
    'preventing-burnout-organizational-vs-individual-strategies',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Burnout Prevention', 'Workplace Wellness', 'Organizational Change', 'Self-Care'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-049',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn why burnout prevention requires both systemic changes and personal strategies, and what organizations and individuals can each do.',
    '/images/articles/cat02/cover-049.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT02-050: Why Rest Alone Doesn
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Why Rest Alone Doesn',
    'why-rest-alone-doesnt-fix-burnout-the-missing-pieces',
    'draft',
    'Anxiety, Stress & Overwhelm',
    ARRAY['Burnout Recovery', 'Rest', 'Restoration', 'Wellbeing'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT02-050',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover why vacations and time off provide only temporary relief from burnout, and what else is needed for lasting recovery.',
    '/images/articles/cat02/cover-050.svg',
    3,
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

  -- === CAT02-041 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-041';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'textbook', 5, 'The Maslach Burnout Inventory Manual', '1996', 'https://www.mindgarden.com/117-maslach-burnout-inventory-mbi', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Understanding the burnout experience: recent research and its implications', '2016', 'https://doi.org/10.1002/wps.20311', 'World Psychiatry', 2),
      (v_art_id, 'government', 2, 'Burn-out an ', '2019', 'https://www.who.int/news/item/28-05-2019-burn-out-an-occupational-phenomenon-international-classification-of-diseases', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Job burnout', '2001', 'https://doi.org/10.1146/annurev.psych.52.1.397', 'Annual Review of Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'The measurement of experienced burnout', '1981', 'https://doi.org/10.1002/job.4030020205', 'Journal of Organizational Behavior', 5),
      (v_art_id, 'peer_reviewed', 1, 'Burnout and work engagement: The JD-R approach', '2014', 'https://doi.org/10.1146/annurev-orgpsych-031413-091235', 'Annual Review of Organizational Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Burnout in the general population', '2017', 'https://doi.org/10.1007/s00127-017-1373-3', 'Social Psychiatry and Psychiatric Epidemiology', 7),
      (v_art_id, 'peer_reviewed', 1, 'The relationship between burnout, depression, and anxiety', '2019', 'https://doi.org/10.3389/fpsyg.2019.00284', 'Frontiers in Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-042 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-042';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'textbook', 5, 'Burnout: The secret to unlocking the stress cycle', '2019', 'https://www.penguinrandomhouse.com/books/575196/burnout-by-emily-nagoski-phd-and-amelia-nagoski-dma/', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Differentiating burnout from depression', '2016', 'https://doi.org/10.1037/a0039713', 'Journal of Occupational Health Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'The Copenhagen Burnout Inventory', '2005', 'https://doi.org/10.1080/14034940510005897', 'Scandinavian Journal of Public Health', 3),
      (v_art_id, 'professional_org', 3, 'Self-assessment of burnout', '2023', 'https://www.apa.org/topics/healthy-workplaces/burnout-assessment', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Chronic fatigue syndrome vs. burnout', '2018', 'https://doi.org/10.1016/j.jpsychores.2018.03.005', 'Journal of Psychosomatic Research', 5),
      (v_art_id, 'peer_reviewed', 1, 'Recovery from burnout', '2020', 'https://doi.org/10.3389/fpsyg.2020.00132', 'Frontiers in Psychology', 6)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-043 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-043';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'professional_org', 3, 'The 12 phases of burnout', '2018', 'https://isma.org.uk/burnout/', NULL, 1),
      (v_art_id, 'textbook', 5, 'Stages of burnout development', '2020', 'https://www.psychologytoday.com/us/basics/burnout', 'Psychology Today', 2),
      (v_art_id, 'peer_reviewed', 1, 'Burnout assessment and intervention', '2017', 'https://doi.org/10.1037/apl0000191', 'Journal of Applied Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Early detection of burnout', '2019', 'https://doi.org/10.1080/1359432X.2018.1541886', 'European Journal of Work and Organizational Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Preventing burnout: A matter of value congruence', '2015', 'https://doi.org/10.1037/a0039545', 'Journal of Occupational Health Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Recovery from burnout', '2016', 'https://doi.org/10.5271/sjweh.3576', 'Scandinavian Journal of Work, Environment & Health', 6)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-044 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-044';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Burnout among healthcare workers', '2020', 'https://doi.org/10.1001/jama.2020.1380', 'Journal of the American Medical Association', 1),
      (v_art_id, 'peer_reviewed', 1, 'Physician burnout: Contributors, consequences and solutions', '2018', 'https://doi.org/10.1111/joim.12752', 'Journal of Internal Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'Nurse burnout and patient safety', '2016', 'https://doi.org/10.1186/s13037-016-0102-8', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Healthcare worker mental health during COVID-19', '2021', 'https://doi.org/10.1016/S2215-0366(21)00091-9', 'The Lancet Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Interventions to prevent and reduce burnout', '2017', 'https://doi.org/10.1002/14651858.CD005619.pub2', 'Cochrane Database of Systematic Reviews', 5),
      (v_art_id, 'peer_reviewed', 1, 'Moral injury in healthcare workers', '2020', 'https://doi.org/10.1056/NEJMp2011027', 'The New England Journal of Medicine', 6),
      (v_art_id, 'textbook', 5, 'Organizational strategies to reduce physician burnout', '2019', 'https://doi.org/10.1016/j.mayocp.2018.11.001', 'Mayo Clinic Proceedings', 7)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-045 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-045';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Student burnout: A critical problem in higher education', '2019', 'https://doi.org/10.1080/87568225.2018.1522613', 'Journal of College Student Psychotherapy', 1),
      (v_art_id, 'peer_reviewed', 1, 'Burnout among undergraduate students', '2018', 'https://doi.org/10.1080/01443410.2018.1457777', 'Educational Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Graduate student mental health crisis', '2018', 'https://doi.org/10.1038/nbt.4089', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'High school student stress and mental health', '2020', 'https://doi.org/10.1016/j.jadohealth.2019.11.303', 'Journal of Adolescent Health', 4),
      (v_art_id, 'peer_reviewed', 1, 'Perfectionism and academic burnout', '2017', 'https://doi.org/10.1016/j.paid.2016.11.016', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Interventions for student burnout', '2021', 'https://doi.org/10.1037/edu0000544', 'Journal of Educational Psychology', 6),
      (v_art_id, 'professional_org', 3, 'Student mental health services', '2023', 'https://www.acha.org/ACHA/Resources/Topics/Student_Mental_Health.aspx', NULL, 7)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-046 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-046';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Parental burnout: What is it, and why does it matter?', '2019', 'https://doi.org/10.1177/2167702618819134', 'Clinical Psychological Science', 1),
      (v_art_id, 'peer_reviewed', 1, 'The parental burnout assessment', '2018', 'https://doi.org/10.3389/fpsyg.2018.00758', 'Frontiers in Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Cultural variations in parental burnout', '2021', 'https://doi.org/10.1007/s42761-020-00028-4', 'Affective Science', 3),
      (v_art_id, 'peer_reviewed', 1, 'Parental burnout and child outcomes', '2020', 'https://doi.org/10.1007/s10826-020-01724-0', 'Journal of Child and Family Studies', 4),
      (v_art_id, 'peer_reviewed', 1, 'Interventions for parental burnout', '2021', 'https://doi.org/10.1080/15295192.2021.1926228', 'Parenting: Science and Practice', 5),
      (v_art_id, 'peer_reviewed', 1, 'The invisible load: Emotional labor in motherhood', '2019', 'https://doi.org/10.1007/s11199-018-0992-0', NULL, 6),
      (v_art_id, 'professional_org', 3, 'Parent support resources', '2023', 'https://www.apa.org/topics/parenting', NULL, 7)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-047 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-047';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Recovery from burnout: A systematic review', '2017', 'https://doi.org/10.1093/occmed/kqx093', 'Occupational Medicine', 1),
      (v_art_id, 'peer_reviewed', 1, 'The time course of recovery from work-related stress', '2016', 'https://doi.org/10.5271/sjweh.3576', 'Scandinavian Journal of Work, Environment & Health', 2),
      (v_art_id, 'peer_reviewed', 1, 'Effective interventions for reducing burnout', '2019', 'https://doi.org/10.1001/jamainternmed.2019.3820', 'JAMA Internal Medicine', 3),
      (v_art_id, 'peer_reviewed', 1, 'Burnout recovery and return to work', '2018', 'https://doi.org/10.1037/ocp0000097', 'Journal of Occupational Health Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'The role of rest in recovery', '2020', 'https://doi.org/10.3389/fpsyg.2020.00132', 'Frontiers in Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive behavioral therapy for burnout', '2017', 'https://doi.org/10.1159/000460699', NULL, 6)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-048 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-048';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Cynicism as a burnout dimension', '2019', 'https://doi.org/10.1037/ocp0000144', 'Journal of Occupational Health Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Depersonalization in helping professions', '2018', 'https://doi.org/10.1037/apl0000291', 'Journal of Applied Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Meaning-centered interventions for burnout', '2021', 'https://doi.org/10.3389/fpsyg.2021.640916', 'Frontiers in Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Values clarification in burnout recovery', '2020', 'https://doi.org/10.1016/j.cpr.2020.101836', 'Clinical Psychology Review', 4)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-049 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-049';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Organizational interventions for burnout', '2020', 'https://doi.org/10.1146/annurev-orgpsych-012119-044948', 'Annual Review of Organizational Psychology', 1),
      (v_art_id, 'textbook', 5, 'Individual vs. organizational prevention', '2019', 'https://doi.org/10.1016/j.mayocp.2018.11.001', 'Mayo Clinic Proceedings', 2),
      (v_art_id, 'peer_reviewed', 1, 'Systemic approaches to burnout', '2019', 'https://doi.org/10.1016/S0140-6736(19)31278-3', NULL, 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT02-050 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT02-050';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The fade-out effect of vacation', '2016', 'https://doi.org/10.1080/02678373.2016.1167736', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Recovery from work stress', '2018', 'https://doi.org/10.1037/ocp0000116', 'Journal of Occupational Health Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Active vs. passive recovery strategies', '2020', 'https://doi.org/10.3389/fpsyg.2020.01827', 'Frontiers in Psychology', 3)
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
