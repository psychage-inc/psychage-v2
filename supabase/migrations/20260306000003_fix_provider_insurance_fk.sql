-- Fix provider_insurance table: recreate with proper FK constraints.
-- The original CREATE TABLE IF NOT EXISTS didn't add FKs if table pre-existed.

-- Drop and recreate (table has 0 rows)
DROP TABLE IF EXISTS public.provider_insurance;

CREATE TABLE public.provider_insurance (
  provider_id uuid NOT NULL REFERENCES public.providers(id) ON DELETE CASCADE,
  insurance_plan_id uuid NOT NULL REFERENCES public.insurance_plans(id) ON DELETE CASCADE,
  PRIMARY KEY (provider_id, insurance_plan_id)
);

CREATE INDEX IF NOT EXISTS idx_provider_insurance_plan ON public.provider_insurance (insurance_plan_id);

ALTER TABLE public.provider_insurance ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read provider_insurance" ON public.provider_insurance;
CREATE POLICY "Public read provider_insurance" ON public.provider_insurance
  FOR SELECT USING (
    provider_id IN (SELECT id FROM public.providers WHERE status IN ('active', 'seeded'))
  );

DROP POLICY IF EXISTS "Owner manage provider_insurance" ON public.provider_insurance;
CREATE POLICY "Owner manage provider_insurance" ON public.provider_insurance
  FOR ALL USING (
    provider_id IN (SELECT id FROM public.providers WHERE user_id = auth.uid())
  );
