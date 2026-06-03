import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import SEO from '@/components/SEO';

const AdvisoryBoardPage: React.FC = () => {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const heroMotion = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, ease: [0, 0, 0.2, 1] as const },
      };

  return (
    <div className="min-h-screen bg-background">
      <SEO title={t('advisoryBoard.seo.title')} description={t('advisoryBoard.seo.description')} />

      {/* Hero — fixed navy poster */}
      <section className="bg-[#1A1A2E] pt-36 pb-24">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <motion.div {...heroMotion}>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60 mb-6">
              {t('advisoryBoard.eyebrow')}
            </p>
            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-6 tracking-tight leading-[1.1]">
              {t('advisoryBoard.headline')}
            </h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
              {t('advisoryBoard.subline')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Body — theme-aware canvas */}
      <section className="container mx-auto px-6 max-w-2xl py-20 md:py-24">
        {/* Status badge — teal accent only */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-xs uppercase tracking-widest mb-10">
          <span className="w-2 h-2 rounded-full bg-primary" aria-hidden="true" />
          {t('advisoryBoard.status')}
        </div>

        <h2 className="font-display font-bold text-2xl md:text-3xl text-text-primary mb-8 tracking-tight">
          {t('advisoryBoard.bodyHeading')}
        </h2>

        <div className="space-y-6 text-text-secondary leading-relaxed text-base md:text-lg">
          <p>{t('advisoryBoard.body.p1')}</p>
          <p>{t('advisoryBoard.body.p2')}</p>
          <p>{t('advisoryBoard.body.p3')}</p>
        </div>

        {/* Contact — secondary action */}
        <p className="mt-10 text-text-secondary">
          {t('advisoryBoard.contactPrompt')}{' '}
          <a
            href="mailto:psychageinc@gmail.com"
            className="font-semibold text-primary hover:underline"
          >
            {t('advisoryBoard.contactCta')}
          </a>
        </p>

        {/* Primary action — single button */}
        <div className="mt-12 pt-10 border-t border-border">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#157F73] text-white font-semibold text-[15px] py-3.5 px-7 rounded-2xl hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-6px_rgba(21,127,115,0.35)] transition-all duration-300 ease-out"
          >
            {t('advisoryBoard.back')}
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AdvisoryBoardPage;
