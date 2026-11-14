-- =============================================================================
-- Compliance item 0 (mobile): minimum app version.
--
-- The mobile app calls get_min_app_version(platform) at launch and blocks
-- itself with "Update required" when its version is lower. The minimum
-- lives in platform_settings under 'mobile_min_version', one semver per
-- platform. It starts at 1.0.0 (blocks nothing) and is raised once a build
-- that enforces it exists.
-- =============================================================================

INSERT INTO public.platform_settings (key, value)
VALUES ('mobile_min_version', '{"ios": "1.0.0", "android": "1.0.0"}'::jsonb)
ON CONFLICT (key) DO NOTHING;

CREATE OR REPLACE FUNCTION public.get_min_app_version(p_platform text)
RETURNS text
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  min_version text;
BEGIN
  IF p_platform IS NULL OR p_platform NOT IN ('ios', 'android') THEN
    RAISE EXCEPTION 'unknown platform: %', p_platform;
  END IF;

  SELECT value->>p_platform INTO min_version
  FROM public.platform_settings
  WHERE key = 'mobile_min_version';

  IF min_version IS NULL OR min_version !~ '^\d+\.\d+\.\d+$' THEN
    RAISE EXCEPTION 'mobile_min_version is not set for %', p_platform;
  END IF;

  RETURN min_version;
END;
$$;

REVOKE ALL ON FUNCTION public.get_min_app_version(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_min_app_version(text) TO anon, authenticated;
