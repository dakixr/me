'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { LoadingScreen } from './LoadingScreen';

interface TransitionContextType {
  isTransitioning: boolean;
  startTransition: (href: string) => void;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  loadingError: boolean;
  setLoadingError: (error: boolean) => void;
}

const TransitionContext = createContext<TransitionContextType>({
  isTransitioning: false,
  startTransition: () => {},
  isLoading: false,
  setLoading: () => {},
  loadingError: false,
  setLoadingError: () => {},
});

export const usePageTransition = () => useContext(TransitionContext);

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    return () => {
      setIsTransitioning(false);
    };
  }, [pathname]);

  const startTransition = (href: string) => {
    if (!mounted) {
      router.push(href);
      return;
    }
    
    if (href === pathname) return;
    
    setIsTransitioning(true);
    router.push(href);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 100);
  };

  const contextValue = mounted
    ? { 
        isTransitioning, 
        startTransition, 
        isLoading,
        setLoading: setIsLoading,
        loadingError,
        setLoadingError,
      }
    : { 
        isTransitioning: false, 
        startTransition: (href: string) => router.push(href),
        isLoading: true,
        setLoading: () => {},
        loadingError: false,
        setLoadingError: () => {},
      };

  return (
    <TransitionContext.Provider value={contextValue}>
      {children}
    </TransitionContext.Provider>
  );
}

export function PageTransitionWrapper({ children }: { children: ReactNode }) {
  const { isLoading, loadingError, setLoading } = usePageTransition();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    window.scrollTo(0, 0);
  }, [pathname]);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <div className="relative w-full min-h-screen">
      <LoadingScreen 
        error={loadingError}
        isLoading={isLoading}
        onComplete={() => setLoading(false)}
      >
        {children}
      </LoadingScreen>
    </div>
  );
} 