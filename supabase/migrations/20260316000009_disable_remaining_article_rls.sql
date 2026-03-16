-- ============================================================
-- Disable RLS on article_categories, article_subcategories,
-- and article_derivatives — companion to migration 008
-- ============================================================
-- These tables also have FOR ALL policies referencing admin_roles,
-- which triggers the same "infinite recursion detected in policy
-- for relation 'users'" error chain. PostgreSQL evaluates ALL
-- applicable policies (including FOR ALL on SELECT), so even
-- the USING(true) SELECT policy doesn't prevent the recursion.
--
-- Categories/subcategories are public reference data.
-- Derivatives are editorial content. Both are safe with RLS off.
-- ============================================================

-- Drop all policies on article_categories
DROP POLICY IF EXISTS "public_read_categories" ON public.article_categories;
DROP POLICY IF EXISTS "admin_write_categories" ON public.article_categories;

-- Drop all policies on article_subcategories
DROP POLICY IF EXISTS "public_read_subcategories" ON public.article_subcategories;
DROP POLICY IF EXISTS "admin_write_subcategories" ON public.article_subcategories;

-- Drop all policies on article_derivatives
DROP POLICY IF EXISTS "admin_read_derivatives" ON public.article_derivatives;
DROP POLICY IF EXISTS "admin_write_derivatives" ON public.article_derivatives;

-- Disable RLS entirely
ALTER TABLE public.article_categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_subcategories DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_derivatives DISABLE ROW LEVEL SECURITY;

-- Reload PostgREST
NOTIFY pgrst, 'reload schema';
