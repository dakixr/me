import { useMemo } from 'react';

export type AnimationType = 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale' | 'slideUpFade' | 'scaleFade';

interface AnimationVariants {
  initial: Record<string, number>;
  whileInView: Record<string, number>;
  viewport: { once?: boolean };
}

interface UseScrollAnimationOptions {
  delay?: number;
  duration?: number;
  type?: AnimationType;
  once?: boolean;
}

export function useScrollAnimation({
  delay = 0,
  duration = 0.6,
  type = 'fadeIn',
  once = true
}: UseScrollAnimationOptions = {}): AnimationVariants {
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // delay and duration are consumed by the AnimatedSection component's transition prop
  // We keep them in the interface for API consistency
  void delay;
  void duration;

  if (prefersReducedMotion) {
    return {
      initial: { opacity: 1 },
      whileInView: { opacity: 1 },
      viewport: { once: false }
    };
  }

  const animationVariants: Record<AnimationType, AnimationVariants> = {
    fadeIn: {
      initial: { opacity: 0 },
      whileInView: { opacity: 1 },
      viewport: { once }
    },
    slideUp: {
      initial: { y: 30, opacity: 1 },
      whileInView: { y: 0, opacity: 1 },
      viewport: { once }
    },
    slideDown: {
      initial: { y: -30, opacity: 1 },
      whileInView: { y: 0, opacity: 1 },
      viewport: { once }
    },
    slideLeft: {
      initial: { x: 30, opacity: 1 },
      whileInView: { x: 0, opacity: 1 },
      viewport: { once }
    },
    slideRight: {
      initial: { x: -30, opacity: 1 },
      whileInView: { x: 0, opacity: 1 },
      viewport: { once }
    },
    scale: {
      initial: { scale: 0.9, opacity: 1 },
      whileInView: { scale: 1, opacity: 1 },
      viewport: { once }
    },
    slideUpFade: {
      initial: { y: 50, opacity: 0 },
      whileInView: { y: 0, opacity: 1 },
      viewport: { once }
    },
    scaleFade: {
      initial: { scale: 0.8, opacity: 0 },
      whileInView: { scale: 1, opacity: 1 },
      viewport: { once }
    }
  };

  const selectedVariants = animationVariants[type] || animationVariants.fadeIn;

  return {
    initial: selectedVariants.initial,
    whileInView: selectedVariants.whileInView,
    viewport: selectedVariants.viewport
  };
}
