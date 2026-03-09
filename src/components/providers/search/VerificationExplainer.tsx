import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Info, ChevronDown } from 'lucide-react';

export const VerificationExplainer: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const content = (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Psychage Verified */}
      <div className="flex gap-3 p-4 bg-teal-50/50 dark:bg-teal-900/10 rounded-xl border border-teal-100 dark:border-teal-800/40">
        <div className="w-9 h-9 rounded-lg bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center flex-shrink-0">
          <ShieldCheck size={18} className="text-teal-600 dark:text-teal-400" />
        </div>
        <div>
          <h4 className="font-display font-bold text-sm text-teal-700 dark:text-teal-300 mb-0.5">Psychage Verified</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            Reviewed by our team. Credentials independently verified, with a complete profile including specialties, insurance, and languages.
          </p>
        </div>
      </div>

      {/* Publicly Listed */}
      <div className="flex gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700/40">
        <div className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-700/50 flex items-center justify-center flex-shrink-0">
          <Info size={18} className="text-gray-500 dark:text-gray-400" />
        </div>
        <div>
          <h4 className="font-display font-bold text-sm text-gray-700 dark:text-gray-300 mb-0.5">Publicly Listed</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            Sourced from the U.S. National Provider Identifier (NPI) public registry. Not individually reviewed by Psychage. Profile information may be limited.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop: always visible */}
      <div className="hidden sm:block">{content}</div>

      {/* Mobile: collapsible */}
      <div className="sm:hidden">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors w-full"
        >
          <ShieldCheck size={14} className="text-teal-500" />
          About provider verification
          <ChevronDown size={14} className={`ml-auto transition-transform ${mobileOpen ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden mt-3"
            >
              {content}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default VerificationExplainer;
