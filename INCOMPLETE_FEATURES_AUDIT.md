# 🚨 Incomplete Features & Mock Implementations Audit

**Date**: March 3, 2026
**Purpose**: Identify all features that are incomplete, use mock data, or are not production-ready

---

## ❌ CRITICAL - NOT PRODUCTION-READY

### **1. EmergencyModal Component** ⚠️ CRITICAL
**File**: `src/crisis/components/EmergencyModal.tsx`
**Status**: ❌ PLACEHOLDER (line 37)
**Risk**: **CRITICAL** - This is the primary crisis intervention UI

**Current State**:
```tsx
<div className="bg-neutral-900 text-white max-w-lg mx-4 p-8 rounded-2xl shadow-2xl">
  {/* TODO: Implement full modal content */}
  <h1 id="emergency-modal-title">You are not alone right now.</h1>
  {/* Phone numbers, chat links, emergency services */}
  {/* "I've reached out for help" / "I am safe right now" links */}
</div>
```

**What's Missing**:
- ❌ 988 call button
- ❌ Crisis Text Line button
- ❌ International helpline finder
- ❌ "I've called for help" dismissal button
- ❌ "I'm safe now" dismissal button
- ❌ Dismissal tracking/logging
- ❌ Cannot dismiss with Escape/click outside (requirement)
- ❌ Mobile testing on iPhone SE + Android
- ❌ WCAG 2.1 AA contrast verification

**Impact**: Users in crisis will see placeholder modal without actual resources
**Priority**: 🔴 **MUST COMPLETE BEFORE ANY DEPLOYMENT**

---

### **2. Crisis Companion API** ⚠️ CRITICAL
**File**: `api/crisis-companion/index.ts`
**Status**: ❌ PLACEHOLDER RESPONSE (lines 29-44)
**Risk**: **HIGH** - Crisis users get non-functional AI companion

**Current State**:
```typescript
// TODO: Implement rate limiting (20 calls per session, TIER 3 exempt)
// TODO: Call Anthropic API with appropriate system prompt

// For now, return a placeholder response
const response: CrisisCompanionResponse = {
  message: 'This is a placeholder response. Claude API integration pending.',
  followUpPrompt: tier === 3 ? undefined : 'How are you feeling right now?',
};
```

**What's Missing**:
- ❌ Anthropic Claude API integration
- ❌ Rate limiting (20 calls per session, Tier 3 exempt)
- ❌ System prompt loading from `getSystemPromptForTier()`
- ❌ Crisis keyword sanitization before API call
- ❌ Response validation

**Impact**: Crisis companion feature completely non-functional
**Priority**: 🔴 **HIGH** - Core crisis feature

---

### **3. ThroughLine API Integration** ⚠️ MEDIUM
**Files**:
- `api/throughline/index.ts` (lines 32-47)
- `src/crisis/lib/throughlineClient.ts` (lines 49-64)

**Status**: ❌ MOCK IMPLEMENTATION
**Risk**: **MEDIUM** - Falls back to static data (acceptable, but not optimal)

**Current State**:
```typescript
// TODO: Check Supabase cache first (24hr TTL)
// TODO: Call ThroughLine API when key is available

// For now, use fallback resources
const resources = getFallbackResourcesByCountry(countryCode);
```

**What's Missing**:
- ❌ ThroughLine API key integration
- ❌ API endpoint configuration (`THROUGHLINE_API_BASE_URL`)
- ❌ Supabase caching (24hr TTL)
- ❌ Cache invalidation logic
- ❌ Country code to name mapping (line 80)

**Fallback**: ✅ Comprehensive static resources (40+ countries)
**Impact**: Works with static data, but misses real-time updates
**Priority**: 🟡 **MEDIUM** - Can deploy without this (fallback is solid)

---

## ⚠️ HIGH PRIORITY - MOCK DATA FALLBACKS

### **4. Provider Directory Service**
**File**: `src/services/providerService.ts`
**Status**: ⚠️ HYBRID (Supabase + mock fallback)

**Mock Fallback Implementation**:
```typescript
import { providers as mockProviders } from '../data/providers';

// Falls back to mock data if DB query fails
if (error) {
  console.warn('Falling back to mock providers');
  return filterMockProviders(mockProviders, params);
}
```

**Production State**:
- ✅ Supabase integration complete
- ✅ Search/filter working
- ⚠️ Falls back to mock data if database empty
- ⚠️ Mock data in `src/data/providers.ts` (23 fake providers)

**Impact**: Works in production, but shows mock providers if DB empty
**Priority**: 🟡 **MEDIUM** - Ensure Supabase has real provider data

---

