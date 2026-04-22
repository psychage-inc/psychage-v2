import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { SCENES, SCENE_ALT } from './homeImages';
import { cn } from '@/lib/utils';
import {
  Gauge,
  MessageCircle,
  BookHeart,
  Moon,
  Heart,
  ArrowRight,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface FeaturedTool {
  name: string;
  description: string;
  image: string;
  alt: string;
  href: string;
  stat: string;
}

interface CompactTool {
  name: string;
  description: string;
  image: string;
  alt: string;
  href: string;
  icon: LucideIcon;
}

const featured: FeaturedTool = {
  name: 'Symptom Navigator',
  description:
    'Map your symptoms to conditions, articles, and next steps — guided, private, and built on clinical data.',
  image: SCENES.turning,
  alt: SCENE_ALT.turning,
  href: '/tools/symptom-navigator',
  stat: '106 symptoms · 45 conditions · 3 min',
};

const compact: CompactTool[] = [
  {
    name: 'Clarity Score',
    description: 'A quick self-assessment to understand where you stand today.',
    image: SCENES.score,
    alt: SCENE_ALT.score,
    href: '/clarity-score',
    icon: Gauge,
  },
  {
    name: 'MindMate AI',
    description: 'An AI companion for when you need to talk things through.',
    image: SCENES.companion,
    alt: SCENE_ALT.companion,
    href: '/tools/mindmate',
    icon: MessageCircle,
  },
  {
    name: 'Mood Journal',
    description: 'Track your emotional patterns and discover what drives them.',
    image: SCENES.rhythm,
    alt: SCENE_ALT.rhythm,
    href: '/tools/mood-journal',
    icon: BookHeart,
  },
  {
    name: 'Sleep Architect',
    description: 'Build better sleep habits with guided tracking and insights.',
    image: SCENES.architecture,
    alt: SCENE_ALT.architecture,
    href: '/tools/sleep-architect',
    icon: Moon,
  },
  {
    name: 'Relationship Health',
    description: 'Understand the health of your relationships across key dimensions.',
    image: SCENES.relationship,
    alt: SCENE_ALT.relationship,
    href: '/tools/relationship-health',
    icon: Heart,
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

const ToolsEcosystem: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const headingAnim = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 14 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.6, ease: [0, 0, 0.2, 1] },
      };

  const heroAnim = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.15 },
        transition: { duration: 0.7, ease: [0, 0, 0.2, 1] },
      };

  return (
    <section
      aria-label="Interactive tools"
      className="py-20 md:py-28 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* ── Heading ── */}
        <motion.div {...headingAnim} className="text-center mb-12 md:mb-16">
          <h2
            className={cn(
              'font-display font-bold leading-[1.15] tracking-tight',
              'text-[1.65rem] sm:text-[1.85rem] lg:text-[2.1rem]',
              'text-[var(--color-text-primary)]'
            )}
          >
            Tools for every part of the journey
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-text-secondary)] mt-3 max-w-xl mx-auto leading-relaxed">
            Whether you're tracking your mood, exploring symptoms, or finding a
            provider — there's a tool for where you are.
          </p>
        </motion.div>

        {/* ── Tier 1: Featured Hero ── */}
        <motion.div {...heroAnim}>
          <Link
            to={featured.href}
            className={cn(
              'group block rounded-3xl overflow-hidden',
              'bg-white/70 dark:bg-neutral-900',
              'border border-[var(--color-primary)]/20',
              'shadow-[0_4px_24px_-6px_rgba(0,0,0,0.08)]',
              'dark:shadow-[0_4px_24px_-6px_rgba(0,0,0,0.25)]',
              'hover:shadow-[0_12px_36px_-8px_rgba(0,0,0,0.12)]',
              'dark:hover:shadow-[0_12px_36px_-8px_rgba(0,0,0,0.4)]',
              'transition-shadow duration-300 ease-out',
              'flex flex-col lg:flex-row'
            )}
          >
            {/* Image — single img, mask changes via CSS */}
            <div className="w-full lg:w-[48%] overflow-hidden flex items-center justify-center bg-[var(--color-surface-hover)]">
              <img
                src={featured.image}
                alt={featured.alt}
                className={cn(
                  'w-full h-auto max-h-[340px] object-contain',
                  'group-hover:scale-[1.03] transition-transform duration-700 ease-out',
                  'dark:brightness-[0.9]'
                )}
                loading="lazy"
              />
            </div>

            {/* Content */}
            <div className="w-full lg:w-[52%] p-7 md:p-8 lg:p-10 flex flex-col justify-center">
              <span
                className="uppercase tracking-widest text-[0.65rem] font-bold mb-3 text-[var(--color-text-tertiary)]"
              >
                Featured Tool
              </span>
              <h3 className="font-display font-bold text-xl lg:text-2xl text-[var(--color-text-primary)]">
                {featured.name}
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] mt-2.5 leading-relaxed max-w-md">
                {featured.description}
              </p>
              <p
                className="text-xs mt-4 tracking-wide font-medium text-[var(--color-text-tertiary)]"
              >
                {featured.stat}
              </p>
              <div
                className="mt-5 flex items-center gap-2 text-sm font-semibold"
                style={{ color: 'color-mix(in srgb, var(--color-primary) 75%, var(--color-text-secondary))' }}
              >
                Explore Navigator
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </div>
            </div>
          </Link>
        </motion.div>

        {/* ── Tier 2: Compact Tool Strip ── */}
        <motion.div
          variants={prefersReducedMotion ? undefined : staggerContainer}
          initial={prefersReducedMotion ? undefined : 'hidden'}
          whileInView={prefersReducedMotion ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-10"
        >
          {compact.map((tool, idx) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.name}
                variants={prefersReducedMotion ? undefined : staggerItem}
                className="relative"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <Link
                  to={tool.href}
                  className={cn(
                    'group block rounded-2xl p-5 h-full',
                    'bg-white/50 dark:bg-neutral-900',
                    'border border-[var(--color-border)]/50',
                    'hover:border-[var(--color-primary)]/40',
                    'hover:bg-white/80 dark:hover:bg-neutral-800',
                    'shadow-[0_1px_4px_rgba(0,0,0,0.04)]',
                    'hover:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.08)]',
                    'dark:shadow-[0_1px_4px_rgba(0,0,0,0.15)]',
                    'dark:hover:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.3)]',
                    'transition-all duration-300 ease-out'
                  )}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3.5"
                    style={{
                      backgroundColor: 'color-mix(in srgb, var(--color-primary) 12%, transparent)',
                    }}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{ color: 'var(--color-primary)' }}
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="font-semibold text-sm text-[var(--color-text-primary)]">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-1.5 leading-relaxed line-clamp-2">
                    {tool.description}
                  </p>
                  <div className="mt-3 pt-1">
                    <ArrowRight
                      className="w-4 h-4 text-[var(--color-text-secondary)] group-hover:text-[var(--color-primary)] group-hover:translate-x-1 transition-all duration-300"
                      aria-hidden="true"
                    />
                  </div>
                </Link>

                {/* Hover image preview — desktop only */}
                <AnimatePresence>
                  {hoveredIdx === idx && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 4 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 4 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="absolute -top-[135px] left-1/2 -translate-x-1/2 w-[200px] h-[130px] rounded-xl overflow-hidden shadow-xl pointer-events-none z-10 hidden lg:block"
                    >
                      <img
                        src={tool.image}
                        alt=""
                        aria-hidden="true"
                        className="w-full h-full object-cover dark:brightness-[0.9]"
                        style={{
                          maskImage:
                            'radial-gradient(ellipse 80% 75% at 50% 50%, black 40%, transparent 100%)',
                          WebkitMaskImage:
                            'radial-gradient(ellipse 80% 75% at 50% 50%, black 40%, transparent 100%)',
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Scoped style for hero image mask — mobile vs desktop */}
      <style>{`
        .tools-hero-img {
          mask-image: linear-gradient(to bottom, black 75%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, black 75%, transparent 100%);
        }
        @media (min-width: 1024px) {
          .tools-hero-img {
            mask-image: linear-gradient(to right, black 70%, transparent 100%);
            -webkit-mask-image: linear-gradient(to right, black 70%, transparent 100%);
          }
        }
      `}</style>
    </section>
  );
};

export default ToolsEcosystem;
