import React from 'react';
import type { ProviderWithDetails } from '@/lib/providers/types';
import { LanguageBadge } from '@/components/providers/shared/LanguageBadge';

interface LanguageBadgesProps {
  provider: Pick<ProviderWithDetails, 'languages'>;
}

export const LanguageBadges: React.FC<LanguageBadgesProps> = ({ provider }) => {
  if (!provider.languages.length) return null;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white/70 p-6 backdrop-blur-md dark:border-neutral-700 dark:bg-neutral-800/70">
      <h2 className="font-display mb-3 text-lg font-bold text-slate-900 dark:text-white">
        Languages
      </h2>
      <div className="flex flex-wrap gap-2">
        {provider.languages.map((language) => (
          <LanguageBadge
            key={language.id}
            language={language}
            showProficiency
          />
        ))}
      </div>
    </section>
  );
};
