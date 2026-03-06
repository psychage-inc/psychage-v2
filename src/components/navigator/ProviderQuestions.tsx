import React from 'react';
import { ClipboardList, Copy, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProviderQuestionsProps {
    questions: string[];
}

export const ProviderQuestions: React.FC<ProviderQuestionsProps> = ({ questions }) => {
    const [copied, setCopied] = React.useState(false);

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

    if (!questions || questions.length === 0) return null;

    return (
        <div className="bg-surface/50 backdrop-blur-xl rounded-2xl border border-border shadow-lg overflow-hidden relative group">
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
                            className="flex gap-4 group"
                        >
                            <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-semibold mt-0.5 group-hover:bg-teal-500/30 transition-colors">
                                {index + 1}
                            </span>
                            <p className="text-text-primary leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity">
                                {question}
                            </p>
                        </motion.li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
