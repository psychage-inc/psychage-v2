# Incident Communication Templates — Psychage

Drafted 2026-04-29 during the cross-cutting launch readiness sweep. Use these as starting copy when an incident fires. Tone rules: transparent without alarming, no diagnostic language (Sacred Rule), person-first language, crisis link surfaced if the incident touches mental-health-relevant features.

Each template has three states: `INVESTIGATING`, `IDENTIFIED`, `RESOLVED`. Update the same status post (don't post a new one) so users see one canonical timeline.

---

## Template 1 — Auth incident (sign-in / signup / password reset)

### INVESTIGATING

> We're seeing reports that some people are having trouble signing in to Psychage. Our team is investigating now. You don't need to do anything; we'll update this post as we learn more.
>
> If you need crisis support right now, the resources at https://psychage.com/crisis remain available without sign-in.

### IDENTIFIED

> We've identified the cause of the sign-in problem: <one-sentence non-technical description, e.g. "an upstream auth provider is returning errors">. We're working on a fix and expect to restore normal sign-in within <ETA>.
>
> Existing signed-in sessions are not affected. If you need crisis support, https://psychage.com/crisis is reachable without sign-in.

### RESOLVED

> Sign-in is working normally again as of <time, timezone>. We'll publish a brief postmortem within 48 hours.
>
> Thank you for your patience. If you experienced data loss or stuck account state, please contact support@psychage.com and we'll work through it directly.

---

## Template 2 — Data incident (article reader, dashboard, tools)

### INVESTIGATING

> Some content and tools on Psychage may be loading slowly or returning errors. We're investigating. You can still reach https://psychage.com/crisis directly without delay.

### IDENTIFIED

> We've traced the slow-loading issue to <one-sentence non-technical description>. A fix is rolling out and we expect performance to return to normal within <ETA>.
>
> Your saved data (mood entries, bookmarks, assessments) is not affected — this is a read-side issue only.

### RESOLVED

> Loading times are back to normal as of <time, timezone>. No data was lost.

---

## Template 3 — Provider directory incident

### INVESTIGATING

> Search results in our provider directory may be incomplete or returning errors. We're investigating. Existing bookmarked providers continue to be reachable from your dashboard.

### IDENTIFIED

> We've identified an issue with our provider search index and are rebuilding it. Search may return incomplete results until <ETA>.
>
> If you need urgent care, https://psychage.com/crisis lists 24/7 hotlines that don't require search.

### RESOLVED

> Provider search is fully operational as of <time, timezone>. Indexes have been rebuilt and verified.

---

## Template 4 — Email delivery incident (account confirmation, password reset)

### INVESTIGATING

> Some account-related emails (confirmation, password reset) may be delayed or not arriving. We're investigating with our email provider.

### IDENTIFIED

> We've identified the email-delivery issue and have failed over to <backup mechanism, if any>. Most pending emails should arrive within <ETA>. If you've requested a password reset and need to access your account urgently, please email support@psychage.com.

### RESOLVED

> Email delivery is back to normal as of <time, timezone>. If you requested a reset earlier and never received the email, please request a fresh one — older links may have expired.

---

## Template 5 — Security incident (we believe data was accessed)

This is the highest-stakes template. Do **not** publish without legal counsel sign-off. Tone: factual, specific, owns responsibility.

### INVESTIGATING (rarely posted publicly at this stage)

> We are investigating a security report. We will update this page when we have verified findings. Out of caution we have <action taken, e.g. "disabled the affected feature" or "rotated session tokens">.

### IDENTIFIED

> On <date> we discovered <specific factual description of what happened>. The data potentially involved was <specific list>. The data NOT involved was <specific list>. We have <containment actions taken>. Affected users have been emailed individually with specific guidance.
>
> We are required to report this to <relevant regulators if any>. We have <reported / will report by <date>>.

### RESOLVED

> The incident is contained. Our root-cause analysis is published at <link>. Our remediations are <list>. We continue to be available at security@psychage.com for any follow-up questions.

**Do not publish "RESOLVED" for a security incident without:** lawyer review, regulator-disclosure obligations met, individually-affected users notified, root-cause documented, remediation deployed.

---

## Template 6 — Crisis content unavailable

This is the highest priority outage on the platform per Sacred Rules. /crisis is the page that must never go down. Treat any /crisis incident as Sev 0.

### INVESTIGATING

> Our crisis resources page is currently unreachable. While we restore it:
>
> - **US**: 988 Suicide & Crisis Lifeline (call or text 988)
> - **US**: Crisis Text Line — text HOME to 741741
> - **International**: https://findahelpline.com
>
> If you are in immediate danger, call your local emergency number.

### IDENTIFIED

> Our crisis page is being restored. The hotlines above remain available 24/7 regardless of our platform status.

### RESOLVED

> The crisis resources page is fully available again at https://psychage.com/crisis. The 24/7 hotlines listed above are always available regardless of our platform.

---

## Operational notes

- **Channel order**: status page first, then Twitter/Mastodon if active, then in-app banner if architecturally available
- **Update cadence**: every 30 min during INVESTIGATING; every 60 min during IDENTIFIED; once at RESOLVED
- **Postmortem timeline**: within 48 hours for any incident lasting > 30 min user-visible; within 14 days for security incidents
- **Sacred-rule check**: before posting, verify no diagnostic language, no medical advice phrasing, person-first language preserved
- **Author voice**: "we" not "the team"; passive voice acceptable when describing the system, active when describing actions taken
