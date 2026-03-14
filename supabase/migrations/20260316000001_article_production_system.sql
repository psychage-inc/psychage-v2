-- ============================================================================
-- Article Production System
-- Adds taxonomy (categories, subcategories), derivatives tracking,
-- and production pipeline fields to the articles table.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. article_categories — 15 mental health content categories
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.article_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT DEFAULT '',
  icon TEXT,              -- Lucide icon name (e.g., 'Brain', 'CloudRain')
  display_order INTEGER NOT NULL DEFAULT 0,
  article_target INTEGER NOT NULL DEFAULT 0,
  color TEXT,             -- Hex color for UI badges (e.g., '#0D9488')
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_article_categories_slug ON public.article_categories(slug);
CREATE INDEX IF NOT EXISTS idx_article_categories_order ON public.article_categories(display_order);

-- ---------------------------------------------------------------------------
-- 2. article_subcategories — ~91 subcategories across 15 categories
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.article_subcategories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT DEFAULT '',
  category_id UUID NOT NULL REFERENCES public.article_categories(id) ON DELETE CASCADE,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(slug, category_id)
);

CREATE INDEX IF NOT EXISTS idx_article_subcategories_category ON public.article_subcategories(category_id);
CREATE INDEX IF NOT EXISTS idx_article_subcategories_slug ON public.article_subcategories(slug);

-- ---------------------------------------------------------------------------
-- 3. article_derivatives — derivative content pieces from cornerstone articles
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.article_derivatives (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  derivative_type TEXT NOT NULL CHECK (derivative_type IN (
    'supporting_article',
    'spark_micro_content',
    'key_facts_card',
    'social_media_post',
    'email_newsletter_block',
    'video_script',
    'faq_entry',
    'pull_quote'
  )),
  title TEXT,
  content TEXT,
  platform TEXT,          -- 'instagram', 'linkedin', 'x', 'tiktok', 'email', 'website'
  word_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'planned' CHECK (status IN ('planned', 'drafted', 'reviewed', 'published')),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_article_derivatives_source ON public.article_derivatives(source_article_id);
CREATE INDEX IF NOT EXISTS idx_article_derivatives_type ON public.article_derivatives(derivative_type);
CREATE INDEX IF NOT EXISTS idx_article_derivatives_status ON public.article_derivatives(status);

-- ---------------------------------------------------------------------------
-- 4. Extend articles table with production pipeline fields
-- ---------------------------------------------------------------------------

ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES public.article_categories(id) ON DELETE SET NULL;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS subcategory_id UUID REFERENCES public.article_subcategories(id) ON DELETE SET NULL;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS template_type TEXT CHECK (template_type IN ('educational', 'myth_buster', 'how_to', 'resource_compilation'));
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS article_production_id TEXT UNIQUE;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS review_stage TEXT DEFAULT 'planned' CHECK (review_stage IN ('planned', 'researched', 'drafted', 'in_review', 'approved', 'published'));
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS is_cornerstone BOOLEAN DEFAULT FALSE;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS has_spark_moment BOOLEAN DEFAULT FALSE;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS has_practical_exercise BOOLEAN DEFAULT FALSE;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS has_crisis_disclaimer BOOLEAN DEFAULT FALSE;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS seo_title TEXT;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS seo_description TEXT;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS seo_keywords TEXT[];
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS hero_image_url TEXT;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS hero_image_alt TEXT;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS internal_links TEXT[] DEFAULT '{}';
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS tool_links TEXT[] DEFAULT '{}';
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS related_article_ids UUID[] DEFAULT '{}';
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS fact_checked BOOLEAN DEFAULT FALSE;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS fact_checked_by TEXT;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS fact_checked_at TIMESTAMPTZ;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS clinical_approved BOOLEAN DEFAULT FALSE;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS clinical_approved_at TIMESTAMPTZ;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS legal_approved BOOLEAN DEFAULT FALSE;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS seo_approved BOOLEAN DEFAULT FALSE;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS final_approved BOOLEAN DEFAULT FALSE;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS final_approved_by TEXT;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS final_approved_at TIMESTAMPTZ;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT FALSE;

CREATE INDEX IF NOT EXISTS idx_articles_category_id ON public.articles(category_id);
CREATE INDEX IF NOT EXISTS idx_articles_subcategory_id ON public.articles(subcategory_id);
CREATE INDEX IF NOT EXISTS idx_articles_review_stage ON public.articles(review_stage);
CREATE INDEX IF NOT EXISTS idx_articles_production_id ON public.articles(article_production_id);
CREATE INDEX IF NOT EXISTS idx_articles_featured ON public.articles(featured) WHERE featured = TRUE;
CREATE INDEX IF NOT EXISTS idx_articles_cornerstone ON public.articles(is_cornerstone) WHERE is_cornerstone = TRUE;

-- ---------------------------------------------------------------------------
-- 5. RLS Policies
-- ---------------------------------------------------------------------------

ALTER TABLE public.article_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_subcategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_derivatives ENABLE ROW LEVEL SECURITY;

-- article_categories: public read, admin write
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'public_read_categories' AND tablename = 'article_categories') THEN
    CREATE POLICY "public_read_categories" ON public.article_categories FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'admin_write_categories' AND tablename = 'article_categories') THEN
    CREATE POLICY "admin_write_categories" ON public.article_categories FOR ALL USING (
      EXISTS (SELECT 1 FROM public.admin_roles WHERE user_id = auth.uid() AND role IN ('super_admin', 'clinical_admin'))
    );
  END IF;
