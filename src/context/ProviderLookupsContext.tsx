import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getProviderTypes,
  getSpecialties,
  getLanguages,
  getCulturalCompetencies,
  getInsurancePlans,
} from '@/lib/providers/queries';
import type {
  ProviderType,
  Specialty,
  LanguageLookup,
  CulturalCompetency,
  InsurancePlan,
} from '@/lib/providers/types';

export interface ProviderLookups {
  providerTypes: ProviderType[];
  specialties: Specialty[];
  conditionSpecialties: Specialty[];
  approachSpecialties: Specialty[];
  populationSpecialties: Specialty[];
  languages: LanguageLookup[];
  culturalCompetencies: CulturalCompetency[];
  insurancePlans: InsurancePlan[];
  isLoading: boolean;
  error: string | null;
  partialLoadFailures: string[];
}

const DEFAULT_LOOKUPS: ProviderLookups = {
  providerTypes: [],
  specialties: [],
  conditionSpecialties: [],
  approachSpecialties: [],
  populationSpecialties: [],
  languages: [],
  culturalCompetencies: [],
  insurancePlans: [],
  isLoading: true,
  error: null,
  partialLoadFailures: [],
};

const ProviderLookupsContext = createContext<ProviderLookups>(DEFAULT_LOOKUPS);

export const ProviderLookupsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lookups, setLookups] = useState<ProviderLookups>(DEFAULT_LOOKUPS);

  useEffect(() => {
    let cancelled = false;

    const lookupNames = ['providerTypes', 'specialties', 'languages', 'culturalCompetencies', 'insurancePlans'] as const;

    Promise.allSettled([
      getProviderTypes(),
      getSpecialties(),
      getLanguages(),
      getCulturalCompetencies(),
      getInsurancePlans(),
    ]).then((results) => {
      if (cancelled) return;

      const failures: string[] = [];
      const values = results.map((result, i) => {
        if (result.status === 'fulfilled') return result.value;
        console.warn(`[ProviderLookups] Failed to load ${lookupNames[i]}:`, result.reason);
        failures.push(lookupNames[i]);
        return [];
      });

      const [types, specs, langs, comps, plans] = values as [
        ProviderType[], Specialty[], LanguageLookup[], CulturalCompetency[], InsurancePlan[]
      ];

      setLookups({
        providerTypes: types,
        specialties: specs,
        conditionSpecialties: specs.filter(s => s.category === 'condition'),
        approachSpecialties: specs.filter(s => s.category === 'treatment_approach'),
        populationSpecialties: specs.filter(s => s.category === 'population'),
        languages: langs,
        culturalCompetencies: comps,
        insurancePlans: plans,
        isLoading: false,
        error: failures.length === lookupNames.length ? 'Failed to load filter options' : null,
        partialLoadFailures: failures,
      });
    });

    return () => { cancelled = true; };
  }, []);

  return (
    <ProviderLookupsContext.Provider value={lookups}>
      {children}
    </ProviderLookupsContext.Provider>
  );
};

export function useProviderLookups(): ProviderLookups {
  return useContext(ProviderLookupsContext);
}
