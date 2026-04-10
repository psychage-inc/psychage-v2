import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMyProvider, updateMyProvider, getDashboardStats, getTrustScore } from '@/services/provider-portal';

// =============================================================================
// React Query hooks for the Provider Portal
// =============================================================================

const portalKeys = {
  myProvider: ['portal', 'my-provider'] as const,
  dashboardStats: (providerId: string) => ['portal', 'dashboard-stats', providerId] as const,
  trustScore: (providerId: string) => ['portal', 'trust-score', providerId] as const,
};

/** Fetch the current user's provider record with all relations */
export function useMyProvider() {
  return useQuery({
    queryKey: portalKeys.myProvider,
    queryFn: getMyProvider,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

/** Mutation to update provider profile fields with cache invalidation */
export function useUpdateProvider() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ providerId, updates }: { providerId: string; updates: Record<string, unknown> }) =>
      updateMyProvider(providerId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: portalKeys.myProvider });
    },
  });
}

/** Fetch 30-day dashboard analytics stats */
export function useDashboardStats(providerId: string | undefined) {
  return useQuery({
    queryKey: portalKeys.dashboardStats(providerId || ''),
    queryFn: () => getDashboardStats(providerId!),
    enabled: !!providerId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/** Fetch trust score for a provider */
export function useTrustScore(providerId: string | undefined) {
  return useQuery({
    queryKey: portalKeys.trustScore(providerId || ''),
    queryFn: () => getTrustScore(providerId!),
    enabled: !!providerId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}
