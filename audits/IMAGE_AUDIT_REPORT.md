# Image Coverage Audit — Psychage v2

**Date:** 2026-06-20 · **Scope:** article & content cover posters only (no mascot/clay/app-identity assets)
**Credential:** Supabase **service-role** key (reads ALL statuses; RLS bypassed) · project `ozourhqyqtpppvpbhphw`
**Method:** READ-ONLY — PostgREST `SELECT` + storage `HEAD`. Nothing written, generated, uploaded, or renamed.

---

## Headline — Total images needed: **325**

| Split | Images needed | Nature |
|---|---:|---|
| **published** | **0** | Live site fully covered — all 1,203 resolve `200`. |
| **draft** | **173** | Forward generation batch — `hero_image_url` set, cover never generated. |
| **archived** | **152** | Legacy / not live — 151 dead links + 1 empty field. |
| `rewritten_session038` | 0 | 5-row artifact status, all resolve `200`. |
| **TOTAL** | **325** | = `needs-null` 1 + `needs-dead` 324 |

**The published live site has zero image gaps.** The entire 325-item gap lives in `draft` (the real forward batch) and `archived` (legacy, likely ignorable). The prior anon-key hypothesis — "all 1,203 published resolve" — is **confirmed**.

---

## Bucket counts (every row classified into exactly one)

| Bucket | Count | Definition |
|---|---:|---|
| `complete` | 1,678 | populated + `200` + canonical path |
| `needs-null` | 1 | `image` **and** `hero_image_url` both empty |
| `needs-dead` | 324 | populated but missing/dead (320 Supabase "Object not found" + 4 Unsplash `404`) |
| `flag-offpattern` | 3 | populated + `200` but non-canonical host (Unsplash, archived legacy) |
| `flag-shared` | 0 | no URL is shared by >1 row |
| **TOTAL** | **2,006** | |

**Reconciliation (per status, `complete + null + dead + flags == total`):**

| status | complete | null | dead | offpat | sum | total | ✓ |
|---|---:|---:|---:|---:|---:|---:|:--:|
| published | 1203 | 0 | 0 | 0 | 1203 | 1203 | OK |
| draft | 470 | 0 | 173 | 0 | 643 | 643 | OK |
| archived | 0 | 1 | 151 | 3 | 155 | 155 | OK |
| rewritten_session038 | 5 | 0 | 0 | 0 | 5 | 5 | OK |
| **ALL** | **1678** | **1** | **324** | **3** | **2006** | **2006** | OK |

CSV row count = 325 = (`needs-null` 1 + `needs-dead` 324). ✓

---

## Images-needed by status × category

**draft (173) — the forward batch:**

| Category | Needed |
|---|---:|
| Applied Life Skills, Self-Design & Practical Psychology | 110 |
| Spirituality, Meaning & Existential Mental Health | 58 |
| Women's Mental Health | 4 |
| Environmental, Eco-Psychology & Planetary Mental Health | 1 |

**archived (152) — legacy:**

| Category | Needed |
|---|---:|
| Psychosis, Schizophrenia & Severe Mental Illness | 65 |
| Women's Mental Health | 62 |
| Aging, Dementia & Late-Life Mental Health | 15 |
| (no category) | 5 |
| Loneliness, Social Connection & Belonging | 4 |
| Habits, Motivation & Behavior Change | 1 |

---

## Phase 1 — Database field coverage (all statuses)

Live total: **2,006** rows. Statuses present: `published` 1203, `draft` 643, `archived` 155, `rewritten_session038` 5.

| status | total | `hero` null | `hero` pop | `image` null | `image` pop | effective (img‖hero) null | eff pop |
|---|---:|---:|---:|---:|---:|---:|---:|
| published | 1203 | 0 | 1203 | 1203 | 0 | 0 | 1203 |
| draft | 643 | 0 | 643 | 643 | 0 | 0 | 643 |
| archived | 155 | 8 | 147 | 148 | 7 | 1 | 154 |
| rewritten_session038 | 5 | 0 | 5 | 5 | 0 | 0 | 5 |
| **ALL** | **2006** | **8** | **1998** | **1999** | **7** | **1** | **2005** |

