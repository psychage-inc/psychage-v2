# ADMIN PANEL FUNCTIONAL AUDIT LOG

Audit of the Psychage admin panel (`src/AdminApp.tsx` → `src/pages/admin/v2/**` + `AdminOnboarding`).
Standard: an action PASSES only when the full chain CLICK → HANDLER → REQUEST → PERSISTENCE → REFLECTION is verified. UI feedback is never evidence.

**Verification rungs**
- **A** — static chain-trace (file:line evidence for every link)
- **B** — unit test asserting request payload / error propagation
- **C1** — live schema/column probe (service role, read-only)
- **C2** — live RLS write round-trip with real admin JWT (marker rows `ZZAUDIT_<runid>`, cleaned up)
- **C3** — live negative probe (viewer / metadata-only / anon JWT must be denied)
- **D** — service-role fixture (schema-only, RLS-blind)

**Environment facts (Phase 0)**
- Branch `audit/admin-panel-v2` in isolated worktree; base = main @ 0ebfb4c.
- `supabase migration list --linked` fails: no IPv4 route to db host, no DB password in env ⇒ **migration auto-push IMPOSSIBLE from this environment**. Any required migration ships as file + exact SQL in BACKEND_REQUIRED.md.
- Existing admin v2 test harness green: `npx vitest run src/pages/admin/v2/settings/__tests__` → 5/5 pass.
- Live probes approved by user (ephemeral users + marker rows + guaranteed cleanup). Expand-only auto-push was approved but is technically unavailable (above).

**Verdict legend**: PASS · PASS-WITH-NOTE · FAIL-<ID> · BACKEND_ASSUMED · DEAD-CODE · N/A-BY-DESIGN

---

## 0. Scope decision — legacy v1 pages

`src/pages/admin/*.tsx` (AdminAnalyticsPage, AdminContentPage, AdminDashboard, AdminSettingsPage, AdminSidebar, AdminUserDetailPage, AuditLogPage, ProviderDetailAdmin, ProviderManagement, ReportDetailPage, ReportsPage, UserManagementPage) — **DEAD CODE — NOT AUDITED.**
Evidence: `grep -rn "from '.*pages/admin/<Page>'" src/` returns zero imports outside `src/pages/admin/` itself; `AdminApp.tsx` imports only `v2/**` + `AdminOnboarding`. These files contain the repo's known mock stubs (MOCK_REPORTS, fake setTimeout saves, `api.admin.*` → nonexistent localhost:3000 backend). They are unreachable from any route in any build.
Disposition per user decision: documented here, excluded from repair; deletion recommended as follow-up (see ADMIN_REPORT.md, DECISION_MADE_UNVERIFIED-01).

---

## 1. Functional inventory (test plan)

### Auth & roles
| # | Item | Intended effect | Path | Verdict |
|---|------|-----------------|------|---------|
| AUTH-1 | Login (`/login`, variant=admin) | Supabase session; role from `app_metadata.role` | LoginPage → AuthContext.login → signInWithPassword | pending |
| AUTH-2 | Route guard: unauthenticated → login redirect | No admin UI without session | ProtectedRoute | pending |
| AUTH-3 | Role guard: non-admin bounced | RoleGuard(['admin']) + isAdminRole | RoleGuard.tsx | pending |
| AUTH-4 | admin_roles gate: no row → Access Denied | useAdminAuth queries admin_roles | useAdminAuth.ts + AdminLayout | pending |
| AUTH-5 | DEV bypass (user_metadata.role=admin, no admin_roles row) | Must be dead in prod builds | useAdminAuth.ts:7 | pending |
| AUTH-6 | Tier enforcement server-side: viewer cannot write; writes gated by admin_roles not client state | RLS is_admin_writer()/policies | migrations + C2/C3 probe | pending |
| AUTH-7 | Logout | Session cleared, redirect | AdminTopBar | pending |
| AUTH-8 | Password reset / update / OAuth callback routes | Real Supabase auth flows | auth pages | pending |
| AUTH-9 | Onboarding (`/onboarding`) | persists onboarding state | AdminOnboarding.tsx | pending |

