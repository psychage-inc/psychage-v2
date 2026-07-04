# BACKEND_REQUIRED — admin panel

Work that cannot be completed inside this repo/frontend and must be resolved by
whoever owns the database schema, the RAG/ingestion pipeline, and the public
Symptom-Navigator data source. Each item is specified precisely enough to hand
off. Severity reflects impact on the admin panel's promise that "every function
actually works."

Environment note: the Supabase CLI in this workspace cannot reach the prod DB
(no IPv4 route, no DB password in `.env`), so **no migration could be applied
from here**. Every SQL block below must be applied by someone with dashboard or
authenticated-CLI access, then re-verified with `scripts/audit-admin-rls-probe.ts`.

---

## FS-01 — Symptom-Navigator conditions/mappings target an undeployed schema (CRITICAL)

**Symptom.** `/symptom-navigator/conditions`, `/conditions/:id/edit`, and
`/mappings` are non-functional against the live database.

**Evidence (live probe + schema dump).**
- `ConditionList` orders by `condition_id`; the live `conditions` table has no
  such column → the list query throws on load.
- `ConditionEditor` reads `symptoms` as `symptom_id, clinical_name` (live columns
  are `id, name`) and writes `conditions` with `condition_id, duration_threshold,
  min_symptom_count, red_flags, clinical_review_date, educational_content_id,
  prevalence_data, evidence_sources, updated_at` — **none of which exist** on the
  live `conditions` table (probe: `Could not find 'clinical_review_date'`).
- `MappingMatrix` orders `symptoms` by `symptom_id` and `conditions` by
  `condition_id` (both absent) → both queries throw on load.
- Live table realities: `conditions` = 8 columns / **5 rows** (id, article_id,
  category, name, description, is_active, recommended_action, created_at) — looks
  abandoned. `conditions_reference` = **113 rows** with a *different* rich shape
  (icd11_code, deep_sections, how_it_differs, what_it_feels_like, sources, …) and
  is what the public Learn pages read (via the `conditions_reference_public`
  view). `symptom_condition_mappings` = 0 rows.

**Conclusion.** This admin sub-section was built against a symptom-condition
weight-model schema that was never deployed. Neither live table matches it.

**Decision required (DECISION_MADE_UNVERIFIED — pick one):**
1. **Deploy the intended schema.** Add the missing columns/tables the UI expects
   (`conditions.condition_id` + clinical fields, `symptoms.symptom_id/clinical_name`,
   `symptom_condition_mappings` weight rows) via migration, then this UI works as
   written. This creates a *third* conditions dataset — reconcile with
   `conditions_reference` first.
2. **Repoint the admin to `conditions_reference`** (the table users actually read)
   and rebuild `ConditionEditor` around its shape (icd11_code, deep_sections, …).
   Larger change; makes admin edits reach the Learn pages. Does **not** fix the
   interactive Navigator (see FS-06).
3. Retire the conditions/mappings admin if the weight-model navigator is dead.

Until one is chosen, `ConditionEditor`/`MappingMatrix`/`ConditionList` cannot be
made to work by frontend edits alone. Sub-findings FS-02 (mapping insert error
swallowed), FS-03 (non-atomic delete-then-reinsert), FS-04 (unbounded mappings
`select('*')` → 1000-row cap) all live in these files and become relevant only
once the target schema exists; fix them as part of whichever path is chosen.

---

## FS-06 — Symptom-Navigator admin edits never reach the public app (CRITICAL, data-integrity)

**Symptom.** Even the *working* part of this section (`SymptomList`, which
correctly reads/writes the real `symptoms` table) has no effect on what users see.

**Evidence.** The public interactive Symptom Navigator reads a **bundled
`mockKnowledgeBase`** (106 symptoms / 45 conditions / 448 mappings) —
`src/context/NavigatorContext.tsx:224-231`, `fetchKnowledgeBaseData()` returns
`mockKnowledgeBase` with a comment "no fetch needed in client-only Vite app." No
runtime read of `symptoms`/`conditions`/`symptom_condition_mappings` exists
outside the admin panel (grep-verified).

**Required.** Decide the source of truth and wire it:
- either make the Navigator fetch from the DB tables the admin writes (add a read
  path + RLS public-read policies), or
- add a build/publish step that regenerates `src/data/mock_knowledge_base` from the
  DB so admin edits propagate on deploy.

Contract for a DB-backed Navigator read (if chosen): public/anon `SELECT` on the
three tables filtered to `is_active = true`, shaped into the existing
`KnowledgeBase` type in `src/data/mock_knowledge_base`.

---

## FSA-01 — Crisis keywords are edited but never enforced (CRITICAL, data-integrity)

