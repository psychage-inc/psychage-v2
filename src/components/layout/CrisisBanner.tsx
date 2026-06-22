import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, X, HeartHandshake } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { resolveCountry, getResourcesForCountry } from '@/lib/crisis';
import { useMediaQuery, MOBILE_NARROW_QUERY } from '@/hooks/useMediaQuery';

const SESSION_KEY = 'psychage_crisis_banner_dismissed';

const CrisisBanner: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  // At the phone breakpoint (≤639px) the persistent MobileCrisisHeader owns the
  // crisis surface; this floating banner is suppressed there to avoid a doubled
  // crisis affordance. Desktop/tablet (≥640px) render is unchanged.
  const isPhone = useMediaQuery(MOBILE_NARROW_QUERY);
  // On the auth screens the form is a full-viewport centered card; the default
  // fixed bottom-right overlay covers it. There, render the same card in-flow
  // within the footer instead. Everywhere else the floating overlay is unchanged.
  const isAuthRoute =
    location.pathname === '/login' ||
    location.pathname === '/signup' ||
    location.pathname.startsWith('/auth/');
  const positionClass = isAuthRoute
    ? 'relative z-10 mx-auto my-4 max-w-sm w-[calc(100%-2rem)]'
    : 'fixed bottom-6 right-6 z-[100] max-w-sm w-[calc(100%-3rem)] sm:w-auto';
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

  if (isPhone) return null;

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          data-floating="crisis-card"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={positionClass}
        >
          <div className="bg-red-600 dark:bg-red-700 rounded-2xl shadow-2xl shadow-red-900/30 overflow-hidden">
            {/* Dismiss button */}
            <button
              onClick={handleDismiss}
              className="absolute top-3 right-3 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors z-10"
              aria-label={t('crisis.banner.dismiss_aria')}
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
                    {t('crisis.banner.title')}
                  </p>
                  <p className="text-white/70 text-xs font-medium mt-0.5">
                    {primaryPhone} ({primaryLabel})
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-3">
                <a
                  href={callHref}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 min-h-[44px] px-4 py-3 bg-white hover:bg-white/90 text-red-600 rounded-lg text-xs font-bold transition-colors whitespace-nowrap"
                >
                  <Phone size={12} />
                  {t('crisis.common.call_now')}
                </a>
                <Link
                  to="/crisis"
                  onClick={handleDismiss}
                  className="flex-1 inline-flex items-center justify-center min-h-[44px] px-4 py-3 border border-white/30 hover:bg-white/10 text-white rounded-lg text-xs font-bold transition-colors"
                >
                  {t('crisis.banner.resources')}
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
