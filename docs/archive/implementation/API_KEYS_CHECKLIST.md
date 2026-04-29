# 🔑 Psychage V2 - API Keys & Credentials Checklist

**Purpose**: Complete guide to obtaining, configuring, and securing all API keys required for production deployment

**Last Updated**: March 3, 2026

---

## 📋 Quick Summary

| Service | Purpose | Required? | Cost | Priority |
|---------|---------|-----------|------|----------|
| [Anthropic](#1-anthropic-api) | MindMate AI + Crisis Companion | ✅ YES | $10-15/mo | 🔴 CRITICAL |
| [OpenAI](#2-openai-api) | Content embeddings | ✅ YES | $0.50-1/mo | 🔴 CRITICAL |
| [Supabase](#3-supabase) | Database + Auth | ✅ YES | $0 (free tier) | 🔴 CRITICAL |
| [Sanity CMS](#4-sanity-cms) | Content management | ✅ YES | $0 (free tier) | 🔴 CRITICAL |
| [Google Gemini](#5-google-gemini) | Alternative AI (legacy) | ⚠️ RECOMMENDED | $0 (free tier) | 🟡 MEDIUM |
| [ThroughLine](#6-throughline-optional) | Crisis helpline database | ⏸️ OPTIONAL | TBD | 🟢 LOW |
| [Brave Search](#7-brave-search-optional) | Web search (Phase 2) | ⏸️ OPTIONAL | TBD | 🟢 LOW |
| [Vercel KV](#8-vercel-kv-optional) | Redis caching (Phase 2) | ⏸️ OPTIONAL | $0 (hobby) | 🟢 LOW |
| [Sentry](#9-sentry-optional) | Error monitoring | ⏸️ OPTIONAL | $0 (free tier) | 🟢 LOW |

**Total Required Monthly Cost**: ~$10-16/month
**Total with Optional**: ~$10-16/month (most optional services have free tiers)

---

## 🔴 CRITICAL - Required for Production

### 1. Anthropic API

**Used For**:
- MindMate AI chat responses (Claude Sonnet 4.5)
- Crisis Companion supportive messaging
- Real-time mental health education

**Model**: `claude-sonnet-4-5-20250929`

**Pricing**:
- Input: $3 per 1M tokens (~3,000 messages)
- Output: $15 per 1M tokens (~750 detailed responses)
- **Estimated**: ~$10-15/month for 1,000 conversations

#### How to Get:
1. Go to: https://console.anthropic.com/settings/keys
2. Sign up or log in
3. Click "Create Key"
4. Name it: "Psychage Production"
5. Copy the key (starts with `sk-ant-api03-`)

#### Configuration:
```bash
# Add to .env
ANTHROPIC_API_KEY=sk-ant-api03-...

# Add to Vercel
# Settings → Environment Variables → Add
# Name: ANTHROPIC_API_KEY
# Value: sk-ant-api03-...
# Scope: Production, Preview, Development
```

#### Security:
- ✅ Never commit to git (already in `.gitignore`)
- ✅ Restrict to production domains only (if possible)
- ✅ Set up billing alerts at $20/month
- ✅ Monitor usage in Anthropic Console weekly

#### Testing:
```bash
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d '{
    "model": "claude-sonnet-4-5-20250929",
    "max_tokens": 10,
    "messages": [{"role": "user", "content": "Hi"}]
  }'
```

Expected: `{"id":"msg_...","type":"message",...}`

---

### 2. OpenAI API

**Used For**:
- Text embeddings for content search (RAG)
- MindMate citation retrieval
- Content ingestion pipeline

**Model**: `text-embedding-3-small` (1536 dimensions)

**Pricing**:
- $0.02 per 1M tokens
- ~$0.02 to embed 100 articles (one-time)
- ~$0.50-1/month for ongoing queries
- **Estimated**: ~$0.50-1/month

#### How to Get:
1. Go to: https://platform.openai.com/api-keys
2. Sign up or log in
3. Click "Create new secret key"
4. Name it: "Psychage Production Embeddings"
5. Copy the key (starts with `sk-`)

#### Configuration:
```bash
# Add to .env
OPENAI_API_KEY=sk-...

# Add to Vercel
# Settings → Environment Variables → Add
# Name: OPENAI_API_KEY
# Value: sk-...
# Scope: Production, Preview, Development
```

#### Security:
- ✅ Never commit to git
- ✅ Restrict to embedding API only (if possible)
- ✅ Set up billing alerts at $10/month
- ✅ Monitor usage in OpenAI Dashboard weekly

#### Testing:
```bash
curl https://api.openai.com/v1/embeddings \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "text-embedding-3-small",
    "input": "Test embedding"
  }'
```

Expected: `{"object":"list","data":[{"object":"embedding","embedding":[...],...}],...}`

---

### 3. Supabase

**Used For**:
- PostgreSQL database (articles, providers, embeddings, crisis events)
- User authentication
- Real-time subscriptions
- Row-level security

**Pricing**:
- Free tier: Up to 500MB database, 2GB bandwidth, 50,000 monthly active users
- Pro tier: $25/month (2GB database, 8GB bandwidth)
- **Estimated**: $0/month (free tier sufficient for launch)

#### How to Get:
1. Go to: https://supabase.com/dashboard
2. Sign up or log in
3. Create new project: "psychage-production"
4. Wait for provisioning (~2 minutes)
5. Go to: Settings → API
6. Copy three values:
   - Project URL: `https://[project-id].supabase.co`
   - Anon public key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (public, safe to expose)
   - Service role key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (secret, NEVER expose)

#### Configuration:
```bash
# Add to .env
VITE_SUPABASE_URL=https://[project-id].supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi... (anon key)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi... (service role key)

# Add to Vercel
# Settings → Environment Variables → Add all three
# IMPORTANT: SUPABASE_SERVICE_ROLE_KEY should NOT be prefixed with VITE_
# (This prevents it from being exposed to client)
```

#### Security:
- ✅ Use anon key for client-side operations
- ✅ Use service role key ONLY in server-side API routes
- ✅ Enable Row Level Security (RLS) on all tables
- ✅ Set up daily database backups
- ✅ Monitor database size and bandwidth

#### Database Setup:
```bash
# 1. Go to: Supabase Dashboard → SQL Editor
# 2. Run migration: supabase/migrations/20260303000003_mindmate_pgvector.sql
# 3. Run migration: supabase/migrations/20260303000010_crisis_system_schema.sql
# 4. Verify: Check "Tables" sidebar for 6 new tables
```

#### Testing:
```bash
curl "https://[project-id].supabase.co/rest/v1/psychage_embeddings?select=count" \
  -H "apikey: $VITE_SUPABASE_ANON_KEY" \
  -H "Authorization: Bearer $VITE_SUPABASE_ANON_KEY"
```

Expected: `[{"count":0}]` or `[{"count":N}]`

---

### 4. Sanity CMS

**Used For**:
- Article content management
- Video content management
- Content editors UI
- Webhook for content ingestion

**Pricing**:
- Free tier: 10,000 documents, 100GB bandwidth, 3 users
- **Estimated**: $0/month (free tier sufficient)

#### How to Get:
1. Go to: https://sanity.io/manage
2. Sign up or log in
3. Select existing project: "Psychage" (ID: `w1sh63w6`)
   - OR create new project if starting fresh
4. Go to: Settings → API
5. Copy values:
   - Project ID: `w1sh63w6`
   - Dataset: `production`
   - API Version: `2024-01-01`

#### Webhook Secret:
```bash
# Generate a random secret
openssl rand -base64 32

# Example output:
# kQ7nP9mL2xR5vT8wY3jK6hF4gD1cA0sZ7uB5nM8oP2qI9eW4rT6yU3iL1kJ0hG=

# Save this - you'll need it in both Sanity and Vercel
```

#### Configuration:
```bash
# Add to .env
VITE_SANITY_PROJECT_ID=w1sh63w6
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01
SANITY_WEBHOOK_SECRET=[your-generated-secret]

# Add to Vercel (all four variables)
```

#### Webhook Setup:
1. Go to: Sanity Dashboard → API → Webhooks
2. Click "Create webhook"
3. Name: "Psychage Content Ingestion"
4. URL: `https://psychage.com/api/ai/embed` (replace with your domain)
5. Dataset: `production`
6. Trigger on: `Create`, `Update`
7. Filter: `_type == "article" || _type == "video"`
8. Secret: [paste your generated secret]
9. Click "Save"

#### Testing:
```bash
curl "https://w1sh63w6.api.sanity.io/v2024-01-01/data/query/production?query=*[_type=='article'][0]"
```

Expected: Article JSON data

---

## 🟡 RECOMMENDED - Improves Functionality

### 5. Google Gemini

**Used For**:
- Symptom Navigator (legacy feature)
- Alternative AI provider
- Fallback for Anthropic outages

**Pricing**:
- Free tier: 60 queries per minute
- **Estimated**: $0/month (free tier sufficient)

#### How to Get:
1. Go to: https://aistudio.google.com/app/apikey
2. Sign in with Google account
3. Click "Create API key"
4. Select project or create new one
5. Copy the key (starts with `AIzaSy...`)

#### Configuration:
```bash
# Add to .env
VITE_GEMINI_API_KEY=AIzaSy...

# Add to Vercel
```

#### Security:
```bash
# In Google Cloud Console, restrict the API key:
# 1. Go to: APIs & Services → Credentials
# 2. Click your API key
# 3. Under "Application restrictions":
#    - Select "HTTP referrers (web sites)"
#    - Add: localhost:5173, *.vercel.app, psychage.com, *.psychage.com
# 4. Under "API restrictions":
#    - Select "Restrict key"
#    - Add: Generative Language API
# 5. Click "Save"
```

#### Testing:
```bash
curl "https://generativelanguage.googleapis.com/v1beta/models?key=$VITE_GEMINI_API_KEY"
```

Expected: List of available models

---

## 🟢 OPTIONAL - Phase 2+ Features

### 6. ThroughLine (Optional)

**Used For**:
- Real-time crisis helpline database
- Alternative to static fallback resources
- International crisis resource lookup

**Status**: Falls back to static resources (40+ countries) if not configured

**Pricing**: TBD (contact ThroughLine for pricing)

#### How to Get:
1. Contact: https://throughlinecare.com
2. Request API access
3. Provide use case (mental health platform, crisis detection)
4. Receive API key and base URL

#### Configuration:
```bash
# Add to .env
THROUGHLINE_API_KEY=[your-key]
THROUGHLINE_API_BASE_URL=https://api.throughlinecare.com/v1
```

#### Not Critical Because:
- ✅ Static fallback covers 40+ countries
- ✅ Fallback updated quarterly
- ✅ No user-facing degradation

---

### 7. Brave Search (Optional)

**Used For**:
- Web search fallback (Phase 2 feature)
- External source citations
- Real-time information

**Status**: Not implemented yet (Phase 2)

**Pricing**: Free tier available

#### How to Get:
1. Go to: https://brave.com/search/api/
2. Sign up for API access
3. Copy API key

---

### 8. Vercel KV (Optional)

**Used For**:
- Redis-compatible caching (Phase 2)
- Distributed rate limiting
- Response caching

**Status**: Currently uses in-memory caching

**Pricing**: Free on Hobby plan

#### How to Get:
1. Go to: Vercel Dashboard → Storage → KV
2. Click "Create Database"
3. Name it: "psychage-cache"
4. Environment variables auto-populate

---

### 9. Sentry (Optional)

**Used For**:
- Error tracking and monitoring
- Performance monitoring
- User session replay

**Pricing**: Free tier (5,000 errors/month)

#### How to Get:
1. Go to: https://sentry.io
2. Sign up or log in
3. Create new project: "Psychage V2"
4. Copy DSN: `https://...@sentry.io/...`

#### Configuration:
```bash
# Add to .env
NEXT_PUBLIC_SENTRY_DSN=https://...@sentry.io/...
SENTRY_AUTH_TOKEN=[your-auth-token]
```

---

## ✅ Configuration Checklist

### Step 1: Local Development
- [ ] Copy `.env.production.example` to `.env`
- [ ] Add Anthropic API key
- [ ] Add OpenAI API key
- [ ] Add Supabase URL and keys
- [ ] Add Sanity project ID and webhook secret
- [ ] Add Gemini API key (optional)
- [ ] Test with: `npm run dev`
- [ ] Verify with: `npm run verify:deployment`

### Step 2: Vercel Production
- [ ] Go to: Vercel Dashboard → Settings → Environment Variables
- [ ] Add ANTHROPIC_API_KEY (Production + Preview)
- [ ] Add OPENAI_API_KEY (Production + Preview)
- [ ] Add VITE_SUPABASE_URL (Production + Preview + Development)
- [ ] Add VITE_SUPABASE_ANON_KEY (Production + Preview + Development)
- [ ] Add SUPABASE_SERVICE_ROLE_KEY (Production only - CRITICAL: No VITE_ prefix!)
- [ ] Add VITE_SANITY_PROJECT_ID (All environments)
- [ ] Add VITE_SANITY_DATASET (All environments)
- [ ] Add VITE_SANITY_API_VERSION (All environments)
- [ ] Add SANITY_WEBHOOK_SECRET (Production only)
- [ ] Add VITE_GEMINI_API_KEY (All environments, optional)

### Step 3: Supabase Production
- [ ] Run migration: `20260303000003_mindmate_pgvector.sql`
- [ ] Run migration: `20260303000010_crisis_system_schema.sql`
- [ ] Verify tables exist (6 new tables)
- [ ] Enable RLS on all tables
- [ ] Configure authentication redirect URLs

### Step 4: Sanity Webhooks
- [ ] Create webhook pointing to production URL
- [ ] Set secret to match SANITY_WEBHOOK_SECRET
- [ ] Test webhook with content update

### Step 5: API Restrictions
- [ ] Restrict Gemini API to production domains
- [ ] Set up billing alerts on all paid APIs
- [ ] Configure rate limits if needed

---

## 🔒 Security Best Practices

### API Key Management
1. **Never commit keys to git**
   - Already in `.gitignore`
   - Use environment variables
   - Use Vercel Environment Variables for production

2. **Rotate keys regularly**
   - Monthly rotation recommended
   - Immediately rotate if compromised
   - Keep old key active for 24h during rotation

3. **Restrict API keys**
   - IP whitelisting when possible
   - Domain restrictions (Gemini)
   - Scope limitations (embeddings only for OpenAI)

4. **Monitor usage**
   - Set up billing alerts
   - Weekly usage reviews
   - Alert on anomalous spikes

5. **Use different keys for environments**
   - Development keys (free tier, rate limited)
   - Production keys (paid tier, higher limits)

### Secret Key Prefixing
- `VITE_` prefix: Exposed to client (public keys only)
- No prefix: Server-side only (secret keys)

**CRITICAL**: Never prefix service role keys with `VITE_`!

### Environment Variable Validation
```bash
# Run deployment verification
npm run verify:deployment

# Expected output:
# ✓ All critical variables configured
# ✓ All APIs reachable
# ✓ Database migrations complete
# ✓ Content ingested
```

---

## 💰 Cost Breakdown

### Minimum Viable Product (MVP)
| Service | Monthly Cost | Notes |
|---------|--------------|-------|
| Anthropic | $10-15 | 1,000 conversations |
| OpenAI | $0.50-1 | Embeddings only |
| Supabase | $0 | Free tier |
| Sanity | $0 | Free tier |
| Vercel | $0 | Hobby plan |
| **Total** | **$10-16** | |

### Scale (10,000 users)
| Service | Monthly Cost | Notes |
|---------|--------------|-------|
| Anthropic | $100-150 | 10,000 conversations |
| OpenAI | $5-10 | More queries |
| Supabase | $25 | Pro plan (2GB DB) |
| Sanity | $0-19 | May need Growth plan |
| Vercel | $20 | Pro plan |
| **Total** | **$150-204** | |

### Cost Optimization Tips
1. **Cache aggressively** - Reduce API calls
2. **Use free tiers** - Most services have generous free tiers
3. **Monitor usage** - Set up billing alerts
4. **Optimize prompts** - Shorter prompts = lower cost
5. **Consider batching** - Batch embeddings when possible

---

## 🚨 Troubleshooting

### "ANTHROPIC_API_KEY not found"
- Check `.env` file exists
- Verify key starts with `sk-ant-api03-`
- Restart dev server: `npm run dev`
- Check Vercel environment variables in production

### "OpenAI rate limit exceeded"
- Wait 1 minute
- Upgrade to paid tier
- Check for runaway loops
- Consider caching embeddings

### "Supabase connection failed"
- Verify URL format: `https://[project-id].supabase.co`
- Check anon key is valid (long JWT starting with `eyJ`)
- Ensure RLS policies allow access
- Check Supabase project is active (not paused)

### "Sanity webhook not firing"
- Verify webhook URL is correct (HTTPS required)
- Check secret matches SANITY_WEBHOOK_SECRET
- Test with "Trigger webhook" button in Sanity dashboard
- Check Vercel function logs for errors

---

## 📞 Support & Resources

### Anthropic
- Docs: https://docs.anthropic.com
- Support: https://console.anthropic.com/settings/support
- Status: https://status.anthropic.com

### OpenAI
- Docs: https://platform.openai.com/docs
- Support: https://help.openai.com
- Status: https://status.openai.com

### Supabase
- Docs: https://supabase.com/docs
- Support: https://supabase.com/support
- Status: https://status.supabase.com

### Sanity
- Docs: https://www.sanity.io/docs
- Support: https://www.sanity.io/help
- Status: https://status.sanity.io

---

## ✅ Final Checklist Before Launch

- [ ] All CRITICAL API keys configured
- [ ] Deployment verification passed
- [ ] Safety testing completed
- [ ] Database migrations run
- [ ] Content ingested (≥5 articles)
- [ ] Webhooks configured
- [ ] Billing alerts set up
- [ ] API keys restricted
- [ ] Error monitoring enabled (optional)
- [ ] Documentation reviewed

---

**Document Version**: 1.0
**Last Verified**: March 3, 2026
**Next Review**: After production deployment

---

**Remember**: Never commit API keys to git. Always use environment variables. Rotate keys regularly. Monitor usage and costs.
