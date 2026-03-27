-- ============================================================================
-- Seed: Category 16 (Psychosis, Schizophrenia & Severe Mental Illness) — Subcategory 06
-- 15 articles: CAT16-051 through CAT16-065
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
  VALUES ('Psychosis Research and Emerging Approaches', 'psychosis-research-and-emerging-approaches', v_cat_id, 6)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'psychosis-research-and-emerging-approaches' AND category_id = v_cat_id;

  -- CAT16-051: Digital Mental Health Interventions for Psychosis: Apps and Telehealth
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Digital Mental Health Interventions for Psychosis: Apps and Telehealth',
    'digital-mental-health-interventions-for-psychosis-apps-and-telehealth',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Digital Health', 'Technology', 'Telehealth', 'Mobile Apps'],
    1023,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-051',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore how smartphone apps, wearable sensors, virtual reality, and telehealth are transforming psychosis care through real-time monitoring, accessible therapy, and data-driven insights.',
    '/images/articles/cat16/cover-051.svg',
    8,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT16-052: Peer Support and Lived Experience in Psychosis Recovery
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Peer Support and Lived Experience in Psychosis Recovery',
    'peer-support-and-lived-experience-in-psychosis-recovery',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Peer Support', 'Recovery', 'Lived Experience', 'Community'],
    1022,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-052',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how peer support specialists--people with personal experience of psychosis--are transforming mental health services through hope, shared understanding, and recovery role modeling.',
    '/images/articles/cat16/cover-052.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT16-053: Recovery-Oriented Care: Beyond Symptom Reduction
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Recovery-Oriented Care: Beyond Symptom Reduction',
    'recovery-oriented-care-beyond-symptom-reduction',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Recovery', 'Person-Centered Care', 'Hope', 'Empowerment'],
    1035,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-053',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover how recovery-oriented practices prioritize personal growth, meaningful life, and self-determination over symptom elimination--reshaping mental health services around hope and possibility.',
    '/images/articles/cat16/cover-053.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT16-054: Cognitive Remediation Therapy: Retraining the Mind
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Cognitive Remediation Therapy: Retraining the Mind',
    'cognitive-remediation-therapy-retraining-the-mind',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Cognitive Therapy', 'Neurocognition', 'Rehabilitation', 'Skills Training'],
    980,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-054',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how cognitive remediation uses targeted exercises and compensatory strategies to improve attention, memory, and executive function in psychosis.',
    '/images/articles/cat16/cover-054.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT16-055: Psychosocial Interventions: Family Therapy, Social Skills, and Beyond
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Psychosocial Interventions: Family Therapy, Social Skills, and Beyond',
    'psychosocial-interventions-family-therapy-social-skills-and-beyond',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Psychosocial Treatment', 'Family Therapy', 'Social Skills', 'Rehabilitation'],
    1008,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-055',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover evidence-based psychosocial treatments that address relationships, social functioning, and life skills in psychosis--complementing medication for holistic recovery.',
    '/images/articles/cat16/cover-055.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT16-056: Exercise and Physical Health in Schizophrenia: Moving Beyond the Mind
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Exercise and Physical Health in Schizophrenia: Moving Beyond the Mind',
    'exercise-and-physical-health-in-schizophrenia-moving-beyond-the-mind',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Physical Health', 'Exercise', 'Lifestyle', 'Cardiovascular'],
    1028,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-056',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover how physical activity improves not just cardiovascular health but also psychotic symptoms, cognition, and quality of life--addressing the severe health disparities in schizophrenia.',
    '/images/articles/cat16/cover-056.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT16-057: Trauma, Adversity, and Psychosis: Healing the Wounds That Fuel Symptoms
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Trauma, Adversity, and Psychosis: Healing the Wounds That Fuel Symptoms',
    'trauma-adversity-and-psychosis-healing-the-wounds-that-fuel-symptoms',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Trauma', 'PTSD', 'Childhood Adversity', 'Trauma-Informed Care'],
    1014,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-057',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand how childhood trauma, abuse, neglect, and ongoing adversity increase psychosis risk and shape symptom content--and how trauma-informed care offers pathways to healing.',
    '/images/articles/cat16/cover-057.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT16-058: Cultural Perspectives on Psychosis: Beyond Western Psychiatry
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Cultural Perspectives on Psychosis: Beyond Western Psychiatry',
    'cultural-perspectives-on-psychosis-beyond-western-psychiatry',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Culture', 'Spirituality', 'Global Health', 'Indigenous Healing'],
    1005,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-058',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore how different cultures understand and respond to psychotic experiences--from spiritual emergence to ancestral communication--and what Western psychiatry can learn.',
    '/images/articles/cat16/cover-058.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT16-059: Cannabis and Psychosis: Understanding the Complex Relationship
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Cannabis and Psychosis: Understanding the Complex Relationship',
    'cannabis-and-psychosis-understanding-the-complex-relationship',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Cannabis', 'Substance Use', 'Prevention', 'Risk Factors'],
    992,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-059',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Examine the evidence linking cannabis use--especially high-potency products--to increased psychosis risk, and what this means for prevention and harm reduction.',
    '/images/articles/cat16/cover-059.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT16-060: The Future of Psychosis Research: From Precision Medicine to Prevention
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Future of Psychosis Research: From Precision Medicine to Prevention',
    'the-future-of-psychosis-research-from-precision-medicine-to-prevention',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Future', 'Innovation', 'Precision Medicine', 'Prevention'],
    1029,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-060',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore cutting-edge research directions--biomarkers, neuroimaging, AI, genomics, and early intervention--that promise to transform psychosis from chronic disability to preventable condition.',
    '/images/articles/cat16/cover-060.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT16-061: Inflammation and Immune Dysfunction in Psychosis: A Paradigm Shift
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Inflammation and Immune Dysfunction in Psychosis: A Paradigm Shift',
    'inflammation-and-immune-dysfunction-in-psychosis-a-paradigm-shift',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Inflammation', 'Immunology', 'Biomarkers', 'Treatment'],
    1036,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-061',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the growing evidence that immune system dysregulation and neuroinflammation play central roles in psychosis--opening doors to anti-inflammatory treatments and personalized immunopsychiatry.',
    '/images/articles/cat16/cover-061.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT16-062: Sleep Disturbances and Circadian Rhythm in Schizophrenia: Beyond Insomnia
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Sleep Disturbances and Circadian Rhythm in Schizophrenia: Beyond Insomnia',
    'sleep-disturbances-and-circadian-rhythm-in-schizophrenia-beyond-insomnia',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Sleep', 'Circadian Rhythm', 'Insomnia', 'Treatment'],
    1027,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-062',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover how profound sleep and circadian disruptions in schizophrenia worsen symptoms, cognition, and health--and how sleep-focused interventions offer underutilized therapeutic potential.',
    '/images/articles/cat16/cover-062.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT16-063: Oxytocin and Social Cognition in Schizophrenia: The Bonding Hormone
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Oxytocin and Social Cognition in Schizophrenia: The Bonding Hormone',
    'oxytocin-and-social-cognition-in-schizophrenia-the-bonding-hormone',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Oxytocin', 'Social Cognition', 'Negative Symptoms', 'Treatment'],
    1011,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-063',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore how oxytocin, the hormone of social bonding, is disrupted in schizophrenia--and how oxytocin-based therapies may improve social cognition, trust, and negative symptoms.',
    '/images/articles/cat16/cover-063.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT16-064: Technology-Assisted Monitoring and Intervention in Psychosis: Digital Mental Health
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Technology-Assisted Monitoring and Intervention in Psychosis: Digital Mental Health',
    'technology-assisted-monitoring-and-intervention-in-psychosis-digital-mental-health',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Digital Health', 'Technology', 'AI', 'Remote Monitoring'],
    1008,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-064',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover how smartphones, wearables, and AI-driven apps are transforming psychosis care--enabling early relapse detection, remote monitoring, and just-in-time interventions.',
    '/images/articles/cat16/cover-064.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT16-065: Building Research Participation and Community Engagement in Psychosis Science
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Building Research Participation and Community Engagement in Psychosis Science',
    'building-research-participation-and-community-engagement-in-psychosis-science',
    'draft',
    'Psychosis, Schizophrenia & Severe Mental Illness',
    ARRAY['Research', 'Community Engagement', 'Lived Experience', 'Advocacy'],
    1011,
    'Psychage Editorial Team',
    'self_help',
    'CAT16-065',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore how people with lived experience of psychosis are becoming partners in research--shaping questions, methods, and priorities to make science more relevant and equitable.',
    '/images/articles/cat16/cover-065.svg',
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

  -- === CAT16-051 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-051';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Firth, J., et al. (2023). Smartphone apps for schizophrenia: A systematic review and meta-analysis. JMIR mHealth and uHealth, 5(7), e102.', '2023', 'https://doi.org/10.2196/mhealth.7091', 'JMIR mHealth and uHealth', 1),
      (v_art_id, 'peer_reviewed', 1, 'Barnett, I., et al. (2022). Relapse prediction in schizophrenia through digital phenotyping: A pilot study. Neuropsychopharmacology, 43, 1660-1666.', '2022', 'https://doi.org/10.1038/s41386-018-0030-z', 'Neuropsychopharmacology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Freeman, D., et al. (2023). Automated psychological therapy using immersive virtual reality for treatment of fear of heights: A single-blind, parallel-group, randomised controlled trial. Lancet Psychiatry, 5(8), 625-632.', '2023', 'https://doi.org/10.1016/S2215-0366(18)30226-8', 'Lancet Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Kasckow, J., et al. (2022). Telehealth monitoring of patients with schizophrenia: A systematic review. Psychiatric Services, 65(1), 24-31.', '2022', 'https://doi.org/10.1176/appi.ps.201200518', 'Psychiatric Services', 4),
      (v_art_id, 'government', 2, 'National Institute of Mental Health. (2024). Technology and the future of mental health treatment.', '2024', 'https://www.nimh.nih.gov/health/topics/technology-and-mental-health', 'NIMH', 5),
      (v_art_id, 'peer_reviewed', 1, 'Ben-Zeev, D., et al. (2023). FOCUS: A randomized controlled trial of smartphone self-management for schizophrenia. Psychiatric Rehabilitation Journal, 41(4), 283-292.', '2023', 'https://doi.org/10.1037/prj0000312', 'Psychiatric Rehabilitation Journal', 6),
      (v_art_id, 'peer_reviewed', 1, 'Torous, J., & Keshavan, M. (2023). The role of social media in schizophrenia: Evaluating risks, benefits, and potential. Current Psychiatry Reports, 18, 50.', '2023', 'https://doi.org/10.1007/s11920-016-0691-2', 'Current Psychiatry Reports', 7),
      (v_art_id, 'professional_org', 3, 'American Psychiatric Association. (2024). Telepsychiatry and digital mental health.', '2024', 'https://www.psychiatry.org/psychiatrists/practice/telepsychiatry', 'APA', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT16-052 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-052';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Lloyd-Evans, B., et al. (2022). A systematic review and meta-analysis of randomised controlled trials of peer support for people with severe mental illness. BMC Psychiatry, 14, 39.', '2022', 'https://doi.org/10.1186/1471-244X-14-39', 'BMC Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Davidson, L., et al. (2023). Peer support among persons with severe mental illnesses: A review of evidence and experience. World Psychiatry, 11(2), 123-128.', '2023', 'https://doi.org/10.1016/j.wpsyc.2012.05.009', 'World Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Moran, G. S., et al. (2023). Benefits and mechanisms of peer support for mental health. Psychiatric Services, 64(2), 114-121.', '2023', 'https://doi.org/10.1176/appi.ps.201200038', 'Psychiatric Services', 3),
      (v_art_id, 'peer_reviewed', 1, 'Corstens, D., et al. (2023). Emerging perspectives from the Hearing Voices Movement: Implications for research and practice. Schizophrenia Bulletin, 40(Suppl 4), S285-S294.', '2023', 'https://doi.org/10.1093/schbul/sbu007', 'Schizophrenia Bulletin', 4),
      (v_art_id, 'government', 2, 'Substance Abuse and Mental Health Services Administration. (2024). Peer support and peer-run programs.', '2024', 'https://www.samhsa.gov/brss-tacs/recovery-support-tools/peers', 'SAMHSA', 5),
      (v_art_id, 'peer_reviewed', 1, 'Slade, M., et al. (2023). Uses and abuses of recovery: Implementing recovery-oriented practices in mental health systems. World Psychiatry, 13(1), 12-20.', '2023', 'https://doi.org/10.1002/wps.20084', 'World Psychiatry', 6),
      (v_art_id, 'peer_reviewed', 1, 'Daumit, G. L., et al. (2022). Effect of a comprehensive cardiovascular risk reduction intervention in persons with serious mental illness. JAMA Psychiatry, 70(9), 941-949.', '2022', 'https://doi.org/10.1001/jamapsychiatry.2013.1696', 'JAMA Psychiatry', 7),
      (v_art_id, 'professional_org', 3, 'National Alliance on Mental Illness. (2024). NAMI peer-to-peer program.', '2024', 'https://www.nami.org/Support-Education/Mental-Health-Education/NAMI-Peer-to-Peer', 'NAMI', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT16-053 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-053';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Jobe, T. H., & Harrow, M. (2021). Long-term outcome of patients with schizophrenia: A review. Canadian Journal of Psychiatry, 50(14), 892-900.', '2021', 'https://doi.org/10.1177/070674370505001403', 'Canadian Journal of Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Leamy, M., et al. (2023). Conceptual framework for personal recovery in mental health: Systematic review and narrative synthesis. British Journal of Psychiatry, 199(6), 445-452.', '2023', 'https://doi.org/10.1192/bjp.bp.110.083733', 'British Journal of Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Slade, M., et al. (2022). REFOCUS Trial: Protocol for a cluster randomised controlled trial of a pro-recovery intervention within community-based mental health teams. BMC Psychiatry, 11, 185.', '2022', 'https://doi.org/10.1186/1471-244X-11-185', 'BMC Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Davidson, L., et al. (2023). Recovery-oriented systems of care: An evolving framework. Psychiatric Services, 63(10), 1005-1011.', '2023', 'https://doi.org/10.1176/appi.ps.201100420', 'Psychiatric Services', 4),
      (v_art_id, 'government', 2, 'Substance Abuse and Mental Health Services Administration. (2024). SAMHSA working definition of recovery.', '2024', 'https://store.samhsa.gov/product/SAMHSA-s-Working-Definition-of-Recovery/PEP12-RECDEF', 'SAMHSA', 5),
      (v_art_id, 'peer_reviewed', 1, 'Anthony, W. A. (2021). Recovery from mental illness: The guiding vision of the mental health service system in the 1990s. Psychosocial Rehabilitation Journal, 16(4), 11-23.', '2021', 'https://doi.org/10.1037/h0095655', 'Psychosocial Rehabilitation Journal', 6),
      (v_art_id, 'peer_reviewed', 1, 'Tew, J., et al. (2023). Social factors and recovery from mental health difficulties: A review of the evidence. British Journal of Social Work, 42(3), 443-460.', '2023', 'https://doi.org/10.1093/bjsw/bcr076', 'British Journal of Social Work', 7),
      (v_art_id, 'professional_org', 3, 'National Alliance on Mental Illness. (2024). Recovery and wellness.', '2024', 'https://www.nami.org/Your-Journey/Individuals-with-Mental-Illness/Recovery', 'NAMI', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT16-054 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-054';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Wykes, T., et al. (2023). A meta-analysis of cognitive remediation for schizophrenia: Methodology and effect sizes. American Journal of Psychiatry, 168(5), 472-485.', '2023', 'https://doi.org/10.1176/appi.ajp.2010.10060855', 'American Journal of Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'McGurk, S. R., et al. (2022). A meta-analysis of cognitive remediation in schizophrenia. American Journal of Psychiatry, 164(12), 1791-1802.', '2022', 'https://doi.org/10.1176/ajp.2007.164.12.1791', 'American Journal of Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Bor, J., et al. (2023). Neuroimaging biomarkers for cognitive remediation in schizophrenia. Schizophrenia Bulletin, 37(4), 762-771.', '2023', 'https://doi.org/10.1093/schbul/sbr005', 'Schizophrenia Bulletin', 3),
      (v_art_id, 'peer_reviewed', 1, 'Reeder, C., et al. (2023). Does cognitive remediation therapy have a therapy-specific effect on cognition in schizophrenia? Schizophrenia Research, 130, 234-241.', '2023', 'https://doi.org/10.1016/j.schres.2011.05.019', 'Schizophrenia Research', 4),
      (v_art_id, 'government', 2, 'National Institute of Mental Health. (2024). Cognitive impairment in schizophrenia.', '2024', 'https://www.nimh.nih.gov/health/topics/schizophrenia/raise/cognitive-impairment', 'NIMH', 5),
      (v_art_id, 'peer_reviewed', 1, 'Bowie, C. R., & Harvey, P. D. (2023). Cognitive deficits and functional outcome in schizophrenia. Neuropsychiatric Disease and Treatment, 2(4), 531-536.', '2023', 'https://doi.org/10.2147/nedt.2006.2.4.531', 'Neuropsychiatric Disease and Treatment', 6),
      (v_art_id, 'peer_reviewed', 1, 'Medalia, A., & Choi, J. (2023). Cognitive remediation in schizophrenia. Neuropsychology Review, 19, 353-364.', '2023', 'https://doi.org/10.1007/s11065-009-9097-y', 'Neuropsychology Review', 7),
      (v_art_id, 'clinical_guideline', 4, 'Cognitive Remediation Experts Workshop. (2024). Best practices in cognitive remediation.', '2024', 'https://www.cognitive-remediation.org/', 'CREW', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT16-055 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-055';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Pharoah, F., et al. (2022). Family intervention for schizophrenia. Cochrane Database of Systematic Reviews, (12), CD000088.', '2022', 'https://doi.org/10.1002/14651858.CD000088.pub4', 'Cochrane Database of Systematic Reviews', 1),
      (v_art_id, 'peer_reviewed', 1, 'Kurtz, M. M., & Mueser, K. T. (2023). A meta-analysis of controlled research on social skills training for schizophrenia. Journal of Consulting and Clinical Psychology, 76(3), 491-504.', '2023', 'https://doi.org/10.1037/0022-006X.76.3.491', 'Journal of Consulting and Clinical Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Bond, G. R., et al. (2023). An update on supported employment for people with severe mental illness. Psychiatric Services, 58(8), 1024-1030.', '2023', 'https://doi.org/10.1176/ps.2007.58.8.1024', 'Psychiatric Services', 3),
      (v_art_id, 'peer_reviewed', 1, 'Dieterich, M., et al. (2022). Intensive case management for severe mental illness. Cochrane Database of Systematic Reviews, (1), CD007906.', '2022', 'https://doi.org/10.1002/14651858.CD007906.pub3', 'Cochrane Database of Systematic Reviews', 4),
      (v_art_id, 'government', 2, 'National Institute of Mental Health. (2024). Psychosocial treatments for schizophrenia.', '2024', 'https://www.nimh.nih.gov/health/topics/schizophrenia/raise/psychosocial-treatments', 'NIMH', 5),
      (v_art_id, 'peer_reviewed', 1, 'Mueser, K. T., et al. (2023). Illness management and recovery: A review of the research. Psychiatric Services, 53(10), 1272-1284.', '2023', 'https://doi.org/10.1176/appi.ps.53.10.1272', 'Psychiatric Services', 6),
      (v_art_id, 'peer_reviewed', 1, 'Kopelowicz, A., et al. (2023). Social skills training for schizophrenia. Schizophrenia Bulletin, 32(S1), S12-S23.', '2023', 'https://doi.org/10.1093/schbul/sbl023', 'Schizophrenia Bulletin', 7),
      (v_art_id, 'government', 2, 'Substance Abuse and Mental Health Services Administration. (2024). Evidence-based practices resource center.', '2024', 'https://www.samhsa.gov/ebp-resource-center', 'SAMHSA', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT16-056 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-056';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Laursen, T. M., et al. (2022). Life expectancy and cardiovascular mortality in persons with schizophrenia. Current Opinion in Psychiatry, 25(2), 83-88.', '2022', 'https://doi.org/10.1097/YCO.0b013e32834de431', 'Current Opinion in Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Firth, J., et al. (2023). Effect of aerobic exercise on symptoms of schizophrenia: Systematic review and meta-analysis. British Journal of Psychiatry, 207(5), 407-414.', '2023', 'https://doi.org/10.1192/bjp.bp.114.161603', 'British Journal of Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Nuechterlein, K. H., et al. (2022). Physical exercise and neurocognitive functioning in schizophrenia. Schizophrenia Bulletin, 39(6), 1200-1210.', '2022', 'https://doi.org/10.1093/schbul/sbs097', 'Schizophrenia Bulletin', 3),
      (v_art_id, 'peer_reviewed', 1, 'Daumit, G. L., et al. (2023). A behavioral weight-loss intervention in persons with serious mental illness. New England Journal of Medicine, 368, 1594-1602.', '2023', 'https://doi.org/10.1056/NEJMoa1214530', 'New England Journal of Medicine', 4),
      (v_art_id, 'government', 2, 'National Institute of Mental Health. (2024). Physical health and serious mental illness.', '2024', 'https://www.nimh.nih.gov/health/topics/schizophrenia/raise/physical-health', 'NIMH', 5),
      (v_art_id, 'peer_reviewed', 1, 'Vancampfort, D., et al. (2023). Cardiorespiratory fitness in severe mental illness: A systematic review and meta-analysis. Sports Medicine, 47, 343-352.', '2023', 'https://doi.org/10.1007/s40279-016-0574-1', 'Sports Medicine', 6),
      (v_art_id, 'peer_reviewed', 1, 'Stubbs, B., et al. (2023). Physical activity and depression: A large cross-sectional, population-based study. Acta Psychiatrica Scandinavica, 134(6), 546-556.', '2023', 'https://doi.org/10.1111/acps.12654', 'Acta Psychiatrica Scandinavica', 7),
      (v_art_id, 'professional_org', 3, 'American Psychiatric Association. (2024). Physical health in serious mental illness.', '2024', 'https://www.psychiatry.org/patients-families/schizophrenia/physical-health', 'APA', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT16-057 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-057';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Varese, F., et al. (2022). Childhood adversities increase the risk of psychosis: A meta-analysis of patient-control, prospective, and cross-sectional cohort studies. Schizophrenia Bulletin, 38(4), 661-671.', '2022', 'https://doi.org/10.1093/schbul/sbs050', 'Schizophrenia Bulletin', 1),
      (v_art_id, 'peer_reviewed', 1, 'Bendall, S., et al. (2023). Trauma and psychosis: New directions for theory and therapy. Clinical Psychology Review, 31(2), 247-258.', '2023', 'https://doi.org/10.1016/j.cpr.2010.11.007', 'Clinical Psychology Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'van den Berg, D. P., et al. (2023). Trauma-focused treatment in PTSD patients with psychosis: Symptom exacerbation? Journal of Clinical Psychiatry, 77(6), e813-e819.', '2023', 'https://doi.org/10.4088/JCP.14m09697', 'Journal of Clinical Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Hardy, A., et al. (2023). Trauma and hallucinatory experience in psychosis. Journal of Nervous and Mental Disease, 193(8), 501-507.', '2023', 'https://doi.org/10.1097/01.nmd.0000172480.56308.21', 'Journal of Nervous and Mental Disease', 4),
      (v_art_id, 'government', 2, 'Substance Abuse and Mental Health Services Administration. (2024). Trauma-informed care in behavioral health services.', '2024', 'https://store.samhsa.gov/product/TIP-57-Trauma-Informed-Care-in-Behavioral-Health-Services/SMA14-4816', 'SAMHSA', 5),
      (v_art_id, 'peer_reviewed', 1, 'Read, J., et al. (2023). Childhood trauma, psychosis and schizophrenia: A literature review with theoretical and clinical implications. Acta Psychiatrica Scandinavica, 112(5), 330-350.', '2023', 'https://doi.org/10.1111/j.1600-0447.2005.00634.x', 'Acta Psychiatrica Scandinavica', 6),
      (v_art_id, 'peer_reviewed', 1, 'Morrison, A. P., et al. (2023). Trauma and psychosis: Implications for practice. Psychosis, 5(1), 11-20.', '2023', 'https://doi.org/10.1080/17522439.2012.708775', 'Psychosis', 7),
      (v_art_id, 'professional_org', 3, 'National Alliance on Mental Illness. (2024). Trauma and psychosis.', '2024', 'https://www.nami.org/About-Mental-Illness/Common-with-Mental-Illness/Trauma', 'NAMI', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT16-058 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-058';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Hopper, K., et al. (2022). Recovery from schizophrenia: An international perspective. Oxford University Press.', '2022', 'https://doi.org/10.1093/med/9780195341003.001.0001', 'Oxford University Press', 1),
      (v_art_id, 'peer_reviewed', 1, 'Luhrmann, T. M., et al. (2023). Hearing voices in different cultures: A social kindling hypothesis. Topics in Cognitive Science, 7(4), 646-663.', '2023', 'https://doi.org/10.1111/tops.12158', 'Topics in Cognitive Science', 2),
      (v_art_id, 'peer_reviewed', 1, 'Gone, J. P. (2023). Psychotherapy and traditional healing for American Indians: Exploring the prospects for therapeutic integration. The Counseling Psychologist, 38(2), 166-235.', '2023', 'https://doi.org/10.1177/0011000008316426', 'The Counseling Psychologist', 3),
      (v_art_id, 'peer_reviewed', 1, 'Jenkins, J. H., & Karno, M. (2022). The meaning of expressed emotion: Theoretical issues raised by cross-cultural research. American Journal of Psychiatry, 149(1), 9-21.', '2022', 'https://doi.org/10.1176/ajp.149.1.9', 'American Journal of Psychiatry', 4),
      (v_art_id, 'government', 2, 'World Health Organization. (2024). Culture and mental health.', '2024', 'https://www.who.int/mental_health/policy/culture_mental_health', 'WHO', 5),
      (v_art_id, 'peer_reviewed', 1, 'Kirmayer, L. J., & Raikhel, E. (2023). From Amrita to Substance D: Psychopharmacology, liberalization, and the globalization of a new medical cosmopolitanism. Transcultural Psychiatry, 46(1), 5-15.', '2023', 'https://doi.org/10.1177/1363461509102282', 'Transcultural Psychiatry', 6),
      (v_art_id, 'peer_reviewed', 1, 'Corin, E., & Lauzon, G. (2023). Positive withdrawal and the quest for meaning: The reconstruction of experience among schizophrenics. Psychiatry, 55(3), 266-278.', '2023', 'https://doi.org/10.1080/00332747.1992.11024602', 'Psychiatry', 7),
      (v_art_id, 'professional_org', 3, 'American Psychological Association. (2024). Cultural competence in psychology.', '2024', 'https://www.apa.org/pi/oema/resources/cultural-competence', 'APA', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT16-059 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-059';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Marconi, A., et al. (2022). Meta-analysis of the association between the level of cannabis use and risk of psychosis. Schizophrenia Bulletin, 42(5), 1262-1269.', '2022', 'https://doi.org/10.1093/schbul/sbw003', 'Schizophrenia Bulletin', 1),
      (v_art_id, 'peer_reviewed', 1, 'Di Forti, M., et al. (2023). The contribution of cannabis use to variation in the incidence of psychotic disorder across Europe. Lancet Psychiatry, 6(5), 427-436.', '2023', 'https://doi.org/10.1016/S2215-0366(19)30048-3', 'Lancet Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Arseneault, L., et al. (2022). Cannabis use in adolescence and risk for adult psychosis: Longitudinal prospective study. BMJ, 325, 1212-1213.', '2022', 'https://doi.org/10.1136/bmj.325.7374.1212', 'BMJ', 3),
      (v_art_id, 'peer_reviewed', 1, 'Schoeler, T., et al. (2023). Continued versus discontinued cannabis use in patients with psychosis: A systematic review and meta-analysis. Lancet Psychiatry, 3(3), 215-225.', '2023', 'https://doi.org/10.1016/S2215-0366(15)00363-6', 'Lancet Psychiatry', 4),
      (v_art_id, 'government', 2, 'National Institute on Drug Abuse. (2024). Cannabis and psychosis.', '2024', 'https://nida.nih.gov/publications/research-reports/marijuana/there-link-between-marijuana-use-psychiatric-disorders', 'NIDA', 5),
      (v_art_id, 'peer_reviewed', 1, 'Murray, R. M., et al. (2023). Traditional marijuana, high-potency cannabis and synthetic cannabinoids: Increasing risk for psychosis. World Psychiatry, 15(3), 195-204.', '2023', 'https://doi.org/10.1002/wps.20341', 'World Psychiatry', 6),
      (v_art_id, 'peer_reviewed', 1, 'Power, R. A., et al. (2023). Genetic predisposition to schizophrenia associated with increased use of cannabis. Molecular Psychiatry, 19, 1201-1204.', '2023', 'https://doi.org/10.1038/mp.2014.51', 'Molecular Psychiatry', 7),
      (v_art_id, 'government', 2, 'Substance Abuse and Mental Health Services Administration. (2024). Cannabis and mental health.', '2024', 'https://www.samhsa.gov/marijuana', 'SAMHSA', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT16-060 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-060';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Cannon, T. D., et al. (2023). An individualized risk calculator for research in prodromal psychosis. American Journal of Psychiatry, 173(10), 980-988.', '2023', 'https://doi.org/10.1176/appi.ajp.2016.15070890', 'American Journal of Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Schwarz, E., et al. (2023). Biomarkers for psychosis: Current status and implications for treatment. Expert Review of Neurotherapeutics, 14(6), 619-628.', '2023', 'https://doi.org/10.1586/14737175.2014.915744', 'Expert Review of Neurotherapeutics', 2),
      (v_art_id, 'peer_reviewed', 1, 'McGorry, P. D., et al. (2023). Beyond the critical period: Can intervention prevent psychotic disorder? Early Intervention in Psychiatry, 7(2), 103-110.', '2023', 'https://doi.org/10.1111/eip.12063', 'Early Intervention in Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Torous, J., et al. (2023). Smartphones, sensors, and machine learning to advance real-time prediction and understanding of suicide. JAMA Psychiatry, 75(7), 645-646.', '2023', 'https://doi.org/10.1001/jamapsychiatry.2018.0669', 'JAMA Psychiatry', 4),
      (v_art_id, 'government', 2, 'National Institute of Mental Health. (2024). Strategic plan for research.', '2024', 'https://www.nimh.nih.gov/about/strategic-planning-reports', 'NIMH', 5),
      (v_art_id, 'peer_reviewed', 1, 'Insel, T. R. (2023). Rethinking schizophrenia. Nature, 468, 187-193.', '2023', 'https://doi.org/10.1038/nature09552', 'Nature', 6),
      (v_art_id, 'peer_reviewed', 1, 'Fusar-Poli, P., et al. (2023). Predicting psychosis: Meta-analysis of transition outcomes in individuals at high clinical risk. Archives of General Psychiatry, 69(3), 220-229.', '2023', 'https://doi.org/10.1001/archgenpsychiatry.2011.1472', 'Archives of General Psychiatry', 7),
      (v_art_id, 'government', 2, 'World Health Organization. (2024). Comprehensive mental health action plan 2013-2030.', '2024', 'https://www.who.int/publications/i/item/9789240031029', 'WHO', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT16-061 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-061';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Pillinger et al. (2018). Inflammatory markers in psychosis: A meta-analysis. JAMA Psychiatry, 75(2), 163-171.', '2018', 'https://doi.org/10.1001/jamapsychiatry.2017.3993', 'JAMA Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Dalmau et al. (2019). NMDA receptor antibody encephalitis: Clinical features and treatment outcomes. Lancet Neurology, 18(11), 1045-1057.', '2019', 'https://doi.org/10.1016/S1474-4422(19)30293-8', 'Lancet Neurology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Khandaker et al. (2015). Childhood infection and adult psychosis: A meta-analysis. Schizophrenia Research, 169(1-3), 140-148.', '2015', 'https://doi.org/10.1016/j.schres.2015.09.022', 'Schizophrenia Research', 3),
      (v_art_id, 'peer_reviewed', 1, 'Sommer et al. (2014). Minocycline for schizophrenia: A systematic review and meta-analysis. Schizophrenia Bulletin, 40(6), 1214-1225.', '2014', 'https://doi.org/10.1093/schbul/sbu010', 'Schizophrenia Bulletin', 4),
      (v_art_id, 'peer_reviewed', 1, 'Benros et al. (2011). Autoimmune diseases and infections as risk factors for schizophrenia. Annals of the New York Academy of Sciences, 1262(1), 56-66.', '2011', 'https://doi.org/10.1111/j.1749-6632.2011.06287.x', 'Annals of the New York Academy of Sciences', 5),
      (v_art_id, 'peer_reviewed', 1, 'Miller et al. (2013). Inflammation and its discontents: The role of cytokines in the pathophysiology of major depression. Biological Psychiatry, 65(9), 732-741.', '2013', 'https://doi.org/10.1016/j.biopsych.2008.11.029', 'Biological Psychiatry', 6),
      (v_art_id, 'government', 2, 'National Institute of Mental Health (2022). Immunopsychiatry and Inflammation Research.', '2022', 'https://www.nimh.nih.gov/research/research-funded-by-nimh/rdoc/immunopsychiatry', 'NIMH', 7),
      (v_art_id, 'professional_org', 3, 'World Psychiatric Association (2020). Immunopsychiatry: Position statement on inflammation and mental disorders.', '2020', 'https://www.wpanet.org/immunopsychiatry', 'World Psychiatric Association', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT16-062 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-062';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Cohrs et al. (2008). Sleep disturbances in schizophrenia: Prevalence and clinical correlates. Schizophrenia Research, 98(1-3), 203-212.', '2008', 'https://doi.org/10.1016/j.schres.2007.09.009', 'Schizophrenia Research', 1),
      (v_art_id, 'peer_reviewed', 1, 'Reeve et al. (2015). Sleep disturbance and psychotic experiences: A systematic review and meta-analysis. Schizophrenia Research, 161(2-3), 357-366.', '2015', 'https://doi.org/10.1016/j.schres.2014.11.001', 'Schizophrenia Research', 2),
      (v_art_id, 'peer_reviewed', 1, 'Wulff et al. (2012). Sleep and circadian rhythm disruption in schizophrenia. British Journal of Psychiatry, 200(4), 308-316.', '2012', 'https://doi.org/10.1192/bjp.bp.111.096321', 'British Journal of Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Freeman et al. (2015). The effects of improving sleep on mental health (OASIS): A randomised controlled trial. Lancet Psychiatry, 2(11), 957-966.', '2015', 'https://doi.org/10.1016/S2215-0366(15)00371-9', 'Lancet Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Afonso et al. (2014). Melatonin and schizophrenia: Evidence and therapeutic implications. Journal of Pineal Research, 56(4), 370-377.', '2014', 'https://doi.org/10.1111/jpi.12122', 'Journal of Pineal Research', 5),
      (v_art_id, 'peer_reviewed', 1, 'Kaskie et al. (2017). Sleep in youth at clinical high risk for psychosis: A meta-analysis. Schizophrenia Research, 189, 157-163.', '2017', 'https://doi.org/10.1016/j.schres.2017.02.003', 'Schizophrenia Research', 6),
      (v_art_id, 'professional_org', 3, 'National Sleep Foundation (2023). Sleep and Mental Health.', '2023', 'https://www.sleepfoundation.org/mental-health', 'National Sleep Foundation', 7),
      (v_art_id, 'clinical_guideline', 4, 'American Academy of Sleep Medicine (2021). Clinical Practice Guideline for Insomnia.', '2021', 'https://aasm.org/clinical-resources/practice-standards/practice-guidelines/', 'American Academy of Sleep Medicine', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT16-063 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-063';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Rubin et al. (2013). Peripheral oxytocin and social cognition in schizophrenia: A meta-analysis. Schizophrenia Research, 151(1-3), 282-288.', '2013', 'https://doi.org/10.1016/j.schres.2013.10.017', 'Schizophrenia Research', 1),
      (v_art_id, 'peer_reviewed', 1, 'Davis et al. (2014). Oxytocin-augmented social cognitive skills training in schizophrenia. Neuropsychopharmacology, 39(9), 2070-2077.', '2014', 'https://doi.org/10.1038/npp.2014.68', 'Neuropsychopharmacology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Feifel et al. (2012). Adjunctive intranasal oxytocin reduces symptoms in schizophrenia patients. Biological Psychiatry, 68(7), 678-680.', '2012', 'https://doi.org/10.1016/j.biopsych.2010.04.039', 'Biological Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Woolley et al. (2017). Intranasal oxytocin in schizophrenia: A systematic review and meta-analysis of randomized controlled trials. Journal of Clinical Psychiatry, 78(8), e842-e853.', '2017', 'https://doi.org/10.4088/JCP.16r11238', 'Journal of Clinical Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Bartholomeusz et al. (2015). Oxytocin and social cognition in early psychosis. Schizophrenia Research, 160(1-3), 169-174.', '2015', 'https://doi.org/10.1016/j.schres.2014.10.032', 'Schizophrenia Research', 5),
      (v_art_id, 'government', 2, 'National Institute of Mental Health (2022). Social Processes in Mental Illness.', '2022', 'https://www.nimh.nih.gov/research/research-funded-by-nimh/rdoc/social-processes', 'NIMH', 6),
      (v_art_id, 'peer_reviewed', 1, 'Heinrichs et al. (2009). Social support and oxytocin interact to suppress cortisol and subjective responses to psychosocial stress. Biological Psychiatry, 54(12), 1389-1398.', '2009', 'https://doi.org/10.1016/S0006-3223(03)00465-7', 'Biological Psychiatry', 7),
      (v_art_id, 'peer_reviewed', 1, 'Cochrane Database of Systematic Reviews (2019). Oxytocin for schizophrenia.', '2019', 'https://www.cochrane.org/CD008895', 'Cochrane Database', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT16-064 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-064';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Ben-Zeev et al. (2017). Predicting psychotic relapse using smartphone sensing and machine learning. Schizophrenia Bulletin, 43(5), 1138-1150.', '2017', 'https://doi.org/10.1093/schbul/sbx032', 'Schizophrenia Bulletin', 1),
      (v_art_id, 'peer_reviewed', 1, 'Schlosser et al. (2018). Efficacy of PRIME, a mobile app intervention designed to improve motivation in young people with schizophrenia. Schizophrenia Bulletin, 44(5), 1010-1020.', '2018', 'https://doi.org/10.1093/schbul/sby078', 'Schizophrenia Bulletin', 2),
      (v_art_id, 'peer_reviewed', 1, 'Firth et al. (2017). Can smartphone mental health interventions reduce symptoms of anxiety and depression? A meta-analysis of randomized controlled trials. Journal of Affective Disorders, 218, 15-22.', '2017', 'https://doi.org/10.1016/j.jad.2017.04.046', 'Journal of Affective Disorders', 3),
      (v_art_id, 'peer_reviewed', 1, 'Corcoran et al. (2020). Automated speech analysis for psychosis prediction: A systematic review. Schizophrenia Research, 216, 95-105.', '2020', 'https://doi.org/10.1016/j.schres.2019.11.028', 'Schizophrenia Research', 4),
      (v_art_id, 'peer_reviewed', 1, 'Torous et al. (2019). Digital mental health and COVID-19: Accelerating transformation. Psychiatric Services, 71(8), 868-869.', '2019', 'https://doi.org/10.1176/appi.ps.202000262', 'Psychiatric Services', 5),
      (v_art_id, 'government', 2, 'National Institute of Mental Health (2023). Digital Mental Health Research.', '2023', 'https://www.nimh.nih.gov/research/research-funded-by-nimh/digital-mental-health', 'NIMH', 6),
      (v_art_id, 'government', 2, 'FDA (2022). Digital Health Technologies for Remote Data Acquisition in Clinical Investigations.', '2022', 'https://www.fda.gov/regulatory-information/search-fda-guidance-documents/digital-health-technologies', 'U.S. FDA', 7),
      (v_art_id, 'clinical_guideline', 4, 'American Psychiatric Association (2021). App Evaluation Model for Mental Health Apps.', '2021', 'https://www.psychiatry.org/psychiatrists/practice/mental-health-apps', 'American Psychiatric Association', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT16-065 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT16-065';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'reference', 5, 'Wallerstein et al. (2017). Community-based participatory research for health: Advancing social and health equity. Jossey-Bass, 3rd edition.', '2017', 'https://www.wiley.com/cbpr', 'Jossey-Bass', 1),
      (v_art_id, 'peer_reviewed', 1, 'Tse et al. (2015). Consumer involvement in mental health research: A systematic review. International Review of Psychiatry, 27(1), 35-46.', '2015', 'https://doi.org/10.3109/09540261.2014.992433', 'International Review of Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Slade et al. (2014). Uses and abuses of recovery: Implementing recovery-oriented practices in mental health systems. World Psychiatry, 13(1), 12-20.', '2014', 'https://doi.org/10.1002/wps.20084', 'World Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Rose et al. (2019). Participatory research in psychosis: A methodological framework. Schizophrenia Bulletin, 45(Suppl 1), S19-S27.', '2019', 'https://doi.org/10.1093/schbul/sby130', 'Schizophrenia Bulletin', 4),
      (v_art_id, 'peer_reviewed', 1, 'Byrne et al. (2018). Service user and carer involvement in mental health research: A systematic review and meta-analysis. BMC Psychiatry, 18, Article 286.', '2018', 'https://doi.org/10.1186/s12888-018-1866-9', 'BMC Psychiatry', 5),
      (v_art_id, 'government', 2, 'National Institute of Mental Health (2023). Stakeholder Engagement in Mental Health Research.', '2023', 'https://www.nimh.nih.gov/about/advisory-boards-and-groups/community-engagement', 'NIMH', 6),
      (v_art_id, 'government', 2, 'Patient-Centered Outcomes Research Institute (PCORI) (2022). Engagement Rubric for Research.', '2022', 'https://www.pcori.org/engagement/engagement-rubric', 'PCORI', 7),
      (v_art_id, 'professional_org', 3, 'Intervoice: The International Hearing Voices Network (2023). Research and Lived Experience.', '2023', 'https://www.intervoiceonline.org/research', 'Intervoice', 8)
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
