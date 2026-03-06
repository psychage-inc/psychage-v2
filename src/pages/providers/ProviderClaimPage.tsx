import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import SEO from '@/components/SEO';
import ProviderClaimForm from '@/components/providers/onboarding/ProviderClaimForm';

const ProviderClaimPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Claim Your Profile | Psychage"
        description="Claim your existing provider profile on Psychage. Verify your NPI number to take ownership of your listing."
      />

      <div className="min-h-screen bg-slate-50 dark:bg-gray-950">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          {/* Back link */}
          <Link
            to="/for-providers"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors mb-8"
          >
            <ChevronLeft size={16} />
            Back to For Providers
          </Link>

          {/* Page header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-gray-900 dark:text-white mb-3">
              Claim Your Profile
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400">
              If your practice already appears in our directory, you can claim it
              by verifying your NPI number. This connects the listing to your
              Psychage account so you can manage it directly.
            </p>
          </motion.div>

          {/* Claim form */}
          <ProviderClaimForm />
        </div>
      </div>
    </>
  );
};

export default ProviderClaimPage;
