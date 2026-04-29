# Crisis Detection & Safety Systems

**Last Updated:** 2026-03-03
**Status:** ✅ Production Ready
**Version:** 2.0.0

---

## Overview

Psychage v2 implements **three integrated crisis detection and safety systems** designed to protect users and provide immediate support when needed. These systems work autonomously and are fully integrated into the platform.

---

## 1. Symptom Navigator Safety System

**Location:** `src/lib/navigator/safety.ts`
**Status:** ✅ Fully Implemented & Tested (84 tests)
**Purpose:** Screen for red flags during symptom navigation

### How It Works

The Navigator runs safety screening **before** any condition matching:

```typescript
// Three-level red flag hierarchy
type RedFlagLevel = 'CRISIS' | 'URGENT' | 'WATCH';

// Screening triggers on:
1. Inherent red flags (symptoms marked is_red_flag=true)
2. Severity-triggered flags (symptom severity >= threshold)
```

### Red Flag Examples

**CRISIS Level** (flow halts immediately):
- COG_008: Suicidal thoughts
- COG_009: Self-harm thoughts
- COG_010: Harm to others thoughts
- CPG_004: Active suicide plan

**URGENT Level** (resources shown with results):
- PRC_008: Identity switching (≥7 severity)
- Severe dissociation

**WATCH Level** (monitoring suggested):
- CPG_015: Hopelessness (≥8 severity)
- ACT_009: Severe fatigue (≥8 severity)
- SLP_006: Sleep disturbance (≥8 severity)
- APT_005/006: Appetite changes (≥7 severity)

### Crisis Resources

When CRISIS is detected:
- Flow halts immediately
- No condition matching occurs
- Crisis resources displayed (988 Lifeline, Crisis Text Line, etc.)
- Resources are region-aware (DEFAULT fallback)

### Data Storage

**Migration:** `supabase/migrations/20260303000001_symptom_navigator_crisis.sql`

```sql
-- Crisis resources table
crisis_resources (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  contact TEXT NOT NULL,
  type TEXT NOT NULL, -- phone/text/website
  description TEXT,
  region TEXT DEFAULT 'DEFAULT',
  available_24_7 BOOLEAN DEFAULT true
)
```

**Privacy:** No symptom data is transmitted to the server during screening. All screening happens client-side.

---

## 2. AI Chat Safety System

**Location:** `src/lib/ai/safety.ts`
**Status:** ✅ Fully Implemented (3-layer system)
**Purpose:** Protect users during AI chat interactions

### Three-Layer Architecture

#### Layer 0: Instant Keyword Pre-Check
- Runs **before** LLM call (zero latency)
- Regex-based detection for obvious crisis language
- Catches: suicide, self-harm, homicidal intent, active danger

```typescript
const CRISIS_KEYWORDS: RegExp[] = [
  /\b(kill\s*(my)?self|suicide|suicidal)\b/i,
  /\b(end(ing)?\s*(my\s*life|it\s*all))\b/i,
  /\b(want\s*to\s*die|wanna\s*die)\b/i,
  // ... 11 total patterns
];
```

#### Layer 1: LLM-Based Input Classifier
- Classifies user messages into safety levels
- Uses GPT-4 for nuanced understanding
- Returns: SAFE | CRISIS | URGENT | WATCH | OUT_OF_SCOPE | HARMFUL_REQUEST

#### Layer 2: Output Safety Validator
- Validates LLM responses before showing to user
- Prevents diagnostic language ("you have depression")
- Prevents therapeutic advice ("you should try CBT")
- Prevents dismissive language ("you're fine")

### Crisis Response

When CRISIS is detected:
```typescript
// Returns crisis resources immediately
generateCrisisResponse(region, language) // -> Markdown with resources
```

Resources include:
- 988 Suicide & Crisis Lifeline (US)
- Crisis Text Line (US)
- Samaritans (UK)
- Kids Help Phone (CA)
- Lifeline Australia (AU)
- Find A Helpline (Global)

### Conversation-Level Monitoring (Layer 3)

Tracks patterns across entire conversation:
- **Distress trend:** stable | improving | escalating
- **Dominant topics:** depression, anxiety, trauma, etc.
- **Turn count:** Suggests professional help after 20+ turns
- **Safety flags triggered:** Historical view of concerns

---

## 3. Clarity Score Crisis Detection

**Location:** `supabase/functions/_shared/crisis-detection.ts`
**Status:** ✅ Fully Implemented (Backend)
**Purpose:** Detect crisis based on validated mental health assessment scores

### Clinical Thresholds

```typescript
// Crisis triggers (ANY of these):
1. PHQ-2 ≥ 5 (severe depression symptoms)
2. WHO-5 percentage ≤ 16 (critical low wellbeing)
3. PHQ-4 total ≥ 10 (severe combined distress)
```

### Severity Levels

```typescript
type CrisisResult = {
  detected: boolean;
  triggers: string[];
  severity: 'none' | 'moderate' | 'high' | 'severe';
};
```

### Crisis Resources

Returns same resources as AI system, with recommended actions:
- 988 Suicide & Crisis Lifeline
- Crisis Text Line
- SAMHSA National Helpline
- NAMI HelpLine

### Implementation

