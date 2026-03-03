# Psychage Crisis Detection System

**Version:** 1.0.0 (Initial Structure)
**Status:** 🚧 Foundation Complete, Implementation Pending
**Clinical Review:** Dr. Lena Dobson
**Last Updated:** 2026-03-03

---

## Overview

A production-grade, life-saving crisis detection and management system for the Psychage mental health platform. This system integrates into the existing React + TypeScript + Supabase architecture to provide:

- 🔍 **Three-tier client-side crisis detection** (mild → elevated → immediate danger)
- 🌍 **Geo-aware crisis resource routing** (ThroughLine API + 40+ country fallbacks)
- 🤖 **AI crisis companion** (Anthropic Claude with clinically-reviewed prompts)
- 📊 **Pattern-based mood tracking** (6.8-day predictive intervention window)
- 🛡️ **Stanley-Brown safety planning** (45% reduction in psychiatric hospitalization)
- 🔐 **Privacy-first architecture** (client-side detection, AES-256 encryption)

---

## Directory Structure

```
src/crisis/
├── hooks/                          # React hooks for crisis functionality
│   ├── useCrisisDetection.ts      # Core detection engine (<50ms requirement)
│   ├── useGeoLocation.ts          # Country resolution with fallback chain
│   ├── useMoodTracking.ts         # Pattern analysis for proactive intervention
│   └── useSafetyPlan.ts           # Encrypted CRUD for safety plans
│
├── components/                     # UI components
│   ├── CrisisDetectionWrapper.tsx # HOC - wraps any text input
│   ├── EmergencyModal.tsx         # TIER 3 fullscreen takeover (most critical)
│   ├── CrisisBanner.tsx           # TIER 2 inline warning
│   ├── GentleCheckIn.tsx          # TIER 1 supportive nudge
│   ├── GlobalResourcePanel.tsx    # Country-aware crisis line display
│   ├── MoodLogger.tsx             # Daily mood input + 30-day chart
│   ├── MoodPatternAlert.tsx       # Proactive alerts from pattern analysis
│   └── SafetyPlanBuilder.tsx      # 5-step Stanley-Brown implementation
│
├── data/                           # Static data and configurations
│   ├── crisisKeywords.ts          # Multilingual keyword corpus (EN, ES, FR, DE, BN)
│   ├── fallbackResources.ts       # 40+ country crisis lines (verified)
│   └── systemPrompts.ts           # Claude prompts (Dr. Dobson approved)
│
├── lib/                            # Utilities
│   ├── crisisLogger.ts            # Anonymous event logging (no PII)
│   ├── encryptionUtils.ts         # AES-256-GCM for safety plans
│   └── throughlineClient.ts       # ThroughLine API wrapper + caching
│
├── types/                          # TypeScript definitions
│   └── crisis.types.ts            # All interfaces and types
│
├── __tests__/                      # Test suite
│   ├── crisisDetection.test.ts    # Accuracy + performance tests
│   ├── geoDetection.test.ts       # Fallback chain tests
│   └── safetyPlan.test.ts         # Encryption security tests
│
├── index.ts                        # Module exports
└── README.md                       # This file

api/                                # Vercel serverless functions
├── crisis-companion/index.ts      # Claude API endpoint (sanitized requests)
├── geo-detect/index.ts            # Edge function for IP → country
├── throughline/index.ts           # ThroughLine API proxy (hides key)
├── mood-log/index.ts              # Supabase mood entry endpoint
└── crisis-event/index.ts          # Anonymous event logging
```

---

## Core Architecture Decisions

### 1. Client-Side Detection (Non-Negotiable)
**Why:** When someone types "I want to kill myself," that text should **never** be transmitted to a server during the detection phase. Privacy and trust are paramount.

**How it works:**
1. User types in any wrapped text input
2. Detection runs **in the browser** using the keyword corpus
3. If crisis is detected, only the **tier level** and a **sanitized context summary** are sent to the AI API
4. Raw text never leaves the device

**Precedent:** BetterHelp uses this approach successfully at scale.

### 2. Three-Tier Response System
- **TIER 1 (Mild):** Supportive check-in (sad, anxious, stressed)
- **TIER 2 (Elevated):** Crisis banner + AI response (hopeless, worthless, trapped)
- **TIER 3 (Immediate):** Emergency modal takeover (suicidal ideation, self-harm intent)

Each tier has a clinically-reviewed Claude prompt optimized for that crisis level.

### 3. Privacy-First Data Handling
- Crisis events: Logged anonymously (SHA-256 hashed session ID, no PII)
- Mood logs: localStorage for anonymous, encrypted Supabase for authenticated
- Safety plans: AES-256-GCM encrypted with user-derived key (Psychage cannot read)
- ThroughLine API: Only country code sent, no user data
- Claude API: Only tier + sanitized context, never raw text

---

## Integration Points

### Where to Apply `CrisisDetectionWrapper`
Wrap any text input where users might express distress:
- ✅ AI Help Chatbot input
- ✅ Symptom Navigator text fields
- ✅ Clarity Score freetext inputs
- ✅ Daily check-in journal entries
- ✅ Community forum post composer (future)

**Example:**
```tsx
import { CrisisDetectionWrapper } from '@/crisis';

<CrisisDetectionWrapper locale="en">
  <YourTextInputComponent />
</CrisisDetectionWrapper>
```

