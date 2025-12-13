import React from 'react';
import { Card } from '@/components/ui/Card';
import SEO from '@/components/SEO';
import { useParams } from 'react-router-dom';

const ProviderDetailAdmin: React.FC = () => {
    const { id } = useParams();
    return (
        <div className="min-h-screen bg-background pt-24 pb-20 px-6">
            <SEO title="Provider Details | Admin" />
            <div className="container mx-auto max-w-[1400px]">
                <h1 className="text-3xl font-display font-bold text-text-primary mb-8">Provider Verification: {id}</h1>
                <Card className="p-8">
                    <p className="text-text-secondary">Provider verification details will appear here.</p>
                </Card>
            </div>
        </div>
    );
};

export default ProviderDetailAdmin;
