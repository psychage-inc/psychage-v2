import React from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { ease } from '@/lib/animations';
import { FIGURES, OBJECTS, FIGURE_ALT, OBJECT_ALT } from './homeImages';
import { cn } from '@/lib/utils';

// Soft radial mask that fades image edges into the page background
const softEdgeMask =
  'radial-gradient(ellipse 80% 75% at 50% 50%, black 40%, transparent 100%)';
// Wider mask for the primary figure — more visible center
const primaryMask =
  'radial-gradient(ellipse 85% 80% at 50% 48%, black 45%, transparent 100%)';

const heroFigures = [
  {
    id: 'listener',
    src: FIGURES.listener,
    alt: FIGURE_ALT.listener,
    mask: primaryMask,
    className: 'absolute left-[8%] sm:left-[12%] lg:left-[8%] top-[8%] lg:top-[5%] z-20',
    imgClassName: 'h-[240px] sm:h-[280px] lg:h-[320px] xl:h-[370px] w-auto object-cover rounded-3xl dark:brightness-[0.85] dark:contrast-[1.05]',
    delay: 0.08,
    floatDuration: 5,
  },
  {
    id: 'supporter',
    src: FIGURES.supporter,
    alt: FIGURE_ALT.supporter,
    mask: softEdgeMask,
    className: 'absolute right-[2%] sm:right-[6%] lg:right-[0%] top-[18%] lg:top-[12%] z-10',
    imgClassName: 'h-[200px] sm:h-[230px] lg:h-[260px] xl:h-[300px] w-auto object-cover rounded-3xl dark:brightness-[0.85] dark:contrast-[1.05]',
    delay: 0.18,
    floatDuration: 6,
  },
  {
    id: 'resting',
    src: FIGURES.resting,
    alt: FIGURE_ALT.resting,
    mask: softEdgeMask,
    className: 'absolute left-[0%] lg:left-[2%] bottom-[2%] lg:bottom-[0%] z-30 hidden md:block',
    imgClassName: 'h-[150px] lg:h-[190px] xl:h-[210px] w-auto object-cover rounded-3xl dark:brightness-[0.85] dark:contrast-[1.05]',
    delay: 0.28,
    floatDuration: 4.5,
  },
  {
    id: 'rising',
    src: FIGURES.rising,
    alt: FIGURE_ALT.rising,
    mask: softEdgeMask,
    className: 'absolute right-[0%] lg:right-[-3%] bottom-[5%] lg:bottom-[2%] z-10 hidden lg:block',
    imgClassName: 'h-[170px] lg:h-[200px] xl:h-[230px] w-auto object-cover rounded-3xl dark:brightness-[0.85] dark:contrast-[1.05]',
    delay: 0.36,
    floatDuration: 5.5,
  }
];

const ambientObjects = [
  {
    id: 'sphereCluster',
    src: OBJECTS.sphereCluster,
    alt: OBJECT_ALT.sphereCluster,
    className: 'absolute left-[46%] top-[2%] lg:top-[0%] h-[40px] lg:h-[55px] w-auto object-contain opacity-25 hidden sm:block rounded-full',
  },
  {
    id: 'singleDroplet',
    src: OBJECTS.singleDroplet,
    alt: OBJECT_ALT.singleDroplet,
    className: 'absolute right-[22%] lg:right-[18%] top-[42%] lg:top-[38%] h-[32px] lg:h-[45px] w-auto object-contain opacity-20 hidden sm:block rounded-full',
  },
  {
    id: 'scatteredSeeds',
    src: OBJECTS.scatteredSeeds,
    alt: OBJECT_ALT.scatteredSeeds,
    className: 'absolute left-[35%] bottom-[12%] lg:bottom-[8%] h-[38px] lg:h-[50px] w-auto object-contain opacity-20 hidden md:block rounded-full',
  }
];

const HeroSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  const textAnim = (delay = 0) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: ease.decelerate },
        };

  const figureAnim = (delay: number, floatDuration: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24, scale: 0.97 },
          animate: {
            opacity: 1,
            y: [0, -6, 0],
            scale: 1,
          },
          transition: {
            opacity: { duration: 0.7, delay, ease: ease.decelerate },
            scale: { duration: 0.7, delay, ease: ease.decelerate },
            y: {
              delay,
              duration: floatDuration,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatType: 'reverse' as const,
            },
          },
        };

  const objectAnim = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 1.0, delay: 0.7, ease: ease.decelerate },
      };

  return (
    <section
      aria-label="Welcome to Psychage"
      className="relative w-full min-h-[auto] lg:min-h-[80vh] flex items-center overflow-hidden pt-24 pb-14 lg:pt-32 lg:pb-20"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-6">
          {/* ── Text Column ── */}
          <div className="w-full lg:w-[48%] text-center lg:text-left">
            <motion.p
              {...textAnim(0)}
              className="uppercase tracking-[0.18em] text-[11px] sm:text-xs text-[var(--color-primary)]/55 dark:text-neutral-400 font-sans font-medium mb-5"
            >
              Free mental health education platform
            </motion.p>

            <motion.h1
              {...textAnim(0.06)}
              className={cn(
                'font-display font-bold leading-[1.12] tracking-tight',
                'text-[2rem] sm:text-[2.5rem] lg:text-[2.9rem] xl:text-[3.4rem]',
                'text-[var(--color-text-primary)]'
              )}
            >
              Clarity for the moments
              <br />
              <span className="text-[var(--color-text-tertiary)]">
                that need it most.
              </span>
            </motion.h1>

            <motion.p
              {...textAnim(0.12)}
              className={cn(
                'font-sans text-[15px] lg:text-[17px] leading-[1.7]',
                'text-[var(--color-text-secondary)]',
                'mt-6 max-w-[480px] mx-auto lg:mx-0'
              )}
            >
              When you're worried about yourself or someone you love, Psychage
              helps you understand what's happening and what to do next.
            </motion.p>

            <motion.div
              {...textAnim(0.18)}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-9 justify-center lg:justify-start"
            >
              <Link
                to="/tools/symptom-navigator"
                className={cn(
                  'inline-block bg-[var(--color-primary)] text-white',
                  'font-semibold text-[15px] lg:text-base',
                  'py-3.5 px-7 lg:py-4 lg:px-9 rounded-2xl',
                  'text-center',
                  'hover:bg-[var(--color-primary-hover)] hover:-translate-y-0.5',
                  'hover:shadow-[0_8px_24px_-6px_rgba(26,155,140,0.3)]',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]',
                  'transition-all duration-300 ease-out'
                )}
              >
                Explore what you're feeling
              </Link>
              <Link
                to="/learn"
                className={cn(
                  'inline-block border-[1.5px] border-[var(--color-primary)] dark:border-[var(--color-primary)]',
                  'text-[var(--color-primary)] dark:text-[var(--color-primary)]',
                  'font-semibold text-[15px] lg:text-base',
                  'py-3.5 px-7 lg:py-4 lg:px-9 rounded-2xl',
                  'text-center',
                  'hover:bg-[var(--color-primary)] hover:text-white hover:-translate-y-0.5',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]',
                  'transition-all duration-300 ease-out'
                )}
              >
                Browse articles
              </Link>
            </motion.div>

            <motion.div
              {...textAnim(0.26)}
              className="flex items-center gap-2 mt-4 justify-center lg:justify-start"
            >
              <Lock
                size={13}
                className="text-[var(--color-text-tertiary)] flex-shrink-0"
                aria-hidden="true"
              />
              <span className="text-[13px] text-[var(--color-text-tertiary)] font-sans">
                100% private, your data never leaves your device.
              </span>
            </motion.div>
          </div>

          {/* ── Figure Composition Column ── */}
          <div className="w-full lg:w-[52%] relative" style={{ minHeight: 300 }}>
            <div className="relative w-full h-[280px] sm:h-[360px] lg:h-[500px] xl:h-[560px]">
              {/* Array-driven Clay Figures */}
              {heroFigures.map((fig) => (
                <motion.div
                  key={fig.id}
                  {...figureAnim(fig.delay, fig.floatDuration)}
                  className={fig.className}
                >
                  <img
                    src={fig.src}
                    alt={fig.alt}
                    className={fig.imgClassName}
                    style={{ maskImage: fig.mask, WebkitMaskImage: fig.mask }}
                    loading={fig.id === 'listener' ? 'eager' : 'lazy'}
                    // fetchPriority only works as attribute if using custom typings or modern react, but usually fine.
                  />
                </motion.div>
              ))}

              {/* Array-driven Symbolic Objects */}
              {ambientObjects.map((obj) => (
                <motion.img
                  key={obj.id}
                  {...objectAnim}
                  src={obj.src}
                  alt={obj.alt}
                  className={obj.className}
                  style={{ maskImage: softEdgeMask, WebkitMaskImage: softEdgeMask }}
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;