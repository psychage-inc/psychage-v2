import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { NavigatorAnalytics } from '../analytics';

describe('NavigatorAnalytics', () => {
    let analytics: NavigatorAnalytics;
    const sessionId = 'test-session-123';
    const flowId = 'test-flow-456';

    beforeEach(() => {
        vi.useFakeTimers();
        analytics = new NavigatorAnalytics(sessionId, flowId);
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('tracks step view with correct data', () => {
        const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

        analytics.trackStepView('symptoms', 'Symptom Selection');

        expect(consoleSpy).toHaveBeenCalledWith(
            '[Navigator Analytics]',
            expect.objectContaining({
                event_type: 'navigator_step_view',
                step_id: 'symptoms',
                step_name: 'Symptom Selection',
                session_id: sessionId,
                flow_id: flowId,
            })
        );

        consoleSpy.mockRestore();
    });

    it('tracks step duration when step is exited', () => {
        const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

        // Enter step
        analytics.trackStepView('symptoms', 'Symptom Selection');

        // Simulate some time passing
        vi.advanceTimersByTime(5000);

        // Exit step
        analytics.trackStepExit('symptoms');

        expect(consoleSpy).toHaveBeenCalledWith(
            '[Navigator Analytics]',
            expect.objectContaining({
                event_type: 'navigator_step_duration',
                step_id: 'symptoms',
                duration_seconds: expect.any(Number),
            })
        );

        consoleSpy.mockRestore();
    });

    it('tracks flow completion with symptom and result counts', () => {
        const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

        analytics.trackComplete(5, 3);

        expect(consoleSpy).toHaveBeenCalledWith(
            '[Navigator Analytics]',
            expect.objectContaining({
                event_type: 'navigator_complete',
                symptom_count: 5,
                condition_results_count: 3,
                session_id: sessionId,
                flow_id: flowId,
            })
        );

        consoleSpy.mockRestore();
    });

    it('tracks flow abandonment with last step', () => {
        const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

        analytics.trackAbandoned('symptoms');

        expect(consoleSpy).toHaveBeenCalledWith(
            '[Navigator Analytics]',
            expect.objectContaining({
                event_type: 'navigator_abandoned',
                step_id: 'symptoms',
                session_id: sessionId,
                flow_id: flowId,
            })
        );

        consoleSpy.mockRestore();
    });

    it('includes timestamp in all events', () => {
        const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

        analytics.trackStepView('symptoms', 'Symptom Selection');

        expect(consoleSpy).toHaveBeenCalledWith(
            '[Navigator Analytics]',
            expect.objectContaining({
                timestamp: expect.any(Number),
            })
        );

        consoleSpy.mockRestore();
    });

    it('does not track duration if step was never entered', () => {
        const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

        // Exit a step that was never entered
        analytics.trackStepExit('details');

        // Should not log a duration event
        expect(consoleSpy).not.toHaveBeenCalledWith(
            '[Navigator Analytics]',
            expect.objectContaining({
                event_type: 'navigator_step_duration',
            })
        );

        consoleSpy.mockRestore();
    });
});
