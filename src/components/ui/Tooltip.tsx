import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
      className={cn("relative flex items-center justify-center", className)}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: position === 'top' ? 4 : -4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, delay: delay, ease: "easeOut" }}
            className={cn(
              "absolute left-1/2 -translate-x-1/2 z-[150]",
              "px-3 py-1.5 bg-gray-900/95 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-xl whitespace-nowrap pointer-events-none border border-white/10",
              position === 'top' ? "bottom-full mb-2" : "top-full mt-2"
            )}
          >
            {content}
            {/* Arrow */}
            <div 
              className={cn(
                "absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900/95 border-l border-t border-white/10 rotate-45",
                position === 'top' ? "bottom-[-5px] -mb-px border-l-0 border-t-0 border-r border-b" : "top-[-5px] -mt-px"
              )} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;