
import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const HeroBackground: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out mouse movement
  const springConfig = { damping: 50, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Parallax transforms for different blobs
  const x1 = useTransform(smoothX, [0, window.innerWidth], [-50, 50]);
  const y1 = useTransform(smoothY, [0, window.innerHeight], [-50, 50]);

  const x2 = useTransform(smoothX, [0, window.innerWidth], [50, -50]);
  const y2 = useTransform(smoothY, [0, window.innerHeight], [50, -50]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 bg-[#fafaf9] transition-colors duration-500">
      {/* Aurora Gradients - Teal (Top Left) */}
      <motion.div
        style={{ x: x1, y: y1 }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 0.8, 0.6], // Increased opacity for light mode
          rotate: [0, 45, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-teal-200/60 blur-[120px] mix-blend-multiply"
      />

      {/* Indigo (Right) */}
      <motion.div
        style={{ x: x2, y: y2 }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.7, 0.5] // Increased opacity
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-indigo-200/60 blur-[140px] mix-blend-multiply"
      />

      {/* Rose (Bottom) */}
      <motion.div
        style={{ x: x1, y: y2 }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.6, 0.4] // Increased opacity
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-[20%] left-[20%] w-[80vw] h-[50vw] rounded-full bg-rose-200/60 blur-[120px] mix-blend-multiply"
      />

      {/* Noise Overlay for texture */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />
    </div>
  );
};

export default HeroBackground;
