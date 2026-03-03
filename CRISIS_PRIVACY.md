# Crisis Detection System — Privacy & Data Handling

**Last Updated:** 2026-03-03
**Clinical Review:** Dr. Lena Dobson, Clinical Neuropsychologist
**Technical Lead:** Psychage Development Team

---

## Overview

The Psychage Crisis Detection System is designed with **privacy-first architecture**. This document explains exactly what data is collected, how it's used, and what safeguards protect user privacy.

---

## What Data is Collected

### 1. Crisis Detection Events (Anonymous)
When the system detects potential crisis language, we log:
- **Crisis tier** (1, 2, or 3)
- **Country code** (e.g., "US", "GB")
- **Detected language** (e.g., "en", "es")
- **Anonymous session ID** (SHA-256 hashed, not reversible)
- **Timestamp**
- **Whether resources were shown**
- **How the emergency modal was dismissed** (if applicable)

**Purpose:** Measure system effectiveness and identify gaps in crisis resource coverage.

### 2. Mood Logs (Encrypted for Authenticated Users)
When users log their mood:
- **Mood level** (0-5 scale)
- **Timestamp**
- **Country code**
- **Pattern alert type** (if triggered)

**Storage:**
- Anonymous users: localStorage only (stays on device, 90-day retention)
- Authenticated users: Encrypted in Supabase with user-derived key

### 3. Safety Plans (Fully Encrypted)
When users create a safety plan:
- **Encrypted content** (AES-256-GCM)
- **Initialization vector** (for decryption)
- **User ID** (to retrieve plan)
- **Completion status**
- **Timestamps**

**Security:** Psychage cannot read safety plan content. Encryption key is derived from your session token.

---

## What Data is NEVER Collected

We **absolutely do not** collect:
- ❌ Raw text containing crisis keywords
- ❌ IP addresses
- ❌ User identity in crisis events (fully anonymized)
- ❌ Specific keywords that were matched
- ❌ Geographic location beyond country level
- ❌ Device fingerprints or tracking IDs

---

## Why Client-Side Detection?

The crisis detection engine runs **100% in your browser**. Here's why:

1. **Privacy:** When you type something like "I want to end my life," that text **never leaves your device** during the detection phase.
2. **Precedent:** This follows the approach used by platforms like BetterHelp, which proved that client-side detection is both effective and privacy-preserving.
3. **Trust:** We believe that if you're in crisis, you shouldn't have to worry about your raw words being sent to a server.

The only data sent to our servers is:
- A **tier number** (1, 2, or 3)
- A **sanitized context summary** (e.g., "User expressed hopelessness" — NOT the actual text)
- Your **country code** (to show relevant crisis resources)

---

## External API Data Sharing

### ThroughLine Crisis Resource API
**What we send:** Country code only
**What we receive:** List of verified crisis helplines for that country
**User data shared:** Zero — ThroughLine never receives any user-identifiable information

### Anthropic Claude API (AI Companion)
**What we send:** Tier level + sanitized context summary + locale
**What we receive:** Empathetic AI-generated response
**User data shared:** Zero raw text — only anonymized tier context

---

## Encryption & Security

### Safety Plan Storage
- **Algorithm:** AES-256-GCM (industry standard)
- **Key derivation:** PBKDF2 with 100,000 iterations
- **Key storage:** User-derived from session token — **not stored in database**
- **Result:** Psychage cannot read your safety plan. Only you can decrypt it.

### Session Anonymization
- Session IDs are hashed with SHA-256 before storage
- Hashes are **one-way** — we cannot reverse them to identify users
- Session IDs rotate every 30 days

---

## Data Retention

| Data Type | Retention Period | Purpose |
|-----------|------------------|---------|
| Crisis events | 2 years | Aggregated impact reporting (anonymous) |
| Mood logs (anonymous) | 90 days | Pattern detection |
| Mood logs (authenticated) | 1 year | User-initiated deletion available anytime |
| Safety plans | Indefinite until user deletes | User-controlled storage |
| Resource cache | 24 hours | Performance optimization |

---

## Your Rights (GDPR & CCPA)

You have the right to:
- **Access** your data at any time via Settings → Privacy
- **Download** your mood logs and safety plan
- **Delete** all your data permanently (takes effect immediately)
- **Opt out** of mood tracking or crisis detection (Settings → Privacy)
- **Request a copy** of all data we have about you (contact: privacy@psychage.com)

---

## Data Deletion

### Immediate Deletion (User-Initiated)
- Safety plan deletion is **immediate and permanent**
- Mood log deletion is **immediate and permanent**
- Account deletion removes all associated data within 24 hours

### Cannot Be Deleted
- Anonymous crisis event logs (already anonymized, cannot be linked to you)

---

## Third-Party Access

**Who can access your data:**
- **Psychage engineers:** Can see anonymous crisis event logs (no user identity)
- **You:** Full access to your mood logs and safety plan
- **Nobody else:** Safety plans are encrypted end-to-end

**Who CANNOT access your data:**
- ThroughLine (only receives country code)
- Anthropic (only receives tier + sanitized context)
- Other users
- Advertisers (we don't have ads)
- Data brokers (we don't sell data)

---

## Changes to This Policy

We will notify you of any material changes to this privacy policy via:
1. Email (if you have an account)
2. In-app notification
3. Update to this document with a new "Last Updated" date

---

## Questions or Concerns?

If you have questions about how we handle crisis data, contact:
- **Email:** privacy@psychage.com
- **Subject line:** "Crisis System Privacy Question"

For urgent privacy concerns: **urgent-privacy@psychage.com**

---

## Technical Transparency

This system is built with the following principles:
1. **Minimize collection:** Only collect what's necessary for safety
2. **Anonymize by default:** De-identify before storage
3. **Encrypt sensitive data:** AES-256-GCM for safety plans
4. **Client-side first:** Detection runs in your browser
5. **Fail gracefully:** System works even if APIs are down (static fallbacks)

---

**Summary:** We collect the bare minimum needed to provide crisis support, we anonymize everything we can, we encrypt what we can't anonymize, and we give you full control over your data.

You're never just a data point to us. You're a person who deserves both support and privacy.
