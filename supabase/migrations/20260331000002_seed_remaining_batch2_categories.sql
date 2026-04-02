-- ============================================================================
-- Remaining Batch 2 Article Categories
-- Adds 2 missing categories: environmental-eco-psychology, life-skills-practical-psychology
-- Updates production ID generator to include ENV, SKL prefixes
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert 2 Remaining Categories
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES
  -- Category 29: Environmental & Eco-Psychology
  (
    'Environmental, Eco-Psychology & Planetary Mental Health',
    'environmental-eco-psychology',
    'The psychological dimensions of our relationship with the natural world — eco-anxiety, climate grief, nature-based therapy, urban psychology, and environmental justice.',
    'TreePine',
    29,
    66,
    '#059669'
  ),

  -- Category 30: Life Skills & Practical Psychology
  (
    'Applied Life Skills, Self-Design & Practical Psychology',
    'life-skills-practical-psychology',
    'Practical psychology for everyday life — decision-making, emotional intelligence, communication, productivity, habit formation, financial psychology, and the examined life.',
    'Lightbulb',
    30,
    110,
    '#D97706'
  )
ON CONFLICT (slug) DO UPDATE SET
  display_order = EXCLUDED.display_order,
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon,
  article_target = EXCLUDED.article_target,
  color = EXCLUDED.color;

-- ---------------------------------------------------------------------------
-- 2. Update Production ID Generator to Include New Prefixes
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
    "brain-neuroscience": "BRN",
    "creativity-therapeutic-arts": "CRE",
    "disability-accessibility": "DIS",
    "forensic-legal-justice": "FOR",
    "military-veterans-firstresponder": "MIL",
    "sexuality-intimacy": "SEX",
    "environmental-eco-psychology": "ENV",
    "life-skills-practical-psychology": "SKL",
    "spirituality-meaning": "SPR"
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
