import { useEffect, useRef } from 'react';

/**
 * AUTH-017: a11y for auth error alerts.
 *
 * When `error` becomes non-null (or its identity changes from null to
 * non-null, or non-null A to non-null B), moves focus to the alert
 * element via the returned ref. Combine with `role="alert"` +
 * `tabIndex={-1}` on the alert container.
 *
 * Usage:
 *   const alertRef = useAuthErrorFocus(error);
 *   {error && (
 *     <div ref={alertRef} role="alert" tabIndex={-1}>{error}</div>
 *   )}
 *
 * The hook intentionally re-fires whenever `error` changes value — not
 * only on the null → non-null transition. A user who fixes one mistake
 * and submits again, then sees a *different* error, deserves the same
 * announcement and focus move as the first one.
 */
export function useAuthErrorFocus<T extends HTMLElement = HTMLDivElement>(
  error: string | null | undefined,
) {
  const alertRef = useRef<T>(null);

  useEffect(() => {
    if (error && alertRef.current) {
      alertRef.current.focus();
    }
  }, [error]);

  return alertRef;
}
