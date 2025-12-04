
import React from 'react';
import { motion } from 'framer-motion';

// --- GRAIN / NOISE TEXTURE ---
export const NoiseTexture: React.FC<{ opacity?: number, className?: string }> = ({ opacity = 0.05, className = "" }) => (
  <div 
    className={`absolute inset-0 z-0 pointer-events-none mix-blend-overlay ${className}`}
    style={{ 
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='${opacity}'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
    }} 
  />
);

// --- CARD 1: IDENTITY (Neural Mesh) ---
export const NeuralMesh: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 400 400" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <motion.g 
        initial={{ opacity: 0.3 }} 
        animate={{ opacity: [0.3, 0.6, 0.3] }} 
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
        <circle cx="50" cy="50" r="2" fill="currentColor" />
        <circle cx="350" cy="120" r="3" fill="currentColor" />
        <circle cx="100" cy="200" r="2" fill="currentColor" />
        <circle cx="250" cy="250" r="3" fill="currentColor" />
        <circle cx="60" cy="350" r="2" fill="currentColor" />

        <path d="M50 50L350 120" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
        <path d="M50 50L100 200" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
        <path d="M100 200L60 350" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
        <path d="M100 200L250 250" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
        <path d="M250 250L350 120" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
    </motion.g>
    
    <motion.circle 
        r="4" 
        fill="currentColor"
        fillOpacity="0.8"
        animate={{ 
            cx: [50, 100, 250, 350], 
            cy: [50, 200, 250, 120],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
    />
  </svg>
);

// --- CARD 2: ASSESSMENT (Pulse Wave) ---
export const PulseWave: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 200 80" className={className} preserveAspectRatio="none">
    <motion.path
      d="M0 40 L40 40 L50 20 L60 60 L70 40 L200 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 2, ease: "easeInOut" }}
    />
    <motion.circle 
        r="4" 
        fill="white"
        style={{ offsetPath: "path('M0 40 L40 40 L50 20 L60 60 L70 40 L200 40')" }}
    >
       <animate attributeName="offsetDistance" from="0%" to="100%" dur="2s" repeatCount="indefinite" />
    </motion.circle>
  </svg>
);

// --- CARD 3: STATS (Circular) ---
export const CircularData: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    {/* Background Track */}
    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="6" strokeOpacity="0.1" />
    
    {/* Animated Ring (85%) */}
    <motion.circle 
        cx="50" 
        cy="50" 
        r="40" 
        stroke="currentColor" 
        strokeWidth="6" 
        strokeLinecap="round"
        strokeDasharray="251.2" // 2 * PI * 40
        strokeDashoffset="251.2"
        initial={{ strokeDashoffset: 251.2 }}
        animate={{ strokeDashoffset: 37.68 }} // 251.2 * (1 - 0.85)
        transition={{ duration: 2.5, delay: 0.2, ease: "circOut" }}
        transform="rotate(-90 50 50)"
        className="transition-all duration-300 group-hover:stroke-[8] group-hover:opacity-100"
    />
    
    {/* Decorative Dot at start */}
    <circle cx="50" cy="10" r="3" fill="currentColor" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  </svg>
);

// --- CARD 4: MEDIA (Shapes) ---
export const MediaShapes: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 200 200" className={className} fill="none">
    <motion.circle 
        cx="100" cy="100" r="50" 
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.5"
        animate={{ r: [50, 60, 50], opacity: [0.5, 0.2, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    />
    <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
    <motion.rect x="150" y="80" width="4" height="40" rx="2" fill="currentColor" opacity="0.6"
        animate={{ height: [20, 50, 30] }} transition={{ duration: 1.5, repeat: Infinity }}
    />
    <motion.rect x="160" y="70" width="4" height="60" rx="2" fill="currentColor" opacity="0.8"
         animate={{ height: [40, 70, 40] }} transition={{ duration: 2, repeat: Infinity }}
    />
  </svg>
);

// --- CARD 5: DOCS (Flow) ---
export const DocFlow: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <path d="M25 20 H75 C77.7614 20 80 22.2386 80 25 V75 C80 77.7614 77.7614 80 75 80 H25 C22.2386 80 20 77.7614 20 75 V25 C20 22.2386 22.2386 20 25 20 Z" stroke="currentColor" strokeWidth="2" strokeOpacity="0.2" />
    <motion.line x1="30" y1="35" x2="70" y2="35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" 
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.2 }}
    />
    <motion.line x1="30" y1="45" x2="70" y2="45" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5"
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.3 }}
    />
    <motion.line x1="30" y1="55" x2="50" y2="55" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5"
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.4 }}
    />
  </svg>
);

// --- CARD 6: BREATHE (Blob) ---
export const MorphingBlob: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 200 200" className={className} fill="none">
    <motion.circle
        cx="100" cy="100" r="40"
        stroke="currentColor"
        strokeWidth="1.5"
        animate={{ r: [40, 80, 40], opacity: [1, 0, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.circle
        cx="100" cy="100" r="30"
        fill="currentColor"
        fillOpacity="0.2"
        animate={{ r: [30, 60, 30] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    />
  </svg>
);

// --- CARD 7: NETWORK (People) ---
export const PeopleNet: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 400 200" className={className} fill="none">
    <motion.path 
        d="M50 100 L350 100"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.3"
        strokeDasharray="4 4"
    />
    <motion.circle cx="100" cy="100" r="4" fill="currentColor" 
        animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity }} 
    />
    <circle cx="200" cy="100" r="3" fill="currentColor" opacity="0.5" />
    <circle cx="300" cy="100" r="3" fill="currentColor" opacity="0.5" />
  </svg>
);
