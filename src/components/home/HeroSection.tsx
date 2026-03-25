import React from 'react';
import { ArrowRight, Shield, BookOpen, Sparkles, Lock, Heart } from 'lucide-react';
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
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-background pt-24 pb-20">
            {/* Soft ambient background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 -left-32 w-96 h-96 bg-teal-100/30 dark:bg-teal-900/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 -right-32 w-80 h-80 bg-teal-50/40 dark:bg-teal-950/10 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(600px,90vw)] h-[min(600px,90vw)] bg-emerald-50/20 dark:bg-emerald-950/5 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10 max-w-4xl text-center">

                {/* Warm intro badge */}
                <motion.div {...animate(0)} className="flex justify-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 dark:bg-teal-950/40 border border-teal-200/50 dark:border-teal-800/40">
                        <Heart className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                        <span className="text-sm font-medium text-teal-700 dark:text-teal-300">Your well-being matters</span>
                    </div>
                </motion.div>

                {/* Headline */}
                <motion.div {...animate(0.05)} className="space-y-6 mb-10">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold tracking-tight text-text-primary leading-[1.08]">
                        Understanding yourself{' '}
                        <span className="text-teal-600 dark:text-teal-400">is the first step</span>{' '}
                        toward feeling better.
                    </h1>

                    <p className="text-lg sm:text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto">
                        Explore how you're feeling with free, private mental health tools — built on clinical frameworks and designed with care. Everything stays on your device.
                    </p>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div {...animate(0.15)} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                    <Button
                        className="h-14 px-8 rounded-full text-base bg-teal-600 hover:bg-teal-700 text-white font-bold shadow-lg shadow-teal-600/20 border-none"
                        rightIcon={<ArrowRight size={18} />}
                        onClick={() => navigate('/clarity-score')}
                    >
                        Explore how you're feeling
                    </Button>
                    <Button
                        variant="outline"
                        className="h-14 px-8 rounded-full text-base border-border hover:bg-surface-hover text-text-primary font-medium"
                        rightIcon={<BookOpen size={16} />}
                        onClick={() => navigate('/tools/symptom-navigator')}
                    >
                        I have specific symptoms
                    </Button>
                </motion.div>

                {/* Journey cards */}
                <motion.div {...animate(0.25)} className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-12">
                    {[
                        {
                            icon: Sparkles,
                            title: 'Clarity Score',
                            desc: 'A 3-minute check-in to understand your mental baseline',
                            color: 'text-teal-600 dark:text-teal-400',
                            bg: 'bg-teal-50 dark:bg-teal-950/30',
                        },
                        {
                            icon: BookOpen,
                            title: 'Learn & Grow',
                            desc: 'Expert-written guides on anxiety, mood, resilience, and more',
                            color: 'text-emerald-600 dark:text-emerald-400',
                            bg: 'bg-emerald-50 dark:bg-emerald-950/30',
                        },
                        {
                            icon: Shield,
                            title: 'Completely Private',
                            desc: 'No accounts needed. Nothing leaves your device — ever',
                            color: 'text-slate-600 dark:text-slate-400',
                            bg: 'bg-slate-50 dark:bg-slate-900/50',
                        },
                    ].map(({ icon: Icon, title, desc, color, bg }) => (
                        <div
                            key={title}
                            className={`${bg} rounded-2xl p-5 text-left border border-transparent hover:border-border transition-colors`}
                        >
                            <Icon className={`w-5 h-5 ${color} mb-3`} />
                            <h3 className="font-display font-semibold text-sm text-text-primary mb-1">{title}</h3>
                            <p className="text-xs text-text-secondary leading-relaxed">{desc}</p>
                        </div>
                    ))}
                </motion.div>

                {/* Trust Strip */}
                <motion.div {...animate(0.35)} className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
                    {[
                        { icon: Shield, label: 'Free forever' },
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
        </section>
    );
};

export default HeroSection;
