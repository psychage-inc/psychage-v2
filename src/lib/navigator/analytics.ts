// Navigator analytics tracking
// Privacy-safe: no raw symptom names, only counts and booleans.
//
// Minimized per audit C-1/B2-6: no crisis/safety-flag inference ever leaves the
// device, and every event is gated on BOTH the analytics feature flag and the
// user's cookie-analytics consent.
//
// DB schema (navigator_analytics table):
//   session_hash, event_type, domains_selected, symptoms_selected,
//   time_to_complete_seconds, results_shown

import { navigatorConfig } from './config';

type NavigatorEventType = 'started' | 'completed' | 'result_clicked' | 'provider_clicked';

interface NavigatorAnalyticsRow {
    session_hash: string;
    event_type: NavigatorEventType;
    domains_selected?: number;
    symptoms_selected?: number;
    time_to_complete_seconds?: number;
    results_shown?: number;
}

// Cookie-consent key written by src/components/ui/CookieConsent.tsx.
const COOKIE_CONSENT_KEY = 'psychage_cookie_consent';

/**
 * Synchronous read of the user's analytics-cookie consent. Privacy-safe default:
 * returns false unless the user has explicitly granted analytics consent.
 */
function hasAnalyticsConsent(): boolean {
    try {
        const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
        if (!stored) return false;
        const parsed = JSON.parse(stored);
        return parsed?.preferences?.analytics === true;
    } catch {
        return false;
    }
}

export class NavigatorAnalytics {
    private sessionHash: string;
    private flowStartTime: number;

    constructor(sessionHash: string) {
        this.sessionHash = sessionHash;
        this.flowStartTime = Date.now();

        // Record flow start
        this.sendEvent({
            session_hash: this.sessionHash,
            event_type: 'started',
        });
    }

    // Track flow completion (counts and timing only — no safety inference)
    trackComplete(
        domainsSelected: number,
        symptomsSelected: number,
        resultsShown: number
    ): void {
        const totalSeconds = Math.round((Date.now() - this.flowStartTime) / 1000);
        this.sendEvent({
            session_hash: this.sessionHash,
            event_type: 'completed',
            domains_selected: domainsSelected,
            symptoms_selected: symptomsSelected,
            time_to_complete_seconds: totalSeconds,
            results_shown: resultsShown,
        });
    }

    // Track result click
    trackResultClicked(): void {
        this.sendEvent({
            session_hash: this.sessionHash,
            event_type: 'result_clicked',
        });
    }

    // Track provider click from results
    trackProviderClicked(): void {
        this.sendEvent({
            session_hash: this.sessionHash,
            event_type: 'provider_clicked',
        });
    }

    // Send event to Supabase analytics table.
    // Gated on the analytics flag AND cookie-analytics consent; fails silently
    // (analytics must never block UX).
    private async sendEvent(row: NavigatorAnalyticsRow): Promise<void> {
        if (!navigatorConfig.enableAnalytics || !hasAnalyticsConsent()) {
            return; // analytics disabled or consent not granted — never send
        }

        if (import.meta.env.DEV) {
            console.log('[Navigator Analytics]', row);
        }

        try {
            const { supabase } = await import('../../lib/supabaseClient');
            await supabase.from('navigator_analytics').insert(row);
        } catch {
            // Silent fail — analytics should never block UX
        }
    }
}
