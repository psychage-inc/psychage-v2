import { motion, AnimatePresence, type HTMLMotionProps } from "framer-motion";
import {
  fadeIn,
  slideUp,
  scaleIn,
  slideInRight,
  staggerContainer,
  staggerItem,
  scrollTriggerDefaults,
} from "@/lib/animations";
import { forwardRef } from "react";

// Reusable animated wrappers — use these instead of raw motion.div everywhere.
// This ensures every animation in the app uses the unified system.

export const FadeIn = forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ children, ...props }, ref) => (
    <motion.div
      ref={ref}
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      {...props}
    >
      {children}
    </motion.div>
  )
);
FadeIn.displayName = "FadeIn";

export const SlideUp = forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ children, ...props }, ref) => (
    <motion.div
      ref={ref}
      variants={slideUp}
      initial="hidden"
      animate="visible"
      exit="exit"
      {...props}
    >
      {children}
    </motion.div>
  )
);
SlideUp.displayName = "SlideUp";

export const ScaleIn = forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ children, ...props }, ref) => (
    <motion.div
      ref={ref}
      variants={scaleIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      {...props}
    >
      {children}
    </motion.div>
  )
);
ScaleIn.displayName = "ScaleIn";

export const SlideInRight = forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ children, ...props }, ref) => (
    <motion.div
      ref={ref}
      variants={slideInRight}
      initial="hidden"
      animate="visible"
      exit="exit"
      {...props}
    >
      {children}
    </motion.div>
  )
);
SlideInRight.displayName = "SlideInRight";

export const StaggerList = forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ children, ...props }, ref) => (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      {...props}
    >
      {children}
    </motion.div>
  )
);
StaggerList.displayName = "StaggerList";

export const StaggerItem = forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ children, ...props }, ref) => (
    <motion.div ref={ref} variants={staggerItem} {...props}>
      {children}
    </motion.div>
  )
);
StaggerItem.displayName = "StaggerItem";

interface ScrollRevealProps extends HTMLMotionProps<"div"> {
  variant?: "fadeIn" | "slideUp" | "scaleIn";
}

export const ScrollReveal = forwardRef<HTMLDivElement, ScrollRevealProps>(
  ({ children, variant = "slideUp", ...props }, ref) => {
    const variantMap = { fadeIn, slideUp, scaleIn };
    return (
      <motion.div
        ref={ref}
        variants={variantMap[variant]}
        initial="hidden"
        whileInView="visible"
        viewport={scrollTriggerDefaults}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
ScrollReveal.displayName = "ScrollReveal";

export { AnimatePresence };
