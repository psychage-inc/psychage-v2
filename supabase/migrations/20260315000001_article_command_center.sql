-- ============================================================
-- Article Command Center
-- Supabase metadata layer for Sanity CMS articles
-- ============================================================

-- 1. Articles table (metadata synced with Sanity)
CREATE TABLE IF NOT EXISTS public.articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sanity_id TEXT UNIQUE,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'in_review', 'approved', 'rejected', 'published', 'paused', 'archived')),
  category TEXT,
  tags TEXT[] DEFAULT '{}',

  -- 4-dimension ratings (1.0–5.0)
  rating_accuracy NUMERIC(2,1) CHECK (rating_accuracy >= 1 AND rating_accuracy <= 5),
  rating_readability NUMERIC(2,1) CHECK (rating_readability >= 1 AND rating_readability <= 5),
  rating_completeness NUMERIC(2,1) CHECK (rating_completeness >= 1 AND rating_completeness <= 5),
  rating_sensitivity NUMERIC(2,1) CHECK (rating_sensitivity >= 1 AND rating_sensitivity <= 5),
  rating_overall NUMERIC(2,1),

  -- Reviewer assignment & approval
  assigned_reviewer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  assigned_reviewer_name TEXT,
  reviewed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  reviewed_by_name TEXT,
  reviewed_at TIMESTAMPTZ,
  rejection_reason TEXT,

  -- Topic cluster (self-referencing for article breakdown)
  parent_article_id UUID REFERENCES public.articles(id) ON DELETE SET NULL,
  cluster_order INTEGER DEFAULT 0,
  is_parent BOOLEAN DEFAULT FALSE,

  -- Performance metrics (populated by analytics sync)
  view_count INTEGER DEFAULT 0,
  avg_read_time_seconds INTEGER,
  word_count INTEGER DEFAULT 0,

  -- Authorship
  author_name TEXT,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,

  -- Sync tracking
  sanity_last_synced_at TIMESTAMPTZ,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ
);

-- Backfill columns that may be missing if the table was created by an earlier migration
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS sanity_id TEXT;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'draft';
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS rating_accuracy NUMERIC(2,1);
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS rating_readability NUMERIC(2,1);
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS rating_completeness NUMERIC(2,1);
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS rating_sensitivity NUMERIC(2,1);
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS rating_overall NUMERIC(2,1);
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS assigned_reviewer_id UUID;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS assigned_reviewer_name TEXT;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS reviewed_by UUID;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS reviewed_by_name TEXT;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS reviewed_at TIMESTAMPTZ;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS rejection_reason TEXT;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS parent_article_id UUID;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS cluster_order INTEGER DEFAULT 0;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS is_parent BOOLEAN DEFAULT FALSE;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS avg_read_time_seconds INTEGER;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS word_count INTEGER DEFAULT 0;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS author_name TEXT;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS created_by UUID;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS sanity_last_synced_at TIMESTAMPTZ;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS idx_articles_status ON public.articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_sanity_id ON public.articles(sanity_id);
CREATE INDEX IF NOT EXISTS idx_articles_parent ON public.articles(parent_article_id);
CREATE INDEX IF NOT EXISTS idx_articles_category ON public.articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_created ON public.articles(created_at DESC);

