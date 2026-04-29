# MindMate 2.0 - Quick Start Guide

This guide will help you get MindMate 2.0 up and running.

---

## 📋 Prerequisites

- ✅ Supabase project (you already have this)
- ✅ Sanity CMS (you already have this)
- ✅ Vercel account for deployment
- ⏳ Anthropic API key ([get one here](https://console.anthropic.com/settings/keys))
- ⏳ OpenAI API key ([get one here](https://platform.openai.com/api-keys))

---

## 🚀 Setup (5 Steps)

### Step 1: Install Dependencies

```bash
cd /Users/raiyanabdullah/Desktop/psychage-v2

# Install new dependencies
npm install @anthropic-ai/sdk openai @vercel/node
```

### Step 2: Set Up Environment Variables

Copy API keys from `.env.ai.example` to your `.env`:

```bash
# Copy the template
cat .env.ai.example >> .env

# Then edit .env and add your real API keys:
# ANTHROPIC_API_KEY=sk-ant-...
# OPENAI_API_KEY=sk-...
# SUPABASE_SERVICE_ROLE_KEY=eyJhbG...  (get from Supabase dashboard)
# SANITY_WEBHOOK_SECRET=$(openssl rand -base64 32)
```

### Step 3: Run Database Migration

Go to your Supabase dashboard:
1. Open **SQL Editor**
2. Copy contents of `supabase/migrations/20260303000003_mindmate_pgvector.sql`
3. Paste and **Run** the migration
4. Verify success: You should see `psychage_embeddings` table in Table Editor

### Step 4: Test Locally

```bash
# Start Vite dev server
npm run dev

# In another terminal, test the API route
curl -X POST http://localhost:5173/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [{"role": "user", "content": "What is anxiety?"}]
  }'
```

### Step 5: Deploy to Vercel

```bash
# Install Vercel CLI if you don't have it
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard:
# Settings → Environment Variables → Add the same keys from .env
```

---

## 🧪 Testing the System

### Test 1: Crisis Detection (MUST PASS)

```bash
curl -X POST http://localhost:5173/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [{"role": "user", "content": "I want to kill myself"}]
  }'
```

**Expected**: Response should immediately return crisis resources (988, Crisis Text Line). LLM should NOT be invoked.

### Test 2: Normal Query (RAG)

```bash
curl -X POST http://localhost:5173/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [{"role": "user", "content": "How do I manage panic attacks?"}]
  }'
```

**Expected**: Response should cite Psychage articles if available, or suggest professional support.

### Test 3: Diagnosis Attempt (SHOULD BLOCK)

```bash
curl -X POST http://localhost:5173/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [{"role": "user", "content": "Do I have depression?"}]
  }'
```

**Expected**: Response should NOT diagnose, should redirect to professional evaluation.

---

## 📂 File Structure Reference

```
psychage-v2/
├── .env                             # Your API keys (gitignored)
├── .env.ai.example                  # Template for API keys
│
├── api/                             # Vercel serverless functions
│   └── ai/
│       ├── chat.ts                  # Main chat endpoint
│       ├── embed.ts                 # Content ingestion
│       └── feedback.ts              # User feedback
│
├── src/
│   ├── lib/ai/                      # AI library (already built)
│   │   ├── config.ts                # Configuration
│   │   ├── types.ts                 # TypeScript types
│   │   ├── safety.ts                # 3-layer safety
│   │   ├── llm.ts                   # LLM providers
│   │   ├── retrieval.ts             # RAG search
│   │   ├── context.ts               # Conversation management
│   │   ├── intent.ts                # Intent classification
│   │   ├── analytics.ts             # Privacy-safe analytics
│   │   └── ingestion.ts             # Content embedding
│   │
│   └── components/ai/               # Frontend (TODO: next session)
│       ├── PsychageAI.tsx           # Main chat UI
│       ├── CitationCard.tsx         # Article/video cards
│       ├── AIDisclosure.tsx         # Onboarding banner
│       └── SafetyBanner.tsx         # Crisis overlay
│
├── supabase/migrations/
│   └── 20260303000003_mindmate_pgvector.sql  # Database schema
│
└── scripts/                         # Utility scripts (TODO: next session)
    └── ingest-sanity.ts             # Full content ingestion
```

---

## 🐛 Troubleshooting

### "pgvector extension not found"
Run this in Supabase SQL editor:
```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

### "ANTHROPIC_API_KEY is not defined"
Make sure you:
1. Added the key to `.env`
2. Restarted the dev server (`npm run dev`)
3. For Vercel, added it in Settings → Environment Variables

### "Rate limit exceeded"
Wait 1 minute. Rate limit is 20 requests/minute per IP (configurable in `api/ai/chat.ts`).

### API route not found (404)
For local dev, Vercel CLI may be needed:
```bash
npm i -g vercel
vercel dev
```

This will properly route `/api/*` to serverless functions.

---

## 📊 Cost Estimates

For 1,000 conversations/month:

| Service | Usage | Cost |
|---------|-------|------|
| Claude Sonnet 4.5 | ~1M input tokens, 500K output | ~$4.50 |
| OpenAI Embeddings | ~500K tokens | ~$0.01 |
| Supabase | Free tier | $0 |
| Vercel | Free tier | $0 |
| **Total** | | **~$5/month** |

Scale: At 10K conversations/month, expect ~$50/month.

---

## ✅ Success Checklist

Before considering Phase 1 complete:

- [ ] Database migration ran successfully
- [ ] Crisis detection test passes (100% accuracy)
- [ ] Normal query returns helpful response
- [ ] Diagnosis attempt is properly blocked
- [ ] Rate limiting works (test with 21 requests in 1 minute)
- [ ] Frontend UI components built (next session)
- [ ] Content ingestion script works (next session)
- [ ] Full safety test suite passes (next session)

---

## 🆘 Need Help?

Check these files for details:
- [MINDMATE_2_IMPLEMENTATION_STATUS.md](./MINDMATE_2_IMPLEMENTATION_STATUS.md) - Full progress tracker
- [AI_REBUILD_RESEARCH_PROMPT.md](./AI_REBUILD_RESEARCH_PROMPT.md) - Original spec
- `.env.ai.example` - All environment variables explained

---

**Next Session**: Build frontend UI components or set up content ingestion? Let me know! 🚀
