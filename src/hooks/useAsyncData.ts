import { useState, useEffect, useCallback, DependencyList } from 'react';
import { AppError, handleApiError } from '@/utils/errorHandling';

interface AsyncState<T> {
    data: T | null;
    loading: boolean;
    error: AppError | null;
}

interface UseAsyncDataOptions {
    /** Whether to fetch on mount */
    immediate?: boolean;
    /** Callback on success */
    onSuccess?: <T>(data: T) => void;
    /** Callback on error */
    onError?: (error: AppError) => void;
}

export function useAsyncData<T>(
    fetcher: () => Promise<T>,
    deps: DependencyList = [],
    options: UseAsyncDataOptions = {}
): AsyncState<T> & { refetch: () => Promise<void>; reset: () => void } {
    const { immediate = true, onSuccess, onError } = options;

    const [state, setState] = useState<AsyncState<T>>({
        data: null,
        loading: immediate,
        error: null
    });

    const fetchData = useCallback(async (): Promise<void> => {
        setState(prev => ({ ...prev, loading: true, error: null }));

        try {
            const result = await fetcher();
            setState({ data: result, loading: false, error: null });
            onSuccess?.(result);
        } catch (err) {
            const appError = handleApiError(err);
            console.error('Data fetch failed:', appError);
            setState({ data: null, loading: false, error: appError });
            onError?.(appError);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    const reset = useCallback(() => {
        setState({ data: null, loading: false, error: null });
    }, []);

    useEffect(() => {
        if (immediate) {
            fetchData();
        }
    }, [fetchData, immediate]);

    return { ...state, refetch: fetchData, reset };
}
