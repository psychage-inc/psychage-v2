import React from 'react';
import { ArrowRight, Shield, BookOpen, Sparkles, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';
import MeshGradient from '@/components/ui/MeshGradient';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const HeroSection: React.FC = () => {
    const navigate = useNavigate();
    const prefersReducedMotion = useReducedMotion();

    const animate = (delay = 0) =>
        prefersReducedMotion
            ? { initial: { opacity: 1 }, animate: { opacity: 1 }, transition: { duration: 0 } }
            : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] } };

    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-background pt-20">
            <MeshGradient className="opacity-50 dark:opacity-30" />

            <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-16 items-center w-full max-w-7xl">

                {/* Left Column: Messaging */}
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">

                    {/* Badge */}
                    <motion.div {...animate(0)} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 dark:bg-teal-950/40 border border-teal-100 dark:border-teal-800/40">
                        <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                        <span className="text-xs font-semibold text-teal-700 dark:text-teal-300 tracking-wide">
                            The mental health platform you deserve
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.div {...animate(0.1)} className="space-y-5 max-w-xl">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                            Understand your mind.{' '}
                            <span className="text-teal-600 dark:text-teal-400">
                                On your terms.
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg mx-auto lg:mx-0">
                            Free, evidence-based tools and assessments to help you understand and improve your mental wellbeing — privately and at your own pace.
                        </p>
                    </motion.div>

                    {/* CTAs */}
                    <motion.div {...animate(0.2)} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center">
                        <Button
                            className="h-13 px-8 rounded-full text-base shadow-lg shadow-teal-500/15 bg-teal-600 hover:bg-teal-700 text-white transition-all hover:shadow-xl hover:shadow-teal-500/20"
                            onClick={() => navigate('/clarity-score')}
                            rightIcon={<ArrowRight className="w-5 h-5" />}
                        >
                            Take a Free Assessment
                        </Button>

                        <Button
                            variant="ghost"
                            className="h-13 px-8 rounded-full text-base border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                            onClick={() => navigate('/tools')}
                        >
                            Explore Tools
                        </Button>
                    </motion.div>

                    {/* Trust Strip */}
                    <motion.div {...animate(0.35)} className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
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
        <div className="relative w-full max-w-md mx-auto">
            {/* Main Glass Card */}
            <div className="relative overflow-hidden rounded-3xl bg-white/80 dark:bg-slate-900/70 backdrop-blur-2xl border border-slate-200/60 dark:border-white/10 shadow-2xl shadow-slate-900/10 dark:shadow-black/30">

                {/* Card Header */}
                <div className="px-6 pt-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                            </div>
                            <div>
                                <h3 className="font-display font-semibold text-sm text-slate-800 dark:text-slate-100">Wellbeing Assessment</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Your results</p>
                            </div>
                        </div>
                        <span className="text-xs font-medium text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 px-2.5 py-1 rounded-full">
                            Free
                        </span>
                    </div>
                </div>

                {/* Score Display */}
                <div className="px-6 py-6">
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20 border-4 border-white dark:border-slate-800 shadow-lg mb-3">
                            <span className="text-2xl font-display font-bold text-teal-700 dark:text-teal-300">78</span>
                        </div>
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Clarity Score</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Above average</p>
                    </div>

                    {/* Metric Bars */}
                    <div className="space-y-4">
                        {[
                            { label: 'Emotional Awareness', value: 82, color: 'bg-teal-500' },
                            { label: 'Stress Resilience', value: 65, color: 'bg-amber-500' },
                            { label: 'Sleep Quality', value: 74, color: 'bg-indigo-500' },
                        ].map((metric) => (
                            <div key={metric.label} className="space-y-1.5">
                                <div className="flex justify-between text-xs">
                                    <span className="font-medium text-slate-600 dark:text-slate-300">{metric.label}</span>
                                    <span className="text-slate-500 dark:text-slate-400">{metric.value}%</span>
                                </div>
                                <div className="h-2 w-full bg-slate-100 dark:bg-slate-700/50 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${metric.value}%` }}
                                        transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
                                        className={`h-full ${metric.color} rounded-full`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 pb-6">
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded-xl px-4 py-3">
                        <Lock className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
                        <span>Processed entirely on your device. No data stored.</span>
                    </div>
                </div>
            </div>

            {/* Floating Decoration */}
            <div className="absolute -z-10 top-1/2 -right-8 w-24 h-24 bg-teal-400/20 rounded-full blur-2xl" />
            <div className="absolute -z-10 -bottom-6 -left-6 w-32 h-32 bg-indigo-400/15 rounded-full blur-2xl" />
        </div>
    );
};

export default HeroSection;
