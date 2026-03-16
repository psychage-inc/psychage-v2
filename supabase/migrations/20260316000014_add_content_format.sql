-- Add content_format column to distinguish markdown vs HTML article content
ALTER TABLE public.articles
  ADD COLUMN IF NOT EXISTS content_format TEXT DEFAULT 'markdown'
  CHECK (content_format IN ('markdown', 'html'));
