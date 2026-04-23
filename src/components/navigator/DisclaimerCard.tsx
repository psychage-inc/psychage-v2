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
                "bg-surface/50 rounded-lg p-5 border border-border",
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
                    <div className="font-display text-lg text-text-primary font-medium" role="heading" aria-level={2}>
                        Not Medical Advice
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed">
                        The Symptom Navigator is an educational tool designed to help you understand your experiences and find relevant resources. It is <strong className="font-semibold">not a diagnostic tool</strong> and cannot replace professional medical or mental health advice.
                    </p>
                    <p className="text-sm text-text-secondary leading-relaxed">
                        If you are in immediate danger or experiencing a medical emergency, please call{' '}
                        <a href="tel:911" className="underline font-semibold text-red-600 dark:text-red-400">911</a>{' '}
                        (or your local emergency number) immediately.
                    </p>
                </div>
            </div>
        </div>
    );
};
