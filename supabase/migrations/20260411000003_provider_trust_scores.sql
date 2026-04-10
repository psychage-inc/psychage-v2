-- =============================================================================
-- Provider Trust Scores (materialized)
-- Computed nightly by compute-trust-scores Edge Function.
-- Dashboard reads from this table, NEVER computed on-demand per request.
-- Max score: 100. Weights: verification(40%) + profile(25%) + reviews(25%) + engagement(10%)
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.provider_trust_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id uuid NOT NULL REFERENCES public.providers(id) ON DELETE CASCADE UNIQUE,

  -- Composite and sub-scores (0-100 scale)
  overall_score numeric(5,2) DEFAULT 0,
  verification_score numeric(5,2) DEFAULT 0,
  profile_score numeric(5,2) DEFAULT 0,
  review_score numeric(5,2) DEFAULT 0,
  engagement_score numeric(5,2) DEFAULT 0,

  -- Review aggregates (cached for display)
  review_count integer DEFAULT 0,
  avg_communication numeric(3,2),
  avg_empathy numeric(3,2),
  avg_professionalism numeric(3,2),
  avg_helpfulness numeric(3,2),
  avg_recommendation numeric(3,2),

  last_computed_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Search/sort by overall trust score
CREATE INDEX idx_trust_overall
  ON public.provider_trust_scores(overall_score DESC);

-- Row Level Security
ALTER TABLE public.provider_trust_scores ENABLE ROW LEVEL SECURITY;

-- Public can read trust scores (they are displayed on public profiles)
CREATE POLICY public_reads_trust_scores ON public.provider_trust_scores
  FOR SELECT
  USING (true);

-- Only service role writes (via cron edge function)
CREATE POLICY service_writes_trust_scores ON public.provider_trust_scores
  FOR ALL
  USING (auth.role() = 'service_role');
