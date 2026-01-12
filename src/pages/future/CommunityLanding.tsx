import React, { useState } from 'react';
import SEO from '@/components/SEO';
import { Users2, CheckCircle, AlertCircle, Loader2, Shield, Heart, MessageCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { waitlistService } from '@/services/waitlistService';

const CommunityLanding: React.FC = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [showNotifyModal, setShowNotifyModal] = useState(false);
    const [showGuidelinesModal, setShowGuidelinesModal] = useState(false);

    const handleNotify = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email.trim()) {
            setStatus('error');
            setErrorMessage('Please enter your email address');
            return;
        }

        setStatus('loading');
        setErrorMessage('');

        const result = await waitlistService.join(email, 'community');

        if (result.success) {
            setStatus('success');
            setEmail('');
        } else {
            setStatus('error');
            setErrorMessage(result.error || 'Something went wrong. Please try again.');
        }
    };

    const communityGuidelines = [
        {
            icon: Heart,
            title: 'Be Kind & Supportive',
            description: 'Treat everyone with respect and empathy. We\'re all here to support each other on our mental health journeys.'
        },
        {
            icon: Shield,
            title: 'Keep it Safe',
            description: 'Don\'t share personal identifying information. Protect yourself and others. Report concerning behavior.'
        },
        {
            icon: MessageCircle,
            title: 'Share Thoughtfully',
            description: 'Share your experiences, not medical advice. Encourage professional help when appropriate.'
        }
    ];

    return (
        <div className="min-h-screen bg-background pt-32 pb-20 px-6 flex items-center justify-center">
            <SEO title="Community | Coming Soon" />
            <div className="text-center max-w-2xl">
                <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-8 text-secondary">
                    <Users2 size={40} />
                </div>
                <h1 className="text-4xl md:text-6xl font-display font-bold text-text-primary mb-6">Community Hub</h1>
                <p className="text-xl text-text-secondary mb-10 leading-relaxed">
                    Connect, share, and grow with a safe, moderated community <br />
                    dedicated to mental wellness and support.
                </p>

                {/* Community Features Preview */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                    {[
                        { title: 'Support Groups', desc: 'Join topic-based communities' },
                        { title: 'Peer Support', desc: 'Connect with others on similar journeys' },
                        { title: 'Safe Space', desc: 'Moderated, judgment-free environment' }
                    ].map((feature, i) => (
                        <div key={i} className="p-4 rounded-xl bg-surface border border-border">
                            <h3 className="font-bold text-text-primary mb-1">{feature.title}</h3>
                            <p className="text-sm text-text-secondary">{feature.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center gap-4">
                    <Button onClick={() => setShowNotifyModal(true)}>Notify Me</Button>
                    <Button variant="outline" onClick={() => setShowGuidelinesModal(true)}>Learn Guidelines</Button>
                </div>
            </div>

            {/* Notify Modal */}
            <Modal
                isOpen={showNotifyModal}
                onClose={() => {
                    setShowNotifyModal(false);
                    setStatus('idle');
                    setEmail('');
                }}
                title="Get Notified"
                maxWidth="md"
            >
                {status === 'success' ? (
                    <div className="flex flex-col items-center gap-4 py-6">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="text-green-600" size={32} />
                        </div>
                        <h3 className="font-bold text-lg text-text-primary">You're on the list!</h3>
                        <p className="text-text-secondary text-center">
                            We'll notify you as soon as Community Hub launches.
                        </p>
                        <Button onClick={() => {
                            setShowNotifyModal(false);
                            setStatus('idle');
                        }}>
                            Done
                        </Button>
                    </div>
                ) : (
                    <form onSubmit={handleNotify} className="space-y-6">
                        <p className="text-text-secondary">
                            Be the first to know when our Community Hub launches. Enter your email to get notified.
                        </p>

                        <div className="space-y-2">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 rounded-xl bg-surface-hover border border-border focus:ring-2 focus:ring-primary/20 outline-none"
                                disabled={status === 'loading'}
                            />

                            {status === 'error' && (
                                <div className="flex items-center gap-2 text-red-600 text-sm">
                                    <AlertCircle size={16} />
                                    {errorMessage}
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end gap-3">
                            <Button type="button" variant="outline" onClick={() => setShowNotifyModal(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={status === 'loading'}>
                                {status === 'loading' ? (
                                    <>
                                        <Loader2 className="animate-spin mr-2" size={18} />
                                        Subscribing...
                                    </>
                                ) : (
                                    'Notify Me'
                                )}
                            </Button>
                        </div>
                    </form>
                )}
            </Modal>

            {/* Guidelines Modal */}
            <Modal
                isOpen={showGuidelinesModal}
                onClose={() => setShowGuidelinesModal(false)}
                title="Community Guidelines"
                maxWidth="lg"
            >
                <div className="space-y-6">
                    <p className="text-text-secondary">
                        Our community is built on respect, safety, and support. Please review these guidelines before participating.
                    </p>

                    <div className="space-y-4">
                        {communityGuidelines.map((guideline, i) => (
                            <div key={i} className="flex gap-4 p-4 bg-surface-hover rounded-xl">
                                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                                    <guideline.icon className="text-primary" size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-text-primary mb-1">{guideline.title}</h3>
                                    <p className="text-sm text-text-secondary">{guideline.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                        <h4 className="font-bold text-amber-800 mb-2">Important Reminder</h4>
                        <p className="text-sm text-amber-700">
                            This community is not a replacement for professional mental health care.
                            If you're in crisis, please contact a mental health professional or call 988 (Suicide & Crisis Lifeline).
                        </p>
                    </div>

                    <div className="flex justify-end">
                        <Button onClick={() => setShowGuidelinesModal(false)}>
                            I Understand
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default CommunityLanding;
