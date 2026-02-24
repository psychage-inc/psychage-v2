-- =============================================================================
-- Migration 007: Row Level Security policies for AI tables
-- =============================================================================

-- Enable RLS on all AI tables
ALTER TABLE content_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_chunks ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_analytics ENABLE ROW LEVEL SECURITY;

-- -----------------------------------------------------------------------------
-- content_documents: PUBLIC read for published content
-- -----------------------------------------------------------------------------
CREATE POLICY "Anyone can read published content documents"
  ON content_documents FOR SELECT
  USING (is_published = TRUE);

CREATE POLICY "Service role can manage content documents"
  ON content_documents FOR ALL
  USING (auth.role() = 'service_role');

-- -----------------------------------------------------------------------------
-- content_chunks: PUBLIC read (educational content)
-- -----------------------------------------------------------------------------
CREATE POLICY "Anyone can read content chunks"
  ON content_chunks FOR SELECT
  USING (TRUE);

CREATE POLICY "Service role can manage content chunks"
  ON content_chunks FOR ALL
  USING (auth.role() = 'service_role');

-- -----------------------------------------------------------------------------
-- ai_conversations: Authenticated users read own; anonymous by session_id
-- -----------------------------------------------------------------------------
CREATE POLICY "Authenticated users can read own conversations"
  ON ai_conversations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can update own conversations"
  ON ai_conversations FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can delete own conversations"
  ON ai_conversations FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage all conversations"
  ON ai_conversations FOR ALL
  USING (auth.role() = 'service_role');

-- Anonymous conversations are managed via service role key in API routes
-- (session_id verification happens in application code)

CREATE POLICY "Anyone can insert conversations"
  ON ai_conversations FOR INSERT
  WITH CHECK (TRUE);

-- -----------------------------------------------------------------------------
-- ai_messages: Access through parent conversation
-- -----------------------------------------------------------------------------
CREATE POLICY "Users can read messages from own conversations"
  ON ai_messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM ai_conversations c
      WHERE c.id = ai_messages.conversation_id
        AND c.user_id = auth.uid()
    )
  );

CREATE POLICY "Service role can manage all messages"
  ON ai_messages FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Anyone can insert messages"
  ON ai_messages FOR INSERT
  WITH CHECK (TRUE);

-- -----------------------------------------------------------------------------
-- ai_providers: PUBLIC read for active, verified providers
-- -----------------------------------------------------------------------------
CREATE POLICY "Anyone can read active verified providers"
  ON ai_providers FOR SELECT
  USING (is_active = TRUE AND is_verified = TRUE);

CREATE POLICY "Service role can manage providers"
  ON ai_providers FOR ALL
  USING (auth.role() = 'service_role');

-- -----------------------------------------------------------------------------
-- ai_analytics: INSERT only for everyone, read only for service role
-- -----------------------------------------------------------------------------
CREATE POLICY "Anyone can insert analytics events"
  ON ai_analytics FOR INSERT
  WITH CHECK (TRUE);

CREATE POLICY "Service role can read analytics"
  ON ai_analytics FOR SELECT
  USING (auth.role() = 'service_role');
