# B-7 Phase F — claim-provider writes profiles.role (verification)

Edge function under test:
`supabase/functions/claim-provider/index.ts`

Verifies that a successful `claim-provider` call sets
`profiles.role = 'provider'` (the new B-7 source of truth) in
addition to the legacy `user_metadata.role` write. The B-7
profiles trigger then propagates `app_metadata.role`, and the
narrowed strip trigger no longer destroys the provider signal on
subsequent UPDATEs.

These are **integration scenarios** the operator runs against a
staging environment with a real NPI. Unit-level extraction would
require refactoring the edge function to export internals (out of
B-7 scope).

Pre-conditions:
- 20260423000007 (narrow strip), 20260423000008 (extend sync) applied
- Phase F edge function deployed:
  `supabase functions deploy claim-provider`
- A test patient user exists with a known auth session
- An unclaimed seeded provider row exists with a known NPI
  (or use a real test-NPI from the NPPES sandbox)

---

## Scenario 1 — happy-path claim sets profiles.role

```bash
curl -X POST \
  https://<project>.functions.supabase.co/claim-provider \
  -H "Authorization: Bearer <patient_access_token>" \
  -H "Content-Type: application/json" \
  -d '{"npi_number": "<test_npi>"}'
```

Expected HTTP 200 with `{ success: true, provider_id, ..., redirect: "/portal" }`.

Then in the SQL editor (service role):

```sql
SELECT pr.role AS profile_role,
       u.raw_user_meta_data ->> 'role' AS user_meta_role,
       u.raw_app_meta_data  ->> 'role' AS app_meta_role
FROM auth.users u
JOIN public.profiles pr ON pr.id = u.id
WHERE u.id = '<patient_user_id>';
```

**Expected:**
- `profile_role = 'provider'` — F.1's new upsert
- `user_meta_role = 'provider'` — legacy write retained as a trace
- `app_meta_role = 'provider'` — sync trigger from Phase D propagated

---

## Scenario 2 — survival across an unrelated auth.users UPDATE

This is the regression test: simulate a profile edit (display_name
update). Pre-B-7, this would strip the provider role.

```sql
UPDATE auth.users
SET raw_user_meta_data = raw_user_meta_data ||
                         jsonb_build_object('display_name', 'New Name')
WHERE id = '<patient_user_id>';

SELECT pr.role AS profile_role,
       u.raw_user_meta_data ->> 'role' AS user_meta_role,
       u.raw_app_meta_data  ->> 'role' AS app_meta_role
FROM auth.users u
JOIN public.profiles pr ON pr.id = u.id
WHERE u.id = '<patient_user_id>';
```

**Expected:**
- `profile_role = 'provider'` — profiles untouched
- `user_meta_role = 'provider'` — Phase C strip trigger only strips 'admin'
- `app_meta_role = 'provider'` — unchanged

Pre-B-7 this would have left `user_meta_role = NULL` and the client
would resolve to 'patient'. The narrowed trigger preserves the value.

---

## Scenario 3 — claim flow no longer relies on user_metadata being intact

Even if user_metadata.role gets stripped at some future point (admin
escalation defense), profiles.role and app_metadata.role keep the
provider routing intact.

```sql
-- Simulate a hypothetical strip (manually, since the narrowed trigger
-- won't strip 'provider'):
UPDATE auth.users
SET raw_user_meta_data = raw_user_meta_data - 'role'
WHERE id = '<patient_user_id>';

SELECT pr.role AS profile_role,
       u.raw_user_meta_data ->> 'role' AS user_meta_role,
       u.raw_app_meta_data  ->> 'role' AS app_meta_role
FROM auth.users u
JOIN public.profiles pr ON pr.id = u.id
WHERE u.id = '<patient_user_id>';
```

**Expected:**
- `profile_role = 'provider'`
- `user_meta_role = NULL`
- `app_meta_role = 'provider'`

The client (`mapSupabaseUser` in `src/context/AuthContext.tsx`) reads
`app_metadata.role`, so the user is still routed to /portal.

---

## Cleanup

```sql
-- Reverse the test claim. Replace status default per your seed.
UPDATE public.providers
   SET user_id = NULL, status = 'seeded', claimed_at = NULL
 WHERE npi_number = '<test_npi>';

DELETE FROM public.provider_verifications WHERE provider_id = '<provider_id>';
UPDATE public.profiles SET role = 'patient' WHERE id = '<patient_user_id>';
-- The profiles trigger from Phase D will reset app_metadata.role.
```
