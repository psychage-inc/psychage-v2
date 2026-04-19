import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  backLink?: { label: string; href: string };
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  badge,
  icon,
  actions,
  backLink,
  className,
}) => {
  const reduced = useReducedMotion();

  return (
    <div className={cn('mb-8', className)}>
      {backLink && (
        <Link
          to={backLink.href}
          className="flex items-center gap-2 text-text-tertiary hover:text-text-primary font-bold text-sm uppercase tracking-wider transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          {backLink.label}
        </Link>
      )}

      <motion.div
        initial={reduced ? {} : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            {icon && (
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 bg-primary/10">
                {icon}
              </div>
            )}
            <div>
              {badge && (
                <span className="inline-block text-xs font-bold uppercase tracking-widest text-text-tertiary mb-1">
                  {badge}
                </span>
              )}
              <h1 className="font-display font-bold text-3xl md:text-4xl text-text-primary tracking-tight">
                {title}
              </h1>
              {subtitle && (
                <p className="text-text-secondary text-sm mt-1 max-w-xl">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          {actions && <div className="shrink-0">{actions}</div>}
        </div>
      </motion.div>
    </div>
  );
};

export default PageHeader;
