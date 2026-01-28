'use client';

import { motion } from 'framer-motion';
import { usePageTransition } from './PageTransition';
import { useTransitionNavigate } from './useTransitionNavigate';

export default function CVSection() {
  const { isTransitioning } = usePageTransition();
  const transitionNavigate = useTransitionNavigate();
  
  // Animation variants for staggered animations
  const cardVariants = {
    initial: { 
      opacity: 0,
      y: 30
    },
    animate: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  
  const buttonVariants = {
    initial: { 
      opacity: 0,
      y: 10
    },
    animate: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.2
      }
    },
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.95,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      transition: { duration: 0.1 }
    }
  };

  const handleCVClick = (e: React.MouseEvent) => {
    e.preventDefault();
    transitionNavigate('/cv', 'scale');
  };

  return (
    <section id="cv" className="py-16 bg-gray-50 dark:bg-dark-200">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          Curriculum Vitae
        </motion.h2>
        <motion.div 
          className="bg-white dark:bg-dark-100 rounded-lg shadow-lg overflow-hidden"
          variants={cardVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="p-8 flex flex-col items-center justify-center">
            <motion.p 
              className="text-lg text-center mb-8 text-gray-700 dark:text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              View my complete professional experience and qualifications in my CV.
            </motion.p>
            <div className="flex gap-4 flex-wrap justify-center">
              <motion.a 
                href="/api/generate-pdf"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-accent hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-all duration-300"
                variants={buttonVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
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
                variants={buttonVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
              >
                <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                </svg>
                {isTransitioning ? 'Loading...' : 'View Full CV'}
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 