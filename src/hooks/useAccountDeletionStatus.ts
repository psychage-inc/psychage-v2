import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabaseClient';

export interface DeletionStatus {
  isScheduled: boolean;
  scheduledAt: Date | null;
  daysRemaining: number | null;
}

const EMPTY: DeletionStatus = { isScheduled: false, scheduledAt: null, daysRemaining: null };

/**
 * AUTH-021: surfaces `profiles.deletion_scheduled_at` to the app shell so
 * a grace-period banner can render on every page (not only PrivacySettings).
 *
 * Fetched once per authenticated user with a 5-minute stale time — the
 * deletion timestamp doesn't change frequently, and a stale banner that
 * lags by a few minutes is acceptable. The hook also re-runs whenever
 * the user id changes (login/logout).
 *
 * Returns EMPTY for unauthenticated users — the banner only matters when
 * a user is signed in and has a pending deletion.
 */
export function useAccountDeletionStatus(): DeletionStatus & { isLoading: boolean; refetch: () => void } {
  const { user, isAuthenticated } = useAuth();
  const userId = user?.id ?? null;

  const query = useQuery({
    queryKey: ['account-deletion-status', userId],
    queryFn: async (): Promise<DeletionStatus> => {
      if (!userId) return EMPTY;
      const { data, error } = await supabase
        .from('profiles')
        .select('deletion_scheduled_at')
        .eq('id', userId)
        .maybeSingle();
      if (error || !data) return EMPTY;

      const raw = (data as { deletion_scheduled_at?: string | null }).deletion_scheduled_at ?? null;
      if (!raw) return EMPTY;

      const scheduledAt = new Date(raw);
      const now = new Date();
      const ms = scheduledAt.getTime() - now.getTime();
      const days = ms <= 0 ? 0 : Math.ceil(ms / (1000 * 60 * 60 * 24));

      return {
        isScheduled: true,
        scheduledAt,
        daysRemaining: days,
      };
    },
    enabled: isAuthenticated && !!userId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return {
    ...(query.data ?? EMPTY),
    isLoading: query.isLoading,
    refetch: () => {
      void query.refetch();
    },
  };
}
