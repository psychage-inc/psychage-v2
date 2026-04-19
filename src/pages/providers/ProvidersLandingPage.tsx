import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck, Search as SearchIcon,
  ArrowRight, UserCheck, MessageCircle,
  FlaskConical, Sparkles, Check, Users, ClipboardCheck, BadgeCheck,
} from 'lucide-react';
import SEO from '@/components/SEO';
import Button from '@/components/ui/Button';
import { ProviderSearchBar } from '@/components/providers/search/ProviderSearchBar';
import { useProviderLookups } from '@/context/ProviderLookupsContext';

const TRUST_INDICATORS = [
  { icon: UserCheck, label: '400,000+ Providers', description: 'NPI-verified mental health professionals across the US' },
  { icon: ShieldCheck, label: 'Verified Credentials', description: 'NPI-verified professional credentials' },
  { icon: FlaskConical, label: 'Evidence-First', description: 'No ratings or reviews — just verified credentials' },
  { icon: Sparkles, label: 'Free to Search', description: 'Always free for people seeking care' },
];

const HOW_IT_WORKS = [
  { step: 1, title: 'Search', description: 'Enter your location and what kind of support you need.', icon: SearchIcon },
  { step: 2, title: 'Review Profiles', description: 'Compare credentials, specialties, and contact information.', icon: ShieldCheck },
  { step: 3, title: 'Connect', description: 'Reach out directly by phone, email, or their booking link.', icon: MessageCircle },
];

const ProvidersLandingPage: React.FC = () => {
  const navigate = useNavigate();
  const lookups = useProviderLookups();

  const providerTypes = lookups.providerTypes;

  const handleSearch = (query: string, _location: string) => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    navigate(`/providers/search?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Find a Mental Health Provider | Psychage"
        description="Search over 400,000 verified therapists, psychologists, and counselors across all 50 states. Free to search, no account required."
      />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-50 to-white dark:from-neutral-900 dark:to-neutral-950" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-text-primary mb-4 tracking-tight">
              Find a Mental Health Provider{' '}
              <span className="text-text-tertiary">You Can Trust</span>
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-10">
              Search over 400,000 verified therapists, psychologists, and counselors across all 50 states.
              Free to search, no account required.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <ProviderSearchBar onSearch={handleSearch} />
          </motion.div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto border-y border-border py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {TRUST_INDICATORS.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-surface-hover flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-6 h-6 text-text-tertiary" />
                </div>
                <h3 className="font-display font-bold text-sm text-text-primary mb-1">{item.label}</h3>
                <p className="text-xs text-text-secondary">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Specialty — hidden per design review, code preserved */}

      {/* Browse by Provider Type */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display font-bold text-3xl text-text-primary mb-2">Find the Right Type of Support</h2>
          <p className="text-text-secondary mb-10">Different types of mental health professionals for different needs.</p>

          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {providerTypes.map(type => (
              <Link
                key={type.id}
                to={`/providers/search?type=${type.id}`}
                className="flex-shrink-0 w-56 p-5 bg-surface rounded-2xl border border-border hover:border-teal-200 dark:hover:border-teal-800 hover:shadow-sm transition-all group"
              >
                <h3 className="font-display font-bold text-sm text-text-primary mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                  {type.label}
                </h3>
                <p className="text-xs text-text-secondary line-clamp-2">
                  {type.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display font-bold text-3xl text-text-primary mb-12">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Desktop connecting lines */}
            <div className="hidden md:block absolute top-7 left-[calc(16.67%+28px)] right-[calc(16.67%+28px)] border-t-2 border-dashed border-border" />
            {HOW_IT_WORKS.map((item) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: item.step * 0.15 }}
                className="relative"
              >
                <div className="w-14 h-14 rounded-full bg-teal-600 dark:bg-teal-500 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-teal-600/20 dark:shadow-teal-500/20">
                  <span className="font-display font-bold text-xl text-white">{item.step}</span>
                </div>
                <div className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest mb-2">Step {item.step}</div>
                <h3 className="font-display font-bold text-lg text-text-primary mb-2">{item.title}</h3>
                <p className="text-sm text-text-secondary">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* For Providers CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-900 to-teal-950">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left — Headline & CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 rounded-full px-4 py-1.5 mb-6">
                <BadgeCheck size={14} className="text-teal-400" />
                <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">For Providers</span>
              </div>

              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4 tracking-tight leading-tight">
                Grow Your Practice,{' '}
                <span className="text-teal-400">Reach More Patients</span>
              </h2>
              <p className="text-lg text-text-tertiary mb-8 max-w-lg leading-relaxed">
                Join 400,000+ providers on the largest free mental health directory. No hidden fees, no commissions — patients find and contact you directly.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <Link to="/for-providers">
                  <Button className="bg-teal-500 hover:bg-teal-600 text-white font-bold px-8 py-3 text-base" rightIcon={<ArrowRight size={16} />}>
                    List Your Practice
                  </Button>
                </Link>
                <Link to="/for-providers/claim">
                  <Button variant="outline" className="text-white border-gray-600 dark:border-neutral-500 hover:bg-white/10 font-bold px-8 py-3 text-base">
                    Claim Your Profile
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap gap-6">
                {[
                  { value: '400K+', label: 'Providers listed' },
                  { value: '50', label: 'States covered' },
                  { value: '$0', label: 'Cost to join' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl font-display font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-text-tertiary font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — Step-by-step onboarding */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {[
                {
                  step: 1,
                  icon: SearchIcon,
                  title: 'Search for your name',
                  description: 'Your NPI-verified profile may already be in our directory. Search to find it.',
                },
                {
                  step: 2,
                  icon: ClipboardCheck,
                  title: 'Claim & complete your profile',
                  description: 'Verify your identity, add your specialties, accepted insurance, and a personal bio.',
                },
                {
                  step: 3,
                  icon: Users,
                  title: 'Start receiving patients',
                  description: 'Patients search by location, specialty, and insurance — then contact you directly.',
                },
              ].map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.15 }}
                  className="flex items-start gap-5 bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-teal-500/15 flex items-center justify-center flex-shrink-0">
                    <item.icon size={22} className="text-teal-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-[11px] font-bold text-teal-500 uppercase tracking-widest">Step {item.step}</span>
                    </div>
                    <h3 className="font-display font-bold text-white text-lg mb-1">{item.title}</h3>
                    <p className="text-sm text-text-tertiary leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProvidersLandingPage;
