import React from 'react';
import type { ProviderWithDetails, Specialty } from '@/lib/providers/types';
import { SpecialtyTag } from '@/components/providers/shared/SpecialtyTag';

interface SpecialtiesGridProps {
  provider: Pick<ProviderWithDetails, 'specialties'>;
}

const CATEGORY_LABELS: Record<Specialty['category'], string> = {
  condition: 'Conditions Treated',
  treatment_approach: 'Treatment Approaches',
  population: 'Populations Served',
};

const CATEGORY_ORDER: Specialty['category'][] = [
  'condition',
  'treatment_approach',
  'population',
];

export const SpecialtiesGrid: React.FC<SpecialtiesGridProps> = ({ provider }) => {
  if (!provider.specialties.length) return null;

  const grouped = provider.specialties.reduce<
    Record<Specialty['category'], Specialty[]>
  >(
    (acc, specialty) => {
      acc[specialty.category].push(specialty);
      return acc;
    },
    { condition: [], treatment_approach: [], population: [] },
  );

  return (
    <section className="rounded-2xl border border-slate-200 bg-white/70 p-6 backdrop-blur-md dark:border-neutral-700 dark:bg-neutral-800/70">
      <h2 className="font-display mb-4 text-lg font-bold text-slate-900 dark:text-white">
        Specialties
      </h2>

      <div className="space-y-5">
        {CATEGORY_ORDER.map((category) => {
          const items = grouped[category];
          if (!items.length) return null;

          return (
            <div key={category}>
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-neutral-500">
                {CATEGORY_LABELS[category]}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((specialty) => (
                  <SpecialtyTag
                    key={specialty.id}
                    specialty={specialty}
                    clickable
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
