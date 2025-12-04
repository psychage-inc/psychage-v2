import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CardProps extends HTMLMotionProps<"div"> {
  hoverEffect?: boolean;
  glass?: boolean;
}

const Card: React.FC<CardProps> = ({
  className,
  children,
  hoverEffect = false,
  glass = false,
  ...props
}) => {
  return (
    <motion.div
      className={cn(
        "rounded-2xl border border-gray-100 bg-white p-6 shadow-soft",
        glass && "bg-white/70 backdrop-blur-md border-white/50",
        hoverEffect && "hover:shadow-lg transition-shadow duration-300 cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;