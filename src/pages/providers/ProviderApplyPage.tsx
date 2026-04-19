import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import SEO from '@/components/SEO';
import ProviderApplyForm from '@/components/providers/onboarding/ProviderApplyForm';

const ProviderApplyPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Apply as a Provider | Psychage"
        description="Create your provider listing on Psychage. Complete the application to join our verified mental health provider directory."
      />

      <div className="min-h-screen bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          {/* Back link */}
          <Link
            to="/for-providers"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-text-tertiary hover:text-primary transition-colors mb-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
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
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-text-primary mb-3">
              Create Your Listing
            </h1>
            <p className="text-lg text-text-tertiary">
              Complete the steps below to apply for a provider listing on Psychage.
              Your application will be reviewed by our team.
            </p>
          </motion.div>

          {/* Form */}
          <ProviderApplyForm />
        </div>
      </div>
    </>
  );
};

export default ProviderApplyPage;
