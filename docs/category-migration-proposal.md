# Category catalog → 30 — migration proposal (GATED: NOT executed)

**Status:** Phase 5 of the admin-surfaces fix session **STOPPED at the gate** — see "Why this was not executed" below. This document is the proposed, reversible mapping for **editorial review**. No category rows or article assignments were changed.

**Date:** 2026-06-24 · **Author:** automated recon (read-only, service-role counts)

---

## The ask vs. what's in code

The session brief was: "the category catalog has drifted to 48 and must become 30." Two preconditions had to hold to safely execute (and both failed):

1. **A definitive canonical-30 list exists in code.** ❌ It does not. The single source of truth is [`src/config/taxonomy.ts`](../src/config/taxonomy.ts) → `CANONICAL_CATEGORIES`, which contains **34** entries (a stale doc-comment says "31"). There is no `content-architecture.ts` or any hardcoded list of exactly **30**.
2. **The affected-article count is known and not wildly beyond estimate.** ❌ The brief estimated ~37 affected articles. The true count of articles under non-canonical categories is **818** (see below) — ~22× the estimate.

Per the session rules ("If a definitive canonical-30 source does NOT exist in code, set Phase 5 to STOP … do NOT blind-guess final homes for clinical content"), the migration was **not** performed. Mechanically reassigning 818 clinical articles — 165 of them with no documented successor category — on a guess is exactly the irreversible-mistake class the gate exists to prevent.

---

## Live state (service-role counts, 2026-06-24)

- `article_categories` rows: **48**
- Canonical categories (in `CANONICAL_CATEGORIES`): **34**
- Non-canonical categories: **14**, holding **818** articles + 8 with `category_id = NULL`
- `article_categories` has **no** `is_active` / `archived` column — retiring a category reversibly would require a schema change (add `is_active`) or row deletion-with-backup. Schema changes are **not** auto-applied by deploy in this repo (no `supabase db push` in CI/build), so this must be coordinated with whoever applies migrations.

### Group A — 9 legacy aliases with a documented successor (mechanical, safe)
These already have an explicit old→new mapping in `taxonomy.ts` → `LEGACY_SLUG_ALIASES`. Reassigning their articles to the named successor is **not** a guess.

| Old slug | → Canonical successor | Articles |
|---|---|---|
| `relationships-social` | `relationships-communication` | 158 |
| `therapy-treatment` | `therapy-navigation` | 110 |
| `workplace-academic` | `work-productivity` | 97 |
| `trauma-ptsd` | `trauma-healing` | 73 |
| `depression-mood` | `depression-grief` | 69 |
| `self-esteem-identity` | `self-worth-identity` | 69 |
| `global-cultural` | `cultural-global` | 64 |
| `sleep-circadian` | `sleep-body-connection` | 13 |
| `chronic-illness-disability` | `chronic-illness-pain` | 0 |
| **Subtotal** | | **653** |

### Group B — 5 orphan categories with NO successor (needs editorial decision)
Not in `CANONICAL_CATEGORIES` and not in `LEGACY_SLUG_ALIASES`. There is no safe automatic home; a clinician must decide whether each becomes canonical (raising the target above 30) or merges into a sibling.

| Orphan slug | Articles | Plausible home (REVIEW — not applied) |
|---|---|---|
| `life-transitions` | 85 | (own category? or split across `depression-grief` / `anxiety-stress`) |
| `children-adolescents` | 47 | `family-parenting`? (distinct audience — likely keep) |
| `neurodevelopmental` | 14 | `neurodivergence-adhd-autism`? |
| `ocd-related` | 10 | `anxiety-stress`? or `mental-health-conditions`? |
| `substance-addiction` | 9 | own category? (clinically distinct — likely keep) |
| **Subtotal** | **165** | |

> Plus **8** articles with `category_id = NULL` (already uncategorized).

---

## Why "30" is itself unresolved

Even applying Group A perfectly leaves **34 − 0 + (orphan decisions)** active categories, not 30. Reaching exactly 30 requires **merging canonical categories** (e.g. the brief may intend collapsing near-duplicates that are *both* canonical today, like `digital-life` + `technology-digital-life`, or `eating-body` into a conditions bucket). That is a content-architecture decision, not a code-derivable fact. **Recommend the product/clinical owner confirm the target list of 30 explicitly.**

---

## Recommended path (when unblocked)

1. **Owner confirms the exact 30 canonical slugs** (or accepts 31/34) and the home for each Group-B orphan.
2. Add `article_categories.is_active boolean default true` (reversible retire flag) via a migration applied to prod — **not** row deletion.
3. **Back up** every affected article's `(id, category_id)` to a backup table/column or a committed JSON before any reassignment (article-level, this is what makes it reversible).
4. Apply Group A reassignments (mechanical, from `LEGACY_SLUG_ALIASES`).
5. Apply Group B per the owner's decisions.
6. Set `is_active = false` on the retired slugs so the admin catalog shows exactly the agreed count.
7. Rollback = restore `category_id` from the backup + flip `is_active` back.

---

*Read-only proposal. No category rows or article assignments were modified.*
