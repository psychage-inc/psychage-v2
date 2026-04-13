import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

type FilterValue = string | undefined;

/**
 * Syncs a flat filter object with URL search params.
 * Follows the same pattern as useProviderSearch.ts.
 *
 * Usage:
 *   const [filters, setFilters] = useUrlFilterState({ q: '', category: '', sort: 'latest' });
 *   setFilters({ category: 'anxiety' }); // updates URL: ?category=anxiety&sort=latest
 */
export function useUrlFilterState<T extends Record<string, FilterValue>>(
  defaults: T
): [T, (updates: Partial<T>) => void] {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(() => {
    const result = { ...defaults };
    for (const key of Object.keys(defaults) as (keyof T)[]) {
      const val = searchParams.get(key as string);
      if (val !== null) {
        (result as Record<string, FilterValue>)[key as string] = val;
      }
    }
    return result;
  }, [searchParams, defaults]);

  const setFilters = useCallback(
    (updates: Partial<T>) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          for (const [key, value] of Object.entries(updates)) {
            if (value && value !== defaults[key as keyof T]) {
              next.set(key, value);
            } else {
              next.delete(key);
            }
          }
          return next;
        },
        { replace: true }
      );
    },
    [setSearchParams, defaults]
  );

  return [filters, setFilters];
}
