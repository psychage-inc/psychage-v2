# Archived Article Content Audit

**Date:** 2026-06-20 · **Supabase project:** `ozourhqyqtpppvpbhphw` · **Scope:** READ-ONLY (SELECT/GET only, no writes/migrations/code edits).

**Question:** Are the ~651 "empty" archived articles genuinely contentless, or is real body text sitting in some other column the original audit never checked?

**Verdict (one line):** Effectively **all 651 are truly empty of article body — 0 recoverable bodies.** The 650 rows that hold "text" in another column carry only auto-generated SEO boilerplate (`seo_description`) or sub-60-char summaries (`description`), not article content. Real article inventory does **not** rise: it stays at the existing ~1,350 (1,203 published + 147 archived-with-content).

---

## Phase 0 — Recon

### 1. Read path
- **Used:** `SUPABASE_SERVICE_ROLE_KEY` + `VITE_SUPABASE_URL` from repo `.env`, via PostgREST (`/rest/v1/`). Service role bypasses RLS, so archived rows are visible. Auth confirmed (HTTP 200).
- Also available: `supabase` CLI linked to `ozourhqyqtpppvpbhphw`. `psql` not installed (not needed — only 798 archived rows, fetched and classified client-side).
- The anon key was **not** used for the privileged read.

### 2. Full `articles` schema (text-ish columns flagged)
Pulled from PostgREST OpenAPI definition. Columns capable of holding **body** content:

| Column | Type | Body candidate? |
|---|---|---|
| `content` | text | **YES — primary** (holds HTML) |
| `description` | text | yes (short summary in practice) |
| `subtitle` | text | yes (hook line) |
| `video_transcript` | text | yes |
| `seo_description` | text | yes (meta blurb in practice) |
| `seo_title` | text | weak (title-length) |

