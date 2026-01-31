'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function BlogNavbar() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <nav className="sticky top-0 z-20 border-b border-dark-300 dark:border-light-300 bg-light dark:bg-dark">
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
          
          <div className="flex items-center space-x-4">
            <Link href="/" className="px-3 py-2 text-sm text-dark dark:text-light hover:bg-dark-100 dark:hover:bg-light-200">
              About Me
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
} 
