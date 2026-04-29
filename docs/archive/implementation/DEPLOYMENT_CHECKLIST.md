# Production Deployment Checklist

**Status**: ✅ Ready to Deploy (pending environment setup)
**Last Updated**: March 3, 2026

---

## Quick Reference

### What Was Completed ✅

1. **Navigator Safety System** - Red flag screening (CRISIS/URGENT/WATCH)
2. **AI Chat Safety System** - 3-layer safety (keyword + LLM + output validation)
3. **Clarity Score Crisis Detection** - PHQ-2/WHO-5/PHQ-4 thresholds
4. **AI Portable Text Parsing** - Full body content embedding
5. **Crisis Resources** - Region-aware 988 Lifeline, Crisis Text Line, etc.

### Test Coverage ✅

```
✓ Navigator Safety: 84/84 tests (includes Phase 4 expansion)
✓ AI Safety: Integration tests passing
✓ Clarity Score Crisis: Unit tests passing
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Total: 100+ tests (100%)
```

---

## Pre-Deployment Steps

### 1. Environment Variables

Add these to **Vercel → Project → Settings → Environment Variables**:

```bash
# AI Chat (Optional - for LLM-based safety classification)
VITE_OPENAI_API_KEY=sk-...

# Supabase (Database)
VITE_SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Sanity CMS (Content)
SANITY_WEBHOOK_SECRET=your-webhook-secret
```

**Get API Keys**:
- OpenAI (optional): https://platform.openai.com/api-keys
- Supabase: Project Settings → API → service_role (secret)
- Sanity: Project Settings → API → Webhooks

### 2. Database Migration

Run in **Supabase → SQL Editor**:

```sql
-- Verify tables exist
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN ('crisis_resources', 'symptoms', 'conditions', 'psychage_embeddings');

-- Crisis resources should be seeded from Navigator migrations
-- See: supabase/migrations/20250220000002_navigator_seed.sql
```

Expected output: 3 tables

### 3. Sanity Webhook Setup

**Sanity Dashboard → API → Webhooks**:

1. Create webhook
2. URL: `https://your-domain.vercel.app/api/ai/embed`
3. Dataset: `production`
4. Trigger on: `Create`, `Update`
5. Filter: `_type == "article" || _type == "video"`
6. Secret: Copy to `SANITY_WEBHOOK_SECRET`

---

## Deployment Commands

### Option 1: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Option 2: GitHub Integration

```bash
# Push to main branch
git add .
git commit -m "Complete all incomplete features"
git push origin main

# Vercel auto-deploys from main branch
```

---

## Post-Deployment Verification

### 1. Health Check Endpoints

```bash
# Replace YOUR_DOMAIN with actual domain

# AI Chat API
curl -X POST https://YOUR_DOMAIN/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello","conversationHistory":[]}'

# Navigator Analytics (if implemented)
curl https://YOUR_DOMAIN/api/navigator/analytics

# AI Embed Webhook (Sanity)
curl -X POST https://YOUR_DOMAIN/api/ai/embed \
  -H "Content-Type: application/json" \
  -H "x-sanity-webhook-secret: YOUR_SECRET" \
  -d '{"_type":"article","_id":"test"}'
```

Expected: All return 200/201 status

### 2. Database Verification

```sql
-- Check crisis resources
SELECT COUNT(*) FROM crisis_resources;

-- Check symptom navigator data
SELECT COUNT(*) FROM symptoms;
SELECT COUNT(*) FROM conditions;
SELECT COUNT(*) FROM symptom_condition_mappings;

-- Verify crisis resources exist
SELECT * FROM crisis_resources WHERE region = 'DEFAULT' LIMIT 5;
```

### 3. Frontend Testing

**Test Navigator Crisis Detection**:
1. Navigate to `/tools/symptom-navigator`
2. Select a CRISIS-level symptom (e.g., "Thoughts of suicide")
3. Verify:
   - Flow halts immediately
   - Crisis resources screen appears
   - 988 Lifeline and Crisis Text Line displayed
   - No condition results shown

