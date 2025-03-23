'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const startTransition = (href: string) => {
    if (!mounted) {
      // If not mounted yet, just perform a regular navigation
      router.push(href);
      return;
    }
    
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

  // Only provide the real transition functionality after mounting
  // This prevents hydration mismatches
  const contextValue = mounted
    ? { isTransitioning, startTransition }
    : { isTransitioning: false, startTransition: (href: string) => router.push(href) };

  return (
    <TransitionContext.Provider value={contextValue}>
      {children}
    </TransitionContext.Provider>
  );
}

// Wrapper component for page content with transitions
export function PageTransitionWrapper({ children }: { children: ReactNode }) {
  const { isTransitioning } = usePageTransition();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't run transitions until client-side hydration is complete
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ 
          duration: 0.3,
          ease: [0.25, 0.1, 0.25, 1.0], // Cubic bezier for smooth easing
        }}
        className="w-full min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
} 