import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { glassCardHover } from '@/lib/animations';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'outline' | 'ghost';
  hoverEffect?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', hoverEffect = false, children, ...props }, ref) => {
    const variants = {
      default: "bg-surface border border-border shadow-sm",
      glass: "glass text-text-primary",
      outline: "bg-transparent border border-border",
      ghost: "bg-transparent border-none shadow-none",
    };

    const Content = (
      <div
        ref={ref}
        className={cn(
          "rounded-xl p-6 transition-all duration-300",
          variants[variant],
          hoverEffect && variant !== 'glass' && "hover:shadow-md hover:border-border-hover",
          hoverEffect && variant === 'glass' && "glass-hover",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );

    if (hoverEffect) {
      return (
        <motion.div
          initial="rest"
          whileHover="hover"
          variants={glassCardHover}
        >
          {Content}
        </motion.div>
      );
    }

    return Content;
  }
);

Card.displayName = "Card";

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-3 mb-4", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

export const CardBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex-1", className)}
    {...props}
  />
));
CardBody.displayName = "CardBody";

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-3 mt-4 pt-4 border-t border-border", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export const CardIcon: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className, children }) => (
  <div
    className={cn(
      "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
      className
    )}
    style={{
      backgroundColor: 'color-mix(in srgb, var(--color-primary) 12%, transparent)',
    }}
  >
    {children}
  </div>
);