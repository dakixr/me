'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

type CursorState = 'default' | 'hover' | 'active' | 'link' | 'button';

interface CursorPosition {
  x: number;
  y: number;
  timestamp?: number;
}

interface TrailDot {
  id: number;
  x: number;
  y: number;
  opacity: number;
  scale: number;
}

export default function CustomCursor() {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [cursorState, setCursorState] = useState<CursorState>('default');
  const [isPointerDevice, setIsPointerDevice] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [enabled, setEnabled] = useState(true);
  
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailDotsRef = useRef<TrailDot[]>([]);
  const dotIdRef = useRef(0);
  const animationFrameRef = useRef<number>();
  const lastPositionRef = useRef<CursorPosition>({ x: 0, y: 0, timestamp: performance.now() });
  const velocityRef = useRef({ x: 0, y: 0 });
  const positionRef = useRef({ x: 0, y: 0 });
  
  const smoothX = useMotionValue(0);
  const smoothY = useMotionValue(0);
  const springX = useSpring(smoothX, { stiffness: 200, damping: 20 });
  const springY = useSpring(smoothY, { stiffness: 200, damping: 20 });

  useEffect(() => {
    const checkPointerDevice = () => {
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsPointerDevice(!isTouch);
    };

    const checkPreferences = () => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const highContrast = window.matchMedia('(prefers-contrast: more)').matches;
      setEnabled(!reducedMotion && !highContrast);
    };

    checkPointerDevice();
    checkPreferences();

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      smoothX.set(e.clientX);
      smoothY.set(e.clientY);
      setIsVisible(true);

      const now = performance.now();
      const dt = now - (lastPositionRef.current.timestamp || now) || 1;
      
      velocityRef.current = {
        x: (e.clientX - lastPositionRef.current.x) / dt,
        y: (e.clientY - lastPositionRef.current.y) / dt,
      };
      
      lastPositionRef.current = { x: e.clientX, y: e.clientY, timestamp: now };
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const updateCursorState = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (target.tagName === 'A' || target.closest('a')) {
        setCursorState('link');
      } else if (target.tagName === 'BUTTON' || target.closest('button') || target.closest('[role="button"]')) {
        setCursorState('button');
      } else if (target.closest('[data-cursor="hover"]')) {
        setCursorState('hover');
      } else if (target.closest('[data-cursor="active"]')) {
        setCursorState('active');
      } else if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.closest('[contenteditable]')) {
        setCursorState('default');
      } else {
        setCursorState('default');
      }
    };

    const handleMouseDown = () => setCursorState('active');
    const handleMouseUp = () => {
      const target = document.elementFromPoint(position.x, position.y) as HTMLElement;
      if (target && (target.tagName === 'A' || target.closest('a'))) {
        setCursorState('link');
      } else if (target && (target.tagName === 'BUTTON' || target.closest('button') || target.closest('[role="button"]'))) {
        setCursorState('button');
      } else {
        setCursorState('default');
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setEnabled(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseenter', handleMouseEnter, true);
    window.addEventListener('mouseleave', handleMouseLeave, true);
    window.addEventListener('mouseover', updateCursorState, true);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseenter', handleMouseEnter, true);
      window.removeEventListener('mouseleave', handleMouseLeave, true);
      window.removeEventListener('mouseover', updateCursorState, true);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('keydown', handleKeyDown);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addTrailDot = useCallback((x: number, y: number) => {
    const dotId = dotIdRef.current++;
    const newDot: TrailDot = { id: dotId, x, y, opacity: 1, scale: 1 };
    
    trailDotsRef.current = [...trailDotsRef.current, newDot];
    
    if (trailDotsRef.current.length > 8) {
      trailDotsRef.current.shift();
    }
  }, []);

  useEffect(() => {
    positionRef.current = position;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position.x, position.y]);

  useEffect(() => {
    if (!isPointerDevice || !enabled) return;

    const updateTrail = () => {
      const velocity = Math.sqrt(velocityRef.current.x ** 2 + velocityRef.current.y ** 2);
      
      if (velocity > 0.1) {
        addTrailDot(positionRef.current.x, positionRef.current.y);
      }

      trailDotsRef.current = trailDotsRef.current.map(dot => ({
        ...dot,
        opacity: dot.opacity - 0.08,
        scale: dot.scale * 0.95,
      })).filter(dot => dot.opacity > 0);

      animationFrameRef.current = requestAnimationFrame(updateTrail);
    };

    animationFrameRef.current = requestAnimationFrame(updateTrail);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPointerDevice, enabled, addTrailDot, positionRef]);

  const getCursorSize = () => {
    switch (cursorState) {
      case 'link':
        return { width: 50, height: 50 };
      case 'button':
        return { width: 60, height: 60 };
      case 'active':
        return { width: 35, height: 35 };
      case 'hover':
        return { width: 55, height: 55 };
      default:
        return { width: 32, height: 32 };
    }
  };

  const getCursorColor = () => {
    switch (cursorState) {
      case 'link':
        return 'rgba(14, 165, 233, 0.8)';
      case 'button':
        return 'rgba(14, 165, 233, 0.7)';
      case 'active':
        return 'rgba(14, 165, 233, 0.9)';
      case 'hover':
        return 'rgba(14, 165, 233, 0.6)';
      default:
        return 'rgba(14, 165, 233, 0.5)';
    }
  };

  const getBlendMode = () => {
    return cursorState === 'active' ? 'difference' : 'exclusion';
  };

  if (!isPointerDevice || !enabled) return null;

  const cursorSize = getCursorSize();
  const cursorColor = getCursorColor();
  const blendMode = getBlendMode();

  return (
    <>
      <style jsx global>{`
        * {
          cursor: none !important;
        }
        
        body, html {
          cursor: none !important;
        }
        
        input, textarea, [contenteditable], select {
          cursor: text !important;
        }

        @media (hover: none) and (pointer: coarse) {
          * {
            cursor: auto !important;
          }
        }
      `}</style>
      
      <AnimatePresence>
        {isVisible && enabled && (
          <>
            {trailDotsRef.current.map((dot) => (
              <motion.div
                key={dot.id}
                className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
                style={{
                  left: dot.x,
                  top: dot.y,
                  width: cursorSize.width * 0.5,
                  height: cursorSize.height * 0.5,
                  backgroundColor: cursorColor,
                  mixBlendMode: 'screen',
                }}
                initial={{ opacity: dot.opacity, scale: 1 }}
                animate={{
                  opacity: dot.opacity,
                  scale: dot.scale,
                }}
                transition={{
                  duration: 0.3,
                  ease: 'easeOut',
                }}
              />
            ))}
            
            <motion.div
              ref={cursorRef}
              className="fixed top-0 left-0 pointer-events-none z-[10000] rounded-full"
              style={{
                width: cursorSize.width,
                height: cursorSize.height,
                backgroundColor: cursorColor,
                mixBlendMode: blendMode,
              }}
              animate={{
                x: springX.get() - cursorSize.width / 2,
                y: springY.get() - cursorSize.height / 2,
                scale: cursorState === 'active' ? 0.8 : 1,
              }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 20,
                mass: 0.1,
              }}
            >
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-white/30"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              
              <motion.div
                className="absolute inset-2 rounded-full bg-white/20"
                animate={{
                  scale: [1, 0.8, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
