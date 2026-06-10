import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, Stethoscope, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { searchProviders } from '@/lib/providers/queries';
import { CONDITION_TO_SPECIALTY } from '@/lib/providers/search';
import type { ProviderCardData } from '@/lib/providers/types';
import { ProviderCardCompact } from '../cards/ProviderCardCompact';

interface ProviderQuickMatchProps {
  conditionIds: string[];
  maxProviders?: number;
}

/**
 * Provider suggestions for navigator results. The provider search is
 * USER-INITIATED — no network call fires on render (audit C-4). Condition-derived
 * specialty data only leaves the device after the user clicks "Find providers".
 */
export const ProviderQuickMatch: React.FC<ProviderQuickMatchProps> = ({
  conditionIds,
  maxProviders = 3,
}) => {
  const { t } = useTranslation();
  const [providers, setProviders] = useState<ProviderCardData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => () => { mountedRef.current = false; }, []);

  // Map condition IDs to specialty slugs (no side effects).
  const specialtySlugs = useMemo(
    () => conditionIds.map(id => CONDITION_TO_SPECIALTY[id]).filter(Boolean),
    [conditionIds]
  );

  // No specialty mapping → nothing to match against.
  if (specialtySlugs.length === 0) return null;

  const searchUrl = `/providers/search?specialty=${specialtySlugs.join(',')}`;

  const handleFind = () => {
    if (isLoading || hasSearched) return;
    setIsLoading(true);

    searchProviders({
      specialty_slugs: specialtySlugs,
      per_page: maxProviders,
      accepting_patients: true,
    })
      .then(result => {
        if (mountedRef.current) setProviders(result.providers.slice(0, maxProviders));
      })
      .catch(() => {})
      .finally(() => {
        if (mountedRef.current) {
          setIsLoading(false);
          setHasSearched(true);
        }
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="mt-8"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
          <Stethoscope className="w-4 h-4 text-purple-500" />
        </div>
        <h3 className="font-display text-lg font-medium text-text-primary">
          {t('providers.cta.quick_match_title')}
        </h3>
      </div>

      {!hasSearched ? (
        <>
          <p className="text-sm text-text-secondary mb-4">
            {t('providers.cta.quick_match_desc')}
          </p>
          <button
            type="button"
            onClick={handleFind}
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-5 py-3 min-h-[44px] rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-hover transition-colors disabled:opacity-60"
          >
            {isLoading
              ? <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
              : <Stethoscope className="w-4 h-4" aria-hidden="true" />}
            {t('providers.cta.find_button')}
          </button>
        </>
      ) : providers.length > 0 ? (
        <>
          <div className="space-y-3 mb-4">
            {providers.map(provider => (
              <ProviderCardCompact key={provider.id} provider={provider} />
            ))}
          </div>
          <Link
            to={searchUrl}
            className="inline-flex items-center gap-1 text-sm font-medium text-teal-400 hover:text-teal-300 transition-colors"
          >
            {t('providers.cta.view_matching')}
            <ArrowRight size={14} />
          </Link>
        </>
      ) : (
        <Link
          to={searchUrl}
          className="inline-flex items-center gap-1 text-sm font-medium text-teal-400 hover:text-teal-300 transition-colors"
        >
          {t('providers.cta.view_matching')}
          <ArrowRight size={14} />
        </Link>
      )}
    </motion.div>
  );
};
