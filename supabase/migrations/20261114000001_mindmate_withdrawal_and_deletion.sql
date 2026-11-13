-- =============================================================================
-- Compliance item 6 — MindMate withdrawal, conversation deletion, account
-- deletion. One server-side delete path, called by web and mobile.
--
-- 1. consent_log is the one consent store. MindMate consent uses it:
--    consent_type 'mindmate', `version` = the consent text version
--    (e.g. 'mm-consent-v1'), new `app_version`, `granted_at`, and `revoked_at`
--    as the withdrawal time.
-- 2. withdraw_mindmate_consent(): stamps revoked_at on the caller's active
--    MindMate consent. The server gate (item 5) then blocks MindMate.
-- 3. delete_mindmate_conversations(): hard-deletes the caller's conversations
--    and their messages. (No other derived MindMate rows exist: retrieval and
--    embeddings were removed, and no summaries or caches are stored
--    server-side.)
-- 4. Account deletion is immediate and hard:
--    - ai_conversations.user_id → ON DELETE CASCADE (was SET NULL, which left
--      conversations behind, unlinked).
--    - dsar_requests.user_id → nullable, keeping SET NULL, so the record of a
--      request survives the account (NOT NULL + SET NULL made deletion fail).
--    - delete_account() also removes MindMate conversations/messages,
--      navigator_saved_results, and writes an account_deletion_log row
--      (sha-256 of the user id, timestamp, scope).
--    - consent_log rows stay, unlinked (existing ON DELETE SET NULL), as the
--      record of what was agreed to.
-- =============================================================================

-- 1. consent_log: MindMate consent ------------------------------------------

ALTER TABLE public.consent_log ADD COLUMN IF NOT EXISTS app_version text;

ALTER TABLE public.consent_log DROP CONSTRAINT consent_log_consent_type_check;
ALTER TABLE public.consent_log ADD CONSTRAINT consent_log_consent_type_check
  CHECK (consent_type IN (
    'terms_of_service', 'privacy_policy', 'data_processing', 'newsletter',
    'analytics_cookies', 'ai_chat_history', 'clarity_score_tracking',
    'age_verification', 'toolkit_progress_sync', 'mindmate'
  ));

-- At most one active (non-withdrawn) MindMate consent per user.
CREATE UNIQUE INDEX IF NOT EXISTS consent_log_one_active_mindmate
  ON public.consent_log (user_id)
  WHERE consent_type = 'mindmate' AND revoked_at IS NULL;

-- 2. Withdrawal --------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.withdraw_mindmate_consent()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  uid uuid := auth.uid();
BEGIN
  IF uid IS NULL THEN
    RAISE EXCEPTION 'unauthorized: authenticated session required';
  END IF;

  UPDATE public.consent_log
  SET revoked_at = now()
  WHERE user_id = uid
    AND consent_type = 'mindmate'
    AND revoked_at IS NULL;
END;
$$;

REVOKE ALL ON FUNCTION public.withdraw_mindmate_consent() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.withdraw_mindmate_consent() TO authenticated;

-- 3. Delete all MindMate conversations ---------------------------------------

CREATE OR REPLACE FUNCTION public.delete_mindmate_conversations()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  uid uuid := auth.uid();
BEGIN
  IF uid IS NULL THEN
    RAISE EXCEPTION 'unauthorized: authenticated session required';
  END IF;

  DELETE FROM public.ai_messages
  WHERE conversation_id IN (SELECT id FROM public.ai_conversations WHERE user_id = uid);
  DELETE FROM public.ai_conversations WHERE user_id = uid;
END;
$$;

REVOKE ALL ON FUNCTION public.delete_mindmate_conversations() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.delete_mindmate_conversations() TO authenticated;

-- 4. Account deletion --------------------------------------------------------

ALTER TABLE public.ai_conversations DROP CONSTRAINT ai_conversations_user_id_fkey;
ALTER TABLE public.ai_conversations ADD CONSTRAINT ai_conversations_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.dsar_requests ALTER COLUMN user_id DROP NOT NULL;

CREATE TABLE IF NOT EXISTS public.account_deletion_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id_hash text NOT NULL,
  deleted_at timestamptz NOT NULL DEFAULT now(),
  scope text[] NOT NULL
);

-- Service-role only: RLS on, no policies.
ALTER TABLE public.account_deletion_log ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.delete_account()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth, pg_temp
AS $$
DECLARE
  uid uuid := auth.uid();
BEGIN
  -- fail closed: no authenticated session -> delete nothing
  IF uid IS NULL THEN
    RAISE EXCEPTION 'unauthorized: authenticated session required';
  END IF;

  -- MindMate conversations and their messages.
  DELETE FROM public.ai_messages
  WHERE conversation_id IN (SELECT id FROM public.ai_conversations WHERE user_id = uid);
  DELETE FROM public.ai_conversations WHERE user_id = uid;

  -- Health data and saved symptom summaries. share_history first (it
  -- FK-references therapist_links ON DELETE SET NULL).
  DELETE FROM public.share_history           WHERE user_id = uid;
  DELETE FROM public.therapist_links         WHERE user_id = uid;
  DELETE FROM public.journal_entries         WHERE user_id = uid;
  DELETE FROM public.navigator_history       WHERE user_id = uid;
  DELETE FROM public.navigator_saved_results WHERE user_id = uid;
  DELETE FROM public.check_ins               WHERE user_id = uid;
  DELETE FROM public.audit_events            WHERE user_id = uid;

  INSERT INTO public.account_deletion_log (user_id_hash, scope)
  VALUES (
    encode(sha256(convert_to(uid::text, 'UTF8')), 'hex'),
    ARRAY[
      'auth_user', 'profile', 'mindmate_conversations', 'mindmate_messages',
      'navigator_history', 'navigator_saved_results', 'share_history',
      'therapist_links', 'journal_entries', 'check_ins', 'audit_events',
      'all_cascading_user_data', 'consents_unlinked'
    ]
  );

  -- Hard, immediate account removal. ON DELETE CASCADE removes the remaining
  -- user-owned rows (profiles, mood, sleep, clarity, bookmarks, ...).
  DELETE FROM auth.users WHERE id = uid;
END;
$$;

REVOKE ALL ON FUNCTION public.delete_account() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.delete_account() TO authenticated;
