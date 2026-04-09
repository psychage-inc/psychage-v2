import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Loader2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useNewsletterService } from '@/services/newsletterService';
import { consentService } from '@/services/consentService';
import { ease } from '@/lib/animations';
import { FIGURES, FIGURE_ALT } from './homeImages';
import { cn } from '@/lib/utils';

type SubscriptionStatus = 'idle' | 'loading' | 'success' | 'error';

const ClosingSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const newsletterService = useNewsletterService();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<SubscriptionStatus>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === 'loading') return;

    setStatus('loading');
    try {
      await newsletterService.subscribe(email);
      consentService
        .logConsent('newsletter', true, 'v1.0', { email, source: 'homepage-v2' })
        .catch(console.error);
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const sectionAnim = (delay: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 10 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.3 },
          transition: { duration: 0.5, delay, ease: ease.decelerate },
        };

  return (
    <section
      aria-label="Get started"
      className="relative w-full bg-[var(--color-homepage-closing)] py-20 md:py-28 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Figure image */}
          <motion.div {...sectionAnim(0)} className="flex justify-center lg:justify-end">
            <img
              src={FIGURES.open}
              alt={FIGURE_ALT.open}
              className="h-48 md:h-64 lg:h-72 w-auto object-contain rounded-3xl border border-[var(--color-border)]/60 shadow-[0_8px_28px_-10px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_28px_-10px_rgba(0,0,0,0.35)]"
              loading="lazy"
            />
          </motion.div>

          {/* Right: Content */}
          <div className="text-center lg:text-left">
            <motion.h2
              {...sectionAnim(0.1)}
              className={cn(
                'font-display font-bold leading-[1.15] tracking-tight',
                'text-2xl md:text-3xl lg:text-[2.2rem]',
                'text-[var(--color-text-primary)] mb-3'
              )}
            >
              Your mental health journey starts here.
            </motion.h2>
            <motion.p
              {...sectionAnim(0.15)}
              className="text-[var(--color-text-secondary)] text-base md:text-lg max-w-lg mx-auto lg:mx-0 mb-6 leading-relaxed"
            >
              2,000+ articles, 6 free tools, 423K+ providers. Evidence-based, private, and always free.
            </motion.p>

            {/* Quick links */}
            <motion.div {...sectionAnim(0.2)} className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
              <Link
                to="/tools/symptom-navigator"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-primary)] hover:underline"
              >
                Explore tools <ArrowRight size={14} />
              </Link>
              <span className="text-[var(--color-border)]">|</span>
              <Link
                to="/learn"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-primary)] hover:underline"
              >
                Read articles <ArrowRight size={14} />
              </Link>
              <span className="text-[var(--color-border)]">|</span>
              <Link
                to="/providers"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-primary)] hover:underline"
              >
                Find a provider <ArrowRight size={14} />
              </Link>
            </motion.div>

            {/* Newsletter */}
            <motion.div {...sectionAnim(0.3)}>
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  role="status"
                  aria-live="polite"
                  className="flex items-center gap-2.5 py-4 justify-center lg:justify-start"
                >
                  <Check size={24} className="text-[var(--color-primary)]" />
                  <span className="text-base font-sans text-[var(--color-primary)] font-medium">
                    You're in. Watch your inbox.
                  </span>
                </motion.div>
              ) : (
                <>
                  <p className="font-sans text-sm text-[var(--color-text-tertiary)] mb-3">
                    One mental health insight a week — free, in your inbox.
                  </p>

                  <form
                    onSubmit={handleSubmit}
                    aria-label="Subscribe to newsletter"
                    className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0"
                  >
                    <label htmlFor="closing-email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="closing-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      required
                      className="w-full sm:flex-1 rounded-xl border border-[var(--color-border)] bg-white dark:bg-[var(--color-surface)] py-3 px-4 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/30 transition-all"
                    />
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full sm:w-auto rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-semibold py-3 px-6 text-sm transition-colors duration-200 disabled:opacity-60 flex items-center justify-center gap-2 shrink-0"
                    >
                      {status === 'loading' ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : status === 'error' ? (
                        'Try again'
                      ) : (
                        'Subscribe'
                      )}
                    </button>
                  </form>

                  {status === 'error' && (
                    <p role="alert" className="text-sm text-red-500 dark:text-red-400 mt-2">
                      Something went wrong. Please try again.
                    </p>
                  )}
                </>
              )}

              <p className="text-xs text-[var(--color-text-tertiary)] mt-3">
                No spam. Unsubscribe anytime.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClosingSection;
