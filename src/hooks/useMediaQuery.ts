import { useState, useEffect } from 'react';

// Shared "narrow mobile" breakpoint (1px below Tailwind's sm:640) used by the
// JS-side responsive switches that can't be expressed with a Tailwind variant.
export const MOBILE_NARROW_QUERY = '(max-width: 639px)';

export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(() =>
        typeof window !== 'undefined' ? window.matchMedia(query).matches : false
    );

    useEffect(() => {
        const mql = window.matchMedia(query);
        const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
        mql.addEventListener('change', handler);
        setMatches(mql.matches);
        return () => mql.removeEventListener('change', handler);
    }, [query]);

    return matches;
}
