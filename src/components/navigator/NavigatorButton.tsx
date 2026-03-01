import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

interface NavigatorButtonProps extends Omit<HTMLMotionProps<"button">, "disabled"> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    isLoading?: boolean;
    isDisabled?: boolean;
    fullWidth?: boolean;
    children: React.ReactNode;
}

export const NavigatorButton = React.forwardRef<HTMLButtonElement, NavigatorButtonProps>(({
    variant = 'primary',
    size = 'md',
    isLoading = false,
    isDisabled = false,
    fullWidth = false,
    className,
    children,
    ...props
}, ref) => {
    const baseStyles = "relative inline-flex items-center justify-center font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 tracking-wide overflow-hidden group";

    const variants = {
        primary: "bg-teal-600/90 hover:bg-teal-500 text-white shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] border border-teal-400/30",
        secondary: "bg-white/5 hover:bg-white/10 text-white border border-white/10 backdrop-blur-md shadow-lg",
        outline: "border border-white/20 bg-transparent hover:bg-white/5 text-white focus-visible:ring-white/50",
        ghost: "bg-transparent hover:bg-white/5 text-teal-400 hover:text-teal-300",
        danger: "bg-crisis-red/90 text-white hover:bg-crisis-red shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:shadow-[0_0_30px_rgba(239,68,68,0.5)] border border-red-400/30",
    };

    const sizes = {
        sm: "h-9 px-4 text-sm rounded-md",
        md: "h-12 px-6 text-base rounded-md",
        lg: "h-14 px-8 text-lg rounded-lg",
        xl: "h-16 px-10 text-xl rounded-lg",
    };

    return (
        <motion.button
            ref={ref}
            whileHover={isDisabled || isLoading ? undefined : { scale: 1.01 }}
            whileTap={isDisabled || isLoading ? undefined : { scale: 0.98 }}
            className={cn(
                baseStyles,
                variants[variant],
                sizes[size],
                fullWidth && "w-full",
                className
            )}
            disabled={isDisabled || isLoading}
            {...props}
        >
            {/* Subtle inner glow for primary buttons */}
            {(variant === 'primary' || variant === 'danger') && (
                <div className="absolute inset-0 rounded-lg pointer-events-none border border-white/20 mix-blend-overlay"></div>
            )}
            {/* Shimmer effect on hover */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

            <span className="relative z-10 flex items-center justify-center">
                {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                {children}
            </span>
        </motion.button >
    );
});

NavigatorButton.displayName = 'NavigatorButton';