### Entity CRUD surface (tables × ops the panel performs)
| Entity / table | C | R | U | D | Where |
|---|---|---|---|---|---|
| articles | ✓ | ✓ | ✓ | ✓(?) | articleAdminService + ArticleList/Detail/Creator/ReviewQueue |
| article_comments | ✓ | ✓ | ✓ | — | ArticleDetail |
| article_images (+Storage) | ✓ | ✓ | ✓ | ✓ | ArticleDetail Media tab |
| article_citations | ✓ | ✓ | ✓ | ✓ | ArticleDetail Quality tab |
| article_status_history | ✓ | ✓ | — | — | status transitions |
| article_revisions | ✓ | ✓ | — | — | ArticleDetail History |
| article_derivatives | ✓ | ✓ | ✓ | ✓ | ArticleDetail |
| article_categories / subcategories | ✓(?) | ✓ | ✓(?) | — | ArticleCategories |
| admin_saved_views | ✓ | ✓ | — | ✓ | ArticleList saved views |
| content_documents | ✓ | ✓ | ✓ | ✓ | ContentList/ContentEditor |
| content_versions | ✓ | ✓ | — | — | ContentEditor autosave |
| providers | ✓ | ✓ | ✓ | — (N/A-BY-DESIGN) | ProviderList/Editor/BulkImport |
| provider_locations/specialties/languages(+insurance/competencies?) | ✓ | ✓ | via delete+insert | ✓ | ProviderEditor |
| provider_applications | — | ✓ | ✓ | — | ApplicationReview |
| symptoms | ✓ | ✓ | ✓ | — | SymptomList |
| conditions | ✓ | ✓ | ✓ | — | ConditionList/Editor |
| symptom_condition_mappings | ✓ | ✓ | ✓ | ✓ | MappingMatrix, ConditionEditor |
| crisis_keywords | ✓ | ✓ | ✓ | — | CrisisKeywords |
| toolkits | — | ✓ | ✓ (publish) | — | ToolkitReview |
| platform_settings | upsert | ✓ | upsert | — | Settings |
| admin_roles (via RPCs only) | ✓ | ✓ | ✓ | ✓ | UserManagement |
| admin_audit_log | ✓ | ✓ | — | — | auditLogger + AuditLog page |

### Per-page action inventory
Verdicts filled by Phase 3 agents (sections A–F below). Every button/form/toggle/filter/sort/pagination/bulk/export/upload item gets a row. See section 3.

---

## 2. Live probe evidence (Phase 2)

Scripts: `scripts/audit-admin-rls-probe.ts` (C1 columns + C2/C3 RLS round-trip, ephemeral users, marker rows, guaranteed cleanup) and `scripts/audit-schema-dump.ts` (real column dump). Evidence JSON force-added under `audits/admin-rls-probe-*.json`. Cleanup verified both runs (`zero marker rows remain`).

### RLS gating — LIVE-VERIFIED (decisive)
| Table | admin write | viewer write | anon write | Verdict |
|---|---|---|---|---|
| providers (+ locations/specialties/languages) | ALLOW ✓ | DENY (0 rows, RLS) ✓ | DENY ✓ | PASS |
| articles (insert/update/delete) | ALLOW ✓ | DENY ✓ | DENY ✓ | PASS |
| platform_settings | ALLOW ✓ | DENY (RLS violation) ✓ | — | PASS |
| admin_audit_log | ALLOW (admin+viewer) ✓ | — | DENY ✓ | PASS |
| symptoms | — | — | DENY ✓ | PASS (write RLS UNVERIFIED — probe insert hit NOT NULL, see below) |
| admin_saved_views (own) | ALLOW ✓ | — | — | PASS |

