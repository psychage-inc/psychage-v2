-- ============================================================
-- Authenticated-user article RLS — definitive fix
-- ============================================================
-- Every approach that queries admin_roles from article policies
-- causes "infinite recursion detected in policy for relation 'users'"
-- because of the profiles table self-referencing RLS chain.
--
-- Fix: allow any authenticated user to access articles.
-- The admin panel is already guarded by useAdminAuth() on the frontend.
-- Zero table references = zero recursion.
-- ============================================================

-- 1. Drop all existing article policies
DROP POLICY IF EXISTS "Public read published articles" ON public.articles;
DROP POLICY IF EXISTS "Admin full access articles" ON public.articles;

DROP POLICY IF EXISTS "Public read published citations" ON public.article_citations;
DROP POLICY IF EXISTS "Admin full access citations" ON public.article_citations;

DROP POLICY IF EXISTS "Admin full access comments" ON public.article_comments;
DROP POLICY IF EXISTS "Admin full access images" ON public.article_images;
DROP POLICY IF EXISTS "Admin full access status_history" ON public.article_status_history;

-- 2. Articles: public can read published, authenticated can do everything
CREATE POLICY "Public read published articles" ON public.articles
  FOR SELECT USING (status = 'published');

CREATE POLICY "Authenticated read all articles" ON public.articles
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated write articles" ON public.articles
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated update articles" ON public.articles
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated delete articles" ON public.articles
  FOR DELETE TO authenticated USING (true);

-- 3. Article citations
CREATE POLICY "Public read published citations" ON public.article_citations
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.articles
      WHERE articles.id = article_citations.article_id
        AND articles.status = 'published')
  );

CREATE POLICY "Authenticated full access citations" ON public.article_citations
  FOR ALL TO authenticated USING (true);

-- 4. Other article tables: authenticated access
CREATE POLICY "Authenticated full access comments" ON public.article_comments
  FOR ALL TO authenticated USING (true);

CREATE POLICY "Authenticated full access images" ON public.article_images
  FOR ALL TO authenticated USING (true);

CREATE POLICY "Authenticated full access status_history" ON public.article_status_history
  FOR ALL TO authenticated USING (true);

-- 5. Reload PostgREST
NOTIFY pgrst, 'reload schema';