- `hero_image_url` is the real cover field (populated 1998/2006). The `image` column is effectively unused (7 rows, all archived) — it serves only as the detail-page fallback in `image ‖ hero_image_url`.
- **Field-empty gap is tiny (1 row).** The real gap is dead links, not empty fields.

---

## Phase 2 — Storage resolution (HEAD, throttled ≤5 concurrent, ~250 ms spacing)

2,005 distinct URLs checked (every populated row has a unique URL). HTTP code distribution:

| code | count | meaning |
|---|---:|---|
| `200` | 1681 | resolves (1678 canonical + 3 Unsplash) |
| `400` | 320 | **Supabase "Object not found"** — see note | 
| `404` | 4 | dead external (Unsplash) |
| `429` / `5xx` | 0 | none — no rate-limiting hit |

> **Supabase quirk:** a missing storage object returns **HTTP `400`** with body `{"statusCode":"404","error":"not_found","message":"Object not found"}`, not a clean `404`. Verified by GET body inspection + re-check at 1 req/s (20/20 stable). These 320 are genuinely missing covers, **not** throttling.

---

## Phase 3 — URL quality flags (URL-level only)

- **Distinct URLs = populated rows = 2,005 → zero sharing.** No placeholder/duplicate-cover signal. (`flag-shared` = 0.)
- **Off-pattern: 7**, all `images.unsplash.com` on **archived** rows (legacy seed data). 4 are dead (`404`), 3 resolve (`flag-offpattern`). All 1,998 active covers follow canonical `article-images/covers/CATxx-NNN.jpeg`.
- **Out of scope:** this run cannot judge visual style (clay vs off-aesthetic) — that needs human/visual inspection of the resolving `200` covers.

---

## RLS blind-spot note

**No blind spot in this run.** The service-role key read all 2,006 rows across every status. For contrast, an anon/public key (RLS: published-only) would have hidden **803 rows** — `draft` 643 + `archived` 155 + `rewritten_session038` 5 — which is **exactly where 325/325 of the gap lives**. The earlier anon-only check that reported "all published resolve" was correct *for published* but structurally blind to the entire real gap.

## Divergences from the brief (recorded, not blocking)

1. **Rendered field is `image ‖ hero_image_url`, not `hero_image_url` alone** ([articleService.ts:132](../src/services/articleService.ts#L132)). In practice `image` is ~empty, so effective == `hero_image_url`. Both measured; numbers identical except 7 archived fallback rows.
2. **Statuses differ:** brief assumed `published/draft/unverified/archived`. Actual live: `published/draft/archived` + `rewritten_session038`. There is **no `unverified`** status, and the CHECK-allowed `in_review/approved/rejected/paused` have **zero rows**. `rewritten_session038` (5 rows) is not even in the table's CHECK constraint — a non-canonical status string worth a separate look.
3. **`categories` and `conditions` carry no image column.** `article_categories` (48 rows) renders via `icon`/`color`; `conditions` (5 rows) links via `article_id`. Only `articles` bears cover posters. So the audit surface = `articles` only.
4. List/card grid (`/learn`) is `published`-only and reads `hero_image_url`; article detail reads `image ‖ hero_image_url`.

---

## Files
- `audits/IMAGE_AUDIT_REPORT.md` — this report.
- `audits/images_needed.csv` — 325 rows, one per item needing an image. Columns: `table,id,slug,title,category,status,image_field,url,bucket,reason`.

## Verification performed
1. Per-status reconciliation balances (table above). ✓
2. CSV row count (325) == `needs-null` + `needs-dead`. ✓
3. Hand spot-check: draft-dead URL → `400` (missing), Unsplash → `404` (dead), a `complete` published URL → `200` (absent from CSV). ✓
4. 20-URL slow re-check (1 req/s) of the `400` set → 20/20 still missing (not residual throttle). ✓
