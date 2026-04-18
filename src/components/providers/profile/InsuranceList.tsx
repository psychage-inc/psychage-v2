import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Shield } from 'lucide-react';
import type { ProviderWithDetails } from '@/lib/providers/types';

interface InsuranceListProps {
  provider: Pick<ProviderWithDetails, 'insurance_plans'>;
}

const INITIAL_COUNT = 5;

export const InsuranceList: React.FC<InsuranceListProps> = ({ provider }) => {
  const [expanded, setExpanded] = useState(false);

  const plans = provider.insurance_plans;
  if (!plans.length) return null;

  const visiblePlans = expanded ? plans : plans.slice(0, INITIAL_COUNT);
  const hasMore = plans.length > INITIAL_COUNT;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white/70 p-6 backdrop-blur-md dark:border-neutral-700 dark:bg-neutral-800/70">
      <h2 className="font-display mb-4 text-lg font-bold text-slate-900 dark:text-white">
        Insurance Accepted
      </h2>

      <ul className="space-y-2">
        {visiblePlans.map((plan) => (
          <li
            key={plan.id}
            className="flex items-center gap-2.5 rounded-lg border border-slate-100 bg-white/60 px-3 py-2.5 dark:border-neutral-600 dark:bg-neutral-700/40"
          >
            <Shield
              size={14}
              className="shrink-0 text-teal-600 dark:text-teal-400"
            />
            <div className="min-w-0">
              <span className="block text-sm font-medium text-slate-700 dark:text-neutral-200">
                {plan.name}
              </span>
              <span className="text-xs text-slate-400 dark:text-neutral-500">
                {plan.carrier}
              </span>
            </div>
          </li>
        ))}
      </ul>

      {hasMore && (
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-teal-600 transition-colors hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300"
        >
          {expanded ? (
            <>
              Show fewer <ChevronUp size={14} />
            </>
          ) : (
            <>
              Show all {plans.length} plans <ChevronDown size={14} />
            </>
          )}
        </button>
      )}

      <p className="mt-4 text-[11px] text-slate-400 dark:text-neutral-500 leading-relaxed">
        Insurance information is provided by the provider and may not reflect current network
        status. Please verify coverage directly with the provider or your insurance company.
      </p>
    </section>
  );
};
