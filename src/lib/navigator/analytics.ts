// Navigator analytics tracking
// Privacy-safe: no raw symptom names, only counts and booleans
//
// DB schema (navigator_analytics table):
//   session_hash, event_type, domains_selected, symptoms_selected,
//   time_to_complete_seconds, results_shown, safety_flag_level, feedback_helpful

type NavigatorEventType = 'started' | 'completed' | 'crisis_triggered' | 'result_clicked' | 'provider_clicked';

interface NavigatorAnalyticsRow {
    session_hash: string;
    event_type: NavigatorEventType;
    domains_selected?: number;
    symptoms_selected?: number;
    time_to_complete_seconds?: number;
    results_shown?: number;
    safety_flag_level?: 'CRISIS' | 'URGENT' | 'WATCH' | null;
    feedback_helpful?: boolean | null;
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

    // Track flow completion
    trackComplete(
        domainsSelected: number,
        symptomsSelected: number,
        resultsShown: number,
        safetyFlagLevel?: 'CRISIS' | 'URGENT' | 'WATCH' | null
    ): void {
        const totalSeconds = Math.round((Date.now() - this.flowStartTime) / 1000);
        this.sendEvent({
            session_hash: this.sessionHash,
            event_type: 'completed',
            domains_selected: domainsSelected,
            symptoms_selected: symptomsSelected,
            time_to_complete_seconds: totalSeconds,
            results_shown: resultsShown,
            safety_flag_level: safetyFlagLevel ?? null,
        });
    }

    // Track crisis triggered
    trackCrisisTriggered(safetyFlagLevel: 'CRISIS' | 'URGENT' | 'WATCH'): void {
        this.sendEvent({
            session_hash: this.sessionHash,
            event_type: 'crisis_triggered',
            safety_flag_level: safetyFlagLevel,
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

    // Submit user feedback
    submitFeedback(helpful: boolean): void {
        this.sendEvent({
            session_hash: this.sessionHash,
            event_type: 'completed',
            feedback_helpful: helpful,
        });
    }

    // Send event to Supabase analytics table (fails silently — analytics must never block UX)
    private async sendEvent(row: NavigatorAnalyticsRow): Promise<void> {
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