### **5. Article Service**
**File**: `src/services/articleService.ts`
**Status**: ⚠️ HYBRID (Sanity → Supabase → Mock fallback)

**Fallback Chain**:
```typescript
// Priority: Sanity > Supabase > Mock
1. Sanity CMS (primary source) ✅
2. Supabase database (backup) ✅
3. Mock data from src/data/articles.ts ⚠️
```

**Mock Fallback**:
```typescript
// Final fallback to mock data
console.log('[ArticleService] Using mock data');
let result = mockArticles.map(a => ({ ...a, _source: 'mock' as const }));
```

**Production State**:
- ✅ Sanity CMS integration complete
- ✅ Supabase fallback working
- ⚠️ 12 mock articles in `src/data/articles.ts`

**Impact**: Shows mock articles if both Sanity and Supabase fail
**Priority**: 🟡 **MEDIUM** - Ensure Sanity has real content

---

### **6. Category Service**
**File**: `src/services/categoryService.ts`
**Status**: ⚠️ HYBRID (Supabase + mock fallback)

**Mock Fallback**:
```typescript
import { categories as mockCategories } from '../data/categories';

try {
  // Fetch from Supabase
} catch (error) {
  console.error('Failed to fetch categories from Supabase, using mock data:', error);
  return mockCategories;
}
```

**Production State**:
- ✅ Supabase integration complete
- ⚠️ Falls back to 31 mock categories

**Impact**: Shows mock categories if Supabase fails
**Priority**: 🟢 **LOW** - Categories are static, mock data is acceptable

---

## 🟡 MEDIUM PRIORITY - INCOMPLETE FEATURES

### **7. AI Content Embedding - Portable Text Parsing**
**File**: `api/ai/embed.ts`
**Status**: ⚠️ INCOMPLETE (line 94)

**Current Implementation**:
```typescript
// TODO: Implement proper Portable Text parsing for body content
const contentText = `${document.title}\n\n${document.excerpt || ''}`;
```

**What's Missing**:
- ❌ Full Portable Text parsing (only using title + excerpt)
- ❌ Body content not being embedded
- ❌ Structured content extraction (headings, lists, etc.)

**Impact**: MindMate AI searches only titles/excerpts, not full article bodies
**Priority**: 🟡 **MEDIUM** - Limits RAG effectiveness

---

### **8. Crisis Content Detection**
**File**: `api/ai/embed.ts`
**Status**: ⚠️ INCOMPLETE (line 133)

**Current Implementation**:
```typescript
is_crisis: false, // TODO: Detect crisis-adjacent content
```

**What's Missing**:
- ❌ Crisis keyword detection in content
- ❌ Flagging crisis-related articles
- ❌ Special handling for crisis content in RAG

**Impact**: Crisis-related articles not flagged for priority retrieval
**Priority**: 🟡 **MEDIUM** - Nice to have, not critical

---

### **9. Geo-Detection Country Names**
**File**: `api/geo-detect/index.ts`
**Status**: ⚠️ INCOMPLETE (line 41)

**Current Implementation**:
```typescript
const COUNTRY_NAMES: Record<string, string> = {
  US: 'United States',
  GB: 'United Kingdom',
  // ... only 16 countries
  // TODO: Expand to full list
};
```

**What's Missing**:
- ❌ Only 16 country names mapped
- ❌ Missing 175+ countries

**Impact**: Unknown countries show code instead of name
**Priority**: 🟢 **LOW** - Falls back to country code (acceptable)

---

### **10. Mood Log API**
**File**: `api/mood-log/index.ts`
**Status**: ⚠️ COMMENTED TODO (line 37)

**Current Implementation**:
```typescript
// TODO: Insert into Supabase mood_logs table
// (commented implementation exists)

// For now, just return success
return res.status(201).json({ success: true, mood_level });
```

**What's Missing**:
- ❌ Actual Supabase insertion (commented out)
- ❌ Error handling for DB failures

**Impact**: Mood logs not persisted for authenticated users
**Priority**: 🟡 **MEDIUM** - Anonymous users work (localStorage), authenticated users need this

---

## 🟢 LOW PRIORITY - MINOR GAPS

### **11. Navigator Age Gate**
**File**: `src/lib/navigator/config.ts`
**Status**: ⚠️ LEGAL REVIEW REQUIRED (line 2)

```typescript
// TODO: Product/Legal review required for age gate implementation
export const AGE_GATE_ENABLED = false;
```

**Legal TODOs** (lines 27-35):
- [ ] Review COPPA compliance requirements
- [ ] Consult legal on age verification approach
- [ ] Determine jurisdiction-specific rules
- [ ] Add parental consent flow if needed
- [ ] Update Privacy Policy with age restrictions
- [ ] Implement age verification UI
- [ ] Add cookie consent for <13 users
- [ ] Test age gate flow

