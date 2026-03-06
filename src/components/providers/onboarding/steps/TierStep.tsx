import React from 'react';
import type { ProviderTier } from '@/lib/providers/types';
import ProviderTierSelector from '../ProviderTierSelector';

interface Props {
  tier: ProviderTier;
  updateTier: (tier: ProviderTier) => void;
}

const TierStep: React.FC<Props> = ({ tier, updateTier }) => (
  <div className="space-y-6">
    <div>
      <h2 className="font-display font-bold text-2xl text-gray-900 dark:text-white mb-2">
        Choose Your Plan
      </h2>
      <p className="text-gray-500 dark:text-gray-400">
        Select the tier that best fits your needs. You can upgrade anytime.
      </p>
    </div>

    <ProviderTierSelector
      value={tier}
      onChange={updateTier}
    />
  </div>
);

export default TierStep;
