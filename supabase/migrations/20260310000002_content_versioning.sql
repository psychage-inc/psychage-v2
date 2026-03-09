-- ============================================================
-- Content Management Tables
-- content_documents (if not exists) + content_versions
-- ============================================================

-- Ensure content_documents table exists
CREATE TABLE IF NOT EXISTS content_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL DEFAULT 'article' CHECK (type IN ('article', 'guide', 'faq', 'glossary', 'video_transcript', 'infographic')),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content_body TEXT DEFAULT '',
  summary TEXT DEFAULT '',
  author TEXT DEFAULT 'Dr. Lena Dobson',
  language TEXT DEFAULT 'en' CHECK (language IN ('en', 'es', 'fr', 'ar', 'zh')),
  condition_tags TEXT[] DEFAULT '{}',
  topic_tags TEXT[] DEFAULT '{}',
  sources JSONB DEFAULT '[]',
  is_published BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'in_review', 'published')),
  last_reviewed TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Content versioning
CREATE TABLE IF NOT EXISTS content_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID REFERENCES content_documents(id) ON DELETE CASCADE,
  version_number INTEGER NOT NULL,
  content_snapshot JSONB NOT NULL,
  changed_by UUID REFERENCES auth.users(id),
  change_summary TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_content_versions_doc ON content_versions(document_id, version_number DESC);
CREATE INDEX IF NOT EXISTS idx_content_documents_slug ON content_documents(slug);
CREATE INDEX IF NOT EXISTS idx_content_documents_status ON content_documents(status, is_published);

-- RLS
ALTER TABLE content_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_versions ENABLE ROW LEVEL SECURITY;

-- Public can read published content
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'public_content_read' AND tablename = 'content_documents') THEN
    CREATE POLICY "public_content_read" ON content_documents
      FOR SELECT USING (is_published = true);
  END IF;
END $$;

-- Admins can do everything with content
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'admin_content_all' AND tablename = 'content_documents') THEN
    CREATE POLICY "admin_content_all" ON content_documents
      FOR ALL USING (
        EXISTS (SELECT 1 FROM admin_roles ar WHERE ar.user_id = auth.uid() AND ar.role IN ('super_admin', 'clinical_admin'))
      );
  END IF;
END $$;

-- Admins can read versions
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'admin_versions_read' AND tablename = 'content_versions') THEN
    CREATE POLICY "admin_versions_read" ON content_versions
      FOR SELECT USING (
        EXISTS (SELECT 1 FROM admin_roles ar WHERE ar.user_id = auth.uid())
      );
  END IF;
END $$;

-- Admins can write versions
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'admin_versions_write' AND tablename = 'content_versions') THEN
    CREATE POLICY "admin_versions_write" ON content_versions
      FOR INSERT WITH CHECK (
        EXISTS (SELECT 1 FROM admin_roles ar WHERE ar.user_id = auth.uid() AND ar.role IN ('super_admin', 'clinical_admin'))
      );
  END IF;
END $$;
