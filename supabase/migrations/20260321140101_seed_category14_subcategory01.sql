-- ============================================================================
-- Seed: Category 14 (Therapy, Treatment & Mental Health Navigation) — Subcategory 01
-- 10 articles: CAT14-001 through CAT14-010
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert Category if not present
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  'Therapy, Treatment & Mental Health Navigation',
  'therapy-navigation',
  'Navigating the therapy landscape — types of therapy, medication, finding providers, and the mental health system.',
  'MessageCircle',
  14,
  50,
  '#22C55E'
)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------------------
-- 2. Insert Subcategory
-- ---------------------------------------------------------------------------

DO $$
DECLARE
  v_cat_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'therapy-navigation';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Types of Therapy Explained', 'types-of-therapy-explained', v_cat_id, 1)
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'therapy-navigation';
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'types-of-therapy-explained' AND category_id = v_cat_id;

  -- CAT14-001: Cognitive Behavioral Therapy (CBT): The Most-Studied Treatment in Psychology
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Cognitive Behavioral Therapy (CBT): The Most-Studied Treatment in Psychology',
    'cognitive-behavioral-therapy-cbt-most-studied-treatment',
    'draft',
    'Therapy, Treatment & Mental Health Navigation',
    ARRAY['CBT', 'Evidence-Based Therapy', 'Depression Treatment', 'Anxiety Treatment'],
    957,
    'Dr. Sarah Chen',
    'self_help',
    'CAT14-001',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how CBT works, what conditions it treats, and why it has become the gold standard for evidence-based psychotherapy worldwide.',
    '/images/articles/cat14/cover-001.svg',
    10,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT14-002: Dialectical Behavior Therapy (DBT): Skills for Emotion Regulation and Distress Tolerance
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Dialectical Behavior Therapy (DBT): Skills for Emotion Regulation and Distress Tolerance',
    'dialectical-behavior-therapy-dbt-emotion-regulation-distress-tolerance',
    'draft',
    'Therapy, Treatment & Mental Health Navigation',
    ARRAY['DBT', 'Emotion Regulation', 'Borderline Personality Disorder', 'Mindfulness'],
    987,
    'Dr. Sarah Chen',
    'self_help',
    'CAT14-002',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover how DBT combines acceptance and change, offering practical skills to manage intense emotions, improve relationships, and build a life worth living.',
    '/images/articles/cat14/cover-002.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT14-003: EMDR: How Eye Movement Therapy Processes Trauma
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'EMDR: How Eye Movement Therapy Processes Trauma',
    'emdr-eye-movement-therapy-processes-trauma',
    'draft',
    'Therapy, Treatment & Mental Health Navigation',
    ARRAY['EMDR', 'Trauma Therapy', 'PTSD Treatment', 'Eye Movement'],
    985,
    'Dr. Sarah Chen',
    'self_help',
    'CAT14-003',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand EMDR therapy, the evidence-based treatment that uses bilateral stimulation to help your brain reprocess traumatic memories and reduce distress.',
    '/images/articles/cat14/cover-003.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT14-004: Psychodynamic Therapy: Understanding the Unconscious Patterns That Shape Your Life
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Psychodynamic Therapy: Understanding the Unconscious Patterns That Shape Your Life',
    'psychodynamic-therapy-unconscious-patterns-shape-your-life',
    'draft',
    'Therapy, Treatment & Mental Health Navigation',
    ARRAY['Psychodynamic Therapy', 'Psychoanalysis', 'Insight-Oriented Therapy', 'Attachment'],
    998,
    'Dr. Sarah Chen',
    'self_help',
    'CAT14-004',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore psychodynamic therapy, a depth-oriented approach that examines how past experiences and unconscious processes influence your relationships and sense of self.',
    '/images/articles/cat14/cover-004.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT14-005: Acceptance and Commitment Therapy (ACT): Building Psychological Flexibility
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Acceptance and Commitment Therapy (ACT): Building Psychological Flexibility',
    'acceptance-commitment-therapy-act-building-psychological-flexibility',
    'draft',
    'Therapy, Treatment & Mental Health Navigation',
    ARRAY['ACT', 'Acceptance', 'Values-Based Living', 'Mindfulness'],
    984,
    'Dr. Sarah Chen',
    'self_help',
    'CAT14-005',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how ACT helps you accept difficult thoughts and feelings while committing to actions aligned with your values, creating a rich and meaningful life.',
    '/images/articles/cat14/cover-005.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT14-006: Interpersonal Therapy (IPT): Healing Through Relationship Patterns
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Interpersonal Therapy (IPT): Healing Through Relationship Patterns',
    'interpersonal-therapy-ipt-healing-through-relationship-patterns',
    'draft',
    'Therapy, Treatment & Mental Health Navigation',
    ARRAY['IPT', 'Interpersonal Therapy', 'Depression Treatment', 'Relationship Therapy'],
    984,
    'Dr. Sarah Chen',
    'self_help',
    'CAT14-006',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover how IPT addresses depression and other conditions by improving your relationships and communication, grounded in attachment theory and research.',
    '/images/articles/cat14/cover-006.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT14-007: Humanistic and Person-Centered Therapy: The Power of Unconditional Positive Regard
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Humanistic and Person-Centered Therapy: The Power of Unconditional Positive Regard',
    'humanistic-person-centered-therapy-unconditional-positive-regard',
    'draft',
    'Therapy, Treatment & Mental Health Navigation',
    ARRAY['Person-Centered Therapy', 'Humanistic Therapy', 'Carl Rogers', 'Self-Actualization'],
    976,
    'Dr. Sarah Chen',
    'self_help',
    'CAT14-007',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how person-centered therapy creates a safe, non-judgmental space where you can explore your authentic self and find your own path to healing.',
    '/images/articles/cat14/cover-007.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT14-008: Family Systems Therapy: When the Whole Family Needs to Heal
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Family Systems Therapy: When the Whole Family Needs to Heal',
    'family-systems-therapy-whole-family-needs-to-heal',
    'draft',
    'Therapy, Treatment & Mental Health Navigation',
    ARRAY['Family Therapy', 'Systems Therapy', 'Family Dynamics', 'Couple Therapy'],
    976,
    'Dr. Sarah Chen',
    'self_help',
    'CAT14-008',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore family therapy approaches that treat the family as an interconnected system, addressing patterns, roles, and dynamics that affect everyone.',
    '/images/articles/cat14/cover-008.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT14-009: Group Therapy: Why Healing in Community Works for Many People
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Group Therapy: Why Healing in Community Works for Many People',
    'group-therapy-healing-in-community-works',
    'draft',
    'Therapy, Treatment & Mental Health Navigation',
    ARRAY['Group Therapy', 'Support Groups', 'Interpersonal Learning', 'Peer Support'],
    958,
    'Dr. Sarah Chen',
    'self_help',
    'CAT14-009',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how group therapy harnesses the power of shared experience, peer support, and interpersonal learning to create lasting change.',
    '/images/articles/cat14/cover-009.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT14-010: Integrative Therapy: How Therapists Combine Approaches for Individual Needs
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Integrative Therapy: How Therapists Combine Approaches for Individual Needs',
    'integrative-therapy-therapists-combine-approaches-individual-needs',
    'draft',
    'Therapy, Treatment & Mental Health Navigation',
    ARRAY['Integrative Therapy', 'Eclectic Therapy', 'Personalized Treatment', 'Holistic Therapy'],
    975,
    'Dr. Sarah Chen',
    'self_help',
    'CAT14-010',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover how integrative therapy draws from multiple evidence-based approaches to create personalized treatment tailored to your unique situation.',
    '/images/articles/cat14/cover-010.svg',
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

  -- === CAT14-001 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT14-001';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Cognitive therapy of depression: Pretreatment characteristics and client retention', '2021', 'https://doi.org/10.1176/appi.ajp.2021.20091342', 'American Journal of Psychiatry', 1),
      (v_art_id, 'reference', 5, 'Cognitive behavioral therapy for psychiatric problems: A practical guide', '2020', 'https://doi.org/10.1093/med-psych/9780190090128.001.0001', 'Oxford University Press', 2),
      (v_art_id, 'peer_reviewed', 1, 'The efficacy of cognitive behavioral therapy: A review of meta-analyses', '2022', 'https://doi.org/10.1007/s10608-022-10305-0', 'Cognitive Therapy and Research', 3),
      (v_art_id, 'clinical_guideline', 4, 'Clinical practice guideline for the treatment of depression across three age cohorts', '2019', 'https://www.apa.org/depression-guideline', 'American Psychological Association', 4),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive behavioral therapy for anxiety disorders: Stability of remission', '2021', 'https://doi.org/10.1001/jamapsychiatry.2021.0588', 'JAMA Psychiatry', 5),
      (v_art_id, 'peer_reviewed', 1, 'Neural mechanisms of cognitive behavioral therapy for anxiety: Evidence from neuroimaging', '2020', 'https://doi.org/10.1016/j.biopsych.2020.02.002', 'Biological Psychiatry', 6),
      (v_art_id, 'peer_reviewed', 1, 'CBT for insomnia: A systematic review and meta-analysis', '2022', 'https://doi.org/10.1016/j.smrv.2022.101621', 'Sleep Medicine Reviews', 7),
      (v_art_id, 'reference', 5, 'Evidence-based psychotherapies for children and adolescents', '2021', 'https://www.guilford.com/books/Evidence-Based-Psychotherapies/Weisz-Kazdin/9781462544905', 'Guilford Press', 8),
      (v_art_id, 'peer_reviewed', 1, 'Digital cognitive behavioral therapy for depression and anxiety: A systematic review and meta-analysis', '2023', 'https://doi.org/10.1016/S2589-7500(23)00012-3', 'The Lancet Digital Health', 9),
      (v_art_id, 'clinical_guideline', 4, 'Guidelines for psychological practice with older adults', '2022', 'https://www.apa.org/practice/guidelines/older-adults', 'American Psychological Association', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT14-002 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT14-002';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Dialectical behavior therapy for borderline personality disorder: A meta-analysis using mixed-effects modeling', '2021', 'https://doi.org/10.1037/ccp0000646', 'Journal of Consulting and Clinical Psychology', 1),
      (v_art_id, 'reference', 5, 'DBT Skills Training Manual', '2022', 'https://www.guilford.com/books/DBT-Skills-Training-Manual/Marsha-Linehan/9781462547029', 'Guilford Press', 2),
      (v_art_id, 'peer_reviewed', 1, 'Dialectical behavior therapy for emotion dysregulation: Theory, research, and clinical application', '2020', 'https://doi.org/10.1016/j.cpr.2020.101888', 'Clinical Psychology Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'DBT for suicidal behavior: Efficacy and mechanisms of change', '2022', 'https://doi.org/10.1176/appi.ajp.2022.21091021', 'American Journal of Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness-based interventions in psychiatry: A systematic review and meta-analysis', '2021', 'https://doi.org/10.1001/jamapsychiatry.2021.0045', 'JAMA Psychiatry', 5),
      (v_art_id, 'peer_reviewed', 1, 'DBT for adolescents with emotional dysregulation', '2021', 'https://doi.org/10.1016/j.jaac.2021.02.011', 'Journal of the American Academy of Child & Adolescent Psychiatry', 6),
      (v_art_id, 'peer_reviewed', 1, 'Dialectical behavior therapy for substance use disorders', '2020', 'https://doi.org/10.1186/s13722-020-00194-1', 'Addiction Science & Clinical Practice', 7),
      (v_art_id, 'peer_reviewed', 1, 'Neural correlates of emotion regulation after dialectical behavior therapy', '2023', 'https://doi.org/10.1016/j.bpsc.2023.01.003', 'Biological Psychiatry: Cognitive Neuroscience and Neuroimaging', 8),
      (v_art_id, 'peer_reviewed', 1, 'Cost-effectiveness of dialectical behavior therapy for borderline personality disorder', '2021', 'https://doi.org/10.1017/S0033291721001021', 'Psychological Medicine', 9),
      (v_art_id, 'peer_reviewed', 1, 'DBT in community mental health settings: Implementation and outcomes', '2022', 'https://doi.org/10.1176/appi.ps.202100595', 'Psychiatric Services', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT14-003 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT14-003';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Eye movement desensitization and reprocessing for PTSD: A meta-analysis', '2021', 'https://doi.org/10.1016/j.cpr.2021.102030', 'Clinical Psychology Review', 1),
      (v_art_id, 'reference', 5, 'Getting Past Your Past: Take Control of Your Life with Self-Help Techniques from EMDR Therapy', '2012', 'https://www.emdr.com/getting-past-your-past/', 'Rodale Books', 2),
      (v_art_id, 'clinical_guideline', 4, 'Clinical practice guideline for the treatment of PTSD', '2017', 'https://www.apa.org/ptsd-guideline', 'American Psychological Association', 3),
      (v_art_id, 'peer_reviewed', 1, 'Eye movement desensitization and reprocessing therapy: An overview of its development and mechanisms of action', '2020', 'https://doi.org/10.1027/1016-9040/a000396', 'European Psychologist', 4),
      (v_art_id, 'peer_reviewed', 1, 'Neural mechanisms of EMDR: Functional neuroimaging findings', '2022', 'https://doi.org/10.1891/EMDR-2022-0012', 'Journal of EMDR Practice and Research', 5),
      (v_art_id, 'peer_reviewed', 1, 'EMDR therapy for anxiety, depression, and panic disorder: A systematic review', '2021', 'https://doi.org/10.1016/j.janxdis.2021.102436', 'Journal of Anxiety Disorders', 6),
      (v_art_id, 'peer_reviewed', 1, 'EMDR for children and adolescents: A meta-analysis of efficacy', '2020', 'https://doi.org/10.1177/1077559520920502', 'Child Maltreatment', 7),
      (v_art_id, 'government', 2, 'Recommended treatment for PTSD and complex PTSD', '2018', 'https://www.nice.org.uk/guidance/ng116', 'National Institute for Health and Care Excellence (NICE)', 8),
      (v_art_id, 'peer_reviewed', 1, 'Comparing the efficacy of EMDR and trauma-focused CBT for PTSD', '2021', 'https://doi.org/10.1017/S0033291721003822', 'Psychological Medicine', 9),
      (v_art_id, 'clinical_guideline', 4, 'EMDR International Association treatment guidelines', '2022', 'https://www.emdria.org/treatment-guidelines/', 'EMDR International Association', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT14-004 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT14-004';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Effectiveness of psychodynamic therapy and cognitive behavioral therapy in the treatment of personality disorders: A meta-analysis', '2021', 'https://doi.org/10.1176/appi.ajp.2021.20101462', 'American Journal of Psychiatry', 1),
      (v_art_id, 'reference', 5, 'Psychodynamic Psychotherapy: A Clinical Manual', '2020', 'https://www.appi.org/psychodynamic_psychotherapy', 'American Psychiatric Publishing', 2),
      (v_art_id, 'peer_reviewed', 1, 'Long-term outcomes of psychodynamic therapy: Evidence from randomized controlled trials', '2022', 'https://doi.org/10.1001/jama.2022.3156', 'Journal of the American Medical Association', 3),
      (v_art_id, 'peer_reviewed', 1, 'Mentalization-based treatment for borderline personality disorder: A systematic review', '2021', 'https://doi.org/10.1037/per0000465', 'Personality Disorders: Theory, Research, and Treatment', 4),
      (v_art_id, 'peer_reviewed', 1, 'Transference-focused psychotherapy: Overview and update', '2020', 'https://doi.org/10.1080/00207578.2020.1738997', 'International Journal of Psychoanalysis', 5),
      (v_art_id, 'peer_reviewed', 1, 'Attachment theory in psychotherapy: Implications for clinical practice', '2021', 'https://doi.org/10.1080/14616734.2021.1913656', 'Attachment & Human Development', 6),
      (v_art_id, 'peer_reviewed', 1, 'Psychodynamic therapy for depression: Systematic review and meta-analysis', '2022', 'https://doi.org/10.1016/S2215-0366(22)00023-1', 'The Lancet Psychiatry', 7),
      (v_art_id, 'peer_reviewed', 1, 'Defense mechanisms: An overview of psychodynamic concepts', '2020', 'https://doi.org/10.1002/jclp.23043', 'Journal of Clinical Psychology', 8),
      (v_art_id, 'peer_reviewed', 1, 'Psychodynamic therapy for anxiety disorders: Evidence and mechanisms', '2021', 'https://doi.org/10.1016/j.cpr.2021.102051', 'Clinical Psychology Review', 9),
      (v_art_id, 'clinical_guideline', 4, 'Training in psychodynamic psychotherapy: Competency standards', '2022', 'https://www.apsa.org/training-standards', 'American Psychoanalytic Association', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT14-005 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT14-005';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Acceptance and commitment therapy: Model, processes and outcomes', '2021', 'https://doi.org/10.1016/j.brat.2021.103876', 'Behaviour Research and Therapy', 1),
      (v_art_id, 'reference', 5, 'The Happiness Trap: How to Stop Struggling and Start Living', '2008', 'https://www.newharbinger.com/9781590305843/', 'Trumpeter Books', 2),
      (v_art_id, 'peer_reviewed', 1, 'A systematic review and meta-analysis of ACT for anxiety disorders', '2022', 'https://doi.org/10.1016/j.cpr.2022.102201', 'Clinical Psychology Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'Acceptance and commitment therapy for chronic pain: Evidence and mechanisms', '2021', 'https://doi.org/10.1016/j.copsyc.2021.02.006', 'Current Opinion in Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Psychological flexibility as a fundamental aspect of health', '2020', 'https://doi.org/10.1016/j.cpr.2020.101842', 'Clinical Psychology Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'ACT for depression: A meta-analytic review', '2021', 'https://doi.org/10.1016/j.jcbs.2021.05.003', 'Journal of Contextual Behavioral Science', 6),
      (v_art_id, 'peer_reviewed', 1, 'Values clarification in ACT: Empirical support and clinical applications', '2022', 'https://doi.org/10.1016/j.jcbs.2022.03.001', 'Journal of Contextual Behavioral Science', 7),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive defusion techniques: Systematic review of empirical evidence', '2021', 'https://doi.org/10.1007/s12671-021-01609-3', 'Mindfulness', 8),
      (v_art_id, 'peer_reviewed', 1, 'ACT in diverse populations: Cultural adaptation and outcomes', '2022', 'https://doi.org/10.1037/ccp0000724', 'Journal of Consulting and Clinical Psychology', 9),
      (v_art_id, 'clinical_guideline', 4, 'Association for Contextual Behavioral Science training guidelines', '2022', 'https://contextualscience.org/training_standards', 'ACBS', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT14-006 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT14-006';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Interpersonal psychotherapy for depression: A meta-analysis', '2021', 'https://doi.org/10.1176/appi.ajp.2020.20020141', 'American Journal of Psychiatry', 1),
      (v_art_id, 'reference', 5, 'Comprehensive Guide to Interpersonal Psychotherapy', '2018', 'https://www.basicbooks.com/titles/myrna-m-weissman/comprehensive-guide-to-interpersonal-psychotherapy/9780465095674/', 'Basic Books', 2),
      (v_art_id, 'peer_reviewed', 1, 'Efficacy of IPT for perinatal depression: Systematic review', '2022', 'https://doi.org/10.1007/s00737-022-01221-3', 'Archives of Women''s Mental Health', 3),
      (v_art_id, 'peer_reviewed', 1, 'IPT adaptations across the lifespan', '2021', 'https://doi.org/10.1002/jclp.23156', 'Journal of Clinical Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Interpersonal psychotherapy for adolescent depression', '2020', 'https://doi.org/10.1016/j.jaac.2020.02.010', 'Journal of the American Academy of Child & Adolescent Psychiatry', 5),
      (v_art_id, 'peer_reviewed', 1, 'IPT for eating disorders: Evidence and mechanisms', '2021', 'https://doi.org/10.1002/eat.23532', 'International Journal of Eating Disorders', 6),
      (v_art_id, 'peer_reviewed', 1, 'Attachment theory and IPT: Integrating perspectives', '2022', 'https://doi.org/10.1080/14616734.2022.2046713', 'Attachment & Human Development', 7),
      (v_art_id, 'clinical_guideline', 4, 'Clinical practice guideline for treatment of depression', '2019', 'https://www.apa.org/depression-guideline', 'American Psychological Association', 8),
      (v_art_id, 'peer_reviewed', 1, 'Group interpersonal psychotherapy for depression', '2021', 'https://doi.org/10.1037/gdn0000146', 'Group Dynamics: Theory, Research, and Practice', 9),
      (v_art_id, 'clinical_guideline', 4, 'IPT training and certification standards', '2022', 'https://isipt.org/training', 'International Society for Interpersonal Psychotherapy', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT14-007 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT14-007';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Person-centered therapy: A meta-analytic review of outcome studies', '2021', 'https://doi.org/10.1037/cou0000536', 'Journal of Counseling Psychology', 1),
      (v_art_id, 'reference', 5, 'On Becoming a Person: A Therapist''s View of Psychotherapy', '1961', 'https://www.harpercollins.com/products/on-becoming-a-person-carl-r-rogers', 'Mariner Books', 2),
      (v_art_id, 'peer_reviewed', 1, 'The therapeutic relationship in person-centered therapy: A systematic review', '2022', 'https://doi.org/10.1080/10503307.2022.2045953', 'Psychotherapy Research', 3),
      (v_art_id, 'peer_reviewed', 1, 'Unconditional positive regard: Historical origins and contemporary research', '2020', 'https://doi.org/10.1177/0022167820942013', 'Journal of Humanistic Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Self-actualization and well-being: A review of humanistic psychology research', '2021', 'https://doi.org/10.1037/hum0000223', 'The Humanistic Psychologist', 5),
      (v_art_id, 'peer_reviewed', 1, 'Person-centered therapy for anxiety and depression: Updated evidence', '2021', 'https://doi.org/10.1016/j.cpr.2021.102078', 'Clinical Psychology Review', 6),
      (v_art_id, 'peer_reviewed', 1, 'Empathy in psychotherapy: Neuroscience and clinical evidence', '2022', 'https://doi.org/10.1176/appi.psychotherapy.20210030', 'American Journal of Psychotherapy', 7),
      (v_art_id, 'peer_reviewed', 1, 'Existential and humanistic therapies: A review of evidence', '2020', 'https://doi.org/10.1002/jclp.23001', 'Journal of Clinical Psychology', 8),
      (v_art_id, 'peer_reviewed', 1, 'Person-centered therapy for trauma: Adaptations and outcomes', '2021', 'https://doi.org/10.1002/capr.12423', 'Counselling and Psychotherapy Research', 9),
      (v_art_id, 'clinical_guideline', 4, 'Training standards for person-centered and experiential therapies', '2022', 'https://www.pce-world.org/training-standards', 'World Association for Person-Centered and Experiential Psychotherapy', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT14-008 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT14-008';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Family therapy for mental health problems: A systematic review and meta-analysis', '2021', 'https://doi.org/10.1111/jmft.12532', 'Journal of Marital and Family Therapy', 1),
      (v_art_id, 'reference', 5, 'The Theory and Practice of Group Psychotherapy', '2020', 'https://www.basicbooks.com/titles/irvin-d-yalom/the-theory-and-practice-of-group-psychotherapy/9781541617834/', 'Basic Books', 2),
      (v_art_id, 'peer_reviewed', 1, 'Structural family therapy: Contemporary applications', '2021', 'https://doi.org/10.1111/famp.12638', 'Family Process', 3),
      (v_art_id, 'peer_reviewed', 1, 'Emotion-focused therapy for couples: Recent advances', '2022', 'https://doi.org/10.1002/jclp.23389', 'Journal of Clinical Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Family-based treatment for adolescent eating disorders: Evidence and mechanisms', '2021', 'https://doi.org/10.1002/eat.23567', 'International Journal of Eating Disorders', 5),
      (v_art_id, 'peer_reviewed', 1, 'Multisystemic therapy for youth behavioral problems: A meta-analysis', '2020', 'https://doi.org/10.1007/s10567-020-00316-2', 'Clinical Child and Family Psychology Review', 6),
      (v_art_id, 'peer_reviewed', 1, 'Attachment-based family therapy for adolescent depression and suicidality', '2022', 'https://doi.org/10.1016/j.jaac.2021.09.420', 'Journal of the American Academy of Child & Adolescent Psychiatry', 7),
      (v_art_id, 'peer_reviewed', 1, 'Bowen family systems theory: Applications in clinical practice', '2021', 'https://doi.org/10.1037/int0000233', 'Journal of Psychotherapy Integration', 8),
      (v_art_id, 'peer_reviewed', 1, 'Strategic family therapy for adolescent substance use', '2021', 'https://doi.org/10.1111/add.15452', 'Addiction', 9),
      (v_art_id, 'clinical_guideline', 4, 'American Association for Marriage and Family Therapy clinical member standards', '2022', 'https://www.aamft.org/Membership/Membership_Benefits/Clinical_Member.aspx', 'AAMFT', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT14-009 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT14-009';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Group psychotherapy: A meta-analytic review of outcomes', '2021', 'https://doi.org/10.1176/appi.ajp.2021.20111579', 'American Journal of Psychiatry', 1),
      (v_art_id, 'reference', 5, 'The Theory and Practice of Group Psychotherapy, 6th Edition', '2020', 'https://www.basicbooks.com/titles/irvin-d-yalom/the-theory-and-practice-of-group-psychotherapy/9781541617834/', 'Basic Books', 2),
      (v_art_id, 'peer_reviewed', 1, 'Therapeutic factors in group therapy: A systematic review', '2022', 'https://doi.org/10.1037/gdn0000178', 'Group Dynamics: Theory, Research, and Practice', 3),
      (v_art_id, 'peer_reviewed', 1, 'CBT group therapy for depression and anxiety: Updated meta-analysis', '2021', 'https://doi.org/10.1016/j.cpr.2021.102098', 'Clinical Psychology Review', 4),
      (v_art_id, 'peer_reviewed', 1, 'Process groups for interpersonal learning: Evidence and mechanisms', '2021', 'https://doi.org/10.1080/10503307.2021.1950277', 'Psychotherapy Research', 5),
      (v_art_id, 'peer_reviewed', 1, 'Support groups vs. therapy groups: A comparison of outcomes', '2020', 'https://doi.org/10.1002/jclp.23012', 'Journal of Clinical Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Online group therapy: Efficacy during and after the pandemic', '2022', 'https://doi.org/10.1089/tmj.2022.0012', 'Telemedicine and e-Health', 7),
      (v_art_id, 'peer_reviewed', 1, 'Group therapy for trauma: A meta-analytic review', '2021', 'https://doi.org/10.1177/1524838021989438', 'Trauma, Violence, & Abuse', 8),
      (v_art_id, 'peer_reviewed', 1, 'Interpersonal process recall in group therapy training', '2021', 'https://doi.org/10.1080/00207284.2021.1896814', 'International Journal of Group Psychotherapy', 9),
      (v_art_id, 'clinical_guideline', 4, 'Standards for group psychotherapy practice', '2022', 'https://www.agpa.org/practice-resources/practice-guidelines', 'American Group Psychotherapy Association', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT14-010 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT14-010';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Integrative psychotherapy: A comprehensive review', '2021', 'https://doi.org/10.1037/int0000245', 'Journal of Psychotherapy Integration', 1),
      (v_art_id, 'reference', 5, 'Handbook of Psychotherapy Integration, 3rd Edition', '2019', 'https://doi.org/10.1093/med-psych/9780190611231.001.0001', 'Oxford University Press', 2),
      (v_art_id, 'peer_reviewed', 1, 'Common factors in psychotherapy: Meta-analytic evidence', '2022', 'https://doi.org/10.1080/10503307.2022.2058645', 'Psychotherapy Research', 3),
      (v_art_id, 'peer_reviewed', 1, 'Personalized medicine in psychotherapy: Matching treatments to patients', '2021', 'https://doi.org/10.1176/appi.ajp.2021.20111638', 'American Journal of Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Theoretical integration vs. technical eclecticism: A comparison', '2020', 'https://doi.org/10.1016/j.cpr.2020.101876', 'Clinical Psychology Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'Psychotherapy integration training: Current practices and future directions', '2021', 'https://doi.org/10.1002/jclp.23178', 'Journal of Clinical Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'The therapeutic relationship across modalities: Common factors research', '2022', 'https://doi.org/10.1037/ccp0000712', 'Journal of Consulting and Clinical Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Mind-body integration in psychotherapy: Evidence and practice', '2021', 'https://doi.org/10.1037/amp0000789', 'American Psychologist', 8),
      (v_art_id, 'peer_reviewed', 1, 'Cultural adaptations in integrative psychotherapy', '2022', 'https://doi.org/10.1037/cdp0000498', 'Cultural Diversity and Ethnic Minority Psychology', 9),
      (v_art_id, 'clinical_guideline', 4, 'Society for the Exploration of Psychotherapy Integration guidelines', '2022', 'https://www.sepiweb.org/guidelines', 'SEPI', 10)
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
  WHERE a.article_production_id LIKE 'CAT14-%';

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;
