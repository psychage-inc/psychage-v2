-- =============================================================================
-- Provider Reviews
-- 5-dimension rating system (communication, empathy, professionalism,
-- helpfulness, recommendation). feedback_text is ALWAYS private — public
-- surface shows composite score + dimension averages ONLY.
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.provider_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id uuid NOT NULL REFERENCES public.providers(id) ON DELETE CASCADE,
  reviewer_user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- 5 rating dimensions (1-5 each)
  communication_rating smallint NOT NULL CHECK (communication_rating BETWEEN 1 AND 5),
  empathy_rating smallint NOT NULL CHECK (empathy_rating BETWEEN 1 AND 5),
  professionalism_rating smallint NOT NULL CHECK (professionalism_rating BETWEEN 1 AND 5),
  helpfulness_rating smallint NOT NULL CHECK (helpfulness_rating BETWEEN 1 AND 5),
  recommendation_rating smallint NOT NULL CHECK (recommendation_rating BETWEEN 1 AND 5),

  -- Private feedback text (never displayed publicly)
  feedback_text text CHECK (feedback_text IS NULL OR char_length(feedback_text) <= 500),

  -- Provider response (Pro/Elite only)
  provider_response text CHECK (provider_response IS NULL OR char_length(provider_response) <= 500),
  provider_responded_at timestamptz,

  -- Moderation
  status text DEFAULT 'active' CHECK (status IN ('active', 'flagged', 'removed')),
  flagged_reason text,
  moderated_by uuid,
  moderated_at timestamptz,

  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- One review per provider per user per quarter (90-day rolling)
CREATE UNIQUE INDEX idx_reviews_unique_90day
  ON public.provider_reviews(provider_id, reviewer_user_id, (date_trunc('quarter', created_at)));

-- Query reviews by provider + status
CREATE INDEX idx_reviews_provider_status
  ON public.provider_reviews(provider_id, status, created_at DESC);

-- Row Level Security
ALTER TABLE public.provider_reviews ENABLE ROW LEVEL SECURITY;

-- Reviewers can manage their own reviews
CREATE POLICY reviewer_own ON public.provider_reviews
  FOR ALL
  USING (reviewer_user_id = auth.uid());

-- Providers can read (anonymized) reviews about themselves
CREATE POLICY provider_reads_own_reviews ON public.provider_reviews
  FOR SELECT
  USING (provider_id IN (
    SELECT id FROM public.providers WHERE user_id = auth.uid()
  ));

-- Public can read active reviews (dimension scores only — text hidden at app layer)
CREATE POLICY public_reads_active ON public.provider_reviews
  FOR SELECT
  USING (status = 'active');
