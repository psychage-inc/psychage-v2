-- Add streaming performance columns to ai_messages
ALTER TABLE ai_messages
  ADD COLUMN IF NOT EXISTS time_to_first_token_ms INTEGER,
  ADD COLUMN IF NOT EXISTS streamed BOOLEAN DEFAULT false;

-- Partial index for analyzing streaming performance
CREATE INDEX IF NOT EXISTS idx_ai_messages_streamed
  ON ai_messages (streamed)
  WHERE streamed = true;

COMMENT ON COLUMN ai_messages.time_to_first_token_ms IS
  'Time in ms from request start to first LLM token. Only set for streamed responses.';
COMMENT ON COLUMN ai_messages.streamed IS
  'Whether this response was delivered via SSE streaming.';
