
import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { NoiseTexture } from './HeroAssets';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type CardVariant = 'primary' | 'vibrant' | 'surface' | 'depth' | 'red';

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  colSpan?: string;
  rowSpan?: string;
  variant?: CardVariant;
  onClick?: () => void;
}

const BentoCard: React.FC<BentoCardProps> = ({
  children,
  className,
  delay = 0,
  colSpan = "",
  rowSpan = "",
  variant = 'surface',
  onClick
}) => {
  const ref = useRef<HTMLDivElement>(null);

  // 3D Tilt Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;

    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;

    x.set(mouseXPos);
    y.set(mouseYPos);

    rotateX.set(yPct * -5); // Tilt range
    rotateY.set(xPct * 5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    rotateX.set(0);
    rotateY.set(0);
  };

  // Define styles based on variant
  const variantStyles = {
    primary: "bg-gradient-to-br from-teal-900 to-teal-800 text-white border border-teal-700/50 shadow-lg shadow-teal-900/20 dark:from-teal-950 dark:to-teal-900 dark:border-teal-800/50",
    vibrant: "bg-teal-500 text-white border border-teal-400 shadow-lg shadow-teal-500/30 dark:bg-teal-600 dark:border-teal-500",
    surface: "bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl text-gray-900 border border-white/40 dark:border-white/10 shadow-lg shadow-black/5 dark:text-gray-100",
    depth: "bg-gray-900 text-white border border-gray-800 shadow-lg shadow-black/40 dark:bg-black dark:border-gray-800",
    red: "bg-rose-600 text-white border border-rose-500 shadow-lg shadow-rose-600/30 dark:bg-rose-700 dark:border-rose-600"
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={cn(
        "relative overflow-hidden rounded-[2.5rem] p-6 md:p-8 flex flex-col transition-colors duration-300 group cursor-default",
        variantStyles[variant],
        colSpan,
        rowSpan,
        className,
        onClick && "cursor-pointer"
      )}
    >
      {/* 1. Grain Texture */}
      <NoiseTexture opacity={0.05} className="mix-blend-overlay z-[1] rounded-[2.5rem]" />

      {/* 2. Spotlight Effect */}
      <motion.div
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.15),
              transparent 80%
            )
          `,
        }}
        className="pointer-events-none absolute inset-0 z-[2] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* 3. Content Layer (Elevated for 3D feel) */}
      <div
        className="relative z-10 h-full w-full"
        style={{ transform: "translateZ(20px)" }}
      >
        {children}
      </div>
    </motion.div>
  );
};

export default BentoCard;
