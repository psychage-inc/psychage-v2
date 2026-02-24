-- =============================================================================
-- Migration 005: Create AI Help tables
-- =============================================================================

-- -----------------------------------------------------------------------------
-- content_documents: Source content library for RAG
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS content_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN (
    'article', 'condition_guide', 'coping_strategy',
    'video_transcript', 'faq', 'tool_description', 'crisis_resource'
  )),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  url_path TEXT NOT NULL,
  content_body TEXT NOT NULL,
  summary TEXT NOT NULL DEFAULT '',
  condition_tags TEXT[] DEFAULT '{}',
  topic_tags TEXT[] DEFAULT '{}',
  language TEXT NOT NULL DEFAULT 'en',
  author TEXT,
  sources JSONB DEFAULT '[]',
  last_reviewed TIMESTAMPTZ,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for content_documents
CREATE INDEX idx_content_documents_type_published
  ON content_documents (type, is_published);
CREATE INDEX idx_content_documents_condition_tags
  ON content_documents USING GIN (condition_tags);
CREATE INDEX idx_content_documents_topic_tags
  ON content_documents USING GIN (topic_tags);
CREATE INDEX idx_content_documents_slug
  ON content_documents (slug);
CREATE INDEX idx_content_documents_language
  ON content_documents (language);

-- Full-text search index
ALTER TABLE content_documents
  ADD COLUMN IF NOT EXISTS fts TSVECTOR
  GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(summary, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(content_body, '')), 'C')
  ) STORED;

CREATE INDEX idx_content_documents_fts ON content_documents USING GIN (fts);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_content_documents_updated_at
  BEFORE UPDATE ON content_documents
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- -----------------------------------------------------------------------------
-- content_chunks: Chunked + embedded content for RAG vector search
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS content_chunks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID NOT NULL REFERENCES content_documents(id) ON DELETE CASCADE,
  chunk_index INTEGER NOT NULL,
  chunk_text TEXT NOT NULL,
  chunk_summary TEXT,
  embedding VECTOR(1536),
  token_count INTEGER NOT NULL DEFAULT 0,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for content_chunks
CREATE INDEX idx_content_chunks_document_id
  ON content_chunks (document_id);
CREATE INDEX idx_content_chunks_embedding
  ON content_chunks USING hnsw (embedding vector_cosine_ops)
  WITH (m = 16, ef_construction = 64);

-- -----------------------------------------------------------------------------
-- ai_conversations: Chat conversation sessions
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS ai_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  language TEXT NOT NULL DEFAULT 'en',
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_message_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  message_count INTEGER NOT NULL DEFAULT 0,
  safety_flags TEXT[] DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  metadata JSONB DEFAULT '{}'
);

CREATE INDEX idx_ai_conversations_session_id
  ON ai_conversations (session_id);
CREATE INDEX idx_ai_conversations_user_id
  ON ai_conversations (user_id)
  WHERE user_id IS NOT NULL;
CREATE INDEX idx_ai_conversations_active
  ON ai_conversations (is_active, last_message_at DESC);

-- -----------------------------------------------------------------------------
-- ai_messages: Individual messages in conversations
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS ai_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES ai_conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  sources_cited JSONB,
  intent_classification TEXT,
  safety_flag TEXT,
  response_time_ms INTEGER,
  token_count_prompt INTEGER,
  token_count_completion INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_ai_messages_conversation_created
  ON ai_messages (conversation_id, created_at);

-- -----------------------------------------------------------------------------
-- ai_providers: Provider directory for AI search
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS ai_providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  credentials TEXT NOT NULL DEFAULT '',
  provider_type TEXT NOT NULL CHECK (provider_type IN (
    'psychologist', 'therapist', 'counselor', 'psychiatrist', 'social_worker'
  )),
  specialties TEXT[] DEFAULT '{}',
  location_city TEXT NOT NULL DEFAULT '',
  location_state TEXT,
  location_country TEXT NOT NULL DEFAULT '',
  location_lat DECIMAL,
  location_lng DECIMAL,
  telehealth_available BOOLEAN NOT NULL DEFAULT FALSE,
  languages TEXT[] DEFAULT '{en}',
  insurance_accepted TEXT[],
  bio TEXT,
  website TEXT,
  phone TEXT,
  is_verified BOOLEAN NOT NULL DEFAULT FALSE,
  listing_tier TEXT NOT NULL DEFAULT 'basic' CHECK (listing_tier IN ('basic', 'premium')),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_ai_providers_location_type_active
  ON ai_providers (location_country, provider_type, is_active);
