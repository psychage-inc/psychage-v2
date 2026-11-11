-- ============================================================
-- Link signup consent records to the new user
-- ============================================================
-- Date: 2026-11-12
--
-- Context:
--   The signup forms logged consents from the browser right after
--   supabase.auth.signUp(). With email confirmation on, signUp returns no
--   session, so the insert ran as anon and every signup consent row was
--   stored with user_id = NULL (the anon insert policy only allows NULL).
--
--   The forms now pass the consent choices in the signup user metadata, and
--   this trigger writes the consent rows in the same transaction that
--   creates the auth.users row, so each row carries the new user id.
--   Only signups from the consent forms (metadata has consent_version)
--   get rows.
-- ============================================================

BEGIN;

CREATE OR REPLACE FUNCTION public.log_signup_consent()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  meta jsonb := COALESCE(NEW.raw_user_meta_data, '{}'::jsonb);
  consent_version text := meta->>'consent_version';
BEGIN
  IF consent_version IS NULL THEN
    RETURN NEW;
  END IF;

  INSERT INTO public.consent_log (user_id, consent_type, granted, version, granted_at, revoked_at, metadata)
  SELECT NEW.id, c.consent_type, c.granted, consent_version, now(),
         CASE WHEN c.granted THEN NULL ELSE now() END, '{}'::jsonb
  FROM (VALUES
    ('terms_of_service', true),
    ('privacy_policy', true),
    ('data_processing', COALESCE(meta->>'data_processing_accepted' = 'true', false)),
    ('age_verification', COALESCE(meta->>'age_verified' = 'true', false)),
    ('newsletter', COALESCE(meta->>'newsletter_opt_in' = 'true', false))
  ) AS c(consent_type, granted);

  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.log_signup_consent() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS on_auth_user_created_consent ON auth.users;
CREATE TRIGGER on_auth_user_created_consent
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.log_signup_consent();

COMMIT;

-- ============================================================
-- ROLLBACK (manual)
-- ============================================================
-- BEGIN;
-- DROP TRIGGER IF EXISTS on_auth_user_created_consent ON auth.users;
-- DROP FUNCTION IF EXISTS public.log_signup_consent();
-- COMMIT;
