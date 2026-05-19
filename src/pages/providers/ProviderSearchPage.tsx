import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SlidersHorizontal, AlertTriangle, RefreshCw, Info, Globe } from 'lucide-react';
import SEO from '@/components/SEO';
import { useProviderSearch } from '@/hooks/useProviderSearch';
import { useProviderLookups } from '@/context/ProviderLookupsContext';
import { parseLocation } from '@/lib/providers/locationUtils';
import { resolveSpecialtyQuery } from '@/lib/providers/specialtyResolver';
import { resolveProviderTypeQuery } from '@/lib/providers/providerTypeResolver';
import { getProviderCount } from '@/lib/providers/queries';
import { ProviderSearchBar } from '@/components/providers/search/ProviderSearchBar';
import { ProviderFilterPanel } from '@/components/providers/search/ProviderFilterPanel';
import { ProviderFilterChips } from '@/components/providers/search/ProviderFilterChips';
import { ProviderResultsGrid } from '@/components/providers/search/ProviderResultsGrid';
import { ProviderSortDropdown } from '@/components/providers/search/ProviderSortDropdown';
import { ProviderResultsEmpty } from '@/components/providers/search/ProviderResultsEmpty';
import { VerificationExplainer } from '@/components/providers/search/VerificationExplainer';
import { VerificationCTA } from '@/components/providers/search/VerificationCTA';
import Button from '@/components/ui/Button';

