'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ScrollProgress from './ScrollProgress';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <nav className="sticky top-0 z-20 border-b border-dark-300 dark:border-light-300 bg-light dark:bg-dark">
      <ScrollProgress />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex items-center text-xl text-dark dark:text-light hover:bg-dark-100 dark:hover:bg-light-200 px-3 py-2"
            >
              &lt;Daniel/&gt;
            </Link>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link href="#about" className="px-3 py-2 text-sm text-dark dark:text-light hover:bg-dark-100 dark:hover:bg-light-200">
                About
              </Link>
              <Link href="#projects" className="px-3 py-2 text-sm text-dark dark:text-light hover:bg-dark-100 dark:hover:bg-light-200">
                Projects
              </Link>
              <Link href="#skills" className="px-3 py-2 text-sm text-dark dark:text-light hover:bg-dark-100 dark:hover:bg-light-200">
                Skills
              </Link>
              <Link href="#cv" className="px-3 py-2 text-sm text-dark dark:text-light hover:bg-dark-100 dark:hover:bg-light-200">
                CV
              </Link>
              <Link href="#contact" className="px-3 py-2 text-sm text-dark dark:text-light hover:bg-dark-100 dark:hover:bg-light-200">
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
              className="inline-flex items-center justify-center p-2 text-dark dark:text-light hover:bg-dark-100 dark:hover:bg-light-200"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">{isOpen ? 'Close main menu' : 'Open main menu'}</span>
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
      {isOpen && (
        <div id="mobile-menu" className="md:hidden border-t border-dark-300 dark:border-light-300">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="#about" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base text-dark dark:text-light hover:bg-dark-100 dark:hover:bg-light-200">
              About
            </Link>
            <Link href="#projects" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base text-dark dark:text-light hover:bg-dark-100 dark:hover:bg-light-200">
              Projects
            </Link>
            <Link href="#skills" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base text-dark dark:text-light hover:bg-dark-100 dark:hover:bg-light-200">
              Skills
            </Link>
            <Link href="#cv" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base text-dark dark:text-light hover:bg-dark-100 dark:hover:bg-light-200">
              CV
            </Link>
            <Link href="#contact" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base text-dark dark:text-light hover:bg-dark-100 dark:hover:bg-light-200">
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
} 
