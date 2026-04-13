import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Shield,
  CheckCircle2,
  Ban,
  BookOpen,
  Heart,
  FileCheck,
  ArrowRight,
} from 'lucide-react';
import SEO from '@/components/SEO';
import {
  tierCards,
  qualityChecks,
  blockedSourceGroups,
  sensitivityExamples,
  articleTypeCards,
  reviewSteps,
} from '@/lib/article-framework/content-standards-data';

const TIER_BADGE: Record<number, string> = {
  1: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  2: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  3: 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400',
  4: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  5: 'bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-slate-400',
};

const sectionAnim = (delay = 0) => ({
  initial: { opacity: 0, y: 14 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  transition: { duration: 0.6, ease: [0, 0, 0.2, 1], delay },
  viewport: { once: true, amount: 0.2 } as const,
});

const ContentStandardsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background pt-28 pb-20">
      <SEO
        title="Content Standards — How We Create Content | Psychage"
        description="Learn how Psychage creates evidence-based mental health content: our 5-tier source hierarchy, 11-point quality gate, inclusive language standards, and editorial review process."
      />

      {/* ── Hero ── */}
      <div className="container mx-auto px-6 max-w-5xl mb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-800 text-primary font-bold text-xs uppercase tracking-widest mb-8">
            <Shield size={14} />
            Evidence-Based
          </div>
          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-text-primary mb-8 tracking-tight leading-[1.1]">
            How we create{' '}
            <span className="text-primary">content.</span>
          </h1>
          <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed font-light">
            Every article on Psychage is built on peer-reviewed research, checked
            against 11 quality standards, and written so anyone can understand it.
          </p>
        </motion.div>
      </div>

      {/* ── Section 1: 5-Tier Source System ── */}
      <div className="container mx-auto px-6 max-w-5xl mb-24">
        <motion.div {...sectionAnim()}>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-text-primary mb-4 tracking-tight">
            Our 5-tier source hierarchy
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed max-w-2xl mb-12">
            Not all sources are equal. We rank every citation on a 5-tier scale
            and enforce strict minimums so the strongest evidence always leads.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tierCards.map((card, i) => (
            <motion.div
              key={card.tier}
              {...sectionAnim(i * 0.06)}
              className="bg-surface border border-border rounded-xl p-5 hover:border-primary transition-all duration-300 hover:shadow-md"
            >
              <div className="flex items-center gap-3 mb-3">
                <span
                  className={`inline-block text-[9px] font-semibold uppercase px-2 py-0.5 rounded-full ${TIER_BADGE[card.tier]}`}
                >
                  Tier {card.tier}
                </span>
                <span className="text-base font-bold text-text-primary">
                  {card.label}
                </span>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed mb-3">
                {card.description}
              </p>
              <p className="text-xs text-text-tertiary italic mb-2">
                Examples: {card.examples}
              </p>
              <p className="text-xs font-medium text-primary">
                {card.requirement}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Section 2: Quality Gates ── */}
      <div className="container mx-auto px-6 max-w-5xl mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <motion.div {...sectionAnim()}>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-text-primary mb-4 tracking-tight">
              11-point quality gate
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed">
              Before any article is published, it must pass every check in our
              automated quality gate. Blocking checks must pass — no exceptions.
              Warning checks flag areas for editorial review.
            </p>
          </motion.div>

          <motion.div {...sectionAnim(0.1)}>
            <div className="space-y-3">
              {qualityChecks.map((check) => (
                <div key={check.name} className="flex items-start gap-3">
                  <CheckCircle2
                    size={18}
                    className={`mt-0.5 shrink-0 ${check.blocking ? 'text-primary' : 'text-text-tertiary'}`}
                  />
                  <div>
                    <span className="text-sm font-bold text-text-primary">
                      {check.name}
                    </span>
                    {check.blocking && (
                      <span className="ml-2 text-[9px] font-semibold uppercase px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">
                        Required
                      </span>
                    )}
                    <p className="text-xs text-text-secondary leading-relaxed mt-0.5">
                      {check.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Section 3: Blocked Sources ── */}
      <div className="bg-gray-900 text-white py-24 px-6 mb-24">
        <div className="container mx-auto max-w-5xl">
          <motion.div {...sectionAnim()} className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Ban size={24} className="text-red-400" />
              <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight">
                Sources we never cite
              </h2>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
              These domains are permanently blocked from our citation system.
              If a source appears on this list, it cannot be used in any
              Psychage article — regardless of the specific page cited.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blockedSourceGroups.map((group, i) => (
              <motion.div
                key={group.category}
                {...sectionAnim(i * 0.08)}
                className="bg-gray-800/50 border border-gray-700 p-8 rounded-3xl"
              >
                <h3 className="font-bold text-lg mb-2">{group.category}</h3>
                <p className="text-sm text-gray-400 mb-4">{group.reason}</p>
                <ul className="space-y-1.5">
                  {group.domains.map((d) => (
                    <li
                      key={d}
                      className="text-sm text-gray-300 flex items-center gap-2"
                    >
                      <Ban size={12} className="text-red-400 shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Section 4: Readability ── */}
      <div className="container mx-auto px-6 max-w-5xl mb-24">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <motion.div
            {...sectionAnim()}
            className="w-full lg:w-[40%] flex justify-center"
          >
            <div className="w-40 h-40 rounded-3xl bg-primary/10 border border-primary/20 flex flex-col items-center justify-center">
              <span className="font-display font-bold text-5xl text-primary">8</span>
              <span className="text-sm text-text-secondary mt-1">Grade Level</span>
            </div>
          </motion.div>

          <motion.div {...sectionAnim(0.1)} className="w-full lg:w-[60%]">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-text-primary mb-4 tracking-tight">
              Written for everyone
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-4">
              Every article targets a Flesch-Kincaid grade level of 8 or below —
              meaning a 13-year-old should be able to understand it. Mental
              health information should never be locked behind academic jargon.
            </p>
            <p className="text-text-secondary leading-relaxed">
              Our readability engine analyzes sentence length, syllable count,
              and vocabulary complexity. Articles that exceed grade 8 are flagged
              for simplification. Articles above grade 12 cannot be published.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Section 5: Inclusive Language ── */}
      <div className="container mx-auto px-6 max-w-5xl mb-24">
        <motion.div {...sectionAnim()} className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Heart size={24} className="text-primary" />
            <h2 className="font-display font-bold text-3xl md:text-4xl text-text-primary tracking-tight">
              Language that respects
            </h2>
          </div>
          <p className="text-text-secondary text-lg leading-relaxed max-w-2xl">
            Words shape how people feel about themselves. We follow APA, NIMH,
            and Mental Health First Aid language guidelines to ensure every
            article uses person-first, strength-based language.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sensitivityExamples.map((ex, i) => (
            <motion.div
              key={i}
              {...sectionAnim(i * 0.05)}
              className="bg-surface border border-border rounded-xl p-5"
            >
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <p className="text-sm text-text-tertiary line-through mb-1">
                    {ex.before}
                  </p>
                  <p className="text-sm text-text-primary font-medium flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-primary shrink-0" />
                    {ex.after}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Section 6: Article Types ── */}
      <div className="container mx-auto px-6 max-w-5xl mb-24">
        <motion.div {...sectionAnim()} className="mb-12">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-text-primary mb-4 tracking-tight">
            Five article templates
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed max-w-2xl">
            Each article type has specific requirements for citations, word
            count, and required sections — calibrated to the depth that topic demands.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articleTypeCards.map((card, i) => (
            <motion.div
              key={card.type}
              {...sectionAnim(i * 0.06)}
              className="bg-surface border border-border rounded-xl p-5 hover:border-primary transition-all duration-300 hover:shadow-md"
            >
              <h3 className="text-base font-bold text-text-primary mb-1">
                {card.label}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-3">
                {card.description}
              </p>
              <div className="flex gap-4 text-xs text-text-tertiary">
                <span>{card.minCitations}+ citations</span>
                <span>{card.minWords.toLocaleString()}+ words</span>
                <span>{card.sectionCount} sections</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Section 7: Review Process ── */}
      <div className="container mx-auto px-6 max-w-5xl mb-24">
        <motion.div {...sectionAnim()} className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <FileCheck size={24} className="text-primary" />
            <h2 className="font-display font-bold text-3xl md:text-4xl text-text-primary tracking-tight">
              From draft to published
            </h2>
          </div>
          <p className="text-text-secondary text-lg leading-relaxed max-w-2xl">
            Every article follows a structured review pipeline. Crisis and
            safety content requires additional clinical review before publication.
          </p>
        </motion.div>

        <div className="space-y-3">
          {reviewSteps.map((step, i) => (
            <motion.div
              key={step.label}
              {...sectionAnim(i * 0.06)}
              className="flex items-start gap-4"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-gray-100 dark:bg-gray-800">
                <span className="text-xs font-bold text-text-tertiary">
                  {i + 1}
                </span>
              </div>
              <div>
                <span className="text-sm font-bold text-text-primary">
                  {step.label}
                </span>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="container mx-auto px-6 max-w-5xl text-center">
        <motion.div {...sectionAnim()}>
          <BookOpen size={32} className="text-primary mx-auto mb-4" />
          <h2 className="font-display font-bold text-2xl md:text-3xl text-text-primary mb-4 tracking-tight">
            Read with confidence
          </h2>
          <p className="text-text-secondary mb-8 max-w-lg mx-auto">
            Every article you read on Psychage has been through this process.
            Explore our library.
          </p>
          <Link
            to="/learn"
            className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-white font-semibold text-[15px] py-3.5 px-7 rounded-2xl hover:bg-[var(--color-primary-hover)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-6px_rgba(26,155,140,0.3)] transition-all duration-300 ease-out"
          >
            Explore Articles
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ContentStandardsPage;
