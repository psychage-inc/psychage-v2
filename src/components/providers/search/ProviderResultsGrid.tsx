import React from 'react';
import type { ProviderCardData } from '@/lib/providers/types';
import { ProviderCard } from '../cards/ProviderCard';
import { ProviderCardSkeleton } from '../cards/ProviderCardSkeleton';

interface ProviderResultsGridProps {
  providers: ProviderCardData[];
  isLoading: boolean;
  skeletonCount?: number;
}

export const ProviderResultsGrid: React.FC<ProviderResultsGridProps> = ({
  providers,
  isLoading,
  skeletonCount = 6,
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <ProviderCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {providers.map(provider => (
        <ProviderCard key={provider.id} provider={provider} />
      ))}
    </div>
  );
};

export default ProviderResultsGrid;
