# Implementation Plan: Complete All Incomplete Features

## Context

The Psychage v2 project is 95% complete with all critical crisis detection hooks, geo-location, mood tracking, and safety plan systems fully tested (28/28 tests passing). However, a comprehensive audit identified **12 incomplete features** that block production deployment:

**Critical Blockers (Cannot Deploy)**:
1. EmergencyModal component - placeholder UI only (line 37)
2. Crisis Companion API - returns placeholder response (lines 29-44)
3. MindMate AI safety testing - not completed

**High Priority (Should Complete)**:
4. Mood Log API - Supabase integration commented out (line 37)
5. Provider/Article services - mock data fallbacks need real data

**Medium Priority (Can Deploy Without)**:
6. ThroughLine API - uses static fallback (acceptable)
7. AI Portable Text parsing - only embeds title/excerpt, not full body
8. Crisis content detection - always sets `is_crisis: false`

This plan addresses items 1-4 (critical + high priority) to reach production-ready status.

---

## Phase 1: Complete EmergencyModal Component (CRITICAL)

### Current State
**File**: `src/crisis/components/EmergencyModal.tsx`
- Line 37: `{/* TODO: Implement full modal content */}`
- Only has placeholder heading, no resources or dismissal buttons
- createPortal structure exists but content is empty

### Reference Implementations Found
1. **CrisisOverlay.tsx** (`src/components/navigator/CrisisOverlay.tsx`) - Best reference
   - Uses `fixed inset-0 z-[101]` positioning (more reliable than Portal)
   - Focus trap with `useFocusTrap()` hook
   - Escape key focuses primary button instead of closing
   - Body scroll lock: `document.body.style.overflow = 'hidden'`
   - Red accent bar at top
   - ARIA: `role="alertdialog"`, `aria-modal="true"`

2. **CrisisResourceCard.tsx** (`src/components/navigator/CrisisResourceCard.tsx`)
   - Icon selection based on resource type
   - Action href generation (`tel:`, `sms:`, `http://`)
   - 24/7 badge with `bg-crisis-red/20`
   - Interactive card with shimmer effect

3. **SafetyBanner.tsx** (`src/components/ai/SafetyBanner.tsx`)
   - Three main resources: 988 Lifeline, Crisis Text Line, International
   - Resource card layout with icons
   - Call-to-action text: "You're not alone right now"

4. **useFocusTrap.ts** (`src/hooks/useFocusTrap.ts`)
   - Custom Escape handler that focuses button instead of closing
   - Initial focus management

### Implementation Steps

**1.1 Update Modal Structure**
- Replace placeholder div with full crisis overlay structure
- Add red accent bar (`h-2 bg-crisis-red w-full`)
- Add ShieldAlert icon in circular container
- Add heading: "You are not alone right now"
- Add supportive description text

**1.2 Add Crisis Resources Display**
- Map through `resources` prop to display crisis resource cards
- Each card shows:
  - Organization name
  - Phone number (if available) with `href="tel:${phoneNumber}"`
  - Text option (if available) with `href="sms:${textNumber}"`
  - Chat URL (if available) with `href="${chatUrl}" target="_blank"`
  - 24/7 badge if `isAvailable24_7`
- Use icons: Phone, MessageSquare, ExternalLink from lucide-react
- Apply crisis red color scheme (`bg-crisis-red text-white`)

**1.3 Add Dismissal Buttons**
- Two dismissal paths (from types):
  - Primary: "I've called for help" → `onDismiss("called_help")`
  - Secondary: "I'm safe right now" → `onDismiss("safe_now")`
- Buttons styled with:
  - Primary: `bg-white text-charcoal-900 hover:bg-white/90`
  - Secondary: `bg-white/10 text-white hover:bg-white/20`
- Both buttons trigger dismissal tracking via `crisisLogger.ts`

**1.4 Add Focus Management**
- Initialize `useFocusTrap()` with custom Escape handler
- Escape key should focus primary button, not close modal
- Initial focus on heading for screen reader context
- Body scroll lock on mount, restore on unmount

**1.5 Add ARIA Attributes**
- `role="alertdialog"`
- `aria-modal="true"`
- `aria-labelledby="emergency-modal-title"`
- `aria-describedby="emergency-modal-description"`

