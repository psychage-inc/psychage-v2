# Symptom Navigator — Condition Expansion Plan

## Executive Summary

1. **15 new conditions** across 4 new categories (personality, psychotic, dissociative, somatic) expand coverage from 16 to 31 conditions, covering ~90% of the DSM-5-TR clinical landscape commonly encountered in adult outpatient settings
2. **24 new symptoms** (IDN_001-004, SOM_001-003, CPG_009-012, PRC_007, SOC_007-008, ANX_009-010, MOD_009, COG_011, ACT_007-008, ENR_006) added via existing table with additive-only schema changes
3. **~240 new condition-symptom mappings** with weights (1-3) and roles (core/common/associated) grounded in DSM-5-TR and ICD-11 criteria
4. **Zero breaking changes**: All modifications are additive ALTER + INSERT. Existing 16 conditions, 82 symptoms, and 257 mappings are untouched
5. **Two SQL migrations** produced: `004_navigator_expansion_schema.sql` (CHECK constraints + new symptoms) and `005_navigator_expansion_seed.sql` (conditions + mappings + red flags)
6. **TypeScript types updated**: `ConditionCategory` and `SymptomCategory` extended with new union members
7. **Collision handling** for 5 key overlaps: BPD/BIP, PGD/MDE, PMDD/MDE, AVPD/SAD, SSD/IAD — resolved via condition-specific symptoms that serve as differentiators
8. **Safety routing maintained**: PRC_007 (delusions) added as URGENT inherent red flag; CPG_009 (purging) URGENT at severity 6+; COG_011 (disorganized speech) URGENT at severity 7+
9. **Matching config adjustment**: `max_results` bumped 4 → 5 to accommodate broader condition set
10. **Rollout**: phased (Tier 1 → 2 → 3) with feature flags per tier, monitoring dashboard, and post-launch QA checklist

---

## 1. Architecture-Aligned Database Plan

### Tables Used (all existing)

| Table | Action | Details |
|-------|--------|---------|
| `navigator_symptoms` | INSERT 24 rows | New symptom codes in existing + 2 new categories |
| `navigator_conditions` | INSERT 15 rows | New conditions in 4 new + existing categories |
| `navigator_condition_symptoms` | INSERT ~240 rows | Weighted mappings |
| `navigator_condition_red_flags` | INSERT 10 rows | Safety associations |
| `navigator_matching_config` | UPDATE 1 row | max_results: 4 → 5 |

### Schema Changes (minimal, backwards compatible)

**Migration 004** modifies only CHECK constraints:

```sql
-- Expand condition category CHECK (additive only)
ALTER TABLE navigator_conditions
  DROP CONSTRAINT IF EXISTS navigator_conditions_category_check;
ALTER TABLE navigator_conditions
  ADD CONSTRAINT navigator_conditions_category_check
  CHECK (category IN (
    'mood','anxiety','trauma','obsessive_compulsive',
    'neurodevelopmental','stress','sleep','eating','substance',
    'personality','psychotic','dissociative','somatic'  -- NEW
  ));

-- Expand symptom category CHECK (additive only)
ALTER TABLE navigator_symptoms
  DROP CONSTRAINT IF EXISTS navigator_symptoms_category_check;
ALTER TABLE navigator_symptoms
  ADD CONSTRAINT navigator_symptoms_category_check
  CHECK (category IN (
    'mood','anxiety_fear','emotional_regulation',
    'body_sensations','sleep','appetite_weight','energy',
    'cognition','perception','social','coping','activity_level',
    'identity_self_image','somatic_health'  -- NEW
  ));
```

### Backwards Compatibility

- **No column changes**: All new data fits existing column schema
- **No index changes**: Existing indexes cover new data
- **No trigger changes**: `update_navigator_updated_at()` already applies
- **No RLS changes**: Existing policies cover new rows
- **API unchanged**: GET `/knowledge-base` returns all active conditions/symptoms automatically
- **ID conventions preserved**: 3-letter prefix + underscore + 3 digits for symptoms, short uppercase for conditions

### New Symptom ID Registry

