import React, { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import SEO from '@/components/SEO';
import { useProviderSearch } from '@/hooks/useProviderSearch';
import { ProviderSearchBar } from '@/components/providers/search/ProviderSearchBar';
import { ProviderFilterPanel } from '@/components/providers/search/ProviderFilterPanel';
import { ProviderFilterChips } from '@/components/providers/search/ProviderFilterChips';
import { ProviderResultsGrid } from '@/components/providers/search/ProviderResultsGrid';
import { ProviderSortDropdown } from '@/components/providers/search/ProviderSortDropdown';
import { ProviderResultsEmpty } from '@/components/providers/search/ProviderResultsEmpty';
import Button from '@/components/ui/Button';

const ProviderSearchPage: React.FC = () => {
  const {
    providers,
    totalCount,
    hasMore,
    isLoading,
    isLoadingMore,
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
    params.city
  );

  const handleSearch = (query: string, _location: string) => {
    setParams({ query: query || undefined });
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
            onSearch={handleSearch}
            onUseLocation={handleUseLocation}
          />
        </div>

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
                !hasSearched
                  ? 'Search or use filters to find providers'
                  : totalCount > 0
                    ? `Showing ${providers.length} of ${totalCount} providers`
                    : 'No results'
              )}
            </p>

            {/* Mobile filter button */}
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
          {/* Desktop Sidebar */}
          <ProviderFilterPanel
            params={params}
            onChange={setParams}
          />

          {/* Mobile Drawer */}
          <ProviderFilterPanel
            params={params}
            onChange={setParams}
            isMobile={true}
            isOpen={mobileFiltersOpen}
            onClose={() => setMobileFiltersOpen(false)}
          />

          {/* Results */}
          <div className="flex-1 min-w-0">
            {!hasSearched && !isLoading ? (
              /* Initial state — no search performed yet */
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 rounded-full bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center mb-4">
                  <Search size={28} className="text-teal-500 dark:text-teal-400" />
                </div>
                <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white mb-2">
                  Find a mental health provider
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
                  Use the search bar above or select filters to browse thousands of verified providers.
                </p>
              </div>
            ) : !isLoading && providers.length === 0 ? (
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderSearchPage;
