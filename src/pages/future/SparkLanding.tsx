import React from 'react';
import { Card } from '@/components/ui/Card';
import SEO from '@/components/SEO';
import { Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';

const SparkLanding: React.FC = () => {
    return (
        <div className="min-h-screen bg-background pt-32 pb-20 px-6 flex items-center justify-center">
            <SEO title="Spark AI | Coming Soon" />
            <div className="text-center max-w-2xl">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 text-primary animate-pulse">
                    <Sparkles size={40} />
                </div>
                <h1 className="text-4xl md:text-6xl font-display font-bold text-text-primary mb-6">Psychage Spark</h1>
                <p className="text-xl text-text-secondary mb-10 leading-relaxed">
                    The next generation of adaptive mental health intelligence. <br />
                    Personalized insights powered by advanced AI models.
                </p>
                <Card className="p-8 border-primary/20 bg-gradient-to-b from-surface to-background relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold text-text-primary mb-4">Coming Q1 2025</h2>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <input
                                placeholder="Enter your email"
                                className="px-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary/20 outline-none"
                            />
                            <Button>Join Waitlist</Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default SparkLanding;
