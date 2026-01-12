import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import SEO from '@/components/SEO';
import { Sparkles, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import { waitlistService } from '@/services/waitlistService';

const SparkLanding: React.FC = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleJoinWaitlist = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email.trim()) {
            setStatus('error');
            setErrorMessage('Please enter your email address');
            return;
        }

        setStatus('loading');
        setErrorMessage('');

        const result = await waitlistService.join(email, 'spark');

        if (result.success) {
            setStatus('success');
            setEmail('');
        } else {
            setStatus('error');
            setErrorMessage(result.error || 'Something went wrong. Please try again.');
        }
    };

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

                {/* Feature Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                    {[
                        { title: 'Personalized Insights', desc: 'AI that learns your patterns' },
                        { title: 'Real-time Support', desc: '24/7 mental wellness companion' },
                        { title: 'Progress Tracking', desc: 'Visualize your growth journey' }
                    ].map((feature, i) => (
                        <div key={i} className="p-4 rounded-xl bg-surface border border-border">
                            <h3 className="font-bold text-text-primary mb-1">{feature.title}</h3>
                            <p className="text-sm text-text-secondary">{feature.desc}</p>
                        </div>
                    ))}
                </div>

                <Card className="p-8 border-primary/20 bg-gradient-to-b from-surface to-background relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold text-text-primary mb-4">Coming Q1 2025</h2>

                        {status === 'success' ? (
                            <div className="flex flex-col items-center gap-3 py-4">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                    <CheckCircle className="text-green-600" size={32} />
                                </div>
                                <h3 className="font-bold text-lg text-text-primary">You're on the list!</h3>
                                <p className="text-text-secondary">
                                    We'll notify you as soon as Spark AI is ready to launch.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleJoinWaitlist} className="space-y-4">
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        className="px-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary/20 outline-none flex-grow max-w-sm"
                                        disabled={status === 'loading'}
                                    />
                                    <Button type="submit" disabled={status === 'loading'}>
                                        {status === 'loading' ? (
                                            <>
                                                <Loader2 className="animate-spin mr-2" size={18} />
                                                Joining...
                                            </>
                                        ) : (
                                            'Join Waitlist'
                                        )}
                                    </Button>
                                </div>

                                {status === 'error' && (
                                    <div className="flex items-center justify-center gap-2 text-red-600 text-sm">
                                        <AlertCircle size={16} />
                                        {errorMessage}
                                    </div>
                                )}

                                <p className="text-xs text-text-tertiary">
                                    Join 2,500+ people already on the waitlist. No spam, ever.
                                </p>
                            </form>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default SparkLanding;
