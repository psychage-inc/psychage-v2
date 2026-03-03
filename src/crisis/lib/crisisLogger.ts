/**
 * CRISIS EVENT LOGGER
 *
 * Anonymous event logging for impact tracking.
 * NEVER logs: raw text, IP addresses, user identity, specific keywords.
 * ONLY logs: tier, country code, timestamp, hashed session ID.
 *
 * Purpose: Measure system effectiveness and identify gaps in coverage.
 */

import type { CrisisEvent, CrisisTier } from '../types/crisis.types';

interface LogCrisisEventParams {
  tier: CrisisTier;
  countryCode: string;
  detectedLanguage: string;
  sessionId: string; // Will be hashed before storage
  throughlineResourceShown: boolean;
  emergencyModalDismissed?: boolean;
  dismissalPath?: 'called_help' | 'safe_now';
}

/**
 * Hash a session ID using SHA-256 (browser-native)
 */
async function hashSessionId(sessionId: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(sessionId);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Log a crisis event to Supabase (anonymous)
 */
export async function logCrisisEvent(params: LogCrisisEventParams): Promise<void> {
  try {
    const hashedSessionId = await hashSessionId(params.sessionId);

    const eventPayload = {
      tier: params.tier,
      country_code: params.countryCode,
      detected_language: params.detectedLanguage,
      session_id: hashedSessionId,
      throughline_resource_shown: params.throughlineResourceShown,
      emergency_modal_dismissed: params.emergencyModalDismissed,
      dismissal_path: params.dismissalPath,
    };

    // Send to /api/crisis-event endpoint
    await fetch('/api/crisis-event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventPayload),
    });

    // Log in development for debugging
    if (import.meta.env.DEV) {
      console.log('[Crisis Event Logged]', eventPayload);
    }
  } catch (error) {
    // Silent failure — logging must never break the crisis flow
    console.error('[Crisis Logger Error]', error);
  }
}

/**
 * Generate or retrieve session ID from sessionStorage
 */
export function getSessionId(): string {
  const key = 'psychage_crisis_session_id';
  let sessionId = sessionStorage.getItem(key);

  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem(key, sessionId);
  }

  return sessionId;
}
