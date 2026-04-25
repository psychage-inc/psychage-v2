# B-7 Phase C — narrow strip trigger (SQL test scenarios)

Migration under test:
`supabase/migrations/20260423000007_b7_narrow_strip_trigger.sql`

Run each scenario in the Supabase SQL editor with **service-role**
context (auth.users updates require it). Reset state between
scenarios so the next one starts from a known position.

Pre-conditions:
- 20260423000001 (original strip trigger) has been applied.
- 20260423000007 (this migration) has been applied — narrowed body
  is in place; trigger is enabled.

Common setup:

```sql
-- Pick or create a throwaway test user. Below uses a fresh user;
-- replace <test_uid> with the returned id.
INSERT INTO auth.users (id, instance_id, email, raw_user_meta_data, raw_app_meta_data, created_at, updated_at, aud, role)
VALUES (gen_random_uuid(), '00000000-0000-0000-0000-000000000000',
        'b7-strip-test@example.com', '{}'::jsonb, '{}'::jsonb,
        now(), now(), 'authenticated', 'authenticated')
RETURNING id;
```

(If your local auth schema enforces additional NOT NULLs, use the
existing test fixture pattern from supabase/tests/hotfix-b4-strip-
trigger-safety.test.md.)

---

## Scenario 1 — admin value IS stripped (AUTH-001 regression check)

```sql
UPDATE auth.users
SET raw_user_meta_data = '{"role": "admin"}'::jsonb
WHERE id = '<test_uid>';

SELECT raw_user_meta_data
FROM auth.users WHERE id = '<test_uid>';
```

**Expected:** `raw_user_meta_data` does NOT contain a `role` key.
Result body: `{}` or any other keys minus `role`. The trigger fired
and stripped the admin claim. AUTH-001 defense intact.

---

## Scenario 2 — provider value PRESERVED (B-7 fix verification)

```sql
UPDATE auth.users
SET raw_user_meta_data = '{"role": "provider"}'::jsonb
WHERE id = '<test_uid>';

SELECT raw_user_meta_data ->> 'role' AS role_value
FROM auth.users WHERE id = '<test_uid>';
```

**Expected:** `role_value = 'provider'`. The trigger inspected the
value, found it is not `'admin'`, and left the row unchanged.

---

## Scenario 3 — patient value PRESERVED

```sql
UPDATE auth.users
SET raw_user_meta_data = '{"role": "patient"}'::jsonb
WHERE id = '<test_uid>';

SELECT raw_user_meta_data ->> 'role' AS role_value
FROM auth.users WHERE id = '<test_uid>';
```

**Expected:** `role_value = 'patient'`. Same logic as Scenario 2 —
not `'admin'`, so passes through.

---

## Scenario 4 — mixed payload, admin stripped, sibling keys preserved

```sql
UPDATE auth.users
SET raw_user_meta_data = '{"display_name": "Avery Q", "role": "admin", "country": "US"}'::jsonb
WHERE id = '<test_uid>';

SELECT raw_user_meta_data
FROM auth.users WHERE id = '<test_uid>';
```

**Expected:**
- `raw_user_meta_data ? 'role'` is `false` (admin key stripped)
- `raw_user_meta_data ->> 'display_name'` is `'Avery Q'`
- `raw_user_meta_data ->> 'country'` is `'US'`

The strip operation must touch only the `role` key.

---

## Scenario 5 — mixed payload, provider preserved alongside other keys

```sql
UPDATE auth.users
SET raw_user_meta_data = '{"display_name": "Avery Q", "role": "provider", "avatar_url": "https://example/a.png"}'::jsonb
WHERE id = '<test_uid>';

SELECT raw_user_meta_data
FROM auth.users WHERE id = '<test_uid>';
```

**Expected:** all three keys present. Trigger no-ops because the
role value is not `'admin'`.

---

## Scenario 6 — payload without role key untouched

```sql
UPDATE auth.users
SET raw_user_meta_data = '{"display_name": "Casey"}'::jsonb
WHERE id = '<test_uid>';

SELECT raw_user_meta_data
FROM auth.users WHERE id = '<test_uid>';
```

**Expected:** `{"display_name": "Casey"}`. The trigger's IF guard
short-circuits when the key is absent.

---

## Scenario 7 — null raw_user_meta_data tolerated

```sql
UPDATE auth.users
SET raw_user_meta_data = NULL
WHERE id = '<test_uid>';

SELECT raw_user_meta_data IS NULL AS is_null
FROM auth.users WHERE id = '<test_uid>';
```

**Expected:** `is_null = true`. The IF guard checks `IS NOT NULL`
before reading `->>`, so this does not error.

---

## Scenario 8 — app_metadata untouched (sync trigger fan-in safety)

```sql
UPDATE auth.users
SET raw_app_meta_data = '{"role": "provider"}'::jsonb
WHERE id = '<test_uid>';

SELECT raw_app_meta_data ->> 'role' AS app_role
FROM auth.users WHERE id = '<test_uid>';
```

**Expected:** `app_role = 'provider'`. The strip trigger only
inspects `raw_user_meta_data`. Phase D's role sync writes to
`raw_app_meta_data` and must not be interfered with by the strip.

---

## Cleanup

```sql
DELETE FROM auth.users WHERE id = '<test_uid>';
```
