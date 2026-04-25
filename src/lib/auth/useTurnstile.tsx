/**
 * AUTH-029 — Cloudflare Turnstile integration helper.
 *
 * Wraps the @marsidev/react-turnstile widget in a hook that returns:
 *   - `widget`: a React node to render in the form
 *   - `token`: the current Turnstile token (null until challenge passes)
 *   - `reset`: clears the token (call after submit so the widget
 *     can re-issue if the user resubmits)
 *
 * If VITE_TURNSTILE_SITE_KEY is unset (dev/CI), the widget is a no-op
 * and `token` returns a stable sentinel string. Server-side enforcement
 * is configured via the Supabase dashboard's Captcha Protection setting
 * — there the absence of a real token will be rejected, so dev/CI
 * environments need that setting OFF.
 */

import { useCallback, useRef, useState } from 'react';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';

export type TurnstileHook = {
  widget: React.ReactNode;
  token: string | null;
  reset: () => void;
};

const DEV_FALLBACK_TOKEN = '__turnstile_disabled__';

export function useTurnstile(): TurnstileHook {
  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;
  const ref = useRef<TurnstileInstance | null>(null);
  const [token, setToken] = useState<string | null>(siteKey ? null : DEV_FALLBACK_TOKEN);

  const reset = useCallback(() => {
    if (ref.current) ref.current.reset();
    setToken(siteKey ? null : DEV_FALLBACK_TOKEN);
  }, [siteKey]);

  if (!siteKey) {
    if (typeof window !== 'undefined' && !(window as typeof window & { __turnstileWarned?: boolean }).__turnstileWarned) {
      console.warn(
        '[turnstile] VITE_TURNSTILE_SITE_KEY not set — using disabled-mode fallback. ' +
          'Configure the key + Supabase dashboard Captcha Protection before production.',
      );
      (window as typeof window & { __turnstileWarned?: boolean }).__turnstileWarned = true;
    }
    return { widget: null, token: DEV_FALLBACK_TOKEN, reset };
  }

  const widget = (
    <Turnstile
      ref={ref}
      siteKey={siteKey}
      onSuccess={(t) => setToken(t)}
      onExpire={() => setToken(null)}
      onError={() => setToken(null)}
      options={{ theme: 'auto', size: 'flexible' }}
    />
  );

  return { widget, token, reset };
}
