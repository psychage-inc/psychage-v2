# Auth Data-Layer Refactor — Operator Follow-Up

**Branch:** `refactor/auth-data-layer`
**Owner:** TBD on merge

This branch is mostly client-side; the operator surface is small but non-trivial. Items below must be completed in production / staging before / shortly after the branch ships.

## 1. Apply the AUTH-006 migration

`supabase/migrations/20260425000001_data_layer_profiles_role_cleanup.sql`

The migration is **fail-safe** — it aborts with `RAISE EXCEPTION` if any users have `profiles.role='admin'` without a corresponding `admin_roles` entry. If that happens:

```sql
-- See which users are stranded:
SELECT id, email, created_at
FROM public.profiles p
LEFT JOIN auth.users u ON u.id = p.id
WHERE p.role = 'admin'
  AND p.id NOT IN (SELECT user_id FROM public.admin_roles);
```

For each stranded row decide:

- **Promote** (the user really should be an admin): insert into `public.admin_roles` with the appropriate role (`super_admin`, `editor`, or `viewer`), then re-run the migration. The migration's Step 1 will reconcile `profiles.role` to `'patient'` automatically.
- **Demote** (the `'admin'` value was leftover metadata, the user is not actually an admin): `UPDATE public.profiles SET role = 'patient' WHERE id = '<uuid>';` then re-run.

Once the migration applies cleanly:

```sql
-- Verify the CHECK is narrowed:
SELECT pg_get_constraintdef(oid)
FROM pg_constraint
WHERE conrelid = 'public.profiles'::regclass
  AND conname = 'profiles_role_check';
-- Expected: CHECK (role IN ('patient', 'provider'))

-- Verify no stranded admins remain:
SELECT count(*) FROM public.profiles WHERE role = 'admin';
-- Expected: 0
```

## 2. Deploy the new edge function

```bash
supabase functions deploy verify-current-password --project-ref <prod-ref>
```

The function reads `SUPABASE_URL` and `SUPABASE_ANON_KEY` from the function-runtime environment — both are set by Supabase automatically; no new secrets needed.

Smoke test post-deploy (from a logged-in browser session):

```bash
# In the browser console, after logging in:
const { data } = await window.supabase.functions.invoke(
  'verify-current-password',
  { body: { password: '<your-password>' } }
);
console.log(data); // { verified: true }
```

A correct password returns `{ verified: true }`. A wrong password returns `{ verified: false }`. A missing/invalid bearer returns `401`. Three rapid attempts within 10s return `429`.

## 3. Verify Turnstile coverage on the modal surface

`AuthModal` now uses the same Cloudflare Turnstile site key as `SignUpPage` (env var `VITE_TURNSTILE_SITE_KEY`). No new dashboard config — but worth confirming visually that the widget renders on the inline modal in production.

Open the homepage, click "Sign In" / "Get Started" to open the auth modal, switch to the signup view. The widget should render above the submit button. The submit button should be disabled until the challenge completes.

If the widget doesn't render: check the Cloudflare Turnstile site list to confirm the production hostname is allowed (this would have been done at AUTH-029 time but verify nothing has changed).

## 4. No additional dashboard changes

This refactor does not require:

- New environment variables
- Changes to email templates (the existing `password-change-notification` template is unchanged)
- Changes to RLS policies
- Changes to admin role definitions
- Webhook reconfiguration
- New SMTP / Resend configuration

## 5. Post-merge monitoring

Watch for these signals in the first 24 hours after merge:

- Increase in `verify-current-password` 5xx errors (should be ~0). Surface via the Supabase function logs.
- Increase in `password-change-notification` rate-limit (`429`) responses — would indicate retry storms; not expected.
- Auth-related console errors on the client. The lifecycle refactor should reduce these (one less setState path), not increase them.
- Any user reports of being signed out unexpectedly after a password change. The `signOut({scope:'others'})` is intended behavior but watch for confusion if a user has multiple tabs and didn't realize the other tabs would log out.
