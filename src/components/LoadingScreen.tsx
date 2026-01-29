'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, ReactNode } from 'react';
import { useTheme } from 'next-themes';

interface LoadingScreenProps {
  onComplete?: () => void;
  duration?: number;
  children?: ReactNode;
  error?: boolean;
  errorMessage?: string;
  isLoading?: boolean;
}

export function LoadingScreen({ 
  onComplete, 
  duration = 2000,
  children,
  error = false,
  errorMessage = "Something went wrong",
  isLoading = true
}: LoadingScreenProps) {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const { theme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    setMounted(true);
    setCurrentTheme(theme === 'dark' ? 'dark' : 'light');
  }, [theme]);

  useEffect(() => {
    if (!mounted || !isLoading) {
      if (!isLoading && !showContent) {
        setShowContent(true);
        onComplete?.();
      }
      return;
    }

    const interval = 50;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = (currentStep / steps) * 100;
      setProgress(newProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setShowContent(true);
          onComplete?.();
        }, 300);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [mounted, duration, onComplete, isLoading, showContent]);

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  if (!mounted || showContent) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed inset-0 z-[100] flex items-center justify-center ${
          currentTheme === 'dark' ? 'bg-dark-DEFAULT' : 'bg-light-50'
        }`}
      >
        <div className="relative flex flex-col items-center justify-center w-full max-w-md px-6">
          {!error ? (
            <>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="mb-12"
              >
                <div className="relative">
                  <motion.div
                    animate={
                      prefersReducedMotion 
                        ? {} 
                        : {
                            rotate: 360,
                          }
                    }
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="w-20 h-20"
                  >
                    <svg viewBox="0 0 80 80" className="w-full h-full">
                      <circle
                        cx="40"
                        cy="40"
                        r="36"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        className={`${
                          currentTheme === 'dark' 
                            ? 'text-gray-700' 
                            : 'text-gray-200'
                        }`}
                      />
                      <motion.circle
                        cx="40"
                        cy="40"
                        r="36"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        className={`${
                          currentTheme === 'dark' 
                            ? 'text-blue-500' 
                            : 'text-blue-600'
                        }`}
                        strokeLinecap="round"
                        style={{
                          strokeDasharray: "226.19",
                          strokeDashoffset: 226.19 - (226.19 * progress) / 100,
                        }}
                      />
                    </svg>
                  </motion.div>
                  
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      delay: 0.2,
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <span className="text-2xl">🛠️</span>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.3,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="text-center space-y-4"
              >
                <motion.p
                  className={`text-sm font-medium tracking-wider uppercase ${
                    currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  Loading
                </motion.p>
                
                <div className="w-64 h-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              </motion.div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="text-center"
            >
              <div className="text-6xl mb-4">⚠️</div>
              <p className={`text-lg font-medium mb-2 ${
                currentTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'
              }`}>
                Oops!
              </p>
              <p className={`text-sm ${
                currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {errorMessage}
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
