import React from 'react';
import { cn } from '@/lib/utils';

type TypographyProps = {
    children: React.ReactNode;
    className?: string;
    as?: React.ElementType;
};

export const Display = ({ children, className, as: Component = 'h1' }: TypographyProps) => {
    return (
        <Component className={cn("font-display font-bold tracking-tight text-text-primary", className)}>
            {children}
        </Component>
    );
};

export const Heading = ({ children, className, as: Component = 'h2' }: TypographyProps) => {
    return (
        <Component className={cn("font-display font-semibold tracking-tight text-text-primary", className)}>
            {children}
        </Component>
    );
};

export const Text = ({ children, className, as: Component = 'p' }: TypographyProps) => {
    return (
        <Component className={cn("font-sans text-text-secondary leading-relaxed", className)}>
            {children}
        </Component>
    );
};

export const GradientText = ({ children, className, as: Component = 'span' }: TypographyProps) => {
    return (
        <Component className={cn("text-gradient font-display font-bold", className)}>
            {children}
        </Component>
    );
};