CREATE INDEX idx_ai_providers_specialties
  ON ai_providers USING GIN (specialties);
CREATE INDEX idx_ai_providers_languages
  ON ai_providers USING GIN (languages);
CREATE INDEX idx_ai_providers_city
  ON ai_providers (lower(location_city));

CREATE TRIGGER set_ai_providers_updated_at
  BEFORE UPDATE ON ai_providers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- -----------------------------------------------------------------------------
-- ai_analytics: Aggregate analytics (no PII)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS ai_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL CHECK (event_type IN (
    'conversation_started', 'message_sent', 'crisis_detected',
    'article_linked', 'provider_suggested', 'tool_routed', 'feedback_received'
  )),
  session_hash TEXT NOT NULL,
  intent TEXT,
  articles_cited_count INTEGER,
  response_time_ms INTEGER,
  feedback_helpful BOOLEAN,
  language TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_ai_analytics_event_type_created
  ON ai_analytics (event_type, created_at DESC);
CREATE INDEX idx_ai_analytics_session_hash
  ON ai_analytics (session_hash);

-- -----------------------------------------------------------------------------
-- Vector similarity search function
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION match_content_chunks(
  query_embedding VECTOR(1536),
  match_threshold FLOAT DEFAULT 0.72,
  match_count INT DEFAULT 5,
  filter_content_types TEXT[] DEFAULT NULL,
  filter_condition_tags TEXT[] DEFAULT NULL,
  filter_language TEXT DEFAULT NULL
)
RETURNS TABLE (
  chunk_id UUID,
  document_id UUID,
  document_title TEXT,
  document_url_path TEXT,
  document_type TEXT,
  chunk_text TEXT,
  chunk_index INTEGER,
  chunk_metadata JSONB,
  similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    cc.id AS chunk_id,
    cd.id AS document_id,
    cd.title AS document_title,
    cd.url_path AS document_url_path,
    cd.type AS document_type,
    cc.chunk_text,
    cc.chunk_index,
    cc.metadata AS chunk_metadata,
    1 - (cc.embedding <=> query_embedding) AS similarity
  FROM content_chunks cc
  JOIN content_documents cd ON cd.id = cc.document_id
  WHERE
    cd.is_published = TRUE
    AND (filter_content_types IS NULL OR cd.type = ANY(filter_content_types))
    AND (filter_condition_tags IS NULL OR cd.condition_tags && filter_condition_tags)
    AND (filter_language IS NULL OR cd.language = filter_language)
    AND 1 - (cc.embedding <=> query_embedding) > match_threshold
  ORDER BY cc.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- -----------------------------------------------------------------------------
-- Full-text search function (for hybrid search)
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION search_content_documents(
  search_query TEXT,
  match_count INT DEFAULT 10,
  filter_content_types TEXT[] DEFAULT NULL,
  filter_language TEXT DEFAULT NULL
)
RETURNS TABLE (
  document_id UUID,
  title TEXT,
  url_path TEXT,
  document_type TEXT,
  summary TEXT,
  rank FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    cd.id AS document_id,
    cd.title,
    cd.url_path,
    cd.type AS document_type,
    cd.summary,
    ts_rank(cd.fts, websearch_to_tsquery('english', search_query)) AS rank
  FROM content_documents cd
  WHERE
    cd.is_published = TRUE
    AND cd.fts @@ websearch_to_tsquery('english', search_query)
    AND (filter_content_types IS NULL OR cd.type = ANY(filter_content_types))
    AND (filter_language IS NULL OR cd.language = filter_language)
  ORDER BY rank DESC
  LIMIT match_count;
END;
$$;

-- -----------------------------------------------------------------------------
-- Cleanup function for expired anonymous conversations
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION cleanup_expired_anonymous_conversations()
RETURNS INTEGER
LANGUAGE plpgsql
AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM ai_conversations
  WHERE user_id IS NULL
    AND last_message_at < NOW() - INTERVAL '24 hours';

  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$;