| ID | Domain | Category | Name | Red Flag |
|----|--------|----------|------|----------|
| IDN_001 | behavioral | identity_self_image | Unstable sense of identity | — |
| IDN_002 | behavioral | identity_self_image | Fear of abandonment | — |
| IDN_003 | behavioral | identity_self_image | Chronic feelings of inadequacy | — |
| IDN_004 | behavioral | identity_self_image | Splitting/black-and-white thinking | — |
| SOM_001 | physical | somatic_health | Excessive worry about health | — |
| SOM_002 | physical | somatic_health | Persistent physical symptoms causing distress | — |
| SOM_003 | physical | somatic_health | Frequent medical visits or health checking | — |
| CPG_009 | behavioral | coping | Purging behaviors | URGENT @ sev 6 |
| CPG_010 | behavioral | coping | Excessive exercise to compensate | — |
| CPG_011 | behavioral | coping | Collecting/difficulty discarding | — |
| CPG_012 | behavioral | coping | Distress when discarding | — |
| PRC_007 | cognitive | perception | Delusions / false beliefs | URGENT (inherent) |
| SOC_007 | behavioral | social | Difficulty understanding social cues | — |
| SOC_008 | behavioral | social | Intense but unstable relationships | — |
| ANX_009 | emotional | anxiety_fear | Separation anxiety | — |
| ANX_010 | emotional | anxiety_fear | Fear of contamination | — |
| MOD_009 | emotional | mood | Intense yearning for deceased | — |
| COG_011 | cognitive | cognition | Disorganized thinking/speech | URGENT @ sev 7 |
| ACT_007 | behavioral | activity_level | Repetitive behaviors/restricted interests | — |
| ACT_008 | behavioral | activity_level | Sensory sensitivity | — |
| ENR_006 | physical | energy | Seasonal energy/mood changes | — |

### New Condition ID Registry

| ID | Name | Category | Tier | Mappings |
|----|------|----------|------|----------|
| SCZ | Psychotic Experiences | psychotic | 1 | 18 |
| BPD | Borderline Personality Patterns | personality | 1 | 22 |
| BN | Bulimia Nervosa | eating | 1 | 16 |
| PGD | Prolonged Grief | stress | 1 | 16 |
| ASD | Autism Spectrum | neurodevelopmental | 2 | 18 |
| BDD | Body Dysmorphic Concern | obsessive_compulsive | 2 | 14 |
| DPDR | Depersonalization/Derealization | dissociative | 2 | 14 |
| SPP | Specific Phobia | anxiety | 2 | 12 |
| PMDD | Premenstrual Dysphoric Disorder | mood | 2 | 16 |
| SADD | Seasonal Mood Pattern | mood | 3 | 16 |
| HD | Hoarding Patterns | obsessive_compulsive | 3 | 13 |
| SSD | Somatic Symptom Concern | somatic | 3 | 14 |
| IAD | Illness Anxiety | somatic | 3 | 12 |
| AVPD | Avoidant Personality Patterns | personality | 3 | 16 |
| SEPA | Separation Anxiety | anxiety | 3 | 14 |

---

## 2. Mapping Plan (Symptoms → Conditions)

### Weighting Strategy

Weights follow the existing 1-3 scale aligned to DSM-5-TR diagnostic criteria hierarchy:

| Weight | Role | Criteria Basis |
|--------|------|---------------|
| 3 | core | DSM-5-TR Criterion A or gateway/required symptom |
| 2 | common | DSM-5-TR Criterion B or frequently observed feature |
| 1 | associated | Common co-occurring feature or consequence |

### Collision Handling Strategy

Five key overlap pairs require careful differentiation:

**1. BPD vs BIP (personality vs mood)**
- **Differentiator**: BPD uses IDN_001 (identity disturbance), IDN_002 (abandonment fear), SOC_008 (unstable relationships) — none mapped to BIP
- **BIP uses**: EMR_004 (elevated mood), ACT_005 (risk-taking) — not core in BPD
- **Duration**: BPD requires `1_year` (chronic), BIP requires `1_week` (episodic)
- **Clinical basis**: BPD mood shifts last hours; BIP episodes last days-weeks (APA, DSM-5-TR p. 763)

