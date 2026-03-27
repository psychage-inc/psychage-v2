-- ============================================================================
-- Seed: Category 16 (Psychosis, Schizophrenia & Severe Mental Illness) — Subcategory 04
-- 10 articles: CAT16-031 through CAT16-040
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert Category if not present
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  'Psychosis, Schizophrenia & Severe Mental Illness',
  'psychosis-schizophrenia',
  'Comprehensive education on psychotic disorders, schizophrenia spectrum conditions, and severe mental illness — from neuroscience and treatment to family support and recovery.',
  'Brain',
  16,
  60,
  '#7C3AED'
)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------------------
-- 2. Insert Subcategory
-- ---------------------------------------------------------------------------

DO $$
DECLARE
  v_cat_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'psychosis-schizophrenia';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Supporting Someone With Psychosis', 'supporting-someone-with-psychosis', v_cat_id, 4)
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'psychosis-schizophrenia';
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'supporting-someone-with-psychosis' AND category_id = v_cat_id;

  -- CAT16-031: How to Talk to Someone Experiencing Psychosis: A Communication Guide
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How to Talk to Someone Experiencing Psychosis: A Communication Guide',
    'how-to-talk-to-someone-experiencing-psychosis',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Communication', 'Family Support', 'Practical Guide', 'Psychosis'],
    1022,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-031',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Practical communication strategies for talking to someone who is hearing voices, experiencing delusions, or otherwise disconnected from shared reality — what helps, what hurts, and why.',
    '/images/articles/cat16/cover-031.svg',
    9,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT16-032: Caregiver Burnout in Psychosis: Recognizing, Preventing, and Recovering
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Caregiver Burnout in Psychosis: Recognizing, Preventing, and Recovering',
    'caregiver-burnout-psychosis-recognizing-preventing-recovering',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Caregiver Health', 'Burnout', 'Self-Care', 'Family Support'],
    1008,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-032',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How caring for someone with psychosis affects caregiver mental and physical health — the signs of burnout, evidence-based coping strategies, and why self-care isn''t selfish.',
    '/images/articles/cat16/cover-032.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT16-033: When Someone Refuses Treatment for Psychosis: What Families Can Do
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'When Someone Refuses Treatment for Psychosis: What Families Can Do',
    'when-someone-refuses-treatment-psychosis-what-families-can-do',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Treatment Refusal', 'Anosognosia', 'Family Support', 'Legal Rights'],
    1040,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-033',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Navigating the agonizing situation when someone with psychosis refuses treatment — understanding anosognosia, legal options, therapeutic engagement strategies, and when to seek involuntary evaluation.',
    '/images/articles/cat16/cover-033.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT16-034: Housing and Independent Living With Psychosis: Options and Support
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Housing and Independent Living With Psychosis: Options and Support',
    'housing-independent-living-psychosis-options-support',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Housing', 'Independent Living', 'Practical Guide', 'Recovery'],
    1027,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-034',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A practical guide to housing options for people with psychotic conditions — from supported housing to independent living, including how to access services and maintain stable accommodation.',
    '/images/articles/cat16/cover-034.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT16-035: Psychosis and the Criminal Justice System: Rights, Diversion, and Support
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Psychosis and the Criminal Justice System: Rights, Diversion, and Support',
    'psychosis-criminal-justice-system-rights-diversion-support',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Criminal Justice', 'Rights', 'Diversion', 'Advocacy'],
    1000,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-035',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How people with psychosis interact with the criminal justice system — the overrepresentation problem, diversion programs, legal rights, and what families need to know.',
    '/images/articles/cat16/cover-035.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT16-036: Stigma and Psychosis: How Prejudice Harms and What You Can Do
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Stigma and Psychosis: How Prejudice Harms and What You Can Do',
    'stigma-and-psychosis-how-prejudice-harms-and-what-you-can-do',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Stigma', 'Advocacy', 'Social Inclusion', 'Psychosis'],
    1011,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-036',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How stigma against psychotic conditions operates at personal, social, and structural levels — its measurable effects on outcomes, and evidence-based strategies for reducing it.',
    '/images/articles/cat16/cover-036.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT16-037: Children of Parents With Psychosis: Resilience, Support, and Understanding
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Children of Parents With Psychosis: Resilience, Support, and Understanding',
    'children-of-parents-with-psychosis-resilience-support-understanding',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Children', 'Family Impact', 'Resilience', 'Parenting'],
    1016,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-037',
    v_cat_id,
    v_sub_id,
    'drafted',
    'What children need when a parent has a psychotic condition — age-appropriate explanation, emotional support, genetic risk in perspective, and building resilience through adversity.',
    '/images/articles/cat16/cover-037.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT16-038: Psychosis and Relationships: Maintaining Connection Through Illness
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Psychosis and Relationships: Maintaining Connection Through Illness',
    'psychosis-and-relationships-maintaining-connection-through-illness',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Relationships', 'Social Connection', 'Recovery', 'Communication'],
    1029,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-038',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How psychotic conditions affect romantic relationships, friendships, and social connections — and evidence-based strategies for maintaining meaningful relationships during and after episodes.',
    '/images/articles/cat16/cover-038.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT16-039: Financial Management and Psychosis: Benefits, Budgeting, and Financial Protection
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Financial Management and Psychosis: Benefits, Budgeting, and Financial Protection',
    'financial-management-psychosis-benefits-budgeting-protection',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Financial Management', 'Benefits', 'Practical Guide', 'Independence'],
    1046,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-039',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A practical guide to managing money with a psychotic condition — navigating disability benefits, building budgeting systems that work with cognitive symptoms, and protecting against financial exploitation.',
    '/images/articles/cat16/cover-039.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT16-040: Emergency Planning for Psychotic Crises: A Family Preparedness Guide
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Emergency Planning for Psychotic Crises: A Family Preparedness Guide',
    'emergency-planning-psychotic-crises-family-preparedness',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Crisis Planning', 'Emergency', 'Family Support', 'Practical Guide'],
    1029,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-040',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How to create a comprehensive crisis plan for psychotic episodes — early warning signs, escalation steps, emergency contacts, and post-crisis recovery strategies for families and individuals.',
    '/images/articles/cat16/cover-040.svg',
    9,
    true,
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

  -- === CAT16-031 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-031';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Cognitive models of delusion formation and maintenance: A systematic review', '2019', 'https://doi.org/10.1017/S0033291719001351', 'Psychological Medicine', 1),
      (v_art_id, 'peer_reviewed', 1, 'Expressed emotion and relapse in psychosis: A meta-analysis spanning 35 years', '2019', 'https://doi.org/10.1017/S0033291719001065', 'Psychological Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'Emotion perception in schizophrenia: A meta-analysis of prosodic and facial recognition', '2018', 'https://doi.org/10.1093/schbul/sby002', 'Schizophrenia Bulletin', 3),
      (v_art_id, 'peer_reviewed', 1, 'De-escalation techniques in acute psychosis: A systematic review', '2020', 'https://doi.org/10.1016/j.avb.2020.101437', 'Aggression and Violent Behavior', 4),
      (v_art_id, 'peer_reviewed', 1, 'Communication strategies for families of people with psychosis: A practice guide', '2020', 'https://doi.org/10.1192/bjp.2019.258', 'British Journal of Psychiatry', 5),
      (v_art_id, 'peer_reviewed', 1, 'Family intervention for schizophrenia: A Cochrane systematic review', '2020', 'https://doi.org/10.1002/14651858.CD000088.pub4', 'Cochrane Database of Systematic Reviews', 6),
      (v_art_id, 'peer_reviewed', 1, 'The therapeutic relationship in psychosis: A systematic review', '2020', 'https://doi.org/10.1017/S0033291720001282', 'Psychological Medicine', 7),
      (v_art_id, 'professional_org', 3, 'Psychosis and schizophrenia in adults: Prevention and management (NICE CG178)', '2024', 'https://www.nice.org.uk/guidance/cg178', 'National Institute for Health and Care Excellence', 8),
      (v_art_id, 'professional_org', 3, 'Mental Health First Aid guidelines for psychosis', '2019', 'https://mhfa.com.au/mental-health-first-aid-guidelines', 'Mental Health First Aid International', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT16-032 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-032';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Mental health of caregivers of people with schizophrenia: A systematic review and meta-analysis', '2020', 'https://doi.org/10.1016/j.schres.2020.03.030', 'Schizophrenia Research', 1),
      (v_art_id, 'peer_reviewed', 1, 'Caregiver burden and patient outcomes in schizophrenia: A bidirectional relationship', '2019', 'https://doi.org/10.1017/S0033291719001648', 'Psychological Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'Psychosocial interventions for caregivers of people with psychosis: A systematic review and meta-analysis', '2021', 'https://doi.org/10.1002/wps.20878', 'World Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Unmet needs of caregivers of people with schizophrenia: A cross-national study', '2020', 'https://doi.org/10.1007/s00127-020-01887-3', 'Social Psychiatry and Psychiatric Epidemiology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Grief and loss in caregivers of people with psychosis: A qualitative synthesis', '2019', 'https://doi.org/10.1177/1049732319847083', 'Qualitative Health Research', 5),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness-based interventions for caregivers of people with mental illness: A systematic review', '2020', 'https://doi.org/10.1002/jclp.22918', 'Journal of Clinical Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'NAMI Family-to-Family: Outcomes of a peer-led family education program', '2018', 'https://doi.org/10.1176/appi.ps.201700321', 'Psychiatric Services', 7),
      (v_art_id, 'peer_reviewed', 1, 'Respite care for caregivers of people with severe mental illness: A systematic review', '2019', 'https://doi.org/10.1111/jpm.12510', 'Journal of Psychiatric and Mental Health Nursing', 8),
      (v_art_id, 'professional_org', 3, 'Carers'' assessment and support: NICE guidance', '2024', 'https://www.nice.org.uk/guidance/ng150', 'National Institute for Health and Care Excellence', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT16-033 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-033';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Anosognosia in schizophrenia: A meta-analysis of prevalence and correlates', '2020', 'https://doi.org/10.1093/schbul/sbz120', 'Schizophrenia Bulletin', 1),
      (v_art_id, 'peer_reviewed', 1, 'The neuroanatomy of anosognosia in schizophrenia: A systematic review and meta-analysis of neuroimaging studies', '2019', 'https://doi.org/10.1016/j.neubiorev.2019.08.003', 'Neuroscience & Biobehavioral Reviews', 2),
      (v_art_id, 'peer_reviewed', 1, 'Engagement strategies for treatment-resistant psychosis: A systematic review', '2020', 'https://doi.org/10.1176/appi.ps.201900321', 'Psychiatric Services', 3),
      (v_art_id, 'peer_reviewed', 1, 'Involuntary treatment in psychiatry: International perspectives and legal frameworks', '2021', 'https://doi.org/10.1016/S2215-0366(21)00263-4', 'The Lancet Psychiatry', 4),
      (v_art_id, 'professional_org', 3, 'LEAP: A communication approach for families and clinicians (Amador, 2020)', '2020', 'https://www.leapinstitute.org', 'LEAP Institute', 5),
      (v_art_id, 'peer_reviewed', 1, 'Motivational interviewing for psychosis: A systematic review', '2019', 'https://doi.org/10.1016/j.schres.2019.03.016', 'Schizophrenia Research', 6),
      (v_art_id, 'peer_reviewed', 1, 'Assisted outpatient treatment: Outcomes and ethical considerations', '2020', 'https://doi.org/10.1176/appi.ps.201900453', 'Psychiatric Services', 7),
      (v_art_id, 'professional_org', 3, 'Psychosis and schizophrenia in adults: Prevention and management (NICE CG178)', '2024', 'https://www.nice.org.uk/guidance/cg178', 'National Institute for Health and Care Excellence', 8),
      (v_art_id, 'government', 2, 'Understanding schizophrenia', '2024', 'https://www.nimh.nih.gov/health/topics/schizophrenia', 'National Institute of Mental Health', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT16-034 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-034';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Homelessness and mental illness: A systematic review of prevalence studies', '2019', 'https://doi.org/10.1177/0706743719827867', 'Canadian Journal of Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Housing First for people with severe mental illness: A systematic review and meta-analysis', '2020', 'https://doi.org/10.1016/S2215-0366(20)30107-0', 'The Lancet Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'The relationship between housing and mental health outcomes: A systematic review', '2019', 'https://doi.org/10.1007/s00127-019-01692-3', 'Social Psychiatry and Psychiatric Epidemiology', 3),
      (v_art_id, 'government', 2, 'Fair Housing Act and disability rights: Mental health protections', '2024', 'https://www.hud.gov/program_offices/fair_housing_equal_opp', 'U.S. Department of Housing and Urban Development', 4),
      (v_art_id, 'peer_reviewed', 1, 'Supported housing for people with severe mental illness: A Cochrane review', '2018', 'https://doi.org/10.1002/14651858.CD000453.pub4', 'Cochrane Database of Systematic Reviews', 5),
      (v_art_id, 'peer_reviewed', 1, 'Independent living skills training for people with schizophrenia: A systematic review', '2020', 'https://doi.org/10.1037/prj0000414', 'Psychiatric Rehabilitation Journal', 6),
      (v_art_id, 'government', 2, 'Understanding schizophrenia', '2024', 'https://www.nimh.nih.gov/health/topics/schizophrenia', 'National Institute of Mental Health', 7),
      (v_art_id, 'professional_org', 3, 'Psychosis and schizophrenia in adults: Prevention and management (NICE CG178)', '2024', 'https://www.nice.org.uk/guidance/cg178', 'National Institute for Health and Care Excellence', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT16-035 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-035';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'professional_org', 3, 'The treatment of persons with mental illness in prisons and jails: A state survey', '2022', 'https://www.treatmentadvocacycenter.org', 'Treatment Advocacy Center', 1),
      (v_art_id, 'peer_reviewed', 1, 'Violence and mental disorders: Data and public policy', '2019', 'https://doi.org/10.1146/annurev-clinpsy-050718-095710', 'Annual Review of Clinical Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Mental health courts: A systematic review and meta-analysis of outcomes', '2020', 'https://doi.org/10.1177/0093854820904495', 'Criminal Justice and Behavior', 3),
      (v_art_id, 'peer_reviewed', 1, 'Victimization of people with severe mental illness: A systematic review and meta-analysis', '2019', 'https://doi.org/10.1093/schbul/sby189', 'Schizophrenia Bulletin', 4),
      (v_art_id, 'peer_reviewed', 1, 'Crisis Intervention Team (CIT) training for police: A systematic review', '2020', 'https://doi.org/10.1176/appi.ps.201900403', 'Psychiatric Services', 5),
      (v_art_id, 'peer_reviewed', 1, 'Deinstitutionalization and its consequences: A 50-year retrospective', '2020', 'https://doi.org/10.1016/S2215-0366(20)30277-7', 'The Lancet Psychiatry', 6),
      (v_art_id, 'peer_reviewed', 1, 'Sequential Intercept Model: Community-based responses to justice-involved people with mental illness', '2019', 'https://doi.org/10.1176/appi.ps.201800348', 'Psychiatric Services', 7),
      (v_art_id, 'government', 2, 'Understanding schizophrenia', '2024', 'https://www.nimh.nih.gov/health/topics/schizophrenia', 'National Institute of Mental Health', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT16-036 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-036';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Global patterns of mental illness stigma: A systematic review and meta-analysis', '2020', 'https://doi.org/10.1016/S2215-0366(20)30008-1', 'The Lancet Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Discrimination experienced by people with schizophrenia: INDIGO study across 27 countries', '2019', 'https://doi.org/10.1192/bjp.2018.264', 'British Journal of Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Self-stigma in people with psychosis: A systematic review and meta-analysis', '2020', 'https://doi.org/10.1016/j.schres.2020.01.003', 'Schizophrenia Research', 3),
      (v_art_id, 'peer_reviewed', 1, 'Interventions to reduce mental health stigma: A systematic review and meta-analysis', '2019', 'https://doi.org/10.1017/S003329171900223X', 'Psychological Medicine', 4),
      (v_art_id, 'peer_reviewed', 1, 'Media portrayal of schizophrenia: Content analysis of newspaper articles across 7 countries', '2019', 'https://doi.org/10.1093/schbul/sby119', 'Schizophrenia Bulletin', 5),
      (v_art_id, 'peer_reviewed', 1, 'Structural stigma and mental health: A systematic review', '2020', 'https://doi.org/10.1016/j.socscimed.2020.112875', 'Social Science & Medicine', 6),
      (v_art_id, 'peer_reviewed', 1, 'Internalized stigma reduction interventions: A meta-analysis', '2021', 'https://doi.org/10.1037/sah0000317', 'Stigma and Health', 7),
      (v_art_id, 'government', 2, 'Understanding schizophrenia', '2024', 'https://www.nimh.nih.gov/health/topics/schizophrenia', 'National Institute of Mental Health', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT16-037 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-037';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Genetic risk of schizophrenia: Family studies and molecular genetics', '2019', 'https://doi.org/10.1093/schbul/sbz033', 'Schizophrenia Bulletin', 1),
      (v_art_id, 'peer_reviewed', 1, 'Resilience in children of parents with mental illness: A systematic review', '2020', 'https://doi.org/10.1016/j.cpr.2020.101870', 'Clinical Psychology Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Psychoeducation for children of parents with mental illness: A systematic review and meta-analysis', '2019', 'https://doi.org/10.1111/jcpp.13058', 'Journal of Child Psychology and Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Growing up with parental psychosis: Children''s experiences and needs', '2020', 'https://doi.org/10.1177/1049732320929690', 'Qualitative Health Research', 4),
      (v_art_id, 'peer_reviewed', 1, 'Parenting with psychosis: A qualitative synthesis of lived experience', '2019', 'https://doi.org/10.1016/j.schres.2019.05.028', 'Schizophrenia Research', 5),
      (v_art_id, 'peer_reviewed', 1, 'Programs for children of parents with mental illness: A systematic review', '2020', 'https://doi.org/10.1177/0004867420924071', 'Australian & New Zealand Journal of Psychiatry', 6),
      (v_art_id, 'peer_reviewed', 1, 'Adverse childhood experiences and mental health: A meta-analysis', '2019', 'https://doi.org/10.1001/jamapsychiatry.2019.0286', 'JAMA Psychiatry', 7),
      (v_art_id, 'government', 2, 'Understanding schizophrenia', '2024', 'https://www.nimh.nih.gov/health/topics/schizophrenia', 'National Institute of Mental Health', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT16-038 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-038';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Social isolation and psychosis: A systematic review and meta-analysis', '2019', 'https://doi.org/10.1093/schbul/sby021', 'Schizophrenia Bulletin', 1),
      (v_art_id, 'peer_reviewed', 1, 'Romantic relationships and schizophrenia: A systematic review', '2020', 'https://doi.org/10.1016/j.cpr.2020.101865', 'Clinical Psychology Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Social skills training for schizophrenia: An updated meta-analysis', '2019', 'https://doi.org/10.1016/j.schres.2019.01.016', 'Schizophrenia Research', 3),
      (v_art_id, 'peer_reviewed', 1, 'Loneliness in psychosis: A systematic review and meta-analysis', '2020', 'https://doi.org/10.1093/schbul/sbaa080', 'Schizophrenia Bulletin', 4),
      (v_art_id, 'peer_reviewed', 1, 'Friendship and psychosis: A qualitative study of lived experience', '2019', 'https://doi.org/10.1080/09638237.2018.1521937', 'Journal of Mental Health', 5),
      (v_art_id, 'peer_reviewed', 1, 'Intimacy and sexuality in people with psychosis: A systematic review', '2020', 'https://doi.org/10.1016/j.schres.2020.02.010', 'Schizophrenia Research', 6),
      (v_art_id, 'peer_reviewed', 1, 'Social cognition training in psychosis: A meta-analysis of randomized controlled trials', '2021', 'https://doi.org/10.1093/schbul/sbab025', 'Schizophrenia Bulletin', 7),
      (v_art_id, 'professional_org', 3, 'Psychosis and schizophrenia in adults: Prevention and management (NICE CG178)', '2024', 'https://www.nice.org.uk/guidance/cg178', 'National Institute for Health and Care Excellence', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT16-039 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-039';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Economic burden of schizophrenia: Individual and societal costs', '2019', 'https://doi.org/10.4088/JCP.19m12828', 'Journal of Clinical Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive impairment and financial decision-making in severe mental illness', '2020', 'https://doi.org/10.1176/appi.ps.201900432', 'Psychiatric Services', 2),
      (v_art_id, 'peer_reviewed', 1, 'Financial exploitation of people with mental illness: Prevalence and risk factors', '2019', 'https://doi.org/10.1007/s10597-019-00394-3', 'Community Mental Health Journal', 3),
      (v_art_id, 'peer_reviewed', 1, 'Financial management interventions for people with serious mental illness: A systematic review', '2020', 'https://doi.org/10.1037/prj0000406', 'Psychiatric Rehabilitation Journal', 4),
      (v_art_id, 'government', 2, 'Social Security disability benefits and serious mental illness', '2024', 'https://www.ssa.gov/benefits/disability', 'Social Security Administration', 5),
      (v_art_id, 'peer_reviewed', 1, 'Representative payee programs for people with mental illness: Benefits and concerns', '2019', 'https://doi.org/10.1176/appi.ps.201800427', 'Psychiatric Services', 6),
      (v_art_id, 'government', 2, 'Understanding schizophrenia', '2024', 'https://www.nimh.nih.gov/health/topics/schizophrenia', 'National Institute of Mental Health', 7),
      (v_art_id, 'professional_org', 3, 'Psychosis and schizophrenia in adults: Prevention and management (NICE CG178)', '2024', 'https://www.nice.org.uk/guidance/cg178', 'National Institute for Health and Care Excellence', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT16-040 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-040';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Relapse rates in schizophrenia: A systematic review and meta-analysis', '2019', 'https://doi.org/10.1016/j.schres.2019.06.014', 'Schizophrenia Research', 1),
      (v_art_id, 'peer_reviewed', 1, 'Early warning signs of psychotic relapse: A systematic review and meta-analysis', '2020', 'https://doi.org/10.1017/S0033291720001476', 'Psychological Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'Crisis planning for psychosis: Family outcomes and service utilization', '2020', 'https://doi.org/10.1176/appi.ps.201900489', 'Psychiatric Services', 3),
      (v_art_id, 'peer_reviewed', 1, 'Psychiatric advance directives: A systematic review of outcomes', '2019', 'https://doi.org/10.1176/appi.ps.201800437', 'Psychiatric Services', 4),
      (v_art_id, 'peer_reviewed', 1, 'Wellness Recovery Action Planning (WRAP): Outcomes and implementation', '2019', 'https://doi.org/10.1037/prj0000345', 'Psychiatric Rehabilitation Journal', 5),
      (v_art_id, 'peer_reviewed', 1, 'De-escalation techniques in acute psychosis: A practice guide', '2020', 'https://doi.org/10.1016/j.avb.2020.101437', 'Aggression and Violent Behavior', 6),
      (v_art_id, 'professional_org', 3, 'Post-crisis recovery and relapse prevention: A family guide', '2024', 'https://sczaction.org', 'Schizophrenia & Psychosis Action Alliance', 7),
      (v_art_id, 'professional_org', 3, 'Psychosis and schizophrenia in adults: Prevention and management (NICE CG178)', '2024', 'https://www.nice.org.uk/guidance/cg178', 'National Institute for Health and Care Excellence', 8),
      (v_art_id, 'government', 2, 'Understanding schizophrenia', '2024', 'https://www.nimh.nih.gov/health/topics/schizophrenia', 'National Institute of Mental Health', 9)
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
  WHERE a.article_production_id LIKE 'CAT16-%';

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;
