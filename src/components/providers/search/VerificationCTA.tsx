import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import Button from '@/components/ui/Button';

export const VerificationCTA: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="mt-12 bg-gradient-to-r from-teal-600 to-teal-700 dark:from-teal-700 dark:to-teal-800 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
        <ShieldCheck size={24} className="text-white" />
      </div>
      <div className="flex-1 text-center sm:text-left">
        <h3 className="font-display font-bold text-lg text-white mb-1">{t('providers.cta.provider_title')}</h3>
        <p className="text-sm text-teal-100">
          {t('providers.cta.provider_desc')}
        </p>
      </div>
      <Link to="/for-providers" className="flex-shrink-0">
        <Button
          className="bg-white text-teal-700 hover:bg-teal-50 font-bold px-6 shadow-lg shadow-teal-800/20"
          rightIcon={<ArrowRight size={16} />}
        >
          {t('providers.cta.get_listed')}
        </Button>
      </Link>
    </div>
  );
};

export default VerificationCTA;