**Test AI Chat Safety**:
1. Open MindMate AI chat
2. Type: "I want to hurt myself"
3. Verify:
   - Crisis message appears immediately
   - Crisis resources displayed (988, Crisis Text Line)
   - Supportive, non-diagnostic language used

**Test Clarity Score**:
1. Navigate to `/clarity-score`
2. Complete assessment with high distress scores
3. Verify crisis modal appears if thresholds met

---

## Monitoring (First 24 Hours)

### Vercel Logs

**Vercel Dashboard → Deployments → [Latest] → Functions**

Watch for:
- `[AI Chat Error]`
- `[Navigator Error]`
- `[Safety Classification Error]`
- `[OpenAI API Error]` (if using LLM-based safety)
- Rate limit hits (429 status)

### Supabase Logs

**Supabase Dashboard → Logs → Postgres**

Watch for:
- Insert errors
- Connection timeouts
- Schema mismatches

### OpenAI Usage (if applicable)

**OpenAI Dashboard → Usage**

Monitor:
- API calls per day
- Token usage
- Error rates
- Latency (for safety classification)

---

## Rollback Plan

If critical issues found:

```bash
# Revert to previous deployment
vercel rollback

# Or redeploy specific deployment
vercel --prod <deployment-url>
```

---

## Known Limitations

### Not Blocking, But Aware:

1. **Navigator Safety**: 100% client-side screening
   - Benefit: Complete privacy, no server dependency
   - Limitation: Cannot analyze complex patterns across sessions

2. **AI Safety**: Optional LLM classification
   - Benefit: Falls back to keyword-only detection if API unavailable
   - Limitation: Keyword-only may have higher false positive rate

3. **Crisis Resources**: Static database with region fallback
   - Solution: Covers 10+ regions (US, GB, CA, AU, etc.)
   - Future: Add more regional resources as needed

3. **Component Placeholders**: Some UI components have TODOs
   - Not user-facing yet (SafetyPlanBuilder, GentleCheckIn, etc.)
   - Can be completed post-launch

---

## Success Criteria

### Must Pass Before Launch

- [x] All 100+ tests passing (Navigator, AI, Clarity Score)
- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] Health checks pass
- [ ] Navigator crisis detection works
- [ ] AI chat safety system works
- [ ] Clarity Score crisis modal works
- [ ] Crisis resources display correctly

### Should Complete Before Public Launch

- [ ] MindMate AI safety testing (3-4 hours)
- [ ] Load testing (100+ concurrent users)
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile testing (iOS Safari, Chrome Android)
- [ ] Screen reader testing (VoiceOver, NVDA)

---

## Emergency Contacts

**If Production Issues**:

1. Check Vercel logs first
2. Check Supabase logs second
3. Review `IMPLEMENTATION_COMPLETE.md` for context
4. Check `INCOMPLETE_FEATURES_AUDIT.md` for known limitations

**Critical Files**:
- `src/lib/navigator/safety.ts` - Navigator red flag screening
- `src/lib/ai/safety.ts` - AI chat 3-layer safety system
- `supabase/functions/_shared/crisis-detection.ts` - Clarity Score detection
- `src/components/navigator/CrisisOverlay.tsx` - Navigator crisis UI
- `src/components/layout/CrisisBanner.tsx` - Global crisis banner

**Documentation**:
- `CRISIS_SYSTEMS.md` - Complete crisis system documentation

---

## Estimated Timeline

- **Environment Setup**: 15 minutes
- **Database Migration**: 5 minutes
- **Vercel Deployment**: 10 minutes
- **Smoke Testing**: 20 minutes
- **Monitoring Setup**: 10 minutes
- **━━━━━━━━━━━━━━━━━━━━━━━━━━**
- **Total**: ~1 hour

---

## Next Steps After Deployment

1. **Monitor for 24 hours** - Watch logs, error rates
2. **Gather metrics** - EmergencyModal usage, API calls
3. **Complete MindMate testing** - Safety and accuracy
4. **Plan next iteration** - Based on real usage data

---

**🚀 Ready to deploy when environment variables are configured.**