END $$;

-- article_subcategories: public read, admin write
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'public_read_subcategories' AND tablename = 'article_subcategories') THEN
    CREATE POLICY "public_read_subcategories" ON public.article_subcategories FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'admin_write_subcategories' AND tablename = 'article_subcategories') THEN
    CREATE POLICY "admin_write_subcategories" ON public.article_subcategories FOR ALL USING (
      EXISTS (SELECT 1 FROM public.admin_roles WHERE user_id = auth.uid() AND role IN ('super_admin', 'clinical_admin'))
    );
  END IF;
END $$;

-- article_derivatives: admin only
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'admin_read_derivatives' AND tablename = 'article_derivatives') THEN
    CREATE POLICY "admin_read_derivatives" ON public.article_derivatives FOR SELECT USING (
      EXISTS (SELECT 1 FROM public.admin_roles WHERE user_id = auth.uid())
    );
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'admin_write_derivatives' AND tablename = 'article_derivatives') THEN
    CREATE POLICY "admin_write_derivatives" ON public.article_derivatives FOR ALL USING (
      EXISTS (SELECT 1 FROM public.admin_roles WHERE user_id = auth.uid() AND role IN ('super_admin', 'clinical_admin'))
    );
  END IF;
END $$;

-- ---------------------------------------------------------------------------
-- 6. Auto-update triggers
-- ---------------------------------------------------------------------------

