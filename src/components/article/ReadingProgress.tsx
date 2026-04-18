import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ReadingProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-[110]">
      <div className="absolute inset-0 bg-border/50" />
      <motion.div
        className="absolute inset-0 bg-teal-600 origin-left"
        style={{ scaleX }}
      />
    </div>
  );
};

export default ReadingProgress;