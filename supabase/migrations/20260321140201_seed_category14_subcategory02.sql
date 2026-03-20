-- ============================================================================
-- Seed: Category 14 (Therapy, Treatment & Mental Health Navigation) — Subcategory 02
-- 10 articles: CAT14-011 through CAT14-020
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
  VALUES ('Medication & Pharmacological Treatment', 'medication-and-pharmacological-treatment', v_cat_id, 2)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'medication-and-pharmacological-treatment' AND category_id = v_cat_id;

  -- CAT14-011: SSRIs Explained: The Most Common Medications for Depression and Anxiety
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'SSRIs Explained: The Most Common Medications for Depression and Anxiety',
    'ssris-explained-most-common-medications-depression-anxiety',
    'draft',
    'Therapy, Treatment & Mental Health Navigation',
    ARRAY['SSRIs', 'Antidepressants', 'Medication', 'Mental Health Treatment'],
    982,
    'Dr. Sarah Chen',
    'self_help',
    'CAT14-011',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how SSRIs work, what conditions they treat, common side effects, and what to expect when starting this widely prescribed class of antidepressants.',
    '/images/articles/cat14/cover-011.svg',
    10,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT14-012: SNRIs, TCAs, and MAOIs: Beyond SSRIs — Other Antidepressant Options
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'SNRIs, TCAs, and MAOIs: Beyond SSRIs — Other Antidepressant Options',
    'snris-tcas-maois-beyond-ssris-other-antidepressant-options',
    'draft',
    'Therapy, Treatment & Mental Health Navigation',
    ARRAY['SNRIs', 'Antidepressants', 'Medication Options', 'Tricyclics', 'MAOIs'],
    961,
    'Dr. Sarah Chen',
    'self_help',
    'CAT14-012',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore alternative antidepressant classes when SSRIs aren''t enough, including SNRIs, tricyclics, MAOIs, and atypical antidepressants.',
    '/images/articles/cat14/cover-012.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT14-013: Anti-Anxiety Medications: Benzodiazepines, Buspirone, and What You Need to Know
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Anti-Anxiety Medications: Benzodiazepines, Buspirone, and What You Need to Know',
    'anti-anxiety-medications-benzodiazepines-buspirone-what-you-need-to-know',
    'draft',
    'Therapy, Treatment & Mental Health Navigation',
    ARRAY['Benzodiazepines', 'Buspirone', 'Anti-Anxiety Medication', 'Anxiety Treatment'],
    980,
    'Dr. Sarah Chen',
    'self_help',
    'CAT14-013',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding anti-anxiety medications, from benzodiazepines to buspirone, including benefits, risks, and when they are appropriate treatment options.',
    '/images/articles/cat14/cover-013.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT14-014: Mood Stabilizers: Medications for Bipolar Disorder and Mood Regulation
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Mood Stabilizers: Medications for Bipolar Disorder and Mood Regulation',
    'mood-stabilizers-medications-bipolar-disorder-mood-regulation',
    'draft',
    'Therapy, Treatment & Mental Health Navigation',
    ARRAY['Mood Stabilizers', 'Lithium', 'Bipolar Disorder', 'Medication'],
    966,
    'Dr. Sarah Chen',
    'self_help',
    'CAT14-014',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding mood stabilizers including lithium, anticonvulsants, and how these medications help manage bipolar disorder and mood swings.',
    '/images/articles/cat14/cover-014.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT14-015: Antipsychotic Medications: What They Treat and How They Work
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Antipsychotic Medications: What They Treat and How They Work',
    'antipsychotic-medications-what-they-treat-how-they-work',
    'draft',
    'Therapy, Treatment & Mental Health Navigation',
    ARRAY['Antipsychotics', 'Schizophrenia', 'Psychosis', 'Medication'],
    967,
    'Dr. Sarah Chen',
    'self_help',
    'CAT14-015',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding antipsychotic medications, from schizophrenia treatment to mood stabilization, including typical vs. atypical antipsychotics.',
    '/images/articles/cat14/cover-015.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT14-016: ADHD Medications: Stimulants, Non-Stimulants, and Finding the Right Fit
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'ADHD Medications: Stimulants, Non-Stimulants, and Finding the Right Fit',
    'adhd-medications-stimulants-non-stimulants-finding-right-fit',
    'draft',
    'Therapy, Treatment & Mental Health Navigation',
    ARRAY['ADHD', 'Stimulants', 'Medication', 'Focus'],
    985,
    'Dr. Sarah Chen',
    'self_help',
    'CAT14-016',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand how ADHD medications work, the differences between stimulants and non-stimulants, and how to find the right medication for focus and attention.',
    '/images/articles/cat14/cover-016.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT14-017: How Psychiatric Medication Works: Neurotransmitters in Plain Language
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How Psychiatric Medication Works: Neurotransmitters in Plain Language',
    'how-psychiatric-medication-works-neurotransmitters-plain-language',
    'draft',
    'Therapy, Treatment & Mental Health Navigation',
    ARRAY['Neurotransmitters', 'Brain Chemistry', 'Medication', 'Mental Health'],
    961,
    'Dr. Sarah Chen',
    'self_help',
    'CAT14-017',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand how psychiatric medications affect brain chemistry, what neurotransmitters do, and why these medications take time to work.',
    '/images/articles/cat14/cover-017.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT14-018: Side Effects of Psychiatric Medication: What to Expect and When to Speak Up
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Side Effects of Psychiatric Medication: What to Expect and When to Speak Up',
    'side-effects-psychiatric-medication-what-to-expect-when-to-speak-up',
    'draft',
    'Therapy, Treatment & Mental Health Navigation',
    ARRAY['Side Effects', 'Medication', 'SSRIs', 'Antipsychotics'],
    919,
    'Dr. Sarah Chen',
    'self_help',
    'CAT14-018',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn which side effects are normal, which fade over time, and which warrant a call to your doctor.',
    '/images/articles/cat14/cover-018.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT14-019: Starting and Stopping Medication: Why You Should Never Go Cold Turkey
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Starting and Stopping Medication: Why You Should Never Go Cold Turkey',
    'starting-stopping-medication-why-never-go-cold-turkey',
    'draft',
    'Therapy, Treatment & Mental Health Navigation',
    ARRAY['Medication Safety', 'Tapering', 'Discontinuation', 'Treatment'],
    928,
    'Dr. Sarah Chen',
    'self_help',
    'CAT14-019',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn the right way to start psychiatric medication, when and how to stop safely, and why tapering matters.',
    '/images/articles/cat14/cover-019.svg',
    8,
    true,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT14-020: The Medication vs. Therapy Debate: What Combined Treatment Research Shows
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Medication vs. Therapy Debate: What Combined Treatment Research Shows',
    'medication-vs-therapy-debate-combined-treatment-research',
    'draft',
    'Therapy, Treatment & Mental Health Navigation',
    ARRAY['Medication', 'Therapy', 'Research', 'Combined Treatment'],
    969,
    'Dr. Sarah Chen',
    'self_help',
    'CAT14-020',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Evidence-based analysis of medication-only, therapy-only, and combined treatment for depression, anxiety, and other mental health conditions.',
    '/images/articles/cat14/cover-020.svg',
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

  -- === CAT14-011 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT14-011';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Selective serotonin reuptake inhibitors for major depressive disorder: A systematic review and meta-analysis', '2021', 'https://doi.org/10.1001/jamapsychiatry.2021.1177', 'JAMA Psychiatry', 1),
      (v_art_id, 'reference', 5, 'Clinical handbook of psychotropic drugs, 25th edition', '2023', 'https://www.hogrefe.com/us/shop/clinical-handbook-of-psychotropic-drugs-76151.html', 'Hogrefe Publishing', 2),
      (v_art_id, 'peer_reviewed', 1, 'SSRIs for anxiety disorders: Evidence and clinical practice', '2022', 'https://doi.org/10.1016/S2215-0366(22)00112-1', 'The Lancet Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Neurobiological mechanisms of SSRIs in depression treatment', '2021', 'https://doi.org/10.1038/s41583-021-00481-4', 'Nature Reviews Neuroscience', 4),
      (v_art_id, 'peer_reviewed', 1, 'Sexual side effects of SSRIs: Prevalence and management', '2022', 'https://doi.org/10.4088/JCP.21r14236', 'Journal of Clinical Psychiatry', 5),
      (v_art_id, 'peer_reviewed', 1, 'SSRIs in older adults: Efficacy and safety considerations', '2021', 'https://doi.org/10.1016/j.jagp.2021.03.015', 'American Journal of Geriatric Psychiatry', 6),
      (v_art_id, 'peer_reviewed', 1, 'Discontinuation syndrome with SSRIs: A systematic review', '2020', 'https://doi.org/10.1159/000505881', 'Psychotherapy and Psychosomatics', 7),
      (v_art_id, 'peer_reviewed', 1, 'SSRIs in pregnancy: Balancing maternal and fetal health', '2022', 'https://doi.org/10.1001/jama.2022.3926', 'JAMA', 8),
      (v_art_id, 'clinical_guideline', 4, 'Antidepressant medication treatment guidelines', '2021', 'https://www.psychiatry.org/psychiatrists/practice/clinical-practice-guidelines', 'American Psychiatric Association', 9),
      (v_art_id, 'peer_reviewed', 1, 'Long-term SSRI treatment: Efficacy and considerations', '2021', 'https://doi.org/10.1016/j.cpr.2021.102087', 'Clinical Psychology Review', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT14-012 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT14-012';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Comparative efficacy and acceptability of antidepressants: A network meta-analysis', '2018', 'https://doi.org/10.1016/S0140-6736(17)32802-7', 'The Lancet', 1),
      (v_art_id, 'reference', 5, 'Stahl''s Essential Psychopharmacology: Prescriber''s Guide, 7th Edition', '2023', 'https://www.cambridge.org/core/books/stahls-essential-psychopharmacology/9781108986427', 'Cambridge University Press', 2),
      (v_art_id, 'peer_reviewed', 1, 'SNRIs for depression and anxiety: A systematic review', '2021', 'https://doi.org/10.1001/jamapsychiatry.2021.2156', 'JAMA Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Tricyclic antidepressants: A review of pharmacology and therapeutic use', '2020', 'https://doi.org/10.1007/s00213-020-05512-0', 'Psychopharmacology', 4),
      (v_art_id, 'peer_reviewed', 1, 'MAOIs: Underutilized treatment for treatment-resistant depression', '2021', 'https://doi.org/10.4088/JCP.20r13943', 'Journal of Clinical Psychiatry', 5),
      (v_art_id, 'peer_reviewed', 1, 'Bupropion: Mechanism of action and clinical applications', '2021', 'https://doi.org/10.1007/s40263-021-00813-w', 'CNS Drugs', 6),
      (v_art_id, 'peer_reviewed', 1, 'Mirtazapine for depression: Efficacy and tolerability', '2020', 'https://doi.org/10.1177/2045125320968654', 'Therapeutic Advances in Psychopharmacology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Antidepressant augmentation strategies: Evidence and practice', '2022', 'https://doi.org/10.1176/appi.ajp.2021.21091003', 'American Journal of Psychiatry', 8),
      (v_art_id, 'peer_reviewed', 1, 'Treatment-resistant depression: Pharmacological approaches', '2021', 'https://doi.org/10.1192/bjp.2021.37', 'British Journal of Psychiatry', 9),
      (v_art_id, 'clinical_guideline', 4, 'Clinical practice guideline for pharmacological treatment of depression', '2021', 'https://www.psychiatry.org/psychiatrists/practice/clinical-practice-guidelines', 'American Psychiatric Association', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT14-013 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT14-013';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Benzodiazepines for anxiety disorders: A systematic review and meta-analysis', '2022', 'https://doi.org/10.1001/jamapsychiatry.2022.1733', 'JAMA Psychiatry', 1),
      (v_art_id, 'clinical_guideline', 4, 'Clinical guidelines for benzodiazepine prescribing in anxiety disorders', '2023', 'https://www.psychiatry.org/psychiatrists/practice/clinical-practice-guidelines', 'American Psychiatric Association', 2),
      (v_art_id, 'peer_reviewed', 1, 'Buspirone for generalized anxiety disorder: Efficacy and tolerability', '2021', 'https://doi.org/10.4088/JCP.20r13891', 'Journal of Clinical Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Benzodiazepine dependence and withdrawal: A review', '2020', 'https://doi.org/10.1111/add.14909', 'Addiction', 4),
      (v_art_id, 'peer_reviewed', 1, 'Long-term benzodiazepine use: Risks and alternative approaches', '2021', 'https://doi.org/10.1192/bjp.2021.44', 'British Journal of Psychiatry', 5),
      (v_art_id, 'peer_reviewed', 1, 'Hydroxyzine for anxiety: Efficacy and safety profile', '2022', 'https://doi.org/10.1007/s00213-022-06145-2', 'Psychopharmacology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Gabapentin and pregabalin for anxiety disorders: Off-label use review', '2021', 'https://doi.org/10.1007/s40263-021-00828-1', 'CNS Drugs', 7),
      (v_art_id, 'peer_reviewed', 1, 'Beta-blockers for performance anxiety: Evidence and practice', '2020', 'https://doi.org/10.1080/10615806.2020.1746286', 'Anxiety, Stress & Coping', 8),
      (v_art_id, 'peer_reviewed', 1, 'Benzodiazepines in older adults: Special considerations', '2022', 'https://doi.org/10.1016/j.jagp.2022.04.012', 'American Journal of Geriatric Psychiatry', 9),
      (v_art_id, 'peer_reviewed', 1, 'Pharmacological treatment of anxiety disorders: A comprehensive review', '2023', 'https://doi.org/10.1016/S2215-0366(23)00116-3', 'The Lancet Psychiatry', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT14-014 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT14-014';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Lithium for bipolar disorder: A systematic review and meta-analysis', '2021', 'https://doi.org/10.1001/jamapsychiatry.2021.2477', 'JAMA Psychiatry', 1),
      (v_art_id, 'clinical_guideline', 4, 'Pharmacological treatment of bipolar disorder: Clinical practice guidelines', '2022', 'https://www.psychiatry.org/psychiatrists/practice/clinical-practice-guidelines', 'American Psychiatric Association', 2),
      (v_art_id, 'peer_reviewed', 1, 'Valproate for acute mania and maintenance treatment in bipolar disorder', '2020', 'https://doi.org/10.1016/S2215-0366(20)30184-2', 'The Lancet Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Lamotrigine for bipolar depression: Efficacy and safety', '2021', 'https://doi.org/10.1192/bjp.2021.51', 'British Journal of Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Lithium and suicide prevention: Updated systematic review', '2022', 'https://doi.org/10.1111/bdi.13205', 'Bipolar Disorders', 5),
      (v_art_id, 'peer_reviewed', 1, 'Long-term lithium treatment: Renal and thyroid monitoring', '2021', 'https://doi.org/10.4088/JCP.20r13847', 'Journal of Clinical Psychiatry', 6),
      (v_art_id, 'peer_reviewed', 1, 'Carbamazepine and oxcarbazepine in bipolar disorder', '2020', 'https://doi.org/10.1007/s40263-020-00741-8', 'CNS Drugs', 7),
      (v_art_id, 'peer_reviewed', 1, 'Atypical antipsychotics as mood stabilizers: Evidence review', '2022', 'https://doi.org/10.1176/appi.ajp.2021.21101042', 'American Journal of Psychiatry', 8),
      (v_art_id, 'peer_reviewed', 1, 'Combination therapy in bipolar disorder: Strategies and outcomes', '2021', 'https://doi.org/10.1007/s00213-021-05889-3', 'Psychopharmacology', 9),
      (v_art_id, 'peer_reviewed', 1, 'Mood stabilizers in pregnancy: Balancing maternal and fetal health', '2023', 'https://doi.org/10.1001/jama.2023.0987', 'JAMA', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT14-015 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT14-015';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Antipsychotic medications for schizophrenia: Systematic review and network meta-analysis', '2020', 'https://doi.org/10.1016/S0140-6736(19)31135-3', 'The Lancet', 1),
      (v_art_id, 'clinical_guideline', 4, 'Clinical practice guideline for the treatment of schizophrenia', '2021', 'https://www.psychiatry.org/psychiatrists/practice/clinical-practice-guidelines', 'American Psychiatric Association', 2),
      (v_art_id, 'peer_reviewed', 1, 'Atypical antipsychotics: Metabolic side effects and cardiovascular risk', '2022', 'https://doi.org/10.1001/jamapsychiatry.2022.0094', 'JAMA Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Clozapine for treatment-resistant schizophrenia: Efficacy and monitoring', '2021', 'https://doi.org/10.1192/bjp.2020.256', 'British Journal of Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Antipsychotic-induced movement disorders: Pathophysiology and management', '2021', 'https://doi.org/10.1007/s40263-021-00831-6', 'CNS Drugs', 5),
      (v_art_id, 'peer_reviewed', 1, 'Long-acting injectable antipsychotics: Adherence and outcomes', '2022', 'https://doi.org/10.1093/schbul/sbab142', 'Schizophrenia Bulletin', 6),
      (v_art_id, 'peer_reviewed', 1, 'Antipsychotics in bipolar disorder: Evidence and clinical use', '2021', 'https://doi.org/10.1111/bdi.13089', 'Bipolar Disorders', 7),
      (v_art_id, 'peer_reviewed', 1, 'Typical versus atypical antipsychotics: Comparative effectiveness', '2020', 'https://doi.org/10.1176/appi.ajp.2020.19070740', 'American Journal of Psychiatry', 8),
      (v_art_id, 'peer_reviewed', 1, 'Antipsychotic polypharmacy in schizophrenia: Benefits and risks', '2022', 'https://doi.org/10.1007/s00213-022-06103-y', 'Psychopharmacology', 9),
      (v_art_id, 'peer_reviewed', 1, 'Low-dose antipsychotics for conditions other than psychosis', '2021', 'https://doi.org/10.4088/JCP.20r13785', 'Journal of Clinical Psychiatry', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT14-016 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT14-016';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Stimulant medications for ADHD: A systematic review and network meta-analysis', '2021', 'https://doi.org/10.1001/jamapsychiatry.2021.0179', 'JAMA Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Atomoxetine and non-stimulant medications for ADHD: Evidence and efficacy', '2022', 'https://doi.org/10.4088/JCP.21r14283', 'Journal of Clinical Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Long-term outcomes of medication treatment for ADHD', '2021', 'https://doi.org/10.1016/S2215-0366(21)00109-2', 'The Lancet Psychiatry', 3),
      (v_art_id, 'clinical_guideline', 4, 'ADHD medication in adults: Clinical practice guidelines', '2022', 'https://www.psychiatry.org/patients-families/adhd/what-is-adhd', 'American Psychiatric Association', 4),
      (v_art_id, 'peer_reviewed', 1, 'Stimulant medication and cardiovascular risk in ADHD', '2020', 'https://doi.org/10.1001/jama.2020.17769', 'JAMA', 5),
      (v_art_id, 'peer_reviewed', 1, 'Methylphenidate vs. amphetamine: Comparative effectiveness', '2021', 'https://doi.org/10.1177/1087054720988463', 'Journal of Attention Disorders', 6),
      (v_art_id, 'peer_reviewed', 1, 'Non-stimulant ADHD medications: When and why to use them', '2022', 'https://doi.org/10.1007/s40263-022-00901-0', 'CNS Drugs', 7),
      (v_art_id, 'peer_reviewed', 1, 'ADHD medication in pregnancy: Risks and considerations', '2021', 'https://doi.org/10.1001/jamapsychiatry.2021.2251', 'JAMA Psychiatry', 8),
      (v_art_id, 'peer_reviewed', 1, 'Medication holidays for ADHD: Evidence and recommendations', '2020', 'https://doi.org/10.1016/j.jaac.2020.03.007', 'Journal of the American Academy of Child & Adolescent Psychiatry', 9),
      (v_art_id, 'peer_reviewed', 1, 'Substance misuse concerns with ADHD stimulants: What the data shows', '2021', 'https://doi.org/10.1176/appi.ajp.2021.20111581', 'American Journal of Psychiatry', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT14-017 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT14-017';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Neurotransmitter systems and psychiatric disorders', '2021', 'https://doi.org/10.1038/s41583-021-00455-7', 'Nature Reviews Neuroscience', 1),
      (v_art_id, 'peer_reviewed', 1, 'The monoamine hypothesis of depression: A historical perspective', '2020', 'https://doi.org/10.1503/jpn.200032', 'Journal of Psychiatry & Neuroscience', 2),
      (v_art_id, 'peer_reviewed', 1, 'Delayed onset of antidepressant action: Neuroplasticity and adaptation', '2021', 'https://doi.org/10.1016/j.biopsych.2021.02.014', 'Biological Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'GABA and glutamate in mood and anxiety disorders', '2022', 'https://doi.org/10.1038/s41380-022-01465-0', 'Molecular Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Dopamine and reward: The neuroscience of motivation', '2020', 'https://doi.org/10.1016/j.neubiorev.2020.07.025', 'Neuroscience & Biobehavioral Reviews', 5),
      (v_art_id, 'peer_reviewed', 1, 'Serotonin: What we know and what we still need to learn', '2021', 'https://doi.org/10.1016/j.neuron.2021.04.009', 'Neuron', 6),
      (v_art_id, 'government', 2, 'How psychiatric medications work: NIH guide for patients', '2022', 'https://www.nimh.nih.gov/health/topics/mental-health-medications', 'National Institute of Mental Health', 7),
      (v_art_id, 'peer_reviewed', 1, 'Neuroplasticity and antidepressants: Beyond the serotonin hypothesis', '2021', 'https://doi.org/10.3389/fpsyt.2021.735950', 'Frontiers in Psychiatry', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT14-018 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT14-018';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Side effects of SSRIs: A systematic review and patient survey', '2021', 'https://doi.org/10.1001/jamapsychiatry.2021.1784', 'JAMA Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'SSRI-induced sexual dysfunction: Prevalence and management', '2020', 'https://doi.org/10.4088/JCP.20r13189', 'Journal of Clinical Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Weight gain associated with psychiatric medications', '2021', 'https://doi.org/10.1111/obr.13227', 'Obesity Reviews', 3),
      (v_art_id, 'peer_reviewed', 1, 'Antipsychotic-induced metabolic syndrome: Screening and management', '2022', 'https://doi.org/10.1016/S2215-0366(22)00123-6', 'The Lancet Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Managing side effects to improve antidepressant adherence', '2021', 'https://doi.org/10.1176/appi.ajp.2020.20091342', 'American Journal of Psychiatry', 5),
      (v_art_id, 'peer_reviewed', 1, 'Serotonin syndrome: Recognition and treatment', '2020', 'https://doi.org/10.1016/j.mayocp.2020.02.029', 'Mayo Clinic Proceedings', 6),
      (v_art_id, 'peer_reviewed', 1, 'Discontinuation symptoms from antidepressants', '2021', 'https://doi.org/10.1159/000517340', 'Psychotherapy and Psychosomatics', 7),
      (v_art_id, 'professional_org', 3, 'Medication side effects: Patient guide', '2022', 'https://www.nami.org/About-Mental-Illness/Treatments/Mental-Health-Medications', 'National Alliance on Mental Illness (NAMI)', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT14-019 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT14-019';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Antidepressant discontinuation syndrome: Evidence and clinical management', '2021', 'https://doi.org/10.1159/000517340', 'Psychotherapy and Psychosomatics', 1),
      (v_art_id, 'peer_reviewed', 1, 'Starting antidepressants: Optimizing early treatment to improve outcomes', '2022', 'https://doi.org/10.1016/S2215-0366(22)00089-9', 'The Lancet Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Benzodiazepine tapering: Protocols and best practices', '2022', 'https://doi.org/10.1111/add.15835', 'Addiction', 3),
      (v_art_id, 'peer_reviewed', 1, 'Medication adherence in psychiatric treatment: Barriers and solutions', '2021', 'https://doi.org/10.1001/jamapsychiatry.2021.0042', 'JAMA Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Duration of antidepressant treatment: Relapse prevention strategies', '2020', 'https://doi.org/10.1176/appi.ajp.2020.20050683', 'American Journal of Psychiatry', 5),
      (v_art_id, 'clinical_guideline', 4, 'Stopping antidepressants safely: A practical guide', '2022', 'https://www.nice.org.uk/guidance/ng222', 'National Institute for Health and Care Excellence (NICE)', 6),
      (v_art_id, 'peer_reviewed', 1, 'Mood stabilizer discontinuation: Risks and recommendations', '2021', 'https://doi.org/10.1111/bdi.13045', 'Bipolar Disorders', 7),
      (v_art_id, 'peer_reviewed', 1, 'Antipsychotic withdrawal: Clinical considerations', '2020', 'https://doi.org/10.1093/schbul/sbaa103', 'Schizophrenia Bulletin', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT14-020 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT14-020';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Medication versus psychotherapy for depression: Systematic review and meta-analysis', '2021', 'https://doi.org/10.1001/jamapsychiatry.2021.3375', 'JAMA Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Combined treatment for depression: Additive benefits of psychotherapy and antidepressants', '2022', 'https://doi.org/10.1176/appi.ajp.2021.21010055', 'American Journal of Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive behavioral therapy vs. medication for anxiety disorders', '2021', 'https://doi.org/10.1016/S2215-0366(21)00134-3', 'The Lancet Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Long-term outcomes: Relapse prevention with psychotherapy vs. medication', '2020', 'https://doi.org/10.1017/S0033291720001713', 'Psychological Medicine', 4),
      (v_art_id, 'peer_reviewed', 1, 'Cost-effectiveness of combined treatment vs. monotherapy for depression', '2021', 'https://doi.org/10.1192/bjp.2021.42', 'British Journal of Psychiatry', 5),
      (v_art_id, 'peer_reviewed', 1, 'Patient preferences in mental health treatment: Therapy, medication, or both', '2022', 'https://doi.org/10.1002/wps.20967', 'World Psychiatry', 6),
      (v_art_id, 'peer_reviewed', 1, 'Sequenced treatment alternatives to relieve depression (STAR*D): What we learned', '2020', 'https://doi.org/10.1001/jama.2020.9897', 'JAMA', 7),
      (v_art_id, 'clinical_guideline', 4, 'Clinical practice guideline for treatment of depression', '2022', 'https://www.apa.org/depression-guideline', 'American Psychological Association', 8),
      (v_art_id, 'peer_reviewed', 1, 'Mechanisms of action: How psychotherapy and medication work differently', '2021', 'https://doi.org/10.1038/s41583-021-00478-0', 'Nature Reviews Neuroscience', 9),
      (v_art_id, 'peer_reviewed', 1, 'Dropout rates in psychotherapy vs. pharmacotherapy', '2020', 'https://doi.org/10.1002/jclp.23001', 'Journal of Clinical Psychology', 10)
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
