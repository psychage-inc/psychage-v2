-- ============================================================
-- JWT-only article RLS — break infinite recursion
-- ============================================================
-- Error: "infinite recursion detected in policy for relation 'users'"
-- Cause: article policy → admin_roles subquery → admin_roles RLS
--        → users table RLS → recurses back
-- Fix: use JWT claims directly — no table queries, no recursion.
-- ============================================================

-- 1. Drop all existing article-related policies
DROP POLICY IF EXISTS "Public read published articles" ON public.articles;
DROP POLICY IF EXISTS "Admin full access articles" ON public.articles;

DROP POLICY IF EXISTS "Public read citations" ON public.article_citations;
DROP POLICY IF EXISTS "Admin full access citations" ON public.article_citations;

DROP POLICY IF EXISTS "Admin full access comments" ON public.article_comments;
DROP POLICY IF EXISTS "Admin full access images" ON public.article_images;
DROP POLICY IF EXISTS "Admin full access status_history" ON public.article_status_history;

-- 2. Recreate with JWT-only admin checks (zero table queries)

-- Articles
CREATE POLICY "Public read published articles" ON public.articles
  FOR SELECT USING (status = 'published');

CREATE POLICY "Admin full access articles" ON public.articles
  FOR ALL USING (
    coalesce(
      current_setting('request.jwt.claims', true)::jsonb -> 'user_metadata' ->> 'role',
      ''
    ) = 'admin'
  );

-- Article citations
CREATE POLICY "Public read published citations" ON public.article_citations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.articles
      WHERE articles.id = article_citations.article_id
        AND articles.status = 'published'
    )
  );

CREATE POLICY "Admin full access citations" ON public.article_citations
  FOR ALL USING (
    coalesce(
      current_setting('request.jwt.claims', true)::jsonb -> 'user_metadata' ->> 'role',
      ''
    ) = 'admin'
  );

-- Article comments
CREATE POLICY "Admin full access comments" ON public.article_comments
  FOR ALL USING (
    coalesce(
      current_setting('request.jwt.claims', true)::jsonb -> 'user_metadata' ->> 'role',
      ''
    ) = 'admin'
  );

-- Article images
CREATE POLICY "Admin full access images" ON public.article_images
  FOR ALL USING (
    coalesce(
      current_setting('request.jwt.claims', true)::jsonb -> 'user_metadata' ->> 'role',
      ''
    ) = 'admin'
  );

-- Article status history
CREATE POLICY "Admin full access status_history" ON public.article_status_history
  FOR ALL USING (
    coalesce(
      current_setting('request.jwt.claims', true)::jsonb -> 'user_metadata' ->> 'role',
      ''
    ) = 'admin'
  );

-- 3. Reload PostgREST schema cache
NOTIFY pgrst, 'reload schema';
