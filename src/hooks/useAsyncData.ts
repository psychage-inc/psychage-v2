import { useState, useEffect, useCallback, DependencyList } from 'react';

interface AsyncState<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
}

export function useAsyncData<T>(
    fetcher: () => Promise<T>,
    deps: DependencyList = []
): AsyncState<T> & { refetch: () => void } {
    const [state, setState] = useState<AsyncState<T>>({
        data: null,
        loading: true,
        error: null
    });

    const fetchData = useCallback(async () => {
        let cancelled = false;
        setState(prev => ({ ...prev, loading: true, error: null }));

        try {
            const result = await fetcher();
            if (!cancelled) {
                setState({ data: result, loading: false, error: null });
            }
        } catch (err) {
            // Silent error - just log, don't throw
            console.error('Data fetch failed:', err);
            if (!cancelled) {
                setState({ data: null, loading: false, error: err as Error });
            }
        }

        return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { ...state, refetch: fetchData };
}
