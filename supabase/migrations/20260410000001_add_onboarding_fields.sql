-- Add onboarding fields to profiles table
-- Supports the new patient onboarding flow (/onboarding)

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS wellness_focus JSONB DEFAULT NULL;

COMMENT ON COLUMN public.profiles.onboarding_completed IS 'Whether the patient has completed the onboarding wizard';
COMMENT ON COLUMN public.profiles.wellness_focus IS 'Array of wellness focus areas selected during onboarding (e.g. ["mood","sleep","stress"])';
