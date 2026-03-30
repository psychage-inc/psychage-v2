-- ============================================================================
-- Batch 2 Article Categories & Production ID Mappings
-- Adds 6 new categories for batch 2 articles (#1401-#1800)
-- Updates production ID generator to handle PSY-BRN, PSY-CRE, PSY-DIS, PSY-FOR, PSY-MIL, PSY-SEX prefixes
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert 6 New Article Categories
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES
  -- Category 23: Brain & Neuroscience
  (
    'Brain, Neuroscience & Biological Basis',
    'brain-neuroscience',
    'Understanding the biological foundations of mental health — neurotransmitters, brain structure, neuroplasticity, and the intersection of biology and psychology.',
    'Brain',
    23,
    50,
    '#7C3AED'
  ),

  -- Category 24: Creativity & Therapeutic Arts
  (
    'Creativity & Therapeutic Arts',
    'creativity-therapeutic-arts',
    'The psychology of creativity, flow states, art therapy, music therapy, and expressive arts as healing modalities.',
    'Palette',
    24,
    60,
    '#EC4899'
  ),

  -- Category 25: Disability & Accessibility
  (
    'Disability, Accessibility & Psychological Inclusion',
    'disability-accessibility',
    'Disability-affirming mental health care, accessibility barriers, neurodiversity, and building inclusive psychological services.',
    'Accessibility',
    25,
    70,
    '#10B981'
  ),

  -- Category 26: Forensic & Legal Justice
  (
    'Forensic Psychology & Criminal Justice Mental Health',
    'forensic-legal-justice',
    'Mental health in criminal justice settings — competency, risk assessment, rehabilitation, victim psychology, and ethical complexities.',
    'Scale',
    26,
    75,
    '#6B7280'
  ),

  -- Category 27: Military & Veterans
  (
    'Military, Veterans & First Responder Mental Health',
    'military-veterans-firstresponder',
    'PTSD, moral injury, transition stress, and mental health challenges unique to military, veteran, and first responder populations.',
    'Shield',
    27,
    60,
    '#991B1B'
  ),

  -- Category 28: Sexuality & Intimacy
  (
    'Sexuality, Intimacy & Sexual Health',
    'sexuality-intimacy',
    'Evidence-based education on human sexuality, sexual dysfunction, intimacy, consent, sexual identity, and sexual trauma recovery.',
    'Heart',
    28,
    50,
    '#DB2777'
  )
ON CONFLICT (slug) DO UPDATE SET
  display_order = EXCLUDED.display_order,
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon,
  article_target = EXCLUDED.article_target,
  color = EXCLUDED.color;

-- ---------------------------------------------------------------------------
-- 2. Update Production ID Generator Function
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
    "sexuality-intimacy": "SEX"
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
-- 3. Verification Query
-- ---------------------------------------------------------------------------

-- Uncomment to verify categories were added:
-- SELECT display_order, name, slug, article_target, color
-- FROM public.article_categories
-- WHERE display_order >= 23
-- ORDER BY display_order;
