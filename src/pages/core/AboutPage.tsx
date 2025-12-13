import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Globe, Heart, Brain } from 'lucide-react';
import Button from '@/components/ui/Button';
import SEO from '@/components/SEO';

const AboutPage: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const stats = [
        { label: "Active Users", value: "50k+" },
        { label: "Articles Published", value: "200+" },
        { label: "Verified Providers", value: "1,200+" },
        { label: "Countries Reached", value: "45" },
    ];

    const values = [
        {
            icon: Shield,
            title: "Clinical Integrity",
            desc: "Every piece of content is reviewed by licensed mental health professionals to ensure medical accuracy."
        },
        {
            icon: Heart,
            title: "Radical Empathy",
            desc: "We design for the human experience, prioritizing warmth, safety, and understanding in every interaction."
        },
        {
            icon: Globe,
            title: "Universal Access",
            desc: "Mental health education should be a right, not a privilege. Our core resources will always be free."
        }
    ];

    return (
        <div className="min-h-screen bg-background pt-28 pb-20">
            <SEO
                title="About Us - Psychage"
                description="Learn about Psychage's mission to democratize access to mental clarity through evidence-based resources and clinical tools."
            />

            {/* Hero */}
            <div className="container mx-auto px-6 max-w-5xl mb-24 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-xs uppercase tracking-widest mb-8">
                        Since 2024
                    </div>
                    <h1 className="font-display font-bold text-5xl md:text-7xl text-text-primary mb-8 tracking-tight leading-[1.1]">
                        Democratizing access to <br />
                        <span className="text-primary">mental clarity.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed font-light">
                        Psychage is an adaptive mental health operating system designed to bridge the gap between clinical science and daily life.
                    </p>
                </motion.div>
            </div>

            {/* Stats Grid */}
            <div className="bg-surface border-y border-border py-16 mb-24">
                <div className="container mx-auto px-6 max-w-[1200px]">
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
            <div className="container mx-auto px-6 max-w-[1200px] mb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="relative">
                        <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-shadow/10">
                            <img
                                src="/images/ui/about-team.svg"
                                alt="Team meeting"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Floating Card */}
                        <div className="absolute -bottom-8 -right-8 bg-surface p-6 rounded-2xl shadow-xl border border-border max-w-xs hidden md:block">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-primary/10 text-primary rounded-lg">
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
                        <div className="prose prose-lg text-text-secondary">
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
                                    src="/images/authors/author-placeholder.svg"
                                    alt="Founder"
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div>
                                    <div className="font-bold text-text-primary">Dr. James Wilson</div>
                                    <div className="text-sm text-text-secondary">Founder & Clinical Director</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Values */}
            <div className="bg-surface-active text-text-primary py-24 px-6 border-y border-border">
                <div className="container mx-auto max-w-[1200px]">
                    <div className="text-center mb-16">
                        <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">Our Core Principles</h2>
                        <p className="text-text-secondary max-w-2xl mx-auto">The framework that guides every decision we make.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {values.map((val, idx) => (
                            <div key={idx} className="bg-surface border border-border p-8 rounded-3xl hover:bg-surface-hover transition-colors">
                                <div className="w-12 h-12 bg-surface-hover rounded-xl flex items-center justify-center text-primary mb-6">
                                    <val.icon size={24} />
                                </div>
                                <h3 className="font-bold text-xl mb-3">{val.title}</h3>
                                <p className="text-text-secondary leading-relaxed">
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
                    <Button size="lg" className="bg-primary hover:bg-primary-hover text-white">Explore Articles</Button>
                    <Button size="lg" variant="outline">Join the Team</Button>
                </div>
            </div>

        </div>
    );
};

export default AboutPage;