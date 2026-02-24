import React from 'react';
import { ClipboardList, Copy, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

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
        <div className="bg-sage-50/50 dark:bg-sage-900/10 rounded-2xl border border-sage-200 dark:border-sage-800 overflow-hidden">
            <div className="px-6 py-5 border-b border-sage-200 dark:border-sage-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-sage-100 dark:bg-sage-800 rounded-lg text-sage-700 dark:text-sage-300">
                        <ClipboardList className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-lg font-medium text-charcoal-900 dark:text-white">
                        Questions for your Provider
                    </h3>
                </div>

                <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-sage-700 dark:text-sage-300 hover:bg-sage-100 dark:hover:bg-sage-800 focus:outline-none focus:ring-2 focus:ring-sage-500 transition-colors"
                    aria-label={copied ? "Copied to clipboard" : "Copy questions"}
                >
                    {copied ? (
                        <>
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Copied</span>
                        </>
                    ) : (
                        <>
                            <Copy className="w-4 h-4" />
                            <span>Copy</span>
                        </>
                    )}
                </button>
            </div>

            <div className="p-6">
                <p className="text-sm text-charcoal-600 dark:text-charcoal-300 mb-4 pb-2 border-b border-charcoal-100 dark:border-charcoal-800">
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
                            <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-sage-200 dark:bg-sage-700 text-sage-800 dark:text-sage-200 text-xs font-semibold mt-0.5 group-hover:bg-sage-300 dark:group-hover:bg-sage-600 transition-colors">
                                {index + 1}
                            </span>
                            <p className="text-charcoal-800 dark:text-charcoal-200 leading-relaxed">
                                {question}
                            </p>
                        </motion.li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
