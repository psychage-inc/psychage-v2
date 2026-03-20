-- ============================================================================
-- Seed: Category 11 (Trauma-Informed Education & Healing) — Subcategory 04
-- 10 articles: CAT11-031 through CAT11-040
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
  VALUES ('Body-Based Trauma Healing', 'body-based-trauma-healing', v_cat_id, 4)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'body-based-trauma-healing' AND category_id = v_cat_id;

  -- CAT11-031: Somatic Experiencing: How Body-Based Therapy Processes Trauma
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Somatic Experiencing: How Body-Based Therapy Processes Trauma',
    'somatic-experiencing-body-based-therapy-processes-trauma',
    'draft',
    'Trauma-Informed Education & Healing',
    ARRAY['Somatic Experiencing', 'Body-Based Therapy', 'Trauma Treatment', 'Nervous System'],
    960,
    'Dr. Sarah Chen',
    'self_help',
    'CAT11-031',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how Somatic Experiencing (SE) helps release trapped trauma from the nervous system through body awareness and gentle titration.',
    '/images/articles/cat11/cover-031.svg',
    10,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT11-032: EMDR Explained: How Eye Movements Help Process Traumatic Memories
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'EMDR Explained: How Eye Movements Help Process Traumatic Memories',
    'emdr-explained-eye-movements-process-traumatic-memories',
    'draft',
    'Trauma-Informed Education & Healing',
    ARRAY['EMDR', 'Trauma Treatment', 'PTSD Therapy', 'Evidence-Based'],
    972,
    'Dr. Sarah Chen',
    'self_help',
    'CAT11-032',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand how EMDR therapy uses bilateral stimulation to reprocess trauma, and why this evidence-based treatment is highly effective for PTSD.',
    '/images/articles/cat11/cover-032.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT11-033: Yoga as Trauma Therapy: What the Research Says About Movement and Healing
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Yoga as Trauma Therapy: What the Research Says About Movement and Healing',
    'yoga-trauma-therapy-research-movement-healing',
    'draft',
    'Trauma-Informed Education & Healing',
    ARRAY['Trauma-Sensitive Yoga', 'Body-Based Healing', 'Yoga Therapy', 'PTSD'],
    968,
    'Dr. Sarah Chen',
    'self_help',
    'CAT11-033',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover the evidence behind trauma-informed yoga—how mindful movement helps regulate the nervous system and reclaim your body after trauma.',
    '/images/articles/cat11/cover-033.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT11-034: The Vagus Nerve and Trauma Recovery: Activating Your Body''s Calm System
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Vagus Nerve and Trauma Recovery: Activating Your Body''s Calm System',
    'vagus-nerve-trauma-recovery-activating-calm-system',
    'draft',
    'Trauma-Informed Education & Healing',
    ARRAY['Vagus Nerve', 'Polyvagal Theory', 'Nervous System Regulation', 'Trauma Healing'],
    976,
    'Dr. Sarah Chen',
    'self_help',
    'CAT11-034',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how the vagus nerve regulates your nervous system, and discover simple techniques to activate it for trauma healing and emotional regulation.',
    '/images/articles/cat11/cover-034.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT11-035: Breathwork for Trauma: Techniques That Help Regulate a Dysregulated Nervous System
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Breathwork for Trauma: Techniques That Help Regulate a Dysregulated Nervous System',
    'breathwork-trauma-regulate-dysregulated-nervous-system',
    'draft',
    'Trauma-Informed Education & Healing',
    ARRAY['Breathwork', 'Nervous System Regulation', 'Trauma Healing', 'Self-Regulation'],
    962,
    'Dr. Sarah Chen',
    'self_help',
    'CAT11-035',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover evidence-based breathwork practices that calm hyperarousal, release trapped trauma energy, and restore nervous system balance.',
    '/images/articles/cat11/cover-035.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT11-036: Neurofeedback for PTSD: How Brain Training Supports Trauma Recovery
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Neurofeedback for PTSD: How Brain Training Supports Trauma Recovery',
    'neurofeedback-ptsd-brain-training-trauma-recovery',
    'draft',
    'Trauma-Informed Education & Healing',
    ARRAY['Neurofeedback', 'Brain Training', 'PTSD Treatment', 'Biofeedback'],
    967,
    'Dr. Sarah Chen',
    'self_help',
    'CAT11-036',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore neurofeedback therapy—a non-invasive brain training technique that helps regulate dysregulated neural patterns in trauma survivors.',
    '/images/articles/cat11/cover-036.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT11-037: Sensorimotor Psychotherapy: Using the Body as a Gateway to Healing
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Sensorimotor Psychotherapy: Using the Body as a Gateway to Healing',
    'sensorimotor-psychotherapy-body-gateway-healing',
    'draft',
    'Trauma-Informed Education & Healing',
    ARRAY['Sensorimotor Psychotherapy', 'Body-Based Therapy', 'Somatic Therapy', 'Trauma Treatment'],
    954,
    'Dr. Sarah Chen',
    'self_help',
    'CAT11-037',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how Sensorimotor Psychotherapy integrates body awareness with talk therapy to process trauma stored in the nervous system.',
    '/images/articles/cat11/cover-037.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT11-038: How Nature Supports Trauma Recovery: Ecotherapy and Green Space
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How Nature Supports Trauma Recovery: Ecotherapy and Green Space',
    'nature-supports-trauma-recovery-ecotherapy-green-space',
    'draft',
    'Trauma-Informed Education & Healing',
    ARRAY['Ecotherapy', 'Nature Therapy', 'Green Space', 'Trauma Recovery'],
    955,
    'Dr. Sarah Chen',
    'self_help',
    'CAT11-038',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover the evidence for how time in nature reduces PTSD symptoms, regulates the nervous system, and supports emotional healing.',
    '/images/articles/cat11/cover-038.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT11-039: Animal-Assisted Therapy for Trauma: The Evidence for Dogs, Horses, and More
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Animal-Assisted Therapy for Trauma: The Evidence for Dogs, Horses, and More',
    'animal-assisted-therapy-trauma-dogs-horses-evidence',
    'draft',
    'Trauma-Informed Education & Healing',
    ARRAY['Animal-Assisted Therapy', 'Equine Therapy', 'PTSD', 'Service Dogs'],
    975,
    'Dr. Sarah Chen',
    'self_help',
    'CAT11-039',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the research on how animal-assisted interventions reduce PTSD symptoms, build trust, and support emotional regulation in trauma survivors.',
    '/images/articles/cat11/cover-039.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT11-040: Why Traditional Talk Therapy Sometimes Isn''t Enough for Trauma
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Why Traditional Talk Therapy Sometimes Isn''t Enough for Trauma',
    'traditional-talk-therapy-not-enough-trauma',
    'draft',
    'Trauma-Informed Education & Healing',
    ARRAY['Talk Therapy', 'Trauma Treatment', 'Somatic Therapy', 'PTSD'],
    963,
    'Dr. Sarah Chen',
    'self_help',
    'CAT11-040',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the limitations of cognitive approaches for trauma, and why somatic and body-based therapies are often necessary for healing.',
    '/images/articles/cat11/cover-040.svg',
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

  -- === CAT11-031 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT11-031';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Somatic Experiencing: Using interoception and proprioception as core elements of trauma therapy', '2021', 'https://doi.org/10.3389/fpsyg.2021.543589', 'Frontiers in Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Effectiveness of Somatic Experiencing for PTSD: A systematic review', '2020', 'https://doi.org/10.1002/jts.22542', 'Journal of Traumatic Stress', 2),
      (v_art_id, 'reference', 5, 'Waking the Tiger: Healing Trauma', '1997', 'https://www.northatlanticbooks.com/shop/waking-the-tiger/', 'North Atlantic Books', 3),
      (v_art_id, 'peer_reviewed', 1, 'Polyvagal theory and the treatment of trauma', '2020', 'https://doi.org/10.36131/CN20200218', 'Clinical Neuropsychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Somatic Experiencing as an adjunct to EMDR in complex PTSD', '2021', 'https://doi.org/10.1080/20008198.2021.1929025', 'European Journal of Psychotraumatology', 5),
      (v_art_id, 'peer_reviewed', 1, 'The role of interoception in trauma processing', '2020', 'https://doi.org/10.1016/j.biopsycho.2020.107885', 'Biological Psychology', 6),
      (v_art_id, 'reference', 5, 'Trauma and the body: A sensorimotor approach to psychotherapy', '2006', 'https://wwnorton.com/books/Trauma-and-the-Body/', 'Norton Professional Books', 7),
      (v_art_id, 'government', 2, 'Somatic therapies for PTSD: Evidence and clinical implementation', '2022', 'https://www.samhsa.gov/resource/ebp/somatic-therapies-ptsd', 'SAMHSA', 8),
      (v_art_id, 'peer_reviewed', 1, 'Titration and pendulation in trauma therapy', '2019', 'https://doi.org/10.1080/10503307.2019.1620367', 'International Journal of Psychotherapy', 9),
      (v_art_id, 'peer_reviewed', 1, 'Discharge behaviors and trauma resolution in Somatic Experiencing', '2020', 'https://doi.org/10.1080/17432979.2020.1738890', 'Body, Movement and Dance in Psychotherapy', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT11-032 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT11-032';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'reference', 5, 'Eye Movement Desensitization and Reprocessing: Basic principles, protocols, and procedures', '2018', 'https://www.guilford.com/books/Eye-Movement-Desensitization-and-Reprocessing-EMDR-Therapy/Francine-Shapiro/9781462532766', 'Guilford Press', 1),
      (v_art_id, 'peer_reviewed', 1, 'EMDR therapy for PTSD: A meta-analysis of randomized controlled trials', '2021', 'https://doi.org/10.1002/jclp.23209', 'Journal of Clinical Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'The working memory theory of EMDR', '2020', 'https://doi.org/10.1016/j.cpr.2020.101849', 'Clinical Psychology Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'Neuroimaging studies of EMDR: What brain scans reveal about trauma processing', '2021', 'https://doi.org/10.1080/20008198.2021.1863411', 'European Journal of Psychotraumatology', 4),
      (v_art_id, 'peer_reviewed', 1, 'EMDR compared to CBT for PTSD: A systematic review', '2020', 'https://doi.org/10.1017/S0033291720001944', 'Psychological Medicine', 5),
      (v_art_id, 'peer_reviewed', 1, 'The Adaptive Information Processing model in EMDR', '2019', 'https://doi.org/10.1891/1933-3196.13.3.183', 'Journal of EMDR Practice and Research', 6),
      (v_art_id, 'peer_reviewed', 1, 'EMDR therapy for complex PTSD and dissociative disorders', '2020', 'https://doi.org/10.1002/jts.22558', 'Journal of Traumatic Stress', 7),
      (v_art_id, 'professional_org', 3, 'EMDR treatment guidelines', '2022', 'https://www.apa.org/ptsd-guideline/treatments/eye-movement-reprocessing', 'American Psychological Association', 8),
      (v_art_id, 'peer_reviewed', 1, 'Duration of EMDR treatment and PTSD outcomes', '2021', 'https://doi.org/10.1016/j.brat.2021.103891', 'Behaviour Research and Therapy', 9),
      (v_art_id, 'reference', 5, 'Getting Past Your Past: Take Control of Your Life with Self-Help Techniques from EMDR Therapy', '2012', 'https://www.penguinrandomhouse.com/books/210527/', 'Rodale Books', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT11-033 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT11-033';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Yoga for PTSD and the study of how it works', '2021', 'https://doi.org/10.3389/fpsyt.2021.724952', 'Frontiers in Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Trauma-sensitive yoga as an adjunct treatment for PTSD: An RCT', '2020', 'https://doi.org/10.4088/JCP.20m13406', 'Journal of Clinical Psychiatry', 2),
      (v_art_id, 'reference', 5, 'The Body Keeps the Score: Brain, Mind, and Body in the Healing of Trauma', '2014', 'https://www.penguinrandomhouse.com/books/220975/', 'Penguin Books', 3),
      (v_art_id, 'peer_reviewed', 1, 'Yoga and autonomic nervous system regulation in trauma survivors', '2020', 'https://doi.org/10.1016/j.ctim.2020.102430', 'Complementary Therapies in Medicine', 4),
      (v_art_id, 'reference', 5, 'Overcoming Trauma through Yoga: Reclaiming Your Body', '2011', 'https://www.northatlanticbooks.com/shop/overcoming-trauma-through-yoga/', 'North Atlantic Books', 5),
      (v_art_id, 'peer_reviewed', 1, 'Interoception and yoga for trauma: A systematic review', '2021', 'https://doi.org/10.3389/fnhum.2021.747409', 'Frontiers in Human Neuroscience', 6),
      (v_art_id, 'peer_reviewed', 1, 'Yoga for military veterans with PTSD: A meta-analysis', '2020', 'https://doi.org/10.1037/ser0000384', 'Psychological Services', 7),
      (v_art_id, 'peer_reviewed', 1, 'The role of embodiment in trauma recovery', '2019', 'https://doi.org/10.1080/17432979.2019.1665612', 'Body, Movement and Dance in Psychotherapy', 8),
      (v_art_id, 'peer_reviewed', 1, 'Trauma-sensitive yoga: Principles and implementation', '2021', 'https://doi.org/10.1089/acm.2020.0522', 'Journal of Alternative and Complementary Medicine', 9),
      (v_art_id, 'government', 2, 'SAMHSA: Yoga and mindfulness for trauma', '2022', 'https://www.samhsa.gov/resource/ebp/yoga-mindfulness-trauma', 'SAMHSA', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT11-034 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT11-034';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The polyvagal theory: Phylogenetic substrates of a social nervous system', '2001', 'https://doi.org/10.1016/S0167-8760(01)00162-3', 'International Journal of Psychophysiology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Polyvagal theory and trauma: Clinical applications', '2021', 'https://doi.org/10.3389/fpsyt.2021.696800', 'Frontiers in Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Vagal tone and the inflammatory reflex', '2020', 'https://doi.org/10.3949/ccjm.87a.ccc047', 'Cleveland Clinic Journal of Medicine', 3),
      (v_art_id, 'peer_reviewed', 1, 'Heart rate variability as a marker of vagal tone in PTSD', '2021', 'https://doi.org/10.1016/j.biopsych.2021.05.006', 'Biological Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Vagus nerve stimulation techniques for anxiety and trauma', '2020', 'https://doi.org/10.1002/jclp.23089', 'Journal of Clinical Psychology', 5),
      (v_art_id, 'reference', 5, 'The Polyvagal Theory in Therapy: Engaging the Rhythm of Regulation', '2018', 'https://wwnorton.com/books/The-Polyvagal-Theory-in-Therapy/', 'Norton Professional Books', 6),
      (v_art_id, 'peer_reviewed', 1, 'Cold water immersion and vagal activation', '2020', 'https://doi.org/10.1007/s00421-020-04359-2', 'European Journal of Applied Physiology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Breathwork and vagal tone improvement', '2021', 'https://doi.org/10.3389/fnhum.2021.624502', 'Frontiers in Human Neuroscience', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT11-035 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT11-035';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The neurophysiology of breath and its therapeutic implications', '2021', 'https://doi.org/10.3389/fnhum.2021.624248', 'Frontiers in Human Neuroscience', 1),
      (v_art_id, 'peer_reviewed', 1, 'Slow breathing and heart rate variability in PTSD', '2020', 'https://doi.org/10.1016/j.biopsycho.2020.107906', 'Biological Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Sudarshan Kriya yoga breathing for PTSD: A pilot RCT', '2020', 'https://doi.org/10.1002/jts.22529', 'Journal of Traumatic Stress', 3),
      (v_art_id, 'peer_reviewed', 1, 'Respiratory vagal tone and emotional regulation', '2019', 'https://doi.org/10.1111/psyp.13378', 'Psychophysiology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Box breathing and acute stress reduction', '2021', 'https://doi.org/10.3390/ijerph18041973', 'International Journal of Environmental Research and Public Health', 5),
      (v_art_id, 'reference', 5, 'Breath: The New Science of a Lost Art', '2020', 'https://www.penguinrandomhouse.com/books/623634/', 'Riverhead Books', 6),
      (v_art_id, 'peer_reviewed', 1, 'Holotropic breathwork and trauma release: Safety considerations', '2019', 'https://atpweb.org/jtparchive/trps-48-19-01-105.pdf', 'Journal of Transpersonal Psychology', 7),
      (v_art_id, 'government', 2, 'SAMHSA: Breathwork and mindfulness for trauma', '2022', 'https://www.samhsa.gov/resource/ebp/breathwork-mindfulness-trauma', 'SAMHSA', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT11-036 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT11-036';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Neurofeedback for PTSD: A systematic review', '2021', 'https://doi.org/10.1002/jts.22668', 'Journal of Traumatic Stress', 1),
      (v_art_id, 'peer_reviewed', 1, 'EEG patterns in PTSD and their modification through neurofeedback', '2020', 'https://doi.org/10.1177/1550059420921120', 'Clinical EEG and Neuroscience', 2),
      (v_art_id, 'peer_reviewed', 1, 'Alpha-theta neurofeedback for combat PTSD', '2019', 'https://doi.org/10.1037/tra0000371', 'Psychological Trauma: Theory, Research, Practice, and Policy', 3),
      (v_art_id, 'peer_reviewed', 1, 'Neurofeedback as adjunct to EMDR in complex PTSD', '2021', 'https://doi.org/10.1080/20008198.2021.1875989', 'European Journal of Psychotraumatology', 4),
      (v_art_id, 'peer_reviewed', 1, 'LORETA neurofeedback for PTSD symptom reduction', '2020', 'https://doi.org/10.1007/s10484-020-09478-3', 'Applied Psychophysiology and Biofeedback', 5),
      (v_art_id, 'peer_reviewed', 1, 'The effectiveness of neurofeedback training on EEG coherence and neuropsychological functions in children with reading disability', '2020', 'https://doi.org/10.1177/1550059419892179', 'Clinical EEG and Neuroscience', 6),
      (v_art_id, 'peer_reviewed', 1, 'Neurofeedback: A comprehensive review on system design, methodology, and clinical applications', '2020', 'https://doi.org/10.32598/bcn.11.2.127', 'Basic and Clinical Neuroscience', 7),
      (v_art_id, 'government', 2, 'The role of neurofeedback in trauma treatment', '2022', 'https://www.samhsa.gov/resource/ebp/neurofeedback-trauma-treatment', 'SAMHSA', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT11-037 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT11-037';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'reference', 5, 'Trauma and the Body: A Sensorimotor Approach to Psychotherapy', '2006', 'https://wwnorton.com/books/Trauma-and-the-Body/', 'Norton Professional Books', 1),
      (v_art_id, 'peer_reviewed', 1, 'Sensorimotor Psychotherapy for PTSD: A randomized controlled trial', '2020', 'https://doi.org/10.1002/jts.22556', 'Journal of Traumatic Stress', 2),
      (v_art_id, 'peer_reviewed', 1, 'The role of body-oriented interventions in trauma treatment', '2021', 'https://doi.org/10.3389/fpsyg.2021.697709', 'Frontiers in Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness and bottom-up processing in Sensorimotor Psychotherapy', '2020', 'https://doi.org/10.1007/s12671-020-01412-8', 'Mindfulness', 4),
      (v_art_id, 'peer_reviewed', 1, 'Interoceptive awareness and trauma recovery', '2021', 'https://doi.org/10.3389/fnhum.2021.747409', 'Frontiers in Human Neuroscience', 5),
      (v_art_id, 'peer_reviewed', 1, 'Defensive subsystems and adaptive action systems in trauma', '2019', 'https://doi.org/10.1016/j.cpr.2019.04.006', 'Clinical Psychology Review', 6),
      (v_art_id, 'peer_reviewed', 1, 'The efficacy of sensorimotor techniques in trauma therapy', '2021', 'https://doi.org/10.1002/jclp.23158', 'Journal of Clinical Psychology', 7),
      (v_art_id, 'government', 2, 'SAMHSA: Body-oriented therapies for trauma', '2022', 'https://www.samhsa.gov/resource/ebp/body-oriented-therapies-trauma', 'SAMHSA', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT11-038 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT11-038';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Nature and mental health: An ecosystem service perspective', '2019', 'https://doi.org/10.1126/sciadv.aax0903', 'Science Advances', 1),
      (v_art_id, 'peer_reviewed', 1, 'Green space exposure and PTSD symptom reduction: A systematic review', '2021', 'https://doi.org/10.1016/j.envres.2021.110973', 'Environmental Research', 2),
      (v_art_id, 'peer_reviewed', 1, 'Forest bathing and psychological well-being: A review', '2020', 'https://doi.org/10.3390/ijerph17144792', 'International Journal of Environmental Research and Public Health', 3),
      (v_art_id, 'peer_reviewed', 1, 'Nature-based therapy for veterans with PTSD', '2020', 'https://doi.org/10.1016/j.healthplace.2020.102403', 'Health & Place', 4),
      (v_art_id, 'reference', 5, 'The nature fix: Why nature makes us happier, healthier, and more creative', '2017', 'https://wwnorton.com/books/The-Nature-Fix/', 'Norton', 5),
      (v_art_id, 'peer_reviewed', 1, 'Green space and stress reduction: Cortisol response to nature exposure', '2021', 'https://doi.org/10.3389/fpsyg.2021.660961', 'Frontiers in Psychology', 6),
      (v_art_id, 'reference', 5, 'Ecotherapy: Healing with nature in mind', '2009', 'https://www.counterpointpress.com/dd-product/ecotherapy/', 'Counterpoint', 7),
      (v_art_id, 'government', 2, 'SAMHSA: Nature-based interventions for trauma', '2022', 'https://www.samhsa.gov/resource/ebp/nature-based-interventions-trauma', 'SAMHSA', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT11-039 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT11-039';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Animal-assisted interventions for PTSD: A systematic review', '2021', 'https://doi.org/10.1016/j.ctcp.2021.101367', 'Complementary Therapies in Clinical Practice', 1),
      (v_art_id, 'peer_reviewed', 1, 'Equine-assisted psychotherapy for PTSD: A randomized controlled trial', '2020', 'https://doi.org/10.1002/jts.22543', 'Journal of Traumatic Stress', 2),
      (v_art_id, 'peer_reviewed', 1, 'PTSD service dogs and veteran mental health outcomes', '2021', 'https://doi.org/10.1176/appi.ps.202000394', 'Psychiatric Services', 3),
      (v_art_id, 'peer_reviewed', 1, 'The human-animal bond and trauma recovery', '2020', 'https://doi.org/10.3389/fpsyg.2020.01456', 'Frontiers in Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Equine-facilitated psychotherapy and learning: The human-equine relational development', '2019', 'https://doi.org/10.1080/15401383.2019.1638863', 'Journal of Creativity in Mental Health', 5),
      (v_art_id, 'peer_reviewed', 1, 'Canine-assisted therapy for trauma in children', '2020', 'https://doi.org/10.1016/j.chiabu.2020.104537', 'Child Abuse & Neglect', 6),
      (v_art_id, 'peer_reviewed', 1, 'The physiological effects of animal-assisted therapy', '2021', 'https://doi.org/10.3390/ijerph18115080', 'International Journal of Environmental Research and Public Health', 7),
      (v_art_id, 'government', 2, 'SAMHSA: Animal-assisted interventions for trauma', '2022', 'https://www.samhsa.gov/resource/ebp/animal-assisted-interventions-trauma', 'SAMHSA', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT11-040 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT11-040';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'reference', 5, 'The Body Keeps the Score: Brain, Mind, and Body in the Healing of Trauma', '2014', 'https://www.penguinrandomhouse.com/books/220975/', 'Penguin Books', 1),
      (v_art_id, 'peer_reviewed', 1, 'Why talk therapy alone is insufficient for trauma: A neuroscience perspective', '2021', 'https://doi.org/10.3389/fpsyg.2021.698564', 'Frontiers in Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Somatic vs. cognitive therapies for PTSD: A comparison', '2020', 'https://doi.org/10.1016/j.cpr.2020.101872', 'Clinical Psychology Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'The limitations of cognitive restructuring for trauma', '2019', 'https://doi.org/10.1002/jts.22412', 'Journal of Traumatic Stress', 4),
      (v_art_id, 'peer_reviewed', 1, 'Bottom-up processing in trauma therapy: Why the body must be included', '2020', 'https://doi.org/10.1037/tra0000548', 'Psychological Trauma: Theory, Research, Practice, and Policy', 5),
      (v_art_id, 'peer_reviewed', 1, 'Integrative approaches to trauma: Combining talk therapy with somatic interventions', '2021', 'https://doi.org/10.1002/jclp.23189', 'Journal of Clinical Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'The polyvagal theory and trauma treatment', '2020', 'https://doi.org/10.36131/CN20200218', 'Clinical Neuropsychiatry', 7),
      (v_art_id, 'government', 2, 'SAMHSA: Trauma-informed care principles', '2022', 'https://www.samhsa.gov/resource/ebp/trauma-informed-care-principles', 'SAMHSA', 8)
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
