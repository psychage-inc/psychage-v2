# Hotfix B-5 — `password-change-notification` caller auth

Manual integration scenarios for
`supabase/functions/password-change-notification/index.ts` after the
B-5 hardening.

## Context

Before B-5: the function trusted `user_id` from the POST body and
used the service role to look up the email. Any authenticated caller
(or anyone who could reach the function endpoint) could send a
password-change notification email to any user — a spam amplification
vector targeting the platform's verified sender domain.

After B-5: the function requires a bearer JWT, verifies it via
`auth.getUser()`, and derives both `user_id` and `email` from the
verified session. The request body is ignored entirely — any
`user_id` an attacker supplies is discarded. Rate-limited per user
at 10 seconds (in-memory, per-instance).

Deploy locally with `supabase functions serve password-change-notification`
or hit the deployed endpoint. Scenarios assume the function is
reachable at `$SUPABASE_URL/functions/v1/password-change-notification`.

---

## Case 1 — No Authorization header → 401

```bash
curl -s -i -X POST \
  -H "Content-Type: application/json" \
  "$SUPABASE_URL/functions/v1/password-change-notification" \
  -d '{}'
```

**Pass criterion:** HTTP 401, response body `{"error":"Unauthorized"}`.
No email is sent, no Resend API call.

---

## Case 2 — Invalid / expired JWT → 401

```bash
curl -s -i -X POST \
  -H "Authorization: Bearer not.a.real.jwt" \
  -H "Content-Type: application/json" \
  "$SUPABASE_URL/functions/v1/password-change-notification" \
  -d '{}'
```

**Pass criterion:** HTTP 401. Same response as Case 1.

---

## Case 3 — Valid JWT, spoofed user_id in body → email goes to CALLER, not target

This is the core B-5 test: an attacker with their own valid session
tries to send a password-change notification to a different user.

Setup: two users. User A's JWT is `$USER_A_JWT`; User B's email is
`userB@example.com`; User B's UUID is `$USER_B_ID`.

```bash
curl -s -i -X POST \
  -H "Authorization: Bearer $USER_A_JWT" \
  -H "Content-Type: application/json" \
  "$SUPABASE_URL/functions/v1/password-change-notification" \
  -d "{\"user_id\":\"$USER_B_ID\",\"email\":\"attacker-redirect@example.com\"}"
```

**Pass criterion:**
- HTTP 200, body `{"ok":true,"sent_at":"..."}`
- If Resend is configured: the email lands in user A's inbox (the
  session owner), NOT user B's. Subject: "Your Psychage password
  was just changed". The `Account:` line in the email body shows
  user A's address, not `userB@example.com`.
- If Resend is NOT configured: the Supabase function logs
  "notification not delivered to <user A's email>" (the log line
  proves the function resolved the email from the session, not the
  spoofed body).

---

## Case 4 — Rate limit kicks in on second invocation

From the same session:

```bash
# First call — should succeed
curl -s -i -X POST \
  -H "Authorization: Bearer $USER_A_JWT" \
  -H "Content-Type: application/json" \
  "$SUPABASE_URL/functions/v1/password-change-notification" \
  -d '{}'

# Second call within 10 seconds — should be rate-limited
curl -s -i -X POST \
  -H "Authorization: Bearer $USER_A_JWT" \
  -H "Content-Type: application/json" \
  "$SUPABASE_URL/functions/v1/password-change-notification" \
  -d '{}'
```

**Pass criterion:** first call returns 200. Second call within 10
seconds returns HTTP 429 with body
`{"error":"Rate limited. Please wait before retrying."}`.
Wait >10 seconds, retry — returns 200 again.

Caveat: in-memory state lives per function instance. If Supabase
scales up and the second request lands on a different instance, the
rate limit may miss. Acceptable under the B-5 scope (durable
rate-limiting would require a Postgres table; out of scope this pass).

---

## Case 5 — Breadcrumb log contains user_id but not email

Inspect the function logs (Supabase dashboard → Functions → Logs
or `supabase functions logs password-change-notification`). Look for
a `password-change-notification.invoked` entry after Case 3.

**Pass criterion:** the log line includes the session-derived
`user_id` and a `timestamp`. It must NOT include the user's email
(PII-minimization in structured logs). Emails appear only in the
no-Resend warning path, which is explicit and operator-facing.

---

## Case 6 — Method not allowed on GET

```bash
curl -s -i -X GET \
  -H "Authorization: Bearer $USER_A_JWT" \
  "$SUPABASE_URL/functions/v1/password-change-notification"
```

**Pass criterion:** HTTP 405, body `{"error":"Method not allowed"}`.

---

## UI smoke tests (staging)

Run alongside the manual curl cases above:

1. Log in as user A. Go to Account Settings → Change Password. Enter
   old + new. Verify the request succeeds and, in the browser network
   tab, the POST to `password-change-notification` carries the user's
   JWT in the Authorization header and an empty body.

2. Complete a password reset via the email link. Same network-tab
   verification on the `/update-password` flow.

3. Confirm the notification email (if Resend is configured) arrives
   at user A's registered address within 60 seconds.
