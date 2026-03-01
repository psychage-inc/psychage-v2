// Navigator analytics tracking
// Privacy-safe: no raw symptom names, only counts and IDs

interface NavigatorAnalyticsEvent {
    event_type: 'navigator_step_view' | 'navigator_step_duration' | 'navigator_complete' | 'navigator_abandoned';
    step_id?: string;
    step_name?: string;
    session_id: string;
    flow_id: string;
    timestamp: number;
    duration_seconds?: number;
    symptom_count?: number;
    condition_results_count?: number;
}

// Module-level step timing storage
const stepEnterTimes = new Map<string, number>();

export class NavigatorAnalytics {
    private sessionId: string;
    private flowId: string;
    private flowStartTime: number;

    constructor(sessionId: string, flowId: string) {
        this.sessionId = sessionId;
        this.flowId = flowId;
        this.flowStartTime = Date.now();
    }

    // Track step entry
    trackStepView(stepId: string, stepName: string): void {
        const timestamp = Date.now();
        stepEnterTimes.set(stepId, timestamp);

        this.sendEvent({
            event_type: 'navigator_step_view',
            step_id: stepId,
            step_name: stepName,
            session_id: this.sessionId,
            flow_id: this.flowId,
            timestamp,
        });
    }

    // Track step exit (compute duration)
    trackStepExit(stepId: string): void {
        const enterTime = stepEnterTimes.get(stepId);
        if (enterTime) {
            const duration_seconds = Math.round((Date.now() - enterTime) / 1000);
            this.sendEvent({
                event_type: 'navigator_step_duration',
                step_id: stepId,
                session_id: this.sessionId,
                flow_id: this.flowId,
                timestamp: Date.now(),
                duration_seconds,
            });
            stepEnterTimes.delete(stepId);
        }
    }

    // Track flow completion
    trackComplete(symptomCount: number, conditionResultsCount: number): void {
        const totalDuration = Math.round((Date.now() - this.flowStartTime) / 1000);
        this.sendEvent({
            event_type: 'navigator_complete',
            session_id: this.sessionId,
            flow_id: this.flowId,
            timestamp: Date.now(),
            duration_seconds: totalDuration,
            symptom_count: symptomCount,
            condition_results_count: conditionResultsCount,
        });
    }

    // Track abandonment
    trackAbandoned(lastStep: string): void {
        const totalDuration = Math.round((Date.now() - this.flowStartTime) / 1000);
        this.sendEvent({
            event_type: 'navigator_abandoned',
            step_id: lastStep,
            session_id: this.sessionId,
            flow_id: this.flowId,
            timestamp: Date.now(),
            duration_seconds: totalDuration,
        });
    }

    // Send event (stub - integrate with actual analytics backend)
    private sendEvent(event: NavigatorAnalyticsEvent): void {
        // TODO: Integrate with Supabase analytics table or external service
        // For now, log to console in dev mode
        if (import.meta.env.DEV) {
            console.log('[Navigator Analytics]', event);
        }

        // In production, send to analytics endpoint:
        // fetch('/api/analytics/navigator', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(event),
        // }).catch(() => {
        //     // Silent fail - analytics should not block UX
        // });
    }
}
