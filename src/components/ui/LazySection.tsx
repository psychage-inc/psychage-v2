import React from 'react';
import { motion } from 'framer-motion';

interface LazySectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function LazySection({ children, className = '', id }: LazySectionProps) {
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "300px" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}
