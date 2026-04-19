import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { ProviderWithDetails } from '@/lib/providers/types';

interface AboutSectionProps {
  provider: Pick<ProviderWithDetails, 'bio'>;
}

const TRUNCATE_LENGTH = 300;

export const AboutSection: React.FC<AboutSectionProps> = ({ provider }) => {
  const [expanded, setExpanded] = useState(false);

  if (!provider.bio) return null;

  const isLong = provider.bio.length > TRUNCATE_LENGTH;
  const displayText =
    isLong && !expanded
      ? provider.bio.slice(0, TRUNCATE_LENGTH).trimEnd() + '...'
      : provider.bio;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white/70 p-6 backdrop-blur-md dark:border-neutral-700 dark:bg-neutral-800/70">
      <h2 className="font-display mb-3 text-lg font-bold text-slate-900 dark:text-white">
        About
      </h2>
      <p className="whitespace-pre-line text-sm leading-relaxed text-slate-600 dark:text-neutral-300">
        {displayText}
      </p>
      {isLong && (
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-teal-600 transition-colors hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300"
        >
          {expanded ? (
            <>
              Read less <ChevronUp size={14} />
            </>
          ) : (
            <>
              Read more <ChevronDown size={14} />
            </>
          )}
        </button>
      )}
    </section>
  );
};