**1.6 Add Dismissal Tracking**
Import from `src/crisis/lib/crisisLogger.ts`:
```typescript
import { logCrisisEvent, getSessionId } from '@/crisis/lib/crisisLogger';

const handleDismiss = async (path: 'called_help' | 'safe_now') => {
  await logCrisisEvent({
    tier: 3,
    countryCode,
    detectedLanguage: locale,
    sessionId: getSessionId(),
    throughlineResourceShown: resources.length > 0,
    emergencyModalDismissed: true,
    dismissalPath: path,
  });

  onDismiss(path);
};
```

### Files to Modify
- `src/crisis/components/EmergencyModal.tsx`

### Expected Outcome
- Fully functional emergency modal with crisis resources
- Two-button dismissal flow with tracking
- Cannot dismiss via Escape/click outside (must choose action)
- WCAG 2.1 AA compliant
- Mobile-responsive with safe area insets

---

## Phase 2: Complete Crisis Companion API (CRITICAL)

### Current State
**File**: `api/crisis-companion/index.ts`
- Lines 29-44: TODOs for rate limiting and Anthropic API
- Returns placeholder message: "This is a placeholder response. Claude API integration pending."

### Reference Implementations Found
1. **MindMate Chat API** (`api/ai/chat.ts`)
   - Rate limiting with in-memory Map store
   - Anthropic API integration pattern
   - Error handling with graceful fallback

2. **LLM Provider** (`src/lib/ai/llm.ts`)
   - AnthropicProvider class with full implementation
   - API endpoint: `https://api.anthropic.com/v1/messages`
   - Headers: `x-api-key`, `anthropic-version: 2023-06-01`
   - Model: `claude-sonnet-4-5-20250929`

3. **System Prompts** (`src/crisis/data/systemPrompts.ts`)
   - `getSystemPromptForTier()` function
   - Tier-specific prompts (1, 2, 3)

### Implementation Steps

**2.1 Add Rate Limiting**
```typescript
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(sessionId: string, maxCalls: number = 20, tier: number):
  { allowed: boolean; retryAfter?: number } {

  // Tier 3 exempt from limits
  if (tier === 3) {
    return { allowed: true };
  }

  const now = Date.now();
  const key = `crisis-companion:${sessionId}`;
  const entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetAt) {
    // Reset window (1 hour)
    rateLimitStore.set(key, { count: 1, resetAt: now + 3600000 });
    return { allowed: true };
  }

  if (entry.count >= maxCalls) {
    return {
      allowed: false,
      retryAfter: Math.ceil((entry.resetAt - now) / 1000),
    };
  }

  entry.count++;
  return { allowed: true };
}
```

**2.2 Integrate Anthropic API**
```typescript
import { getRequiredEnv } from '../../src/lib/ai/config';

// In handler, after validation:
const apiKey = getRequiredEnv('ANTHROPIC_API_KEY');
const systemPrompt = getSystemPromptForTier(tier);

const response = await fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': apiKey,
    'anthropic-version': '2023-06-01',
  },
  body: JSON.stringify({
    model: 'claude-sonnet-4-5-20250929',
    max_tokens: 1024,
    temperature: 0.7,
    system: systemPrompt,
    messages: [
      { role: 'user', content: context }  // Sanitized context only
    ],
  }),
});

if (!response.ok) {
  const error = await response.text();
  throw new Error(`Anthropic API error (${response.status}): ${error}`);
}

const data = await response.json();
const message = data.content[0].text;
```

**2.3 Add Request Validation**
```typescript
// Validate tier
if (![1, 2, 3].includes(tier)) {
  return res.status(400).json({ error: 'Invalid tier (must be 1, 2, or 3)' });
}

// Validate context (sanitized, max 1000 chars)
if (!context || context.length > 1000) {
  return res.status(400).json({ error: 'Invalid context' });
}

// Validate sessionTurn
if (typeof sessionTurn !== 'number' || sessionTurn < 0) {
  return res.status(400).json({ error: 'Invalid sessionTurn' });
}
```

