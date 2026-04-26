# AUTH-033 — Provider status audit trigger SQL scenarios

Manual SQL test plan for migration `20260425000003_audit_provider_status_trigger.sql`.

## Setup
```sql
INSERT INTO public.providers (id, display_name, status)
VALUES ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Test Provider', 'pending');
```

## Scenario 1 — Status change fires audit row with source=db_trigger
```sql
UPDATE public.providers
SET status = 'active'
WHERE id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';

SELECT action, resource_type, resource_id, previous_value, new_value, metadata
FROM public.admin_audit_log
WHERE resource_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'
ORDER BY created_at DESC
LIMIT 1;
```
**Expected:**
- action = 'provider_status_change'
- previous_value = `{"status": "pending"}`
- new_value = `{"status": "active"}`
- metadata = `{"source": "db_trigger"}`

## Scenario 2 — Non-status update does NOT fire the trigger
```sql
DELETE FROM public.admin_audit_log
WHERE resource_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';

UPDATE public.providers
SET display_name = 'Renamed Test Provider'
WHERE id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';

SELECT count(*) FROM public.admin_audit_log
WHERE resource_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
```
**Expected:** 0 rows. The trigger only fires on `UPDATE OF status`.

## Scenario 3 — Idempotent update (status set to current value) does not fire
```sql
UPDATE public.providers
SET status = 'active'  -- same value
WHERE id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';

SELECT count(*) FROM public.admin_audit_log
WHERE resource_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
```
**Expected:** 0 rows. The `IS DISTINCT FROM` guard rejects no-op updates.

## Cleanup
```sql
DELETE FROM public.admin_audit_log
WHERE resource_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
DELETE FROM public.providers
WHERE id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
```
