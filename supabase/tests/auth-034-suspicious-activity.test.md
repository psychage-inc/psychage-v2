# AUTH-034 — suspicious-activity-notification edge function scenarios

Manual / staging test plan for `supabase/functions/suspicious-activity-notification/index.ts`.

## Local invocation
```bash
supabase functions serve suspicious-activity-notification --env-file ./supabase/.env.local
```

## Scenario 1 — Valid email belonging to a real user
```bash
curl -X POST http://127.0.0.1:54321/functions/v1/suspicious-activity-notification \
    -H 'Content-Type: application/json' \
    -d '{"email":"real-user@example.com"}'
```
**Expected:**
- HTTP 200, body `{"ok": true}`
- If `RESEND_API_KEY` configured: email sent to that address
- Logs include `event=suspicious-activity.invoked` with `email_hash=...`

## Scenario 2 — Anti-amplification (email NOT in profiles)
```bash
curl -X POST http://127.0.0.1:54321/functions/v1/suspicious-activity-notification \
    -H 'Content-Type: application/json' \
    -d '{"email":"never-existed@example.com"}'
```
**Expected:**
- HTTP 200, body `{"ok": true}` (constant-response policy)
- NO email sent (no Resend call)
- Logs include `event=suspicious-activity.skipped_no_such_email`

## Scenario 3 — Per-email rate limit (1/hour)
```bash
# First call within the hour — fires
curl -X POST .../functions/v1/suspicious-activity-notification \
    -H 'Content-Type: application/json' \
    -d '{"email":"real-user@example.com"}'

# Second call within the hour — silently rate-limited
curl -X POST .../functions/v1/suspicious-activity-notification \
    -H 'Content-Type: application/json' \
    -d '{"email":"real-user@example.com"}'
```
**Expected:**
- Both responses are HTTP 200 with `{"ok": true}` (constant-response — caller cannot distinguish "rate limited" from "delivered")
- Only the first invocation logs `event=suspicious-activity.invoked`
- Wait > 1 hour and the third call delivers again

## Scenario 4 — Malformed payload
```bash
curl -X POST .../functions/v1/suspicious-activity-notification \
    -H 'Content-Type: application/json' \
    -d 'not-json'
```
**Expected:** HTTP 400, body `{"error": "Invalid JSON"}`

```bash
curl -X POST .../functions/v1/suspicious-activity-notification \
    -H 'Content-Type: application/json' \
    -d '{"email":"not-an-email"}'
```
**Expected:** HTTP 400, body `{"error": "Invalid email"}`

## Scenario 5 — Unauthenticated caller is allowed (by design)
```bash
# No Authorization header
curl -X POST .../functions/v1/suspicious-activity-notification \
    -H 'Content-Type: application/json' \
    -d '{"email":"real-user@example.com"}'
```
**Expected:** HTTP 200. The legitimate user is failing to authenticate, so we cannot require a JWT.

## Notes
- The in-memory rate-limit map is per-instance. Under heavy scale-out the same email could be notified 1×/hour PER INSTANCE. Acceptable for this signal; documented in the function header.
- The function reads `profiles.email` for the existence check. Confirm `profiles.email` is populated by signup; if a user never set it, the notification will be silently dropped (logged as `skipped_no_such_email`).