**2.4 Add Rate Limit Check**
```typescript
// After validation, before API call
const rateCheck = checkRateLimit(sessionId || 'anonymous', 20, tier);

if (!rateCheck.allowed) {
  return res.status(429).json({
    message: "I hear that you're going through something difficult. If you need immediate support, please reach out to a crisis helpline.",
    rateLimitExceeded: true,
    retryAfter: rateCheck.retryAfter,
  });
}
```

**2.5 Update Error Handling**
```typescript
try {
  // API call
  const message = ...;

  return res.status(200).json({
    message,
    followUpPrompt: tier === 3 ? undefined : 'How are you feeling right now?',
  });

} catch (apiError) {
  console.error('[Anthropic API Error]', apiError);

  // CRITICAL: Never fail on crisis — return supportive message
  return res.status(200).json({
    message: "I hear that you're going through something difficult. Please know that support is available right now.",
    followUpPrompt: tier === 3 ? undefined : 'Would you like to talk about what\'s on your mind?',
  });
}
```

### Files to Modify
- `api/crisis-companion/index.ts`

### Expected Outcome
- Fully functional Crisis Companion API
- Rate limiting: 20 calls per session (Tier 3 exempt)
- Anthropic Claude Sonnet 4.5 integration
- Tier-specific system prompts
- Never fails on crisis (always returns supportive message)
- Input sanitization (never sends raw crisis keywords)

---

## Phase 3: Complete Mood Log API (HIGH PRIORITY)

### Current State
**File**: `api/mood-log/index.ts`
- Line 37: `// TODO: Insert into Supabase mood_logs table`
- Commented implementation exists but not executed
- Returns success without actually saving

### Reference Implementations Found
1. **Supabase Insert Pattern** (`src/services/moodService.ts`)
   - `.insert().select().single()` pattern
   - Error handling with console logging
   - Returns null on error, data on success

2. **Server-side Client** (`api/ai/chat.ts`)
   - Uses `SUPABASE_SERVICE_ROLE_KEY` (not anon key)
   - Import via `createClient` from `@supabase/supabase-js`

3. **Migration** (`supabase/migrations/20260303000010_crisis_system_schema.sql`)
   - Table: `mood_logs`
   - Columns: `user_id_hash`, `mood_level`, `country_code`, `triggered_alert_type`, `logged_at`

### Implementation Steps

**3.1 Create Server-side Supabase Client**
```typescript
import { createClient } from '@supabase/supabase-js';
import { getRequiredEnv } from '../../src/lib/ai/config';

const supabase = createClient(
  getRequiredEnv('VITE_SUPABASE_URL'),
  getRequiredEnv('SUPABASE_SERVICE_ROLE_KEY')
);
```

**3.2 Replace TODO with Actual Insert**
```typescript
try {
  const { data, error } = await supabase
    .from('mood_logs')
    .insert({
      user_id_hash,
      mood_level,
      country_code,
      triggered_alert_type,
      logged_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error('[Mood Log API] Insert error:', error);
    return res.status(500).json({ error: 'Failed to log mood' });
  }

  return res.status(201).json({
    success: true,
    mood_level,
    id: data.id,
    logged_at: data.logged_at,
  });

} catch (dbError) {
  console.error('[Mood Log API] Database error:', dbError);
  return res.status(500).json({ error: 'Database connection failed' });
}
```

**3.3 Add Validation**
```typescript
// Validate mood_level range
if (mood_level < 0 || mood_level > 5) {
  return res.status(400).json({ error: 'Invalid mood level (must be 0-5)' });
}

// Validate user_id_hash format (should be SHA-256 hex, 64 chars)
if (!user_id_hash || user_id_hash.length !== 64 || !/^[a-f0-9]+$/.test(user_id_hash)) {
  return res.status(400).json({ error: 'Invalid user_id_hash format' });
}
```

### Files to Modify
- `api/mood-log/index.ts`

### Expected Outcome
- Mood logs successfully persisted to Supabase
- Validation for mood_level (0-5) and user_id_hash format
- Error handling with proper HTTP status codes
- Returns inserted data with ID and timestamp

---

## Phase 4: Optional Enhancements (MEDIUM PRIORITY)

### 4.1 Improve AI Portable Text Parsing

**Current State**: `api/ai/embed.ts:94`
- Only embeds title + excerpt
- Body content not being embedded

**Reference**: `@portabletext/toolkit` package already installed

