# Auth Hotfix — Out-of-Scope Observations

Companion to `security/auth-hotfix-2026-04-23` branch. Things noticed
during the security hotfix that are real but outside the scope set by
the hotfix prompt. Each item is a candidate for the data-layer / UX /
i18n follow-up prompts.

---

## New dependency

- **`@marsidev/react-turnstile`** added in commit
  `5b8c37f [AUTH-029]`. The hotfix prompt §13 requires flagging new
  deps. Justification: AUTH-029 is HIGH security (signup abuse +
  password-reset email flood) and Cloudflare Turnstile is the
  addendum's recommended provider. Less friction than hCaptcha,
  better privacy story than reCAPTCHA, free at scale. The dep adds
  ~25 KB gzipped.

---

## Other `USING (true)` RLS policies (Phase B.2 sweep)

The hotfix replaced `USING (true)` on the article tables only. A grep
across all migrations shows additional `USING (true)` policies that
are intentional but worth re-affirming during a future broad RLS
audit:

| Migration | Table | Policy | Verdict |
|---|---|---|---|
| 20260306000001 | `provider_types` | public read | intentional (lookup) |
| 20260306000001 | `specialties` | public read | intentional (lookup) |
| 20260306000001 | `languages_lookup` | public read | intentional (lookup) |
| 20260306000001 | `cultural_competencies` | public read | intentional (lookup) |
| 20260306000001 | `insurance_plans` | public read | intentional (lookup) |
| 20260316000001 | `article_categories` | public read | intentional (lookup) |
| 20260316000001 | `article_subcategories` | public read | intentional (lookup) |
| 20260411000003 | `provider_trust_scores` | public read | intentional (displayed) |
| 20250220000003 | navigator lookup tables | various | needs targeted re-review |

The navigator (`20250220000003`) entries warrant a focused look in a
follow-up: the engine is client-side and most lookup data is
intentionally public, but verifying nothing user-private leaks is a
worthwhile separate sweep. **Not** fixed here because (a) it's outside
the hotfix's CRITICAL/HIGH-security scope, (b) the navigator is
client-side which limits damage, and (c) any change to the navigator
schema needs the owning engineer's review.

---

## `seed-admin.mjs` legacy behavior

Commit `6108ecf [AUTH-001] Admin role migration script` includes a
small companion fix to `scripts/seed-admin.mjs`: it no longer plants
`user_metadata.role='admin'` on the seeded admin (the script was a
permanent State-B-producer). It now creates the auth user without
role metadata and explicitly inserts an `admin_roles` row.

This counts as scope-adjacent rather than scope-creep — without this
fix every dev who runs `seed-admin.mjs` re-creates a State B user
that the admin migration will demote on the next reconciliation, and
they wonder why their local admin login broke.

`scripts/create-demo-admin.ts` already uses the correct pattern; no
change needed there.

---

## AuthModal does not use Turnstile

`src/components/auth/AuthModal.tsx` calls `signup(...)` without a
captcha token. AuthModal is a soft-gate / inline-signup widget; it
inherits the same abuse risk as SignUpPage but is harder to
instrument because the modal context has no widget area as
prominent. Out of scope for this hotfix because:
  1. The primary signup path (`/signup`) is now Turnstile-gated, so
     scripted abuse moves there, not into the modal
  2. Adding Turnstile to a modal flow requires UX consideration —
     where it renders, when it appears, how it interacts with the
     modal's compact layout

Recommended for the UX follow-up prompt.

---

## Login error mapping (AUTH-031, MEDIUM)

`LoginPage.tsx:181-182` still has the heuristic branch that maps
"not found" / "no user" / "does not exist" Supabase error strings
to "No account found with this email. Would you like to sign up?".
Today Supabase v2.90 returns generic credential errors, so the
branch is dormant — but it's primed to leak the moment Supabase's
error strings change. Addendum classified this MEDIUM, so the
hotfix's CRITICAL/HIGH scope excluded it. Trivial fix in the data-
layer or UX follow-up: delete that elif branch and let the generic
"invalid credentials" fall-through handle it.

---

## Pre-existing test failures during `pnpm test`

Recorded after the final test run — see `auth-hotfix-summary.md` §3
for the snapshot. Any failure unrelated to hotfix changes is logged
there with the test name and a one-line analysis.

---

## Risky test infra: vitest now scans `scripts/**`

To make the migrate-admin-roles script test runnable, `vitest.config.ts`
include glob was extended:

```
include: ['src/**/*.{test,spec}.{ts,tsx}', 'scripts/**/*.{test,spec}.ts'],
```

Cost: vitest now stat-walks the scripts/ tree on every run. Benefit:
script tests live alongside their source (per the prompt). Acceptable
for now; revisit if scripts/ grows large enough that test discovery
becomes slow.

---

## Migration-script RPC dependency: `auth_001_diagnostic_admin_states`

`scripts/migrate-admin-roles.ts` uses `supabase.rpc('auth_001_diagnostic_admin_states')`
when present, falling back to a less-detailed admin_roles-only count
when not. The hotfix migration does NOT define that diagnostic RPC
because exposing `auth.users` data via an RPC to authenticated callers
is itself a security decision — the reviewer should choose:
  (a) define the RPC as `SECURITY DEFINER` and gate to service-role
      only via REVOKE (matches the rest of the file's pattern)
  (b) skip the RPC and use psql directly with the SQL block in the
      script's header

Either is fine; (a) is more reproducible. Not committed because the
migration is already large and the RPC is only a convenience for the
script.
