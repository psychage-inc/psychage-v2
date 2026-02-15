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
        <div className="bg-teal-50/50 rounded-2xl p-8 border border-teal-100">
            <h3 className="font-display font-bold text-xl text-teal-900 mb-6 flex items-center gap-2">
                <CheckCircle2 size={20} className="text-teal-600" />
                {title}
            </h3>
            <div className="space-y-3">
                {steps.map((step, index) => (
                    <Link
                        key={index}
                        to={step.href}
                        className="group flex items-center justify-between p-4 bg-white rounded-xl border border-teal-100/50 hover:border-teal-300 hover:shadow-md transition-all"
                    >
                        <div>
                            <span className="font-bold text-gray-900 group-hover:text-teal-700 transition-colors">
                                {step.label}
                            </span>
                            {step.description && (
                                <p className="text-sm text-gray-500 mt-1">{step.description}</p>
                            )}
                        </div>
                        <ArrowRight size={18} className="text-teal-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all" />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default NextSteps;
