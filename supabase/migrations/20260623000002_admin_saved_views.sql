-- =============================================================================
-- admin_saved_views: per-admin saved article search/filter presets
-- =============================================================================
-- Lets an admin save the current Article List filter + search combo as a named
-- view and re-apply it later. Owner-scoped RLS (mirrors public.bookmarks): each
-- user sees, creates and deletes only their own rows — one admin never sees
-- another admin's views. Expand-only.
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.admin_saved_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  filters JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_admin_saved_views_user
  ON public.admin_saved_views(user_id);

ALTER TABLE public.admin_saved_views ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Owner select saved views" ON public.admin_saved_views;
CREATE POLICY "Owner select saved views"
  ON public.admin_saved_views
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Owner insert saved views" ON public.admin_saved_views;
CREATE POLICY "Owner insert saved views"
  ON public.admin_saved_views
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Owner delete saved views" ON public.admin_saved_views;
CREATE POLICY "Owner delete saved views"
  ON public.admin_saved_views
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

COMMENT ON TABLE public.admin_saved_views IS
  'Per-admin saved article filter/search presets. Owner-scoped RLS; no admin '
  'override so one admin cannot see another admin''s saved views.';
