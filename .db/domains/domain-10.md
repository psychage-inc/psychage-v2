# Domain 10: RAG & Vector Search (MindMate)

## Code Path Trace

### Service: src/lib/ai/retrieval.ts

**Hybrid Search Pipeline:**
1. Generate embedding: OpenAI `text-embedding-3-small` → 1536-dim vector
2. Vector search: `match_content_chunks` RPC (pgvector cosine, threshold 0.72, top 15)
3. Full-text search: `search_content_documents` RPC (top 10)
4. Merge: vector 70% + text 30% weight
5. Deduplicate by documentId (keep highest-scoring chunk per document)
6. Return top 5 chunks

### match_content_chunks RPC Signature
```sql
CREATE FUNCTION match_content_chunks(
  query_embedding VECTOR(1536),
  match_threshold FLOAT DEFAULT 0.72,
  match_count INT DEFAULT 5,
  filter_content_types TEXT[] DEFAULT NULL,
  filter_condition_tags TEXT[] DEFAULT NULL,
  filter_language TEXT DEFAULT NULL
) RETURNS TABLE(...)
```

### Tables
- `content_documents`: published documents with metadata
- `content_chunks`: document chunks with VECTOR(1536) embedding + HNSW index

## Issues Found

| id | severity | issue | file | line | proposed_fix |
|---|---|---|---|---|---|
| RAG-001 | minor | Embedding passed as JSON.stringify(array) — Supabase-js auto-coerces but fragile | retrieval.ts | ~79 | Info — works today but could break on Supabase upgrade |
| RAG-002 | minor | If embedding API fails, entire retrieval fails silently (returns []) | retrieval.ts | ~89 | Info — chat degrades to no-RAG, doesn't crash |
| RAG-003 | info | No retry or cache for embedding generation | retrieval.ts | - | Performance optimization, not a bug |

## Edge Cases Verified
- ✅ pgvector extension: assumed enabled (HNSW index created in migration)
- ✅ Similarity threshold 0.72: applied at RPC level + post-filter
- ✅ Full-text search works alongside vector search
- ✅ Deduplication by documentId: implemented (lines 262-282)
- ✅ If embedding API fails: returns empty array → chat works without RAG context
- ✅ Content types indexed: verified via migration (article, condition_guide, coping_strategy, etc.)
- ✅ RLS: content_chunks has public SELECT (USING true) — correct for educational content
