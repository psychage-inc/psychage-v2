import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, ArrowRight } from 'lucide-react';
import SEO from '@/components/SEO';
import { getAdvisoryBoard } from '@/data/authors';

const sectionAnim = (delay = 0) => ({
  initial: { opacity: 0, y: 14 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  transition: { duration: 0.6, ease: [0, 0, 0.2, 1], delay },
  viewport: { once: true, amount: 0.2 } as const,
});

const AdvisoryBoardPage: React.FC = () => {
  const board = getAdvisoryBoard();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background pt-28 pb-20">
      <SEO
        title="Medical Advisory Board | Psychage"
        description="Meet the clinical experts and researchers who review Psychage content for medical accuracy, inclusive language, and evidence-based standards."
      />

      {/* Hero — copy About hero pattern */}
      <div className="container mx-auto px-6 max-w-5xl mb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-xs uppercase tracking-widest mb-8">
            <Shield size={14} />
            Clinical Oversight
          </div>
          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-text-primary mb-8 tracking-tight leading-[1.1]">
            Our advisory{' '}
            <span className="text-primary">board.</span>
          </h1>
          <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed font-light">
            Every piece of content on Psychage is reviewed by real clinicians
            with real credentials. Meet the people behind our quality standards.
          </p>
        </motion.div>
      </div>

      {/* Board Members — copy About values grid (light bg variant) */}
      <div className="container mx-auto px-6 max-w-5xl mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {board.map((member, i) => (
            <motion.div
              key={member.id}
              {...sectionAnim(i * 0.06)}
            >
              <Link
                to={`/authors/${member.slug}`}
                className="block bg-surface border border-border p-8 rounded-3xl hover:bg-surface-hover hover:border-primary/40 transition-all duration-300 group h-full"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-sm"
                  />
                  <div>
                    <h3 className="font-bold text-lg text-text-primary group-hover:text-primary transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs text-text-tertiary font-medium">
                      {member.role}
                    </p>
                  </div>
                </div>

                {member.credentials && (
                  <p className="text-sm font-medium text-primary mb-3">
                    {member.credentials}
                  </p>
                )}

                {member.specialties && member.specialties.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {member.specialties.map((s) => (
                      <span
                        key={s}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-surface-hover text-text-tertiary"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}

                <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">
                  {member.bio}
                </p>

                <div className="mt-4 flex items-center text-sm font-semibold text-primary">
                  <span>View profile</span>
                  <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="container mx-auto px-6 max-w-5xl text-center">
        <motion.div {...sectionAnim()}>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-text-primary mb-4 tracking-tight">
            Explore our content standards
          </h2>
          <p className="text-text-secondary mb-8 max-w-lg mx-auto">
            Our advisory board works within a rigorous evidence-based framework.
          </p>
          <Link
            to="/content-standards"
            className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-white font-semibold text-[15px] py-3.5 px-7 rounded-2xl hover:bg-[var(--color-primary-hover)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-6px_rgba(26,155,140,0.3)] transition-all duration-300 ease-out"
          >
            Content Standards
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default AdvisoryBoardPage;
