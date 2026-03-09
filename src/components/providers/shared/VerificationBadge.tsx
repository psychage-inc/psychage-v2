import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import type { ProviderStatus } from '@/lib/providers/types';
import { cn } from '@/lib/utils';

interface VerificationBadgeProps {
  status: ProviderStatus;
  verifiedAt: string | null;
  size?: 'sm' | 'md';
  showTooltip?: boolean;
}

const VERIFIED_TOOLTIP =
  'This provider has been reviewed and approved by the Psychage team. Their credentials and license have been independently verified, and they offer a complete profile with specialties, insurance, languages, and more.';

const LISTED_TOOLTIP =
  "This provider's information is sourced from the U.S. National Provider Identifier (NPI) public registry maintained by the Centers for Medicare & Medicaid Services. They have not been individually reviewed by Psychage. Profile information may be limited.";

export function isProviderVerified(status: ProviderStatus, verifiedAt: string | null): boolean {
  return verifiedAt != null || status === 'verified' || status === 'active';
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({
  status,
  verifiedAt,
  size = 'md',
  showTooltip = true,
}) => {
  const isVerified = isProviderVerified(status, verifiedAt);
  const iconSize = size === 'sm' ? 12 : 14;

  const badge = isVerified ? (
    <span
      className={cn(
        'inline-flex items-center gap-1 font-semibold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20 rounded-full',
        showTooltip && 'cursor-help',
        size === 'sm' ? 'text-[10px] px-1.5 py-0.5' : 'text-xs px-2 py-0.5'
      )}
      role="status"
      aria-label="Psychage Verified provider"
    >
      <ShieldCheck size={iconSize} />
      Psychage Verified
    </span>
  ) : status === 'seeded' ? (
    <span
      className={cn(
        'inline-flex items-center gap-1 font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-full',
        showTooltip && 'cursor-help',
        size === 'sm' ? 'text-[10px] px-1.5 py-0.5' : 'text-xs px-2 py-0.5'
      )}
      role="status"
      aria-label="Publicly Listed provider"
    >
      <Info size={iconSize} />
      Publicly Listed
    </span>
  ) : null;

  if (!badge) return null;
  if (!showTooltip) return badge;

  const tooltipTitle = isVerified ? 'Psychage Verified' : 'Publicly Listed';
  const tooltipText = isVerified ? VERIFIED_TOOLTIP : LISTED_TOOLTIP;

  return (
    <TooltipPrimitive.Provider delayDuration={300}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{badge}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side="bottom"
            sideOffset={8}
            className={cn(
              'z-[150] max-w-xs px-4 py-3 rounded-xl shadow-xl',
              'bg-gray-900/95 backdrop-blur-sm text-white text-xs leading-relaxed',
              'border border-white/10',
              'data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0',
              'data-[state=closed]:animate-out data-[state=closed]:fade-out-0'
            )}
          >
            <p className="font-semibold mb-1 text-[11px]">{tooltipTitle}</p>
            <p>{tooltipText}</p>
            <TooltipPrimitive.Arrow className="fill-gray-900/95" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};
