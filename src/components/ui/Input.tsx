import React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
    errorMessage?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, error, errorMessage, id, name, ...props }, ref) => {
        const inputId = id || name;
        const errorId = errorMessage && inputId ? `${inputId}-error` : undefined;

        return (
            <div className="w-full">
                <input
                    type={type}
                    id={inputId}
                    className={cn(
                        "flex h-11 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
                        error && "border-error focus-visible:ring-error",
                        className
                    )}
                    ref={ref}
                    aria-invalid={error ? "true" : undefined}
                    aria-describedby={errorId}
                    {...props}
                />
                {errorMessage && (
                    <p
                        id={errorId}
                        className="mt-1.5 text-sm text-error flex items-center gap-1"
                        role="alert"
                    >
                        {errorMessage}
                    </p>
                )}
            </div>
        );
    }
);
Input.displayName = "Input";

export { Input };
