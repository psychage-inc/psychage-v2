import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export const ContentLanguageNotice: React.FC = () => {
    const { t, i18n } = useTranslation();

    // Only show notice if current language is not English
    if (i18n.language === 'en' || i18n.language.startsWith('en-')) {
        return null;
    }

    return (
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 mb-4 flex items-start gap-3">
            <Globe className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-300 leading-relaxed">
                {t('navigator.content_notice')}
            </p>
        </div>
    );
};
