# Psychage Launch Readiness

**Last updated:** 2026-04-29
**Branch at scaffold time:** `launch/cross-cutting-readiness`
**Base:** `main` at `8028c80` (post user-site readiness `6570ce0` + admin readiness `6ee0e4f`)
**Audience:** the operator (you) on launch day

This document is your go/no-go checklist. Every item is either:

- 🟢 **READY** — confirmed in code or by inspection
- 🟡 **WAITING** — depends on an external action (translator, DNS propagation, dashboard config, etc.)
- 🔴 **BLOCKING** — must be resolved before launch

When all items are 🟢, you are ready to launch. Yellow items each have an explicit dependency. Red items each have an explicit fix.

This document is the consolidated cross-cutting view. It rolls up the operator-handled / dashboard / external-action items from all five prior workstream summary docs (3 auth + 2 launch) and adds cross-cutting concerns that exist outside the codebase entirely.

---

## §1. Operational Items (Dashboard, DNS, Deploy)

### 1.1 Supabase Dashboard

_Filled in Phase B._

### 1.2 Domain & DNS (psychage.com + admin.psychage.com)

_Filled in Phase B._

### 1.3 Vercel Deploy

_Filled in Phase B._

### 1.4 Edge Functions

_Filled in Phase B._

### 1.5 Migrations & Data

_Filled in Phase B._

### 1.6 Translation

_Filled in Phase B._

---

## §2. Security Verification (System-Level)

### 2.1 Headers as deployed

_Filled in Phase C._

### 2.2 Bundle secrets check

_Filled in Phase C._

### 2.3 Security scanner results

_Filled in Phase C._

### 2.4 OAuth provider production posture

_Filled in Phase C._

---

## §3. Legal & Compliance

### 3.1 Required public pages

_Filled in Phase D._

### 3.2 Cookie & consent

_Filled in Phase D._

### 3.3 Mental-health-platform copy compliance

_Filled in Phase D._

### 3.4 Accessibility statement

_Filled in Phase D._

### 3.5 GDPR / CCPA basics

_Filled in Phase D._

---

## §4. Performance Baseline

### 4.1 Lighthouse scores

_Filled in Phase E._

### 4.2 Bundle size budget

_Filled in Phase E._

### 4.3 Slow-network simulation

_Filled in Phase E._

### 4.4 Database query baselines

_Filled in Phase E._

---

## §5. Monitoring & Observability

### 5.1 Sentry capture

_Filled in Phase F._

### 5.2 Alerts & paging

_Filled in Phase F._

### 5.3 Error budgets

_Filled in Phase F._

### 5.4 Uptime monitoring

_Filled in Phase F._

---

## §6. Incident Readiness

### 6.1 Rollback rehearsal

_Filled in Phase G._

### 6.2 On-call & escalation

_Filled in Phase G._

### 6.3 Status page

_Filled in Phase G._

### 6.4 Communication templates

_Filled in Phase G._

---

## §7. Critical Path Smoke Tests

### 7.1 User-site critical paths

_Filled in Phase H._

### 7.2 Admin critical paths

_Filled in Phase H._

### 7.3 Cross-domain flows

_Filled in Phase H._

---

## §8. Final Go/No-Go

When this section is filled in with 🟢 across all sections above, you are ready.

Totals computed in Phase I.

**Operator sign-off:** _______________ Date: _______________
