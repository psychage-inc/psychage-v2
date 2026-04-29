# Clarity Score Backend - Verification Checklist

Use this checklist to verify the Clarity Score backend is working correctly.

## ✅ Local Setup Verification

### Step 1: Check Files Created

Run this command to verify all files exist:

```bash
cd /Users/raiyanabdullah/Desktop/psychage-v2

# Database
ls -la supabase/migrations/001_clarity_score.sql
ls -la supabase/seed.sql

# Edge Functions
ls -la supabase/functions/assessment-start/index.ts
ls -la supabase/functions/assessment-submit/index.ts
ls -la supabase/functions/assessment-history/index.ts
ls -la supabase/functions/assessment-detail/index.ts
ls -la supabase/functions/assessment-share/index.ts
ls -la supabase/functions/assessment-shared/index.ts
ls -la supabase/functions/health/index.ts

# Shared modules
ls -la supabase/functions/_shared/scoring.ts
ls -la supabase/functions/_shared/validation.ts
ls -la supabase/functions/_shared/clinical-flags.ts
ls -la supabase/functions/_shared/crisis-detection.ts
ls -la supabase/functions/_shared/encryption.ts
ls -la supabase/functions/_shared/rate-limiter.ts
ls -la supabase/functions/_shared/cors.ts
ls -la supabase/functions/_shared/errors.ts
ls -la supabase/functions/_shared/instruments.ts

# Tests
ls -la supabase/functions/_shared/__tests__/scoring.test.ts
ls -la supabase/functions/_shared/__tests__/clinical-flags.test.ts
ls -la supabase/functions/_shared/__tests__/crisis-detection.test.ts

# Scripts and docs
ls -la supabase/run-tests.sh
ls -la .github/workflows/clarity-score-backend.yml
ls -la CLARITY_SCORE_ARCHITECTURE.md
ls -la CLARITY_SCORE_DEPLOYMENT.md
ls -la CLARITY_SCORE_SUMMARY.md
```

**Expected:** All files should exist (no "No such file" errors)

---

### Step 2: Install Dependencies

```bash
# Install Supabase CLI (if not already installed)
brew install supabase/tap/supabase

# Install Deno (if not already installed)
brew install deno

# Verify installations
supabase --version  # Should show v1.x.x or higher
deno --version      # Should show deno 1.x.x or higher
```

---

### Step 3: Run Unit Tests

```bash
chmod +x supabase/run-tests.sh
./supabase/run-tests.sh
```

**Expected Output:**
```
🧪 Running Clarity Score Backend Tests...

Running: scoring
✓ All scoring tests passed!
✓ scoring passed

Running: clinical-flags
✓ All clinical flags tests passed!
✓ clinical-flags passed

Running: crisis-detection
✓ All crisis detection tests passed!
✓ crisis-detection passed

================================================
Test Summary
================================================
Passed: 3
Failed: 0

✓ All tests passed!
```

**If tests fail:**
- Check Deno version (must be 1.x or higher)
- Verify all test files are present
- Check for TypeScript errors: `deno check supabase/functions/_shared/*.ts`

---

### Step 4: Start Supabase Locally

```bash
supabase start
```

**Expected Output:**
```
Started supabase local development setup.

         API URL: http://localhost:54321
          DB URL: postgresql://postgres:postgres@localhost:54322/postgres
      Studio URL: http://localhost:54323
    Inbucket URL: http://localhost:54324
      JWT secret: super-secret-jwt-token-with-at-least-32-characters-long
        anon key: eyJ... (long JWT)
service_role key: eyJ... (long JWT)
```

**Save these values!** You'll need them for `.env.local`

**If it fails:**
- Ensure Docker is running
- Check port 54321-54324 aren't already in use: `lsof -i :54321`
- Try: `supabase stop && supabase start`

---

### Step 5: Create Environment File

