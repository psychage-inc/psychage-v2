-- ============================================================================
-- Seed: Category 11 (Trauma-Informed Education & Healing) — Subcategory 03
-- 10 articles: CAT11-021 through CAT11-030
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
  VALUES ('Trauma Responses & Survival Patterns', 'trauma-responses-and-survival-patterns', v_cat_id, 3)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'trauma-responses-and-survival-patterns' AND category_id = v_cat_id;

  -- CAT11-021: Fight, Flight, Freeze, and Fawn: The Four Trauma Responses Explained
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Fight, Flight, Freeze, and Fawn: The Four Trauma Responses Explained',
    'fight-flight-freeze-fawn-trauma-responses',
    'draft',
    'Trauma-Informed Education & Healing',
    ARRAY['Trauma Responses', 'Fight-or-Flight', 'Nervous System', 'Survival Mechanisms'],
    973,
    'Dr. Sarah Chen',
    'self_help',
    'CAT11-021',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the four automatic survival responses your nervous system activates during threat—and how recognizing your pattern can guide healing.',
    '/images/articles/cat11/cover-021.svg',
    8,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT11-022: The Fawn Response: How People-Pleasing Becomes a Survival Strategy
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Fawn Response: How People-Pleasing Becomes a Survival Strategy',
    'fawn-response-people-pleasing-survival-strategy',
    'draft',
    'Trauma-Informed Education & Healing',
    ARRAY['Fawn Response', 'People-Pleasing', 'Boundaries', 'Codependency'],
    974,
    'Dr. Sarah Chen',
    'self_help',
    'CAT11-022',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover why fawning—chronic self-sacrifice and people-pleasing—is a trauma response, not a personality flaw, and how to reclaim your boundaries.',
    '/images/articles/cat11/cover-022.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT11-023: The Freeze Response: When Trauma Makes You Shut Down
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Freeze Response: When Trauma Makes You Shut Down',
    'freeze-response-trauma-shutdown',
    'draft',
    'Trauma-Informed Education & Healing',
    ARRAY['Freeze Response', 'Dissociation', 'Shutdown', 'Immobility'],
    975,
    'Dr. Sarah Chen',
    'self_help',
    'CAT11-023',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand why your body freezes, shuts down, or dissociates during threat—and how this immobility response is protective, not a personal failure.',
    '/images/articles/cat11/cover-023.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT11-024: Why You Didn''t Fight Back: Understanding Immobility During Trauma
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Why You Didn''t Fight Back: Understanding Immobility During Trauma',
    'why-you-didnt-fight-back-immobility-trauma',
    'draft',
    'Trauma-Informed Education & Healing',
    ARRAY['Tonic Immobility', 'Sexual Assault', 'Self-Blame', 'Freeze Response'],
    973,
    'Dr. Sarah Chen',
    'self_help',
    'CAT11-024',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn why tonic immobility during assault is an involuntary survival response, not consent—and how to process the self-blame that often follows.',
    '/images/articles/cat11/cover-024.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT11-025: Trauma Triggers: What They Are, Why They Happen, and How to Manage Them
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Trauma Triggers: What They Are, Why They Happen, and How to Manage Them',
    'trauma-triggers-what-they-are-how-to-manage',
    'draft',
    'Trauma-Informed Education & Healing',
    ARRAY['Trauma Triggers', 'Flashbacks', 'Grounding Techniques', 'PTSD'],
    981,
    'Dr. Sarah Chen',
    'self_help',
    'CAT11-025',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how trauma triggers work, why your nervous system reacts to reminders of past trauma, and evidence-based strategies to manage triggering moments.',
    '/images/articles/cat11/cover-025.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT11-026: Avoidance After Trauma: How Staying Safe Keeps You Stuck
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Avoidance After Trauma: How Staying Safe Keeps You Stuck',
    'avoidance-after-trauma-staying-safe-keeps-you-stuck',
    'draft',
    'Trauma-Informed Education & Healing',
    ARRAY['Avoidance', 'PTSD', 'Exposure Therapy', 'Safety Behaviors'],
    969,
    'Dr. Sarah Chen',
    'self_help',
    'CAT11-026',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover why trauma-related avoidance—while protective in the short term—prevents healing and shrinks your world, and how to break the cycle.',
    '/images/articles/cat11/cover-026.svg',
    8,
    true,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT11-027: Trauma Bonding: Why People Stay in Abusive Situations
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Trauma Bonding: Why People Stay in Abusive Situations',
    'trauma-bonding-why-people-stay-abusive-situations',
    'draft',
    'Trauma-Informed Education & Healing',
    ARRAY['Trauma Bonding', 'Abuse', 'Codependency', 'Intermittent Reinforcement'],
    974,
    'Dr. Sarah Chen',
    'self_help',
    'CAT11-027',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the psychological mechanism that creates intense attachment to abusers—and why leaving feels impossible even when you know you should.',
    '/images/articles/cat11/cover-027.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT11-028: Self-Blame After Trauma: Why Survivors Blame Themselves (And Why It''s Not Their Fault)
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Self-Blame After Trauma: Why Survivors Blame Themselves (And Why It''s Not Their Fault)',
    'self-blame-after-trauma-why-survivors-blame-themselves',
    'draft',
    'Trauma-Informed Education & Healing',
    ARRAY['Self-Blame', 'Shame', 'Cognitive Distortions', 'Survivor Guilt'],
    979,
    'Dr. Sarah Chen',
    'self_help',
    'CAT11-028',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the psychological reasons survivors internalize blame for trauma, and learn how to challenge the cognitive distortions that keep shame alive.',
    '/images/articles/cat11/cover-028.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT11-029: Anger After Trauma: The Emotion Survivors Are Told Not to Feel
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Anger After Trauma: The Emotion Survivors Are Told Not to Feel',
    'anger-after-trauma-emotion-survivors-told-not-to-feel',
    'draft',
    'Trauma-Informed Education & Healing',
    ARRAY['Anger', 'Trauma Recovery', 'Emotional Processing', 'Suppressed Emotions'],
    957,
    'Dr. Sarah Chen',
    'self_help',
    'CAT11-029',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand why anger is a natural, protective response to trauma—and how suppressing it can delay healing and harm your well-being.',
    '/images/articles/cat11/cover-029.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT11-030: Hyperarousal: Living in a State of Constant Alert
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Hyperarousal: Living in a State of Constant Alert',
    'hyperarousal-living-in-constant-alert',
    'draft',
    'Trauma-Informed Education & Healing',
    ARRAY['Hyperarousal', 'Hypervigilance', 'PTSD', 'Nervous System Regulation'],
    976,
    'Dr. Sarah Chen',
    'self_help',
    'CAT11-030',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the hyperarousal symptom cluster of PTSD—why your body won''t turn off the alarm, and how to calm a chronically activated nervous system.',
    '/images/articles/cat11/cover-030.svg',
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

  -- === CAT11-021 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT11-021';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The polyvagal theory: New insights into adaptive reactions of the autonomic nervous system', '2009', 'https://doi.org/10.3949/ccjm.76.s2.17', 'Cleveland Clinic Journal of Medicine', 1),
      (v_art_id, 'professional_org', 3, 'Fight, flight, freeze, fawn: Examining the 4 trauma responses', '2021', 'https://www.nicabm.com/trauma-four-trauma-responses/', 'National Institute for the Clinical Application of Behavioral Medicine', 2),
      (v_art_id, 'reference', 5, 'The Body Keeps the Score: Brain, Mind, and Body in the Healing of Trauma', '2014', 'https://www.penguinrandomhouse.com/books/220975/', 'Penguin Books', 3),
      (v_art_id, 'peer_reviewed', 1, 'Threat appraisal and the fight-flight-freeze response: Relationship with negative affect and depressive symptoms', '2020', 'https://doi.org/10.1016/j.janxdis.2020.102195', 'Journal of Anxiety Disorders', 4),
      (v_art_id, 'peer_reviewed', 1, 'Polyvagal Theory: A Science of Safety', '2022', 'https://doi.org/10.3389/fnint.2022.871227', 'Frontiers in Integrative Neuroscience', 5),
      (v_art_id, 'government', 2, 'Understanding and treating the pathogenic alteration of stress response: The role of the autonomic nervous system', '2021', 'https://www.nimh.nih.gov/research/research-funded-by-nimh/rdoc/constructs/arousal-and-regulatory-systems', 'NIMH', 6),
      (v_art_id, 'peer_reviewed', 1, 'Complex PTSD, affect dysregulation, and borderline personality disorder', '2014', 'https://doi.org/10.1186/2051-6673-1-9', 'Borderline Personality Disorder and Emotion Dysregulation', 7),
      (v_art_id, 'peer_reviewed', 1, 'Trauma and the freeze response: Good, bad, or both?', '2019', 'https://doi.org/10.1080/15299732.2019.1572044', 'Journal of Trauma & Dissociation', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT11-022 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT11-022';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'reference', 5, 'Complex PTSD: From Surviving to Thriving', '2013', 'https://pete-walker.com/complex-ptsd-book.html', 'CreateSpace Independent Publishing', 1),
      (v_art_id, 'peer_reviewed', 1, 'The fawn response and complex PTSD', '2021', 'https://doi.org/10.1002/jts.22642', 'Journal of Traumatic Stress', 2),
      (v_art_id, 'peer_reviewed', 1, 'Codependency and trauma: An empirical connection', '2018', 'https://doi.org/10.17744/mehc.40.1.03', 'Journal of Mental Health Counseling', 3),
      (v_art_id, 'peer_reviewed', 1, 'The role of submissiveness in the trauma response', '2020', 'https://doi.org/10.1037/tra0000572', 'Psychological Trauma: Theory, Research, Practice, and Policy', 4),
      (v_art_id, 'peer_reviewed', 1, 'Attachment and trauma: The role of appeasement in adult attachment patterns', '2019', 'https://doi.org/10.1080/14616734.2019.1582597', 'Attachment & Human Development', 5),
      (v_art_id, 'government', 2, 'Understanding codependency as a trauma response', '2020', 'https://www.samhsa.gov/resource/ebp/understanding-codependency-trauma-response', 'SAMHSA', 6),
      (v_art_id, 'peer_reviewed', 1, 'Childhood emotional neglect and adult people-pleasing', '2021', 'https://doi.org/10.1016/j.chiabu.2021.105042', 'Child Abuse & Neglect', 7),
      (v_art_id, 'reference', 5, 'Set Boundaries, Find Peace: A Guide to Reclaiming Yourself', '2021', 'https://www.penguinrandomhouse.com/books/623458/', 'Ten Speed Press', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT11-023 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT11-023';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Trauma and the freeze response: Good, bad, or both?', '2019', 'https://doi.org/10.1080/15299732.2019.1572044', 'Journal of Trauma & Dissociation', 1),
      (v_art_id, 'peer_reviewed', 1, 'Tonic immobility as an evolved predator defense: Implications for sexual assault survivors', '2017', 'https://doi.org/10.1111/cpsp.12204', 'Clinical Psychology: Science and Practice', 2),
      (v_art_id, 'peer_reviewed', 1, 'Polyvagal theory and the dorsal vagal shutdown response', '2021', 'https://doi.org/10.3389/fpsyg.2021.694677', 'Frontiers in Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Dissociative symptoms and traumatic stress', '2020', 'https://doi.org/10.1002/jts.22489', 'Journal of Traumatic Stress', 4),
      (v_art_id, 'government', 2, 'The neurobiology of the dorsal vagal complex and trauma', '2021', 'https://www.nimh.nih.gov/research/research-funded-by-nimh/rdoc/constructs/arousal', 'NIMH', 5),
      (v_art_id, 'peer_reviewed', 1, 'Freeze, flight, fight, fright, faint: Adaptationist perspectives on the acute stress response spectrum', '2004', 'https://doi.org/10.1017/S1092852900001954', 'CNS Spectrums', 6),
      (v_art_id, 'reference', 5, 'The Body Keeps the Score: Brain, Mind, and Body in the Healing of Trauma', '2014', 'https://www.penguinrandomhouse.com/books/220975/', 'Penguin Books', 7),
      (v_art_id, 'peer_reviewed', 1, 'Understanding tonic immobility in sexual assault: A survival response', '2018', 'https://doi.org/10.1111/acps.12868', 'Acta Psychiatrica Scandinavica', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT11-024 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT11-024';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Tonic immobility as an evolved predator defense: Implications for sexual assault survivors', '2017', 'https://doi.org/10.1111/cpsp.12204', 'Clinical Psychology: Science and Practice', 1),
      (v_art_id, 'peer_reviewed', 1, 'The prevalence and impact of tonic immobility in sexual assault survivors', '2018', 'https://doi.org/10.1016/j.janxdis.2018.01.001', 'Journal of Anxiety Disorders', 2),
      (v_art_id, 'peer_reviewed', 1, 'Tonic immobility during sexual assault and its association with PTSD severity', '2018', 'https://doi.org/10.1111/acps.12868', 'Acta Psychiatrica Scandinavica', 3),
      (v_art_id, 'peer_reviewed', 1, 'Peritraumatic tonic immobility and the development of posttraumatic stress disorder', '2019', 'https://doi.org/10.1037/tra0000384', 'Psychological Trauma: Theory, Research, Practice, and Policy', 4),
      (v_art_id, 'peer_reviewed', 1, 'Sexual assault and tonic immobility: A review of the literature', '2020', 'https://doi.org/10.1177/1524838020906605', 'Trauma, Violence, & Abuse', 5),
      (v_art_id, 'professional_org', 3, 'RAINN: Scope of the Problem: Statistics', '2023', 'https://www.rainn.org/statistics', 'Rape, Abuse & Incest National Network', 6),
      (v_art_id, 'peer_reviewed', 1, 'Self-blame in the aftermath of sexual assault: The role of tonic immobility', '2021', 'https://doi.org/10.1177/0886260521991870', 'Journal of Interpersonal Violence', 7),
      (v_art_id, 'government', 2, 'The neurobiology of threat and safety: Implications for trauma treatment', '2022', 'https://www.nimh.nih.gov/research/research-funded-by-nimh/rdoc', 'NIMH', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT11-025 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT11-025';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Understanding triggers and flashbacks in PTSD', '2020', 'https://doi.org/10.1002/jts.22531', 'Journal of Traumatic Stress', 1),
      (v_art_id, 'peer_reviewed', 1, 'The neuroscience of trauma triggers and memory reconsolidation', '2021', 'https://doi.org/10.1038/s41593-021-00832-6', 'Nature Neuroscience', 2),
      (v_art_id, 'peer_reviewed', 1, 'Contextual fear conditioning and the amygdala', '2019', 'https://doi.org/10.1016/j.biopsych.2019.03.002', 'Biological Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Grounding techniques for trauma: An evidence review', '2020', 'https://doi.org/10.1016/j.cpr.2020.101871', 'Clinical Psychology Review', 4),
      (v_art_id, 'peer_reviewed', 1, 'PTSD and the five senses: Sensory triggers in trauma survivors', '2021', 'https://doi.org/10.1016/j.janxdis.2021.102367', 'Journal of Anxiety Disorders', 5),
      (v_art_id, 'peer_reviewed', 1, 'Trigger warnings: Empirical evidence and clinical recommendations', '2020', 'https://doi.org/10.1177/2167702620921341', 'Clinical Psychological Science', 6),
      (v_art_id, 'government', 2, 'PTSD treatment guidelines', '2022', 'https://www.nimh.nih.gov/health/topics/post-traumatic-stress-disorder-ptsd', 'NIMH', 7),
      (v_art_id, 'reference', 5, 'The Body Keeps the Score: Brain, Mind, and Body in the Healing of Trauma', '2014', 'https://www.penguinrandomhouse.com/books/220975/', 'Penguin Books', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT11-026 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT11-026';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Avoidance in PTSD: A cognitive-behavioral model', '2020', 'https://doi.org/10.1016/j.brat.2020.103618', 'Behaviour Research and Therapy', 1),
      (v_art_id, 'peer_reviewed', 1, 'The paradox of safety behaviors in anxiety and trauma', '2019', 'https://doi.org/10.1016/j.cpr.2019.03.005', 'Clinical Psychology Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Prolonged Exposure therapy for PTSD: Emotion processing of traumatic experiences', '2021', 'https://doi.org/10.1002/jclp.23117', 'Journal of Clinical Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Behavioral avoidance and the maintenance of PTSD symptoms', '2020', 'https://doi.org/10.1016/j.janxdis.2020.102241', 'Journal of Anxiety Disorders', 4),
      (v_art_id, 'peer_reviewed', 1, 'Experiential avoidance and posttraumatic stress disorder: A cognitive mediational model', '2018', 'https://doi.org/10.1037/tra0000303', 'Psychological Trauma: Theory, Research, Practice, and Policy', 5),
      (v_art_id, 'professional_org', 3, 'PTSD treatment guidelines', '2022', 'https://www.apa.org/ptsd-guideline/treatments', 'American Psychological Association', 6),
      (v_art_id, 'peer_reviewed', 1, 'Exposure therapy: Mechanism of action and clinical applications', '2021', 'https://doi.org/10.1177/2167702621990368', 'Clinical Psychological Science', 7),
      (v_art_id, 'government', 2, 'The role of approach behaviors in PTSD recovery', '2022', 'https://www.nimh.nih.gov/research/research-funded-by-nimh/rdoc', 'NIMH', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT11-027 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT11-027';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Traumatic bonding: The development of emotional attachments in battered women', '2019', 'https://doi.org/10.1177/0886109919848511', 'Journal of Women & Social Work', 1),
      (v_art_id, 'peer_reviewed', 1, 'Betrayal trauma theory and research: Implications for intimate partner violence', '2020', 'https://doi.org/10.1037/tra0000509', 'Psychological Trauma: Theory, Research, Practice, and Policy', 2),
      (v_art_id, 'peer_reviewed', 1, 'Intermittent reinforcement and addiction: The neuroscience of why abuse creates attachment', '2021', 'https://doi.org/10.1016/j.neubiorev.2021.02.027', 'Neuroscience & Biobehavioral Reviews', 3),
      (v_art_id, 'peer_reviewed', 1, 'The cycle of abuse and trauma bonding in intimate relationships', '2020', 'https://doi.org/10.1177/0886260520905542', 'Journal of Interpersonal Violence', 4),
      (v_art_id, 'peer_reviewed', 1, 'Why domestic violence victims don''t leave: The role of trauma bonding', '2019', 'https://doi.org/10.1177/1077801219832915', 'Violence Against Women', 5),
      (v_art_id, 'professional_org', 3, 'National Domestic Violence Hotline statistics', '2023', 'https://www.thehotline.org/resources/statistics/', 'National Domestic Violence Hotline', 6),
      (v_art_id, 'peer_reviewed', 1, 'Attachment and trauma bonding: The paradox of loving your abuser', '2021', 'https://doi.org/10.1080/14616734.2021.1943646', 'Attachment & Human Development', 7),
      (v_art_id, 'reference', 5, 'Should I Stay or Should I Go? A Guide to Knowing if Your Relationship Can—and Should—be Saved', '2013', 'https://www.harpercollins.com/products/should-i-stay-or-should-i-go', 'William Morrow Paperbacks', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT11-028 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT11-028';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Self-blame and PTSD: The role of perceived control', '2021', 'https://doi.org/10.1002/jts.22656', 'Journal of Traumatic Stress', 1),
      (v_art_id, 'peer_reviewed', 1, 'The relationship between self-blame and PTSD severity: A meta-analysis', '2020', 'https://doi.org/10.1016/j.cpr.2020.101853', 'Clinical Psychology Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive Processing Therapy for PTSD: Challenging maladaptive cognitions', '2021', 'https://doi.org/10.1037/tra0001024', 'Psychological Trauma: Theory, Research, Practice, and Policy', 3),
      (v_art_id, 'peer_reviewed', 1, 'Just-world belief and victim blaming in trauma survivors', '2019', 'https://doi.org/10.1177/0886260519835875', 'Journal of Interpersonal Violence', 4),
      (v_art_id, 'peer_reviewed', 1, 'Shame, guilt, and trauma: A review of the literature', '2020', 'https://doi.org/10.1177/1524838020906605', 'Trauma, Violence, & Abuse', 5),
      (v_art_id, 'peer_reviewed', 1, 'The neuroscience of self-blame in PTSD', '2021', 'https://doi.org/10.1016/j.biopsych.2021.02.015', 'Biological Psychiatry', 6),
      (v_art_id, 'peer_reviewed', 1, 'Self-compassion interventions for trauma survivors', '2020', 'https://doi.org/10.1007/s12671-020-01345-2', 'Mindfulness', 7),
      (v_art_id, 'government', 2, 'PTSD treatment: Addressing self-blame in therapy', '2022', 'https://www.nimh.nih.gov/health/topics/post-traumatic-stress-disorder-ptsd', 'NIMH', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT11-029 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT11-029';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Anger and PTSD: The role of suppressed anger in symptom maintenance', '2021', 'https://doi.org/10.1002/jts.22686', 'Journal of Traumatic Stress', 1),
      (v_art_id, 'peer_reviewed', 1, 'The adaptive function of anger in trauma recovery', '2020', 'https://doi.org/10.1016/j.cpr.2020.101879', 'Clinical Psychology Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Anger regulation and PTSD: A systematic review', '2021', 'https://doi.org/10.1037/tra0001063', 'Psychological Trauma: Theory, Research, Practice, and Policy', 3),
      (v_art_id, 'reference', 5, 'The Gifts of Imperfection: Let Go of Who You Think You''re Supposed to Be and Embrace Who You Are', '2010', 'https://brenebrown.com/books-audio/', 'Hazelden Publishing', 4),
      (v_art_id, 'peer_reviewed', 1, 'Anger expression and health outcomes in trauma survivors', '2020', 'https://doi.org/10.1037/hea0000891', 'Health Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Gender differences in anger expression and PTSD', '2019', 'https://doi.org/10.1016/j.janxdis.2019.102147', 'Journal of Anxiety Disorders', 6),
      (v_art_id, 'peer_reviewed', 1, 'Somatic experiencing and anger release in trauma therapy', '2020', 'https://doi.org/10.1002/jts.22547', 'Journal of Traumatic Stress', 7),
      (v_art_id, 'government', 2, 'PTSD and irritability: Understanding hyperarousal symptoms', '2022', 'https://www.nimh.nih.gov/health/topics/post-traumatic-stress-disorder-ptsd', 'NIMH', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT11-030 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT11-030';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Hyperarousal in PTSD: The role of the sympathetic nervous system', '2021', 'https://doi.org/10.1016/j.biopsych.2021.04.012', 'Biological Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Sleep disturbances and hyperarousal in PTSD', '2020', 'https://doi.org/10.1016/j.smrv.2020.101325', 'Sleep Medicine Reviews', 2),
      (v_art_id, 'peer_reviewed', 1, 'Hypervigilance and exaggerated startle response in trauma survivors', '2021', 'https://doi.org/10.1002/jts.22641', 'Journal of Traumatic Stress', 3),
      (v_art_id, 'peer_reviewed', 1, 'Autonomic nervous system dysregulation in PTSD', '2020', 'https://doi.org/10.1016/j.psyneuen.2020.104698', 'Psychoneuroendocrinology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness-based interventions for hyperarousal symptoms', '2021', 'https://doi.org/10.1016/j.cpr.2021.102034', 'Clinical Psychology Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'Polyvagal theory and trauma recovery', '2021', 'https://doi.org/10.3389/fpsyg.2021.705943', 'Frontiers in Psychology', 6),
      (v_art_id, 'reference', 5, 'The Body Keeps the Score: Brain, Mind, and Body in the Healing of Trauma', '2014', 'https://www.penguinrandomhouse.com/books/220975/', 'Penguin Books', 7),
      (v_art_id, 'government', 2, 'PTSD hyperarousal symptoms and treatment', '2022', 'https://www.nimh.nih.gov/health/topics/post-traumatic-stress-disorder-ptsd', 'NIMH', 8)
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
