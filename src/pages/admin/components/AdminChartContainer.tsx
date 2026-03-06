import React from 'react';
import { Card } from '@/components/ui/Card';
import { Loader2, BarChart3 } from 'lucide-react';

interface AdminChartContainerProps {
  title: string;
  subtitle?: string;
  height?: number;
  isLoading?: boolean;
  isEmpty?: boolean;
  headerAction?: React.ReactNode;
  children: React.ReactNode;
}

const AdminChartContainer: React.FC<AdminChartContainerProps> = ({
  title,
  subtitle,
  height = 300,
  isLoading = false,
  isEmpty = false,
  headerAction,
  children,
}) => {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-text-primary">{title}</h3>
          {subtitle && (
            <p className="text-sm text-text-tertiary mt-0.5">{subtitle}</p>
          )}
        </div>
        {headerAction && <div className="ml-4 shrink-0">{headerAction}</div>}
      </div>

      <div style={{ height }} className="w-full">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-8 h-8 text-text-tertiary animate-spin" />
          </div>
        ) : isEmpty ? (
          <div className="flex flex-col items-center justify-center h-full text-text-tertiary">
            <BarChart3 size={32} className="mb-2 opacity-40" />
            <p className="text-sm">No data available</p>
          </div>
        ) : (
          children
        )}
      </div>
    </Card>
  );
};

export default AdminChartContainer;
