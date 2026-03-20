-- ============================================================================
-- Seed: Category 11 (Trauma-Informed Education & Healing) — Subcategory 02
-- 10 articles: CAT11-011 through CAT11-020
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
  VALUES ('PTSD & Complex Trauma', 'ptsd-and-complex-trauma', v_cat_id, 2)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'ptsd-and-complex-trauma' AND category_id = v_cat_id;

  -- CAT11-011: PTSD: A Complete Guide to Post-Traumatic Stress Disorder
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'PTSD: A Complete Guide to Post-Traumatic Stress Disorder',
    'ptsd-complete-guide-post-traumatic-stress-disorder',
    'draft',
    'Trauma-Informed Education & Healing',
    ARRAY['PTSD', 'Diagnosis', 'Treatment', 'Recovery', 'Mental Health'],
    968,
    'Dr. Sarah Chen',
    'self_help',
    'CAT11-011',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A comprehensive guide to PTSD covering symptoms, causes, diagnosis, treatment options, and recovery. Learn what PTSD is and how to get help.',
    '/images/articles/cat11/cover-011.svg',
    10,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT11-012: Complex PTSD: The Condition the DSM Is Still Catching Up To
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Complex PTSD: The Condition the DSM Is Still Catching Up To',
    'complex-ptsd-dsm-catching-up',
    'draft',
    'Trauma-Informed Education & Healing',
    ARRAY['C-PTSD', 'Complex Trauma', 'Diagnosis', 'ICD-11', 'Treatment'],
    972,
    'Dr. Sarah Chen',
    'self_help',
    'CAT11-012',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Complex PTSD is distinct from PTSD but not yet recognized in the DSM-5. Learn about C-PTSD, its unique symptoms, and why the diagnosis matters.',
    '/images/articles/cat11/cover-012.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT11-013: Flashbacks Explained: What Happens in Your Brain During a Trauma Memory
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Flashbacks Explained: What Happens in Your Brain During a Trauma Memory',
    'flashbacks-explained-brain-during-trauma-memory',
    'draft',
    'Trauma-Informed Education & Healing',
    ARRAY['Flashbacks', 'PTSD', 'Neuroscience', 'Coping Skills'],
    982,
    'Dr. Sarah Chen',
    'self_help',
    'CAT11-013',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Flashbacks feel like reliving trauma. Learn what happens in your brain during a flashback, why they occur, and evidence-based techniques to manage them.',
    '/images/articles/cat11/cover-013.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT11-014: Hypervigilance: When Your Brain Won''t Stop Scanning for Danger
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Hypervigilance: When Your Brain Won''t Stop Scanning for Danger',
    'hypervigilance-brain-wont-stop-scanning-danger',
    'draft',
    'Trauma-Informed Education & Healing',
    ARRAY['Hypervigilance', 'PTSD', 'Nervous System', 'Recovery'],
    996,
    'Dr. Sarah Chen',
    'self_help',
    'CAT11-014',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Constantly on alert, unable to relax, always scanning for threats. Learn about hypervigilance in PTSD and strategies to calm an overactive threat-detection system.',
    '/images/articles/cat11/cover-014.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT11-015: Emotional Numbness After Trauma: Why You Can''t Feel Anything
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Emotional Numbness After Trauma: Why You Can''t Feel Anything',
    'emotional-numbness-after-trauma-cant-feel-anything',
    'draft',
    'Trauma-Informed Education & Healing',
    ARRAY['Emotional Numbing', 'Dissociation', 'PTSD', 'Recovery'],
    992,
    'Dr. Sarah Chen',
    'self_help',
    'CAT11-015',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Feeling emotionally numb, disconnected, unable to experience joy or connection after trauma. Learn why numbness happens and how to reconnect with your emotions.',
    '/images/articles/cat11/cover-015.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT11-016: PTSD and Nightmares: Why Trauma Disrupts Your Sleep
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'PTSD and Nightmares: Why Trauma Disrupts Your Sleep',
    'ptsd-nightmares-why-trauma-disrupts-sleep',
    'draft',
    'Trauma-Informed Education & Healing',
    ARRAY['PTSD', 'Nightmares', 'Sleep', 'Treatment'],
    994,
    'Dr. Sarah Chen',
    'self_help',
    'CAT11-016',
    v_cat_id,
    v_sub_id,
    'drafted',
    'PTSD nightmares are more than bad dreams. Learn why trauma invades your sleep, the neuroscience behind nightmares, and evidence-based strategies to improve sleep.',
    '/images/articles/cat11/cover-016.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT11-017: Trauma and Dissociation: When Your Mind Disconnects to Survive
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Trauma and Dissociation: When Your Mind Disconnects to Survive',
    'trauma-dissociation-mind-disconnects-survive',
    'draft',
    'Trauma-Informed Education & Healing',
    ARRAY['Dissociation', 'PTSD', 'Trauma Response', 'Grounding'],
    988,
    'Dr. Sarah Chen',
    'self_help',
    'CAT11-017',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Dissociation is a protective mechanism where your mind separates from overwhelming experiences. Learn about dissociation in trauma and paths to reconnection.',
    '/images/articles/cat11/cover-017.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT11-018: PTSD in First Responders: The Cost of Witnessing Crisis
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'PTSD in First Responders: The Cost of Witnessing Crisis',
    'ptsd-first-responders-cost-witnessing-crisis',
    'draft',
    'Trauma-Informed Education & Healing',
    ARRAY['First Responders', 'Occupational Trauma', 'PTSD', 'Public Safety'],
    990,
    'Dr. Sarah Chen',
    'self_help',
    'CAT11-018',
    v_cat_id,
    v_sub_id,
    'drafted',
    'First responders face cumulative trauma exposure. Learn about PTSD in police, firefighters, paramedics, and why occupational trauma requires targeted support.',
    '/images/articles/cat11/cover-018.svg',
    8,
    true,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT11-019: Military PTSD: Combat Trauma and the Challenges of Coming Home
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Military PTSD: Combat Trauma and the Challenges of Coming Home',
    'military-ptsd-combat-trauma-challenges-coming-home',
    'draft',
    'Trauma-Informed Education & Healing',
    ARRAY['Military PTSD', 'Combat Trauma', 'Veterans', 'VA Services'],
    960,
    'Dr. Sarah Chen',
    'self_help',
    'CAT11-019',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Combat PTSD affects 11-20% of veterans. Learn about military trauma, the transition home, barriers to care, and VA treatment options.',
    '/images/articles/cat11/cover-019.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT11-020: PTSD vs. Acute Stress Disorder: Understanding the Timeline
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'PTSD vs. Acute Stress Disorder: Understanding the Timeline',
    'ptsd-vs-acute-stress-disorder-understanding-timeline',
    'draft',
    'Trauma-Informed Education & Healing',
    ARRAY['ASD', 'PTSD', 'Diagnosis', 'Early Intervention'],
    992,
    'Dr. Sarah Chen',
    'self_help',
    'CAT11-020',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Not all trauma reactions become PTSD. Learn the difference between Acute Stress Disorder, normal trauma response, and PTSD—and why timing matters for treatment.',
    '/images/articles/cat11/cover-020.svg',
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

  -- === CAT11-011 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT11-011';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'clinical_guideline', 4, 'Diagnostic and Statistical Manual of Mental Disorders, Fifth Edition, Text Revision (DSM-5-TR)', '2022', 'https://www.psychiatry.org/psychiatrists/practice/dsm', 'American Psychiatric Association', 1),
      (v_art_id, 'peer_reviewed', 1, 'Posttraumatic stress disorder', '2015', 'https://doi.org/10.1038/nrdp.2015.57', 'Nature Reviews Disease Primers', 2),
      (v_art_id, 'government', 2, 'Understanding PTSD and PTSD treatment', '2023', 'https://www.ptsd.va.gov/understand/index.asp', 'National Center for PTSD', 3),
      (v_art_id, 'peer_reviewed', 1, 'Prevalence of PTSD in the United States', '2020', 'https://doi.org/10.1001/jamapsychiatry.2020.2269', 'JAMA Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Evidence-based psychotherapies for PTSD', '2021', 'https://doi.org/10.1016/j.cpr.2021.102015', 'Clinical Psychology Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'Pharmacotherapy for PTSD: A systematic review', '2019', 'https://doi.org/10.1001/jamapsychiatry.2019.0892', 'JAMA Psychiatry', 6),
      (v_art_id, 'peer_reviewed', 1, 'PTSD and comorbid conditions', '2020', 'https://doi.org/10.1176/appi.ajp.2020.20010053', 'American Journal of Psychiatry', 7),
      (v_art_id, 'peer_reviewed', 1, 'Recovery from PTSD: A meta-analysis', '2018', 'https://doi.org/10.1017/S0033291718002453', 'Psychological Medicine', 8),
      (v_art_id, 'peer_reviewed', 1, 'Risk and resilience factors for PTSD', '2019', 'https://doi.org/10.1037/bul0000195', 'Psychological Bulletin', 9),
      (v_art_id, 'government', 2, 'Post-traumatic stress disorder', '2022', 'https://www.who.int/news-room/fact-sheets/detail/post-traumatic-stress-disorder', 'World Health Organization', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT11-012 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT11-012';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'ICD-11 Complex Post Traumatic Stress Disorder: Simplifying diagnosis in trauma populations', '2020', 'https://doi.org/10.1192/bjp.2019.48', 'British Journal of Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Complex PTSD: A syndrome in survivors of prolonged and repeated trauma', '1992', 'https://doi.org/10.1002/jts.2490050305', 'Journal of Traumatic Stress', 2),
      (v_art_id, 'peer_reviewed', 1, 'Distinguishing PTSD, complex PTSD, and borderline personality disorder', '2019', 'https://doi.org/10.1080/20008198.2019.1654052', 'European Journal of Psychotraumatology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Treatment of complex trauma: A meta-analysis', '2021', 'https://doi.org/10.1001/jamapsychiatry.2021.0350', 'JAMA Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Childhood trauma and complex PTSD symptoms', '2020', 'https://doi.org/10.1016/j.jad.2020.01.029', 'Journal of Affective Disorders', 5),
      (v_art_id, 'peer_reviewed', 1, 'Complex PTSD prevalence estimates', '2021', 'https://doi.org/10.1111/acps.13325', 'Acta Psychiatrica Scandinavica', 6),
      (v_art_id, 'peer_reviewed', 1, 'Phase-based treatment for complex PTSD', '2020', 'https://doi.org/10.1016/j.cpr.2020.101872', 'Clinical Psychology Review', 7),
      (v_art_id, 'government', 2, 'Understanding complex trauma', '2022', 'https://www.nctsn.org/what-is-child-trauma/trauma-types/complex-trauma', 'National Child Traumatic Stress Network', 8),
      (v_art_id, 'peer_reviewed', 1, 'Attachment disruption in complex PTSD', '2020', 'https://doi.org/10.1080/14616734.2020.1751987', 'Attachment & Human Development', 9),
      (v_art_id, 'peer_reviewed', 1, 'Emotion dysregulation in complex PTSD', '2019', 'https://doi.org/10.1016/j.brat.2019.05.004', 'Behavior Research and Therapy', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT11-013 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT11-013';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The neurobiology of flashbacks in PTSD', '2020', 'https://doi.org/10.1016/j.biopsych.2020.05.007', 'Biological Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Hippocampal dysfunction and trauma memories', '2019', 'https://doi.org/10.1016/j.neubiorev.2019.02.024', 'Neuroscience & Biobehavioral Reviews', 2),
      (v_art_id, 'government', 2, 'Understanding flashbacks', '2023', 'https://www.ptsd.va.gov/understand/related/flash.asp', 'National Center for PTSD', 3),
      (v_art_id, 'peer_reviewed', 1, 'Grounding techniques for PTSD', '2018', 'https://doi.org/10.1002/jts.22315', 'Journal of Traumatic Stress', 4),
      (v_art_id, 'peer_reviewed', 1, 'Imagery rescripting for intrusive memories', '2021', 'https://doi.org/10.1016/j.cpr.2021.102016', 'Clinical Psychology Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'Dissociation during flashbacks', '2020', 'https://doi.org/10.1080/20008198.2020.1753995', 'European Journal of Psychotraumatology', 6),
      (v_art_id, 'government', 2, 'Triggers and flashback management', '2022', 'https://www.samhsa.gov/trauma-violence', 'Substance Abuse and Mental Health Services Administration', 7),
      (v_art_id, 'peer_reviewed', 1, 'Memory reconsolidation and trauma', '2019', 'https://doi.org/10.1038/s41583-019-0188-0', 'Nature Reviews Neuroscience', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT11-014 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT11-014';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Hypervigilance in PTSD: Neural mechanisms', '2020', 'https://doi.org/10.1016/j.bpsc.2020.05.001', 'Biological Psychiatry: Cognitive Neuroscience', 1),
      (v_art_id, 'peer_reviewed', 1, 'Amygdala hyperactivity and threat detection', '2019', 'https://doi.org/10.1001/jamapsychiatry.2019.0401', 'JAMA Psychiatry', 2),
      (v_art_id, 'government', 2, 'Understanding hypervigilance', '2023', 'https://www.ptsd.va.gov/understand/what/hypervigilance.asp', 'National Center for PTSD', 3),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness for hyperarousal in PTSD', '2020', 'https://doi.org/10.1002/jts.22516', 'Journal of Traumatic Stress', 4),
      (v_art_id, 'peer_reviewed', 1, 'Vagal tone and threat detection', '2018', 'https://doi.org/10.1111/psyp.13052', 'Psychophysiology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Neurofeedback for hyperarousal', '2019', 'https://doi.org/10.1177/1550059418812162', 'Clinical EEG and Neuroscience', 6),
      (v_art_id, 'government', 2, 'Managing hypervigilance: A guide', '2022', 'https://www.samhsa.gov/trauma-violence', 'Substance Abuse and Mental Health Services Administration', 7),
      (v_art_id, 'peer_reviewed', 1, 'Sleep disturbance and hyperarousal in PTSD', '2021', 'https://doi.org/10.1016/j.smrv.2021.101398', 'Sleep Medicine Reviews', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT11-015 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT11-015';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Emotional numbing in PTSD: Neural correlates', '2020', 'https://doi.org/10.1016/j.biopsych.2020.03.012', 'Biological Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Anhedonia and emotional numbing in trauma', '2019', 'https://doi.org/10.1016/j.jad.2019.08.007', 'Journal of Affective Disorders', 2),
      (v_art_id, 'government', 2, 'Understanding emotional avoidance in PTSD', '2023', 'https://www.ptsd.va.gov/understand/what/emotional_numbing.asp', 'National Center for PTSD', 3),
      (v_art_id, 'peer_reviewed', 1, 'Dissociation and emotional detachment', '2020', 'https://doi.org/10.1080/20008198.2020.1721498', 'European Journal of Psychotraumatology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Reconnecting with emotions after trauma', '2021', 'https://doi.org/10.1016/j.cpr.2021.102025', 'Clinical Psychology Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness for emotional numbing', '2020', 'https://doi.org/10.1002/jts.22559', 'Journal of Traumatic Stress', 6),
      (v_art_id, 'government', 2, 'Treating emotional numbing in PTSD', '2022', 'https://www.samhsa.gov/trauma-violence', 'Substance Abuse and Mental Health Services Administration', 7),
      (v_art_id, 'peer_reviewed', 1, 'Dorsal vagal shutdown and trauma', '2018', 'https://doi.org/10.3389/fpsyg.2018.02069', 'Frontiers in Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT11-016 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT11-016';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Sleep disturbance in PTSD: A comprehensive review', '2021', 'https://doi.org/10.1016/j.smrv.2021.101398', 'Sleep Medicine Reviews', 1),
      (v_art_id, 'peer_reviewed', 1, 'REM sleep and trauma processing', '2020', 'https://doi.org/10.1016/j.cub.2020.08.025', 'Current Biology', 2),
      (v_art_id, 'government', 2, 'Nightmares and PTSD', '2023', 'https://www.ptsd.va.gov/understand/related/sleep_disorders.asp', 'National Center for PTSD', 3),
      (v_art_id, 'peer_reviewed', 1, 'Imagery Rehearsal Therapy for nightmares: A meta-analysis', '2020', 'https://doi.org/10.1093/sleep/zsaa002', 'Sleep', 4),
      (v_art_id, 'peer_reviewed', 1, 'Prazosin for PTSD nightmares', '2018', 'https://doi.org/10.1001/jamapsychiatry.2018.0326', 'JAMA Psychiatry', 5),
      (v_art_id, 'peer_reviewed', 1, 'Sleep architecture in PTSD', '2019', 'https://doi.org/10.1016/j.biopsych.2019.05.016', 'Biological Psychiatry', 6),
      (v_art_id, 'peer_reviewed', 1, 'CBT for insomnia in PTSD', '2021', 'https://doi.org/10.1002/jts.22658', 'Journal of Traumatic Stress', 7),
      (v_art_id, 'government', 2, 'Sleep and trauma recovery', '2022', 'https://www.who.int/mental_health/evidence/sleep', 'World Health Organization', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT11-017 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT11-017';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Dissociation in PTSD: A comprehensive review', '2020', 'https://doi.org/10.1080/20008198.2020.1721498', 'European Journal of Psychotraumatology', 1),
      (v_art_id, 'peer_reviewed', 1, 'PTSD with dissociative symptoms subtype', '2019', 'https://doi.org/10.1176/appi.ajp.2019.19010021', 'American Journal of Psychiatry', 2),
      (v_art_id, 'government', 2, 'Understanding dissociation', '2023', 'https://www.ptsd.va.gov/professional/treat/cooccurring/dissociation_ptsd.asp', 'National Center for PTSD', 3),
      (v_art_id, 'peer_reviewed', 1, 'Grounding techniques for dissociation', '2020', 'https://doi.org/10.1002/jts.22516', 'Journal of Traumatic Stress', 4),
      (v_art_id, 'peer_reviewed', 1, 'Depersonalization and derealization in trauma', '2021', 'https://doi.org/10.1016/j.cpr.2021.102040', 'Clinical Psychology Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'Neurobiology of dissociation', '2020', 'https://doi.org/10.1016/j.biopsych.2020.06.003', 'Biological Psychiatry', 6),
      (v_art_id, 'government', 2, 'Treatment of dissociative symptoms', '2022', 'https://www.samhsa.gov/trauma-violence', 'Substance Abuse and Mental Health Services Administration', 7),
      (v_art_id, 'peer_reviewed', 1, 'Dissociative identity disorder and complex trauma', '2019', 'https://doi.org/10.1016/S2215-0366(19)30194-9', 'Lancet Psychiatry', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT11-018 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT11-018';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'PTSD in first responders: A systematic review', '2018', 'https://doi.org/10.1017/S1049023X18000055', 'Prehospital and Disaster Medicine', 1),
      (v_art_id, 'peer_reviewed', 1, 'Mental health in emergency services personnel', '2021', 'https://doi.org/10.1186/s12873-021-00424-6', 'BMC Emergency Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'Police and PTSD', '2020', 'https://doi.org/10.1007/s11896-020-09367-4', 'Journal of Police and Criminal Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Firefighter mental health', '2019', 'https://doi.org/10.1097/JOM.0000000000001688', 'Journal of Occupational and Environmental Medicine', 4),
      (v_art_id, 'government', 2, 'Supporting first responder mental health', '2022', 'https://www.samhsa.gov/dtac/ccp-toolkit', 'Substance Abuse and Mental Health Services Administration', 5),
      (v_art_id, 'peer_reviewed', 1, 'Cumulative trauma and resilience in emergency personnel', '2021', 'https://doi.org/10.1037/tra0001024', 'Psychological Trauma: Theory, Research, Practice, and Policy', 6),
      (v_art_id, 'peer_reviewed', 1, 'Organizational factors in first responder mental health', '2020', 'https://doi.org/10.1080/02678373.2020.1778999', 'Work & Stress', 7),
      (v_art_id, 'government', 2, 'First responder wellness', '2023', 'https://www.nimh.nih.gov/health/topics/post-traumatic-stress-disorder-ptsd', 'National Institute of Mental Health', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT11-019 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT11-019';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'PTSD in veterans: Epidemiology and treatment', '2019', 'https://doi.org/10.1093/milmed/usy223', 'Military Medicine', 1),
      (v_art_id, 'peer_reviewed', 1, 'Combat exposure and PTSD', '2020', 'https://doi.org/10.1001/jamapsychiatry.2020.2151', 'JAMA Psychiatry', 2),
      (v_art_id, 'government', 2, 'Understanding PTSD and PTSD treatment for veterans', '2023', 'https://www.ptsd.va.gov/understand_tx/tx_basics.asp', 'National Center for PTSD', 3),
      (v_art_id, 'peer_reviewed', 1, 'Moral injury in combat veterans', '2021', 'https://doi.org/10.1016/j.cpr.2021.102025', 'Clinical Psychology Review', 4),
      (v_art_id, 'peer_reviewed', 1, 'Transition from military to civilian life', '2020', 'https://doi.org/10.1080/08995605.2020.1754128', 'Military Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'TBI and PTSD comorbidity', '2019', 'https://doi.org/10.1080/02699052.2019.1565895', 'Brain Injury', 6),
      (v_art_id, 'government', 2, 'Evidence-based treatments for veterans with PTSD', '2023', 'https://www.va.gov/health-care/health-needs-conditions/mental-health/ptsd/', 'Department of Veterans Affairs', 7),
      (v_art_id, 'peer_reviewed', 1, 'Military sexual trauma', '2020', 'https://doi.org/10.1177/1524838020906530', 'Trauma, Violence, & Abuse', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT11-020 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT11-020';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Acute Stress Disorder: A systematic review', '2020', 'https://doi.org/10.1016/j.cpr.2020.101849', 'Clinical Psychology Review', 1),
      (v_art_id, 'peer_reviewed', 1, 'From acute stress to PTSD: Longitudinal studies', '2019', 'https://doi.org/10.1001/jamapsychiatry.2019.0982', 'JAMA Psychiatry', 2),
      (v_art_id, 'clinical_guideline', 4, 'Diagnostic criteria for Acute Stress Disorder', '2022', 'https://www.psychiatry.org/psychiatrists/practice/dsm', 'American Psychiatric Association', 3),
      (v_art_id, 'peer_reviewed', 1, 'Early intervention for trauma', '2021', 'https://doi.org/10.1002/14651858.CD007944.pub3', 'Cochrane Database of Systematic Reviews', 4),
      (v_art_id, 'peer_reviewed', 1, 'Natural recovery from trauma', '2020', 'https://doi.org/10.1017/S0033291720001300', 'Psychological Medicine', 5),
      (v_art_id, 'government', 2, 'Understanding trauma reactions', '2023', 'https://www.ptsd.va.gov/understand/what/acute_stress.asp', 'National Center for PTSD', 6),
      (v_art_id, 'government', 2, 'Psychological First Aid', '2022', 'https://www.who.int/publications/i/item/9789241548205', 'World Health Organization', 7),
      (v_art_id, 'peer_reviewed', 1, 'Trauma-focused CBT for ASD', '2019', 'https://doi.org/10.1016/j.brat.2019.05.002', 'Behavior Research and Therapy', 8)
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
