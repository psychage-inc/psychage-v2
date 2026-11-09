# ADMIN PANEL — FINAL AUDIT REPORT

Functional audit + repair of the Psychage admin panel. Standard applied: a
function "works" only when the full chain CLICK → HANDLER → REQUEST →
PERSISTENCE → REFLECTION is verified by its downstream effect. UI feedback was
never accepted as evidence. Verification used static chain-trace, unit tests
asserting request payloads, and **live probes against the production Supabase**
(ephemeral users + `ZZAUDIT_` marker rows, guaranteed cleanup — verified zero
residue both runs).

Branch: `audit/admin-panel-v2` (not merged — main auto-deploys prod). 11 commits.
Gates: **12/12 admin tests pass, `tsc --noEmit` clean, production build succeeds.**

---

## 1. Scope

Audited: the routed admin panel — `src/AdminApp.tsx` → `src/pages/admin/v2/**`
(21 pages, 32 routes) + `AdminOnboarding`. The legacy `src/pages/admin/*.tsx`
files (ReportDetailPage, AdminContentPage, AdminSettingsPage, etc.) are **dead
code** — zero imports outside their own directory, unreachable from any route,
and the sole home of the repo's mock stubs/fake `setTimeout` saves/`api.admin.*`
calls to a backend not in this repo. Excluded from repair per decision; deletion
recommended as a follow-up (DECISION-01 below).

## 2. Headline result

The panel's **auth and persistence core is sound** — but several individual
functions were **provably broken against the live database**, and three whole
sub-systems **write data the live app never reads**. The broken-in-code items are
fixed and verified; the write-nowhere items are architecture gaps specified in
`BACKEND_REQUIRED.md`.

**Live-verified working (unchanged):**
- RLS gating on every mutating table: super_admin allowed; **viewer and anon
  denied** on providers, articles, platform_settings, admin_audit_log, symptoms
  (probe evidence in `audits/admin-rls-probe-*.json`).
- Admin role management RPCs (`admin_list_roles`, `admin_upsert_role`,
  `admin_remove_role`, `get_user_by_email`) — correct signatures, super_admin-gated,
  last-super_admin lockout enforced server-side.
- Articles CRUD (create/update/delete/status/comments/citations/images/ratings),
  Dashboard queries (real, no mock), Settings upsert, AuditLog, Onboarding
  persistence, the full auth chain (ProtectedRoute/RoleGuard/useAdminAuth), the
  command palette, and the real sidebar (`components/admin/AdminSidebar.tsx`).
- Suspected providers `user_metadata` privilege-escalation: **mitigated** — the
  DB refuses to create a user with `role` in `user_metadata`, closing the vector
  at signup.

## 3. Fixed (with before → after)

| ID | Sev | Before (broken) | After (verified) |
|----|-----|-----------------|------------------|
| FC-01 | CRIT | Content document create sent no `url_path` (NOT NULL) and offered type values the live CHECK rejects → **every create failed**; table empty. | Derive `url_path`; align types to the live CHECK. Live insert succeeds; test asserts payload. |
| FP-02 | CRIT | NPI import inserted `name/city/state/specialties` — columns that don't exist → **every import failed**. | Real columns + `provider_type_id` (NOT NULL) mapping; city/state → `provider_locations`. Live insert succeeds; test asserts payload. |
| FA-01 | CRIT | getArticleComments/StatusHistory/Images/Stats returned **fabricated mock data** on any error → false success in ArticleDetail + Dashboard. | Propagate errors; consumers already guard undefined. Test asserts all four reject. |
| FP-01 | HIGH | ProviderEditor child-table deletes unchecked, inserts only `console.error`'d → **silent partial save** with "Changes saved". | Check + throw every child op; existing onError surfaces failure, form state retained. |
| FA-02 | HIGH | Article image delete ignored `storage.remove()` error → **orphaned files**, false success. | Check storage error before DB delete. |
| FC-02 | HIGH | Content version insert unchecked → **silent version-history divergence**. | Check + throw. |
| FSYM-CAT | MED | symptoms.category is NOT NULL; save sent `category \|\| null` → insert fails on empty. | Require category client-side. |
| ONERR | HIGH | 9 mutations across 6 pages had **no onError** → failures silent. | onError toasts added everywhere. |
| FSA-03 | MED | SafetyDashboard rendered **`0` on query error** = false "All Clear". | Propagate; render `—` on failure. |

