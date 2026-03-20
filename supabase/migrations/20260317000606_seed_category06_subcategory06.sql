-- ============================================================================
-- Seed: Category 6 (Family, Parenting & Childhood Patterns) — Subcategory 06
-- 10 articles: CAT06-051 through CAT06-060
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert Category if not present
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  'Family, Parenting & Childhood Patterns',
  'relationships-social',
  '',
  'Brain',
  6,
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'relationships-social';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Supporting Childrens Mental Health', 'supporting-childrens-mental-health', v_cat_id, 6)
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'relationships-social';
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'supporting-childrens-mental-health' AND category_id = v_cat_id;

  -- CAT06-051: Signs Your Child May Be Struggling: A Parent
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Signs Your Child May Be Struggling: A Parent',
    'signs-child-struggling-parents-guide-mental-health',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Children', 'Mental Health', 'Warning Signs', 'Early Intervention'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-051',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn to recognize the warning signs of mental health struggles in children and when to seek professional help.',
    '/images/articles/cat06/cover-051.svg',
    8,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-052: How to Talk to Your Child About Mental Health: Age-Appropriate Conversations
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How to Talk to Your Child About Mental Health: Age-Appropriate Conversations',
    'talk-child-mental-health-age-appropriate-conversations',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Mental Health', 'Communication', 'Parenting', 'Children'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-052',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how to have honest, age-appropriate conversations about mental health that normalize emotions and encourage help-seeking.',
    '/images/articles/cat06/cover-052.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-053: Childhood Anxiety: What It Looks Like and How Parents Can Help
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Childhood Anxiety: What It Looks Like and How Parents Can Help',
    'childhood-anxiety-what-it-looks-like-how-parents-help',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Childhood Anxiety', 'Parenting', 'Mental Health', 'Evidence-Based Strategies'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-053',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand how anxiety presents in children, differentiate normal worry from clinical anxiety, and learn evidence-based parenting strategies.',
    '/images/articles/cat06/cover-053.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-054: When Your Child Won
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'When Your Child Won',
    'child-wont-go-school-understanding-school-avoidance',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['School Refusal', 'Anxiety', 'Children', 'Parenting Strategies'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-054',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn what causes school refusal, how to differentiate types of school avoidance, and evidence-based strategies to help your child return to school.',
    '/images/articles/cat06/cover-054.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-055: Helping Children Manage Big Emotions: Emotion Coaching for Parents
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Helping Children Manage Big Emotions: Emotion Coaching for Parents',
    'helping-children-manage-big-emotions-emotion-coaching',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Emotion Coaching', 'Emotional Regulation', 'Parenting', 'Child Development'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-055',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn the emotion coaching approach that helps children develop emotional regulation, resilience, and strong parent-child bonds.',
    '/images/articles/cat06/cover-055.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-056: Children and Grief: How Kids Process Loss Differently Than Adults
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Children and Grief: How Kids Process Loss Differently Than Adults',
    'children-grief-how-kids-process-loss-differently',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Grief', 'Children', 'Loss', 'Bereavement'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-056',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand how children experience and express grief at different ages and how to support them through loss.',
    '/images/articles/cat06/cover-056.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-057: When Your Teen Is Self-Harming: A Parent
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'When Your Teen Is Self-Harming: A Parent',
    'teen-self-harming-parents-guide-responding-care',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Self-Harm', 'Adolescents', 'Crisis', 'Parenting'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-057',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how to respond when you discover your teen is self-harming, why it happens, and how to get appropriate help.',
    '/images/articles/cat06/cover-057.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-058: Bullying and Mental Health: How to Support Your Child Through Social Cruelty
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Bullying and Mental Health: How to Support Your Child Through Social Cruelty',
    'bullying-mental-health-supporting-child-social-cruelty',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Bullying', 'Children', 'School', 'Mental Health'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-058',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how bullying affects mental health, how to recognize signs your child is being bullied, and effective intervention strategies.',
    '/images/articles/cat06/cover-058.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-059: Should My Child See a Therapist? When and How to Seek Professional Help
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Should My Child See a Therapist? When and How to Seek Professional Help',
    'should-child-see-therapist-when-seek-professional-help',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Child Therapy', 'Mental Health', 'Parenting', 'Professional Help'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-059',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn when therapy is appropriate for children, how to find the right therapist, and what to expect from child therapy.',
    '/images/articles/cat06/cover-059.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT06-060: Building Resilience in Children: What the Research Says Actually Works
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Building Resilience in Children: What the Research Says Actually Works',
    'building-resilience-children-research-what-works',
    'draft',
    'Family, Parenting & Childhood Patterns',
    ARRAY['Resilience', 'Child Development', 'Parenting', 'Evidence-Based'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT06-060',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn evidence-based strategies to help children develop resilience, bounce back from adversity, and thrive despite challenges.',
    '/images/articles/cat06/cover-060.svg',
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

  -- === CAT06-051 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-051';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Early identification of child mental health problems', '2020', 'https://doi.org/10.1016/j.jaac.2020.02.009', 'Journal of the American Academy of Child & Adolescent Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Developmental variations in mental health symptoms', '2021', 'https://doi.org/10.1111/cdep.12413', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Parent recognition of child distress', '2019', 'https://doi.org/10.1111/jcpp.13108', 'Journal of Child Psychology and Psychiatry', 3),
      (v_art_id, 'government', 2, 'When to seek professional help for children', '2020', 'https://doi.org/10.1542/peds.2020-1570', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Physical symptoms of emotional distress in children', '2021', 'https://doi.org/10.1007/s10567-020-00338-0', 'Clinical Child and Family Psychology Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'School performance and mental health', '2020', 'https://doi.org/10.1007/s12310-019-09354-8', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Cultural considerations in child mental health assessment', '2021', 'https://doi.org/10.1037/cdp0000419', 'Cultural Diversity and Ethnic Minority Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Early intervention benefits', '2019', 'https://doi.org/10.1037/amp0000467', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-052 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-052';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Parent-child communication about emotions', '2020', 'https://doi.org/10.1037/fam0000672', 'Journal of Family Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Mental health literacy in children', '2021', 'https://doi.org/10.1007/s12310-020-09402-4', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Age-appropriate mental health education', '2020', 'https://doi.org/10.1111/cdep.12391', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Reducing mental health stigma in families', '2021', 'https://doi.org/10.1007/s10567-020-00342-4', 'Clinical Child and Family Psychology Review', 4),
      (v_art_id, 'peer_reviewed', 1, 'Emotion coaching for parents', '2019', 'https://doi.org/10.1080/15295192.2019.1642087', 'Parenting: Science and Practice', 5),
      (v_art_id, 'peer_reviewed', 1, 'Talking to teens about mental health', '2020', 'https://doi.org/10.1016/j.jadohealth.2020.02.005', 'Journal of Adolescent Health', 6),
      (v_art_id, 'peer_reviewed', 1, 'Normalizing help-seeking in children', '2021', 'https://doi.org/10.1037/ort0000527', 'American Journal of Orthopsychiatry', 7),
      (v_art_id, 'peer_reviewed', 1, 'Cultural approaches to mental health conversations', '2020', 'https://doi.org/10.1037/cdp0000391', 'Cultural Diversity and Ethnic Minority Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-053 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-053';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Prevalence of childhood anxiety disorders', '2020', 'https://doi.org/10.1016/j.jaac.2020.05.014', 'Journal of the American Academy of Child & Adolescent Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Parental accommodation of child anxiety', '2021', 'https://doi.org/10.1007/s10567-020-00335-3', 'Clinical Child and Family Psychology Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Exposure therapy for childhood anxiety', '2020', 'https://doi.org/10.1016/j.brat.2020.103698', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive-behavioral strategies for parents', '2021', 'https://doi.org/10.1111/jcpp.13442', 'Journal of Child Psychology and Psychiatry', 4),
      (v_art_id, 'government', 2, 'Physical symptoms of anxiety in children', '2019', 'https://doi.org/10.1542/peds.2019-0851', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'School refusal and separation anxiety', '2020', 'https://doi.org/10.1007/s12310-019-09365-5', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Parental anxiety and child anxiety transmission', '2020', 'https://doi.org/10.1016/j.cpr.2020.101814', 'Clinical Psychology Review', 7),
      (v_art_id, 'peer_reviewed', 1, 'When to seek professional help for child anxiety', '2021', 'https://doi.org/10.1037/amp0000798', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-054 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-054';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'School refusal: Definition and prevalence', '2020', 'https://doi.org/10.1111/camh.12363', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Anxiety-driven school avoidance', '2021', 'https://doi.org/10.1007/s12310-020-09408-y', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive-behavioral intervention for school refusal', '2019', 'https://doi.org/10.1080/15374416.2018.1555761', 'Journal of Clinical Child & Adolescent Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Truancy vs. school refusal', '2020', 'https://doi.org/10.1002/pits.22398', 'Psychology in the Schools', 4),
      (v_art_id, 'peer_reviewed', 1, 'School-based interventions for attendance', '2021', 'https://doi.org/10.1007/s10648-020-09573-3', 'Educational Psychology Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'Bullying and school avoidance', '2020', 'https://doi.org/10.1080/15388220.2019.1707682', 'Journal of School Violence', 6),
      (v_art_id, 'peer_reviewed', 1, 'Family factors in school refusal', '2019', 'https://doi.org/10.1111/famp.12456', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Medication and therapy for school refusal', '2021', 'https://doi.org/10.1016/j.jaac.2020.11.020', 'Journal of the American Academy of Child & Adolescent Psychiatry', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-055 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-055';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Emotion coaching and child outcomes', '2020', 'https://doi.org/10.1080/15295192.2019.1694836', 'Parenting: Science and Practice', 1),
      (v_art_id, 'peer_reviewed', 1, 'Gottman emotion coaching framework', '2019', 'https://doi.org/10.1037/fam0000505', 'Journal of Family Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Emotional intelligence development', '2021', 'https://doi.org/10.1111/cdev.13546', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Emotion dismissing parenting effects', '2020', 'https://doi.org/10.1007/s10567-020-00324-6', 'Clinical Child and Family Psychology Review', 4),
      (v_art_id, 'peer_reviewed', 1, 'Teaching emotional regulation skills', '2021', 'https://doi.org/10.1017/S0954579420000870', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Cultural variations in emotion socialization', '2020', 'https://doi.org/10.1037/cdp0000383', 'Cultural Diversity and Ethnic Minority Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Emotion coaching in practice', '2019', 'https://doi.org/10.1016/j.appdev.2019.101074', 'Journal of Applied Developmental Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Long-term benefits of emotion coaching', '2020', 'https://doi.org/10.1037/amp0000651', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-056 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-056';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Childhood bereavement and development', '2020', 'https://doi.org/10.1080/07481187.2019.1626936', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Developmental differences in grief processing', '2021', 'https://doi.org/10.1111/jcpp.13453', 'Journal of Child Psychology and Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Supporting grieving children', '2020', 'https://doi.org/10.1007/s10567-020-00330-8', 'Clinical Child and Family Psychology Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'Complicated grief in children', '2019', 'https://doi.org/10.1016/j.jaac.2019.04.018', 'Journal of the American Academy of Child & Adolescent Psychiatry', 4),
      (v_art_id, 'government', 2, 'Talking to children about death', '2020', 'https://doi.org/10.1542/peds.2020-0804', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Grief in adolescents', '2021', 'https://doi.org/10.1016/j.jadohealth.2020.09.042', 'Journal of Adolescent Health', 6),
      (v_art_id, 'peer_reviewed', 1, 'Cultural approaches to childhood grief', '2020', 'https://doi.org/10.1037/cdp0000396', 'Cultural Diversity and Ethnic Minority Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Long-term effects of childhood loss', '2020', 'https://doi.org/10.1017/S0954579420000882', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-057 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-057';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Prevalence of adolescent self-harm', '2020', 'https://doi.org/10.1001/jamapediatrics.2020.1032', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Functions of non-suicidal self-injury', '2021', 'https://doi.org/10.1016/j.cpr.2020.101939', 'Clinical Psychology Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Parent responses to adolescent self-harm', '2020', 'https://doi.org/10.1016/j.jadohealth.2020.06.019', 'Journal of Adolescent Health', 3),
      (v_art_id, 'peer_reviewed', 1, 'Self-harm vs. suicide risk', '2021', 'https://doi.org/10.1016/j.jaac.2020.10.017', 'Journal of the American Academy of Child & Adolescent Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Dialectical Behavior Therapy for adolescent self-harm', '2019', 'https://doi.org/10.1016/j.brat.2019.103434', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Creating safety plans with teens', '2020', 'https://doi.org/10.1111/sltb.12647', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Family-based treatment for self-harm', '2021', 'https://doi.org/10.1111/famp.12659', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Online communities and self-harm', '2020', 'https://doi.org/10.2196/15973', 'Journal of Medical Internet Research', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-058 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-058';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Bullying and mental health outcomes', '2020', 'https://doi.org/10.1001/jamapediatrics.2020.0124', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Cyberbullying effects', '2021', 'https://doi.org/10.1016/j.jadohealth.2020.11.013', 'Journal of Adolescent Health', 2),
      (v_art_id, 'peer_reviewed', 1, 'School-based bullying interventions', '2020', 'https://doi.org/10.1080/2372966X.2020.1716636', 'School Psychology Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'Parent responses to bullying', '2019', 'https://doi.org/10.1080/15388220.2018.1519529', 'Journal of School Violence', 4),
      (v_art_id, 'peer_reviewed', 1, 'Long-term effects of childhood bullying', '2020', 'https://doi.org/10.1017/S0033291720000057', 'Psychological Medicine', 5),
      (v_art_id, 'peer_reviewed', 1, 'Relational aggression in girls', '2021', 'https://doi.org/10.1080/15374416.2020.1846542', 'Journal of Clinical Child & Adolescent Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Building resilience in bullied children', '2020', 'https://doi.org/10.1007/s10567-020-00326-4', 'Clinical Child and Family Psychology Review', 7),
      (v_art_id, 'peer_reviewed', 1, 'When to change schools', '2021', 'https://doi.org/10.1002/pits.22501', 'Psychology in the Schools', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-059 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-059';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Effectiveness of child therapy', '2020', 'https://doi.org/10.1080/15374416.2020.1756300', 'Journal of Clinical Child & Adolescent Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'When children benefit from therapy', '2021', 'https://doi.org/10.1111/camh.12451', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Evidence-based treatments for children', '2020', 'https://doi.org/10.1037/amp0000618', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Finding qualified child therapists', '2019', 'https://doi.org/10.1037/pro0000256', 'Professional Psychology: Research and Practice', 4),
      (v_art_id, 'peer_reviewed', 1, 'Cultural considerations in child therapy', '2020', 'https://doi.org/10.1037/cdp0000407', 'Cultural Diversity and Ethnic Minority Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Parent involvement in child therapy', '2021', 'https://doi.org/10.1016/j.cpr.2020.101946', 'Clinical Psychology Review', 6),
      (v_art_id, 'government', 2, 'Insurance and access barriers', '2020', 'https://doi.org/10.1542/peds.2019-3778', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'What happens in child therapy', '2019', 'https://doi.org/10.1111/jcpp.13099', 'Journal of Child Psychology and Psychiatry', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT06-060 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT06-060';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Resilience in children: Protective factors', '2020', 'https://doi.org/10.1111/cdev.13378', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Fostering resilience in families', '2021', 'https://doi.org/10.1111/famp.12662', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Growth mindset and resilience', '2019', 'https://doi.org/10.1177/0956797619830987', 'Psychological Science', 3),
      (v_art_id, 'peer_reviewed', 1, 'Self-efficacy in children', '2020', 'https://doi.org/10.1111/jcpp.13321', 'Journal of Child Psychology and Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'Social support and resilience', '2021', 'https://doi.org/10.1017/S0954579420000894', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Emotion regulation skills', '2020', 'https://doi.org/10.1007/s10567-020-00336-2', 'Clinical Child and Family Psychology Review', 6),
      (v_art_id, 'peer_reviewed', 1, 'Problem-solving skills development', '2019', 'https://doi.org/10.1016/j.appdev.2019.101086', 'Journal of Applied Developmental Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Cultural resilience factors', '2020', 'https://doi.org/10.1037/cdp0000413', 'Cultural Diversity and Ethnic Minority Psychology', 8)
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
  WHERE a.article_production_id LIKE 'CAT06-%';

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;
