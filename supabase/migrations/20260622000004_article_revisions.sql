-- =============================================================================
-- Article revision history (server-side capture)
-- =============================================================================
-- A new article_revisions table + an AFTER UPDATE trigger on public.articles
-- that snapshots the PRIOR (OLD) title/content whenever the body or title
-- changes. Capture is server-side via a SECURITY DEFINER trigger, so it cannot
-- be bypassed or forged from the client. Expand-only: new table + new function
-- + new trigger; no existing object is altered.
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.article_revisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seq BIGINT GENERATED ALWAYS AS IDENTITY,
  article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  title TEXT,
  content TEXT,
  content_format TEXT,
  word_count INTEGER,
  editor_id UUID,
  editor_email TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- seq gives a strict, monotonic order even when several revisions share a
-- created_at (e.g. rapid autosaves within the same second).
CREATE INDEX IF NOT EXISTS idx_article_revisions_article
  ON public.article_revisions(article_id, seq DESC);

ALTER TABLE public.article_revisions ENABLE ROW LEVEL SECURITY;

-- Admins read history. is_admin() is SECURITY DEFINER over admin_roles (no recursion).
DROP POLICY IF EXISTS "article_revisions_admin_read" ON public.article_revisions;
CREATE POLICY "article_revisions_admin_read"
  ON public.article_revisions
  FOR SELECT
  USING (public.is_admin());

-- No client INSERT/UPDATE/DELETE policy: rows are written ONLY by the SECURITY
-- DEFINER trigger below, so revision capture cannot be bypassed or forged.

CREATE OR REPLACE FUNCTION public.log_article_revision()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Only snapshot when the editable body or title actually changed; metadata
  -- updates (status, tags, category, ratings) do not create revisions.
  IF NEW.content IS DISTINCT FROM OLD.content OR NEW.title IS DISTINCT FROM OLD.title THEN
    BEGIN
      INSERT INTO public.article_revisions
        (article_id, title, content, content_format, word_count, editor_id, editor_email)
      VALUES
        (OLD.id, OLD.title, OLD.content, OLD.content_format, OLD.word_count,
         auth.uid(),
         (SELECT u.email FROM auth.users u WHERE u.id = auth.uid()));
    EXCEPTION WHEN OTHERS THEN
      -- Never let revision capture break the article save itself.
      NULL;
    END;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS articles_capture_revision ON public.articles;
CREATE TRIGGER articles_capture_revision
  AFTER UPDATE ON public.articles
  FOR EACH ROW EXECUTE FUNCTION public.log_article_revision();

COMMENT ON TABLE public.article_revisions IS
  'Server-side snapshots of prior article title/content, written by the articles_capture_revision trigger on every body/title change. Admin-readable; client-unwritable.';
