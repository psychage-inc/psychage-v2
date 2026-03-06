import React from 'react';
import { LucideIcon } from 'lucide-react';

interface AdminEmptyStateProps {
    icon: LucideIcon;
    title: string;
    description?: string;
}

const AdminEmptyState: React.FC<AdminEmptyStateProps> = ({ icon: Icon, title, description }) => {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="w-16 h-16 rounded-full bg-surface-hover flex items-center justify-center mb-4">
                <Icon size={32} className="text-text-tertiary" />
            </div>
            <h3 className="text-lg font-bold text-text-primary mb-1">{title}</h3>
            {description && (
                <p className="text-sm text-text-secondary text-center max-w-sm">{description}</p>
            )}
        </div>
    );
};

export default AdminEmptyState;
