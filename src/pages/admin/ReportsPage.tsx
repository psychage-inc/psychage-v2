import React from 'react';
import { Card } from '@/components/ui/Card';
import SEO from '@/components/SEO';

const ReportsPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-background pt-24 pb-20 px-6">
            <SEO title="User Reports | Admin" />
            <div className="container mx-auto max-w-[1400px]">
                <h1 className="text-3xl font-display font-bold text-text-primary mb-8">User Reports</h1>
                <Card className="p-8">
                    <p className="text-text-secondary">No user reports submitted.</p>
                </Card>
            </div>
        </div>
    );
};

export default ReportsPage;
