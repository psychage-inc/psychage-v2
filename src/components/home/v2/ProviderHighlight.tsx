import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Shield, Search, ArrowRight } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { ease } from '@/lib/animations';
import { SCENES, SCENE_ALT } from './homeImages';
import { cn } from '@/lib/utils';

const highlights = [
  { icon: Shield, label: '423K+ NPI-verified providers' },
  { icon: MapPin, label: 'All 50 US states covered' },
  { icon: Search, label: 'Search by specialty, insurance & language' },
];

const ProviderHighlight: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  const anim = (delay = 0) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.3 },
          transition: { duration: 0.6, delay, ease: ease.decelerate },
        };

  return (
    <section
      aria-label="Provider directory"
      className="py-20 md:py-28 bg-[var(--color-homepage-bg)]"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image — prominent, clean presentation */}
          <motion.div {...anim(0)} className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/10 dark:shadow-black/30">
              <img
                src={SCENES.map}
                alt={SCENE_ALT.map}
                className="w-full h-[320px] md:h-[400px] object-cover brightness-[1.02] dark:brightness-[0.9]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            {/* Floating stat badge */}
            <motion.div
              {...anim(0.3)}
              className="absolute -bottom-4 -right-4 md:bottom-6 md:right-6 bg-white dark:bg-[var(--color-surface)] rounded-2xl px-5 py-3 shadow-lg border border-[var(--color-border)]/50"
            >
              <p className="text-2xl font-bold text-[var(--color-text-primary)]">423K+</p>
              <p className="text-xs text-[var(--color-text-tertiary)]">verified providers</p>
            </motion.div>
          </motion.div>

          {/* Text content */}
          <div>
            <motion.p
              {...anim(0.05)}
              className="uppercase tracking-[0.18em] text-[11px] text-[var(--color-primary)]/55 font-sans font-medium mb-4"
            >
              Provider Directory
            </motion.p>
            <motion.h2
              {...anim(0.1)}
              className={cn(
                'font-display font-bold leading-[1.15] tracking-tight',
                'text-2xl md:text-3xl lg:text-[2.2rem]',
                'text-[var(--color-text-primary)]'
              )}
            >
              When you're ready for professional support
            </motion.h2>

            <motion.div {...anim(0.2)} className="mt-6 space-y-3">
              {highlights.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-gray-100 dark:bg-gray-800">
                      <Icon size={16} className="text-gray-500 dark:text-gray-400" />
                    </div>
                    <span className="text-sm text-[var(--color-text-secondary)]">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </motion.div>

            <motion.div {...anim(0.3)} className="mt-8">
              <Link
                to="/providers"
                className={cn(
                  'inline-flex items-center gap-2',
                  'bg-[var(--color-primary)] text-white',
                  'font-semibold text-[15px]',
                  'py-3.5 px-7 rounded-2xl',
                  'hover:bg-[var(--color-primary-hover)] hover:-translate-y-0.5',
                  'hover:shadow-[0_8px_24px_-6px_rgba(26,155,140,0.3)]',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]',
                  'transition-all duration-300 ease-out'
                )}
              >
                Find a provider
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProviderHighlight;