```bash
# Create .env.local
cat > .env.local <<EOF
SUPABASE_URL=http://localhost:54321
SUPABASE_ANON_KEY=YOUR_ANON_KEY_FROM_STEP_4
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY_FROM_STEP_4
SHARE_ENCRYPTION_KEY=$(openssl rand -hex 32)
CORS_ORIGIN=http://localhost:3000
EOF

# Verify file created
cat .env.local
```

**Replace placeholders** with actual keys from Step 4 output.

---

### Step 6: Apply Database Migrations

```bash
supabase db push
```

**Expected Output:**
```
Applying migration 001_clarity_score.sql...
Finished supabase db push.
```

**Verify in Studio:**
1. Open http://localhost:54323
2. Go to Table Editor
3. You should see: profiles, assessments, assessment_responses, clarity_index_contributions, retake_gates, rate_limits, share_tokens

**If migration fails:**
- Check SQL syntax: `cat supabase/migrations/001_clarity_score.sql`
- Reset database: `supabase db reset` (WARNING: deletes all data)
- Re-run: `supabase db push`

---

### Step 7: Create Test User

**Option A: Via Studio (Recommended)**
1. Open http://localhost:54323
2. Go to Authentication → Users
3. Click "Add User"
4. Email: `test@example.com`
5. Password: `test123456`
6. Auto-confirm user: ✅
7. Click "Create User"
8. Note the user ID

**Option B: Via SQL**
```bash
supabase db execute - <<SQL
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role
)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000000',
  'test@example.com',
  crypt('test123456', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}'::jsonb,
  '{}'::jsonb,
  false,
  'authenticated'
)
ON CONFLICT (id) DO NOTHING;
SQL
```

**Verify:**
```sql
SELECT id, email FROM auth.users;
```

Should show your test user.

---

### Step 8: Seed Test Data

```bash
supabase db seed
```

**Expected Output:**
```
NOTICE:  Seed data inserted successfully!
NOTICE:  Test user ID: 00000000-0000-0000-0000-000000000001
NOTICE:  Assessments created: 5
NOTICE:  Assessment IDs: 10...001 through 50...005
NOTICE:  User can take new assessment (retake gate expired)
```

**Verify in Studio:**
```sql
SELECT COUNT(*) FROM assessments;  -- Should return 5
SELECT COUNT(*) FROM assessment_responses;  -- Should return 20
SELECT COUNT(*) FROM clarity_index_contributions;  -- Should return 5
```

---

### Step 9: Start Edge Functions

```bash
supabase functions serve --env-file .env.local
```

**Expected Output:**
```
Serving functions on http://localhost:54321/functions/v1/
 - assessment-start
 - assessment-submit
 - assessment-history
 - assessment-detail
 - assessment-share
 - assessment-shared
 - health
```

**Keep this terminal running!** Open a new terminal for tests.

---

### Step 10: Test Health Endpoint

```bash
curl http://localhost:54321/functions/v1/health
```

**Expected Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-03-03T...",
  "service": "clarity-score-backend",
  "version": "1.0.0"
}
```

**If it fails:**
- Ensure functions are running (Step 9)
- Check for port conflicts
- Try: `curl -v http://localhost:54321/functions/v1/health` for details

---

### Step 11: Get Test User Auth Token

**Option A: Via Supabase Client (in your frontend)**
```typescript
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'test@example.com',
  password: 'test123456'
})
const token = data.session.access_token
```

**Option B: Via cURL**
```bash
curl -X POST http://localhost:54321/auth/v1/token?grant_type=password \
  -H "Content-Type: application/json" \
  -H "apikey: YOUR_ANON_KEY" \
  -d '{
    "email": "test@example.com",
    "password": "test123456"
  }'
```

**Save the `access_token` from response!**

---

### Step 12: Test Start Assessment

```bash
# Replace YOUR_TOKEN with token from Step 11
curl -X POST http://localhost:54321/functions/v1/assessment/start \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"language": "en"}'
```

