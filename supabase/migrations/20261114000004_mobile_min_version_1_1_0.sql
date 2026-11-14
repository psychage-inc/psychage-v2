-- =============================================================================
-- Compliance item 0 (mobile): raise the minimum app version to 1.1.0.
-- 1.1.0 is the first build that enforces the minimum (get_min_app_version)
-- and no longer sends p_latitude, p_longitude, p_radius_miles or
-- p_accepting to search_providers_v3.
-- =============================================================================

UPDATE public.platform_settings
SET value = '{"ios": "1.1.0", "android": "1.1.0"}'::jsonb,
    updated_at = now()
WHERE key = 'mobile_min_version';

DO $$
BEGIN
  IF public.get_min_app_version('ios') <> '1.1.0' OR public.get_min_app_version('android') <> '1.1.0' THEN
    RAISE EXCEPTION 'mobile_min_version was not raised to 1.1.0';
  END IF;
END $$;
