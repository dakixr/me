'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePageTransition } from './PageTransition';

export default function CVSection() {
  const { isTransitioning, startTransition } = usePageTransition();

  const handleCVClick = (e: React.MouseEvent) => {
    e.preventDefault();
    startTransition('/cv');
  };

  return (
    <section id="cv" className="py-16 bg-gray-50 dark:bg-dark-200">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white">
          Curriculum Vitae
        </h2>
        <div className="bg-white dark:bg-dark-100 rounded-lg shadow-lg overflow-hidden">
          <div className="p-8 flex flex-col items-center justify-center">
            <p className="text-lg text-center mb-8 text-gray-700 dark:text-gray-300">
              View my complete professional experience and qualifications in my CV.
            </p>
            <div className="flex gap-4 flex-wrap justify-center">
              <motion.a 
                href="/api/generate-pdf"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-accent hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download CV
              </motion.a>
              <motion.a
                href="/cv"
                onClick={handleCVClick}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300 ${isTransitioning ? 'pointer-events-none opacity-70' : ''}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                </svg>
                {isTransitioning ? 'Loading...' : 'View Full CV'}
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 