# Clarity Score Backend - Deployment Guide

Complete deployment guide for the Clarity Score assessment system backend.

## Prerequisites

- [Supabase CLI](https://supabase.com/docs/guides/cli) installed (`brew install supabase/tap/supabase`)
- [Deno](https://deno.land/) installed for local testing
- Supabase project created (either locally or on Supabase Cloud)
- Git repository initialized

## Local Development Setup

### 1. Initialize Supabase

```bash
cd /Users/raiyanabdullah/Desktop/psychage-v2
supabase init
```

This creates the `supabase/` directory structure (if not already present).

### 2. Start Local Supabase

```bash
supabase start
```

**Important:** Save the output! You'll see:
- API URL: `http://localhost:54321`
- Studio URL: `http://localhost:54323` (Supabase Dashboard)
- Anon Key: `eyJ...` (for client-side auth)
- Service Role Key: `eyJ...` (for server-side operations)
- Database URL: `postgresql://postgres:postgres@localhost:54322/postgres`

### 3. Configure Environment Variables

Create `.env.local`:

```bash
SUPABASE_URL=http://localhost:54321
SUPABASE_ANON_KEY=<anon-key-from-step-2>
SUPABASE_SERVICE_ROLE_KEY=<service-role-key-from-step-2>
SHARE_ENCRYPTION_KEY=$(openssl rand -hex 32)
CORS_ORIGIN=http://localhost:3000
```

### 4. Apply Database Migrations

```bash
supabase db push
```

This creates all tables, indexes, RLS policies, and triggers from `supabase/migrations/001_clarity_score.sql`.

### 5. Seed Test Data

```bash
supabase db seed
```

**Note:** Before seeding, create a test user:

```bash
# Open Supabase Studio
open http://localhost:54323

# Navigate to: Authentication > Users > Add User
# Email: test@example.com
# Password: test123456
# User ID: 00000000-0000-0000-0000-000000000001 (manually set in SQL)
```

Or via SQL in Studio:

```sql
-- In SQL Editor
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
);
```

Then run `supabase db seed`.

### 6. Run Unit Tests

```bash
# Make test script executable
chmod +x supabase/run-tests.sh

# Run all tests
./supabase/run-tests.sh
```

Expected output:
```
🧪 Running Clarity Score Backend Tests...
✓ scoring passed
✓ clinical-flags passed
✓ crisis-detection passed

Test Summary
Passed: 3
Failed: 0
✓ All tests passed!
```

### 7. Start Edge Functions Locally

```bash
supabase functions serve --env-file .env.local
```

Functions will be available at:
- `http://localhost:54321/functions/v1/health`
- `http://localhost:54321/functions/v1/assessment/start`
- `http://localhost:54321/functions/v1/assessment/submit`
- etc.

### 8. Test with cURL

**Health Check:**
```bash
curl http://localhost:54321/functions/v1/health
```

**Start Assessment (requires auth):**
```bash
# First, get auth token
# Login via Supabase client or Studio, copy the access_token

curl -X POST http://localhost:54321/functions/v1/assessment/start \
  -H "Authorization: Bearer <your-access-token>" \
  -H "Content-Type: application/json" \
  -d '{"language": "en"}'
```

## Production Deployment to Supabase Cloud

### 1. Create Production Project

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Click "New Project"
3. Choose organization, project name, database password, region
4. Wait for project to provision (~2 minutes)

### 2. Link Local Project to Production

```bash
supabase link --project-ref <your-project-ref>
```

Get project ref from Supabase Dashboard > Project Settings > General > Reference ID.

You'll be prompted to enter your database password.

### 3. Set Production Secrets

```bash
# Generate secure encryption key
ENCRYPTION_KEY=$(openssl rand -hex 32)

# Set secrets (stored encrypted in Supabase)
supabase secrets set SHARE_ENCRYPTION_KEY=$ENCRYPTION_KEY
supabase secrets set CORS_ORIGIN=https://psychage.com

# Verify secrets are set
supabase secrets list
```

### 4. Deploy Database Schema

```bash
# Apply migrations to production
supabase db push --linked
```

**Warning:** This will modify your production database. Review migrations first!

### 5. Deploy Edge Functions

```bash
# Deploy all functions
supabase functions deploy

# Or deploy individually
supabase functions deploy assessment-start
supabase functions deploy assessment-submit
supabase functions deploy assessment-history
supabase functions deploy assessment-detail
supabase functions deploy assessment-share
supabase functions deploy assessment-shared
supabase functions deploy health
```

### 6. Verify Deployment

```bash
# Get production URL
SUPABASE_URL=$(supabase status --linked | grep "API URL" | awk '{print $3}')

# Test health endpoint
curl $SUPABASE_URL/functions/v1/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2026-03-03T...",
  "service": "clarity-score-backend",
  "version": "1.0.0"
}
```

### 7. Configure Frontend

Update your frontend (Next.js, React, etc.) environment variables:

```env
# .env.production
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
```

Get the anon key from: Supabase Dashboard > Project Settings > API > Project API keys > `anon` `public`

### 8. Setup Authentication

In Supabase Dashboard > Authentication > Providers:

1. **Email**: Enable email/password auth
2. **Google OAuth** (optional):
   - Enable Google provider
   - Add OAuth client ID and secret from Google Cloud Console
   - Add authorized redirect URI: `https://<project-ref>.supabase.co/auth/v1/callback`

### 9. Configure CORS (if needed)

CORS is handled in Edge Functions via the `cors.ts` shared module. The `CORS_ORIGIN` secret controls allowed origins.

To allow multiple origins:
```bash
supabase secrets set CORS_ORIGIN="https://psychage.com,https://www.psychage.com"
```

### 10. Setup Database Backups

Supabase Cloud automatically backs up databases daily. To verify:

Supabase Dashboard > Database > Backups

Configure:
- Backup schedule (default: daily)
- Retention period (default: 7 days on free tier, configurable on Pro)

## Monitoring & Observability

### View Edge Function Logs

```bash
# Stream logs for all functions
supabase functions logs

# Stream logs for specific function
supabase functions logs assessment-submit

# View logs in dashboard
# Supabase Dashboard > Edge Functions > Select function > Logs
```

### Database Monitoring

Supabase Dashboard > Database > Logs

Monitor:
- Query performance
- Slow queries (>1s)
- Connection pool usage
- Disk usage

### Set Up Alerts (Pro/Team plans)

Supabase Dashboard > Project Settings > Alerts

Configure alerts for:
- High error rate in Edge Functions
- Database CPU usage > 80%
- Disk usage > 80%
- Connection pool exhaustion

## CI/CD with GitHub Actions

Create `.github/workflows/deploy-backend.yml`:

```yaml
name: Deploy Clarity Score Backend

on:
  push:
    branches:
      - main
    paths:
      - 'supabase/**'
  pull_request:
    paths:
      - 'supabase/**'

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Deno
        uses: denoland/setup-deno@v1
        with:
          deno-version: v1.x

      - name: Run unit tests
        run: |
          chmod +x supabase/run-tests.sh
          ./supabase/run-tests.sh

  deploy:
    runs-on: ubuntu-latest
    needs: test
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3

      - uses: supabase/setup-cli@v1
        with:
          version: latest

      - name: Deploy database migrations
        run: supabase db push --linked
        env:
          SUPABASE_ACCESS_TOKEN: ${{ secrets.SUPABASE_ACCESS_TOKEN }}
          SUPABASE_DB_PASSWORD: ${{ secrets.SUPABASE_DB_PASSWORD }}
          SUPABASE_PROJECT_ID: ${{ secrets.SUPABASE_PROJECT_ID }}

      - name: Deploy Edge Functions
        run: supabase functions deploy
        env:
          SUPABASE_ACCESS_TOKEN: ${{ secrets.SUPABASE_ACCESS_TOKEN }}
          SUPABASE_PROJECT_ID: ${{ secrets.SUPABASE_PROJECT_ID }}
```

**Required GitHub Secrets:**
1. `SUPABASE_ACCESS_TOKEN`: Generate from Supabase Dashboard > Account > Access Tokens
2. `SUPABASE_DB_PASSWORD`: Your database password
3. `SUPABASE_PROJECT_ID`: Your project reference ID

## Troubleshooting

### Functions not deploying

```bash
# Check function syntax
deno check supabase/functions/*/index.ts

# Verify Supabase CLI is latest
supabase --version
brew upgrade supabase

# Re-link project
supabase link --project-ref <ref>
```

### RLS blocking requests

```bash
# Check RLS policies in Studio
# Supabase Dashboard > Table Editor > Select table > Policies

# Test RLS with SQL
SELECT * FROM assessments WHERE user_id = auth.uid();
```

### Rate limits not working

Check `rate_limits` table exists:
```sql
SELECT * FROM rate_limits LIMIT 1;
```

If missing, re-run migration:
```bash
supabase db push
```

### CORS errors

Check `CORS_ORIGIN` secret matches your frontend URL:
```bash
supabase secrets list
```

Update if needed:
```bash
supabase secrets set CORS_ORIGIN=https://your-frontend.com
```

### Encryption errors

Verify encryption key is exactly 64 hex characters:
```bash
# Check current key
supabase secrets list | grep SHARE_ENCRYPTION_KEY

# Generate new key
openssl rand -hex 32
```

## Performance Optimization

### Database Indexes

All critical indexes are in the migration. To add more:

```sql
-- Example: Index on assessment created_at for analytics
CREATE INDEX idx_assessments_created_at ON assessments(created_at DESC);
```

### Edge Function Cold Starts

Supabase Edge Functions use Deno Deploy. Cold start times are typically <100ms.

To minimize:
- Keep function size small (current functions are <50KB)
- Minimize imports (use Deno's standard library)
- Use connection pooling (Supabase client handles this)

### Database Connection Pooling

Supabase uses PgBouncer in transaction mode. Each Edge Function invocation gets a connection from the pool.

Default limits:
- Free tier: 60 connections
- Pro tier: 200 connections
- Team tier: 400 connections

Monitor in Dashboard > Database > Connection Pooling.

## Security Checklist

Before going live:

- [ ] RLS policies tested and working
- [ ] Service role key stored securely (never in client code)
- [ ] Encryption key rotated from development key
- [ ] CORS limited to production domains only
- [ ] Rate limiting configured
- [ ] Database backups verified
- [ ] Auth providers configured (Google OAuth, email confirmation)
- [ ] SSL/TLS enforced (Supabase does this automatically)
- [ ] No sensitive data in error responses (production mode)
- [ ] Crisis logs contain no PII
- [ ] Share links expire and are one-time use

## Rollback Procedure

If deployment causes issues:

1. **Rollback database:**
   ```bash
   # Restore from backup
   # Supabase Dashboard > Database > Backups > Restore
   ```

2. **Rollback functions:**
   ```bash
   # Redeploy from previous commit
   git checkout <previous-commit>
   supabase functions deploy
   ```

3. **Revert migrations:**
   ```bash
   # Supabase doesn't support automatic migration rollback
   # Write a new migration that undoes changes
   ```

## Support & Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [Deno Documentation](https://deno.land/manual)
- [PostgreSQL RLS Guide](https://www.postgresql.org/docs/current/ddl-rowsecurity.html)

---

**Deployment Status**: Ready for production ✅

Last updated: 2026-03-03
