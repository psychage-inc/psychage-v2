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
  Crown,
  Sparkles,
  Video,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ProviderTier } from '@/lib/provider-tier';

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
  { icon: <ShieldCheck size={16} />, label: 'NPI verification' },
];

const PRO_FEATURES: TierFeature[] = [
  { icon: <Star size={16} />, label: 'Everything in Free' },
  { icon: <TrendingUp size={16} />, label: 'Priority search placement' },
  { icon: <FileText size={16} />, label: 'Extended bio (1,500 chars)' },
  { icon: <Camera size={16} />, label: 'Up to 3 profile photos' },
  { icon: <BarChart3 size={16} />, label: 'Analytics dashboard' },
  { icon: <MessageSquare size={16} />, label: 'View & respond to reviews' },
  { icon: <Heart size={16} />, label: 'Cultural competency badges' },
];

const ELITE_FEATURES: TierFeature[] = [
  { icon: <Crown size={16} />, label: 'Everything in Pro' },
  { icon: <Sparkles size={16} />, label: 'Psychage Certified eligible' },
  { icon: <TrendingUp size={16} />, label: 'Top search placement' },
  { icon: <FileText size={16} />, label: 'Rich text bio (3,000 chars)' },
  { icon: <Camera size={16} />, label: '5 photos + video intro' },
  { icon: <Video size={16} />, label: 'Availability calendar' },
  { icon: <BarChart3 size={16} />, label: 'Competitor benchmarking' },
];

const ProviderTierSelector: React.FC<ProviderTierSelectorProps> = ({
  value,
  onChange,
  displayOnly = false,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <TierCard
        tier="free"
        title="Free"
        subtitle="Get started at no cost"
        price={null}
        features={FREE_FEATURES}
        isSelected={value === 'free'}
        onSelect={() => onChange('free')}
        displayOnly={displayOnly}
        accentColor="teal"
      />

      <TierCard
        tier="pro"
        title="Pro"
        subtitle="Grow your practice"
        price="$50/mo"
        features={PRO_FEATURES}
        isSelected={value === 'pro'}
        onSelect={() => onChange('pro')}
        displayOnly={displayOnly}
        accentColor="teal"
        recommended
      />

      <TierCard
        tier="elite"
        title="Elite"
        subtitle="Maximum visibility"
        price="$120/mo"
        features={ELITE_FEATURES}
        isSelected={value === 'elite'}
        onSelect={() => onChange('elite')}
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
  price: string | null;
  features: TierFeature[];
  isSelected: boolean;
  onSelect: () => void;
  displayOnly: boolean;
  accentColor: 'teal' | 'amber';
  recommended?: boolean;
}

const TierCard: React.FC<TierCardProps> = ({
  title,
  subtitle,
  price,
  features,
  isSelected,
  onSelect,
  displayOnly,
  accentColor,
  recommended,
}) => {
  const isAmber = accentColor === 'amber';

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
        recommended && !isSelected && 'scale-[1.02]',
        isSelected && !isAmber &&
          'border-teal-500 dark:border-teal-400 shadow-lg shadow-teal-500/10 ring-1 ring-teal-500/20',
        isSelected && isAmber &&
          'border-amber-400 dark:border-amber-500 shadow-lg shadow-amber-400/10 ring-1 ring-amber-400/20',
        !isSelected && !isAmber &&
          'border-border hover:border-gray-300 dark:hover:border-gray-600',
        !isSelected && isAmber &&
          'border-amber-200 dark:border-amber-800/50 hover:border-amber-300 dark:hover:border-amber-700'
      )}
      aria-pressed={isSelected}
      aria-label={`Select ${title} tier`}
    >
      {/* Selection indicator */}
      {!displayOnly && (
        <div
          className={cn(
            'absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors',
            isSelected && !isAmber && 'border-teal-500 bg-teal-500',
            isSelected && isAmber && 'border-amber-400 bg-amber-400',
            !isSelected && 'border-gray-300 dark:border-gray-600'
          )}
        >
          {isSelected && <Check size={12} className="text-white" />}
        </div>
      )}

      {/* Recommended badge */}
      {recommended && (
        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 mb-3">
          <Star size={12} className="fill-teal-500 text-teal-500" />
          Most Popular
        </div>
      )}

      {/* Elite badge */}
      {isAmber && !recommended && (
        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 mb-3">
          <Crown size={12} className="fill-amber-500 text-amber-500" />
          Premium
        </div>
      )}

      {/* Title + Price */}
      <h3 className="font-display font-bold text-xl text-text-primary mb-1">
        {title}
      </h3>
      {price && (
        <p className="text-lg font-semibold text-text-primary mb-1">{price}</p>
      )}
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
                isAmber
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
