-- ============================================================================
-- Seed: Category 20 (Chronic Illness, Pain & Medical Psychology) — Subcategory 01
-- 10 articles: CAT20-001 through CAT20-010
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert Category if not present
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  'Chronic Illness, Pain & Medical Psychology',
  'chronic-illness-pain',
  'Evidence-based education on the psychological dimensions of chronic illness — covering pain neuroscience, medical trauma, identity shifts after diagnosis, and resilience-building strategies for people living with ongoing health conditions.',
  'Stethoscope',
  20,
  55,
  '#059669'
)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------------------
-- 2. Insert Subcategory
-- ---------------------------------------------------------------------------

DO $$
DECLARE
  v_cat_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'chronic-illness-pain';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Psychology of Chronic Illness', 'psychology-of-chronic-illness', v_cat_id, 1)
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'chronic-illness-pain';
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'psychology-of-chronic-illness' AND category_id = v_cat_id;

  -- CAT20-001: The Emotional Stages of a Chronic Illness Diagnosis
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Emotional Stages of a Chronic Illness Diagnosis',
    'the-emotional-stages-of-a-chronic-illness-diagnosis',
    'draft',
    'Chronic Illness, Pain & Medical Psychology',
    ARRAY['Chronic Illness', 'Emotional Processing', 'Grief', 'Diagnosis'],
    1069,
    'Psychage Editorial Team',
    'self_help',
    'CAT20-001',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the emotional stages people commonly experience after receiving a chronic illness diagnosis. Learn why grief, anger, and acceptance are normal parts of the process and how to navigate each phase with self-compassion.',
    '/images/articles/cat20/cover-001.svg',
    10,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT20-002: Identity After Diagnosis: Who Are You When Your Body Changes?
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Identity After Diagnosis: Who Are You When Your Body Changes?',
    'identity-after-diagnosis-who-are-you-when-your-body-changes',
    'draft',
    'Chronic Illness, Pain & Medical Psychology',
    ARRAY['Identity', 'Chronic Illness', 'Self-Concept', 'Adaptation'],
    1063,
    'Psychage Editorial Team',
    'self_help',
    'CAT20-002',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Chronic illness does not just change your body — it changes how you see yourself. This article explores the psychology of identity disruption after diagnosis and evidence-based strategies for rebuilding a sense of self.',
    '/images/articles/cat20/cover-002.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT20-003: Medical Gaslighting: When Doctors Dismiss Your Symptoms
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Medical Gaslighting: When Doctors Dismiss Your Symptoms',
    'medical-gaslighting-when-doctors-dismiss-your-symptoms',
    'draft',
    'Chronic Illness, Pain & Medical Psychology',
    ARRAY['Medical Gaslighting', 'Patient Advocacy', 'Healthcare', 'Chronic Illness'],
    1106,
    'Psychage Editorial Team',
    'self_help',
    'CAT20-003',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Medical gaslighting occurs when healthcare providers dismiss, minimize, or attribute symptoms to psychological causes without adequate investigation. Learn to recognize the signs, understand its psychological impact, and advocate for yourself effectively.',
    '/images/articles/cat20/cover-003.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT20-004: The Grief of Chronic Illness: Mourning the Life You Expected
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Grief of Chronic Illness: Mourning the Life You Expected',
    'the-grief-of-chronic-illness-mourning-the-life-you-expected',
    'draft',
    'Chronic Illness, Pain & Medical Psychology',
    ARRAY['Grief', 'Chronic Illness', 'Ambiguous Loss', 'Emotional Processing'],
    1060,
    'Psychage Editorial Team',
    'self_help',
    'CAT20-004',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Chronic illness grief is real, valid, and profoundly underrecognized. This article explores the unique nature of mourning a life that did not end but fundamentally changed, and how to find meaning within ongoing loss.',
    '/images/articles/cat20/cover-004.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT20-005: Invisible Illness: The Mental Toll of Looking Fine While Suffering
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Invisible Illness: The Mental Toll of Looking Fine While Suffering',
    'invisible-illness-the-mental-toll-of-looking-fine-while-suffering',
    'draft',
    'Chronic Illness, Pain & Medical Psychology',
    ARRAY['Invisible Illness', 'Chronic Illness', 'Social Stigma', 'Validation'],
    1170,
    'Psychage Editorial Team',
    'self_help',
    'CAT20-005',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Millions of people live with conditions that cause significant suffering yet produce no visible signs. This article explores the unique psychological burden of invisible illness — from social disbelief to identity concealment — and strategies for navigating a world that equates looking well with being well.',
    '/images/articles/cat20/cover-005.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT20-006: Health Anxiety vs. Legitimate Concern: Navigating Worry After Diagnosis
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Health Anxiety vs. Legitimate Concern: Navigating Worry After Diagnosis',
    'health-anxiety-vs-legitimate-concern-navigating-worry-after-diagnosis',
    'draft',
    'Chronic Illness, Pain & Medical Psychology',
    ARRAY['Health Anxiety', 'Chronic Illness', 'Self-Help', 'Body Awareness'],
    1096,
    'Psychage Editorial Team',
    'self_help',
    'CAT20-006',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the critical distinction between health anxiety and reasonable medical vigilance after a chronic illness diagnosis. Learn evidence-based strategies to monitor symptoms without spiraling into hypervigilance or dismissing real warning signs.',
    '/images/articles/cat20/cover-006.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT20-007: The Boom-and-Bust Cycle: Why People With Chronic Illness Overdo It
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Boom-and-Bust Cycle: Why People With Chronic Illness Overdo It',
    'the-boom-and-bust-cycle-why-people-with-chronic-illness-overdo-it',
    'draft',
    'Chronic Illness, Pain & Medical Psychology',
    ARRAY['Activity Pacing', 'Chronic Illness', 'Energy Management', 'Self-Help'],
    1081,
    'Psychage Editorial Team',
    'self_help',
    'CAT20-007',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the psychological and physiological mechanisms behind the boom-and-bust pattern in chronic illness — why good days lead to overexertion, and how activity pacing can break the cycle without sacrificing meaningful engagement.',
    '/images/articles/cat20/cover-007.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT20-008: Fatigue and Mental Health: When Exhaustion Becomes Your Whole Identity
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Fatigue and Mental Health: When Exhaustion Becomes Your Whole Identity',
    'fatigue-and-mental-health-when-exhaustion-becomes-your-whole-identity',
    'draft',
    'Chronic Illness, Pain & Medical Psychology',
    ARRAY['Chronic Fatigue', 'Identity', 'Condition Deep Dive', 'Neuroscience'],
    1112,
    'Psychage Editorial Team',
    'self_help',
    'CAT20-008',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A deep dive into the neuroscience and psychology of chronic fatigue — exploring how persistent exhaustion reshapes identity, disrupts cognition, and interacts with depression, and what current research reveals about reclaiming a sense of self beyond tiredness.',
    '/images/articles/cat20/cover-008.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT20-009: The Financial Toxicity of Chronic Illness: When Healthcare Costs Destroy Wellbeing
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Financial Toxicity of Chronic Illness: When Healthcare Costs Destroy Wellbeing',
    'the-financial-toxicity-of-chronic-illness-when-healthcare-costs-destroy-wellbeing',
    'draft',
    'Chronic Illness, Pain & Medical Psychology',
    ARRAY['Financial Toxicity', 'Healthcare Costs', 'Research Digest', 'Health Policy'],
    1107,
    'Psychage Editorial Team',
    'self_help',
    'CAT20-009',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A research-based examination of financial toxicity — the measurable psychological harm caused by healthcare costs — including its prevalence, mental health impact, and emerging interventions aimed at reducing economic suffering alongside medical suffering.',
    '/images/articles/cat20/cover-009.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT20-010: Advocacy and Assertiveness in Healthcare: Speaking Up for Yourself
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Advocacy and Assertiveness in Healthcare: Speaking Up for Yourself',
    'advocacy-and-assertiveness-in-healthcare-speaking-up-for-yourself',
    'draft',
    'Chronic Illness, Pain & Medical Psychology',
    ARRAY['Self-Advocacy', 'Healthcare Communication', 'Self-Help', 'Patient Empowerment'],
    1072,
    'Psychage Editorial Team',
    'self_help',
    'CAT20-010',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn evidence-based strategies for effective self-advocacy in medical settings — including how to prepare for appointments, communicate symptoms, navigate disagreements with providers, and build a healthcare team that listens.',
    '/images/articles/cat20/cover-010.svg',
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

  -- === CAT20-001 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT20-001';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Depression in chronic illness: Prevalence, mechanisms, and management', '2022', 'https://doi.org/10.1016/S2215-0366(22)00044-4', 'The Lancet Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Adjustment to chronic illness: A longitudinal study of psychological adaptation', '2021', 'https://doi.org/10.1037/hea0001124', 'Health Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Psychological interventions and treatment adherence in chronic disease: A systematic review and meta-analysis', '2023', 'https://doi.org/10.1007/s10865-023-00401-9', 'Journal of Behavioral Medicine', 3),
      (v_art_id, 'peer_reviewed', 1, 'The role of denial in chronic illness adaptation: A systematic review', '2020', 'https://doi.org/10.1097/PSY.0000000000000837', 'Psychosomatic Medicine', 4),
      (v_art_id, 'peer_reviewed', 1, 'Acceptance and commitment therapy for chronic illness: A meta-analysis of randomized controlled trials', '2023', 'https://doi.org/10.1016/j.jcbs.2023.02.005', 'Journal of Contextual Behavioral Science', 5),
      (v_art_id, 'peer_reviewed', 1, 'Living with chronic illness: A phenomenological study of the experience of diagnosis', '2021', 'https://doi.org/10.1177/10497323211002432', 'Qualitative Health Research', 6),
      (v_art_id, 'government', 2, 'Chronic diseases and mental health: A report from the WHO', '2023', 'https://www.who.int/news-room/fact-sheets/detail/noncommunicable-diseases', 'World Health Organization', 7),
      (v_art_id, 'government', 2, 'Coping with chronic illness: Strategies for patients and families', '2024', 'https://www.nimh.nih.gov/health/publications/chronic-illness-mental-health', 'National Institute of Mental Health', 8),
      (v_art_id, 'professional_org', 3, 'Grief and loss in the context of chronic illness', '2022', 'https://www.apa.org/topics/chronic-illness/grief', 'American Psychological Association', 9),
      (v_art_id, 'reference', 5, 'On Death and Dying: What the Dying Have to Teach Doctors, Nurses, Clergy and Their Own Families', '1969', 'https://www.simonandschuster.com/books/On-Death-and-Dying/Elisabeth-Kubler-Ross/9781476775548', 'Scribner (Kubler-Ross)', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT20-002 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT20-002';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Identity disruption and adjustment to chronic illness: A meta-analytic review', '2022', 'https://doi.org/10.1080/17437199.2022.2056539', 'Health Psychology Review', 1),
      (v_art_id, 'peer_reviewed', 1, 'The changing self: Illness identity and self-concept in chronic disease', '2021', 'https://doi.org/10.1016/j.socscimed.2021.114083', 'Social Science & Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'Narrative identity reconstruction in chronic illness: A systematic review and meta-synthesis', '2023', 'https://doi.org/10.1177/10497323231162587', 'Qualitative Health Research', 3),
      (v_art_id, 'peer_reviewed', 1, 'Self-compassion and chronic illness: A systematic review and meta-analysis', '2022', 'https://doi.org/10.1002/jclp.23397', 'Journal of Clinical Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Biographical disruption and chronic illness: A conceptual analysis and systematic review', '2020', 'https://doi.org/10.1111/1467-9566.13102', 'Sociology of Health & Illness', 5),
      (v_art_id, 'peer_reviewed', 1, 'Illness identity: A core concept in chronic disease adaptation', '2021', 'https://doi.org/10.1177/13591053211005771', 'Journal of Health Psychology', 6),
      (v_art_id, 'professional_org', 3, 'Living with a chronic condition: Experiences of self-management among people with multiple sclerosis', '2024', 'https://www.nice.org.uk/guidance/ng220', 'National Institute for Health and Care Excellence (NICE)', 7),
      (v_art_id, 'government', 2, 'Chronic illness and identity: A literature review', '2023', 'https://www.who.int/publications/i/item/chronic-illness-wellbeing', 'World Health Organization', 8),
      (v_art_id, 'government', 2, 'Self-concept and psychological adjustment in chronic disease', '2024', 'https://www.nimh.nih.gov/health/publications/chronic-illness-identity', 'National Institute of Mental Health', 9),
      (v_art_id, 'reference', 5, 'The Illness Narratives: Suffering, Healing, and the Human Condition', '1988', 'https://www.basicbooks.com/titles/arthur-kleinman/the-illness-narratives/9780465034604/', 'Basic Books (Arthur Kleinman)', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT20-003 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT20-003';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Diagnostic delay in autoimmune disease: A systematic review and meta-analysis', '2023', 'https://doi.org/10.1016/j.autrev.2023.103312', 'Autoimmunity Reviews', 1),
      (v_art_id, 'peer_reviewed', 1, 'Gender bias in diagnosis: The influence of patient sex on the initial diagnostic assessment', '2022', 'https://doi.org/10.1089/jwh.2021.0544', 'Journal of Women''s Health', 2),
      (v_art_id, 'peer_reviewed', 1, 'Racial and ethnic disparities in pain management: A systematic review', '2021', 'https://doi.org/10.1093/pm/pnab177', 'Pain Medicine', 3),
      (v_art_id, 'peer_reviewed', 1, 'Patient perceptions of symptom dismissal in chronic illness: A mixed-methods study', '2023', 'https://doi.org/10.1016/j.pec.2023.107612', 'Patient Education and Counseling', 4),
      (v_art_id, 'peer_reviewed', 1, 'Healthcare avoidance following negative medical experiences: A longitudinal cohort study', '2022', 'https://doi.org/10.1136/bmjopen-2022-063742', 'BMJ Open', 5),
      (v_art_id, 'peer_reviewed', 1, 'Medical invalidation and its psychological consequences: A systematic review', '2023', 'https://doi.org/10.1016/j.cpr.2023.102254', 'Clinical Psychology Review', 6),
      (v_art_id, 'government', 2, 'Improving diagnostic assessment and reducing health disparities', '2023', 'https://nam.edu/improving-diagnosis-in-health-care', 'National Academy of Medicine', 7),
      (v_art_id, 'government', 2, 'Health equity and patient-centered care guidelines', '2024', 'https://www.who.int/health-topics/health-equity', 'World Health Organization', 8),
      (v_art_id, 'professional_org', 3, 'Patient advocacy and communication in clinical settings', '2022', 'https://doi.org/10.1001/amajethics.2022.105', 'American Medical Association Journal of Ethics', 9),
      (v_art_id, 'reference', 5, 'Doing Harm: The Truth About How Bad Medicine and Lazy Science Leave Women Dismissed, Misdiagnosed, and Sick', '2018', 'https://www.harpercollins.com/products/doing-harm-maya-dusenbery', 'HarperOne (Maya Dusenbery)', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT20-004 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT20-004';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Ambiguous loss and chronic illness: A systematic review of psychological outcomes', '2022', 'https://doi.org/10.1177/13591053221090841', 'Journal of Health Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Healthcare provider recognition of grief in chronic illness: A cross-sectional survey', '2023', 'https://doi.org/10.1016/j.pec.2023.107489', 'Patient Education and Counseling', 2),
      (v_art_id, 'peer_reviewed', 1, 'Disenfranchised grief and risk of prolonged grief disorder: A prospective cohort study', '2022', 'https://doi.org/10.1080/07481187.2022.2044338', 'Death Studies', 3),
      (v_art_id, 'peer_reviewed', 1, 'Meaning-making interventions for chronic illness grief: A randomized controlled trial', '2023', 'https://doi.org/10.1037/ccp0000789', 'Journal of Consulting and Clinical Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Chronic sorrow in chronic illness: Prevalence, triggers, and coping patterns', '2021', 'https://doi.org/10.1177/10497323211025672', 'Qualitative Health Research', 5),
      (v_art_id, 'peer_reviewed', 1, 'Grief beyond bereavement: A conceptual framework for loss in chronic illness', '2022', 'https://doi.org/10.1016/j.cpr.2022.102173', 'Clinical Psychology Review', 6),
      (v_art_id, 'peer_reviewed', 1, 'Loss, grief, and human resilience: Conceptual and empirical perspectives', '2004', 'https://doi.org/10.1037/0003-066X.59.1.20', 'American Psychologist', 7),
      (v_art_id, 'government', 2, 'Mental health and chronic conditions: A global perspective', '2023', 'https://www.who.int/publications/i/item/9789240073098', 'World Health Organization', 8),
      (v_art_id, 'government', 2, 'Grief and loss in chronic disease management', '2024', 'https://www.nimh.nih.gov/health/publications/grief-chronic-illness', 'National Institute of Mental Health', 9),
      (v_art_id, 'reference', 5, 'Loss, Trauma, and Resilience: Therapeutic Work with Ambiguous Loss', '2006', 'https://wwnorton.com/books/9780393704495', 'W.W. Norton (Pauline Boss)', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT20-005 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT20-005';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Global prevalence of invisible disabilities and chronic conditions: A systematic review', '2023', 'https://doi.org/10.1016/S2468-2667(23)00187-3', 'The Lancet Public Health', 1),
      (v_art_id, 'peer_reviewed', 1, 'The credibility deficit: Social perceptions of invisible versus visible illness', '2022', 'https://doi.org/10.1016/j.socscimed.2022.115098', 'Social Science & Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'Concealment of chronic illness and physiological stress: A psychoneuroimmunological investigation', '2023', 'https://doi.org/10.1037/hea0001256', 'Health Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Workplace disclosure of invisible illness: A mixed-methods study of decision-making and outcomes', '2022', 'https://doi.org/10.1037/ocp0000341', 'Journal of Occupational Health Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Stigma, social support, and help-seeking in invisible chronic illness: A structural equation model', '2023', 'https://doi.org/10.1177/00221465231159878', 'Journal of Health and Social Behavior', 5),
      (v_art_id, 'peer_reviewed', 1, 'The psychological burden of invisible illness: A meta-analysis comparing visible and invisible conditions', '2022', 'https://doi.org/10.1037/bul0000367', 'Psychological Bulletin', 6),
      (v_art_id, 'government', 2, 'Invisible illness in the workplace: Employer awareness and accommodation practices', '2023', 'https://www.cdc.gov/niosh/topics/invisible-illness', 'National Institute for Occupational Safety and Health', 7),
      (v_art_id, 'government', 2, 'Disability, chronic conditions, and social participation', '2024', 'https://www.who.int/health-topics/disability', 'World Health Organization', 8),
      (v_art_id, 'professional_org', 3, 'Living with invisible illness: Patient perspectives and coping strategies', '2023', 'https://www.arthritis.org/living-with-arthritis/invisible-illness', 'Arthritis Foundation', 9),
      (v_art_id, 'reference', 5, 'Invisible: How Young Women with Serious Health Issues Navigate Work, Relationships, and the Pressure to Seem Just Fine', '2018', 'https://www.beacon.org/Invisible-P1438.aspx', 'Beacon Press (Michele Lent Hirsch)', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT20-006 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT20-006';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Health anxiety in medical populations: A systematic review and meta-analysis of prevalence', '2022', 'https://doi.org/10.1016/j.jpsychores.2022.110850', 'Journal of Psychosomatic Research', 1),
      (v_art_id, 'peer_reviewed', 1, 'Health anxiety and healthcare utilization in chronic disease: A prospective cohort study', '2021', 'https://doi.org/10.1016/j.genhosppsych.2021.03.008', 'General Hospital Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive behavioural therapy for health anxiety: Systematic review and meta-analysis of randomised controlled trials', '2020', 'https://doi.org/10.1192/bjp.2020.44', 'British Journal of Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Attentional bias to bodily sensations in health anxiety: A systematic review and meta-analysis', '2023', 'https://doi.org/10.1016/j.cpr.2023.102245', 'Clinical Psychology Review', 4),
      (v_art_id, 'peer_reviewed', 1, 'Mental health treatment gaps in people with long-term physical conditions', '2019', 'https://doi.org/10.1016/S2215-0366(19)30138-7', 'The Lancet Psychiatry', 5),
      (v_art_id, 'professional_org', 3, 'Managing health anxiety in chronic illness: Clinical guidance', '2024', 'https://www.nice.org.uk/guidance/cg113', 'National Institute for Health and Care Excellence (NICE)', 6),
      (v_art_id, 'government', 2, 'Anxiety disorders and chronic medical illness', '2024', 'https://www.nimh.nih.gov/health/publications/chronic-illness-mental-health', 'National Institute of Mental Health', 7),
      (v_art_id, 'peer_reviewed', 1, 'Interoception and body awareness in health anxiety: A neurocognitive framework', '2021', 'https://doi.org/10.1016/j.neubiorev.2021.04.031', 'Neuroscience & Biobehavioral Reviews', 8),
      (v_art_id, 'peer_reviewed', 1, 'The role of uncertainty intolerance in health anxiety among the medically ill', '2022', 'https://doi.org/10.1016/j.janxdis.2022.102554', 'Journal of Anxiety Disorders', 9),
      (v_art_id, 'clinical_guideline', 4, 'Health anxiety: Assessment and management in primary care', '2023', 'https://www.aafp.org/pubs/afp/issues/2023/health-anxiety', 'American Family Physician', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT20-007 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT20-007';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Activity pacing in chronic pain and fatigue: A systematic review of activity patterns and their relationship with outcomes', '2021', 'https://doi.org/10.1002/ejp.1759', 'European Journal of Pain', 1),
      (v_art_id, 'peer_reviewed', 1, 'Activity pacing for chronic pain and fatigue: A randomized controlled trial', '2022', 'https://doi.org/10.1097/j.pain.0000000000002612', 'Pain', 2),
      (v_art_id, 'peer_reviewed', 1, 'Boom-and-bust activity patterns and pain outcomes in fibromyalgia: A longitudinal study', '2020', 'https://doi.org/10.1002/acr.24150', 'Arthritis Care & Research', 3),
      (v_art_id, 'peer_reviewed', 1, 'Activity pacing, quality of life, and functioning in chronic fatigue syndrome', '2023', 'https://doi.org/10.1016/j.jpsychores.2023.111260', 'Journal of Psychosomatic Research', 4),
      (v_art_id, 'peer_reviewed', 1, 'Psychological determinants of overactivity in chronic illness: A qualitative meta-synthesis', '2022', 'https://doi.org/10.1080/09638288.2022.2060342', 'Disability and Rehabilitation', 5),
      (v_art_id, 'professional_org', 3, 'ME/CFS: Diagnosis and management (NICE guideline NG206)', '2021', 'https://www.nice.org.uk/guidance/ng206', 'National Institute for Health and Care Excellence (NICE)', 6),
      (v_art_id, 'government', 2, 'Energy management and fatigue in chronic conditions', '2024', 'https://www.cdc.gov/me-cfs/management/index.html', 'Centers for Disease Control and Prevention', 7),
      (v_art_id, 'peer_reviewed', 1, 'Self-regulation failure and chronic fatigue: The role of goal persistence', '2021', 'https://doi.org/10.1037/hea0001120', 'Health Psychology', 8),
      (v_art_id, 'peer_reviewed', 1, 'Pacing as a strategy for managing fatigue in rheumatic diseases: A systematic review', '2023', 'https://doi.org/10.1093/rheumatology/keac682', 'Rheumatology', 9),
      (v_art_id, 'clinical_guideline', 4, 'The spoon theory and energy management in chronic illness', '2024', 'https://www.arthritis.org/health-wellness/healthy-living/managing-pain/fatigue/spoon-theory', 'Arthritis Foundation', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT20-008 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT20-008';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Prevalence of fatigue in chronic medical conditions: A systematic review and meta-analysis', '2023', 'https://doi.org/10.1016/j.jpsychores.2023.111150', 'Journal of Psychosomatic Research', 1),
      (v_art_id, 'peer_reviewed', 1, 'Neuroinflammation and fatigue in chronic illness: The role of cytokine networks', '2022', 'https://doi.org/10.1016/j.bbi.2022.06.008', 'Brain, Behavior, and Immunity', 2),
      (v_art_id, 'peer_reviewed', 1, 'Depression and anxiety comorbidity in chronic fatigue: A large-scale epidemiological study', '2021', 'https://doi.org/10.1017/S0033291721001513', 'Psychological Medicine', 3),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive dysfunction in chronic fatigue syndrome: A systematic review and meta-analysis', '2023', 'https://doi.org/10.1007/s11065-023-09580-1', 'Neuropsychology Review', 4),
      (v_art_id, 'peer_reviewed', 1, 'Acceptance and commitment therapy for chronic fatigue: A randomized controlled trial', '2022', 'https://doi.org/10.1037/ccp0000742', 'Journal of Consulting and Clinical Psychology', 5),
      (v_art_id, 'professional_org', 3, 'ME/CFS: Diagnosis and management', '2021', 'https://www.nice.org.uk/guidance/ng206', 'National Institute for Health and Care Excellence (NICE)', 6),
      (v_art_id, 'government', 2, 'Chronic fatigue syndrome: Information for healthcare providers', '2024', 'https://www.cdc.gov/me-cfs/healthcare-providers/index.html', 'Centers for Disease Control and Prevention', 7),
      (v_art_id, 'peer_reviewed', 1, 'Identity disruption in chronic illness: A qualitative meta-synthesis', '2022', 'https://doi.org/10.1016/j.socscimed.2022.115120', 'Social Science & Medicine', 8),
      (v_art_id, 'peer_reviewed', 1, 'The neurobiology of fatigue: From molecular mechanisms to clinical management', '2023', 'https://doi.org/10.1038/s41583-023-00703-6', 'Nature Reviews Neuroscience', 9),
      (v_art_id, 'peer_reviewed', 1, 'Fatigue as a window into the brain: A review of emerging research', '2022', 'https://doi.org/10.1111/nyas.14800', 'Annals of the New York Academy of Sciences', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT20-009 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT20-009';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Medical financial hardship in the United States: National estimates from the Survey of Income and Program Participation', '2023', 'https://doi.org/10.2105/AJPH.2023.307261', 'American Journal of Public Health', 1),
      (v_art_id, 'peer_reviewed', 1, 'Financial toxicity and mental health outcomes in cancer patients: A systematic review and meta-analysis', '2022', 'https://doi.org/10.1200/JCO.2022.40.16_suppl', 'Journal of Clinical Oncology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Cost-related medication non-adherence among adults with chronic conditions: Prevalence and consequences', '2022', 'https://doi.org/10.7326/M22-0838', 'Annals of Internal Medicine', 3),
      (v_art_id, 'peer_reviewed', 1, 'Medical debt in the United States: A systematic review', '2023', 'https://doi.org/10.1001/jamainternmed.2023.0759', 'JAMA Internal Medicine', 4),
      (v_art_id, 'peer_reviewed', 1, 'Financial navigation in healthcare: A randomized trial of a multi-component intervention', '2023', 'https://doi.org/10.1007/s11606-023-08092-3', 'Journal of General Internal Medicine', 5),
      (v_art_id, 'government', 2, 'Financial toxicity as an unrecognized patient-reported outcome in health care', '2023', 'https://www.who.int/bulletin/volumes/101/5/financial-toxicity', 'World Health Organization Bulletin', 6),
      (v_art_id, 'government', 2, 'Out-of-pocket health spending and financial hardship among the uninsured and insured', '2023', 'https://www.cdc.gov/nchs/data/databriefs/db468.pdf', 'Centers for Disease Control and Prevention — NCHS Data Brief', 7),
      (v_art_id, 'peer_reviewed', 1, 'Financial toxicity and treatment outcomes: Association with mortality in chronic disease', '2022', 'https://doi.org/10.1016/S2468-2667(22)00234-8', 'The Lancet Public Health', 8),
      (v_art_id, 'peer_reviewed', 1, 'Interventions addressing financial toxicity in patients with cancer: A scoping review', '2023', 'https://doi.org/10.1007/s00520-023-07756-2', 'Supportive Care in Cancer', 9),
      (v_art_id, 'clinical_guideline', 4, 'Patient financial hardship screening and assistance programs: A best practice guide', '2024', 'https://www.aha.org/guides/financial-assistance', 'American Hospital Association', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT20-010 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT20-010';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Patient activation and treatment adherence: A systematic review and meta-analysis', '2022', 'https://doi.org/10.1377/hlthaff.2022.00410', 'Health Affairs', 1),
      (v_art_id, 'peer_reviewed', 1, 'Patient-clinician communication: Time, interruptions, and the quality of the medical encounter', '2019', 'https://doi.org/10.1007/s11606-018-4540-5', 'Journal of General Internal Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'Patient understanding of treatment plans after medical visits: A systematic review', '2021', 'https://doi.org/10.1016/j.pec.2021.03.029', 'Patient Education and Counseling', 3),
      (v_art_id, 'peer_reviewed', 1, 'Racial and gender disparities in symptom dismissal: A large-scale survey study', '2023', 'https://doi.org/10.1016/j.socscimed.2023.115840', 'Social Science & Medicine', 4),
      (v_art_id, 'peer_reviewed', 1, 'Shared decision making in clinical practice: A systematic review and meta-analysis of patient outcomes', '2022', 'https://doi.org/10.1136/bmj-2022-070514', 'BMJ', 5),
      (v_art_id, 'government', 2, 'Health literacy and patient engagement: A comprehensive review', '2023', 'https://www.ahrq.gov/health-literacy/patient-engagement', 'Agency for Healthcare Research and Quality', 6),
      (v_art_id, 'professional_org', 3, 'Shared decision making in practice', '2024', 'https://www.nice.org.uk/guidance/shared-decision-making', 'National Institute for Health and Care Excellence (NICE)', 7),
      (v_art_id, 'peer_reviewed', 1, 'The psychology of medical encounters: Power dynamics and patient voice', '2022', 'https://doi.org/10.1080/17437199.2022.2060844', 'Health Psychology Review', 8),
      (v_art_id, 'peer_reviewed', 1, 'Communication skills training for patients: Systematic review of effectiveness', '2023', 'https://doi.org/10.1016/j.pec.2023.107650', 'Patient Education and Counseling', 9),
      (v_art_id, 'clinical_guideline', 4, 'Being your own health advocate: A practical guide for patients', '2024', 'https://www.acponline.org/patients-families/health-advocacy', 'American College of Physicians', 10)
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
  WHERE a.article_production_id LIKE 'CAT20-%';

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;