-- 2. Article comments (review thread)
CREATE TABLE IF NOT EXISTS public.article_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  parent_comment_id UUID REFERENCES public.article_comments(id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  severity TEXT NOT NULL DEFAULT 'suggestion'
    CHECK (severity IN ('suggestion', 'needs_fix', 'critical')),
  section_reference TEXT,
  is_resolved BOOLEAN DEFAULT FALSE,
  resolved_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_article_comments_article ON public.article_comments(article_id);
CREATE INDEX IF NOT EXISTS idx_article_comments_severity ON public.article_comments(severity);

-- 3. Article images (Supabase Storage references)
CREATE TABLE IF NOT EXISTS public.article_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  storage_path TEXT NOT NULL,
  public_url TEXT NOT NULL,
  original_filename TEXT,
  purpose TEXT NOT NULL DEFAULT 'inline'
    CHECK (purpose IN ('hero', 'inline', 'infographic', 'thumbnail')),
  alt_text TEXT,
  caption TEXT,
  width INTEGER,
  height INTEGER,
  size_bytes INTEGER,
  mime_type TEXT,
  sort_order INTEGER DEFAULT 0,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  uploaded_by_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_article_images_article ON public.article_images(article_id);

-- 4. Article status history (audit timeline)
CREATE TABLE IF NOT EXISTS public.article_status_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  from_status TEXT,
  to_status TEXT NOT NULL,
  changed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  changed_by_name TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_article_status_history_article ON public.article_status_history(article_id);
CREATE INDEX IF NOT EXISTS idx_article_status_history_created ON public.article_status_history(created_at DESC);

-- 5. RLS policies
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_status_history ENABLE ROW LEVEL SECURITY;

-- Admin read/write policies (same pattern as existing admin tables)
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin read articles' AND tablename = 'articles') THEN
    CREATE POLICY "Admin read articles" ON public.articles FOR SELECT
      USING (EXISTS (SELECT 1 FROM public.admin_roles WHERE user_id = auth.uid()));
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin write articles' AND tablename = 'articles') THEN
    CREATE POLICY "Admin write articles" ON public.articles FOR ALL
      USING (EXISTS (SELECT 1 FROM public.admin_roles WHERE user_id = auth.uid() AND role IN ('super_admin', 'clinical_admin')));
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin read article_comments' AND tablename = 'article_comments') THEN
    CREATE POLICY "Admin read article_comments" ON public.article_comments FOR SELECT
      USING (EXISTS (SELECT 1 FROM public.admin_roles WHERE user_id = auth.uid()));
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin write article_comments' AND tablename = 'article_comments') THEN
    CREATE POLICY "Admin write article_comments" ON public.article_comments FOR ALL
      USING (EXISTS (SELECT 1 FROM public.admin_roles WHERE user_id = auth.uid()));
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin read article_images' AND tablename = 'article_images') THEN
    CREATE POLICY "Admin read article_images" ON public.article_images FOR SELECT
      USING (EXISTS (SELECT 1 FROM public.admin_roles WHERE user_id = auth.uid()));
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin write article_images' AND tablename = 'article_images') THEN
    CREATE POLICY "Admin write article_images" ON public.article_images FOR ALL
      USING (EXISTS (SELECT 1 FROM public.admin_roles WHERE user_id = auth.uid() AND role IN ('super_admin', 'clinical_admin')));
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin read article_status_history' AND tablename = 'article_status_history') THEN
    CREATE POLICY "Admin read article_status_history" ON public.article_status_history FOR SELECT
      USING (EXISTS (SELECT 1 FROM public.admin_roles WHERE user_id = auth.uid()));
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin write article_status_history' AND tablename = 'article_status_history') THEN
    CREATE POLICY "Admin write article_status_history" ON public.article_status_history FOR ALL
      USING (EXISTS (SELECT 1 FROM public.admin_roles WHERE user_id = auth.uid()));
  END IF;
END $$;

-- 6. Storage bucket for article images
INSERT INTO storage.buckets (id, name, public)
VALUES ('article-images', 'article-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin upload article images' AND tablename = 'objects') THEN
    CREATE POLICY "Admin upload article images" ON storage.objects FOR INSERT
      WITH CHECK (bucket_id = 'article-images' AND EXISTS (SELECT 1 FROM public.admin_roles WHERE user_id = auth.uid()));
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin delete article images' AND tablename = 'objects') THEN
    CREATE POLICY "Admin delete article images" ON storage.objects FOR DELETE
      USING (bucket_id = 'article-images' AND EXISTS (SELECT 1 FROM public.admin_roles WHERE user_id = auth.uid()));
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read article images' AND tablename = 'objects') THEN
    CREATE POLICY "Public read article images" ON storage.objects FOR SELECT
      USING (bucket_id = 'article-images');
  END IF;
END $$;

-- 7. Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS articles_updated_at ON public.articles;
CREATE TRIGGER articles_updated_at
  BEFORE UPDATE ON public.articles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS article_comments_updated_at ON public.article_comments;
CREATE TRIGGER article_comments_updated_at
  BEFORE UPDATE ON public.article_comments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
