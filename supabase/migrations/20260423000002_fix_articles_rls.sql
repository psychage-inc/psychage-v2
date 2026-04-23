-- ============================================================
-- AUTH-002 fix: replace USING(true) article RLS with admin gating
-- ============================================================
-- Date: 2026-04-23
-- Severity: CRITICAL
-- Audit: docs/audits/auth-audit-2026-04-23.md (AUTH-002),
--        docs/audits/auth-audit-2026-04-23-addendum.md (§H.1)
--
-- 20260316000007_auth_user_article_rls.sql gave any authenticated user
-- INSERT/UPDATE/DELETE access to articles, article_citations,
-- article_comments, article_images, article_status_history. The original
-- comment justified this with "the admin panel is already guarded by
-- useAdminAuth() on the frontend" — but the frontend is not the trust
-- boundary. The shipped VITE_SUPABASE_ANON_KEY lets any patient account
-- destroy the article corpus directly via the JS client.
--
-- This migration replaces those policies with policies that gate on
-- public.is_admin_writer() — the recursion-safe SECURITY DEFINER function
-- defined in 20260423000001_harden_admin_role_checks.sql.
--
-- Read access is preserved exactly:
--   - articles: public can read status='published' (anonymous + auth)
--   - articles: admins can read all
--   - article_citations: public can read citations of published articles
--   - all other tables: admin-only read (admin tooling tables)
--
-- Recursion analysis (per addendum §H.1):
--   is_admin_writer() runs as SECURITY DEFINER with SET search_path=''.
--   The body queries admin_roles, but RLS on admin_roles is bypassed
--   because the function runs as its owner. Net: zero recursion chain.
--
-- Rollback SQL is in trailing comment.
-- ============================================================

BEGIN;

-- ------------------------------------------------------------
-- 1. Drop the permissive policies from 20260316000007
-- ------------------------------------------------------------
DROP POLICY IF EXISTS "Authenticated read all articles"        ON public.articles;
DROP POLICY IF EXISTS "Authenticated write articles"           ON public.articles;
DROP POLICY IF EXISTS "Authenticated update articles"          ON public.articles;
DROP POLICY IF EXISTS "Authenticated delete articles"          ON public.articles;
DROP POLICY IF EXISTS "Authenticated full access citations"    ON public.article_citations;
DROP POLICY IF EXISTS "Authenticated full access comments"     ON public.article_comments;
DROP POLICY IF EXISTS "Authenticated full access images"       ON public.article_images;
DROP POLICY IF EXISTS "Authenticated full access status_history" ON public.article_status_history;

-- Also drop any older admin policies that may shadow what we recreate.
DROP POLICY IF EXISTS "Admin read articles"                    ON public.articles;
DROP POLICY IF EXISTS "Admin write articles"                   ON public.articles;
DROP POLICY IF EXISTS "Admin full access articles"             ON public.articles;
DROP POLICY IF EXISTS "article_citations_admin_read"           ON public.article_citations;
DROP POLICY IF EXISTS "article_citations_admin_write"          ON public.article_citations;
DROP POLICY IF EXISTS "Admin read article_comments"            ON public.article_comments;
DROP POLICY IF EXISTS "Admin write article_comments"           ON public.article_comments;
DROP POLICY IF EXISTS "Admin read article_images"              ON public.article_images;
DROP POLICY IF EXISTS "Admin write article_images"             ON public.article_images;
DROP POLICY IF EXISTS "Admin read article_status_history"      ON public.article_status_history;
DROP POLICY IF EXISTS "Admin write article_status_history"     ON public.article_status_history;

-- ------------------------------------------------------------
-- 2. articles
-- ------------------------------------------------------------
-- Public read of published articles (preserved from 20260316000007).
DROP POLICY IF EXISTS "Public read published articles" ON public.articles;
CREATE POLICY "Public read published articles" ON public.articles
  FOR SELECT
  USING (status = 'published');

-- Admins (any granular role) read all rows including drafts.
CREATE POLICY "articles_admin_read" ON public.articles
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- Admin writers (super_admin, clinical_admin) write/update/delete.
CREATE POLICY "articles_admin_write" ON public.articles
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin_writer());

CREATE POLICY "articles_admin_update" ON public.articles
  FOR UPDATE
  TO authenticated
  USING (public.is_admin_writer())
  WITH CHECK (public.is_admin_writer());

CREATE POLICY "articles_admin_delete" ON public.articles
  FOR DELETE
  TO authenticated
  USING (public.is_admin_writer());

