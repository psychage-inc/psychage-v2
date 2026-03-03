# Database Setup - Do This Now! ⚡

You can set up the database RIGHT NOW without API keys.

---

## 📋 Instructions

### Step 1: Open Supabase Dashboard

1. Go to: https://supabase.com/dashboard
2. Select your project (the one with URL: `ozourhqyqtpppvpbhphw.supabase.co`)
3. Click **SQL Editor** in the left sidebar
4. Click **New Query**

### Step 2: Copy the Migration

Open this file: `supabase/migrations/20260303000003_mindmate_pgvector.sql`

Or copy from below (it's ~200 lines):

<details>
<summary>Click to expand SQL migration</summary>

```sql
-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Main embeddings table
CREATE TABLE IF NOT EXISTS psychage_embeddings (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id   TEXT NOT NULL,
  content_type TEXT NOT NULL,
  chunk_index  INT NOT NULL,
  chunk_text   TEXT NOT NULL,
  embedding    vector(1536),
  title        TEXT NOT NULL,
  url          TEXT NOT NULL,
  thumbnail    TEXT,
  conditions   TEXT[],
  severity     TEXT,
  content_age  TIMESTAMPTZ,
  is_crisis    BOOLEAN DEFAULT FALSE,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS psychage_embeddings_hnsw_idx
  ON psychage_embeddings
  USING hnsw (embedding vector_cosine_ops)
  WITH (m = 16, ef_construction = 64);

CREATE INDEX IF NOT EXISTS psychage_embeddings_content_type_idx
  ON psychage_embeddings (content_type, is_crisis);

CREATE INDEX IF NOT EXISTS psychage_embeddings_conditions_idx
  ON psychage_embeddings USING GIN (conditions);

CREATE INDEX IF NOT EXISTS psychage_embeddings_content_id_idx
  ON psychage_embeddings (content_id);

-- Analytics table
CREATE TABLE IF NOT EXISTS mindmate_events (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id        TEXT NOT NULL,
  event_type        TEXT NOT NULL,
  query_category    TEXT,
  rag_used          BOOLEAN DEFAULT FALSE,
  web_search_used   BOOLEAN DEFAULT FALSE,
  response_time_ms  INT,
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

-- Analytics indexes
CREATE INDEX IF NOT EXISTS mindmate_events_session_idx
  ON mindmate_events (session_id);

CREATE INDEX IF NOT EXISTS mindmate_events_type_idx
  ON mindmate_events (event_type, created_at DESC);

-- Search function
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

-- RLS
ALTER TABLE psychage_embeddings ENABLE ROW LEVEL SECURITY;
ALTER TABLE mindmate_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for embeddings"
  ON psychage_embeddings FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Service role full access for embeddings"
  ON psychage_embeddings FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public insert for analytics"
  ON mindmate_events FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Service role read analytics"
  ON mindmate_events FOR SELECT
  TO service_role
  USING (true);

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ MindMate 2.0 vector database schema created successfully';
END $$;
```

</details>

### Step 3: Paste and Run

1. Paste the entire SQL into the query editor
2. Click **Run** (or press Cmd/Ctrl + Enter)
3. Wait ~5 seconds

### Step 4: Check for Success

You should see in the Results panel:
```
✅ MindMate 2.0 vector database schema created successfully
```

If you see errors instead, copy them and send them to me!

### Step 5: Verify Tables Created

1. Go to **Table Editor** in left sidebar
2. You should see two new tables:
   - `psychage_embeddings`
   - `mindmate_events`

---

## ✅ Once Done

Come back and tell me:
- ✅ "Migration successful" - if it worked
- ❌ "Got error: [paste error]" - if it failed

Then we'll test the database! 🚀
