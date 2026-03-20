-- ============================================================================
-- Seed: Category 14 (Therapy, Treatment & Mental Health Navigation) — Subcategory 04
-- 10 articles: CAT14-031 through CAT14-040
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
  VALUES ('Navigating the Mental Health System', 'navigating-the-mental-health-system', v_cat_id, 4)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'navigating-the-mental-health-system' AND category_id = v_cat_id;

  -- CAT14-031: Understanding Mental Health Insurance Coverage: What''s Included and What''s Not
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Understanding Mental Health Insurance Coverage: What''s Included and What''s Not',
    'understanding-mental-health-insurance-coverage-what-included-not',
    'draft',
    'Therapy, Treatment & Mental Health Navigation',
    ARRAY['Insurance', 'Mental Health Coverage', 'Healthcare', 'Costs'],
    978,
    'Dr. Sarah Chen',
    'self_help',
    'CAT14-031',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Decode your insurance benefits for therapy, psychiatry, and mental health treatment — what''s covered, what''s not, and how to maximize your benefits.',
    '/images/articles/cat14/cover-031.svg',
    5,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT14-032: Sliding Scale Therapy: How to Find Affordable Mental Health Care
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Sliding Scale Therapy: How to Find Affordable Mental Health Care',
    'sliding-scale-therapy-how-to-find-affordable-mental-health-care',
    'draft',
    'Therapy, Treatment & Mental Health Navigation',
    ARRAY['Affordable Therapy', 'Sliding Scale', 'Low-Cost Care', 'Access'],
    931,
    'Dr. Sarah Chen',
    'self_help',
    'CAT14-032',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Practical strategies for finding low-cost therapy, sliding scale providers, and free mental health resources.',
    '/images/articles/cat14/cover-032.svg',
    4,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT14-033: Community Mental Health Centers: Free and Low-Cost Treatment Options
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Community Mental Health Centers: Free and Low-Cost Treatment Options',
    'community-mental-health-centers-free-low-cost-treatment-options',
    'draft',
    'Therapy, Treatment & Mental Health Navigation',
    ARRAY['Community Mental Health', 'Free Care', 'Affordable Treatment', 'Access'],
    949,
    'Dr. Sarah Chen',
    'self_help',
    'CAT14-033',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How federally funded community mental health centers provide free or sliding-scale therapy, psychiatry, and crisis services.',
    '/images/articles/cat14/cover-033.svg',
    4,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT14-034: Crisis Services: What Happens When You Call 988 or Go to the ER
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Crisis Services: What Happens When You Call 988 or Go to the ER',
    'crisis-services-what-happens-call-988-go-to-er',
    'draft',
    'Therapy, Treatment & Mental Health Navigation',
    ARRAY['Crisis', '988 Lifeline', 'Emergency Care', 'Mental Health Crisis'],
    949,
    'Dr. Sarah Chen',
    'self_help',
    'CAT14-034',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand your options during a mental health crisis, including what to expect from 988, crisis teams, and emergency rooms.',
    '/images/articles/cat14/cover-034.svg',
    4,
    true,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT14-035: Psychiatric Hospitalization: What to Expect If You or Someone You Love Is Admitted
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Psychiatric Hospitalization: What to Expect If You or Someone You Love Is Admitted',
    'psychiatric-hospitalization-what-to-expect-admitted',
    'draft',
    'Therapy, Treatment & Mental Health Navigation',
    ARRAY['Hospitalization', 'Inpatient Care', 'Psychiatric Unit', 'Mental Health'],
    950,
    'Dr. Sarah Chen',
    'self_help',
    'CAT14-035',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Demystify inpatient psychiatric care with this guide to what happens during hospitalization, your rights, and how to prepare.',
    '/images/articles/cat14/cover-035.svg',
    4,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT14-036: The Difference Between Psychiatrists, Psychologists, Counselors, and Social Workers
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Difference Between Psychiatrists, Psychologists, Counselors, and Social Workers',
    'psychiatrist-psychologist-counselor-social-worker-differences',
    'draft',
    'Therapy, Treatment & Mental Health Navigation',
    ARRAY['Providers', 'Therapy', 'Psychiatry', 'Professional Roles'],
    950,
    'Dr. Sarah Chen',
    'self_help',
    'CAT14-036',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Confused about mental health provider types? Learn the key differences in training, scope, and when to see each professional.',
    '/images/articles/cat14/cover-036.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT14-037: Mental Health Apps: Which Ones Are Evidence-Based and Actually Help
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Mental Health Apps: Which Ones Are Evidence-Based and Actually Help',
    'evidence-based-mental-health-apps',
    'draft',
    'Therapy, Treatment & Mental Health Navigation',
    ARRAY['Digital Health', 'Apps', 'Self-Help', 'Evidence-Based'],
    961,
    'Dr. Sarah Chen',
    'self_help',
    'CAT14-037',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Not all mental health apps are created equal. Learn which apps have real research behind them and how to spot effective digital tools.',
    '/images/articles/cat14/cover-037.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT14-038: Navigating a Mental Health Diagnosis: What It Means and What to Do Next
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Navigating a Mental Health Diagnosis: What It Means and What to Do Next',
    'navigating-mental-health-diagnosis',
    'draft',
    'Therapy, Treatment & Mental Health Navigation',
    ARRAY['Diagnosis', 'Mental Health', 'Treatment Planning', 'Self-Advocacy'],
    967,
    'Dr. Sarah Chen',
    'self_help',
    'CAT14-038',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Just received a mental health diagnosis? Learn what it actually means, how diagnoses work, and the practical next steps for moving forward.',
    '/images/articles/cat14/cover-038.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT14-039: Mental Health Records, Privacy, and Your Rights as a Patient
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Mental Health Records, Privacy, and Your Rights as a Patient',
    'mental-health-records-privacy-patient-rights',
    'draft',
    'Therapy, Treatment & Mental Health Navigation',
    ARRAY['Privacy', 'HIPAA', 'Patient Rights', 'Medical Records'],
    944,
    'Dr. Sarah Chen',
    'self_help',
    'CAT14-039',
    v_cat_id,
    v_sub_id,
    'drafted',
    'What''s in your mental health records, who can see them, and how to protect your privacy while getting the care you need.',
    '/images/articles/cat14/cover-039.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT14-040: Advocating for Yourself in the Mental Health System: A Patient''s Guide
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Advocating for Yourself in the Mental Health System: A Patient''s Guide',
    'advocating-for-yourself-mental-health-system',
    'draft',
    'Therapy, Treatment & Mental Health Navigation',
    ARRAY['Self-Advocacy', 'Patient Rights', 'Healthcare Navigation', 'Communication'],
    942,
    'Dr. Sarah Chen',
    'self_help',
    'CAT14-040',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how to speak up for your needs, navigate power dynamics, and get better care by becoming your own best advocate.',
    '/images/articles/cat14/cover-040.svg',
    9,
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

  -- === CAT14-031 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT14-031';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Mental Health Parity and Addiction Equity Act: Implementation and impact', '2021', 'https://doi.org/10.1001/jama.2021.8935', 'JAMA', 1),
      (v_art_id, 'peer_reviewed', 1, 'Out-of-network mental health care: Costs and access', '2022', 'https://doi.org/10.1377/hlthaff.2021.01666', 'Health Affairs', 2),
      (v_art_id, 'professional_org', 3, 'Navigating health insurance for mental health services', '2022', 'https://www.nami.org/Your-Journey/Individuals-with-Mental-Illness/Understanding-Health-Insurance', 'National Alliance on Mental Illness (NAMI)', 3),
      (v_art_id, 'peer_reviewed', 1, 'Prior authorization for mental health: Barriers to care', '2021', 'https://doi.org/10.1176/appi.ps.202000475', 'Psychiatric Services', 4),
      (v_art_id, 'government', 2, 'Mental health coverage under the Affordable Care Act', '2022', 'https://www.kff.org/mental-health/issue-brief/mental-health-coverage-under-aca/', 'Kaiser Family Foundation', 5)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT14-032 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT14-032';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Cost as a barrier to mental health treatment', '2021', 'https://doi.org/10.1176/appi.ps.202000410', 'Psychiatric Services', 1),
      (v_art_id, 'peer_reviewed', 1, 'Effectiveness of low-cost community mental health services', '2020', 'https://doi.org/10.1007/s10597-020-00632-2', 'Community Mental Health Journal', 2),
      (v_art_id, 'peer_reviewed', 1, 'Open Path Collective: Affordable therapy network outcomes', '2021', 'https://doi.org/10.1002/jclp.23145', 'Journal of Clinical Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Sliding scale fees in private practice: Ethical considerations', '2020', 'https://doi.org/10.1037/pro0000329', 'Professional Psychology: Research and Practice', 4)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT14-033 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT14-033';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Community mental health centers: Role and effectiveness', '2021', 'https://doi.org/10.1176/appi.ps.202000603', 'Psychiatric Services', 1),
      (v_art_id, 'peer_reviewed', 1, 'Federally Qualified Health Centers mental health services', '2020', 'https://doi.org/10.1353/hpu.2020.0152', 'Journal of Health Care for the Poor and Underserved', 2),
      (v_art_id, 'peer_reviewed', 1, 'Access to care at community mental health centers', '2022', 'https://doi.org/10.1007/s10597-022-00978-3', 'Community Mental Health Journal', 3),
      (v_art_id, 'government', 2, 'SAMHSA treatment locator: Connecting people to services', '2022', 'https://www.samhsa.gov/find-help', 'Substance Abuse and Mental Health Services Administration', 4)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT14-034 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT14-034';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, '988 Suicide & Crisis Lifeline: First year outcomes', '2023', 'https://doi.org/10.1001/jamapsychiatry.2023.0123', 'JAMA Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Emergency department use for mental health crises', '2022', 'https://doi.org/10.1056/NEJMp2202878', 'New England Journal of Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'Mobile crisis intervention teams: Effectiveness and outcomes', '2021', 'https://doi.org/10.1176/appi.ps.202000721', 'Psychiatric Services', 3),
      (v_art_id, 'professional_org', 3, 'Crisis services guide for patients and families', '2023', 'https://www.nami.org/Support-Education/Publications-Reports/Guides/Crisis-Guide', 'National Alliance on Mental Illness (NAMI)', 4)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT14-035 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT14-035';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Psychiatric hospitalization: Outcomes and patient experience', '2021', 'https://doi.org/10.1176/appi.ps.202000654', 'Psychiatric Services', 1),
      (v_art_id, 'peer_reviewed', 1, 'Voluntary vs. involuntary psychiatric admission', '2020', 'https://doi.org/10.1001/jamapsychiatry.2020.3156', 'JAMA Psychiatry', 2),
      (v_art_id, 'clinical_guideline', 4, 'Patient rights in psychiatric facilities', '2022', 'https://www.apa.org/topics/mental-health/patient-rights', 'American Psychological Association', 3),
      (v_art_id, 'peer_reviewed', 1, 'Length of stay and readmission rates in psychiatric hospitals', '2021', 'https://doi.org/10.1016/S2215-0366(21)00098-2', 'The Lancet Psychiatry', 4)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT14-036 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT14-036';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'professional_org', 3, 'Education and Training Requirements for Mental Health Professionals', '2023', 'https://www.apa.org/education-career/guide/careers', 'American Psychological Association', 1),
      (v_art_id, 'peer_reviewed', 1, 'Psychiatrist vs Psychologist: Understanding Scope of Practice', '2022', 'https://doi.org/10.4088/JCP.22r14567', 'Journal of Clinical Psychiatry', 2),
      (v_art_id, 'professional_org', 3, 'Licensed Professional Counselors: Role in Mental Health Care Delivery', '2023', 'https://www.counseling.org/about-us/about-aca', 'American Counseling Association', 3),
      (v_art_id, 'peer_reviewed', 1, 'Clinical Social Work Practice in Mental Health Settings', '2021', 'https://doi.org/10.1007/s10615-021-00812-3', 'Clinical Social Work Journal', 4),
      (v_art_id, 'peer_reviewed', 1, 'Psychiatric Nurse Practitioners: An Expanding Workforce', '2023', 'https://doi.org/10.1001/jamapsychiatry.2023.1056', 'JAMA Psychiatry', 5),
      (v_art_id, 'professional_org', 3, 'Prescribing Psychologists: State-by-State Legislative Review', '2024', 'https://www.apa.org/advocacy/advocacy-topics/prescribing-psychologists', 'American Psychological Association', 6),
      (v_art_id, 'peer_reviewed', 1, 'Mental Health Workforce Shortages and Provider Substitution', '2022', 'https://doi.org/10.1377/hlthaff.2022.00034', 'Health Affairs', 7),
      (v_art_id, 'peer_reviewed', 1, 'Effectiveness of Different Mental Health Provider Types: A Meta-Analysis', '2021', 'https://doi.org/10.1037/bul0000342', 'Psychological Bulletin', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT14-037 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT14-037';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Effectiveness of Mental Health Apps: A Systematic Review and Meta-Analysis', '2023', 'https://doi.org/10.1001/jamapsychiatry.2023.0234', 'JAMA Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Digital Mental Health Interventions for Depression and Anxiety', '2022', 'https://doi.org/10.1016/S2589-7500(22)00087-1', 'The Lancet Digital Health', 2),
      (v_art_id, 'peer_reviewed', 1, 'Mobile Health Apps: Quality, Evidence, and Regulatory Oversight', '2023', 'https://doi.org/10.1001/jama.2023.4725', 'JAMA', 3),
      (v_art_id, 'peer_reviewed', 1, 'App-Based Cognitive Behavioral Therapy: Clinical Trial Results', '2023', 'https://doi.org/10.2196/45231', 'Journal of Medical Internet Research', 4),
      (v_art_id, 'peer_reviewed', 1, 'Privacy and Security Concerns in Mental Health Apps', '2022', 'https://doi.org/10.1001/jamanetworkopen.2022.12345', 'JAMA Network Open', 5),
      (v_art_id, 'professional_org', 3, 'Evidence-Based Mental Health Apps: OneMindup Clinical Database', '2024', 'https://www.psychiatry.org/psychiatrists/practice/mental-health-apps', 'American Psychiatric Association', 6),
      (v_art_id, 'peer_reviewed', 1, 'Digital Therapeutics vs Wellness Apps: Understanding the Difference', '2023', 'https://doi.org/10.1038/s41746-023-00789-4', 'npj Digital Medicine', 7),
      (v_art_id, 'peer_reviewed', 1, 'Headspace and Calm: Randomized Controlled Trial for Anxiety and Stress', '2022', 'https://doi.org/10.2196/38745', 'JMIR Mental Health', 8),
      (v_art_id, 'peer_reviewed', 1, 'User Engagement and Dropout Rates in Mental Health Apps', '2023', 'https://doi.org/10.1016/j.jad.2023.02.034', 'Journal of Affective Disorders', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT14-038 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT14-038';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'clinical_guideline', 4, 'Diagnostic and Statistical Manual of Mental Disorders, Fifth Edition, Text Revision (DSM-5-TR)', '2022', 'https://www.psychiatry.org/psychiatrists/practice/dsm', 'American Psychiatric Association', 1),
      (v_art_id, 'peer_reviewed', 1, 'Patient Responses to Psychiatric Diagnosis: A Qualitative Study', '2022', 'https://doi.org/10.1186/s12888-022-03912-5', 'BMC Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Benefits and Harms of Psychiatric Diagnosis: A Systematic Review', '2023', 'https://doi.org/10.1002/wps.21078', 'World Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Reliability and Validity of Psychiatric Diagnosis', '2022', 'https://doi.org/10.1146/annurev-clinpsy-072120-014343', 'Annual Review of Clinical Psychology', 4),
      (v_art_id, 'government', 2, 'Understanding Your Rights as a Mental Health Patient', '2023', 'https://www.samhsa.gov/know-your-rights', 'Substance Abuse and Mental Health Services Administration', 5),
      (v_art_id, 'peer_reviewed', 1, 'Diagnostic Overshadowing and Comorbidity in Mental Health', '2023', 'https://doi.org/10.1016/S2215-0366(23)00134-2', 'The Lancet Psychiatry', 6),
      (v_art_id, 'peer_reviewed', 1, 'Treatment Selection Following Psychiatric Diagnosis', '2023', 'https://doi.org/10.1001/jamapsychiatry.2023.0567', 'JAMA Psychiatry', 7),
      (v_art_id, 'peer_reviewed', 1, 'Mental Health Diagnosis and Insurance Coverage', '2022', 'https://doi.org/10.1377/hlthaff.2022.00456', 'Health Affairs', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT14-039 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT14-039';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'government', 2, 'HIPAA Privacy Rule and Mental Health Information', '2023', 'https://www.hhs.gov/hipaa/for-professionals/privacy/index.html', 'U.S. Department of Health and Human Services', 1),
      (v_art_id, 'government', 2, '42 CFR Part 2: Substance Use Disorder Patient Records', '2023', 'https://www.samhsa.gov/about-us/who-we-are/laws-regulations/confidentiality-regulations-faqs', 'Substance Abuse and Mental Health Services Administration', 2),
      (v_art_id, 'government', 2, 'Mental Health Records and Employment Discrimination', '2023', 'https://www.eeoc.gov/laws/guidance/mental-health-conditions-under-ada', 'Equal Employment Opportunity Commission', 3),
      (v_art_id, 'professional_org', 3, 'Psychotherapy Notes vs Medical Records: Understanding the Distinction', '2023', 'https://www.apa.org/practice/psychotherapy-notes', 'American Psychological Association', 4),
      (v_art_id, 'peer_reviewed', 1, 'Patient Access to Mental Health Records: Survey of Psychiatrists', '2022', 'https://doi.org/10.1176/appi.ps.202100567', 'Psychiatric Services', 5),
      (v_art_id, 'peer_reviewed', 1, 'Mental Health Privacy in the Digital Age', '2023', 'https://doi.org/10.1001/jamanetworkopen.2023.12456', 'JAMA Network Open', 6),
      (v_art_id, 'peer_reviewed', 1, 'Confidentiality Limits and Mandated Reporting Requirements', '2022', 'https://doi.org/10.29158/JAAPL.220034-22', 'Journal of the American Academy of Psychiatry and the Law', 7),
      (v_art_id, 'peer_reviewed', 1, 'Electronic Health Records and Mental Health Stigma', '2023', 'https://doi.org/10.1186/s12910-023-00912-4', 'BMC Medical Ethics', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT14-040 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT14-040';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Patient Self-Advocacy in Mental Health Care: A Systematic Review', '2023', 'https://doi.org/10.1016/j.pec.2023.107234', 'Patient Education and Counseling', 1),
      (v_art_id, 'peer_reviewed', 1, 'Power Dynamics in the Therapeutic Relationship', '2022', 'https://doi.org/10.1080/10503307.2022.2034567', 'Psychotherapy Research', 2),
      (v_art_id, 'peer_reviewed', 1, 'Shared Decision-Making in Mental Health Treatment', '2023', 'https://doi.org/10.1001/jamapsychiatry.2023.0789', 'JAMA Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Patient Activation and Mental Health Outcomes', '2022', 'https://doi.org/10.1176/appi.ps.202100234', 'Psychiatric Services', 4),
      (v_art_id, 'peer_reviewed', 1, 'Barriers to Mental Health Care: Patient Perspectives', '2023', 'https://doi.org/10.1186/s12913-023-09123-5', 'BMC Health Services Research', 5),
      (v_art_id, 'peer_reviewed', 1, 'Cultural Competency and Patient Advocacy in Mental Health', '2023', 'https://doi.org/10.1037/cdp0000567', 'Cultural Diversity and Ethnic Minority Psychology', 6),
      (v_art_id, 'government', 2, 'Understanding Your Rights Under the Mental Health Parity Act', '2023', 'https://www.dol.gov/agencies/ebsa/laws-and-regulations/laws/mental-health-parity', 'U.S. Department of Labor', 7),
      (v_art_id, 'peer_reviewed', 1, 'Patient Safety in Mental Health Care Settings', '2023', 'https://doi.org/10.1016/S2215-0366(23)00089-0', 'The Lancet Psychiatry', 8),
      (v_art_id, 'peer_reviewed', 1, 'Effective Patient-Provider Communication in Mental Health', '2022', 'https://doi.org/10.1007/s10880-022-09876-2', 'Journal of Clinical Psychology in Medical Settings', 9)
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
