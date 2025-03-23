'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Client-side only animated background
function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 40 }).map((_, i) => {
        const randomX = Math.floor(Math.random() * 100);
        const randomY = Math.floor(Math.random() * 100);
        const size = Math.floor(Math.random() * 3) + 1; // Random size between 1-3
        const duration = Math.floor(Math.random() * 15) + 15; // Faster animation (15-30s)
        const delay = Math.random() * 5; // Random delay for more natural movement

        return (
          <motion.div
            key={i}
            className={`absolute w-${size} h-${size} bg-accent rounded-full opacity-20 dark:opacity-40`}
            style={{
              left: `${randomX}%`,
              top: `${randomY}%`,
              width: `${size * 2}px`,
              height: `${size * 2}px`
            }}
            animate={{ 
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ 
              duration, 
              delay,
              repeat: Infinity, 
              ease: "easeInOut"
            }}
          />
        );
      })}
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center py-12 md:py-24 bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-dark dark:via-dark-100 dark:to-dark-200">
      <AnimatedBackground />

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
            suppressHydrationWarning
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="inline-block bg-gray-200 dark:bg-dark-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4"
              suppressHydrationWarning
            >
              Senior Software Engineer
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 leading-tight"
              suppressHydrationWarning
            >
              Daniel Rodríguez <span className="text-accent">Mariblanca</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8"
              suppressHydrationWarning
            >
              Building innovative and high-performance software solutions with a passion for clean code and elegant design.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4"
              suppressHydrationWarning
            >
              <Link href="#projects" 
                className="btn btn-primary"
              >
                View Projects
              </Link>
              <Link href="#contact"
                className="btn btn-outline"
              >
                Contact Me
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Animated Code Block */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="hidden md:block"
            suppressHydrationWarning
          >
            <div className="bg-dark-200 rounded-lg shadow-xl overflow-hidden">
              <div className="flex items-center space-x-2 bg-dark-300 px-4 py-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="p-4 font-mono text-sm text-gray-300">
                <p><span className="text-green-400">danielrm@dev</span>:<span className="text-blue-400">~</span>$ whoami</p>
                <p className="mt-2">Senior Software Engineer with a passion for creating efficient, innovative code solutions.</p>
                <p className="mt-4"><span className="text-green-400">danielrm@dev</span>:<span className="text-blue-400">~</span>$ skills</p>
                <p className="mt-2 text-yellow-400">Python | Java | JavaScript | React | AWS | Machine Learning</p>
                <p className="mt-4"><span className="text-green-400">danielrm@dev</span>:<span className="text-blue-400">~</span>$ experience</p>
                <p className="mt-2">TMC | Amazon | Santander | <span className="text-accent blink">█</span></p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 