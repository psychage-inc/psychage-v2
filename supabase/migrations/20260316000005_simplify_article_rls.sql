-- ============================================================
-- Simplify article RLS — nuclear cleanup
-- ============================================================
-- The is_admin() / is_admin_writer() SECURITY DEFINER functions
-- are causing 500 errors on all article queries. Drop them and
-- replace with simple inline policies.
-- ============================================================

-- 1. Drop the SECURITY DEFINER functions (CASCADE drops policies that use them)
DROP FUNCTION IF EXISTS public.is_admin() CASCADE;
DROP FUNCTION IF EXISTS public.is_admin_writer() CASCADE;

-- 2. Drop any remaining custom policies
DROP POLICY IF EXISTS "Admin read articles" ON public.articles;
DROP POLICY IF EXISTS "Admin write articles" ON public.articles;
DROP POLICY IF EXISTS "Admin read articles jwt" ON public.articles;
DROP POLICY IF EXISTS "Public read published articles" ON public.articles;

DROP POLICY IF EXISTS "article_citations_admin_read" ON public.article_citations;
DROP POLICY IF EXISTS "article_citations_admin_write" ON public.article_citations;
DROP POLICY IF EXISTS "article_citations_admin_read_jwt" ON public.article_citations;
DROP POLICY IF EXISTS "article_citations_public_read" ON public.article_citations;

DROP POLICY IF EXISTS "Admin read article_comments" ON public.article_comments;
DROP POLICY IF EXISTS "Admin write article_comments" ON public.article_comments;

DROP POLICY IF EXISTS "Admin read article_images" ON public.article_images;
DROP POLICY IF EXISTS "Admin write article_images" ON public.article_images;

DROP POLICY IF EXISTS "Admin read article_status_history" ON public.article_status_history;
DROP POLICY IF EXISTS "Admin write article_status_history" ON public.article_status_history;

-- 3. Recreate simple policies — no function calls, just inline EXISTS

-- Articles: public can read published, admin can do everything
CREATE POLICY "Public read published articles" ON public.articles
  FOR SELECT USING (status = 'published');

CREATE POLICY "Admin full access articles" ON public.articles
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.admin_roles WHERE user_id = auth.uid())
  );

-- Article citations: public can read for published articles, admin full access
CREATE POLICY "Public read citations" ON public.article_citations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.articles
      WHERE articles.id = article_citations.article_id
        AND articles.status = 'published'
    )
  );

CREATE POLICY "Admin full access citations" ON public.article_citations
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.admin_roles WHERE user_id = auth.uid())
  );

-- Article comments: admin only
CREATE POLICY "Admin full access comments" ON public.article_comments
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.admin_roles WHERE user_id = auth.uid())
  );

-- Article images: admin only
CREATE POLICY "Admin full access images" ON public.article_images
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.admin_roles WHERE user_id = auth.uid())
  );

-- Article status history: admin only
CREATE POLICY "Admin full access status_history" ON public.article_status_history
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.admin_roles WHERE user_id = auth.uid())
  );

-- 4. Force PostgREST schema cache reload
NOTIFY pgrst, 'reload schema';
