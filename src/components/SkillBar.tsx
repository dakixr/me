'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

interface SkillBarProps {
  skill: string;
  proficiency: number;
  description?: string;
  delay?: number;
}

export default function SkillBar({ skill, proficiency, description, delay = 0 }: SkillBarProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [showTooltip, setShowTooltip] = useState(false);

  const barVariants = {
    hidden: { width: 0 },
    visible: {
      width: `${proficiency}%`,
      transition: {
        duration: 1.5,
        ease: 'easeOut',
        delay: delay,
      },
    },
  };

  const glowVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 0.3,
      transition: {
        duration: 1.5,
        ease: 'easeOut',
        delay: delay + 0.3,
      },
    },
  };

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill}</span>
        <span className="text-xs text-gray-500 dark:text-gray-400">{proficiency}%</span>
      </div>
      
      <div className="h-3 bg-gray-200 dark:bg-dark-400 rounded-full overflow-hidden">
        <motion.div
          variants={barVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="h-full bg-gradient-to-r from-accent to-accent-dark rounded-full relative"
        >
          <motion.div
            variants={glowVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
        </motion.div>
      </div>

      {description && (
        <>
          <div
            className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 dark:bg-dark-300 text-white text-xs rounded-lg shadow-lg whitespace-nowrap z-10 transition-all duration-200 ${
              showTooltip ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}
          >
            {description}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-dark-300" />
          </div>
        </>
      )}
    </div>
  );
}
