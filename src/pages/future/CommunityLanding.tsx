import React from 'react';

import SEO from '@/components/SEO';
import { Users2 } from 'lucide-react';
import Button from '@/components/ui/Button';

const CommunityLanding: React.FC = () => {
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
                <div className="flex justify-center gap-4">
                    <Button>Notify Me</Button>
                    <Button variant="outline">Learn Guidelines</Button>
                </div>
            </div>
        </div>
    );
};

export default CommunityLanding;
