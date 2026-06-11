import React, { useMemo } from 'react';
import { Phone, MessageCircle, ExternalLink, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getResourcesForCountry } from '@/lib/crisis/engine';

const CrisisResourceBanner: React.FC = () => {
    const { t } = useTranslation();
    const resources = useMemo(() => {
        // Always show US resources as primary (target audience is US-based)
        const result = getResourcesForCountry('US');
        return result.all_resources.filter(r => r.phone).slice(0, 2);
    }, []);

    return (
        <div
            role="complementary"
            aria-label={t('crisis.articleBanner.region_aria')}
            className="not-prose bg-red-600 dark:bg-red-700 border border-red-700 dark:border-red-600 rounded-2xl p-6 md:p-8 shadow-lg"
        >
            <div className="flex items-start gap-3 mb-5">
                <Heart size={22} className="text-white shrink-0 mt-0.5" fill="currentColor" />
                <div>
                    <h3 className="text-lg font-bold text-white">
                        {t('crisis.articleBanner.title')}
                    </h3>
                    <p className="text-sm text-white/90 mt-1">
                        {t('crisis.articleBanner.subtitle')}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                {resources.map((resource, i) => {
                    const isWhiteCard = i % 2 === 0;
                    return (
                        <a
                            key={i}
                            href={`tel:${resource.phone}`}
                            className={`flex items-center gap-4 rounded-xl p-4 border hover:shadow-md transition-all group ${
                                isWhiteCard
                                    ? 'bg-surface text-text-primary border-white/80 hover:border-white'
                                    : 'bg-white/15 text-white border-white/20 hover:border-white/40'
                            }`}
                        >
                            <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                                isWhiteCard
                                    ? 'bg-red-100 text-red-600 group-hover:bg-red-200'
                                    : 'bg-white/20 text-white group-hover:bg-white/30'
                            }`}>
                                {resource.type === 'hotline' ? <Phone size={18} /> : <MessageCircle size={18} />}
                            </div>
                            <div className="min-w-0">
                                <p className={`font-bold text-sm ${isWhiteCard ? 'text-text-primary' : 'text-white'}`}>
                                    {resource.name}
                                </p>
                                <p className={`text-lg font-bold tracking-wide ${isWhiteCard ? 'text-red-600' : 'text-white'}`}>
                                    {resource.phone}
                                </p>
                                {resource.text_instruction && (
                                    <p className={`text-xs mt-0.5 ${isWhiteCard ? 'text-text-tertiary' : 'text-white/70'}`}>
                                        {resource.text_instruction}
                                    </p>
                                )}
                            </div>
                        </a>
                    );
                })}
            </div>

            <Link
                to="/crisis"
                className="inline-flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white underline underline-offset-2 transition-colors"
            >
                {t('crisis.articleBanner.view_all')}
                <ExternalLink size={14} />
            </Link>
        </div>
    );
};

export default CrisisResourceBanner;
