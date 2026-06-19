# Learn Taxonomy Cleanup — Reference Spec

**Status:** living reference · **Owner:** Psychage engineering · **Taxonomy authority:** Dr. Lena Dobson, Ph.D. (Clinical Neuropsychology)

This document is the single reference for the full Learn-taxonomy cleanup. It records the canonical taxonomy, the live production state, the drift dedup map, and the three execution lanes. Only **Lane A (the mega-menu)** is implemented in the PR that introduces this doc; Lanes B and C and all HOLD items are **not** acted on here.

---

## 1. The canonical 30 (Dobson-ratified)

Source of truth: [`src/lib/article-framework/content-architecture.ts`](../src/lib/article-framework/content-architecture.ts) — authored for Dr. Lena Dobson, March 2026, expanded April 2026. **Read-only. Do not edit.**

There are **30 canonical categories**, numbered 1–21 and 23–31 (category #22 was merged into #31, so the number sequence skips 22). The slug column below is canonical; it is the URL identity each topic should ultimately resolve to.

| # | Canonical name | Canonical slug |
|---|---|---|
| 1 | Emotional Regulation & Self-Awareness | `emotional-regulation` |
| 2 | Anxiety, Stress & Overwhelm | `anxiety-stress` |
| 3 | Relationships & Communication | `relationships-communication` |
| 4 | Self-Worth, Confidence & Identity | `self-worth-identity` |
| 5 | Work, Productivity & Burnout | `work-productivity` |
| 6 | Family, Parenting & Childhood Patterns | `family-parenting` |
| 7 | Depression, Grief & Loss | `depression-grief` |
| 8 | Habits, Motivation & Behavior Change | `habits-behavior-change` |
| 9 | Sleep, Body & Mind-Body Connection | `sleep-body-connection` |
| 10 | Digital Life, Social Media & Modern Stressors | `digital-life` |
| 11 | Trauma-Informed Education & Healing | `trauma-healing` |
| 12 | Cultural Perspectives, Inclusion & Global Wellness | `cultural-global` |
| 13 | Understanding Mental Health Conditions | `mental-health-conditions` |
| 14 | Therapy, Treatment & Mental Health Navigation | `therapy-navigation` |
| 15 | Loneliness, Social Connection & Belonging | `loneliness-connection` |
| 16 | Psychosis, Schizophrenia & Severe Mental Illness | `psychosis-schizophrenia` |
| 17 | Aging, Dementia & Late-Life Mental Health | `aging-dementia-late-life` |
| 18 | Women's Mental Health | `womens-mental-health` |
| 19 | Men's Mental Health | `mens-mental-health` |
| 20 | Chronic Illness, Pain & Medical Psychology | `chronic-illness-pain` |
| 21 | Technology, Digital Life & Mental Health | `technology-digital-life` |
| 23 | Brain, Neuroscience & Biological Basis | `brain-neuroscience` |
| 24 | Creativity, Therapeutic Arts & Expressive Healing | `creativity-therapeutic-arts` |
| 25 | Disability, Accessibility & Inclusive Mental Health | `disability-accessibility` |
| 26 | Forensic Psychology & Criminal Justice Mental Health | `forensic-legal-justice` |
| 27 | Military, Veterans & First Responder Mental Health | `military-veterans-firstresponder` |
| 28 | Sexuality, Intimacy & Sexual Health | `sexuality-intimacy` |
| 29 | Environmental, Eco-Psychology & Planetary Mental Health | `environmental-eco-psychology` |
| 30 | Applied Life Skills, Self-Design & Practical Psychology | `life-skills-practical-psychology` |
| 31 | Spirituality, Meaning & Existential Mental Health | `spirituality-meaning` |

---

## 2. Live production state

Re-derived read-only against production Supabase (`article_categories` joined to `articles`), using `articleService`'s exact published predicate: `status = 'published'` AND `content IS NOT NULL` AND `content <> ''`.

- **48** rows in `article_categories` = **30** canonical + **18** drift duplicates.
- **19** topics hold published content; **29** rows are empty.

### Per-topic keeper table

A **working keeper** is the slug that actually holds the published content for a canonical topic. Founder rule: where a canonical slug is empty but a drift twin holds the content, the **populated** slug is the working keeper (the 30 remain Dobson-ratified as the canonical identity; reconciling the keeper slug back to the canonical slug is Lane B, on HOLD).

| Canonical topic (slug) | Working keeper slug | Live published count | Note |
|---|---|---|---|
| `emotional-regulation` | `emotional-regulation` | 80 | canonical = keeper |
| `anxiety-stress` | `anxiety-stress` | 82 | canonical = keeper |
| `relationships-communication` | **`relationships-social`** | 155 | keeper is drift twin |
| `self-worth-identity` | **`self-esteem-identity`** | 66 | keeper is drift twin |
| `work-productivity` | **`workplace-academic`** | 75 | keeper is drift twin |
| `family-parenting` | — | 0 | empty — Lane C (net-new) |
| `depression-grief` | **`depression-mood`** | 70 | keeper is drift twin · **HOLD (a): mood ≠ grief, do not merge** |
| `habits-behavior-change` | `habits-behavior-change` | 64 | canonical = keeper |
| `sleep-body-connection` | `sleep-body-connection` | 60 | canonical = keeper |
| `digital-life` | `digital-life` | 50 | canonical = keeper |
| `trauma-healing` | `trauma-healing` | 55 | canonical = keeper |
| `cultural-global` | `cultural-global` | 50 | canonical = keeper |
| `mental-health-conditions` | `mental-health-conditions` | 50 | canonical = keeper |
| `therapy-navigation` | `therapy-navigation` | 50 | canonical = keeper |
| `loneliness-connection` | `loneliness-connection` | 46 | canonical = keeper |
| `psychosis-schizophrenia` | — | 0 | empty — **HOLD (b): archived → republish** |
| `aging-dementia-late-life` | `aging-dementia-late-life` | 50 | canonical = keeper |
| `womens-mental-health` | — | 0 | empty — **HOLD (b): archived → republish** |
| `mens-mental-health` | `mens-mental-health` | 62 | canonical = keeper |
| `chronic-illness-pain` | `chronic-illness-pain` | 68 | canonical = keeper |
| `technology-digital-life` | `technology-digital-life` | 64 | canonical = keeper |
| `brain-neuroscience` | — | 0 | empty — Lane C (net-new) |
| `creativity-therapeutic-arts` | — | 0 | empty — Lane C (net-new) |
| `disability-accessibility` | — | 0 | empty — Lane C (net-new) |
| `forensic-legal-justice` | — | 0 | empty — Lane C (net-new) |
| `military-veterans-firstresponder` | — | 0 | empty — Lane C (net-new) |
| `sexuality-intimacy` | — | 0 | empty — Lane C (net-new) |
| `environmental-eco-psychology` | — | 0 | empty — Lane C (net-new) |
| `life-skills-practical-psychology` | — | 0 | empty — Lane C (net-new) |
| `spirituality-meaning` | `spirituality-meaning` | 6 | canonical = keeper |

**19 topics have a working keeper** (15 canonical-direct + 4 drift-twin). **11 canonical topics are empty** (2 archived → republish on HOLD; 9 net-new).

---

## 3. Dedup / merge map — all 18 drift slugs

These 18 `article_categories` rows are not in the canonical 30. They are duplicates/aliases of a canonical topic (or destined to be condition-definition pages). Counts are live published counts.

| Drift slug | Published | → Canonical target | Disposition |
|---|---|---|---|
| `relationships-social` | 155 | `relationships-communication` | **Keeper** (content lives here) — Lane B realign to canonical |
| `workplace-academic` | 75 | `work-productivity` | **Keeper** — Lane B realign |
| `depression-mood` | 70 | `depression-grief` | **Keeper** — **HOLD (a): mood ≠ grief, do not merge** |
| `self-esteem-identity` | 66 | `self-worth-identity` | **Keeper** — Lane B realign |
| `trauma-ptsd` | 0 | `trauma-healing` | empty — Lane B retire/redirect |
| `sleep-circadian` | 0 | `sleep-body-connection` | empty — Lane B retire/redirect |
| `therapy-treatment` | 0 | `therapy-navigation` | empty — Lane B retire/redirect |
| `global-cultural` | 0 | `cultural-global` | empty — Lane B retire/redirect |
| `chronic-illness-disability` | 0 | `chronic-illness-pain` | empty — Lane B retire/redirect |
| `financial-wellness` | 0 | `life-skills-practical-psychology` | empty — Lane B retire/redirect |
| `ocd-related` | 0 | `mental-health-conditions` | empty — **HOLD (c): condition row** |
| `substance-addiction` | 0 | `mental-health-conditions` | empty — **HOLD (c): condition row** |
| `eating-body` | 0 | `mental-health-conditions` | empty — **HOLD (c): condition row** |
| `neurodevelopmental` | 0 | `mental-health-conditions` | empty — **HOLD (c): condition row** |
| `children-adolescents` | 0 | `family-parenting` | empty — **HOLD (c): condition row** |
| `life-transitions` | 0 | `depression-grief` | empty — **HOLD (c): condition row** |
| `neurodivergence-adhd-autism` | 0 | _(ambiguous)_ | empty — **Dobson-gated: do not map without ratification** |
| `sports-exercise-psychology` | 0 | _(ambiguous)_ | empty — **Dobson-gated: do not map without ratification** |

The two ambiguous rows have no clean canonical twin. They are empty, so they do not affect the menu; they must not be mapped, merged, or deleted without Dr. Dobson's ratification.

---

## 4. Execution lanes

### Lane A — Menu (DONE in this PR)
Rebuild the hardcoded Learn mega-menu in [`src/config/navigation.ts`](../src/config/navigation.ts) so every link points at a working-keeper slug with published content. All 19 populated topics are surfaced across the 3 existing themed sections; no link resolves to an empty page. See §5 for the final menu. **Code change is `navigation.ts` only.**

### Lane B — Data (NOT done here)
Production `article_categories` hygiene, Dobson-gated where flagged:
1. Realign the 4 populated drift keepers to their canonical slug (`relationships-social` → `relationships-communication`, `workplace-academic` → `work-productivity`, `self-esteem-identity` → `self-worth-identity`, and — only with Dobson sign-off — `depression-mood` → `depression-grief`). Requires coordinated slug change + redirect + menu update.
2. Republish the archived content for `psychosis-schizophrenia` and `womens-mental-health` (HOLD (b) — confirm Dobson approval first).
3. Retire/redirect the 6 empty drift rows that have clean canonical twins (`trauma-ptsd`, `sleep-circadian`, `therapy-treatment`, `global-cultural`, `chronic-illness-disability`, `financial-wellness`).
4. Leave the 6 condition rows and 2 ambiguous rows untouched (HOLD (c) and Dobson-gated).

### Lane C — Content (NOT done here, Dobson-gated)
Commission net-new content for the **9 empty canonical topics** with no populated twin: `family-parenting`, `brain-neuroscience`, `creativity-therapeutic-arts`, `disability-accessibility`, `forensic-legal-justice`, `military-veterans-firstresponder`, `sexuality-intimacy`, `environmental-eco-psychology`, `life-skills-practical-psychology`. As each gains published content it can be added to the menu.

---

## 5. Final menu (Lane A result)

19 links across the 3 existing themed sections (Browse item, quick actions, and the Tools menu are unchanged). Every link resolves to a slug with published content.

**Conditions & Disorders**

| Label | Slug | Live published |
|---|---|---|
| Anxiety & Stress | `anxiety-stress` | 82 |
| Depression & Mood | `depression-mood` | 70 |
| Trauma & Healing | `trauma-healing` | 55 |
| Mental Health Conditions | `mental-health-conditions` | 50 |
| Chronic Illness & Pain | `chronic-illness-pain` | 68 |
| Aging & Late-Life | `aging-dementia-late-life` | 50 |

**Behavior & Wellness**

| Label | Slug | Live published |
|---|---|---|
| Emotional Regulation | `emotional-regulation` | 80 |
| Self-Esteem & Identity | `self-esteem-identity` | 66 |
| Habits & Behavior Change | `habits-behavior-change` | 64 |
| Sleep & Mind-Body | `sleep-body-connection` | 60 |
| Therapy & Treatment | `therapy-navigation` | 50 |
| Spirituality & Meaning | `spirituality-meaning` | 6 |

**Life & Society**

| Label | Slug | Live published |
|---|---|---|
| Relationships & Social | `relationships-social` | 155 |
| Workplace & Academic | `workplace-academic` | 75 |
| Technology & Mental Health | `technology-digital-life` | 64 |
| Men's Mental Health | `mens-mental-health` | 62 |
| Digital Life | `digital-life` | 50 |
| Global & Cultural MH | `cultural-global` | 50 |
| Loneliness & Connection | `loneliness-connection` | 46 |

Dropped from the previous menu (dead links — those slugs are empty): `trauma-ptsd`, `neurodevelopmental`, `ocd-related`, `substance-addiction`, `eating-body`, `sleep-circadian`, `therapy-treatment`, `life-transitions`, `children-adolescents`, `global-cultural`. Their conditions remain reachable via `mental-health-conditions`. The DB rows are left untouched (Lanes B/C, HOLD).

---

## 6. HOLDS — do NOT act without Dr. Lena Dobson

- **(a) `depression-mood` → `depression-grief`:** do **not** merge. Mood ≠ grief; these are distinct clinical scopes. `depression-mood` is used as the menu keeper only (it holds the content); the canonical reconciliation is deferred to Dobson.
- **(b) Archived → published republish** (`psychosis-schizophrenia`, `womens-mental-health`): confirm Dobson approval before flipping any archived content to published.
- **(c) Empty condition rows** (`ocd-related`, `substance-addiction`, `eating-body`, `neurodevelopmental`, `children-adolescents`, `life-transitions`): destined to become condition-definition pages, **not** standalone categories. Do **not** delete or redirect them now.
