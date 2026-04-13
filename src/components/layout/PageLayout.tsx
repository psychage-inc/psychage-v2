import React from 'react';
import Breadcrumbs, { BreadcrumbItem } from '@/components/ui/Breadcrumbs';
import { cn } from '@/lib/utils';

const MAX_WIDTH_MAP: Record<string, string> = {
  sm: 'max-w-3xl',
  md: 'max-w-4xl',
  lg: 'max-w-5xl',
  xl: 'max-w-6xl',
  content: 'max-w-content',
  wide: 'max-w-7xl',
};

interface PageLayoutProps {
  children: React.ReactNode;
  maxWidth?: keyof typeof MAX_WIDTH_MAP;
  breadcrumbs?: BreadcrumbItem[];
  header?: React.ReactNode;
  padTop?: boolean;
  padBottom?: boolean;
  className?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  maxWidth = 'lg',
  breadcrumbs,
  header,
  padTop = true,
  padBottom = true,
  className,
}) => {
  return (
    <div
      className={cn(
        'min-h-screen bg-background',
        padTop && 'pt-28',
        padBottom && 'pb-20',
        className
      )}
    >
      <div className={cn('container mx-auto px-6', MAX_WIDTH_MAP[maxWidth])}>
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} className="mb-6" />}
        {header}
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
