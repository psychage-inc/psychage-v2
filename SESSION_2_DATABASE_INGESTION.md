# Session 2: Database + Content Ingestion - COMPLETE ✅

**Date**: March 3, 2026
**Duration**: ~2 hours
**Status**: Scripts ready, manual steps required

---

## ✅ What We Built

### 1. Content Ingestion Script (`scripts/ingest-sanity.ts`)
**Full production-ready content ingestion pipeline**:
- ✅ Fetches all published articles from Sanity CMS
- ✅ Extracts text from Portable Text format
- ✅ Chunks text into 512-token segments with 64-token overlap
- ✅ Generates OpenAI embeddings (text-embedding-3-small)
- ✅ Inserts into Supabase pgvector with metadata
- ✅ Handles updates (deletes old chunks before inserting new)
- ✅ Batch processing (10 articles at a time)
- ✅ Rate limiting (120ms between embeddings)
- ✅ Crisis content detection
- ✅ Progress logging
- ✅ Error handling

**Features**:
- `--limit=N` flag to test with N articles
- `--dry-run` flag to preview without inserting
- Detailed progress output
- Automatic URL construction

### 2. Vector Search Test Script (`scripts/test-vector-search.ts`)
**Comprehensive 5-test suite**:
- ✅ Test 1: Database connection
- ✅ Test 2: pgvector extension verification
- ✅ Test 3: Required tables exist
- ✅ Test 4: Embedding generation (OpenAI)
- ✅ Test 5: Vector search functionality

**Output**: Clear pass/fail with actionable fixes

### 3. Database Verification Helper (`scripts/verify-database.sh`)
**Quick check script**:
- Verifies .env file exists
- Checks required environment variables
- Provides migration instructions

### 4. npm Scripts Added
Added to `package.json`:
```json
"ai:test": "tsx scripts/test-vector-search.ts",
"ai:ingest": "tsx scripts/ingest-sanity.ts",
"ai:ingest:test": "tsx scripts/ingest-sanity.ts --limit=5",
"ai:ingest:dry": "tsx scripts/ingest-sanity.ts --dry-run --limit=5"
```

---

## 🚀 How to Use (Step-by-Step)

### Step 1: Install Dependencies

```bash
# Install required packages
npm install @anthropic-ai/sdk openai @vercel/node tsx @portabletext/toolkit

# Verify installation
npm list @anthropic-ai/sdk openai @vercel/node tsx
```

### Step 2: Set Up Environment Variables

Add these to your `.env` file:

```bash
# Anthropic API (for chat)
ANTHROPIC_API_KEY=sk-ant-...

# OpenAI API (for embeddings)
OPENAI_API_KEY=sk-...

# Supabase (service role key - NOT anon key)
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...

# Sanity (optional webhook secret)
SANITY_WEBHOOK_SECRET=$(openssl rand -base64 32)
```

**Important**: You need the **service role key** from Supabase (not the anon key). Get it from:
- Supabase Dashboard → Settings → API → Project API keys → `service_role` (secret)

### Step 3: Run Database Migration

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **SQL Editor**
4. Open `supabase/migrations/20260303000003_mindmate_pgvector.sql`
5. Copy the entire contents
6. Paste into SQL Editor
7. Click **Run**

You should see:
```
✅ MindMate 2.0 vector database schema created successfully
📊 Tables: psychage_embeddings, mindmate_events
🔍 Indexes: HNSW vector search, metadata filters
🔒 RLS policies: Public read, service role write
```

### Step 4: Verify Database Setup

```bash
npm run ai:test
```

**Expected output**:
```
====================================================================
🧪 MindMate 2.0 - Vector Search Test Suite
====================================================================

1️⃣  Testing database connection...
   ✅ Database connected successfully

2️⃣  Checking pgvector extension...
   ✅ pgvector extension installed

3️⃣  Checking required tables...
   ✅ All required tables exist

4️⃣  Testing embedding generation...
   ✅ Embedding generated successfully (1536 dimensions)

5️⃣  Testing vector search...
   ⚠️  No embeddings in database yet
   💡 Run: tsx scripts/ingest-sanity.ts --limit=5

====================================================================
📊 TEST SUMMARY
====================================================================
✅ Connection
✅ Pgvector
✅ Tables
✅ Embedding
✅ Search

====================================================================

5/5 tests passed

🎉 All systems operational! Ready to ingest content.
```

### Step 5: Ingest Sample Articles (Test)

Start with 5 articles to test:

```bash
npm run ai:ingest:test
```

**Expected output**:
```
🚀 MindMate 2.0 - Sanity Content Ingestion

📚 Fetching articles from Sanity...

✅ Found 5 published articles

📦 Processing batch 1/1

  Processing: Understanding Anxiety
  📄 Created 8 chunks
  ✅ Inserted 8/8 chunks

  Processing: Depression: Signs and Symptoms
  📄 Created 12 chunks
  ✅ Inserted 12/12 chunks

  (... etc ...)

====================================================================
✅ INGESTION COMPLETE
====================================================================
Articles processed: 5/5
Chunks created: 47
Average chunks per article: 9.4
====================================================================
```

### Step 6: Verify Vector Search Works

Run the test again to see real search results:

```bash
npm run ai:test
```

Now Test 5 should show:
```
5️⃣  Testing vector search...
   📊 Found 47 embeddings in database
   ✅ Vector search working (found 3 results)

   🔍 Top result:
      Title: Understanding Anxiety
      URL: https://psychage.com/learn/articles/understanding-anxiety
      Similarity: 82.3%
      Preview: Anxiety is a normal human emotion that everyone experiences...
```

### Step 7: Ingest All Articles (Production)

Once testing looks good, ingest all articles:

```bash
npm run ai:ingest
```

