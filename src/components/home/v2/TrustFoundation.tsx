import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Lock, Shield, AlertCircle, Star, Quote } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { staggerContainer, staggerItem, ease } from '@/lib/animations';
import { cn } from '@/lib/utils';

const pillars = [
  {
    icon: BookOpen,
    title: 'Evidence-based',
    description:
      'All tools are built on established clinical frameworks including CBT, PHQ-9, and GAD-7 screening instruments.',
  },
  {
    icon: Lock,
    title: 'Privacy-first architecture',
    description:
      "Symptom data and assessment results are processed client-side. Your mental health information never touches our servers.",
  },
  {
    icon: Shield,
    title: 'Verified providers',
    description:
      "Every provider in our directory is NPI-verified. We check credentials so you don't have to.",
  },
  {
    icon: AlertCircle,
    title: 'Not a substitute for care',
    description:
      'Psychage is an educational resource. It is not a diagnostic tool or a replacement for professional mental health treatment.',
  },
];

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    quote:
      'The Clarity Score gave me a vocabulary for what I was feeling. It was the first step toward getting actual help instead of just wondering if I was okay.',
    author: 'Sarah J.',
    role: 'Software Engineer',
    rating: 5,
  },
  {
    quote:
      'I use the Mood Journal daily. Seeing my emotional patterns mapped out visually helped me realize how much my sleep was affecting my anxiety.',
    author: 'David M.',
    role: 'Graduate Student',
    rating: 5,
  },
  {
    quote:
      'The Symptom Navigator is incredibly thorough but not overwhelming. It helped me prepare for my first therapy appointment with confidence.',
    author: 'Elena R.',
    role: 'Teacher',
    rating: 5,
  },
];

const TrustFoundation: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  const headingAnim = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 14 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.6, ease: ease.decelerate },
      };

  return (
    <section
      aria-label="Trust and testimonials"
      className="py-20 md:py-28 lg:py-32 bg-white/80 dark:bg-[var(--color-surface)]/60"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        {/* ── Trust Pillars ── */}
        <motion.div {...headingAnim} className="text-center mb-12">
          <h2
            className={cn(
              'font-display font-bold leading-[1.15] tracking-tight',
              'text-[1.65rem] sm:text-[1.85rem] lg:text-[2.1rem]',
              'text-[var(--color-text-primary)]'
            )}
          >
            Built on evidence. Designed with care.
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-text-secondary)] mt-3 max-w-2xl mx-auto">
            We take the responsibility of mental health seriously. Here's how we
            earn your trust.
          </p>
        </motion.div>

        <motion.div
          variants={prefersReducedMotion ? undefined : staggerContainer}
          initial={prefersReducedMotion ? undefined : 'hidden'}
          whileInView={prefersReducedMotion ? undefined : 'visible'}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                variants={prefersReducedMotion ? undefined : staggerItem}
                className="flex gap-4 p-6 rounded-2xl bg-[var(--color-homepage-bg)] dark:bg-[var(--color-surface)] border border-[var(--color-border)]"
              >
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-[var(--color-surface-hover)] border border-[var(--color-border)] flex items-center justify-center shrink-0">
                  <Icon
                    className="w-5 h-5 text-[var(--color-text-secondary)]"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-[var(--color-text-primary)] mb-1.5">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Testimonials ── */}
        <motion.div
          variants={prefersReducedMotion ? undefined : staggerContainer}
          initial={prefersReducedMotion ? undefined : 'hidden'}
          whileInView={prefersReducedMotion ? undefined : 'visible'}
          viewport={{ once: true }}
          className="mt-16 flex overflow-x-auto pb-4 -mx-6 px-6 snap-x snap-mandatory gap-6 md:grid md:grid-cols-3 md:overflow-visible md:pb-0 md:mx-0 md:px-0 scrollbar-hide"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={prefersReducedMotion ? undefined : staggerItem}
              className="w-[min(85vw,21.25rem)] shrink-0 snap-center md:w-auto flex flex-col p-7 rounded-2xl bg-white/60 dark:bg-[var(--color-surface)]/60 border border-[var(--color-border)] relative group"
            >
              <Quote
                className="absolute top-5 right-5 w-7 h-7 text-[var(--color-border)] group-hover:text-[var(--color-primary)]/20 transition-colors"
                aria-hidden="true"
              />

              <div className="flex gap-0.5 mb-5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                    aria-hidden="true"
                  />
                ))}
              </div>

              <p className="text-[var(--color-text-primary)] leading-relaxed mb-7 flex-grow text-sm">
                "{t.quote}"
              </p>

              <div className="mt-auto">
                <p className="font-semibold text-sm text-[var(--color-text-primary)]">
                  {t.author}
                </p>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  {t.role}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustFoundation;
