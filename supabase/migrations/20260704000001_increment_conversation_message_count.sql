-- ============================================================
-- Atomic conversation message-count increment
-- ============================================================
-- Date: 2026-07-04
--
-- Context:
--   chatPersistenceService.saveMessage bumped ai_conversations.message_count
--   with a read-modify-write (SELECT message_count, then UPDATE count + 1).
--   MindMate fires the user + assistant saves fire-and-forget, so two
--   concurrent saves both read N and both write N + 1 — increments are lost
--   and the count drifts below the true message total. This RPC performs the
--   increment (and the last_message_at bump) in a single atomic UPDATE, which
--   takes a row lock so concurrent calls serialize with no lost increment.
--
-- Authorization:
--   SECURITY INVOKER (default) so the existing ai_conversations RLS applies
--   unchanged — an authenticated user can only touch their own conversation
--   (auth.uid() = user_id); anonymous conversations are service-role managed,
--   exactly as the previous inline UPDATE behaved.
-- ============================================================

BEGIN;

CREATE OR REPLACE FUNCTION public.increment_conversation_message_count(conversation_id_input uuid)
RETURNS void
LANGUAGE sql
SET search_path = ''
AS $$
  UPDATE public.ai_conversations
  SET message_count = message_count + 1,
      last_message_at = now()
  WHERE id = conversation_id_input;
$$;

GRANT EXECUTE ON FUNCTION public.increment_conversation_message_count(uuid) TO anon;
GRANT EXECUTE ON FUNCTION public.increment_conversation_message_count(uuid) TO authenticated;

COMMENT ON FUNCTION public.increment_conversation_message_count(uuid) IS
  'Atomically increments ai_conversations.message_count and bumps last_message_at '
  'for one conversation. SECURITY INVOKER so existing RLS gates the write. '
  'Replaces a read-modify-write that lost increments under concurrent saves.';

COMMIT;

NOTIFY pgrst, 'reload schema';

-- ============================================================
-- ROLLBACK (manual)
-- ============================================================
-- BEGIN;
-- DROP FUNCTION IF EXISTS public.increment_conversation_message_count(uuid);
-- COMMIT;
-- NOTIFY pgrst, 'reload schema';
