import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, AlertCircle } from 'lucide-react';
import { NavigatorButton } from '../navigator/NavigatorButton';
import { navigatorConfig } from '../../lib/navigator/config';

interface AgeGateScreenProps {
    onContinue: () => void;
    onUnderage: () => void;
}

export const AgeGateScreen: React.FC<AgeGateScreenProps> = ({ onContinue, onUnderage }) => {
    const minAge = navigatorConfig.ageGateMinimumAge;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto py-12 px-4 sm:px-6 relative"
        >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-teal-500/10 rounded-full flex items-center justify-center border border-teal-500/30">
                        <ShieldCheck className="w-10 h-10 text-teal-400" />
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-3xl sm:text-4xl font-serif font-medium text-white mb-4 text-center">
                    Age Confirmation
                </h2>

                {/* Description */}
                <p className="text-lg text-charcoal-300 text-center mb-8 leading-relaxed">
                    This symptom navigator is designed for individuals {minAge} years of age or older.
                    If you are under {minAge}, please consult with a parent, guardian, or trusted adult.
                </p>

                {/* Question */}
                <div className="bg-charcoal-900/50 border border-white/10 rounded-2xl p-6 mb-8">
                    <p className="text-xl font-medium text-white text-center mb-6">
                        Are you {minAge} years of age or older?
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <NavigatorButton
                            variant="primary"
                            size="lg"
                            onClick={onContinue}
                            className="min-w-[140px]"
                        >
                            Yes, I am {minAge}+
                        </NavigatorButton>
                        <NavigatorButton
                            variant="outline"
                            size="lg"
                            onClick={onUnderage}
                            className="min-w-[140px]"
                        >
                            No, I am younger
                        </NavigatorButton>
                    </div>
                </div>

                {/* Notice */}
                <div className="flex items-start gap-3 bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                    <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-blue-300 leading-relaxed">
                        This tool provides educational information only and is not a substitute for professional
                        medical advice. If you're experiencing a mental health crisis, please contact emergency
                        services or a crisis hotline immediately.
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

// Underage notice screen
export const UnderageNoticeScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto py-12 px-4 sm:px-6 relative"
        >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl text-center">
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center border border-blue-500/30">
                        <AlertCircle className="w-10 h-10 text-blue-400" />
                    </div>
                </div>

                <h2 className="text-3xl sm:text-4xl font-serif font-medium text-white mb-4">
                    Talk to a Trusted Adult
                </h2>

                <p className="text-lg text-charcoal-300 mb-8 leading-relaxed">
                    This tool may not be appropriate for your age. We encourage you to talk to a parent,
                    guardian, school counselor, or another trusted adult about what you're experiencing.
                </p>

                <div className="bg-charcoal-900/50 border border-white/10 rounded-2xl p-6 mb-8 text-left">
                    <h3 className="font-semibold text-white mb-3">If you need help right now:</h3>
                    <ul className="space-y-2 text-charcoal-300">
                        <li>• Call 988 (Suicide & Crisis Lifeline) - Available 24/7</li>
                        <li>• Text HOME to 741741 (Crisis Text Line)</li>
                        <li>• Talk to a parent, guardian, or school counselor</li>
                        <li>• Visit your school nurse or guidance office</li>
                    </ul>
                </div>

                <NavigatorButton variant="outline" onClick={onBack}>
                    Go Back
                </NavigatorButton>
            </div>
        </motion.div>
    );
};
