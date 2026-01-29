'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollProgress from './ScrollProgress';
import ThemeToggle from './ThemeToggle';
import { TransitionLink } from './TransitionLink';

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Theme toggle animation
  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "100%" },
  };

  // After mounting, we can show the theme toggle
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <nav className="sticky top-0 z-20 backdrop-blur-md bg-white/70 dark:bg-dark-100/70 border-b border-gray-200 dark:border-dark-300">
      <ScrollProgress />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <TransitionLink 
              href="/" 
              className="flex items-center text-xl font-bold text-gray-900 dark:text-white hover:text-accent dark:hover:text-accent transition duration-300"
            >
              <span className="text-accent">&lt;</span>Daniel<span className="text-accent">/&gt;</span>
            </TransitionLink>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link href="#about" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-accent dark:hover:text-accent transition duration-300">
                About
              </Link>
              <Link href="#projects" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-accent dark:hover:text-accent transition duration-300">
                Projects
              </Link>
              <Link href="#skills" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-accent dark:hover:text-accent transition duration-300">
                Skills
              </Link>
              <Link href="#cv" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-accent dark:hover:text-accent transition duration-300">
                CV
              </Link>
              <Link href="#contact" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-accent dark:hover:text-accent transition duration-300">
                Contact
              </Link>
              <ThemeToggle />
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-300 focus:outline-none transition duration-300"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div 
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        transition={{ duration: 0.3 }}
        className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-dark-100 border-b border-gray-200 dark:border-dark-300">
          <Link href="#about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-accent dark:hover:text-accent transition duration-300">
            About
          </Link>
          <Link href="#projects" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-accent dark:hover:text-accent transition duration-300">
            Projects
          </Link>
          <Link href="#skills" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-accent dark:hover:text-accent transition duration-300">
            Skills
          </Link>
          <Link href="#cv" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-accent dark:hover:text-accent transition duration-300">
            CV
          </Link>
          <Link href="#contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-accent dark:hover:text-accent transition duration-300">
            Contact
          </Link>
        </div>
      </motion.div>
    </nav>
  );
} 