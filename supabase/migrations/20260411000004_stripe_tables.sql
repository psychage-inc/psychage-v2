-- =============================================================================
-- Stripe Integration Tables
-- stripe_customers: maps Supabase user → Stripe customer
-- provider_subscriptions: tracks subscription lifecycle
-- stripe_events_log: webhook idempotency (dedup by stripe_event_id)
-- =============================================================================

-- Stripe Customer Mapping
CREATE TABLE IF NOT EXISTS public.stripe_customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  stripe_customer_id text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now()
);

-- Provider Subscriptions
CREATE TABLE IF NOT EXISTS public.provider_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id uuid NOT NULL REFERENCES public.providers(id) ON DELETE CASCADE UNIQUE,
  stripe_subscription_id text NOT NULL UNIQUE,
  stripe_price_id text NOT NULL,
  plan_tier text NOT NULL CHECK (plan_tier IN ('pro', 'elite')),
  billing_interval text NOT NULL CHECK (billing_interval IN ('month', 'year')),
  status text NOT NULL DEFAULT 'active' CHECK (status IN (
    'active', 'past_due', 'canceled', 'incomplete', 'trialing', 'paused'
  )),
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean DEFAULT false,
  trial_end timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Index for active subscription lookups
CREATE INDEX idx_subscriptions_provider_status
  ON public.provider_subscriptions(provider_id, status)
  WHERE status IN ('active', 'trialing');

-- Stripe Events Log (idempotency)
CREATE TABLE IF NOT EXISTS public.stripe_events_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_event_id text NOT NULL UNIQUE,
  event_type text NOT NULL,
  payload jsonb NOT NULL,
  processed_at timestamptz DEFAULT now()
);

-- Row Level Security
ALTER TABLE public.stripe_customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.provider_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stripe_events_log ENABLE ROW LEVEL SECURITY;

-- Stripe customers: users can read their own
CREATE POLICY own_stripe_customer ON public.stripe_customers
  FOR SELECT
  USING (user_id = auth.uid());

-- Subscriptions: providers can read their own
CREATE POLICY own_subscription ON public.provider_subscriptions
  FOR SELECT
  USING (provider_id IN (
    SELECT id FROM public.providers WHERE user_id = auth.uid()
  ));

-- Events log: service role only (webhook handler)
CREATE POLICY service_events_log ON public.stripe_events_log
  FOR ALL
  USING (auth.role() = 'service_role');