-- ------------------------------------------------------------
-- 3. article_citations
-- ------------------------------------------------------------
-- Public can read citations attached to published articles (preserved).
DROP POLICY IF EXISTS "Public read published citations" ON public.article_citations;
CREATE POLICY "Public read published citations" ON public.article_citations
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.articles
      WHERE articles.id = article_citations.article_id
        AND articles.status = 'published'
    )
  );

-- Admins read all citations.
CREATE POLICY "article_citations_admin_read" ON public.article_citations
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- Admin writers manage citations.
CREATE POLICY "article_citations_admin_write" ON public.article_citations
  FOR ALL
  TO authenticated
  USING (public.is_admin_writer())
  WITH CHECK (public.is_admin_writer());

-- ------------------------------------------------------------
-- 4. article_comments — admin-only for now
-- ------------------------------------------------------------
-- Future user-comment rollout requires a separate INSERT policy gated
-- on auth.uid() = user_id (with author/owner update/delete). This
-- hotfix preserves admin-only access — that's the table's current use.
CREATE POLICY "article_comments_admin_read" ON public.article_comments
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

CREATE POLICY "article_comments_admin_write" ON public.article_comments
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ------------------------------------------------------------
-- 5. article_images — admin-only
-- ------------------------------------------------------------
CREATE POLICY "article_images_admin_read" ON public.article_images
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

CREATE POLICY "article_images_admin_write" ON public.article_images
  FOR ALL
  TO authenticated
  USING (public.is_admin_writer())
  WITH CHECK (public.is_admin_writer());

-- ------------------------------------------------------------
-- 6. article_status_history — admin-only, append-only via app code
-- ------------------------------------------------------------
CREATE POLICY "article_status_history_admin_read" ON public.article_status_history
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

CREATE POLICY "article_status_history_admin_write" ON public.article_status_history
  FOR ALL
  TO authenticated
  USING (public.is_admin_writer())
  WITH CHECK (public.is_admin_writer());

COMMIT;

NOTIFY pgrst, 'reload schema';

-- ============================================================
-- ROLLBACK
-- ============================================================
--
-- BEGIN;
-- -- Drop the new admin-gated policies
-- DROP POLICY IF EXISTS "articles_admin_read"                ON public.articles;
-- DROP POLICY IF EXISTS "articles_admin_write"               ON public.articles;
-- DROP POLICY IF EXISTS "articles_admin_update"              ON public.articles;
-- DROP POLICY IF EXISTS "articles_admin_delete"              ON public.articles;
-- DROP POLICY IF EXISTS "article_citations_admin_read"       ON public.article_citations;
-- DROP POLICY IF EXISTS "article_citations_admin_write"      ON public.article_citations;
-- DROP POLICY IF EXISTS "article_comments_admin_read"        ON public.article_comments;
-- DROP POLICY IF EXISTS "article_comments_admin_write"       ON public.article_comments;
-- DROP POLICY IF EXISTS "article_images_admin_read"          ON public.article_images;
-- DROP POLICY IF EXISTS "article_images_admin_write"         ON public.article_images;
-- DROP POLICY IF EXISTS "article_status_history_admin_read"  ON public.article_status_history;
-- DROP POLICY IF EXISTS "article_status_history_admin_write" ON public.article_status_history;
--
-- -- Recreate the (insecure) USING(true) policies from 20260316000007:
-- CREATE POLICY "Authenticated read all articles" ON public.articles
--   FOR SELECT TO authenticated USING (true);
-- CREATE POLICY "Authenticated write articles" ON public.articles
--   FOR INSERT TO authenticated WITH CHECK (true);
-- CREATE POLICY "Authenticated update articles" ON public.articles
--   FOR UPDATE TO authenticated USING (true);
-- CREATE POLICY "Authenticated delete articles" ON public.articles
--   FOR DELETE TO authenticated USING (true);
-- CREATE POLICY "Authenticated full access citations" ON public.article_citations
--   FOR ALL TO authenticated USING (true);
-- CREATE POLICY "Authenticated full access comments" ON public.article_comments
--   FOR ALL TO authenticated USING (true);
-- CREATE POLICY "Authenticated full access images" ON public.article_images
--   FOR ALL TO authenticated USING (true);
-- CREATE POLICY "Authenticated full access status_history" ON public.article_status_history
--   FOR ALL TO authenticated USING (true);
-- COMMIT;
-- NOTIFY pgrst, 'reload schema';
