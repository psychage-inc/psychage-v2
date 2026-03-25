import React, { useMemo } from 'react';
import { Phone, MessageCircle, ExternalLink, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getResourcesForCountry } from '@/lib/crisis/engine';
import { resolveCountry } from '@/lib/crisis/geo';
import type { CrisisResource } from '@/lib/crisis/types';

const ResourceIcon: React.FC<{ type: CrisisResource['type'] }> = ({ type }) => {
    switch (type) {
        case 'hotline':
            return <Phone size={16} />;
        case 'text':
        case 'chat':
        case 'whatsapp':
            return <MessageCircle size={16} />;
        default:
            return <ExternalLink size={16} />;
    }
};

const CrisisResourceBanner: React.FC = () => {
    const resources = useMemo(() => {
        const country = resolveCountry();
        const result = getResourcesForCountry(country);
        // Show up to 2 top resources
        return result.all_resources.slice(0, 2);
    }, []);

    return (
        <div
            role="complementary"
            aria-label="Crisis support resources"
            className="not-prose bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800/30 rounded-2xl p-6 md:p-8"
        >
            <div className="flex items-start gap-3 mb-4">
                <Heart size={22} className="text-rose-500 shrink-0 mt-0.5" fill="currentColor" />
                <div>
                    <h3 className="text-lg font-bold text-rose-900 dark:text-rose-200">
                        You Are Not Alone
                    </h3>
                    <p className="text-sm text-rose-700 dark:text-rose-300 mt-1">
                        If you or someone you know is in crisis, help is available 24/7. You do not need to face this alone.
                    </p>
                </div>
            </div>

            {resources.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    {resources.map((resource, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-3 bg-white dark:bg-gray-900/40 rounded-xl p-4 border border-rose-100 dark:border-rose-800/20"
                        >
                            <div className="w-9 h-9 rounded-full bg-rose-100 dark:bg-rose-900/40 flex items-center justify-center text-rose-600 dark:text-rose-400 shrink-0">
                                <ResourceIcon type={resource.type} />
                            </div>
                            <div className="min-w-0">
                                <p className="font-semibold text-sm text-gray-900 dark:text-gray-100 truncate">
                                    {resource.name}
                                </p>
                                {resource.phone && (
                                    <a
                                        href={`tel:${resource.phone}`}
                                        className="text-sm font-medium text-rose-600 dark:text-rose-400 hover:underline"
                                    >
                                        {resource.phone}
                                    </a>
                                )}
                                {!resource.phone && resource.web_url && (
                                    <a
                                        href={resource.web_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-rose-600 dark:text-rose-400 hover:underline"
                                    >
                                        Visit website
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <Link
                to="/crisis"
                className="inline-flex items-center gap-2 text-sm font-medium text-rose-700 dark:text-rose-300 hover:text-rose-900 dark:hover:text-rose-100 transition-colors"
            >
                View all crisis resources
                <ExternalLink size={14} />
            </Link>
        </div>
    );
};

export default CrisisResourceBanner;
