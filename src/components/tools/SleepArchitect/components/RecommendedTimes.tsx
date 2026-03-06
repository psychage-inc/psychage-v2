import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, ChevronDown, ChevronUp } from 'lucide-react';
import { RecommendedWakeTime, formatDuration } from '../model';

interface RecommendedTimesProps {
  wakeTimes: RecommendedWakeTime[];
  bedtimes: RecommendedWakeTime[];
}

const RecommendedTimes: React.FC<RecommendedTimesProps> = ({ wakeTimes, bedtimes }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full text-sm font-bold text-gray-700"
        aria-expanded={expanded}
      >
        <span className="flex items-center gap-2">
          <Sun size={16} className="text-amber-500" />
          Recommended Times
        </span>
        {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden space-y-4"
          >
            {/* Wake times */}
            <div>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sun size={12} className="text-amber-400" />
                Wake at end of cycle
              </div>
              <div className="grid grid-cols-2 gap-2">
                {wakeTimes.map(t => (
                  <div
                    key={t.cycles}
                    className="bg-amber-50 rounded-xl p-3 text-center border border-amber-100"
                  >
                    <div className="text-lg font-bold font-display text-gray-900">{t.time}</div>
                    <div className="text-[10px] text-gray-500 font-medium">
                      {t.cycles} cycles &middot; {formatDuration(t.totalSleepMinutes)}
                    </div>
                    <div className="text-[10px] text-amber-600 font-bold mt-0.5">{t.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bedtimes */}
            <div>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Moon size={12} className="text-indigo-400" />
                Ideal bedtimes for your wake time
              </div>
              <div className="grid grid-cols-2 gap-2">
                {bedtimes.map(t => (
                  <div
                    key={t.cycles}
                    className="bg-indigo-50 rounded-xl p-3 text-center border border-indigo-100"
                  >
                    <div className="text-lg font-bold font-display text-gray-900">{t.time}</div>
                    <div className="text-[10px] text-gray-500 font-medium">
                      {t.cycles} cycles &middot; {formatDuration(t.totalSleepMinutes)}
                    </div>
                    <div className="text-[10px] text-indigo-600 font-bold mt-0.5">{t.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RecommendedTimes;
