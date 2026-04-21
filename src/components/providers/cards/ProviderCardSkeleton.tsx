import React from 'react';

export const ProviderCardSkeleton: React.FC = () => (
  <div className="bg-surface rounded-2xl p-5 border border-border shadow-sm animate-pulse" aria-busy="true">
    {/* Header */}
    <div className="flex items-start gap-4 mb-3">
      <div className="w-16 h-16 rounded-full bg-surface-hover flex-shrink-0" />
      <div className="flex-1">
        <div className="h-5 w-3/4 bg-surface-hover rounded mb-1.5" />
        <div className="h-3.5 w-1/3 bg-surface-hover rounded mb-1.5" />
        <div className="flex gap-2">
          <div className="h-5 w-16 bg-surface-hover rounded-full" />
        </div>
      </div>
    </div>

    {/* Specialty tags */}
    <div className="mb-3">
      <div className="h-2.5 w-20 bg-surface-hover rounded mb-2" />
      <div className="flex gap-1.5">
        <div className="h-6 w-16 bg-surface-hover rounded-full" />
        <div className="h-6 w-20 bg-surface-hover rounded-full" />
        <div className="h-6 w-14 bg-surface-hover rounded-full" />
      </div>
    </div>

    {/* Details grid */}
    <div className="grid grid-cols-2 gap-2 mb-3">
      <div className="h-3.5 w-full bg-surface-hover rounded" />
      <div className="h-3.5 w-full bg-surface-hover rounded" />
      <div className="h-3.5 w-full bg-surface-hover rounded" />
      <div className="h-3.5 w-full bg-surface-hover rounded" />
    </div>

    {/* Bio */}
    <div className="space-y-1.5 mb-3">
      <div className="h-3 w-full bg-surface-hover rounded" />
      <div className="h-3 w-2/3 bg-surface-hover rounded" />
    </div>

    {/* Footer */}
    <div className="pt-3 border-t border-border flex items-center justify-between">
      <div className="h-4 w-28 bg-surface-hover rounded" />
      <div className="flex gap-1.5">
        <div className="w-8 h-8 rounded-full bg-surface-hover" />
        <div className="w-8 h-8 rounded-full bg-surface-hover" />
      </div>
    </div>
  </div>
);

export default ProviderCardSkeleton;
