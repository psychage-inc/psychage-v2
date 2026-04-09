import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { ease } from '@/lib/animations';
import { SCENES, SCENE_ALT, OBJECTS, OBJECT_ALT } from './homeImages';
import { cn } from '@/lib/utils';

const softEdgeMask =
  'radial-gradient(ellipse 80% 75% at 50% 50%, black 40%, transparent 100%)';

const NavigatorShowcase: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  const slideAnim = (x: number, delay = 0) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, x },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true, amount: 0.25 },
          transition: { duration: 0.7, delay, ease: ease.decelerate },
        };

  const fadeAnim = (delay: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          viewport: { once: true, amount: 0.25 },
          transition: { duration: 1.0, delay, ease: ease.decelerate },
        };

  return (
    <section aria-label="Symptom Navigator" className="py-20 md:py-28 lg:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Left — Navigator Scene */}
          <motion.div
            {...slideAnim(-30)}
            className="w-full lg:w-[46%] relative"
          >
            <Link
              to="/tools/symptom-navigator"
              className="block hover:opacity-90 transition-opacity duration-300"
            >
              <img
                src={SCENES.turning}
                alt={SCENE_ALT.turning}
                className={cn(
                  'w-full object-contain rounded-3xl',
                  'shadow-[0_12px_40px_-8px_rgba(0,0,0,0.08)]',
                  'dark:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.3)]',
                  'dark:brightness-[0.9]'
                )}
                loading="lazy"
              />
            </Link>

            {/* Symbolic objects — bleed the clay world into the page */}
            <motion.img
              {...fadeAnim(0.5)}
              src={OBJECTS.thinArc}
              alt={OBJECT_ALT.thinArc}
              className="absolute -top-6 -left-5 h-[30px] lg:h-[40px] w-auto object-contain opacity-20 hidden lg:block"
              style={{ maskImage: softEdgeMask, WebkitMaskImage: softEdgeMask }}
              loading="lazy"
            />
            <motion.img
              {...fadeAnim(0.5)}
              src={OBJECTS.tinyPyramid}
              alt={OBJECT_ALT.tinyPyramid}
              className="absolute -bottom-5 -right-4 h-[35px] lg:h-[48px] w-auto object-contain opacity-18 hidden lg:block"
              style={{ maskImage: softEdgeMask, WebkitMaskImage: softEdgeMask }}
              loading="lazy"
            />
          </motion.div>

          {/* Right — Text Content */}
          <motion.div
            {...slideAnim(30)}
            className="w-full lg:w-[54%] text-center lg:text-left"
          >
            <h2
              className={cn(
                'font-display font-bold leading-[1.15] tracking-tight',
                'text-[1.65rem] sm:text-[1.85rem] lg:text-[2.1rem]',
                'text-[var(--color-text-primary)]'
              )}
            >
              Not sure what you're experiencing?
            </h2>

            <p
              className={cn(
                'font-sans text-[15px] lg:text-base leading-[1.7]',
                'text-[var(--color-text-secondary)]',
                'mt-5 max-w-lg mx-auto lg:mx-0'
              )}
            >
              The Symptom Navigator helps you connect what you're feeling to
              conditions, articles, and next steps. Select your symptoms, rate
              their impact, and get matched — in under 3 minutes.
            </p>

            <p
              className={cn(
                'font-sans text-[15px] lg:text-base leading-[1.7]',
                'text-[var(--color-text-secondary)]',
                'mt-3 max-w-lg mx-auto lg:mx-0'
              )}
            >
              Everything runs entirely on your device.{' '}
              <span className="font-medium text-[var(--color-primary)]/80">
                Nothing is stored. Nothing is shared.
              </span>
            </p>

            <p className="text-[13px] text-[var(--color-primary)]/60 mt-5 font-sans tracking-wide">
              106 symptoms · 45 conditions · 6 severity tiers · 100% on-device
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NavigatorShowcase;
