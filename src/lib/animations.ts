// src/lib/animations.ts
// Psychage Unified Animation System
// Brand motif: "Orbit + Spark" — gentle orbiting reveals, spark moments of delight

import { type Variants } from "framer-motion";

// ============================================================
// TIMING CONSTANTS (match CSS custom properties in tokens.css)
// ============================================================
export const duration = {
  micro: 0.15,   // Button presses, toggles, icon swaps
  small: 0.2,    // Hover states, focus rings, tooltips
  medium: 0.3,   // Dropdowns, popovers, small reveals
  large: 0.5,    // Modals, page sections, card expansions
  xl: 0.7,       // Page transitions, hero reveals, onboarding steps
} as const;

export const ease = {
  standard: [0.4, 0, 0.2, 1] as const,     // General purpose
  decelerate: [0, 0, 0.2, 1] as const,     // Elements entering
  accelerate: [0.4, 0, 1, 1] as const,     // Elements exiting
  spring: [0.34, 1.56, 0.64, 1] as const,  // Delightful bounces (use sparingly — Spark moments)
} as const;

// ============================================================
// REUSABLE VARIANTS
// ============================================================

/** Fade in from transparent. Use for: overlays, background reveals. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.medium, ease: ease.standard },
  },
  exit: {
    opacity: 0,
    transition: { duration: duration.small, ease: ease.accelerate },
  },
};

/** Slide up from below + fade. Use for: cards, list items, section reveals. */
export const slideUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.medium, ease: ease.decelerate },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: duration.small, ease: ease.accelerate },
  },
};

/** Slide down from above + fade. Use for: dropdown menus, notification panels. */
export const slideDown: Variants = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.medium, ease: ease.decelerate },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: duration.small, ease: ease.accelerate },
  },
};

/** Scale in from center. Use for: modals, dialogs, important reveals. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.medium, ease: ease.decelerate },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: duration.small, ease: ease.accelerate },
  },
};

/** Slide in from right. Use for: side panels, mobile menus, drawers. */
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.large, ease: ease.decelerate },
  },
  exit: {
    opacity: 0,
    x: 24,
    transition: { duration: duration.medium, ease: ease.accelerate },
  },
};

/** Staggered children container. Use for: lists, grids, card groups. */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

/** Individual stagger child. Pair with staggerContainer. */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.medium, ease: ease.decelerate },
  },
};

/** Glass card hover effect. Use for: interactive glass cards. */
export const glassCardHover = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -5,
    transition: { duration: duration.medium, ease: "easeOut" as const },
  },
};

/** Spark moment — a celebratory pulse. Use for: score reveals, success states, achievements. */
export const spark: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: duration.large,
      ease: ease.spring,
    },
  },
};

/** Orbit reveal — subtle arc entry. Use for: brand moments, logo animations. */
export const orbitReveal: Variants = {
  hidden: { opacity: 0, rotate: -8, scale: 0.9 },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: { duration: duration.xl, ease: ease.decelerate },
  },
};

/** Direction-aware slide for Navigator step transitions.
 *  Pass `custom={1}` for forward, `custom={-1}` for backward. */
export const navigatorSlide = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: ease.standard },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -60 : 60,
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.25, ease: ease.standard },
  }),
};

/** Reduced-motion variant — fade only, no slide. */
export const navigatorFade = {
  enter: { opacity: 0 },
  center: { opacity: 1, transition: { duration: duration.small } },
  exit: { opacity: 0, transition: { duration: duration.micro } },
};

// ============================================================
// SCROLL-TRIGGERED DEFAULTS
// ============================================================
export const scrollTriggerDefaults = {
  once: true,
  amount: 0.2 as const,
  margin: "-50px 0px",
} as const;

// ============================================================
// HOVER / TAP MICRO-INTERACTIONS
// ============================================================

/** Lift card on hover + press feedback. Use for: clickable cards, action items. */
export const hoverLift = {
  whileHover: { y: -2, transition: { duration: duration.small, ease: ease.standard } },
  whileTap: { y: 0, scale: 0.98, transition: { duration: duration.micro } },
};

/** Subtle glow ring on hover. Use for: form inputs, selectable items. */
export const hoverGlow = {
  whileHover: {
    boxShadow: "0 0 0 2px hsl(174 72% 40% / 0.3)",
    transition: { duration: duration.small },
  },
};

/** Slight scale on hover + press. Use for: icon buttons, small interactive elements. */
export const hoverScale = {
  whileHover: { scale: 1.02, transition: { duration: duration.small, ease: ease.standard } },
  whileTap: { scale: 0.98, transition: { duration: duration.micro } },
};

/** Press-down feedback only (no hover change). Use for: primary buttons, CTAs. */
export const pressDown = {
  whileTap: { scale: 0.97, transition: { duration: duration.micro } },
};

/** Standard Fade + Translate. Use for: unified homepage section reveals. */
export const fadeTranslate: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: ease.decelerate },
  },
};
