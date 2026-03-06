/**
 * Clarity Score Service — Supabase persistence for Clarity Score history
 *
 * Enables authenticated users to save and track their scores over time.
 * localStorage remains the primary for anonymous users.
 */

import { supabase } from '../lib/supabaseClient';
import type { ClarityScoreResult, ClarityHistoryItem } from '../lib/clarity/types';

const HISTORY_KEY = 'psychage_clarity_history';

interface ClarityScoreRow {
    id: string;
    user_id: string;
    total_score: number;
    label: string;
    tier: string;
    domain_scores: Record<string, number>;
    sub_scores: Record<string, number>;
    flags: string[];
    strengths: string[];
    growth_areas: string[];
    raw_answers: Record<string, number>;
    created_at: string;
}

export const clarityScoreService = {
    /**
     * Save a Clarity Score result to Supabase and localStorage.
     */
    saveResult: async (
        result: ClarityScoreResult,
        answers: Record<string, number>
    ): Promise<{ success: boolean; id?: string }> => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return { success: false };

            const { data, error } = await supabase
                .from('clarity_score_history')
                .insert({
                    user_id: user.id,
                    total_score: result.totalScore,
                    label: result.label,
                    tier: result.tier,
                    domain_scores: result.domainScores,
                    sub_scores: result.subScores,
                    flags: result.flags,
                    strengths: result.strengths,
                    growth_areas: result.growthAreas,
                    raw_answers: answers,
                })
                .select('id')
                .single();

            if (error) {
                console.error('Error saving clarity score:', error);
                return { success: false };
            }

            // Also write to localStorage for offline access
            saveToLocalHistory({
                id: data.id,
                date: new Date().toISOString(),
                score: result.totalScore,
                label: result.label,
                domainScores: result.domainScores,
            });

            return { success: true, id: data.id };
        } catch (error) {
            console.error('Failed to save clarity score:', error);
            return { success: false };
        }
    },

    /**
     * Get clarity score history from Supabase (with localStorage fallback).
     */
    getHistory: async (limit = 50): Promise<ClarityHistoryItem[]> => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                return getLocalHistory();
            }

            const { data, error } = await supabase
                .from('clarity_score_history')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })
                .limit(limit);

            if (error) {
                console.error('Error fetching clarity history:', error);
                return getLocalHistory();
            }

            const serverItems: ClarityHistoryItem[] = (data as ClarityScoreRow[]).map(row => ({
                id: row.id,
                date: row.created_at,
                score: row.total_score,
                label: row.label,
                domainScores: row.domain_scores as unknown as ClarityHistoryItem['domainScores'],
            }));

            // Merge with any localStorage items not on server (dedup by date proximity)
            const localItems = getLocalHistory();
            const merged = mergeHistories(serverItems, localItems);

            return merged;
        } catch (error) {
            console.error('Failed to fetch clarity history:', error);
            return getLocalHistory();
        }
    },

    /**
     * Get the most recent clarity score.
     */
    getLatest: async (): Promise<ClarityHistoryItem | null> => {
        const history = await clarityScoreService.getHistory(1);
        return history[0] ?? null;
    },
};

// ============================================================================
// localStorage Helpers
// ============================================================================

function getLocalHistory(): ClarityHistoryItem[] {
    try {
        const stored = localStorage.getItem(HISTORY_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed)) return parsed;
        }
    } catch {
        // Ignore parse errors
    }
    return [];
}

function saveToLocalHistory(item: ClarityHistoryItem): void {
    try {
        const history = getLocalHistory();
        history.unshift(item);
        localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 100)));
    } catch {
        // QuotaExceededError — degrade gracefully
    }
}

/**
 * Merge server and local histories, deduplicating entries
 * within 60 seconds of each other with the same score.
 */
function mergeHistories(
    server: ClarityHistoryItem[],
    local: ClarityHistoryItem[]
): ClarityHistoryItem[] {
    const serverDates = new Set(server.map(s => s.date));
    const unique = local.filter(l => {
        // Check if any server item is within 60s and same score
        return !server.some(s => {
            const timeDiff = Math.abs(new Date(s.date).getTime() - new Date(l.date).getTime());
            return timeDiff < 60000 && s.score === l.score;
        }) && !serverDates.has(l.date);
    });

    return [...server, ...unique].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}
