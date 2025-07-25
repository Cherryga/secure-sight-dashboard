'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function Box({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="relative bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-lg max-w-4xl"
      whileHover={{ rotateY: 5, rotateX: -5 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      {children}
    </motion.div>
  );
}
