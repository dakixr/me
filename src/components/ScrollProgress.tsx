'use client';

import { useState, useEffect } from 'react';

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    const handleScroll = () => {
      updateScrollProgress();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-30">
      <div className="h-1 bg-gray-200/70 dark:bg-dark-300/70">
        <div
          className="h-full bg-accent transition-all duration-200"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </div>
  );
}
