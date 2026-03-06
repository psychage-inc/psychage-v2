import { useState, useEffect } from 'react';
import { getProviderById } from '@/lib/providers/queries';
import type { ProviderWithDetails } from '@/lib/providers/types';

interface UseProviderProfileReturn {
  provider: ProviderWithDetails | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Fetches a single provider by ID with loading and error states.
 */
export function useProviderProfile(id: string | undefined): UseProviderProfileReturn {
  const [provider, setProvider] = useState<ProviderWithDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProvider = async () => {
    if (!id) {
      setIsLoading(false);
      setError('No provider ID provided');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await getProviderById(id);
      if (result) {
        setProvider(result);
      } else {
        setError('Provider not found');
      }
    } catch (err) {
      console.error('Error fetching provider:', err);
      setError('Failed to load provider profile');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProvider();
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    provider,
    isLoading,
    error,
    refetch: fetchProvider,
  };
}
