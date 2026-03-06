/**
 * SafetyBanner - Crisis Overlay
 *
 * Full-width banner (not modal) shown when crisis is detected
 * - 988 Suicide & Crisis Lifeline
 * - Crisis Text Line
 * - International resources
 * - 10-second delay before dismissible
 * - Warm amber color scheme (not alarming red)
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageSquare, Globe, X, AlertTriangle } from 'lucide-react';

interface SafetyBannerProps {
  onDismiss: () => void;
}

const DISMISS_DELAY_MS = 10000; // 10 seconds

const SafetyBanner: React.FC<SafetyBannerProps> = ({ onDismiss }) => {
  const [canDismiss, setCanDismiss] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCanDismiss(true);
    }, DISMISS_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (canDismiss) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [canDismiss]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      className="mx-4 mt-4"
    >
      <div className="bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-300 dark:border-amber-700 rounded-xl p-6 shadow-lg">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="shrink-0">
            <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center">
              <AlertTriangle size={24} className="text-amber-600 dark:text-amber-400" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="text-lg font-bold text-amber-900 dark:text-amber-100 mb-2">
              You're not alone, and support is available right now
            </h3>
            <p className="text-amber-800 dark:text-amber-200 mb-4 leading-relaxed">
              It sounds like you're carrying something really heavy right now, and I'm glad you
              said something. Please reach out to a professional who can provide the support
              you need.
            </p>

            {/* Crisis Resources */}
            <div className="space-y-3">
              {/* 988 Lifeline */}
              <a
                href="tel:988"
                className="flex items-center gap-3 p-4 bg-white dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 rounded-lg hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-amber-600 flex items-center justify-center shrink-0">
                  <Phone size={20} className="text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-amber-900 dark:text-amber-100 group-hover:text-amber-700 dark:group-hover:text-amber-300">
                    988 Suicide & Crisis Lifeline
                  </div>
                  <div className="text-sm text-amber-700 dark:text-amber-300">
                    Call or text 988 • Free, confidential, 24/7
                  </div>
                </div>
                <div className="text-2xl font-bold text-amber-600 dark:text-amber-400 shrink-0">
                  988
                </div>
              </a>

              {/* Crisis Text Line */}
              <a
                href="sms:741741&body=HOME"
                className="flex items-center gap-3 p-4 bg-white dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 rounded-lg hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-amber-600 flex items-center justify-center shrink-0">
                  <MessageSquare size={20} className="text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-amber-900 dark:text-amber-100 group-hover:text-amber-700 dark:group-hover:text-amber-300">
                    Crisis Text Line
                  </div>
                  <div className="text-sm text-amber-700 dark:text-amber-300">
                    Text HOME to 741741 • Free, confidential, 24/7
                  </div>
                </div>
              </a>

              {/* International Resources */}
              <a
                href="https://findahelpline.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-white dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 rounded-lg hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-amber-600 flex items-center justify-center shrink-0">
                  <Globe size={20} className="text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-amber-900 dark:text-amber-100 group-hover:text-amber-700 dark:group-hover:text-amber-300">
                    International Crisis Resources
                  </div>
                  <div className="text-sm text-amber-700 dark:text-amber-300">
                    Find helplines in your country
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onDismiss}
            disabled={!canDismiss}
            className={`shrink-0 p-2 rounded-lg transition-all ${
              canDismiss
                ? 'hover:bg-amber-200 dark:hover:bg-amber-800/40 text-amber-600 dark:text-amber-400 cursor-pointer'
                : 'text-amber-300 dark:text-amber-600 cursor-not-allowed'
            }`}
            aria-label={canDismiss ? 'Dismiss' : `Wait ${timeLeft}s to dismiss`}
            title={canDismiss ? 'Dismiss' : `Wait ${timeLeft} seconds`}
          >
            {canDismiss ? (
              <X size={20} />
            ) : (
              <span className="text-xs font-medium">{timeLeft}s</span>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SafetyBanner;
