import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigator } from '../../context/NavigatorContext';
import { ResultCard } from '../navigator/ResultCard';
import { NextStepCards, NextStepItem } from '../navigator/NextStepCards';
import { ProviderQuestions } from '../navigator/ProviderQuestions';
import { NavigatorButton } from '../navigator/NavigatorButton';
import { ShieldAlert } from 'lucide-react';
import { CrisisResourceCard } from '../navigator/CrisisResourceCard';

export const ResultsScreen: React.FC = () => {
    const { state, dispatch } = useNavigator();
    const { results, knowledgeBase, detectedRegion } = state;

    if (!results || !knowledgeBase) return null;

    const { safety, results: matchResults } = results;

    const handleReset = () => {
        dispatch({ type: 'RESET_FLOW' });
    };

    const nextSteps: NextStepItem[] = [
        {
            id: 'ns1',
            type: 'track',
            title: 'Track Your Symptoms',
            description: 'Consider keeping a daily log of how you feel, noting what makes things better or worse.',
            actionText: 'Start Tracking'
        },
        {
            id: 'ns2',
            type: 'professional',
            title: 'Consult a Professional',
            description: 'Share these insights with a healthcare provider for an accurate assessment.',
            actionText: 'Find a Provider'
        },
        {
            id: 'ns3',
            type: 'selfcare',
            title: 'Practice Self-Care',
            description: 'Explore the Library for guided exercises and educational content.',
            actionText: 'Explore Library'
        }
    ];

    const questions = [
        "I've been noticing these symptoms for [duration]. Is this typical?",
        "Could this be related to stress, physical health, or something else?",
        "What are the most effective treatment options for someone with these specific experiences?",
        "Are there any lifestyle changes you would recommend starting today?"
    ];

    const resources = knowledgeBase.crisisResources[detectedRegion || 'DEFAULT'] || knowledgeBase.crisisResources['DEFAULT'] || [];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-12 pb-24"
        >
            <div className="text-center mb-8">
                <h2 className="text-3xl sm:text-4xl font-serif font-medium text-white mb-4 drop-shadow-sm">
                    Your Insights
                </h2>
                <p className="text-lg text-charcoal-300 max-w-2xl mx-auto">
                    Based on what you've shared, here are some patterns that might relate to your experience. Remember, this is not a diagnosis.
                </p>
            </div>

            {safety.has_crisis && (
                <div className="bg-crisis-red/5 backdrop-blur-md border border-crisis-red/20 shadow-[0_0_30px_rgba(239,68,68,0.1)] p-6 rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-crisis-red z-10 shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
                    <div className="flex items-start gap-4 ml-2">
                        <ShieldAlert className="w-8 h-8 text-crisis-red flex-shrink-0 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                        <div>
                            <h3 className="text-xl font-serif font-semibold text-white mb-2">
                                Prioritizing Your Safety
                            </h3>
                            <p className="text-charcoal-200 mb-6 max-w-2xl leading-relaxed">
                                You mentioned experiences that indicate you might be going through a particularly difficult time. Your safety is deeply important. Please reach out to these resources for immediate support.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {resources.map((resource) => (
                                    <CrisisResourceCard key={resource.id} resource={resource} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Recommended Matches */}
            <section className="relative z-10">
                <h3 className="text-2xl font-serif font-medium text-white mb-6">
                    Relevant Profiles
                </h3>
                <div className="space-y-4">
                    {matchResults.map((match, i) => (
                        <motion.div
                            key={match.condition_id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + (i * 0.1) }}
                        >
                            <ResultCard result={match} />
                        </motion.div>
                    ))}
                    {matchResults.length === 0 && (
                        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 text-center border border-white/10 shadow-lg">
                            <p className="text-charcoal-300 font-medium tracking-wide">
                                We couldn't find a strong match for your specific combination of symptoms, but your experience is still valid.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* Next Steps */}
            <section className="relative z-10">
                <h3 className="text-2xl font-serif font-medium text-white mb-6">
                    Suggested Next Steps
                </h3>
                <NextStepCards steps={nextSteps} />
            </section>

            <section>
                <ProviderQuestions questions={questions} />
            </section>

            <div className="flex justify-center pt-8 border-t border-white/10 relative z-10">
                <NavigatorButton variant="outline" onClick={handleReset}>
                    Start Over
                </NavigatorButton>
            </div>

        </motion.div>
    );
};
