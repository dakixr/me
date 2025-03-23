'use client';

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePageTransition } from '../../src/components/PageTransition';

export default function CVPage() {
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { startTransition } = usePageTransition();

  useEffect(() => {
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
    startTransition('/');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  const headerVariants = {
    initial: { y: -50, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 } }
  };

  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1], 
        delay: 0.3,
        staggerChildren: 0.05
      }
    }
  };

  return (
    <motion.div 
      className="min-h-screen flex flex-col"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.header 
        className="bg-white dark:bg-dark p-4 shadow-md flex justify-between items-center sticky top-0 z-10"
        variants={headerVariants}
      >
        <h1 className="text-xl font-bold">Daniel Rodríguez Mariblanca - CV</h1>
        <div className="flex gap-4">
          <motion.a 
            href="/"
            onClick={handleBackClick}
            className="px-3 py-1 text-sm rounded-md bg-gray-100 dark:bg-dark-300 hover:bg-gray-200 dark:hover:bg-dark-400 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to Portfolio
          </motion.a>
          <motion.a 
            href="/api/generate-pdf"
            className="px-3 py-1 text-sm rounded-md bg-accent text-white hover:bg-accent-dark transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Download CV
          </motion.a>
        </div>
      </motion.header>
      
      <motion.main 
        className="flex-grow bg-white dark:bg-dark-100 p-6 overflow-auto"
        variants={contentVariants}
      >
        <motion.div 
          className="container mx-auto max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <article className="prose dark:prose-invert prose-slate max-w-none">
            <ReactMarkdown
              rehypePlugins={[rehypeRaw, rehypeHighlight]}
              remarkPlugins={[remarkGfm]}
            >
              {content}
            </ReactMarkdown>
          </article>
        </motion.div>
      </motion.main>
    </motion.div>
  );
} 