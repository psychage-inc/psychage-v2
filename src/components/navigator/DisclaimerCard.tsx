import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { cn } from '../../lib/utils';

interface DisclaimerCardProps {
    className?: string;
}

export const DisclaimerCard: React.FC<DisclaimerCardProps> = ({ className }) => {
    return (
        <div
            className={cn(
                "bg-charcoal-50 dark:bg-charcoal-800/50 rounded-lg p-5 border border-charcoal-200 dark:border-charcoal-700",
                className
            )}
            role="region"
            aria-label="Medical Disclaimer"
        >
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-0.5 text-sage-600 dark:text-sage-400">
                    <ShieldAlert className="w-6 h-6" aria-hidden="true" />
                </div>
                <div className="space-y-2">
                    <h3 className="font-serif text-lg text-charcoal-900 dark:text-charcoal-100 font-medium">
                        Not Medical Advice
                    </h3>
                    <p className="text-sm text-charcoal-600 dark:text-charcoal-300 leading-relaxed">
                        The Symptom Navigator is an educational tool designed to help you understand your experiences and find relevant resources. It is <strong className="font-semibold">not a diagnostic tool</strong> and cannot replace professional medical or mental health advice.
                    </p>
                    <p className="text-sm text-charcoal-600 dark:text-charcoal-300 leading-relaxed">
                        If you are in immediate danger or experiencing a medical emergency, please call your local emergency services immediately.
                    </p>
                </div>
            </div>
        </div>
    );
};