const ProviderSearchPage: React.FC = () => {
  const { t } = useTranslation();
  const {
    providers,
    totalCount,
    hasMore,
    isLoading,
    isLoadingMore,
    error,
    hasSearched,
    params,
    setParams,
    loadMore,
    reset,
    droppedFilters,
  } = useProviderSearch();
  const { specialties, providerTypes } = useProviderLookups();

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [dbProviderCount, setDbProviderCount] = useState<number | null>(null);

  useEffect(() => {
    let isCancelled = false;
    getProviderCount().then(count => {
      if (!isCancelled && count > 0) setDbProviderCount(count);
    });
    return () => { isCancelled = true; };
  }, []);

  const hasActiveFilters = !!(
    params.query ||
    params.specialty_slugs?.length ||
    params.provider_type_ids?.length ||
    params.language_ids?.length ||
    params.competency_ids?.length ||
    params.insurance_plan_ids?.length ||
    params.telehealth ||
    params.in_person ||
    params.accepting_patients ||
    params.state ||
    params.city ||
    params.verification_status
  );

  const handleSearch = (query: string, location: string) => {
    // Each new search REPLACES location, specialty, and provider-type filters.
    // Passing '' / [] clears the URL param (setParams treats falsy-but-defined
    // as delete), so typing "Denver" alone wipes any stale state.
    const parsed = (location && location !== 'Near me')
      ? parseLocation(location)
      : {};

    // Resolve profession keywords first ("psychologist" → provider_type_id),
    // then specialty keywords on the residual ("anxiety" → specialty slug).
    const { typeIds, residual: afterTypes } = query
      ? resolveProviderTypeQuery(query, providerTypes)
      : { typeIds: [], residual: '' };

    const { slugs: matchedSlugs, residual: afterSpecialties } = afterTypes
      ? resolveSpecialtyQuery(afterTypes, specialties)
      : { slugs: [], residual: '' };

    setParams({
      query: afterSpecialties.trim(),
      city: parsed.city ?? '',
      state: parsed.state ?? '',
      specialty_slugs: matchedSlugs.length > 0 ? matchedSlugs : [],
      provider_type_ids: typeIds.length > 0 ? typeIds : [],
    });
  };

  const handleUseLocation = (lat: number, lng: number) => {
    setParams({ latitude: lat, longitude: lng, radius_miles: 25 });
  };

  return (
    <div className="min-h-screen bg-background pt-28 pb-20">
      <SEO
        title={`${t('providers.search.title')} | Psychage`}
        description={t('providers.search.seo_description')}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="sr-only">{t('providers.search.title')}</h1>
        {/* Search Bar */}
        <div className="mb-6">
          <ProviderSearchBar
            initialQuery={params.query || ''}
            initialLocation={[params.city, params.state].filter(Boolean).join(', ')}
            onSearch={handleSearch}
            onUseLocation={handleUseLocation}
          />
        </div>

        {/* US-only indicator */}
        <div className="flex items-center gap-2 text-xs text-text-tertiary mb-4">
          <Globe size={14} className="flex-shrink-0" />
          <span>{t('providers.banner.us_only')}</span>
        </div>

        {/* Verification Explainer */}
        <div className="mb-6">
          <VerificationExplainer />
        </div>

        {/* Error Banner */}
        {error && (
          <div role="alert" className="mb-6 flex items-center gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
            <AlertTriangle size={18} className="text-amber-600 dark:text-amber-400 flex-shrink-0" />
            <p className="text-sm text-amber-700 dark:text-amber-300 flex-1">{error}</p>
            <button
              onClick={() => setParams({})}
              className="flex items-center gap-1.5 text-xs font-medium text-amber-700 dark:text-amber-300 hover:text-amber-800 dark:hover:text-amber-200 transition-colors"
            >
              <RefreshCw size={14} />
              {t('providers.search.retry')}
            </button>
          </div>
        )}

        {/* Filter Chips */}
        {hasActiveFilters && (
          <div className="mb-4">
            <ProviderFilterChips
              params={params}
              onChange={setParams}
              onClearAll={reset}
            />
          </div>
        )}

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-sm text-text-tertiary" aria-live="polite" aria-atomic="true">
                {isLoading ? t('providers.search.searching') : (
                  totalCount > 0
                    ? t('providers.search.showing_results', { shown: providers.length, total: totalCount.toLocaleString() })
                    : hasSearched
                      ? t('providers.search.no_results')
                      : dbProviderCount
                        ? t('providers.search.npi_count', { count: dbProviderCount.toLocaleString() } as Record<string, unknown>)
                        : t('providers.search.default_prompt')
                )}
              </p>
              {(!params.sort_by || params.sort_by === 'relevance') && providers.length > 0 && !isLoading && (
                <p className="text-xs text-text-tertiary mt-0.5 flex items-center gap-1">
                  <Info size={12} className="flex-shrink-0" />
                  {t('providers.search.sort_notice')}
                </p>
              )}
              {droppedFilters?.includes('state') && params.city && params.state && !isLoading && (
                <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5 flex items-center gap-1">
                  <Info size={12} className="flex-shrink-0" />
                  No matches for "{params.city}" in {params.state}. Showing all "{params.city}" providers.
                </p>
              )}
            </div>

            <button
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 px-3 py-2 text-sm font-medium text-text-secondary bg-surface border border-border rounded-lg hover:bg-surface-hover"
              >
                <SlidersHorizontal size={16} />
                {t('providers.search.filters')}
                {hasActiveFilters && (
                  <span className="w-2 h-2 rounded-full bg-primary" />
                )}
              </button>
          </div>

          <ProviderSortDropdown
            value={params.sort_by || 'relevance'}
            onChange={(sort) => setParams({ sort_by: sort })}
            showDistance={params.latitude != null}
          />
        </div>

        {/* Main Layout */}
        <div className="flex gap-8">
          <ProviderFilterPanel
              params={params}
              onChange={setParams}
            />

          <ProviderFilterPanel
              params={params}
              onChange={setParams}
              isMobile={true}
              isOpen={mobileFiltersOpen}
              onClose={() => setMobileFiltersOpen(false)}
            />

          {/* Results */}
          <div className="flex-1 min-w-0">
            {!isLoading && hasSearched && providers.length === 0 ? (
              <ProviderResultsEmpty
                onClearFilters={reset}
                hasFilters={hasActiveFilters}
                params={params}
                onRemoveFilter={setParams}
              />
            ) : (
              <>
                <ProviderResultsGrid
                  providers={providers}
                  isLoading={isLoading}
                />

                {/* Load More */}
                {hasMore && !isLoading && (
                  <div className="flex justify-center mt-8">
                    <Button
                      variant="outline"
                      onClick={loadMore}
                      isLoading={isLoadingMore}
                      className="px-8 text-primary border-primary/20 hover:bg-primary/5"
                    >
                      {t('providers.search.load_more')}
                    </Button>
                  </div>
                )}

                {/* Provider CTA */}
                {providers.length > 0 && !isLoading && <VerificationCTA />}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderSearchPage;
