'use client';

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import { motion } from 'framer-motion';
import { useTransitionNavigate } from '../../src/components/useTransitionNavigate';

export default function CVPage() {
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const transitionNavigate = useTransitionNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fetchMarkdown = async () => {
      try {
        const response = await fetch('/daniel_cv.md');
        const text = await response.text();
        setContent(text);
      } catch (error) {
        console.error('Error fetching markdown:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMarkdown();
  }, []);

  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    transitionNavigate('/', 'slide');
  };

  if (!mounted || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <motion.div 
          className="h-12 w-12 rounded-full border-t-2 border-b-2 border-accent"
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 1, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
      </div>
    );
  }

  // Enhanced animation variants with staggered children
  const headerVariants = {
    initial: { y: -20, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      } 
    }
  };

  const buttonVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <motion.header 
        className="bg-white dark:bg-dark p-4 shadow-md sticky top-0 z-10"
        variants={headerVariants}
        initial="initial"
        animate="animate"
      >
        <div className="container max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center">
            <a href="/" className="flex items-center text-xl font-bold text-gray-900 dark:text-white hover:text-accent dark:hover:text-accent transition duration-300">
              <span className="text-accent">&lt;</span>Daniel<span className="text-accent">/&gt;</span>
            </a>
          </div>
          <div className="flex justify-end gap-4">
            <motion.a 
              href="/"
              onClick={handleBackClick}
              className="px-3 py-1 text-sm rounded-md bg-gray-100 dark:bg-dark-300 hover:bg-gray-200 dark:hover:bg-dark-400 transition-colors flex items-center"
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              whileTap="tap"
            >
              <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Portfolio
            </motion.a>
            <motion.a 
              href="/api/generate-pdf"
              className="px-3 py-1 text-sm rounded-md bg-accent text-white hover:bg-accent-dark transition-colors flex items-center"
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              whileTap="tap"
            >
              <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download CV
            </motion.a>
          </div>
        </div>
      </motion.header>
      
      <motion.main 
        className="flex-grow bg-white dark:bg-dark-100 p-6 overflow-auto"
        variants={contentVariants}
        initial="initial"
        animate="animate"
      >
        <div className="container mx-auto max-w-4xl">
          <article className="prose dark:prose-invert prose-slate max-w-none">
            <ReactMarkdown
              rehypePlugins={[rehypeRaw, rehypeHighlight]}
              remarkPlugins={[remarkGfm]}
            >
              {content}
            </ReactMarkdown>
          </article>
        </div>
      </motion.main>
    </div>
  );
} 