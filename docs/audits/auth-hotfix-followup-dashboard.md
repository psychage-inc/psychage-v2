# Auth Hotfix — Follow-up Dashboard Checklist

Companion to `security/auth-hotfix-2026-04-23` branch. The code-side
fixes are committed and tested; the items below require manual
configuration in the Supabase / Cloudflare / Vercel / DNS dashboards
that the hotfix could not reach.

Each item should be checked off, with verification evidence captured
inline (screenshot path, SQL query result, etc.).

---

## 1. Database — apply migrations and verify

- [ ] Apply `supabase/migrations/20260423000001_harden_admin_role_checks.sql`
- [ ] Apply `supabase/migrations/20260423000002_fix_articles_rls.sql`
- [ ] Verify `is_admin()` and `is_admin_writer()` were redefined:
  ```sql
  SELECT pg_get_functiondef('public.is_admin()'::regprocedure);
  -- Body must NOT contain "user_metadata"
  ```
- [ ] Verify the `auth.users` strip trigger exists:
  ```sql
  SELECT trigger_name FROM information_schema.triggers
  WHERE event_object_schema = 'auth'
    AND event_object_table = 'users'
    AND trigger_name = 'strip_user_metadata_role_trg';
  ```
- [ ] Confirm `migrate_admin_role(uuid, text, text)` is registered:
  ```sql
  SELECT proname FROM pg_proc WHERE proname = 'migrate_admin_role';
  ```
- [ ] Verify articles RLS reads the new policy names (no
  `Authenticated write articles` etc.):
  ```sql
  SELECT polname FROM pg_policy WHERE polrelid = 'public.articles'::regclass;
  ```

---

## 2. Admin role data migration — `scripts/migrate-admin-roles.ts`

**Reviewer runs this. Do not skip the dry-run.**

- [ ] Take a Supabase database backup (Dashboard → Database → Backups)
- [ ] Run dry-run against production:
  ```
  SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... \
    pnpm tsx scripts/migrate-admin-roles.ts --dry-run
  ```
- [ ] Inspect the State A/B/C/D distribution. Decide for each State B
      user whether to promote (manually run `migrate_admin_role(uuid,
      'promote', 'super_admin' | 'clinical_admin')`) or accept demotion
- [ ] Re-run dry-run after promotions; State B count should be the
      ones intentionally demoted
- [ ] Execute (production guard):
  ```
  NODE_ENV=production SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... \
    pnpm tsx scripts/migrate-admin-roles.ts --execute --i-know-what-im-doing
  ```
- [ ] Confirm zero users have stale metadata:
  ```sql
  SELECT count(*) FROM auth.users
   WHERE raw_user_meta_data ? 'role';
  -- Expected: 0
  ```
- [ ] Spot-check the audit trail:
  ```sql
  SELECT action, resource_id, metadata, created_at
    FROM admin_audit_log
   WHERE action = 'AUTH-001-migration'
   ORDER BY created_at DESC LIMIT 20;
  ```

---

## 3. Cloudflare Turnstile (AUTH-029)

- [ ] Create a Turnstile site at https://dash.cloudflare.com → Turnstile
- [ ] Add domain(s): `psychage.com`, `admin.psychage.com`, Vercel
      preview wildcards (`*.vercel.app` if used)
- [ ] Copy the **site key** (public) and **secret key** (private)
- [ ] In Vercel → Project → Environment Variables: set
      `VITE_TURNSTILE_SITE_KEY=<site key>` for production + preview
- [ ] In Supabase Dashboard → Authentication → Providers → "Captcha
      Protection": enable Turnstile, paste the **secret key**
- [ ] Smoke test: open production signup in incognito, verify the
      Turnstile widget renders, complete the challenge, confirm signup
      succeeds. Then attempt signup with the widget unfilled —
      Supabase should reject with "captcha verification failed"

---

## 4. Password-change notification (AUTH-028)

- [ ] Choose transactional email provider. Resend is plumbed in by
      default at `supabase/functions/password-change-notification/index.ts`
- [ ] Verify sender domain (DKIM, SPF, DMARC at p=quarantine minimum)
- [ ] Create API key, store in Supabase → Edge Functions → Secrets:
      `RESEND_API_KEY=<key>` and
      `NOTIFICATION_FROM_EMAIL=security@psychage.com`
- [ ] Deploy the edge function:
      `supabase functions deploy password-change-notification`
- [ ] Smoke test: change password from AccountSettings while logged in,
      confirm the registered email receives the notification within
      60 seconds, the "this wasn't me" link goes to /reset-password
- [ ] Repeat via the recovery flow (request reset from /reset-password,
      complete on /update-password) — same notification should arrive

---

## 5. Optional but recommended (not blocking the hotfix)

- [ ] Per-user rate limit on password reset (Supabase Pro feature) —
      cap at 3 per hour per target email
- [ ] Reduce sign-in rate limit from default 30/hr/IP if traffic
      profile permits
- [ ] HaveIBeenPwned breached-password check — Supabase native toggle
- [ ] Email-template branding (signup confirmation, recovery email,
      email-change confirmation) per the original audit's §D.1
- [ ] BIMI record on the sender domain (raises trust signal in inbox
      clients)

---

## 6. Final verification

- [ ] Confirm zero `user_metadata.role='admin'` in production after
      migration:
      `SELECT count(*) FROM auth.users WHERE raw_user_meta_data ? 'role';`
- [ ] Confirm zero `USING (true)` policies remain on article tables
- [ ] Run the four exploit smoke tests in `auth-hotfix-summary.md` §6
- [ ] Sign off in the PR description with this checklist's evidence
