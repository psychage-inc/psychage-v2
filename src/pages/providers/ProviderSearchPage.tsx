import React, { useState } from 'react';
import { SlidersHorizontal, AlertTriangle, RefreshCw } from 'lucide-react';
import SEO from '@/components/SEO';
import { useProviderSearch } from '@/hooks/useProviderSearch';
import { ProviderSearchBar } from '@/components/providers/search/ProviderSearchBar';
import { ProviderFilterPanel } from '@/components/providers/search/ProviderFilterPanel';
import { ProviderFilterChips } from '@/components/providers/search/ProviderFilterChips';
import { ProviderResultsGrid } from '@/components/providers/search/ProviderResultsGrid';
import { ProviderSortDropdown } from '@/components/providers/search/ProviderSortDropdown';
import { ProviderResultsEmpty } from '@/components/providers/search/ProviderResultsEmpty';
import { VerificationExplainer } from '@/components/providers/search/VerificationExplainer';
import { VerificationCTA } from '@/components/providers/search/VerificationCTA';
import Button from '@/components/ui/Button';

const US_STATE_ABBRS = new Set([
  'AL','AK','AZ','AR','CA','CO','CT','DE','DC','FL','GA','HI','ID','IL','IN',
  'IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH',
  'NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT',
  'VT','VA','WA','WV','WI','WY',
]);

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

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

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
    (params.verification_status && params.verification_status !== 'all')
  );

  const handleSearch = (query: string, location: string) => {
    let city: string | undefined;
    let state: string | undefined;

    if (location && location !== 'Near me') {
      const trimmed = location.trim();
      if (trimmed.length === 2 && US_STATE_ABBRS.has(trimmed.toUpperCase())) {
        state = trimmed.toUpperCase();
      } else {
        city = trimmed;
      }
    }

    setParams({ query: query || undefined, city, state });
  };

  const handleUseLocation = (lat: number, lng: number) => {
    setParams({ latitude: lat, longitude: lng, radius_miles: 25 });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 pt-28 pb-20">
      <SEO
        title="Find a Provider | Psychage"
        description="Search thousands of verified mental health providers. Filter by specialty, location, insurance, and more."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isLoading ? 'Searching...' : (
                totalCount > 0
                  ? `Showing ${providers.length} of ${totalCount.toLocaleString()} providers`
                  : hasSearched ? 'No results' : '400K+ NPI-verified providers'
              )}
            </p>

            <button
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50"
              >
                <SlidersHorizontal size={16} />
                Filters
                {hasActiveFilters && (
                  <span className="w-2 h-2 rounded-full bg-teal-500" />
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
                      className="px-8 text-teal-600 dark:text-teal-400 border-teal-200 dark:border-teal-800 hover:bg-teal-50 dark:hover:bg-teal-900/20"
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
