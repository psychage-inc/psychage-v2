/**
 * SyncBanner — Ambient "sign in to sync" banner.
 * Level 1 auth prompt: subtle, dismissible, non-blocking.
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cloud, X, Loader2, Check, WifiOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { SyncStatus } from '@/lib/sleep/types';

interface SyncBannerProps {
  isAuthenticated: boolean;
  syncStatus: SyncStatus;
  syncedCount: number;
  onSignIn: () => void;
}

const DISMISS_KEY = 'psychage_sleep_sync_banner_dismissed';
const DISMISS_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

const SyncBanner: React.FC<SyncBannerProps> = ({
  isAuthenticated,
  syncStatus,
  syncedCount,
  onSignIn,
}) => {
  const [dismissed, setDismissed] = useState(() => {
    try {
      const ts = localStorage.getItem(DISMISS_KEY);
      if (!ts) return false;
      return Date.now() - parseInt(ts) < DISMISS_DURATION;
    } catch {
      return false;
    }
  });

  const handleDismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem(DISMISS_KEY, Date.now().toString());
    } catch { /* ignore */ }
  };

  // Show sync status when authenticated
  if (isAuthenticated) {
    if (syncStatus === 'syncing') {
      return (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="flex items-center gap-2 bg-sky-50 dark:bg-sky-900/20 border border-sky-100 dark:border-sky-800 rounded-xl px-4 py-2.5 text-xs"
        >
          <Loader2 size={14} className="text-sky-500 animate-spin" />
          <span className="text-sky-700 dark:text-sky-300 font-medium">
            Syncing your sleep data...
          </span>
        </motion.div>
      );
    }

    if (syncStatus === 'synced' && syncedCount > 0) {
      return (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 rounded-xl px-4 py-2.5 text-xs"
        >
          <Check size={14} className="text-emerald-500" />
          <span className="text-emerald-700 dark:text-emerald-300 font-medium">
            Synced {syncedCount} entries from your account
          </span>
        </motion.div>
      );
    }

    if (syncStatus === 'error') {
      return (
        <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 rounded-xl px-4 py-2.5 text-xs">
          <WifiOff size={14} className="text-amber-500" />
          <span className="text-amber-700 dark:text-amber-300 font-medium">
            Sync temporarily unavailable. Your data is saved locally.
          </span>
        </div>
      );
    }

    return null;
  }

  // Not authenticated — show sign-in prompt
  if (dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-800/30 rounded-xl px-4 py-2.5"
      >
        <Cloud size={14} className="text-indigo-400 flex-shrink-0" />
        <span className="text-xs text-indigo-600 dark:text-indigo-300 flex-1">
          Your data is saved on this device only.{' '}
          <button
            type="button"
            onClick={onSignIn}
            className="font-bold hover:underline"
          >
            Sign in
          </button>{' '}
          to sync across devices.
        </span>
        <button
          type="button"
          onClick={handleDismiss}
          className="text-indigo-300 dark:text-indigo-600 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors flex-shrink-0"
          aria-label="Dismiss"
        >
          <X size={14} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default SyncBanner;
