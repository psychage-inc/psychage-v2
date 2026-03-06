import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import Button from '@/components/ui/Button';

interface AdminErrorBannerProps {
    message: string;
    onRetry?: () => void;
}

const AdminErrorBanner: React.FC<AdminErrorBannerProps> = ({ message, onRetry }) => {
    return (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-5 py-4 rounded-xl flex items-center gap-3">
            <AlertTriangle size={20} className="shrink-0" />
            <span className="flex-1 text-sm">{message}</span>
            {onRetry && (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onRetry}
                    className="text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 shrink-0"
                    leftIcon={<RefreshCw size={14} />}
                >
                    Retry
                </Button>
            )}
        </div>
    );
};

export default AdminErrorBanner;