**Columns that do NOT exist** (the original audit's worry list): `body`, `excerpt`, `summary`, `content_html`, `content_md`, `raw_content`, `raw`. None present. Other text columns (`rejection_reason`, `author_name`, `seo_keywords`, etc.) are metadata, not body. Hint columns: `word_count`, `original_word_count`.

### 3. Live counts (authoritative, via `Prefer: count=exact`)
| Metric | Count |
|---|---|
| Total archived (`status='archived'`) | **798** |
| — `content` IS NULL | **651** |
| — `content` NOT NULL | **147** |
| Published | **1,203** |
| Total (all statuses) | 2,006 |

The **798 / 147 / 651** split still holds exactly. **Note:** all 651 content-empty rows are `content IS NULL`; there are **zero** empty-string (`''`) or whitespace/HTML-shell rows. (The original "NULL or ''" definition resolves entirely to NULL here.)

---

## Queries used

```bash
# env (not echoed)
URL=$VITE_SUPABASE_URL ; SRK=$SUPABASE_SERVICE_ROLE_KEY
H=(-H "apikey: $SRK" -H "Authorization: Bearer $SRK")

# schema
curl -s "$URL/rest/v1/" "${H[@]}"      # -> definitions.articles.properties

# counts (Content-Range header gives exact total)
curl -sI "$URL/rest/v1/articles?status=eq.archived&select=id"                  "${H[@]}" -H "Prefer: count=exact" -H "Range: 0-0"
curl -sI "$URL/rest/v1/articles?status=eq.archived&content=is.null&select=id"  "${H[@]}" -H "Prefer: count=exact" -H "Range: 0-0"
curl -sI "$URL/rest/v1/articles?status=eq.archived&content=not.is.null&select=id" "${H[@]}" -H "Prefer: count=exact" -H "Range: 0-0"
curl -sI "$URL/rest/v1/articles?status=eq.published&select=id"                 "${H[@]}" -H "Prefer: count=exact" -H "Range: 0-0"

# full fetch of all 798 archived rows (classified in Python: HTML-strip + 30-char rule)
curl -s "$URL/rest/v1/articles?status=eq.archived&select=id,title,slug,category_id,status,content,description,subtitle,video_transcript,seo_description,seo_title,word_count,original_word_count,created_at&limit=2000" "${H[@]}"
```

**Definitions applied:** *real text* = strip HTML tags + entities + collapse whitespace, then `len >= 30`. *content-empty* = `content` NULL / `''` / shell (`<p></p>` etc.). *recoverable* = content-empty row with real text in some other column.

---

## Classification table (the 651 content-empty set)

| Bucket | Count |
|---|---:|
| Total archived | 798 |
| → with real `content` | 147 |
| → **content-empty** | **651** |
| &nbsp;&nbsp;• `content` = NULL | 651 |
| &nbsp;&nbsp;• `content` = `''` | 0 |
| &nbsp;&nbsp;• `content` = shell (`<p></p>`, whitespace) | 0 |
| **Other-column "real text" (per column, among the 651):** | |
| &nbsp;&nbsp;• `seo_description` | 643 |
| &nbsp;&nbsp;• `description` | 7 |
| &nbsp;&nbsp;• `subtitle` | 0 |
| &nbsp;&nbsp;• `video_transcript` | 0 |
| &nbsp;&nbsp;• `seo_title` | 0 |
| **Union — recoverable text in ≥1 other column (literal rule)** | **650** |
| **Truly empty — no real text in ANY column** | **1** |
| Real intended article (title + slug + category_id) | 643 |
| Orphan junk (missing category_id) | 8 |

Reconciliation: 651 NULL + 0 `''` + 0 shell = 651 content-empty; 651 + 147 with-content = 798 archived. ✓

### ⚠️ The "650 recoverable" is a false positive — it is NOT article body
- **`seo_description` (643 rows):** auto-generated boilerplate. Stripped length min 71 / median 97 / **max 300** chars. 400 are the literal template `"Explore <title> — evidence-based insights for mental health and wellbeing."` These are meta blurbs derived from the title, not the 800–2,150-word body the row claims.
- **`description` (7 rows):** legacy seed/mock one-liners, 36–58 chars (e.g. *"Signs of burnout and how to recover."*). Summaries, not bodies.
- **`word_count` is a placeholder, not evidence of present text:** among content-empty rows the histogram is round stubs — `800`×400, `1200`×169, `2000`×18, `0`×8. The body those numbers counted is absent from every column. word_count > 0 here means "a body was *planned/once existed*," not "a body is recoverable now."

**Recoverable article BODY = 0.** No column holds the article text.

---

## Sample rows

**content=NULL, `seo_description` has text (boilerplate) — 8 of 643:**
| id | wc | title | seo_description |
|---|--:|---|---|
| e2fc1dc8 | 800 | Climate Migration | "Explore climate migration — evidence-based insights for mental health and wellbeing." |
| dd2011ac | 800 | Wilderness Therapy | "Explore wilderness therapy — evidence-based insights…" |
| 3da95472 | 800 | Ecopsychology | "Explore ecopsychology — evidence-based insights…" |
| 1780034f | 800 | The Psychology of Pro-Environmental Behaviour | "Explore the psychology of pro-environmental behaviour — …" |
| b0bdce4b | 800 | Planetary Health | "Explore planetary health — evidence-based insights…" |
| fdcc0f5c | 800 | The Microbiome and Nature | "Explore the microbiome and nature — …" |
| 889cd959 | 800 | Water Conservation and Mental Health | "Explore water conservation and mental health — …" |
| 33098389 | 800 | Natural Disaster Resilience | "Explore natural disaster resilience — …" |

**content=NULL, `description` has text (7 rows — all also orphans, no category_id):**
| id | title | description |
|---|---|---|
| 5a4411c0 | Understanding Anxiety Triggers | "Learn what triggers your anxiety and how to manage it." |
| 0e4e7495 | Breathing Techniques for Calm | "Simple breathing exercises to reduce stress instantly." |
| fcf0e744 | The Science of Panic Attacks | "What happens in your brain and body during a panic attack." |
| 2ea001b8 | Sleep and Mental Health | "Why sleep is crucial for your emotional well-being." |
| 9ce0fc45 | Nutrition for the Brain | "Foods that boost cognitive function and mood." |
| df6ad217 | Mindfulness 101 | "Getting started with mindfulness meditation." |
| 2a2bf298 | Managing Burnout | "Signs of burnout and how to recover." |

**The 1 truly-empty row:**
`3ed38f21-8f88-4b19-9670-cc0dc9c7da51` — title `"Part 1: "`, slug `"part-1-"`, category_id NULL, word_count 0. Junk.

**Orphans (8, missing category_id):** = the 7 mock-seed articles above + the 1 junk row. They have title+slug but no category link.

---

## Cross-check — the 147 "with content"

| | Count |
|---|--:|
| NOT-NULL `content` | 147 |
| Genuine (real text after strip) | **147** |
| Shells (non-null but < 30 real chars) | **0** |

All 147 are real articles with genuine body text. No shells hiding in the "with content" bucket — the reclaimable total from there is the full 147 (already counted in inventory).

---

## Inventory verdict

- Of the ~651 content-empty archived rows: **651 are truly empty of article body. 0 carry a recoverable body.**
- The 643 `seo_description` + 7 `description` hits are boilerplate blurbs / one-line summaries, not content.
- **Real article inventory is unchanged at ~1,350** (1,203 published + 147 archived-with-content). Nothing reclaimable from the 651.
- The 651 are generation skeletons (title + templated SEO blurb + placeholder word_count, body never written/now absent), plus 7 legacy mock seeds and 1 junk row.
