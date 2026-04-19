# Domain 8: Newsletter & Waitlist & Contact

## Code Path Trace

### Newsletter Signup
- Service checks for existing email first → returns success silently (idempotent)
- INSERT into `newsletter_subscribers`
- Error handling: generic fallback message, console log

### Contact Form
- INSERT into `contact_submissions`
- No duplicate check — same email can submit multiple times (by design)
- Falls back to localStorage queue on DB failure
- Batch retry on app init via processQueue()

### Waitlist
- INSERT into `waitlist` table
- Duplicate handling: catches Postgres error 23505 (unique constraint)
- Falls back to localStorage on failure
- Email validation + case normalization

## Issues Found

| id | severity | issue | file | line | proposed_fix |
|---|---|---|---|---|---|
| NL-001 | major | newsletter_subscribers has overly permissive RLS — anon can SELECT all records | migration | - | Document — privacy concern if subscriber emails are readable |
| NL-002 | info | contact_submissions allows unlimited submissions from same email | contactService | - | By design — not a bug |

## RLS Verified
- newsletter_subscribers: anon SELECT ✅ (but overly permissive — NL-001), INSERT ✅, UPDATE ✅
- contact_submissions: anon SELECT ❌ (blocked — correct), INSERT ✅
- waitlist: assumed similar pattern to newsletter

## Edge Cases Verified
- ✅ Newsletter duplicate email: handled silently (idempotent)
- ✅ Contact form submits successfully
- ✅ Contact form DB failure: queued in localStorage, retried later
- ✅ Waitlist duplicate: unique constraint error caught gracefully
- ⚠️ newsletter_subscribers: anon can read subscriber list (NL-001)
