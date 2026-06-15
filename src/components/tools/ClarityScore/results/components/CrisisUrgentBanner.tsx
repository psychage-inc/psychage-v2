import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Phone, MessageSquare, ArrowRight } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';

import { resolveCountry, getPrimaryCrisisLine } from '@/lib/crisis';

const CrisisUrgentBanner: React.FC = () => {
  const { t } = useTranslation();
  const crisisLine = getPrimaryCrisisLine(resolveCountry());
  const callHref = crisisLine?.phone ? `tel:${crisisLine.phone}` : 'tel:988';
  const smsHref = crisisLine?.phone ? `sms:${crisisLine.phone}` : 'sms:741741?body=HOME';
  const callLabel = crisisLine?.phone ? `Call ${crisisLine.phone}` : t('crisis.clarityBanner.call_988');
  const smsLabel = crisisLine?.text_instruction || t('crisis.clarityBanner.text_home');

  return (
    <div
      role="alert"
      aria-live="polite"
      className="mt-6 rounded-2xl border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/30 p-5 md:p-6"
    >
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/40 flex items-center justify-center text-red-600 dark:text-red-400">
          <AlertTriangle size={20} aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-display font-bold text-red-900 dark:text-red-200 text-lg md:text-xl leading-tight">
            {t('crisis.clarityBanner.heading')}
          </h3>
          <p className="mt-2 text-sm md:text-[15px] text-red-900/80 dark:text-red-200/80 leading-relaxed">
            {t('crisis.clarityBanner.body')}
          </p>

          <div className="mt-4 flex flex-col sm:flex-row flex-wrap gap-2">
            <a
              href={callHref}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors"
            >
              <Phone size={16} aria-hidden="true" />
              {callLabel}
            </a>
            <a
              href={smsHref}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-red-950/60 border border-red-300 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-700 dark:text-red-200 text-sm font-semibold transition-colors"
            >
              <MessageSquare size={16} aria-hidden="true" />
              {smsLabel}
            </a>
            <Link
              to="/crisis"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/30 text-sm font-semibold transition-colors"
            >
              {t('crisis.clarityBanner.more_resources')}
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>

          <p className="mt-3 text-xs text-red-800/70 dark:text-red-300/70">
            {t('crisis.clarityBanner.meta')}
          </p>
          <p className="mt-1 text-xs text-red-800/70 dark:text-red-300/70">
            <Trans
              i18nKey="crisis.clarityBanner.danger_911"
              components={{ emergency: <a href="tel:911" className="underline font-semibold" /> }}
            />
          </p>
        </div>
      </div>
    </div>
  );
};

export default CrisisUrgentBanner;
