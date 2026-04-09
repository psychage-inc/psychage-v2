import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { OBJECTS, OBJECT_ALT } from './homeImages';

interface FloatingObjectProps {
  src: string;
  alt: string;
  className: string;
  floatDuration: number;
  floatDistance: number;
  reducedMotion: boolean;
}

const FloatingObject: React.FC<FloatingObjectProps> = ({
  src,
  alt,
  className,
  floatDuration,
  floatDistance,
  reducedMotion,
}) => (
  <motion.img
    src={src}
    alt={alt}
    className={className}
    loading="lazy"
    animate={
      reducedMotion
        ? undefined
        : { y: [0, -floatDistance, 0] }
    }
    transition={
      reducedMotion
        ? undefined
        : {
            duration: floatDuration,
            repeat: Infinity,
            repeatType: 'reverse' as const,
            ease: 'easeInOut',
          }
    }
  />
);

const AmbientObjects: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden hidden lg:block"
      aria-hidden="true"
    >
      {/* Between Hero and Breathing Pause — left edge */}
      <FloatingObject
        src={OBJECTS.threadLoop}
        alt={OBJECT_ALT.threadLoop}
        className="absolute left-[3%] top-[92vh] h-[30px] w-auto object-contain opacity-15"
        floatDuration={7}
        floatDistance={5}
        reducedMotion={prefersReducedMotion}
      />

      {/* Between Breathing Pause and Navigator — right edge */}
      <FloatingObject
        src={OBJECTS.softCube}
        alt={OBJECT_ALT.softCube}
        className="absolute right-[4%] top-[115vh] h-[35px] w-auto object-contain opacity-20"
        floatDuration={8}
        floatDistance={4}
        reducedMotion={prefersReducedMotion}
      />

      {/* Between Navigator and Content World — left edge */}
      <FloatingObject
        src={OBJECTS.nestedBowls}
        alt={OBJECT_ALT.nestedBowls}
        className="absolute left-[2%] top-[180vh] h-[28px] w-auto object-contain opacity-15"
        floatDuration={6.5}
        floatDistance={6}
        reducedMotion={prefersReducedMotion}
      />

      {/* Between Content World and Closing — right edge */}
      <FloatingObject
        src={OBJECTS.singleDroplet}
        alt={OBJECT_ALT.singleDroplet}
        className="absolute right-[3%] top-[260vh] h-[25px] w-auto object-contain opacity-20"
        floatDuration={7.5}
        floatDistance={5}
        reducedMotion={prefersReducedMotion}
      />
    </div>
  );
};

export default AmbientObjects;
