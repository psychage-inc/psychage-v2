import { useProviderLookups } from '@/context/ProviderLookupsContext';

export interface ProviderFilters {
  providerTypes: ReturnType<typeof useProviderLookups>['providerTypes'];
  specialties: ReturnType<typeof useProviderLookups>['specialties'];
  conditionSpecialties: ReturnType<typeof useProviderLookups>['conditionSpecialties'];
  approachSpecialties: ReturnType<typeof useProviderLookups>['approachSpecialties'];
  populationSpecialties: ReturnType<typeof useProviderLookups>['populationSpecialties'];
  languages: ReturnType<typeof useProviderLookups>['languages'];
  culturalCompetencies: ReturnType<typeof useProviderLookups>['culturalCompetencies'];
  insurancePlans: ReturnType<typeof useProviderLookups>['insurancePlans'];
}

interface UseProviderFiltersReturn {
  filters: ProviderFilters;
  isLoading: boolean;
  error: string | null;
}

/**
 * Thin wrapper around ProviderLookupsContext.
 * Lookup data is fetched once by the context provider and shared across all consumers.
 */
export function useProviderFilters(): UseProviderFiltersReturn {
  const lookups = useProviderLookups();

  return {
    filters: {
      providerTypes: lookups.providerTypes,
      specialties: lookups.specialties,
      conditionSpecialties: lookups.conditionSpecialties,
      approachSpecialties: lookups.approachSpecialties,
      populationSpecialties: lookups.populationSpecialties,
      languages: lookups.languages,
      culturalCompetencies: lookups.culturalCompetencies,
      insurancePlans: lookups.insurancePlans,
    },
    isLoading: lookups.isLoading,
    error: null,
  };
}
