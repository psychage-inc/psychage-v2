/**
 * SaveDataPrompt — Milestone auth prompt shown after 3+ entries.
 * Level 2 auth prompt: richer card, shown after meaningful engagement.
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cloud, Shield, Smartphone, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SaveDataPromptProps {
  entryCount: number;
  onSignIn: () => void;
}

const DISMISS_KEY = 'psychage_sleep_save_prompt_dismissed';
const DISMISS_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

const SaveDataPrompt: React.FC<SaveDataPromptProps> = ({
  entryCount,
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

  if (dismissed || entryCount < 3) return null;

  const handleDismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem(DISMISS_KEY, Date.now().toString());
    } catch { /* ignore */ }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-indigo-100 dark:border-indigo-800 relative"
    >
      <button
        type="button"
        onClick={handleDismiss}
        className="absolute top-4 right-4 text-indigo-300 dark:text-indigo-600 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
        aria-label="Dismiss"
      >
        <X size={16} />
      </button>

      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-800/50 rounded-xl flex items-center justify-center flex-shrink-0">
          <Cloud size={20} className="text-indigo-500" />
        </div>
        <div>
          <h4 className="font-display font-bold text-sm text-gray-900 dark:text-white mb-1">
            Save your sleep data
          </h4>
          <p className="text-xs text-gray-600 dark:text-neutral-400 leading-relaxed mb-4">
            You have {entryCount} nights logged. Create a free account to keep
            your data safe across devices and unlock your full sleep history on
            the dashboard.
          </p>

          <div className="flex flex-wrap gap-3 mb-4 text-[10px] text-gray-500 dark:text-neutral-400">
            <div className="flex items-center gap-1">
              <Shield size={12} className="text-indigo-400" />
              Encrypted & private
            </div>
            <div className="flex items-center gap-1">
              <Smartphone size={12} className="text-indigo-400" />
              Sync across devices
            </div>
            <div className="flex items-center gap-1">
              <Cloud size={12} className="text-indigo-400" />
              Never lose your data
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onSignIn}
              className="bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors"
            >
              Create Account
            </button>
            <button
              type="button"
              onClick={handleDismiss}
              className="text-xs font-medium text-gray-400 dark:text-neutral-500 hover:text-gray-600 dark:hover:text-neutral-300 transition-colors"
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SaveDataPrompt;
