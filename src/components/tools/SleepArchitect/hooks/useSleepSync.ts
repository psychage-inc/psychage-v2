/**
 * Sleep Sync Hook — Bidirectional localStorage <-> Supabase sync.
 *
 * Sync triggers:
 * 1. On entry changes (when authenticated) → background upsert
 * 2. On login (auth state changes) → full merge
 * 3. On mount (if authenticated) → lightweight recent sync
 * 4. On online/visibilitychange → flush pending queue
 */

import { useEffect, useRef, useCallback, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { sleepDiaryService } from '@/services/sleepDiaryService';
import type { SleepEntry, SyncStatus } from '@/lib/sleep/types';

const PENDING_KEY = 'psychage_sleep_pending_sync';
const PENDING_DELETE_KEY = 'psychage_sleep_pending_deletes';
const BACKUP_KEY = 'psychage_sleep_backup';
const MAX_PENDING = 200;

function getPendingSync(): string[] {
  try {
    const raw = localStorage.getItem(PENDING_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function setPendingSync(ids: string[]): void {
  try {
    localStorage.setItem(PENDING_KEY, JSON.stringify(ids.slice(-MAX_PENDING)));
  } catch { /* ignore */ }
}

function getPendingDeletes(): string[] {
  try {
    const raw = localStorage.getItem(PENDING_DELETE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function setPendingDeletes(dates: string[]): void {
  try {
    localStorage.setItem(PENDING_DELETE_KEY, JSON.stringify(dates));
  } catch { /* ignore */ }
}

function backupEntries(entries: SleepEntry[]): void {
  try {
    localStorage.setItem(BACKUP_KEY, JSON.stringify(entries));
  } catch { /* ignore */ }
}

interface UseSleepSyncOptions {
  entries: SleepEntry[];
  setEntries: (entries: SleepEntry[]) => void;
}

interface UseSleepSyncReturn {
  syncStatus: SyncStatus;
  syncedCount: number;
  triggerSync: () => Promise<void>;
  backgroundUpsert: (entry: SleepEntry) => void;
  backgroundDelete: (date: string) => void;
}

export function useSleepSync({
  entries,
  setEntries,
}: UseSleepSyncOptions): UseSleepSyncReturn {
  const { user, isAuthenticated } = useAuth();
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle');
  const [syncedCount, setSyncedCount] = useState(0);
  const merging = useRef(false);
  const prevAuth = useRef(isAuthenticated);

  // ── Full merge (on login) ──────────────────────────────────────────────
  const fullMerge = useCallback(async () => {
    if (!user?.id || merging.current) return;
    merging.current = true;
    setSyncStatus('syncing');

    try {
      // Backup current localStorage entries
      backupEntries(entries);

      // Fetch all remote entries
      const remoteEntries = await sleepDiaryService.getEntries(user.id);
      const localMap = new Map(entries.map((e) => [e.date, e]));
      const remoteMap = new Map(remoteEntries.map((e) => [e.date, e]));

      const merged: SleepEntry[] = [];
      const toUpload: SleepEntry[] = [];
      const allDates = new Set([...localMap.keys(), ...remoteMap.keys()]);

      for (const date of allDates) {
        const local = localMap.get(date);
        const remote = remoteMap.get(date);

        if (local && remote) {
          // Both exist — newer wins
          const localTime = new Date(local.updated_at || local.created_at).getTime();
          const remoteTime = new Date(remote.updated_at || remote.created_at).getTime();
          if (localTime >= remoteTime) {
            merged.push(local);
            toUpload.push(local);
          } else {
            merged.push(remote);
          }
        } else if (local) {
          // Only local — upload to remote
          merged.push(local);
          toUpload.push(local);
        } else if (remote) {
          // Only remote — add to local
          merged.push(remote);
        }
      }

      // Process pending deletes
      const pendingDeletes = getPendingDeletes();
      for (const date of pendingDeletes) {
        await sleepDiaryService.deleteEntry(user.id, date);
      }
      setPendingDeletes([]);

      // Upload local-only entries to Supabase
      if (toUpload.length > 0) {
        await sleepDiaryService.upsertEntries(user.id, toUpload);
      }

      // Update localStorage with merged data
      setEntries(merged.sort((a, b) => a.date.localeCompare(b.date)));
      setPendingSync([]);
      setSyncedCount(remoteEntries.length);
      setSyncStatus('synced');
    } catch (error) {
      console.error('Sleep sync merge failed:', error);
      setSyncStatus('error');
    } finally {
      merging.current = false;
    }
  }, [user?.id, entries, setEntries]);

  // ── Detect login (auth state change) ───────────────────────────────────
  useEffect(() => {
    if (isAuthenticated && !prevAuth.current) {
      // Just logged in — trigger full merge
      fullMerge();
    }
    prevAuth.current = isAuthenticated;
  }, [isAuthenticated, fullMerge]);

  // ── On mount: lightweight sync if already authenticated ────────────────
  useEffect(() => {
    if (isAuthenticated && user?.id) {
      // Flush any pending items from a previous session
      const pending = getPendingSync();
      if (pending.length > 0) {
        flushPending();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Flush pending queue ────────────────────────────────────────────────
  const flushPending = useCallback(async () => {
    if (!user?.id || !isAuthenticated) return;

    const pendingIds = getPendingSync();
    if (pendingIds.length === 0) return;

    const pendingEntries = entries.filter((e) => pendingIds.includes(e.id));
    if (pendingEntries.length > 0) {
      const count = await sleepDiaryService.upsertEntries(
        user.id,
        pendingEntries
      );
      if (count > 0) {
        setPendingSync(
          pendingIds.filter(
            (id) => !pendingEntries.find((e) => e.id === id)
          )
        );
      }
    }

    // Flush pending deletes
    const pendingDeletes = getPendingDeletes();
    for (const date of pendingDeletes) {
      await sleepDiaryService.deleteEntry(user.id, date);
    }
    setPendingDeletes([]);
  }, [user?.id, isAuthenticated, entries]);

  // ── Online / visibility listeners ──────────────────────────────────────
  useEffect(() => {
    const handleOnline = () => {
      if (isAuthenticated) flushPending();
    };
    const handleVisibility = () => {
      if (document.visibilityState === 'visible' && isAuthenticated) {
        flushPending();
      }
    };

    window.addEventListener('online', handleOnline);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      window.removeEventListener('online', handleOnline);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [isAuthenticated, flushPending]);

  // ── Background upsert (fire-and-forget on entry change) ───────────────
  const backgroundUpsert = useCallback(
    (entry: SleepEntry) => {
      if (!user?.id || !isAuthenticated) {
        // Queue for later
        const pending = getPendingSync();
        if (!pending.includes(entry.id)) {
          setPendingSync([...pending, entry.id]);
        }
        return;
      }

      sleepDiaryService.upsertEntry(user.id, entry).catch(() => {
        // Failed — add to pending queue
        const pending = getPendingSync();
        if (!pending.includes(entry.id)) {
          setPendingSync([...pending, entry.id]);
        }
      });
    },
    [user?.id, isAuthenticated]
  );

  // ── Background delete ─────────────────────────────────────────────────
  const backgroundDelete = useCallback(
    (date: string) => {
      if (!user?.id || !isAuthenticated) {
        const pending = getPendingDeletes();
        if (!pending.includes(date)) {
          setPendingDeletes([...pending, date]);
        }
        return;
      }

      sleepDiaryService.deleteEntry(user.id, date).catch(() => {
        const pending = getPendingDeletes();
        if (!pending.includes(date)) {
          setPendingDeletes([...pending, date]);
        }
      });
    },
    [user?.id, isAuthenticated]
  );

  return {
    syncStatus,
    syncedCount,
    triggerSync: fullMerge,
    backgroundUpsert,
    backgroundDelete,
  };
}
