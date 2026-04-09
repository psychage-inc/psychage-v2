import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Globe, Heart, Brain } from 'lucide-react';
import Button from '../ui/Button';
import SEO from '../SEO';

const AboutPage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const stats = [
        { label: "Languages Supported", value: "5" },
        { label: "Articles Published", value: "2,000+" },
        { label: "Verified Providers", value: "5,600+" },
        { label: "Crisis Resources", value: "24/7" },
    ];

    const values = [
        {
            icon: Shield,
            title: "Integrity",
            desc: "Every piece of content is reviewed by professional mental health experts to ensure accuracy."
        },
        {
            icon: Heart,
            title: "Empathy",
            desc: "We design for the human experience, prioritizing warmth, safety, and understanding in every interaction."
        },
        {
            icon: Globe,
            title: "Universal Access",
            desc: "Mental health access should be a right, not a privilege. Our core resources will always be free, multilingual, and accessible to people with disabilities."
        }
    ];

    return (
        <div className="min-h-screen bg-background pt-28 pb-20">
            <SEO
                title="About Us - Psychage"
                description="Learn about Psychage's mission to democratize access to mental clarity through evidence-based resources and evidence-informed tools."
            />

            {/* Hero */}
            <div className="container mx-auto px-6 max-w-5xl mb-24 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-800/50 text-teal-800 dark:text-teal-300 font-bold text-xs uppercase tracking-widest mb-8">
                        Since 2024
                    </div>
                    <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-7xl text-text-primary mb-8 tracking-tight leading-[1.1]">
                        Democratizing access to <br />
                        <span className="text-teal-600">mental clarity.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed font-light">
                        Psychage is an adaptive mental health operating system designed to bridge the gap between clinical science and daily life.
                    </p>
                </motion.div>
            </div>

            {/* Stats Grid */}
            <div className="bg-surface border-y border-border py-16 mb-24">
                <div className="container mx-auto px-6 max-w-dashboard">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="text-center">
                                <div className="font-display font-bold text-4xl md:text-5xl text-text-primary mb-2">{stat.value}</div>
                                <div className="text-sm font-bold uppercase tracking-widest text-text-tertiary">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mission Section */}
            <div className="container mx-auto px-6 max-w-dashboard mb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="relative">
                        <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-teal-900/10">
                            <img
                                src="/images/ui/about-team.svg"
                                alt="Team meeting"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Floating Card */}
                        <div className="absolute -bottom-8 -right-8 bg-surface p-6 rounded-2xl shadow-xl border border-border max-w-xs hidden md:block">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-lg">
                                    <Brain size={20} />
                                </div>
                                <span className="font-bold text-text-primary">Evidence Based</span>
                            </div>
                            <p className="text-sm text-text-secondary leading-relaxed">
                                Our content follows the APA guidelines for psychological education.
                            </p>
                        </div>
                    </div>

                    <div>
                        <h2 className="font-display font-bold text-3xl md:text-4xl text-text-primary mb-6">
                            Why we started Psychage.
                        </h2>
                        <div className="prose prose-lg text-text-secondary dark:prose-invert">
                            <p className="mb-6">
                                The mental health landscape is fragmented. Reliable information is locked behind paywalls or buried in academic journals, while social media is flooded with pseudoscience.
                            </p>
                            <p className="mb-6">
                                We built Psychage to be the single source of truth—a platform that respects your intelligence while nurturing your well-being. We combine world-class design with clinical rigor to create tools that you actually want to use.
                            </p>
                            <p>
                                We believe that understanding your own mind shouldn't be a luxury. It's a fundamental requirement for a well-lived life.
                            </p>
                        </div>
                        <div className="mt-8 pt-8 border-t border-border">
                            <div className="flex items-center gap-4">
                                <img
                                    src="/images/logo.png"
                                    alt="Psychage logo"
                                    className="w-12 h-12 object-contain"
                                />
                                <div>
                                    <div className="font-bold text-text-primary">Dr. Lena Dobson, Ph.D. in Clinical Neuropsychology</div>
                                    <div className="text-sm text-text-secondary">Founder</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Values */}
            <div className="bg-gray-900 text-white py-24 px-6">
                <div className="container mx-auto max-w-dashboard">
                    <div className="text-center mb-16">
                        <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">Our Core Principles</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">The framework that guides every decision we make.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {values.map((val, idx) => (
                            <div key={idx} className="bg-gray-800/50 border border-gray-700 p-8 rounded-3xl hover:bg-gray-800 transition-colors">
                                <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center text-teal-400 mb-6">
                                    <val.icon size={24} />
                                </div>
                                <h3 className="font-bold text-xl mb-3">{val.title}</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    {val.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="container mx-auto px-6 py-24 text-center">
                <h2 className="font-display font-bold text-4xl text-text-primary mb-8">Ready to explore?</h2>
                <div className="flex justify-center gap-4">
                    <Button size="lg" className="bg-teal-600 hover:bg-teal-700" onClick={() => navigate('/learn')}>Explore Articles</Button>
                    <Button size="lg" variant="outline" onClick={() => navigate('/contact')}>Join the Team</Button>
                </div>
            </div>

        </div>
    );
};

export default AboutPage;