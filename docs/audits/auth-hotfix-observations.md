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

> **Resolved in patch-up B-1** (commit `28b71d2`): option (a) was
> chosen. The RPC now ships in
> `supabase/migrations/20260423000003_auth_001_diagnostic_rpc.sql`
> with `SECURITY DEFINER` + `search_path=''` + REVOKE from
> PUBLIC/authenticated/anon, matching the lockdown on
> `migrate_admin_role`. The script's fallback was also hardened to
> abort loudly (non-zero exit + stderr banner citing the migration
> filename) rather than silently report a degraded admin-roles-only
> count.

---

## Patch-up observations (B-1 through B-6)

Things learned during the patch-up that belong in a future engineer's
mental model.

### `admin_roles.user_id` is UNIQUE — single role per user

Confirmed during B-3 planning
([20260325000003_create_admin_roles.sql:12](../../supabase/migrations/20260325000003_create_admin_roles.sql#L12)):
`admin_roles` has `UNIQUE(user_id)`, which enforces exactly one admin
role per user (no composite `(user_id, role)` allowed).

Impact on B-3's sync function: the priority-ordered
`CASE role WHEN ... END LIMIT 1` is logically a no-op today (only one
row to pick), but it's written defensively in case the UNIQUE is ever
relaxed. If the schema evolves to multi-role, the priority
`super_admin > clinical_admin > viewer` keeps `app_metadata.role`
pointing at the highest-privilege role without requiring a second
migration.

### `migrate_admin_role` was already locked — B-2 is docs-only

The addendum prompt anticipated that the REVOKEs on
`public.migrate_admin_role(uuid, text, text)` might be missing,
requiring a new migration. Inspection of 20260423000001 line 222
found the REVOKE already present:

```sql
REVOKE ALL ON FUNCTION public.migrate_admin_role(uuid, text, text)
  FROM PUBLIC, authenticated, anon;
```

So B-2 consumed one slot in the checklist and zero migration files.
The `information_schema.routine_privileges` audit query in §1 of the
dashboard checklist stays mandatory — a future migration could
regress the lockdown without a lint catching it.

### Strip trigger verified safe by inspection — no replacement needed

B-4 concluded by inspection (documented in
[`auth-hotfix-b4-verification.md`](./auth-hotfix-b4-verification.md))
that `strip_user_metadata_role_trg` is narrowly scoped: never raises,
only mutates `NEW.raw_user_meta_data` (and only to strip the `role`
key), and leaves every other column on `auth.users` untouched. The
B-3 sync trigger's `UPDATE auth.users ... SET raw_app_meta_data`
fires the strip trigger as a side effect, which is fine — they
operate on disjoint JSONB columns.

Docker was unavailable in the hotfix session so `supabase db reset` +
`pnpm dev` + UI smoke sweep could not run locally. The SQL simulation
scenarios in
[`supabase/tests/hotfix-b4-strip-trigger-safety.test.md`](../../supabase/tests/hotfix-b4-strip-trigger-safety.test.md)
are the staging deliverable; the reviewer runs them before production
promotion. If any path 1–4 fails, the fallback is a reconciliation
function instead of the trigger — staged as a NEW migration at
`20260423000005_replace_strip_trigger_with_reconciliation.sql`
(not committed; only if verification surfaces the failure).

### B-5 was worse than its §AUTH-028 sibling suggested

The addendum listed AUTH-028 (no password-change notification email)
as HIGH. It did NOT flag that the edge function AUTH-028 added in
commit `b400991` trusts `user_id` from the request body — any caller
who reaches the endpoint can redirect the notification to any user.
That's a HIGH-severity spam-amplification vector against a
security-sensitive notification channel. B-5 closes it by requiring a
bearer JWT and deriving both user_id and email from the verified
session.

Worth a note for the upcoming UX / data-layer prompts: any edge
function that takes a user-identifying parameter in the request body
should be scrutinized the same way. Precedent now exists.

### B-6 failure baseline: 83 = 83, exactly

Claim from §3 of the summary was "83 pre-existing failures unrelated
to hotfix." B-6 captured the failing test list on the hotfix branch
(`e995165`), stashed, checked out `566a276`, ran `pnpm install` +
`vitest`, captured baseline failures, restored. Diff was
byte-identical. Every failing test is in a file orthogonal to auth
flow (dashboard, navigator, newsletter, a11y). Full result:
[`auth-hotfix-b6-verification.md`](./auth-hotfix-b6-verification.md).

### Timestamp numbering gap — intentional

The patch-up uses `20260423000003` (B-1) and `20260423000004` (B-3).
Not 000005 as originally planned — B-2 consumed no migration slot, so
B-3 slides up to collapse the gap. If B-4's staging sweep ever
produces a replacement trigger migration, it lands at `000005`; the
sequence then stays contiguous from 000001 through 000005.
