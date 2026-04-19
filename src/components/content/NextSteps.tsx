import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface Step {
    label: string;
    href: string;
    description?: string;
}

interface NextStepsProps {
    steps: Step[];
    title?: string;
}

const NextSteps: React.FC<NextStepsProps> = ({ steps, title = "Recommended Next Steps" }) => {
    if (!steps || steps.length === 0) return null;

    return (
        <div className="bg-teal-50/50 dark:bg-teal-950/20 rounded-2xl p-8 border border-teal-100 dark:border-teal-800/30">
            <h3 className="font-display font-bold text-xl text-teal-900 dark:text-teal-100 mb-6 flex items-center gap-2">
                <CheckCircle2 size={20} className="text-teal-600 dark:text-teal-400" />
                {title}
            </h3>
            <div className="space-y-3">
                {steps.map((step, index) => (
                    <Link
                        key={index}
                        to={step.href}
                        className="group flex items-center justify-between p-4 bg-white dark:bg-neutral-900 rounded-xl border border-teal-100/50 dark:border-teal-800/30 hover:border-teal-300 dark:hover:border-teal-600 hover:shadow-md transition-all"
                    >
                        <div>
                            <span className="font-bold text-text-primary group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors">
                                {step.label}
                            </span>
                            {step.description && (
                                <p className="text-sm text-text-tertiary mt-1">{step.description}</p>
                            )}
                        </div>
                        <ArrowRight size={18} className="text-teal-400 group-hover:text-teal-600 dark:group-hover:text-teal-300 group-hover:translate-x-1 transition-all" />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default NextSteps;