**Symptom.** `/safety/keywords` CRUD persists to `crisis_keywords` correctly
(live-verified), but changes have zero effect on crisis detection.

**Evidence.** Production crisis classification uses **hardcoded regex** in
`src/lib/ai/safety.ts` (`CRISIS_KEYWORDS`/`URGENT_KEYWORDS`, ~line 49-80), invoked
by `api/ai/chat.ts` → `classifyInputSafety()` → `keywordPreCheck()`. It never
queries `crisis_keywords`. Nothing in `src/` or `api/` reads that table at runtime.

**Required (safety-critical — do not let the frontend silently rewire this).**
Make the classifier load active `crisis_keywords` (by severity, with word-boundary
matching) and merge them with the hardcoded baseline, or formally designate the
table as the source of truth and migrate the hardcoded patterns into it. Until
then the admin UI is editing data no system consumes.

Contract: server-side read of `crisis_keywords WHERE is_active = true`, compiled to
word-boundary regex per `severity` (`CRISIS`/`URGENT`/`WATCH`), cached with a short
TTL, unioned with the existing baseline patterns. This also resolves **FSA-04**
(the admin "test detection" preview uses substring `.includes()` and cannot match
production until production and the preview share one keyword source + matcher).

---

## FC-04 — Editing a content document does not refresh its RAG chunks (CRITICAL, data-integrity)

**Symptom.** Editing a `content_documents` row via `/content/:id/edit` saves the
document, but MindMate keeps citing the old text.

**Evidence.** RAG retrieval reads `content_chunks` (`src/lib/ai/retrieval.ts`,
`search_content_documents` RPC). Chunks are (re)generated only by the ingestion
pipeline `src/lib/ai/ingestion.ts` (`ingestDocument` deletes+regenerates chunks and
embeddings), which the admin UI never calls. So `content_body` edits never reach the
chunk/embedding layer.

**Required.** After a successful `content_documents` upsert, trigger re-ingestion:
- expose a server endpoint (needs `OPENAI_API_KEY` for embeddings, server-side) that
  runs `ingestDocument` for the saved doc, and call it from `ContentEditor`'s save
  `onSuccess`; or
- a DB trigger / queue that re-chunks on `content_documents` change.

Contract: `POST /api/content/:id/reingest` → runs `ingestDocument(doc)` →
`{ chunks: number }`. Until it exists, `ContentEditor` should show a "search index
update pending" note (frontend can add once the endpoint is specified).

---

## FP-04 — Approving a provider application creates no provider (MEDIUM, decision)

**Symptom.** `/providers/applications` "Approve" sets
`provider_applications.status = 'approved'` but does not create/activate a
`providers` row, so an approved applicant never appears in the directory.

**Evidence.** `ApplicationReview.tsx` updateStatus only writes the application row.
Schema has `providers.application_id` (migration 20260310000003) but no
trigger/RPC promotes an approved application into a provider.

**Required (decision).** Either add an RPC/trigger `approve_provider_application(app_id)`
that inserts a `providers` row (display_name, provider_type_id, contact fields,
`verification_tier`, `status='active'`, `application_id`) inside the same
transaction as the status change, or confirm approval is intentionally advisory and
relabel the UI ("Accept application — create the provider separately"). The frontend
can wire either once chosen.

---

## FP-02 (residual) — NPPES taxonomy → provider_specialties not mapped (LOW)

The bulk-import fix (shipped) creates the provider + primary location, but drops the
NPPES taxonomy strings because `provider_specialties` needs a `specialty_id` FK and
no text→id map exists. To populate specialties on import, provide a mapping from NPPES
taxonomy descriptions to `specialties.id` (or a lookup table), then extend
`BulkImport.pickTypeSlug`'s sibling logic to insert `provider_specialties` rows.

---

## FC-01 (context) — content_documents.type CHECK drift (informational)

The shipped FC-01 fix aligned the frontend `ContentType`/`CONTENT_TYPES` to the
**live** CHECK (`article, condition_guide, coping_strategy, video_transcript, faq,
tool_description, crisis_resource`). Migration `20260310000002_content_versioning.sql`
intended a different set (`article, guide, faq, glossary, video_transcript,
infographic`) but never applied (its `CREATE TABLE IF NOT EXISTS` no-oped on the
existing table). If the newer taxonomy is desired, apply:

```sql
ALTER TABLE public.content_documents DROP CONSTRAINT IF EXISTS content_documents_type_check;
ALTER TABLE public.content_documents ADD CONSTRAINT content_documents_type_check
  CHECK (type IN ('article','guide','faq','glossary','video_transcript','infographic'));
```

…and revert the `ContentType` union to that set. Left as a decision because the live
constraint currently governs and the frontend now matches it.
