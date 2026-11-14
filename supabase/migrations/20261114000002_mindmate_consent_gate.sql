-- =============================================================================
-- Compliance item 5 — MindMate consent, recorded in consent_log and enforced
-- by the server.
--
-- 1. mindmate_consent_version() is the one constant for the current consent
--    text version. Bumping it makes every existing consent "outdated", which
--    forces re-consent: the server gate rejects outdated consents.
-- 2. grant_mindmate_consent(p_version, p_app_version) records the caller's
--    consent. It throws unless p_version is the current version (the client
--    must have shown the current text) and p_app_version is set. A consent
--    to an older version still active for the caller is closed (revoked_at)
--    first, so at most one consent is active (consent_log_one_active_mindmate,
--    item 6).
-- 3. mindmate_consent_status() tells the signed-in client which screen to
--    show: 'current' (chat), 'outdated' (re-consent), 'none' (consent).
-- 4. has_current_mindmate_consent(p_user_id) is the server gate used by
--    api/ai/chat.ts with the service role. Not callable by clients.
-- =============================================================================

CREATE OR REPLACE FUNCTION public.mindmate_consent_version()
RETURNS text
LANGUAGE sql
IMMUTABLE
AS $$ SELECT 'mm-consent-v1'::text $$;

GRANT EXECUTE ON FUNCTION public.mindmate_consent_version() TO anon, authenticated, service_role;

-- 2. Grant ------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.grant_mindmate_consent(p_version text, p_app_version text)
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
  IF p_version IS DISTINCT FROM public.mindmate_consent_version() THEN
    RAISE EXCEPTION 'consent text version % is not the current version %',
      p_version, public.mindmate_consent_version();
  END IF;
  IF p_app_version IS NULL OR btrim(p_app_version) = '' THEN
    RAISE EXCEPTION 'app_version is required';
  END IF;

  -- Close a consent to an older text version (re-consent).
  UPDATE public.consent_log
  SET revoked_at = now()
  WHERE user_id = uid
    AND consent_type = 'mindmate'
    AND revoked_at IS NULL;

  INSERT INTO public.consent_log (user_id, consent_type, granted, version, app_version, granted_at)
  VALUES (uid, 'mindmate', true, p_version, p_app_version, now());
END;
$$;

REVOKE ALL ON FUNCTION public.grant_mindmate_consent(text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.grant_mindmate_consent(text, text) TO authenticated;

-- 3. Status for the client ---------------------------------------------------

CREATE OR REPLACE FUNCTION public.mindmate_consent_status()
RETURNS text
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  uid uuid := auth.uid();
  active_version text;
BEGIN
  IF uid IS NULL THEN
    RAISE EXCEPTION 'unauthorized: authenticated session required';
  END IF;

  SELECT version INTO active_version
  FROM public.consent_log
  WHERE user_id = uid
    AND consent_type = 'mindmate'
    AND granted
    AND revoked_at IS NULL;

  IF active_version IS NULL THEN
    RETURN 'none';
  ELSIF active_version = public.mindmate_consent_version() THEN
    RETURN 'current';
  ELSE
    RETURN 'outdated';
  END IF;
END;
$$;

REVOKE ALL ON FUNCTION public.mindmate_consent_status() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.mindmate_consent_status() TO authenticated;

-- 4. Server gate --------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.has_current_mindmate_consent(p_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.consent_log
    WHERE user_id = p_user_id
      AND consent_type = 'mindmate'
      AND granted
      AND revoked_at IS NULL
      AND version = public.mindmate_consent_version()
  );
$$;

REVOKE ALL ON FUNCTION public.has_current_mindmate_consent(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.has_current_mindmate_consent(uuid) TO service_role;
