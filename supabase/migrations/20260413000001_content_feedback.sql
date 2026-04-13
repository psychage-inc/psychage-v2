-- Content Feedback table
-- Stores user feedback (thumbs up/down + optional comment) for articles and tool results.

CREATE TABLE IF NOT EXISTS content_feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content_type TEXT NOT NULL CHECK (content_type IN ('article', 'tool-result')),
    content_id TEXT NOT NULL,
    helpful BOOLEAN NOT NULL,
    comment TEXT,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for aggregation queries (e.g., "how helpful is article X?")
CREATE INDEX idx_content_feedback_lookup
    ON content_feedback (content_type, content_id);

-- Index for user's own feedback history
CREATE INDEX idx_content_feedback_user
    ON content_feedback (user_id)
    WHERE user_id IS NOT NULL;

-- RLS: anyone can insert, only the author can read their own
ALTER TABLE content_feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit feedback"
    ON content_feedback FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Users can read own feedback"
    ON content_feedback FOR SELECT
    USING (user_id = auth.uid() OR user_id IS NULL);
