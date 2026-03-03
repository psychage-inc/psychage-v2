-- ============================================================================
-- MindMate 2.0 - Vector Database Schema
-- ============================================================================
-- This migration creates the tables needed for RAG-based AI chat
-- Requires: pgvector extension
-- ============================================================================

-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- ============================================================================
-- Main embeddings table
-- ============================================================================
CREATE TABLE IF NOT EXISTS psychage_embeddings (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id   TEXT NOT NULL,          -- Sanity document _id
  content_type TEXT NOT NULL,          -- 'article' | 'video'
  chunk_index  INT NOT NULL,           -- 0-indexed chunk number
  chunk_text   TEXT NOT NULL,          -- Actual text content (512 tokens)
  embedding    vector(1536),           -- OpenAI text-embedding-3-small dimension
  title        TEXT NOT NULL,
  url          TEXT NOT NULL,          -- Full psychage.com URL
  thumbnail    TEXT,                   -- For video cards
  conditions   TEXT[],                 -- ['anxiety', 'depression', 'ptsd']
  severity     TEXT,                   -- 'mild' | 'moderate' | 'severe' | null
  content_age  TIMESTAMPTZ,            -- When the original content was published
  is_crisis    BOOLEAN DEFAULT FALSE,  -- Fast-path for crisis-adjacent queries
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- Indexes for performance
-- ============================================================================

-- HNSW index for fast approximate nearest-neighbor search
-- m = 16: number of connections per layer (balance between speed and recall)
-- ef_construction = 64: size of dynamic candidate list (higher = better recall, slower build)
CREATE INDEX IF NOT EXISTS psychage_embeddings_hnsw_idx
  ON psychage_embeddings
  USING hnsw (embedding vector_cosine_ops)
  WITH (m = 16, ef_construction = 64);

-- Compound index for metadata filtering
CREATE INDEX IF NOT EXISTS psychage_embeddings_content_type_idx
  ON psychage_embeddings (content_type, is_crisis);

-- GIN index for array search on conditions
CREATE INDEX IF NOT EXISTS psychage_embeddings_conditions_idx
  ON psychage_embeddings USING GIN (conditions);

-- Index for content updates (to delete old chunks)
CREATE INDEX IF NOT EXISTS psychage_embeddings_content_id_idx
  ON psychage_embeddings (content_id);

-- ============================================================================
-- Anonymized analytics table (NO CONVERSATION CONTENT STORED)
-- ============================================================================
CREATE TABLE IF NOT EXISTS mindmate_events (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id        TEXT NOT NULL,          -- Random UUID, not linked to user
  event_type        TEXT NOT NULL,          -- 'query' | 'crisis_detected' | 'feedback_positive' | 'feedback_negative'
  query_category    TEXT,                   -- 'anxiety' | 'depression' | 'crisis_adjacent' | etc.
  rag_used          BOOLEAN DEFAULT FALSE,  -- Was internal RAG used?
  web_search_used   BOOLEAN DEFAULT FALSE,  -- Was web search fallback used?
  response_time_ms  INT,                    -- Time to generate response
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

-- Index for analytics queries
CREATE INDEX IF NOT EXISTS mindmate_events_session_idx
  ON mindmate_events (session_id);

CREATE INDEX IF NOT EXISTS mindmate_events_type_idx
  ON mindmate_events (event_type, created_at DESC);

-- ============================================================================
-- Helper function: Hybrid search (cosine similarity + metadata filtering)
-- ============================================================================
CREATE OR REPLACE FUNCTION search_psychage_content(
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.72,
  match_count int DEFAULT 5,
  filter_content_type text DEFAULT NULL,
  filter_is_crisis boolean DEFAULT NULL
)
RETURNS TABLE (
  id uuid,
  content_id text,
  content_type text,
  chunk_text text,
  title text,
  url text,
  thumbnail text,
  conditions text[],
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    pe.id,
    pe.content_id,
    pe.content_type,
    pe.chunk_text,
    pe.title,
    pe.url,
    pe.thumbnail,
    pe.conditions,
    1 - (pe.embedding <=> query_embedding) AS similarity
  FROM psychage_embeddings pe
  WHERE
    (filter_content_type IS NULL OR pe.content_type = filter_content_type)
    AND (filter_is_crisis IS NULL OR pe.is_crisis = filter_is_crisis)
    AND (1 - (pe.embedding <=> query_embedding)) > match_threshold
  ORDER BY pe.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- ============================================================================
-- Row Level Security (RLS)
-- ============================================================================

-- Enable RLS
ALTER TABLE psychage_embeddings ENABLE ROW LEVEL SECURITY;
ALTER TABLE mindmate_events ENABLE ROW LEVEL SECURITY;

-- Public read access for embeddings (search functionality)
CREATE POLICY "Public read access for embeddings"
  ON psychage_embeddings FOR SELECT
  TO public
  USING (true);

-- Service role can insert/update/delete embeddings
CREATE POLICY "Service role full access for embeddings"
  ON psychage_embeddings FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Public can insert analytics events (anonymized)
CREATE POLICY "Public insert for analytics"
  ON mindmate_events FOR INSERT
  TO public
  WITH CHECK (true);

-- Service role can read analytics
CREATE POLICY "Service role read analytics"
  ON mindmate_events FOR SELECT
  TO service_role
  USING (true);

-- ============================================================================
-- Comments for documentation
-- ============================================================================

COMMENT ON TABLE psychage_embeddings IS
  'Vector embeddings of Psychage articles and videos for RAG search';

COMMENT ON TABLE mindmate_events IS
  'Anonymized analytics events - NO conversation content stored';

COMMENT ON FUNCTION search_psychage_content IS
  'Hybrid vector search with metadata filtering for RAG retrieval';

-- ============================================================================
-- Success message
-- ============================================================================

DO $$
BEGIN
  RAISE NOTICE '✅ MindMate 2.0 vector database schema created successfully';
  RAISE NOTICE '📊 Tables: psychage_embeddings, mindmate_events';
  RAISE NOTICE '🔍 Indexes: HNSW vector search, metadata filters';
  RAISE NOTICE '🔒 RLS policies: Public read, service role write';
END $$;
