import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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
  headline,
  description,
}) => {
  const { t } = useTranslation();
  const displayHeadline = headline || t('providers.cta.find_support_title');
  const displayDescription = description || t('providers.cta.find_support_desc');
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
      <div className="bg-gradient-to-br from-teal-50 to-white dark:from-teal-900/10 dark:to-neutral-900 rounded-3xl border border-teal-100 dark:border-teal-800/30 p-8 md:p-10">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center flex-shrink-0">
            <Heart className="w-6 h-6 text-teal-600 dark:text-teal-400" />
          </div>
          <div>
            <h3 className="font-display font-bold text-xl text-text-primary mb-1">
              {displayHeadline}
            </h3>
            <p className="text-text-tertiary text-sm">
              {displayDescription}
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
            {t('providers.cta.view_all')}
          </Button>
        </Link>
      </div>
    </motion.section>
  );
};
