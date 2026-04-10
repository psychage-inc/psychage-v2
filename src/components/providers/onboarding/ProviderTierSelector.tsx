import React from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Tag,
  Phone,
  Star,
  TrendingUp,
  FileText,
  Camera,
  BarChart3,
  Heart,
  Check,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ProviderTier } from '@/lib/providers/types';

interface ProviderTierSelectorProps {
  value: ProviderTier;
  onChange: (tier: ProviderTier) => void;
  displayOnly?: boolean;
}

interface TierFeature {
  icon: React.ReactNode;
  label: string;
}

const FREE_FEATURES: TierFeature[] = [
  { icon: <User size={16} />, label: 'Basic listing in directory' },
  { icon: <FileText size={16} />, label: 'Name & credentials displayed' },
  { icon: <Tag size={16} />, label: 'Specialty tags' },
  { icon: <Phone size={16} />, label: 'Contact information' },
];

const PREMIUM_FEATURES: TierFeature[] = [
  { icon: <Star size={16} />, label: 'Everything in Free' },
  { icon: <TrendingUp size={16} />, label: 'Priority placement in search' },
  { icon: <FileText size={16} />, label: 'Extended bio & background' },
  { icon: <Camera size={16} />, label: 'Professional photo upload' },
  { icon: <BarChart3 size={16} />, label: 'Analytics dashboard' },
  { icon: <Heart size={16} />, label: 'Cultural competency badges' },
];

const ProviderTierSelector: React.FC<ProviderTierSelectorProps> = ({
  value,
  onChange,
  displayOnly = false,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {/* Free Tier Card */}
      <TierCard
        tier="free"
        title="Free"
        subtitle="Get started at no cost"
        features={FREE_FEATURES}
        isSelected={value === 'free'}
        onSelect={() => onChange('free')}
        displayOnly={displayOnly}
        accentColor="teal"
      />

      {/* Premium Tier Card */}
      <TierCard
        tier="premium"
        title="Premium"
        subtitle="Maximize your visibility"
        features={PREMIUM_FEATURES}
        isSelected={value === 'premium'}
        onSelect={() => onChange('premium')}
        displayOnly={displayOnly}
        accentColor="amber"
      />
    </div>
  );
};

interface TierCardProps {
  tier: ProviderTier;
  title: string;
  subtitle: string;
  features: TierFeature[];
  isSelected: boolean;
  onSelect: () => void;
  displayOnly: boolean;
  accentColor: 'teal' | 'amber';
}

const TierCard: React.FC<TierCardProps> = ({
  title,
  subtitle,
  features,
  isSelected,
  onSelect,
  displayOnly,
  accentColor,
}) => {
  const isPremium = accentColor === 'amber';

  return (
    <motion.button
      type="button"
      onClick={displayOnly ? undefined : onSelect}
      whileHover={displayOnly ? {} : { y: -2 }}
      whileTap={displayOnly ? {} : { scale: 0.99 }}
      disabled={displayOnly}
      className={cn(
        'relative w-full text-left rounded-2xl p-6 border-2 transition-all duration-300',
        'bg-surface',
        displayOnly && 'cursor-default',
        !displayOnly && 'cursor-pointer',
        isSelected && !isPremium &&
          'border-teal-500 dark:border-teal-400 shadow-lg shadow-teal-500/10 ring-1 ring-teal-500/20',
        isSelected && isPremium &&
          'border-amber-400 dark:border-amber-500 shadow-lg shadow-amber-400/10 ring-1 ring-amber-400/20',
        !isSelected &&
          'border-border hover:border-gray-300 dark:hover:border-gray-600',
        isPremium && !isSelected &&
          'border-amber-200 dark:border-amber-800/50'
      )}
      aria-pressed={isSelected}
      aria-label={`Select ${title} tier`}
    >
      {/* Selection indicator */}
      {!displayOnly && (
        <div
          className={cn(
            'absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors',
            isSelected && !isPremium && 'border-teal-500 bg-teal-500',
            isSelected && isPremium && 'border-amber-400 bg-amber-400',
            !isSelected && 'border-gray-300 dark:border-gray-600'
          )}
        >
          {isSelected && <Check size={12} className="text-white" />}
        </div>
      )}

      {/* Premium badge */}
      {isPremium && (
        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 mb-3">
          <Star size={12} className="fill-amber-500 text-amber-500" />
          Recommended
        </div>
      )}

      {/* Title */}
      <h3 className="font-display font-bold text-xl text-text-primary mb-1">
        {title}
      </h3>
      <p className="text-sm text-text-tertiary mb-5">
        {subtitle}
      </p>

      {/* Features list */}
      <ul className="space-y-3" aria-label={`${title} tier features`}>
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-3">
            <span
              className={cn(
                'flex-shrink-0',
                isPremium
                  ? 'text-amber-500 dark:text-amber-400'
                  : 'text-teal-500 dark:text-teal-400'
              )}
            >
              {feature.icon}
            </span>
            <span className="text-sm text-text-secondary">
              {feature.label}
            </span>
          </li>
        ))}
      </ul>
    </motion.button>
  );
};

export default ProviderTierSelector;
