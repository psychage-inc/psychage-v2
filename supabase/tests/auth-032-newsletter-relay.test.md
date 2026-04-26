# AUTH-032 — Newsletter Apple Private Relay SQL Scenarios

Manual SQL test plan for migration `20260425000002_relax_email_unique_for_relay.sql`.
Run against a local Supabase / staging environment after applying the migration.

## Setup
```sql
-- Two test users (assumes auth.users seed)
INSERT INTO auth.users (id, email)
VALUES
    ('11111111-1111-1111-1111-111111111111', 'alice-real@example.com'),
    ('22222222-2222-2222-2222-222222222222', 'bob-real@example.com');
```

## Scenario 1 — Anonymous email dedup still works
```sql
INSERT INTO public.newsletter_subscribers (email, status)
VALUES ('anon@example.com', 'active');

-- Should fail with 23505 (anonymous email_anonymous_uidx)
INSERT INTO public.newsletter_subscribers (email, status)
VALUES ('anon@example.com', 'active');
-- ERROR: duplicate key value violates unique constraint
--   "newsletter_subscribers_email_anonymous_uidx"
```
**Expected:** second insert fails. ✅ Anonymous dedup preserved.

## Scenario 2 — Authenticated user_id dedup
```sql
INSERT INTO public.newsletter_subscribers (email, status, user_id)
VALUES ('alice-relay-1@privaterelay.appleid.com', 'active',
        '11111111-1111-1111-1111-111111111111');

-- Should fail with 23505 (user_id_uidx)
INSERT INTO public.newsletter_subscribers (email, status, user_id)
VALUES ('alice-relay-2@privaterelay.appleid.com', 'active',
        '11111111-1111-1111-1111-111111111111');
-- ERROR: duplicate key value violates unique constraint
--   "newsletter_subscribers_user_id_uidx"
```
**Expected:** second insert fails — Alice can't have two subscriptions, even with different relay addresses.

## Scenario 3 — Two authenticated users sharing an email
```sql
INSERT INTO public.newsletter_subscribers (email, status, user_id)
VALUES ('shared-household@example.com', 'active',
        '11111111-1111-1111-1111-111111111111');

-- Should SUCCEED — user_id differs, email is shared (relay-style or
-- legitimate household sharing).
INSERT INTO public.newsletter_subscribers (email, status, user_id)
VALUES ('shared-household@example.com', 'active',
        '22222222-2222-2222-2222-222222222222');
```
**Expected:** both rows present. ✅ Apple Private Relay collision now allowed.

## Scenario 4 — Anon + authenticated row with same email
```sql
INSERT INTO public.newsletter_subscribers (email, status)
VALUES ('mixed@example.com', 'active');  -- anon

INSERT INTO public.newsletter_subscribers (email, status, user_id)
VALUES ('mixed@example.com', 'active',
        '11111111-1111-1111-1111-111111111111');  -- authenticated
```
**Expected:** both rows present. The two unique indexes are mutually exclusive (one is `WHERE user_id IS NULL`, the other `WHERE user_id IS NOT NULL`).

## Cleanup
```sql
DELETE FROM public.newsletter_subscribers
WHERE email IN (
    'anon@example.com',
    'alice-relay-1@privaterelay.appleid.com',
    'alice-relay-2@privaterelay.appleid.com',
    'shared-household@example.com',
    'mixed@example.com'
);
DELETE FROM auth.users
WHERE id IN (
    '11111111-1111-1111-1111-111111111111',
    '22222222-2222-2222-2222-222222222222'
);
```