```typescript
// Example usage in Edge Function
const crisis = detectCrisis(instrumentScores);

if (crisis.detected) {
  const resources = getRecommendedCrisisResources();
  const message = getCrisisMessage(crisis);
  // Return crisis screen to user
}
```

---

## Integration Points

### Where Crisis Detection Runs

1. **Symptom Navigator** (`/tools/symptom-navigator`)
   - Uses: Navigator Safety System
   - Triggers: During symptom selection (before results)

2. **MindMate AI Chat** (`/tools/mindmate`, widget)
   - Uses: AI Chat Safety System
   - Triggers: Every user message (Layer 0 + 1) + Every AI response (Layer 2)

3. **Clarity Score Assessment** (`/clarity-score`)
   - Uses: Clarity Score Crisis Detection
   - Triggers: On assessment submission (backend)

### Shared Crisis Banner

**Component:** `src/components/layout/CrisisBanner.tsx`

Displayed globally across the site:
- Yellow/amber background
- "Need immediate help?" message
- Call 988 button
- Text Crisis Line button

---

## Environment Variables

```bash
# AI Chat Safety (optional - falls back to keyword-only)
VITE_OPENAI_API_KEY=sk-...  # For LLM-based classification

# Clarity Score (required for backend)
# Set in Supabase Edge Functions environment
```

No API keys are required for Navigator safety (100% client-side).

---

## Testing

### Navigator Safety
**Location:** `src/tests/navigator/safety.test.ts`
**Coverage:** 84 tests (base + Phase 4 expansion)

```bash
npm run test -- navigator/safety
```

### AI Chat Safety
**Location:** `src/tests/ai/safety.test.ts`
**Coverage:** Integration tests with mock LLM

```bash
npm run test -- ai/safety
```

### Clarity Score Crisis
**Location:** `supabase/functions/_shared/__tests__/crisis-detection.test.ts`
**Coverage:** Unit tests for thresholds

```bash
cd supabase && deno test functions/_shared/__tests__/crisis-detection.test.ts
```

---

## Privacy & Security

### What We Collect

**Navigator Safety:**
- ✅ Red flag level (CRISIS/URGENT/WATCH)
- ✅ Region code (for resource localization)
- ❌ NO symptom data transmitted
- ❌ NO user identifiers

**AI Chat Safety:**
- ✅ Safety classification (SAFE/CRISIS/URGENT/WATCH)
- ✅ Anonymous conversation patterns
- ❌ NO raw crisis text sent to LLM
- ❌ NO user identity in logs

**Clarity Score:**
- ✅ Assessment scores (PHQ-2, WHO-5, PHQ-4)
- ✅ Crisis severity level
- ✅ Anonymous logs (no PII)
- ❌ NO individual answers stored

### Compliance

- HIPAA considerations: No PHI stored
- GDPR: Fully anonymous logging
- Suicide Prevention Best Practices: 988 Lifeline prioritized
- Clinical Review: All messaging reviewed by Dr. Lena Dobson

---

## Migration From Old System

**Date:** 2026-03-03
**Status:** ✅ Complete

### What Was Removed

- `src/crisis/` directory (old three-tier keyword system)
- `api/crisis-companion/` (Anthropic API route)
- `api/crisis-event/` (event logging route)
- `supabase/migrations/20260303000010_crisis_system_schema.sql`
- `CRISIS_PRIVACY.md` (outdated documentation)

### What Remains (Production Systems)

1. Navigator Safety (`src/lib/navigator/safety.ts`)
2. AI Chat Safety (`src/lib/ai/safety.ts`)
3. Clarity Score Crisis (`supabase/functions/_shared/crisis-detection.ts`)

All three systems are **production-ready, tested, and actively in use**.

---

## Monitoring

### Key Metrics

1. **Crisis detection rate:** % of sessions triggering CRISIS
2. **False positive rate:** User dismissals without action
3. **Resource engagement:** Click-through on 988/text line
4. **Safety flag trends:** WATCH → URGENT → CRISIS progression

### Dashboards

- Navigator analytics: `src/app/api/navigator/analytics/route.ts`
- AI chat logs: Logged in `src/lib/ai/analytics.ts`
- Clarity Score: Supabase dashboard (crisis_results table)

---

## Support & Escalation

**Technical Issues:** GitHub Issues
**Clinical Review:** Dr. Lena Dobson
**Emergency Protocol:** Always prioritize user safety over feature functionality

If a crisis detection system fails, all three systems have graceful fallbacks:
- Navigator: Shows default crisis resources
- AI Chat: Returns static crisis message
- Clarity Score: Returns generic "seek help" message

**Remember:** A false positive (showing resources when not needed) is infinitely better than a false negative (missing a real crisis).

---

## Quick Reference

| System | Location | Triggers | Response |
|--------|----------|----------|----------|
| Navigator | `src/lib/navigator/safety.ts` | Red flag symptoms | Halt flow + resources |
| AI Chat | `src/lib/ai/safety.ts` | Crisis keywords/patterns | Crisis message + resources |
| Clarity Score | `supabase/functions/_shared/crisis-detection.ts` | PHQ-2/WHO-5/PHQ-4 thresholds | Crisis modal + resources |

All systems prioritize **immediate support** and **never** provide diagnosis or treatment.
