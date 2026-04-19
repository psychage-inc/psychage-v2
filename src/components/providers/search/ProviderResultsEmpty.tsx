import React from 'react';
import { SearchX } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';

interface ProviderResultsEmptyProps {
  onClearFilters: () => void;
  hasFilters: boolean;
}

export const ProviderResultsEmpty: React.FC<ProviderResultsEmptyProps> = ({
  onClearFilters,
  hasFilters,
}) => (
  <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
    <div className="w-16 h-16 rounded-full bg-surface-active flex items-center justify-center mb-6">
      <SearchX className="w-8 h-8 text-text-tertiary" />
    </div>
    <h2 className="font-display font-bold text-xl text-text-primary mb-2">
      No providers found
    </h2>
    <p className="text-text-tertiary max-w-md mb-6">
      {hasFilters
        ? "We couldn't find any providers matching your filters. Try broadening your search or removing some filters."
        : "We couldn't find any providers matching your search. Try different keywords or browse all providers."}
    </p>
    <Button
      variant="outline"
      onClick={onClearFilters}
      className="text-primary border-primary/20 hover:bg-primary/10"
    >
      {hasFilters ? 'Clear all filters' : 'Browse all providers'}
    </Button>
    <Link
      to="/how-we-verify"
      className="text-xs text-text-tertiary hover:text-teal-600 dark:hover:text-teal-400 mt-4 block transition-colors"
    >
      Learn how we verify providers
    </Link>
  </div>
);

export default ProviderResultsEmpty;
