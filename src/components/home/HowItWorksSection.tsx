import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Sparkles, ArrowRight, Lock } from 'lucide-react';
import InteractiveCard from '../ui/InteractiveCard';
import { useNavigate } from 'react-router-dom';

const steps = [
    {
        icon: Compass,
        title: 'Choose your starting point',
        description: 'Pick an assessment, explore a self-care tool, or browse a topic that matters to you.',
        color: 'from-teal-400 to-emerald-500',
    },
    {
        icon: Sparkles,
        title: 'Get personalized insights',
        description: 'AI-powered analysis processed on your device gives you a clear picture of where you stand.',
        color: 'from-indigo-400 to-purple-500',
    },
    {
        icon: ArrowRight,
        title: 'Take your next step',
        description: 'Actionable recommendations, matched providers, and learning paths tailored to your results.',
        color: 'from-amber-400 to-orange-500',
    },
];

const HowItWorksSection: React.FC = () => {
    const navigate = useNavigate();

    return (
        <section id="how-it-works" className="relative py-28 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/80 to-white dark:from-slate-950 dark:via-slate-900/50 dark:to-slate-950" />
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />

            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-2xl mx-auto mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
                        Three steps to clarity.
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400">
                        No sign-up required. Start exploring your mental wellbeing in minutes — with everything processed privately on your device.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                    {/* Connecting Line */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-slate-200 dark:bg-slate-800 -translate-y-1/2 z-0" />

                    {steps.map((step, index) => (
                        <motion.div
                            key={step.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative z-10"
                        >
                            <InteractiveCard className="h-full bg-white dark:bg-slate-900 border-slate-200/60 dark:border-slate-800 shadow-sm hover:shadow-md">
                                <div className="p-8 flex flex-col items-center text-center h-full">
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} p-3.5 text-white shadow-lg mb-6 flex items-center justify-center`}>
                                        <step.icon className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-lg font-display font-semibold text-slate-900 dark:text-white mb-3">
                                        {step.title}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                                        {step.description}
                                    </p>
                                </div>
                            </InteractiveCard>
                        </motion.div>
                    ))}
                </div>

                {/* Privacy callout + CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.35 }}
                    className="mt-14 flex flex-col items-center gap-5"
                >
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                        <Lock className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                        <span>Your data never leaves your device</span>
                    </div>
                    <button
                        onClick={() => navigate('/clarity-score')}
                        className="inline-flex items-center gap-2 px-8 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-medium text-sm hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-lg"
                    >
                        Start Your Journey
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default HowItWorksSection;
