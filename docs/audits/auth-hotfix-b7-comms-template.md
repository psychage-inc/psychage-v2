# B-7 Affected-Provider Communications Template

Drafts for notifying providers whose access was temporarily affected
by the strip-trigger regression. Personalize and send after the
backfill completes.

These are drafts, not approved copy. Read once for tone before
sending — subject lines and salutations are easy to adjust per your
voice guidelines.

---

## Email — primary version

**Subject options (pick one):**
- `Your Psychage provider access has been restored`
- `Quick update on your Psychage provider account`
- `Provider portal: action complete on our end`

**Body:**

```
Hi [first name],

Between [deploy date] and [backfill date], a configuration change on
our end temporarily affected how provider accounts were recognized
after certain profile actions. Your provider access may have been
briefly unavailable during that window.

We've identified and corrected the issue. Your account now has its
correct provider status, and the provider portal is available again
at psychage.com/portal.

If you're able to sign in and access your portal as expected, no
action is needed. If you see anything unexpected — missing
information, incorrect role, or difficulty signing in — please reply
to this email or reach us at support@psychage.com and we'll resolve
it directly.

Thank you for your patience, and more importantly, for the work you
do with people in our community.

— Psychage Team
```

---

## Internal notes — for the support ticket macro

For the support team to attach to any incoming ticket from an
affected provider:

```
[B-7 incident — auto-resolved]

This provider's account was affected by a temporary role-resolution
issue between <deploy date> and <backfill date>. The issue was
caused by an internal configuration change interacting with the
provider claim flow in an unintended way. We corrected it, ran a
backfill across all affected accounts, and verified each restored
account before sending notifications.

If the user reports continued access issues:
  1. Confirm they have logged out and back in (forces JWT refresh
     to pick up the corrected app_metadata.role)
  2. If still blocked, check user's profiles.role (must = 'provider')
     and providers.user_id (must point to their auth.users id) via
     the admin SQL editor
  3. Escalate to engineering with both values

Reference: docs/audits/auth-hotfix-b7-incident.md
```

---

## SMS / short-channel variant (if used)

For providers who opt into SMS notifications, or for transactional
inbox notifications inside the portal:

```
Psychage: Your provider access is restored. If you can reach your
portal as usual, no action is needed. Issues? support@psychage.com
```

(140 characters; fits one SMS segment.)

---

## What to substitute

| Token | Replace with |
|---|---|
| `[first name]` | Recipient's first name from `profiles.display_name` (or fall back to "there") |
| `[deploy date]` | Date the AUTH-001 hotfix went to production (recorded in `auth-hotfix-b7-incident.md` Timeline) |
| `[backfill date]` | Date the B-7 backfill ran |

---

## Sending procedure

1. Pull recipient list from §1 of `auth-hotfix-b7-incident.md`
   (P-C + P-D `user_ids` and `emails` arrays — those are the users
   whose access was actually broken at any point).
2. Personalize per recipient.
3. Send via the transactional email provider (Resend per the B-5
   edge function) or BCC via the support inbox if the list is small
   enough that personalization-via-merge isn't worth setup.
4. Log sends in `auth-hotfix-b7-incident.md` §5 (date, recipient
   count, channel used).
5. Watch `support@` for replies for 72 hours. Route inbound tickets
   using the support macro above.

---

## What NOT to write

This is user-facing copy for medical-adjacent professionals. Avoid:

- Diagnostic or debugging language (`bug`, `regression`, `data loss`,
  `incident`, `outage`) — these create alarm out of proportion to a
  recoverable role-routing issue.
- Apology theater (`we're so sorry, we know how disruptive this was`)
  — providers are professionals; concise factual notices land better
  than emotional ones.
- Speculation about cause beyond "configuration change" — that
  level of detail is appropriate for the support ticket macro, not
  the recipient email.
- Any reference to security findings (AUTH-001 etc.) or other users'
  experiences with the same issue.
- Time-pressured asks ("please log in immediately"). The portal is
  back; users will return on their own cadence.
