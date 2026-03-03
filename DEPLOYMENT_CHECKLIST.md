# Production Deployment Checklist

**Status**: ✅ Ready to Deploy (pending environment setup)
**Last Updated**: March 3, 2026

---

## Quick Reference

### What Was Completed ✅

1. **EmergencyModal Component** - Full UI with crisis resources
2. **Crisis Companion API** - Anthropic Claude integration with rate limiting
3. **Mood Log API** - Supabase persistence
4. **AI Portable Text Parsing** - Full body content embedding
5. **Crisis Content Detection** - Automatic crisis flagging
6. **Crisis Event Logging** - API endpoint integration complete

### Test Coverage ✅

```
✓ Crisis Detection: 13/13 tests
✓ Safety Plan: 8/8 tests
✓ Geo Detection: 7/7 tests
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Total: 28/28 (100%)
```

---

## Pre-Deployment Steps

### 1. Environment Variables

Add these to **Vercel → Project → Settings → Environment Variables**:

```bash
# Anthropic API (Crisis Companion)
ANTHROPIC_API_KEY=sk-ant-api03-...

# Supabase (Database)
VITE_SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Sanity CMS (Content)
SANITY_WEBHOOK_SECRET=your-webhook-secret
```

**Get API Keys**:
- Anthropic: https://console.anthropic.com/settings/keys
- Supabase: Project Settings → API → service_role (secret)
- Sanity: Project Settings → API → Webhooks

### 2. Database Migration

Run in **Supabase → SQL Editor**:

```sql
-- Verify tables exist
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN ('crisis_events', 'mood_logs', 'psychage_embeddings');

-- If missing, run migration file:
-- supabase/migrations/20260303000010_crisis_system_schema.sql
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

# Crisis Companion API
curl -X POST https://YOUR_DOMAIN/api/crisis-companion \
  -H "Content-Type: application/json" \
  -d '{"tier":1,"context":"test","locale":"en","countryCode":"US","sessionTurn":1}'

# Mood Log API
curl -X POST https://YOUR_DOMAIN/api/mood-log \
  -H "Content-Type: application/json" \
  -d '{"mood_level":3,"user_id_hash":"a".repeat(64),"country_code":"US"}'

# Crisis Event API
curl -X POST https://YOUR_DOMAIN/api/crisis-event \
  -H "Content-Type: application/json" \
  -d '{"tier":1,"country_code":"US","detected_language":"en","session_id":"test123","throughline_resource_shown":false}'
```

Expected: All return 200/201 status

### 2. Database Verification

```sql
-- Check crisis events
SELECT COUNT(*) FROM crisis_events;

-- Check mood logs
SELECT COUNT(*) FROM mood_logs;

-- Verify recent entries
SELECT * FROM crisis_events ORDER BY triggered_at DESC LIMIT 5;
SELECT * FROM mood_logs ORDER BY logged_at DESC LIMIT 5;
```

### 3. Frontend Testing

**Test Crisis Detection**:
1. Navigate to `/tools/symptom-navigator` or any input field
2. Type: "I want to hurt myself"
3. Verify EmergencyModal appears with:
   - Red accent bar
   - ShieldAlert icon
   - Crisis resources (988 Lifeline, Crisis Text Line, etc.)
   - Two dismissal buttons

**Test Crisis Companion**:
1. Trigger crisis detection (Tier 1-3)
2. Verify AI response appears (if integrated into UI)
3. Check response quality and tone

**Test Mood Logging**:
1. Navigate to mood tracker
2. Log a mood (0-5)
3. Verify entry appears in database

---

## Monitoring (First 24 Hours)

### Vercel Logs

**Vercel Dashboard → Deployments → [Latest] → Functions**

Watch for:
- `[Crisis Companion API Error]`
- `[Mood Log API Error]`
- `[Crisis Event API Error]`
- `[Anthropic API Error]`
- Rate limit hits (429 status)

### Supabase Logs

**Supabase Dashboard → Logs → Postgres**

Watch for:
- Insert errors
- Connection timeouts
- Schema mismatches

### Anthropic Usage

**Anthropic Console → Usage**

Monitor:
- API calls per day
- Token usage
- Error rates
- Latency

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

1. **Rate Limiting**: In-memory store (resets on function restart)
   - Solution: Users see supportive message on limit
   - Future: Consider Redis for distributed rate limiting

2. **ThroughLine API**: Uses static fallback resources
   - Solution: Fallback covers 10+ countries (US, GB, CA, AU, etc.)
   - Future: Integrate real ThroughLine API when keys available

3. **Component Placeholders**: Some UI components have TODOs
   - Not user-facing yet (SafetyPlanBuilder, GentleCheckIn, etc.)
   - Can be completed post-launch

---

## Success Criteria

### Must Pass Before Launch

- [x] All 28 tests passing
- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] Health checks pass
- [ ] EmergencyModal displays correctly
- [ ] Crisis Companion returns responses
- [ ] Mood logs save to database
- [ ] Crisis events log to database

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
- `src/crisis/components/EmergencyModal.tsx` - Crisis modal
- `api/crisis-companion/index.ts` - AI responses
- `api/mood-log/index.ts` - Mood persistence
- `api/crisis-event/index.ts` - Event logging
- `src/crisis/lib/crisisLogger.ts` - Client-side logger

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
