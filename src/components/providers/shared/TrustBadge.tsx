import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ShieldCheck, UserCheck, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { TrustBadgeType } from '@/lib/providers/trust-badge';

interface TrustBadgeProps {
  type: TrustBadgeType;
  size?: 'sm' | 'md';
  interactive?: boolean;
  className?: string;
}

const BADGE_CONFIG: Record<
  TrustBadgeType,
  {
    label: string;
    icon: React.ElementType | null;
    ariaLabel: string;
    title: string;
    anchor: string;
    lightClasses: string;
    darkClasses: string;
  }
> = {
  verified: {
    label: 'Verified',
    icon: ShieldCheck,
    ariaLabel: 'Verified provider — credentials confirmed by Psychage',
    title: 'Verified provider — credentials confirmed by Psychage',
    anchor: '#verified',
    lightClasses: 'bg-teal-50 text-teal-700 border border-teal-200',
    darkClasses: 'dark:bg-teal-900/20 dark:text-teal-400 dark:border-teal-800/50',
  },
  claimed: {
    label: 'Claimed',
    icon: UserCheck,
    ariaLabel: 'Claimed profile — managed by this provider',
    title: 'Claimed profile — managed by this provider',
    anchor: '#claimed',
    lightClasses: 'bg-blue-50 text-blue-700 border border-blue-200',
    darkClasses: 'dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800/50',
  },
  unclaimed: {
    label: 'Unclaimed',
    icon: Info,
    ariaLabel: 'Unclaimed profile — data from federal registry, not verified by Psychage',
    title: 'Data from the federal NPI registry. This provider has not claimed their profile.',
    anchor: '#unclaimed',
    lightClasses: 'bg-gray-100 text-gray-600 border border-gray-200',
    darkClasses: 'dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-700',
  },
  featured: {
    label: 'Featured',
    icon: null,
    ariaLabel: 'Featured provider — premium listing',
    title: 'Premium subscription — provider supports the platform',
    anchor: '#featured',
    lightClasses: 'bg-indigo-50 text-indigo-600 border border-indigo-100',
    darkClasses: 'dark:bg-indigo-900/20 dark:text-indigo-400 dark:border-indigo-800/50',
  },
};

export const TrustBadge: React.FC<TrustBadgeProps> = ({
  type,
  size = 'md',
  interactive = true,
  className,
}) => {
  const { t } = useTranslation();
  const config = BADGE_CONFIG[type];
  const Icon = config.icon;
  const iconSize = size === 'sm' ? 12 : 14;
  const label = t(`providers.badge.${type}`);
  const ariaLabel = t(`providers.badge.${type}_aria`);
  const title = t(`providers.badge.${type}_title`);

  const badgeClasses = cn(
    'inline-flex items-center gap-1 whitespace-nowrap rounded-full leading-none font-semibold transition-colors',
    size === 'sm' ? 'text-[10px] px-2 py-1' : 'text-xs px-2.5 py-1',
    config.lightClasses,
    config.darkClasses,
    interactive &&
      'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
    className
  );

  const content = (
    <>
      {Icon && <Icon size={iconSize} aria-hidden="true" />}
      {label}
    </>
  );

  if (interactive) {
    return (
      <Link
        to={`/how-we-verify${config.anchor}`}
        className={badgeClasses}
        aria-label={ariaLabel}
        title={title}
        role="link"
      >
        {content}
      </Link>
    );
  }

  return (
    <span
      className={badgeClasses}
      aria-label={ariaLabel}
      title={title}
      role="status"
    >
      {content}
    </span>
  );
};