**Implementation**:
```typescript
import { toPlainText } from '@portabletext/toolkit';

// Replace line 94 with:
const bodyText = document.body
  ? toPlainText(document.body)
  : '';
const contentText = `${document.title}\n\n${document.excerpt || ''}\n\n${bodyText}`;
```

**Files to Modify**:
- `api/ai/embed.ts`

**Expected Outcome**:
- MindMate RAG searches full article bodies, not just titles/excerpts
- Better semantic search results

---

### 4.2 Add Crisis Content Detection

**Current State**: `api/ai/embed.ts:133`
- Always sets `is_crisis: false`

**Implementation**:
```typescript
import { crisisKeywords } from '../../src/crisis/data/crisisKeywords';

function detectCrisisContent(text: string): boolean {
  const lowerText = text.toLowerCase();
  const tier3Keywords = crisisKeywords.filter(kw => kw.tier === 3);

  return tier3Keywords.some(kw => lowerText.includes(kw.keyword.toLowerCase()));
}

// Replace line 133:
is_crisis: detectCrisisContent(chunk),
```

**Files to Modify**:
- `api/ai/embed.ts`

**Expected Outcome**:
- Crisis-related articles flagged for priority in RAG retrieval
- Better context-aware responses for crisis queries

---

## Phase 5: Verification & Testing

### 5.1 EmergencyModal Testing

**Manual Tests**:
1. Start dev server: `npm run dev`
2. Navigate to a page that triggers crisis detection
3. Enter: "I want to hurt myself"
4. Verify EmergencyModal appears with:
   - Red accent bar at top
   - ShieldAlert icon
   - "You are not alone right now" heading
   - 3 crisis resources (988, Crisis Text Line, International)
   - Two dismissal buttons
5. Try Escape key → should focus primary button, not close
6. Try clicking outside → should not close
7. Click "I've called for help" → modal closes, event logged
8. Check browser console for log event
9. Test on mobile (resize to 375px width)
10. Test with screen reader (VoiceOver/NVDA)

**WCAG 2.1 AA Compliance**:
- [ ] Color contrast ratio ≥4.5:1 for text
- [ ] Keyboard navigable (Tab, Shift+Tab)
- [ ] Screen reader announces role, heading, description
- [ ] Focus trap works correctly
- [ ] Cannot dismiss accidentally

---

### 5.2 Crisis Companion API Testing

**Environment Setup**:
1. Add to `.env`:
```bash
ANTHROPIC_API_KEY=sk-ant-api03-...
```

**Manual Tests**:
```bash
# Test Tier 1 (Mild distress)
curl -X POST http://localhost:3000/api/crisis-companion \
  -H "Content-Type: application/json" \
  -d '{
    "tier": 1,
    "context": "Feeling stressed about work",
    "locale": "en",
    "countryCode": "US",
    "sessionTurn": 1
  }'

# Expected: Supportive AI response with follow-up prompt

# Test Tier 3 (Immediate danger)
curl -X POST http://localhost:3000/api/crisis-companion \
  -H "Content-Type: application/json" \
  -d '{
    "tier": 3,
    "context": "In crisis, need support",
    "locale": "en",
    "countryCode": "US",
    "sessionTurn": 1
  }'

# Expected: Crisis-focused response, no follow-up prompt

# Test Rate Limiting (21st call)
# Expected: 429 status with supportive message

# Test Tier 3 Rate Limit Exemption
# Expected: All calls succeed, no 429
```

**Integration Tests**:
- [ ] Tier 1 gets appropriate system prompt
- [ ] Tier 2 gets appropriate system prompt
- [ ] Tier 3 gets appropriate system prompt
- [ ] Rate limiting works (20 calls per session)
- [ ] Tier 3 exempt from rate limiting
- [ ] API errors return supportive fallback message
- [ ] Response includes message + followUpPrompt (except Tier 3)

---

### 5.3 Mood Log API Testing

**Environment Setup**:
1. Ensure database migration run: `supabase/migrations/20260303000010_crisis_system_schema.sql`
2. Verify `mood_logs` table exists in Supabase

