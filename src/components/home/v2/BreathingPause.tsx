import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { FIGURES, FIGURE_ALT } from './homeImages';

const softEdgeMask =
  'radial-gradient(ellipse 80% 75% at 50% 50%, black 40%, transparent 100%)';

const BreathingPause: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-hidden="true"
      className="py-20 sm:py-28 lg:py-36 flex items-center justify-center"
    >
      <motion.img
        src={FIGURES.resting}
        alt={FIGURE_ALT.resting}
        className="h-16 sm:h-20 lg:h-24 w-auto object-contain rounded-2xl dark:brightness-[0.85]"
        style={{ maskImage: softEdgeMask, WebkitMaskImage: softEdgeMask }}
        loading="lazy"
        {...(prefersReducedMotion
          ? {}
          : {
              initial: { opacity: 0 },
              whileInView: { opacity: 1 },
              viewport: { once: true, amount: 0.5 },
              transition: { duration: 1.8, ease: 'easeInOut' },
            })}
      />
    </section>
  );
};

export default BreathingPause;
