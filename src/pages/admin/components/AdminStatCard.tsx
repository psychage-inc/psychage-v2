import React from 'react';
import { Card } from '@/components/ui/Card';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminStatCardProps {
    label: string;
    value: string | number;
    icon: LucideIcon;
    color: string;
    trend?: number;
    trendLabel?: string;
    isLoading?: boolean;
}

const AdminStatCard: React.FC<AdminStatCardProps> = ({
    label,
    value,
    icon: Icon,
    color,
    trend,
    trendLabel,
    isLoading = false,
}) => {
    const isPositiveTrend = trend !== undefined && trend >= 0;

    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-text-secondary">{label}</span>
                <Icon className={color} size={20} />
            </div>
            <div className="text-3xl font-bold text-text-primary">
                {isLoading ? (
                    <div className="h-8 w-16 bg-surface-hover animate-pulse rounded" />
                ) : (
                    value
                )}
            </div>
            {trend !== undefined && !isLoading && (
                <div className="mt-2 flex items-center gap-1.5">
                    {isPositiveTrend ? (
                        <TrendingUp size={14} className="text-green-600" />
                    ) : (
                        <TrendingDown size={14} className="text-red-600" />
                    )}
                    <span
                        className={cn(
                            "text-xs font-bold",
                            isPositiveTrend ? "text-green-600" : "text-red-600"
                        )}
                    >
                        {isPositiveTrend ? '+' : ''}{trend}
                    </span>
                    {trendLabel && (
                        <span className="text-xs text-text-tertiary">{trendLabel}</span>
                    )}
                </div>
            )}
        </Card>
    );
};

export default AdminStatCard;
