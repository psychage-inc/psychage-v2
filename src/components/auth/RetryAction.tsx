import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

/**
 * AUTH-014: contextual retry affordance shown next to an auth error.
 *
 * Two render modes:
 *   1. Throttled: `throttledUntil` (epoch ms) is in the future. Renders
 *      a disabled button with a live countdown. When the timer expires,
 *      the button re-enables.
 *   2. Immediate: `throttledUntil` is null/undefined/in-past. Renders an
 *      enabled button that calls `onRetry` on click.
 *
 * Copy is supplied via the `label` prop (already-localized string) — the
 * countdown text is pulled from `auth.retry.resendIn`. Keeping the
 * primary label as a prop lets each call site choose: "Try again",
 * "Reset your password", "Resend", "Try Google again", etc.
 */
export interface RetryActionProps {
  label: string;
  onRetry: () => void;
  throttledUntil?: number | null;
  className?: string;
  variant?: 'primary' | 'secondary' | 'link';
}

const VARIANT_CLASSES: Record<NonNullable<RetryActionProps['variant']>, string> = {
  primary:
    'inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-semibold text-white bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors',
  secondary:
    'inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium text-text-primary bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors',
  link: 'inline-flex items-center text-sm font-medium text-primary hover:text-primary-hover hover:underline disabled:opacity-50 disabled:cursor-not-allowed transition-colors',
};

export const RetryAction: React.FC<RetryActionProps> = ({
  label,
  onRetry,
  throttledUntil,
  className,
  variant = 'primary',
}) => {
  const { t } = useTranslation();
  const [now, setNow] = useState(() => Date.now());
  const remainingMs = throttledUntil ? throttledUntil - now : 0;
  const isThrottled = remainingMs > 0;

  useEffect(() => {
    if (!isThrottled) return;
    const interval = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(interval);
  }, [isThrottled]);

  const seconds = Math.ceil(remainingMs / 1000);
  const display = isThrottled ? t('auth.retry.resendIn', { seconds }) : label;

  return (
    <button
      type="button"
      onClick={onRetry}
      disabled={isThrottled}
      className={cn(VARIANT_CLASSES[variant], className)}
      aria-live={isThrottled ? 'polite' : undefined}
    >
      {display}
    </button>
  );
};

export default RetryAction;
