import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import SEO from '@/components/SEO';
import { getAuthorBySlug } from '@/data/authors';

const AuthorProfilePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const author = slug ? getAuthorBySlug(slug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!author) {
    return (
      <div className="min-h-screen bg-background pt-28 pb-20">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <h1 className="font-display font-bold text-3xl text-text-primary mb-4">
            Author not found
          </h1>
          <p className="text-text-secondary mb-8">
            We couldn't find an author with that profile.
          </p>
          <Link
            to="/advisory-board"
            className="text-sm font-semibold text-primary hover:underline"
          >
            View advisory board
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-28 pb-20">
      <SEO
        title={`${author.name} — ${author.role} | Psychage`}
        description={author.bio || `${author.name} is a member of the Psychage team.`}
      />

      <div className="container mx-auto px-6 max-w-5xl">
        {/* Back Link */}
        <Link
          to="/advisory-board"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-8 transition-colors text-sm"
        >
          <ArrowLeft size={16} />
          Advisory Board
        </Link>

        {/* Profile — copy article page 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 lg:gap-12">

          {/* Left Sidebar — copy article TOC sidebar */}
          <motion.aside
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
            className="lg:sticky lg:top-28"
          >
            <div className="bg-surface border border-border rounded-2xl p-6">
              <img
                src={author.image}
                alt={author.name}
                className="w-24 h-24 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-sm mx-auto mb-4"
              />
              <h1 className="font-display font-bold text-xl text-text-primary text-center mb-1">
                {author.name}
              </h1>
              <p className="text-xs text-text-tertiary text-center font-medium mb-3">
                {author.role}
              </p>

              {author.credentials && (
                <p className="text-sm font-medium text-primary text-center mb-4">
                  {author.credentials}
                </p>
              )}

              {author.affiliations && author.affiliations.length > 0 && (
                <div className="border-t border-border pt-4 mt-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-text-tertiary mb-2">
                    Affiliations
                  </p>
                  <ul className="space-y-1.5">
                    {author.affiliations.map((a) => (
                      <li key={a} className="text-xs text-text-secondary">
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {author.social && (
                <div className="border-t border-border pt-4 mt-4 flex gap-3 justify-center">
                  {author.social.linkedin && (
                    <a
                      href={author.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-tertiary hover:text-primary transition-colors"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.aside>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0, 0, 0.2, 1], delay: 0.1 }}
          >
            {/* Bio */}
            {author.bio && (
              <div className="mb-12">
                <h2 className="font-display font-bold text-2xl text-text-primary mb-4 tracking-tight">
                  About
                </h2>
                <p className="text-text-secondary leading-relaxed text-lg">
                  {author.bio}
                </p>
              </div>
            )}

            {/* Specialties */}
            {author.specialties && author.specialties.length > 0 && (
              <div className="mb-12">
                <h2 className="font-display font-bold text-2xl text-text-primary mb-4 tracking-tight">
                  Areas of expertise
                </h2>
                <div className="flex flex-wrap gap-2">
                  {author.specialties.map((s) => (
                    <span
                      key={s}
                      className="text-sm font-medium px-3 py-1.5 rounded-full bg-surface-hover text-text-secondary border border-border"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="bg-surface border border-border rounded-xl p-6">
              <p className="text-sm text-text-secondary leading-relaxed">
                {author.name} contributes to Psychage's mission of providing
                evidence-based mental health education. All content reviewed by
                this advisor follows our{' '}
                <Link to="/content-standards" className="text-primary hover:underline font-medium">
                  content standards
                </Link>.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AuthorProfilePage;
