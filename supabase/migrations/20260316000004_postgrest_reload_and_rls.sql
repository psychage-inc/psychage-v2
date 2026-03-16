-- ============================================================
-- Fix: PostgREST schema cache reload + direct JWT RLS policies
-- ============================================================
-- Problem: After multiple schema migrations (new columns on articles,
-- new tables), PostgREST's cached schema may be stale. Queries like
-- .select('*').order('updated_at') fail if PostgREST doesn't know
-- about recently-added columns. The catch block in getArticles()
-- silently swallows the error and returns mock data.
--
-- Fix:
-- 1. NOTIFY pgrst to reload the schema cache
-- 2. Add direct JWT-based RLS policies as belt-and-suspenders
-- 3. Re-seed admin_roles for any admin users
-- ============================================================

-- 1. Force PostgREST to reload schema cache
NOTIFY pgrst, 'reload schema';

-- 2. Direct JWT-based admin read policy for articles
--    Complements existing is_admin() policy — PostgreSQL OR-combines them.
DROP POLICY IF EXISTS "Admin read articles jwt" ON public.articles;
CREATE POLICY "Admin read articles jwt" ON public.articles
  FOR SELECT USING (
    (current_setting('request.jwt.claims', true)::jsonb -> 'user_metadata' ->> 'role') = 'admin'
  );

-- Same for article_citations
DROP POLICY IF EXISTS "article_citations_admin_read_jwt" ON public.article_citations;
CREATE POLICY "article_citations_admin_read_jwt" ON public.article_citations
  FOR SELECT USING (
    (current_setting('request.jwt.claims', true)::jsonb -> 'user_metadata' ->> 'role') = 'admin'
  );

-- 3. Re-seed admin_roles for any admin users created after last migration
INSERT INTO public.admin_roles (user_id, role)
SELECT id, 'super_admin'
FROM auth.users
WHERE raw_user_meta_data ->> 'role' = 'admin'
ON CONFLICT (user_id) DO NOTHING;

-- 4. Reload again after policy changes
NOTIFY pgrst, 'reload schema';
