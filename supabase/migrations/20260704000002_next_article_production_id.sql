-- ============================================================
-- Race-free article production-id allocation
-- ============================================================
-- Date: 2026-07-04
--
-- Context:
--   generateArticleProductionId() built the next id (PSY-<prefix>-NNN) by
--   reading MAX(article_production_id) and adding 1, client-side. Two admins
--   creating articles in the same category concurrently both read the same max
--   and mint the same id (and the old error path returned a guaranteed-dup
--   '...-001'). The id is allocated before the article row is inserted, so a
--   lock around the read alone can't fix it — allocation must be durable at
--   allocation time. This RPC allocates from a per-prefix counter table with an
--   atomic UPDATE ... RETURNING (row lock serializes concurrent callers).
--
-- Authorization:
--   SECURITY DEFINER + is_admin() gate — article creation is admin-only, and
--   DEFINER lets the function own the counter table (RLS-denied to clients).
-- ============================================================

BEGIN;

CREATE TABLE IF NOT EXISTS public.article_production_id_counters (
  prefix text PRIMARY KEY,
  last_num integer NOT NULL DEFAULT 0
);

-- No direct client access; the SECURITY DEFINER function is the only writer.
ALTER TABLE public.article_production_id_counters ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.next_article_production_id(prefix_input text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  full_prefix text := 'PSY-' || prefix_input || '-';
  new_num integer;
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'not authorized';
  END IF;

  -- Seed the counter from the current max existing id the first time this
  -- prefix is used, so allocations never collide with pre-counter ids.
  INSERT INTO public.article_production_id_counters (prefix, last_num)
  VALUES (
    prefix_input,
    COALESCE((
      SELECT MAX(COALESCE(NULLIF(split_part(a.article_production_id, '-', 3), '')::integer, 0))
      FROM public.articles a
      WHERE a.article_production_id LIKE full_prefix || '%'
    ), 0)
  )
  ON CONFLICT (prefix) DO NOTHING;

  -- Atomic increment — the row lock serializes concurrent allocations.
  UPDATE public.article_production_id_counters
  SET last_num = last_num + 1
  WHERE prefix = prefix_input
  RETURNING last_num INTO new_num;

  RETURN full_prefix || lpad(new_num::text, 3, '0');
END;
$$;

REVOKE ALL ON FUNCTION public.next_article_production_id(text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.next_article_production_id(text) FROM anon;
GRANT EXECUTE ON FUNCTION public.next_article_production_id(text) TO authenticated;

COMMENT ON FUNCTION public.next_article_production_id(text) IS
  'Allocates the next PSY-<prefix>-NNN production id atomically from a counter '
  'table (seeded from the current max on first use). is_admin()-gated. Replaces '
  'a client-side read-max-then-add-1 that gave concurrent creates the same id.';

COMMIT;

NOTIFY pgrst, 'reload schema';

-- ============================================================
-- ROLLBACK (manual)
-- ============================================================
-- BEGIN;
-- DROP FUNCTION IF EXISTS public.next_article_production_id(text);
-- DROP TABLE IF EXISTS public.article_production_id_counters;
-- COMMIT;
-- NOTIFY pgrst, 'reload schema';
