import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, SlidersHorizontal, Search } from 'lucide-react';
import { useProviderFilters } from '@/hooks/useProviderFilters';
import type { ProviderSearchParams } from '@/lib/providers/types';
import Button from '@/components/ui/Button';

interface ProviderFilterPanelProps {
  params: ProviderSearchParams;
  onChange: (params: Partial<ProviderSearchParams>) => void;
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','DC','FL','GA','HI','ID','IL','IN',
  'IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH',
  'NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT',
  'VT','VA','WA','WV','WI','WY',
];

export const ProviderFilterPanel: React.FC<ProviderFilterPanelProps> = ({
  params,
  onChange,
  isMobile = false,
  isOpen = true,
  onClose,
}) => {
  const { filters, isLoading } = useProviderFilters();
  const [showMore, setShowMore] = useState(false);
  const [specialtySearch, setSpecialtySearch] = useState('');
  const [showAllSpecialties, setShowAllSpecialties] = useState(false);
  const [showAllLanguages, setShowAllLanguages] = useState(false);

  const toggleArrayParam = (key: keyof ProviderSearchParams, value: string) => {
    const current = (params[key] as string[] | undefined) || [];
    const next = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    onChange({ [key]: next.length > 0 ? next : undefined });
  };

  // Group specialties by category, filtered by search
  const filteredSpecialties = useMemo(() => {
    const all = [
      ...filters.conditionSpecialties.map(s => ({ ...s, group: 'Conditions' })),
      ...filters.approachSpecialties.map(s => ({ ...s, group: 'Approaches' })),
      ...filters.populationSpecialties.map(s => ({ ...s, group: 'Populations' })),
    ];
    if (!specialtySearch) return all;
    const q = specialtySearch.toLowerCase();
    return all.filter(s => s.label.toLowerCase().includes(q));
  }, [filters.conditionSpecialties, filters.approachSpecialties, filters.populationSpecialties, specialtySearch]);

  const visibleSpecialties = showAllSpecialties ? filteredSpecialties : filteredSpecialties.slice(0, 8);

  const content = (
    <div className="space-y-6">
      {/* Location */}
      <FilterSection title="Location">
        <select
          value={params.state || ''}
          onChange={e => onChange({ state: e.target.value || undefined })}
          className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          aria-label="Filter by state"
        >
          <option value="">All states</option>
          {US_STATES.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <input
          type="text"
          value={params.city || ''}
          onChange={e => onChange({ city: e.target.value || undefined })}
          placeholder="City name..."
          className="w-full mt-2 px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          aria-label="Filter by city"
        />
      </FilterSection>

      {/* Provider Type */}
      <FilterSection title="Provider Type">
        {filters.providerTypes.map(type => (
          <CheckboxItem
            key={type.id}
            label={type.label}
            checked={(params.provider_type_ids || []).includes(type.id)}
            onChange={() => toggleArrayParam('provider_type_ids', type.id)}
          />
        ))}
      </FilterSection>

      {/* Specialty — searchable, grouped */}
      <FilterSection title="Specialty">
        <div className="relative mb-2">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={specialtySearch}
            onChange={e => setSpecialtySearch(e.target.value)}
            placeholder="Search specialties..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            aria-label="Search specialties"
          />
        </div>
        {visibleSpecialties.map(spec => (
          <CheckboxItem
            key={spec.id}
            label={spec.label}
            sublabel={spec.group}
            checked={(params.specialty_slugs || []).includes(spec.slug)}
            onChange={() => {
              const current = params.specialty_slugs || [];
              const next = current.includes(spec.slug)
                ? current.filter(s => s !== spec.slug)
                : [...current, spec.slug];
              onChange({ specialty_slugs: next.length > 0 ? next : undefined });
            }}
          />
        ))}
        {filteredSpecialties.length > 8 && (
          <button
            onClick={() => setShowAllSpecialties(!showAllSpecialties)}
            className="text-xs font-medium text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 mt-1"
          >
            {showAllSpecialties ? 'Show fewer' : `Show all ${filteredSpecialties.length}`}
          </button>
        )}
      </FilterSection>

      {/* Session Format */}
      <FilterSection title="Session Format">
        <CheckboxItem
          label="Telehealth available"
          checked={params.telehealth === true}
          onChange={() => onChange({ telehealth: params.telehealth ? undefined : true })}
        />
        <CheckboxItem
          label="In-person available"
          checked={params.in_person === true}
          onChange={() => onChange({ in_person: params.in_person ? undefined : true })}
        />
        <CheckboxItem
          label="Accepting new patients"
          checked={params.accepting_patients === true}
          onChange={() => onChange({ accepting_patients: params.accepting_patients ? undefined : true })}
        />
      </FilterSection>

      {/* Language */}
      <FilterSection title="Language">
        {(showAllLanguages ? filters.languages : filters.languages.slice(0, 6)).map(lang => (
          <CheckboxItem
            key={lang.id}
            label={lang.label}
            checked={(params.language_ids || []).includes(lang.id)}
            onChange={() => toggleArrayParam('language_ids', lang.id)}
          />
        ))}
        {filters.languages.length > 6 && (
          <button
            onClick={() => setShowAllLanguages(!showAllLanguages)}
            className="text-xs font-medium text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 mt-1"
          >
            {showAllLanguages ? 'Show fewer' : `Show all ${filters.languages.length}`}
          </button>
        )}
      </FilterSection>

      {/* More Filters */}
      <button
        onClick={() => setShowMore(!showMore)}
        className="flex items-center gap-2 text-sm font-medium text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
      >
        <ChevronDown size={16} className={`transition-transform ${showMore ? 'rotate-180' : ''}`} />
        {showMore ? 'Fewer filters' : 'More filters'}
      </button>

      <AnimatePresence>
        {showMore && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="space-y-6 overflow-hidden"
          >
            {/* Cultural Competency */}
            <FilterSection title="Cultural Competency">
              {filters.culturalCompetencies.map(comp => (
                <CheckboxItem
                  key={comp.id}
                  label={comp.label}
                  checked={(params.competency_ids || []).includes(comp.id)}
                  onChange={() => toggleArrayParam('competency_ids', comp.id)}
                />
              ))}
            </FilterSection>

            {/* Insurance */}
            <FilterSection title="Insurance">
              {filters.insurancePlans.slice(0, 15).map(plan => (
                <CheckboxItem
                  key={plan.id}
                  label={`${plan.carrier}: ${plan.name}`}
                  checked={(params.insurance_plan_ids || []).includes(plan.id)}
                  onChange={() => toggleArrayParam('insurance_plan_ids', plan.id)}
                />
              ))}
            </FilterSection>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  // Mobile: slide-up drawer
  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={onClose}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 rounded-t-3xl z-50 max-h-[80vh] flex flex-col"
            >
              <div className="flex items-center justify-between p-6 pb-0">
                <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white">Filters</h3>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    ))}
                  </div>
                ) : content}
              </div>
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <Button
                  onClick={onClose}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold"
                >
                  Show results
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }

  // Desktop: sidebar
  return (
    <aside className="w-[280px] flex-shrink-0 hidden">{/* Hidden: re-enable when filters are refined */}
      <div className="sticky top-28 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 max-h-[calc(100vh-8rem)] overflow-y-auto">
        <h3 className="font-display font-bold text-sm text-gray-900 dark:text-white mb-5 flex items-center gap-2">
          <SlidersHorizontal size={16} />
          Filters
        </h3>
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            ))}
          </div>
        ) : content}
      </div>
    </aside>
  );
};

// --- Sub-components ---

const FilterSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div>
    <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">{title}</h4>
    <div className="space-y-2">{children}</div>
  </div>
);

const CheckboxItem: React.FC<{ label: string; sublabel?: string; checked: boolean; onChange: () => void }> = ({ label, sublabel, checked, onChange }) => (
  <label className="flex items-center gap-2.5 cursor-pointer group">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-teal-600 focus:ring-teal-500 focus:ring-offset-0"
    />
    <span className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
      {label}
      {sublabel && (
        <span className="text-[10px] text-gray-400 dark:text-gray-500 ml-1">({sublabel})</span>
      )}
    </span>
  </label>
);

export default ProviderFilterPanel;
