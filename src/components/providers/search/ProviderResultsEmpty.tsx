import React from 'react';
import { SearchX } from 'lucide-react';
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
    <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-6">
      <SearchX className="w-8 h-8 text-gray-400" />
    </div>
    <h3 className="font-display font-bold text-xl text-gray-900 dark:text-white mb-2">
      No providers found
    </h3>
    <p className="text-gray-500 dark:text-gray-400 max-w-md mb-6">
      {hasFilters
        ? "We couldn't find any providers matching your filters. Try broadening your search or removing some filters."
        : "We couldn't find any providers at this time. Please check back later."}
    </p>
    {hasFilters && (
      <Button
        variant="outline"
        onClick={onClearFilters}
        className="text-teal-600 dark:text-teal-400 border-teal-200 dark:border-teal-800 hover:bg-teal-50 dark:hover:bg-teal-900/20"
      >
        Clear all filters
      </Button>
    )}
  </div>
);

export default ProviderResultsEmpty;
