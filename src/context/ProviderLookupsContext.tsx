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
};

const ProviderLookupsContext = createContext<ProviderLookups>(DEFAULT_LOOKUPS);

export const ProviderLookupsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lookups, setLookups] = useState<ProviderLookups>(DEFAULT_LOOKUPS);

  useEffect(() => {
    let cancelled = false;

    Promise.all([
      getProviderTypes(),
      getSpecialties(),
      getLanguages(),
      getCulturalCompetencies(),
      getInsurancePlans(),
    ]).then(([types, specs, langs, comps, plans]) => {
      if (cancelled) return;
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
      });
    }).catch(() => {
      if (!cancelled) setLookups(prev => ({ ...prev, isLoading: false }));
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
