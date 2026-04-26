# Auth UX + i18n Polish — Operator Follow-up Checklist

Tasks the operator must perform after merging `polish/auth-ux-i18n` to main. None of these are auto-applied by code changes alone.

## 1. Apply migrations (in order)

```bash
# AUTH-032 — newsletter_subscribers schema relaxation
supabase migration apply 20260425000002_relax_email_unique_for_relay.sql

# AUTH-033 — provider status audit trigger
supabase migration apply 20260425000003_audit_provider_status_trigger.sql
```

Both have rollback SQL in the migration file footers (incident-only).

**Verification:**
- After 20260425000002:
  ```sql
  \d public.newsletter_subscribers
  -- Should show user_id column and the two partial unique indexes
  ```
- After 20260425000003:
  ```sql
  SELECT tgname FROM pg_trigger
  WHERE tgrelid = 'public.providers'::regclass;
  -- Should include audit_provider_status_change_trg
  ```

Run the SQL scenario docs at `supabase/tests/auth-032-newsletter-relay.test.md` and `supabase/tests/auth-033-provider-status-audit.test.md` against staging.

## 2. Deploy the suspicious-activity-notification edge function

```bash
supabase functions deploy suspicious-activity-notification
```

**Required secrets in the project's edge-function environment:**
- `SUPABASE_URL` (already present)
- `SUPABASE_SERVICE_ROLE_KEY` (already present — needed for the profiles existence check)
- `RESEND_API_KEY` (optional; if absent, function logs a warning and returns 200 without sending email)
- `NOTIFICATION_FROM_EMAIL` (optional; defaults to `security@psychage.com`)

**Verification:** run scenarios from `supabase/tests/auth-034-suspicious-activity.test.md`.

The function is **unauthenticated** by design (the legitimate user is failing to authenticate). Confirm the function's CORS config and that no JWT requirement was added at the platform layer.

## 3. Translation rollout

Send the **Translation Handoff** section of `docs/refactors/auth-ux-i18n-summary.md` to the localization team.

For each of PT, ES, SV, FR:
- Replace EN-stubbed values in `src/locales/{lang}/translation.json` under the `auth.*` keys
- Remove the `auth._meta._translation_status` block once translation is complete
- Ship as separate PRs per locale or a bundled translation PR — translator's call

**Critical strings flagged for translator:**
- `auth.resetPassword.successBody` — "If an account exists for that email..." MUST stay non-disclosing
- `auth.errors.invalidCredentials` — must NOT distinguish wrong-password from wrong-email (enumeration)
- `auth.lockout.softWarning` — must NOT name the failure count
- `auth.lockout.emailSubject` — non-alarmist tone

## 4. Sentry tag verification

Once telemetry starts flowing in production:
- Verify Sentry events tagged with `auth_operation` show in the production dashboard
- Verify `auth_outcome=user_error` events do NOT generate alerts (breadcrumb-only, by design)
- Verify `auth_outcome=platform_error` events DO generate alerts and route to oncall

## 5. Optional — observability for the new edge function

Add a Grafana / Logflare query for the `event=suspicious-activity.invoked` log line so a sustained burst of these is visible. The edge function's per-instance rate limit (1/email/hour) is in-memory only; under heavy scale-out the same email could be notified more often. If this becomes a concern, swap to a Postgres-backed counter — out of scope for this branch.

## 6. Verify the Sentry init still runs in production

`lib/sentry.ts` requires `VITE_SENTRY_DSN`. Confirm it's set in production build env. Without it, `logAuthEvent` calls become silent no-ops (intentional — but make sure the dev branch isn't the same).

## Not in scope (NOT for the operator)

- AdminApp does not yet mount `DeletionScheduledBanner` — captured as a follow-up if admins start using the self-deletion flow.
- Page-level i18n wiring beyond error/retry/lockout/deletion strings — the keys exist, the wholesale conversion of titles/labels/buttons to `t()` is staged but not in this branch.
- TierGuard, MindMate, SleepArchitect, ProviderClaimForm — `!isAuthenticated` UI gates not retrofitted; captured in observations.
