import React from 'react';
import type { ProviderWithDetails } from '@/lib/providers/types';
import { CulturalBadge } from '@/components/providers/shared/CulturalBadge';

interface CulturalBadgesProps {
  provider: Pick<ProviderWithDetails, 'cultural_competencies'>;
}

export const CulturalBadges: React.FC<CulturalBadgesProps> = ({ provider }) => {
  if (!provider.cultural_competencies.length) return null;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white/70 p-6 backdrop-blur-md dark:border-neutral-700 dark:bg-neutral-800/70">
      <h2 className="font-display mb-3 text-lg font-bold text-slate-900 dark:text-white">
        Cultural Competencies
      </h2>
      <div className="flex flex-wrap gap-2">
        {provider.cultural_competencies.map((competency) => (
          <CulturalBadge key={competency.id} competency={competency} />
        ))}
      </div>
    </section>
  );
};
