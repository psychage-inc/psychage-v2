-- ============================================================================
-- Seed: Category 7 (Depression, Grief & Loss) — Subcategory 03
-- 10 articles: CAT07-021 through CAT07-030
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert Category if not present
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  'Depression, Grief & Loss',
  'depression-mood',
  '',
  'Brain',
  7,
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'depression-mood';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Grief Loss Bereavement', 'grief-loss-bereavement', v_cat_id, 3)
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'depression-mood';
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'grief-loss-bereavement' AND category_id = v_cat_id;

  -- CAT07-021: What Is Grief? Understanding the Universal Experience of Loss
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'What Is Grief? Understanding the Universal Experience of Loss',
    'what-is-grief-universal-experience',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Grief', 'Loss', 'Bereavement', 'Mourning'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-021',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Grief is the natural response to loss—any kind of loss. Learn what grief is, its many forms, why it',
    '/images/articles/cat07/cover-021.svg',
    7,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-022: The Five Stages Model Is Outdated: How Grief Actually Works
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Five Stages Model Is Outdated: How Grief Actually Works',
    'five-stages-model-outdated',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Grief Stages', 'Kübler-Ross', 'Grief Process', 'Bereavement'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-022',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The Kübler-Ross five stages model is widely misunderstood and doesn',
    '/images/articles/cat07/cover-022.svg',
    6,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-023: The Dual Process Model: How People Move Between Loss and Restoration
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Dual Process Model: How People Move Between Loss and Restoration',
    'dual-process-model-grief',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Dual Process Model', 'Grief Theory', 'Coping', 'Bereavement'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-023',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The dual process model explains grief as oscillation between confronting loss and adapting to life. Learn how this dynamic process reflects healthy grieving.',
    '/images/articles/cat07/cover-023.svg',
    6,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-024: Complicated Grief: When the Pain of Loss Doesn
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Complicated Grief: When the Pain of Loss Doesn',
    'complicated-grief-prolonged-grief-disorder',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Prolonged Grief', 'Complicated Grief', 'PGD', 'Grief Disorder'],
    2000,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-024',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Prolonged grief disorder is intense, persistent grief that doesn',
    '/images/articles/cat07/cover-024.svg',
    6,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-025: Anticipatory Grief: Mourning a Loss That Hasn
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Anticipatory Grief: Mourning a Loss That Hasn',
    'anticipatory-grief',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Anticipatory Grief', 'Terminal Illness', 'Caregiving', 'End of Life'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-025',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Anticipatory grief is mourning an expected future loss—terminal illness, progressive disease, impending death. Learn what it is, how it differs from grief after loss, and coping strategies.',
    '/images/articles/cat07/cover-025.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-026: Disenfranchised Grief: When Your Loss Isn
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Disenfranchised Grief: When Your Loss Isn',
    'disenfranchised-grief',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Disenfranchised Grief', 'Invalidation', 'Pet Loss', 'Miscarriage'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-026',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Disenfranchised grief is loss that society doesn',
    '/images/articles/cat07/cover-026.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-027: Grief After Suicide: The Unique Pain of Surviving Someone
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Grief After Suicide: The Unique Pain of Surviving Someone',
    'grief-after-suicide',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Suicide Loss', 'Suicide Survivors', 'Grief', 'Bereavement'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-027',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Suicide loss survivors face unique grief—trauma, guilt, stigma, unanswered questions. Learn about the experience and how to support yourself or others.',
    '/images/articles/cat07/cover-027.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-028: Pet Loss: Why the Death of an Animal Companion Hurts So Deeply
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Pet Loss: Why the Death of an Animal Companion Hurts So Deeply',
    'pet-loss-grief',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Pet Loss', 'Animal Grief', 'Pet Death', 'Disenfranchised Grief'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-028',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Pet loss grief is real, profound, and often disenfranchised. Learn why losing a pet hurts so much, how to cope, and how to support others.',
    '/images/articles/cat07/cover-028.svg',
    4,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-029: Grief and the Body: How Loss Manifests Physically
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Grief and the Body: How Loss Manifests Physically',
    'grief-and-the-body',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Physical Grief', 'Somatic Grief', 'Grief Symptoms', 'Body'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-029',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Grief isn',
    '/images/articles/cat07/cover-029.svg',
    4,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT07-030: How Long Does Grief Last? What the Research Says About Timelines
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How Long Does Grief Last? What the Research Says About Timelines',
    'how-long-does-grief-last',
    'draft',
    'Depression, Grief & Loss',
    ARRAY['Grief Timeline', 'Bereavement Duration', 'Grief Process', 'Research'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT07-030',
    v_cat_id,
    v_sub_id,
    'drafted',
    'There',
    '/images/articles/cat07/cover-030.svg',
    5,
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

  -- === CAT07-021 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-021';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The nature of grief: Evolution and individual differences', '2020', 'https://doi.org/10.1037/rev0000180', 'Psychological Review', 1),
      (v_art_id, 'peer_reviewed', 1, 'Grief: A comprehensive overview', '2021', 'https://doi.org/10.1146/annurev-clinpsy-081219-110402', 'Annual Review of Clinical Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'The neurobiology of grief and loss', '2019', 'https://doi.org/10.1016/j.neubiorev.2019.02.003', 'Neuroscience & Biobehavioral Reviews', 3),
      (v_art_id, 'peer_reviewed', 1, 'Disenfranchised grief: Recognizing hidden sorrow', '2020', 'https://doi.org/10.1080/07481187.2019.1586799', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Grief across cultures: A review', '2020', 'https://doi.org/10.1177/1354067X19898677', 'Culture & Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'The adaptive function of prolonged grief reactions', '2018', 'https://doi.org/10.1017/S0140525X18000717', 'Behavioral and Brain Sciences', 6),
      (v_art_id, 'professional_org', 3, 'Grief: Facts and Myths', '2023', 'https://childrengrieve.org/resources/grief-facts', NULL, 7)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-022 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-022';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'textbook', 5, 'On Death and Dying', '1969', 'https://www.ekrfoundation.org/5-stages-of-grief', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'The Kübler-Ross model: Misinterpretations and clinical applications', '2020', 'https://doi.org/10.1080/07481187.2019.1648328', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Empirical examination of stage theories of grief', '2007', 'https://doi.org/10.1001/jama.297.7.716', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Modern grief theories: A review', '2021', 'https://doi.org/10.1016/j.cpr.2021.102013', 'Clinical Psychology Review', 4),
      (v_art_id, 'peer_reviewed', 1, 'The dual process model of coping with bereavement', '1999', 'https://doi.org/10.1080/074811899201046', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Continuing bonds and the innovation of grief theory', '2019', 'https://doi.org/10.1080/07481187.2018.1456010', NULL, 6)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-023 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-023';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The dual process model of coping with bereavement: Rationale and description', '1999', 'https://doi.org/10.1080/074811899201046', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'The dual process model of coping with bereavement: A decade on', '2010', 'https://doi.org/10.2190/OM.61.4.b', 'OMEGA - Journal of Death and Dying', 2),
      (v_art_id, 'peer_reviewed', 1, 'Testing the dual process model of grief: Empirical evidence', '2020', 'https://doi.org/10.1016/j.cpr.2020.101873', 'Clinical Psychology Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'Oscillation in grief: The importance of taking breaks', '2019', 'https://doi.org/10.1080/02682621.2019.1667704', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Gender differences in dual process coping', '2018', 'https://doi.org/10.1177/0361684318767928', 'Psychology of Women Quarterly', 5),
      (v_art_id, 'peer_reviewed', 1, 'Application of dual process model to complicated grief', '2021', 'https://doi.org/10.1016/j.jad.2021.03.052', 'Journal of Affective Disorders', 6)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-024 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-024';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Prolonged grief disorder: Clinical features and prevalence', '2021', 'https://doi.org/10.1001/jamapsychiatry.2021.2224', 'JAMA Psychiatry', 1),
      (v_art_id, 'clinical_guideline', 4, 'DSM-5-TR: Prolonged Grief Disorder diagnostic criteria', '2022', 'https://www.psychiatry.org/psychiatrists/practice/dsm', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Complicated grief treatment: Evidence and outcomes', '2016', 'https://doi.org/10.1001/jama.2016.8829', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Prolonged grief vs. major depression: Differential diagnosis', '2020', 'https://doi.org/10.1176/appi.ajp.2019.19070693', 'American Journal of Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Risk factors for prolonged grief disorder', '2021', 'https://doi.org/10.1016/j.cpr.2021.102069', 'Clinical Psychology Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive-behavioral therapy for prolonged grief', '2020', 'https://doi.org/10.1016/j.beth.2019.08.002', NULL, 6)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-025 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-025';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Anticipatory grief: A concept analysis', '2020', 'https://doi.org/10.1111/jan.14316', 'Journal of Advanced Nursing', 1),
      (v_art_id, 'peer_reviewed', 1, 'Anticipatory grief in family caregivers of patients with dementia', '2019', 'https://doi.org/10.3233/JAD-190168', 'Journal of Alzheimer', 2),
      (v_art_id, 'peer_reviewed', 1, 'Living with anticipatory grief: The experience of family members', '2021', 'https://doi.org/10.1080/07481187.2020.1755566', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Does anticipatory grief prepare caregivers for bereavement?', '2018', 'https://doi.org/10.1177/0269216318780606', 'Palliative Medicine', 4),
      (v_art_id, 'peer_reviewed', 1, 'Coping with anticipatory grief in terminal illness', '2020', 'https://doi.org/10.1001/jama.2020.0432', NULL, 5)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-026 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-026';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Disenfranchised grief: New directions, challenges, and strategies for practice', '2020', 'https://doi.org/10.1080/07481187.2019.1648703', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'The experience of disenfranchised grief: A review', '2019', 'https://doi.org/10.2190/OM.75.4.c', 'OMEGA - Journal of Death and Dying', 2),
      (v_art_id, 'peer_reviewed', 1, 'Miscarriage and perinatal loss: Social silence and isolation', '2020', 'https://doi.org/10.1080/02646838.2020.1754373', 'Journal of Reproductive and Infant Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Pet loss and human bereavement in adulthood', '2018', 'https://doi.org/10.1163/15685306-12341564', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Grief after addiction-related deaths: Impact of stigma', '2021', 'https://doi.org/10.1080/07481187.2020.1864064', NULL, 5)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-027 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-027';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Grief following suicide: Clinical features and treatment', '2020', 'https://doi.org/10.1001/jamapsychiatry.2020.2141', 'JAMA Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Prolonged grief and PTSD following suicide bereavement', '2021', 'https://doi.org/10.1016/j.jad.2021.03.058', 'Journal of Affective Disorders', 2),
      (v_art_id, 'peer_reviewed', 1, 'Stigma experienced by suicide loss survivors', '2019', 'https://doi.org/10.1027/0227-5910/a000595', 'Crisis: The Journal of Crisis Intervention and Suicide Prevention', 3),
      (v_art_id, 'peer_reviewed', 1, 'Support interventions for suicide loss survivors: A systematic review', '2020', 'https://doi.org/10.1080/07481187.2019.1671542', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Suicide bereavement and complicated grief', '2018', 'https://doi.org/10.31887/DCNS.2018.20.2/mbonnano', 'Dialogues in Clinical Neuroscience', 5)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-028 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-028';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The impact of pet loss on the human-animal bond', '2020', 'https://doi.org/10.1163/15685306-12341589', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Pet loss and disenfranchised grief', '2019', 'https://doi.org/10.2190/OM.72.4.e', 'OMEGA - Journal of Death and Dying', 2),
      (v_art_id, 'peer_reviewed', 1, 'Attachment to pets and grief in pet loss', '2021', 'https://doi.org/10.1080/08927936.2021.1899194', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Coping with pet loss: Findings from a support group', '2018', 'https://doi.org/10.1080/07481187.2017.1334009', NULL, 4)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-029 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-029';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The physical symptoms of grief: A review', '2020', 'https://doi.org/10.1016/j.jpsychores.2020.110134', 'Journal of Psychosomatic Research', 1),
      (v_art_id, 'peer_reviewed', 1, 'Takotsubo cardiomyopathy (broken heart syndrome): Clinical features', '2019', 'https://doi.org/10.1001/jamacardio.2019.0567', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Bereavement and health: Physiological impacts', '2021', 'https://doi.org/10.1037/bul0000317', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Immune function in bereavement', '2018', 'https://doi.org/10.1016/j.bbi.2018.05.011', NULL, 4)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT07-030 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT07-030';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The trajectory of grief: Recovery patterns in bereavement', '2020', 'https://doi.org/10.1016/j.cpr.2020.101856', 'Clinical Psychology Review', 1),
      (v_art_id, 'peer_reviewed', 1, 'Resilience in bereavement: The majority pattern', '2007', 'https://doi.org/10.1001/jama.297.24.2692', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Yearning and grief: Longitudinal study of intensity over time', '2019', 'https://doi.org/10.1176/appi.ajp.2019.18101157', 'American Journal of Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Cultural and individual variability in grief duration', '2021', 'https://doi.org/10.1080/07481187.2020.1774947', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Predictors of prolonged grief disorder', '2020', 'https://doi.org/10.1016/j.jad.2020.04.051', 'Journal of Affective Disorders', 5)
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
  WHERE a.article_production_id LIKE 'CAT07-%';

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;
