import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, AlertTriangle, Info, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import Button from '@/components/ui/Button';
import { useProviderProfile } from '@/hooks/useProviderProfile';
import { ProfileHeader } from '@/components/providers/profile/ProfileHeader';
import { AboutSection } from '@/components/providers/profile/AboutSection';
import { SpecialtiesGrid } from '@/components/providers/profile/SpecialtiesGrid';
import { LocationSection } from '@/components/providers/profile/LocationSection';
import { ContactActions } from '@/components/providers/profile/ContactActions';
import { InsuranceList } from '@/components/providers/profile/InsuranceList';
import { LanguageBadges } from '@/components/providers/profile/LanguageBadges';
import { CulturalBadges } from '@/components/providers/profile/CulturalBadges';
import { FindSupportCTA } from '@/components/providers/shared/FindSupportCTA';
import { trackProfileView } from '@/services/provider-analytics';
import { formatLastUpdated } from '@/lib/providers/lastUpdated';
import { generateProviderJsonLd } from '@/lib/providers/jsonLd';
import { cn } from '@/lib/utils';

const ProviderProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { provider, isLoading, error } = useProviderProfile(id || '');

  // Track profile view (deduplicates per session)
  React.useEffect(() => {
    if (provider?.id) {
      trackProfileView(provider.id);
    }
  }, [provider?.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-6">
            <div className="h-6 w-32 bg-slate-200 dark:bg-slate-700 rounded" />
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-full bg-slate-200 dark:bg-slate-700" />
              <div className="space-y-3 flex-1">
                <div className="h-7 w-64 bg-slate-200 dark:bg-slate-700 rounded" />
                <div className="h-4 w-40 bg-slate-200 dark:bg-slate-700 rounded" />
              </div>
            </div>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-slate-200 dark:bg-slate-700 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !provider || provider.status === 'suspended' || provider.status === 'rejected') {
    return (
      <div className="min-h-screen bg-background pt-24">
        <SEO
          title="Provider Not Found | Psychage"
          robots="noindex, nofollow"
        />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <h1 className="font-display font-bold text-2xl text-text-primary mb-2">
            Provider Not Found
          </h1>
          <p className="text-text-secondary mb-6">
            This provider profile may have been removed or the link may be incorrect.
          </p>
          <Button onClick={() => navigate('/providers/search')}>
            Search Providers
          </Button>
        </div>
      </div>
    );
  }

  const topSpecialty = provider.specialties[0]?.slug;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${provider.display_name}${provider.credentials_suffix ? `, ${provider.credentials_suffix}` : ''} | Psychage`}
        description={provider.bio?.slice(0, 160) || `View ${provider.display_name}'s profile on Psychage.`}
        canonical={`https://psychage.com/providers/${provider.id}`}
        structuredData={generateProviderJsonLd(provider)}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-28 sm:pb-16">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6"
        >
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to results
          </button>
        </motion.div>

        {/* Profile sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <ProfileHeader provider={provider} />

          {/* Seeded provider info banner */}
          {provider.status === 'seeded' && (
            <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/50 rounded-xl p-4 text-sm text-amber-800 dark:text-amber-300 flex items-start gap-3">
              <Info size={18} className="flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="font-semibold mb-1">
                  This profile was created from federal registry data
                </p>
                <p>
                  The information shown is sourced from the National Plan and Provider
                  Enumeration System (NPPES) maintained by the Centers for Medicare &amp;
                  Medicaid Services. This provider has not claimed or verified their
                  profile on Psychage. Information may be limited or outdated.{' '}
                  <Link to="/how-we-verify#unclaimed" className="underline font-medium">
                    Learn more
                  </Link>
                </p>
              </div>
            </div>
          )}

          <ContactActions provider={provider} sticky />
          {provider.bio && <AboutSection provider={provider} />}
          <SpecialtiesGrid provider={provider} />
          <LocationSection provider={provider} />
          {(!provider.status || provider.status !== 'seeded' || provider.insurance_plans.length > 0) && (
            <InsuranceList provider={provider} />
          )}
          <LanguageBadges provider={provider} />
          {(!provider.status || provider.status !== 'seeded' || provider.cultural_competencies.length > 0) && (
            <CulturalBadges provider={provider} />
          )}
        </motion.div>

        {/* Claim CTA for seeded profiles */}
        {provider.status === 'seeded' && provider.npi_number && (
          <div className="bg-surface border-2 border-dashed border-teal-300 dark:border-teal-700 rounded-2xl p-6 text-center mt-8">
            <h3 className="font-display font-bold text-lg text-text-primary mb-2">
              Is this your practice?
            </h3>
            <p className="text-sm text-text-secondary mb-4 max-w-md mx-auto">
              Claim this profile to add your specialties, accepted insurance,
              a personal bio, and more. It&rsquo;s free and takes less than 5 minutes.
            </p>
            <Link
              to={`/for-providers/claim?npi=${encodeURIComponent(provider.npi_number)}`}
              className="inline-flex items-center gap-2 bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm px-6 py-2.5 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
            >
              Claim This Profile
              <ArrowRight size={16} />
            </Link>
          </div>
        )}

        {/* Find Similar Providers */}
        {topSpecialty && (
          <div className="mt-12">
            <FindSupportCTA
              specialtySlug={topSpecialty}
              headline="Find Similar Providers"
              description={`More providers specializing in ${provider.specialties[0]?.label || 'this area'}`}
            />
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center space-y-2">
          {provider.verified_at && (
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Credentials last verified: {new Date(provider.verified_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          )}
          {provider.updated_at && (() => {
            const { text, datetime, isStale } = formatLastUpdated(provider);
            return (
              <time
                dateTime={datetime}
                className={cn(
                  'text-xs block',
                  isStale ? 'text-amber-700 dark:text-amber-400' : 'text-gray-400 dark:text-gray-500'
                )}
              >
                {text}
              </time>
            );
          })()}
          <p className="text-xs text-gray-400 dark:text-gray-500">
            See something wrong?{' '}
            <a
              href={`mailto:info@psychage.com?subject=Provider Profile Concern: ${provider.display_name}&body=Provider ID: ${provider.id}%0A%0APlease describe your concern:`}
              className="text-teal-600 dark:text-teal-400 hover:underline"
            >
              Report a concern
            </a>
            {' · '}
            <Link to="/how-we-verify" className="text-teal-600 dark:text-teal-400 hover:underline">
              How we verify
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProviderProfilePage;
