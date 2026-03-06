import React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from '@/lib/utils';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom';
  className?: string;
  delay?: number;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'bottom',
  className,
  delay = 0.4
}) => {
  // Radix expects milliseconds
  const delayMs = delay < 10 ? delay * 1000 : delay;

  return (
    <TooltipPrimitive.Provider delayDuration={delayMs}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>
          <span className={cn("inline-flex items-center justify-center", className)}>
            {children}
          </span>
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={position === 'top' ? 'top' : 'bottom'}
            sideOffset={8}
            className={cn(
              "z-[150] px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap pointer-events-none",
              "bg-gray-900/95 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider",
              "border border-white/10",
              "transition-opacity duration-200 ease-out",
              "data-[state=delayed-open]:opacity-100 data-[state=closed]:opacity-0"
            )}
          >
            {content}
            <TooltipPrimitive.Arrow className="fill-gray-900/95" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};

export default Tooltip;
