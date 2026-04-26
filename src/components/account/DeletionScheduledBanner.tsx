import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from '@tanstack/react-query';
import { AlertTriangle, X } from 'lucide-react';
import { useAccountDeletionStatus } from '@/hooks/useAccountDeletionStatus';
import { privacyService } from '@/services/privacyService';
import { cn } from '@/lib/utils';

/**
 * AUTH-021: app-wide banner shown to users who have a pending account
 * deletion within the 30-day grace window. Renders nothing when no
 * deletion is scheduled.
 *
 * Tone: factual + actionable, not alarming. The user asked for deletion;
 * the banner is information + an easy cancel affordance, not persuasion.
 *
 * Cancel calls privacyService.cancelDeletion() and invalidates the
 * deletion-status query so the banner removes itself on success.
 */
export const DeletionScheduledBanner: React.FC = () => {
  const { t } = useTranslation();
  const { isScheduled, scheduledAt, daysRemaining } = useAccountDeletionStatus();
  const queryClient = useQueryClient();
  const [isCancelling, setIsCancelling] = useState(false);
  const [cancelError, setCancelError] = useState<string | null>(null);

  if (!isScheduled || !scheduledAt) return null;

  const formattedDate = scheduledAt.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const days = daysRemaining ?? 0;
  const bodyKey =
    days <= 0
      ? 'auth.deletion.bannerBodyToday'
      : days === 1
        ? 'auth.deletion.bannerBodyOneDay'
        : 'auth.deletion.bannerBody';

  const handleCancel = async () => {
    setIsCancelling(true);
    setCancelError(null);
    try {
      const ok = await privacyService.cancelDeletion();
      if (!ok) {
        setCancelError(t('auth.deletion.cancelError'));
        return;
      }
      // Force the status hook to refetch so the banner removes.
      await queryClient.invalidateQueries({ queryKey: ['account-deletion-status'] });
    } catch {
      setCancelError(t('auth.deletion.cancelError'));
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'w-full bg-amber-50 dark:bg-amber-900/20 border-b border-amber-200 dark:border-amber-700/40',
        'px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3',
      )}
      data-testid="deletion-scheduled-banner"
    >
      <div className="flex items-start gap-3">
        <AlertTriangle
          className="h-5 w-5 text-amber-700 dark:text-amber-300 mt-0.5 shrink-0"
          aria-hidden="true"
        />
        <div className="text-sm text-amber-900 dark:text-amber-100">
          <p className="font-semibold mb-0.5">{t('auth.deletion.bannerTitle')}</p>
          <p className="text-amber-800 dark:text-amber-200">
            {t(bodyKey, { days, date: formattedDate })}
          </p>
          {cancelError && (
            <p className="text-red-700 dark:text-red-300 mt-1" role="alert">
              {cancelError}
            </p>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={handleCancel}
        disabled={isCancelling}
        className={cn(
          'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-semibold',
          'bg-amber-700 text-white hover:bg-amber-800',
          'dark:bg-amber-600 dark:hover:bg-amber-500',
          'disabled:opacity-50 disabled:cursor-not-allowed transition-colors',
          'shrink-0',
        )}
        aria-label={t('auth.deletion.cancelButton')}
      >
        <X className="h-4 w-4" aria-hidden="true" />
        {isCancelling ? t('auth.common.loading') : t('auth.deletion.cancelButton')}
      </button>
    </div>
  );
};

export default DeletionScheduledBanner;
