
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { NavigatorAnalytics } from '../analytics';

describe('NavigatorAnalytics', () => {
    let analytics: NavigatorAnalytics;
    const sessionHash = 'test-session-123';

    beforeEach(() => {
        vi.useFakeTimers();
        // Constructor sends a 'started' event
        analytics = new NavigatorAnalytics(sessionHash);
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.useRealTimers();
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

        analytics.trackComplete(3, 5, 4, null);

        expect(consoleSpy).toHaveBeenCalledWith(
            '[Navigator Analytics]',
            expect.objectContaining({
                event_type: 'completed',
                session_hash: sessionHash,
                domains_selected: 3,
                symptoms_selected: 5,
                results_shown: 4,
                safety_flag_level: null,
            })
        );

        consoleSpy.mockRestore();
    });

    it('tracks completion with safety flag level', () => {
        const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

        analytics.trackComplete(2, 3, 1, 'CRISIS');

        expect(consoleSpy).toHaveBeenCalledWith(
            '[Navigator Analytics]',
            expect.objectContaining({
                event_type: 'completed',
                safety_flag_level: 'CRISIS',
            })
        );

        consoleSpy.mockRestore();
    });

    it('includes time_to_complete_seconds in completion event', () => {
        const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

        vi.advanceTimersByTime(10000); // 10 seconds
        analytics.trackComplete(1, 2, 3, null);

        expect(consoleSpy).toHaveBeenCalledWith(
            '[Navigator Analytics]',
            expect.objectContaining({
                time_to_complete_seconds: 10,
            })
        );

        consoleSpy.mockRestore();
    });

    it('tracks crisis triggered event', () => {
        const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

        analytics.trackCrisisTriggered('URGENT');

        expect(consoleSpy).toHaveBeenCalledWith(
            '[Navigator Analytics]',
            expect.objectContaining({
                event_type: 'crisis_triggered',
                session_hash: sessionHash,
                safety_flag_level: 'URGENT',
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

    it('submits feedback', () => {
        const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

        analytics.submitFeedback(true);

        expect(consoleSpy).toHaveBeenCalledWith(
            '[Navigator Analytics]',
            expect.objectContaining({
                event_type: 'completed',
                feedback_helpful: true,
            })
        );

        consoleSpy.mockRestore();
    });

    it('sends no PII — only counts and booleans', () => {
        const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

        analytics.trackComplete(3, 5, 4, 'WATCH');

        const eventData = consoleSpy.mock.calls[0]?.[1] as Record<string, unknown>;

        // Verify NO symptom IDs, NO condition IDs, NO user identifiers
        expect(eventData).not.toHaveProperty('symptom_ids');
        expect(eventData).not.toHaveProperty('condition_ids');
        expect(eventData).not.toHaveProperty('user_id');
        expect(eventData).not.toHaveProperty('email');

        // Verify only safe fields
        const allowedKeys = new Set([
            'session_hash', 'event_type', 'domains_selected', 'symptoms_selected',
            'time_to_complete_seconds', 'results_shown', 'safety_flag_level', 'feedback_helpful'
        ]);
        for (const key of Object.keys(eventData)) {
            expect(allowedKeys.has(key)).toBe(true);
        }

        consoleSpy.mockRestore();
    });
});
