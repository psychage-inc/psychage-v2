import React, { useRef } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Button from '@/components/ui/Button';
import Magnetic from '@/components/ui/Magnetic';
import { useNavigate } from 'react-router-dom';
import MeshGradient from '@/components/ui/MeshGradient';
import HeroInsightCard from './hero/HeroInsightCard';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const HeroSection: React.FC = () => {
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    const prefersReducedMotion = useReducedMotion();

    // Subtle parallax for text - disabled when user prefers reduced motion
    const textY = useTransform(scrollY, [0, 500], prefersReducedMotion ? [0, 0] : [0, 100]);
    const opacity = useTransform(scrollY, [0, 300], prefersReducedMotion ? [1, 1] : [1, 0]);

    return (
        <section
            ref={containerRef}
            className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-background pt-20"
        >
            {/* Mesh Gradient Background */}
            <MeshGradient className="opacity-60 dark:opacity-40" />

            <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-12 items-center w-full max-w-7xl">

                {/* Left Column: Text Content */}
                <motion.div
                    style={{ y: textY, opacity }}
                    className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8"
                >
                    {/* Badge */}
                    <motion.div
                        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow cursor-default"
                    >
                        <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-pulse"></span>
                        <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 uppercase tracking-wide">
                            AI-Powered Profiling
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <div className="space-y-4 max-w-2xl">
                        <motion.h1
                            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1]"
                        >
                            Discover the <br />
                            <span className="bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.teal.500),theme(colors.indigo.600),theme(colors.purple.500),theme(colors.teal.500))] bg-[length:200%_auto] animate-gradient">
                                Age of Your Mind
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.8, delay: 0.2 }}
                            className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg mx-auto lg:mx-0"
                        >
                            Your cognitive age defines how you see the world. Uncover your hidden psychological traits with our professional-grade assessment.
                        </motion.p>
                    </div>

                    {/* CTAs */}
                    <motion.div
                        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.8, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto items-center"
                    >
                        <Magnetic>
                            <Button
                                className="h-14 px-8 rounded-full text-lg shadow-xl shadow-teal-500/20 bg-teal-600 hover:bg-teal-700 text-white transition-all hover:shadow-2xl hover:shadow-teal-500/30"
                                onClick={() => navigate('/clarity-score')}
                            >
                                Start Free Analysis
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Magnetic>

                        <Magnetic>
                            <Button
                                variant="ghost"
                                className="h-14 px-8 rounded-full text-lg border-2 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm"
                                onClick={() => {
                                    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                <Play className="mr-2 w-5 h-5" />
                                How it works
                            </Button>
                        </Magnetic>
                    </motion.div>

                    {/* Trust Proof */}
                    <motion.div
                        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={prefersReducedMotion ? { duration: 0 } : { duration: 1, delay: 0.5 }}
                        className="pt-4 flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400"
                    >
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white dark:border-slate-900 overflow-hidden ring-2 ring-transparent hover:ring-teal-500/50 transition-all transform hover:-translate-y-1">
                                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 20}`} alt="User" />
                                </div>
                            ))}
                        </div>
                        <p>Joined by 50,000+ others</p>
                    </motion.div>
                </motion.div>

                {/* Right Column: Visual/Card */}
                <div className="relative flex justify-center lg:justify-end">
                    <HeroInsightCard />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
