-- ============================================================
-- Article taxonomy RLS policies — corrects 20260610000001 vs prod drift
-- ============================================================
-- Date: 2026-06-10
-- Severity: CRITICAL (completes P0-4) + HIGH (closes an articles read leak)
--
-- A production pre-flight on 2026-06-10 showed 20260610000001's policy
-- assumptions did NOT match the live database. 000001 ENABLEs RLS on all 8
-- article tables but relies on pre-existing policies that are partly absent /
-- over-broad in prod. This migration runs AFTER 000001 and reconciles them.
--
--   * articles carries an EXTRA permissive policy "Public can read articles"
--     USING (true), OR'd with "Public read published articles". RLS combines
--     permissive policies with OR, so with RLS now enabled anon would still
--     read DRAFT/ARCHIVED articles — defeating P0-4. Drop the over-broad one;
--     "Public read published articles" (status='published') remains.
--
--   * article_categories / article_subcategories had ZERO policies in prod
--     (000001's comment claimed a public_read USING(true) existed; it did not).
--     RLS-enable with no SELECT policy denies anon every row, breaking public
--     Learn navigation (categoryService.ts + articleService category embeds).
--     Add the public read policy 000001 assumed. These tables are read-only
--     from the client; writes happen via migrations / service_role (which
--     bypasses RLS), so no client write policy is required.
--
--   * article_derivatives had ZERO policies. RLS-enable denies the admin
--     management path (articleAdminService read/insert/update/delete). Add
--     admin read (is_admin()) + admin-writer write (is_admin_writer()),
--     mirroring the articles table's is_admin / is_admin_writer split.
--
-- Idempotent (DROP IF EXISTS before each CREATE). Reuses the canonical
-- public.is_admin() / public.is_admin_writer() helpers.
-- ============================================================

BEGIN;

-- 1. articles: remove the over-broad public-read leak; keep published-only.
DROP POLICY IF EXISTS "Public can read articles" ON public.articles;

-- 2. article_categories: public taxonomy — anon-readable.
DROP POLICY IF EXISTS "article_categories_public_read" ON public.article_categories;
CREATE POLICY "article_categories_public_read"
  ON public.article_categories
  FOR SELECT
  TO public
  USING (true);

-- 3. article_subcategories: public taxonomy — anon-readable.
DROP POLICY IF EXISTS "article_subcategories_public_read" ON public.article_subcategories;
CREATE POLICY "article_subcategories_public_read"
  ON public.article_subcategories
  FOR SELECT
  TO public
  USING (true);

-- 4. article_derivatives: admin-only (read + write).
DROP POLICY IF EXISTS "article_derivatives_admin_read" ON public.article_derivatives;
CREATE POLICY "article_derivatives_admin_read"
  ON public.article_derivatives
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

DROP POLICY IF EXISTS "article_derivatives_admin_write" ON public.article_derivatives;
CREATE POLICY "article_derivatives_admin_write"
  ON public.article_derivatives
  FOR ALL
  TO authenticated
  USING (public.is_admin_writer())
  WITH CHECK (public.is_admin_writer());

COMMIT;

-- ============================================================
-- VERIFICATION (post-apply, in shadow + prod)
--   anon  : SELECT on article_categories/subcategories succeeds;
--           SELECT on articles returns ONLY status='published'.
--   admin : SELECT/INSERT/UPDATE/DELETE on article_derivatives works.
-- ============================================================