## 4. Cannot be fixed in this repo — see BACKEND_REQUIRED.md

| ID | Sev | Gap |
|----|-----|-----|
| FS-01 | CRIT | ConditionEditor/ConditionList/MappingMatrix target an **undeployed schema** (phantom columns; wrong table — `conditions` (5 rows, abandoned) vs `conditions_reference` (113 rows, what users read)). Needs a schema decision. |
| FS-06 | CRIT | Symptom-Navigator admin edits never reach users — the public Navigator reads a **bundled `mockKnowledgeBase`**, not the DB. |
| FSA-01 | CRIT | Crisis-keyword edits never enforced — the classifier uses **hardcoded regex** and never reads `crisis_keywords`. (FSA-04 preview mismatch subsumed.) |
| FC-04 | CRIT | Editing a content document doesn't **re-chunk `content_chunks`** → MindMate keeps citing stale text. |
| FP-04 | MED | Approving a provider application creates **no provider row** (decision: auto-create RPC vs relabel). |

## 5. DECISION_MADE_UNVERIFIED

- **DECISION-01** — Legacy `src/pages/admin/*.tsx` are dead code; recommend deletion
  in a follow-up PR. Not deleted here (out of audit scope; deletion ≠ repair).
- **FC-01 url_path format** — chose `/${type}/${slug}`; no prior convention existed
  (table was empty). Adjust if a canonical content URL scheme is defined.
- **FC-01 content type set** — aligned frontend to the *live* CHECK; the newer
  migration's set (guide/glossary/infographic) was never applied. SQL to switch is
  in BACKEND_REQUIRED if that taxonomy is preferred.
- **FP-02 provider_type mapping** — NPPES taxonomy → provider_type via keyword
  buckets with individual/org fallback; refine if a formal crosswalk exists.

## 6. RESIDUAL_RISK (cannot be verified in this environment)

- **RLS re-verification after any BACKEND_REQUIRED migration** — the Supabase CLI
  here can't reach prod (no IPv4 route / DB password), so migrations couldn't be
  applied or re-probed. Anyone applying them must re-run `scripts/audit-admin-rls-probe.ts`.
- **ProviderEditor / ContentEditor full-form render tests** — deferred; these
  components load 6+ lookup queries + rich editors and are flaky under jsdom. FP-01
  and FC-02 are verified by chain-trace + the live-verified schema; the create-path
  payloads are covered by ContentEditor.create.test.tsx / BulkImport.test.tsx.
- **Real data volumes & concurrency** — pagination and the 420k-row provider
  directory were traced statically, not load-tested; concurrent-admin race behavior
  (e.g. delete-then-reinsert child saves under two editors) is unverified.
- **Backend contracts in BACKEND_REQUIRED.md** are specified, not implemented; the
  `/api/*` backend (`VITE_API_URL`) is not in this repo and was not exercised.
- **metadata-only privilege-escalation probe** was UNVERIFIED-LIVE only because the
  DB blocks creating such a user — inferred-safe, not directly asserted against the
  policy.

## 7. Inventory verdict

Every routed action received a verdict (full table in `ADMIN_AUDIT_LOG.md` §3–4).
Summary: Dashboard/Settings/UserManagement/AuditLog/Onboarding/Auth/CommandPalette
= PASS; Articles = PASS after FA-01/FA-02; Providers = PASS after FP-01/FP-02
(FP-04 → backend); Content = PASS after FC-01/FC-02/ONERR (FC-04 → backend);
Safety = PASS after FSA-03/ONERR (FSA-01 → backend); Symptom-Navigator SymptomList
= PASS after FSYM-CAT/ONERR, conditions/mappings = documented broken (FS-01/FS-06 →
backend). No inventory item was left without a verdict; nothing was hidden or
silently disabled.
