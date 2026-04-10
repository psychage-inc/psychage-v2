import { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchProviders } from '@/lib/providers/queries';
import type { ProviderCardData, ProviderSearchParams } from '@/lib/providers/types';

interface UseProviderSearchReturn {
  providers: ProviderCardData[];
  totalCount: number;
  page: number;
  hasMore: boolean;
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
  hasSearched: boolean;
  params: ProviderSearchParams;
  setParams: (params: Partial<ProviderSearchParams>) => void;
  loadMore: () => void;
  reset: () => void;
}

const DEFAULT_PER_PAGE = 20;

/**
 * Manages provider search state with URL param sync, debounced queries, and pagination.
 * Auto-fetches on mount to show providers immediately.
 */
export function useProviderSearch(): UseProviderSearchReturn {
  const [searchParams, setSearchParams] = useSearchParams();
  const [providers, setProviders] = useState<ProviderCardData[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mountedRef = useRef(false);

  // Parse URL params into ProviderSearchParams
  const params: ProviderSearchParams = {
    query: searchParams.get('q') || undefined,
    specialty_slugs: searchParams.get('specialty') ? searchParams.get('specialty')!.split(',') : undefined,
    provider_type_ids: searchParams.get('type') ? searchParams.get('type')!.split(',') : undefined,
    language_ids: searchParams.get('lang') ? searchParams.get('lang')!.split(',') : undefined,
    competency_ids: searchParams.get('comp') ? searchParams.get('comp')!.split(',') : undefined,
    insurance_plan_ids: searchParams.get('insurance') ? searchParams.get('insurance')!.split(',') : undefined,
    state: searchParams.get('state') || undefined,
    city: searchParams.get('city') || undefined,
    telehealth: searchParams.get('telehealth') === 'true' ? true : undefined,
    in_person: searchParams.get('in_person') === 'true' ? true : undefined,
    accepting_patients: searchParams.get('accepting') === 'true' ? true : undefined,
    verification_status: (searchParams.get('verified') as ProviderSearchParams['verification_status']) || undefined,
    sort_by: (searchParams.get('sort') as ProviderSearchParams['sort_by']) || 'relevance',
    per_page: DEFAULT_PER_PAGE,
  };

  // Execute search
  const executeSearch = useCallback(async (searchPage: number, append: boolean) => {
    if (!append) setIsLoading(true);
    else setIsLoadingMore(true);
    setError(null);

    try {
      const result = await searchProviders({
        ...params,
        page: searchPage,
      });

      if (append) {
        setProviders(prev => [...prev, ...result.providers]);
      } else {
        setProviders(result.providers);
      }
      setTotalCount(result.total_count);
      setHasMore(result.has_more);
      setPage(searchPage);
      setHasSearched(true);
    } catch (err) {
      console.error('Provider search error:', err);
      setError('Failed to search providers. Please try again.');
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, [searchParams.toString()]); // eslint-disable-line react-hooks/exhaustive-deps

  // Run search on param change (debounced)
  // Always search on mount to show providers immediately.
  // On subsequent param changes: debounce to avoid excessive requests.
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      // Always search on mount — show all providers by default
      executeSearch(1, false);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      debounceRef.current = null;
      executeSearch(1, false);
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
        debounceRef.current = null;
      }
    };
  }, [executeSearch]);  

  // Update URL params
  const setParams = useCallback((newParams: Partial<ProviderSearchParams>) => {
    const next = new URLSearchParams(searchParams);

    if (newParams.query !== undefined) {
      if (newParams.query) next.set('q', newParams.query);
      else next.delete('q');
    }
    if (newParams.specialty_slugs !== undefined) {
      if (newParams.specialty_slugs?.length) next.set('specialty', newParams.specialty_slugs.join(','));
      else next.delete('specialty');
    }
    if (newParams.provider_type_ids !== undefined) {
      if (newParams.provider_type_ids?.length) next.set('type', newParams.provider_type_ids.join(','));
      else next.delete('type');
    }
    if (newParams.language_ids !== undefined) {
      if (newParams.language_ids?.length) next.set('lang', newParams.language_ids.join(','));
      else next.delete('lang');
    }
    if (newParams.competency_ids !== undefined) {
      if (newParams.competency_ids?.length) next.set('comp', newParams.competency_ids.join(','));
      else next.delete('comp');
    }
    if (newParams.insurance_plan_ids !== undefined) {
      if (newParams.insurance_plan_ids?.length) next.set('insurance', newParams.insurance_plan_ids.join(','));
      else next.delete('insurance');
    }
    if (newParams.state !== undefined) {
      if (newParams.state) next.set('state', newParams.state);
      else next.delete('state');
    }
    if (newParams.city !== undefined) {
      if (newParams.city) next.set('city', newParams.city);
      else next.delete('city');
    }
    if (newParams.telehealth !== undefined) {
      if (newParams.telehealth) next.set('telehealth', 'true');
      else next.delete('telehealth');
    }
    if (newParams.in_person !== undefined) {
      if (newParams.in_person) next.set('in_person', 'true');
      else next.delete('in_person');
    }
    if (newParams.accepting_patients !== undefined) {
      if (newParams.accepting_patients) next.set('accepting', 'true');
      else next.delete('accepting');
    }
    if (newParams.verification_status !== undefined) {
      if (newParams.verification_status) next.set('verified', newParams.verification_status);
      else next.delete('verified');
    }
    if (newParams.sort_by !== undefined) {
      if (newParams.sort_by && newParams.sort_by !== 'relevance') next.set('sort', newParams.sort_by);
      else next.delete('sort');
    }

    setSearchParams(next, { replace: true });
  }, [searchParams, setSearchParams]);

  const loadMore = useCallback(() => {
    if (!isLoadingMore && hasMore) {
      executeSearch(page + 1, true);
    }
  }, [executeSearch, page, hasMore, isLoadingMore]);

  const reset = useCallback(() => {
    setSearchParams({}, { replace: true });
  }, [setSearchParams]);

  return {
    providers,
    totalCount,
    page,
    hasMore,
    isLoading,
    isLoadingMore,
    error,
    hasSearched,
    params,
    setParams,
    loadMore,
    reset,
  };
}
