/**
 * Toolkit Progress Service — local-first, consent-gated sync.
 *
 * Per-item progress (opened / completed / optional self-rating) is ALWAYS
 * written to the browser's localStorage. It is mirrored to Supabase ONLY when
 * the signed-in user has turned on the 'toolkit_progress_sync' consent
 * (reusing the existing consent framework — see consentService). With consent
 * off, or signed out, nothing leaves the client.
 *
 * SR-4: this path never touches Clarity Score / Symptom Navigator data.
 */

import { supabase } from '../lib/supabaseClient';
import { consentService } from './consentService';

export type SelfRating = 'a_little' | 'not_yet';

export interface ItemProgress {
    opened_at: string | null;
    completed_at: string | null;
    self_rating: SelfRating | null;
}

export type ProgressMap = Record<string, ItemProgress>;

export const EMPTY_PROGRESS: ItemProgress = {
    opened_at: null,
    completed_at: null,
    self_rating: null,
};

const STORAGE_KEY = 'psychage_toolkit_progress';

function readLocalAll(): ProgressMap {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? (JSON.parse(raw) as ProgressMap) : {};
    } catch {
        return {};
    }
}

function writeLocalAll(map: ProgressMap): void {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
    } catch {
        /* storage full / unavailable — progress is best-effort */
    }
}

export const toolkitProgressService = {
    /** Local progress for a set of item ids. */
    getLocal: (itemIds: string[]): ProgressMap => {
        const all = readLocalAll();
        const out: ProgressMap = {};
        for (const id of itemIds) {
            if (all[id]) out[id] = all[id] as ItemProgress;
        }
        return out;
    },

    /** Merge one item's progress into local storage, returning the new value. */
    setLocal: (itemId: string, progress: ItemProgress): void => {
        const all = readLocalAll();
        all[itemId] = progress;
        writeLocalAll(all);
    },

    /** Whether a user is currently signed in (sync requires an account). */
    isSignedIn: async (): Promise<boolean> => {
        const { data: { user } } = await supabase.auth.getUser();
        return !!user;
    },

    /** True only when signed in AND 'toolkit_progress_sync' consent is granted. */
    isSyncEnabled: async (): Promise<boolean> => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return false;
        return consentService.checkConsent('toolkit_progress_sync', user.id);
    },

    /** Pull the user's saved progress for one toolkit (only call when sync enabled). */
    fetchRemote: async (toolkitId: string): Promise<ProgressMap> => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return {};
        const { data, error } = await supabase
            .from('user_toolkit_progress')
            .select('item_id, opened_at, completed_at, self_rating')
            .eq('user_id', user.id)
            .eq('toolkit_id', toolkitId);

        if (error) {
            console.error('Error fetching toolkit progress:', error);
            return {};
        }
        const out: ProgressMap = {};
        for (const row of data ?? []) {
            out[row.item_id as string] = {
                opened_at: (row.opened_at as string | null) ?? null,
                completed_at: (row.completed_at as string | null) ?? null,
                self_rating: (row.self_rating as SelfRating | null) ?? null,
            };
        }
        return out;
    },

    /** Upsert one item's progress (only call when sync enabled). Best-effort. */
    upsertRemote: async (
        toolkitId: string,
        itemId: string,
        progress: ItemProgress,
        updatedAtIso: string,
    ): Promise<void> => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        const { error } = await supabase.from('user_toolkit_progress').upsert(
            {
                user_id: user.id,
                toolkit_id: toolkitId,
                item_id: itemId,
                opened_at: progress.opened_at,
                completed_at: progress.completed_at,
                self_rating: progress.self_rating,
                updated_at: updatedAtIso,
            },
            { onConflict: 'user_id,item_id' },
        );
        if (error) console.error('Error syncing toolkit progress:', error);
    },
};