### Required Environment Variables
See `.env.crisis.example` for full list. Minimum required:
```bash
ANTHROPIC_API_KEY=sk-ant-...              # Claude API
THROUGHLINE_API_KEY=...                    # Crisis resource API
VITE_SAFETY_PLAN_ENCRYPTION_SALT=...      # 32-byte hex string
VITE_CRISIS_DETECTION_ENABLED=true
```

**Note:** System works without API keys by falling back to static resources and messages.

---

## Database Schema (Supabase)

Run migration files to create these tables:

### `crisis_events` (Anonymous Impact Tracking)
```sql
- tier (1, 2, or 3)
- country_code (e.g., "US")
- detected_language (e.g., "en")
- session_id (SHA-256 hashed)
- triggered_at (timestamp)
- throughline_resource_shown (boolean)
- emergency_modal_dismissed (boolean)
- dismissal_path ('called_help' | 'safe_now')
```

### `mood_logs` (Pattern Analysis)
```sql
- user_id_hash (SHA-256, not reversible)
- mood_level (0-5)
- logged_at (timestamp)
- country_code
- triggered_alert_type
```

### `safety_plans` (Encrypted Storage)
```sql
- user_id (FK to auth.users)
- encrypted_content (AES-256-GCM)
- iv (initialization vector)
- version
- created_at / updated_at
- is_complete
```

### `crisis_resources_cache` (ThroughLine Cache)
```sql
- country_code (PK)
- resources (JSONB)
- cached_at / expires_at (24hr TTL)
```

---

## Implementation Phases

This structure follows the master prompt's phased approach:

### ✅ PHASE 1: Foundation (COMPLETE)
- [x] TypeScript interfaces (`crisis.types.ts`)
- [x] Crisis keyword corpus (`crisisKeywords.ts`)
- [x] System prompts (`systemPrompts.ts`)
- [x] Fallback resources (`fallbackResources.ts`)
- [x] Hook scaffolds
- [x] Component scaffolds
- [x] API route scaffolds
- [x] Test file placeholders
- [x] Documentation

### 🚧 PHASE 2: Detection Engine (NEXT)
- [ ] Implement `useCrisisDetection` logic
- [ ] Add Levenshtein distance for misspellings
- [ ] Performance optimization (<50ms)
- [ ] False-positive prevention
- [ ] Write detection tests

### 🚧 PHASE 3: Data Layer
- [ ] Supabase migrations
- [ ] `useGeoLocation` implementation
- [ ] ThroughLine API integration
- [ ] Crisis event logging
- [ ] Resource caching

### 🚧 PHASE 4: AI Integration
- [ ] Claude API integration
- [ ] Context sanitization layer
- [ ] Rate limiting (20 calls/session, TIER 3 exempt)
- [ ] Fallback static messages

### 🚧 PHASE 5: UI Components
- [ ] `EmergencyModal` (test on real mobile devices)
- [ ] `CrisisBanner` + AI response display
- [ ] `GentleCheckIn` soft nudge
- [ ] `CrisisDetectionWrapper` HOC
- [ ] `MoodLogger` + Recharts visualization
- [ ] `SafetyPlanBuilder` 5-step interface

### 🚧 PHASE 6: Polish & Testing
- [ ] Full test suite (84 tests planned)
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Performance testing (mobile simulation)
- [ ] E2E crisis flow testing
- [ ] Clinical review final approval

---

## Performance Requirements

| Metric | Target | Critical? |
|--------|--------|-----------|
| Detection latency | <50ms | ✅ Yes |
| Emergency modal render | <200ms | ✅ Yes |
| Geo-detection | <500ms | ⚠️ Nice-to-have |
| ThroughLine API | <2s (cached: <50ms) | ⚠️ Falls back to static |

---

## Testing Strategy

### Unit Tests
- Detection accuracy (11 test scenarios)
- False-positive prevention
- Encryption/decryption correctness

### Integration Tests
- Geo-detection fallback chain
- ThroughLine API → fallback → static
- Claude API → static message

### E2E Tests
- Full crisis detection flow (TIER 1 → 2 → 3)
- Emergency modal interaction
- Safety plan creation + export

### Accessibility Tests
- Screen reader compatibility
- Keyboard navigation
- Color contrast (WCAG 2.1 AA minimum)

### Device Testing
- iPhone SE (smallest iOS)
- Samsung Galaxy A series (budget Android)
- Desktop (Chrome, Firefox, Safari)

---

## Security Considerations

### ✅ What We Do
- Client-side detection (no raw text transmission)
- SHA-256 session hashing
- AES-256-GCM encryption for safety plans
- User-derived keys (not stored in DB)
- Anonymous event logging (no PII)
- Rate limiting on AI calls

### ❌ What We Never Do
- Store raw crisis text
- Log IP addresses
- Store encryption keys in Supabase
- Share user data with ThroughLine/Anthropic
- Block access to crisis resources

---

## Clinical Validation

All crisis-facing language reviewed by:
**Dr. Lena Dobson, Clinical Neuropsychologist**

System prompts based on:
- Stanley-Brown Safety Planning Intervention
- Crisis intervention best practices
- Suicide prevention research (6.8-day prediction window)

---

## Questions or Issues?

- **Technical:** See `CLAUDE.md` for project context
- **Privacy:** See `CRISIS_PRIVACY.md` for data handling
- **Clinical:** Contact Dr. Dobson (clinical review)
- **Deployment:** Requires Vercel, Supabase, Anthropic API key, ThroughLine API key

---

**Remember:** This is the most important feature Psychage will ever ship. Every decision prioritizes **human safety > privacy > performance > aesthetics**.
