# B-7 Provider Role Regression — Incident Record

**Branch:** `security/auth-hotfix-2026-04-23`
**Deploy state at incident identification:** Production (post hotfix + B-1..B-6)
**Source regression:** `strip_user_metadata_role` trigger from migration
[20260423000001_harden_admin_role_checks.sql](../../supabase/migrations/20260423000001_harden_admin_role_checks.sql)
strips the entire `role` key from `auth.users.raw_user_meta_data` on
every UPDATE. The claim-provider edge function
([supabase/functions/claim-provider/index.ts:184-186](../../supabase/functions/claim-provider/index.ts#L184-L186))
writes `user_metadata.role = 'provider'` and never writes
`profiles.role`, so any provider user whose `auth.users` row is
UPDATE'd post-deploy (password change, display-name edit,
avatar update, OAuth re-link, consent update) loses their provider
signal. Client resolves role from `app_metadata.role` (commit
`123da4b`), falls back to `'patient'`, and `RoleGuard(['provider','admin'])`
denies `/portal/*`.

---

## Architectural decision

`profiles.role` is the non-admin source of truth. `admin_roles`
remains the admin source of truth. `user_metadata.role` is never
trusted for role resolution. The B-3 sync function is extended (in
B-7 Phase D) so:

```
effective_role =
  (admin_roles primary role for this user, if any)
  ELSE (profiles.role, if set)
  ELSE 'patient'
```

The strip trigger is narrowed (in B-7 Phase C) to only strip `'admin'`
values, preserving any `'provider'` value while still defending
against AUTH-001 escalation.

---

## Timeline

- `<deploy date/time>` — hotfix + patch-up deployed to production
- `<incident ID date/time>` — regression identified by reviewer
- `2026-04-23 <B-7 start>` — B-7 remediation started
- `<B-7 migration applied>` — Phase A diagnostic migration applied
- `<diagnostic captured>` — diagnostic output recorded in §1 below
- `<B-7 narrow trigger applied>` — Phase C migration applied (damage window closed)
- `<B-7 sync extended>` — Phase D migration applied
- `<B-7 backfill executed>` — backfill script run by operator
- `<B-7 verified>` — post-backfill diagnostic returns 0 in P-B/P-C/P-D
- `<comms sent>` — affected-user notification sent

---

## 1. Diagnostic Output

**OPERATOR ACTION REQUIRED.** Run the following in the Supabase SQL
editor with service-role privileges, paste the result below, then
reply to the assistant with the same content so Phase B can select
the correct path:

```sql
SELECT * FROM public.b7_provider_regression_diagnostic();
```

```
-- PASTE RESULT HERE. Up to four rows expected:
--   P-A_intact                 — count, user_ids[], emails[]
--   P-B_partial                — count, user_ids[], emails[]
--   P-C_stripped_recoverable   — count, user_ids[], emails[]
--   P-D_fully_lost             — count, user_ids[], emails[]
```

---

## 2. Path Selected (Phase B decision)

Based on the §1 counts, one of:

- **Path 1 (P-C + P-D == 0):** trivial backfill — only P-B users to
  reconcile (set `profiles.role = 'provider'`); D.1 reconciliation DO
  block handles app_metadata sync.
- **Path 2 (P-C + P-D between 1 and 50):** full script-gated backfill
  via Phase E.
- **Path 3 (P-C + P-D > 50):** stop, report counts to operator,
  require explicit acknowledgment before backfill execution.

To be filled in after diagnostic is captured: **Path: __** ; **Reason: __**

---

## 3. Backfill Execution

To be filled in by operator after the backfill script runs:

```
-- Dry-run output:

-- Execution output:

-- Affected count:
```

---

## 4. Post-Backfill Verification

Re-run the diagnostic after the backfill executes. Expected:

- P-A_intact: increased by the number of affected users
- P-B_partial: 0
- P-C_stripped_recoverable: 0
- P-D_fully_lost: 0

```
-- PASTE post-backfill diagnostic output here.
```

Plus the four monitoring queries from
[`auth-hotfix-b7-monitoring.md`](./auth-hotfix-b7-monitoring.md).
All four expected to return 0.

---

## 5. Affected-User Communications

- **Template used:** [`auth-hotfix-b7-comms-template.md`](./auth-hotfix-b7-comms-template.md)
- **Sent date/time:**
- **Recipients (user_ids):** `<from §1 P-C and P-D arrays>`
- **Reply-routing watcher:** `<who is monitoring support@ for next 72h>`

### Communication Procedure

1. Open `auth-hotfix-b7-comms-template.md` for the canonical message.
2. Personalize:
   - Pull recipient list from §1 (P-C + P-D `user_ids` and `emails`).
   - Substitute `[first name]`, `[deploy date]`, `[backfill date]`.
3. Send via the transactional email provider (Resend per B-5 edge
   function), or BCC via the support inbox if the list is small.
4. Log sends in §5 above.
5. Watch support@ for replies over the next 72 hours; route to
   support queue.

---

## 6. Incident Closure Checklist

- [ ] Diagnostic captured in §1
- [ ] Phase C, D applied (production)
- [ ] Backfill executed; §3 populated
- [ ] Post-backfill diagnostic clean; §4 populated
- [ ] 7-day monitoring window started; daily query results captured
      in `auth-hotfix-b7-monitoring.md`
- [ ] Comms sent; §5 populated
- [ ] No new replies in 72h post-comms, OR all replies resolved
- [ ] Incident marked closed in this document
