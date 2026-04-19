import React from 'react';
import { ClipboardList, Copy, CheckCircle2, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';
import { CONDITION_TO_SPECIALTY } from '@/lib/providers/search';

interface MatchedCondition {
    condition_id: string;
    name: string;
}

interface ProviderQuestionsProps {
    questions: string[];
    /** Strong matches (high/moderate) from the Navigator — used for the Find Care CTA */
    matchedConditions?: MatchedCondition[];
}

export const ProviderQuestions: React.FC<ProviderQuestionsProps> = ({ questions, matchedConditions }) => {
    const [copied, setCopied] = React.useState(false);
    const navigate = useNavigate();

    const handleCopy = async () => {
        try {
            const textToCopy = questions.map((q, i) => `${i + 1}. ${q}`).join('\n');
            await navigator.clipboard.writeText(textToCopy);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    const handleFindProviders = () => {
        if (!matchedConditions?.length) return;
        const slugs = matchedConditions
            .map(c => CONDITION_TO_SPECIALTY[c.condition_id])
            .filter(Boolean);
        const uniqueSlugs = [...new Set(slugs)];
        const params = new URLSearchParams();
        if (uniqueSlugs.length > 0) {
            params.set('specialty_slugs', uniqueSlugs.join(','));
        }
        navigate(`/providers/search?${params.toString()}`);
    };

    if (!questions || questions.length === 0) return null;

    const conditionNames = matchedConditions?.map(c => c.name).join(', ');

    return (
        <Card variant="glass" className="overflow-hidden relative group p-0">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent pointer-events-none" />

            <div className="px-6 py-5 border-b border-border flex items-center justify-between relative z-10 bg-surface/50">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-surface-hover/50 rounded-lg text-teal-400 border border-border">
                        <ClipboardList className="w-5 h-5" />
                    </div>
                    <h3 className="font-display text-lg font-medium text-text-primary">
                        Questions for your Provider
                    </h3>
                </div>

                <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface-hover focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-colors border border-transparent hover:border-border"
                    aria-label={copied ? "Copied to clipboard" : "Copy questions"}
                >
                    <AnimatePresence mode="wait">
                        {copied ? (
                            <motion.span
                                key="copied"
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.5, opacity: 0 }}
                                transition={{ duration: 0.15 }}
                                className="flex items-center gap-2 text-teal-400"
                            >
                                <CheckCircle2 className="w-4 h-4" />
                                Copied
                            </motion.span>
                        ) : (
                            <motion.span
                                key="copy"
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.5, opacity: 0 }}
                                transition={{ duration: 0.15 }}
                                className="flex items-center gap-2"
                            >
                                <Copy className="w-4 h-4" />
                                Copy
                            </motion.span>
                        )}
                    </AnimatePresence>
                </button>
            </div>

            <div className="p-6 relative z-10">
                <p className="text-sm text-text-secondary mb-4 pb-4 border-b border-border">
                    Consider bringing these questions to your next mental health appointment or doctor's visit to help guide the conversation:
                </p>

                <ul className="space-y-4">
                    {questions.map((question, index) => (
                        <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex gap-4 group/item"
                        >
                            <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-semibold mt-0.5 group-hover/item:bg-teal-500/30 transition-colors">
                                {index + 1}
                            </span>
                            <p className="text-text-primary leading-relaxed opacity-90 group-hover/item:opacity-100 transition-opacity">
                                {question}
                            </p>
                        </motion.li>
                    ))}
                </ul>

                {/* Find Care CTA — only shown when strong matches exist */}
                {matchedConditions && matchedConditions.length > 0 && (
                    <div className="mt-6 pt-5 border-t border-border space-y-3">
                        <button
                            onClick={handleFindProviders}
                            className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-primary hover:bg-primary-hover text-white font-bold text-sm rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                            aria-label={`Find providers who can help with ${conditionNames}`}
                        >
                            <Search className="w-4 h-4" />
                            Find providers who can help{conditionNames ? ` with ${conditionNames}` : ''}
                        </button>
                        <p className="text-center">
                            <button
                                type="button"
                                onClick={() => {/* no-op: user stays on current screen */}}
                                className="text-xs text-text-tertiary hover:text-text-secondary transition-colors"
                            >
                                Skip for now
                            </button>
                        </p>
                    </div>
                )}
            </div>
        </Card>
    );
};
