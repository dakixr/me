'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

// Create a context to track transition state
interface TransitionContextType {
  isTransitioning: boolean;
  startTransition: (href: string) => void;
}

const TransitionContext = createContext<TransitionContextType>({
  isTransitioning: false,
  startTransition: () => {},
});

export const usePageTransition = () => useContext(TransitionContext);

// Main provider component
export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetHref, setTargetHref] = useState<string | null>(null);
  const router = useRouter();

  const startTransition = (href: string) => {
    setIsTransitioning(true);
    setTargetHref(href);
    
    // Delay actual navigation to allow exit animation to play
    setTimeout(() => {
      router.push(href);
      // Reset state after navigation
      setTimeout(() => {
        setIsTransitioning(false);
        setTargetHref(null);
      }, 100); // Small delay to ensure navigation completes
    }, 500); // Match this with exit animation duration
  };

  return (
    <TransitionContext.Provider value={{ isTransitioning, startTransition }}>
      {children}
    </TransitionContext.Provider>
  );
}

// Wrapper component for page content with transitions
export function PageTransitionWrapper({ children }: { children: ReactNode }) {
  const { isTransitioning } = usePageTransition();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={isTransitioning ? 'transitioning' : 'stable'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ 
          duration: 0.5,
          ease: [0.25, 0.1, 0.25, 1.0], // Cubic bezier for smooth easing
        }}
        className="w-full min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
} 