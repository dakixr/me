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
    startTransition('/');
  };

  if (!mounted || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  // Simpler animation variants to avoid conflicts
  const headerVariants = {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.3 } }
  };

  const contentVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <motion.header 
        className="bg-white dark:bg-dark p-4 shadow-md flex justify-between items-center sticky top-0 z-10"
        variants={headerVariants}
        initial="initial"
        animate="animate"
      >
        <h1 className="text-xl font-bold">Daniel Rodríguez Mariblanca - CV</h1>
        <div className="flex gap-4">
          <motion.a 
            href="/"
            onClick={handleBackClick}
            className="px-3 py-1 text-sm rounded-md bg-gray-100 dark:bg-dark-300 hover:bg-gray-200 dark:hover:bg-dark-400 transition-colors"
            whileHover={mounted ? { scale: 1.05 } : undefined}
            whileTap={mounted ? { scale: 0.95 } : undefined}
          >
            Back to Portfolio
          </motion.a>
          <motion.a 
            href="/api/generate-pdf"
            className="px-3 py-1 text-sm rounded-md bg-accent text-white hover:bg-accent-dark transition-colors"
            whileHover={mounted ? { scale: 1.05 } : undefined}
            whileTap={mounted ? { scale: 0.95 } : undefined}
          >
            Download CV
          </motion.a>
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