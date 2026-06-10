
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { NavigatorAnalytics } from '../analytics';

const COOKIE_CONSENT_KEY = 'psychage_cookie_consent';

function grantAnalyticsConsent() {
    localStorage.setItem(
        COOKIE_CONSENT_KEY,
        JSON.stringify({ version: 'v1.0', preferences: { essential: true, analytics: true, marketing: false } })
    );
}

function denyAnalyticsConsent() {
    localStorage.setItem(
        COOKIE_CONSENT_KEY,
        JSON.stringify({ version: 'v1.0', preferences: { essential: true, analytics: false, marketing: false } })
    );
}

describe('NavigatorAnalytics', () => {
    let analytics: NavigatorAnalytics;
    const sessionHash = 'test-session-123';

    beforeEach(() => {
        vi.useFakeTimers();
        localStorage.clear();
        // Consent must be granted for any event to fire.
        grantAnalyticsConsent();
        // Constructor sends a 'started' event
        analytics = new NavigatorAnalytics(sessionHash);
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.useRealTimers();
        localStorage.clear();
    });

    it('sends started event on construction', () => {
        const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

        // Create a new instance to capture the started event
        new NavigatorAnalytics('new-session');

        expect(consoleSpy).toHaveBeenCalledWith(
            '[Navigator Analytics]',
            expect.objectContaining({
                session_hash: 'new-session',
                event_type: 'started',
            })
        );

        consoleSpy.mockRestore();
    });

    it('tracks flow completion with domain, symptom, and result counts', () => {
        const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

        analytics.trackComplete(3, 5, 4);

        expect(consoleSpy).toHaveBeenCalledWith(
            '[Navigator Analytics]',
            expect.objectContaining({
                event_type: 'completed',
                session_hash: sessionHash,
                domains_selected: 3,
                symptoms_selected: 5,
                results_shown: 4,
            })
        );

        consoleSpy.mockRestore();
    });

    it('includes time_to_complete_seconds in completion event', () => {
        const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

        vi.advanceTimersByTime(10000); // 10 seconds
        analytics.trackComplete(1, 2, 3);

        expect(consoleSpy).toHaveBeenCalledWith(
            '[Navigator Analytics]',
            expect.objectContaining({
                time_to_complete_seconds: 10,
            })
        );

        consoleSpy.mockRestore();
    });

    it('tracks result click event', () => {
        const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

        analytics.trackResultClicked();

        expect(consoleSpy).toHaveBeenCalledWith(
            '[Navigator Analytics]',
            expect.objectContaining({
                event_type: 'result_clicked',
                session_hash: sessionHash,
            })
        );

        consoleSpy.mockRestore();
    });

    it('tracks provider click event', () => {
        const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

        analytics.trackProviderClicked();

        expect(consoleSpy).toHaveBeenCalledWith(
            '[Navigator Analytics]',
            expect.objectContaining({
                event_type: 'provider_clicked',
                session_hash: sessionHash,
            })
        );

        consoleSpy.mockRestore();
    });

    it('never emits a crisis/safety event type', () => {
        const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

        analytics.trackComplete(3, 5, 4);
        analytics.trackResultClicked();
        analytics.trackProviderClicked();

        for (const call of consoleSpy.mock.calls) {
            const row = call[1] as Record<string, unknown>;
            expect(row.event_type).not.toBe('crisis_triggered');
            expect(row).not.toHaveProperty('safety_flag_level');
        }

        consoleSpy.mockRestore();
    });

    it('sends no PII — only counts and the session hash', () => {
        const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

        analytics.trackComplete(3, 5, 4);

        const eventData = consoleSpy.mock.calls[0]?.[1] as Record<string, unknown>;

        // Verify NO symptom IDs, NO condition IDs, NO user identifiers, NO safety inference
        expect(eventData).not.toHaveProperty('symptom_ids');
        expect(eventData).not.toHaveProperty('condition_ids');
        expect(eventData).not.toHaveProperty('user_id');
        expect(eventData).not.toHaveProperty('email');
        expect(eventData).not.toHaveProperty('safety_flag_level');

        // Verify only safe fields
        const allowedKeys = new Set([
            'session_hash', 'event_type', 'domains_selected', 'symptoms_selected',
            'time_to_complete_seconds', 'results_shown'
        ]);
        for (const key of Object.keys(eventData)) {
            expect(allowedKeys.has(key)).toBe(true);
        }

        consoleSpy.mockRestore();
    });

    describe('consent gating', () => {
        it('sends NO event when analytics consent is not granted', () => {
            localStorage.clear();
            denyAnalyticsConsent();
            const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

            // Construction (started) + explicit events must all be suppressed.
            const gated = new NavigatorAnalytics('no-consent-session');
            gated.trackComplete(1, 2, 3);
            gated.trackResultClicked();
            gated.trackProviderClicked();

            expect(consoleSpy).not.toHaveBeenCalled();

            consoleSpy.mockRestore();
        });

        it('sends NO event when no consent record exists at all', () => {
            localStorage.clear();
            const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

            const gated = new NavigatorAnalytics('absent-consent-session');
            gated.trackComplete(1, 2, 3);

            expect(consoleSpy).not.toHaveBeenCalled();

            consoleSpy.mockRestore();
        });
    });
});
