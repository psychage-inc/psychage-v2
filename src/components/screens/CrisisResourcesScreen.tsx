import React, { useState } from 'react';
import { ShieldAlert, ArrowLeft, Globe, ExternalLink } from 'lucide-react';
import { CrisisResourceCard } from '../navigator/CrisisResourceCard';
import { CrisisResource, CrisisResourceType } from '../../lib/navigator/types';
import { resolveCountry, getResourcesForCountry, type CrisisResource as GeoCrisisResource } from '../../lib/crisis';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';

const FIND_A_HELPLINE_URL = 'https://findahelpline.com';

// lib/crisis exposes a richer resource shape than the navigator CrisisResourceCard renders;
// map the handful of fields the card actually uses.
function toNavigatorResource(r: GeoCrisisResource, i: number): CrisisResource {
    const type: CrisisResourceType =
        r.type === 'hotline' ? 'hotline' : r.type === 'text' ? 'text' : 'directory';
    return {
        id: `${r.source_name}-${i}`,
        region_code: '',
        name: r.name,
        type,
        phone: r.phone,
        text_instruction: r.text_instruction,
        url: r.web_url ?? r.chat_url,
        email: null,
        description: r.notes ?? r.hours,
        hours: r.hours,
        languages: r.languages,
        priority: r.source_priority,
        condition_specific: null,
        is_active: true,
        last_verified: r.last_verified_at,
    };
}

export const CrisisResourcesScreen: React.FC = () => {
    // lib/crisis is synchronous bundled data with a country -> regional -> global fallback
    // (cannot fail closed), so there is no async chunk to spin on. Resolve once for the
    // user's detected country; the global fallback already includes findahelpline.com.
    const [resources] = useState<CrisisResource[]>(() => {
        try {
            return getResourcesForCountry(resolveCountry()).all_resources.map(toNavigatorResource);
        } catch {
            return [];
        }
    });

    return (
        <div className="min-h-screen bg-charcoal-50 dark:bg-charcoal-900 pt-24 pb-12">
            <SEO title="Crisis Resources | Psychage" description="If you or someone you know is in crisis, help is available right now. Free, confidential support 24/7." />
            <div className="max-w-3xl mx-auto px-4 sm:px-6">
                <Link to="/" className="inline-flex items-center text-charcoal-500 hover:text-charcoal-900 dark:text-charcoal-400 dark:hover:text-white font-medium mb-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50 rounded transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                </Link>

                <div className="bg-white dark:bg-charcoal-800 rounded-2xl p-8 sm:p-12 shadow-sm border border-charcoal-200 dark:border-charcoal-700 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-2 bg-crisis-red"></div>

                    <div className="flex flex-col items-center text-center mt-4 mb-10">
                        <div className="w-16 h-16 rounded-full bg-crisis-red/10 flex items-center justify-center mb-6">
                            <ShieldAlert className="w-8 h-8 text-crisis-red" />
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-display font-bold text-charcoal-900 dark:text-white mb-4">
                            Crisis & Emergency Support
                        </h1>
                        <p className="text-lg text-charcoal-600 dark:text-charcoal-300 max-w-xl">
                            If you or someone you know is struggling, there is help available. You are not alone, and reaching out is a sign of strength.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {resources.map((resource) => (
                            <CrisisResourceCard key={resource.id} resource={resource} />
                        ))}

                        {/* Fail-safe: if resolution returned nothing, always offer the
                            international directory rather than an empty screen. */}
                        {resources.length === 0 && (
                            <a
                                href={FIND_A_HELPLINE_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 p-4 rounded-xl bg-charcoal-50 dark:bg-charcoal-700/40 border border-charcoal-200 dark:border-charcoal-700 hover:bg-charcoal-100 dark:hover:bg-charcoal-700 transition-colors group"
                            >
                                <div className="w-10 h-10 rounded-full bg-teal-500/10 flex items-center justify-center shrink-0">
                                    <Globe className="w-5 h-5 text-teal-500" />
                                </div>
                                <div className="flex-1 text-left">
                                    <p className="text-sm font-semibold text-charcoal-900 dark:text-white">Find A Helpline</p>
                                    <p className="text-xs text-charcoal-500 dark:text-charcoal-400">Search crisis helplines in any country worldwide</p>
                                </div>
                                <ExternalLink className="w-4 h-4 text-charcoal-400 group-hover:text-teal-500 transition-colors shrink-0" />
                            </a>
                        )}
                    </div>

                    <div className="mt-12 pt-8 border-t border-charcoal-200 dark:border-charcoal-700 text-center">
                        <p className="text-charcoal-500 dark:text-charcoal-400 text-sm">
                            In the event of a medical emergency or immediate danger, please dial 911 (US) or your local emergency number or proceed to the nearest emergency room.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CrisisResourcesScreen;
