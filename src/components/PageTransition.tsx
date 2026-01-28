'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';

// Create a context to track transition state
interface TransitionContextType {
  isTransitioning: boolean;
  startTransition: (href: string) => void;
  transitionType: 'fade' | 'slide' | 'scale' | 'none';
  setTransitionType: (type: 'fade' | 'slide' | 'scale' | 'none') => void;
}

const TransitionContext = createContext<TransitionContextType>({
  isTransitioning: false,
  startTransition: () => {},
  transitionType: 'fade',
  setTransitionType: () => {},
});

export const usePageTransition = () => useContext(TransitionContext);

// Main provider component
export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionType, setTransitionType] = useState<'fade' | 'slide' | 'scale' | 'none'>('fade');
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    
    // Reset transition state when route changes naturally (back button, etc.)
    return () => {
      setIsTransitioning(false);
    };
  }, [pathname]);

  const startTransition = (href: string) => {
    if (!mounted) {
      // If not mounted yet, just perform a regular navigation
      router.push(href);
      return;
    }
    
    // Don't transition if already on that page
    if (href === pathname) return;
    
    setIsTransitioning(true);
    
    // Use RAF for smoother timing instead of setTimeout
    requestAnimationFrame(() => {
      // Allow the exit animation to start
      setTimeout(() => {
        router.push(href);
        
        // Reset transition state with a short delay to ensure navigation completes
        setTimeout(() => {
          setIsTransitioning(false);
        }, 100);
      }, 350); // Match this closely with exit animation duration for best results
    });
  };

  // Only provide the real transition functionality after mounting
  // This prevents hydration mismatches
  const contextValue = mounted
    ? { isTransitioning, startTransition, transitionType, setTransitionType }
    : { 
        isTransitioning: false, 
        startTransition: (href: string) => router.push(href),
        transitionType: 'none' as const,
        setTransitionType: () => {},
      };

  return (
    <TransitionContext.Provider value={contextValue}>
      {children}
    </TransitionContext.Provider>
  );
}

// Define variants for different transition types
const variants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slide: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.02 },
  },
  none: {
    initial: {},
    animate: {},
    exit: {},
  },
};

// Wrapper component for page content with transitions
export function PageTransitionWrapper({ children }: { children: ReactNode }) {
  const { isTransitioning, transitionType } = usePageTransition();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Scroll to top on page change
    window.scrollTo(0, 0);
  }, [pathname]);

  // Don't run transitions until client-side hydration is complete
  if (!mounted) {
    return <>{children}</>;
  }

  const currentVariant = variants[transitionType];

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={currentVariant}
          transition={{ 
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1], // Custom easing for more polished feel
          }}
          className="w-full min-h-screen"
        >
          {children}
        </motion.div>
      </AnimatePresence>
      
      {/* Overlay that appears during transitions */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-50 bg-gradient-to-b from-black/5 to-black/10 dark:from-black/20 dark:to-black/30"
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
} 