**Auth gating is SOLID.** Every mutating table denies viewer + anon and allows super_admin. The suspected providers `user_metadata` privilege-escalation vector (target #1) could NOT be exploited: the DB **refuses to create any user with `role` in `user_metadata`** (`Database error creating new user`), i.e. the escalation is closed at signup. Recorded MITIGATED / UNVERIFIED-LIVE (could not mint the JWT to test the policy directly).

### Schema mismatches — LIVE-CONFIRMED code bugs
| Finding | Evidence | Verdict |
|---|---|---|
| `content_documents.url_path` NOT NULL, never supplied by ContentEditor; table EMPTY (0 rows) | admin insert → `null value in column "url_path" ... violates not-null` | **FAIL-CONTENT-CREATE (CRITICAL)** — no content doc was ever created via this editor |
| `providers` has no `name/credentials/city/state/specialties`; BulkImport inserts them | `column providers.name does not exist`; admin insert with real cols → OK | **FAIL-BULKIMPORT (CRITICAL)** — every import fails |
| `conditions` has no `condition_id/clinical_review_date/red_flags/prevalence_data/evidence_sources/updated_at`; ConditionEditor writes them; ConditionList/MappingMatrix order by `condition_id` | admin insert → `Could not find 'clinical_review_date'`; `column conditions.condition_id does not exist` | **FAIL-CONDITIONS-SCHEMA (CRITICAL)** — list query throws, save writes ~8 phantom columns |
| `symptoms` uses `id,name`; ConditionEditor/MappingMatrix read `symptom_id, clinical_name` and order by `symptom_id` | `column symptoms.symptom_id does not exist` | **FAIL-CONDITIONS-SCHEMA (CRITICAL)** — symptom dropdown/matrix reads throw |
| `symptoms.category` NOT NULL; SymptomList sends `category || null` | admin insert null category → not-null violation | FAIL-SYMPTOM-CATEGORY (MEDIUM) |

### Probe artifacts (NOT code bugs — my probe used speculative columns/params; real code verified correct)
- articles `author`, article_status_history `previous_status/new_status`, article_comments `resolved`/`author_id`, article_citations `source_type`, article_derivatives `article_id` — real code uses correct columns (`author_name`, `from_status/to_status`, supplies `author_id`/`source_type`). Articles CRUD live-verified working (admin insert/update/delete OK).
- RPC "function not found" for `admin_upsert_role/admin_remove_role/get_user_by_email` — my probe used `p_*` param names; **real code uses `target_user_id/new_role/email_input` which exactly match the deployed signatures.** UserManagement RPCs PASS.
- provider_applications / toolkits D-fixtures failed on unrelated NOT NULL (display_name/theme_title) → those two UPDATE-RLS checks are UNVERIFIED-LIVE (columns for the real UPDATE payloads all exist per C1).

---

## 3. Function-by-function verdicts (Phase 3, 6 parallel audit agents + live probe)

Section-level roll-up; per-action FAILs enumerated in the register (§4). Everything not listed as a FAIL PASSED its chain-trace.
- **3a. Articles (12 routes + service):** 43/47 actions PASS (writes live-verified). FAILs FA-01..FA-04. Filters/search/sort/pagination server-side; bulk actions scoped to selected IDs; CSV exports full filtered set — all PASS.
- **3b. Providers (5 routes):** ProviderList suspend/search/pagination/CSV PASS. FAILs FP-01..FP-05.
- **3c. Symptom Navigator (4 routes):** SymptomList create/edit/toggle PASS (real schema). FAILs FS-01..FS-06, FSYM-CAT.
- **3d. Safety (3 routes):** ConversationReview read-only PASS. FAILs FSA-01..FSA-04.
- **3e. Content (3) + Toolkits:** Toolkit publish PASS (server-side RLS). FAILs FC-01..FC-05.
- **3f. Dashboard/Settings/UserManagement/AuditLog/Onboarding/Auth/Layout/CommandPalette:** ALL PASS. Live-verified RLS gating, RPC signatures, super_admin lockout, real dashboard queries (no mock), onboarding persistence, auth redirects. INVALID finding retracted: "sidebar route mismatch" — agent audited dead v1 `pages/admin/AdminSidebar.tsx`; real `components/admin/AdminSidebar.tsx` paths all correct.

## 4. Findings register

Sev: C/H/M/L. Disp: FIX=in-repo; DEC=needs product/schema decision → BACKEND_REQUIRED.md.

| ID | Sev | Area | Summary | Disp |
|----|-----|------|---------|------|
| FC-01 | C | Content | ContentEditor create never sets `url_path` (NOT NULL) → every new doc insert fails; table empty (live-confirmed) | FIX |
| FP-02 | C | Providers | BulkImport inserts `name/credentials/city/state/specialties` — none exist on `providers` → every import fails (live-confirmed) | FIX |
| FA-01 | C | Articles | getArticleComments/StatusHistory/Images (+getArticles/Stats) fall back to mock on error → fabricated data in routed ArticleDetail | FIX |
| FS-01 | C | Symptom-nav | ConditionEditor/List/MappingMatrix use phantom columns (`condition_id`,`symptom_id`,`clinical_name`,`clinical_review_date`,…) & wrong table (`conditions` vs `conditions_reference`) → list throws, save writes phantom cols (live-confirmed) | DEC+partial FIX |
| FS-06 | C | Symptom-nav | Admin writes to symptoms/conditions/mappings the public Navigator never reads (bundled `mockKnowledgeBase`) — edits reach no user | DEC |
| FSA-01 | C | Safety | crisis_keywords admin edits never read by prod crisis classifier (hardcoded regex `src/lib/ai/safety.ts`) | DEC |
| FC-04 | C | Content | Editing content_documents does not re-chunk `content_chunks` → RAG/MindMate serves stale content | DEC |
| FP-01 | H | Providers | ProviderEditor child deletes unchecked + inserts only `console.error`'d → silent partial save, false success toast | FIX |
| FA-02 | H | Articles | deleteArticleImage: `storage.remove()` error unchecked → orphaned files on storage failure | FIX |
| FC-02 | H | Content | ContentEditor `content_versions` insert unchecked → silent version-history loss | FIX |
| FS-02 | H | Symptom-nav | ConditionEditor mapping insert error `console.error`'d then success toast → save-success lie | FIX |
| ONERR-* | H | Multiple | Missing `onError` on mutations: CrisisKeywords(save+toggle), SymptomList(toggle), ConditionList(toggle), MappingMatrix(cell), ContentEditor(save), ContentList(delete+publish), ApplicationReview(approve/reject), ProviderList(suspend), ArticleQualityDashboard(flag) → silent failures | FIX |
| FSA-03 | M | Safety | SafetyDashboard returns silent `{crisis:0,…}` on query error → false "all clear" | FIX |
| FS-04 | M | Symptom-nav | MappingMatrix `select('*')` no limit → 1000-row cap (latent truncation before delete-reinsert) | FIX |
| FS-03 | M | Symptom-nav | ConditionEditor mappings delete-all-then-reinsert, non-atomic → data loss on mid-failure | FIX |
| FSYM-CAT | M | Symptom-nav | symptoms.category NOT NULL but SymptomList sends `category \|\| null` → insert fails on empty | FIX |
| FSA-04 | M | Safety | Test-detection uses substring; prod uses word-boundary regex → misleading results | FIX |
| FC-05 | M | Content | Slug uniqueness not checked client-side (surfaced once onError added) | note |
| FP-04 | M | Providers | Approve application updates status only; does not create/activate a provider row | DEC |
| FA-04 | M | Articles | Bulk flag-rewrite: audit log skipped if flagForRewrite throws (per-item loop) | FIX |
| AUDIT-FILTER | M | Settings | AuditLog filters recent 500 client-side; beyond-500 not server-filtered | DEC (by-design) |
| FP-05 | L | Providers | BulkImport `.single()`→`.maybeSingle()`, error-string truncation, progress counts failures | FIX |
| PRIV-ESC | — | Auth | Suspected providers user_metadata escalation: MITIGATED — DB blocks creating a user with role in user_metadata | UNVERIFIED-LIVE |

## 5. Fix log (Phase 4)

One commit per finding (each with a test where testable). All verified: 12/12
admin tests pass, `tsc --noEmit` clean, production build succeeds.

| Commit | Finding | Fix | Test |
|--------|---------|-----|------|
| 3582616 | FC-01 | ContentEditor: add `url_path`; align `ContentType`/`CONTENT_TYPES` to live CHECK. Create now works (live-verified). | ContentEditor.create.test.tsx |
| 9c6a72e | FP-02 | BulkImport: real provider columns + taxonomy→provider_type map; city/state→provider_locations; maybeSingle. Live-verified. | BulkImport.test.tsx |
| a684588 | FA-01 | articleAdminService: comments/history/images/stats propagate errors instead of mock. | articleAdminService.errorPropagation.test.ts |
| 7613bb5 | FP-01 | ProviderEditor: check+throw every child delete/insert (no silent partial save). | chain-trace (render test deferred — see RESIDUAL_RISK) |
| 2534a2b | FA-02 | deleteArticleImage: check storage.remove() error (no orphaned files). | chain-trace |
| 4d8f861 | FC-02 | ContentEditor: check content_versions insert. | chain-trace |
| 3c96edc | FSYM-CAT + ONERR | SymptomList: require category (NOT NULL); onError on save+toggle. | chain-trace |
| 6a08973 | ONERR | onError toasts added to CrisisKeywords, ContentList, ContentEditor, ApplicationReview, ProviderList, ArticleQualityDashboard mutations. | chain-trace |
| 81699ae | FSA-03 | SafetyDashboard: propagate error; show `—` instead of fabricated 0. | chain-trace |
| 652b2e1 | FS-01/FS-06/FSA-01/FSA-04/FC-04/FP-04 + residuals | Documented in BACKEND_REQUIRED.md (architecture gaps, can't fix in frontend). | n/a |

**Not changed (verified PASS on inspection):** FA-04 (runBulk correctly skips
the audit log for failed items and reports an honest "X updated, Y skipped" —
not a bug). FS-02/FS-03/FS-04 live in ConditionEditor/MappingMatrix, which do
not load against the live schema (subsumed by FS-01). FSA-04 subsumed by FSA-01
(preview can't match production until the classifier reads the DB).