**Expected Response (201):**
```json
{
  "assessment_id": "some-uuid",
  "started_at": "2026-03-03T...",
  "instruments": [
    {
      "id": "phq4",
      "label": "Emotional Wellness",
      "items": [...]
    },
    // ... 4 more instruments
  ]
}
```

**Save the `assessment_id`!**

---

### Step 13: Test Submit Assessment

```bash
# Replace YOUR_TOKEN and ASSESSMENT_ID
curl -X POST http://localhost:54321/functions/v1/assessment/submit \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "assessment_id": "ASSESSMENT_ID",
    "responses": {
      "phq2_1": 1, "phq2_2": 1, "gad2_1": 1, "gad2_2": 1,
      "who5_1": 3, "who5_2": 3, "who5_3": 3, "who5_4": 3, "who5_5": 3,
      "ucla_1": 1, "ucla_2": 1, "ucla_3": 1,
      "pss_1": 1, "pss_2": 3, "pss_3": 3, "pss_4": 1,
      "func_1": 1, "func_2": 1, "func_3": 1, "func_4": 1
    }
  }'
```

**Expected Response (200):**
```json
{
  "assessment_id": "...",
  "completed_at": "2026-03-03T...",
  "scores": {
    "total": 73,
    "label": "balanced",
    "domains": { ... },
    "clinical_subscores": { ... },
    "clinical_flags": [],
    "crisis_detected": false
  },
  "retake": {
    "next_available_at": "2026-03-10T...",
    "recommended_at": "2026-03-17T..."
  }
}
```

**Verify total_score is between 0-100.**

---

### Step 14: Test History Endpoint

```bash
curl -X GET "http://localhost:54321/functions/v1/assessment/history?limit=10&offset=0" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Expected Response (200):**
```json
{
  "assessments": [
    {
      "id": "...",
      "completed_at": "2026-03-03T...",
      "total_score": 73,
      "score_label": "balanced",
      "domains": { ... },
      "clinical_flags": [],
      "crisis_detected": false
    },
    // ... 5 more from seed data
  ],
  "total_count": 6,
  "retake": { ... },
  "trends": {
    "total_change": +1,
    "improving_domains": [...],
    "declining_domains": [...],
    "stable_domains": [...]
  }
}
```

**Should show 6 assessments** (5 from seed + 1 from Step 13).

---

### Step 15: Test Retake Gate

```bash
# Try to start another assessment immediately
curl -X POST http://localhost:54321/functions/v1/assessment/start \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"language": "en"}'
```

**Expected Response (409):**
```json
{
  "error": {
    "code": "RETAKE_TOO_SOON",
    "message": "Next assessment available on ...",
    "details": {
      "next_available_at": "2026-03-10T...",
      "days_remaining": 7
    }
  }
}
```

**Retake gate is working!** ✅

---

### Step 16: Test Rate Limiting

```bash
# Run this 11 times quickly
for i in {1..11}; do
  curl -X POST http://localhost:54321/functions/v1/assessment/start \
    -H "Authorization: Bearer YOUR_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"language": "en"}'
  echo ""
done
```

**Expected:** First 10 should return 409 (retake gate), 11th should return 429 (rate limited).

**Rate limiting is working!** ✅

---

## ✅ Production Deployment Verification

### Step 1: Link to Production

```bash
supabase link --project-ref YOUR_PROJECT_REF
```

**Expected:** "Linked to project YOUR_PROJECT_REF"

---

### Step 2: Deploy Database

```bash
supabase db push --linked
```

**Expected:** Migration applied successfully.

---

### Step 3: Set Secrets

```bash
supabase secrets set SHARE_ENCRYPTION_KEY=$(openssl rand -hex 32)
supabase secrets set CORS_ORIGIN=https://psychage.com

