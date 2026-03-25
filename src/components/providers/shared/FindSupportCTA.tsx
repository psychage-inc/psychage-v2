 
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';
import { searchProviders } from '@/lib/providers/queries';
import type { ProviderCardData } from '@/lib/providers/types';
import { ProviderCardCompact } from '../cards/ProviderCardCompact';

interface FindSupportCTAProps {
  specialtySlug?: string;
  headline?: string;
  description?: string;
}

export const FindSupportCTA: React.FC<FindSupportCTAProps> = ({
  specialtySlug,
  headline = 'Find a provider who can help',
  description = 'Many people with similar experiences find it helpful to talk with a professional.',
}) => {
  const [providers, setProviders] = useState<ProviderCardData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!specialtySlug) return;
    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true);

    searchProviders({
      specialty_slugs: [specialtySlug],
      per_page: 3,
      accepting_patients: true,
    })
      .then(result => {
        if (!cancelled) setProviders(result.providers.slice(0, 3));
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => { cancelled = true; };
  }, [specialtySlug]);

  const searchUrl = specialtySlug
    ? `/providers/search?specialty=${specialtySlug}`
    : '/providers/search';

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-12"
    >
      <div className="bg-gradient-to-br from-teal-50 to-white dark:from-teal-900/10 dark:to-gray-900 rounded-3xl border border-teal-100 dark:border-teal-800/30 p-8 md:p-10">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center flex-shrink-0">
            <Heart className="w-6 h-6 text-teal-600 dark:text-teal-400" />
          </div>
          <div>
            <h3 className="font-display font-bold text-xl text-gray-900 dark:text-white mb-1">
              {headline}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {description}
            </p>
          </div>
        </div>

        {/* Provider cards */}
        {!isLoading && providers.length > 0 && (
          <div className="space-y-3 mb-6">
            {providers.map(provider => (
              <ProviderCardCompact key={provider.id} provider={provider} />
            ))}
          </div>
        )}

        <Link to={searchUrl}>
          <Button className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm" rightIcon={<ArrowRight size={16} />}>
            View all providers
          </Button>
        </Link>
      </div>
    </motion.section>
  );
};
