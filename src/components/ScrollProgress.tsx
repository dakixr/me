'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');

  const sections = useMemo(() => [
    { id: 'about', name: 'About' },
    { id: 'projects', name: 'Projects' },
    { id: 'skills', name: 'Skills' },
    { id: 'cv', name: 'CV' },
    { id: 'contact', name: 'Contact' },
  ], []);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    const handleScroll = () => {
      updateScrollProgress();
      updateActiveSection();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-30">
      <div className="h-1 bg-gray-200 dark:bg-dark-300">
        <motion.div
          className="h-full bg-accent"
          style={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      <div className="flex justify-center space-x-6 py-2 bg-white/80 dark:bg-dark-100/80 backdrop-blur-sm border-b border-gray-200 dark:border-dark-300">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`text-xs font-medium transition-colors duration-300 ${
              activeSection === section.id
                ? 'text-accent'
                : 'text-gray-600 dark:text-gray-400 hover:text-accent'
            }`}
          >
            {section.name}
          </button>
        ))}
      </div>
    </div>
  );
}
