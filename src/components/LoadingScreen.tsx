'use client';

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

  if (!mounted || showContent) {
    return <>{children}</>;
  }

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center ${
      currentTheme === 'dark' ? 'bg-dark' : 'bg-light'
    }`}>
      <div className="relative flex flex-col items-center justify-center w-full max-w-md px-6">
        {!error ? (
          <>
            <div className="mb-12">
              <div className="relative w-20 h-20 mx-auto">
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
                        : 'text-gray-300'
                    }`}
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    className={`${
                      currentTheme === 'dark' 
                        ? 'text-light' 
                        : 'text-dark'
                    }`}
                    strokeLinecap="round"
                    style={{
                      strokeDasharray: "226.19",
                      strokeDashoffset: 226.19 - (226.19 * progress) / 100,
                    }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl">🛠️</span>
                </div>
              </div>
            </div>

            <div className="text-center space-y-4">
              <p className={`text-sm font-medium tracking-wider uppercase ${
                currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Loading
              </p>
              
              <div className="w-64 h-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  className={`h-full ${
                    currentTheme === 'dark' ? 'bg-light' : 'bg-dark'
                  }`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <p className={`text-lg font-medium mb-2 ${
              currentTheme === 'dark' ? 'text-light' : 'text-dark'
            }`}>
              Oops!
            </p>
            <p className={`text-sm ${
              currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {errorMessage}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
