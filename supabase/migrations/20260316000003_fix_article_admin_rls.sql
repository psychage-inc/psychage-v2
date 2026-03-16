-- ============================================================
-- Fix article admin RLS policies
-- ============================================================
-- Problem: Admin RLS policies on articles, article_citations,
-- article_comments, article_images, article_status_history only
-- check the admin_roles table. If a user has user_metadata.role='admin'
-- in their JWT but no admin_roles entry, RLS blocks all reads
-- and the frontend silently falls back to mock data.
--
-- Fix: Create a reusable is_admin() function that checks BOTH
-- the admin_roles table AND the JWT user_metadata, then update
-- all article-related RLS policies to use it.
-- This matches the pattern in 20260315100001_fix_admin_rls_recursion.sql.
-- ============================================================

-- 1. Create helper functions
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    EXISTS (SELECT 1 FROM public.admin_roles WHERE user_id = auth.uid())
    OR (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION public.is_admin_writer()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    EXISTS (
      SELECT 1 FROM public.admin_roles
      WHERE user_id = auth.uid()
        AND role IN ('super_admin', 'clinical_admin')
    )
    OR (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- 2. Fix articles table policies
DROP POLICY IF EXISTS "Admin read articles" ON public.articles;
CREATE POLICY "Admin read articles" ON public.articles
  FOR SELECT USING (public.is_admin());

DROP POLICY IF EXISTS "Admin write articles" ON public.articles;
CREATE POLICY "Admin write articles" ON public.articles
  FOR ALL USING (public.is_admin_writer());

-- 3. Fix article_citations policies
DROP POLICY IF EXISTS "article_citations_admin_read" ON public.article_citations;
CREATE POLICY "article_citations_admin_read" ON public.article_citations
  FOR SELECT USING (public.is_admin());

DROP POLICY IF EXISTS "article_citations_admin_write" ON public.article_citations;
CREATE POLICY "article_citations_admin_write" ON public.article_citations
  FOR ALL USING (public.is_admin_writer());

-- 4. Fix article_comments policies
DROP POLICY IF EXISTS "Admin read article_comments" ON public.article_comments;
CREATE POLICY "Admin read article_comments" ON public.article_comments
  FOR SELECT USING (public.is_admin());

DROP POLICY IF EXISTS "Admin write article_comments" ON public.article_comments;
CREATE POLICY "Admin write article_comments" ON public.article_comments
  FOR ALL USING (public.is_admin());

-- 5. Fix article_images policies
DROP POLICY IF EXISTS "Admin read article_images" ON public.article_images;
CREATE POLICY "Admin read article_images" ON public.article_images
  FOR SELECT USING (public.is_admin());

DROP POLICY IF EXISTS "Admin write article_images" ON public.article_images;
CREATE POLICY "Admin write article_images" ON public.article_images
  FOR ALL USING (public.is_admin_writer());

-- 6. Fix article_status_history policies
DROP POLICY IF EXISTS "Admin read article_status_history" ON public.article_status_history;
CREATE POLICY "Admin read article_status_history" ON public.article_status_history
  FOR SELECT USING (public.is_admin());

DROP POLICY IF EXISTS "Admin write article_status_history" ON public.article_status_history;
CREATE POLICY "Admin write article_status_history" ON public.article_status_history
  FOR ALL USING (public.is_admin());

-- 7. Fix storage policies for article images
DROP POLICY IF EXISTS "Admin upload article images" ON storage.objects;
CREATE POLICY "Admin upload article images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'article-images' AND public.is_admin());

DROP POLICY IF EXISTS "Admin delete article images" ON storage.objects;
CREATE POLICY "Admin delete article images" ON storage.objects
  FOR DELETE USING (bucket_id = 'article-images' AND public.is_admin());

-- 8. Also seed an admin_roles entry for any existing admin users
-- so future non-JWT policies also work
INSERT INTO public.admin_roles (user_id, role)
SELECT id, 'super_admin'
FROM auth.users
WHERE raw_user_meta_data ->> 'role' = 'admin'
ON CONFLICT (user_id) DO NOTHING;
