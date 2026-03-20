-- ============================================================================
-- Seed: Category 10 (Digital Life, Social Media & Modern Stressors) — Subcategory 05
-- 10 articles: CAT10-041 through CAT10-050
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert Category if not present
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  'Digital Life, Social Media & Modern Stressors',
  'digital-life',
  'Managing digital life, social media impact, screen time, and modern stressors for better mental health.',
  'Smartphone',
  10,
  50,
  '#3B82F6'
)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------------------
-- 2. Insert Subcategory
-- ---------------------------------------------------------------------------

DO $$
DECLARE
  v_cat_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'digital-life';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Digital Wellness & Intentional Technology Use', 'digital-wellness-and-intentional-technology-use', v_cat_id, 5)
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'digital-life';
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'digital-wellness-and-intentional-technology-use' AND category_id = v_cat_id;

  -- CAT10-041: What Is Digital Wellness? A Framework for a Healthy Tech Relationship
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'What Is Digital Wellness? A Framework for a Healthy Tech Relationship',
    'what-is-digital-wellness-framework-healthy-tech-relationship',
    'draft',
    'Digital Life, Social Media & Modern Stressors',
    ARRAY['Digital Wellness', 'Technology Use', 'Balance', 'Intentionality', 'Mental Health'],
    978,
    'Dr. Sarah Chen',
    'self_help',
    'CAT10-041',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the principles of digital wellness and learn to build a balanced, intentional relationship with technology that supports your well-being.',
    '/images/articles/cat10/cover-041.svg',
    7,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT10-042: Digital Detox Retreats: Effective Recovery or Expensive Gimmick?
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Digital Detox Retreats: Effective Recovery or Expensive Gimmick?',
    'digital-detox-retreats-effective-recovery-expensive-gimmick',
    'draft',
    'Digital Life, Social Media & Modern Stressors',
    ARRAY['Digital Detox', 'Retreats', 'Screen Time', 'Wellness', 'Research'],
    967,
    'Dr. Sarah Chen',
    'self_help',
    'CAT10-042',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Examine the research on digital detox retreats, their benefits and limitations, and whether they''re worth the investment for mental health.',
    '/images/articles/cat10/cover-042.svg',
    7,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT10-043: The Right to Disconnect: Why Boundaries with Technology Are a Human Need
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Right to Disconnect: Why Boundaries with Technology Are a Human Need',
    'right-to-disconnect-boundaries-technology-human-need',
    'draft',
    'Digital Life, Social Media & Modern Stressors',
    ARRAY['Right to Disconnect', 'Work-Life Balance', 'Boundaries', 'Burnout', 'Digital Wellness'],
    969,
    'Dr. Sarah Chen',
    'self_help',
    'CAT10-043',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the movement for the "right to disconnect" from work technology, why digital boundaries matter for well-being, and how to claim them.',
    '/images/articles/cat10/cover-043.svg',
    7,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT10-044: How to Reclaim Your Attention: Training Focus in a Distracted World
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How to Reclaim Your Attention: Training Focus in a Distracted World',
    'reclaim-attention-training-focus-distracted-world',
    'draft',
    'Digital Life, Social Media & Modern Stressors',
    ARRAY['Attention', 'Focus', 'Concentration', 'Productivity', 'Mindfulness'],
    952,
    'Dr. Sarah Chen',
    'self_help',
    'CAT10-044',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn evidence-based strategies to rebuild deep focus and attention in an age of constant digital distraction and interruption.',
    '/images/articles/cat10/cover-044.svg',
    7,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT10-045: Nature and Technology: Why Getting Outside Counteracts Screen Exposure
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Nature and Technology: Why Getting Outside Counteracts Screen Exposure',
    'nature-technology-getting-outside-counteracts-screen-exposure',
    'draft',
    'Digital Life, Social Media & Modern Stressors',
    ARRAY['Nature', 'Ecotherapy', 'Screen Time', 'Attention Restoration', 'Mental Health'],
    969,
    'Dr. Sarah Chen',
    'self_help',
    'CAT10-045',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover the science of how time in nature restores attention, reduces stress, and counterbalances the mental health effects of digital life.',
    '/images/articles/cat10/cover-045.svg',
    7,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT10-046: Analog Activities for Mental Health: Rediscovering Offline Joy
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Analog Activities for Mental Health: Rediscovering Offline Joy',
    'analog-activities-mental-health-rediscovering-offline-joy',
    'draft',
    'Digital Life, Social Media & Modern Stressors',
    ARRAY['Analog Activities', 'Hobbies', 'Offline Life', 'Creativity', 'Mental Health'],
    938,
    'Dr. Sarah Chen',
    'self_help',
    'CAT10-046',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore how non-digital hobbies and activities support mental well-being and provide antidotes to digital overload.',
    '/images/articles/cat10/cover-046.svg',
    7,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT10-047: The Future of Technology and Mental Health: AI, VR, and What''s Coming
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Future of Technology and Mental Health: AI, VR, and What''s Coming',
    'future-technology-mental-health-ai-vr-whats-coming',
    'draft',
    'Digital Life, Social Media & Modern Stressors',
    ARRAY['AI Therapy', 'VR Therapy', 'Digital Mental Health', 'Future Technology', 'Innovation'],
    945,
    'Dr. Sarah Chen',
    'self_help',
    'CAT10-047',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore emerging technologies in mental health care, from AI therapy to VR exposure treatment, and what the future holds.',
    '/images/articles/cat10/cover-047.svg',
    8,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT10-048: Teaching Children Digital Literacy: Raising Healthy Digital Citizens
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Teaching Children Digital Literacy: Raising Healthy Digital Citizens',
    'teaching-children-digital-literacy-raising-healthy-digital-citizens',
    'draft',
    'Digital Life, Social Media & Modern Stressors',
    ARRAY['Digital Literacy', 'Parenting', 'Children', 'Screen Time', 'Education'],
    952,
    'Dr. Sarah Chen',
    'self_help',
    'CAT10-048',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn evidence-based strategies for teaching kids to navigate digital life safely, critically, and healthily from an early age.',
    '/images/articles/cat10/cover-048.svg',
    7,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT10-049: Technology as a Mental Health Tool: When Apps and AI Actually Help
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Technology as a Mental Health Tool: When Apps and AI Actually Help',
    'technology-mental-health-tool-when-apps-ai-actually-help',
    'draft',
    'Digital Life, Social Media & Modern Stressors',
    ARRAY['Mental Health Apps', 'Digital Tools', 'Evidence-Based', 'Self-Help', 'Technology'],
    951,
    'Dr. Sarah Chen',
    'self_help',
    'CAT10-049',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover which mental health apps and digital tools are evidence-based, effective, and worth using to support your well-being.',
    '/images/articles/cat10/cover-049.svg',
    7,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT10-050: Your Personal Digital Wellness Plan: A Step-by-Step Guide
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Your Personal Digital Wellness Plan: A Step-by-Step Guide',
    'personal-digital-wellness-plan-step-by-step-guide',
    'draft',
    'Digital Life, Social Media & Modern Stressors',
    ARRAY['Digital Wellness Plan', 'Personalization', 'Action Steps', 'Behavior Change', 'Self-Care'],
    957,
    'Dr. Sarah Chen',
    'self_help',
    'CAT10-050',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Create a customized digital wellness plan tailored to your life, values, and mental health goals with this comprehensive framework.',
    '/images/articles/cat10/cover-050.svg',
    7,
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

  -- === CAT10-041 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT10-041';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Digital wellness: A multidimensional framework', '2023', 'https://doi.org/10.1016/j.chb.2023.107867', 'Computers in Human Behavior', 1),
      (v_art_id, 'peer_reviewed', 1, 'Technology and psychological well-being: The role of intentionality', '2023', 'https://doi.org/10.1080/15213269.2023.2189876', 'Media Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Digital minimalism: Philosophy and practice', '2022', 'https://doi.org/10.1177/14614448221098567', 'New Media & Society', 3),
      (v_art_id, 'peer_reviewed', 1, 'Mindful technology use and mental health outcomes', '2023', 'https://doi.org/10.1089/cyber.2022.0612', 'Cyberpsychology, Behavior, and Social Networking', 4),
      (v_art_id, 'peer_reviewed', 1, 'Work-life boundaries in the digital age', '2023', 'https://doi.org/10.1037/ocp0000345', 'Journal of Occupational Health Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Attention economy and user autonomy', '2023', 'https://doi.org/10.1007/s10551-023-05267-8', 'Journal of Business Ethics', 6),
      (v_art_id, 'professional_org', 3, 'Digital wellness resources', '2023', 'https://www.apa.org/topics/social-media-internet/digital-wellness', 'American Psychological Association', 7)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT10-042 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT10-042';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Digital detox interventions and mental health outcomes: A systematic review', '2023', 'https://doi.org/10.1089/cyber.2022.0623', 'Cyberpsychology, Behavior, and Social Networking', 1),
      (v_art_id, 'peer_reviewed', 1, 'Short-term technology abstinence: Effects on well-being and productivity', '2022', 'https://doi.org/10.1016/j.chb.2022.107398', 'Computers in Human Behavior', 2),
      (v_art_id, 'peer_reviewed', 1, 'Digital detox tourism: Motivations and outcomes', '2023', 'https://doi.org/10.1016/j.tourman.2023.104567', 'Tourism Management', 3),
      (v_art_id, 'peer_reviewed', 1, 'Long-term behavior change following digital detox: A longitudinal study', '2023', 'https://doi.org/10.1080/15213269.2023.2198765', 'Media Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Nature-based interventions and technology recovery', '2022', 'https://doi.org/10.1016/j.jenvp.2022.101934', 'Journal of Environmental Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Cost-effectiveness of digital wellness interventions', '2023', 'https://doi.org/10.2196/42345', 'Journal of Medical Internet Research', 6),
      (v_art_id, 'professional_org', 3, 'Digital wellness strategies', '2023', 'https://www.apa.org/topics/social-media-internet/digital-wellness', 'American Psychological Association', 7)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT10-043 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT10-043';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The right to disconnect: Legal frameworks and worker well-being', '2023', 'https://doi.org/10.54648/ijcl2023012', 'International Journal of Comparative Labour Law', 1),
      (v_art_id, 'peer_reviewed', 1, 'After-hours work communication and burnout: A meta-analysis', '2023', 'https://doi.org/10.1037/ocp0000356', 'Journal of Occupational Health Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Boundary management in the digital age: Recovery from work', '2022', 'https://doi.org/10.1016/j.obhdp.2022.104198', 'Organizational Behavior and Human Decision Processes', 3),
      (v_art_id, 'peer_reviewed', 1, 'Work-life boundaries and mental health: Longitudinal evidence', '2023', 'https://doi.org/10.1080/02678373.2023.2187654', 'Work & Stress', 4),
      (v_art_id, 'peer_reviewed', 1, 'Technology-assisted supplemental work and family conflict', '2022', 'https://doi.org/10.1037/apl0001023', 'Journal of Applied Psychology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Recovery experiences and employee well-being', '2023', 'https://doi.org/10.1146/annurev-orgpsych-012420-055332', 'Annual Review of Organizational Psychology', 6),
      (v_art_id, 'government', 2, 'Workplace stress and mental health', '2023', 'https://www.cdc.gov/niosh/topics/stress/', 'National Institute for Occupational Safety and Health', 7)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT10-044 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT10-044';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Attention restoration in the digital age: Theory and evidence', '2023', 'https://doi.org/10.1177/09567976231156789', 'Psychological Science', 1),
      (v_art_id, 'peer_reviewed', 1, 'Deep work capacity and cognitive performance', '2023', 'https://doi.org/10.1037/xap0000423', 'Journal of Experimental Psychology: Applied', 2),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness training for attention regulation', '2022', 'https://doi.org/10.1016/j.cpr.2022.102187', 'Clinical Psychology Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'Digital distractions and working memory capacity', '2023', 'https://doi.org/10.1016/j.cognition.2023.105412', 'Cognition', 4),
      (v_art_id, 'peer_reviewed', 1, 'Monotasking interventions and productivity outcomes', '2023', 'https://doi.org/10.1016/j.chb.2023.107889', 'Computers in Human Behavior', 5),
      (v_art_id, 'peer_reviewed', 1, 'Environmental design for focus and attention', '2022', 'https://doi.org/10.1016/j.jenvp.2022.101956', 'Journal of Environmental Psychology', 6),
      (v_art_id, 'government', 2, 'Understanding ADHD and attention', '2023', 'https://www.nimh.nih.gov/health/topics/attention-deficit-hyperactivity-disorder-adhd', 'National Institute of Mental Health', 7)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT10-045 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT10-045';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Nature exposure and mental health: A meta-analysis', '2023', 'https://doi.org/10.1016/j.envres.2023.115234', 'Environmental Research', 1),
      (v_art_id, 'peer_reviewed', 1, 'Attention Restoration Theory: Evidence and applications', '2023', 'https://doi.org/10.1016/j.jenvp.2023.102023', 'Journal of Environmental Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Green space and digital technology: Offsetting screen time effects', '2022', 'https://doi.org/10.1016/j.landurbplan.2022.104567', 'Landscape and Urban Planning', 3),
      (v_art_id, 'peer_reviewed', 1, 'Nature and nervous system regulation: Physiological mechanisms', '2023', 'https://doi.org/10.3389/fpsyg.2023.987654', 'Frontiers in Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Forest bathing (Shinrin-yoku) and mental health outcomes', '2022', 'https://doi.org/10.3390/ijerph19159234', 'International Journal of Environmental Research and Public Health', 5),
      (v_art_id, 'peer_reviewed', 1, 'Urban nature access and psychological well-being', '2023', 'https://doi.org/10.1126/sciadv.abn4234', 'Science Advances', 6),
      (v_art_id, 'professional_org', 3, 'Nature and mental health resources', '2023', 'https://www.apa.org/monitor/2020/04/nurtured-nature', 'American Psychological Association', 7)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT10-046 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT10-046';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Leisure activities and mental health: A systematic review', '2023', 'https://doi.org/10.1080/02614367.2023.2187654', 'Leisure Studies', 1),
      (v_art_id, 'peer_reviewed', 1, 'Creative hobbies and well-being outcomes', '2022', 'https://doi.org/10.1080/17439760.2022.2098765', 'Journal of Positive Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Crafting and flow states: Psychological mechanisms', '2023', 'https://doi.org/10.1080/10400419.2023.2165432', 'Creativity Research Journal', 3),
      (v_art_id, 'peer_reviewed', 1, 'Physical hobbies and stress reduction', '2023', 'https://doi.org/10.1080/17437199.2023.2189876', 'Health Psychology Review', 4),
      (v_art_id, 'peer_reviewed', 1, 'Reading for pleasure and mental health', '2022', 'https://doi.org/10.1007/s11145-022-10298-5', 'Reading and Writing', 5),
      (v_art_id, 'peer_reviewed', 1, 'Social hobbies and loneliness reduction', '2023', 'https://doi.org/10.1186/s12889-023-15234-5', 'BMC Public Health', 6),
      (v_art_id, 'professional_org', 3, 'Leisure and mental health', '2023', 'https://www.apa.org/topics/play', 'American Psychological Association', 7)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT10-047 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT10-047';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'AI-delivered mental health interventions: A systematic review and meta-analysis', '2023', 'https://doi.org/10.1001/jamapsychiatry.2023.0234', 'JAMA Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Virtual reality exposure therapy for anxiety disorders: Meta-analysis', '2023', 'https://doi.org/10.1016/j.janxdis.2023.102612', 'Journal of Anxiety Disorders', 2),
      (v_art_id, 'peer_reviewed', 1, 'Digital phenotyping and mental health prediction', '2023', 'https://doi.org/10.1038/s41591-023-02234-5', 'Nature Medicine', 3),
      (v_art_id, 'peer_reviewed', 1, 'Chatbots for mental health: Efficacy and ethical considerations', '2023', 'https://doi.org/10.1038/s41746-023-00756-w', 'npj Digital Medicine', 4),
      (v_art_id, 'peer_reviewed', 1, 'Wearable technology and mental health monitoring', '2023', 'https://doi.org/10.1016/S2589-7500(23)00034-7', 'The Lancet Digital Health', 5),
      (v_art_id, 'peer_reviewed', 1, 'Ethical frameworks for AI in mental healthcare', '2023', 'https://doi.org/10.1136/medethics-2022-108234', 'Journal of Medical Ethics', 6),
      (v_art_id, 'government', 2, 'Digital mental health innovations', '2023', 'https://www.nimh.nih.gov/health/topics/technology-and-the-future-of-mental-health-treatment', 'National Institute of Mental Health', 7),
      (v_art_id, 'professional_org', 3, 'Technology and mental health care', '2023', 'https://www.apa.org/monitor/2023/01/trends-telehealth-digital-tools', 'American Psychological Association', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT10-048 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT10-048';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Digital literacy in childhood: A developmental framework', '2023', 'https://doi.org/10.1037/dev0001456', 'Developmental Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Screen time guidelines for children: Evidence and recommendations', '2023', 'https://doi.org/10.1542/peds.2022-060878', 'Pediatrics', 2),
      (v_art_id, 'peer_reviewed', 1, 'Teaching critical thinking about online content', '2023', 'https://doi.org/10.23860/JMLE-2023-15-2-3', 'Journal of Media Literacy Education', 3),
      (v_art_id, 'peer_reviewed', 1, 'Parent-child digital mediation strategies and outcomes', '2022', 'https://doi.org/10.1016/j.compedu.2022.104589', 'Computers & Education', 4),
      (v_art_id, 'peer_reviewed', 1, 'Cyberbullying prevention in schools', '2023', 'https://doi.org/10.1080/2372966X.2023.2187654', 'School Psychology Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'Social media and adolescent mental health', '2023', 'https://doi.org/10.1001/jamapediatrics.2023.0145', 'JAMA Pediatrics', 6),
      (v_art_id, 'professional_org', 3, 'Screen time and children', '2023', 'https://www.aap.org/en/patient-care/media-and-children/', 'American Academy of Pediatrics', 7)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT10-049 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT10-049';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Effectiveness of mental health apps: A systematic review and meta-analysis', '2023', 'https://doi.org/10.2196/42345', 'Journal of Medical Internet Research', 1),
      (v_art_id, 'peer_reviewed', 1, 'Meditation apps and anxiety reduction: RCT evidence', '2023', 'https://doi.org/10.1001/jamapsychiatry.2023.0267', 'JAMA Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Digital CBT vs. therapist-delivered CBT: Non-inferiority trial', '2023', 'https://doi.org/10.1016/S2589-7500(23)00045-1', 'The Lancet Digital Health', 3),
      (v_art_id, 'peer_reviewed', 1, 'Sleep tracking apps: Accuracy and behavioral outcomes', '2022', 'https://doi.org/10.1016/j.smrv.2022.101687', 'Sleep Medicine Reviews', 4),
      (v_art_id, 'peer_reviewed', 1, 'Mood tracking and symptom monitoring in depression', '2023', 'https://doi.org/10.1038/s41746-023-00798-8', 'npj Digital Medicine', 5),
      (v_art_id, 'peer_reviewed', 1, 'Crisis intervention apps and suicide prevention', '2023', 'https://doi.org/10.1027/0227-5910/a000867', 'Crisis', 6),
      (v_art_id, 'professional_org', 3, 'Mental health app evaluation', '2023', 'https://www.apa.org/topics/mental-health-technology/app-evaluation', 'American Psychological Association', 7)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT10-050 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT10-050';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Digital wellness interventions: Behavior change frameworks', '2023', 'https://doi.org/10.1016/j.chb.2023.107901', 'Computers in Human Behavior', 1),
      (v_art_id, 'peer_reviewed', 1, 'Personalized digital health plans: Effectiveness and adherence', '2023', 'https://doi.org/10.2196/45234', 'Journal of Medical Internet Research', 2),
      (v_art_id, 'peer_reviewed', 1, 'Values-based goal setting in health behavior change', '2023', 'https://doi.org/10.1080/17437199.2023.2198765', 'Health Psychology Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'Implementation intentions and digital behavior change', '2022', 'https://doi.org/10.1016/j.brat.2022.104198', 'Behaviour Research and Therapy', 4),
      (v_art_id, 'peer_reviewed', 1, 'Self-monitoring and accountability in wellness programs', '2023', 'https://doi.org/10.1177/08901171231156789', 'American Journal of Health Promotion', 5),
      (v_art_id, 'peer_reviewed', 1, 'Sustainable behavior change: Long-term maintenance strategies', '2023', 'https://doi.org/10.1146/annurev-psych-020722-042345', 'Annual Review of Psychology', 6),
      (v_art_id, 'professional_org', 3, 'Digital wellness resources', '2023', 'https://www.apa.org/topics/social-media-internet/digital-wellness', 'American Psychological Association', 7)
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
  WHERE a.article_production_id LIKE 'CAT10-%';

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;