DROP TRIGGER IF EXISTS article_categories_updated_at ON public.article_categories;
CREATE TRIGGER article_categories_updated_at
  BEFORE UPDATE ON public.article_categories
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS article_subcategories_updated_at ON public.article_subcategories;
CREATE TRIGGER article_subcategories_updated_at
  BEFORE UPDATE ON public.article_subcategories
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS article_derivatives_updated_at ON public.article_derivatives;
CREATE TRIGGER article_derivatives_updated_at
  BEFORE UPDATE ON public.article_derivatives
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ---------------------------------------------------------------------------
-- 7. Article Production ID Generator
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
    "global-cultural": "GLB"
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
-- 8. Seed Data — 15 Categories
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES
  ('Anxiety & Stress', 'anxiety-stress', 'Understanding anxiety disorders, stress responses, and evidence-based management strategies.', 'Brain', 1, 100, '#0D9488'),
  ('Depression & Mood', 'depression-mood', 'Exploring depressive disorders, mood regulation, and pathways to emotional wellbeing.', 'CloudRain', 2, 95, '#6366F1'),
  ('Relationships & Social Health', 'relationships-social', 'Building healthier connections, navigating loneliness, and strengthening social wellbeing.', 'Users', 3, 85, '#EC4899'),
  ('Trauma & PTSD', 'trauma-ptsd', 'Understanding trauma responses, PTSD, and the path to recovery and resilience.', 'Shield', 4, 75, '#EF4444'),
  ('Neurodevelopmental', 'neurodevelopmental', 'ADHD, autism, learning differences, and thriving with neurodivergent minds.', 'Zap', 5, 70, '#F59E0B'),
  ('Substance Use & Addiction', 'substance-addiction', 'Evidence-based education on substance use, behavioral addictions, and recovery pathways.', 'AlertTriangle', 6, 65, '#DC2626'),
  ('Sleep & Circadian Health', 'sleep-circadian', 'Sleep science, sleep disorders, and practical strategies for restorative rest.', 'Moon', 7, 55, '#8B5CF6'),
  ('Self-Esteem & Identity', 'self-esteem-identity', 'Building self-worth, navigating identity, and moving beyond shame and self-doubt.', 'Heart', 8, 60, '#F97316'),
  ('Therapy & Treatment', 'therapy-treatment', 'Demystifying therapy types, treatment approaches, and how to find the right support.', 'MessageCircle', 9, 65, '#14B8A6'),
  ('Workplace & Academic', 'workplace-academic', 'Managing burnout, academic pressure, and mental health in professional settings.', 'Briefcase', 10, 60, '#3B82F6'),
  ('Life Transitions & Crises', 'life-transitions', 'Navigating major life changes with resilience and support.', 'Compass', 11, 60, '#0EA5E9'),
  ('Children & Adolescents', 'children-adolescents', 'Supporting young minds — child anxiety, teen mental health, bullying, and parenting.', 'Baby', 12, 55, '#22C55E'),
  ('Eating & Body', 'eating-body', 'Understanding eating disorders, body image, and building a healthier relationship with food.', 'Apple', 13, 50, '#A855F7'),
  ('OCD & Related', 'ocd-related', 'OCD, health anxiety, perfectionism, and related conditions — what they are and how they are managed.', 'RefreshCw', 14, 50, '#D946EF'),
  ('Global & Cultural Mental Health', 'global-cultural', 'Mental health across cultures — stigma, indigenous healing, global disparities, and cultural perspectives.', 'Globe', 15, 55, '#06B6D4')
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------------------
-- 9. Seed Data — Subcategories
-- ---------------------------------------------------------------------------

-- Helper: insert subcategories referencing parent category by slug
DO $$
DECLARE
  v_cat_id UUID;
