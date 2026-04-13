import React, { useState, useEffect } from 'react';
import { SlidersHorizontal, AlertTriangle, RefreshCw } from 'lucide-react';
import SEO from '@/components/SEO';
import { useProviderSearch } from '@/hooks/useProviderSearch';
import { useProviderLookups } from '@/context/ProviderLookupsContext';
import { parseLocation } from '@/lib/providers/locationUtils';
import { resolveSpecialtySlugs } from '@/lib/providers/specialtyResolver';
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
  } = useProviderSearch();
  const { specialties } = useProviderLookups();

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [dbProviderCount, setDbProviderCount] = useState<number | null>(null);

  useEffect(() => {
    getProviderCount().then(count => {
      if (count > 0) setDbProviderCount(count);
    });
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
    // Parse location into structured city/state fields
    const { city, state } = (location && location !== 'Near me')
      ? parseLocation(location)
      : { city: undefined, state: undefined };

    // Resolve query against specialty labels (cached, no DB call)
    const matchedSlugs = query ? resolveSpecialtySlugs(query, specialties) : [];

    // Merge with any existing specialty_slugs from the filter panel
    const existingSlugs = params.specialty_slugs || [];
    const mergedSlugs = matchedSlugs.length > 0
      ? [...new Set([...existingSlugs, ...matchedSlugs])]
      : existingSlugs.length > 0 ? existingSlugs : undefined;

    // If query matches specialties, use specialty_slugs only (not p_query)
    // to avoid the RPC's AND between text search and specialty filter
    setParams({
      query: matchedSlugs.length > 0 ? undefined : (query || undefined),
      city,
      state,
      specialty_slugs: mergedSlugs?.length ? mergedSlugs : undefined,
    });
  };

  const handleUseLocation = (lat: number, lng: number) => {
    setParams({ latitude: lat, longitude: lng, radius_miles: 25 });
  };

  return (
    <div className="min-h-screen bg-background pt-28 pb-20">
      <SEO
        title="Find a Provider | Psychage"
        description="Search thousands of verified mental health providers. Filter by specialty, location, insurance, and more."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="sr-only">Find a Mental Health Provider</h1>
        {/* Search Bar */}
        <div className="mb-6">
          <ProviderSearchBar
            initialQuery={params.query || ''}
            initialLocation={params.city || params.state || ''}
            onSearch={handleSearch}
            onUseLocation={handleUseLocation}
          />
        </div>

        {/* Verification Explainer */}
        <div className="mb-6">
          <VerificationExplainer />
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-6 flex items-center gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
            <AlertTriangle size={18} className="text-amber-600 dark:text-amber-400 flex-shrink-0" />
            <p className="text-sm text-amber-700 dark:text-amber-300 flex-1">{error}</p>
            <button
              onClick={() => setParams({})}
              className="flex items-center gap-1.5 text-xs font-medium text-amber-700 dark:text-amber-300 hover:text-amber-800 dark:hover:text-amber-200 transition-colors"
            >
              <RefreshCw size={14} />
              Retry
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
            <p className="text-sm text-text-tertiary">
              {isLoading ? 'Searching...' : (
                totalCount > 0
                  ? `Showing ${providers.length} of ${totalCount.toLocaleString()} providers`
                  : hasSearched
                    ? 'No results'
                    : dbProviderCount
                      ? `${dbProviderCount.toLocaleString()} NPI-verified providers`
                      : 'Search our provider directory'
              )}
            </p>

            <button
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 px-3 py-2 text-sm font-medium text-text-secondary bg-surface border border-border rounded-lg hover:bg-surface-hover"
              >
                <SlidersHorizontal size={16} />
                Filters
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
                      Load more providers
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
