import React from 'react';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import AdminSidebar from '../AdminSidebar';

interface AdminLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle?: string;
    seoTitle?: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title, subtitle, seoTitle }) => {
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
