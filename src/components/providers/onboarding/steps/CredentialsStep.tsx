import React from 'react';
import { Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import type { ProviderFilters } from '@/hooks/useProviderFilters';
import NPIVerificationStep from '../NPIVerificationStep';
import type { FormData } from './types';
import { US_STATES } from './types';

interface Props {
  formData: FormData;
  updateField: <K extends keyof FormData>(key: K, value: FormData[K]) => void;
  filters: ProviderFilters;
  filtersLoading: boolean;
}

const CredentialsStep: React.FC<Props> = ({ formData, updateField, filters, filtersLoading }) => (
  <div className="space-y-6">
    <div>
      <h2 className="font-display font-bold text-2xl text-gray-900 dark:text-white mb-2">
        Professional Credentials
      </h2>
      <p className="text-gray-500 dark:text-gray-400">
        Verify your identity and professional standing.
      </p>
    </div>

    {/* NPI Verification (optional) */}
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
      <NPIVerificationStep
        onVerified={(result, npiNumber) => {
          updateField('npiVerification', result);
          updateField('npi_number', npiNumber);
          if (result.name && !formData.display_name) {
            updateField('display_name', result.name);
          }
          if (result.credentials && !formData.credentials_suffix) {
            updateField('credentials_suffix', result.credentials);
          }
        }}
        label="NPI Number (Optional)"
        description="Verifying your NPI helps expedite the review process."
      />
    </div>

    {/* License */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label htmlFor="license_number" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1.5">
          License Number
        </label>
        <Input
          id="license_number"
          name="license_number"
          placeholder="e.g., PSY12345"
          value={formData.license_number}
          onChange={(e) => updateField('license_number', e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="license_state" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1.5">
          License State
        </label>
        <select
          id="license_state"
          value={formData.license_state}
          onChange={(e) => updateField('license_state', e.target.value)}
          className="flex h-11 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-200"
        >
          <option value="">Select state...</option>
          {US_STATES.map(st => (
            <option key={st.value} value={st.value}>{st.label}</option>
          ))}
        </select>
      </div>
    </div>

    {/* Provider Type */}
    <div>
      <label htmlFor="provider_type_id" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1.5">
        Provider Type *
      </label>
      {filtersLoading ? (
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Loader2 size={16} className="animate-spin" /> Loading provider types...
        </div>
      ) : (
        <select
          id="provider_type_id"
          value={formData.provider_type_id}
          onChange={(e) => updateField('provider_type_id', e.target.value)}
          className="flex h-11 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-200"
          required
        >
          <option value="">Select provider type...</option>
          {filters.providerTypes.map(pt => (
            <option key={pt.id} value={pt.id}>{pt.label}</option>
          ))}
        </select>
      )}
    </div>

    {/* Credentials Suffix */}
    <div>
      <label htmlFor="credentials_suffix" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1.5">
        Credentials Suffix *
      </label>
      <Input
        id="credentials_suffix"
        name="credentials_suffix"
        placeholder="e.g., PhD, LCSW, MD"
        value={formData.credentials_suffix}
        onChange={(e) => updateField('credentials_suffix', e.target.value)}
      />
      <p className="text-xs text-gray-400 mt-1">
        These will appear after your name (e.g., "Dr. Smith, PhD, LCSW").
      </p>
    </div>
  </div>
);

export default CredentialsStep;
