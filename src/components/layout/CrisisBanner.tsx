import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, X, HeartHandshake } from 'lucide-react';
import { Link } from 'react-router-dom';
import { resolveCountry, getResourcesForCountry } from '@/lib/crisis';

const SESSION_KEY = 'psychage_crisis_banner_dismissed';

const CrisisBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY) === '1';
    } catch {
      return false;
    }
  });

  const { primaryPhone, primaryLabel } = useMemo(() => {
    const country = resolveCountry();
    const result = getResourcesForCountry(country);
    const hotline = result.all_resources.find((r) => r.phone && r.type === 'hotline');
    return {
      primaryPhone: hotline?.phone ?? result.emergency_number,
      primaryLabel: hotline?.name ?? 'Emergency',
    };
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      // sessionStorage unavailable
    }
  };

  const callHref = `tel:${primaryPhone.replace(/[^0-9+]/g, '')}`;

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-6 right-6 z-[100] max-w-sm w-[calc(100%-3rem)] sm:w-auto"
        >
          <div className="bg-red-600 dark:bg-red-700 rounded-2xl shadow-2xl shadow-red-900/30 overflow-hidden">
            {/* Dismiss button */}
            <button
              onClick={handleDismiss}
              className="absolute top-3 right-3 p-1 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors z-10"
              aria-label="Dismiss crisis support notification"
            >
              <X size={16} />
            </button>

            <div className="p-4 pr-10">
              <div className="flex items-center gap-3">
                <div className="bg-white/15 p-2.5 rounded-xl text-white shrink-0">
                  <HeartHandshake size={20} aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="text-white font-bold text-sm">
                    24/7 Crisis Support
                  </p>
                  <p className="text-white/70 text-xs font-medium mt-0.5">
                    {primaryPhone} ({primaryLabel})
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-3">
                <a
                  href={callHref}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-white hover:bg-white/90 text-red-600 rounded-lg text-xs font-bold transition-colors whitespace-nowrap"
                >
                  <Phone size={12} />
                  Call Now
                </a>
                <Link
                  to="/crisis"
                  onClick={handleDismiss}
                  className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-white/30 hover:bg-white/10 text-white rounded-lg text-xs font-bold transition-colors"
                >
                  Resources
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CrisisBanner;
