import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface BreadcrumbStep {
    id: string;
    label: string;
    stepNumber: number;
}

interface BreadcrumbProps {
    currentStep: 'welcome' | 'domains' | 'symptoms' | 'details' | 'processing' | 'results';
    onStepClick?: (step: string) => void;
}

const steps: BreadcrumbStep[] = [
    { id: 'welcome', label: 'Welcome', stepNumber: 0 },
    { id: 'domains', label: 'Domains', stepNumber: 1 },
    { id: 'symptoms', label: 'Symptoms', stepNumber: 2 },
    { id: 'details', label: 'Details', stepNumber: 3 },
    { id: 'processing', label: 'Processing', stepNumber: 4 },
    { id: 'results', label: 'Results', stepNumber: 5 },
];

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ currentStep, onStepClick }) => {
    const currentStepNumber = steps.find(s => s.id === currentStep)?.stepNumber ?? 0;

    const handleStepClick = (step: BreadcrumbStep) => {
        // Only allow clicking on previous/completed steps
        if (step.stepNumber < currentStepNumber && onStepClick) {
            onStepClick(step.id);
        }
    };

    return (
        <nav aria-label="Progress" className="py-4 px-4 sm:px-6 max-w-3xl mx-auto">
            <ol className="flex items-center justify-start flex-wrap gap-2 sm:gap-3">
                {steps.map((step, index) => {
                    const isCurrent = step.id === currentStep;
                    const isCompleted = step.stepNumber < currentStepNumber;
                    const isClickable = isCompleted;

                    return (
                        <React.Fragment key={step.id}>
                            {index > 0 && (
                                <ChevronRight
                                    className="w-4 h-4 text-charcoal-600 flex-shrink-0"
                                    aria-hidden="true"
                                />
                            )}
                            <li className="flex items-center">
                                {isClickable ? (
                                    <button
                                        type="button"
                                        onClick={() => handleStepClick(step)}
                                        className={cn(
                                            "text-sm sm:text-base font-medium transition-colors px-2 py-1 rounded-md",
                                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-900",
                                            "hover:bg-white/5",
                                            isCompleted && "text-teal-400 hover:text-teal-300"
                                        )}
                                        aria-label={`Go back to ${step.label}`}
                                    >
                                        {step.label}
                                    </button>
                                ) : (
                                    <span
                                        className={cn(
                                            "text-sm sm:text-base font-medium px-2 py-1 rounded-md",
                                            isCurrent && "text-white bg-white/10 font-semibold",
                                            !isCurrent && !isCompleted && "text-charcoal-500"
                                        )}
                                        aria-current={isCurrent ? "step" : undefined}
                                    >
                                        {step.label}
                                    </span>
                                )}
                            </li>
                        </React.Fragment>
                    );
                })}
            </ol>
        </nav>
    );
};
