import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Info, ChevronDown } from 'lucide-react';

const TIER_CONFIG = [
  {
    key: 'verified',
    icon: ShieldCheck,
    titleKey: 'providers.verification.verified_title',
    descKey: 'providers.verification.verified_desc',
    colors: {
      bg: 'bg-white dark:bg-teal-950/30',
      border: 'border-teal-200/60 dark:border-teal-800/40',
      icon: 'text-teal-700 dark:text-teal-400',
      iconBg: 'bg-teal-50 dark:bg-teal-900/30',
      title: 'text-teal-700 dark:text-teal-300',
    },
  },
  {
    key: 'listed',
    icon: Info,
    titleKey: 'providers.verification.listed_title',
    descKey: 'providers.verification.listed_desc',
    colors: {
      bg: 'bg-white dark:bg-neutral-800/30',
      border: 'border-gray-200/60 dark:border-neutral-700/40',
      icon: 'text-gray-500 dark:text-neutral-400',
      iconBg: 'bg-gray-50 dark:bg-neutral-700/30',
      title: 'text-gray-700 dark:text-neutral-300',
    },
  },
];

export const VerificationExplainer: React.FC = () => {
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const content = (
    <div className="flex flex-col sm:flex-row gap-3">
      {TIER_CONFIG.map((tier) => {
        const Icon = tier.icon;
        return (
          <div
            key={tier.key}
            className={`flex-1 flex items-start gap-3 p-4 rounded-2xl border shadow-sm ${tier.colors.bg} ${tier.colors.border}`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${tier.colors.iconBg}`}>
              <Icon size={16} className={tier.colors.icon} />
            </div>
            <div className="min-w-0">
              <h4 className={`font-semibold text-sm mb-0.5 ${tier.colors.title}`}>
                {t(tier.titleKey)}
              </h4>
              <p className="text-xs text-text-tertiary leading-relaxed">
                {t(tier.descKey)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <>
      {/* Desktop: always visible */}
      <div className="hidden sm:block">{content}</div>

      {/* Mobile: collapsible */}
      <div className="sm:hidden">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center gap-2 text-sm font-medium text-text-tertiary hover:text-text-secondary transition-colors w-full"
        >
          <ShieldCheck size={14} className="text-teal-500" />
          {t('providers.verification.about_toggle')}
          <ChevronDown size={14} className={`ml-auto transition-transform ${mobileOpen ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden mt-3"
            >
              {content}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default VerificationExplainer;
