import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Users,
  ShieldCheck,
  Globe,
  Gift,
  ChevronDown,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import SEO from '@/components/SEO';
import Button from '@/components/ui/Button';
import ProviderTierSelector from '@/components/providers/onboarding/ProviderTierSelector';
import { cn } from '@/lib/utils';

// --- FAQ Data ---
const FAQ_ITEMS = [
  {
    question: 'How much does it cost?',
    answer:
      'Creating a basic listing on Psychage is completely free. The Free tier includes your name, credentials, specialty tags, and contact information. Premium features such as priority placement, extended bio, photo upload, analytics, and cultural competency badges are available with the Premium tier.',
  },
  {
    question: 'How do I get verified?',
    answer:
      'Verification starts when you submit your application or claim an existing profile using your NPI number. Our team verifies your credentials against the NPI Registry and state licensing databases. Once approved, your profile will display a verified badge, building trust with potential clients.',
  },
  {
    question: 'Can I edit my profile?',
    answer:
      'Yes. Once your profile is approved, you can update your bio, specialties, contact information, and session availability at any time from your provider dashboard. Changes to credentials or NPI information may require re-verification.',
  },
  {
    question: "What's the difference between Free and Premium?",
    answer:
      'The Free tier gives you a basic directory listing with your name, credentials, specialty tags, and contact info. Premium adds priority placement in search results, an extended bio section, professional photo upload, an analytics dashboard to track profile views, and cultural competency badges to attract diverse clients.',
  },
];

// --- Value Props ---
const VALUE_PROPS = [
  {
    icon: Users,
    title: 'Reach People',
    description:
      'Connect with individuals actively seeking mental health support through our growing directory.',
  },
  {
    icon: ShieldCheck,
    title: 'Verified Credibility',
    description:
      'NPI verification and credential checks give prospective clients confidence in your qualifications.',
  },
  {
    icon: Globe,
    title: 'Cultural Diversity',
    description:
      'Showcase cultural competencies and languages to reach underserved communities who need care most.',
  },
  {
    icon: Gift,
    title: 'Free Listing',
    description:
      'Get started at no cost with a basic listing. Upgrade anytime to unlock premium visibility features.',
  },
];

// --- Animation variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ForProvidersLandingPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(prev => (prev === index ? null : index));
  };

  return (
    <>
      <SEO
        title="For Providers | Psychage"
        description="Join the Psychage provider directory. Create a free listing, verify your credentials, and connect with people seeking mental health support."
      />

      <div className="min-h-screen bg-slate-50 dark:bg-gray-950">
        {/* ================================================================
            HERO SECTION
            ================================================================ */}
        <section className="relative overflow-hidden bg-gradient-to-br from-teal-600 via-teal-700 to-teal-900 dark:from-teal-800 dark:via-teal-900 dark:to-gray-950">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-32 -left-32 w-[min(500px,90vw)] h-[min(500px,90vw)] bg-teal-400/10 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-6">
                <Sparkles size={14} className="text-teal-200" />
                <span className="text-sm font-medium text-teal-100">
                  Join our growing provider network
                </span>
              </div>

              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-6">
                Grow Your Practice{' '}
                <span className="text-teal-200">with Psychage</span>
              </h1>

              <p className="text-lg sm:text-xl text-teal-100/90 leading-relaxed max-w-2xl mx-auto mb-10">
                List your practice in a modern mental health directory. Reach
                people searching for the right provider, verified by NPI and
                showcasing what makes you unique.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/for-providers/apply">
                  <Button
                    size="lg"
                    className="bg-white text-teal-700 hover:bg-teal-50 font-bold shadow-lg shadow-black/10 w-full sm:w-auto"
                    rightIcon={<ArrowRight size={18} />}
                  >
                    Create a Listing
                  </Button>
                </Link>
                <Link to="/for-providers/claim">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/30 text-white hover:bg-white/10 font-bold w-full sm:w-auto"
                    rightIcon={<ShieldCheck size={18} />}
                  >
                    Claim Your Profile
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ================================================================
            VALUE PROPOSITIONS
            ================================================================ */}
        <section className="py-20 sm:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              className="text-center mb-14"
            >
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white mb-4">
                Why List on Psychage?
              </h2>
              <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                A directory built for modern mental health professionals.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {VALUE_PROPS.map((prop, index) => {
                const Icon = prop.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow group"
                  >
                    <div className="w-12 h-12 bg-teal-50 dark:bg-teal-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:bg-teal-100 dark:group-hover:bg-teal-900/50 transition-colors">
                      <Icon size={24} className="text-teal-600 dark:text-teal-400" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white mb-2">
                      {prop.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                      {prop.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ================================================================
            TIER COMPARISON
            ================================================================ */}
        <section className="py-20 sm:py-24 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              className="text-center mb-12"
            >
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white mb-4">
                Choose Your Plan
              </h2>
              <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                Start free and upgrade whenever you are ready for more visibility.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <ProviderTierSelector
                value="free"
                onChange={() => {}}
                displayOnly
              />
            </motion.div>

            <div className="text-center mt-10">
              <Link to="/for-providers/apply">
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-teal-600 hover:bg-teal-700"
                  rightIcon={<ArrowRight size={18} />}
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ================================================================
            FAQ SECTION
            ================================================================ */}
        <section className="py-20 sm:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              className="text-center mb-12"
            >
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white mb-4">
                Frequently Asked Questions
              </h2>
            </motion.div>

            <div className="space-y-3">
              {FAQ_ITEMS.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group"
                    aria-expanded={openFaq === index}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span className="font-display font-bold text-gray-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      {item.question}
                    </span>
                    <ChevronDown
                      size={20}
                      className={cn(
                        'flex-shrink-0 text-gray-400 transition-transform duration-300',
                        openFaq === index && 'rotate-180 text-teal-500'
                      )}
                    />
                  </button>

                  <div
                    id={`faq-answer-${index}`}
                    role="region"
                    className={cn(
                      'overflow-hidden transition-all duration-300 ease-in-out',
                      openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    )}
                  >
                    <div className="px-6 pb-5 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {item.answer}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================
            BOTTOM CTA
            ================================================================ */}
        <section className="py-16 sm:py-20 bg-gradient-to-r from-teal-600 to-teal-700 dark:from-teal-800 dark:to-teal-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mb-4">
              Ready to grow your practice?
            </h2>
            <p className="text-teal-100/90 mb-8 max-w-lg mx-auto">
              Join hundreds of verified providers connecting with people who need
              their help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/for-providers/apply">
                <Button
                  size="lg"
                  className="bg-white text-teal-700 hover:bg-teal-50 font-bold w-full sm:w-auto"
                >
                  Create a Listing
                </Button>
              </Link>
              <Link to="/for-providers/claim">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 font-bold w-full sm:w-auto"
                >
                  Claim Your Profile
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ForProvidersLandingPage;
