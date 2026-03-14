import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, BookOpen, AlertCircle } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/lib/animations';

const pillars = [
    {
        icon: BookOpen,
        title: 'Evidence-based',
        description: 'All tools are built on established clinical frameworks including CBT, PHQ-9, and GAD-7 screening instruments.',
    },
    {
        icon: Lock,
        title: 'Privacy-first architecture',
        description: 'Symptom data and assessment results are processed client-side. Your mental health information never touches our servers.',
    },
    {
        icon: Shield,
        title: 'Verified providers',
        description: 'Every provider in our directory is NPI-verified. We check credentials so you don\'t have to.',
    },
    {
        icon: AlertCircle,
        title: 'Not a substitute for care',
        description: 'Psychage is an educational resource. It is not a diagnostic tool or a replacement for professional mental health treatment.',
    },
];

const TrustSection: React.FC = () => {
    return (
        <section className="py-14 sm:py-16 lg:py-24 px-6 bg-white dark:bg-slate-950">
            <div className="container mx-auto max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-14"
                >
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
                        Built on evidence. Designed with care.
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        We take the responsibility of mental health seriously. Here's how we earn your trust.
                    </p>
                </motion.div>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    {pillars.map((pillar) => {
                        const Icon = pillar.icon;
                        return (
                            <motion.div
                                key={pillar.title}
                                variants={staggerItem}
                                className="flex gap-4 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800"
                            >
                                <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0">
                                    <Icon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                                </div>
                                <div>
                                    <h3 className="font-display font-semibold text-slate-900 dark:text-white mb-1.5">
                                        {pillar.title}
                                    </h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                        {pillar.description}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default TrustSection;
