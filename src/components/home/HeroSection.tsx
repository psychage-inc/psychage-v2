import React from 'react';
import { ArrowRight, Shield, BookOpen, Sparkles, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const HeroSection: React.FC = () => {
    const navigate = useNavigate();
    const prefersReducedMotion = useReducedMotion();

    const animate = (delay = 0) =>
        prefersReducedMotion
            ? { initial: { opacity: 1 }, animate: { opacity: 1 }, transition: { duration: 0 } }
            : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] } };

    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-background pt-20 pb-16">
            <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-16 items-center w-full max-w-7xl">

                {/* Left Column: Messaging */}
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">

                    {/* Headline */}
                    <motion.div {...animate(0.05)} className="space-y-5 max-w-xl">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-text-primary leading-[1.1]">
                            Actionable mental health insights
                        </h1>

                        <p className="text-lg text-text-secondary leading-relaxed max-w-lg mx-auto lg:mx-0">
                            Complete clinically-validated assessments and track your clarity, mood, and sleep over time—all locally on your device.
                        </p>
                    </motion.div>

                    {/* CTAs */}
                    <motion.div {...animate(0.15)} className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto items-center">
                        <Button
                            className="h-12 px-8 rounded-lg text-base font-medium bg-primary hover:bg-primary-hover text-white transition-colors"
                            onClick={() => navigate('/clarity-score')}
                            rightIcon={<ArrowRight className="w-4 h-4" />}
                        >
                            Start Assessment
                        </Button>

                        <Button
                            variant="outline"
                            className="h-12 px-8 rounded-lg text-base font-medium transition-colors"
                            onClick={() => navigate('/tools')}
                        >
                            View All Tools
                        </Button>
                    </motion.div>

                    {/* Trust Strip */}
                    <motion.div {...animate(0.25)} className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
                        {[
                            { icon: Shield, label: '100% Free' },
                            { icon: Lock, label: 'Privacy-first' },
                            { icon: BookOpen, label: 'Evidence-based' },
                        ].map(({ icon: Icon, label }) => (
                            <div key={label} className="flex items-center gap-1.5">
                                <Icon className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                                <span>{label}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Right Column: Product Preview */}
                <motion.div
                    initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                    className="relative flex justify-center lg:justify-end"
                >
                    <ProductPreviewCard />
                </motion.div>
            </div>
        </section>
    );
};

/** Visual product preview card replacing the old coaching insight card */
const ProductPreviewCard: React.FC = () => {
    return (
        <div className="w-full max-w-md mx-auto">
            {/* Main Card */}
            <div className="overflow-hidden rounded-2xl bg-surface border border-border shadow-md">

                {/* Card Header */}
                <div className="px-6 pt-6 pb-4 border-b border-border">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-surface-hover flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-display font-semibold text-sm text-text-primary">Wellbeing Assessment</h3>
                                <p className="text-xs text-text-secondary">Your results</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Score Display */}
                <div className="px-6 pt-6 pb-6">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-surface-hover mb-3">
                            <span className="text-2xl font-display font-bold text-primary">78</span>
                        </div>
                        <p className="text-sm font-semibold text-text-primary">Clarity Score</p>
                        <p className="text-xs text-text-secondary">Above baseline</p>
                    </div>

                    {/* Metric Bars */}
                    <div className="space-y-4">
                        {[
                            { label: 'Emotional Awareness', value: 82, color: 'bg-primary' },
                            { label: 'Stress Resilience', value: 65, color: 'bg-primary/80' },
                            { label: 'Sleep Quality', value: 74, color: 'bg-primary/60' },
                        ].map((metric) => (
                            <div key={metric.label} className="space-y-1.5">
                                <div className="flex justify-between text-xs">
                                    <span className="font-medium text-text-primary">{metric.label}</span>
                                    <span className="text-text-secondary">{metric.value}%</span>
                                </div>
                                <div className="h-2 w-full bg-surface-hover rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${metric.value}%` }}
                                        transition={{ duration: 1, ease: 'easeOut' }}
                                        className={`h-full ${metric.color} rounded-full`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 pb-6 pt-2">
                    <div className="flex items-center gap-2 text-xs text-text-tertiary">
                        <Lock className="w-3.5 h-3.5 shrink-0" />
                        <span>Analyzed locally on device</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
