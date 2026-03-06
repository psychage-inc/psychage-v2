import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ArrowRight, Lock, Shield, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/ui/Button';

const stats = [
    { value: '106', label: 'Symptoms mapped' },
    { value: '45', label: 'Conditions covered' },
    { value: '0', label: 'Data sent to servers' },
];

const FeatureSpotlight: React.FC = () => {
    const navigate = useNavigate();

    return (
        <section className="py-28 px-6 bg-slate-50/50 dark:bg-slate-950 border-y border-slate-100 dark:border-slate-800">
            <div className="container mx-auto max-w-6xl">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/30 mb-6">
                            <Activity className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                            <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 tracking-wide">
                                Most advanced tool
                            </span>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-5 tracking-tight leading-tight">
                            Understand your symptoms.{' '}
                            <span className="text-indigo-600 dark:text-indigo-400">Without giving up your privacy.</span>
                        </h2>

                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8 max-w-lg">
                            The Symptom Navigator helps you map what you're experiencing to potential conditions — all processed entirely on your device. No data is sent to any server, ever.
                        </p>

                        {/* Trust Points */}
                        <div className="space-y-3 mb-10">
                            {[
                                { icon: Lock, text: 'Client-side processing — your data stays on your device' },
                                { icon: Shield, text: 'Built on established clinical frameworks' },
                                { icon: AlertTriangle, text: 'Automatic crisis detection with instant resources' },
                            ].map(({ icon: Icon, text }) => (
                                <div key={text} className="flex items-start gap-3">
                                    <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center shrink-0 mt-0.5">
                                        <Icon className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                    <span className="text-sm text-slate-600 dark:text-slate-400">{text}</span>
                                </div>
                            ))}
                        </div>

                        <Button
                            className="h-12 px-7 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/15"
                            rightIcon={<ArrowRight className="w-4 h-4" />}
                            onClick={() => navigate('/tools/symptom-navigator')}
                        >
                            Try the Symptom Navigator
                        </Button>
                    </motion.div>

                    {/* Right: Visual Stats + Mini Demo */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="relative"
                    >
                        {/* Stats Card */}
                        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-900/5 dark:shadow-black/20 overflow-hidden">
                            {/* Stats Row */}
                            <div className="grid grid-cols-3 divide-x divide-slate-100 dark:divide-slate-800 border-b border-slate-100 dark:border-slate-800">
                                {stats.map((stat) => (
                                    <div key={stat.label} className="p-6 text-center">
                                        <div className="text-2xl md:text-3xl font-display font-bold text-slate-900 dark:text-white mb-1">
                                            {stat.value}
                                        </div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">{stat.label}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Mini Walkthrough Preview */}
                            <div className="p-6 md:p-8">
                                <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-5">
                                    How it works
                                </p>
                                <div className="space-y-4">
                                    {[
                                        { step: '1', text: 'Select the symptoms you\'re experiencing', active: true },
                                        { step: '2', text: 'Rate severity and duration for each', active: false },
                                        { step: '3', text: 'Get matched conditions with confidence scores', active: false },
                                    ].map((item) => (
                                        <div key={item.step} className="flex items-center gap-4">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                                                item.active
                                                    ? 'bg-indigo-600 text-white'
                                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500'
                                            }`}>
                                                {item.step}
                                            </div>
                                            <span className={`text-sm ${
                                                item.active
                                                    ? 'text-slate-900 dark:text-white font-medium'
                                                    : 'text-slate-500 dark:text-slate-400'
                                            }`}>
                                                {item.text}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Privacy Footer */}
                            <div className="px-6 md:px-8 pb-6">
                                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded-xl px-4 py-3">
                                    <Lock className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                                    <span>All matching happens in your browser. Zero data transmitted.</span>
                                </div>
                            </div>
                        </div>

                        {/* Decorative */}
                        <div className="absolute -z-10 -top-4 -right-4 w-32 h-32 bg-indigo-400/10 rounded-full blur-2xl" />
                        <div className="absolute -z-10 -bottom-4 -left-4 w-24 h-24 bg-purple-400/10 rounded-full blur-2xl" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default FeatureSpotlight;
