-- =============================================================================
-- Provider Analytics Events
-- Tracks anonymous engagement events (profile views, search impressions, clicks)
-- visitor_id is a hashed session token — NEVER a user_id or auth.uid()
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.provider_analytics_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id uuid NOT NULL REFERENCES public.providers(id) ON DELETE CASCADE,
  event_type text NOT NULL CHECK (event_type IN (
    'profile_view', 'search_impression', 'phone_click', 'email_click',
    'website_click', 'favorite_add', 'favorite_remove', 'share'
  )),
  source text CHECK (source IS NULL OR source IN (
    'search', 'direct', 'article_referral', 'navigator_referral', 'external'
  )),
  visitor_id text NOT NULL, -- hashed session token, NEVER a user_id
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Composite index for provider-specific analytics queries
CREATE INDEX idx_pae_provider_type_date
  ON public.provider_analytics_events(provider_id, event_type, created_at DESC);

-- Time-range queries for aggregate dashboards
CREATE INDEX idx_pae_created_at
  ON public.provider_analytics_events(created_at DESC);

-- Row Level Security
ALTER TABLE public.provider_analytics_events ENABLE ROW LEVEL SECURITY;

-- Providers can read their own analytics events
CREATE POLICY provider_own_analytics ON public.provider_analytics_events
  FOR SELECT
  USING (provider_id IN (
    SELECT id FROM public.providers WHERE user_id = auth.uid()
  ));

-- Inserts allowed for authenticated users (event tracking from client)
CREATE POLICY insert_analytics_events ON public.provider_analytics_events
  FOR INSERT
  WITH CHECK (true);
