import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useInfiniteQuery, keepPreviousData } from '@tanstack/react-query';
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
 * Manages provider search state with URL param sync and React Query caching.
 * Back-navigation from provider profiles shows cached results instantly.
 */
export function useProviderSearch(): UseProviderSearchReturn {
  const [searchParams, setSearchParams] = useSearchParams();

  // Parse URL params into ProviderSearchParams
  const params: ProviderSearchParams = useMemo(() => ({
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
  }), [searchParams]);

  // Stable query key derived from filter state (excludes page/per_page — handled by pageParam)
  const queryKey = useMemo(() => ['provider-search', {
    q: params.query,
    specialty: params.specialty_slugs,
    type: params.provider_type_ids,
    lang: params.language_ids,
    comp: params.competency_ids,
    ins: params.insurance_plan_ids,
    state: params.state,
    city: params.city,
    th: params.telehealth,
    ip: params.in_person,
    acc: params.accepting_patients,
    ver: params.verification_status,
    sort: params.sort_by,
  }], [params]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isError,
    error: queryError,
  } = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) =>
      searchProviders({ ...params, page: pageParam, per_page: DEFAULT_PER_PAGE }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.has_more ? lastPage.page + 1 : undefined,
    staleTime: 60_000,
    gcTime: 5 * 60_000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    placeholderData: keepPreviousData,
  });

  // Flatten pages into a single provider array
  const providers = useMemo(
    () => data?.pages.flatMap(p => p.providers) ?? [],
    [data],
  );
  const totalCount = data?.pages[0]?.total_count ?? 0;
  const hasSearched = data !== undefined;

  // Update URL params (same logic as before)
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
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const reset = useCallback(() => {
    setSearchParams({}, { replace: true });
  }, [setSearchParams]);

  return {
    providers,
    totalCount,
    page: data?.pages.length ?? 0,
    hasMore: hasNextPage ?? false,
    isLoading: isFetching && !isFetchingNextPage,
    isLoadingMore: isFetchingNextPage,
    error: isError ? (queryError instanceof Error ? queryError.message : 'Failed to search providers. Please try again.') : null,
    hasSearched,
    params,
    setParams,
    loadMore,
    reset,
  };
}
