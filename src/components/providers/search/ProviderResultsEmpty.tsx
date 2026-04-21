import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SearchX, Loader2, X as XIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';
import { analyzeFilterBottlenecks } from '@/lib/providers/queries';
import type { FilterBottleneck } from '@/lib/providers/queries';
import type { ProviderSearchParams } from '@/lib/providers/types';

interface ProviderResultsEmptyProps {
  onClearFilters: () => void;
  hasFilters: boolean;
  params?: ProviderSearchParams;
  onRemoveFilter?: (params: Partial<ProviderSearchParams>) => void;
}

export const ProviderResultsEmpty: React.FC<ProviderResultsEmptyProps> = ({
  onClearFilters,
  hasFilters,
  params,
  onRemoveFilter,
}) => {
  const { t } = useTranslation();
  const [bottlenecks, setBottlenecks] = useState<FilterBottleneck[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    if (!hasFilters || !params) {
      setBottlenecks([]);
      return;
    }

    let cancelled = false;
    setIsAnalyzing(true);

    analyzeFilterBottlenecks(params).then(results => {
      if (!cancelled) {
        setBottlenecks(results);
        setIsAnalyzing(false);
      }
    }).catch(() => {
      if (!cancelled) {
        setBottlenecks([]);
        setIsAnalyzing(false);
      }
    });

    return () => { cancelled = true; };
  }, [hasFilters, params]);

  const formatCount = (n: number): string => {
    if (n >= 1000) return `${Math.round(n / 1000)}k+`;
    return String(n);
  };

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-surface-active flex items-center justify-center mb-6">
        <SearchX className="w-8 h-8 text-text-tertiary" />
      </div>
      <h2 className="font-display font-bold text-xl text-text-primary mb-2">
        {t('providers.empty.title')}
      </h2>
      <p className="text-text-tertiary max-w-md mb-6">
        {hasFilters
          ? t('providers.empty.with_filters')
          : t('providers.empty.without_filters')}
      </p>

      {/* Bottleneck Analysis */}
      {hasFilters && isAnalyzing && (
        <div className="flex items-center gap-2 text-sm text-text-tertiary mb-6">
          <Loader2 className="w-4 h-4 animate-spin" />
          {t('providers.empty.analyzing')}
        </div>
      )}

      {hasFilters && !isAnalyzing && bottlenecks.length > 0 && (
        <div className="max-w-md w-full mb-6">
          <p className="text-sm font-medium text-text-secondary mb-3">
            {t('providers.empty.try_removing')}
          </p>
          <div className="space-y-2">
            {bottlenecks.map(b => (
              <button
                key={b.filterKey}
                onClick={() => onRemoveFilter?.(b.removeParams)}
                className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-amber-50 dark:bg-amber-900/15 border border-amber-200 dark:border-amber-800/50 rounded-xl text-left hover:bg-amber-100 dark:hover:bg-amber-900/25 transition-colors group"
              >
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-amber-800 dark:text-amber-300">
                    {b.filterLabel}
                  </span>
                  <span className="text-xs text-amber-600 dark:text-amber-400 ml-2">
                    {t('providers.empty.results_without', { count: formatCount(b.countWithout) } as Record<string, unknown>)}
                  </span>
                </div>
                <XIcon className="w-4 h-4 text-amber-500 dark:text-amber-400 shrink-0 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors" />
              </button>
            ))}
          </div>
        </div>
      )}

      <Button
        variant="outline"
        onClick={onClearFilters}
        className="text-primary border-primary/20 hover:bg-primary/10"
      >
        {hasFilters ? t('providers.empty.clear_all') : t('providers.empty.browse_all')}
      </Button>
      <Link
        to="/how-we-verify"
        className="text-xs text-text-tertiary hover:text-teal-600 dark:hover:text-teal-400 mt-4 block transition-colors"
      >
        {t('providers.empty.learn_verify')}
      </Link>
    </div>
  );
};

export default ProviderResultsEmpty;