BEGIN
  -- 1. Anxiety & Stress
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'anxiety-stress';
  INSERT INTO public.article_subcategories (name, slug, category_id, display_order) VALUES
    ('Generalized Anxiety', 'generalized-anxiety', v_cat_id, 1),
    ('Social Anxiety', 'social-anxiety', v_cat_id, 2),
    ('Panic Disorder', 'panic-disorder', v_cat_id, 3),
    ('Phobias', 'phobias', v_cat_id, 4),
    ('Stress Management', 'stress-management', v_cat_id, 5),
    ('Performance Anxiety', 'performance-anxiety', v_cat_id, 6)
  ON CONFLICT (slug, category_id) DO NOTHING;

  -- 2. Depression & Mood
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'depression-mood';
  INSERT INTO public.article_subcategories (name, slug, category_id, display_order) VALUES
    ('Major Depression', 'major-depression', v_cat_id, 1),
    ('Persistent Depressive Disorder', 'persistent-depressive', v_cat_id, 2),
    ('Seasonal Affective Disorder', 'seasonal-affective', v_cat_id, 3),
    ('Postpartum Depression', 'postpartum-depression', v_cat_id, 4),
    ('Bipolar Spectrum', 'bipolar-spectrum', v_cat_id, 5),
    ('Grief & Loss', 'grief-loss', v_cat_id, 6)
  ON CONFLICT (slug, category_id) DO NOTHING;

  -- 3. Relationships & Social Health
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'relationships-social';
  INSERT INTO public.article_subcategories (name, slug, category_id, display_order) VALUES
    ('Romantic Relationships', 'romantic-relationships', v_cat_id, 1),
    ('Family Dynamics', 'family-dynamics', v_cat_id, 2),
    ('Friendships', 'friendships', v_cat_id, 3),
    ('Loneliness', 'loneliness', v_cat_id, 4),
    ('Boundaries', 'boundaries', v_cat_id, 5),
    ('Conflict Resolution', 'conflict-resolution', v_cat_id, 6)
  ON CONFLICT (slug, category_id) DO NOTHING;

  -- 4. Trauma & PTSD
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'trauma-ptsd';
  INSERT INTO public.article_subcategories (name, slug, category_id, display_order) VALUES
    ('PTSD', 'ptsd', v_cat_id, 1),
    ('Complex PTSD', 'complex-ptsd', v_cat_id, 2),
    ('Childhood Trauma', 'childhood-trauma', v_cat_id, 3),
    ('Sexual Trauma', 'sexual-trauma', v_cat_id, 4),
    ('Accident & Disaster Trauma', 'accident-disaster', v_cat_id, 5),
    ('Trauma Recovery', 'trauma-recovery', v_cat_id, 6)
  ON CONFLICT (slug, category_id) DO NOTHING;

  -- 5. Neurodevelopmental
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'neurodevelopmental';
  INSERT INTO public.article_subcategories (name, slug, category_id, display_order) VALUES
    ('ADHD', 'adhd', v_cat_id, 1),
    ('Autism Spectrum', 'autism-spectrum', v_cat_id, 2),
    ('Learning Disabilities', 'learning-disabilities', v_cat_id, 3),
    ('Executive Function', 'executive-function', v_cat_id, 4),
    ('Sensory Processing', 'sensory-processing', v_cat_id, 5)
  ON CONFLICT (slug, category_id) DO NOTHING;

  -- 6. Substance Use & Addiction
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'substance-addiction';
  INSERT INTO public.article_subcategories (name, slug, category_id, display_order) VALUES
    ('Alcohol', 'alcohol', v_cat_id, 1),
    ('Drugs', 'drugs', v_cat_id, 2),
    ('Behavioral Addictions', 'behavioral-addictions', v_cat_id, 3),
    ('Recovery', 'recovery', v_cat_id, 4),
    ('Harm Reduction', 'harm-reduction', v_cat_id, 5),
    ('Family Impact', 'family-impact', v_cat_id, 6)
  ON CONFLICT (slug, category_id) DO NOTHING;

  -- 7. Sleep & Circadian Health
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'sleep-circadian';
  INSERT INTO public.article_subcategories (name, slug, category_id, display_order) VALUES
    ('Insomnia', 'insomnia', v_cat_id, 1),
    ('Sleep Hygiene', 'sleep-hygiene', v_cat_id, 2),
    ('Sleep Disorders', 'sleep-disorders', v_cat_id, 3),
    ('Dreams & Sleep Science', 'dreams-sleep-science', v_cat_id, 4),
    ('Shift Work & Jet Lag', 'shift-work-jet-lag', v_cat_id, 5),
    ('Sleep & Mental Health', 'sleep-mental-health', v_cat_id, 6)
  ON CONFLICT (slug, category_id) DO NOTHING;

  -- 8. Self-Esteem & Identity
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'self-esteem-identity';
  INSERT INTO public.article_subcategories (name, slug, category_id, display_order) VALUES
    ('Self-Worth', 'self-worth', v_cat_id, 1),
    ('Body Image', 'body-image', v_cat_id, 2),
    ('Impostor Syndrome', 'impostor-syndrome', v_cat_id, 3),
    ('Identity Development', 'identity-development', v_cat_id, 4),
    ('Shame & Guilt', 'shame-guilt', v_cat_id, 5),
    ('Self-Compassion', 'self-compassion', v_cat_id, 6)
  ON CONFLICT (slug, category_id) DO NOTHING;

  -- 9. Therapy & Treatment
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'therapy-treatment';
  INSERT INTO public.article_subcategories (name, slug, category_id, display_order) VALUES
    ('Cognitive Behavioral Therapy (CBT)', 'cbt', v_cat_id, 1),
    ('Dialectical Behavior Therapy (DBT)', 'dbt', v_cat_id, 2),
    ('EMDR', 'emdr', v_cat_id, 3),
    ('Psychotherapy Types', 'psychotherapy-types', v_cat_id, 4),
    ('Medication Basics', 'medication-basics', v_cat_id, 5),
    ('Finding a Therapist', 'finding-therapist', v_cat_id, 6),
    ('What to Expect', 'what-to-expect', v_cat_id, 7)
  ON CONFLICT (slug, category_id) DO NOTHING;

  -- 10. Workplace & Academic
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'workplace-academic';
  INSERT INTO public.article_subcategories (name, slug, category_id, display_order) VALUES
    ('Burnout', 'burnout', v_cat_id, 1),
    ('Work-Life Balance', 'work-life-balance', v_cat_id, 2),
    ('Academic Pressure', 'academic-pressure', v_cat_id, 3),
    ('Career Transitions', 'career-transitions', v_cat_id, 4),
    ('Workplace Bullying', 'workplace-bullying', v_cat_id, 5),
    ('Remote Work Mental Health', 'remote-work', v_cat_id, 6)
  ON CONFLICT (slug, category_id) DO NOTHING;

  -- 11. Life Transitions & Crises
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'life-transitions';
  INSERT INTO public.article_subcategories (name, slug, category_id, display_order) VALUES
    ('Divorce', 'divorce', v_cat_id, 1),
    ('Bereavement', 'bereavement', v_cat_id, 2),
    ('Job Loss', 'job-loss', v_cat_id, 3),
    ('Retirement', 'retirement', v_cat_id, 4),
    ('Migration & Displacement', 'migration-displacement', v_cat_id, 5),
    ('Chronic Illness Adjustment', 'chronic-illness', v_cat_id, 6)
  ON CONFLICT (slug, category_id) DO NOTHING;

  -- 12. Children & Adolescents
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'children-adolescents';
  INSERT INTO public.article_subcategories (name, slug, category_id, display_order) VALUES
    ('Child Anxiety', 'child-anxiety', v_cat_id, 1),
    ('Teen Depression', 'teen-depression', v_cat_id, 2),
    ('Bullying', 'bullying', v_cat_id, 3),
    ('Screen Time & Digital Health', 'screen-time', v_cat_id, 4),
    ('Parenting Strategies', 'parenting-strategies', v_cat_id, 5),
    ('School Refusal', 'school-refusal', v_cat_id, 6)
  ON CONFLICT (slug, category_id) DO NOTHING;

  -- 13. Eating & Body
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'eating-body';
  INSERT INTO public.article_subcategories (name, slug, category_id, display_order) VALUES
    ('Anorexia Nervosa', 'anorexia', v_cat_id, 1),
    ('Bulimia Nervosa', 'bulimia', v_cat_id, 2),
    ('Binge Eating Disorder', 'binge-eating', v_cat_id, 3),
    ('Orthorexia', 'orthorexia', v_cat_id, 4),
    ('Body Dysmorphia', 'body-dysmorphia', v_cat_id, 5),
    ('Intuitive Eating', 'intuitive-eating', v_cat_id, 6),
    ('Recovery', 'eating-recovery', v_cat_id, 7)
  ON CONFLICT (slug, category_id) DO NOTHING;

  -- 14. OCD & Related
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'ocd-related';
  INSERT INTO public.article_subcategories (name, slug, category_id, display_order) VALUES
    ('OCD Types', 'ocd-types', v_cat_id, 1),
    ('Hoarding', 'hoarding', v_cat_id, 2),
    ('Trichotillomania', 'trichotillomania', v_cat_id, 3),
    ('Health Anxiety', 'health-anxiety', v_cat_id, 4),
    ('Perfectionism', 'perfectionism', v_cat_id, 5),
    ('OCD Treatment', 'ocd-treatment', v_cat_id, 6)
  ON CONFLICT (slug, category_id) DO NOTHING;

  -- 15. Global & Cultural Mental Health
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'global-cultural';
  INSERT INTO public.article_subcategories (name, slug, category_id, display_order) VALUES
    ('Stigma', 'stigma', v_cat_id, 1),
    ('Cultural Perspectives', 'cultural-perspectives', v_cat_id, 2),
    ('Refugee Mental Health', 'refugee-mental-health', v_cat_id, 3),
    ('Indigenous Healing', 'indigenous-healing', v_cat_id, 4),
    ('Religion & Mental Health', 'religion-mental-health', v_cat_id, 5),
    ('Global Disparities', 'global-disparities', v_cat_id, 6)
  ON CONFLICT (slug, category_id) DO NOTHING;
END $$;

-- ---------------------------------------------------------------------------
-- 10. Backfill — match existing articles.category (TEXT) to category_id
-- ---------------------------------------------------------------------------

UPDATE public.articles a
SET category_id = ac.id
FROM public.article_categories ac
WHERE LOWER(TRIM(a.category)) = LOWER(TRIM(ac.name))
  AND a.category_id IS NULL
  AND a.category IS NOT NULL;
