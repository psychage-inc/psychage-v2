/**
 * Alert Service — client-side wellness trend analysis
 *
 * Detects declining mood and clarity trends and generates
 * non-alarmist wellness alerts for the user dashboard.
 */

import { moodService, type MoodEntry } from './moodService';
import { clarityScoreService } from './clarityScoreService';

export interface WellnessAlert {
    id: string;
    type: 'mood_decline' | 'clarity_decline' | 'low_activity';
    severity: 'info' | 'warning';
    title: string;
    message: string;
    actionLabel?: string;
    actionPath?: string;
}

export const alertService = {
    /**
     * Check for mood decline: compare last 7 days average vs previous 7 days.
     * Flags if average drops by more than 1.5 points.
     */
    checkMoodDecline: async (userId: string): Promise<WellnessAlert | null> => {
        try {
            const entries = await moodService.getEntries(userId, 60);
            if (entries.length < 5) return null; // Not enough data

            const now = new Date();
            const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

            const recentEntries = entries.filter(e => new Date(e.created_at) >= sevenDaysAgo);
            const previousEntries = entries.filter(e => {
                const d = new Date(e.created_at);
                return d >= fourteenDaysAgo && d < sevenDaysAgo;
            });

            if (recentEntries.length < 3 || previousEntries.length < 3) return null;

            const recentAvg = average(recentEntries.map(e => e.value));
            const previousAvg = average(previousEntries.map(e => e.value));
            const decline = previousAvg - recentAvg;

            if (decline >= 1.5) {
                return {
                    id: 'mood_decline',
                    type: 'mood_decline',
                    severity: decline >= 2.5 ? 'warning' : 'info',
                    title: 'Mood trend update',
                    message: `Your mood has been trending lower this week compared to last week. This is normal and can happen for many reasons. Consider checking in with your journal or reaching out to someone you trust.`,
                    actionLabel: 'Open Mood Journal',
                    actionPath: '/tools/mood-journal',
                };
            }

            return null;
        } catch {
            return null;
        }
    },

    /**
     * Check for Clarity Score decline: flag if latest score drops >15 from previous.
     */
    checkClarityDecline: async (): Promise<WellnessAlert | null> => {
        try {
            const history = await clarityScoreService.getHistory(5);
            if (history.length < 2) return null;

            const latest = history[0];
            const previous = history[1];
            const decline = previous.score - latest.score;

            if (decline >= 15) {
                return {
                    id: 'clarity_decline',
                    type: 'clarity_decline',
                    severity: decline >= 25 ? 'warning' : 'info',
                    title: 'Clarity Score change',
                    message: `Your latest Clarity Score (${latest.score}) is lower than your previous score (${previous.score}). Scores naturally fluctuate — this is a snapshot, not a diagnosis. Consider exploring the dimensions that changed most.`,
                    actionLabel: 'View Clarity Score',
                    actionPath: '/clarity-score',
                };
            }

            return null;
        } catch {
            return null;
        }
    },

    /**
     * Aggregate all active alerts for the dashboard.
     */
    getDashboardAlerts: async (userId: string): Promise<WellnessAlert[]> => {
        const [moodAlert, clarityAlert] = await Promise.all([
            alertService.checkMoodDecline(userId),
            alertService.checkClarityDecline(),
        ]);

        const alerts: WellnessAlert[] = [];
        if (moodAlert) alerts.push(moodAlert);
        if (clarityAlert) alerts.push(clarityAlert);

        return alerts;
    },
};

function average(nums: number[]): number {
    if (nums.length === 0) return 0;
    return nums.reduce((a, b) => a + b, 0) / nums.length;
}
