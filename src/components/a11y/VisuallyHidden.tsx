import React, { ElementType, HTMLAttributes, ReactNode } from 'react';

interface VisuallyHiddenProps extends HTMLAttributes<HTMLElement> {
    as?: ElementType;
    children: ReactNode;
}

export const VisuallyHidden = React.forwardRef<HTMLElement, VisuallyHiddenProps>(
    ({ as: Component = 'span', children, className = '', ...props }, ref) => {
        return (
            <Component
                ref={ref}
                className={`absolute w-[1px] h-[1px] p-0 -m-[1px] overflow-hidden whitespace-nowrap border-0 ${className}`}
                style={{ clip: 'rect(0, 0, 0, 0)' }}
                {...props}
            >
                {children}
            </Component>
        );
    }
);

VisuallyHidden.displayName = 'VisuallyHidden';
