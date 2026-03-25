 
/**
 * AIDisclosure - Onboarding Disclosure Banner
 *
 * Required AI identity disclosure shown on first visit
 * - Explains Psychage AI's capabilities and limitations
 * - localStorage persistence
 * - Dismissible after reading
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';

const STORAGE_KEY = 'psychage_ai_disclosure_accepted';

const AIDisclosure: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem(STORAGE_KEY);
    if (!accepted) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShow(true);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="mx-4 mt-4 mb-2"
        >
          <div className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50 dark:from-teal-900/20 dark:via-emerald-900/20 dark:to-cyan-900/20 border-2 border-teal-200 dark:border-teal-800 rounded-2xl p-5 shadow-lg">
            {/* Decorative gradient */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500" />

            <div className="flex gap-4">
              <div className="shrink-0">
                <div className="relative w-10 h-10">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl blur-sm opacity-30" />
                  <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-teal-100 to-emerald-100 dark:from-teal-900/50 dark:to-emerald-900/50 flex items-center justify-center ring-2 ring-teal-200 dark:ring-teal-800">
                    <Sparkles size={20} className="text-teal-600 dark:text-teal-400" />
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <h3 className="font-bold text-teal-900 dark:text-teal-100 text-base mb-2 flex items-center gap-2">
                  Welcome to Psychage AI
                  <span className="text-xl">✨</span>
                </h3>
                <p className="text-sm text-teal-800 dark:text-teal-200 leading-relaxed">
                  I'm Psychage AI, your mental health education companion. I can share evidence-based
                  information, connect you to curated resources, and help you explore mental wellness topics —
                  but I'm not a therapist, doctor, or crisis service, and nothing I provide is medical
                  advice or diagnosis.
                </p>
                <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                  <p className="text-xs text-amber-900 dark:text-amber-100 font-semibold">
                    ⚠️ Crisis Support: If you're in crisis, please contact{' '}
                    <a href="tel:988" className="underline hover:text-amber-700 dark:hover:text-amber-300 transition-colors">
                      988 (Suicide & Crisis Lifeline)
                    </a>{' '}
                    immediately.
                  </p>
                </div>
              </div>

              <button
                onClick={handleDismiss}
                className="shrink-0 p-2 hover:bg-teal-200 dark:hover:bg-teal-800/40 rounded-xl transition-all"
                aria-label="Dismiss disclosure"
              >
                <X size={20} className="text-teal-600 dark:text-teal-400" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AIDisclosure;
