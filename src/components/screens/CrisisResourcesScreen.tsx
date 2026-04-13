import React, { useEffect, useState } from 'react';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { CrisisResourceCard } from '../navigator/CrisisResourceCard';
import { CrisisResource } from '../../lib/navigator/types';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';

export const CrisisResourcesScreen: React.FC = () => {
    const [resources, setResources] = useState<CrisisResource[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // In a real app we'd fetch directly from /api/navigator/knowledge-base
        // For now, load from mock
        import('../../data/mock_knowledge_base').then((module) => {
            const kb = module.mockKnowledgeBase;
            // Assuming US for standard distinct page, or try detecting
            const data = kb.crisisResources['US'] || kb.crisisResources['INT'] || [];
            setResources(data);
            setLoading(false);
        });
    }, []);

    return (
        <div className="min-h-screen bg-charcoal-50 dark:bg-charcoal-900 pt-24 pb-12">
            <SEO title="Crisis Resources | Psychage" description="If you or someone you know is in crisis, help is available right now. Free, confidential support 24/7." />
            <div className="max-w-3xl mx-auto px-4 sm:px-6">
                <Link to="/" className="inline-flex items-center text-charcoal-500 hover:text-charcoal-900 dark:text-charcoal-400 dark:hover:text-white font-medium mb-8 focus:outline-none transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                </Link>

                <div className="bg-white dark:bg-charcoal-800 rounded-2xl p-8 sm:p-12 shadow-sm border border-charcoal-200 dark:border-charcoal-700 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-2 bg-crisis-red"></div>

                    <div className="flex flex-col items-center text-center mt-4 mb-10">
                        <div className="w-16 h-16 rounded-full bg-crisis-red/10 flex items-center justify-center mb-6">
                            <ShieldAlert className="w-8 h-8 text-crisis-red" />
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal-900 dark:text-white mb-4">
                            Crisis & Emergency Support
                        </h1>
                        <p className="text-lg text-charcoal-600 dark:text-charcoal-300 max-w-xl">
                            If you or someone you know is struggling, there is help available. You are not alone, and reaching out is a sign of strength.
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center p-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-crisis-red"></div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {resources.map((resource) => (
                                <CrisisResourceCard key={resource.id} resource={resource} />
                            ))}
                        </div>
                    )}

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