**Priority**: 🟢 **LOW** - Can launch without age gate initially

---

### **12. Navigator Analytics**
**File**: `src/lib/navigator/analytics.ts`
**Status**: ⚠️ COMMENTED STUB (line 91)

```typescript
// TODO: Integrate with Supabase analytics table or external service
```

**Impact**: Analytics not sent to backend (client-side only)
**Priority**: 🟢 **LOW** - Can add later

---

## 📋 SUMMARY

### **CRITICAL (Must Complete Before Deployment)**:
1. ❌ **EmergencyModal Component** - PLACEHOLDER, NO RESOURCES
2. ❌ **Crisis Companion API** - PLACEHOLDER RESPONSE

### **HIGH (Should Complete Soon)**:
3. ⚠️ **Provider Directory** - Mock fallback (ensure DB populated)
4. ⚠️ **Article Service** - Mock fallback (ensure Sanity populated)
5. ⚠️ **Mood Log API** - TODO commented (complete Supabase integration)

### **MEDIUM (Can Deploy Without, But Should Fix)**:
6. ⚠️ **ThroughLine API** - Mock (fallback works fine)
7. ⚠️ **AI Embed Portable Text** - Incomplete parsing
8. ⚠️ **Crisis Content Detection** - Not implemented

### **LOW (Nice to Have)**:
9. 🟢 **Geo-Detection Names** - Limited country list
10. 🟢 **Age Gate** - Legal review pending
11. 🟢 **Analytics Backend** - Client-side only

---

## 🎯 RECOMMENDED ACTION PLAN

### **BEFORE ANY DEPLOYMENT**:
1. ✅ Complete EmergencyModal component (1-2 hours)
2. ✅ Complete Crisis Companion API integration (2-3 hours)
3. ✅ Run MindMate safety testing (3-4 hours)

### **BEFORE FULL LAUNCH**:
4. Ensure Supabase has real provider data (not mock)
5. Ensure Sanity CMS has real articles (not mock)
6. Complete Mood Log API Supabase integration (30 min)

### **PHASE 2 (Post-Launch)**:
7. Add ThroughLine API integration
8. Improve Portable Text parsing
9. Add crisis content detection
10. Expand country name mapping

---

## 📊 PRODUCTION READINESS SCORE

**Critical Features**: 0/2 (0%) ❌
- EmergencyModal: ❌
- Crisis Companion: ❌

**Core Features**: 3/5 (60%) ⚠️
- Provider Directory: ⚠️ (mock fallback)
- Article Service: ⚠️ (mock fallback)
- Mood Log: ⚠️ (TODO)
- Category Service: ✅ (acceptable mock fallback)
- Geo Detection: ✅ (works)

**Optional Features**: 0/3 (0%) 🟢
- ThroughLine: ⚠️ (good fallback)
- AI Enhancements: ⚠️
- Analytics: ⚠️

**Overall**: **50% Production-Ready** (with critical blockers)

---

## ✅ WHAT IS PRODUCTION-READY

### **Fully Complete & Tested**:
- ✅ Crisis Detection System (28/28 tests passing)
- ✅ Geo-Location Hook (8/8 tests passing)
- ✅ Mood Tracking Hook (pattern detection working)
- ✅ Safety Plan Builder (9/9 tests passing, encryption verified)
- ✅ Symptom Navigator (84 tests passing)
- ✅ MindMate AI Chat Interface (UI complete)
- ✅ Clarity Score Assessment (modified, needs review)

### **Working with Acceptable Fallbacks**:
- ✅ Provider Directory (mock fallback acceptable for testing)
- ✅ Article Service (mock fallback acceptable for testing)
- ✅ Category Service (static data, acceptable)
- ✅ ThroughLine (40+ country static resources)

---

## 🚨 DEPLOYMENT BLOCKERS

**Cannot deploy to production until**:
1. ❌ EmergencyModal is fully implemented
2. ❌ Crisis Companion API is integrated
3. ❌ MindMate safety testing passes 100%

**Can deploy to staging with**:
- ⚠️ Mock data fallbacks (acceptable for testing)
- ⚠️ ThroughLine using static resources
- ⚠️ Incomplete Portable Text parsing

---

**Bottom Line**: The crisis detection, geo-location, mood tracking, and safety plan systems are **production-ready**. The blocking issues are:
1. EmergencyModal placeholder
2. Crisis Companion placeholder
3. MindMate safety testing

**Estimated Time to Production-Ready**: 6-8 hours (complete blockers + safety testing)

---

*Generated by comprehensive codebase audit on March 3, 2026*