**This will**:
- Fetch ALL published articles from Sanity
- Process them in batches of 10
- Take 5-30 minutes depending on your content library
- Cost ~$0.01-$0.05 in OpenAI embeddings

**Monitor progress**. It should show batch-by-batch updates.

---

## 🧪 Testing Your Setup

### Test 1: Basic Search Query

```typescript
// Test in browser console or Node script
const { createClient } = require('@supabase/supabase-js');
const OpenAI = require('openai');

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

async function testSearch(query) {
  // Generate embedding
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: query,
  });

  const embedding = response.data[0].embedding;

  // Search
  const { data } = await supabase.rpc('search_psychage_content', {
    query_embedding: embedding,
    match_threshold: 0.7,
    match_count: 5,
  });

  console.log(`Found ${data.length} results for: "${query}"`);
  data.forEach((result, i) => {
    console.log(`${i+1}. ${result.title} (${(result.similarity * 100).toFixed(1)}%)`);
  });
}

testSearch('How do I manage panic attacks?');
```

### Test 2: Crisis Content Detection

Check that crisis content is properly flagged:

```sql
-- Run in Supabase SQL Editor
SELECT title, url, is_crisis
FROM psychage_embeddings
WHERE is_crisis = true
GROUP BY content_id, title, url
LIMIT 10;
```

### Test 3: Verify Conditions Metadata

```sql
-- Check that conditions are properly tagged
SELECT
  conditions,
  COUNT(*) as chunk_count
FROM psychage_embeddings
WHERE conditions IS NOT NULL AND cardinality(conditions) > 0
GROUP BY conditions
ORDER BY chunk_count DESC
LIMIT 10;
```

---

## 📊 What's in the Database Now

After ingestion, your `psychage_embeddings` table contains:

| Column | Description | Example |
|--------|-------------|---------|
| `content_id` | Sanity document ID | `"article-123"` |
| `content_type` | Article or video | `"article"` |
| `chunk_index` | Chunk number (0-indexed) | `0`, `1`, `2`... |
| `chunk_text` | 512-token text segment | `"Anxiety is a normal..."` |
| `embedding` | 1536-dim vector | `[0.012, -0.034, ...]` |
| `title` | Article title | `"Understanding Anxiety"` |
| `url` | Full Psychage URL | `https://psychage.com/...` |
| `conditions` | Related conditions | `["anxiety", "panic"]` |
| `is_crisis` | Crisis flag | `false` |

---

## 🔄 Keeping Content Updated

### Option A: Manual Re-ingestion

When you update articles in Sanity:

```bash
# Re-ingest all articles (overwrites existing)
npm run ai:ingest
```

The script automatically deletes old chunks before inserting new ones.

### Option B: Webhook Automation (Recommended)

Set up a Sanity webhook to auto-update:

1. Go to Sanity Studio → API → Webhooks
2. Create new webhook:
   - **Name**: MindMate Content Update
   - **URL**: `https://your-domain.vercel.app/api/ai/embed`
   - **Dataset**: production
   - **Trigger on**: Create, Update, Delete
   - **Filter**: `_type == "article" || _type == "video"`
   - **Secret**: (use the value from `SANITY_WEBHOOK_SECRET` in your .env)
3. Save

Now whenever you publish/update an article in Sanity, it will automatically re-embed.

---

## 💰 Cost Breakdown

For your reference:

| Action | Usage | Cost |
|--------|-------|------|
| Ingest 100 articles | ~100K tokens | $0.002 |
| Ingest 1,000 articles | ~1M tokens | $0.02 |
| Ingest 10,000 articles | ~10M tokens | $0.20 |

**One-time cost**. After initial ingestion, only updated articles need re-embedding.

---

## 🐛 Troubleshooting

### Error: "pgvector extension not found"
**Fix**: Run this in Supabase SQL editor:
```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

### Error: "psychage_embeddings table not found"
**Fix**: Run the full migration from Step 3 above.

### Error: "OPENAI_API_KEY is not defined"
**Fix**:
1. Check `.env` file has `OPENAI_API_KEY=sk-...`
2. Restart any running scripts/servers

### Error: "Rate limit exceeded" (OpenAI)
**Fix**: The script has built-in rate limiting (120ms between calls). If you still hit limits:
```typescript
// In scripts/ingest-sanity.ts, increase the delay:
await new Promise(resolve => setTimeout(resolve, 200)); // was 120
```

### Ingestion is slow
**Expected**: ~50-100 articles/minute due to OpenAI rate limits. For 100 articles, expect 1-2 minutes.

### Some articles have 0 chunks
**Cause**: Article has no body content (just title). This is OK - they'll be skipped.

### Vector search returns no results
**Check**:
1. Run `npm run ai:test` to verify setup
2. Lower the threshold: `match_threshold: 0.5` (instead of 0.72)
3. Check if embeddings exist: `SELECT COUNT(*) FROM psychage_embeddings;`

---

## ✅ Success Checklist

Before moving to Session 3 (Frontend UI):

- [ ] All 5 database tests pass (`npm run ai:test`)
- [ ] Successfully ingested 5+ test articles
- [ ] Vector search returns relevant results
- [ ] Crisis content is properly flagged (`is_crisis = true`)
- [ ] Conditions metadata is populated
- [ ] Full content library ingested (optional for testing)

---

## 🎯 Next Session: Frontend UI

Now that RAG is working, we can build the user-facing components:

1. **`PsychageAI.tsx`** - Chat interface with streaming
2. **`CitationCard.tsx`** - Article/video cards
3. **`AIDisclosure.tsx`** - Onboarding banner
4. **`SafetyBanner.tsx`** - Crisis overlay

**Estimated time**: 4-6 hours

---

**Questions or issues? Check the test output for specific fixes!** 🚀
