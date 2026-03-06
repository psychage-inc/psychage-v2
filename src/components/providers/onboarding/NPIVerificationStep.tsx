import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, CheckCircle2, AlertCircle, Loader2, MapPin, Stethoscope } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useNPIVerification } from '@/hooks/useNPIVerification';
import type { NPIVerificationResult } from '@/lib/providers/types';

interface NPIVerificationStepProps {
  onVerified: (result: NPIVerificationResult, npiNumber: string) => void;
  label?: string;
  description?: string;
}

const NPIVerificationStep: React.FC<NPIVerificationStepProps> = ({
  onVerified,
  label = 'NPI Number',
  description = 'Enter your 10-digit National Provider Identifier to verify your credentials.',
}) => {
  const [npiInput, setNpiInput] = useState('');
  const { result, isLoading, verify, reset } = useNPIVerification();

  const isValidFormat = /^\d{10}$/.test(npiInput);

  const handleVerify = async () => {
    if (!isValidFormat) return;
    const verificationResult = await verify(npiInput);
    if (verificationResult.verified) {
      onVerified(verificationResult, npiInput);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setNpiInput(value);
    if (result) {
      reset();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && isValidFormat && !isLoading) {
      handleVerify();
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="npi-input"
          className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1"
        >
          {label}
        </label>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
          {description}
        </p>
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <Input
            id="npi-input"
            name="npi-input"
            type="text"
            inputMode="numeric"
            placeholder="1234567890"
            value={npiInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            error={!!result?.error}
            errorMessage={result?.error}
            maxLength={10}
            aria-label="NPI Number"
          />
        </div>
        <Button
          variant="primary"
          size="md"
          onClick={handleVerify}
          disabled={!isValidFormat || isLoading}
          isLoading={isLoading}
          leftIcon={!isLoading ? <Search size={16} /> : undefined}
          className="bg-teal-600 hover:bg-teal-700 flex-shrink-0"
          aria-label="Verify NPI"
        >
          Verify
        </Button>
      </div>

      {npiInput.length > 0 && npiInput.length < 10 && !result && (
        <p className="text-xs text-gray-400 dark:text-gray-500">
          {10 - npiInput.length} more digit{10 - npiInput.length !== 1 ? 's' : ''} needed
        </p>
      )}

      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-center gap-3 p-4 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800"
          >
            <Loader2 size={20} className="text-teal-600 animate-spin" />
            <span className="text-sm font-medium text-teal-700 dark:text-teal-300">
              Verifying against NPI Registry...
            </span>
          </motion.div>
        )}

        {result?.verified && (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-5"
          >
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 size={20} className="text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
                NPI Verified Successfully
              </span>
            </div>
            <div className="space-y-2.5 ml-7">
              {result.name && (
                <div className="flex items-center gap-2 text-sm text-emerald-800 dark:text-emerald-200">
                  <span className="font-semibold">{result.name}</span>
                  {result.credentials && (
                    <span className="text-emerald-600 dark:text-emerald-400">
                      , {result.credentials}
                    </span>
                  )}
                </div>
              )}
              {result.taxonomy_description && (
                <div className="flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-300">
                  <Stethoscope size={14} className="text-emerald-500 flex-shrink-0" />
                  <span>{result.taxonomy_description}</span>
                </div>
              )}
              {result.address && (
                <div className="flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-300">
                  <MapPin size={14} className="text-emerald-500 flex-shrink-0" />
                  <span>
                    {result.address.address_1}, {result.address.city},{' '}
                    {result.address.state} {result.address.postal_code}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {result && !result.verified && result.error && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-start gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
          >
            <AlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-red-700 dark:text-red-300">
                Verification Failed
              </p>
              <p className="text-sm text-red-600 dark:text-red-400 mt-0.5">
                {result.error}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NPIVerificationStep;
