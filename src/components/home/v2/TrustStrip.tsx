import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Lock, Shield } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { ease } from '@/lib/animations';

const signals = [
  { icon: BookOpen, label: 'Evidence-based' },
  { icon: Lock, label: '100% private' },
  { icon: Shield, label: '423K+ NPI providers' },
] as const;

const TrustStrip: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  const anim = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true, amount: 0.5 },
        transition: { duration: 0.6, ease: ease.decelerate },
      };

  return (
    <motion.section
      {...anim}
      aria-label="Platform highlights"
      className="py-5 md:py-6 border-y border-[var(--color-border)]/50 bg-white/50 dark:bg-[var(--color-surface)]/40"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-2 md:flex md:justify-center md:items-center gap-4 md:gap-10">
          {signals.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="flex items-center gap-2 justify-center"
              >
                <Icon
                  size={16}
                  className="text-[var(--color-text-tertiary)] flex-shrink-0"
                  aria-hidden="true"
                />
                <span className="text-xs md:text-sm text-[var(--color-text-tertiary)] font-sans whitespace-nowrap">
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default TrustStrip;
