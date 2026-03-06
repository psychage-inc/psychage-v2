import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Stethoscope } from 'lucide-react';
import { Link } from 'react-router-dom';
import { searchProviders } from '@/lib/providers/queries';
import { CONDITION_TO_SPECIALTY } from '@/lib/providers/search';
import type { ProviderCardData } from '@/lib/providers/types';
import { ProviderCardCompact } from '../cards/ProviderCardCompact';

interface ProviderQuickMatchProps {
  conditionIds: string[];
  maxProviders?: number;
}

export const ProviderQuickMatch: React.FC<ProviderQuickMatchProps> = ({
  conditionIds,
  maxProviders = 3,
}) => {
  const [providers, setProviders] = useState<ProviderCardData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Map condition IDs to specialty slugs
  const specialtySlugs = conditionIds
    .map(id => CONDITION_TO_SPECIALTY[id])
    .filter(Boolean);

  useEffect(() => {
    if (specialtySlugs.length === 0) return;
    let cancelled = false;
    setIsLoading(true);

    searchProviders({
      specialty_slugs: specialtySlugs,
      per_page: maxProviders,
      accepting_patients: true,
    })
      .then(result => {
        if (!cancelled) setProviders(result.providers.slice(0, maxProviders));
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => { cancelled = true; };
  }, [specialtySlugs.join(','), maxProviders]); // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading || providers.length === 0) return null;

  const searchUrl = specialtySlugs.length > 0
    ? `/providers/search?specialty=${specialtySlugs.join(',')}`
    : '/providers/search';

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
        <h3 className="font-serif text-lg font-medium text-text-primary">
          Providers who specialize in this area
        </h3>
      </div>

      <div className="space-y-3 mb-4">
        {providers.map(provider => (
          <ProviderCardCompact key={provider.id} provider={provider} />
        ))}
      </div>

      <Link
        to={searchUrl}
        className="inline-flex items-center gap-1 text-sm font-medium text-teal-400 hover:text-teal-300 transition-colors"
      >
        View all matching providers
        <ArrowRight size={14} />
      </Link>
    </motion.div>
  );
};
