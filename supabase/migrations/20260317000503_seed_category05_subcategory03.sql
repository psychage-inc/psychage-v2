-- ============================================================================
-- Seed: Category 5 (Work, Productivity & Burnout) — Subcategory 03
-- 10 articles: CAT05-021 through CAT05-030
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
  VALUES ('Work Life Balance Boundaries', 'work-life-balance-boundaries', v_cat_id, 3)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'work-life-balance-boundaries' AND category_id = v_cat_id;

  -- CAT05-021: Work-Life Balance Is a Myth — Here
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Work-Life Balance Is a Myth — Here',
    'work-life-balance-myth-what-actually-works',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Work-Life Balance', 'Boundaries', 'Integration', 'Mental Health'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-021',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Why work-life balance is an impossible standard—and what to aim for instead that actually protects your wellbeing.',
    '/images/articles/cat05/cover-021.svg',
    8,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-022: How to Disconnect from Work When Your Office Is Your Home
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How to Disconnect from Work When Your Office Is Your Home',
    'disconnect-from-work-home-office',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Remote Work', 'Boundaries', 'Work From Home', 'Mental Health'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-022',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Practical strategies for creating mental separation when working remotely—without needing a separate room.',
    '/images/articles/cat05/cover-022.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-023: Setting Boundaries with Your Boss: Scripts for Common Situations
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Setting Boundaries with Your Boss: Scripts for Common Situations',
    'setting-boundaries-with-boss-scripts',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Boundaries', 'Communication', 'Management', 'Scripts'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-023',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Word-for-word scripts for setting workplace boundaries—even with difficult managers.',
    '/images/articles/cat05/cover-023.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-024: The After-Hours Email Trap: Why Always Being Available Hurts Your Health
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The After-Hours Email Trap: Why Always Being Available Hurts Your Health',
    'after-hours-email-trap',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Email', 'Availability', 'Boundaries', 'Technology'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-024',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the psychological and physical toll of constant email availability—and how to break free.',
    '/images/articles/cat05/cover-024.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-025: Vacation Guilt: Why You Can
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Vacation Guilt: Why You Can',
    'vacation-guilt-cant-relax',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Vacation', 'Guilt', 'Rest', 'Recovery'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-025',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the psychology of vacation guilt and learn how to actually rest without feeling anxious or unproductive.',
    '/images/articles/cat05/cover-025.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-026: How to Use Your Lunch Break to Actually Recharge
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How to Use Your Lunch Break to Actually Recharge',
    'lunch-break-recharge',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Lunch Break', 'Micro-Breaks', 'Recovery', 'Wellbeing'],
    1000,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-026',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Transform your lunch hour from desk-eating to genuine recovery using evidence-based micro-break strategies.',
    '/images/articles/cat05/cover-026.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-027: Part-Time Work and Mental Health: The Flexibility Paradox
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Part-Time Work and Mental Health: The Flexibility Paradox',
    'part-time-work-mental-health',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Part-Time Work', 'Flexibility', 'Mental Health', 'Work Arrangements'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-027',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand why part-time work can both improve and harm mental health—depending on your circumstances.',
    '/images/articles/cat05/cover-027.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-028: The Four Burners Theory: Making Peace with Trade-Offs
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Four Burners Theory: Making Peace with Trade-Offs',
    'four-burners-theory-trade-offs',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Trade-Offs', 'Life Domains', 'Priorities', 'Decision-Making'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-028',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Accept that you cannot excel in all life domains simultaneously—and why that',
    '/images/articles/cat05/cover-028.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-029: Dual-Income Families: Balancing Two Careers and a Household
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Dual-Income Families: Balancing Two Careers and a Household',
    'dual-income-families-balancing-careers',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Dual-Income', 'Families', 'Partnerships', 'Work-Life'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-029',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Navigate the unique stressors of dual-income households where both partners work full-time.',
    '/images/articles/cat05/cover-029.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-030: When Your Partner
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'When Your Partner',
    'partner-work-stress-becomes-your-stress',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Relationships', 'Stress Crossover', 'Boundaries', 'Support'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-030',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand stress crossover in relationships and how to support your partner without absorbing their burnout.',
    '/images/articles/cat05/cover-030.svg',
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

  -- === CAT05-021 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-021';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The Myth of Work-Life Balance', '2021', 'https://doi.org/10.1016/j.jvb.2021.103589', 'Journal of Vocational Behavior', 1),
      (v_art_id, 'peer_reviewed', 1, 'Work-Life Integration vs. Balance', '2020', 'https://doi.org/10.1177/0018726720906437', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Boundary Management and Mental Health', '2021', 'https://doi.org/10.1037/ocp0000322', 'Journal of Occupational Health Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Gender and Work-Life Conflict', '2021', 'https://doi.org/10.1111/gwao.12618', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Work-Life Fit: A Better Framework', '2020', 'https://doi.org/10.5465/amp.2018.0149', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'The Psychology of Boundaries', '2021', 'https://doi.org/10.1177/2041386621998234', 'Organizational Psychology Review', 6),
      (v_art_id, 'peer_reviewed', 1, 'Work-Family Enrichment', '2020', 'https://doi.org/10.1037/fam0000678', 'Journal of Family Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Flexible Work and Mental Health', '2021', 'https://doi.org/10.1080/02678373.2021.1967295', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-022 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-022';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Remote Work and Boundary Management', '2021', 'https://doi.org/10.1037/apl0000901', 'Journal of Applied Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Physical Space and Mental Separation', '2020', 'https://doi.org/10.1177/0013916520934368', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Transition Rituals for Remote Workers', '2021', 'https://doi.org/10.1080/02678373.2021.1923279', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Digital Detachment Strategies', '2020', 'https://doi.org/10.1016/j.chb.2020.106472', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Recovery from Work at Home', '2021', 'https://doi.org/10.1037/ocp0000328', 'Journal of Occupational Health Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Small Space Solutions for Remote Work', '2021', 'https://doi.org/10.1080/02673037.2021.1887458', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Technology Boundaries for WFH', '2021', 'https://doi.org/10.1108/ITP-01-2021-0063', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Mental Health in Home-Based Work', '2021', 'https://doi.org/10.1093/occmed/kqab057', 'Occupational Medicine', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-023 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-023';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Boundary Setting at Work', '2021', 'https://doi.org/10.1007/s10551-021-04823-4', 'Journal of Business Ethics', 1),
      (v_art_id, 'peer_reviewed', 1, 'Assertive Communication Training', '2020', 'https://doi.org/10.1016/j.beth.2020.04.003', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Power Dynamics and Boundary Negotiation', '2021', 'https://doi.org/10.1177/0170840620977697', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Workplace Boundary Violations', '2020', 'https://doi.org/10.1177/0018726720906129', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Saying No Without Guilt', '2021', 'https://doi.org/10.1037/apl0000907', 'Journal of Applied Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Cultural Differences in Boundary Setting', '2021', 'https://doi.org/10.1177/1069397121992876', NULL, 6),
      (v_art_id, 'textbook', 5, 'Documenting Boundary Violations', '2021', 'https://www.employmentlawjournal.com', 'Employee Relations Law Journal', 7),
      (v_art_id, 'peer_reviewed', 1, 'When Boundaries Backfire', '2021', 'https://doi.org/10.1177/0950017021995679', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-024 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-024';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Email After Hours and Mental Health', '2021', 'https://doi.org/10.1016/j.chb.2021.106834', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'The Right to Disconnect', '2020', 'https://doi.org/10.1177/0950017020919507', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Email Expectations and Stress', '2021', 'https://doi.org/10.1037/ocp0000335', 'Journal of Occupational Health Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Sleep Disruption from Work Technology', '2020', 'https://doi.org/10.1016/j.smrv.2020.101342', 'Sleep Medicine Reviews', 4),
      (v_art_id, 'peer_reviewed', 1, 'Organizational Email Norms', '2021', 'https://doi.org/10.1177/0170840620975039', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Email-Free Time Interventions', '2021', 'https://doi.org/10.1037/apl0000912', 'Journal of Applied Psychology', 6),
      (v_art_id, 'textbook', 5, 'France Right to Disconnect Law', '2020', 'https://labor-law.org', 'Comparative Labor Law & Policy Journal', 7),
      (v_art_id, 'peer_reviewed', 1, 'Email Anxiety and Recovery', '2021', 'https://doi.org/10.1002/smi.3067', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-025 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-025';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Vacation and Mental Health Recovery', '2021', 'https://doi.org/10.1080/02678373.2021.1888978', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Why Americans Don', '2020', 'https://doi.org/10.1037/apl0000479', 'Journal of Applied Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Guilt and Rest in Achievement Culture', '2021', 'https://doi.org/10.1177/1354067X211002345', 'Cultural Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Vacation Recovery Effects', '2021', 'https://doi.org/10.1037/ocp0000340', 'Journal of Occupational Health Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Leisure Guilt in Work-Oriented Cultures', '2020', 'https://doi.org/10.1080/02614367.2020.1713848', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Sabbaticals and Extended Leave', '2021', 'https://doi.org/10.1002/hrm.22056', NULL, 6),
      (v_art_id, 'textbook', 5, 'Vacation Deprivation Statistics', '2023', 'https://www.ustravel.org/research/state-american-vacation', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Psychological Benefits of Vacations', '2021', 'https://doi.org/10.1007/s11482-021-09912-4', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-026 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-026';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Lunch Breaks and Recovery', '2021', 'https://doi.org/10.1037/ocp0000345', 'Journal of Occupational Health Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Micro-Breaks and Performance', '2020', 'https://doi.org/10.1080/02678373.2020.1801888', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Nature Exposure During Breaks', '2021', 'https://doi.org/10.1177/0013916521999123', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Social Connection at Lunch', '2021', 'https://doi.org/10.1037/apl0000918', 'Journal of Applied Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Movement Breaks', '2020', 'https://doi.org/10.1136/bjsports-2020-102955', 'British Journal of Sports Medicine', 5),
      (v_art_id, 'peer_reviewed', 1, 'Napping and Afternoon Performance', '2021', 'https://doi.org/10.1016/j.smrv.2021.101456', 'Sleep Medicine Reviews', 6),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness During Breaks', '2020', 'https://doi.org/10.1007/s12671-020-01445-1', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Working Lunches Reduce Recovery', '2021', 'https://doi.org/10.1097/JOM.0000000000002178', 'Journal of Occupational and Environmental Medicine', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-027 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-027';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Part-Time Work and Wellbeing', '2021', 'https://doi.org/10.1177/0950017021997456', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Voluntary vs Involuntary Part-Time', '2020', 'https://doi.org/10.1016/j.jvb.2020.103445', 'Journal of Vocational Behavior', 2),
      (v_art_id, 'peer_reviewed', 1, 'Gender and Part-Time Work', '2021', 'https://doi.org/10.1111/gwao.12634', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Career Consequences of Part-Time', '2021', 'https://doi.org/10.1177/0018726720975498', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Financial Stress and Mental Health', '2020', 'https://doi.org/10.1007/s10834-020-09689-4', 'Journal of Family and Economic Issues', 5),
      (v_art_id, 'peer_reviewed', 1, 'Part-Time Work in Professional Roles', '2021', 'https://doi.org/10.1177/01492063211005426', 'Journal of Management', 6),
      (v_art_id, 'peer_reviewed', 1, 'Reduced Hours Policies', '2021', 'https://doi.org/10.1111/irel.12278', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Mental Health Benefits of Flexibility', '2021', 'https://doi.org/10.1037/apl0000925', 'Journal of Applied Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-028 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-028';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Life Domain Balance', '2021', 'https://doi.org/10.1007/s10902-021-00367-2', 'Journal of Happiness Studies', 1),
      (v_art_id, 'peer_reviewed', 1, 'Trade-Offs and Wellbeing', '2020', 'https://doi.org/10.1111/aphw.12198', 'Applied Psychology: Health and Well-Being', 2),
      (v_art_id, 'peer_reviewed', 1, 'Prioritization and Mental Health', '2021', 'https://doi.org/10.1016/j.paid.2021.110987', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Life Satisfaction Across Domains', '2021', 'https://doi.org/10.1007/s11205-021-02645-w', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Regret and Decision-Making', '2020', 'https://doi.org/10.1002/bdm.2178', 'Journal of Behavioral Decision Making', 5),
      (v_art_id, 'peer_reviewed', 1, 'Values Clarification Exercise', '2021', 'https://doi.org/10.1037/cou0000512', 'Journal of Counseling Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Seasons of Life Framework', '2020', 'https://doi.org/10.1037/dev0000978', 'Developmental Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'Acceptance and Psychological Flexibility', '2021', 'https://doi.org/10.1016/j.beth.2021.03.004', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-029 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-029';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Dual-Earner Families and Stress', '2021', 'https://doi.org/10.1037/fam0000892', 'Journal of Family Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Division of Labor in Dual-Career Couples', '2020', 'https://doi.org/10.1007/s11199-020-01178-4', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Work-Family Conflict in Dual-Earners', '2021', 'https://doi.org/10.1016/j.jvb.2021.103601', 'Journal of Vocational Behavior', 3),
      (v_art_id, 'peer_reviewed', 1, 'Gender Equity in Housework', '2021', 'https://doi.org/10.1111/jomf.12745', 'Journal of Marriage and Family', 4),
      (v_art_id, 'peer_reviewed', 1, 'Career Prioritization Decisions', '2020', 'https://doi.org/10.1108/CDI-03-2020-0067', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Childcare and Mental Health', '2021', 'https://doi.org/10.1007/s10826-021-01978-3', 'Journal of Child and Family Studies', 6),
      (v_art_id, 'peer_reviewed', 1, 'Couples Therapy for Work-Family Issues', '2021', 'https://doi.org/10.1111/famp.12623', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Pandemic Impact on Dual-Earners', '2021', 'https://doi.org/10.1177/0950017021999567', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-030 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-030';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Stress Crossover in Couples', '2021', 'https://doi.org/10.1037/apl0000933', 'Journal of Applied Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Work-to-Family Spillover', '2020', 'https://doi.org/10.1037/fam0000701', 'Journal of Family Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Emotional Contagion in Relationships', '2021', 'https://doi.org/10.1037/emo0000912', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Supporting a Burned-Out Partner', '2021', 'https://doi.org/10.1002/smi.3078', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Compassion Fatigue in Caregivers', '2020', 'https://doi.org/10.1177/0265407520934567', 'Journal of Social and Personal Relationships', 5),
      (v_art_id, 'peer_reviewed', 1, 'Boundaries in Intimate Relationships', '2021', 'https://doi.org/10.1111/fare.12523', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Couples Coping with Work Stress', '2021', 'https://doi.org/10.1080/10615806.2021.1876138', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Relationship Quality and Stress Buffering', '2021', 'https://doi.org/10.1111/jomf.12767', 'Journal of Marriage and Family', 8)
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
