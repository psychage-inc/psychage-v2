-- =============================================================================
-- providers.is_accepting_patients — stop asserting availability
-- Compliance item 0. The importers hard-coded TRUE for every provider, so the
-- value was never a real availability signal. Drop the default and clear every
-- existing value. The column itself stays: shipped mobile builds still read it
-- (a NULL hides their "Accepting new patients" label). Drop it in a later
-- migration once no supported client reads it.
--
-- The bulk update must not stamp a fake edit time on every row, so the
-- updated_at trigger is disabled for this statement only.
--
-- The UPDATE touches ~423k rows and exceeds the role's 2-minute
-- statement_timeout, so the limit is raised for this transaction only.
-- =============================================================================

SET LOCAL statement_timeout = '30min';

ALTER TABLE public.providers ALTER COLUMN is_accepting_patients DROP DEFAULT;

ALTER TABLE public.providers DISABLE TRIGGER providers_updated_at;

UPDATE public.providers
SET is_accepting_patients = NULL
WHERE is_accepting_patients IS NOT NULL;

ALTER TABLE public.providers ENABLE TRIGGER providers_updated_at;