# Verify
supabase secrets list
```

**Expected:** Both secrets listed.

---

### Step 4: Deploy Functions

```bash
supabase functions deploy
```

**Expected:**
```
Deploying 7 functions...
✓ assessment-start deployed
✓ assessment-submit deployed
✓ assessment-history deployed
✓ assessment-detail deployed
✓ assessment-share deployed
✓ assessment-shared deployed
✓ health deployed
```

---

### Step 5: Verify Production Health

```bash
curl https://YOUR_PROJECT_REF.supabase.co/functions/v1/health
```

**Expected:**
```json
{
  "status": "ok",
  "timestamp": "...",
  "service": "clarity-score-backend",
  "version": "1.0.0"
}
```

**Production is live!** 🎉

---

## ✅ Final Checklist

Mark each item as completed:

### Files
- [ ] All 23+ files created (migrations, functions, tests, docs)
- [ ] No syntax errors in TypeScript files
- [ ] No SQL errors in migration file

### Local Development
- [ ] Supabase starts without errors
- [ ] Database migrations apply successfully
- [ ] All 7 tables created with RLS enabled
- [ ] Test user created
- [ ] Seed data inserted (5 assessments)
- [ ] Edge Functions serve without errors
- [ ] Unit tests pass (47 tests, 0 failures)

### API Testing
- [ ] Health endpoint returns 200
- [ ] Start assessment returns 201 with instrument definitions
- [ ] Submit assessment returns 200 with scores
- [ ] History endpoint returns 200 with assessments
- [ ] Retake gate blocks immediate retakes (409)
- [ ] Rate limiting kicks in after 10 requests (429)
- [ ] Share creation returns encrypted token
- [ ] Share retrieval decrypts correctly

### Security
- [ ] RLS prevents cross-user access
- [ ] Server-side scoring matches client-side
- [ ] Crisis detection triggers at correct thresholds
- [ ] Clinical flags fire at exact cutoffs
- [ ] Encryption key is 64 hex characters
- [ ] CORS configured for allowed origins only

### Production
- [ ] Linked to production project
- [ ] Database deployed successfully
- [ ] Secrets set (encryption key, CORS origin)
- [ ] All 7 functions deployed
- [ ] Production health check passes
- [ ] CI/CD workflow configured (GitHub Actions)

---

## 🐛 Common Issues & Solutions

### Issue: Supabase won't start
**Solution:**
```bash
# Stop and reset
supabase stop
docker system prune -a  # WARNING: removes all unused Docker data
supabase start
```

### Issue: Migrations fail
**Solution:**
```bash
# Reset database (WARNING: deletes all data)
supabase db reset

# Re-apply migrations
supabase db push
```

### Issue: Functions don't deploy
**Solution:**
```bash
# Check for TypeScript errors
deno check supabase/functions/*/index.ts

# Update Supabase CLI
brew upgrade supabase

# Try deploying one function at a time
supabase functions deploy assessment-start
```

### Issue: Tests fail
**Solution:**
```bash
# Update Deno
brew upgrade deno

# Run individual test for details
deno test --allow-net --allow-env supabase/functions/_shared/__tests__/scoring.test.ts
```

### Issue: Auth token invalid
**Solution:**
- Token expires after 1 hour - get a new one
- Ensure using correct anon key in headers
- Check user is confirmed in auth.users table

---

## 📊 Success Criteria

**All green?** You're ready for production! 🚀

If any checklist items are unchecked:
1. Review error messages carefully
2. Check relevant documentation section
3. Try common issue solutions above
4. Review code for typos/syntax errors

**Questions?** Refer to:
- [CLARITY_SCORE_ARCHITECTURE.md](./CLARITY_SCORE_ARCHITECTURE.md) for technical details
- [CLARITY_SCORE_DEPLOYMENT.md](./CLARITY_SCORE_DEPLOYMENT.md) for deployment steps
- [CLARITY_SCORE_SUMMARY.md](./CLARITY_SCORE_SUMMARY.md) for quick reference

---

**Verification completed:** [Date]
**Verified by:** [Your name]
**Status:** ✅ Ready for production / ⚠️ Issues found (see notes)

**Notes:**
