-- ============================================================================
-- Seed: Category 5 (Work, Productivity & Burnout) — Subcategory 04
-- 10 articles: CAT05-031 through CAT05-040
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
  VALUES ('Productivity Focus Attention', 'productivity-focus-attention', v_cat_id, 4)
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
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'productivity-focus-attention' AND category_id = v_cat_id;

  -- CAT05-031: The Psychology of Productivity: Why Working More Hours Doesn
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Productivity: Why Working More Hours Doesn',
    'psychology-of-productivity-working-more-hours-doesnt-work',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Productivity', 'Work Hours', 'Cognitive Load', 'Performance'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-031',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Why longer hours destroy productivity, what cognitive science tells us about optimal work cycles, and how to achieve more by doing less.',
    '/images/articles/cat05/cover-031.svg',
    8,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-032: Deep Work: How to Focus in a Distracted World
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Deep Work: How to Focus in a Distracted World',
    'deep-work-how-to-focus-distracted-world',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Deep Work', 'Focus', 'Attention', 'Distraction'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-032',
    v_cat_id,
    v_sub_id,
    'drafted',
    'What neuroscience reveals about sustained focus, why shallow work dominates modern workdays, and how to reclaim capacity for cognitively demanding tasks.',
    '/images/articles/cat05/cover-032.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-033: Attention Residue: Why Task-Switching Destroys Your Productivity
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Attention Residue: Why Task-Switching Destroys Your Productivity',
    'attention-residue-task-switching-destroys-productivity',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Attention Residue', 'Task Switching', 'Cognitive Load', 'Research'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-033',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Research on how incomplete tasks leave cognitive fragments that impair performance on subsequent work, and the surprising time cost of multitasking.',
    '/images/articles/cat05/cover-033.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-034: The Pomodoro Technique and Time-Boxing: Do Productivity Hacks Actually Work?
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Pomodoro Technique and Time-Boxing: Do Productivity Hacks Actually Work?',
    'pomodoro-technique-time-boxing-productivity-hacks-work',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Pomodoro', 'Time-Boxing', 'Productivity Techniques', 'Evidence'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-034',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Evidence-based review of popular productivity techniques, what works, what doesn',
    '/images/articles/cat05/cover-034.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-035: Procrastination Is Not Laziness: The Emotional Root of Putting Things Off
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Procrastination Is Not Laziness: The Emotional Root of Putting Things Off',
    'procrastination-not-laziness-emotional-root',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Procrastination', 'Emotion Regulation', 'Task Avoidance', 'Self-Compassion'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-035',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Why procrastination is an emotion regulation problem, not a character flaw, and what actually helps people complete avoided tasks.',
    '/images/articles/cat05/cover-035.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-036: How ADHD Affects Work Performance (And What Accommodations Help)
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How ADHD Affects Work Performance (And What Accommodations Help)',
    'adhd-work-performance-accommodations-help',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['ADHD', 'Accommodations', 'Work Performance', 'Executive Function'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-036',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding ADHD',
    '/images/articles/cat05/cover-036.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-037: Decision Fatigue at Work: Why You Make Worse Choices as the Day Goes On
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Decision Fatigue at Work: Why You Make Worse Choices as the Day Goes On',
    'decision-fatigue-work-worse-choices-day-goes-on',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Decision Fatigue', 'Cognitive Depletion', 'Willpower', 'Decision-Making'],
    1200,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-037',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How cumulative decision-making depletes cognitive resources, why willpower is finite, and strategies to preserve decision quality throughout the workday.',
    '/images/articles/cat05/cover-037.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-038: Flow State: The Psychology of Being 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Flow State: The Psychology of Being ',
    'flow-state-psychology-being-in-the-zone',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Flow State', 'Peak Performance', 'Optimal Experience', 'Research'],
    1600,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-038',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Research on optimal experience states, the neuroscience of effortless immersion, and conditions that reliably induce flow at work.',
    '/images/articles/cat05/cover-038.svg',
    9,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-039: Multitasking Is a Lie: What Your Brain Actually Does When You Think You
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Multitasking Is a Lie: What Your Brain Actually Does When You Think You',
    'multitasking-lie-what-brain-actually-does',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Multitasking', 'Task Switching', 'Cognitive Science', 'Research'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-039',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Neuroscience evidence on task-switching costs, the myth of parallel processing, and why multitasking makes you slower and less accurate.',
    '/images/articles/cat05/cover-039.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT05-040: Building Sustainable Productivity Habits Without Burning Out
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Building Sustainable Productivity Habits Without Burning Out',
    'building-sustainable-productivity-habits-without-burning-out',
    'draft',
    'Work, Productivity & Burnout',
    ARRAY['Sustainable Productivity', 'Burnout Prevention', 'Habits', 'Long-Term Performance'],
    1400,
    'PRIMARY AUTHOR',
    'self_help',
    'CAT05-040',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How to design work systems that maintain high performance over years, not weeks, using evidence-based practices that prevent burnout.',
    '/images/articles/cat05/cover-040.svg',
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

  -- === CAT05-031 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-031';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The relationship between working hours and productivity: Evidence for non-linearity', '2021', 'https://doi.org/10.1016/j.labeco.2021.101985', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive fatigue and decision-making in the workplace', '2022', 'https://doi.org/10.1037/apl0000901', 'Journal of Applied Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Working Time and Health: A Systematic Review', '2020', 'https://doi.org/10.1136/oemed-2019-106300', 'Occupational and Environmental Medicine', 3),
      (v_art_id, 'peer_reviewed', 1, 'Productivity and Rest: The Ultradian Rhythm Hypothesis', '2021', 'https://doi.org/10.1080/02678373.2021.1945070', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Overwork and Mental Health: A Meta-Analysis', '2022', 'https://doi.org/10.5271/sjweh.3989', 'Scandinavian Journal of Work Environment & Health', 5),
      (v_art_id, 'government', 2, 'Workplace productivity interventions: Evidence review', '2021', 'https://www.nice.org.uk/guidance/ng13', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'The Psychology of Work Hours and Performance', '2023', 'https://doi.org/10.1146/annurev-orgpsych-032922-043530', 'Annual Review of Organizational Psychology', 7),
      (v_art_id, 'professional_org', 3, 'Four-Day Work Week Trials: Productivity and Wellbeing Outcomes', '2023', 'https://hbr.org/2023/06/what-we-learned-from-the-worlds-largest-trial-of-a-4-day-workweek', 'Harvard Business Review', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-032 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-032';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'textbook', 5, 'Deep Work: Rules for Focused Success in a Distracted World', '2016', 'https://www.worldcat.org/title/deep-work/oclc/934415766', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'The neuroscience of sustained attention and its dysfunction', '2020', 'https://doi.org/10.1038/s41583-020-0313-y', 'Nature Reviews Neuroscience', 2),
      (v_art_id, 'peer_reviewed', 1, 'Email and attention: The influence of task interruption on performance and cognitive load', '2021', 'https://doi.org/10.1080/07370024.2021.1897105', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Digital distractions in the workplace: A longitudinal study', '2022', 'https://doi.org/10.1037/ocp0000312', 'Journal of Occupational Health Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive control and attention in the workplace', '2021', 'https://doi.org/10.1177/09567976211015952', 'Psychological Science', 5),
      (v_art_id, 'peer_reviewed', 1, 'Open-plan offices and cognitive performance: A field study', '2020', 'https://doi.org/10.1037/apl0000458', 'Journal of Applied Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness and sustained attention: A meta-analysis', '2021', 'https://doi.org/10.3758/s13415-021-00895-w', 'Cognitive, Affective, & Behavioral Neuroscience', 7),
      (v_art_id, 'clinical_guideline', 4, 'Workplace productivity and focus interventions', '2022', 'https://doi.org/10.1002/14651858.CD013792', 'Cochrane Database of Systematic Reviews', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-033 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-033';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Why Is It So Hard to Do My Work? The Challenge of Attention Residue When Switching Between Work Tasks', '2009', 'https://doi.org/10.1016/j.obhdp.2009.04.001', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'The cost of interrupted work: More speed and stress', '2008', 'https://doi.org/10.1145/1357054.1357072', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Task interruption and its effects on memory', '2020', 'https://doi.org/10.3758/s13421-020-01027-w', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'The neuroscience of task switching and attention residue', '2021', 'https://doi.org/10.1093/cercor/bhab052', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Multitasking in the workplace: A systematic review', '2022', 'https://doi.org/10.1002/acp.3891', 'Applied Cognitive Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Work fragmentation and productivity: A field study', '2021', 'https://doi.org/10.1037/apl0000891', 'Journal of Applied Psychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Email checking frequency and stress: An experimental investigation', '2019', 'https://doi.org/10.1016/j.chb.2019.04.016', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive load theory and instructional design', '2020', 'https://doi.org/10.1007/s10648-019-09465-5', 'Educational Psychology Review', 8),
      (v_art_id, 'peer_reviewed', 1, 'Open-office environments and task-switching frequency', '2021', 'https://doi.org/10.1177/00139165211001534', NULL, 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-034 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-034';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The Pomodoro Technique: An Empirical Study', '2020', 'https://doi.org/10.1080/10447318.2020.1731684', 'International Journal of Human-Computer Interaction', 1),
      (v_art_id, 'peer_reviewed', 1, 'Time management interventions for students: A meta-analysis', '2021', 'https://doi.org/10.1016/j.edurev.2021.100407', 'Educational Research Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Task-specific time limits and cognitive performance', '2019', 'https://doi.org/10.1177/0956797619851797', 'Psychological Science', 3),
      (v_art_id, 'peer_reviewed', 1, 'Break timing and cognitive recovery: An experimental study', '2022', 'https://doi.org/10.1037/apl0000912', 'Journal of Applied Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Individual differences in response to productivity techniques', '2021', 'https://doi.org/10.1016/j.paid.2021.110892', NULL, 5),
      (v_art_id, 'peer_reviewed', 1, 'Structured work intervals and task completion', '2020', 'https://doi.org/10.1016/j.obhdp.2020.03.007', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Time awareness and productivity: Field experiments', '2022', 'https://doi.org/10.1287/mnsc.2021.4127', 'Management Science', 7),
      (v_art_id, 'peer_reviewed', 1, 'Workplace productivity interventions: Systematic review', '2021', 'https://doi.org/10.1111/aphw.12249', 'Applied Psychology: Health and Well-Being', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-035 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-035';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Procrastination, emotion regulation, and well-being', '2021', 'https://doi.org/10.3389/fpsyg.2021.588910', 'Frontiers in Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'The nature of procrastination: A meta-analytic and theoretical review', '2007', 'https://doi.org/10.1037/0033-2909.133.1.65', NULL, 2),
      (v_art_id, 'textbook', 5, 'Solving the Procrastination Puzzle: A Concise Guide', '2013', 'https://www.worldcat.org/title/solving-the-procrastination-puzzle/oclc/827208756', NULL, 3),
      (v_art_id, 'peer_reviewed', 1, 'Self-compassion interventions for procrastination: A randomized controlled trial', '2022', 'https://doi.org/10.1007/s12671-022-01854-w', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Temporal motivation theory', '2006', 'https://doi.org/10.1037/0033-295X.113.4.784', 'Psychological Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'The role of perfectionism in procrastination', '2020', 'https://doi.org/10.1016/j.paid.2020.110102', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Implementation intentions and procrastination: Meta-analysis', '2021', 'https://doi.org/10.1002/ejsp.2742', 'European Journal of Social Psychology', 7),
      (v_art_id, 'peer_reviewed', 1, 'ADHD and procrastination: Executive function mediators', '2021', 'https://doi.org/10.1177/10870547211027640', 'Journal of Attention Disorders', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-036 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-036';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'ADHD in the workplace: Interventions and accommodations', '2021', 'https://doi.org/10.1177/1087054720986196', 'Journal of Attention Disorders', 1),
      (v_art_id, 'peer_reviewed', 1, 'Executive function deficits in ADHD and work impairment', '2022', 'https://doi.org/10.1037/pas0001098', NULL, 2),
      (v_art_id, 'peer_reviewed', 1, 'Workplace accommodations for ADHD: Effectiveness review', '2021', 'https://doi.org/10.1007/s10926-020-09935-9', 'Journal of Occupational Rehabilitation', 3),
      (v_art_id, 'government', 2, 'Americans with Disabilities Act and ADHD accommodations', '2022', 'https://www.eeoc.gov/laws/guidance/ada-questions-and-answers', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Time perception and ADHD: Mechanisms and interventions', '2020', 'https://doi.org/10.1016/j.cpr.2020.101902', 'Clinical Psychology Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'Working memory and ADHD: Implications for job performance', '2021', 'https://doi.org/10.1037/neu0000722', 'Neuropsychology', 6),
      (v_art_id, 'peer_reviewed', 1, 'Pharmacological treatment of ADHD in adults: Meta-analysis', '2022', 'https://doi.org/10.1001/jamapsychiatry.2022.0235', 'JAMA Psychiatry', 7),
      (v_art_id, 'peer_reviewed', 1, 'Cognitive behavioral therapy for adult ADHD', '2021', 'https://doi.org/10.1037/ccp0000565', 'Journal of Consulting and Clinical Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-037 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-037';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Decision fatigue exhausts self-regulatory resources', '2020', 'https://doi.org/10.1111/spc3.12517', 'Social and Personality Psychology Compass', 1),
      (v_art_id, 'peer_reviewed', 1, 'Extraneous factors in judicial decisions', '2011', 'https://doi.org/10.1073/pnas.1018033108', 'Proceedings of the National Academy of Sciences', 2),
      (v_art_id, 'peer_reviewed', 1, 'Glucose and self-control: A limited-resource model', '2007', 'https://doi.org/10.1037/0022-3514.92.2.325', 'Journal of Personality and Social Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Decision fatigue in healthcare: A systematic review', '2021', 'https://doi.org/10.1177/0272989X20978098', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Choice overload and consumer decision-making', '2020', 'https://doi.org/10.1002/jcpy.1167', 'Journal of Consumer Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Mental depletion and strategic decision-making', '2021', 'https://doi.org/10.1016/j.obhdp.2021.104137', NULL, 6),
      (v_art_id, 'peer_reviewed', 1, 'Decision automation and cognitive load reduction', '2022', 'https://doi.org/10.1111/cogs.13107', 'Cognitive Science', 7),
      (v_art_id, 'peer_reviewed', 1, 'Executive function and workplace decision-making', '2021', 'https://doi.org/10.1002/acp.3782', 'Applied Cognitive Psychology', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-038 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-038';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'textbook', 5, 'Flow: The Psychology of Optimal Experience', '1990', 'https://www.worldcat.org/title/flow-the-psychology-of-optimal-experience/oclc/20692468', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'The neuroscience of flow state: A systematic review', '2022', 'https://doi.org/10.3389/fpsyg.2022.815665', 'Frontiers in Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Flow in the workplace: Predictors and outcomes', '2021', 'https://doi.org/10.1111/joop.12363', 'Journal of Occupational and Organizational Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Challenge-skill balance and flow experience', '2020', 'https://doi.org/10.1007/s11031-020-09852-z', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Transient hypofrontality and the flow state', '2021', 'https://doi.org/10.1016/j.neubiorev.2021.03.005', 'Neuroscience & Biobehavioral Reviews', 5),
      (v_art_id, 'peer_reviewed', 1, 'Flow and creativity: A meta-analytic review', '2022', 'https://doi.org/10.1002/jocb.536', 'Journal of Creative Behavior', 6),
      (v_art_id, 'peer_reviewed', 1, 'Interruptions and flow state: Experimental evidence', '2020', 'https://doi.org/10.1177/0018720820937326', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'Individual differences in flow proneness', '2021', 'https://doi.org/10.1016/j.paid.2021.110998', NULL, 8),
      (v_art_id, 'peer_reviewed', 1, 'Flow and well-being: Longitudinal associations', '2022', 'https://doi.org/10.1007/s10902-021-00470-4', 'Journal of Happiness Studies', 9)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-039 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-039';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Multitasking: Switching costs', '2001', 'https://doi.org/10.1016/S1364-6613(00)01538-2', 'Trends in Cognitive Sciences', 1),
      (v_art_id, 'peer_reviewed', 1, 'The neuroscience of multitasking: Dual-task interference', '2021', 'https://doi.org/10.1016/j.neubiorev.2021.08.017', 'Neuroscience & Biobehavioral Reviews', 2),
      (v_art_id, 'peer_reviewed', 1, 'Media multitasking and cognitive control', '2009', 'https://doi.org/10.1073/pnas.0903620106', 'Proceedings of the National Academy of Sciences', 3),
      (v_art_id, 'peer_reviewed', 1, 'Driving while texting: Brain activity and crash risk', '2020', 'https://doi.org/10.1177/0018720819879245', NULL, 4),
      (v_art_id, 'peer_reviewed', 1, 'Chronic media multitaskers show decreased attentional control', '2022', 'https://doi.org/10.3758/s13423-021-02039-7', 'Psychonomic Bulletin & Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'Task-switching and working memory capacity', '2020', 'https://doi.org/10.1037/xhp0000746', 'Journal of Experimental Psychology: Human Perception and Performance', 6),
      (v_art_id, 'peer_reviewed', 1, 'Email multitasking and workplace productivity', '2021', 'https://doi.org/10.1016/j.chb.2021.106851', NULL, 7),
      (v_art_id, 'peer_reviewed', 1, 'The cost of interrupted work: Field study', '2008', 'https://doi.org/10.1145/1357054.1357072', NULL, 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT05-040 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT05-040';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'textbook', 5, 'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones', '2018', 'https://www.worldcat.org/title/atomic-habits/oclc/1040407552', NULL, 1),
      (v_art_id, 'peer_reviewed', 1, 'Sustainable productivity: Long-term performance patterns', '2022', 'https://doi.org/10.1037/apl0000978', 'Journal of Applied Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Recovery experiences and burnout prevention', '2021', 'https://doi.org/10.1037/ocp0000285', 'Journal of Occupational Health Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Habit formation and behavior change', '2020', 'https://doi.org/10.1002/ejsp.2714', 'European Journal of Social Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Work-recovery cycles: Optimal patterns', '2021', 'https://doi.org/10.1177/2041386621998228', 'Organizational Psychology Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'Self-compassion and sustainable performance', '2022', 'https://doi.org/10.1080/15298868.2021.1987979', NULL, 6),
      (v_art_id, 'professional_org', 3, 'Energy management vs. time management', '2007', 'https://hbr.org/2007/10/manage-your-energy-not-your-time', 'Harvard Business Review', 7),
      (v_art_id, 'peer_reviewed', 1, 'Long-term productivity interventions: Meta-analysis', '2022', 'https://doi.org/10.1111/peps.12496', 'Personnel Psychology', 8)
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
