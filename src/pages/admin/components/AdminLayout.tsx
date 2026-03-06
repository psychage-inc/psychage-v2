import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import AdminSidebar from '../AdminSidebar';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import { GlobalLoading } from '@/components/ui/Skeletons';

interface AdminLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle?: string;
    seoTitle?: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title, subtitle, seoTitle }) => {
    const { user } = useAuth();
    const [onboardingStatus, setOnboardingStatus] = useState<'loading' | 'needed' | 'completed'>('loading');

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            setOnboardingStatus('completed');
            return;
        }

        supabase
            .from('profiles')
            .select('onboarding_completed_at')
            .eq('id', user.id)
            .single()
            .then(({ data, error }) => {
                // If column doesn't exist or query fails, allow access (fail-open)
                if (error) {
                    setOnboardingStatus('completed');
                    return;
                }
                setOnboardingStatus(data?.onboarding_completed_at ? 'completed' : 'needed');
            });
    }, [user]);

    if (onboardingStatus === 'loading') {
        return <GlobalLoading />;
    }

    if (onboardingStatus === 'needed') {
        return <Navigate to="/admin/onboarding" replace />;
    }

    return (
        <div className="min-h-screen bg-background pt-24 pb-20 px-6">
            <SEO title={seoTitle || `${title} | Admin`} />
            <div className="container mx-auto max-w-[1400px]">
                <Breadcrumbs className="mb-6" />
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-3">
                        <AdminSidebar />
                    </div>
                    <div className="lg:col-span-9 space-y-8">
                        <div>
                            <h1 className="text-3xl font-display font-bold text-text-primary mb-2">{title}</h1>
                            {subtitle && <p className="text-text-secondary">{subtitle}</p>}
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
