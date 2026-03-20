-- ============================================================================
-- Seed: Category 5 (Work, Productivity & Burnout) — Subcategory 06
-- 10 articles: CAT05-051 through CAT05-060
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert Category if not present
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  'Work, Productivity & Burnout',
  'workplace-academic',
  '',
  'Brain',
  5,
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'workplace-academic';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Career Transitions Uncertainty', 'career-transitions-uncertainty', v_cat_id, 6)
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'workplace-academic';
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'career-transitions-uncertainty' AND category_id = v_cat_id;

  -- CAT05-051: Career Change and Identity: Who Are You Without Your Job Title?
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Career Change and Identity: Who Are You Without Your Job Title?',
    'career-change-identity-who-are-you-without-job-title',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Career Change', 'Identity', 'Transition', 'Self-Worth'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-051',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Navigating identity disruption during career transitions, separating self-worth from professional role, and rebuilding sense of self.',
    '/images/articles/cat05/cover-051.svg',
    8,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-052: Layoffs and Mental Health: Processing the Shock and Moving Forward
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Layoffs and Mental Health: Processing the Shock and Moving Forward',
    'layoffs-mental-health-processing-shock-moving-forward',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Layoffs', 'Job Loss', 'Grief', 'Recovery'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-052',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Psychological impact of job loss, grief stages of layoffs, managing financial stress, and rebuilding after involuntary career disruption.',
    '/images/articles/cat05/cover-052.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-053: The Psychology of Job Searching: Managing Rejection and Uncertainty
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Job Searching: Managing Rejection and Uncertainty',
    'psychology-job-searching-managing-rejection-uncertainty',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Job Search', 'Rejection', 'Uncertainty', 'Resilience'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-053',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Mental health challenges of job hunting, handling repeated rejection, maintaining motivation, and protecting wellbeing during the search.',
    '/images/articles/cat05/cover-053.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-054: Starting a New Job: The Hidden Anxiety of New Beginnings
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Starting a New Job: The Hidden Anxiety of New Beginnings',
    'starting-new-job-hidden-anxiety-new-beginnings',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['New Job', 'Anxiety', 'Transition', 'Onboarding'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-054',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Psychological challenges of job transitions, imposter feelings, learning curve stress, and strategies for successful new role adjustment.',
    '/images/articles/cat05/cover-054.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-055: Mid-Career Crisis: When Your Path No Longer Feels Like Yours
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Mid-Career Crisis: When Your Path No Longer Feels Like Yours',
    'mid-career-crisis-when-path-no-longer-feels-like-yours',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Mid-Career Crisis', 'Meaning', 'Career Change', 'Life Transition'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-055',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding mid-career dissatisfaction, identity questioning, navigating the tension between security and meaning, and creating fulfilling next chapters.',
    '/images/articles/cat05/cover-055.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-056: Retirement Anxiety: Preparing Your Mental Health for Life After Work
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Retirement Anxiety: Preparing Your Mental Health for Life After Work',
    'retirement-anxiety-preparing-mental-health-life-after-work',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Retirement', 'Life Transitions', 'Identity', 'Aging'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-056',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Retirement brings profound identity shifts and emotional challenges. Learn evidence-based strategies to prepare your mental health for this major life transition and build a meaningful post-work life.',
    '/images/articles/cat05/cover-056.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-057: Freelancing and Mental Health: The Hidden Costs of Independence
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Freelancing and Mental Health: The Hidden Costs of Independence',
    'freelancing-mental-health-hidden-costs-independence',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Freelancing', 'Work Stress', 'Financial Anxiety', 'Isolation'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-057',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Freelancing offers freedom but brings unique mental health challenges—isolation, financial stress, and blurred work-life boundaries. Learn evidence-based strategies to protect your wellbeing while working independently.',
    '/images/articles/cat05/cover-057.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-058: Going Back to School: Managing the Stress of Career Reinvention
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Going Back to School: Managing the Stress of Career Reinvention',
    'going-back-to-school-managing-stress-career-reinvention',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Education', 'Career Change', 'Adult Learning', 'Stress Management'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-058',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Returning to education as an adult brings unique stressors—financial pressure, imposter syndrome, and juggling multiple life roles. Learn strategies to manage the mental health challenges of career reinvention through education.',
    '/images/articles/cat05/cover-058.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-059: How Economic Uncertainty Affects Mental Health
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How Economic Uncertainty Affects Mental Health',
    'how-economic-uncertainty-affects-mental-health',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Financial Stress', 'Economic Anxiety', 'Uncertainty', 'Resilience'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-059',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Economic instability creates chronic stress that impacts mental health in profound ways—from sleep disruption to relationship strain. Understand the psychological mechanisms and protective strategies for uncertain financial times.',
    '/images/articles/cat05/cover-059.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-060: Building Resilience During Career Transitions
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Building Resilience During Career Transitions',
    'building-resilience-during-career-transitions',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Resilience', 'Career Change', 'Adaptation', 'Growth'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-060',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Career transitions test your psychological resilience in profound ways. Learn evidence-based strategies to navigate uncertainty, maintain wellbeing, and emerge stronger from major professional changes.',
    '/images/articles/cat05/cover-060.svg',
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

  -- === CAT05-051 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-051';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Work identity and mental health during career transitions', '2021', 'https://doi.org/10.1016/j.jvb.2021.103615', 'Journal of Vocational Behavior', 1),
      (v_art_id, 'peer_reviewed', 1, 'Identity reconstruction after career change', '2020', 'https://doi.org/10.5465/amr.2017.0084', 'Academy of Management Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Career identity and psychological wellbeing', '2021', 'https://doi.org/10.1177/1069072720980176', 'Journal of Career Assessment', 3),
      (v_art_id, 'peer_reviewed', 1, 'Narrative identity work during transitions', '2020', 'https://doi.org/10.1177/0018726719865280', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Self-concept clarity and career transitions', '2022', 'https://doi.org/10.1037/apl0000956', 'Journal of Applied Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Protean career orientation and adaptation', '2021', 'https://doi.org/10.1002/job.2531', 'Journal of Organizational Behavior', 6),
      (v_art_id, 'peer_reviewed', 1, 'Career counseling during transitions', '2021', 'https://doi.org/10.1002/cdq.12265', NULL, 7),
      (v_art_id, 'textbook', 5, 'Designing Your Life: How to Build a Well-Lived, Joyful Life', '2016', 'https://www.worldcat.org/title/designing-your-life/oclc/953449953', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-052 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-052';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Job loss and mental health: Meta-analytic review', '2021', 'https://doi.org/10.1037/ocp0000293', 'Journal of Occupational Health Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Unemployment and psychological distress: Longitudinal study', '2020', 'https://doi.org/10.1016/j.socscimed.2020.113021', 'Social Science & Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'Financial stress and mental health outcomes', '2021', 'https://doi.org/10.1037/amp0000766', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Coping strategies after job loss', '2021', 'https://doi.org/10.1016/j.jvb.2021.103627', 'Journal of Vocational Behavior', 4),
      (v_art_id, 'peer_reviewed', 1, 'Resilience factors in unemployment', '2022', 'https://doi.org/10.1037/apl0000967', 'Journal of Applied Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Social support and job loss recovery', '2021', 'https://doi.org/10.1177/1069072720980189', 'Journal of Career Assessment', 6),
      (v_art_id, 'peer_reviewed', 1, 'Unemployment benefits and mental health', '2021', 'https://doi.org/10.1377/hlthaff.2020.01540', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Job search self-efficacy after layoffs', '2021', 'https://doi.org/10.1108/CDI-05-2020-0124', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-053 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-053';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Job search and mental health: Systematic review', '2021', 'https://doi.org/10.1016/j.jvb.2021.103638', 'Journal of Vocational Behavior', 1),
      (v_art_id, 'peer_reviewed', 1, 'Rejection sensitivity in job hunting', '2020', 'https://doi.org/10.1037/apl0000465', 'Journal of Applied Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Self-regulation during job search', '2021', 'https://doi.org/10.1037/ocp0000297', 'Journal of Occupational Health Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Job search self-efficacy and outcomes', '2021', 'https://doi.org/10.1108/CDI-08-2020-0218', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Social comparison during unemployment', '2020', 'https://doi.org/10.1177/1069072720902241', 'Journal of Career Assessment', 5),
      (v_art_id, 'peer_reviewed', 1, 'Job search intensity and mental health', '2021', 'https://doi.org/10.1080/10615806.2020.1869306', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Networking anxiety and job search', '2022', 'https://doi.org/10.1016/j.jvb.2021.103655', 'Journal of Vocational Behavior', 7),
      (v_art_id, 'professional_org', 3, 'Sustainable job search strategies', '2021', 'https://hbr.org/2021/03/how-to-job-search-without-burning-out', 'Harvard Business Review', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-054 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-054';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'New employee adjustment: Meta-analysis', '2021', 'https://doi.org/10.1037/apl0000898', 'Journal of Applied Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Newcomer stress and socialization', '2020', 'https://doi.org/10.1002/job.2449', 'Journal of Organizational Behavior', 2),
      (v_art_id, 'peer_reviewed', 1, 'Onboarding effectiveness and mental health', '2021', 'https://doi.org/10.1016/j.hrmr.2021.100837', 'Human Resource Management Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'Imposter phenomenon in new roles', '2021', 'https://doi.org/10.1016/j.jvb.2021.103641', 'Journal of Vocational Behavior', 4),
      (v_art_id, 'peer_reviewed', 1, 'Social integration and job satisfaction', '2020', 'https://doi.org/10.1111/peps.12385', 'Personnel Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Learning curve anxiety in new positions', '2021', 'https://doi.org/10.1177/0894845320987129', 'Journal of Career Development', 6),
      (v_art_id, 'textbook', 5, 'The First 90 Days: Strategies for Success', '2013', 'https://www.worldcat.org/title/first-90-days/oclc/823230770', 'Harvard Business Review Press', 7),
      (v_art_id, 'peer_reviewed', 1, 'Remote onboarding challenges', '2022', 'https://doi.org/10.1037/apl0000989', 'Journal of Applied Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-055 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-055';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Mid-career satisfaction and meaning: Longitudinal study', '2021', 'https://doi.org/10.1016/j.jvb.2021.103649', 'Journal of Vocational Behavior', 1),
      (v_art_id, 'peer_reviewed', 1, 'The U-bend of life satisfaction', '2008', 'https://doi.org/10.1111/j.1468-0297.2008.02136.x', 'Economic Journal', 2),
      (v_art_id, 'peer_reviewed', 1, 'Career plateau and psychological wellbeing', '2020', 'https://doi.org/10.1002/job.2461', 'Journal of Organizational Behavior', 3),
      (v_art_id, 'peer_reviewed', 1, 'Meaning-making in mid-career transitions', '2021', 'https://doi.org/10.1108/CDI-03-2020-0062', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Golden handcuffs and career entrapment', '2020', 'https://doi.org/10.1177/0018726719879687', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Generativity in middle adulthood', '2021', 'https://doi.org/10.1037/pag0000574', 'Psychology and Aging', 6),
      (v_art_id, 'peer_reviewed', 1, 'Career counseling for mid-career adults', '2021', 'https://doi.org/10.1002/cdq.12271', NULL, 7),
      (v_art_id, 'textbook', 5, 'The Second Mountain: The Quest for a Moral Life', '2019', 'https://www.worldcat.org/title/second-mountain/oclc/1090842596', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-056 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-056';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The psychological impact of retirement on emotional well-being and life satisfaction: A meta-analysis', '2019', 'https://doi.org/10.1016/j.jvb.2019.02.009', 'Journal of Vocational Behavior', 1),
      (v_art_id, 'peer_reviewed', 1, 'Retirement and mental health: A systematic review and meta-analysis', '2020', 'https://doi.org/10.1016/j.socscimed.2020.113425', 'Social Science & Medicine', 2),
      (v_art_id, 'peer_reviewed', 1, 'Identity change and psychological adjustment to retirement', '2018', 'https://doi.org/10.1093/workar/wax025', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Retirement planning and satisfaction: The role of control, meaning, and social support', '2021', 'https://doi.org/10.1080/01634372.2021.1892908', 'Journal of Gerontological Social Work', 4),
      (v_art_id, 'peer_reviewed', 1, 'Social connections and mental health in retirement transitions', '2020', 'https://doi.org/10.1080/13607863.2020.1725803', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Purpose in life and adjustment to retirement: A longitudinal study', '2019', 'https://doi.org/10.1037/pag0000362', 'Psychology and Aging', 6),
      (v_art_id, 'government', 2, 'Retirement Planning Information', '2023', 'https://www.nia.nih.gov/health/retirement', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Physical activity and cognitive function in retirement: A systematic review', '2021', 'https://doi.org/10.1136/bjsports-2020-103168', 'British Journal of Sports Medicine', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-057 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-057';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Mental health and wellbeing in the gig economy: A systematic review', '2021', 'https://doi.org/10.1037/ocp0000295', 'Journal of Occupational Health Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Freelancing and psychological distress: The role of income insecurity and social support', '2020', 'https://doi.org/10.1080/02678373.2020.1774974', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Loneliness and social isolation among self-employed workers', '2021', 'https://doi.org/10.3390/ijerph18105026', 'International Journal of Environmental Research and Public Health', 3),
      (v_art_id, 'peer_reviewed', 1, 'Work-life boundary management in the gig economy', '2022', 'https://doi.org/10.1016/j.jvb.2022.103728', 'Journal of Vocational Behavior', 4),
      (v_art_id, 'peer_reviewed', 1, 'Financial stress and mental health among freelance workers', '2021', 'https://doi.org/10.1177/0143831X211006118', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Impostor phenomenon in freelance and self-employed professionals', '2020', 'https://doi.org/10.1007/s10869-020-09691-w', 'Journal of Business and Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Coping strategies for managing stress in self-employment', '2019', 'https://doi.org/10.1177/1042258719834016', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'The relationship between autonomy and mental health in independent work', '2021', 'https://doi.org/10.1111/aphw.12264', 'Applied Psychology: Health and Well-Being', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-058 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-058';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Adult learners and mental health: Stress, anxiety, and coping in higher education', '2020', 'https://doi.org/10.1007/s10804-020-09359-5', 'Journal of Adult Development', 1),
      (v_art_id, 'peer_reviewed', 1, 'Role conflict and psychological distress among adult students', '2021', 'https://doi.org/10.1080/0309877X.2021.1928027', 'Journal of Further and Higher Education', 2),
      (v_art_id, 'peer_reviewed', 1, 'Financial stress and mental health outcomes in adult learners', '2019', 'https://doi.org/10.55504/0884-9153.1650', 'Journal of Student Financial Aid', 3),
      (v_art_id, 'peer_reviewed', 1, 'Imposter phenomenon among non-traditional students in STEM', '2020', 'https://doi.org/10.1186/s40594-020-00246-7', 'International Journal of STEM Education', 4),
      (v_art_id, 'peer_reviewed', 1, 'Social support and academic success in adult learners', '2021', 'https://doi.org/10.1007/s10648-021-09598-0', 'Educational Psychology Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'Self-efficacy and academic performance in mature students', '2020', 'https://doi.org/10.1080/03075079.2020.1767051', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Work-school-family balance: A systematic review', '2019', 'https://doi.org/10.1177/0894845319841153', 'Journal of Career Development', 7),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive advantages of adult learners: Experience as academic asset', '2021', 'https://doi.org/10.1177/0741713620950837', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-059 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-059';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Economic uncertainty and mental health: A systematic review and meta-analysis', '2021', 'https://doi.org/10.1017/S0033291721001549', 'Psychological Medicine', 1),
      (v_art_id, 'peer_reviewed', 1, 'Financial stress and psychological distress: The role of intolerance of uncertainty', '2020', 'https://doi.org/10.1016/j.joep.2020.102301', 'Journal of Economic Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Economic recession and mental health: Findings from the 2008-2020 period', '2022', 'https://doi.org/10.1016/S2215-0366(22)00058-2', 'The Lancet Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Financial insecurity, chronic stress, and cortisol dysregulation', '2021', 'https://doi.org/10.1016/j.psyneuen.2021.105184', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Coping with financial stress: Effective and ineffective strategies', '2020', 'https://doi.org/10.1080/10615806.2020.1773726', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Social support as a buffer against economic stress', '2019', 'https://doi.org/10.1521/jscp.2019.38.7.596', 'Journal of Social and Clinical Psychology', 6),
      (v_art_id, 'government', 2, 'Financial Wellness Resources', '2023', 'https://www.consumerfinance.gov/', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Meaning-making and post-traumatic growth following economic hardship', '2021', 'https://doi.org/10.1080/17439760.2021.1913641', 'Journal of Positive Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-060 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-060';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Psychological resilience during career transitions: A systematic review', '2021', 'https://doi.org/10.1177/0894845321998709', 'Journal of Career Development', 1),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive flexibility and successful career transitions', '2020', 'https://doi.org/10.1016/j.jvb.2020.103431', 'Journal of Vocational Behavior', 2),
      (v_art_id, 'peer_reviewed', 1, 'Social support and career transition outcomes: A longitudinal study', '2021', 'https://doi.org/10.1002/cdq.12257', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Self-compassion as a protective factor in career setbacks', '2020', 'https://doi.org/10.1037/cou0000415', 'Journal of Counseling Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Identity reconstruction during career change', '2019', 'https://doi.org/10.1016/j.jvb.2019.103342', 'Journal of Vocational Behavior', 5),
      (v_art_id, 'peer_reviewed', 1, 'Growth mindset and career adaptability', '2021', 'https://doi.org/10.1177/1069072720983209', 'Journal of Career Assessment', 6),
      (v_art_id, 'peer_reviewed', 1, 'Post-traumatic growth following involuntary career transitions', '2020', 'https://doi.org/10.1037/ocp0000193', 'Journal of Occupational Health Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Meaning-making and career resilience', '2022', 'https://doi.org/10.1177/08948453211066849', 'Journal of Career Development', 8)
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
  WHERE a.article_production_id LIKE 'CAT05-%';

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;
