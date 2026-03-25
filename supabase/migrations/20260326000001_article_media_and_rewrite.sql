-- =============================================================================
-- Article Media Enrichment & Rewrite Tracking
-- Adds video, audio, subtitle, and rewrite-tracking columns to articles table.
-- Part of the Article Quality Overhaul (March 2026).
-- =============================================================================

-- Video fields
ALTER TABLE public.articles
  ADD COLUMN IF NOT EXISTS video_url TEXT,
  ADD COLUMN IF NOT EXISTS video_platform TEXT
    CHECK (video_platform IN ('youtube', 'vimeo', 'bunny', 'self_hosted')),
  ADD COLUMN IF NOT EXISTS video_status TEXT DEFAULT 'none'
    CHECK (video_status IN ('none', 'planned', 'scripted', 'recorded', 'published')),
  ADD COLUMN IF NOT EXISTS video_duration_seconds INTEGER,
  ADD COLUMN IF NOT EXISTS video_transcript TEXT;

COMMENT ON COLUMN public.articles.video_url IS 'URL for companion video (YouTube, Vimeo, Bunny CDN, or self-hosted)';
COMMENT ON COLUMN public.articles.video_platform IS 'Video hosting platform identifier';
COMMENT ON COLUMN public.articles.video_status IS 'Production status of the companion video';
COMMENT ON COLUMN public.articles.video_duration_seconds IS 'Video duration in seconds';
COMMENT ON COLUMN public.articles.video_transcript IS 'Full text transcript of the video for accessibility';

-- Audio fields
ALTER TABLE public.articles
  ADD COLUMN IF NOT EXISTS audio_url TEXT,
  ADD COLUMN IF NOT EXISTS audio_status TEXT DEFAULT 'tts_only'
    CHECK (audio_status IN ('tts_only', 'planned', 'recorded', 'published')),
  ADD COLUMN IF NOT EXISTS audio_duration_seconds INTEGER;

COMMENT ON COLUMN public.articles.audio_url IS 'URL for pre-recorded audio narration (mp3/m4a)';
COMMENT ON COLUMN public.articles.audio_status IS 'Audio narration status — tts_only means browser TTS fallback';
COMMENT ON COLUMN public.articles.audio_duration_seconds IS 'Audio narration duration in seconds';

-- Article enrichment
ALTER TABLE public.articles
  ADD COLUMN IF NOT EXISTS subtitle TEXT;

COMMENT ON COLUMN public.articles.subtitle IS 'Hook line / subtitle displayed below article title';

-- Rewrite tracking
ALTER TABLE public.articles
  ADD COLUMN IF NOT EXISTS rewrite_needed BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS rewrite_status TEXT DEFAULT 'not_needed'
    CHECK (rewrite_status IN ('not_needed', 'flagged', 'in_progress', 'review', 'complete')),
  ADD COLUMN IF NOT EXISTS original_word_count INTEGER,
  ADD COLUMN IF NOT EXISTS last_quality_audit TIMESTAMPTZ;

COMMENT ON COLUMN public.articles.rewrite_needed IS 'Flag set by quality audit when article needs rewriting';
COMMENT ON COLUMN public.articles.rewrite_status IS 'Tracks rewrite pipeline: flagged → in_progress → review → complete';
COMMENT ON COLUMN public.articles.original_word_count IS 'Word count before rewrite, preserved for audit trail';
COMMENT ON COLUMN public.articles.last_quality_audit IS 'Timestamp of last automated quality audit run';

-- Performance indexes
CREATE INDEX IF NOT EXISTS idx_articles_rewrite_needed
  ON public.articles(rewrite_needed)
  WHERE rewrite_needed = TRUE;

CREATE INDEX IF NOT EXISTS idx_articles_video_status
  ON public.articles(video_status)
  WHERE video_status != 'none';

CREATE INDEX IF NOT EXISTS idx_articles_audio_status
  ON public.articles(audio_status)
  WHERE audio_status != 'tts_only';
