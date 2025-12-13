import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, RefreshCw } from 'lucide-react';


interface LayoutProps {
    children: React.ReactNode;
    currentStep: number;
    totalSteps: number;
    onBack: () => void;
    onReset: () => void;
}

const SymptomLayout: React.FC<LayoutProps> = ({ children, currentStep, totalSteps, onBack, onReset }) => {


    return (
        <div className="min-h-screen bg-background pt-24 pb-12 px-6">
            <div className="container mx-auto max-w-4xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-text-tertiary hover:text-text-primary font-bold text-sm uppercase tracking-wider transition-colors"
                    >
                        <ArrowLeft size={16} />
                        {currentStep === 1 ? 'Back to Home' : 'Back'}
                    </button>

                    {currentStep > 1 && (
                        <button
                            onClick={onReset}
                            className="flex items-center gap-2 text-text-tertiary hover:text-primary transition-colors text-sm font-medium"
                        >
                            <RefreshCw size={14} /> Start Over
                        </button>
                    )}
                </div>

                {/* Progress Bar */}
                <div className="mb-12">
                    <div className="h-2 bg-surface border border-border rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-primary"
                            initial={{ width: 0 }}
                            animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        />
                    </div>
                    <div className="flex justify-between mt-2 text-xs font-bold text-text-tertiary uppercase tracking-widest">
                        <span className={currentStep >= 1 ? "text-primary" : ""}>Symptoms</span>
                        <span className={currentStep >= 2 ? "text-primary" : ""}>Refine</span>
                        <span className={currentStep >= 3 ? "text-primary" : ""}>Analysis</span>
                    </div>
                </div>

                {/* Content Area */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default SymptomLayout;
