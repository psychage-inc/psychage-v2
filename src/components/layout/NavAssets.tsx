import React from 'react';
import { motion } from 'framer-motion';

// --- MICRO-VISUALIZATIONS (Not just icons) ---

export const NavClarityGlyph = () => (
  <svg viewBox="0 0 40 40" className="w-full h-full text-teal-600 dark:text-teal-400" fill="none">
    <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="2" strokeOpacity="0.2" />
    <motion.circle
      cx="20" cy="20" r="14"
      stroke="currentColor" strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="88"
      strokeDashoffset="88"
      animate={{ strokeDashoffset: 20 }}
      transition={{ duration: 1.5, ease: "circOut" }}
      transform="rotate(-90 20 20)"
    />
    <motion.text x="20" y="24" textAnchor="middle" fontSize="10" fontWeight="bold" fill="currentColor">
      85
    </motion.text>
  </svg>
);

export const NavMoodGlyph = () => (
  <svg viewBox="0 0 40 40" className="w-full h-full text-amber-600 dark:text-amber-400" fill="none">
    <rect x="4" y="4" width="32" height="32" rx="4" fill="currentColor" fillOpacity="0.1" />
    <motion.path
      d="M8 20 Q 14 10, 20 20 T 32 20"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    />
    <motion.circle cx="20" cy="20" r="2" fill="currentColor"
      animate={{ cy: [20, 15, 20] }} transition={{ duration: 2, repeat: Infinity }}
    />
  </svg>
);

export const NavSleepGlyph = () => (
  <svg viewBox="0 0 40 40" className="w-full h-full text-indigo-600 dark:text-indigo-400" fill="none">
    <path d="M20 4 V36" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
    <motion.rect
      x="12" y="10" width="16" height="6" rx="2" fill="currentColor"
      animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity }}
    />
    <motion.rect
      x="12" y="24" width="16" height="6" rx="2" fill="currentColor"
      animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
    />
  </svg>
);

export const NavArticleGlyph = () => (
  <svg viewBox="0 0 40 40" className="w-full h-full text-gray-900 dark:text-white" fill="none">
    <rect x="8" y="6" width="24" height="28" rx="2" stroke="currentColor" strokeWidth="2" />
    <line x1="14" y1="14" x2="26" y2="14" stroke="currentColor" strokeWidth="2" strokeOpacity="0.5" />
    <line x1="14" y1="20" x2="26" y2="20" stroke="currentColor" strokeWidth="2" strokeOpacity="0.5" />
    <motion.line
      x1="14" y1="26" x2="22" y2="26" stroke="currentColor" strokeWidth="2"
      animate={{ scaleX: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity }}
    />
  </svg>
);

export const NavCourseGlyph = () => (
  <svg viewBox="0 0 40 40" className="w-full h-full text-gray-900 dark:text-white" fill="none">
    <rect x="5" y="8" width="30" height="24" rx="4" stroke="currentColor" strokeWidth="2" />
    <motion.path
      d="M17 14 L26 20 L17 26 V14 Z"
      fill="currentColor"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  </svg>
);

export const NavNetworkGlyph = () => (
  <svg viewBox="0 0 40 40" className="w-full h-full text-gray-900 dark:text-white" fill="none">
    <circle cx="20" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="28" r="4" stroke="currentColor" strokeWidth="2" />
    <circle cx="28" cy="28" r="4" stroke="currentColor" strokeWidth="2" />
    <motion.path
      d="M20 16 L12 24 M20 16 L28 24"
      stroke="currentColor" strokeWidth="1.5"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1 }}
    />
  </svg>
);

export const NavCrisisGlyph = () => (
  <svg viewBox="0 0 40 40" className="w-full h-full text-red-600 dark:text-red-400" fill="none">
    <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="2" />
    <motion.path
      d="M20 10 V24 M20 28 V30"
      stroke="currentColor" strokeWidth="3" strokeLinecap="round"
      animate={{ opacity: [1, 0.5, 1] }}
      transition={{ duration: 0.8, repeat: Infinity }}
    />
  </svg>
);
