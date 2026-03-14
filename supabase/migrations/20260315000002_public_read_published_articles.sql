-- Allow public (unauthenticated) users to read only published articles.
-- This restores the Supabase fallback in the 3-tier cascade
-- (Sanity → Supabase → mock) for non-admin users, while ensuring
-- only approved/published content is visible.
--
-- Existing admin policies remain unchanged — admins still see all statuses.

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read published articles' AND tablename = 'articles') THEN
    CREATE POLICY "Public read published articles" ON public.articles
      FOR SELECT
      USING (status = 'published');
  END IF;
END $$;