**Manual Tests**:
```bash
# Test valid mood log
curl -X POST http://localhost:3000/api/mood-log \
  -H "Content-Type: application/json" \
  -d '{
    "mood_level": 3,
    "user_id_hash": "a".repeat(64),
    "country_code": "US",
    "triggered_alert_type": "declining_trend"
  }'

# Expected: 201 status with id and logged_at

# Test invalid mood level
curl -X POST http://localhost:3000/api/mood-log \
  -H "Content-Type: application/json" \
  -d '{"mood_level": 10, "user_id_hash": "a".repeat(64), "country_code": "US"}'

# Expected: 400 status with "Invalid mood level"

# Test invalid user_id_hash
curl -X POST http://localhost:3000/api/mood-log \
  -H "Content-Type: application/json" \
  -d '{"mood_level": 3, "user_id_hash": "invalid", "country_code": "US"}'

# Expected: 400 status with "Invalid user_id_hash format"
```

**Database Verification**:
```sql
-- Check inserted logs
SELECT * FROM mood_logs ORDER BY logged_at DESC LIMIT 10;

-- Verify data types
SELECT
  id,
  mood_level,
  country_code,
  triggered_alert_type,
  logged_at
FROM mood_logs;
```

---

### 5.4 End-to-End Crisis Flow Testing

**Complete Flow**:
1. User enters crisis text → `useCrisisDetection` detects Tier 3
2. EmergencyModal appears with resources
3. User clicks resource → opens phone/SMS app
4. User clicks "I've called for help" → modal closes
5. Crisis event logged to Supabase `crisis_events` table
6. (Optional) Crisis Companion provides supportive response

**Verification**:
```sql
-- Check crisis events logged
SELECT * FROM crisis_events ORDER BY triggered_at DESC LIMIT 10;

-- Verify dismissal paths
SELECT
  tier,
  emergency_modal_dismissed,
  dismissal_path,
  triggered_at
FROM crisis_events
WHERE tier = 3;
```

---

### 5.5 Run All Tests

```bash
# Run crisis system tests (should all pass)
npm run test -- src/crisis

# Expected: 28/28 tests passing
# - Crisis Detection: 13 tests ✅
# - Geo Detection: 8 tests ✅
# - Safety Plan: 9 tests ✅
```

---

## Summary of Changes

### Files to Modify (4 files):
1. `src/crisis/components/EmergencyModal.tsx` - Complete modal UI
2. `api/crisis-companion/index.ts` - Add Anthropic API + rate limiting
3. `api/mood-log/index.ts` - Add Supabase insert
4. `api/ai/embed.ts` - (Optional) Improve Portable Text parsing + crisis detection

### Environment Variables Needed:
```bash
# Add to .env and Vercel
ANTHROPIC_API_KEY=sk-ant-api03-...
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...
VITE_SUPABASE_URL=https://...supabase.co
```

### Database Prerequisites:
- Migration `20260303000010_crisis_system_schema.sql` must be run
- Tables: `crisis_events`, `mood_logs` must exist

### Expected Time:
- Phase 1 (EmergencyModal): 1-2 hours
- Phase 2 (Crisis Companion API): 2-3 hours
- Phase 3 (Mood Log API): 30 minutes
- Phase 4 (Optional enhancements): 1 hour
- Phase 5 (Testing): 1-2 hours
- **Total: 6-8 hours**

### Success Criteria:
- ✅ EmergencyModal shows all crisis resources with two-button dismissal
- ✅ Crisis Companion API returns Claude responses with tier-specific prompts
- ✅ Mood Log API persists logs to Supabase
- ✅ All 28 crisis system tests still passing
- ✅ End-to-end crisis flow works (detection → modal → dismissal → logging)
- ✅ WCAG 2.1 AA compliant
- ✅ Mobile responsive
- ✅ Never fails on crisis (graceful fallbacks everywhere)

---

## Production Deployment Checklist

After completing this plan:

1. [ ] Run database migrations in production Supabase
2. [ ] Add environment variables to Vercel
3. [ ] Complete MindMate AI safety testing (separate task, 3-4 hours)
4. [ ] Deploy to Vercel staging for final QA
5. [ ] Run smoke tests on staging
6. [ ] Deploy to production
7. [ ] Monitor error tracking for first 24 hours

**Production-Ready**: After completing Phases 1-3 + MindMate safety testing
