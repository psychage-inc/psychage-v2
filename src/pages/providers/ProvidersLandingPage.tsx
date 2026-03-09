import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck, Search as SearchIcon,
  ArrowRight, UserCheck, MessageCircle, Stethoscope,
  FlaskConical, Sparkles, Check,
} from 'lucide-react';
import SEO from '@/components/SEO';
import Button from '@/components/ui/Button';
import { ProviderSearchBar } from '@/components/providers/search/ProviderSearchBar';
import { useProviderLookups } from '@/context/ProviderLookupsContext';

const TRUST_INDICATORS = [
  { icon: UserCheck, label: '5,000+ Providers', description: 'Mental health professionals across the US' },
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

  const conditionSpecialties = lookups.conditionSpecialties.slice(0, 12);
  const providerTypes = lookups.providerTypes;

  const handleSearch = (query: string, _location: string) => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    navigate(`/providers/search?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950">
      <SEO
        title="Find a Mental Health Provider | Psychage"
        description="Search thousands of verified therapists, psychologists, and counselors. Free to search, no account required."
      />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-50/50 to-transparent dark:from-teal-900/10 dark:to-transparent" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-800 mb-6">
              <Stethoscope size={14} className="text-teal-600 dark:text-teal-400" />
              <span className="text-xs font-bold tracking-widest uppercase text-teal-700 dark:text-teal-300">Provider Directory</span>
            </div>
            <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-gray-900 dark:text-white mb-4 tracking-tight">
              Find a Mental Health Provider{' '}
              <span className="text-gray-400 dark:text-gray-500">You Can Trust</span>
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10">
              Search thousands of verified therapists, psychologists, and counselors.
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
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
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
                <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="font-display font-bold text-sm text-gray-900 dark:text-white mb-1">{item.label}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Specialty */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display font-bold text-3xl text-gray-900 dark:text-white mb-2">Browse by Specialty</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-10">Find providers who specialize in what you need.</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {conditionSpecialties.map((spec, i) => (
              <motion.div
                key={spec.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={`/providers/search?specialty=${spec.slug}`}
                  className="block p-5 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-teal-200 dark:hover:border-teal-800 hover:shadow-sm transition-all group"
                >
                  <h3 className="font-display font-bold text-sm text-gray-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors mb-1">
                    {spec.label}
                  </h3>
                  <div className="flex items-center text-xs text-gray-400 group-hover:text-teal-500 transition-colors">
                    Find providers
                    <ArrowRight size={12} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Provider Type */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display font-bold text-3xl text-gray-900 dark:text-white mb-2">Find the Right Type of Support</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-10">Different types of mental health professionals for different needs.</p>

          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {providerTypes.map(type => (
              <Link
                key={type.id}
                to={`/providers/search?type=${type.id}`}
                className="flex-shrink-0 w-56 p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-teal-200 dark:hover:border-teal-800 hover:shadow-sm transition-all group"
              >
                <h3 className="font-display font-bold text-sm text-gray-900 dark:text-white mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                  {type.label}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                  {type.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display font-bold text-3xl text-gray-900 dark:text-white mb-12">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((item) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: item.step * 0.15 }}
              >
                <div className="w-14 h-14 rounded-2xl bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-teal-600 dark:text-teal-400" />
                </div>
                <div className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest mb-2">Step {item.step}</div>
                <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* For Providers CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-10 sm:p-12 text-white">
            <h2 className="font-display font-bold text-2xl sm:text-3xl mb-3">Grow Your Practice, Reach More Patients</h2>
            <p className="text-gray-300 mb-6 max-w-lg mx-auto">
              Join the Psychage provider directory and connect directly with patients seeking care.
            </p>
            <div className="flex flex-col items-start gap-3 max-w-md mx-auto mb-8 text-left">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                  <Check size={12} className="text-teal-400" />
                </div>
                <span className="text-sm text-gray-300">Free NPI-verified listing — no hidden fees</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                  <Check size={12} className="text-teal-400" />
                </div>
                <span className="text-sm text-gray-300">No commissions, no middlemen — patients contact you directly</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                  <Check size={12} className="text-teal-400" />
                </div>
                <span className="text-sm text-gray-300">5,000+ providers already listed and growing</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/for-providers">
                <Button className="bg-teal-500 hover:bg-teal-600 text-white font-bold px-8" rightIcon={<ArrowRight size={16} />}>
                  List Your Practice
                </Button>
              </Link>
              <Link to="/for-providers/claim">
                <Button variant="outline" className="text-white border-gray-600 hover:bg-gray-700 font-bold px-8">
                  Claim Your Profile
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProvidersLandingPage;
