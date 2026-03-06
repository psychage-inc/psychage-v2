import React from 'react';
import { ShieldCheck, CircleDot } from 'lucide-react';
import type { ProviderStatus } from '@/lib/providers/types';

interface VerificationBadgeProps {
  status: ProviderStatus;
  verifiedAt: string | null;
  size?: 'sm' | 'md';
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({ status, verifiedAt, size = 'md' }) => {
  const isVerified = verifiedAt != null || status === 'verified' || status === 'active';
  const iconSize = size === 'sm' ? 12 : 14;

  if (isVerified) {
    return (
      <span className={`inline-flex items-center gap-1 font-semibold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20 rounded-full ${
        size === 'sm' ? 'text-[10px] px-1.5 py-0.5' : 'text-xs px-2 py-0.5'
      }`}>
        <ShieldCheck size={iconSize} />
        Verified
      </span>
    );
  }

  if (status === 'seeded') {
    return (
      <span className={`inline-flex items-center gap-1 font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-full ${
        size === 'sm' ? 'text-[10px] px-1.5 py-0.5' : 'text-xs px-2 py-0.5'
      }`}>
        <CircleDot size={iconSize} />
        Listed
      </span>
    );
  }

  return null;
};
