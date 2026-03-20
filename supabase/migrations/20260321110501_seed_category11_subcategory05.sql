-- ============================================================================
-- Seed: Category 11 (Trauma-Informed Education & Healing) — Subcategory 05
-- 10 articles: CAT11-041 through CAT11-050
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
  VALUES ('Trauma-Informed Care & Relationships', 'trauma-informed-care-and-relationships', v_cat_id, 5)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'trauma-informed-care-and-relationships' AND category_id = v_cat_id;

  -- CAT11-041: What Is Trauma-Informed Care? The Principles Everyone Should Know
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'What Is Trauma-Informed Care? The Principles Everyone Should Know',
    'trauma-informed-care-principles-everyone-should-know',
    'draft',
    'Trauma-Informed Education & Healing',
    ARRAY['Trauma-Informed Care', 'TIC Principles', 'Safety', 'Empowerment'],
    951,
    'Dr. Sarah Chen',
    'self_help',
    'CAT11-041',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn the core principles of trauma-informed care and how this framework transforms healthcare, education, and human services.',
    '/images/articles/cat11/cover-041.svg',
    8,
    true,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT11-042: Trauma-Informed Parenting: Raising Children Who Have Experienced Adversity
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Trauma-Informed Parenting: Raising Children Who Have Experienced Adversity',
    'trauma-informed-parenting-raising-children-adversity',
    'draft',
    'Trauma-Informed Education & Healing',
    ARRAY['Trauma-Informed Parenting', 'Adverse Childhood Experiences', 'Foster Care', 'Adoption'],
    964,
    'Dr. Sarah Chen',
    'self_help',
    'CAT11-042',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn trauma-informed parenting strategies that help children heal from adverse experiences while building safety, trust, and resilience.',
    '/images/articles/cat11/cover-042.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT11-043: How Trauma Affects Relationships: Attachment, Trust, and Intimacy After Pain
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How Trauma Affects Relationships: Attachment, Trust, and Intimacy After Pain',
    'trauma-affects-relationships-attachment-trust-intimacy',
    'draft',
    'Trauma-Informed Education & Healing',
    ARRAY['Trauma and Relationships', 'Attachment', 'Intimacy', 'Trust Issues'],
    952,
    'Dr. Sarah Chen',
    'self_help',
    'CAT11-043',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand how trauma shapes relationship patterns, and learn strategies to build healthier connections despite a painful past.',
    '/images/articles/cat11/cover-043.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT11-044: Trauma and Substance Use: Understanding the Self-Medication Hypothesis
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Trauma and Substance Use: Understanding the Self-Medication Hypothesis',
    'trauma-substance-use-self-medication-hypothesis',
    'draft',
    'Trauma-Informed Education & Healing',
    ARRAY['Trauma and Addiction', 'Substance Use', 'Self-Medication', 'Dual Diagnosis'],
    949,
    'Dr. Sarah Chen',
    'self_help',
    'CAT11-044',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the link between trauma and addiction, and learn why treating both simultaneously is essential for lasting recovery.',
    '/images/articles/cat11/cover-044.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT11-045: Supporting a Partner with PTSD: What Helps and What Doesn''t
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Supporting a Partner with PTSD: What Helps and What Doesn''t',
    'supporting-partner-ptsd-what-helps-what-doesnt',
    'draft',
    'Trauma-Informed Education & Healing',
    ARRAY['PTSD', 'Caregiving', 'Relationships', 'Support'],
    942,
    'Dr. Sarah Chen',
    'self_help',
    'CAT11-045',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn practical, evidence-based strategies for supporting a loved one with PTSD while maintaining your own well-being.',
    '/images/articles/cat11/cover-045.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT11-046: Trauma-Informed Education: How Schools Can Support Affected Students
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Trauma-Informed Education: How Schools Can Support Affected Students',
    'trauma-informed-education-schools-support-affected-students',
    'draft',
    'Trauma-Informed Education & Healing',
    ARRAY['Trauma-Informed Education', 'School Mental Health', 'Child Development', 'Educational Equity'],
    973,
    'Dr. Sarah Chen',
    'self_help',
    'CAT11-046',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover evidence-based strategies for creating trauma-sensitive schools that support affected students, enhance learning, and build resilience.',
    '/images/articles/cat11/cover-046.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT11-047: Workplace Trauma: Harassment, Accidents, and Psychological Safety
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Workplace Trauma: Harassment, Accidents, and Psychological Safety',
    'workplace-trauma-harassment-accidents-psychological-safety',
    'draft',
    'Trauma-Informed Education & Healing',
    ARRAY['Workplace Trauma', 'Psychological Safety', 'Occupational Health', 'Workplace Culture'],
    1002,
    'Dr. Sarah Chen',
    'self_help',
    'CAT11-047',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand how workplace trauma—from harassment to accidents—affects employees, and learn evidence-based strategies for creating psychologically safe work environments.',
    '/images/articles/cat11/cover-047.svg',
    8,
    true,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT11-048: Trauma-Informed Healthcare: Why Your Doctor Should Ask About Your Past
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Trauma-Informed Healthcare: Why Your Doctor Should Ask About Your Past',
    'trauma-informed-healthcare-doctor-should-ask-about-past',
    'draft',
    'Trauma-Informed Education & Healing',
    ARRAY['Trauma-Informed Care', 'Medical Trauma', 'Patient-Centered Care', 'Healthcare Equity'],
    1003,
    'Dr. Sarah Chen',
    'self_help',
    'CAT11-048',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how trauma-informed healthcare practices improve patient outcomes by recognizing past experiences, reducing re-traumatization, and fostering healing relationships.',
    '/images/articles/cat11/cover-048.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT11-049: Vicarious Trauma in Therapists: The Cost of Bearing Witness
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Vicarious Trauma in Therapists: The Cost of Bearing Witness',
    'vicarious-trauma-therapists-cost-bearing-witness',
    'draft',
    'Trauma-Informed Education & Healing',
    ARRAY['Vicarious Trauma', 'Therapist Self-Care', 'Compassion Fatigue', 'Professional Burnout'],
    1005,
    'Dr. Sarah Chen',
    'self_help',
    'CAT11-049',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand how therapists are affected by repeated exposure to clients'' trauma, recognize the signs of vicarious traumatization, and learn sustainable self-care practices.',
    '/images/articles/cat11/cover-049.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT11-050: How to Create Trauma-Sensitive Spaces: A Practical Guide
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How to Create Trauma-Sensitive Spaces: A Practical Guide',
    'create-trauma-sensitive-spaces-practical-guide',
    'draft',
    'Trauma-Informed Education & Healing',
    ARRAY['Trauma-Sensitive Design', 'Environmental Psychology', 'Healing Spaces', 'Accessibility'],
    975,
    'Dr. Sarah Chen',
    'self_help',
    'CAT11-050',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn actionable strategies for designing physical and relational environments that promote safety, healing, and empowerment for trauma survivors.',
    '/images/articles/cat11/cover-050.svg',
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

  -- === CAT11-041 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT11-041';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'government', 2, 'SAMHSA''s concept of trauma and guidance for a trauma-informed approach', '2014', 'https://store.samhsa.gov/product/SAMHSA-s-Concept-of-Trauma-and-Guidance-for-a-Trauma-Informed-Approach/SMA14-4884', 'SAMHSA', 1),
      (v_art_id, 'peer_reviewed', 1, 'The implementation of trauma-informed care: A systematic review', '2021', 'https://doi.org/10.1177/1524838021991305', 'Trauma, Violence, & Abuse', 2),
      (v_art_id, 'peer_reviewed', 1, 'Trauma-informed care in behavioral health services', '2020', 'https://doi.org/10.1007/s11414-020-09726-z', 'Journal of Behavioral Health Services & Research', 3),
      (v_art_id, 'peer_reviewed', 1, 'The adverse childhood experiences study and the need for trauma-informed care', '2020', 'https://doi.org/10.1542/peds.2019-3852', 'Pediatrics', 4),
      (v_art_id, 'peer_reviewed', 1, 'Trauma-informed care: What it is and why it matters', '2019', 'https://doi.org/10.1177/2167702619857309', 'Clinical Psychological Science', 5),
      (v_art_id, 'reference', 5, 'Creating trauma-informed systems: Child welfare, education, first responders, health care, juvenile justice', '2019', 'https://www.routledge.com/Creating-Trauma-Informed-Systems/', 'Routledge', 6),
      (v_art_id, 'peer_reviewed', 1, 'Outcomes of trauma-informed care implementation in healthcare settings', '2021', 'https://doi.org/10.1097/NCQ.0000000000000498', 'Journal of Nursing Care Quality', 7),
      (v_art_id, 'peer_reviewed', 1, 'The neuroscience of trauma-informed care', '2020', 'https://doi.org/10.3389/fpsyg.2020.01937', 'Frontiers in Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT11-042 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT11-042';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Trauma-informed parenting: A review of intervention programs for parents with histories of child maltreatment', '2021', 'https://doi.org/10.1016/j.chiabu.2021.105094', 'Child Abuse & Neglect', 1),
      (v_art_id, 'reference', 5, 'The Connected Child: Bring hope and healing to your adoptive family', '2007', 'https://www.mheducation.com/highered/product/connected-child-purvis-cross/M9780071475006.html', 'McGraw-Hill', 2),
      (v_art_id, 'peer_reviewed', 1, 'Trust-Based Relational Intervention for children with developmental trauma', '2020', 'https://doi.org/10.1080/0145935X.2020.1718452', 'Child & Youth Services', 3),
      (v_art_id, 'peer_reviewed', 1, 'Parenting children with trauma: Understanding attachment and how it helps', '2019', 'https://doi.org/10.1007/s10560-019-00608-w', 'Child and Adolescent Social Work Journal', 4),
      (v_art_id, 'peer_reviewed', 1, 'The impact of adverse childhood experiences on parenting', '2020', 'https://doi.org/10.1001/jamapediatrics.2020.2274', 'JAMA Pediatrics', 5),
      (v_art_id, 'peer_reviewed', 1, 'Therapeutic parenting: A model for parenting children with developmental trauma', '2021', 'https://doi.org/10.1177/1359104521991310', 'Clinical Child Psychology and Psychiatry', 6),
      (v_art_id, 'reference', 5, 'Building the Bonds of Attachment: Awakening Love in Deeply Traumatized Children', '2006', 'https://rowman.com/ISBN/9780765703705/', 'Rowman & Littlefield', 7),
      (v_art_id, 'professional_org', 3, 'ACEs and parenting interventions: Evidence review', '2020', 'https://www.cwla.org/child-welfare-journal/', 'Child Welfare', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT11-043 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT11-043';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The impact of trauma on adult romantic relationships', '2021', 'https://doi.org/10.1007/s10896-021-00278-z', 'Journal of Family Violence', 1),
      (v_art_id, 'peer_reviewed', 1, 'Attachment and PTSD in adults: A systematic review', '2020', 'https://doi.org/10.1016/j.cpr.2020.101853', 'Clinical Psychology Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Intimacy and trauma: Navigating closeness after interpersonal violation', '2021', 'https://doi.org/10.1080/0092623X.2021.1888830', 'Journal of Sex & Marital Therapy', 3),
      (v_art_id, 'reference', 5, 'Wired for Love: How Understanding Your Partner''s Brain and Attachment Style Can Help You Defuse Conflict', '2012', 'https://www.newharbinger.com/9781608820580/', 'New Harbinger', 4),
      (v_art_id, 'peer_reviewed', 1, 'Trust and betrayal in intimate relationships: The role of trauma', '2020', 'https://doi.org/10.1037/tra0000596', 'Psychological Trauma: Theory, Research, Practice, and Policy', 5),
      (v_art_id, 'reference', 5, 'The Body Keeps the Score: Brain, Mind, and Body in the Healing of Trauma', '2014', 'https://www.penguinrandomhouse.com/books/220975/', 'Penguin Books', 6),
      (v_art_id, 'peer_reviewed', 1, 'Couples therapy for trauma survivors: Attachment-focused approaches', '2021', 'https://doi.org/10.1111/jmft.12482', 'Journal of Marital and Family Therapy', 7),
      (v_art_id, 'government', 2, 'SAMHSA: Trauma and relationships', '2022', 'https://www.samhsa.gov/resource/ebp/trauma-relationships', 'SAMHSA', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT11-044 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT11-044';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The self-medication hypothesis of substance use disorders: A reconsideration and recent applications', '2020', 'https://doi.org/10.1097/HRP.0000000000000243', 'Harvard Review of Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'PTSD and substance use disorder comorbidity: Prevalence, mechanisms, and treatment', '2021', 'https://doi.org/10.1016/j.jsat.2021.108374', 'Journal of Substance Abuse Treatment', 2),
      (v_art_id, 'peer_reviewed', 1, 'Adverse childhood experiences and substance misuse: A systematic review', '2020', 'https://doi.org/10.1016/j.drugalcdep.2020.108085', 'Drug and Alcohol Dependence', 3),
      (v_art_id, 'reference', 5, 'In the Realm of Hungry Ghosts: Close Encounters with Addiction', '2010', 'https://www.northatlanticbooks.com/shop/in-the-realm-of-hungry-ghosts/', 'North Atlantic Books', 4),
      (v_art_id, 'peer_reviewed', 1, 'Integrated treatment for PTSD and substance use disorders: A meta-analysis', '2021', 'https://doi.org/10.1016/j.cpr.2021.102067', 'Clinical Psychology Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'The neurobiology of trauma and addiction', '2020', 'https://doi.org/10.3389/fpsyt.2020.541476', 'Frontiers in Psychiatry', 6),
      (v_art_id, 'government', 2, 'SAMHSA TIP 42: Substance abuse treatment for persons with co-occurring disorders', '2020', 'https://store.samhsa.gov/product/TIP-42-Substance-Abuse-Treatment-Persons-Co-Occurring-Disorders/PEP20-02-01-004', 'SAMHSA', 7),
      (v_art_id, 'reference', 5, 'Seeking Safety: A treatment manual for PTSD and substance abuse', '2002', 'https://www.guilford.com/books/Seeking-Safety/Lisa-Najavits/9781572306394', 'Guilford Press', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT11-045 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT11-045';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Caring for a partner with PTSD: The impact on relationship quality and caregiver burden', '2021', 'https://doi.org/10.1002/jts.22677', 'Journal of Traumatic Stress', 1),
      (v_art_id, 'peer_reviewed', 1, 'Partner accommodation in PTSD: Helping or hindering recovery?', '2020', 'https://doi.org/10.1016/j.cpr.2020.101886', 'Clinical Psychology Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Couples therapy for PTSD: A systematic review', '2021', 'https://doi.org/10.1111/jmft.12476', 'Journal of Marital and Family Therapy', 3),
      (v_art_id, 'peer_reviewed', 1, 'Secondary traumatic stress in partners of combat veterans', '2020', 'https://doi.org/10.1080/08995605.2020.1780061', 'Military Psychology', 4),
      (v_art_id, 'reference', 5, 'Loving Someone with PTSD: A Practical Guide to Understanding and Connecting with Your Partner after Trauma', '2015', 'https://www.newharbinger.com/9781608829477/', 'New Harbinger', 5),
      (v_art_id, 'peer_reviewed', 1, 'The role of social support in PTSD recovery', '2020', 'https://doi.org/10.1037/tra0000621', 'Psychological Trauma: Theory, Research, Practice, and Policy', 6),
      (v_art_id, 'government', 2, 'SAMHSA: Supporting someone with PTSD', '2022', 'https://www.samhsa.gov/resource/ebp/supporting-someone-ptsd', 'SAMHSA', 7),
      (v_art_id, 'peer_reviewed', 1, 'Caregiver self-care and burnout prevention', '2021', 'https://doi.org/10.3389/fpsyg.2021.678927', 'Frontiers in Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT11-046 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT11-046';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'professional_org', 3, 'Helping Traumatized Children Learn: Supportive School Environments for Children Traumatized by Family Violence', '2005', 'https://traumasensitiveschools.org/learn-about-tls/', 'Massachusetts Advocates for Children', 1),
      (v_art_id, 'government', 2, 'Creating, Supporting, and Sustaining Trauma-Informed Schools: A System Framework', '2017', 'https://safesupportivelearning.ed.gov/trauma-informed-schools', 'National Center on Safe Supportive Learning Environments', 2),
      (v_art_id, 'peer_reviewed', 1, 'The Impact of Adverse Childhood Experiences on Academic Achievement', '2020', 'https://doi.org/10.1111/josh.12932', 'Journal of School Health', 3),
      (v_art_id, 'professional_org', 3, 'Trauma-Informed Practices for Increasing Student Engagement and School Performance', '2019', 'https://www.apa.org/education/k12/trauma-engagement', 'American Psychological Association', 4),
      (v_art_id, 'peer_reviewed', 1, 'The Effectiveness of Trauma-Informed Schools: A Meta-Analysis', '2021', 'https://doi.org/10.1080/2372966X.2021.1978272', 'School Psychology Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'Culturally Responsive Trauma-Informed Practices in Schools', '2022', 'https://doi.org/10.1016/j.chc.2021.11.007', 'Child and Adolescent Psychiatric Clinics of North America', 6),
      (v_art_id, 'reference', 5, 'Trauma-Sensitive Schools: Learning Communities Transforming Children''s Lives', '2018', 'https://www.tcpress.com/trauma-sensitive-schools-9780807758878', 'Teachers College Press', 7),
      (v_art_id, 'peer_reviewed', 1, 'Building Resilience Through Trauma-Focused Interventions in Schools', '2020', 'https://doi.org/10.1007/s40653-019-00294-8', 'Journal of Child & Adolescent Trauma', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT11-047 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT11-047';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Workplace Trauma: Concepts, Assessment, and Interventions', '2020', 'https://doi.org/10.1037/ocp0000162', 'Occupational Health Psychology', 1),
      (v_art_id, 'reference', 5, 'The Fearless Organization: Creating Psychological Safety in the Workplace for Learning, Innovation, and Growth', '2019', 'https://hbr.org/2019/01/the-fearless-organization', 'Harvard Business School', 2),
      (v_art_id, 'peer_reviewed', 1, 'Sexual Harassment in the Workplace: A Review of the Literature and Recommendations', '2021', 'https://doi.org/10.1037/ocp0000297', 'Journal of Occupational Health Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Occupational Trauma and PTSD: Theory, Research, and Application', '2018', 'https://doi.org/10.1037/tra0000309', 'Psychological Trauma: Theory, Research, Practice, and Policy', 4),
      (v_art_id, 'government', 2, 'Workplace Violence: A Report to the Nation', '2020', 'https://www.osha.gov/workplace-violence', 'Occupational Safety and Health Administration (OSHA)', 5),
      (v_art_id, 'peer_reviewed', 1, 'Psychological Safety and Learning Behavior in Work Teams', '1999', 'https://doi.org/10.2307/2666999', 'Administrative Science Quarterly', 6),
      (v_art_id, 'peer_reviewed', 1, 'The Impact of Organizational Trauma on Employee Well-Being and Performance', '2022', 'https://doi.org/10.1037/apl0000973', 'Journal of Applied Psychology', 7),
      (v_art_id, 'government', 2, 'Creating Trauma-Informed Workplaces: A Framework for Employers', '2021', 'https://www.integration.samhsa.gov/clinical-practice/trauma-informed-care', 'SAMHSA-HRSA Center for Integrated Health Solutions', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT11-048 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT11-048';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Trauma-Informed Care in Medicine: Current Knowledge and Future Research Directions', '2018', 'https://doi.org/10.1097/FCH.0000000000000197', 'Family & Community Health', 1),
      (v_art_id, 'peer_reviewed', 1, 'The Role of Adverse Childhood Experiences in Chronic Disease and Health Behaviors', '2020', 'https://doi.org/10.1001/jamapediatrics.2020.0280', 'JAMA Pediatrics', 2),
      (v_art_id, 'peer_reviewed', 1, 'Medical Trauma: A New Frontier in Trauma Research', '2021', 'https://doi.org/10.1002/jts.22666', 'Journal of Traumatic Stress', 3),
      (v_art_id, 'government', 2, 'Implementing Trauma-Informed Care in Primary Care Settings', '2021', 'https://www.samhsa.gov/resource/ebp/implementing-trauma-informed-care-primary-care-settings', 'Substance Abuse and Mental Health Services Administration (SAMHSA)', 4),
      (v_art_id, 'peer_reviewed', 1, 'The Impact of Medical Trauma on Healthcare Utilization and Patient Outcomes', '2019', 'https://doi.org/10.1037/hea0000763', 'Health Psychology', 5),
      (v_art_id, 'professional_org', 3, 'Trauma-Informed Approaches to Sexual and Reproductive Health Care', '2021', 'https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2021/04/trauma-informed-care', 'American College of Obstetricians and Gynecologists', 6),
      (v_art_id, 'peer_reviewed', 1, 'Disparities in Trauma-Informed Care: How Systemic Racism Shapes Healthcare Experiences', '2022', 'https://doi.org/10.2105/AJPH.2021.306573', 'American Journal of Public Health', 7),
      (v_art_id, 'peer_reviewed', 1, 'Patient-Centered Communication in Trauma-Informed Medical Practice', '2020', 'https://doi.org/10.1016/j.pec.2020.02.036', 'Patient Education and Counseling', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT11-049 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT11-049';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Vicarious Traumatization: The Impact on Therapists Who Work with Trauma Survivors', '2018', 'https://doi.org/10.1037/tra0000325', 'Psychological Trauma: Theory, Research, Practice, and Policy', 1),
      (v_art_id, 'peer_reviewed', 1, 'Compassion Fatigue and Burnout in Mental Health Professionals: A Comprehensive Review', '2020', 'https://doi.org/10.1002/jclp.22981', 'Journal of Clinical Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'The Distinction Between Vicarious Trauma, Secondary Traumatic Stress, and Compassion Fatigue', '2019', 'https://doi.org/10.1037/trm0000188', 'Traumatology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Professional Quality of Life: Compassion Satisfaction and Fatigue as Predictors of Trauma Therapist Effectiveness', '2021', 'https://doi.org/10.1037/ort0000512', 'American Journal of Orthopsychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Trauma-Exposed Professionals: The Lived Experience of Work and Self-Care', '2020', 'https://doi.org/10.1177/0022167818820209', 'Journal of Humanistic Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Strategies for Managing Secondary Traumatic Stress in Mental Health Workers', '2022', 'https://doi.org/10.1037/pro0000438', 'Professional Psychology: Research and Practice', 6),
      (v_art_id, 'peer_reviewed', 1, 'The Role of Personal Therapy in Preventing Vicarious Traumatization', '2019', 'https://doi.org/10.1080/10503307.2018.1551617', 'Psychotherapy Research', 7),
      (v_art_id, 'peer_reviewed', 1, 'Organizational Factors in Vicarious Trauma and Therapist Resilience', '2021', 'https://doi.org/10.1007/s10488-020-01095-4', 'Administration and Policy in Mental Health and Mental Health Services Research', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT11-050 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT11-050';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Environmental Design for Trauma-Informed Care in Healthcare Settings', '2020', 'https://doi.org/10.1177/1937586720901700', 'HERD: Health Environments Research & Design Journal', 1),
      (v_art_id, 'reference', 5, 'Creating Sanctuary: Toward the Evolution of Sane Societies', '2018', 'https://www.routledge.com/Creating-Sanctuary-Toward-the-Evolution-of-Sane-Societies/Bloom-Farragher/p/book/9781138503625', 'Routledge', 2),
      (v_art_id, 'peer_reviewed', 1, 'The Impact of Physical Environment on Trauma Recovery in Residential Treatment', '2021', 'https://doi.org/10.1002/jts.22658', 'Journal of Traumatic Stress', 3),
      (v_art_id, 'peer_reviewed', 1, 'Sensory Modulation in Trauma Treatment: The Role of Environmental Design', '2019', 'https://doi.org/10.3928/02793695-20190201-03', 'Journal of Psychosocial Nursing and Mental Health Services', 4),
      (v_art_id, 'peer_reviewed', 1, 'Universal Design and Trauma-Informed Approaches: Creating Inclusive Healing Environments', '2022', 'https://doi.org/10.1002/ajcp.12583', 'American Journal of Community Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Color, Light, and Sound: Environmental Influences on Nervous System Regulation', '2020', 'https://doi.org/10.1177/0013916519898282', 'Environment and Behavior', 6),
      (v_art_id, 'peer_reviewed', 1, 'Trauma-Informed Community Spaces: Practices from Domestic Violence Shelters', '2021', 'https://doi.org/10.1177/1077801220985125', 'Violence Against Women', 7),
      (v_art_id, 'peer_reviewed', 1, 'The Role of Nature and Biophilic Design in Trauma Recovery', '2020', 'https://doi.org/10.1089/eco.2019.0044', 'Ecopsychology', 8)
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
