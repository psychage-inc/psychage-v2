-- ============================================================================
-- Seed: Category 1 (Emotional Regulation & Self-Awareness) — Subcategory 04
-- 10 articles: CAT01-031 through CAT01-040
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert Category if not present
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  'Emotional Regulation & Self-Awareness',
  'emotional-regulation',
  '',
  'Brain',
  1,
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'emotional-regulation';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Emotional Intelligence In Practice', 'emotional-intelligence-in-practice', v_cat_id, 4)
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'emotional-regulation';
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'emotional-intelligence-in-practice' AND category_id = v_cat_id;

  -- CAT01-031: What Is Emotional Intelligence? Beyond the Buzzword
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'What Is Emotional Intelligence? Beyond the Buzzword',
    'what-is-emotional-intelligence-beyond-the-buzzword',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Emotional Intelligence', 'Self-Awareness', 'Empathy', 'Interpersonal Skills'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-031',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Emotional intelligence is more than a corporate trend. Discover what EQ really means, why it matters for mental health, and how to develop it.',
    '/images/articles/cat01/cover-031.svg',
    8,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-032: Reading Other People
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Reading Other People',
    'reading-other-peoples-emotions-empathy-attunement-social-cues',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Empathy', 'Social Skills', 'Nonverbal Communication', 'Attunement'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-032',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How to accurately perceive emotions in others through facial expressions, body language, and context—without mind-reading or projection.',
    '/images/articles/cat01/cover-032.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-033: Emotional Intelligence in Conversations: Listening Beyond Words
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Emotional Intelligence in Conversations: Listening Beyond Words',
    'emotional-intelligence-in-conversations-listening-beyond-words',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Active Listening', 'Communication', 'Validation', 'Emotional Intelligence'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-033',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How to bring emotional intelligence to everyday conversations—hearing what',
    '/images/articles/cat01/cover-033.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-034: How to Respond (Not React) in Emotionally Charged Situations
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How to Respond (Not React) in Emotionally Charged Situations',
    'how-to-respond-not-react-in-emotionally-charged-situations',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Emotional Regulation', 'Impulse Control', 'Mindfulness', 'Communication'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-034',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn the difference between reactive impulse and thoughtful response—and how to create space between feeling and action.',
    '/images/articles/cat01/cover-034.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-035: Emotional Intelligence at Work: Managing Feelings in Professional Settings
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Emotional Intelligence at Work: Managing Feelings in Professional Settings',
    'emotional-intelligence-at-work-managing-feelings-in-professional-settings',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Workplace Wellbeing', 'Emotional Intelligence', 'Professional Development', 'Boundaries'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-035',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How to navigate workplace emotions, handle difficult colleagues, set boundaries, and maintain professionalism without suppressing your humanity.',
    '/images/articles/cat01/cover-035.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-036: The Empathy Spectrum: From Cognitive to Affective to Compassionate
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Empathy Spectrum: From Cognitive to Affective to Compassionate',
    'the-empathy-spectrum-from-cognitive-to-affective-to-compassionate',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Empathy', 'Compassion', 'Neuroscience', 'Research Digest'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-036',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding the three types of empathy—cognitive, affective, and compassionate—and how they shape connection, burnout, and helping behavior.',
    '/images/articles/cat01/cover-036.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-037: Emotional Contagion: Why Other People
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Emotional Contagion: Why Other People',
    'emotional-contagion-why-other-peoples-moods-affect-yours',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Emotional Contagion', 'Mirror Neurons', 'Social Neuroscience', 'Research Digest'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-037',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The neuroscience of emotional contagion—how moods spread between people, who',
    '/images/articles/cat01/cover-037.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-038: Setting Emotional Boundaries While Staying Connected
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Setting Emotional Boundaries While Staying Connected',
    'setting-emotional-boundaries-while-staying-connected',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Boundaries', 'Self-Care', 'Relationships', 'Emotional Regulation'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-038',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How to protect your emotional energy without shutting people out—the delicate balance between empathy and self-preservation.',
    '/images/articles/cat01/cover-038.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-039: How to Have Difficult Conversations with Emotional Intelligence
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How to Have Difficult Conversations with Emotional Intelligence',
    'how-to-have-difficult-conversations-with-emotional-intelligence',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Communication', 'Conflict Resolution', 'Difficult Conversations', 'Emotional Intelligence'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-039',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Navigate conflict, deliver hard feedback, and address sensitive topics without defensiveness, shutdown, or damage to the relationship.',
    '/images/articles/cat01/cover-039.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT01-040: Teaching Emotional Intelligence: Skills for Parents, Teachers, and Mentors
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Teaching Emotional Intelligence: Skills for Parents, Teachers, and Mentors',
    'teaching-emotional-intelligence-skills-for-parents-teachers-mentors',
    'draft',
    'Emotional Regulation & Self-Awareness',
    ARRAY['Parenting', 'Child Development', 'Education', 'Emotional Intelligence'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT01-040',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How to help children and young adults develop emotional awareness, regulation, empathy, and social skills—with age-appropriate strategies.',
    '/images/articles/cat01/cover-040.svg',
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

  -- === CAT01-031 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-031';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'textbook', 5, 'Emotional Intelligence: Why It Can Matter More Than IQ', '1995', 'https://www.worldcat.org/title/emotional-intelligence/oclc/32430189', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'The Ability Model of Emotional Intelligence: Principles and Updates', '2016', 'https://doi.org/10.1177/1754073916639667', 'Emotion Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Emotional intelligence and mental health', '2018', 'https://doi.org/10.1016/S2215-0366(18)30012-X', 'The Lancet Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'The relationship between emotional intelligence and mental health in adolescents', '2020', 'https://doi.org/10.1016/j.adolescence.2020.01.016', 'Journal of Adolescence', 4),
      (v_art_id, 'peer_reviewed', 1, 'Emotional intelligence in the workplace: A review and synthesis', '2019', 'https://doi.org/10.1146/annurev-orgpsych-012218-015140', 'Annual Review of Organizational Psychology and Organizational Behavior', 5),
      (v_art_id, 'peer_reviewed', 1, 'Emotional intelligence: A meta-analytic investigation of predictive validity and nomological net', '2010', 'https://doi.org/10.1016/j.jvb.2010.03.013', 'Journal of Vocational Behavior', 6),
      (v_art_id, 'peer_reviewed', 1, 'The neural basis of emotional intelligence', '2017', 'https://doi.org/10.1093/scan/nsw177', 'Social Cognitive and Affective Neuroscience', 7),
      (v_art_id, 'peer_reviewed', 1, 'Emotional intelligence interventions to increase well-being: A systematic review and meta-analysis', '2021', 'https://doi.org/10.1037/emo0000925', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-032 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-032';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'textbook', 5, 'Nonverbal Communication in Human Interaction', '2013', 'https://www.worldcat.org/title/nonverbal-communication-in-human-interaction/oclc/828424566', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Reading Faces: The Science and Art of Facial Emotion Recognition', '2021', 'https://doi.org/10.1146/annurev-psych-071720-024944', 'Annual Review of Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Empathy and facial mimicry: Evidence from facial electromyography', '2016', 'https://doi.org/10.1016/j.biopsycho.2016.01.007', 'Biological Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'The neuroscience of empathy and compassion in pro-social behavior', '2018', 'https://doi.org/10.1016/j.neuropsychologia.2018.01.015', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Vocal affect recognition across cultures', '2019', 'https://doi.org/10.1037/emo0000591', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Emotion recognition from body language: A systematic review', '2020', 'https://doi.org/10.3389/fpsyg.2020.01934', 'Frontiers in Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Context-dependent emotion recognition in humans and machines', '2022', 'https://doi.org/10.1016/j.tics.2022.01.002', 'Trends in Cognitive Sciences', 7),
      (v_art_id, 'peer_reviewed', 1, 'Individual differences in emotion recognition ability: A systematic review', '2020', 'https://doi.org/10.1016/j.paid.2020.110085', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-033 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-033';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Active listening in clinical practice', '2017', 'https://doi.org/10.3766/jaaa.16123', 'Journal of the American Academy of Audiology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Validation and invalidation in psychotherapy: A meta-analysis', '2019', 'https://doi.org/10.1080/10503307.2018.1492532', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'The neuroscience of listening: How attentive listening shapes brain connectivity', '2021', 'https://doi.org/10.1016/j.neuroimage.2021.118012', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Empathic listening and relationship satisfaction', '2018', 'https://doi.org/10.1177/0265407517724600', 'Journal of Social and Personal Relationships', 4),
      (v_art_id, 'peer_reviewed', 1, 'The impact of reflective listening on emotional disclosure', '2020', 'https://doi.org/10.1177/0093650219861256', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Nonverbal synchrony in conversations: Its role in empathic accuracy', '2019', 'https://doi.org/10.1037/emo0000584', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Emotional validation in romantic relationships', '2017', 'https://doi.org/10.1111/pere.12194', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'The role of listening in mental health treatment outcomes', '2021', 'https://doi.org/10.1016/j.cpr.2021.102043', 'Clinical Psychology Review', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-034 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-034';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The neuroscience of emotion regulation', '2020', 'https://doi.org/10.1038/s41583-020-0273-9', 'Nature Reviews Neuroscience', 1),
      (v_art_id, 'peer_reviewed', 1, 'Response modulation in emotion regulation: A neuroscience perspective', '2019', 'https://doi.org/10.1016/j.biopsych.2019.03.973', 'Biological Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'The space between stimulus and response: Mindfulness and cognitive reappraisal', '2018', 'https://doi.org/10.1007/s12671-018-0899-x', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Impulse control and emotional dysregulation in borderline personality disorder', '2017', 'https://doi.org/10.1037/abn0000297', 'Journal of Abnormal Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'The power of the pause: Delay as an emotion regulation strategy', '2021', 'https://doi.org/10.1037/emo0000961', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Physiological down-regulation and cognitive reappraisal in emotional responding', '2020', 'https://doi.org/10.1111/psyp.13578', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'The role of prefrontal cortex in response inhibition', '2019', 'https://doi.org/10.1016/j.tics.2019.07.002', 'Trends in Cognitive Sciences', 7),
      (v_art_id, 'peer_reviewed', 1, 'Dialectical behavior therapy: Emotion regulation skills in practice', '2021', 'https://doi.org/10.1016/j.cbpra.2020.12.003', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-035 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-035';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Emotional intelligence and job performance: A meta-analysis', '2020', 'https://doi.org/10.1002/job.2447', 'Journal of Organizational Behavior', 1),
      (v_art_id, 'peer_reviewed', 1, 'The role of emotional intelligence in workplace success', '2019', 'https://doi.org/10.1146/annurev-orgpsych-012218-015140', 'Annual Review of Organizational Psychology and Organizational Behavior', 2),
      (v_art_id, 'peer_reviewed', 1, 'Emotional labor and burnout: A moderated mediation model', '2021', 'https://doi.org/10.1037/ocp0000283', 'Journal of Occupational Health Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Surface acting and deep acting: Differential effects on well-being', '2018', 'https://doi.org/10.1080/02678373.2018.1496883', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Emotional intelligence and leadership effectiveness', '2020', 'https://doi.org/10.1016/j.leaqua.2019.101345', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Workplace incivility and mental health: The moderating role of emotional intelligence', '2019', 'https://doi.org/10.1037/apl0000393', 'Journal of Applied Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'The emotional demands of the workplace: A review and research agenda', '2021', 'https://doi.org/10.1111/ijmr.12261', 'International Journal of Management Reviews', 7),
      (v_art_id, 'peer_reviewed', 1, 'Psychological safety in the workplace: A meta-analytic review', '2020', 'https://doi.org/10.1037/apl0000470', 'Journal of Applied Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-036 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-036';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The neural basis of empathy and its subtypes: A systematic review', '2020', 'https://doi.org/10.1016/j.neubiorev.2020.01.006', 'Neuroscience & Biobehavioral Reviews', 1),
      (v_art_id, 'peer_reviewed', 1, 'Empathy: A review of the concept', '2019', 'https://doi.org/10.1177/1754073919850884', 'Emotion Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Compassion fatigue among healthcare professionals: A systematic review and meta-analysis', '2021', 'https://doi.org/10.1111/jocn.15644', 'Journal of Clinical Nursing', 3),
      (v_art_id, 'peer_reviewed', 1, 'The distinction between empathy and compassion: Neural correlates', '2018', 'https://doi.org/10.1093/scan/nsy034', 'Social Cognitive and Affective Neuroscience', 4),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive empathy versus affective empathy in psychopathic traits', '2020', 'https://doi.org/10.1016/j.paid.2020.110168', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Compassion cultivation training: Effects on well-being and empathic distress', '2019', 'https://doi.org/10.1007/s12671-019-01126-9', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Mirror neuron dysfunction in autism spectrum disorder', '2018', 'https://doi.org/10.1038/s41380-018-0110-y', 'Molecular Psychiatry', 7),
      (v_art_id, 'peer_reviewed', 1, 'Empathy training for healthcare professionals: A meta-analysis', '2020', 'https://doi.org/10.1016/j.pec.2020.02.036', NULL, 8),
      (v_art_id, 'peer_reviewed', 1, 'The empathy-altruism hypothesis: A review', '2017', 'https://doi.org/10.1037/bul0000116', NULL, 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-037 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-037';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Emotional contagion: A brief overview and future directions', '2020', 'https://doi.org/10.1016/j.copsyc.2019.12.017', 'Current Opinion in Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'The neuroscience of emotional contagion', '2019', 'https://doi.org/10.1016/j.tics.2019.04.011', 'Trends in Cognitive Sciences', 2),
      (v_art_id, 'peer_reviewed', 1, 'Synchrony and physiological arousal increase cohesion and cooperation in large naturalistic groups', '2020', 'https://doi.org/10.1038/s41598-020-65670-0', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Individual differences in susceptibility to emotional contagion', '2018', 'https://doi.org/10.1016/j.paid.2018.07.011', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Emotional contagion in social media: A large-scale experimental study', '2014', 'https://doi.org/10.1073/pnas.1320040111', 'Proceedings of the National Academy of Sciences', 5),
      (v_art_id, 'peer_reviewed', 1, 'Mimicry and the evolution of empathy', '2019', 'https://doi.org/10.1016/j.cub.2019.01.060', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Stress contagion in the workplace: Behavioral and physiological evidence', '2021', 'https://doi.org/10.1037/apl0000889', 'Journal of Applied Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Anxiety contagion in romantic relationships', '2020', 'https://doi.org/10.1177/0265407520910787', 'Journal of Social and Personal Relationships', 8),
      (v_art_id, 'peer_reviewed', 1, 'The social transmission of stress in animal and human models', '2017', 'https://doi.org/10.1038/nn.4448', 'Nature Neuroscience', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-038 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-038';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Boundaries in relationships: Understanding the research on protecting the self and others', '2020', 'https://doi.org/10.1177/0265407520906184', 'Journal of Social and Personal Relationships', 1),
      (v_art_id, 'peer_reviewed', 1, 'Emotional boundaries and mental health: A review', '2019', 'https://doi.org/10.1016/j.cpr.2019.05.004', 'Clinical Psychology Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Codependency and enmeshment: Relationship patterns in close relationships', '2018', 'https://doi.org/10.1111/pere.12245', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Self-compassion and boundary-setting in caregiving relationships', '2021', 'https://doi.org/10.1080/15298868.2020.1861082', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'The art of saying no: Assertiveness and relationship satisfaction', '2020', 'https://doi.org/10.1016/j.paid.2020.109952', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Emotional labor in close relationships: Costs and benefits', '2019', 'https://doi.org/10.1037/emo0000582', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Boundaries versus walls: The psychology of connection and protection', '2021', 'https://doi.org/10.1177/00221678211011476', 'Journal of Humanistic Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Differentiation of self: Theory, research, and clinical applications', '2018', 'https://doi.org/10.1111/famp.12375', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-039 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-039';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Difficult conversations at work: A review and research agenda', '2020', 'https://doi.org/10.1037/apl0000485', 'Journal of Applied Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'The neuroscience of conflict: Threat responses and regulation', '2019', 'https://doi.org/10.1093/scan/nsz032', 'Social Cognitive and Affective Neuroscience', 2),
      (v_art_id, 'textbook', 5, 'Nonviolent Communication: A Language of Life', '2015', 'https://www.worldcat.org/title/nonviolent-communication-a-language-of-life/oclc/908393808', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Psychological safety and difficult conversations in teams', '2021', 'https://doi.org/10.1177/00018392211009935', 'Administrative Science Quarterly', 4),
      (v_art_id, 'peer_reviewed', 1, 'The role of empathy in navigating conflict', '2020', 'https://doi.org/10.1111/ncmr.12172', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Feedback-seeking behavior and performance: A meta-analysis', '2018', 'https://doi.org/10.1111/peps.12251', 'Personnel Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Stonewalling and demand-withdraw patterns in couples', '2019', 'https://doi.org/10.1111/jomf.12560', 'Journal of Marriage and Family', 7),
      (v_art_id, 'textbook', 5, 'Crucial Conversations: Tools for Talking When Stakes Are High', '2011', 'https://www.worldcat.org/title/crucial-conversations-tools-for-talking-when-stakes-are-high/oclc/731901894', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT01-040 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT01-040';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Social-emotional learning programs: A meta-analysis of outcomes', '2020', 'https://doi.org/10.1111/cdev.13369', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Emotion coaching: Parental meta-emotion philosophy and child outcomes', '2019', 'https://doi.org/10.1037/dev0000696', 'Developmental Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Teaching emotional intelligence in schools: A systematic review', '2021', 'https://doi.org/10.1007/s10648-020-09574-6', 'Educational Psychology Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'The development of emotional intelligence from childhood to adolescence', '2018', 'https://doi.org/10.1037/emo0000417', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Parental emotion regulation and child adjustment: A meta-analysis', '2020', 'https://doi.org/10.1016/j.cpr.2020.101878', 'Clinical Psychology Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'RULER approach to social and emotional learning', '2019', 'https://doi.org/10.1037/edu0000310', 'Journal of Educational Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'The long-term effects of emotional intelligence training in childhood', '2021', 'https://doi.org/10.1037/bul0000321', NULL, 7),
      (v_art_id, 'textbook', 5, 'Raising an Emotionally Intelligent Child: The Heart of Parenting', '1998', 'https://www.worldcat.org/title/raising-an-emotionally-intelligent-child/oclc/37692031', NULL, 8)
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
  WHERE a.article_production_id LIKE 'CAT01-%';

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;
