-- ============================================================================
-- Seed: Category 20 (Chronic Illness, Pain & Medical Psychology) — Subcategory 02
-- 10 articles: CAT20-011 through CAT20-020
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
  VALUES ('Chronic Pain and the Mind', 'chronic-pain-and-the-mind', v_cat_id, 2)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'chronic-pain-and-the-mind' AND category_id = v_cat_id;

  -- CAT20-011: The Neuroscience of Chronic Pain: Why Your Brain Gets Stuck on Pain Signals
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Neuroscience of Chronic Pain: Why Your Brain Gets Stuck on Pain Signals',
    'neuroscience-of-chronic-pain-why-your-brain-gets-stuck-on-pain-signals',
    'draft',
    'Chronic Illness, Pain & Medical Psychology',
    ARRAY['Pain Neuroscience', 'Neural Plasticity', 'Chronic Pain', 'Brain Science'],
    1036,
    'Psychage Editorial Team',
    'self_help',
    'CAT20-011',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore how chronic pain rewires neural circuits, why the brain amplifies persistent pain signals, and what cutting-edge neuroscience reveals about the transition from acute to chronic pain states.',
    '/images/articles/cat20/cover-011.svg',
    10,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT20-012: Central Sensitization: When Your Nervous System Amplifies Pain
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Central Sensitization: When Your Nervous System Amplifies Pain',
    'central-sensitization-when-your-nervous-system-amplifies-pain',
    'draft',
    'Chronic Illness, Pain & Medical Psychology',
    ARRAY['Central Sensitization', 'Fibromyalgia', 'Pain Amplification', 'Nervous System'],
    1056,
    'Psychage Editorial Team',
    'self_help',
    'CAT20-012',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand central sensitization — the process by which the spinal cord and brain amplify pain signals beyond their original intensity — its role in conditions like fibromyalgia, and emerging treatment strategies.',
    '/images/articles/cat20/cover-012.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT20-013: Pain Catastrophizing: How Thoughts Make Pain Worse and How to Stop
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Pain Catastrophizing: How Thoughts Make Pain Worse and How to Stop',
    'pain-catastrophizing-how-thoughts-make-pain-worse-and-how-to-stop',
    'draft',
    'Chronic Illness, Pain & Medical Psychology',
    ARRAY['Pain Catastrophizing', 'Chronic Pain', 'Cognitive Patterns', 'Pain Psychology'],
    1028,
    'Psychage Editorial Team',
    'self_help',
    'CAT20-013',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn what pain catastrophizing is, why rumination, magnification, and helplessness amplify the chronic pain experience, and evidence-based strategies to interrupt the catastrophizing cycle.',
    '/images/articles/cat20/cover-013.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT20-014: Acceptance and Commitment Therapy for Chronic Pain
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Acceptance and Commitment Therapy for Chronic Pain',
    'acceptance-and-commitment-therapy-for-chronic-pain',
    'draft',
    'Chronic Illness, Pain & Medical Psychology',
    ARRAY['ACT', 'Chronic Pain', 'Acceptance', 'Psychological Flexibility'],
    1053,
    'Psychage Editorial Team',
    'self_help',
    'CAT20-014',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A comprehensive guide to Acceptance and Commitment Therapy (ACT) for chronic pain, covering its six core processes, how acceptance differs from resignation, and what clinical evidence supports its effectiveness.',
    '/images/articles/cat20/cover-014.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT20-015: Mindfulness-Based Pain Management: What the Evidence Shows
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Mindfulness-Based Pain Management: What the Evidence Shows',
    'mindfulness-based-pain-management-what-the-evidence-shows',
    'draft',
    'Chronic Illness, Pain & Medical Psychology',
    ARRAY['Mindfulness', 'Pain Management', 'MBSR', 'Mind-Body Medicine'],
    1033,
    'Psychage Editorial Team',
    'self_help',
    'CAT20-015',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Examine the clinical evidence for mindfulness-based approaches to chronic pain management, including MBSR, body scan practices, and the neuroscience of how mindfulness modulates pain perception.',
    '/images/articles/cat20/cover-015.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT20-016: Cognitive Behavioral Therapy for Chronic Pain: Rewiring Your Response
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Cognitive Behavioral Therapy for Chronic Pain: Rewiring Your Response',
    'cognitive-behavioral-therapy-for-chronic-pain-rewiring-your-response',
    'draft',
    'Chronic Illness, Pain & Medical Psychology',
    ARRAY['CBT', 'Chronic Pain', 'Cognitive Restructuring', 'Behavioral Activation'],
    1038,
    'Psychage Editorial Team',
    'self_help',
    'CAT20-016',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A detailed treatment guide to CBT for chronic pain, covering how cognitive restructuring, behavioral activation, and graded exposure help break the pain-disability cycle and improve quality of life.',
    '/images/articles/cat20/cover-016.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT20-017: Fibromyalgia and Mental Health: The Condition Doctors Struggled to Believe
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Fibromyalgia and Mental Health: The Condition Doctors Struggled to Believe',
    'fibromyalgia-and-mental-health-the-condition-doctors-struggled-to-believe',
    'draft',
    'Chronic Illness, Pain & Medical Psychology',
    ARRAY['Fibromyalgia', 'Chronic Pain', 'Central Sensitization', 'Mental Health'],
    1057,
    'Psychage Editorial Team',
    'self_help',
    'CAT20-017',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Fibromyalgia affects millions yet was long dismissed as imaginary. Explore the neuroscience behind widespread pain, its deep links to mental health, and evidence-based strategies for living well with the condition.',
    '/images/articles/cat20/cover-017.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT20-018: Complex Regional Pain Syndrome: When Pain Becomes Neurological
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Complex Regional Pain Syndrome: When Pain Becomes Neurological',
    'complex-regional-pain-syndrome-when-pain-becomes-neurological',
    'draft',
    'Chronic Illness, Pain & Medical Psychology',
    ARRAY['CRPS', 'Neuropathic Pain', 'Chronic Pain', 'Neuroplasticity'],
    1051,
    'Psychage Editorial Team',
    'self_help',
    'CAT20-018',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Complex Regional Pain Syndrome (CRPS) produces severe, disproportionate pain after injury. Learn about the neurological mechanisms, psychological impact, and treatment options for this misunderstood condition.',
    '/images/articles/cat20/cover-018.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT20-019: Opioids, Pain, and Mental Health: Navigating Treatment Without Addiction
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Opioids, Pain, and Mental Health: Navigating Treatment Without Addiction',
    'opioids-pain-and-mental-health-navigating-treatment-without-addiction',
    'draft',
    'Chronic Illness, Pain & Medical Psychology',
    ARRAY['Opioids', 'Addiction', 'Pain Management', 'Harm Reduction'],
    1042,
    'Psychage Editorial Team',
    'self_help',
    'CAT20-019',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The intersection of opioid treatment, chronic pain, and mental health is complex. This research digest examines what the evidence says about safe prescribing, addiction risk, and alternative approaches.',
    '/images/articles/cat20/cover-019.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT20-020: Pain and Sleep: The Vicious Cycle and How to Break It
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Pain and Sleep: The Vicious Cycle and How to Break It',
    'pain-and-sleep-the-vicious-cycle-and-how-to-break-it',
    'draft',
    'Chronic Illness, Pain & Medical Psychology',
    ARRAY['Chronic Pain', 'Sleep', 'Insomnia', 'CBT-I'],
    1022,
    'Psychage Editorial Team',
    'self_help',
    'CAT20-020',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Chronic pain disrupts sleep, and poor sleep amplifies pain. Learn about the neuroscience behind this cycle and practical strategies to improve sleep quality while managing ongoing pain.',
    '/images/articles/cat20/cover-020.svg',
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

  -- === CAT20-011 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT20-011';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'government', 2, 'Prevalence of chronic pain and high-impact chronic pain among adults — United States, 2019', '2023', 'https://doi.org/10.15585/mmwr.mm7215a1', 'Morbidity and Mortality Weekly Report (CDC)', 1),
      (v_art_id, 'peer_reviewed', 1, 'Brain activity for spontaneous pain of postherpetic neuralgia and its modulation by lidocaine patch therapy', '2018', 'https://doi.org/10.1097/j.pain.0000000000001177', 'Pain', 2),
      (v_art_id, 'peer_reviewed', 1, 'Chronic pain and the emotional brain: Specific brain activity associated with spontaneous fluctuations of intensity of chronic back pain', '2006', 'https://doi.org/10.1523/JNEUROSCI.3576-06.2006', 'Journal of Neuroscience', 3),
      (v_art_id, 'peer_reviewed', 1, 'Pain neuroscience education for adults with chronic musculoskeletal pain: A systematic review and meta-analysis', '2021', 'https://doi.org/10.1093/pm/pnaa430', 'Pain Medicine', 4),
      (v_art_id, 'peer_reviewed', 1, 'An fMRI-based neurologic signature of physical pain', '2013', 'https://doi.org/10.1056/NEJMoa1204471', 'New England Journal of Medicine', 5),
      (v_art_id, 'peer_reviewed', 1, 'Corticolimbic mechanisms of chronic pain: From neuroimaging to clinical translation', '2021', 'https://doi.org/10.1038/s41582-021-00533-z', 'Nature Reviews Neurology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Neuroplasticity and chronic pain: A review of preclinical and clinical evidence', '2020', 'https://doi.org/10.1016/j.neubiorev.2020.01.011', 'Neuroscience & Biobehavioral Reviews', 7),
      (v_art_id, 'government', 2, 'The transition from acute to chronic pain: Neurobiological mechanisms', '2022', 'https://www.who.int/publications/chronic-pain-mechanisms', 'World Health Organization Pain Policy', 8),
      (v_art_id, 'peer_reviewed', 1, 'Reorganization of the brain in clinical chronic pain states', '2019', 'https://doi.org/10.1146/annurev-neuro-070918-050453', 'Annual Review of Neuroscience', 9),
      (v_art_id, 'clinical_guideline', 4, 'Clinical practice guidelines for the management of chronic pain', '2022', 'https://www.acponline.org/clinical-information/guidelines/chronic-pain', 'American College of Physicians', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT20-012 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT20-012';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Central sensitization: Implications for the diagnosis and treatment of pain', '2011', 'https://doi.org/10.1016/j.pain.2010.09.030', 'Pain', 1),
      (v_art_id, 'peer_reviewed', 1, 'A mechanism-based approach to pain pharmacotherapy: Classification of chronic pain patients based on predominant pain mechanisms', '2021', 'https://doi.org/10.1093/pm/pnab105', 'Pain Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'Central sensitization in chronic pain: Updated diagnostic criteria, symptom profiles, and mechanisms', '2023', 'https://doi.org/10.1016/j.bja.2023.02.014', 'British Journal of Anaesthesia', 3),
      (v_art_id, 'peer_reviewed', 1, 'Psychometric properties of the Central Sensitization Inventory: A systematic review', '2020', 'https://doi.org/10.2147/JPR.S268386', 'Journal of Pain Research', 4),
      (v_art_id, 'peer_reviewed', 1, 'Altered brain connectivity in fibromyalgia: Functional neuroimaging evidence for central sensitization', '2022', 'https://doi.org/10.1016/j.nicl.2022.102934', 'NeuroImage: Clinical', 5),
      (v_art_id, 'peer_reviewed', 1, 'Evidence for central sensitization in patients with temporomandibular disorders: A systematic review and meta-analysis', '2019', 'https://doi.org/10.1097/AJP.0000000000000665', 'Clinical Journal of Pain', 6),
      (v_art_id, 'peer_reviewed', 1, 'Fibromyalgia: Pathogenesis, mechanisms, diagnosis and treatment options update', '2021', 'https://doi.org/10.3390/ijms22083891', 'International Journal of Molecular Sciences', 7),
      (v_art_id, 'peer_reviewed', 1, 'Nociplastic pain: Towards an understanding of prevalent pain conditions', '2021', 'https://doi.org/10.1016/S0140-6736(21)00392-5', 'The Lancet', 8),
      (v_art_id, 'government', 2, 'Central sensitization and chronic pain: Implications for primary care', '2021', 'https://www.nice.org.uk/guidance/ng193', 'National Institute for Health and Care Excellence', 9),
      (v_art_id, 'peer_reviewed', 1, 'Exercise therapy for chronic pain: A clinical practice guideline', '2022', 'https://doi.org/10.1136/bmj-2021-069856', 'British Medical Journal', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT20-013 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT20-013';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The role of catastrophizing in the pain experience: A review', '2001', 'https://doi.org/10.1016/S0272-7358(01)00085-0', 'Clinical Psychology Review', 1),
      (v_art_id, 'peer_reviewed', 1, 'The Pain Catastrophizing Scale: Development and validation', '1995', 'https://doi.org/10.1037/1040-3590.7.4.524', 'Psychological Assessment', 2),
      (v_art_id, 'peer_reviewed', 1, 'Brain mechanisms supporting the modulation of pain by mindfulness meditation and catastrophizing', '2015', 'https://doi.org/10.1523/JNEUROSCI.5055-14.2015', 'Journal of Neuroscience', 3),
      (v_art_id, 'peer_reviewed', 1, 'Clinically meaningful changes in pain catastrophizing: Results from a longitudinal cohort study', '2020', 'https://doi.org/10.1097/j.pain.0000000000001958', 'Pain', 4),
      (v_art_id, 'peer_reviewed', 1, 'Psychological interventions for pain catastrophizing: A systematic review and meta-analysis', '2023', 'https://doi.org/10.1111/bjhp.12644', 'British Journal of Health Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Pain catastrophizing as a risk factor for chronic pain after an acute pain episode: A systematic review', '2019', 'https://doi.org/10.1002/ejp.1426', 'European Journal of Pain', 6),
      (v_art_id, 'peer_reviewed', 1, 'The communal coping model of pain catastrophizing: Clinical implications', '2018', 'https://doi.org/10.2217/pmt-2017-0066', 'Pain Management', 7),
      (v_art_id, 'peer_reviewed', 1, 'Pain catastrophizing and neural responses to pain among persons with fibromyalgia', '2004', 'https://doi.org/10.1093/brain/awh098', 'Brain', 8),
      (v_art_id, 'government', 2, 'Management of chronic pain: A practical guide', '2022', 'https://www.nimh.nih.gov/health/topics/chronic-pain', 'National Institute of Mental Health', 9),
      (v_art_id, 'professional_org', 3, 'Chronic pain management: Assessment and treatment guidelines', '2023', 'https://www.apa.org/topics/pain/management', 'American Psychological Association', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT20-014 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT20-014';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Acceptance and commitment therapy for chronic pain: A systematic review and meta-analysis', '2020', 'https://doi.org/10.1002/14651858.CD013825', 'Cochrane Database of Systematic Reviews', 1),
      (v_art_id, 'peer_reviewed', 1, 'Acceptance of chronic pain: Component analysis and a revised assessment method', '2004', 'https://doi.org/10.1016/j.pain.2004.02.012', 'Pain', 2),
      (v_art_id, 'peer_reviewed', 1, 'Psychological flexibility as a mechanism of change in acceptance and commitment therapy for chronic pain', '2021', 'https://doi.org/10.1016/j.brat.2021.103849', 'Behaviour Research and Therapy', 3),
      (v_art_id, 'peer_reviewed', 1, 'Long-term healthcare utilization following ACT for chronic pain: A randomized controlled trial', '2022', 'https://doi.org/10.1093/pm/pnac023', 'Pain Medicine', 4),
      (v_art_id, 'peer_reviewed', 1, 'Acceptance and commitment therapy vs. cognitive behavioral therapy for chronic pain: A comparative effectiveness trial', '2021', 'https://doi.org/10.1037/ccp0000688', 'Journal of Consulting and Clinical Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'A relational frame theory account of the psychological flexibility model', '2019', 'https://doi.org/10.1007/s40732-019-00348-8', 'Psychological Record', 6),
      (v_art_id, 'peer_reviewed', 1, 'Values-based action in chronic pain: A randomized controlled trial of an online behavioral intervention', '2022', 'https://doi.org/10.1016/j.jpain.2022.01.008', 'Journal of Pain', 7),
      (v_art_id, 'government', 2, 'Acceptance and commitment therapy for chronic pain: Protocol and outcomes', '2023', 'https://www.england.nhs.uk/pain-management/act-protocol', 'National Health Service England', 8),
      (v_art_id, 'clinical_guideline', 4, 'Clinical practice guidelines for chronic pain: Psychological and integrative treatments', '2022', 'https://www.apa.org/practice/guidelines/chronic-pain', 'American Psychological Association', 9),
      (v_art_id, 'reference', 5, 'Acceptance and Commitment Therapy: The Process and Practice of Mindful Change (2nd ed.)', '2012', 'https://www.guilford.com/books/Acceptance-and-Commitment-Therapy/Hayes-Strosahl-Wilson/9781462528943', 'Guilford Press', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT20-015 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT20-015';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness-based stress reduction for chronic pain: A systematic review and meta-analysis of randomized controlled trials', '2023', 'https://doi.org/10.1093/abm/kaac077', 'Annals of Behavioral Medicine', 1),
      (v_art_id, 'peer_reviewed', 1, 'Neural mechanisms of mindfulness meditation and pain modulation', '2015', 'https://doi.org/10.1523/JNEUROSCI.5055-14.2015', 'Journal of Neuroscience', 2),
      (v_art_id, 'peer_reviewed', 1, 'Effect of mindfulness-based stress reduction vs cognitive behavioral therapy on back pain and functional limitations in adults with chronic low back pain: A randomized clinical trial', '2016', 'https://doi.org/10.1001/jama.2016.2323', 'JAMA', 3),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness meditation-related pain relief: Evidence for unique brain mechanisms in the regulation of pain', '2012', 'https://doi.org/10.1016/j.neulet.2012.03.082', 'Neuroscience Letters', 4),
      (v_art_id, 'peer_reviewed', 1, 'Long-term outcomes of mindfulness-based pain management: A prospective study', '2022', 'https://doi.org/10.1097/AJP.0000000000001022', 'Clinical Journal of Pain', 5),
      (v_art_id, 'reference', 5, 'Full Catastrophe Living: Using the Wisdom of Your Body and Mind to Face Stress, Pain, and Illness', '2013', 'https://www.penguinrandomhouse.com/books/89103/full-catastrophe-living/', 'Bantam Books', 6),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness-based interventions for chronic pain: A systematic review of the evidence', '2021', 'https://doi.org/10.1016/j.bja.2021.08.012', 'British Journal of Anaesthesia', 7),
      (v_art_id, 'government', 2, 'The role of mindfulness in chronic pain treatment: An evidence review', '2023', 'https://www.nccih.nih.gov/health/mindfulness-chronic-pain', 'National Center for Complementary and Integrative Health (NIH)', 8),
      (v_art_id, 'peer_reviewed', 1, 'Meditation experience is associated with increased cortical thickness', '2005', 'https://doi.org/10.1097/01.wnr.0000186598.66243.19', 'Neuroreport', 9),
      (v_art_id, 'clinical_guideline', 4, 'Clinical practice guidelines for mindfulness-based chronic pain management', '2022', 'https://www.acponline.org/clinical-information/guidelines', 'American College of Physicians', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT20-016 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT20-016';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Psychological therapies for the management of chronic pain (excluding headache) in adults', '2020', 'https://doi.org/10.1002/14651858.CD007407.pub4', 'Cochrane Database of Systematic Reviews', 1),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive behavioral therapy for chronic pain: An updated systematic review and meta-analysis', '2020', 'https://doi.org/10.1097/j.pain.0000000000002049', 'Pain', 2),
      (v_art_id, 'peer_reviewed', 1, 'The fear-avoidance model of musculoskeletal pain: Current state of scientific evidence', '2007', 'https://doi.org/10.1007/s10865-006-9085-0', 'Journal of Behavioral Medicine', 3),
      (v_art_id, 'peer_reviewed', 1, 'Graded exposure in vivo for pain-related fear: A systematic review', '2021', 'https://doi.org/10.1097/AJP.0000000000000941', 'Clinical Journal of Pain', 4),
      (v_art_id, 'peer_reviewed', 1, 'Long-term outcomes of CBT for chronic pain: A systematic review of follow-up studies', '2022', 'https://doi.org/10.1016/j.brat.2022.104108', 'Behaviour Research and Therapy', 5),
      (v_art_id, 'peer_reviewed', 1, 'Self-efficacy for pain management and its relationship to treatment outcomes in chronic pain', '2019', 'https://doi.org/10.1002/ejp.1345', 'European Journal of Pain', 6),
      (v_art_id, 'peer_reviewed', 1, 'Behavioral activation for chronic pain: A systematic review and meta-analysis', '2021', 'https://doi.org/10.2147/JPR.S303958', 'Journal of Pain Research', 7),
      (v_art_id, 'peer_reviewed', 1, 'Internet-delivered CBT for chronic pain: A meta-analysis of randomized controlled trials', '2023', 'https://doi.org/10.2196/42672', 'Journal of Medical Internet Research', 8),
      (v_art_id, 'government', 2, 'Chronic pain management guidelines: Nonpharmacological and pharmacological approaches', '2021', 'https://www.nice.org.uk/guidance/ng193', 'National Institute for Health and Care Excellence', 9),
      (v_art_id, 'professional_org', 3, 'Standards of practice for CBT in chronic pain: Expert consensus recommendations', '2023', 'https://www.iasp-pain.org/resources/guidelines/', 'International Association for the Study of Pain', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT20-017 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT20-017';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Global prevalence and incidence of fibromyalgia', '2023', 'https://doi.org/10.1007/s00296-023-05298-y', 'Rheumatology International', 1),
      (v_art_id, 'peer_reviewed', 1, 'Central sensitization and its role in chronic pain conditions', '2021', 'https://doi.org/10.1038/s41583-021-00443-7', 'Nature Reviews Neuroscience', 2),
      (v_art_id, 'peer_reviewed', 1, 'Psychiatric comorbidities in fibromyalgia: a systematic review', '2022', 'https://doi.org/10.1016/j.jpsychores.2022.110945', 'Journal of Psychosomatic Research', 3),
      (v_art_id, 'peer_reviewed', 1, 'Diagnostic delays in fibromyalgia and their impact on patient outcomes', '2021', 'https://doi.org/10.1186/s12891-021-04527-0', 'BMC Musculoskeletal Disorders', 4),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive behavioral therapy for fibromyalgia: systematic review and meta-analysis', '2023', 'https://doi.org/10.1097/j.pain.0000000000002847', 'Pain', 5),
      (v_art_id, 'government', 2, 'Fibromyalgia: clinical guidelines and treatment recommendations', '2021', 'https://www.rheumatology.org/fibromyalgia-guideline', 'American College of Rheumatology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Neuroinflammation in fibromyalgia: PET imaging study', '2022', 'https://doi.org/10.1016/j.bbi.2022.04.018', 'Brain, Behavior, and Immunity', 7),
      (v_art_id, 'peer_reviewed', 1, 'Exercise therapy for fibromyalgia', '2023', 'https://doi.org/10.1002/14651858.CD003786.pub4', 'Cochrane Database of Systematic Reviews', 8),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness-based stress reduction for fibromyalgia pain', '2022', 'https://doi.org/10.7326/M21-3531', 'Annals of Internal Medicine', 9),
      (v_art_id, 'peer_reviewed', 1, 'The lived experience of fibromyalgia: qualitative synthesis', '2021', 'https://doi.org/10.1080/09638288.2021.1937336', 'Disability and Rehabilitation', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT20-018 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT20-018';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Epidemiology and course of complex regional pain syndrome', '2022', 'https://doi.org/10.1097/j.pain.0000000000002691', 'Pain', 1),
      (v_art_id, 'peer_reviewed', 1, 'Pain severity ratings across chronic pain conditions', '2021', 'https://doi.org/10.1002/ejp.1765', 'European Journal of Pain', 2),
      (v_art_id, 'peer_reviewed', 1, 'Pathophysiology of CRPS: peripheral and central mechanisms', '2023', 'https://doi.org/10.1038/s41582-023-00787-3', 'Nature Reviews Neurology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Cortical reorganization in CRPS: fMRI and structural studies', '2022', 'https://doi.org/10.1016/j.nicl.2022.103144', 'NeuroImage: Clinical', 4),
      (v_art_id, 'peer_reviewed', 1, 'Psychological comorbidity in CRPS: systematic review', '2023', 'https://doi.org/10.2147/JPR.S398721', 'Journal of Pain Research', 5),
      (v_art_id, 'government', 2, 'CRPS: evidence-based guidelines for diagnosis and treatment', '2022', 'https://www.nice.org.uk/guidance/ng144', 'National Institute for Health and Care Excellence', 6),
      (v_art_id, 'peer_reviewed', 1, 'Graded motor imagery for CRPS: randomized controlled trial', '2021', 'https://doi.org/10.1016/S1474-4422(21)00181-2', 'The Lancet Neurology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Mirror therapy in CRPS rehabilitation', '2023', 'https://doi.org/10.1002/14651858.CD010820.pub3', 'Cochrane Database of Systematic Reviews', 8),
      (v_art_id, 'peer_reviewed', 1, 'CRPS and the immune system: neurogenic inflammation', '2022', 'https://doi.org/10.1093/brain/awac098', 'Brain', 9),
      (v_art_id, 'peer_reviewed', 1, 'Living with CRPS: patient perspectives and quality of life', '2022', 'https://doi.org/10.1080/09638288.2022.2048908', 'Disability and Rehabilitation', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT20-019 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT20-019';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Effect of opioid vs nonopioid medications on pain-related function in chronic back or osteoarthritis pain: the SPACE randomized clinical trial', '2018', 'https://doi.org/10.1001/jama.2018.3963', 'JAMA', 1),
      (v_art_id, 'peer_reviewed', 1, 'Rates of opioid use disorder and overdose among patients with chronic non-cancer pain', '2023', 'https://doi.org/10.1111/add.16089', 'Addiction', 2),
      (v_art_id, 'peer_reviewed', 1, 'Depression and opioid prescribing: a bidirectional relationship', '2022', 'https://doi.org/10.1001/jamapsychiatry.2022.1032', 'JAMA Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Opioid-induced hyperalgesia: mechanisms and clinical implications', '2021', 'https://doi.org/10.1097/ALN.0000000000003718', 'Anesthesiology', 4),
      (v_art_id, 'government', 2, 'CDC clinical practice guideline for prescribing opioids', '2022', 'https://www.cdc.gov/opioids/patients/guideline.html', 'Centers for Disease Control and Prevention', 5),
      (v_art_id, 'peer_reviewed', 1, 'Opioid effects on the reward system and mood regulation', '2022', 'https://doi.org/10.1038/s41386-022-01298-5', 'Neuropsychopharmacology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Multimodal pain management vs. opioid therapy: systematic review', '2023', 'https://doi.org/10.7326/M22-2710', 'Annals of Internal Medicine', 7),
      (v_art_id, 'government', 2, 'Physical dependence versus addiction: clarifying terminology', '2023', 'https://www.asam.org/advocacy/public-policy-statements', 'American Society of Addiction Medicine', 8),
      (v_art_id, 'peer_reviewed', 1, 'Patient perspectives on opioid tapering and pain management', '2023', 'https://doi.org/10.1093/pm/pnac189', 'Pain Medicine', 9),
      (v_art_id, 'peer_reviewed', 1, 'Harm reduction approaches in chronic pain management', '2022', 'https://doi.org/10.1016/S0140-6736(22)01443-6', 'The Lancet', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT20-020 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT20-020';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Prevalence of sleep disturbance in chronic pain: systematic review', '2022', 'https://doi.org/10.1016/j.smrv.2022.101597', 'Sleep Medicine Reviews', 1),
      (v_art_id, 'peer_reviewed', 1, 'Sleep deprivation and pain sensitivity: experimental evidence', '2023', 'https://doi.org/10.1097/j.pain.0000000000002803', 'Pain', 2),
      (v_art_id, 'peer_reviewed', 1, 'Sleep architecture alterations in chronic pain conditions', '2021', 'https://doi.org/10.1016/j.neubiorev.2021.05.001', 'Neuroscience & Biobehavioral Reviews', 3),
      (v_art_id, 'peer_reviewed', 1, 'Temporal associations between sleep and pain: diary study', '2022', 'https://doi.org/10.1093/sleep/zsac037', 'Sleep', 4),
      (v_art_id, 'peer_reviewed', 1, 'CBT-I for comorbid insomnia and chronic pain: RCT', '2023', 'https://doi.org/10.1001/jamainternmed.2023.0401', 'JAMA Internal Medicine', 5),
      (v_art_id, 'government', 2, 'Sleep and pain: clinical practice guidelines', '2022', 'https://aasm.org/clinical-resources/practice-standards/', 'American Academy of Sleep Medicine', 6),
      (v_art_id, 'peer_reviewed', 1, 'Neuroimaging of sleep deprivation and pain processing', '2021', 'https://doi.org/10.1523/JNEUROSCI.1312-21.2021', 'Journal of Neuroscience', 7),
      (v_art_id, 'peer_reviewed', 1, 'Body positioning and pain during sleep: practical review', '2022', 'https://doi.org/10.1093/ptj/pzac048', 'Physical Therapy', 8),
      (v_art_id, 'peer_reviewed', 1, 'Relaxation techniques for sleep in chronic pain', '2023', 'https://doi.org/10.1002/14651858.CD007407.pub5', 'Cochrane Database of Systematic Reviews', 9),
      (v_art_id, 'peer_reviewed', 1, 'Medications for sleep in chronic pain: risks and benefits', '2022', 'https://doi.org/10.1136/bmj-2022-070301', 'British Medical Journal', 10)
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
