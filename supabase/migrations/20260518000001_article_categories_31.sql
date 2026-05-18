-- =============================================================================
-- Article Categories — 15 → 31 (content-architecture parity)
-- =============================================================================
--
-- Adds the 16 specialized / extended categories from
-- src/lib/article-framework/content-architecture.ts so the article_categories
-- table reaches 31 rows and matches the canonical content plan.
--
-- Also introduces `architecture_group` to facet categories in the UI:
--   - 'clinical'      → the original 15 clinical categories
--   - 'specialized'   → arch numbers 15–21 (populations, conditions)
--   - 'extended'      → arch numbers 23–31 (applied / extended domains)
--
-- Articles tagged to the existing 15 slugs are unaffected — no backfill of
-- category_id is performed because slug namespaces don't collide.
-- =============================================================================

BEGIN;

-- ---------------------------------------------------------------------------
-- 1. architecture_group column
-- ---------------------------------------------------------------------------

ALTER TABLE public.article_categories
  ADD COLUMN IF NOT EXISTS architecture_group TEXT;

CREATE INDEX IF NOT EXISTS idx_article_categories_arch_group
  ON public.article_categories(architecture_group);

-- Mark existing 15 rows as clinical (only updates rows that don't have a group yet)
UPDATE public.article_categories
SET architecture_group = 'clinical'
WHERE architecture_group IS NULL
  AND slug IN (
    'anxiety-stress', 'depression-mood', 'relationships-social', 'trauma-ptsd',
    'neurodevelopmental', 'substance-addiction', 'sleep-circadian',
    'self-esteem-identity', 'therapy-treatment', 'workplace-academic',
    'life-transitions', 'children-adolescents', 'eating-body', 'ocd-related',
    'global-cultural'
  );

-- ---------------------------------------------------------------------------
-- 2. Seed 16 new specialized + extended categories
--    (slugs not present in the original 15 clinical seed)
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories
  (name, slug, description, icon, display_order, article_target, color, architecture_group)
VALUES
  -- Specialized populations & conditions (#15–21)
  ('Loneliness, Social Connection & Belonging',
   'loneliness-connection',
   'Neuroscience of social connection, health impacts of isolation, building friendships, community belonging, and the paradox of digital connection.',
   'Users', 15, 50, '#0EA5E9', 'specialized'),
  ('Psychosis, Schizophrenia & Severe Mental Illness',
   'psychosis-schizophrenia',
   'Comprehensive education on psychotic disorders, schizophrenia spectrum conditions, and severe mental illness — from neuroscience to family support and recovery.',
   'Brain', 16, 60, '#7C3AED', 'specialized'),
  ('Aging, Dementia & Late-Life Mental Health',
   'aging-dementia-late-life',
   'Mental health challenges unique to older adults, including dementia, Alzheimer disease, late-life depression, cognitive decline, and caregiving.',
   'Clock', 17, 60, '#64748B', 'specialized'),
  ('Women''s Mental Health',
   'womens-mental-health',
   'Mental health issues affecting women across the lifespan — reproductive health, gender-specific risk factors, and sociocultural influences.',
   'HeartPulse', 18, 70, '#EC4899', 'specialized'),
  ('Men''s Mental Health',
   'mens-mental-health',
   'Evidence-based education on men''s mental health — suicide risk, masked depression, help-seeking barriers, and masculine norms.',
   'Shield', 19, 70, '#1D4ED8', 'specialized'),
  ('Chronic Illness, Pain & Medical Psychology',
   'chronic-illness-pain',
   'Psychological dimensions of chronic illness — pain neuroscience, medical trauma, identity shifts, and resilience-building strategies.',
   'Activity', 20, 65, '#DC2626', 'specialized'),
  ('Technology, Digital Life & Mental Health',
   'technology-digital-life',
   'Psychological impact of technology — social media, smartphones, VR therapy, digital therapeutics, and balanced coverage of harms and benefits.',
   'Smartphone', 21, 70, '#0891B2', 'specialized'),

  -- Extended domains & applied psychology (#23–31)
  ('Brain, Neuroscience & Biological Basis',
   'brain-neuroscience',
   'Biological foundations of mental health — neurotransmitters, brain structure, neuroplasticity, and the intersection of biology and psychology.',
   'Brain', 23, 66, '#9333EA', 'extended'),
  ('Creativity, Therapeutic Arts & Expressive Healing',
   'creativity-therapeutic-arts',
   'Creative expression as a pathway to mental health — art, music, drama, writing therapy, and the psychology of the creative process.',
   'Palette', 24, 64, '#F97316', 'extended'),
  ('Disability, Accessibility & Inclusive Mental Health',
   'disability-accessibility',
   'Mental health at the intersection of disability — identity, access to care, neurodivergence, universal design, and inclusion.',
   'Accessibility', 25, 64, '#16A34A', 'extended'),
  ('Forensic Psychology & Criminal Justice Mental Health',
   'forensic-legal-justice',
   'Psychology within the legal and justice systems — criminal behavior, forensic assessment, incarceration mental health, and rehabilitation.',
   'Scale', 26, 64, '#475569', 'extended'),
  ('Military, Veterans & First Responder Mental Health',
   'military-veterans-firstresponder',
   'Mental health for those who serve — combat trauma, moral injury, first responder stress, military families, and transition.',
   'Award', 27, 44, '#92400E', 'extended'),
  ('Sexuality, Intimacy & Sexual Health',
   'sexuality-intimacy',
   'Psychology of human sexuality — sexual health, intimacy, identity, dysfunction, trauma recovery, and sex therapy.',
   'Heart', 28, 64, '#BE185D', 'extended'),
  ('Environmental, Eco-Psychology & Planetary Mental Health',
   'environmental-eco-psychology',
   'Psychological dimensions of our relationship with the natural world — eco-anxiety, climate grief, nature-based therapy, and environmental justice.',
   'Leaf', 29, 66, '#15803D', 'extended'),
  ('Applied Life Skills, Self-Design & Practical Psychology',
   'life-skills-practical-psychology',
   'Practical psychology for everyday life — decision-making, emotional intelligence, communication, productivity, habit formation, financial psychology.',
   'Sparkles', 30, 110, '#0D9488', 'extended'),
  ('Spirituality, Meaning & Existential Mental Health',
   'spirituality-meaning',
   'Evidence-based existential psychology — meaning, mortality, freedom, isolation, and the integration of spiritual and psychological wellbeing.',
   'Compass', 31, 69, '#7E22CE', 'extended')
ON CONFLICT (slug) DO UPDATE
SET
  description = EXCLUDED.description,
  display_order = EXCLUDED.display_order,
  article_target = EXCLUDED.article_target,
  color = EXCLUDED.color,
  architecture_group = COALESCE(public.article_categories.architecture_group, EXCLUDED.architecture_group),
  updated_at = NOW();

COMMIT;
