import React from 'react';
import { Loader2 } from 'lucide-react';
import type { ProviderFilters } from '@/hooks/useProviderFilters';
import type { FormData } from './types';
import { CheckboxGroup } from './shared';

interface Props {
  formData: FormData;
  toggleArrayItem: (key: 'specialty_ids' | 'language_ids' | 'competency_ids', id: string) => void;
  filters: ProviderFilters;
  filtersLoading: boolean;
}

const SpecialtiesStep: React.FC<Props> = ({ formData, toggleArrayItem, filters, filtersLoading }) => (
  <div className="space-y-6">
    <div>
      <h2 className="font-display font-bold text-2xl text-gray-900 dark:text-white mb-2">
        Specialties & Languages
      </h2>
      <p className="text-gray-500 dark:text-neutral-400">
        Select the areas you specialize in and languages you offer services in.
      </p>
    </div>

    {filtersLoading ? (
      <div className="flex items-center justify-center py-12 text-gray-500 dark:text-neutral-500">
        <Loader2 size={24} className="animate-spin mr-3" />
        Loading options...
      </div>
    ) : (
      <>
        {filters.conditionSpecialties.length > 0 && (
          <CheckboxGroup
            title="Conditions"
            items={filters.conditionSpecialties.map(s => ({ id: s.id, label: s.label }))}
            selected={formData.specialty_ids}
            onToggle={(id) => toggleArrayItem('specialty_ids', id)}
          />
        )}
        {filters.approachSpecialties.length > 0 && (
          <CheckboxGroup
            title="Treatment Approaches"
            items={filters.approachSpecialties.map(s => ({ id: s.id, label: s.label }))}
            selected={formData.specialty_ids}
            onToggle={(id) => toggleArrayItem('specialty_ids', id)}
          />
        )}
        {filters.populationSpecialties.length > 0 && (
          <CheckboxGroup
            title="Populations Served"
            items={filters.populationSpecialties.map(s => ({ id: s.id, label: s.label }))}
            selected={formData.specialty_ids}
            onToggle={(id) => toggleArrayItem('specialty_ids', id)}
          />
        )}
        {filters.languages.length > 0 && (
          <CheckboxGroup
            title="Languages"
            items={filters.languages.map(l => ({ id: l.id, label: `${l.label} (${l.native_label})` }))}
            selected={formData.language_ids}
            onToggle={(id) => toggleArrayItem('language_ids', id)}
          />
        )}
        {filters.culturalCompetencies.length > 0 && (
          <CheckboxGroup
            title="Cultural Competencies"
            items={filters.culturalCompetencies.map(c => ({ id: c.id, label: c.label }))}
            selected={formData.competency_ids}
            onToggle={(id) => toggleArrayItem('competency_ids', id)}
          />
        )}
      </>
    )}
  </div>
);

export default SpecialtiesStep;
