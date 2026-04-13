-- ============================================================================
-- Complete Category Alignment: Categories 23-31
-- Adds missing categories (29-31), subcategories (23-31), and article seeds
-- Generated: 2026-04-12
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert Categories 29-31 (completely new)
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  'Environmental, Eco-Psychology & Planetary Mental Health',
  'environmental-eco-psychology',
  'The psychological dimensions of our relationship with the natural world — eco-anxiety, climate grief, nature-based therapy, urban psychology, and environmental justice.',
  'Leaf',
  29,
  70,
  '#059669'
) ON CONFLICT (slug) DO UPDATE SET
  display_order = EXCLUDED.display_order,
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon,
  article_target = EXCLUDED.article_target,
  color = EXCLUDED.color;

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  'Applied Life Skills, Self-Design & Practical Psychology',
  'life-skills-practical-psychology',
  'Practical psychology for everyday life — decision-making, emotional intelligence, communication, productivity, habit formation, financial psychology, and the examined life.',
  'Lightbulb',
  30,
  110,
  '#D97706'
) ON CONFLICT (slug) DO UPDATE SET
  display_order = EXCLUDED.display_order,
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon,
  article_target = EXCLUDED.article_target,
  color = EXCLUDED.color;

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  'Spirituality, Meaning & Existential Mental Health',
  'spirituality-meaning',
  'Evidence-based exploration of existential psychology — confronting questions of meaning, mortality, freedom, and isolation through philosophical frameworks and therapeutic approaches.',
  'Sun',
  31,
  60,
  '#7C3AED'
) ON CONFLICT (slug) DO UPDATE SET
  display_order = EXCLUDED.display_order,
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon,
  article_target = EXCLUDED.article_target,
  color = EXCLUDED.color;

-- ---------------------------------------------------------------------------
-- 2. Insert Subcategories for Categories 23-31
-- ---------------------------------------------------------------------------

-- Category 23: brain-neuroscience
DO $$
DECLARE
  v_cat_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'brain-neuroscience';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Brain Basics', 'brain-basics', v_cat_id, 1)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Brain Fundamentals', 'brain-fundamentals', v_cat_id, 2)
  ON CONFLICT (slug, category_id) DO NOTHING;

END $$;

-- Category 24: creativity-therapeutic-arts
DO $$
DECLARE
  v_cat_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'creativity-therapeutic-arts';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Clinical Creative Interventions', 'clinical-creative-interventions', v_cat_id, 1)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Creative Modalities and Practices', 'creative-modalities-and-practices', v_cat_id, 2)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Creative Process and Challenges', 'creative-process-and-challenges', v_cat_id, 3)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Foundations of Creative Wellbeing', 'foundations-of-creative-wellbeing', v_cat_id, 4)
  ON CONFLICT (slug, category_id) DO NOTHING;

END $$;

-- Category 25: disability-accessibility
DO $$
DECLARE
  v_cat_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'disability-accessibility';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Access & Service Design', 'access-and-service-design', v_cat_id, 1)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Accessing Mental Health Care With a Disability', 'accessing-mental-health-care-with-a-disability', v_cat_id, 2)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Aging, Disability & Mental Health', 'aging-disability-and-mental-health', v_cat_id, 3)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Caregiving & Family Systems', 'caregiving-and-family-systems', v_cat_id, 4)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Chronic Illness & Mental Health', 'chronic-illness-and-mental-health', v_cat_id, 5)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Disability & Identity', 'disability-and-identity', v_cat_id, 6)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Disability Advocacy and Future Directions', 'disability-advocacy-and-future-directions', v_cat_id, 7)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Disability Identity and Community', 'disability-identity-and-community', v_cat_id, 8)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Disability Myths', 'disability-myths', v_cat_id, 9)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Disability, Sexuality & Relationships', 'disability-sexuality-and-relationships', v_cat_id, 10)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Employment & Economic Inclusion', 'employment-and-economic-inclusion', v_cat_id, 11)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Intellectual & Developmental Disability', 'intellectual-and-developmental-disability', v_cat_id, 12)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Neurodivergence & Disability', 'neurodivergence-and-disability', v_cat_id, 13)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Sensory Disability & Mental Health', 'sensory-disability-and-mental-health', v_cat_id, 14)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Specific Disability Contexts', 'specific-disability-contexts', v_cat_id, 15)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Universal Design & Inclusion', 'universal-design-and-inclusion', v_cat_id, 16)
  ON CONFLICT (slug, category_id) DO NOTHING;

END $$;

-- Category 26: forensic-legal-justice
DO $$
DECLARE
  v_cat_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'forensic-legal-justice';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Forensic Assessment and Evaluation', 'forensic-assessment-and-evaluation', v_cat_id, 1)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Forensic Ethics and Professional Issues', 'forensic-ethics-and-professional-issues', v_cat_id, 2)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Juvenile Justice and Mental Health', 'juvenile-justice-and-mental-health', v_cat_id, 3)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Mental Health in the Justice System', 'mental-health-in-the-justice-system', v_cat_id, 4)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Psychology of Criminal Behavior', 'psychology-of-criminal-behavior', v_cat_id, 5)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Reentry, Rehabilitation & Prevention', 'reentry-rehabilitation-and-prevention', v_cat_id, 6)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Specialized Forensic Topics', 'specialized-forensic-topics', v_cat_id, 7)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Victims and Survivors', 'victims-and-survivors', v_cat_id, 8)
  ON CONFLICT (slug, category_id) DO NOTHING;

END $$;

-- Category 27: military-veterans-firstresponder
DO $$
DECLARE
  v_cat_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'military-veterans-firstresponder';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Combat-Related Mental Health', 'combat-related-mental-health', v_cat_id, 1)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('First Responder Mental Health', 'first-responder-mental-health', v_cat_id, 2)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Military Culture & Psychology', 'military-culture-and-psychology', v_cat_id, 3)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Military Families', 'military-families', v_cat_id, 4)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Military Families and Relationships', 'military-families-and-relationships', v_cat_id, 5)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Transition & Reintegration', 'transition-and-reintegration', v_cat_id, 6)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Transition and Reintegration', 'transition-and-reintegration', v_cat_id, 7)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Treatment & Recovery', 'treatment-and-recovery', v_cat_id, 8)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Veteran-Specific Issues', 'veteran-specific-issues', v_cat_id, 9)
  ON CONFLICT (slug, category_id) DO NOTHING;

END $$;

-- Category 28: sexuality-intimacy
DO $$
DECLARE
  v_cat_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'sexuality-intimacy';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Gender, Identity & Sexuality', 'gender-identity-and-sexuality', v_cat_id, 1)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Intimacy & Relationships', 'intimacy-and-relationships', v_cat_id, 2)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Myths & Future Directions', 'myths-and-future-directions', v_cat_id, 3)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Sex Therapy and Professional Help', 'sex-therapy-and-professional-help', v_cat_id, 4)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Sexual Dysfunction & Treatment', 'sexual-dysfunction-and-treatment', v_cat_id, 5)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Sexual Health & Education', 'sexual-health-and-education', v_cat_id, 6)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Sexual Trauma & Recovery', 'sexual-trauma-and-recovery', v_cat_id, 7)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Sexuality Myths', 'sexuality-myths', v_cat_id, 8)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Sexuality and Specific Populations', 'sexuality-and-specific-populations', v_cat_id, 9)
  ON CONFLICT (slug, category_id) DO NOTHING;

END $$;

-- Category 29: environmental-eco-psychology
DO $$
DECLARE
  v_cat_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'environmental-eco-psychology';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Climate and Eco-Anxiety', 'climate-and-eco-anxiety', v_cat_id, 1)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Climate, Seasons, and Psychological Rhythms', 'climate-seasons-and-psychological-rhythms', v_cat_id, 2)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Emerging Topics in Environmental Psychology', 'emerging-topics-in-environmental-psychology', v_cat_id, 3)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Environmental Justice and Mental Health', 'environmental-justice-and-mental-health', v_cat_id, 4)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Nature-Based Therapy and Ecotherapy', 'nature-based-therapy-and-ecotherapy', v_cat_id, 5)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Planetary Mental Health', 'planetary-mental-health', v_cat_id, 6)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Resilience, Adaptation, and the Future', 'resilience-adaptation-and-the-future', v_cat_id, 7)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Sustainability and Wellbeing', 'sustainability-and-wellbeing', v_cat_id, 8)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Urban Psychology and Built Environment', 'urban-psychology-and-built-environment', v_cat_id, 9)
  ON CONFLICT (slug, category_id) DO NOTHING;

END $$;

-- Category 30: life-skills-practical-psychology
DO $$
DECLARE
  v_cat_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'life-skills-practical-psychology';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Career & Professional Development', 'career-and-professional-development', v_cat_id, 1)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Communication & Social Skills', 'communication-and-social-skills', v_cat_id, 2)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Creativity & Problem-Solving', 'creativity-and-problem-solving', v_cat_id, 3)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Decision-Making & Critical Thinking', 'decision-making-and-critical-thinking', v_cat_id, 4)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Emotional Intelligence & Self-Regulation', 'emotional-intelligence-and-self-regulation', v_cat_id, 5)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Financial Psychology', 'financial-psychology', v_cat_id, 6)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Habit Formation & Behavior Change', 'habit-formation-and-behavior-change', v_cat_id, 7)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Integration & the Examined Life', 'integration-and-the-examined-life', v_cat_id, 8)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Productivity & Time Management', 'productivity-and-time-management', v_cat_id, 9)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Self-Design & Life Architecture', 'self-design-and-life-architecture', v_cat_id, 10)
  ON CONFLICT (slug, category_id) DO NOTHING;

END $$;

-- Category 31: spirituality-meaning
DO $$
DECLARE
  v_cat_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'spirituality-meaning';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Existential Psychology', 'existential-psychology', v_cat_id, 1)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Existential Questions & Spiritual Practice', 'existential-questions-and-spiritual-practice', v_cat_id, 2)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Positive Psychology & Human Flourishing', 'positive-psychology-and-human-flourishing', v_cat_id, 3)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Secular Approaches to Meaning', 'secular-approaches-to-meaning', v_cat_id, 4)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Spirituality and Mental Health', 'spirituality-and-mental-health', v_cat_id, 5)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('altered-transcendent-states', 'altered-transcendent-states', v_cat_id, 6)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('collective-social-meaning', 'collective-social-meaning', v_cat_id, 7)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('existential-concerns-challenges', 'existential-concerns-challenges', v_cat_id, 8)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('meaning-symbolic-systems', 'meaning-symbolic-systems', v_cat_id, 9)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('spiritual-crises-challenges', 'spiritual-crises-challenges', v_cat_id, 10)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('spiritual-practices-methods', 'spiritual-practices-methods', v_cat_id, 11)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('spiritual-psychological-integration', 'spiritual-psychological-integration', v_cat_id, 12)
  ON CONFLICT (slug, category_id) DO NOTHING;

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('values-ethics-conscience', 'values-ethics-conscience', v_cat_id, 13)
  ON CONFLICT (slug, category_id) DO NOTHING;

END $$;

-- ---------------------------------------------------------------------------
-- 3. Seed Articles for Categories 23-31
-- ---------------------------------------------------------------------------

-- Category 23: brain-neuroscience (66 articles)
DO $$
DECLARE
  v_cat_id UUID;
  v_sub_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'brain-neuroscience';

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'brain-basics' AND category_id = v_cat_id;

  -- CAT23-001: Neurotransmitters and Mental Health: The Chemical Messengers
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Neurotransmitters and Mental Health: The Chemical Messengers of the Brain',
    'neurotransmitters-mental-health',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['neurotransmitters', 'serotonin', 'dopamine', 'GABA', 'glutamate'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-001',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore neurotransmitters—chemical messengers shaping mood, anxiety, motivation. Learn how serotonin, dopamine, GABA, and others influence mental health, debunking chemical imbalance myth with nuanced brain science.',
    '/images/articles/cat23/cover-001.svg',
    5,
    false,
    true,
    NULL,
    TRUE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-002: The Stress Response and the Brain: HPA Axis, Cortisol, and C
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Stress Response and the Brain: HPA Axis, Cortisol, and Chronic Stress Effects',
    'stress-brain-hpa-axis',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['HPA axis', 'cortisol', 'stress response', 'chronic stress', 'fight or flight'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-002',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore stress neuroscience—HPA axis activation, cortisol''s effects on brain and body, acute vs. chronic stress, how prolonged stress damages hippocampus, prefrontal cortex, and mental health.',
    '/images/articles/cat23/cover-002.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-003: Sleep and the Brain: How Rest Restores Mental Health
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Sleep and the Brain: How Rest Restores Mental Health',
    'sleep-brain-mental-health',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['sleep neuroscience', 'REM sleep', 'slow wave sleep', 'sleep deprivation', 'circadian rhythm'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-003',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore sleep neuroscience—what happens in brain during sleep, REM and slow-wave stages, memory consolidation, emotional processing, glymphatic waste clearance, and why sleep deprivation devastates mental health.',
    '/images/articles/cat23/cover-003.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-004: Brain Development and Adolescence: Why the Teenage Brain Tak
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Brain Development and Adolescence: Why the Teenage Brain Takes Risks',
    'brain-development-adolescence',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['adolescent brain', 'brain development', 'prefrontal cortex', 'teenage brain', 'synaptic pruning'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-004',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore adolescent brain development—why prefrontal cortex matures last, synaptic pruning and myelination, how developmental mismatch between limbic system and PFC explains teenage risk-taking, and mental health vulnerability.',
    '/images/articles/cat23/cover-004.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-005: Neuroinflammation and Mental Health: When the Brain\''s Immu
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Neuroinflammation and Mental Health: When the Brain\''s Immune System Goes Wrong',
    'neuroinflammation-mental-health',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['neuroinflammation', 'brain inflammation', 'microglia', 'cytokines', 'immune system mental health'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-005',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore neuroinflammation—how brain''s immune cells (microglia) and inflammatory molecules (cytokines) affect mental health, depression-inflammation connection, autoimmune conditions, and emerging anti-inflammatory treatments.',
    '/images/articles/cat23/cover-005.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-006: The Gut-Brain Axis: How Your Digestive System Affects Your M
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Gut-Brain Axis: How Your Digestive System Affects Your Mental Health',
    'gut-brain-axis',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['gut-brain axis', 'microbiome mental health', 'vagus nerve', 'gut bacteria', 'probiotics depression'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-006',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore gut-brain axis—bidirectional communication between digestive system and brain via vagus nerve, how gut microbiome produces neurotransmitters, inflammatory signals affect mood, and emerging probiotic treatments for mental health.',
    '/images/articles/cat23/cover-006.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-007: Brain Imaging and Mental Health: What fMRI, PET, and EEG Tel
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Brain Imaging and Mental Health: What fMRI, PET, and EEG Tell Us About Psychiatric Conditions',
    'brain-imaging-mental-health',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['brain imaging', 'fMRI mental health', 'PET scan psychiatry', 'EEG depression', 'neuroimaging'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-007',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore brain imaging technologies—fMRI, PET, EEG, structural MRI—what they reveal about depression, anxiety, schizophrenia, ADHD brain patterns, limitations of neuroimaging for diagnosis, and future of brain-based biomarkers.',
    '/images/articles/cat23/cover-007.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-008: Epigenetics and Mental Health: How Life Experience Changes G
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Epigenetics and Mental Health: How Life Experience Changes Gene Expression',
    'epigenetics-mental-health',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['epigenetics', 'gene expression', 'DNA methylation', 'histone modification', 'trauma inheritance'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-008',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover how epigenetics explains why life experiences—trauma, stress, nurture—can alter gene expression without changing DNA, affecting mental health across generations.',
    '/images/articles/cat23/cover-008.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-009: Executive Function and the Prefrontal Cortex: The Brain\''s 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Executive Function and the Prefrontal Cortex: The Brain\''s Command Center',
    'executive-function-prefrontal-cortex',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['executive function', 'prefrontal cortex', 'working memory', 'cognitive control', 'inhibition'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-009',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how the prefrontal cortex enables executive functions—planning, impulse control, working memory—and why dysfunction in this brain region affects ADHD, addiction, and mood disorders.',
    '/images/articles/cat23/cover-009.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-010: Memory and the Hippocampus: How the Brain Stores and Retriev
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Memory and the Hippocampus: How the Brain Stores and Retrieves Information',
    'memory-hippocampus',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['memory', 'hippocampus', 'consolidation', 'episodic memory', 'semantic memory'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-010',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore how the hippocampus encodes, consolidates, and retrieves memories—and why understanding memory systems matters for trauma, dementia, and learning.',
    '/images/articles/cat23/cover-010.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-011: The Brain\''s Reward System: Dopamine, Motivation, and Addic
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Brain\''s Reward System: Dopamine, Motivation, and Addiction',
    'reward-system-dopamine-addiction',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['dopamine', 'reward system', 'nucleus accumbens', 'ventral tegmental area', 'addiction'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-011',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand how dopamine and the brain''s reward system drive motivation, pleasure, and addiction—and why dysfunction in this circuit underlies depression, ADHD, and substance use.',
    '/images/articles/cat23/cover-011.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-012: The Default Mode Network: The Brain\''s Wandering Mind
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Default Mode Network: The Brain\''s Wandering Mind',
    'default-mode-network',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['default mode network', 'DMN', 'mind-wandering', 'self-referential thinking', 'rumination'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-012',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn about the default mode network—the brain system active during rest, daydreaming, and self-reflection—and why its dysregulation underlies depression, anxiety, and ADHD.',
    '/images/articles/cat23/cover-012.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-013: The Amygdala and Emotional Processing: The Brain\''s Threat 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Amygdala and Emotional Processing: The Brain\''s Threat Detector',
    'amygdala-emotional-processing',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['amygdala', 'emotional processing', 'fear conditioning', 'anxiety', 'PTSD'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-013',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover how the amygdala processes fear, threat, and emotion—and why understanding this brain structure is key to treating anxiety, PTSD, and phobias.',
    '/images/articles/cat23/cover-013.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-014: Chronic Pain and the Brain: When Pain Becomes a Brain Disord
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Chronic Pain and the Brain: When Pain Becomes a Brain Disorder',
    'chronic-pain-brain',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['chronic pain', 'neuroplasticity', 'pain processing', 'central sensitization', 'fibromyalgia'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-014',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand how chronic pain rewires the brain—and why treating long-term pain requires addressing brain changes, not just body damage.',
    '/images/articles/cat23/cover-014.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-015: Psychedelics and the Brain: How Hallucinogens Change Neural 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Psychedelics and the Brain: How Hallucinogens Change Neural Circuits',
    'psychedelics-brain',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['psychedelics', 'psilocybin', 'LSD', 'DMT', 'MDMA'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-015',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore how psychedelics like psilocybin and LSD alter brain connectivity, dissolve the ego, and show promise for treating depression, PTSD, and addiction.',
    '/images/articles/cat23/cover-015.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-016: Brain Stimulation Therapies: TMS, ECT, and the Future of Tre
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Brain Stimulation Therapies: TMS, ECT, and the Future of Treatment',
    'brain-stimulation-therapies',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['TMS', 'transcranial magnetic stimulation', 'ECT', 'electroconvulsive therapy', 'brain stimulation'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-016',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore brain stimulation therapies—TMS, ECT, tDCS, DBS—that directly modulate neural activity to treat depression, OCD, and other psychiatric conditions.',
    '/images/articles/cat23/cover-016.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-017: The Social Brain: Mirror Neurons, Empathy, and How We Unders
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Social Brain: Mirror Neurons, Empathy, and How We Understand Others',
    'social-brain-mirror-neurons',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['social brain', 'mirror neurons', 'empathy', 'theory of mind', 'mentalizing'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-017',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover how mirror neurons and the social brain enable empathy, perspective-taking, and social understanding—and what happens when these systems dysfunction.',
    '/images/articles/cat23/cover-017.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-018: Hemispheric Lateralization: The Truth About Left Brain/Right
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Hemispheric Lateralization: The Truth About Left Brain/Right Brain',
    'hemispheric-lateralization-left-brain-right-brain',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['hemispheric lateralization', 'left brain right brain', 'split-brain research', 'corpus callosum', 'language lateralization'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-018',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Separating fact from fiction: what science actually shows about left and right brain hemispheres, and why you''re not ''left-brained'' or ''right-brained.''',
    '/images/articles/cat23/cover-018.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-019: Neurogenesis: How the Adult Brain Grows New Neurons
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Neurogenesis: How the Adult Brain Grows New Neurons',
    'neurogenesis-adult-brain',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['neurogenesis', 'adult neurogenesis', 'hippocampus', 'dentate gyrus', 'neural stem cells'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-019',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The adult brain can grow new neurons—discover how neurogenesis works, what promotes or inhibits it, and its role in learning, memory, and depression.',
    '/images/articles/cat23/cover-019.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-020: Brain Aging and Cognitive Decline: What\''s Normal, What\''s
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Brain Aging and Cognitive Decline: What\''s Normal, What\''s Not',
    'brain-aging-cognitive-decline',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['brain aging', 'cognitive decline', 'mild cognitive impairment', 'dementia', 'Alzheimer\'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-020',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand what''s normal brain aging vs. early dementia, how cognitive reserve protects the brain, and what lifestyle factors slow cognitive decline.',
    '/images/articles/cat23/cover-020.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-021: Traumatic Brain Injury and Mental Health: The Hidden Afterma
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Traumatic Brain Injury and Mental Health: The Hidden Aftermath',
    'traumatic-brain-injury-mental-health',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['traumatic brain injury', 'TBI', 'concussion', 'post-concussion syndrome', 'chronic traumatic encephalopathy'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-021',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Traumatic brain injury can cause lasting cognitive, emotional, and behavioral changes—understand the mental health consequences of TBI and the path to recovery.',
    '/images/articles/cat23/cover-021.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-022: Hormones and the Brain: How Chemical Messengers Shape Mood, 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Hormones and the Brain: How Chemical Messengers Shape Mood, Memory, and Behavior',
    'hormones-brain-mental-health',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['hormones and brain', 'estrogen and mood', 'testosterone and behavior', 'cortisol and stress', 'oxytocin and bonding'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-022',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Hormones like estrogen, testosterone, cortisol, and oxytocin profoundly affect brain function—discover how hormonal changes shape mood, memory, and mental health.',
    '/images/articles/cat23/cover-022.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-023: Circadian Rhythms and Mental Health: Your Brain\''s Internal
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Circadian Rhythms and Mental Health: Your Brain\''s Internal Clock',
    'circadian-rhythms-mental-health',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['circadian rhythms', 'biological clock', 'suprachiasmatic nucleus', 'sleep-wake cycle', 'seasonal affective disorder'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-023',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Your brain''s circadian clock regulates sleep, mood, and cognition—disrupted rhythms contribute to depression, bipolar disorder, and cognitive impairment.',
    '/images/articles/cat23/cover-023.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-024: The Vagus Nerve and Mental Health: The Brain-Body Connection
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Vagus Nerve and Mental Health: The Brain-Body Connection',
    'vagus-nerve-mental-health',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['vagus nerve', 'vagal tone', 'heart rate variability', 'HRV', 'polyvagal theory'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-024',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The vagus nerve links your brain and body—low vagal tone is associated with depression, anxiety, and inflammation. Learn how to strengthen it.',
    '/images/articles/cat23/cover-024.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-025: Exercise and the Brain: How Physical Activity Reshapes Your 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Exercise and the Brain: How Physical Activity Reshapes Your Mind',
    'exercise-brain-mental-health',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['exercise and brain', 'BDNF', 'brain-derived neurotrophic factor', 'exercise and depression', 'exercise and anxiety'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-025',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Exercise is one of the most powerful interventions for brain health—discover how physical activity increases BDNF, grows the hippocampus, and treats depression.',
    '/images/articles/cat23/cover-025.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-026: Meditation and the Brain: How Mindfulness Physically Changes
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Meditation and the Brain: How Mindfulness Physically Changes Neural Structure',
    'meditation-brain-changes',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['meditation and brain', 'mindfulness neuroscience', 'brain structure meditation', 'prefrontal cortex', 'amygdala'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-026',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Meditation physically changes the brain—thickening the prefrontal cortex, shrinking the amygdala, and quieting the default mode network. Here''s what the science shows.',
    '/images/articles/cat23/cover-026.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-027: Nutrition and the Brain: How Diet Shapes Mental Health
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Nutrition and the Brain: How Diet Shapes Mental Health',
    'nutrition-brain-mental-health',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['nutrition and brain', 'diet and mental health', 'Mediterranean diet', 'omega-3 fatty acids', 'gut-brain axis'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-027',
    v_cat_id,
    v_sub_id,
    'drafted',
    'What you eat affects how you think and feel—discover the science of nutritional psychiatry and how diet impacts depression, anxiety, and brain health.',
    '/images/articles/cat23/cover-027.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-028: Neurofeedback: Training the Brain to Regulate Itself
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Neurofeedback: Training the Brain to Regulate Itself',
    'neurofeedback-brain-training',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['neurofeedback', 'EEG biofeedback', 'brain training', 'brainwave regulation', 'ADHD neurofeedback'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-028',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Neurofeedback uses real-time brain activity displays to teach self-regulation—learn what the science says about treating ADHD, anxiety, depression, and trauma.',
    '/images/articles/cat23/cover-028.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-029: The Neuroscience of Anxiety: Brain Circuits Behind Fear and 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Neuroscience of Anxiety: Brain Circuits Behind Fear and Worry',
    'neuroscience-anxiety-brain-circuits',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['anxiety neuroscience', 'brain circuits anxiety', 'amygdala fear', 'prefrontal cortex anxiety', 'BNST'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-029',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the brain circuits that produce anxiety—from the amygdala''s threat detection to the prefrontal cortex''s failed regulation—and how treatments rewire them.',
    '/images/articles/cat23/cover-029.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-030: The Neuroscience of Depression: What Brain Science Reveals A
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Neuroscience of Depression: What Brain Science Reveals About the Disorder',
    'neuroscience-depression-brain',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['depression neuroscience', 'brain circuits depression', 'serotonin hypothesis', 'chemical imbalance myth', 'prefrontal cortex depression'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-030',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Depression isn''t just a chemical imbalance—it involves network dysfunction, inflammation, neuroplasticity failures, and circuit-level changes across the brain.',
    '/images/articles/cat23/cover-030.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-031: The Neuroscience of OCD: When the Brain\''s Error Detection 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Neuroscience of OCD: When the Brain\''s Error Detection System Gets Stuck',
    'neuroscience-ocd-brain-circuits',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['OCD neuroscience', 'brain circuits OCD', 'cortico-striato-thalamo-cortical', 'CSTC circuit', 'error detection'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-031',
    v_cat_id,
    v_sub_id,
    'drafted',
    'OCD involves a specific brain circuit malfunction—the error detection system gets stuck, creating persistent doubt and compulsive behavior. Here''s the neuroscience.',
    '/images/articles/cat23/cover-031.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-032: The Neuroscience of Schizophrenia: Disconnected Circuits and
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Neuroscience of Schizophrenia: Disconnected Circuits and Altered Reality',
    'neuroscience-schizophrenia-brain',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['schizophrenia neuroscience', 'dopamine hypothesis', 'glutamate schizophrenia', 'prefrontal cortex schizophrenia', 'gray matter loss'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-032',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Schizophrenia involves disconnected brain circuits, dopamine dysregulation, and progressive gray matter loss—not a ''split personality.'' Here''s what neuroscience reveals.',
    '/images/articles/cat23/cover-032.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-033: The Neuroscience of Bipolar Disorder: A Brain That Can\''t F
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Neuroscience of Bipolar Disorder: A Brain That Can\''t Find Its Balance',
    'neuroscience-bipolar-disorder-brain',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['bipolar disorder neuroscience', 'bipolar brain changes', 'mania brain', 'prefrontal cortex bipolar', 'amygdala bipolar'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-033',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Bipolar disorder involves a brain that can''t regulate its own activity—prefrontal-limbic disconnection, circadian instability, and progressive changes. Here''s the neuroscience.',
    '/images/articles/cat23/cover-033.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-034: The Neuroscience of ADHD: A Brain Wired for Now, Not Later
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Neuroscience of ADHD: A Brain Wired for Now, Not Later',
    'neuroscience-adhd-brain',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['ADHD neuroscience', 'ADHD brain differences', 'dopamine ADHD', 'prefrontal cortex ADHD', 'executive function ADHD'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-034',
    v_cat_id,
    v_sub_id,
    'drafted',
    'ADHD isn''t laziness or poor parenting—it''s a brain development difference involving delayed cortical maturation, dopamine deficiency, and executive function circuits. Here''s the neuroscience.',
    '/images/articles/cat23/cover-034.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-035: The Neuroscience of Autism: Different Wiring, Not Defective 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Neuroscience of Autism: Different Wiring, Not Defective Wiring',
    'neuroscience-autism-brain-differences',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['autism neuroscience', 'autism brain differences', 'connectivity autism', 'sensory processing autism', 'social brain autism'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-035',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Autism involves fundamentally different brain connectivity—more local processing, less long-range integration, altered sensory filtering, and different social brain development. Here''s what neuroscience reveals.',
    '/images/articles/cat23/cover-035.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-036: The Neuroscience of Consciousness: How the Brain Creates Sub
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Neuroscience of Consciousness: How the Brain Creates Subjective Experience',
    'consciousness-neuroscience',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['consciousness neuroscience', 'neural correlates of consciousness', 'global workspace theory', 'integrated information theory', 'thalamo-cortical circuits'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-036',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Consciousness—your subjective experience of being you—emerges from specific brain circuits. Here''s what neuroscience knows about how the brain creates awareness.',
    '/images/articles/cat23/cover-036.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-037: Music and the Brain: Why Sound Moves Us More Than Any Other 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Music and the Brain: Why Sound Moves Us More Than Any Other Stimulus',
    'music-and-the-brain',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['music neuroscience', 'music and brain', 'dopamine music', 'music therapy brain', 'auditory cortex'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-037',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Music engages more brain regions simultaneously than any other human activity—activating emotion, memory, motor, and reward circuits. Here''s why sound moves us so deeply.',
    '/images/articles/cat23/cover-037.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-038: The Neuroscience of Addiction: How Substances Hijack the Bra
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Neuroscience of Addiction: How Substances Hijack the Brain\''s Learning System',
    'addiction-brain-plasticity',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['addiction neuroscience', 'dopamine addiction', 'reward circuit hijacking', 'tolerance brain changes', 'prefrontal cortex addiction'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-038',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Addiction rewires the brain''s reward and learning systems—creating compulsive drug-seeking despite devastating consequences. Here''s the neuroscience of how it happens and how recovery works.',
    '/images/articles/cat23/cover-038.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-039: Alcohol and the Brain: From Social Lubricant to Neurotoxin
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Alcohol and the Brain: From Social Lubricant to Neurotoxin',
    'alcohol-effects-on-brain',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['alcohol brain damage', 'alcohol neurotoxicity', 'GABA alcohol', 'glutamate alcohol', 'Wernicke-Korsakoff syndrome'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-039',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Alcohol is the most neurotoxic commonly used substance—damaging white matter, shrinking the hippocampus and prefrontal cortex, and causing brain changes that persist for months. Here''s the full neuroscience.',
    '/images/articles/cat23/cover-039.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-040: The Neuroscience of Placebo and Nocebo: How Expectation Phys
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Neuroscience of Placebo and Nocebo: How Expectation Physically Changes the Brain',
    'placebo-nocebo-neuroscience',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['placebo effect neuroscience', 'nocebo effect', 'endogenous opioids', 'dopamine placebo', 'expectation brain'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-040',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Placebo isn''t ''just in your head''—it activates real opioid, dopamine, and cannabinoid systems in the brain. Nocebo expectations create real pain. Here''s the neuroscience of belief and biology.',
    '/images/articles/cat23/cover-040.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-041: Social Media and the Brain: How Digital Platforms Exploit Ne
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Social Media and the Brain: How Digital Platforms Exploit Neural Reward Circuits',
    'social-media-brain-effects',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['social media brain', 'dopamine social media', 'social comparison brain', 'attention fragmentation', 'adolescent brain social media'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-041',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Social media platforms are engineered to exploit the brain''s dopamine, social comparison, and variable reward systems. Here''s the neuroscience of why you can''t stop scrolling.',
    '/images/articles/cat23/cover-041.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-042: Language and the Brain: How Neural Networks Create Meaning F
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Language and the Brain: How Neural Networks Create Meaning From Sound',
    'language-brain-processing',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['language neuroscience', 'Broca\', ', ', 's area', 'aphasia'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-042',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Language is the brain''s most complex cognitive achievement—involving distributed networks for production, comprehension, and inner speech. Here''s how it works and what happens when it breaks.',
    '/images/articles/cat23/cover-042.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-043: Interoception: How the Brain Reads the Body and Why It Matte
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Interoception: How the Brain Reads the Body and Why It Matters for Mental Health',
    'interoception-body-brain-connection',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['interoception', 'body awareness brain', 'insula cortex', 'heartbeat perception', 'anxiety interoception'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-043',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Interoception—the brain''s ability to sense the body''s internal state—shapes emotion, decision-making, and mental health. Disrupted interoception underlies anxiety, depression, eating disorders, and more.',
    '/images/articles/cat23/cover-043.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-044: Dementia Types: How Different Diseases Destroy Different Bra
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Dementia Types: How Different Diseases Destroy Different Brain Circuits',
    'dementia-types-brain-changes',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['dementia types', 'Alzheimer\', ', ', ', ', ', '],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-044',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Different dementias destroy different brain regions through different mechanisms—producing very different symptoms. Here''s how Alzheimer''s, Lewy body, frontotemporal, and vascular dementias work.',
    '/images/articles/cat23/cover-044.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-045: The Endocannabinoid System: The Brain\''s Built-In Cannabis-
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Endocannabinoid System: The Brain\''s Built-In Cannabis-Like Network',
    'endocannabinoid-system-mental-health',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['endocannabinoid system', 'anandamide', '2-AG', 'CB1 receptors', 'cannabis brain effects'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-045',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Your brain has a built-in cannabis-like system—the endocannabinoid system—that regulates stress, mood, pain, appetite, and neuroplasticity. Here''s how it works and why it matters.',
    '/images/articles/cat23/cover-045.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-046: Sex, Gender, and the Brain: What Neuroscience Actually Shows
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Sex, Gender, and the Brain: What Neuroscience Actually Shows',
    'brain-sex-gender-differences',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['brain sex differences', 'gender brain', 'mosaic brain', 'hormones brain structure', 'testosterone brain'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-046',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Are ''male'' and ''female'' brains truly different? Neuroscience shows brains are mosaics—not two types—but sex hormones do shape circuits relevant to mental health. Here''s the nuanced evidence.',
    '/images/articles/cat23/cover-046.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-047: Sleep Disorders and the Brain: When the Night Shift Goes Wro
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Sleep Disorders and the Brain: When the Night Shift Goes Wrong',
    'sleep-disorders-brain',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['sleep disorders brain', 'insomnia neuroscience', 'sleep apnea brain damage', 'narcolepsy orexin', 'restless legs syndrome'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-047',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Sleep disorders aren''t just annoyances—they involve specific brain circuit dysfunctions that damage cognition, mood, and long-term brain health. Here''s the neuroscience of when sleep breaks.',
    '/images/articles/cat23/cover-047.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-048: Brain-Computer Interfaces: The Future of Reading and Modulat
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Brain-Computer Interfaces: The Future of Reading and Modulating the Mind',
    'brain-computer-interfaces-mental-health',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['brain-computer interfaces', 'BCI mental health', 'neural implants', 'neurofeedback BCI', 'deep brain stimulation'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-048',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Brain-computer interfaces are moving from science fiction to clinical reality. Here''s how BCIs read neural signals, modulate brain circuits, and may transform mental health treatment.',
    '/images/articles/cat23/cover-048.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-049: Nicotine and the Brain: Why It Hooks So Fast and Holds So Ti
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Nicotine and the Brain: Why It Hooks So Fast and Holds So Tight',
    'nicotine-and-the-brain',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['nicotine brain effects', 'nicotinic acetylcholine receptors', 'nicotine addiction neuroscience', 'smoking mental health', 'nicotine dopamine'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-049',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Nicotine is one of the most addictive substances known—not because of what it does, but because of how perfectly it hijacks the brain''s acetylcholine and dopamine systems. Here''s the neuroscience.',
    '/images/articles/cat23/cover-049.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-050: Caffeine and the Brain: The World\''s Most Popular Psychoact
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Caffeine and the Brain: The World\''s Most Popular Psychoactive Drug',
    'caffeine-and-the-brain',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['caffeine brain effects', 'adenosine receptors', 'caffeine anxiety', 'caffeine dependence', 'coffee neuroscience'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-050',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Caffeine is consumed by 85% of Americans daily. It works by blocking adenosine receptors—preventing the brain''s ''tiredness'' signal. Here''s the full neuroscience of caffeine and mental health.',
    '/images/articles/cat23/cover-050.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-051: How the Brain Learns: The Neuroscience of Memory, Skill, and
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How the Brain Learns: The Neuroscience of Memory, Skill, and Adaptation',
    'how-the-brain-learns',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['learning neuroscience', 'long-term potentiation', 'synaptic plasticity', 'memory consolidation', 'Hebbian learning'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-051',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learning physically changes the brain—strengthening synapses, growing dendrites, and building new circuits. Here''s the neuroscience of how learning actually works and why it matters for mental health.',
    '/images/articles/cat23/cover-051.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-052: Neurological vs. Psychiatric: Why the Distinction Is Outdate
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Neurological vs. Psychiatric: Why the Distinction Is Outdated and Harmful',
    'neurological-vs-psychiatric-disorders',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['neurological vs psychiatric', 'mind-brain problem', 'psychiatric stigma', 'brain disorders classification', 'functional neurological disorder'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-052',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The division between ''neurological'' and ''psychiatric'' disorders is a historical accident—not a scientific one. Both are brain disorders. Here''s why the distinction persists and why it matters.',
    '/images/articles/cat23/cover-052.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-053: ECT and Modern Brain Stimulation: Beyond the Stigma, Inside 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'ECT and Modern Brain Stimulation: Beyond the Stigma, Inside the Science',
    'ect-modern-brain-stimulation',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['ECT electroconvulsive therapy', 'brain stimulation therapy', 'TMS transcranial magnetic stimulation', 'ketamine depression', 'modern ECT'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-053',
    v_cat_id,
    v_sub_id,
    'drafted',
    'ECT remains the most effective treatment for severe depression—yet stigma prevents millions from accessing it. Here''s the modern neuroscience of electroconvulsive therapy and newer brain stimulation treatments.',
    '/images/articles/cat23/cover-053.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-054: Creativity and the Brain: The Neuroscience of Original Thoug
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Creativity and the Brain: The Neuroscience of Original Thought',
    'creativity-and-the-brain',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['creativity neuroscience', 'creative brain', 'default mode network creativity', 'divergent thinking brain', 'insight neuroscience'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-054',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Creativity isn''t mystical—it''s neuroscience. Original thought requires dynamic interaction between three brain networks. Here''s how the creative brain works and why it matters for mental health.',
    '/images/articles/cat23/cover-054.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-055: PTSD and the Brain: How Trauma Rewires Neural Circuits
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'PTSD and the Brain: How Trauma Rewires Neural Circuits',
    'ptsd-brain-changes',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['PTSD brain changes', 'trauma neuroscience', 'amygdala PTSD', 'hippocampus trauma', 'prefrontal cortex PTSD'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-055',
    v_cat_id,
    v_sub_id,
    'drafted',
    'PTSD involves measurable brain changes—a hyperactive amygdala, shrunken hippocampus, and weakened prefrontal cortex. Here''s how trauma rewires the brain and how treatment can rewire it back.',
    '/images/articles/cat23/cover-055.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-056: Eating Disorders and the Brain: The Neuroscience of Anorexia
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Eating Disorders and the Brain: The Neuroscience of Anorexia, Bulimia, and Binge Eating',
    'eating-disorders-neuroscience',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['eating disorders brain', 'anorexia neuroscience', 'bulimia brain', 'binge eating disorder neuroscience', 'reward circuitry eating disorders'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-056',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Eating disorders aren''t about vanity or willpower—they involve specific brain circuit dysfunction in reward processing, interoception, and cognitive flexibility. Here''s the neuroscience.',
    '/images/articles/cat23/cover-056.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-057: Personality Disorders and the Brain: The Neuroscience of End
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Personality Disorders and the Brain: The Neuroscience of Enduring Patterns',
    'personality-disorders-neuroscience',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['personality disorders brain', 'borderline personality neuroscience', 'antisocial personality brain', 'narcissistic personality neuroscience', 'amygdala personality disorders'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-057',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Personality disorders involve measurable brain differences in emotional regulation, social cognition, and impulse control. Here''s the neuroscience behind BPD, ASPD, and other enduring patterns.',
    '/images/articles/cat23/cover-057.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-058: Brain Development Across the Lifespan: From Womb to Wisdom
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Brain Development Across the Lifespan: From Womb to Wisdom',
    'brain-development-across-lifespan',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['brain development lifespan', 'prenatal brain development', 'adolescent brain maturation', 'prefrontal cortex development', 'synaptic pruning'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-058',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The brain develops from prenatal life through old age, with different systems maturing at different rates. Understanding this trajectory explains vulnerability windows for mental illness and resilience.',
    '/images/articles/cat23/cover-058.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-059: Epigenetics and Transgenerational Trauma: How Experience Mar
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Epigenetics and Transgenerational Trauma: How Experience Marks the Genome',
    'epigenetics-transgenerational-trauma',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['epigenetics mental health', 'transgenerational trauma', 'DNA methylation', 'histone modification', 'childhood adversity epigenetics'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-059',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Your genes don''t change—but the way they''re expressed does. Epigenetics reveals how trauma, stress, and adversity alter gene expression across generations, shaping mental health risk.',
    '/images/articles/cat23/cover-059.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-060: Pain and the Brain: Why It Hurts More Than It Should—and Som
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Pain and the Brain: Why It Hurts More Than It Should—and Sometimes When Nothing\''s Wrong',
    'pain-neuroscience',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['pain neuroscience', 'central sensitization', 'chronic pain brain', 'nociception', 'pain catastrophizing'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-060',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Pain is produced by the brain—not simply detected by it. Understanding pain neuroscience transforms chronic pain from an unsolvable mystery into a brain-based condition with real treatment options.',
    '/images/articles/cat23/cover-060.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-061: Stroke Recovery and the Brain: How Neuroplasticity Rebuilds 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Stroke Recovery and the Brain: How Neuroplasticity Rebuilds What Damage Destroys',
    'stroke-recovery-neuroplasticity',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['stroke recovery brain', 'neuroplasticity stroke', 'brain reorganization', 'stroke rehabilitation', 'post-stroke depression'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-061',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Stroke destroys brain tissue in minutes—but recovery can continue for years through neuroplasticity. Here''s how the brain reorganizes after stroke and why mental health is central to rehabilitation.',
    '/images/articles/cat23/cover-061.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-062: Loneliness and the Brain: The Neuroscience of Social Disconn
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Loneliness and the Brain: The Neuroscience of Social Disconnection',
    'loneliness-and-the-brain',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['loneliness brain', 'social isolation neuroscience', 'loneliness health effects', 'social brain', 'loneliness inflammation'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-062',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Loneliness isn''t just emotional pain—it''s a brain state that increases inflammation, impairs cognition, and raises mortality risk as much as smoking 15 cigarettes a day. Here''s the neuroscience.',
    '/images/articles/cat23/cover-062.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-063: Trauma and the Developing Brain: How Childhood Adversity Res
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Trauma and the Developing Brain: How Childhood Adversity Reshapes Neural Architecture',
    'trauma-developing-brain',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['childhood trauma brain', 'ACEs brain development', 'adverse childhood experiences', 'toxic stress brain', 'neglect brain development'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-063',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Childhood trauma physically reshapes the developing brain—accelerating threat detection, impairing executive function, and altering stress biology. Here''s the neuroscience and the path to resilience.',
    '/images/articles/cat23/cover-063.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-064: Hoarding, BDD, and the OCD Spectrum: When the Brain Gets Stu
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Hoarding, BDD, and the OCD Spectrum: When the Brain Gets Stuck on Loop',
    'hoarding-bdd-ocd-spectrum',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['OCD spectrum disorders', 'hoarding disorder brain', 'body dysmorphic disorder neuroscience', 'compulsive behavior brain', 'CSTC circuit'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-064',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Hoarding, body dysmorphic disorder, trichotillomania, and excoriation disorder share neural circuit dysfunction with OCD. Here''s the neuroscience of the obsessive-compulsive spectrum.',
    '/images/articles/cat23/cover-064.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT23-065: The Future of Neuroscience and Mental Health: What\''s Comin
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Future of Neuroscience and Mental Health: What\''s Coming and What It Means',
    'future-neuroscience-mental-health',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['future neuroscience', 'precision psychiatry', 'psychedelic medicine', 'optogenetics', 'connectomics'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-065',
    v_cat_id,
    v_sub_id,
    'drafted',
    'From precision psychiatry to brain organoids—the next decade of neuroscience will transform mental health treatment. Here''s what''s coming, what''s hype, and what it means for people who struggle.',
    '/images/articles/cat23/cover-065.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'brain-fundamentals' AND category_id = v_cat_id;

  -- CAT23-066: Neuroplasticity: How Your Brain Changes Throughout Life
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Neuroplasticity: How Your Brain Changes Throughout Life',
    'neuroplasticity-basics',
    'draft',
    'Brain, Neuroscience & Biological Basis',
    ARRAY['neuroplasticity', 'brain plasticity', 'brain change', 'neural plasticity', 'neuroplasticity mental health'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT23-066',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore neuroplasticity—how brain changes throughout life, mechanisms of synaptic plasticity and neurogenesis, implications for mental health recovery, and evidence-based strategies to harness brain''s adaptive capacity.',
    '/images/articles/cat23/cover-066.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

END $$;

-- Category 24: creativity-therapeutic-arts (64 articles)
DO $$
DECLARE
  v_cat_id UUID;
  v_sub_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'creativity-therapeutic-arts';

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'clinical-creative-interventions' AND category_id = v_cat_id;

  -- CAT24-001: Art Therapy: How Creating Art Supports Healing and Recovery
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Art Therapy: How Creating Art Supports Healing and Recovery',
    'art-therapy',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['art therapy', 'creative arts therapy', 'art therapist', 'therapeutic art', 'trauma therapy'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-001',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover how art therapy works as a clinical mental health treatment. Learn what happens in art therapy sessions, the evidence base for effectiveness, and how trained art therapists help people process trauma, regulate emotions, and build resilience through creative expression.',
    '/images/articles/cat24/cover-001.svg',
    5,
    false,
    true,
    NULL,
    TRUE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT24-002: Music Therapy: How Rhythm, Melody, and Sound Support Mental 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Music Therapy: How Rhythm, Melody, and Sound Support Mental Health',
    'music-therapy',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['music therapy', 'music therapist', 'therapeutic music', 'neurologic music therapy', 'mental health music'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-002',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore how music therapy works as an evidence-based mental health treatment. Learn what music therapists do, the neuroscience behind musical healing, effectiveness for trauma, depression, dementia, and autism, and what to expect in music therapy sessions.',
    '/images/articles/cat24/cover-002.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT24-003: Dance/Movement Therapy: Healing Through the Body in Motion
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Dance/Movement Therapy: Healing Through the Body in Motion',
    'dance-movement-therapy',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['dance therapy', 'movement therapy', 'dance movement psychotherapy', 'somatic therapy', 'body-based therapy'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-003',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover how dance/movement therapy uses the body-mind connection to support mental health. Learn the science behind movement therapy, effectiveness for trauma, depression, and anxiety, and what to expect in DMT sessions with trained dance/movement therapists.',
    '/images/articles/cat24/cover-003.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT24-004: Writing Therapy and Therapeutic Journaling: Processing Emoti
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Writing Therapy and Therapeutic Journaling: Processing Emotion Through Words',
    'writing-therapy-journaling',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['writing therapy', 'expressive writing', 'therapeutic journaling', 'writing for healing', 'journal therapy'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-004',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover how writing therapy and expressive journaling support mental health. Learn the science behind writing for healing, Pennebaker''s expressive writing protocol, effectiveness for trauma and emotional regulation, and evidence-based journaling techniques.',
    '/images/articles/cat24/cover-004.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT24-005: Drama Therapy: Healing Through Role-Play, Storytelling, and 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Drama Therapy: Healing Through Role-Play, Storytelling, and Performance',
    'drama-therapy',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['drama therapy', 'psychodrama', 'role-play therapy', 'theater therapy', 'performative therapy'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-005',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore drama therapy—using theater, role-play, improvisation, and storytelling for mental health. Learn how trained drama therapists help people process trauma, practice new behaviors, and explore identity through structured dramatic experiences.',
    '/images/articles/cat24/cover-005.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'creative-modalities-and-practices' AND category_id = v_cat_id;

  -- CAT24-006: Maker Culture and the Psychology of Craft: Why Making Things
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Maker Culture and the Psychology of Craft: Why Making Things by Hand Matters',
    'maker-culture-craft',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['maker culture', 'craft psychology', 'knitting mental health', 'woodworking therapy', 'ceramics therapy'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-006',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the psychology of maker culture and craft—why making things by hand (knitting, woodworking, ceramics) supports mental health, the cognitive and emotional benefits of tactile creativity, and how the maker movement counters digital overwhelm.',
    '/images/articles/cat24/cover-006.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT24-007: Photography as Creative Expression: The Psychology of Seeing
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Photography as Creative Expression: The Psychology of Seeing and Capturing',
    'photography-creative-expression',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['photography therapy', 'creative photography', 'visual storytelling', 'mindful photography', 'therapeutic photography'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-007',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore photography as creative expression and mental health tool—how taking photos trains attention, supports mindfulness, builds visual literacy, processes emotion, and makes creativity accessible through smartphones we already carry.',
    '/images/articles/cat24/cover-007.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT24-008: Digital Creativity: How Technology Reshapes Artistic Express
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Digital Creativity: How Technology Reshapes Artistic Expression',
    'digital-creativity-technology',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['digital art', 'creative technology', 'digital creativity', 'creative software', 'generative art'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-008',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore how digital tools reshape creativity—democratizing art-making through accessible software, enabling new forms impossible with physical media, and raising questions about authenticity, AI, and what counts as ''real'' art.',
    '/images/articles/cat24/cover-008.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT24-009: Gardening as Creative Practice: Cultivating Beauty and Wellb
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Gardening as Creative Practice: Cultivating Beauty and Wellbeing',
    'gardening-creative-practice',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['gardening mental health', 'horticultural therapy', 'therapeutic gardening', 'gardening creativity', 'nature connection'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-009',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore gardening as creative practice and mental health tool—how cultivating plants reduces stress, supports mindfulness, provides creative expression, and connects us to natural cycles of growth, patience, and impermanence.',
    '/images/articles/cat24/cover-009.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT24-010: Cooking as Creative Expression: The Psychology of Making Foo
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Cooking as Creative Expression: The Psychology of Making Food',
    'cooking-creative-expression',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['cooking therapy', 'culinary creativity', 'baking mental health', 'cooking mindfulness', 'food psychology'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-010',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore cooking as creative practice and mental health tool—how making food engages senses, supports mindfulness, expresses care and culture, and why cooking (especially baking) provides therapeutic benefits for anxiety, depression, and connection.',
    '/images/articles/cat24/cover-010.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT24-011: Music Making for Non-Musicians: The Joy of Amateur Music
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Music Making for Non-Musicians: The Joy of Amateur Music',
    'amateur-music-making',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['amateur music', 'music making wellbeing', 'singing mental health', 'learning instrument', 'community music'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-011',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore amateur music-making for mental health and joy—why making music (not just consuming it) supports wellbeing, how to start playing or singing without performance pressure, and the benefits of community music.',
    '/images/articles/cat24/cover-011.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT24-012: Dance as Joy and Connection: Moving for Pleasure, Not Perfor
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Dance as Joy and Connection: Moving for Pleasure, Not Performance',
    'dance-recreational-social',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['social dance', 'recreational dance', 'dance wellbeing', 'dance joy', 'dancing mental health'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-012',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore recreational and social dance for mental health and joy—why moving your body to music (without performance pressure) supports wellbeing, builds connection, and provides embodied creative expression accessible to everyone.',
    '/images/articles/cat24/cover-012.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT24-013: Creative Writing as Practice: Why Everyone Can (and Should) 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Creative Writing as Practice: Why Everyone Can (and Should) Write',
    'creative-writing-practice',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['creative writing', 'writing practice', 'fiction writing', 'poetry writing', 'storytelling'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-013',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore creative writing as mental health practice—how crafting stories, poems, and narratives supports emotional processing, identity exploration, and wellbeing, whether or not you ever publish or share.',
    '/images/articles/cat24/cover-013.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT24-014: Creativity and Aging: How Creative Expression Evolves Across
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Creativity and Aging: How Creative Expression Evolves Across the Lifespan',
    'creativity-and-aging',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['creativity aging', 'older adults creativity', 'late-life creativity', 'creative aging', 'aging artists'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-014',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore how creativity evolves with age—why the belief that creativity declines is wrong, how older adults create differently (not worse), and why creative practice becomes more important, not less, in later life.',
    '/images/articles/cat24/cover-014.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT24-015: Creative Recovery: How Art-Making Supports Trauma Healing
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Creative Recovery: How Art-Making Supports Trauma Healing',
    'creativity-trauma-recovery',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['trauma creativity', 'art therapy trauma', 'PTSD creativity', 'creative healing', 'trauma recovery art'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-015',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore how creative expression supports trauma recovery—why art, music, movement, and writing help process experiences that words alone can''t reach, and how to use creativity safely in healing work.',
    '/images/articles/cat24/cover-015.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT24-016: Performance Art: Embodied Expression and the Psychology of P
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Performance Art: Embodied Expression and the Psychology of Public Vulnerability',
    'performance-art-mental-health',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['performance art', 'embodied art', 'public vulnerability', 'art and body', 'conceptual performance'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-016',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore performance art as radical vulnerability—how using your body as artistic medium, performing for witnesses, and creating ephemeral live work engages unique psychological dimensions of identity, presence, and courage.',
    '/images/articles/cat24/cover-016.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT24-017: Improvisation: The Psychology of Creating Without a Plan
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Improvisation: The Psychology of Creating Without a Plan',
    'improvisation-psychology',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['improvisation', 'improv comedy', 'jazz improvisation', 'spontaneity', 'creative spontaneity'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-017',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore improvisation—creating without planning—as mental health practice. How spontaneous music, theater, and dance reduce anxiety, increase flexibility, and teach profound lessons about control, failure, and trust.',
    '/images/articles/cat24/cover-017.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT24-018: Creativity Across Cultures: How Different Societies Value an
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Creativity Across Cultures: How Different Societies Value and Express Creativity',
    'creativity-across-cultures',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['cultural creativity', 'cross-cultural creativity', 'creativity culture', 'individualist collectivist creativity', 'cultural expression'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-018',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore how different cultures understand and practice creativity—from individualist innovation to collectivist harmony, and why recognizing cultural creativity differences matters for mental health and self-expression.',
    '/images/articles/cat24/cover-018.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT24-019: Creative Perfectionism: When the Pursuit of Excellence Preve
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Creative Perfectionism: When the Pursuit of Excellence Prevents Creation',
    'creative-perfectionism',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['creative perfectionism', 'perfectionism creativity', 'artist perfectionism', 'creative paralysis', 'perfectionism creative block'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-019',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore creative perfectionism—how the pursuit of flawless work prevents finishing, sharing, and enjoying creative practice. Learn to distinguish excellence from perfectionism and work with perfectionistic tendencies productively.',
    '/images/articles/cat24/cover-019.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT24-020: Creative Failure and Resilience: Learning From Rejection, Se
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Creative Failure and Resilience: Learning From Rejection, Setbacks, and \''Failed\'' Projects',
    'creative-failure-resilience',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['creative failure', 'creative resilience', 'rejection resilience', 'creative setbacks', 'failure learning'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-020',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore creative failure as inevitable and instructive—how professional creatives navigate rejection, ''failed'' projects, and setbacks while building resilience that supports both creative work and mental health.',
    '/images/articles/cat24/cover-020.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT24-021: Creative Entrepreneurship: Monetizing Your Work Without Losi
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Creative Entrepreneurship: Monetizing Your Work Without Losing Your Soul',
    'creative-entrepreneurship',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['creative entrepreneurship', 'monetizing creativity', 'creative business', 'artist entrepreneur', 'creative income'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-021',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore creative entrepreneurship—how to build sustainable income from creative work while maintaining artistic integrity, managing business stress, and protecting mental health in the gig economy.',
    '/images/articles/cat24/cover-021.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT24-022: Creativity and Technology: Digital Tools, AI Art, and the Fu
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Creativity and Technology: Digital Tools, AI Art, and the Future of Human Expression',
    'creativity-technology',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['creativity technology', 'digital creativity', 'AI art', 'creative tools', 'digital art'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-022',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore how technology shapes creativity—from digital tools expanding creative access to AI art raising existential questions about human expression, authorship, and what creativity means in technological age.',
    '/images/articles/cat24/cover-022.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT24-023: Creative Rituals and Routines: Building Sustainable Creative
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Creative Rituals and Routines: Building Sustainable Creative Practice',
    'creative-rituals-routines',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['creative rituals', 'creative routines', 'creative practice', 'creative habits', 'daily creative practice'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-023',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore creative rituals and routines—how consistent creative practice, supportive habits, and personalized workflows sustain long-term creative output while protecting mental health and preventing burnout.',
    '/images/articles/cat24/cover-023.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT24-024: Film and Video Making: Visual Storytelling as Creative Expre
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Film and Video Making: Visual Storytelling as Creative Expression and Mental Health Practice',
    'film-video-making',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['film making', 'video creation', 'visual storytelling', 'filmmaking mental health', 'video art'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-024',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore film and video making as creative expression—how visual storytelling, from professional cinema to smartphone videos, serves as powerful tool for self-expression, narrative control, and mental health.',
    '/images/articles/cat24/cover-024.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT24-025: Body Modification as Creative Expression: Tattoos, Piercings
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Body Modification as Creative Expression: Tattoos, Piercings, and Self-Authored Embodiment',
    'body-modification-expression',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['body modification', 'tattoos mental health', 'piercings', 'body art', 'tattoo psychology'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-025',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore body modification—tattoos, piercings, and other forms of body art—as creative expression and psychological practice, including trauma recovery, identity reclamation, and self-authored embodiment.',
    '/images/articles/cat24/cover-025.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT24-026: Fashion and Personal Style: Everyday Creativity Through Self
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Fashion and Personal Style: Everyday Creativity Through Self-Presentation',
    'fashion-personal-style',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['fashion mental health', 'personal style', 'clothing expression', 'fashion psychology', 'creative dress'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-026',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore fashion and personal style as daily creative practice—how clothing choices express identity, regulate emotions, support mental health, and serve as accessible creative outlet for self-expression.',
    '/images/articles/cat24/cover-026.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT24-027: Creativity and Disability: How Disabled Artists Navigate and
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Creativity and Disability: How Disabled Artists Navigate and Transform Creative Practice',
    'creativity-disability',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['disability creativity', 'disabled artists', 'accessible art', 'disability art', 'creative adaptation'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-027',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore disability and creativity—how disabled artists adapt creative practices, challenge ableist assumptions about art, and demonstrate that creativity flourishes regardless of physical or cognitive differences.',
    '/images/articles/cat24/cover-027.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT24-028: Creative Communities and Scenes: The Psychology of Belonging
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Creative Communities and Scenes: The Psychology of Belonging Through Shared Creative Practice',
    'creative-communities',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['creative communities', 'creative scenes', 'artist communities', 'creative belonging', 'creative collaboration'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-028',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore creative communities—how shared creative spaces, artistic scenes, and creative collectives provide belonging, support skill development, and serve as protective factor for mental health through social connection.',
    '/images/articles/cat24/cover-028.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT24-029: Teaching Creativity: How Sharing Creative Skills Deepens You
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Teaching Creativity: How Sharing Creative Skills Deepens Your Own Practice',
    'creative-teaching',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['teaching creativity', 'creative teaching', 'creative instruction', 'teaching art', 'creative pedagogy'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-029',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore teaching creativity—how instructing others in creative skills deepens your own understanding, supports community, provides income, and serves as powerful tool for mastery and mental health.',
    '/images/articles/cat24/cover-029.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT24-030: Creative Legacy: What We Leave Behind Through Our Creative W
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Creative Legacy: What We Leave Behind Through Our Creative Work',
    'creative-legacy',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['creative legacy', 'artistic legacy', 'creative impact', 'creative work meaning', 'creative mortality'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-030',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore creative legacy—how creative work outlives us, provides meaning in face of mortality, connects us to future, and offers psychological comfort through lasting contribution to culture and community.',
    '/images/articles/cat24/cover-030.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT24-031: Creative Courage and Vulnerability: The Psychological Braver
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Creative Courage and Vulnerability: The Psychological Bravery of Sharing Your Work',
    'creative-courage-vulnerability',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['creative courage', 'creative vulnerability', 'sharing creative work', 'creative bravery', 'creative fear'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-031',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore creative courage—why sharing creative work requires profound vulnerability, how fear of judgment blocks expression, and how building creative bravery supports both artistic growth and mental health.',
    '/images/articles/cat24/cover-031.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT24-032: Creative Rest and Fallow Periods: Why Doing Nothing Is Part 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Creative Rest and Fallow Periods: Why Doing Nothing Is Part of the Creative Process',
    'creative-rest-fallow',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['creative rest', 'fallow periods', 'creative recovery', 'creative burnout', 'creative break'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-032',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore creative rest and fallow periods—why taking breaks from creative work is essential for sustainable practice, how rest replenishes creativity, and distinguishing healthy rest from avoidance or burnout.',
    '/images/articles/cat24/cover-032.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT24-033: Creative Rejection and Resilience: How to Survive When Your 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Creative Rejection and Resilience: How to Survive When Your Work Gets Rejected',
    'creative-rejection-resilience',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['creative rejection', 'rejection resilience', 'creative failure', 'handling rejection', 'artist rejection'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-033',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore creative rejection—why rejection feels devastating, how to build resilience, distinguish rejection types, and develop coping strategies that sustain creative practice through inevitable disappointment.',
    '/images/articles/cat24/cover-033.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT24-034: Creative Jealousy and Comparison: The Toxic Side of the Crea
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Creative Jealousy and Comparison: The Toxic Side of the Creative Life',
    'creative-jealousy-comparison',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['creative jealousy', 'creative comparison', 'artistic envy', 'creative competition', 'jealousy mental health'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-034',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore creative jealousy—why comparing yourself to others poisons creative satisfaction, how social media amplifies comparison, and strategies for transforming jealousy into curiosity and creative motivation.',
    '/images/articles/cat24/cover-034.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT24-035: Creative Aging: How Creativity Changes (and Often Improves) 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Creative Aging: How Creativity Changes (and Often Improves) Across the Lifespan',
    'creative-aging',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['creative aging', 'creativity older adults', 'aging creativity', 'late-life creativity', 'elder creativity'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-035',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore creative aging—how creativity changes across lifespan, late-life creative flourishing, cognitive benefits of creative practice for older adults, and debunking myths about age-related creative decline.',
    '/images/articles/cat24/cover-035.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT24-036: Creativity in Prison and Incarceration: Expression, Resistan
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Creativity in Prison and Incarceration: Expression, Resistance, and Rehabilitation Behind Bars',
    'creativity-prison-incarceration',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['creativity in prison', 'incarceration art', 'prison education', 'creative rehabilitation', 'prison writing'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-036',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore creativity in prison settings—how creative expression provides dignity, meaning, and rehabilitation for incarcerated people, challenges of creating behind bars, and evidence for arts-based reentry programs.',
    '/images/articles/cat24/cover-036.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT24-037: Creativity and Dementia: How Creative Expression Persists Wh
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Creativity and Dementia: How Creative Expression Persists When Memory Fades',
    'creativity-dementia',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['creativity dementia', 'dementia art', 'Alzheimer\', ', ', ', '],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-037',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore creativity and dementia—how creative capacity persists despite memory loss, therapeutic benefits of arts for people with dementia, and how creative expression provides dignity, connection, and quality of life through cognitive decline.',
    '/images/articles/cat24/cover-037.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT24-038: Creativity and Chronic Illness: Creating When Your Body Does
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Creativity and Chronic Illness: Creating When Your Body Doesn\''t Cooperate',
    'creativity-chronic-illness',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['creativity chronic illness', 'chronic illness art', 'chronic pain creativity', 'disability creativity', 'illness creative expression'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-038',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore creativity with chronic illness—how people living with chronic pain, fatigue, and disability adapt creative practice, use creativity for coping and meaning-making, and navigate unique challenges of creating when body doesn''t cooperate.',
    '/images/articles/cat24/cover-038.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT24-039: Indigenous and Non-Western Creative Practices: Decolonizing 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Indigenous and Non-Western Creative Practices: Decolonizing Creativity and Honoring Cultural Traditions',
    'indigenous-non-western-creative-practices',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['indigenous creativity', 'non-western art', 'decolonizing creativity', 'cultural creative practices', 'traditional arts'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-039',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore Indigenous and non-Western creative practices—how cultural traditions approach creativity differently than Western individualism, healing functions of traditional arts, and decolonizing mental health through culturally-grounded creative expression.',
    '/images/articles/cat24/cover-039.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT24-040: Digital Art and NFTs: The Psychology of Creating, Collecting
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Digital Art and NFTs: The Psychology of Creating, Collecting, and Valuing Art in Digital Spaces',
    'digital-art-nfts',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['digital art', 'NFT art', 'crypto art', 'digital creativity', 'virtual art'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-040',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore digital art and NFTs—how digital creativity changes art-making, psychological implications of owning non-fungible tokens, mental health impacts of crypto art culture, and navigating digital creative economy''s opportunities and pitfalls.',
    '/images/articles/cat24/cover-040.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT24-041: Creativity and Neurodivergence: How ADHD, Autism, and Dyslex
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Creativity and Neurodivergence: How ADHD, Autism, and Dyslexia Shape Creative Expression',
    'creativity-neurodivergence',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['creativity neurodivergence', 'ADHD creativity', 'autism creativity', 'dyslexia creativity', 'neurodivergent art'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-041',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore creativity and neurodivergence—how ADHD, autism, and dyslexia influence creative strengths and challenges, neurodivergent creative patterns, and supporting neurodivergent artists'' mental health and sustainable practice.',
    '/images/articles/cat24/cover-041.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT24-042: The 10,000-Hour Rule and Deliberate Practice: What Research 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The 10,000-Hour Rule and Deliberate Practice: What Research Actually Says About Mastery',
    'ten-thousand-hour-rule',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['10000 hour rule', 'deliberate practice', 'creative mastery', 'skill development', 'practice creativity'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-042',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the 10,000-hour rule and deliberate practice—what research actually says about mastery, myths popularized by Malcolm Gladwell, and how to practice effectively for creative skill development without burnout.',
    '/images/articles/cat24/cover-042.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT24-043: Creative Procrastination: Understanding Why You Avoid Creati
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Creative Procrastination: Understanding Why You Avoid Creating (and How It\''s Different from Writer\''s Block)',
    'creative-procrastination',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['creative procrastination', 'procrastination psychology', 'creative avoidance', 'overcoming procrastination', 'creative delay'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-043',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore creative procrastination—why we avoid creating despite wanting to, psychological functions of procrastination, difference from creative block, and evidence-based strategies for overcoming creative avoidance without shame.',
    '/images/articles/cat24/cover-043.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT24-044: Creative Flow States: The Psychology of \''Getting Lost\'' i
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Creative Flow States: The Psychology of \''Getting Lost\'' in Your Work',
    'creative-flow-states',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['creative flow', 'flow state', 'flow psychology', 'creative absorption', 'flow creativity'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-044',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore creative flow states—Mihály Csíkszentmihályi''s research on optimal experience, neuroscience of flow, how to cultivate flow in creative practice, and mental health benefits of deep creative absorption.',
    '/images/articles/cat24/cover-044.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT24-045: Creative Copying and Imitation: The Psychology of Learning T
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Creative Copying and Imitation: The Psychology of Learning Through Mimicry',
    'creative-copying-imitation',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['creative copying', 'imitation learning', 'artistic influence', 'creative apprenticeship', 'copying in art'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-045',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore creative copying and imitation—how artists learn through mimicry, psychology of influence, difference between copying as learning vs plagiarism, and navigating the journey from imitation to original voice.',
    '/images/articles/cat24/cover-045.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT24-046: Finding Your Artistic Voice and Style: The Psychology of Cre
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Finding Your Artistic Voice and Style: The Psychology of Creative Identity',
    'artistic-voice-style',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['artistic voice', 'creative style', 'finding your voice', 'artistic identity', 'creative authenticity'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-046',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore artistic voice and style—how creative identity develops, psychology of finding authentic expression, why ''finding your voice'' takes time, and navigating pressure to be original before you''re ready.',
    '/images/articles/cat24/cover-046.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT24-047: Creative Criticism and Feedback: How to Give, Receive, and U
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Creative Criticism and Feedback: How to Give, Receive, and Use Critique Without Breaking',
    'creative-criticism-feedback',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['creative criticism', 'artistic feedback', 'critique', 'creative feedback', 'receiving criticism'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-047',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore creative criticism and feedback—psychology of receiving critique without defensiveness, giving helpful feedback, distinguishing useful criticism from toxic, and using feedback to improve without losing creative confidence.',
    '/images/articles/cat24/cover-047.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT24-048: Creative Intuition: Trusting Your Gut in the Creative Proces
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Creative Intuition: Trusting Your Gut in the Creative Process',
    'creative-intuition',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['creative intuition', 'artistic intuition', 'trusting gut feeling', 'creative instinct', 'intuitive creativity'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-048',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore creative intuition—psychology of ''gut feelings'' in artistic decision-making, neuroscience of implicit knowing, how to distinguish intuition from fear, and balancing intuition with critical thinking in creative work.',
    '/images/articles/cat24/cover-048.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT24-049: Creative Constraints and Deadlines: Why Limitations Can Unlo
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Creative Constraints and Deadlines: Why Limitations Can Unlock Rather Than Limit Creativity',
    'creative-constraints-deadlines',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['creative constraints', 'deadlines creativity', 'limitations creativity', 'creative boundaries', 'constraint-based creativity'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-049',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore creative constraints and deadlines—paradox that limitations often enhance creativity, psychology of productive pressure, how to use constraints strategically, and when freedom becomes paralyzing instead of liberating.',
    '/images/articles/cat24/cover-049.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT24-050: Creative Risk-Taking: The Psychology of Trying Things That M
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Creative Risk-Taking: The Psychology of Trying Things That Might Fail',
    'creative-risk-taking',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['creative risk', 'artistic risk taking', 'creative courage', 'creative experimentation', 'fear of failure'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-050',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore creative risk-taking—psychology of trying approaches that might fail, why safety prevents growth, how to build courage for experimentation, and distinguishing productive risk from recklessness in creative work.',
    '/images/articles/cat24/cover-050.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT24-051: Creative Legacy: What We Leave Behind When We Create
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Creative Legacy: What We Leave Behind When We Create',
    'creative-legacy-artistic-expression',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['creative legacy', 'artistic legacy', 'creative impact', 'leaving legacy', 'creative mortality'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-051',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore creative legacy—psychology of leaving work behind, how creating addresses mortality, measuring impact beyond recognition, legacy anxiety vs. legacy contentment, and creating for contribution rather than immortality.',
    '/images/articles/cat24/cover-051.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'creative-process-and-challenges' AND category_id = v_cat_id;

  -- CAT24-052: Creative Block: Understanding and Overcoming the Psychology 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Creative Block: Understanding and Overcoming the Psychology of Stuck',
    'creative-block',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['creative block', 'writer\', ', ', ', ', ', '],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-052',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand the psychology behind creative block—why it happens, what maintains it, and evidence-based strategies to move through it. Learn how perfectionism, fear, cognitive depletion, and identity threats contribute to creative stagnation.',
    '/images/articles/cat24/cover-052.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT24-053: Creative Burnout: When Your Passion Becomes Exhaustion
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Creative Burnout: When Your Passion Becomes Exhaustion',
    'creative-burnout',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['creative burnout', 'artist burnout', 'creative exhaustion', 'passion exhaustion', 'creative fatigue'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-053',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand creative burnout—emotional, physical, and creative exhaustion from sustained creative work. Learn the causes, warning signs, recovery strategies, and how to build sustainable creative practices that prevent burnout.',
    '/images/articles/cat24/cover-053.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT24-054: Flow and Creativity: The Psychology of Total Immersion
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Flow and Creativity: The Psychology of Total Immersion',
    'flow-creativity',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['flow state', 'creative flow', 'Csikszentmihalyi', 'optimal experience', 'deep work'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-054',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover flow states—the experience of total immersion and effortless concentration. Learn Csikszentmihalyi''s research on optimal experience, how flow enhances creativity, the neuroscience of flow, and practical strategies for accessing flow more often.',
    '/images/articles/cat24/cover-054.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT24-055: Creativity and Mental Illness: Separating Myth From Reality
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Creativity and Mental Illness: Separating Myth From Reality',
    'creativity-mental-illness-myth',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['creativity mental illness', 'tortured artist', 'mad genius', 'creativity depression', 'creativity bipolar'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-055',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Examine the complex relationship between creativity and mental illness. Learn what research actually shows about the ''tortured artist'' myth, shared vulnerability model, protective and risk factors, and how to support creative wellbeing without romanticizing suffering.',
    '/images/articles/cat24/cover-055.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT24-056: The Creative Process: Understanding the Stages From Inspirat
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Creative Process: Understanding the Stages From Inspiration to Completion',
    'creative-process-stages',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['creative process', 'stages of creativity', 'Wallas model', 'creative thinking', 'incubation'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-056',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the stages of the creative process from preparation through completion. Learn Wallas''s four-stage model, the neuroscience of insight, how to work with—not against—your creative rhythm, and practical strategies for each phase.',
    '/images/articles/cat24/cover-056.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT24-057: Imposter Syndrome in Creative Work: When Success Feels Like 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Imposter Syndrome in Creative Work: When Success Feels Like Fraud',
    'imposter-syndrome-creative-work',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['imposter syndrome', 'creative imposter', 'imposter phenomenon', 'self-doubt', 'creative confidence'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-057',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand imposter syndrome in creative work—feeling like a fraud despite success. Learn why creative fields intensify imposter feelings, the psychological patterns involved, and evidence-based strategies to work with self-doubt without letting it paralyze your creativity.',
    '/images/articles/cat24/cover-057.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT24-058: Creative Collaboration: The Psychology of Making Together
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Creative Collaboration: The Psychology of Making Together',
    'creative-collaboration',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['creative collaboration', 'collaborative creativity', 'group creativity', 'creative teams', 'co-creation'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-058',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the psychology of creative collaboration—how working with others enhances creativity, the challenges of collaborative processes, and strategies for productive creative partnerships that honor individual voices while building something greater together.',
    '/images/articles/cat24/cover-058.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT24-059: Vulnerability and Creativity: The Courage to Create and Shar
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Vulnerability and Creativity: The Courage to Create and Share',
    'vulnerability-creativity',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['vulnerability creativity', 'creative courage', 'showing work', 'creative vulnerability', 'Brené Brown'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-059',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the relationship between vulnerability and creativity—why making and sharing creative work requires emotional risk, how shame and fear silence creative expression, and strategies for developing the courage to create and share authentically.',
    '/images/articles/cat24/cover-059.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT24-060: Constraints and Creativity: How Limitations Unlock Innovatio
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Constraints and Creativity: How Limitations Unlock Innovation',
    'constraints-creativity',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['constraints creativity', 'creative constraints', 'limitations innovation', 'creative freedom', 'constraint-based creativity'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-060',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover how constraints enhance creativity rather than limit it. Learn the psychology and neuroscience behind why limitations—time, resources, rules—often produce more innovative solutions than total freedom, and how to strategically use constraints in your creative work.',
    '/images/articles/cat24/cover-060.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT24-061: Creativity and Neurodiversity: How Different Brains Create D
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Creativity and Neurodiversity: How Different Brains Create Differently',
    'creativity-neurodiversity',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['creativity neurodiversity', 'ADHD creativity', 'autism creativity', 'dyslexia creativity', 'neurodivergent artists'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-061',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore how neurodivergent minds—ADHD, autism, dyslexia, and others—experience creativity differently. Learn the research on cognitive diversity as creative strength, unique challenges neurodivergent creatives face, and strategies for thriving.',
    '/images/articles/cat24/cover-061.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT24-062: Creative Identity: Becoming and Being \''A Creative Person\'
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Creative Identity: Becoming and Being \''A Creative Person\''',
    'creative-identity',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['creative identity', 'creative self-concept', 'artist identity', 'creative self-efficacy', 'imposter syndrome'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-062',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the psychology of creative identity—how people come to see themselves as ''creative,'' why this matters for motivation and persistence, barriers to claiming creative identity, and how to develop creative self-concept authentically.',
    '/images/articles/cat24/cover-062.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT24-063: Play and Creativity: Reclaiming Playfulness as an Adult
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Play and Creativity: Reclaiming Playfulness as an Adult',
    'play-creativity-adults',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['adult play', 'playfulness creativity', 'play psychology', 'creative play', 'serious play'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-063',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the psychology of adult play and creativity—why play is essential across the lifespan, how adulthood suppresses playfulness, the research on play and innovation, and strategies for reclaiming playful mindset without guilt or self-consciousness.',
    '/images/articles/cat24/cover-063.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'foundations-of-creative-wellbeing' AND category_id = v_cat_id;

  -- CAT24-064: Creative Expression and Mental Health: The Psychology of Mak
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Creative Expression and Mental Health: The Psychology of Making Things',
    'creative-expression-mental-health',
    'draft',
    'Creativity & Therapeutic Arts',
    ARRAY['creative expression', 'art therapy', 'creativity psychology', 'therapeutic arts', 'mental health'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT24-064',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the science behind creative expression and mental health. Learn how artistic activities, from painting to poetry, support emotional regulation, identity formation, and psychological wellbeing.',
    '/images/articles/cat24/cover-064.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

END $$;

-- Category 25: disability-accessibility (64 articles)
DO $$
DECLARE
  v_cat_id UUID;
  v_sub_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'disability-accessibility';

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'access-and-service-design' AND category_id = v_cat_id;

  -- CAT25-001: Accessible Mental Health Care: Why Therapy Shouldn\''t Requi
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Accessible Mental Health Care: Why Therapy Shouldn\''t Require an Obstacle Course',
    'accessible-mental-health-care',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['accessible therapy', 'disability and therapy access', 'accessible mental health services', 'teletherapy accessibility', 'therapy accommodations'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-001',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Most mental health services are inaccessible to disabled people—physically, communicatively, financially, and attitudinally. Here''s what accessible therapy actually looks like and why it matters.',
    '/images/articles/cat25/cover-001.svg',
    5,
    false,
    true,
    NULL,
    TRUE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'accessing-mental-health-care-with-a-disability' AND category_id = v_cat_id;

  -- CAT25-002: Telehealth Accessibility: Making Online Therapy Work for Eve
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Telehealth Accessibility: Making Online Therapy Work for Everyone',
    'telehealth-accessibility',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['telehealth accessibility', 'online therapy disability', 'accessible mental health', 'remote therapy', 'disability accommodations'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-002',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How telehealth can remove barriers to mental health care for disabled people—and where it still falls short. Research-backed strategies for inclusive online therapy.',
    '/images/articles/cat25/cover-002.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT25-003: Accessible Mindfulness: Meditation and Relaxation for People
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Accessible Mindfulness: Meditation and Relaxation for People With Physical Limitations',
    'accessible-mindfulness',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['accessible mindfulness', 'meditation disability', 'adaptive relaxation', 'mindfulness physical limitations', 'seated meditation'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-003',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Adapt mindfulness and meditation practices for physical disabilities. Evidence-based approaches that work with your body, not against it.',
    '/images/articles/cat25/cover-003.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT25-004: Cognitive Accessibility in Mental Health Education: Plain La
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Cognitive Accessibility in Mental Health Education: Plain Language and Clear Design',
    'cognitive-accessibility-mental-health-education',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['cognitive accessibility', 'plain language mental health', 'intellectual disability', 'learning disability', 'accessible health information'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-004',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How plain language, clear design, and cognitive accessibility principles make mental health information usable for everyone, including people with intellectual and learning disabilities.',
    '/images/articles/cat25/cover-004.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT25-005: Mental Health Screening Tools for People With Intellectual D
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Mental Health Screening Tools for People With Intellectual Disabilities',
    'mental-health-screening-intellectual-disabilities',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['mental health screening', 'intellectual disability', 'adapted assessment', 'diagnostic overshadowing', 'PAS-ADD'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-005',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Why standard mental health screening tools fail people with intellectual disabilities, and which adapted instruments actually work. Evidence-based assessment approaches.',
    '/images/articles/cat25/cover-005.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT25-006: Sign Language and Mental Health Services: The Deaf Community
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Sign Language and Mental Health Services: The Deaf Community\''s Access Gap',
    'sign-language-mental-health-deaf-community',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['deaf mental health', 'sign language therapy', 'ASL interpreters', 'deaf community', 'mental health access'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-006',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Why Deaf people face a mental health access crisis—and what linguistically accessible therapy actually looks like. Research on Deaf mental health, interpreter use, and culturally affirmative care.',
    '/images/articles/cat25/cover-006.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT25-007: Adapted Exercise for Mental Health When Physical Activity Is
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Adapted Exercise for Mental Health When Physical Activity Is Limited',
    'adapted-exercise-mental-health',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['adapted exercise', 'disability fitness', 'mental health exercise', 'wheelchair exercise', 'adaptive sports'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-007',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How adapted physical activity supports mental health for people with physical disabilities. Evidence-based approaches from chair exercises to aquatic therapy.',
    '/images/articles/cat25/cover-007.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'aging-disability-and-mental-health' AND category_id = v_cat_id;

  -- CAT25-008: Disability and Aging: When the Body Changes and the World Do
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Disability and Aging: When the Body Changes and the World Doesn\''t Adapt',
    'disability-aging-mental-health',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['disability aging', 'aging with disability', 'elderly disability mental health', 'acquired disability aging', 'disability and dementia'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-008',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Aging with disability and acquiring disability through aging are two different experiences—both underserved by a healthcare system that treats disability and aging as separate problems.',
    '/images/articles/cat25/cover-008.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'caregiving-and-family-systems' AND category_id = v_cat_id;

  -- CAT25-009: Disability and Caregiving: The Psychological Cost of Being N
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Disability and Caregiving: The Psychological Cost of Being Needed and Needing',
    'disability-caregiving-family',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['disability caregiving', 'caregiver burnout', 'family disability', 'caregiver mental health', 'caregiving burden'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-009',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Caregiving for a disabled family member reshapes every relationship in the family. Here''s the psychology of caregiving—for those who give care, those who receive it, and the families that hold both.',
    '/images/articles/cat25/cover-009.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'chronic-illness-and-mental-health' AND category_id = v_cat_id;

  -- CAT25-010: Chronic Illness and Mental Health: Living in a Body That Won
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Chronic Illness and Mental Health: Living in a Body That Won\''t Cooperate',
    'chronic-illness-mental-health',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['chronic illness mental health', 'chronic pain depression', 'invisible illness', 'fibromyalgia psychology', 'autoimmune mental health'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-010',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Chronic illness doesn''t just affect the body—it reshapes identity, relationships, and mental health. Here''s what the research shows about living with a condition that doesn''t go away.',
    '/images/articles/cat25/cover-010.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'disability-and-identity' AND category_id = v_cat_id;

  -- CAT25-011: Disability Identity and Mental Health: Beyond the Medical Mo
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Disability Identity and Mental Health: Beyond the Medical Model',
    'disability-identity-mental-health',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['disability identity', 'social model disability', 'medical model disability', 'disability pride', 'ableism mental health'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-011',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Disability is not a tragedy to overcome—it''s a human experience with its own culture, identity, and pride. Here''s how disability models shape mental health and why the medical model isn''t enough.',
    '/images/articles/cat25/cover-011.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT25-012: Ableism and Microaggressions: The Psychological Toll of Bein
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Ableism and Microaggressions: The Psychological Toll of Being Seen as Less',
    'ableism-microaggressions-psychological-harm',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['ableism', 'disability microaggressions', 'disability discrimination', 'ableist language', 'inspiration porn'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-012',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Ableism—the systemic devaluation of disabled people—produces chronic psychological harm through microaggressions, discrimination, and invisibility. Here''s how it works and what it costs.',
    '/images/articles/cat25/cover-012.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'disability-advocacy-and-future-directions' AND category_id = v_cat_id;

  -- CAT25-013: Universal Design and Mental Health: Building Inclusive Envir
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Universal Design and Mental Health: Building Inclusive Environments',
    'universal-design-mental-health',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['universal design', 'inclusive design', 'mental health environments', 'sensory design', 'accessible architecture'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-013',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How universal design principles create mentally healthier environments for everyone—not just people with disabilities. Research on inclusive architecture, sensory design, and psychological wellbeing.',
    '/images/articles/cat25/cover-013.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT25-014: Disability Representation in Media and Its Mental Health Imp
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Disability Representation in Media and Its Mental Health Impact',
    'disability-representation-media-mental-health',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['disability representation', 'media disability', 'disability tropes', 'inspiration porn', 'disability visibility'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-014',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How media portrayal of disability shapes self-image, public attitudes, and mental health outcomes. Research on disability tropes, authentic representation, and the psychology of visibility.',
    '/images/articles/cat25/cover-014.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT25-015: Disability-Inclusive Disaster Preparedness and Psychological
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Disability-Inclusive Disaster Preparedness and Psychological Resilience',
    'disability-inclusive-disaster-preparedness',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['disability disaster preparedness', 'inclusive emergency planning', 'disability resilience', 'disaster mental health', 'accessible evacuation'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-015',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Why disabled people are disproportionately affected by disasters and what inclusive emergency planning looks like. Research on disability, disaster mortality, psychological resilience, and inclusive preparedness.',
    '/images/articles/cat25/cover-015.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT25-016: Assistive Technology and Psychological Empowerment
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Assistive Technology and Psychological Empowerment',
    'assistive-technology-psychological-empowerment',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['assistive technology', 'disability technology', 'psychological empowerment', 'AT mental health', 'disability autonomy'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-016',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How assistive technology transforms not just function but identity, autonomy, and mental health for disabled people. Research on AT adoption, psychological impact, and the technology-empowerment connection.',
    '/images/articles/cat25/cover-016.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT25-017: Disability Justice: Beyond Rights to Liberation
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Disability Justice: Beyond Rights to Liberation',
    'disability-justice-beyond-rights',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['disability justice', 'disability rights', 'intersectionality disability', 'ableism', 'collective liberation'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-017',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How disability justice expands beyond legal rights to address intersecting oppressions, collective liberation, and the psychological impact of systemic ableism. A framework for understanding disability as a political identity.',
    '/images/articles/cat25/cover-017.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT25-018: The Neurodiversity Movement and Mental Health
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Neurodiversity Movement and Mental Health',
    'neurodiversity-movement-mental-health',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['neurodiversity', 'neurodiversity movement', 'autism acceptance', 'ADHD identity', 'neurodivergent mental health'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-018',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How the neurodiversity paradigm is reshaping mental health care, autism acceptance, and our understanding of cognitive difference. Research on neurodiversity, identity, and psychological wellbeing.',
    '/images/articles/cat25/cover-018.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT25-019: Peer Support in Disability Communities and Mental Health
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Peer Support in Disability Communities and Mental Health',
    'peer-support-disability-mental-health',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['peer support disability', 'disability peer mentoring', 'disability community', 'peer counseling', 'mutual aid disability'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-019',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How peer support among disabled people improves mental health outcomes, reduces isolation, and provides support that professional services cannot. Evidence on disability peer mentoring and community connection.',
    '/images/articles/cat25/cover-019.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT25-020: Disability and Sexuality: Breaking the Silence
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Disability and Sexuality: Breaking the Silence',
    'disability-sexuality-destigmatization',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['disability sexuality', 'disabled sexual health', 'intimacy disability', 'sexual wellbeing disability', 'desexualization disabled'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-020',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Why disabled people''s sexuality is systematically ignored, and how affirming sexual wellbeing improves mental health. Research on disability, intimacy, pleasure, and the right to a sexual self.',
    '/images/articles/cat25/cover-020.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT25-021: Disability, Climate Change, and Mental Health
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Disability, Climate Change, and Mental Health',
    'disability-climate-change-mental-health',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['disability climate change', 'climate mental health', 'climate vulnerability disability', 'environmental justice disability', 'eco-anxiety disability'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-021',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How climate change disproportionately affects disabled people''s physical and mental health, and why disability inclusion is essential to climate adaptation. Research on climate vulnerability and disability.',
    '/images/articles/cat25/cover-021.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT25-022: Disability and Incarceration: The Mental Health Crisis Behin
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Disability and Incarceration: The Mental Health Crisis Behind Bars',
    'disability-incarceration-mental-health',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['disability incarceration', 'disabled prisoners', 'prison mental health', 'disability criminalization', 'accessible prisons'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-022',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How disabled people are overrepresented in prisons and jails, and the mental health crisis created by inaccessible carceral systems. Research on disability, criminalization, and psychological harm.',
    '/images/articles/cat25/cover-022.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT25-023: The Disability-Poverty-Mental Health Cycle
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Disability-Poverty-Mental Health Cycle',
    'disability-poverty-mental-health-cycle',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['disability poverty', 'disability income inequality', 'mental health poverty', 'disability benefits', 'economic exclusion disability'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-023',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How disability, poverty, and poor mental health reinforce each other in a vicious cycle. Research on economic inequality, disability benefits, and breaking the poverty trap.',
    '/images/articles/cat25/cover-023.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT25-024: Global Disability Rights and Mental Health Across Cultures
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Global Disability Rights and Mental Health Across Cultures',
    'global-disability-rights-mental-health',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['global disability rights', 'CRPD', 'cultural disability models', 'disability cross-cultural', 'international disability'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-024',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How disability rights and mental health care vary across cultures, and what the global disability rights movement means for psychological wellbeing. Research on the CRPD, cultural models, and cross-cultural disability.',
    '/images/articles/cat25/cover-024.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT25-025: Disability Allyship for Mental Health Professionals
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Disability Allyship for Mental Health Professionals',
    'disability-allyship-mental-health-professionals',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['disability allyship', 'disability competency', 'ableism therapy', 'disability affirming therapy', 'mental health professional disability'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-025',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How therapists, counselors, and psychologists can become genuine disability allies. Research on ableism in mental health practice, disability-competent care, and structural allyship.',
    '/images/articles/cat25/cover-025.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT25-026: Disability, Art, and Creative Expression as Healing
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Disability, Art, and Creative Expression as Healing',
    'disability-art-creative-expression-healing',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['disability art', 'creative expression disability', 'art therapy disability', 'disability culture', 'healing through art'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-026',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How disabled artists use creative expression for psychological healing, identity affirmation, and cultural change. Research on disability arts, art therapy, and the therapeutic power of creative practice.',
    '/images/articles/cat25/cover-026.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT25-027: The Future of Disability and Mental Health: AI, Genomics, an
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Future of Disability and Mental Health: AI, Genomics, and Ethical Frontiers',
    'future-disability-mental-health-ai-genomics',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['disability future', 'AI disability', 'genomics disability', 'brain computer interface', 'disability ethics'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-027',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How emerging technologies—artificial intelligence, genomics, brain-computer interfaces—will reshape disability and mental health. Ethical questions about cure, enhancement, and disabled futures.',
    '/images/articles/cat25/cover-027.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT25-028: Disability Burnout: Recognition and Recovery
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Disability Burnout: Recognition and Recovery',
    'disability-burnout-recognition-recovery',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['disability burnout', 'disability fatigue', 'ableism exhaustion', 'chronic disability stress', 'disability energy management'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-028',
    v_cat_id,
    v_sub_id,
    'drafted',
    'What disability burnout is, why it differs from general burnout, and how to recover. Research on the chronic energy cost of navigating ableist systems and the psychology of disability fatigue.',
    '/images/articles/cat25/cover-028.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT25-029: Intersectionality: Disability, Race, Gender, and Mental Heal
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Intersectionality: Disability, Race, Gender, and Mental Health',
    'intersectionality-disability-race-gender',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['intersectionality disability', 'disability race', 'disability gender', 'multiply marginalized', 'disability LGBTQ'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-029',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How disability intersects with race, gender, sexuality, and class to shape mental health experiences. Research on multiply marginalized disabled people and intersectional approaches to care.',
    '/images/articles/cat25/cover-029.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT25-030: Disability and Positive Psychology: Flourishing Beyond Funct
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Disability and Positive Psychology: Flourishing Beyond Functioning',
    'disability-positive-psychology-flourishing',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['disability positive psychology', 'disability flourishing', 'disability paradox', 'post-traumatic growth disability', 'disability resilience'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-030',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How positive psychology applies to disability—and where it falls short. Research on disabled flourishing, post-traumatic growth, resilience, and the disability paradox.',
    '/images/articles/cat25/cover-030.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT25-031: Disability in Education: Inclusion, Exclusion, and Student M
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Disability in Education: Inclusion, Exclusion, and Student Mental Health',
    'disability-education-inclusion-mental-health',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['disability education', 'inclusive education', 'special education mental health', 'disabled students', 'school inclusion'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-031',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How inclusive and exclusive educational environments shape disabled students'' mental health. Research on special education, mainstreaming, belonging, and academic self-concept.',
    '/images/articles/cat25/cover-031.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT25-032: Caregiver Mental Health in Disability Families
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Caregiver Mental Health in Disability Families',
    'caregiver-mental-health-disability-families',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['caregiver mental health', 'disability family', 'caregiver burnout', 'disability caregiving', 'family caregiver support'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-032',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The mental health impact of caring for a disabled family member—and how to support caregivers without reinforcing the ''burden'' narrative. Research on caregiver wellbeing, burnout, and resilience.',
    '/images/articles/cat25/cover-032.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT25-033: Disability Resilience: How Disabled People Build Lives That 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Disability Resilience: How Disabled People Build Lives That Thrive',
    'disability-resilience-thriving-adversity',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['disability resilience', 'disabled thriving', 'coping disability', 'disability strength', 'resilience factors disability'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-033',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How disabled people develop extraordinary resilience—and why resilience should not be used to excuse systemic failure. Research on disability resilience, coping, and the conditions that enable thriving.',
    '/images/articles/cat25/cover-033.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT25-034: Building a Disability-Affirming Mental Health System
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Building a Disability-Affirming Mental Health System',
    'building-disability-affirming-mental-health-system',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['disability affirming mental health', 'accessible mental health', 'inclusive mental health system', 'disability mental health policy', 'systemic change disability'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-034',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A vision for mental health services that genuinely serve disabled people—not as an afterthought but as a design principle. Research-informed recommendations for systemic transformation.',
    '/images/articles/cat25/cover-034.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'disability-identity-and-community' AND category_id = v_cat_id;

  -- CAT25-035: Disability Pride: Finding Strength in Disabled Identity
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Disability Pride: Finding Strength in Disabled Identity',
    'disability-pride',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['disability pride', 'disabled identity', 'disability community', 'internalized ableism', 'disability culture'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-035',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How disability pride—embracing disabled identity rather than hiding it—protects mental health. Research on identity, community belonging, and psychological resilience.',
    '/images/articles/cat25/cover-035.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT25-036: Ableism and Mental Health: The Psychological Cost of Everyda
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Ableism and Mental Health: The Psychological Cost of Everyday Discrimination',
    'ableism-mental-health',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['ableism', 'disability discrimination', 'microaggressions disability', 'systemic ableism', 'mental health impact'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-036',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How everyday ableism—from microaggressions to systemic exclusion—damages mental health. Research on disability discrimination and psychological wellbeing.',
    '/images/articles/cat25/cover-036.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT25-037: Disability and Relationships: Love, Intimacy, and Breaking S
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Disability and Relationships: Love, Intimacy, and Breaking Stereotypes',
    'disability-relationships',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['disability relationships', 'disabled love', 'intimacy disability', 'relationship satisfaction', 'disability stereotypes'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-037',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How disabled people navigate love, intimacy, and relationships. Research on relationship satisfaction, overcoming stereotypes, and building healthy partnerships.',
    '/images/articles/cat25/cover-037.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT25-038: Disability and Employment: Workplace Barriers and Mental Hea
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Disability and Employment: Workplace Barriers and Mental Health Impact',
    'disability-employment',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['disability employment', 'workplace discrimination', 'reasonable accommodations', 'employment gap', 'disability mental health'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-038',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How workplace barriers and employment discrimination affect the mental health of disabled people. Research on the employment gap, accommodations, and inclusive workplaces.',
    '/images/articles/cat25/cover-038.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT25-039: Parenting With a Disability: Challenges, Strengths, and Supp
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Parenting With a Disability: Challenges, Strengths, and Support',
    'parenting-with-disability',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['parenting disability', 'disabled parents', 'adaptive parenting', 'custody discrimination', 'parent competence'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-039',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How disabled parents navigate raising children. Research on parental competence, custody discrimination, adaptive parenting strategies, and the strengths disabled parents bring.',
    '/images/articles/cat25/cover-039.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT25-040: Disability and Grief: Mourning Abilities You\''ve Lost
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Disability and Grief: Mourning Abilities You\''ve Lost',
    'disability-grief',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['disability grief', 'chronic sorrow', 'acquired disability', 'loss abilities', 'psychological adjustment'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-040',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding the grief process when disability changes your body and life. Research on chronic sorrow, adaptation, and finding meaning after ability loss.',
    '/images/articles/cat25/cover-040.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT25-041: The Disability Rights Movement and Mental Health Advocacy
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Disability Rights Movement and Mental Health Advocacy',
    'disability-rights-movement-mental-health',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['disability rights', 'disability advocacy', 'ADA', 'deinstitutionalization', 'independent living'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-041',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How the disability rights movement transformed mental health care for disabled people. From institutionalization to inclusion, the history and psychology of disability advocacy.',
    '/images/articles/cat25/cover-041.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT25-042: Sibling and Family Dynamics When One Member Has a Disability
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Sibling and Family Dynamics When One Member Has a Disability',
    'sibling-family-dynamics-disability',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['sibling disability', 'family dynamics disability', 'caregiver siblings', 'family adjustment', 'disability family psychology'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-042',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How disability shapes family relationships and sibling experiences. Research on adjustment, caregiving roles, and building resilient family systems.',
    '/images/articles/cat25/cover-042.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT25-043: Disability and Aging: Compounding Challenges Across the Life
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Disability and Aging: Compounding Challenges Across the Lifespan',
    'disability-aging',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['disability aging', 'aging with disability', 'premature aging', 'older disabled adults', 'secondary conditions'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-043',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How aging with a disability compounds physical and psychological challenges. Research on premature aging, secondary conditions, caregiver transitions, and resilience in older disabled adults.',
    '/images/articles/cat25/cover-043.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT25-044: Body Image and Disability: Redefining Beauty and Self-Worth
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Body Image and Disability: Redefining Beauty and Self-Worth',
    'body-image-disability',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['body image disability', 'disabled body image', 'disability beauty standards', 'embodiment disability', 'self-worth disability'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-044',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How disability shapes body image, and how disabled people redefine beauty and self-worth. Research on embodiment, appearance anxiety, and disability-affirming body acceptance.',
    '/images/articles/cat25/cover-044.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'disability-myths' AND category_id = v_cat_id;

  -- CAT25-045: Myth: Disabled People Are Automatically Depressed
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Myth: Disabled People Are Automatically Depressed',
    'myth-disabled-people-automatically-depressed',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['disability depression myth', 'disability paradox', 'disability wellbeing', 'quality of life disability', 'disabled happiness'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-045',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Why the assumption that disability automatically causes depression is wrong, harmful, and contradicted by research. The disability paradox explained.',
    '/images/articles/cat25/cover-045.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT25-046: Myth: Disability Is Always Visible
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Myth: Disability Is Always Visible',
    'myth-disability-always-visible',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['invisible disability', 'hidden disability', 'non-apparent disability', 'disability disclosure', 'chronic illness'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-046',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Why the assumption that disability must be visible is wrong and harmful. Research on invisible disabilities, disclosure decisions, and the unique psychological burden of non-apparent disability.',
    '/images/articles/cat25/cover-046.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT25-047: Myth: Disabled People Can\''t Have Fulfilling Relationships
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Myth: Disabled People Can\''t Have Fulfilling Relationships',
    'myth-disabled-people-cant-have-fulfilling-relationships',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['disability relationships', 'disabled dating', 'disability intimacy', 'relationship satisfaction disability', 'disability love'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-047',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Why the assumption that disability prevents fulfilling romantic and social relationships is wrong. Research on disability, intimacy, relationship satisfaction, and the real barriers to connection.',
    '/images/articles/cat25/cover-047.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT25-048: Myth: Disability Means Dependence
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Myth: Disability Means Dependence',
    'myth-disability-means-dependence',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['disability dependence myth', 'disability independence', 'disabled autonomy', 'interdependence disability', 'self-determination disability'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-048',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Why equating disability with dependence is wrong, harmful, and based on a misunderstanding of both disability and independence. Research on autonomy, interdependence, and disabled self-determination.',
    '/images/articles/cat25/cover-048.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT25-049: Myth: Accommodations Give Disabled People an Unfair Advantag
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Myth: Accommodations Give Disabled People an Unfair Advantage',
    'myth-accommodations-unfair-advantage',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['disability accommodations', 'unfair advantage myth', 'reasonable accommodation', 'disability equity', 'ADA accommodations'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-049',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Why disability accommodations are not advantages but equity tools. Research on accommodation effectiveness, the level playing field, and why resistance to accommodation harms everyone.',
    '/images/articles/cat25/cover-049.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT25-050: Myth: You\''re Too Young or High-Functioning to Be Disabled
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Myth: You\''re Too Young or High-Functioning to Be Disabled',
    'myth-too-young-high-functioning-disabled',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['functioning labels', 'high functioning disability', 'young disabled people', 'disability gatekeeping', 'disability identity'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-050',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Why functioning labels and age-based dismissal invalidate real disability. Research on functioning labels, young disabled people, and the harm of gatekeeping disability identity.',
    '/images/articles/cat25/cover-050.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'disability-sexuality-and-relationships' AND category_id = v_cat_id;

  -- CAT25-051: Disability, Sexuality, and Intimacy: Reclaiming Desire in Bo
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Disability, Sexuality, and Intimacy: Reclaiming Desire in Bodies That Don\''t Fit the Script',
    'disability-sexuality-intimacy',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['disability sexuality', 'disabled intimacy', 'disability sex education', 'sexual health disability', 'disability desexualization'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-051',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Disabled people are sexual beings—but society treats them as if they''re not. Here''s the psychology of sexuality, intimacy, and desire in the context of disability.',
    '/images/articles/cat25/cover-051.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'employment-and-economic-inclusion' AND category_id = v_cat_id;

  -- CAT25-052: Disability and Employment: The Psychological Impact of Worki
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Disability and Employment: The Psychological Impact of Working While Disabled',
    'disability-employment-workplace',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['disability employment', 'workplace accommodations', 'disability discrimination work', 'employment gap disability', 'disability and income'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-052',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Disabled people who want to work face a 35-point employment gap, systemic discrimination, and inadequate accommodations. Employment is a mental health intervention—when the workplace doesn''t make you sick.',
    '/images/articles/cat25/cover-052.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'intellectual-and-developmental-disability' AND category_id = v_cat_id;

  -- CAT25-053: Intellectual Disability and Mental Health: The Most Underser
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Intellectual Disability and Mental Health: The Most Underserved Population in Psychiatry',
    'intellectual-disability-mental-health',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['intellectual disability mental health', 'learning disability psychology', 'dual diagnosis', 'diagnostic overshadowing', 'IDD mental health'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-053',
    v_cat_id,
    v_sub_id,
    'drafted',
    'People with intellectual disabilities experience mental health conditions at 2-4× the general population rate—yet receive the least mental health support. Here''s why and what needs to change.',
    '/images/articles/cat25/cover-053.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'neurodivergence-and-disability' AND category_id = v_cat_id;

  -- CAT25-054: Neurodivergence and Disability Identity: When Your Brain Wor
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Neurodivergence and Disability Identity: When Your Brain Works Differently in a World That Demands Sameness',
    'neurodivergence-disability-identity',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['neurodivergence', 'neurodiversity', 'autism identity', 'ADHD disability', 'neurodivergent mental health'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-054',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Neurodivergence—autism, ADHD, dyslexia, and related conditions—sits at the intersection of disability and human variation. Here''s how the neurodiversity paradigm reshapes mental health.',
    '/images/articles/cat25/cover-054.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'sensory-disability-and-mental-health' AND category_id = v_cat_id;

  -- CAT25-055: Deaf Culture, Sensory Disability, and Mental Health: When th
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Deaf Culture, Sensory Disability, and Mental Health: When the World Isn\''t Built for Your Senses',
    'deaf-culture-mental-health',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['deaf mental health', 'Deaf culture', 'hearing loss psychology', 'blind mental health', 'vision loss depression'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-055',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Deaf, hard of hearing, blind, and deafblind people face unique mental health challenges rooted in communication barriers, cultural mismatch, and a world designed for hearing and sighted people.',
    '/images/articles/cat25/cover-055.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'specific-disability-contexts' AND category_id = v_cat_id;

  -- CAT25-056: Traumatic Brain Injury and Mental Health: The Long Road to R
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Traumatic Brain Injury and Mental Health: The Long Road to Recovery',
    'tbi-disability-mental-health',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['traumatic brain injury', 'TBI mental health', 'brain injury depression', 'concussion mental health', 'TBI recovery'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-056',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How traumatic brain injury affects mental health long-term. Research on depression, anxiety, personality changes, and evidence-based recovery approaches after TBI.',
    '/images/articles/cat25/cover-056.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT25-057: Cerebral Palsy and Mental Health Across the Lifespan
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Cerebral Palsy and Mental Health Across the Lifespan',
    'cerebral-palsy-mental-health',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['cerebral palsy mental health', 'CP psychology', 'cerebral palsy depression', 'cerebral palsy adults', 'disability mental health'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-057',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How cerebral palsy affects mental health from childhood through adulthood. Research on emotional wellbeing, pain, fatigue, social participation, and resilience in CP.',
    '/images/articles/cat25/cover-057.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT25-058: Limb Loss and Psychological Adjustment: Body Image, Phantom 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Limb Loss and Psychological Adjustment: Body Image, Phantom Pain, and Identity',
    'limb-loss-psychological-adjustment',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['limb loss', 'amputation psychology', 'phantom limb pain', 'prosthetic adjustment', 'body image amputation'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-058',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How limb loss affects mental health through body image changes, phantom limb pain, and identity disruption. Research-based approaches to psychological adjustment after amputation.',
    '/images/articles/cat25/cover-058.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT25-059: Visual Impairment and Mental Health: Navigating a Sighted Wo
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Visual Impairment and Mental Health: Navigating a Sighted World',
    'visual-impairment-mental-health',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['visual impairment mental health', 'blindness psychology', 'low vision depression', 'blind mental health', 'vision loss adjustment'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-059',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How visual impairment affects mental health across the lifespan. Research on depression, social isolation, independence, and psychological wellbeing for blind and low-vision individuals.',
    '/images/articles/cat25/cover-059.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT25-060: Hearing Loss and Social Isolation: The Mental Health Impact 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Hearing Loss and Social Isolation: The Mental Health Impact of Communication Barriers',
    'hearing-loss-social-isolation',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['hearing loss mental health', 'social isolation hearing', 'hard of hearing depression', 'communication barriers', 'hearing loss loneliness'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-060',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How hearing loss drives social isolation, loneliness, and depression. Research on communication barriers, cognitive decline, and psychological interventions for hard-of-hearing adults.',
    '/images/articles/cat25/cover-060.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT25-061: Chronic Fatigue Syndrome and Psychological Wellbeing
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Chronic Fatigue Syndrome and Psychological Wellbeing',
    'chronic-fatigue-syndrome-wellbeing',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['chronic fatigue syndrome', 'ME/CFS', 'myalgic encephalomyelitis', 'CFS mental health', 'fatigue disability'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-061',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How ME/CFS affects psychological wellbeing beyond fatigue. Research on the neurological basis, stigma, psychological impact, and evidence-based management approaches.',
    '/images/articles/cat25/cover-061.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT25-062: Wheelchair Users and Mental Health: Mobility, Independence, 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Wheelchair Users and Mental Health: Mobility, Independence, and Attitude Barriers',
    'wheelchair-users-mental-health',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['wheelchair mental health', 'wheelchair users', 'mobility disability', 'wheelchair independence', 'accessibility mental health'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-062',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How wheelchair use intersects with mental health through mobility, independence, social attitudes, and identity. Research on psychological wellbeing for wheelchair users.',
    '/images/articles/cat25/cover-062.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT25-063: Down Syndrome and Mental Health: Supporting Emotional Wellbe
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Down Syndrome and Mental Health: Supporting Emotional Wellbeing',
    'down-syndrome-mental-health',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['Down syndrome mental health', 'Down syndrome depression', 'dual diagnosis', 'intellectual disability wellbeing', 'Down syndrome aging'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-063',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How to support the emotional wellbeing of people with Down syndrome. Research on dual diagnosis, depression, anxiety, dementia risk, and effective interventions.',
    '/images/articles/cat25/cover-063.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'universal-design-and-inclusion' AND category_id = v_cat_id;

  -- CAT25-064: Universal Design and Psychological Inclusion: Building a Wor
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Universal Design and Psychological Inclusion: Building a World That Works for Every Mind and Body',
    'universal-design-psychological-inclusion',
    'draft',
    'Disability, Accessibility & Psychological Inclusion',
    ARRAY['universal design', 'psychological inclusion', 'inclusive design', 'accessibility design', 'disability inclusion'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT25-064',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Universal design—building environments, products, and services for the widest range of human variation from the start—isn''t just good ethics. It''s better design. Here''s the psychology of inclusion.',
    '/images/articles/cat25/cover-064.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

END $$;

-- Category 26: forensic-legal-justice (64 articles)
DO $$
DECLARE
  v_cat_id UUID;
  v_sub_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'forensic-legal-justice';

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'forensic-assessment-and-evaluation' AND category_id = v_cat_id;

  -- CAT26-001: Forensic Psychological Assessment: Science in the Courtroom
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Forensic Psychological Assessment: Science in the Courtroom',
    'forensic-psychological-assessment',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['forensic assessment', 'psychological evaluation', 'expert testimony', 'forensic psychology', 'legal evaluation'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-001',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding forensic psychological assessment. Research on evaluation methods, reliability, expert testimony, ethical obligations, and the intersection of clinical science and legal decision-making.',
    '/images/articles/cat26/cover-001.svg',
    5,
    false,
    true,
    NULL,
    TRUE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT26-002: Violence Risk Assessment: Predicting Danger
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Violence Risk Assessment: Predicting Danger',
    'violence-risk-assessment',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['violence risk assessment', 'dangerousness prediction', 'HCR-20', 'risk factors violence', 'forensic assessment'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-002',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How forensic psychologists assess the risk of future violence. Research on risk factors, actuarial vs. structured professional judgment, accuracy, limitations, and the ethics of prediction.',
    '/images/articles/cat26/cover-002.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT26-003: Child Custody Evaluation: Psychology in Family Court
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Child Custody Evaluation: Psychology in Family Court',
    'child-custody-evaluation',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['child custody evaluation', 'forensic psychology', 'best interests of the child', 'parenting capacity', 'parental alienation'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-003',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding child custody evaluations in family court. Research on assessment methods, the best interests standard, parenting capacity, alienation claims, domestic violence considerations, and ethical challenges.',
    '/images/articles/cat26/cover-003.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT26-004: Eyewitness Testimony: The Psychology of Memory in the Courtr
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Eyewitness Testimony: The Psychology of Memory in the Courtroom',
    'eyewitness-testimony-memory',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['eyewitness testimony', 'memory reliability', 'wrongful conviction', 'lineup identification', 'forensic psychology'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-004',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of eyewitness testimony. Research on memory malleability, identification errors, wrongful convictions, cross-race identification, suggestive procedures, and evidence-based reforms.',
    '/images/articles/cat26/cover-004.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT26-005: False Confessions: Why Innocent People Confess to Crimes The
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'False Confessions: Why Innocent People Confess to Crimes They Didn\''t Commit',
    'false-confessions-psychology',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['false confessions', 'interrogation psychology', 'Reid technique', 'wrongful conviction', 'forensic psychology'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-005',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding false confessions. Research on interrogation psychology, the Reid Technique, coercive tactics, vulnerability factors, juveniles and intellectual disability, and evidence-based reforms.',
    '/images/articles/cat26/cover-005.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT26-006: Criminal Profiling: Separating Science from Myth
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Criminal Profiling: Separating Science from Myth',
    'criminal-profiling-science-myth',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['criminal profiling', 'behavioral analysis', 'FBI profiling', 'offender profiling', 'forensic psychology'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-006',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The truth about criminal profiling. Research on the accuracy of behavioral profiling, FBI methodology, scientific validity, alternative approaches, and the gap between media portrayal and evidence.',
    '/images/articles/cat26/cover-006.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT26-007: Malingering Detection in Forensic Settings
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Malingering Detection in Forensic Settings',
    'malingering-detection-forensic',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['malingering', 'symptom validity testing', 'forensic assessment', 'faking mental illness', 'forensic psychology'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-007',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding malingering in forensic psychology. Research on symptom fabrication, detection methods, validity testing, the difference between malingering and genuine illness, and ethical considerations.',
    '/images/articles/cat26/cover-007.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT26-008: Forensic Neuropsychology: The Brain on Trial
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Forensic Neuropsychology: The Brain on Trial',
    'forensic-neuropsychology',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['forensic neuropsychology', 'brain injury', 'neurolaw', 'neuroimaging court', 'TBI criminal behavior'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-008',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding forensic neuropsychology. Research on brain injury and criminal behavior, neuroimaging in court, cognitive assessment in legal proceedings, TBI and violence, and the neurolaw revolution.',
    '/images/articles/cat26/cover-008.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'forensic-ethics-and-professional-issues' AND category_id = v_cat_id;

  -- CAT26-009: Forensic Ethics: The Dual-Role Dilemma in Psychology and Law
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Forensic Ethics: The Dual-Role Dilemma in Psychology and Law',
    'forensic-ethics-dual-roles',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['forensic ethics', 'dual role', 'forensic psychology', 'expert witness', 'informed consent'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-009',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding ethical challenges in forensic psychology. Research on dual-role conflicts, objectivity, informed consent, confidentiality limits, cultural competence, and the tension between therapeutic and forensic obligations.',
    '/images/articles/cat26/cover-009.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT26-010: Expert Witness Testimony: How Psychology Enters the Courtroo
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Expert Witness Testimony: How Psychology Enters the Courtroom',
    'expert-witness-testimony-psychology',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['expert witness', 'forensic testimony', 'Daubert standard', 'courtroom psychology', 'forensic psychology'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-010',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding expert witness testimony in forensic psychology. Research on admissibility standards, Daubert criteria, jury persuasion, cross-examination challenges, cognitive bias, and best practices for forensic experts.',
    '/images/articles/cat26/cover-010.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT26-011: Civil Commitment: The Psychology and Ethics of Involuntary T
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Civil Commitment: The Psychology and Ethics of Involuntary Treatment',
    'civil-commitment-involuntary-treatment',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['civil commitment', 'involuntary treatment', 'psychiatric hospitalization', 'mental health law', 'forensic psychology'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-011',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding civil commitment and involuntary psychiatric treatment. Research on dangerousness criteria, prediction accuracy, patient rights, outpatient commitment, effectiveness evidence, and ethical controversies.',
    '/images/articles/cat26/cover-011.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT26-012: Jury Psychology: How Twelve People Make Life-Altering Decisi
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Jury Psychology: How Twelve People Make Life-Altering Decisions',
    'jury-psychology-decision-making',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['jury psychology', 'jury decision making', 'jury bias', 'trial psychology', 'forensic psychology'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-012',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding jury psychology and decision-making. Research on cognitive biases in jurors, group deliberation dynamics, pretrial publicity effects, story model theory, jury selection, and verdict reliability.',
    '/images/articles/cat26/cover-012.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'juvenile-justice-and-mental-health' AND category_id = v_cat_id;

  -- CAT26-013: Juvenile Justice and the Adolescent Brain
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Juvenile Justice and the Adolescent Brain',
    'juvenile-justice-adolescent-brain',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['juvenile justice', 'adolescent brain development', 'youth offending', 'juvenile court', 'forensic psychology'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-013',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The neuroscience behind juvenile justice reform. Research on adolescent brain development, youth culpability, Supreme Court rulings, developmental psychology, and age-appropriate interventions.',
    '/images/articles/cat26/cover-013.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT26-014: Youth Gang Involvement: Psychology and Prevention
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Youth Gang Involvement: Psychology and Prevention',
    'youth-gang-involvement-psychology',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['youth gangs', 'gang involvement', 'juvenile delinquency', 'gang prevention', 'forensic psychology'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-014',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of youth gang involvement. Research on risk factors, belonging and identity needs, gang desistance, community-based prevention, trauma, and evidence-based intervention programs.',
    '/images/articles/cat26/cover-014.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT26-015: School Shootings and Targeted Violence: What Psychology Know
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'School Shootings and Targeted Violence: What Psychology Knows',
    'school-shootings-targeted-violence',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['school shootings', 'targeted violence', 'threat assessment', 'behavioral threat assessment', 'school safety'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-015',
    v_cat_id,
    v_sub_id,
    'drafted',
    'What psychology research reveals about school shootings and targeted violence. Threat assessment, behavioral warning signs, the pathway to violence, prevention strategies, and the aftermath.',
    '/images/articles/cat26/cover-015.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT26-016: Juvenile Sexual Offending: Understanding, Assessment, and Tr
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Juvenile Sexual Offending: Understanding, Assessment, and Treatment',
    'juvenile-sex-offending',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['juvenile sex offender', 'adolescent sexual behavior', 'juvenile sexual offending', 'sex offender treatment', 'forensic psychology'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-016',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Evidence-based understanding of juvenile sexual offending. Research on prevalence, risk factors, the difference from adult offending, treatment effectiveness, recidivism rates, and policy implications.',
    '/images/articles/cat26/cover-016.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT26-017: Mental Health in Youth Detention: The Hidden Crisis
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Mental Health in Youth Detention: The Hidden Crisis',
    'youth-detention-mental-health',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['juvenile detention', 'youth mental health', 'incarcerated youth', 'juvenile justice', 'forensic psychology'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-017',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The mental health crisis in juvenile detention. Research on psychiatric disorders in detained youth, suicide risk, trauma, inadequate treatment, racial disparities, and evidence-based alternatives.',
    '/images/articles/cat26/cover-017.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT26-018: Juvenile Diversion: Keeping Youth Out of the System
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Juvenile Diversion: Keeping Youth Out of the System',
    'juvenile-diversion-programs',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['juvenile diversion', 'youth diversion programs', 'restorative justice youth', 'juvenile justice alternatives', 'forensic psychology'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-018',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How juvenile diversion programs keep youth out of the justice system. Research on effectiveness, restorative justice models, mental health diversion, recidivism reduction, and equitable implementation.',
    '/images/articles/cat26/cover-018.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'mental-health-in-the-justice-system' AND category_id = v_cat_id;

  -- CAT26-019: Mental Illness and Incarceration: A Crisis of Care
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Mental Illness and Incarceration: A Crisis of Care',
    'mental-illness-incarceration-crisis',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['mental illness incarceration', 'prison mental health', 'jail mental health', 'criminalization mental illness', 'forensic psychiatry'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-019',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How jails and prisons became the largest mental health facilities in the United States. Research on prevalence, inadequate treatment, solitary confinement, reentry challenges, and alternatives to incarceration.',
    '/images/articles/cat26/cover-019.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT26-020: Competency to Stand Trial: When Mental Illness Meets the Cou
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Competency to Stand Trial: When Mental Illness Meets the Courtroom',
    'competency-stand-trial',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['competency to stand trial', 'forensic evaluation', 'incompetent to stand trial', 'competency restoration', 'forensic psychology'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-020',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding competency to stand trial evaluations. Research on the legal standard, assessment methods, competency restoration, rights of defendants, and the limbo of incompetent defendants.',
    '/images/articles/cat26/cover-020.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT26-021: The Insanity Defense: Myths and Realities
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Insanity Defense: Myths and Realities',
    'insanity-defense-myths-realities',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['insanity defense', 'not guilty by reason of insanity', 'NGRI', 'M\', ', '],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-021',
    v_cat_id,
    v_sub_id,
    'drafted',
    'What the insanity defense really is. Research on legal standards, how rarely it''s used and how rarely it succeeds, what happens to acquittees, and the myths that distort public understanding.',
    '/images/articles/cat26/cover-021.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT26-022: Solitary Confinement: The Psychological Evidence
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Solitary Confinement: The Psychological Evidence',
    'solitary-confinement-psychological-effects',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['solitary confinement', 'isolation psychology', 'SHU', 'restrictive housing', 'prison psychology'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-022',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The devastating psychological effects of solitary confinement. Research on sensory deprivation, psychiatric symptoms, brain changes, human rights concerns, and alternatives to isolation.',
    '/images/articles/cat26/cover-022.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT26-023: Death Row and Mental Health
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Death Row and Mental Health',
    'death-row-mental-health',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['death row', 'capital punishment psychology', 'death row syndrome', 'competency for execution', 'forensic psychology'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-023',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychological effects of living on death row. Research on death row syndrome, mental illness among condemned prisoners, competency for execution, and the ethics of forensic involvement.',
    '/images/articles/cat26/cover-023.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT26-024: Prison Suicide: Risk Factors and Prevention
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Prison Suicide: Risk Factors and Prevention',
    'prison-suicide-prevention',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['prison suicide', 'jail suicide', 'suicide prevention corrections', 'inmate mental health', 'correctional suicide risk'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-024',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding suicide in prisons and jails. Research on risk factors, intake screening, environmental design, staff training, and evidence-based prevention programs.',
    '/images/articles/cat26/cover-024.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT26-025: Trauma and Incarceration: The Wounds That Prisons Carry
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Trauma and Incarceration: The Wounds That Prisons Carry',
    'trauma-incarceration',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['trauma incarceration', 'prison PTSD', 'trauma-informed corrections', 'ACEs criminal justice', 'prison trauma'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-025',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How prisons are filled with trauma survivors and how incarceration itself is traumatic. Research on childhood adversity, PTSD in prison, trauma-informed corrections, and breaking the trauma-crime cycle.',
    '/images/articles/cat26/cover-025.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT26-026: Women in the Criminal Justice System
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Women in the Criminal Justice System',
    'women-criminal-justice-system',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['women criminal justice', 'incarcerated women', 'gender-responsive corrections', 'women prison mental health', 'mothers in prison'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-026',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The unique mental health challenges of justice-involved women. Research on trauma pathways, incarcerated mothers, gender-responsive treatment, and why the system designed for men fails women.',
    '/images/articles/cat26/cover-026.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'psychology-of-criminal-behavior' AND category_id = v_cat_id;

  -- CAT26-027: The Psychology of Criminal Behavior: Nature, Nurture, and Ne
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Criminal Behavior: Nature, Nurture, and Neuroscience',
    'psychology-criminal-behavior',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['criminal psychology', 'criminal behavior', 'forensic psychology', 'criminology', 'criminal mind'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-027',
    v_cat_id,
    v_sub_id,
    'drafted',
    'What psychological science actually knows about why people commit crimes. Research on risk factors, neuroscience, adverse childhood experiences, and the limits of prediction.',
    '/images/articles/cat26/cover-027.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT26-028: Psychopathy: What Science Actually Knows
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Psychopathy: What Science Actually Knows',
    'psychopathy-what-science-knows',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['psychopathy', 'psychopath', 'antisocial personality', 'PCL-R', 'psychopathic traits'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-028',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Separating fact from fiction about psychopathy. Research on the PCL-R, neurobiological findings, the spectrum of psychopathic traits, treatment possibilities, and common misconceptions.',
    '/images/articles/cat26/cover-028.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT26-029: Antisocial Personality Disorder: Beyond the Label
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Antisocial Personality Disorder: Beyond the Label',
    'antisocial-personality-disorder-beyond-label',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['antisocial personality disorder', 'ASPD', 'conduct disorder', 'personality disorder', 'forensic psychology'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-029',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A comprehensive look at antisocial personality disorder—its diagnostic criteria, neurobiological roots, overlap with psychopathy, treatment possibilities, and the human beings behind the diagnosis.',
    '/images/articles/cat26/cover-029.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT26-030: The Psychology of Sexual Offending
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Sexual Offending',
    'psychology-sexual-offending',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['sexual offending', 'sex offender psychology', 'sexual violence prevention', 'forensic psychology', 'risk assessment'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-030',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Evidence-based examination of what drives sexual offending. Research on risk factors, typologies, assessment tools, treatment effectiveness, and prevention strategies.',
    '/images/articles/cat26/cover-030.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT26-031: Understanding Radicalization and Extremist Violence
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Understanding Radicalization and Extremist Violence',
    'understanding-radicalization-extremist-violence',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['radicalization', 'violent extremism', 'terrorism psychology', 'deradicalization', 'extremist violence'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-031',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of radicalization and violent extremism. Research on pathways to radicalization, risk factors, the role of ideology, online radicalization, deradicalization programs, and prevention.',
    '/images/articles/cat26/cover-031.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT26-032: Intimate Partner Violence: Perpetrator Psychology
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Intimate Partner Violence: Perpetrator Psychology',
    'intimate-partner-violence-perpetrator-psychology',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['intimate partner violence', 'domestic violence perpetrator', 'batterer psychology', 'IPV risk factors', 'domestic abuse'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-032',
    v_cat_id,
    v_sub_id,
    'drafted',
    'What drives intimate partner violence. Research on perpetrator typologies, risk factors, the cycle of violence, batterer intervention programs, and why understanding perpetrators is essential to protecting victims.',
    '/images/articles/cat26/cover-032.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT26-033: Substance Use and Criminal Behavior
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Substance Use and Criminal Behavior',
    'substance-use-criminal-behavior',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['substance use crime', 'drugs and crime', 'drug court', 'addiction criminal justice', 'substance abuse criminal behavior'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-033',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The complex relationship between substance use and crime. Research on the drugs-crime nexus, pharmacological vs. economic vs. systemic models, treatment as crime reduction, and drug court effectiveness.',
    '/images/articles/cat26/cover-033.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT26-034: Fire-Setting Behavior and Pyromania
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Fire-Setting Behavior and Pyromania',
    'fire-setting-behavior-pyromania',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['pyromania', 'fire-setting behavior', 'arson psychology', 'firesetter treatment', 'impulse control disorder'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-034',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding deliberate fire-setting behavior. Research on pyromania diagnosis, motivations for arson, risk factors, fire-setting typologies, treatment approaches, and prevention.',
    '/images/articles/cat26/cover-034.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT26-035: Stalking: Psychology and Impact
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Stalking: Psychology and Impact',
    'stalking-psychology-impact',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['stalking psychology', 'stalker typology', 'cyberstalking', 'stalking victim impact', 'harassment'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-035',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding the psychology of stalking. Research on stalker typologies, risk factors for violence, cyberstalking, psychological impact on victims, and effective interventions.',
    '/images/articles/cat26/cover-035.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT26-036: White-Collar Crime Psychology
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'White-Collar Crime Psychology',
    'white-collar-crime-psychology',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['white-collar crime', 'corporate crime', 'fraud psychology', 'financial crime', 'corporate psychopathy'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-036',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of white-collar crime. Research on personality traits, cognitive distortions, organizational cultures that enable fraud, and why intelligent, successful people commit financial crimes.',
    '/images/articles/cat26/cover-036.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'reentry-rehabilitation-and-prevention' AND category_id = v_cat_id;

  -- CAT26-037: Reentry After Incarceration: The Psychology of Coming Home
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Reentry After Incarceration: The Psychology of Coming Home',
    'reentry-after-incarceration',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['prisoner reentry', 'reintegration', 'post-incarceration', 'reentry programs', 'forensic psychology'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-037',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of prisoner reentry. Research on psychological adjustment, institutional identity, family reconnection, employment barriers, mental health needs, and evidence-based reentry programs.',
    '/images/articles/cat26/cover-037.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT26-038: Drug Courts and Therapeutic Jurisprudence
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Drug Courts and Therapeutic Jurisprudence',
    'drug-courts-therapeutic-jurisprudence',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['drug courts', 'therapeutic jurisprudence', 'substance abuse treatment', 'criminal justice reform', 'forensic psychology'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-038',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding drug courts and therapeutic jurisprudence. Research on treatment outcomes, recidivism reduction, judicial supervision, substance abuse treatment, cost-effectiveness, and criticisms.',
    '/images/articles/cat26/cover-038.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT26-039: Correctional Mental Health Treatment: Healing Behind Bars
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Correctional Mental Health Treatment: Healing Behind Bars',
    'correctional-mental-health-treatment',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['correctional mental health', 'prison treatment', 'incarcerated mental health', 'forensic psychology', 'correctional psychology'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-039',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Mental health treatment in prisons and jails. Research on incarcerated populations, constitutional requirements, evidence-based programs, challenges to treatment delivery, and reform approaches.',
    '/images/articles/cat26/cover-039.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT26-040: Sex Offender Registration: What the Research Shows About Pol
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Sex Offender Registration: What the Research Shows About Policy and Safety',
    'sex-offender-registration-policy',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['sex offender registry', 'Megan\', ', ', ', ', ', '],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-040',
    v_cat_id,
    v_sub_id,
    'drafted',
    'What research says about sex offender registries, notification laws, and residency restrictions. Evidence on effectiveness, unintended consequences, collateral damage, and evidence-based alternatives.',
    '/images/articles/cat26/cover-040.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT26-041: Mental Health Courts: Diverting the Mentally Ill from Incarc
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Mental Health Courts: Diverting the Mentally Ill from Incarceration',
    'mental-health-courts',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['mental health courts', 'diversion', 'criminal justice mental health', 'therapeutic jurisprudence', 'forensic psychology'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-041',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding mental health courts. Research on diversion from incarceration, treatment engagement, recidivism reduction, judicial supervision, participant outcomes, and implementation challenges.',
    '/images/articles/cat26/cover-041.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT26-042: Crime Prevention Through Environmental Design: How Spaces Sh
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Crime Prevention Through Environmental Design: How Spaces Shape Behavior',
    'crime-prevention-environmental-design',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['CPTED', 'crime prevention', 'environmental design', 'defensible space', 'urban psychology'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-042',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How environmental design prevents crime. Research on CPTED principles, natural surveillance, territorial reinforcement, defensible space, urban design psychology, and evidence-based approaches.',
    '/images/articles/cat26/cover-042.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT26-043: Collateral Consequences: How Criminal Records Shape Lives Be
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Collateral Consequences: How Criminal Records Shape Lives Beyond Sentences',
    'collateral-consequences-criminal-records',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['collateral consequences', 'criminal record', 'employment barriers', 'ban the box', 'reentry'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-043',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How criminal records affect employment, housing, education, and mental health. Research on stigma, ban-the-box policies, record expungement, psychological impact, and pathways to reintegration.',
    '/images/articles/cat26/cover-043.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT26-044: Trauma-Informed Corrections: Transforming the Culture of Inc
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Trauma-Informed Corrections: Transforming the Culture of Incarceration',
    'trauma-informed-corrections',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['trauma-informed corrections', 'incarceration trauma', 'correctional psychology', 'prison reform', 'trauma-informed care'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-044',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding trauma-informed corrections. Research on trauma prevalence among incarcerated populations, retraumatization in custody, staff training, institutional culture change, and evidence-based implementation.',
    '/images/articles/cat26/cover-044.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT26-045: Violence Prevention Programs: What Actually Works to Reduce 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Violence Prevention Programs: What Actually Works to Reduce Violence',
    'violence-prevention-programs',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['violence prevention', 'community violence', 'intervention programs', 'forensic psychology', 'public health approach'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-045',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding violence prevention programs. Research on public health approaches to violence, community-based interventions, cognitive-behavioral therapy, risk factors, hospital-based programs, and what reduces recidivism.',
    '/images/articles/cat26/cover-045.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'specialized-forensic-topics' AND category_id = v_cat_id;

  -- CAT26-046: Mass Shootings: Psychological Causes and Community Aftermath
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Mass Shootings: Psychological Causes and Community Aftermath',
    'mass-shootings-psychology-aftermath',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['mass shootings', 'mass violence', 'community trauma', 'gun violence', 'forensic psychology'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-046',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of mass shootings. Research on perpetrator characteristics, warning behaviors, contagion effects, community trauma, mental health responses, and evidence-based prevention approaches.',
    '/images/articles/cat26/cover-046.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT26-047: Wrongful Conviction: The Psychology of Innocence Lost
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Wrongful Conviction: The Psychology of Innocence Lost',
    'wrongful-conviction-psychology',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['wrongful conviction', 'exoneration', 'innocence', 'eyewitness error', 'false confession'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-047',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of wrongful conviction. Research on causes (eyewitness error, false confessions, tunnel vision), the psychological impact on exonerees, reentry challenges, and system reform.',
    '/images/articles/cat26/cover-047.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT26-048: Police Psychology: Mental Health of Law Enforcement Officers
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Police Psychology: Mental Health of Law Enforcement Officers',
    'police-psychology-mental-health',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['police psychology', 'law enforcement mental health', 'police PTSD', 'officer suicide', 'police stress'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-048',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The mental health of police officers. Research on occupational stress, PTSD, suicide risk, organizational stressors, officer wellness programs, peer support, and stigma reduction.',
    '/images/articles/cat26/cover-048.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT26-049: Terrorism Aftermath: Psychological Impact and Community Reco
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Terrorism Aftermath: Psychological Impact and Community Recovery',
    'terrorism-aftermath-recovery',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['terrorism psychology', 'terrorism PTSD', 'community recovery', 'mass trauma', 'forensic psychology'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-049',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychological impact of terrorism on individuals and communities. Research on PTSD, community resilience, media exposure effects, children''s responses, evidence-based interventions, and recovery.',
    '/images/articles/cat26/cover-049.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT26-050: Domestic Violence Courts: Specialized Justice for Intimate P
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Domestic Violence Courts: Specialized Justice for Intimate Partner Violence',
    'domestic-violence-courts',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['domestic violence court', 'intimate partner violence', 'batterer intervention', 'specialized courts', 'forensic psychology'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-050',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding domestic violence courts. Research on specialized court models, batterer intervention programs, victim safety, judicial monitoring, recidivism outcomes, and system coordination.',
    '/images/articles/cat26/cover-050.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT26-051: Sex Trafficking: Understanding Psychological Coercion and Co
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Sex Trafficking: Understanding Psychological Coercion and Control',
    'sex-trafficking-psychological-coercion',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['sex trafficking', 'human trafficking', 'psychological coercion', 'trauma bonding', 'complex PTSD'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-051',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding the psychological mechanisms of sex trafficking. Research on coercive control, trauma bonding, complex PTSD, identification challenges, survivor recovery, and victim-centered approaches.',
    '/images/articles/cat26/cover-051.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT26-052: Hate Crimes: The Psychology of Bias-Motivated Violence and I
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Hate Crimes: The Psychology of Bias-Motivated Violence and Its Impact',
    'hate-crimes-psychology-impact',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['hate crimes', 'bias-motivated violence', 'hate crime psychology', 'victim impact', 'forensic psychology'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-052',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding hate crime psychology. Research on perpetrator motivations, victim psychological impact, community-level effects, reporting barriers, prevention strategies, and the distinction between bias and mental illness.',
    '/images/articles/cat26/cover-052.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT26-053: Cybercrime Psychology: Understanding Digital Offending and I
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Cybercrime Psychology: Understanding Digital Offending and Its Impact',
    'cybercrime-psychology-digital-offending',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['cybercrime psychology', 'online disinhibition', 'cyberbullying', 'digital forensics', 'internet crime'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-053',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding the psychology of cybercrime. Research on cybercriminal motivations, online disinhibition, cyberbullying, identity theft, online harassment, victim impact, and the psychology of digital deception.',
    '/images/articles/cat26/cover-053.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT26-054: Elder Abuse: The Hidden Epidemic and Forensic Psychology\''s
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Elder Abuse: The Hidden Epidemic and Forensic Psychology\''s Role',
    'elder-abuse-forensic-psychology',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['elder abuse', 'forensic psychology', 'financial exploitation', 'capacity evaluation', 'older adults'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-054',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding elder abuse from a forensic psychology perspective. Research on prevalence, types, perpetrator psychology, capacity evaluation, financial exploitation, detection challenges, and intervention strategies.',
    '/images/articles/cat26/cover-054.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT26-055: Forensic Interviewing of Children: Getting the Truth Without
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Forensic Interviewing of Children: Getting the Truth Without Causing Harm',
    'forensic-interviewing-children',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['forensic interviewing', 'child witnesses', 'child suggestibility', 'NICHD protocol', 'child abuse investigation'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-055',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding forensic interviewing of children. Research on child memory development, suggestibility, evidence-based protocols, NICHD interview, false allegations, disclosure patterns, and interviewer training.',
    '/images/articles/cat26/cover-055.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT26-056: The Psychology of Sentencing: How Punishment Decisions Are R
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Sentencing: How Punishment Decisions Are Really Made',
    'sentencing-psychology-punishment',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['sentencing psychology', 'judicial decision making', 'sentencing disparities', 'punishment', 'forensic psychology'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-056',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding the psychology of criminal sentencing. Research on judicial decision-making, cognitive biases, racial disparities, anchoring effects, victim impact, extralegal factors, and sentencing reform.',
    '/images/articles/cat26/cover-056.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT26-057: Death Notification: The Psychology of Delivering the Worst N
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Death Notification: The Psychology of Delivering the Worst News',
    'death-notification-psychology',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['death notification', 'traumatic bereavement', 'grief psychology', 'first responders', 'forensic psychology'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-057',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding death notification psychology. Research on notification procedures, survivor reactions, complicated grief, traumatic bereavement, first responder impact, evidence-based protocols, and cultural considerations.',
    '/images/articles/cat26/cover-057.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT26-058: The Future of Forensic Psychology: Where Science Meets Justi
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Future of Forensic Psychology: Where Science Meets Justice',
    'future-forensic-psychology',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['future forensic psychology', 'AI criminal justice', 'neuroscience law', 'algorithmic bias', 'forensic innovation'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-058',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Exploring the future of forensic psychology. Research on AI in criminal justice, neuroscience and the law, virtual reality assessment, algorithmic bias, genomics, digital forensics, and evolving ethical challenges.',
    '/images/articles/cat26/cover-058.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'victims-and-survivors' AND category_id = v_cat_id;

  -- CAT26-059: The Psychology of Victimization
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Victimization',
    'psychology-victimization',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['crime victim psychology', 'victimization', 'victim PTSD', 'secondary victimization', 'victim recovery'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-059',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How criminal victimization affects mental health. Research on PTSD, victim reactions, secondary victimization, victim services, and evidence-based approaches to recovery.',
    '/images/articles/cat26/cover-059.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT26-060: Sexual Assault Survivors: The Path to Recovery
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Sexual Assault Survivors: The Path to Recovery',
    'sexual-assault-survivors-recovery',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['sexual assault recovery', 'rape trauma', 'sexual violence PTSD', 'survivor psychology', 'sexual assault treatment'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-060',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding the psychological aftermath of sexual assault. Research on trauma responses, rape trauma syndrome, barriers to reporting, evidence-based treatment, and recovery pathways.',
    '/images/articles/cat26/cover-060.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT26-061: Child Abuse: Long-Term Psychological Effects
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Child Abuse: Long-Term Psychological Effects',
    'child-abuse-long-term-effects',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['child abuse effects', 'childhood trauma', 'ACEs', 'child abuse recovery', 'developmental trauma'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-061',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The lasting psychological impact of child abuse. Research on developmental effects, ACEs, brain development, intergenerational transmission, and evidence-based treatment for adult survivors.',
    '/images/articles/cat26/cover-061.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT26-062: Homicide Survivors: Grief After Murder
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Homicide Survivors: Grief After Murder',
    'homicide-survivors-grief',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['homicide grief', 'murder bereavement', 'co-victim', 'traumatic grief', 'complicated grief'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-062',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding the grief of homicide co-victims. Research on traumatic bereavement, complicated grief, the criminal justice process, and evidence-based support for families of murder victims.',
    '/images/articles/cat26/cover-062.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT26-063: Human Trafficking: The Psychological Impact
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Human Trafficking: The Psychological Impact',
    'human-trafficking-psychological-impact',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['human trafficking psychology', 'trafficking survivor', 'trauma bonding', 'complex PTSD trafficking', 'modern slavery'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-063',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The devastating psychological effects of human trafficking. Research on trauma bonding, complex PTSD, identification barriers, survivor recovery, and trauma-informed services.',
    '/images/articles/cat26/cover-063.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT26-064: Restorative Justice: Healing Through Accountability
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Restorative Justice: Healing Through Accountability',
    'restorative-justice-healing',
    'draft',
    'Forensic Psychology & Criminal Justice Mental Health',
    ARRAY['restorative justice', 'victim-offender mediation', 'restorative practices', 'healing justice', 'crime victim healing'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT26-064',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How restorative justice addresses crime''s psychological impact. Research on victim-offender dialogue, healing outcomes, satisfaction rates, and when restorative approaches work best.',
    '/images/articles/cat26/cover-064.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

END $$;

-- Category 27: military-veterans-firstresponder (44 articles)
DO $$
DECLARE
  v_cat_id UUID;
  v_sub_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'military-veterans-firstresponder';

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'combat-related-mental-health' AND category_id = v_cat_id;

  -- CAT27-001: Military PTSD: Understanding Combat Trauma and Its Aftermath
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Military PTSD: Understanding Combat Trauma and Its Aftermath',
    'military-ptsd-combat-trauma',
    'draft',
    'Military, Veterans & First Responder Mental Health',
    ARRAY['military PTSD', 'combat trauma', 'veteran mental health', 'post-traumatic stress', 'military psychology'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT27-001',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding military PTSD and combat trauma. Research on prevalence among veterans, neurobiological changes, evidence-based treatments, barriers to care, comorbidity, and the path to recovery.',
    '/images/articles/cat27/cover-001.svg',
    5,
    false,
    true,
    NULL,
    TRUE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT27-002: Moral Injury: The Invisible Wound That PTSD Doesn\''t Captur
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Moral Injury: The Invisible Wound That PTSD Doesn\''t Capture',
    'moral-injury-beyond-ptsd',
    'draft',
    'Military, Veterans & First Responder Mental Health',
    ARRAY['moral injury', 'military mental health', 'combat guilt', 'veteran psychology', 'moral repair'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT27-002',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding moral injury in military and first responder contexts. Research on definition, distinction from PTSD, guilt and shame, spiritual crisis, treatment approaches, and the path to moral repair.',
    '/images/articles/cat27/cover-002.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT27-003: Military Traumatic Brain Injury: The Signature Wound of Mode
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Military Traumatic Brain Injury: The Signature Wound of Modern Warfare',
    'traumatic-brain-injury-military',
    'draft',
    'Military, Veterans & First Responder Mental Health',
    ARRAY['military TBI', 'traumatic brain injury', 'blast injury', 'veteran brain health', 'mild TBI'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT27-003',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding military traumatic brain injury. Research on blast-related TBI, mild TBI diagnosis, neuropsychological effects, PTSD overlap, chronic traumatic encephalopathy, treatment, and long-term outcomes.',
    '/images/articles/cat27/cover-003.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT27-004: Military Sexual Trauma: The Crisis Within the Ranks
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Military Sexual Trauma: The Crisis Within the Ranks',
    'military-sexual-trauma',
    'draft',
    'Military, Veterans & First Responder Mental Health',
    ARRAY['military sexual trauma', 'MST', 'sexual assault military', 'veteran sexual trauma', 'institutional betrayal'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT27-004',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding military sexual trauma (MST). Research on prevalence, psychological impact, reporting barriers, institutional betrayal, VA treatment services, gender differences, and evidence-based recovery.',
    '/images/articles/cat27/cover-004.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT27-005: Veteran Suicide: Understanding the Crisis and Saving Lives
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Veteran Suicide: Understanding the Crisis and Saving Lives',
    'veteran-suicide-prevention',
    'draft',
    'Military, Veterans & First Responder Mental Health',
    ARRAY['veteran suicide', 'suicide prevention', 'military mental health', 'veteran crisis', 'lethal means'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT27-005',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding veteran suicide. Research on prevalence, risk factors, the role of firearms, transition-related risk, lethal means counseling, VA suicide prevention programs, and evidence-based interventions.',
    '/images/articles/cat27/cover-005.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT27-006: Substance Use in the Military: Self-Medication, Culture, and
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Substance Use in the Military: Self-Medication, Culture, and Recovery',
    'military-substance-use',
    'draft',
    'Military, Veterans & First Responder Mental Health',
    ARRAY['military substance use', 'veteran addiction', 'alcohol military', 'opioid veterans', 'self-medication PTSD'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT27-006',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding substance use in military and veteran populations. Research on alcohol culture, self-medication, opioid crisis, prescription drug misuse, combat-related risk factors, and evidence-based treatment.',
    '/images/articles/cat27/cover-006.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'first-responder-mental-health' AND category_id = v_cat_id;

  -- CAT27-007: First Responder PTSD: The Cost of Running Toward Danger
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'First Responder PTSD: The Cost of Running Toward Danger',
    'first-responder-ptsd',
    'draft',
    'Military, Veterans & First Responder Mental Health',
    ARRAY['first responder PTSD', 'firefighter mental health', 'police PTSD', 'EMT trauma', 'first responder suicide'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT27-007',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding PTSD in first responders. Research on prevalence among firefighters, police, EMTs, 911 dispatchers, cumulative trauma exposure, occupational culture barriers, treatment, and peer support programs.',
    '/images/articles/cat27/cover-007.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT27-008: Police Officer Mental Health: The Psychological Cost of Prot
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Police Officer Mental Health: The Psychological Cost of Protecting and Serving',
    'police-officer-mental-health',
    'draft',
    'Military, Veterans & First Responder Mental Health',
    ARRAY['police mental health', 'law enforcement psychology', 'police PTSD', 'police suicide', 'police burnout'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT27-008',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding mental health challenges among police officers. Research on occupational stress, PTSD, depression, suicide, organizational stressors, stigma, use of force trauma, and evidence-based support programs.',
    '/images/articles/cat27/cover-008.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT27-009: Firefighter Mental Health and Suicide: When the Bravest Are 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Firefighter Mental Health and Suicide: When the Bravest Are Burning Out',
    'firefighter-mental-health-suicide',
    'draft',
    'Military, Veterans & First Responder Mental Health',
    ARRAY['firefighter mental health', 'firefighter suicide', 'firefighter PTSD', 'fire service wellness', 'first responder burnout'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT27-009',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding mental health challenges and suicide risk among firefighters. Research on PTSD prevalence, cumulative trauma, sleep deprivation, occupational cancer, cultural barriers, peer support, and evidence-based wellness programs.',
    '/images/articles/cat27/cover-009.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT27-010: EMT and Paramedic Compassion Fatigue: The Toll of Emergency 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'EMT and Paramedic Compassion Fatigue: The Toll of Emergency Medicine',
    'emt-paramedic-compassion-fatigue',
    'draft',
    'Military, Veterans & First Responder Mental Health',
    ARRAY['EMT mental health', 'paramedic compassion fatigue', 'EMS burnout', 'emergency medical services', 'paramedic PTSD'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT27-010',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding compassion fatigue and mental health in EMTs and paramedics. Research on burnout, secondary traumatic stress, PTSD prevalence, system understaffing, emotional labor, and recovery strategies for EMS professionals.',
    '/images/articles/cat27/cover-010.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT27-011: 911 Dispatcher Mental Health: The Invisible First Responders
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    '911 Dispatcher Mental Health: The Invisible First Responders',
    'dispatcher-mental-health',
    'draft',
    'Military, Veterans & First Responder Mental Health',
    ARRAY['911 dispatcher mental health', 'telecommunicator PTSD', 'dispatcher burnout', 'vicarious trauma', 'emergency communications'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT27-011',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding mental health challenges among 911 dispatchers and telecommunicators. Research on vicarious trauma, PTSD prevalence, acute peritraumatic stress, helplessness, burnout, and the fight for first responder recognition.',
    '/images/articles/cat27/cover-011.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT27-012: First Responder Substance Use: Self-Medicating the Stress of
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'First Responder Substance Use: Self-Medicating the Stress of Service',
    'first-responder-substance-use',
    'draft',
    'Military, Veterans & First Responder Mental Health',
    ARRAY['first responder substance use', 'police alcohol', 'firefighter drinking', 'EMS substance abuse', 'first responder addiction'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT27-012',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding substance use among first responders. Research on alcohol use in police, firefighters, and EMS, cultural normalization, self-medication for PTSD and insomnia, barriers to treatment, and recovery-supportive interventions.',
    '/images/articles/cat27/cover-012.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT27-013: First Responder Families: Living with Someone Who Serves
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'First Responder Families: Living with Someone Who Serves',
    'first-responder-families',
    'draft',
    'Military, Veterans & First Responder Mental Health',
    ARRAY['first responder families', 'police spouse', 'firefighter family', 'secondary trauma', 'first responder divorce'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT27-013',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding the psychological impact on first responder families. Research on secondary trauma in spouses, child adjustment, shift work effects, hypervigilance at home, relationship strain, and family resilience strategies.',
    '/images/articles/cat27/cover-013.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT27-014: Correctional Officer Mental Health: The Forgotten First Resp
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Correctional Officer Mental Health: The Forgotten First Responders',
    'correctional-officer-mental-health',
    'draft',
    'Military, Veterans & First Responder Mental Health',
    ARRAY['correctional officer mental health', 'prison guard PTSD', 'corrections burnout', 'correctional staff wellness', 'jail officer stress'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT27-014',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding mental health challenges among correctional officers. Research on PTSD, burnout, violence exposure, chronic hypervigilance, suicide risk, understaffing, and the psychological toll of working inside prisons and jails.',
    '/images/articles/cat27/cover-014.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT27-015: Wildland Firefighter Mental Health: The Psychological Cost o
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Wildland Firefighter Mental Health: The Psychological Cost of Fighting Nature\''s Fires',
    'wildland-firefighter-mental-health',
    'draft',
    'Military, Veterans & First Responder Mental Health',
    ARRAY['wildland firefighter mental health', 'wildfire firefighter PTSD', 'hotshot crew psychology', 'wildland fire burnout', 'smokejumper mental health'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT27-015',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding mental health challenges facing wildland firefighters. Research on seasonal deployment stress, burnout cascades, fatality exposure, climate change impacts, isolation, crew cohesion, and evidence-based support for wildland fire personnel.',
    '/images/articles/cat27/cover-015.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT27-016: Search and Rescue Psychology: The Mental Health of Those Who
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Search and Rescue Psychology: The Mental Health of Those Who Find the Lost',
    'search-rescue-psychology',
    'draft',
    'Military, Veterans & First Responder Mental Health',
    ARRAY['search and rescue psychology', 'SAR mental health', 'mountain rescue psychology', 'body recovery trauma', 'search and rescue PTSD'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT27-016',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding the psychological impact of search and rescue operations on SAR personnel. Research on body recovery trauma, failed search distress, volunteer burnout, disaster response, mountain rescue, and evidence-based support for SAR teams.',
    '/images/articles/cat27/cover-016.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'military-culture-and-psychology' AND category_id = v_cat_id;

  -- CAT27-017: Military Resilience and Post-Traumatic Growth: Finding Stren
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Military Resilience and Post-Traumatic Growth: Finding Strength After Service',
    'military-resilience-posttraumatic-growth',
    'draft',
    'Military, Veterans & First Responder Mental Health',
    ARRAY['military resilience', 'post-traumatic growth', 'veteran resilience', 'combat growth', 'psychological resilience'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT27-017',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding resilience and post-traumatic growth in military and veteran populations. Research on psychological resilience factors, meaning-making after combat, growth trajectories, Master Resilience Training, and the balance between honoring suffering and recognizing growth.',
    '/images/articles/cat27/cover-017.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT27-018: Military Culture and Mental Health Stigma: Why Warriors Won\
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Military Culture and Mental Health Stigma: Why Warriors Won\''t Ask for Help',
    'military-culture-mental-health-stigma',
    'draft',
    'Military, Veterans & First Responder Mental Health',
    ARRAY['military stigma', 'mental health stigma', 'warrior culture', 'help-seeking barriers', 'military mental health'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT27-018',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding how military culture creates barriers to mental health treatment. Research on stigma, warrior ethos, help-seeking barriers, leadership influence, institutional policies, and evidence-based stigma reduction strategies.',
    '/images/articles/cat27/cover-018.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT27-019: Reserve and National Guard Mental Health: The Unique Challen
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Reserve and National Guard Mental Health: The Unique Challenges of Part-Time Warriors',
    'reserve-national-guard-mental-health',
    'draft',
    'Military, Veterans & First Responder Mental Health',
    ARRAY['National Guard mental health', 'Reserve component', 'citizen soldier', 'Guard deployment', 'Reserve PTSD'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT27-019',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding mental health challenges facing Reserve and National Guard members. Research on deployment stress for citizen-soldiers, reintegration difficulties, limited post-deployment support, dual identity challenges, and access to care barriers.',
    '/images/articles/cat27/cover-019.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT27-020: The Psychology of Deployment: Understanding the Emotional Cy
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Deployment: Understanding the Emotional Cycle of Military Service',
    'deployment-psychology-cycle',
    'draft',
    'Military, Veterans & First Responder Mental Health',
    ARRAY['deployment psychology', 'military deployment', 'deployment cycle', 'homecoming adjustment', 'reintegration'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT27-020',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding the psychological phases of military deployment. Research on pre-deployment anxiety, deployment stress and adaptation, homecoming challenges, reintegration difficulties, the emotional cycle model, and family adjustment across the deployment cycle.',
    '/images/articles/cat27/cover-020.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT27-021: Military Leadership and Mental Health: The Psychological Bur
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Military Leadership and Mental Health: The Psychological Burden of Command',
    'military-leadership-mental-health',
    'draft',
    'Military, Veterans & First Responder Mental Health',
    ARRAY['military leadership', 'command stress', 'officer mental health', 'military psychology', 'leadership burden'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT27-021',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding the unique mental health challenges of military leaders. Research on command responsibility stress, moral decision-making under fire, leader self-care barriers, organizational influence on unit mental health, and the psychology of sending others into danger.',
    '/images/articles/cat27/cover-021.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT27-022: Combat Medics and Military Healthcare Providers: The Trauma 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Combat Medics and Military Healthcare Providers: The Trauma of Treating Trauma',
    'combat-medic-provider-stress',
    'draft',
    'Military, Veterans & First Responder Mental Health',
    ARRAY['combat medic PTSD', 'military healthcare', 'medic mental health', 'military nurse stress', 'combat surgeon'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT27-022',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding the unique mental health challenges of combat medics and military healthcare providers. Research on dual role stress, triage moral injury, mass casualty impact, combat surgical teams, and provider-specific PTSD.',
    '/images/articles/cat27/cover-022.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT27-023: Military Chaplaincy and Spiritual Care: Faith at the Interse
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Military Chaplaincy and Spiritual Care: Faith at the Intersection of Service and Suffering',
    'military-chaplaincy-spiritual-care',
    'draft',
    'Military, Veterans & First Responder Mental Health',
    ARRAY['military chaplain', 'spiritual care', 'military faith', 'chaplain counseling', 'moral injury faith'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT27-023',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding the role of military chaplains in mental health support. Research on spiritual care in the military, chaplain counseling utilization, moral injury and faith, spiritual fitness, religious coping after combat, and the chaplain-clinician partnership.',
    '/images/articles/cat27/cover-023.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT27-024: Special Operations Forces Mental Health: The Psychological C
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Special Operations Forces Mental Health: The Psychological Cost of Elite Service',
    'special-operations-forces-mental-health',
    'draft',
    'Military, Veterans & First Responder Mental Health',
    ARRAY['special operations mental health', 'SOF PTSD', 'special forces psychology', 'elite military mental health', 'Navy SEAL mental health'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT27-024',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding the unique mental health challenges facing special operations forces personnel. Research on SOF PTSD rates, moral injury, operational tempo, selection psychology, identity challenges, and evidence-based treatment approaches.',
    '/images/articles/cat27/cover-024.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT27-025: Drone Warfare and Remote Combat: The Psychological Impact of
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Drone Warfare and Remote Combat: The Psychological Impact of Killing from a Distance',
    'drone-warfare-psychological-impact',
    'draft',
    'Military, Veterans & First Responder Mental Health',
    ARRAY['drone warfare psychology', 'RPA operator mental health', 'drone pilot PTSD', 'remote combat stress', 'unmanned aerial vehicle psychology'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT27-025',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding the psychological impact of drone warfare on remote combat operators. Research on RPA crew PTSD, moral injury, intimacy of surveillance, shift work stress, warrior identity conflict, and mental health support for drone operators.',
    '/images/articles/cat27/cover-025.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT27-026: Military Sleep Disorders: The Hidden Casualty of Service
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Military Sleep Disorders: The Hidden Casualty of Service',
    'military-sleep-disorders',
    'draft',
    'Military, Veterans & First Responder Mental Health',
    ARRAY['military sleep disorders', 'veteran insomnia', 'military nightmares', 'veteran sleep apnea', 'PTSD sleep problems'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT27-026',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding sleep disorders in military personnel and veterans. Research on insomnia, nightmares, obstructive sleep apnea, PTSD-related sleep disruption, deployment effects, and evidence-based treatment approaches.',
    '/images/articles/cat27/cover-026.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT27-027: Military Justice and Mental Health: When the System Judges I
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Military Justice and Mental Health: When the System Judges Its Own',
    'military-justice-mental-health',
    'draft',
    'Military, Veterans & First Responder Mental Health',
    ARRAY['military justice mental health', 'UCMJ mental illness', 'bad conduct discharge', 'military confinement psychology', 'less than honorable discharge'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT27-027',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding the intersection of military justice and mental health. Research on UCMJ and mental illness, bad conduct discharges, court-martial psychology, military confinement, less-than-honorable discharges, and the impact on veteran benefits.',
    '/images/articles/cat27/cover-027.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'military-families' AND category_id = v_cat_id;

  -- CAT27-028: Military Children and Adolescent Mental Health: Growing Up i
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Military Children and Adolescent Mental Health: Growing Up in the Shadow of Service',
    'military-children-mental-health',
    'draft',
    'Military, Veterans & First Responder Mental Health',
    ARRAY['military children mental health', 'military kid psychology', 'deployment effects children', 'military family children', 'military child resilience'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT27-028',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding mental health challenges facing military children and adolescents. Research on deployment effects, relocation stress, parental PTSD impact, resilience factors, school transitions, and support programs for military-connected youth.',
    '/images/articles/cat27/cover-028.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT27-029: Military Families: The Psychological Impact of Deployment an
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Military Families: The Psychological Impact of Deployment and Service',
    'military-families-deployment-impact',
    'draft',
    'Military, Veterans & First Responder Mental Health',
    ARRAY['military families', 'deployment impact', 'military children', 'military spouse', 'family reintegration'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT27-029',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding how military service affects families. Research on deployment stress, military children, spouse mental health, reintegration challenges, resilience factors, and family support programs.',
    '/images/articles/cat27/cover-029.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT27-030: Military Marriage: Love, Service, and the Strain Between
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Military Marriage: Love, Service, and the Strain Between',
    'military-marriage-relationships',
    'draft',
    'Military, Veterans & First Responder Mental Health',
    ARRAY['military marriage', 'military relationships', 'deployment marriage', 'veteran couples', 'military divorce'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT27-030',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding military marriage. Research on divorce rates, deployment strain, PTSD effects on relationships, communication challenges, infidelity, domestic violence, and evidence-based couples therapy for military populations.',
    '/images/articles/cat27/cover-030.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'transition-and-reintegration' AND category_id = v_cat_id;

  -- CAT27-031: Veteran Identity and Civilian Life: Who Am I Without the Uni
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Veteran Identity and Civilian Life: Who Am I Without the Uniform?',
    'veteran-identity-civilian-life',
    'draft',
    'Military, Veterans & First Responder Mental Health',
    ARRAY['veteran identity', 'military identity', 'civilian transition', 'veteran purpose', 'post-military life'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT27-031',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding the identity challenges veterans face in civilian life. Research on military identity loss, role transition, purpose and belonging, civilian cultural adjustment, veteran identity integration, and finding meaning after service.',
    '/images/articles/cat27/cover-031.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT27-032: Veteran Employment and Workplace Mental Health: Translating 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Veteran Employment and Workplace Mental Health: Translating Military Skills to Civilian Careers',
    'veteran-employment-workplace',
    'draft',
    'Military, Veterans & First Responder Mental Health',
    ARRAY['veteran employment', 'military skills translation', 'veteran hiring', 'veteran workplace', 'veteran career'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT27-032',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding employment challenges facing veterans. Research on skills translation barriers, employer misconceptions, workplace PTSD accommodation, underemployment, veteran entrepreneurship, and evidence-based transition programs.',
    '/images/articles/cat27/cover-032.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT27-033: Military-to-Civilian Transition: The Psychology of Coming Ho
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Military-to-Civilian Transition: The Psychology of Coming Home',
    'military-transition-civilian-life',
    'draft',
    'Military, Veterans & First Responder Mental Health',
    ARRAY['military transition', 'civilian reintegration', 'veteran identity', 'post-military life', 'military separation'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT27-033',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding the psychology of military-to-civilian transition. Research on identity loss, purpose void, social disconnection, employment challenges, family reintegration, and evidence-based transition support.',
    '/images/articles/cat27/cover-033.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT27-034: Veteran Homelessness: How Those Who Served End Up on the Str
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Veteran Homelessness: How Those Who Served End Up on the Streets',
    'veteran-homelessness',
    'draft',
    'Military, Veterans & First Responder Mental Health',
    ARRAY['veteran homelessness', 'homeless veterans', 'Housing First', 'VA housing', 'veteran mental health'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT27-034',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding veteran homelessness. Research on prevalence, risk factors, mental health and substance use pathways, Housing First model, VA programs, and the intersection of trauma, poverty, and social disconnection.',
    '/images/articles/cat27/cover-034.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'treatment-and-recovery' AND category_id = v_cat_id;

  -- CAT27-035: Service Dogs and Animal-Assisted Therapy for Veterans: Heali
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Service Dogs and Animal-Assisted Therapy for Veterans: Healing Through the Human-Animal Bond',
    'service-dogs-animal-therapy-veterans',
    'draft',
    'Military, Veterans & First Responder Mental Health',
    ARRAY['veteran service dog', 'PTSD service dog', 'equine therapy veterans', 'animal-assisted therapy', 'veteran dog therapy'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT27-035',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding the role of service dogs and animal-assisted therapy in veteran mental health. Research on PTSD service dogs, equine therapy, the human-animal bond, hypervigilance management, emotional regulation, and evidence-based animal-assisted interventions.',
    '/images/articles/cat27/cover-035.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT27-036: Veteran Peer Support Programs: When Those Who Understand Lea
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Veteran Peer Support Programs: When Those Who Understand Lead the Way to Healing',
    'veteran-peer-support-programs',
    'draft',
    'Military, Veterans & First Responder Mental Health',
    ARRAY['veteran peer support', 'peer specialist veteran', 'veteran mental health programs', 'peer counseling veterans', 'veteran-to-veteran support'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT27-036',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding veteran peer support programs and their role in mental health recovery. Research on peer specialist effectiveness, veteran-to-veteran connection, VA peer support, community-based programs, lived experience, and outcomes data.',
    '/images/articles/cat27/cover-036.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT27-037: First Responder Resilience Programs: Building Psychological 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'First Responder Resilience Programs: Building Psychological Armor Before the Call',
    'first-responder-resilience-programs',
    'draft',
    'Military, Veterans & First Responder Mental Health',
    ARRAY['first responder resilience', 'police wellness program', 'firefighter resilience training', 'first responder wellness', 'critical incident stress management'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT27-037',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding evidence-based resilience programs for first responders. Research on stress inoculation, peer support effectiveness, critical incident management, organizational wellness, resilience training outcomes, and program implementation.',
    '/images/articles/cat27/cover-037.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT27-038: The Future of Military and First Responder Mental Health: In
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Future of Military and First Responder Mental Health: Innovation, Integration, and Institutional Change',
    'future-military-mental-health',
    'draft',
    'Military, Veterans & First Responder Mental Health',
    ARRAY['future military mental health', 'psychedelic therapy veterans', 'AI mental health screening', 'digital therapeutics PTSD', 'veteran mental health innovation'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT27-038',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Exploring the future of military and first responder mental health. Research on psychedelic therapy, AI-assisted screening, digital therapeutics, genomic resilience, institutional reform, and emerging evidence-based innovations.',
    '/images/articles/cat27/cover-038.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'veteran-specific-issues' AND category_id = v_cat_id;

  -- CAT27-039: Women Veterans\'' Mental Health: The Invisible Majority
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Women Veterans\'' Mental Health: The Invisible Majority',
    'women-veterans-mental-health',
    'draft',
    'Military, Veterans & First Responder Mental Health',
    ARRAY['women veterans', 'female veteran mental health', 'military sexual trauma', 'women in combat', 'VA healthcare women'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT27-039',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding mental health challenges facing women veterans. Research on military sexual trauma, gender-specific PTSD, VA healthcare barriers, combat exposure, identity invisibility, reproductive health, and tailored treatment approaches.',
    '/images/articles/cat27/cover-039.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT27-040: LGBTQ+ Veterans: Service, Secrecy, and the Scars of Don\''t 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'LGBTQ+ Veterans: Service, Secrecy, and the Scars of Don\''t Ask, Don\''t Tell',
    'lgbtq-veterans-mental-health',
    'draft',
    'Military, Veterans & First Responder Mental Health',
    ARRAY['LGBTQ veterans', 'Don\', 't Tell', 'transgender veterans', 'veteran minority stress'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT27-040',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding mental health challenges facing LGBTQ+ veterans. Research on Don''t Ask Don''t Tell psychological impact, identity concealment, minority stress, transgender veteran healthcare, discharge discrimination, and inclusive VA care.',
    '/images/articles/cat27/cover-040.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT27-041: Veteran Aging and Late-Onset PTSD: When the Past Catches Up
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Veteran Aging and Late-Onset PTSD: When the Past Catches Up',
    'veteran-aging-late-onset-ptsd',
    'draft',
    'Military, Veterans & First Responder Mental Health',
    ARRAY['veteran aging', 'late-onset PTSD', 'aging veterans', 'delayed PTSD', 'Vietnam veteran'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT27-041',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding late-onset and reactivated PTSD in aging veterans. Research on delayed trauma responses, retirement triggers, cognitive decline, Vietnam-era veterans, loss of coping structures, and treatment approaches for older veterans.',
    '/images/articles/cat27/cover-041.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT27-042: Navigating the VA Healthcare System: A Guide to Mental Healt
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Navigating the VA Healthcare System: A Guide to Mental Health Services for Veterans',
    'va-healthcare-navigation',
    'draft',
    'Military, Veterans & First Responder Mental Health',
    ARRAY['VA mental health', 'veteran healthcare', 'VA enrollment', 'veteran therapy', 'VA services'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT27-042',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A comprehensive guide to VA mental health services for veterans. Information on eligibility, enrollment, evidence-based treatments, crisis services, community care options, telehealth, vet centers, and overcoming barriers to access.',
    '/images/articles/cat27/cover-042.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT27-043: Gulf War Illness: The Invisible Wounds of a Forgotten War
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Gulf War Illness: The Invisible Wounds of a Forgotten War',
    'gulf-war-illness',
    'draft',
    'Military, Veterans & First Responder Mental Health',
    ARRAY['Gulf War Illness', 'Gulf War syndrome', '1991 veteran health', 'chronic multisymptom illness', 'deployment exposures'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT27-043',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding Gulf War Illness and its psychological impact. Research on prevalence among 1990-91 veterans, neurological effects, environmental exposures, contested diagnosis, psychological comorbidities, and treatment approaches.',
    '/images/articles/cat27/cover-043.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT27-044: Veteran Incarceration: When Service Leads to the Justice Sys
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Veteran Incarceration: When Service Leads to the Justice System',
    'veteran-incarceration-justice',
    'draft',
    'Military, Veterans & First Responder Mental Health',
    ARRAY['veteran incarceration', 'veterans treatment court', 'incarcerated veterans', 'veteran criminal justice', 'PTSD criminal behavior'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT27-044',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding the intersection of veteran mental health and the criminal justice system. Research on incarcerated veterans, veterans treatment courts, PTSD and criminal behavior, substance use pathways, diversion programs, and reentry challenges.',
    '/images/articles/cat27/cover-044.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

END $$;

-- Category 28: sexuality-intimacy (64 articles)
DO $$
DECLARE
  v_cat_id UUID;
  v_sub_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'sexuality-intimacy';

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'gender-identity-and-sexuality' AND category_id = v_cat_id;

  -- CAT28-001: Gender Identity: The Psychology of Who We Know Ourselves to 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Gender Identity: The Psychology of Who We Know Ourselves to Be',
    'gender-identity-psychology',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['gender identity psychology', 'gender development', 'gender dysphoria', 'transgender psychology', 'gender identity science'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-001',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding the psychology and science of gender identity. Research on gender development, neurobiological factors, gender diversity across cultures, the distinction between sex and gender, gender dysphoria, and affirming clinical approaches.',
    '/images/articles/cat28/cover-001.svg',
    5,
    false,
    true,
    NULL,
    TRUE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT28-002: Transgender Mental Health: Beyond Pathology to Affirming Car
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Transgender Mental Health: Beyond Pathology to Affirming Care',
    'transgender-mental-health',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['transgender mental health', 'gender affirming care', 'transgender depression anxiety', 'trans mental health disparities', 'gender dysphoria treatment'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-002',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding transgender mental health disparities and affirming treatment approaches. Research on minority stress, family acceptance, gender-affirming care outcomes, conversion therapy harm, resilience factors, and clinical best practices.',
    '/images/articles/cat28/cover-002.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT28-003: Nonbinary and Gender-Diverse Identities: Beyond the Binary
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Nonbinary and Gender-Diverse Identities: Beyond the Binary',
    'nonbinary-gender-diverse-identities',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['nonbinary identity', 'genderqueer psychology', 'gender diverse mental health', 'nonbinary mental health', 'genderfluid'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-003',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding nonbinary and gender-diverse identities. Research on genderqueer, genderfluid, and agender experiences, mental health implications, pronoun usage, clinical considerations, social recognition, and affirming approaches.',
    '/images/articles/cat28/cover-003.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT28-004: Conversion Therapy: The Evidence of Harm and the Path to Ban
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Conversion Therapy: The Evidence of Harm and the Path to Banning',
    'conversion-therapy-harm',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['conversion therapy harm', 'SOCE research', 'conversion therapy ban', 'reparative therapy danger', 'sexual orientation change efforts'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-004',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding the evidence against conversion therapy (SOCE/GICE). Research on psychological harm, ineffectiveness, survivor experiences, professional organization positions, legislative bans, and the path from pathologization to affirmation.',
    '/images/articles/cat28/cover-004.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT28-005: Intersex Variations: The Psychology of Living Between Binary
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Intersex Variations: The Psychology of Living Between Binary Categories',
    'intersex-variations-psychology',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['intersex psychology', 'intersex mental health', 'disorders of sex development', 'DSD psychology', 'intersex identity'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-005',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding the psychological experiences of intersex individuals. Research on intersex variations, medical decision-making, surgery controversies, psychosocial outcomes, identity development, disclosure, and person-centered care approaches.',
    '/images/articles/cat28/cover-005.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT28-006: Kink and BDSM: The Psychology of Consensual Power Exchange
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Kink and BDSM: The Psychology of Consensual Power Exchange',
    'kink-bdsm-psychology',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['BDSM psychology', 'kink mental health', 'consensual power exchange', 'BDSM research', 'kink psychology'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-006',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding the psychology of kink and BDSM. Research on consensual power exchange, psychological health of BDSM practitioners, depathologization, consent frameworks, subspace and altered states, and the distinction between kink and pathology.',
    '/images/articles/cat28/cover-006.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT28-007: Sexual Identity Development: How We Come to Know Ourselves
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Sexual Identity Development: How We Come to Know Ourselves',
    'sexual-identity-development',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['sexual identity development', 'coming out process', 'sexual identity formation', 'sexual fluidity', 'LGBTQ identity development'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-007',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding sexual identity development across the lifespan. Research on identity formation models, coming out processes, sexual fluidity, cultural influences, late-life identity discovery, and the distinction between attraction, behavior, and identity.',
    '/images/articles/cat28/cover-007.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT28-008: Polyamory and Consensual Non-Monogamy: The Psychology of Mul
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Polyamory and Consensual Non-Monogamy: The Psychology of Multiple Relationships',
    'polyamory-consensual-nonmonogamy',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['polyamory psychology', 'consensual non-monogamy', 'open relationships research', 'polyamorous mental health', 'CNM relationships'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-008',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding the psychology of polyamory and consensual non-monogamy. Research on relationship satisfaction, attachment in CNM relationships, jealousy management, stigma, communication practices, and comparison with monogamous relationships.',
    '/images/articles/cat28/cover-008.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'intimacy-and-relationships' AND category_id = v_cat_id;

  -- CAT28-009: Desire Discrepancy in Couples: When Partners Want Different 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Desire Discrepancy in Couples: When Partners Want Different Things',
    'desire-discrepancy-couples',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['desire discrepancy', 'mismatched libido couples', 'different sex drives relationship', 'sexual desire differences', 'low desire partner'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-009',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding desire discrepancy in couples. Research on mismatched libido, the good-enough sex model, responsive vs spontaneous desire, communication strategies, sexual equilibrium, and how couples navigate differing sexual needs.',
    '/images/articles/cat28/cover-009.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT28-010: Infidelity: The Psychology of Betrayal, Devastation, and the
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Infidelity: The Psychology of Betrayal, Devastation, and the Possibility of Repair',
    'infidelity-psychology',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['infidelity psychology', 'affair recovery', 'betrayal trauma', 'why affairs happen', 'couples therapy infidelity'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-010',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding the psychology of infidelity. Research on why affairs happen, the trauma of betrayal, emotional vs sexual infidelity, recovery processes, couples therapy after affairs, and factors that predict relationship repair.',
    '/images/articles/cat28/cover-010.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT28-011: Attachment Styles and Sexual Relationships: How Early Bonds 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Attachment Styles and Sexual Relationships: How Early Bonds Shape Intimate Life',
    'attachment-styles-sexual-relationships',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['attachment styles sexuality', 'anxious attachment sex', 'avoidant attachment intimacy', 'secure attachment sexual relationship', 'attachment theory sexuality'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-011',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore how attachment styles influence sexual relationships. Research on anxious, avoidant, and secure attachment in intimate life, sexual communication patterns, and how earned security transforms sexual connection.',
    '/images/articles/cat28/cover-011.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT28-012: Sexuality and Chronic Illness: Maintaining Intimacy Through 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Sexuality and Chronic Illness: Maintaining Intimacy Through Health Challenges',
    'sexuality-chronic-illness',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['chronic illness sexuality', 'cancer and sex', 'MS intimacy', 'diabetes sexual dysfunction', 'adapted intimacy'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-012',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding how chronic illness affects sexuality and intimacy. Research on cancer, MS, diabetes, arthritis and sexual function, adapted intimacy strategies, body image, and healthcare provider conversations about sex.',
    '/images/articles/cat28/cover-012.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT28-013: Sexless Relationships: Understanding, Navigating, and Reimag
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Sexless Relationships: Understanding, Navigating, and Reimagining Intimacy',
    'sexless-marriage-psychology',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['sexless marriage', 'sexless relationship', 'low desire marriage', 'sexual inactivity causes', 'desire discrepancy'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-013',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding sexless relationships and marriages. Research on prevalence (15-20%), causes of sexual inactivity, emotional consequences, desire discrepancy, asexual partnerships, treatment approaches, and reimagining intimacy.',
    '/images/articles/cat28/cover-013.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT28-014: Digital Intimacy: How Technology Is Reshaping Sexual Connect
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Digital Intimacy: How Technology Is Reshaping Sexual Connection',
    'digital-intimacy-technology',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['digital intimacy', 'technology and sex', 'dating apps psychology', 'sexting research', 'pornography effects'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-014',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Exploring digital intimacy and technology''s impact on sexual connection. Research on dating apps, sexting, long-distance relationships, pornography effects, AI companionship, teledildonics, and digital consent.',
    '/images/articles/cat28/cover-014.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT28-015: Sexuality During Pregnancy and Postpartum: The Intimate Life
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Sexuality During Pregnancy and Postpartum: The Intimate Life of New Parents',
    'sexuality-pregnancy-postpartum',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['pregnancy sexuality', 'postpartum sex', 'intimacy after baby', 'breastfeeding and desire', 'body image pregnancy'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-015',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding sexual changes during pregnancy and postpartum. Research on desire across trimesters, postpartum sexuality, breastfeeding effects, body image, relationship adjustment, resuming sex after birth, and perinatal mood disorders.',
    '/images/articles/cat28/cover-015.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT28-016: Sexuality in Long-Term Relationships: Sustaining Desire Acro
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Sexuality in Long-Term Relationships: Sustaining Desire Across Decades',
    'long-term-relationship-sexuality',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['long-term relationship sex', 'sustaining desire', 'sexual habituation', 'erotic vs domestic', 'empty nest sexuality'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-016',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding sexuality in long-term relationships. Research on passionate vs companionate love, habituation, Esther Perel''s erotic tension, maintaining novelty, empty nest sexuality, sexual reinvention, and the myth of declining sex.',
    '/images/articles/cat28/cover-016.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'myths-and-future-directions' AND category_id = v_cat_id;

  -- CAT28-017: Myths About Sexual Health: What Science Actually Shows
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Myths About Sexual Health: What Science Actually Shows',
    'myths-sexual-health',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['sexual health myths', 'masturbation myths', 'hymen virginity myth', 'penis size myth', 'female orgasm'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-017',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Debunking common sexual health myths with scientific evidence, including masturbation harm, hymen and virginity, penis size and satisfaction, female orgasm from intercourse, sexual peak, and sex drive changes with aging.',
    '/images/articles/cat28/cover-017.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT28-018: The Future of Sexual Health: Emerging Science, Technology, a
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Future of Sexual Health: Emerging Science, Technology, and Social Change',
    'future-sexual-health-science',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['future of sexual health', 'telemedicine sex therapy', 'AI sexual health', 'genomics of desire', 'pleasure-inclusive sex education'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-018',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Exploring the future of sexual health including telemedicine sex therapy, AI sexual health tools, genomics of desire, pleasure-inclusive sex education, global sexual rights, digital consent frameworks, and psychedelic-assisted sex therapy research.',
    '/images/articles/cat28/cover-018.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'sex-therapy-and-professional-help' AND category_id = v_cat_id;

  -- CAT28-019: What Sex Therapy Actually Looks Like: Demystifying the Proce
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'What Sex Therapy Actually Looks Like: Demystifying the Process',
    'what-sex-therapy-actually-looks-like',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['sex therapy', 'what to expect in sex therapy', 'sex therapist', 'sexual dysfunction treatment', 'sensate focus'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-019',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A clear guide to what happens in sex therapy sessions, covering assessment, common techniques, therapeutic models, and what to expect from your first appointment.',
    '/images/articles/cat28/cover-019.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT28-020: How to Find a Qualified Sex Therapist: Credentials and What 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How to Find a Qualified Sex Therapist: Credentials and What to Ask',
    'how-find-qualified-sex-therapist',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['find sex therapist', 'AASECT certified', 'sex therapy credentials', 'qualified sex therapist', 'sex therapy training'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-020',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A practical guide to finding a qualified, credentialed sex therapist including certification bodies, questions to ask, red flags to watch for, and what specialized training involves.',
    '/images/articles/cat28/cover-020.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT28-021: Couples Therapy for Sexual Issues: When Both Partners Need t
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Couples Therapy for Sexual Issues: When Both Partners Need to Be in the Room',
    'couples-therapy-sexual-issues',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['couples sex therapy', 'sexual issues couples therapy', 'desire discrepancy couples', 'Gottman sex therapy', 'EFT sexual issues'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-021',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Exploring when and why couples therapy is essential for sexual issues, how joint sessions work differently from individual sex therapy, and what research shows about treating sexual concerns relationally.',
    '/images/articles/cat28/cover-021.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT28-022: Sensate Focus: The Clinical Technique That Removes Performan
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Sensate Focus: The Clinical Technique That Removes Performance Pressure',
    'sensate-focus-clinical-technique',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['sensate focus', 'Masters and Johnson', 'performance anxiety', 'sex therapy technique', 'structured touch therapy'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-022',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A detailed guide to sensate focus therapy, the structured touch exercise developed by Masters and Johnson that reduces performance anxiety, rebuilds physical intimacy, and treats multiple sexual difficulties.',
    '/images/articles/cat28/cover-022.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT28-023: Cognitive Behavioral Sex Therapy: Changing the Thoughts That
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Cognitive Behavioral Sex Therapy: Changing the Thoughts That Block Intimacy',
    'cognitive-behavioral-sex-therapy',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['cognitive behavioral sex therapy', 'CBT sexual dysfunction', 'sexual performance anxiety', 'spectatoring', 'cognitive distortions sex'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-023',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How CBT principles apply to sexual difficulties including performance anxiety, low desire, and arousal problems, with research on cognitive distortions that interfere with sexual function.',
    '/images/articles/cat28/cover-023.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT28-024: When Sexual Issues Signal Deeper Relationship Problems
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'When Sexual Issues Signal Deeper Relationship Problems',
    'sexual-issues-signal-deeper-relationship-problems',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['sexual issues relationship problems', 'emotional disconnection sex', 'attachment and sexuality', 'unresolved conflict intimacy', 'relationship dynamics sex'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-024',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Exploring how sexual difficulties often reflect underlying relationship problems including unresolved conflict, power imbalances, attachment insecurity, and emotional disconnection.',
    '/images/articles/cat28/cover-024.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'sexual-dysfunction-and-treatment' AND category_id = v_cat_id;

  -- CAT28-025: Erectile Dysfunction: The Psychology Behind the Physical
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Erectile Dysfunction: The Psychology Behind the Physical',
    'erectile-dysfunction-psychology',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['erectile dysfunction psychology', 'performance anxiety ED', 'psychogenic erectile dysfunction', 'ED mental health', 'erectile dysfunction treatment'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-025',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding the psychological dimensions of erectile dysfunction. Research on performance anxiety, relationship factors, mental health comorbidities, psychogenic vs organic ED, treatment approaches, and the biopsychosocial model of male sexual function.',
    '/images/articles/cat28/cover-025.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT28-026: Female Sexual Dysfunction: Desire, Arousal, and the Complexi
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Female Sexual Dysfunction: Desire, Arousal, and the Complexity of Women\''s Sexual Experience',
    'female-sexual-dysfunction',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['female sexual dysfunction', 'hypoactive sexual desire disorder', 'women\', ', ', ', '],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-026',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding female sexual dysfunction including hypoactive sexual desire disorder, arousal difficulties, and orgasm disorders. Research on the biopsychosocial model, responsive desire, relationship factors, hormonal influences, and evidence-based treatment approaches.',
    '/images/articles/cat28/cover-026.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT28-027: Premature Ejaculation: The Psychology of Timing and Control
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Premature Ejaculation: The Psychology of Timing and Control',
    'premature-ejaculation-psychology',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['premature ejaculation psychology', 'PE treatment', 'premature ejaculation anxiety', 'ejaculation control', 'sexual performance anxiety'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-027',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding the psychological dimensions of premature ejaculation. Research on performance anxiety, cognitive distraction, relationship factors, neurobiological contributions, behavioral techniques, and integrated treatment approaches.',
    '/images/articles/cat28/cover-027.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT28-028: Sexual Pain Disorders: When Intimacy Hurts—Understanding Vag
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Sexual Pain Disorders: When Intimacy Hurts—Understanding Vaginismus, Vulvodynia, and Dyspareunia',
    'sexual-pain-disorders',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['sexual pain disorders', 'vaginismus treatment', 'vulvodynia psychology', 'dyspareunia causes', 'painful sex treatment'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-028',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding sexual pain disorders including vaginismus, vulvodynia, and dyspareunia. Research on the biopsychosocial pain model, pelvic floor dysfunction, fear-avoidance cycles, cognitive-behavioral treatment, and multidisciplinary approaches.',
    '/images/articles/cat28/cover-028.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT28-029: Orgasm Difficulties: The Psychology of Pleasure, Pressure, a
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Orgasm Difficulties: The Psychology of Pleasure, Pressure, and the Orgasm Gap',
    'orgasm-difficulties-psychology',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['orgasm difficulties', 'anorgasmia treatment', 'orgasm gap', 'female orgasm psychology', 'delayed orgasm'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-029',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding orgasm difficulties in men and women. Research on the orgasm gap, female orgasm physiology, anorgasmia, delayed orgasm, cognitive barriers, mindfulness approaches, and the distinction between orgasm and sexual satisfaction.',
    '/images/articles/cat28/cover-029.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT28-030: Sex Therapy: Evidence-Based Approaches to Sexual Health and 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Sex Therapy: Evidence-Based Approaches to Sexual Health and Satisfaction',
    'sex-therapy-approaches',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['sex therapy', 'sex therapy approaches', 'sensate focus therapy', 'sexual dysfunction treatment', 'couples sex therapy'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-030',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding sex therapy approaches and their effectiveness. Research on sensate focus, cognitive-behavioral sex therapy, mindfulness-based approaches, couples sex therapy, Emotionally Focused Therapy for sexual concerns, and what to expect from treatment.',
    '/images/articles/cat28/cover-030.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT28-031: Medication Sexual Side Effects: When Treatment for One Condi
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Medication Sexual Side Effects: When Treatment for One Condition Creates Another',
    'medication-sexual-side-effects',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['medication sexual side effects', 'SSRI sexual dysfunction', 'antidepressant sexual side effects', 'drug-induced sexual dysfunction', 'medication sexual problems'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-031',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding medication-induced sexual side effects from antidepressants, antipsychotics, blood pressure medications, and other drugs. Research on SSRI sexual dysfunction, management strategies, switching medications, and the balance between mental health treatment and sexual well-being.',
    '/images/articles/cat28/cover-031.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT28-032: Compulsive Sexual Behavior: When Desire Becomes Distress
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Compulsive Sexual Behavior: When Desire Becomes Distress',
    'compulsive-sexual-behavior',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['compulsive sexual behavior', 'sexual addiction', 'CSBD', 'out of control sexual behavior', 'sex addiction treatment'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-032',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding compulsive sexual behavior disorder (CSBD). Research on the addiction vs impulse control debate, ICD-11 classification, moral incongruence, the role of shame, evidence-based treatment, and distinguishing high sexual desire from genuine compulsivity.',
    '/images/articles/cat28/cover-032.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'sexual-health-and-education' AND category_id = v_cat_id;

  -- CAT28-033: The Psychology of Human Sexuality: Understanding Desire, Aro
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Human Sexuality: Understanding Desire, Arousal, and Connection',
    'psychology-human-sexuality',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['psychology of sexuality', 'human sexual response', 'sexual desire psychology', 'arousal and desire', 'sexual health psychology'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-033',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding the psychology of human sexuality. Research on the sexual response cycle, desire models, arousal concordance, biopsychosocial frameworks, sexual health, and the relationship between mental health and sexual well-being.',
    '/images/articles/cat28/cover-033.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT28-034: Sexual Orientation: Understanding the Spectrum of Human Attr
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Sexual Orientation: Understanding the Spectrum of Human Attraction',
    'sexual-orientation-spectrum',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['sexual orientation', 'LGBTQ psychology', 'sexual orientation spectrum', 'coming out psychology', 'minority stress'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-034',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding sexual orientation as a spectrum of human attraction. Research on the biology of sexual orientation, Kinsey scale and beyond, minority stress, coming out psychology, orientation vs identity, and affirming therapeutic approaches.',
    '/images/articles/cat28/cover-034.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT28-035: Sexual Communication in Relationships: The Foundation of Int
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Sexual Communication in Relationships: The Foundation of Intimate Connection',
    'sexual-communication-relationships',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['sexual communication', 'sexual dialogue relationships', 'desire discrepancy', 'sexual scripts', 'intimate communication'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-035',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding sexual communication and its role in relationship satisfaction. Research on desire discrepancy, sexual scripts, vulnerability and disclosure, communication barriers, sexual negotiation, and evidence-based approaches to improving sexual dialogue.',
    '/images/articles/cat28/cover-035.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT28-036: Consent, Boundaries, and Sexual Ethics: The Psychology of Re
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Consent, Boundaries, and Sexual Ethics: The Psychology of Respectful Intimacy',
    'consent-boundaries-sexual-ethics',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['sexual consent psychology', 'sexual boundaries', 'affirmative consent', 'sexual ethics', 'consent education'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-036',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding consent, boundaries, and sexual ethics from a psychological perspective. Research on affirmative consent, boundary communication, coercion dynamics, consent education, relational power, and building cultures of sexual respect.',
    '/images/articles/cat28/cover-036.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT28-037: Pornography and Psychology: Understanding the Impact of Sexu
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Pornography and Psychology: Understanding the Impact of Sexual Media',
    'pornography-psychology-impact',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['pornography psychology', 'pornography effects', 'pornography and relationships', 'pornography addiction', 'sexual media impact'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-037',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding the psychological impact of pornography use. Research on pornography and relationships, problematic use patterns, adolescent exposure effects, moral incongruence, sexual expectations, and evidence-based approaches to healthy media consumption.',
    '/images/articles/cat28/cover-037.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT28-038: Comprehensive Sex Education: What the Research Shows About W
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Comprehensive Sex Education: What the Research Shows About What Works',
    'sex-education-comprehensive',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['comprehensive sex education', 'sex education research', 'evidence-based sex ed', 'sexual health education', 'consent education'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-038',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding evidence-based comprehensive sex education. Research on abstinence-only vs comprehensive programs, sexual health outcomes, LGBTQ-inclusive curricula, consent education, digital age challenges, and effective pedagogical approaches.',
    '/images/articles/cat28/cover-038.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT28-039: Sexuality and Aging: Intimacy Across the Lifespan
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Sexuality and Aging: Intimacy Across the Lifespan',
    'sexuality-aging',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['sexuality aging', 'older adult sexuality', 'sexual health aging', 'menopause sexuality', 'intimacy older adults'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-039',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding sexuality and aging. Research on sexual activity in older adults, menopause and sexual function, erectile changes, emotional intimacy, ageist stereotypes, chronic illness effects, and maintaining sexual well-being in later life.',
    '/images/articles/cat28/cover-039.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT28-040: Body Image and Sexual Confidence: How Self-Perception Shapes
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Body Image and Sexual Confidence: How Self-Perception Shapes Intimate Experience',
    'body-image-sexual-confidence',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['body image sexuality', 'sexual confidence', 'body image sex', 'genital self-image', 'sexual self-esteem'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-040',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding the relationship between body image and sexual confidence. Research on cognitive distraction during sex, genital self-image, media influence on sexual expectations, body acceptance, and evidence-based approaches to improving sexual body confidence.',
    '/images/articles/cat28/cover-040.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT28-041: Sexually Transmitted Infections and Mental Health: Beyond th
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Sexually Transmitted Infections and Mental Health: Beyond the Physical Diagnosis',
    'sexually-transmitted-infections-mental-health',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['STI mental health', 'STI stigma', 'HIV psychology', 'herpes mental health', 'STI disclosure'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-041',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding the psychological impact of sexually transmitted infections. Research on STI stigma, disclosure anxiety, HIV mental health, herpes psychological effects, shame and self-blame, and integrating mental health into STI care.',
    '/images/articles/cat28/cover-041.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT28-042: Asexuality: Understanding the Ace Spectrum
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Asexuality: Understanding the Ace Spectrum',
    'asexuality-spectrum',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['asexuality', 'ace spectrum', 'asexual identity', 'demisexuality', 'gray-asexuality'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-042',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding asexuality as a valid sexual orientation. Research on the ace spectrum, demisexuality, gray-asexuality, romantic orientation, asexual mental health, pathologization concerns, and affirming approaches to asexual identity.',
    '/images/articles/cat28/cover-042.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'sexual-trauma-and-recovery' AND category_id = v_cat_id;

  -- CAT28-043: Sexual Trauma and Recovery: Reclaiming Sexuality After Assau
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Sexual Trauma and Recovery: Reclaiming Sexuality After Assault',
    'sexual-trauma-recovery',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['sexual trauma recovery', 'PTSD and sexuality', 'reclaiming sexuality after assault', 'somatic experiencing', 'trauma response during sex'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-043',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Evidence-based guide to understanding how sexual trauma affects sexuality and intimacy, including PTSD and sexual function, somatic experiencing, reclaiming sexual agency, partner support strategies, and the nonlinear healing timeline.',
    '/images/articles/cat28/cover-043.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT28-044: Childhood Sexual Abuse and Adult Sexuality: Understanding Lo
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Childhood Sexual Abuse and Adult Sexuality: Understanding Long-Term Impact and Healing',
    'childhood-sexual-abuse-adult-sexuality',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['childhood sexual abuse adult sexuality', 'CSA long-term effects', 'dissociation during sex', 'revictimization patterns', 'trauma-informed sex therapy'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-044',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Evidence-based exploration of how childhood sexual abuse affects adult sexuality, including dissociation during sex, revictimization patterns, trauma-informed sex therapy, disclosure to partners, and pathways to healing the body''s memory.',
    '/images/articles/cat28/cover-044.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT28-045: Sexual Coercion in Relationships: Recognizing the Spectrum B
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Sexual Coercion in Relationships: Recognizing the Spectrum Between Consent and Force',
    'sexual-coercion-relationships',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['sexual coercion', 'consent in relationships', 'marital rape', 'reproductive coercion', 'stealthing'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-045',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding sexual coercion in intimate relationships, including the continuum between consent and force, verbal and physical pressure tactics, marital rape, reproductive coercion, stealthing, psychological impact, and legal recognition.',
    '/images/articles/cat28/cover-045.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT28-046: Sexual Shame: How Cultural Messages Become Internal Prisons—
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Sexual Shame: How Cultural Messages Become Internal Prisons—and How to Break Free',
    'sexual-shame-healing',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['sexual shame', 'shame and sexuality', 'religious sexual shame', 'shame vs guilt', 'sexual function shame'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-046',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding sexual shame, its origins in religious, cultural, and family messages, the distinction between shame and guilt, how shame affects sexual function, internalized messages, shame resilience theory, and evidence-based therapeutic approaches for healing.',
    '/images/articles/cat28/cover-046.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'sexuality-myths' AND category_id = v_cat_id;

  -- CAT28-047: Myth: Sexual Desire Should Be Spontaneous and Constant
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Myth: Sexual Desire Should Be Spontaneous and Constant',
    'myth-sexual-desire-spontaneous-constant',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['sexual desire myth', 'spontaneous desire', 'responsive desire', 'dual control model', 'desire discrepancy'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-047',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Examining the myth that sexual desire must be spontaneous and constant, exploring responsive desire, the dual control model, and how understanding desire styles reduces sexual distress.',
    '/images/articles/cat28/cover-047.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT28-048: Myth: If You Love Someone the Sex Should Just Work
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Myth: If You Love Someone the Sex Should Just Work',
    'myth-love-someone-sex-should-work',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['sexual compatibility myth', 'love and sex', 'sexual communication', 'sexual satisfaction', 'couples therapy'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-048',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Debunking the myth that love automatically creates sexual compatibility, exploring how communication, learning, and skill-building are essential to sexual satisfaction in relationships.',
    '/images/articles/cat28/cover-048.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT28-049: Myth: Asexuality Means Something Is Wrong With You
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Myth: Asexuality Means Something Is Wrong With You',
    'myth-asexuality-means-something-wrong',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['asexuality myth', 'asexual spectrum', 'ace identity', 'sexual orientation', 'HSDD'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-049',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Debunking the myth that asexuality is a disorder, exploring the research on asexual identity, the asexual spectrum, and how pathologization causes harm.',
    '/images/articles/cat28/cover-049.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT28-050: Myth: Men Always Want Sex and Women Never Do
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Myth: Men Always Want Sex and Women Never Do',
    'myth-men-always-want-sex-women-never',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['gendered desire myth', 'male sexual desire', 'female sexual desire', 'desire discrepancy', 'sexual stereotypes'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-050',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Debunking the gendered desire myth, exploring how stereotypes about male and female sexual desire harm everyone, with research on desire variability across genders.',
    '/images/articles/cat28/cover-050.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'sexuality-and-specific-populations' AND category_id = v_cat_id;

  -- CAT28-051: Sexuality and Disability: Pleasure, Adaptation, and Breaking
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Sexuality and Disability: Pleasure, Adaptation, and Breaking Stereotypes',
    'sexuality-disability-pleasure-adaptation',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['sexuality disability', 'disabled sexuality', 'sexual rights disability', 'sexual adaptation', 'disability stereotypes'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-051',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Exploring how people with disabilities experience sexuality, challenging stereotypes about disabled sexuality, and examining adaptations, barriers, and the right to sexual expression.',
    '/images/articles/cat28/cover-051.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT28-052: Sexuality After Cancer Treatment: Hormonal, Surgical, and Ps
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Sexuality After Cancer Treatment: Hormonal, Surgical, and Psychological Changes',
    'sexuality-after-cancer-treatment',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['sexuality after cancer', 'cancer treatment sexual effects', 'cancer survivorship sexuality', 'chemotherapy sexual side effects', 'body image cancer'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-052',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How cancer treatments affect sexuality through hormonal, surgical, and psychological pathways, with evidence-based strategies for rebuilding sexual wellbeing during and after cancer care.',
    '/images/articles/cat28/cover-052.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT28-053: Sexuality in Older LGBTQ+ Adults: A Lifetime of Resilience a
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Sexuality in Older LGBTQ+ Adults: A Lifetime of Resilience and Invisibility',
    'sexuality-older-lgbtq-adults',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['older LGBTQ sexuality', 'aging LGBTQ', 'LGBTQ seniors', 'queer aging', 'LGBTQ elder care'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-053',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Exploring the unique sexual health needs and experiences of older LGBTQ+ adults, including historical trauma, compounded invisibility, healthcare barriers, and the resilience built across a lifetime.',
    '/images/articles/cat28/cover-053.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT28-054: Sexuality and Neurodivergence: How ADHD and Autism Affect In
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Sexuality and Neurodivergence: How ADHD and Autism Affect Intimate Relationships',
    'sexuality-neurodivergence-adhd-autism',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['ADHD sexuality', 'autism sexuality', 'neurodivergent intimacy', 'sensory issues sex', 'ADHD relationships'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-054',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Exploring how ADHD and autism uniquely affect sexual desire, sensory experiences, communication, and intimate relationships, with strategies for navigating neurodivergent sexuality.',
    '/images/articles/cat28/cover-054.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT28-055: Sexuality and Chronic Pain: Maintaining Intimacy When Your B
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Sexuality and Chronic Pain: Maintaining Intimacy When Your Body Hurts',
    'sexuality-chronic-pain-maintaining-intimacy',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['chronic pain sexuality', 'intimacy chronic pain', 'pain and sex', 'fibromyalgia sexuality', 'sexual health chronic illness'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-055',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How chronic pain conditions affect sexuality and intimate relationships, with evidence-based strategies for maintaining sexual wellbeing when living with persistent pain.',
    '/images/articles/cat28/cover-055.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT28-056: Sexuality After Spinal Cord Injury: What Changes and What Re
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Sexuality After Spinal Cord Injury: What Changes and What Remains',
    'sexuality-after-spinal-cord-injury',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['spinal cord injury sexuality', 'SCI sexual function', 'paralysis intimacy', 'neuroplasticity orgasm', 'SCI sexual rehabilitation'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-056',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding how spinal cord injury affects sexual function, arousal, and orgasm, with evidence on neuroplasticity, adaptation strategies, and the psychology of sexual identity after SCI.',
    '/images/articles/cat28/cover-056.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT28-057: Sexuality and Substance Use Recovery: Rebuilding Intimacy in
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Sexuality and Substance Use Recovery: Rebuilding Intimacy in Sobriety',
    'sexuality-substance-use-recovery',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['sexuality recovery', 'sobriety intimacy', 'substance use sexuality', 'addiction sexual health', 'sober sex'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-057',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How substance use disorders affect sexuality, the unique challenges of rebuilding intimacy in recovery, and evidence-based approaches to navigating sex and relationships sober.',
    '/images/articles/cat28/cover-057.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT28-058: Sexuality and Body Image: How Self-Perception Shapes Sexual 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Sexuality and Body Image: How Self-Perception Shapes Sexual Confidence',
    'sexuality-body-image-self-perception',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['body image sexuality', 'sexual confidence', 'body dissatisfaction sex', 'spectatoring body image', 'body positivity intimacy'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-058',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Exploring how body image affects sexual desire, arousal, and satisfaction, with research on cognitive distraction during sex, body-focused anxiety, and evidence-based interventions.',
    '/images/articles/cat28/cover-058.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT28-059: Sexual Health in the Digital Age: Online Dating, Apps, and N
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Sexual Health in the Digital Age: Online Dating, Apps, and New Norms',
    'sexual-health-digital-age',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['digital age sexuality', 'dating apps psychology', 'sexting mental health', 'online dating effects', 'digital intimacy'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-059',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How digital technology has reshaped dating, intimacy, and sexual health including dating apps, sexting, online consent, and the psychological effects of technology-mediated relationships.',
    '/images/articles/cat28/cover-059.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT28-060: Cultural and Religious Influences on Sexuality: Navigating T
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Cultural and Religious Influences on Sexuality: Navigating Tradition and Desire',
    'cultural-religious-influences-sexuality',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['culture sexuality', 'religion sexual health', 'purity culture', 'sexual shame religion', 'cultural sexual norms'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-060',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How cultural background and religious upbringing shape sexual attitudes, behaviors, and mental health, with research on navigating the tension between tradition and authentic sexual expression.',
    '/images/articles/cat28/cover-060.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT28-061: Compulsive Sexual Behavior: When Desire Becomes Distressing
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Compulsive Sexual Behavior: When Desire Becomes Distressing',
    'compulsive-sexual-behavior-disorder',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['compulsive sexual behavior', 'CSBD', 'sexual addiction debate', 'hypersexuality', 'out-of-control sexual behavior'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-061',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding compulsive sexual behavior disorder through a clinical lens, exploring its neurobiological basis, diagnostic considerations, evidence-based treatments, and the difference between high desire and distressing compulsive patterns.',
    '/images/articles/cat28/cover-061.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT28-062: The Freeze Response During Sex: Understanding Trauma-Related
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Freeze Response During Sex: Understanding Trauma-Related Shutdown',
    'freeze-response-during-sex-trauma',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['freeze response sex', 'dissociation during sex', 'trauma shutdown intimacy', 'tonic immobility', 'polyvagal theory sex'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-062',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding why some people experience freezing, dissociation, or shutdown during sex, the neuroscience of the freeze response, and trauma-informed approaches to reclaiming sexual safety.',
    '/images/articles/cat28/cover-062.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT28-063: How to Talk to Your Doctor About Sexual Concerns Without Emb
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'How to Talk to Your Doctor About Sexual Concerns Without Embarrassment',
    'talk-to-doctor-sexual-concerns',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['talk to doctor about sex', 'sexual health doctor visit', 'discuss sexual concerns', 'sexual health conversation', 'doctor sexual dysfunction'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-063',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A practical guide to discussing sexual health with your doctor, including conversation starters, what to expect, overcoming embarrassment, and knowing when a medical evaluation is needed.',
    '/images/articles/cat28/cover-063.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT28-064: Pelvic Floor Therapy and Mental Health: The Physical-Psychol
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Pelvic Floor Therapy and Mental Health: The Physical-Psychological Connection',
    'pelvic-floor-therapy-mental-health',
    'draft',
    'Sexuality, Intimacy & Sexual Health',
    ARRAY['pelvic floor therapy', 'pelvic floor mental health', 'vaginismus treatment', 'pelvic pain psychology', 'sexual pain therapy'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT28-064',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How pelvic floor dysfunction connects to anxiety, trauma, and sexual pain, with research on pelvic floor therapy as a treatment for sexual difficulties and the mind-body connection in pelvic health.',
    '/images/articles/cat28/cover-064.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

END $$;

-- Category 29: environmental-eco-psychology (66 articles)
DO $$
DECLARE
  v_cat_id UUID;
  v_sub_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'environmental-eco-psychology';

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'climate-and-eco-anxiety' AND category_id = v_cat_id;

  -- CAT29-001: Eco-Anxiety: Why Climate Change Is a Mental Health Crisis
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Eco-Anxiety: Why Climate Change Is a Mental Health Crisis',
    'eco-anxiety-climate-change-mental-health-crisis',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['eco-anxiety', 'climate anxiety', 'climate change mental health', 'environmental distress', 'climate grief'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-001',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding eco-anxiety as a rational psychological response to the climate crisis, including prevalence data, neurobiological mechanisms, risk factors, and evidence-based coping strategies.',
    '/images/articles/cat29/cover-001.svg',
    5,
    false,
    true,
    NULL,
    TRUE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT29-002: Climate Grief: Mourning Ecosystems, Species, and Futures Los
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Climate Grief: Mourning Ecosystems, Species, and Futures Lost',
    'climate-grief-mourning-ecosystems',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['climate grief', 'ecological grief', 'environmental mourning', 'species loss grief', 'anticipatory climate grief'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-002',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding climate grief as a legitimate mourning process for ecological loss, including the psychology of anticipatory grief, disenfranchised grief, and mourning for non-human life.',
    '/images/articles/cat29/cover-002.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT29-003: Solastalgia: The Psychological Pain of Watching Your Environ
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Solastalgia: The Psychological Pain of Watching Your Environment Degrade',
    'solastalgia-psychological-pain-environment-degrade',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['solastalgia', 'environmental distress', 'place attachment', 'ecological change psychology', 'homesickness at home'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-003',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding solastalgia—the distress caused by environmental change in one''s home environment—its origins, psychological mechanisms, and implications for mental health in an era of accelerating ecological transformation.',
    '/images/articles/cat29/cover-003.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT29-004: Climate Anxiety in Children and Young People: Supporting the
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Climate Anxiety in Children and Young People: Supporting the Next Generation',
    'climate-anxiety-children-young-people',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['climate anxiety children', 'eco-anxiety youth', 'children environmental distress', 'adolescent climate worry', 'youth mental health climate'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-004',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding the mental health impact of climate change on children and adolescents, including the psychology of eco-anxiety in youth, developmental considerations, and evidence-based approaches to supporting young people''s environmental distress.',
    '/images/articles/cat29/cover-004.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT29-005: Eco-Paralysis: When Environmental Overwhelm Causes Inaction
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Eco-Paralysis: When Environmental Overwhelm Causes Inaction',
    'eco-paralysis-environmental-overwhelm-inaction',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['eco-paralysis', 'environmental overwhelm', 'climate inaction psychology', 'learned helplessness environment', 'environmental burnout'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-005',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding eco-paralysis—the state of psychological overwhelm that prevents environmental action despite caring deeply—its causes, mechanisms, and pathways from frozen helplessness to meaningful engagement.',
    '/images/articles/cat29/cover-005.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT29-006: The Psychology of Climate Denial: Why Some People Can\''t Ac
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Climate Denial: Why Some People Can\''t Accept the Evidence',
    'psychology-climate-denial',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['climate denial psychology', 'motivated reasoning climate', 'climate skepticism', 'identity protective cognition', 'system justification'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-006',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding the psychological mechanisms behind climate change denial, including motivated reasoning, identity-protective cognition, terror management, and system justification—and why facts alone don''t change minds.',
    '/images/articles/cat29/cover-006.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'climate-seasons-and-psychological-rhythms' AND category_id = v_cat_id;

  -- CAT29-007: Seasonal Affective Disorder: The Science of Light, Biology, 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Seasonal Affective Disorder: The Science of Light, Biology, and Mood',
    'seasonal-affective-disorder-light-biology-mood',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['seasonal affective disorder', 'SAD psychology', 'light therapy depression', 'seasonal depression', 'circadian rhythm mood'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-007',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding seasonal affective disorder (SAD), including the neuroscience of seasonal mood changes, the role of light in circadian regulation, evidence-based treatments, and the broader relationship between seasonal rhythms and mental health.',
    '/images/articles/cat29/cover-007.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT29-008: Circadian Rhythms and Mental Health: Living by Your Body Clo
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Circadian Rhythms and Mental Health: Living by Your Body Clock',
    'circadian-rhythms-mental-health-body-clock',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['circadian rhythms mental health', 'body clock psychology', 'circadian disruption depression', 'sleep wake cycle mood', 'chronotype wellbeing'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-008',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The science of circadian rhythms and their profound influence on mental health, including how disrupted body clocks contribute to depression, anxiety, and bipolar disorder, and evidence-based strategies for circadian alignment.',
    '/images/articles/cat29/cover-008.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT29-009: Weather and Mood: The Science of Meteorological Psychology
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Weather and Mood: The Science of Meteorological Psychology',
    'weather-mood-science-meteorological-psychology',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['weather mood psychology', 'sunlight mood', 'temperature mental health', 'barometric pressure mood', 'meteorological psychology'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-009',
    v_cat_id,
    v_sub_id,
    'drafted',
    'What research actually shows about the relationship between weather and mood, including the effects of sunlight, temperature, barometric pressure, and humidity on psychological wellbeing, and why the weather-mood connection is more complex than popular wisdom suggests.',
    '/images/articles/cat29/cover-009.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT29-010: Lunar Cycles, Sleep, and Behavior: What the Science Actually
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Lunar Cycles, Sleep, and Behavior: What the Science Actually Says',
    'lunar-cycles-sleep-behavior-what-science-says',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['lunar cycles psychology', 'moon sleep research', 'full moon behavior', 'lunar effect mental health', 'moon influence psychology'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-010',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Separating myth from evidence on the moon''s influence on human psychology, including what rigorous research shows about lunar effects on sleep, mood, behavior, and psychiatric admissions, and why the belief in lunar influence persists.',
    '/images/articles/cat29/cover-010.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT29-011: Altitude and Psychology: Mental Health at High Elevation
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Altitude and Psychology: Mental Health at High Elevation',
    'altitude-psychology-mental-health-high-elevation',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['altitude mental health', 'high elevation psychology', 'altitude suicide risk', 'hypoxia mood', 'mountain living psychology'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-011',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The surprising relationship between altitude and mental health, including the epidemiology of suicide at high elevation, the neuropsychological effects of hypoxia, and what living at altitude means for mood, cognition, and psychiatric risk.',
    '/images/articles/cat29/cover-011.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT29-012: The Geography of Happiness: Does Where You Live Determine Ho
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Geography of Happiness: Does Where You Live Determine How You Feel?',
    'geography-happiness-where-you-live-how-you-feel',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['geography happiness', 'location wellbeing', 'happiest places psychology', 'where you live mental health', 'geographic happiness research'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-012',
    v_cat_id,
    v_sub_id,
    'drafted',
    'What research reveals about the relationship between geographic location and psychological wellbeing, including why some places consistently rank as happier, the role of climate, culture, policy, and physical environment, and whether moving can make you happier.',
    '/images/articles/cat29/cover-012.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'emerging-topics-in-environmental-psychology' AND category_id = v_cat_id;

  -- CAT29-013: Space Psychology: Isolation, Confinement, and Extreme Enviro
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Space Psychology: Isolation, Confinement, and Extreme Environments',
    'space-psychology-isolation-confinement-extreme-environments',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['space psychology', 'isolation psychology', 'extreme environment mental health', 'confinement psychology', 'Antarctic psychology'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-013',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of living in extreme and isolated environments, including lessons from space missions, Antarctic expeditions, and submarine service for understanding human psychological needs, the effects of environmental deprivation, and resilience in confined settings.',
    '/images/articles/cat29/cover-013.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT29-014: Virtual Nature: Can Digital Environments Replace the Real Th
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Virtual Nature: Can Digital Environments Replace the Real Thing?',
    'virtual-nature-digital-environments-psychological-effects',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['virtual nature psychology', 'VR nature therapy', 'digital nature mental health', 'nature videos wellbeing', 'technology nature connection'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-014',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of virtual nature experiences, including research on whether digital nature can provide the same mental health benefits as real nature, the potential and limitations of VR nature therapy, and what technology can and cannot replicate about the human-nature relationship.',
    '/images/articles/cat29/cover-014.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT29-015: The Microbiome and Mental Health: The Soil-Gut-Brain Connect
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Microbiome and Mental Health: The Soil-Gut-Brain Connection',
    'microbiome-mental-health-soil-gut-brain-connection',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['microbiome mental health', 'gut brain axis', 'soil microbes mood', 'hygiene hypothesis psychology', 'microbial diversity wellbeing'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-015',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The emerging science linking environmental microbial exposure to mental health, including the gut-brain axis, the hygiene hypothesis, how soil microbes affect mood and immunity, and the implications of microbial diversity loss for psychological wellbeing.',
    '/images/articles/cat29/cover-015.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT29-016: Color Psychology and Natural Environments: Why Green Heals
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Color Psychology and Natural Environments: Why Green Heals',
    'color-psychology-natural-environments-why-green-heals',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['color psychology nature', 'green environment mental health', 'blue space psychology', 'natural fractals restoration', 'visual nature wellbeing'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-016',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of color in natural environments, including the science of why green and blue environments promote wellbeing, how natural color palettes affect mood and cognition, the role of visual fractals in restoration, and what makes natural visual environments different from artificial ones.',
    '/images/articles/cat29/cover-016.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT29-017: Pet Ownership and Mental Health: The Science of the Human-An
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Pet Ownership and Mental Health: The Science of the Human-Animal Bond',
    'pet-ownership-mental-health-human-animal-bond',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['pet ownership mental health', 'human animal bond psychology', 'pets depression anxiety', 'animal companionship wellbeing', 'dog ownership mental health'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-017',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology and neuroscience of the human-animal bond, including evidence for mental health benefits of pet ownership, the biological mechanisms of human-pet interaction, when pets help and when they don''t, and how animal companionship connects to broader environmental psychology.',
    '/images/articles/cat29/cover-017.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT29-018: Soundscapes and Mental Health: The Psychology of Environment
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Soundscapes and Mental Health: The Psychology of Environmental Sound',
    'soundscapes-mental-health-psychology-environmental-sound',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['soundscapes mental health', 'natural sounds psychology', 'noise pollution wellbeing', 'birdsong mental health', 'environmental sound therapy'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-018',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How environmental sounds affect mental health and wellbeing, including the restorative effects of natural soundscapes, the psychological damage of noise pollution, the neuroscience of auditory processing and mood, and how sound environments shape daily psychological experience.',
    '/images/articles/cat29/cover-018.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT29-019: Environmental Psychology and Aging: Nature, Place, and Older
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Environmental Psychology and Aging: Nature, Place, and Older Adults',
    'environmental-psychology-aging-nature-older-adults',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['aging environment psychology', 'nature older adults', 'aging in place psychology', 'green space elderly', 'environmental design aging'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-019',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How the physical environment shapes psychological wellbeing in older adulthood, including the role of nature access in healthy aging, the psychology of aging in place, environmental design for cognitive health, and the particular vulnerability of older adults to environmental deprivation.',
    '/images/articles/cat29/cover-019.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT29-020: Planetary Mental Health: An Integrative Vision of Human and 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Planetary Mental Health: An Integrative Vision of Human and Earth Wellbeing',
    'planetary-mental-health-integrative-vision-human-earth-wellbeing',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['planetary mental health', 'ecological psychology', 'human earth wellbeing', 'environmental mental health', 'planetary health psychology'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-020',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The emerging concept of planetary mental health — the recognition that human psychological wellbeing and ecological health are inseparable, including how environmental degradation affects mental health at scale, what a truly ecological approach to psychology looks like, and the future of environment',
    '/images/articles/cat29/cover-020.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'environmental-justice-and-mental-health' AND category_id = v_cat_id;

  -- CAT29-021: Environmental Racism and Its Mental Health Consequences
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Environmental Racism and Its Mental Health Consequences',
    'environmental-racism-mental-health-consequences',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['environmental racism mental health', 'environmental justice psychology', 'pollution communities of color', 'toxic stress environmental', 'environmental inequality health'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-021',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How the disproportionate exposure of communities of color to environmental hazards—pollution, toxic waste, industrial contamination—affects mental health through direct toxicological, stress, and psychosocial pathways.',
    '/images/articles/cat29/cover-021.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT29-022: Climate Displacement and Mental Health: The Psychology of Cl
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Climate Displacement and Mental Health: The Psychology of Climate Refugees',
    'climate-displacement-mental-health-climate-refugees',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['climate refugees mental health', 'climate displacement psychology', 'environmental migration', 'climate forced migration', 'displacement trauma'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-022',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychological impact of climate-driven displacement, including the mental health effects of losing home, community, and cultural identity to environmental change, and the unique challenges facing climate refugees.',
    '/images/articles/cat29/cover-022.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT29-023: Natural Disasters and Psychological Aftermath: Understanding
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Natural Disasters and Psychological Aftermath: Understanding Trauma Responses',
    'natural-disasters-psychological-aftermath',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['natural disaster trauma', 'disaster mental health', 'PTSD natural disaster', 'disaster psychology', 'post-disaster recovery'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-023',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychological impact of natural disasters, including PTSD, depression, grief, and community-level trauma, the risk and resilience factors that shape outcomes, and evidence-based approaches to disaster mental health.',
    '/images/articles/cat29/cover-023.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT29-024: Water Insecurity and Mental Health: The Hidden Crisis
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Water Insecurity and Mental Health: The Hidden Crisis',
    'water-insecurity-mental-health-hidden-crisis',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['water insecurity mental health', 'water scarcity psychology', 'water stress', 'water access wellbeing', 'water poverty mental health'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-024',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How water insecurity—inadequate access to safe, affordable, reliable drinking water—affects mental health through stress, worry, shame, and the daily burden of water management in water-scarce communities.',
    '/images/articles/cat29/cover-024.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT29-025: Air Pollution and the Brain: Cognitive and Emotional Effects
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Air Pollution and the Brain: Cognitive and Emotional Effects',
    'air-pollution-brain-cognitive-emotional-effects',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['air pollution brain', 'air pollution mental health', 'particulate matter cognitive', 'pollution depression', 'air quality anxiety'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-025',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How air pollution affects brain function, mental health, and cognitive performance, including evidence linking particulate matter and other pollutants to depression, anxiety, cognitive decline, and neurodevelopmental disorders.',
    '/images/articles/cat29/cover-025.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT29-026: Heat Waves and Psychology: How Temperature Affects Mental He
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Heat Waves and Psychology: How Temperature Affects Mental Health',
    'heat-waves-psychology-temperature-mental-health',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['heat mental health', 'temperature aggression', 'heat waves psychology', 'extreme heat suicide', 'heat cognitive impairment'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-026',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The evidence linking extreme heat and rising temperatures to mental health outcomes including aggression, suicide, psychiatric emergency visits, and cognitive impairment, and what climate warming means for psychological wellbeing.',
    '/images/articles/cat29/cover-026.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'nature-based-therapy-and-ecotherapy' AND category_id = v_cat_id;

  -- CAT29-027: Nature Deficit Disorder: The Mental Health Cost of an Indoor
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Nature Deficit Disorder: The Mental Health Cost of an Indoor Generation',
    'nature-deficit-disorder-indoor-generation',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['nature deficit disorder', 'nature mental health', 'indoor generation psychology', 'nature connection wellbeing', 'Richard Louv'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-027',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Exploring the psychological and developmental consequences of disconnection from nature, the evidence for nature''s mental health benefits, and why the modern shift to indoor living represents a growing mental health concern.',
    '/images/articles/cat29/cover-027.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT29-028: Forest Bathing (Shinrin-Yoku): The Science Behind the Practi
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Forest Bathing (Shinrin-Yoku): The Science Behind the Practice',
    'forest-bathing-shinrin-yoku-science',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['shinrin-yoku', 'forest bathing', 'forest therapy science', 'nature therapy evidence', 'phytoncides mental health'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-028',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The evidence base for shinrin-yoku (forest bathing) as a mental health intervention, including its effects on stress hormones, immune function, mood, and cognitive performance, and how to practice it effectively.',
    '/images/articles/cat29/cover-028.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT29-029: Horticultural Therapy: Healing Through Gardening
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Horticultural Therapy: Healing Through Gardening',
    'horticultural-therapy-healing-through-gardening',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['horticultural therapy', 'gardening mental health', 'therapeutic gardening', 'garden therapy depression', 'nature-based therapy'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-029',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The evidence for horticultural therapy as a mental health intervention, including its mechanisms of action, clinical applications for depression, anxiety, PTSD, and dementia, and how gardening promotes psychological recovery.',
    '/images/articles/cat29/cover-029.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT29-030: Blue Mind: The Psychology of Water and Mental Health
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Blue Mind: The Psychology of Water and Mental Health',
    'blue-mind-psychology-water-mental-health',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['blue mind', 'water mental health', 'blue space psychology', 'ocean therapy', 'coastal mental health'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-030',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding the science behind water''s calming effect on the human mind, including research on blue spaces, coastal proximity, and the neurological mechanisms through which water environments promote mental health.',
    '/images/articles/cat29/cover-030.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT29-031: Wilderness Therapy: Evidence, Outcomes, and Who It Helps
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Wilderness Therapy: Evidence, Outcomes, and Who It Helps',
    'wilderness-therapy-evidence-outcomes',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['wilderness therapy', 'outdoor behavioral healthcare', 'wilderness therapy evidence', 'adventure therapy', 'nature-based treatment'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-031',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A comprehensive examination of wilderness therapy as a mental health intervention, including its evidence base, therapeutic mechanisms, appropriate populations, ethical considerations, and how it compares to traditional treatment.',
    '/images/articles/cat29/cover-031.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT29-032: Animal-Assisted Therapy: The Science Behind the Healing Bond
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Animal-Assisted Therapy: The Science Behind the Healing Bond',
    'animal-assisted-therapy-science-behind-healing-bond',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['animal-assisted therapy', 'pet therapy mental health', 'human-animal bond psychology', 'therapy animals evidence', 'oxytocin pet interaction'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-032',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The evidence base for animal-assisted therapy in mental health, including the neuroscience of human-animal bonding, clinical applications for PTSD, depression, autism, and anxiety, and the oxytocin-mediated mechanisms of therapeutic animal contact.',
    '/images/articles/cat29/cover-032.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT29-033: Ecopsychology: Reconnecting the Human Psyche with the Natura
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Ecopsychology: Reconnecting the Human Psyche with the Natural World',
    'ecopsychology-reconnecting-human-psyche-natural-world',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['ecopsychology', 'ecological psychology', 'nature connection psychology', 'Theodore Roszak', 'human nature relationship'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-033',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding ecopsychology as a field that bridges psychology and ecology, its foundational principles, clinical applications, and implications for understanding mental health as inseparable from environmental health.',
    '/images/articles/cat29/cover-033.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'planetary-mental-health' AND category_id = v_cat_id;

  -- CAT29-034: Rewilding the Mind: The Psychological Case for Wild Nature
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Rewilding the Mind: The Psychological Case for Wild Nature',
    'rewilding-mind-psychological-case-wild-nature',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['rewilding psychology', 'wilderness mental health', 'awe nature', 'biodiversity mental health', 'wild nature benefits'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-034',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Why wild, unmanaged natural environments offer distinct psychological benefits beyond those of parks and gardens, including the neuroscience of awe, the psychological effects of biodiversity, and what we lose when wilderness disappears.',
    '/images/articles/cat29/cover-034.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT29-035: Environmental Identity: How Connection to Nature Shapes Who 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Environmental Identity: How Connection to Nature Shapes Who We Are',
    'environmental-identity-self-nature-connection',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['environmental identity', 'nature connectedness', 'self nature connection', 'ecological identity', 'biophilia psychology'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-035',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of environmental identity and nature connectedness, including how the degree to which people see themselves as part of nature affects wellbeing, environmental behavior, and the experience of ecological crisis.',
    '/images/articles/cat29/cover-035.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT29-036: Indigenous Ecological Knowledge and Mental Health: Wisdom fo
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Indigenous Ecological Knowledge and Mental Health: Wisdom for a Warming World',
    'indigenous-ecological-knowledge-mental-health-wisdom',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['indigenous ecological knowledge', 'traditional ecological knowledge mental health', 'land based healing', 'indigenous psychology nature', 'reciprocity nature wellbeing'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-036',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How Indigenous approaches to human-nature relationships offer insights for mental health in the ecological crisis, including the psychology of reciprocity with the natural world, land-based healing practices, and the mental health implications of ecological knowledge systems.',
    '/images/articles/cat29/cover-036.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT29-037: The Sixth Extinction: The Psychology of Biodiversity Loss an
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Sixth Extinction: The Psychology of Biodiversity Loss and Species Grief',
    'sixth-extinction-psychology-biodiversity-loss-grief',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['species grief', 'biodiversity loss psychology', 'ecological mourning', 'sixth extinction mental health', 'species extinction grief'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-037',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding the psychological impact of the global biodiversity crisis, including species grief, ecological mourning, the mental health effects of living through a mass extinction, and how to process the loss of the non-human world.',
    '/images/articles/cat29/cover-037.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT29-038: Ocean Health and Human Mental Health: The Blue Planet Crisis
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Ocean Health and Human Mental Health: The Blue Planet Crisis',
    'ocean-health-human-mental-health-blue-planet-crisis',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['ocean mental health', 'blue space psychology', 'ocean degradation grief', 'coastal wellbeing', 'marine conservation mental health'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-038',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychological relationship between humans and the ocean, including the mental health benefits of ocean proximity, the emerging psychological impact of ocean degradation, and why the health of the seas matters for the health of the mind.',
    '/images/articles/cat29/cover-038.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT29-039: Deforestation and Mental Health: When the Forests Fall
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Deforestation and Mental Health: When the Forests Fall',
    'deforestation-mental-health-when-forests-fall',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['deforestation mental health', 'forest loss psychology', 'trees wellbeing', 'logging psychological impact', 'forest destruction grief'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-039',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychological impact of deforestation on individuals and communities, including the mental health effects of forest loss, the science of human-forest relationships, and what the destruction of the world''s forests means for the human mind.',
    '/images/articles/cat29/cover-039.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT29-040: Anthropocene Anxiety: Living in the Age of Human Dominance
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Anthropocene Anxiety: Living in the Age of Human Dominance',
    'anthropocene-anxiety-living-age-human-dominance',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['anthropocene anxiety', 'anthropocene psychology', 'existential anxiety environment', 'human dominance planet', 'ecological existentialism'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-040',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychological experience of living in the Anthropocene—the geological epoch defined by human impact on the planet—including existential anxiety, temporal disorientation, and the challenge of finding meaning in an era of unprecedented human power and ecological destruction.',
    '/images/articles/cat29/cover-040.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT29-041: Environmental Justice Movements and Collective Healing
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Environmental Justice Movements and Collective Healing',
    'environmental-justice-movements-collective-healing',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['environmental justice mental health', 'collective healing', 'community organizing psychology', 'social movements wellbeing', 'environmental activism healing'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-041',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How environmental justice movements serve as vehicles for collective psychological healing, including the mental health benefits of community organizing, the psychology of collective action against environmental harm, and the therapeutic dimensions of social movements.',
    '/images/articles/cat29/cover-041.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'resilience-adaptation-and-the-future' AND category_id = v_cat_id;

  -- CAT29-042: Psychological Resilience in Environmental Crisis: What Helps
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Psychological Resilience in Environmental Crisis: What Helps People Cope',
    'psychological-resilience-environmental-crisis',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['environmental resilience', 'psychological resilience climate', 'coping environmental crisis', 'resilience ecological threat', 'community resilience environment'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-042',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The science of psychological resilience in the face of environmental threats, including what research reveals about who copes well with ecological crisis and why, the role of community, meaning-making, and agency in environmental resilience.',
    '/images/articles/cat29/cover-042.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT29-043: Climate-Adapted Therapy: Psychotherapy for a Warming World
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Climate-Adapted Therapy: Psychotherapy for a Warming World',
    'climate-adapted-therapy-psychotherapy-warming-world',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['climate therapy', 'eco-therapy', 'climate aware psychotherapy', 'environmental mental health treatment', 'climate distress therapy'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-043',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How mental health professionals are adapting therapeutic approaches to address climate-related psychological distress, including climate-aware therapy models, the integration of ecological context into clinical practice, and what effective environmental mental health treatment looks like.',
    '/images/articles/cat29/cover-043.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT29-044: Children and Nature: The Developmental Psychology of Outdoor
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Children and Nature: The Developmental Psychology of Outdoor Play',
    'children-nature-developmental-psychology-outdoor-play',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['children nature development', 'outdoor play psychology', 'nature child development', 'nature deficit children', 'outdoor play mental health'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-044',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The evidence for nature''s role in child development, including how outdoor play supports cognitive, emotional, social, and physical development, the consequences of nature deficit in childhood, and why access to nature is a developmental necessity.',
    '/images/articles/cat29/cover-044.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT29-045: Climate Communication Psychology: How to Talk About the Cris
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Climate Communication Psychology: How to Talk About the Crisis',
    'climate-communication-psychology-how-talk-crisis',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['climate communication', 'environmental communication psychology', 'talking about climate change', 'climate messaging', 'framing climate change'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-045',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of effective climate communication, including why facts alone don''t change minds, the role of framing, identity, and emotion in environmental messaging, and evidence-based approaches to discussing climate change that actually motivate action.',
    '/images/articles/cat29/cover-045.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT29-046: Future Generations: The Psychology of Intergenerational Envi
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Future Generations: The Psychology of Intergenerational Environmental Ethics',
    'future-generations-psychology-intergenerational-ethics',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['intergenerational ethics', 'future generations psychology', 'temporal discounting environment', 'environmental responsibility future', 'legacy psychology'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-046',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How humans think about future generations and why we struggle to act on their behalf, including the psychology of temporal discounting, moral obligation to the unborn, and what motivates intergenerational environmental responsibility.',
    '/images/articles/cat29/cover-046.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT29-047: Eco-Spirituality: Nature, the Sacred, and Psychological Tran
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Eco-Spirituality: Nature, the Sacred, and Psychological Transcendence',
    'eco-spirituality-nature-sacred-psychological-transcendence',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['eco-spirituality', 'nature spirituality', 'transcendence nature', 'awe psychology', 'sacred nature'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-047',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of spiritual experiences in nature, including the science of awe and transcendence, the relationship between nature connection and spiritual wellbeing, and how ecological spirituality supports mental health in a secular age.',
    '/images/articles/cat29/cover-047.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT29-048: Post-Disaster Growth: The Psychology of Rebuilding After Env
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Post-Disaster Growth: The Psychology of Rebuilding After Environmental Catastrophe',
    'post-disaster-growth-psychology-rebuilding-after-environmental-catastrophe',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['post-disaster growth', 'post-traumatic growth environment', 'disaster recovery psychology', 'rebuilding after catastrophe', 'community resilience disaster'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-048',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The science of psychological growth after environmental disasters, including how communities rebuild meaning and identity after catastrophe, the relationship between trauma and transformation, and what promotes resilience versus chronic distress in disaster survivors.',
    '/images/articles/cat29/cover-048.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT29-049: Hope and Agency: The Psychology of Meaningful Environmental 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Hope and Agency: The Psychology of Meaningful Environmental Action',
    'hope-agency-psychology-environmental-action',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['environmental hope psychology', 'agency environmental action', 'active hope climate', 'psychological motivation environment', 'self-efficacy climate action'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-049',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of hope in the context of environmental crisis, including the difference between passive optimism and active hope, how agency beliefs drive environmental engagement, and what sustains meaningful action when outcomes are uncertain.',
    '/images/articles/cat29/cover-049.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT29-050: Transformative Adaptation: The Psychology of Thriving Throug
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Transformative Adaptation: The Psychology of Thriving Through Environmental Change',
    'transformative-adaptation-psychology-thriving-through-change',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['transformative adaptation psychology', 'thriving environmental change', 'psychological adaptation climate', 'identity flexibility change', 'resilience adaptation'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-050',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How humans psychologically adapt to large-scale environmental change, including the difference between incremental and transformative adaptation, the role of identity flexibility in navigating change, and what promotes thriving rather than mere survival in a changing world.',
    '/images/articles/cat29/cover-050.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT29-051: Environmental Education and Psychology: Teaching in the Age 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Environmental Education and Psychology: Teaching in the Age of Planetary Crisis',
    'environmental-education-psychology-teaching-planet-crisis',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['environmental education psychology', 'teaching climate change', 'ecological literacy', 'environmental identity development', 'climate education despair'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-051',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of effective environmental education, including how to teach about ecological crisis without causing despair, the development of ecological literacy and identity, and evidence-based approaches to fostering environmental responsibility in children and adults.',
    '/images/articles/cat29/cover-051.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT29-052: Collective Intelligence and Environmental Problem-Solving
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Collective Intelligence and Environmental Problem-Solving',
    'collective-intelligence-environmental-problem-solving',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['collective intelligence environment', 'group problem solving ecology', 'wisdom of crowds climate', 'diverse perspectives environment', 'collaborative decision making'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-052',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How groups think together about environmental challenges, including the psychology of collective intelligence, conditions that promote wise group decisions about ecological issues, and why diverse perspectives improve environmental problem-solving.',
    '/images/articles/cat29/cover-052.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT29-053: The Psychology of Place: Attachment, Belonging, and Landscap
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Place: Attachment, Belonging, and Landscape',
    'psychology-place-attachment-belonging-landscape',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['place attachment psychology', 'place identity', 'belonging landscape', 'sense of place mental health', 'place disruption grief'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-053',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How humans form psychological bonds with places and landscapes, including the science of place attachment, how place identity shapes wellbeing, the psychological consequences of place disruption, and why belonging to a landscape matters for mental health.',
    '/images/articles/cat29/cover-053.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'sustainability-and-wellbeing' AND category_id = v_cat_id;

  -- CAT29-054: The Psychology of Sustainable Behavior: Why Knowing Isn\''t 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Sustainable Behavior: Why Knowing Isn\''t Enough',
    'psychology-sustainable-behavior-why-knowing-not-enough',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['sustainable behavior psychology', 'value action gap', 'environmental behavior change', 'green behavior psychology', 'pro-environmental behavior'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-054',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding the psychological barriers between environmental knowledge and sustainable action, including the value-action gap, cognitive biases, habit formation, and what actually motivates lasting behavioral change.',
    '/images/articles/cat29/cover-054.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT29-055: Minimalism and Mental Health: The Psychology of Owning Less
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Minimalism and Mental Health: The Psychology of Owning Less',
    'minimalism-mental-health-psychology-owning-less',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['minimalism mental health', 'clutter psychology', 'materialism wellbeing', 'simple living psychology', 'decluttering stress'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-055',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychological evidence for and against minimalism, including the effects of clutter on stress and cognition, the relationship between materialism and wellbeing, and the mental health implications of intentional simplicity.',
    '/images/articles/cat29/cover-055.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT29-056: Eco-Activism and Burnout: Sustaining the Sustainers
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Eco-Activism and Burnout: Sustaining the Sustainers',
    'eco-activism-burnout-sustaining-sustainers',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['activist burnout', 'eco-activism mental health', 'sustainable activism', 'environmental activist burnout', 'compassion fatigue activism'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-056',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of activist burnout in environmental movements, including the emotional costs of sustained engagement with ecological crisis, the mechanisms of compassion fatigue and moral injury in activists, and evidence-based strategies for sustainable activism.',
    '/images/articles/cat29/cover-056.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT29-057: The Psychological Benefits of Growing Your Own Food
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychological Benefits of Growing Your Own Food',
    'psychological-benefits-growing-own-food',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['growing food mental health', 'gardening psychology', 'community gardens wellbeing', 'food growing therapy', 'allotment mental health'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-057',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The evidence linking food growing to improved mental health, including the psychological mechanisms of gardening, community gardens and social connection, and how cultivating food supports wellbeing across the lifespan.',
    '/images/articles/cat29/cover-057.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT29-058: Slow Living: The Mental Health Case for Decelerating
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Slow Living: The Mental Health Case for Decelerating',
    'slow-living-mental-health-case-decelerating',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['slow living mental health', 'deceleration psychology', 'busyness culture', 'slow movement', 'time pressure stress'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-058',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychological evidence for slowing down, including the mental health costs of acceleration culture, the neuroscience of busyness, the slow movement''s origins, and evidence-based approaches to intentional deceleration.',
    '/images/articles/cat29/cover-058.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT29-059: Consumerism, Advertising, and Psychological Manipulation
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Consumerism, Advertising, and Psychological Manipulation',
    'consumerism-advertising-psychological-manipulation',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['consumerism psychology', 'advertising mental health', 'psychological manipulation marketing', 'consumer culture wellbeing', 'advertising self-esteem'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-059',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How consumer culture and advertising exploit psychological vulnerabilities to drive purchasing behavior, including the effects on self-esteem, body image, identity, and mental health, and what the science says about resisting manipulative marketing.',
    '/images/articles/cat29/cover-059.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT29-060: Digital Detox: Screen Time, Nature, and the Case for Reconne
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Digital Detox: Screen Time, Nature, and the Case for Reconnection',
    'digital-detox-screen-time-nature-reconnection',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['digital detox psychology', 'screen time mental health', 'nature reconnection', 'technology addiction', 'digital wellness'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-060',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of excessive screen time and nature disconnection, including the cognitive and emotional effects of digital saturation, evidence for nature as a counterbalance, and practical approaches to rebuilding a healthier relationship with technology and the natural world.',
    '/images/articles/cat29/cover-060.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT29-061: Food Systems and Mental Health: What We Eat, How We Feel
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Food Systems and Mental Health: What We Eat, How We Feel',
    'food-systems-mental-health-what-we-eat-how-we-feel',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['nutritional psychiatry', 'food mental health', 'gut brain connection', 'diet depression', 'food systems psychology'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-061',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The emerging science of nutritional psychiatry and the gut-brain connection, including how modern industrialized food systems affect mental health, the role of diet in depression and anxiety, and the psychological implications of sustainable food choices.',
    '/images/articles/cat29/cover-061.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'urban-psychology-and-built-environment' AND category_id = v_cat_id;

  -- CAT29-062: Urban Green Spaces and Mental Health: How City Design Shapes
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Urban Green Spaces and Mental Health: How City Design Shapes Psychology',
    'urban-green-spaces-mental-health-city-design',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['urban green space mental health', 'parks depression', 'city design psychology', 'urban nature', 'green infrastructure wellbeing'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-062',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The evidence linking urban green spaces to mental health, including how parks, trees, and urban nature access affect depression, anxiety, cognitive function, and community wellbeing in cities.',
    '/images/articles/cat29/cover-062.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT29-063: Noise Pollution: The Silent Mental Health Crisis
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Noise Pollution: The Silent Mental Health Crisis',
    'noise-pollution-silent-mental-health-crisis',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['noise pollution mental health', 'noise stress psychology', 'urban noise depression', 'noise sleep disruption', 'traffic noise anxiety'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-063',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The evidence linking chronic noise pollution to mental health disorders including depression, anxiety, cognitive impairment, and sleep disruption, and why environmental noise is an underrecognized public health threat.',
    '/images/articles/cat29/cover-063.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT29-064: Light Pollution, Circadian Disruption, and Mental Health
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Light Pollution, Circadian Disruption, and Mental Health',
    'light-pollution-circadian-disruption-mental-health',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['light pollution mental health', 'circadian disruption depression', 'artificial light at night', 'blue light sleep', 'circadian rhythm psychology'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-064',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How artificial light at night disrupts circadian rhythms and affects mental health, including links to depression, bipolar disorder, anxiety, and cognitive impairment, and strategies for protecting circadian health.',
    '/images/articles/cat29/cover-064.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT29-065: Sick Building Syndrome: How Indoor Environments Affect Menta
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Sick Building Syndrome: How Indoor Environments Affect Mental Health',
    'sick-building-syndrome-indoor-environments-mental-health',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['sick building syndrome', 'indoor air quality mental health', 'building design psychology', 'ventilation cognitive function', 'office environment wellbeing'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-065',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding how indoor environmental quality—air, temperature, ventilation, lighting, and design—affects cognitive function, mood, productivity, and mental health, and what the research says about optimizing indoor spaces.',
    '/images/articles/cat29/cover-065.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT29-066: Architecture and Mood: How Buildings Shape Our Emotions
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Architecture and Mood: How Buildings Shape Our Emotions',
    'architecture-mood-how-buildings-shape-emotions',
    'draft',
    'Environmental, Eco-Psychology & Planetary Mental Health',
    ARRAY['architecture mood', 'neuroarchitecture', 'building design emotions', 'ceiling height psychology', 'spatial design wellbeing'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT29-066',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How architectural design—ceiling height, window placement, spatial layout, materials, and proportions—affects mood, behavior, stress, and cognitive function, drawing on neuroarchitecture and environmental psychology.',
    '/images/articles/cat29/cover-066.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

END $$;

-- Category 30: life-skills-practical-psychology (110 articles)
DO $$
DECLARE
  v_cat_id UUID;
  v_sub_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'life-skills-practical-psychology';

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'career-and-professional-development' AND category_id = v_cat_id;

  -- CAT30-001: The Psychology of Career Transitions: Navigating Professiona
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Career Transitions: Navigating Professional Change',
    'psychology-career-transitions-navigating-professional-change',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['career transition psychology', 'career change', 'professional identity', 'Bridges transition model', 'job change anxiety'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-001',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of career transitions, including the identity disruption that career change produces, Bridges'' transition model, the role of grief and uncertainty in professional change, and evidence-based strategies for navigating career transitions with psychological resilience.',
    '/images/articles/cat30/cover-001.svg',
    5,
    false,
    true,
    NULL,
    TRUE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-002: Impostor Syndrome: The Psychology of Feeling Like a Fraud
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Impostor Syndrome: The Psychology of Feeling Like a Fraud',
    'impostor-syndrome-psychology-feeling-like-fraud',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['impostor syndrome psychology', 'feeling like fraud', 'impostor phenomenon', 'self-doubt achievers', 'perfectionism impostor'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-002',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of impostor syndrome, including why high-achieving people doubt their competence, the cognitive patterns that maintain impostor feelings, the role of perfectionism and attribution, and evidence-based strategies for managing impostor experiences.',
    '/images/articles/cat30/cover-002.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-003: The Psychology of Burnout: When Work Depletes Everything
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Burnout: When Work Depletes Everything',
    'psychology-burnout-when-work-depletes-everything',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['burnout psychology', 'Maslach burnout', 'emotional exhaustion', 'job demands resources', 'burnout prevention'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-003',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of burnout, including Maslach''s three dimensions of burnout, the job demands-resources model, why burnout is an organizational problem not a personal weakness, the distinction between burnout and depression, and evidence-based strategies for prevention and recovery.',
    '/images/articles/cat30/cover-003.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-004: The Psychology of Leadership: What Makes People Follow
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Leadership: What Makes People Follow',
    'psychology-leadership-what-makes-people-follow',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['leadership psychology', 'transformational leadership', 'emotional intelligence leadership', 'psychological safety', 'servant leadership'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-004',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of leadership, including transformational vs. transactional leadership, the role of emotional intelligence, psychological safety, servant leadership, and evidence-based insights on what makes leaders effective and what makes people willing to follow.',
    '/images/articles/cat30/cover-004.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-005: The Psychology of Feedback: Giving and Receiving Criticism C
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Feedback: Giving and Receiving Criticism Constructively',
    'psychology-feedback-giving-receiving-criticism-constructively',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['feedback psychology', 'constructive criticism', 'receiving feedback', 'giving feedback', 'feedback defensiveness'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-005',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of feedback in professional settings, including why feedback often fails, the neuroscience of receiving criticism, the distinction between evaluation and coaching, and evidence-based approaches to giving and receiving feedback that promotes growth rather than defensiveness.',
    '/images/articles/cat30/cover-005.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-006: The Psychology of Workplace Relationships: Navigating Profes
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Workplace Relationships: Navigating Professional Dynamics',
    'psychology-workplace-relationships-navigating-professional-dynamics',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['workplace relationships psychology', 'professional dynamics', 'trust at work', 'difficult colleagues', 'psychological contract'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-006',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of workplace relationships, including how professional relationships affect performance and wellbeing, the neuroscience of social connection at work, navigating difficult colleagues, the role of trust and psychological contracts, and evidence-based strategies for building productive p',
    '/images/articles/cat30/cover-006.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-007: The Psychology of Mentorship: The Power of Developmental Rel
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Mentorship: The Power of Developmental Relationships',
    'psychology-mentorship-power-developmental-relationships',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['mentorship psychology', 'mentoring relationships', 'career development mentoring', 'psychosocial mentoring', 'mentor benefits'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-007',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of mentorship, including how mentoring relationships affect career development and wellbeing, the psychosocial and career functions of mentoring, the benefits for mentors and mentees, and evidence-based principles for effective mentoring relationships.',
    '/images/articles/cat30/cover-007.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-008: The Psychology of Networking: Building Professional Connecti
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Networking: Building Professional Connections Authentically',
    'psychology-networking-building-professional-connections-authentically',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['networking psychology', 'professional connections', 'weak ties theory', 'authentic networking', 'networking anxiety'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-008',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of professional networking, including why networking feels inauthentic for many people, the science of weak ties and structural holes, the role of reciprocity and genuine interest, and evidence-based strategies for building professional networks that feel authentic rather than transac',
    '/images/articles/cat30/cover-008.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-009: The Psychology of Meaning at Work: Finding Purpose in Your P
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Meaning at Work: Finding Purpose in Your Profession',
    'psychology-meaning-work-finding-purpose-profession',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['meaning at work psychology', 'purpose profession', 'job crafting', 'calling career job', 'meaningful work'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-009',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of meaning at work, including the distinction between jobs, careers, and callings, job crafting, the role of purpose in engagement and wellbeing, and evidence-based approaches to finding or creating meaning in professional life.',
    '/images/articles/cat30/cover-009.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-010: The Psychology of Remote Work: Thriving in a Distributed Pro
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Remote Work: Thriving in a Distributed Professional World',
    'psychology-remote-work-thriving-distributed-professional-world',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['remote work psychology', 'work from home mental health', 'distributed work', 'remote work isolation', 'virtual teams psychology'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-010',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of remote work, including the benefits and challenges of working from home, the role of autonomy and isolation, boundary management in remote settings, and evidence-based strategies for maintaining wellbeing and productivity in distributed work environments.',
    '/images/articles/cat30/cover-010.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'communication-and-social-skills' AND category_id = v_cat_id;

  -- CAT30-011: The Science of Active Listening: The Psychology of Truly Hea
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Science of Active Listening: The Psychology of Truly Hearing Others',
    'science-active-listening-psychology-truly-hearing',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['active listening psychology', 'deep listening skills', 'empathic listening', 'listening techniques', 'communication psychology'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-011',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of active listening, including what makes someone a good listener, the cognitive and emotional processes involved in deep listening, why most people listen poorly, and evidence-based techniques for improving listening skills.',
    '/images/articles/cat30/cover-011.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-012: Assertive Communication: Speaking Up Without Aggression
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Assertive Communication: Speaking Up Without Aggression',
    'assertive-communication-speaking-up-without-aggression',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['assertive communication', 'assertiveness psychology', 'speaking up skills', 'passive aggressive', 'communication styles'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-012',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of assertive communication, including the difference between passive, aggressive, and assertive styles, why assertiveness is difficult for many people, the cognitive and emotional barriers to speaking up, and evidence-based techniques for developing assertive communication skills.',
    '/images/articles/cat30/cover-012.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-013: Conflict Resolution: The Psychology of Navigating Disagreeme
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Conflict Resolution: The Psychology of Navigating Disagreement',
    'conflict-resolution-psychology-navigating-disagreement',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['conflict resolution psychology', 'managing disagreement', 'conflict styles', 'constructive conflict', 'relationship conflict'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-013',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of conflict resolution, including why conflict is inevitable in close relationships, the five styles of conflict management, how emotions shape conflict behavior, the difference between destructive and constructive conflict, and evidence-based strategies for resolving disagreements.',
    '/images/articles/cat30/cover-013.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-014: Nonviolent Communication: Connecting Through Empathy
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Nonviolent Communication: Connecting Through Empathy',
    'nonviolent-communication-connecting-through-empathy',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['nonviolent communication', 'NVC psychology', 'empathic communication', 'Marshall Rosenberg', 'compassionate communication'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-014',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The principles and psychology of Nonviolent Communication (NVC), including how to observe without evaluating, identify feelings and needs, make requests rather than demands, and use empathic listening to transform difficult conversations into opportunities for connection.',
    '/images/articles/cat30/cover-014.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-015: Social Anxiety: Understanding and Managing the Fear of Judgm
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Social Anxiety: Understanding and Managing the Fear of Judgment',
    'social-anxiety-psychology-fear-judgment',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['social anxiety psychology', 'fear of judgment', 'social phobia', 'social anxiety management', 'fear negative evaluation'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-015',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of social anxiety, including the cognitive model of social anxiety disorder, what maintains the fear of negative evaluation, the role of safety behaviors in perpetuating anxiety, and evidence-based strategies for reducing social anxiety and building social confidence.',
    '/images/articles/cat30/cover-015.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-016: Public Speaking: The Psychology of Finding Your Voice
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Public Speaking: The Psychology of Finding Your Voice',
    'public-speaking-psychology-finding-voice',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['public speaking anxiety', 'fear of public speaking', 'glossophobia', 'speech anxiety psychology', 'presentation skills'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-016',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of public speaking anxiety, including why fear of public speaking is so common, how the brain processes speaking threats, the role of cognitive appraisal in performance anxiety, and evidence-based strategies for managing nervousness and delivering effective presentations.',
    '/images/articles/cat30/cover-016.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-017: The Psychology of Empathy: Understanding Others\'' Experienc
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Empathy: Understanding Others\'' Experience',
    'psychology-empathy-understanding-others-experience',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['empathy psychology', 'cognitive empathy', 'affective empathy', 'mirror neurons', 'empathic understanding'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-017',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The science of empathy, including the distinction between cognitive and affective empathy, the neuroscience of mirror neurons and empathic resonance, why empathy is both a capacity and a skill, the difference between empathy and sympathy, and how to develop greater empathic ability.',
    '/images/articles/cat30/cover-017.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-018: Difficult Conversations: The Psychology of Saying Hard Thing
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Difficult Conversations: The Psychology of Saying Hard Things',
    'difficult-conversations-psychology-saying-hard-things',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['difficult conversations psychology', 'hard conversations skills', 'sensitive topics communication', 'emotional conversations', 'confrontation avoidance'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-018',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of difficult conversations, including why people avoid hard conversations, the three layers of every difficult conversation, how emotions shape communication breakdowns, and evidence-based strategies for navigating sensitive topics with honesty and care.',
    '/images/articles/cat30/cover-018.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-019: The Psychology of Boundaries: Protecting Your Wellbeing
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Boundaries: Protecting Your Wellbeing',
    'psychology-boundaries-protecting-your-wellbeing',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['personal boundaries psychology', 'setting boundaries', 'healthy boundaries', 'boundary setting skills', 'emotional boundaries'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-019',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of personal boundaries, including what boundaries are and why they matter, the different types of boundaries, why setting boundaries is difficult, the connection between boundaries and self-worth, and evidence-based strategies for establishing and maintaining healthy limits.',
    '/images/articles/cat30/cover-019.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-020: Negotiation Psychology: The Art of Mutual Agreement
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Negotiation Psychology: The Art of Mutual Agreement',
    'negotiation-psychology-art-mutual-agreement',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['negotiation psychology', 'negotiation skills', 'anchoring bias negotiation', 'integrative negotiation', 'win-win negotiation'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-020',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of negotiation, including cognitive biases that affect negotiators, the power of anchoring and framing, integrative vs. distributive approaches, the role of emotions in negotiation outcomes, and evidence-based strategies for reaching agreements that satisfy all parties.',
    '/images/articles/cat30/cover-020.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-021: The Psychology of Small Talk: The Science of Casual Conversa
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Small Talk: The Science of Casual Conversation',
    'psychology-small-talk-science-casual-conversation',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['small talk psychology', 'casual conversation science', 'social interaction skills', 'conversation skills', 'phatic communication'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-021',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of small talk, including why casual conversation matters more than people think, the social functions of seemingly trivial exchanges, why small talk is anxiety-provoking for many people, and research-based strategies for making casual conversation more comfortable and meaningful.',
    '/images/articles/cat30/cover-021.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-022: Giving and Receiving Feedback: The Psychology of Growth Comm
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Giving and Receiving Feedback: The Psychology of Growth Communication',
    'giving-receiving-feedback-psychology-growth-communication',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['feedback psychology', 'giving feedback skills', 'receiving feedback', 'constructive criticism', 'growth mindset feedback'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-022',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of feedback, including why feedback is essential for growth but difficult to give and receive, the threat response that feedback triggers, the difference between effective and ineffective feedback, and evidence-based strategies for making feedback a positive force in relationships and',
    '/images/articles/cat30/cover-022.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'creativity-and-problem-solving' AND category_id = v_cat_id;

  -- CAT30-023: The Psychology of Creativity: How New Ideas Emerge
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Creativity: How New Ideas Emerge',
    'psychology-creativity-how-new-ideas-emerge',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['creativity psychology', 'creative thinking', 'divergent thinking', 'creative process stages', 'innovation psychology'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-023',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of creativity, including the cognitive processes that generate novel ideas, the four-stage model of creative thinking, the role of divergent and convergent thinking, the relationship between creativity and mental health, and evidence-based approaches to enhancing creative capacity.',
    '/images/articles/cat30/cover-023.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-024: The Psychology of Problem-Solving: How the Mind Navigates Ob
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Problem-Solving: How the Mind Navigates Obstacles',
    'psychology-problem-solving-how-mind-navigates-obstacles',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['problem solving psychology', 'mental set', 'functional fixedness', 'insight problem solving', 'cognitive strategies'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-024',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of problem-solving, including the distinction between well-defined and ill-defined problems, the role of mental set and functional fixedness, insight versus incremental solving, and evidence-based strategies for improving problem-solving capacity.',
    '/images/articles/cat30/cover-024.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-025: The Psychology of Curiosity: The Power of Wanting to Know
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Curiosity: The Power of Wanting to Know',
    'psychology-curiosity-power-wanting-know',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['curiosity psychology', 'information gap theory', 'epistemic curiosity', 'curiosity learning', 'why we want to know'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-025',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of curiosity, including the information gap theory, the distinction between diversive and specific curiosity, the neuroscience of wanting to know, the relationship between curiosity and learning, and evidence-based approaches to cultivating curiosity as a life skill.',
    '/images/articles/cat30/cover-025.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-026: The Psychology of Innovation: Why New Ideas Succeed or Fail
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Innovation: Why New Ideas Succeed or Fail',
    'psychology-innovation-why-new-ideas-succeed-fail',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['innovation psychology', 'resistance to change', 'status quo bias', 'creative idea adoption', 'novelty penalty'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-026',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of innovation, including why people resist novel ideas, the role of status quo bias and loss aversion, how groups evaluate creative proposals, the difference between idea generation and idea adoption, and evidence-based strategies for introducing change effectively.',
    '/images/articles/cat30/cover-026.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-027: The Psychology of Imagination: Mental Simulation and the Pow
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Imagination: Mental Simulation and the Power of Possibility',
    'psychology-imagination-mental-simulation-possibility',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['imagination psychology', 'mental simulation', 'counterfactual thinking', 'default mode network', 'creative imagination'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-027',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of imagination, including how mental simulation works, the role of the default mode network, counterfactual thinking, the relationship between imagination and empathy, and evidence-based approaches to using imaginative capacity for personal growth and problem-solving.',
    '/images/articles/cat30/cover-027.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-028: The Psychology of Brainstorming: The Science of Group Idea G
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Brainstorming: The Science of Group Idea Generation',
    'psychology-brainstorming-science-group-idea-generation',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['brainstorming psychology', 'group creativity', 'production blocking', 'brainwriting', 'idea generation'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-028',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of brainstorming, including why traditional brainstorming underperforms, production blocking, evaluation apprehension, social loafing, brainwriting and electronic brainstorming alternatives, and evidence-based strategies for effective group idea generation.',
    '/images/articles/cat30/cover-028.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-029: The Psychology of Learning: How the Brain Acquires Knowledge
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Learning: How the Brain Acquires Knowledge',
    'psychology-learning-how-brain-acquires-knowledge',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['learning psychology', 'memory encoding', 'testing effect', 'spaced repetition', 'desirable difficulties'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-029',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of learning, including how memory encoding works, the testing effect, spaced repetition, desirable difficulties, the distinction between surface and deep learning, and evidence-based strategies for more effective knowledge acquisition.',
    '/images/articles/cat30/cover-029.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-030: The Psychology of Expertise: How Mastery Develops
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Expertise: How Mastery Develops',
    'psychology-expertise-how-mastery-develops',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['expertise psychology', 'deliberate practice', 'mastery development', 'expert performance', '10000 hour rule'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-030',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of expertise, including the role of deliberate practice, the 10,000-hour rule and its limitations, expert-novice differences in perception and reasoning, the development of domain knowledge, and evidence-based principles for developing expertise in any field.',
    '/images/articles/cat30/cover-030.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-031: The Psychology of Play: Why Adults Need Play Too
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Play: Why Adults Need Play Too',
    'psychology-play-why-adults-need-play-too',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['adult play psychology', 'play wellbeing', 'playfulness adults', 'play creativity', 'psychology of fun'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-031',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of play, including why play matters for adult wellbeing, the characteristics that define play, the role of play in creativity and stress recovery, play deprivation, and evidence-based approaches to integrating playfulness into adult life.',
    '/images/articles/cat30/cover-031.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-032: The Psychology of Intellectual Humility: The Wisdom of Knowi
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Intellectual Humility: The Wisdom of Knowing Your Limits',
    'psychology-intellectual-humility-wisdom-knowing-limits',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['intellectual humility psychology', 'Dunning-Kruger effect', 'metacognition', 'knowing what you don\', ', '],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-032',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of intellectual humility, including the Dunning-Kruger effect, the relationship between expertise and uncertainty, how intellectual humility enhances learning and decision-making, and evidence-based approaches to cultivating accurate self-assessment.',
    '/images/articles/cat30/cover-032.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'decision-making-and-critical-thinking' AND category_id = v_cat_id;

  -- CAT30-033: The Science of Good Decisions: Psychology, Judgment, and Cho
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Science of Good Decisions: Psychology, Judgment, and Choice',
    'science-good-decisions-psychology-judgment-choice',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['decision making psychology', 'judgment and choice', 'dual process theory', 'cognitive biases decisions', 'better decisions science'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-033',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How human decision-making actually works according to psychological science, including dual-process theory, the role of emotion in judgment, common decision traps, and evidence-based strategies for making better choices in everyday life.',
    '/images/articles/cat30/cover-033.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-034: Cognitive Biases: The Thinking Errors That Shape Your Life
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Cognitive Biases: The Thinking Errors That Shape Your Life',
    'cognitive-biases-thinking-errors-that-shape-your-life',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['cognitive biases', 'thinking errors psychology', 'bias awareness', 'debiasing strategies', 'cognitive distortions'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-034',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A comprehensive guide to the most impactful cognitive biases, including how they work, why they persist, the specific life domains they affect most, and practical strategies for recognizing and correcting biased thinking in everyday decisions.',
    '/images/articles/cat30/cover-034.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-035: Critical Thinking: The Psychology of Evaluating Evidence and
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Critical Thinking: The Psychology of Evaluating Evidence and Claims',
    'critical-thinking-psychology-evaluating-evidence-claims',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['critical thinking psychology', 'evaluating evidence', 'logical fallacies', 'misinformation psychology', 'evidence-based thinking'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-035',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How to think critically about claims, evidence, and arguments, including the psychology of belief formation, the hierarchy of evidence, logical fallacies in everyday reasoning, and practical skills for evaluating information in an age of misinformation.',
    '/images/articles/cat30/cover-035.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-036: Risk Assessment: The Psychology of Uncertainty and Probabili
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Risk Assessment: The Psychology of Uncertainty and Probability',
    'risk-assessment-psychology-uncertainty-probability',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['risk assessment psychology', 'uncertainty decision making', 'probability perception', 'risk perception biases', 'fear vs actual risk'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-036',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How humans perceive and evaluate risk, including why we overestimate some risks and underestimate others, the psychological biases that distort risk assessment, and practical strategies for making better decisions under uncertainty.',
    '/images/articles/cat30/cover-036.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-037: The Psychology of Intuition: When to Trust Your Gut Feeling
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Intuition: When to Trust Your Gut Feeling',
    'psychology-intuition-when-trust-gut-feeling',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['intuition psychology', 'gut feeling science', 'when trust intuition', 'intuitive judgment', 'expert intuition'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-037',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The science of intuition, including when gut feelings are reliable, when they mislead, how expertise builds trustworthy intuitions, the neuroscience of intuitive judgment, and practical guidelines for when to follow your instincts versus when to override them.',
    '/images/articles/cat30/cover-037.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-038: The Psychology of Persuasion: Understanding Influence for Se
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Persuasion: Understanding Influence for Self-Defense',
    'psychology-persuasion-influence-self-defense',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['persuasion psychology', 'influence principles', 'manipulation defense', 'Cialdini influence', 'social influence'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-038',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How persuasion and social influence work psychologically, including Cialdini''s six principles of influence, the psychology of manipulation and compliance, dark patterns in marketing and media, and how to recognize and resist unwanted persuasion in everyday life.',
    '/images/articles/cat30/cover-038.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-039: Decision Fatigue: The Psychology of Willpower and Depletion
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Decision Fatigue: The Psychology of Willpower and Depletion',
    'decision-fatigue-psychology-willpower-depletion',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['decision fatigue', 'ego depletion', 'willpower psychology', 'mental energy decisions', 'choice overload'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-039',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The science of decision fatigue and ego depletion, including how repeated decisions wear down judgment quality, why willpower is a limited resource, the real-world consequences of decision overload, and practical strategies for protecting your decision-making capacity.',
    '/images/articles/cat30/cover-039.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-040: Moral Reasoning: The Psychology of Ethics in Everyday Life
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Moral Reasoning: The Psychology of Ethics in Everyday Life',
    'moral-reasoning-psychology-ethics-everyday-life',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['moral reasoning psychology', 'ethics everyday life', 'moral judgment science', 'moral development', 'ethical decision making'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-040',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How people actually make moral judgments, including the role of emotion and intuition in ethics, moral development across the lifespan, the psychology of moral hypocrisy and self-deception, and practical approaches to developing more thoughtful ethical reasoning.',
    '/images/articles/cat30/cover-040.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-041: Information Overload: The Psychology of Attention in the Dig
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Information Overload: The Psychology of Attention in the Digital Age',
    'information-overload-psychology-attention-digital-age',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['information overload psychology', 'attention digital age', 'cognitive overload', 'distraction science', 'attention economy'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-041',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How the modern information environment overwhelms cognitive capacity, including the neuroscience of attention and distraction, the psychological costs of information excess, the attention economy and its effects on mental health, and strategies for managing information overload.',
    '/images/articles/cat30/cover-041.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-042: Second-Order Thinking: The Psychology of Consequences of Con
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Second-Order Thinking: The Psychology of Consequences of Consequences',
    'second-order-thinking-psychology-consequences-consequences',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['second order thinking', 'consequences psychology', 'systems thinking decisions', 'unintended consequences', 'downstream effects'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-042',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How to think beyond immediate outcomes to consider downstream effects, including the cognitive challenges of multi-step reasoning, systems thinking in everyday decisions, the psychology of unintended consequences, and strategies for developing more sophisticated causal thinking.',
    '/images/articles/cat30/cover-042.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-043: Mental Models: Thinking Tools for Better Understanding
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Mental Models: Thinking Tools for Better Understanding',
    'mental-models-thinking-tools-better-understanding',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['mental models psychology', 'thinking frameworks', 'cognitive models', 'reasoning tools', 'thinking toolkit'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-043',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How mental models shape perception and reasoning, including what mental models are, the most useful thinking frameworks from psychology and science, how to build a personal toolkit of mental models, and why the range of your models determines the quality of your thinking.',
    '/images/articles/cat30/cover-043.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-044: The Psychology of Regret: Making Peace with Your Decisions
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Regret: Making Peace with Your Decisions',
    'psychology-regret-making-peace-decisions',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['psychology regret', 'decision regret', 'making peace decisions', 'anticipated regret', 'action vs inaction regret'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-044',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The science of regret, including why humans experience regret, what people regret most, how anticipated regret shapes decision-making, the difference between regrets of action and inaction, and strategies for using regret constructively rather than destructively.',
    '/images/articles/cat30/cover-044.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'emotional-intelligence-and-self-regulation' AND category_id = v_cat_id;

  -- CAT30-045: Emotional Intelligence: The Science of Understanding Emotion
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Emotional Intelligence: The Science of Understanding Emotions',
    'emotional-intelligence-science-understanding-emotions',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['emotional intelligence', 'EI psychology', 'emotional competence', 'emotional skills', 'Mayer Salovey model'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-045',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The science of emotional intelligence, including what EI actually is versus popular misconceptions, the four-branch model of emotional abilities, why emotional intelligence predicts life outcomes beyond IQ, and evidence-based strategies for developing greater emotional competence.',
    '/images/articles/cat30/cover-045.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-046: Emotion Regulation Strategies: Managing Your Feelings Effect
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Emotion Regulation Strategies: Managing Your Feelings Effectively',
    'emotion-regulation-strategies-managing-feelings-effectively',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['emotion regulation', 'managing emotions', 'cognitive reappraisal', 'emotional suppression', 'emotion regulation strategies'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-046',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The science of emotion regulation, including Gross''s process model of how emotions are generated and can be regulated at different stages, the costs of suppression versus the benefits of reappraisal, when acceptance outperforms regulation, and a practical toolkit of evidence-based strategies for man',
    '/images/articles/cat30/cover-046.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-047: The Psychology of Self-Awareness: Knowing Yourself Clearly
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Self-Awareness: Knowing Yourself Clearly',
    'psychology-self-awareness-knowing-yourself-clearly',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['self-awareness psychology', 'knowing yourself', 'internal self-awareness', 'external self-awareness', 'introspection'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-047',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The science of self-awareness, including the distinction between internal and external self-awareness, why most people are less self-aware than they think, the paradox of introspection, and evidence-based practices for developing genuine self-knowledge.',
    '/images/articles/cat30/cover-047.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-048: Stress Management: Science-Based Approaches to Handling Pres
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Stress Management: Science-Based Approaches to Handling Pressure',
    'stress-management-science-based-approaches-pressure',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['stress management psychology', 'stress response science', 'stress appraisal', 'chronic stress', 'cortisol'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-048',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology and neuroscience of stress, including the difference between acute and chronic stress, how stress appraisal determines health outcomes, the stress response as a resource rather than a threat, and evidence-based strategies for managing stress effectively.',
    '/images/articles/cat30/cover-048.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-049: The Psychology of Anger: Understanding and Managing a Powerf
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Anger: Understanding and Managing a Powerful Emotion',
    'psychology-anger-understanding-managing-powerful-emotion',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['anger psychology', 'anger management', 'managing anger', 'cognitive model anger', 'anger appraisal'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-049',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of anger, including why humans experience anger, the cognitive appraisal process that triggers it, the difference between healthy and destructive anger, the catharsis myth, and evidence-based strategies for managing anger effectively.',
    '/images/articles/cat30/cover-049.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-050: Mindfulness: The Psychology and Science of the Present Momen
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Mindfulness: The Psychology and Science of the Present Moment',
    'mindfulness-psychology-science-present-moment',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['mindfulness psychology', 'mindfulness science', 'present moment awareness', 'mindfulness meditation', 'MBSR'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-050',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The science of mindfulness, including what mindfulness actually is, the neuroscience of mindful attention, the evidence for mindfulness-based interventions in mental health, the difference between mindfulness as a practice and as a trait, and practical approaches to developing mindful awareness.',
    '/images/articles/cat30/cover-050.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-051: The Psychology of Self-Compassion: Treating Yourself with Ki
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Self-Compassion: Treating Yourself with Kindness',
    'psychology-self-compassion-treating-yourself-kindly',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['self-compassion psychology', 'self-kindness', 'Kristin Neff', 'self-compassion components', 'self-criticism alternative'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-051',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The science of self-compassion, including the three components of self-compassion, how it differs from self-esteem, why self-criticism undermines rather than motivates performance, and evidence-based practices for developing a more compassionate relationship with yourself.',
    '/images/articles/cat30/cover-051.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-052: Resilience: The Psychology of Bouncing Back from Adversity
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Resilience: The Psychology of Bouncing Back from Adversity',
    'resilience-psychology-bouncing-back-adversity',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['resilience psychology', 'bouncing back adversity', 'psychological resilience', 'resilience factors', 'post-adversity growth'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-052',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of resilience, including what resilience actually is versus popular misconceptions, the factors that predict resilient outcomes, the role of social connection in recovery from adversity, and evidence-based strategies for building psychological resilience.',
    '/images/articles/cat30/cover-052.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-053: The Psychology of Gratitude: The Science of Appreciation
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Gratitude: The Science of Appreciation',
    'psychology-gratitude-science-appreciation',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['gratitude psychology', 'science gratitude', 'gratitude wellbeing', 'gratitude intervention', 'appreciation psychology'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-053',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The science of gratitude, including how gratitude affects the brain, why gratitude interventions improve wellbeing, the relationship between gratitude and mental health, the limits of gratitude practices, and evidence-based strategies for cultivating genuine appreciation.',
    '/images/articles/cat30/cover-053.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-054: Emotional Agility: Flexible Responses to Inner Experience
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Emotional Agility: Flexible Responses to Inner Experience',
    'emotional-agility-flexible-responses-inner-experience',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['emotional agility', 'psychological flexibility', 'emotional rigidity', 'ACT psychology', 'values-based action'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-054',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of emotional agility, including how rigid responses to emotions create psychological problems, the difference between being hooked by emotions and responding with flexibility, the connection to psychological flexibility research, and practical strategies for developing a more adaptive',
    '/images/articles/cat30/cover-054.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-055: The Psychology of Shame: Understanding the Most Hidden Emoti
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Shame: Understanding the Most Hidden Emotion',
    'psychology-shame-understanding-most-hidden-emotion',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['shame psychology', 'shame versus guilt', 'toxic shame', 'shame resilience', 'vulnerability shame'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-055',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of shame, including the difference between shame and guilt, how shame develops, its role in psychopathology, the connection between shame and vulnerability, and evidence-based approaches to healing shame.',
    '/images/articles/cat30/cover-055.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-056: The Psychology of Patience: Tolerating Delay and Discomfort
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Patience: Tolerating Delay and Discomfort',
    'psychology-patience-tolerating-delay-discomfort',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['patience psychology', 'delay tolerance', 'marshmallow test', 'delayed gratification', 'impulse control'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-056',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of patience, including the cognitive science of delay tolerance, the marshmallow test and its real implications, why patience is harder in the modern world, the connection between patience and long-term wellbeing, and evidence-based strategies for developing greater patience.',
    '/images/articles/cat30/cover-056.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'financial-psychology' AND category_id = v_cat_id;

  -- CAT30-057: The Psychology of Money: How Finances Affect Mental Health
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Money: How Finances Affect Mental Health',
    'psychology-money-how-finances-affect-mental-health',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['money psychology', 'financial stress mental health', 'income happiness', 'scarcity mindset', 'financial anxiety'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-057',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of money and mental health, including how financial stress affects cognitive function and emotional wellbeing, the relationship between income and happiness, scarcity mindset, financial anxiety, and evidence-based approaches to healthier financial psychology.',
    '/images/articles/cat30/cover-057.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-058: Financial Decision-Making: Biases and Better Choices with Mo
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Financial Decision-Making: Biases and Better Choices with Money',
    'financial-decision-making-biases-better-choices-money',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['financial decision-making', 'behavioral economics', 'money biases', 'mental accounting', 'present bias'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-058',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of financial decision-making, including behavioral economics insights on how cognitive biases affect spending, saving, and investing, mental accounting, present bias, loss aversion in financial contexts, and evidence-based strategies for making better financial decisions.',
    '/images/articles/cat30/cover-058.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-059: The Psychology of Debt: The Emotional Burden of Financial Ob
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Debt: The Emotional Burden of Financial Obligation',
    'psychology-debt-emotional-burden-financial-obligation',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['debt psychology', 'debt mental health', 'financial obligation stress', 'debt shame', 'debt avoidance'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-059',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of debt, including how debt affects mental health, the emotional mechanisms of debt stress, the role of shame and avoidance in debt management, the debt-mental health spiral, and evidence-based strategies for managing the psychological burden of financial obligation.',
    '/images/articles/cat30/cover-059.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-060: The Psychology of Spending: Why We Buy What We Buy
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Spending: Why We Buy What We Buy',
    'psychology-spending-why-we-buy-what-we-buy',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['spending psychology', 'consumer behavior', 'retail therapy', 'emotional spending', 'hedonic adaptation'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-060',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of consumer spending, including emotional spending, retail therapy, the hedonic treadmill, social comparison and conspicuous consumption, impulse buying, and evidence-based strategies for more intentional spending aligned with genuine wellbeing.',
    '/images/articles/cat30/cover-060.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-061: The Psychology of Wealth Inequality: How Economic Disparity 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Wealth Inequality: How Economic Disparity Affects the Mind',
    'psychology-wealth-inequality-how-economic-disparity-affects-mind',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['wealth inequality psychology', 'economic disparity mental health', 'status anxiety', 'relative deprivation', 'wealth empathy'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-061',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of wealth inequality, including how economic disparity affects mental health, status anxiety, the psychological effects of relative deprivation, how wealth influences empathy and prosocial behavior, and evidence-based approaches to psychological resilience in unequal societies.',
    '/images/articles/cat30/cover-061.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-062: Financial Literacy: The Psychological Barriers to Money Educ
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Financial Literacy: The Psychological Barriers to Money Education',
    'financial-literacy-psychological-barriers-money-education',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['financial literacy psychology', 'money education barriers', 'financial behavior change', 'financial shame', 'money avoidance'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-062',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of financial literacy, including why financial education often fails to change behavior, the role of shame and avoidance in financial learning, cognitive barriers to understanding financial concepts, and evidence-based approaches to effective financial education.',
    '/images/articles/cat30/cover-062.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-063: The Psychology of Generosity: Why Giving Benefits the Giver
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Generosity: Why Giving Benefits the Giver',
    'psychology-generosity-why-giving-benefits-giver',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['generosity psychology', 'giving benefits giver', 'prosocial spending happiness', 'warm glow effect', 'altruism wellbeing'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-063',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of generosity, including the neuroscience of giving, why prosocial spending increases happiness, the warm glow effect, the relationship between generosity and wellbeing, and evidence-based insights on how giving to others benefits the giver''s mental health.',
    '/images/articles/cat30/cover-063.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-064: The Psychology of Financial Risk: How We Evaluate Uncertaint
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Financial Risk: How We Evaluate Uncertainty with Money',
    'psychology-financial-risk-how-we-evaluate-uncertainty-money',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['financial risk psychology', 'risk perception', 'prospect theory', 'loss aversion investing', 'overconfidence bias'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-064',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of financial risk, including how cognitive biases distort risk perception, prospect theory and loss aversion in financial decisions, the role of emotions in risk evaluation, overconfidence in investing, and evidence-based strategies for more rational risk assessment.',
    '/images/articles/cat30/cover-064.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-065: The Psychology of Work Identity: When Your Career Becomes Yo
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Work Identity: When Your Career Becomes Your Self',
    'psychology-work-identity-when-career-becomes-self',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['work identity psychology', 'career self-concept', 'over-identification work', 'professional identity', 'work self-worth'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-065',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of work identity, including how professional roles shape self-concept, the risks of over-identification with work, enmeshment between career success and self-worth, and evidence-based strategies for maintaining a healthy relationship between what you do and who you are.',
    '/images/articles/cat30/cover-065.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-066: The Psychology of Economic Anxiety: Living with Financial Un
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Economic Anxiety: Living with Financial Uncertainty',
    'psychology-economic-anxiety-living-financial-uncertainty',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['economic anxiety psychology', 'financial uncertainty', 'money anxiety', 'recession mental health', 'economic stress coping'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-066',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of economic anxiety, including how financial uncertainty affects mental health, the distinction between financial stress and financial anxiety, the role of uncertainty intolerance, and evidence-based strategies for managing anxiety about economic conditions beyond one''s control.',
    '/images/articles/cat30/cover-066.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'habit-formation-and-behavior-change' AND category_id = v_cat_id;

  -- CAT30-067: The Psychology of Habits: How Behavior Becomes Automatic
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Habits: How Behavior Becomes Automatic',
    'psychology-habits-how-behavior-becomes-automatic',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['habits psychology', 'habit loop', 'habit formation', 'automatic behavior', 'cue routine reward'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-067',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of habits, including the habit loop of cue-routine-reward, the neuroscience of automatic behavior, how habits form and how long it takes, the distinction between habits and goals, and evidence-based strategies for building beneficial habits and breaking harmful ones.',
    '/images/articles/cat30/cover-067.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-068: The Psychology of Willpower: The Science of Self-Control
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Willpower: The Science of Self-Control',
    'psychology-willpower-science-self-control',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['willpower psychology', 'self-control science', 'ego depletion', 'delayed gratification', 'marshmallow test'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-068',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of willpower, including the ego depletion debate, the role of beliefs about self-control, the marshmallow test and delayed gratification, environmental design as an alternative to willpower, and evidence-based strategies for managing self-control demands.',
    '/images/articles/cat30/cover-068.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-069: The Psychology of Behavior Change: Why Knowing Is Not Enough
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Behavior Change: Why Knowing Is Not Enough',
    'psychology-behavior-change-why-knowing-not-enough',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['behavior change psychology', 'intention behavior gap', 'stages of change', 'motivational interviewing', 'identity based change'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-069',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of behavior change, including the intention-behavior gap, the transtheoretical model of change stages, motivational interviewing principles, the role of identity in sustained change, and evidence-based strategies for translating knowledge into lasting behavioral change.',
    '/images/articles/cat30/cover-069.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-070: The Psychology of Addiction: Why Quitting Is So Hard
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Addiction: Why Quitting Is So Hard',
    'psychology-addiction-why-quitting-so-hard',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['addiction psychology', 'why quitting hard', 'reward system addiction', 'craving neuroscience', 'relapse prevention'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-070',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of addiction, including the neuroscience of reward and craving, the distinction between liking and wanting, the role of environmental cues and context, why relapse is common and what it means, and evidence-based approaches to understanding and supporting recovery.',
    '/images/articles/cat30/cover-070.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-071: The Psychology of Exercise Motivation: Getting Moving and St
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Exercise Motivation: Getting Moving and Staying Active',
    'psychology-exercise-motivation-getting-moving-staying-active',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['exercise motivation psychology', 'exercise habit', 'physical activity psychology', 'intrinsic motivation exercise', 'exercise adherence'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-071',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of exercise motivation, including why people struggle to exercise despite knowing its benefits, the role of intrinsic motivation and autonomy, the affect heuristic in exercise decisions, social and environmental factors, and evidence-based strategies for building sustainable exercise ',
    '/images/articles/cat30/cover-071.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-072: The Psychology of Sleep Hygiene: Building Better Sleep Habit
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Sleep Hygiene: Building Better Sleep Habits',
    'psychology-sleep-hygiene-building-better-sleep-habits',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['sleep hygiene psychology', 'sleep habits', 'insomnia behavioral treatment', 'circadian rhythm', 'stimulus control sleep'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-072',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of sleep hygiene, including the behavioral factors that promote and disrupt sleep, the role of circadian rhythm alignment, stimulus control therapy, paradoxical intention for sleep anxiety, and evidence-based strategies for building sustainable sleep habits.',
    '/images/articles/cat30/cover-072.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-073: The Psychology of Diet and Eating Behavior: Changing Your Re
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Diet and Eating Behavior: Changing Your Relationship with Food',
    'psychology-diet-eating-behavior-change-relationship-food',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['eating psychology', 'diet failure psychology', 'mindful eating', 'food environment', 'restrained eating'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-073',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of diet and eating behavior, including why diets fail, the role of restrained eating and the what-the-hell effect, mindful eating, the influence of environment on food choices, and evidence-based approaches to building a sustainable relationship with food.',
    '/images/articles/cat30/cover-073.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-074: The Psychology of Digital Habits: Managing Your Relationship
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Digital Habits: Managing Your Relationship with Technology',
    'psychology-digital-habits-managing-technology-use',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['digital habits psychology', 'technology addiction', 'smartphone habits', 'social media psychology', 'screen time management'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-074',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of digital habits, including how technology exploits reward mechanisms, the role of variable reinforcement in compulsive checking, attention fragmentation, digital minimalism, and evidence-based strategies for building a healthier relationship with technology.',
    '/images/articles/cat30/cover-074.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-075: The Psychology of Relapse Prevention: Maintaining Change Lon
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Relapse Prevention: Maintaining Change Long-Term',
    'psychology-relapse-prevention-maintaining-change-long-term',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['relapse prevention psychology', 'maintaining behavior change', 'abstinence violation effect', 'self-efficacy', 'long-term change'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-075',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of relapse prevention, including why maintaining behavior change is harder than initiating it, the abstinence violation effect, high-risk situations, the role of self-efficacy, and evidence-based strategies for sustaining changes across all domains of behavior.',
    '/images/articles/cat30/cover-075.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-076: The Psychology of Nudges: Choice Architecture and Designing 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Nudges: Choice Architecture and Designing Better Decisions',
    'psychology-nudges-choice-architecture-designing-better-decisions',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['nudge psychology', 'choice architecture', 'default effect', 'behavioral economics', 'decision design'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-076',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of nudges and choice architecture, including default effects, framing, simplification, social norms, and how the design of decision environments can guide behavior toward better outcomes without restricting freedom of choice.',
    '/images/articles/cat30/cover-076.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'integration-and-the-examined-life' AND category_id = v_cat_id;

  -- CAT30-077: The Psychology of Self-Reflection: The Science of Examining 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Self-Reflection: The Science of Examining Your Life',
    'psychology-self-reflection-science-examining-your-life',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['self-reflection psychology', 'examining your life', 'self-awareness science', 'metacognition', 'productive reflection'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-077',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of self-reflection, including self-awareness research, the distinction between rumination and productive reflection, metacognition, the role of journaling and expressive writing, and evidence-based approaches to examining your life without getting stuck in your head.',
    '/images/articles/cat30/cover-077.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-078: The Psychology of Wisdom: What It Means to Know How to Live
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Wisdom: What It Means to Know How to Live',
    'psychology-wisdom-what-it-means-know-how-live',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['wisdom psychology', 'practical wisdom', 'Berlin wisdom paradigm', 'balance theory wisdom', 'wise decision-making'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-078',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of wisdom, including the Berlin Wisdom Paradigm, the balance theory of wisdom, the role of experience and reflection, the distinction between intelligence and wisdom, and evidence-based approaches to cultivating practical wisdom across the lifespan.',
    '/images/articles/cat30/cover-078.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-079: The Psychology of Gratitude: How the Science of Appreciation
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Gratitude: How the Science of Appreciation Transforms Wellbeing',
    'psychology-gratitude-science-appreciation-transforms-wellbeing',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['gratitude psychology', 'gratitude science', 'appreciation wellbeing', 'gratitude interventions', 'gratitude journaling'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-079',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of gratitude, including gratitude interventions research, the neuroscience of appreciation, gratitude''s relationship to wellbeing and relationships, the limits of gratitude practice, and evidence-based approaches to cultivating genuine appreciation.',
    '/images/articles/cat30/cover-079.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-080: The Psychology of Forgiveness: The Science of Letting Go
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Forgiveness: The Science of Letting Go',
    'psychology-forgiveness-science-letting-go',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['forgiveness psychology', 'letting go science', 'REACH forgiveness model', 'forgiveness health benefits', 'self-forgiveness'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-080',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of forgiveness, including what forgiveness is and is not, the REACH model, the health benefits of forgiveness, self-forgiveness, the distinction between forgiveness and reconciliation, and evidence-based approaches to the process of letting go.',
    '/images/articles/cat30/cover-080.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-081: The Psychology of Compassion: The Science of Caring for Othe
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Compassion: The Science of Caring for Others and Yourself',
    'psychology-compassion-science-caring-others-yourself',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['compassion psychology', 'self-compassion', 'empathic concern', 'compassion fatigue', 'compassion-focused therapy'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-081',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of compassion, including the neuroscience of empathic concern, self-compassion research, compassion fatigue, the distinction between empathy and compassion, compassion-focused therapy, and evidence-based approaches to cultivating compassion without burnout.',
    '/images/articles/cat30/cover-081.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-082: The Psychology of Acceptance: The Paradox of Letting Things 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Acceptance: The Paradox of Letting Things Be',
    'psychology-acceptance-paradox-letting-things-be',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['acceptance psychology', 'psychological acceptance', 'acceptance commitment therapy', 'experiential avoidance', 'radical acceptance'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-082',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of acceptance, including acceptance and commitment therapy, experiential avoidance, radical acceptance in DBT, the paradox of control, the distinction between acceptance and resignation, and evidence-based approaches to embracing reality without giving up.',
    '/images/articles/cat30/cover-082.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-083: The Psychology of Resilience: The Science of Bouncing Back a
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Resilience: The Science of Bouncing Back and Forward',
    'psychology-resilience-science-bouncing-back-forward',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['resilience psychology', 'bouncing back', 'psychological resilience', 'resilience factors', 'adversity recovery'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-083',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of resilience, including protective factors research, the ordinary magic of resilience, the role of social support and meaning-making, resilience as process not trait, and evidence-based approaches to building the capacity to recover from adversity.',
    '/images/articles/cat30/cover-083.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-084: The Psychology of Flourishing: The Science of Living Well
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Flourishing: The Science of Living Well',
    'psychology-flourishing-science-living-well',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['flourishing psychology', 'PERMA model', 'wellbeing science', 'eudaimonic wellbeing', 'positive psychology'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-084',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of flourishing, including PERMA theory, eudaimonic versus hedonic wellbeing, the dual continua model of mental health, the role of engagement and meaning, and evidence-based approaches to moving beyond the absence of illness toward the presence of a life well-lived.',
    '/images/articles/cat30/cover-084.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-085: The Psychology of the Good Life: Integrating Everything We K
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of the Good Life: Integrating Everything We Know About Wellbeing',
    'psychology-good-life-integrating-everything-know-about-wellbeing',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['good life psychology', 'wellbeing integration', 'evidence-based wellbeing', 'comprehensive wellbeing', 'psychological good life'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-085',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of the good life, integrating findings from positive psychology, clinical psychology, neuroscience, and philosophy to present a comprehensive evidence-based framework for wellbeing that includes relationships, meaning, growth, health, and the wisdom to balance competing goods.',
    '/images/articles/cat30/cover-085.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-086: Your Mental Health Toolkit: Everything You Need to Get Start
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Your Mental Health Toolkit: Everything You Need to Get Started',
    'your-mental-health-toolkit-everything-you-need-get-started',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['mental health toolkit', 'getting started mental health', 'evidence-based wellbeing', 'self-help psychology', 'mental health resources'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-086',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A comprehensive guide to building your personal mental health toolkit, integrating evidence-based strategies from across the Psychage library — including self-awareness, emotional regulation, cognitive skills, relationship building, crisis resources, and the full suite of Psychage tools for tracking',
    '/images/articles/cat30/cover-086.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'productivity-and-time-management' AND category_id = v_cat_id;

  -- CAT30-087: The Psychology of Procrastination: Why We Delay and How to S
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Procrastination: Why We Delay and How to Start',
    'psychology-procrastination-why-we-delay-how-start',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['procrastination psychology', 'why we procrastinate', 'overcoming procrastination', 'task aversion', 'temporal motivation theory'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-087',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of procrastination, including why procrastination is an emotion regulation problem rather than a time management problem, the role of task aversion and impulsiveness, the procrastination-mood repair cycle, and evidence-based strategies for overcoming procrastination.',
    '/images/articles/cat30/cover-087.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-088: Deep Work: The Psychology of Focused Concentration
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Deep Work: The Psychology of Focused Concentration',
    'deep-work-psychology-focused-concentration',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['deep work psychology', 'focused concentration', 'attention management', 'task switching costs', 'distraction science'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-088',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of deep work and focused concentration, including why sustained attention is cognitively demanding, the neuroscience of focus, the costs of distraction and task switching, and evidence-based strategies for cultivating the capacity for deep, uninterrupted cognitive work.',
    '/images/articles/cat30/cover-088.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-089: The Psychology of Time Perception: Why Time Speeds Up and Sl
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Time Perception: Why Time Speeds Up and Slows Down',
    'psychology-time-perception-why-time-speeds-slows',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['time perception psychology', 'why time speeds up', 'subjective time', 'temporal distortion', 'time management psychology'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-089',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of time perception, including why time seems to accelerate with age, the role of attention and emotion in temporal experience, the oddball effect and time expansion during danger, and how understanding time perception can improve time management and life satisfaction.',
    '/images/articles/cat30/cover-089.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-090: The Science of Goal Setting: The Psychology of Achieving Wha
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Science of Goal Setting: The Psychology of Achieving What Matters',
    'science-goal-setting-psychology-achieving-what-matters',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['goal setting psychology', 'goal-setting theory', 'SMART goals', 'implementation intentions', 'motivation goals'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-090',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of goal setting, including goal-setting theory, the difference between performance and learning goals, the role of implementation intentions, the psychology of goal pursuit and abandonment, and evidence-based principles for setting and achieving meaningful goals.',
    '/images/articles/cat30/cover-090.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-091: The Psychology of Motivation: What Drives Human Action
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Motivation: What Drives Human Action',
    'psychology-motivation-what-drives-human-action',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['motivation psychology', 'intrinsic motivation', 'extrinsic motivation', 'self-determination theory', 'autonomy competence relatedness'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-091',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of motivation, including self-determination theory, the difference between intrinsic and extrinsic motivation, the overjustification effect, the role of autonomy, competence, and relatedness in sustaining motivation, and evidence-based strategies for cultivating lasting drive.',
    '/images/articles/cat30/cover-091.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-092: Flow States: The Psychology of Optimal Experience
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Flow States: The Psychology of Optimal Experience',
    'flow-state-psychology-optimal-experience',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['flow state psychology', 'optimal experience', 'Csikszentmihalyi flow', 'being in the zone', 'peak performance'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-092',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of flow states, including Csikszentmihalyi''s research on optimal experience, the conditions that produce flow, the neuroscience of the flow state, its relationship to performance and wellbeing, and practical strategies for cultivating flow in daily life.',
    '/images/articles/cat30/cover-092.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-093: The Myth of Multitasking: The Science of Divided Attention
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Myth of Multitasking: The Science of Divided Attention',
    'myth-multitasking-science-divided-attention',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['multitasking myth', 'divided attention', 'task switching costs', 'cognitive bottleneck', 'attention science'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-093',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The science of multitasking and divided attention, including why the human brain cannot truly perform two cognitive tasks simultaneously, the costs of task switching, the illusion of multitasking efficiency, and evidence-based strategies for single-tasking in a distraction-saturated world.',
    '/images/articles/cat30/cover-093.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-094: The Psychology of Energy Management: Beyond Time Management
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Energy Management: Beyond Time Management',
    'psychology-energy-management-beyond-time-management',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['energy management psychology', 'beyond time management', 'ultradian rhythms', 'work recovery', 'sustainable performance'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-094',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of energy management, including why managing energy is more important than managing time, the four dimensions of human energy, the science of ultradian rhythms and recovery, and evidence-based strategies for sustaining high performance without burnout.',
    '/images/articles/cat30/cover-094.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-095: The Psychology of Deadlines: Pressure, Performance, and Time
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Deadlines: Pressure, Performance, and Time Constraints',
    'psychology-deadlines-pressure-performance-time-constraints',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['deadline psychology', 'time pressure performance', 'Yerkes-Dodson law', 'Parkinson\', ', '],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-095',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of deadlines and time pressure, including how deadlines affect motivation and performance, the Yerkes-Dodson law, Parkinson''s law, the planning fallacy, and evidence-based approaches to working effectively under time constraints without sacrificing quality or wellbeing.',
    '/images/articles/cat30/cover-095.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-096: Work-Life Balance: The Psychology of Integration and Separat
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Work-Life Balance: The Psychology of Integration and Separation',
    'work-life-balance-psychology-integration-separation',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['work-life balance psychology', 'boundary theory', 'work recovery', 'psychological detachment', 'segmentation integration'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-096',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of work-life balance, including boundary theory, the difference between segmenters and integrators, the role of recovery and detachment in wellbeing, and evidence-based strategies for managing the boundary between professional and personal life.',
    '/images/articles/cat30/cover-096.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-097: Digital Distraction: The Psychology of Attention in the Tech
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Digital Distraction: The Psychology of Attention in the Technology Age',
    'digital-distraction-psychology-attention-technology-age',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['digital distraction psychology', 'attention technology', 'smartphone addiction', 'notification psychology', 'screen time effects'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-097',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of digital distraction, including how technology captures and fragments attention, the neuroscience of notification-driven behavior, the effects of smartphone use on cognition and wellbeing, and evidence-based strategies for reclaiming attention in a distraction-saturated environment.',
    '/images/articles/cat30/cover-097.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-098: The Psychology of Decision-Making: Choosing Wisely Under Unc
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Decision-Making: Choosing Wisely Under Uncertainty',
    'psychology-decision-making-choosing-wisely-under-uncertainty',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['decision-making psychology', 'cognitive biases', 'rational choice', 'paradox of choice', 'heuristics judgment'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-098',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of decision-making, including cognitive biases that distort judgment, the dual-process model of thinking, the paradox of choice, the role of emotions in rational decision-making, and evidence-based strategies for making better decisions under uncertainty.',
    '/images/articles/cat30/cover-098.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'self-design-and-life-architecture' AND category_id = v_cat_id;

  -- CAT30-099: The Psychology of Self-Design: Becoming the Architect of You
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Self-Design: Becoming the Architect of Your Own Life',
    'psychology-self-design-becoming-architect-your-life',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['self-design psychology', 'life architecture', 'identity construction', 'personal narrative', 'life design'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-099',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of self-design, including how people construct their identities, the role of personal narratives, life design thinking, the tension between authenticity and intentionality, and evidence-based approaches to deliberately shaping the person you are becoming.',
    '/images/articles/cat30/cover-099.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-100: The Psychology of Values Clarification: Knowing What Matters
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Values Clarification: Knowing What Matters Most',
    'psychology-values-clarification-knowing-what-matters-most',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['values clarification psychology', 'personal values', 'intrinsic values', 'ACT values', 'values-based living'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-100',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of values clarification, including how personal values shape behavior and wellbeing, the distinction between intrinsic and extrinsic values, values-based living in acceptance and commitment therapy, and evidence-based approaches to identifying and living by your deepest values.',
    '/images/articles/cat30/cover-100.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-101: The Psychology of Meaning and Purpose: What Makes Life Worth
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Meaning and Purpose: What Makes Life Worth Living',
    'psychology-meaning-purpose-what-makes-life-worth-living',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['meaning in life psychology', 'purpose psychology', 'logotherapy', 'meaningful life', 'existential psychology'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-101',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of meaning and purpose, including Frankl''s logotherapy, the three sources of meaning, the distinction between happiness and meaning, how purpose predicts health and longevity, and evidence-based approaches to cultivating a sense of meaning in life.',
    '/images/articles/cat30/cover-101.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-102: The Psychology of Aging Well: Thriving Across the Lifespan
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Aging Well: Thriving Across the Lifespan',
    'psychology-aging-well-thriving-across-lifespan',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['aging well psychology', 'successful aging', 'socioemotional selectivity', 'positivity effect aging', 'lifespan development'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-102',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of aging well, including socioemotional selectivity theory, the positivity effect, selective optimization with compensation, the paradox of aging, and evidence-based approaches to maintaining psychological wellbeing throughout the lifespan.',
    '/images/articles/cat30/cover-102.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-103: The Psychology of Solitude: The Art of Being Alone Without L
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Solitude: The Art of Being Alone Without Loneliness',
    'psychology-solitude-art-being-alone-without-loneliness',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['solitude psychology', 'being alone benefits', 'solitude vs loneliness', 'voluntary aloneness', 'solitude creativity'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-103',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of solitude, including the distinction between solitude and loneliness, the benefits of voluntary aloneness, the role of solitude in creativity and self-discovery, cultural differences in attitudes toward being alone, and evidence-based approaches to cultivating beneficial solitude.',
    '/images/articles/cat30/cover-103.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-104: The Psychology of Authenticity: Being Yourself in a Complex 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Authenticity: Being Yourself in a Complex World',
    'psychology-authenticity-being-yourself-complex-world',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['authenticity psychology', 'being yourself', 'true self', 'authentic living', 'self-concordance'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-104',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of authenticity, including what it means to be ''true to yourself,'' the role of self-awareness and self-concordance, the tension between authenticity and social adaptation, and evidence-based approaches to living more authentically without rigidity.',
    '/images/articles/cat30/cover-104.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-105: The Psychology of Personal Growth: The Science of Becoming a
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Personal Growth: The Science of Becoming a Better Version of Yourself',
    'psychology-personal-growth-science-becoming-better-version-yourself',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['personal growth psychology', 'growth mindset', 'self-actualization', 'post-traumatic growth', 'self-improvement science'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-105',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of personal growth, including growth mindset research, post-traumatic growth, self-actualization, the role of challenge and discomfort in development, and evidence-based approaches to sustainable personal development.',
    '/images/articles/cat30/cover-105.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-106: The Psychology of Life Transitions: Navigating Change and Un
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Life Transitions: Navigating Change and Uncertainty',
    'psychology-life-transitions-navigating-change-uncertainty',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['life transitions psychology', 'navigating change', 'transition model', 'coping with uncertainty', 'life changes mental health'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-106',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of life transitions, including Bridges'' transition model, anticipatory grief, identity disruption during change, the role of meaning-making in adaptation, and evidence-based approaches to navigating major life changes with resilience.',
    '/images/articles/cat30/cover-106.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-107: The Psychology of Minimalism: Intentional Simplicity and the
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Minimalism: Intentional Simplicity and the Science of Less Is More',
    'psychology-minimalism-intentional-simplicity-less-more',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['minimalism psychology', 'intentional simplicity', 'hedonic adaptation', 'materialism wellbeing', 'paradox of choice'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-107',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of minimalism, including the hedonic treadmill, materialism and wellbeing, decision fatigue, the paradox of choice, experiential versus material purchases, and evidence-based approaches to intentional simplicity and psychological freedom.',
    '/images/articles/cat30/cover-107.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-108: The Psychology of Legacy: What You Leave Behind
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Legacy: What You Leave Behind',
    'psychology-legacy-what-you-leave-behind',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['legacy psychology', 'generativity', 'leaving a legacy', 'terror management theory', 'symbolic immortality'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-108',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of legacy, including Erikson''s generativity, terror management theory, symbolic immortality, the relationship between legacy motivation and prosocial behavior, and evidence-based approaches to living a life that matters beyond the self.',
    '/images/articles/cat30/cover-108.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-109: The Psychology of Ritual: Why Humans Need Ceremony and Struc
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Ritual: Why Humans Need Ceremony and Structure',
    'psychology-ritual-why-humans-need-ceremony-structure',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['ritual psychology', 'ceremony importance', 'ritual behavior', 'personal rituals', 'grief rituals'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-109',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of ritual, including the cognitive functions of ritual behavior, the role of rituals in emotion regulation, grief rituals, performance rituals, the distinction between rituals and habits, and evidence-based approaches to creating meaningful personal rituals.',
    '/images/articles/cat30/cover-109.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT30-110: The Psychology of Second Acts: Reinvention and the Science o
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Second Acts: Reinvention and the Science of Starting Over',
    'psychology-second-acts-reinvention-starting-over',
    'draft',
    'Applied Life Skills, Self-Design & Practical Psychology',
    ARRAY['reinvention psychology', 'starting over', 'fresh start effect', 'possible selves', 'identity reconstruction'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT30-110',
    v_cat_id,
    v_sub_id,
    'drafted',
    'The psychology of reinvention, including identity reconstruction after major life changes, the fresh start effect, possible selves theory, the role of narrative in personal transformation, and evidence-based approaches to starting over at any age.',
    '/images/articles/cat30/cover-110.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

END $$;

-- Category 31: spirituality-meaning (58 articles)
DO $$
DECLARE
  v_cat_id UUID;
  v_sub_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'spirituality-meaning';

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'existential-psychology' AND category_id = v_cat_id;

  -- CAT31-001: Existential Crisis: What Triggers It and How to Navigate Thr
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Existential Crisis: What Triggers It and How to Navigate Through',
    'existential-crisis',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['existential crisis', 'meaning', 'purpose', 'existential psychology', 'Viktor Frankl'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT31-001',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding existential crisis—what triggers it, why it happens, and evidence-based strategies for navigating periods of profound questioning.',
    '/images/articles/cat31/cover-001.svg',
    5,
    false,
    true,
    NULL,
    TRUE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT31-002: Legacy and Generativity: Finding Purpose Through What You Le
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Legacy and Generativity: Finding Purpose Through What You Leave Behind',
    'legacy-and-generativity',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['generativity', 'legacy', 'Erik Erikson', 'meaning', 'purpose'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT31-002',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Exploring generativity—the drive to create lasting contributions—and how focusing on legacy can provide meaning and improve psychological wellbeing.',
    '/images/articles/cat31/cover-002.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT31-003: The Psychology of Regret: Making Peace With Roads Not Taken
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Psychology of Regret: Making Peace With Roads Not Taken',
    'psychology-of-regret',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['regret', 'rumination', 'counterfactual thinking', 'self-compassion', 'decision-making'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT31-003',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding why regret happens, how it affects mental health, and evidence-based strategies for processing regret without getting stuck in rumination.',
    '/images/articles/cat31/cover-003.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT31-004: Authenticity and Mental Health: The Cost of Living Incongrue
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Authenticity and Mental Health: The Cost of Living Incongruently',
    'authenticity-mental-health',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['authenticity', 'congruence', 'self-concept', 'values', 'existential psychology'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT31-004',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding authenticity, why living incongruently with your values harms mental health, and evidence-based approaches to living more authentically.',
    '/images/articles/cat31/cover-004.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'existential-questions-and-spiritual-practice' AND category_id = v_cat_id;

  -- CAT31-005: Death Anxiety: Understanding and Coping With Fear of Mortali
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Death Anxiety: Understanding and Coping With Fear of Mortality',
    'death-anxiety',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['Existential Questions & Spiritual Practice', 'Death Anxiety', 'Understanding and Coping With Fear of Mortality'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT31-005',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Death anxiety—fear and distress about mortality—affects most people to varying degrees. Learn terror management theory, protective factors like meaning and acceptance, and evidence-based strategies for reducing death-related fear.',
    '/images/articles/cat31/cover-005.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT31-006: Mindfulness: The Practice of Present-Moment Awareness and It
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Mindfulness: The Practice of Present-Moment Awareness and Its Mental Health Benefits',
    'mindfulness-practice',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['Existential Questions & Spiritual Practice', 'Mindfulness', 'The Practice of Present', 'Moment Awareness and Its Mental Health Benefits'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT31-006',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Mindfulness—paying attention to present experience with openness and non-judgment—has robust evidence for reducing anxiety, depression, and stress while improving emotion regulation and wellbeing. Learn the science and practice of mindfulness.',
    '/images/articles/cat31/cover-006.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'positive-psychology-and-human-flourishing' AND category_id = v_cat_id;

  -- CAT31-007: Positive Psychology: The Science of Wellbeing and Flourishin
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Positive Psychology: The Science of Wellbeing and Flourishing',
    'positive-psychology',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['positive psychology', 'wellbeing', 'flourishing', 'happiness', 'PERMA model'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT31-007',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding positive psychology, the scientific study of human flourishing, wellbeing, and strengths-based approaches to mental health.',
    '/images/articles/cat31/cover-007.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT31-008: Flow States: The Psychology of Optimal Experience
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Flow States: The Psychology of Optimal Experience',
    'flow-states',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['flow state', 'optimal experience', 'Mihaly Csikszentmihalyi', 'peak performance', 'flow psychology'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT31-008',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding flow states, the psychological conditions that produce optimal experience, neuroscience of flow, and how to cultivate flow in daily life.',
    '/images/articles/cat31/cover-008.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT31-009: Ikigai: The Japanese Concept of Life Purpose and Longevity
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Ikigai: The Japanese Concept of Life Purpose and Longevity',
    'ikigai-purpose',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['ikigai', 'life purpose', 'Japanese longevity', 'reason for being', 'purpose and health'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT31-009',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding ikigai, the Japanese concept of ''reason for being,'' research on purpose and longevity, and how to discover your ikigai for wellbeing.',
    '/images/articles/cat31/cover-009.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT31-010: Post-Traumatic Growth: Finding Meaning Through Adversity
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Post-Traumatic Growth: Finding Meaning Through Adversity',
    'post-traumatic-growth',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['post-traumatic growth', 'PTG', 'adversarial growth', 'trauma recovery', 'meaning-making'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT31-010',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding post-traumatic growth, how people develop through trauma, research on positive changes after suffering, and the relationship with PTSD.',
    '/images/articles/cat31/cover-010.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT31-011: The Science of Resilience: What Actually Makes People Bounce
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Science of Resilience: What Actually Makes People Bounce Back',
    'resilience-science',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['resilience', 'stress adaptation', 'psychological resilience', 'protective factors', 'adversity'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT31-011',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding resilience science, factors that predict recovery from adversity, neuroscience of stress adaptation, and evidence-based resilience interventions.',
    '/images/articles/cat31/cover-011.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT31-012: Hope: The Psychology of Expecting and Working Toward Better 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Hope: The Psychology of Expecting and Working Toward Better Futures',
    'hope-psychology',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['hope psychology', 'Snyder Hope Theory', 'hopelessness', 'goals', 'motivation'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT31-012',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding hope psychology, Snyder''s Hope Theory, neuroscience of hope, research on hope and health, and evidence-based interventions for building hope.',
    '/images/articles/cat31/cover-012.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT31-013: Self-Compassion: The Research on Treating Yourself With Kind
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Self-Compassion: The Research on Treating Yourself With Kindness',
    'self-compassion',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['self-compassion', 'self-kindness', 'Kristin Neff', 'self-criticism', 'mindfulness'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT31-013',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding self-compassion research, Kristin Neff''s three-component model, neuroscience of self-kindness, and evidence-based self-compassion interventions.',
    '/images/articles/cat31/cover-013.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT31-014: Strengths-Based Approaches: Building on What\''s Right Inste
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Strengths-Based Approaches: Building on What\''s Right Instead of Fixing What\''s Wrong',
    'strengths-based-approach',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['strengths-based', 'character strengths', 'VIA strengths', 'positive psychology', 'signature strengths'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT31-014',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding strengths-based psychology, VIA character strengths, research on using strengths for wellbeing, and practical strengths-based interventions.',
    '/images/articles/cat31/cover-014.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT31-015: Wisdom and Aging: The Psychology of Growing Wiser, Not Just 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Wisdom and Aging: The Psychology of Growing Wiser, Not Just Older',
    'wisdom-aging',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['wisdom', 'aging', 'gerontology', 'life experience', 'emotional regulation'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT31-015',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding wisdom psychology, how wisdom develops with age, research on wise aging, crystallized intelligence, and cultivating wisdom across the lifespan.',
    '/images/articles/cat31/cover-015.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT31-016: Savoring: The Art of Amplifying Positive Experiences
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Savoring: The Art of Amplifying Positive Experiences',
    'savoring-wellbeing',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['savoring', 'positive emotions', 'mindfulness', 'gratitude', 'wellbeing'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT31-016',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding savoring psychology, how to amplify positive experiences, research on savoring and wellbeing, and practical savoring techniques.',
    '/images/articles/cat31/cover-016.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT31-017: Grit: The Psychology of Perseverance and Passion for Long-Te
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Grit: The Psychology of Perseverance and Passion for Long-Term Goals',
    'grit-perseverance',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['Positive Psychology & Human Flourishing', 'Grit', 'The Psychology of Perseverance and Passion for Long', 'Term Goals'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT31-017',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover the science of grit—sustained passion and perseverance toward long-term goals. Learn what predicts achievement better than talent and how to build stick-to-itiveness.',
    '/images/articles/cat31/cover-017.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT31-018: Learned Optimism: How Explanatory Style Shapes Mental Health
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Learned Optimism: How Explanatory Style Shapes Mental Health and Achievement',
    'learned-optimism',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['Positive Psychology & Human Flourishing', 'Learned Optimism', 'How Explanatory Style Shapes Mental Health and Achievement'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT31-018',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn how explanatory style—the way you explain good and bad events—predicts depression, health, and achievement. Discover Martin Seligman''s research on learned optimism and cognitive reframing.',
    '/images/articles/cat31/cover-018.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT31-019: Awe: The Emotion That Shrinks the Self and Expands Wellbeing
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Awe: The Emotion That Shrinks the Self and Expands Wellbeing',
    'awe-emotion',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['Positive Psychology & Human Flourishing', 'The Emotion That Shrinks the Self and Expands Wellbeing'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT31-019',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the science of awe—an emotion triggered by vastness that makes you feel small in the best way. Learn how awe reduces inflammation, increases prosocial behavior, and shifts time perception.',
    '/images/articles/cat31/cover-019.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT31-020: Curiosity: The Drive to Know and the Psychology of Explorati
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Curiosity: The Drive to Know and the Psychology of Exploration',
    'curiosity-psychology',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['Positive Psychology & Human Flourishing', 'Curiosity', 'The Drive to Know and the Psychology of Exploration'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT31-020',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the science of curiosity—a drive that fuels learning, resilience, and meaning. Learn about the neurobiology of information-seeking, types of curiosity, and how to cultivate wonder.',
    '/images/articles/cat31/cover-020.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT31-021: Character Strengths: The VIA Classification and the Science 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Character Strengths: The VIA Classification and the Science of What\''s Right With You',
    'character-strengths-via',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['Positive Psychology & Human Flourishing', 'Character Strengths', 'The VIA Classification and the Science of What\'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT31-021',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover the VIA classification of 24 character strengths and learn how using your signature strengths predicts life satisfaction, work engagement, and resilience more than fixing weaknesses.',
    '/images/articles/cat31/cover-021.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT31-022: Intellectual Humility: The Strength of Knowing What You Don\
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Intellectual Humility: The Strength of Knowing What You Don\''t Know',
    'intellectual-humility',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['Positive Psychology & Human Flourishing', 'Intellectual Humility', 'The Strength of Knowing What You Don\'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT31-022',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover intellectual humility—the ability to recognize the limits of your knowledge. Learn how this trait predicts better decision-making, stronger relationships, and protection against misinformation.',
    '/images/articles/cat31/cover-022.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT31-023: Meaning in Life: The Psychology of Purpose, Coherence, and S
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Meaning in Life: The Psychology of Purpose, Coherence, and Significance',
    'meaning-in-life',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['Positive Psychology & Human Flourishing', 'Meaning in Life', 'The Psychology of Purpose, Coherence, and Significance'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT31-023',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover the science of meaning—how purpose, coherence, and significance predict wellbeing, health, and longevity. Learn evidence-based strategies for cultivating a meaningful life.',
    '/images/articles/cat31/cover-023.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT31-024: Psychological Richness: The Good Life as Interesting, Varied
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Psychological Richness: The Good Life as Interesting, Varied, and Perspective-Changing',
    'psychological-richness',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['Positive Psychology & Human Flourishing', 'Psychological Richness', 'The Good Life as Interesting, Varied, and Perspective', 'Changing'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT31-024',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Discover psychological richness—a third dimension of the good life beyond happiness and meaning. Learn how novelty, perspective change, and interesting experiences contribute to flourishing.',
    '/images/articles/cat31/cover-024.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT31-025: Psychological Flexibility: Adapting to Change While Staying 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Psychological Flexibility: Adapting to Change While Staying True to Your Values',
    'psychological-flexibility',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['Positive Psychology & Human Flourishing', 'Psychological Flexibility', 'Adapting to Change While Staying True to Your Values'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT31-025',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Learn about psychological flexibility—the ability to adapt to changing circumstances while staying committed to values. Discover ACT''s six core processes and how flexibility predicts wellbeing.',
    '/images/articles/cat31/cover-025.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT31-026: Self-Determination Theory: How Autonomy, Competence, and Rel
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Self-Determination Theory: How Autonomy, Competence, and Relatedness Drive Wellbeing',
    'self-determination-theory',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['Positive Psychology & Human Flourishing', 'Self', 'Determination Theory', 'How Autonomy, Competence, and Relatedness Drive Wellbeing'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT31-026',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Self-Determination Theory explains how autonomy, competence, and relatedness fuel intrinsic motivation and psychological wellbeing. Learn the research behind SDT and how to cultivate these three basic psychological needs.',
    '/images/articles/cat31/cover-026.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT31-027: Prosocial Behavior and Altruism: Why Helping Others Enhances
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Prosocial Behavior and Altruism: Why Helping Others Enhances Your Own Wellbeing',
    'prosocial-behavior-altruism',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['Positive Psychology & Human Flourishing', 'Prosocial Behavior and Altruism', 'Why Helping Others Enhances Your Own Wellbeing'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT31-027',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Prosocial behavior—actions that benefit others—consistently predicts happiness, health, and longevity. Discover the neuroscience of altruism, the helper''s high, and practical ways to cultivate generosity.',
    '/images/articles/cat31/cover-027.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT31-028: Mattering: The Psychology of Feeling Significant to Others
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Mattering: The Psychology of Feeling Significant to Others',
    'mattering-psychology',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['Positive Psychology & Human Flourishing', 'Mattering', 'The Psychology of Feeling Significant to Others'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT31-028',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Mattering—the feeling that you are significant to others and that your actions make a difference—is a fundamental human need. Learn the research on mattering and how to cultivate this crucial dimension of wellbeing.',
    '/images/articles/cat31/cover-028.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT31-029: Eudaimonia and Hedonia: Two Pathways to Wellbeing
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Eudaimonia and Hedonia: Two Pathways to Wellbeing',
    'eudaimonia-hedonia',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['Positive Psychology & Human Flourishing', 'Eudaimonia and Hedonia', 'Two Pathways to Wellbeing'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT31-029',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Eudaimonia (meaning, growth, virtue) and hedonia (pleasure, enjoyment, positive emotion) represent two distinct forms of wellbeing with different psychological correlates and biological signatures. Learn the research and how to cultivate both.',
    '/images/articles/cat31/cover-029.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT31-030: Narrative Identity: How the Stories You Tell About Yourself 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Narrative Identity: How the Stories You Tell About Yourself Shape Who You Become',
    'narrative-identity',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['Positive Psychology & Human Flourishing', 'Narrative Identity', 'How the Stories You Tell About Yourself Shape Who You Become'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT31-030',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Narrative identity—the internalized story you tell about your life—shapes psychological wellbeing, resilience, and personal growth. Learn how redemptive narratives, contamination sequences, and narrative coherence predict mental health outcomes.',
    '/images/articles/cat31/cover-030.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT31-031: Self-Transcendence: Moving Beyond the Self Toward Something 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Self-Transcendence: Moving Beyond the Self Toward Something Greater',
    'self-transcendence',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['Positive Psychology & Human Flourishing', 'Self', 'Transcendence', 'Moving Beyond the Self Toward Something Greater'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT31-031',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Self-transcendence—the capacity to move beyond self-focused concerns toward connection with something greater—predicts wellbeing, meaning, and healthy aging. Explore the psychology of transcendent experiences and how to cultivate them.',
    '/images/articles/cat31/cover-031.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT31-032: Peak Experiences: Moments of Transcendence and Their Lasting
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Peak Experiences: Moments of Transcendence and Their Lasting Impact',
    'peak-experiences',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['Positive Psychology & Human Flourishing', 'Peak Experiences', 'Moments of Transcendence and Their Lasting Impact'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT31-032',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Peak experiences—moments of intense joy, transcendence, or unity described by Abraham Maslow—can have lasting positive effects on values, identity, and wellbeing. Learn the psychology of peak experiences and how to cultivate them.',
    '/images/articles/cat31/cover-032.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'secular-approaches-to-meaning' AND category_id = v_cat_id;

  -- CAT31-033: Secular Spirituality: Finding Transcendence Without Religion
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Secular Spirituality: Finding Transcendence Without Religion',
    'secular-spirituality',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['secular spirituality', 'atheist meaning', 'transcendence without religion', 'secular humanism', 'spiritual but not religious'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT31-033',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding secular spirituality, how non-religious people find meaning and transcendence, and research on wellbeing in the non-religious.',
    '/images/articles/cat31/cover-033.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT31-034: Existential Therapy: Finding Meaning in an Uncertain World
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Existential Therapy: Finding Meaning in an Uncertain World',
    'existential-therapy',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['existential therapy', 'meaning-making', 'existential psychology', 'Viktor Frankl', 'Irvin Yalom'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT31-034',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding existential therapy, how it addresses questions of meaning, freedom, and death, and research on its effectiveness for existential concerns.',
    '/images/articles/cat31/cover-034.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT31-035: Logotherapy: Viktor Frankl\''s Search for Meaning
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Logotherapy: Viktor Frankl\''s Search for Meaning',
    'logotherapy',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['logotherapy', 'Viktor Frankl', 'meaning-centered therapy', 'will to meaning', 'existential vacuum'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT31-035',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding logotherapy, Viktor Frankl''s meaning-centered psychotherapy developed from his experiences in Auschwitz, and research on its effectiveness.',
    '/images/articles/cat31/cover-035.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'spirituality-and-mental-health' AND category_id = v_cat_id;

  -- CAT31-036: The Research on Spirituality and Wellbeing: What Science Act
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Research on Spirituality and Wellbeing: What Science Actually Shows',
    'spirituality-wellbeing-research',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['spirituality', 'religion', 'mental health', 'wellbeing', 'research'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT31-036',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A comprehensive look at what scientific research reveals about the relationship between spirituality, religious practice, and psychological wellbeing.',
    '/images/articles/cat31/cover-036.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT31-037: Prayer and Mental Health: Psychological Mechanisms Behind Sp
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Prayer and Mental Health: Psychological Mechanisms Behind Spiritual Practice',
    'prayer-mental-health',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['prayer', 'mental health', 'spirituality', 'meditation', 'coping'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT31-037',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding the psychological mechanisms behind prayer and its measurable effects on mental health, stress, and emotional regulation.',
    '/images/articles/cat31/cover-037.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT31-038: Meditation Across Traditions: Mindfulness, Centering Prayer,
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Meditation Across Traditions: Mindfulness, Centering Prayer, and Sufi Dhikr',
    'meditation-across-traditions',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['meditation', 'mindfulness', 'centering prayer', 'dhikr', 'contemplative practice'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT31-038',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Exploring how contemplative practices from Buddhism, Christianity, Islam, and other traditions share common psychological mechanisms despite different frameworks.',
    '/images/articles/cat31/cover-038.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT31-039: Religious Trauma Syndrome: When Faith Causes Psychological H
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Religious Trauma Syndrome: When Faith Causes Psychological Harm',
    'religious-trauma-syndrome',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['religious trauma', 'spiritual abuse', 'faith', 'trauma recovery', 'religious trauma syndrome'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT31-039',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding religious trauma, its psychological impact, and evidence-based recovery approaches for those harmed by toxic religious environments.',
    '/images/articles/cat31/cover-039.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT31-040: Leaving Religion: The Mental Health Impact of Deconversion
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Leaving Religion: The Mental Health Impact of Deconversion',
    'leaving-religion-deconversion',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['deconversion', 'leaving religion', 'faith transition', 'religious doubt', 'apostasy'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT31-040',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding the psychological process of religious deconversion, common mental health challenges during faith transitions, and evidence-based coping strategies.',
    '/images/articles/cat31/cover-040.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT31-041: Spiritual Bypassing: When Spiritual Practice Avoids Real Emo
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Spiritual Bypassing: When Spiritual Practice Avoids Real Emotional Work',
    'spiritual-bypassing',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['spiritual bypassing', 'toxic positivity', 'spiritual materialism', 'emotional avoidance', 'shadow work'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT31-041',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding spiritual bypassing, how using spiritual practices to avoid psychological pain can harm wellbeing, and finding balanced spiritual growth.',
    '/images/articles/cat31/cover-041.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT31-042: The Dark Night of the Soul: Spiritual Emergency and Mental H
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Dark Night of the Soul: Spiritual Emergency and Mental Health',
    'dark-night-of-soul',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['dark night of the soul', 'spiritual emergency', 'spiritual crisis', 'transformation', 'St. John of the Cross'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT31-042',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding the dark night of the soul, distinguishing spiritual emergency from psychiatric crisis, and navigating intense spiritual transformation safely.',
    '/images/articles/cat31/cover-042.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT31-043: Forgiveness: The Psychology and Spirituality of Letting Go o
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Forgiveness: The Psychology and Spirituality of Letting Go of Resentment',
    'forgiveness-psychology',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['forgiveness', 'resentment', 'letting go', 'reconciliation', 'self-forgiveness'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT31-043',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding forgiveness from psychological and spiritual perspectives, its health benefits, and evidence-based approaches to forgiving without condoning harm.',
    '/images/articles/cat31/cover-043.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT31-044: Mystical Experiences and Psychology: Altered States and Thei
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Mystical Experiences and Psychology: Altered States and Their Meaning',
    'mystical-experiences',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['mystical experience', 'altered states', 'peak experience', 'unity consciousness', 'transcendence'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT31-044',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding mystical experiences from psychological and neuroscientific perspectives, their common features, triggers, and lasting effects on mental health.',
    '/images/articles/cat31/cover-044.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT31-045: Interfaith Dialogue and Psychological Wellbeing: Connection 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Interfaith Dialogue and Psychological Wellbeing: Connection Across Difference',
    'interfaith-dialogue',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['interfaith dialogue', 'religious diversity', 'pluralism', 'empathy', 'prejudice reduction'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT31-045',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding how interfaith dialogue promotes psychological wellbeing, reduces prejudice, and builds resilience through encountering diverse spiritual perspectives.',
    '/images/articles/cat31/cover-045.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT31-046: Religion and Coping: How Faith Functions as a Psychological 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Religion and Coping: How Faith Functions as a Psychological Resource',
    'religion-coping',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['religious coping', 'faith and stress', 'spiritual coping', 'psychology of religion', 'positive religious coping'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT31-046',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding how religious beliefs and practices serve as psychological coping mechanisms during stress, loss, and illness, based on research evidence.',
    '/images/articles/cat31/cover-046.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT31-047: Gratitude and Transcendence: The Neuropsychology of Apprecia
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Gratitude and Transcendence: The Neuropsychology of Appreciation',
    'gratitude-transcendence',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['gratitude', 'transcendence', 'neuropsychology', 'gratitude practice', 'appreciation'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT31-047',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding how gratitude affects the brain, promotes psychological wellbeing, and connects to transcendent experiences based on neuroscience research.',
    '/images/articles/cat31/cover-047.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT31-048: Ritual and Routine: The Psychology of Sacred Practices
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Ritual and Routine: The Psychology of Sacred Practices',
    'ritual-routine',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['ritual', 'routine', 'sacred practices', 'psychology of ritual', 'religious ritual'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT31-048',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding how rituals and routines provide psychological structure, meaning, and comfort, based on research on religious and secular practices.',
    '/images/articles/cat31/cover-048.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT31-049: Contemplative Practices: Stillness, Silence, and Mental Heal
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Contemplative Practices: Stillness, Silence, and Mental Health',
    'contemplative-practices',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['contemplative practices', 'meditation', 'silence', 'stillness', 'centering prayer'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT31-049',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understanding contemplative practices across traditions—meditation, centering prayer, silent retreats—and their psychological benefits based on research.',
    '/images/articles/cat31/cover-049.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'altered-transcendent-states' AND category_id = v_cat_id;

  -- CAT31-050: Mystical Experiences: The Psychology of Transcendent States
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Mystical Experiences: The Psychology of Transcendent States',
    'mystical-experiences-spiritual-states',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['altered-transcendent-states', 'Mystical Experiences', 'The Psychology of Transcendent States'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT31-050',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand mystical experiences—profound states of unity, transcendence, and ineffability. Explore their psychological characteristics, neurobiology, triggers, mental health impacts, and integration challenges.',
    '/images/articles/cat31/cover-050.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'collective-social-meaning' AND category_id = v_cat_id;

  -- CAT31-051: Collective Meaning: How Groups Create Shared Purpose and Ide
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Collective Meaning: How Groups Create Shared Purpose and Identity',
    'collective-meaning',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['collective-social-meaning', 'Collective Meaning', 'How Groups Create Shared Purpose and Identity'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT31-051',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore collective meaning—how groups create shared narratives, purposes, and identities that transcend individual lives. Understand the psychological power and potential dangers of collective meaning systems.',
    '/images/articles/cat31/cover-051.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'existential-concerns-challenges' AND category_id = v_cat_id;

  -- CAT31-052: Existential Isolation: The Unbridgeable Gap Between Consciou
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Existential Isolation: The Unbridgeable Gap Between Consciousnesses',
    'existential-isolation',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['existential-concerns-challenges', 'Existential Isolation', 'The Unbridgeable Gap Between Consciousnesses'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT31-052',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand existential isolation—the fundamental separateness of individual consciousness. Learn to distinguish it from loneliness, explore its psychological impacts, and find ways to accept and transcend this basic condition of existence.',
    '/images/articles/cat31/cover-052.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'meaning-symbolic-systems' AND category_id = v_cat_id;

  -- CAT31-053: The Sacred and the Profane: How Humans Create Meaning Throug
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Sacred and the Profane: How Humans Create Meaning Through Distinction',
    'sacred-profane',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['meaning-symbolic-systems', 'The Sacred and the Profane', 'How Humans Create Meaning Through Distinction'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT31-053',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the psychological distinction between sacred and profane—how humans designate certain things as special, set-apart, and meaningful. Understand the mental health implications of having (or losing) access to the sacred in daily life.',
    '/images/articles/cat31/cover-053.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'spiritual-crises-challenges' AND category_id = v_cat_id;

  -- CAT31-054: Religious and Spiritual Struggles: When Faith Becomes a Sour
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Religious and Spiritual Struggles: When Faith Becomes a Source of Distress',
    'religious-spiritual-struggles',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['spiritual-crises-challenges', 'Religious and Spiritual Struggles', 'When Faith Becomes a Source of Distress'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT31-054',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand religious and spiritual struggles—conflicts, doubts, and tensions around faith. Learn about different types of struggles, their mental health impacts, and evidence-based approaches for finding resolution or peaceful coexistence.',
    '/images/articles/cat31/cover-054.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'spiritual-practices-methods' AND category_id = v_cat_id;

  -- CAT31-055: Contemplative Practices: Beyond Meditation—Diverse Paths to 
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Contemplative Practices: Beyond Meditation—Diverse Paths to Inner Stillness',
    'contemplative-practices-spiritual-methods',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['spiritual-practices-methods', 'Contemplative Practices', 'Beyond Meditation', 'Diverse Paths to Inner Stillness'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT31-055',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore contemplative practices beyond meditation—from lectio divina to tea ceremony. Learn how diverse traditions cultivate presence, insight, and wellbeing through sustained attention and reflection.',
    '/images/articles/cat31/cover-055.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT31-056: Ritual and Ceremony: The Psychological Power of Sacred Acts
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Ritual and Ceremony: The Psychological Power of Sacred Acts',
    'ritual-ceremony',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['spiritual-practices-methods', 'Ritual and Ceremony', 'The Psychological Power of Sacred Acts'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT31-056',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the psychology of rituals and ceremonies—from religious sacraments to personal practices. Learn how structured symbolic actions reduce anxiety, mark transitions, build community, and create meaning.',
    '/images/articles/cat31/cover-056.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'spiritual-psychological-integration' AND category_id = v_cat_id;

  -- CAT31-057: Spiritual Bypassing: When Spirituality Becomes a Way to Avoi
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Spiritual Bypassing: When Spirituality Becomes a Way to Avoid Difficult Emotions',
    'spiritual-bypassing-integration',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['spiritual-psychological-integration', 'Spiritual Bypassing', 'When Spirituality Becomes a Way to Avoid Difficult Emotions'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT31-057',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand spiritual bypassing—using spiritual beliefs to avoid painful emotions. Learn to recognize the signs, understand the psychological costs, and integrate authentic spirituality with emotional processing.',
    '/images/articles/cat31/cover-057.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'values-ethics-conscience' AND category_id = v_cat_id;

  -- CAT31-058: Moral Injury: When Your Actions Violate Your Deepest Values
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Moral Injury: When Your Actions Violate Your Deepest Values',
    'moral-injury',
    'draft',
    'Spirituality, Meaning & Existential Mental Health',
    ARRAY['values-ethics-conscience', 'Moral Injury', 'When Your Actions Violate Your Deepest Values'],
    1200,
    'Psychage Editorial Team',
    'self_help',
    'CAT31-058',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Understand moral injury—the psychological wound from violating deeply held moral beliefs. Learn to recognize symptoms, understand causes beyond combat, and explore evidence-based healing approaches.',
    '/images/articles/cat31/cover-058.svg',
    5,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

END $$;

-- ---------------------------------------------------------------------------
-- 4. Update Production ID Generator (add prefixes for 29-31)
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.generate_article_production_id(p_category_slug TEXT)
RETURNS TEXT AS $$
DECLARE
  v_prefix TEXT;
  v_seq INTEGER;
  v_map JSONB := '{
    "anxiety-stress": "ANX",
    "depression-mood": "DEP",
    "relationships-social": "REL",
    "trauma-ptsd": "TRM",
    "neurodevelopmental": "NDV",
    "substance-addiction": "SUB",
    "sleep-circadian": "SLP",
    "self-esteem-identity": "EST",
    "therapy-treatment": "THR",
    "workplace-academic": "WRK",
    "life-transitions": "LIF",
    "children-adolescents": "CHD",
    "eating-body": "EAT",
    "ocd-related": "OCD",
    "global-cultural": "GLB",
    "psychosis-schizophrenia": "PSC",
    "aging-dementia-late-life": "AGE",
    "womens-mental-health": "WMH",
    "mens-mental-health": "MMH",
    "chronic-illness-pain": "CIP",
    "technology-digital-life": "TDL",
    "spirituality-meaning": "SPR",
    "brain-neuroscience": "BRN",
    "creativity-therapeutic-arts": "CRE",
    "disability-accessibility": "DIS",
    "forensic-legal-justice": "FOR",
    "military-veterans-firstresponder": "MIL",
    "sexuality-intimacy": "SEX",
    "environmental-eco-psychology": "ENV",
    "life-skills-practical-psychology": "LFS"
  }'::JSONB;
BEGIN
  v_prefix := v_map ->> p_category_slug;
  IF v_prefix IS NULL THEN
    RAISE EXCEPTION 'Unknown category slug: %', p_category_slug;
  END IF;

  SELECT COALESCE(MAX(
    CAST(SPLIT_PART(article_production_id, '-', 3) AS INTEGER)
  ), 0) + 1
  INTO v_seq
  FROM public.articles
  WHERE article_production_id LIKE 'PSY-' || v_prefix || '-%';

  RETURN 'PSY-' || v_prefix || '-' || LPAD(v_seq::TEXT, 3, '0');
END;
$$ LANGUAGE plpgsql;

-- ---------------------------------------------------------------------------
-- 5. Verification (600 articles seeded)
-- ---------------------------------------------------------------------------

-- Verify categories:
-- SELECT display_order, name, slug, article_target
-- FROM public.article_categories
-- WHERE display_order >= 23
-- ORDER BY display_order;

-- Verify subcategory counts:
-- SELECT c.name, COUNT(s.id) as subcategories
-- FROM public.article_categories c
-- LEFT JOIN public.article_subcategories s ON s.category_id = c.id
-- WHERE c.display_order >= 23
-- GROUP BY c.name, c.display_order
-- ORDER BY c.display_order;

-- Verify article counts per category:
-- SELECT c.name, COUNT(a.id) as articles
-- FROM public.article_categories c
-- LEFT JOIN public.articles a ON a.category_id = c.id
-- WHERE c.display_order >= 23
-- GROUP BY c.name, c.display_order
-- ORDER BY c.display_order;