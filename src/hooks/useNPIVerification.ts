import { useState, useCallback } from 'react';
import { verifyNPI } from '@/lib/providers/npiMappers';
import type { NPIVerificationResult } from '@/lib/providers/types';

interface UseNPIVerificationReturn {
  result: NPIVerificationResult | null;
  isLoading: boolean;
  verify: (npiNumber: string) => Promise<NPIVerificationResult>;
  reset: () => void;
}

/**
 * Hook for verifying NPI numbers against the NPPES registry.
 * Calls the public NPI Registry API directly (no auth required).
 */
export function useNPIVerification(): UseNPIVerificationReturn {
  const [result, setResult] = useState<NPIVerificationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const verify = useCallback(async (npiNumber: string): Promise<NPIVerificationResult> => {
    setIsLoading(true);
    setResult(null);

    try {
      const verificationResult = await verifyNPI(npiNumber);
      setResult(verificationResult);
      return verificationResult;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setIsLoading(false);
  }, []);

  return { result, isLoading, verify, reset };
}
