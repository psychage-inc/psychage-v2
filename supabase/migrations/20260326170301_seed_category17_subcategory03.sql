-- ============================================================================
-- Seed: Category 17 (Aging, Dementia & Late-Life Mental Health) — Subcategory 03
-- 10 articles: CAT17-021 through CAT17-030
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert Category if not present
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  'Aging, Dementia & Late-Life Mental Health',
  'aging-dementia-late-life',
  'Comprehensive resources on mental health challenges unique to older adults, including dementia, Alzheimer disease, late-life depression, cognitive decline, caregiving, and strategies for healthy aging.',
  'Clock',
  17,
  55,
  '#D97706'
)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------------------
-- 2. Insert Subcategory
-- ---------------------------------------------------------------------------

DO $$
DECLARE
  v_cat_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'aging-dementia-late-life';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Depression and Anxiety in Older Adults', 'depression-and-anxiety-in-older-adults', v_cat_id, 3)
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'aging-dementia-late-life';
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'depression-and-anxiety-in-older-adults' AND category_id = v_cat_id;

  -- CAT17-021: Caring for the Caregiver: Professional Support and Resources
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Caring for the Caregiver: Professional Support and Resources',
    'caring-for-the-caregiver-professional-support-and-resources',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Respite Care', 'Adult Day Programs', 'Caregiver Resources', 'Support Services'],
    956,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-021',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Comprehensive guide to respite care, adult day programs, in-home services, and community resources that support family caregivers.',
    '/images/articles/cat17/cover-021.svg',
    8,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT17-022: Long-Distance Caregiving: Strategies for Supporting Aging Parents Remotely
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Long-Distance Caregiving: Strategies for Supporting Aging Parents Remotely',
    'long-distance-caregiving-strategies-for-supporting-aging-parents-remotely',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Long-Distance Caregiving', 'Remote Support', 'Care Coordination', 'Technology'],
    981,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-022',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Practical strategies for managing care from afar, including technology, local networks, care coordination, and when remote support is no longer enough.',
    '/images/articles/cat17/cover-022.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT17-023: Advance Directives and End-of-Life Care Decisions for Older Adults
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Advance Directives and End-of-Life Care Decisions for Older Adults',
    'advance-directives-and-end-of-life-care-decisions-for-older-adults',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Advance Directives', 'End-of-Life Planning', 'Healthcare Proxy', 'POLST'],
    975,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-023',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Navigate advance care planning with clarity: living wills, healthcare proxies, DNR orders, POLST forms, and how to honor wishes when crisis comes.',
    '/images/articles/cat17/cover-023.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT17-024: Choosing a Nursing Home or Assisted Living Facility: What to Look For
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Choosing a Nursing Home or Assisted Living Facility: What to Look For',
    'choosing-a-nursing-home-or-assisted-living-facility-what-to-look-for',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Nursing Homes', 'Assisted Living', 'Long-Term Care', 'Quality Assessment'],
    982,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-024',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Navigate nursing home selection with clear criteria: staff ratios, inspection reports, resident care quality, and red flags that signal poor facilities.',
    '/images/articles/cat17/cover-024.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT17-025: Managing Caregiver Guilt and Setting Boundaries Without Abandoning Your Loved One
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Managing Caregiver Guilt and Setting Boundaries Without Abandoning Your Loved One',
    'managing-caregiver-guilt-and-setting-boundaries-without-abandoning-your-loved-one',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Caregiver Guilt', 'Boundaries', 'Self-Care', 'Burnout Prevention'],
    984,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-025',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand caregiver guilt as a structural problem, not a personal failing, and learn how to set sustainable boundaries that preserve both care and self.',
    '/images/articles/cat17/cover-025.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT17-026: Paying for Elder Care: Medicare, Medicaid, and Long-Term Care Insurance
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Paying for Elder Care: Medicare, Medicaid, and Long-Term Care Insurance',
    'paying-for-elder-care-medicare-medicaid-and-long-term-care-insurance',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Medicare', 'Medicaid', 'Long-Term Care Insurance', 'Elder Care Costs'],
    1003,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-026',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Navigate the complex landscape of elder care financing: what Medicare covers (and doesn''t), Medicaid spend-down rules, long-term care insurance, and out-of-pocket costs.',
    '/images/articles/cat17/cover-026.svg',
    4,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT17-027: Cultural Considerations in Elder Care: Family Expectations and Tradition
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Cultural Considerations in Elder Care: Family Expectations and Tradition',
    'cultural-considerations-in-elder-care-family-expectations',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Cultural Competence', 'Family Caregiving', 'Multigenerational Care', 'Tradition'],
    997,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-027',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore how culture shapes elder care expectations, from multigenerational households to nursing home taboos, and navigate conflicts between tradition and capacity.',
    '/images/articles/cat17/cover-027.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT17-028: Sandwich Generation: Caregiving for Parents and Children Simultaneously
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Sandwich Generation: Caregiving for Parents and Children Simultaneously',
    'sandwich-generation-caregiving-for-parents-and-children',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Sandwich Generation', 'Dual Caregiving', 'Work-Life Balance', 'Financial Strain'],
    994,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-028',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Navigate the unique pressures of caring for aging parents while raising children: time scarcity, financial strain, and strategies for sustainable dual caregiving.',
    '/images/articles/cat17/cover-028.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT17-029: Transitioning from Caregiver to Bereavement: Grief After Long-Term Caregiving
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Transitioning from Caregiver to Bereavement: Grief After Long-Term Caregiving',
    'transitioning-from-caregiver-to-bereavement-grief-after-caregiving',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Caregiver Grief', 'Bereavement', 'Identity Transition', 'Complicated Grief'],
    979,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-029',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the complex grief that follows caregiving: relief, guilt, identity loss, and the process of rebuilding life after years of intensive care.',
    '/images/articles/cat17/cover-029.svg',
    3,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT17-030: Recognizing Elder Abuse and Neglect: Warning Signs and Reporting
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Recognizing Elder Abuse and Neglect: Warning Signs and Reporting',
    'recognizing-elder-abuse-and-neglect-warning-signs-reporting',
    'draft',
    'Aging, Dementia & Late-Life Mental Health',
    ARRAY['Elder Abuse', 'Neglect', 'Protective Services', 'Reporting'],
    994,
    'Psychage Editorial Team',
    'self_help',
    'CAT17-030',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Identify signs of elder abuse (physical, financial, emotional, neglect) and understand mandatory reporting, investigation processes, and protective interventions.',
    '/images/articles/cat17/cover-030.svg',
    3,
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

  -- === CAT17-021 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-021';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Gaugler et al. (2003). Adult day service use and reductions in caregiving hours. International Journal of Geriatric Psychiatry, 18(1), 55-62.', '2003', 'https://doi.org/10.1002/gps.772', 'International Journal of Geriatric Psychiatry', 1),
      (v_art_id, 'reference', 5, 'Zarit et al. (2011). Caregivers of persons with dementia: Characteristics and service use. In V. Tuokko & D. Hultsch (Eds.), Mild cognitive impairment. Psychology Press.', '2011', 'https://www.taylorfrancis.com/chapters/edit/10.4324/9780203841174', 'Psychology Press', 2),
      (v_art_id, 'government', 2, 'Medicaid.gov (2024). Home and Community-Based Services.', '2024', 'https://www.medicaid.gov/medicaid/home-community-based-services/', 'Centers for Medicare & Medicaid Services', 3),
      (v_art_id, 'government', 2, 'U.S. Department of Veterans Affairs (2024). Aid and Attendance and Housebound Benefits.', '2024', 'https://www.va.gov/pension/aid-attendance-housebound/', 'U.S. Department of Veterans Affairs', 4),
      (v_art_id, 'professional_org', 3, 'National Alliance for Caregiving (2020). Caregiving in the U.S. 2020 Report.', '2020', 'https://www.caregiving.org/caregiving-in-the-us-2020/', 'National Alliance for Caregiving', 5),
      (v_art_id, 'peer_reviewed', 1, 'Gitlin et al. (2010). Effect of multicomponent interventions on caregiver burden and depression. Psychology and Aging, 25(2), 406-418.', '2010', 'https://doi.org/10.1037/a0018713', 'Psychology and Aging', 6),
      (v_art_id, 'peer_reviewed', 1, 'Montgomery et al. (2002). A cost-benefit analysis of respite care. Journal of Applied Gerontology, 21(2), 151-171.', '2002', 'https://doi.org/10.1177/07364802021002002', 'Journal of Applied Gerontology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Brodaty & Donkin (2009). Family caregivers of people with dementia. Dialogues in Clinical Neuroscience, 11(2), 217-228.', '2009', 'https://doi.org/10.31887/DCNS.2009.11.2/hbrodaty', 'Dialogues in Clinical Neuroscience', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT17-022 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-022';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'government', 2, 'National Alliance for Caregiving and AARP. Caregiving in the U.S. 2020.', '2020', 'https://www.aarp.org/caregiving/basics/info-2020/caregiving-in-the-united-states.html', 'AARP', 1),
      (v_art_id, 'peer_reviewed', 1, 'Czaja, S. J., et al. A videophone psychosocial intervention for dementia caregivers.', '2013', 'https://doi.org/10.1016/j.jagp.2012.12.016', 'American Journal of Geriatric Psychiatry', 2),
      (v_art_id, 'professional_org', 3, 'Aging Life Care Association. What is an Aging Life Care Professional?', '2021', 'https://www.aginglifecare.org/', 'Aging Life Care Association', 3),
      (v_art_id, 'peer_reviewed', 1, 'Koerin, B. B., & Harrigan, M. P. P-S-Y-C-H-R: A framework for long-distance caregiving.', '2002', 'https://doi.org/10.1300/J083v37n03_06', 'Journal of Gerontological Social Work', 4),
      (v_art_id, 'peer_reviewed', 1, 'Parker, D., et al. Quality assessment and improvement in nursing homes.', '2004', 'https://doi.org/10.1093/geront/44.2.159', 'The Gerontologist', 5),
      (v_art_id, 'peer_reviewed', 1, 'Carretero, S., et al. The informal caregiver''s burden of dependent people.', '2009', 'https://doi.org/10.1016/j.maturitas.2008.12.004', 'Maturitas', 6),
      (v_art_id, 'government', 2, 'National Institute on Aging. Long-Distance Caregiving: Twenty Questions and Answers.', '2022', 'https://www.nia.nih.gov/health/caregiving/long-distance-caregiving', 'National Institute on Aging', 7),
      (v_art_id, 'professional_org', 3, 'Family Caregiver Alliance. Long-Distance Caregiving Fact Sheet.', '2021', 'https://www.caregiver.org/resource/long-distance-caregiving/', 'Family Caregiver Alliance', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT17-023 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-023';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Yadav, K. N., et al. Approximately one in three US adults completes any type of advance directive for end-of-life care.', '2017', 'https://doi.org/10.1377/hlthaff.2017.0175', 'Health Affairs', 1),
      (v_art_id, 'peer_reviewed', 1, 'Sabatino, C. P. The evolution of health care advance planning law and policy.', '2010', 'https://doi.org/10.1111/j.1468-0009.2009.00587.x', 'The Milbank Quarterly', 2),
      (v_art_id, 'clinical_guideline', 4, 'National POLST. POLST and Advance Directives.', '2023', 'https://polst.org/', 'National POLST', 3),
      (v_art_id, 'peer_reviewed', 1, 'Wright, A. A., et al. Associations between end-of-life discussions, patient mental health, medical care near death, and caregiver bereavement adjustment.', '2008', 'https://doi.org/10.1001/jama.300.14.1665', 'JAMA', 4),
      (v_art_id, 'peer_reviewed', 1, 'Silveira, M. J., et al. Patients'' knowledge of options at the end of life.', '2000', 'https://doi.org/10.1111/j.1532-5415.2000.tb03146.x', 'Journal of the American Geriatrics Society', 5),
      (v_art_id, 'government', 2, 'National Institute on Aging. Advance Care Planning: Healthcare Directives.', '2022', 'https://www.nia.nih.gov/health/advance-care-planning', 'National Institute on Aging', 6),
      (v_art_id, 'peer_reviewed', 1, 'Detering, K. M., et al. The impact of advance care planning on end of life care in elderly patients.', '2010', 'https://doi.org/10.1136/bmj.c1345', 'BMJ', 7),
      (v_art_id, 'professional_org', 3, 'The Conversation Project. Starter Kit for Families.', '2021', 'https://theconversationproject.org/', 'Institute for Healthcare Improvement', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT17-024 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-024';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'government', 2, 'U.S. Centers for Medicare & Medicaid Services. Nursing Home Compare Five-Star Quality Rating System.', '2023', 'https://www.medicare.gov/care-compare/', 'CMS', 1),
      (v_art_id, 'peer_reviewed', 1, 'Castle, N. G., & Engberg, J. Staff turnover and quality of care in nursing homes.', '2005', 'https://doi.org/10.1097/01.mlr.0000163661.67170.b9', 'Medical Care', 2),
      (v_art_id, 'peer_reviewed', 1, 'Harrington, C., et al. Nursing home staffing standards and staffing levels in six countries.', '2012', 'https://doi.org/10.1111/j.1547-5069.2011.01430.x', 'Journal of Nursing Scholarship', 3),
      (v_art_id, 'government', 2, 'Office of Inspector General. Adverse Events in Skilled Nursing Facilities.', '2014', 'https://oig.hhs.gov/oei/reports/oei-06-11-00370.asp', 'U.S. Department of Health and Human Services', 4),
      (v_art_id, 'professional_org', 3, 'National Consumer Voice for Quality Long-Term Care. Choosing a Nursing Home.', '2022', 'https://theconsumervoice.org/', 'Consumer Voice', 5),
      (v_art_id, 'peer_reviewed', 1, 'Grabowski, D. C., & Mor, V. Nursing home quality: A decade of action and reaction.', '2004', 'https://doi.org/10.1300/J031v16n03_05', 'Journal of Aging & Social Policy', 6),
      (v_art_id, 'peer_reviewed', 1, 'Stevenson, D. G., & Grabowski, D. C. Sizing up the market for assisted living.', '2010', 'https://doi.org/10.1377/hlthaff.2009.0527', 'Health Affairs', 7),
      (v_art_id, 'government', 2, 'National Institute on Aging. What to Ask and Look for When Choosing a Nursing Home.', '2022', 'https://www.nia.nih.gov/health/nursing-homes', 'National Institute on Aging', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT17-025 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-025';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'government', 2, 'National Alliance for Caregiving and AARP. Caregiving in the U.S. 2020.', '2020', 'https://www.aarp.org/caregiving/basics/info-2020/caregiving-in-the-united-states.html', 'AARP', 1),
      (v_art_id, 'peer_reviewed', 1, 'Bevans, M., & Sternberg, E. M. Caregiving burden, stress, and health effects among family caregivers of adult cancer patients.', '2012', 'https://doi.org/10.1001/jama.2012.5063', 'JAMA', 2),
      (v_art_id, 'peer_reviewed', 1, 'Aneshensel, C. S., et al. Profiles in Caregiving: The Unexpected Career.', '1995', 'https://doi.org/10.1016/B978-012059540-2/50003-8', 'Academic Press', 3),
      (v_art_id, 'peer_reviewed', 1, 'Gaugler, J. E., et al. The longitudinal effects of nursing home placement on family caregivers.', '2007', 'https://doi.org/10.1177/0164027507300802', 'Research on Aging', 4),
      (v_art_id, 'peer_reviewed', 1, 'Schulz, R., & Beach, S. R. Caregiving as a risk factor for mortality.', '1999', 'https://doi.org/10.1001/jama.282.23.2215', 'JAMA', 5),
      (v_art_id, 'peer_reviewed', 1, 'Teri, L., et al. Treatment of agitation in Alzheimer disease patients.', '2000', 'https://doi.org/10.1001/archpsyc.57.11.1039', 'Archives of General Psychiatry', 6),
      (v_art_id, 'professional_org', 3, 'Family Caregiver Alliance. Caregiver Self-Care: Taking Care of YOU.', '2021', 'https://www.caregiver.org/resource/caregiver-self-care/', 'Family Caregiver Alliance', 7),
      (v_art_id, 'peer_reviewed', 1, 'Sorensen, S., et al. Dementia care: Mental health effects, intervention strategies, and clinical implications.', '2006', 'https://doi.org/10.1016/S1474-4422(05)70277-8', 'The Lancet Neurology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT17-026 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-026';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'government', 2, 'Centers for Medicare & Medicaid Services. Medicare Coverage of Skilled Nursing Facility Care.', '2023', 'https://www.medicare.gov/coverage/skilled-nursing-facility-snf-care', 'CMS', 1),
      (v_art_id, 'government', 2, 'Kaiser Family Foundation. Medicaid and Long-Term Services and Supports: A Primer.', '2022', 'https://www.kff.org/medicaid/', 'Kaiser Family Foundation', 2),
      (v_art_id, 'professional_org', 3, 'Genworth Cost of Care Survey 2023.', '2023', 'https://www.genworth.com/aging-and-you/finances/cost-of-care.html', 'Genworth Financial', 3),
      (v_art_id, 'professional_org', 3, 'American Association for Long-Term Care Insurance. Facts.', '2023', 'https://www.aaltci.org/', 'AALTCI', 4)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT17-027 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-027';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Dilworth-Anderson, P., et al. Racial and ethnic differences in perceptions of caregiver burden.', '2004', 'https://doi.org/10.1093/geront/44.2.237', 'The Gerontologist', 1),
      (v_art_id, 'peer_reviewed', 1, 'Pharr, J. R., et al. The influence of cultural values on immigrant Latino parents perceptions of family caregiving.', '2014', 'https://doi.org/10.1016/j.jaging.2014.02.001', 'Journal of Aging Studies', 2),
      (v_art_id, 'peer_reviewed', 1, 'Jang, Y., et al. Symptoms of depression in Korean older immigrants.', '2007', 'https://doi.org/10.1080/13607860701368497', 'Aging & Mental Health', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT17-028 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-028';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'government', 2, 'Pew Research Center. The Sandwich Generation: Rising Financial Burdens.', '2013', 'https://www.pewresearch.org/social-trends/', 'Pew Research', 1),
      (v_art_id, 'peer_reviewed', 1, 'Do, E. K., et al. Psychosocial factors associated with the sandwich generation.', '2014', 'https://doi.org/10.1093/geront/gnt100', 'The Gerontologist', 2),
      (v_art_id, 'professional_org', 3, 'MetLife Mature Market Institute. Caregiving Costs to Working Caregivers.', '2011', 'https://www.metlife.com/about-us/newsroom/2011/june/', 'MetLife', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT17-029 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-029';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Schulz, R., et al. End-of-life care and the effects of bereavement on family caregivers.', '2003', 'https://doi.org/10.1056/NEJMsa035373', 'New England Journal of Medicine', 1),
      (v_art_id, 'peer_reviewed', 1, 'Holley, C. K., & Mast, B. T. The impact of anticipatory grief on caregiver burden.', '2009', 'https://doi.org/10.1093/geront/gnp061', 'The Gerontologist', 2),
      (v_art_id, 'peer_reviewed', 1, 'Larkin, M. Life after caring: The post-caring experiences of former carers.', '2009', 'https://doi.org/10.1093/bjsw/bcn030', 'British Journal of Social Work', 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT17-030 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT17-030';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Acierno, R., et al. Prevalence and correlates of emotional, physical, sexual, and financial abuse: The National Elder Mistreatment Study.', '2010', 'https://doi.org/10.2105/AJPH.2009.163089', 'American Journal of Public Health', 1),
      (v_art_id, 'professional_org', 3, 'MetLife Mature Market Institute. Broken Trust: Elders, Family, and Finances.', '2009', 'https://www.metlife.com/about-us/newsroom/', 'MetLife', 2),
      (v_art_id, 'government', 2, 'National Center on Elder Abuse. Elder Abuse: The Size of the Problem.', '2021', 'https://ncea.acl.gov/', 'Administration on Aging', 3)
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
  WHERE a.article_production_id LIKE 'CAT17-%';

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;