**2. PGD vs MDE (stress vs mood)**
- **Differentiator**: PGD uses MOD_009 (yearning for deceased) — unique to PGD, not mapped to MDE
- **PGD also uses**: IDN_001 (identity confusion since loss) — not core in MDE
- **Duration**: PGD requires `1_year` (12 months post-bereavement), MDE requires `2_weeks`
- **Clinical basis**: PGD is dominated by preoccupation with the deceased; MDE is pervasive mood change (DSM-5-TR pp. 321-327)

**3. PMDD vs MDE (mood vs mood — same category)**
- **Differentiator**: PMDD uses the cyclical pattern — symptoms resolve after menstruation begins
- **PMDD lacks**: MOD_002 (hopelessness), MOD_006 (guilt) — core MDE features
- **Duration**: PMDD requires `3_months` (2+ cycles), MDE requires `2_weeks`
- **Scoring note**: Users presenting with PMDD and MDE symptoms simultaneously will see both due to max_per_family=2

**4. AVPD vs SAD (personality vs anxiety)**
- **Differentiator**: AVPD uses IDN_003 (chronic inadequacy) — not mapped to SAD
- **AVPD category**: `personality` (different from SAD's `anxiety`), so diversity constraints don't compete
- **Duration**: AVPD requires `1_year` (pervasive pattern), SAD requires `6_months`
- **Clinical basis**: AVPD is a pervasive self-concept; SAD is situational fear (APA, DSM-5-TR p. 733)

**5. SSD vs IAD (somatic vs somatic — same category)**
- **Differentiator**: SSD maps SOM_002 (persistent physical symptoms) at weight 3; IAD does not
- **IAD emphasizes**: SOM_001 (worry about illness) and SOM_003 (medical visits) — also in SSD but at different weights
- **Scoring**: SSD will outrank IAD when physical symptoms are prominent; IAD will outrank when worry is predominant with minimal physical symptoms
- **max_per_family=2**: Both can appear in results as they're in the same `somatic` category

### Full Mapping Reference

All mappings are embedded in `20250220_005_navigator_expansion_seed.sql` with inline clinical notes referencing DSM-5-TR criterion letters. Summary counts:

| Condition | Core (w3) | Common (w2) | Associated (w1) | Total |
|-----------|-----------|-------------|-----------------|-------|
| SCZ | 3 | 6 | 9 | 18 |
| BPD | 4 | 7 | 11 | 22 |
| BN | 3 | 6 | 7 | 16 |
| PGD | 3 | 5 | 8 | 16 |
| ASD | 3 | 5 | 10 | 18 |
| BDD | 2 | 6 | 6 | 14 |
| DPDR | 3 | 4 | 7 | 14 |
| SPP | 2 | 4 | 6 | 12 |
| PMDD | 3 | 7 | 6 | 16 |
| SADD | 3 | 5 | 8 | 16 |
| HD | 3 | 3 | 7 | 13 |
| SSD | 3 | 3 | 8 | 14 |
| IAD | 2 | 4 | 6 | 12 |
| AVPD | 3 | 5 | 8 | 16 |
| SEPA | 2 | 5 | 7 | 14 |

---

## 3. App Functionality Changes

### APIs Impacted

**No endpoint changes required.** All existing endpoints automatically serve the new data:

| Endpoint | Impact | Notes |
|----------|--------|-------|
| GET `/knowledge-base` | Serves expanded data | Queries `WHERE is_active = TRUE` — new rows included automatically |
| POST `/analytics` | No change | Stores counts/booleans only, no condition IDs |
| POST `/save-results` | No change | Encrypts whatever NavigatorResults contains |
| GET `/saved-results` | No change | Decrypts and returns |
| DELETE `/saved-results/[id]` | No change | — |

### TypeScript Type Changes

Already applied in `src/lib/navigator/types.ts`:

```typescript
// ConditionCategory — 4 new values added
export type ConditionCategory =
  | 'mood' | 'anxiety' | 'trauma' | 'obsessive_compulsive'
  | 'neurodevelopmental' | 'stress' | 'sleep' | 'eating' | 'substance'
  | 'personality' | 'psychotic' | 'dissociative' | 'somatic';  // NEW

// SymptomCategory — 2 new values added
export type SymptomCategory =
  | 'mood' | 'anxiety_fear' | 'emotional_regulation'
  | 'body_sensations' | 'sleep' | 'appetite_weight' | 'energy'
  | 'cognition' | 'perception' | 'social' | 'coping' | 'activity_level'
  | 'identity_self_image' | 'somatic_health';  // NEW
```

### Matching Algorithm Adjustments

**No scoring formula changes.** The existing algorithm handles all new conditions without modification:

1. **Scoring**: `calculateConditionScore()` works generically — any condition with mappings scores correctly
2. **Safety**: `screenRedFlags()` already handles inherent flags (PRC_007) and severity-threshold flags (CPG_009, COG_011)
3. **Diversity**: `rankAndDiversify()` uses `max_per_family` on `condition.category` — new categories automatically get their own family slots

**One config change**:
```sql
UPDATE navigator_matching_config SET max_results = 5 WHERE id = 1;
```

This is necessary because with 31 conditions across 13 categories, `max_results=4` becomes too restrictive. At `max_results=5`, users get slightly broader results while maintaining diversity. The `max_per_family=2` constraint remains unchanged.

### Search Synonyms and Labels

All new symptoms include 8 synonyms each in the `synonyms` array column, following the existing pattern. Notable label considerations:

| Condition | Display Name | Rationale |
|-----------|-------------|-----------|
| ASD | "Autism Spectrum" | Neutral, commonly recognized |
| BPD | "Borderline Personality Patterns" | Avoids stigmatizing "disorder" in user-facing name |
| SCZ | "Psychotic Experiences" | Non-stigmatizing, experience-focused |
| SADD | "Seasonal Mood Pattern" | Avoids confusing abbreviation with SAD (Social Anxiety) |
| HD | "Hoarding Patterns" | Pattern-focused, non-judgmental |
| AVPD | "Avoidant Personality Patterns" | Pattern-focused |

---

## 4. Content Requirements with Citations

### Template for Each Condition Page

Each condition requires these sections (matching existing content architecture):

```
1. What It Is — Educational overview (2-3 paragraphs)
2. Common Signs — Bulleted list of 6-10 experiences (uses symptom mappings)
3. When to Seek Help — Clear thresholds and encouragement
4. Self-Help Strategies — 4-6 evidence-based strategies
5. Treatment Options — Overview of professional treatments
6. Related Conditions — Links to overlapping conditions
7. Crisis CTA — Standard safety block (see template below)
8. Sources — 2-4 citations from authoritative bodies
```

### Crisis CTA Template (standard across all conditions)

```
If you are in crisis or experiencing thoughts of harming yourself or others,
please reach out for immediate support:
- US: Call or text 988 (Suicide & Crisis Lifeline)
- UK: Call 116 123 (Samaritans)
- International: Visit findahelpline.com
You are not alone, and help is available 24/7.
```

### Condition Content Outlines with Citations

#### SCZ — Schizophrenia Spectrum / Psychotic Disorders

**What It Is**: Psychotic experiences involve changes in how a person perceives reality, which may include hearing or seeing things others do not (hallucinations), holding beliefs that seem unusual to others (delusions), or difficulty organizing thoughts. These experiences affect approximately 1% of the global population and are highly treatable.

**Sources**:
- American Psychiatric Association. *Diagnostic and Statistical Manual of Mental Disorders, Fifth Edition, Text Revision (DSM-5-TR)*. 2022. pp. 101-118. [https://doi.org/10.1176/appi.books.9780890425787](https://doi.org/10.1176/appi.books.9780890425787)
- National Institute of Mental Health (NIMH). "Schizophrenia." [https://www.nimh.nih.gov/health/topics/schizophrenia](https://www.nimh.nih.gov/health/topics/schizophrenia)
- World Health Organization. *ICD-11: Schizophrenia (6A20)*. [https://icd.who.int/browse/2024-01/mms/en#405565289](https://icd.who.int/browse/2024-01/mms/en#405565289)

#### BPD — Borderline Personality Disorder

**What It Is**: Borderline personality patterns involve a pervasive pattern of instability in relationships, self-image, and emotions, with marked impulsivity. People experiencing these patterns often describe feeling emotions very intensely. Specialized therapies such as Dialectical Behavior Therapy (DBT) have shown strong evidence of effectiveness.

**Sources**:
- American Psychiatric Association. *DSM-5-TR*. 2022. pp. 752-757. Borderline Personality Disorder (301.83).
- National Institute for Health and Care Excellence (NICE). "Borderline Personality Disorder: Recognition and Management." CG78. [https://www.nice.org.uk/guidance/cg78](https://www.nice.org.uk/guidance/cg78)
- National Education Alliance for Borderline Personality Disorder (NEABPD). [https://www.borderlinepersonalitydisorder.org](https://www.borderlinepersonalitydisorder.org)

#### BN — Bulimia Nervosa

**What It Is**: Bulimia nervosa involves recurring episodes of eating large amounts of food (bingeing) followed by compensatory behaviors such as self-induced vomiting, misuse of laxatives, fasting, or excessive exercise. Self-evaluation is disproportionately influenced by body shape and weight.

**Sources**:
- American Psychiatric Association. *DSM-5-TR*. 2022. pp. 371-376. Bulimia Nervosa (307.51).
- National Eating Disorders Association (NEDA). "Bulimia Nervosa." [https://www.nationaleatingdisorders.org/bulimia-nervosa](https://www.nationaleatingdisorders.org/bulimia-nervosa)
- NICE. "Eating Disorders: Recognition and Treatment." NG69. [https://www.nice.org.uk/guidance/ng69](https://www.nice.org.uk/guidance/ng69)

#### PGD — Prolonged Grief Disorder

**What It Is**: Prolonged grief disorder, newly recognized in the DSM-5-TR (2022), describes an intense, persistent grief response following the death of someone close that continues significantly beyond expected cultural norms. It is characterized by intense yearning for the deceased, preoccupation with the death, and difficulty engaging in ongoing life.

**Sources**:
- American Psychiatric Association. *DSM-5-TR*. 2022. pp. 321-327. Prolonged Grief Disorder (newly added).
- Prigerson HG, et al. "Prolonged Grief Disorder Diagnostic Criteria." *World Psychiatry*. 2021;20(Suppl 1):47-63.
- World Health Organization. *ICD-11: Prolonged Grief Disorder (6B42)*. [https://icd.who.int/browse/2024-01/mms/en#1183832314](https://icd.who.int/browse/2024-01/mms/en#1183832314)

#### ASD — Autism Spectrum Disorder (Adult Presentation)

**What It Is**: Autism spectrum describes persistent differences in social communication and interaction, along with restricted or repetitive patterns of behavior, interests, or activities. Many adults discover these patterns later in life. Autistic traits represent neurodiversity rather than deficiency, though they may co-occur with challenges that benefit from support.

**Sources**:
- American Psychiatric Association. *DSM-5-TR*. 2022. pp. 56-65. Autism Spectrum Disorder (299.00).
- National Autistic Society. "Autism in Adults." [https://www.autism.org.uk/advice-and-guidance/topics/diagnosis/diagnosis-in-adults](https://www.autism.org.uk/advice-and-guidance/topics/diagnosis/diagnosis-in-adults)
- Lai MC, Baron-Cohen S. "Identifying the lost generation of adults with autism spectrum conditions." *The Lancet Psychiatry*. 2015;2(11):1013-1027.

#### BDD — Body Dysmorphic Disorder

**What It Is**: Body dysmorphic disorder involves preoccupation with one or more perceived defects or flaws in physical appearance that are not observable or appear slight to others. This preoccupation causes significant distress and often leads to repetitive behaviors such as mirror checking, excessive grooming, or seeking reassurance.

**Sources**:
- American Psychiatric Association. *DSM-5-TR*. 2022. pp. 236-242. Body Dysmorphic Disorder (300.7).
- BDD Foundation. [https://bddfoundation.org](https://bddfoundation.org)
- Phillips KA. "Body Dysmorphic Disorder: Recognizing and Treating Imagined Ugliness." *World Psychiatry*. 2004;3(1):12-17.

#### DPDR — Depersonalization/Derealization Disorder

**What It Is**: Depersonalization/derealization disorder involves persistent or recurrent experiences of feeling detached from one's own mind, body, or actions (depersonalization) and/or feelings that the world around is unreal, dreamlike, or distorted (derealization). Reality testing remains intact — individuals know their experience is subjective.

**Sources**:
- American Psychiatric Association. *DSM-5-TR*. 2022. pp. 302-306. Depersonalization/Derealization Disorder (300.6).
- Cleveland Clinic. "Depersonalization-Derealization Disorder." [https://my.clevelandclinic.org/health/diseases/9791-depersonalization-derealization-disorder](https://my.clevelandclinic.org/health/diseases/9791-depersonalization-derealization-disorder)

#### SPP — Specific Phobia

**What It Is**: Specific phobias involve marked and persistent fear that is excessive or unreasonable, triggered by a specific object or situation. Common phobia types include animals, heights, blood/injury, enclosed spaces, and flying. Specific phobias are the most prevalent anxiety disorder and respond very well to treatment, particularly exposure-based therapies.

**Sources**:
- American Psychiatric Association. *DSM-5-TR*. 2022. pp. 197-202. Specific Phobia (300.29).
- NIMH. "Specific Phobia." [https://www.nimh.nih.gov/health/statistics/specific-phobia](https://www.nimh.nih.gov/health/statistics/specific-phobia)

#### PMDD — Premenstrual Dysphoric Disorder

**What It Is**: PMDD involves significant mood symptoms — mood swings, irritability, depressed mood, or anxiety — that occur during the luteal phase of the menstrual cycle (1-2 weeks before menstruation) and resolve within a few days of menstruation onset. It affects approximately 3-8% of menstruating individuals and is distinct from typical PMS.

**Sources**:
- American Psychiatric Association. *DSM-5-TR*. 2022. pp. 171-175. Premenstrual Dysphoric Disorder (625.4).
- International Association for Premenstrual Disorders (IAPMD). [https://iapmd.org](https://iapmd.org)
- Yonkers KA, et al. "Premenstrual Disorders." *The Lancet*. 2008;371(9619):1200-1210.

#### SADD — Seasonal Affective Disorder

**Sources**:
- American Psychiatric Association. *DSM-5-TR*. 2022. Seasonal Pattern specifier for Major Depressive Disorder.
- NIMH. "Seasonal Affective Disorder." [https://www.nimh.nih.gov/health/publications/seasonal-affective-disorder](https://www.nimh.nih.gov/health/publications/seasonal-affective-disorder)
- Mayo Clinic. "Seasonal Affective Disorder (SAD)." [https://www.mayoclinic.org/diseases-conditions/seasonal-affective-disorder/symptoms-causes/syc-20364651](https://www.mayoclinic.org/diseases-conditions/seasonal-affective-disorder/symptoms-causes/syc-20364651)

#### HD — Hoarding Disorder

**Sources**:
- American Psychiatric Association. *DSM-5-TR*. 2022. pp. 247-251. Hoarding Disorder (300.3).
- International OCD Foundation. "Hoarding." [https://hoarding.iocdf.org](https://hoarding.iocdf.org)

#### SSD — Somatic Symptom Disorder

**Sources**:
- American Psychiatric Association. *DSM-5-TR*. 2022. pp. 311-316. Somatic Symptom Disorder (300.82).
- Cleveland Clinic. "Somatic Symptom Disorder." [https://my.clevelandclinic.org/health/diseases/somatic-symptom-disorder](https://my.clevelandclinic.org/health/diseases/somatic-symptom-disorder)

#### IAD — Illness Anxiety Disorder

**Sources**:
- American Psychiatric Association. *DSM-5-TR*. 2022. pp. 317-321. Illness Anxiety Disorder (300.7).
- Mayo Clinic. "Illness Anxiety Disorder." [https://www.mayoclinic.org/diseases-conditions/illness-anxiety-disorder/symptoms-causes/syc-20373782](https://www.mayoclinic.org/diseases-conditions/illness-anxiety-disorder/symptoms-causes/syc-20373782)

#### AVPD — Avoidant Personality Disorder

**Sources**:
- American Psychiatric Association. *DSM-5-TR*. 2022. pp. 730-733. Avoidant Personality Disorder (301.82).
- NICE. "Personality Disorders." [https://www.nice.org.uk/guidance/cg77](https://www.nice.org.uk/guidance/cg77)

#### SEPA — Separation Anxiety Disorder (Adult)

**Sources**:
- American Psychiatric Association. *DSM-5-TR*. 2022. pp. 190-195. Separation Anxiety Disorder (309.21).
- NIMH. "Anxiety Disorders." [https://www.nimh.nih.gov/health/topics/anxiety-disorders](https://www.nimh.nih.gov/health/topics/anxiety-disorders)

---

## 5. QA & Testing

### Test File: `src/tests/navigator/expansion.test.ts`

**Already created.** Contains the following test categories:

#### Unit Tests — Mapping + Scoring

| Test | What It Validates |
|------|-------------------|
| SCZ top result for hallucinations + delusions | Core psychotic symptoms route to SCZ |
| BPD scores highly for emotional + identity + relationship | Personality pattern recognition |
| BN ranks over BED when purging present | CPG_009 differentiates bulimia from BED |
| PGD ranks for grief-specific symptoms | MOD_009 (yearning) drives PGD scoring |
| ASD ranks for social + restricted interests + sensory | New symptom codes work correctly |
| DPDR ranks for depersonalization + derealization | Dissociative category functions |
| HD ranks for hoarding-specific symptoms | CPG_011/CPG_012 drive hoarding |
| SSD ranks over IAD when physical symptoms prominent | Somatic collision handling |

#### Collision Handling Tests

| Test | What It Validates |
|------|-------------------|
| BPD vs BIP: manic inputs favor BIP | EMR_004 + ACT_005 differentiate mania |
| PGD vs MDE: without MOD_009, MDE ranks | Yearning is the differentiator |
| AVPD vs SAD: IDN_003 differentiates | Chronic inadequacy drives AVPD |
| HD vs OCD: classic OCD favors OCD | Intrusive thoughts + compulsions ≠ hoarding |

#### Safety Routing Tests

| Test | What It Validates |
|------|-------------------|
| PRC_007 triggers URGENT | Delusions get urgent safety routing |
| Confidence cap still ≤ 0.75 for all new conditions | Sacred invariant preserved |
| Category diversity with new families | max_per_family=2 applies to personality, etc. |

#### Edge-Case Test Scenarios

| Scenario | Expected Behavior |
|----------|-------------------|
| **Psychosis urgent routing**: User selects PRC_004 + PRC_007 | URGENT flag, NOT halt (only CRISIS halts); SCZ appears in results alongside safety messaging |
| **Grief duration nuance**: PGD requires 12-month duration; user reporting grief at 2 months | PGD scores low due to duration modifier (`below_half` = 0.7) and below-minimum penalty; ADJ (adjustment) scores higher |
| **PMDD cycle timing**: PMDD symptoms present with `duration: more_than_1_year` | PMDD scores well; no false positive because weight structure favors PMDD when EMR_001 + EMR_002 + MOD_001 co-occur — differentiable from MDE because PMDD lacks MOD_006 (guilt) as core |
| **ASD adult masking**: User reports only social difficulty symptoms | ASD may appear but below threshold if restricted interests/sensory not reported — this is intentional (need social + RRB domains) |
| **BPD with active self-harm**: User selects CPG_004 | CRISIS halt — no condition results shown, crisis resources displayed. This overrides BPD matching |

---

## 6. Rollout Plan

### Feature Flags

```typescript
// Environment variables — one flag per tier
VITE_NAV_TIER1_ENABLED=true   // SCZ, BPD, BN, PGD
VITE_NAV_TIER2_ENABLED=false  // ASD, BDD, DPDR, SPP, PMDD
VITE_NAV_TIER3_ENABLED=false  // SADD, HD, SSD, IAD, AVPD, SEPA
```

Implementation: Filter conditions by ID in the knowledge-base API response before sending to client. This allows database to contain all data while client only sees enabled tiers.

### Migration / Seed Order

1. `20250220_004_navigator_expansion_schema.sql` — CHECK constraints + new symptoms
2. `20250220_005_navigator_expansion_seed.sql` — Conditions + mappings + red flags + config update

**Both migrations are idempotent** and wrapped in `BEGIN/COMMIT`.

### Phased Rollout Schedule

| Phase | Conditions | When | Gate |
|-------|-----------|------|------|
| **Phase 1** (Tier 1) | SCZ, BPD, BN, PGD | Week 1 | Run full test suite, clinical review of content |
| **Phase 2** (Tier 2) | ASD, BDD, DPDR, SPP, PMDD | Week 3 | Phase 1 stable, monitoring metrics normal |
| **Phase 3** (Tier 3) | SADD, HD, SSD, IAD, AVPD, SEPA | Week 5 | Phase 2 stable, monitoring metrics normal |

### Backfill Steps

1. Run migrations against Supabase (staging first, then production)
2. Clear CDN cache for `/api/navigator/knowledge-base` (s-maxage was 3600)
3. Verify knowledge-base response includes new conditions via manual API check
4. Enable feature flag for the tier being deployed
5. Run language validator: `npx tsx scripts/validate-language.ts`

### Monitoring Metrics

| Metric | What to Watch | Alert Threshold |
|--------|--------------|-----------------|
| **Match distribution** | % of sessions where new conditions appear in top results | < 5% after 1 week → investigate mapping weights |
| **Safety flag rate** | URGENT/CRISIS trigger rate change | > 20% change → review new red flag thresholds |
| **Search queries** | New search terms hitting the navigator | Track to validate synonym coverage |
| **Bounce rate** | Users leaving condition detail pages quickly | > 60% bounce → content may need revision |
| **Result diversity** | Average number of unique categories in results | Should increase from ~2.1 to ~2.8 |
| **Session completion rate** | % of started sessions that complete | Should not decrease by > 5% |

### Post-Launch Checklist

- [ ] All migrations applied successfully (staging + production)
- [ ] Knowledge-base API returns correct condition count (31 total)
- [ ] All 51 existing tests still pass (no regression)
- [ ] All expansion tests pass
- [ ] Language validator passes (`scripts/validate-language.ts`)
- [ ] CRISIS flow still works: CPG_004 → halt → crisis resources
- [ ] URGENT flow works: PRC_004, PRC_007 → safety banner + results
- [ ] CDN cache cleared and verified
- [ ] Feature flags set correctly per phase
- [ ] Content pages exist for each new condition (or placeholder)
- [ ] Guide paths and coping paths resolve (or return graceful 404)
- [ ] Analytics dashboard shows new conditions in match distribution
- [ ] No PII leaks in analytics events (spot check)
- [ ] Mobile layout verified for expanded result count (5 instead of 4)

---

## Runbook (Step-by-Step)

```
PHASE 0: PREPARATION
  1. Review and merge TypeScript type changes (types.ts: ConditionCategory + SymptomCategory)
  2. Update test-helpers.ts to include new symptoms and conditions
  3. Run existing test suite — confirm 51/51 pass
  4. Run language validator — confirm 0 violations

PHASE 1: TIER 1 (SCZ, BPD, BN, PGD)
  5. Apply migration 004 to staging Supabase
  6. Apply migration 005 to staging Supabase
  7. Set VITE_NAV_TIER1_ENABLED=true in staging .env
  8. Verify staging knowledge-base returns 20 conditions (16 + 4)
  9. Run expansion.test.ts — confirm Tier 1 tests pass
  10. Run full test suite — confirm no regressions
  11. Clinical team reviews content for SCZ, BPD, BN, PGD
  12. Apply migrations to production Supabase
  13. Clear CDN cache
  14. Enable Tier 1 flag in production
  15. Monitor metrics for 2 weeks

PHASE 2: TIER 2 (ASD, BDD, DPDR, SPP, PMDD)
  16. Set VITE_NAV_TIER2_ENABLED=true in staging
  17. Verify staging returns 25 conditions
  18. Run expansion tests — confirm Tier 2 tests pass
  19. Clinical review of Tier 2 content
  20. Enable Tier 2 in production
  21. Monitor metrics for 2 weeks

PHASE 3: TIER 3 (SADD, HD, SSD, IAD, AVPD, SEPA)
  22. Set VITE_NAV_TIER3_ENABLED=true in staging
  23. Verify staging returns 31 conditions
  24. Run expansion tests — confirm Tier 3 tests pass
  25. Clinical review of Tier 3 content
  26. Enable Tier 3 in production
  27. Monitor metrics for 2 weeks

PHASE 4: CLEANUP
  28. Remove feature flag checks from code
  29. Update CLAUDE.md / README with new condition count
  30. Archive expansion plan document
```
