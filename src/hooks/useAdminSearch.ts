import { useState, useEffect, useRef } from 'react';

export function useAdminSearch(delay = 300) {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const timerRef = useRef<ReturnType<typeof setTimeout>>();

    useEffect(() => {
        timerRef.current = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, delay);

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [searchTerm, delay]);

    const clearSearch = () => {
        setSearchTerm('');
        setDebouncedSearchTerm('');
    };

    return {
        searchTerm,
        debouncedSearchTerm,
        setSearchTerm,
        clearSearch,
    };
}
