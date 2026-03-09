import React from 'react';
import { X } from 'lucide-react';
import type { ProviderSearchParams } from '@/lib/providers/types';
import { useProviderFilters } from '@/hooks/useProviderFilters';

interface ProviderFilterChipsProps {
  params: ProviderSearchParams;
  onChange: (params: Partial<ProviderSearchParams>) => void;
  onClearAll: () => void;
}

export const ProviderFilterChips: React.FC<ProviderFilterChipsProps> = ({
  params,
  onChange,
  onClearAll,
}) => {
  const { filters } = useProviderFilters();

  const chips: { label: string; onRemove: () => void }[] = [];

  // Verification status
  if (params.verification_status && params.verification_status !== 'all') {
    chips.push({
      label: params.verification_status === 'verified' ? 'Psychage Verified only' : 'Publicly Listed only',
      onRemove: () => onChange({ verification_status: undefined }),
    });
  }

  // Query
  if (params.query) {
    chips.push({
      label: `"${params.query}"`,
      onRemove: () => onChange({ query: undefined }),
    });
  }

  // Specialty slugs
  params.specialty_slugs?.forEach(slug => {
    const spec = filters.specialties.find(s => s.slug === slug);
    chips.push({
      label: spec?.label || slug,
      onRemove: () => onChange({
        specialty_slugs: params.specialty_slugs?.filter(s => s !== slug),
      }),
    });
  });

  // Provider types
  params.provider_type_ids?.forEach(id => {
    const type = filters.providerTypes.find(t => t.id === id);
    chips.push({
      label: type?.label || 'Type',
      onRemove: () => onChange({
        provider_type_ids: params.provider_type_ids?.filter(t => t !== id),
      }),
    });
  });

  // Languages
  params.language_ids?.forEach(id => {
    const lang = filters.languages.find(l => l.id === id);
    chips.push({
      label: lang?.label || 'Language',
      onRemove: () => onChange({
        language_ids: params.language_ids?.filter(l => l !== id),
      }),
    });
  });

  // Cultural competencies
  params.competency_ids?.forEach(id => {
    const comp = filters.culturalCompetencies.find(c => c.id === id);
    chips.push({
      label: comp?.label || 'Competency',
      onRemove: () => onChange({
        competency_ids: params.competency_ids?.filter(c => c !== id),
      }),
    });
  });

  // Insurance
  params.insurance_plan_ids?.forEach(id => {
    const plan = filters.insurancePlans.find(p => p.id === id);
    chips.push({
      label: plan?.name || 'Insurance',
      onRemove: () => onChange({
        insurance_plan_ids: params.insurance_plan_ids?.filter(p => p !== id),
      }),
    });
  });

  // Telehealth
  if (params.telehealth) {
    chips.push({
      label: 'Telehealth',
      onRemove: () => onChange({ telehealth: undefined }),
    });
  }

  // In-person
  if (params.in_person) {
    chips.push({
      label: 'In-person',
      onRemove: () => onChange({ in_person: undefined }),
    });
  }

  // Accepting patients
  if (params.accepting_patients) {
    chips.push({
      label: 'Accepting patients',
      onRemove: () => onChange({ accepting_patients: undefined }),
    });
  }

  // State
  if (params.state) {
    chips.push({
      label: params.state,
      onRemove: () => onChange({ state: undefined }),
    });
  }

  // City
  if (params.city) {
    chips.push({
      label: params.city,
      onRemove: () => onChange({ city: undefined }),
    });
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((chip, i) => (
        <span
          key={i}
          className="inline-flex items-center gap-1.5 px-3 py-1 text-sm font-medium text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-900/20 rounded-full border border-teal-100 dark:border-teal-800"
        >
          {chip.label}
          <button
            onClick={chip.onRemove}
            className="hover:text-teal-900 dark:hover:text-teal-100 transition-colors"
            aria-label={`Remove ${chip.label} filter`}
          >
            <X size={14} />
          </button>
        </span>
      ))}
      <button
        onClick={onClearAll}
        className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors underline underline-offset-2"
      >
        Clear all
      </button>
    </div>
  );
};

export default ProviderFilterChips;
