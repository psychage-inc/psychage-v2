import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MapPin,
  Stethoscope,
  ShieldCheck,
  LogIn,
  UserCheck,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Badge from '@/components/ui/Badge';
import { useAuth } from '@/context/AuthContext';
import { useNPIVerification } from '@/hooks/useNPIVerification';
import { getProviderByNPI, claimProvider } from '@/lib/providers/queries';
import type { ProviderWithDetails, NPIVerificationResult } from '@/lib/providers/types';
import { getPrimaryLocation, formatProviderLocation } from '@/lib/providers/types';

type ClaimState = 'input' | 'verified' | 'searching' | 'found' | 'not_found' | 'claiming' | 'claimed' | 'error';

const ProviderClaimForm: React.FC = () => {
  const [npiInput, setNpiInput] = useState('');
  const [claimState, setClaimState] = useState<ClaimState>('input');
  const [matchedProvider, setMatchedProvider] = useState<ProviderWithDetails | null>(null);
  const [npiResult, setNpiResult] = useState<NPIVerificationResult | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const { result, isLoading: npiLoading, verify, reset } = useNPIVerification();
  const { user, isAuthenticated } = useAuth();

  const isValidFormat = /^\d{10}$/.test(npiInput);

  const handleVerify = async () => {
    if (!isValidFormat) return;

    setErrorMessage('');
    const verificationResult = await verify(npiInput);

    if (verificationResult.verified) {
      setNpiResult(verificationResult);
      setClaimState('searching');

      // Look up provider by NPI number directly
      try {
        const match = await getProviderByNPI(npiInput);

        if (match) {
          setMatchedProvider(match);
          setClaimState('found');
        } else {
          setClaimState('not_found');
        }
      } catch {
        setClaimState('not_found');
      }
    }
  };

  const handleClaim = async () => {
    if (!user || !matchedProvider) return;

    setClaimState('claiming');
    setErrorMessage('');

    try {
      const result = await claimProvider(matchedProvider.id, user.id, npiInput);
      if (result.success) {
        setClaimState('claimed');
      } else {
        setErrorMessage(result.error || 'Failed to claim profile.');
        setClaimState('error');
      }
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'An unexpected error occurred.');
      setClaimState('error');
    }
  };

  const handleReset = () => {
    setNpiInput('');
    setClaimState('input');
    setMatchedProvider(null);
    setNpiResult(null);
    setErrorMessage('');
    reset();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setNpiInput(value);
    if (claimState !== 'input') {
      handleReset();
    }
  };

  // --- Auth guard ---
  if (!isAuthenticated) {
    return (
      <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm p-8 text-center">
        <LogIn size={48} className="mx-auto text-gray-300 dark:text-neutral-600 mb-4" />
        <h3 className="font-display font-bold text-xl text-gray-900 dark:text-white mb-2">
          Sign In Required
        </h3>
        <p className="text-gray-500 dark:text-neutral-400 mb-6 max-w-sm mx-auto">
          You need to be signed in to claim a provider profile. This connects
          your account to the listing.
        </p>
        <Link to="/login">
          <Button
            variant="primary"
            className="bg-teal-600 hover:bg-teal-700"
            leftIcon={<LogIn size={16} />}
          >
            Sign In to Continue
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* NPI Input */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm p-6 sm:p-8">
        <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white mb-1">
          Find Your Profile
        </h3>
        <p className="text-sm text-gray-500 dark:text-neutral-400 mb-5">
          Enter your NPI number to locate your existing listing in our directory.
        </p>

        <div className="flex gap-3">
          <div className="flex-1">
            <Input
              id="claim-npi"
              name="claim-npi"
              type="text"
              inputMode="numeric"
              placeholder="Enter 10-digit NPI number"
              value={npiInput}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && isValidFormat && !npiLoading) handleVerify();
              }}
              error={!!result?.error}
              errorMessage={result?.error}
              maxLength={10}
              disabled={claimState === 'claiming' || claimState === 'claimed'}
              aria-label="NPI Number"
            />
          </div>
          <Button
            variant="primary"
            size="md"
            onClick={handleVerify}
            disabled={!isValidFormat || npiLoading || claimState === 'claimed'}
            isLoading={npiLoading}
            leftIcon={!npiLoading ? <Search size={16} /> : undefined}
            className="bg-teal-600 hover:bg-teal-700 flex-shrink-0"
            aria-label="Verify NPI and search"
          >
            Verify
          </Button>
        </div>

        {npiInput.length > 0 && npiInput.length < 10 && claimState === 'input' && (
          <p className="text-xs text-gray-400 dark:text-neutral-500 mt-2">
            {10 - npiInput.length} more digit{10 - npiInput.length !== 1 ? 's' : ''} needed
          </p>
        )}
      </div>

      <AnimatePresence mode="wait">
        {/* NPI Verification result */}
        {npiResult?.verified && claimState !== 'input' && (
          <motion.div
            key="npi-verified"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 size={18} className="text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
                NPI Verified: {npiResult.name}
              </span>
              {npiResult.credentials && (
                <span className="text-sm text-emerald-600 dark:text-emerald-400">
                  , {npiResult.credentials}
                </span>
              )}
            </div>
            {npiResult.taxonomy_description && (
              <div className="flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-300 ml-6">
                <Stethoscope size={14} className="text-emerald-500 flex-shrink-0" />
                <span>{npiResult.taxonomy_description}</span>
              </div>
            )}
          </motion.div>
        )}

        {/* Searching state */}
        {claimState === 'searching' && (
          <motion.div
            key="searching"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-center gap-3 p-5 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800"
          >
            <Loader2 size={20} className="text-teal-600 animate-spin" />
            <span className="text-sm font-medium text-teal-700 dark:text-teal-300">
              Searching for your profile in our directory...
            </span>
          </motion.div>
        )}

        {/* Found provider card */}
        {claimState === 'found' && matchedProvider && (
          <motion.div
            key="found"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="bg-white dark:bg-neutral-900 rounded-2xl border-2 border-teal-200 dark:border-teal-700 shadow-md p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck size={20} className="text-teal-600 dark:text-teal-400" />
              <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white">
                Profile Found
              </h3>
            </div>

            <div className="bg-gray-50 dark:bg-neutral-800/50 rounded-xl p-5 mb-5">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">
                    {matchedProvider.display_name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-display font-bold text-gray-900 dark:text-white">
                    {matchedProvider.display_name}
                    {matchedProvider.credentials_suffix && (
                      <span className="text-gray-400 dark:text-neutral-500 font-medium">, {matchedProvider.credentials_suffix}</span>
                    )}
                  </h4>
                  <Badge variant="teal" className="mt-1">
                    {matchedProvider.provider_type?.label || 'Provider'}
                  </Badge>

                  {matchedProvider.locations.length > 0 && (
                    <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-neutral-400 mt-2">
                      <MapPin size={14} className="flex-shrink-0" />
                      {formatProviderLocation(getPrimaryLocation(matchedProvider))}
                    </div>
                  )}

                  {matchedProvider.specialties.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {matchedProvider.specialties.slice(0, 4).map(spec => (
                        <Badge key={spec.id} variant="neutral">{spec.label}</Badge>
                      ))}
                      {matchedProvider.specialties.length > 4 && (
                        <span className="text-xs text-gray-400 dark:text-neutral-500">
                          +{matchedProvider.specialties.length - 4} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              onClick={handleClaim}
              className="w-full bg-teal-600 hover:bg-teal-700"
              leftIcon={<UserCheck size={18} />}
              aria-label="Claim this profile"
            >
              Claim This Profile
            </Button>
            <p className="text-xs text-gray-400 dark:text-neutral-500 text-center mt-2">
              Claiming connects this listing to your Psychage account.
            </p>
          </motion.div>
        )}

        {/* Claiming in progress */}
        {claimState === 'claiming' && (
          <motion.div
            key="claiming"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-center gap-3 p-5 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800"
          >
            <Loader2 size={20} className="text-teal-600 animate-spin" />
            <span className="text-sm font-medium text-teal-700 dark:text-teal-300">
              Claiming your profile...
            </span>
          </motion.div>
        )}

        {/* Successfully claimed */}
        {claimState === 'claimed' && (
          <motion.div
            key="claimed"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-neutral-900 rounded-2xl border border-emerald-200 dark:border-emerald-800 shadow-sm p-8 text-center"
          >
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} className="text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="font-display font-bold text-xl text-gray-900 dark:text-white mb-2">
              Profile Claimed Successfully
            </h3>
            <p className="text-gray-500 dark:text-neutral-400 max-w-sm mx-auto mb-6">
              Your profile has been claimed and connected to your account. You can now manage
              your listing from the provider dashboard.
            </p>
            <Link to="/provider/dashboard">
              <Button variant="primary" className="bg-teal-600 hover:bg-teal-700">
                Go to Provider Dashboard
              </Button>
            </Link>
          </motion.div>
        )}

        {/* Not found */}
        {claimState === 'not_found' && (
          <motion.div
            key="not-found"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="bg-white dark:bg-neutral-900 rounded-2xl border border-amber-200 dark:border-amber-800 shadow-sm p-6 text-center"
          >
            <AlertCircle size={32} className="mx-auto text-amber-500 mb-3" />
            <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white mb-2">
              No Existing Profile Found
            </h3>
            <p className="text-sm text-gray-500 dark:text-neutral-400 mb-5 max-w-sm mx-auto">
              We could not find a listing matching NPI {npiInput} in our directory.
              You can create a new listing instead.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/for-providers/apply">
                <Button variant="primary" className="bg-teal-600 hover:bg-teal-700">
                  Create a Listing
                </Button>
              </Link>
              <Button variant="outline" onClick={handleReset}>
                Try Another NPI
              </Button>
            </div>
          </motion.div>
        )}

        {/* Error */}
        {claimState === 'error' && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-start gap-3 p-5 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
          >
            <AlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-red-700 dark:text-red-300">
                Claim Failed
              </p>
              <p className="text-sm text-red-600 dark:text-red-400 mt-0.5">
                {errorMessage}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="mt-3"
              >
                Try Again
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProviderClaimForm;
