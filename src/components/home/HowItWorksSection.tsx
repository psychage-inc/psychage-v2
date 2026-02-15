import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Sparkles, TrendingUp, ArrowRight } from 'lucide-react';
import InteractiveCard from '../ui/InteractiveCard';
import { useNavigate } from 'react-router-dom';

const steps = [
    {
        icon: Brain,
        title: "Share Your State",
        description: "Answer adaptive questions about your feelings, thoughts, and current challenges.",
        color: "from-blue-400 to-indigo-500",
        delay: 0
    },
    {
        icon: Sparkles,
        title: "AI Analysis",
        description: "Our AI analyzes your cognitive patterns to determine your current mental age.",
        color: "from-purple-400 to-pink-500",
        delay: 0.1
    },
    {
        icon: TrendingUp,
        title: "Grow & Thrive",
        description: "Receive personalized tools, meditations, and insights to optimize your mind.",
        color: "from-emerald-400 to-teal-500",
        delay: 0.2
    }
];

const HowItWorksSection: React.FC = () => {
    const navigate = useNavigate();

    return (
        <section id="how-it-works" className="relative py-24 overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white/50" />
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 mb-4">
                            Understand Your Mind
                        </h2>
                        <p className="text-lg text-slate-600">
                            PsychAge isn't just a survey. It's an intelligent system that adapts to you, helping you understand and improve your mental wellbeing in three simple steps.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 z-0" />

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: step.delay }}
                            className="relative z-10"
                        >
                            <InteractiveCard className="h-full bg-white border-slate-200/60 shadow-sm hover:shadow-md">
                                <div className="p-8 flex flex-col items-center text-center h-full">
                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} p-4 text-white shadow-lg mb-6 transform transition-transform duration-300 group-hover:scale-110 flex items-center justify-center`}>
                                        <step.icon className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-slate-900 mb-3">
                                        {step.title}
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </InteractiveCard>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-16 text-center"
                >
                    <button
                        onClick={() => navigate('/clarity-score')}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200"
                    >
                        Start Your Journey
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default HowItWorksSection;
