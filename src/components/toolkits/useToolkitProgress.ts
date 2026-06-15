import { useCallback, useEffect, useMemo, useState } from 'react';
import { consentService } from '@/services/consentService';
import {
    EMPTY_PROGRESS,
    toolkitProgressService,
    type ItemProgress,
    type ProgressMap,
    type SelfRating,
} from '@/services/toolkitProgressService';
import type { ToolkitItem } from '@/services/toolkitService';

/**
 * Local-first progress for a toolkit's items. Reads localStorage immediately,
 * then (only if cloud-sync consent is on) merges the user's synced rows.
 * Mutations write local first and mirror to Supabase when sync is enabled.
 */
export function useToolkitProgress(toolkitId: string | undefined, items: ToolkitItem[]) {
    const itemIds = useMemo(() => items.map((i) => i.id), [items]);
    const [progress, setProgress] = useState<ProgressMap>({});
    const [syncEnabled, setSyncEnabled] = useState(false);
    const [signedIn, setSignedIn] = useState(false);

    useEffect(() => {
        let active = true;
        // Local first — instant, works signed-out.
        setProgress(toolkitProgressService.getLocal(itemIds));

        (async () => {
            const isIn = await toolkitProgressService.isSignedIn();
            if (!active) return;
            setSignedIn(isIn);
            const enabled = await toolkitProgressService.isSyncEnabled();
            if (!active) return;
            setSyncEnabled(enabled);
            if (enabled && toolkitId) {
                const remote = await toolkitProgressService.fetchRemote(toolkitId);
                if (!active) return;
                // Remote is the durable copy when consent is on — it wins.
                setProgress((local) => ({ ...local, ...remote }));
            }
        })();

        return () => {
            active = false;
        };
        // itemIds identity changes when the item set changes.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toolkitId, itemIds.join(',')]);

    const mutate = useCallback(
        (itemId: string, patch: Partial<ItemProgress>) => {
            setProgress((prev) => {
                const next: ItemProgress = { ...EMPTY_PROGRESS, ...prev[itemId], ...patch };
                const updated = { ...prev, [itemId]: next };
                toolkitProgressService.setLocal(itemId, next);
                if (syncEnabled && toolkitId) {
                    void toolkitProgressService.upsertRemote(
                        toolkitId,
                        itemId,
                        next,
                        new Date().toISOString(),
                    );
                }
                return updated;
            });
        },
        [syncEnabled, toolkitId],
    );

    const markOpened = useCallback(
        (itemId: string) => {
            if (progress[itemId]?.opened_at) return; // already recorded
            mutate(itemId, { opened_at: new Date().toISOString() });
        },
        [mutate, progress],
    );

    const toggleDone = useCallback(
        (itemId: string) => {
            const done = !!progress[itemId]?.completed_at;
            mutate(itemId, { completed_at: done ? null : new Date().toISOString() });
        },
        [mutate, progress],
    );

    const setRating = useCallback(
        (itemId: string, rating: SelfRating) => {
            const current = progress[itemId]?.self_rating;
            mutate(itemId, { self_rating: current === rating ? null : rating });
        },
        [mutate, progress],
    );

    // Grant/revoke cloud-sync consent. Turning it on pushes whatever is already
    // local up to the account, then merges the durable copy back.
    const setSyncConsent = useCallback(
        async (on: boolean) => {
            await consentService.logConsent('toolkit_progress_sync', on);
            setSyncEnabled(on);
            if (on && toolkitId) {
                const nowIso = new Date().toISOString();
                await Promise.all(
                    Object.entries(progress).map(([itemId, p]) =>
                        toolkitProgressService.upsertRemote(toolkitId, itemId, p, nowIso),
                    ),
                );
                const remote = await toolkitProgressService.fetchRemote(toolkitId);
                setProgress((local) => ({ ...local, ...remote }));
            }
        },
        [toolkitId, progress],
    );

    return { progress, markOpened, toggleDone, setRating, syncEnabled, signedIn, setSyncConsent };
}
