import React from 'react';
import { motion } from 'framer-motion';
import type { ProviderWithDetails } from '@/lib/providers/types';
import { VerificationBadge } from '@/components/providers/shared/VerificationBadge';
import Badge from '@/components/ui/Badge';

interface ProfileHeaderProps {
  provider: ProviderWithDetails;
}

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ provider }) => {
  const initials = getInitials(provider.display_name);
  const displayName = provider.credentials_suffix
    ? `${provider.display_name}, ${provider.credentials_suffix}`
    : provider.display_name;

  return (
    <motion.div
      className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* Avatar */}
      {provider.photo_url ? (
        <img
          src={provider.photo_url}
          alt={provider.display_name}
          className="h-24 w-24 shrink-0 rounded-full object-cover ring-2 ring-white shadow-lg dark:ring-slate-700 sm:h-28 sm:w-28"
        />
      ) : (
        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-teal-700 text-3xl font-bold text-white shadow-lg ring-2 ring-white dark:ring-slate-700 sm:h-28 sm:w-28 sm:text-4xl">
          {initials}
        </div>
      )}

      {/* Info */}
      <div className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
        <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
          {displayName}
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
          <Badge variant="teal">{provider.provider_type.label}</Badge>
          <VerificationBadge
            status={provider.status}
            verifiedAt={provider.verified_at}
          />
        </div>

        {provider.practice_name && (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {provider.practice_name}
          </p>
        )}

        {provider.npi_number && (
          <p className="text-xs text-slate-400 dark:text-slate-500 font-mono">
            NPI: {provider.npi_number}
          </p>
        )}
      </div>
    </motion.div>
  );
};
