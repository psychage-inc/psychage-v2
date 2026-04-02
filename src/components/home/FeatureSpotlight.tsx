import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Lock, Shield, AlertTriangle, Compass } from 'lucide-react';
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
        <section aria-label="Symptom Navigator privacy" className="py-16 sm:py-20 lg:py-28 px-6 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-teal-950" />

            <div className="container mx-auto max-w-6xl relative z-10">
                {/* Stats Row */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-3 gap-4 mb-16"
                >
                    {stats.map((stat) => (
                        <div key={stat.label} className="text-center bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 py-6 px-4">
                            <div className="text-3xl md:text-4xl font-display font-bold text-white mb-1">
                                {stat.value}
                            </div>
                            <p className="text-xs text-teal-300/60">{stat.label}</p>
                        </div>
                    ))}
                </motion.div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-5 tracking-tight leading-tight">
                            Understand your symptoms.{' '}
                            <span className="text-teal-400">Without giving up your privacy.</span>
                        </h2>

                        <p className="text-lg text-teal-100/70 leading-relaxed mb-8 max-w-lg">
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
                                    <div className="w-7 h-7 rounded-lg bg-teal-500/10 border border-teal-400/10 flex items-center justify-center shrink-0 mt-0.5">
                                        <Icon className="w-3.5 h-3.5 text-teal-400" />
                                    </div>
                                    <span className="text-sm text-teal-100/60">{text}</span>
                                </div>
                            ))}
                        </div>

                        <Button
                            className="h-12 px-7 rounded-full bg-teal-500 hover:bg-teal-400 text-teal-950 font-bold shadow-sm transition-transform hover:scale-[1.01]"
                            rightIcon={<ArrowRight className="w-4 h-4" />}
                            onClick={() => navigate('/tools/symptom-navigator')}
                        >
                            Select the symptoms you're experiencing
                        </Button>
                    </motion.div>

                    {/* Right: Steps */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="relative"
                    >
                        <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-sm overflow-hidden hover:scale-[1.01] transition-transform">
                            <div className="p-6 md:p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-teal-500/15 flex items-center justify-center">
                                        <Compass className="w-5 h-5 text-teal-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-white">Symptom Navigator</p>
                                        <p className="text-xs text-teal-300/50">3-step guided process</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {[
                                        { step: '1', text: 'Select the symptoms you\'re experiencing', description: 'Choose from 106 mapped symptoms across 4 domains', active: true },
                                        { step: '2', text: 'Rate severity and duration', description: 'Tell us how intense and how long you\'ve felt each symptom', active: false },
                                        { step: '3', text: 'Get matched conditions', description: 'Receive confidence-scored results with recommended next steps', active: false },
                                    ].map((item) => (
                                        <div key={item.step} className={`flex items-start gap-4 p-4 rounded-xl transition-colors ${
                                            item.active ? 'bg-teal-500/10 border border-teal-400/20' : 'bg-transparent'
                                        }`}>
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                                                item.active
                                                    ? 'bg-teal-500 text-teal-950'
                                                    : 'bg-white/5 text-white/30'
                                            }`}>
                                                {item.step}
                                            </div>
                                            <div>
                                                <span className={`text-sm block ${
                                                    item.active ? 'text-white font-medium' : 'text-white/40'
                                                }`}>
                                                    {item.text}
                                                </span>
                                                <span className={`text-xs block mt-0.5 ${
                                                    item.active ? 'text-teal-300/60' : 'text-white/20'
                                                }`}>
                                                    {item.description}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Privacy Footer */}
                            <div className="px-6 md:px-8 pb-6">
                                <div className="flex items-center gap-2 text-xs text-teal-300/50 bg-white/5 rounded-xl px-4 py-3">
                                    <Lock className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                                    <span>All matching happens in your browser. Zero data transmitted.</span>
                                </div>
                            </div>
                        </div>

                        {/* Decorative */}
                        <div className="absolute -z-10 -top-4 -right-4 w-32 h-32 bg-teal-400/10 rounded-full blur-2xl hidden md:block" />
                        <div className="absolute -z-10 -bottom-4 -left-4 w-24 h-24 bg-emerald-400/10 rounded-full blur-2xl hidden md:block" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default FeatureSpotlight;
