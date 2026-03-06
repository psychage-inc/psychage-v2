import React from 'react';

export const ProviderCardSkeleton: React.FC = () => (
  <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm animate-pulse">
    {/* Header */}
    <div className="flex items-start gap-4 mb-3">
      <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0" />
      <div className="flex-1">
        <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-1.5" />
        <div className="h-3.5 w-1/3 bg-gray-200 dark:bg-gray-700 rounded mb-1.5" />
        <div className="flex gap-2">
          <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
        </div>
      </div>
    </div>

    {/* Specialty tags */}
    <div className="mb-3">
      <div className="h-2.5 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
      <div className="flex gap-1.5">
        <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
        <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full" />
        <div className="h-6 w-14 bg-gray-200 dark:bg-gray-700 rounded-full" />
      </div>
    </div>

    {/* Details grid */}
    <div className="grid grid-cols-2 gap-2 mb-3">
      <div className="h-3.5 w-full bg-gray-200 dark:bg-gray-700 rounded" />
      <div className="h-3.5 w-full bg-gray-200 dark:bg-gray-700 rounded" />
      <div className="h-3.5 w-full bg-gray-200 dark:bg-gray-700 rounded" />
      <div className="h-3.5 w-full bg-gray-200 dark:bg-gray-700 rounded" />
    </div>

    {/* Bio */}
    <div className="space-y-1.5 mb-3">
      <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded" />
      <div className="h-3 w-2/3 bg-gray-200 dark:bg-gray-700 rounded" />
    </div>

    {/* Footer */}
    <div className="pt-3 border-t border-gray-50 dark:border-gray-800 flex items-center justify-between">
      <div className="h-4 w-28 bg-gray-200 dark:bg-gray-700 rounded" />
      <div className="flex gap-1.5">
        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700" />
        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  </div>
);

export default ProviderCardSkeleton;
